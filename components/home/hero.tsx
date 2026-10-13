import Link from "next/link";

import { ButtonLink, TextLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { getFeaturedProject, getProject, projectHost, projectHref } from "@/content/projects";
import { primaryCta, secondaryCta } from "@/lib/site";

import { LiveWork, type LiveProject } from "./live-work";

const live: LiveProject[] = ["zts-fashion", "dermiva-skincare", "soulmate-gift-store"].map((slug) => {
  const project = getFeaturedProject(slug);
  return {
    slug: project.slug,
    name: project.name,
    category: project.category ?? "",
    host: projectHost(project) ?? "",
    liveUrl: project.liveUrl ?? "",
    bilingual: project.bilingual ?? false,
    desktop: project.media.desktop,
    mobile: project.media.mobile ?? project.media.desktop,
  };
});

const proof = ["zts-fashion", "dermiva-skincare", "soulmate-gift-store", "dr-mirror", "saad-logistic"].map(getProject);

/**
 * Hero: two-tone headline, one action, and the live-work window cycling
 * through real captures of shipped stores. The proof line closes the chapter.
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" data-header="dark" className="bg-navy text-white">
      <Container className="pt-[calc(var(--header-h)+1.75rem)] md:pt-[calc(var(--header-h)+4rem)] xl:pt-[calc(var(--header-h)+4.5rem)]">
        <div className="grid gap-y-5 md:gap-y-8 xl:grid-cols-12 xl:items-end xl:gap-x-10">
          <h1 id="hero-title" className="text-h1 text-balance xl:col-span-8 xl:text-wrap">
            <span className="enter-line block" style={{ "--i": 0 } as React.CSSProperties}>
              Websites, <span className="whitespace-nowrap">E-commerce,</span>
            </span>
            <span className="enter-line block" style={{ "--i": 1 } as React.CSSProperties}>
              Systems &amp; Mobile Apps
            </span>
            <span className="enter-line block text-mist" style={{ "--i": 2 } as React.CSSProperties}>
              That Grow Your Business
            </span>
          </h1>

          <div className="enter-rise xl:col-span-4 xl:pb-1">
            <p className="max-w-[26rem] text-base leading-relaxed text-mist md:text-[1.0625rem]">
              We design and build digital products that help businesses sell more, work smarter and grow faster.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-1 md:mt-7 md:gap-x-7">
              <ButtonLink href={primaryCta.href} arrow>
                {primaryCta.label}
              </ButtonLink>
              <TextLink href={secondaryCta.href} tone="dark">
                {secondaryCta.label}
              </TextLink>
            </div>
          </div>
        </div>

        <div className="enter-window mt-8 md:mt-14 xl:mt-16">
          <LiveWork projects={live} />
        </div>

        {/* Live-project proof line */}
        <div className="mt-12 flex flex-col gap-3 border-t border-line-dark py-6 md:mt-14 lg:flex-row lg:items-center lg:gap-10">
          <h2 className="shrink-0 text-label text-mist uppercase">Live projects</h2>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-1">
            {proof.map((project) => (
              <li key={project.slug}>
                <Link
                  href={projectHref(project.slug)}
                  className="inline-flex min-h-11 items-center text-[0.9375rem] text-white/80 transition-colors hover-ease hover:text-white"
                >
                  {project.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
