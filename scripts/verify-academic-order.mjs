// ---------------------------------------------------------------------------
// THE LISTS ARE IN ORDER, AND ONLY ONE FILE DECIDES WHAT ORDER MEANS.
// Run: node scripts/verify-academic-order.mjs
//
// ---- WHERE THIS CAME FROM (Aug 16, 2026) ----
//
// The parent: "The books, assignments, and portfolios aren't in order."
//
// Three lists, three different causes, one shape: nothing sorted them. Every
// screen did `rows.filter(r => r.subject === s)` and mapped the result, so the
// order on screen was the order Dexie handed back, which is the order the rows
// were written. Her live record had NINE places where a later deadline sat
// above an earlier one — including a bottle rocket due that same day, sitting
// under a book report due eight weeks later.
//
// The portfolio was the subtle one. It DID sort, on the raw stored value, and
// the two sources store different shapes — a bare local 'YYYY-MM-DD' and a
// full UTC timestamp. Anything finished after 8pm Eastern sorted as tomorrow
// while its card displayed today.
//
// THE RULE THIS SUITE PROTECTS: an ordered list of these rows is produced by
// lib/academicOrder.js and by nothing else. Books and assignments each appear
// on two screens — his and hers — and two orders for the same rows is worse
// than one bad order, because then neither screen can be trusted.
// ---------------------------------------------------------------------------
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ao = await import(REPO + '/src/lib/academicOrder.js');
const { buildAcademicPortfolio } = await import(REPO + '/src/lib/academicPortfolio.js');

let passed = 0;
const failures = [];
function ok(label, cond, detail = '') {
  if (cond) { passed += 1; console.log('PASS  ' + label); }
  else { failures.push(label); console.log('FAIL  ' + label + (detail ? `  ${detail}` : '')); }
}
const read = (rel) => fs.readFileSync(path.join(REPO, rel), 'utf8');

console.log('\n--- 1. assignments: earliest deadline first ---');
{
  /** Her live aerospace rows on the day she reported it, in stored order. */
  const aerospace = [
    { id: 28, title: 'Apollo 8: The Mission That Changed Everything', dueDate: '2026-10-16' },
    { id: 29, title: 'Bottle rocket — design, launch, and write-up', dueDate: '2026-08-16' }
  ];
  const sorted = ao.orderAssignments(aerospace);
  ok('the thing due today comes before the thing due in eight weeks',
    sorted[0].id === 29,
    'this is the row she reported twice: "Lamar has a rocket project due and it didnt show up"');

  const many = [
    { id: 1, dueDate: '2027-05-26' }, { id: 2, dueDate: '2027-04-02' },
    { id: 3, dueDate: '2027-05-19' }, { id: 4, dueDate: '2026-08-16' }
  ];
  const ds = ao.orderAssignments(many).map((r) => r.dueDate);
  ok('...and a whole quarter comes out ascending',
    ds.join() === [...ds].sort().join(), ds.join(' '));

  const withBlank = ao.orderAssignments([
    { id: 1, dueDate: '' }, { id: 2, dueDate: '2026-09-01' }, { id: 3, dueDate: null }
  ]);
  ok('an unscheduled slot sorts LAST, not first', withBlank[0].id === 2,
    'an empty dueDate sorting as "" would put every placeholder above the thing due tomorrow');

  ok('a completed assignment keeps its date, it is not pushed to the bottom',
    ao.orderAssignments([
      { id: 1, dueDate: '2026-10-01', status: 'not-started' },
      { id: 2, dueDate: '2026-08-20', status: 'completed' }
    ])[0].id === 2,
    'this list is the quarter record as much as a to-do list; the badge already says it is done');

  ok('the input array is not mutated',
    (() => { const a = [{ dueDate: '2026-10-01' }, { dueDate: '2026-08-01' }]; ao.orderAssignments(a); return a[0].dueDate === '2026-10-01'; })(),
    'these arrays are Zustand state; sorting in place would mutate the store');

  const same = ao.orderAssignments([
    { slotId: 'asg::math::2', dueDate: '2026-09-01', title: 'B' },
    { slotId: 'asg::math::1', dueDate: '2026-09-01', title: 'A' }
  ]);
  ok('two on the same day fall back to the slot order she set', same[0].slotId.endsWith('::1'));
}

console.log('\n--- 2. books: what he is reading, first ---');
{
  const shelf = [
    { id: 1, title: 'Ghost', status: 'not-started', slotId: 'book::reading::1' },
    { id: 2, title: 'Hidden Figures', status: 'completed', slotId: 'book::reading::2' },
    { id: 3, title: 'A Long Walk to Water', status: 'in-progress', slotId: 'book::reading::3' },
    { id: 4, title: '', status: 'empty', slotId: 'book::reading::4' }
  ];
  const s = ao.orderBooks(shelf).map((b) => b.id);
  ok('reading now, then the queue, then finished, then the empty slot',
    s.join() === '3,1,2,4', s.join(' '));
  ok('an empty slot is still THERE — last, never hidden',
    ao.orderBooks(shelf).length === 4,
    "the Library's own comment makes this decision and it is the right one");
  ok('the parent\'s slot order survives inside a group',
    ao.orderBooks([
      { title: 'B', status: 'not-started', slotId: 'book::x::3' },
      { title: 'A', status: 'not-started', slotId: 'book::x::1' }
    ])[0].slotId.endsWith('::1'));
  ok('a book she added herself sorts after the seeded slots, not into the middle',
    ao.orderBooks([
      { title: 'Custom', status: 'not-started', isCustom: true },
      { title: 'Seeded', status: 'not-started', slotId: 'book::x::9' }
    ])[0].title === 'Seeded');
  ok('an unknown status is treated as queued, not dropped',
    ao.orderBooks([{ title: 'Odd', status: 'weird' }]).length === 1);
}

console.log('\n--- 3. the portfolio sorts by the day it displays ---');
{
  ok('a bare date is never fed through new Date()',
    ao.localDayOf('2026-08-12') === '2026-08-12',
    'new Date("2026-08-12") is UTC midnight and renders as Aug 11 in every US timezone');

  /**
   * THE 8PM CASE. 2026-08-15T23:30:00Z is 7:30pm Eastern on Aug 15. Stored
   * that way it looks like Aug 15 to a string sort — correct here. But
   * 2026-08-16T01:30:00Z is 9:30pm Eastern on Aug 15, and a raw string sort
   * files it under the 16th while its own card prints the 15th.
   */
  const evening = '2026-08-16T01:30:00.000Z';
  ok('an evening entry sorts by its LOCAL day, not its UTC day',
    ao.localDayOf(evening) === new Date(evening).toLocaleDateString('en-CA'),
    `${ao.localDayOf(evening)} vs displayed ${new Date(evening).toLocaleDateString('en-CA')}`);

  const items = buildAcademicPortfolio({
    writingEntries: [{ id: 1, promptId: 'p', completedAt: '2026-08-10T21:24:24.230Z' }],
    academicAssignments: [
      { id: 2, status: 'completed', title: 'Newest', subject: 'math', completedAt: '2026-08-14T18:00:00.000Z' }
    ],
    portfolio: [{ id: 3, title: 'Field Trip: Victory Creek', dateCompleted: '2026-08-12' }],
    promptPools: [[{ id: 'p', title: 'A prompt' }]]
  });
  ok('the three sources interleave by date, newest first',
    items.map((i) => i.title).join(' | ') === 'Newest | Field Trip: Victory Creek | A prompt',
    items.map((i) => i.title).join(' | '));

  const sameDay = [
    { completedAt: '2026-08-12' },                    // hand-logged, no time
    { completedAt: '2026-08-12T14:00:00.000Z' }
  ].sort(ao.comparePortfolioNewestFirst);
  ok('inside one day, a row with a real time outranks one with none',
    sameDay[0].completedAt.includes('T'),
    'nobody knows what hour the field trip finished; it is not given an invented one');

  const undated = [{ completedAt: null }, { completedAt: '2026-01-01' }].sort(ao.comparePortfolioNewestFirst);
  ok('an undated row goes last — an undated item is not new', undated[0].completedAt === '2026-01-01');

  const lib = read('src/lib/academicPortfolio.js');
  ok('the old sortKey is gone, not just bypassed', !/^function sortKey/m.test(lib));
  ok('...and the comment that promised a slice it never did is gone too',
    !/compared on their first 10 characters/.test(lib));
}

console.log('\n--- 4. every screen that lists these rows calls the shared order ---');
{
  const SITES = [
    ['src/components/Academic/BookLibraryView.jsx', 'orderBooks', 'his Book Library'],
    ['src/components/Academic/AcademicAssignmentsView.jsx', 'orderAssignments', 'his Assignments tab'],
    ['src/components/Academic/AcademicParentSetupView.jsx', 'orderBooks', 'her Parent Setup — books'],
    ['src/components/Academic/AcademicParentSetupView.jsx', 'orderAssignments', 'her Parent Setup — assignments'],
    ['src/components/Dashboard/AcademicCenterCard.jsx', 'orderBooks', 'the Currently reading strip']
  ];
  for (const [file, fn, what] of SITES) {
    const src = read(file);
    ok(`${what} calls ${fn}()`, new RegExp(`${fn}\\(`).test(src) && /academicOrder\.js/.test(src));
  }

  /**
   * The regression this guards: a sixth screen appears, sorts inline "just
   * this once", and now two screens disagree about the same rows. The parent
   * reads both.
   */
  for (const [file] of SITES) {
    const src = read(file).replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
    ok(`${path.basename(file)} does not sort these rows inline`,
      !/academic(Books|Assignments)[\s\S]{0,80}?\.sort\(/.test(src),
      'ordering lives in one file so his screen and her screen cannot drift');
  }
}

console.log('\n--- 5. logging a session moves the book off not-started ---');
{
  const store = read('src/store/useAppStore.js');
  const i = store.indexOf('async logBookReading');
  const fn = store.slice(i, store.indexOf('\n  },', i));
  ok('logBookReading promotes the matching library book',
    /setAcademicBookStatus\(book\.id, 'in-progress'\)/.test(fn),
    'twenty books all read not-started, including the one he had read for two nights');
  ok('...only from not-started — a finished book stays finished',
    /status === 'not-started'/.test(fn));
  ok('...matched on normalized title, the same join the Library already uses',
    /trim\(\)\.toLowerCase\(\)/.test(fn),
    'the reading log has no book id and never will retroactively');
  const unlog = store.slice(store.indexOf('async unlogBookReading'));
  ok('un-ticking tonight does NOT un-start the book',
    !/setAcademicBookStatus/.test(unlog.slice(0, unlog.indexOf('\n  },'))),
    'he did start it; removing one log row does not undo that');
}

console.log('\n--- 6. the journal catalogue runs next-due to last-due ---');
{
  /**
   * The parent, Aug 17: "filter the cards so that its from the latest due to
   * the last due." The fourth list this file owns.
   *
   * Built from the same shape scheduleForItem returns, so a change to that
   * shape fails here rather than quietly reordering his screen.
   */
  const row = (id, title, sched) => ({ item: { id, title }, schedule: sched });
  const at = (d) => ({ next: { dueDate: d }, show: { dueDate: d } });
  const past = (d) => ({ next: null, show: { dueDate: d }, missed: 1 });

  const out = ao.orderScheduledCards([
    row('c', 'Zebra', at('2027-04-30')),
    row('d', 'Capstone', null),
    row('a', 'Bottle rocket', past('2026-08-14')),
    row('b', 'Mission report', at('2026-10-09'))
  ]).map((r) => r.item.id);

  ok('overdue first, then soonest, then the end of the year',
    out.slice(0, 3).join(',') === 'a,b,c',
    'a card sorts on the date its own line prints');
  ok('...and an undated card goes LAST, not first',
    out[3] === 'd',
    "the moisture capstone has no date on purpose; '' sorts above every real date");

  const tied = ao.orderScheduledCards([
    row('z', 'Wick watering', at('2026-09-04')),
    row('y', 'Bed frame', at('2026-09-04'))
  ]).map((r) => r.item.id);
  ok('a shared Friday breaks on title, so the order is stable across renders',
    tied.join(',') === 'y,z',
    'five garden builds land on the same day');

  ok('a repeating prompt sorts on its NEXT date, not its first',
    ao.scheduleSortDate({ next: { dueDate: '2026-11-06' }, show: { dueDate: '2026-08-14' } }) === '2026-11-06',
    'Mission Report runs seven times; the date it prints is the date it sorts on');

  const journal = read('src/components/Writing/WritingJournal.jsx');
  ok('the Writing Journal calls it rather than sorting for itself',
    /orderScheduledCards\(/.test(journal) && !/\.sort\(/.test(journal),
    'ordering lives in one file so this screen cannot drift from the others');
}

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) {
  console.log(`\n${failures.length} CHECK(S) FAILED`);
  process.exitCode = 1;
} else {
  console.log('\nALL CHECKS PASSED');
}
