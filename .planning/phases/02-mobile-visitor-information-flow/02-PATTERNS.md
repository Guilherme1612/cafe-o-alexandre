# Phase 2 Pattern Map

## Existing patterns to extend

- **Single source of truth:** `src/data/cafe.ts` exports the `cafe` object. Add visitor-facing values there rather than embedding business data in Astro markup.
- **Static Astro page:** `src/pages/index.astro` is the only route and imports the shared stylesheet. Keep Phase 2 in this route; no client framework or runtime data fetch is needed.
- **Global tokens and responsive CSS:** `src/styles/global.css` owns palette, type scale, spacing, focus treatment, reduced-motion rules, and breakpoints. Extend the existing tokens instead of introducing component CSS or a utility framework.
- **Content-truth tests:** `tests/content-truth.test.mjs` reads the content module and asserts required fields remain explicit placeholders until verified details are supplied.
- **Static-output tests:** `tests/static-build.test.mjs` reads `dist/index.html` and source CSS after build, asserting required landmarks, metadata, responsive safeguards, and placeholder safety.

## Phase 2 mapping

| Need | Closest existing pattern | Implementation direction |
| --- | --- | --- |
| Address, phone, WhatsApp, hours, social links | `cafe` content object | Add typed fields with placeholder values and a small `isAvailable`/placeholder guard in the page.
| Call and WhatsApp actions | Native anchor semantics | Render `tel:`/`https://wa.me/` only for verified values; otherwise use disabled-looking, explanatory text that is not an actionable link.
| Directions | Native external link | Render Google Maps URL only when verified; preserve a clear “Directions link coming soon” fallback.
| About and offer copy | Existing explicit content fields | Show supplied description when available; otherwise use a welcoming, honest empty state without invented claims.
| Practical information | Semantic section/list | Use a labelled details list or cards with visible labels, readable values, and mobile-safe wrapping.
| Footer repetition | Existing page shell/footer | Reuse the same content object and placeholder behavior so footer never diverges from the information section.

## Greenfield constraints

- There is no existing reusable component library, CMS, map wrapper, gallery API, or social integration to reuse.
- Phase 2 is intentionally limited to visitor information flow. Do not add Phase 3 gallery/lightbox behavior or deferred v2 map embedding, sticky actions, structured data, or menu downloads.
- Keep JavaScript optional; the core content and contact/directions fallback must work with JavaScript disabled.
- Preserve sponsor-image independence: use the established burgundy, charcoal, warm gold, and cream palette only; do not add sponsor logo or advertisement composition.

## Verification cues

- Build the static page and run the existing Node test command after content/template changes.
- Assert no placeholder becomes a clickable `tel:`, WhatsApp, Maps, or social link.
- At 320px, 768px, and 1200px check there is no horizontal overflow, action labels remain visible, and focus indicators meet the existing contrast/touch rules.
