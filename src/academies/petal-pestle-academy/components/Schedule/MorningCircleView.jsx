import { useEffect, useState } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import { MarigoldMessage } from '../Mentor/MarigoldMessage.jsx';
import { NotesPanel } from '../Messages/NotesPanel.jsx';
import { WarmUpCard } from '../Assess/WarmUpCard.jsx';
import { orderedBlocks, toClock } from '../../config/schedule.js';
import { blockLabelOnDay, blockIconOnDay } from '../../lib/rotatingBlock.js';
import { dayKeyOf } from '../../lib/reviewQueue.js';
import {
  CIRCLE_BLOCK_ID,
  warmUpSatisfied,
  circleCanFinish,
  circleLine,
  shouldGreet
} from '../../lib/morningCircle.js';
import { sayOncePerDay, saidOnRecord } from '../../lib/marigoldVoice.js';

// ---------------------------------------------------------------------------
// MORNING CIRCLE — the first fifteen minutes of her day, as something to DO.
//
// Gigi, Sept 23 2026: "There is a morning circle that she hasn't been doing."
// It had been ticked done on 28 of 28 school days. It was a note and a tick box,
// so the tick was all there was. The rules and the reasons are in
// lib/morningCircle.js; this is the screen.
//
// In order, the way a real morning circle runs:
//   1. Dr. Marigold says good morning (out loud, once a day).
//   2. Notes from Gigi and Mom. A real person outranks the software.
//   3. A look at today.
//   4. The warm-up. Moved here from Home, where she never went.
//   5. Water something.
//   6. Finish. THIS is what ticks Morning Circle on Today. The tick on Today no
//      longer does it on its own.
// ---------------------------------------------------------------------------

export function MorningCircleView({ onNavigate }) {
  const name = useAppStore((s) => s.learnerName);
  const blocks = useAppStore((s) => s.scheduleBlocks);
  const toggleBlock = useAppStore((s) => s.toggleScheduleBlock);
  const lastWarmUpDay = useAppStore((s) => s.lastWarmUpDay);
  const lessonReads = useAppStore((s) => s.lessonReads);
  // Subscribed so the warm-up count re-reads when her boxes move.
  useAppStore((s) => s.reviewItems);
  const lessonsRead = Object.keys(lessonReads || {});

  const day = dayKeyOf();
  const done = useAppStore((s) => s.scheduleDays[day]?.done || {});
  const circleDone = !!done[CIRCLE_BLOCK_ID];

  const [watered, setWatered] = useState(false);
  const [finishedNow, setFinishedNow] = useState(false);

  const availableCount = useAppStore.getState().warmUpToday().length;
  const warmUpDone = warmUpSatisfied({ lastWarmUpDay, todayKey: day, availableCount });
  const canFinish = circleCanFinish({ warmUpDone, watered });

  const now = new Date();
  const ordered = orderedBlocks(blocks);
  const circleBlock = ordered.find((b) => b.id === CIRCLE_BLOCK_ID);
  const nextBlock = circleBlock
    ? ordered.find((b) => b.startMin >= circleBlock.endMin && b.kind !== 'break')
    : null;
  const nextLabel = nextBlock ? blockLabelOnDay(nextBlock, now, undefined, lessonsRead) : '';

  const greeting = circleLine('greeting', { name, hour: now.getHours() });
  const finished = circleLine('finished', { name, nextLabel });

  useEffect(() => {
    if (shouldGreet({ circleDone, saidOn: saidOnRecord(), todayKey: day })) {
      sayOncePerDay('greeting', greeting.text, day);
    }
    // Once, when the screen opens. Not on every re-render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function finish() {
    if (!canFinish) return;
    if (!circleDone) await toggleBlock(day, CIRCLE_BLOCK_ID);
    setFinishedNow(true);
    sayOncePerDay('finished', finished.text, day);
    if (typeof window !== 'undefined') window.scrollTo(0, 0);
  }

  if (circleDone || finishedNow) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-8">
        <p className="label-caps">🌅 Morning Circle</p>
        <h1 className="mt-1 font-display text-3xl text-ink-900">Finished for today</h1>
        <div className="mt-5">
          <MarigoldMessage text={finished.text} tone="done" />
        </div>
        <button
          type="button"
          onClick={() => onNavigate?.('today')}
          className="mt-6 w-full rounded-full bg-sage-700 px-5 py-3 text-base font-700 text-white hover:bg-sage-500"
        >
          Back to my day →
        </button>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <header>
        <p className="label-caps">🌅 Morning Circle · about 15 minutes</p>
        <h1 className="mt-1 font-display text-3xl text-ink-900">
          {name ? `Good morning, ${name}` : 'Good morning'}
        </h1>
      </header>

      {/* 1 — Dr. Marigold */}
      <div className="mt-5">
        <MarigoldMessage text={greeting.text} tone="start" />
      </div>

      {/* 2 — Notes. The panel draws nothing when there are none. */}
      <section className="mt-6">
        <p className="label-caps text-ink-500">1 · Notes from Gigi and Mom</p>
        <div className="mt-2">
          <NotesPanel />
        </div>
      </section>

      {/* 3 — Today */}
      <section className="mt-6">
        <p className="label-caps text-ink-500">2 · Your day</p>
        <ul className="mt-2 space-y-1 rounded-petal border border-cream-300 bg-white px-4 py-3">
          {ordered
            .filter((b) => b.id !== CIRCLE_BLOCK_ID)
            .map((b) => (
              <li key={b.id} className="flex items-baseline gap-3 text-sm text-ink-900">
                <span className="tnum w-16 shrink-0 text-xs text-ink-500">{toClock(b.startMin)}</span>
                <span>
                  {blockIconOnDay(b, now, lessonsRead)} {blockLabelOnDay(b, now, undefined, lessonsRead)}
                </span>
              </li>
            ))}
        </ul>
      </section>

      {/* 4 — The warm-up */}
      <section className="mt-6">
        <p className="label-caps text-ink-500">3 · Warm-up</p>
        <div className="mt-2">
          {warmUpDone ? (
            <div className="rounded-petal border-2 border-sage-500/40 bg-sage-300/15 px-5 py-4">
              <p className="font-display text-base text-ink-900">✓ Warm-up done for today</p>
              <p className="mt-1 text-xs text-ink-700">
                Pulling an answer back out of your memory is what makes it stay.
              </p>
            </div>
          ) : (
            <WarmUpCard />
          )}
        </div>
      </section>

      {/* 5 — Water something */}
      <section className="mt-6">
        <p className="label-caps text-ink-500">4 · Water something</p>
        <button
          type="button"
          onClick={() => setWatered((w) => !w)}
          aria-pressed={watered}
          className={`mt-2 flex w-full items-center gap-3 rounded-petal border-2 px-4 py-3 text-left ${
            watered ? 'border-sage-500 bg-sage-300/25' : 'border-cream-300 bg-white hover:border-sage-500'
          }`}
        >
          <span
            className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 text-xs ${
              watered ? 'border-sage-700 bg-sage-700 text-white' : 'border-cream-300 text-transparent'
            }`}
          >
            ✓
          </span>
          <span className="text-sm text-ink-900">
            💧 I checked my plants and watered the ones with dry soil.
          </span>
        </button>
      </section>

      {/* 6 — Finish */}
      <button
        type="button"
        onClick={finish}
        disabled={!canFinish}
        className="mt-7 w-full rounded-full bg-blush-500 px-5 py-3 text-base font-700 text-white hover:bg-blush-700 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Finish Morning Circle
      </button>
      {!canFinish && (
        <p className="mt-2 text-center text-xs text-ink-500">
          {!warmUpDone && !watered
            ? 'Do your warm-up and water your plants, then this button opens.'
            : !warmUpDone
              ? 'Finish your warm-up, then this button opens.'
              : 'Water your plants, then this button opens.'}
        </p>
      )}
    </main>
  );
}

export default MorningCircleView;
