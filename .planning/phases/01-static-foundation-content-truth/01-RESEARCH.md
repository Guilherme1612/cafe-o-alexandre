# Phase 1 Research: Static Foundation and Content Truth

## Scope

Phase 1 establishes the smallest static Astro foundation for a single-page café site. It covers VIS-05, ABOUT-03, and UX-03: explicit content placeholders, no invented business facts, and the warm visual token system.

## Recommended implementation

- Use Astro static output with Node 22+ and no client framework or hydrated island for the foundation.
- Create one page entry at `src/pages/index.astro`, one explicit content object at `src/data/cafe.ts`, and a global stylesheet at `src/styles/global.css`.
- Keep section components optional until repetition is proven; the first phase can use a semantic page shell with clear landmark sections.
- Keep business values as typed strings with placeholder tokens such as `[FULL ADDRESS]`, `[PHONE NUMBER]`, and `[CAFÉ DESCRIPTION]`. Do not create `tel:`, WhatsApp, or map URLs from placeholders.
- Use CSS custom properties for burgundy, charcoal, warm gold, cream, readable text colors, spacing, radii, and focus ring. Avoid gradients, animation, or dependency-heavy visual effects in the foundation.
- Use semantic `header`, `main`, `section`, and `footer` landmarks with one `h1`; keep the page meaningful with JavaScript disabled.

## Guardrails

- The content object is the only source for business facts; components must not contain hard-coded address, phone, hours, social, or offer claims.
- Sponsor image branding and its visible phone number are not valid content sources.
- Placeholder detection should be a small build-time or test-time assertion, not runtime business logic.
- CSS must maintain strong contrast for gold and cream text against burgundy/charcoal and provide visible `:focus-visible` styling.

## Validation strategy

- Install/build the minimal Astro project successfully with the static output directory generated.
- Assert the page source contains the café title and placeholder values, but no sponsor name/logo/phone text.
- Assert the content module contains the required placeholder keys and no empty business fields.
- Run a browser smoke check at mobile and desktop widths for semantic landmarks, one `h1`, readable placeholder content, and visible focus styles.

## Deferred

Contact links, map destination, practical information layout, and gallery behavior belong to later phases. Do not add framework components or third-party libraries here.

*Research note assembled from project research artifacts and the Phase 1 requirement boundary.*
