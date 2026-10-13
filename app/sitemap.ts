import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";

/** Only finished, indexable pages. Placeholder routes are excluded. */
const publishedPaths = ["/"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteConfig.url) return [];
  return publishedPaths.map((path) => ({
    url: `${siteConfig.url}${path === "/" ? "" : path}`,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
