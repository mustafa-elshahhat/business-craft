import type { Metadata } from "next";

import { MotionObserver } from "@/components/layout/motion-observer";
import { ClosingCta } from "@/components/sections/closing-cta";
import { FeaturedWork } from "@/components/sections/home/featured-work";
import { Hero } from "@/components/sections/home/hero";
import { ServicesSection } from "@/components/sections/home/services-section";
import { WhySection } from "@/components/sections/home/why-section";
import { ProcessSection } from "@/components/sections/process-section";
import { StorySection } from "@/components/sections/story-section";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = pageMetadata({ description: siteConfig.description, path: "/" });

/**
 * Homepage, "Live Work" direction: real shipped work, precise motion and a
 * calm business presentation. Testimonials stay out until real, approved
 * quotes exist.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <FeaturedWork />
      <StorySection />
      <WhySection />
      <ProcessSection
        lead="A Simple Process for Great Results."
        rest="From first conversation to launch."
        text="A clear, straightforward path, with you involved at every step."
      />
      <ClosingCta />
      <MotionObserver />
    </>
  );
}
