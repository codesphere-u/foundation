import Image from "next/image";
import { compassion } from "@/lib/content";
import { FadeIn } from "@/components/ui/FadeIn";
import { GeometricAccent } from "@/components/motion/GeometricAccent";
import { Parallax } from "@/components/motion/Parallax";
import { SeedlingGrow } from "@/components/motion/SeedlingGrow";
import { CurveDivider } from "@/components/illustrations/Icons";

export function CompassionStory() {
  return (
    <section className="relative overflow-hidden bg-lavender/40">
      <CurveDivider className="absolute top-0 left-0 z-10 text-paper" />
      <GeometricAccent />
      <div className="section-pad relative mx-auto grid max-w-6xl items-center gap-12 px-5 md:grid-cols-12 md:gap-10 md:px-8">
        <div className="relative md:col-span-5">
          <FadeIn>
            <Parallax
              speed={0.32}
              className="aspect-[4/5] [clip-path:polygon(0%_6%,92%_0%,100%_88%,8%_100%)] md:[clip-path:polygon(2%_4%,96%_0%,100%_92%,4%_100%)]"
            >
              <div className="absolute inset-[-12%]">
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
            delay={0.15}
            className="absolute -right-2 -bottom-6 w-[48%] overflow-hidden rounded-[1.5rem] rounded-bl-[2.5rem] shadow-2xl md:-right-6"
          >
            <div className="relative aspect-[3/4]">
              <Image
                src={compassion.secondaryImage}
                alt={compassion.secondaryImageAlt}
                fill
                className="object-cover object-[50%_20%]"
                sizes="30vw"
              />
            </div>
          </FadeIn>
          <div className="absolute -top-4 left-4">
            <SeedlingGrow />
          </div>
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
