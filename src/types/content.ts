/** Shared content types. All site content is typed local data (see src/data). */

export const projectCategories = ["Residential", "Commercial", "Interiors", "Conceptual"] as const;
export type ProjectCategory = (typeof projectCategories)[number];

/** Every project is a demonstration concept. Statuses describe the design stage only. */
export type ProjectStatus = "Concept" | "Design study" | "Speculative";

/** Kinds of generated drawing used until real photography is supplied. */
export type ArtVariant = "elevation" | "tower" | "plan" | "section" | "interior" | "landscape";
export type ArtTone = "light" | "dark" | "olive";

export type SiteImage = {
  /**
   * Path under /public (e.g. "/images/stonecourse-main.jpg"). When omitted, a
   * generated placeholder drawing is rendered instead. See docs/IMAGES.md.
   */
  src?: string;
  /** Describes the image for assistive technology. */
  alt: string;
  caption?: string;
  /** Placeholder drawing settings, used only when `src` is not set. */
  art: { variant: ArtVariant; tone: ArtTone; seed: number };
};

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  /** Illustrative setting only. Never a real commission location. */
  setting: string;
  status: ProjectStatus;
  summary: string;
  overview: string[];
  concept: string[];
  materials: { name: string; note: string }[];
  considerations: string[];
  /** Only facts that are true of a concept. No dimensions, budgets, dates or clients. */
  additionalInfo?: { label: string; value: string }[];
  mainImage: SiteImage;
  gallery: SiteImage[];
  featured?: boolean;
};

export type Service = {
  slug: string;
  title: string;
  description: string;
  explores: string[];
  image: SiteImage;
};

export type Principle = {
  title: string;
  body: string;
};

export type ProcessStep = {
  title: string;
  body: string;
};
