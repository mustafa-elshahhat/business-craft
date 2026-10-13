import { TextLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Facet } from "@/components/ui/facet";
import { getProject, projects, type Project } from "@/content/projects";
import { services, type ServiceSlug } from "@/content/services";

import { ServiceIndex, type ServiceVisual } from "./service-index";

function shot(project: Project, kind: "primary" | "mobile" = "primary") {
  const image = project.media?.[kind];
  if (!image) throw new Error(`Missing ${kind} image for ${project.slug}`);
  return image;
}

/**
 * What each service row shows. Only real work: where no interface can be
 * published yet (systems), the visual names the real projects instead.
 */
const visuals: Record<ServiceSlug, ServiceVisual> = {
  websites: {
    kind: "image",
    image: shot(getProject("saad-logistic")),
    caption: ["Saad Logistic", "Company website"],
  },
  ecommerce: {
    kind: "image",
    image: shot(getProject("dermiva-skincare")),
    caption: ["Dermiva Skincare", "Online store"],
  },
  systems: {
    kind: "list",
    items: projects.filter((project) => project.category === "Systems").map((project) => project.name),
    caption: ["From our portfolio", "Systems projects"],
  },
  "mobile-apps": {
    kind: "phones",
    images: [shot(getProject("zts-fashion"), "mobile"), shot(getProject("dr-mirror"), "mobile")],
    caption: ["ZTS Fashion · Dr Mirror", "Mobile-first storefronts"],
  },
};

export function ServicesSection() {
  return (
    <section aria-labelledby="services-title" className="relative bg-light text-navy">
      {/* Stepped edge continuing the navy hero into this chapter */}
      <div aria-hidden="true" className="-mt-px step-down bg-navy" />

      <Container className="pt-20 pb-24 md:pt-24 lg:pt-28 lg:pb-36">
        <div className="grid gap-y-8 lg:grid-cols-12 lg:gap-x-10">
          <p className="flex items-center gap-3 self-start text-[0.75rem] font-medium tracking-[0.16em] text-muted uppercase lg:col-span-3 lg:pt-4">
            <Facet className="size-2" />
            Services
            <span className="tabular-nums text-muted">/ 04</span>
          </p>
          <div className="lg:col-span-8 lg:col-start-4">
            <h2
              id="services-title"
              className="max-w-[18ch] text-[clamp(2.125rem,1.3rem+3.2vw,4rem)] leading-[1.02] font-bold tracking-[-0.04em] text-balance"
            >
              Built around the way your business actually works.
            </h2>
            <div className="mt-8 flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
              <p className="max-w-[30rem] text-[1.0625rem] leading-relaxed text-muted">
                Four disciplines, one clear process: from a first website to the systems your team runs on.
              </p>
              <TextLink href="/services">View All Services</TextLink>
            </div>
          </div>
        </div>

        <ServiceIndex
          services={services.map((service) => ({ ...service, visual: visuals[service.slug] }))}
        />
      </Container>
    </section>
  );
}
