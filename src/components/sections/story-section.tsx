import { TextLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Label, TwoTone } from "@/components/ui/section-heading";
import { builderSteps } from "@/data/case-studies";
import { projectHref } from "@/data/projects";
import { SoulmateStory } from "@/features/projects/soulmate-story";

/**
 * The Soulmate box builder, told through its real states. On the Soulmate
 * case study the section drops its label and self-link.
 */
export function StorySection({ inCaseStudy = false }: { inCaseStudy?: boolean }) {
  return (
    <section aria-labelledby="story-title" data-header="light" className="bg-light text-navy">
      <Container className="py-16 md:py-28 lg:py-40">
        <div className="grid gap-y-6 lg:grid-cols-12 lg:items-end lg:gap-x-10">
          <div className="lg:col-span-8">
            {inCaseStudy ? null : <Label>Case story · Soulmate Gift Store</Label>}
            <h2 id="story-title" data-reveal className={`max-w-[26ch] text-h2 ${inCaseStudy ? "" : "mt-5"}`}>
              {inCaseStudy ? (
                <TwoTone lead="The builder, step by step." rest="Real screens from the live store." />
              ) : (
                <TwoTone lead="A gift box, built piece by piece." rest="The live builder, in English and Arabic." />
              )}
            </h2>
          </div>
          {inCaseStudy ? null : (
            <div data-reveal style={{ "--i": 1 } as React.CSSProperties} className="lg:col-span-4 lg:justify-self-end">
              <TextLink href={projectHref("soulmate-gift-store")}>View the Project</TextLink>
            </div>
          )}
        </div>

        <div className="mt-10 md:mt-14 lg:mt-16">
          <SoulmateStory steps={builderSteps} />
        </div>
      </Container>
    </section>
  );
}
