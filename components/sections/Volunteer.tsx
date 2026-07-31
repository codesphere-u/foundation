"use client";

import Image from "next/image";
import { useState } from "react";
import { volunteer, volunteerRoles } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { SeedlingGrow } from "@/components/motion/SeedlingGrow";

type RoleId = (typeof volunteerRoles)[number]["id"];

export function Volunteer() {
  const [role, setRole] = useState<RoleId>(volunteerRoles[0].id);
  const selected = volunteerRoles.find((r) => r.id === role) ?? volunteerRoles[0];

  return (
    <section id="volunteer" className="relative overflow-hidden bg-gradient-to-b from-lavender/60 to-paper">
      <div className="section-pad relative mx-auto grid max-w-6xl items-center gap-12 px-5 md:px-8 lg:grid-cols-2">
        <FadeIn variant="left">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] rounded-bl-[3.5rem]">
            <Image
              src={volunteer.image}
              alt={volunteer.imageAlt}
              fill
              className="object-cover object-[50%_40%]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-deep/50 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4">
              <SeedlingGrow />
            </div>
          </div>
        </FadeIn>
        <FadeIn delay={0.08} variant="right">
          <p className="eyebrow">Volunteer</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-purple-deep md:text-4xl lg:text-5xl">
            {volunteer.title}
          </h2>
          <p className="luxury-prose mt-4 max-w-xl md:text-lg">{volunteer.body}</p>

          <ul className="mt-8 flex flex-wrap gap-2">
            {volunteerRoles.map((r) => (
              <li key={r.id}>
                <button
                  type="button"
                  onClick={() => setRole(r.id)}
                  className={`min-h-11 rounded-full px-4 py-2 text-sm font-semibold transition ${
                    r.id === role
                      ? "bg-purple text-white"
                      : "bg-white/80 text-purple hover:bg-white"
                  }`}
                  aria-pressed={r.id === role}
                >
                  {r.label}
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted" aria-live="polite">
            {selected.detail}
          </p>

          <Button
            href={`/contact?role=${selected.id}`}
            variant="purple"
            className="mt-8"
          >
            {volunteer.cta}
          </Button>
        </FadeIn>
      </div>
    </section>
  );
}
