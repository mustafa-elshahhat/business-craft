"use server";

import { limits, serviceOptions, type EnquiryField, type EnquiryState } from "@/content/enquiry";
import { contactDelivery } from "@/lib/contact";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const SUBJECT = "Business Craft — New Project Enquiry";

function text(formData: FormData, key: string, max: number) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

/**
 * Validates the enquiry on the server and forwards it to CONTACT_WEBHOOK_URL.
 * Success is reported only after the endpoint answers with a 2xx status (and,
 * for Web3Forms, confirms `success: true` in its JSON reply).
 */
export async function sendEnquiry(_previous: EnquiryState, formData: FormData): Promise<EnquiryState> {
  const delivery = contactDelivery();
  if (!delivery) return { status: "unavailable" };

  // Spam guards: a hidden field people never fill, and a minimum fill time.
  // Bots are answered as if sent, so they learn nothing.
  const started = Number(formData.get("started"));
  const tooFast = Number.isFinite(started) && started > 0 && Date.now() - started < 3000;
  if (text(formData, "website", 200) || tooFast) {
    return { status: "sent" };
  }

  const values = {
    name: text(formData, "name", limits.name),
    company: text(formData, "company", limits.company),
    email: text(formData, "email", limits.email),
    phone: text(formData, "phone", limits.phone),
    service: text(formData, "service", 40),
    message: text(formData, "message", limits.message),
  };

  const errors: Partial<Record<EnquiryField, string>> = {};
  if (!values.name) errors.name = "Please enter your name.";
  if (!values.email) errors.email = "Please enter your email address.";
  else if (!EMAIL.test(values.email)) errors.email = "Please enter a valid email address, like name@company.com.";
  if (!(serviceOptions as readonly string[]).includes(values.service)) errors.service = "Please choose what you need.";
  if (values.message.length < 10) errors.message = "Please tell us a little about the project (at least 10 characters).";
  if (Object.keys(errors).length > 0) return { status: "invalid", errors, values };

  // Optional field: forwarded only when the form provides it.
  const budget = text(formData, "budget", 80);

  try {
    const response = await fetch(delivery.url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        ...(delivery.accessKey ? { access_key: delivery.accessKey } : {}),
        subject: SUBJECT,
        from_name: "Business Craft website",
        ...values,
        ...(budget ? { budget } : {}),
        source: "business-craft-website",
        submittedAt: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(10000),
      cache: "no-store",
    });
    if (!response.ok) return { status: "failed", values };
    if (delivery.accessKey) {
      const result: unknown = await response.json().catch(() => null);
      if ((result as { success?: unknown } | null)?.success !== true) return { status: "failed", values };
    }
  } catch {
    return { status: "failed", values };
  }
  return { status: "sent" };
}
