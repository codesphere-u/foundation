"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  calculator,
  campaign,
  donation,
  donationAmounts,
  donateUrl,
} from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { ButterflyIcon, GeometricStar, SeedlingIcon } from "@/components/illustrations/Icons";

function donateHref(amountValue: number | null) {
  if (amountValue == null) return donateUrl;
  const url = new URL(donateUrl);
  url.searchParams.set("amount", String(amountValue));
  return url.toString();
}

function impactFromAmount(value: number | null) {
  if (value == null) {
    return {
      kits: null as number | null,
      seedlings: null as number | null,
      days: null as number | null,
    };
  }
  return {
    kits: Math.floor(value / calculator.rates.schoolKits),
    seedlings: Math.floor(value / calculator.rates.seedlings),
    days: Math.floor(value / calculator.rates.outreachDays),
  };
}

function formatImpact(value: number | null) {
  if (value == null) return "Any";
  if (value === 0) return "—";
  return String(value);
}

export function DonationFinale() {
  const [selected, setSelected] = useState<string>("50k");
  const reduce = useReducedMotion();
  const amount = donationAmounts.find((a) => a.id === selected) ?? donationAmounts[1];
  const progress = Math.min(campaign.current / campaign.goal, 1);
  const ctaHref = useMemo(() => donateHref(amount.value), [amount.value]);
  const impact = useMemo(() => impactFromAmount(amount.value), [amount.value]);

  return (
    <section id="donate" className="relative overflow-hidden bg-paper">
      <div className="section-pad relative mx-auto max-w-5xl px-5 md:px-8">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">{donation.eyebrow}</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-purple-deep sm:text-4xl md:text-5xl">
            {donation.title}
          </h2>
          <p className="luxury-prose mx-auto mt-4 max-w-xl">{donation.subtitle}</p>
        </FadeIn>

        <FadeIn delay={0.08} className="mt-12 overflow-hidden rounded-[2rem]">
          <div className="relative aspect-[16/10] min-h-[12rem] sm:aspect-[21/9] sm:min-h-[14rem]">
            <Image
              src={donation.backgroundImage}
              alt={donation.backgroundImageAlt}
              fill
              className="object-cover object-[50%_35%]"
              sizes="(max-width: 1024px) 100vw, 960px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-deep/50 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6">
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-semibold tracking-[0.18em] text-gold-soft uppercase">
                  Shared goal · {campaign.goal.toLocaleString()} lives
                </p>
                <div className="mt-2 h-1.5 max-w-xs overflow-hidden rounded-full bg-white/25">
                  <motion.div
                    className="h-full rounded-full bg-gold"
                    initial={reduce ? false : { width: 0 }}
                    whileInView={{ width: `${progress * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.12} className="mt-10">
          <p className="text-center text-xs font-semibold tracking-[0.16em] text-muted uppercase">
            Choose an amount
          </p>
          <ul className="mt-4 flex flex-wrap justify-center gap-2 sm:gap-3">
            {donationAmounts.map((opt) => {
              const on = opt.id === selected;
              return (
                <li key={opt.id}>
                  <button
                    type="button"
                    onClick={() => setSelected(opt.id)}
                    className={`min-h-11 rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                      on
                        ? "bg-purple text-white shadow-md"
                        : "bg-lavender/80 text-purple hover:bg-lavender"
                    }`}
                    aria-pressed={on}
                  >
                    {opt.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </FadeIn>

        <FadeIn delay={0.16} className="mx-auto mt-10 max-w-3xl">
          <div className="rounded-[1.75rem] border border-purple/10 bg-white/80 px-5 py-8 sm:px-10">
            <AnimatePresence mode="wait">
              <motion.p
                key={amount.id}
                initial={reduce ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="text-center text-base text-muted sm:text-lg"
                aria-live="polite"
              >
                {amount.impact}
              </motion.p>
            </AnimatePresence>

            <ul className="mt-8 grid grid-cols-1 gap-6 border-t border-gold/25 pt-8 sm:grid-cols-3 sm:gap-4">
              <li className="flex items-center gap-4 text-left sm:flex-col sm:items-center sm:text-center">
                <ButterflyIcon className="h-8 w-8 shrink-0" />
                <div>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={`k-${amount.id}`}
                      initial={reduce ? false : { opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="font-display text-2xl font-semibold text-purple sm:mt-2 sm:text-3xl"
                    >
                      {formatImpact(impact.kits)}
                    </motion.p>
                  </AnimatePresence>
                  <p className="mt-0.5 text-xs text-muted sm:mt-1">Learning kits</p>
                </div>
              </li>
              <li className="flex items-center gap-4 text-left sm:flex-col sm:items-center sm:text-center">
                <SeedlingIcon className="h-8 w-8 shrink-0" />
                <div>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={`s-${amount.id}`}
                      initial={reduce ? false : { opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="font-display text-2xl font-semibold text-purple sm:mt-2 sm:text-3xl"
                    >
                      {formatImpact(impact.seedlings)}
                    </motion.p>
                  </AnimatePresence>
                  <p className="mt-0.5 text-xs text-muted sm:mt-1">Coffee seedlings</p>
                </div>
              </li>
              <li className="flex items-center gap-4 text-left sm:flex-col sm:items-center sm:text-center">
                <GeometricStar className="h-8 w-8 shrink-0 text-gold" />
                <div>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={`d-${amount.id}`}
                      initial={reduce ? false : { opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="font-display text-2xl font-semibold text-purple sm:mt-2 sm:text-3xl"
                    >
                      {formatImpact(impact.days)}
                    </motion.p>
                  </AnimatePresence>
                  <p className="mt-0.5 text-xs text-muted sm:mt-1">Outreach days</p>
                </div>
              </li>
            </ul>

            <div className="mt-10 flex justify-center">
              <Button
                href={ctaHref}
                variant="gold"
                className="w-full px-10 sm:w-auto"
                target="_blank"
                rel="noopener noreferrer"
              >
                {donation.ctaLabel}
              </Button>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
