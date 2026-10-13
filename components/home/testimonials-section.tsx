import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { testimonials } from "@/content/testimonials";

/**
 * Renders only when verified, approved testimonials exist in
 * content/testimonials.ts. With none, the homepage omits the section.
 */
export function TestimonialsSection() {
  if (testimonials.length === 0) return null;

  return (
    <Section tone="white" aria-labelledby="testimonials-title" className="border-t border-line">
      <SectionHeading id="testimonials-title" eyebrow="Testimonials" title="What Our Clients Say" />
      <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <li key={`${testimonial.name}-${testimonial.attribution}`}>
            <figure className="flex h-full flex-col rounded-card border border-line bg-light p-7">
              <blockquote className="flex-1 text-[1.0625rem] leading-relaxed text-navy">
                <p>“{testimonial.quote}”</p>
              </blockquote>
              <figcaption className="mt-6 text-[0.9375rem]">
                <span className="font-semibold text-navy">{testimonial.name}</span>
                <span className="block text-muted">{testimonial.attribution}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Section>
  );
}
