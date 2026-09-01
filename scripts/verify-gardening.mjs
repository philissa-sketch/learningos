// ---------------------------------------------------------------------------
// Gardening guard test. Run with: node scripts/verify-gardening.mjs
//
// ASSERT THE PROPERTY, NOT THE PUNCTUATION. Every check below either reads a
// parsed value or runs the real function. Where a check must look at source
// text at all (the seven-consumer wiring), it asserts an import statement AND a
// separate reference — never a bare identifier, which matches the comment
// explaining it. That mistake has fired five times in this codebase, including
// once during this very build: weekPattern.js already contained the word
// "gardening" in Friday's own note text.
// ---------------------------------------------------------------------------
import './lib/academy-under-test.mjs';
import { countReadsFromAcademy, bodyWithoutContentReads } from './lib/reads-content.mjs';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { gardenProjects } from '../src/academies/lamar/data/gardening/gardenProjects.js';
import { gardenBriefs, getGardenBriefById } from '../src/academies/lamar/data/gardening/gardenBriefs.js';
import { gardenCalendar, GARDEN_Q1_START, GARDEN_Q1_END, GARDEN_Q2_START, GARDEN_Q2_END, GARDEN_Q3_START, GARDEN_Q3_END, GARDEN_Q4_START, GARDEN_Q4_END, GARDEN_SUMMER_START, GARDEN_SUMMER_END, getGardenDayForDate, getGardenDayForWeekOf, getNextGardenDay } from '../src/academies/lamar/data/gardening/gardenCalendar.js';
import { gardenBuildTrack, gardenCapstone, buildsUnlockedBy } from '../src/academies/lamar/data/gardening/gardenBuildTrack.js';
import { ACTIVE_SUBJECTS, PARTICIPATION_SUBJECTS, SUBJECT_LABELS, subjectCardLabel } from '../src/academies/lamar/subjects.js';
import { WEEK_PATTERN, daysForSubject, FRIDAY_BUFFER_PLAN } from '../src/academies/lamar/data/schedule/weekPattern.js';
import { defaultSchedule } from '../src/academies/lamar/data/schedule/defaultSchedule.js';

const toMin = (hhmm) => {
  const m = /^(\d{1,2}):(\d{2})$/.exec(String(hhmm ?? ''));
  return m ? Number(m[1]) * 60 + Number(m[2]) : 0;
};
import { allLessons } from '../src/academies/lamar/data/lessons/index.js';
import { aerospaceProjects } from '../src/academies/lamar/data/aerospace/aerospaceProjects.js';
import { scienceExperiments } from '../src/academies/lamar/data/science/scienceExperiments.js';
import { technologyProjects } from '../src/academies/lamar/data/technology/technologyProjects.js';
import { roboticsProjects } from '../src/academies/lamar/data/robotics/roboticsProjects.js';
// Loaded with await, not as a static import: the harness above installs an
// Academy's content using top-level await, and a sibling static import would
// race it — this module reads content the moment it is evaluated.
const { useAppStore } = await import('../src/store/useAppStore.js');

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (rel) => fs.readFileSync(path.join(REPO, rel), 'utf8');
let failures = 0;
const ok = (cond, msg, detail) => {
  console.log(`${cond ? 'PASS' : 'FAIL'}  ${msg}`);
  if (!cond) { failures++; if (detail) console.log('      ' + detail); }
};
const isFriday = (d) => new Date(d + 'T12:00:00').getDay() === 5;

// ===========================================================================
console.log('\n--- 1. subject registration ---');
// ===========================================================================
ok(PARTICIPATION_SUBJECTS.includes('gardening'), 'gardening is a PARTICIPATION subject');
ok(!ACTIVE_SUBJECTS.includes('gardening'),
  'gardening is NOT in ACTIVE_SUBJECTS',
  'ACTIVE_SUBJECTS drives getSubjects(), which walks the lessons — a lesson-less subject there means an empty 0/0 transcript line and broken roster rows.');
ok(typeof SUBJECT_LABELS.gardening === 'string' && SUBJECT_LABELS.gardening.length > 0,
  'gardening has a transcript label');
ok(subjectCardLabel('gardening') !== SUBJECT_LABELS.gardening,
  'gardening has a friendlier card label than its transcript name');

// The load-bearing negative: no gardening content may leak into allLessons.
const gardeningLessons = allLessons.filter((l) => l.subject === 'gardening');
ok(gardeningLessons.length === 0,
  'ZERO gardening rows in allLessons — briefs are not lessons',
  gardeningLessons.map((l) => l.id).join(', '));

// ===========================================================================
console.log('\n--- 2. the Friday slot ---');
// ===========================================================================
// GARDENING MOVED OUT OF THE ACADEMIC BLOCK AND AFTER SCHOOL ON AUG 9 2026 —
// the parent: "Gardening will be after school." So the assertions flip: it must
// NOT be in Friday's rotating subjects, and it MUST be in afterSchool. Friday
// is a 'core' day now, not a buffer.
ok(!WEEK_PATTERN[5].subjects.includes('gardening'),
  'gardening is NOT in the academic rotating block');
ok((WEEK_PATTERN[5].afterSchool || []).includes('gardening'),
  'Friday schedules gardening after school');
ok(WEEK_PATTERN[5].kind === 'core' && WEEK_PATTERN[5].flex === true,
  "Friday is a core school day with an open rotating block");
ok(daysForSubject('gardening').length === 1 && daysForSubject('gardening')[0] === 'Friday',
  'gardening runs on Friday and only Friday');
ok(FRIDAY_BUFFER_PLAN.some((p) => p.id === 'friday-garden'),
  "FRIDAY_BUFFER_PLAN carries a garden block");
// The block that actually holds it. A garden with no slot on the printed
// schedule is the "I told him to follow that schedule but that isn't there"
// failure this project has already shipped once.
const gardenBlock = defaultSchedule.find((b) => b.id === 'block-11');
ok(!!gardenBlock, 'the printed schedule carries an after-school garden block (block-11)');
ok(!!gardenBlock && toMin(gardenBlock.endTime) - toMin(gardenBlock.startTime) >= 90,
  'the garden block is at least 90 minutes — the shortest brief is 60 and the average is 102',
  gardenBlock && `${gardenBlock.startTime}-${gardenBlock.endTime}`);
const guitarBlock = defaultSchedule.find((b) => b.id === 'block-10');
ok(!!guitarBlock && !!gardenBlock && toMin(gardenBlock.startTime) >= toMin(guitarBlock.endTime),
  'the garden starts after school ends, not inside it');
for (const dayIndex of [1, 2, 3, 4]) {
  ok(!WEEK_PATTERN[dayIndex].subjects.includes('gardening'),
    `${WEEK_PATTERN[dayIndex].label} is untouched by gardening`);
  ok(!(WEEK_PATTERN[dayIndex].afterSchool || []).includes('gardening'),
    `${WEEK_PATTERN[dayIndex].label} has no after-school gardening either`);
}

// ===========================================================================
console.log('\n--- 3. the seven consumer files ---');
// ===========================================================================
// A project array wired into fewer than all seven fails SILENTLY. Each file is
// asserted to IMPORT the array and to REFERENCE it somewhere else — importing
// without using is exactly the half-wiring the original defect describes.
/**
 * ---- SEVEN BECAME SIX (Aug 26, 2026), AND THIS GUARD CRASHED FOR A DAY ----
 *
 * `ThisWeeksProjectCard.jsx` was one of ten orphaned components removed in the
 * audit's dead-code pass. Nothing rendered it any more — the week's hands-on
 * project became a row on the dashboard itself (`HANDS_ON_SOURCES` /
 * `weeksHandsOn`) — but this list still named the file, so the suite stopped
 * on ENOENT instead of reporting anything at all.
 *
 * THE LESSON, WRITTEN DOWN BECAUSE IT WILL HAPPEN AGAIN: deleting a component
 * means grepping the scripts folder for its name. A guard that references a
 * file by path has a dependency on that file, and a crashed guard is not a
 * passing guard — it is a guard nobody is reading.
 *
 * The role did not disappear with the file, so the check did not either: the
 * dashboard now carries BOTH reasons for importing gardenProjects, which is
 * why its entry below names both.
 */
const CONSUMERS = [
  ['src/components/Writing/WritingJournal.jsx', 'he can find the project at all'],
  ['src/components/Lesson/FeedbackPanel.jsx', 'finishing a lesson suggests it'],
  ['src/components/Scheduler/WeeklyView.jsx', 'it appears on the weekly schedule'],
  ['src/components/Dashboard/MissionControlDashboard.jsx',
    "its id resolves to a title, and it can be this week's project"],
  ['src/components/Academic/AcademicPortfolioView.jsx', 'completing it becomes a Portfolio entry'],
  ['src/store/useAppStore.js', 'the app recognises it as a completable project']
];
ok(CONSUMERS.length === 6, 'the consumer list is six files long');
/** Every named consumer still exists. This is the check that was missing. */
for (const [rel] of CONSUMERS) {
  ok(fs.existsSync(path.join(REPO, rel)), `${path.basename(rel)} still exists to be checked`);
}
/** And the role that left the deleted card really did land on the dashboard. */
{
  const dash = fs.readFileSync(
    path.join(REPO, 'src/components/Dashboard/MissionControlDashboard.jsx'), 'utf8'
  ).replace(/\/\*[\s\S]*?\*\//g, '').replace(/\{\/\*[\s\S]*?\*\/\}/g, '').replace(/^\s*\/\/.*$/gm, '');
  ok(/HANDS_ON_SOURCES/.test(dash) && /weeksHandsOn/.test(dash) && /list: gardenProjects/.test(dash),
    "the week's hands-on project row reads the garden list, so the deleted card left nothing behind");
}
for (const [rel, why] of CONSUMERS) {
  const text = fs.readFileSync(path.join(REPO, rel), 'utf8');
  // The list now arrives from whichever Academy is signed in, rather than from
  // one Academy's folder by name. Same assertion, current shape — see
  // scripts/lib/reads-content.mjs.
  const reads = countReadsFromAcademy(text, 'gardenProjects');
  const uses = (bodyWithoutContentReads(text).match(/\bgardenProjects\b/g) || []).length;
  ok(reads === 1 && uses >= 1,
    `${path.basename(rel)} reads AND uses gardenProjects — ${why}`,
    `reads=${reads} uses=${uses}`);
}

// ===========================================================================
console.log('\n--- 4. Dexie v28 ---');
// ===========================================================================
const dbSrc = fs.readFileSync(path.join(REPO, 'src/db/db.js'), 'utf8');
/**
 * ---- THIS REGEX WAS WRONG FOR A WEEK (fixed Aug 16, 2026) ----
 *
 * It required `db.version(N).stores(` on ONE line. v31 is written across two —
 * `db.version(31)\n  .stores({` — so this guard has not seen v31 since the day
 * it shipped. Consequences, both silent: the "versions ascend by one" check was
 * validating a sequence with a hole in it and passing anyway, and
 * "the CURRENT schema still declares gardenLog" was checking v30, not the
 * latest. It only surfaced when v32 made the gap visible.
 *
 * verify-export-completeness and verify-guitar were both corrected for this
 * when v31 landed. This one was missed — which is the argument for a shared
 * helper rather than the same regex written into three files.
 */
const versionNums = [...dbSrc.matchAll(/db\.version\((\d+)\)(?:\s*\n\s*)?\.stores\(/g)].map((m) => Number(m[1]));
// NOT "v28 is the latest". It was, on Aug 8 2026, and then Electric Guitar
// added v29 the same day. What this guard actually cares about is the PROPERTY
// that gardening depends on — gardenLog was added at v28, additively, and no
// later version has quietly dropped it. Asserting "latest" instead made every
// future subject's schema addition look like a gardening regression, which is
// the guard crying wolf about work it has no opinion on.
ok(versionNums.includes(28), `Dexie v28 (gardening's version) exists (versions: ${versionNums.join(', ')})`);
const latestVersion = Math.max(...versionNums);
const latestStart = dbSrc.search(new RegExp(`db\\.version\\(${latestVersion}\\)(?:\\s*\\n\\s*)?\\.stores\\(`));
const latestHead = dbSrc.slice(latestStart, dbSrc.indexOf('\n});', latestStart));
const latestTables = [...latestHead.matchAll(/^\s{2}(\w+):/gm)].map((m) => m[1]);
ok(latestTables.includes('gardenLog'),
  `the CURRENT schema (v${latestVersion}) still declares gardenLog`,
  'A later version that drops this table silently loses every watering, planting and sun reading.');
ok(versionNums.filter((v) => v === 28).length === 1, 'exactly one v28 stores block');
// Additive-only: every version number appears once and they ascend without gaps.
const ascending = versionNums.every((v, i) => i === 0 || v === versionNums[i - 1] + 1);
ok(ascending, 'Dexie versions ascend by one with no gaps or re-declarations');
const v28Body = dbSrc.slice(dbSrc.indexOf('db.version(28).stores({'));
const v28Head = v28Body.slice(0, v28Body.indexOf('\n});'));
const v28Tables = [...v28Head.matchAll(/^\s{2}(\w+):/gm)].map((m) => m[1]);
const v27Chunk = dbSrc.slice(dbSrc.indexOf('db.version(27).stores({'));
const v27Head = v27Chunk.slice(0, v27Chunk.indexOf('\n});'));
const v27Tables = [...v27Head.matchAll(/^\s{2}(\w+):/gm)].map((m) => m[1]);
const dropped = v27Tables.filter((t) => !v28Tables.includes(t));
ok(dropped.length === 0, 'v28 carries every v27 table forward (purely additive)', dropped.join(', '));
ok(v28Tables.includes('gardenLog'), 'v28 declares gardenLog');
ok(v28Tables.length === v27Tables.length + 1, 'v28 adds exactly one table');
const dbMod = await import('../src/db/db.js');
ok(typeof dbMod.loadAllGardenLog === 'function', 'loadAllGardenLog is exported');
ok(typeof dbMod.saveGardenLogEntry === 'function', 'saveGardenLogEntry is exported');

// ===========================================================================
console.log('\n--- 5. the participation record (behavioural) ---');
// ===========================================================================
const store = useAppStore.getState();
ok(typeof store.recordGardenLogEntry === 'function', 'recordGardenLogEntry exists on the store');
ok(store.getAllSubjectsForRecordkeeping().includes('gardening'),
  'gardening reaches the record (report card / transcript / compliance packet)');
ok(!store.getSubjects().includes('gardening'),
  'gardening does NOT reach getSubjects() — no mission list or roster row');

// Seed a real log and run the real getter.
useAppStore.setState({
  gardenLog: [
    { id: 1, date: '2026-08-14', kind: 'changeover', title: 'x', data: null },
    { id: 2, date: '2026-08-14', kind: 'session', title: 'x', data: null },
    { id: 3, date: '2026-08-14', kind: 'observation', title: 'x', data: null },
    { id: 4, date: '2026-08-15', kind: 'sun-reading', title: 'x', data: { zone: 'A1', condition: 'direct' } },
    { id: 5, date: '2026-08-15', kind: 'watering', title: 'x', data: { zone: 'A1', amount: 8, unit: 'cups' } },
    { id: 6, date: '2026-08-15', kind: 'watering', title: 'x', data: { zone: 'B1', amount: 6, unit: 'cups' } },
    { id: 7, date: '2026-08-16', kind: 'harvest', title: 'x', data: null }
  ]
});
const rec = useAppStore.getState().getParticipationRecord('gardening');
ok(rec.sessions === 1, `sessions counted: ${rec.sessions}`);
ok(rec.daysInTheGarden === 3, `distinct days counted: ${rec.daysInTheGarden}`);
ok(rec.waterings === 2, `waterings counted (two on the same day, both kept): ${rec.waterings}`);
ok(rec.seasonChangeovers === 1, `changeovers counted: ${rec.seasonChangeovers}`);
ok(rec.entriesLogged === 7, `total entries counted: ${rec.entriesLogged}`);

const card = useAppStore.getState().getReportCardData();
const gRow = card.find((r) => r.subject === 'gardening');
ok(Boolean(gRow), 'gardening has a report card row');
ok(gRow?.isParticipation === true, 'the gardening row is flagged as participation');
ok(gRow?.letterGrade === null && gRow?.averageAccuracy === null,
  'the gardening row carries NO letter grade and NO accuracy');
ok(gRow?.totalLessons === 0 && gRow?.mastered === 0,
  'the gardening row reports 0/0 lessons without that being a grade');
ok(Array.isArray(gRow?.strands) && Array.isArray(gRow?.needsAttention),
  'the gardening row still returns every field the six consuming screens read');
useAppStore.setState({ gardenLog: [] });

// ===========================================================================
console.log('\n--- 6. the sun survey project ---');
// ===========================================================================
ok(gardenProjects.length === 6, `6 garden projects built so far (found ${gardenProjects.length})`);
// TOOL POLICY (parent, Aug 8 2026): he runs the tools. Safety content teaches
// technique rather than removing him from the job.
for (const p of gardenProjects.filter((x) => x.toolSkill)) {
  ok(!p.safetyTips.some((t) => /an adult (runs|does|operates|handles)/i.test(t)),
    `${p.id}: no safety tip hands the tool to an adult instead of teaching him to use it`);
  ok(p.safetyTips.length >= 5,
    `${p.id}: carries real technique instruction (${p.safetyTips.length} safety points)`);
  ok(typeof p.toolSkill === 'string' && p.toolSkill.length > 30,
    `${p.id}: names the transferable shop skill it teaches`);
}
ok(gardenProjects.some((p) => /clamp/i.test(p.toolSkill || '')),
  'the first tool build teaches securing the work — the skill that actually keeps his hands');
for (const p of gardenProjects) {
  ok(p.category === 'experiment', `${p.id}: category 'experiment' (routes to a graded Journal entry)`);
  ok(p.subject === 'gardening', `${p.id}: subject is gardening`);
  ok(typeof p.minWords === 'number' && p.minWords > 0, `${p.id}: has a minWords floor (${p.minWords})`);
  ok(typeof p.instructions === 'string' && p.instructions.length > 100, `${p.id}: has real write-up instructions`);
  ok(typeof p.iterationPrompt === 'string' && p.iterationPrompt.length > 50, `${p.id}: has an iterationPrompt`);
  ok(Array.isArray(p.procedure) && p.procedure.length >= 5, `${p.id}: procedure has ${p.procedure?.length} steps`);
  ok(Array.isArray(p.safetyTips) && p.safetyTips.length >= 1, `${p.id}: has safety tips`);
  ok(Array.isArray(p.materials) && p.materials.length >= 1, `${p.id}: has a materials list`);
  ok(Boolean(getGardenBriefById(p.relatedBriefId)),
    `${p.id}: relatedBriefId '${p.relatedBriefId}' resolves to a real brief`);
}

// No id may collide with any other project or any lesson anywhere in the app.
const allOtherProjectIds = new Set([
  ...aerospaceProjects.map((p) => p.id),
  ...scienceExperiments.map((p) => p.id),
  ...technologyProjects.map((p) => p.id),
  ...roboticsProjects.map((p) => p.id)
]);
const lessonIds = new Set(allLessons.map((l) => l.id));
for (const p of gardenProjects) {
  ok(!allOtherProjectIds.has(p.id), `${p.id}: does not collide with another project id`);
  ok(!lessonIds.has(p.id), `${p.id}: does not collide with a lesson id`);
}

// ===========================================================================
console.log('\n--- 7. the Q1 briefs ---');
// ===========================================================================
// Per-quarter, so building Q3 later cannot silently break Q1's guarantees.
const PERIODS = [
  { quarter: 'Q1 2026-2027', briefs: 8, start: GARDEN_Q1_START, end: GARDEN_Q1_END },
  { quarter: 'Q2 2026-2027', briefs: 4, start: GARDEN_Q2_START, end: GARDEN_Q2_END },
  { quarter: 'Q3 2026-2027', briefs: 6, start: GARDEN_Q3_START, end: GARDEN_Q3_END },
  { quarter: 'Q4 2026-2027', briefs: 4, start: GARDEN_Q4_START, end: GARDEN_Q4_END },
  { quarter: 'Summer 2027', briefs: 3, start: GARDEN_SUMMER_START, end: GARDEN_SUMMER_END }
];
const EXPECTED_TOTAL = PERIODS.reduce((n, p) => n + p.briefs, 0);
ok(gardenBriefs.length === EXPECTED_TOTAL,
  `${EXPECTED_TOTAL} briefs across ${PERIODS.length} built quarter(s) (found ${gardenBriefs.length})`);
const briefIds = gardenBriefs.map((b) => b.id);
ok(new Set(briefIds).size === briefIds.length, 'no duplicate brief ids');
for (const b of briefIds) ok(!lessonIds.has(b), `brief id ${b} does not collide with a lesson id`);
ok(gardenBriefs.every((b) => isFriday(b.date)), 'every brief date is a Friday');
ok(gardenBriefs.every((b, i) => i === 0 || b.date > gardenBriefs[i - 1].date),
  'briefs are in ascending date order across the whole file');
for (const period of PERIODS) {
  const inPeriod = gardenBriefs.filter((b) => b.quarter === period.quarter);
  ok(inPeriod.length === period.briefs,
    `${period.quarter}: ${period.briefs} briefs (found ${inPeriod.length})`);
  ok(inPeriod.every((b, i) => b.sequenceInQuarter === i + 1),
    `${period.quarter}: sequenceInQuarter runs 1..${inPeriod.length} in file order`);
  ok(inPeriod.every((b) => b.date >= period.start && b.date <= period.end),
    `${period.quarter}: every brief falls inside its own window`);
}
ok(gardenBriefs.every((b) => PERIODS.some((p) => p.quarter === b.quarter)),
  'no brief is tagged with an unbuilt quarter');

// Teaching depth. The 900-char per-item / 1,200-char subject-average floors in
// verify-curriculum.mjs apply to graded subjects; gardening is held to them
// anyway rather than being allowed to be thinner because nobody grades it.
const TEACHING_FLOOR = 900;
const SUBJECT_AVG_FLOOR = 1200;
const depths = gardenBriefs.map((b) => ({
  id: b.id,
  chars: b.teaching.reduce((n, t) => n + t.heading.length + t.text.length, 0)
}));
const thin = depths.filter((d) => d.chars < TEACHING_FLOOR);
ok(thin.length === 0, `every brief carries at least ${TEACHING_FLOOR} characters of teaching`,
  thin.map((d) => `${d.id} (${d.chars})`).join(', '));
const avg = Math.round(depths.reduce((n, d) => n + d.chars, 0) / depths.length);
ok(avg >= SUBJECT_AVG_FLOOR, `subject teaching average ${avg} clears the ${SUBJECT_AVG_FLOOR} floor`);

for (const b of gardenBriefs) {
  ok(typeof b.whyToday === 'string' && b.whyToday.length > 40, `${b.id}: says why it is THIS Friday`);
  ok(Array.isArray(b.doInTheGarden) && b.doInTheGarden.length >= 4, `${b.id}: has hands-on steps`);
  ok(Array.isArray(b.logThis) && b.logThis.length >= 1, `${b.id}: names what to log`);
  ok(Array.isArray(b.sources) && b.sources.length >= 1, `${b.id}: cites a source`);
}
// ---------------------------------------------------------------------------
// THE NASA THREAD — asked for directly by the parent (Aug 8, 2026): "with
// every qtr there is some reference back to NASA so that it all can come
// together correct?"
//
// At the time she asked, the answer was NO. Q1 had two real NASA briefs; Q2
// had three passing mentions and cited no NASA source at all. It had happened
// in Q1 because it was written that way, not because anything required it.
// This guard is what makes it structural instead of remembered.
//
// The rule is ONE LOAD-BEARING ANCHOR PER QUARTER, not NASA in every brief.
// The design is explicit that the NASA link is "structural, not decorative,"
// and sprinkling it through all 25 briefs would be exactly the padding this
// project refuses everywhere else. So: at least one per quarter, and it has to
// carry a real cited nasa.gov source rather than a passing mention.
// ---------------------------------------------------------------------------
const isNasaSource = (src) => /(^|\/\/)([a-z0-9-]+\.)*nasa\.gov\//i.test(src.url);
for (const period of PERIODS) {
  const inPeriod = gardenBriefs.filter((b) => b.quarter === period.quarter);
  const anchors = inPeriod.filter((b) => (b.sources || []).some(isNasaSource));
  ok(anchors.length >= 1,
    `${period.quarter}: at least one brief cites a real NASA source (found ${anchors.length})`,
    'Every quarter ties back to NASA. A quarter without one breaks the through-line the whole subject is built on.');
  // And the anchor has to actually TEACH it, not just footnote it.
  const teaches = anchors.some((b) =>
    b.teaching.some((t) => /NASA|Veggie|PONDS|space station|microgravity|orbit/i.test(t.heading + t.text)));
  ok(teaches, `${period.quarter}: the NASA source backs a real teaching block, not a footnote`);
}

// No source anywhere may be a bare domain placeholder. A link that goes to a
// homepage is not a citation — it is a gesture at one, and it silently rots
// into "somebody will fix this later."
const allSources = gardenBriefs.flatMap((b) => (b.sources || []).map((src) => ({ b: b.id, ...src })));
const bare = allSources.filter((src) => /^https?:\/\/[^/]+\/?$/.test(src.url));
ok(bare.length === 0, 'no source is a bare domain placeholder',
  bare.map((x) => `${x.b} -> ${x.url}`).join(', '));
ok(allSources.every((src) => typeof src.label === 'string' && src.label.length > 10),
  'every source carries a label naming the actual publication');

// Every project a brief opens or closes must actually exist.
const projectIds = new Set(gardenProjects.map((p) => p.id));
for (const b of gardenBriefs) {
  if (b.opensProjectId) ok(projectIds.has(b.opensProjectId), `${b.id}: opensProjectId resolves`);
  if (b.closesProjectId) ok(projectIds.has(b.closesProjectId), `${b.id}: closesProjectId resolves`);
}
ok(gardenBriefs.filter((b) => b.opensProjectId === 'gd7-project-sun-survey').length === 1,
  'the sun survey is opened by exactly one brief');
ok(gardenBriefs.filter((b) => b.closesProjectId === 'gd7-project-sun-survey').length === 1,
  'the sun survey is closed by exactly one brief');
const opensAt = gardenBriefs.find((b) => b.opensProjectId === 'gd7-project-sun-survey').date;
const closesAt = gardenBriefs.find((b) => b.closesProjectId === 'gd7-project-sun-survey').date;
ok(opensAt < closesAt, `the survey opens (${opensAt}) before it closes (${closesAt})`);

// Every project that gets OPENED must also get CLOSED by a later brief, or it
// has no graded write-up and no measured before/after. Trellis v2 is the known
// exception: it opens in Q3 and its comparison lands in Q4, which is not built
// yet — asserted explicitly so it cannot be forgotten rather than waived.
// THE YEAR IS COMPLETE. Every project now opens and closes inside the built
// calendar, so the waiver list is deliberately EMPTY. A future quarter that
// opens a build without closing it will fail here rather than pass quietly.
const OPENS_IN_A_LATER_QUARTER = new Set();
for (const proj of gardenProjects) {
  const opened = gardenBriefs.find((b) => b.opensProjectId === proj.id);
  const closed = gardenBriefs.find((b) => b.closesProjectId === proj.id);
  ok(Boolean(opened), `${proj.id} is opened by a brief`);
  if (OPENS_IN_A_LATER_QUARTER.has(proj.id)) {
    ok(!closed, `${proj.id} closes in a quarter that is not built yet — tracked, not forgotten`);
  } else {
    ok(Boolean(closed) && opened.date < closed.date,
      `${proj.id} is opened and then closed by a later brief`);
  }
}

// ===========================================================================
console.log('\n--- 8. the Q1 calendar ---');
// ===========================================================================
const EXPECTED_DAYS = 51; // Q1 12 + Q2 8 + Q3 13 + Q4 9 + Summer 9
ok(gardenCalendar.length === EXPECTED_DAYS,
  `${EXPECTED_DAYS} Fridays across the built quarters (found ${gardenCalendar.length})`);
ok(gardenCalendar.every((d) => isFriday(d.date)),
  'every calendar date is a Friday',
  "a bare 'YYYY-MM-DD' parses as UTC and lands on Thursday in America/New_York — these are parsed at local noon");
const dates = gardenCalendar.map((d) => d.date);
ok(new Set(dates).size === dates.length, 'no duplicate calendar dates');
ok(dates.every((d, i) => i === 0 || d > dates[i - 1]), 'calendar dates are in ascending order');
ok(dates[0] === GARDEN_Q1_START, `the calendar opens on ${GARDEN_Q1_START}`);
ok(dates[dates.length - 1] === GARDEN_SUMMER_END, `the calendar ends on ${GARDEN_SUMMER_END}`);
/**
 * Consecutive Fridays: exactly 7 days apart, so no Friday is silently missing.
 *
 * ---- WHY THIS COUNTS DAYS INSTEAD OF DIVIDING MILLISECONDS (Aug 29, 2026) ----
 *
 * It used to be `(new Date(b) - new Date(a)) / 86400000`, parsed at local noon —
 * and it failed in America/New_York, which is the timezone this school actually
 * runs in. Two of the fifty gaps came back 7.0416666… and 6.9583333…, which is
 * 7 days ± one hour: the spring-forward and fall-back boundaries, where a local
 * day is 23 or 25 hours long and 86,400,000 is simply the wrong divisor.
 *
 * The dates were never wrong. Every one of them is a Friday, in order, with no
 * gaps — the other checks around this one say so and always passed. Only the
 * ruler was wrong, and only twice a year.
 *
 * Counting calendar days in UTC has no such boundary: a date string pinned to
 * UTC midnight is a calendar date and nothing else, which is exactly what a
 * school calendar is. Noon-parsing was the right instinct for the SHAPE of this
 * bug and it does not survive subtraction.
 */
const dayNumber = (dateStr) => Math.round(Date.parse(dateStr + 'T00:00:00Z') / 86400000);
const gaps = dates.slice(1).map((d, i) => dayNumber(d) - dayNumber(dates[i]));
ok(gaps.every((g) => g === 7), 'no Friday is missing from the window', `gaps: ${gaps.join(',')}`);
// Every Friday is exactly one of: carries a brief · open · closed.
const withBrief = gardenCalendar.filter((d) => d.briefId);
const closedDays = gardenCalendar.filter((d) => d.closed);
const openDays = gardenCalendar.filter((d) => !d.briefId && !d.closed);
ok(withBrief.length + openDays.length + closedDays.length === gardenCalendar.length,
  'every Friday is exactly one of brief / open / closed — no overlaps');
ok(closedDays.every((d) => !d.briefId),
  'a CLOSED Friday never carries a brief — school being out is not a garden day he skipped');
ok(withBrief.length === EXPECTED_TOTAL,
  `${EXPECTED_TOTAL} Fridays carry a brief (found ${withBrief.length})`);
// 23 and 3, not 22 and 4, since Aug 9 2026: Friday Nov 27 used to be closed
// for a "Thanksgiving break" this family does not take. The parent takes the
// actual holiday off and works the week around it, so that Friday went back to
// being an ordinary open garden day. See src/academies/lamar/data/schedule/schoolHolidays.js,
// which is now the single list of days off, and verify-school-calendar.mjs,
// which checks these two calendars against each other in both directions.
ok(openDays.length === 23, `23 Fridays are deliberately open (found ${openDays.length})`);
ok(closedDays.length === 3, `3 Fridays are school closures (found ${closedDays.length})`);
ok(closedDays.every((d) => typeof d.closedReason === 'string' && d.closedReason.length > 10),
  'every closure states WHY the school is closed');
ok(withBrief.every((d) => Boolean(getGardenBriefById(d.briefId))), 'every scheduled briefId resolves');
ok(new Set(withBrief.map((d) => d.briefId)).size === EXPECTED_TOTAL, 'each brief is scheduled exactly once');
ok(gardenBriefs.every((b) => withBrief.some((d) => d.briefId === b.id)),
  'every brief that exists is actually SCHEDULED — an unscheduled brief is invisible');
ok(openDays.every((d) => typeof d.suggestion === 'string' && d.suggestion.length > 30),
  'every open Friday still suggests real work — an unrecorded Friday costs a Georgia attendance day');
ok(withBrief.every((d) => d.suggestion === null), 'a brief-carrying Friday carries no competing suggestion');
// A closed Friday must never be offered as "this Friday in the garden".
// Nov 27 is open again, so the next garden day after Nov 24 IS Nov 27. The
// step-over behaviour is still worth guarding — Christmas Day is the closure
// that exercises it now.
ok(getNextGardenDay(new Date('2026-11-24T12:00:00'))?.date === '2026-11-27',
  'the next garden day after Nov 24 is Friday Nov 27, which is a school day here');
ok(getNextGardenDay(new Date('2026-12-20T12:00:00'))?.date === '2027-01-08',
  'the next-garden-day lookup steps over the Christmas and New Year closures');
// Each brief's own date must match where the calendar schedules it.
for (const d of withBrief) {
  ok(getGardenBriefById(d.briefId).date === d.date,
    `${d.briefId} is scheduled on its own date (${d.date})`);
}
// The week-of lookup must find the Friday from a mid-week day.
const wed = new Date('2026-08-19T12:00:00');
ok(getGardenDayForWeekOf(wed)?.date === '2026-08-21',
  'a Wednesday resolves to that week\'s Friday');
ok(getGardenDayForDate(new Date('2026-08-14T12:00:00'))?.briefId === 'gd7-q1-b1-changeover',
  'Aug 14 resolves to the changeover brief');

// ===========================================================================
console.log('\n--- 9. the build track ---');
// ===========================================================================
ok(gardenBuildTrack.length === 5, `5 builds (found ${gardenBuildTrack.length})`);
ok(gardenBuildTrack.every((b, i) => b.number === i + 1), 'builds are numbered 1..5 in order');
ok(new Set(gardenBuildTrack.map((b) => b.id)).size === 5, 'no duplicate build ids');
ok(gardenBuildTrack[0].gatedBy === null, 'build 1 gates nothing before it');
ok(gardenBuildTrack.slice(1).every((b) => b.gatedBy === 1), 'builds 2-5 are all gated behind build 1');
ok(gardenBuildTrack.slice(1).every((b) => typeof b.gatedReason === 'string' && b.gatedReason.length > 20),
  'every locked build states WHY it is locked');
ok(buildsUnlockedBy([]).length === 1, 'before the survey, only build 1 is unlocked');
ok(buildsUnlockedBy([1]).length === 5, 'after the survey, all five are unlocked');
ok(gardenBuildTrack.every((b) => Array.isArray(b.drawsOn) && b.drawsOn.length >= 1),
  'every build names the subject material it draws on');
// A build whose status says 'built' must actually have a buildable project.
for (const b of gardenBuildTrack.filter((x) => x.status === 'built' || x.status === 'active')) {
  ok(Boolean(b.projectId) && gardenProjects.some((p) => p.id === b.projectId),
    `build ${b.number} (${b.status}) points at a real project: ${b.projectId}`);
}
for (const b of gardenBuildTrack.filter((x) => x.status === 'locked')) {
  ok(b.projectId === null, `build ${b.number} is locked and correctly has no project yet`);
}
ok(gardenBuildTrack.filter((b) => b.projectId).length + 1 === gardenProjects.length,
  'every built project is claimed by a build on the track, plus the capstone');
ok(gardenProjects.some((p) => p.id === gardenCapstone.projectId),
  `the capstone points at a real buildable project: ${gardenCapstone.projectId}`);
ok(gardenBuildTrack.every((b) => b.status !== 'locked'),
  'no build is still locked — the whole track is buildable');

// ---------------------------------------------------------------------------
// WHOLE-YEAR COMPLETENESS. Every school period the app knows about must have
// garden Fridays mapped, or a quarter silently has no subject in it.
// ---------------------------------------------------------------------------
const SCHOOL_PERIODS = ['Q1 2026-2027', 'Q2 2026-2027', 'Q3 2026-2027', 'Q4 2026-2027', 'Summer 2027'];
for (const period of SCHOOL_PERIODS) {
  ok(gardenCalendar.some((d) => d.quarter === period), `${period}: has garden Fridays on the calendar`);
  ok(gardenBriefs.some((b) => b.quarter === period), `${period}: has at least one brief`);
}
ok(PERIODS.length === SCHOOL_PERIODS.length,
  `all ${SCHOOL_PERIODS.length} school periods are built (${PERIODS.length} in the period table)`);
const totalBriefs = PERIODS.reduce((n, p) => n + p.briefs, 0);
ok(totalBriefs >= 20 && totalBriefs <= 25,
  `the year's brief count (${totalBriefs}) sits inside the design's 20-25 budget`);
ok(gardenCalendar.every((d) => SCHOOL_PERIODS.includes(d.quarter)),
  'no calendar day is tagged with a period the school year does not have');
ok(gardenBuildTrack.every((b) => typeof b.measureBeforeAfter === 'string' && b.measureBeforeAfter.length > 20),
  'every build names a number measured before and after');
// The parent's actual question: is the cross-subject material real and named?
const subjectsDrawnOn = new Set(gardenBuildTrack.flatMap((b) => b.drawsOn.map((d) => d.subject)));
for (const s of ['technology', 'aerospace', 'robotics']) {
  ok(subjectsDrawnOn.has(s), `the build track draws on ${s}`);
}
// And that the Technology project it names actually exists.
ok(technologyProjects.some((p) => p.id === 'tech7-tinkercad-parametric-shelf'),
  'the parametric-shelf Technology project the vertical build cites really exists');
ok(allLessons.some((l) => l.id === 'rb7-sensors'), 'the Robotics sensor lesson the capstone cites really exists');
ok(isFriday(gardenCapstone.namedOn),
  `the capstone is named on a Friday (${gardenCapstone.namedOn}) — it has to land on a garden day to be said out loud`);
ok(gardenCapstone.namedOn >= GARDEN_Q1_START && gardenCapstone.namedOn <= GARDEN_Q1_END,
  `the Q4 capstone is NAMED inside Q1 (${gardenCapstone.namedOn}) — per the design's "name it in August"`);
const namingBrief = gardenBriefs.find((b) => b.date === gardenCapstone.namedOn);
ok(Boolean(namingBrief), 'a real brief lands on the capstone naming date');
ok(namingBrief?.connectsTo?.some((c) => c.subject === 'robotics'),
  'that brief actually names the Robotics connection to the student');

// ===========================================================================
// THE SUN SURVEY REPORTS ONLY WHAT IT MEASURED. (Aug 24, 2026.)
//
// The parent: "The readings didn't move over to the project. The directions
// are not clear either."
//
// Two faults, one cause. `BuildTrackView` held `gardenLog`, counted the
// readings, and printed a sentence DESCRIBING "eight numbers that did not
// exist before" without ever computing them. And `SunSurveyView` divided
// direct readings by DAYS SEEN rather than days FINISHED — so four hourly
// checks on one day were reported as "4.0 h/day", a full-day figure produced
// from 40% of a day. That number decides where a raised bed goes for a year.
// ===========================================================================
console.log('\n--- the sun survey ---');
{
  const sun = await import(REPO + '/src/lib/sunSurvey.js');
  const surveyView = read('src/components/Garden/SunSurveyView.jsx');
  const buildView = read('src/components/Garden/BuildTrackView.jsx');

  ok(sun.CHECKS_PER_DAY === sun.SUN_HOURS.length && sun.SUN_HOURS.length === 10,
    `a survey day is every hour 9am-6pm (${sun.CHECKS_PER_DAY} checks)`);
  ok(sun.SUN_ZONES.length === 8, 'eight zones, two rows of four');

  // A day short of a full round must NOT produce a per-day figure.
  const partial = [];
  for (const hour of [10, 11, 12, 14]) {
    for (const zone of sun.SUN_ZONES) {
      partial.push({ kind: 'sun-reading', date: '2026-08-23', data: { zone, hour, condition: 'direct' } });
    }
  }
  const p = sun.sunSurveyStats(partial, '2026-08-23');
  ok(p.daysStarted === 1 && p.completeDays === 0,
    'four hours of checks is a day STARTED, not a day completed');
  ok(p.zones.A1.hoursPerDay === null,
    'a partial day yields NO hours-per-day figure — this is the whole fix');
  ok(p.hasTrustworthyNumbers === false, '...and the screens are told the numbers are not usable yet');
  ok(sun.zoneClass(p.zones.A1.hoursPerDay).known === false,
    '...so a zone cannot be classified off an unfinished day');
  ok(p.hoursCheckedToday === 4 && p.checksLeftToday === 6,
    'progress is counted in HOURS finished, not readings collected');

  // A complete day must produce one.
  const full = [];
  for (const hour of sun.SUN_HOURS) {
    for (const zone of sun.SUN_ZONES) {
      full.push({ kind: 'sun-reading', date: '2026-08-25', data: { zone, hour, condition: hour < 15 ? 'direct' : 'full' } });
    }
  }
  const f = sun.sunSurveyStats(full, '2026-08-25');
  ok(f.completeDays === 1, 'ten hours of checks IS a complete survey day');
  ok(f.zones.A1.hoursPerDay === 6, '...and then the per-day figure appears (6 direct hours)');
  ok(sun.zoneClass(f.zones.A1.hoursPerDay).known === true, '...and the zone can be classified');

  // Readings from an unfinished day must never leak into a complete-day average.
  const mixed = sun.sunSurveyStats([...full, ...partial], '2026-08-25');
  ok(mixed.completeDays === 1 && mixed.zones.A1.hoursPerDay === 6,
    'an unfinished day does not dilute or inflate the average from finished days');

  // The screens must READ the answer, not describe it.
  ok(/sunSurveyStats/.test(buildView) && /The eight numbers/.test(buildView),
    'the Build Track computes and shows the eight numbers it promises');
  ok(!/\{build\.measureBeforeAfter\}\s*<\/p>\s*<\/div>\s*\)\s*\)/.test(buildView),
    'the Build Track no longer ends at the sentence describing them');
  ok(/sunSurveyStats/.test(surveyView) && !/direct \/ surveyDays/.test(surveyView),
    'the logger uses the shared calculation, not its own days-seen division');
  ok(/of \{tally\[zone\]\.checked\} checked/.test(surveyView),
    'each zone states what was actually checked, not just a derived rate');

  // The directions have to say the thing he got wrong.
  ok(/one<\/span> tap/.test(surveyView) || /one tap/.test(surveyView),
    'the directions say one tap per zone');
  ok(/all\{'? ?'?\}?\s*\{?CHECKS_PER_DAY\}? hours are done|hours are done/.test(surveyView),
    'the directions say a day only counts when every hour is done');
}

// ===========================================================================
console.log('\n--- 12. the watering log, and the dates on the builds ---');
// ===========================================================================
{
  const water = await import('../src/lib/wateringLog.js');
  const { gardenCalendarItems } = await import('../src/lib/plannerFeeds.js');
  const logView = read('src/components/Garden/GardenLogView.jsx');
  const buildView = read('src/components/Garden/BuildTrackView.jsx');

  const TODAY = '2026-08-24'; // a Monday, so week boundaries in these fixtures are unambiguous
  const w = (date, amount = 4, unit = 'cups', zone = 'A1') => ({
    kind: 'watering', date, data: { zone, amount, unit }
  });

  // ---- the empty case says nothing it cannot back up ----
  const none = water.wateringStats([], TODAY);
  ok(none.weeks.length === water.WEEKS_TRACKED, 'the strip always shows the last four weeks, logged or not');
  ok(none.weeksCovered === 0 && none.streak === 0, 'an empty log claims no weeks and no streak');
  ok(none.canRankZones === false && none.weeksUntilRanking === 4,
    'an empty log states how many weeks are still needed before the zones can be ranked');

  /**
   * ---- THE CHECK THAT WOULD HAVE CAUGHT THE OLD PANEL ----
   *
   * The screen printed a TOTAL. Twelve rows in one week and twelve weeks in a
   * row produce the same total, and only one of them is the habit the November
   * build depends on. This fixture is the first of those two: a naive
   * count-the-rows implementation passes the total and fails here.
   */
  const oneBusyWeek = Array.from({ length: 12 }, () => w('2026-08-24'));
  const busy = water.wateringStats(oneBusyWeek, TODAY);
  ok(busy.totalRows === 12 && busy.weeksCovered === 1,
    'twelve rows in one week is ONE week covered, not twelve');
  ok(busy.canRankZones === false,
    '...and twelve rows in one week does NOT unlock the four-week zone ranking');

  // ---- four weeks running ----
  const fourWeeks = [w('2026-08-03'), w('2026-08-11'), w('2026-08-18'), w('2026-08-24')];
  const kept = water.wateringStats(fourWeeks, TODAY);
  ok(kept.weeksCovered === 4 && kept.streak === 4, 'four consecutive weeks reads as four covered, streak 4');
  ok(kept.canRankZones === true && kept.weeksUntilRanking === 0,
    'four weeks of rows unlocks the Sep 25 thirstiest-zone ranking');

  // ---- a gap breaks the streak, and is allowed to ----
  const gapped = water.wateringStats([w('2026-08-03'), w('2026-08-11'), w('2026-08-24')], TODAY);
  ok(gapped.weeksCovered === 3 && gapped.streak === 1,
    'a skipped week breaks the streak without hiding the weeks that were kept');

  /**
   * An empty CURRENT week must not break the streak. It is Monday morning at
   * some point every single week; a streak that resets each Monday and rebuilds
   * by Friday is noise, and he would learn to ignore it.
   */
  const midweek = water.wateringStats([w('2026-08-03'), w('2026-08-11'), w('2026-08-18')], TODAY);
  ok(midweek.streak === 3, 'an as-yet-unlogged current week does not break the streak');

  // ---- units are not added together ----
  const mixedUnits = water.wateringStats([w('2026-08-24', 4, 'cups'), w('2026-08-24', 1, 'gallons')], TODAY);
  ok(mixedUnits.totalsByUnit.cups === 4 && mixedUnits.totalsByUnit.gallons === 1,
    'cups and gallons are totalled separately, never summed into one figure');
  ok(!/reduce\(\(n, r\) => n \+ r\.data\.amount/.test(logView),
    'the log screen no longer sums amounts across units into a single number');

  // A gallon is 16 cups — the thirstiest zone must not sort on the raw digit.
  const thirst = water.zonesByThirst(
    water.wateringStats([w('2026-08-24', 4, 'cups', 'A1'), w('2026-08-24', 1, 'gallons', 'B2')], TODAY).byZone
  );
  ok(thirst[0].zone === 'B2', 'thirstiest-zone ranking converts units before comparing');

  ok(water.weekKeyOf('2026-08-27') === '2026-08-24', 'a week is keyed to its Monday');

  // ---- the screens have to READ it ----
  ok(/wateringStats/.test(logView) && /of the last \{water\.weeksTracked\} weeks/.test(logView),
    'the garden log reports how many of the last four weeks were logged');
  ok(/wateringStats/.test(buildView) && /Preparing for this one/.test(buildView),
    'the Build Track says what he is doing between now and the November build');

  /**
   * ---- THE DATES WERE ALWAYS THERE ----
   *
   * Parent, Aug 24: "I don't understand the builds. due dates for gardening.
   * They seem like these are builds that can be completed in a month." Every
   * build IS opened by one Friday brief and closed by another, and
   * gardenCalendarItems has read those two as start and due since Aug 14. The
   * card never asked. These check the property, from the real function.
   */
  const buildItems = gardenCalendarItems({ gardenLog: [] }).filter((i) => i.key.startsWith('garden-build::'));
  ok(buildItems.length === gardenBuildTrack.length,
    'every build on the track produces a dated planner item',
    `${buildItems.length} of ${gardenBuildTrack.length}`);
  const undated = buildItems.filter((i) => !i.startBy || !i.dueDate);
  ok(undated.length === 0, 'every build has BOTH a start date and a due date', undated.map((i) => i.title).join(', '));
  const backwards = buildItems.filter((i) => i.startBy >= i.dueDate);
  ok(backwards.length === 0, 'no build is due before it starts', backwards.map((i) => i.title).join(', '));

  /**
   * Assert the RENDER, not the variable. The first version of this check tested
   * for `sched?.dueDate` anywhere in the file — and a mutation that deleted the
   * whole date row still passed it, because the overdue computation four lines
   * above mentions the same field. Same trap as the five earlier ones: a bare
   * identifier is not evidence the screen shows anything.
   */
  ok(/dayLabel\(sched\.startBy\)/.test(buildView) && /dayLabel\(sched\.dueDate\)/.test(buildView),
    'the Build Track card prints the start and due dates rather than only a month name');
  ok(/gardenCalendarItems/.test(buildView),
    '...and reads them from the planner feed, not by re-deriving them from the briefs');
  ok(/overdue/.test(buildView), 'a build past its due date is flagged overdue on the card');

  /**
   * The complaint underneath the complaint: with a month printed and no
   * duration, a build looks like a month of work. None of them is.
   */
  const missingTime = gardenBuildTrack.filter((b) => {
    const p = gardenProjects.find((x) => x.id === b.projectId);
    return !p || !Number.isFinite(p.estMinutes);
  });
  ok(missingTime.length === 0, 'every build has a real hands-on time estimate',
    missingTime.map((b) => b.title).join(', '));
  const marathon = gardenBuildTrack.filter((b) => {
    const p = gardenProjects.find((x) => x.id === b.projectId);
    return p && p.estMinutes > 300;
  });
  ok(marathon.length === 0, 'no build is longer than five hours of hands-on work',
    marathon.map((b) => b.title).join(', '));
  ok(/workTimeLabel/.test(buildView), 'the card renders that time in hours, not a bare minute count');

  /**
   * The sun survey is the one build whose minute count understates the job —
   * 90 minutes of setup and write-up around two full days of hourly checks.
   * Printed bare it is a lie in the opposite direction, so it carries a note.
   */
  const survey = gardenBuildTrack.find((b) => b.projectId === 'gd7-project-sun-survey');
  ok(typeof survey.timeNote === 'string' && /two clear days/.test(survey.timeNote),
    'the sun survey says its 90 minutes is setup and write-up, not the measuring');
  ok(/build\.timeNote/.test(buildView), '...and the card actually renders that note');
}

// ===========================================================================
console.log(`\n${failures === 0 ? 'ALL CHECKS PASSED' : failures + ' CHECK(S) FAILED'}`);
process.exit(failures === 0 ? 0 : 1);
