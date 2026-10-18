import type { Service } from "@/types/content";

/**
 * Proposed design services. These describe design work only. No regulated
 * professional, engineering, construction, or statutory-approval services are
 * offered or implied. Update only when such services are confirmed.
 */
export const services: Service[] = [
  {
    slug: "architectural-design",
    title: "Architectural design",
    description:
      "Concept to detailed design for buildings of many kinds, with a focus on clear ideas, honest materials and well-judged proportion.",
    explores: ["Massing and spatial strategy", "Plans, sections and elevations", "Material and detail direction"],
    image: {
      alt: "Concept elevation drawing of stacked architectural volumes.",
      art: { variant: "elevation", tone: "light", seed: 71 },
    },
  },
  {
    slug: "residential-architecture",
    title: "Residential architecture",
    description:
      "Homes shaped around how people really live, balancing privacy, light and a considered relationship with the site.",
    explores: ["Houses and extensions", "Courtyards and outdoor living", "Climate-aware planning"],
    image: {
      alt: "Concept plan drawing of a home arranged around a court.",
      art: { variant: "plan", tone: "olive", seed: 72 },
    },
  },
  {
    slug: "commercial-architecture",
    title: "Commercial architecture",
    description:
      "Workplaces, retail and hospitality spaces that feel calm, flexible and distinctive, and that support the people who use them.",
    explores: ["Workplaces and studios", "Retail and hospitality", "Facade and daylight strategy"],
    image: {
      alt: "Concept elevation drawing of a commercial building with vertical fins.",
      art: { variant: "tower", tone: "dark", seed: 73 },
    },
  },
  {
    slug: "interior-design",
    title: "Interior design",
    description:
      "Interiors built from a small number of tactile materials, with joinery, light and furniture treated as part of the architecture.",
    explores: ["Spatial layouts and joinery", "Material and colour palettes", "Lighting and atmosphere"],
    image: {
      alt: "Concept interior drawing of a calm room with an arched opening.",
      art: { variant: "interior", tone: "light", seed: 74 },
    },
  },
  {
    slug: "landscape-and-outdoor-spaces",
    title: "Landscape and outdoor-space design",
    description:
      "Courts, terraces and gardens designed as extensions of the building, shaping shade, movement and quiet places to pause.",
    explores: ["Courtyards and terraces", "Paths, levels and thresholds", "Planting and shade strategy"],
    image: {
      alt: "Concept landscape drawing of contour lines and a path.",
      art: { variant: "landscape", tone: "light", seed: 75 },
    },
  },
  {
    slug: "concept-development",
    title: "Concept development and design consultation",
    description:
      "Early-stage thinking for clients still shaping a brief: testing ideas, exploring options and clarifying direction before design begins.",
    explores: ["Brief and site review", "Options and massing studies", "Design direction workshops"],
    image: {
      alt: "Concept section drawing exploring building levels.",
      art: { variant: "section", tone: "olive", seed: 76 },
    },
  },
];

export const servicesDisclaimer =
  "Arcline's proposed services are design services only. Structural and other engineering, construction, project management, and statutory approvals are not offered or implied unless and until confirmed.";
