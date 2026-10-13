import { Layers, MessagesSquare, Target, Workflow } from "lucide-react";

import { ButtonLink } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { primaryCta } from "@/lib/site";

/** Pillars from docs/PAGE_BLUEPRINTS.md. No service-level or numeric claims. */
const pillars = [
  {
    icon: Target,
    title: "Business Focus",
    text: "We start from what your business needs to achieve, then decide what to build. Every feature has a reason to exist.",
  },
  {
    icon: Layers,
    title: "Modern & Scalable",
    text: "Clean, maintainable builds on modern foundations, structured so your product can grow with your business.",
  },
  {
    icon: Workflow,
    title: "End-to-End Delivery",
    text: "Planning, design, development and launch handled in one place, by one team that understands the whole project.",
  },
  {
    icon: MessagesSquare,
    title: "Clear Communication",
    text: "Direct, simple updates throughout the project, so you always know where things stand and what comes next.",
  },
] as const;

export function WhySection() {
  return (
    <Section tone="white" aria-labelledby="why-title">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <SectionHeading
            id="why-title"
            eyebrow="Why Business Craft"
            title="More Than Just Development"
            intro="We don’t just build websites or apps. We help businesses turn their ideas into digital products that create real value for customers and teams."
          />
          <ButtonLink href={primaryCta.href} arrow className="mt-9">
            {primaryCta.label}
          </ButtonLink>
        </div>

        <ul className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:col-span-6 lg:col-start-7 lg:self-center">
          {pillars.map((pillar) => (
            <li key={pillar.title} className="border-t border-line-strong pt-6">
              <pillar.icon aria-hidden="true" className="size-6 text-action" strokeWidth={1.6} />
              <h3 className="mt-5 text-h3">{pillar.title}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{pillar.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
