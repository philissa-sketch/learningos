// ---------------------------------------------------------------------------
// Electric Guitar guard test. Run with: node scripts/verify-guitar.mjs
//
// ASSERT THE PROPERTY, NOT THE PUNCTUATION. Every check below either reads a
// parsed value or runs the real function. The two source-text checks that exist
// (the Dexie version wall, and the schedule migration) parse structure rather
// than matching a bare identifier — a bare name matches the comment explaining
// it, and that mistake has fired repeatedly in this codebase, including twice
// during this very build.
// ---------------------------------------------------------------------------
import './lib/academy-under-test.mjs';
import { readsFromAcademy } from './lib/reads-content.mjs';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  guitarSkillLadder,
  guitarLadderProgress,
  getCurrentGuitarSkill,
  getGuitarSkillByNumber,
  GUITAR_DAILY_MINUTES,
  GUITAR_SESSION_SHAPE
} from '../src/academies/lamar/data/guitar/guitarSkillLadder.js';
import { guitarTheory, getGuitarTheoryItem } from '../src/academies/lamar/data/guitar/guitarTheory.js';
import {
  guitarStarterSongs,
  guitarOwnSongGuidance,
  guitarPerformanceMoment,
  GUITAR_OWN_SLOTS
} from '../src/academies/lamar/data/guitar/guitarSongs.js';
import {
  guitarTools,
  guitarFeedbackPlaces,
  guitarEducators,
  getGuitarTool,
  GUITAR_LINKS_VERIFIED_ON
} from '../src/academies/lamar/data/guitar/guitarTools.js';
import { ACTIVE_SUBJECTS, PARTICIPATION_SUBJECTS, SUBJECT_LABELS, subjectCardLabel } from '../src/academies/lamar/subjects.js';
// The app's own local-date formatter. Imported rather than reimplemented — see
// the note on `day()` below for what reimplementing it cost.
// Loaded with await, not as a static import: the harness above installs an
// Academy's content using top-level await, and a sibling static import would
// race it — this module reads content the moment it is evaluated.
const { toDateStr } = await import('../src/lib/scheduler.js');
import { defaultSchedule } from '../src/academies/lamar/data/schedule/defaultSchedule.js';
import { allLessons } from '../src/academies/lamar/data/lessons/index.js';
import { aerospaceProjects } from '../src/academies/lamar/data/aerospace/aerospaceProjects.js';
import { scienceExperiments } from '../src/academies/lamar/data/science/scienceExperiments.js';
import { technologyProjects } from '../src/academies/lamar/data/technology/technologyProjects.js';
import { roboticsProjects } from '../src/academies/lamar/data/robotics/roboticsProjects.js';
import { gardenProjects } from '../src/academies/lamar/data/gardening/gardenProjects.js';
// Loaded with await, not as a static import: the harness above installs an
// Academy's content using top-level await, and a sibling static import would
// race it — this module reads content the moment it is evaluated.
const { useAppStore, migrateSavedSchedule } = await import('../src/store/useAppStore.js');

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
let failures = 0;
const ok = (cond, msg, detail) => {
  console.log(`${cond ? 'PASS' : 'FAIL'}  ${msg}`);
  if (!cond) { failures++; if (detail) console.log('      ' + detail); }
};
const toMinutes = (hhmm) => {
  const m = /^(\d{1,2}):(\d{2})$/.exec(String(hhmm ?? ''));
  return m ? Number(m[1]) * 60 + Number(m[2]) : null;
};
const isBareDomain = (url) => /^https?:\/\/[^/]+\/?$/.test(url);

// ===========================================================================
console.log('\n--- 1. subject registration ---');
// ===========================================================================
ok(PARTICIPATION_SUBJECTS.includes('guitar'), 'guitar is a PARTICIPATION subject');
ok(!ACTIVE_SUBJECTS.includes('guitar'),
  'guitar is NOT in ACTIVE_SUBJECTS',
  'ACTIVE_SUBJECTS drives getSubjects(), which walks the lessons. Guitar there means a graded transcript line built from four theory questions.');
ok(typeof SUBJECT_LABELS.guitar === 'string' && SUBJECT_LABELS.guitar.length > 0,
  'guitar has a transcript label');
ok(subjectCardLabel('guitar') !== SUBJECT_LABELS.guitar,
  'guitar has a friendlier card label than its transcript name');

// THE LOAD-BEARING NEGATIVE. If this ever fails, Electric Guitar has silently
// become a graded subject and the grade is four theory questions.
const guitarLessons = allLessons.filter((l) => l.subject === 'guitar');
ok(guitarLessons.length === 0,
  'ZERO guitar rows in allLessons — theory items are readings, not lessons',
  guitarLessons.map((l) => l.id).join(', '));

// ===========================================================================
console.log('\n--- 2. guitarLog survives every schema version after v29 ---');
// ===========================================================================
/**
 * THIS CHECK WAS RED FOR A DAY, AND FOR THE WRONG REASON (fixed Aug 9, 2026).
 *
 * It asserted "the latest Dexie version is 29". The database moved to v30 when
 * the ledger shipped, so the guard failed — not because anything about the
 * guitar had broken, but because the guard had frozen a snapshot of the world
 * on the day it was written. That is the exact anti-pattern this project's own
 * log forbids: a guard that fails on unrelated progress is a guard people
 * learn to ignore, and a guard people ignore protects nothing.
 *
 * What actually matters about guitarLog and the schema is TWO things, neither
 * of which mentions a version number:
 *   1. v29 introduced it, additively, adding exactly that one table.
 *   2. Every schema version since has carried it forward. That is the real
 *      risk — a later migration quietly dropping a table — and it is now
 *      checked against every version that exists, today and in future.
 */
const dbSrc = fs.readFileSync(path.join(REPO, 'src/db/db.js'), 'utf8');
const versionNums = [...dbSrc.matchAll(/db\.version\((\d+)\)(?:\s*\n\s*)?\.stores\(/g)].map((m) => Number(m[1]));
ok(versionNums.length > 0, 'db.js declares at least one Dexie version');
ok(Math.max(...versionNums) >= 29, `schema is at or past v29 (found v${Math.max(...versionNums)})`);
ok(versionNums.filter((v) => v === 29).length === 1, 'exactly one v29 stores block');
ok(new Set(versionNums).size === versionNums.length, 'no Dexie version is declared twice');
ok(versionNums.every((v, i) => i === 0 || v === versionNums[i - 1] + 1),
  'Dexie versions ascend by one with no gaps or re-declarations');
/**
 * Table names inside one `db.version(n).stores({ ... })` block.
 *
 * Brace-matched rather than scanning for a fixed closing string: v31 ends
 * `  })` because `.upgrade()` is chained onto it, and a guard that only knows
 * how to find `});` reads the whole rest of the file the day someone chains a
 * migration. Counting braces is the version of this that keeps working.
 */
const tablesIn = (n) => {
  const start = dbSrc.search(new RegExp(`db\\.version\\(${n}\\)(?:\\s*\\n\\s*)?\\.stores\\(\\{`));
  if (start === -1) return [];
  const open = dbSrc.indexOf('{', dbSrc.indexOf('.stores(', start));
  let depth = 0;
  let end = open;
  for (let i = open; i < dbSrc.length; i++) {
    if (dbSrc[i] === '{') depth++;
    else if (dbSrc[i] === '}') {
      depth--;
      if (depth === 0) { end = i; break; }
    }
  }
  const head = dbSrc.slice(open, end);
  return [...head.matchAll(/^\s{2,6}(\w+):/gm)].map((m) => m[1]);
};
const v28Tables = tablesIn(28);
const v29Tables = tablesIn(29);
const dropped = v28Tables.filter((t) => !v29Tables.includes(t));
ok(dropped.length === 0, 'v29 carries every v28 table forward (purely additive)', dropped.join(', '));
ok(v29Tables.includes('guitarLog'), 'v29 declares guitarLog');
ok(v29Tables.length === v28Tables.length + 1, 'v29 adds exactly one table');
// Forward-looking, and the part that will still be earning its keep in 2032.
for (const v of versionNums.filter((n) => n > 29)) {
  ok(tablesIn(v).includes('guitarLog'), `v${v} still declares guitarLog`);
}
const dbMod = await import('../src/db/db.js');
ok(typeof dbMod.loadAllGuitarLog === 'function', 'loadAllGuitarLog is exported');
ok(typeof dbMod.saveGuitarLogEntry === 'function', 'saveGuitarLogEntry is exported');
// The reset CALL, not the bare table name — a bare name matches its own comment.
ok((dbSrc.match(/db\.guitarLog\.clear\(\)/g) || []).length === 1,
  'resetting progress clears guitarLog exactly once');

// ===========================================================================
console.log('\n--- 3. the schedule: block-10 and the printed day ---');
// ===========================================================================
const ids = defaultSchedule.map((b) => b.id);
ok(new Set(ids).size === ids.length, 'no duplicate block ids in the default schedule');
const block10 = defaultSchedule.find((b) => b.id === 'block-10');
ok(Boolean(block10), 'the default schedule carries block-10');
ok(block10?.startTime === '15:00' && block10?.endTime === '15:15',
  `block-10 runs 15:00-15:15 (found ${block10?.startTime}-${block10?.endTime})`);
ok(toMinutes(block10?.endTime) - toMinutes(block10?.startTime) === GUITAR_DAILY_MINUTES,
  `block-10 is exactly ${GUITAR_DAILY_MINUTES} minutes long — the same number the daily card asks for`);
ok(/guitar/i.test(block10?.label || ''), 'block-10 names the guitar on the printed schedule',
  'An unnamed fifteen minutes will not happen. This is the whole reason the block exists.');
// Every block has a positive duration and none overlaps the next.
for (let i = 0; i < defaultSchedule.length; i += 1) {
  const b = defaultSchedule[i];
  ok(toMinutes(b.endTime) > toMinutes(b.startTime), `${b.id} has a positive duration`);
  if (i > 0) {
    ok(toMinutes(b.startTime) >= toMinutes(defaultSchedule[i - 1].endTime),
      `${b.id} does not start before ${defaultSchedule[i - 1].id} ends`);
  }
}
// THE SCHOOL DAY ENDS AT GUITAR, and that is the boundary this block was
// deliberately attached to. block-11 (gardening) was appended after it on
// Aug 9 2026 and sits OUTSIDE the school day on Fridays only, so it is excluded
// here rather than allowed to move the boundary — the point of the assertion is
// that nothing pushed guitar off the end of school.
const AFTER_SCHOOL_IDS = new Set(['block-11']);
const dayEnd = Math.max(
  ...defaultSchedule.filter((b) => !AFTER_SCHOOL_IDS.has(b.id)).map((b) => toMinutes(b.endTime))
);
ok(dayEnd === toMinutes('15:15'), `the school day still ends at 15:15 (found ${dayEnd} minutes past midnight)`);
const gardenBlock = defaultSchedule.find((b) => b.id === 'block-11');
ok(!!gardenBlock && toMinutes(gardenBlock.startTime) >= dayEnd,
  'the after-school garden block starts at or after the end of school',
  gardenBlock && `${gardenBlock.startTime} vs ${dayEnd}`);
ok(toMinutes(defaultSchedule[0].startTime) === toMinutes('08:30'), 'the day still starts at 08:30 — nothing before block-10 moved');
const block9 = defaultSchedule.find((b) => b.id === 'block-9');
// block-9 NAMED GARDENING AND GUITAR THEORY UNTIL AUG 9 2026, in a "Fridays:"
// clause. Gardening moved to block-11 after school and the block resolves to
// one real course per day now, so the label must NOT claim either of them.
ok(!/gardening/i.test(block9?.label || ''),
  "block-9's label no longer claims Gardening — that moved after school", block9?.label);
ok(!/fridays:/i.test(block9?.label || ''),
  "block-9's label no longer carries a Fridays clause", block9?.label);
ok(block9?.startTime === '14:15' && block9?.endTime === '15:00',
  'block-9 keeps its shipped times — only the label changed');

// ===========================================================================
console.log('\n--- 4. migrateSavedSchedule (behavioural) ---');
// ===========================================================================
// A saved schedule that predates block-10, otherwise identical to the shipped
// default. This is the real case on both of this family's computers.
const OLD_B9_LABEL = 'Aerospace / Social Studies / Coding / Robotics / STEM Project';
const savedBefore = defaultSchedule
  .filter((b) => b.id !== 'block-10')
  .map((b) => (b.id === 'block-9' ? { ...b, label: OLD_B9_LABEL } : { ...b }));

const migrated = migrateSavedSchedule(savedBefore);
ok(migrated !== savedBefore, 'a saved schedule missing block-10 is actually changed');
const m10 = migrated.find((b) => b.id === 'block-10');
ok(Boolean(m10), 'block-10 is added to a saved schedule');
ok(m10?.startTime === '15:00' && m10?.endTime === '15:15',
  `block-10 lands at 15:00-15:15 when block-9 is untouched (found ${m10?.startTime}-${m10?.endTime})`);
ok(migrated.find((b) => b.id === 'block-9')?.label === block9.label,
  'a block-9 still carrying the old shipped label is renamed to the new one');
// Nothing is deleted and nothing is reordered.
for (const b of savedBefore) {
  ok(migrated.some((x) => x.id === b.id), `${b.id} survives the migration`);
}
const survivingOrder = migrated.filter((b) => savedBefore.some((x) => x.id === b.id)).map((b) => b.id);
ok(survivingOrder.join(',') === savedBefore.map((b) => b.id).join(','),
  'the migration never reorders blocks she already had');
// Every block still has a positive duration — the bug an earlier migration hit.
for (const b of migrated) {
  ok(toMinutes(b.endTime) > toMinutes(b.startTime), `${b.id} still has a positive duration after migration`);
}
// IDEMPOTENT. This runs on every hydrate, forever.
const again = migrateSavedSchedule(migrated);
ok(again === migrated, 'running the migration a second time returns the same array reference — no write');

// A parent who has MOVED her day: block-10 goes at the end of HER day, not at a
// time that no longer means anything, and it is still a real 15 minutes.
const movedDay = savedBefore.map((b) =>
  b.id === 'block-9' ? { ...b, startTime: '15:30', endTime: '16:15' } : { ...b }
);
const movedMigrated = migrateSavedSchedule(movedDay);
const moved10 = movedMigrated.find((b) => b.id === 'block-10');
ok(Boolean(moved10), 'block-10 is still added when she has moved her day around');
ok(toMinutes(moved10.endTime) - toMinutes(moved10.startTime) === GUITAR_DAILY_MINUTES,
  `block-10 keeps its ${GUITAR_DAILY_MINUTES}-minute length when appended (found ${moved10.startTime}-${moved10.endTime})`);
ok(toMinutes(moved10.startTime) >= toMinutes('16:15'),
  'block-10 lands after the last block she actually has, not at a stale 15:00');

// THE LABEL THAT WAS ACTUALLY ON HER MACHINE on Aug 8, 2026. Her saved
// schedule was frozen at the ORIGINAL shipped default, from before Social
// Studies was added to the name — PROJECT_LOG.md records the change, and
// MASTER_VISION.md lists it as the original recommended routine. If this ever
// stops being renamed forward, her printed Friday block silently goes back to
// naming neither Gardening, Guitar Theory nor Social Studies.
const frozenAtOriginal = savedBefore.map((b) =>
  b.id === 'block-9' ? { ...b, label: 'Aerospace Engineering / Coding / Robotics / STEM Project' } : { ...b }
);
const frozenMigrated = migrateSavedSchedule(frozenAtOriginal);
const frozen9 = frozenMigrated.find((b) => b.id === 'block-9');
ok(frozen9?.label === block9.label,
  'a block-9 frozen at the ORIGINAL shipped default is renamed forward', frozen9?.label);
ok(/social studies/i.test(frozen9?.label || ''),
  'the rename also gives her printed schedule Social Studies, which it never named');
ok(migrateSavedSchedule(frozenMigrated) === frozenMigrated,
  'the frozen-label case is idempotent too');

// A parent who RENAMED block-9 keeps her name.
const renamed = savedBefore.map((b) => (b.id === 'block-9' ? { ...b, label: 'Afternoon Deep Work' } : { ...b }));
const renamedMigrated = migrateSavedSchedule(renamed);
ok(renamedMigrated.find((b) => b.id === 'block-9')?.label === 'Afternoon Deep Work',
  'a block-9 the parent renamed herself is left alone');

// ===========================================================================
console.log('\n--- 5. the full-year skill ladder ---');
// ===========================================================================
// ---- AUDIT ITEM O-5, Aug 25, 2026 ----
//
// This section used to assert EIGHT skills, all Q1 — correct when written, and
// by November it would have been pinning the bug in place. Guitar has a block
// every school day with no day restriction, and `getCurrentGuitarSkill` falls
// back to the last rung, so a ladder that ends in October means the same card
// for 181 days. A guard that locks in yesterday's truth is worse than no guard;
// this is the third time in this project a check has had to be inverted.
ok(guitarSkillLadder.length >= 30,
  `the ladder runs the whole year (${guitarSkillLadder.length} skills)`,
  'eight ended in October and left 181 days showing the same card');
ok(guitarSkillLadder.every((s, i) => s.number === i + 1), 'skills are numbered in file order');

// Every quarter he is at school gets rungs, at roughly Q1's pace of one per
// eleven days. A quarter with none is a quarter the card stops moving in.
{
  const byQuarter = {};
  for (const sk of guitarSkillLadder) byQuarter[sk.quarter] = (byQuarter[sk.quarter] || 0) + 1;
  for (const q of ['Q1 2026-2027', 'Q2 2026-2027', 'Q3 2026-2027', 'Q4 2026-2027', 'Summer 2027']) {
    ok((byQuarter[q] || 0) >= 5, `${q}: has skills of its own (${byQuarter[q] || 0})`);
  }
  ok(Object.keys(byQuarter).every((q) => /^(Q[1-4] 2026-2027|Summer 2027)$/.test(q)),
    'no skill is parked in a quarter that does not exist', Object.keys(byQuarter).join(', '));
}
const skillIds = guitarSkillLadder.map((s) => s.id);
ok(new Set(skillIds).size === skillIds.length, 'no duplicate skill ids');
ok(guitarSkillLadder[0].id === 'gt7-skill-tuning',
  'TUNING IS FIRST — an out-of-tune guitar makes everything sound wrong and a beginner cannot tell it is not him');
ok(GUITAR_SESSION_SHAPE.reduce((n, p) => n + p.minutes, 0) === GUITAR_DAILY_MINUTES,
  `the session shape adds up to exactly ${GUITAR_DAILY_MINUTES} minutes`);

const lessonIds = new Set(allLessons.map((l) => l.id));
const otherProjectIds = new Set([
  ...aerospaceProjects.map((p) => p.id),
  ...scienceExperiments.map((p) => p.id),
  ...technologyProjects.map((p) => p.id),
  ...roboticsProjects.map((p) => p.id),
  ...gardenProjects.map((p) => p.id)
]);
for (const s of guitarSkillLadder) {
  ok(!lessonIds.has(s.id), `${s.id}: does not collide with a lesson id`);
  ok(!otherProjectIds.has(s.id), `${s.id}: does not collide with a project id`);
  ok(Array.isArray(s.practice) && s.practice.length >= 3, `${s.id}: has real practice steps (${s.practice?.length})`);
  ok(typeof s.youWillKnowItWhen === 'string' && s.youWillKnowItWhen.length > 30,
    `${s.id}: states how he knows he has it`);
  ok(typeof s.whyFirst === 'string' && s.whyFirst.length > 40, `${s.id}: says why it sits where it sits`);
  if (s.lesson) {
    ok(/^https:\/\//.test(s.lesson.url), `${s.id}: lesson URL is https`);
    ok(!isBareDomain(s.lesson.url), `${s.id}: lesson URL is a real page, not a bare domain`, s.lesson.url);
    ok(typeof s.lesson.label === 'string' && s.lesson.label.length > 10, `${s.id}: lesson link is labelled`);
  }
  if (s.toolId) ok(Boolean(getGuitarTool(s.toolId)), `${s.id}: toolId '${s.toolId}' resolves to a real tool`);
}
/**
 * ---- EVERY SKILL ACCOUNTS FOR ITS LESSON LINK, ONE WAY OR THE OTHER ----
 *
 * Q1's eight URLs were each opened and read on 2026-08-08 before being written
 * down — the standing rule for every external link in this project, because a
 * dead link inside a twelve-year-old's daily routine is worse than no link.
 *
 * justinguitar.com could not be opened from the session that wrote Q2-Summer,
 * so NOT ONE URL THERE WAS GUESSED. A skill without a lesson now carries
 * exactly one of two explanations, and the guard requires one:
 *
 *   noLessonReason  it is a doing-thing, not a watching-thing. Step 6 set that
 *                   precedent: changing between shapes in time is not a thing
 *                   to watch.
 *   lessonPending   a video genuinely helps, and the exact lesson is NAMED so
 *                   it can be found and verified in a single pass.
 *
 * The distinction is the whole point. Without it, "no link" and "link not
 * checked yet" look identical, and the second one silently becomes the first.
 */
{
  const noLesson = guitarSkillLadder.filter((s) => !s.lesson);
  const unexplained = noLesson.filter(
    (s) => !(typeof s.noLessonReason === 'string' && s.noLessonReason.length > 30)
      && !(typeof s.lessonPending === 'string' && s.lessonPending.length > 10)
  );
  ok(unexplained.length === 0,
    'every lesson-less skill says whether there is nothing to watch, or a video still to verify',
    unexplained.map((s) => s.id).join(', '));
  const both = noLesson.filter((s) => s.noLessonReason && s.lessonPending);
  ok(both.length === 0, '...and never claims both at once', both.map((s) => s.id).join(', '));

  // Q1's links are the verified ones and must stay linked.
  const q1Unlinked = guitarSkillLadder.filter((s) => s.quarter === 'Q1 2026-2027' && !s.lesson && !s.noLessonReason);
  ok(q1Unlinked.length === 0, '...and no Q1 skill has quietly lost its verified link',
    q1Unlinked.map((s) => s.id).join(', '));

  // Nothing invented: every URL that IS present is on a domain already verified.
  const VERIFIED_HOSTS = ['justinguitar.com'];
  const strays = guitarSkillLadder
    .filter((s) => s.lesson)
    .filter((s) => !VERIFIED_HOSTS.some((h) => s.lesson.url.includes(h)));
  ok(strays.length === 0, '...and every lesson URL is on a domain that was opened and read',
    strays.map((s) => s.id + ' -> ' + s.lesson.url).join(', '));

  const pending = noLesson.filter((s) => s.lessonPending);
  console.log(`      (${pending.length} lessons named but not yet verified — see the note above)`);
}
// The Grade 2 jump is deliberate and must stay flagged as such.
const grade2 = guitarSkillLadder.filter((s) => s.fromGrade2);
ok(grade2.length === 2, `two skills are flagged as coming from Grade 2 (found ${grade2.length})`,
  'Power chords and Enter Sandman. Deliberate — this is an electric player, not an acoustic one.');
// The ladder advances, and it never goes blank at the end.
ok(getCurrentGuitarSkill([]).number === 1, 'with nothing cleared, skill 1 is up');
ok(getCurrentGuitarSkill([1, 2]).number === 3, 'clearing 1 and 2 puts skill 3 up');
{
  const all = guitarSkillLadder.map((s) => s.number);
  const last = guitarSkillLadder.length;
  const done = getCurrentGuitarSkill(all);
  ok(done.number === last,
    'with everything cleared the last skill stays up rather than the card going blank');
  ok(done.ladderComplete === true,
    '...and SAYS the ladder is finished, instead of showing rung 30 as if it were new',
    'silently repeating the last card forever is what made this an audit item');
  ok(getCurrentGuitarSkill([1]).ladderComplete === undefined,
    '...and does not claim completion while rungs remain');
  const prog = guitarLadderProgress([1, 2, 3]);
  ok(prog.done === 3 && prog.total === guitarSkillLadder.length && prog.complete === false,
    'progress up the ladder is countable');
  ok(guitarLadderProgress(all).complete === true, '...and completion is knowable');
}
ok(getGuitarSkillByNumber(5)?.id === 'gt7-skill-power-chords', 'skill 5 is power chords — the electric unlock');

// ===========================================================================
console.log('\n--- 6. the four theory items ---');
// ===========================================================================
ok(guitarTheory.length === 4, `4 theory items built (found ${guitarTheory.length})`);
const theoryIds = guitarTheory.map((t) => t.id);
ok(new Set(theoryIds).size === theoryIds.length, 'no duplicate theory ids');
ok(guitarTheory.every((t, i) => t.sequenceInQuarter === i + 1), 'sequenceInQuarter runs 1..4 in file order');
ok(guitarTheory.every((t) => t.quarter === 'Q1 2026-2027'), 'every theory item carries its quarter');
const TEACHING_FLOOR = 900;
for (const t of guitarTheory) {
  ok(!lessonIds.has(t.id), `${t.id}: does not collide with a lesson id`);
  ok(!otherProjectIds.has(t.id), `${t.id}: does not collide with a project id`);
  const chars = t.teaching.reduce((n, b) => n + b.heading.length + b.text.length, 0);
  ok(chars >= TEACHING_FLOOR, `${t.id}: carries at least ${TEACHING_FLOOR} characters of teaching (${chars})`);
  ok(t.teaching.length >= 3, `${t.id}: has at least three teaching blocks (${t.teaching.length})`);
  ok(Array.isArray(t.check?.choices) && t.check.choices.length === 4, `${t.id}: the check has four choices`);
  ok(Number.isInteger(t.check?.answerIndex) && t.check.answerIndex >= 0 && t.check.answerIndex < 4,
    `${t.id}: answerIndex points at a real choice`);
  // Per-wrong-answer feedback is first class in this app, graded or not.
  ok(Array.isArray(t.check?.choiceFeedback) && t.check.choiceFeedback.length === t.check.choices.length,
    `${t.id}: every choice carries its own feedback`);
  ok(t.check.choiceFeedback.every((f) => typeof f === 'string' && f.length > 30),
    `${t.id}: no feedback string is a shrug`);
  ok(Array.isArray(t.sources) && t.sources.length >= 1, `${t.id}: cites a source`);
  for (const src of t.sources) {
    ok(/^https:\/\//.test(src.url), `${t.id}: source URL is https`, src.url);
    ok(!isBareDomain(src.url), `${t.id}: source is a real page, not a bare domain`, src.url);
    ok(typeof src.label === 'string' && src.label.length > 10, `${t.id}: source names the publication`);
  }
  ok(Boolean(getGuitarTheoryItem(t.id)), `${t.id}: resolves through getGuitarTheoryItem`);
  if (t.skillLink) {
    ok(guitarSkillLadder.some((s) => s.id === t.skillLink), `${t.id}: skillLink '${t.skillLink}' resolves`);
  }
}
// The lineage is load-bearing, not a footnote — it has to be in the FIRST item
// he ever opens, and it has to carry a real cited source.
const first = guitarTheory[0];
const lineageText = first.teaching.map((b) => b.heading + ' ' + b.text).join(' ');
ok(/Sister Rosetta Tharpe/.test(lineageText),
  'the first theory item names Sister Rosetta Tharpe',
  'The electric guitar vocabulary he is learning is Black American music. In the first item, not a footnote.');
ok(/Chuck Berry/.test(lineageText) && /Hendrix/.test(lineageText),
  'the first theory item traces the line forward through Chuck Berry and Hendrix');
ok(first.sources.some((s) => /npr\.org/.test(s.url)),
  'the lineage is backed by a real cited source, not an assertion');

// ===========================================================================
console.log('\n--- 7. songs, and the slots he fills himself ---');
// ===========================================================================
ok(GUITAR_OWN_SLOTS === 3, `he fills ${GUITAR_OWN_SLOTS} slots himself`);
ok(guitarOwnSongGuidance.length >= 3, 'the slots come with real guidance on how to choose');
ok(guitarStarterSongs.length >= 2, `${guitarStarterSongs.length} starter songs`);
const songIds = guitarStarterSongs.map((s) => s.id);
ok(new Set(songIds).size === songIds.length, 'no duplicate song ids');
for (const song of guitarStarterSongs) {
  ok(!lessonIds.has(song.id) && !otherProjectIds.has(song.id), `${song.id}: id does not collide with anything`);
  ok(Boolean(getGuitarSkillByNumber(song.needsSkill)),
    `${song.id}: names a skill number that exists on the ladder (${song.needsSkill})`);
  ok(/^https:\/\//.test(song.lesson.url) && !isBareDomain(song.lesson.url),
    `${song.id}: its lesson link is a real https page`, song.lesson.url);
  ok(typeof song.why === 'string' && song.why.length > 40, `${song.id}: says why it is worth learning`);
}
// Nothing on the list may need a skill the quarter never teaches.
ok(guitarStarterSongs.every((s) => s.needsSkill <= guitarSkillLadder.length),
  'no starter song needs a skill beyond the Q1 ladder');
ok(guitarPerformanceMoment.quarter === 'Q1 2026-2027' && guitarPerformanceMoment.howToPrepare.length >= 3,
  'the quarter ends with a performance moment, with real preparation steps');

// ===========================================================================
console.log('\n--- 8. every external link ---');
// ===========================================================================
ok(GUITAR_LINKS_VERIFIED_ON === '2026-08-08', 'the file records when its links were last opened');
const linked = [
  ...guitarTools.map((t) => ({ where: t.id, url: t.toolUrl, label: t.name })),
  ...guitarEducators.map((e) => ({ where: e.id, url: e.url, label: e.name })),
  ...guitarFeedbackPlaces.filter((p) => p.url).map((p) => ({ where: p.id, url: p.url, label: p.name })),
  ...guitarSkillLadder.filter((s) => s.lesson).map((s) => ({ where: s.id, url: s.lesson.url, label: s.lesson.label })),
  ...guitarSkillLadder.filter((s) => s.alsoWatch).map((s) => ({ where: s.id, url: s.alsoWatch.url, label: s.alsoWatch.label })),
  ...guitarStarterSongs.map((s) => ({ where: s.id, url: s.lesson.url, label: s.lesson.label })),
  ...guitarTheory.flatMap((t) => t.sources.map((src) => ({ where: t.id, url: src.url, label: src.label })))
];
ok(linked.length > 0, `${linked.length} external links across the whole subject`);
for (const l of linked) {
  ok(/^https:\/\//.test(l.url), `${l.where}: ${l.url} is https`);
  ok(!isBareDomain(l.url), `${l.where}: ${l.url} is a real page, not a bare domain`);
  ok(typeof l.label === 'string' && l.label.length > 5, `${l.where}: the link is labelled`);
}
// The tuner and the metronome are the two the daily loop depends on.
ok(guitarTools.some((t) => /guitartuna\.com/.test(t.toolUrl)), 'the browser tuner is wired as a button');
ok(guitarTools.some((t) => /justinguitar\.com\/metronome/.test(t.toolUrl)), 'the metronome is wired as a button');
ok(guitarFeedbackPlaces.filter((p) => p.recommended).length === 1,
  'exactly one feedback place is marked as where to start');
// A place with no URL must be that way ON PURPOSE — this project does not ship
// a link nobody opened, and it does not silently drop the option either.
for (const p of guitarFeedbackPlaces.filter((x) => !x.url)) {
  ok(typeof p.whyHere === 'string' && p.whyHere.length > 40,
    `${p.id}: is named without a link, and says how to find it instead`);
}
ok(guitarEducators.length >= 2,
  `${guitarEducators.length} Black American guitar educators named as sources`);
ok(guitarEducators.every((e) => typeof e.whyForHim === 'string' && e.whyForHim.length > 40),
  'every educator carries a reason Lamar can actually read');

// ===========================================================================
console.log('\n--- 9. the participation record (behavioural) ---');
// ===========================================================================
const store = useAppStore.getState();
ok(typeof store.recordGuitarLogEntry === 'function', 'recordGuitarLogEntry exists on the store');
ok(typeof store.getGuitarPracticeStreak === 'function', 'getGuitarPracticeStreak exists on the store');
ok(store.getAllSubjectsForRecordkeeping().includes('guitar'),
  'guitar reaches the record (report card / transcript / compliance packet)');
ok(!store.getSubjects().includes('guitar'),
  'guitar does NOT reach getSubjects() — no mission list row, no roster row, no grade');

/**
 * ---- THIS TEST FAILED EVERY NIGHT AFTER 8PM (Aug 29, 2026) ----
 *
 * `day()` built its dates with `toISOString()`, which is UTC. The app builds
 * its dates with `toDateStr()`, which is local. In America/New_York those two
 * agree until 8pm EDT and then disagree by a day for the rest of the evening —
 * so from 8pm onward this test seeded "today" as TOMORROW, the streak counter
 * correctly refused to count a day that had not happened yet, and the check
 * reported a streak of 2 where it wanted 3.
 *
 * The app itself fixed this exact bug months ago. `useAppStore.js` line 625
 * carries the note — *"a bare toISOString in Eastern lands on TOMORROW'S date,
 * misdating attendance, streaks, and the Georgia 180-day record"* — and
 * `dailyWriting.js` line 16 repeats it. The guard written to protect the streak
 * was doing the thing the streak had been fixed not to do.
 *
 * It now imports the app's own `toDateStr`, so the test and the code it tests
 * cannot disagree about what day it is. Same reason `verify-hq-room.mjs` imports
 * the projection instead of keeping a copy of it: a transcription that has to
 * stay correct is a transcription that eventually does not.
 *
 * The family this belongs to: she works with Lamar in the evenings, so a guard
 * that only goes red after 8pm is a guard that is red exactly when she looks.
 */
const day = (offset) => {
  const d = new Date();
  d.setDate(d.getDate() - offset);
  return toDateStr(d);
};
useAppStore.setState({
  guitarLog: [
    { id: 1, date: day(2), kind: 'practice', title: 'x', data: { minutes: 15, skillNumber: 1 } },
    { id: 2, date: day(1), kind: 'practice', title: 'x', data: { minutes: 20, skillNumber: 1 } },
    { id: 3, date: day(1), kind: 'practice', title: 'x', data: { minutes: 10, skillNumber: 1 } },
    { id: 4, date: day(0), kind: 'practice', title: 'x', data: { minutes: 15, skillNumber: 2 } },
    { id: 5, date: day(1), kind: 'theory', theoryId: 'gt7-theory-string-names', data: { itemId: 'gt7-theory-string-names', correct: true } },
    { id: 6, date: day(1), kind: 'skill-cleared', data: { skillNumber: 1 } },
    { id: 7, date: day(0), kind: 'song-picked', title: 'Seven Nation Army', data: { title: 'Seven Nation Army' } },
    { id: 8, date: day(0), kind: 'song-learned', title: 'Peter Gunn Theme', data: { title: 'Peter Gunn Theme' } },
    { id: 9, date: day(0), kind: 'recording', title: 'Recording made', data: {} }
  ]
});
const rec = useAppStore.getState().getParticipationRecord('guitar');
ok(rec.practiceSessions === 4, `practice sessions counted: ${rec.practiceSessions}`);
ok(rec.daysPractised === 3, `distinct days counted, two sessions on one day kept as one day: ${rec.daysPractised}`);
ok(rec.minutesPractised === 60, `minutes summed: ${rec.minutesPractised}`);
ok(rec.theoryItemsRead === 1, `theory items counted: ${rec.theoryItemsRead}`);
ok(rec.skillsCleared === 1, `skills cleared counted: ${rec.skillsCleared}`);
ok(rec.songsChosen === 1 && rec.songsLearned === 1, `songs: ${rec.songsChosen} chosen, ${rec.songsLearned} learned`);
ok(rec.recordings === 1, `recordings counted: ${rec.recordings}`);
ok(rec.entriesLogged === 9, `total entries counted: ${rec.entriesLogged}`);
// Nothing in the record may be a score. This is the participation contract.
ok(!('grade' in rec) && !('accuracy' in rec) && !('score' in rec),
  'the participation record carries no grade, no accuracy and no score');

// The streak, which is the one number he will look at every day.
ok(useAppStore.getState().getGuitarPracticeStreak() === 3,
  `three consecutive days counts as a streak of 3 (found ${useAppStore.getState().getGuitarPracticeStreak()})`);
// Not having practised YET today must not read as a broken streak at 9am.
useAppStore.setState({
  guitarLog: [
    { id: 1, date: day(2), kind: 'practice', data: { minutes: 15 } },
    { id: 2, date: day(1), kind: 'practice', data: { minutes: 15 } }
  ]
});
ok(useAppStore.getState().getGuitarPracticeStreak() === 2,
  'a morning with no practice logged yet still shows yesterday\'s streak, not a zero');
useAppStore.setState({ guitarLog: [] });
ok(useAppStore.getState().getGuitarPracticeStreak() === 0, 'an empty log is a streak of zero, not a crash');

const card = useAppStore.getState().getReportCardData();
const gRow = card.find((r) => r.subject === 'guitar');
ok(Boolean(gRow), 'guitar has a report card row');
ok(gRow?.isParticipation === true, 'the guitar row is flagged as participation');
ok(gRow?.letterGrade === null && gRow?.averageAccuracy === null,
  'the guitar row carries NO letter grade and NO accuracy');
ok(gRow?.totalLessons === 0 && gRow?.mastered === 0,
  'the guitar row reports 0/0 lessons without that being a grade');
ok(Array.isArray(gRow?.strands) && Array.isArray(gRow?.needsAttention),
  'the guitar row still returns every field the consuming screens read');

// ===========================================================================
console.log('\n--- 10. the daily card actually reaches his screen ---');
// ===========================================================================
// Both halves are required. A named schedule block he never sees on the home
// screen, or a card that the printed routine never names, is exactly the
// failure this subject was designed against: "I told him to follow that
// schedule but that isn't there."
const dashSrc = fs.readFileSync(path.join(REPO, 'src/components/Dashboard/MissionControlDashboard.jsx'), 'utf8');
ok((dashSrc.match(/subject="guitar"/g) || []).length === 1,
  'the home screen renders exactly one guitar row');
ok(readsFromAcademy(dashSrc, 'getCurrentGuitarSkill') && readsFromAcademy(dashSrc, 'GUITAR_DAILY_MINUTES'),
  'the home screen imports the ladder rather than hardcoding a title');
ok((dashSrc.match(/getCurrentGuitarSkill\(guitarClearedNumbers\)/g) || []).length === 1,
  'the row shows the skill he is actually on');
const appSrc = fs.readFileSync(path.join(REPO, 'src/App.jsx'), 'utf8');
ok((appSrc.match(/view === 'guitar'/g) || []).length === 1, 'App.jsx routes the guitar view exactly once');
ok((appSrc.match(/import\('\.\/components\/Guitar\/GuitarHome\.jsx'\)/g) || []).length === 1,
  'GuitarHome is lazy-loaded exactly once');
const navSrc = fs.readFileSync(path.join(REPO, 'src/components/Navigation/NavBar.jsx'), 'utf8');
ok((navSrc.match(/\{ id: 'guitar', label: 'Guitar' \}/g) || []).length === 1,
  'the nav carries exactly one Guitar tab');

// ===========================================================================
console.log(`\n${failures === 0 ? 'ALL CHECKS PASSED' : failures + ' CHECK(S) FAILED'}`);
process.exit(failures === 0 ? 0 : 1);
