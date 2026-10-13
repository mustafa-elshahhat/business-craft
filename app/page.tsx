import type { Metadata } from "next";

import { FeaturedWork } from "@/components/home/featured-work";
import { FinalCta } from "@/components/home/final-cta";
import { Hero } from "@/components/home/hero";
import { ProcessSection } from "@/components/home/process-section";
import { ServicesSection } from "@/components/home/services-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { WhySection } from "@/components/home/why-section";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <FeaturedWork />
      <WhySection />
      <ProcessSection />
      <TestimonialsSection />
      <FinalCta />
    </>
  );
}
