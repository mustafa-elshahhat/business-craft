import type { ReactNode } from "react";

import { Container } from "@/components/ui/container";

import { Breadcrumbs, type Crumb } from "./breadcrumbs";

/**
 * Inner-page hero on navy: breadcrumb, two-tone H1, lead and optional
 * actions, with an optional media slot that runs below. Uses the same
 * single entrance as the homepage hero (lines rise, lead follows).
 */
export function PageHero({
  crumbs,
  title,
  rest,
  lead,
  actions,
  aside,
  children,
}: {
  crumbs: Crumb[];
  title: string;
  rest?: string;
  lead?: ReactNode;
  actions?: ReactNode;
  /** Right column on desktop (facts, links). */
  aside?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section aria-labelledby="page-title" data-header="dark" className="bg-navy text-white">
      <Container className="pt-[calc(var(--header-h)+1.5rem)] pb-16 md:pt-[calc(var(--header-h)+2.5rem)] md:pb-24">
        <Breadcrumbs crumbs={crumbs} />
        <div className="mt-10 grid gap-y-8 md:mt-16 xl:grid-cols-12 xl:items-end xl:gap-x-10">
          <h1 id="page-title" className="text-h1 text-balance xl:col-span-8">
            <span className="enter-line block" style={{ "--i": 0 } as React.CSSProperties}>
              {title}
            </span>
            {rest ? (
              <span className="enter-line block text-mist" style={{ "--i": 1 } as React.CSSProperties}>
                {rest}
              </span>
            ) : null}
          </h1>
          {lead || actions || aside ? (
            <div className="enter-rise xl:col-span-4 xl:pb-1">
              {lead ? <div className="max-w-[28rem] text-base leading-relaxed text-mist md:text-[1.0625rem]">{lead}</div> : null}
              {actions ? <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">{actions}</div> : null}
              {aside}
            </div>
          ) : null}
        </div>
        {children ? <div className="enter-window mt-12 empty:hidden md:mt-16">{children}</div> : null}
      </Container>
    </section>
  );
}
