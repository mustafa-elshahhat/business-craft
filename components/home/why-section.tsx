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
 * Full-width statement, then one horizontal ruled row of principles.
 * Deliberately not the left/right split used by Process.
 */
export function WhySection() {
  return (
    <section aria-labelledby="why-title" className="border-t border-line bg-light py-24 text-navy md:py-28 lg:py-40">
      <Container>
        <p className="text-eyebrow uppercase text-action">Why Business Craft</p>
        <div className="mt-6 grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-x-10">
          <h2 id="why-title" className="text-statement lg:col-span-7">
            More Than Just Development
          </h2>
          <p className="max-w-[32rem] text-[clamp(1.125rem,1rem+0.45vw,1.375rem)] leading-[1.5] font-medium tracking-[-0.012em] text-navy/80 lg:col-span-4 lg:col-start-9 lg:pb-2">
            We don’t just build websites or apps. We help businesses turn their ideas into digital products that create
            real value for customers and teams.
          </p>
        </div>

        <ul className="mt-16 grid border-y border-line-strong sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
          {principles.map((principle, index) => (
            <li
              key={principle.title}
              className={`py-8 sm:pr-8 lg:py-10 ${index > 0 ? "border-t border-line-strong" : ""} ${
                index === 1 ? "sm:border-t-0 sm:border-l sm:pl-8" : ""
              } ${index === 2 ? "sm:pl-0 lg:border-t-0 lg:border-l lg:pl-8" : ""} ${
                index === 3 ? "sm:border-l sm:pl-8 lg:border-t-0" : ""
              }`}
            >
              <h3 className="text-lg font-semibold tracking-[-0.015em]">{principle.title}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{principle.text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
