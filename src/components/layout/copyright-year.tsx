import { cacheLife } from "next/cache";

/**
 * Current year for the footer. Cached so the static shell can prerender
 * (Cache Components disallows uncached `new Date()`), refreshed daily.
 */
export async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}
