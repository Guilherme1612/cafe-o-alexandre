# Phase 3 Pattern Map

## Reuse from existing site

- Keep the single `cafe` object in `src/data/cafe.ts` as the source of the gallery state and future image metadata.
- Extend the existing `Café images` section in `src/pages/index.astro`; do not create another route, component framework, or hydration island.
- Reuse global tokens, `.section`, `.measure`, `.placeholder`, responsive breakpoints, focus/reduced-motion rules, and the existing static Node tests.
- Preserve the Phase 2 content-truth rule: unresolved placeholders are visible plain text and never become `src`, `href`, or fake controls.

## Gallery mapping

| Need | Existing analog | Direction |
| --- | --- | --- |
| No supplied images | Phase 2 unavailable contact/map states | Render a bordered “Photos coming soon” empty state without an image element.
| Supplied photo cards | `.details-list` responsive grid | Add a semantic gallery grid with `<figure>`, local `<img>`, visible `<figcaption>`, lazy loading, and explicit dimensions/aspect ratio.
| Alt/caption truth | Source-backed fields and placeholder tests | Store image metadata in data; require meaningful alt text and captions before rendering.
| Static safety | `tests/static-build.test.mjs` | Assert empty fallback now and image count/alt/path checks when real assets are added.

## Greenfield gaps and prohibitions

- No café image files currently exist in `public/` or `src/`; the sponsor image remains excluded.
- No existing lightbox, modal, image CDN, responsive image helper, or gallery component exists. Do not add one for this phase.
- The gallery is informational, not interactive: images are not links and do not need client-side behavior.
- Keep photo layout fluid at 320px/200% zoom; avoid fixed-height cards that clip captions.

## Verification cues

- Build and run `npm test` after the gallery template/data changes.
- Browser smoke should confirm the empty state has no broken image, no horizontal overflow, and readable text at 320px, 768px, and 1200px.
