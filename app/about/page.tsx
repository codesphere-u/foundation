import { Partnerships } from "@/components/sections/Partnerships";
import { Story } from "@/components/sections/Story";
import { Testimonials } from "@/components/sections/Testimonials";
import { LivingTimeline } from "@/components/sections/LivingTimeline";
import { UgandaMap } from "@/components/sections/UgandaMap";
import { PageHero } from "@/components/ui/PageHero";
import { pageHeroes, pages } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/about",
  title: pages.about.title,
  description: pages.about.description,
  image: {
    url: pages.about.ogImage,
    alt: pages.about.ogImageAlt,
  },
});

export default function AboutPage() {
  const hero = pageHeroes.about;

  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        subtitle={hero.subtitle}
        image={hero.image}
        imageAlt={hero.imageAlt}
      />
      <Story />
      <UgandaMap />
      <LivingTimeline />
      <Partnerships />
      <Testimonials />
    </>
  );
}
