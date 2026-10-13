import Link from "next/link";
import type { ComponentProps } from "react";
import { ArrowRight } from "lucide-react";

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-control px-6 text-[0.9375rem] font-semibold tracking-[-0.005em] transition-[background-color,border-color,color,filter,transform] duration-300 ease-out-soft";

const variants = {
  /** Action blue (#2563EB) keeps white text above 4.5:1. */
  primary: "bg-action text-white hover:brightness-90 active:translate-y-px",
  /** Outline for dark (navy) surfaces. */
  "secondary-dark": "border border-white/30 text-white hover:border-white/60 hover:bg-white/5",
  /** Outline for light surfaces. */
  "secondary-light": "border border-navy text-navy hover:bg-navy hover:text-white",
} as const;

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: keyof typeof variants;
  arrow?: boolean;
};

export function ButtonLink({ variant = "primary", arrow = false, className = "", children, ...props }: ButtonLinkProps) {
  return (
    <Link className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
      {arrow ? <ArrowRight aria-hidden="true" className="size-4" strokeWidth={2} /> : null}
    </Link>
  );
}

/** Quiet inline text link with an arrow, used for secondary actions. */
export function TextLink({
  tone = "light",
  className = "",
  children,
  ...props
}: ComponentProps<typeof Link> & { tone?: "light" | "dark" }) {
  const colour = tone === "dark" ? "text-white hover:text-white/80" : "text-action hover:text-navy";
  return (
    <Link
      className={`group inline-flex min-h-11 items-center gap-1.5 text-[0.9375rem] font-semibold transition-colors duration-300 ${colour} ${className}`}
      {...props}
    >
      {children}
      <ArrowRight
        aria-hidden="true"
        className="size-4 transition-transform duration-300 ease-out-soft group-hover:translate-x-0.5"
        strokeWidth={2}
      />
    </Link>
  );
}
