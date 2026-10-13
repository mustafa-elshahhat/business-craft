import type { MetadataRoute } from "next";

import { caseStudies } from "@/content/case-studies";
import { projectHref } from "@/content/projects";
import { serviceHref, services } from "@/content/services";
import { siteConfig } from "@/lib/site";

/** Public pages only. Empty until SITE_URL is configured. */
export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteConfig.url) return [];
  const paths = [
    { path: "/", priority: 1 },
    { path: "/services", priority: 0.9 },
    ...services.map((service) => ({ path: serviceHref(service.slug), priority: 0.8 })),
    { path: "/work", priority: 0.9 },
    ...caseStudies.map((study) => ({ path: projectHref(study.slug), priority: 0.7 })),
    { path: "/about", priority: 0.6 },
    { path: "/contact", priority: 0.8 },
  ];
  return paths.map(({ path, priority }) => ({
    url: `${siteConfig.url}${path === "/" ? "" : path}`,
    changeFrequency: "monthly",
    priority,
  }));
}
