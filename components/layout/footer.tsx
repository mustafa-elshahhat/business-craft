import Link from "next/link";
import type { ReactNode } from "react";

import { TextLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { serviceHref, services } from "@/content/services";
import { footerNav, primaryCta, siteConfig, type SocialPlatform } from "@/lib/site";

import { CopyrightYear } from "./copyright-year";
import { Logo } from "./logo";

const socialLabels: Record<SocialPlatform, string> = {
  linkedin: "LinkedIn",
  instagram: "Instagram",
  facebook: "Facebook",
  x: "X",
};

const linkClass = "inline-flex min-h-8 items-center text-[0.9375rem] text-white/70 transition-colors hover:text-white";

function FooterColumn({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="text-sm font-semibold text-white">{title}</h2>
      <div className="mt-4">{children}</div>
    </div>
  );
}

export function Footer() {
  const socials = (Object.entries(siteConfig.social) as [SocialPlatform, string | null][]).filter(
    (entry): entry is [SocialPlatform, string] => entry[1] !== null,
  );
  const { email } = siteConfig.contact;

  return (
    <footer id="site-footer" className="border-t border-line-dark bg-navy text-white">
      <Container className="grid gap-12 py-16 md:grid-cols-2 md:py-20 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <Logo surface="dark" className="h-10" />
          <p className="mt-5 text-eyebrow uppercase text-white/60">{siteConfig.descriptor}</p>
          <p className="mt-4 max-w-sm text-[0.9375rem] leading-relaxed text-white/70">
            Websites, e-commerce, business systems and mobile apps for businesses that want to grow.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 md:col-span-1 lg:col-span-4">
          <FooterColumn title="Quick Links">
            <ul className="space-y-1">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterColumn>
          <FooterColumn title="Services">
            <ul className="space-y-1">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link href={serviceHref(service.slug)} className={linkClass}>
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterColumn>
        </div>

        <div className="md:col-span-2 lg:col-span-3">
          <FooterColumn title="Connect">
            <p className="text-[0.9375rem] leading-relaxed text-white/70">Let’s talk about your next project.</p>
            <TextLink href={primaryCta.href} tone="dark" className="mt-3">
              {primaryCta.label}
            </TextLink>
            {email ? (
              <p className="mt-4">
                <a href={`mailto:${email}`} className={linkClass}>
                  {email}
                </a>
              </p>
            ) : null}
            {socials.length > 0 ? (
              <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-1" aria-label="Social media">
                {socials.map(([platform, url]) => (
                  <li key={platform}>
                    <a href={url} className={linkClass} target="_blank" rel="noopener noreferrer">
                      {socialLabels[platform]}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </FooterColumn>
        </div>
      </Container>

      <div className="border-t border-line-dark">
        <Container className="flex flex-col gap-2 py-6 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CopyrightYear /> <span translate="no">{siteConfig.name}</span>. All rights reserved.
          </p>
          <p>{siteConfig.descriptor}</p>
        </Container>
      </div>
    </footer>
  );
}
