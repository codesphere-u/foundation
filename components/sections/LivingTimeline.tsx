"use client";

import { motion, useReducedMotion } from "framer-motion";
import { milestones } from "@/lib/content";
import { FadeIn } from "@/components/ui/FadeIn";

export function LivingTimeline({ condensed = false }: { condensed?: boolean }) {
  const reduce = useReducedMotion();
  const items = condensed ? milestones.slice(0, 4) : milestones;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-lavender/40 to-paper">
      <div className="section-pad relative mx-auto max-w-4xl px-5 md:px-8">
        <FadeIn className="text-center">
          <p className="eyebrow">Our journey</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-purple-deep sm:text-4xl md:text-5xl">
            A timeline of growing hope
          </h2>
        </FadeIn>

        <div className="relative mt-14">
          <motion.div
            className="timeline-curve absolute top-2 bottom-2 left-[11px] w-[3px] origin-top rounded-full md:left-1/2 md:-translate-x-1/2"
            initial={reduce ? false : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />

          <ol className="space-y-10">
            {items.map((item, i) => {
              const left = i % 2 === 0;
              return (
                <FadeIn key={item.title} delay={i * 0.05}>
                  <li className="relative grid gap-4 md:grid-cols-2">
                    <div
                      className={`absolute top-3 left-[6px] h-4 w-4 rounded-full border-2 border-gold bg-paper md:left-1/2 md:-translate-x-1/2 ${
                        left ? "" : ""
                      }`}
                    />
                    <div className={`pl-10 md:pl-0 ${left ? "md:pr-12 md:text-right" : "md:col-start-2 md:pl-12"}`}>
                      <p className="text-xs font-semibold tracking-[0.18em] text-gold uppercase">
                        {item.phase}
                      </p>
                      <h3 className="mt-1 font-display text-2xl font-semibold text-purple-deep">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
                    </div>
                    {left ? <div className="hidden md:block" /> : null}
                  </li>
                </FadeIn>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
