import { NextRequest, NextResponse } from "next/server";
import { getPesapalConfig, submitPesapalOrder } from "@/lib/pesapal";
import { paymentStore } from "@/lib/payment-store";
import crypto from "crypto";

// Lightweight in-memory rate limiter per IP (best-effort server memory)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 12;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  // Clean old entries periodically
  if (rateLimitMap.size > 10000) {
    for (const [key, value] of rateLimitMap.entries()) {
      if (value.resetAt < now) rateLimitMap.delete(key);
    }
  }

  if (!entry || entry.resetAt < now) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  entry.count += 1;
  return false;
}

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export async function POST(req: NextRequest) {
  const clientIp =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "127.0.0.1";

  if (isRateLimited(clientIp)) {
    return NextResponse.json(
      { success: false, error: "Too many payment attempts. Please wait a minute and try again." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid JSON payload in request." },
      { status: 400 }
    );
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json(
      { success: false, error: "Request payload must be a JSON object." },
      { status: 400 }
    );
  }

  const raw = body as Record<string, unknown>;

  // Validation: First Name
  if (typeof raw.firstName !== "string" || !raw.firstName.trim()) {
    return NextResponse.json(
      { success: false, error: "First name is required." },
      { status: 422 }
    );
  }
  const firstName = raw.firstName.trim();
  if (firstName.length > 60) {
    return NextResponse.json(
      { success: false, error: "First name must be 60 characters or less." },
      { status: 422 }
    );
  }

  // Validation: Last Name
  if (typeof raw.lastName !== "string" || !raw.lastName.trim()) {
    return NextResponse.json(
      { success: false, error: "Last name is required." },
      { status: 422 }
    );
  }
  const lastName = raw.lastName.trim();
  if (lastName.length > 60) {
    return NextResponse.json(
      { success: false, error: "Last name must be 60 characters or less." },
      { status: 422 }
    );
  }

  // Validation: Email
  if (typeof raw.email !== "string" || !raw.email.trim()) {
    return NextResponse.json(
      { success: false, error: "A valid email address is required." },
      { status: 422 }
    );
  }
  const email = raw.email.trim().toLowerCase();
  if (email.length > 100 || !EMAIL_REGEX.test(email)) {
    return NextResponse.json(
      { success: false, error: "Please enter a valid email address." },
      { status: 422 }
    );
  }

  // Validation: Amount
  // Must be integer UGX, > 0, finite, reject decimals, NaN, Infinity
  const rawAmount = raw.amount;
  if (
    typeof rawAmount !== "number" ||
    !Number.isFinite(rawAmount) ||
    !Number.isInteger(rawAmount) ||
    rawAmount <= 0
  ) {
    return NextResponse.json(
      {
        success: false,
        error: "Amount must be a positive integer in UGX (no decimals).",
      },
      { status: 422 }
    );
  }

  const amount = rawAmount;
  const MAX_UGX = 100_000_000; // 100 million UGX reasonable cap
  if (amount > MAX_UGX) {
    return NextResponse.json(
      {
        success: false,
        error: "Amount exceeds the maximum allowable online transaction limit.",
      },
      { status: 422 }
    );
  }

  const config = getPesapalConfig();

  if (!config.consumerKey || !config.consumerSecret) {
    console.error("[Checkout] Missing Pesapal consumer credentials in environment.");
    return NextResponse.json(
      {
        success: false,
        error: "Payment service is temporarily unavailable. Please contact support.",
      },
      { status: 503 }
    );
  }

  if (!config.ipnId) {
    console.error("[Checkout] PESAPAL_IPN_ID is not configured in environment.");
    return NextResponse.json(
      {
        success: false,
        error: "Payment notification system not configured. Please contact the administrator.",
      },
      { status: 503 }
    );
  }

  // Generate safe server-side merchant reference:
  // Format: ELDERLY-${timestamp}-${randomHex} (satisfies max 50 chars, alphanumeric + - and _)
  const timestamp = Date.now();
  const randomSuffix = crypto.randomBytes(4).toString("hex");
  const merchantReference = `ELDERLY-${timestamp}-${randomSuffix}`;

  const description = "Elderly Outreach Sponsorship";
  const callbackUrl = `${config.appBaseUrl}/payment-success`;
  const cancellationUrl = `${config.appBaseUrl}/`;

  // Step 1: Create local PENDING payment record
  try {
    paymentStore.createPayment({
      merchant_reference: merchantReference,
      first_name: firstName,
      last_name: lastName,
      email,
      amount,
      currency: "UGX",
      description,
      metadata: {
        campaign: "Elderly Outreach Sponsorship",
        venue: "Kiyimbwe Village, Masaka",
        eventDate: "19 September 2026",
        clientIp,
      },
    });
  } catch (err) {
    console.error(`[Checkout] Failed to create local payment record for ${merchantReference}:`, err);
    return NextResponse.json(
      { success: false, error: "Internal processing error. Please try again." },
      { status: 500 }
    );
  }

  // Step 2: Submit order to Pesapal
  try {
    const pesapalResponse = await submitPesapalOrder({
      id: merchantReference,
      currency: "UGX",
      amount,
      description,
      callback_url: callbackUrl,
      cancellation_url: cancellationUrl,
      notification_id: config.ipnId,
      billing_address: {
        email_address: email,
        country_code: "UG",
        first_name: firstName,
        last_name: lastName,
      },
    });

    // Step 3: Link Pesapal tracking ID
    paymentStore.setTrackingId(merchantReference, pesapalResponse.order_tracking_id);

    return NextResponse.json(
      {
        success: true,
        redirect_url: pesapalResponse.redirect_url,
        order_tracking_id: pesapalResponse.order_tracking_id,
        merchant_reference: merchantReference,
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    console.error(`[Checkout] Pesapal order creation failed for ref=${merchantReference}:`, err);

    // Update local payment record to failed
    paymentStore.updateStatus({
      merchant_reference: merchantReference,
      payment_status: "PAYMENT_INITIATION_FAILED",
      metadata: { failureReason: err instanceof Error ? err.message : "Unknown error" },
    });

    return NextResponse.json(
      {
        success: false,
        error: "We were unable to connect to the secure payment portal. Please try again shortly.",
      },
      { status: 502 }
    );
  }
}
