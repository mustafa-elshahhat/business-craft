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

/** Editorial statement on the left, principles divided by rules on the right. */
export function WhySection() {
  return (
    <section aria-labelledby="why-title" className="border-t border-line bg-light py-24 text-navy md:py-28 lg:py-40">
      <Container className="grid gap-16 lg:grid-cols-12 lg:gap-x-10">
        <div className="lg:col-span-6">
          <p className="text-eyebrow uppercase text-action">Why Business Craft</p>
          <h2 id="why-title" className="mt-5 text-h2">
            More Than Just Development
          </h2>
          <p className="mt-8 max-w-[34rem] text-[clamp(1.25rem,1.05rem+0.7vw,1.625rem)] leading-[1.45] font-medium tracking-[-0.015em] text-navy/85">
            We don’t just build websites or apps. We help businesses turn their ideas into digital products that create
            real value for customers and teams.
          </p>
        </div>

        <ul className="border-b border-line-strong lg:col-span-5 lg:col-start-8 lg:self-end">
          {principles.map((principle) => (
            <li key={principle.title} className="grid gap-2 border-t border-line-strong py-7 sm:grid-cols-[12rem_1fr] sm:gap-8">
              <h3 className="text-lg font-semibold tracking-[-0.015em]">{principle.title}</h3>
              <p className="text-[0.9375rem] leading-relaxed text-muted">{principle.text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
