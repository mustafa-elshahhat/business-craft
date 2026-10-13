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

/**
 * Portfolio projects (docs/CONTENT_AND_PROJECTS.md).
 *
 * Only facts verified on the live sites are published (captured October
 * 2026, evidence in assets/captures/<project>/CAPTURES.md). Screenshots are
 * captures of the live sites; the only change is that a floating
 * third-party chat launcher was hidden before capture where present.
 *
 * Never add results, metrics, dates or technology stacks without owner
 * confirmation.
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
  /** Languages verified live, with genuine right-to-left Arabic layouts. */
  bilingual?: boolean;
  media?: {
    /** Desktop home page, 16:10. */
    desktop: ProjectImage;
    /** Phone home page, portrait. */
    mobile?: ProjectImage;
  };
  featured: boolean;
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
    featured: true,
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
    featured: true,
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
    featured: true,
  },
  {
    slug: "dr-mirror",
    name: "Dr Mirror",
    category: "E-commerce",
    summary: "Online store for medical scrubs and uniforms, in multiple sizes and colours, with delivery across Egypt.",
    liveUrl: "https://dr-mirror.vercel.app/",
    bilingual: true,
    media: {
      desktop: { src: drMirrorHome, alt: "Dr Mirror home page in Arabic: medical scrubs photo, headline and shop buttons" },
    },
    featured: true,
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
      desktop: { src: saadHome, alt: "Saad Logistic home page in Arabic: shipping and logistics hero with booking buttons" },
      mobile: { src: saadHomeMobile, alt: "Saad Logistic home page in Arabic on a phone" },
    },
    featured: true,
  },
  /** A separate project from Saad Logistic. Not published until a verified public visual exists. */
  { slug: "slc-logistics", name: "SLC Logistics", category: null, summary: null, liveUrl: null, featured: false },
  /** Screens show client logos and are not published (docs/CONTENT_AND_PROJECTS.md). */
  { slug: "auto-parts-pos", name: "Auto Parts POS", category: "Systems", summary: "Point of sale for an auto-parts retailer.", liveUrl: null, featured: false },
  { slug: "lap-service-pos", name: "Lap Service POS", category: "Systems", summary: "Point of sale for a repair workshop.", liveUrl: null, featured: false },
  /** Scope not yet verified: not used as Systems proof. */
  { slug: "e-library-web-app", name: "E-Library Web App", category: null, summary: null, liveUrl: null, featured: false },
  { slug: "moonwatch", name: "MoonWatch", category: null, summary: null, liveUrl: null, featured: false },
];

export type FeaturedProject = Project & { summary: string; media: NonNullable<Project["media"]> };

export const featuredProjects = projects.filter(
  (project): project is FeaturedProject => project.featured && project.summary !== null && project.media !== undefined,
);

export function getProject(slug: string): Project {
  const project = projects.find((item) => item.slug === slug);
  if (!project) throw new Error(`Project not found: ${slug}`);
  return project;
}

export function getFeaturedProject(slug: string): FeaturedProject {
  const project = featuredProjects.find((item) => item.slug === slug);
  if (!project) throw new Error(`Featured project not found: ${slug}`);
  return project;
}

export function projectHref(slug: string) {
  return `/work/${slug}`;
}

/** Display host for a live URL, e.g. "ztsbrand.com". */
export function projectHost(project: Project) {
  return project.liveUrl ? new URL(project.liveUrl).hostname.replace(/^www\./, "") : null;
}
