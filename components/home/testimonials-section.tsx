import { Container } from "@/components/ui/container";
import { testimonials } from "@/content/testimonials";

/**
 * Renders only when verified, approved testimonials exist in
 * content/testimonials.ts. With none, the homepage omits the section.
 */
export function TestimonialsSection() {
  if (testimonials.length === 0) return null;

  return (
    <section aria-labelledby="testimonials-title" className="bg-white py-24 text-navy lg:py-36">
      <Container>
        <p className="text-eyebrow uppercase text-action">Clients</p>
        <h2 id="testimonials-title" className="mt-5 text-h2">
          What Our Clients Say
        </h2>
        <ul className="mt-14 border-b border-line-strong">
          {testimonials.map((testimonial) => (
            <li key={`${testimonial.name}-${testimonial.attribution}`} className="border-t border-line-strong py-12">
              <figure className="grid gap-6 lg:grid-cols-12 lg:gap-x-10">
                <blockquote className="text-[clamp(1.375rem,1.1rem+1vw,2rem)] leading-snug font-medium tracking-[-0.02em] lg:col-span-8">
                  <p>“{testimonial.quote}”</p>
                </blockquote>
                <figcaption className="text-[0.9375rem] lg:col-span-3 lg:col-start-10">
                  <span className="font-semibold">{testimonial.name}</span>
                  <span className="block text-muted">{testimonial.attribution}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
