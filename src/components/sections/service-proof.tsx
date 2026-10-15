import Image from "next/image";
import Link from "next/link";

import { TextLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Label, TwoTone } from "@/components/ui/section-heading";
import { SpecSheet } from "@/components/ui/spec-sheet";
import { caseStudies } from "@/data/case-studies";
import { coverPosition, getProject, projectHref, systemProjects } from "@/data/projects";
import type { Service } from "@/data/services";
import { DevicePair } from "@/features/projects/device-pair";

/*
 * Real proof for each service: live work where it exists, and honest
 * typographic panels where screens cannot be published.
 */

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

/** The visual side of each chapter: real work where it exists, type where it does not. */
export function ServiceOverviewProof({ service }: { service: Service }) {
  if (service.slug === "websites") {
    const saad = getProject("saad-logistic");
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
    const soulmate = getProject("soulmate-gift-store");
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
          {systemProjects.map((project) => (
            <li key={project.name} className="border-b border-line-dark py-5">
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

export function ServiceHeroMedia({ service }: { service: Service }) {
  if (service.slug === "websites") {
    const study = caseStudies["saad-logistic"];
    return <DevicePair desktop={study.bilingual.secondary} mobile={study.bilingual.mobile} priority />;
  }
  if (service.slug === "e-commerce") {
    const dermiva = caseStudies["dermiva-skincare"];
    return dermiva.highlight.kind === "pair" ? (
      <DevicePair desktop={dermiva.highlight.desktop} mobile={dermiva.highlight.mobile} priority />
    ) : null;
  }
  return null;
}

/** Real proof for the service; typographic where screens cannot be published. */
export function ServiceProof({ service }: { service: Service }) {
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
            {service.proof.map(getProject).map((project, index) => (
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
                    className={`object-cover ${coverPosition(project.media.desktop)} transition-[filter] hover-ease group-hover:brightness-[1.04]`}
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
    const saad = getProject("saad-logistic");
    const study = caseStudies["saad-logistic"];
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
                    {systemProjects.map((project, index) => (
                      <li
                        key={project.name}
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
