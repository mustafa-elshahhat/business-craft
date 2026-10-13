/**
 * Small two-tone facet taken from the B monogram's folded lower corner.
 * Decorative only: the logo's own blues stay in the logo; this uses the
 * UI accent and action blues.
 */
export function Facet({ className = "size-2.5" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 10 10" className={`shrink-0 ${className}`}>
      <path d="M0 0H10L0 10Z" fill="var(--color-accent)" />
      <path d="M10 0V10H0Z" fill="var(--color-action)" opacity="0.55" />
    </svg>
  );
}
