import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { ProjectGallery } from "@/components/portfolio/ProjectGallery";
import { ProjectImage } from "@/components/portfolio/ProjectImage";
import { RelatedProjects } from "@/components/portfolio/RelatedProjects";
import { CtaBand } from "@/components/ui/CtaBand";
import { getProject, getRelatedProjects, projects } from "@/data/projects";

type PageProps = { params: Promise<{ slug: string }> };

// Only the known project slugs exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };

  return {
    title: project.title,
    description: project.summary,
    openGraph: { title: project.title, description: project.summary, type: "article" },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const related = getRelatedProjects(project);

  return (
    <>
      <article>
        <Container className="pb-10 pt-10 lg:pt-14">
          <Link
            href="/projects"
            className="eyebrow inline-flex min-h-11 items-center gap-3 text-stone-deep transition-colors hover:text-charcoal"
          >
            <span aria-hidden="true">←</span> All projects
          </Link>

          <header className="mt-6">
            <h1 className="max-w-4xl font-serif text-h1 font-medium">{project.title}</h1>
            <p className="mt-6 max-w-2xl text-lead text-stone-deep">{project.summary}</p>
            <dl className="mt-10 grid grid-cols-2 gap-6 border-t hairline pt-6 sm:grid-cols-3">
              <div>
                <dt className="eyebrow text-stone-deep">Category</dt>
                <dd className="mt-2">{project.category}</dd>
              </div>
              <div>
                <dt className="eyebrow text-stone-deep">Setting</dt>
                <dd className="mt-2">{project.setting}</dd>
              </div>
              <div>
                <dt className="eyebrow text-stone-deep">Status</dt>
                <dd className="mt-2">{project.status}</dd>
              </div>
            </dl>
          </header>
        </Container>

        <Container>
          <ProjectImage
            image={project.mainImage}
            aspect="aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9]"
            sizes="100vw"
            priority
          />
        </Container>

        <section aria-labelledby="overview-heading" className="py-20 lg:py-28">
          <Container className="grid gap-10 lg:grid-cols-12">
            <h2 id="overview-heading" className="eyebrow text-olive-deep lg:col-span-3">
              Overview
            </h2>
            <div className="space-y-6 text-lead lg:col-span-7 lg:col-start-5">
              {project.overview.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Container>
        </section>

        <section aria-labelledby="concept-heading" className="border-t hairline py-20 lg:py-28">
          <Container className="grid gap-10 lg:grid-cols-12">
            <h2 id="concept-heading" className="eyebrow text-olive-deep lg:col-span-3">
              Design concept
            </h2>
            <div className="space-y-6 text-stone-deep lg:col-span-7 lg:col-start-5">
              {project.concept.map((paragraph) => (
                <p key={paragraph} className="text-lead">
                  {paragraph}
                </p>
              ))}
            </div>
          </Container>
        </section>

        <section aria-labelledby="gallery-heading" className="pb-20 lg:pb-28">
          <Container>
            <h2 id="gallery-heading" className="eyebrow mb-8 text-olive-deep">
              Gallery
            </h2>
            <ProjectGallery images={project.gallery} />
          </Container>
        </section>

        <section aria-labelledby="materials-heading" className="border-t hairline py-20 lg:py-28">
          <Container className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <h2 id="materials-heading" className="font-serif text-h2 font-medium">
                Materials
              </h2>
              <p className="mt-3 text-sm text-stone-deep">Proposed materials for this concept.</p>
              <dl className="mt-8 border-t hairline">
                {project.materials.map((material) => (
                  <div key={material.name} className="grid gap-1 border-b hairline py-5 sm:grid-cols-3 sm:gap-6">
                    <dt className="font-medium">{material.name}</dt>
                    <dd className="text-stone-deep sm:col-span-2">{material.note}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <h2 className="font-serif text-h2 font-medium">Design considerations</h2>
              <ul className="mt-8 space-y-4 border-t hairline pt-8">
                {project.considerations.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span aria-hidden="true" className="mt-[0.7em] h-1.5 w-1.5 shrink-0 bg-olive" />
                    {item}
                  </li>
                ))}
              </ul>
              {project.additionalInfo && project.additionalInfo.length > 0 && (
                <dl className="mt-10 grid grid-cols-2 gap-6 border-t hairline pt-8">
                  {project.additionalInfo.map((info) => (
                    <div key={info.label}>
                      <dt className="eyebrow text-stone-deep">{info.label}</dt>
                      <dd className="mt-2">{info.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
          </Container>
        </section>
      </article>

      <RelatedProjects projects={related} />

      <CtaBand
        eyebrow="A similar project"
        title={`Imagining something like ${project.title}?`}
        body="Share your site and brief, and we can explore how a similar approach might apply."
        secondary={{ label: "All projects", href: "/projects" }}
      />
    </>
  );
}
