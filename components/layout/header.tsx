import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { primaryCta } from "@/lib/site";

import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";
import { NavLinks } from "./nav-links";

/**
 * Site header. Sits on navy so it dissolves into the dark hero that opens
 * every page: no rule, small type, a rectangular hairline CTA.
 */
export function Header() {
  return (
    <header className="relative z-50 bg-navy text-white">
      <Container className="flex h-16 items-center justify-between gap-6 md:h-20">
        <Logo surface="dark" className="h-7 md:h-8" />

        <div className="flex items-center gap-4 xl:gap-8">
          <nav aria-label="Main" className="hidden lg:block">
            <NavLinks />
          </nav>
          <div className="hidden sm:block">
            <ButtonLink href={primaryCta.href} variant="quiet">
              {primaryCta.label}
            </ButtonLink>
          </div>
          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}
