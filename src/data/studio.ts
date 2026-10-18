import type { Principle, ProcessStep } from "@/types/content";

/** Studio philosophy content. Describes proposed identity only. No fabricated history or people. */

export const principles: Principle[] = [
  {
    title: "Site before form",
    body: "Every design begins with the ground, the climate and the surroundings. Form follows from understanding a place, not from a preset style.",
  },
  {
    title: "Light as a material",
    body: "Daylight shapes how a space feels from hour to hour. We treat it as something to be shaped, filtered and framed with intent.",
  },
  {
    title: "Honest materials",
    body: "A small number of well-chosen materials, used truthfully, give buildings depth, durability and quiet character.",
  },
  {
    title: "Restraint and proportion",
    body: "Clarity comes from knowing what to leave out. Careful proportion and edit make spaces feel calm rather than empty.",
  },
  {
    title: "Designed for use",
    body: "Beautiful buildings also have to work. We design for daily life, comfort, flexibility and the long term.",
  },
];

export const approachSteps: ProcessStep[] = [
  {
    title: "Listen",
    body: "We begin by understanding your goals, how you will use the space, and what matters most to you.",
  },
  {
    title: "Read the site",
    body: "We study the land, light, climate, views and context to find what the place is asking for.",
  },
  {
    title: "Explore",
    body: "We test ideas through sketches, models and options, comparing them honestly against your brief.",
  },
  {
    title: "Refine",
    body: "We develop the preferred direction with care, resolving proportion, materials and detail.",
  },
];

export const contextTopics: { title: string; body: string }[] = [
  {
    title: "Materials",
    body: "We favour materials that age well, suit their climate and reveal their nature. The palette is kept small so each one can be used with care.",
  },
  {
    title: "Light",
    body: "We study the path of the sun and shape openings, overhangs and surfaces so that light enters gently and changes through the day.",
  },
  {
    title: "Space",
    body: "We think in sequences of rooms, thresholds and outlooks, giving each space a clear role and a sense of arrival.",
  },
  {
    title: "Context",
    body: "We consider neighbours, landscape and local building traditions so that new work sits comfortably in its setting.",
  },
];
