import { NextResponse, type NextRequest } from "next/server";

import { caseStudySlugs, serviceSlugs } from "@/content/routes";

const known: Record<string, readonly string[]> = {
  services: serviceSlugs,
  work: caseStudySlugs,
};

/**
 * Unknown slugs on the dynamic routes would otherwise render the not-found
 * page with a 200 status (the prerendered shell is already streaming).
 * Rewriting to an unmatched path gives the same page with a real 404.
 */
export function proxy(request: NextRequest) {
  const [, section, slug] = request.nextUrl.pathname.split("/");
  if (known[section]?.includes(slug)) return NextResponse.next();
  return NextResponse.rewrite(new URL("/_not-found-page", request.url));
}

export const config = {
  matcher: ["/services/:slug", "/work/:slug"],
};
