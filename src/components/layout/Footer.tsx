import Link from "next/link";
import { Wordmark } from "@/components/brand/Wordmark";
import { Container } from "@/components/layout/Container";
import { primaryNav, site } from "@/data/site";

const exploreLinks = [{ label: "Home", href: "/" }, ...primaryNav];

export function Footer() {
  const hasContact = Boolean(site.contact.email || site.contact.phone || site.contact.address);

  return (
    <footer className="bg-charcoal text-ivory">
      <Container className="grid gap-14 py-20 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <Wordmark className="text-ivory [&_span]:!text-ivory" />
          <p className="mt-8 max-w-sm font-serif text-h3 text-ivory/90">{site.tagline}</p>
        </div>

        <nav aria-label="Footer" className="lg:col-span-3 lg:col-start-7">
          <p className="eyebrow mb-6 text-sand">Explore</p>
          <ul className="space-y-3">
            {exploreLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-block py-1 text-ivory/90 transition-colors hover:text-sand">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <p className="eyebrow mb-6 text-sand">Start a conversation</p>
          {hasContact ? (
            <ul className="space-y-3 text-ivory/90">
              {site.contact.email && <li>{site.contact.email}</li>}
              {site.contact.phone && <li>{site.contact.phone}</li>}
              {site.contact.address && <li>{site.contact.address}</li>}
            </ul>
          ) : (
            <p className="max-w-xs text-ivory/80">Studio contact details are to be confirmed.</p>
          )}
          <Link
            href="/contact"
            className="mt-6 inline-block border-b border-sand pb-1 text-sm font-medium tracking-wide text-ivory transition-colors hover:text-sand"
          >
            Project inquiry form
          </Link>
        </div>
      </Container>

      <div className="border-t border-ivory/15">
        <Container className="flex flex-col gap-3 py-6 text-xs text-ivory/70 sm:flex-row sm:items-center sm:justify-between">
          <p>{site.conceptNotice}</p>
          <p>© {new Date().getFullYear()} ARCLINE ARCHITECTS (concept)</p>
        </Container>
      </div>
    </footer>
  );
}
