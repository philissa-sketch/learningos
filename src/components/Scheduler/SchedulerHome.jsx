import { useState } from 'react';
import { DailyView } from './DailyView.jsx';
import { WeeklyView } from './WeeklyView.jsx';
import { MonthlyView } from './MonthlyView.jsx';
import { NovaScheduleGuide } from './NovaScheduleGuide.jsx';

const MODES = [
  { id: 'daily', label: 'Daily' },
  { id: 'weekly', label: 'Weekly' },
  { id: 'monthly', label: 'Monthly' }
];

/**
 * The Scheduler (PROJECT_PLAN.md Part 5) — a real Daily/Weekly/Monthly
 * calendar, built directly from the parent's request for "a clear view
 * of everything so I can plan ahead." One shared `selectedDate` so
 * switching views (or clicking a specific day in Weekly/Monthly) keeps
 * context instead of resetting to today every time.
 */
/**
 * @param {'daily'|'weekly'|'monthly'} initialMode  which view to open on.
 *
 * Added Aug 20, 2026. The parent: **"in the morning meeting section add for
 * him to look at his weekly and monthly planner so that he can see what will
 * be due."** A button that lands him on the Daily view and leaves him to find
 * the Weekly tab is not that instruction — it is most of it, and the last step
 * is the one that gets skipped.
 */
export function SchedulerHome({ initialMode = 'daily' }) {
  const [mode, setMode] = useState(MODES.some((m) => m.id === initialMode) ? initialMode : 'daily');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleSelectDay = (date) => {
    setSelectedDate(date);
    setMode('daily');
  };

  return (
    <div className="mx-auto max-w-4xl space-y-4 px-4 py-6 sm:px-6">
      <div className="flex items-center justify-between">
        <p className="text-xs font-display uppercase tracking-widest text-ink-500">Schedule</p>
        <div className="flex gap-1 rounded-lg bg-space-800 p-1 shadow-panel">
          {MODES.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setMode(m.id)}
              aria-current={mode === m.id ? 'page' : undefined}
              className={
                'rounded-md px-3 py-1.5 text-sm font-display font-600 transition-colors ' +
                (mode === m.id ? 'bg-signal-cyan/15 text-signal-cyan' : 'text-ink-300 hover:text-ink-100')
              }
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <NovaScheduleGuide mode={mode} date={selectedDate} />

      {mode === 'daily' && <DailyView date={selectedDate} onChangeDate={setSelectedDate} />}
      {mode === 'weekly' && <WeeklyView date={selectedDate} onChangeDate={setSelectedDate} onSelectDay={handleSelectDay} />}
      {mode === 'monthly' && <MonthlyView date={selectedDate} onChangeDate={setSelectedDate} onSelectDay={handleSelectDay} />}
    </div>
  );
}
