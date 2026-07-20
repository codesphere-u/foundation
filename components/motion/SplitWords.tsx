"use client";

import { motion, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

type Props = {
  text: string;
  className?: string;
  wordClassName?: string;
  highlight?: string;
  highlightClassName?: string;
  delay?: number;
  stagger?: number;
};

export function SplitWords({
  text,
  className = "",
  wordClassName = "",
  highlight,
  highlightClassName = "text-shimmer",
  delay = 0.35,
  stagger = 0.07,
}: Props) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  if (reduce) {
    return (
      <h1 className={className} aria-label={text}>
        {words.map((word, i) => {
          const isHighlight = highlight && word.replace(/[^0-9,]/g, "") === highlight.replace(/[^0-9,]/g, "");
          return (
            <span key={`${word}-${i}`} className={isHighlight ? highlightClassName : undefined}>
              {word}
              {i < words.length - 1 ? " " : ""}
            </span>
          );
        })}
      </h1>
    );
  }

  return (
    <h1 className={className} aria-label={text}>
      {words.map((word, i) => {
        const isHighlight =
          highlight &&
          (word === highlight || word.replace(/,/g, "") === highlight.replace(/,/g, ""));
        return (
          <span key={`${word}-${i}`} className="inline-block overflow-hidden align-top">
            <motion.span
              className={`inline-block ${wordClassName} ${isHighlight ? highlightClassName : ""}`}
              aria-hidden
              initial={{ y: "110%", rotate: 2 }}
              animate={{ y: "0%", rotate: 0 }}
              transition={{ duration: 0.85, ease, delay: delay + i * stagger }}
            >
              {word}
            </motion.span>
            {i < words.length - 1 ? <span aria-hidden>{"\u00A0"}</span> : null}
          </span>
        );
      })}
    </h1>
  );
}
