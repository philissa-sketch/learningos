import { useAppStore } from '../../store/useAppStore.js';
import { buildActionPlan, planHeadline } from '../../lib/actionPlan.js';
import { SUBJECTS } from '../../config/strands.js';
import { MarigoldMessage } from '../Mentor/MarigoldMessage.jsx';
import { planLine } from '../../lib/marigold.js';

/**
 * The deliverable. Everything before this screen exists to produce it.
 *
 * Each row names a Khan Academy course and unit and opens it in a new tab. The
 * app teaches none of this itself — Khan does — so the most useful thing this
 * screen can be is a short, ordered, clickable list of where to go.
 */

const GROUPS = [
  {
    key: 'focus',
    title: 'Start here',
    tone: 'bg-blush-300/40 border-blush-500',
    note: 'The three strands where your time will do the most. Not the ones you are worst at — the ones where a little work moves the most.'
  },
  {
    key: 'steady',
    title: 'Keep going',
    tone: 'bg-cream-200 border-cream-300',
    note: 'On track. Keep working through these at a normal pace.'
  },
  {
    key: 'stretch',
    title: 'Ready to stretch',
    tone: 'bg-sage-300/40 border-sage-500',
    note: 'You are ahead here. These are where you get to go looking for harder things.'
  }
];

function Row({ entry }) {
  const { strand, khan, described, state } = entry;
  return (
    <div className="flex flex-wrap items-center gap-3 border-t border-cream-300 px-4 py-3 first:border-t-0">
      <span className="text-xl leading-none">{strand.plant}</span>
      <div className="min-w-[9rem] flex-1">
        <p className="text-sm font-700 leading-tight text-ink-900">{strand.label}</p>
        <p className="text-xs text-ink-500">
          {SUBJECTS[strand.subject].label} · {described.text}
          {!state.settled && ' · still being measured'}
        </p>
      </div>
      <div className="min-w-[12rem] flex-1">
        <p className="text-sm leading-tight text-ink-900">{khan?.courseLabel}</p>
        <p className="text-xs text-ink-500">{khan?.unit}</p>
      </div>
      {khan?.courseUrl && (
        <a
          href={khan.courseUrl}
          target="_blank"
          rel="noreferrer"
          className="print-hide rounded-full border border-lavender-500 px-4 py-1.5 text-xs font-700 text-lavender-700 hover:bg-lavender-300/40"
        >
          Open on Khan ↗
        </a>
      )}
    </div>
  );
}

export function PlanView({ onNavigate }) {
  const strands = useAppStore((s) => s.strands);
  const progress = useAppStore((s) => s.progress());
  // v3.92 — her grades decide how far along her lane she is. Without them this
  // screen printed a static label from the v3.20 era and disagreed with the
  // block that actually opens Khan.
  const khanGrades = useAppStore((s) => s.khanGrades);
  const plan = buildActionPlan(strands, khanGrades);

  if (plan.measuredCount === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-14 text-center">
        <div className="panel px-6 py-10">
          <p className="text-4xl">🗺️</p>
          <h1 className="mt-3 font-display text-2xl text-ink-900">No plan yet</h1>
          <p className="mx-auto mt-3 max-w-md text-sm text-ink-700">
            The plan is built from the Check-In. Answer a few questions and it will start filling in
            — you do not have to finish the whole thing first.
          </p>
          <button
            type="button"
            onClick={() => onNavigate('diagnostic')}
            className="mt-6 rounded-full bg-blush-500 px-6 py-3 font-700 text-white hover:bg-blush-700"
          >
            Begin the Check-In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 print-content">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="label-caps">My Plan</p>
          <h1 className="mt-1 font-display text-3xl text-ink-900">Where to start on Khan Academy</h1>
        </div>
        <button
          type="button"
          onClick={() => window.print()}
          className="print-hide rounded-full border border-cream-300 bg-white px-5 py-2.5 text-sm font-700 text-ink-700 hover:border-lavender-500"
        >
          🖨️ Print this plan
        </button>
      </div>

      <p className="mt-3 max-w-2xl text-sm text-ink-700">{planHeadline(plan)}</p>

      <div className="print-hide mt-4">
        <MarigoldMessage text={planLine(plan)} size="sm" />
      </div>

      {!progress.complete && (
        <p className="print-hide mt-3 rounded-xl bg-lavender-300/30 px-4 py-3 text-sm text-ink-700">
          {progress.settledCount} of {progress.strandCount} strands are finished. This plan will get
          more accurate as you answer more — the rows marked “still being measured” could still
          move.
        </p>
      )}

      {GROUPS.map((group) => {
        const entries = plan[group.key];
        if (!entries || entries.length === 0) return null;
        return (
          <section key={group.key} className="mt-6">
            <div className={`rounded-t-petal border-2 border-b-0 px-4 py-3 ${group.tone}`}>
              <h2 className="font-display text-lg text-ink-900">{group.title}</h2>
              <p className="mt-0.5 text-xs text-ink-700">{group.note}</p>
            </div>
            <div className="rounded-b-petal border-2 border-t-0 border-cream-300 bg-white">
              {entries.map((entry) => (
                <Row key={entry.strand.id} entry={entry} />
              ))}
            </div>
          </section>
        );
      })}

      {plan.unmeasured.length > 0 && (
        <section className="mt-6 panel px-4 py-4">
          <h2 className="font-display text-base text-ink-900">Not measured yet</h2>
          <p className="mt-1 text-xs text-ink-700">
            These have not come up in the Check-In yet, so there is nothing to recommend for them.
          </p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {plan.unmeasured.map((u) => (
              <li
                key={u.strand.id}
                className="rounded-full bg-cream-200 px-3 py-1 text-xs text-ink-700"
              >
                {u.strand.plant} {u.strand.label}
              </li>
            ))}
          </ul>
        </section>
      )}

      <p className="mt-8 text-xs text-ink-500">
        Khan Academy occasionally renames its units. If a unit name here does not match what you see
        on the site, the course link still goes to the right course — and a grown-up can update the
        names in one file (<span className="font-mono">src/data/khan/khanMap.js</span>).
      </p>
    </div>
  );
}
