import { partners } from "@/lib/content";
import { FadeIn } from "@/components/ui/FadeIn";
import { GeometricStar } from "@/components/illustrations/Icons";
import { GeometricAccent } from "@/components/motion/GeometricAccent";

export function Partnerships() {
  return (
    <section className="relative overflow-hidden bg-lavender/40">
      <GeometricAccent />
      <div className="section-pad relative mx-auto max-w-6xl px-5 md:px-8">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Partners</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-purple-deep sm:text-4xl md:text-5xl">
            Standing together
          </h2>
          <p className="luxury-prose mt-4">
            Institutions, faith leaders, and local enterprises who walk with us.
          </p>
        </FadeIn>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {partners.map((partner, i) => (
            <FadeIn key={partner.name} delay={i * 0.05}>
              <li className="glass group rounded-[1.5rem] p-7 transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-28px_rgba(74,46,128,0.35)]">
                <GeometricStar className="h-8 w-8 text-gold opacity-70 transition group-hover:opacity-100" />
                <p className="mt-4 font-display text-2xl font-semibold text-purple">
                  {partner.name}
                </p>
                <p className="mt-2 text-sm text-muted">{partner.role}</p>
              </li>
            </FadeIn>
          ))}
        </ul>
      </div>
    </section>
  );
}
