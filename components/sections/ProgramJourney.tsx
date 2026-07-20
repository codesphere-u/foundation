import Image from "next/image";
import Link from "next/link";
import { missions } from "@/lib/content";
import { FadeIn } from "@/components/ui/FadeIn";
import { ButterflyIcon, CurveDivider, GeometricStar, SeedlingIcon } from "@/components/illustrations/Icons";
import { Parallax } from "@/components/motion/Parallax";

const accents = {
  education: ButterflyIcon,
  agriculture: SeedlingIcon,
  community: GeometricStar,
} as const;

export function ProgramJourney() {
  return (
    <section className="relative overflow-hidden bg-purple-deep text-white">
      <CurveDivider className="absolute top-0 left-0 z-10 text-paper" />
      <div className="geometric-wash opacity-[0.08]" />
      <div className="section-pad relative mx-auto max-w-6xl px-5 md:px-8">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold tracking-[0.22em] text-gold-soft uppercase">
            Our programs
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl md:text-5xl">
            Three pillars of lasting change
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/75">
            Education, agriculture, and community care—woven so hope can take root and multiply.
          </p>
        </FadeIn>

        <div className="mt-16 space-y-20 md:space-y-28">
          {missions.map((mission, i) => {
            const Icon = accents[mission.id];
            const reverse = i % 2 === 1;
            return (
              <FadeIn key={mission.id} variant={reverse ? "left" : "right"}>
                <article
                  className={`grid items-center gap-8 md:grid-cols-2 md:gap-14 ${
                    reverse ? "md:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <Parallax
                    speed={0.18}
                    className="aspect-[5/4] overflow-hidden rounded-[2rem] rounded-br-[3.5rem]"
                  >
                    <div className="absolute inset-[-8%]">
                      <Image
                        src={mission.cinematicImage}
                        alt={mission.cinematicAlt}
                        fill
                        className="object-cover transition duration-700 hover:scale-105"
                        style={{ objectPosition: mission.objectPosition }}
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-deep/50 to-transparent" />
                  </Parallax>
                  <div>
                    <Icon className="h-12 w-12 text-gold-soft" />
                    <h3 className="mt-4 font-display text-3xl font-semibold text-gold-soft sm:text-4xl">
                      {mission.title}
                    </h3>
                    <p className="mt-4 text-base leading-relaxed text-white/80">
                      {mission.description}
                    </p>
                    <p className="mt-3 text-sm font-medium tracking-wide text-gold/80">
                      {mission.outcome}
                    </p>
                    <Link
                      href={`/programs#${mission.id}`}
                      className="mt-6 inline-flex min-h-11 items-center text-sm font-semibold text-gold-soft underline decoration-gold/50 underline-offset-8 transition hover:decoration-gold"
                    >
                      Explore this pillar
                    </Link>
                  </div>
                </article>
              </FadeIn>
            );
          })}
        </div>
      </div>
      <CurveDivider flip className="relative z-10 text-paper" />
    </section>
  );
}
