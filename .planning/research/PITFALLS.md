# Project Research: Café o Alexandre — Pitfalls

## High-risk failure modes

### 1. Unverified business information

The most damaging error is publishing a plausible but wrong address, phone number, hours, social link, map destination, or description. Keep a single content source with visible placeholders and do not promote a contact link to an active action until its value is verified. Do not copy the number, logo, cup, or sponsor wording from the supplied reference image.

### 2. Broken mobile contact actions

Use native `tel:` links for phone calls and a verified WhatsApp URL with an international number. Keep the visible label human-readable, add an accessible name that explains the action, and test on a real mobile device. A placeholder must not become a malformed clickable link.

### 3. Map privacy and reliability

Prefer a clear, verified Google Maps directions link as the baseline. An iframe embed adds third-party requests, consent/privacy questions, loading cost, and an API/billing surface. If an embed is later requested, provide a text-link fallback and validate the destination independently.

### 4. Accessibility regressions in an elegant visual design

Gold text can fail contrast on burgundy or charcoal. Preserve readable body sizing, keyboard focus, semantic headings, descriptive link labels, sufficient touch targets, and a non-color-only indication of actions. Test at narrow mobile widths, zoom, keyboard navigation, and with reduced motion enabled.

### 5. Gallery and image performance

Unoptimized café photos can dominate page weight and cause layout shifts. Use supplied images only, provide dimensions and meaningful alt text, keep the initial set small, and lazy-load below-the-fold images. A simple linked figure grid is safer than adding a lightbox dependency before the gallery need is proven.

### 6. Responsive and content-length assumptions

Long addresses, translated hours, and placeholder strings can break a desktop-first layout. Test the actual longest expected content at small widths, let text wrap naturally, avoid fixed-height sections, and keep the primary actions visible without crowding.

### 7. SEO and deployment drift

Use a truthful page title, description, canonical URL only when known, and LocalBusiness structured data only after the business facts are verified. Keep static output reproducible, check the production build, and verify that deployed asset paths and map/contact links work from the final hosted URL.

## Guardrails for the roadmap

- Keep content data separate from presentation so placeholder replacement is one deliberate edit.
- Add a build or lint check that flags placeholder tokens intended for owner handoff rather than silently publishing invented values.
- Validate call, WhatsApp, directions, focus, contrast, responsive layout, and image loading in a browser acceptance pass.
- Treat the gallery as progressive enhancement; the page must remain useful with images unavailable.

## Sources

- W3C Web Content Accessibility Guidelines (WCAG 2.2): contrast, keyboard access, focus, target size.
- MDN: `tel:`/URL links, responsive images, lazy loading, native dialog and semantic HTML.
- Google Maps Platform and Google Business Profile guidance: Maps links/embeds and truthful local business data.
- web.dev: image performance and cumulative layout shift guidance.

*Confidence: medium; validate the final implementation against the actual supplied business content and hosting environment.*
