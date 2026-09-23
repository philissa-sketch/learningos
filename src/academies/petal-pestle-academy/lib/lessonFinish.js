// ---------------------------------------------------------------------------
// WHAT THE APP TELLS HER WHEN SHE FINISHES A LESSON.
//
// ---- WHY THIS IS A LIB AND NOT A FEW LINES INSIDE THE COMPONENT ----
//
// It was inside the component first, and the check written for it was worth
// nothing. Two of its six negative tests came back green: the branch that tells
// three-of-three apart from one-of-three was deleted and the check did not
// notice, because the check looked for the STRING `gate.correct === gate.asked`
// in the file and that string still appeared two lines further down.
//
// A rule the app must follow lives where a check can CALL it, not where a check
// can grep for it. Everything below is a pure function of (lesson, answers), so
// check-delivery runs it on a real lesson with made-up answers and asserts what
// a child would actually be told — not what the source happens to contain.
//
// ---- WHAT IT REPLACED ----
//
// One message, identical whatever happened:
//
//     🌿 Lesson finished
//     Some of this will come back in your warm-up tomorrow.
//
// On sl-m2-01, Aug 17 2026, she answered two of three wrong and got that.
//
// ---- THE RULES IT KEEPS ----
//
// 1. WARM, NEVER SOFTENED. §3.7.2 rule 2 — recognition is separate from
//    assessment, and warm words must never make a score sound better than it
//    is. "Two of three" stays "two of three". No praise over a miss; a child
//    works out fast that praise arriving whatever she does is not about her.
//
// 2. IT SHOWS THE MISS, NOT A LABEL FOR IT. She gets the question back, the
//    right answer, and the line saying why the one she picked was wrong. None
//    of that needed writing — all 768 check items already carry per-choice
//    feedback.
//
// 3. SCREEN AND SOUND COME FROM ONE PLACE. `chunks` is built from the same
//    fields the screen renders, in the same order. At v3.43 the read-aloud and
//    the screen had drifted apart and read every lesson twice; that could
//    happen because they were two functions describing the same thing. Here
//    they are one.
// ---------------------------------------------------------------------------

/**
 * @param {object} lesson  a lesson from appCourses
 * @param {object} answers { [checkIndex]: chosenIndex } — what she picked
 */
export function lessonFinishSummary(lesson, answers = {}) {
  const check = lesson?.check || [];

  const asked = check.filter((_, i) => answers[i] !== undefined).length;
  const correct = check.filter((c, i) => answers[i] === c.answer).length;

  const missed = check
    .map((c, i) => ({ c, i, picked: answers[i] }))
    .filter(({ c, picked }) => picked !== undefined && picked !== c.answer)
    .map(({ c, i, picked }) => ({
      index: i,
      prompt: c.prompt,
      answerText: c.choices[c.answer],
      whyWrong: c.feedback?.[picked] || null
    }));

  // `passed` mirrors PRACTICE_GATE.maxMisses without importing it, because this
  // function must stay pure data-in/data-out. The gate itself still decides
  // whether extra practice is offered; this only decides which sentence she
  // reads. check-delivery asserts the two agree.
  const allRight = asked > 0 && correct === asked;
  const nearMiss = asked > 0 && asked - correct === 1;

  const headline =
    asked === 0 ? 'Lesson finished' : allRight ? `All ${asked} right.` : `${correct} of ${asked} right.`;

  const closing =
    asked === 0
      ? 'Some of this will come back in your warm-up. That is on purpose — it is how it sticks.'
      : allRight
        ? 'You have got this one. It will come back in a warm-up in a few days, which is how it sticks.'
        : nearMiss
          ? 'It will come back in your warm-up, so you get another go at it.'
          : 'That was a hard one. These come back in your warm-ups, and Gigi can see this lesson is worth going over with you.';

  const heading =
    missed.length === 0 ? null : missed.length === 1 ? 'The one to look at again' : 'These are worth another look';

  // What she HEARS. Same fields, same order as the screen below it.
  const chunks = [
    headline,
    ...missed.flatMap((m) => [
      'Here is one to look at again.',
      m.prompt,
      `The answer is: ${m.answerText}.`,
      m.whyWrong
    ]),
    closing
  ].filter(Boolean);

  return { asked, correct, allRight, nearMiss, missed, heading, headline, closing, chunks };
}

export default lessonFinishSummary;
