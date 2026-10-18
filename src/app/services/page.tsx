import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { ServiceRow } from "@/components/services/ServiceRow";
import { CtaBand } from "@/components/ui/CtaBand";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services, servicesDisclaimer } from "@/data/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Proposed design services from Arcline Architects: architectural, residential, commercial, interior and landscape design, and concept development.",
};

export default function ServicesPage() {
  return (
    <>
      <Container className="pb-12 pt-16 lg:pb-16 lg:pt-24">
        <SectionHeading
          as="h1"
          size="h1"
          eyebrow="Services"
          title="Design across architecture, interiors and landscape"
          intro="The studio proposes a focused range of design services, each shaped by a close reading of site, light and use."
        />
      </Container>

      <section aria-label="Services" className="pb-12">
        <Container>
          {services.map((service, index) => (
            <ServiceRow key={service.slug} service={service} index={index} reverse={index % 2 === 1} />
          ))}
        </Container>
      </section>

      <section aria-label="Scope of services" className="pb-24 lg:pb-32">
        <Container>
          <p className="max-w-3xl border-t hairline pt-8 text-sm text-stone-deep">{servicesDisclaimer}</p>
        </Container>
      </section>

      <CtaBand
        title="Not sure which service fits?"
        body="Start with a short description of your project and we can work out the right shape of engagement together."
      />
    </>
  );
}
