import Image from "next/image";
import type { ReactNode } from "react";

import dermivaCart from "@/assets/projects/dermiva-skincare-cart.jpg";
import dermivaProduct from "@/assets/projects/dermiva-skincare-product.jpg";
import { TextLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { TwoTone } from "@/components/ui/section-heading";
import { getProject, projectHost, projects } from "@/content/projects";
import { serviceHref, services, type ServiceSlug } from "@/content/services";

import { ServiceIndex } from "./service-index";

const saad = getProject("saad-logistic");
const systemsProjects = projects.filter((project) => project.category === "Systems");

/** Capabilities per service, from docs/PAGE_BLUEPRINTS.md §7–10. No provider or platform claims. */
const capabilities: Record<ServiceSlug, string[]> = {
  websites: ["Responsive on every screen", "Fast and SEO-friendly", "Structured around your goals", "Clear calls to action"],
  ecommerce: ["Catalogue and categories", "Product variants", "Cart and checkout", "English and Arabic storefronts"],
  systems: ["Custom business workflows", "Dashboards and reporting", "Roles and permissions", "Inventory and operations"],
  "mobile-apps": ["Customer-facing apps", "Internal business apps", "Accounts and sign-in", "APIs and integrations"],
};

function Caption({ children }: { children: ReactNode }) {
  return <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.8125rem] text-muted">{children}</p>;
}

function Evidence({ slug }: { slug: ServiceSlug }) {
  if (slug === "websites" && saad.media) {
    return (
      <figure>
        <div className="media-frame aspect-[1920/1040]">
          <Image src={saad.media.desktop.src} alt={saad.media.desktop.alt} fill sizes="(min-width: 1024px) 62vw, 92vw" className="object-cover object-top" />
        </div>
        <figcaption>
          <Caption>
            <span className="font-[540] text-navy">{saad.name}</span>
            <span>Company website, live at {projectHost(saad)}</span>
          </Caption>
        </figcaption>
      </figure>
    );
  }

  if (slug === "ecommerce") {
    return (
      <figure>
        <div className="relative pb-[18%]">
          <div className="media-frame aspect-[16/10] w-[82%]">
            <Image
              src={dermivaProduct}
              alt="Dermiva Skincare product page: Super Serum, EGP 550, with Add to cart and Buy now"
              fill
              sizes="(min-width: 1024px) 50vw, 76vw"
              className="object-cover object-top"
            />
          </div>
          <div className="media-frame absolute right-0 bottom-0 aspect-[16/10] w-[50%] ring-[6px] ring-light">
            <Image
              src={dermivaCart}
              alt="Dermiva Skincare cart: one item, free delivery unlocked, total EGP 550 and Continue to checkout"
              fill
              sizes="(min-width: 1024px) 31vw, 46vw"
              className="object-cover object-top"
            />
          </div>
        </div>
        <figcaption>
          <Caption>
            <span className="font-[540] text-navy">Dermiva Skincare</span>
            <span>Product page to cart, in English and Arabic</span>
          </Caption>
        </figcaption>
      </figure>
    );
  }

  if (slug === "systems") {
    return (
      <div className="rounded-[12px] bg-navy p-6 text-white sm:p-10">
        <p className="text-label text-mist uppercase">Systems in our portfolio</p>
        <ul className="mt-6 border-t border-line-dark sm:mt-8">
          {systemsProjects.map((project) => (
            <li key={project.slug} className="flex items-center justify-between gap-6 border-b border-line-dark py-4 sm:py-5">
              <span className="text-[clamp(1.5rem,1rem+2vw,2.5rem)] leading-tight font-[540] tracking-[-0.025em]">{project.name}</span>
              <span className="shrink-0 text-label text-mist uppercase">Point of sale</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="rounded-[12px] bg-navy p-6 text-white sm:p-10">
      <p className="text-label text-mist uppercase">How we approach apps</p>
      <div className="mt-6 sm:mt-8">
        <p className="max-w-[24ch] text-[clamp(1.5rem,1rem+2vw,2.25rem)] leading-[1.12] font-[540] tracking-[-0.025em]">
          Planned around real use cases. <span className="text-mist">Built to be used every day.</span>
        </p>
        <p className="mt-8 flex flex-wrap gap-x-6 gap-y-1 border-t border-line-dark pt-4 text-[0.875rem] text-mist">
          <span>For your customers</span>
          <span>For your team</span>
        </p>
      </div>
    </div>
  );
}

/**
 * Services as chapters: a sticky index on the left (desktop) and one chapter
 * per service on the right, each with real evidence or an honest typographic
 * panel where no publishable screen exists yet.
 */
export function ServicesSection() {
  const items = services.map((service) => ({ id: `service-${service.slug}`, title: service.title }));

  return (
    <section aria-labelledby="services-title" data-header="light" className="bg-light text-navy">
      <Container className="py-24 md:py-32 lg:py-40">
        <div className="grid gap-y-8 lg:grid-cols-12 lg:items-end lg:gap-x-10">
          <h2 id="services-title" data-reveal className="max-w-[28ch] text-h2 lg:col-span-9">
            <TwoTone lead="Built around the way your business actually works." rest="Four disciplines, one clear process." />
          </h2>
          <div data-reveal style={{ "--i": 1 } as React.CSSProperties} className="lg:col-span-3 lg:justify-self-end">
            <TextLink href="/services">View All Services</TextLink>
          </div>
        </div>

        <div className="mt-16 grid lg:mt-24 lg:grid-cols-12 lg:gap-x-10">
          <div className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-[calc(var(--header-h)+3rem)]">
              <ServiceIndex items={items} />
            </div>
          </div>

          <div className="space-y-24 md:space-y-32 lg:col-span-8 lg:col-start-5">
            {services.map((service) => (
              <article key={service.slug} id={`service-${service.slug}`} aria-labelledby={`service-${service.slug}-title`} className="scroll-mt-28">
                <div className="grid gap-y-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:gap-x-10">
                  <div>
                    <h3 id={`service-${service.slug}-title`} className="text-h3">
                      {service.title}
                    </h3>
                    <p className="mt-4 max-w-[30rem] text-body text-muted">{service.summary}</p>
                  </div>
                  <ul className="grid content-start border-t border-line md:mt-1.5">
                    {capabilities[service.slug].map((item) => (
                      <li key={item} className="border-b border-line py-2.5 text-[0.9375rem]">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div data-reveal="media" className="mt-10">
                  <Evidence slug={service.slug} />
                </div>
                <TextLink href={serviceHref(service.slug)} className="mt-4">
                  Explore {service.title}
                </TextLink>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
