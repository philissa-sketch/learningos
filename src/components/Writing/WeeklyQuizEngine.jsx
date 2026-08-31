import { useState, useMemo } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import { buildQuestionForWord } from '../../lib/weeklyWords.js';

const SKILL_LABELS = { spelling: 'Spelling', vocabulary: 'Vocabulary' };

export function WeeklyQuizEngine({ skill, onExit }) {
  const getWeeklyWordList = useAppStore((s) => s.getWeeklyWordList);
  const submitWeeklyQuiz = useAppStore((s) => s.submitWeeklyQuiz);
  const { weekNumber, words } = getWeeklyWordList(skill);

  // ONE SEED PER SITTING. Created once on mount and never changed, so every
  // re-render rebuilds the SAME layout — and a retake next week gets a new one,
  // so he cannot pass by memorising which slot the answer sat in.
  const [attemptSeed] = useState(() => Date.now());

  // DEPENDED ON `words` UNTIL AUG 9 2026, and that array is rebuilt by the store
  // getter on every single render, so this memo never actually held and the
  // choices re-shuffled underneath him the moment he clicked one. Keyed on the
  // word IDS now — a string, stable across renders. The seeded builder above is
  // what makes this correct rather than merely cheaper.
  const wordKey = words.map((w) => w.id).join(',');
  const questions = useMemo(
    () => words.map((w) => buildQuestionForWord(skill, w, attemptSeed)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [skill, wordKey, attemptSeed]
  );

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [results, setResults] = useState([]); // { wordId, correct }
  const [finalResult, setFinalResult] = useState(null);

  const question = questions[index];
  const isLast = index === questions.length - 1;

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

    const missedWordIds = newResults.filter((r) => !r.correct).map((r) => r.wordId);
    const correctCount = newResults.filter((r) => r.correct).length;
    const outcome = await submitWeeklyQuiz(skill, missedWordIds, correctCount);
    setFinalResult({
      correctCount,
      total: newResults.length,
      xpEarned: outcome.xpEarned,
      missedWordIds,
      mastered: outcome.mastered || []
    });
  };

  if (finalResult) {
    return (
      <div className="mx-auto max-w-2xl space-y-4 px-4 py-6 sm:px-6">
        <div className="rounded-xl border border-signal-green/40 bg-signal-green/5 p-6 text-center shadow-panel">
          <p className="text-xs font-display uppercase tracking-widest text-signal-green">
            Week {weekNumber} {SKILL_LABELS[skill]} Quiz Complete
          </p>
          <h2 className="mt-2 font-display text-3xl font-700 text-ink-100">
            {finalResult.correctCount}/{finalResult.total} correct
          </h2>
          <p className="mt-1 text-sm text-ink-300">+{finalResult.xpEarned} XP earned</p>
          {/* THIS USED TO PROMISE SOMETHING THE APP DID NOT DO. It said missed
              words carry and a perfect score means all new words — true only of
              the old rotation, which needed this quiz to move at all and moved
              nothing in a week it was skipped. A word now leaves the list after
              three correct in a row across ANY of the week's activities, so
              what changes on Monday is what he has learned, not what he got
              right on Friday. */}
          <p className="mt-3 text-sm text-signal-green">
            {finalResult.mastered.length > 0
              ? `${finalResult.mastered.length} word${finalResult.mastered.length === 1 ? '' : 's'} learned — ${finalResult.mastered.length === 1 ? 'it leaves' : 'they leave'} the list on Monday.`
              : ''}
          </p>
          <p className="mt-1 text-xs text-ink-500">
            Anything not learned yet comes back next week alongside new words.
          </p>
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
          Week {weekNumber} {SKILL_LABELS[skill]} Quiz — Question {index + 1} of {questions.length}
        </span>
      </div>

      <div className="rounded-xl border border-space-700 bg-space-800 p-6 shadow-panel">
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
          {isLast ? 'Finish Quiz' : 'Next Question'}
        </button>
      )}
    </div>
  );
}
