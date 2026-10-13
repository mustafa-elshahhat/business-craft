/**
 * Client testimonials.
 *
 * Add an entry only when it is from a real client, the wording is approved
 * for publication and the attribution is accurate
 * (docs/CONTENT_AND_PROJECTS.md §5). The homepage section renders nothing
 * while this list is empty.
 */
export type Testimonial = {
  quote: string;
  name: string;
  /** Role and/or company, exactly as approved by the client. */
  attribution: string;
};

export const testimonials: readonly Testimonial[] = [];
