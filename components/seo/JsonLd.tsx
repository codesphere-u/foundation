import { buildSiteJsonLd } from "@/lib/seo";

export function JsonLd() {
  const graph = buildSiteJsonLd();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
