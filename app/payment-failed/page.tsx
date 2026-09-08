import Link from "next/link";

interface PaymentFailedPageProps {
  searchParams: Promise<{
    OrderMerchantReference?: string;
    OrderTrackingId?: string;
  }>;
}

export const dynamic = "force-dynamic";

export default async function PaymentFailedPage({ searchParams }: PaymentFailedPageProps) {
  const params = await searchParams;
  const ref = params.OrderMerchantReference || params.OrderTrackingId;

  return (
    <main className="min-h-[85vh] flex items-center justify-center px-4 py-16 bg-paper">
      <div className="w-full max-w-md rounded-3xl border border-purple/10 bg-white p-8 text-center shadow-xl sm:p-10">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-crimson ring-8 ring-red-50/50">
          <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>

        <h1 className="mt-6 font-display text-2xl font-bold text-purple-deep sm:text-3xl">
          Payment Not Completed
        </h1>

        <p className="mt-3 text-sm text-muted leading-relaxed">
          Your payment was not completed successfully. You can try again or choose another payment method such as MTN Mobile Money, Airtel Money, or credit card.
        </p>

        {ref && (
          <div className="mt-6 rounded-xl bg-purple/5 p-3 text-xs text-muted">
            <span className="font-semibold text-purple-deep">Reference:</span>{" "}
            <span className="font-mono">{ref}</span>
          </div>
        )}

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/#donate"
            className="w-full sm:w-auto rounded-full bg-purple px-8 py-3 text-sm font-semibold text-white shadow transition hover:bg-purple-deep"
          >
            Try Again
          </Link>
          <Link
            href="/contact"
            className="w-full sm:w-auto rounded-full bg-lavender px-6 py-3 text-sm font-semibold text-purple transition hover:bg-lavender/80"
          >
            Need Help?
          </Link>
        </div>

        <p className="mt-6 text-xs text-muted">
          Hafisa Magezi Foundation Limited · Elderly Outreach Sponsorship
        </p>
      </div>
    </main>
  );
}
