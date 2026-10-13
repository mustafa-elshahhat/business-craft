import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { primaryCta } from "@/lib/site";

/**
 * Closing poster: a massive statement, generous space and one action.
 * The navy steps down into it from Process and back up into the footer,
 * where a single blue facet marks the fold.
 */
export function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="relative bg-white text-navy">
      <div aria-hidden="true" className="-mt-px step-down bg-navy [--step-x:66%]" />

      <Container className="pt-24 pb-32 md:pt-32 lg:pt-40 lg:pb-48">
        <h2
          id="cta-title"
          className="text-[clamp(3.5rem,0.5rem+12.2vw,12.5rem)] leading-[0.84] font-bold tracking-[-0.06em] lg:mt-14"
        >
          Ready to Grow
          <br />
          Your Business<span className="text-action">?</span>
        </h2>

        <div className="mt-14 lg:mt-20 lg:ml-[58.33%]">
          <p className="max-w-[26rem] text-[1.0625rem] leading-relaxed text-muted">
            Get a free consultation and let’s discuss your project, your goals and the right way to build it.
          </p>
          <div className="mt-8">
            <ButtonLink href={primaryCta.href} arrow className="whitespace-nowrap">
              {primaryCta.label}
            </ButtonLink>
          </div>
        </div>
      </Container>

      {/* Step up into the footer, with one blue facet on the fold */}
      <div aria-hidden="true" className="relative -mb-px">
        <div className="step-up bg-navy [--step-x:42%]" />
        <div className="step-facet absolute inset-0 bg-action [--step-x:42%]" />
      </div>
    </section>
  );
}
