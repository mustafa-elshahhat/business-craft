import { Container } from "@/components/ui/container";
import { Facet } from "@/components/ui/facet";

/** Homepage uses the simplified four-step process (docs/PAGE_BLUEPRINTS.md). */
const steps = [
  { title: "Discover", text: "We learn about your business, your goals, your audience and your requirements." },
  { title: "Plan", text: "We agree a clear plan, scope and timeline before any design or development starts." },
  { title: "Build", text: "We design and develop your solution and share progress with you as it takes shape." },
  { title: "Launch", text: "We test, deploy and hand over a product that is ready for real customers and real use." },
] as const;

/** Desktop staircase offsets: each step sits one grid step lower. */
const stair = ["lg:mt-0", "lg:mt-16", "lg:mt-32", "lg:mt-48"];

/**
 * The page's dark anchor. Enormous type, a ruled engineered sequence that
 * steps down like the monogram's folds, nothing else.
 */
export function ProcessSection() {
  return (
    <section aria-labelledby="process-title" className="bg-navy text-white">
      <Container className="pt-20 pb-28 md:pt-24 lg:pt-28 lg:pb-44">
        <div className="grid gap-y-10 lg:grid-cols-12 lg:items-end lg:gap-x-10">
          <div className="lg:col-span-9">
            <p className="flex items-center gap-3 text-[0.75rem] font-medium tracking-[0.16em] text-white/55 uppercase">
              <Facet className="size-2" />
              Our process
            </p>
            <h2
              id="process-title"
              className="mt-8 text-[clamp(2.75rem,1rem+7vw,8rem)] leading-[0.88] font-bold tracking-[-0.055em]"
            >
              A Simple Process
              <br />
              <span className="text-white/45">for Great Results</span>
            </h2>
          </div>
          <p className="max-w-[24rem] text-[1.0625rem] leading-relaxed text-white/65 lg:col-span-3 lg:pb-3">
            A clear, straightforward path from first conversation to launch, with you involved at every step.
          </p>
        </div>

        <ol className="mt-20 grid border-t border-line-dark sm:grid-cols-2 lg:mt-32 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className={`relative grid grid-cols-[auto_1fr] gap-x-6 border-b border-line-dark py-10 sm:block sm:border-b-0 sm:py-12 sm:pr-8 lg:pr-10 lg:pl-0 ${
                index % 2 === 1 ? "sm:border-l sm:border-line-dark sm:pl-8" : ""
              } ${index > 0 ? "lg:border-l lg:border-line-dark lg:pl-8" : ""} ${index >= 2 ? "sm:border-t lg:border-t-0" : ""}`}
            >
              {/* Step marker on the top rule */}
              <span aria-hidden="true" className="absolute -top-px left-0 h-px w-10 bg-accent" />
              <div className={stair[index]}>
                <span
                  aria-hidden="true"
                  className="block text-[clamp(4.5rem,3rem+6vw,9.5rem)] leading-[0.8] font-extralight tracking-[-0.06em] tabular-nums text-white"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="sm:mt-10 lg:mt-12">
                <h3 className="text-[1.75rem] leading-tight font-semibold tracking-[-0.025em] sm:mt-0">
                  <span className="sr-only">Step {index + 1}: </span>
                  {step.title}
                </h3>
                <p className="mt-3 max-w-[22rem] text-[0.9375rem] leading-relaxed text-white/65">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
