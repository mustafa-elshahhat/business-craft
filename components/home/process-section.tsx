import { Container } from "@/components/ui/container";
import { TwoTone } from "@/components/ui/section-heading";

/** Homepage uses the simplified four-step process (docs/PAGE_BLUEPRINTS.md). */
const steps = [
  { title: "Discover", text: "We learn about your business, your goals, your audience and your requirements." },
  { title: "Plan", text: "We agree a clear plan, scope and timeline before any design or development starts." },
  { title: "Build", text: "We design and develop your solution and share progress with you as it takes shape." },
  { title: "Launch", text: "We test, deploy and hand over a product that is ready for real customers and real use." },
] as const;

/**
 * Dark chapter. A 1px track (horizontal on desktop, vertical on mobile)
 * fills with blue as the sequence scrolls through view; markers light as
 * the fill passes them. Scroll-driven CSS only: no pinning, no capture.
 */
export function ProcessSection() {
  return (
    <section id="process" aria-labelledby="process-title" data-header="dark" className="scroll-mt-16 bg-navy text-white">
      <Container className="py-16 md:py-28 lg:py-36">
        <div className="grid gap-y-6 lg:grid-cols-12 lg:items-end lg:gap-x-10">
          <h2 id="process-title" data-reveal className="max-w-[18ch] text-h2 lg:col-span-7">
            <TwoTone tone="dark" lead="A Simple Process for Great Results." rest="From first conversation to launch." />
          </h2>
          <p data-reveal style={{ "--i": 1 } as React.CSSProperties} className="max-w-[26rem] text-body text-mist lg:col-span-4 lg:col-start-9">
            A clear, straightforward path, with you involved at every step.
          </p>
        </div>

        {/*
          The track runs through the stage titles: each title sits on the line
          (its navy backing interrupts it), copy hangs below. The blue fill is
          scroll-driven; without support the markers simply stay lit.
        */}
        <div className="process-steps relative mt-12 md:mt-16 lg:mt-24">
          <span aria-hidden="true" className="absolute top-2 bottom-2 left-[5px] w-px bg-line-dark-strong lg:top-[13px] lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-auto" />
          <span
            aria-hidden="true"
            className="process-fill absolute top-2 bottom-2 left-[5px] w-px origin-top bg-accent [transform:scaleY(0)] lg:top-[13px] lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-auto lg:origin-left lg:[transform:scaleX(0)]"
          />

          <ol className="relative grid gap-y-10 lg:grid-cols-4 lg:gap-x-10">
            {steps.map((step, index) => {
              const at = 25 + (35 * index) / (steps.length - 1);
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
