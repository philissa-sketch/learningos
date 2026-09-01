import { useAppStore } from '../../store/useAppStore.js';
import { todayDateStr } from '../../lib/scheduler.js';
import {
  timeOnTask,
  subjectMomentum,
  masteryPace,
  readingRollup,
  habitConsistency,
  wellnessSummary,
  slowestLessons,
  UNANSWERED_QUESTIONS
} from '../../lib/learningAnalytics.js';
import { academyContent } from '../../content/academyContent.js';

const { allLessons } = academyContent().lessons;
const { SUBJECT_LABELS } = academyContent().subjects;

/**
 * Learning Analytics Dashboard — PROJECT_PLAN.md Part 8.
 *
 * A step past the Report Card: coaching questions rather than a
 * scoreboard. What is improving, how fast he is moving, where the time
 * actually goes, whether the habits are holding.
 *
 * TWO THINGS THIS COMPONENT REFUSES TO DO, both deliberate:
 *
 *   1. It never merges app-measured minutes with parent-entered ones.
 *      They are different kinds of evidence — one observed, one asserted
 *      — and blending them would make the record look more precise than
 *      it is.
 *   2. It states the questions it cannot answer instead of quietly
 *      dropping them. A dashboard missing something she was promised is
 *      indistinguishable from one that forgot, and "not yet, here's what
 *      it would take" is worth more than a chart that implies an answer.
 */
export function LearningAnalyticsSection() {
  const lessonProgress = useAppStore((s) => s.lessonProgress);
  const allAttendance = useAppStore((s) => s.allAttendance);
  const readingLog = useAppStore((s) => s.readingLog);
  const peDailyLog = useAppStore((s) => s.peDailyLog);
  const peWorkoutLog = useAppStore((s) => s.peWorkoutLog);
  const peBodyMetrics = useAppStore((s) => s.peBodyMetrics);
  const getAllSubjectsForRecordkeeping = useAppStore((s) => s.getAllSubjectsForRecordkeeping);

  const today = todayDateStr();
  const subjects = getAllSubjectsForRecordkeeping();

  const time = timeOnTask(allAttendance, 28, today);
  const momentum = subjectMomentum({ allLessons, lessonProgress, subjects, today });
  const pace = masteryPace({ lessonProgress, today });
  const reading = readingRollup({ readingLog, today });
  const habits = habitConsistency({ allAttendance, today });
  const wellness = wellnessSummary({ peDailyLog, peWorkoutLog, peBodyMetrics, today });
  const slowest = slowestLessons({ allLessons, lessonProgress });

  const hasAnyData = time.total > 0 || pace.totalMastered > 0 || habits.daysWorked > 0;

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Analytics</p>
        <h3 className="mt-1 font-display text-lg font-700 text-ink-100">Learning Analytics</h3>
        <p className="mt-2 text-sm text-ink-300">
          The Report Card says how he’s doing. This says which way he’s moving — what’s speeding up, where the
          time goes, and whether the habits are holding. Last four weeks unless noted.
        </p>
      </div>

      {!hasAnyData && (
        <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
          <p className="text-sm text-ink-300">
            Nothing to analyze yet — this fills in as he works. Trends need a few weeks before they mean
            anything, so expect this to be worth reading around October rather than next Monday.
          </p>
        </div>
      )}

      {hasAnyData && (
        <>
          {/* Time on task — the two sources, never merged. */}
          <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
            <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Time on task</p>
            <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Stat
                label="Measured in the app"
                value={`${Math.round(time.measured / 60)}h`}
                note="Foreground time only"
              />
              <Stat
                label="You recorded"
                value={`${Math.round(time.recorded / 60)}h`}
                note="Khan, books, PE, trips"
                tone="amber"
              />
              <Stat
                label="Average school day"
                value={`${Math.floor(time.avgPerActiveDay / 60)}h ${time.avgPerActiveDay % 60}m`}
                note={`Across ${time.activeDays} active days`}
              />
            </div>
            <p className="mt-3 text-xs text-ink-600">
              These two are kept apart on purpose. One is what the app watched happen; the other is what you
              told it happened. Blending them would make the record look more precise than it is.
            </p>
          </div>

          {/* Momentum. */}
          <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
            <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Momentum</p>
            <h4 className="mt-1 font-display text-base font-700 text-ink-100">Which Subject Is Speeding Up</h4>
            <p className="mt-1 text-xs text-ink-500">
              Lessons mastered in the last 4 weeks against the 4 weeks before. Subjects with no activity either
              way are left out.
            </p>
            {momentum.length === 0 ? (
              <p className="mt-3 text-sm text-ink-500">No mastered lessons in the last eight weeks yet.</p>
            ) : (
              <div className="mt-3 space-y-1.5">
                {momentum.map((row) => (
                  <div key={row.subject} className="flex items-center justify-between gap-2 text-sm">
                    <span className="min-w-0 truncate text-ink-300">
                      {SUBJECT_LABELS[row.subject] || row.subject}
                      <span className="ml-2 text-xs text-ink-600">
                        {row.masteredTotal}/{row.totalLessons} overall
                      </span>
                    </span>
                    <span
                      className={
                        'flex-none font-display font-700 ' +
                        (row.change > 0
                          ? 'text-signal-green'
                          : row.change < 0
                            ? 'text-signal-amber'
                            : 'text-ink-500')
                      }
                    >
                      {row.prior} → {row.recent}
                      {row.change > 0 ? ` (+${row.change})` : row.change < 0 ? ` (${row.change})` : ''}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pace. */}
          <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
            <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Pace</p>
            <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Stat label="Mastered, 8 weeks" value={String(pace.totalMastered)} />
              <Stat label="Typical week" value={String(pace.avgPerActiveWeek)} note="Weeks he worked" />
              <Stat label="Best week" value={String(pace.bestWeek)} />
            </div>
            <div className="mt-3 flex items-end gap-1">
              {pace.byWeek.map((week) => {
                const height = pace.bestWeek ? Math.max(4, (week.mastered / pace.bestWeek) * 48) : 4;
                return (
                  <div key={week.weekStart} className="flex flex-1 flex-col items-center gap-1">
                    <div
                      className="w-full rounded-t bg-signal-cyan/60"
                      style={{ height: `${height}px` }}
                      title={`${week.weekStart}: ${week.mastered}`}
                    />
                    <span className="text-[9px] text-ink-600">{week.weekStart.slice(5)}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Habits + reading. */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
              <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Consistency</p>
              <p className="mt-2 font-display text-3xl font-700 text-signal-cyan">
                {habits.daysWorked}
                <span className="text-base font-400 text-ink-500"> / {habits.schoolDays}</span>
              </p>
              <p className="mt-1 text-xs text-ink-500">
                School days worked in the last 4 weeks ({habits.pct}%). Weekends aren’t counted — this is a
                4+1 week, and marking Saturdays as missed would make a good week look bad.
              </p>
            </div>

            <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
              <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Reading</p>
              {reading.sessions === 0 ? (
                <p className="mt-2 text-sm text-ink-500">Nothing logged in the last 4 weeks.</p>
              ) : (
                <>
                  <p className="mt-2 font-display text-3xl font-700 text-signal-cyan">
                    {Object.entries(reading.byUnit)
                      .map(([unit, amount]) => `${amount} ${unit}`)
                      .join(' · ')}
                  </p>
                  <p className="mt-1 text-xs text-ink-500">
                    {reading.sessions} sessions across {reading.daysWithReading} days · {reading.booksTouched}{' '}
                    {reading.booksTouched === 1 ? 'book' : 'books'}. Units aren’t converted into each other —
                    there’s no honest exchange rate between a page and a chapter.
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Wellness — the previously blocked half. */}
          <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
            <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">
              Exercise &amp; Nutrition
            </p>
            {wellness.daysLogged === 0 && wellness.workouts === 0 ? (
              <p className="mt-2 text-sm text-ink-500">
                Nothing logged in the last 4 weeks. These fill in from the PE &amp; Nutrition tab.
              </p>
            ) : (
              <>
                <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <Stat label="Workouts" value={String(wellness.workouts)} />
                  <Stat
                    label="Avg protein"
                    value={wellness.avgProteinG ? `${wellness.avgProteinG}g` : '—'}
                    tone="amber"
                  />
                  <Stat label="Avg sleep" value={wellness.avgSleepHours ? `${wellness.avgSleepHours}h` : '—'} />
                  <Stat
                    label="Avg active"
                    value={wellness.avgActivityMinutes ? `${wellness.avgActivityMinutes}m` : '—'}
                  />
                </div>
                <p className="mt-3 text-xs text-ink-600">
                  Averaged across the {wellness.daysLogged} days actually logged, not across all 28. An average
                  over blank days would read as “he ate badly” when it means “nothing was written down,” and
                  those need very different responses.
                </p>
                {wellness.firstMetric && wellness.latestMetric && (
                  <p className="mt-2 text-xs text-ink-500">
                    Check-ins: {wellness.firstMetric.date} → {wellness.latestMetric.date}
                  </p>
                )}
              </>
            )}
          </div>

          {/* Duration, once there's any. */}
          {slowest.length > 0 && (
            <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
              <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">
                Longest lessons
              </p>
              <p className="mt-1 text-xs text-ink-500">
                Total time across all attempts. Only covers lessons done since August 6, 2026, when timing
                started.
              </p>
              <div className="mt-3 space-y-1.5">
                {slowest.map((row) => (
                  <div key={row.id} className="flex items-center justify-between gap-2 text-sm">
                    <span className="min-w-0 truncate text-ink-300">
                      {row.title}
                      <span className="ml-2 text-xs text-ink-600">
                        {SUBJECT_LABELS[row.subject] || row.subject}
                      </span>
                    </span>
                    <span className="flex-none font-display font-700 text-signal-cyan">
                      {row.minutes}m
                      {row.attempts > 1 ? ` · ${row.attempts} tries` : ''}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* What this can't tell you — stated, not omitted. */}
      <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-ink-500">What this can’t tell you</p>
        <p className="mt-1 text-xs text-ink-500">
          Four questions worth asking that this dashboard doesn’t answer, and why — better than quietly leaving
          them out.
        </p>
        <div className="mt-3 space-y-2">
          {UNANSWERED_QUESTIONS.map((item) => (
            <div key={item.id} className="rounded-lg border border-space-700 bg-space-900 px-3 py-2.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-display text-sm font-700 text-ink-300">{item.question}</p>
                <span className="flex-none rounded-full border border-space-600 px-2 py-0.5 text-[10px] font-display uppercase tracking-widest text-ink-500">
                  {item.status}
                </span>
              </div>
              <p className="mt-1 text-xs text-ink-600">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, note, tone }) {
  return (
    <div className="rounded-lg border border-space-700 bg-space-900 p-4">
      <p className="text-xs font-display uppercase tracking-widest text-ink-500">{label}</p>
      <p
        className={
          'mt-1 font-display text-2xl font-700 ' +
          (tone === 'amber' ? 'text-signal-amber' : 'text-signal-cyan')
        }
      >
        {value}
      </p>
      {note && <p className="mt-1 text-xs text-ink-600">{note}</p>}
    </div>
  );
}
