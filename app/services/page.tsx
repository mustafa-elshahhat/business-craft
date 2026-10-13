import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ClosingCta } from "@/components/sections/closing-cta";
import { PageHero } from "@/components/sections/page-hero";
import { ProcessTrack } from "@/components/sections/process-track";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Label, TwoTone } from "@/components/ui/section-heading";
import { processSteps } from "@/content/company";
import { getFeaturedProject, getProject } from "@/content/projects";
import { serviceHref, services, type Service } from "@/content/services";
import { pageMetadata } from "@/lib/metadata";
import { primaryCta } from "@/lib/site";
import { MotionObserver } from "@/components/sections/motion-observer";

export const metadata: Metadata = pageMetadata({
  title: "Services",
  description:
    "Websites, e-commerce stores, business systems and mobile apps, designed and built by Business Craft around how your business works.",
  path: "/services",
});

/** "Where to start": common needs mapped to the service that answers them. */
const starts = [
  { need: "Be found, be credible and get enquiries", slug: "websites" },
  { need: "Sell products online, in one language or two", slug: "e-commerce" },
  { need: "Run sales, stock and records in one place", slug: "business-systems" },
  { need: "Give customers or staff an app for a specific job", slug: "mobile-apps" },
] as const;


/** The visual side of each chapter: real work where it exists, type where it does not. */
function Proof({ service }: { service: Service }) {
  if (service.slug === "websites") {
    const saad = getFeaturedProject("saad-logistic");
    return (
      <figure>
        <div className="media-frame aspect-[16/10]">
          <Image src={saad.media.desktop.src} alt={saad.media.desktop.alt} fill sizes="(min-width: 1024px) 50vw, 92vw" className="object-cover object-top" />
        </div>
        <figcaption className="mt-3 text-[0.8125rem] text-muted">
          <span className="font-[540] text-navy">Saad Logistic</span> · company website in Arabic and English
        </figcaption>
      </figure>
    );
  }
  if (service.slug === "e-commerce") {
    const soulmate = getFeaturedProject("soulmate-gift-store");
    return (
      <figure>
        <div className="media-frame aspect-[16/10]">
          <Image src={soulmate.media.desktop.src} alt={soulmate.media.desktop.alt} fill sizes="(min-width: 1024px) 50vw, 92vw" className="object-cover object-top" />
        </div>
        <figcaption className="mt-3 text-[0.8125rem] text-muted">
          <span className="font-[540] text-navy">Soulmate Gift Store</span> · one of four live stores, all in English and Arabic
        </figcaption>
      </figure>
    );
  }
  if (service.slug === "business-systems") {
    return (
      <div className="rounded-[12px] bg-navy p-6 text-white sm:p-10">
        <p className="text-label text-mist uppercase">Systems in our portfolio</p>
        <ul className="mt-6 border-t border-line-dark">
          {service.proof.map(getProject).map((project) => (
            <li key={project.slug} className="border-b border-line-dark py-5">
              <span className="block text-[1.5rem] leading-tight font-[540] tracking-[-0.02em]">{project.name}</span>
              <span className="mt-1 block text-[0.875rem] text-mist">{project.summary}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  return (
    <div className="rounded-[12px] bg-navy p-6 text-white sm:p-10">
      <p className="text-label text-mist uppercase">How we approach apps</p>
      <p className="mt-6 max-w-[20ch] text-[clamp(1.5rem,1.1rem+1.4vw,2.25rem)] leading-[1.12] font-[540] tracking-[-0.025em]">
        One clear use case first. <span className="text-mist">Everything else follows from it.</span>
      </p>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Services", href: "/services" }]}
        title="Digital solutions built around your business."
        rest="Four disciplines, one process."
        lead="Websites, online stores, internal systems and mobile apps. Each one planned around what your business needs to do, then designed and built by the same team."
        actions={
          <ButtonLink href={primaryCta.href} arrow>
            {primaryCta.label}
          </ButtonLink>
        }
      />

      {/* Where to start: needs → service */}
      <section aria-labelledby="start-title" data-header="light" className="bg-white text-navy">
        <Container className="py-16 md:py-24">
          <div className="grid gap-y-8 lg:grid-cols-12 lg:gap-x-10">
            <div className="lg:col-span-4">
              <Label>Where to start</Label>
              <h2 id="start-title" className="mt-4 max-w-[14ch] text-h3">
                What do you need your business to do?
              </h2>
            </div>
            <ul className="border-t border-line lg:col-span-8">
              {starts.map((start) => {
                const service = services.find((item) => item.slug === start.slug)!;
                return (
                  <li key={start.slug} className="border-b border-line">
                    <Link
                      href={`#${service.slug}`}
                      className="group flex min-h-16 flex-col justify-center gap-1 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
                    >
                      <span className="text-[1.0625rem] text-navy">{start.need}</span>
                      <span className="inline-flex items-center gap-2 text-[0.9375rem] font-[540] text-action">
                        {service.title}
                        <ArrowRight aria-hidden="true" className="size-4 rotate-90 transition-transform hover-ease group-hover:translate-y-[3px]" strokeWidth={2} />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </Container>
      </section>

      {/* One chapter per service, alternating sides */}
      <section aria-label="Our services" data-header="light" className="bg-light text-navy">
        <Container className="py-16 md:py-28 lg:py-36">
          <div className="space-y-24 md:space-y-32 lg:space-y-40">
            {services.map((service, index) => {
              const flip = index % 2 === 1;
              return (
                <article
                  key={service.slug}
                  id={service.slug}
                  aria-labelledby={`${service.slug}-title`}
                  className="scroll-mt-24 grid gap-y-10 lg:grid-cols-12 lg:items-center lg:gap-x-10"
                >
                  <div className={`lg:col-span-5 ${flip ? "lg:order-2 lg:col-start-8" : ""}`}>
                    <h2 id={`${service.slug}-title`} data-reveal className="text-h2">
                      {service.title}
                    </h2>
                    <p className="mt-5 text-lead text-navy">
                      <TwoTone lead={service.headline.lead} rest={service.headline.rest} />
                    </p>
                    <ul className="mt-8 border-t border-line">
                      {service.deliverables.slice(0, 3).map((item) => (
                        <li key={item} className="border-b border-line py-2.5 text-[0.9375rem]">
                          {item}
                        </li>
                      ))}
                    </ul>
                    <ButtonLink href={serviceHref(service.slug)} variant="secondary-light" arrow className="mt-8">
                      Explore {service.title}
                    </ButtonLink>
                  </div>
                  <div data-reveal="media" className={`lg:col-span-6 ${flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-7"}`}>
                    <Proof service={service} />
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section id="process" aria-labelledby="process-title" data-header="dark" className="scroll-mt-16 bg-navy text-white">
        <Container className="py-16 md:py-28 lg:py-36">
          <div className="grid gap-y-6 lg:grid-cols-12 lg:items-end lg:gap-x-10">
            <h2 id="process-title" data-reveal className="max-w-[18ch] text-h2 lg:col-span-7">
              <TwoTone tone="dark" lead="How we work." rest="The same four steps, whatever we build." />
            </h2>
            <p className="max-w-[26rem] text-body text-mist lg:col-span-4 lg:col-start-9">
              Scope and plan are agreed before design starts, and you see progress throughout.
            </p>
          </div>
          <ProcessTrack steps={processSteps} className="mt-12 md:mt-16 lg:mt-24" />
        </Container>
      </section>

      <ClosingCta lead="Not sure which service fits?" rest="Tell us what you need to achieve." />
      <MotionObserver />
    </>
  );
}
