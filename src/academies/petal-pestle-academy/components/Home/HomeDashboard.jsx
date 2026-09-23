import { useState } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import { getNextRank, progressToNext } from '../../lib/ranks.js';
import { buildActionPlan, planHeadline } from '../../lib/actionPlan.js';
import { SITTING_LENGTH } from '../../engine/diagnosticEngine.js';
import { ALL_PETAL_ITEMS } from '../../data/rewards/petalCatalog.js';
import { MarigoldMessage } from '../Mentor/MarigoldMessage.jsx';
import { GoalLine } from './GoalLine.jsx';
import { NotesPanel } from '../Messages/NotesPanel.jsx';
import { WarmUpCard } from '../Assess/WarmUpCard.jsx';
import { orderedBlocks, toClock } from '../../config/schedule.js';
import { greetingFor, dailyLine } from '../../lib/marigold.js';

function Meter({ value, label }) {
  return (
    <div>
      <div className="h-3 w-full overflow-hidden rounded-full bg-cream-200">
        <div
          className="h-full rounded-full bg-gradient-to-r from-blush-300 via-blush-500 to-lavender-500 transition-all duration-500"
          style={{ width: `${Math.round(value * 100)}%` }}
        />
      </div>
      {label && <p className="mt-1.5 text-xs text-ink-500">{label}</p>}
    </div>
  );
}

function NameGate({ onSave }) {
  const [value, setValue] = useState('');
  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <div className="panel px-6 py-10 text-center">
        <p className="text-5xl">🌸</p>
        <h1 className="mt-4 font-display text-2xl text-ink-900">Petal &amp; Pestle Academy</h1>
        <p className="mt-3 text-sm text-ink-700">
          Before we start — what should this greenhouse call you?
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (value.trim()) onSave(value.trim());
          }}
          className="mt-6 flex flex-col gap-3"
        >
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Your first name"
            maxLength={24}
            className="rounded-full border border-cream-300 bg-white px-5 py-3 text-center text-base outline-none focus:border-lavender-500"
          />
          <button
            type="submit"
            disabled={!value.trim()}
            className="rounded-full bg-blush-500 px-6 py-3 font-700 text-white disabled:opacity-40 hover:bg-blush-700"
          >
            Open the greenhouse
          </button>
        </form>
      </div>
    </div>
  );
}

/**
 * The Market card. Deliberately shows what she can afford RIGHT NOW rather than
 * a bare balance — a number on its own means nothing to a nine-year-old, and
 * "you can afford 4 things" is the sentence that makes her open the shop.
 */
function MarketCard({ onNavigate }) {
  const petals = useAppStore((s) => s.petalBalance());
  const seeds = useAppStore((s) => s.seedBalance());
  const unlocked = useAppStore((s) => s.unlockedItems);
  const pending = useAppStore((s) => s.pendingRequests());

  const canAfford = ALL_PETAL_ITEMS.filter(
    (i) => !unlocked.includes(i.id) && i.cost <= petals
  ).length;

  return (
    <section className="mt-6 panel px-5 py-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="label-caps">The Market</p>
          <p className="mt-1 font-display text-xl text-ink-900">
            🌸 {petals.toLocaleString()} · 🌟 {seeds.toLocaleString()}
          </p>
          <p className="mt-1 text-sm text-ink-700">
            {canAfford > 0
              ? `${canAfford} thing${canAfford === 1 ? '' : 's'} in the Petal Market you can afford right now.`
              : 'Answer a few more questions and the Petal Market opens up.'}
            {pending.length > 0 &&
              ` ${pending.length} reward${pending.length === 1 ? '' : 's'} waiting on a grown-up.`}
          </p>
        </div>
        <button
          type="button"
          onClick={() => onNavigate('market')}
          className="rounded-full bg-blush-500 px-6 py-2.5 font-700 text-white hover:bg-blush-700"
        >
          Go shopping
        </button>
      </div>
      {unlocked.length > 0 && (
        <p className="mt-3 text-2xl">
          {ALL_PETAL_ITEMS.filter((i) => unlocked.includes(i.id))
            .slice(-10)
            .map((i) => i.icon)
            .join(' ')}
        </p>
      )}
    </section>
  );
}


/**
 * WHAT IS HAPPENING RIGHT NOW.
 *
 * Home answers "what should I be doing?" before it answers anything else. The
 * card shows the block she is in, or the next one if she is between blocks, and
 * nothing more — the full day lives on its own tab.
 *
 * No "you are behind" and no overdue count, here or there. The day is a plan,
 * not a debt.
 */
function TodayCard({ onNavigate }) {
  // EVERY HOOK BEFORE THE FIRST RETURN. The first draft of this component read
  // the blocks, bailed out with `return null` when the day was empty, and THEN
  // called useAppStore again for the day's ticks. React counts hook calls per
  // render and matches them up by order, so an empty schedule would have
  // rendered one hook and a filled one three — and the component would crash
  // the moment a grown-up added the first block. Nothing in the source checks
  // can see that; it only shows up when someone edits the timetable.
  const d = new Date();
  const dayKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
    d.getDate()
  ).padStart(2, '0')}`;
  const blocks = useAppStore((s) => s.scheduleBlocks);
  const done = useAppStore((s) => s.scheduleDays[dayKey]?.done || {});

  const ordered = orderedBlocks(blocks);
  if (ordered.length === 0) return null;

  const now = d.getHours() * 60 + d.getMinutes();
  const current = ordered.find((b) => now >= b.startMin && now < b.endMin) || null;
  const next = ordered.find((b) => b.startMin > now) || null;
  const doneCount = ordered.filter((b) => done[b.id]).length;

  return (
    <section className="mt-6 panel px-5 py-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="label-caps">Right now</p>
          <p className="mt-1 font-display text-xl text-ink-900">
            {current ? (
              <>
                {current.icon} {current.label}
              </>
            ) : next ? (
              <>
                Next: {next.icon} {next.label} at{' '}
                <span className="tnum">{toClock(next.startMin)}</span>
              </>
            ) : (
              <>School is done for today 🌙</>
            )}
          </p>
          <p className="mt-1 text-xs text-ink-500">
            <span className="tnum">{doneCount}</span> of{' '}
            <span className="tnum">{ordered.length}</span> blocks ticked off
          </p>
        </div>
        <button
          type="button"
          onClick={() => onNavigate('today')}
          className="rounded-full bg-gold-700 px-5 py-2.5 text-sm font-700 text-white hover:bg-gold-500"
        >
          🔔 See the whole day
        </button>
      </div>
    </section>
  );
}

export function HomeDashboard({ onNavigate }) {
  const name = useAppStore((s) => s.learnerName);
  const setLearnerName = useAppStore((s) => s.setLearnerName);
  const strands = useAppStore((s) => s.strands);
  const streak = useAppStore((s) => s.streak);
  const rank = useAppStore((s) => s.rank());
  const progress = useAppStore((s) => s.progress());
  const answered = useAppStore((s) => s.totalAnswered());
  // v3.92 — her grades decide how far along her lane she is. Read ABOVE the
  // NameGate early return, because check-hooks asserts every hook runs before
  // every one of them.
  const khanGrades = useAppStore((s) => s.khanGrades);

  if (!name) return <NameGate onSave={setLearnerName} />;

  const next = getNextRank(rank.tier);
  const toNext = progressToNext(answered, progress.settledCount, rank);
  const plan = buildActionPlan(strands, khanGrades);
  const started = answered > 0;
  const greeting = greetingFor({ progress, answered, streak, name });
  const daily = dailyLine();

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="label-caps">Petal &amp; Pestle Academy</p>
          <h1 className="mt-1 font-display text-3xl text-ink-900">
            Hello, {name}
          </h1>
        </div>
        {streak > 0 && (
          <div className="panel-white px-4 py-2 text-center">
            <p className="font-display text-2xl leading-none text-blush-700">{streak}</p>
            <p className="text-[0.65rem] uppercase tracking-widest text-ink-500">
              day{streak === 1 ? '' : 's'} in a row
            </p>
          </div>
        )}
      </div>

      {/* Notes from Gigi and Mom sit ABOVE Dr. Marigold, deliberately.
          A note from a real person who knows her outranks anything the software
          has to say, every single time. The panel renders nothing at all when
          there are no notes, so it never leaves an empty box on the screen. */}
      <div className="mt-5">
        <NotesPanel />
      </div>

      {/* The morning warm-up. Three questions, about two minutes, drawn from
          whatever her spaced-review boxes say is due today.

          It sits high on the screen because the whole value of spaced review is
          that it actually happens. Buried three scrolls down it becomes an
          optional extra, and an optional extra is one she does on Monday and
          then never again. The card renders nothing at all once it is done for
          the day, or before she has read her first lesson. */}
      <div className="mt-5">
        <WarmUpCard />
      </div>

      {/* Dr. Marigold, once, at the top. She says ONE thing and it is always
          about what to do next — never about how clever anybody is. */}
      <div className="mt-5">
        <MarigoldMessage
          text={greeting.text}
          tone={greeting.tone}
          quote={started ? daily : null}
        />
      </div>

      {/* ---- The one card that matters most on this screen ---- */}
      <section className="mt-6 panel overflow-hidden">
        <div className="bg-gradient-to-br from-lavender-300/50 to-blush-300/40 px-6 py-7">
          <p className="label-caps">
            {progress.complete ? 'Diagnostic complete' : started ? 'Pick up where you left off' : 'Start here'}
          </p>
          <h2 className="mt-2 font-display text-2xl text-ink-900">
            {progress.complete
              ? 'Every strand is measured'
              : started
                ? `${progress.settledCount} of ${progress.strandCount} strands finished`
                : 'The Check-In'}
          </h2>
          <p className="mt-2 max-w-xl text-sm text-ink-700">
            {progress.complete
              ? 'Your plan is ready. Open My Plan to see exactly where to start on Khan Academy.'
              : started
                ? `About ${SITTING_LENGTH} questions at a time. It saves after every single one, so you can stop whenever you like.`
                : `This is not a test you can fail. It asks questions until it works out what you already know — about ${SITTING_LENGTH} at a time, and it saves as you go.`}
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => onNavigate(progress.complete ? 'plan' : 'diagnostic')}
              className="rounded-full bg-blush-500 px-6 py-3 font-700 text-white shadow-lift hover:bg-blush-700"
            >
              {progress.complete ? 'Open my plan' : started ? 'Keep going' : 'Begin the Check-In'}
            </button>
            {started && (
              <button
                type="button"
                onClick={() => onNavigate('levels')}
                className="rounded-full border border-cream-300 bg-white px-6 py-3 font-700 text-ink-700 hover:border-lavender-500"
              >
                See my garden
              </button>
            )}
          </div>
        </div>
        {started && (
          <div className="border-t border-cream-300 px-6 py-4">
            <Meter
              value={progress.fraction}
              label={`${progress.settledCount} of ${progress.strandCount} strands measured · ${progress.askedCount} questions answered`}
            />
          </div>
        )}
      </section>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {/* ---- Rank ---- */}
        <section className="panel px-5 py-5">
          <p className="label-caps">Where you are</p>
          <p className="mt-2 font-display text-xl text-ink-900">
            {rank.plant} {rank.name}
          </p>
          <p className="mt-1 text-sm text-ink-700">{rank.blurb}</p>
          <div className="mt-4">
            <Meter
              value={toNext}
              label={next ? `Next: ${next.plant} ${next.name}` : 'You have reached the top of the ladder.'}
            />
          </div>
          <p className="mt-3 rounded-xl bg-cream-200 px-3 py-2 text-[0.7rem] leading-relaxed text-ink-700">
            These ranks are for showing up, not for scoring well. Everyone who finishes the Check-In
            reaches the top — whatever it finds.
          </p>
        </section>

        {/* ---- What to work on ---- */}
        <section className="panel px-5 py-5">
          <p className="label-caps">What to work on</p>
          <p className="mt-2 text-sm text-ink-900">{planHeadline(plan)}</p>
          {plan.focus.length > 0 && (
            <ul className="mt-3 space-y-2">
              {plan.focus.map((f) => (
                <li key={f.strand.id} className="flex items-start gap-2 text-sm">
                  <span className="text-base leading-none">{f.strand.plant}</span>
                  <span>
                    <span className="font-700 text-ink-900">{f.strand.cardLabel}</span>
                    <span className="block text-xs text-ink-500">
                      {f.khan?.courseLabel} → {f.khan?.unit}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          )}
          <button
            type="button"
            onClick={() => onNavigate('plan')}
            className="mt-4 text-sm font-700 text-lavender-700 underline-offset-2 hover:underline"
          >
            See the whole plan →
          </button>
        </section>
      </div>

      {/* §3.11.6 — one line, on the surface she opens every morning, above
          the day itself. A goal one level away is a database row. */}
      <GoalLine onNavigate={onNavigate} />

      <TodayCard onNavigate={onNavigate} />

      <MarketCard onNavigate={onNavigate} />

      <section className="mt-6 panel px-5 py-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="label-caps">My Greenhouse</p>
            <p className="mt-1 text-sm text-ink-700">
              Your room, your shelf, and you. Everything you buy is placed in here — and the dotted
              outlines show what is still missing.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('greenhouse')}
            className="rounded-full bg-sage-500 px-6 py-2.5 font-700 text-white hover:bg-sage-700"
          >
            🏡 Go inside
          </button>
        </div>
      </section>

      <section className="mt-6 panel px-5 py-5">
        <p className="label-caps">While you are here</p>
        <div className="mt-3 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => onNavigate('herbs')}
            className="rounded-full border border-cream-300 bg-white px-5 py-2.5 text-sm font-700 text-ink-700 hover:border-sage-500"
          >
            📗 Look something up in the Herb Library
          </button>
        </div>
      </section>
    </div>
  );
}
