import type { ReactNode } from "react";

import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

type PagePlaceholderProps = {
  eyebrow: string;
  title: string;
  children?: ReactNode;
  /** Defaults to the consultation CTA; the contact page links home instead. */
  action?: { label: string; href: string };
};

/**
 * Temporary route body for pages scheduled after Phase 1 (homepage).
 * Keeps navigation working without designing those pages yet.
 * Routes using it are excluded from the sitemap and marked noindex.
 */
export function PagePlaceholder({
  eyebrow,
  title,
  children,
  action = { label: "Get a Free Consultation", href: "/contact" },
}: PagePlaceholderProps) {
  return (
    <section aria-labelledby="page-title" className="bg-navy text-white">
      <Container className="py-20 md:py-28 lg:py-32">
        <p className="text-eyebrow uppercase text-accent">{eyebrow}</p>
        <h1 id="page-title" className="mt-4 max-w-[18ch] text-h2 text-balance">
          {title}
        </h1>
        <div className="mt-5 max-w-[36rem] space-y-4 text-lead text-white/72">
          {children}
          <p>This page is being prepared.</p>
        </div>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={action.href} arrow>
            {action.label}
          </ButtonLink>
          <ButtonLink href="/" variant="secondary-dark">
            Back to Home
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}

export const placeholderMetadata = { robots: { index: false, follow: true } } as const;
