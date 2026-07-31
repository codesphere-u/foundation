import Image from "next/image";
import { compassion } from "@/lib/content";
import { FadeIn } from "@/components/ui/FadeIn";
import { GeometricAccent } from "@/components/motion/GeometricAccent";
import { Parallax } from "@/components/motion/Parallax";
import { CurveDivider } from "@/components/illustrations/Icons";

export function CompassionStory() {
  return (
    <section id="begin" className="relative overflow-hidden bg-lavender/40">
      <CurveDivider className="absolute top-0 left-0 z-10 text-paper" />
      <GeometricAccent />
      <div className="section-pad relative mx-auto grid max-w-6xl items-center gap-10 px-5 md:grid-cols-12 md:gap-12 md:px-8">
        <div className="relative pb-10 md:col-span-5 md:pb-8">
          <FadeIn>
            <Parallax
              speed={0.28}
              className="aspect-[4/5] overflow-hidden rounded-[2rem] rounded-tr-[3rem]"
            >
              <div className="absolute inset-0">
                <Image
                  src={compassion.image}
                  alt={compassion.imageAlt}
                  fill
                  className="object-cover object-[45%_30%]"
                  sizes="(max-width: 768px) 100vw, 40vw"
                  priority={false}
                />
              </div>
            </Parallax>
          </FadeIn>
          <FadeIn
            delay={0.12}
            className="absolute right-3 -bottom-5 w-[42%] overflow-hidden rounded-[1.25rem] shadow-xl md:right-0"
          >
            <div className="relative aspect-[4/5]">
              <Image
                src={compassion.secondaryImage}
                alt={compassion.secondaryImageAlt}
                fill
                className="object-cover object-[50%_25%]"
                sizes="30vw"
              />
            </div>
          </FadeIn>
        </div>

        <div className="md:col-span-7 md:pl-8">
          <FadeIn>
            <p className="eyebrow">{compassion.eyebrow}</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-purple-deep sm:text-4xl md:text-5xl">
              {compassion.title}
            </h2>
            <p className="luxury-prose mt-5">{compassion.body}</p>
            <div className="mt-6 space-y-4">
              {compassion.paragraphs.map((p) => (
                <p key={p.slice(0, 24)} className="luxury-prose">
                  {p}
                </p>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
      <CurveDivider flip className="relative z-10 text-paper" />
    </section>
  );
}
