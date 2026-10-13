"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";

import { featuredProjects, projectHref } from "@/content/projects";
import { serviceHref, services } from "@/content/services";
import { primaryCta } from "@/lib/site";

type MenuKey = "services" | "work";

const MENUS: { key: MenuKey; label: string; href: string }[] = [
  { key: "services", label: "Services", href: "/services" },
  { key: "work", label: "Work", href: "/work" },
];
const LINKS = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];
const ORDER: MenuKey[] = ["services", "work"];
const workProjects = ["zts-fashion", "dermiva-skincare", "soulmate-gift-store"].map(
  (slug) => featuredProjects.find((project) => project.slug === slug)!,
);

const OPEN_DELAY = 40;
const CLOSE_GRACE = 200;

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

const itemText =
  "relative inline-flex min-h-11 items-center gap-1 rounded-[6px] px-3 text-[0.8125rem] font-[500] transition-colors hover-ease";

/**
 * Desktop navigation (lg and up). Services and Work share ONE panel that
 * resizes and slides its content when moving between them.
 * Hover (40ms intent, 200ms grace), click and keyboard all work:
 * Enter/Space toggle, ArrowDown opens and focuses the first link,
 * arrows move inside the panel, Escape closes and restores focus.
 */
export function DesktopNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState<MenuKey | null>(null);
  const [shown, setShown] = useState<MenuKey>("services");
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);
  const openTimer = useRef<number | undefined>(undefined);
  const closeTimer = useRef<number | undefined>(undefined);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRefs = useRef<Record<MenuKey, HTMLButtonElement | null>>({ services: null, work: null });
  const contentRefs = useRef<Record<MenuKey, HTMLDivElement | null>>({ services: null, work: null });

  const clearTimers = () => {
    window.clearTimeout(openTimer.current);
    window.clearTimeout(closeTimer.current);
  };

  const show = useCallback((key: MenuKey) => {
    window.clearTimeout(closeTimer.current);
    setOpen(key);
    setShown(key);
  }, []);

  const close = useCallback((restoreFocus = false) => {
    window.clearTimeout(openTimer.current);
    setOpen((current) => {
      if (restoreFocus && current) triggerRefs.current[current]?.focus();
      return null;
    });
  }, []);

  // Size the shared panel to the visible content.
  useLayoutEffect(() => {
    const node = contentRefs.current[shown];
    if (!node) return;
    const measure = () => setSize({ w: node.offsetWidth, h: node.offsetHeight });
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, [shown]);

  // Outside click and route changes close the panel.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: globalThis.PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) close();
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open, close]);

  useEffect(() => {
    close();
  }, [pathname, close]);

  useEffect(() => clearTimers, []);

  const onTriggerEnter = (key: MenuKey) => (event: PointerEvent) => {
    if (event.pointerType !== "mouse") return;
    clearTimers();
    openTimer.current = window.setTimeout(() => show(key), open ? 0 : OPEN_DELAY);
  };
  const onRegionLeave = (event: PointerEvent) => {
    if (event.pointerType !== "mouse") return;
    window.clearTimeout(openTimer.current);
    closeTimer.current = window.setTimeout(() => close(), CLOSE_GRACE);
  };
  const onRegionEnter = () => window.clearTimeout(closeTimer.current);

  const links = (key: MenuKey) =>
    [...(contentRefs.current[key]?.querySelectorAll<HTMLAnchorElement>("a[href]") ?? [])];

  const focusFirst = (key: MenuKey) => requestAnimationFrame(() => links(key)[0]?.focus());

  const onTriggerKey = (key: MenuKey) => (event: KeyboardEvent) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      show(key);
      focusFirst(key);
    } else if (event.key === "Escape" && open) {
      event.preventDefault();
      close(true);
    }
  };

  const onPanelKey = (event: KeyboardEvent) => {
    if (!open) return;
    const items = links(open);
    const index = items.indexOf(document.activeElement as HTMLAnchorElement);
    const move = (to: number) => {
      event.preventDefault();
      items[(to + items.length) % items.length]?.focus();
    };
    if (event.key === "Escape") {
      event.preventDefault();
      close(true);
    } else if (event.key === "ArrowDown") move(index + 1);
    else if (event.key === "ArrowUp") move(index - 1);
    else if (event.key === "Home") move(0);
    else if (event.key === "End") move(items.length - 1);
  };

  const onBlurWithin = (event: React.FocusEvent) => {
    if (!rootRef.current?.contains(event.relatedTarget as Node)) close();
  };

  return (
    <nav aria-label="Main" className="hidden lg:block">
      <div ref={rootRef} className="relative" onPointerEnter={onRegionEnter} onPointerLeave={onRegionLeave} onBlur={onBlurWithin}>
        <ul className="flex items-center gap-1">
          {MENUS.map((menu) => {
            const expanded = open === menu.key;
            const current = isActive(pathname, menu.href);
            return (
              <li key={menu.key}>
                <button
                  ref={(node) => {
                    triggerRefs.current[menu.key] = node;
                  }}
                  type="button"
                  aria-expanded={expanded}
                  aria-controls={`nav-panel-${menu.key}`}
                  onPointerEnter={onTriggerEnter(menu.key)}
                  onClick={() => (expanded ? close() : show(menu.key))}
                  onKeyDown={onTriggerKey(menu.key)}
                  className={`${itemText} ${
                    expanded || current
                      ? "bg-white/[0.08] text-white group-data-[theme=light]/header:bg-navy/[0.05] group-data-[theme=light]/header:text-navy"
                      : "text-white/70 hover:text-white group-data-[theme=light]/header:text-navy/70 group-data-[theme=light]/header:hover:text-navy"
                  }`}
                >
                  {menu.label}
                  <ChevronDown
                    aria-hidden="true"
                    strokeWidth={1.75}
                    className={`size-3.5 transition-transform duration-[180ms] ease-[var(--ease-out)] ${expanded ? "rotate-180" : ""}`}
                  />
                </button>
              </li>
            );
          })}
          {LINKS.map((link) => {
            const current = isActive(pathname, link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={current ? "page" : undefined}
                  onPointerEnter={(event) => event.pointerType === "mouse" && open && close()}
                  className={`${itemText} ${
                    current
                      ? "text-white group-data-[theme=light]/header:text-navy"
                      : "text-white/70 hover:text-white group-data-[theme=light]/header:text-navy/70 group-data-[theme=light]/header:hover:text-navy"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Shared panel. pt-3 doubles as the hover bridge from the triggers. */}
        <div className="absolute top-full left-0 pt-3" onKeyDown={onPanelKey}>
          <div
            data-open={open ? "" : undefined}
            style={size ? { width: size.w, height: size.h } : undefined}
            className="relative origin-top-left overflow-hidden rounded-[12px] bg-navy/[0.97] text-white opacity-0 shadow-[0_0_0_1px_rgb(248_250_252/0.1),0_12px_32px_rgb(11_19_32/0.35)] backdrop-blur-[24px] [transform:scale(.98)] [visibility:hidden] [transition:opacity_180ms_var(--ease-in),transform_180ms_var(--ease-in),visibility_0s_linear_180ms,width_220ms_var(--ease-io),height_220ms_var(--ease-io)] data-[open]:opacity-100 data-[open]:[transform:none] data-[open]:[visibility:visible] data-[open]:[transition:opacity_180ms_var(--ease-out),transform_180ms_var(--ease-out),visibility_0s,width_220ms_var(--ease-io),height_220ms_var(--ease-io)]"
          >
            {ORDER.map((key) => {
              const active = shown === key;
              const offset = ORDER.indexOf(key) < ORDER.indexOf(shown) ? -32 : 32;
              return (
                <div
                  key={key}
                  id={`nav-panel-${key}`}
                  ref={(node) => {
                    contentRefs.current[key] = node;
                  }}
                  inert={!active || !open}
                  className="absolute top-0 left-0 transition-[opacity,transform] duration-[220ms] ease-[var(--ease-io)]"
                  style={{ opacity: active ? 1 : 0, transform: active ? "none" : `translateX(${offset}px)` }}
                >
                  {key === "services" ? <ServicesPanel /> : <WorkPanel />}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}

const panelLink =
  "group/item block rounded-[8px] p-3 outline-offset-0 transition-colors hover-ease hover:bg-white/[0.05] focus-visible:bg-white/[0.05]";

function ServicesPanel() {
  return (
    <div className="w-[38rem] p-3">
      <ul className="grid grid-cols-2 gap-1">
        {services.map((service) => (
          <li key={service.slug}>
            <Link href={serviceHref(service.slug)} className={panelLink}>
              <span className="block text-[0.9375rem] font-[540] text-white">{service.title}</span>
              <span className="mt-1 block text-[0.8125rem] leading-[1.5] text-mist">{service.summary}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-2 flex gap-1 border-t border-line-dark pt-2">
        <PanelFooterLink href="/#process">How We Work</PanelFooterLink>
        <PanelFooterLink href={primaryCta.href}>{primaryCta.label}</PanelFooterLink>
      </div>
    </div>
  );
}

function WorkPanel() {
  return (
    <div className="w-[30rem] p-3">
      <ul className="grid gap-1">
        {workProjects.map((project) => (
          <li key={project.slug}>
            <Link href={projectHref(project.slug)} className={`${panelLink} flex items-center gap-4 !p-2`}>
              <span className="relative block aspect-[4/3] w-24 shrink-0 overflow-hidden rounded-[6px] bg-charcoal shadow-[0_0_0_1px_rgb(248_250_252/0.08)]">
                <Image src={project.media.desktop.src} alt="" fill sizes="96px" className="object-cover object-left-top" />
              </span>
              <span>
                <span className="block text-[0.9375rem] font-[540] text-white">{project.name}</span>
                <span className="mt-1 block text-[0.8125rem] text-mist">
                  {project.category}
                  {project.bilingual ? " · English and Arabic" : ""}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-2 flex border-t border-line-dark pt-2">
        <PanelFooterLink href="/work">All Work</PanelFooterLink>
      </div>
    </div>
  );
}

function PanelFooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group/item inline-flex min-h-12 items-center gap-2 rounded-[8px] px-3 text-[0.8125rem] font-[500] text-white/80 transition-colors hover-ease hover:bg-white/[0.05] hover:text-white"
    >
      {children}
      <ArrowRight aria-hidden="true" strokeWidth={2} className="size-3.5 transition-transform hover-ease group-hover/item:translate-x-[3px]" />
    </Link>
  );
}
