import { useMemo, useState } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import { getTemplateById } from '../../engine/problemTemplates.js';
import { isAnswerCorrect, getWrongAnswerFeedback } from '../../engine/lessonScoring.js';
import { pickWeakSpotGeneratorIds } from '../../lib/studyCycle.js';
import { QuestionCard } from './QuestionCard.jsx';

const QUESTIONS_PER_GENERATOR = 2;
const MAX_GENERATORS = 4;

/**
 * Day 3 of the 5-Day Study Cycle (PROJECT_PLAN.md Part 4) — a real
 * adaptive drill, not a blank rest day. Ranks the quarter's own lessons
 * by bestAccuracy and pulls fresh practice questions from the weakest
 * ones' generators (src/lib/studyCycle.js), reusing the same
 * QuestionCard/isAnswerCorrect machinery daily practice already uses.
 * Low-stakes like Term Blitz: XP per correct answer only, never written
 * to lessonProgress or mastery.
 */
export function WeakSpotDrill({ subject, quarter, onExit }) {
  const lessonProgress = useAppStore((s) => s.lessonProgress);
  const submitWeakSpotDrill = useAppStore((s) => s.submitWeakSpotDrill);

  const questions = useMemo(() => {
    const generatorIds = pickWeakSpotGeneratorIds(subject, quarter, lessonProgress, MAX_GENERATORS);
    const built = [];
    let i = 0;
    for (const id of generatorIds) {
      const template = getTemplateById(id);
      if (!template) continue;
      for (let n = 0; n < QUESTIONS_PER_GENERATOR; n += 1) {
        built.push({ id: `wsd-${i}`, ...template.build() });
        i += 1;
      }
    }
    return built;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subject, quarter]);

  const [index, setIndex] = useState(0);
  const [lastResult, setLastResult] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);

  if (questions.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-6 text-center sm:px-6">
        <p className="text-sm text-ink-300">
          No completed {quarter} lessons to draw a weak-spot drill from yet — come back once a few lessons are done.
        </p>
        <button
          type="button"
          onClick={onExit}
          className="mt-4 rounded-lg bg-signal-cyan px-4 py-2 font-display font-700 text-space-950 transition hover:brightness-110"
        >
          Back to Lessons
        </button>
      </div>
    );
  }

  const currentQuestion = questions[index];

  function handleSubmit(submittedValue) {
    const correct = isAnswerCorrect(currentQuestion, submittedValue);
    const feedback = correct ? currentQuestion.explanation : getWrongAnswerFeedback(currentQuestion, submittedValue);
    setLastResult({ correct, feedback });
    if (correct) setCorrectCount((c) => c + 1);
  }

  async function handleContinue() {
    if (index + 1 >= questions.length) {
      const finalCorrect = correctCount;
      const result = await submitWeakSpotDrill(subject, quarter, finalCorrect);
      setXpEarned(result?.xpEarned || 0);
      setFinished(true);
    } else {
      setIndex((i) => i + 1);
      setLastResult(null);
    }
  }

  if (finished) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-6 text-center sm:px-6">
        <div className="rounded-xl border border-space-700 bg-space-800 p-6 shadow-panel">
          <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Weak-Spot Drill Complete</p>
          <h2 className="mt-2 font-display text-2xl font-700 text-ink-100">Day 3 — Study Cycle</h2>
          <div className="mt-4 flex justify-center gap-8">
            <div>
              <p className="telemetry text-3xl font-700 text-ink-100">
                {correctCount}/{questions.length}
              </p>
              <p className="text-xs text-ink-500">Correct</p>
            </div>
            <div>
              <p className="telemetry text-3xl font-700 text-signal-amber">+{xpEarned}</p>
              <p className="text-xs text-ink-500">XP Earned</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onExit}
            className="mt-6 rounded-lg bg-signal-cyan px-5 py-2 font-display font-700 text-space-950 transition hover:brightness-110"
          >
            Return to Lessons
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6">
      <div className="mb-4 flex items-center justify-between">
        <button type="button" onClick={onExit} className="text-sm text-ink-500 underline hover:text-ink-100">
          ← Back to Lessons
        </button>
        <p className="text-xs font-display uppercase tracking-widest text-signal-amber">Day 3 — Weak-Spot Drill</p>
      </div>

      <QuestionCard
        question={currentQuestion}
        index={index}
        total={questions.length}
        onSubmit={handleSubmit}
        locked={Boolean(lastResult)}
        lastResult={lastResult}
      />

      {lastResult && (
        <button
          type="button"
          onClick={handleContinue}
          className="mt-4 w-full rounded-lg bg-signal-cyan px-4 py-2 font-display font-700 text-space-950 transition hover:brightness-110"
        >
          {index + 1 >= questions.length ? 'Finish Drill' : 'Next Question'}
        </button>
      )}
    </div>
  );
}
