import './lib/academy-under-test.mjs';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

/**
 * =============================================================================
 * THE SHIP'S ROOMS OPEN WITH GROWTH, AND AN OPEN ONE HAS AN INSIDE.
 * =============================================================================
 *
 * WHY THIS EXISTS. (Sept 27, 2026.)
 *
 * The parent looked at the cutaway and said the rooms "look like doors that
 * open up to a room where actions can be done inside", and that they "should
 * open with growth but not the finality of the ship." The first version drew
 * ten finished compartments on day one and never opened any of them.
 *
 * The properties this holds:
 *
 *   1.  shipRoom.js is plain JavaScript a guard can run.
 *   2.  Exactly two rooms stand open before anything is earned, one per deck,
 *       and neither of them reports an achievement.
 *   3.  A school on its first morning seals every other room.
 *   4.  One real piece of work opens the room it belongs to.
 *   5.  A SEALED ROOM SHOWS NOTHING — not even when handed contents.
 *   6.  A hatch does not say the same thing twice.
 *   7.  The ladder is never sealed, because it is a way through.
 *   8.  Sealing is DERIVED. No unlocked-rooms list is stored anywhere.
 *   9.  Nobody walks into a room that is not there yet.
 *   10. A hatch does not name the room behind it.
 *   11. A job whose prerequisite is missing renders no button.
 *   12. Every system a ship draws can answer what is inside its room.
 *   13. The installed list ADDS UP TO THE BAR. Life support is fed by three
 *       activities and meals count a third each; listing every meal made a bay
 *       reading "3 of 150" show five things installed.
 *   14. Every job refuses bad input before it writes.
 *   15. No job invents progress: each one calls an action that existed before
 *       the ship did.
 */

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const load = (rel) => import(pathToFileURL(path.join(REPO, rel)).href);
const read = (rel) => fs.readFileSync(path.join(REPO, rel), 'utf8');

/** Comments are explanation, not behaviour. A guard a comment can trip is a
 *  guard that gets silenced by deleting the explanation. */
const strip = (src) => src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');

let passed = 0;
const failures = [];
const ok = (label, cond, detail = '') => {
  if (cond) { passed += 1; console.log('PASS  ' + label); }
  else { failures.push(label); console.log('FAIL  ' + label + (detail ? `  ${detail}` : '')); }
};

const R = await load('src/lib/shipRoom.js');
const I = await load('src/lib/shipInterior.js');
const C = await load('src/lib/shipCutaway.js');
const S = await load('src/lib/shipSystems.js');

const cutawaySrc = strip(read('src/components/Rewards/ShipCutaway.jsx'));
const cardSrc = strip(read('src/components/Rewards/ShipRoomCard.jsx'));
const storeSrc = strip(read('src/store/useAppStore.js'));

/** A reading shaped like the one a room really gets. */
const reading = (over = {}) => ({ kind: 'system', pct: 0, label: 'x', empty: true, note: 'It is dark. It runs on Something.', ...over });
const station = (id, over = {}) => I.STATIONS.find((s) => s.id === id) || { id, name: id, ...over };

console.log('\n--- 1. the module is executable ---');
ok('shipRoom.js is plain JavaScript a guard can execute', typeof R.roomIsSealed === 'function');
for (const name of ['ALWAYS_OPEN', 'roomIsSealed', 'sealHint', 'openRooms', 'roomInterior', 'installedShelf']) {
  ok(`exports ${name}`, R[name] !== undefined);
}

console.log('\n--- 2. the two rooms that are his before he earns anything ---');
ok('exactly two rooms start open', R.ALWAYS_OPEN.length === 2, `got ${R.ALWAYS_OPEN.length}`);
const alwaysDecks = R.ALWAYS_OPEN.map((id) => C.deckOfCell(id));
ok('one per deck', new Set(alwaysDecks).size === 2, alwaysDecks.join(','));
ok('every always-open room is a real room', R.ALWAYS_OPEN.every((id) => C.cellFor(id)));
ok('no always-open room reports an award or a rank ladder position it has not reached',
  !R.ALWAYS_OPEN.includes('badge-rack'),
  'the rack is the one room whose whole promise is that it holds only what was actually given');

console.log('\n--- 3. a school on its first morning ---');
const dayOne = {};
for (const s of I.STATIONS) dayOne[s.id] = s.reads === 'deck-change' ? { kind: 'ladder', empty: false } : reading();
const openOnDayOne = R.openRooms(I.STATIONS, dayOne);
ok('only the two stand open on day one', openOnDayOne.length === 2, openOnDayOne.join(','));
ok('and they are the declared two', R.ALWAYS_OPEN.every((id) => openOnDayOne.includes(id)));
const roomCount = I.STATIONS.filter((s) => s.reads !== 'deck-change').length;
ok('the sweep found a whole ship, not an empty list', roomCount >= 8, `${roomCount} rooms`);

console.log('\n--- 4. work opens the room it belongs to ---');
const started = { ...dayOne, 'sensor-bank': reading({ empty: false, pct: 0.08, detail: '1 of 12' }) };
ok('one finished piece opens its room', R.openRooms(I.STATIONS, started).includes('sensor-bank'));
ok('and opens nothing else', R.openRooms(I.STATIONS, started).length === 3);

console.log('\n--- 5. a sealed room shows nothing ---');
const contraband = {
  installed: [{ id: 'a', title: 'SHOULD NOT LEAK' }],
  next: { title: 'SHOULD NOT LEAK', view: 'lessons' },
  job: { id: 'j', label: 'SHOULD NOT LEAK', fields: [] }
};
const sealedInterior = R.roomInterior(station('sensor-bank'), reading(), contraband);
ok('a sealed room is marked sealed', sealedInterior.sealed === true);
ok('a sealed room lists nothing', sealedInterior.installed.length === 0);
ok('a sealed room offers no next step', sealedInterior.next === null);
ok('a sealed room offers no job', sealedInterior.job === null);
ok('a sealed room hides its own progress detail', sealedInterior.detail === null);
const openInterior = R.roomInterior(station('sensor-bank'), reading({ empty: false, pct: 0.5, detail: '6 of 12' }), contraband);
ok('an open room does pass its contents through', openInterior.installed.length === 1 && openInterior.next !== null && openInterior.job !== null,
  'the check above must be about sealing, not about roomInterior dropping everything');

console.log('\n--- 6. the hatch does not say it twice ---');
const twice = R.sealHint(station('sensor-bank'), reading({ note: 'Nothing yet — it opens with your first book.' }));
ok('an opener already in the sentence is not repeated', (twice.match(/open/gi) || []).length === 1, twice);
const once = R.sealHint(station('sensor-bank'), reading({ note: 'Sensors are down.' }));
ok('a sentence without one gains one', /open/i.test(once), once);

console.log('\n--- 7. the ladder is a way through, not a room ---');
const ladder = I.STATIONS.find((s) => s.reads === 'deck-change');
ok('there is a ladder', !!ladder);
ok('the ladder is never sealed', R.roomIsSealed(ladder, null) === false);
ok('the ladder has no inside', R.roomInterior(ladder, null, contraband) === null);

console.log('\n--- 8. sealing is derived, never stored ---');
const storedUnlock = /(unlockedRooms|roomUnlocks|openedRooms|shipRoomLevel|roomTier)\s*[:=]/;
ok('the store keeps no unlocked-rooms list', !storedUnlock.test(storeSrc),
  'a stored unlock is a second copy of the truth and will disagree with the work');
ok('the ship files keep no unlocked-rooms list', !storedUnlock.test(strip(read('src/lib/shipRoom.js'))));
ok('sealing reads the same flag the bar reads', strip(read('src/lib/shipRoom.js')).includes('reading.empty'),
  'if sealing grew its own condition the hatch and the bar could disagree');

console.log('\n--- 9. nobody walks into a room that is not there ---');
ok('walkTo checks sealing before it moves anybody', /walkTo[\s\S]{0,700}roomIsSealed/.test(cutawaySrc));
ok('and it still selects the hatch so the panel can explain it', /roomIsSealed\([\s\S]{0,200}setAtId/.test(cutawaySrc));

console.log('\n--- 10. a hatch does not name the room behind it ---');
const hatchBlock = cutawaySrc.slice(cutawaySrc.indexOf('if (sealed)'), cutawaySrc.indexOf('if (sealed)') + 1800);
ok('the sealed branch exists', hatchBlock.startsWith('if (sealed)'));
ok('the hatch draws no station name', !/>\{station\.name\}</.test(hatchBlock), 'a hatch that advertises turns the work into a price');
ok('the hatch draws no bar', !/<Bar/.test(hatchBlock));
ok('the hatch draws no fit-out', !/<Fitout/.test(hatchBlock));
ok('the hatch says it is sealed', /SEALED/.test(hatchBlock));
ok('the hatch is still reachable by keyboard', /onKeyDown/.test(hatchBlock));

console.log('\n--- 11. a blocked job is a sentence, not a dead button ---');
ok("a blocked job renders text", /state === 'blocked'[\s\S]{0,200}<p/.test(cardSrc));
const blockedBlock = cardSrc.slice(cardSrc.indexOf("state === 'blocked'"), cardSrc.indexOf("state === 'blocked'") + 220);
ok('a blocked job renders no button', !/<button/.test(blockedBlock),
  'a control that cannot work but looks like it should is how a child concludes they did something wrong');
ok('a sealed room in the card shows one sentence and no list', /function Sealed[\s\S]{0,700}sealHint/.test(cardSrc));
ok('the card never names a screen itself', !/onOpenView\(['"]/.test(cardSrc),
  'the destination must arrive inside next, as data');

console.log('\n--- 12. every system can say what is inside its room ---');
await import(pathToFileURL(path.join(REPO, 'node_modules/fake-indexeddb/auto/index.mjs')).href);
const { useAppStore } = await load('src/store/useAppStore.js');
const store = useAppStore.getState();
ok('the store answers what is in a room', typeof store.getShipRoomSupply === 'function');
ok('the store can run a station job', typeof store.runStationJob === 'function');
for (const sys of S.SHIP_SYSTEMS) {
  const supply = store.getShipRoomSupply(sys.id);
  ok(`${sys.id} answers`, supply !== null && Array.isArray(supply.installed), JSON.stringify(supply));
}
for (const roomId of ['pilot-seat', 'badge-rack']) {
  const supply = store.getShipRoomSupply(roomId);
  ok(`${roomId} answers by room id`, supply !== null && Array.isArray(supply.installed));
}
ok('an unknown room gets null rather than an empty pretence', store.getShipRoomSupply('not-a-room') === null);

console.log('\n--- 13. the installed list adds up to the bar ---');
useAppStore.setState({
  peMeals: [1, 2, 3, 4, 5].map((n) => ({ id: n, date: '2026-09-2' + n, description: 'meal ' + n, proteinG: 10 })),
  peWorkoutLog: [{ id: 1, date: '2026-09-25', category: 'Upper body' }],
  gardenLog: [{ id: 1, date: '2026-09-24', kind: 'session', title: 'Watered' }]
});
const filled = useAppStore.getState();
const lifeSupply = filled.getShipRoomSupply('life-support');
const lifeBar = S.getShipStatus(filled.getGamificationStats()).systems.find((x) => x.id === 'life-support');
ok('life support lists exactly what its bar counts', lifeSupply.installed.length === lifeBar.current,
  `list ${lifeSupply.installed.length} vs bar ${lifeBar.current} — five meals is one unit and two thirds, not five things installed`);
ok('a part-finished bundle stays off the shelf', lifeBar.current === 3, `bar said ${lifeBar.current}`);

console.log('\n--- 14. a job refuses bad input before it writes ---');
const refusals = [
  ['propulsion', {}],
  ['onboard', { lessonId: 'x', text: '   ' }],
  ['comms', { promptId: 'p', text: 'too short' }],
  ['sensors', { units: 3 }],
  ['sensors', { bookId: 4242, units: 3 }],
  ['life-support', { proteinG: 20 }],
  ['not-a-station', {}]
];
for (const [id, payload] of refusals) {
  const out = await filled.runStationJob(id, payload);
  ok(`${id} refuses ${JSON.stringify(payload)}`, out && out.ok === false && !!out.message, JSON.stringify(out));
}

console.log('\n--- 15. no job invents progress ---');
const jobBlock = storeSrc.slice(storeSrc.indexOf('async runStationJob'), storeSrc.indexOf('async runStationJob') + 2600);
ok('runStationJob exists in the store', jobBlock.startsWith('async runStationJob'));
ok('it sets no state of its own', !/set\(\{/.test(jobBlock) && !/set\(\(/.test(jobBlock),
  'a job must move an existing ledger, never a counter the ship keeps for itself');
for (const action of ['markKhanDailySubject', 'recordSelfExplanation', 'submitWritingEntry', 'recordBookProgress', 'addPEMeal', 'recordGuitarLogEntry']) {
  ok(`it goes through ${action}`, jobBlock.includes(action));
}
ok('every job reports back rather than failing silently', (jobBlock.match(/ok:\s*(true|false)/g) || []).length >= 8);

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) { console.log(`\n${failures.length} CHECK(S) FAILED`); process.exit(1); }
console.log('\nALL CHECKS PASSED');
