import { useMemo } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import { toDateStr, todayDateStr, formatMonthLabel, getMonthGrid } from '../../lib/scheduler.js';
import { buildPlannerItemsByDate, splitPlannerItems } from '../../lib/plannerCalendar.js';
import { hasSchoolStarted } from '../../lib/schoolQuarter.js';

const WEEKDAY_HEADERS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

/**
 * Monthly view — a real calendar grid for the viewed month. Each cell
 * shows a lightweight signal (a dot for a school day already started, a
 * flag count for real Planner assignments due that date) rather than
 * trying to cram full detail into a small cell; click a day to jump to
 * the Daily view for real detail.
 */
export function MonthlyView({ date, onChangeDate, onSelectDay }) {
  const assignments = useAppStore((s) => s.assignments);
  const academicAssignments = useAppStore((s) => s.academicAssignments);
  // The evidence the writing and garden feeds decide `done` from. Omitting
  // these defaults them to [] inside the feed, which marks every journal
  // entry and every garden task permanently unfinished — see the comment on
  // buildPlannerItems in MissionControlBoard.jsx.
  const writingEntries = useAppStore((s) => s.writingEntries);
  const gardenLog = useAppStore((s) => s.gardenLog);
  // Memoized Map keyed by date — 42 O(1) cell lookups instead of 42 full
  // scans of every assignment ever created, per render. (Batch B.)
  const itemsByDate = useMemo(
    () => buildPlannerItemsByDate({ assignments, academicAssignments, writingEntries, gardenLog }),
    [assignments, academicAssignments, writingEntries, gardenLog]
  );

  const year = date.getFullYear();
  const monthIndex = date.getMonth();
  const weeks = getMonthGrid(year, monthIndex);
  const today = todayDateStr();

  const goToMonth = (delta) => {
    onChangeDate(new Date(year, monthIndex + delta, 1));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-display uppercase tracking-widest text-ink-500">Monthly</p>
          <h2 className="mt-1 font-display text-2xl font-700 text-ink-100">{formatMonthLabel(date)}</h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => goToMonth(-1)}
            className="rounded-lg border border-space-600 px-2.5 py-1.5 text-sm text-ink-300 transition hover:text-ink-100"
            aria-label="Previous month"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => onChangeDate(new Date())}
            className="rounded-lg border border-signal-cyan/40 px-3 py-1.5 text-sm font-display text-signal-cyan transition hover:bg-signal-cyan/10"
          >
            This Month
          </button>
          <button
            type="button"
            onClick={() => goToMonth(1)}
            className="rounded-lg border border-space-600 px-2.5 py-1.5 text-sm text-ink-300 transition hover:text-ink-100"
            aria-label="Next month"
          >
            →
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="grid min-w-[560px] grid-cols-7 gap-1.5">
          {WEEKDAY_HEADERS.map((h) => (
            <p key={h} className="px-1 text-center text-xs font-display uppercase tracking-widest text-ink-500">
              {h}
            </p>
          ))}

          {weeks.flat().map((d) => {
            const dateStr = toDateStr(d);
            const inMonth = d.getMonth() === monthIndex;
            const isToday = dateStr === today;
            const { due, steps } = splitPlannerItems(itemsByDate.get(dateStr) ?? []);
            const schoolStarted = hasSchoolStarted(d);

            return (
              <button
                key={dateStr}
                type="button"
                onClick={() => onSelectDay(d)}
                className={
                  'flex min-h-[72px] flex-col items-start rounded-lg border p-2 text-left transition hover:border-signal-cyan/50 ' +
                  (isToday
                    ? 'border-signal-cyan/60 bg-signal-cyan/5'
                    : inMonth
                      ? 'border-space-700 bg-space-800'
                      : 'border-space-800 bg-space-900 opacity-50')
                }
              >
                <div className="flex w-full items-center justify-between">
                  <span className={'font-display text-sm font-700 ' + (isToday ? 'text-signal-cyan' : 'text-ink-100')}>
                    {d.getDate()}
                  </span>
                  {schoolStarted && inMonth && <span className="h-1.5 w-1.5 rounded-full bg-signal-green/60" title="School day" />}
                </div>
                {due.length > 0 && (
                  <span className="mt-1 rounded-full border border-signal-amber/40 bg-signal-amber/10 px-1.5 py-0.5 text-[10px] font-display text-signal-amber">
                    {due.length} due
                  </span>
                )}
                {/* Steps get their own quieter pill. Folding them into the
                    "due" count would read as five deadlines on a day that has
                    none — the opposite of the reassurance this view exists
                    to give. */}
                {steps.length > 0 && (
                  <span className="mt-1 rounded-full border border-space-600 px-1.5 py-0.5 text-[10px] font-display text-ink-400">
                    {steps.length} step{steps.length === 1 ? '' : 's'}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <p className="text-xs text-ink-500">
        <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-signal-green/60 align-middle" /> School year underway ·{' '}
        <span className="text-signal-amber">amber</span> badge = work DUE that date, counting the Planner and
        the Academic Center together. Grey <span className="text-ink-300">step</span> badge = a weekly checkpoint
        on a book report, research paper, or presentation — the days he should be working on it, not the day it
        is due. Click any day for full detail.
      </p>
    </div>
  );
}
