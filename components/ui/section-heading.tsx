import type { ReactNode } from "react";

type SectionHeadingProps = {
  id: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  tone?: "light" | "dark";
  className?: string;
};

/** Eyebrow + H2 + optional intro. `id` labels the parent section. */
export function SectionHeading({ id, eyebrow, title, intro, tone = "light", className = "" }: SectionHeadingProps) {
  const dark = tone === "dark";
  return (
    <div className={className}>
      <p className={`text-eyebrow uppercase ${dark ? "text-accent" : "text-action"}`}>{eyebrow}</p>
      <h2 id={id} className="mt-4 text-h2 text-balance">
        {title}
      </h2>
      {intro ? (
        <p className={`mt-5 max-w-[36rem] text-lead text-pretty ${dark ? "text-white/70" : "text-muted"}`}>{intro}</p>
      ) : null}
    </div>
  );
}
