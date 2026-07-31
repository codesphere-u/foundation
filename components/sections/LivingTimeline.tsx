"use client";

import { motion, useReducedMotion } from "framer-motion";
import { milestones, timelineHeading } from "@/lib/content";
import { FadeIn } from "@/components/ui/FadeIn";

const statusStyles = {
  done: "border-gold bg-gold text-purple-deep",
  active: "border-gold bg-paper text-gold",
  planned: "border-purple/25 bg-lavender/80 text-muted",
} as const;

export function LivingTimeline({ condensed = false }: { condensed?: boolean }) {
  const reduce = useReducedMotion();
  const items = condensed ? milestones.slice(0, 4) : milestones;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-lavender/40 to-paper">
      <div className="section-pad relative mx-auto max-w-4xl px-5 md:px-8">
        <FadeIn className="text-center">
          <p className="eyebrow">{timelineHeading.eyebrow}</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-purple-deep sm:text-4xl md:text-5xl">
            {timelineHeading.title}
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
              const status = item.status;
              return (
                <FadeIn key={item.title} delay={i * 0.05}>
                  <li className="relative grid gap-4 md:grid-cols-2">
                    <div
                      className={`absolute top-3 left-[6px] flex h-4 w-4 items-center justify-center rounded-full border-2 md:left-1/2 md:-translate-x-1/2 ${statusStyles[status]}`}
                      aria-hidden
                    >
                      {status === "done" ? (
                        <span className="block h-1.5 w-1.5 rounded-full bg-purple-deep" />
                      ) : null}
                    </div>
                    <div
                      className={`pl-10 md:pl-0 ${
                        left ? "md:pr-12 md:text-right" : "md:col-start-2 md:pl-12"
                      } ${status === "planned" ? "opacity-75" : ""}`}
                    >
                      <div
                        className={`flex flex-wrap items-center gap-2 ${
                          left ? "md:justify-end" : ""
                        }`}
                      >
                        <p className="text-xs font-semibold tracking-[0.18em] text-gold uppercase">
                          {item.phase}
                        </p>
                        <span className="rounded-full bg-purple/10 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-purple uppercase">
                          {status}
                        </span>
                      </div>
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
