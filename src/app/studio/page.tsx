import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { ProjectImage } from "@/components/portfolio/ProjectImage";
import { ButtonLink } from "@/components/ui/Button";
import { CtaBand } from "@/components/ui/CtaBand";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/data/site";
import { approachSteps, contextTopics, principles } from "@/data/studio";
import type { SiteImage } from "@/types/content";

export const metadata: Metadata = {
  title: "Studio",
  description:
    "The proposed identity and design philosophy of Arcline Architects: site, light, material and restraint.",
};

const heroImage: SiteImage = {
  alt: "Concept elevation drawing of layered volumes beneath a large circular arc.",
  art: { variant: "elevation", tone: "olive", seed: 81 },
};

const lightImage: SiteImage = {
  alt: "Concept interior drawing of a room with an arched opening and a beam of light.",
  art: { variant: "interior", tone: "light", seed: 82 },
};

export default function StudioPage() {
  return (
    <>
      <section aria-labelledby="studio-heading">
        <Container className="pb-12 pt-16 lg:pb-16 lg:pt-24">
          <SectionHeading
            as="h1"
            size="h1"
            eyebrow="The studio"
            title={<span id="studio-heading">Quiet buildings, carefully made</span>}
            intro={`${site.name} is a proposed architecture studio, presented here as a concept. It imagines a practice built on listening, precise thinking and a deep respect for place.`}
          />
        </Container>
        <Container>
          <ProjectImage image={heroImage} aspect="aspect-[4/3] lg:aspect-[21/9]" sizes="100vw" priority />
        </Container>
      </section>

      <section aria-labelledby="principles-heading" className="py-24 lg:py-36">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Design principles"
              title={<span id="principles-heading">What guides the work</span>}
              intro="Five ideas that would shape every project, from the first sketch to the final detail."
            />
          </div>
          <ol className="lg:col-span-7 lg:col-start-6">
            {principles.map((principle, index) => (
              <li key={principle.title} className="grid gap-3 border-t hairline py-8 last:border-b sm:grid-cols-12">
                <p className="eyebrow pt-2 text-olive-deep sm:col-span-2">{String(index + 1).padStart(2, "0")}</p>
                <div className="sm:col-span-10">
                  <h3 className="font-serif text-h3 font-medium">{principle.title}</h3>
                  <p className="mt-3 text-stone-deep">{principle.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section aria-labelledby="approach-heading" className="bg-sand/40 py-24 lg:py-32">
        <Container>
          <SectionHeading
            eyebrow="Clients and sites"
            title={<span id="approach-heading">How we would work with you</span>}
            intro="A good building comes from understanding the people who will use it and the place that will hold it."
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

      <section aria-labelledby="context-heading" className="py-24 lg:py-36">
        <Container className="grid gap-14 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <ProjectImage image={lightImage} aspect="aspect-[4/5]" sizes="(min-width: 1024px) 40vw, 100vw" />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <SectionHeading
              eyebrow="Material, light, space and context"
              title={<span id="context-heading">The things that make a place</span>}
            />
            <dl className="mt-10 grid gap-8 sm:grid-cols-2">
              {contextTopics.map((topic) => (
                <div key={topic.title} className="border-t hairline pt-5">
                  <dt className="font-serif text-h3 font-medium">{topic.title}</dt>
                  <dd className="mt-3 text-stone-deep">{topic.body}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-12 flex flex-wrap gap-4">
              <ButtonLink href="/projects">Explore projects</ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      <CtaBand
        title="Let's talk about your site."
        body="Tell us what you are imagining and where. A conversation is a good place to begin."
        secondary={{ label: "Explore projects", href: "/projects" }}
      />
    </>
  );
}
