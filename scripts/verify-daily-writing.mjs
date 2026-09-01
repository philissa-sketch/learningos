// ---------------------------------------------------------------------------
// THE DAILY WRITING DRILL — it teaches, it lands on the right day, and the
// grade reaches his record. Run: node scripts/verify-daily-writing.mjs
//
// ---- WHERE THIS CAME FROM (Aug 13, 2026) ----
//
// The parent: "I want Lamar to have daily journals, not weekly. He needs
// assistance building ELA and I think that will help him to begin to create
// structural sentences and paragraphs." And then, checking her memory of what
// she had been told: "Did you state that sentence structures cannot be graded
// in the journal?"
//
// Nobody had said that. What the app said was narrower and true — there is no
// automated way to score real composition — and it had hardened, unnoticed,
// into something much worse: structure was not taught, checked, or recordable
// ANYWHERE. Composition was assigned to the journal, mechanics to Khan, and
// sentence-and-paragraph construction to nobody.
//
// Four separate faults were sitting under that one question:
//
//   1. 14 distinct prompts across 42 weeks, repeating, in a bare textarea with
//      no scaffolding beyond one sentence of instruction.
//   2. "Done this week" tested whether he had EVER written that prompt id. The
//      pool repeats, so writing "Mission Report" once in week 2 marked five
//      later weeks complete without him writing a word.
//   3. The parent's grade was one letter from a list of seven, with no rubric
//      and no way to tell him what to fix.
//   4. That letter reached the Portfolio display and stopped — not the report
//      card, not the transcript, not the gradebook. The identical failure this
//      project had already found and fixed for self-explanations in August,
//      sitting one table away.
// ---------------------------------------------------------------------------
import './lib/academy-under-test.mjs';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const { dailyDrills } = await import(REPO + '/src/academies/lamar/data/writing/dailyDrills.js');
const dw = await import(REPO + '/src/lib/dailyWriting.js');
const { QUARTER_SPANS } = await import(REPO + '/src/lib/yearPlan.js');
const { getSchoolWeekNumber } = await import(REPO + '/src/academies/lamar/data/writing/weeklySchedule.js');
const { parseDateStr } = await import(REPO + '/src/lib/scheduler.js');

let passed = 0;
const failures = [];
function ok(label, cond, detail = '') {
  if (cond) { passed += 1; console.log('PASS  ' + label); }
  else { failures.push(label); console.log('FAIL  ' + label + (detail ? `  ${detail}` : '')); }
}
const read = (rel) => fs.readFileSync(path.join(REPO, rel), 'utf8');
/**
 * Comments stripped. The comments explaining these fixes quote the code they
 * replaced and the parent's words verbatim, so a check scanning raw source can
 * be satisfied by its own explanation. Seventh time in this project.
 */
const codeOnly = (t) => t
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/\{\/\*[\s\S]*?\*\/\}/g, '')
  .replace(/^\s*\/\/.*$/gm, '');

console.log(`\ndrills authored: ${dailyDrills.length}`);

console.log('\n--- 1. every drill actually teaches ---');
{
  const missing = dailyDrills.filter(
    (d) => !d.teach || !d.weak || !d.strong || !d.task || !d.checkFor || !d.skillLabel
  );
  ok('every drill carries teach / weak / strong / task / checkFor', missing.length === 0,
    missing.map((d) => d.id).join(', '));
  ok('...and the weak and strong examples are never the same string',
    dailyDrills.every((d) => d.weak.trim() !== d.strong.trim()),
    'the pair IS the teaching — showing a rule beside its violation is the point');

  const thin = dailyDrills.filter((d) => d.teach.length < 80);
  ok('the teaching line is a real explanation, not a label', thin.length === 0,
    thin.map((d) => d.id).join(', '));
  ok('every drill names one structure to check for',
    dailyDrills.every((d) => d.checkFor.length > 20));
  ok('every drill has a sentence target, not a word target',
    dailyDrills.every((d) => Number.isFinite(d.minSentences) && d.minSentences > 0),
    'counting words on a five-sentence structure exercise rewards padding');
}

console.log('\n--- 2. the ladder is a ladder ---');
{
  const ids = new Set(dailyDrills.map((d) => d.id));
  ok('no drill is repeated', ids.size === dailyDrills.length,
    'the weekly pool repeated 14 prompts across 42 weeks and that is half of what went wrong');

  const weeks = [...new Set(dailyDrills.map((d) => d.week))].sort((a, b) => a - b);
  ok('weeks run without a gap', weeks.every((w, i) => i === 0 || w === weeks[i - 1] + 1),
    weeks.join(','));
  const perWeek = {};
  for (const d of dailyDrills) (perWeek[d.week] ??= []).push(d.day);
  ok('every scheduled week has exactly Monday to Thursday',
    Object.values(perWeek).every((days) => days.sort().join() === '1,2,3,4'),
    Object.entries(perWeek).filter(([, v]) => v.join() !== '1,2,3,4').map(([k]) => k).join(','));

  const skills = [...new Set(dailyDrills.map((d) => d.skill))];
  ok('a week drills ONE named structure',
    Object.keys(perWeek).every((w) => new Set(dailyDrills.filter((d) => d.week === +w).map((d) => d.skill)).size === 1),
    'four different structures in a week is exposure, not practice');
  console.log('      skills in order: ' + skills.join(' -> '));
  /**
   * THE FULL SCHOOL YEAR, NOT A SAMPLE.
   *
   * The standing rule in the project log, stated twice by the parent and
   * treated as permanent: anything a student draws from over time is sized for
   * a full school year, and anything short of that is an incomplete build, not
   * a phase to revisit. The weekly journal is the cautionary example — 14
   * prompts stretched across 42 weeks by repeating them, which is also what
   * produced the "already done" bug.
   */
  /**
   * ---- COMPUTED FROM THE CALENDAR, NOT HARDCODED (Aug 23, 2026) ----
   *
   * This asserted `weeks.length >= 36` and `dailyDrills.length === 144`, and
   * both passed for months while the last SEVEN WEEKS of the school year had
   * no drill at all. 36 was never the number of weeks in this school year; it
   * was the number of weeks somebody had written drills for. A guard that
   * hardcodes the thing it is checking cannot catch that thing going wrong.
   *
   * The last day of school is the end of Q4 (Summer is the final span and is a
   * separate, lighter session), and getSchoolWeekNumber turns that date into
   * the week the ladder actually has to reach.
   */
  const q4 = QUARTER_SPANS.find((q) => q.id === 'Q4');
  const weeksInSchoolYear = getSchoolWeekNumber(parseDateStr(q4.end));
  ok('the ladder reaches the last week of school', Math.max(...weeks) >= weeksInSchoolYear,
    `ladder ends at week ${Math.max(...weeks)}; school ends in week ${weeksInSchoolYear}`);
  ok('...with no week missing in between',
    weeks.length === Math.max(...weeks) && weeks[0] === 1,
    `${weeks.length} weeks present, highest is ${Math.max(...weeks)}`);
  ok('...four drills in every one of them',
    weeks.every((w) => dailyDrills.filter((d) => d.week === w).length === 4),
    `${dailyDrills.length} drills across ${weeks.length} weeks`);
  ok('...every week drilling a different structure',
    new Set(dailyDrills.map((d) => d.skill)).size === weeks.length,
    'a skill repeated in a later week means a week of the ladder is missing');
}

console.log('\n--- 3. it lands on the right day ---');
{
  // Aug 17 2026 is a Monday in school week 3.
  const mon = new Date(2026, 7, 17);
  const thu = new Date(2026, 7, 20);
  const fri = new Date(2026, 7, 21);
  const sat = new Date(2026, 7, 22);
  ok('Monday gets day 1 of that week', dw.drillForDate(mon)?.id === 'wd-w03-d1');
  ok('Thursday gets day 4', dw.drillForDate(thu)?.id === 'wd-w03-d4');
  ok('FRIDAY gets no drill', dw.drillForDate(fri) === null,
    "Friday is the week's real piece from the weekly schedule — that was the parent's choice");
  ok('the weekend gets no drill', dw.drillForDate(sat) === null);
  ok('a week past the end of the ladder returns null, it does not throw',
    dw.drillForDate(new Date(2030, 0, 7)) === null);
}

console.log('\n--- 4. "done" means done TODAY ---');
{
  /**
   * The bug this replaces, in the weekly journal: a Set of every promptId he
   * had ever written, with no date filter. Because the weekly pool repeats,
   * one entry in week 2 marked five later weeks "done".
   */
  const entries = [{ promptId: 'wd-w03-d1', completedAt: '2026-08-17T14:00:00.000Z' }];
  ok('a drill written today reads as done', dw.drillDoneOn(entries, 'wd-w03-d1', '2026-08-17'));
  ok('...and the SAME id on another day does not',
    !dw.drillDoneOn(entries, 'wd-w03-d1', '2026-08-18'),
    'this exact check, missing, is what marked five weeks of writing complete');
  ok('a different drill is not done', !dw.drillDoneOn(entries, 'wd-w03-d2', '2026-08-17'));
  ok('no id, no crash', !dw.drillDoneOn(entries, null, '2026-08-17'));

  const dash = read('src/components/Dashboard/MissionControlDashboard.jsx');
  ok('the WEEKLY prompt check is date-scoped too',
    /completedAt && toDateStr\(new Date\(e\.completedAt\)\) >= weekStart/.test(dash),
    'same fault, same file, and it was the original one');
  ok('...and the fix is explained where it happened',
    /"DONE" MEANS DONE THIS WEEK, NOT EVER/.test(dash));
  ok('the drill row is on the home screen', /label="Daily Writing"/.test(dash));
}

console.log('\n--- 5. the editor teaches before it asks ---');
{
  const eng = read('src/components/Writing/WritingPromptEngine.jsx');
  ok('a drill is recognised by what it carries, not by an id pattern',
    /const isDrill = Boolean\(prompt\.teach && prompt\.strong\);/.test(eng));
  ok('the structure is explained on screen', /\{prompt\.teach\}/.test(eng));
  ok('the weak and strong examples are shown side by side',
    /\{prompt\.weak\}/.test(eng) && /\{prompt\.strong\}/.test(eng),
    'a rule shown beside its violation is a rule he can see');
  ok('the self-check names the one thing to look for', /\{prompt\.checkFor\}/.test(eng));
  ok('a drill counts sentences, not words', /sentenceCount/.test(eng));
  ok('...and the sentence count is real, not a word-count rename',
    /text\.split\(\/\[\.!\?\]\+/.test(eng));
}

console.log('\n--- 6. the grade says what to fix, and reaches his record ---');
{
  const parent = read('src/components/Dashboard/ParentDashboard.jsx');
  const store = read('src/store/useAppStore.js');

  ok('the rubric has four criteria', /const WRITING_RUBRIC = \[/.test(parent) &&
    ['structure', 'clarity', 'detail', 'mechanics'].every((c) => new RegExp(`id: '${c}'`).test(parent)));
  ok('...and every criterion says what to look for', (parent.match(/lookFor:/g) || []).length >= 4);
  ok('there is a note he reads', /placeholder="One thing to fix next time — he reads this\."/.test(parent),
    'a letter tells him how he did; the note is the only part that tells him what to change');
  ok('the seven-letter picker is gone from this screen',
    !/const WRITING_GRADE_OPTIONS = \[/.test(parent),
    'it also disagreed with the Mission Control Board, which offers thirteen');

  ok('the store scores the rubric', /async gradeWritingEntryRubric\(id, scores, note/.test(store));
  ok('...refusing anything outside 1-4', /v < 1 \|\| v > 4/.test(store));
  ok('...deriving the letter from a percentage, not the other way round',
    /const grade = percentToLetter\(gradePercent\);/.test(store));
  ok('...on a scale where "Solid" is a good grade',
    /Math\.round\(60 \+ \(\(avg - 1\) \/ 3\) \* 40\)/.test(store),
    'straight out of 16, four 3s would be a 75 — the rubric would teach him that meeting the standard is a C');

  ok('graded writing now counts toward the subject average',
    /\.\.\.writingGraded\.map\(\(e\) => \(\{ value: e\.gradePercent \/ 100/.test(store),
    'it reached the Portfolio and stopped — the same failure already fixed once for self-explanations');
  ok('...and every graded row carries a real percentage to average',
    /Number\.isFinite\(e\.gradePercent\)/.test(store),
    'the filter stays — what changed is that the one-tap path now SETS the percentage');
  ok('...scoped to this school year, like every other grade source',
    /canonicalSubject\(subjectOfWritingEntry\(e\)\)[\s\S]{0,160}inSchoolYear\(e\.gradedAt \|\| e\.completedAt\)/.test(store),
    'writing was the ONE source with no in-year test, so a pre-Aug-2026 entry still counted');
  ok('one function decides which subject an entry belongs to',
    /function subjectOfWritingEntry\(entry\)/.test(store));
  ok('the one-tap letter path clears any rubric rather than disagreeing with it',
    /const changes = \{ grade, gradedAt, rubric: null, gradePercent \};/.test(store));
  /**
   * Aug 23, 2026 — these two replace a check that asserted `gradePercent:
   * null`. That guard was passing on a real defect: the Mission Control Board
   * is the screen she actually grades on, and everything it wrote was excluded
   * from the average by the `Number.isFinite` filter above.
   */
  ok('...deriving a percentage from the letter, so the grade reaches the record',
    /const gradePercent = letterToPercent\(grade\);/.test(store),
    'the Mission Control Board is where she grades; its grades reached no average at all');
  ok('every prompt pool can name its own subject',
    /const PROMPT_SUBJECT = new Map\(\)/.test(store) &&
      /for \(const pool of WRITING_PROMPT_POOLS\)/.test(store),
    '32 project write-ups resolved to null and could never reach a subject grade');
}

console.log('\n--- he has to look at it before it is saved ---');
{
  /**
   * =========================================================================
   * ---- TWO D- GRADES IN TWO DAYS. (Aug 25, 2026.) ----
   * =========================================================================
   *
   * The parent, asked why: **"He received D minuses because he rushed, didn't
   * use punctuation marks, capitalization, or complete sentences on both
   * entries."**
   *
   * Run over his real entries, one measure separates the good work from the
   * bad without a single false positive — sentences starting with a lowercase
   * letter: 0 of 3, 0 of 3, 0 of 5 on the B+ entries; 1 of 3 and **8 of 8** on
   * the two D- ones. Every mistake she named is machine-detectable and the app
   * never looked. Save unlocked at one word.
   *
   * Worse: `wd-w04-d2` asked for four sentences beginning "For example," and he
   * wrote zero. The app counted eight sentences, matched `minSentences: 8`,
   * saved it and paid 15 XP. **The system only ever counted, so he wrote to the
   * count.**
   */
  const wc = await import(REPO + '/src/lib/writingCheck.js');
  const dr = await import(REPO + '/src/academies/lamar/data/writing/drillRequirements.js');

  // ---- the measure that separates his real work ----
  const goodSentence = 'The rocket did not reach orbit because it was too heavy.';
  ok('clean writing raises nothing', wc.mechanicsIssues(goodSentence).length === 0);

  const rushed = 'steve bloing his house up was good idae bcause.  like the the one time  the mobs throw a pardy in steves house.';
  const rushedIssues = wc.mechanicsIssues(rushed);
  const byId = Object.fromEntries(rushedIssues.map((i) => [i.id, i]));
  ok('...and lowercase sentence openings are caught, with a count',
    byId.capitals && byId.capitals.count === 2, JSON.stringify(rushedIssues.map((i) => i.id)));
  ok('...a word typed twice is caught', Boolean(byId['doubled-words']));
  ok('...and a missing full stop at the end is caught',
    wc.mechanicsIssues('The engine ran hot').some((i) => i.id === 'end-punctuation'));
  ok('...and a lowercase "i" is caught',
    wc.mechanicsIssues('Then i checked the fuel line.').some((i) => i.id === 'lowercase-i'));
  ok('...but a capital I is not', !wc.mechanicsIssues('Then I checked the fuel line.').some((i) => i.id === 'lowercase-i'));
  ok('...and "it" is not mistaken for a lone i',
    wc.mechanicsIssues('It ran hot. That is fine.').length === 0);
  ok('an empty entry raises nothing to fix', wc.mechanicsIssues('').length === 0,
    'the Save button already refuses an empty entry; a wall of complaints about nothing is noise');

  /**
   * SPELLING IS DELIBERATELY NOT CHECKED. This app has no dictionary, and a
   * naive check would flag Tinkercad, Salva and every rocket part he owns.
   */
  ok('spelling is left alone', wc.mechanicsIssues('The Tinkercad nameplate printed.').length === 0);

  // ---- did he do what the drill asked ----
  const req = dr.requirementsFor('wd-w04-d2');
  ok('the drill that asks for "For example," has a machine-checkable rule', req.length === 1 && req[0].min === 4);
  ok('...and a Minecraft story with none of them fails it',
    wc.taskIssues(rushed, req).length === 1, JSON.stringify(wc.taskIssues(rushed, req)));
  const didIt = 'Rockets need fins. For example, my bottle rocket flew straight once I added them. '
    + 'Weight matters. For example, the heavy nose cone slowed it. '
    + 'Angle matters. For example, forty-five degrees went furthest. '
    + 'Air matters. For example, the windy day ruined the third launch.';
  ok('...and four real examples pass it', wc.taskIssues(didIt, req).length === 0);
  ok('...counted case-insensitively and without the comma',
    wc.taskIssues(didIt.replace(/For example,/g, 'for example'), req).length === 0,
    'the drill teaches the move, not the typography');

  const forbid = dr.requirementsFor('wd-w11-d1');
  ok('a drill can forbid a phrase, not only require one',
    forbid.length === 1 && forbid[0].max === 0);
  ok('...and using it is caught',
    wc.taskIssues('First I opened it and then I closed it.', forbid).length === 1);
  ok('...while a real transition passes', wc.taskIssues('First I opened it. Next I closed it.', forbid).length === 0);
  ok('an either/or requirement accepts either',
    wc.taskIssues('A. That shows B. C. What that means is D. E. That shows F.', dr.requirementsFor('wd-w14-d1')).length === 0);

  /**
   * COVERAGE. A new drill quoting a phrase must be decided about, not missed:
   * every task containing a quotation appears in DRILL_REQUIREMENTS or in the
   * reviewed-and-excluded list. Three of the eight quote something that is NOT
   * a requirement — wd-w07-d3 quotes the sentence he must break up — which is
   * exactly why deriving these from the text would have failed him for doing
   * the task.
   */
  const q2 = (await import(REPO + '/src/academies/lamar/data/writing/dailyDrillsQ2.js')).dailyDrillsQ2;
  const q3 = (await import(REPO + '/src/academies/lamar/data/writing/dailyDrillsQ3.js')).dailyDrillsQ3;
  const q4 = (await import(REPO + '/src/academies/lamar/data/writing/dailyDrillsQ4.js')).dailyDrillsQ4;
  const everyDrill = [...dailyDrills, ...q2, ...q3, ...q4];
  const quoting = [...new Set(everyDrill.filter((d) => /["“]/.test(d.task || '')).map((d) => d.id))];
  const undecided = quoting.filter(
    (id) => !dr.DRILL_REQUIREMENTS[id] && !dr.REVIEWED_NO_REQUIREMENT[id]
  );
  ok(`every drill quoting a phrase has been decided about (${quoting.length} of ${everyDrill.length} drills)`,
    undecided.length === 0, undecided.join(', '));
  const ghosts = Object.keys(dr.DRILL_REQUIREMENTS).filter((id) => !everyDrill.some((d) => d.id === id));
  ok('...and no requirement points at a drill that does not exist', ghosts.length === 0, ghosts.join(', '));

  // ---- the floor stops being called a finish line ----
  ok('landing exactly on the word minimum says so',
    Boolean(wc.lengthNote('w '.repeat(50).trim(), { minWords: 50 })),
    'he wrote exactly 50 of 50 words and the screen said "Goal reached"');
  ok('...and comfortably past it does not',
    wc.lengthNote('w '.repeat(120).trim(), { minWords: 50 }) === null);

  // ---- the screen wires it to the button ----
  const engine = codeOnly(read('src/components/Writing/WritingPromptEngine.jsx'));
  ok('the Save button runs the check first',
    /const result = runCheck\(\);/.test(engine) && /if \(result\.issues\.length === 0\)/.test(engine),
    'it used to be disabled={wordCount === 0} and nothing else');
  ok('...saving clean work still takes one press',
    /if \(result\.issues\.length === 0\) \{[\s\S]{0,80}?await save\(0\);/.test(engine),
    'making him press twice for work already right teaches him the check is a toll');
  ok('...and he can save anyway once he has seen the list',
    /Save anyway — \$\{checked\.issues\.length\} not fixed/.test(engine),
    'a hard block is beaten by adding full stops without reading');
  ok('...typing again puts the check back',
    /if \(checked\) setChecked\(null\);/.test(engine),
    'a check he passed three paragraphs ago is not a check on what he is about to save');
  ok('...and what he overrode is recorded',
    /submitWritingEntry\(prompt\.id, text, \{ checkIssues: issueCount \}\)/.test(engine));

  const store2 = codeOnly(read('src/store/useAppStore.js'));
  ok('the store stores it',
    /async submitWritingEntry\(promptId, text, \{ checkIssues = null \} = \{\}\)/.test(store2)
      && /checkIssues: Number\.isFinite\(checkIssues\) \? checkIssues : null/.test(store2));
  ok('...as null when nothing checked, never as zero',
    !/checkIssues: checkIssues \|\| 0/.test(store2),
    '"0" would read as "he checked and it was clean", a claim with no evidence behind it');

  const parent = codeOnly(read('src/components/Dashboard/ParentDashboard.jsx'));
  ok('and she sees it beside the entry she is grading',
    /Number\.isFinite\(entry\.checkIssues\)/.test(parent)
      && /check \$\{entry\.checkIssues === 1 \? 'problem' : 'problems'\} left unfixed/.test(parent),
    '"he rushed" should be a number beside the entry, not an inference from the prose');
  ok('...and old entries say nothing rather than "0 left"',
    /Number\.isFinite\(entry\.checkIssues\) && \(/.test(parent));
}

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) {
  console.log(`\n${failures.length} CHECK(S) FAILED`);
  process.exitCode = 1;
} else {
  console.log('\nALL CHECKS PASSED');
}
