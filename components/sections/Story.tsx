import Image from "next/image";
import { story } from "@/lib/content";
import { FadeIn } from "@/components/ui/FadeIn";
import { GeometricAccent } from "@/components/motion/GeometricAccent";
import { SeedlingGrow } from "@/components/motion/SeedlingGrow";

export function Story() {
  return (
    <section className="relative overflow-hidden bg-paper">
      <GeometricAccent />
      <div className="section-pad relative mx-auto max-w-6xl px-5 md:px-8">
        <FadeIn>
          <p className="eyebrow">{story.eyebrow}</p>
          <h2 className="mt-3 max-w-3xl font-display text-3xl font-semibold text-purple-deep sm:text-4xl md:text-5xl">
            {story.title}
          </h2>
          <p className="luxury-prose mt-5 max-w-2xl">{story.body}</p>
        </FadeIn>

        <div className="mt-14 grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeIn className="relative grid grid-cols-2 gap-3">
            {story.collage.map((photo, i) => (
              <div
                key={photo.src}
                className={`relative overflow-hidden ${
                  i % 2 === 1 ? "mt-8" : ""
                } ${i === 0 || i === 3 ? "aspect-[3/4] rounded-[1.5rem] rounded-tr-[2.5rem]" : "aspect-square rounded-[1.25rem]"}`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover transition duration-700 hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            ))}
            <div className="absolute -bottom-4 -left-2">
              <SeedlingGrow />
            </div>
          </FadeIn>

          <FadeIn delay={0.08} className="space-y-8">
            <dl className="grid gap-6 border-y border-gold/30 py-8 sm:grid-cols-3">
              {story.facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-xs tracking-wide text-muted uppercase">{fact.label}</dt>
                  <dd className="mt-1 font-display text-xl font-semibold text-purple">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>

            {story.paragraphs.map((paragraph) => (
              <p key={paragraph} className="luxury-prose text-base md:text-lg">
                {paragraph}
              </p>
            ))}
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
