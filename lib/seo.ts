import type { Metadata } from "next";
import { contact, donateUrl, footer, site } from "@/lib/content";

const DEFAULT_SITE_URL = "https://hafisamagezi.org";

export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return DEFAULT_SITE_URL;
  return raw.replace(/\/$/, "");
}

export type PageOgImage = {
  url: string;
  width?: number;
  height?: number;
  alt: string;
};

export type PageMetadataInput = {
  path: string;
  title: string;
  description: string;
  /** When true, title is used as-is (no template suffix). Default true for full brand titles. */
  absoluteTitle?: boolean;
  image?: PageOgImage;
  noIndex?: boolean;
};

const defaultOgImage: PageOgImage = {
  url: "/images/hero-empowerment.jpg",
  width: 1200,
  height: 630,
  alt: "People working together with purpose across Uganda’s green hills",
};

export function pageMetadata({
  path,
  title,
  description,
  absoluteTitle = true,
  image = defaultOgImage,
  noIndex = false,
}: PageMetadataInput): Metadata {
  const siteUrl = getSiteUrl();
  const canonicalPath = path === "/" ? "/" : path.replace(/\/$/, "");
  const url = canonicalPath === "/" ? siteUrl : `${siteUrl}${canonicalPath}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title,
      description,
      type: "website",
      url,
      siteName: site.name,
      locale: "en_UG",
      images: [
        {
          url: image.url,
          width: image.width ?? 1200,
          height: image.height ?? 630,
          alt: image.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.url],
    },
  };
}

export function buildOrganizationJsonLd() {
  const siteUrl = getSiteUrl();
  const sameAs = footer.socials
    .filter((s) => s.href && !s.placeholder)
    .map((s) => s.href);

  return {
    "@context": "https://schema.org",
    "@type": ["NGO", "Organization"],
    name: site.legalName,
    alternateName: [site.name, site.shortName],
    url: siteUrl,
    logo: `${siteUrl}/icon.png`,
    image: `${siteUrl}/images/hero-empowerment.jpg`,
    description: site.description,
    email: contact.email,
    telephone: contact.phone,
    slogan: site.tagline,
    areaServed: {
      "@type": "Country",
      name: "Uganda",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Kyebando, Erisa, Kawempe Division",
      addressLocality: "Kampala",
      postalCode: "214661",
      addressCountry: "UG",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: contact.email,
      telephone: contact.phone,
      availableLanguage: ["English"],
    },
    ...(sameAs.length > 0 ? { sameAs } : {}),
    potentialAction: {
      "@type": "DonateAction",
      name: "Support Seeds of Hope",
      target: donateUrl,
      description:
        "Support education and skills, sustainable agriculture, and community empowerment across Uganda.",
    },
  };
}

export function buildWebsiteJsonLd() {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: siteUrl,
    description: site.description,
    inLanguage: "en-UG",
    publisher: {
      "@type": "Organization",
      name: site.legalName,
      url: siteUrl,
    },
  };
}

export function getSiteKeywords(): string[] {
  return [
    "Hafisa Magezi Foundation",
    "Hafisa Magezi Foundation Limited",
    "Uganda nonprofit",
    "Kampala",
    "Masaka",
    "education and skills Uganda",
    "coffee agriculture Uganda",
    "livelihoods empowerment",
    "community empowerment",
    "Seeds of Hope",
    "donate Uganda",
  ];
}
