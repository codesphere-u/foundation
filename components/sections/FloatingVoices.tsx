"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { testimonials } from "@/lib/content";
import { FadeIn } from "@/components/ui/FadeIn";
import { CurveDivider } from "@/components/illustrations/Icons";

export function FloatingVoices() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-purple-deep text-white">
      <CurveDivider className="absolute top-0 left-0 z-10 text-paper" />
      <div className="absolute inset-0">
        <Image
          src="/images/celebration.jpg"
          alt=""
          fill
          className="object-cover object-[50%_40%] opacity-[0.12]"
          sizes="100vw"
          aria-hidden
        />
      </div>
      <div className="absolute inset-0 bg-purple-deep/80" />
      <div className="geometric-wash opacity-[0.06]" />

      <div className="section-pad relative mx-auto max-w-6xl px-5 md:px-8">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold tracking-[0.22em] text-gold-soft uppercase">
            Voices of hope
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl md:text-5xl">
            Stories that float from the community
          </h2>
        </FadeIn>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {testimonials.map((t, i) => (
            <FadeIn key={t.name} delay={i * 0.08}>
              <motion.blockquote
                className="glass-dark rounded-[1.75rem] p-6 sm:p-8"
                animate={
                  reduce
                    ? undefined
                    : { y: [0, i % 2 === 0 ? -8 : 8, 0] }
                }
                transition={{
                  duration: 6 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <p className="font-display text-xl leading-relaxed text-white/95 sm:text-2xl">
                  “{t.quote}”
                </p>
                <footer className="mt-6 flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-deep/40 font-display text-sm font-semibold text-gold-soft ring-2 ring-gold/70 ring-offset-2 ring-offset-purple-deep/40">
                    {t.initials}
                  </span>
                  <div>
                    <cite className="not-italic font-semibold text-gold-soft">{t.name}</cite>
                    <p className="text-sm text-white/60">{t.role}</p>
                  </div>
                </footer>
              </motion.blockquote>
            </FadeIn>
          ))}
        </div>
      </div>
      <CurveDivider flip className="relative z-10 text-paper" />
    </section>
  );
}
