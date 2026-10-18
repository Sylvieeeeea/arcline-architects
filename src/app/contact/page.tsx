import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Start a project",
  description: "Tell Arcline Architects about your site, brief and timeline to begin exploring a project together.",
};

const helpful = [
  "Where the project is, and what the site is like.",
  "Who will use the space and how.",
  "Any ideas, references or constraints you already have.",
  "Your rough timing, and budget if you have one in mind.",
];

export default function ContactPage() {
  return (
    <Container className="pb-24 pt-16 lg:pb-36 lg:pt-24">
      <div className="grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading
            as="h1"
            size="h1"
            eyebrow="Start a project"
            title="Tell us what you are imagining"
            intro="Share a few details about your project. The more you can tell us about the place and the people, the better."
          />
          <div className="mt-12 border-t hairline pt-8">
            <h2 className="eyebrow text-olive-deep">Helpful to include</h2>
            <ul className="mt-5 space-y-3">
              {helpful.map((item) => (
                <li key={item} className="flex items-start gap-3 text-stone-deep">
                  <span aria-hidden="true" className="mt-[0.7em] h-1.5 w-1.5 shrink-0 bg-olive" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </Container>
  );
}
