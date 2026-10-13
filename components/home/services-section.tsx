import { LayoutDashboard, Monitor, ShoppingBag, Smartphone, type LucideIcon } from "lucide-react";

import { ServiceCard } from "@/components/cards/service-card";
import { TextLink } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { serviceHref, services, type ServiceSlug } from "@/content/services";

const icons: Record<ServiceSlug, LucideIcon> = {
  websites: Monitor,
  ecommerce: ShoppingBag,
  systems: LayoutDashboard,
  "mobile-apps": Smartphone,
};

export function ServicesSection() {
  return (
    <Section tone="light" aria-labelledby="services-title">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
        <SectionHeading id="services-title" eyebrow="What we do" title="Our Services" className="lg:col-span-7" />
        <div className="lg:col-span-5 lg:pb-1">
          <p className="max-w-[30rem] text-lead text-muted">
            Four ways we help businesses sell, operate and grow, each designed and built around your goals.
          </p>
          <TextLink href="/services" className="mt-4">
            View All Services
          </TextLink>
        </div>
      </div>

      <ul className="mt-10 grid border-b border-line sm:mt-12 sm:gap-5 sm:border-b-0 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
        {services.map((service) => (
          <li key={service.slug}>
            <ServiceCard
              title={service.title}
              summary={service.summary}
              href={serviceHref(service.slug)}
              icon={icons[service.slug]}
            />
          </li>
        ))}
      </ul>
    </Section>
  );
}
