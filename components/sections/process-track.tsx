/**
 * Process track: a 1px line (horizontal from lg, vertical below) that fills
 * with blue as the sequence scrolls through view; markers light as the fill
 * passes them. Scroll-driven CSS only; without support the markers stay lit.
 * Use on navy surfaces.
 */
export function ProcessTrack({
  steps,
  className = "",
}: {
  steps: readonly { title: string; text: string }[];
  className?: string;
}) {
  // Each title sits on the line (its navy backing interrupts it); copy hangs below.
  return (
    <div className={`process-steps relative ${className}`}>
      <span aria-hidden="true" className="absolute top-2 bottom-2 left-[5px] w-px bg-line-dark-strong lg:top-[13px] lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-auto" />
      <span
        aria-hidden="true"
        className="process-fill absolute top-2 bottom-2 left-[5px] w-px origin-top bg-accent [transform:scaleY(0)] lg:top-[13px] lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-auto lg:origin-left lg:[transform:scaleX(0)]"
      />

      <ol className="relative grid gap-y-10 lg:grid-flow-col lg:auto-cols-fr lg:gap-x-10">
        {steps.map((step, index) => {
          const at = 25 + (35 * index) / (steps.length - 1);
          return (
            <li key={step.title} className="relative pl-9 lg:pl-0">
              <div className="flex items-center gap-3 lg:h-[27px]">
                <span
                  aria-hidden="true"
                  className="process-marker absolute top-[7px] left-0 size-[11px] shrink-0 rounded-full border border-accent bg-accent lg:static"
                  style={{ animationRange: `cover ${at}% cover ${at + 1}%` }}
                />
                <h3 className="text-[1.375rem] leading-none font-[540] tracking-[-0.015em] lg:bg-navy lg:pr-4">
                  <span className="sr-only">Step {index + 1}: </span>
                  {step.title}
                </h3>
              </div>
              <p className="mt-3 max-w-[20rem] text-[0.9375rem] leading-relaxed text-mist lg:mt-6">{step.text}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
