import { ButtonLink } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { primaryCta, secondaryCta } from "@/lib/site";

export function FinalCta() {
  return (
    <Section tone="navy" aria-labelledby="cta-title">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-eyebrow uppercase text-accent">Let’s build together</p>
        <h2 id="cta-title" className="mt-4 text-h2 text-balance">
          Ready to Grow Your Business?
        </h2>
        <p className="mx-auto mt-5 max-w-[32rem] text-lead text-white/72">
          Get a free consultation and let’s discuss your project, your goals and the right way to build it.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href={primaryCta.href} arrow>
            {primaryCta.label}
          </ButtonLink>
          <ButtonLink href={secondaryCta.href} variant="secondary-dark">
            {secondaryCta.label}
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
