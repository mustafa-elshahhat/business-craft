import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { featuredProjects } from "@/content/projects";
import { services } from "@/content/services";
import { primaryCta, secondaryCta, siteConfig } from "@/lib/site";

import { HeroVisual } from "./hero-visual";

const showcase = featuredProjects[0];

/** Dividers for a 2×2 grid on mobile/tablet and a single row on desktop. */
const capabilityCell = [
  "",
  "border-l pl-6",
  "border-t lg:border-t-0 lg:border-l",
  "border-l border-t pl-6 lg:border-t-0",
];

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="overflow-hidden bg-navy text-white">
      <Container className="grid items-center gap-14 pt-10 pb-16 md:pt-14 md:pb-20 lg:pb-24 xl:grid-cols-12 xl:gap-10 xl:pt-16">
        <div className="animate-rise xl:col-span-7">
          <p className="inline-flex rounded-full border border-accent/45 px-3.5 py-1.5 text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-accent">
            {siteConfig.descriptor}
          </p>
          <h1 id="hero-title" className="mt-6 max-w-[21ch] text-display text-pretty">
            Websites, <span className="whitespace-nowrap">E-commerce,</span> Systems &amp; Mobile Apps That{" "}
            <span className="text-accent">Grow Your Business</span>
          </h1>
          <p className="mt-6 max-w-[34rem] text-lead text-white/72 md:text-[1.1875rem]">
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
          <div className="animate-rise [animation-delay:120ms] max-w-3xl xl:col-span-5 xl:max-w-none">
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
              <li
                key={service.slug}
                className={`flex min-h-20 items-center gap-3 border-line-dark py-6 text-[1.0625rem] font-semibold tracking-[-0.01em] lg:min-h-24 lg:justify-center lg:pl-0 ${capabilityCell[index]}`}
              >
                <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
                {service.label}
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </section>
  );
}
