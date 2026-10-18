import { Container } from "@/components/layout/Container";
import { ButtonLink } from "@/components/ui/Button";

type CtaBandProps = {
  eyebrow?: string;
  title: string;
  body?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
};

/** Full-width call to action used at the end of pages. */
export function CtaBand({
  eyebrow = "Start a project",
  title,
  body,
  primary = { label: "Start a project", href: "/contact" },
  secondary,
}: CtaBandProps) {
  return (
    <section aria-labelledby="cta-heading" className="bg-olive-deep text-ivory">
      <Container className="grid gap-10 py-24 lg:grid-cols-12 lg:items-end lg:py-32">
        <div className="lg:col-span-8">
          <p className="eyebrow mb-6 text-sand">{eyebrow}</p>
          <h2 id="cta-heading" className="font-serif text-h1 font-medium">
            {title}
          </h2>
          {body && <p className="mt-6 max-w-xl text-lead text-ivory/90">{body}</p>}
        </div>
        <div className="flex flex-wrap gap-4 lg:col-span-4 lg:justify-end">
          <ButtonLink href={primary.href} variant="light">
            {primary.label}
          </ButtonLink>
          {secondary && (
            <ButtonLink
              href={secondary.href}
              variant="outline"
              className="border-ivory text-ivory hover:bg-ivory hover:text-charcoal"
            >
              {secondary.label}
            </ButtonLink>
          )}
        </div>
      </Container>
    </section>
  );
}
