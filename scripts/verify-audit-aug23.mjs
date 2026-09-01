import './lib/academy-under-test.mjs';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * ============================================================================
 * THE AUG 23 2026 AUDIT — ONE GUARD PER THING THAT WAS WRONG.
 * ============================================================================
 *
 * The parent: **"Audit the app to find any mistakes. I have made multiple
 * changes since the original master plan was created. I want to make sure it
 * isn't missing anything and everything is linked to where it needs to be
 * linked."**
 *
 * Every check below stands for a defect that was found, confirmed against the
 * code, and fixed that day. They are grouped the way the findings were:
 * grades, the two computers, the records, and the screens.
 *
 * ---- HOW THESE ARE WRITTEN ----
 *
 * Assert the PROPERTY, not the punctuation. Seven guards in this repo have
 * already had to be rewritten because they pinned an exact line and broke the
 * moment the line was reformatted, and two more passed against their own
 * explanatory comment. So: presence is asserted against the file, absence
 * against `codeOnly()`, and every check here was mutation-tested — the fix was
 * reverted and the check confirmed to FAIL — before being committed.
 */

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (rel) => fs.readFileSync(path.join(REPO, rel), 'utf8');
/** Comments stripped — absence is asserted against code, never raw source. */
const codeOnlyStore = (t) => t
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/^\s*\/\/.*$/gm, '');

/** Strip comments before asserting a string is ABSENT. */
const codeOnly = (t) =>
  t
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, '')
    .replace(/^\s*\/\/.*$/gm, '');

let passed = 0;
const failures = [];
function ok(label, cond, why = '') {
  if (cond) {
    passed += 1;
    console.log(`PASS  ${label}`);
  } else {
    failures.push(label);
    console.log(`FAIL  ${label}${why ? '  ' + why : ''}`);
  }
}

const store = read('src/store/useAppStore.js');
const storeCode = codeOnly(store);
const parent = read('src/components/Dashboard/ParentDashboard.jsx');
const compliance = read('src/components/Dashboard/ComplianceSection.jsx');
const packet = read('src/lib/compliancePacket.js');
const driveLinks = read('src/lib/driveLinks.js');
const dashboard = read('src/components/Dashboard/MissionControlDashboard.jsx');
const morning = read('src/components/Morning/MorningMeeting.jsx');

console.log('--- 1. every grade she enters reaches the record ---');
{
  ok(
    'the one-tap writing letter becomes a percentage',
    /const gradePercent = letterToPercent\(grade\);/.test(store) &&
      /const changes = \{ grade, gradedAt, rubric: null, gradePercent \};/.test(store),
    'the Mission Control Board is the screen she grades on; it wrote gradePercent: null and the average excluded every row'
  );
  ok(
    '...and nothing writes gradePercent: null onto a graded row any more',
    !/gradePercent: null \}/.test(storeCode),
    'that value is exactly what the Number.isFinite filter drops'
  );
  ok(
    'the letters already graded are repaired, not just the next ones',
    /const writingEntriesRepaired = writingEntries\.map\(\(entry\) => \{/.test(store) &&
      /writingEntries: writingEntriesRepaired,/.test(store),
    'fixing the writer fixes only what happens next — the rows on disk stay uncounted forever'
  );
  ok(
    '...on every hydrate, because his computer runs an older build for days',
    !/\.upgrade\(\s*\(\)\s*=>[^)]{0,200}gradePercent/.test(storeCode),
    'a Dexie upgrade fires once; a machine still on the old code keeps producing these and they arrive by import'
  );
  ok(
    '...filling only a hole, never overwriting a rubric she chose',
    /if \(!entry\?\.grade \|\| Number\.isFinite\(entry\.gradePercent\)\) return entry;/.test(store) &&
      /if \(gradePercent === null\) return entry;/.test(store),
    'idempotent, and an unrecognised letter is left alone rather than guessed at'
  );
  ok(
    '...and written back to disk, not just to the screen',
    /writingPercentBackfill\.map\(\(r\) => updateWritingEntryRecord\(r\.id, \{ gradePercent: r\.gradePercent \}\)\)/.test(store),
    'a repair that only touches memory is undone by the next reload'
  );
  ok(
    'a writing entry can name a subject from ANY prompt pool',
    /const WRITING_PROMPT_POOLS = \[/.test(store) &&
      /const PROMPT_SUBJECT = new Map\(\)/.test(store) &&
      /PROMPT_SUBJECT\.get\(entry\.promptId\)/.test(store),
    '32 project write-ups (bottle rocket, sun survey, 13 experiments) resolved to null and could reach no subject'
  );
  ok(
    '...built from all six pools, not just writingPrompts',
    ['writingPrompts', 'aerospaceProjects', 'scienceExperiments', 'technologyProjects', 'roboticsProjects', 'gardenProjects'].every(
      (pool) => new RegExp(`WRITING_PROMPT_POOLS = \\[[\\s\\S]{0,400}\\b${pool}\\b`).test(store)
    )
  );
  ok(
    'writing is scoped to the school year like every other source',
    /inSchoolYear\(e\.gradedAt \|\| e\.completedAt\)/.test(store),
    'it was the one source with no in-year test, so a pre-Aug-2026 entry still counted'
  );
  ok(
    'the report card returns a count for all six sources',
    ['khanGradedCount', 'assignmentGradedCount', 'wordStudyQuarters', 'writingGradedCount', 'reflectionGradedCount', 'reflectionQuarters'].every(
      (k) => new RegExp(`${k}[,:]`).test(store)
    ),
    'two sources moved the grade and were returned in no count, so no screen could name them'
  );
}

console.log('\n--- 2. no single source can dominate a subject grade ---');
{
  ok(
    'reflections collapse to one grade per quarter',
    /const reflectionByQuarter = new Map\(\)/.test(store) && /const reflectionQuarters = /.test(store),
    'uncapped they were 46-64% of four subjects — the same fault the Friday word tests already had'
  );
  ok(
    '...and it is the quarterly figure that is averaged, not each one',
    /reflectionQuarters\.map\(\(q\) => \(\{ value: q\.percent \/ 100/.test(store) &&
      !/\.\.\.reflectionGraded\.map\(\(r\) => \(?\{? ?value: r\.pct/.test(storeCode)
  );
  ok(
    'a quarterly exam weighs what its quarter weighs',
    /const examWeight = \(lesson\) =>/.test(store) && /l\.isQuarterlyExam \? examWeight\(l\) : 1/.test(store),
    'one exam was 0.7% of Aerospace — he could fail every exam and finish with an A'
  );
  ok(
    '...counted from the lessons he actually sat that quarter',
    /lessonsSatInQuarter/.test(store) && /if \(l\.isQuarterlyExam \|\| !l\.quarter\) continue;/.test(store)
  );
  ok(
    'the average is genuinely weighted, not just tagged',
    /const weightTotal = allScores\.reduce\(\(acc, s\) => acc \+ s\.weight, 0\);/.test(store) &&
      /acc \+ s\.value \* s\.weight, 0\) \/ weightTotal/.test(store),
    'weights that nothing divides by are decoration'
  );
}

console.log('\n--- 3. one grading scale, everywhere ---');
{
  ok(
    'the subject letter comes from the shared scale',
    /function accuracyToLetterGrade\(accuracy\) \{\s*return percentToLetter\(/.test(store),
    'a second 5-band scale printed 80.5% as a flat B while the dashboard told her the scale was B-'
  );
  ok(
    '...and the old five-band ladder is gone from the code',
    !/if \(pct >= 90\) return 'A';/.test(storeCode),
    'every subject in a minus band was overstated by a full notch on the transcript'
  );
}

console.log('\n--- 4. the transcript says what the grade was built from ---');
{
  ok(
    'the evidence line names every source that moved the grade',
    ['assignmentGradedCount', 'wordStudyQuarters', 'writingGradedCount', 'reflectionQuarters'].every((k) =>
      new RegExp(`row\\.${k}`).test(parent)
    ),
    'a subject graded by book reports transcribed as "Grade: B — Curriculum: No graded work recorded"'
  );
  ok(
    'the standardized test score prints in the records packet',
    /kind === 'test' && record\.score/.test(packet),
    'the packet named the test and withheld the result, under the heading "Standardized Test Records"'
  );
  ok(
    'both legal-record downloads attach their anchor to the document',
    /document\.body\.appendChild\(a\);[\s\S]{0,80}a\.click\(\);/.test(parent) &&
      /document\.body\.appendChild\(a\);[\s\S]{0,80}a\.click\(\);/.test(compliance),
    'Firefox ignores a click on a detached anchor — the transcript and the packet were the two without the fix'
  );
}

console.log('\n--- 5. the two computers ---');
{
  ok(
    'the exercise-video safety switch travels',
    /importedData\.exerciseVideosEnabled/.test(store),
    'she turned demo videos OFF, he imported, and his machine kept showing them while merging in the URL map'
  );
  ok(
    '...along with the other two settings that were exported and dropped',
    /importedData\.exerciseVideoSourceId/.test(store) && /importedData\.supplyCrateEnabled/.test(store)
  );
  ok(
    '...on a rule that can actually fire',
    /const offWins = \(localValue, incomingValue\) => localValue !== false && incomingValue !== false;/.test(store) &&
      !/state\.exerciseVideosEnabled !== undefined/.test(storeCode) &&
      !/state\.supplyCrateEnabled !== undefined/.test(storeCode) &&
      !/state\.classBellEnabled !== undefined/.test(storeCode),
    'these all default to true in initialState, so "!== undefined" is never false and the imported value was never read'
  );
  ok(
    '...with OFF winning across both machines',
    /const exerciseVideosEnabled = offWins\(state\.exerciseVideosEnabled, importedData\.exerciseVideosEnabled\);/.test(store) &&
      /const supplyCrateEnabled = offWins\(state\.supplyCrateEnabled, importedData\.supplyCrateEnabled\);/.test(store) &&
      /const classBellEnabled = offWins\(state\.classBellEnabled, importedData\.classBellEnabled\);/.test(store),
    'the failure that matters for a teen-content switch is an OFF being lost, never an OFF spreading'
  );
  ok(
    '...and all three are actually written to meta',
    /saveMeta\(\{[^}]*exerciseVideosEnabled[^}]*supplyCrateEnabled[^}]*\}\)/.test(store.replace(/\n/g, ' ')),
    'merging a value into a local and never persisting it is the same bug one step later'
  );
  ok(
    'a study cycle merges day by day',
    /const STUDY_CYCLE_DAY_FIELDS = \[/.test(store),
    '"first import wins" froze her tracker on Day 1 for the rest of the quarter'
  );
  ok(
    'a PE weekly goal can still be achieved after the first import',
    /achieved: Boolean\(local\.achieved\) \|\| Boolean\(incoming\?\.achieved\)/.test(store),
    'the Friday "achieved" write could never arrive, so every week showed unachieved forever'
  );
  ok(
    '...and neither merge skips a key it already has',
    !/if \(peWeeklyGoals\[weekKey\]\) continue;/.test(storeCode) && !/if \(studyCycles\[key\]\) continue;/.test(storeCode)
  );
  ok(
    'a custom book or assignment crosses to the other computer',
    /const customKeyOf = \(row\) =>/.test(store) && /if \(!incoming\?\.title \|\| !addFn\) continue;/.test(store),
    'everything she added beyond the seeded slots existed only on the machine she typed it on'
  );
  ok(
    '...and is re-read so its new id is real before she can click it',
    /freshBooks, freshAcademicAssignments\] = await Promise\.all/.test(store),
    'an inserted row carries no ++id until Dexie assigns one'
  );
  ok(
    'the attendance merge baselines off the full table, not the 60-day window',
    /const khanDailyBaseline = Object\.fromEntries\(dbKhanDailyLog\.map/.test(store) &&
      /const morningBaseline = Object\.fromEntries\(dbMorningMeetings\.map/.test(store),
    'khanDailyLog IS the Georgia evidence — outside the window the monotonic merge became an overwrite'
  );
  ok(
    '...while the screens still get their window',
    /const withinWorkingWindow = \(byDate\) =>/.test(store)
  );
  /**
   * Aug 23, later. The check above passed on a live defect: it asserted the
   * baseline was built from the full table and said nothing about its SHAPE.
   * `state.khanDailyLog` is date -> subjects; `state.morningMeetings` is
   * date -> row. Both were mapped to `r`, so the Khan merge folded whole rows
   * into subject maps and reached her real database. A baseline must mirror
   * exactly what hydrate puts in state.
   */
  ok(
    '...and each baseline mirrors the shape hydrate actually stores',
    /dbKhanDailyLog\.map\(\(r\) => \[r\.date, r\.subjects \|\| \{\}\]\)/.test(store) &&
      /dbMorningMeetings\.map\(\(r\) => \[r\.date, r\]\)/.test(store),
    'khanDailyLog is keyed to the subjects object, morningMeetings to the whole row — they are not interchangeable'
  );
  ok(
    'a day of ticks can only ever hold subject booleans',
    /Object\.entries\(subjects\)\.filter\(\(\[, v\]\) => typeof v === 'boolean'\)/.test(store) &&
      /bulkPutKhanDailyLog\(khanDailyRepairs\)/.test(store),
    'coveredBlockIds credits instructional minutes from this map, so junk here is junk in the Georgia record'
  );
}

console.log('\n--- 6. links and screens ---');
{
  ok(
    'the reference-link types live in one place',
    /export const REFERENCE_LINK_TYPES = \[/.test(driveLinks),
    'two copies is how a type comes to be rendered as a link without being checked as one'
  );
  ok(
    '...and the assignment link is normalised before it is stored',
    /REFERENCE_LINK_TYPES\.includes\(referenceType\)\s*\?\s*normalizeEvidenceUrl\(referenceDetails\)\.url/.test(store),
    'a scheme-less paste became a RELATIVE href that navigated the app to a broken in-app path'
  );
  ok(
    '...but a book title is left alone',
    /: referenceDetails \|\| ''/.test(store),
    'the same field holds "Hidden Figures, ch. 4" for the non-link types'
  );
  ok(
    'the morning meeting keeps the question he wrote',
    /useState\(existing\?\.question \|\| ''\)/.test(morning),
    'pressing Finish a second time that day wrote an empty string over it'
  );
  ok(
    'he can see a message from Mom without going to look for it',
    /const unreadFromMom = useAppStore\(/.test(dashboard) && /badge=\{unreadFromMom > 0 \? unreadFromMom : null\}/.test(dashboard),
    'QuietTile has always accepted a badge and was never passed one — the morning-meeting question had no closing half'
  );
}

console.log('\n--- N-1: nothing in this app is written and mounted nowhere ---');
{
  /**
   * =========================================================================
   * ---- TEN COMPONENTS NOBODY COULD REACH. (Audit item N-1, Aug 25, 2026.) ----
   * =========================================================================
   *
   * Nine Dashboard cards and `Schedule/DailySchedule.jsx`, imported by nothing
   * — not statically, not lazily. They were the pre-rebuild home screen: the
   * Aug 7 pass replaced fourteen cards with one ordered list and left the old
   * cards on disk.
   *
   * Dead code that LOOKS live is worse than dead code that looks dead. Every
   * one of those files was full of real, careful reasoning about how a thing
   * should behave, and a future reader — me, six weeks from now — has no way to
   * tell from the file which of them the app actually runs.
   *
   * TWO RULES WERE MIGRATED BEFORE THEY WERE DELETED, because a cleanup that
   * silently drops behaviour is a regression wearing a tidy hat:
   *
   *   - `PEMissionCard` was the only place that named the day's workout on the
   *     board. The live row said "Today's workout" while getTodaysWorkout knew
   *     it was "Wednesday: Cardio + Stretching, 4 exercises".
   *   - It was also the only place in the app that cross-checked the workout
   *     against the daily trackers — two records for the same day, where doing
   *     one is the moment you are most likely to forget the other.
   *
   * ONE RULE WAS DELIBERATELY NOT MIGRATED, and it is written down here rather
   * than lost quietly: `WritingJournalCard` carried a seven-day quiet rule
   * ("he has not written in a week"). Since the daily drill shipped it runs
   * Monday to Thursday and each day is its own row, so a silent week already
   * shows as four unticked drills. A second nudge saying the same thing is
   * noise on a board this dense.
   *
   * THE CHECK IS THE POINT. Deleting ten files fixes today; asserting that
   * every component is reachable is what stops the eleventh.
   */
  const componentsDir = path.join(REPO, 'src/components');
  const walk = (dir, out = []) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) walk(full, out);
      else if (e.name.endsWith('.jsx')) out.push(full);
    }
    return out;
  };
  const srcFiles = (function all(dir, out = []) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) all(full, out);
      else if (/\.jsx?$/.test(e.name)) out.push(full);
    }
    return out;
  })(path.join(REPO, 'src'));

  const components = walk(componentsDir);

  /**
   * EVERY FILE IS READ ONCE. The first version read all ~300 source files
   * again for each of the 124 components — thirty-seven thousand reads. On my
   * disk that is a second; over the bridge to her machine it timed out, and a
   * guard that times out is a guard that gets skipped. Collect the imported
   * basenames once, then it is a set lookup per component.
   */
  const imported = new Set();
  const selfNames = new Map();
  for (const f of srcFiles) {
    const text = fs.readFileSync(f, 'utf8');
    selfNames.set(f, text);
    // Static `from '.../Name.jsx'` and lazy `import('.../Name.jsx')` alike.
    for (const m of text.matchAll(/['"`][^'"`]*\/([A-Za-z0-9_-]+)\.jsx['"`]/g)) {
      imported.add(m[1]);
    }
  }
  const orphans = [];
  for (const c of components) {
    const base = path.basename(c, '.jsx');
    if (imported.has(base)) {
      // A file that imports only ITSELF is still an orphan. Rare, but the
      // cheap version of this check cannot see it, so it is checked here.
      const others = srcFiles.filter((f) => f !== c);
      const re = new RegExp(`['"\`][^'"\`]*\\/${base}\\.jsx['"\`]`);
      if (others.some((f) => re.test(selfNames.get(f)))) continue;
    }
    orphans.push(path.relative(componentsDir, c));
  }
  ok(`every one of the ${components.length} components is imported somewhere`,
    orphans.length === 0,
    orphans.join(', ') + ' — dead code that looks live');

  /** And the two migrated rules have to actually be on the board. */
  const board = read('src/components/Dashboard/MissionControlDashboard.jsx');
  ok('...the PE row names the workout it is asking him to do',
    /todaysWorkout \? `\$\{todaysWorkout\.dayName\}: \$\{todaysWorkout\.title\}`/.test(board),
    'it said "Today\'s workout" while the app knew it was "Wednesday: Cardio + Stretching"');
  ok('...and the workout is cross-checked against the daily trackers',
    /peTrackersStarted/.test(board)
      && /Workout logged — water, sleep and protein are still empty for today/.test(board)
      && /Trackers started\. Workout still to do\./.test(board),
    'the only such check in the app lived in a file nothing mounted');
}

console.log('\n--- O-1: the comments describe the app that exists ---');
{
  /**
   * =========================================================================
   * ---- A PLAN THAT WAS REVERSED, STILL WRITTEN DOWN AS FACT ----
   * =========================================================================
   *
   * Summer 2027 English is deliberately EMPTY — a book he picks himself, from
   * the Academic Center's free-choice Reading Assignment. `scienceSequence.js`
   * quotes the decision: "Summer — 0 units. Reserved for summer reading."
   *
   * Two places in the store still described the opposite:
   *
   *   1. A comment above `readingSummerRows = []` explaining, in detail, five
   *      units that had been "pulled in ... each individually verified" — beside
   *      an array that adds none of them.
   *   2. The ELA placement map placed SEVEN titles into 'Summer 2027'. That map
   *      only re-sequences rows that already exist, and `readingSummerRows` is
   *      empty, so not one of them could ever match anything.
   *
   * Neither was a runtime bug, which is exactly why they survived an audit and
   * six weeks of work. A comment that states a reversed plan as fact costs the
   * next reader — most often me — an hour of believing the app does something
   * it does not, and it is the kind of thing that gets acted on.
   */
  const storeCode = codeOnlyStore(read('src/store/useAppStore.js'));
  const elaSummer = [...storeCode.matchAll(/'[^']*(?:Borders|Long Passage Practice \(10th|ELA — Course Challenge)[^']*':\s*\{ batchLabel: 'Summer 2027'/g)];
  ok('no ELA unit is placed into a summer that has no ELA', elaSummer.length === 0,
    `${elaSummer.length} placements that can never match a row`);
  ok('...and the summer reading seed is still empty',
    /const readingSummerRows = \[\];/.test(storeCode),
    'summer English is a book he chooses, not a Khan roster');

  const storeRaw = read('src/store/useAppStore.js');
  ok('...and says WHY it is empty, where the wrong story used to be',
    /DELIBERATELY EMPTY/.test(storeRaw) && /Reserved for summer reading/.test(storeRaw),
    'an empty array with no explanation is the next person filling it back in');
  ok('...with the reversed plan no longer stated as fact',
    !/each individually verified/.test(storeRaw),
    'it described five units being pulled in, beside an array that adds none');
}

console.log('\n--- O-2: the 12:30 block has grammar again, and it credits 60 minutes ---');
{
  /**
   * =========================================================================
   * ---- WHAT THE AUDIT SAID, AND WHAT WAS ACTUALLY WRONG ----
   * =========================================================================
   *
   * Recorded as "Khan ticks credit 15 minutes instead of 60 from Nov 2."
   * Checked against her real data, the routing was CORRECT: Q2-Q4's Khan ELA
   * rows are reading-and-vocabulary courses, and the 10:00 Reading Lesson is
   * where reading belongs.
   *
   * The real gap was upstream and larger. **Khan's general Grammar course is
   * ten units and Q1 uses all ten.** From November there was no grammar left
   * to assign at all, and the 12:30 Language Arts block ran on the daily
   * writing drill alone. A content cliff, not a routing bug.
   *
   * Khan added grade-banded grammar courses in summer 2026 — after this app's
   * roster was written. `Grammar: 7th and 8th grade`, nine units, 74 skills,
   * his exact grade band, and his weakest IXL strand.
   *
   * THE TRAP INSIDE THE FIX: `khanReadingStrand` decides the block BY URL, and
   * it only knew the old `/humanities/grammar/` course. Seeding the new rows
   * without teaching it the new path would have booked grade-level grammar as
   * fifteen minutes of reading — recreating the exact fault, inside its own
   * fix. That is what most of these checks are for.
   */
  const gco = await import(REPO + '/src/academies/lamar/data/khan/grammarCourseOrder.js');
  const sm = await import(REPO + '/src/lib/scheduledMinutes.js');

  ok('the grade 7-8 grammar course has all nine units',
    gco.KHAN_G78_GRAMMAR_UNITS.length === 9,
    String(gco.KHAN_G78_GRAMMAR_UNITS.length));
  ok('...in Khan\'s own order, numbered 1-9',
    gco.KHAN_G78_GRAMMAR_UNITS.every((u, i) => u.unit === i + 1));
  ok('...every slug carrying the course id read off the live page',
    gco.KHAN_G78_GRAMMAR_UNITS.every((u) => u.slug.startsWith('x9e6f4267f632f2c6:')),
    'nothing here was inferred from the pattern — see the note in that file');

  // THE LOAD-BEARING CHECK. Every unit must route to the 60-minute block.
  for (const u of gco.KHAN_G78_GRAMMAR_UNITS) {
    const url = gco.g78GrammarUrl(u.slug);
    const strand = sm.khanReadingStrand({ khanAcademyUrl: url });
    ok(`"${u.khanTitle}" credits the 12:30 Language Arts block`,
      sm.STRAND_BLOCK[strand] === 'block-7',
      `routed to ${sm.STRAND_BLOCK[strand]} — 15 minutes instead of 60`);
  }
  ok('the course challenge counts as grammar too',
    sm.STRAND_BLOCK[sm.khanReadingStrand({
      khanAcademyUrl: 'https://www.khanacademy.org' + gco.KHAN_G78_GRAMMAR_CHALLENGE
    })] === 'block-7');

  // ...and nothing that was working got broken.
  ok('Q1\'s general grammar course still routes to the same block',
    sm.STRAND_BLOCK[sm.khanReadingStrand({
      khanAcademyUrl: 'https://www.khanacademy.org/humanities/grammar/parts-of-speech-the-noun'
    })] === 'block-7',
    'the old course carries Q1 and must keep working');
  ok('...and a reading unit is still reading, not grammar',
    sm.STRAND_BLOCK[sm.khanReadingStrand({
      khanAcademyUrl: 'https://www.khanacademy.org/ela/7th-grade-reading-and-vocabulary/x7538838f96af3430:mysteries'
    })] === 'block-3',
    'over-matching would book every reading unit as an hour of grammar');

  // The seed plan: which quarters get grammar at all.
  //
  // This block used to assert `GRAMMAR_BY_QUARTER`, a map that no longer
  // exists — the Aug 28 rebuild replaced it with GRAMMAR_LADDER_SPEC, which
  // climbs one grade band per quarter instead of jumping 5th to 7th-8th. The
  // detailed properties now live in `verify-grammar-ladder.mjs`; what stays
  // here is the audit item's own claim: Q2 onward has grammar, and it is
  // seeded in a way that cannot double.
  const storeSrc = read('src/store/useAppStore.js');
  const plan = (storeSrc.match(/const GRAMMAR_LADDER_SPEC = \[[\s\S]*?\];/) || [''])[0];
  ok('the grammar ladder is the seed plan', plan.length > 0,
    'GRAMMAR_LADDER_SPEC not found in useAppStore');
  for (const q of ['Q2 2026-2027', 'Q3 2026-2027', 'Q4 2026-2027']) {
    ok(`${q} is given grammar of its own`, plan.includes(q),
      'this is the quarter range that had none at all');
  }
  ok('...and the rows are seeded by URL, which cannot drift',
    /a\.khanAcademyUrl === target\.khanAcademyUrl/.test(storeSrc),
    'matching on title is what made this roster re-seed nine rows every startup');
}

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) {
  console.log(`\n${failures.length} CHECK(S) FAILED`);
  process.exitCode = 1;
} else {
  console.log('\nALL CHECKS PASSED');
}
