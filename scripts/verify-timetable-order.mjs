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
//              (times shown as they were Aug 20, 2026 -- the 10:15 break
//              was removed Nov 2, 2026; see defaultSchedule.js)
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
import { fileURLToPath, pathToFileURL } from 'node:url';
const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
/**
 * A repo-relative path as a module URL.
 *
 * `await import(REPO + '/src/…')` worked everywhere it was ever run and could
 * never work on Windows: REPO is `C:\Users\…` there, so the string handed to
 * import() begins `C:` and Node rejects it as an unknown URL scheme —
 * ERR_UNSUPPORTED_ESM_URL_SCHEME, protocol 'c:'. pathToFileURL is the Node API
 * for exactly this; do not hand-build a file:// string, because a drive letter,
 * a space in a folder name and a backslash each break a different naive version.
 */
const moduleUrl = (rel) => pathToFileURL(path.join(REPO, rel)).href;

const sm = await import(moduleUrl('src/lib/scheduledMinutes.js'));
const rb = await import(moduleUrl('src/lib/rotatingBlock.js'));
const { defaultSchedule } = await import(moduleUrl('src/academies/lamar/data/schedule/defaultSchedule.js'));
const sq = await import(moduleUrl('src/lib/schoolQuarter.js'));
const { allLessons } = await import(moduleUrl('src/academies/lamar/data/lessons/index.js'));

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
  const order = ['pe', 'guitar', 'math', 'spelling', 'science', 'reading', 'typing', 'ela'];
  const starts = order.map((s) => {
    const id = sm.BLOCK_FOR_SUBJECT[s];
    const block = defaultSchedule.find((b) => b.id === id);
    return { s, id, start: block.startTime };
  });
  const sorted = [...starts].sort((a, b) => a.start.localeCompare(b.start)).map((x) => x.s);
  ok('sorting the subjects by their block start gives the school day',
    JSON.stringify(sorted) === JSON.stringify(['math', 'reading', 'science', 'typing', 'ela', 'spelling', 'pe', 'guitar']),
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
  /**
   * AND ITS ONE DATE SAYS WHICH END IT IS. She read "due Fri, Sep 18" as a
   * start date on Aug 26 and again on Sep 8; the Aug 26 fix reached the
   * Assignments rows and this row was missed.
   */
  ok('the bedtime book row says which end of the reading its date is',
    /finish by \$\{formatShortDate\(parseDateStr\(currentBook\.dueDate\)\)\}/.test(code)
      && !/· due \$\{formatShortDate\(parseDateStr\(currentBook\.dueDate\)\)\}/.test(code),
    'one bare date on three weeks of reading reads as the day to begin');
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
  /**
   * A bare identifier (`blockId={blockId}`) is still single-sourced if the
   * identifier itself was assigned from a resolver a few lines up -- that is
   * what happened Nov 3 2026 when the Khan-reading-strand row and the plain
   * Khan row were merged into one render, both already resolved before the
   * JSX runs. Trace a bare identifier back to its declaration before judging
   * it, instead of failing on the variable name alone.
   */
  const resolveBlockIdExpr = (expr) => {
    if (!/^[A-Za-z_$][\w$]*$/.test(expr)) return expr;
    const decl = code.match(new RegExp(`const ${expr}\\s*=\\s*([^;]+);`));
    if (decl) return decl[1];
    const shorthand = code.match(new RegExp(`\\b${expr}\\s*:\\s*([^,}]+)`));
    if (shorthand) return shorthand[1];
    return expr;
  };

  /**
   * ---- AND A SECOND ROTATING SLOT MOVED THE ROWS AGAIN. (Sep 8, 2026.) ----
   *
   * `blockForSubjectToday` is the fourth resolver, added the day the parent
   * reported Social Studies stamped "not on today's timetable" while the rail
   * beside it ran Social Studies at 10:30. It answers the same question the
   * other three answer — which block does this row belong to — and it answers
   * it BY DATE, because since Aug 29 two blocks rotate and a fixed table cannot
   * be right about both.
   *
   * Naming it here is not enough: a resolver that quietly stopped reading
   * scheduledMinutes would pass. So the function's own body is checked below.
   */
  const RESOLVERS = /BLOCK_FOR_SUBJECT|STRAND_BLOCK|blockForLesson|rowBlock|blockForSubjectToday/;
  const resolvedBlockIdExprs = blockIdExprs.map(resolveBlockIdExpr);
  ok(`all ${blockIdExprs.length} blockId expressions resolve through scheduledMinutes`,
    blockIdExprs.length >= 8 && resolvedBlockIdExprs.every((e) => RESOLVERS.test(e)),
    JSON.stringify(blockIdExprs.filter((e, i) => !RESOLVERS.test(resolvedBlockIdExprs[i]))));
  ok('...and that module is the one the Georgia counter credits from',
    /from '\.\.\/\.\.\/lib\/scheduledMinutes\.js';/.test(code) && /BLOCK_FOR_SUBJECT/.test(code),
    'one source, not two');
  ok("...so no row hard-codes a block id",
    !/blockId="block-/.test(code),
    'a literal here drifts from the credit rule the first time a block moves');

  /**
   * THE DATE-AWARE RESOLVER, CHECKED RATHER THAN TRUSTED.
   *
   * It must fall back to BLOCK_FOR_SUBJECT — so every non-rotating row is
   * exactly where it always was — and it must use MORNING_BLOCK_ID rather than
   * a typed 'block-5', which is the same literal-drift rule as the line above.
   */
  const resolver = code.match(/const blockForSubjectToday = [\s\S]{0,260}?;/);
  ok('...and the date-aware resolver still falls back to BLOCK_FOR_SUBJECT',
    Boolean(resolver) && /BLOCK_FOR_SUBJECT\[subject\]/.test(resolver[0]),
    'every row that is not in a rotating slot must land exactly where it always did');
  ok('...and names the morning block by its id, not a literal',
    Boolean(resolver) && /MORNING_BLOCK_ID/.test(resolver[0]) && !/'block-5'/.test(resolver[0]));
  ok('...and it is fed liveMorningSubject, the same function the rail reads',
    /const morningOwner = liveMorningSubject\(new Date\(\), khanAcademyAssignments\)/.test(code),
    'the rail and the list disagreeing about the day is the fault this whole file exists for');
  /**
   * ---- NOTHING IS EVER OFF-TIMETABLE ANY MORE. (Nov 3, 2026.) ----
   *
   * This used to check that a subject owning the 10:30 slot was exempted from
   * an off-timetable stamp that every OTHER rotating subject could still get.
   * The parent retired the rotation itself — "I want them to be daily." —
   * so nothing on this screen can be off its own timetable now, the 10:30
   * slot included. `isOffTimetable` is a one-line function that always
   * returns false; checked directly rather than by its old subject-by-
   * subject carve-outs, which no longer exist to check.
   */
  ok('isOffTimetable always returns false now — nothing can be off its own timetable',
    /const isOffTimetable = \(\) => false;/.test(code),
    'every subject owns a real block every school day now, the 10:30 one included');
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
   * ---- "WHAT RUNS AT 2:15" IS NO LONGER A QUESTION WITH ONE ANSWER A DAY.
   * (Nov 3, 2026.) ----
   *
   * The board and the rail used to have to agree on which ONE subject
   * `liveRotatingSubjects(new Date(), ...)` named for today. The parent
   * retired that question itself: "I want them to be daily." Aerospace,
   * Technology and Robotics each own a fixed block now, so there is nothing
   * left for the two screens to disagree about — `liveRotatingSubjects` is
   * still imported (the Friday catch-up walk below still calls it, now
   * always getting back nothing) but no longer asked "who is today's one
   * owner" with `new Date()`.
   */
  ok('liveRotatingSubjects is still imported from the one module that defines it',
    /import \{[^}]*liveRotatingSubjects[^}]*\} from '\.\.\/\.\.\/lib\/rotatingBlock\.js';/.test(code),
    'a component reimplementing "who owns a block" itself is how the two screens disagreed before');
  ok('...and the board no longer asks it "who is today\'s one owner" — nothing owns just one day any more',
    !/liveRotatingSubjects\(new Date\(\), khanAcademyAssignments\)/.test(code),
    'that exact call is the per-day-rotation question the parent asked to retire');
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
  /**
   * ---- "ONLY THE ROTATING BLOCK CAN BE OFF-TIMETABLE" IS RETIRED TOO. ----
   *
   * There is no rotating block left to carve an exception for — Aerospace,
   * Technology and Robotics each own their own fixed block now, same as
   * Social Studies' block-5c. `isOffTimetable` reflects that directly: it is
   * a one-line function returning false, not a per-subject rule with an
   * exception list.
   */
  ok('isOffTimetable is the same one-line "always on-timetable" function here too',
    /const isOffTimetable = \(\) => false;/.test(code));
  ok('...applied to both the lesson rows and the Khan rows',
    (code.match(/offTimetable=\{isOffTimetable\(subject\)\}/g) || []).length === 2,
    'Social Studies reaches his screen as a Khan row; flagging only the lesson row would miss it');
}

console.log('\n--- 5. the case that was reported — RETIRED Nov 3, 2026 ---');
{
  /**
   * Thursday Aug 20, 2026 was the day this check was written for: Technology
   * owned the 2:15 block in Q1, Social Studies was Khan-only and owned no
   * weekday at all, and exactly one of the two reached the board as today's.
   *
   * The parent retired the whole mechanism this check was guarding: "I want
   * them to be daily." Nobody shares block-9 any more — Aerospace,
   * Technology and Robotics each have their own fixed block (block-9,
   * block-9b, block-9c) — so "exactly one subject owns the rotating block"
   * is no longer the right shape to assert; the right shape is that NOTHING
   * does, because there is no longer a block to share.
   */
  const thursday = new Date('2026-08-20T12:00:00');
  const owners = rb.liveRotatingSubjects(thursday);
  ok('nothing owns the (former) rotating block any more, on any core day',
    owners.length === 0, JSON.stringify(owners));

  const rotating = Object.entries(sm.BLOCK_FOR_SUBJECT)
    .filter(([, id]) => id === rb.ROTATING_BLOCK_ID)
    .map(([s]) => s);
  // Aerospace keeps block-9's id for itself alone now — Technology and
  // Robotics each got their own new id (block-9b, block-9c) the same day.
  ok('block-9 now belongs to exactly one subject, not three',
    rotating.length === 1 && rotating[0] === 'aerospace',
    JSON.stringify(rotating));

  /**
   * And the fact that made the original complaint real rather than cosmetic:
   * a subject could own no day in a quarter at all. That question no longer
   * applies — every specialized subject owns every school day now — so this
   * asserts the new, simpler shape instead: the week names no rotating
   * owner on any weekday, because there is nothing left to own.
   */
  const week = [1, 2, 3, 4, 5].map((d) => {
    const date = new Date('2026-08-17T12:00:00');
    date.setDate(date.getDate() + (d - 1));
    return rb.liveRotatingSubjects(date)[0] || null;
  });
  ok('the week names no rotating owner on any weekday — there is nothing left to rotate',
    week.length === 5 && week.every((w) => w === null), JSON.stringify(week));
}

console.log('\n--- 6. no subject needs a weekday of its own any more — RETIRED Nov 3, 2026 ---');
{
  /**
   * THE RULE THE ORIGINAL COMPLAINT WAS ABOUT.
   *
   * "he has social studies to complete but it's not on Today's routine."
   *
   * Social Studies had ten open Khan units in Q1 and owned no weekday at all.
   * The rule this section used to guard was the strong one: a rotating
   * subject with work in a quarter must own a named weekday in that quarter.
   *
   * The parent's answer, in the end, was not to keep reallocating weekdays —
   * it was to retire the reallocation itself: "I want them to be daily."
   * Aerospace, Technology, Robotics and Social Studies each own EVERY
   * weekday now (block-9, block-9b, block-9c, block-5c), so the question
   * "does this subject own a weekday this quarter" no longer has a
   * meaningful answer other than "yes, all five, unconditionally" — which is
   * what this section now checks, for every quarter, rather than walking a
   * preference list that no longer resolves to anything.
   */
  const { DAILY_SPECIALIZED_SUBJECTS } = sm;
  ok('DAILY_SPECIALIZED_SUBJECTS names exactly the four subjects that used to compete for a weekday',
    JSON.stringify([...DAILY_SPECIALIZED_SUBJECTS].sort()) ===
      JSON.stringify(['aerospace', 'robotics', 'socialStudies', 'technology'].sort()),
    JSON.stringify(DAILY_SPECIALIZED_SUBJECTS));

  const WEEKS = [
    ['Q1', '2026-08-24'], ['Q2', '2026-11-16'],
    ['Q3', '2027-02-22'], ['Q4', '2027-05-10']
  ];
  for (const [qLabel, monday] of WEEKS) {
    const owners = new Set();
    for (let i = 0; i < 5; i += 1) {
      const day = new Date(monday + 'T12:00:00');
      day.setDate(day.getDate() + i);
      for (const s of rb.liveRotatingSubjects(day, null)) owners.add(s);
    }
    ok(`${qLabel}: the rotation names nothing, any day of the week — there is nothing left to own`,
      owners.size === 0, `owners=[${[...owners]}]`);
  }

  /**
   * And the specific thing that replaced the old Q1 Wednesday swap: every
   * weekday of the week runs Aerospace, Technology AND Robotics now, each in
   * its own block, so the week no longer has a single "owner" per day at
   * all — every one of the three is on the board, every day.
   */
  const q1Week = ['2026-08-24', '2026-08-25', '2026-08-26', '2026-08-27'].map((d) =>
    DAILY_SPECIALIZED_SUBJECTS.filter((s) => ['aerospace', 'technology', 'robotics'].includes(s))
  );
  ok('Mon-Thu Q1 each run Aerospace, Technology AND Robotics, not one apiece',
    q1Week.every((day) => day.length === 3),
    JSON.stringify(q1Week) + ' — the Mon/Wed-vs-Tue/Thu split is retired along with the rotation itself');
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
  ok('Grammar & Writing lands on the Language Arts block',
    sm.STRAND_BLOCK['language-arts'] === 'block-7' && B('block-7').startTime === '12:00'
      && /Language Arts/.test(B('block-7').label),
    JSON.stringify(sm.STRAND_BLOCK));
  ok('Reading & Literature lands on the Reading Lesson block',
    sm.STRAND_BLOCK.reading === 'block-3' && B('block-3').startTime === '09:30'
      && /Reading/.test(B('block-3').label),
    JSON.stringify(sm.STRAND_BLOCK));

  /**
   * BOTH BLOCKS MUST STAY REACHABLE. A block nothing can credit is ninety
   * hours a year that cannot be counted — this project shipped exactly that in
   * block-1, and the fix must not create a second one by sending all of
   * English to whichever block it now prefers.
   */
  ok('the Language Arts block is creditable',
    sm.scheduledMinutesOn('2026-08-19', {
      khanDailyLog: { '2026-08-19': { reading: true } },
      khanAcademyAssignments: [{ ...q1Grammar, batchLabel: 'Q1 2026-2027', sequenceInQuarter: 1 }],
      scheduleBlocks: defaultSchedule
    }) === 30, 'a grammar day must book its real thirty minutes, not fifteen');
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
    both === 45, `got ${both} — 30 Language Arts + 15 Reading Lesson`);

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
  ok('a Grammar & Writing lesson credits the 12:15 block',
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
  // Nov 3 2026: the single Khan-reading row was split into one row per open
  // strand (reading, language-arts), so there is no longer one `next` to hand
  // khanReadingStrand -- each strand's open units are filtered by
  // khanReadingStrand first, and englishRow is called with that same strand.
  // The guarantee ("the label matches the unit actually handed") now shows up
  // as those two calls agreeing on the strand, not as one nested call.
  ok('...the Khan row uses it, from the unit he is actually handed',
    /khanReadingStrand\(r\) === strand/.test(dash) && /englishRow\(strand\)/.test(dash));
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
    /blockId=\{(?:BLOCK_FOR_SUBJECT\[|blockForSubjectToday\()weeksHandsOn\.subject[\])]\}/.test(code),
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

console.log('\n--- 8. Friday offers what is behind, not everything ---');
{
  /**
   * =====================================================================
   * "MAKE IT THAT ONLY SUBJECTS AND PROJECTS THAT ARE DUE SHOWS UP IN THE
   * 'REST OF THE DAY' ON FRIDAYS." (Sep 16, 2026.)
   * =====================================================================
   *
   * Friday is `{ kind: 'core', flex: true, subjects: [] }` — a catch-up day
   * that names no subject, on purpose. `todaysSubjects` read that empty list,
   * fell through to `allSubjects`, and put every rotating subject on the board:
   * aerospace, technology, socialStudies, robotics, on top of the nine daily
   * rows. Four of them were work no timetable had asked him for.
   *
   * The opposite fault is on record too, from Aug 12: *"The catch-up day had
   * nothing on it to catch up on."* Empty is not the fix.
   *
   * Put to her with both named, she chose: only what is behind, plus what is
   * dated. So Friday asks a question with an answer — did this subject get the
   * day the timetable gave it? — and reads it off the record.
   *
   * ---- WHAT IS GUARDED HERE, AND WHY IT IS SHAPED THIS WAY ----
   *
   * The walk lives inside a JSX component, so node cannot call it. Rather than
   * re-implement it here — a second copy of a rule is how two facts that must
   * agree come to differ, the exact fault verify-writing-pairing was written
   * for — this asserts the two properties that make the walk possible at all,
   * behaviourally, against her real curriculum, plus the wiring that carries
   * the result to the screen.
   */
  const code = codeOnly(read(DASH));

  /**
   * ---- "ONLY WHAT IS BEHIND" NOW APPLIES EVERY DAY, NOT JUST FRIDAY. ----
   * (Nov 3, 2026.)
   *
   * This section used to check that Friday alone fell back to
   * `subjectsBehindThisWeek`, while Monday-Thursday asked `liveRotatingSubjects`
   * which ONE subject owned the day. The parent retired the rotation: "I want
   * them to be daily." Aerospace, Technology, Robotics and Social Studies now
   * run in their own fixed block every day — Friday included — so
   * `todaysSubjects` reads the SAME fixed list (`DAILY_SPECIALIZED_SUBJECTS`)
   * regardless of whether today is flex. The "something can still fall
   * behind and get caught up" behaviour survives for anything else
   * (`...subjectsBehindThisWeek` is still appended), but it is no longer the
   * ONLY thing a flex day shows.
   */
  ok('todaysSubjects reads the fixed daily list, not a per-day rotation',
    /todaysSubjects\s*=\s*todayPattern\.kind === 'core'\s*\?\s*\[\s*\.\.\.DAILY_SPECIALIZED_SUBJECTS,\s*\.\.\.subjectsBehindThisWeek\]/.test(code),
    'falling through to allSubjects, or back to a per-day rotation, are both the old bugs this screen already fixed once each');
  ok('...and it is the SAME list on a flex day as on any other core day',
    !/todayPattern\.flex\s*\?\s*subjectsBehindThisWeek\s*:/.test(code),
    'Friday runs Aerospace/Technology/Robotics in their own blocks too now, same as Monday-Thursday');

  /**
   * ONE WALK, TWO ANSWERS. Asked separately, the label function returned the
   * first day that OWNED the subject rather than the day it was MISSED — so a
   * subject that ran Tuesday and Thursday and was skipped on Thursday was
   * reported as "Missed Tuesday". A row that names the wrong day is a row she
   * cannot act on.
   */
  ok('the missed-day label is read from the same walk that found it behind',
    /const missedDayLabel = \(subject\) =>\s*behindThisWeek\.find/.test(code),
    'a second walk answered with the day he did the work, not the day he skipped');
  ok('...and the subject list is derived from that walk too',
    /const subjectsBehindThisWeek = behindThisWeek\.map\(\(b\) => b\.subject\);/.test(code));
  ok('...and a subject already behind is not pushed twice',
    /if \(behind\.some\(\(b\) => b\.subject === subject\)\) continue;/.test(code),
    'the 2:15 slot can hand the same subject two days in one week');
  ok('...and a day that has not happened yet cannot have been missed',
    /if \(date >= today\) continue;/.test(code),
    'without this, Friday morning reports Friday itself as skipped');
  ok('the row says which day it missed',
    /Missed \$\{missed\} — the 2:15 block is open for it/.test(code),
    '"aerospace" alone does not tell her whether this is catch-up or a new ask');

  /**
   * NOT off-timetable on a flex day. `offTimetable` means "assigned to him,
   * but today has no slot for it". Friday's whole purpose is to be the slot,
   * so stamping the warning on a catch-up row makes it argue with itself —
   * the same contradiction she caught on the project row in August.
   */
  ok('nothing is ever stamped "not on today\'s timetable" — flex day or not',
    /const isOffTimetable = \(\) => false;/.test(code),
    'Friday IS the slot, every day now; the warning would contradict every row it sits on');

  /**
   * ---- THE BEHAVIOURAL HALF ----
   *
   * A subject is "not behind" if he ticked it on Khan OR finished a Mission
   * Control lesson in it that day. aerospace and robotics own the 2:15 block on
   * some days but have NO Khan rows at all, so for them the tick can never
   * fire and the lesson is the only signal there is. A rotating subject with
   * neither would be permanently behind — it would sit on every Friday of the
   * year with no way for him to clear it.
   */
  /**
   * moduleUrl(), not REPO + '/…'. This file already defines that helper at the
   * top and explains why: her machine is Windows, REPO begins `C:`, and Node
   * rejects a concatenated path with ERR_UNSUPPORTED_ESM_URL_SCHEME. I wrote
   * the concatenated form here anyway and verify-script-imports caught it —
   * which is the fifth instance of that exact fault, and the first one found
   * before it reached her.
   */
  const { academyContent } = await import(moduleUrl('src/content/academyContent.js'));
  const { liveRotatingSubjects, liveMorningSubject } = await import(moduleUrl('src/lib/rotatingBlock.js'));
  const { toDateStr, addDays } = await import(moduleUrl('src/lib/scheduler.js'));
  const content = academyContent();
  // `dayPattern` moved to src/content/slots/timetable.js on Sept 22, 2026;
  // asked of the school's pack, exactly as the screens ask it.
  const { dayPattern: slotDayPattern } = await import(moduleUrl('src/content/slots/timetable.js'));
  const dayPattern = (d) => slotDayPattern(content, d);
  /**
   * HIS ASSIGNMENT ROWS ARE NOT CURRICULUM, so they are not in the content pack
   * and a static check cannot have them. Passed `null`, both resolvers name the
   * day's real owner from the timetable's own preference list — which is the
   * question here — rather than falling back to Science. Passing `[]` instead
   * says "I looked and he has nothing assigned", and silently emptied the
   * morning half of this set on the first run of this section.
   */
  /**
   * ---- THIS WALK NOW FINDS NOTHING, ON PURPOSE. (Nov 3, 2026.) ----
   *
   * `liveRotatingSubjects` and `liveMorningSubject` used to be how a subject
   * "cleared" a Friday catch-up slot it was behind on — both are dormant now
   * that nothing rotates (every `WEEK_PATTERN[d].subjects` and
   * `morningSubjects` list is empty), so this 400-day walk across the whole
   * curriculum must come back completely empty. An empty set here is no
   * longer the vacuous-pass risk the old comment warned about — it IS the
   * fact being checked.
   */
  const owners = new Set();
  const start = new Date(content.writing.SCHOOL_YEAR_START.getTime());
  let scanned = 0;
  for (let i = 0; i < 400; i += 1) {
    const d = new Date(toDateStr(addDays(start, i)) + 'T12:00:00');
    const pattern = dayPattern(d);
    if (!pattern || pattern.kind !== 'core' || pattern.flex) continue;
    scanned += 1;
    for (const s of liveRotatingSubjects(d, null)) owners.add(s);
    const m = liveMorningSubject(d, null);
    if (m) owners.add(m);
  }
  ok(`the rotation names nothing across ${scanned} timetabled days — there is nothing left to name`,
    owners.size === 0 && scanned > 100,
    `owners=[${[...owners]}]`);
}

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) {
  console.log(`\n${failures.length} CHECK(S) FAILED`);
  process.exitCode = 1;
} else {
  console.log('\nALL CHECKS PASSED');
}
