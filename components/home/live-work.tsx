"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { ArrowUpRight } from "lucide-react";

import type { ProjectImage } from "@/content/projects";

export type LiveProject = {
  slug: string;
  name: string;
  category: string;
  host: string;
  liveUrl: string;
  bilingual: boolean;
  desktop: ProjectImage;
  mobile: ProjectImage;
};

const CYCLE_MS = 6000;

/**
 * Live-work window: real desktop + phone captures of one shipped store at a
 * time, crossfading every 6s. Pauses on hover, focus, hidden document or
 * when off-screen; a tab click jumps there and restarts the progress.
 * Reduced motion: no auto-cycling, tabs still work.
 */
export function LiveWork({ projects }: { projects: LiveProject[] }) {
  const [active, setActive] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(true);
  const [reduced, setReduced] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);

    const onVisibility = () => setVisible((v) => (document.hidden ? false : v));
    document.addEventListener("visibilitychange", onVisibility);

    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting && !document.hidden), {
      threshold: 0.25,
    });
    if (rootRef.current) observer.observe(rootRef.current);

    return () => {
      query.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", onVisibility);
      observer.disconnect();
    };
  }, []);

  const running = !reduced && !hovered && !focused && visible;
  const current = projects[active];

  const select = (index: number) => {
    setActive(index);
    setCycle((c) => c + 1);
  };

  const onTabKey = (event: KeyboardEvent) => {
    const last = projects.length - 1;
    const to =
      event.key === "ArrowRight" ? (active === last ? 0 : active + 1)
      : event.key === "ArrowLeft" ? (active === 0 ? last : active - 1)
      : event.key === "Home" ? 0
      : event.key === "End" ? last
      : null;
    if (to === null) return;
    event.preventDefault();
    select(to);
    tabRefs.current[to]?.focus();
  };

  return (
    <div
      ref={rootRef}
      onPointerEnter={(event) => event.pointerType === "mouse" && setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(event) => {
        if (!rootRef.current?.contains(event.relatedTarget as Node)) setFocused(false);
      }}
    >
      {/* Window */}
      <div id="live-work-panel" role="tabpanel" aria-labelledby={`live-tab-${current.slug}`} className="relative pb-[9%] sm:pb-[6%]">
        <div className="media-frame-dark border-light aspect-[16/10]">
          {projects.map((project, index) => (
            <div
              key={project.slug}
              aria-hidden={index !== active}
              className={`absolute inset-0 ${
                index === active
                  ? "opacity-100 [transition:opacity_450ms_var(--ease-out),transform_450ms_var(--ease-out)]"
                  : "translate-y-1 opacity-0 [transition:opacity_250ms_var(--ease-in),transform_250ms_var(--ease-in)]"
              }`}
            >
              <Image
                src={project.desktop.src}
                alt={project.desktop.alt}
                fill
                sizes="(min-width: 1376px) 1280px, 94vw"
                placeholder="blur"
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "low"}
                className="object-cover object-top"
              />
            </div>
          ))}
        </div>

        {/* Phone capture, overlapping the window's lower right */}
        <div className="absolute right-[4%] bottom-0 w-[27%] max-w-[15rem] sm:w-[19%]">
          <div className="media-frame-dark aspect-[780/1688] !rounded-[10px] ring-4 ring-navy sm:!rounded-[14px] sm:ring-[6px]">
            {projects.map((project, index) => (
              <div
                key={project.slug}
                aria-hidden={index !== active}
                className={`absolute inset-0 ${
                  index === active
                    ? "opacity-100 [transition:opacity_450ms_var(--ease-out)_60ms,transform_450ms_var(--ease-out)_60ms]"
                    : "translate-y-1 opacity-0 [transition:opacity_250ms_var(--ease-in),transform_250ms_var(--ease-in)]"
                }`}
              >
                <Image
                  src={project.mobile.src}
                  alt={project.mobile.alt}
                  fill
                  sizes="(min-width: 640px) 240px, 27vw"
                  placeholder="blur"
                  loading={index === 0 ? "eager" : "lazy"}
                  className="object-cover object-top"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs and live label */}
      <div className="mt-6 flex flex-col gap-5 md:mt-8 md:flex-row md:items-start md:justify-between">
        <div role="tablist" aria-label="Featured live projects" className="grid grid-cols-3 gap-3 md:w-[34rem] md:gap-6">
          {projects.map((project, index) => {
            const selected = index === active;
            return (
              <button
                key={project.slug}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                id={`live-tab-${project.slug}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls="live-work-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => select(index)}
                onKeyDown={onTabKey}
                className="group min-h-11 pt-3 text-left"
              >
                <span aria-hidden="true" className="relative block h-px overflow-hidden bg-line-dark-strong">
                  {selected ? (
                    <span
                      key={cycle}
                      onAnimationEnd={() => select((active + 1) % projects.length)}
                      style={{
                        animationDuration: `${CYCLE_MS}ms`,
                        animationPlayState: running ? "running" : "paused",
                      }}
                      className="absolute inset-0 origin-left bg-accent motion-safe:animate-[progress-fill_linear_both]"
                    />
                  ) : null}
                </span>
                <span
                  className={`mt-3 block text-[0.875rem] font-[540] transition-colors hover-ease ${
                    selected ? "text-white" : "text-mist group-hover:text-white"
                  }`}
                >
                  {project.name}
                </span>
              </button>
            );
          })}
        </div>

        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.8125rem] text-mist md:pt-6">
          <span className="inline-flex items-center gap-2 text-white/85">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
            Live {current.category === "E-commerce" ? "store" : "site"}
          </span>
          <span>{current.bilingual ? "English and Arabic" : null}</span>
          <a
            href={current.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-1 text-white/85 underline decoration-white/30 underline-offset-4 transition-colors hover-ease hover:decoration-white"
          >
            {current.host}
            <ArrowUpRight aria-hidden="true" className="size-3.5" strokeWidth={2} />
            <span className="sr-only"> (opens the live site in a new tab)</span>
          </a>
        </p>
      </div>
    </div>
  );
}
