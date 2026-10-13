import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";

/**
 * Indexing is allowed only once the production domain is configured
 * (SITE_URL). Previews and unconfigured deployments stay out of search.
 */
export default function robots(): MetadataRoute.Robots {
  if (!siteConfig.url) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
