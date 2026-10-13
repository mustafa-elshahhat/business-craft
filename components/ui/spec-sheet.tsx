import type { ReactNode } from "react";

export function Capabilities({ items, tone = "light" }: { items: string[]; tone?: "light" | "dark" }) {
  const line = tone === "dark" ? "border-line-dark" : "border-line";
  return (
    <ul className={`grid content-start border-t ${line}`}>
      {items.map((item) => (
        <li key={item} className={`border-b ${line} py-2.5 text-[0.9375rem] ${tone === "dark" ? "text-white/90" : ""}`}>
          {item}
        </li>
      ))}
    </ul>
  );
}

/**
 * Typographic spec sheet: a deliberate, minimal panel built from type,
 * hairlines and one state label. Blue marks real, confirmed state only.
 */
export function SpecSheet({
  label,
  state,
  statement,
  detail,
  items,
  footer,
}: {
  label: string;
  state: { text: string; confirmed: boolean };
  statement: string;
  detail: string;
  items?: string[];
  footer?: ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-[12px] bg-navy text-white">
      <div className="flex items-center justify-between gap-4 border-b border-line-dark px-6 py-4 sm:px-10">
        <p className="text-label text-mist uppercase">{label}</p>
        <p className="flex items-center gap-2 text-[0.8125rem] text-white/80">
          {state.confirmed ? <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" /> : null}
          {state.text}
        </p>
      </div>
      <div className={`grid gap-10 px-6 py-8 sm:px-10 sm:py-12 ${items ? "md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] md:gap-x-12" : ""}`}>
        <p className="max-w-[18ch] text-[clamp(1.75rem,1.2rem+1.9vw,2.625rem)] leading-[1.08] font-[540] tracking-[-0.028em]">
          {statement} <span className="text-mist">{detail}</span>
        </p>
        {items ? <Capabilities items={items} tone="dark" /> : null}
      </div>
      {footer ? <div className="border-t border-line-dark">{footer}</div> : null}
    </div>
  );
}
