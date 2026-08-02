# Phase 4 Research: Resilience, Validation & Static Launch

## Current implementation

- Astro builds one static `/index.html` with no server, database, external font, client framework, map iframe, or gallery runtime.
- The Node test suite already checks content truth, action gating, semantic landmarks, gallery fallback, palette, focus, breakpoints, and reduced motion.
- Local `agent-browser` smoke has confirmed no horizontal overflow at 320/768/1200 and at a simulated 200% zoom, visible skip-link focus, and reduced-motion transitions.

## Launch checks

- Keep `npm run build && npm test` as the primary deterministic gate. Inspect `dist/index.html` rather than only source files.
- Confirm JavaScript is unnecessary: all current content, placeholders, native links, and gallery fallback render in static HTML.
- Confirm unresolved placeholders remain non-actionable, sponsor branding is absent, and no external asset request is required for the default page.
- Use the existing local static output for deployment; no new adapter or hosting dependency is needed for the static Astro target.

## Resilience concerns

- Missing business facts are expected, not errors: preserve visible bracketed values and clear fallback copy until the owner supplies verified details.
- Missing café photos are expected: keep the gallery empty state and do not substitute the sponsor image.
- Narrow widths and 200% zoom must wrap content; avoid introducing fixed heights, min-widths, or overflow clipping.
- Reduced-motion users should see no transition/animation effects. Focus rings and semantic landmarks are mandatory accessibility safety nets.

## Minimal output

Phase 4 should add only final validation coverage and a launch checklist/evidence artifact. Do not add new product features or deferred v2 enhancements.
