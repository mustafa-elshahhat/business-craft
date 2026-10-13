/**
 * Central site configuration.
 *
 * Business values that are still pending (domain, email, phone, social links)
 * are null until the owner supplies them. Components must render nothing for
 * a null value — never a placeholder. Set them here or through environment
 * variables; do not invent values.
 */

function optional(value: string | undefined): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

function normaliseUrl(value: string | null): string | null {
  if (!value) return null;
  try {
    return new URL(value).origin;
  } catch {
    return null;
  }
}

function normaliseWhatsApp(value: string | null): string | null {
  const digits = value?.replace(/\D/g, "") ?? "";
  return digits.length >= 8 ? digits : null;
}

export type SocialPlatform = "linkedin" | "instagram" | "facebook" | "x";

export const siteConfig = {
  name: "Business Craft",
  descriptor: "Digital Solutions for Real Business",
  description:
    "Business Craft designs and builds websites, e-commerce stores, business systems and mobile apps that help businesses sell more, work smarter and grow faster.",

  /** Production origin, e.g. https://example.com. Pending — set SITE_URL. */
  url: normaliseUrl(optional(process.env.SITE_URL)),

  contact: {
    /** Pending — set CONTACT_EMAIL. */
    email: optional(process.env.CONTACT_EMAIL),
    /** Pending — set CONTACT_PHONE (international format, e.g. +20…). */
    phone: optional(process.env.CONTACT_PHONE),
    /** Pending — set CONTACT_WHATSAPP (digits only, international, e.g. 2010…). */
    whatsapp: normaliseWhatsApp(optional(process.env.CONTACT_WHATSAPP)),
  },

  /** Pending — add real profile URLs only. Unset platforms are not rendered. */
  social: {
    linkedin: optional(process.env.SOCIAL_LINKEDIN_URL),
    instagram: optional(process.env.SOCIAL_INSTAGRAM_URL),
    facebook: optional(process.env.SOCIAL_FACEBOOK_URL),
    x: optional(process.env.SOCIAL_X_URL),
  } satisfies Record<SocialPlatform, string | null>,
} as const;

export const primaryCta = { label: "Get a Free Consultation", href: "/contact" } as const;
export const secondaryCta = { label: "See Our Work", href: "/work" } as const;

/** Locked brand assets (docs/BRAND_ASSETS.md). Paths are URL-encoded. */
export const brandAssets = {
  compactLogo: {
    dark: { src: "/brand/logo/compact%20logo%20dark.svg", width: 1342.35, height: 389.01 },
    light: { src: "/brand/logo/compact%20logo%20light.svg", width: 1345.51, height: 386.99 },
  },
  favicon: {
    svg: "/brand/favicon/favicon.svg",
    ico: "/brand/favicon/favicon.ico",
    png32: "/brand/favicon/favicon%2032.png",
    apple: "/brand/favicon/apple%20touch%20icon.png",
    icon192: "/brand/favicon/icon%20192.png",
    icon512: "/brand/favicon/icon%20512.png",
  },
} as const;
