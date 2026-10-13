import type { ComponentPropsWithoutRef } from "react";

import { Container } from "./container";

const tones = {
  navy: "bg-navy text-white",
  light: "bg-light text-navy",
  white: "bg-white text-navy",
} as const;

export type SectionTone = keyof typeof tones;

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  tone?: SectionTone;
  /** Skip the inner Container when a section needs full-bleed content. */
  bare?: boolean;
};

/** Vertical rhythm: 64px mobile, 88px tablet, 120px desktop. */
export function Section({ tone = "light", bare = false, className = "", children, ...props }: SectionProps) {
  return (
    <section className={`${tones[tone]} py-16 md:py-22 lg:py-30 ${className}`} {...props}>
      {bare ? children : <Container>{children}</Container>}
    </section>
  );
}
