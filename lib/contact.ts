import "server-only";

/**
 * Enquiry delivery (server only). Set CONTACT_WEBHOOK_URL to an HTTPS
 * endpoint that accepts a JSON POST (for example a form service or an
 * automation webhook). Without it the form is shown as unavailable instead
 * of pretending to send.
 */
export function contactWebhook(): string | null {
  const value = process.env.CONTACT_WEBHOOK_URL?.trim();
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
}
