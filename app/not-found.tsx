import type { Metadata } from "next";

import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <section aria-labelledby="not-found-title" className="bg-navy text-white">
      <Container className="py-24 md:py-32">
        <p className="text-eyebrow uppercase text-accent">404</p>
        <h1 id="not-found-title" className="mt-4 text-h2">
          Page not found
        </h1>
        <p className="mt-5 max-w-[34rem] text-lead text-white/72">
          The page you are looking for does not exist or has moved.
        </p>
        <ButtonLink href="/" className="mt-9">
          Back to Home
        </ButtonLink>
      </Container>
    </section>
  );
}
