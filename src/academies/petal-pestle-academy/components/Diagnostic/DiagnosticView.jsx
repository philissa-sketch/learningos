import { useEffect, useState } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import { getStrand } from '../../config/strands.js';
import { SITTING_LENGTH } from '../../engine/diagnosticEngine.js';
import { speechSupported, speakChunks, stopSpeaking, chunksForItem } from '../../lib/speech.js';
import { MarigoldMessage } from '../Mentor/MarigoldMessage.jsx';
import { beforeSittingLine } from '../../lib/marigold.js';

/**
 * WHAT THIS SCREEN DELIBERATELY DOES NOT SHOW HER:
 *
 *  - her level, at any point during the test
 *  - whether the question got harder or easier
 *  - a running score
 *
 * All three are visible to the parent afterwards. None of them belong in front
 * of a child mid-assessment. A visible level turns every question into a
 * verdict, and a child who can see the difficulty moving learns within about
 * four questions that a wrong answer makes the next one easier — at which
 * point the diagnostic is measuring her strategy instead of her knowledge.
 *
 * What she DOES see: the question, whether she got it right, and WHY if she
 * did not. That is the part that helps.
 */

function ProgressDots({ answered }) {
  return (
    <div className="flex items-center gap-1.5" aria-label={`${answered} of ${SITTING_LENGTH} questions this sitting`}>
      {Array.from({ length: SITTING_LENGTH }).map((_, i) => (
        <span
          key={i}
          className={`h-2.5 w-2.5 rounded-full ${i < answered ? 'bg-blush-500' : 'bg-cream-300'}`}
        />
      ))}
    </div>
  );
}

function Intro({ onStart, started, progress, name, answered }) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      {/* Marigold appears on the way IN and on the way out, never on a question.
          A mentor watching over a child's shoulder mid-assessment adds pressure
          to the one activity that has to feel safe. */}
      <div className="mb-4">
        <MarigoldMessage text={beforeSittingLine({ answered, progress })} size="sm" />
      </div>
      <div className="panel px-6 py-8">
        <p className="text-4xl">🌾</p>
        <h1 className="mt-3 font-display text-2xl text-ink-900">
          {started ? 'Welcome back to the Check-In' : 'The Check-In'}
        </h1>

        <div className="mt-5 space-y-3 text-sm text-ink-700">
          <p>
            <span className="font-700 text-ink-900">This is not a test you can fail.</span> It is
            trying to find out what you already know, so nobody wastes your time teaching you things
            you can already do.
          </p>
          <p>
            The questions will not all be the right level at first — that is on purpose. It has to
            guess before it can know. Some will feel too easy and some will feel too hard. Both of
            those are the check-in working properly.
          </p>
          <p>
            About <span className="font-700">{SITTING_LENGTH} questions</span> at a time, roughly
            fifteen minutes. It saves after <em>every single question</em>, so you can stop any time
            and pick up exactly where you left off.
          </p>
          <p className="rounded-xl bg-cream-200 px-4 py-3">
            If you do not know an answer, pick the one you think is most likely and keep going.
            Guessing is fine. Stopping to worry is the only thing that makes it take longer.
          </p>
        </div>

        {started && (
          <p className="mt-5 text-sm text-ink-500">
            So far: {progress.settledCount} of {progress.strandCount} strands measured,{' '}
            {progress.askedCount} questions answered.
          </p>
        )}

        <button
          type="button"
          onClick={onStart}
          className="mt-6 w-full rounded-full bg-blush-500 px-6 py-3.5 font-700 text-white shadow-lift hover:bg-blush-700"
        >
          {started ? 'Keep going' : `Start, ${name || 'let’s go'}`}
        </button>
      </div>
    </div>
  );
}

function Complete({ onOpenPlan, onExit }) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-14">
      <div className="panel px-6 py-10 text-center">
        <p className="text-5xl">🌼</p>
        <h1 className="mt-3 font-display text-2xl text-ink-900">Every strand is measured</h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-ink-700">
          You finished the whole Check-In. Your plan is ready — it names the exact Khan Academy
          course and unit to open first for each subject.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={onOpenPlan}
            className="rounded-full bg-blush-500 px-6 py-3 font-700 text-white hover:bg-blush-700"
          >
            Open my plan
          </button>
          <button
            type="button"
            onClick={onExit}
            className="rounded-full border border-cream-300 bg-white px-6 py-3 font-700 text-ink-700"
          >
            Back to the greenhouse
          </button>
        </div>
      </div>
    </div>
  );
}

function SittingDone({ answered, onContinue, onStop, progress }) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-14">
      <div className="panel px-6 py-10 text-center">
        <p className="text-5xl">🌷</p>
        <h1 className="mt-3 font-display text-2xl text-ink-900">That is {answered} questions</h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-ink-700">
          Good stopping point. {progress.settledCount} of {progress.strandCount} strands are finished
          now. Everything is saved — you can carry on today or come back tomorrow, it makes no
          difference.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={onStop}
            className="rounded-full bg-blush-500 px-6 py-3 font-700 text-white hover:bg-blush-700"
          >
            Stop here for today
          </button>
          <button
            type="button"
            onClick={onContinue}
            className="rounded-full border border-cream-300 bg-white px-6 py-3 font-700 text-ink-700 hover:border-lavender-500"
          >
            Keep going a bit longer
          </button>
        </div>
      </div>
    </div>
  );
}

export function DiagnosticView({ onNavigate }) {
  const name = useAppStore((s) => s.learnerName);
  const sittingId = useAppStore((s) => s.sittingId);
  const sittingAnswered = useAppStore((s) => s.sittingAnswered);
  const currentItem = useAppStore((s) => s.currentItem);
  const currentStrandId = useAppStore((s) => s.currentStrandId);
  const beginSitting = useAppStore((s) => s.beginSitting);
  const endSittingAction = useAppStore((s) => s.endSitting);
  const submitAnswer = useAppStore((s) => s.submitAnswer);
  const loadNextQuestion = useAppStore((s) => s.loadNextQuestion);
  const progress = useAppStore((s) => s.progress());
  const answeredTotal = useAppStore((s) => s.totalAnswered());

  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);
  const [extendedSitting, setExtendedSitting] = useState(false);
  const [busy, setBusy] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  /** Whether THIS question was read aloud. Recorded with the answer so the
   *  Grown-Up Corner can say which levels are listening estimates rather than
   *  reading ones. Reset on every new question, never carried forward. */
  const [readAloudUsed, setReadAloudUsed] = useState(false);

  // If she leaves the tab mid-sitting, close the sitting record cleanly rather
  // than leaving an open row that makes "time spent" wrong forever.
  useEffect(() => {
    return () => {
      if (useAppStore.getState().sittingId) useAppStore.getState().endSitting();
      // Leaving the screen mid-sentence must not leave a voice talking over
      // whatever she opens next.
      stopSpeaking();
    };
  }, []);

  if (progress.complete && !currentItem) {
    return <Complete onOpenPlan={() => onNavigate('plan')} onExit={() => onNavigate('home')} />;
  }

  if (!sittingId) {
    return (
      <Intro
        name={name}
        answered={answeredTotal}
        started={answeredTotal > 0}
        progress={progress}
        onStart={() => {
          setExtendedSitting(false);
          beginSitting();
        }}
      />
    );
  }

  const sittingTarget = extendedSitting ? SITTING_LENGTH * 2 : SITTING_LENGTH;
  if (sittingAnswered >= sittingTarget && !result) {
    return (
      <SittingDone
        answered={sittingAnswered}
        progress={progress}
        onContinue={() => setExtendedSitting(true)}
        onStop={async () => {
          await endSittingAction();
          onNavigate('levels');
        }}
      />
    );
  }

  if (!currentItem) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center text-ink-500">
        <p>Finding the next question…</p>
      </div>
    );
  }

  const strand = getStrand(currentStrandId);

  async function handleSubmit() {
    if (selected == null || busy) return;
    setBusy(true);
    stopSpeaking();
    setSpeaking(false);
    const r = await submitAnswer(selected, readAloudUsed);
    setResult(r);
    setBusy(false);
  }

  function handleNext() {
    stopSpeaking();
    setSpeaking(false);
    setReadAloudUsed(false);
    setResult(null);
    setSelected(null);
    loadNextQuestion();
  }

  function handleReadAloud() {
    if (speaking) {
      stopSpeaking();
      setSpeaking(false);
      return;
    }
    const started = speakChunks(chunksForItem(currentItem), { onEnd: () => setSpeaking(false) });
    if (started) {
      setSpeaking(true);
      setReadAloudUsed(true);
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="label-caps">{strand?.cardLabel}</p>
          <p className="text-xs text-ink-500">Question {sittingAnswered + (result ? 0 : 1)} of this sitting</p>
        </div>
        <ProgressDots answered={sittingAnswered} />
      </div>

      <div className="mt-4 panel-white px-6 py-6">
        {speechSupported() && (
          <button
            type="button"
            onClick={handleReadAloud}
            className={`mb-4 rounded-full border-2 px-5 py-2 text-sm font-700 ${
              speaking
                ? 'border-lavender-500 bg-lavender-300/40 text-lavender-700'
                : 'border-cream-300 bg-white text-ink-700 hover:border-lavender-500'
            }`}
          >
            {speaking ? '⏹ Stop reading' : '🔊 Read it to me'}
          </button>
        )}

        {currentItem.passage && (
          <div className="mb-5 rounded-xl border-l-4 border-lavender-300 bg-cream-100 px-4 py-3 text-[0.95rem] leading-relaxed text-ink-900">
            {currentItem.passage}
          </div>
        )}
        <p className="font-display text-lg leading-snug text-ink-900">{currentItem.prompt}</p>

        <div className="mt-5 space-y-2.5">
          {currentItem.choices.map((choice, i) => {
            const isChosen = selected === i;
            const isAnswer = result && i === currentItem.answer;
            const isWrongPick = result && i === selected && !result.correct;
            let cls = 'border-cream-300 bg-white hover:border-lavender-500';
            if (result) {
              if (isAnswer) cls = 'border-sage-500 bg-sage-300/40';
              else if (isWrongPick) cls = 'border-clay-500 bg-clay-500/10';
              else cls = 'border-cream-300 bg-white opacity-60';
            } else if (isChosen) {
              cls = 'border-lavender-500 bg-lavender-300/30';
            }
            return (
              <button
                key={i}
                type="button"
                disabled={!!result}
                onClick={() => setSelected(i)}
                className={`flex w-full items-start gap-3 rounded-xl border-2 px-4 py-3 text-left text-[0.95rem] ${cls}`}
              >
                <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-cream-200 text-xs font-700 text-ink-700">
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="text-ink-900">{choice}</span>
              </button>
            );
          })}
        </div>

        {result && (
          <div
            className={`mt-5 rounded-xl px-4 py-4 ${
              result.correct ? 'bg-sage-300/40' : 'bg-lavender-300/30'
            }`}
          >
            <p className="font-display text-base text-ink-900">
              {result.correct ? '🌿 Yes — that is it.' : '🌱 Not this time.'}
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-900">{result.feedback}</p>
            {!result.correct && result.explanation && result.explanation !== result.feedback && (
              <p className="mt-2 text-sm leading-relaxed text-ink-700">{result.explanation}</p>
            )}
          </div>
        )}

        <div className="mt-6 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={async () => {
              await endSittingAction();
              onNavigate('home');
            }}
            className="text-sm text-ink-500 underline-offset-2 hover:underline"
          >
            Stop for now
          </button>
          {result ? (
            <button
              type="button"
              onClick={handleNext}
              className="rounded-full bg-blush-500 px-7 py-3 font-700 text-white hover:bg-blush-700"
            >
              Next question
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={selected == null || busy}
              className="rounded-full bg-blush-500 px-7 py-3 font-700 text-white disabled:opacity-40 hover:bg-blush-700"
            >
              Check my answer
            </button>
          )}
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-ink-500">
        Saved automatically. You will never lose a question you have answered.
        {speechSupported() && ' Using “Read it to me” is always allowed — it is there to be used.'}
      </p>
    </div>
  );
}
