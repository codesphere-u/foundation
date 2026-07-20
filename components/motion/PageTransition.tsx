"use client";

import { motion, useReducedMotion } from "framer-motion";
import { type ReactNode } from "react";

export function PageTransition({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();

  if (reduce) return <>{children}</>;

  return (
    <motion.div
      initial={{ y: 12, filter: "blur(0px)" }}
      animate={{ y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
