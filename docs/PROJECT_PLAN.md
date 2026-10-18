npm run# ARCLINE ARCHITECTS — Project Plan (Phase 1)

Status: **Approved. Phases 2 to 6 implemented.** The open questions below were resolved with the stated defaults: placeholder imagery, a UI-only contact form, Vercel as the deploy target, neutral contact details and six conceptual projects. See README.md for handover and docs/IMAGES.md for imagery.

## 1. Repository findings

- Working directory `/home/claude` is empty: no repository, no `package.json`, no git history, no existing source or docs.
- Nothing to preserve or migrate. This is a greenfield build.
- Toolchain verified in this environment: Node v22.22.0, npm 10.9.4.
- npm registry is reachable. Verified current versions: Next.js 16.4.0, React 19.3.0, Tailwind CSS 4.3.3 (+ `@tailwindcss/postcss` 4.3.3), ESLint 10.12.0, `eslint-config-next` 16.4.0, `lucide-react` 1.55.0.
- Google Fonts and image CDNs (Unsplash, Pexels) are **not reachable from the shell** (allowlist). See "Open questions".

## 2. Stack (greenfield, per spec)

- Next.js (App Router) + React + TypeScript + Tailwind CSS v4 (CSS-first config via `@theme`).
- Fonts self-hosted through npm (`@fontsource-variable/*`) or `next/font`, so no runtime third-party font requests.
- Icons: `lucide-react`, only if needed (menu/close/arrow). Inline SVG preferred where trivial.
- No animation library, no backend, no CMS, no auth, no database.
- Exact versions pinned after install; TypeScript version checked against Next's supported range before locking.

## 3. Page structure (routes)

| Route | Purpose |
|---|---|
| `/` | Hero, philosophy, featured projects, services summary, approach, inquiry CTA |
| `/projects` | Intro, category filter (client-side), responsive grid |
| `/projects/[slug]` | Reusable detail template; `generateStaticParams`; `notFound()` for bad slugs |
| `/studio` | Philosophy, principles, approach to clients/sites/materials/light/context |
| `/services` | Six proposed services as editorial rows |
| `/contact` | Start-a-project form with validation |
| `not-found` | Branded 404 |

## 4. Component architecture

```
src/
  app/                      routes, layouts, metadata, not-found
  components/
    layout/                 Header, MobileNav, Footer, Container
    ui/                     Button, TextLink, SectionHeading, Tag
    portfolio/              ProjectCard, ProjectGrid, ProjectFilter, ProjectGallery, RelatedProjects
    services/               ServiceRow
    contact/                ContactForm, Field, Select, Textarea
    brand/                  Wordmark (+ optional geometric mark)
  data/                     projects.ts, services.ts, site.ts (nav, studio copy)
  lib/                      validation.ts, project helpers
  types/                    Project, Service, form types
public/images/              local, optimized, credited images
docs/                       PROJECT_PLAN.md, IMAGES.md, README handover content
```

Single source of truth: projects and services come from typed local data; no duplicated content in components.

## 5. Visual direction / design system

- Tokens (Tailwind `@theme`): ivory `#F6F4EF`, white `#FFFFFF`, charcoal `#242522`, stone `#8C8B83`, sand `#DCD4C6`, olive `#777B65`.
- Contrast: charcoal on ivory/white for body text. Stone is below AA for small text on ivory, so it is restricted to large text, borders and decorative use. Olive used for accents and large UI, checked before use on small text.
- Type: editorial serif for display (candidate: Cormorant), clean sans for UI/body (candidate: Inter). Both open-licensed (SIL OFL), self-hosted, with system fallbacks.
- Layout language: 12-column grid, generous whitespace, asymmetric image/text compositions, hairline borders, small caps-style labels, minimal radii. No gradients, glass effects, or rounded-card grids.
- Wordmark: original typographic ARCLINE wordmark (spaced serif capitals) with an optional simple geometric mark built from intersecting structural lines. Delivered as inline SVG.
- Motion: short opacity/translate transitions and image hover scale; all gated by `prefers-reduced-motion`.
- Responsive: mobile-first, deliberate mobile compositions (full-screen menu, stacked editorial layouts, 44px touch targets).

## 6. Honesty and content rules

- ARCLINE is a conceptual brand. No invented team, awards, clients, credentials, history, budgets, dimensions, or completion dates.
- Every project is labelled as a **concept / demonstration project** (status values such as "Concept", "Design study"). Locations are used only as illustrative settings, and the data model leaves optional facts empty rather than inventing them.
- Services copy states no engineering, construction, or statutory-approval offerings.
- Contact form: validation and UI are built. Because no submission service exists yet, the form will state clearly that submissions are not being sent, and will never show a fake success state. `docs` will explain how to enable real submissions (e.g. a server action or route handler with an email/forms provider, env vars, spam protection).
- No canonical URLs or structured data until the production domain and real business details exist.

## 7. Implementation sequence

1. **Foundation:** scaffold Next.js/TS/Tailwind, tokens, fonts, layout, Header/MobileNav/Footer, Wordmark, UI primitives. Confirm dev server and build run.
2. **Core pages:** data + types, Home, Projects, project-detail template, Studio, Services, Contact, not-found.
3. **Functionality:** project filter, slug routing and related projects, mobile menu, form validation and states, focus/hover states, reduced motion.
4. **Testing:** lint, type-check, production build, link and route checks, responsive review at several widths, accessibility pass, console check.
5. **Documentation:** README/handover (install, dev, build, content locations, adding images, env vars, integrations, deployment).

After each phase I will report what changed, which files, which checks actually ran, and what remains.

## 8. Open questions (need answers before Phase 2)

1. **Imagery source.** The workspace can't reach Unsplash/Pexels or Google Fonts directly. Options: (a) you supply or upload images you have rights to; (b) I use CDN image URLs in the project and you verify them in your browser; (c) I build with clearly marked placeholder compositions now and we swap in real photos. Which do you prefer?
2. **Server-side form submission:** keep as UI-only for release one (per spec), or choose a provider now (e.g. Formspree, Resend)?
3. **Hosting target** (e.g. Vercel), so deployment docs match.
4. **Studio location/contact details:** use neutral placeholders (e.g. an unconfigured contact email) until you give real ones?
5. **Project count:** 6 conceptual projects across the four categories is the proposed default. Confirm or adjust.
