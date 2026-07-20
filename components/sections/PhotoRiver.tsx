"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { homeGallery } from "@/lib/content";
import { FadeIn } from "@/components/ui/FadeIn";

export function PhotoRiver() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "-35%"]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-paper py-[var(--section-space)]">
      <FadeIn className="mx-auto max-w-6xl px-5 text-center md:px-8">
        <p className="eyebrow">In the light</p>
        <h2 className="mt-3 font-display text-3xl font-semibold text-purple-deep sm:text-4xl md:text-5xl">
          Moments from the field and the launch
        </h2>
      </FadeIn>

      <div className="mt-12 overflow-x-auto overflow-y-hidden pb-2 md:overflow-hidden">
        <motion.ul style={{ x }} className="flex w-max gap-4 px-5 md:gap-6 md:px-8">
          {homeGallery.map((item) => (
            <li
              key={item.src}
              className="group relative h-64 w-80 shrink-0 overflow-hidden rounded-[1.5rem] sm:h-80 sm:w-[26rem]"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition duration-500 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                style={item.objectPosition ? { objectPosition: item.objectPosition } : undefined}
                sizes="420px"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-purple-deep/80 to-transparent p-4">
                <p className="text-sm font-medium text-white">{item.caption}</p>
              </div>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
