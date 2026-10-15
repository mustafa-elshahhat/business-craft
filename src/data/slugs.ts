/**
 * Slugs of the dynamic routes. Kept free of imports so the proxy can answer
 * unknown slugs with a real 404 without pulling in content or images; the
 * data modules type their records against these lists.
 */
const serviceSlugs = ["websites", "e-commerce", "business-systems", "mobile-apps"] as const;

/** Published projects, in display order. Every one has a case study. */
export const projectSlugs = [
  "zts-fashion",
  "dermiva-skincare",
  "soulmate-gift-store",
  "dr-mirror",
  "saad-logistic",
] as const;

export type ServiceSlug = (typeof serviceSlugs)[number];
export type ProjectSlug = (typeof projectSlugs)[number];

export function isServiceSlug(value: string): value is ServiceSlug {
  return (serviceSlugs as readonly string[]).includes(value);
}

export function isProjectSlug(value: string): value is ProjectSlug {
  return (projectSlugs as readonly string[]).includes(value);
}
