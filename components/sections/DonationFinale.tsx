"use client";

import Image from "next/image";
import { useState } from "react";
import { campaign, donation, donationAmounts, donateUrl } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { AmbientSky } from "@/components/motion/AmbientSky";
import { SeedlingGrow } from "@/components/motion/SeedlingGrow";

export function DonationFinale() {
  const [selected, setSelected] = useState<string>("50k");
  const amount = donationAmounts.find((a) => a.id === selected) ?? donationAmounts[1];
  const progress = Math.min(campaign.current / campaign.goal, 1);
  const remaining = Math.max(campaign.goal - campaign.current, 0);

  return (
    <section id="donate" className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={donation.backgroundImage}
          alt="Warm Ugandan sunrise sky — hope for tomorrow"
          fill
          className="object-cover object-[50%_40%]"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-purple-deep/88" />
      <AmbientSky />

      <div className="section-pad relative mx-auto max-w-3xl px-5 text-center md:px-8">
        <FadeIn>
          <div className="mb-4 flex justify-center">
            <SeedlingGrow />
          </div>
          <p className="text-xs font-semibold tracking-[0.22em] text-gold-soft uppercase">
            {donation.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-white sm:text-4xl md:text-5xl">
            {donation.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/80">
            {donation.subtitle}
          </p>
        </FadeIn>

        <FadeIn delay={0.1} className="mt-10">
          <div className="mx-auto max-w-md">
            <div className="mb-2 flex items-end justify-between gap-3 text-left">
              <p className="text-sm font-medium text-white/85">
                <span className="font-display text-2xl font-semibold text-gold-soft">
                  {campaign.current.toLocaleString()}
                </span>
                <span className="text-white/60"> lives reached</span>
              </p>
              <p className="text-xs text-white/55">
                Goal {campaign.goal.toLocaleString()}
              </p>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-white/15">
              <div
                className="h-full rounded-full bg-gradient-to-r from-gold to-gold-soft transition-all duration-1000"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
            <p className="mt-3 text-sm text-white/70">
              {remaining > 0
                ? `${remaining.toLocaleString()} more lives to reach our shared goal — every gift grows the harvest.`
                : "Goal reached — thank you for growing hope with us."}
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.15} className="mt-10">
          <ul className="grid gap-3 sm:grid-cols-2">
            {donationAmounts.map((opt) => {
              const on = opt.id === selected;
              return (
                <li key={opt.id}>
                  <button
                    type="button"
                    onClick={() => setSelected(opt.id)}
                    className={`glass-dark w-full rounded-2xl px-5 py-4 text-left transition ${
                      on ? "ring-2 ring-gold" : "hover:bg-white/10"
                    }`}
                    aria-pressed={on}
                  >
                    <p className="font-display text-xl font-semibold text-gold-soft">{opt.label}</p>
                    <p className="mt-1 text-sm text-white/70">{opt.impact}</p>
                  </button>
                </li>
              );
            })}
          </ul>
          <p className="mt-6 text-sm text-white/65" aria-live="polite">
            Selected: {amount.label} — {amount.impact}
          </p>
          <p className="mt-2 text-xs text-white/50">
            You will complete your gift securely on RaiseUG.
          </p>
          <div className="mt-8 flex justify-center">
            <Button
              href={donateUrl}
              variant="gold"
              className="glow-btn px-10"
              heartbeat
              target="_blank"
              rel="noopener noreferrer"
            >
              Continue on RaiseUG
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
