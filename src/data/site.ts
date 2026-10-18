/**
 * Site-wide content: navigation and studio identity.
 * ARCLINE ARCHITECTS is a conceptual brand. Do not add real company
 * credentials, addresses, or contact details here until they are verified.
 */

export const site = {
  name: "ARCLINE ARCHITECTS",
  shortName: "Arcline",
  tagline: "Shaping Spaces. Defining Futures.",
  description:
    "Arcline Architects is a conceptual architecture studio exploring residential, commercial, interior and landscape design through light, material and context.",
  conceptNotice:
    "ARCLINE ARCHITECTS is a conceptual studio brand. Projects shown are demonstration concepts, not completed commissions.",
  // Set real contact details here once confirmed. Left empty on purpose.
  contact: {
    email: "",
    phone: "",
    address: "",
  },
} as const;

export type NavItem = { label: string; href: string };

export const primaryNav: NavItem[] = [
  { label: "Projects", href: "/projects" },
  { label: "Studio", href: "/studio" },
  { label: "Services", href: "/services" },
];

export const ctaNav: NavItem = { label: "Start a project", href: "/contact" };
