import Image from "next/image";
import Link from "next/link";

import soulmateProduct from "@/assets/projects/soulmate-gift-store-product.jpg";
import { TextLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { getFeaturedProject, projectHref, type FeaturedProject, type ProjectImage } from "@/content/projects";

import { WorkVideo } from "./work-video";

type Tile = {
  project: FeaturedProject;
  poster: ProjectImage;
  video?: { mp4: string; webm: string };
  /** Layout classes for the offset editorial grid. */
  className: string;
  /** Crop anchor: keeps each store's own headline in frame (Dr Mirror is right-to-left). */
  position?: string;
  sizes: string;
};

const zts = getFeaturedProject("zts-fashion");
const dermiva = getFeaturedProject("dermiva-skincare");
const soulmate = getFeaturedProject("soulmate-gift-store");
const drMirror = getFeaturedProject("dr-mirror");

const left: Tile[] = [
  {
    project: zts,
    poster: zts.media.desktop,
    video: { mp4: "/media/work/zts-fashion.mp4", webm: "/media/work/zts-fashion.webm" },
    className: "order-1",
    sizes: "(min-width: 1024px) 56vw, 92vw",
  },
  {
    project: soulmate,
    poster: {
      src: soulmateProduct,
      alt: "Soulmate Gift Store product page: a Casio watch at 2,943 EGP with the Personalize this piece option",
    },
    className: "order-3 lg:ml-[16%]",
    sizes: "(min-width: 1024px) 47vw, 92vw",
  },
];

const right: Tile[] = [
  {
    project: dermiva,
    poster: dermiva.media.desktop,
    video: { mp4: "/media/work/dermiva-skincare.mp4", webm: "/media/work/dermiva-skincare.webm" },
    className: "order-2 lg:mt-40",
    sizes: "(min-width: 1024px) 38vw, 92vw",
  },
  {
    project: drMirror,
    poster: drMirror.media.desktop,
    className: "order-4",
    position: "object-right-top",
    sizes: "(min-width: 1024px) 30vw, 92vw",
  },
];

function WorkTile({ tile }: { tile: Tile }) {
  const { project } = tile;
  return (
    <article
      className={`group relative rounded-[14px] has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-8 has-[a:focus-visible]:outline-accent ${tile.className}`}
    >
      <div data-reveal="media" className="media-frame aspect-[4/3]">
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

      <div className="mt-5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h3 className="text-[1.5rem] leading-tight font-[540] tracking-[-0.02em]">
          <Link href={projectHref(project.slug)} className="outline-none after:absolute after:inset-0 after:content-['']">
            {project.name}
          </Link>
        </h3>
        <p className="text-label text-muted uppercase">
          {project.category}
          {project.bilingual ? " · EN / AR" : ""}
        </p>
      </div>
      {/* Revealed on hover/focus with a pointer; always visible on touch */}
      <p className="mt-2 max-w-[34rem] text-[0.9375rem] leading-relaxed text-muted transition-[opacity,transform] duration-[250ms] ease-[var(--ease-out)] group-hover:duration-300 [@media(hover:hover)]:translate-y-4 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-focus-within:translate-y-0 [@media(hover:hover)]:group-focus-within:opacity-100 [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:opacity-100">
        {project.summary}
      </p>
    </article>
  );
}

/** Selected Work: an offset two-column editorial grid of real, live projects. */
export function FeaturedWork() {
  return (
    <section aria-labelledby="work-title" data-header="light" className="bg-white text-navy">
      <Container className="py-24 md:py-32 lg:py-40">
        <div className="grid gap-y-6 lg:grid-cols-12 lg:items-end lg:gap-x-10">
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

        <div className="mt-16 grid gap-y-16 md:mt-20 lg:mt-24 lg:grid-cols-12 lg:gap-x-10">
          {/* Columns flatten on small screens so the order follows priority. */}
          <div className="contents lg:col-span-7 lg:block lg:space-y-24">
            {left.map((tile) => (
              <WorkTile key={tile.project.slug} tile={tile} />
            ))}
          </div>
          <div className="contents lg:col-span-5 lg:block lg:space-y-24">
            {right.map((tile) => (
              <WorkTile key={tile.project.slug} tile={tile} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
