import type { Metadata } from "next";

import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <section aria-labelledby="not-found-title" data-header="dark" className="bg-navy text-white">
      <Container className="pt-[calc(var(--header-h)+6rem)] pb-24 md:pt-[calc(var(--header-h)+8rem)] md:pb-32">
        <p className="text-label uppercase text-mist">404</p>
        <h1 id="not-found-title" className="mt-4 text-h2">
          Page not found
        </h1>
        <p className="mt-5 max-w-[34rem] text-lead text-mist">
          The page you are looking for does not exist or has moved.
        </p>
        <ButtonLink href="/" className="mt-9">
          Back to Home
        </ButtonLink>
      </Container>
    </section>
  );
}
