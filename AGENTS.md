<!-- GSD:project-start source:PROJECT.md -->

## Project

**Café o Alexandre**

A simple, welcoming, mobile-friendly single-page website for Café o Alexandre. It gives local visitors and prospective customers the practical information they need immediately: where the café is, when it is open, how to call or message it, how to get directions, and what it offers.

The page combines a concise hero, an about section, practical business information, map access, a small café photo gallery, and a compact footer. Its tone is warm, local, and elegant rather than corporate or promotional.

**Core Value:** A visitor can quickly find accurate café information and take the next action—call, WhatsApp, or get directions—especially on a mobile phone.

### Constraints

- **Scope**: One concise single-page website — keep navigation and content direct.
- **Content truth**: Missing business information must remain clearly marked; never infer it from sponsor material.
- **Responsive design**: Mobile usability is primary, while tablet and desktop layouts must remain polished.
- **Accessibility**: Use semantic structure, readable type, strong contrast, visible focus states, descriptive labels, and comfortable touch targets.
- **Visual direction**: Burgundy, charcoal, warm gold, and cream; warm and local, not corporate, crowded, or overly animated.
- **Actions**: Call, WhatsApp, and directions controls must be prominent and use native actionable links once verified values exist.

<!-- GSD:project-end -->

<!-- GSD:stack-start source:research/STACK.md -->

## Technology Stack

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

# Create the project with the current Astro CLI

# Runtime/development

# Production check (Cloudflare Pages uses the same build command)

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

<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->

## Conventions

Conventions not yet established. Will populate as patterns emerge during development.
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->

## Architecture

Architecture not yet mapped. Follow existing patterns found in the codebase.
<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->

## Project Skills

No project skills found. Add skills to any of: `.claude/skills/`, `.agents/skills/`, `.cursor/skills/`, `.github/skills/`, or `.codex/skills/` with a `SKILL.md` index file.
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->

## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:

- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->

<!-- GSD:profile-start -->

## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
