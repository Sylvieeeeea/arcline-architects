import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { ButtonLink } from "@/components/ui/Button";
import { TextLink } from "@/components/ui/TextLink";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <Container className="py-24 lg:py-40">
      <p className="eyebrow text-olive-deep">Error 404</p>
      <h1 className="mt-6 max-w-3xl font-serif text-h1 font-medium">This page could not be found.</h1>
      <p className="mt-8 max-w-xl text-lead text-stone-deep">
        The page you are looking for may have moved, or the address may be incorrect. You can return home or browse the
        projects.
      </p>
      <div className="mt-12 flex flex-wrap items-center gap-8">
        <ButtonLink href="/">Back to home</ButtonLink>
        <TextLink href="/projects">Browse projects</TextLink>
      </div>
    </Container>
  );
}
