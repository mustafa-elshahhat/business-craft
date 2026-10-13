import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { TextLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { serviceHref, services } from "@/content/services";

/**
 * Editorial service index: numbered rows separated by rules instead of a
 * card grid. Each row is one link; hover shifts the title, draws the rule
 * and moves the arrow.
 */
export function ServicesSection() {
  return (
    <section aria-labelledby="services-title" className="bg-light py-24 text-navy md:py-28 lg:py-36">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="text-eyebrow uppercase text-action">Services</p>
            <h2 id="services-title" className="mt-5 max-w-[16ch] text-h2 text-balance">
              Built around the way your business actually works.
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="max-w-[34rem] text-lead text-muted">
              Four disciplines, one clear process: from a first website to the systems your team runs on.
            </p>
            <TextLink href="/services" className="mt-3">
              View All Services
            </TextLink>
          </div>
        </div>

        <ol className="mt-16 border-b border-line-strong lg:mt-24">
          {services.map((service, index) => (
            <li
              key={service.slug}
              className="group relative border-t border-line-strong has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-accent"
            >
              {/* Rule draws across on hover */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 -top-px h-px origin-left scale-x-0 bg-navy transition-transform duration-500 ease-out-soft group-hover:scale-x-100"
              />
              <div className="grid grid-cols-[3rem_1fr_auto] items-baseline gap-x-4 py-8 md:grid-cols-[4rem_1fr_auto] lg:grid-cols-12 lg:gap-x-10 lg:py-11">
                <span className="text-sm font-medium tabular-nums text-muted lg:col-span-1">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-index transition-transform duration-500 ease-out-soft group-hover:translate-x-2 lg:col-span-5">
                  <Link
                    href={serviceHref(service.slug)}
                    className="outline-none after:absolute after:inset-0 after:content-['']"
                  >
                    {service.title}
                  </Link>
                </h3>
                <ArrowRight
                  aria-hidden="true"
                  className="size-6 self-center text-navy transition-[transform,color] duration-500 ease-out-soft group-hover:translate-x-1.5 group-hover:text-action lg:order-last lg:col-span-1 lg:justify-self-end"
                  strokeWidth={1.5}
                />
                <p className="col-start-2 col-end-4 mt-3 max-w-[34rem] text-base leading-relaxed text-muted lg:col-span-5 lg:col-start-auto lg:mt-0">
                  {service.summary}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
