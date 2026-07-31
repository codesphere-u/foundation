import type { MetadataRoute } from "next";
import { absoluteUrl, getSiteUrl, siteRoutes } from "@/lib/seo";

function uniqueAbsoluteImages(paths: string[] | undefined): string[] {
  if (!paths?.length) return [];
  const seen = new Set<string>();
  const out: string[] = [];
  for (const path of paths) {
    const url = absoluteUrl(path);
    if (seen.has(url)) continue;
    seen.add(url);
    out.push(url);
  }
  return out;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const lastModified = new Date();

  return siteRoutes.map((route) => ({
    url: route.path === "/" ? siteUrl : absoluteUrl(route.path),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
    images: uniqueAbsoluteImages(route.sitemapImages ?? [route.ogImage]),
  }));
}
