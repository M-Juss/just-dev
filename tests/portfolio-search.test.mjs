import test from 'node:test';
import assert from 'node:assert/strict';
import { searchPortfolioLines } from '../src/lib/portfolio-search.ts';

const lines = [
  { text: 'Built a Laravel API for online reservations.', section: 'Dinks on Us', id: 1 },
  { text: 'Laravel', section: 'Tech stack', id: 2 },
  { text: 'Laravel · MySQL · Hostinger VPS', section: 'TOL Barbershop', id: 3 },
  { text: 'Designed reusable mobile interfaces.', section: 'MATYAG', id: 4 },
  { text: 'Designed reusable mobile interfaces.', section: 'VANORA', id: 5 },
];

test('partial text matches from one character, ignoring case, with direct matches first', () => {
  assert.equal(searchPortfolioLines(lines, 'l').length, 5);
  assert.deepEqual(searchPortfolioLines(lines, 'LaRa').map(line => line.id), [2, 3, 1]);
  assert.equal(searchPortfolioLines(lines, 'Laravel')[0].id, 2);
});

test('multiple query words find the actual matching line regardless of whitespace or accents', () => {
  assert.deepEqual(searchPortfolioLines(lines, '  ONLINE   laravél ').map(line => line.id), [1]);
  assert.deepEqual(searchPortfolioLines(lines, '  '), []);
  assert.deepEqual(searchPortfolioLines(lines, 'unmatched'), []);
});

test('identical lines in different projects retain their own navigation targets', () => {
  const results = searchPortfolioLines(lines, 'mobile interfaces');
  assert.deepEqual(results.map(line => line.section), ['MATYAG', 'VANORA']);
  assert.equal(results[0], lines[3]);
  assert.equal(results[1], lines[4]);
});
