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
  '[PHONE NUMBER]',
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
  assert.match(html, /class="eyebrow"/);
  assert.match(html, /class="display-title"/);
  assert.match(html, /Welcome to Café o Alexandre\./);
  assert.match(html, /Phone number not yet available/);
  assert.match(html, /Find us/);
  assert.match(html, /Call Us · Phone number not yet available/);
  assert.match(html, /Get Directions · Link not yet available/);
  assert.match(html, /Café details coming soon/);
  assert.match(html, /Verified café information will appear here once it is provided\./);
  assert.match(html, /<h2[^>]*>About Us<\/h2>/);
  assert.match(html, /<h2[^>]*>What we offer<\/h2>/);
  assert.match(html, /<h2[^>]*>Practical information<\/h2>/);
  assert.match(html, /Social media/);
  assert.match(html, /site-footer__contact/);
  assert.match(html, /class="skip-link" href="#main-content">Skip to content<\/a>/);
  assert.match(html, /<header\b/);
  assert.match(html, /<main id="main-content">/);
  assert.equal(count(/<section\b/g, html), 5);
  assert.match(html, /<footer\b/);
  assert.equal(count(/<h1\b/g, html), 1);
  assert.match(html, /<h2[^>]*>Café images<\/h2>/);
  assert.match(html, /<h3>Photos coming soon<\/h3>/);
  assert.match(html, /Photos of the café will appear here once they are supplied\./);
  assert.doesNotMatch(html, /<img\b/);

  const headings = [...html.matchAll(/<h2\b[^>]*>(.*?)<\/h2>/g)].map((match) =>
    match[1].replace(/<[^>]+>/g, '')
  );
  assert.deepEqual(headings, [
    'Café details coming soon',
    'About Us',
    'What we offer',
    'Practical information',
    'Café images'
  ]);

  const expectedCounts = {
    '[FULL ADDRESS]': 3,
    '[PHONE NUMBER]': 2,
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
  assert.doesNotMatch(html, /tel:/i);
  assert.doesNotMatch(html, /(?:href|src)="[^"]*(?:whatsapp|maps\.google|google\.com\/maps|facebook|instagram|twitter|x\.com|mailto:)/i);
  assert.doesNotMatch(html, /(?:href|src)="[^"]*\[[^\"]+\]/i);
  assert.doesNotMatch(html, /(?:href|src)="[^"]+\.(?:jpe?g|png|webp|avif|gif)(?:["?#]|$)/i);
  assert.doesNotMatch(html, /\b(?:sponsor|sponsored|advertisement|advertiser|logo)\b/i);
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
  for (const color of ['#f7f0e4', '#272323', '#762536', '#c39a5a']) {
    assert.match(css, new RegExp(color, 'i'));
  }

  for (const spacing of ['4px', '8px', '16px', '24px', '32px', '48px', '64px']) {
    assert.match(css, new RegExp(`: ${spacing};`));
  }

  for (const size of ['14px', '16px', '24px', '40px']) {
    assert.match(css, new RegExp(`: ${size};`));
  }

  assert.match(css, /72rem/);
  assert.match(css, /65ch/);
  assert.doesNotMatch(css, /(?:min-width|min-inline-size):\s*320px/);
  assert.match(css, /inline-size: min\(/);
  assert.match(css, /overflow-wrap: anywhere/);
  assert.match(css, /@media \(min-width: 768px\)/);
  assert.match(css, /@media \(min-width: 1200px\)/);
  assert.match(css, /\.gallery-grid\s*\{[\s\S]*grid-template-columns: minmax\(0, 1fr\)/);
  assert.match(css, /\.gallery-card\s+img\s*\{[\s\S]*aspect-ratio: 4 \/ 3[\s\S]*object-fit: cover/);
  assert.match(css, /\.gallery-empty\s*\{[\s\S]*border: 1px dashed/);
  assert.match(css, /@media \(min-width: 768px\)[\s\S]*\.gallery-grid\s*\{[\s\S]*repeat\(2, minmax\(0, 1fr\)\)/);
  assert.match(css, /@media \(min-width: 1200px\)[\s\S]*\.gallery-grid\s*\{[\s\S]*repeat\(3, minmax\(0, 1fr\)\)/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /outline: 3px solid var\(--color-gold\)/);
  assert.match(css, /outline-offset: 2px/);
  assert.match(css, /120ms/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.doesNotMatch(css, /gradient|animation|@keyframes/i);
  assert.doesNotMatch(css, /[;{]\s*(?:height|min-height|max-height)\s*:/i);
});
