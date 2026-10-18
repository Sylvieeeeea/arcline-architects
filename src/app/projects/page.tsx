import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { FilterableProjects, type FilterableItem } from "@/components/portfolio/FilterableProjects";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { CtaBand } from "@/components/ui/CtaBand";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore Arcline Architects' demonstration projects across residential, commercial, interior and conceptual design.",
};

export default function ProjectsPage() {
  const items: FilterableItem[] = projects.map((project, index) => ({
    slug: project.slug,
    category: project.category,
    node: (
      <ProjectCard
        project={project}
        headingLevel={2}
        aspect="aspect-[4/3]"
        sizes="(min-width: 768px) 50vw, 100vw"
        priority={index < 2}
      />
    ),
  }));

  return (
    <>
      <Container className="pb-12 pt-16 lg:pb-16 lg:pt-24">
        <SectionHeading
          as="h1"
          size="h1"
          eyebrow="Projects"
          title="Spaces explored through light, material and context"
          intro="A collection of demonstration concepts. Each is a design study rather than a completed commission, showing how the studio might approach different sites and programmes."
        />
      </Container>

      <section aria-label="Project portfolio" className="pb-24 lg:pb-32">
        <Container>
          <FilterableProjects items={items} />
        </Container>
      </section>

      <CtaBand
        title="Imagine something of your own."
        body="If one of these concepts resonates, tell us about your site and brief."
      />
    </>
  );
}
