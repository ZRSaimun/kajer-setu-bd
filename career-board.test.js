import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, existsSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {dirname, join} from 'node:path';

const root = dirname(fileURLToPath(import.meta.url));
const page = readFileSync(join(root, 'index.html'), 'utf8');
const css = readFileSync(join(root, 'styles.css'), 'utf8');
const app = readFileSync(join(root, 'app.js'), 'utf8');

test('career board has connected search, list and detail landmarks', () => {
  for (const id of ['main','search-panel','query','location','savedOnly','clearFilters','count','jobs','roleDetail','detail-heading']) {
    assert.match(page, new RegExp('id="' + id + '"'));
  }
  assert.match(page, /class="career-workspace"/);
  assert.match(page, /aria-live="polite"/);
  assert.match(page, /class="skip"/);
  assert.match(app, /filterJobs/);
  assert.match(app, /selectedId/);
  assert.match(app, /data-select/);
  assert.match(app, /data-save/);
});

test('all local links from redesigned landing page resolve on this branch', () => {
  for (const match of page.matchAll(/(?:href|src)="(\.\/[^"#?]+)(?:[?#][^"]*)?"/g)) {
    assert.ok(existsSync(join(root, match[1])), 'Missing asset: ' + match[1]);
  }
});

test('no fictitious sample is advertised as a verified vacancy', () => {
  assert.match(page, /কল্পিত/);
  assert.match(page, /কোনো বর্তমান চাকরি/);
  assert.match(app, /Not verified/);
  assert.match(app, /Not a vacancy/i);
  assert.match(app, /No real|কোনো চাকরির আবেদন/);
  assert.match(page, /GitHub-এ দেওয়া অভিযোগ প্রকাশ্য/);
});

test('redesign includes keyboard focus, mobile reflow and print rules', () => {
  assert.match(css, /\.career-board :focus-visible/);
  assert.match(css, /@media\(max-width:650px\)/);
  assert.match(css, /@media print/);
  assert.match(css, /\.career-workspace\{display:grid/);
  assert.match(app, /\.focus\(\)/);
});

test('filter reset restores search and location defaults', () => {
  assert.match(app, /\$\('query'\)\.value = ''/);
  assert.match(app, /\$\('location'\)\.value = ''/);
  assert.match(app, /\$\('savedOnly'\)\.checked = false/);
});
