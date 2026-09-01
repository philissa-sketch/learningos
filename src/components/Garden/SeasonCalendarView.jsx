import { useAppStore } from '../../store/useAppStore.js';
import { todayDateStr } from '../../lib/scheduler.js';
import { useToday } from '../../lib/useToday.js';
import { academyContent } from '../../content/academyContent.js';

const { gardenCalendar = [], getGardenBriefById = () => null } = academyContent().electives;

// Verified North Georgia fall windows (UGA Extension C1258). UGA's B577 chart
// is written for MIDDLE Georgia; north plants about two weeks earlier in fall.
// These are recorded in PROJECT_PLAN.md Part 4 — do NOT re-derive them.
const PLANTING_WINDOWS = [
  {
    window: 'August 15',
    crops: 'Beets, broccoli, cabbage, carrots, collards, kale, leeks, mustard, spinach, Swiss chard'
  },
  {
    window: 'August 30 – September 1',
    crops: 'Brussels sprouts, Chinese cabbage, cauliflower, garlic, onions'
  },
  { window: 'September 15 – October 15', crops: 'Leaf lettuces, radishes' }
];

/** Every Friday of the fall season, with the four open ones shown as open. */
export function SeasonCalendarView() {
  const gardenLog = useAppStore((s) => s.gardenLog);
  const today = useToday();

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">
          Fall planting windows — North Georgia
        </p>
        <ul className="mt-2 space-y-2 text-sm text-ink-300">
          {PLANTING_WINDOWS.map((w) => (
            <li key={w.window}>
              <span className="font-display font-700 text-ink-100">{w.window} — </span>
              {w.crops}
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-ink-500">
          Soil pH target 6.2–6.8. Water daily the first week, then 1–2 inches a week — remembering that
          guidance is written for beds in the ground, and yours are buckets under an awning that never sees
          rain. Source: UGA Extension C1258.
        </p>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-display uppercase tracking-widest text-ink-500">
          Every garden Friday, {gardenCalendar[0].date.slice(5)} – {gardenCalendar[gardenCalendar.length - 1].date.slice(5)}
        </p>
        {gardenCalendar.map((day) => {
          const brief = day.briefId ? getGardenBriefById(day.briefId) : null;
          const worked = gardenLog.some((r) => r.date === day.date);
          const isPast = day.date < today;
          const isToday = day.date === today;
          return (
            <div
              key={day.date}
              className={
                'rounded-xl border p-4 shadow-panel ' +
                (day.closed
                  ? 'border-space-800 bg-space-900 opacity-60'
                  : isToday
                    ? 'border-signal-cyan/50 bg-signal-cyan/5'
                    : brief
                      ? 'border-space-700 bg-space-800'
                      : 'border-space-700 bg-space-900')
              }
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-display uppercase tracking-widest text-ink-500">
                    {new Date(day.date + 'T12:00:00').toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric'
                    })}
                    {isToday && ' · today'}
                  </p>
                  <p
                    className={
                      'mt-1 font-display text-sm font-700 ' + (brief ? 'text-ink-100' : 'text-ink-300')
                    }
                  >
                    {brief ? brief.title : day.closed ? 'School closed' : 'Open Friday'}
                  </p>
                  <p className="mt-1 text-xs text-ink-500">
                    {brief ? brief.theme : day.closed ? day.closedReason : day.suggestion}
                  </p>
                </div>
                {worked ? (
                  <span className="flex-none rounded-full border border-signal-green/40 bg-signal-green/10 px-2 py-1 text-xs font-display text-signal-green">
                    worked
                  </span>
                ) : day.closed ? (
                  <span className="flex-none rounded-full border border-space-700 px-2 py-1 text-xs font-display text-ink-600">
                    closed
                  </span>
                ) : isPast ? (
                  <span className="flex-none rounded-full border border-space-600 px-2 py-1 text-xs font-display text-ink-500">
                    no record
                  </span>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-xs text-ink-600">
        Not every Friday carries a brief, on purpose — some weeks the garden needs nothing, and a lesson
        that exists because it is Friday is padding. Open Fridays are for tending, catch-up, and field
        trips; closed ones are school holidays.
      </p>
    </div>
  );
}
