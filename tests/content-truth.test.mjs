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
  description: '[DESCRIÇÃO DO CAFÉ]',
  offerings: '[OFERTA DO CAFÉ]',
  images: '[IMAGENS DO CAFÉ]'
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

test('verified identity and visit details remain source-backed', () => {
  assert.match(source, /name:\s*['"]Café o Alexandre['"]/);
  assert.match(source, /welcome:\s*['"]Bem-vindo ao Café o Alexandre\.['"]/);
  assert.match(source, /phone:\s*['"]927 605 689['"]/);
  assert.match(source, /address:\s*['"]Av\. Principal 51, 2665-305 Milharado, Portugal['"]/);
  assert.match(source, /hours:\s*['"]07:00–20:00['"]/);
  assert.match(source, /map:\s*['"]https:\/\/www\.google\.com\/maps\/dir/);
});

test('content source contains only verified destination schemes', () => {
  assert.doesNotMatch(source, /['"`](?:whatsapp:|mailto:)/i);
  assert.doesNotMatch(source, /whatsapp|social/i);
});

test('gallery stays empty until verified local café images arrive', () => {
  assert.match(source, /export type GalleryImage = Readonly<\{/);
  for (const field of ['src', 'alt', 'caption', 'width', 'height']) {
    assert.match(source, new RegExp(`\\b${field}:`), `${field} is required gallery metadata`);
  }
  assert.match(source, /gallery:\s*\[\]\s+as readonly GalleryImage\[\]/);
});
