import test from 'node:test';
import assert from 'node:assert/strict';
import { getManilaTime, describeWeather } from '../src/lib/manila-time.ts';
import { parseGitHubCalendar } from '../src/lib/github-calendar.ts';
import { contributionWeeks } from '../src/lib/github-calendar-view.ts';

// Manila's calendar rolls over eight hours ahead of UTC, including year boundaries.
test('Manila date and 12-hour clock cross midnight together', () => {
  const before = getManilaTime(Date.parse('2026-10-28T15:59:59Z'));
  const after = getManilaTime(Date.parse('2026-10-28T16:00:00Z'));
  assert.equal(before.isoDate, '2026-10-28');
  assert.equal(before.weekday, 'Wednesday');
  assert.equal(before.time, '11:59:59');
  assert.equal(before.period, 'PM');
  assert.equal(after.isoDate, '2026-10-29');
  assert.equal(after.weekday, 'Thursday');
  assert.equal(after.month, 'OCT');
  assert.equal(after.time, '12:00:00');
  assert.equal(after.period, 'AM');
  const newYear = getManilaTime(Date.parse('2026-12-31T16:00:00Z'));
  assert.equal(newYear.year, '2027');
  assert.equal(newYear.month, 'JAN');
});

test('weather codes distinguish clear, drizzle, showers, and thunderstorms', () => {
  assert.equal(describeWeather(0), 'Clear skies');
  assert.equal(describeWeather(51), 'Drizzle');
  assert.equal(describeWeather(80), 'Rain showers');
  assert.equal(describeWeather(95), 'Thunderstorms');
  assert.equal(describeWeather(-1), 'Conditions unavailable');
});

test('calendar parser uses actual tooltip counts and sorts GitHub row-major dates', () => {
  const html = `<h2 id="js-contribution-activity-description">1,234 contributions in the last year</h2>
    <table><tr>
    <td class="ContributionCalendar-day" id="b" data-date="2026-10-29" data-level="2"></td>
    <td class="ContributionCalendar-day" id="a" data-date="2026-10-28" data-level="0"></td>
    </tr></table>
    <tool-tip for="b">12 contributions on October 29th.</tool-tip>
    <tool-tip for="a">No contributions on October 28th.</tool-tip>`;
  const result = parseGitHubCalendar(html);
  assert.equal(result.total, 1234);
  assert.deepEqual(result.days, [
    {date:'2026-10-28', count:0, level:0},
    {date:'2026-10-29', count:12, level:2},
  ]);
});

test('malformed or missing calendars fail rather than inventing activity', () => {
  assert.throws(() => parseGitHubCalendar('<html>Unavailable</html>'));
  assert.throws(() => parseGitHubCalendar('<table><tr><td class="ContributionCalendar-day" data-date="2026-10-29" data-level="3"></td></tr></table>'));
});

test('calendar weeks align to Sunday and leave future days blank', () => {
  const days = [
    {date:'2026-10-28',count:1,level:1},
    {date:'2026-10-29',count:2,level:2},
  ];
  const weeks = contributionWeeks(days);
  assert.equal(weeks.length, 1);
  assert.deepEqual(weeks[0].map(day => day?.date ?? null), [null,null,null,'2026-10-28','2026-10-29',null,null]);
  assert.deepEqual(contributionWeeks([]), []);
});
