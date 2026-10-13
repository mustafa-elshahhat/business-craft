import type { Metadata } from "next";

import { PagePlaceholder, placeholderMetadata } from "@/components/page-placeholder";

export const metadata: Metadata = { title: "About", ...placeholderMetadata };

export default function AboutPage() {
  return <PagePlaceholder eyebrow="About" title="A Practical Digital Partner for Real Businesses" />;
}
