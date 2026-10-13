import Link from "next/link";
import type { ComponentProps } from "react";
import { ArrowRight } from "lucide-react";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-control tracking-[-0.005em] transition-[background-color,border-color,color,filter,transform] duration-300 ease-out-soft";

const standard = "min-h-12 px-6 text-[0.9375rem] font-semibold";

const variants = {
  /** Action blue (#2563EB) keeps white text above 4.5:1. */
  primary: `${standard} bg-action text-white hover:brightness-90 active:translate-y-px`,
  /** Outline for dark (navy) surfaces. */
  "secondary-dark": `${standard} border border-white/30 text-white hover:border-white/60 hover:bg-white/5`,
  /** Outline for light surfaces. */
  "secondary-light": `${standard} border border-navy text-navy hover:bg-navy hover:text-white`,
  /** Compact, quiet outline used in the header so it never competes with the H1. */
  quiet: "min-h-11 border border-white/22 px-4 text-sm font-medium text-white hover:border-white/55 hover:bg-white/5",
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
          className="size-4 transition-transform duration-300 ease-out-soft group-hover:translate-x-0.5"
          strokeWidth={2}
        />
      ) : null}
    </Link>
  );
}

/**
 * Editorial text link: thin underline that strengthens on hover, arrow that
 * nudges forward. Used for secondary actions instead of a second button.
 */
export function TextLink({
  tone = "light",
  className = "",
  children,
  ...props
}: ComponentProps<typeof Link> & { tone?: "light" | "dark" }) {
  const colour =
    tone === "dark"
      ? "text-white decoration-white/35 hover:decoration-white"
      : "text-navy decoration-navy/30 hover:decoration-navy";
  return (
    <Link
      className={`group inline-flex min-h-11 items-center gap-2 text-[0.9375rem] font-semibold underline decoration-1 underline-offset-[6px] transition-[text-decoration-color] duration-300 ${colour} ${className}`}
      {...props}
    >
      {children}
      <ArrowRight
        aria-hidden="true"
        className="size-4 transition-transform duration-300 ease-out-soft group-hover:translate-x-1"
        strokeWidth={2}
      />
    </Link>
  );
}
