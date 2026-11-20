import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import {
  categories, checklist, estimate, isStartDate, months, routeSegments, schedule, taipei, totalDays
} from './dist/travel-plan.js';

assert.equal(months.length, 12);
assert.equal(totalDays, 365);
assert.equal(checklist.length, new Set(checklist.map(([id]) => id)).size);
const annual = estimate(months);
assert.equal(annual.total, 1399200);
assert.deepEqual(annual.amounts, [419500, 454500, 233000, 129000, 36000, 127200]);
assert.deepEqual([annual.low, annual.high], [1119360, 1679040]);
assert.equal(months.reduce((sum, month) => sum + estimate([month]).total, 0), annual.total);

for (const month of months) {
  assert.equal(month.cities.reduce((sum, [, days]) => sum + days, month.buffer), month.days);
  assert.ok(month.buffer >= 2);
  assert.ok(month.cities[month.anchor]);
  assert.ok(month.official.length > 0);
  assert.ok(month.official.every(([, url]) => new URL(url).protocol === 'https:'));
  assert.equal(month.budget.length, categories.length);
  assert.ok(month.budget.every(Number.isInteger));
}

for (const date of ['2027-01-01', '2027-11-20', '2028-02-29', '2099-12-31']) {
  assert.equal(isStartDate(date), true, date);
  const plan = schedule(date);
  assert.equal(plan[0].start, date);
  assert.equal((Date.parse(plan.at(-1).end) - Date.parse(date)) / 86400000 + 1, 365);
  for (const [index, month] of plan.entries()) {
    assert.equal((Date.parse(month.end) - Date.parse(month.start)) / 86400000 + 1, month.days);
    if (index > 0) assert.equal(Date.parse(month.start) - Date.parse(plan[index - 1].end), 86400000);
  }
}
for (const invalid of ['', '2027-02-29', '2100-01-01', '2028-13-01', '2028-2-1', null]) {
  assert.equal(isStartDate(invalid), false);
}

const points = [taipei, ...months.flatMap(month => month.cities.map(([, , lat, lon]) => [lat, lon])), taipei];
const segments = routeSegments(points);
assert.equal(segments.length, 2, '南美洲前往大洋洲時需在日界線分段');
assert.deepEqual(segments[0][0], taipei);
assert.deepEqual(segments.at(-1).at(-1), taipei);
assert.equal(segments[0].at(-1)[1], -180);
assert.equal(segments[1][0][1], 180);
for (const segment of segments) {
  for (const [index, [, lon]] of segment.entries()) {
    if (index) assert.ok(Math.abs(lon - segment[index - 1][1]) <= 180);
  }
}
const land = JSON.parse(await readFile('dist/world-land.json', 'utf8'));
assert.equal(land.type, 'MultiPolygon');
assert.ok(land.coordinates.length >= 100);
console.log('通過：365 天連續行程、閏日、預算明細、各月官方連結、離線世界底圖與跨日界線路線。');
