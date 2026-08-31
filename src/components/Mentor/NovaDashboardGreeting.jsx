import { useMemo, useState } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import { buildCalendarItems, getUpcomingCalendarItems, getOverdueCalendarItems, addDays, toDateStr, weekdayLabel, formatShortDate } from '../../lib/scheduler.js';
import { NovaMessage } from './NovaMessage.jsx';
import { getDashboardGreeting } from '../../lib/novaVoice.js';
import { todayDateStr, parseDateStr } from '../../lib/scheduler.js';
import { NovaVoiceQuickSettings } from './NovaVoiceQuickSettings.jsx';

/**
 * Commander Nova on the student dashboard (Aug 8, 2026).
 *
 * WHY THIS EXISTS: Nova lived entirely inside the lesson engine — briefing,
 * hints, debrief — so on the dashboard, the schedule, PE, the garden and the
 * rewards hub he did not exist at all. His only trace outside a lesson was his
 * name printed on a certificate signature line. After he was given a voice the
 * parent went looking for him and reported, correctly, "I don't see Nova
 * anywhere."
 *
 * This puts him at the top of the first screen of the day. Because it renders
 * through NovaMessage, it inherits the speaker button and the voice settings
 * automatically — nothing about speech is re-implemented here.
 *
 * DELIBERATELY READ-ONLY. It subscribes to two store fields and writes
 * nothing, so it cannot affect XP, streaks, attendance or any record that
 * travels in the export. A greeting should never be able to change the data
 * it is greeting you about.
 */
export function NovaDashboardGreeting({ patternKind = 'core', isFlex = false, nextUp = '' }) {
  const [showVoice, setShowVoice] = useState(false);
  const streak = useAppStore((s) => s.streak);
  const lastActiveDate = useAppStore((s) => s.lastActiveDate);
  const assignments = useAppStore((s) => s.assignments);
  const academicAssignments = useAppStore((s) => s.academicAssignments);
  // Field trips are the THIRD dated table. Left out of every calendar
  // until Aug 28, when a trip came due and nothing told her.
  const fieldTrips = useAppStore((s) => s.fieldTrips);
  // Missions are the FOURTH dated thing. A quarterly mission is weighted like
  // an exam and carried no date at all until Aug 29, 2026.
  const missionEvaluations = useAppStore((s) => s.missionEvaluations);

  /**
   * What is actually due in the next seven days.
   *
   * The weekend greeting used to end at "nothing here is due" — true of today,
   * and on a Saturday that was the entire message. The one thing a look at the
   * dashboard should answer on a Saturday is what Monday brings.
   *
   * Only UNFINISHED work counts: a week whose items are all done should read as
   * clear, not as four things still hanging over him.
   */
  /**
   * Work whose date has already passed.
   *
   * Counted separately from the week ahead and said FIRST, because what has
   * already slipped matters more than what is coming — and because the two must
   * never double-count. getUpcomingCalendarItems starts at today, so the two
   * windows cannot overlap.
   *
   * A day label is only useful while it is recent; past about a week "from
   * Tuesday" stops meaning anything, so older items fall back to a date.
   */
  const overdue = useMemo(() => {
    const today = todayDateStr();
    const items = getOverdueCalendarItems(
      buildCalendarItems({ assignments, academicAssignments, fieldTrips, missionEvaluations }),
      today
    );
    if (!items.length) return null;
    const oldest = items[0];
    const daysAgo = Math.round((parseDateStr(today) - parseDateStr(oldest.dueDate)) / 864e5);
    const oldestDay =
      daysAgo <= 6 ? weekdayLabel(parseDateStr(oldest.dueDate)) : formatShortDate(parseDateStr(oldest.dueDate));
    return { count: items.length, oldestLabel: oldest.title, oldestDay };
  }, [assignments, academicAssignments]);

  const weekAhead = useMemo(() => {
    const today = todayDateStr();
    const through = toDateStr(addDays(parseDateStr(today), 7));
    const items = getUpcomingCalendarItems(
      buildCalendarItems({ assignments, academicAssignments, fieldTrips, missionEvaluations }),
      today,
      through
    ).filter((i) => !i.done);
    if (!items.length) return null;
    const next = items[0];
    const day = next.dueDate === today ? 'today' : weekdayLabel(parseDateStr(next.dueDate));
    return { count: items.length, nextLabel: next.title, nextDay: day };
  }, [assignments, academicAssignments]);

  const { greeting, today } = useMemo(() => {
    const today = todayDateStr();

    // null means "has never worked in the app" — a genuinely different case
    // from "was away a while", and it gets a genuinely different line.
    let daysAway = null;
    if (lastActiveDate) {
      const diffMs = parseDateStr(today) - parseDateStr(lastActiveDate);
      // Math.max guards a clock that has moved backwards (a machine whose date
      // was wrong and got corrected). A negative gap must never read as an
      // absence and greet him with "welcome back" on a normal working day.
      daysAway = Math.max(0, Math.round(diffMs / 864e5));
    }

    return {
      today,
      greeting: getDashboardGreeting({
        daysAway,
        streak: streak || 0,
        patternKind,
        isFlex,
        today,
        hour: new Date().getHours(),
        nextUp,
        weekAhead,
        overdue
      })
    };
  }, [lastActiveDate, streak, patternKind, isFlex, nextUp, weekAhead, overdue]);

  // `key` on the today string means a session left open overnight re-renders
  // with the new day's greeting rather than yesterday's.
  return (
    <div>
      <NovaMessage key={today} tone="brief">
        <p>{greeting}</p>
      </NovaMessage>

      {/* The student's own way in to the voice controls. The full panel lives
          in the Parent Dashboard behind the passcode, which he cannot open —
          and since these settings are stored per machine, without this he
          would be stuck with his browser's default voice forever. Putting it
          on Nova himself is also the most findable place: "I want to change
          how Nova sounds" starts by looking at Nova. */}
      <div className="mt-1 text-right">
        <button
          type="button"
          onClick={() => setShowVoice((v) => !v)}
          className="text-[11px] text-ink-500 underline transition hover:text-signal-cyan"
        >
          {showVoice ? 'Hide voice settings' : "Change how Nova sounds"}
        </button>
      </div>

      {showVoice && <NovaVoiceQuickSettings onClose={() => setShowVoice(false)} />}
    </div>
  );
}
