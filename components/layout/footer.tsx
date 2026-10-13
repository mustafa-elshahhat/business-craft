import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { Container } from "@/components/ui/container";
import { featuredProjects, projectHref } from "@/content/projects";
import { serviceHref, services } from "@/content/services";
import { brandAssets, primaryCta, siteConfig, type SocialPlatform } from "@/lib/site";

import { CopyrightYear } from "./copyright-year";

const socialLabels: Record<SocialPlatform, string> = {
  linkedin: "LinkedIn",
  instagram: "Instagram",
  facebook: "Facebook",
  x: "X",
};

const workLinks = ["zts-fashion", "dermiva-skincare", "soulmate-gift-store", "dr-mirror"].map(
  (slug) => featuredProjects.find((project) => project.slug === slug)!,
);

const linkClass =
  "inline-flex min-h-11 min-w-11 items-center text-[0.875rem] text-mist transition-colors hover-ease hover:text-white";

function Column({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="text-label text-white uppercase">{title}</h2>
      <ul className="mt-3">{children}</ul>
    </div>
  );
}

/** Minimal footer: logo and descriptor, four short columns, legal line. Not animated. */
export function Footer() {
  const socials = (Object.entries(siteConfig.social) as [SocialPlatform, string | null][]).filter(
    (entry): entry is [SocialPlatform, string] => entry[1] !== null,
  );
  const { email } = siteConfig.contact;
  const logo = brandAssets.compactLogo.dark;

  return (
    <footer id="site-footer" data-header="dark" className="bg-navy text-white">
      <Container>
        <div className="grid gap-y-12 border-t border-line-dark pt-16 pb-12 md:pt-20 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-4">
            <Link href="/" aria-label="Business Craft home" className="inline-flex min-h-11 items-center">
              <Image
                src={logo.src}
                alt=""
                width={Math.round(logo.width / 10)}
                height={Math.round(logo.height / 10)}
                unoptimized
                className="h-8 w-auto"
              />
            </Link>
            <p className="mt-4 max-w-[20rem] text-[0.875rem] leading-relaxed text-mist">{siteConfig.descriptor}</p>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:col-span-8">
            <Column title="Services">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link href={serviceHref(service.slug)} className={linkClass}>
                    {service.title}
                  </Link>
                </li>
              ))}
            </Column>
            <Column title="Work">
              {workLinks.map((project) => (
                <li key={project.slug}>
                  <Link href={projectHref(project.slug)} className={linkClass}>
                    {project.name}
                  </Link>
                </li>
              ))}
            </Column>
            <Column title="Company">
              <li>
                <Link href="/about" className={linkClass}>
                  About
                </Link>
              </li>
              <li>
                <Link href="/work" className={linkClass}>
                  All Work
                </Link>
              </li>
              <li>
                <Link href="/services" className={linkClass}>
                  All Services
                </Link>
              </li>
            </Column>
            <Column title="Contact">
              <li>
                <Link href={primaryCta.href} className={linkClass}>
                  {primaryCta.label}
                </Link>
              </li>
              {email ? (
                <li>
                  <a href={`mailto:${email}`} className={linkClass}>
                    {email}
                  </a>
                </li>
              ) : null}
              {socials.map(([platform, url]) => (
                <li key={platform}>
                  <a href={url} className={linkClass} target="_blank" rel="noopener noreferrer">
                    {socialLabels[platform]}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </Column>
          </div>
        </div>

        <div className="border-t border-line-dark py-6 text-[0.8125rem] text-mist">
          <p>
            ©&nbsp;<CopyrightYear /> <span translate="no">{siteConfig.name}</span>. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
