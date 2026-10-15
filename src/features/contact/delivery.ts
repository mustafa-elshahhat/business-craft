import "server-only";

type ContactDelivery = {
  url: string;
  /** Web3Forms access key, sent in the request body. Present only for Web3Forms. */
  accessKey?: string;
};

const WEB3FORMS_HOST = "api.web3forms.com";

/**
 * Enquiry delivery (server only). Set CONTACT_WEBHOOK_URL to an HTTPS
 * endpoint that accepts a JSON POST (for example a form service or an
 * automation webhook). When it points at Web3Forms, WEB3FORMS_ACCESS_KEY is
 * required too. Without a complete configuration the form is shown as
 * unavailable instead of pretending to send.
 */
export function contactDelivery(): ContactDelivery | null {
  const value = process.env.CONTACT_WEBHOOK_URL?.trim();
  if (!value) return null;

  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return null;
  }
  if (url.protocol !== "https:") return null;

  if (url.hostname === WEB3FORMS_HOST) {
    const accessKey = process.env.WEB3FORMS_ACCESS_KEY?.trim();
    return accessKey ? { url: url.toString(), accessKey } : null;
  }
  return { url: url.toString() };
}
