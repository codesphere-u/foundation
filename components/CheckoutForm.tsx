"use client";

import { useState, useId, FormEvent } from "react";

export interface SponsorshipTier {
  id: string;
  label: string;
  amount: number;
  elderlyCount: number;
  isFlagship?: boolean;
}

const SPONSORSHIP_TIERS: SponsorshipTier[] = [
  { id: "1-elderly", label: "UGX 70,000", amount: 70000, elderlyCount: 1, isFlagship: true },
  { id: "2-elderly", label: "UGX 140,000", amount: 140000, elderlyCount: 2 },
  { id: "5-elderly", label: "UGX 350,000", amount: 350000, elderlyCount: 5 },
  { id: "10-elderly", label: "UGX 700,000", amount: 700000, elderlyCount: 10 },
  { id: "20-elderly", label: "UGX 1,400,000", amount: 1400000, elderlyCount: 20 },
];

const VALID_PESAPAL_HOSTNAMES = ["pay.pesapal.com", "cybqa.pesapal.com"];

function isValidPesapalUrl(urlStr: string): boolean {
  try {
    const parsed = new URL(urlStr);
    return (
      parsed.protocol === "https:" &&
      VALID_PESAPAL_HOSTNAMES.includes(parsed.hostname)
    );
  } catch {
    return false;
  }
}

interface CheckoutFormProps {
  defaultTierId?: string;
  className?: string;
}

export function CheckoutForm({ defaultTierId = "1-elderly", className = "" }: CheckoutFormProps) {
  const [selectedTier, setSelectedTier] = useState<string | "custom">(defaultTierId);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);
  const [trackingId, setTrackingId] = useState<string | null>(null);

  const firstNameId = useId();
  const lastNameId = useId();
  const emailId = useId();
  const amountId = useId();

  // Compute final amount in UGX
  const effectiveAmount =
    selectedTier === "custom"
      ? parseInt(customAmount.replace(/[^0-9]/g, ""), 10) || 0
      : SPONSORSHIP_TIERS.find((t) => t.id === selectedTier)?.amount || 70000;

  const currentTierObj =
    selectedTier === "custom"
      ? null
      : SPONSORSHIP_TIERS.find((t) => t.id === selectedTier);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    setFormError(null);

    const trimmedFirst = firstName.trim();
    const trimmedLast = lastName.trim();
    const trimmedEmail = email.trim();

    if (!trimmedFirst) {
      setFormError("Please enter your first name.");
      return;
    }
    if (!trimmedLast) {
      setFormError("Please enter your last name.");
      return;
    }
    if (!trimmedEmail || !trimmedEmail.includes("@") || !trimmedEmail.includes(".")) {
      setFormError("Please enter a valid email address.");
      return;
    }
    if (!effectiveAmount || effectiveAmount <= 0 || !Number.isInteger(effectiveAmount)) {
      setFormError("Please select or enter a valid whole UGX amount.");
      return;
    }
    if (effectiveAmount > 100_000_000) {
      setFormError("Amount exceeds maximum allowable single contribution.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/pesapal-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: trimmedFirst,
          lastName: trimmedLast,
          email: trimmedEmail,
          amount: effectiveAmount,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to initialize payment portal.");
      }

      if (!data.redirect_url || !isValidPesapalUrl(data.redirect_url)) {
        throw new Error("Received an unexpected redirect location from payment service.");
      }

      setRedirectUrl(data.redirect_url);
      setTrackingId(data.order_tracking_id || null);
    } catch (err: unknown) {
      console.error("[CheckoutForm] Submit error:", err);
      setFormError(
        err instanceof Error
          ? err.message
          : "We were unable to reach the payment service. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelIframe = () => {
    setRedirectUrl(null);
  };

  // IFRAME VIEW
  if (redirectUrl) {
    return (
      <div className={`w-full max-w-3xl mx-auto rounded-3xl border border-purple/15 bg-white p-4 shadow-2xl sm:p-6 md:p-8 ${className}`}>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-purple/10 pb-4">
          <div>
            <span className="text-xs font-semibold tracking-wider text-gold uppercase">
              Secure Gateway · Pesapal 3.0
            </span>
            <h3 className="font-display text-xl font-bold text-purple-deep sm:text-2xl">
              Complete Your Contribution
            </h3>
            <p className="text-xs text-muted">
              Sponsorship: UGX {effectiveAmount.toLocaleString()} · Ref: {trackingId || "Pending"}
            </p>
          </div>
          <button
            type="button"
            onClick={handleCancelIframe}
            className="inline-flex min-h-10 items-center rounded-full border border-purple/20 bg-lavender/50 px-4 py-2 text-xs font-semibold text-purple-deep transition hover:bg-lavender hover:text-purple focus:outline-none focus:ring-2 focus:ring-gold"
          >
            ← Back / Change Details
          </button>
        </div>

        <div className="relative w-full overflow-hidden rounded-2xl border border-purple/10 bg-paper">
          <iframe
            src={redirectUrl}
            title="Pesapal Secure Payment Portal"
            allow="payment"
            className="w-full min-h-[720px] border-0 sm:min-h-[760px]"
          />
        </div>

        <div className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-muted">
          <svg className="h-4 w-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 1a9 9 0 100 18 9 9 0 000-18zm3.707 7.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <span>
            256-bit SSL encrypted. Payment methods include MTN Mobile Money, Airtel Money, Visa & Mastercard.
          </span>
        </div>
      </div>
    );
  }

  // CHECKOUT FORM VIEW
  return (
    <div
      className={`w-full max-w-2xl mx-auto rounded-3xl border border-purple/15 bg-white/95 p-6 shadow-2xl backdrop-blur-md sm:p-8 md:p-10 ${className}`}
    >
      {/* Campaign Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-gold/15 px-3 py-1 text-[11px] font-semibold tracking-wider text-gold-soft uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
          Flagship Outreach · 19 Sept 2026
        </div>
        <h3 className="mt-3 font-display text-2xl font-bold text-purple-deep sm:text-3xl">
          Elderly Outreach Sponsorship
        </h3>
        <p className="mt-1.5 text-xs text-muted sm:text-sm">
          Kiyimbwe Village, Masaka · <span className="italic font-medium text-gold">Sip. Support. Empower.</span>
        </p>
        <p className="mt-2 text-xs text-muted max-w-md mx-auto">
          Every UGX 70,000 directly provides nutrition, essential healthcare supplies, and continuous dignity care for one elderly elder.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6" noValidate>
        {/* Quick Amount Tier Selector */}
        <div>
          <label className="block text-xs font-semibold tracking-wider text-purple-deep uppercase">
            Select Sponsorship Level
          </label>
          <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            {SPONSORSHIP_TIERS.map((tier) => {
              const isSelected = selectedTier === tier.id;
              return (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => setSelectedTier(tier.id)}
                  aria-pressed={isSelected}
                  className={`relative flex flex-col items-center justify-center rounded-2xl p-3 text-center transition border ${
                    isSelected
                      ? "border-gold bg-purple-deep text-white shadow-md ring-2 ring-gold/50"
                      : "border-purple/15 bg-lavender/40 text-purple-deep hover:bg-lavender/80"
                  }`}
                >
                  {tier.isFlagship && (
                    <span className="absolute -top-2.5 rounded-full bg-gold px-2 py-0.5 text-[9px] font-bold text-purple-deep uppercase tracking-wider">
                      Flagship
                    </span>
                  )}
                  <span className="text-xs font-bold sm:text-sm">{tier.label}</span>
                  <span className={`text-[10px] mt-0.5 ${isSelected ? "text-gold-soft" : "text-muted"}`}>
                    {tier.elderlyCount} Elderly {tier.elderlyCount === 1 ? "Person" : "Persons"}
                  </span>
                </button>
              );
            })}

            {/* Custom Option Button */}
            <button
              type="button"
              onClick={() => setSelectedTier("custom")}
              aria-pressed={selectedTier === "custom"}
              className={`flex flex-col items-center justify-center rounded-2xl p-3 text-center transition border ${
                selectedTier === "custom"
                  ? "border-gold bg-purple-deep text-white shadow-md ring-2 ring-gold/50"
                  : "border-purple/15 bg-lavender/40 text-purple-deep hover:bg-lavender/80"
              }`}
            >
              <span className="text-xs font-bold sm:text-sm">Custom</span>
              <span className={`text-[10px] mt-0.5 ${selectedTier === "custom" ? "text-gold-soft" : "text-muted"}`}>
                Enter Any Amount
              </span>
            </button>
          </div>
        </div>

        {/* Custom Amount Input Field */}
        {selectedTier === "custom" && (
          <div className="rounded-2xl border border-gold/30 bg-gold/5 p-4 animate-fadeIn">
            <label htmlFor={amountId} className="block text-xs font-semibold text-purple-deep">
              Custom Amount in UGX
            </label>
            <div className="relative mt-2 rounded-xl shadow-sm">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-xs font-bold text-muted">
                UGX
              </span>
              <input
                id={amountId}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={customAmount}
                onChange={(e) => {
                  const val = e.target.value.replace(/[^0-9]/g, "");
                  setCustomAmount(val ? Number(val).toLocaleString() : "");
                }}
                placeholder="e.g. 500,000"
                className="block w-full rounded-xl border border-purple/20 bg-white py-2.5 pl-14 pr-4 text-sm font-semibold text-purple-deep placeholder-muted/50 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold"
              />
            </div>
          </div>
        )}

        {/* Impact Message summary */}
        {currentTierObj && (
          <div className="rounded-xl border border-purple/10 bg-lavender/30 p-3 text-center text-xs text-purple-deep">
            ✨ You are sponsoring care, nutritional packs, and home visits for{" "}
            <span className="font-bold text-gold-deep">
              {currentTierObj.elderlyCount} elderly elder{currentTierObj.elderlyCount > 1 ? "s" : ""}
            </span>{" "}
            in Masaka.
          </div>
        )}

        {/* User Details */}
        <div className="space-y-4 pt-2 border-t border-purple/10">
          <p className="text-xs font-semibold tracking-wider text-purple-deep uppercase">
            Sponsor Information
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor={firstNameId} className="block text-xs font-medium text-muted">
                First Name <span className="text-crimson">*</span>
              </label>
              <input
                id={firstNameId}
                type="text"
                required
                maxLength={60}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="e.g. Hafisa"
                className="mt-1 block w-full rounded-xl border border-purple/20 bg-white px-3.5 py-2.5 text-sm text-purple-deep placeholder-muted/40 transition focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold"
              />
            </div>

            <div>
              <label htmlFor={lastNameId} className="block text-xs font-medium text-muted">
                Last Name <span className="text-crimson">*</span>
              </label>
              <input
                id={lastNameId}
                type="text"
                required
                maxLength={60}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="e.g. Magezi"
                className="mt-1 block w-full rounded-xl border border-purple/20 bg-white px-3.5 py-2.5 text-sm text-purple-deep placeholder-muted/40 transition focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold"
              />
            </div>
          </div>

          <div>
            <label htmlFor={emailId} className="block text-xs font-medium text-muted">
              Email Address <span className="text-crimson">*</span>
            </label>
            <input
              id={emailId}
              type="email"
              required
              maxLength={100}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. sponsor@example.com"
              className="mt-1 block w-full rounded-xl border border-purple/20 bg-white px-3.5 py-2.5 text-sm text-purple-deep placeholder-muted/40 transition focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold"
            />
            <p className="mt-1 text-[11px] text-muted">Your official verified tax/donation receipt will be sent here.</p>
          </div>
        </div>

        {/* Error message display */}
        {formError && (
          <div
            role="alert"
            aria-live="polite"
            className="flex items-center gap-2 rounded-xl bg-red-50 p-3 text-xs font-medium text-crimson border border-red-200"
          >
            <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <span>{formError}</span>
          </div>
        )}

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full relative flex min-h-12 items-center justify-center rounded-full bg-gradient-to-r from-gold to-gold-soft px-6 py-3.5 text-sm font-bold text-purple-deep shadow-lg transition hover:brightness-105 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-gold"
          >
            {isLoading ? (
              <span className="inline-flex items-center gap-2">
                <svg className="h-4 w-4 animate-spin text-purple-deep" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                <span>Generating Secure Portal...</span>
              </span>
            ) : (
              <span>Continue to Secure Payment (UGX {effectiveAmount.toLocaleString()})</span>
            )}
          </button>
        </div>

        {/* Trust Badge Section */}
        <div className="pt-3 text-center">
          <div className="inline-flex items-center justify-center gap-2 text-xs text-muted">
            <svg className="h-4 w-4 text-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <span className="font-semibold text-purple-deep">Secure payment</span>
            <span>·</span>
            <span>Processed securely via Pesapal API 3.0</span>
          </div>
          <p className="mt-1 text-[11px] text-muted/80">
            Accepting MTN Mobile Money, Airtel Money, Visa & Mastercard
          </p>
        </div>
      </form>
    </div>
  );
}
