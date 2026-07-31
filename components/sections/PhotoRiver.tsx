"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { homeGallery, photoRiverHeading } from "@/lib/content";
import { FadeIn } from "@/components/ui/FadeIn";

type GalleryItem = (typeof homeGallery)[number];

const sizeClass: Record<GalleryItem["size"], string> = {
  wide: "h-48 w-[16rem] sm:h-72 sm:w-[30rem] md:h-80 md:w-[34rem]",
  tall: "h-52 w-44 sm:h-80 sm:w-64 md:h-[22rem] md:w-72",
  square: "h-48 w-48 sm:h-72 sm:w-72 md:h-80 md:w-80",
};

function GalleryCard({
  item,
  index,
  paused,
  reduceMotion,
}: {
  item: GalleryItem;
  index: number;
  paused: boolean;
  reduceMotion?: boolean;
}) {
  const reduce = useReducedMotion() || reduceMotion;
  const riseAmount = 22 + (index % 4) * 8;
  const riseDuration = 3.4 + (index % 5) * 0.5;
  const riseDelay = (index % 7) * 0.4;

  return (
    <motion.li
      className={`group relative shrink-0 overflow-hidden rounded-[1.75rem] shadow-[0_20px_50px_-28px_rgba(47,27,82,0.55)] ring-1 ring-purple/10 snap-center ${sizeClass[item.size]}`}
      style={{ borderRadius: index % 3 === 0 ? "1.75rem 1.75rem 2.75rem 1.75rem" : undefined }}
      animate={
        reduce
          ? { y: 0 }
          : paused
            ? undefined
            : {
                y: [riseAmount, -riseAmount],
              }
      }
      transition={{
        y: {
          duration: riseDuration,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "mirror",
          delay: riseDelay,
        },
      }}
      whileHover={reduce ? undefined : { scale: 1.02, transition: { duration: 0.35 } }}
    >
      <Image
        src={item.src}
        alt={item.alt}
        fill
        className="object-cover transition duration-700 ease-out group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        style={item.objectPosition ? { objectPosition: item.objectPosition } : undefined}
        sizes="(max-width: 768px) 70vw, 540px"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-purple-deep/55 via-purple-deep/10 to-transparent opacity-90 transition duration-500 group-hover:opacity-100" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent opacity-0 transition group-hover:opacity-100" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-5">
        <div>
          <p className="text-[10px] font-semibold tracking-[0.18em] text-gold-soft/90 uppercase">
            {item.kind === "field" ? "Our people" : "Our work"}
          </p>
          <p className="mt-1 font-display text-lg font-semibold text-white sm:text-xl">
            {item.caption}
          </p>
        </div>
      </div>
    </motion.li>
  );
}

function MarqueeRow({
  items,
  direction,
  duration,
  paused,
}: {
  items: GalleryItem[];
  direction: "left" | "right";
  duration: number;
  paused: boolean;
}) {
  const loop = useMemo(() => [...items, ...items], [items]);
  const from = direction === "left" ? "0%" : "-50%";
  const to = direction === "left" ? "-50%" : "0%";

  return (
    <div className="overflow-hidden py-4 md:py-8">
      <motion.ul
        className="flex w-max items-end gap-3 px-5 sm:gap-4 md:gap-6 md:px-8"
        animate={paused ? undefined : { x: [from, to] }}
        transition={{
          x: {
            duration,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
          },
        }}
      >
        {loop.map((item, i) => (
          <GalleryCard
            key={`${item.src}-${direction}-${i}`}
            item={item}
            index={i}
            paused={paused}
          />
        ))}
      </motion.ul>
    </div>
  );
}

function ScrollGallery({ items }: { items: GalleryItem[] }) {
  return (
    <ul className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-3 md:gap-6 md:px-8">
      {items.map((item, i) => (
        <GalleryCard
          key={`${item.src}-scroll-${i}`}
          item={item}
          index={i}
          paused
          reduceMotion
        />
      ))}
    </ul>
  );
}

export function PhotoRiver() {
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  const rowA = useMemo(() => homeGallery.filter((_, i) => i % 2 === 0), []);
  const rowB = useMemo(() => homeGallery.filter((_, i) => i % 2 === 1), []);

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-b from-paper via-lavender/30 to-paper py-[var(--section-space)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onPointerDown={() => setPaused(true)}
      onPointerUp={() => setPaused(false)}
      onPointerCancel={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setPaused(false);
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 20% 20%, rgba(197,155,39,0.12), transparent 55%), radial-gradient(ellipse 50% 35% at 85% 70%, rgba(74,46,128,0.08), transparent 50%)",
        }}
        aria-hidden
      />

      <FadeIn className="relative mx-auto max-w-6xl px-5 text-center md:px-8">
        <p className="eyebrow">{photoRiverHeading.eyebrow}</p>
        <h2 className="mt-3 font-display text-3xl font-semibold text-purple-deep sm:text-4xl md:text-5xl">
          {photoRiverHeading.title}
        </h2>
        {"subtitle" in photoRiverHeading && photoRiverHeading.subtitle ? (
          <p className="luxury-prose mx-auto mt-4 max-w-2xl">{photoRiverHeading.subtitle}</p>
        ) : null}
      </FadeIn>

      <div className="relative mt-10 md:mt-12">
        {!reduce ? (
          <>
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-paper to-transparent sm:w-16" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-paper to-transparent sm:w-16" />
            <MarqueeRow items={rowA} direction="left" duration={48} paused={paused} />
            <MarqueeRow items={rowB} direction="right" duration={56} paused={paused} />
          </>
        ) : (
          <ScrollGallery items={homeGallery} />
        )}
      </div>

      <p className="mt-6 text-center text-xs tracking-[0.16em] text-muted uppercase">
        {reduce ? "Swipe to explore · Field moments + living programmes" : "Tap or hover to pause · Rising as they move"}
      </p>
    </section>
  );
}
