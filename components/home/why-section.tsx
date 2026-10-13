import { Container } from "@/components/ui/container";

/** Principles from docs/PAGE_BLUEPRINTS.md. No service-level or numeric claims. */
const principles = [
  {
    title: "Business Focus",
    text: "We start from what your business needs to achieve, then decide what to build. Every feature has a reason to exist.",
  },
  {
    title: "Modern & Scalable",
    text: "Clean, maintainable builds on modern foundations, structured so your product can grow with your business.",
  },
  {
    title: "End-to-End Delivery",
    text: "Planning, design, development and launch handled in one place, by one team that understands the whole project.",
  },
  {
    title: "Clear Communication",
    text: "Direct, simple updates throughout the project, so you always know where things stand and what comes next.",
  },
] as const;

/** One large statement on the left, principles as ruled rows on the right. */
export function WhySection() {
  return (
    <section aria-labelledby="why-title" className="bg-light text-navy">
      <Container className="pt-20 pb-28 md:pt-24 lg:pt-28 lg:pb-44">
        {/* Offset rule: a blue facet leads into the chapter */}
        <div aria-hidden="true" className="flex items-center">
          <span className="h-px w-16 bg-action" />
          <span data-reveal="line" className="h-px flex-1 bg-line-strong" />
        </div>

        <div className="mt-12 grid gap-y-16 lg:mt-16 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-6">
            <h2
              id="why-title"
              className="max-w-[11ch] text-[clamp(2.75rem,1.2rem+5.6vw,6.25rem)] leading-[0.9] font-bold tracking-[-0.052em]"
            >
              More Than Just Development
            </h2>
            <p className="mt-10 max-w-[30rem] text-[clamp(1.0625rem,1rem+0.3vw,1.25rem)] leading-relaxed text-navy/75">
              We don’t just build websites or apps. We help businesses turn their ideas into digital products that create
              real value for customers and teams.
            </p>
          </div>

          <ul className="border-b border-line-strong lg:col-span-5 lg:col-start-8 lg:self-end">
            {principles.map((principle) => (
              <li key={principle.title} className="grid gap-y-3 border-t border-line-strong py-8 sm:grid-cols-[13rem_1fr] sm:gap-x-8 lg:grid-cols-1 xl:grid-cols-[11rem_1fr] lg:py-9">
                <h3 className="text-lg leading-snug font-semibold tracking-[-0.02em]">{principle.title}</h3>
                <p className="text-[0.9375rem] leading-relaxed text-muted">{principle.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      {/* Stepped edge into the navy process */}
      <div aria-hidden="true" className="relative -mb-px step-up bg-navy [--step-x:34%]" />
    </section>
  );
}
