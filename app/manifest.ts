import type { MetadataRoute } from "next";
import { site } from "@/lib/content";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.shortName,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#4A2E80",
    theme_color: "#4A2E80",
    lang: "en-UG",
    categories: ["nonprofit", "lifestyle", "education"],
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/favicon-32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/favicon-16.png",
        sizes: "16x16",
        type: "image/png",
      },
    ],
  };
}
