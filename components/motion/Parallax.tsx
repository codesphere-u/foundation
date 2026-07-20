"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { type ReactNode, useRef } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  speed?: number;
};

export function Parallax({ children, className = "", speed = 0.2 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [speed * -80, speed * 80]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="h-full w-full will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}
