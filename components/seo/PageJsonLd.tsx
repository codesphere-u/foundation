import { buildPageJsonLd } from "@/lib/seo";

type PageJsonLdProps = {
  path: "/" | "/about" | "/programs" | "/contact";
};

export function PageJsonLd({ path }: PageJsonLdProps) {
  const graph = buildPageJsonLd(path);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
