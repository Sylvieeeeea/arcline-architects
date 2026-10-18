"use client";

import { useMemo, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { CheckboxField, SelectField, TextAreaField, TextField } from "@/components/contact/Field";
import { Button } from "@/components/ui/Button";
import { site } from "@/data/site";
import { isSubmissionConfigured, submitInquiry } from "@/lib/inquiry";
import {
  emptyInquiry,
  inquiryToText,
  limits,
  projectTypeOptions,
  timelineOptions,
  validateInquiry,
  type InquiryField,
  type InquiryValues,
} from "@/lib/validation";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "sent" }
  | { kind: "unavailable" }
  | { kind: "failed"; message: string };

const fieldLabels: Record<InquiryField, string> = {
  fullName: "Full name",
  email: "Email address",
  phone: "Phone number",
  location: "Project location",
  projectType: "Project type",
  budget: "Approximate budget",
  timeline: "Preferred timeline",
  description: "Project description",
  consent: "Consent",
};

export function ContactForm() {
  const [values, setValues] = useState<InquiryValues>(emptyInquiry);
  const [touched, setTouched] = useState<Partial<Record<InquiryField, boolean>>>({});
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");
  const summaryRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  const errors = useMemo(() => validateInquiry(values), [values]);
  const errorFields = (Object.keys(errors) as InquiryField[]).filter((field) => errors[field]);
  const visible = (field: InquiryField) => (touched[field] || attempted ? errors[field] : undefined);

  const update =
    (field: InquiryField) =>
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const target = event.target;
      const value = target instanceof HTMLInputElement && target.type === "checkbox" ? target.checked : target.value;
      setValues((current) => ({ ...current, [field]: value }));
      if (copyState !== "idle") setCopyState("idle");
    };

  const blur = (field: InquiryField) => () => setTouched((current) => ({ ...current, [field]: true }));

  const focusField = (field: InquiryField) => {
    document.getElementById(field)?.focus();
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status.kind === "submitting") return;

    setAttempted(true);
    if (errorFields.length > 0) {
      setStatus({ kind: "idle" });
      // Move focus to the error summary once it has rendered.
      window.setTimeout(() => summaryRef.current?.focus(), 0);
      return;
    }

    setStatus({ kind: "submitting" });
    const result = await submitInquiry(values);

    if (result.status === "sent") setStatus({ kind: "sent" });
    else if (result.status === "unavailable") setStatus({ kind: "unavailable" });
    else setStatus({ kind: "failed", message: result.message });

    window.setTimeout(() => statusRef.current?.focus(), 0);
  }

  async function copyInquiry() {
    try {
      await navigator.clipboard.writeText(inquiryToText(values));
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }
  }

  function reset() {
    setValues(emptyInquiry);
    setTouched({});
    setAttempted(false);
    setStatus({ kind: "idle" });
    setCopyState("idle");
  }

  if (status.kind === "sent") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="border border-olive-deep bg-white p-8 lg:p-10">
        <p className="eyebrow text-olive-deep">Inquiry sent</p>
        <h2 className="mt-4 font-serif text-h2 font-medium">Thank you.</h2>
        <p className="mt-4 max-w-md text-stone-deep">
          The inquiry service confirmed receipt of your message. Keep an eye on your inbox for a reply.
        </p>
        <Button className="mt-8" variant="outline" onClick={reset}>
          Send another inquiry
        </Button>
      </div>
    );
  }

  const submitting = status.kind === "submitting";
  const mailto = site.contact.email
    ? `mailto:${site.contact.email}?subject=${encodeURIComponent("Project inquiry")}&body=${encodeURIComponent(inquiryToText(values))}`
    : "";

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      aria-describedby={isSubmissionConfigured ? undefined : "form-notice"}
      className="space-y-8"
    >
      {!isSubmissionConfigured && (
        <p id="form-notice" className="border border-charcoal/30 bg-sand/40 p-5 text-sm">
          <strong className="font-medium">Please note:</strong> this site&apos;s inquiry service is not connected yet, so
          this form checks your details but cannot send them. You will be able to copy your inquiry once it is complete.
        </p>
      )}

      {attempted && errorFields.length > 0 && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          aria-labelledby="error-summary-title"
          className="border border-error bg-white p-5"
        >
          <h2 id="error-summary-title" className="text-sm font-medium text-error">
            Please fix {errorFields.length === 1 ? "this field" : `these ${errorFields.length} fields`} before
            continuing
          </h2>
          <ul className="mt-3 space-y-1 text-sm">
            {errorFields.map((field) => (
              <li key={field}>
                <a
                  href={`#${field}`}
                  onClick={(event) => {
                    event.preventDefault();
                    focusField(field);
                  }}
                  className="underline underline-offset-4 hover:text-olive-deep"
                >
                  {fieldLabels[field]}: {errors[field]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid gap-8 sm:grid-cols-2">
        <TextField
          id="fullName"
          label="Full name"
          required
          autoComplete="name"
          value={values.fullName}
          onChange={update("fullName")}
          onBlur={blur("fullName")}
          error={visible("fullName")}
          maxLength={limits.name + 20}
        />
        <TextField
          id="email"
          label="Email address"
          required
          type="email"
          autoComplete="email"
          inputMode="email"
          value={values.email}
          onChange={update("email")}
          onBlur={blur("email")}
          error={visible("email")}
        />
        <TextField
          id="phone"
          label="Phone number"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          hint="Include the country code if you are outside the project's country."
          value={values.phone}
          onChange={update("phone")}
          onBlur={blur("phone")}
          error={visible("phone")}
        />
        <TextField
          id="location"
          label="Project location"
          required
          autoComplete="off"
          hint="A town, city, region or plot description is enough."
          value={values.location}
          onChange={update("location")}
          onBlur={blur("location")}
          error={visible("location")}
        />
        <SelectField
          id="projectType"
          label="Project type"
          required
          options={projectTypeOptions}
          value={values.projectType}
          onChange={update("projectType")}
          onBlur={blur("projectType")}
          error={visible("projectType")}
        />
        <SelectField
          id="timeline"
          label="Preferred timeline"
          options={timelineOptions}
          value={values.timeline}
          onChange={update("timeline")}
          onBlur={blur("timeline")}
          error={visible("timeline")}
        />
      </div>

      <TextField
        id="budget"
        label="Approximate budget"
        hint="A range is fine. Include the currency, or write “to be discussed”."
        value={values.budget}
        onChange={update("budget")}
        onBlur={blur("budget")}
        error={visible("budget")}
      />

      <TextAreaField
        id="description"
        label="Project description"
        required
        rows={7}
        hint={`Tell us about the site, the people who will use the space, and what you have in mind. ${values.description.trim().length}/${limits.description.max} characters.`}
        value={values.description}
        onChange={update("description")}
        onBlur={blur("description")}
        error={visible("description")}
      />

      <CheckboxField id="consent" checked={values.consent} onChange={update("consent")} onBlur={blur("consent")} error={visible("consent")}>
        I agree that the details I provide may be used to respond to my project inquiry.
      </CheckboxField>

      {status.kind === "unavailable" && (
        <div ref={statusRef} tabIndex={-1} role="status" className="border border-charcoal bg-white p-6">
          <p className="font-medium">Your inquiry has not been sent.</p>
          <p className="mt-2 text-sm text-stone-deep">
            Your details look complete, but this site has no inquiry service connected yet, so nothing was transmitted or
            stored. Your answers are still in the form. You can copy them and send them yourself once contact details are
            available.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <Button variant="outline" onClick={copyInquiry}>
              Copy my inquiry
            </Button>
            {mailto && (
              <a href={mailto} className="text-sm font-medium underline underline-offset-4">
                Open in my email app
              </a>
            )}
            <span role="status" className="text-sm text-stone-deep">
              {copyState === "copied" && "Copied to your clipboard."}
              {copyState === "failed" && "Could not copy automatically. Please select and copy your details manually."}
            </span>
          </div>
        </div>
      )}

      {status.kind === "failed" && (
        <div ref={statusRef} tabIndex={-1} role="alert" className="border border-error bg-white p-6">
          <p className="font-medium text-error">Your inquiry was not sent.</p>
          <p className="mt-2 text-sm text-stone-deep">{status.message} Your answers are still in the form, so you can try again.</p>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-6">
        <Button type="submit" variant="solid" arrow disabled={submitting} aria-busy={submitting}>
          {submitting ? "Sending…" : isSubmissionConfigured ? "Send inquiry" : "Check my inquiry"}
        </Button>
        <p className="text-xs text-stone-deep">Fields marked Required must be completed.</p>
      </div>
    </form>
  );
}
