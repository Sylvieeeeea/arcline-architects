# Images: sourcing and replacing

## Current state

Every image on the site is a **generated placeholder drawing** (an original architectural-style composition rendered as inline SVG from the brand palette). Each carries a small "Concept visual" tag. They exist so the layout, proportions and hierarchy could be designed and tested without borrowing photographs whose licensing could not be verified.

No third-party images are used anywhere in the project.

## Replacing a placeholder with a photograph

1. Put the optimised image in `public/images/`, for example `public/images/stonecourse-main.jpg`.
2. In the relevant data file (`src/data/projects.ts`, `src/data/services.ts`, or the two constants at the top of `src/app/studio/page.tsx`), add `src` to that image:

   ```ts
   mainImage: {
     src: "/images/stonecourse-main.jpg",
     alt: "Describe what the photograph actually shows.",
     art: { variant: "elevation", tone: "light", seed: 11 }, // ignored once src is set
   },
   ```

3. Update `alt` to describe the real photograph, not the placeholder.

When `src` is set, the site uses `next/image` automatically: responsive sizes, lazy loading, and `priority` on the main hero image of each page. The "Concept visual" tag is not shown. Images can be replaced one at a time; mixed placeholder and photographic pages work.

## Recommendations

- Export at about 2400px wide (JPEG or AVIF/WebP), roughly 300 to 600 KB each. `next/image` generates smaller sizes on demand.
- Keep a consistent crop. Most frames are 4:3, 5:4, 4:5, 16:9 or 21:9, and are cropped with `object-cover`, so keep the subject away from the extreme edges.
- Use a mix of exteriors, interiors, details and models so a project page does not repeat a single view.

## Sourcing and licensing

Only use images you have the right to use commercially: your own photography, commissioned work, or images from a source whose licence permits this use. Keep a record for each image in the table below (source, licence, author, link) so it can be audited later.

| File | Used by | Source | Licence | Author / link |
|---|---|---|---|---|
| _(none yet)_ | | | | |

If you want to load images from a remote host instead of `public/`, add that host to `images.remotePatterns` in `next.config.ts` first.
