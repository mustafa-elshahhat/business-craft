"use client";

import { useActionState, useEffect, useRef, type ReactNode } from "react";
import { ArrowRight } from "lucide-react";

import { sendEnquiry } from "./actions";
import { limits, serviceOptions, type EnquiryField, type EnquiryState } from "./enquiry";

const field =
  "mt-2 block w-full rounded-[8px] border bg-white px-4 py-3 text-base text-navy shadow-[0_1px_2px_rgb(11_19_32/0.04)] transition-[border-color,box-shadow] duration-150 placeholder:text-subtle focus:outline-none focus-visible:border-action focus-visible:ring-2 focus-visible:ring-accent/40 disabled:cursor-not-allowed disabled:bg-light";

/**
 * Enquiry form. Native validation first, server validation always.
 * When delivery is not configured the form is shown disabled with a clear
 * message; success appears only after the server confirms delivery.
 */
export function ContactForm({ enabled, fallback }: { enabled: boolean; fallback: ReactNode }) {
  const [state, action, pending] = useActionState<EnquiryState, FormData>(sendEnquiry, { status: "idle" });
  const startedRef = useRef<HTMLInputElement>(null);
  const startedAt = useRef(0);
  const statusRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Record when the form became usable (minimum fill-time spam guard).
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  // Move focus to the result so keyboard and screen-reader users hear it.
  useEffect(() => {
    // React resets the form after each submission; restore the start time.
    if (startedRef.current) startedRef.current.value = String(startedAt.current);
    if (state.status === "sent" || state.status === "failed" || state.status === "unavailable") statusRef.current?.focus();
    if (state.status === "invalid") {
      const first = Object.keys(state.errors)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
    }
  }, [state]);

  if (state.status === "sent") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="rounded-[12px] border border-line bg-white p-8 outline-none">
        <p className="text-h3">Thank you. Your enquiry has been sent.</p>
        <p className="mt-3 text-body text-muted">We will reply by email to discuss your project.</p>
      </div>
    );
  }

  const values = state.status === "invalid" || state.status === "failed" ? state.values : {};
  const errors: Partial<Record<EnquiryField, string>> = state.status === "invalid" ? state.errors : {};
  const disabled = !enabled || pending;

  const describe = (name: EnquiryField, hint?: string) =>
    [errors[name] ? `${name}-error` : null, hint ? `${name}-hint` : null].filter(Boolean).join(" ") || undefined;
  const border = (name: EnquiryField) => (errors[name] ? "border-[#b91c1c]" : "border-line-strong");

  return (
    <form ref={formRef} action={action} noValidate={false} className="space-y-6" aria-describedby={enabled ? undefined : "form-unavailable"}>
      {!enabled || state.status === "unavailable" ? (
        <div id="form-unavailable" ref={statusRef} tabIndex={-1} className="border-l-2 border-action py-1 pl-5 text-[0.9375rem] text-navy outline-none">
          <p className="font-[540]">Online enquiries are not connected yet.</p>
          <div className="mt-1 text-muted">{fallback}</div>
        </div>
      ) : null}
      {state.status === "failed" ? (
        <div ref={statusRef} tabIndex={-1} role="alert" className="rounded-[10px] border border-[#b91c1c]/40 bg-white p-5 text-[0.9375rem] outline-none">
          <p className="font-[540] text-[#b91c1c]">Your enquiry could not be sent.</p>
          <div className="mt-1 text-muted">Please try again in a moment. Your details are still in the form.{fallback ? <> {fallback}</> : null}</div>
        </div>
      ) : null}

      <fieldset disabled={disabled} className="space-y-6 disabled:opacity-60">
        <legend className="sr-only">Your project enquiry</legend>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="text-[0.9375rem] font-[540]">
              Name
            </label>
            <input id="name" name="name" type="text" autoComplete="name" required maxLength={limits.name} defaultValue={values.name} aria-invalid={!!errors.name} aria-describedby={describe("name")} className={`${field} ${border("name")}`} />
            <FieldError name="name" errors={errors} />
          </div>
          <div>
            <label htmlFor="company" className="text-[0.9375rem] font-[540]">
              Business or company <span className="font-normal text-muted">(optional)</span>
            </label>
            <input id="company" name="company" type="text" autoComplete="organization" maxLength={limits.company} defaultValue={values.company} className={`${field} border-line-strong`} />
          </div>
          <div>
            <label htmlFor="email" className="text-[0.9375rem] font-[540]">
              Email
            </label>
            <input id="email" name="email" type="email" autoComplete="email" required maxLength={limits.email} defaultValue={values.email} aria-invalid={!!errors.email} aria-describedby={describe("email")} className={`${field} ${border("email")}`} />
            <FieldError name="email" errors={errors} />
          </div>
          <div>
            <label htmlFor="phone" className="text-[0.9375rem] font-[540]">
              Phone or WhatsApp <span className="font-normal text-muted">(optional)</span>
            </label>
            <input id="phone" name="phone" type="tel" autoComplete="tel" maxLength={limits.phone} defaultValue={values.phone} className={`${field} border-line-strong`} />
          </div>
        </div>

        <div>
          <label htmlFor="service" className="text-[0.9375rem] font-[540]">
            What do you need?
          </label>
          <select id="service" name="service" required defaultValue={values.service ?? ""} aria-invalid={!!errors.service} aria-describedby={describe("service")} className={`${field} ${border("service")} min-h-12 appearance-none bg-[length:16px] bg-[right_1rem_center] bg-no-repeat bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")] pr-10`}>
            <option value="" disabled>
              Choose one
            </option>
            {serviceOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
          <FieldError name="service" errors={errors} />
        </div>

        <div>
          <label htmlFor="message" className="text-[0.9375rem] font-[540]">
            About the project
          </label>
          <p id="message-hint" className="mt-1 text-[0.875rem] text-muted">
            What you want to build, who it is for, and any timing that matters.
          </p>
          <textarea id="message" name="message" required minLength={10} maxLength={limits.message} rows={6} defaultValue={values.message} aria-invalid={!!errors.message} aria-describedby={describe("message", "hint")} className={`${field} ${border("message")} resize-y`} />
          <FieldError name="message" errors={errors} />
        </div>

        {/* Spam guards: hidden from people and assistive technology */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor="website">Leave this field empty</label>
          <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>
        <input ref={startedRef} type="hidden" name="started" defaultValue="" />

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <button
            type="submit"
            className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-control bg-action px-6 text-[0.9375rem] font-[540] text-white transition-[background-color] hover-ease hover:bg-[#1d4ed8] disabled:cursor-not-allowed disabled:bg-subtle"
          >
            {pending ? "Sending…" : "Send enquiry"}
            {pending ? null : <ArrowRight aria-hidden="true" className="size-4 transition-transform hover-ease group-hover:translate-x-[3px]" strokeWidth={2} />}
          </button>
          <p className="text-[0.8125rem] text-muted">We use your details only to reply to this enquiry.</p>
        </div>
      </fieldset>
      <p aria-live="polite" className="sr-only">
        {pending ? "Sending your enquiry" : ""}
      </p>
    </form>
  );
}

function FieldError({ name, errors }: { name: EnquiryField; errors: Partial<Record<EnquiryField, string>> }) {
  return errors[name] ? (
    <p id={`${name}-error`} className="mt-2 text-[0.875rem] text-[#b91c1c]">
      {errors[name]}
    </p>
  ) : null;
}
