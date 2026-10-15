import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { MotionObserver } from "@/components/layout/motion-observer";
import { ClosingCta } from "@/components/sections/closing-cta";
import { PageHero } from "@/components/sections/page-hero";
import { ServiceHeroMedia, ServiceProof } from "@/components/sections/service-proof";
import { ButtonLink, TextLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { JsonLd } from "@/components/ui/json-ld";
import { Label, TwoTone } from "@/components/ui/section-heading";
import { primaryCta } from "@/data/navigation";
import { getService, serviceHref, services } from "@/data/services";
import { isServiceSlug, type ServiceSlug } from "@/data/slugs";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  if (!isServiceSlug(slug)) return {};
  const service = getService(slug);
  return pageMetadata({ title: service.title, description: service.metaDescription, path: serviceHref(service.slug) });
}

const closing: Record<ServiceSlug, string> = {
  websites: "a new website",
  "e-commerce": "an online store",
  "business-systems": "a business system",
  "mobile-apps": "a mobile app",
};

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  if (!isServiceSlug(slug)) notFound();
  const service = getService(slug);
  const others = services.filter((item) => item.slug !== service.slug);

  return (
    <>
      {siteConfig.url ? (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Service",
            name: service.title,
            description: service.intro,
            url: `${siteConfig.url}${serviceHref(service.slug)}`,
            provider: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
          }}
        />
      ) : null}

      <PageHero
        crumbs={[
          { label: "Services", href: "/services" },
          { label: service.title, href: serviceHref(service.slug) },
        ]}
        title={service.headline.lead}
        rest={service.headline.rest}
        lead={service.intro}
        actions={
          <ButtonLink href={primaryCta.href} arrow>
            {primaryCta.label}
          </ButtonLink>
        }
      >
        <ServiceHeroMedia service={service} />
      </PageHero>

      {/* Who it is for, and the problems it solves */}
      <section aria-labelledby="fit-title" data-header="light" className="bg-light text-navy">
        <Container className="py-16 md:py-28 lg:py-36">
          <div className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-10">
            <div className="lg:col-span-4">
              <h2 id="fit-title" data-reveal className="text-h2">
                Who it’s for.
              </h2>
              <ul className="mt-8 border-t border-line">
                {service.audience.map((item) => (
                  <li key={item} className="border-b border-line py-3 text-[0.9375rem]">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <Label>{service.slug === "mobile-apps" ? "How we approach it" : "What it solves"}</Label>
              <ul className="mt-6 grid border-t border-line sm:grid-cols-2">
                {service.problems.map((problem, index) => (
                  <li key={problem.title} className={`border-b border-line py-7 ${index % 2 === 0 ? "sm:pr-8" : "sm:border-l sm:pl-8"}`}>
                    <h3 className="text-[1.125rem] font-[540] tracking-[-0.01em]">{problem.title}</h3>
                    <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{problem.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* What we build */}
      <section aria-labelledby="build-title" data-header="dark" className="bg-navy text-white">
        <Container className="py-16 md:py-28 lg:py-36">
          <div className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-10">
            <h2 id="build-title" data-reveal className="max-w-[12ch] text-h2 lg:col-span-5">
              <TwoTone tone="dark" lead="What we build." rest="Scoped to your project." />
            </h2>
            <ul className="border-t border-line-dark sm:columns-2 sm:gap-x-10 lg:col-span-7">
              {service.deliverables.map((item) => (
                <li key={item} className="flex break-inside-avoid items-baseline gap-3 border-b border-line-dark py-4 text-[1.0625rem]">
                  <span aria-hidden="true" className="size-1.5 shrink-0 translate-y-[-0.15em] rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <TextLink href="/services#process" tone="dark" className="mt-12">
            How We Work
          </TextLink>
        </Container>
      </section>

      <ServiceProof service={service} />

      {/* Other services */}
      <nav aria-label="Other services" data-header="light" className="bg-light text-navy">
        <Container className="py-12 md:py-16">
          <p className="text-label text-muted uppercase">Other services</p>
          <ul className="mt-4 grid border-t border-line sm:grid-cols-3">
            {others.map((other, index) => (
              <li key={other.slug} className={`border-b border-line ${index > 0 ? "sm:border-l sm:pl-6" : ""}`}>
                <Link href={serviceHref(other.slug)} className="group flex min-h-16 items-center justify-between gap-4 py-4 sm:pr-6">
                  <span className="text-[1.25rem] font-[540] tracking-[-0.015em]">{other.title}</span>
                  <ArrowRight aria-hidden="true" className="size-4 text-muted transition-[transform,color] hover-ease group-hover:translate-x-[3px] group-hover:text-navy" strokeWidth={2} />
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </nav>

      <ClosingCta lead={`Planning ${closing[service.slug]}?`} rest="Let’s discuss your project." />
      <MotionObserver />
    </>
  );
}
