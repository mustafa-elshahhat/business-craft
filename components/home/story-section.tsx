import box from "@/assets/projects/soulmate-builder-box.jpg";
import boxMobile from "@/assets/projects/soulmate-builder-box-mobile.jpg";
import label from "@/assets/projects/soulmate-builder-label.jpg";
import labelMobile from "@/assets/projects/soulmate-builder-label-mobile.jpg";
import pieces from "@/assets/projects/soulmate-builder-pieces.jpg";
import piecesMobile from "@/assets/projects/soulmate-builder-pieces-mobile.jpg";
import review from "@/assets/projects/soulmate-builder-review.jpg";
import reviewMobile from "@/assets/projects/soulmate-builder-review-mobile.jpg";
import { TextLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Label, TwoTone } from "@/components/ui/section-heading";
import { projectHref } from "@/content/projects";

import { SoulmateStory, type StoryStep } from "./soulmate-story";

/**
 * Real states of the live Soulmate box builder (captured October 2026).
 * The label step only appears when a piece is personalised.
 */
const steps: StoryStep[] = [
  {
    title: "Choose the box",
    text: "Couple’s Box holds seven numbered places; Men’s and Women’s Boxes hold five.",
    desktop: { src: box, alt: "Soulmate builder, step 1: Couple’s Box chosen, with its seven numbered places listed" },
    mobile: { src: boxMobile, alt: "Soulmate builder on a phone, step 1: choosing the box" },
  },
  {
    title: "Fill each place",
    text: "Pick a piece for every place. The running total updates as the box fills.",
    desktop: { src: pieces, alt: "Soulmate builder, step 2: three places filled with a watch, a second watch and a wallet" },
    mobile: { src: piecesMobile, alt: "Soulmate builder on a phone, step 2: filling the places" },
  },
  {
    title: "Write their label",
    text: "When a piece is personalised: names, a date and a message, with a live preview of the label.",
    optional: true,
    desktop: { src: label, alt: "Soulmate builder, step 3: label form with names, date and message beside a live label preview" },
    mobile: { src: labelMobile, alt: "Soulmate builder on a phone, step 3: writing the label" },
  },
  {
    title: "Review & add to bag",
    text: "Every piece, the personalisation and the total are itemised before the box goes into the bag.",
    desktop: { src: review, alt: "Soulmate builder, step 4: review of the box with an itemised price and Add box to bag" },
    mobile: { src: reviewMobile, alt: "Soulmate builder on a phone, step 4: reviewing the box" },
  },
];

export function StorySection() {
  return (
    <section aria-labelledby="story-title" data-header="light" className="bg-light text-navy">
      <Container className="py-24 md:py-32 lg:py-40">
        <div className="grid gap-y-6 lg:grid-cols-12 lg:items-end lg:gap-x-10">
          <div className="lg:col-span-8">
            <Label>Case story · Soulmate Gift Store</Label>
            <h2 id="story-title" data-reveal className="mt-5 max-w-[26ch] text-h2">
              <TwoTone lead="A gift box, built piece by piece." rest="The live builder, in English and Arabic." />
            </h2>
          </div>
          <div data-reveal style={{ "--i": 1 } as React.CSSProperties} className="lg:col-span-4 lg:justify-self-end">
            <TextLink href={projectHref("soulmate-gift-store")}>View the Project</TextLink>
          </div>
        </div>

        <div className="mt-14 lg:mt-20">
          <SoulmateStory steps={steps} />
        </div>
      </Container>
    </section>
  );
}
