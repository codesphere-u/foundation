"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { site } from "@/lib/content";

export function LoadingReveal() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (reduce) return;

    try {
      if (sessionStorage.getItem("hmf-revealed")) return;
    } catch {
      return;
    }

    const start = window.setTimeout(() => setShow(true), 0);
    const end = window.setTimeout(() => {
      try {
        sessionStorage.setItem("hmf-revealed", "1");
      } catch {
        /* ignore */
      }
      setShow(false);
    }, 1600);

    return () => {
      window.clearTimeout(start);
      window.clearTimeout(end);
    };
  }, [reduce]);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          className="fixed inset-0 z-[2000] flex items-center justify-center bg-purple-deep"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0.6 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-4"
          >
            <div className="logo-glow rounded-full bg-white p-1.5">
              <Image
                src="/logo.jpg"
                alt=""
                width={88}
                height={88}
                className="rounded-full"
                priority
              />
            </div>
            <p className="font-display text-xl text-gold-soft">{site.shortName}</p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
