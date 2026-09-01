// ---------------------------------------------------------------------------
// TODAY'S LIST AND TODAY'S ROUTINE AGREE. Run: node scripts/verify-timetable-order.mjs
//
// ---- WHERE THIS CAME FROM (Aug 20, 2026) ----
//
// The student, via his parent: "Lamar is complaining that he'd like the rest
// of his day to be in sync with his Today's Routine. Also, he has social
// studies to complete but it's not on Today's routine."
//
// Two complaints, one fault, seen from both sides. His home screen drew the
// same day twice and the two drawings disagreed.
//
//   the rail   9:00 Maths  10:00 Reading  10:30 Science  11:15 Typing
//              12:30 Language Arts  1:30 Spelling  1:45 PE  2:15 Rotating
//
//   the list   PE  Typing  Language Arts  Maths  Science  Social Studies
//              Technology  Reading  Book  Daily Writing
//
// The rail came from the timetable. The list came from the order the JSX was
// written in, accumulated one row at a time over six weeks. So the list — the
// one with the buttons on it — told him to do PE first and Mathematics fourth.
//
// AND THE SECOND HALF WAS WORSE. The two screens computed "what runs today"
// from different functions:
//
//   rail   liveRotatingSubjects()  ->  ['technology']       (the OWNER)
//   list   subjectsForDay()        ->  ['socialStudies', 'technology']
//                                       (the PREFERENCE ORDER)
//
// `subjectsForDay` returns what Thursday would LIKE to run, in order. The
// board read it as what Thursday DOES run, and handed him a Social Studies
// unit on a day whose timetable never mentions Social Studies.
//
// ---- WHAT IS GUARDED, AND WHAT DELIBERATELY IS NOT ----
//
// Guarded: the list is ordered by HER block times, every row declares its
// block, and a subject that does not own today says so in words.
//
// NOT guarded: which subject owns which weekday. That is a curriculum
// decision, it belongs to the parent, and encoding today's answer here would
// make her next change fail a test instead of a screen.
// ---------------------------------------------------------------------------
import './lib/academy-under-test.mjs';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sm = await import(REPO + '/src/lib/scheduledMinutes.js');
const rb = await import(REPO + '/src/lib/rotatingBlock.js');
const { defaultSchedule } = await import(REPO + '/src/academies/lamar/data/schedule/defaultSchedule.js');
const sq = await import(REPO + '/src/lib/schoolQuarter.js');
const { allLessons } = await import(REPO + '/src/academies/lamar/data/lessons/index.js');

let passed = 0;
const failures = [];
function ok(label, cond, detail = '') {
  if (cond) { passed += 1; console.log('PASS  ' + label); }
  else { failures.push(label); console.log('FAIL  ' + label + (detail ? `  ${detail}` : '')); }
}
const read = (rel) => fs.readFileSync(path.join(REPO, rel), 'utf8');
const codeOnly = (t) => t
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/\{\/\*[\s\S]*?\*\/\}/g, '')
  .replace(/^\s*\/\/.*$/gm, '');

const DASH = 'src/components/Dashboard/MissionControlDashboard.jsx';
const ROW = 'src/components/Dashboard/TodayRow.jsx';
const ORDER = 'src/components/Dashboard/TimetableOrder.jsx';

console.log('\n--- 1. the sorter reads her timetable, not a list of its own ---');
{
  const code = codeOnly(read(ORDER));
  ok('it takes the blocks as a prop',
    /export function TimetableOrder\(\{ blocks = \[\], children \}\)/.test(code),
    'a hard-coded order in here would be the very thing being removed');
  ok('...and reads start times off them',
    /toMinutes\(block\.startTime\)/.test(code)
      && /import \{ toMinutes \} from '\.\.\/\.\.\/lib\/classBell\.js';/.test(code),
    'the same parser the bell and the rail use');
  ok('...with no hard-coded clock times anywhere in it',
    !/\d{1,2}:\d{2}/.test(code),
    'she can move any block in the Scheduler; a time written here could not follow');
  ok('it flattens the conditional groups before sorting',
    /Children\.toArray\(children\)\.filter\(isValidElement\)/.test(code),
    'every row on this list is behind a conditional, and .map() groups arrive as arrays');
  ok('unscheduled rows sort last rather than being dropped',
    /if \(a\.scheduled !== b\.scheduled\) return a\.scheduled \? -1 : 1;/.test(code),
    'dropping work he was given is the fault this project shipped twice');
  ok('...and file order breaks ties inside one block',
    /return a\.index - b\.index;/.test(code),
    'Spelling before Vocabulary, the daily drill before the weekly piece');
}

console.log('\n--- 2. the sort is right, on her real timetable ---');
{
  /**
   * Exercised against defaultSchedule rather than a mock, because the property
   * that matters is "agrees with the rail", and the rail draws these blocks.
   */
  const order = ['pe', 'guitar', 'math', 'wordStudy', 'science', 'reading', 'typing', 'ela'];
  const starts = order.map((s) => {
    const id = sm.BLOCK_FOR_SUBJECT[s];
    const block = defaultSchedule.find((b) => b.id === id);
    return { s, id, start: block.startTime };
  });
  const sorted = [...starts].sort((a, b) => a.start.localeCompare(b.start)).map((x) => x.s);
  ok('sorting the subjects by their block start gives the school day',
    JSON.stringify(sorted) === JSON.stringify(['math', 'reading', 'science', 'typing', 'ela', 'wordStudy', 'pe', 'guitar']),
    JSON.stringify(sorted));
  ok('...which is NOT the order the rows were written in',
    JSON.stringify(sorted) !== JSON.stringify(order),
    'if these ever match, this test has stopped testing anything');
  ok('every subject on the board maps to a real block',
    Object.entries(sm.BLOCK_FOR_SUBJECT)
      .every(([, id]) => defaultSchedule.some((b) => b.id === id)),
    'a typo in a block id sorts that row silently to the tail');
}

console.log('\n--- 3. every row declares its block ---');
{
  const code = codeOnly(read(DASH));
  ok('the list is wrapped in the sorter',
    /<TimetableOrder blocks=\{scheduleBlocks\}>/.test(code)
      && /<\/TimetableOrder>/.test(code));
  ok('...fed HER blocks, subscribed from the store',
    /const scheduleBlocks = useAppStore\(\(s\) => s\.scheduleBlocks\);/.test(code),
    'unsubscribed, this is undefined at render — the crash verify-parses cannot see');
  ok('...and the Khan rows it consults are subscribed too',
    /const khanAcademyAssignments = useAppStore\(\(s\) => s\.khanAcademyAssignments\);/.test(code));

  const blockIdCount = (code.match(/blockId=\{/g) || []).length;
  const rowCount = (code.match(/<TodayRow/g) || []).length;
  ok(`${blockIdCount} of ${rowCount} rows carry a blockId`,
    blockIdCount >= rowCount - 1,
    'only the bedtime book is allowed to have none');
  ok('...and the one without it is the book, on purpose',
    /label="Book"/.test(code) && !/label="Book"[\s\S]{0,200}blockId/.test(code),
    'the parent: "I will have him read that book before bed" — it is not a school block');
  /**
   * COUNTING `BLOCK_FOR_SUBJECT` USES WAS THE WRONG MEASURE. (Aug 20, 2026.)
   *
   * This asserted "at least 8 rows say blockId={BLOCK_FOR_SUBJECT...". Then
   * English became strand-aware — two rows correctly moved to `rowBlock` and
   * `blockForLesson(...)`, both of which resolve through the SAME module — and
   * a guard about single-sourcing failed a change that improved it.
   *
   * The property is: every block id on this screen is resolved by
   * scheduledMinutes.js, and none is typed in by hand. That is what is checked
   * now, and it does not care how many rows there are.
   */
  const blockIdExprs = [...code.matchAll(/blockId=\{([^}]*)\}/g)].map((m) => m[1].trim());
  const RESOLVERS = /BLOCK_FOR_SUBJECT|STRAND_BLOCK|blockForLesson|rowBlock/;
  ok(`all ${blockIdExprs.length} blockId expressions resolve through scheduledMinutes`,
    blockIdExprs.length >= 8 && blockIdExprs.every((e) => RESOLVERS.test(e)),
    JSON.stringify(blockIdExprs.filter((e) => !RESOLVERS.test(e))));
  ok('...and that module is the one the Georgia counter credits from',
    /from '\.\.\/\.\.\/lib\/scheduledMinutes\.js';/.test(code) && /BLOCK_FOR_SUBJECT/.test(code),
    'one source, not two');
  ok("...so no row hard-codes a block id",
    !/blockId="block-/.test(code),
    'a literal here drifts from the credit rule the first time a block moves');
}

console.log('\n--- 4. the time is printed, and "not today" is said in words ---');
{
  const rowSrc = read(ROW);
  const rowCode = codeOnly(rowSrc);
  ok('the row accepts the block, the time and the off-timetable flag',
    /blockId,/.test(rowCode) && /when,/.test(rowCode) && /offTimetable,/.test(rowCode));
  ok('...and prints the time in a fixed-width column',
    /\{when \|\| ''\}/.test(rowCode) && /w-16 flex-none font-mono/.test(rowCode),
    'a ragged column cannot be matched against the rail by eye');
  ok('...and says "not on today\'s timetable" rather than implying it by position',
    /not on today&apos;s timetable/.test(rowSrc) && /offTimetable && \(/.test(rowCode),
    'a boy reads bottom-of-list as "last", not as "not today"');

  const code = codeOnly(read(DASH));
  /**
   * The property is that the board and the rail answer "what runs at 2:15"
   * from ONE source. It was asserted by pinning the import line verbatim, which
   * failed on Aug 29 2026 when `liveMorningSubject` was added to that same
   * import for a different block. Seventh stale-literal failure on this
   * project: assert the property, not the punctuation.
   */
  ok('the board decides that from the SAME function the rail uses',
    /liveRotatingSubjects\(new Date\(\), khanAcademyAssignments\)/.test(code)
      && /import \{[^}]*liveRotatingSubjects[^}]*\} from '\.\.\/\.\.\/lib\/rotatingBlock\.js';/.test(code),
    'two functions answering "what runs today" is the whole bug');
  /**
   * The 10:30 slot is a DIFFERENT question and gets a different function — but
   * it must still come from the same module, never a second implementation of
   * "who owns a block" living in a component.
   */
  ok('...and the 10:30 slot comes from that module too, not a local reimplementation',
    /import \{[^}]*liveMorningSubject[^}]*\} from '\.\.\/\.\.\/lib\/rotatingBlock\.js';/.test(code),
    'a component that works out block ownership itself is how the two screens disagree');
  ok('...and his mission list counts BOTH slots',
    /liveMorningSubject\(new Date\(\), khanAcademyAssignments\)/.test(code),
    'a subject with a day on the timetable and nothing on his screen is the bug this project keeps finding');
  ok('...and only the rotating block can ever be off-timetable',
    /if \(BLOCK_FOR_SUBJECT\[subject\] !== ROTATING_BLOCK_ID\) return false;/.test(code),
    'every other row owns a block that runs every school day');
  ok('...applied to both the lesson rows and the Khan rows',
    (code.match(/offTimetable=\{isOffTimetable\(subject\)\}/g) || []).length === 2,
    'Social Studies reaches his screen as a Khan row; flagging only the lesson row would miss it');
}

console.log('\n--- 5. the case that was reported ---');
{
  /**
   * Thursday Aug 20, 2026. Technology owns the 2:15 block in Q1; Social
   * Studies is Khan-only until Q2 and owns no weekday at all. Both reach his
   * board. Exactly one of them is today's.
   *
   * This asserts the SHAPE — that the two functions can disagree and that the
   * flag catches it — not that Technology in particular owns Thursday. She may
   * reallocate the week; that must change a screen, not fail a build.
   */
  const thursday = new Date('2026-08-20T12:00:00');
  const owners = rb.liveRotatingSubjects(thursday);
  ok('exactly one subject owns the rotating block on a core day',
    owners.length === 1, JSON.stringify(owners));

  const rotating = Object.entries(sm.BLOCK_FOR_SUBJECT)
    .filter(([, id]) => id === rb.ROTATING_BLOCK_ID)
    .map(([s]) => s);
  ok('...out of the four that share it',
    rotating.length === 4 && rotating.includes('socialStudies') && rotating.includes('technology'),
    JSON.stringify(rotating));

  const offToday = rotating.filter((s) => !owners.includes(s));
  ok('...so the other three are off-timetable and now say so',
    offToday.length === 3, JSON.stringify(offToday));

  /**
   * And the fact that made this a real complaint rather than a cosmetic one:
   * a subject can own no day in a quarter at all. Guarded as a SHAPE — that
   * the app can answer the question — because the answer is hers to change.
   */
  const week = [1, 2, 3, 4, 5].map((d) => {
    const date = new Date('2026-08-17T12:00:00');
    date.setDate(date.getDate() + (d - 1));
    return rb.liveRotatingSubjects(date)[0] || null;
  });
  ok('the week can be asked which subject owns each day',
    week.length === 5 && week.some(Boolean), JSON.stringify(week));
  ok('...and Friday is deliberately unowned, for catch-up',
    week[4] === null,
    'the overflow day is what makes one-subject-per-day possible');
}

console.log('\n--- 6. no subject has work in a quarter and nowhere to do it ---');
{
  /**
   * THE RULE THE COMPLAINT WAS ABOUT.
   *
   * "he has social studies to complete but it's not on Today's routine."
   *
   * Social Studies had ten open Khan units in Q1 and owned no weekday at all.
   * The schedule's answer was that Friday would "surface" it — but Friday is
   * the one open block in the week and it is already spoken for by long Khan
   * units, catch-up and field trips. Being mentioned on the shared day is not
   * the same as having somewhere to do the work, and ten world-history units
   * do not fit in the gaps of eleven Fridays.
   *
   * So the rule guarded here is the strong one: **a rotating subject with work
   * in a quarter owns a named weekday in that quarter.** Not "is visible
   * somewhere". Owns a day.
   *
   * This is what the parent's Wednesday reallocation bought, and it is
   * quarter-scoped so it keeps holding when Q2 hands Wednesday back to
   * Aerospace and Thursday to Social Studies.
   */
  const ROTATING = ['aerospace', 'technology', 'socialStudies', 'robotics'];

  /** Khan rows as they really are — Social Studies is Khan-only in Q1. */
  const KHAN = [
    ...Array.from({ length: 10 }, () => ({ subject: 'socialStudies', batchLabel: 'Q1 2026-2027' })),
    ...Array.from({ length: 12 }, () => ({ subject: 'technology', batchLabel: 'Q1 2026-2027' }))
  ];

  const WEEKS = [
    ['Q1', '2026-08-24'], ['Q2', '2026-11-16'],
    ['Q3', '2027-02-22'], ['Q4', '2027-05-10']
  ];

  for (const [qLabel, monday] of WEEKS) {
    const owners = new Set();
    for (let i = 0; i < 5; i += 1) {
      const day = new Date(monday + 'T12:00:00');
      day.setDate(day.getDate() + i);
      const w = rb.liveRotatingSubjects(day, KHAN)[0];
      if (w) owners.add(w);
    }

    const batch = sq.getCurrentQuarter(new Date(monday + 'T12:00:00')).batchLabel;
    const hasLessons = new Set(
      allLessons.filter((l) => l.quarter === batch).map((l) => l.subject)
    );
    const hasKhan = new Set(KHAN.filter((a) => a.batchLabel === batch).map((a) => a.subject));
    const withWork = ROTATING.filter((s) => hasLessons.has(s) || hasKhan.has(s));
    const dayless = withWork.filter((s) => !owners.has(s));

    ok(`${qLabel}: every rotating subject with work owns a weekday`,
      dayless.length === 0,
      `no day for [${dayless}] · owners=[${[...owners]}] · withWork=[${withWork}]`);
  }

  /**
   * And the specific thing she chose, stated once so that undoing it is a
   * visible decision rather than an accident. Q1 only — Q2 onward is asserted
   * by the rule above, not by an answer written down here.
   */
  const q1Week = ['2026-08-24', '2026-08-25', '2026-08-26', '2026-08-27'].map((d) =>
    rb.liveRotatingSubjects(new Date(d + 'T12:00:00'), KHAN)[0] || null
  );
  ok('Q1 runs Aerospace, Technology, Social Studies, Technology (Mon-Thu)',
    JSON.stringify(q1Week) === JSON.stringify(['aerospace', 'technology', 'socialStudies', 'technology']),
    JSON.stringify(q1Week) + ' — the parent chose Wednesday for Social Studies on Aug 20, 2026');

  /**
   * Aerospace gets Wednesday back the moment Social Studies has lessons of its
   * own. It is his dream subject and it carries the most lessons in every
   * quarter from Q2 — losing a day for the year to solve a Q1 problem would
   * have been a silent cost.
   */
  const q2Wed = rb.liveRotatingSubjects(new Date('2026-11-18T12:00:00'), KHAN)[0];
  ok('...and Aerospace has Wednesday back in Q2',
    q2Wed === 'aerospace', String(q2Wed));

  ok('liveness counts Khan work, not just Mission Control lessons',
    rb.liveRotatingSubjects(new Date('2026-08-26T12:00:00'), KHAN)[0] === 'socialStudies',
    'Social Studies has ZERO Mission Control lessons in Q1 — if only those count, it can never own a day');
}

console.log('\n--- 7. English is two blocks, and each row is in the right one ---');
{
  /**
   * The parent, after the first ordering fix: **"The 'Rest of the Day' is
   * supposed to match 'Today's Routine'."**
   *
   * One row still did not. It printed
   *
   *     10:00  LANGUAGE ARTS  Punctuation: the comma and the apostrophe
   *
   * against a rail that reads 10:00 Reading Lesson and 12:30 Language Arts &
   * Writing Journal. Language Arts at ten o'clock and again at half twelve.
   *
   * `reading` is ONE subject code carrying TWO subjects. config/subjects.js
   * has named them since Aug 6 — Reading & Literature, Grammar & Writing — and
   * the comment on the card label already described this exact trap, about the
   * label. The block map still had it, where it also cost hours: a day of
   * grammar booked block-3's fifteen minutes instead of block-7's sixty.
   */
  const q1Grammar = {
    subject: 'reading',
    khanAcademyUrl: 'https://www.khanacademy.org/humanities/grammar/punctuation-the-comma-and-the-apostrophe'
  };
  const q1Vocab = {
    subject: 'reading',
    khanAcademyUrl: 'https://www.khanacademy.org/ela/5th-grade-reading-and-vocab/xb350e60168d6e96f:vocabulary-5th'
  };

  ok('a Khan grammar unit is the Grammar & Writing strand',
    sm.khanReadingStrand(q1Grammar) === 'language-arts', sm.khanReadingStrand(q1Grammar));
  ok('...and a reading/vocab unit is not',
    sm.khanReadingStrand(q1Vocab) === 'reading', sm.khanReadingStrand(q1Vocab));
  ok('...decided by URL, never by title',
    /khanGrammarUnitByUrl\(row\?\.khanAcademyUrl\)/.test(codeOnly(read('src/lib/scheduledMinutes.js'))),
    'grammarCourseOrder.js: a title can differ from the seed after an import or a hand edit');

  const B = (id) => defaultSchedule.find((b) => b.id === id);
  ok('Grammar & Writing lands on the 12:30 Language Arts block',
    sm.STRAND_BLOCK['language-arts'] === 'block-7' && B('block-7').startTime === '12:30'
      && /Language Arts/.test(B('block-7').label),
    JSON.stringify(sm.STRAND_BLOCK));
  ok('Reading & Literature lands on the 10:00 Reading Lesson block',
    sm.STRAND_BLOCK.reading === 'block-3' && B('block-3').startTime === '10:00'
      && /Reading/.test(B('block-3').label),
    JSON.stringify(sm.STRAND_BLOCK));

  /**
   * BOTH BLOCKS MUST STAY REACHABLE. A block nothing can credit is ninety
   * hours a year that cannot be counted — this project shipped exactly that in
   * block-1, and the fix must not create a second one by sending all of
   * English to whichever block it now prefers.
   */
  ok('the 12:30 block is creditable',
    sm.scheduledMinutesOn('2026-08-19', {
      khanDailyLog: { '2026-08-19': { reading: true } },
      khanAcademyAssignments: [{ ...q1Grammar, batchLabel: 'Q1 2026-2027', sequenceInQuarter: 1 }],
      scheduleBlocks: defaultSchedule
    }) === 60, 'a grammar day must book the full hour, not fifteen minutes');
  ok('...and the 10:00 block still is',
    sm.scheduledMinutesOn('2026-08-19', {
      khanDailyLog: { '2026-08-19': { reading: true } },
      khanAcademyAssignments: [{ ...q1Vocab, batchLabel: 'Q1 2026-2027', sequenceInQuarter: 1 }],
      scheduleBlocks: defaultSchedule
    }) === 15, 'when the unit really is reading, it is the 15-minute block');

  /**
   * And they stack rather than replacing each other: grammar and a literature
   * lesson on one day are two blocks, because they are two blocks on her
   * timetable.
   */
  const both = sm.scheduledMinutesOn('2026-08-19', {
    khanDailyLog: { '2026-08-19': { reading: true } },
    khanAcademyAssignments: [{ ...q1Grammar, batchLabel: 'Q1 2026-2027', sequenceInQuarter: 1 }],
    lessonProgress: { 'r7-main-idea-practice': { lastCompletedDate: '2026-08-19' } },
    scheduleBlocks: defaultSchedule
  });
  ok('grammar and a literature lesson on one day book both blocks',
    both === 75, `got ${both} — 60 Language Arts + 15 Reading Lesson`);

  /**
   * THE QUARTER SCOPE. `sequenceInQuarter` restarts at 1 every quarter, so an
   * unfiltered sort puts Q2's first unit ahead of Q1's second — which is
   * exactly what happened on the first pass here, and it credited the wrong
   * block without failing anything.
   */
  const mixed = [
    { ...q1Grammar, batchLabel: 'Q1 2026-2027', sequenceInQuarter: 6 },
    { subject: 'reading', batchLabel: 'Q2 2026-2027', sequenceInQuarter: 1,
      khanAcademyUrl: 'https://www.khanacademy.org/ela/7th-grade-reading-and-vocabulary/x:mysteries' }
  ];
  const picked = sm.nextOpenKhanRow('reading', mixed, '2026-08-19');
  ok('the next unit is scoped to the quarter of the day being credited',
    picked && picked.batchLabel === 'Q1 2026-2027',
    picked ? picked.batchLabel : 'null');
  ok('...so an August day credits the Language Arts block',
    sm.blockForKhanTick('reading', mixed, '2026-08-19') === 'block-7',
    sm.blockForKhanTick('reading', mixed, '2026-08-19'));

  /** Mission Control lessons resolve by their own strand. */
  const litLesson = allLessons.find((l) => l.subject === 'reading' && l.strand === 'reading');
  const laLesson = allLessons.find((l) => l.subject === 'reading' && l.strand === 'language-arts');
  ok('a Reading & Literature lesson credits the 10:00 block',
    sm.blockForLesson(litLesson.id) === 'block-3', `${litLesson.id} -> ${sm.blockForLesson(litLesson.id)}`);
  ok('a Grammar & Writing lesson credits the 12:30 block',
    sm.blockForLesson(laLesson.id) === 'block-7', `${laLesson.id} -> ${sm.blockForLesson(laLesson.id)}`);
  ok('...and a subject with one strand is unaffected',
    sm.blockForLesson(allLessons.find((l) => l.subject === 'math').id) === 'block-2');

  /**
   * LABEL AND BLOCK FROM THE SAME FACT. If they are computed separately they
   * drift, and the drift is invisible until a quarter turns over and the Khan
   * rows stop being grammar.
   */
  const dash = codeOnly(read(DASH));
  ok('one helper decides both the English label and its block',
    /const englishRow = \(strand\) => \(/.test(dash)
      && /blockId: STRAND_BLOCK\['language-arts'\], label: 'Language Arts'/.test(dash)
      && /blockId: STRAND_BLOCK\.reading, label: 'Reading'/.test(dash),
    'two separate lookups is how "Language Arts at 10:00" happened in the first place');
  ok('...the Khan row uses it, from the unit he is actually handed',
    /englishRow\(khanReadingStrand\(next\)\)/.test(dash));
  ok('...and the lesson row uses it, from the lesson strand',
    /englishRow\(readingLesson\.strand\)\.label/.test(dash)
      && /blockForLesson\(readingLesson\.id\)/.test(dash));
  ok('...so no English row hard-codes its label any more',
    !/label="Reading"/.test(dash) && !/label="Language Arts"/.test(dash),
    'a fixed label is wrong the moment the strand changes, which it does in Q2');

  /** Every credit reader passes the rows the strand test needs. */
  for (const [name, rel] of [
    ['the compliance packet', 'src/lib/compliancePacket.js'],
    ['the compliance screen', 'src/components/Dashboard/ComplianceSection.jsx'],
    ['his board', 'src/components/Dashboard/MissionControlBoard.jsx'],
    ['the attendance summary', 'src/store/useAppStore.js']
  ]) {
    ok(`${name} passes khanAcademyAssignments to the credit rule`,
      /khanAcademyAssignments/.test(codeOnly(read(rel))),
      'without the rows, every English day silently falls back to the 15-minute block');
  }
}

console.log('\n--- 4. no two rows claim the same minute of the same subject ---');
{
  /**
   * =====================================================================
   * "FIX AEROSPACE BEING ON THE BOARD TWICE." (Aug 26, 2026.)
   * =====================================================================
   *
   * Third report of one shape. Before it: the Technology pair, and the two
   * Technology rows that prompted *"They are both every other day?"*
   *
   * Never a duplicated row — two REAL pieces of work wearing one clock time.
   * The week's hands-on project took `whenFor(BLOCK_FOR_SUBJECT[subject])`,
   * which for aerospace is block-9, the same 2:15 the day's Aerospace lesson
   * already owns. A forty-five minute block, two rows, both claiming it.
   *
   * THE ROW STAYS IN THE DAY. Stripping its blockId so it tails like the book
   * was my first attempt, and this suite plus verify-planner-feeds killed it —
   * correctly, because it walks back into her earlier report: *"This weeks
   * projects should be added to his rest of the day because he is ignoring
   * it."* The tail is exactly "beside the day".
   *
   * What changed is the TIME it prints: the day it is due, not a minute it
   * cannot have.
   */
  const code = codeOnly(read(DASH));

  ok("the week's project still carries its subject's block",
    /blockId=\{BLOCK_FOR_SUBJECT\[weeksHandsOn\.subject\]\}/.test(code),
    'without a block it sorts to the tail, which is the fault she already reported once');
  ok('...and shows the day it is due rather than that block\'s clock time',
    /when=\{parseDateStr\(handsOnDueFriday\)\.toLocaleDateString/.test(code),
    'two rows printing 2:15 for one 45-minute block is what "on the board twice" meant');
  ok('...so it never asks whenFor() for the rotating block',
    !/when=\{whenFor\(BLOCK_FOR_SUBJECT\[weeksHandsOn\.subject\]\)\}/.test(code));
  /**
   * ---- AND IT IS NOT MARKED OFF-TIMETABLE. I HAD THIS BACKWARDS ----
   *
   * This check asserted the opposite an hour ago, because I added
   * `offTimetable` to the project row in the same edit. The parent saw it
   * immediately: *"it doesn't make any sense to put that warning on the project
   * if something supposed to be done each day."*
   *
   * The row argued with itself in two adjacent lines — "not on today's
   * timetable" directly above "a bit each day beats all of it Friday".
   *
   * `offTimetable` means "assigned to him, but today has no slot for it". True
   * of a LESSON on a day its subject does not own the 2:15 block. Never true of
   * week-long work, which by definition has a slot every day.
   */
  ok('...and is NOT marked off-timetable — week-long work is never off',
    !/offTimetable=\{isOffTimetable\(weeksHandsOn\.subject\)\}/.test(code),
    'the row would contradict its own "a bit each day" instruction');

  /**
   * ---- THE GENERAL RULE IS NOT STATICALLY CHECKABLE, AND SAYING SO BEATS
   * SHIPPING A CHECK THAT CRIES WOLF ----
   *
   * The obvious next step is "no two rows print the same clock time for the
   * same subject". I wrote it, and it failed on the Writing Journal and Word
   * Study — whose pairs are the two BRANCHES OF A TERNARY. Only ever one of
   * them renders. A regex over the file cannot tell a branch from a sibling.
   *
   * A guard that reports a healthy screen as broken is a guard that gets
   * muted, and a muted guard is worse than none. So the collision rule is
   * asserted where it can be asserted honestly — on the one row that genuinely
   * shares a block with another, above — and this note stands in for the
   * general case, which needs a rendered tree rather than a pattern match.
   *
   * This note is a COMMENT, not an ok(). My first stand-in asserted a COUNT of
   * `BLOCK_FOR_SUBJECT[` occurrences — a magic number I guessed instead of
   * counting, and it failed on sight. A check that encodes today's line count
   * is not a check, it is a tripwire on ordinary editing.
   */
}

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) {
  console.log(`\n${failures.length} CHECK(S) FAILED`);
  process.exitCode = 1;
} else {
  console.log('\nALL CHECKS PASSED');
}
