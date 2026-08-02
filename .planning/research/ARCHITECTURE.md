# Architecture Patterns

**Domain:** Static, single-page local café information site  
**Project:** Café o Alexandre  
**Researched:** 2026-08-02  
**Overall confidence:** MEDIUM (official Astro, MDN, and W3C guidance; no existing codebase to validate)

## Recommended Architecture

Use a static-first Astro site with one page and no client-side framework runtime. Astro's default output is pre-rendered static HTML; components remain HTML/CSS unless an explicit `client:*` directive hydrates an interactive island. This gives the project maintainable section boundaries and build-time image handling without turning a practical brochure page into a JavaScript application.

Plain HTML/CSS/JS is still a valid lower-dependency fallback if the project deliberately avoids a Node build step. Do not choose React, Vue, a CMS, a database, or server rendering for this scope. Astro earns its small build-time cost through component organization and local image optimization; it should not be used as a reason to add runtime interaction.

```text
verified content object
        |
        v
src/pages/index.astro  (document shell + section order)
        |
        +--> Hero / About / PracticalInfo / Directions / Gallery / Footer
        |
        v
Astro static build  -->  HTML + CSS + hashed image assets  -->  CDN/static host
        |
        +--> native tel:, WhatsApp, and map links leave the page
```

### Component Boundaries

| Component or area | Responsibility | Communicates with |
|---|---|---|
| `src/pages/index.astro` | Owns document metadata, landmark order, and one-page composition | Content object, section components, global styles |
| `src/data/site.ts` (or equivalent plain data file) | Holds café copy, contact values, hours, links, and gallery metadata; keeps unverified values visibly marked | `index.astro` and presentational sections |
| `Hero.astro` | Name, welcome message, address placeholder, and primary call/directions actions | Content object; native links |
| `About.astro` | Café description and offer copy | Content object |
| `PracticalInfo.astro` | Address, phone, WhatsApp, hours, and social links with accessible labels | Content object; native links |
| `Directions.astro` | Clear map link (preferred) or verified embed; never invents a destination | Content object; external map URL |
| `Gallery.astro` | Responsive figure grid using café-provided assets and useful alt text | Content object; Astro image pipeline |
| `Footer.astro` | Repeats verified address and phone; keeps the page's final contact path obvious | Content object |
| `src/styles/global.css` | Color tokens, typography, layout, focus states, responsive rules, and reduced-motion rules | All sections |
| `src/assets/` | Source café images that Astro can dimension and optimize at build time | `Gallery.astro` and hero image |

Keep a section inline in `index.astro` when it is a one-off and has no distinct behavior. Split it into a component only when it improves reading/editing, is repeated, or will receive independent interaction. This avoids both an unmaintainable monolith and a directory full of one-line wrappers.

### Data Flow

1. A small local content object is the single source for all business facts. Missing facts remain literal placeholders such as `[PHONE NUMBER]`; they are not inferred from reference artwork.
2. `index.astro` passes those values to semantic section markup at build time. There is no browser fetch, API, database, authentication, or CMS.
3. Astro emits static HTML, bundled CSS, and fingerprinted image assets. Local images in `src/` use Astro's `<Image />`/`<Picture />` helpers where practical; otherwise use native `<img>` with `alt`, dimensions, and responsive `srcset`/`sizes`.
4. The browser can read the page, contact details, and links with JavaScript disabled. `tel:`, WhatsApp, and map actions are ordinary anchors once verified values exist; placeholders are displayed as text and are not made into misleading links.
5. A gallery begins as a normal figure/link grid. If a lightbox is later required, add one small progressively enhanced native `<dialog>` script or one client island; do not make the whole page depend on it.

## Patterns to Follow

### Pattern 1: Semantic section composition

**What:** Use one `<header>`, one `<main>`, descriptive `<section>` headings, an `<address>` for contact information, and a `<footer>`. Keep navigation and action labels visible in text (for example, “Call the café” and “Get directions”).

**When:** Always; the page is content-led and must remain usable with assistive technology and without JavaScript.

**Example:**

```astro
<main id="content">
  <section aria-labelledby="about-heading">
    <h2 id="about-heading">About the café</h2>
    <p>{site.description}</p>
  </section>

  <section aria-labelledby="visit-heading">
    <h2 id="visit-heading">Plan your visit</h2>
    <address>{site.address}</address>
    {site.phoneVerified ? <a href={`tel:${site.phone}`}>Call the café</a> : <span>{site.phone}</span>}
  </section>
</main>
```

Use native HTML naming techniques before adding ARIA. Every focusable link or control needs an accessible name, and visible text is the most maintainable source for that name.

### Pattern 2: Progressive enhancement

**What:** Render essential copy, gallery images, and navigation as HTML first. CSS improves layout and visual direction; JavaScript is optional and only enhances a clearly bounded interaction.

**When:** For the gallery, menu/navigation polish, or future non-critical interaction. Never gate contact details or directions behind JavaScript.

**Example:** A gallery card is first an `<a href="/images/cafe-01.jpg"><img ... /></a>`; a later script can intercept the click and open a dialog while the link remains a working fallback.

### Pattern 3: Mobile-first responsive media

**What:** Start with a single-column layout and comfortable tap targets, then add a small number of CSS media-query changes for wider screens. Supply image dimensions and responsive sources so the browser can choose an appropriate asset.

**When:** Hero and gallery images, all viewport widths, and slow mobile connections.

**Notes:** Use a real viewport meta tag. Prefer `loading="lazy"` for below-the-fold gallery images; reserve eager/high-priority loading for the actual hero image. Use `prefers-reduced-motion` to disable non-essential transitions.

### Pattern 4: Explicit content truth boundary

**What:** Treat business facts as data requiring verification. Keep placeholders visually clear and non-actionable until the café supplies the value; only then generate `tel:`, WhatsApp, social, or map URLs.

**When:** Every content field listed in `.planning/PROJECT.md`, especially address, phone, hours, social links, destination, copy, and images.

**Why:** A visibly incomplete page is safer than a polished page that sends visitors to the wrong café or phone number.

## Anti-Patterns to Avoid

### Anti-pattern 1: Client-rendered brochure page

**What:** Ship an empty root element and fetch/render all café content through React or another SPA runtime.

**Why bad:** Contact and directions depend on JavaScript, increase startup cost, complicate accessibility, and create a failure mode for the exact high-intent mobile visit this page serves.

**Instead:** Emit static semantic HTML and add only bounded enhancement when a real interaction is approved.

### Anti-pattern 2: Premature component or design-system fragmentation

**What:** Introduce a component, state, or abstraction for every heading, card, or color before repetition exists.

**Why bad:** More files and indirection obscure a six-section page and slow content verification.

**Instead:** Keep a small set of section components and a handful of CSS custom properties; extract only repeated structure.

### Anti-pattern 3: Third-party map iframe as the default

**What:** Embed a map using an unverified or guessed destination and load a third-party frame on every visit.

**Why bad:** It risks wrong directions, adds network/privacy cost, and cannot be corrected safely while the destination is unknown.

**Instead:** Show a clear verified Google Maps link first. Add an iframe only when the café supplies the exact destination and the performance/privacy trade-off is accepted.

### Anti-pattern 4: Decorative palette overriding readability

**What:** Put cream/gold text over burgundy/charcoal backgrounds without testing each pair, or rely on color alone for action states.

**Why bad:** WCAG 2.2 requires sufficient text contrast and visible keyboard focus; red-on-black and low-contrast gold treatments can fail despite looking on-brand.

**Instead:** Keep palette tokens but test actual text/background pairs (4.5:1 for normal text, 3:1 for large text), and use shape/underline/focus outlines in addition to hue.

## Scalability Considerations

| Concern | At 100 users | At 10K users | At 1M users |
|---|---|---|---|
| HTML delivery | Static files on any host | CDN cache of the same immutable build | Global CDN/edge cache; no app server required |
| Images | A few optimized café assets in `src/` | Fingerprinted responsive variants; lazy-load gallery | Keep hashed assets; use an image CDN only if the real gallery grows materially |
| Content changes | Edit the local data object and rebuild | Same build pipeline with preview before publish | Consider a CMS only if frequent non-technical edits become a requirement |
| Runtime | No JavaScript required | Same zero-runtime baseline | Same; add analytics/observability only with an explicit privacy decision |
| Dynamic features | Out of scope | Add one bounded island if a validated need appears | Re-evaluate architecture only for real product requirements (ordering, accounts, APIs) |

## Validation Strategy

- **Build:** Run `npm run build` and inspect the generated `dist/` for a complete `index.html`, expected asset URLs, and no placeholder-to-link conversion.
- **Content truth:** Search the build output for every placeholder and verify each supplied fact appears exactly where expected; reject any inferred contact, address, map, or image value.
- **Browser smoke:** Preview the static build at narrow mobile and desktop widths. Check hero actions, anchor jumps, map link, gallery fallbacks, no horizontal overflow, and image loading.
- **Keyboard/accessibility:** Tab through every link/control, confirm visible focus is not obscured, verify meaningful accessible names, heading/landmark order, alt text, contrast, and touch target sizing. Run an automated accessibility check, then manually test the primary mobile flow.
- **Resilience:** Disable JavaScript and throttle the network. The page must still expose café identity, practical information, and usable native links.

## Sources

- [Astro islands architecture](https://docs.astro.build/en/concepts/islands/) — static components by default; explicit `client:*` hydration (MEDIUM confidence; official docs).
- [Astro on-demand rendering](https://docs.astro.build/en/guides/on-demand-rendering/) — default static pre-rendering and guidance to start in static mode (MEDIUM; official docs).
- [Astro project structure](https://docs.astro.build/en/basics/project-structure/) — `src/pages`, components, and processed/static assets (MEDIUM; official docs).
- [Astro image assets](https://docs.astro.build/en/reference/modules/astro-assets/) — optimized `<Image />`/`<Picture />`, dimensions, lazy loading, and responsive layouts (MEDIUM; official docs).
- [MDN Progressive Enhancement](https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement) — baseline functionality before richer behavior (MEDIUM; official docs).
- [MDN Responsive images](https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Responsive_images) — `srcset`, `sizes`, `picture`, and fallback behavior (MEDIUM; official docs).
- [MDN Responsive design](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design) — mobile viewport, responsive layout, and image performance guidance (MEDIUM; official docs).
- [WAI-ARIA APG accessible names](https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/) — visible text and native naming techniques; interactive elements need accessible names (MEDIUM; official W3C guidance).
- [WCAG 2.2 changes](https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/) — focus-not-obscured and target-size criteria (MEDIUM; official W3C guidance).
- [WCAG 2.2 contrast minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) — 4.5:1 normal text and 3:1 large text thresholds (MEDIUM; official W3C guidance).
