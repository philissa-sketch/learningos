/**
 * ===========================================================================
 * ENGINEER READINESS REACHES THE RECORD — AND CANNOT REACH A GRADE.
 * ===========================================================================
 *
 * The parent, Aug 28 2026: *"how to use the engineer readiness in the parent
 * dashboard. that isn't connected to anything."*
 *
 * She was right. Eleven skills, three levels, a written rubric per level, and a
 * full dated history of every level change — all stored, and read by exactly
 * two screens: the one she awards on, and a counter on his rewards page. It
 * reached no report card, no transcript, and no compliance packet.
 *
 * The packet's own rule made that a defect rather than a gap: *"Every line
 * below is read from records the app already holds. If something is missing
 * here, the fix is to record it in the app, not to type it into the packet."*
 * It WAS recorded in the app.
 *
 * ---- THE TWO THINGS THIS FILE HAS TO PROVE ----
 *
 *   1. It now reaches the record — packet, transcript, report card.
 *   2. **It still cannot touch a grade.** Section 4 proves that behaviourally:
 *      the packet is built twice, with awards and without, and the graded
 *      sections must come out byte-identical. Not "does not currently" — a
 *      structural separation, asserted from both ends.
 */
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

const rd = await import(REPO + '/src/lib/readiness.js');
const cp = await import(REPO + '/src/lib/compliancePacket.js');

const AWARDS = {
  'technical-writing': {
    level: 'Gold',
    note: 'Wind tunnel write-up; explained the airflow unprompted.',
    updatedAt: '2028-03-04T00:00:00Z',
    history: [
      { level: 'Bronze', at: '2026-10-14T00:00:00Z' },
      { level: 'Silver', at: '2027-02-03T00:00:00Z' },
      { level: 'Gold', at: '2028-03-04T00:00:00Z' }
    ]
  },
  // Deliberately no history array — a row written before that field existed.
  'problem-solving': { level: 'Bronze', note: '', updatedAt: '2026-09-30T00:00:00Z' }
};

// ===========================================================================
console.log('--- 1. the rubric it is all built on ---');
// ===========================================================================
ok('eleven skills are tracked', rd.READINESS_SKILLS.length === 11, String(rd.READINESS_SKILLS.length));
ok('three levels, Bronze to Gold', rd.READINESS_LEVELS.join(',') === 'Bronze,Silver,Gold');
for (const skill of rd.READINESS_SKILLS) {
  ok(`"${skill.name}" states an observable standard for all three levels`,
    rd.READINESS_LEVELS.every((l) => typeof skill.levels?.[l] === 'string' && skill.levels[l].length > 20),
    'a level nobody can aim at cannot be awarded consistently over six years');
}

// ===========================================================================
console.log('\n--- 2. the packet carries it, dated ---');
// ===========================================================================
const withAwards = cp.buildCompliancePacket({
  studentName: 'Lamar', generatedOn: '2026-08-28', readinessAwards: AWARDS
});
const noAwards = cp.buildCompliancePacket({
  studentName: 'Lamar', generatedOn: '2026-08-28', readinessAwards: {}
});

ok('the packet has an Engineer Readiness section', withAwards.includes('8. ENGINEER READINESS'));
ok('...and it says plainly that it is not graded',
  /not part of any subject average/.test(withAwards),
  'a reader must not mistake a Bronze for a grade');
ok('an awarded skill prints its level', /Technical Writing — Gold/.test(withAwards));
ok('...the standard it met', /Standard met: Produces a full report/.test(withAwards));
ok('...its evidence note', /Evidence: Wind tunnel write-up/.test(withAwards));

/**
 * THE CHECK THAT MAKES THIS EVIDENCE RATHER THAN AN OPINION.
 *
 * "Gold in Technical Writing" is a claim. Three dated steps are a record of
 * growth, and the history array exists precisely because overwriting it once
 * destroyed the date he first reached Bronze.
 */
ok('THE CHECK: the full dated ladder is printed, not just the current level',
  /Bronze: Oct 14, 2026/.test(withAwards) &&
  /Silver: Feb 3, 2027/.test(withAwards) &&
  /Gold: Mar 4, 2028/.test(withAwards),
  'a level with no date cannot evidence anything');
ok('a row with no history array still prints its date',
  /Problem Solving — Bronze[\s\S]{0,200}Bronze: Sep 30, 2026/.test(withAwards),
  'an early award must not read as undated');

ok('unawarded skills are named as not yet awarded',
  /Not yet awarded: .*Leadership\./.test(withAwards));
ok('...and none of them is given an invented level',
  !/Leadership — /.test(withAwards),
  'a blank is true; an invented Bronze is a lie in a compliance document');
ok('the empty state is a real answer, not a blank section',
  /None awarded yet\. 11 skills are tracked\./.test(noAwards));

ok('the checklist moved to 9 and supporting files to 10',
  withAwards.includes('9. GEORGIA REQUIREMENTS CHECKLIST') && withAwards.includes('10. SUPPORTING FILES'));
ok('...and no section number is used twice',
  (() => {
    const nums = [...withAwards.matchAll(/^(\d+)\. [A-Z]/gm)].map((m) => m[1]);
    return nums.length === 10 && new Set(nums).size === 10;
  })(),
  [...withAwards.matchAll(/^(\d+)\. [A-Z]/gm)].map((m) => m[1]).join(','));

// ===========================================================================
console.log('\n--- 3. the store getter ---');
// ===========================================================================
const storeSrc = read('src/store/useAppStore.js');
ok('there is a dedicated getReadinessRecord getter', /getReadinessRecord\(\) \{/.test(storeSrc));
ok('...that reports isGraded: false on the object itself',
  /isGraded: false/.test(storeSrc),
  'so a future caller cannot mistake this for something that belongs in an average');
ok('...and never invents criteria for an unawarded skill',
  /criteria: level \? skill\.levels\?\.\[level\] \|\| null : null/.test(storeSrc));
ok('...and falls back to updatedAt when there is no history array',
  /\? \[\{ level, at: award\.updatedAt \}\]/.test(storeSrc));

// ===========================================================================
console.log('\n--- 4. IT CANNOT MOVE A GRADE ---');
// ===========================================================================
/**
 * Behavioural, not textual. The packet is built twice — once with two awards,
 * once with none — and every GRADED section must be byte-for-byte identical.
 * If readiness ever leaks into an average, this fails.
 */
const gradedSlice = (text) => {
  const from = text.indexOf('2. SUBJECTS AND PROGRESS');
  const to = text.indexOf('8. ENGINEER READINESS');
  return text.slice(from, to);
};
ok('THE CHECK: awarding a Gold changes NOTHING in the graded sections',
  gradedSlice(withAwards) === gradedSlice(noAwards),
  'readiness reaching a subject average would show up right here');

ok('the report card getter never mentions readiness',
  (() => {
    const from = storeSrc.indexOf('  getReportCardData() {');
    const to = storeSrc.indexOf('\n  getGradebookData', from);
    const body = storeSrc.slice(from, to > from ? to : from + 40000);
    return !/readiness/i.test(body);
  })(),
  'the array every average is computed from must not know this exists');

ok('the packet takes readinessAwards separately from reportCard',
  /readinessAwards = \{\},/.test(read('src/lib/compliancePacket.js')),
  'passing it inside reportCard is how it would end up averaged');

const uiSrc = read('src/components/Dashboard/ParentDashboard.jsx');
ok('the report card renders readiness from its own getter, not from `data`',
  /getReadinessRecord\(\)/.test(uiSrc) && /const readiness = useMemo\(/.test(uiSrc));
ok('...and says on screen that it is not graded',
  /not graded/.test(uiSrc) && /kept out of every subject average/.test(uiSrc));
/**
 * Scoped to ReportCardSection's own body. The first version searched the whole
 * file and failed on correct code, because "Engineer Readiness" also appears
 * hundreds of lines earlier as the Planning tab's label. Assert the property —
 * the readiness block sits below the grades WITHIN THIS SECTION — not wherever
 * the string happens to appear first.
 */
const rcFrom = uiSrc.indexOf('function ReportCardSection()');
const rcTo = uiSrc.indexOf('\n// Custom Assignment Creator', rcFrom);
const rcBody = uiSrc.slice(rcFrom, rcTo > rcFrom ? rcTo : uiSrc.length);
/**
 * Comments are stripped before the comparison. The second version of this check
 * failed on correct code too — it was matching the words "Engineer Readiness"
 * inside the explanatory comment above the getter, not the heading on screen.
 * What is under test is where the RENDERED heading sits, so the prose has to go.
 */
const rcCode = rcBody
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/\{\/\*[\s\S]*?\*\/\}/g, '')
  .replace(/^\s*\/\/.*$/gm, '');
ok('the report card section was located', rcFrom >= 0 && rcCode.length > 500);
ok('...below the grades, under its own heading',
  rcCode.indexOf('Grades by Subject') >= 0 &&
  rcCode.indexOf('Engineer Readiness') > rcCode.indexOf('Grades by Subject'),
  'above them it would read as one');

// ===========================================================================
console.log('\n--- 5. the transcript ---');
// ===========================================================================
ok('the transcript prints a readiness heading',
  /ENGINEER READINESS \(not graded, not part of any subject average\)/.test(uiSrc));
ok('...with the dated ladder',
  /step\.level \+ ' ' \+/.test(uiSrc) || /\$\{step\.level\} \$\{new Date\(step\.at\)/.test(uiSrc));
ok('...and an honest empty state',
  /None awarded yet\. \$\{readiness\.totalCount\} skills are tracked\./.test(uiSrc));
ok('...after every graded subject, not among them',
  uiSrc.indexOf('ENGINEER READINESS (not graded') > uiSrc.indexOf('Curriculum: ${evidence}'));

// ===========================================================================
console.log('\n--- 6. she can still find where to award them ---');
// ===========================================================================
ok('the awarding screen still exists in Planning',
  /'readiness', label: 'Engineer Readiness'/.test(uiSrc) || /id: 'readiness'/.test(uiSrc));
ok('the empty state tells her where to go',
  /Planning → Engineer Readiness/.test(uiSrc),
  'an empty panel that does not say what to do reads as broken');

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) {
  console.log(`\n${failures.length} CHECK(S) FAILED`);
  process.exitCode = 1;
} else {
  console.log('\nALL CHECKS PASSED');
}
