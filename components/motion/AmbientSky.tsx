"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { BirdIcon, LeafIcon } from "@/components/illustrations/Icons";

export function AmbientSky({ dense = false }: { dense?: boolean }) {
  const reduce = useReducedMotion();
  const [lite, setLite] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px), (pointer: coarse)");
    const update = () => setLite(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (reduce) return null;

  const birds = lite ? [0] : dense ? [0, 1, 2] : [0, 1];
  const particles = lite ? 4 : dense ? 14 : 8;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className={`light-rays ${lite ? "opacity-50" : ""}`} />
      <div
        className="animate-cloud absolute top-[12%] left-[-10%] h-24 w-[40%] rounded-full bg-white/10 blur-2xl"
      />
      {!lite ? (
        <div
          className="animate-cloud absolute top-[22%] right-[-5%] h-16 w-[28%] rounded-full bg-white/8 blur-2xl"
          style={{ animationDelay: "4s" }}
        />
      ) : null}

      {birds.map((i) => (
        <div
          key={`bird-${i}`}
          className="absolute opacity-60"
          style={{
            top: `${18 + i * 12}%`,
            animation: `drift-x ${22 + i * 6}s linear infinite`,
            animationDelay: `${i * 4}s`,
          }}
        >
          <BirdIcon className={`h-4 w-8 text-white ${i % 2 ? "scale-75" : ""}`} />
        </div>
      ))}

      {Array.from({ length: particles }).map((_, i) => (
        <span
          key={`p-${i}`}
          className="absolute h-1 w-1 rounded-full bg-gold-soft/70"
          style={{
            left: `${8 + ((i * 17) % 84)}%`,
            bottom: `${(i * 11) % 40}%`,
            animation: `particle-rise ${10 + (i % 5)}s linear infinite`,
            animationDelay: `${i * 0.7}s`,
          }}
        />
      ))}

      <div className="animate-leaf absolute top-[35%] right-[8%] opacity-50">
        <LeafIcon className="h-7 w-7" />
      </div>
      {!lite ? (
        <div className="animate-leaf absolute bottom-[28%] left-[6%] opacity-40" style={{ animationDelay: "2s" }}>
          <LeafIcon className="h-6 w-6" />
        </div>
      ) : null}
    </div>
  );
}
