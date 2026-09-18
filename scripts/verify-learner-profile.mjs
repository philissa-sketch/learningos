// ---------------------------------------------------------------------------
// THERE IS SOMEWHERE TO PUT A LEARNER PROFILE, AND IT HOLDS ANSWERS ONLY.
// Run: node scripts/verify-learner-profile.mjs   (no ACADEMY needed)
//
// Audit finding 5, Sept 15 2026: *"No learner profile, and nowhere to put
// one."* Forty tables and not one could hold a questionnaire answer, a reading
// level or a career pathway, so the only way to give a child a curriculum was
// to hand-author a folder and ship a build. One family per deploy.
//
// What this holds:
//   1. the reader — a missing profile is an empty profile, and never a throw
//   2. a write refuses OUT LOUD, because a parent typed those answers
//   3. nothing is inferred: what is stored is what was said
//   4. the table exists, and the schema has DECIDED whether it travels
//   5. two computers merge section by section, so no edit is lost silently
//   6. the profile is not curriculum, and names no child
//   7. the questions EXIST, and are reachable — the front door's old promise
// ---------------------------------------------------------------------------
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (rel) => fs.readFileSync(path.join(REPO, rel), 'utf8');
const codeOnly = (src) => src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');

let passed = 0;
const failures = [];
function ok(label, cond, detail = '') {
  if (cond) { passed += 1; console.log('PASS  ' + label); }
  else { failures.push(label); console.log('FAIL  ' + label + (detail ? `\n      ${detail}` : '')); }
}

const MODULE = 'src/lib/learnerProfile.js';
const p = await import(pathToFileURL(path.join(REPO, MODULE)).href);

console.log('--- 1. the reader answers, and never throws ---');
{
  ok('the sections are declared in one place, in asking order',
    Array.isArray(p.PROFILE_SECTIONS) && p.PROFILE_SECTIONS.length >= 4
      && p.PROFILE_SECTION_IDS.join(',') === p.PROFILE_SECTIONS.map((s) => s.id).join(','));
  ok('...and every section has an id and something to call it',
    p.PROFILE_SECTIONS.every((s) => typeof s.id === 'string' && s.id && typeof s.label === 'string' && s.label));
  ok('...and no id is declared twice',
    new Set(p.PROFILE_SECTION_IDS).size === p.PROFILE_SECTION_IDS.length);
  ok('the list cannot be edited by a screen that reads it',
    Object.isFrozen(p.PROFILE_SECTIONS) && p.PROFILE_SECTIONS.every((s) => Object.isFrozen(s)));

  const first = p.PROFILE_SECTION_IDS[0];
  const junk = [
    ['nothing', undefined], ['null', null], ['a string', 'profile'],
    ['an array', [1, 2]], ['an empty object', {}],
    ['rows that are not rows', [1, 'x', null]],
    ['a row with no section', [{ answers: { a: 1 } }]],
    ['a row for a section this build does not know', [{ section: 'nope', answers: { a: 1 } }]],
    ['a row whose answers are not answers', [{ section: first, answers: 'yes' }]]
  ];
  for (const [label, rows] of junk) {
    let threw = false; let result;
    try { result = p.profileFromRows(rows); } catch { threw = true; }
    ok(`${label} reads as an empty profile instead of throwing`,
      !threw && result && typeof result === 'object' && Object.keys(result).length === 0,
      'a throw here reaches the shell and a family sees a school that will not open');
  }

  const rows = [{ section: first, answers: { note: 'hello' }, updatedAt: '2026-09-17T10:00:00.000Z' }];
  const profile = p.profileFromRows(rows);
  ok('a real row reads back', p.profileAnswers(profile, first).note === 'hello');
  ok('an unanswered section reads as an empty object, never undefined',
    Object.keys(p.profileAnswers(profile, p.PROFILE_SECTION_IDS[1])).length === 0);
  ok('...and the same empty object every time, frozen',
    Object.isFrozen(p.profileAnswers(null, first))
      && p.profileAnswers(null, first) === p.profileAnswers({}, 'nope'));
  // profileFromRows cleans what it stores, so this guard is only ever reached
  // by a profile built somewhere else — a merge, an import, a half-written
  // state. That is exactly when a screen is rendering and must not throw.
  ok('a section whose answers are not an object still reads as empty',
    Object.keys(p.profileAnswers({ [first]: { section: first, answers: 'yes' } }, first)).length === 0
      && Object.keys(p.profileAnswers({ [first]: { section: first } }, first)).length === 0,
    'a hand-built profile is the only caller that reaches this, and it reaches it mid-render');

  ok('a section can be asked whether it was answered at all',
    p.hasProfileSection(profile, first) === true
      && p.hasProfileSection(profile, p.PROFILE_SECTION_IDS[1]) === false);
}

console.log('\n--- 2. a write refuses out loud ---');
{
  const first = p.PROFILE_SECTION_IDS[0];
  const good = p.sectionRecord(first, { readingLevel: ' 7th ' }, new Date('2026-09-17T12:00:00Z'));
  ok('a good write returns a record', good.ok === true && good.record?.section === first);
  ok('...carrying when it was written', good.record?.updatedAt === '2026-09-17T12:00:00.000Z');

  // Every one of these is read defensively. A refusal that comes back as null
  // instead of a sentence must FAIL WITH A MESSAGE here, not crash this file:
  // a stack trace tells whoever is looking nothing about what broke.
  const bad = p.sectionRecord('not-a-section', { a: 1 }) || {};
  ok('a section that does not exist is refused, not stored', bad.ok === false
    && bad.reason === 'unknown-section',
    'a write that vanishes silently is an hour of onboarding gone with nothing on screen');
  const blank = p.sectionRecord(first, { a: '   ', b: '' }) || {};
  ok('a section where every box was left blank is refused', blank.ok === false
    && blank.reason === 'no-answers');
  ok('every refusal carries a sentence for the parent, not a code',
    Object.values(p.PROFILE_REFUSALS).every((m) => typeof m === 'string' && m.length > 20 && /\s/.test(m)));
  ok('...and every reason a write can give has wording',
    [bad, blank].every((r) => typeof r.message === 'string' && r.message === p.PROFILE_REFUSALS[r.reason]));
  ok('...and a refusal is an object with a reason, never null',
    p.sectionRecord('not-a-section', { a: 1 }) !== null
      && p.sectionRecord(first, {}) !== null,
    'null is indistinguishable from a bug at the call site, which is where the parent is waiting');

  // A silent drop is the failure this section exists for: an hour of onboarding
  // gone with nothing on screen to say it went.
  ok('a refusal is never mistaken for a success', bad.record === undefined && blank.record === undefined);
}

console.log('\n--- 3. nothing is inferred ---');
{
  const first = p.PROFILE_SECTION_IDS[0];
  const given = { readingLevel: '  6th  ', interests: ['rockets', '  ', 'chess'], age: 12, note: '' };
  const written = p.sectionRecord(first, given) || {};
  ok('the write went through at all', written.ok === true, written.message || 'no record came back');
  const out = written.record?.answers || {};
  ok('a string is trimmed', out.readingLevel === '6th');
  ok('a blank answer is dropped rather than stored empty', !('note' in out));
  ok('a list keeps its real entries and drops its blanks',
    JSON.stringify(out.interests) === '["rockets","chess"]');
  ok('a number is kept as given', out.age === 12);
  ok('NOTHING ELSE APPEARS', Object.keys(out).sort().join(',') === 'age,interests,readingLevel',
    `${Object.keys(out).join(', ')} — a profile that enriches itself is one a parent cannot correct`);
  // "No" and "none" are answers. Dropping them for being falsy turns an
  // answered question back into an unanswered one, and the parent is never
  // told which of her answers did not take.
  ok('a false answer is kept, because false is an answer',
    (p.sectionRecord(first, { usesKhan: false }) || {}).record?.answers?.usesKhan === false);
  ok('a zero is kept too',
    (p.sectionRecord(first, { hoursPerDay: 0 }) || {}).record?.answers?.hoursPerDay === 0);
}

console.log('\n--- 4. the table exists, and the schema decided whether it travels ---');
{
  const dbSrc = read('src/db/db.js');
  const latest = dbSrc.lastIndexOf('.stores({');
  const schema = dbSrc.slice(latest, dbSrc.indexOf('});', latest));
  ok('the latest schema carries a learnerProfile table', /learnerProfile:/.test(schema),
    'a profile with nowhere to live is the finding this closes');
  ok('...keyed by section, not by one row for the whole profile',
    /learnerProfile:\s*'section'/.test(schema),
    'one row for the lot means the older file wins every section — see the module header');

  const { EXPORT_TABLE_POLICY } = await import(pathToFileURL(path.join(REPO, 'src/db/db.js')).href);
  ok('the export policy has DECIDED about it',
    Object.prototype.hasOwnProperty.call(EXPORT_TABLE_POLICY, 'learnerProfile'));
  const decision = EXPORT_TABLE_POLICY.learnerProfile;
  ok('...and if it is excluded, it says why in a sentence',
    decision === true || (typeof decision === 'string' && decision.length > 30));

  // The name appears in the import list whether or not anything calls it, so
  // these read the CALL and the state it lands in, not the name.
  const store = codeOnly(read('src/store/useAppStore.js'));
  ok('hydrate actually calls the loader', /=\s*await loadLearnerProfile\(\)/.test(store),
    'a table nothing loads is a table nothing can show');
  ok('...and what it loads reaches the state the screens read',
    /learnerProfile:\s*profileFromRows\(/.test(store),
    'loading rows and never setting them is the same as not loading them');
  ok('the state declares the profile, so a screen can read it before hydrate',
    /learnerProfile:\s*\{\}/.test(store));
  ok('...and one section can be written without touching another',
    /async saveProfileSection\(/.test(store)
      && /learnerProfile:\s*\{\s*\.\.\.get\(\)\.learnerProfile/.test(store),
    'a write that replaces the whole profile loses every section it did not ask about');
}

console.log('\n--- 5. two computers merge section by section ---');
{
  const [a, b] = p.PROFILE_SECTION_IDS;
  const mine = {
    [a]: { section: a, answers: { v: 'mine' }, updatedAt: '2026-09-10T00:00:00.000Z' },
    [b]: { section: b, answers: { v: 'only mine' }, updatedAt: '2026-09-10T00:00:00.000Z' }
  };
  const incoming = {
    [a]: { section: a, answers: { v: 'newer' }, updatedAt: '2026-09-16T00:00:00.000Z' }
  };
  const merged = p.mergeProfiles(mine, incoming);
  ok('the newer edit wins its own section', merged[a]?.answers?.v === 'newer');
  ok('...and a section the other machine never touched SURVIVES', merged[b]?.answers?.v === 'only mine',
    'whole-profile replacement is how an hour of onboarding disappears');
  ok('an older incoming section does not overwrite a newer local one',
    p.mergeProfiles(incoming, mine)[a]?.answers?.v === 'newer');
  ok('a section with no timestamp never beats one that has a real edit',
    p.mergeProfiles(mine, { [a]: { section: a, answers: { v: 'undated' } } })[a]?.answers?.v === 'mine');
  ok('merging with nothing is the profile itself',
    JSON.stringify(p.mergeProfiles(mine, null)) === JSON.stringify(p.mergeProfiles(mine, {})));
  ok('merging two empties yields an empty profile',
    Object.keys(p.mergeProfiles(null, undefined)).length === 0);
}

console.log('\n--- 6. it is a profile, not a curriculum, and it names no child ---');
{
  const text = read(MODULE);
  ok('it names no learner, school or guide',
    !/\blamar\b|\bazianna\b|mission control|petal|commander nova|marigold/i.test(text),
    'src/lib/learnerProfile.js is held to the platform standard — see scripts/verify-no-learner.mjs');
  ok('...and no subject of its own',
    !/['"`](aerospace|herbalism|robotics|gardening|guitar|khan|socialStudies)['"`]/i.test(codeOnly(text)));
  ok('it is listed as a platform file, so that stays true',
    /learnerProfile\.js/.test(read('scripts/verify-no-learner.mjs')),
    'a profile that starts naming one family is the multi-tenant plan undone');

  // The profile is the engine's INPUT. The moment it starts holding lessons or
  // a timetable, changing a child's mind about a career becomes a rebuild
  // again, which is the exact decision the master plan calls rebuild-forcing.
  const code = codeOnly(text);
  const curriculum = ['allLessons', 'defaultSchedule', 'assignments', 'weeklyWritingSchedule', 'subjectsForDay']
    .filter((n) => new RegExp(`\\b${n}\\b`).test(code));
  ok('it holds no curriculum of any kind', curriculum.length === 0, curriculum.join(', '));

  const completeness = p.profileCompleteness({});
  ok('an empty profile reports itself unanswered rather than complete',
    completeness.answered === 0 && completeness.complete === false
      && completeness.total === p.PROFILE_SECTION_IDS.length);
  ok('...and names what is still missing, in the asking order',
    completeness.missing.join(',') === p.PROFILE_SECTION_IDS.join(','));
  const oneDone = p.profileFromRows([{ section: p.PROFILE_SECTION_IDS[0], answers: { a: 1 } }]);
  ok('a partly-filled profile counts what is answered',
    p.profileCompleteness(oneDone).answered === 1
      && p.profileCompleteness(oneDone).missing.length === p.PROFILE_SECTION_IDS.length - 1);
  const allDone = p.profileFromRows(p.PROFILE_SECTION_IDS.map((id) => ({ section: id, answers: { a: 1 } })));
  ok('...and a full one reports complete', p.profileCompleteness(allDone).complete === true);
}

console.log('\n--- 7. the questions exist, and can be reached ---');
{
  // The other half of finding 5. The front door had been saying "you'll answer
  // the setup questions next" since it was built, and there were none.
  ok('every section declares questions',
    p.PROFILE_SECTIONS.every((s) => Array.isArray(s.questions) && s.questions.length > 0));
  const questions = p.PROFILE_SECTIONS.flatMap((s) => s.questions.map((q) => ({ ...q, in: s.id })));
  ok('...and every one has an id, a type and something to ask',
    questions.every((q) => q.id && typeof q.label === 'string' && q.label.trim().length > 0
      && p.QUESTION_TYPES.includes(q.type)),
    questions.filter((q) => !q.id || !q.label || !p.QUESTION_TYPES.includes(q.type))
      .map((q) => `${q.in}.${q.id || '(no id)'}`).join(', '));
  const dupes = p.PROFILE_SECTIONS
    .filter((s) => new Set(s.questions.map((q) => q.id)).size !== s.questions.length)
    .map((s) => s.id);
  ok('...and no section asks the same id twice', dupes.length === 0, dupes.join(', '),);
  ok('a question that offers choices actually offers some',
    questions.filter((q) => q.type === 'choice' || q.type === 'multi')
      .every((q) => Array.isArray(q.options) && q.options.length > 1),
    'a choice with nothing to choose renders as a question that cannot be answered');
  ok('the questions are frozen, so a screen cannot rewrite them mid-session',
    p.PROFILE_SECTIONS.every((s) => Object.isFrozen(s.questions) && s.questions.every((q) => Object.isFrozen(q))));
  ok('an unknown section asks nothing, rather than throwing',
    Array.isArray(p.questionsFor('nope')) && p.questionsFor('nope').length === 0
      && p.profileSection('nope') === null);
  ok('...and a real one answers its own list',
    p.questionsFor(p.PROFILE_SECTION_IDS[0]) === p.PROFILE_SECTIONS[0].questions);

  const SCREEN = 'src/components/Academy/ProfileQuestions.jsx';
  const screen = read(SCREEN);
  const screenCode = codeOnly(screen);
  ok('the screen takes its questions from the profile, not a copy of its own',
    /from '\.\.\/\.\.\/lib\/learnerProfile\.js'/.test(screen)
      && /PROFILE_SECTIONS\.map\(/.test(screenCode),
    'a second list of questions is two lists that disagree the first time one is edited');

  // THE DRIFT THIS PREVENTS: a type declared in the profile with no branch on
  // the screen renders an empty box. Nothing throws, nothing logs, and the
  // parent simply cannot answer that question.
  const unrendered = p.QUESTION_TYPES.filter((type) => !screenCode.includes(`=== '${type}'`));
  ok('the screen can render every type the profile declares', unrendered.length === 0,
    `${unrendered.join(', ')} — declared in QUESTION_TYPES with no branch on the screen`);

  const hardcoded = questions.map((q) => q.id).filter((id) => new RegExp(`['"\`]${id}['"\`]`).test(screenCode));
  ok('...and names no question of its own', hardcoded.length === 0, hardcoded.join(', '),);

  ok('a refusal is printed as the store worded it, not reworded by the screen',
    /outcome\?\.message/.test(screenCode) || /outcome\.message/.test(screenCode),
    'the screen must not invent its own reason for a refusal it did not decide');

  // Reachable. A questionnaire mounted nowhere is the same as no questionnaire,
  // which is the state this whole finding describes.
  const dash = codeOnly(read('src/components/Dashboard/ParentDashboard.jsx'));
  ok('the parent area offers the questions', /id: 'learner-profile'/.test(dash),
    'the front-door setup screen is only shown to an Academy with no records — a running school needs this one');
  ok('...and has a screen behind that entry',
    /section === 'learner-profile' && <LearnerProfileSection/.test(dash));

  // Removal and replacement in one commit: the promise is either kept or
  // withdrawn, never left standing.
  const shell = read('src/components/Academy/AcademyShell.jsx');
  const firstRun = read('src/components/FrontDoor/FirstRun.jsx');
  ok('the front door no longer says the questions are still being built',
    !/the questions and the placement — is the next thing being built/.test(codeOnly(shell)));
  ok('...and no longer promises questions it cannot show',
    !/answer\s*\n?\s*the setup questions and enter their placement next/.test(codeOnly(firstRun)));
  ok('...it says where they actually are',
    /setup questions are in the parent area/.test(shell)
      && /setup questions in the parent area/.test(firstRun));
}

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) {
  console.log(`\n${failures.length} CHECK(S) FAILED`);
  process.exitCode = 1;
} else {
  console.log('\nALL CHECKS PASSED');
}
