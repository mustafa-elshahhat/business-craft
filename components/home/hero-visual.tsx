import Image from "next/image";

import type { FeaturedProject } from "@/content/projects";

/**
 * Hero interface composition built from real screenshots of a live project:
 * the desktop page runs to the viewport edge, the mobile page overlaps its
 * lower-left corner. No device chrome, no fake UI.
 */
export function HeroVisual({ project }: { project: FeaturedProject }) {
  const { primary, mobile } = project.media;

  return (
    <figure className="relative">
      <div className="relative bleed-right pl-[22%] lg:pl-0">
        <div className="relative aspect-[16/10] overflow-hidden rounded-l-[4px] bg-charcoal outline outline-1 -outline-offset-1 outline-white/10">
          <Image
            src={primary.src}
            alt={primary.alt}
            fill
            sizes="(min-width: 1024px) 66vw, 85vw"
            loading="eager"
            fetchPriority="high"
            placeholder="blur"
            className="object-cover object-left-top"
          />
        </div>

        {mobile ? (
          <div className="absolute top-[12%] left-0 w-[38%] sm:w-[30%] lg:top-auto lg:bottom-[-16%] lg:-left-[11%] lg:w-[21%]">
            <div className="relative aspect-[9/19] overflow-hidden rounded-[10px] bg-charcoal outline outline-1 -outline-offset-1 outline-white/15 ring-[5px] ring-navy sm:rounded-[14px] sm:ring-[7px]">
              <Image
                src={mobile.src}
                alt={mobile.alt}
                fill
                sizes="(min-width: 1024px) 15vw, (min-width: 640px) 30vw, 38vw"
                loading="eager"
                placeholder="blur"
                className="object-cover object-top"
              />
            </div>
          </div>
        ) : null}
      </div>

      <figcaption className="mt-[calc(37%+1.5rem)] flex items-baseline gap-3 text-sm text-white/60 sm:mt-[calc(20%+1.5rem)] lg:mt-6 lg:pl-[12%]">
        <span className="font-medium text-white">{project.name}</span>
        <span aria-hidden="true" className="h-px w-6 translate-y-[-0.25em] bg-white/30" />
        <span>Live online store</span>
      </figcaption>
    </figure>
  );
}
