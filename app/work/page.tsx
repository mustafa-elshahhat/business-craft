import type { Metadata } from "next";

import { PagePlaceholder, placeholderMetadata } from "@/components/page-placeholder";

export const metadata: Metadata = { title: "Work", ...placeholderMetadata };

export default function WorkPage() {
  return <PagePlaceholder eyebrow="Our work" title="Selected Work." />;
}
