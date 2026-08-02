# Phase 4 UI Contract: Resilient Static Launch

## Scope

This phase changes no visual direction. It verifies the existing warm café system remains usable when data, images, JavaScript, network assets, or viewport space are unavailable.

## Required evidence

- 320px, 768px, and 1200px layouts have no horizontal overflow; 200% zoom remains readable.
- Skip-link and action focus indicators are visible; headings and landmarks remain semantic.
- Placeholder/fallback states are clearly labelled and never styled as deceptive active controls.
- Reduced-motion mode removes transitions/animation; no autoplay or scroll effects are introduced.
- Static build contains no sponsor branding, remote image/font dependency, or invented café fact.

## Visual guardrails

- Preserve cream/charcoal/burgundy/gold tokens, four text sizes, two weights, and existing spacing scale.
- Keep validation changes in tests/docs; do not add new components, registry blocks, or runtime dependencies.
