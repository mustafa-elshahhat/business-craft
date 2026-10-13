import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ClosingCta } from "@/components/sections/closing-cta";
import { MotionObserver } from "@/components/sections/motion-observer";
import { PageHero } from "@/components/sections/page-hero";
import { ButtonLink, TextLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { TwoTone } from "@/components/ui/section-heading";
import { principles, standards } from "@/content/company";
import { getFeaturedProject, projectHref } from "@/content/projects";
import { serviceHref, services } from "@/content/services";
import { pageMetadata } from "@/lib/metadata";
import { primaryCta } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "Business Craft is a digital solutions studio building websites, e-commerce stores, business systems and mobile apps for real businesses.",
  path: "/about",
});

/** Column dividers for the 2-up (sm) and 3-up (lg) standards grid. */
function dividers(index: number) {
  const sm = index % 2 === 1;
  const lg = index % 3 !== 0;
  if (sm && lg) return "sm:border-l sm:pl-8";
  if (sm) return "sm:border-l sm:pl-8 lg:border-l-0 lg:pl-0";
  if (lg) return "lg:border-l lg:pl-8";
  return "";
}

const work = ["zts-fashion", "soulmate-gift-store", "dr-mirror"].map(getFeaturedProject);

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "About", href: "/about" }]}
        title="A digital solutions studio for real businesses."
        rest="Websites, stores, systems and apps."
        lead="Business Craft designs and builds the digital products businesses run on: from the site customers find first to the systems a team uses every day."
        actions={
          <ButtonLink href={primaryCta.href} arrow>
            {primaryCta.label}
          </ButtonLink>
        }
      />

      {/* Position: one studio across four disciplines */}
      <section aria-labelledby="what-title" data-header="light" className="bg-white text-navy">
        <Container className="py-16 md:py-28 lg:py-36">
          <div className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-10">
            <h2 id="what-title" data-reveal className="max-w-[16ch] text-h2 lg:col-span-5">
              <TwoTone lead="One team, from first plan to launch." rest="Across four disciplines." />
            </h2>
            <div className="lg:col-span-6 lg:col-start-7">
              <p className="text-lead text-navy">
                Most businesses need more than one kind of digital product. A website brings customers in, a store sells,
                and internal systems keep the work moving. <span className="text-muted">We build all of them, so they fit together.</span>
              </p>
              <ul className="mt-10 border-t border-line">
                {services.map((service) => (
                  <li key={service.slug} className="border-b border-line">
                    <Link href={serviceHref(service.slug)} className="group grid min-h-16 gap-y-1 py-4 sm:grid-cols-[12rem_1fr_auto] sm:items-baseline sm:gap-x-6">
                      <span className="text-[1.125rem] font-[540] tracking-[-0.01em]">{service.title}</span>
                      <span className="text-[0.9375rem] text-muted">{service.summary}</span>
                      <ArrowRight aria-hidden="true" className="hidden size-4 text-muted transition-[transform,color] hover-ease group-hover:translate-x-[3px] group-hover:text-navy sm:block" strokeWidth={2} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Real work as the evidence */}
      <section aria-labelledby="evidence-title" data-header="light" className="bg-light text-navy">
        <Container className="py-16 md:py-28 lg:py-36">
          <div className="grid gap-y-6 lg:grid-cols-12 lg:items-end lg:gap-x-10">
            <h2 id="evidence-title" data-reveal className="max-w-[18ch] text-h2 lg:col-span-7">
              <TwoTone lead="Judge us by the work." rest="Live stores, in English and Arabic." />
            </h2>
            <div className="lg:col-span-4 lg:col-start-9">
              <TextLink href="/work">See All Work</TextLink>
            </div>
          </div>
          <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-12 md:gap-8">
            {work.map((project, index) => (
              <Link
                key={project.slug}
                href={projectHref(project.slug)}
                className={`group block ${index === 0 ? "md:col-span-7" : index === 1 ? "md:col-span-5 md:mt-16" : "md:col-span-6 md:col-start-4"}`}
              >
                <div data-reveal="media" className="media-frame aspect-[16/10]">
                  <Image
                    src={project.media.desktop.src}
                    alt={project.media.desktop.alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 94vw"
                    className={`object-cover ${project.slug === "dr-mirror" ? "object-right-top" : "object-left-top"} transition-[filter] hover-ease group-hover:brightness-[1.04]`}
                  />
                </div>
                <p className="mt-3 flex items-baseline justify-between gap-4">
                  <span className="text-[1.125rem] font-[540]">{project.name}</span>
                  <span className="text-label text-muted uppercase">{project.category}</span>
                </p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Principles */}
      <section aria-labelledby="principles-title" data-header="light" className="bg-white text-navy">
        <Container className="py-16 md:py-28 lg:py-36">
          <div className="grid gap-y-8 lg:grid-cols-12 lg:gap-x-10">
            <h2 id="principles-title" data-reveal className="max-w-[12ch] text-h2 lg:sticky lg:top-[calc(var(--header-h)+3rem)] lg:col-span-5 lg:self-start">
              How we approach a project.
            </h2>
            <ul className="border-t border-line lg:col-span-6 lg:col-start-7">
              {principles.map((principle) => (
                <li key={principle.title} className="grid gap-y-2 border-b border-line py-7 sm:grid-cols-[13rem_1fr] sm:gap-x-8">
                  <h3 className="text-[1.125rem] font-[540] tracking-[-0.01em]">{principle.title}</h3>
                  <p className="text-[0.9375rem] leading-relaxed text-muted">{principle.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Standards + process on navy */}
      <section aria-labelledby="standards-title" data-header="dark" className="bg-navy text-white">
        <Container className="py-16 md:py-28 lg:py-36">
          <div className="grid gap-y-6 lg:grid-cols-12 lg:items-end lg:gap-x-10">
            <h2 id="standards-title" data-reveal className="max-w-[16ch] text-h2 lg:col-span-7">
              <TwoTone tone="dark" lead="The standard every project meets." rest="Whatever its size." />
            </h2>
          </div>
          <ul className="mt-12 grid border-t border-line-dark sm:grid-cols-2 md:mt-16 lg:grid-cols-3">
            {standards.map((standard, index) => (
              <li
                key={standard.title}
                className={`border-b border-line-dark py-7 sm:pr-8 ${dividers(index)}`}
              >
                <h3 className="text-[1.125rem] font-[540] tracking-[-0.01em]">{standard.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-mist">{standard.text}</p>
              </li>
            ))}
          </ul>

          <TextLink href="/services#process" tone="dark" className="mt-12">
            How We Work
          </TextLink>
        </Container>
      </section>

      <ClosingCta lead="Ready to Grow Your Business?" rest="Tell us what you want to build." />
      <MotionObserver />
    </>
  );
}
