import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PagePlaceholder, placeholderMetadata } from "@/components/page-placeholder";
import { projects } from "@/content/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

function findProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const project = findProject((await params).slug);
  return project ? { title: project.name, ...placeholderMetadata } : {};
}

export default async function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  const project = findProject((await params).slug);
  if (!project) notFound();

  return (
    <PagePlaceholder eyebrow={project.category ?? "Case study"} title={project.name}>
      {project.summary ? <p>{project.summary}</p> : null}
      {project.liveUrl ? (
        <p>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-white underline decoration-white/40 underline-offset-4 hover:decoration-white"
          >
            Visit the live site
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </p>
      ) : null}
    </PagePlaceholder>
  );
}
