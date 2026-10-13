import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

/** Homepage uses the simplified four-step process (docs/PAGE_BLUEPRINTS.md). */
const steps = [
  { title: "Discover", text: "We learn about your business, your goals, your audience and your requirements." },
  { title: "Plan", text: "We agree a clear plan, scope and timeline before any design or development starts." },
  { title: "Build", text: "We design and develop your solution and share progress with you as it takes shape." },
  { title: "Launch", text: "We test, deploy and hand over a product that is ready for real customers and real use." },
] as const;

export function ProcessSection() {
  return (
    <Section tone="light" aria-labelledby="process-title" className="border-t border-line">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
        <SectionHeading
          id="process-title"
          eyebrow="Our process"
          title="A Simple Process for Great Results"
          className="lg:col-span-7"
        />
        <p className="max-w-[30rem] text-lead text-muted lg:col-span-5 lg:pb-1">
          A clear, straightforward path from first conversation to launch, with you involved at every step.
        </p>
      </div>

      <ol className="mt-12 grid gap-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-8">
        {steps.map((step, index) => (
          <li key={step.title}>
            <div className="flex items-center gap-4" aria-hidden="true">
              <span className="text-[2rem] leading-none font-semibold tracking-[-0.02em] tabular-nums text-action">{String(index + 1).padStart(2, "0")}</span>
              <span className="h-px flex-1 bg-line-strong" />
            </div>
            <h3 className="mt-5 text-h3">
              <span className="sr-only">Step {index + 1}: </span>
              {step.title}
            </h3>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{step.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
