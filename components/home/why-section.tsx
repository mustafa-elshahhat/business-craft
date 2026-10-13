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

/**
 * Asymmetric editorial composition: the statement holds the left, the lead
 * and a ruled 2×2 of principles sit together on the right.
 */
export function WhySection() {
  return (
    <section aria-labelledby="why-title" data-header="light" className="bg-white text-navy">
      <Container className="py-16 md:py-28 lg:py-40">
        <div className="grid gap-y-8 lg:grid-cols-12 lg:gap-x-10">
          <h2 id="why-title" data-reveal className="max-w-[12ch] text-h2 lg:sticky lg:top-[calc(var(--header-h)+3rem)] lg:col-span-5 lg:self-start">
            More Than Just Development.
          </h2>
          <div className="lg:col-span-6 lg:col-start-7">
            <p data-reveal style={{ "--i": 1 } as React.CSSProperties} className="max-w-[34rem] text-lead text-navy">
              We don’t just build websites or apps.{" "}
              <span className="text-muted">
                We help businesses turn their ideas into digital products that create real value for customers and teams.
              </span>
            </p>

            <ul className="mt-12 grid border-t border-line sm:grid-cols-2 lg:mt-16">
              {principles.map((principle, index) => (
                <li
                  key={principle.title}
                  className={`border-b border-line py-6 sm:py-8 ${index % 2 === 0 ? "sm:pr-8" : "sm:border-l sm:pl-8"}`}
                >
                  <h3 className="text-[1.0625rem] font-[540] tracking-[-0.01em]">{principle.title}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{principle.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
