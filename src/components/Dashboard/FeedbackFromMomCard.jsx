import { useMemo, useState } from 'react';
import { useAppStore } from '../../store/useAppStore.js';

/**
 * WHAT HE WROTE, AND WHAT CAME BACK (audit MISSING 1, built Aug 9 2026).
 *
 * ---- THE LOOP THAT DID NOT CLOSE ----
 *
 * "Explain this to Commander Nova in your own words" is the one place in the
 * whole platform where he is asked to think out loud rather than pick an
 * answer. It runs at lesson beats, at the end of both signature games, and on
 * the Social Studies Q4 short-answer question.
 *
 * Three things were wrong with what happened next, and together they meant
 * nobody was on the other end:
 *
 *   1. The table was not in the export, so on two computers his writing could
 *      never reach her grading queue at all. (Fixed in the store.)
 *   2. Even on one computer, all that came back was a letter grade — and a B
 *      on "explain how a wing makes lift" tells a twelve-year-old nothing.
 *      (Fixed: she can now write a line back.)
 *   3. There was no screen where he would ever see it. Nothing rendered a
 *      graded reflection to the student, so the reply had nowhere to land.
 *      That is this card.
 *
 * ---- WHY GRADED-ONLY, NEWEST FIRST ----
 *
 * Ungraded reflections are not news to him; he wrote them. This card is for
 * the return leg. Unread ones are marked so a reply she sent last week does
 * not slide past unseen after an import.
 */

const GRADE_STYLE = {
  A: 'border-signal-green/40 bg-signal-green/10 text-signal-green',
  B: 'border-signal-cyan/40 bg-signal-cyan/10 text-signal-cyan',
  C: 'border-signal-amber/40 bg-signal-amber/10 text-signal-amber',
  D: 'border-signal-amber/40 bg-signal-amber/10 text-signal-amber',
  F: 'border-signal-red/40 bg-signal-red/10 text-signal-red'
};

function formatWhen(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

export function FeedbackFromMomCard({ limit = 5 }) {
  const selfExplanations = useAppStore((s) => s.selfExplanations);
  const [expanded, setExpanded] = useState(null);

  const graded = useMemo(
    () =>
      (selfExplanations || [])
        .filter((e) => e.grade)
        .sort((a, b) => String(b.gradedAt || '').localeCompare(String(a.gradedAt || '')))
        .slice(0, limit),
    [selfExplanations, limit]
  );

  if (graded.length === 0) return null;

  const withNotes = graded.filter((e) => e.gradeNote).length;

  return (
    <div className="mt-4 rounded-xl border border-space-700 bg-space-800 p-4 shadow-panel">
      <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">
        What you wrote — and what Mom said
      </p>
      <p className="mt-1 text-xs text-ink-500">
        {withNotes > 0
          ? `${withNotes} of these came back with something written on it.`
          : 'Your explanations, graded. Tap one to read it back.'}
      </p>

      <div className="mt-3 space-y-2">
        {graded.map((e) => {
          const open = expanded === e.id;
          const letter = String(e.grade || '').charAt(0).toUpperCase();
          return (
            <div key={e.id} className="rounded-lg border border-space-700 bg-space-900 px-3 py-2">
              <button
                type="button"
                onClick={() => setExpanded(open ? null : e.id)}
                className="flex w-full items-start justify-between gap-3 text-left"
              >
                <span className="min-w-0">
                  <span className="block truncate text-sm text-ink-100">
                    {e.beatLabel || 'Explained it to Commander Nova'}
                  </span>
                  <span className="block text-[11px] text-ink-500">
                    {formatWhen(e.completedAt)}
                    {e.gradeNote ? ' · she wrote back' : ''}
                  </span>
                </span>
                <span
                  className={
                    'flex-none rounded-full border px-2 py-0.5 font-display text-xs font-700 ' +
                    (GRADE_STYLE[letter] || 'border-space-600 text-ink-300')
                  }
                >
                  {e.grade}
                </span>
              </button>

              {open && (
                <div className="mt-2 border-t border-space-700 pt-2">
                  <p className="text-[10px] font-display uppercase tracking-widest text-ink-500">
                    What you wrote
                  </p>
                  <p className="mt-0.5 whitespace-pre-wrap text-sm text-ink-300">{e.text}</p>
                </div>
              )}

              {/* The note shows WITHOUT expanding. It is the shortest thing
                  here and the only part that is new to him — burying a reply
                  behind a tap is how a reply goes unread. */}
              {e.gradeNote && (
                <p className="mt-2 rounded-md border border-signal-green/30 bg-signal-green/5 px-2 py-1.5 text-sm text-signal-green">
                  {e.gradeNote}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
