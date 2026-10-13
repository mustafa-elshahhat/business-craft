import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { featuredProjects } from "@/content/projects";
import Link from "next/link";

import { serviceHref, services } from "@/content/services";
import { primaryCta, secondaryCta, siteConfig } from "@/lib/site";

import { HeroVisual } from "./hero-visual";

const showcase = featuredProjects[0];

/** Dividers for a 2×2 grid on mobile/tablet and a single row on desktop. */
const capabilityCell = [
  "lg:pl-0",
  "border-l pl-6",
  "border-t lg:border-t-0 lg:border-l",
  "border-l border-t pl-6 lg:border-t-0",
];

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="overflow-hidden bg-navy text-white">
      <Container className="grid items-center gap-14 pt-10 pb-16 md:pt-14 md:pb-20 lg:grid-cols-12 lg:gap-10 lg:pt-16 lg:pb-24">
        <div className="animate-rise lg:col-span-6">
          <p className="inline-flex rounded-full border border-accent/45 px-3 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-accent sm:px-3.5 sm:text-[0.75rem] sm:tracking-[0.14em]">
            {siteConfig.descriptor}
          </p>
          <h1 id="hero-title" className="mt-6 text-display text-balance">
            Websites, <span className="whitespace-nowrap">E-commerce,</span> Systems &amp; Mobile Apps That{" "}
            <span className="text-accent">Grow Your Business</span>
          </h1>
          <p className="mt-6 max-w-[34rem] text-lead text-white/70">
            We design and build digital products that help businesses sell more, work smarter and grow faster.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={primaryCta.href} arrow>
              {primaryCta.label}
            </ButtonLink>
            <ButtonLink href={secondaryCta.href} variant="secondary-dark">
              {secondaryCta.label}
            </ButtonLink>
          </div>
        </div>

        {showcase ? (
          <div className="animate-rise mx-auto w-full max-w-2xl [animation-delay:120ms] lg:col-span-6 lg:max-w-none">
            <HeroVisual
              name={showcase.name}
              liveUrl={showcase.liveUrl}
              desktop={showcase.images.desktop}
              mobile={showcase.images.mobile}
            />
          </div>
        ) : null}
      </Container>

      {/* Capability row: replaces the unverified stats in the concept art. */}
      <div className="border-t border-line-dark">
        <Container>
          <h2 className="sr-only">What we build</h2>
          <ul className="grid grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <li key={service.slug} className={`border-line-dark lg:pl-8 ${capabilityCell[index]}`}>
                <Link
                  href={serviceHref(service.slug)}
                  className="flex min-h-20 items-center gap-3 text-[1.0625rem] font-semibold tracking-[-0.01em] text-white transition-colors duration-300 hover:text-white/75 lg:min-h-24"
                >
                  <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
                  {service.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </section>
  );
}
