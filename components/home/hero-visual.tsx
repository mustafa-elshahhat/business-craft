import Image, { type StaticImageData } from "next/image";

type HeroVisualProps = {
  name: string;
  liveUrl: string | null;
  desktop: StaticImageData;
  mobile?: StaticImageData;
};

/**
 * Browser + phone composition built from real screenshots of a live
 * Business Craft project. Swap the project to change the showcase.
 */
export function HeroVisual({ name, liveUrl, desktop, mobile }: HeroVisualProps) {
  const host = liveUrl ? new URL(liveUrl).host.replace(/^www\./, "") : null;

  return (
    <figure className="relative">
      <div className="relative pl-[12%] sm:pl-[10%] lg:pl-[8%]">
        {/* Browser window */}
        <div className="overflow-hidden rounded-card border border-white/12 bg-charcoal shadow-[0_40px_80px_-40px_rgb(0_0_0/0.6)]">
          <div className="flex h-8 items-center gap-3 border-b border-white/8 px-4" aria-hidden="true">
            <span className="flex gap-1.5">
              <span className="size-2 rounded-full bg-white/20" />
              <span className="size-2 rounded-full bg-white/20" />
              <span className="size-2 rounded-full bg-white/20" />
            </span>
            {host ? (
              <span className="mx-auto max-w-[60%] truncate rounded-md bg-white/6 px-3 py-0.5 text-[0.6875rem] text-white/55">
                {host}
              </span>
            ) : null}
          </div>
          <Image
            src={desktop}
            alt={`${name} online store, desktop home page`}
            sizes="(min-width: 1376px) 500px, (min-width: 1280px) 38vw, (min-width: 768px) 700px, 88vw"
            loading="eager"
            fetchPriority="high"
            placeholder="blur"
            className="block h-auto w-full"
          />
        </div>

        {/* Phone */}
        {mobile ? (
          <div className="absolute bottom-[-8%] left-0 w-[27%] min-w-[96px] overflow-hidden rounded-[18%/10%] border-[5px] border-charcoal bg-charcoal shadow-[0_30px_60px_-30px_rgb(0_0_0/0.7)] sm:border-[6px]">
            <Image
              src={mobile}
              alt={`${name} online store on mobile`}
              sizes="(min-width: 768px) 200px, 26vw"
              loading="eager"
              placeholder="blur"
              className="block aspect-[9/16] w-full rounded-[15%/8%] object-cover object-top"
            />
          </div>
        ) : null}
      </div>
      <figcaption className="mt-[14%] pl-[12%] text-sm text-white/55 sm:mt-[12%] sm:pl-[10%] lg:pl-[8%]">
        {name} — live online store
      </figcaption>
    </figure>
  );
}
