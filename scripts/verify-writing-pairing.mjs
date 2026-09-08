// ---------------------------------------------------------------------------
// A DOCUMENTATION PROMPT NAMES THE BUILD IT DOCUMENTS.
// Run: ACADEMY=lamar node scripts/verify-writing-pairing.mjs
//
// ---- WHERE THIS CAME FROM (Sep 8, 2026) ----
//
// The parent: "there is a Lab report writing journal that isn't connected to
// any lab experiment."
//
// The pairing was never missing from the PLAN. weeklySchedule.js opens by
// saying what it built — "pairs each hands-on Aerospace project with a
// thematically-matching documentation prompt in the same week (Bottle Rocket
// -> Mission Report, Parachute Drop -> Scientific Observation, Wind Tunnel ->
// Lab Report)" — and week 6 really is ['ae7-wind-tunnel', 'w7-lab-report'].
//
// It was missing from the SCREEN. WritingPromptEngine cycled the prompt's
// topicPool by attempt count and asked him for a report on "an experiment
// testing which material insulates heat best", in a week he had built a wind
// tunnel and watched real tissue strips move. A lab report about an experiment
// nobody ran has no measurements in it, and a lab report with invented results
// is a paragraph in the shape of one.
//
// ---- WHAT IS GUARDED, AND WHAT DELIBERATELY IS NOT ----
//
// Guarded: the pairing is READ rather than restated, every week's pairing
// resolves to exactly one build, an unpaired week is untouched, and both
// screens that show the prompt name the build.
//
// NOT guarded: which build sits in which week. That is the curriculum, it is
// the parent's, and pinning today's answer here would make her next change
// fail a test instead of a screen.
//
// Also guarded here, because this file is where it was found: lib/weeklyPlan.js
// must actually LOAD. Its content-pack declarations were appended below the
// module-level code that uses them, so importing it threw a ReferenceError.
// ---------------------------------------------------------------------------
import './lib/academy-under-test.mjs';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const wp = await import(REPO + '/src/lib/weeklyPlan.js');
const { academyContent } = await import(REPO + '/src/content/academyContent.js');
const { writingPrompts, weeklyWritingSchedule, SCHOOL_YEAR_START } = academyContent().writing;

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

/** A date inside school week `n`, so the pairing can be asked week by week. */
const dateInWeek = (n) => new Date(SCHOOL_YEAR_START.getTime() + ((n - 1) * 7 + 1) * 86400000);

console.log('\n--- 0. the module loads at all ---');
{
  /**
   * It did not, from the content-pack rewrite until Sep 8. `const SOURCES =
   * [writingPrompts, ...]` runs at module-evaluation time and the `const` it
   * reads was declared at the BOTTOM of the file — a temporal dead zone, so
   * the module threw "Cannot access 'writingPrompts' before initialization"
   * and took NovaScheduleGuide.jsx with it. verify-parses could not see it:
   * the syntax is perfectly valid.
   */
  ok('weeklyPlan.js evaluates without throwing', typeof wp.pairedBuildFor === 'function',
    'a ReferenceError here is invisible to a parse check and fatal in the browser');
  const lib = read('src/lib/weeklyPlan.js');
  const declLine = lib.split('\n').findIndex((l) => /const \{[^}]*\} = academyContent\(\)/.test(l));
  const useLine = lib.split('\n').findIndex((l) => /^const SOURCES = \[/.test(l));
  ok('...because its content declarations sit above the code that uses them',
    declLine > -1 && useLine > -1 && declLine < useLine,
    'import is hoisted; const is not');
}

console.log('\n--- 1. the four documentation forms, and only those ---');
{
  const set = wp.BUILD_DOCUMENTATION_PROMPTS;
  ok('there are four of them', set.size === 4);
  for (const id of ['w7-lab-report', 'w7-scientific-observation', 'w7-mission-report', 'w7-design-documentation']) {
    ok(`...${id} is one`, set.has(id));
  }
  ok('every one of them is a real prompt',
    [...set].every((id) => writingPrompts.some((p) => p.id === id)),
    'an id that matches nothing pairs nothing, silently');
  ok('...and every one carries pairedInstructions',
    [...set].every((id) => Boolean(writingPrompts.find((p) => p.id === id).pairedInstructions)),
    'named as a documentation form with no build wording is a pairing that cannot be shown');
  ok('...each of which asks for the build by name',
    [...set].every((id) => writingPrompts.find((p) => p.id === id).pairedInstructions.includes('{build}')),
    'the placeholder IS the connection — without it the text is generic again');
  ok('the open-ended forms are NOT paired',
    !set.has('w7-essay') && !set.has('w7-creative-writing') && !set.has('w7-space-journal'),
    'pinning a personal journal to the week\u2019s build takes a choice away for no gain');
  ok('...and they carry no pairedInstructions either',
    writingPrompts.filter((p) => !set.has(p.id)).every((p) => !p.pairedInstructions),
    'a field the pairing will never read is a promise the screen cannot keep');
}

console.log('\n--- 2. the pairing is READ from the schedule, never restated ---');
{
  const lib = codeOnly(read('src/lib/weeklyPlan.js'));
  ok('pairedBuildFor asks getThisWeeksScheduledIds',
    /export function pairedBuildFor\([\s\S]{0,400}?getThisWeeksScheduledIds\(date\)/.test(lib),
    'a second copy of the pairing is how two facts that must agree come to differ');
  ok('...and no week number is written into the lib',
    !/weeklyWritingSchedule\s*\[/.test(lib) && !/\bweek\s*===\s*\d+/.test(lib),
    'the schedule owns the weeks; this only resolves them');
  ok('...and it refuses a prompt that is not scheduled this week',
    /if \(!ids\.includes\(promptId\)\) return null;/.test(lib),
    'a prompt opened out of its week must not borrow another week\u2019s build');
}

console.log('\n--- 3. the form decides which builds it can honestly describe ---');
{
  /**
   * Every documentation prompt in the year, resolved. The counts are asserted
   * as inequalities and the WEEK NUMBERS are never named: which build sits in
   * which week is the curriculum, and it is hers to change.
   */
  const weeks = Object.keys(weeklyWritingSchedule).map(Number).sort((a, b) => a - b);
  const rows = [];
  for (const w of weeks) {
    for (const id of weeklyWritingSchedule[w]) {
      if (!wp.BUILD_DOCUMENTATION_PROMPTS.has(id)) continue;
      rows.push({ week: w, id, build: wp.pairedBuildFor(id, dateInWeek(w)), ids: weeklyWritingSchedule[w] });
    }
  }
  const paired = rows.filter((r) => r.build);
  ok(`${paired.length} of ${rows.length} documentation prompts resolve to a build`,
    paired.length >= 10,
    'the schedule\u2019s own header names three pairings in Q1 alone');
  ok('...and every build named is scheduled in that same week',
    paired.every((r) => r.ids.includes(r.build.id)),
    'a build from another week is worse than no build at all');

  /**
   * THE FORM RULE, which is the half a flat "first build in the week" lookup
   * got wrong: a Lab Report was handed a Tinkercad model, which has no
   * hypothesis, no measurement and nothing to report.
   */
  const cadIds = new Set((academyContent().projects.technologyProjects || []).map((p) => p.id));
  const experimentForms = new Set(['w7-lab-report', 'w7-scientific-observation']);
  ok('no Lab Report or Scientific Observation is pointed at a CAD exercise',
    paired.filter((r) => experimentForms.has(r.id)).every((r) => !cadIds.has(r.build.id)),
    'a design task has no result; Design Documentation is the form for one');
  ok('...and a week whose ONLY build is a CAD exercise pairs those forms with nothing',
    rows.some((r) => experimentForms.has(r.id) && !r.build && r.ids.some((i) => cadIds.has(i))),
    'pointing a lab report at the wrong build is worse than pointing it at none');
  ok('...while Design Documentation and Mission Report CAN take one',
    paired.some((r) => !experimentForms.has(r.id) && cadIds.has(r.build.id)),
    'documenting a CAD build is exactly what those two forms are for');

  /** A prompt asked outside its own scheduled week must borrow nothing. */
  const anyRow = rows.find((r) => r.build);
  ok('a prompt asked outside its scheduled week pairs nothing',
    wp.pairedBuildFor(anyRow.id, dateInWeek(anyRow.week + 1)) === null
      || !weeklyWritingSchedule[anyRow.week + 1]?.includes(anyRow.id));
  ok('...and an id that is not a documentation prompt returns null',
    wp.pairedBuildFor('w7-essay', dateInWeek(anyRow.week)) === null
      && wp.pairedBuildFor('not-a-prompt', dateInWeek(2)) === null
      && wp.pairedBuildFor(null, dateInWeek(2)) === null);

  /**
   * NOT A FAILURE — A REPORT. A documentation prompt with no build in its week
   * is a gap in the PLAN, and the plan belongs to the parent. Failing here
   * would make her next curriculum change look like a broken build.
   */
  const orphans = rows.filter((r) => !r.build);
  if (orphans.length) {
    console.log(`\nNOTE  ${orphans.length} documentation prompt(s) are scheduled with no build to document:`);
    for (const r of orphans) console.log(`      week ${String(r.week).padStart(2)}  ${r.id}`);
    console.log('      Each keeps its own general instructions. Moving an experiment into');
    console.log('      that week, or swapping the form, is a curriculum decision.');
  }
}

console.log('\n--- 4. the build reaches the screen he writes on ---');
{
  const engine = codeOnly(read('src/components/Writing/WritingPromptEngine.jsx'));
  ok('the engine asks for the pairing',
    /import \{ pairedBuildFor \} from '\.\.\/\.\.\/lib\/weeklyPlan\.js';/.test(engine)
      && /const pairedBuild = pairedBuildFor\(prompt\.id\);/.test(engine));
  ok('...and the paired wording REPLACES the topicPool variation',
    /pairedBuild && prompt\.pairedInstructions[\s\S]{0,120}?prompt\.pairedInstructions\.replace\('\{build\}', pairedBuild\.title\)/.test(engine),
    'cycling a generic topic beside a real build is the fault being fixed');
  ok('...falling back to the cycle when there is no build',
    /allVariations\[pastEntries\.length % allVariations\.length\]/.test(engine),
    'unpaired weeks must behave exactly as they did');
  ok('...and the build is named on screen, not only inside the instruction',
    /pairedBuild\.title/.test(engine) && /This week's build/.test(engine));
  ok('...with the objective it was run to test',
    /pairedBuild\.objectives/.test(engine),
    'a hypothesis written from memory is the thing a lab report exists to prevent');
}

console.log('\n--- 5. and his board says which build before he opens it ---');
{
  const board = codeOnly(read('src/components/Dashboard/MissionControlDashboard.jsx'));
  ok('the Journal row asks for the pairing',
    /const journalPairedBuild = nextJournalPrompt \? pairedBuildFor\(nextJournalPrompt\.id\) : null;/.test(board));
  ok('...and names the build in the row detail',
    /journalPairedBuild[\s\S]{0,200}?journalPairedBuild\.title/.test(board),
    '"Writing in the structured format scientists use" does not say WHICH experiment');
  ok('...and still falls back to the prompt theme otherwise',
    /: nextJournalPrompt\.theme/.test(board));

  /**
   * And the Journal catalogue, which is where a card can sit for months
   * naming a form and a week and never the thing being documented.
   */
  const journal = codeOnly(read('src/components/Writing/WritingJournal.jsx'));
  ok('the Journal card asks for the pairing too',
    /BUILD_DOCUMENTATION_PROMPTS\.has\(item\.id\)/.test(journal)
      && /pairedBuildFor\(item\.id, parseDateStr\(schedule\.show\.dueDate\)\)/.test(journal),
    'asked for the occurrence the card is SHOWING, so the two lines cannot describe different weeks');
  ok('...and says so when the week holds no build',
    /No build scheduled that week/.test(journal),
    'an unanswered question looks like an oversight; this gap is real and hers to close');
}

console.log(`\n${passed} passed, ${failures.length} failed\n`);
if (failures.length) {
  console.log(`${failures.length} CHECK(S) FAILED`);
  process.exit(1);
}
console.log('ALL CHECKS PASSED');
