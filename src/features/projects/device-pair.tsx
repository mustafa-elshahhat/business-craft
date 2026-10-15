import Image from "next/image";

import type { ProjectImage } from "@/data/projects";

/**
 * Real desktop capture with the same site's phone capture overlapping its
 * lower right. No device chrome; the phone is only a rounded frame.
 */
export function DevicePair({
  desktop,
  mobile,
  tone = "dark",
  priority = false,
  sizes = "(min-width: 1376px) 1280px, 94vw",
}: {
  desktop: ProjectImage;
  mobile?: ProjectImage;
  tone?: "dark" | "light";
  priority?: boolean;
  sizes?: string;
}) {
  const frame = tone === "dark" ? "media-frame-dark" : "media-frame";
  const ring = tone === "dark" ? "ring-navy" : "ring-light";
  return (
    <div className={`relative ${mobile ? "pb-[9%] sm:pb-[6%]" : ""}`}>
      <div className={`${frame} aspect-[16/10]`}>
        <Image
          src={desktop.src}
          alt={desktop.alt}
          fill
          sizes={sizes}
          placeholder="blur"
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          className="object-cover object-top"
        />
      </div>
      {mobile ? (
        <div className="absolute right-[4%] bottom-0 w-[27%] max-w-[15rem] sm:w-[19%]">
          <div className={`${frame} aspect-[780/1688] !rounded-[10px] ring-4 ${ring} sm:!rounded-[14px] sm:ring-[6px]`}>
            <Image
              src={mobile.src}
              alt={mobile.alt}
              fill
              sizes="(min-width: 640px) 240px, 27vw"
              placeholder="blur"
              loading={priority ? "eager" : "lazy"}
              className="object-cover object-top"
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
