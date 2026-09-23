import { useAppStore } from '../../store/useAppStore.js';
import { annualReport } from '../../lib/annualReport.js';

/**
 * THE ANNUAL PROGRESS REPORT — the document Georgia asks for.
 *
 * O.C.G.A. § 20-2-690(c) wants a written annual assessment of progress in each
 * of five named subjects, kept for three years. This app has held every input
 * that report needs for months and could not print one.
 *
 * ---- BUILT TO LAMAR'S SHAPE, AND HIS HARD-WON RULE IS THE POINT ----
 *
 * Gigi caught the error in Mission Control herself: its Report Card showed
 * "1/106 mastered · 1%" as though that were a grade, when it measured how much
 * curriculum had been WRITTEN. Coverage is reported here, and it sits in its
 * own line, below the grade, visibly separate — never inside it.
 *
 * ⚠️ NOTHING ON THIS SCREEN IS STORED. Every figure is computed by
 * `annualReport()` at the moment it renders, from her record. A stored report
 * is a number that can drift from the thing it describes, and every hand-typed
 * number in this project has drifted at least once.
 */

const BAND = {
  ok: 'border-sage-700 text-ink-900',
  weak: 'border-clay-500 text-clay-500',
  none: 'border-dashed border-cream-300 text-ink-500'
};

function GradeChip({ grade, percent }) {
  if (!grade) {
    return (
      <span className={`rounded-petal border-2 px-3 py-1 text-sm font-700 ${BAND.none}`}>
        Not yet graded
      </span>
    );
  }
  return (
    <span
      className={`rounded-petal border-2 px-3 py-1 text-sm font-700 tnum ${
        percent >= 70 ? BAND.ok : BAND.weak
      }`}
    >
      {grade} · {percent}%
    </span>
  );
}

export function AnnualReportPanel() {
  const data = {
    strandStates: Object.values(useAppStore((s) => s.strands) || {}),
    khanGrades: useAppStore((s) => s.khanGrades),
    writingMarks: useAppStore((s) => s.writingMarks),
    journalMarks: useAppStore((s) => s.journalMarks),
    attempts: useAppStore((s) => s.attempts),
    // FIXED in LearningOS, Sept 23, 2026: the store keeps lessonReads as an
    // object keyed by lesson id, and annualReport() wants a list — this panel
    // crashed ("lessonReads.map is not a function") the moment she had read a
    // lesson. The same bug is in the standalone app's copy of this file.
    lessonReads: Object.values(useAppStore((s) => s.lessonReads) || {}),
    projects: useAppStore((s) => s.projects),
    scheduleDays: useAppStore((s) => s.scheduleDays),
    scheduleBlocks: useAppStore((s) => s.scheduleBlocks)
  };

  const r = annualReport(data);

  return (
    <div className="space-y-4">
      {/* ---- The header. Printed, so it has to say what it is. ---- */}
      <section className="panel px-5 py-5 print:border-0 print:shadow-none">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="font-display text-lg text-ink-900">Annual Progress Report</h2>
            <p className="mt-1 text-xs text-ink-700">
              {r.term.label} · {r.term.start} to {r.term.end}
            </p>
          </div>
          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-full bg-lavender-500 px-5 py-2 text-sm font-700 text-white hover:bg-lavender-700 print:hidden"
          >
            Print or save as PDF
          </button>
        </div>

        <p className="mt-3 rounded-petal border border-cream-300 bg-cream-100 px-4 py-3 text-xs text-ink-700">
          <span className="font-700">{r.statute.cite}</span> — {r.statute.requires} Keep it on file
          for <span className="font-700">{r.statute.retainYears} years</span>.
          <span className="mt-1 block text-[0.7rem] text-ink-500">
            Generated {r.generatedOn} from her own record. Nothing here is typed in, so nothing here
            can disagree with the data behind it. This is a record of what was taught and what she
            did — it is not legal advice about what the statute requires of you.
          </span>
        </p>
      </section>

      {/* ---- One block per statute subject ---- */}
      {r.subjects.map((s) => (
        <section key={s.statute} className="panel px-5 py-5 print:break-inside-avoid">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="font-display text-base text-ink-900">{s.statute}</h3>
            <GradeChip grade={s.grade} percent={s.percent} />
          </div>

          {s.ungradedReason && (
            <p className="mt-2 text-xs text-clay-500">{s.ungradedReason}</p>
          )}

          {/* ---- INSIDE THIS GRADE — Lamar's own heading, and his note with it.
                  One grade goes on the record; these are what tell you where
                  the time should go. ---- */}
          {s.inside.length > 0 && (
            <div className="mt-3 rounded-petal border border-cream-300 bg-cream-100 px-4 py-3">
              <p className="text-[0.65rem] font-700 uppercase tracking-wide text-ink-500">
                Inside this grade
              </p>
              <ul className="mt-2 space-y-1">
                {s.inside.map((c) => (
                  <li key={c.label} className="flex flex-wrap justify-between gap-2 text-sm">
                    <span className="text-ink-900">
                      {c.label}
                      <span className="ml-2 text-[0.7rem] text-ink-500 tnum">
                        {c.count} result{c.count === 1 ? '' : 's'}
                      </span>
                    </span>
                    <span className="font-700 text-ink-900 tnum">
                      {c.grade} · {c.percent}%
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-[0.7rem] text-ink-500">
                One grade goes on the record. These are what tell you where to spend the time.
              </p>
            </div>
          )}

          {/* ---- COVERAGE AND HOURS. BELOW THE LINE, ALWAYS. ----
                  Kept visibly apart because conflating them with the grade is
                  the exact mistake Gigi caught in Lamar's app: it made the
                  platform's own unfinished state look like the child's
                  failure. ---- */}
          <div className="mt-3 grid gap-2 text-xs text-ink-700 sm:grid-cols-2">
            <p>
              <span className="font-700">Instruction:</span>{' '}
              <span className="tnum">{s.hours.hours}</span> hours logged
            </p>
            <p>
              <span className="font-700">Coverage:</span>{' '}
              {s.coverage.note ? (
                s.coverage.note
              ) : (
                <>
                  <span className="tnum">
                    {s.coverage.lessonsRead} of {s.coverage.lessonsWritten}
                  </span>{' '}
                  lessons read
                  {s.coverage.khanUnitsRecorded > 0 && (
                    <>
                      {' · '}
                      <span className="tnum">{s.coverage.khanUnitsRecorded}</span> Khan units
                      recorded
                    </>
                  )}
                </>
              )}
            </p>
          </div>
          <p className="mt-1 text-[0.65rem] text-ink-500">
            Coverage and hours are reported separately and do not affect the grade.
          </p>
        </section>
      ))}

      {/* ---- Growth. Its own instrument, its own scale. ---- */}
      <section className="panel px-5 py-5 print:break-inside-avoid">
        <h3 className="font-display text-base text-ink-900">Growth — the Check-In</h3>
        <p className="mt-1 text-[0.7rem] text-ink-500">
          Growth is a change on one instrument’s own scale, so it is measured here and nowhere else,
          and it never forms part of a subject grade.
        </p>
        {r.growth.note && <p className="mt-2 text-xs text-clay-500">{r.growth.note}</p>}
        <ul className="mt-3 grid gap-1 sm:grid-cols-3">
          {r.growth.rows.map((row) => (
            <li key={row.strandId} className="text-xs text-ink-700">
              <span className="tnum font-700 text-ink-900">{row.level.toFixed(2)}</span>{' '}
              {row.strandId}
              {!row.settled && <span className="ml-1 text-[0.65rem] text-clay-500">re-measuring</span>}
            </li>
          ))}
        </ul>
      </section>

      {/* ---- Attendance ---- */}
      <section className="panel px-5 py-5 print:break-inside-avoid">
        <h3 className="font-display text-base text-ink-900">Attendance</h3>
        <p className="mt-2 text-sm text-ink-900">
          <span className="tnum font-700">{r.attendance.daysMeetingRequirement}</span> of{' '}
          <span className="tnum">{r.attendance.daysRequired}</span> qualifying days ·{' '}
          <span className="tnum font-700">{r.attendance.hours}</span> of{' '}
          <span className="tnum">{r.attendance.hoursRequired}</span> hours
        </p>
        <p className="mt-1 text-[0.7rem] text-ink-500">
          A qualifying day is one meeting Georgia’s four and a half hours.{' '}
          <span className="tnum">{r.attendance.daysWithWork}</span> day
          {r.attendance.daysWithWork === 1 ? '' : 's'} had school of any length — both numbers are
          shown rather than rounding one into the other.
        </p>
      </section>

      {/* ---- Enrichment: named, never counted as one of the five ---- */}
      {r.enrichment.length > 0 && (
        <section className="panel px-5 py-5 print:break-inside-avoid">
          <h3 className="font-display text-base text-ink-900">Enrichment</h3>
          {r.enrichment.map((e) => (
            <p key={e.id} className="mt-2 text-xs text-ink-700">
              <span className="font-700">{e.label}</span> —{' '}
              <span className="tnum">
                {e.lessonsRead} of {e.lessonsWritten}
              </span>{' '}
              lessons read. {e.note}
            </p>
          ))}
        </section>
      )}

      {/* ---- Needs attention. Specific, and it is the useful half in August. ---- */}
      <section className="panel px-5 py-5 print:break-inside-avoid">
        <h3 className="font-display text-base text-ink-900">Needs attention</h3>
        {r.needsAttention.length === 0 ? (
          <p className="mt-2 text-xs text-ink-700">
            Every subject the statute names has graded work and logged hours against it.
          </p>
        ) : (
          <ul className="mt-2 space-y-2">
            {r.needsAttention.map((n, i) => (
              <li key={`${n.statute}-${i}`} className="text-xs">
                <span className="font-700 text-ink-900">{n.statute}: </span>
                <span className="text-clay-500">{n.what}</span>
                <span className="block text-[0.7rem] text-ink-500">{n.why}</span>
              </li>
            ))}
          </ul>
        )}
        <p className="mt-3 text-[0.7rem] text-ink-500">
          The useful moment to find out a subject has nothing in it is October, not June.
        </p>
      </section>
    </div>
  );
}

export default AnnualReportPanel;
