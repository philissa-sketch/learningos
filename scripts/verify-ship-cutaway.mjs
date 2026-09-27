// ---------------------------------------------------------------------------
// verify-ship-cutaway — Sept 27, 2026.
//
// The parent asked for the moving parts to work like the shelter game: the
// whole vehicle open in cross-section, people walking between rooms, crew
// posted to a station, and rooms that visibly improve as their subject fills.
//
// This guard holds the LAYOUT and the WALK, which are the parts a picture
// cannot check on its own:
//
//   1. every station has exactly one room, and no two rooms overlap
//   2. a row of rooms fills its deck exactly — no gap, no overrun
//   3. anybody standing in a room is standing on that room's floor
//   4. crossing decks goes through the lift; staying on one does not
//   5. a room's tier is read from the hull's percentage, with no stored level
//      and no flattering minimum
// ---------------------------------------------------------------------------
import './lib/academy-under-test.mjs';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const load = (rel) => import(pathToFileURL(path.join(REPO, rel)).href);
const read = (rel) => fs.readFileSync(path.join(REPO, rel), 'utf8');

let passed = 0;
const failures = [];
const ok = (label, cond, detail = '') => {
  if (cond) { passed += 1; console.log('PASS  ' + label); }
  else { failures.push(label); console.log('FAIL  ' + label + (detail ? `  ${detail}` : '')); }
};

const C = await load('src/lib/shipCutaway.js');
const I = await load('src/lib/shipInterior.js');

console.log('\n--- 1-2. every station has a room, and the rows fit ---');
{
  const stations = I.STATIONS.filter((s) => s.reads !== 'deck-change');
  const missing = stations.filter((s) => !C.cellFor(s.id));
  ok('every station has a room in the cutaway', missing.length === 0, missing.map((s) => s.id).join(', '));

  const laid = Object.values(C.CELLS).flat().map((c) => c.id);
  ok('no station is given two rooms', new Set(laid).size === laid.length);
  const strangers = laid.filter((id) => !I.STATIONS.some((s) => s.id === id));
  ok('no room belongs to a station that does not exist', strangers.length === 0, strangers.join(', '));

  for (const deck of C.DECKS) {
    const cells = C.cellsOn(deck.id);
    const overlaps = cells.filter((c, i) => i > 0 && c.x < cells[i - 1].x + cells[i - 1].w - 0.001);
    ok(`${deck.id}: no two rooms overlap`, overlaps.length === 0, overlaps.map((c) => c.id).join(', '));

    const last = cells[cells.length - 1];
    ok(`${deck.id}: the row reaches the lift shaft exactly`,
      Math.abs((last.x + last.w) - C.SHAFT.x) < 0.5,
      `ends at ${Math.round(last.x + last.w)}, shaft at ${C.SHAFT.x}`);
    ok(`${deck.id}: the row starts at the hull`, Math.abs(cells[0].x - C.HULL.x) < 0.5);
    ok(`${deck.id}: every room has real width`, cells.every((c) => c.w > 40));
  }
}

console.log('\n--- 3. standing on the floor ---');
{
  for (const deck of C.DECKS) {
    for (const cell of C.cellsOn(deck.id)) {
      const spot = C.standingSpot(cell.id);
      const inside = spot.x > cell.x && spot.x < cell.x + cell.w && spot.y === deck.floor;
      ok(`${cell.id}: stands inside its own room, on the floor`, inside, JSON.stringify(spot));
    }
  }
  ok('an unknown station has nowhere to stand', C.standingSpot('not-a-room') === null,
    'a missing room must surface as a mistake, not default to the middle of the ship');
  ok('decks do not overlap', C.DECKS.every((d, i) => i === 0 || d.head > C.DECKS[i - 1].floor));
}

console.log('\n--- 4. the lift ---');
{
  const same = C.routeBetween('flight-deck', 300, 'sensor-bank');
  ok('a walk on one deck is a straight walk', same.length === 2, JSON.stringify(same));
  ok('...and never leaves the deck', same.every((p) => p.y === C.DECKS[0].floor));

  const across = C.routeBetween('flight-deck', 300, 'fuel-tanks');
  ok('crossing decks goes through the lift', across.length === 4, JSON.stringify(across));
  ok('...and the middle two points are the shaft',
    Math.abs(across[1].x - (C.SHAFT.x + C.SHAFT.w / 2)) < 0.5
    && Math.abs(across[2].x - (C.SHAFT.x + C.SHAFT.w / 2)) < 0.5);
  ok('...rising or falling only inside the shaft', across[1].y === C.DECKS[0].floor && across[2].y === C.DECKS[1].floor);
  ok('a route to nowhere is empty, not a guess', C.routeBetween('flight-deck', 300, 'not-a-room').length === 0);
}

console.log('\n--- 5. rooms improve with the work, and only with the work ---');
{
  ok('nothing done is bare', C.tierFor(0) === 0);
  ok('anything done shows', C.tierFor(0.01) === 1);
  ok('half is fitted', C.tierFor(0.5) === 2);
  ok('finished is complete', C.tierFor(1) === 3);
  ok('no reading is not tier 1', C.tierFor(null) === 0 && C.tierFor(undefined) === 0,
    'an unread source must not furnish a room');
  ok('the tiers only ever go up with the number',
    [0, 0.2, 0.49, 0.5, 0.99, 1].every((p, i, all) => i === 0 || C.tierFor(p) >= C.tierFor(all[i - 1])));

  const src = read('src/lib/shipCutaway.js');
  ok('no room stores a level', !/level:|upgrade\(|setTier/.test(src),
    'a stored level is a second opinion about his work');
  const view = read('src/components/Rewards/ShipCutaway.jsx');
  ok('the tier is read from the reading, not from a prop', /tierFor\(reading\?\.pct\)/.test(view));
  /**
   * The check reads CODE, not comments. The first version of it failed on the
   * paragraph at the top of the component explaining why there is no
   * tap-to-collect timer — a guard that a comment can trip is a guard that
   * gets silenced by deleting the explanation.
   */
  const viewCode = view.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
  ok('no tap-to-collect timer', !/setInterval|collect|harvest/i.test(viewCode),
    'the shelter game pays for waiting; this one pays for work');
  ok('motion stops for reduced motion', /prefers-reduced-motion/.test(view) && /REDUCED/.test(view));
}

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) { console.log(`\n${failures.length} CHECK(S) FAILED`); process.exit(1); }
console.log('\nALL CHECKS PASSED');
