/**
 * Slugs of the dynamic routes, kept free of imports so `proxy.ts` can use
 * them to answer unknown slugs with a real 404 status. The content modules
 * type their slugs against these lists, so they cannot drift apart.
 */
export const serviceSlugs = ["websites", "e-commerce", "business-systems", "mobile-apps"] as const;

export const caseStudySlugs = [
  "zts-fashion",
  "dermiva-skincare",
  "soulmate-gift-store",
  "dr-mirror",
  "saad-logistic",
] as const;
