import { describe, expect, it } from "vitest";
import { getFeaturedProjects, getProject, getRelatedProjects, projects } from "@/data/projects";
import { services } from "@/data/services";
import { projectCategories } from "@/types/content";

describe("project data", () => {
  it("has unique, URL-safe slugs", () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
  });

  it("uses only known categories and covers all four", () => {
    for (const p of projects) expect(projectCategories).toContain(p.category);
    expect(new Set(projects.map((p) => p.category))).toEqual(new Set(projectCategories));
  });

  it("gives every project the content the detail template needs", () => {
    for (const p of projects) {
      expect(p.title).toBeTruthy();
      expect(p.overview.length).toBeGreaterThan(0);
      expect(p.concept.length).toBeGreaterThan(0);
      expect(p.materials.length).toBeGreaterThan(0);
      expect(p.gallery.length).toBeGreaterThan(0);
      expect(p.mainImage.alt).toBeTruthy();
      for (const image of p.gallery) expect(image.alt).toBeTruthy();
    }
  });

  it("does not invent budgets, dimensions, dates or clients", () => {
    const text = JSON.stringify(projects).toLowerCase();
    expect(text).not.toMatch(/\bclient[s]?\b/);
    expect(text).not.toMatch(/\b(19|20)\d{2}\b/);
    expect(text).not.toMatch(/\d+\s?(m2|m²|sqm|sq\.? ?ft|square (feet|metres|meters))/);
    expect(text).not.toMatch(/[$€£]\s?\d/);
  });

  it("returns undefined for an unknown slug", () => {
    expect(getProject("nope")).toBeUndefined();
    expect(getProject(projects[0].slug)?.title).toBe(projects[0].title);
  });

  it("finds related projects that exclude the project itself", () => {
    for (const p of projects) {
      const related = getRelatedProjects(p);
      expect(related.length).toBeLessThanOrEqual(3);
      expect(related.map((r) => r.slug)).not.toContain(p.slug);
    }
  });

  it("features at least three projects for the homepage", () => {
    expect(getFeaturedProjects().length).toBeGreaterThanOrEqual(3);
  });

  it("keeps service copy free of regulated-service claims", () => {
    const text = JSON.stringify(services).toLowerCase();
    expect(text).not.toMatch(/licen[sc]ed|registered architect|approvals? (service|handled)|we build|construction services/);
  });
});
