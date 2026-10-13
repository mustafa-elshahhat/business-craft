import { ButtonLink, TextLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Facet } from "@/components/ui/facet";
import { getFeaturedProject } from "@/content/projects";
import { services } from "@/content/services";
import { primaryCta, secondaryCta, siteConfig } from "@/lib/site";

import { HeroVisual } from "./hero-visual";

const showcase = getFeaturedProject("soulmate-gift-store");

/**
 * Editorial hero. The H1 is the composition: its first two lines run the
 * full measure, the last two sit beside the work, which starts under line
 * two and bleeds off the right edge (desktop). Below lg the type comes
 * first and the work follows.
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="hero-scale relative bg-navy text-white">
      <Container className="relative pt-8 pb-20 md:pt-12 lg:pt-10 lg:pb-28">
        <p className="enter-fade flex items-center gap-3 text-[0.75rem] font-medium tracking-[0.16em] text-white/60 uppercase">
          <Facet className="size-2" />
          {siteConfig.descriptor}
        </p>

        <div className="mt-8 grid lg:mt-10 lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-10">
          <h1
            id="hero-title"
            className="text-[length:var(--hero-fs)] leading-[var(--hero-lh)] font-bold tracking-[-0.045em] text-balance lg:col-span-12 lg:col-start-1 lg:row-start-1 lg:text-wrap"
          >
            <span className="enter-line">
              <span>
                Websites, <span className="whitespace-nowrap">E-commerce,</span>
              </span>
            </span>
            <span className="enter-line">
              <span>
                Systems &amp; <span className="whitespace-nowrap">Mobile Apps</span>
              </span>
            </span>
            <span className="enter-line">
              <span>
                That <span className="text-accent">Grow</span>
              </span>
            </span>
            <span className="enter-line">
              <span className="text-accent">Your Business</span>
            </span>
          </h1>

          {/* Work: starts below the second headline line on desktop */}
          <div className="order-last mt-14 sm:mt-16 lg:order-none lg:col-span-4 lg:col-start-9 lg:row-span-2 lg:row-start-1 lg:mt-[calc(var(--hero-fs)*var(--hero-lh)*2+2.25rem)] xl:col-span-5 xl:col-start-8">
            <HeroVisual project={showcase} />
          </div>

          <div className="enter-fade mt-8 sm:max-w-[34rem] lg:col-span-5 lg:col-start-1 lg:row-start-2 lg:mt-12 xl:col-span-4">
            <p className="text-[1.0625rem] leading-relaxed text-white/70 md:text-lg">
              We design and build digital products that help businesses sell more, work smarter and grow faster.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
              <ButtonLink href={primaryCta.href} arrow>
                {primaryCta.label}
              </ButtonLink>
              <TextLink href={secondaryCta.href} tone="dark">
                {secondaryCta.label}
              </TextLink>
            </div>
          </div>
        </div>
      </Container>

      {/* Capability rail: typography and rules, not buttons */}
      <Container>
        <div className="grid grid-cols-2 border-t border-line-dark lg:grid-cols-[minmax(0,1fr)_repeat(4,minmax(0,1.25fr))]">
          <h2 className="col-span-2 py-5 text-[0.6875rem] font-medium tracking-[0.18em] text-white/55 uppercase lg:col-span-1 lg:py-7">
            What we build
          </h2>
          <ul className="contents">
            {services.map((service, index) => (
              <li
                key={service.slug}
                className={`flex items-center gap-3 border-t border-line-dark py-5 text-[0.9375rem] font-medium tracking-[-0.01em] text-white/85 md:text-base lg:border-t-0 lg:border-l lg:py-7 lg:pl-6 ${
                  index % 2 === 1 ? "border-l pl-5" : ""
                }`}
              >
                <Facet className="size-1.5" />
                {service.label}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
