import { ImpactCalculator } from "@/components/sections/ImpactCalculator";
import { ProgramPillars } from "@/components/sections/ProgramPillars";
import { Volunteer } from "@/components/sections/Volunteer";
import { PageHero } from "@/components/ui/PageHero";
import { pageHeroes, pages } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/programs",
  title: pages.programs.title,
  description: pages.programs.description,
  image: {
    url: pages.programs.ogImage,
    alt: pages.programs.ogImageAlt,
  },
});

export default function ProgramsPage() {
  const hero = pageHeroes.programs;

  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        subtitle={hero.subtitle}
        image={hero.image}
        imageAlt={hero.imageAlt}
      />
      <ProgramPillars />
      <ImpactCalculator />
      <Volunteer />
    </>
  );
}
