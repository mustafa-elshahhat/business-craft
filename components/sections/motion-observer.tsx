"use client";

import { useEffect } from "react";

/**
 * Enables scroll reveals for [data-reveal] elements on the homepage.
 * Content stays visible without JavaScript or with reduced motion: the
 * hidden states in globals.css only apply while <html data-motion> is set.
 */
export function MotionObserver() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = document.documentElement;
    const targets = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // Reveal on entry, and immediately for anything already scrolled past.
          if (entry.isIntersecting || entry.boundingClientRect.bottom < 0) {
            entry.target.setAttribute("data-shown", "");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );

    root.setAttribute("data-motion", "");
    targets.forEach((target) => observer.observe(target));

    return () => {
      observer.disconnect();
      root.removeAttribute("data-motion");
    };
  }, []);

  return null;
}
