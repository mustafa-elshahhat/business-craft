"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

import { ButtonLink } from "@/components/ui/button";
import { mainNav, primaryCta } from "@/lib/site";

/**
 * Disclosure-style mobile navigation (below the lg breakpoint).
 * While open: page content is inert, scroll is locked, Escape closes and
 * returns focus to the toggle. Navigating closes it immediately.
 */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);

  const close = () => setOpen(false);

  // Page state that the open menu owns: inert content + scroll lock.
  useLayoutEffect(() => {
    const root = document.documentElement;
    const main = document.getElementById("main-content");
    const footer = document.getElementById("site-footer");
    if (open) {
      root.dataset.menuOpen = "true";
      if (main) main.inert = true;
      if (footer) footer.inert = true;
    }
    return () => {
      delete root.dataset.menuOpen;
      if (main) main.inert = false;
      if (footer) footer.inert = false;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    // Close if the viewport grows past the mobile breakpoint.
    const desktop = window.matchMedia("(min-width: 64rem)");
    const onResize = () => desktop.matches && setOpen(false);
    document.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="-mr-2 inline-flex size-11 items-center justify-center rounded-control text-white transition-colors hover:bg-white/5"
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        {open ? (
          <X aria-hidden="true" className="size-6" strokeWidth={1.75} />
        ) : (
          <Menu aria-hidden="true" className="size-6" strokeWidth={1.75} />
        )}
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="fixed inset-x-0 top-[4.25rem] bottom-0 z-40 overflow-y-auto overscroll-contain border-t border-line-dark bg-navy md:top-20"
      >
        <nav aria-label="Main" className="mx-auto flex min-h-full max-w-[86rem] flex-col px-5 pt-6 pb-10 sm:px-6 md:px-8">
          <ul className="divide-y divide-line-dark border-b border-line-dark">
            {mainNav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onNavigate={close}
                    aria-current={active ? "page" : undefined}
                    className={`flex min-h-14 items-center text-xl font-semibold tracking-[-0.015em] ${
                      active ? "text-white" : "text-white/75 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <ButtonLink href={primaryCta.href} onNavigate={close} arrow className="mt-8 w-full sm:w-auto sm:self-start">
            {primaryCta.label}
          </ButtonLink>
        </nav>
      </div>
    </div>
  );
}
