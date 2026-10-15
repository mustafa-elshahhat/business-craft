import Link from "next/link";

import { JsonLd } from "@/components/ui/json-ld";
import { siteConfig } from "@/lib/site";

export type Crumb = { label: string; href: string };

/** Breadcrumb trail (Home is implied) with BreadcrumbList data when the site URL is set. */
export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  const trail = [{ label: "Home", href: "/" }, ...crumbs];
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-2 text-[0.8125rem] text-mist">
        {trail.map((crumb, index) => {
          const last = index === trail.length - 1;
          return (
            <li key={crumb.href} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="text-white/85">
                  {crumb.label}
                </span>
              ) : (
                <>
                  <Link href={crumb.href} className="inline-flex min-h-11 items-center transition-colors hover-ease hover:text-white">
                    {crumb.label}
                  </Link>
                  <span aria-hidden="true">/</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
      {siteConfig.url ? (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: trail.map((crumb, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: crumb.label,
              item: `${siteConfig.url}${crumb.href === "/" ? "" : crumb.href}`,
            })),
          }}
        />
      ) : null}
    </nav>
  );
}
