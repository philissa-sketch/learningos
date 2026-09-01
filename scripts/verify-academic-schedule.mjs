// ---------------------------------------------------------------------------
// THE YEAR'S ASSIGNMENTS ARE REAL, DATED, SCAFFOLDED AND SPREAD OUT.
// Run: node scripts/verify-academic-schedule.mjs
//
// ---- WHY THIS FILE EXISTS (Aug 10, 2026) ----
//
// The parent asked for an audit of the Master Plan against what was actually
// entered, after finding that a book on her son's screen said only "due" with
// no report attached: "Is he supposed to be doing a book report to this book.
// It doesn't show, it just states that it is due."
//
// The audit found five faults in the seeded schedule. Every one of them was
// invisible on screen — each row looked perfectly normal on its own, and the
// problem only appeared when you laid the whole year out at once. That is
// exactly the shape of thing a person cannot be expected to catch by reading,
// and a script catches for free.
//
//   1. FOUR OF THE FIVE MATH PROJECTS carried a Q1 date while filed under Q2,
//      Q3, Q4 and Summer — so all five of the year's maths projects were due
//      on Sept 16, 2026, including one on transformations he will not be
//      taught until next summer.
//   2. NINE ASSIGNMENTS on that single day.
//   3. THREE BOOKS whose note promised a report — "Historical-analysis
//      report", "Scientific-review report", "Engineering-analysis report" —
//      with no report scheduled, so the app never asked for one or graded it.
//   4. RESEARCH PAPER AND PORTFOLIO ENTRY HAD NO FORMATS. A format is not a
//      label in this app: it is the only thing that produces required
//      sections, a checklist, the writing-checker link and THE RUBRIC. So the
//      capstone research paper and every piece of Maths work on the calendar
//      had no stated requirements and nothing to grade against.
//   5. TWO THREE-SOURCE RESEARCH PAPERS due the same day, inside eight days
//      holding four graded pieces.
//
// Plus two smaller ones found on the way: two assignments due on a SATURDAY,
// and a reading assignment whose note still described work that had since
// been scheduled separately.
// ---------------------------------------------------------------------------
import './lib/academy-under-test.mjs';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { quarterlyAcademicPlaceholders } from '../src/academies/lamar/data/academicSuccessCenter/placeholders.js';
import { formatsForType, findFormat, criteriaForFormat } from '../src/academies/lamar/data/academicSuccessCenter/reportFormats.js';
import { hasMilestones, milestonesFor } from '../src/academies/lamar/data/academicSuccessCenter/assignmentMilestones.js';
import { getCurrentQuarter } from '../src/lib/schoolQuarter.js';
import { dayPattern } from '../src/academies/lamar/data/schedule/weekPattern.js';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (rel) => fs.readFileSync(path.join(REPO, rel), 'utf8');
// Comment lines are stripped before any source check. The Aug 10 note in
// WritingCheckerLink.jsx explains that the link USED to be quill.org, and a
// guard that trips over its own explanation is a guard people delete.
const code = (rel) => read(rel).split('\n').filter((l) => !/^\s*(\*|\/\/|\/\*)/.test(l)).join('\n');
let passed = 0;
const failures = [];
function ok(label, cond, detail = '') {
  if (cond) { passed += 1; console.log('PASS  ' + label); }
  else { failures.push(label); console.log('FAIL  ' + label + (detail ? `  ${detail}` : '')); }
}

const ROWS = [];
for (const [subject, byQuarter] of Object.entries(quarterlyAcademicPlaceholders)) {
  for (const [quarter, slots] of Object.entries(byQuarter)) {
    for (const slot of slots) ROWS.push({ subject, quarter, ...slot });
  }
}
const at = (d) => new Date(d + 'T12:00:00');
const GRADED_WRITING = ['Book Report', 'Research Paper', 'Presentation'];

console.log(`\nscheduled assignments: ${ROWS.length}`);

console.log('\n--- 1. every assignment is real, dated, and filed where it falls ---');
{
  ok('every slot has a title', ROWS.every((r) => r.title), ROWS.filter((r) => !r.title).map((r) => r.slotId).join(', '));
  ok('every slot has a due date', ROWS.every((r) => r.dueDate), ROWS.filter((r) => !r.dueDate).map((r) => r.slotId).join(', '));
  ok('every date is a real ISO date', ROWS.every((r) => /^\d{4}-\d{2}-\d{2}$/.test(r.dueDate) && !Number.isNaN(at(r.dueDate).getTime())));

  const misfiled = ROWS.filter((r) => getCurrentQuarter(at(r.dueDate)).batchLabel !== r.quarter);
  ok('no assignment is due outside the quarter it is filed under', misfiled.length === 0,
    misfiled.map((r) => `${r.slotId} filed ${r.quarter} due ${r.dueDate}`).join('; ') +
    ' — this is how five maths projects all came due on one day in September');

  const slotIds = ROWS.map((r) => r.slotId);
  ok('no duplicate slot ids', new Set(slotIds).size === slotIds.length,
    'a duplicate would seed one row and silently drop the other');
}

console.log('\n--- 2. nothing is due on a day off ---');
{
  const weekend = ROWS.filter((r) => [0, 6].includes(at(r.dueDate).getDay()));
  ok('nothing is due on a Saturday or Sunday', weekend.length === 0,
    weekend.map((r) => `${r.dueDate} ${r.slotId}`).join(', '));

  const offDays = ROWS.filter((r) => dayPattern(at(r.dueDate)).kind !== 'core');
  ok('nothing is due on a holiday or break', offDays.length === 0,
    offDays.map((r) => `${r.dueDate} ${r.slotId}`).join(', '));
}

console.log('\n--- 3. the load is spread, not piled ---');
{
  const byDate = new Map();
  for (const r of ROWS) {
    if (!byDate.has(r.dueDate)) byDate.set(r.dueDate, []);
    byDate.get(r.dueDate).push(r);
  }
  const heavy = [...byDate.entries()].filter(([, rs]) => rs.length > 2);
  ok('no more than two assignments fall on any one day', heavy.length === 0,
    heavy.map(([d, rs]) => `${d} has ${rs.length}`).join('; ') + ' — Sept 16 2026 once held nine');

  // Two of the same heavy kind on one day is the specific thing that broke:
  // two three-source research papers, due together, in the shortest quarter.
  const sameKind = [...byDate.entries()].filter(([, rs]) => {
    const heavies = rs.filter((r) => GRADED_WRITING.includes(r.type));
    return heavies.length > 1 && new Set(heavies.map((r) => r.type)).size < heavies.length;
  });
  ok('never two of the SAME kind of graded writing on one day', sameKind.length === 0,
    sameKind.map(([d, rs]) => `${d}: ${rs.map((r) => r.type).join(' + ')}`).join('; '));

  const perSubjectDay = [...byDate.entries()].filter(([, rs]) => {
    const graded = rs.filter((r) => GRADED_WRITING.includes(r.type));
    return new Set(graded.map((r) => r.subject)).size < graded.length;
  });
  ok('never two graded pieces in the same subject on one day', perSubjectDay.length === 0,
    perSubjectDay.map(([d]) => d).join(', '));
}

console.log('\n--- 4. every report can be scaffolded and scored ---');
{
  const needsFormat = ROWS.filter((r) => formatsForType(r.type).length > 0);
  const without = needsFormat.filter((r) => !r.format);
  ok('every assignment whose type has formats has one chosen', without.length === 0,
    without.map((r) => `${r.slotId} (${r.type})`).join(', ') +
    ' — without a format there are no required sections, no checklist and no rubric');

  const broken = ROWS.filter((r) => r.format && !findFormat(r.type, r.format));
  ok('no assignment points at a format that does not exist', broken.length === 0,
    broken.map((r) => `${r.slotId} -> ${r.format}`).join(', '));

  // The whole point of a format, restated as the thing the parent needs.
  const unscorable = needsFormat.filter((r) => criteriaForFormat(findFormat(r.type, r.format)).length === 0);
  ok('every one of them yields a rubric she can actually score', unscorable.length === 0,
    unscorable.map((r) => r.slotId).join(', '));

  for (const type of ['Research Paper', 'Portfolio Entry', 'Writing Portfolio Entry']) {
    ok(`${type} has formats at all`, formatsForType(type).length > 0,
      'this returned [] for months, which is why the capstone paper had no requirements');
  }

  const allFormats = ['Book Report', 'Presentation', 'Research Paper', 'Portfolio Entry'].flatMap(formatsForType);
  ok('every format states its sections and its checklist',
    allFormats.every((f) => f.sections?.length >= 3 && f.checklist?.length >= 3));
  ok('every format declares a rubric kind that exists',
    allFormats.every((f) => criteriaForFormat(f).length === 4));

  // Part 9's Research Center skills, carried by the work rather than taught
  // separately — every research format must ask where the facts came from.
  const research = formatsForType('Research Paper');
  ok('every research paper format demands a source list',
    research.every((f) => f.sections.concat(f.checklist).some((t) => /source/i.test(t))));
  ok('...and names plagiarism or citation in the checklist he reads',
    research.every((f) => f.checklist.some((t) => /own words|cit|source/i.test(t))));
}

console.log('\n--- 5. a promised report is a scheduled report ---');
{
  // The fault the parent found: a Reading Assignment whose NOTE described a
  // report the app never asked for. If a note says "report", one must exist.
  const promising = ROWS.filter((r) => r.type === 'Reading Assignment' && /\breport\b/i.test(r.note || ''));
  const unbacked = promising.filter((r) => {
    const book = (r.title || '').split('—')[0].trim().toLowerCase();
    return !ROWS.some((o) => GRADED_WRITING.includes(o.type) && (o.title || '').toLowerCase().includes(book.slice(0, 14)));
  });
  ok('every reading whose note mentions a report has one on the calendar', unbacked.length === 0,
    unbacked.map((r) => r.title).join('; '));

  // And the report must come AFTER the book, with room for the weekly steps.
  const reports = ROWS.filter((r) => r.type === 'Book Report');
  const tooTight = [];
  for (const rep of reports) {
    const book = (rep.title || '').split('—')[0].trim().toLowerCase().slice(0, 14);
    const read = ROWS.find((r) => r.type === 'Reading Assignment' && (r.title || '').toLowerCase().includes(book));
    if (!read) continue;
    const days = Math.round((at(rep.dueDate) - at(read.dueDate)) / 86400000);
    if (days < 14) tooTight.push(`${rep.title} — ${days} days after the book`);
  }
  ok('every book report lands at least two weeks after its book', tooTight.length === 0,
    tooTight.join('; ') + ' — the four weekly steps need the room');

  const steps = milestonesFor({ type: 'Book Report', title: 'x', dueDate: '2026-09-18' });
  ok('a book report still produces four weekly steps', steps.length === 4);
  ok('...the first of which is reading the book', /read/i.test(steps[0]?.label || ''));
}

console.log('\n--- 6. the writing tools are the ones she actually has ---');
{
  /**
   * The parent, Aug 10 2026: "the incorrect Quill link was added it is
   * supposed to be https://quillbot.com/."
   *
   * This file linked quill.org on the strength of a comment claiming she had a
   * Quill account. She has a QUILLBOT account — a different company and a
   * different product with a near-identical name. Nobody caught it because
   * nobody could: the link opened a real, reputable site, so it looked right.
   *
   * The deep link matters as much as the domain. quillbot.com opens on the
   * PARAPHRASER, whose whole job is rewriting his sentences into other words,
   * and every research checklist in this app says "wrote it in my own words."
   */
  const checker = code('src/components/Writing/WritingCheckerLink.jsx');
  ok('the checker points at QuillBot, not quill.org',
    /quillbot\.com/.test(checker) && !/quill\.org/.test(checker));
  ok('...and lands on the grammar checker, not the paraphraser',
    /quillbot\.com\/grammar-check/.test(checker),
    'the bare domain opens the rewriting tool, one click from doing the work for him');
  ok('nothing in the app links the paraphraser or the summariser',
    !/quillbot\.com\/(paraphrasing|summarize|ai-writer)/.test(checker));
  ok('he is told in his own words to keep the sentences his',
    /not to have it rewrite them/.test(checker),
    'a rule he cannot see will not survive a tool that is one tab away');
  ok('the citation generator exists for the source lists',
    /quillbot\.com\/citation-generator/.test(checker));

  const view = read('src/components/Academic/AcademicAssignmentsView.jsx');
  ok('citations are offered on research papers only',
    /citations=\{assignment\.type === 'Research Paper'\}/.test(view),
    'every other assignment type would just be clutter');

  const all = ['src/components/Writing/WritingCheckerLink.jsx', 'src/components/Academic/AcademicAssignmentsView.jsx']
    .map(code).join('\n');
  ok('no stale quill.org link survives anywhere in the writing path', !/quill\.org/.test(all));
}

console.log('\n--- 7. the corrections actually reach a database that already exists ---');
{
  /**
   * The parent, after every one of the fixes above had been made and verified:
   * "Where are the projects, research papers, located. I do not see them in the
   * assignment tab."
   *
   * They were not there. hydrate()'s backfill fills EMPTY fields only — which
   * is the right rule, because it stops a seed change from overwriting a date
   * she set herself. But it also means a seeded value that is WRONG can never
   * be corrected: the field is not empty, it is filled with the wrong thing.
   *
   * So all twelve date moves and all nineteen formats were correct in
   * placeholders.js, passed every check in this file, and reached neither of
   * the two databases that matter. A fix that only exists in the seed is not
   * a fix; it is a fix for whoever installs the app next.
   */
  const store = read('src/store/useAppStore.js');
  ok('a correction pass exists for rows that already exist',
    /const ASSIGNMENT_CORRECTIONS = \{/.test(store),
    'without this the seed and the real database drift apart permanently');
  /**
   * ---- ONE CORRECTION MAY NAME SEVERAL WRONG VALUES (Aug 30, 2026) ----
   *
   * This read `row.dueDate === fix.fromDueDate` and was right to: a date must
   * only move off a value the app itself shipped, never off one she chose.
   *
   * A second round of date fixes broke the pattern without breaking the rule.
   * `asg::math::Q4::1` had already been corrected once, so some databases sit
   * on the original seeded date and some on the first correction's date — and
   * BOTH are still untouched by her. A single `fromDueDate` can only reach one
   * of them, so the second fix would land on half the machines and quietly skip
   * the rest. That is the same "a fix that only exists in the seed" failure
   * this section was written about, one layer further in.
   *
   * `fromDueDate` may now be a list. The safety property is unchanged and is
   * what this check still asserts: the move happens only on an exact match
   * against a value the app shipped, so a date she set herself is never
   * recognised and never moved.
   */
  ok('a date only moves off an exact value that shipped',
    /\[\]\.concat\(fix\.fromDueDate\)\.includes\(row\.dueDate\)/.test(store)
      || /row\.dueDate === fix\.fromDueDate/.test(store),
    'a date she set herself must never be moved back');
  ok('...and it is still an exact match, never a range or a comparison',
    !/row\.dueDate\s*[<>]/.test(store),
    'anything looser than equality would sweep up dates she chose');
  ok('a note only changes off the exact text that shipped',
    /row\.note === fix\.fromNote/.test(store));
  ok('a format is only ever added, never replaced',
    /fix\.format && !row\.format/.test(store),
    'picking a different format is a real editorial choice and this must not undo one');
  ok('the corrections are written to disk, not just to state',
    /corrected\.map\(\(r\) => updateAcademicAssignmentRecord\(r\.id, r\)\)/.test(store));

  // Every correction must agree with what placeholders.js now says, or the
  // two sources of truth disagree and whichever runs last wins.
  const block = store.slice(store.indexOf('const ASSIGNMENT_CORRECTIONS = {'), store.indexOf('const corrected = []'));
  const pairs = [...block.matchAll(/'(asg::[^']+)':\s*\{([^}]*)\}/g)];
  ok('the correction list is not empty', pairs.length >= 20, `${pairs.length} entries`);
  const mismatched = [];
  for (const [, slotId, body] of pairs) {
    const row = ROWS.find((r) => r.slotId === slotId);
    if (!row) { mismatched.push(`${slotId} is not a real slot`); continue; }
    const d = /dueDate: '(\d{4}-\d{2}-\d{2})'(?!.*fromDueDate)/.exec(body.replace(/fromDueDate: '[^']*',?/, ''));
    if (d && d[1] !== row.dueDate) mismatched.push(`${slotId} corrects to ${d[1]} but the seed says ${row.dueDate}`);
    const f = /format: '([^']+)'/.exec(body);
    if (f && f[1] !== row.format) mismatched.push(`${slotId} corrects format to ${f[1]} but the seed says ${row.format}`);
  }
  ok('every correction matches what placeholders.js now says', mismatched.length === 0,
    mismatched.join('; '));
}

console.log('\n--- 8. importing his progress does not undo her schedule ---');
{
  /**
   * The two computers run different builds for days at a time — his is updated
   * by copying a folder across — so his export routinely carries an older
   * version of every assignment definition.
   *
   * mergeBySlot used to replace the WHOLE row whenever his copy was further
   * along. The first assignment he marked in-progress would have handed back
   * the old due date and wiped the format, and with the format goes the
   * rubric, the required sections and the checklist. She would have had no way
   * to notice: the row would just look the way it did last week.
   */
  const store = read('src/store/useAppStore.js');
  ok('the import splits student-owned fields from hers',
    /const STUDENT_OWNED_ASSIGNMENT_FIELDS = \[/.test(store));
  const owned = store.slice(store.indexOf('const STUDENT_OWNED_ASSIGNMENT_FIELDS'), store.indexOf('function mergeBySlot'));
  for (const field of ['status', 'milestones', 'reflection', 'rubricScores']) {
    ok(`his ${field} crosses over`, new RegExp(`'${field}'`).test(owned));
  }
  for (const field of ['dueDate', 'format', 'title', 'note', 'quarter', 'type']) {
    ok(`his stale ${field} does NOT`, !new RegExp(`'${field}'`).test(owned),
      'the assignment definition is hers — his copy is days behind');
  }
  const fn = store.slice(store.indexOf('function mergeBySlot'), store.indexOf('const bookMerge ='));
  ok('the whole-row replacement is gone', !/\{ \.\.\.incoming, id: local\.id \}/.test(fn),
    'that single line is what would have carried the old dates back');
  ok('a slot she does not have is still skipped', /if \(!local\) continue;/.test(fn),
    'her seed decides which assignments exist');
  ok('a grade still travels on its own monotonic rule',
    /incomingGradeWins\(local, incoming\)/.test(fn),
    'a grade beats no grade; between two grades the later gradedAt wins');
  ok('nothing is written when nothing changed',
    /if \(Object\.keys\(changes\)\.length === 0\) continue;/.test(fn));
}

console.log('\n--- 9. every subject has evidence, not just Khan scores ---');
{
  // Georgia asks about five subjects. A subject whose whole record is Khan
  // unit tests has no work product behind its grade.
  const subjects = [...new Set(ROWS.map((r) => r.subject))];
  const scorable = (r) => criteriaForFormat(findFormat(r.type, r.format)).length > 0;
  const bare = subjects.filter((s) => ROWS.filter((r) => r.subject === s && scorable(r)).length === 0);
  ok('no subject goes the whole year with nothing to grade', bare.length === 0, bare.join(', '));

  const thin = subjects.filter((s) => ROWS.filter((r) => r.subject === s && scorable(r)).length < 3);
  ok('every subject has at least three scored pieces across the year', thin.length === 0,
    thin.map((s) => `${s}: ${ROWS.filter((r) => r.subject === s && scorable(r)).length}`).join(', '));

  for (const s of ['math', 'science']) {
    const perQuarter = new Set(ROWS.filter((r) => r.subject === s && scorable(r)).map((r) => r.quarter));
    ok(`${s} has scored work in every quarter`, perQuarter.size === 5,
      `${perQuarter.size} of 5 — this is a Georgia-reported subject`);
  }
}

console.log('\n--- 10. milestones stay where they help ---');
{
  // Deliberately NOT added to Portfolio Entry. The milestones file makes the
  // case in its own words: a portfolio entry is a write-up of work already
  // done, and wrapping it in fake weekly steps "would be ceremony, not help."
  // Recorded as a decision so nobody re-adds them thinking it was an oversight.
  ok('heavy multi-week work has weekly steps',
    ['Book Report', 'Research Paper', 'Presentation'].every(hasMilestones));
  ok('Portfolio Entry deliberately does NOT', !hasMilestones('Portfolio Entry'),
    'see the note at the top of assignmentMilestones.js — this is a choice, not a gap');
  ok('Reading Assignment deliberately does NOT', !hasMilestones('Reading Assignment'),
    'its whole content IS its pacing');
}

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) {
  console.log(`\n${failures.length} CHECK(S) FAILED`);
  process.exitCode = 1;
} else {
  console.log('\nALL CHECKS PASSED');
}
