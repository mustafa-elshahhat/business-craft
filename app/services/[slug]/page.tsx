import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PagePlaceholder, placeholderMetadata } from "@/components/page-placeholder";
import { services } from "@/content/services";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

function findService(slug: string) {
  return services.find((service) => service.slug === slug);
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const service = findService((await params).slug);
  return service ? { title: service.title, ...placeholderMetadata } : {};
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const service = findService((await params).slug);
  if (!service) notFound();

  return (
    <PagePlaceholder eyebrow="Services" title={service.title}>
      <p>{service.summary}</p>
    </PagePlaceholder>
  );
}
