"use client";

import { useState } from "react";
import { mapProjects } from "@/lib/content";
import { FadeIn } from "@/components/ui/FadeIn";

/** Simplified Uganda-inspired outline for interactive project map. */
function UgandaOutline() {
  return (
    <path
      d="M180 40
         C210 45 235 70 245 105
         C255 140 250 175 240 210
         C228 250 210 285 185 310
         C160 330 130 340 105 335
         C75 328 55 300 48 265
         C40 225 45 185 55 150
         C68 105 95 70 130 50
         C148 42 165 38 180 40 Z"
      fill="url(#ugFill)"
      stroke="#c59b27"
      strokeWidth="2"
    />
  );
}

type ProjectId = (typeof mapProjects)[number]["id"];

export function UgandaMap() {
  const [active, setActive] = useState<ProjectId>(mapProjects[0].id);
  const project = mapProjects.find((p) => p.id === active) ?? mapProjects[0];

  return (
    <section className="relative overflow-hidden bg-lavender/50">
      <div className="section-pad relative mx-auto max-w-6xl px-5 md:px-8">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Where we serve</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-purple-deep sm:text-4xl md:text-5xl">
            Growing across Uganda
          </h2>
          <p className="luxury-prose mt-4">
            Rooted in Masaka today—with planned expansion for education, agriculture, and care.
          </p>
        </FadeIn>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-2">
          <FadeIn className="relative mx-auto w-full max-w-md">
            <svg
              viewBox="0 0 300 380"
              className="h-auto w-full drop-shadow-lg"
              aria-hidden
            >
              <defs>
                <linearGradient id="ugFill" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4a2e80" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#2f1b52" stopOpacity="0.95" />
                </linearGradient>
              </defs>
              <UgandaOutline />
              {mapProjects.map((pin) => {
                const isOn = pin.id === active;
                return (
                  <g key={pin.id} className="pointer-events-none">
                    <circle
                      cx={(pin.x / 100) * 300}
                      cy={(pin.y / 100) * 380}
                      r={isOn ? 14 : 10}
                      className={isOn ? "fill-gold" : "fill-gold/55"}
                    />
                    <circle
                      cx={(pin.x / 100) * 300}
                      cy={(pin.y / 100) * 380}
                      r={isOn ? 22 : 0}
                      fill="none"
                      stroke="#d4b45a"
                      strokeWidth="2"
                      opacity={isOn ? 0.6 : 0}
                    />
                  </g>
                );
              })}
            </svg>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="glass rounded-[2rem] p-8" role="region" aria-live="polite">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-xs font-semibold tracking-[0.2em] text-gold uppercase">
                  {project.focus}
                </p>
                {project.status === "planned" ? (
                  <span className="rounded-full bg-gold/20 px-2.5 py-0.5 text-[10px] font-semibold tracking-wide text-purple uppercase">
                    Planned
                  </span>
                ) : (
                  <span className="rounded-full bg-purple/15 px-2.5 py-0.5 text-[10px] font-semibold tracking-wide text-purple uppercase">
                    Active
                  </span>
                )}
              </div>
              <h3 className="mt-2 font-display text-3xl font-semibold text-purple-deep">
                {project.name}
              </h3>
              <p className="luxury-prose mt-4">{project.description}</p>
              <ul className="mt-8 flex flex-wrap gap-2">
                {mapProjects.map((pin) => (
                  <li key={pin.id}>
                    <button
                      type="button"
                      onClick={() => setActive(pin.id)}
                      className={`min-h-11 rounded-full px-4 py-2 text-sm font-medium transition ${
                        pin.id === active
                          ? "bg-purple text-white"
                          : "bg-white/70 text-purple hover:bg-white"
                      }`}
                      aria-pressed={pin.id === active}
                    >
                      {pin.name}
                      {pin.status === "planned" ? " · Planned" : ""}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
