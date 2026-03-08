import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const buildDirectory = mkdtempSync(join(tmpdir(), 'vienna-jekyll-'));

execFileSync('bundle', ['exec', 'jekyll', 'build', '--destination', buildDirectory], { stdio: 'pipe' });

function readBuiltFile(path) {
  return readFileSync(join(buildDirectory, path), 'utf8');
}

test('page layout pages do not render post navigation', () => {
  const notFoundPage = readBuiltFile('404.html');

  assert.equal(notFoundPage.includes('<nav class="post-navigation" role="navigation">'), false);
});

test('dnd posts mark the D&D navigation item as active', () => {
  const post = readBuiltFile('dungeons-and-dragons/2017/06/19/session-19.html');

  assert.equal(post.includes('<a href="https://etienne.vandelden.family/dnd/" class="active">D&amp;D</a>'), true);
});

test('page layout keeps the page wrapper used by the migrated CSS', () => {
  const tagsPage = readBuiltFile('tags/index.html');

  assert.equal(tagsPage.includes('<main id="page">'), true);
});

test('utility color classes used by built pages remain defined', () => {
  const stateCss = readBuiltFile('css/4_state/state.css');

  assert.equal(stateCss.includes('.primary-text-color'), true);
  assert.equal(stateCss.includes('.success-text-color'), true);
  assert.equal(stateCss.includes('.danger-text-color'), true);
  assert.equal(stateCss.includes('.info-text-color'), true);
});
