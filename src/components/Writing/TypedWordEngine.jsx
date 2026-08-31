import { useState, useMemo, useRef } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import {
  buildMissingLettersPrompt,
  buildSpellingTestPrompt,
  buildReviewWordSet,
  isTypedAnswerCorrect,
  activityFor
} from '../../lib/weeklyWords.js';
import { MasteredNote } from './WordPracticeEngine.jsx';

/**
 * THE TWO DAYS HE HAS TO PRODUCE THE WORD, NOT PICK IT.
 *
 * Thursday (`missing`) gives him the word with the tricky letters knocked out —
 * "Rec__ve" — and Friday (`spell`) gives him only the three misspellings and
 * asks for the right one. Neither shows the correct spelling before he types.
 *
 * This is the part the old cycle never had. Recognising RECEIVE in a list of
 * four is a different skill from writing it, and the old Friday "test" only
 * ever tested the first one — which is why he could pass every week and still
 * misspell it in his writing journal on Monday.
 *
 * Grading is exact on letters and forgiving on everything else: case and
 * surrounding spaces never count against him (see isTypedAnswerCorrect). A
 * spelling test that fails "receive" for a lowercase R is testing typing.
 */
export function TypedWordEngine({ skill, dayKey, onExit }) {
  const getWeeklyWordList = useAppStore((s) => s.getWeeklyWordList);
  const completeWordDayTask = useAppStore((s) => s.completeWordDayTask);
  const { weekNumber, words, dayMissedIds } = getWeeklyWordList(skill);
  const activity = activityFor(skill, dayKey) || { type: 'missing', label: 'Missing letters' };

  const [attemptSeed] = useState(() => Date.now());
  const missedKey = JSON.stringify(dayMissedIds || {});
  const wordKey = words.map((w) => w.id).join(',');
  const roundWords = useMemo(
    () => (dayKey === 'thu' ? buildReviewWordSet(words, dayMissedIds) : words),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dayKey, wordKey, missedKey]
  );
  const prompts = useMemo(
    () =>
      roundWords.map((w) =>
        activity.type === 'spell'
          ? buildSpellingTestPrompt(w, attemptSeed)
          : buildMissingLettersPrompt(w, attemptSeed)
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activity.type, roundWords, attemptSeed, wordKey]
  );

  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState('');
  const [answered, setAnswered] = useState(false);
  const [results, setResults] = useState([]);
  const [finalResult, setFinalResult] = useState(null);
  const inputRef = useRef(null);

  const prompt = prompts[index];
  const isLast = index === prompts.length - 1;
  const wasCorrect = answered && isTypedAnswerCorrect(typed, prompt.answer);

  const handleSubmit = () => {
    if (!typed.trim()) return;
    setAnswered(true);
  };

  const handleContinue = async () => {
    const newResults = [...results, { wordId: prompt.wordId, correct: isTypedAnswerCorrect(typed, prompt.answer) }];
    if (!isLast) {
      setResults(newResults);
      setIndex((i) => i + 1);
      setTyped('');
      setAnswered(false);
      if (inputRef.current) inputRef.current.focus();
      return;
    }
    const outcome = await completeWordDayTask(skill, dayKey, newResults);
    setFinalResult({
      correctCount: newResults.filter((r) => r.correct).length,
      total: newResults.length,
      xpEarned: outcome.xpEarned,
      mastered: outcome.mastered || [],
      missed: newResults.filter((r) => !r.correct).map((r) => r.wordId)
    });
  };

  if (prompts.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6">
        <p className="text-sm text-ink-300">No words to work on right now.</p>
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
            Week {weekNumber} Spelling — {activity.label} complete
          </p>
          <h2 className="mt-2 font-display text-3xl font-700 text-ink-100">
            {finalResult.correctCount}/{finalResult.total} spelled correctly
          </h2>
          <p className="mt-1 text-sm text-ink-300">+{finalResult.xpEarned} XP earned</p>
          <MasteredNote count={finalResult.mastered.length} isTest={dayKey === 'fri'} />
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
          Week {weekNumber} Spelling · {activity.label} — Word {index + 1} of {prompts.length}
        </span>
      </div>

      <div className="rounded-xl border border-space-700 bg-space-800 p-6 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">{prompt.promptLabel}</p>

        {prompt.kind === 'missing' ? (
          <p className="mt-3 break-words font-display text-4xl font-700 tracking-[0.2em] text-ink-100">
            {prompt.masked}
          </p>
        ) : (
          <div className="mt-3 space-y-1">
            {prompt.wrongForms.map((w) => (
              <p key={w} className="font-display text-xl text-signal-amber line-through">
                {w}
              </p>
            ))}
          </div>
        )}

        <p className="mt-2 text-xs text-ink-500">{prompt.letterCount} letters</p>
      </div>

      <input
        ref={inputRef}
        type="text"
        value={typed}
        disabled={answered}
        autoFocus
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        onChange={(e) => setTyped(e.target.value)}
        onKeyDown={(e) => {
          if (e.key !== 'Enter') return;
          if (answered) handleContinue();
          else handleSubmit();
        }}
        placeholder="Type the word"
        className={
          'w-full rounded-lg border bg-space-900 px-4 py-3 font-display text-2xl text-ink-100 outline-none transition ' +
          (answered
            ? wasCorrect
              ? 'border-signal-green'
              : 'border-signal-red'
            : 'border-space-700 focus:border-signal-cyan')
        }
      />

      {answered && (
        <div
          className={
            'rounded-xl border p-4 text-sm ' +
            (wasCorrect
              ? 'border-signal-green/40 bg-signal-green/5 text-signal-green'
              : 'border-signal-red/40 bg-signal-red/5 text-ink-300')
          }
        >
          {wasCorrect ? 'Correct.' : `Not quite — it is ${prompt.answer}.`}
          <span className="mt-1 block text-xs text-ink-500">{prompt.explanation}</span>
        </div>
      )}

      {!answered ? (
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!typed.trim()}
          className="w-full rounded-lg bg-signal-cyan px-4 py-2 font-display font-700 text-space-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Check It
        </button>
      ) : (
        <button
          type="button"
          onClick={handleContinue}
          className="w-full rounded-lg bg-signal-cyan px-4 py-2 font-display font-700 text-space-950 transition hover:brightness-110"
        >
          {isLast ? 'Finish' : 'Next Word'}
        </button>
      )}
    </div>
  );
}
