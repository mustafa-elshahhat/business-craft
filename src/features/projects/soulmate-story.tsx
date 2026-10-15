"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";

import type { BuilderStep } from "@/data/case-studies";

const STEP_MS = 6000;

/**
 * The Soulmate box-builder story: four real interface states. Steps advance
 * every 6s only while the section is in view and nobody is interacting;
 * choosing a step stops the auto-advance. Only the active and next states
 * are mounted, so inactive media is not downloaded early.
 * Reduced motion: no auto-advance; steps remain fully interactive.
 */
export function SoulmateStory({ steps }: { steps: BuilderStep[] }) {
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState<Set<number>>(() => new Set([0]));
  const [inView, setInView] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [manual, setManual] = useState(false);
  const [reduced, setReduced] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) setMounted((current) => (current.has(1) ? current : new Set([...current, 1])));
      },
      { threshold: 0.4 },
    );
    if (rootRef.current) observer.observe(rootRef.current);
    const onVisibility = () => document.hidden && setInView(false);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      query.removeEventListener("change", update);
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  // Mount a state (and pre-mount the one after it) only when it is needed.
  const mount = (...indices: number[]) =>
    setMounted((current) => {
      const next = new Set(current);
      indices.forEach((index) => next.add(index % steps.length));
      return next.size === current.size ? current : next;
    });

  const go = (index: number) => {
    setActive(index);
    mount(index, index + 1);
  };

  const running = !reduced && !manual && inView && !hovered && !focused;

  const choose = (index: number) => {
    setManual(true);
    go(index);
  };

  const onKey = (event: KeyboardEvent) => {
    const last = steps.length - 1;
    const to =
      event.key === "ArrowDown" || event.key === "ArrowRight" ? (active === last ? 0 : active + 1)
      : event.key === "ArrowUp" || event.key === "ArrowLeft" ? (active === 0 ? last : active - 1)
      : event.key === "Home" ? 0
      : event.key === "End" ? last
      : null;
    if (to === null) return;
    event.preventDefault();
    choose(to);
    tabRefs.current[to]?.focus();
  };

  return (
    <div
      ref={rootRef}
      className="grid gap-y-8 lg:grid-cols-12 lg:items-center lg:gap-x-10"
      onPointerEnter={(event) => event.pointerType === "mouse" && setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(event) => {
        if (!rootRef.current?.contains(event.relatedTarget as Node)) setFocused(false);
      }}
    >
      <div role="tablist" aria-label="Box builder steps" aria-orientation="vertical" className="lg:col-span-4">
        {steps.map((step, index) => {
          const selected = index === active;
          return (
            <button
              key={step.title}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              id={`story-tab-${index}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls="story-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => choose(index)}
              onKeyDown={onKey}
              className="group relative block w-full border-t border-line py-4 pl-6 text-left last:border-b lg:py-5"
            >
              {/* Active marker: the progress itself runs above the stage */}
              <span
                aria-hidden="true"
                className={`absolute top-4 bottom-4 left-0 w-0.5 transition-colors duration-300 lg:top-5 lg:bottom-5 ${selected ? "bg-action" : "bg-line"}`}
              />
              <span className="flex items-baseline gap-3">
                <span className="w-5 shrink-0 text-[0.8125rem] tabular-nums text-muted">{index + 1}</span>
                <span className={`text-[1.0625rem] font-[540] tracking-[-0.01em] transition-colors duration-300 lg:text-[1.125rem] ${selected ? "text-navy" : "text-muted group-hover:text-navy"}`}>
                  {step.title}
                </span>
                {step.optional ? <span className="text-[0.8125rem] text-muted">(optional)</span> : null}
              </span>
              <span className={`mt-2 ml-8 max-w-[24rem] text-[0.9375rem] leading-relaxed text-muted lg:block ${selected ? "block" : "hidden"}`}>
                {step.text}
              </span>
            </button>
          );
        })}
      </div>

      <div id="story-panel" role="tabpanel" aria-labelledby={`story-tab-${active}`} className="order-first lg:order-none lg:col-span-8 xl:-mr-8">
        {/* Segmented progress: done, filling, upcoming */}
        <div aria-hidden="true" className="flex gap-1.5">
          {steps.map((step, index) => (
            <span key={step.title} className="relative h-0.5 flex-1 overflow-hidden bg-line-strong">
              {index < active ? <span className="absolute inset-0 bg-action" /> : null}
              {index === active ? (
                reduced || manual ? (
                  <span className="absolute inset-0 bg-action" />
                ) : (
                  <span
                    key={active}
                    onAnimationEnd={() => go((active + 1) % steps.length)}
                    style={{ animationDuration: `${STEP_MS}ms`, animationPlayState: running ? "running" : "paused" }}
                    className="absolute inset-0 origin-left bg-action [animation:progress-fill_linear_both]"
                  />
                )
              ) : null}
            </span>
          ))}
        </div>
        <p className="mt-4 mb-4 flex items-baseline gap-3 text-[0.875rem] md:mb-5">
          <span className="text-label text-muted uppercase tabular-nums">
            Step {active + 1} of {steps.length}
          </span>
          <span key={active} className="font-[540] text-navy motion-safe:animate-[rise-in_300ms_var(--ease-out)_both]">
            {steps[active].title}
          </span>
        </p>

        <div className="media-frame aspect-[4/5] sm:aspect-[16/10]">
          {steps.map((step, index) =>
            mounted.has(index) ? (
              <div
                key={step.title}
                aria-hidden={index !== active}
                className={`absolute inset-0 ${
                  index === active
                    ? "opacity-100 [transition:opacity_450ms_var(--ease-out),transform_450ms_var(--ease-out)]"
                    : "translate-y-2 opacity-0 [transition:opacity_250ms_var(--ease-in),transform_250ms_var(--ease-in)]"
                }`}
              >
                <Image src={step.mobile.src} alt={step.mobile.alt} fill sizes="92vw" className="object-cover object-top sm:hidden" />
                <Image
                  src={step.desktop.src}
                  alt={step.desktop.alt}
                  fill
                  sizes="(min-width: 1024px) 64vw, 92vw"
                  className="hidden object-cover object-top sm:block"
                />
              </div>
            ) : null,
          )}
        </div>
      </div>
    </div>
  );
}
