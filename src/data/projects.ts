import type { StaticImageData } from "next/image";

import ztsHome from "@/assets/projects/zts-fashion-home.jpg";
import ztsHomeMobile from "@/assets/projects/zts-fashion-home-mobile.jpg";
import dermivaHome from "@/assets/projects/dermiva-skincare-home.jpg";
import dermivaHomeMobile from "@/assets/projects/dermiva-skincare-home-mobile.jpg";
import soulmateHome from "@/assets/projects/soulmate-gift-store-home.jpg";
import soulmateHomeMobile from "@/assets/projects/soulmate-gift-store-home-mobile.jpg";
import drMirrorHome from "@/assets/projects/dr-mirror-home.jpg";
import saadHome from "@/assets/projects/saad-logistic-desktop.jpg";
import saadHomeMobile from "@/assets/projects/saad-logistic-home-mobile.jpg";

import type { ProjectSlug } from "./slugs";

/**
 * Published projects. Only facts verified on the live sites (captured
 * October 2026). Screenshots are captures of the live sites; the only change
 * is that a floating third-party chat launcher was hidden before capture.
 * Never add results, metrics, dates or technology stacks without owner
 * confirmation.
 */
export type ProjectImage = {
  src: StaticImageData;
  alt: string;
  /** Right-to-left capture: cropped frames anchor to its right edge. */
  rtl?: boolean;
};

export type Project = {
  slug: ProjectSlug;
  name: string;
  category: "E-commerce" | "Websites";
  summary: string;
  liveUrl: string;
  /** English and Arabic verified live, with genuine right-to-left layouts. */
  bilingual: boolean;
  media: {
    /** Desktop home page, 16:10. */
    desktop: ProjectImage;
    /** Phone home page, portrait. */
    mobile?: ProjectImage;
  };
};

export const projects: readonly Project[] = [
  {
    slug: "zts-fashion",
    name: "ZTS Fashion",
    category: "E-commerce",
    summary: "Online store for a clothing brand of minimalist everyday basics, made in Egypt.",
    liveUrl: "https://www.ztsbrand.com/en",
    bilingual: true,
    media: {
      desktop: { src: ztsHome, alt: "ZTS Fashion home page: “Minimal basics, ready to wear”" },
      mobile: { src: ztsHomeMobile, alt: "ZTS Fashion home page on a phone" },
    },
  },
  {
    slug: "dermiva-skincare",
    name: "Dermiva Skincare",
    category: "E-commerce",
    summary: "Online store for face, hair, body and lip care products, organised by category.",
    liveUrl: "https://dermiva-eg.vercel.app/en",
    bilingual: true,
    media: {
      desktop: { src: dermivaHome, alt: "Dermiva Skincare home page: “Face, hair, body and lip care.” with featured products and categories" },
      mobile: { src: dermivaHomeMobile, alt: "Dermiva Skincare home page on a phone" },
    },
  },
  {
    slug: "soulmate-gift-store",
    name: "Soulmate Gift Store",
    category: "E-commerce",
    summary: "Personalised gift store where customers build a gift box piece by piece and add names, a date and a message.",
    liveUrl: "https://soulmate-accessories-store.vercel.app/",
    bilingual: true,
    media: {
      desktop: { src: soulmateHome, alt: "Soulmate Gift Store home page: “Build a gift for one person.” with a gift box photo" },
      mobile: { src: soulmateHomeMobile, alt: "Soulmate Gift Store home page on a phone" },
    },
  },
  {
    slug: "dr-mirror",
    name: "Dr Mirror",
    category: "E-commerce",
    summary: "Online store for medical scrubs and uniforms, in multiple sizes and colours, with delivery across Egypt.",
    liveUrl: "https://dr-mirror.vercel.app/",
    bilingual: true,
    media: {
      desktop: { src: drMirrorHome, alt: "Dr Mirror home page in Arabic: medical scrubs photo, headline and shop buttons", rtl: true },
    },
  },
  {
    slug: "saad-logistic",
    name: "Saad Logistic",
    category: "Websites",
    summary: "Company website for a shipping and logistics provider, in Arabic and English.",
    liveUrl: "https://www.saadlogistic.com/",
    bilingual: true,
    media: {
      /** Arabic home page, cropped above the floating chat launcher. */
      desktop: { src: saadHome, alt: "Saad Logistic home page in Arabic: shipping and logistics hero with booking buttons", rtl: true },
      mobile: { src: saadHomeMobile, alt: "Saad Logistic home page in Arabic on a phone" },
    },
  },
];

/** Internal systems. Their screens carry client branding, so only names are published. */
export const systemProjects = [
  { name: "Auto Parts POS", summary: "Point of sale for an auto-parts retailer." },
  { name: "Lap Service POS", summary: "Point of sale for a repair workshop." },
] as const;

export function getProject(slug: ProjectSlug): Project {
  const project = projects.find((item) => item.slug === slug);
  if (!project) throw new Error(`Project not found: ${slug}`);
  return project;
}

export function projectHref(slug: ProjectSlug) {
  return `/work/${slug}`;
}

/** Display host for the live site, e.g. "ztsbrand.com". */
export function projectHost(project: Project) {
  return new URL(project.liveUrl).hostname.replace(/^www\./, "");
}

/** Crop anchor for a cover image: right-to-left captures keep their right edge in frame. */
export function coverPosition(image: ProjectImage) {
  return image.rtl ? "object-right-top" : "object-left-top";
}
