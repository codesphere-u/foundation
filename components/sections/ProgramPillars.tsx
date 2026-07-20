import Image from "next/image";
import { missions } from "@/lib/content";
import { FadeIn } from "@/components/ui/FadeIn";
import { ButterflyIcon, GeometricStar, SeedlingIcon } from "@/components/illustrations/Icons";

const icons = {
  education: ButterflyIcon,
  agriculture: SeedlingIcon,
  community: GeometricStar,
} as const;

export function ProgramPillars() {
  return (
    <section className="bg-paper">
      {missions.map((mission, i) => {
        const reverse = i % 2 === 1;
        const Icon = icons[mission.id];
        return (
          <article
            key={mission.id}
            id={mission.id}
            className={`scroll-mt-24 ${reverse ? "bg-lavender/50" : "bg-paper"}`}
          >
            <div
              className={`mx-auto grid max-w-6xl items-center gap-0 lg:grid-cols-2 ${
                reverse ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <FadeIn variant={reverse ? "right" : "left"}>
                <div className="relative aspect-[4/3] overflow-hidden lg:aspect-auto lg:min-h-[32rem]">
                  <Image
                    src={mission.image}
                    alt={mission.imageAlt}
                    fill
                    className="object-cover transition duration-700 hover:scale-[1.03]"
                    style={{ objectPosition: mission.objectPosition }}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-deep/35 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-purple-deep/10" />
                </div>
              </FadeIn>

              <FadeIn
                delay={0.08}
                variant={reverse ? "left" : "right"}
                className="px-5 py-14 sm:px-8 md:py-20 lg:px-14"
              >
                <Icon className="h-12 w-12 text-gold" />
                <p className="mt-4 text-xs font-semibold tracking-[0.18em] text-gold uppercase">
                  {mission.accent}
                </p>
                <h2 className="mt-3 font-display text-4xl font-semibold text-purple-deep md:text-5xl">
                  {mission.title}
                </h2>
                <p className="luxury-prose mt-5 md:text-lg">{mission.description}</p>
                <p className="mt-6 text-sm font-medium text-purple/85 md:text-base">
                  {mission.outcome}
                </p>
              </FadeIn>
            </div>
          </article>
        );
      })}
    </section>
  );
}
