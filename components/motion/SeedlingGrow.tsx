"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { SeedlingIcon } from "@/components/illustrations/Icons";

export function SeedlingGrow({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={reduce ? false : { scaleY: 0.15, opacity: 0.4 }}
        animate={inView || reduce ? { scaleY: 1, opacity: 1 } : undefined}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "bottom center" }}
      >
        <SeedlingIcon className="h-20 w-20 text-purple" />
      </motion.div>
    </div>
  );
}
