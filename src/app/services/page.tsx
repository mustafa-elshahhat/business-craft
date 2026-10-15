import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { MotionObserver } from "@/components/layout/motion-observer";
import { ClosingCta } from "@/components/sections/closing-cta";
import { PageHero } from "@/components/sections/page-hero";
import { ProcessSection } from "@/components/sections/process-section";
import { ServiceOverviewProof } from "@/components/sections/service-proof";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Label, TwoTone } from "@/components/ui/section-heading";
import { primaryCta } from "@/data/navigation";
import { serviceHref, services } from "@/data/services";
import type { ServiceSlug } from "@/data/slugs";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Services",
  description:
    "Websites, e-commerce stores, business systems and mobile apps, designed and built by Business Craft around how your business works.",
  path: "/services",
});

/** "Where to start": the need each service answers. */
const needs: Record<ServiceSlug, string> = {
  websites: "Be found, be credible and get enquiries",
  "e-commerce": "Sell products online, in one language or two",
  "business-systems": "Run sales, stock and records in one place",
  "mobile-apps": "Give customers or staff an app for a specific job",
};

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
              {services.map((service) => {
                return (
                  <li key={service.slug} className="border-b border-line">
                    <Link
                      href={`#${service.slug}`}
                      className="group flex min-h-16 flex-col justify-center gap-1 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
                    >
                      <span className="text-[1.0625rem] text-navy">{needs[service.slug]}</span>
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
                    <ServiceOverviewProof service={service} />
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <ProcessSection
        lead="How we work."
        rest="The same four steps, whatever we build."
        text="Scope and plan are agreed before design starts, and you see progress throughout."
      />

      <ClosingCta lead="Not sure which service fits?" rest="Tell us what you need to achieve." />
      <MotionObserver />
    </>
  );
}
