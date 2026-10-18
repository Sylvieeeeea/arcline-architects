import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { ProjectImage } from "@/components/portfolio/ProjectImage";
import { ButtonLink } from "@/components/ui/Button";
import { CtaBand } from "@/components/ui/CtaBand";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextLink } from "@/components/ui/TextLink";
import { getFeaturedProjects } from "@/data/projects";
import { services } from "@/data/services";
import { approachSteps, principles } from "@/data/studio";
import { site } from "@/data/site";

export default function HomePage() {
  const featured = getFeaturedProjects();
  const [first, second, third] = featured;

  return (
    <>
      {/* Hero */}
      <section aria-labelledby="hero-heading">
        <Container className="pb-12 pt-14 lg:pb-16 lg:pt-24">
          <p className="eyebrow animate-rise text-olive-deep">Conceptual architecture studio</p>
          <h1
            id="hero-heading"
            className="animate-rise mt-6 max-w-5xl font-serif text-display font-medium"
            style={{ animationDelay: "120ms" }}
          >
            Shaping Spaces. <span className="italic text-olive-deep">Defining Futures.</span>
          </h1>
          <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-end">
            <p
              className="animate-rise max-w-xl text-lead text-stone-deep lg:col-span-6"
              style={{ animationDelay: "240ms" }}
            >
              Arcline is a conceptual studio exploring homes, workplaces and interiors through light, material and
              context, with an eye for precision and quiet luxury.
            </p>
            <div
              className="animate-rise flex flex-wrap gap-4 lg:col-span-5 lg:col-start-8 lg:justify-end"
              style={{ animationDelay: "360ms" }}
            >
              <ButtonLink href="/projects">Explore projects</ButtonLink>
              <ButtonLink href="/contact" variant="outline">
                Start a project
              </ButtonLink>
            </div>
          </div>
        </Container>
        <Container>
          <ProjectImage
            image={first.mainImage}
            aspect="aspect-[4/5] sm:aspect-[16/9] lg:aspect-[21/9]"
            sizes="100vw"
            priority
          />
        </Container>
      </section>

      {/* Philosophy */}
      <section aria-labelledby="philosophy-heading" className="py-24 lg:py-36">
        <Container className="grid gap-12 lg:grid-cols-12">
          <p className="eyebrow text-olive-deep lg:col-span-3">Design philosophy</p>
          <div className="lg:col-span-8 lg:col-start-5">
            <h2 id="philosophy-heading" className="font-serif text-h2 font-medium">
              Architecture begins with a place, a person and a clear idea.
            </h2>
            <p className="mt-8 max-w-2xl text-lead text-stone-deep">
              We believe the best buildings are quiet: shaped by light, built from honest materials and proportioned
              with restraint. Each design starts by listening, then reading the site, before any form is drawn.
            </p>
            <div className="mt-10">
              <TextLink href="/studio">Read the studio philosophy</TextLink>
            </div>
          </div>
        </Container>
        <Container className="mt-16">
          <ul className="grid gap-px border-y hairline sm:grid-cols-3">
            {principles.slice(0, 3).map((principle, index) => (
              <li key={principle.title} className="py-8 sm:px-8 sm:first:pl-0 sm:last:pr-0">
                <p className="eyebrow text-olive-deep">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-4 font-serif text-h3 font-medium">{principle.title}</h3>
                <p className="mt-3 text-stone-deep">{principle.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Featured projects */}
      <section aria-labelledby="featured-heading" className="pb-24 lg:pb-36">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Selected concepts"
              title={<span id="featured-heading">Featured projects</span>}
              intro="A selection of demonstration concepts exploring how architecture can respond to site, light and use."
            />
            <TextLink href="/projects">View all projects</TextLink>
          </div>
          <div className="mt-16 grid gap-x-8 gap-y-16 lg:grid-cols-12">
            <ProjectCard
              project={first}
              headingLevel={3}
              aspect="aspect-[5/4]"
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="lg:col-span-7"
            />
            <ProjectCard
              project={second}
              headingLevel={3}
              aspect="aspect-[4/5]"
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="lg:col-span-5 lg:mt-28"
            />
            <ProjectCard
              project={third}
              headingLevel={3}
              aspect="aspect-[16/10]"
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="lg:col-span-6 lg:col-start-4"
            />
          </div>
        </Container>
      </section>

      {/* Services summary */}
      <section aria-labelledby="services-heading" className="bg-sand/40 py-24 lg:py-32">
        <Container className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Proposed services"
              title={<span id="services-heading">What we design</span>}
              intro="Design services across architecture, interiors and landscape, from first idea to considered detail."
            />
            <div className="mt-10">
              <TextLink href="/services">All services</TextLink>
            </div>
          </div>
          <ol className="lg:col-span-7 lg:col-start-6">
            {services.map((service, index) => (
              <li key={service.slug} className="border-t hairline last:border-b">
                <Link
                  href={`/services#${service.slug}`}
                  className="group flex items-baseline justify-between gap-6 py-6 transition-colors duration-300 hover:text-olive-deep"
                >
                  <span className="flex items-baseline gap-6">
                    <span className="eyebrow text-stone-deep">{String(index + 1).padStart(2, "0")}</span>
                    <span className="font-serif text-h3 font-medium">{service.title}</span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-stone-deep transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Approach */}
      <section aria-labelledby="approach-heading" className="py-24 lg:py-36">
        <Container>
          <SectionHeading
            eyebrow="Design approach"
            title={<span id="approach-heading">A considered process, from listening to detail</span>}
          />
          <ol className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {approachSteps.map((step, index) => (
              <li key={step.title} className="border-t border-charcoal pt-6">
                <p className="eyebrow text-olive-deep">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-4 font-serif text-h3 font-medium">{step.title}</h3>
                <p className="mt-3 text-stone-deep">{step.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <CtaBand
        title="Have a site, a brief, or just an idea?"
        body={`Share a few details about the space you are imagining. ${site.name} is a conceptual studio, so this is a starting point for exploring ideas.`}
        secondary={{ label: "Explore projects", href: "/projects" }}
      />
    </>
  );
}
