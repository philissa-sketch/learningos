import { useState } from 'react';
import { gradeColor, parseScore, percentToLetter, GRADE_SCALE } from '../../lib/gradeScale.js';

/**
 * The grading controls, in ONE place.
 *
 * Extracted Aug 7 2026 when the parent asked for everything gradeable to
 * appear on the Mission Control Board: "for anything I have to grade can it
 * appear there so I won't have to search for it?"
 *
 * That means the same two controls now render on two screens — the Khan
 * Academy section and the board. A second copy would drift, and this project
 * has already been bitten by exactly that (a Khan subject list that existed in
 * two places and silently disagreed for a day). So they live here and both
 * screens import them.
 */

/**
 * Type what Khan actually shows — 9/11 or 82 — and the percentage and letter
 * appear beside it AS SHE TYPES, before she commits.
 *
 * THE FRACTION IS THE POINT (Aug 10, 2026). The parent: "the grades for Kahn
 * Academy are in fractions not percentage. So is there a way that i put the
 * fractions in and the app creates the percentage and letter grade?" Khan
 * reports a unit test as 9/11 or 8/10 and the denominator changes from unit to
 * unit, so every grade she entered used to start with mental arithmetic she
 * had to get right. 9/11 is 82%, not 90% — a whole letter, on a record she
 * keeps for years.
 *
 * The fraction is stored as well as the percentage. It is what a transcript
 * reviewer can check against Khan's own screen, and "9/11" says something
 * "82%" does not: the test had eleven questions.
 */
export function PercentGradeInput({ id, label, percent, raw = null, onCommit, compact = false }) {
  const stored = percent ?? null;
  // Seed with the fraction she typed, so re-opening a graded row shows 9/11
  // rather than silently replacing it with 82.
  const initial = raw || (stored === null ? '' : String(stored));
  const [draft, setDraft] = useState(initial);
  const [saved, setSaved] = useState(false);
  const [lastStored, setLastStored] = useState(stored);

  // Follow the row if it changes underneath (an import, a reset, another tab)
  // — but never clobber a value she is in the middle of typing.
  if (stored !== lastStored) {
    setLastStored(stored);
    setDraft(initial);
  }

  const score = parseScore(draft);
  const parsed = score === null ? null : score.percent;
  const liveLetter = parsed === null ? null : percentToLetter(parsed);
  const invalid = draft.trim() !== '' && parsed === null;
  const isFraction = Boolean(score && score.raw);
  const dirty = !invalid && (parsed !== stored || (score && score.raw) !== (raw || null));

  const commit = () => {
    if (invalid || !dirty) return;
    onCommit(parsed, score ? score.raw : null);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1400);
  };

  return (
    <div className="flex flex-none items-center gap-2">
      <label className="sr-only" htmlFor={id}>{label}</label>
      <div className="flex items-center">
        <input
          id={id}
          type="text"
          inputMode="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => {
            if (e.key === 'Enter') { e.preventDefault(); commit(); e.target.blur(); }
            if (e.key === 'Escape') setDraft(initial);
          }}
          placeholder="9/11"
          title="Type Khan's fraction (9/11) or a percentage (82)"
          aria-invalid={invalid || undefined}
          className={
            'w-20 rounded-md border bg-space-950 px-2 py-1 text-right font-display text-sm text-ink-100 outline-none transition ' +
            (invalid ? 'border-signal-red' : dirty ? 'border-signal-amber' : 'border-space-600 focus:border-signal-cyan')
          }
        />
      </div>

      {/* The percentage it worked out to, shown only when she typed a fraction
          — the arithmetic she no longer has to do, visible so she can catch a
          mistyped denominator before it is saved. */}
      <span className="w-12 flex-none text-right font-display text-xs text-ink-500" aria-live="polite">
        {isFraction && parsed !== null ? `${parsed}%` : parsed !== null ? '%' : ''}
      </span>

      <span
        className={'w-9 text-center font-display text-lg font-700 ' + (liveLetter ? gradeColor(liveLetter) : 'text-ink-700')}
        aria-live="polite"
      >
        {liveLetter || '—'}
      </span>

      {!compact && (
        <span className="w-12 flex-none text-[10px] font-display uppercase tracking-widest">
          {invalid ? <span className="text-signal-red">9/11 or 82</span>
            : saved ? <span className="text-signal-green">Saved</span>
            : dirty ? <span className="text-signal-amber">Tab</span>
            : null}
        </span>
      )}
    </div>
  );
}

/**
 * Letter picker, for work that has no percentage — a Writing Journal entry, a
 * book report scored against a rubric. Uses the same thirteen-band scale as
 * the percentage input so a B+ means the same thing on both screens.
 */
const PICKER_LETTERS = GRADE_SCALE.map((b) => b.letter);

export function LetterGradePicker({ grade, onPick }) {
  const [open, setOpen] = useState(false);

  if (grade && !open) {
    return (
      <span className="flex flex-none items-center gap-2">
        <span className={'font-display text-lg font-700 ' + gradeColor(grade)}>{grade}</span>
        <button type="button" onClick={() => setOpen(true)} className="text-xs text-ink-500 underline hover:text-ink-100">
          Change
        </button>
      </span>
    );
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex-none rounded-lg bg-signal-cyan px-3 py-1 text-xs font-display font-700 text-space-950 transition hover:brightness-110"
      >
        Set grade
      </button>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-1">
      {PICKER_LETTERS.map((g) => (
        <button
          key={g}
          type="button"
          onClick={() => { onPick(g); setOpen(false); }}
          className={
            'rounded-md border border-space-600 bg-space-900 px-1.5 py-1 text-xs font-display font-700 transition hover:border-signal-cyan ' +
            gradeColor(g)
          }
        >
          {g}
        </button>
      ))}
      <button type="button" onClick={() => setOpen(false)} className="ml-1 text-xs text-ink-500 underline hover:text-ink-100">
        Cancel
      </button>
    </div>
  );
}
