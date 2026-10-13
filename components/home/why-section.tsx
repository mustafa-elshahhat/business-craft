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

/** One statement, four principles separated by hairlines. */
export function WhySection() {
  return (
    <section aria-labelledby="why-title" data-header="light" className="bg-white text-navy">
      <Container className="py-24 md:py-32 lg:py-40">
        <div className="grid gap-y-6 lg:grid-cols-12 lg:items-end lg:gap-x-10">
          <h2 id="why-title" data-reveal className="max-w-[14ch] text-h2 lg:col-span-6">
            More Than Just Development.
          </h2>
          <p data-reveal style={{ "--i": 1 } as React.CSSProperties} className="max-w-[34rem] text-lead text-muted lg:col-span-6">
            We don’t just build websites or apps. We help businesses turn their ideas into digital products that create real
            value for customers and teams.
          </p>
        </div>

        <ul className="mt-16 grid border-t border-line sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
          {principles.map((principle, index) => (
            <li
              key={principle.title}
              className={`border-b border-line py-8 sm:pr-8 lg:border-b-0 lg:py-10 ${index % 2 === 1 ? "sm:border-l sm:pl-8" : ""} ${
                index > 0 ? "lg:border-l lg:pl-8" : ""
              }`}
            >
              <h3 className="text-[1.125rem] font-[540] tracking-[-0.01em]">{principle.title}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{principle.text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
