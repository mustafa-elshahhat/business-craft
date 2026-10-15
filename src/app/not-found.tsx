import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { serviceHref, services } from "@/data/services";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

const routes = [
  { label: "Selected Work", href: "/work" },
  { label: "All Services", href: "/services" },
  ...services.map((service) => ({ label: service.title, href: serviceHref(service.slug) })),
  { label: "About", href: "/about" },
];

export default function NotFound() {
  return (
    <section aria-labelledby="not-found-title" data-header="dark" className="flex-1 bg-navy text-white">
      <Container className="pt-[calc(var(--header-h)+5rem)] pb-24 md:pt-[calc(var(--header-h)+7rem)] md:pb-32">
        <div className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-6">
            <p className="text-label text-mist uppercase">Error 404</p>
            <h1 id="not-found-title" className="mt-5 text-h1">
              <span className="block">Page not found.</span>
              <span className="block text-mist">It may have moved.</span>
            </h1>
            <ButtonLink href="/" className="mt-10">
              Back to Home
            </ButtonLink>
          </div>
          <nav aria-label="Useful pages" className="lg:col-span-5 lg:col-start-8 lg:self-end">
            <ul className="border-t border-line-dark">
              {routes.map((route) => (
                <li key={route.href} className="border-b border-line-dark">
                  <Link href={route.href} className="group flex min-h-14 items-center justify-between text-[1.0625rem] text-white/85 transition-colors hover-ease hover:text-white">
                    {route.label}
                    <ArrowRight aria-hidden="true" className="size-4 text-mist transition-transform hover-ease group-hover:translate-x-[3px]" strokeWidth={2} />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </section>
  );
}
