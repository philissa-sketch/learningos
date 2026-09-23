import { useState } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import { getStrand } from '../../config/strands.js';
import { FEASIBILITY, ASSUMED_YEARLY_GROWTH } from '../../lib/goals.js';
import { END_OF_SUMMER, END_OF_CLASSES, schoolDaysRemaining } from '../../config/calendar.js';
import { dayKeyOf } from '../../lib/reviewQueue.js';

// ---------------------------------------------------------------------------
// GOALS — THE GROWN-UP SIDE. §3.11.
//
// Gigi: "Some of Azianna's skills are in the lower grade but I want her caught
// up to 5th grade by the end of the school year." Then, which changed the
// answer: "What if the goal is before the beginning of the next school year?"
//
// ---- WHAT THIS SCREEN IS FOR ----
//
// §3.11.4: show the required rate beside the observed one, and RENDER THE
// VERDICT BEFORE THE ADULT SAVES. "This is one arithmetic operation and it
// prevents the most demoralizing thing a goal system does: setting a target the
// learner's actual pace never had a chance of reaching, then reporting it as a
// failure."
//
// So the verdict is never behind a click. It is on the row, before the button.
//
// ---- WHAT IT REFUSES TO DO ----
//
// A strand still being measured cannot be given a target, and the row says so
// in words rather than being hidden. Grammar's 2.20 rests on FOUR questions;
// geometry, measurement and writing on THREE each. Geometry moved 2.00 -> 2.70
// the moment easier items existed. A target set from a number like that, and
// reported as missed next July, is not a measurement — it is an accusation.
//
// ---- WHAT IT DOES NOT REFUSE ----
//
// An "Out of reach" goal can still be saved. §3.11.4: "save permitted, warning
// persists on the goal card." The arithmetic is the app's job; deciding what to
// commit a child to is not.
// ---------------------------------------------------------------------------

const VERDICT_TONE = {
  reachable: 'bg-sage-300/50 text-sage-700',
  stretch: 'bg-gold-300/60 text-gold-700',
  unrealistic: 'bg-clay-500/15 text-clay-500'
};

function VerdictPill({ verdict }) {
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-[0.68rem] font-700 ${VERDICT_TONE[verdict]}`}>
      {FEASIBILITY[verdict].label}
    </span>
  );
}

export function GoalsPanel() {
  const proposedGoals = useAppStore((s) => s.proposedGoals);
  const approveGoal = useAppStore((s) => s.approveGoal);
  const reviewGoal = useAppStore((s) => s.reviewGoal);
  const goals = useAppStore((s) => s.goals);
  const goalStatus = useAppStore((s) => s.goalStatus());

  const [target, setTarget] = useState(5);
  const [byDate, setByDate] = useState(END_OF_SUMMER);
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState('');

  const proposals = proposedGoals(target, byDate);
  const already = new Set(goals.filter((g) => g.status === 'active').map((g) => g.strandId));
  const open = proposals.filter((p) => !already.has(p.strandId) && p.status === 'proposed');
  const ready = open.filter((p) => !p.blockedReason);
  const waiting = open.filter((p) => p.blockedReason);
  const daysLeft = schoolDaysRemaining(dayKeyOf(), byDate);

  async function approve(p) {
    setBusy(true);
    await approveGoal(p);
    setBusy(false);
  }

  return (
    <section className="panel px-5 py-5">
      <h2 className="font-display text-lg text-ink-900">Where she is heading</h2>

      <p className="mt-2 text-sm text-ink-700">
        One goal per strand, never one for everything — the same target is within reach in one
        subject and out of reach in another, and a single number hides exactly that.
      </p>

      {/* ---- the two numbers that define the goal ---- */}
      <div className="mt-4 flex flex-wrap items-end gap-4">
        <label className="text-sm text-ink-700">
          <span className="block text-[0.7rem] font-700 uppercase tracking-wide text-ink-500">
            Get to
          </span>
          <select
            value={target}
            onChange={(e) => setTarget(Number(e.target.value))}
            className="mt-1 rounded-xl border-2 border-cream-300 bg-white px-3 py-2 text-sm"
          >
            {[4, 4.5, 5, 5.5, 6].map((n) => (
              <option key={n} value={n}>
                grade {n.toFixed(1)}
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm text-ink-700">
          <span className="block text-[0.7rem] font-700 uppercase tracking-wide text-ink-500">By</span>
          <select
            value={byDate}
            onChange={(e) => setByDate(e.target.value)}
            className="mt-1 rounded-xl border-2 border-cream-300 bg-white px-3 py-2 text-sm"
          >
            <option value={END_OF_CLASSES}>end of classes · May 26</option>
            <option value={END_OF_SUMMER}>start of next school year · Aug 1</option>
          </select>
        </label>

        <p className="text-sm text-ink-700">
          <span className="font-700 tnum">{daysLeft}</span> school days
        </p>
      </div>

      {/* ---- §3.11.4: the assumption, on the screen, not in a comment ---- */}
      <p className="mt-3 rounded-lg border border-cream-300 px-3 py-2 text-[0.7rem] leading-relaxed text-ink-700">
        <span className="font-700">These verdicts rest on an assumption, not a measurement.</span>{' '}
        The check is meant to compare the pace a target needs against the pace she has actually been
        working at. She has three school days and no growth history yet, so a typical year&rsquo;s{' '}
        <span className="tnum">+{ASSUMED_YEARLY_GROWTH.toFixed(1)}</span> grade levels is standing in
        for it. Once she has a second Check-In behind her, these use her own numbers.
      </p>

      {/* ---- what is live ---- */}
      {goalStatus.length > 0 && (
        <div className="mt-5">
          <p className="label-caps">Set and running · {goalStatus.length}</p>
          <div className="mt-2 space-y-2">
            {goalStatus.map(({ goal, progress }) => (
              <article key={goal.goalId} className="rounded-petal bg-white px-4 py-3">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="font-700 text-ink-900">
                    {getStrand(goal.strandId)?.label || goal.strandId}
                  </span>
                  <span className="text-sm text-ink-700 tnum">
                    started {goal.baseline.value.toFixed(2)} · now{' '}
                    {progress ? progress.current.toFixed(2) : '—'} · target{' '}
                    {goal.target.value.toFixed(2)}
                  </span>
                </div>
                {goal.feasibility?.verdict === 'unrealistic' && (
                  <p className="mt-1 text-[0.7rem] text-clay-500">
                    Saved as out of reach on {new Date(goal.createdAt).toLocaleDateString()}. The
                    warning stays until it is reviewed.
                  </p>
                )}
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <input
                    type="text"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Why — required to close it"
                    className="min-w-[12rem] flex-1 rounded-xl border-2 border-cream-300 px-3 py-1.5 text-sm"
                  />
                  {['met', 'partial', 'missed', 'carried', 'retired'].map((outcome) => (
                    <button
                      key={outcome}
                      type="button"
                      disabled={!note.trim()}
                      onClick={async () => {
                        await reviewGoal(goal.goalId, outcome, note);
                        setNote('');
                      }}
                      className="rounded-full border-2 border-cream-300 px-3 py-1.5 text-[0.72rem] font-700 text-ink-900 hover:border-lavender-500 disabled:opacity-40"
                    >
                      {outcome}
                    </button>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      {/* ---- ready to set ---- */}
      {ready.length > 0 && (
        <div className="mt-5">
          <p className="label-caps">Ready to set · {ready.length}</p>
          <div className="mt-2 space-y-2">
            {ready.map((p) => (
              <article key={p.strandId} className="rounded-petal bg-white px-4 py-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="font-700 text-ink-900">
                      {getStrand(p.strandId)?.label || p.strandId}
                    </span>
                    <span className="ml-2 text-sm text-ink-700 tnum">
                      {p.baseline.value.toFixed(2)} → {p.target.value.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <VerdictPill verdict={p.feasibility.verdict} />
                    <span className="text-[0.7rem] text-ink-500 tnum">
                      {p.feasibility.multiple.toFixed(2)}× a normal year
                    </span>
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => approve(p)}
                      className="rounded-full bg-blush-500 px-4 py-1.5 text-sm font-700 text-white hover:bg-blush-700 disabled:opacity-50"
                    >
                      Set it
                    </button>
                  </div>
                </div>
                <p className="mt-1 text-[0.7rem] text-ink-500">
                  {FEASIBILITY[p.feasibility.verdict].note}
                </p>
              </article>
            ))}
          </div>
        </div>
      )}

      {/* ---- refused, and why ---- */}
      {waiting.length > 0 && (
        <div className="mt-5">
          <p className="label-caps">Not yet · {waiting.length}</p>
          <p className="mt-1 text-sm text-ink-700">
            These have not been measured enough to set a target on. A goal built on three questions
            and missed next July is not a measurement of her — it is a number the app made up.
            About eight questions each settles them: <span className="font-700">Re-measure</span>,
            on her laptop.
          </p>
          <div className="mt-2 space-y-2">
            {waiting.map((p) => (
              <article key={p.strandId} className="rounded-petal bg-cream-100 px-4 py-3">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="font-700 text-ink-900">
                    {getStrand(p.strandId)?.label || p.strandId}
                  </span>
                  <span className="text-[0.72rem] text-ink-700">{p.blockedReason}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      {ready.length === 0 && waiting.length === 0 && goalStatus.length === 0 && (
        <p className="mt-5 text-sm text-ink-700">
          Nothing to set yet — every strand needs a settled measurement behind it first.
        </p>
      )}
    </section>
  );
}

export default GoalsPanel;
