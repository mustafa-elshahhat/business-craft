import { Container } from "@/components/ui/container";
import { TwoTone } from "@/components/ui/section-heading";
import { processSteps } from "@/data/company";

/**
 * Process chapter on navy (anchor #process). A 1px track (horizontal from lg,
 * vertical below) fills with blue as the sequence scrolls through view and
 * markers light as the fill passes them. Scroll-driven CSS only: no pinning,
 * no scroll capture; without support the markers simply stay lit.
 */
export function ProcessSection({ lead, rest, text }: { lead: string; rest: string; text: string }) {
  return (
    <section id="process" aria-labelledby="process-title" data-header="dark" className="scroll-mt-16 bg-navy text-white">
      <Container className="py-16 md:py-28 lg:py-36">
        <div className="grid gap-y-6 lg:grid-cols-12 lg:items-end lg:gap-x-10">
          <h2 id="process-title" data-reveal className="max-w-[18ch] text-h2 lg:col-span-7">
            <TwoTone tone="dark" lead={lead} rest={rest} />
          </h2>
          <p data-reveal style={{ "--i": 1 } as React.CSSProperties} className="max-w-[26rem] text-body text-mist lg:col-span-4 lg:col-start-9">
            {text}
          </p>
        </div>

        <div className="process-steps relative mt-12 md:mt-16 lg:mt-24">
          <span aria-hidden="true" className="absolute top-2 bottom-2 left-[5px] w-px bg-line-dark-strong lg:top-[13px] lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-auto" />
          <span
            aria-hidden="true"
            className="process-fill absolute top-2 bottom-2 left-[5px] w-px origin-top bg-accent [transform:scaleY(0)] lg:top-[13px] lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-auto lg:origin-left lg:[transform:scaleX(0)]"
          />

          {/* Each title sits on the line (its navy backing interrupts it); copy hangs below. */}
          <ol className="relative grid gap-y-10 lg:grid-flow-col lg:auto-cols-fr lg:gap-x-10">
            {processSteps.map((step, index) => {
              const at = 25 + (35 * index) / (processSteps.length - 1);
              return (
                <li key={step.title} className="relative pl-9 lg:pl-0">
                  <div className="flex items-center gap-3 lg:h-[27px]">
                    <span
                      aria-hidden="true"
                      className="process-marker absolute top-[7px] left-0 size-[11px] shrink-0 rounded-full border border-accent bg-accent lg:static"
                      style={{ animationRange: `cover ${at}% cover ${at + 1}%` }}
                    />
                    <h3 className="text-[1.375rem] leading-none font-[540] tracking-[-0.015em] lg:bg-navy lg:pr-4">
                      <span className="sr-only">Step {index + 1}: </span>
                      {step.title}
                    </h3>
                  </div>
                  <p className="mt-3 max-w-[20rem] text-[0.9375rem] leading-relaxed text-mist lg:mt-6">{step.text}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
