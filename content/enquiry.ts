/** Enquiry form options and limits, shared by the form and its server action. */
export const serviceOptions = ["Website", "E-commerce", "Business System", "Mobile App", "Not sure yet"] as const;

export const limits = { name: 100, company: 120, email: 200, phone: 40, message: 3000 } as const;

export type EnquiryField = "name" | "company" | "email" | "phone" | "service" | "message";

export type EnquiryState =
  | { status: "idle" }
  | { status: "invalid"; errors: Partial<Record<EnquiryField, string>>; values: Partial<Record<EnquiryField, string>> }
  | { status: "sent" }
  | { status: "failed"; values: Partial<Record<EnquiryField, string>> }
  | { status: "unavailable" };
