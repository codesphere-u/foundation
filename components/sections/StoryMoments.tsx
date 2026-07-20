"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { storyMoments } from "@/lib/content";
import { FadeIn } from "@/components/ui/FadeIn";
import { ButterflyIcon, SeedlingIcon } from "@/components/illustrations/Icons";

const momentIcons = {
  education: ButterflyIcon,
  agriculture: SeedlingIcon,
} as const;

const momentAccents = {
  education: {
    ring: "ring-purple/30",
    active: "bg-purple text-white",
    idle: "bg-lavender text-purple",
    bar: "from-purple to-gold",
  },
  agriculture: {
    ring: "ring-gold/40",
    active: "bg-gold text-purple-deep",
    idle: "bg-gold/15 text-purple",
    bar: "from-gold to-purple",
  },
} as const;

export function StoryMoments() {
  const [index, setIndex] = useState(0);
  const [side, setSide] = useState<"before" | "after">("after");
  const reduce = useReducedMotion();
  const moment = storyMoments[index];
  const Icon = momentIcons[moment.id as keyof typeof momentIcons] ?? ButterflyIcon;
  const accent = momentAccents[moment.id as keyof typeof momentAccents] ?? momentAccents.education;

  return (
    <section className="relative overflow-hidden bg-paper">
      <div className="section-pad relative mx-auto max-w-6xl px-5 md:px-8">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Impact stories</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-purple-deep sm:text-4xl md:text-5xl">
            Before hope. After opportunity.
          </h2>
        </FadeIn>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <FadeIn>
            <div
              className={`relative aspect-[4/3] min-h-[18rem] overflow-hidden rounded-[2rem] rounded-tl-[3.5rem] ring-4 sm:min-h-[22rem] ${accent.ring}`}
            >
              <Image
                src={moment.image}
                alt={moment.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
              <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${accent.bar}`} />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-deep/75 via-purple-deep/10 to-transparent" />
              <div className="absolute top-5 left-5 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm">
                <Icon className="h-7 w-7 text-purple" />
              </div>
              <p className="absolute bottom-5 left-5 right-5 font-display text-xl text-white sm:text-2xl md:text-3xl">
                “{moment.quote}”
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="flex flex-wrap gap-2">
              {storyMoments.map((m, i) => {
                const TabIcon = momentIcons[m.id as keyof typeof momentIcons] ?? ButterflyIcon;
                const tabAccent = momentAccents[m.id as keyof typeof momentAccents] ?? momentAccents.education;
                const on = i === index;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setIndex(i)}
                    className={`inline-flex min-h-11 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                      on ? tabAccent.active : tabAccent.idle
                    }`}
                    aria-pressed={on}
                  >
                    <TabIcon className="h-5 w-5" />
                    {m.id === "education" ? "Education" : "Agriculture"}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 flex gap-2">
              {(["before", "after"] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSide(s)}
                  className={`min-h-11 flex-1 rounded-full text-sm font-semibold capitalize transition ${
                    side === s
                      ? "bg-gold text-purple-deep"
                      : "border border-purple/15 text-purple hover:border-purple/30"
                  }`}
                  aria-pressed={side === s}
                >
                  {s === "before" ? moment.beforeLabel : moment.afterLabel}
                </button>
              ))}
            </div>

            <div className="relative mt-8 min-h-[9rem]">
              <AnimatePresence mode="wait">
                <motion.p
                  key={`${moment.id}-${side}`}
                  initial={reduce ? false : { y: 12, opacity: 0.4 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={reduce ? undefined : { y: -8, opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="luxury-prose text-lg sm:text-xl"
                >
                  {side === "before" ? moment.before : moment.after}
                </motion.p>
              </AnimatePresence>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
