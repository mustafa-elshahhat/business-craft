import type { Metadata } from "next";

import { siteConfig } from "./site";

/**
 * Per-page metadata with a complete Open Graph block (page-level openGraph
 * replaces the root one, so shared fields are repeated here). The share
 * image comes from app/opengraph-image.png. Canonicals resolve against
 * SITE_URL when it is set (metadataBase in the root layout).
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title?: string;
  description: string;
  path: string;
}): Metadata {
  const fullTitle = title ? `${title} | ${siteConfig.name}` : `${siteConfig.name} — ${siteConfig.descriptor}`;
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: "en_US",
      title: fullTitle,
      description,
      url: path,
    },
    twitter: { card: "summary_large_image", title: fullTitle, description },
  };
}
