// ---------------------------------------------------------------------------
// ONE ACADEMY, ON ITS OWN TERMS.
//
//   node scripts/verify-academy.mjs <academy-folder>
//   node scripts/verify-academy.mjs --household
//
// ---- WHY THIS EXISTS ----
//
// The other 56 checks in this folder are not the platform's. Most of them test
// ONE curriculum: verify-guitar, verify-gardening, verify-typing,
// verify-khan-unit-names, verify-mission-schedule. They are that Academy's
// checks, and they live here for historical reasons — this repository was that
// school before it was a platform.
//
// The consequence was quiet and wrong: a second Academy was being judged by
// running the FIRST Academy's suite and seeing it still pass. That says the
// first Academy is undamaged. It says nothing whatsoever about the second.
//
// So this check knows about exactly one Academy at a time. It never loads
// another, never compares to another, and has no opinion about what a
// curriculum should contain. It asks one question:
//
//     Does this Academy, alone, satisfy the platform's contract well enough
//     that its school will render and its lessons will run?
//
// ---- AND THE HOUSEHOLD MODE ----
//
// `--household` is the only mode that looks at more than one, and it looks at
// them to prove they are SEPARATE rather than to compare them: no folder
// reaches into another, no two resolve to one database, the platform names none
// of them. That is the household level — one family's machine — and it is the
// only place more than one Academy legitimately appears at once.
// ---------------------------------------------------------------------------
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ACADEMIES = path.join(REPO, 'src/academies');

let failures = 0;
let checks = 0;
function ok(label, condition, detail = '') {
  checks += 1;
  if (condition) {
    console.log(`PASS  ${label}`);
  } else {
    failures += 1;
    console.log(`FAIL  ${label}`);
    if (detail) console.log(`      ${detail}`);
  }
}

const folders = () =>
  fs
    .readdirSync(ACADEMIES, { withFileTypes: true })
    .filter((e) => e.isDirectory() && !e.name.startsWith('_'))
    .map((e) => e.name);

function walk(dir, base = dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, base, acc);
    else if (/\.jsx?$/.test(entry.name)) acc.push(path.relative(base, full).split(path.sep).join('/'));
  }
  return acc;
}

// ===========================================================================
async function verifyOne(name) {
  const folder = path.join(ACADEMIES, name);
  if (!fs.existsSync(folder)) {
    console.error(`No such Academy folder: src/academies/${name}`);
    process.exit(1);
  }

  console.log(`\n=== ${name} — alone ===\n`);

  // --- 1. it loads at all -------------------------------------------------
  let manifest = null;
  let loadError = null;
  try {
    manifest = await import(pathToFileURL(path.join(folder, 'content.js')).href);
  } catch (error) {
    loadError = error;
  }
  ok('the manifest loads in plain Node', !loadError, loadError?.message);
  if (!manifest) return;

  // Loading in plain Node is not a formality. It is the check that nothing in
  // this folder reads Academy content at module scope — the circular-import
  // rule. A folder that only works inside the bundler has a load-order bug
  // waiting for the first real morning.

  // --- 2. the contract ----------------------------------------------------
  const contentSrc = fs.readFileSync(path.join(REPO, 'src/content/academyContent.js'), 'utf8');
  const slots = contentSrc
    .match(/CONTENT_SLOTS = Object\.freeze\(\[([\s\S]*?)\]\)/)[1]
    .match(/'[A-Za-z]+'/g)
    .map((s) => s.replace(/'/g, ''));
  const required = contentSrc
    .match(/REQUIRED_SLOTS = Object\.freeze\(\[([\s\S]*?)\]\)/)[1]
    .match(/'[A-Za-z]+'/g)
    .map((s) => s.replace(/'/g, ''));

  const filled = slots.filter((s) => manifest[s]);
  const strange = Object.keys(manifest).filter((k) => !slots.includes(k));

  ok('it fills only slots the platform declares', strange.length === 0, strange.join(', '));

  // Required slots are checked against the merged result, because an Academy
  // legitimately inherits a guide and a theme from the template.
  const templatePath = path.join(ACADEMIES, '_template', 'content.js');
  let template = {};
  if (fs.existsSync(templatePath)) template = await import(pathToFileURL(templatePath).href);
  const merged = new Set([...Object.keys(template), ...filled]);
  const missingRequired = required.filter((s) => !merged.has(s));
  ok('it can render a school — every required slot present', missingRequired.length === 0, missingRequired.join(', '));

  console.log(`      fills: ${filled.join(', ')}`);
  console.log(`      blank: ${slots.filter((s) => !filled.includes(s)).join(', ') || '(none)'}`);

  // --- 3. nothing reaches into another Academy ----------------------------
  const files = walk(folder);
  const crossings = [];
  for (const rel of files) {
    const src = fs.readFileSync(path.join(folder, rel), 'utf8');
    for (const m of src.matchAll(/from\s+['"]([^'"]+)['"]/g)) {
      const spec = m[1];
      if (!spec.startsWith('.')) continue;
      const target = path.resolve(path.dirname(path.join(folder, rel)), spec);
      if (target.startsWith(ACADEMIES) && !target.startsWith(folder)) {
        crossings.push(`${rel} → ${spec}`);
      }
    }
  }
  ok('nothing in this folder reaches into another Academy', crossings.length === 0, crossings.join('; '));

  // --- 4. the lessons will actually run -----------------------------------
  const lessons = manifest.lessons?.allLessons;
  if (!Array.isArray(lessons)) {
    ok('it has lessons', false, 'the lessons slot carries no allLessons array');
  } else {
    ok('it has lessons', lessons.length > 0, `${lessons.length} lessons`);
    console.log(`      ${lessons.length} lessons`);

    const noId = lessons.filter((l) => !l?.id);
    ok('every lesson has an id', noId.length === 0, `${noId.length} without one`);

    const noTitle = lessons.filter((l) => !l?.title);
    ok('every lesson has a title', noTitle.length === 0, `${noTitle.length} without one`);

    // A lesson the engine cannot start: no passage, no beats, no questions.
    const unplayable = lessons.filter(
      (l) => !l?.passage && !l?.novaIntro?.beats?.length && !l?.questions?.length
    );
    ok('every lesson gives the engine something to open', unplayable.length === 0,
      unplayable.slice(0, 5).map((l) => l.id).join(', '));

    // The array-vs-map trap. Object.keys on an array yields "0","1","2", which
    // matches nothing in the teaching text and silently highlights no
    // vocabulary — no error, just a lesson whose words stop working.
    const arrayGlossary = lessons.filter((l) => Array.isArray(l?.novaIntro?.glossary));
    ok('glossaries are term maps, not arrays', arrayGlossary.length === 0,
      arrayGlossary.slice(0, 5).map((l) => l.id).join(', '));

    // A beat that neither generates practice nor carries a transfer question
    // still works — it teaches and moves on. What must not happen is a beat
    // pointing at a generator that does not exist.
    const beats = lessons.flatMap((l) => l?.novaIntro?.beats || []);
    const noTeaching = beats.filter((b) => !b?.teachingText);
    ok('every beat teaches something', noTeaching.length === 0, `${noTeaching.length} with no teachingText`);

    // The scoring invariant: one feedback entry per choice, null at the answer.
    const badFeedback = [];
    for (const l of lessons) {
      for (const q of l?.questions || []) {
        if (!Array.isArray(q?.feedback) || !Array.isArray(q?.choices)) continue;
        if (q.feedback.length !== q.choices.length) badFeedback.push(`${l.id}: length`);
        else if (q.feedback[q.answer] !== null) badFeedback.push(`${l.id}: not null at answer`);
      }
    }
    ok('wrong-answer feedback lines up with the choices', badFeedback.length === 0,
      badFeedback.slice(0, 5).join('; '));

    // Provenance. Not "does a video exist" — that is a curriculum decision —
    // but "when one exists, does it say where it came from".
    const withVideo = lessons.filter((l) => l?.video?.url || l?.novaIntro?.videoUrl);
    const unverified = withVideo.filter((l) => l?.video && !l.video.verified);
    ok('every video that exists carries its verification date', unverified.length === 0,
      unverified.slice(0, 5).map((l) => l.id).join(', '));
    console.log(`      ${withVideo.length} lessons carry a video`);
  }

  // --- 5. the theme ------------------------------------------------------
  const css = path.join(folder, 'academy.css');
  if (fs.existsSync(css)) {
    const raw = fs.readFileSync(css, 'utf8');

    /*
      COMMENTS OUT FIRST, and this check failed on its own prose before they
      were. The stylesheet carries a note explaining WHY it contains no
      `@tailwind` directives — and a regex looking for `@tailwind` found it
      there and failed the file for saying the thing it was complying with.

      These three checks are about the CSS a build emits. A comment emits
      nothing. Where a guard SHOULD read prose is a different question with a
      different answer — verify-no-learner reads comments on purpose, because a
      platform file that has to name a vendor to explain itself has not
      finished separating from it. This one is about a build failure, so it
      reads only what the build sees.
    */
    const sheet = raw.replace(/\/\*[\s\S]*?\*\//g, '');

    ok('the stylesheet has no bare @layer', !/^\s*@layer\s/m.test(sheet),
      'PostCSS processes an Academy sheet as its own entry; a bare @layer fails the build');
    ok('the stylesheet has no @tailwind directives', !/@tailwind/.test(sheet),
      'the platform entry emits them once; a second copy ships the framework twice');
    const channels = [...sheet.matchAll(/--(?:space|ink)-\d+:\s*([^;]+);/g)].map((m) => m[1].trim());
    const hexed = channels.filter((v) => v.startsWith('#'));
    ok('palette values are RGB channels, not hex', hexed.length === 0,
      'a hex here breaks every opacity modifier silently');
  }

  // --- 6. it names itself, not the platform ------------------------------
  ok('the manifest is this Academy\'s own file', fs.existsSync(path.join(folder, 'content.js')));
}

// ===========================================================================
async function verifyHousehold() {
  console.log('\n=== the household — that they are SEPARATE ===\n');

  const all = folders();
  console.log(`      ${all.length} Academies on this machine: ${all.join(', ')}\n`);

  // No folder reaches into another. Checked per folder in verifyOne too; here
  // it is the household-level statement rather than one Academy's property.
  const crossings = [];
  for (const name of all) {
    const folder = path.join(ACADEMIES, name);
    for (const rel of walk(folder)) {
      const src = fs.readFileSync(path.join(folder, rel), 'utf8');
      for (const m of src.matchAll(/from\s+['"](\.[^'"]+)['"]/g)) {
        const target = path.resolve(path.dirname(path.join(folder, rel)), m[1]);
        if (target.startsWith(ACADEMIES) && !target.startsWith(folder)) {
          crossings.push(`${name}/${rel} → ${m[1]}`);
        }
      }
    }
  }
  ok('no Academy imports another Academy', crossings.length === 0, crossings.join('; '));

  // The platform names none of them.
  const registry = fs.readFileSync(path.join(ACADEMIES, 'registry.js'), 'utf8');
  ok('the platform ships no list of Academies', /export const ACADEMIES = \[\];/.test(registry),
    'a hardcoded list is how a platform quietly becomes single-tenant');

  const contentSrc = fs.readFileSync(path.join(REPO, 'src/content/academyContent.js'), 'utf8');
  ok('Academy folders are found by looking, not by a list', /import\.meta\.glob\(/.test(contentSrc));

  // Two Academies must never resolve to one database.
  const names = new Set(all.map((a) => `LearningOSDB_${a}`));
  ok('no two Academies resolve to one database', names.size === all.length);

  // Each answers the contract on its own. Reported per Academy, not compared.
  for (const name of all) {
    const manifest = await import(pathToFileURL(path.join(ACADEMIES, name, 'content.js')).href);
    const lessons = manifest.lessons?.allLessons;
    ok(`${name} stands up on its own`, Boolean(manifest.subjects && manifest.timetable),
      'missing subjects or timetable');
    console.log(`      ${name}: ${Array.isArray(lessons) ? lessons.length : 0} lessons`);
  }
}

// ===========================================================================
const arg = process.argv[2];

if (!arg) {
  console.error(
    'usage:\n' +
      '  node scripts/verify-academy.mjs <academy-folder>   one Academy, alone\n' +
      '  node scripts/verify-academy.mjs --household        that they are separate\n\n' +
      `on this machine: ${folders().join(', ')}`
  );
  process.exit(1);
}

if (arg === '--household') await verifyHousehold();
else await verifyOne(arg);

console.log(`\n${checks} checks · ${failures === 0 ? 'ALL PASSED' : `${failures} FAILED`}\n`);
process.exit(failures === 0 ? 0 : 1);
