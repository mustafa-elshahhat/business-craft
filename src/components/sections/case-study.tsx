import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Label, TwoTone } from "@/components/ui/section-heading";
import type { CaseStudy } from "@/data/case-studies";
import { coverPosition, projectHost, projectHref, type Project } from "@/data/projects";
import { serviceHref } from "@/data/services";
import { WorkVideo } from "@/features/projects/work-video";

/** Verified facts for the case-study hero (right column). */
export function CaseStudyFacts({ project, study }: { project: Project; study: CaseStudy }) {
  const serviceSlug = project.category === "Websites" ? "websites" : "e-commerce";
  const facts = [
    { label: "Service", value: study.service },
    { label: "Languages", value: study.languages },
    { label: "Live at", value: projectHost(project) },
  ];
  return (
    <dl className="mt-8 border-t border-line-dark">
      {facts.map((fact) => (
        <div key={fact.label} className="flex items-baseline justify-between gap-6 border-b border-line-dark py-3 text-[0.9375rem]">
          <dt className="text-mist">{fact.label}</dt>
          <dd className="text-right text-white/90">
            {fact.label === "Live at" ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-1 underline decoration-white/30 underline-offset-4 transition-[text-decoration-color] hover-ease hover:decoration-white"
              >
                {fact.value}
                <ArrowUpRight aria-hidden="true" className="size-3.5" strokeWidth={2} />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ) : fact.label === "Service" ? (
              <Link href={serviceHref(serviceSlug)} className="inline-flex min-h-11 items-center underline decoration-white/30 underline-offset-4 hover:decoration-white">
                {fact.value}
              </Link>
            ) : (
              fact.value
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** Context and what the live site includes. */
export function CaseStudyContext({ study }: { study: CaseStudy }) {
  return (
    <section aria-labelledby="context-title" data-header="light" className="bg-light text-navy">
      <Container className="py-16 md:py-28 lg:py-36">
        <div className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-5">
            <Label>Context</Label>
            <h2 id="context-title" className="sr-only">
              Context
            </h2>
            <p data-reveal className="mt-4 text-lead text-navy">
              {study.context}
            </p>
            {study.note ? <p className="mt-6 max-w-[28rem] text-[0.9375rem] text-muted">{study.note}</p> : null}
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <h2 className="text-label text-muted uppercase">What the live site includes</h2>
            <ul className="mt-4 border-t border-line">
              {study.built.map((item) => (
                <li key={item.title} className="grid gap-y-1 border-b border-line py-5 sm:grid-cols-[12rem_1fr] sm:gap-x-8">
                  <h3 className="text-[1.0625rem] font-[540] tracking-[-0.01em]">{item.title}</h3>
                  <p className="text-[0.9375rem] leading-relaxed text-muted">{item.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

/** The key interaction: a desktop capture beside the same flow on a phone. */
export function CaseStudyHighlight({ highlight }: { highlight: Extract<CaseStudy["highlight"], { kind: "pair" }> }) {
  return (
    <section aria-labelledby="highlight-title" data-header="light" className="bg-white text-navy">
      <Container className="py-16 md:py-28 lg:py-36">
        <div className="grid gap-y-6 lg:grid-cols-12 lg:items-end lg:gap-x-10">
          <h2 id="highlight-title" data-reveal className="max-w-[18ch] text-h2 lg:col-span-7">
            {highlight.title}
          </h2>
          <p className="max-w-[28rem] text-body text-muted lg:col-span-4 lg:col-start-9">{highlight.text}</p>
        </div>
        <div className="mt-12 grid items-end gap-6 md:mt-16 sm:grid-cols-[minmax(0,1fr)_minmax(0,0.36fr)] lg:gap-10">
          <div data-reveal="media" className="media-frame aspect-[16/10]">
            <Image
              src={highlight.desktop.src}
              alt={highlight.desktop.alt}
              fill
              sizes="(min-width: 1024px) 66vw, 94vw"
              className="object-cover object-left-top"
            />
          </div>
          <div data-reveal="media" className="mx-auto w-[60%] sm:w-full">
            <div className="media-frame aspect-[780/1688] !rounded-[14px]">
              <Image src={highlight.mobile.src} alt={highlight.mobile.alt} fill sizes="(min-width: 640px) 24vw, 60vw" className="object-cover object-top" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/** Real interface gallery, with the live clip where one exists. */
export function CaseStudyGallery({ study }: { study: CaseStudy }) {
  if (!study.video && study.gallery.length === 0) return null;
  return (
    <section aria-labelledby="gallery-title" data-header="light" className="bg-light text-navy">
      <Container className="py-16 md:py-28 lg:py-36">
        <h2 id="gallery-title" className="text-label text-muted uppercase">
          More from the live site
        </h2>
        <div className="mt-6 grid gap-y-12 lg:grid-cols-12 lg:gap-x-10">
          {study.video ? (
            <figure className="lg:col-span-12">
              <div data-reveal="media" className="media-frame aspect-[16/10] lg:aspect-[16/9]">
                <Image src={study.video.poster.src} alt={study.video.poster.alt} fill sizes="(min-width: 1376px) 1280px, 94vw" className="object-cover object-left-top" />
                <WorkVideo mp4={study.video.mp4} webm={study.video.webm} />
              </div>
              <figcaption className="mt-3 text-[0.8125rem] text-muted">Scrolling the live home page</figcaption>
            </figure>
          ) : null}
          {study.gallery.map((shot, index) => (
            <figure
              key={shot.alt}
              className={
                study.gallery.length === 1
                  ? "lg:col-span-9"
                  : index === 0
                    ? "lg:col-span-7"
                    : index === 1
                      ? "lg:col-span-5 lg:mt-24"
                      : "lg:col-span-8 lg:col-start-3"
              }
            >
              {/* Each capture keeps its own proportions */}
              <div data-reveal="media" className="media-frame" style={{ aspectRatio: `${shot.src.width} / ${shot.src.height}` }}>
                <Image src={shot.src} alt={shot.alt} fill sizes="(min-width: 1024px) 58vw, 94vw" className="object-cover object-top" />
              </div>
              {shot.caption ? <figcaption className="mt-3 text-[0.8125rem] text-muted">{shot.caption}</figcaption> : null}
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}

/** Bilingual proof: the hero shows the default language; this shows the other one. */
export function CaseStudyBilingual({ study }: { study: CaseStudy }) {
  return (
    <section aria-labelledby="bilingual-title" data-header="dark" className="bg-navy text-white">
      <Container className="py-16 md:py-28 lg:py-36">
        <div className="grid gap-y-6 lg:grid-cols-12 lg:items-end lg:gap-x-10">
          <h2 id="bilingual-title" data-reveal className="max-w-[18ch] text-h2 lg:col-span-7">
            <TwoTone tone="dark" lead="English and Arabic." rest="Both live, both complete." />
          </h2>
          <p className="max-w-[28rem] text-body text-mist lg:col-span-4 lg:col-start-9">{study.bilingual.note}</p>
        </div>
        <div className="mt-12 grid items-end gap-6 md:mt-16 sm:grid-cols-[minmax(0,1fr)_minmax(0,0.36fr)] lg:gap-10">
          <div data-reveal="media" className="media-frame-dark aspect-[16/10]">
            <Image src={study.bilingual.secondary.src} alt={study.bilingual.secondary.alt} fill sizes="(min-width: 1024px) 66vw, 94vw" className="object-cover object-top" />
          </div>
          <div data-reveal="media" className="mx-auto w-[60%] sm:w-full">
            <div className="media-frame-dark aspect-[780/1688] !rounded-[14px]">
              <Image src={study.bilingual.mobile.src} alt={study.bilingual.mobile.alt} fill sizes="(min-width: 640px) 24vw, 60vw" className="object-cover object-top" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function NextProject({ project }: { project: Project }) {
  return (
    <nav aria-label="Next project" data-header="light" className="bg-white text-navy">
      <Container className="py-16 md:py-24">
        <Link href={projectHref(project.slug)} className="group grid gap-y-6 md:grid-cols-12 md:items-center md:gap-x-10">
          <div className="md:col-span-5">
            <p className="text-label text-muted uppercase">Next project</p>
            <p className="mt-3 flex items-center gap-3 text-h2">
              {project.name}
              <ArrowRight aria-hidden="true" className="size-7 shrink-0 transition-transform hover-ease group-hover:translate-x-[4px]" strokeWidth={1.75} />
            </p>
            <p className="mt-3 max-w-[26rem] text-body text-muted">{project.summary}</p>
          </div>
          <div className="media-frame aspect-[16/9] md:col-span-6 md:col-start-7">
            <Image
              src={project.media.desktop.src}
              alt=""
              fill
              sizes="(min-width: 768px) 46vw, 94vw"
              className={`object-cover ${coverPosition(project.media.desktop)} transition-[filter] hover-ease group-hover:brightness-[1.04]`}
            />
          </div>
        </Link>
      </Container>
    </nav>
  );
}
