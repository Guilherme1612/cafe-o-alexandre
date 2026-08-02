# Phase 4 Pattern Map

## Reusable validation patterns

- `npm run build && npm test` is the project gate; tests use Node's built-in `assert`/`node:test` and inspect `dist/index.html` plus source CSS.
- Content truth lives in `src/data/cafe.ts`; tests assert explicit placeholders and destination-scheme safety.
- Browser smoke uses native `agent-browser` against the local Astro dev server for widths, focus, overflow, and reduced-motion evidence.
- Phase verification artifacts use frontmatter status, requirement coverage, commands, rendered evidence, and a concise verdict.

## Phase 4 mapping

| Need | Existing analog | Direction |
| --- | --- | --- |
| Static launch confidence | Phase 1/2/3 summaries and verification | Add a final validation plan/report; avoid production code changes unless a real regression appears.
| Missing facts/images resilience | Data/content and gallery tests | Assert placeholders remain visible/non-actionable and no sponsor substitutions appear.
| Responsive/accessibility resilience | Existing CSS contract and browser smoke | Re-run widths, 200% zoom, skip-link focus, and reduced motion; record exact evidence.
| Deployment readiness | Astro static output | Confirm `dist/` builds without network-dependent assets and document the static-host handoff.

## Greenfield gaps and prohibitions

- No CI, deployment provider integration, analytics, CMS, runtime server, or external monitor exists; none is needed for this launch gate.
- Do not add v2 enhancements (map iframe, lightbox, sticky actions, structured data, downloadable menu) during validation.
- Preserve unrelated `.planning/research/.cache/` and `.superpowers/` files.
