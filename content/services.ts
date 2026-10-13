/**
 * Core services (docs/BUSINESS_CRAFT_MASTER_SPEC.md §1, docs/PAGE_BLUEPRINTS.md §1).
 * Keep descriptions factual: no provider, platform or delivery-model claims
 * that the owner has not confirmed.
 */
export type ServiceSlug = "websites" | "ecommerce" | "systems" | "mobile-apps";

export type Service = {
  slug: ServiceSlug;
  title: string;
  /** Short label used in compact lists (capability row, footer). */
  label: string;
  summary: string;
};

export const services: readonly Service[] = [
  {
    slug: "websites",
    title: "Websites",
    label: "Websites",
    summary: "Fast, modern and SEO-friendly websites built around your business and what it needs to achieve.",
  },
  {
    slug: "ecommerce",
    title: "E-commerce",
    label: "E-commerce",
    summary: "Online stores designed to sell and scale, from catalogue and checkout to the orders your team handles every day.",
  },
  {
    slug: "systems",
    title: "Business Systems",
    label: "Systems",
    summary: "Custom systems built around your workflow, covering operations, inventory, dashboards and reporting.",
  },
  {
    slug: "mobile-apps",
    title: "Mobile Apps",
    label: "Mobile Apps",
    summary: "Mobile apps for your customers or your team, planned around real use cases and built to be used every day.",
  },
];

export function serviceHref(slug: ServiceSlug) {
  return `/services/${slug}`;
}
