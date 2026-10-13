import Image from "next/image";
import Link from "next/link";

import { brandAssets } from "@/lib/site";

type LogoProps = {
  /** Background the logo sits on: "dark" uses the light-wordmark asset. */
  surface: "dark" | "light";
  /** Height classes; width follows the locked aspect ratio. */
  className?: string;
};

/** Locked compact logo (docs/BRAND_ASSETS.md). Never recolour or alter. */
export function Logo({ surface, className = "h-9 md:h-10" }: LogoProps) {
  const asset = brandAssets.compactLogo[surface];
  return (
    <Link href="/" aria-label="Business Craft home" className="inline-flex min-h-11 shrink-0 items-center rounded-sm">
      <Image
        src={asset.src}
        alt=""
        width={Math.round(asset.width / 10)}
        height={Math.round(asset.height / 10)}
        unoptimized
        loading="eager"
        className={`w-auto ${className}`}
      />
    </Link>
  );
}
