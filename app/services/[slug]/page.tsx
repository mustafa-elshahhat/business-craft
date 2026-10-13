import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { ClosingCta } from "@/components/sections/closing-cta";
import { DevicePair } from "@/components/sections/device-pair";
import { JsonLd } from "@/components/sections/json-ld";
import { MotionObserver } from "@/components/sections/motion-observer";
import { PageHero } from "@/components/sections/page-hero";
import { ButtonLink, TextLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Label, TwoTone } from "@/components/ui/section-heading";
import { SpecSheet } from "@/components/ui/spec-sheet";
import { getCaseStudy } from "@/content/case-studies";
import { getFeaturedProject, getProject, projectHref } from "@/content/projects";
import { getService, serviceHref, services, type Service } from "@/content/services";
import { pageMetadata } from "@/lib/metadata";
import { primaryCta, siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const service = getService((await params).slug);
  if (!service) return {};
  return pageMetadata({ title: service.title, description: service.metaDescription, path: serviceHref(service.slug) });
}

/** E-commerce capabilities shown beside the live store that proves each one. */
const commerceEvidence = [
  { capability: "Collections and filters", detail: "Size, colour, price and collection filters with sorting", projects: ["zts-fashion"] },
  { capability: "Search", detail: "Catalogue search with results as a product grid", projects: ["dermiva-skincare"] },
  { capability: "Variants with stock", detail: "Stock shown for each size and colour", projects: ["dr-mirror"] },
  { capability: "Personalisation", detail: "A gift box builder with optional names, date and message", projects: ["soulmate-gift-store"] },
  {
    capability: "English and Arabic",
    detail: "Right-to-left storefronts that mirror the full layout",
    projects: ["zts-fashion", "dermiva-skincare", "soulmate-gift-store", "dr-mirror"],
  },
] as const;

const closing: Record<Service["slug"], string> = {
  websites: "a new website",
  "e-commerce": "an online store",
  "business-systems": "a business system",
  "mobile-apps": "a mobile app",
};

function HeroMedia({ service }: { service: Service }) {
  if (service.slug === "websites") {
    const study = getCaseStudy("saad-logistic")!;
    return <DevicePair desktop={study.bilingual.secondary} mobile={study.bilingual.mobile} priority />;
  }
  if (service.slug === "e-commerce") {
    const dermiva = getCaseStudy("dermiva-skincare")!;
    return dermiva.highlight.kind === "pair" ? (
      <DevicePair desktop={dermiva.highlight.desktop} mobile={dermiva.highlight.mobile} priority />
    ) : null;
  }
  return null;
}

/** Real proof for the service; typographic where screens cannot be published. */
function ProofSection({ service }: { service: Service }) {
  if (service.slug === "e-commerce") {
    return (
      <section aria-labelledby="proof-title" data-header="light" className="bg-white text-navy">
        <Container className="py-16 md:py-28 lg:py-36">
          <div className="grid gap-y-6 lg:grid-cols-12 lg:items-end lg:gap-x-10">
            <h2 id="proof-title" data-reveal className="max-w-[20ch] text-h2 lg:col-span-7">
              <TwoTone lead="Every capability, shown in a live store." rest="Nothing here is a mock-up." />
            </h2>
          </div>
          {/* Small screens: the same evidence as a stacked list */}
          <ul className="mt-10 border-t border-line md:hidden">
            {commerceEvidence.map((row) => (
              <li key={row.capability} className="border-b border-line py-5">
                <p className="text-[1.0625rem] font-[540]">{row.capability}</p>
                <p className="mt-1 text-[0.9375rem] text-muted">{row.detail}</p>
                <p className="mt-1 flex flex-wrap gap-x-4">
                  {row.projects.map((slug) => (
                    <Link key={slug} href={projectHref(slug)} className="inline-flex min-h-11 items-center text-[0.9375rem] underline decoration-navy/25 underline-offset-4">
                      {getProject(slug).name}
                    </Link>
                  ))}
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-16 hidden md:block">
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">E-commerce capabilities and the live stores that show them</caption>
              <thead>
                <tr className="border-b border-line-strong text-label text-muted uppercase">
                  <th scope="col" className="py-3 pr-6 font-[500]">Capability</th>
                  <th scope="col" className="py-3 pr-6 font-[500]">What it looks like</th>
                  <th scope="col" className="py-3 font-[500]">Live in</th>
                </tr>
              </thead>
              <tbody>
                {commerceEvidence.map((row) => (
                  <tr key={row.capability} className="border-b border-line align-top">
                    <th scope="row" className="py-5 pr-6 text-[1.0625rem] font-[540]">
                      {row.capability}
                    </th>
                    <td className="py-5 pr-6 text-[0.9375rem] text-muted">{row.detail}</td>
                    <td className="py-4">
                      <ul className="flex flex-wrap gap-x-4">
                        {row.projects.map((slug) => (
                          <li key={slug}>
                            <Link
                              href={projectHref(slug)}
                              className="inline-flex min-h-11 items-center text-[0.9375rem] text-navy underline decoration-navy/25 underline-offset-4 transition-[text-decoration-color] hover-ease hover:decoration-navy"
                            >
                              {getProject(slug).name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-20 grid gap-y-14 md:mt-28 lg:grid-cols-12 lg:gap-x-10">
            {service.proof.map(getFeaturedProject).map((project, index) => (
              <article
                key={project.slug}
                className={`group relative has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-8 has-[a:focus-visible]:outline-accent ${
                  index % 2 === 0 ? "lg:col-span-6" : "lg:col-span-5 lg:col-start-8 lg:mt-24"
                }`}
              >
                <div className="media-frame aspect-[16/10]">
                  <Image
                    src={project.media.desktop.src}
                    alt={project.media.desktop.alt}
                    fill
                    sizes="(min-width: 1024px) 46vw, 92vw"
                    className={`object-cover ${project.slug === "dr-mirror" ? "object-right-top" : "object-left-top"} transition-[filter] hover-ease group-hover:brightness-[1.04]`}
                  />
                </div>
                <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-6">
                  <h3 className="text-[1.375rem] font-[540] tracking-[-0.015em]">
                    <Link href={projectHref(project.slug)} className="outline-none after:absolute after:inset-0 after:content-['']">
                      {project.name}
                    </Link>
                  </h3>
                  <p className="text-label text-muted uppercase">View case study</p>
                </div>
                <p className="mt-1 max-w-[30rem] text-[0.9375rem] text-muted">{project.summary}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>
    );
  }

  if (service.slug === "websites") {
    const saad = getFeaturedProject("saad-logistic");
    const study = getCaseStudy("saad-logistic")!;
    return (
      <section aria-labelledby="proof-title" data-header="light" className="bg-white text-navy">
        <Container className="py-16 md:py-28 lg:py-36">
          <div className="grid gap-y-10 lg:grid-cols-12 lg:items-end lg:gap-x-10">
            <div className="lg:col-span-4">
              <Label>Live project</Label>
              <h2 id="proof-title" data-reveal className="mt-4 text-h2">
                {saad.name}
              </h2>
              <p className="mt-5 text-body text-muted">{study.context}</p>
              <TextLink href={projectHref(saad.slug)} className="mt-4">
                View the Project
              </TextLink>
            </div>
            <figure data-reveal="media" className="lg:col-span-8">
              <div className="media-frame aspect-[16/10]">
                <Image
                  src={study.highlight.kind === "pair" ? study.highlight.desktop.src : saad.media.desktop.src}
                  alt={study.highlight.kind === "pair" ? study.highlight.desktop.alt : saad.media.desktop.alt}
                  fill
                  sizes="(min-width: 1024px) 62vw, 92vw"
                  className="object-cover object-top"
                />
              </div>
              <figcaption className="mt-3 text-[0.8125rem] text-muted">Services section of the English site</figcaption>
            </figure>
          </div>
        </Container>
      </section>
    );
  }

  if (service.slug === "business-systems") {
    return (
      <section aria-labelledby="proof-title" data-header="light" className="bg-white text-navy">
        <Container className="py-16 md:py-28 lg:py-36">
          <div className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-10">
            <div className="lg:col-span-4">
              <h2 id="proof-title" data-reveal className="text-h2">
                In our portfolio.
              </h2>
              <p className="mt-5 max-w-[24rem] text-body text-muted">
                Point-of-sale systems built for real businesses. Their screens carry client branding and data, so they
                are not published here.
              </p>
            </div>
            <div data-reveal="media" className="lg:col-span-8">
              <SpecSheet
                label="Business Systems"
                state={{ text: "In our portfolio", confirmed: true }}
                statement="Point of sale, records and reports."
                detail="Built for the counter and the back office."
                items={["Sales and invoices", "Suppliers and expenses", "Users", "Reports"]}
                footer={
                  <ul className="grid sm:grid-cols-2">
                    {service.proof.map(getProject).map((project, index) => (
                      <li
                        key={project.slug}
                        className={`px-6 py-5 sm:px-10 ${index > 0 ? "border-t border-line-dark sm:border-t-0 sm:border-l" : ""}`}
                      >
                        <span className="block text-[1.25rem] font-[540] tracking-[-0.015em]">{project.name}</span>
                        <span className="mt-1 block text-[0.875rem] text-mist">{project.summary}</span>
                      </li>
                    ))}
                  </ul>
                }
              />
            </div>
          </div>
        </Container>
      </section>
    );
  }

  // Mobile Apps: no published app work yet; explain the approach, not a case study.
  return (
    <section aria-labelledby="proof-title" data-header="light" className="bg-white text-navy">
      <Container className="py-16 md:py-28 lg:py-36">
        <div className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-4">
            <h2 id="proof-title" data-reveal className="text-h2">
              Two kinds of app.
            </h2>
            <p className="mt-5 max-w-[24rem] text-body text-muted">
              App projects are scoped one at a time. Tell us what the app needs to do and we will walk you through how we
              would plan it.
            </p>
          </div>
          <div data-reveal="media" className="lg:col-span-8">
            <SpecSheet
              label="Mobile Apps"
              state={{ text: "Planned per project", confirmed: false }}
              statement="Planned around real use cases."
              detail="Built to be used every day."
              footer={
                <ul className="grid sm:grid-cols-2">
                  {[
                    { title: "For your customers", text: "Ordering, booking, accounts and updates in their pocket." },
                    { title: "For your team", text: "Field work, stock checks and approvals away from a desk." },
                  ].map((cell, index) => (
                    <li key={cell.title} className={`px-6 py-5 sm:px-10 ${index > 0 ? "border-t border-line-dark sm:border-t-0 sm:border-l" : ""}`}>
                      <span className="block text-[1.25rem] font-[540] tracking-[-0.015em]">{cell.title}</span>
                      <span className="mt-1 block text-[0.875rem] text-mist">{cell.text}</span>
                    </li>
                  ))}
                </ul>
              }
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const service = getService((await params).slug);
  if (!service) notFound();
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
        <HeroMedia service={service} />
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

      <ProofSection service={service} />

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
