"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Keeps the fixed header's theme in step with the section underneath it.
 * Sections declare data-header="dark" or "light"; anything else is dark.
 */
export function HeaderTheme() {
  const pathname = usePathname();

  useEffect(() => {
    const header = document.getElementById("site-header");
    if (!header) return;

    const sections = [...document.querySelectorAll<HTMLElement>("[data-header]")];
    const setTheme = (theme: string) => header.setAttribute("data-theme", theme === "light" ? "light" : "dark");
    if (sections.length === 0) {
      setTheme("dark");
      return;
    }

    let observer: IntersectionObserver | null = null;
    const watch = () => {
      observer?.disconnect();
      // A one-pixel band at the header's vertical centre.
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) setTheme((entry.target as HTMLElement).dataset.header ?? "dark");
          }
        },
        { rootMargin: `-32px 0px -${Math.max(0, window.innerHeight - 33)}px 0px`, threshold: 0 },
      );
      sections.forEach((section) => observer?.observe(section));
    };
    watch();
    window.addEventListener("resize", watch);
    return () => {
      window.removeEventListener("resize", watch);
      observer?.disconnect();
    };
  }, [pathname]);

  return null;
}
