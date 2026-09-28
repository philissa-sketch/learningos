import { useMemo } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import { ladderState, PASS_MARK } from '../../lib/gradeLadder.js';

/**
 * =============================================================================
 * THE LADDER, FOR THE GROWN-UP: WHERE HE IS, AND WHAT IS WAITING ON HER.
 * =============================================================================
 *
 * WHY THIS EXISTS. (Sept 28, 2026.)
 *
 * The student's board shows one shut door and the sentence that opens it. That
 * is the right amount for him. It is not enough for her, because two of the
 * things that stop the ladder are HERS to clear, not his:
 *
 *   - a cumulative test he has sat that nobody has graded yet
 *   - a test he sat and did not pass, which he is allowed to take again
 *
 * A gate that silently waits on an adult's backlog is worse than no gate. So
 * anything the parent has to act on is stated as her action, in her words, on
 * her screen.
 *
 * ---- WHY NO SUBJECT IS NAMED HERE ----
 *
 * It takes the subject as a prop and renders whatever levels the data has. A
 * school with different levels, or a different subject worth gating, mounts
 * the same card.
 */

const STATE_WORDS = {
  passed: { label: 'Passed', tone: 'text-signal-green' },
  'below-pass': { label: 'Not yet passed', tone: 'text-signal-amber' },
  'awaiting-grade': { label: 'Waiting on your grade', tone: 'text-signal-amber' },
  'not-started': { label: 'Not attempted', tone: 'text-ink-500' },
  missing: { label: 'No challenge for this level', tone: 'text-ink-600' }
};

export function GradeLadderCard({ subject, title = 'Grade level ladder', note = null }) {
  const allRows = useAppStore((s) => s.khanAcademyAssignments);
  const rungs = useMemo(
    () => ladderState((allRows || []).filter((r) => r.subject === subject)),
    [allRows, subject]
  );

  if (rungs.length === 0) return null;

  /** Anything she has to do, gathered first — this is the part she came for. */
  const needsHer = rungs.filter((r) => r.challengeState === 'awaiting-grade');
  const retakes = rungs.filter((r) => r.challengeState === 'below-pass');

  return (
    <div className="rounded-xl border border-space-700 bg-space-900 p-4 shadow-panel">
      <p className="font-display text-xs font-700 uppercase tracking-widest text-signal-cyan">{title}</p>
      {note && <p className="mt-1 text-xs leading-relaxed text-ink-400">{note}</p>}

      {needsHer.length > 0 && (
        <div className="mt-3 rounded-lg border border-signal-amber/50 bg-signal-amber/10 px-3 py-2">
          <p className="font-display text-xs font-700 text-signal-amber">Waiting on you</p>
          <p className="mt-0.5 text-xs leading-relaxed text-ink-200">
            {needsHer.map((r) => r.level).join(', ')} — he has sat the Course Challenge and it has no
            grade yet. Everything above it is locked until you enter one.
          </p>
        </div>
      )}

      {retakes.length > 0 && (
        <div className="mt-2 rounded-lg border border-space-700 bg-space-950 px-3 py-2">
          <p className="text-xs leading-relaxed text-ink-300">
            {retakes.map((r) => r.level).join(', ')} — scored under {PASS_MARK}%. He can take it again;
            nothing is lost by retaking it.
          </p>
        </div>
      )}

      <div className="mt-3 space-y-1.5">
        {rungs.map((r) => {
          const word = STATE_WORDS[r.challengeState] || STATE_WORDS.missing;
          const pct = r.units > 0 ? Math.round((r.done / r.units) * 100) : 0;
          return (
            <div
              key={r.level}
              className={
                'rounded-lg border px-3 py-2 '
                + (r.locked ? 'border-space-800 bg-space-950/60' : 'border-space-700 bg-space-950')
              }
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-2">
                <p className={'font-display text-sm font-700 ' + (r.locked ? 'text-ink-500' : 'text-ink-100')}>
                  {r.locked && <span aria-hidden="true">▨ </span>}
                  {r.level}
                </p>
                <p className="text-xs text-ink-500">
                  {r.done} of {r.units} units
                </p>
              </div>

              {/* Honest at zero: an empty frame, never a minimum sliver. */}
              <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-space-800">
                {pct > 0 && (
                  <div
                    className={'h-full rounded-full ' + (pct >= 100 ? 'bg-signal-green' : 'bg-signal-cyan')}
                    style={{ width: `${pct}%` }}
                  />
                )}
              </div>

              <p className={'mt-1 text-[11px] ' + word.tone}>
                Course Challenge: {word.label}
                {r.challenge && typeof r.challenge.gradePercent === 'number'
                  ? ` · ${r.challenge.gradePercent}%`
                  : ''}
              </p>
              {r.locked && r.opensWhen && (
                <p className="mt-0.5 text-[11px] leading-relaxed text-ink-600">{r.opensWhen}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
