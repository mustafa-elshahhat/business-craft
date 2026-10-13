import Image from "next/image";
import type { ReactNode } from "react";

import dermivaCart from "@/assets/projects/dermiva-skincare-cart.jpg";
import dermivaBuybox from "@/assets/projects/dermiva-skincare-buybox.jpg";
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
  "mobile-apps": ["Accounts and sign-in", "Notifications", "APIs and integrations"],
};

/** Services shown as typographic spec sheets until publishable screens exist. */
const SPEC: ServiceSlug[] = ["systems", "mobile-apps"];

function Caption({ children }: { children: ReactNode }) {
  return <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.8125rem] text-muted">{children}</p>;
}

function Capabilities({ items, tone = "light" }: { items: string[]; tone?: "light" | "dark" }) {
  const line = tone === "dark" ? "border-line-dark" : "border-line";
  return (
    <ul className={`grid content-start border-t ${line}`}>
      {items.map((item) => (
        <li key={item} className={`border-b ${line} py-2.5 text-[0.9375rem] ${tone === "dark" ? "text-white/90" : ""}`}>
          {item}
        </li>
      ))}
    </ul>
  );
}

/**
 * Typographic spec sheet: a deliberate, minimal panel built from type,
 * hairlines and one state label. Blue marks real, confirmed state only.
 */
function SpecSheet({
  label,
  state,
  statement,
  detail,
  items,
  footer,
}: {
  label: string;
  state: { text: string; confirmed: boolean };
  statement: string;
  detail: string;
  items: string[];
  footer: ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-[12px] bg-navy text-white">
      <div className="flex items-center justify-between gap-4 border-b border-line-dark px-6 py-4 sm:px-10">
        <p className="text-label text-mist uppercase">{label}</p>
        <p className="flex items-center gap-2 text-[0.8125rem] text-white/80">
          {state.confirmed ? <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" /> : null}
          {state.text}
        </p>
      </div>
      <div className="grid gap-10 px-6 py-8 sm:px-10 sm:py-12 md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] md:gap-x-12">
        <p className="max-w-[18ch] text-[clamp(1.75rem,1.2rem+1.9vw,2.625rem)] leading-[1.08] font-[540] tracking-[-0.028em]">
          {statement} <span className="text-mist">{detail}</span>
        </p>
        <Capabilities items={items} tone="dark" />
      </div>
      <div className="border-t border-line-dark">{footer}</div>
    </div>
  );
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
        {/* Product detail at reading scale, then the cart it leads to */}
        <div className="relative pb-[16%]">
          <div className="media-frame aspect-[2000/1088] w-[86%]">
            <Image
              src={dermivaBuybox}
              alt="Dermiva Skincare product page close-up: Super Serum, EGP 550.00, Add to cart and Buy now"
              fill
              sizes="(min-width: 1024px) 54vw, 80vw"
              className="object-cover object-left-top"
            />
          </div>
          <div className="media-frame absolute right-0 bottom-0 aspect-[16/10] w-[44%] ring-[6px] ring-light">
            <Image
              src={dermivaCart}
              alt="Dermiva Skincare cart: one item, free delivery unlocked, total EGP 550 and Continue to checkout"
              fill
              sizes="(min-width: 1024px) 28vw, 42vw"
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
      <SpecSheet
        label="Business Systems"
        state={{ text: "In our portfolio", confirmed: true }}
        statement="Built around your workflow."
        detail="Not the other way round."
        items={capabilities.systems}
        footer={
          <ul className="grid sm:grid-cols-2">
            {systemsProjects.map((project, index) => (
              <li
                key={project.slug}
                className={`flex items-baseline justify-between gap-4 px-6 py-5 sm:px-10 ${index > 0 ? "border-t border-line-dark sm:border-t-0 sm:border-l" : ""}`}
              >
                <span className="text-[1.25rem] font-[540] tracking-[-0.015em]">{project.name}</span>
                <span className="shrink-0 text-label text-mist uppercase">Point of sale</span>
              </li>
            ))}
          </ul>
        }
      />
    );
  }

  return (
    <SpecSheet
      label="Mobile Apps"
      state={{ text: "Planned per project", confirmed: false }}
      statement="Planned around real use cases."
      detail="Built to be used every day."
      items={capabilities["mobile-apps"]}
      footer={
        <ul className="grid sm:grid-cols-2">
          {[
            { title: "For your customers", text: "Customer-facing apps" },
            { title: "For your team", text: "Internal business apps" },
          ].map((cell, index) => (
            <li
              key={cell.title}
              className={`px-6 py-5 sm:px-10 ${index > 0 ? "border-t border-line-dark sm:border-t-0 sm:border-l" : ""}`}
            >
              <span className="block text-[1.25rem] font-[540] tracking-[-0.015em]">{cell.title}</span>
              <span className="mt-1 block text-[0.875rem] text-mist">{cell.text}</span>
            </li>
          ))}
        </ul>
      }
    />
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
      <Container className="py-16 md:py-28 lg:py-40">
        <div className="grid gap-y-8 lg:grid-cols-12 lg:items-end lg:gap-x-10">
          <h2 id="services-title" data-reveal className="max-w-[28ch] text-h2 lg:col-span-9">
            <TwoTone lead="Built around the way your business actually works." rest="Four disciplines, one clear process." />
          </h2>
          <div data-reveal style={{ "--i": 1 } as React.CSSProperties} className="lg:col-span-3 lg:justify-self-end">
            <TextLink href="/services">View All Services</TextLink>
          </div>
        </div>

        <div className="mt-12 grid md:mt-16 lg:mt-24 lg:grid-cols-12 lg:gap-x-10">
          <div className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-[calc(var(--header-h)+3rem)]">
              <ServiceIndex items={items} />
            </div>
          </div>

          <div className="space-y-16 md:space-y-28 lg:col-span-8 lg:col-start-5">
            {services.map((service) => (
              <article key={service.slug} id={`service-${service.slug}`} aria-labelledby={`service-${service.slug}-title`} className="scroll-mt-28">
                <div className="grid gap-y-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:gap-x-10">
                  <div>
                    <h3 id={`service-${service.slug}-title`} className="text-h3">
                      {service.title}
                    </h3>
                    <p className="mt-3 max-w-[30rem] text-body text-muted md:mt-4">{service.summary}</p>
                  </div>
                  {/* Spec-sheet services carry their capabilities inside the panel */}
                  {SPEC.includes(service.slug) ? null : (
                    <div className="md:mt-1.5">
                      <Capabilities items={capabilities[service.slug]} />
                    </div>
                  )}
                </div>
                <div data-reveal="media" className="mt-8 md:mt-10">
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
