import type { Project, ProjectCategory } from "@/types/content";

/**
 * Demonstration projects. ARCLINE ARCHITECTS is a conceptual brand, so every
 * entry is a design concept: no real clients, dimensions, budgets, dates, or
 * completed commissions. Replace with real work only when it exists.
 */
export const projects: Project[] = [
  {
    slug: "stonecourse-house",
    title: "Stonecourse House",
    category: "Residential",
    setting: "Dry-climate plot, illustrative",
    status: "Concept",
    summary: "A single-storey family home organised around a shaded central court.",
    overview: [
      "Stonecourse House imagines a family home that turns inward toward a protected courtyard, so that every principal room has a calm, private outlook and a direct relationship with daylight.",
      "The plan is deliberately simple: living, sleeping and service wings meet at the court, which acts as the circulation spine, a source of cross-ventilation, and a place to gather outdoors.",
    ],
    concept: [
      "Thick, low walls and deep overhangs frame the sky rather than the street. The court is the one generous gesture; everything else is quiet and considered.",
      "Openings are placed to capture low morning light and avoid harsh midday sun, giving each room a distinct character through the day.",
    ],
    materials: [
      { name: "Rammed earth walls", note: "Proposed for thermal mass and a warm, tonal surface." },
      { name: "Timber screens", note: "Filter light and provide privacy while keeping ventilation open." },
      { name: "Honed stone paving", note: "Continues from court to interior to blur the threshold." },
      { name: "Lime plaster", note: "A matte, breathable finish for interior walls." },
    ],
    considerations: [
      "Passive cooling through shading, thermal mass and cross-ventilation.",
      "Clear separation of private and shared zones around one central court.",
      "Landscape treated as a room, with planting chosen for the local climate.",
    ],
    additionalInfo: [
      { label: "Nature", value: "Conceptual study" },
      { label: "Programme", value: "Single-family residence" },
    ],
    mainImage: {
       src: "/images/2.jpeg",
      alt: "Concept elevation drawing of a low courtyard house with stacked volumes and a long timber-screened wall.",
      art: { variant: "elevation", tone: "light", seed: 11 },
    },
    gallery: [
      {
        alt: "Concept plan drawing showing rooms arranged around a central courtyard.",
        caption: "Plan concept: rooms gather around the court.",
        art: { variant: "plan", tone: "light", seed: 12 },
      },
      {
        alt: "Concept interior drawing of a living space opening through an arch to light.",
        caption: "Interior concept: a threshold of light.",
        art: { variant: "interior", tone: "olive", seed: 13 },
      },
      {
        alt: "Concept landscape drawing of contours and a path leading to the house.",
        caption: "Site concept: a path that slows the approach.",
        art: { variant: "landscape", tone: "dark", seed: 14 },
      },
    ],
    featured: true,
  },
  {
    slug: "ridgeline-residence",
    title: "Ridgeline Residence",
    category: "Residential",
    setting: "Sloping hillside site, illustrative",
    status: "Design study",
    summary: "A stepped house that follows the fall of a hillside and opens to long views.",
    overview: [
      "Ridgeline Residence studies how a home can sit lightly on a slope. Rather than levelling the land, the building steps down with it, so each level has its own relationship to the ground and the view.",
      "Terraces extend living spaces outward, and a continuous stair links the levels, turning movement through the house into part of the experience.",
    ],
    concept: [
      "The section drives the design. Floor levels follow the contours, minimising earthworks and creating a variety of ceiling heights and outlooks.",
      "A strong roofline reads as a single horizontal gesture against the hillside, while the lower levels dissolve into planting.",
    ],
    materials: [
      { name: "Board-formed concrete", note: "Proposed for retaining elements and the structural spine." },
      { name: "Charred timber cladding", note: "A durable, dark surface that recedes into the landscape." },
      { name: "Weathering steel", note: "Used for edges and balustrades, ageing to a warm tone." },
      { name: "Native planting", note: "Stabilises the slope and softens the lower levels." },
    ],
    considerations: [
      "Working with the slope to reduce excavation and drainage problems.",
      "Orienting terraces for view, shade and privacy.",
      "A stair designed as a place, not just a connection.",
    ],
    additionalInfo: [
      { label: "Nature", value: "Design study" },
      { label: "Programme", value: "Single-family residence on a slope" },
    ],
    mainImage: {
       src: "/images/8.jpeg",
      alt: "Concept section drawing of a stepped house descending a slope with a continuous stair.",
      art: { variant: "section", tone: "light", seed: 21 },
    },
    gallery: [
      {
        alt: "Concept elevation of horizontal floor plates stepping down a hillside.",
        caption: "Elevation concept: floors follow the contours.",
        art: { variant: "elevation", tone: "dark", seed: 22 },
      },
      {
        alt: "Concept landscape drawing with contour lines wrapping a terrace.",
        caption: "Terrace and contour study.",
        art: { variant: "landscape", tone: "light", seed: 23 },
      },
      {
        alt: "Concept interior drawing of a double-height room with a long window.",
        caption: "Interior concept: framing the valley.",
        art: { variant: "interior", tone: "light", seed: 24 },
      },
    ],
    featured: true,
  },
  {
    slug: "meridian-workplace",
    title: "Meridian Workplace",
    category: "Commercial",
    setting: "Urban infill plot, illustrative",
    status: "Concept",
    summary: "A low-rise workplace with a deep, shaded facade and a generous shared atrium.",
    overview: [
      "Meridian Workplace explores an office building that feels calm and human in scale. A central atrium brings daylight into the floor plates and gives the building a shared heart.",
      "Floor plates are kept open and flexible, so teams can reorganise over time without rebuilding.",
    ],
    concept: [
      "The facade is treated as a layered filter: vertical fins and deep reveals control glare and heat while keeping outward views.",
      "At street level the building steps back to create a shaded public edge, offering a place to pause as part of the city.",
    ],
    materials: [
      { name: "Exposed concrete frame", note: "Proposed as a clear, honest structural expression." },
      { name: "Anodised metal fins", note: "Solar shading with a refined, repeating rhythm." },
      { name: "Glazing", note: "High-performance units chosen for daylight and comfort." },
      { name: "Oak and acoustic felt", note: "Interior warmth and sound control in shared spaces." },
    ],
    considerations: [
      "Daylight and glare control across all orientations.",
      "Flexible floor plates and clear circulation.",
      "A welcoming, shaded street edge.",
    ],
    additionalInfo: [
      { label: "Nature", value: "Conceptual study" },
      { label: "Programme", value: "Mid-scale office building" },
    ],
    mainImage: {
       src: "/images/16.jpeg",
      alt: "Concept elevation drawing of a low-rise office building with vertical fins and a stepped podium.",
      art: { variant: "tower", tone: "light", seed: 31 },
    },
    gallery: [
      {
        alt: "Concept section through an office building showing a central atrium.",
        caption: "Section concept: a daylit atrium.",
        art: { variant: "section", tone: "dark", seed: 32 },
      },
      {
        alt: "Concept plan drawing of an open office floor plate.",
        caption: "Typical floor plan concept.",
        art: { variant: "plan", tone: "light", seed: 33 },
      },
      {
        alt: "Concept interior drawing of a shared lobby with a tall opening.",
        caption: "Lobby concept.",
        art: { variant: "interior", tone: "olive", seed: 34 },
      },
    ],
    featured: true,
  },
  {
    slug: "oak-and-plaster-apartment",
    title: "Oak & Plaster Apartment",
    category: "Interiors",
    setting: "City apartment, illustrative",
    status: "Concept",
    summary: "A restrained apartment interior built from warm timber and soft lime plaster.",
    overview: [
      "This interior study reimagines a compact city apartment as a sequence of calm, connected spaces, using a limited palette to create depth without clutter.",
      "Built-in joinery absorbs storage so that rooms stay open and uncluttered, and a pale plaster backdrop lets light do most of the work.",
    ],
    concept: [
      "Material is the main design tool. A small number of tactile surfaces are repeated with care, so the home feels coherent and quiet.",
      "Arched openings soften the transitions between rooms and give each threshold a sense of arrival.",
    ],
    materials: [
      { name: "Oak joinery", note: "Proposed for built-in storage, shelving and seating." },
      { name: "Lime plaster", note: "A matte, tonal finish that catches changing light." },
      { name: "Terrazzo", note: "A durable floor with subtle flecks of colour." },
      { name: "Linen and wool textiles", note: "Soft layers for comfort and acoustic warmth." },
    ],
    considerations: [
      "Maximising daylight in a compact footprint.",
      "Concealed, integrated storage.",
      "A limited, durable material palette.",
    ],
    additionalInfo: [
      { label: "Nature", value: "Interior concept" },
      { label: "Programme", value: "Compact urban apartment" },
    ],
    mainImage: {
       src: "/images/10.jpeg",
      alt: "Concept interior drawing of a calm living space with an arched opening and a long bench.",
      art: { variant: "interior", tone: "light", seed: 41 },
    },
    gallery: [
      {
        alt: "Concept plan drawing of a compact apartment layout.",
        caption: "Layout concept.",
        art: { variant: "plan", tone: "olive", seed: 42 },
      },
      {
        alt: "Concept elevation drawing of a built-in joinery wall.",
        caption: "Joinery wall concept.",
        art: { variant: "elevation", tone: "light", seed: 43 },
      },
      {
        alt: "Concept interior drawing of a bedroom with a low window.",
        caption: "Bedroom concept.",
        art: { variant: "interior", tone: "dark", seed: 44 },
      },
    ],
  },
  {
    slug: "horizon-pavilion",
    title: "Horizon Pavilion",
    category: "Conceptual",
    setting: "Open landscape, illustrative",
    status: "Speculative",
    summary: "A minimal pavilion that frames a single, uninterrupted view of the horizon.",
    overview: [
      "Horizon Pavilion is a speculative study in restraint: a single room, a long roof and one carefully framed view. It asks how little architecture is needed to make a place meaningful.",
      "The pavilion could serve as a retreat, a viewing shelter or a quiet gathering space within a larger landscape.",
    ],
    concept: [
      "A thin roof plane floats above a low plinth, with the sky as the primary material. The building is mostly edges and shadow.",
      "Light moves across the plinth through the day, turning the structure into a quiet instrument for observing time.",
    ],
    materials: [
      { name: "Cast stone plinth", note: "A solid, grounded base for the structure." },
      { name: "Slim steel columns", note: "Minimal supports that keep the roof light." },
      { name: "Timber roof soffit", note: "Warmth overhead and a soft reflection of light." },
    ],
    considerations: [
      "Framing the horizon with a single deliberate opening.",
      "Minimal footprint on the surrounding landscape.",
      "Shade and shelter without enclosing the view.",
    ],
    additionalInfo: [
      { label: "Nature", value: "Speculative study" },
      { label: "Programme", value: "Viewing and gathering pavilion" },
    ],
    mainImage: {
      alt: "Concept landscape drawing of contour lines with a long, low pavilion roof.",
      art: { variant: "landscape", tone: "light", seed: 51 },
    },
    gallery: [
      {
        alt: "Concept section of a thin roof plane over a low plinth.",
        caption: "Section concept: a floating roof.",
        art: { variant: "section", tone: "light", seed: 52 },
      },
      {
        alt: "Concept elevation of a long pavilion against the sky.",
        caption: "Elevation concept.",
        art: { variant: "elevation", tone: "dark", seed: 53 },
      },
      {
        alt: "Concept plan of a rectangular pavilion on a plinth.",
        caption: "Plan concept.",
        art: { variant: "plan", tone: "light", seed: 54 },
      },
    ],
  },
  {
    slug: "void-library",
    title: "Void Library",
    category: "Conceptual",
    setting: "Urban block, illustrative",
    status: "Speculative",
    summary: "A speculative public library organised around a tall, light-filled void.",
    overview: [
      "Void Library imagines a public reading building where a tall central void connects every level, making the whole collection visible and the whole building legible.",
      "Reading nooks, study tables and quiet rooms wrap the void, so people can choose how close they sit to activity and light.",
    ],
    concept: [
      "The void is both the building's light well and its social heart. Stairs and bridges cross it, giving movement a quiet theatre.",
      "Surrounding floors step back at different depths, creating a landscape of levels, edges and views.",
    ],
    materials: [
      { name: "Pale concrete", note: "Proposed for the structure and the void's sculpted walls." },
      { name: "Timber shelving", note: "Warm, tactile surfaces that frame the collections." },
      { name: "Diffused skylight", note: "Soft overhead light into the void." },
    ],
    considerations: [
      "Daylight reaching all floors through the void.",
      "A range of reading settings, from social to silent.",
      "Clear wayfinding around a single central volume.",
    ],
    additionalInfo: [
      { label: "Nature", value: "Speculative study" },
      { label: "Programme", value: "Public library" },
    ],
    mainImage: {
      alt: "Concept section drawing of a library with a tall central void and stepped floors.",
      art: { variant: "section", tone: "dark", seed: 61 },
    },
    gallery: [
      {
        alt: "Concept interior drawing of a reading room opening to a tall void.",
        caption: "Reading room concept.",
        art: { variant: "interior", tone: "light", seed: 62 },
      },
      {
        alt: "Concept plan of library floors arranged around a central void.",
        caption: "Plan concept: floors around the void.",
        art: { variant: "plan", tone: "olive", seed: 63 },
      },
      {
        alt: "Concept elevation of a library facade with a recessed entrance.",
        caption: "Street elevation concept.",
        art: { variant: "tower", tone: "light", seed: 64 },
      },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}

/** Related projects: same category first, then fill with others. */
export function getRelatedProjects(project: Project, count = 3): Project[] {
  const others = projects.filter((candidate) => candidate.slug !== project.slug);
  const sameCategory = others.filter((candidate) => candidate.category === project.category);
  const rest = others.filter((candidate) => candidate.category !== project.category);
  return [...sameCategory, ...rest].slice(0, count);
}

export function countByCategory(category: ProjectCategory | "All"): number {
  return category === "All" ? projects.length : projects.filter((project) => project.category === category).length;
}
