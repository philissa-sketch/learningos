import { useState } from 'react';
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

/**
 * ===========================================================================
 * THE PANEL SAYS FALL. THE CALENDAR RUNS ALL YEAR. (Sep 10, 2026.)
 * ===========================================================================
 *
 * Found in the Gardening audit. `PLANTING_WINDOWS` is a fall set — Aug 15
 * through Oct 15 — and `gardenCalendar` runs August 2026 to July 2027. For
 * NINE of those twelve months the panel shows dates that have gone or are a
 * year away, headed as though they were this week's guidance.
 *
 * NO SPRING DATES ARE INVENTED HERE, and that is deliberate rather than lazy.
 * The comment above these windows says where they came from and says "do NOT
 * re-derive them": UGA Extension C1258, chosen because B577 is written for
 * MIDDLE Georgia and north plants about two weeks earlier in fall. A spring
 * set is real horticultural data for a real garden, and a boy sowing on a date
 * this app guessed at is a crop that fails in a way nobody traces back to a
 * screen. It needs the same sourcing the fall set got.
 *
 * So the panel keeps its reference value and stops pretending to be current:
 * inside the window it reads exactly as it did, and outside it says which
 * season these are and that the spring set is not in the app yet.
 *
 * Month-day rather than a full date, so it is right every year without being
 * edited.
 */
const FALL_PLANTING_FROM = '08-01';
const FALL_PLANTING_TO = '10-15';

function inFallPlantingSeason(dateStr) {
  const md = (dateStr || '').slice(5);
  return md >= FALL_PLANTING_FROM && md <= FALL_PLANTING_TO;
}

/**
 * ===========================================================================
 * "NO RECORD" WAS A STATUS PRETENDING TO BE A SLOT. (Sep 9, 2026.)
 * ===========================================================================
 *
 * The parent, looking at four Fridays in a row badged `no record`: **"It says
 * no record like something is to be recorded there."**
 *
 * Exactly right. The badge told the truth about the record and lied about what
 * she could do next — every logging surface in the garden could only ever
 * write TODAY. The Garden Log form has no date field; the Mission tab offers
 * only the current week's Friday. A garden day that had passed could not be
 * recorded from anywhere in the app, so every one of those badges was
 * permanent and the card offered nothing to press.
 *
 * A past Friday is loggable here now. Her decision on where the attendance
 * lands, asked with the arithmetic in front of her: **the day he gardened.**
 * The row and the attendance both take that Friday's date, which is also what
 * `coveredBlockIds` has always done with the minutes.
 *
 * NOT LOGGABLE: a Friday that has not happened yet, and a school holiday.
 * Attendance now follows the row's date, so a future row would put a day of
 * instruction on a day nobody has lived through.
 */
export function SeasonCalendarView() {
  const gardenLog = useAppStore((s) => s.gardenLog);
  const recordGardenLogEntry = useAppStore((s) => s.recordGardenLogEntry);
  const today = useToday();
  const [saving, setSaving] = useState(null);
  const inSeason = inFallPlantingSeason(today);
  const monthName = new Date(today + 'T12:00:00').toLocaleDateString(undefined, { month: 'long' });

  const logDay = async (day, brief) => {
    setSaving(day.date);
    await recordGardenLogEntry({
      kind: 'session',
      briefId: day.briefId || null,
      title: brief ? brief.title : 'Open Friday in the garden',
      date: day.date
    });
    setSaving(null);
  };

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">
          Fall planting windows — North Georgia
        </p>
        {!inSeason && (
          <p className="mt-2 rounded-lg border border-signal-amber/40 bg-signal-amber/5 px-3 py-2 text-xs text-signal-amber">
            These are the <span className="font-display font-700">fall</span> dates, and it is{' '}
            {monthName}. Nothing below is plantable now. The spring window for North Georgia has not
            been added to the app yet — it needs the same UGA source the fall dates came from, so it is
            not guessed at here.
          </p>
        )}
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
                  /**
                    * The badge names the state and the button offers the only
                    * thing that can change it. "Not logged" rather than "no
                    * record": the record is fine, it is this day that is
                    * missing from it.
                    */
                  <div className="flex flex-none flex-col items-end gap-1">
                    <span className="rounded-full border border-space-600 px-2 py-1 text-xs font-display text-ink-500">
                      not logged
                    </span>
                    <button
                      type="button"
                      disabled={saving === day.date}
                      onClick={() => logDay(day, brief)}
                      className="rounded-lg bg-signal-cyan px-2.5 py-1 text-xs font-display font-700 text-space-950 transition hover:brightness-110 disabled:opacity-40"
                    >
                      {saving === day.date ? 'Saving…' : 'Log this day'}
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-xs text-ink-600">
        A Friday marked <span className="text-ink-400">not logged</span> can still be recorded — the entry
        is dated to that Friday, not to today, so the day counts where the work actually happened. A
        Friday that has not arrived yet cannot be logged.
      </p>

      <p className="text-xs text-ink-600">
        Not every Friday carries a brief, on purpose — some weeks the garden needs nothing, and a lesson
        that exists because it is Friday is padding. Open Fridays are for tending, catch-up, and field
        trips; closed ones are school holidays.
      </p>
    </div>
  );
}
