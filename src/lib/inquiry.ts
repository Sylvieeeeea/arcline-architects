import type { InquiryValues } from "@/lib/validation";

/**
 * Inquiry submission.
 *
 * No backend ships with this site. To enable real submissions, set
 * NEXT_PUBLIC_INQUIRY_ENDPOINT to a service that accepts a JSON POST (for
 * example a Formspree form URL). See README.md. Until it is set, submission is
 * reported as "unavailable" and the UI never claims an inquiry was sent.
 */
const endpoint = process.env.NEXT_PUBLIC_INQUIRY_ENDPOINT?.trim() || "";

export const isSubmissionConfigured = endpoint.length > 0;

export type SubmitResult =
  | { status: "sent" }
  | { status: "unavailable" }
  | { status: "failed"; message: string };

export async function submitInquiry(values: InquiryValues): Promise<SubmitResult> {
  if (!isSubmissionConfigured) return { status: "unavailable" };

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        name: values.fullName.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        location: values.location.trim(),
        projectType: values.projectType,
        budget: values.budget.trim(),
        timeline: values.timeline,
        description: values.description.trim(),
      }),
    });

    // Only a confirmed 2xx response counts as sent.
    if (response.ok) return { status: "sent" };
    return { status: "failed", message: `The inquiry service returned an error (status ${response.status}).` };
  } catch {
    return { status: "failed", message: "We could not reach the inquiry service. Check your connection and try again." };
  }
}
