import { useState } from 'react';
import { wordProgress } from '../../lib/writingCheck.js';
import { academyContent } from '../../content/academyContent.js';

const { sizeFor = () => null } = academyContent().academicCenter;

/**
 * WHERE HE ACTUALLY WRITES THE REPORT.
 *
 * ---- WHY THIS EXISTS (Aug 14, 2026) ----
 *
 * The parent: "for his book reports I want him to do them in the app. Add the
 * notes and structure in that area where it list, the rough draft, and edit and
 * finish."
 *
 * Everything this needs was already here except the writing. The milestones
 * already name the four weeks — Read the book, Notes & structure, Rough draft,
 * Edit & finish. Every format already carries a `sections` array that is
 * literally the outline he is supposed to follow. What was missing was any
 * surface to type on. He could tick "Rough draft" and the app held no draft.
 *
 * Which means, in practice, the report got written somewhere else and ticked
 * here — so the app recorded that a book report happened and held no evidence
 * of it. For a homeschool portfolio that is exactly backwards: the artifact IS
 * the record, and a checkbox is not an artifact.
 *
 * ---- THREE DECISIONS ----
 *
 * **The outline is pre-loaded, not described.** Pressing "Start from the
 * outline" drops the format's own sections in as headings with blank lines
 * under them. A twelve-year-old staring at an empty box and a bulleted list of
 * requirements somewhere above it has to hold the structure in his head; this
 * puts it on the page where he is writing. The button never overwrites work —
 * it is only offered while the box is empty.
 *
 * **Notes and draft are separate boxes.** Collapsing them into one would
 * quietly delete the planning week the milestone exists to protect. They are
 * different kinds of thinking, seven days apart.
 *
 * **The checklist becomes tickable at the end.** It was a static bulleted list
 * of things to check — the same information, but nothing to do with it. On the
 * Edit & finish step it is what he works through.
 */
export function AssignmentWriter({ assignment, format, steps, onSave }) {
  const [notes, setNotes] = useState(assignment.notesText || '');
  const [draft, setDraft] = useState(assignment.draftText || '');
  const [final, setFinal] = useState(assignment.finalText || '');
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState(null);
  const [checked, setChecked] = useState({});

  const words = (t) => (t.trim() ? t.trim().split(/\s+/).filter(Boolean).length : 0);
  const notesDirty = notes !== (assignment.notesText || '');
  const draftDirty = draft !== (assignment.draftText || '');
  const finalDirty = final !== (assignment.finalText || '');

  /** How long it is supposed to be — see FORMAT_SIZE in reportFormats.js. */
  const size = sizeFor(format);
  const draftProgress = wordProgress(size, words(draft));
  const finalProgress = wordProgress(size, words(final));

  // Which week he is on, so the right box is emphasised rather than both
  // shouting at once.
  const stepDone = (id) => steps.some((s) => s.id === id && s.completedAt);
  const onNotesWeek = stepDone('read') && !stepDone('notes');
  const onDraftWeek = stepDone('notes') && !stepDone('draft');
  const onPolishWeek = stepDone('draft') && !stepDone('polish');

  const outlineTemplate = (format?.sections || []).map((s) => `${s.toUpperCase()}\n\n`).join('\n');

  const save = async (field, text) => {
    const res = await onSave(assignment.id, field, text);
    setMsg(res?.ok ? `Saved — ${res.wordCount} words` : res?.error || 'That did not save.');
    setTimeout(() => setMsg(null), 2000);
  };

  const written = words(notes) + words(draft) + words(final);

  return (
    <div className="mt-3 border-t border-space-700 pt-2">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-2 text-left"
      >
        <span className="text-[10px] font-display uppercase tracking-widest text-signal-cyan">
          Write it here
        </span>
        <span className="text-[11px] text-ink-500">
          {written > 0 ? `${written} words written · ` : ''}
          {open ? 'Hide' : 'Open'}
        </span>
      </button>

      {open && (
        <div className="mt-2 space-y-3">
          {/* ---- NOTES & STRUCTURE ---- */}
          <div
            className={
              'rounded-lg border p-3 ' +
              (onNotesWeek ? 'border-signal-cyan/40 bg-signal-cyan/5' : 'border-space-700 bg-space-950')
            }
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-display text-xs font-700 text-ink-100">
                Notes &amp; structure
                {onNotesWeek && <span className="ml-2 text-[10px] text-signal-cyan">this week</span>}
              </p>
              <span className="text-[11px] text-ink-600">{words(notes)} words</span>
            </div>
            <p className="mt-0.5 text-[11px] text-ink-500">
              The moments you marked while reading, and the three or four points the report will make.
            </p>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={5}
              placeholder="Page 41 — Salva loses his uncle. Use this for the section on what he survives…"
              className="mt-2 w-full resize-y rounded-md border border-space-600 bg-space-900 px-2.5 py-2 text-sm text-ink-100 placeholder:text-ink-600 focus:border-signal-cyan focus:outline-none"
            />
            <div className="mt-1.5 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => save('notes', notes)}
                disabled={!notesDirty}
                className={
                  'rounded-md px-3 py-1 text-xs font-display font-700 transition ' +
                  (notesDirty ? 'bg-signal-cyan text-space-950 hover:brightness-110' : 'border border-space-700 text-ink-600')
                }
              >
                Save notes
              </button>
              {assignment.notesText && !notesDirty && <span className="text-[11px] text-ink-600">Saved</span>}
            </div>
          </div>

          {/* ---- ROUGH DRAFT ---- */}
          <div
            className={
              'rounded-lg border p-3 ' +
              (onDraftWeek ? 'border-signal-cyan/40 bg-signal-cyan/5' : 'border-space-700 bg-space-950')
            }
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-display text-xs font-700 text-ink-100">
                Rough draft
                {onDraftWeek && <span className="ml-2 text-[10px] text-signal-cyan">this week</span>}
              </p>
              {/*
                THE COUNTER SAYS WHAT IT IS COUNTING TOWARD. (Aug 26, 2026.)

                It read "0 words" — a number with no target beside it, which is
                the same fault as "one paragraph a day" with no total. Once the
                format's size is known the counter says where he is against it,
                and goes green when he arrives.
              */}
              <span
                className={
                  'text-[11px] ' +
                  (draftProgress?.state === 'in-range'
                    ? 'text-signal-green'
                    : draftProgress?.state === 'over'
                      ? 'text-ink-400'
                      : 'text-ink-600')
                }
              >
                {draftProgress ? draftProgress.label : `${words(draft)} words`}
              </span>
            </div>
            <p className="mt-0.5 text-[11px] text-ink-500">
              {size?.pace || 'One paragraph a day against the points from last week.'}{' '}
              Evidence from the book for each.
            </p>
            {size && (
              <p className="mt-0.5 text-[11px] font-display font-700 text-ink-300">
                Target: {size.headline}
              </p>
            )}

            {/* The outline is put ON THE PAGE, not described above it. Offered
                only while the box is empty, so it can never eat his work. */}
            {format?.sections?.length > 0 && draft.trim() === '' && (
              <button
                type="button"
                onClick={() => setDraft(outlineTemplate)}
                className="mt-2 rounded-md border border-space-600 px-2.5 py-1 text-[11px] font-display text-ink-300 transition hover:border-signal-cyan hover:text-signal-cyan"
              >
                Start from the outline ({format.sections.length} sections)
              </button>
            )}

            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              rows={12}
              placeholder="Write the report here. It does not have to be good yet — that is what Edit &amp; finish is for."
              className="mt-2 w-full resize-y rounded-md border border-space-600 bg-space-900 px-2.5 py-2 text-sm leading-relaxed text-ink-100 placeholder:text-ink-600 focus:border-signal-cyan focus:outline-none"
            />
            <div className="mt-1.5 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => save('draft', draft)}
                disabled={!draftDirty}
                className={
                  'rounded-md px-3 py-1 text-xs font-display font-700 transition ' +
                  (draftDirty ? 'bg-signal-cyan text-space-950 hover:brightness-110' : 'border border-space-700 text-ink-600')
                }
              >
                Save draft
              </button>
              {assignment.draftText && !draftDirty && <span className="text-[11px] text-ink-600">Saved</span>}
              {draftDirty && <span className="text-[11px] text-signal-amber">Not saved yet</span>}
            </div>
          </div>

          {/*
            ====================================================================
            ---- EDIT & FINISH — AND SOMEWHERE TO ACTUALLY FINISH IT. ----
            ====================================================================

            (Aug 26, 2026.) The parent: **"there isn't a location for the edit
            and finish. Is he to write this in Google Docs?"**

            No — and the fact that the screen left that open was the bug. This
            step had a proofreading checklist and nothing to proofread INTO. The
            rough draft box was the only writing surface in the app, so
            "finish it" could only mean finish it somewhere else, and the
            portfolio would then hold a rough draft and a tick.

            THE FINAL COPY IS ITS OWN FIELD. Editing the draft in place would
            have been less code and would have destroyed the evidence: revision
            is what this week teaches, and the difference between the two texts
            is the only proof it happened. He copies the draft over with one
            button and fixes it there, and the record keeps both.

            The checklist stays exactly where it was, beneath the box it is
            about, and still does not persist — see the note at the bottom.
          */}
          {(format?.checklist?.length > 0 || assignment.draftText || draft.trim()) && (
            <div
              className={
                'rounded-lg border p-3 ' +
                (onPolishWeek ? 'border-signal-green/40 bg-signal-green/5' : 'border-space-700 bg-space-950')
              }
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-display text-xs font-700 text-ink-100">
                  Edit &amp; finish
                  {onPolishWeek && <span className="ml-2 text-[10px] text-signal-green">this week</span>}
                </p>
                <span
                  className={
                    'text-[11px] ' +
                    (finalProgress?.state === 'in-range'
                      ? 'text-signal-green'
                      : finalProgress?.state === 'over'
                        ? 'text-ink-400'
                        : 'text-ink-600')
                  }
                >
                  {finalProgress ? finalProgress.label : `${words(final)} words`}
                </span>
              </div>
              <p className="mt-0.5 text-[11px] text-ink-500">
                The finished copy goes here — not in another program. Bring the draft over, fix it,
                and this is the version that is turned in and graded.
              </p>

              {/* Offered only while the box is empty, so it can never eat his work. */}
              {final.trim() === '' && draft.trim() !== '' && (
                <button
                  type="button"
                  onClick={() => setFinal(draft)}
                  className="mt-2 rounded-md border border-space-600 px-2.5 py-1 text-[11px] font-display text-ink-300 transition hover:border-signal-green hover:text-signal-green"
                >
                  Bring the rough draft over ({words(draft)} words)
                </button>
              )}

              <textarea
                value={final}
                onChange={(e) => setFinal(e.target.value)}
                rows={12}
                placeholder="The finished version. Fix the spelling, the grammar, and the sentences that did not come out right."
                className="mt-2 w-full resize-y rounded-md border border-space-600 bg-space-900 px-2.5 py-2 text-sm leading-relaxed text-ink-100 placeholder:text-ink-600 focus:border-signal-green focus:outline-none"
              />
              <div className="mt-1.5 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => save('final', final)}
                  disabled={!finalDirty}
                  className={
                    'rounded-md px-3 py-1 text-xs font-display font-700 transition ' +
                    (finalDirty ? 'bg-signal-green text-space-950 hover:brightness-110' : 'border border-space-700 text-ink-600')
                  }
                >
                  Save final copy
                </button>
                {assignment.finalText && !finalDirty && <span className="text-[11px] text-ink-600">Saved</span>}
                {finalDirty && <span className="text-[11px] text-signal-amber">Not saved yet</span>}
              </div>

              {/* The checklist only exists once a format has been chosen. The box
                  above does not depend on one — a finished report needs
                  somewhere to live whether or not his mother has picked the
                  format yet. */}
              {format?.checklist?.length > 0 && (
                <>
              <p className="mt-3 text-[11px] text-ink-500">
                Read it out loud once — it catches more than proofreading does. Then work through these.
              </p>
              <div className="mt-2 space-y-1">
                {format.checklist.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setChecked((c) => ({ ...c, [item]: !c[item] }))}
                    className="flex w-full items-start gap-2 text-left"
                  >
                    <span
                      className={
                        'mt-0.5 h-3.5 w-3.5 flex-none rounded border ' +
                        (checked[item] ? 'border-signal-green bg-signal-green' : 'border-space-600')
                      }
                    />
                    <span className={'text-xs ' + (checked[item] ? 'text-ink-500 line-through' : 'text-ink-300')}>
                      {item}
                    </span>
                  </button>
                ))}
              </div>
              {/* Deliberately not persisted. This is a pre-flight check he runs
                  while editing, not a record — the record is the draft above and
                  the grade his mother gives it. Storing it would create a second
                  half-done checklist to reconcile with the milestones. */}
              <p className="mt-2 text-[10px] text-ink-600">
                This list resets — it is for working through now, not a record.
              </p>
                </>
              )}
            </div>
          )}

          {msg && <p className="text-[11px] font-display text-signal-green">{msg}</p>}
        </div>
      )}
    </div>
  );
}
