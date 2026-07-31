import type { Metadata } from "next";
import {
  contact,
  donateUrl,
  footer,
  navLinks,
  pages,
  programmeAreas,
  site,
} from "@/lib/content";

const DEFAULT_SITE_URL = "https://hafisamagezi.org";

export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return DEFAULT_SITE_URL;
  return raw.replace(/\/$/, "");
}

export function absoluteUrl(path: string): string {
  const siteUrl = getSiteUrl();
  if (!path || path === "/") return siteUrl;
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
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

export type SiteRoute = {
  path: "/" | "/about" | "/programs" | "/contact";
  priority: number;
  changeFrequency: "weekly" | "monthly";
  title: string;
  description: string;
  ogImage: string;
  ogImageAlt: string;
  /** Extra content images for the image sitemap */
  sitemapImages?: string[];
  pageType: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";
  breadcrumbLabel: string;
};

export const siteRoutes: SiteRoute[] = [
  {
    path: "/",
    priority: 1,
    changeFrequency: "weekly",
    title: pages.home.title,
    description: pages.home.description,
    ogImage: pages.home.ogImage,
    ogImageAlt: pages.home.ogImageAlt,
    sitemapImages: [
      pages.home.ogImage,
      "/images/empower-learners.jpg",
      "/images/coffee-seedlings-tray.jpg",
      "/images/community-solidarity.jpg",
    ],
    pageType: "WebPage",
    breadcrumbLabel: "Home",
  },
  {
    path: "/about",
    priority: 0.8,
    changeFrequency: "monthly",
    title: pages.about.title,
    description: pages.about.description,
    ogImage: pages.about.ogImage,
    ogImageAlt: pages.about.ogImageAlt,
    sitemapImages: [pages.about.ogImage],
    pageType: "AboutPage",
    breadcrumbLabel: "About",
  },
  {
    path: "/programs",
    priority: 0.9,
    changeFrequency: "monthly",
    title: pages.programs.title,
    description: pages.programs.description,
    ogImage: pages.programs.ogImage,
    ogImageAlt: pages.programs.ogImageAlt,
    sitemapImages: [
      pages.programs.ogImage,
      ...programmeAreas.slice(0, 3).map((p) => p.image),
    ],
    pageType: "CollectionPage",
    breadcrumbLabel: "Programs",
  },
  {
    path: "/contact",
    priority: 0.7,
    changeFrequency: "monthly",
    title: pages.contact.title,
    description: pages.contact.description,
    ogImage: pages.contact.ogImage,
    ogImageAlt: pages.contact.ogImageAlt,
    sitemapImages: [pages.contact.ogImage],
    pageType: "ContactPage",
    breadcrumbLabel: "Contact",
  },
];

export function getSiteRoute(path: string): SiteRoute {
  const normalized = path === "/" ? "/" : path.replace(/\/$/, "");
  return siteRoutes.find((r) => r.path === normalized) ?? siteRoutes[0];
}

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

const ORG_ID = () => `${getSiteUrl()}/#organization`;
const WEBSITE_ID = () => `${getSiteUrl()}/#website`;

export function buildOrganizationJsonLd() {
  const siteUrl = getSiteUrl();
  const sameAs = footer.socials
    .filter((s) => s.href && !s.placeholder)
    .map((s) => s.href);

  return {
    "@type": ["NGO", "Organization"],
    "@id": ORG_ID(),
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
      areaServed: "UG",
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
    "@type": "WebSite",
    "@id": WEBSITE_ID(),
    name: site.name,
    url: siteUrl,
    description: site.description,
    inLanguage: "en-UG",
    publisher: { "@id": ORG_ID() },
  };
}

export function buildNavigationJsonLd() {
  const siteUrl = getSiteUrl();

  return {
    "@type": "ItemList",
    "@id": `${siteUrl}/#navigation`,
    name: "Main navigation",
    numberOfItems: navLinks.length,
    itemListElement: navLinks.map((link, index) => ({
      "@type": "SiteNavigationElement",
      position: index + 1,
      name: link.label,
      url: absoluteUrl(link.href),
    })),
  };
}

export function buildWebPageJsonLd(path: string) {
  const route = getSiteRoute(path);
  const url = absoluteUrl(route.path);

  return {
    "@type": route.pageType,
    "@id": `${url}#webpage`,
    url,
    name: route.title,
    description: route.description,
    inLanguage: "en-UG",
    isPartOf: { "@id": WEBSITE_ID() },
    about: { "@id": ORG_ID() },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: absoluteUrl(route.ogImage),
      caption: route.ogImageAlt,
    },
  };
}

export function buildBreadcrumbJsonLd(path: string) {
  const route = getSiteRoute(path);
  const siteUrl = getSiteUrl();
  const items =
    route.path === "/"
      ? [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteUrl,
          },
        ]
      : [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: route.breadcrumbLabel,
            item: absoluteUrl(route.path),
          },
        ];

  return {
    "@type": "BreadcrumbList",
    "@id": `${absoluteUrl(route.path)}#breadcrumb`,
    itemListElement: items,
  };
}

/** Site-wide Organization + WebSite + navigation graph for the root layout. */
export function buildSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      buildOrganizationJsonLd(),
      buildWebsiteJsonLd(),
      buildNavigationJsonLd(),
    ],
  };
}

/** Per-page WebPage + BreadcrumbList graph. */
export function buildPageJsonLd(path: string) {
  return {
    "@context": "https://schema.org",
    "@graph": [buildWebPageJsonLd(path), buildBreadcrumbJsonLd(path)],
  };
}

export function getSiteKeywords(): string[] {
  return [
    "Hafisa Magezi Foundation",
    "Hafisa Magezi Foundation Limited",
    "Uganda nonprofit",
    "nonprofit Uganda",
    "Kampala",
    "Kawempe",
    "Kyebando",
    "Masaka",
    "education and skills Uganda",
    "coffee agriculture Uganda",
    "coffee seedlings Uganda",
    "livelihoods empowerment",
    "community empowerment Uganda",
    "health and wellbeing Uganda",
    "environment resilience Uganda",
    "Seeds of Hope",
    "donate Uganda",
    "volunteer Uganda",
  ];
}
