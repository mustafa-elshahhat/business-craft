import type { StaticImageData } from "next/image";

import ztsDesktop from "@/assets/projects/zts-fashion-desktop.jpg";
import ztsMobile from "@/assets/projects/zts-fashion-mobile.jpg";
import dermivaDesktop from "@/assets/projects/dermiva-skincare-desktop.jpg";
import soulmateDesktop from "@/assets/projects/soulmate-gift-store-desktop.jpg";
import drMirrorDesktop from "@/assets/projects/dr-mirror-desktop.jpg";

/**
 * Portfolio projects (docs/CONTENT_AND_PROJECTS.md).
 *
 * Only facts that can be verified are published. Featured descriptions were
 * checked against each live site (October 2026). Screenshots are captures of
 * the live sites and preserve the real client UI.
 *
 * Projects without verified details are listed for routing only and are not
 * featured. Never add results, metrics, dates or technology stacks without
 * owner confirmation.
 */
export type ProjectCategory = "Websites" | "E-commerce" | "Systems" | "Mobile Apps";

export type Project = {
  slug: string;
  name: string;
  /** null = category not yet verified; do not display one. */
  category: ProjectCategory | null;
  summary: string | null;
  liveUrl: string | null;
  images?: { desktop: StaticImageData; mobile?: StaticImageData };
  featured: boolean;
};

export const projects: readonly Project[] = [
  {
    slug: "zts-fashion",
    name: "ZTS Fashion",
    category: "E-commerce",
    summary: "Online store for a clothing brand of minimalist everyday basics, made in Egypt.",
    liveUrl: "https://www.ztsbrand.com/en",
    images: { desktop: ztsDesktop, mobile: ztsMobile },
    featured: true,
  },
  {
    slug: "dermiva-skincare",
    name: "Dermiva Skincare",
    category: "E-commerce",
    summary: "Online store for face, hair, body and lip care products, organised by category.",
    liveUrl: "https://dermiva-eg.vercel.app/en",
    images: { desktop: dermivaDesktop },
    featured: true,
  },
  {
    slug: "soulmate-gift-store",
    name: "Soulmate Gift Store",
    category: "E-commerce",
    summary: "Personalised gift store where customers build a gift box piece by piece and add names, a date and a message.",
    liveUrl: "https://soulmate-accessories-store.vercel.app/",
    images: { desktop: soulmateDesktop },
    featured: true,
  },
  {
    slug: "dr-mirror",
    name: "Dr Mirror",
    category: "E-commerce",
    summary: "Online store for medical scrubs and uniforms, in multiple sizes and colours, with delivery across Egypt.",
    liveUrl: "https://dr-mirror.vercel.app/",
    images: { desktop: drMirrorDesktop },
    featured: true,
  },
  { slug: "saad-logistic", name: "Saad Logistic", category: "Websites", summary: null, liveUrl: "https://www.saadlogistic.com/", featured: false },
  { slug: "slc-logistics", name: "SLC Logistics", category: null, summary: null, liveUrl: null, featured: false },
  { slug: "auto-parts-pos", name: "Auto Parts POS", category: "Systems", summary: null, liveUrl: null, featured: false },
  { slug: "e-library-web-app", name: "E-Library Web App", category: "Systems", summary: null, liveUrl: null, featured: false },
  { slug: "lap-service-pos", name: "Lap Service POS", category: "Systems", summary: null, liveUrl: null, featured: false },
  { slug: "moonwatch", name: "MoonWatch", category: null, summary: null, liveUrl: null, featured: false },
];

export const featuredProjects = projects.filter(
  (project): project is Project & { summary: string; images: NonNullable<Project["images"]> } =>
    project.featured && project.summary !== null && project.images !== undefined,
);

export function projectHref(slug: string) {
  return `/work/${slug}`;
}
