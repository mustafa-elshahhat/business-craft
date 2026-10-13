"use client";

import { useEffect, useState } from "react";

/**
 * Sticky service index (desktop). Scroll-spy marks the chapter in view with
 * a 2px blue bar; clicking scrolls to the chapter (plain anchors, so it also
 * works without JavaScript).
 */
export function ServiceIndex({ items }: { items: { id: string; title: string }[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const chapters = items.map((item) => document.getElementById(item.id)).filter((node): node is HTMLElement => !!node);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(chapters.indexOf(entry.target as HTMLElement));
        }
      },
      { rootMargin: "-45% 0px -54% 0px" },
    );
    chapters.forEach((chapter) => observer.observe(chapter));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label="Services" className="relative">
      {/* Active bar: 2px, with the monogram's 45° cut at its lower end */}
      <span
        aria-hidden="true"
        className="absolute top-0 left-0 h-11 w-0.5 bg-action [clip-path:polygon(0_0,100%_0,100%_calc(100%-2px),0_100%)] transition-transform duration-300 ease-[var(--ease-io)]"
        style={{ transform: `translateY(${active * 100}%)` }}
      />
      <ul className="border-l border-line">
        {items.map((item, index) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={index === active ? "true" : undefined}
              className={`flex h-11 items-center pl-5 text-[0.9375rem] font-[540] transition-colors duration-300 ${
                index === active ? "text-navy" : "text-muted hover:text-navy"
              }`}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
