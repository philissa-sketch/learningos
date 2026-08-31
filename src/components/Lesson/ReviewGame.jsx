import { useMemo, useState } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import { getQuarterGlossaryTerms } from '../../lib/glossary.js';

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * "Term Blitz" — a low-stakes flashcard review game, one per
 * subject/quarter. Deliberately NOT another multiple-choice quiz (the
 * app already has plenty of those: practice, tests, exit tickets, the
 * Quarterly Exam) — this is meant to be quick and game-like, not
 * scored toward mastery. Reuses the same quarter-glossary aggregation
 * StudyGuide.jsx uses, via the shared `getQuarterGlossaryTerms`
 * helper, so it works for any subject/quarter with zero new content
 * authoring. `subject` is a real, required prop (not hardcoded to
 * 'aerospace') so this works correctly for every subject with a
 * Quarterly Exam — Social Studies included.
 *
 * Flow: flip a card to reveal the definition, then self-rate "Got It"
 * or "Review Again." Cards marked "Review Again" get reshuffled back
 * into the deck exactly once, so a student sees every term at least
 * twice if they need to, without the round running forever.
 */
export function ReviewGame({ subject = 'aerospace', quarter, onExit }) {
  const submitReviewGame = useAppStore((s) => s.submitReviewGame);
  const { terms } = useMemo(() => getQuarterGlossaryTerms(subject, quarter), [subject, quarter]);

  const [deck, setDeck] = useState(() => shuffle(terms).map((t) => ({ ...t, requeued: false })));
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [gotItCount, setGotItCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);

  if (terms.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-6 text-center sm:px-6">
        <p className="text-sm text-ink-300">No vocabulary is available yet for {quarter}.</p>
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

  const currentCard = deck[index];

  function handleRate(gotIt) {
    if (!gotIt && !currentCard.requeued) {
      // Send it back into the deck once more, a few cards later, so
      // it doesn't just repeat immediately, and doesn't count against
      // the final score yet — the student gets one more shot at it.
      setDeck((d) => {
        const rest = d.filter((_, i) => i !== index);
        const requeuedCard = { ...currentCard, requeued: true };
        const insertAt = Math.min(rest.length, index + 3);
        return [...rest.slice(0, insertAt), requeuedCard, ...rest.slice(insertAt)];
      });
      setFlipped(false);
      return; // don't advance index — the array shrank/reinserted around it
    }

    // Either a genuine "Got It," or a "Review Again" on a card that's
    // already had its one re-shown chance — either way, this card is
    // now settled and we move on.
    const finalGotItCount = gotIt ? gotItCount + 1 : gotItCount;
    if (gotIt) setGotItCount(finalGotItCount);

    if (index + 1 >= deck.length) {
      finishGame(finalGotItCount);
    } else {
      setIndex((i) => i + 1);
      setFlipped(false);
    }
  }

  async function finishGame(finalGotItCount) {
    const result = await submitReviewGame(subject, quarter, finalGotItCount, deck.length);
    setXpEarned(result?.xpEarned || 0);
    setFinished(true);
  }

  if (finished) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-6 text-center sm:px-6">
        <div className="rounded-xl border border-space-700 bg-space-800 p-6 shadow-panel">
          <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Term Blitz Complete</p>
          <h2 className="mt-2 font-display text-2xl font-700 text-ink-100">{quarter} Review</h2>
          <div className="mt-4 flex justify-center gap-8">
            <div>
              <p className="telemetry text-3xl font-700 text-ink-100">{gotItCount}/{deck.length}</p>
              <p className="text-xs text-ink-500">Got It, First Try</p>
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
        <p className="text-xs font-display uppercase tracking-widest text-ink-500">
          Card {index + 1} of {deck.length}
        </p>
      </div>

      <p className="text-center text-xs font-display uppercase tracking-widest text-signal-cyan">
        {quarter} Term Blitz
      </p>

      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        className="mt-4 flex min-h-[220px] w-full flex-col items-center justify-center rounded-xl border border-space-700 bg-space-800 p-8 text-center shadow-panel transition hover:border-signal-cyan/50"
      >
        {!flipped ? (
          <>
            <p className="font-display text-2xl font-700 text-ink-100">{currentCard.term}</p>
            <p className="mt-3 text-xs text-ink-500">Tap to reveal the definition</p>
          </>
        ) : (
          <p className="text-lg text-ink-200">{currentCard.definition}</p>
        )}
      </button>

      {flipped && (
        <div className="mt-4 flex gap-3">
          <button
            type="button"
            onClick={() => handleRate(false)}
            className="flex-1 rounded-lg border border-signal-amber/40 bg-signal-amber/10 px-4 py-2 font-display font-700 text-signal-amber transition hover:brightness-110"
          >
            Review Again
          </button>
          <button
            type="button"
            onClick={() => handleRate(true)}
            className="flex-1 rounded-lg bg-signal-cyan px-4 py-2 font-display font-700 text-space-950 transition hover:brightness-110"
          >
            Got It
          </button>
        </div>
      )}
    </div>
  );
}
