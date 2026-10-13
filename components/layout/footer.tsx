import Link from "next/link";

import { Container } from "@/components/ui/container";
import { footerNav, primaryCta, siteConfig, type SocialPlatform } from "@/lib/site";

import { CopyrightYear } from "./copyright-year";
import { Logo } from "./logo";

const socialLabels: Record<SocialPlatform, string> = {
  linkedin: "LinkedIn",
  instagram: "Instagram",
  facebook: "Facebook",
  x: "X",
};

const linkClass =
  "inline-flex min-h-11 min-w-11 items-center text-[0.9375rem] text-white/65 transition-colors duration-300 hover:text-white";

/** Editorial sign-off: logo, one line, minimal navigation, a thin rule. */
export function Footer() {
  const socials = (Object.entries(siteConfig.social) as [SocialPlatform, string | null][]).filter(
    (entry): entry is [SocialPlatform, string] => entry[1] !== null,
  );
  const { email } = siteConfig.contact;

  return (
    <footer id="site-footer" className="bg-navy text-white">
      <Container className="pt-20 pb-10 md:pt-28 lg:pt-32">
        <div className="grid gap-y-12 lg:grid-cols-12 lg:items-end lg:gap-x-10">
          <div className="lg:col-span-6">
            <Logo surface="dark" className="h-9 md:h-10" />
            <p className="mt-6 max-w-[22rem] text-[0.9375rem] leading-relaxed text-white/60">{siteConfig.descriptor}</p>
          </div>

          <nav aria-label="Footer" className="lg:col-span-6">
            <ul className="flex flex-wrap gap-x-6 gap-y-1 lg:justify-end lg:gap-x-8">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={primaryCta.href} className="inline-flex min-h-11 items-center text-[0.9375rem] text-white underline decoration-accent decoration-1 underline-offset-[6px] transition-colors duration-300 hover:decoration-white">
                  {primaryCta.label}
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {email || socials.length > 0 ? (
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-1">
            {email ? (
              <a href={`mailto:${email}`} className={linkClass}>
                {email}
              </a>
            ) : null}
            {socials.length > 0 ? (
              <ul className="flex flex-wrap gap-x-5 gap-y-1" aria-label="Social media">
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
          </div>
        ) : null}

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-line-dark pt-7 text-[0.8125rem] text-white/55 lg:mt-24">
          <p>
            ©&nbsp;<CopyrightYear /> <span translate="no">{siteConfig.name}</span>. All rights reserved.
          </p>
          <p>Websites · E-commerce · Systems · Mobile Apps</p>
        </div>
      </Container>
    </footer>
  );
}
