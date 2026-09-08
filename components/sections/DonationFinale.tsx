"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { campaign, donation } from "@/lib/content";
import { FadeIn } from "@/components/ui/FadeIn";
import { CheckoutForm } from "@/components/CheckoutForm";

export function DonationFinale() {
  const reduce = useReducedMotion();
  const progress = Math.min(campaign.current / campaign.goal, 1);

  return (
    <section id="donate" className="relative overflow-hidden bg-paper scroll-mt-16">
      <div className="section-pad relative mx-auto max-w-5xl px-5 md:px-8">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Elderly Outreach Sponsorship</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-purple-deep sm:text-4xl md:text-5xl">
            Sponsor an Elder in Masaka
          </h2>
          <p className="luxury-prose mx-auto mt-4 max-w-xl">
            Join Hafisa Magezi Foundation Limited on 19 September 2026 in Kiyimbwe Village, Masaka.
            Your sponsorship directly provides nutritious provisions, medical checkup essentials, and continuous dignity care.
          </p>
        </FadeIn>

        <FadeIn delay={0.08} className="mt-10 overflow-hidden rounded-[2rem]">
          <div className="relative aspect-[16/10] min-h-[12rem] sm:aspect-[21/9] sm:min-h-[14rem]">
            <Image
              src={donation.backgroundImage}
              alt={donation.backgroundImageAlt}
              fill
              className="object-cover object-[50%_35%]"
              sizes="(max-width: 1024px) 100vw, 960px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-deep/70 via-purple-deep/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6">
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-semibold tracking-[0.18em] text-gold-soft uppercase">
                  Shared Outreach Goal · {campaign.goal.toLocaleString()} Elders & Families
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

        {/* Integrated Pesapal 3.0 Checkout System */}
        <div className="mt-12">
          <CheckoutForm defaultTierId="1-elderly" />
        </div>
      </div>
    </section>
  );
}
