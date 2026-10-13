import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type ProjectCardProps = {
  name: string;
  category: string | null;
  summary: string;
  href: string;
  image: StaticImageData;
  /** Responsive `sizes` for the screenshot, set by the grid that renders the card. */
  sizes: string;
};

/** Dark-surface project card. Whole card is clickable via the title link. */
export function ProjectCard({ name, category, summary, href, image, sizes }: ProjectCardProps) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-card border border-line-dark bg-white/[0.03] transition-[border-color,background-color] duration-300 hover:border-white/25 hover:bg-white/[0.05] has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-3 has-[a:focus-visible]:outline-accent">
      <div className="relative aspect-[16/10] overflow-hidden border-b border-line-dark bg-charcoal">
        <Image
          src={image}
          alt={`${name} home page`}
          fill
          sizes={sizes}
          placeholder="blur"
          className="object-cover object-top transition-transform duration-500 ease-out-soft group-hover:scale-[1.02]"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        {category ? <p className="text-eyebrow uppercase text-accent">{category}</p> : null}
        <h3 className="mt-3 text-h3">
          <Link href={href} className="outline-none after:absolute after:inset-0 after:content-['']">
            {name}
          </Link>
        </h3>
        <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-white/70">{summary}</p>
        <span aria-hidden="true" className="mt-6 inline-flex items-center gap-1.5 text-[0.9375rem] font-semibold text-white">
          View Project
          <ArrowRight className="size-4 transition-transform duration-300 ease-out-soft group-hover:translate-x-0.5" strokeWidth={2} />
        </span>
      </div>
    </article>
  );
}
