# Phase 3 Research: Café Photo Gallery

## Current state

- The Astro site is static and has one page, one shared `cafe` content object, and a mobile-first global stylesheet.
- The repository has no `public/` directory and no café image assets. The user-provided sponsor advertisement is visual inspiration only and must not be published or cropped into the gallery.
- `cafe.images` is currently `[CAFÉ IMAGES]`; this is the correct content-truth state until actual café photos and captions are supplied.

## Recommended implementation

- Keep a native, no-JavaScript gallery section in `src/pages/index.astro`.
- Represent future images as a small data array with `src`, `alt`, and optional `caption`; render `<figure>`, `<img loading="lazy">`, `<figcaption>`, and a clear empty state when the array is empty.
- Do not emit an image URL, `src`, or broken image element for the current placeholder. A visible “Photos coming soon” state is more truthful than a fake image or sponsor asset.
- Use local static assets under `public/images/` only after the user supplies café photos. Avoid remote image hosts and optimization plugins for this small static page.
- Use CSS grid with one column at narrow widths and two/three columns at 768px/1200px. Preserve `aspect-ratio`, `object-fit: cover`, rounded corners, and readable captions without fixed-height page sections.

## Accessibility and safety

- Every future image needs meaningful, non-redundant alt text; decorative images must use `alt=""` only when the adjacent caption carries the complete information.
- Captions are visible text, not hover-only content. Do not make gallery images links until a later lightbox decision is explicitly requested.
- Keep the sponsor guard: no TORRIÉ text, sponsor logo, sponsor phone, advertisement layout, or inferred café image claims.
- Keep the page usable with JavaScript disabled, reduced motion, and 200% zoom. Native `<img>` and CSS grid are sufficient.

## Verification

- Static tests should assert the empty-state fallback and that unresolved image placeholders never become `src`/`href` destinations.
- When real images arrive, add focused checks for each image's `alt`, caption, local path, and rendered count; do not weaken placeholder checks.
