import { ButtonLink, TextLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { primaryCta, secondaryCta } from "@/lib/site";

/** Closing frame: oversized type on white between the navy process and footer. */
export function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="bg-white py-28 text-navy md:py-36 lg:py-48">
      <Container>
        <p className="flex items-center gap-3 text-eyebrow uppercase text-action">
          <span aria-hidden="true" className="h-px w-8 bg-action" />
          Let’s build together
        </p>
        <h2 id="cta-title" className="mt-8 text-closing">
          Ready to Grow
          <br />
          Your Business<span className="text-action">?</span>
        </h2>
        <div className="mt-14 grid gap-10 border-t border-line-strong pt-10 lg:mt-20 lg:grid-cols-12 lg:items-center lg:gap-x-10">
          <p className="max-w-[30rem] text-lead text-muted lg:col-span-6">
            Get a free consultation and let’s discuss your project, your goals and the right way to build it.
          </p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 lg:col-span-6 lg:justify-end">
            <ButtonLink href={primaryCta.href} arrow>
              {primaryCta.label}
            </ButtonLink>
            <TextLink href={secondaryCta.href}>
              {secondaryCta.label}
            </TextLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
