import Link from "next/link";
import type { ComponentProps } from "react";
import { ArrowRight } from "lucide-react";

const base =
  "group inline-flex min-h-11 items-center justify-center gap-2 rounded-control px-5 text-[0.9375rem] font-[540] tracking-[-0.005em] whitespace-nowrap transition-[background-color,border-color,color] hover-ease active:translate-y-px";

const variants = {
  /** Action blue (#2563EB) keeps white text above 4.5:1. */
  primary: "bg-action text-white hover:bg-[#1d4ed8]",
  /** Hairline outline for light surfaces. */
  "secondary-light": "text-navy shadow-[inset_0_0_0_1px_rgb(11_19_32/0.2)] hover:bg-navy/[0.04]",
} as const;

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: keyof typeof variants;
  arrow?: boolean;
};

export function ButtonLink({ variant = "primary", arrow = false, className = "", children, ...props }: ButtonLinkProps) {
  return (
    <Link className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
      {arrow ? (
        <ArrowRight
          aria-hidden="true"
          className="size-4 transition-transform hover-ease group-hover:translate-x-[3px]"
          strokeWidth={2}
        />
      ) : null}
    </Link>
  );
}

/**
 * Text link: hairline underline that strengthens on hover and an arrow
 * that moves 3px. Used for secondary actions instead of a second button.
 */
export function TextLink({
  tone = "light",
  className = "",
  children,
  ...props
}: ComponentProps<typeof Link> & { tone?: "light" | "dark" }) {
  const colour =
    tone === "dark"
      ? "text-white decoration-white/30 hover:decoration-white"
      : "text-navy decoration-navy/30 hover:decoration-navy";
  return (
    <Link
      className={`group inline-flex min-h-11 items-center gap-2 text-[0.9375rem] font-[540] underline decoration-1 underline-offset-[6px] transition-[text-decoration-color] hover-ease ${colour} ${className}`}
      {...props}
    >
      {children}
      <ArrowRight
        aria-hidden="true"
        className="size-4 transition-transform hover-ease group-hover:translate-x-[3px]"
        strokeWidth={2}
      />
    </Link>
  );
}
