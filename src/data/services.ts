import type { ProjectSlug, ServiceSlug } from "./slugs";

/**
 * Core services.
 *
 * Copy describes what Business Craft offers. It makes no provider, platform
 * or delivery-model claims the owner has not confirmed, and proof is limited
 * to verified projects.
 */
export type Service = {
  slug: ServiceSlug;
  title: string;
  /** One sentence used in menus, the homepage and the overview. */
  summary: string;
  /** Service page headline: statement + muted elaboration. */
  headline: { lead: string; rest: string };
  intro: string;
  metaDescription: string;
  /** Who the service is for. */
  audience: string[];
  /** Business problems it solves, each with how we address it. */
  problems: { title: string; text: string }[];
  /** What Business Craft builds. */
  deliverables: string[];
  /** Published projects that prove the service (verified only). */
  proof: readonly ProjectSlug[];
};

export const services: readonly Service[] = [
  {
    slug: "websites",
    title: "Websites",
    summary: "Fast, modern and SEO-friendly websites built around your business and what it needs to achieve.",
    headline: { lead: "Websites that represent your business.", rest: "Clear, fast and built around the next step." },
    intro:
      "Company and marketing websites designed around your business, your audience and the action you want visitors to take.",
    metaDescription:
      "Company and marketing websites designed and built by Business Craft: responsive, fast, SEO-friendly and structured around enquiries and bookings.",
    audience: [
      "Companies that need a credible online presence",
      "Service businesses that rely on enquiries and bookings",
      "Businesses replacing an outdated site",
      "Brands that need English and Arabic",
    ],
    problems: [
      {
        title: "The site undersells the business",
        text: "A generic or dated site makes a serious company look smaller. We structure the site around what you actually offer.",
      },
      {
        title: "Visitors don’t know what to do next",
        text: "Each page leads to one clear action: an enquiry, a booking or a call.",
      },
      {
        title: "It is slow or awkward on phones",
        text: "Responsive layouts and lean pages, built for the devices your customers use.",
      },
      {
        title: "One language is not enough",
        text: "English and Arabic versions with proper right-to-left layouts, not mirrored afterthoughts.",
      },
    ],
    deliverables: [
      "Site structure and page planning",
      "Responsive design and development",
      "Page templates for services, news and contact",
      "Enquiry, booking and contact flows",
      "Performance and technical SEO foundations",
      "English and Arabic layouts, including right-to-left",
    ],
    proof: ["saad-logistic"],
  },
  {
    slug: "e-commerce",
    title: "E-commerce",
    summary: "Online stores designed to sell and scale, from catalogue and checkout to the orders your team handles every day.",
    headline: { lead: "Online stores designed to sell.", rest: "From catalogue to checkout, in English and Arabic." },
    intro:
      "Storefronts built around how your customers browse, choose and buy, with the product detail, options and cart flows a real catalogue needs.",
    metaDescription:
      "E-commerce stores designed and built by Business Craft: catalogues, product variants, personalisation, cart and checkout, in English and Arabic.",
    audience: [
      "Brands selling their own products online",
      "Retailers moving a catalogue online",
      "Stores selling in Arabic and English",
      "Products that need options or personalisation",
    ],
    problems: [
      {
        title: "Products are hard to find",
        text: "Categories, filters and search organised around how your customers actually shop.",
      },
      {
        title: "Options and stock are unclear",
        text: "Sizes, colours and availability shown at the moment the shopper is choosing.",
      },
      {
        title: "Checkout loses people",
        text: "A short, clear path from product to cart to checkout, on every screen size.",
      },
      {
        title: "The catalogue doesn’t fit a template",
        text: "Custom flows where the product needs them, such as building and personalising a gift box.",
      },
    ],
    deliverables: [
      "Catalogue, categories and filters",
      "Search",
      "Product pages with variants and stock",
      "Cart and checkout flows",
      "Personalisation and custom product builders",
      "English and Arabic storefronts with right-to-left layouts",
      "Mobile-first responsive design",
    ],
    proof: ["zts-fashion", "dermiva-skincare", "soulmate-gift-store", "dr-mirror"],
  },
  {
    slug: "business-systems",
    title: "Business Systems",
    summary: "Custom systems built around your workflow, covering operations, inventory, dashboards and reporting.",
    headline: { lead: "Systems built around your workflow.", rest: "For the work your team does every day." },
    intro:
      "Custom internal software for operations: point of sale, inventory, records and reporting, shaped around the way your team already works.",
    metaDescription:
      "Custom business systems by Business Craft: point of sale, inventory, records, roles and reporting, built around your team's workflow.",
    audience: [
      "Shops and service centres managing sales and stock",
      "Teams running operations on spreadsheets or paper",
      "Businesses whose off-the-shelf software no longer fits",
      "Owners who need clearer reporting",
    ],
    problems: [
      {
        title: "Work lives in spreadsheets",
        text: "Sales, stock and records move into one system with a single source of truth.",
      },
      {
        title: "Stock and sales don’t match",
        text: "Sales update inventory as they happen, so the numbers agree.",
      },
      {
        title: "Everyone can see everything",
        text: "Roles and permissions that match who does what in your business.",
      },
      {
        title: "Reports take hours",
        text: "Dashboards and reports built from the data the system already records.",
      },
    ],
    deliverables: [
      "Point of sale",
      "Inventory and stock tracking",
      "Customer, supplier and order records",
      "Roles and permissions",
      "Dashboards and reporting",
      "Integrations with the tools you already use",
    ],
    // Proven by the internal systems in projects.ts (names only).
    proof: [],
  },
  {
    slug: "mobile-apps",
    title: "Mobile Apps",
    summary: "Mobile apps for your customers or your team, planned around real use cases and built to be used every day.",
    headline: { lead: "Mobile apps planned around real use.", rest: "For your customers or your team." },
    intro:
      "We plan and build mobile apps around a clear use case: what people need to do, how often they do it, and which business systems the app depends on.",
    metaDescription:
      "Mobile apps by Business Craft for customers and teams, planned around real use cases and connected to the systems your business runs on.",
    audience: [
      "Businesses offering customers accounts, ordering or booking",
      "Teams that work away from a desk",
      "Products that depend on existing business systems",
    ],
    problems: [
      {
        title: "Start from the use case",
        text: "We define what the app must do well before deciding what else it could do.",
      },
      {
        title: "Design for the phone",
        text: "Short tasks, clear states and layouts made for one hand and a small screen.",
      },
      {
        title: "Connect it to the business",
        text: "Accounts, data and integrations with the systems your team already uses.",
      },
      {
        title: "Plan the launch",
        text: "Testing and release planned from the start, not left to the last week.",
      },
    ],
    deliverables: [
      "Product planning and scope",
      "Customer-facing apps",
      "Internal team apps",
      "Accounts and sign-in",
      "Notifications",
      "APIs and integrations with existing systems",
    ],
    proof: [],
  },
];

export function serviceHref(slug: ServiceSlug) {
  return `/services/${slug}`;
}

export function getService(slug: ServiceSlug): Service {
  const service = services.find((item) => item.slug === slug);
  if (!service) throw new Error(`Service not found: ${slug}`);
  return service;
}
