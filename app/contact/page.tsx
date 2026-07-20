import { Suspense } from "react";
import { ContactSection } from "@/components/sections/ContactSection";
import { PageHero } from "@/components/ui/PageHero";
import { pageHeroes, pages } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/contact",
  title: pages.contact.title,
  description: pages.contact.description,
  image: {
    url: pages.contact.ogImage,
    alt: pages.contact.ogImageAlt,
  },
});

export default function ContactPage() {
  const hero = pageHeroes.contact;

  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        subtitle={hero.subtitle}
        image={hero.image}
        imageAlt={hero.imageAlt}
      />
      <Suspense fallback={<div className="section-pad mx-auto max-w-6xl px-5" aria-hidden />}>
        <ContactSection />
      </Suspense>
    </>
  );
}
