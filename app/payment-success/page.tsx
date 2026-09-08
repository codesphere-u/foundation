import Link from "next/link";
import { getPesapalTransactionStatus } from "@/lib/pesapal";
import { paymentStore } from "@/lib/payment-store";
import { site } from "@/lib/content";

interface PaymentSuccessPageProps {
  searchParams: Promise<{
    OrderTrackingId?: string;
    OrderMerchantReference?: string;
    OrderNotificationType?: string;
  }>;
}

export const dynamic = "force-dynamic";

export default async function PaymentSuccessPage({ searchParams }: PaymentSuccessPageProps) {
  const params = await searchParams;
  const orderTrackingId = params.OrderTrackingId?.trim();
  const orderMerchantReference = params.OrderMerchantReference?.trim();

  // If no tracking ID was provided in URL, show invalid request
  if (!orderTrackingId) {
    return (
      <main className="min-h-[75vh] flex items-center justify-center px-4 py-16 bg-paper">
        <div className="w-full max-w-lg rounded-3xl border border-purple/10 bg-white p-8 text-center shadow-lg sm:p-12">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-crimson/10 text-crimson">
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="mt-6 font-display text-2xl font-bold text-purple-deep sm:text-3xl">
            Invalid Payment Reference
          </h1>
          <p className="mt-3 text-sm text-muted">
            We could not locate transaction details for this visit. If you were charged, please contact us with your payment receipt.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/"
              className="inline-flex min-h-11 items-center rounded-full bg-purple px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-deep"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // Authoritative server-side verification with Pesapal API 3.0
  let verificationError: string | null = null;
  let statusResult = null;

  try {
    statusResult = await getPesapalTransactionStatus(orderTrackingId);
  } catch (err: unknown) {
    console.error(`[PaymentSuccessPage] Verification failed for ${orderTrackingId}:`, err);
    verificationError = "We could not reach the payment gateway to verify this transaction status.";
  }

  const verifiedStatus = statusResult?.payment_status_description?.toUpperCase();
  const isCompleted = verifiedStatus === "COMPLETED";
  const isPending = !verifiedStatus || verifiedStatus === "PENDING" || verifiedStatus === "PROCESSING";

  // Check local record for integrity matching
  const localRecord =
    (orderMerchantReference ? paymentStore.getByMerchantReference(orderMerchantReference) : null) ||
    paymentStore.getByTrackingId(orderTrackingId);

  // Update local record if verified as COMPLETED
  if (isCompleted && statusResult) {
    // Integrity check
    const amountMatches = localRecord ? Math.abs(localRecord.amount - statusResult.amount) < 0.01 : true;
    const currencyMatches = localRecord ? localRecord.currency.toUpperCase() === statusResult.currency.toUpperCase() : true;

    if (amountMatches && currencyMatches) {
      paymentStore.updateStatus({
        merchant_reference: orderMerchantReference || statusResult.merchant_reference,
        pesapal_tracking_id: orderTrackingId,
        payment_status: "COMPLETED",
        payment_method: statusResult.payment_method,
        payment_account_masked: statusResult.payment_account || statusResult.account_number,
        confirmation_code: statusResult.confirmation_code,
        pesapal_status_code: statusResult.status_code,
      });
    }
  }

  // 1. VERIFIED SUCCESS
  if (isCompleted && statusResult) {
    return (
      <main className="min-h-[85vh] flex items-center justify-center px-4 py-16 bg-paper">
        <div className="w-full max-w-xl rounded-3xl border border-purple/10 bg-white p-6 shadow-xl sm:p-10">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-8 ring-emerald-50/50">
            <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Sponsorship Confirmed
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold text-purple-deep sm:text-4xl">
              Payment Successful
            </h1>
            <p className="mt-3 text-sm text-muted sm:text-base">
              Thank you for your generous contribution to the <span className="font-semibold text-purple-deep">Hafisa Magezi Foundation</span>.
              Your support directly empowers the elderly community in Kiyimbwe Village, Masaka.
            </p>
          </div>

          {/* Receipt Breakdown Card */}
          <div className="mt-8 rounded-2xl border border-purple/10 bg-lavender/40 p-5 sm:p-6 text-left">
            <div className="border-b border-purple/10 pb-4">
              <span className="text-xs font-medium text-muted uppercase">Amount Sponsored</span>
              <p className="font-display text-3xl font-bold text-purple-deep">
                {statusResult.currency || "UGX"} {Number(statusResult.amount).toLocaleString()}
              </p>
            </div>

            <dl className="mt-4 grid grid-cols-1 gap-3 text-xs sm:grid-cols-2 sm:gap-4 sm:text-sm">
              <div>
                <dt className="text-muted">Campaign</dt>
                <dd className="font-semibold text-purple-deep">Elderly Outreach Sponsorship</dd>
              </div>
              <div>
                <dt className="text-muted">Payment Method</dt>
                <dd className="font-semibold text-purple-deep">{statusResult.payment_method || "Online Payment"}</dd>
              </div>
              {statusResult.confirmation_code && (
                <div>
                  <dt className="text-muted">Confirmation Code</dt>
                  <dd className="font-mono font-semibold text-purple-deep">{statusResult.confirmation_code}</dd>
                </div>
              )}
              {statusResult.payment_account && (
                <div>
                  <dt className="text-muted">Account / Phone</dt>
                  <dd className="font-mono font-semibold text-purple-deep">{statusResult.payment_account}</dd>
                </div>
              )}
              <div>
                <dt className="text-muted">Merchant Reference</dt>
                <dd className="font-mono text-xs text-muted truncate">{orderMerchantReference || statusResult.merchant_reference}</dd>
              </div>
              <div>
                <dt className="text-muted">Tracking ID</dt>
                <dd className="font-mono text-xs text-muted truncate">{orderTrackingId}</dd>
              </div>
            </dl>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="w-full sm:w-auto text-center rounded-full bg-purple px-8 py-3 text-sm font-semibold text-white shadow transition hover:bg-purple-deep"
            >
              Return to Homepage
            </Link>
            <Link
              href="/#donate"
              className="w-full sm:w-auto text-center rounded-full bg-lavender px-6 py-3 text-sm font-semibold text-purple transition hover:bg-lavender/80"
            >
              Sponsor Another
            </Link>
          </div>

          <p className="mt-6 text-center text-xs text-muted">
            {site.legalName} · Masaka Outreach · 19 September 2026
          </p>
        </div>
      </main>
    );
  }

  // 2. PROCESSING STATE
  if (isPending) {
    return (
      <main className="min-h-[85vh] flex items-center justify-center px-4 py-16 bg-paper">
        <div className="w-full max-w-lg rounded-3xl border border-purple/10 bg-white p-8 text-center shadow-lg sm:p-12">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-50 text-amber-600 ring-8 ring-amber-50/50">
            <svg className="h-8 w-8 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
          </div>

          <h1 className="mt-6 font-display text-2xl font-bold text-purple-deep sm:text-3xl">
            Payment Processing
          </h1>
          <p className="mt-3 text-sm text-muted leading-relaxed">
            Your transaction is currently being processed by your mobile money provider or card issuer.
            We are awaiting the final confirmation from Pesapal.
          </p>

          <div className="mt-6 rounded-xl bg-amber-50/60 p-4 text-xs text-amber-900 border border-amber-200/50">
            <p className="font-semibold">Tracking Reference</p>
            <p className="font-mono mt-1 text-muted">{orderTrackingId}</p>
          </div>

          <p className="mt-4 text-xs text-muted">
            Please allow a few moments. If money has been deducted from your account, your sponsorship is safe and will be recorded as soon as confirmation completes.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/"
              className="inline-flex min-h-11 items-center rounded-full bg-purple px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-deep"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // 3. FAILED / REVERSED / INVALID OR VERIFICATION ERROR
  return (
    <main className="min-h-[85vh] flex items-center justify-center px-4 py-16 bg-paper">
      <div className="w-full max-w-lg rounded-3xl border border-purple/10 bg-white p-8 text-center shadow-lg sm:p-12">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-crimson ring-8 ring-red-50/50">
          <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>

        <h1 className="mt-6 font-display text-2xl font-bold text-purple-deep sm:text-3xl">
          Payment Not Completed
        </h1>
        <p className="mt-3 text-sm text-muted leading-relaxed">
          {verificationError ||
            "Your transaction was not completed successfully. This may happen if the mobile money prompt was cancelled or expired."}
        </p>

        <div className="mt-6 rounded-xl bg-red-50/50 p-4 text-xs text-red-900 border border-red-100">
          <p>
            Status: <span className="font-semibold">{verifiedStatus || "UNVERIFIED"}</span>
          </p>
          {orderMerchantReference && (
            <p className="font-mono text-muted mt-1 truncate">Ref: {orderMerchantReference}</p>
          )}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/#donate"
            className="w-full sm:w-auto rounded-full bg-purple px-8 py-3 text-sm font-semibold text-white transition hover:bg-purple-deep"
          >
            Try Again
          </Link>
          <Link
            href="/contact"
            className="w-full sm:w-auto rounded-full bg-lavender px-6 py-3 text-sm font-semibold text-purple transition hover:bg-lavender/80"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </main>
  );
}
