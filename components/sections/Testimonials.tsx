import { testimonials, testimonialsHeading } from "@/lib/content";
import { FadeIn } from "@/components/ui/FadeIn";

export function Testimonials() {
  const [featured, ...rest] = testimonials;

  return (
    <section className="relative overflow-hidden bg-paper">
      <div className="section-pad relative mx-auto max-w-6xl px-5 md:px-8">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">{testimonialsHeading.eyebrow}</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-purple-deep sm:text-4xl md:text-5xl">
            {testimonialsHeading.title}
          </h2>
          <p className="luxury-prose mt-4">{testimonialsHeading.subtitle}</p>
        </FadeIn>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <FadeIn>
            <blockquote className="relative rounded-[2rem] bg-purple-deep p-8 text-white sm:p-10">
              <div className="geometric-wash opacity-[0.1]" />
              <p className="relative font-display text-2xl leading-snug font-semibold sm:text-3xl md:text-4xl">
                “{featured.quote}”
              </p>
              <footer className="relative mt-8 flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/25 font-display text-sm font-semibold text-gold-soft">
                  {featured.initials}
                </span>
                <div>
                  <p className="font-semibold text-gold-soft">{featured.name}</p>
                  <p className="text-sm text-white/60">{featured.role}</p>
                </div>
              </footer>
            </blockquote>
          </FadeIn>

          <FadeIn delay={0.08}>
            <ul className="space-y-8">
              {rest.map((item) => (
                <li key={item.name} className="border-b border-purple/10 pb-8 last:border-0 last:pb-0">
                  <p className="text-base leading-relaxed text-muted">“{item.quote}”</p>
                  <div className="mt-4 flex items-center gap-3">
                    <span
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-purple text-xs font-semibold text-white"
                      aria-hidden
                    >
                      {item.initials}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-ink">{item.name}</p>
                      <p className="text-xs text-muted">{item.role}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
