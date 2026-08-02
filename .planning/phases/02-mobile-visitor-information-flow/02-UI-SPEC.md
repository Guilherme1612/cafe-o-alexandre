---
phase: 2
slug: mobile-visitor-information-flow
status: draft
shadcn_initialized: false
preset: none
created: 2026-08-02
---

# Phase 2 — UI Design Contract

> Visual and interaction contract for the visitor information flow. Extends Phase 1 without changing its visual language or content-truth boundary.

## Design System

| Property | Value |
|----------|-------|
| Tool | none — continue the Phase 1 hand-authored CSS custom properties |
| Preset | not applicable |
| Component library | none |
| Icon library | none; use visible text labels and native anchors |
| Font | Phase 1 system sans body (`ui-sans-serif, system-ui, -apple-system, sans-serif`) and system serif display (`ui-serif, Georgia, Cambria, serif`) |

Do not add a UI framework, hydrated island, external font request, map SDK, social widget, sponsor asset, or registry block. Reuse the existing `cafe` content object and global tokens.

## Spacing Scale

Inherited from Phase 1; every value is a multiple of 4px.

| Token | Value | Usage |
|-------|-------|-------|
| xs | 4px | Label-to-value and eyebrow-to-heading gaps |
| sm | 8px | Compact metadata, action label gaps, button inline gap |
| md | 16px | Mobile shell gutter, default detail spacing |
| lg | 24px | Card padding, action-group gap, subsection gaps |
| xl | 32px | Hero cluster gap, desktop grid gap |
| 2xl | 48px | Mobile section and hero vertical padding |
| 3xl | 64px | Tablet/desktop section separation |

Exceptions: every actionable anchor has at least 48px block size and 44px inline size; 1px rules and borders are structural, not spacing tokens.

## Typography

Use only Phase 1’s two weights: 400 regular and 600 semibold. Keep body copy readable at 200% zoom and never use all caps for sentences.

| Role | Size | Weight | Line Height |
|------|------|--------|-------------|
| Body | 16px | 400 | 1.5 |
| Label | 14px | 600 | 1.4 |
| Heading | 24px | 600 | 1.2 |
| Display | 40px | 600 | 1.1 |

Limit prose to 65ch; keep the hero welcome and action-support copy to 38ch. About and offer copy remain normal 16px body text, never image-only or condensed into labels.

## Color

Continue the Phase 1 60/30/10 composition.

| Role | Value | Usage |
|------|-------|-------|
| Dominant (60%) | Cream `#F7F0E4` | Main page surface, information cards, readable placeholder states |
| Secondary (30%) | Charcoal `#272323` | Hero band, footer, optional dark action panel |
| Accent (10%) | Burgundy `#762536` and warm gold `#C39A5A` | Burgundy: headings, rules, verified primary action fill, link text. Gold: hero eyebrow, dark-surface rule/detail, and focus ring |
| Destructive | `#B42318` | No destructive action exists in this phase |

Accent reserved for: the hero eyebrow/rule, section headings or dividers, verified primary action (`Call the café`), verified secondary action emphasis (`Get directions`), native link text, and `:focus-visible`. Do not use gold as body text on cream, and do not use accent as decoration on every card. No gradients, shadows beyond Phase 1’s subtle elevation, sponsor branding, or invented imagery.

All normal text must meet 4.5:1 contrast; large text must meet 3:1. Cream text on charcoal and cream text on burgundy are the approved inverse treatments. Gold carries no essential meaning by itself.

## Visitor Information Hierarchy

Keep one document flow and one `h1`. The DOM and keyboard sequence must be:

1. Skip link → hero/header identity.
2. Hero content: `Café o Alexandre`, one welcome sentence, full address or exact address placeholder, then the primary action group.
3. Practical details: address, opening hours, phone, WhatsApp, and social links in that order; verified contact values are native links.
4. About Us: owner-supplied description text.
5. What the café offers: owner-supplied offer text, never an image-only menu.
6. Directions: a readable Google Maps link/fallback, independent of any embed.
7. Footer: café name plus repeated verified address and phone.

Use `header`, `main#main-content`, named `section` landmarks, and `footer`. Section headings are ordered `h2`s (`Café details`, `About the café`, `What the café offers`, `Directions`) with no skipped levels. Keep the existing gallery placeholder after these sections for Phase 3; do not introduce images in this phase.

### Hero first viewport

On a 320px-wide phone, the first viewport must expose the café name, welcome sentence, address/placeholder, and both prominent action slots without horizontal scrolling. Keep identity left aligned as in Phase 1. Stack the two actions vertically on mobile; they may sit inline from 768px only when each retains its minimum touch size. Do not add a sticky quick-action bar (deferred ENH-03).

### Practical details

Render one readable field per `dt`/`dd` pair. At mobile widths fields are one column; from 768px use the existing two-column details grid while preserving source order. Use a burgundy-tinted dashed border for placeholder panels and a quiet solid border for verified values. Never hide a missing field: show its label, exact bracketed token, and a concise `Awaiting verified café details` note when needed.

### About and offer

Read both blocks from café-provided content. `About the café` uses the supplied description; `What the café offers` uses a supplied offer/menu summary when one exists. Do not infer menu items, services, opening status, atmosphere claims, or pricing. Until supplied, render the explicit empty-state copy below in the same readable text treatment.

### Directions

Use a visible text link labeled `Get directions` (or `Get directions to Café o Alexandre` when extra context is needed) only after a verified destination passes the documented URL guard. Use the official keyless Google Maps directions URL; never build a URL from the placeholder or sponsor material. If unavailable, show the placeholder as plain text plus the empty/error note. A map iframe is not part of this contract.

## Contact and Placeholder Interaction Contract

All content and claims come from `src/data/cafe.ts`; structural labels may live in the template. Unknown values remain exact bracketed strings: `[FULL ADDRESS]`, `[PHONE NUMBER]`, `[WHATSAPP NUMBER]`, `[OPENING HOURS]`, `[SOCIAL LINKS]`, `[CAFÉ DESCRIPTION]`, `[CAFÉ OFFER]`, and `[GOOGLE MAPS LINK]`.

- Verified phone: render a native anchor with `href="tel:<normalized-number>"`, visible label `Call the café`, and accessible name `Call Café o Alexandre`.
- Verified WhatsApp: render a native `https://wa.me/<digits>` anchor, visible label `Message on WhatsApp`, and accessible name `Message Café o Alexandre on WhatsApp`.
- Verified map: render a native Google Maps directions anchor with visible label `Get directions` and accessible name `Get directions to Café o Alexandre`.
- Verified social links: render descriptive native anchors only for café-provided URLs; do not render a social widget.
- Reject empty, whitespace-only, malformed, or placeholder values as unavailable. Do not guess, repair, or normalize beyond the documented phone/WhatsApp digit and scheme guard.
- A verified action uses a burgundy fill (primary call) or an outlined burgundy treatment (directions/WhatsApp) with cream/charcoal text meeting contrast. Preserve visible text; no icon-only controls.
- An unavailable action slot is an informational `<span>`/panel with the intended label and `Phone number not yet available` or `Destination not yet available`. It is not a disabled button or fake link: no `href`, click handler, pointer cursor, tab stop, or `aria-disabled`.
- Keep placeholders readable in all states, including JavaScript disabled and 200% zoom.

## Copywriting Contract

| Element | Copy |
|---------|------|
| Primary CTA | `Call the café` when verified; unavailable slot reads `Call the café — phone number not yet available` |
| Secondary CTA | `Get directions` when verified; unavailable slot reads `Get directions — destination not yet available` |
| WhatsApp CTA | `Message on WhatsApp` when verified; otherwise `Message on WhatsApp — number not yet available` |
| Empty state heading | `Café details coming soon` |
| Empty state body | `Verified café information will appear here once it is provided.` |
| About empty state | `About information coming soon` / `The café's own description will appear here once it is provided.` |
| Offer empty state | `Offerings coming soon` / `Café-provided offerings will appear here once they are provided.` |
| Error state | `This detail is unavailable. Verify it with the café before using this action.` |
| Destructive confirmation | None — no destructive controls in this phase |

Keep the approved identity and welcome copy (`Café o Alexandre`, `Welcome to Café o Alexandre.`). Do not copy sponsor wording, phone numbers, logos, menu items, services, or claims. Do not label the café “open now” without verified hours and runtime logic.

## Accessibility and Interaction

- Keep the Phase 1 `Skip to content` link first in focus order and give every landmark a unique, useful name where one is needed.
- Use semantic headings, lists, and native links before ARIA. Add `aria-label` only when visible text does not already name the destination.
- Add a 3px warm-gold `:focus-visible` outline with 2px offset to every actionable anchor; never replace focus with hover styling.
- Source order is the interaction order above; responsive CSS must not reorder the hero, practical details, About/offer, directions, or footer.
- Keep controls at least 48px block / 44px inline, with 8px minimum gap between adjacent actions. Avoid hover-only information and icon-only actions.
- Support `prefers-reduced-motion: reduce` by disabling transitions. Otherwise permit only the existing 120ms color/outline transition; no entrance, scroll, parallax, autoplay, or sticky-bar motion.
- Preserve use without JavaScript, map provider access, cookies, or image assets. Directions remain a readable link or visible unavailable state.

## Responsive Contract

- Mobile-first baseline: support 320px width with no horizontal scroll, 16px inline shell gutters, one-column flow, 48px section padding, and stacked full-width action slots.
- At 768px: use 24px shell gutters, retain the 40px display title, allow the practical details grid to become two columns, and allow hero actions inline when both fit with touch targets intact. Keep About/offer prose at 65ch.
- At 1200px: use 32px gutters, cap content at 72rem, use 64px section separation, and keep action/detail groups from stretching text lines beyond 65ch.
- Use CSS media queries and intrinsic sizing only; no client-side viewport detection. Test 200% zoom/reflow and keyboard navigation at each breakpoint.

## Registry Safety

| Registry | Blocks Used | Safety Gate |
|----------|-------------|-------------|
| none | none | not applicable — Phase 1 has no shadcn or third-party registry |

## Checker Sign-Off

- [ ] Dimension 1 Copywriting: PASS
- [ ] Dimension 2 Visuals: PASS
- [ ] Dimension 3 Color: PASS
- [ ] Dimension 4 Typography: PASS
- [ ] Dimension 5 Spacing: PASS
- [ ] Dimension 6 Registry Safety: PASS

**Approval:** pending
