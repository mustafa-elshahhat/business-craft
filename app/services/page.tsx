import type { Metadata } from "next";

import { PagePlaceholder, placeholderMetadata } from "@/components/page-placeholder";

export const metadata: Metadata = { title: "Services", ...placeholderMetadata };

export default function ServicesPage() {
  return <PagePlaceholder eyebrow="Services" title="Digital Solutions Built Around Your Business" />;
}
