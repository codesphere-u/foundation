"use client";

import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useState } from "react";

/** Thin gold progress bar at the top of the viewport (Hut 8–style journey cue). */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reduce = useReducedMotion();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: reduce ? 400 : 100,
    damping: reduce ? 40 : 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="pointer-events-none fixed inset-x-0 top-0 z-[1000] h-[3px] origin-left bg-gradient-to-r from-gold via-gold-soft to-gold"
      style={{ scaleX }}
      aria-hidden
    />
  );
}

/** Live 0–100 scroll percent for the navbar readout. */
export function useScrollPercent() {
  const { scrollYProgress } = useScroll();
  const reduce = useReducedMotion();
  const [percent, setPercent] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.round(v * 100);
    setPercent((prev) => (prev === next ? prev : next));
  });

  return { percent, reduce };
}

export function ScrollPercentBadge({ className = "" }: { className?: string }) {
  const { percent } = useScrollPercent();

  return (
    <span
      className={`nav-percent tabular-nums ${className}`}
      aria-hidden
    >
      {percent}%
    </span>
  );
}
