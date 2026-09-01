import { useAppStore } from '../../store/useAppStore.js';
import { yearPacing, pacingNote, quarterPacingNote, loadBreakdown } from '../../lib/pacing.js';
import { academyContent } from '../../content/academyContent.js';

const { SUBJECT_LABELS } = academyContent().subjects;

/**
 * =============================================================================
 * ENOUGH DAYS? — the arithmetic nobody had done. (Audit item O-3, Aug 26 2026.)
 * =============================================================================
 *
 * The recurring fault in this project, named more than once: **the app knew and
 * the screen never said.** Every number below was computable from day one — the
 * lesson table, the week pattern, the holiday list, the Khan rows — and none of
 * it was ever put on a screen, so the only way to discover that Q2 Technology
 * has nineteen days of work and nine days to do it in was to reach December and
 * run out of Thursdays.
 *
 * It goes here, under the year planner, because it answers the planner's
 * unasked question. The planner says what each quarter CONTAINS. This says
 * whether the quarter is big enough to hold it.
 *
 * NOTHING HERE IS EDITABLE and nothing here moves a lesson. Rebalancing a
 * quarter is her decision — the block order in weekPattern.js is her
 * allocation, and a screen that silently reshuffled it would be taking that
 * away. The job of this panel is to make sure she is never surprised.
 */
export function PacingSection() {
  const khanAcademyAssignments = useAppStore((s) => s.khanAcademyAssignments);

  /**
   * `|| []` rather than a guard clause: the store hydrates to an array, and an
   * empty one is a legitimate answer ("no Khan work assigned"). What pacing.js
   * refuses is `null`/`undefined`, because a missing list makes
   * `liveRotatingSubjects` hand days to subjects that have nothing to teach —
   * which is how the first draft of this reported thirteen spare Aerospace days
   * in a quarter that has none.
   */
  const quarters = yearPacing(khanAcademyAssignments || []);
  const trouble = quarters.filter((q) => !q.fits);
  const tight = quarters.filter((q) => q.fits && q.tight.length > 0);

  return (
    <div className="space-y-4">
      <div
        className={
          'rounded-xl border p-5 shadow-panel ' +
          (trouble.length > 0
            ? 'border-signal-amber/50 bg-signal-amber/5'
            : 'border-space-700 bg-space-800')
        }
      >
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Pacing</p>
        <h3 className="mt-1 font-display text-lg font-700 text-ink-100">
          Does each subject have enough days?
        </h3>
        <p className="mt-2 text-sm text-ink-300">
          The 2:15 rotating block gives Aerospace, Technology, Social Studies and Robotics a fixed number of
          days each quarter. This counts them against the work those subjects are carrying — lessons and Khan
          Academy units both, because both land in the same forty-five minutes.
        </p>
        <p className="mt-2 text-sm text-ink-300">
          {trouble.length > 0 ? (
            <span className="text-signal-amber">
              {trouble.length === 1 ? '1 quarter does' : `${trouble.length} quarters do`} not fit:{' '}
              {trouble.map((q) => q.quarter).join(', ')}. Moving a lesson, dropping a Khan unit or spending the
              open Fridays are the three ways out — this panel will not pick one.
            </span>
          ) : tight.length > 0 ? (
            <>Every quarter fits, but {tight.length === 1 ? 'one has' : `${tight.length} have`} a subject with
            no spare day at all.</>
          ) : (
            <>Every quarter fits with room to spare.</>
          )}
        </p>
        <p className="mt-2 text-xs text-ink-600">
          A Khan unit counts as one day here. It is usually three or four, so where Khan units are in the
          count the real figure is worse than the one shown — never better.
        </p>
      </div>

      {quarters.map((quarter) => (
        <QuarterPacingCard key={quarter.quarterId} quarter={quarter} />
      ))}
    </div>
  );
}

const STATE_STYLE = {
  over: 'text-signal-amber',
  buffered: 'text-signal-cyan',
  tight: 'text-signal-amber',
  idle: 'text-ink-500',
  ok: 'text-signal-green'
};

const STATE_LABEL = {
  over: 'Does not fit',
  buffered: 'Needs Fridays',
  tight: 'No spare day',
  idle: 'Nothing scheduled',
  ok: 'Fits'
};

function QuarterPacingCard({ quarter }) {
  return (
    <div
      className={
        'rounded-xl border p-5 shadow-panel ' +
        (quarter.fits ? 'border-space-700 bg-space-800' : 'border-signal-amber/50 bg-signal-amber/5')
      }
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-xs font-display uppercase tracking-widest text-signal-amber">{quarter.quarterId}</p>
          <h4 className="mt-1 font-display text-base font-700 text-ink-100">{quarter.quarter}</h4>
        </div>
        <span className="flex-none rounded-full border border-space-600 px-2 py-0.5 text-[10px] font-display uppercase tracking-widest text-ink-500">
          {quarter.openDays} open {quarter.openDays === 1 ? 'Friday' : 'Fridays'}
        </span>
      </div>

      <p className="mt-2 text-xs text-ink-400">{quarterPacingNote(quarter)}</p>

      <div className="mt-3 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="text-[10px] font-display uppercase tracking-widest text-ink-600">
              <th className="pb-1 pr-3 font-500">Subject</th>
              <th className="pb-1 pr-3 font-500">Carrying</th>
              <th className="pb-1 pr-3 font-500">Days it owns</th>
              <th className="pb-1 font-500">Verdict</th>
            </tr>
          </thead>
          <tbody>
            {quarter.rows.map((row) => (
              <tr key={row.subject} className="border-t border-space-700 align-top">
                <td className="py-2 pr-3 font-display font-600 text-ink-100">
                  {SUBJECT_LABELS[row.subject] || row.subject}
                </td>
                <td className="py-2 pr-3 text-ink-300">{loadBreakdown(row)}</td>
                <td className="py-2 pr-3 font-display text-ink-100">{row.days}</td>
                <td className={'py-2 font-display font-600 ' + (STATE_STYLE[row.state] || 'text-ink-300')}>
                  {STATE_LABEL[row.state] || row.state}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/**
        * THE SENTENCE IS NOT OPTIONAL. A table of numbers is something she has
        * to interpret at the end of a long day; this app's rule everywhere else
        * is that a figure comes with the sentence that explains it. Only the
        * rows that need attention get one — "Fits" explains itself.
        */}
      <ul className="mt-3 space-y-1.5">
        {quarter.rows
          .filter((row) => row.state !== 'ok')
          .map((row) => (
            <li key={row.subject} className="text-xs text-ink-400">
              <span className="font-display font-600 text-ink-200">
                {SUBJECT_LABELS[row.subject] || row.subject}:
              </span>{' '}
              {pacingNote(row, quarter)}
            </li>
          ))}
      </ul>
    </div>
  );
}
