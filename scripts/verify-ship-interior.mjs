// ---------------------------------------------------------------------------
// verify-ship-interior — Sept 27, 2026.
//
// The parent: "there is a flat rocket ship. I prefer for that to be a place
// that can be entered." The hull on the My Ship screen became two decks he can
// stand on. This holds the properties that keep the inside honest:
//
//   1. every system drawn on the hull has exactly one station inside it
//   2. no station invents a second definition of how full a system is
//   3. a station has exactly one source of truth — a hull system OR a record
//   4. nothing came back != nothing was done: an unread source is null, and a
//      real zero is an empty state with a sentence, never a part-full drawing
//   5. both decks have a ladder, and the ladder round-trips
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

const I = await load('src/lib/shipInterior.js');
const { SHIP_SYSTEMS, getShipStatus } = await load('src/lib/shipSystems.js');

console.log('\n--- 1. the inside mirrors the hull ---');
{
  const inside = I.systemsInside();
  const hull = SHIP_SYSTEMS.map((s) => s.id);
  const missing = hull.filter((id) => !inside.includes(id));
  const strangers = inside.filter((id) => !hull.includes(id));
  ok('every hull system has a station inside', missing.length === 0, missing.join(', '));
  ok('no station mirrors a system the hull does not have', strangers.length === 0, strangers.join(', '));
  const dupes = inside.filter((id, i) => inside.indexOf(id) !== i);
  ok('no system is represented twice', dupes.length === 0, dupes.join(', '));
}

console.log('\n--- 2-3. one source of truth per station ---');
{
  for (const s of I.STATIONS) {
    const both = Boolean(s.system) && Boolean(s.reads);
    const neither = !s.system && !s.reads;
    ok(`${s.id} names exactly one source`, !both && !neither,
      both ? 'has a system AND a record' : 'has neither — decoration posing as a record');
  }
  const ids = I.STATIONS.map((s) => s.id);
  ok('station ids are unique', new Set(ids).size === ids.length);
  const deckIds = I.DECKS.map((d) => d.id);
  ok('every station is on a real deck', I.STATIONS.every((s) => deckIds.includes(s.deck)));
  ok('every station is inside the floor', I.STATIONS.every((s) => s.u >= 0 && s.u <= 1 && s.v >= 0 && s.v <= 1));
  ok('no station re-declares a target or a count',
    I.STATIONS.every((s) => s.target === undefined && s.current === undefined && s.pct === undefined),
    'the hull owns those numbers — a copy here is how the two views drift apart');
}

console.log('\n--- 4. nothing came back is not nothing was done ---');
{
  const zeroStats = {};
  const status = getShipStatus(zeroStats);
  const tanks = I.STATIONS.find((s) => s.id === 'fuel-tanks');

  const unread = I.stationReading(tanks, {});
  ok('no hull status at all -> pct is null, not 0', unread.pct === null && unread.empty === true, JSON.stringify(unread));

  const real = I.stationReading(tanks, { shipStatus: status });
  ok('a measured zero -> empty state with a sentence', real.empty === true && typeof real.note === 'string' && real.note.length > 10,
    JSON.stringify(real));
  ok('...and it names the subject behind it', /Science|Aerospace/i.test(real.note || ''));

  const worked = getShipStatus({ masteredPropulsion: 35 });
  const half = I.stationReading(tanks, { shipStatus: worked });
  const hullPct = worked.systems.find((s) => s.id === 'propulsion').pct;
  ok('a station reports the hull number, not its own', half.pct === hullPct, `${half.pct} vs ${hullPct}`);
  ok('...and is no longer empty', half.empty === false);

  /**
   * A BARELY-STARTED SYSTEM MUST LOOK BARELY STARTED.
   *
   * The first draft of this check only compared a half-built tank, and a
   * mutation that floored every reading at 15% passed it — the floor was
   * invisible at 50%. A "minimum visible fill" is the flattering lie this
   * whole file exists to refuse: it would draw three mastered lessons as a
   * tank with a quarter of an inch in it.
   */
  const barely = getShipStatus({ masteredPropulsion: 3 });
  const trickle = I.stationReading(tanks, { shipStatus: barely });
  const barelyPct = barely.systems.find((s) => s.id === 'propulsion').pct;
  ok('a barely-started system is drawn as barely started',
    trickle.pct === barelyPct && trickle.pct < 0.1,
    `${trickle.pct} vs ${barelyPct} — no floor, no flattering minimum`);

  const viewport = I.STATIONS.find((s) => s.id === 'viewport');
  const noJourney = I.stationReading(viewport, {});
  ok('an unflown journey shows the empty state', noJourney.empty === true && Boolean(noJourney.note));
  const flying = I.stationReading(viewport, { journey: { next: { name: 'The Moon' }, progress: 0.4 } });
  ok('a real destination is named', flying.label === 'The Moon' && flying.pct === 0.4, JSON.stringify(flying));
  ok('the viewport reads the journey\'s own progress, never its own arithmetic',
    I.stationReading(viewport, { journey: { next: { name: 'Mars' } } }).pct === null,
    'no progress in the record means no bar drawn');

  const rack = I.STATIONS.find((s) => s.id === 'badge-rack');
  ok('an empty rack says so', I.stationReading(rack, { awards: [] }).empty === true);
  ok('a full rack counts what is really there',
    I.stationReading(rack, { awards: [1, 2, 3] }).detail === '3 earned');
}

console.log('\n--- 5. the ladder ---');
{
  for (const deck of I.DECKS) {
    const ladders = I.stationsOn(deck.id).filter((s) => s.reads === 'deck-change');
    ok(`${deck.id} has exactly one ladder`, ladders.length === 1, String(ladders.length));
  }
  ok('the ladder round-trips', I.otherDeck(I.otherDeck('flight-deck')) === 'flight-deck');
  ok('the home deck is the flight deck', I.HOME_DECK === 'flight-deck');
  for (const deck of I.DECKS) {
    const spot = I.arrivalOn(deck.id);
    const ladder = I.stationsOn(deck.id).find((s) => s.reads === 'deck-change');
    /**
     * WITHIN A STEP OF THE LADDER, AND ON THE FLOOR.
     *
     * This asserted the arrival's depth EXACTLY matched the ladder's until
     * Sept 27, when a rendered frame showed him landing on top of the Comms
     * Station's label — the ladder shares a depth with a console. He now
     * arrives beside it and a step forward. The property worth holding is
     * "he appears next to the thing he climbed", not one specific number.
     */
    /**
     * AND NOT INSIDE ANOTHER STATION. Two frames in a row put him on top of a
     * console's label; this is that fault as a property.
     */
    const clash = I.stationsOn(deck.id)
      .filter((s) => s.reads !== 'deck-change')
      .find((s) => Math.abs(s.u - spot.u) < I.ARRIVAL_CLEARANCE.u && Math.abs(s.v - spot.v) < I.ARRIVAL_CLEARANCE.v);
    ok(`he does not arrive standing inside a station on ${deck.id}`, !clash, clash ? clash.id : '');
    ok(`...and the clearance rule agrees`, I.spotIsClear(deck.id, spot) === true);

    ok(`he arrives beside ${deck.id}'s ladder, not in mid-air`,
      // Within about a third of the floor of the ladder, in both directions:
      // near enough to read as "he climbed down here", loose enough that the
      // search can step around a crowded corner.
      Math.abs(spot.v - ladder.v) <= 0.45 && Math.abs(spot.u - ladder.u) <= 0.3
      && spot.u >= 0 && spot.u <= 1 && spot.v >= 0 && spot.v <= 1,
      JSON.stringify(spot));
  }
  ok('an unknown deck still returns a standing spot', Boolean(I.arrivalOn('nowhere')));
  ok('deckOf refuses to guess', I.deckOf('not-a-station') === null);
}


console.log('\n--- 6. the two doors ---');
{
  const hq = read('src/components/Rewards/HQRoom.jsx');
  const host = read('src/components/Rewards/InventorySection.jsx');
  const ship = read('src/components/Rewards/ShipCutaway.jsx');
  ok('the HQ has a way aboard', /Board the ship/.test(hq) && /onBoard/.test(hq));
  ok('...and it is not gated on owning furniture',
    !/ownedHq > 0 && onBoard|onBoard && ownedHq/.test(hq),
    'the vehicle exists from day one, half-built — that is the point of it');
  ok('the ship has a way out', /onLeave/.test(ship) && /Step outside/.test(ship));
  ok('one host renders either room, never both', /aboard\s*\?/.test(host) && /<HQRoom onBoard=/.test(host));
  ok('the interior itself never touches the store',
    !/useAppStore/.test(ship),
    'a room a guard cannot run in plain Node is a room nothing can check');
}


console.log('\n--- 7. the next step, and the finished ship ---');
{
  const tanks = I.STATIONS.find((s) => s.id === 'fuel-tanks');
  const part = getShipStatus({ masteredPropulsion: 14 });
  const r = I.stationReading(tanks, { shipStatus: part });
  ok('an unfinished system says what would finish it', /\b56\b/.test(r.nextStep) && /comes? online/i.test(r.nextStep), r.nextStep);
  ok('...and the number is the hull\'s, not a second count',
    Number(/\d+/.exec(r.nextStep)[0]) === part.systems.find((x) => x.id === 'propulsion').target - 14);

  const doneOne = getShipStatus({ masteredPropulsion: 999 });
  const finished = I.stationReading(tanks, { shipStatus: doneOne });
  ok('a finished system stops asking for anything', /flight-ready/i.test(finished.nextStep) && finished.built === true, finished.nextStep);
  ok('...and is never reported as empty', finished.empty === false);

  ok('readiness is asked of the hull', I.shipIsFlightReady(doneOne) === false, 'one system built is not a finished ship');
  /**
   * Life support is COMPUTED from workouts, garden sessions and meals — there
   * is no `lifeSupport` counter to hand it. Passing one and expecting a
   * finished ship is the mistake this check nearly shipped with: the hull
   * ignored it, the ship was not ready, and the check was wrong rather than
   * the code.
   */
  const all = getShipStatus({
    masteredPropulsion: 999, khanMathUnitsCompleted: 999, writingEntries: 999,
    booksCompleted: 999, masteredOnboard: 999, guitarSessions: 999,
    workoutsLogged: 999, gardenSessions: 999, mealsLogged: 999
  });
  ok('every system built IS a finished ship', I.shipIsFlightReady(all) === true);
  ok('...and the deck says so', /can go anywhere/i.test(I.readinessLine(all)));
  ok('no hull status is null, never false', I.shipIsFlightReady(null) === null,
    'nothing came back must not read as "not ready"');
  ok('a half-built ship counts what is built', /\b0 of 7\b/.test(I.readinessLine(part)), I.readinessLine(part));

  const deck = read('src/components/Rewards/ShipCutaway.jsx');
  /**
   * In the cutaway a finished ship is drawn per ROOM — every room reaches its
   * complete tier and lights up — rather than as one glow over a single deck.
   * The property is the same: finished has to be visible, not merely stated.
   */
  ok('the finished state is drawn, not just written',
    /flightReady/.test(deck) && /tier >= 3/.test(deck),
    'a finished ship that only says so in a sentence is a scoreboard, not a room');
}

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) { console.log(`\n${failures.length} CHECK(S) FAILED`); process.exit(1); }
console.log('\nALL CHECKS PASSED');
