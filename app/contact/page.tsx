import type { Metadata } from "next";

import { PagePlaceholder, placeholderMetadata } from "@/components/page-placeholder";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = { title: "Contact", ...placeholderMetadata };

export default function ContactPage() {
  const { email } = siteConfig.contact;
  return (
    <PagePlaceholder
      eyebrow="Get a free consultation"
      title="Tell Us About Your Project"
      action={email ? { label: `Email ${email}`, href: `mailto:${email}` } : { label: "See Our Work", href: "/work" }}
    />
  );
}
