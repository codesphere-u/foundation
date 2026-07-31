"use client";

import { campaign, impactStats } from "@/lib/content";
import { CountUp } from "@/components/ui/CountUp";
import { FadeIn } from "@/components/ui/FadeIn";
import { GeometricAccent } from "@/components/motion/GeometricAccent";

export function ImpactTrust() {
  return (
    <section className="relative overflow-hidden bg-paper">
      <GeometricAccent />
      <div className="section-pad relative mx-auto max-w-6xl px-5 md:px-8">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">{campaign.eyebrow}</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-purple-deep sm:text-4xl md:text-5xl">
            {campaign.title}
          </h2>
          <p className="luxury-prose mt-4">{campaign.subtitle}</p>
        </FadeIn>

        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {impactStats.map((stat, i) => (
            <FadeIn key={stat.label} delay={i * 0.08}>
              <CountUp {...stat} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
