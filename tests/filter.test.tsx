import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { FilterableProjects, type FilterableItem } from "@/components/portfolio/FilterableProjects";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { projects } from "@/data/projects";

const items: FilterableItem[] = projects.map((project) => ({
  slug: project.slug,
  category: project.category,
  node: <ProjectCard project={project} headingLevel={2} />,
}));

const cardTitles = () => screen.getAllByRole("heading", { level: 2 }).map((h) => h.textContent ?? "");

describe("FilterableProjects", () => {
  it("shows every project initially", () => {
    render(<FilterableProjects items={items} />);
    expect(screen.getAllByRole("article")).toHaveLength(projects.length);
    expect(screen.getByRole("status")).toHaveTextContent(`Showing ${projects.length} of ${projects.length} projects.`);
    expect(screen.getByRole("button", { name: /^All/ })).toHaveAttribute("aria-pressed", "true");
  });

  it("filters by each category without a page reload", async () => {
    const user = userEvent.setup();
    render(<FilterableProjects items={items} />);

    for (const category of ["Residential", "Commercial", "Interiors", "Conceptual"] as const) {
      await user.click(screen.getByRole("button", { name: new RegExp(`^${category}`) }));
      const expected = projects.filter((p) => p.category === category);
      expect(screen.getAllByRole("article")).toHaveLength(expected.length);
      for (const p of expected) expect(cardTitles().some((t) => t.includes(p.title))).toBe(true);
      for (const p of projects.filter((x) => x.category !== category)) {
        expect(cardTitles().some((t) => t.includes(p.title))).toBe(false);
      }
      expect(screen.getByRole("status")).toHaveTextContent(`in ${category}`);
      expect(screen.getByRole("button", { name: new RegExp(`^${category}`) })).toHaveAttribute("aria-pressed", "true");
    }

    await user.click(screen.getByRole("button", { name: /^All/ }));
    expect(screen.getAllByRole("article")).toHaveLength(projects.length);
  });

  it("links every card to its own project page", () => {
    render(<FilterableProjects items={items} />);
    for (const project of projects) {
      const heading = screen.getByRole("heading", { level: 2, name: new RegExp(project.title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")) });
      const link = within(heading).getByRole("link");
      expect(link).toHaveAttribute("href", `/projects/${project.slug}`);
    }
  });
});
