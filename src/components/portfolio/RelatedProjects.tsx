import { Container } from "@/components/layout/Container";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { TextLink } from "@/components/ui/TextLink";
import type { Project } from "@/types/content";

export function RelatedProjects({ projects }: { projects: Project[] }) {
  if (projects.length === 0) return null;

  return (
    <section aria-labelledby="related-heading" className="py-24">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-5 text-olive-deep">Keep exploring</p>
            <h2 id="related-heading" className="font-serif text-h2 font-medium">
              Related projects
            </h2>
          </div>
          <TextLink href="/projects">All projects</TextLink>
        </div>
        <ul className="mt-12 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <li key={project.slug}>
              <ProjectCard project={project} headingLevel={3} sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
