# Technology Stack

**Project:** Café o Alexandre  
**Researched:** 2026-08-02  
**Confidence:** MEDIUM (current primary documentation was available, but framework/host defaults can change)

## Recommended Stack

### Core Framework

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Astro | 7.x (`astro@latest` at project bootstrap) | Render the single page to static HTML/CSS | Astro is designed for content-driven sites, ships static output by default, and keeps client JavaScript at zero unless an island is explicitly hydrated. That matches a practical café page better than an SSR app. |
| Node.js | 22.12+ even-numbered LTS | Local/CI/build runtime | Current Astro installation guidance requires Node 22.12.0 or newer and does not support odd-numbered releases. Pin the chosen even LTS in `.nvmrc`/`engines` and use the same version in CI/Pages. |
| CSS + semantic HTML | Platform | Responsive mobile-first layout and accessible actions | Native links (`tel:`, `https://wa.me/`, Google Maps URL), CSS media queries, and semantic sections solve the brief without a UI framework or client-side router. |

### Database

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| None | — | — | This is an informational page with no accounts, orders, reservations, or mutable data. Keep verified business details in source files until a real content workflow is requested. |

### Infrastructure

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Cloudflare Pages (Git integration) | Current hosted service | Build and serve the static site | Cloudflare's current Astro preset is `npm run build` with `dist` as the output directory. Git integration supplies preview and production deployments without an application server or SSR adapter. |
| Git repository | — | Source and deployment trigger | Keep one small repository; Pages should build from its root (or explicitly set the root if the project later becomes a monorepo). |

### Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Astro `astro:assets` (`Image`/`Picture`) | Bundled with Astro 7 | Build-time dimensions and responsive image output | Use for café-provided local photos under `src/assets/` once they exist. It enforces `alt` text and can emit modern formats/sizes. A plain `<img>` with explicit dimensions is also acceptable for a very small gallery; do not add a remote image CDN. |
| `sharp` | Astro-compatible version | Local image transformer used by Astro's default image service | Add only if the chosen package-manager install needs it for `astro:assets`; do not introduce it merely for placeholders. |
| Native `<dialog>`/CSS | Browser platform | Optional gallery enlargement | Use only if a zoom interaction is explicitly required. The initial brief only needs a small gallery, so no PhotoSwipe, carousel, or UI framework belongs in the MVP. |

## Map and External Actions

- Ship a clear Google Maps URL for the verified destination, generated with the official `https://www.google.com/maps/dir/?api=1&destination=...` or search form. Maps URLs are cross-platform and do not require an API key.
- Do not construct a destination URL from sponsor material or placeholders. Keep the action visibly unavailable until the café address/Place ID is verified.
- Add a Google Maps Embed API iframe only if the café specifically wants an in-page map and someone can own the Google Cloud project/key. The Embed API requires a project, billing setup, enabled API, and restricted API key even though embed usage is currently no-charge.

## Alternatives Considered

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| Rendering | Astro static | Plain `index.html` + CSS | Plain HTML is technically sufficient and remains a fallback, but Astro's static build, component boundaries, and image helpers make verified placeholder content easier to maintain without adding runtime complexity. |
| Hosting | Cloudflare Pages | Vercel | Vercel also deploys static Astro with zero configuration and is a valid fallback. Cloudflare's current docs expose the exact Astro `npm run build`/`dist` preset and fit the project’s static-only needs without adding a platform adapter. |
| Styling | Scoped/global CSS | Tailwind or component UI kit | A single page has too little repeated UI for a utility framework to pay back its setup and design-system overhead. |
| Gallery | Static responsive image grid | PhotoSwipe, Swiper, or another carousel | The requirement is a small gallery, not a lightbox. Add a library only when a confirmed interaction requirement or usability test justifies it. |
| Map | Google Maps URL | Maps Embed API / Maps JavaScript API | A URL is native, accessible, cross-platform, and keyless. An embed/API adds third-party loading, privacy/cookie considerations, and credential ownership before the destination is even verified. |
| Content | Source-controlled placeholders | CMS | A CMS is explicitly out of scope and would add auth, hosting, and editing complexity to a page whose facts are still awaiting café-provided confirmation. |

## Installation

```bash
# Create the project with the current Astro CLI
npm create astro@latest

# Runtime/development
npm install
npm run dev

# Production check (Cloudflare Pages uses the same build command)
npm run build
npm run preview
```

Recommended `package.json` scripts are the Astro defaults:

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  },
  "engines": {
    "node": ">=22.12.0"
  }
}
```

Cloudflare Pages settings:

```text
Framework preset: Astro
Build command:    npm run build
Build directory:  dist
```

## Implementation Guardrails

- Keep `output` static (the Astro default); do not install `@astrojs/node`, `@astrojs/cloudflare`, or `@astrojs/vercel` for this page.
- Use semantic landmarks, descriptive link text, visible focus styles, and native anchors for call/WhatsApp/directions. Do not replace anchors with `onclick` pseudo-buttons.
- For the gallery, provide meaningful `alt`, intrinsic `width`/`height`, `srcset`/`sizes` or Astro image output, and `loading="lazy"` below the fold. Keep hero imagery eager.
- Keep third-party embeds out of the initial critical path. A directions link works when JavaScript, cookies, or a map provider is unavailable.

## Sources

- [Astro 7 release](https://astro.build/blog/astro-7/) — current release/bootstrap command (`astro@latest`), checked 2026-08-02 (MEDIUM confidence).
- [Astro installation prerequisites](https://docs.astro.build/en/tutorial/1-setup/1/) — Node.js 22.12.0+ and even-numbered releases, checked 2026-08-02 (MEDIUM confidence).
- [Astro deployment guide](https://docs.astro.build/en/guides/deploy/) — static build and `dist` output, checked 2026-08-02 (MEDIUM confidence).
- [Cloudflare Pages build configuration](https://developers.cloudflare.com/pages/configuration/build-configuration/) — Astro preset `npm run build`/`dist`, checked 2026-08-02 (MEDIUM confidence).
- [Cloudflare Pages Git integration](https://developers.cloudflare.com/pages/get-started/git-integration/) — Git build/deploy flow, checked 2026-08-02 (MEDIUM confidence).
- [Vercel: Astro](https://vercel.com/docs/frameworks/frontend/astro) — static zero-config alternative, checked 2026-08-02 (MEDIUM confidence).
- [Astro images reference](https://docs.astro.build/en/reference/modules/astro-assets/) — `Image`/`Picture`, required `alt`, and local image behavior, checked 2026-08-02 (MEDIUM confidence).
- [MDN: `<img>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/img) — `alt`, dimensions, responsive hints, and lazy loading, checked 2026-08-02 (MEDIUM confidence).
- [MDN: accessible HTML](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/HTML) — semantic links and avoiding `onclick` pseudo-buttons, checked 2026-08-02 (MEDIUM confidence).
- [Google Maps URLs](https://developers.google.com/maps/documentation/urls/get-started) — cross-platform, keyless links and `api=1`, checked 2026-08-02 (MEDIUM confidence).
- [Google Maps Embed API quickstart](https://developers.google.com/maps/documentation/embed/quickstart) — project/billing/API-key requirements, checked 2026-08-02 (MEDIUM confidence).
