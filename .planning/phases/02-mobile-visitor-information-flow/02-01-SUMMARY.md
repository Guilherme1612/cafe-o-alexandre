---
phase: 02-mobile-visitor-information-flow
plan: 01
subsystem: ui
tags: [astro, static-html, contact-actions, accessibility, responsive-css]

# Dependency graph
requires:
  - phase: 01-static-foundation-content-truth
    provides: Static Astro page, typed cafe content object, and warm CSS token system
provides:
  - Mobile-first hero action group with verified-value gating
  - About Us, offerings, practical information, directions fallback, and footer contact repetition
  - Native tel, WhatsApp, social, and Maps link paths for future verified values
affects: [02-mobile-visitor-information-flow, 03-cafe-photo-gallery, 04-resilience-validation-static-launch]

# Tech tracking
tech-stack:
  added: []
  patterns: ["Render unavailable contact destinations as explanatory non-links", "Derive all visitor facts from one cafe object"]

key-files:
  created: []
  modified: [src/pages/index.astro, src/styles/global.css]

key-decisions:
  - "Reuse the existing cafe fields because Phase 1 already established every requested Phase 2 placeholder; no duplicate data model was added."
  - "Gate tel, WhatsApp, social, and Maps hrefs on non-placeholder values so the current page has no fake actions."
  - "Keep map as a clear link/fallback rather than adding the deferred iframe or client runtime."

patterns-established:
  - "Hero actions use prominent native links when verified and visible role=status fallbacks when unavailable."
  - "Practical details and footer repeat the same cafe values rather than hardcoding public facts."

requirements-completed: [VIS-01, VIS-02, VIS-03, VIS-04, ABOUT-01, ABOUT-02, MAP-01, MAP-02, UX-01, UX-02, UX-04]

coverage:
  - id: D1
    description: "Hero immediately identifies the café, shows address, and exposes Call Us/Get Directions affordances or honest unavailable states."
    requirement: VIS-01
    verification:
      - kind: build
        ref: "npm run build"
        status: pass
      - kind: pending
        ref: "02-02 static-output assertions"
        status: pending
    human_judgment: true
  - id: D2
    description: "About Us and offer sections render source-backed values without invented claims."
    requirement: ABOUT-01
    verification:
      - kind: build
        ref: "npm run build"
        status: pass
      - kind: pending
        ref: "02-02 static-output assertions"
        status: pending
    human_judgment: false
  - id: D3
    description: "Practical information and footer repeat address, phone, WhatsApp, hours, social, and directions values from cafe."
    requirement: MAP-01
    verification:
      - kind: build
        ref: "npm run build"
        status: pass
      - kind: pending
        ref: "02-02 static-output assertions"
        status: pending
    human_judgment: false

status: complete
---

# Phase 2 Plan 1: Visitor information flow summary

## Accomplishments

- Added a prominent hero address and Call Us/Get Directions action group with safe unavailable states for the current placeholders.
- Added About Us, What we offer, Practical information, social/directions treatments, and repeated address/phone footer content.
- Added native tel, WhatsApp, social, and Google Maps links that activate only when future values are verified URLs/numbers.
- Extended the existing responsive CSS with touch-sized action controls, readable wrapping, and desktop action layout.

## Task commits

1. **Task 1: Extend the café content contract** — reused the Phase 1 fields; no duplicate code change was needed.
2. **Task 2: Render hero actions, information, About Us, directions, and footer** — `87e8c5a`.

## Verification

- `npm run build` passes.
- `npm test` currently has 2 expected Phase 2 assertion mismatches in the old Phase 1 static test (h2 count and source CSS color check); Plan 02 updates those assertions while preserving the safety checks.
