"use client";

import { useMemo, useState } from "react";
import { calculator, donateUrl } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { ButterflyIcon, GeometricStar, SeedlingIcon } from "@/components/illustrations/Icons";

export function ImpactCalculator() {
  const [amount, setAmount] = useState(calculator.defaultAmount);

  const impact = useMemo(() => {
    const kits = Math.floor(amount / calculator.rates.schoolKits);
    const seedlings = Math.floor(amount / calculator.rates.seedlings);
    const days = Math.floor(amount / calculator.rates.outreachDays);
    return { kits, seedlings, days };
  }, [amount]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-lavender/60 to-paper">
      <div className="section-pad relative mx-auto max-w-4xl px-5 md:px-8">
        <FadeIn className="text-center">
          <p className="eyebrow">{calculator.eyebrow}</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-purple-deep sm:text-4xl md:text-5xl">
            {calculator.title}
          </h2>
          <p className="luxury-prose mx-auto mt-4 max-w-xl">{calculator.subtitle}</p>
        </FadeIn>

        <FadeIn delay={0.1} className="glass-gold mt-12 rounded-[2rem] p-6 sm:p-10">
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm font-medium tracking-wide text-muted uppercase">Gift amount</p>
            <p className="font-display text-4xl font-semibold text-purple sm:text-5xl">
              UGX {amount.toLocaleString()}
            </p>
          </div>

          <label className="mt-8 block">
            <span className="mb-2 block text-center text-xs font-semibold tracking-wide text-muted uppercase">
              Adjust gift amount
            </span>
            <input
              type="range"
              min={calculator.min}
              max={calculator.max}
              step={calculator.step}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              aria-valuetext={`UGX ${amount.toLocaleString()}`}
              className="impact-range h-3 w-full cursor-pointer appearance-none rounded-full bg-purple/15 accent-gold"
            />
          </label>

          <ul className="mt-10 grid gap-6 sm:grid-cols-3">
            <li className="text-center">
              <ButterflyIcon className="mx-auto h-10 w-10" />
              <p className="mt-3 font-display text-3xl font-semibold text-purple">{impact.kits}</p>
              <p className="mt-1 text-sm text-muted">Learning kits</p>
            </li>
            <li className="text-center">
              <SeedlingIcon className="mx-auto h-10 w-10" />
              <p className="mt-3 font-display text-3xl font-semibold text-purple">{impact.seedlings}</p>
              <p className="mt-1 text-sm text-muted">Coffee seedlings</p>
            </li>
            <li className="text-center">
              <GeometricStar className="mx-auto h-10 w-10 text-gold" />
              <p className="mt-3 font-display text-3xl font-semibold text-purple">{impact.days}</p>
              <p className="mt-1 text-sm text-muted">Outreach days</p>
            </li>
          </ul>

          <div className="mt-10 flex flex-col items-center gap-3">
            <p className="text-center text-xs text-muted">
              Suggested amount: UGX {amount.toLocaleString()}
            </p>
            <Button
              href={donateUrl}
              variant="gold"
            >
              Invest now
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
