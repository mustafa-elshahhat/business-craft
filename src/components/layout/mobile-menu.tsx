"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

import { ButtonLink } from "@/components/ui/button";
import { isActivePath, menuProjects, pageLinks, primaryCta } from "@/data/navigation";
import { getProject, projectHref } from "@/data/projects";
import { serviceHref, services } from "@/data/services";

const workProjects = menuProjects.map(getProject);

/**
 * Full-screen mobile navigation below the header (under lg).
 * Services and Work are accordions; the consultation CTA stays pinned.
 * While open: page content is inert, scroll is locked, Escape closes and
 * returns focus to the toggle, and navigating closes it.
 */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState<"services" | "work" | null>(null);
  const pathname = usePathname();
  const panelId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);

  const close = () => {
    setOpen(false);
    setSection(null);
  };

  useLayoutEffect(() => {
    const root = document.documentElement;
    const main = document.getElementById("main-content");
    const footer = document.getElementById("site-footer");
    const header = document.getElementById("site-header");
    const theme = header?.getAttribute("data-theme") ?? "dark";
    if (open) {
      root.dataset.menuOpen = "true";
      if (main) main.inert = true;
      if (footer) footer.inert = true;
      // The menu is navy, so the header joins it while open.
      header?.setAttribute("data-theme", "dark");
    }
    return () => {
      if (open) header?.setAttribute("data-theme", theme);
      delete root.dataset.menuOpen;
      if (main) main.inert = false;
      if (footer) footer.inert = false;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        toggleRef.current?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 64rem)");
    const onResize = () => desktop.matches && close();
    document.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
    };
  }, [open]);

  const isCurrent = (href: string) => isActivePath(pathname, href);

  return (
    <div className="lg:hidden">
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => (open ? close() : setOpen(true))}
        className="-mr-2 inline-flex size-11 items-center justify-center rounded-control"
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        {/* Two bars that rotate into an X */}
        <span aria-hidden="true" className="relative block h-3 w-5">
          <span
            className={`absolute left-0 h-[1.5px] w-5 bg-current transition-transform duration-[160ms] ease-[var(--ease-out)] ${
              open ? "top-[5px] rotate-45" : "top-0"
            }`}
          />
          <span
            className={`absolute left-0 h-[1.5px] w-5 bg-current transition-transform duration-[160ms] ease-[var(--ease-out)] ${
              open ? "top-[5px] -rotate-45" : "top-[10px]"
            }`}
          />
        </span>
      </button>

      <div
        id={panelId}
        data-open={open ? "" : undefined}
        inert={!open}
        className="fixed inset-x-0 top-[var(--header-h)] bottom-0 z-40 flex flex-col bg-navy text-white opacity-0 [visibility:hidden] [transition:opacity_180ms_var(--ease-out),visibility_0s_linear_180ms] data-[open]:opacity-100 data-[open]:[visibility:visible] data-[open]:[transition:opacity_180ms_var(--ease-out),visibility_0s]"
      >
        <nav aria-label="Main" className="flex-1 overflow-y-auto overscroll-contain px-5 pt-4 pb-6 sm:px-8">
          <ul className="border-b border-line-dark">
            <Accordion
              label="Services"
              open={section === "services"}
              onToggle={() => setSection(section === "services" ? null : "services")}
            >
              {services.map((service) => (
                <SubLink key={service.slug} href={serviceHref(service.slug)} onNavigate={close} current={isCurrent(serviceHref(service.slug))}>
                  {service.title}
                </SubLink>
              ))}
              <SubLink href="/services" onNavigate={close} current={pathname === "/services"}>
                All Services
              </SubLink>
            </Accordion>
            <Accordion label="Work" open={section === "work"} onToggle={() => setSection(section === "work" ? null : "work")}>
              {workProjects.map((project) => (
                <SubLink key={project.slug} href={projectHref(project.slug)} onNavigate={close} current={isCurrent(projectHref(project.slug))}>
                  {project.name}
                </SubLink>
              ))}
              <SubLink href="/work" onNavigate={close} current={pathname === "/work"}>
                All Work
              </SubLink>
            </Accordion>
            {pageLinks.map((item) => (
              <li key={item.href} className="border-t border-line-dark">
                <Link
                  href={item.href}
                  onNavigate={close}
                  aria-current={isCurrent(item.href) ? "page" : undefined}
                  className="flex min-h-16 items-center text-[1.625rem] font-[540] tracking-[-0.02em] text-white/90 aria-[current=page]:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="border-t border-line-dark px-5 py-4 sm:px-8">
          <ButtonLink href={primaryCta.href} onNavigate={close} arrow className="w-full">
            {primaryCta.label}
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}

function Accordion({ label, open, onToggle, children }: { label: string; open: boolean; onToggle: () => void; children: ReactNode }) {
  const id = useId();
  return (
    <li className="border-t border-line-dark first:border-t-0">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={onToggle}
        className="flex min-h-16 w-full items-center justify-between text-left text-[1.625rem] font-[540] tracking-[-0.02em] text-white/90"
      >
        {label}
        <ChevronDown
          aria-hidden="true"
          strokeWidth={1.5}
          className={`size-5 text-mist transition-transform duration-300 ease-[var(--ease-io)] ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        id={id}
        inert={!open}
        className={`grid transition-[grid-template-rows] duration-300 ease-[var(--ease-io)] ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden">
          <ul className="pb-4">{children}</ul>
        </div>
      </div>
    </li>
  );
}

function SubLink({
  href,
  onNavigate,
  current,
  children,
}: {
  href: string;
  onNavigate: () => void;
  current: boolean;
  children: ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        onNavigate={onNavigate}
        aria-current={current ? "page" : undefined}
        className="flex min-h-11 items-center text-[1.0625rem] text-mist transition-colors hover:text-white aria-[current=page]:text-white"
      >
        {children}
      </Link>
    </li>
  );
}
