import { Container } from "@/components/ui/container";
import { ProcessTrack } from "@/components/sections/process-track";
import { TwoTone } from "@/components/ui/section-heading";
import { processSteps } from "@/content/company";

/**
 * Dark chapter. A 1px track (horizontal on desktop, vertical on mobile)
 * fills with blue as the sequence scrolls through view; markers light as
 * the fill passes them. Scroll-driven CSS only: no pinning, no capture.
 */
export function ProcessSection() {
  return (
    <section id="process" aria-labelledby="process-title" data-header="dark" className="scroll-mt-16 bg-navy text-white">
      <Container className="py-16 md:py-28 lg:py-36">
        <div className="grid gap-y-6 lg:grid-cols-12 lg:items-end lg:gap-x-10">
          <h2 id="process-title" data-reveal className="max-w-[18ch] text-h2 lg:col-span-7">
            <TwoTone tone="dark" lead="A Simple Process for Great Results." rest="From first conversation to launch." />
          </h2>
          <p data-reveal style={{ "--i": 1 } as React.CSSProperties} className="max-w-[26rem] text-body text-mist lg:col-span-4 lg:col-start-9">
            A clear, straightforward path, with you involved at every step.
          </p>
        </div>

        <ProcessTrack steps={processSteps} className="mt-12 md:mt-16 lg:mt-24" />
      </Container>
    </section>
  );
}
