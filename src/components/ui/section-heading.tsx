import type { ReactNode } from "react";

/**
 * Two-tone section heading: a statement in full colour, then an elaboration
 * in the muted tone. Used sparingly; sections vary their composition.
 */
export function TwoTone({ lead, rest, tone = "light" }: { lead: ReactNode; rest?: ReactNode; tone?: "light" | "dark" }) {
  return (
    <>
      {lead}
      {rest ? (
        <>
          {" "}
          <span className={tone === "dark" ? "text-mist" : "text-muted"}>{rest}</span>
        </>
      ) : null}
    </>
  );
}

/** Small uppercase structural label. */
export function Label({ children, tone = "light", className = "" }: { children: ReactNode; tone?: "light" | "dark"; className?: string }) {
  return (
    <p className={`text-label uppercase ${tone === "dark" ? "text-mist" : "text-muted"} ${className}`}>{children}</p>
  );
}
