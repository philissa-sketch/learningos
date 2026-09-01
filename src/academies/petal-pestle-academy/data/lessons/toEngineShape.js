// ---------------------------------------------------------------------------
// THIS ACADEMY'S LESSONS, IN THE SHAPE THE ENGINE READS.
//
// ---- WHY THIS IS A FUNCTION AND NOT A REWRITE OF 256 FILES ----
//
// The obvious way to fit these lessons to the engine is to edit them: move the
// fields, rename the keys, commit the diff. It was written as a script first
// (scripts/transform-lessons.mjs) and then not used that way, for three
// reasons.
//
//   1. These files are AUTHORED. Every one carries the reasoning for what it
//      teaches and why, in prose, above the content. A mechanical rewrite of
//      256 of them produces a diff nobody can read, which means nobody checks
//      it, which means the one lesson it damaged is found by a nine-year-old.
//   2. The adapting is this Academy's business — src/content/academyContent.js
//      says exactly that about the manifest. A shape change that exists to
//      satisfy the platform belongs at the boundary with the platform, not
//      smeared through the curriculum.
//   3. It is reversible. If the engine's shape changes again, this file
//      changes. The lessons do not.
//
// ---- WHAT THIS DOES ----
//
// Four renames and a wrapper. Every value already exists and is already
// correct; nothing here writes teaching content or fills an authoring gap.
//
//   beats + glossary + video.url  ->  novaIntro   (where the engine looks)
//   glossary [{word, plain}]      ->  { word: plain }
//   check                         ->  questions
//   beat.applyIt                  ->  beat.applyItQuestion
//   question.why                  ->  question.explanation
//
// ---- WHAT IS DELIBERATELY UNTOUCHED ----
//
// `checkIn`, `activity`, `ledger`, `practice`, `standards`, `offGrade`,
// `concept`, `words`, `minutes` and the whole `video` object stay exactly as
// authored, under their own names. The engine reads them there. They were never
// the wrong shape — there was simply no phase rendering them until there was.
//
// ---- AND WHAT MUST NEVER BE ADDED HERE ----
//
// A default. If a lesson is missing something, this must let it stay missing:
// a transform that quietly substitutes an empty array or a placeholder sentence
// turns an authoring gap into an invisible one. scripts/transform-lessons.mjs
// reports gaps; nothing repairs them but a person.
// ---------------------------------------------------------------------------

/**
 * The glossary the engine wants.
 *
 * Authored as an array of `{ word, plain }`. `GlossaryText` does
 * `Object.keys(terms)` — hand it the array and it gets "0", "1", "2", finds
 * none of them in the teaching text, and silently highlights nothing. No error,
 * no warning, just a lesson whose vocabulary quietly stops working.
 */
function glossaryMap(glossary) {
  if (!Array.isArray(glossary)) return glossary || undefined;
  const map = {};
  for (const entry of glossary) {
    if (entry?.word) map[entry.word] = entry.plain ?? '';
  }
  return Object.keys(map).length ? map : undefined;
}

/**
 * `why` is the sentence shown after a correct answer; the engine reads it as
 * `explanation`. Kept side by side rather than renamed in place, and an
 * existing `explanation` always wins — which of two sentences is the right one
 * is a content question, not a script's to settle.
 */
function withExplanation(question) {
  if (!question || typeof question !== 'object') return question;
  if (question.explanation || !question.why) return question;
  return { ...question, explanation: question.why };
}

/** One lesson. Pure — the authored object is never mutated. */
export function toEngineShape(lesson) {
  if (!lesson || typeof lesson !== 'object') return lesson;

  const out = { ...lesson };

  const beats = (lesson.novaIntro?.beats || lesson.beats || []).map((beat) => {
    if (!beat?.applyIt || beat.applyItQuestion) return beat;
    const { applyIt, ...rest } = beat;
    return { ...rest, applyItQuestion: withExplanation(applyIt) };
  });

  const glossary = lesson.novaIntro?.glossary
    ? glossaryMap(lesson.novaIntro.glossary)
    : glossaryMap(lesson.glossary);

  if (beats.length || glossary || lesson.video?.url) {
    out.novaIntro = {
      ...lesson.novaIntro,
      ...(beats.length ? { beats } : {}),
      ...(glossary ? { glossary } : {}),
      // The link rendered under the last beat. The full `video` object stays on
      // the lesson — this is the URL the engine needs, not a replacement for
      // the channel, the duration and the verification date beside it.
      ...(lesson.video?.url ? { videoUrl: lesson.video.url } : {})
    };
  }

  delete out.beats;
  delete out.glossary;

  const questions = lesson.questions || lesson.check;
  if (Array.isArray(questions)) out.questions = questions.map(withExplanation);
  delete out.check;

  return out;
}

/** Every lesson, adapted once. */
export function toEngineShapeAll(lessons) {
  return (lessons || []).map(toEngineShape);
}
