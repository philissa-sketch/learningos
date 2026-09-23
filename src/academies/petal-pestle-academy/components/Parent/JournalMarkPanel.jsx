import { useState } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import {
  JOURNAL_RUBRIC,
  gradeJournalEntry,
  journalBand
} from '../../data/journal/journalRubric.js';
import { suggestSentenceLevel } from '../../lib/sentenceMechanics.js';

// ---------------------------------------------------------------------------
// MARKING ONE JOURNAL ENTRY.
//
// ---- ⚠️ THIS IS A DELIBERATELY SEPARATE COMPONENT FROM JournalNote ----
//
// "Say something back" is FEEDBACK and must never carry a score — check-writing
// reads that function as text and fails the build if the words score, grade,
// rubric, correct, outOf or percent appear inside it. That assertion is still
// live and still right: Gigi drew the line between feedback and grading herself.
//
// So the mark lives here, in its own function, and the note stays a note. Two
// boxes, two purposes, and neither one quietly becomes the other.
//
// ---- WHAT CHANGED, AND WHOSE DECISION IT WAS ----
//
// The journal was never graded from v3.6 to v3.67 — Gigi's rule. She overturned
// it on Aug 19 2026, having been offered the alternative:
//
//     "she isn't going to want to do the daily writing and the journal."
//
// Two writing tasks a day for a nine-year-old means one gets done badly and the
// other resented.
//
// ---- HER WRITING IS NOT TOUCHED ----
//
// The mark is a row in `journalMarks`, keyed by entryId. This component cannot
// edit the entry and does not try. Un-marking DELETES the row rather than
// storing zeros, because an unmarked entry and a bad entry are different facts.
// ---------------------------------------------------------------------------

export function JournalMarkPanel({ entry }) {
  const existing = useAppStore((s) => s.journalMarkFor(entry.entryId));
  const markEntry = useAppStore((s) => s.markJournalEntry);
  const [open, setOpen] = useState(false);
  const [levels, setLevels] = useState(existing?.levels || {});
  const [saved, setSaved] = useState(false);

  // Counted from what she actually wrote. A suggestion, never applied.
  const suggestion = suggestSentenceLevel(entry.text);
  const result = gradeJournalEntry(levels);
  const band = journalBand(result?.percent);

  async function save() {
    await markEntry(entry.entryId, levels);
    setSaved(true);
    setOpen(false);
  }

  async function clear() {
    await markEntry(entry.entryId, {});
    setLevels({});
    setSaved(false);
    setOpen(false);
  }

  if (!open) {
    const shown = existing ? gradeJournalEntry(existing.levels) : null;
    const shownBand = journalBand(shown?.percent);
    return (
      <button
        type="button"
        onClick={() => {
          setLevels(existing?.levels || {});
          setOpen(true);
        }}
        className={`mt-3 ml-2 rounded-full border px-3.5 py-1.5 text-xs font-700 ${
          shown
            ? 'border-sage-500 bg-sage-300/25 text-sage-700'
            : 'border-cream-300 bg-cream-100 text-ink-700 hover:border-sage-500'
        }`}
      >
        {shown ? `✓ Marked · ${shownBand?.grade} (${shown.percent}%)` : '📝 Mark this entry'}
      </button>
    );
  }

  return (
    <div className="mt-3 rounded-petal border-2 border-sage-500 bg-sage-300/10 px-3.5 py-3">
      <p className="text-xs font-700 text-ink-900">Mark this entry</p>
      <p className="mt-0.5 text-[0.7rem] text-ink-700">
        Nothing you choose here changes a word of what she wrote. Leave a row blank and it is not
        counted — an unmarked row is not a zero.
      </p>

      {/* ---- WHAT THE APP COUNTED. NOT A GRADE. ----

           Gigi: "Is there a grader in the journal entry that will grade her
           work?" No — and the standard forbids one for this kind of writing.
           §3.6's item table: freeResponse is "never auto-scored".

           So this COUNTS rather than judges. Whether a sentence starts with a
           capital is a fact about the text, like a word count. It suggests a
           level for ROW 2 ONLY and Gigi accepts or overrides it — the same rule
           the goals engine follows: the engine proposes, the adult approves,
           nothing activates on its own. ---- */}
      {suggestion && (
        <div className="mt-3 rounded-petal border border-lavender-300 bg-lavender-300/15 px-3 py-2">
          <p className="text-[0.72rem] text-ink-700">
            <span className="font-700">The app counted:</span> {suggestion.because}
          </p>
          <button
            type="button"
            onClick={() => setLevels((p) => ({ ...p, sentences: suggestion.level }))}
            className="mt-1.5 rounded-full border border-lavender-500 bg-white px-3 py-1 text-[0.7rem] font-700 text-lavender-700 hover:bg-lavender-300/30"
          >
            Suggest {suggestion.level} for sentences — you decide
          </button>
          <p className="mt-1 text-[0.66rem] text-ink-500">
            It only ever suggests this one row. Whether she answered the question and whether she
            said enough are yours to read.
          </p>
        </div>
      )}

      {JOURNAL_RUBRIC.map((row) => (
        <div key={row.id} className="mt-3">
          <p className="text-[0.78rem] font-700 text-ink-900">{row.row}</p>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {[1, 2, 3, 4].map((l) => {
              const on = levels[row.id] === l;
              return (
                <button
                  key={l}
                  type="button"
                  title={row[`l${l}`]}
                  onClick={() =>
                    setLevels((p) => ({ ...p, [row.id]: p[row.id] === l ? undefined : l }))
                  }
                  className={`rounded-full px-2.5 py-1 text-[0.7rem] font-700 ${
                    on
                      ? 'bg-sage-700 text-white'
                      : 'border border-cream-300 bg-white text-ink-700 hover:border-sage-500'
                  }`}
                >
                  {l}
                </button>
              );
            })}
          </div>
          {levels[row.id] && (
            <p className="mt-1 text-[0.7rem] leading-snug text-ink-700">
              {row[`l${levels[row.id]}`]}
            </p>
          )}
        </div>
      ))}

      {/* THE RESULT, BEFORE SHE SAVES IT. §3.11.4's habit applied here: render
          the verdict before the adult commits to it. */}
      <p className="tnum mt-3 rounded-petal bg-white px-3 py-2 text-xs text-ink-900">
        {result ? (
          <>
            <span className="font-700">
              {band?.grade} · {result.percent}%
            </span>{' '}
            from {result.rowsMarked} of {result.rowsTotal} rows.
          </>
        ) : (
          'Nothing marked yet.'
        )}
      </p>

      <div className="mt-2 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={save}
          disabled={!result}
          className="rounded-full bg-sage-700 px-4 py-1.5 text-xs font-700 text-white disabled:opacity-40"
        >
          Save the mark
        </button>
        {existing && (
          <button
            type="button"
            onClick={clear}
            className="rounded-full border border-clay-500 px-3.5 py-1.5 text-xs font-700 text-clay-500"
          >
            Remove the mark
          </button>
        )}
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="rounded-full border border-cream-300 px-3.5 py-1.5 text-xs font-700 text-ink-700"
        >
          Cancel
        </button>
      </div>
      {saved && <p className="mt-2 text-[0.7rem] text-sage-700">Saved. She will see it.</p>}
    </div>
  );
}
