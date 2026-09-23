import { useAppStore } from '../../store/useAppStore.js';
import { getStrand } from '../../config/strands.js';
import { schoolDaysRemaining } from '../../config/calendar.js';
import { dayKeyOf } from '../../lib/reviewQueue.js';

// ---------------------------------------------------------------------------
// HER GOAL, ON THE SCREEN SHE OPENS EVERY MORNING.
//
// §3.11.6, and it is the whole reason this component exists rather than a tab:
//
//   "A goal appears as ONE LINE on the today surface — metric, current, target,
//    days left — OR IT DOES NOT EXIST. Depth lives one level away. A goals
//    screen the learner never opens is a database row, not a goal."
//
// ---- WHAT IT SAYS AND WHAT IT REFUSES TO SAY ----
//
// It shows where she started, where she is, and where she is going. It does NOT
// show the feasibility verdict. "Out of reach" is a planning word for a
// grown-up deciding what to commit to — putting it in front of a nine-year-old
// on her home screen every morning is telling her the year is lost before she
// has started it, in the app's own voice.
//
// The verdict lives in the Grown-Up Corner, where the person making the
// decision can see it. That is the same split as the decimal levels: her screen
// says "you are getting there", the grown-up's screen says 3.46.
//
// ---- NO PROGRESS BAR AT ZERO ----
//
// A bar showing 0% on the first morning is worse than no bar. It answers a
// question she did not ask with a number designed to look like failure. The bar
// appears once she has actually moved.
//
// ---- WHY IT IS QUIET WHEN THERE IS NOTHING TO SAY ----
//
// No active goals, no card. An empty "no goals yet" panel on a child's home
// screen is an app talking about itself.
// ---------------------------------------------------------------------------

export function GoalLine({ onNavigate }) {
  const goalStatus = useAppStore((s) => s.goalStatus());

  const live = goalStatus.filter((g) => g.progress);
  if (!live.length) return null;

  // The one furthest along. She sees the goal she is winning, not the pile.
  const best = [...live].sort((a, b) => (b.progress.fraction || 0) - (a.progress.fraction || 0))[0];
  const strand = getStrand(best.goal.strandId);
  const daysLeft = schoolDaysRemaining(dayKeyOf(), best.goal.target.byDate);
  const moved = best.progress.moved > 0;

  return (
    <section className="mt-6 panel px-5 py-5">
      <p className="label-caps">What I am working towards</p>

      <p className="mt-1.5 font-display text-lg leading-snug text-ink-900">
        {strand?.label || best.goal.strandId}
      </p>

      <p className="mt-1 text-sm text-ink-700">
        {moved ? (
          <>
            You have moved <span className="font-700 text-sage-700">up {best.progress.moved.toFixed(2)}</span>{' '}
            since you started.
          </>
        ) : (
          <>This is where you are starting from. Every warm-up moves it.</>
        )}{' '}
        <span className="text-ink-500">
          {daysLeft} school {daysLeft === 1 ? 'day' : 'days'} to go.
        </span>
      </p>

      {moved && best.progress.fraction != null && (
        <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-cream-200">
          <div
            className="h-full rounded-full bg-sage-500"
            style={{ width: `${Math.round(best.progress.fraction * 100)}%` }}
          />
        </div>
      )}

      {live.length > 1 && (
        <button
          type="button"
          onClick={() => onNavigate('levels')}
          className="mt-3 rounded-full border-2 border-lavender-500 px-5 py-2 text-sm font-700 text-ink-900 hover:bg-lavender-500/15"
        >
          See all {live.length}
        </button>
      )}
    </section>
  );
}

export default GoalLine;
