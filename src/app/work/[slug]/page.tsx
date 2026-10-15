import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { MotionObserver } from "@/components/layout/motion-observer";
import {
  CaseStudyBilingual,
  CaseStudyContext,
  CaseStudyFacts,
  CaseStudyGallery,
  CaseStudyHighlight,
  NextProject,
} from "@/components/sections/case-study";
import { ClosingCta } from "@/components/sections/closing-cta";
import { PageHero } from "@/components/sections/page-hero";
import { StorySection } from "@/components/sections/story-section";
import { caseStudies } from "@/data/case-studies";
import { getProject, projectHref } from "@/data/projects";
import { isProjectSlug, projectSlugs } from "@/data/slugs";
import { DevicePair } from "@/features/projects/device-pair";
import { pageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  if (!isProjectSlug(slug)) return {};
  const project = getProject(slug);
  return pageMetadata({
    title: project.name,
    description: `${project.name}: ${project.summary} Case study by Business Craft.`,
    path: projectHref(slug),
  });
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  if (!isProjectSlug(slug)) notFound();
  const project = getProject(slug);
  const study = caseStudies[slug];
  const next = getProject(projectSlugs[(projectSlugs.indexOf(slug) + 1) % projectSlugs.length]);

  return (
    <>
      <PageHero
        crumbs={[
          { label: "Work", href: "/work" },
          { label: project.name, href: projectHref(slug) },
        ]}
        title={`${project.name}.`}
        rest={`${study.service}, in ${study.languages.replace(" (right-to-left)", "")}.`}
        lead={project.summary}
        aside={<CaseStudyFacts project={project} study={study} />}
      >
        <DevicePair desktop={project.media.desktop} mobile={project.media.mobile} priority />
      </PageHero>

      <CaseStudyContext study={study} />
      {study.highlight.kind === "soulmate-builder" ? <StorySection inCaseStudy /> : <CaseStudyHighlight highlight={study.highlight} />}
      <CaseStudyGallery study={study} />
      <CaseStudyBilingual study={study} />
      <NextProject project={next} />

      <ClosingCta lead="Planning something similar?" rest="Let’s discuss your project." />
      <MotionObserver />
    </>
  );
}
