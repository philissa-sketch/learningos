import { useMemo } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import {
  toDateStr,
  todayDateStr,
  weekdayLabel,
  getWeekDates,
  addDays
} from '../../lib/scheduler.js';
import { buildPlannerItemsByDate } from '../../lib/plannerCalendar.js';
import { academyContent } from '../../content/academyContent.js';

const { gardenProjects = [] } = academyContent().electives;
const { aerospaceProjects = [], roboticsProjects = [], scienceExperiments = [], technologyProjects = [] } = academyContent().projects;
const { getThisWeeksScheduledIds = () => null, writingPrompts = [] } = academyContent().writing;

function findItemById(id) {
  return (
    writingPrompts.find((p) => p.id === id) ||
    aerospaceProjects.find((p) => p.id === id) ||
    scienceExperiments.find((p) => p.id === id) ||
    technologyProjects.find((p) => p.id === id) ||
    roboticsProjects.find((p) => p.id === id) ||
    gardenProjects.find((p) => p.id === id) ||
    null
  );
}

/**
 * Weekly view — real Monday-Sunday calendar dates (not a generic
 * repeating template), showing each day's real assignments due plus the
 * week's writing/hands-on-project plan. School week numbering
 * (weeklySchedule.js) rolls in exact 7-day increments from the real
 * school year start date, which may not land on a Monday — computed
 * per-day rather than assumed uniform across the week, so this stays
 * correct even in a boundary week.
 */
export function WeeklyView({ date, onChangeDate, onSelectDay }) {
  const assignments = useAppStore((s) => s.assignments);
  const academicAssignments = useAppStore((s) => s.academicAssignments);
  // The evidence the writing and garden feeds decide `done` from. Omitting
  // these defaults them to [] inside the feed, which marks every journal
  // entry and every garden task permanently unfinished — see the comment on
  // buildPlannerItems in MissionControlBoard.jsx.
  const writingEntries = useAppStore((s) => s.writingEntries);
  const gardenLog = useAppStore((s) => s.gardenLog);
  // Built once per data change (memoized Map keyed by date), not once per
  // render — each day cell below is then an O(1) lookup. (Batch B.)
  const itemsByDate = useMemo(
    () => buildPlannerItemsByDate({ assignments, academicAssignments, writingEntries, gardenLog }),
    [assignments, academicAssignments, writingEntries, gardenLog]
  );
  const scheduleBlocks = useAppStore((s) => s.scheduleBlocks);

  const weekDates = getWeekDates(date);
  const today = todayDateStr();

  // Union of scheduled writing/project ids across every day actually in
  // this calendar week — handles the rare week that straddles two
  // different school-week numbers without assuming they're the same.
  const scheduledIds = Array.from(new Set(weekDates.flatMap((d) => getThisWeeksScheduledIds(d))));
  const weekItems = scheduledIds.map(findItemById).filter(Boolean);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-display uppercase tracking-widest text-ink-500">Weekly</p>
          <h2 className="mt-1 font-display text-2xl font-700 text-ink-100">
            {weekDates[0].toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} –{' '}
            {weekDates[6].toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onChangeDate(addDays(date, -7))}
            className="rounded-lg border border-space-600 px-2.5 py-1.5 text-sm text-ink-300 transition hover:text-ink-100"
            aria-label="Previous week"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => onChangeDate(new Date())}
            className="rounded-lg border border-signal-cyan/40 px-3 py-1.5 text-sm font-display text-signal-cyan transition hover:bg-signal-cyan/10"
          >
            This Week
          </button>
          <button
            type="button"
            onClick={() => onChangeDate(addDays(date, 7))}
            className="rounded-lg border border-space-600 px-2.5 py-1.5 text-sm text-ink-300 transition hover:text-ink-100"
            aria-label="Next week"
          >
            →
          </button>
        </div>
      </div>

      {weekItems.length > 0 && (
        <div className="rounded-xl border border-signal-amber/40 bg-signal-amber/5 p-4 shadow-panel">
          <p className="text-xs font-display uppercase tracking-widest text-signal-amber">This Week's Writing &amp; Project Plan</p>
          <div className="mt-2 space-y-1.5">
            {weekItems.map((item) => (
              <div key={item.id} className="rounded-lg border border-space-700 bg-space-900 px-3 py-2">
                <p className="font-display text-sm font-700 text-ink-100">{item.title}</p>
                <p className="text-xs text-ink-500">{item.theme}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-7">
        {weekDates.map((d) => {
          const dateStr = toDateStr(d);
          const isToday = dateStr === today;
          const dueThatDay = itemsByDate.get(dateStr) ?? [];

          return (
            <button
              key={dateStr}
              type="button"
              onClick={() => onSelectDay(d)}
              className={
                'flex flex-col items-start rounded-xl border p-3 text-left shadow-panel transition hover:border-signal-cyan/50 ' +
                (isToday ? 'border-signal-cyan/60 bg-signal-cyan/5' : 'border-space-700 bg-space-800')
              }
            >
              <p className="text-xs font-display uppercase tracking-widest text-ink-500">{weekdayLabel(d).slice(0, 3)}</p>
              <p className={'font-display text-lg font-700 ' + (isToday ? 'text-signal-cyan' : 'text-ink-100')}>
                {d.getDate()}
              </p>
              <p className="mt-1 text-[11px] text-ink-500">{scheduleBlocks.length} routine blocks</p>
              {dueThatDay.length > 0 && (
                <div className="mt-2 space-y-1">
                  {dueThatDay.slice(0, 3).map((a) =>
                    a.source === 'milestone' ? (
                      // A step, not a deadline: different marker, dimmer, and
                      // it names the assignment it belongs to rather than the
                      // step label, which alone ("Rough draft") says nothing.
                      <p
                        key={a.key}
                        className="truncate text-[11px] font-500 text-ink-300"
                        title={`${a.title} — step ${a.stepIndex} of ${a.stepTotal} toward ${a.parentTitle}`}
                      >
                        ▸ {a.parentTitle}
                      </p>
                    ) : (
                      <p
                        key={a.key}
                        className={
                          'truncate text-[11px] font-600 ' +
                          (a.source === 'academic' ? 'text-signal-cyan' : 'text-signal-amber')
                        }
                        title={`${a.title} — ${a.typeLabel} (${a.source === 'academic' ? 'Academic Center' : 'Planner'})`}
                      >
                        ⚑ {a.title}
                      </p>
                    )
                  )}
                  {dueThatDay.length > 3 && (
                    <p className="text-[11px] text-ink-500">+{dueThatDay.length - 3} more</p>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
