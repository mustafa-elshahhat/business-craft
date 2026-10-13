import type { Metadata } from "next";

import { FeaturedWork } from "@/components/home/featured-work";
import { FinalCta } from "@/components/home/final-cta";
import { Hero } from "@/components/home/hero";
import { MotionObserver } from "@/components/home/motion-observer";
import { ProcessSection } from "@/components/home/process-section";
import { ServicesSection } from "@/components/home/services-section";
import { StorySection } from "@/components/home/story-section";
import { WhySection } from "@/components/home/why-section";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/**
 * Homepage, "Live Work" direction: real shipped work, precise motion and a
 * calm business presentation. Testimonials stay out until real, approved
 * quotes exist (docs/CONTENT_AND_PROJECTS.md §5).
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <FeaturedWork />
      <StorySection />
      <WhySection />
      <ProcessSection />
      <FinalCta />
      <MotionObserver />
    </>
  );
}
