import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import soulmateDetail from "@/assets/projects/soulmate-gift-store-product-detail.jpg";
import { TextLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { getFeaturedProject, projectHref, type FeaturedProject, type ProjectImage } from "@/content/projects";

import { WorkVideo } from "./work-video";

type Tile = {
  project: FeaturedProject;
  poster: ProjectImage;
  video?: { mp4: string; webm: string };
  /** Media frame ratio: tiles vary on purpose (landscape page, portrait close-up). */
  aspect: string;
  /** Crop anchor that keeps each store's own headline in frame (Dr Mirror is right-to-left). */
  position?: string;
  sizes: string;
  className?: string;
};

const zts = getFeaturedProject("zts-fashion");
const dermiva = getFeaturedProject("dermiva-skincare");
const soulmate = getFeaturedProject("soulmate-gift-store");
const drMirror = getFeaturedProject("dr-mirror");

const feature: Tile = {
  project: zts,
  poster: zts.media.desktop,
  video: { mp4: "/media/work/zts-fashion.mp4", webm: "/media/work/zts-fashion.webm" },
  aspect: "aspect-[4/3] md:aspect-[16/9]",
  sizes: "(min-width: 1376px) 1280px, 94vw",
};

const dermivaTile: Tile = {
  project: dermiva,
  poster: dermiva.media.desktop,
  video: { mp4: "/media/work/dermiva-skincare.mp4", webm: "/media/work/dermiva-skincare.webm" },
  aspect: "aspect-[4/3]",
  sizes: "(min-width: 1024px) 56vw, 94vw",
};

const soulmateTile: Tile = {
  project: soulmate,
  poster: {
    src: soulmateDetail,
    alt: "Soulmate Gift Store product page close-up: Casio watch, 2,943 EGP, in stock, with the Personalize this piece option and Add to bag",
  },
  aspect: "aspect-[4/5]",
  sizes: "(min-width: 1024px) 38vw, 94vw",
};

const drMirrorTile: Tile = {
  project: drMirror,
  poster: drMirror.media.desktop,
  aspect: "aspect-[4/3]",
  position: "object-right-top",
  sizes: "(min-width: 1024px) 40vw, 94vw",
};

function Meta({ project, large = false }: { project: FeaturedProject; large?: boolean }) {
  return (
    <div className="mt-5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
      <h3 className={large ? "text-h3" : "text-[1.5rem] leading-tight font-[540] tracking-[-0.02em]"}>
        <Link href={projectHref(project.slug)} className="outline-none after:absolute after:inset-0 after:content-['']">
          {project.name}
        </Link>
      </h3>
      <p className="text-label text-muted uppercase">
        {project.category}
        {project.bilingual ? " · English / Arabic" : ""}
      </p>
    </div>
  );
}

function Media({ tile }: { tile: Tile }) {
  return (
    <div data-reveal="media" className={`media-frame ${tile.aspect}`}>
      <Image
        src={tile.poster.src}
        alt={tile.poster.alt}
        fill
        sizes={tile.sizes}
        placeholder="blur"
        className={`object-cover ${tile.position ?? "object-left-top"} transition-[filter] hover-ease group-hover:brightness-[1.04]`}
      />
      {tile.video ? <WorkVideo mp4={tile.video.mp4} webm={tile.video.webm} /> : null}
    </div>
  );
}

const tileFocus =
  "group relative rounded-[14px] has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-8 has-[a:focus-visible]:outline-accent";

/** Supporting tile: name first; the description rises in on hover/focus (always visible on touch). */
function WorkTile({ tile }: { tile: Tile }) {
  return (
    <article className={`${tileFocus} ${tile.className ?? ""}`}>
      <Media tile={tile} />
      <Meta project={tile.project} />
      <p className="mt-2 max-w-[34rem] text-[0.9375rem] leading-relaxed text-muted transition-[opacity,transform] duration-[250ms] ease-[var(--ease-out)] group-hover:duration-300 [@media(hover:hover)]:translate-y-4 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-focus-within:translate-y-0 [@media(hover:hover)]:group-focus-within:opacity-100 [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:opacity-100">
        {tile.project.summary}
      </p>
    </article>
  );
}

/**
 * Selected Work: ZTS leads as the full-width feature; Dermiva, a Soulmate
 * interface close-up and Dr Mirror follow at deliberately different scales.
 */
export function FeaturedWork() {
  return (
    <section aria-labelledby="work-title" data-header="light" className="bg-white text-navy">
      <Container className="py-16 md:py-28 lg:py-40">
        <div className="grid gap-y-5 lg:grid-cols-12 lg:items-end lg:gap-x-10">
          <h2 id="work-title" data-reveal className="text-h2 lg:col-span-6">
            Selected Work.
          </h2>
          <div data-reveal style={{ "--i": 1 } as React.CSSProperties} className="lg:col-span-5 lg:col-start-8">
            <p className="max-w-[30rem] text-body text-muted">
              Online stores we have designed and built for real businesses, live today in English and Arabic.
            </p>
            <TextLink href="/work" className="mt-2">
              See All Work
            </TextLink>
          </div>
        </div>

        {/* Feature: the description is part of the composition, not a hover reveal */}
        <article className={`${tileFocus} mt-12 md:mt-16 lg:mt-20`}>
          <Media tile={feature} />
          <div className="mt-6 grid gap-y-3 lg:grid-cols-12 lg:gap-x-10">
            <div className="lg:col-span-7">
              <Meta project={zts} large />
            </div>
            <div className="lg:col-span-5 lg:pt-6">
              <p className="max-w-[30rem] text-body text-muted">{zts.summary}</p>
              <span
                aria-hidden="true"
                className="mt-3 inline-flex items-center gap-2 text-[0.9375rem] font-[540] underline decoration-navy/30 decoration-1 underline-offset-[6px] transition-[text-decoration-color] hover-ease group-hover:decoration-navy"
              >
                View Project
                <ArrowRight className="size-4 transition-transform hover-ease group-hover:translate-x-[3px]" strokeWidth={2} />
              </span>
            </div>
          </div>
        </article>

        {/*
          Supporting pieces: Dermiva (wide) and the tall Soulmate close-up share
          a row with Soulmate dropped; Dr Mirror steps in under Soulmate's
          column, offset from the left edge.
        */}
        <div className="mt-14 grid gap-y-14 md:mt-20 lg:mt-28 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-24">
          <div className="lg:col-span-7">
            <WorkTile tile={dermivaTile} />
          </div>
          <div className="lg:col-span-4 lg:col-start-9 lg:row-span-2 lg:pt-32">
            <WorkTile tile={soulmateTile} />
          </div>
          <div className="lg:col-span-6 lg:col-start-2">
            <WorkTile tile={drMirrorTile} />
          </div>
        </div>
      </Container>
    </section>
  );
}
