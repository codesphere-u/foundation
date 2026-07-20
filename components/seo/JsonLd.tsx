import { buildOrganizationJsonLd, buildWebsiteJsonLd } from "@/lib/seo";

export function JsonLd() {
  const graph = [buildOrganizationJsonLd(), buildWebsiteJsonLd()];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
