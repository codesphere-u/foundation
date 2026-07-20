"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { campaign, impactStats } from "@/lib/content";
import { CountUp } from "@/components/ui/CountUp";
import { FadeIn } from "@/components/ui/FadeIn";
import { GeometricAccent } from "@/components/motion/GeometricAccent";

function ProgressRing({ current, goal }: { current: number; goal: number }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const pct = Math.min(current / goal, 1);
  const r = 54;
  const c = 2 * Math.PI * r;

  useEffect(() => {
    if (!inView || reduce) return;

    const duration = 1800;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(pct * eased);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, pct, reduce]);

  const shown = reduce ? (inView ? pct : 0) : progress;

  return (
    <div className="relative mx-auto flex h-48 w-48 items-center justify-center sm:h-56 sm:w-56">
      <svg ref={ref} viewBox="0 0 120 120" className="-rotate-90 h-full w-full">
        <circle cx="60" cy="60" r={r} fill="none" stroke="rgba(74,46,128,0.12)" strokeWidth="8" />
        <circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke="url(#impactGoldGrad)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - shown)}
        />
        <defs>
          <linearGradient id="impactGoldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#c59b27" />
            <stop offset="100%" stopColor="#d4b45a" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <p className="font-display text-3xl font-semibold text-purple sm:text-4xl">
          {Math.round(shown * goal).toLocaleString()}
        </p>
        <p className="mt-1 text-xs tracking-wide text-muted uppercase">of {goal.toLocaleString()}</p>
      </div>
    </div>
  );
}

export function ImpactTrust() {
  return (
    <section className="relative overflow-hidden bg-paper">
      <GeometricAccent />
      <div className="section-pad relative mx-auto max-w-6xl px-5 md:px-8">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">{campaign.eyebrow}</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-purple-deep sm:text-4xl md:text-5xl">
            {campaign.title}
          </h2>
          <p className="luxury-prose mt-4">{campaign.subtitle}</p>
        </FadeIn>

        <FadeIn delay={0.1} className="mt-12">
          <ProgressRing current={campaign.current} goal={campaign.goal} />
          <p className="mt-4 text-center text-sm font-medium text-muted">{campaign.label}</p>
        </FadeIn>

        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {impactStats.map((stat, i) => (
            <FadeIn key={stat.label} delay={i * 0.08}>
              <CountUp {...stat} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
