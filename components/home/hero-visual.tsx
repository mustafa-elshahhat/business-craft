import Image from "next/image";

import type { FeaturedProject } from "@/content/projects";

/**
 * Hero media built from real screenshots of one live project: a raw desktop
 * crop cut with the monogram's top-bar angle and bleeding off the right edge,
 * and the same site on a phone overlapping its lower-left corner.
 * No device chrome, no invented UI.
 */
export function HeroVisual({ project }: { project: FeaturedProject }) {
  const { cover, primary, mobile } = project.media;
  const main = cover ?? primary;

  return (
    <figure className="relative bleed-right">
      <div className="relative ml-[30%] lg:ml-0">
        {/* Offset rule continuing the image's top edge to the left */}
        <span aria-hidden="true" className="absolute top-0 right-full hidden h-px w-[28%] bg-line-dark lg:block" />
        <div className="enter-wipe relative">
          <div className="facet-tl relative aspect-[6/5] overflow-hidden bg-charcoal">
            <Image
              src={main.src}
              alt={main.alt}
              fill
              sizes="(min-width: 1280px) 45vw, (min-width: 1024px) 38vw, 76vw"
              loading="eager"
              fetchPriority="high"
              placeholder="blur"
              className="object-cover object-left-top"
            />
          </div>
          <span aria-hidden="true" className="facet-mark absolute top-0 left-0 bg-accent" />
        </div>

        {mobile ? (
          <div className="enter-fade absolute bottom-[-16%] left-[-38%] w-[34%] lg:bottom-[-14%] lg:left-[-29%] lg:w-[26%]">
            <div className="relative aspect-[780/1688] overflow-hidden rounded-[6px] bg-charcoal outline outline-1 -outline-offset-1 outline-white/15 ring-[6px] ring-navy">
              <Image
                src={mobile.src}
                alt={mobile.alt}
                fill
                sizes="(min-width: 1024px) 12vw, 26vw"
                loading="eager"
                placeholder="blur"
                className="object-cover object-top"
              />
            </div>
          </div>
        ) : null}
      </div>

      <figcaption className="mt-4 ml-[30%] flex flex-wrap items-baseline gap-x-3 gap-y-1 pr-[var(--gutter)] text-[0.8125rem] text-white/60 lg:mt-5 lg:ml-[12%]">
        <span className="font-medium text-white">{project.name}</span>
        <span aria-hidden="true" className="h-px w-6 translate-y-[-0.3em] bg-white/30" />
        <span>Live online store</span>
      </figcaption>
    </figure>
  );
}
