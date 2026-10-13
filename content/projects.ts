import type { StaticImageData } from "next/image";

import ztsDesktop from "@/assets/projects/zts-fashion-desktop.jpg";
import ztsMobile from "@/assets/projects/zts-fashion-mobile.jpg";
import ztsArrivals from "@/assets/projects/zts-fashion-arrivals.jpg";
import soulmateDesktop from "@/assets/projects/soulmate-gift-store-desktop.jpg";
import soulmateBuilder from "@/assets/projects/soulmate-gift-store-builder.jpg";
import dermivaDesktop from "@/assets/projects/dermiva-skincare-desktop.jpg";
import dermivaBestsellers from "@/assets/projects/dermiva-skincare-bestsellers.jpg";
import drMirrorHero from "@/assets/projects/dr-mirror-hero.jpg";

/**
 * Portfolio projects (docs/CONTENT_AND_PROJECTS.md).
 *
 * Only facts that can be verified are published. Featured descriptions were
 * checked against each live site (October 2026). Screenshots are captures of
 * the live sites at 2x and preserve the real client UI; the only change is
 * that a floating third-party chat launcher was hidden before capture.
 *
 * Projects without verified details are listed for routing only and are not
 * featured. Never add results, metrics, dates or technology stacks without
 * owner confirmation.
 */
export type ProjectCategory = "Websites" | "E-commerce" | "Systems" | "Mobile Apps";

export type ProjectImage = { src: StaticImageData; alt: string };

export type Project = {
  slug: string;
  name: string;
  /** null = category not yet verified; do not display one. */
  category: ProjectCategory | null;
  summary: string | null;
  liveUrl: string | null;
  media?: {
    /** Desktop home page (16:10), or a page crop where noted. */
    primary: ProjectImage;
    /** Cropped interface detail from the same site. */
    detail?: ProjectImage;
    /** Mobile home page, portrait. */
    mobile?: ProjectImage;
  };
  featured: boolean;
};

export const projects: readonly Project[] = [
  {
    slug: "soulmate-gift-store",
    name: "Soulmate Gift Store",
    category: "E-commerce",
    summary: "Personalised gift store where customers build a gift box piece by piece and add names, a date and a message.",
    liveUrl: "https://soulmate-accessories-store.vercel.app/",
    media: {
      primary: { src: soulmateDesktop, alt: "Soulmate Gift Store home page: “Build a gift for one person” with a gift box hero and shop categories" },
      detail: { src: soulmateBuilder, alt: "Soulmate Gift Store “Build your own box” section with couple’s, men’s and women’s boxes" },
    },
    featured: true,
  },
  {
    slug: "dermiva-skincare",
    name: "Dermiva Skincare",
    category: "E-commerce",
    summary: "Online store for face, hair, body and lip care products, organised by category.",
    liveUrl: "https://dermiva-eg.vercel.app/en",
    media: {
      primary: { src: dermivaDesktop, alt: "Dermiva Skincare home page with face, hair, body and lip care categories" },
      detail: { src: dermivaBestsellers, alt: "Dermiva Skincare best sellers row with product cards and add-to-cart buttons" },
    },
    featured: true,
  },
  {
    slug: "zts-fashion",
    name: "ZTS Fashion",
    category: "E-commerce",
    summary: "Online store for a clothing brand of minimalist everyday basics, made in Egypt.",
    liveUrl: "https://www.ztsbrand.com/en",
    media: {
      primary: { src: ztsDesktop, alt: "ZTS Fashion home page: “Minimal basics, ready to wear”" },
      detail: { src: ztsArrivals, alt: "ZTS Fashion new arrivals row with product photos, colours and prices" },
      mobile: { src: ztsMobile, alt: "ZTS Fashion home page on a phone" },
    },
    featured: true,
  },
  {
    slug: "dr-mirror",
    name: "Dr Mirror",
    category: "E-commerce",
    summary: "Online store for medical scrubs and uniforms, in multiple sizes and colours, with delivery across Egypt.",
    liveUrl: "https://dr-mirror.vercel.app/",
    media: {
      /** Portrait crop of the right-hand (Arabic, RTL) half of the desktop home page. */
      primary: { src: drMirrorHero, alt: "Dr Mirror home page in Arabic: headline, shop buttons and category navigation for medical scrubs" },
    },
    featured: true,
  },
  { slug: "saad-logistic", name: "Saad Logistic", category: "Websites", summary: null, liveUrl: "https://www.saadlogistic.com/", featured: false },
  { slug: "slc-logistics", name: "SLC Logistics", category: null, summary: null, liveUrl: null, featured: false },
  { slug: "auto-parts-pos", name: "Auto Parts POS", category: "Systems", summary: null, liveUrl: null, featured: false },
  { slug: "e-library-web-app", name: "E-Library Web App", category: "Systems", summary: null, liveUrl: null, featured: false },
  { slug: "lap-service-pos", name: "Lap Service POS", category: "Systems", summary: null, liveUrl: null, featured: false },
  { slug: "moonwatch", name: "MoonWatch", category: null, summary: null, liveUrl: null, featured: false },
];

export type FeaturedProject = Project & { summary: string; media: NonNullable<Project["media"]> };

export const featuredProjects = projects.filter(
  (project): project is FeaturedProject => project.featured && project.summary !== null && project.media !== undefined,
);

export function getFeaturedProject(slug: string): FeaturedProject {
  const project = featuredProjects.find((item) => item.slug === slug);
  if (!project) throw new Error(`Featured project not found: ${slug}`);
  return project;
}

export function projectHref(slug: string) {
  return `/work/${slug}`;
}
