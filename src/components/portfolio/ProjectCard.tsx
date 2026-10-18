import Link from "next/link";
import { ProjectImage } from "@/components/portfolio/ProjectImage";
import { cn } from "@/lib/cn";
import type { Project } from "@/types/content";

type ProjectCardProps = {
  project: Project;
  /** Heading level for the title; match the surrounding document outline. */
  headingLevel?: 2 | 3;
  aspect?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
};

/** Portfolio card. The whole card is clickable through a stretched title link. */
export function ProjectCard({
  project,
  headingLevel = 2,
  aspect = "aspect-[4/3]",
  sizes,
  priority,
  className,
}: ProjectCardProps) {
  const Heading = headingLevel === 2 ? "h2" : "h3";

  return (
    <article
      className={cn(
        "group relative has-[a:focus-visible]:outline has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-8 has-[a:focus-visible]:outline-olive-deep",
        className,
      )}
    >
      <div className="overflow-hidden">
        <div className="transition-transform duration-700 ease-out group-hover:scale-[1.03]">
          <ProjectImage image={project.mainImage} aspect={aspect} sizes={sizes} priority={priority} />
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-4">
        <p className="eyebrow text-olive-deep">{project.category}</p>
        <p className="eyebrow border border-charcoal/30 px-2.5 py-1 text-[0.625rem] text-stone-deep">{project.status}</p>
      </div>

      <Heading className="mt-3 font-serif text-h3 font-medium">
        <Link
          href={`/projects/${project.slug}`}
          className="outline-none transition-colors duration-300 after:absolute after:inset-0 group-hover:text-olive-deep"
        >
          {project.title}
          <span className="sr-only"> — {project.category} concept</span>
        </Link>
      </Heading>

      <p className="mt-1 text-sm text-stone-deep">{project.setting}</p>
      <p className="mt-3 max-w-md text-stone-deep">{project.summary}</p>
    </article>
  );
}
