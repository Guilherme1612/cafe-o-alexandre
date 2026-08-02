# Café o Alexandre

## What This Is

A simple, welcoming, mobile-friendly single-page website for Café o Alexandre. It gives local visitors and prospective customers the practical information they need immediately: where the café is, when it is open, how to call or message it, how to get directions, and what it offers.

The page combines a concise hero, an about section, practical business information, map access, a small café photo gallery, and a compact footer. Its tone is warm, local, and elegant rather than corporate or promotional.

## Core Value

A visitor can quickly find accurate café information and take the next action—call, WhatsApp, or get directions—especially on a mobile phone.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Present the café name, welcome message, full address, and prominent call and directions actions in the hero.
- [ ] Explain what the café is and offers in a short About Us section using café-provided copy.
- [ ] Show address, phone, WhatsApp, opening hours, and social links in a practical information section.
- [ ] Make phone and WhatsApp details actionable on mobile with accessible labels.
- [ ] Provide an embedded map or clear Google Maps link for directions.
- [ ] Show a small gallery using café-provided photos.
- [ ] Repeat the address and phone number in a simple footer.
- [ ] Use large readable text, strong contrast, generous spacing, and a responsive mobile-first layout.
- [ ] Use an elegant burgundy, charcoal, warm-gold, and cream visual palette inspired by the supplied image without copying its layout or sponsor branding.
- [ ] Keep all unavailable business details visibly marked as placeholders until verified information is supplied.

### Out of Scope

- Online ordering, reservations, accounts, payments, or a content-management system — the requested first version is a practical informational page.
- Sponsor branding or reconstruction of the supplied advertisement — the image is visual inspiration only.
- Invented business copy, contact details, opening hours, address, social links, map destination, or café photography — accuracy takes priority over apparent completeness.
- Heavy animation or complex interaction — it would work against the requested calm, practical experience.

## Context

The site is intended for people looking up a local café, often from a phone and often with an immediate practical goal. The first screen must therefore prioritize identity, location, and clear actions over decorative content.

The supplied reference image establishes a useful atmosphere through burgundy red, charcoal black, warm gold, cream, fabric-like depth, and an elegant café mood. It is sponsor material, not approved site content. The visible sponsor logo, advertisement composition, cup branding, and displayed phone number must not be reused as Café o Alexandre business information unless separately confirmed.

The following source content is still missing and must remain explicit placeholder text in the implementation:

- Full address: `[FULL ADDRESS]`
- Phone: `[PHONE NUMBER]`
- WhatsApp: `[WHATSAPP NUMBER]`
- Opening hours: `[OPENING HOURS]`
- Social media: `[SOCIAL LINKS]`
- Café description: `[CAFÉ DESCRIPTION]`
- Google Maps destination or link: `[GOOGLE MAPS LINK]`
- Café gallery images: `[CAFÉ IMAGES]`

## Constraints

- **Scope**: One concise single-page website — keep navigation and content direct.
- **Content truth**: Missing business information must remain clearly marked; never infer it from sponsor material.
- **Responsive design**: Mobile usability is primary, while tablet and desktop layouts must remain polished.
- **Accessibility**: Use semantic structure, readable type, strong contrast, visible focus states, descriptive labels, and comfortable touch targets.
- **Visual direction**: Burgundy, charcoal, warm gold, and cream; warm and local, not corporate, crowded, or overly animated.
- **Actions**: Call, WhatsApp, and directions controls must be prominent and use native actionable links once verified values exist.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Build a focused single page | Visitors need a few practical answers and actions, not a complex site | — Pending |
| Prioritize mobile contact and directions actions | These are the most likely high-intent visitor tasks | — Pending |
| Use the reference only for mood and palette | Sponsor branding and advertisement layout were explicitly excluded | — Pending |
| Preserve placeholders for every unverified fact | Incorrect business information is worse than visibly incomplete content | — Pending |
| Keep motion restrained | The desired experience is warm and elegant, not distracting | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `$gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `$gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-08-02 after initialization*
