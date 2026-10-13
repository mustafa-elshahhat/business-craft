import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { TextLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { getFeaturedProject, projectHref, type FeaturedProject } from "@/content/projects";

/**
 * Featured work: a navy title band, then large editorial showcases on white.
 * The first showcase is pulled up across the navy/white boundary. Layouts
 * alternate and sizes are deliberately unequal.
 */
const features = [
  { project: getFeaturedProject("soulmate-gift-store"), align: "start" },
  { project: getFeaturedProject("dermiva-skincare"), align: "end" },
] as const;

const pair = [getFeaturedProject("zts-fashion"), getFeaturedProject("dr-mirror")] as const;

const mediaFrame = "relative overflow-hidden bg-light outline outline-1 -outline-offset-1 outline-navy/10";
const mediaImage = "object-cover object-top transition-transform duration-700 ease-out-soft group-hover:scale-[1.015]";
const articleFocus =
  "has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-8 has-[a:focus-visible]:outline-accent";

function ProjectMeta({
  project,
  index,
  className = "",
}: {
  project: FeaturedProject;
  index: number;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="flex items-center gap-3 text-sm text-muted">
        <span className="font-semibold tabular-nums text-navy">{String(index).padStart(2, "0")}</span>
        <span aria-hidden="true" className="h-px w-6 bg-line-strong" />
        {project.category}
      </p>
      <h3 className="mt-4 text-[clamp(1.75rem,1.25rem+1.7vw,2.75rem)] leading-[1.05] font-semibold tracking-[-0.03em]">
        <Link href={projectHref(project.slug)} className="outline-none after:absolute after:inset-0 after:content-['']">
          {project.name}
        </Link>
      </h3>
      <p className="mt-4 max-w-[28rem] text-base leading-relaxed text-muted">{project.summary}</p>
      <span
        aria-hidden="true"
        className="mt-6 inline-flex items-center gap-2 text-[0.9375rem] font-semibold underline decoration-navy/30 decoration-1 underline-offset-[6px] transition-[text-decoration-color] duration-300 group-hover:decoration-navy"
      >
        View Project
        <ArrowRight className="size-4 transition-transform duration-300 ease-out-soft group-hover:translate-x-1" strokeWidth={2} />
      </span>
    </div>
  );
}

function FeatureShowcase({ project, index, align }: { project: FeaturedProject; index: number; align: "start" | "end" }) {
  const { primary, detail } = project.media;
  const start = align === "start";

  return (
    <article className={`group relative grid gap-x-10 lg:grid-cols-12 ${articleFocus}`}>
      {/* Primary: runs to the viewport edge on its side */}
      <div
        className={`reveal lg:row-start-1 ${
          start ? "bleed-left lg:col-span-9 lg:col-start-1" : "bleed-right lg:col-span-9 lg:col-start-4"
        }`}
      >
        <div className={`${mediaFrame} aspect-[16/10] ${start ? "rounded-r-[4px]" : "rounded-l-[4px]"}`}>
          <Image src={primary.src} alt={primary.alt} fill sizes="(min-width: 1024px) 78vw, 100vw" className={mediaImage} />
        </div>
      </div>

      {/* Detail: overlaps the primary's inner bottom corner */}
      {detail ? (
        <div
          className={`reveal relative z-10 -mt-[14%] w-[82%] lg:row-start-1 lg:mt-0 lg:w-auto lg:translate-y-[46%] lg:self-end ${
            start ? "ml-auto lg:col-span-4 lg:col-start-6" : "mr-auto lg:col-span-5 lg:col-start-1"
          }`}
        >
          <div className={`${mediaFrame} rounded-[4px] ring-[8px] ring-white lg:ring-[12px]`}>
            <Image
              src={detail.src}
              alt={detail.alt}
              sizes="(min-width: 1024px) 40vw, 82vw"
              placeholder="blur"
              className="block h-auto w-full transition-transform duration-700 ease-out-soft group-hover:scale-[1.015]"
            />
          </div>
        </div>
      ) : null}

      {/* Meta sits in the free column beside the image (top-aligned below the navy band on the first) */}
      <ProjectMeta
        project={project}
        index={index}
        className={`mt-10 lg:row-start-1 lg:mt-0 lg:self-start ${
          start ? "lg:col-span-3 lg:col-start-10 lg:pt-56" : "lg:col-span-3 lg:col-start-1 lg:pt-6"
        }`}
      />
    </article>
  );
}

export function FeaturedWork() {
  const [zts, drMirror] = pair;

  return (
    <section aria-labelledby="work-title">
      <div className="bg-navy pt-24 pb-40 text-white md:pt-28 lg:pt-36 lg:pb-60">
        <Container className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="text-eyebrow uppercase text-accent">Selected work</p>
            <h2 id="work-title" className="mt-6 text-statement">
              Real Projects.
              <br />
              Real Results.
            </h2>
          </div>
          <div className="lg:col-span-3 lg:col-start-10">
            <p className="text-lead text-white/70">
              A selection of online stores we have designed and built for real businesses.
            </p>
            <TextLink href="/work" tone="dark" className="mt-3">
              See All Work
            </TextLink>
          </div>
        </Container>
      </div>

      <div className="bg-white pb-28 lg:pb-40">
        <Container className="relative -mt-28 space-y-28 md:-mt-32 lg:-mt-48 lg:space-y-44">
          {features.map((feature, i) => (
            <FeatureShowcase key={feature.project.slug} project={feature.project} index={i + 1} align={feature.align} />
          ))}

          {/* Unequal pair: a wide product-row crop and a tall page crop */}
          <div className="grid gap-y-24 pt-8 lg:grid-cols-12 lg:gap-x-10 lg:pt-24">
            <article className={`group relative lg:col-span-7 ${articleFocus}`}>
              {zts.media.detail ? (
                <div className={`reveal ${mediaFrame} rounded-[4px]`}>
                  <Image
                    src={zts.media.detail.src}
                    alt={zts.media.detail.alt}
                    sizes="(min-width: 1024px) 56vw, 100vw"
                    placeholder="blur"
                    className="block h-auto w-full transition-transform duration-700 ease-out-soft group-hover:scale-[1.015]"
                  />
                </div>
              ) : null}
              <ProjectMeta project={zts} index={3} className="mt-10" />
            </article>

            <article className={`group relative lg:col-span-4 lg:col-start-9 lg:mt-32 ${articleFocus}`}>
              <div className={`reveal ${mediaFrame} aspect-[4/5] rounded-[4px]`}>
                <Image
                  src={drMirror.media.primary.src}
                  alt={drMirror.media.primary.alt}
                  fill
                  sizes="(min-width: 1024px) 32vw, 100vw"
                  className="object-cover object-right-top transition-transform duration-700 ease-out-soft group-hover:scale-[1.015]"
                />
              </div>
              <ProjectMeta project={drMirror} index={4} className="mt-10" />
            </article>
          </div>
        </Container>
      </div>
    </section>
  );
}
