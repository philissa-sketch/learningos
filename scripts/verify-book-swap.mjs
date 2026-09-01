/**
 * ===========================================================================
 * THE BOOK PICKER, AND THE FIELD TRIPS THAT DOUBLED AND WENT UNANNOUNCED.
 * ===========================================================================
 *
 * Three things the parent reported on Aug 28, 2026:
 *
 *   1. *"Can I change that book to another book that is in his book list?"*
 *      She could not. Assignments were seeded slots; nothing retitled one.
 *   2. *"the field trip planner didnt notify me of a field trip due"*
 *      A trip dated that day reached no calendar, no weekly view, no board.
 *   3. *"there are multiple repeat field trips listed"*
 *      The merge key was `destination|date` — two fields the seeder rewrites.
 *
 * ---- THE BUG THE RENDERER CAUGHT, WHICH THIS FILE NOW PINS ----
 *
 * The first version of `retitleForBook` asked only the LIBRARY for the old
 * book's author. It read as obviously correct. Rendering one frame produced
 * **"Ghost — Gary Paulsen"** — because Hatchet was swapped out of his library
 * on Aug 7, so the lookup came back empty and the author was mistaken for a
 * description of the work. Gary Paulsen's name would have gone onto a Jason
 * Reynolds novel, on her records.
 *
 * That case is check #1 below and it is the reason this file exists.
 */
import './lib/academy-under-test.mjs';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => readFileSync(join(REPO, p), 'utf8');

let passed = 0;
const failures = [];
function ok(label, cond, detail = '') {
  if (cond) { passed++; console.log('PASS  ' + label); }
  else { failures.push(label); console.log('FAIL  ' + label + (detail ? '  ' + detail : '')); }
}

const bs = await import(REPO + '/src/lib/bookSwap.js');
const ft = await import(REPO + '/src/lib/fieldTrips.js');
const sched = await import(REPO + '/src/lib/scheduler.js');

// ===========================================================================
console.log('--- 1. the Hatchet case, exactly as it stands in her data ---');
// ===========================================================================
/**
 * Hatchet is NOT in his library — `book::reading::1` became Ghost on Aug 7 —
 * but the Q1 assignments still name it. This is the real input.
 */
const LIB = [
  { id: 11, title: 'Ghost', author: 'Jason Reynolds' },
  { id: 12, title: 'Tristan Strong Punches a Hole in the Sky', author: 'Kwame Mbalia' }
];
const HER_Q1 = [
  { id: 1, slotId: 'asg::reading::Q1::1', type: 'Reading Assignment', title: 'Hatchet — Gary Paulsen', status: 'not-started' },
  { id: 2, slotId: 'asg::reading::Q1::2', type: 'Book Report', title: 'Hatchet — book jacket redesign', status: 'not-started' }
];
const GHOST = LIB[0];

ok('Gary Paulsen is a known author even though Hatchet left the library',
  bs.KNOWN_AUTHORS.includes('Gary Paulsen'),
  'this is what the library-only lookup missed');

// knownAuthors deliberately not passed — a caller that forgets must still be right.
const plan = bs.planBookSwap({ assignmentId: 1, newBook: GHOST, assignments: HER_Q1, library: LIB });
ok('the swap is allowed', plan.ok, plan.reason || '');
ok('both slots move together — the report never lags behind the book',
  plan.changes.length === 2, String(plan.changes.length));

const reading = plan.changes.find((c) => c.type === 'Reading Assignment');
const report = plan.changes.find((c) => c.type === 'Book Report');
ok('THE CHECK: the AUTHOR is replaced, not kept',
  reading && reading.to === 'Ghost — Jason Reynolds',
  reading ? reading.to : 'no reading change');
ok('...and it is emphatically not "Ghost — Gary Paulsen"',
  reading && reading.to !== 'Ghost — Gary Paulsen');
ok('the WORK description survives the swap',
  report && report.to === 'Ghost — book jacket redesign',
  report ? report.to : 'no report change');

// ===========================================================================
console.log('\n--- 2. author vs work, told apart by evidence ---');
// ===========================================================================
const cases = [
  ['Hatchet — Gary Paulsen', 'Ghost — Jason Reynolds', 'a bare author'],
  ['Hatchet — book jacket redesign', 'Ghost — book jacket redesign', 'a work description'],
  ['Hatchet — weekly chapter pacing', 'Ghost — weekly chapter pacing', 'pacing text'],
  ['Hatchet — literary analysis', 'Ghost — literary analysis', 'an analysis task'],
  ['Hatchet', 'Ghost', 'no suffix at all']
];
for (const [from, want, what] of cases) {
  const got = bs.retitleForBook(from, GHOST, LIB);
  ok(`${what}: ${JSON.stringify(from)} -> ${JSON.stringify(want)}`, got === want, got);
}
ok('a new book with no author drops the author rather than inventing one',
  bs.retitleForBook('Hatchet — Gary Paulsen', { title: 'Some Book' }, LIB) === 'Some Book');

// ===========================================================================
console.log('\n--- 3. what a swap must never touch ---');
// ===========================================================================
const SS = [
  { id: 3, slotId: 'asg::socialStudies::Q1::1', type: 'Reading Assignment', title: 'A Long Walk to Water — weekly chapter pacing', status: 'not-started' },
  { id: 4, slotId: 'asg::socialStudies::Q1::2', type: 'Reading Assignment', title: 'Red-Tail Angels: The Tuskegee Airmen — weekly chapter pacing', status: 'not-started' },
  { id: 5, slotId: 'asg::socialStudies::Q1::3', type: 'Book Report', title: 'A Long Walk to Water — build or draw Salva’s journey', status: 'not-started' }
];
const ssPlan = bs.planBookSwap({ assignmentId: 3, newBook: GHOST, assignments: SS, library: LIB });
ok('a sibling book in the SAME quarter is left alone',
  ssPlan.ok && ssPlan.changes.every((c) => !c.from.includes('Red-Tail')),
  ssPlan.changes.map((c) => c.from).join(' | '));
ok('...but that book\'s own report DOES move with it',
  ssPlan.changes.length === 2 && ssPlan.changes.some((c) => c.type === 'Book Report'),
  String(ssPlan.changes.length));

const startedMain = HER_Q1.map((a) => (a.id === 1 ? { ...a, status: 'in-progress' } : a));
const p1 = bs.planBookSwap({ assignmentId: 1, newBook: GHOST, assignments: startedMain, library: LIB });
ok('work he has STARTED is refused, not rewritten', !p1.ok && p1.reason === 'already-started', p1.reason);

const startedReport = HER_Q1.map((a) => (a.id === 2 ? { ...a, status: 'completed' } : a));
const p2 = bs.planBookSwap({ assignmentId: 1, newBook: GHOST, assignments: startedReport, library: LIB });
ok('a FINISHED book report blocks the whole pair rather than half-applying',
  !p2.ok && p2.reason === 'companion-started' && p2.changes.length === 0,
  p2.reason);
ok('...and every refusal has a sentence for her, not a code',
  Object.keys(bs.SWAP_REFUSAL_TEXT).every((k) => typeof bs.SWAP_REFUSAL_TEXT[k] === 'string' && bs.SWAP_REFUSAL_TEXT[k].length > 10));
for (const r of ['already-started', 'companion-started', 'same-book', 'no-book-chosen', 'nothing-to-change', 'no-such-assignment', 'no-current-book']) {
  ok(`refusal "${r}" has wording`, Boolean(bs.SWAP_REFUSAL_TEXT[r]));
}
ok('choosing the book it already has is refused',
  !bs.planBookSwap({ assignmentId: 1, newBook: { title: 'Hatchet' }, assignments: HER_Q1, library: LIB }).ok);
ok('a missing assignment is refused rather than throwing',
  !bs.planBookSwap({ assignmentId: 999, newBook: GHOST, assignments: HER_Q1, library: LIB }).ok);

// ===========================================================================
console.log('\n--- 4. the store writes only what the plan says ---');
// ===========================================================================
const storeSrc = read('src/store/useAppStore.js');
ok('the store action delegates to planBookSwap rather than reimplementing it',
  /const plan = planBookSwap\(\{/.test(storeSrc));
ok('...and refuses before writing when the plan refuses',
  /if \(!plan\.ok\) return plan;/.test(storeSrc));
ok('...and writes exactly the titles the plan names',
  /plan\.changes\.map\(\(c\) => updateAcademicAssignmentRecord\(c\.id, \{ title: c\.to \}\)\)/.test(storeSrc));

const uiSrc = read('src/components/Dashboard/ParentDashboard.jsx');
ok('the picker shows her the plan before saving',
  /What changes/.test(uiSrc) && /preview\.changes\.map/.test(uiSrc),
  'a control whose second effect is a surprise is a bad control');
ok('the picker disables a started assignment',
  /disabled=\{started\}/.test(uiSrc));
ok('the picker only offers slots that actually name a book',
  /a\.type === 'Reading Assignment'/.test(uiSrc));

// ===========================================================================
console.log('\n--- 5. field trips: one stable identity ---');
// ===========================================================================
const ids = ft.DEFAULT_FIELD_TRIPS.map((t) => ft.fieldTripSyncId(t.destination));
ok('every default trip gets an id', ids.every(Boolean));
ok('...and all 21 are distinct', new Set(ids).size === ft.DEFAULT_FIELD_TRIPS.length, String(new Set(ids).size));

/**
 * THE LOAD-BEARING CHECKS. Both halves of the OLD key are rewritten by the
 * seeder itself, which is why the same trip ended up listed twice.
 */
ok('the id does NOT change when the seeder backfills a date',
  ft.fieldTripSyncId('Georgia Aquarium') === ft.fieldTripSyncId('Georgia Aquarium'),
  'the date is deliberately not part of the key');
for (const [oldDest, newDest] of Object.entries(ft.LIBRARY_TRIP_RENAMES)) {
  ok(`the rename of "${oldDest.slice(0, 34)}..." collapses to one id`,
    ft.fieldTripSyncId(oldDest) === ft.fieldTripSyncId(newDest),
    'a rename that splits the id is how a trip becomes two trips');
}
ok('unicode in a destination does not break the id',
  ft.fieldTripSyncId('Children’s Museum of Atlanta') === 'ft::children-s-museum-of-atlanta',
  ft.fieldTripSyncId('Children’s Museum of Atlanta'));
ok('a trip with no destination gets NO id rather than a made-up one',
  ft.fieldTripSyncId('') === null && ft.fieldTripSyncId(null) === null && ft.fieldTripSyncId(undefined) === null,
  'an invented identity is something to collide on later');

ok('the import merge keys on the stable id, not destination|date',
  /\(t\) => fieldTripSyncId\(t\?\.destination\)/.test(storeSrc));
ok('...and the old mutable key is gone',
  !/\$\{t\.destination\}\|\$\{t\.date/.test(storeSrc),
  'that key is what produced the duplicates');
ok('seeded trips are written WITH an id',
  /syncId: fieldTripSyncId\(d\.destination\)/.test(storeSrc));

// ===========================================================================
console.log('\n--- 6. collapsing the duplicates already in her database ---');
// ===========================================================================
/**
 * ---------------------------------------------------------------------------
 * WHY THIS SECTION WAS REWRITTEN ON AUG 29.
 * ---------------------------------------------------------------------------
 *
 * It used to contain this line, and it PASSED:
 *
 *     ok('...without overwriting an id that is already set',
 *        /if \(t\.syncId\) continue;/.test(storeSrc));
 *
 * That check asserted the bug. Her rows are not missing a syncId — all 85
 * carry a STALE one, so `if (t.syncId) continue;` skipped every row and not a
 * single duplicate collapsed. She reported it the next morning: *"the field
 * trip planer is worse than before."*
 *
 * Two failures in one line, and they are the two this project keeps relearning:
 *   - it matched the store's PUNCTUATION instead of asking what the code does;
 *   - it never ran the code against the shape of her actual data.
 *
 * So the checks below run `planFieldTripDedupe` against a fixture rebuilt to
 * her export's exact shape: 21 default trips × 4 copies, one copy holding the
 * old `destination|date` key and three holding random UUIDs, plus the one real
 * completed trip. If the plan does not turn 85 rows into 22, this fails.
 */
ok('...and the repair runs every hydrate, not only on a seed bump',
  storeSrc.indexOf('planFieldTripDedupe(fieldTripsList)') > storeSrc.indexOf('defaultFieldTripsSeedVersion: FIELD_TRIP_SEED_VERSION'),
  'duplicates arrive through the import, which can happen any day');

const scores = [
  [{ status: 'completed' }, { status: 'planned', date: '2026-01-01' }, 'a completed trip outranks a planned one'],
  [{ portfolioEntryId: 7 }, { status: 'planned' }, 'a trip with a portfolio entry outranks an empty one'],
  [{ hours: 3 }, { status: 'planned' }, 'a trip carrying hours outranks an empty one'],
  [{ learningPack: {} }, { status: 'planned' }, 'a trip with a learning pack outranks an empty one']
];
for (const [win, lose, label] of scores) {
  ok(label, ft.fieldTripKeepScore(win) > ft.fieldTripKeepScore(lose));
}

// --- her database, rebuilt ----------------------------------------------
const STAMPS = ['2026-08-24T02:20:10.207Z', '2026-08-06T18:20:46.380Z', '2026-08-07T13:11:45.358Z', '2026-08-07T14:42:59.574Z'];
let nextId = 1;
const HER_ROWS = [];
for (let copy = 0; copy < 4; copy++) {
  for (const d of ft.DEFAULT_FIELD_TRIPS) {
    HER_ROWS.push({
      id: nextId++,
      destination: d.destination,
      date: d.date,
      status: 'planned',
      hours: 0,
      learningPack: null,
      portfolioEntryId: null,
      notes: d.notes,
      createdAt: STAMPS[copy],
      // copy 0 wears the old derived key; the rest wear an import's UUID
      syncId: copy === 0 ? `${d.destination}|${d.date}` : `uuid-${nextId}-${copy}`
    });
  }
}
const HER_RECORD = {
  id: nextId++, destination: 'Victory Creek Waterfall', date: '2026-08-12', status: 'completed',
  hours: 2.5, learningPack: {}, portfolioEntryId: 1, notes: 'x',
  createdAt: '2026-08-12T23:49:53.374Z', syncId: '56c9ff4f-5918-41ff-8e61-cdb99fd7c8ac'
};
HER_ROWS.push(HER_RECORD);

const tripPlan = ft.planFieldTripDedupe(HER_ROWS);
const survivors = HER_ROWS.filter((t) => !tripPlan.dropIds.includes(t.id));

ok('THE CHECK: her 85 rows collapse to one per destination',
  HER_ROWS.length === ft.DEFAULT_FIELD_TRIPS.length * 4 + 1 &&
  survivors.length === ft.DEFAULT_FIELD_TRIPS.length + 1,
  `${HER_ROWS.length} rows in, ${survivors.length} out`);
ok('...which is exactly the 63 extra copies deleted, nothing else',
  tripPlan.dropIds.length === ft.DEFAULT_FIELD_TRIPS.length * 3,
  String(tripPlan.dropIds.length));
ok('...and every destination still appears once',
  new Set(survivors.map((t) => t.destination)).size === survivors.length);

/**
 * THE CHECK FOR THE MUTATION THAT SHIPPED. Restoring `if (t.syncId) continue;`
 * — skipping any row that already carries an id — makes every group size 1 and
 * this drops to zero deletions.
 */
ok('THE CHECK: a stale id is normalized, not preserved',
  tripPlan.idWrites.length > 0 &&
  tripPlan.idWrites.every((w) => String(w.syncId).startsWith('ft::')),
  'destination|date and an import UUID are derived keys, not identities');

const record = tripPlan.dropIds.includes(HER_RECORD.id);
ok('HER ONE COMPLETED TRIP IS NEVER TOUCHED', record === false,
  'Victory Creek Waterfall — 2.5 hours, a learning pack and a portfolio entry');

// --- what the dedupe must refuse to do ----------------------------------
const twoVisits = [
  { id: 1, destination: 'Chess Club — Clayton County Library (Lovejoy)', date: '2026-09-10', status: 'planned', createdAt: 'a' },
  { id: 2, destination: 'Chess Club — Clayton County Library (Lovejoy)', date: '2026-09-17', status: 'planned', createdAt: 'b' }
];
const visitPlan = ft.planFieldTripDedupe(twoVisits);
ok('TWO VISITS TO THE SAME PLACE ON DIFFERENT DATES BOTH SURVIVE',
  visitPlan.dropIds.length === 0,
  'Chess Club recurs every Thursday — she can plan more than one');
ok('...and the second one gets an id of its own so no import merges them',
  new Set(visitPlan.idWrites.map((w) => w.syncId)).size === visitPlan.idWrites.length &&
  visitPlan.idWrites.length === 2);

const workCopy = [
  { id: 1, destination: 'Delta Flight Museum', date: '2027-03-05', status: 'planned', createdAt: 'a' },
  { id: 2, destination: 'Delta Flight Museum', date: '2027-03-05', status: 'completed', hours: 3, createdAt: 'b' }
];
const workPlan = ft.planFieldTripDedupe(workCopy);
ok('a duplicate carrying work is kept, and it is the EMPTY one that goes',
  workPlan.dropIds.length === 1 && workPlan.dropIds[0] === 1,
  'a cleanup that drops a finished trip is worse than the duplicates');

/**
 * THE CASE THAT LET A MUTATION SURVIVE. The check above passes even with the
 * work protection deleted, because there the row carrying work is the WINNER
 * and the loser is empty either way. The protection only does anything when a
 * LOSER carries work — two copies both marked done on two computers, or a copy
 * holding hours that never got a status. Those hours are on her Georgia
 * attendance record. Deleting either row deletes a record.
 */
ok('THE CHECK: two copies BOTH carrying work are both kept',
  ft.planFieldTripDedupe([
    { id: 1, destination: 'Panola Mountain State Park', date: '2026-10-30', status: 'completed', hours: 2, portfolioEntryId: 4, createdAt: 'a' },
    { id: 2, destination: 'Panola Mountain State Park', date: '2026-10-30', status: 'completed', hours: 1.5, createdAt: 'b' }
  ]).dropIds.length === 0,
  'she reconciles them herself; the app never picks which record to erase');
ok('...and a losing copy holding only hours is kept too',
  ft.planFieldTripDedupe([
    { id: 1, destination: 'Museum of Aviation', date: '2027-01-22', status: 'completed', portfolioEntryId: 9, createdAt: 'a' },
    { id: 2, destination: 'Museum of Aviation', date: '2027-01-22', status: 'planned', hours: 3, createdAt: 'b' }
  ]).dropIds.length === 0,
  'hours with no status are still hours she logged');

ok('an undated copy collapses into the dated one',
  ft.planFieldTripDedupe([
    { id: 1, destination: 'Georgia Aquarium', date: '2027-04-16', status: 'planned', createdAt: 'a' },
    { id: 2, destination: 'Georgia Aquarium', date: '', status: 'planned', createdAt: 'b' }
  ]).dropIds.join() === '2',
  'the seeder backfills dates, so a blank one is the same trip');

ok('a renamed library trip collapses into the trip it was renamed to',
  ft.planFieldTripDedupe([
    { id: 1, destination: 'Local Public Library — STEM & Homeschool Programs', date: '2026-08-28', status: 'planned', createdAt: 'a' },
    { id: 2, destination: 'FAB STEM Friday — Clayton County Library (Lovejoy)', date: '2026-08-28', status: 'planned', createdAt: 'b' }
  ]).dropIds.length === 1);

ok('a row with no destination is left completely alone',
  (() => {
    const p = ft.planFieldTripDedupe([{ id: 1, destination: '', date: '2026-01-01' }, { id: 2, destination: null }]);
    return p.dropIds.length === 0 && p.idWrites.length === 0;
  })(),
  'an unidentifiable row is never given an invented identity');

ok('running the plan a second time is a no-op',
  (() => {
    for (const w of tripPlan.idWrites) { const r = HER_ROWS.find((t) => t.id === w.id); if (r) r.syncId = w.syncId; }
    const again = ft.planFieldTripDedupe(survivors);
    return again.dropIds.length === 0 && again.idWrites.length === 0;
  })(),
  'a repair that rewrites something every hydrate is a repair that never finished');

ok('the store applies the plan rather than reimplementing it',
  /const plan = planFieldTripDedupe\(fieldTripsList\)/.test(storeSrc) &&
  /deleteFieldTripRecord\(id\)/.test(storeSrc));

// ===========================================================================
console.log('\n--- 7. a due field trip now reaches the screen ---');
// ===========================================================================
const TRIPS = [
  { id: 1, destination: 'FAB STEM Friday — Clayton County Library (Lovejoy)', date: '2026-08-28', status: 'planned', subjects: ['science'] },
  { id: 2, destination: 'Delta Flight Museum', date: '2027-03-05', status: 'planned', subjects: ['aerospace'] },
  { id: 3, destination: 'Finished Trip', date: '2026-08-01', status: 'completed', subjects: [] },
  { id: 4, destination: 'Undated Trip', date: '', status: 'planned', subjects: [] }
];
const items = sched.buildCalendarItems({ assignments: [], academicAssignments: [], fieldTrips: TRIPS });
ok('THE CHECK: a trip dated today appears on the calendar',
  sched.getCalendarItemsForDate(items, '2026-08-28').some((i) => i.typeLabel === 'Field Trip'),
  'this is what did not happen on Aug 28');
ok('a completed trip is marked done', items.find((i) => i.key === 'fieldtrip::3')?.done === true);
ok('a planned trip is not marked done', items.find((i) => i.key === 'fieldtrip::1')?.done === false);
ok('an undated trip is excluded rather than dated to nothing',
  !items.some((i) => i.key === 'fieldtrip::4'));
/**
 * The property is that a FIELD TRIP's key is prefixed, not that every calendar
 * item is a field trip. The original wording happened to be true only while
 * field trips were the sole extra source; adding quarterly missions on Aug 29
 * broke it without breaking anything real. Assert the property.
 */
ok('trip keys cannot collide with planner or academic keys',
  items.filter((i) => i.source === 'fieldTrip').every((i) => i.key.startsWith('fieldtrip::')),
  'all four sources auto-increment their own ids');
ok('...and every calendar key in the merged list is unique',
  new Set(items.map((i) => i.key)).size === items.length,
  'a duplicate key is a React collision and a double-counted deadline');
ok('calling without fieldTrips still works',
  Array.isArray(sched.buildCalendarItems({ assignments: [], academicAssignments: [] })));

/**
 * "Fixing one call site is not fixing a rule" — written into this project after
 * the Declaration of Intent bug was reported twice, five days apart. Field
 * trips were missing from EVERY calendar, so every call site has to pass them.
 */
const CALLERS = [
  'src/components/Dashboard/ParentDashboard.jsx',
  'src/components/Dashboard/AcademicCenterCard.jsx',
  'src/components/Mentor/NovaDashboardGreeting.jsx',
  'src/components/Scheduler/NovaScheduleGuide.jsx'
];
for (const f of CALLERS) {
  const src = read(f);
  const calls = (src.match(/buildCalendarItems\(\{/g) || []).length;
  const withTrips = (src.match(/buildCalendarItems\(\{[^}]*fieldTrips[^}]*\}\)/g) || []).length;
  ok(`${f.split('/').pop()} passes fieldTrips at all ${calls} call site(s)`,
    calls > 0 && calls === withTrips, `${withTrips}/${calls}`);
  ok(`${f.split('/').pop()} subscribes to fieldTrips`,
    /fieldTrips = useAppStore/.test(src));
}
ok('no call site anywhere is left without fieldTrips',
  CALLERS.concat(['src/lib/plannerCalendar.js']).every((f) => {
    const src = read(f);
    const bare = src.match(/buildCalendarItems\(\{(?![^}]*fieldTrips)[^}]*\}\)/g) || [];
    return bare.length === 0;
  }),
  'the Coming Up panel is the one that should have told her');

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) {
  console.log(`\n${failures.length} CHECK(S) FAILED`);
  process.exitCode = 1;
} else {
  console.log('\nALL CHECKS PASSED');
}
