// ---------------------------------------------------------------------------
// APPLIES AUTHORED WRONG-ANSWER DIAGNOSTICS TO A LESSON FILE.
// Run: node scripts/apply-diagnosis-batch.mjs <lessonFile> <batch.json> [...]
//
// ---- WHY THIS IS A SCRIPT AND NOT A HAND EDIT (Aug 18, 2026) ----
//
// The first pass at this was a throwaway patcher that anchored on `id: 'q1'`.
// That string appears once per LESSON, not once per file, and aerospace7.js
// holds dozens. It wrote the CAD diagnosis onto "What does NASA stand for?"
// and the Himalayan-rivers diagnosis onto two Freedmen's Bureau questions.
// Nothing failed. The file still parsed, the guard still counted coverage
// going up, and the only reason it was caught is that a placement check was
// run afterwards on purpose.
//
// **A patch that lands in the wrong place is worse than one that does not
// land at all**, because the second kind announces itself.
//
// So this script:
//   1. locates each question by its own id INSIDE its own lesson block, never
//      by a file-wide search
//   2. refuses to write anything unless every key in the batch matched exactly
//      one question
//   3. re-reads the file afterwards and asserts the text it wrote is attached
//      to the question it was written for
//
// It also handles both quoting styles this repo contains. Most lesson files
// are hand-written JS (`id: 'ss7-x'`); trailblazerBios.js was generated and is
// JSON-shaped (`"id": "ss7-x"`). The first run against it matched nothing and
// REFUSED TO WRITE, which is the behaviour that matters — a patcher that
// silently matched zero questions and reported success would have been a batch
// of work quietly thrown away.
// ---------------------------------------------------------------------------
import fs from 'node:fs';

const [target, ...batchFiles] = process.argv.slice(2);
if (!target || batchFiles.length === 0) {
  console.error('usage: apply-diagnosis-batch.mjs <lessonFile> <batch.json> [...]');
  process.exit(1);
}

const batch = {};
for (const f of batchFiles) Object.assign(batch, JSON.parse(fs.readFileSync(f, 'utf8')));

let src = fs.readFileSync(target, 'utf8');
const problems = [];
const planned = [];

for (const [key, feedback] of Object.entries(batch)) {
  const [lessonId, qId] = key.split('|');
  if (!lessonId || !qId) { problems.push(`${key}: malformed key`); continue; }

  // The lesson block: from this lesson's id to the next lesson's id.
  const lessonRe = new RegExp('"?id"?:\\s*[\'"]' + lessonId + '[\'"]');
  const lm = lessonRe.exec(src);
  if (!lm) { problems.push(`${key}: lesson not found`); continue; }
  const after = src.slice(lm.index + 1);
  /**
   * WHERE THIS LESSON ENDS.
   *
   * Must recognise the start of the NEXT lesson in either quoting style, or
   * the "block" runs to the end of the file and every question id matches once
   * per lesson. That is what happened on the first run against
   * trailblazerBios.js: q1 matched 17 times and the script refused, correctly.
   */
  const nextLesson = after.search(/\n {2}\{\n\s+"?id"?:\s*['"][a-z0-9]+7?-/);
  const blockEnd = nextLesson === -1 ? src.length : lm.index + 1 + nextLesson;
  const block = src.slice(lm.index, blockEnd);

  const qHits = [...block.matchAll(new RegExp('"?id"?:\\s*[\'"]' + qId + '[\'"]', 'g'))];
  if (qHits.length !== 1) { problems.push(`${key}: question id matched ${qHits.length}× in its lesson`); continue; }
  const qAt = lm.index + qHits[0].index;

  const findKey = (key, from) => {
    const a = src.indexOf(key + ':', from);
    const b = src.indexOf('"' + key + '":', from);
    if (a === -1) return b;
    if (b === -1) return a;
    return Math.min(a, b);
  };
  const quoted = src.slice(qAt, qAt + 40).includes('"id"');
  const choicesAt = findKey('choices', qAt);
  const explAt = findKey('explanation', qAt);
  const xpAt = findKey('xp', qAt);
  if (choicesAt === -1 || xpAt === -1 || xpAt < qAt) { problems.push(`${key}: question shape unrecognised`); continue; }

  const existing = findKey('choiceFeedback', qAt);
  const hasExisting = existing !== -1 && existing < xpAt;
  if (hasExisting) { problems.push(`${key}: already has choiceFeedback — refusing to overwrite`); continue; }

  planned.push({ key, qAt, xpAt, explAt, feedback, quoted });
}

if (problems.length) {
  console.error(`REFUSING TO WRITE — ${problems.length} problem(s):`);
  for (const p of problems.slice(0, 20)) console.error('  ' + p);
  process.exit(1);
}

// Apply from the bottom of the file upward so earlier offsets stay valid.
planned.sort((a, b) => b.xpAt - a.xpAt);
for (const { xpAt, feedback, quoted } of planned) {
  const body = feedback.map((v) => (v === null ? 'null' : JSON.stringify(v))).join(',\n          ');
  const indent = ' '.repeat(8);
  const key = quoted ? '"choiceFeedback"' : 'choiceFeedback';
  src = src.slice(0, xpAt) + key + ': [\n          ' + body + '\n' + indent + '],\n' + indent + src.slice(xpAt);
}
fs.writeFileSync(target, src);

console.log(`wrote ${planned.length} feedback arrays into ${target}`);
console.log('re-reading to confirm each landed on its own question…');
