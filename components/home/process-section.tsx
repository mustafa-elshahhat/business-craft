import { Container } from "@/components/ui/container";

/** Homepage uses the simplified four-step process (docs/PAGE_BLUEPRINTS.md). */
const steps = [
  { title: "Discover", text: "We learn about your business, your goals, your audience and your requirements." },
  { title: "Plan", text: "We agree a clear plan, scope and timeline before any design or development starts." },
  { title: "Build", text: "We design and develop your solution and share progress with you as it takes shape." },
  { title: "Launch", text: "We test, deploy and hand over a product that is ready for real customers and real use." },
] as const;

/** Navy anchor: sticky heading on the left, numbered sequence on the right. */
export function ProcessSection() {
  return (
    <section aria-labelledby="process-title" className="bg-navy py-24 text-white md:py-28 lg:py-40">
      <Container className="grid gap-14 lg:grid-cols-12 lg:gap-x-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-12">
            <p className="text-eyebrow uppercase text-accent">Our process</p>
            <h2 id="process-title" className="mt-5 max-w-[12ch] text-h2">
              A Simple Process for Great Results
            </h2>
            <p className="mt-6 max-w-[26rem] text-lead text-white/70">
              A clear, straightforward path from first conversation to launch, with you involved at every step.
            </p>
          </div>
        </div>

        <ol className="border-b border-line-dark lg:col-span-6 lg:col-start-7">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="grid grid-cols-[4.5rem_1fr] gap-x-6 border-t border-line-dark py-10 sm:grid-cols-[7rem_1fr] lg:py-14"
            >
              <span
                aria-hidden="true"
                className="text-[clamp(2.75rem,2rem+2.4vw,4.5rem)] leading-[0.9] font-light tracking-[-0.04em] tabular-nums text-accent"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-[1.625rem] leading-tight font-semibold tracking-[-0.02em]">
                  <span className="sr-only">Step {index + 1}: </span>
                  {step.title}
                </h3>
                <p className="mt-3 max-w-[26rem] text-base leading-relaxed text-white/70">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
