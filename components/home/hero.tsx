import Link from "next/link";

import { ButtonLink, TextLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { getFeaturedProject } from "@/content/projects";
import { serviceHref, services } from "@/content/services";
import { primaryCta, secondaryCta, siteConfig } from "@/lib/site";

import { HeroVisual } from "./hero-visual";

const showcase = getFeaturedProject("zts-fashion");

/** Dividers: 2×2 on mobile/tablet, one row on desktop. */
const capabilityCell = ["", "border-l pl-5 sm:pl-8", "border-t", "border-l border-t pl-5 sm:pl-8"];
const capabilityCellLg = ["lg:pl-0", "lg:pl-8", "lg:border-t-0 lg:border-l lg:pl-8", "lg:border-t-0 lg:pl-8"];

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="bg-navy text-white">
      <Container className="grid gap-y-12 pt-10 pb-28 md:pt-16 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-16 lg:pt-20 lg:pb-32">
        <div className="animate-rise lg:col-span-12">
          <p className="flex items-center gap-3 text-eyebrow uppercase text-white/70">
            <span aria-hidden="true" className="h-px w-8 bg-accent" />
            {siteConfig.descriptor}
          </p>
          {/* Deliberate desktop line breaks; natural wrapping below lg. */}
          <h1 id="hero-title" className="hero-title mt-8 max-w-[14ch] lg:max-w-none">
            <span className="lg:block">
              Websites, <span className="whitespace-nowrap">E-commerce,</span> Systems
            </span>{" "}
            <span className="lg:block">&amp; Mobile Apps That</span>{" "}
            <span className="text-accent lg:block">Grow Your Business</span>
          </h1>
        </div>

        <div className="animate-rise [animation-delay:100ms] lg:col-span-4">
          <p className="max-w-[31rem] text-lead text-white/70">
            We design and build digital products that help businesses sell more, work smarter and grow faster.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <ButtonLink href={primaryCta.href} arrow>
              {primaryCta.label}
            </ButtonLink>
            <TextLink href={secondaryCta.href} tone="dark">
              {secondaryCta.label}
            </TextLink>
          </div>
        </div>

        <div className="animate-rise [animation-delay:200ms] lg:col-span-8">
          <HeroVisual project={showcase} />
        </div>
      </Container>

      {/* Capability strip: replaces the unverified stats in the concept art. */}
      <div className="border-t border-line-dark">
        <Container>
          <h2 className="sr-only">What we build</h2>
          <ul className="grid grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <li key={service.slug} className={`border-line-dark ${capabilityCell[index]} ${capabilityCellLg[index]}`}>
                <Link
                  href={serviceHref(service.slug)}
                  className="group flex min-h-20 items-center gap-3 py-7 lg:min-h-24 lg:py-9"
                >
                  <span aria-hidden="true" className="size-1 rounded-full bg-accent" />
                  <span className="relative text-base font-medium tracking-[-0.01em] text-white/85 transition-colors duration-300 group-hover:text-white sm:text-lg after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-300 group-hover:after:scale-x-100">
                    {service.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </section>
  );
}
