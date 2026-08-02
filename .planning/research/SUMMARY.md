# Project Research Summary

**Project:** Café o Alexandre  
**Domain:** Static, single-page local café information website  
**Researched:** 2026-08-02  
**Confidence:** MEDIUM

## Executive Summary

Café o Alexandre is a small, content-led brochure site whose job is to answer four questions quickly on a phone: what is this place, where is it, when is it open, and how do I contact or reach it? Research consistently favors a static Astro build with semantic HTML and CSS, no database, no client-side application runtime, and a clear external Google Maps link. Cloudflare Pages is a suitable static host using the standard `npm run build` → `dist` flow.

The roadmap should be driven by content truth rather than visual completeness. Address, phone, WhatsApp, hours, social URLs, map destination, description, and photos are not yet supplied; each must remain a visible, non-actionable placeholder until verified. Build the hero, practical information, about copy, directions, gallery, and footer around one local content object, then validate mobile accessibility, native links, image performance, JavaScript-disabled resilience, and the production build. Do not add ordering, reservations, CMS, tracking, map APIs, or a gallery library to this milestone.

## Key Findings

### Recommended Stack

Use the smallest static stack that supports maintainable content and image handling:

**Core technologies:**

- **Astro 7.x (`astro@latest` at bootstrap):** pre-renders HTML/CSS and ships zero browser JavaScript unless an island is explicitly hydrated; a good fit for one content-led page.
- **Node.js 22.12+ even-numbered LTS:** required by current Astro installation guidance; pin the selected version in `.nvmrc`/`engines` and CI.
- **Semantic HTML + scoped/global CSS:** native landmarks, anchors (`tel:`, verified WhatsApp, Google Maps), media queries, focus states, and design tokens cover the brief without Tailwind, React, or a UI kit.
- **Cloudflare Pages (Git integration):** static deployment with the documented Astro preset (`npm run build`, output `dist`), previews, and CDN delivery; no SSR adapter is needed.
- **Astro `astro:assets` or native responsive `<img>`:** use local café images with dimensions, meaningful `alt`, responsive sources, and lazy loading below the fold. Add `sharp` only if Astro's chosen install requires it.

There is no database, server runtime, CMS, analytics bundle, or map API in the MVP. A normal Google Maps directions URL is keyless, accessible, and resilient; an embed is optional only after a verified destination, API ownership, billing, privacy, and performance decision.

Detailed rationale and source links: [STACK.md](./STACK.md).

### Expected Features

**Must have (table stakes):**

- Hero with café name, concise welcome, address (or explicit placeholder), and prominent call/directions actions.
- Practical information section containing canonical address, phone, WhatsApp, opening hours, and verified social links.
- Short, café-provided About/offering copy; never invent menu items, prices, reviews, or claims.
- A clear external directions link; an embed must never be the only route.
- Mobile-first responsive hierarchy, semantic landmarks, readable text, contrast, visible focus, comfortable touch targets, logical tab order, reduced-motion handling, and useful image alt text.
- Small gallery of café-provided photos with dimensions and responsive/lazy loading.
- Footer repeating the canonical address and phone.
- Visible placeholders for every unknown field: `[FULL ADDRESS]`, `[PHONE NUMBER]`, `[WHATSAPP NUMBER]`, `[OPENING HOURS]`, `[SOCIAL LINKS]`, `[CAFÉ DESCRIPTION]`, `[GOOGLE MAPS LINK]`, and `[CAFÉ IMAGES]`.

**Should have (competitive):**

- Persistent mobile quick-action row, only if it does not cover content or keyboard focus.
- Plain linked gallery grid first; add a small native `<dialog>` lightbox only if the interaction is explicitly confirmed.
- Stable section anchors and a one-tap map handoff with a normal-link fallback.
- Build/review check that blocks unresolved placeholders from a declared production release.
- `LocalBusiness` structured data only after visible business facts are verified and kept in sync.

**Defer (v2+):**

- Online ordering, reservations, accounts, payments, CMS, or any mutable data workflow.
- Invented or inferred business details, sponsor branding, image/PDF-only menus, testimonials, fake “open now” status, or unverified social/map destinations.
- Autoplay video, splash screens, heavy scroll animation, social-feed/review widgets, tracking bundles, and a map embed/API unless a later owner accepts their cost and maintenance.

Detailed feature dependencies: [FEATURES.md](./FEATURES.md).

### Architecture Approach

Use a static-first Astro page with one small local content object as the source of truth. `src/pages/index.astro` owns metadata, landmark order, and composition; section components render the hero, about, practical information, directions, gallery, and footer; `src/styles/global.css` owns palette tokens, typography, responsive rules, focus, contrast, and reduced motion; `src/assets/` contains supplied images. Essential text, links, and gallery fallbacks are emitted as HTML; JavaScript is optional progressive enhancement, never a prerequisite for contact or directions.

**Major components:**

1. **Content object (`src/data/site.ts` or equivalent):** café copy, contact values, hours, links, verification flags/placeholders, and gallery metadata; prevents duplicated or silently inferred facts.
2. **Page shell and sections (`src/pages/index.astro`, `Hero`, `About`, `PracticalInfo`, `Directions`, `Gallery`, `Footer`):** semantic order, visible actions, and canonical value reuse.
3. **Global styles (`src/styles/global.css`):** burgundy/charcoal/gold/cream tokens with tested contrast, mobile-first layout, focus and touch states, and reduced-motion rules.
4. **Static build and assets:** Astro emits HTML, CSS, and fingerprinted local images to `dist`; native `tel:`, WhatsApp, and map anchors leave the page without a runtime.

Follow semantic composition, progressive enhancement, responsive media, and an explicit content-truth boundary. Keep one-off markup inline rather than creating wrappers for every heading or card. Full patterns and validation checks: [ARCHITECTURE.md](./ARCHITECTURE.md).

### Critical Pitfalls

1. **Unverified business information** — keep every unknown as a visible placeholder in the single content source; do not activate links or structured data until the café verifies values; never copy sponsor artwork data.
2. **Broken mobile contact actions** — use human-readable labels and correctly formatted native `tel:`/international WhatsApp URLs only after verification; test on a real phone and ensure placeholders are not clickable.
3. **Map privacy and reliability** — make a verified Google Maps URL the canonical path; if an iframe is later approved, retain the text-link fallback and review key, billing, consent, and loading cost.
4. **Accessibility and contrast regressions** — test actual burgundy/charcoal/gold pairings, semantic headings/landmarks, visible non-color-only focus, zoom, keyboard flow, touch target size, and reduced motion.
5. **Gallery performance and layout shift** — use only a small set of supplied photos, intrinsic dimensions and responsive sources, lazy-load below the fold, and keep a plain grid fallback before considering a lightbox dependency.

Other risks are long addresses/hours overflowing narrow layouts and deployment/SEO drift; avoid fixed-height sections, verify the production build, and add structured data only from verified values. See [PITFALLS.md](./PITFALLS.md).

## Implications for Roadmap

Based on the dependencies in the research, use four small phases. Each phase should leave a usable static page rather than creating infrastructure for later features.

### Phase 1: Static Foundation and Content Truth

**Rationale:** Every later section depends on a stable source of business facts and a static shell. Establishing placeholders first prevents polished but false contact information from spreading through components.  
**Delivers:** Astro static project, pinned Node 22.12+ runtime, build scripts, one content object with explicit verification state/placeholders, page shell, base palette/type/layout tokens, and initial `npm run build`.  
**Addresses:** Stack choice, content-truth table stake, semantic architecture, and the out-of-scope boundary.  
**Avoids:** Unverified-information leakage, premature framework/runtime dependencies, and component fragmentation.

### Phase 2: Mobile Visitor Information Flow

**Rationale:** Identity, offer, contact, hours, and directions are the core value and should be usable before gallery polish.  
**Delivers:** Hero, About/offering, Practical Information, Directions, and Footer sections composed from the shared data object; visible but non-actionable placeholders; verified-only `tel:`, WhatsApp, and Google Maps links; mobile-first responsive layout with semantic landmarks, accessible names, focus states, contrast, touch targets, and reduced-motion rules.  
**Uses:** Native HTML/CSS links and static Astro rendering.  
**Implements:** `Hero`, `About`, `PracticalInfo`, `Directions`, `Footer`, and global styles.  
**Avoids:** Broken mobile actions, map embed as sole route, invented copy/hours, and decorative palette overriding readability.

### Phase 3: Real-Photo Gallery and Progressive Enhancement

**Rationale:** Photos improve recognition only after the information path works; image assets and optional interaction have independent performance/accessibility risks.  
**Delivers:** Small responsive gallery from café-provided assets, meaningful alt text, intrinsic dimensions, responsive sources, lazy loading, no-JavaScript linked-image fallback, and browser checks for narrow/wide layouts and unavailable images. Add a native dialog lightbox only if the café explicitly confirms that need.  
**Uses:** Astro `Image`/`Picture` or native responsive images; no PhotoSwipe/Swiper dependency for the MVP.  
**Implements:** `Gallery` component and local `src/assets/` pipeline.  
**Avoids:** Layout shift, oversized images, inaccessible lightboxes, and dependency bloat.

### Phase 4: Content Readiness, Accessibility, and Static Launch

**Rationale:** A static site is only ready when the built output and hosted URL preserve truth and the primary mobile flow works under degraded conditions.  
**Delivers:** Placeholder/content-readiness check, production build inspection, keyboard and screen-reader pass, contrast/zoom/touch validation, JavaScript-disabled and throttled-network smoke tests, verified link destinations, and Cloudflare Pages deployment (`npm run build` → `dist`).  
**Addresses:** Release quality, deployment drift, SEO title/description, and optional structured data only where facts are verified.  
**Avoids:** Shipping unresolved or fabricated values, broken hashed asset paths, inaccessible focus, and relying on one green build as acceptance evidence.

### Phase Ordering Rationale

- Content verification gates every actionable link, map destination, gallery asset, and structured-data field; therefore the data boundary and placeholders come first.
- The core visitor flow (identity → offer → practical details → directions) delivers the project's value before optional gallery interaction.
- Gallery work follows the same static/progressive-enhancement architecture but needs real assets and performance checks; it should not delay contact usability.
- Deployment is last because production acceptance must inspect the final generated URLs and supplied facts, not only source files.
- No phase should introduce a database, server adapter, CMS, analytics, map API, or ordering workflow without a new requirement and explicit owner.

### Research Flags

Phases likely needing deeper research during planning:

- **Phase 1:** Confirm the Astro/Node versions available in the target environment and the exact package-manager/CI setup; otherwise patterns are standard.
- **Phase 3 (only if lightbox is requested):** Research native dialog focus management and reduced-motion behavior; skip this research if the plain linked grid is accepted.
- **Phase 4 (only if embed or structured data is added):** Verify Cloudflare project ownership, production domain, Google Maps/API obligations, and schema fields against supplied facts.

Phases with standard patterns (skip `--research-phase`):

- **Phase 2:** Semantic HTML, native anchors, CSS media queries, and WCAG baseline checks are well documented; planning should focus on supplied content and acceptance cases.
- **Phase 3 without lightbox:** Astro/local image handling and responsive `<img>` patterns are established.
- **Phase 4 static deployment:** Cloudflare Pages' Astro preset is documented; only project-specific credentials/domain details need confirmation.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | MEDIUM | Current Astro, Node, Cloudflare, Google Maps, Astro assets, and MDN guidance were checked, but framework/host defaults can change before bootstrap. |
| Features | MEDIUM | Official local-business/accessibility guidance and practitioner patterns converge on the same table stakes; café-specific content and priorities remain unknown. |
| Architecture | MEDIUM | Astro/MDN/W3C patterns are well documented, but there is no existing codebase to validate boundaries or deployment constraints. |
| Pitfalls | MEDIUM | Risks are directly derived from the brief plus official accessibility/maps/image guidance; final impact still needs browser/device validation. |

**Overall confidence:** MEDIUM

### Gaps to Address

- **Business source content is missing:** obtain and verify address, phone, WhatsApp, hours (including seasonal exceptions), social URLs, description, map destination, photos, and alt-text intent before enabling actions or schema.
- **Hosting ownership is unconfirmed:** establish Cloudflare account/project, production domain, repository root, and build environment before Phase 4 deployment.
- **Gallery interaction is unspecified:** default to a linked grid; ask for a lightbox only if a concrete visitor need justifies it.
- **Content length/localization is unknown:** test the longest address, hours, placeholder, and any translated copy at narrow widths; avoid fixed heights.
- **Analytics/privacy requirements are unspecified:** keep the site tracker-free until an explicit consent and measurement requirement exists.

## Sources

### Primary (official documentation; medium confidence for this dated snapshot)

- [Astro 7 release](https://astro.build/blog/astro-7/), [installation prerequisites](https://docs.astro.build/en/tutorial/1-setup/1/), [deployment](https://docs.astro.build/en/guides/deploy/), [islands](https://docs.astro.build/en/concepts/islands/), and [image assets](https://docs.astro.build/en/reference/modules/astro-assets/) — current static-build, Node, component, and image behavior.
- [Cloudflare Pages build configuration](https://developers.cloudflare.com/pages/configuration/build-configuration/) and [Git integration](https://developers.cloudflare.com/pages/get-started/git-integration/) — Astro preset, `npm run build`, `dist`, and deployment flow.
- [Google Maps URLs](https://developers.google.com/maps/documentation/urls/get-started) and [Embed API quickstart](https://developers.google.com/maps/documentation/embed/quickstart) — keyless directions links and embed/API requirements.
- [MDN accessible HTML](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/HTML), [responsive images](https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Responsive_images), and [progressive enhancement](https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement) — semantic links, image behavior, and no-JavaScript baseline.
- [W3C WCAG 2.2 changes](https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/), [contrast minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html), and [accessible names](https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/) — focus, target size, contrast, and naming requirements.
- [Google Business Profile guidelines](https://support.google.com/business/answer/3038177?hl=en) — truthful local business data and synchronization expectations.

### Secondary (directional ecosystem guidance; medium confidence)

- [web.dev responsive images](https://web.dev/learn/design/responsive-images?hl=en) and [images](https://web.dev/learn/html/images?hl=en) — responsive sizing, lazy loading, and layout-shift prevention.
- [Think with Google restaurant micro-moments](https://www.thinkwithgoogle.com/_qs/documents/800/micro-moments-guide-how-australians-find-choose-restaurants.pdf) — mobile local-intent behavior.
- Practitioner café/restaurant checklists from [Wiz Studio Labs](https://www.wizstudiolabs.com/insights/website-for-restaurant-cafe-malaysia), [Alvex Studio](https://alvexstudio.co.uk/blog/web-design-for-restaurants-and-cafes), and [Fairwell Collective](https://fairwellcollective.com/blogs/ledger/restaurant-website-design-checklist) — practical content expectations, used directionally.

---
*Research completed: 2026-08-02*  
*Ready for roadmap: yes*
