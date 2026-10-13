import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { primaryCta, siteConfig } from "@/lib/site";

/** Closing chapter on navy: left aligned, one action, email only if configured. */
export function FinalCta() {
  const { email } = siteConfig.contact;

  return (
    <section aria-labelledby="cta-title" data-header="dark" className="bg-navy text-white">
      <Container className="pb-20 md:pb-28 lg:pb-36">
        <div className="grid gap-y-8 border-t border-line-dark pt-16 md:pt-24 lg:grid-cols-12 lg:items-end lg:gap-x-10 lg:pt-32">
          <h2 id="cta-title" data-reveal className="text-h1 text-balance lg:col-span-9">
            <span className="block">Ready to Grow Your Business?</span>
            <span className="block text-mist">Let’s discuss your project.</span>
          </h2>
          <div
            data-reveal
            style={{ "--i": 1 } as React.CSSProperties}
            className="flex flex-wrap items-center gap-x-8 gap-y-4 lg:col-span-3 lg:justify-end lg:pb-2"
          >
            <ButtonLink href={primaryCta.href} arrow>
              {primaryCta.label}
            </ButtonLink>
            {email ? (
              <a
                href={`mailto:${email}`}
                className="inline-flex min-h-11 items-center text-[0.9375rem] text-mist underline decoration-white/20 underline-offset-[6px] transition-colors hover-ease hover:text-white"
              >
                {email}
              </a>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
