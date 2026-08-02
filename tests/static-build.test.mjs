import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const testDirectory = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.resolve(testDirectory, '../dist/index.html');
const cssPath = path.resolve(testDirectory, '../src/styles/global.css');
const pageSourcePath = path.resolve(testDirectory, '../src/pages/index.astro');
const html = await readFile(distPath, 'utf8');
const css = await readFile(cssPath, 'utf8');
const pageSource = await readFile(pageSourcePath, 'utf8');

const placeholders = [
  '[FULL ADDRESS]',
  '[WHATSAPP NUMBER]',
  '[OPENING HOURS]',
  '[SOCIAL LINKS]',
  '[CAFÉ DESCRIPTION]',
  '[CAFÉ OFFER]',
  '[GOOGLE MAPS LINK]',
  '[CAFÉ IMAGES]'
];

const count = (pattern, value) => (value.match(pattern) ?? []).length;

test('generated page keeps the semantic shell and source-backed copy', () => {
  assert.match(html, /<meta name="viewport" content="width=device-width, initial-scale=1">/);
  assert.match(html, /<title>Café o Alexandre<\/title>/);
  assert.match(html, /class="hero"/);
  assert.match(html, /class="site-header"/);
  assert.match(html, /class="hero-art"/);
  assert.match(html, /Welcome to Café o Alexandre\./);
  assert.match(html, /Find us/);
  assert.match(html, /Call 927 605 689/);
  assert.match(html, /Directions coming soon/);
  assert.match(html, /<h2[^>]*>About Us<\/h2>/);
  assert.match(html, /<h2[^>]*>Plan your visit<\/h2>/);
  assert.match(html, /<h2[^>]*>A look inside<\/h2>/);
  assert.match(html, /Social media/);
  assert.match(html, /site-footer__inner/);
  assert.match(html, /class="skip-link" href="#main-content">Skip to content<\/a>/);
  assert.match(html, /<header\b/);
  assert.match(html, /<main id="main-content">/);
  assert.equal(count(/<section\b/g, html), 4);
  assert.match(html, /<footer\b/);
  assert.equal(count(/<h1\b/g, html), 1);
  assert.match(html, /<h3>Photos coming soon<\/h3>/);
  assert.match(html, /Photos of the café will appear here once they are supplied\./);
  assert.doesNotMatch(html, /<img\b/);

  const headings = [...html.matchAll(/<h2\b[^>]*>(.*?)<\/h2>/g)].map((match) =>
    match[1].replace(/<[^>]+>/g, '')
  );
  assert.deepEqual(headings, [
    'About Us',
    'Plan your visit',
    'A look inside'
  ]);

  const expectedCounts = {
    '[FULL ADDRESS]': 2,
    '[WHATSAPP NUMBER]': 1,
    '[OPENING HOURS]': 1,
    '[SOCIAL LINKS]': 1,
    '[CAFÉ DESCRIPTION]': 1,
    '[CAFÉ OFFER]': 1,
    '[GOOGLE MAPS LINK]': 1,
    '[CAFÉ IMAGES]': 0
  };
  for (const placeholder of placeholders) {
    assert.equal(
      count(new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), html),
      expectedCounts[placeholder]
    );
  }
});

test('unresolved content does not become an actionable destination', () => {
  assert.match(html, /href="tel:927605689"/i);
  assert.doesNotMatch(html, /(?:href|src)="[^"]*(?:whatsapp|maps\.google|google\.com\/maps|facebook|instagram|twitter|x\.com|mailto:)/i);
  assert.doesNotMatch(html, /(?:href|src)="[^"]*\[[^\"]+\]/i);
  assert.doesNotMatch(html, /(?:href|src)="[^"]+\.(?:jpe?g|png|webp|avif|gif)(?:["?#]|$)/i);
  assert.doesNotMatch(html, /\b(?:sponsor|sponsored|advertisement|advertiser|logo)\b/i);
});

test('static artifact stays dependency-free and keeps no-JavaScript fallbacks', () => {
  assert.doesNotMatch(html, /<script\b/i);
  assert.doesNotMatch(html, /<(?:iframe|img|source)\b[^>]*(?:src|srcset)=['"]https?:\/\//i);
  assert.doesNotMatch(html, /<link\b[^>]*(?:href|src)=['"]https?:\/\//i);
  assert.match(html, /<link rel="stylesheet" href="\/_astro\/[^\"]+\.css">/);
  assert.match(html, /Call 927 605 689/);
  assert.match(html, /Directions coming soon/);
  assert.match(html, /Photos coming soon/);
  assert.match(html, /Photos of the café will appear here once they are supplied\./);
});

test('gallery source keeps semantic image metadata for future local entries', () => {
  assert.match(pageSource, /<figure class="gallery-card">/);
  assert.match(pageSource, /<img[\s\S]*src=\{image\.src\}[\s\S]*alt=\{image\.alt\}/);
  assert.match(pageSource, /width=\{image\.width\}/);
  assert.match(pageSource, /height=\{image\.height\}/);
  assert.match(pageSource, /loading="lazy"/);
  assert.match(pageSource, /decoding="async"/);
  assert.match(pageSource, /<figcaption>\{image\.caption\}<\/figcaption>/);
});

test('generated page includes the global visual contract', () => {
  for (const color of ['#f3e9db', '#211c1e', '#7c2438', '#d4ad62']) {
    assert.match(css, new RegExp(color, 'i'));
  }

  for (const spacing of ['8px', '16px', '24px', '32px', '48px', '72px', '96px']) {
    assert.match(css, new RegExp(`: ${spacing};`));
  }

  assert.match(css, /--content-width:\s*1180px/);
  assert.match(css, /--copy-width:\s*62ch/);
  assert.doesNotMatch(css, /(?:min-width|min-inline-size):\s*320px/);
  assert.match(css, /inline-size: min\(/);
  assert.match(css, /overflow-wrap: anywhere/);
  assert.match(css, /@media \(min-width: 700px\)/);
  assert.match(css, /@media \(min-width: 1100px\)/);
  assert.match(css, /\.gallery-grid\s*\{[\s\S]*grid-template-columns: minmax\(0, 1fr\)/);
  assert.match(css, /\.gallery-card\s+img\s*\{[\s\S]*aspect-ratio: 4 \/ 3[\s\S]*object-fit: cover/);
  assert.match(css, /\.gallery-empty\s*\{[\s\S]*border: 1px dashed/);
  assert.match(css, /@media \(min-width: 700px\)[\s\S]*\.gallery-grid\s*\{[\s\S]*repeat\(2, minmax\(0, 1fr\)\)/);
  assert.match(css, /@media \(min-width: 1100px\)[\s\S]*\.gallery-grid\s*\{[\s\S]*repeat\(3, minmax\(0, 1fr\)\)/);
  assert.match(css, /:focus-visible/);
   assert.match(css, /outline: 3px solid var\(--gold\)/);
   assert.match(css, /outline-offset: 3px/);
   assert.match(css, /180ms/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.doesNotMatch(css, /gradient|animation|@keyframes/i);
  assert.doesNotMatch(css, /[;{]\s*(?:height|min-height|max-height)\s*:/i);
});
