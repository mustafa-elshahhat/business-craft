import { ProjectCard } from "@/components/cards/project-card";
import { TextLink } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { featuredProjects, projectHref } from "@/content/projects";

export function FeaturedWork() {
  if (featuredProjects.length === 0) return null;

  return (
    <Section tone="navy" aria-labelledby="work-title">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
        <SectionHeading
          id="work-title"
          tone="dark"
          eyebrow="Featured work"
          title={
            <>
              Real Projects.
              <br />
              Real Results.
            </>
          }
          intro="A selection of online stores we have designed and built for real businesses."
          className="lg:col-span-8"
        />
        <div className="lg:col-span-4 lg:flex lg:justify-end lg:pb-1">
          <TextLink href="/work" tone="dark">
            See All Work
          </TextLink>
        </div>
      </div>

      {/* Mobile: horizontal scroll-snap row with a peek of the next card. */}
      <ul className="-mx-5 mt-10 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:-mx-6 sm:scroll-px-6 sm:px-6 md:mx-0 md:mt-12 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 md:pb-0 lg:mt-16 xl:grid-cols-4">
        {featuredProjects.map((project) => (
          <li key={project.slug} className="w-[82%] max-w-[22rem] shrink-0 snap-start md:w-auto md:max-w-none">
            <ProjectCard
              name={project.name}
              category={project.category}
              summary={project.summary}
              href={projectHref(project.slug)}
              image={project.images.desktop}
              sizes="(min-width: 1280px) 300px, (min-width: 768px) 46vw, 80vw"
            />
          </li>
        ))}
      </ul>
    </Section>
  );
}
