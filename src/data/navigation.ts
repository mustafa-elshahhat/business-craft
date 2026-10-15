import type { ProjectSlug } from "./slugs";

export const primaryCta = { label: "Get a Free Consultation", href: "/contact" } as const;
export const secondaryCta = { label: "See Our Work", href: "/work" } as const;

/** Top-level pages without a menu panel. */
export const pageLinks = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

/** Projects listed in the header menus. */
export const menuProjects: readonly ProjectSlug[] = ["zts-fashion", "dermiva-skincare", "soulmate-gift-store"];

/** Projects listed in the footer. */
export const footerProjects: readonly ProjectSlug[] = [...menuProjects, "dr-mirror"];

/** A link is current on its own page and on every page below it. */
export function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}
