import Image from "next/image";
import Link from "next/link";

import { ButtonLink } from "@/components/ui/button";
import { brandAssets, primaryCta } from "@/lib/site";

import { DesktopNav } from "./desktop-nav";
import { HeaderTheme } from "./header-theme";
import { MobileMenu } from "./mobile-menu";

/**
 * Fixed, theme-aware site header (64px). Over dark chapters it is translucent
 * navy; over light chapters it turns light with navy text. Sections opt in
 * with data-header="dark|light"; <HeaderTheme> keeps data-theme in sync.
 */
export function Header() {
  const dark = brandAssets.compactLogo.dark;
  const light = brandAssets.compactLogo.light;

  return (
    <header
      id="site-header"
      data-theme="dark"
      className="group/header fixed inset-x-0 top-0 z-50 h-[var(--header-h)] text-white data-[theme=light]:text-navy"
    >
      {/* Surface: colour, blur and hairline crossfade with the theme */}
      <div
        aria-hidden="true"
        className="absolute inset-0 border-b border-line-dark bg-navy/80 backdrop-blur-[16px] backdrop-saturate-150 transition-[background-color,border-color] duration-[250ms] ease-[cubic-bezier(.4,0,.2,1)] group-data-[theme=light]/header:border-line group-data-[theme=light]/header:bg-light/85"
      />

      <div className="relative mx-auto flex h-full w-full max-w-[86rem] items-center justify-between gap-6 px-5 sm:px-6 md:px-8 xl:px-12">
        <Link href="/" aria-label="Business Craft home" className="relative inline-flex min-h-11 shrink-0 items-center">
          {/* Both locked logo variants; the theme decides which one shows. */}
          <Image
            src={dark.src}
            alt=""
            width={Math.round(dark.width / 10)}
            height={Math.round(dark.height / 10)}
            unoptimized
            loading="eager"
            className="h-7 w-auto transition-opacity duration-[250ms] group-data-[theme=light]/header:opacity-0"
          />
          <Image
            src={light.src}
            alt=""
            width={Math.round(light.width / 10)}
            height={Math.round(light.height / 10)}
            unoptimized
            loading="eager"
            className="absolute top-1/2 left-0 h-7 w-auto -translate-y-1/2 opacity-0 transition-opacity duration-[250ms] group-data-[theme=light]/header:opacity-100"
          />
        </Link>

        <div className="flex items-center gap-3 lg:gap-8">
          <DesktopNav />
          <div className="hidden sm:block">
            <ButtonLink href={primaryCta.href} className="!px-4 !text-sm">
              {primaryCta.label}
            </ButtonLink>
          </div>
          <MobileMenu />
        </div>
      </div>

      <HeaderTheme />
    </header>
  );
}
