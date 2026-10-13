"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { mainNav } from "@/lib/site";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Desktop primary navigation with current-page state. */
export function NavLinks() {
  const pathname = usePathname();
  return (
    <ul className="flex items-center gap-5">
      {mainNav.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`relative inline-flex min-h-11 items-center px-2 text-[0.9375rem] font-medium transition-colors duration-300 after:absolute after:inset-x-2 after:bottom-1.5 after:h-px after:origin-left after:bg-accent after:transition-transform after:duration-300 ${
                active ? "text-white after:scale-x-100" : "text-white/70 after:scale-x-0 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
