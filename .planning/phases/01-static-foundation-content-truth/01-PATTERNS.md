# Phase 1 Pattern Map

## Repository state

This is a greenfield repository. There are no existing application source files, components, CSS tokens, test utilities, or framework conventions to reuse.

## Planned file roles

| File | Role | Closest existing analog |
|------|------|-------------------------|
| `package.json` | Astro build scripts and minimal dependency declaration | None — create the smallest package manifest |
| `astro.config.mjs` | Static Astro output configuration | None |
| `src/data/cafe.ts` | Single source of truth for verified café content and placeholders | None |
| `src/pages/index.astro` | Semantic page shell and foundation markup | None |
| `src/styles/global.css` | CSS custom properties, typography, spacing, focus, and base layout | None |
| `tsconfig.json` | Astro/TypeScript defaults | None — use Astro's generated baseline |
| `public/` | Future supplied static assets | None |

## Planning implications

- Do not invent abstractions to replace missing patterns; use the native Astro page, one content module, and one global stylesheet first.
- Keep later section components free to split from `index.astro` only when phase 2 or 3 creates repeated structure.
- No UI registry, state library, routing library, map SDK, gallery library, or runtime client framework is justified in this phase.
- Tests should assert content-source placeholders and static build output rather than create a broad component test harness.

*Greenfield mapping: no existing analogs found.*
