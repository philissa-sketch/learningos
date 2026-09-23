import { useState } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import {
  WRITING_PIECES,
  piecesForYear,
  gradePiece
} from '../../data/writing/writingPieces.js';

// ---------------------------------------------------------------------------
// MARKING HER GRADED WRITING — the grown-up half of v3.38.
//
// ---- WHY THIS SCREEN HAD TO EXIST BEFORE THE PROGRAMME COUNTED ----
//
// v3.38 shipped the rubrics, the five-step research sequence and gradePiece()
// in a data file, and nothing rendered any of it. That is the v3.25 failure
// exactly: a whole course written, checked, logged as delivered, and unreachable
// from any screen. A LESSON THAT IS WRITTEN IS A LESSON SHE CAN REACH — and a
// rubric nobody can mark against is a rubric that does not exist.
//
// ---- WHAT IS STORED, AND WHAT IS NOT ----
//
// One integer 1-4 per rubric row. THAT IS ALL. The percentage and the letter
// are computed by gradePiece() every time they are shown, so a stored total can
// never quietly disagree with the rubric it came from.
//
// ---- READ-ALOUD IS A TICK BOX, NOT A SECRET ----
//
// Ten of her thirteen Reading and Vocabulary questions on the Check-In were
// read aloud to her, so those scores are listening scores. A book report
// requires reading a book. Recording that she was read to keeps the grade
// honest; hiding it would make the record wrong.
// ---------------------------------------------------------------------------

const LEVELS = [4, 3, 2, 1];

function pieceOf(pieceId) {
  return WRITING_PIECES.find((p) => p.id === pieceId) || null;
}

function Marker({ slot, onSaved }) {
  const piece = pieceOf(slot.pieceId);
  const addWritingMark = useAppStore((s) => s.addWritingMark);
  const [marks, setMarks] = useState(() => piece.rubric.map(() => 0));
  const [readAloud, setReadAloud] = useState(false);
  const [note, setNote] = useState('');
  const [busy, setBusy] = useState(false);
  const [problem, setProblem] = useState('');

  const complete = marks.every((m) => m >= 1 && m <= 4);
  const preview = complete ? gradePiece(piece.id, marks) : null;

  async function save() {
    if (!complete || busy) return;
    setBusy(true);
    const r = await addWritingMark({
      pieceId: piece.id,
      quarter: slot.quarter,
      title: slot.title,
      marks,
      readAloud,
      note
    });
    setBusy(false);
    if (!r.ok) {
      setProblem(r.reason || 'that did not save');
      return;
    }
    setMarks(piece.rubric.map(() => 0));
    setReadAloud(false);
    setNote('');
    onSaved?.();
  }

  return (
    <div className="mt-3 rounded-petal border border-cream-300 bg-white px-4 py-4">
      <p className="text-xs text-ink-500">
        Mark every row. She has seen these words already — they are on her own screen before she
        starts, which is the point of a rubric.
      </p>

      <div className="mt-3 space-y-3">
        {piece.rubric.map((row, i) => (
          <div key={row.row} className="rounded-petal bg-cream-100 px-3 py-3">
            <p className="text-sm font-700 text-ink-900">{row.row}</p>
            <div className="mt-2 grid gap-1.5 sm:grid-cols-4">
              {LEVELS.map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setMarks((m) => m.map((v, j) => (j === i ? lvl : v)))}
                  className={`rounded-petal border px-2.5 py-2 text-left text-[0.7rem] leading-snug ${
                    marks[i] === lvl
                      ? 'border-sage-500 bg-sage-300/30 text-ink-900'
                      : 'border-cream-300 bg-white text-ink-700 hover:border-sage-500'
                  }`}
                >
                  <span className="block font-700">{lvl}</span>
                  {row[`l${lvl}`]}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <label className="mt-3 flex items-start gap-2 text-sm text-ink-700">
        <input
          type="checkbox"
          checked={readAloud}
          onChange={(e) => setReadAloud(e.target.checked)}
          className="mt-1"
        />
        <span>
          Some of it was read aloud to her.{' '}
          <span className="text-ink-500">
            Recorded, never hidden — the same way the Check-In records it.
          </span>
        </span>
      </label>

      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={2}
        placeholder="A note for the record — optional"
        className="mt-3 w-full rounded-petal border border-cream-300 bg-white px-3 py-2 text-sm text-ink-900 outline-none focus:border-sage-500"
      />

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-ink-700">
          {preview ? (
            <>
              <span className="tnum font-700 text-ink-900">
                {preview.total}/{preview.max}
              </span>{' '}
              · <span className="tnum">{preview.percent}%</span> ·{' '}
              <span className="font-700 text-ink-900">{preview.grade}</span>
            </>
          ) : (
            <span className="text-ink-500">Every row needs a mark before this can be saved.</span>
          )}
        </p>
        <button
          type="button"
          onClick={save}
          disabled={!complete || busy}
          className="rounded-full bg-sage-700 px-5 py-2 text-sm font-700 text-white disabled:opacity-40"
        >
          {busy ? 'Saving…' : 'Save this mark'}
        </button>
      </div>
      {problem && <p className="mt-2 text-xs text-clay-500">{problem}</p>}
    </div>
  );
}

export function WritingPiecesPanel() {
  const writingMarks = useAppStore((s) => s.writingMarks);
  const removeWritingMark = useAppStore((s) => s.removeWritingMark);
  const [open, setOpen] = useState(null);

  const slots = piecesForYear();
  const markedFor = (slot) =>
    (writingMarks || []).filter((m) => m.pieceId === slot.pieceId && m.quarter === slot.quarter);

  return (
    <div className="space-y-4">
      <section className="panel px-5 py-5">
        <h2 className="font-display text-lg text-ink-900">Her graded writing</h2>
        <p className="mt-2 text-sm text-ink-700">
          Four book reports and two research papers a year. This is the only writing in the app that
          is marked — <span className="font-700">the Journal never is, and never will be.</span>
        </p>
        <p className="mt-2 text-xs text-ink-500">
          Two research papers rather than four is deliberate. A paper a nine-year-old abandons
          teaches her she cannot write one; two finished beat four started. The first is short on
          purpose, and it is taught as five separate sessions rather than handed over whole.
        </p>

        <div className="mt-4 space-y-2">
          {slots.map((slot) => {
            const marks = markedFor(slot);
            const done = marks.length > 0;
            return (
              <div
                key={slot.id}
                className={`rounded-petal border px-4 py-3 ${
                  done ? 'border-sage-500 bg-sage-300/15' : 'border-cream-300 bg-white'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="font-display text-base text-ink-900">{slot.title}</p>
                    <p className="text-xs text-ink-500">
                      {slot.kind} · {slot.minutes} minutes · Quarter {slot.quarter}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpen(open === slot.id ? null : slot.id)}
                    className="rounded-full border border-sage-500 bg-white px-4 py-1.5 text-xs font-700 text-sage-700 hover:bg-sage-300/30"
                  >
                    {open === slot.id ? 'Close' : done ? 'Mark another' : 'Mark it'}
                  </button>
                </div>

                {marks.map((m) => {
                  const g = gradePiece(m.pieceId, m.marks);
                  return (
                    <div
                      key={m.markId}
                      className="mt-2 flex flex-wrap items-center justify-between gap-2 rounded-petal bg-white px-3 py-2 text-sm"
                    >
                      <span className="text-ink-700">
                        <span className="tnum font-700 text-ink-900">{g ? `${g.percent}%` : '—'}</span>{' '}
                        <span className="font-700 text-ink-900">{g ? g.grade : ''}</span>
                        <span className="ml-2 text-xs text-ink-500">{m.at}</span>
                        {m.readAloud && (
                          <span className="ml-2 rounded-full bg-gold-300/40 px-2 py-0.5 text-[0.65rem] font-700 text-ink-900">
                            read aloud
                          </span>
                        )}
                        {m.note && <span className="block text-xs text-ink-500">{m.note}</span>}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeWritingMark(m.markId)}
                        className="text-xs text-ink-500 hover:text-clay-500 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  );
                })}

                {open === slot.id && <Marker slot={slot} onSaved={() => setOpen(null)} />}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default WritingPiecesPanel;
