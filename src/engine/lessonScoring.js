// ---------------------------------------------------------------------------
// Pure scoring logic, kept separate from the engine's UI component so it can
// be unit-tested and reused by any future subject (science, robotics, etc.)
// without touching rendering code.
// ---------------------------------------------------------------------------

export const MASTERY_THRESHOLD = 0.9; // 90%+ correct on a lesson = mastered

/**
 * Can this question be scored without a human reading it?
 *
 * Only `shortAnswer` cannot. Everything else is either a choice index or a
 * value that compares exactly. This is deliberately a allow-by-default test:
 * a new question type is auto-graded unless it says otherwise, which keeps
 * every existing lesson behaving exactly as it did.
 */
export function isAutoGradable(question) {
  return question?.type !== 'shortAnswer';
}

export function isAnswerCorrect(question, submittedValue) {
  // A written answer is never "correct" automatically. Falling through to the
  // exact-string comparison below would mark every paragraph wrong, which is
  // precisely the defect that kept short answer out of the Social Studies Q4
  // exam. Callers must check isAutoGradable rather than trusting this false.
  if (!isAutoGradable(question)) return false;
  if (question.type === 'choice') {
    return submittedValue === question.answer;
  }
  // numeric/text: normalize whitespace and case before comparing
  const normalize = (v) => String(v).trim().toLowerCase().replace(/\s+/g, '');
  return normalize(submittedValue) === normalize(question.answer);
}

export function scoreLessonAttempt(lesson, answersById) {
  let correctCount = 0;
  let xpEarned = 0;
  const results = lesson.questions.map((q) => {
    const submitted = answersById[q.id];
    // A short answer is neither right nor wrong until a person reads it. It
    // is recorded, flagged, and left out of the arithmetic entirely — see
    // gradedTotal below. Marking it wrong would take a real point off a real
    // report card for a question he may well have answered perfectly.
    if (!isAutoGradable(q)) {
      return { questionId: q.id, correct: null, awaitingParentGrade: true, submitted, templateId: q.templateId ?? null };
    }
    const correct = isAnswerCorrect(q, submitted);
    if (correct) {
      correctCount += 1;
      xpEarned += q.xp;
    }
    // `templateId` only exists on daily-practice questions (tagged in
    // dailyPractice.js), never on curated lesson content — this lets the
    // store update the real spaced-repetition schedule (gap 1) for
    // exactly the questions that came from a practice generator, without
    // needing to know here which lesson type is being scored.
    return { questionId: q.id, correct, submitted, templateId: q.templateId ?? null };
  });

  // Denominator counts only what could be scored. A 30-choice + 1-short-answer
  // exam is out of 30 until she grades the written item, so a perfect paper
  // reads 100%, not 96.8%. Guard the all-short-answer case so an exam made
  // entirely of written items scores 0 rather than NaN.
  const gradedTotal = lesson.questions.filter(isAutoGradable).length;
  const awaitingParentGrade = lesson.questions.length - gradedTotal;
  const accuracy = gradedTotal > 0 ? correctCount / gradedTotal : 0;
  const mastered = accuracy >= MASTERY_THRESHOLD;
  /**
   * THE MASTERY BONUS IS PAID ONCE PER LESSON. (Fixed Aug 13, 2026.)
   *
   * It used to be `if (mastered) xpEarned += 20`, with no memory. Re-opening a
   * lesson he had already mastered and answering well paid the full bonus
   * again — and again, indefinitely. recordLessonResult keeps the mastered
   * FLAG sticky (`prior?.mastered || attemptResult.mastered`), so the mastery
   * COUNT never moved; only the XP did.
   *
   * That is precisely the divergence the parent was looking at: 1,085 XP
   * beside 6 lessons mastered, an XP bar pinned full, and a rank that would
   * not budge. Re-practice is a good thing and still pays per-question XP —
   * it just cannot re-sell the same milestone.
   *
   * This function stays PURE — it does not know what he mastered last week and
   * should not. It reports `masteryBonusXp` alongside the total, and
   * recordLessonResult, which HAS the stored progress row, subtracts it when
   * the lesson was already mastered.
   */
  const MASTERY_BONUS_XP = 20;
  const masteryBonusXp = mastered ? MASTERY_BONUS_XP : 0;
  xpEarned += masteryBonusXp;

  return {
    results,
    correctCount,
    // Reported separately so the caller can decline to pay it a second time.
    masteryBonusXp,
    totalQuestions: gradedTotal,
    awaitingParentGrade,
    accuracy,
    mastered,
    xpEarned
  };
}

/**
 * Returns feedback specific to the wrong answer the student actually gave,
 * not just the generic "here's the correct method" explanation — this is
 * the fix for the parent's explicit learning-style requirement (see
 * PROJECT_PLAN.md, Part 1): when he gets something wrong, it must explain
 * why THAT specific answer was wrong, not show the same message
 * regardless of which mistake was made.
 *
 * For choice questions: looks up `question.choiceFeedback[submittedIndex]`
 * — a message written for that exact wrong choice.
 * For numeric questions: looks up `question.commonMistakes[submittedValue]`
 * — a dict of known wrong answers (e.g. "the answer you'd get if you
 * forgot to simplify") mapped to a diagnosis of that specific error.
 * Falls back to `question.explanation` if no specific match exists,
 * so lessons without this data yet still work.
 */
export function getWrongAnswerFeedback(question, submittedValue) {
  if (question.type === 'choice' && Array.isArray(question.choiceFeedback)) {
    const specific = question.choiceFeedback[submittedValue];
    if (specific) return specific;
  }
  if (question.type === 'numeric' && question.commonMistakes) {
    const normalize = (v) => String(v).trim().toLowerCase().replace(/\s+/g, '');
    const key = Object.keys(question.commonMistakes).find((k) => normalize(k) === normalize(submittedValue));
    if (key) return question.commonMistakes[key];
  }
  return question.explanation;
}
