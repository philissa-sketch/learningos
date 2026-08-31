import { useMemo } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import { NovaMessage } from '../Mentor/NovaMessage.jsx';
import {
  buildCalendarItems,
  getUpcomingCalendarItems,
  getOverdueCalendarItems,
  todayDateStr,
  toDateStr,
  startOfWeek,
  addDays,
  parseDateStr,
  weekdayLabel
} from '../../lib/scheduler.js';
import { getWeeklyPlanItems, getWeeklyWritingItem } from '../../lib/weeklyPlan.js';

// ---------------------------------------------------------------------------
// NOVA ON THE SCHEDULE.
// (Built Aug 9, 2026.)
//
// Three views, one component. What changes between them is only the WINDOW —
// one day, one week, one month — so the counting logic is written once and the
// range is a parameter. Three near-identical components would have drifted
// apart within a fortnight, and this app has already been bitten twice by two
// copies of the same fact.
//
// ---- TWO RULES THAT SHAPE THE WORDING ----
//
// 1. OVERDUE IS ALWAYS RELATIVE TO TODAY, never to the date being viewed. If he
//    pages forward to November, work he has not finished is still overdue as of
//    now — it does not stop being late because he is looking at a different
//    month. Getting this backwards would have made the overdue count vanish the
//    moment he navigated away, which is the exact moment it matters.
//
// 2. IT NEVER SCOLDS, and the harder that is to word, the more it matters. The
//    rule inherited from the dashboard greeting holds here: state the fact,
//    name the oldest thing, give him a move. "You are behind on four
//    assignments" is a verdict; a verdict leaves him nothing to do but feel bad
//    about it. It also never escalates with volume — nine late things get the
//    same calm sentence as one.
//
// The encouragement is state-aware rather than generic. "Board is clear" on a
// clear board means something; the same sentence under four overdue items is
// noise, and he will learn to stop reading it.
// ---------------------------------------------------------------------------

/** FNV-1a, so the encouragement is stable for a given day and view. */
function hashString(str) {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h >>> 0;
}

function pickStable(pool, seed) {
  return pool[hashString(seed) % pool.length];
}

/** The window each view is actually showing. */
function rangeFor(mode, date) {
  if (mode === 'weekly') {
    const start = startOfWeek(date);
    return { from: toDateStr(start), to: toDateStr(addDays(start, 6)), label: 'this week' };
  }
  if (mode === 'monthly') {
    const first = new Date(date.getFullYear(), date.getMonth(), 1);
    const last = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return {
      from: toDateStr(first),
      to: toDateStr(last),
      label: first.toLocaleDateString(undefined, { month: 'long' })
    };
  }
  const d = toDateStr(date);
  return { from: d, to: d, label: d === todayDateStr() ? 'today' : weekdayLabel(date) };
}

const CLEAR = [
  'Board is clear. That is a good place to be — go build something.',
  'Nothing outstanding. Enjoy it; it does not happen every week.',
  'All caught up. If you want to get ahead, the next lesson is always open.'
];

const AHEAD = [
  'Take them one at a time. That is the only way anybody does it.',
  'Start with whichever one you understand least — it gets easier after that.',
  'Pick the smallest one first if you are not sure where to start. Momentum is real.',
  'You have time. Use a bit of it today and the rest of the week gets lighter.'
];

const BEHIND = [
  'Oldest one first. It is usually less work than it has been feeling.',
  'Pick one and close it out. The list stops growing the moment you start.',
  'You are not starting from nothing — you are picking up where you left off.'
];

function encouragementFor({ dueCount, overdueCount }, seed) {
  if (overdueCount > 0) return pickStable(BEHIND, seed);
  if (dueCount > 0) return pickStable(AHEAD, seed);
  return pickStable(CLEAR, seed);
}

export function NovaScheduleGuide({ mode = 'daily', date = new Date() }) {
  const assignments = useAppStore((s) => s.assignments);
  const academicAssignments = useAppStore((s) => s.academicAssignments);
  // Field trips are the THIRD dated table. Left out of every calendar
  // until Aug 28, when a trip came due and nothing told her.
  const fieldTrips = useAppStore((s) => s.fieldTrips);
  // Missions are the FOURTH dated thing. A quarterly mission is weighted like
  // an exam and carried no date at all until Aug 29, 2026.
  const missionEvaluations = useAppStore((s) => s.missionEvaluations);

  const view = useMemo(() => {
    const today = todayDateStr();
    const { from, to, label } = rangeFor(mode, date);
    const items = buildCalendarItems({ assignments, academicAssignments, fieldTrips, missionEvaluations });

    const due = getUpcomingCalendarItems(items, from, to).filter((i) => !i.done);
    // Always as of TODAY — see rule 1 above.
    const overdue = getOverdueCalendarItems(items, today).filter(
      (i) => !due.some((d) => d.key === i.key)
    );

    /**
     * The week's writing and project plan carries NO due date — it is keyed off
     * the school week number — so buildCalendarItems cannot see it. Without
     * this, Nova said "nothing is due this week" directly above a card listing
     * that week's writing, and a screen contradicting itself is how he stops
     * believing the parts that tell him where he stands.
     *
     * Weekly scope only: on a single day it is not the day's work, and across a
     * month it is four or five plans, which is an inventory rather than an
     * orientation.
     */
    const weekPlan = mode === 'weekly' ? getWeeklyPlanItems(date) : [];
    const weekWriting = mode === 'weekly' ? getWeeklyWritingItem(date) : null;

    return {
      label, due, overdue, weekPlan, weekWriting,
      seed: `${mode}:${toDateStr(date)}:${due.length}:${overdue.length}`
    };
  }, [mode, date, assignments, academicAssignments]);

  const { label, due, overdue, weekPlan, weekWriting, seed } = view;

  const dueSentence = due.length
    ? `${due.length === 1 ? '1 thing is' : `${due.length} things are`} due ${label} — first is ${due[0].title}${
        due[0].dueDate !== toDateStr(date) ? `, ${weekdayLabel(parseDateStr(due[0].dueDate))}` : ''
      }.`
    : weekPlan.length
      ? `Nothing has a fixed due date ${label}, but the week has a plan.`
      : `Nothing is due ${label}.`;

  const overdueSentence = overdue.length
    ? overdue.length === 1
      ? `1 thing is past its date — ${overdue[0].title}. Clear that and you are clear.`
      : `${overdue.length} things are past their date — oldest is ${overdue[0].title}. Start there and the rest gets easier.`
    : '';

  const planSentence = weekWriting
    ? `This week's writing is ${weekWriting.title}.`
    : weekPlan.length
      ? `This week's plan: ${weekPlan[0].title}.`
      : '';

  const cheer = encouragementFor({ dueCount: due.length, overdueCount: overdue.length }, seed);

  const speak = [overdueSentence, dueSentence, planSentence, cheer].filter(Boolean).join(' ');

  return (
    <div className="mb-4">
      <NovaMessage tone="brief" speak={speak}>
        {/* What has slipped comes first — it matters more than what is coming. */}
        {overdueSentence && (
          <p className="text-sm text-signal-amber">{overdueSentence}</p>
        )}
        <p className={'text-sm text-ink-100' + (overdueSentence ? ' mt-1' : '')}>{dueSentence}</p>

        {due.length > 1 && (
          <ul className="mt-2 space-y-0.5">
            {due.slice(0, 4).map((i) => (
              <li key={i.key} className="text-[11px] text-ink-400">
                {weekdayLabel(parseDateStr(i.dueDate))} — {i.title}
              </li>
            ))}
            {due.length > 4 && (
              <li className="text-[11px] text-ink-600">and {due.length - 4} more</li>
            )}
          </ul>
        )}

        {planSentence && <p className="mt-1 text-sm text-ink-300">{planSentence}</p>}

        <p className="mt-2 border-t border-space-700 pt-2 text-sm text-ink-300">{cheer}</p>
      </NovaMessage>
    </div>
  );
}
