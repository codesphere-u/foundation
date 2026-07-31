import Image from "next/image";
import { AmbientSky } from "@/components/motion/AmbientSky";

type Props = {
  eyebrow: string;
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
};

export function PageHero({ eyebrow, title, subtitle, image, imageAlt }: Props) {
  return (
    <section className="relative flex min-h-[54svh] items-end overflow-hidden md:min-h-[62svh]">
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          className="animate-ken-burns object-cover object-[50%_35%]"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-purple-deep/78 via-purple-deep/40 to-purple-deep/15" />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 70% 15%, rgba(197,155,39,0.32), transparent 60%)",
        }}
        aria-hidden
      />
      <AmbientSky />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pt-32 pb-14 sm:px-8 sm:pb-16 md:pt-36">
        <p className="animate-fade-rise text-xs font-semibold tracking-[0.22em] text-gold-soft uppercase">
          {eyebrow}
        </p>
        <h1 className="animate-fade-rise mt-3 max-w-3xl font-display text-4xl leading-[1.12] font-semibold text-white sm:text-5xl md:text-6xl">
          {title}
        </h1>
        <p className="animate-fade-rise mt-4 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
