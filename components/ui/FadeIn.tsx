"use client";

import { motion, useReducedMotion } from "framer-motion";
import { type ReactNode } from "react";

type Variant = "up" | "left" | "right" | "scale" | "blur";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: Variant;
};

/** Transform-only motion — never opacity:0 (traps content invisible on some mobile browsers). */
const initials: Record<Variant, { y?: number; x?: number; scale?: number }> = {
  up: { y: 28 },
  left: { x: -28 },
  right: { x: 28 },
  scale: { scale: 0.97 },
  blur: { y: 20 },
};

const visibles: Record<Variant, { y?: number; x?: number; scale?: number }> = {
  up: { y: 0 },
  left: { x: 0 },
  right: { x: 0 },
  scale: { scale: 1 },
  blur: { y: 0 },
};

export function FadeIn({ children, className = "", delay = 0, variant = "up" }: Props) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={initials[variant]}
      whileInView={visibles[variant]}
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
