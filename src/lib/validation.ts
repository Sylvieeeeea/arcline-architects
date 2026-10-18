/** Inquiry form model and client-side validation. Pure functions, easy to test. */

export const projectTypeOptions = [
  "Residential",
  "Commercial",
  "Interiors",
  "Landscape and outdoor space",
  "Concept development or consultation",
  "Other",
] as const;

export const timelineOptions = [
  "Within 3 months",
  "3 to 6 months",
  "6 to 12 months",
  "More than a year",
  "Flexible or not sure yet",
] as const;

export type InquiryValues = {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  projectType: string;
  budget: string;
  timeline: string;
  description: string;
  consent: boolean;
};

export type InquiryField = keyof InquiryValues;
export type InquiryErrors = Partial<Record<InquiryField, string>>;

export const emptyInquiry: InquiryValues = {
  fullName: "",
  email: "",
  phone: "",
  location: "",
  projectType: "",
  budget: "",
  timeline: "",
  description: "",
  consent: false,
};

export const limits = { description: { min: 20, max: 2000 }, name: 120, location: 160, budget: 80 } as const;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateInquiry(values: InquiryValues): InquiryErrors {
  const errors: InquiryErrors = {};

  const name = values.fullName.trim();
  if (!name) errors.fullName = "Enter your full name.";
  else if (name.length < 2) errors.fullName = "Your name looks too short. Please enter your full name.";
  else if (name.length > limits.name) errors.fullName = `Keep your name under ${limits.name} characters.`;

  const email = values.email.trim();
  if (!email) errors.email = "Enter your email address.";
  else if (!emailPattern.test(email)) errors.email = "Enter a valid email address, such as name@example.com.";

  const phone = values.phone.trim();
  if (phone) {
    const digits = phone.replace(/\D/g, "");
    const allowed = /^[+()\d][\d\s().-]*$/.test(phone);
    if (!allowed || digits.length < 7 || digits.length > 15) {
      errors.phone = "Enter a valid phone number (7 to 15 digits), or leave this blank.";
    }
  }

  const location = values.location.trim();
  if (!location) errors.location = "Enter the project location, such as a town, city or region.";
  else if (location.length > limits.location) errors.location = `Keep the location under ${limits.location} characters.`;

  if (!values.projectType) errors.projectType = "Choose the type of project.";

  if (values.budget.trim().length > limits.budget) {
    errors.budget = `Keep the budget note under ${limits.budget} characters.`;
  }

  const description = values.description.trim();
  if (!description) errors.description = "Describe your project.";
  else if (description.length < limits.description.min) {
    errors.description = `Please add a little more detail (at least ${limits.description.min} characters).`;
  } else if (description.length > limits.description.max) {
    errors.description = `Keep the description under ${limits.description.max} characters.`;
  }

  if (!values.consent) errors.consent = "Please confirm you agree to how your details will be used.";

  return errors;
}

/** Plain-text version of an inquiry, used for the copy-to-clipboard fallback. */
export function inquiryToText(values: InquiryValues): string {
  const line = (label: string, value: string) => `${label}: ${value.trim() || "(not provided)"}`;
  return [
    "Project inquiry for ARCLINE ARCHITECTS",
    "",
    line("Name", values.fullName),
    line("Email", values.email),
    line("Phone", values.phone),
    line("Project location", values.location),
    line("Project type", values.projectType),
    line("Approximate budget", values.budget),
    line("Preferred timeline", values.timeline),
    "",
    "Project description:",
    values.description.trim(),
  ].join("\n");
}
