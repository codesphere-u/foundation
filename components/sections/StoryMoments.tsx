"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { storyMoments, storyMomentsHeading } from "@/lib/content";
import { FadeIn } from "@/components/ui/FadeIn";
import {
  ButterflyIcon,
  GeometricStar,
  LeafIcon,
  SeedlingIcon,
} from "@/components/illustrations/Icons";

const momentIcons = {
  education: ButterflyIcon,
  agriculture: SeedlingIcon,
  health: GeometricStar,
  partnerships: LeafIcon,
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
  health: {
    ring: "ring-purple/25",
    active: "bg-purple text-white",
    idle: "bg-lavender text-purple",
    bar: "from-purple to-gold-soft",
  },
  partnerships: {
    ring: "ring-gold/30",
    active: "bg-gold text-purple-deep",
    idle: "bg-gold/15 text-purple",
    bar: "from-gold-soft to-purple",
  },
} as const;

export function StoryMoments() {
  const [index, setIndex] = useState(0);
  const [side, setSide] = useState<"pathway" | "outcome">("outcome");
  const reduce = useReducedMotion();
  const moment = storyMoments[index];
  const Icon = momentIcons[moment.id as keyof typeof momentIcons] ?? ButterflyIcon;
  const accent = momentAccents[moment.id as keyof typeof momentAccents] ?? momentAccents.education;
  const imageSrc = side === "pathway" ? moment.startImage : moment.growthImage;
  const imageAlt = side === "pathway" ? moment.startImageAlt : moment.growthImageAlt;
  const quote = side === "pathway" ? moment.pathwayQuote : moment.outcomeQuote;
  const body = side === "pathway" ? moment.pathway : moment.outcome;

  return (
    <section className="relative overflow-hidden bg-paper">
      <div className="section-pad relative mx-auto max-w-6xl px-5 md:px-8">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">{storyMomentsHeading.eyebrow}</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-purple-deep sm:text-4xl md:text-5xl">
            {storyMomentsHeading.title}
          </h2>
        </FadeIn>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <FadeIn>
            <div
              className={`relative aspect-[4/3] min-h-[18rem] overflow-hidden rounded-[2rem] rounded-tl-[3.5rem] ring-4 sm:min-h-[22rem] ${accent.ring}`}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${moment.id}-${side}`}
                  className="absolute inset-0"
                  initial={reduce ? false : { opacity: 0.35 }}
                  animate={{ opacity: 1 }}
                  exit={reduce ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <Image
                    src={imageSrc}
                    alt={imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 55vw"
                  />
                </motion.div>
              </AnimatePresence>
              <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${accent.bar}`} />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-deep/45 via-purple-deep/5 to-transparent" />
              <p className="absolute bottom-5 left-5 right-5 font-display text-xl text-white sm:text-2xl md:text-3xl">
                “{quote}”
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="flex flex-wrap gap-2">
              {storyMoments.map((m, i) => {
                const TabIcon = momentIcons[m.id as keyof typeof momentIcons] ?? ButterflyIcon;
                const tabAccent =
                  momentAccents[m.id as keyof typeof momentAccents] ?? momentAccents.education;
                const on = i === index;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => {
                      setIndex(i);
                      setSide("outcome");
                    }}
                    className={`inline-flex min-h-11 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                      on ? tabAccent.active : tabAccent.idle
                    }`}
                    aria-pressed={on}
                  >
                    <TabIcon className="h-5 w-5" />
                    {m.tabLabel}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 flex gap-2">
              {(["pathway", "outcome"] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSide(s)}
                  className={`min-h-11 flex-1 rounded-full text-sm font-semibold transition ${
                    side === s
                      ? "bg-gold text-purple-deep"
                      : "border border-purple/15 text-purple hover:border-purple/30"
                  }`}
                  aria-pressed={side === s}
                >
                  {s === "pathway" ? moment.pathwayLabel : moment.outcomeLabel}
                </button>
              ))}
            </div>

            <div className="relative mt-8 min-h-[9rem]">
              <AnimatePresence mode="wait">
                <motion.p
                  key={`${moment.id}-${side}-body`}
                  initial={reduce ? false : { y: 12, opacity: 0.4 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={reduce ? undefined : { y: -8, opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="luxury-prose text-lg sm:text-xl"
                >
                  {body}
                </motion.p>
              </AnimatePresence>
            </div>

            <p className="mt-4 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.14em] text-gold uppercase">
              <Icon className="h-4 w-4" />
              {moment.tabLabel}
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
