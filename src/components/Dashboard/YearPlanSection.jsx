import { useState } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import { todayDateStr, parseDateStr } from '../../lib/scheduler.js';
import { buildYearPlan, buildSemesterPlan, yearProgress, benchmarkGrowth } from '../../lib/yearPlan.js';
import { PacingSection } from './PacingSection.jsx';
import { academyContent } from '../../content/academyContent.js';

const { allLessons = [] } = academyContent().lessons;
const { SUBJECT_LABELS = {} } = academyContent().subjects;

/**
 * Annual and semester planner — PROJECT_PLAN.md Part 8.
 *
 * Two zoom levels on one page rather than two features, because they are
 * the same data at different resolutions and building them apart would
 * mean two places to fix when a date changes.
 *
 * NOTHING HERE IS EDITABLE, and that is the design. A planner that has
 * to be maintained is a planner that is wrong by October — she runs a
 * business and is not going to keep two calendars in sync. Every number
 * below is derived from work already recorded elsewhere, so it cannot go
 * stale. The value is seeing the year at once, not typing it in.
 */
export function YearPlanSection() {
  const [zoom, setZoom] = useState('year');

  const lessonProgress = useAppStore((s) => s.lessonProgress);
  const academicAssignments = useAppStore((s) => s.academicAssignments);
  const academicBooks = useAppStore((s) => s.academicBooks);
  const missionEvaluations = useAppStore((s) => s.missionEvaluations);
  const allAttendance = useAppStore((s) => s.allAttendance);
  const khanAcademyAssignments = useAppStore((s) => s.khanAcademyAssignments);
  const adminRecords = useAppStore((s) => s.adminRecords);

  const today = todayDateStr();
  const plan = buildYearPlan({
    today,
    allLessons,
    lessonProgress,
    academicAssignments,
    academicBooks,
    missionEvaluations,
    allAttendance,
    khanAcademyAssignments
  });
  const semesters = buildSemesterPlan(plan);
  const progress = yearProgress(plan, today);
  const benchmarks = benchmarkGrowth(adminRecords);

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Planning</p>
        <h3 className="mt-1 font-display text-lg font-700 text-ink-100">The Year at a Glance</h3>
        <p className="mt-2 text-sm text-ink-300">
          Built from what’s already recorded — lessons, assignments, books, missions and attendance. Nothing
          here needs maintaining, which is the point: a planner you have to keep updating is wrong by October.
        </p>

        <div className="mt-3 flex flex-wrap gap-1 rounded-lg bg-space-900 p-1">
          {[
            { id: 'year', label: 'By Quarter' },
            { id: 'semester', label: 'By Semester' },
            /**
             * A THIRD ZOOM RATHER THAN A THIRD PANEL BELOW. The other two say
             * what each quarter contains; this says whether the quarter is big
             * enough to hold it — the same data at a different question. Adding
             * it as another card down the page would have made this screen
             * something she scrolls instead of something she reads.
             */
            { id: 'pacing', label: 'Enough days?' }
          ].map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setZoom(option.id)}
              className={
                'rounded-md px-2.5 py-1 text-xs font-display font-600 transition-colors ' +
                (zoom === option.id ? 'bg-signal-cyan/15 text-signal-cyan' : 'text-ink-500 hover:text-ink-100')
              }
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* The 180-day picture. */}
      <div
        className={
          'rounded-xl border p-5 shadow-panel ' +
          (progress.onTrack ? 'border-space-700 bg-space-800' : 'border-signal-amber/50 bg-signal-amber/5')
        }
      >
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Georgia’s 180 days</p>
        <p className="mt-1 font-display text-3xl font-700 text-signal-cyan">
          {progress.logged}
          <span className="text-base font-400 text-ink-500"> / {progress.required}</span>
        </p>
        <p className="mt-1 text-sm text-ink-300">
          {progress.remaining} to go · {progress.schoolDaysLeft} school days left on the calendar
        </p>
        <p className="mt-2 text-xs text-ink-600">
          {progress.onTrack
            ? 'The calendar still holds enough days to reach 180. This is what the year allows, not a prediction — it assumes every remaining school day gets used.'
            : 'The remaining school days no longer add up to 180. Summer sessions or added days would need to close the gap.'}
        </p>
      </div>

      {zoom === 'pacing' && <PacingSection />}
      {zoom === 'year' && plan.map((quarter) => <QuarterCard key={quarter.id} quarter={quarter} />)}
      {zoom === 'semester' &&
        semesters.map((semester) => <SemesterCard key={semester.id} semester={semester} />)}

      {benchmarks.length > 0 && zoom !== 'pacing' && <BenchmarkPanel benchmarks={benchmarks} />}
    </div>
  );
}

const STATUS_STYLE = {
  current: 'border-signal-cyan/50 bg-signal-cyan/5',
  complete: 'border-space-700 bg-space-800',
  upcoming: 'border-space-700 bg-space-800'
};

const STATUS_LABEL = { current: 'In progress', complete: 'Finished', upcoming: 'Ahead' };

function formatSpan(start, end) {
  const fmt = (d) => parseDateStr(d).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  return `${fmt(start)} – ${fmt(end)}`;
}

function QuarterCard({ quarter }) {
  return (
    <div className={'rounded-xl border p-5 shadow-panel ' + (STATUS_STYLE[quarter.status] || '')}>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-xs font-display uppercase tracking-widest text-signal-amber">
            {quarter.id} · {formatSpan(quarter.start, quarter.end)}
          </p>
          <h4 className="mt-1 font-display text-base font-700 text-ink-100">{quarter.label}</h4>
        </div>
        <span className="flex-none rounded-full border border-space-600 px-2 py-0.5 text-[10px] font-display uppercase tracking-widest text-ink-500">
          {STATUS_LABEL[quarter.status]}
        </span>
      </div>

      {/* The single most useful thing this view can surface. */}
      {quarter.hasNoContent && (
        <p className="mt-2 rounded-lg border border-signal-amber/40 bg-signal-amber/5 px-3 py-2 text-xs text-signal-amber">
          No lessons written for this quarter yet. Worth knowing now rather than the week it starts.
        </p>
      )}

      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Metric label="Days logged" value={`${quarter.daysLogged}/${quarter.schoolDays}`} />
        <Metric label="Lessons" value={quarter.lessons ? `${quarter.mastered}/${quarter.lessons}` : '—'} />
        <Metric
          label="Assignments"
          value={quarter.assignments ? `${quarter.assignmentsDone}/${quarter.assignments}` : '—'}
        />
        <Metric label="Books finished" value={String(quarter.booksFinished)} />
      </div>

      {Object.keys(quarter.bySubject).length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {Object.entries(quarter.bySubject).map(([subject, counts]) => (
            <span
              key={subject}
              className="rounded-full border border-space-600 px-2 py-0.5 text-[10px] font-display uppercase tracking-widest text-ink-500"
            >
              {SUBJECT_LABELS[subject] || subject} {counts.mastered}/{counts.total}
            </span>
          ))}
        </div>
      )}

      <p className="mt-3 text-xs text-ink-600">
        {quarter.mission ? (
          <>
            <span className="text-ink-400">Mission: </span>
            {quarter.mission.title}
            {quarter.mission.score ? ` · ${quarter.mission.score}` : ''}
            {quarter.mission.approved ? ' · final' : ' · not finalized'}
          </>
        ) : (
          'No mission chosen for this quarter yet.'
        )}
      </p>
    </div>
  );
}

function SemesterCard({ semester }) {
  return (
    <div className={'rounded-xl border p-5 shadow-panel ' + (STATUS_STYLE[semester.status] || '')}>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-xs font-display uppercase tracking-widest text-signal-amber">
            {formatSpan(semester.start, semester.end)}
          </p>
          <h4 className="mt-1 font-display text-base font-700 text-ink-100">{semester.label}</h4>
        </div>
        <span className="flex-none rounded-full border border-space-600 px-2 py-0.5 text-[10px] font-display uppercase tracking-widest text-ink-500">
          {STATUS_LABEL[semester.status]}
        </span>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Metric label="Days logged" value={`${semester.daysLogged}/${semester.schoolDays}`} />
        <Metric label="Lessons" value={semester.lessons ? `${semester.mastered}/${semester.lessons}` : '—'} />
        <Metric
          label="Assignments"
          value={semester.assignments ? `${semester.assignmentsDone}/${semester.assignments}` : '—'}
        />
        <Metric label="Missions final" value={`${semester.missionsApproved}/${semester.quarters.length}`} />
      </div>

      <p className="mt-3 text-xs text-ink-600">
        {semester.quarters.map((q) => `${q.id} ${q.label}`).join(' · ')}
      </p>
    </div>
  );
}

/**
 * Benchmark growth — Part 8's "benchmark assessments."
 *
 * Grouped by test name, because the same instrument twice is the only
 * comparison worth making. Two different tests with different scales are
 * not a trend, and averaging them would invent one.
 */
function BenchmarkPanel({ benchmarks }) {
  return (
    <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
      <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Benchmarks</p>
      <h4 className="mt-1 font-display text-base font-700 text-ink-100">Growth Between Test Dates</h4>
      <p className="mt-1 text-xs text-ink-500">
        Grouped by test name — the same test twice is the only fair comparison. Add scores under Records →
        Standardized Tests.
      </p>

      <div className="mt-3 space-y-2">
        {benchmarks.map((benchmark) => (
          <div key={benchmark.name} className="rounded-lg border border-space-700 bg-space-900 px-3 py-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-display text-sm font-700 text-ink-100">{benchmark.name}</p>
              {benchmark.change === null ? (
                <span className="text-xs text-ink-500">
                  One administration — a second one makes this a trend
                </span>
              ) : (
                <span
                  className={
                    'font-display text-sm font-700 ' +
                    (benchmark.change > 0
                      ? 'text-signal-green'
                      : benchmark.change < 0
                        ? 'text-signal-amber'
                        : 'text-ink-500')
                  }
                >
                  {benchmark.first.score} → {benchmark.latest.score}
                  {benchmark.change > 0 ? ` (+${benchmark.change})` : ''}
                  {benchmark.change < 0 ? ` (${benchmark.change})` : ''}
                  {benchmark.change === 0 ? ' (no change)' : ''}
                </span>
              )}
            </div>
            <p className="mt-1 text-xs text-ink-600">
              {benchmark.points.map((point) => `${point.date}: ${point.score}`).join(' · ')}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div>
      <p className="text-[10px] font-display uppercase tracking-widest text-ink-600">{label}</p>
      <p className="mt-0.5 font-display text-lg font-700 text-ink-100">{value}</p>
    </div>
  );
}
