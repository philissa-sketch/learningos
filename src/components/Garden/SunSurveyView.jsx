import { useMemo, useState } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import { todayDateStr } from '../../lib/scheduler.js';
import { useToday } from '../../lib/useToday.js';
import {
  SUN_ZONES as ZONES,
  SUN_HOURS as HOURS,
  SUN_CONDITIONS as CONDITIONS,
  CHECKS_PER_DAY,
  SURVEY_DAYS_WANTED,
  sunHourLabel as hourLabel,
  sunSurveyStats,
  zoneClass
} from '../../lib/sunSurvey.js';

/**
 * The sun survey logger. One tap per zone per hour.
 *
 * A DIRECT reading equals an hour of direct sun — but only if every hour was
 * checked. That "only if" was missing until Aug 24, 2026: four checks on one
 * day were divided by one day and reported as "4.0 h/day", which reads as a
 * finished measurement. See lib/sunSurvey.js. Per-day figures now come from
 * complete days only, and an unfinished day says so.
 */
export function SunSurveyView() {
  const gardenLog = useAppStore((s) => s.gardenLog);
  const recordGardenLogEntry = useAppStore((s) => s.recordGardenLogEntry);
  const [hour, setHour] = useState(new Date().getHours());
  const [saving, setSaving] = useState(null);

  const today = useToday();
  // One calculation, shared with the Build Track — see lib/sunSurvey.js for
  // why a partial day is never averaged into a per-day figure.
  const stats = useMemo(() => sunSurveyStats(gardenLog, today), [gardenLog, today]);
  const { readings, zones: tally } = stats;
  const doneThisHour = (zone) =>
    readings.some((r) => r.date === today && r.data?.hour === hour && r.data?.zone === zone);

  /** Hours today that are fully logged, so he can see which ones still need doing. */
  const hoursDoneToday = useMemo(() => stats.hoursByDate.get(today) ?? new Set(), [stats, today]);

  const record = async (zone, condition) => {
    setSaving(zone + condition);
    await recordGardenLogEntry({
      kind: 'sun-reading',
      title: `Sun reading — zone ${zone} at ${hourLabel(hour)}`,
      data: { zone, hour, condition }
    });
    setSaving(null);
  };

  const classFor = (zone) => zoneClass(tally[zone].hoursPerDay);

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Project 1 — The Sun Survey</p>
        <h3 className="mt-1 font-display text-lg font-700 text-ink-100">Once an hour, every zone</h3>

        {/**
          * ---- THE DIRECTIONS, REWRITTEN (Aug 24, 2026) ----
          *
          * The parent: **"The directions are not clear either."** They were
          * four sentences of shorthand — "go out at the top of each hour",
          * "ten checks a day" — that assume you already know the method. They
          * never said what a check IS, that a zone gets exactly one tap, or
          * that the day only counts when all ten hours are done. He did four
          * hours and reasonably thought he had done a survey day.
          *
          * Numbered, because it is a procedure and the order matters.
          */}
        <ol className="mt-2 space-y-1.5 text-sm text-ink-300">
          <li>
            <span className="font-display font-600 text-ink-100">1.</span> Pick a day with clear skies. Cloud
            is not bad data, it is no data — if it clouds over, stop and start again another day.
          </li>
          <li>
            <span className="font-display font-600 text-ink-100">2.</span> At the start of each hour, go out
            and look at all eight zones.
          </li>
          <li>
            <span className="font-display font-600 text-ink-100">3.</span> Tap the hour below, then give every
            zone <span className="text-ink-100">one</span> tap: <span className="text-ink-100">Direct</span> if
            sun is falling straight on it, <span className="text-ink-100">Bright shade</span> if there is no
            direct sun but it is bright, <span className="text-ink-100">Full shade</span> if it is dark.
          </li>
          <li>
            <span className="font-display font-600 text-ink-100">4.</span> Repeat every hour from 9 in the
            morning to 6 in the evening. That is{' '}
            <span className="text-ink-100">{CHECKS_PER_DAY} rounds</span>, {ZONES.length} taps each.
          </li>
          <li>
            <span className="font-display font-600 text-ink-100">5.</span> A day only counts once all{' '}
            {CHECKS_PER_DAY} hours are done. Do{' '}
            <span className="text-ink-100">{SURVEY_DAYS_WANTED} full days</span> before trusting the numbers.
          </li>
        </ol>

        {/**
          * PROGRESS AGAINST THE THING THAT MATTERS — hours finished, not
          * readings collected. "32 readings" sounds like a lot and was four
          * hours of a ten-hour day.
          */}
        <div className="mt-3 rounded-lg border border-space-600 bg-space-900 p-3">
          <p className="text-sm text-ink-300">
            Today:{' '}
            <span className="font-display font-700 text-ink-100">
              {stats.hoursCheckedToday} of {CHECKS_PER_DAY}
            </span>{' '}
            hours checked
            {stats.checksLeftToday > 0 ? (
              <span className="text-ink-500">
                {' '}
                — {stats.checksLeftToday} to go before today counts
              </span>
            ) : (
              <span className="text-signal-green"> — today is a complete survey day</span>
            )}
          </p>
          <p className="mt-1 text-sm text-ink-500">
            Complete days:{' '}
            <span className={stats.completeDays > 0 ? 'text-ink-100' : 'text-signal-amber'}>
              {stats.completeDays} of {SURVEY_DAYS_WANTED}
            </span>{' '}
            · readings so far: <span className="text-ink-100">{stats.totalReadings}</span>
          </p>
          {!stats.hasTrustworthyNumbers && stats.totalReadings > 0 && (
            <p className="mt-1.5 text-xs text-signal-amber">
              Your readings are saved and nothing is lost — but no day is finished yet, so the app will not
              turn them into hours per zone. Finish a full day and the eight numbers appear here and on the
              Build Track.
            </p>
          )}
        </div>
      </div>

      <div className="rounded-xl border border-space-700 bg-space-800 p-4 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-ink-500">Which hour are you logging?</p>
        <div className="mt-2 flex flex-wrap gap-1">
          {HOURS.map((h) => (
            <button
              key={h}
              type="button"
              onClick={() => setHour(h)}
              className={
                'min-h-[36px] rounded-md px-2.5 py-1 text-xs font-display font-600 transition-colors ' +
                (hour === h
                  ? 'bg-signal-cyan/15 text-signal-cyan'
                  : hoursDoneToday.has(h)
                    ? 'text-signal-green hover:text-signal-green'
                    : 'text-ink-300 hover:text-ink-100')
              }
            >
              {/* A tick on hours already logged today, so the next one to do is obvious. */}
              {hoursDoneToday.has(h) ? '✓ ' : ''}
              {hourLabel(h)}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {ZONES.map((zone) => {
          const cls = classFor(zone);
          const logged = doneThisHour(zone);
          return (
            <div key={zone} className="rounded-xl border border-space-700 bg-space-800 p-4 shadow-panel">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-display text-base font-700 text-ink-100">Zone {zone}</p>
                  {/**
                    * Says what was actually measured. "3 direct of 4 checked"
                    * is a fact; "3.0 h/day" from a four-hour day was not.
                    */}
                  <p className="text-xs text-ink-500">
                    {tally[zone].direct} direct of {tally[zone].checked} checked
                    {cls.known ? (
                      <>
                        {' · '}
                        <span className="text-ink-100">{tally[zone].hoursPerDay.toFixed(1)} h/day</span>
                      </>
                    ) : null}
                    {' · '}
                    <span className={cls.tone}>{cls.label}</span>
                  </p>
                </div>
                {logged && (
                  <span className="flex-none rounded-full border border-signal-green/40 bg-signal-green/10 px-2 py-1 text-xs font-display text-signal-green">
                    logged
                  </span>
                )}
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {CONDITIONS.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    title={c.hint}
                    onClick={() => record(zone, c.id)}
                    disabled={saving === zone + c.id}
                    className="min-h-[36px] rounded-lg border border-space-600 px-3 py-1.5 text-xs font-display font-600 text-ink-300 transition hover:border-signal-cyan/50 hover:text-ink-100"
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-xs text-ink-600">
        A zone under about 2 hours cannot grow food — and that is a finding, not a failure. Give it the
        watering can and the spare buckets, and stop asking it to grow things.
      </p>
    </div>
  );
}
