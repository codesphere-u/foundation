import { CompassionStory } from "@/components/sections/CompassionStory";
import { DonationFinale } from "@/components/sections/DonationFinale";
import { Hero } from "@/components/sections/Hero";
import { ImpactTrust } from "@/components/sections/ImpactTrust";
import { PhotoRiver } from "@/components/sections/PhotoRiver";
import { ProgramJourney } from "@/components/sections/ProgramJourney";
import { StoryMoments } from "@/components/sections/StoryMoments";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { pages } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/",
  title: pages.home.title,
  description: pages.home.description,
  image: {
    url: pages.home.ogImage,
    alt: pages.home.ogImageAlt,
    width: 2000,
    height: 1328,
  },
});

export default function HomePage() {
  return (
    <>
      <PageJsonLd path="/" />
      <Hero />
      <CompassionStory />
      <ImpactTrust />
      <ProgramJourney />
      <StoryMoments />
      <PhotoRiver />
      <DonationFinale />
    </>
  );
}
