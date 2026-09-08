import { NextRequest, NextResponse } from "next/server";
import { getPesapalTransactionStatus } from "@/lib/pesapal";
import { paymentStore, PaymentStatus } from "@/lib/payment-store";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const orderTrackingId = searchParams.get("OrderTrackingId");
  const orderNotificationType = searchParams.get("OrderNotificationType");
  const orderMerchantReference = searchParams.get("OrderMerchantReference");

  console.info(
    `[Pesapal IPN] Notification received: type=${orderNotificationType}, trackingId=${orderTrackingId}, ref=${orderMerchantReference}`
  );

  // Validate mandatory fields
  if (!orderTrackingId || !orderNotificationType) {
    console.warn("[Pesapal IPN] Missing OrderTrackingId or OrderNotificationType");
    return NextResponse.json(
      { error: "Missing required query parameters: OrderTrackingId and OrderNotificationType" },
      { status: 400 }
    );
  }

  try {
    // Check if we already have this record and it is already COMPLETED (Idempotency)
    const existingRecord =
      (orderMerchantReference ? paymentStore.getByMerchantReference(orderMerchantReference) : null) ||
      paymentStore.getByTrackingId(orderTrackingId);

    if (existingRecord && existingRecord.payment_status === "COMPLETED") {
      console.info(
        `[Pesapal IPN] Payment already verified as COMPLETED for trackingId=${orderTrackingId}, ref=${orderMerchantReference}. Acknowledging idempotent IPN.`
      );
      return NextResponse.json({
        orderNotificationType: "IPNCHANGE",
        orderTrackingId,
        orderMerchantReference: orderMerchantReference || existingRecord.merchant_reference,
        status: 200,
      });
    }

    // Step 1: Query authoritative status directly from Pesapal
    const pesapalStatus = await getPesapalTransactionStatus(orderTrackingId);

    const verifiedStatusDesc = pesapalStatus.payment_status_description?.toUpperCase() || "INVALID";
    const ref = orderMerchantReference || pesapalStatus.merchant_reference || existingRecord?.merchant_reference;

    // Step 2: Map to our internal PaymentStatus
    let targetStatus: PaymentStatus;
    switch (verifiedStatusDesc) {
      case "COMPLETED":
        targetStatus = "COMPLETED";
        break;
      case "FAILED":
        targetStatus = "FAILED";
        break;
      case "REVERSED":
        targetStatus = "REVERSED";
        break;
      case "INVALID":
      default:
        targetStatus = "INVALID";
        break;
    }

    // Step 3: Integrity verification if local record exists
    if (existingRecord) {
      // Amount verification
      const amountMismatch = Math.abs(existingRecord.amount - pesapalStatus.amount) > 0.01;
      const currencyMismatch =
        existingRecord.currency.toUpperCase() !== pesapalStatus.currency.toUpperCase();

      if (amountMismatch || currencyMismatch) {
        console.error(
          `[Pesapal IPN] Security alert: Amount/Currency mismatch! Expected ${existingRecord.currency} ${existingRecord.amount}, but Pesapal verified ${pesapalStatus.currency} ${pesapalStatus.amount}`
        );
        targetStatus = "INVALID";
      }
    }

    // Step 4: Update payment store with verified details
    paymentStore.updateStatus({
      merchant_reference: ref || orderTrackingId,
      pesapal_tracking_id: orderTrackingId,
      payment_status: targetStatus,
      payment_method: pesapalStatus.payment_method,
      payment_account_masked: pesapalStatus.payment_account || pesapalStatus.account_number,
      confirmation_code: pesapalStatus.confirmation_code,
      pesapal_status_code: pesapalStatus.status_code,
      metadata: {
        lastIpnNotificationType: orderNotificationType,
        ipnReceivedAt: new Date().toISOString(),
        verifiedStatusDescription: verifiedStatusDesc,
      },
    });

    console.info(
      `[Pesapal IPN] Payment status updated to ${targetStatus} for trackingId=${orderTrackingId}, ref=${ref}`
    );

    // Step 5: Return Pesapal's required acknowledgment JSON
    return NextResponse.json({
      orderNotificationType: "IPNCHANGE",
      orderTrackingId,
      orderMerchantReference: ref,
      status: 200,
    });
  } catch (err: unknown) {
    console.error(`[Pesapal IPN] Failed to process IPN for trackingId=${orderTrackingId}:`, err);
    return NextResponse.json(
      { error: "Internal error processing payment verification" },
      { status: 500 }
    );
  }
}

// In case Pesapal sends a POST IPN in some webhook configurations, support it identically
export async function POST(req: NextRequest) {
  return GET(req);
}
