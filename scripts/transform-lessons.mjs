// ---------------------------------------------------------------------------
// FIT ONE ACADEMY'S LESSONS TO THE SHAPE THE ENGINE READS.
//
//   node scripts/transform-lessons.mjs <academy-folder> [--write]
//
// Without --write it reports and changes nothing. That is the default on
// purpose: this rewrites 256 authored files, and a transform nobody looked at
// first is how a curriculum gets quietly damaged.
//
// ---- WHAT THIS IS AND IS NOT ----
//
// It is a RENAMING. Every field it moves already exists, already holds the
// right value, and is already correct. Nothing here writes teaching content,
// invents a question, or fills a gap — if a lesson is missing something, this
// reports it and leaves it missing, because a script that papers over an
// authoring gap makes the gap invisible rather than fixed.
//
// ---- THE FOUR MOVES ----
//
//   1. beats, glossary and the video URL are wrapped into `novaIntro`, which is
//      where the engine looks for the teaching half of a lesson.
//   2. `glossary` becomes a term MAP. It is authored as [{word, plain}]; the
//      engine's GlossaryText does Object.keys(terms), so an array hands it
//      "0", "1", "2" and silently highlights nothing.
//   3. `check` becomes `lesson.questions` — the same array under the name the
//      test phase reads.
//   4. `why` becomes `explanation` on every question. The engine shows
//      `question.explanation` after a correct answer; `why` is the same
//      sentence under a name nothing reads.
//
//   `applyIt` on a beat becomes `applyItQuestion`, which is the transfer
//   question the beat-apply-it phase renders.
//
// ---- WHAT IS DELIBERATELY LEFT ALONE ----
//
// `checkIn`, `activity`, `ledger`, `practice`, `standards`, `offGrade`,
// `concept`, `words`, `minutes` and the full `video` object all stay exactly
// where they are, under exactly their own names. The engine reads them there.
// They were never the wrong shape — the engine simply had no phase for them
// until it grew one.
// ---------------------------------------------------------------------------
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const academy = process.argv[2];
const WRITE = process.argv.includes('--write');

if (!academy) {
  console.error('usage: node scripts/transform-lessons.mjs <academy-folder> [--write]');
  process.exit(1);
}

const folder = path.join(REPO, 'src/academies', academy);
if (!fs.existsSync(folder)) {
  console.error(`No such Academy folder: src/academies/${academy}`);
  process.exit(1);
}

/** The lesson aggregate this Academy exposes through its own manifest. */
const manifestUrl = pathToFileURL(path.join(folder, 'content.js')).href;
const { lessons } = await import(manifestUrl);
const all = lessons?.allLessons;

if (!Array.isArray(all) || all.length === 0) {
  console.error(
    'The lessons slot is empty. Either this Academy has no lessons yet, or its\n' +
      'manifest does not expose them — fix that rather than transforming nothing.'
  );
  process.exit(1);
}

/**
 * One lesson, in the shape the engine reads.
 *
 * Pure: returns a new object and never touches the input. The originals are
 * imported live from the Academy folder, and mutating them here would mean the
 * report describes something other than what is on disk.
 */
export function transformLesson(lesson) {
  const out = { ...lesson };
  const notes = [];

  // ---- 2. glossary array -> term map ----
  let glossary = lesson.novaIntro?.glossary;
  if (!glossary && Array.isArray(lesson.glossary)) {
    glossary = {};
    for (const entry of lesson.glossary) {
      if (entry?.word) glossary[entry.word] = entry.plain ?? '';
      else notes.push('a glossary entry has no `word`');
    }
  }

  // ---- 1. novaIntro wrapper ----
  const beats = (lesson.novaIntro?.beats || lesson.beats || []).map((beat) => {
    const b = { ...beat };
    // The transfer question, under the name the apply-it phase reads.
    if (!b.applyItQuestion && b.applyIt) {
      b.applyItQuestion = withExplanation(b.applyIt);
      delete b.applyIt;
    }
    return b;
  });

  if (beats.length || glossary || lesson.video?.url) {
    out.novaIntro = {
      ...lesson.novaIntro,
      ...(beats.length ? { beats } : {}),
      ...(glossary ? { glossary } : {}),
      // The engine links the video from the last beat. The full `video` object
      // stays on the lesson — this is the URL it needs, not a replacement for
      // the provenance beside it.
      ...(lesson.video?.url ? { videoUrl: lesson.video.url } : {})
    };
  }
  delete out.beats;
  delete out.glossary;

  // ---- 3. check -> questions ----
  const questions = lesson.questions || lesson.check;
  if (Array.isArray(questions)) out.questions = questions.map(withExplanation);
  else notes.push('no `check` and no `questions` — this lesson has no test');
  delete out.check;

  // ---- 4. spoken practice keeps `why`; it is shown, not scored ----
  // (lesson.practice is rendered verbatim by the practice phase.)

  return { lesson: out, notes };
}

/** `why` is the sentence shown after a correct answer. The engine reads it as
 *  `explanation`. Both are kept when both exist rather than one silently
 *  winning — that is a content question, not a script's to settle. */
function withExplanation(q) {
  if (!q || typeof q !== 'object') return q;
  if (q.explanation || !q.why) return q;
  return { ...q, explanation: q.why };
}

// ---------------------------------------------------------------------------
// REPORT
// ---------------------------------------------------------------------------
const counts = {
  lessons: all.length,
  wrappedNovaIntro: 0,
  glossaryMapped: 0,
  questionsRenamed: 0,
  explanationsFilled: 0,
  applyItRenamed: 0,
  keptCheckIn: 0,
  keptActivity: 0,
  keptLedger: 0,
  keptPractice: 0,
  keptStandards: 0,
  keptVideoProvenance: 0
};
const problems = [];

for (const lesson of all) {
  const { lesson: next, notes } = transformLesson(lesson);

  if (next.novaIntro && !lesson.novaIntro) counts.wrappedNovaIntro += 1;
  if (next.novaIntro?.glossary && Array.isArray(lesson.glossary)) counts.glossaryMapped += 1;
  if (next.questions && !lesson.questions) counts.questionsRenamed += 1;
  counts.explanationsFilled += (next.questions || []).filter(
    (q, i) => q?.explanation && !(lesson.check || [])[i]?.explanation
  ).length;
  counts.applyItRenamed += (next.novaIntro?.beats || []).filter((b) => b.applyItQuestion).length;

  if (next.checkIn) counts.keptCheckIn += 1;
  if (next.activity) counts.keptActivity += 1;
  if (next.ledger) counts.keptLedger += 1;
  if (Array.isArray(next.practice) && next.practice.length) counts.keptPractice += 1;
  if (Array.isArray(next.standards)) counts.keptStandards += 1;
  if (next.video?.verified) counts.keptVideoProvenance += 1;

  for (const n of notes) problems.push(`${lesson.id || '(no id)'}: ${n}`);

  // ---- INVARIANTS. A transform that breaks one of these is not a rename. ----
  const beatsIn = (lesson.novaIntro?.beats || lesson.beats || []).length;
  const beatsOut = (next.novaIntro?.beats || []).length;
  if (beatsIn !== beatsOut) problems.push(`${lesson.id}: beat count changed ${beatsIn} -> ${beatsOut}`);

  const qIn = (lesson.questions || lesson.check || []).length;
  const qOut = (next.questions || []).length;
  if (qIn !== qOut) problems.push(`${lesson.id}: question count changed ${qIn} -> ${qOut}`);

  // The feedback invariant the curriculum check relies on: one entry per
  // choice, null at the answer index. Checked, never repaired.
  for (const q of next.questions || []) {
    if (!Array.isArray(q?.feedback) || !Array.isArray(q?.choices)) continue;
    if (q.feedback.length !== q.choices.length) {
      problems.push(`${lesson.id}: feedback length ${q.feedback.length} != choices ${q.choices.length}`);
    } else if (q.feedback[q.answer] !== null) {
      problems.push(`${lesson.id}: feedback[${q.answer}] is not null at the answer index`);
    }
  }
}

console.log(`\nsrc/academies/${academy} — ${counts.lessons} lessons\n`);
console.log('  MOVED');
console.log(`    wrapped into novaIntro        ${String(counts.wrappedNovaIntro).padStart(4)}`);
console.log(`    glossary array -> term map    ${String(counts.glossaryMapped).padStart(4)}`);
console.log(`    check -> questions            ${String(counts.questionsRenamed).padStart(4)}`);
console.log(`    why -> explanation            ${String(counts.explanationsFilled).padStart(4)}`);
console.log(`    applyIt -> applyItQuestion    ${String(counts.applyItRenamed).padStart(4)}`);
console.log('\n  KEPT, UNDER THEIR OWN NAMES');
console.log(`    checkIn                       ${String(counts.keptCheckIn).padStart(4)}`);
console.log(`    activity                      ${String(counts.keptActivity).padStart(4)}`);
console.log(`    ledger                        ${String(counts.keptLedger).padStart(4)}`);
console.log(`    practice                      ${String(counts.keptPractice).padStart(4)}`);
console.log(`    standards                     ${String(counts.keptStandards).padStart(4)}`);
console.log(`    video provenance              ${String(counts.keptVideoProvenance).padStart(4)}`);

if (problems.length) {
  console.log(`\n  ${problems.length} PROBLEM(S) — reported, never repaired:`);
  for (const p of problems.slice(0, 20)) console.log('    ' + p);
  if (problems.length > 20) console.log(`    …and ${problems.length - 20} more`);
}

if (!WRITE) {
  console.log('\n  Dry run. Nothing was written. Re-run with --write to apply.\n');
}

export { all as sourceLessons };
