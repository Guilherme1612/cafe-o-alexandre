# Café o Alexandre — Static Launch Checklist

Run date: 2026-08-02  
Artifact under test: `dist/index.html` (Astro static output)

## Deterministic launch gate

- [x] `npm run build` passes. Astro reports `output: "static"` and generates one route at `dist/index.html`.
- [x] `npm test` passes: 9 tests, 9 passed, 0 failed.
- [x] The generated artifact has no `<script>` tags, runtime iframe, remote image/font dependency, or sponsor marker. `tests/static-build.test.mjs` checks this after the build.
- [x] Placeholder destinations remain non-actionable: no `tel:`, WhatsApp, Maps, social, mail, image, or bracketed placeholder `href`/`src` is emitted.
- [x] JavaScript is not required for the current page: native HTML renders the contact/directions unavailable states and the gallery fallback.

Reproduce the gate from the project root:

```sh
npm run build && npm test
```

Inspect the served artifact at `dist/index.html`; Cloudflare Pages should use build command `npm run build` and publish directory `dist`.

## Rendered smoke evidence

The local `agent-browser` smoke ran against `http://127.0.0.1:4321/` with the current artifact:

- [x] 320px viewport: `clientWidth=305`, `scrollWidth=305`; no horizontal overflow, one `h1`, zero images, and only the skip link is actionable while values are placeholders.
- [x] 768px viewport: `clientWidth=753`, `scrollWidth=753`; no horizontal overflow.
- [x] 1200px viewport: `clientWidth=1185`, `scrollWidth=1185`; no horizontal overflow.
- [x] Simulated 200% zoom using a 160px CSS viewport: `clientWidth=145`, `scrollWidth=145`, and zero overflowing elements.
- [x] First `Tab` focus lands on `Skip to content` with a solid warm-gold 3px outline and 2px offset.
- [x] `prefers-reduced-motion: reduce` matches and link transition duration is `0s`.

## Content-truth handoff

The following values are intentionally unresolved and must remain visible, plain-text, and non-actionable until the café supplies verified content:

- `[FULL ADDRESS]`
- `[PHONE NUMBER]`
- `[WHATSAPP NUMBER]`
- `[OPENING HOURS]`
- `[SOCIAL LINKS]`
- `[CAFÉ DESCRIPTION]`
- `[CAFÉ OFFER]`
- `[GOOGLE MAPS LINK]`
- `[CAFÉ IMAGES]`

No café photographs were supplied. The page keeps the `Photos coming soon` state and does not use the sponsor advertisement or substitute imagery. Add only owner-supplied local images with verified captions and metadata, then rerun the launch gate.

## Deferred v2 work

These are deliberately outside the static launch gate:

- Embedded map iframe (ENH-01)
- Accessible gallery lightbox (ENH-02)
- Sticky mobile quick-action bar (ENH-03)
- `LocalBusiness` structured data after facts are verified (ENH-04)
- Downloadable menu (ENH-05)

## Outstanding owner/hosting checks

- [ ] Café owner supplies and verifies address, phone, WhatsApp, hours, social link, description, offer, map destination, and photos.
- [ ] Cloudflare Pages project and production domain ownership are confirmed before deployment.
