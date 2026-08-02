import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const sourcePath = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../src/data/cafe.ts'
);
const source = await readFile(sourcePath, 'utf8');

const placeholders = {
  address: '[FULL ADDRESS]',
  whatsapp: '[WHATSAPP NUMBER]',
  hours: '[OPENING HOURS]',
  social: '[SOCIAL LINKS]',
  description: '[CAFÉ DESCRIPTION]',
  offerings: '[CAFÉ OFFER]',
  map: '[GOOGLE MAPS LINK]',
  images: '[CAFÉ IMAGES]'
};

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

test('all unknown café fields stay explicit, non-empty placeholders', () => {
  for (const [key, value] of Object.entries(placeholders)) {
    const property = new RegExp(
      `\\b${key}\\s*:\\s*['"](${escapeRegExp(value)})['"]`
    );
    assert.match(source, property, `${key} must keep its placeholder value`);
    assert.notEqual(value.trim(), '', `${key} placeholder cannot be empty`);
    assert.doesNotMatch(
      value,
      /^(?:tel:|whatsapp:|https?:\/\/|mailto:)/i,
      `${key} placeholder must not be actionable`
    );
  }
});

test('verified identity and welcome copy remain source-backed', () => {
  assert.match(source, /name:\s*['"]Café o Alexandre['"]/);
  assert.match(source, /welcome:\s*['"]Welcome to Café o Alexandre\.["']/);
  assert.match(source, /phone:\s*['"]927 605 689['"]/);
  assert.doesNotMatch(source, /Phone number not yet available|Café details coming soon/);
});

test('content source contains no actionable destination schemes', () => {
  assert.doesNotMatch(source, /['"`](?:tel:|whatsapp:|mailto:|https?:\/\/)/i);
});

test('gallery stays empty until verified local café images arrive', () => {
  assert.match(source, /export type GalleryImage = Readonly<\{/);
  for (const field of ['src', 'alt', 'caption', 'width', 'height']) {
    assert.match(source, new RegExp(`\\b${field}:`), `${field} is required gallery metadata`);
  }
  assert.match(source, /gallery:\s*\[\]\s+as readonly GalleryImage\[\]/);
});
