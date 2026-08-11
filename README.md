# Café o Alexandre

Single-page website for Café o Alexandre, a local café in Milharado, Portugal.
Mobile-first, static, zero client-side frameworks.

## Tech

- [Astro](https://astro.build) (static output)
- Semantic HTML + CSS
- Node.js 22.12+

## Development

```bash
npm install
npm run dev       # local dev server
npm run build     # production build → dist/
npm test          # build + content-truth checks
npm run preview   # serve the built site
```

## Content

All business info lives in one place: [`src/data/cafe.ts`](src/data/cafe.ts).
Verified values are phone `927 605 689`, address `Av. Principal 51, 2665-305 Milharado`,
hours `07:00–20:00`, and a Google Maps directions link. Anything not yet confirmed
by the café stays an explicit, non-actionable placeholder — never invent facts.

## Deploy

Cloudflare Pages preset: build command `npm run build`, output directory `dist`.
