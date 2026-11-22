import assert from 'node:assert/strict';
import test from 'node:test';
import { arcs, chapterById, chapters } from '../catalog.js';
import {
  finishChapter, initialProgress, openChapter, PROGRESS_KEY, readProgress,
  selectChapter, writeProgress,
} from '../progress.js';

const LEGACY_KEY = 'onepace-facil-en-current-index-v1';

function memoryStorage(entries = []) {
  const data = new Map(entries);
  return { getItem: key => data.get(key) ?? null, setItem: (key, value) => data.set(key, value) };
}

test('catalogue has unique chapter identities and preserves chapter 00 and mixed qualities', () => {
  assert.equal(chapterById.size, chapters.length);
  assert.equal(new Set(arcs.map(arc => arc.id)).size, arcs.length);
  assert.equal(chapterById.get('long-ring-long-land:0').url, 'https://pixeldrain.net/l/7ky9W8GE#item=0');
  assert.equal(chapterById.get('long-ring-long-land:1').url, 'https://pixeldrain.net/l/7ky9W8GE#item=1');
  assert.equal(chapterById.get('skypiea:1').quality, '720p');
  assert.equal(chapterById.get('skypiea:11').quality, '480p');
});

test('legacy arc survives migration and only the chosen chapter is selected', () => {
  const storage = memoryStorage([[LEGACY_KEY, '30'], [PROGRESS_KEY, '{broken']]);
  const migrated = readProgress(storage);
  assert.equal(migrated.pendingArcId, 'dressrosa');
  assert.equal(migrated.currentId, null);
  assert.deepEqual(migrated.watchedIds, []);

  const selected = selectChapter(migrated, chapterById.get('dressrosa:45'));
  assert.equal(writeProgress(selected, storage), true);
  assert.deepEqual(readProgress(storage), selected);
  assert.equal(storage.getItem(LEGACY_KEY), '30');
  assert.deepEqual(readProgress(memoryStorage()), initialProgress());
});

test('mark and open moves across an arc boundary without marking skipped chapters', () => {
  const chapter = chapterById.get('romance-dawn:4');
  const opened = openChapter(initialProgress(), chapter);
  assert.deepEqual(opened.watchedIds, []);

  const next = finishChapter(opened, chapter, true);
  assert.deepEqual(next.watchedIds, ['romance-dawn:4']);
  assert.equal(next.currentId, 'orange-town:1');
  assert.equal(next.openedId, 'orange-town:1');
  assert.equal(finishChapter(opened, chapter, false).openedId, null);
});

test('the last chapter can be completed and repeated completion is idempotent', () => {
  const last = chapters.at(-1);
  const opened = openChapter(initialProgress(), last);
  const completed = finishChapter(opened, last, false);
  assert.equal(completed.currentId, last.id);
  assert.equal(completed.openedId, null);
  assert.deepEqual(completed.watchedIds, [last.id]);
  assert.deepEqual(finishChapter(completed, last, false), completed);
});

test('blocked browser storage leaves the catalogue usable', () => {
  const unavailable = () => { throw new Error('Storage denied'); };
  const storage = { getItem: unavailable, setItem: unavailable };
  assert.deepEqual(readProgress(storage), initialProgress());
  assert.equal(writeProgress(initialProgress(), storage), false);
});
