# Phase 2 Research: Mobile Visitor Information Flow

## Scope

Phase 2 extends the existing static Astro shell to cover the requested visitor journey: identity, café offer, practical details, verified contact actions, directions, and footer repetition. It covers VIS-01, VIS-02, VIS-03, VIS-04, ABOUT-01, ABOUT-02, MAP-01, MAP-02, UX-01, UX-02, and UX-04.

## Recommended implementation

- Continue with the existing `src/data/cafe.ts` object and `src/pages/index.astro`; do not add a CMS, state library, client framework, map SDK, or hydrated island.
- Model every contact/directions value as a verified-or-placeholder field. Render placeholders as readable text only. Emit `tel:`, WhatsApp, and Google Maps links only when a field is verified and passes a simple scheme/number guard.
- Use native anchors with visible text and accessible labels such as `Call the café`, `Message on WhatsApp`, and `Get directions`. Do not make the map iframe the only route to directions.
- Keep the hero's primary actions visually prominent, then use a single-column mobile flow that becomes a two-column information layout at the existing 768px breakpoint. Repeat verified address/phone in the footer.
- Render the owner-supplied About Us description and offer text from the content object. Until provided, show explicit placeholder/empty-state copy rather than invented menu items or services.
- Keep the existing semantic landmarks and heading order. Add one section per visitor task, with a visible focus order that follows hero → practical details → about/offers → directions → footer.

## Validation strategy

- Source tests should assert that unknown values produce no actionable contact/map URL and verified fixture values produce correctly normalized native URLs.
- Static output tests should assert hero actions, practical fields, About/offer copy, directions fallback, footer repetition, accessible link names, and exact heading order.
- Browser smoke checks should cover 320px, 768px, and 1200px widths, 200% zoom/reflow, keyboard focus, and placeholder states. Use the provided local browser CLI rather than a new testing dependency.
- Test malformed or whitespace-only phone/WhatsApp/Maps values as non-actionable; do not silently guess or repair business data beyond documented normalization.

## Pitfalls and boundaries

- Never treat the sponsor image's phone number, logo, or wording as Café o Alexandre data.
- Avoid an `open-now` indicator, guessed map query, image-only menu, or social widget until verified source content exists.
- Preserve JS-off usefulness and keep the page useful when map/image/contact values are unavailable.
- Native links are enough for v1; map embeds, sticky action bars, structured data, and lightboxes stay deferred.

## Files likely to change

- `src/data/cafe.ts`
- `src/pages/index.astro`
- `src/styles/global.css`
- `tests/content-truth.test.mjs`
- `tests/static-build.test.mjs`

*Phase research derived from the project research set, Phase 1 implementation, and the locked content-truth brief.*
