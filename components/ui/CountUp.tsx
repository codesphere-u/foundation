"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

type Props = {
  value: number;
  suffix?: string;
  display?: string;
  format?: "compact" | "plain";
  label: string;
};

function formatNumber(value: number, format?: "compact" | "plain") {
  if (format === "compact") {
    return new Intl.NumberFormat("en", {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(value);
  }
  return new Intl.NumberFormat("en").format(value);
}

export function CountUp({ value, suffix = "", display, format, label }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!inView || display || reduce) return;

    const duration = 1600;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(value * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, display, reduce]);

  const numeric = reduce || !inView ? (inView ? value : 0) : current;
  const text = display ?? `${formatNumber(numeric, format)}${suffix}`;

  return (
    <div ref={ref} className="text-center">
      <p className="font-display text-4xl font-semibold text-purple md:text-5xl">{text}</p>
      <p className="mt-2 text-sm font-medium tracking-wide text-muted uppercase">{label}</p>
    </div>
  );
}
