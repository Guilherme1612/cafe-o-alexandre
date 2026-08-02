# Phase 3 UI Contract: Café Photo Gallery

## Direction

Extend the Phase 1/2 system: cream page background, charcoal text/footer, burgundy headings, and warm gold focus/accent. The gallery should feel like a quiet local café album, not an advertising grid.

## Layout and hierarchy

- Keep the existing “Café images” section in the page sequence after practical information.
- Make the section heading plus the first supplied café image (or the bordered empty state while images are unavailable) the visual focal point; captions remain secondary supporting text.
- When no verified café images exist, show a compact bordered empty state with the heading “Photos coming soon” and a plain explanation that café photos will appear once supplied.
- When images exist, use semantic `<figure>` cards with visible captions. Use one column below 768px, two columns from 768px, and three columns from 1200px.
- Keep all gallery text within the existing 65ch measure and preserve generous 16/24/32/48px spacing.

## Image contract

- Use local paths only, lazy loading, `decoding="async"`, and explicit `width`/`height` or aspect-ratio to reduce layout shift.
- Require descriptive alt text per image; never use filenames or generic “image” as alt text.
- Do not use sponsor artwork, sponsor branding, external stock photos, image-only controls, hover-only captions, or an unrequested lightbox.

## Responsive/accessibility

- Cards and captions wrap at 320px and 200% zoom with no horizontal overflow.
- Contrast and focus rules inherit the existing global stylesheet. Images are not links in this phase, so no new focus target is needed.
- Respect `prefers-reduced-motion`; no entrance, autoplay, parallax, or hover animation.

## Deferred registry/runtime

- No third-party component registry, PhotoSwipe, modal, framework island, or image CDN is required. Lightbox behavior is deferred to v2.
