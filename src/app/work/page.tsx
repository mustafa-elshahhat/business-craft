import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { MotionObserver } from "@/components/layout/motion-observer";
import { ClosingCta } from "@/components/sections/closing-cta";
import { PageHero } from "@/components/sections/page-hero";
import { TextLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Label } from "@/components/ui/section-heading";
import { SpecSheet } from "@/components/ui/spec-sheet";
import { caseStudies } from "@/data/case-studies";
import { projectHost, projectHref, projects, systemProjects } from "@/data/projects";
import { DevicePair } from "@/features/projects/device-pair";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Work",
  description:
    "Selected work by Business Craft: live online stores and websites in English and Arabic, including ZTS Fashion, Dermiva Skincare, Soulmate Gift Store, Dr Mirror and Saad Logistic.",
  path: "/work",
});

/**
 * Layout per chapter: the first is the full-width feature, the rest
 * alternate sides at different scales so the page reads as curated.
 */
const layouts = [
  { media: "lg:col-span-12", text: "lg:col-span-12 lg:grid lg:grid-cols-12 lg:gap-x-10", wide: true },
  { media: "lg:col-span-7", text: "lg:col-span-4 lg:col-start-9" },
  { media: "lg:col-span-7 lg:col-start-6 lg:order-2", text: "lg:col-span-4 lg:col-start-1 lg:order-1" },
  { media: "lg:col-span-8", text: "lg:col-span-3 lg:col-start-10" },
  { media: "lg:col-span-6 lg:col-start-7 lg:order-2", text: "lg:col-span-4 lg:col-start-1 lg:order-1" },
];

export default function WorkPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Work", href: "/work" }]}
        title="Selected Work."
        rest="Live projects, in English and Arabic."
        lead="Online stores and websites we have designed and built for real businesses. Every screen on this page is a capture of the live site."
      />

      <section aria-label="Projects" data-header="light" className="bg-white text-navy">
        <Container className="py-16 md:py-28 lg:py-36">
          <ol className="space-y-24 md:space-y-32 lg:space-y-40">
            {projects.map((project, index) => {
              const { slug } = project;
              const study = caseStudies[slug];
              const layout = layouts[index % layouts.length];
              return (
                <li key={slug}>
                  <article
                    aria-labelledby={`${slug}-title`}
                    className="group relative grid gap-y-8 lg:grid-cols-12 lg:items-center lg:gap-x-10"
                  >
                    <div data-reveal="media" className={layout.media}>
                      <DevicePair
                        desktop={project.media.desktop}
                        mobile={project.media.mobile}
                        tone="light"
                        sizes={layout.wide ? "(min-width: 1376px) 1280px, 94vw" : "(min-width: 1024px) 60vw, 94vw"}
                      />
                    </div>
                    <div className={layout.text}>
                      <div className={layout.wide ? "lg:col-span-5" : ""}>
                        <Label>
                          {project.category}
                          {project.bilingual ? " · English and Arabic" : ""}
                        </Label>
                        <h2 id={`${slug}-title`} className="mt-3 text-h3">
                          <Link href={projectHref(slug)} className="outline-none after:absolute after:inset-0 after:content-[''] focus-visible:underline">
                            {project.name}
                          </Link>
                        </h2>
                      </div>
                      <div className={layout.wide ? "lg:col-span-5 lg:col-start-8" : ""}>
                        <p className="mt-4 max-w-[30rem] text-body text-muted lg:mt-4">{study.context}</p>
                        <p className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-1 text-[0.9375rem] font-[540]">
                          <span className="inline-flex min-h-11 items-center gap-2 underline decoration-navy/30 underline-offset-[6px] transition-[text-decoration-color] hover-ease group-hover:decoration-navy">
                            View case study
                          </span>
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative z-10 inline-flex min-h-11 items-center gap-1 text-muted transition-colors hover-ease hover:text-navy"
                          >
                            {projectHost(project)}
                            <ArrowUpRight aria-hidden="true" className="size-3.5" strokeWidth={2} />
                            <span className="sr-only"> (opens the live site in a new tab)</span>
                          </a>
                        </p>
                      </div>
                    </div>
                  </article>
                </li>
              );
            })}
          </ol>
        </Container>
      </section>

      <section aria-labelledby="systems-title" data-header="light" className="bg-light text-navy">
        <Container className="py-16 md:py-24">
          <div className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-10">
            <div className="lg:col-span-4">
              <h2 id="systems-title" className="text-h3">
                Business systems
              </h2>
              <p className="mt-4 max-w-[24rem] text-body text-muted">
                Internal software built for clients. Screens carry client branding and data, so they are not published.
              </p>
              <TextLink href="/services/business-systems" className="mt-3">
                About Business Systems
              </TextLink>
            </div>
            <div className="lg:col-span-8">
              <SpecSheet
                label="Business Systems"
                state={{ text: "In our portfolio", confirmed: true }}
                statement="Point of sale, records and reports."
                detail="Built for the counter and the back office."
                items={systemProjects.map((project) => project.name)}
              />
            </div>
          </div>
        </Container>
      </section>

      <ClosingCta lead="Have a project in mind?" rest="Let’s discuss what it needs." />
      <MotionObserver />
    </>
  );
}
