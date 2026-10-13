"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

import { serviceHref, type Service } from "@/content/services";

type Shot = { src: StaticImageData; alt: string };

export type ServiceVisual = { caption: [string, string] } & (
  | { kind: "image"; image: Shot }
  | { kind: "phones"; images: [Shot, Shot] }
  | { kind: "list"; items: string[] }
);

type Row = Service & { visual: ServiceVisual };

/** The visual for one service. Shared by the desktop stage and mobile rows. */
function Visual({ visual, sizes, frame }: { visual: ServiceVisual; sizes: string; frame: string }) {
  if (visual.kind === "image") {
    return (
      <div className={`relative overflow-hidden bg-navy ${frame}`}>
        <Image
          src={visual.image.src}
          alt={visual.image.alt}
          fill
          sizes={sizes}
          placeholder="blur"
          className="object-cover object-left-top"
        />
      </div>
    );
  }

  if (visual.kind === "phones") {
    return (
      <div className={`relative grid grid-cols-2 items-start gap-[6%] overflow-hidden bg-navy px-[12%] pt-[8%] ${frame}`}>
        {visual.images.map((image, index) => (
          <div
            key={image.alt}
            className={`relative aspect-[780/1688] overflow-hidden rounded-[6px] outline outline-1 -outline-offset-1 outline-white/15 ${
              index === 1 ? "mt-[22%]" : ""
            }`}
          >
            <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 16vw, 36vw" placeholder="blur" className="object-cover object-top" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`relative flex flex-col justify-between overflow-hidden bg-navy p-[8%] text-white ${frame}`}>
      <p className="text-[0.6875rem] font-medium tracking-[0.18em] text-white/55 uppercase">Systems in the portfolio</p>
      <ul className="border-t border-line-dark">
        {visual.items.map((item) => (
          <li
            key={item}
            className="flex items-baseline justify-between gap-6 border-b border-line-dark py-[3.5%] text-[clamp(1.25rem,0.8rem+1.5vw,2rem)] font-semibold tracking-[-0.03em]"
          >
            {item}
            <span aria-hidden="true" className="size-1.5 shrink-0 bg-accent" />
          </li>
        ))}
      </ul>
    </div>
  );
}

function Caption({ caption }: { caption: [string, string] }) {
  return (
    <p className="mt-4 flex flex-wrap items-baseline gap-x-3 text-[0.8125rem] text-muted">
      <span className="font-medium text-navy">{caption[0]}</span>
      <span aria-hidden="true" className="h-px w-6 translate-y-[-0.3em] bg-line-strong" />
      {caption[1]}
    </p>
  );
}

/**
 * Editorial service index. On desktop, hovering or focusing a row changes
 * the stage on the right (diagonal wipe, no carousel chrome). On mobile each
 * row carries its own visual in a vertical sequence.
 */
export function ServiceIndex({ services }: { services: Row[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="mt-16 grid lg:mt-24 lg:grid-cols-12 lg:gap-x-10">
      <ol className="border-b border-line-strong lg:col-span-6">
        {services.map((service, index) => {
          const isActive = index === active;
          return (
            <li
              key={service.slug}
              onMouseEnter={() => setActive(index)}
              className="group relative border-t border-line-strong has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-accent"
            >
              {/* Active rule draws across in blue */}
              <span
                aria-hidden="true"
                className={`absolute inset-x-0 -top-px h-px origin-left scale-x-0 bg-action transition-transform duration-700 ease-out-soft ${
                  isActive ? "lg:scale-x-100" : ""
                }`}
              />
              <div className="grid grid-cols-[2.75rem_1fr_auto] gap-x-3 pt-7 pb-8 sm:grid-cols-[4rem_1fr_auto] lg:py-9">
                <span
                  className={`pt-[0.55em] text-[0.8125rem] font-medium tabular-nums transition-colors duration-500 ${
                    isActive ? "lg:text-action" : ""
                  } text-muted`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3
                  className={`text-[clamp(2.25rem,1.2rem+3.6vw,4.25rem)] leading-[1] font-bold tracking-[-0.045em] transition-[color,transform] duration-500 ease-out-soft ${
                    isActive ? "lg:translate-x-2" : ""
                  }`}
                >
                  <Link
                    href={serviceHref(service.slug)}
                    onFocus={() => setActive(index)}
                    className="outline-none after:absolute after:inset-0 after:content-['']"
                  >
                    {service.title}
                  </Link>
                </h3>
                <ArrowRight
                  aria-hidden="true"
                  className={`mt-[0.6em] size-6 text-navy transition-[transform,color] duration-500 ease-out-soft lg:size-7 ${
                    isActive ? "lg:translate-x-1.5 lg:text-action" : ""
                  }`}
                  strokeWidth={1.5}
                />
                <p className="col-start-2 col-end-4 mt-4 max-w-[30rem] text-[0.9375rem] leading-relaxed text-muted lg:mt-5">
                  {service.summary}
                </p>
                {/* Mobile and tablet: the row's own visual */}
                <div aria-hidden="true" className="col-start-1 col-end-4 mt-8 sm:col-start-2 lg:hidden">
                  <Visual visual={service.visual} sizes="(min-width: 640px) 84vw, 92vw" frame="aspect-[4/3]" />
                  <Caption caption={service.visual.caption} />
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      {/* Desktop stage */}
      <div aria-hidden="true" className="hidden lg:col-span-6 lg:block">
        <div className="sticky top-12 bleed-right">
          <div className="facet-br relative">
            {services.map((service, index) => (
              <div
                key={service.slug}
                className={`transition-[clip-path] ease-out-soft ${index === 0 ? "relative" : "absolute inset-0"} ${
                  index === active
                    ? "z-10 duration-700 [clip-path:polygon(0_0,140%_0,100%_100%,-40%_100%)]"
                    : "z-0 duration-0 [transition-delay:700ms] [clip-path:polygon(0_0,0_0,-40%_100%,-40%_100%)]"
                }`}
              >
                <Visual visual={service.visual} sizes="45vw" frame="aspect-square" />
              </div>
            ))}
          </div>
          <div className="relative h-10 overflow-hidden pr-[var(--gutter)]">
            {services.map((service, index) => (
              <div
                key={service.slug}
                className={`absolute inset-x-0 transition-[opacity,transform] duration-500 ease-out-soft ${
                  index === active ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                }`}
              >
                <Caption caption={service.visual.caption} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
