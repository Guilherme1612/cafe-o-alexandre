# Feature Landscape

**Domain:** Local café informational website (single page)
**Project:** Café o Alexandre
**Researched:** 2026-08-02
**Overall confidence:** MEDIUM

The brief is intentionally narrower than a restaurant-commerce site: a visitor should answer “what is this, where is it, when is it open, and how do I get in touch?” in seconds. The feature set below treats verified local information and mobile actionability as product features, while treating visual polish as support for that job. Nothing in the implementation should turn an unknown fact from the reference image into café content.

## Table Stakes

Features users expect. Missing = the page feels incomplete or untrustworthy.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Hero with café name, short welcome, full address, and primary actions | A local visitor needs identity, location, and the next step before scrolling | Low | Keep the real address and copy as explicit placeholders until supplied; do not infer from sponsor material |
| Mobile call and WhatsApp actions | Phone visitors commonly want to call or message immediately | Low | Use native `tel:` and WhatsApp links only after verified values exist; expose descriptive accessible names such as “Call Café o Alexandre” rather than an unlabeled icon |
| Practical information section | Address, phone, WhatsApp, hours, and social links are the page’s core answer set | Low | Repeat the same canonical values used in the hero; distinguish regular versus special/seasonal hours when the café supplies them |
| Clear directions destination | “Where?” is not answered by an address alone on a phone | Low–Med | Provide a clear Google Maps link; an embed is optional and must never be the only route if it is blocked or slow |
| Short, text-readable About/offering copy | People need to know what the café offers before deciding to visit | Low | Use café-provided copy; avoid invented menu items, prices, dietary claims, reviews, or service promises |
| Mobile-first responsive layout and information hierarchy | Visitors often arrive on small screens with an immediate practical goal | Med | Put identity/actions first, then offer, practical details/map, gallery, and footer; keep navigation concise and section anchors obvious |
| Baseline accessibility | Contact and directions must work for keyboard, screen-reader, and low-vision visitors | Med | Semantic headings/landmarks, descriptive link text, visible focus, adequate contrast, large readable type, comfortable touch targets, logical tab order, reduced-motion respect, and useful image alt text |
| Small gallery of real café photos | Authentic photos communicate atmosphere and help visitors recognize the place | Med | Use only café-provided images; include meaningful alt text, fixed dimensions, responsive `srcset`/sizes, and lazy loading below the fold |
| Content-truth placeholders | Shipping an incorrect phone, address, hours, map, or image is worse than an incomplete page | Low | Keep `[FULL ADDRESS]`, `[PHONE NUMBER]`, `[WHATSAPP NUMBER]`, `[OPENING HOURS]`, `[SOCIAL LINKS]`, `[CAFÉ DESCRIPTION]`, `[GOOGLE MAPS LINK]`, and `[CAFÉ IMAGES]` visibly marked until verified |
| Footer contact repeat | A visitor who scrolls to the end should not have to hunt back for contact details | Low | Repeat canonical address and phone; do not add decorative sponsor marks or unverified social links |

## Differentiators

Features that can improve the experience after the table stakes are correct. They should not delay an accurate first release.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Persistent mobile quick-action row | Keeps call, WhatsApp, and directions available while a high-intent visitor browses the gallery or offer | Low–Med | Add only if it does not cover content or keyboard focus; test safe-area insets and touch-target spacing |
| Real-photo gallery lightbox | Lets visitors inspect the café atmosphere without leaving the page | Med | A small accessible lightbox is enough; provide a plain grid fallback and keyboard/escape/alt-text support. Do not build a photo-management system |
| LocalBusiness structured data | Gives search engines machine-readable name, address, hours, phone, and URL | Low–Med | Add only after all values are verified and kept in sync with visible content; omit fields that are unknown rather than fabricating them |
| One-tap map handoff with a fallback link | Makes “take me there” fast while preserving resilience if an embed or provider is unavailable | Low | Prefer a normal external directions link as the canonical action; treat any embed as progressive enhancement |
| Content-readiness checklist in the source | Prevents placeholders from accidentally reaching launch and reduces future edits | Low | A build-time check or review checklist can assert that no placeholder remains in production; it is process support, not a customer-facing CMS |
| Shareable section anchors | Lets a customer send a friend the exact hours or directions section | Low | Use stable, descriptive IDs and native anchor links; avoid a large navigation system for one page |

## Anti-Features

Features to explicitly NOT build for this milestone.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| Online ordering, reservations, accounts, payments, or a CMS | Changes a simple information page into an operational product with security, support, and data-maintenance cost | Keep a verified phone/WhatsApp action; link to an existing service only if the café later supplies one |
| Invented business details, menu/prices, testimonials, reviews, hours, map destination, or gallery | False local information can send people to the wrong place and damages trust | Show an explicit placeholder and request café-provided source content |
| Image-only or PDF-only menu | Hard to read on mobile, difficult to search and assist, and adds a needless download step | Use concise crawlable text describing the offer; add a café-approved full menu later if needed |
| Sponsor branding or reconstruction of the supplied advertisement | The reference image is mood inspiration, not Café o Alexandre identity or business data | Reuse only the approved burgundy/charcoal/gold/cream atmosphere and create original layout/content |
| Autoplay video, animated splash screen, or heavy scroll effects | Delays location/contact tasks, wastes mobile data, and can create motion/accessibility problems | Use restrained CSS transitions only where they clarify state; respect reduced-motion preferences |
| Social-feed widgets, review scrapers, or third-party tracking bundles | Adds privacy/performance failure modes and can surface stale or unmoderated content | Link to verified social profiles as plain links; add only when the café owns and maintains them |
| Map embed as the sole directions mechanism | Third-party embeds can be blocked, slow, or unavailable without changing the visitor’s goal | Keep a visible external Google Maps directions link; embed only as optional enhancement |
| Fake “open now” countdown/status based on guessed hours or browser locale | A wrong status is worse than no status, especially with holidays and seasonal changes | Display the supplied regular/special hours plainly; add computed status only with a verified hours source and maintenance plan |

## Feature Dependencies

```text
Verified address + map destination → directions link (and optional map embed)
Verified phone → tel: call action
Verified WhatsApp number → WhatsApp action
Verified hours → practical hours display (and optional structured data/status)
Verified social URLs → social links
Café-provided description → About/offering copy
Café-provided images + alt text → gallery/lightbox
Approved text/content → LocalBusiness structured data (keep visible and machine-readable values in sync)
Semantic structure + design tokens → keyboard/focus/contrast/touch accessibility
Responsive image assets → performant gallery (dimensions, srcset/sizes, lazy loading)
All placeholders resolved → launch/content-readiness check
```

## MVP Recommendation

Prioritize:

1. Hero identity, verified-or-placeholder address, and prominent call/directions actions.
2. Practical information block with canonical address, phone, WhatsApp, opening hours, and verified social links.
3. A clear external map/directions link (embed only if it adds value without blocking the link).
4. Café-provided About/offering copy in readable text.
5. Mobile-first responsive layout with semantic accessibility basics and visible placeholders.
6. Small responsive gallery using café-provided photos, then a simple footer repeating address and phone.
7. If one differentiator fits after those gates: a persistent mobile quick-action row or a small accessible gallery lightbox.

Defer structured data, computed “open now,” embeds, and any ordering/reservation integration until the café supplies and maintains verified source values. Defer all content that would require guessing.

## Research Notes and Confidence

- **MEDIUM confidence:** W3C WCAG 2.2 is the authority for visible focus, focus not obscured, and target-size guidance; web.dev guidance supports responsive image sizing and lazy loading below the fold. These inform the accessibility and gallery rows but still need browser/device acceptance testing.
- **MEDIUM confidence:** Google Business Profile guidance establishes the accuracy contract for real-world name, precise address, local phone, individual-location website, and customer-facing hours. It supports the placeholder and synchronization requirements.
- **MEDIUM confidence:** Current restaurant/café UX guidance converges on text-readable offerings, address/map, hours, contact, and real photos while warning against PDF/image-only menus and heavy intro media. These are ecosystem signals rather than a formal product standard.

## Sources

- [Google Business Profile: Guidelines for representing your business](https://support.google.com/business/answer/3038177?hl=en) — official guidance; MEDIUM confidence after cross-check.
- [W3C: What’s New in WCAG 2.2](https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/) — official accessibility standard overview; MEDIUM confidence after cross-check.
- [web.dev: Responsive images](https://web.dev/learn/design/responsive-images?hl=en) and [Images](https://web.dev/learn/html/images?hl=en) — responsive/lazy image guidance; MEDIUM confidence after cross-check.
- [Think with Google: How Australians find and choose restaurants](https://www.thinkwithgoogle.com/_qs/documents/800/micro-moments-guide-how-australians-find-choose-restaurants.pdf) — mobile local-intent research; MEDIUM confidence.
- [Wiz Studio Labs: What a restaurant or cafe website actually needs](https://www.wizstudiolabs.com/insights/website-for-restaurant-cafe-malaysia), [Alvex Studio: Web design for restaurants and cafes](https://alvexstudio.co.uk/blog/web-design-for-restaurants-and-cafes), and [Fairwell Collective: Restaurant website design checklist](https://fairwellcollective.com/blogs/ledger/restaurant-website-design-checklist) — current practitioner guidance; MEDIUM confidence and used directionally.

