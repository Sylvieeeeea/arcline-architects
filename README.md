# ARCLINE ARCHITECTS

A premium, responsive architecture studio website built with **Next.js (App Router), React, TypeScript and Tailwind CSS v4**.

> **ARCLINE ARCHITECTS is a conceptual brand.** All projects are demonstration concepts. The site contains no real clients, team members, awards, credentials, dimensions, budgets or completion dates, and none should be added unless they are verified.

## Prerequisites

- Node.js 20.9 or newer (developed and tested on Node 22)
- npm 10+

## Install and run

```bash
npm install
npm run dev        # development server at http://localhost:3000
```

```bash
npm run build      # production build
npm start          # serve the production build
```

## Checks

```bash
npm run lint       # ESLint
npm run typecheck  # TypeScript, no emit
npm test           # Vitest + Testing Library (32 tests)
```

The tests cover form validation, the contact form's submission states, the project filter, the mobile menu (focus trap, Escape, scroll lock) and integrity of the project and service data.

## Routes

| Route | Content |
|---|---|
| `/` | Hero, philosophy, featured projects, services summary, approach, inquiry call to action |
| `/projects` | Portfolio grid with instant category filtering |
| `/projects/[slug]` | Project detail template. Unknown slugs return a branded 404 |
| `/studio` | Philosophy, principles, approach to clients and sites |
| `/services` | Proposed design services |
| `/contact` | Project inquiry form |

## Where content lives

All content is typed local data. Edit these files, not the components.

| File | Contents |
|---|---|
| `src/data/projects.ts` | Projects (title, category, summary, overview, concept, materials, gallery) |
| `src/data/services.ts` | Services and the scope disclaimer |
| `src/data/studio.ts` | Principles, process steps, material/light/space/context copy |
| `src/data/site.ts` | Name, tagline, navigation, **contact details (empty until confirmed)** |
| `src/types/content.ts` | Types for all of the above |

### Adding a project

Add an object to the `projects` array in `src/data/projects.ts`. Use a unique, lowercase, hyphenated `slug`. The page, filter, related-projects list and static route are generated from the data automatically. The data tests will fail if a slug is duplicated or required content is missing.

## Images

The site currently shows **generated architectural-drawing placeholders**, labelled "Concept visual". They are original compositions, not photographs. See [`docs/IMAGES.md`](docs/IMAGES.md) for how to replace them with real photography.

## Environment variables

Copy `.env.example` to `.env.local` to set them.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_INQUIRY_ENDPOINT` | URL that receives inquiry form submissions as a JSON `POST` |

`NEXT_PUBLIC_` values are embedded in the browser bundle at build time and are visible to visitors. Never put a secret key in one.

## Enabling real inquiry submissions

**Out of the box, the contact form validates input but cannot send anything.** It tells the visitor so before they start, and after a valid submit it reports that the inquiry was *not* sent (and offers a "Copy my inquiry" button). It never displays a success message unless a service confirms receipt.

To enable submissions:

1. Create a form on a service that accepts JSON posts (for example Formspree), or build your own endpoint.
2. Set `NEXT_PUBLIC_INQUIRY_ENDPOINT` to its URL and rebuild.
3. The form sends `{ name, email, phone, location, projectType, budget, timeline, description }`. A 2xx response is shown as success. Anything else is shown as a failure and the visitor's answers are kept.

Before going live, also consider: spam protection (CAPTCHA or a honeypot, usually offered by the provider), a privacy notice describing how inquiries are handled (the consent checkbox refers to this), and notification settings so the inbox is actually monitored.

## Other integrations still needed

- Real studio contact details in `src/data/site.ts` (the footer shows "to be confirmed" until then).
- A production domain, after which you can add `metadataBase`, canonical URLs and an Open Graph image in `src/app/layout.tsx`. These were deliberately left out because the domain is unknown.
- Real photography (see `docs/IMAGES.md`).

## Deployment

**Vercel (recommended):** import the repository, keep the default Next.js settings, add `NEXT_PUBLIC_INQUIRY_ENDPOINT` under Environment Variables if you have one, and deploy.

**Any Node host:** run `npm run build`, then `npm start`.

## Accessibility and performance notes

- Semantic landmarks, one `h1` per page, skip link, visible focus states, keyboard-operable menu and filter, labelled form fields with linked error messages.
- Text contrast meets WCAG AA. The brand stone and olive are too light for small text, so darker derived shades (`stone-deep`, `olive-deep`) are used for that; see `src/app/globals.css`. Form control borders are 3:1 or better.
- Animation is minimal and disabled for visitors who prefer reduced motion.
- Fonts (Cormorant, Inter; both SIL OFL) are self-hosted from npm, so there are no third-party font requests.
- The filter is a small client component; the drawing code stays in the server bundle.

## Known limitations

- Visual layout was **not checked in a real browser** during development (no browser was available in the build environment). Structure, links, accessibility semantics and interactions were verified with automated tests and a built-site crawl, but please review the site on real phone, tablet and desktop screens.
- `npm audit` reports high-severity findings in the dev-only lint toolchain (`eslint-config-next` dependencies). They do not ship to visitors. The suggested automatic fix downgrades to an old Next.js config, so it was not applied. Revisit when `eslint-config-next` publishes an update.
- Project categories and statuses are fixed lists in `src/types/content.ts`; change them there.
