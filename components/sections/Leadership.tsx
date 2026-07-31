import Image from "next/image";
import { leadership } from "@/lib/content";
import { FadeIn } from "@/components/ui/FadeIn";
import { GeometricAccent } from "@/components/motion/GeometricAccent";

export function Leadership() {
  return (
    <section className="relative overflow-hidden bg-lavender/40">
      <GeometricAccent />
      <div className="section-pad relative mx-auto max-w-6xl px-5 md:px-8">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">{leadership.eyebrow}</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-purple-deep sm:text-4xl md:text-5xl">
            {leadership.title}
          </h2>
          <p className="luxury-prose mt-4">{leadership.subtitle}</p>
        </FadeIn>

        <div className="mt-14 grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <FadeIn>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] rounded-bl-[3rem]">
              <Image
                src={leadership.image}
                alt={leadership.imageAlt}
                fill
                className="object-cover object-[50%_35%]"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-deep/30 to-transparent" />
            </div>
          </FadeIn>

          <ul className="divide-y divide-gold/25 border-y border-gold/25">
            {leadership.members.map((member, i) => (
              <FadeIn key={member.name} delay={i * 0.04}>
                <li className="flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <p className="font-display text-xl font-semibold text-purple-deep sm:text-2xl">
                    {member.name}
                  </p>
                  <p className="text-xs font-semibold tracking-[0.14em] text-gold uppercase sm:text-right">
                    {member.role}
                  </p>
                </li>
              </FadeIn>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
