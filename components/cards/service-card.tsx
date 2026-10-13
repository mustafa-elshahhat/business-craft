import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";

type ServiceCardProps = {
  title: string;
  summary: string;
  href: string;
  icon: LucideIcon;
};

/** Whole card is clickable through the title link's stretched hit area. */
export function ServiceCard({ title, summary, href, icon: Icon }: ServiceCardProps) {
  return (
    <article className="group relative flex h-full flex-col border-t border-line py-8 transition-[border-color,transform] duration-300 ease-out-soft sm:rounded-card sm:border sm:bg-white sm:p-7 sm:hover:-translate-y-0.5 sm:hover:border-line-strong has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-3 has-[a:focus-visible]:outline-accent">
      <Icon aria-hidden="true" className="size-6 text-action" strokeWidth={1.6} />
      <h3 className="mt-5 text-h3 sm:mt-8">
        <Link href={href} className="outline-none after:absolute after:inset-0 after:content-['']">
          {title}
        </Link>
      </h3>
      <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-muted">{summary}</p>
      <span aria-hidden="true" className="mt-5 inline-flex sm:mt-7 items-center gap-1.5 text-[0.9375rem] font-semibold text-action">
        Learn More
        <ArrowRight className="size-4 transition-transform duration-300 ease-out-soft group-hover:translate-x-0.5" strokeWidth={2} />
      </span>
    </article>
  );
}
