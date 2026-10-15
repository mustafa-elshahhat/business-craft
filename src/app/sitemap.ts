import type { MetadataRoute } from "next";

import { projectHref } from "@/data/projects";
import { serviceHref, services } from "@/data/services";
import { projectSlugs } from "@/data/slugs";
import { siteConfig } from "@/lib/site";

/** Public pages only. Empty until SITE_URL is configured. */
export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteConfig.url) return [];
  const paths = [
    { path: "/", priority: 1 },
    { path: "/services", priority: 0.9 },
    ...services.map((service) => ({ path: serviceHref(service.slug), priority: 0.8 })),
    { path: "/work", priority: 0.9 },
    ...projectSlugs.map((slug) => ({ path: projectHref(slug), priority: 0.7 })),
    { path: "/about", priority: 0.6 },
    { path: "/contact", priority: 0.8 },
  ];
  return paths.map(({ path, priority }) => ({
    url: `${siteConfig.url}${path === "/" ? "" : path}`,
    changeFrequency: "monthly",
    priority,
  }));
}
