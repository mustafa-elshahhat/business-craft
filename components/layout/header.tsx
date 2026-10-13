import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { primaryCta } from "@/lib/site";

import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";
import { NavLinks } from "./nav-links";

/**
 * Site header. Sits on navy so it flows straight into the dark hero that
 * opens every page (docs/PAGE_BLUEPRINTS.md: "visually quiet").
 */
export function Header() {
  return (
    <header className="relative z-50 bg-navy text-white">
      <Container className="flex h-18 items-center justify-between gap-6 md:h-20">
        <Logo surface="dark" className="h-8 md:h-9" />

        <div className="flex items-center gap-6 xl:gap-10">
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
