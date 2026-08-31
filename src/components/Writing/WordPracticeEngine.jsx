import { useState, useMemo } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import {
  buildQuestionForWord,
  buildBlankQuestion,
  buildRecallQuestion,
  buildReviewWordSet,
  activityFor
} from '../../lib/weeklyWords.js';

const SKILL_LABELS = { spelling: 'Spelling', vocabulary: 'Vocabulary' };

/**
 * THE MULTIPLE-CHOICE DAYS. Four different questions, not one question four
 * times.
 *
 * | day | activity | the question it asks |
 * |-----|----------|----------------------|
 * | Tue spelling    | `choose`  | four spellings, which is right |
 * | Tue vocabulary  | `meaning` | here is the word in a sentence, what does it mean |
 * | Wed vocabulary  | `blank`   | here is the sentence with a hole, which word fits |
 * | Thu vocabulary  | `recall`  | here is the meaning, which word is it |
 * | Fri vocabulary  | `test`    | the graded one, same shape as Tuesday |
 *
 * Wednesday and Thursday draw their wrong answers from THE OTHER NINE WORDS HE
 * IS LEARNING THIS WEEK. That is deliberate and it is the whole difficulty: a
 * wrong answer picked from the far end of the pool can be ruled out without
 * knowing anything, and a week of those teaches him to eliminate rather than to
 * read.
 *
 * Thursday runs only on what he missed Tue/Wed when there is anything to run
 * on, and on the full list when there is not.
 */
export function WordPracticeEngine({ skill, dayKey, onExit }) {
  const getWeeklyWordList = useAppStore((s) => s.getWeeklyWordList);
  const completeWordDayTask = useAppStore((s) => s.completeWordDayTask);
  const { weekNumber, words, dayMissedIds } = getWeeklyWordList(skill);
  const activity = activityFor(skill, dayKey) || { type: 'choose', label: 'Practice' };

  // The store getter hands back a FRESH array on every render, so anything
  // memoised on `words` itself never held and the choices re-shuffled the
  // moment he clicked one. Keyed on the ids -- a string -- and every builder
  // takes the seed below, which is what actually makes it correct.
  const [attemptSeed] = useState(() => Date.now());
  const missedKey = JSON.stringify(dayMissedIds || {});
  const wordKey = words.map((w) => w.id).join(',');
  const roundWords = useMemo(
    () => (dayKey === 'thu' ? buildReviewWordSet(words, dayMissedIds) : words),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dayKey, wordKey, missedKey]
  );
  const questions = useMemo(() => {
    if (activity.type === 'blank') return roundWords.map((w) => buildBlankQuestion(w, words, attemptSeed));
    if (activity.type === 'recall') return roundWords.map((w) => buildRecallQuestion(w, words, attemptSeed));
    return roundWords.map((w) => buildQuestionForWord(skill, w, attemptSeed));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skill, activity.type, roundWords, attemptSeed, wordKey]);

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [results, setResults] = useState([]); // { wordId, correct }
  const [finalResult, setFinalResult] = useState(null);

  const question = questions[index];
  const isLast = index === questions.length - 1;
  const isTest = dayKey === 'fri';

  const handleSubmit = () => {
    if (selected === null) return;
    setAnswered(true);
  };

  const handleContinue = async () => {
    const correct = selected === question.answerIndex;
    const newResults = [...results, { wordId: question.wordId, correct }];

    if (!isLast) {
      setResults(newResults);
      setIndex((i) => i + 1);
      setSelected(null);
      setAnswered(false);
      return;
    }

    const outcome = await completeWordDayTask(skill, dayKey, newResults);
    setFinalResult({
      correctCount: newResults.filter((r) => r.correct).length,
      total: newResults.length,
      xpEarned: outcome.xpEarned,
      mastered: outcome.mastered || []
    });
  };

  if (questions.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6">
        <p className="text-sm text-ink-300">No words to practice right now.</p>
        <button type="button" onClick={onExit} className="mt-4 text-sm text-signal-cyan underline">
          Return to Mission Control
        </button>
      </div>
    );
  }

  if (finalResult) {
    return (
      <div className="mx-auto max-w-2xl space-y-4 px-4 py-6 sm:px-6">
        <div className="rounded-xl border border-signal-green/40 bg-signal-green/5 p-6 text-center shadow-panel">
          <p className="text-xs font-display uppercase tracking-widest text-signal-green">
            Week {weekNumber} {SKILL_LABELS[skill]} — {activity.label} complete
          </p>
          <h2 className="mt-2 font-display text-3xl font-700 text-ink-100">
            {finalResult.correctCount}/{finalResult.total} correct
          </h2>
          <p className="mt-1 text-sm text-ink-300">+{finalResult.xpEarned} XP earned</p>
          <MasteredNote count={finalResult.mastered.length} isTest={isTest} />
          <button
            type="button"
            onClick={onExit}
            className="mt-5 rounded-lg bg-signal-cyan px-4 py-2 font-display font-700 text-space-950 transition hover:brightness-110"
          >
            Return to Mission Control
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-4 px-4 py-6 sm:px-6">
      <div className="flex items-center justify-between">
        <button type="button" onClick={onExit} className="text-sm text-ink-500 hover:text-ink-100">
          ← Exit mission
        </button>
        <span className="text-sm text-ink-500">
          Week {weekNumber} {SKILL_LABELS[skill]} · {activity.label} — Question {index + 1} of {questions.length}
        </span>
      </div>

      <div className="rounded-xl border border-space-700 bg-space-800 p-6 shadow-panel">
        {question.promptLabel && (
          <p className="mb-2 text-xs font-display uppercase tracking-widest text-signal-cyan">
            {question.promptLabel}
          </p>
        )}
        <p className="leading-relaxed text-ink-100">{question.prompt}</p>
      </div>

      <div className="space-y-2">
        {question.choices.map((choice, i) => {
          let stateClass = 'border-space-700 bg-space-800 hover:border-signal-cyan';
          if (answered) {
            if (i === question.answerIndex) stateClass = 'border-signal-green bg-signal-green/10';
            else if (i === selected) stateClass = 'border-signal-red bg-signal-red/10';
            else stateClass = 'border-space-700 bg-space-800 opacity-60';
          } else if (i === selected) {
            stateClass = 'border-signal-cyan bg-signal-cyan/10';
          }
          return (
            <button
              key={i}
              type="button"
              disabled={answered}
              onClick={() => setSelected(i)}
              className={`w-full rounded-lg border p-3 text-left text-ink-100 transition ${stateClass}`}
            >
              {choice}
            </button>
          );
        })}
      </div>

      {answered && (
        <div className="rounded-xl border border-space-700 bg-space-900 p-4 text-sm text-ink-300">
          {question.explanation}
        </div>
      )}

      {!answered ? (
        <button
          type="button"
          onClick={handleSubmit}
          disabled={selected === null}
          className="w-full rounded-lg bg-signal-cyan px-4 py-2 font-display font-700 text-space-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Submit Answer
        </button>
      ) : (
        <button
          type="button"
          onClick={handleContinue}
          className="w-full rounded-lg bg-signal-cyan px-4 py-2 font-display font-700 text-space-950 transition hover:brightness-110"
        >
          {isLast ? 'Finish' : 'Next Question'}
        </button>
      )}
    </div>
  );
}

/**
 * The line that replaced "This is practice — it doesn't affect Friday's test or
 * next week's list", which was true and was the bug: four days a week of work
 * that changed nothing. Every recall day now moves words off the list.
 */
export function MasteredNote({ count, isTest }) {
  if (count > 0) {
    return (
      <p className="mt-3 text-sm text-signal-green">
        {count} word{count === 1 ? '' : 's'} learned — {count === 1 ? 'it leaves' : 'they leave'} the list on Monday and
        new ones come in.
      </p>
    );
  }
  return (
    <p className="mt-3 text-xs text-ink-500">
      {isTest
        ? 'Anything not learned yet carries into next week alongside new words.'
        : 'Three correct in a row and a word is done with — this round counted toward that.'}
    </p>
  );
}
