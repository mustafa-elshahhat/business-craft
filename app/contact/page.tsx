import type { Metadata } from "next";

import { ContactForm } from "@/components/contact/contact-form";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { contactDelivery } from "@/lib/contact";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Get a Free Consultation",
  description:
    "Tell Business Craft about your website, online store, business system or mobile app. We reply to discuss scope, approach and next steps.",
  path: "/contact",
});

const next = [
  { title: "We read your enquiry", text: "Everything you send goes straight to the people who will plan the work." },
  { title: "We reply to discuss it", text: "A short conversation about your goals, scope and timing." },
  { title: "You get a clear plan", text: "What we would build, how, and what it involves, before anything starts." },
] as const;

export default function ContactPage() {
  const { email, phone, whatsapp } = siteConfig.contact;
  const channels = [
    email ? { label: "Email", value: email, href: `mailto:${email}` } : null,
    whatsapp ? { label: "WhatsApp", value: `+${whatsapp}`, href: `https://wa.me/${whatsapp}`, external: true } : null,
    phone ? { label: "Phone", value: phone, href: `tel:${phone.replace(/[^\d+]/g, "")}` } : null,
  ].filter((channel): channel is { label: string; value: string; href: string; external?: boolean } => channel !== null);

  const fallback = channels.length ? (
    <>
      You can reach us directly by {channels.map((channel) => channel.label.toLowerCase()).join(" or ")}, listed beside this form.
    </>
  ) : (
    <>The form will accept enquiries once delivery is set up.</>
  );

  return (
    <>
      <PageHero
        crumbs={[{ label: "Contact", href: "/contact" }]}
        title="Tell us about your project."
        rest="A free consultation, no obligation."
        lead="Share what you want to build. We will reply to talk through goals, scope and the right way to approach it."
      />

      <section aria-labelledby="enquiry-title" data-header="light" className="bg-light text-navy">
        <Container className="py-16 md:py-24 lg:py-32">
          <div className="grid gap-y-14 lg:grid-cols-12 lg:gap-x-10">
            <div className="lg:col-span-4">
              <h2 className="text-label text-muted uppercase">What happens next</h2>
              <ol className="mt-4 border-t border-line">
                {next.map((step, index) => (
                  <li key={step.title} className="grid grid-cols-[2rem_1fr] border-b border-line py-5">
                    <span className="text-[0.875rem] text-muted tabular-nums">{index + 1}</span>
                    <span>
                      <span className="block text-[1.0625rem] font-[540]">{step.title}</span>
                      <span className="mt-1 block text-[0.9375rem] text-muted">{step.text}</span>
                    </span>
                  </li>
                ))}
              </ol>

              {channels.length ? (
                <div className="mt-12">
                  <h2 className="text-label text-muted uppercase">Or reach us directly</h2>
                  <ul className="mt-4 border-t border-line">
                    {channels.map((channel) => (
                      <li key={channel.label} className="border-b border-line">
                        <a
                          href={channel.href}
                          {...(channel.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          className="flex min-h-14 items-center justify-between gap-4 py-3 transition-colors hover-ease hover:text-action"
                        >
                          <span className="text-[0.9375rem] text-muted">{channel.label}</span>
                          <span className="text-[1rem] font-[540]">
                            {channel.value}
                            {channel.external ? <span className="sr-only"> (opens in a new tab)</span> : null}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              <h2 id="enquiry-title" className="text-h3">
                Your enquiry
              </h2>
              <p className="mt-2 text-[0.9375rem] text-muted">All fields are required unless marked optional.</p>
              <div className="mt-8">
                <ContactForm enabled={contactDelivery() !== null} fallback={fallback} />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
