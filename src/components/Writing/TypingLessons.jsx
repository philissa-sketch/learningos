import { useEffect, useRef, useState } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import { academyContent } from '../../content/academyContent.js';

const { typingLessons = [] } = academyContent().writing;

export function TypingLessons({ onExit, onGoToSpeedTest }) {
  const typingLessonProgress = useAppStore((s) => s.typingLessonProgress);
  const recordTypingLessonResult = useAppStore((s) => s.recordTypingLessonResult);

  const [activeLesson, setActiveLesson] = useState(null);
  const [typed, setTyped] = useState('');
  const [result, setResult] = useState(null); // { accuracy, mastered, xpEarned } | null
  const inputRef = useRef(null);

  const masteredCount = Object.values(typingLessonProgress).filter((p) => p.mastered).length;

  const startLesson = (lesson) => {
    setActiveLesson(lesson);
    setTyped('');
    setResult(null);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setTyped(value);
    if (value.length >= activeLesson.practiceText.length) {
      finish(value);
    }
  };

  const finish = async (finalValue) => {
    const target = activeLesson.practiceText;
    let correctChars = 0;
    for (let i = 0; i < target.length; i++) {
      if (finalValue[i] === target[i]) correctChars += 1;
    }
    const accuracy = Math.round((correctChars / target.length) * 100);
    const outcome = await recordTypingLessonResult(activeLesson.id, accuracy, activeLesson.minAccuracy);
    setResult({ accuracy, ...outcome });
  };

  const retryLesson = () => {
    setTyped('');
    setResult(null);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  // ---- Lesson list view ----
  if (!activeLesson) {
    return (
      <div className="mx-auto max-w-2xl space-y-4 px-4 py-6 sm:px-6">
        <div className="flex items-center justify-between">
          <button type="button" onClick={onExit} className="text-sm text-ink-500 hover:text-ink-100">
            ← Exit
          </button>
          <span className="text-sm text-ink-500">Learn to Type</span>
        </div>

        <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
          <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Learn to Type</p>
          <h2 className="mt-1 font-display text-xl font-700 text-ink-100">
            {masteredCount} / {typingLessons.length} lessons mastered
          </h2>
          <p className="mt-2 text-sm text-ink-300">
            Each lesson introduces new keys and finger positions, building up from the home row to full sentences.
            Once you've mastered these, head to the Speed Test to build raw speed on material you already know how
            to type.
          </p>
          <button
            type="button"
            onClick={onGoToSpeedTest}
            className="mt-4 rounded-lg border border-space-600 px-3 py-1.5 text-sm font-display text-ink-300 transition hover:text-ink-100"
          >
            Go to Speed Test instead →
          </button>
        </div>

        <div className="space-y-2">
          {typingLessons.map((lesson) => {
            const progress = typingLessonProgress[lesson.id];
            return (
              <div
                key={lesson.id}
                className="flex items-center justify-between rounded-xl border border-space-700 bg-space-800 p-4 shadow-panel"
              >
                <div>
                  <p className="font-display text-base font-700 text-ink-100">
                    {lesson.order}. {lesson.title}
                  </p>
                  <p className="text-xs text-ink-500">Keys: {lesson.keysIntroduced}</p>
                  {progress?.bestAccuracy != null && (
                    <p className="mt-1 text-xs text-ink-500">Best accuracy: {progress.bestAccuracy}%</p>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  {progress?.mastered && (
                    <span className="rounded-full border border-signal-green/40 bg-signal-green/10 px-2 py-1 text-xs font-display text-signal-green">
                      Mastered
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => startLesson(lesson)}
                    className="rounded-lg bg-signal-cyan px-3 py-1.5 text-sm font-display font-700 text-space-950 transition hover:brightness-110"
                  >
                    {progress?.mastered ? 'Redo' : 'Start'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ---- Result view ----
  if (result) {
    return (
      <div className="mx-auto max-w-2xl space-y-4 px-4 py-6 sm:px-6">
        <div
          className={
            'rounded-xl border p-6 text-center shadow-panel ' +
            (result.mastered ? 'border-signal-green/40 bg-signal-green/5' : 'border-signal-amber/40 bg-signal-amber/5')
          }
        >
          <p className="text-xs font-display uppercase tracking-widest text-ink-500">Lesson Complete</p>
          <h2 className="mt-2 font-display text-3xl font-700 text-ink-100">{result.accuracy}% accuracy</h2>
          <p className="mt-1 text-sm text-ink-300">
            {result.mastered
              ? `Mastered! You've hit the ${activeLesson.minAccuracy}% accuracy target for this lesson.`
              : `Aim for ${activeLesson.minAccuracy}% accuracy to master this lesson — give it another try.`}
          </p>
          <p className="mt-1 text-xs text-signal-amber">+{result.xpEarned} XP</p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={retryLesson}
              className="rounded-lg bg-space-700 px-4 py-2 font-display font-700 text-ink-100 transition hover:bg-space-600"
            >
              Try Again
            </button>
            <button
              type="button"
              onClick={() => setActiveLesson(null)}
              className="rounded-lg bg-signal-cyan px-4 py-2 font-display font-700 text-space-950 transition hover:brightness-110"
            >
              Back to Lesson List
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ---- Active typing view ----
  return (
    <div className="mx-auto max-w-2xl space-y-4 px-4 py-6 sm:px-6">
      <div className="flex items-center justify-between">
        <button type="button" onClick={() => setActiveLesson(null)} className="text-sm text-ink-500 hover:text-ink-100">
          ← Back to lessons
        </button>
        <span className="text-sm text-ink-500">
          Lesson {activeLesson.order} of {typingLessons.length}
        </span>
      </div>

      <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">{activeLesson.title}</p>
        <p className="mt-2 text-sm leading-relaxed text-ink-300">{activeLesson.fingerGuidance}</p>
      </div>

      <div className="rounded-xl border border-space-700 bg-space-800 p-6 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Type This</p>
        <p className="mt-4 font-mono text-lg leading-relaxed">
          {activeLesson.practiceText.split('').map((char, i) => {
            let className = 'text-ink-500';
            if (i < typed.length) {
              className = typed[i] === char ? 'text-signal-green' : 'text-signal-red';
            }
            return (
              <span key={i} className={className}>
                {char}
              </span>
            );
          })}
        </p>
      </div>

      <textarea
        ref={inputRef}
        value={typed}
        onChange={handleChange}
        rows={4}
        autoFocus
        placeholder="Start typing here…"
        className="w-full resize-none rounded-lg border border-space-700 bg-space-900 p-3 font-mono text-ink-100 placeholder:text-ink-500 focus:border-signal-cyan focus:outline-none"
      />
    </div>
  );
}
