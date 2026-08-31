import { useAppStore } from '../../store/useAppStore.js';
import { subjectCardLabel } from '../../academies/lamar/subjects.js';

/**
 * The student's own grades, on the Progress tab.
 *
 * Built August 6, 2026 at the parent's request — and it closes a gap I
 * created earlier the same day. Locking the Parent Dashboard behind a
 * passcode was right, but the report card lived there and nowhere else,
 * so the only screen showing Lamar his grades became the one screen he
 * could not open. A lock that also hides a kid's grades from him is a
 * bug, not a feature.
 *
 * READ-ONLY, and only his own numbers. No compliance records, no admin
 * records, no notes, nothing editable. It answers "how am I doing"
 * without opening a door back into his mother's records.
 *
 * SUBJECTS HE HASN'T STARTED ARE OMITTED rather than shown as "not yet
 * graded" — a wall of blank rows on day one reads as failure, which is
 * the opposite of what a progress screen is for.
 */
export function StudentGradesCard() {
  const getReportCardData = useAppStore((s) => s.getReportCardData);
  // `assessedCount`, not `attemptedCount` -- Math, Science and Language Arts
  // are taught on Khan Academy this year, so he attempts no Mission Control
  // lessons in them and this screen hid all three of his main subjects.
  const rows = getReportCardData().filter((row) => row.assessedCount > 0);

  if (rows.length === 0) {
    return (
      <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Your Grades</p>
        <p className="mt-2 text-sm text-ink-300">
          Finish a few lessons and your grades show up here.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
      <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Your Grades</p>
      <p className="mt-1 text-xs text-ink-500">
        Every subject you&rsquo;ve started &mdash; from the lessons you&rsquo;ve finished and the Khan Academy units
        your mom has graded.
      </p>

      <div className="mt-3 space-y-2">
        {rows.map((row) => (
          <div key={row.subject} className="rounded-lg border border-space-700 bg-space-900 px-3 py-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-display font-700 text-ink-100">{subjectCardLabel(row.subject)}</span>
              <span className={'font-display text-lg font-700 ' + gradeColor(row.averageAccuracy)}>
                {row.letterGrade}
                <span className="ml-1.5 text-xs font-400 text-ink-500">
                  {Math.round(row.averageAccuracy * 100)}%
                </span>
              </span>
            </div>
            <p className="mt-0.5 text-xs text-ink-500">
              {row.attemptedCount > 0 && `${row.mastered} of ${row.totalLessons} lessons mastered`}
              {row.attemptedCount > 0 && row.khanGradedCount > 0 && ' · '}
              {row.khanGradedCount > 0 &&
                `${row.khanGradedCount} Khan unit${row.khanGradedCount === 1 ? '' : 's'} graded`}
            </p>

            {/*
              The strand split, same as his mother sees. Worth showing him
              directly: a boy who can watch the weaker half move is far
              more likely to work on it than one handed a single blended
              letter that never seems to budge.
            */}
            {row.strands.length > 0 && (
              <div className="mt-2 space-y-1 border-t border-space-700 pt-2">
                {row.strands.map((strand) => (
                  <div key={strand.id} className="flex items-center justify-between gap-2 text-sm">
                    <span className="text-ink-400">
                      {strand.label}
                      {/* Says where the number came from, since one half of ELA
                          is Khan units this year and the other half is not. */}
                      {strand.khanGradedCount > 0 && (
                        <span className="ml-1.5 text-[10px] uppercase tracking-widest text-signal-cyan">Khan</span>
                      )}
                    </span>
                    {strand.letterGrade ? (
                      <span className={'font-display font-700 ' + gradeColor(strand.averageAccuracy)}>
                        {strand.letterGrade} · {Math.round(strand.averageAccuracy * 100)}%
                      </span>
                    ) : (
                      <span className="text-xs text-ink-600">Not started</span>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/*
              Named, not scored-and-hidden. "Grammar Mechanics 65%" is
              something he can go and fix tonight; "your grade is a B" is
              not. Capped at three so it reads as a to-do list rather than
              a list of everything wrong with him.
            */}
            {row.needsAttention.length > 0 && (
              <div className="mt-2 border-t border-space-700 pt-2">
                <p className="text-[10px] font-display uppercase tracking-widest text-signal-amber">
                  Worth another pass
                </p>
                <ul className="mt-1 space-y-0.5">
                  {row.needsAttention.slice(0, 3).map((lesson) => (
                    <li key={lesson.lessonId} className="flex items-center justify-between gap-2 text-xs">
                      <span className="min-w-0 truncate text-ink-400">{lesson.title}</span>
                      <span className="flex-none text-signal-amber">
                        {Math.round(lesson.bestAccuracy * 100)}%
                      </span>
                    </li>
                  ))}
                </ul>
                {row.needsAttention.length > 3 && (
                  <p className="mt-1 text-[10px] text-ink-600">
                    and {row.needsAttention.length - 3} more
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <p className="mt-3 text-xs text-ink-600">
        Retaking a lesson keeps your best score, so another try can only help.
      </p>
    </div>
  );
}

function gradeColor(accuracy) {
  if (accuracy >= 0.8) return 'text-signal-green';
  if (accuracy >= 0.7) return 'text-signal-amber';
  return 'text-signal-red';
}
