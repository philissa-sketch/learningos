import { useState } from 'react';

/**
 * Scaffolding step (PROJECT_PLAN.md "Queued fix — instructional-design
 * audit," gap 2): auto-generated fill-in-the-blank guided notes built
 * from a beat's existing `teachingText` and the lesson's
 * `novaIntro.glossary` — no new hand-authored content, same trick
 * `lib/glossary.js`/StudyGuide.jsx already use for glossary aggregation.
 * Any glossary term that appears in the teaching text becomes a blank;
 * the student re-types it from memory as a new phase between "teach" and
 * "practice," before any scored questions.
 *
 * `buildGuidedNotes` is pure and returns null when the beat's teaching
 * text contains no glossary terms at all — no forced empty screen for
 * content that doesn't have any real vocabulary to reinforce yet.
 */
export function buildGuidedNotes(text, terms) {
  if (!terms || !text || Object.keys(terms).length === 0) return null;

  const termNames = Object.keys(terms).sort((a, b) => b.length - a.length); // longest first, avoids partial overlaps
  const escaped = termNames.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const pattern = new RegExp(`\\b(${escaped.join('|')})\\b`, 'gi');
  const parts = text.split(pattern);

  const blanks = [];
  const segments = parts.map((part, i) => {
    const matchedTerm = termNames.find((t) => t.toLowerCase() === part.toLowerCase());
    if (matchedTerm) {
      const blankIndex = blanks.length;
      blanks.push(part); // keep the term in the casing it actually appears with in the text
      return { type: 'blank', blankIndex, key: `b${i}` };
    }
    return { type: 'text', text: part, key: `t${i}` };
  });

  if (blanks.length === 0) return null;
  return { segments, blanks };
}

export function GuidedNotes({ guidedNotes, onDone }) {
  const [values, setValues] = useState(() => guidedNotes.blanks.map(() => ''));
  const [checked, setChecked] = useState(false);

  const normalize = (v) => v.trim().toLowerCase();
  const setValue = (i, v) => {
    setValues((prev) => {
      const next = [...prev];
      next[i] = v;
      return next;
    });
  };

  const allBlank = values.every((v) => v.trim().length === 0);

  return (
    <div className="rounded-xl border border-space-700 bg-space-800 p-6 shadow-panel">
      <p className="text-xs font-display uppercase tracking-widest text-signal-green">Guided Notes — Not Scored</p>
      <p className="mt-1 text-xs text-ink-500">
        Fill in the blanks from what Commander Nova just taught, from memory. This is just to help it
        stick before you practice — it doesn't affect your score.
      </p>
      <p className="mt-4 leading-relaxed text-ink-300">
        {guidedNotes.segments.map((seg) => {
          if (seg.type === 'text') return <span key={seg.key}>{seg.text}</span>;
          const answer = guidedNotes.blanks[seg.blankIndex];
          const isRight = checked && normalize(values[seg.blankIndex]) === normalize(answer);
          const isWrong = checked && !isRight;
          return (
            <input
              key={seg.key}
              type="text"
              value={values[seg.blankIndex]}
              onChange={(e) => setValue(seg.blankIndex, e.target.value)}
              disabled={checked}
              placeholder="?"
              className={
                'mx-1 inline-block w-32 rounded border bg-space-900 px-2 py-0.5 text-center font-display text-sm ' +
                (isRight
                  ? 'border-signal-green text-signal-green'
                  : isWrong
                  ? 'border-signal-red text-signal-red'
                  : 'border-space-600 text-ink-100')
              }
            />
          );
        })}
      </p>

      {checked && (
        <p className="mt-3 text-xs text-ink-500">
          Green blanks are correct as written; red blanks show what the real word was — take a second
          look before moving on.
        </p>
      )}

      {!checked ? (
        <button
          type="button"
          onClick={() => setChecked(true)}
          disabled={allBlank}
          className="mt-4 w-full rounded-lg bg-space-700 px-4 py-2 font-display font-700 text-ink-100 transition hover:bg-space-600 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Check My Notes
        </button>
      ) : (
        <button
          type="button"
          onClick={onDone}
          className="mt-4 w-full rounded-lg bg-signal-cyan px-4 py-2 font-display font-700 text-space-950 transition hover:brightness-110"
        >
          Continue to Practice
        </button>
      )}
    </div>
  );
}
