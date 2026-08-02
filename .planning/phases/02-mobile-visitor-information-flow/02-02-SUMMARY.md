---
phase: 02-mobile-visitor-information-flow
plan: 02
subsystem: testing
tags: [node-test, static-build, content-truth, accessibility]

# Dependency graph
requires:
  - phase: 02-mobile-visitor-information-flow
    provides: Visitor-facing Astro structure and safely gated action paths from 02-01
provides:
  - Expanded content placeholder regression coverage
  - Generated HTML assertions for hero actions, sections, footer, and destination safety
affects: [03-cafe-photo-gallery, 04-resilience-validation-static-launch]

# Tech tracking
tech-stack:
  added: []
  patterns: ["Node built-in tests inspect the static artifact", "Expected placeholder counts document intentional footer repetition"]

key-files:
  created: []
  modified: [tests/content-truth.test.mjs, tests/static-build.test.mjs]

key-decisions:
  - "Keep tests framework-free and file-local; build first, then inspect dist/index.html and source CSS."
  - "Expect address and phone placeholders at their intentional hero/details/footer locations instead of weakening repetition checks."
  - "Validate palette in the source stylesheet because Astro emits CSS as a linked static asset, not inline HTML."

requirements-completed: [VIS-01, VIS-02, VIS-03, VIS-04, ABOUT-01, ABOUT-02, MAP-01, MAP-02, UX-01, UX-02, UX-04]

coverage:
  - id: D1
    description: "Content test requires all visitor information fields and explicit placeholders."
    requirement: UX-04
    verification:
      - kind: unit
        ref: "tests/content-truth.test.mjs#all unknown café fields stay explicit, non-empty placeholders"
        status: pass
    human_judgment: false
  - id: D2
    description: "Static output test protects hero actions, sections, footer repetition, destination gating, and visual accessibility hooks."
    requirement: VIS-01
    verification:
      - kind: unit
        ref: "tests/static-build.test.mjs#generated page keeps the semantic shell and source-backed copy"
        status: pass
      - kind: unit
        ref: "tests/static-build.test.mjs#unresolved content does not become an actionable destination"
        status: pass
      - kind: unit
        ref: "tests/static-build.test.mjs#generated page includes the global visual contract"
        status: pass
    human_judgment: false

status: complete
---

# Phase 2 Plan 2: Static verification summary

## Accomplishments

- Added the café offer placeholder to the source content-truth contract.
- Updated generated-page assertions for hero address/actions, About Us, offer, practical information, social media, directions, and footer contact repetition.
- Preserved guards against tel/WhatsApp/Maps/social/image/sponsor destinations while unresolved values remain placeholders.
- Kept responsive, focus, touch, zoom, palette, and reduced-motion checks in the static CSS contract.

## Task commits

1. **Task 1: Assert the expanded content object** — `c2c5e90`.
2. **Task 2: Assert visitor flow in generated HTML and CSS** — `f70659a`.

## Verification

- `npm run build && npm test` passes: 6 tests, 6 passed.
