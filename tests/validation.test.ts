import { describe, expect, it } from "vitest";
import { emptyInquiry, inquiryToText, validateInquiry, type InquiryValues } from "@/lib/validation";

const valid: InquiryValues = {
  fullName: "Amina Otieno",
  email: "amina@example.com",
  phone: "",
  location: "Nairobi",
  projectType: "Residential",
  budget: "",
  timeline: "",
  description: "A family home on a gently sloping plot with mature trees.",
  consent: true,
};

describe("validateInquiry", () => {
  it("flags every required field on an empty form", () => {
    const errors = validateInquiry(emptyInquiry);
    expect(Object.keys(errors).sort()).toEqual(
      ["consent", "description", "email", "fullName", "location", "projectType"].sort(),
    );
  });

  it("accepts a complete valid inquiry with optional fields blank", () => {
    expect(validateInquiry(valid)).toEqual({});
  });

  it("rejects malformed emails", () => {
    for (const email of ["plain", "a@b", "a b@c.com", "@x.com"]) {
      expect(validateInquiry({ ...valid, email }).email, email).toBeTruthy();
    }
  });

  it("treats phone as optional but validates it when present", () => {
    expect(validateInquiry({ ...valid, phone: "" }).phone).toBeUndefined();
    expect(validateInquiry({ ...valid, phone: "+254 712 345 678" }).phone).toBeUndefined();
    expect(validateInquiry({ ...valid, phone: "abc" }).phone).toBeTruthy();
    expect(validateInquiry({ ...valid, phone: "12345" }).phone).toBeTruthy();
  });

  it("requires a meaningful description length", () => {
    expect(validateInquiry({ ...valid, description: "Too short" }).description).toBeTruthy();
    expect(validateInquiry({ ...valid, description: "x".repeat(2001) }).description).toBeTruthy();
  });

  it("requires consent and ignores whitespace-only text", () => {
    expect(validateInquiry({ ...valid, consent: false }).consent).toBeTruthy();
    expect(validateInquiry({ ...valid, fullName: "   " }).fullName).toBeTruthy();
  });
});

describe("inquiryToText", () => {
  it("marks blank optional fields as not provided", () => {
    const text = inquiryToText(valid);
    expect(text).toContain("Phone: (not provided)");
    expect(text).toContain("Name: Amina Otieno");
    expect(text).toContain(valid.description);
  });
});
