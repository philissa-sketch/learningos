import { useEffect, useState } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import { bankItemById } from '../../data/assessments/appBank.js'; // v3.25 — every course
import { speechSupported, speakChunks, stopSpeaking, chunksForItem } from '../../lib/speech.js';
import { WARM_UP } from '../../config/assessment.js';
import { presentQuestion } from '../../lib/assessmentEngine.js';
import { dayKeyOf } from '../../lib/reviewQueue.js';

// ---------------------------------------------------------------------------
// THE MORNING WARM-UP — three questions, about two minutes.
//
// This small card is the single most valuable thing in the whole assessment
// build, and it does not look like it. It is worth writing down why, because it
// looks trivially cuttable.
//
// A unit test asks about a unit once. This asks about EVERYTHING, a little,
// every day, on an expanding schedule — 1 day, 3, 7, 16, 35, 70. That is the
// difference between a child who knew the mint family in September and one who
// still knows it in May.
//
// ---- WHY IT IS THREE QUESTIONS AND NOT TEN ----
//
// Because it has to survive a real Tuesday. A three-question warm-up she does
// every single day beats a ten-question one she abandons in week three, and
// abandoned spaced review has a retention benefit of exactly zero. Consistency
// over volume — the same rule as the rest of her day.
//
// ---- WHY IT IS NOT GRADED ----
//
// Nothing here is recorded as a score. It moves the review boxes and pays a few
// Petals for showing up. The moment a warm-up counts for something it becomes a
// small test every morning, which is how a child learns to dread mornings.
//
// ---- WHY TWO TRIES ----
//
// A near miss followed by a correct second attempt is itself a retrieval, and a
// good one — she had to go and find the answer rather than being handed it. The
// box still moves as though she missed it, because she did.
// ---------------------------------------------------------------------------

export function WarmUpCard() {
  const warmUpToday = useAppStore((s) => s.warmUpToday);
  const recordWarmUp = useAppStore((s) => s.recordWarmUp);
  const lastWarmUpDay = useAppStore((s) => s.lastWarmUpDay);
  const reviewItems = useAppStore((s) => s.reviewItems);
  const lessonReads = useAppStore((s) => s.lessonReads);

  const [ids, setIds] = useState(null);
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState(null);
  const [tries, setTries] = useState(0);
  // firstTry is what the boxes are told about. A second-attempt correct is
  // still a miss as far as spacing is concerned.
  const [results, setResults] = useState([]);
  const [speaking, setSpeaking] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => () => stopSpeaking(), []);

  // Hooks are all above this line on purpose — an early return before a hook is
  // the one React mistake that crashes a screen only in the state nobody tested.
  if (lastWarmUpDay && done) {
    return (
      <div className="rounded-petal border-2 border-sage-500/40 bg-sage-300/15 px-5 py-4">
        <p className="font-display text-base text-ink-900">🌱 Warm-up done for today</p>
        <p className="mt-1 text-xs text-ink-700">
          Same three plants tomorrow, or three different ones. Little and often is the whole trick.
        </p>
      </div>
    );
  }

  const available = ids ?? warmUpToday();
  if (!available.length) {
    // Nothing to warm up on yet, or already done today. Either way, no card.
    if (!Object.keys(lessonReads || {}).length) return null;
    return null;
  }

  // Choices dealt fresh each day. A question she meets six times across four
  // months must not become answerable from the shape of the screen — that would
  // hollow out the entire review schedule while looking like she knew it.
  const q = presentQuestion(bankItemById(available[i]), dayKeyOf());
  if (!q) return null;

  function readAloud() {
    if (speaking) {
      stopSpeaking();
      setSpeaking(false);
      return;
    }
    if (speakChunks(chunksForItem(q), { onEnd: () => setSpeaking(false) })) setSpeaking(true);
  }

  function answer(choice) {
    if (picked !== null && picked === q.answer) return;
    const right = choice === q.answer;
    setPicked(choice);
    const attempt = tries + 1;
    setTries(attempt);

    // Wrong on the first go with a try left: let her have another look.
    if (!right && attempt < WARM_UP.attempts) return;

    setResults((r) => [...r, { questionId: q.id, correct: right && attempt === 1 }]);
  }

  async function next() {
    stopSpeaking();
    setSpeaking(false);
    if (i + 1 < available.length) {
      if (!ids) setIds(available);
      setI(i + 1);
      setPicked(null);
      setTries(0);
      return;
    }
    await recordWarmUp(results);
    setDone(true);
  }

  const settled = picked !== null && (picked === q.answer || tries >= WARM_UP.attempts);
  const canRetry = picked !== null && picked !== q.answer && tries < WARM_UP.attempts;

  return (
    <div className="rounded-petal border-2 border-lavender-300 bg-white px-5 py-4 shadow-petal">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="label-caps">Warm-up · {i + 1} of {available.length}</p>
        <p className="text-[0.7rem] text-ink-500">Not a test. Nothing is written down.</p>
      </div>

      {speechSupported() && (
        <button
          type="button"
          onClick={readAloud}
          className={`mt-3 rounded-full border-2 px-4 py-1.5 text-xs font-700 ${
            speaking
              ? 'border-lavender-500 bg-lavender-300/40 text-lavender-700'
              : 'border-cream-300 bg-white text-ink-700 hover:border-lavender-500'
          }`}
        >
          {speaking ? '⏹ Stop' : '🔊 Read it to me'}
        </button>
      )}

      <p className="mt-3 font-display text-base leading-snug text-ink-900">{q.prompt}</p>

      <div className="mt-3 space-y-2">
        {q.choices.map((choice, ci) => {
          const isAnswer = settled && ci === q.answer;
          const isWrongPick = picked === ci && ci !== q.answer;
          let cls = 'border-cream-300 bg-white hover:border-lavender-500';
          if (isAnswer) cls = 'border-sage-500 bg-sage-300/40';
          else if (isWrongPick) cls = 'border-clay-500 bg-clay-500/10';
          else if (settled) cls = 'border-cream-300 bg-white opacity-60';
          return (
            <button
              key={ci}
              type="button"
              disabled={settled}
              onClick={() => answer(ci)}
              className={`flex w-full items-start gap-2.5 rounded-xl border-2 px-3.5 py-2.5 text-left text-sm ${cls}`}
            >
              <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-cream-200 text-[0.65rem] font-700 text-ink-700">
                {String.fromCharCode(65 + ci)}
              </span>
              <span className="text-ink-900">{choice}</span>
            </button>
          );
        })}
      </div>

      {canRetry && (
        <p className="mt-3 rounded-xl bg-gold-300/25 px-3.5 py-2.5 text-sm text-ink-900">
          {q.feedback[picked] || 'Not that one.'} Have another look — one more go.
        </p>
      )}

      {settled && (
        <>
          <p className="mt-3 rounded-xl bg-cream-100 px-3.5 py-2.5 text-sm text-ink-900">
            <span className="font-700">{q.choices[q.answer]}</span> — {q.why}
          </p>
          <button
            type="button"
            onClick={next}
            className="mt-3 w-full rounded-full bg-blush-500 px-5 py-2 text-sm font-700 text-white hover:bg-blush-700"
          >
            {i + 1 < available.length ? 'Next →' : 'Done — start my day'}
          </button>
        </>
      )}
    </div>
  );
}
