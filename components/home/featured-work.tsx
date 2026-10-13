import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

import { TextLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Facet } from "@/components/ui/facet";
import { getFeaturedProject, projectHref, type FeaturedProject, type ProjectImage } from "@/content/projects";

/**
 * Featured work as four campaign chapters. Each chapter is composed for its
 * own screenshots instead of sharing a card layout:
 * 01 a massive landscape crop, 02 a vertical pair, 03 desktop with a narrow
 * phone crop, 04 oversized type over a full-width detail.
 */
const zts = getFeaturedProject("zts-fashion");
const dermiva = getFeaturedProject("dermiva-skincare");
const drMirror = getFeaturedProject("dr-mirror");
const soulmate = getFeaturedProject("soulmate-gift-store");

const articleFocus =
  "has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-8 has-[a:focus-visible]:outline-accent";
const zoom = "transition-transform duration-700 ease-out-soft group-hover:scale-[1.02]";

function need(image: ProjectImage | undefined, label: string): ProjectImage {
  if (!image) throw new Error(`Missing ${label}`);
  return image;
}

function ChapterRule({ index, project }: { index: number; project: FeaturedProject }) {
  return (
    <div className="mb-10 flex items-center gap-4 text-[0.6875rem] font-medium tracking-[0.18em] text-muted uppercase lg:mb-14">
      <span className="text-navy tabular-nums">Project {String(index).padStart(2, "0")}</span>
      <span aria-hidden="true" data-reveal="line" className="h-px flex-1 bg-line-strong" />
      <span>{project.category}</span>
    </div>
  );
}

function ProjectTitle({ project, className }: { project: FeaturedProject; className: string }) {
  return (
    <h3 className={className}>
      <Link href={projectHref(project.slug)} className="outline-none after:absolute after:inset-0 after:z-20 after:content-['']">
        {project.name}
      </Link>
    </h3>
  );
}

function ProjectText({ project, children }: { project: FeaturedProject; children?: ReactNode }) {
  return (
    <>
      {children}
      <p className="mt-5 max-w-[26rem] text-base leading-relaxed text-muted">{project.summary}</p>
      <span
        aria-hidden="true"
        className="mt-7 inline-flex items-center gap-2 text-[0.9375rem] font-semibold underline decoration-navy/30 decoration-1 underline-offset-[6px] transition-[text-decoration-color] duration-300 group-hover:decoration-navy"
      >
        View Project
        <ArrowRight className="size-4 transition-transform duration-500 ease-out-soft group-hover:translate-x-1.5" strokeWidth={2} />
      </span>
    </>
  );
}

const titleMd = "text-[clamp(2.25rem,1.4rem+2.8vw,3.75rem)] leading-[0.98] font-bold tracking-[-0.045em]";

/** 01: massive landscape crop bleeding off the left edge; meta in the free column. */
function ChapterOne() {
  const { primary } = zts.media;
  const mobile = need(zts.media.mobile, "ZTS mobile");
  return (
    <article className={`group relative ${articleFocus}`}>
      <ChapterRule index={1} project={zts} />
      <div className="grid gap-y-10 lg:grid-cols-12 lg:items-end lg:gap-x-10">
        <div data-reveal="wipe" className="-mx-[var(--gutter)] lg:col-span-9 lg:mr-0">
          {/* Phones get the site's own phone layout; sm+ the desktop page */}
          <div className="facet-br relative aspect-[4/5] overflow-hidden bg-light sm:hidden">
            <Image src={mobile.src} alt={mobile.alt} fill sizes="100vw" placeholder="blur" className={`object-cover object-top ${zoom}`} />
          </div>
          <div className="facet-br relative hidden aspect-[2/1] overflow-hidden bg-light sm:block">
            <Image src={primary.src} alt={primary.alt} fill sizes="(min-width: 1024px) 78vw, 100vw" placeholder="blur" className={`object-cover object-left-top ${zoom}`} />
          </div>
        </div>
        <div className="lg:col-span-3 lg:pb-2">
          <ProjectText project={zts}>
            <ProjectTitle project={zts} className={titleMd} />
          </ProjectText>
        </div>
      </div>
    </article>
  );
}

/** 02: vertical editorial pair, desktop crop and phone, meta leading on the left. */
function ChapterTwo() {
  const { primary } = dermiva.media;
  const mobile = need(dermiva.media.mobile, "Dermiva mobile");
  return (
    <article className={`group relative ${articleFocus}`}>
      <ChapterRule index={2} project={dermiva} />
      <div className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-10">
        <div className="lg:col-span-4 lg:self-end lg:pb-16">
          <ProjectText project={dermiva}>
            <ProjectTitle project={dermiva} className={titleMd} />
          </ProjectText>
        </div>
        <div className="grid grid-cols-[1.75fr_1fr] items-start gap-x-4 sm:gap-x-8 lg:col-span-8 lg:gap-x-10">
          <div data-reveal="wipe">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2px] bg-light">
              <Image src={primary.src} alt={primary.alt} fill sizes="(min-width: 1024px) 40vw, 62vw" placeholder="blur" className={`object-cover object-left-top ${zoom}`} />
            </div>
          </div>
          <div data-reveal="wipe" className="mt-[45%]">
            <div className="relative aspect-[780/1688] overflow-hidden rounded-[6px] bg-light outline outline-1 -outline-offset-1 outline-navy/10">
              <Image src={mobile.src} alt={mobile.alt} fill sizes="(min-width: 1024px) 22vw, 34vw" placeholder="blur" className={`object-cover object-top ${zoom}`} />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

/** 03: desktop crop bleeding right, a narrow phone crop stepping over its left edge. */
function ChapterThree() {
  const { primary } = drMirror.media;
  const mobile = need(drMirror.media.mobile, "Dr Mirror mobile");
  return (
    <article className={`group relative ${articleFocus}`}>
      <ChapterRule index={3} project={drMirror} />
      <div className="grid lg:grid-cols-12 lg:gap-x-10">
        <div className="lg:col-span-3 lg:col-start-1 lg:row-start-1">
          <ProjectText project={drMirror}>
            <ProjectTitle project={drMirror} className={titleMd} />
          </ProjectText>
        </div>
        <div data-reveal="wipe" className="mt-12 -mx-[var(--gutter)] lg:col-span-9 lg:col-start-4 lg:row-span-2 lg:row-start-1 lg:mt-0 lg:ml-0">
          <div className="facet-tl relative aspect-[16/10] overflow-hidden bg-light">
            <Image src={primary.src} alt={primary.alt} fill sizes="(min-width: 1024px) 72vw, 100vw" placeholder="blur" className={`object-cover object-top ${zoom}`} />
          </div>
        </div>
        <div
          data-reveal="rise"
          className="relative z-10 -mt-[18%] ml-[6%] w-[40%] sm:w-[30%] lg:col-span-3 lg:col-start-2 lg:row-start-2 lg:mt-14 lg:ml-0 lg:w-[78%] lg:justify-self-end"
        >
          <div className="relative aspect-[780/1688] overflow-hidden rounded-[6px] bg-light outline outline-1 -outline-offset-1 outline-navy/10 ring-[6px] ring-white lg:ring-[10px]">
            <Image src={mobile.src} alt={mobile.alt} fill sizes="(min-width: 1024px) 18vw, 40vw" placeholder="blur" className={`object-cover object-top ${zoom}`} />
          </div>
        </div>
      </div>
    </article>
  );
}

/** 04: oversized name, then a full-width interface detail cut with the facet angle. */
function ChapterFour() {
  const detail = need(soulmate.media.detail, "Soulmate detail");
  return (
    <article className={`group relative ${articleFocus}`}>
      <ChapterRule index={4} project={soulmate} />
      <div className="grid gap-y-8 lg:grid-cols-12 lg:items-end lg:gap-x-10">
        <ProjectTitle
          project={soulmate}
          className="text-[clamp(3.25rem,0.9rem+10vw,10.5rem)] leading-[0.86] font-bold tracking-[-0.055em] lg:col-span-8"
        />
        <div className="lg:col-span-4 lg:pb-3">
          <ProjectText project={soulmate} />
        </div>
      </div>
      <figure className="mt-14 lg:mt-20">
        <div data-reveal="wipe" className="bleed-left lg:mr-[8.33%]">
          <div className="facet-br relative aspect-[4/3] overflow-hidden bg-light sm:aspect-[1600/722]">
            <Image src={detail.src} alt={detail.alt} fill sizes="(min-width: 1024px) 88vw, 100vw" placeholder="blur" className={`object-cover object-left ${zoom}`} />
          </div>
        </div>
        <figcaption className="mt-4 flex flex-wrap items-baseline gap-x-3 text-[0.8125rem] text-muted">
          <span className="font-medium text-navy">{soulmate.name}</span>
          <span aria-hidden="true" className="h-px w-6 translate-y-[-0.3em] bg-line-strong" />
          “Build your own box” on the live store
        </figcaption>
      </figure>
    </article>
  );
}

export function FeaturedWork() {
  return (
    <section aria-labelledby="work-title" className="relative bg-white text-navy">
      <div aria-hidden="true" className="-mt-px step-down bg-light [--step-x:22%]" />

      <Container className="pt-20 pb-24 md:pt-24 lg:pt-32 lg:pb-32">
        <div className="grid gap-y-10 lg:grid-cols-12 lg:items-end lg:gap-x-10">
          <div className="lg:col-span-8">
            <p className="flex items-center gap-3 text-[0.75rem] font-medium tracking-[0.16em] text-muted uppercase">
              <Facet className="size-2" />
              Selected work
              <span className="tabular-nums text-muted">/ 04</span>
            </p>
            <h2
              id="work-title"
              className="mt-8 text-[clamp(3rem,1.2rem+7.4vw,8.5rem)] leading-[0.88] font-bold tracking-[-0.055em]"
            >
              Real Projects.
              <br />
              Real Results.
            </h2>
          </div>
          <div className="lg:col-span-3 lg:col-start-10 lg:pb-3">
            <p className="max-w-[24rem] text-[1.0625rem] leading-relaxed text-muted">
              A selection of online stores we have designed and built for real businesses.
            </p>
            <TextLink href="/work" className="mt-3">
              See All Work
            </TextLink>
          </div>
        </div>

        <div className="mt-24 space-y-28 md:space-y-36 lg:mt-36 lg:space-y-48">
          <ChapterOne />
          <ChapterTwo />
          <ChapterThree />
          <ChapterFour />
        </div>
      </Container>
    </section>
  );
}
