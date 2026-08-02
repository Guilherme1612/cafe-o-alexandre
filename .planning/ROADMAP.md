# Roadmap: Café o Alexandre

## Overview

Deliver a small, static-first Astro page that helps a local visitor identify Café o Alexandre, understand what it offers, find accurate practical information, and call, message, or get directions from a phone. The roadmap starts with a single content-truth boundary and static shell, then completes the core information flow, adds a resilient café-provided photo gallery, and finishes with accessibility, degraded-mode, production-build, and static-launch validation. Unknown business facts remain visible placeholders until verified; all ENH requirements stay deferred.

## Phases

**Phase Numbering:**

- Integer phases (1, 2, 3, 4): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

- [x] **Phase 1: Static Foundation & Content Truth** - Establish the Astro shell, shared verified-content boundary, and visual foundations. (completed 2026-08-02)
- [ ] **Phase 2: Mobile Visitor Information Flow** - Deliver the complete identity, story, contact, directions, and footer path.
- [ ] **Phase 3: Café Photo Gallery** - Add a small responsive gallery from supplied photos with a no-JavaScript fallback.
- [ ] **Phase 4: Resilience, Validation & Static Launch** - Prove the built page remains useful and accessible in degraded conditions and is ready for static hosting.

## Phase Details

### Phase 1: Static Foundation & Content Truth

**Goal**: A minimal Astro page renders from one explicit content source, with a stable semantic shell and warm visual tokens that never invent café facts.
**Depends on**: Nothing (first phase)
**Requirements**: VIS-05, ABOUT-03, UX-03
**Success Criteria** (what must be TRUE):

  1. Unknown address, contact, hours, social, and map values are visibly rendered as placeholders and do not create active links.
  2. All visible café copy and claims come from the shared content source; no inferred details or invented offerings appear.
  3. The page has a warm burgundy, charcoal, gold, and cream visual system with readable type and restrained motion that can carry the later sections.

**Plans**: 2/2 plans complete
Plans:

- [x] 01-01-PLAN.md — Bootstrap the static Astro toolchain and explicit café content boundary
- [x] 01-02-PLAN.md — Render the semantic shell, warm visual tokens, and static artifact assertions

**UI hint**: yes

### Phase 2: Mobile Visitor Information Flow

**Goal**: Visitors can move from café identity to offer, practical details, contact actions, directions, and footer information on any supported screen size.
**Depends on**: Phase 1
**Requirements**: VIS-01, VIS-02, VIS-03, VIS-04, ABOUT-01, ABOUT-02, MAP-01, MAP-02, UX-01, UX-02, UX-04
**Success Criteria** (what must be TRUE):

  1. On a phone, the first viewport exposes “Café o Alexandre,” a welcome message, address (or its explicit placeholder), and prominent Call Us and Get Directions actions.
  2. Visitors can read café-provided About/offering text and find address, phone, WhatsApp, opening hours, and social links in a practical information section.
  3. When verified, phone, WhatsApp, and Google Maps values open their native destinations with descriptive accessible names.
  4. The page remains readable and operable across narrow mobile, tablet, and desktop widths with semantic landmarks, visible keyboard focus, strong contrast, comfortable touch targets, and a footer repeating address and phone.
  5. Directions are available as a clear readable Google Maps link even when no map embed is present.

**Plans**: TBD
**UI hint**: yes

### Phase 3: Café Photo Gallery

**Goal**: Visitors can recognize the café through a small, performant gallery made only from supplied images without losing usefulness when images or JavaScript are unavailable.
**Depends on**: Phase 2
**Requirements**: GALLERY-01, GALLERY-02, GALLERY-03
**Success Criteria** (what must be TRUE):

  1. Visitors can view a small responsive gallery containing only café-provided images; sponsor logos, ad layouts, and reference imagery are absent.
  2. Each gallery image has meaningful alternative text, intrinsic dimensions, responsive sizing, and below-the-fold loading behavior that avoids avoidable layout shifts.

**Plans**: TBD
**UI hint**: yes

### Phase 4: Resilience, Validation & Static Launch

**Goal**: The production-built page preserves its practical value, accessibility, and content truth under degraded conditions and is ready for static deployment.
**Depends on**: Phase 3
**Requirements**: UX-05
**Success Criteria** (what must be TRUE):

  1. A visitor can still read the café identity, offer, practical details, contact actions, directions, and footer with JavaScript disabled.
  2. A visitor can still use the page when gallery images fail or are unavailable, with no broken layout or inaccessible interaction blocking the core information path.

**Plans**: TBD
**UI hint**: yes

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Static Foundation & Content Truth | 2/2 | Complete    | 2026-08-02 |
| 2. Mobile Visitor Information Flow | 0/TBD | Not started | - |
| 3. Café Photo Gallery | 0/TBD | Not started | - |
| 4. Resilience, Validation & Static Launch | 0/TBD | Not started | - |
