---
phase: 01-static-foundation-content-truth
plan: 02
subsystem: ui
tags: [astro, static-html, css, accessibility, content-truth]

# Dependency graph
requires:
  - phase: 01-static-foundation-content-truth
    provides: Static Astro toolchain and shared cafe content object from 01-01
provides:
  - Semantic static page shell rendered from the shared cafe object
  - Warm responsive CSS foundation with visible focus and reduced-motion handling
  - Generated-artifact assertions for placeholders, hierarchy, destinations, and visual tokens
affects: [02-mobile-visitor-information-flow, 03-cafe-photo-gallery, 04-resilience-validation-static-launch]

# Tech tracking
tech-stack:
  added: []
  patterns: ["Astro page interpolation from one typed cafe content object", "Mobile-first global CSS tokens with semantic landmarks"]

key-files:
  created: [src/pages/index.astro, src/styles/global.css, tests/static-build.test.mjs]
  modified: []

key-decisions:
  - "Keep every unresolved business field as visible plain text; no placeholder destination or fake control is emitted."
  - "Use system sans/serif fonts and native CSS media queries so the static shell has no external runtime dependencies."

patterns-established:
  - "The page template owns structure and labels while cafe owns all business values and approved copy."
  - "Static-build tests inspect dist/index.html and source CSS declarations rather than runtime behavior."

requirements-completed: [VIS-05, ABOUT-03, UX-03]

coverage:
  - id: D1
    description: "Semantic Astro shell renders the shared café identity, empty state, landmarks, and all unresolved values as visible non-actionable placeholders."
    requirement: VIS-05
    verification:
      - kind: unit
        ref: "tests/static-build.test.mjs#generated page keeps the semantic shell and source-backed copy"
        status: pass
      - kind: unit
        ref: "tests/static-build.test.mjs#unresolved content does not become an actionable destination"
        status: pass
    human_judgment: false
  - id: D2
    description: "Global CSS establishes the burgundy, charcoal, warm gold, and cream visual foundation with responsive, focus, and reduced-motion rules."
    requirement: UX-03
    verification:
      - kind: unit
        ref: "tests/static-build.test.mjs#generated page includes the global visual contract"
        status: pass
    human_judgment: false
  - id: D3
    description: "The page preserves source-backed copy without invented offerings or claims."
    requirement: ABOUT-03
    verification:
      - kind: unit
        ref: "npm run build && npm test"
        status: pass
    human_judgment: false

# Metrics
duration: 4min
completed: 2026-08-02
status: complete
---

# Phase 1 Plan 2: Semantic shell and visual foundation summary

**Static Astro page shell with café-sourced placeholders, warm responsive tokens, and generated-output content-truth guards**

## Performance

- **Duration:** 4 min
- **Started:** 2026-08-02T17:13:00Z
- **Completed:** 2026-08-02T17:17:04Z
- **Tasks:** 2
- **Files modified:** 3

## Accomplishments

- Added one semantic document shell with a skip link, dark hero, exactly one h1, ordered h2 sections, main, and footer landmarks.
- Rendered the typed `cafe` object and its approved empty-state copy without inventing business values or activating unresolved actions.
- Added mobile-first burgundy/charcoal/gold/cream CSS tokens, system typography, fluid width rules, visible focus, dashed placeholders, and reduced-motion behavior.
- Added deterministic tests that build and inspect the production-like `dist/index.html` plus the source stylesheet contract.

## Task Commits

Each task was committed atomically:

1. **Task 1: Render the semantic placeholder shell and visual tokens** - `9bfd53b` (feat)
2. **Task 2: Assert the generated static artifact** - `c35bebd` (test)

Additional correctness fix discovered during Task 1 verification:

- `8d19a43` (fix): bind the source-backed metadata expression correctly in generated HTML.

## Files Created/Modified

- `src/pages/index.astro` - Semantic static page shell rendered from `cafe`.
- `src/styles/global.css` - Global palette, spacing, typography, responsive, focus, and motion contract.
- `tests/static-build.test.mjs` - Node built-in assertions for static output and CSS declarations.

## Decisions Made

- Kept all unresolved address, contact, hours, social, map, description, and image fields as plain bracketed text, preserving the content-truth boundary.
- Kept the foundation static and dependency-free beyond the existing Astro toolchain; no contacts, maps, gallery, fonts, or hydrated behavior were added.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Corrected a literal Astro expression in the generated description metadata**

- **Found during:** Task 1 (Render the semantic placeholder shell and visual tokens)
- **Issue:** A quoted attribute rendered `{cafe.name}` literally in `dist/index.html` instead of evaluating the shared source value.
- **Fix:** Changed the metadata attribute to Astro's expression form, `content={cafe.name}`.
- **Files modified:** `src/pages/index.astro`
- **Verification:** `npm run build` generated `content="Café o Alexandre"`; full test suite passed.
- **Committed in:** `8d19a43`

**2. [Rule 1 - Bug] Narrowed the fixed-height test guard to exclude legitimate line-height declarations**

- **Found during:** Task 2 (Assert the generated static artifact)
- **Issue:** The initial CSS assertion matched `line-height`, causing a false failure while checking for fixed-height content.
- **Fix:** Scoped the regex to standalone `height`, `min-height`, and `max-height` property names.
- **Files modified:** `tests/static-build.test.mjs`
- **Verification:** `npm run build && npm test` passes all six tests.
- **Committed in:** `c35bebd`

---

**Total deviations:** 2 auto-fixed (2 Rule 1 bugs)
**Impact on plan:** Both fixes tightened generated-output correctness and deterministic validation; no runtime scope was added.

## Issues Encountered

None unresolved. `npm run build && npm test` passes all six tests.

## Known Stubs

The following placeholders are intentional until the café supplies verified content:

- `src/data/cafe.ts` → `[FULL ADDRESS]`, `[PHONE NUMBER]`, `[WHATSAPP NUMBER]`, `[OPENING HOURS]`, `[SOCIAL LINKS]`, `[CAFÉ DESCRIPTION]`, `[GOOGLE MAPS LINK]`, `[CAFÉ IMAGES]`.
- `src/pages/index.astro` renders those same values as informational text; later phases may replace them with verified content and native actions where appropriate.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Phase 2 can add verified practical-information and native contact/directions actions without changing the semantic shell or CSS token contract.
- Café-supplied business values and photos remain unavailable; placeholders must stay non-actionable until verified.

---
*Phase: 01-static-foundation-content-truth*
*Completed: 2026-08-02*

## Self-Check: PASSED

- `src/pages/index.astro`, `src/styles/global.css`, and `tests/static-build.test.mjs` exist.
- Commits `9bfd53b`, `8d19a43`, and `c35bebd` are present in git history.
- `npm run build && npm test` passes all six tests.
