// ---------------------------------------------------------------------------
// THE READING CHECK SCREEN.
//
// Passage on top, questions underneath, and the passage STAYS ON SCREEN while
// she answers. That is not a convenience — a question about a passage she can
// no longer see is a memory test, and this app has a rule about a lesson only
// asking for what it gave her.
//
// ---- ⚠️ READ-ALOUD IS OFFERED PER QUESTION, AND IT IS THE MEASUREMENT ----
//
// 63% of everything she has ever answered was read to her. Her independent
// reading has never been measured. So the button is here, it is never hidden,
// and pressing it is RECORDED against that question rather than held against
// her.
//
// The screen never says anything about having used it. No "you needed help",
// no count on her side of the glass. The Grown-Up Corner gets the number; she
// gets a reading test she is allowed to use the tools on. §32's rule — the
// words "behind", "weakest" and "catch up" appear nowhere she can read them,
// and this is the same principle one room over.
// ---------------------------------------------------------------------------

import { useMemo, useState } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import {
  buildReadingCheck,
  gradeReadingCheck,
  isFullyUnaided
} from '../../lib/readingCheck.js';
import { speechSupported, speakChunks, stopSpeaking } from '../../lib/speech.js';

export function ReadingCheckView({ unitId, onExit }) {
  const recordReadingCheck = useAppStore((s) => s.recordReadingCheck);

  const form = useMemo(() => buildReadingCheck(unitId), [unitId]);

  // { [questionId]: { chosen, readAloud } }
  const [responses, setResponses] = useState({});
  const [speakingId, setSpeakingId] = useState(null);
  const [phase, setPhase] = useState('taking');
  const [grade, setGrade] = useState(null);
  const [saving, setSaving] = useState(false);

  if (!form) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-8">
        <p className="text-sm text-ink-700">There is no reading check for that unit yet.</p>
        <button type="button" onClick={onExit} className="mt-4 text-xs font-700 text-lavender-700">
          ← Back
        </button>
      </main>
    );
  }

  const answered = form.questions.filter((q) => responses[q.id]?.chosen !== undefined).length;
  const allAnswered = answered === form.questions.length;

  /**
   * Read the PASSAGE to her, and mark every question on that passage.
   *
   * ⚠️ MARKING ALL OF THEM IS DELIBERATE AND IT IS THE CAUTIOUS DIRECTION. If
   * the passage was read to her, none of the answers from it are independent
   * reading — even the ones where she never pressed anything. Marking only the
   * question she happened to be looking at would produce an `unaidedPercent`
   * that counted answers she got by listening. That number is the entire reason
   * this screen exists; it must err toward saying she was helped.
   */
  function readPassage(passage) {
    if (speakingId === passage.id) {
      stopSpeaking();
      setSpeakingId(null);
      return;
    }
    const chunks = passage.text.split(/\n\n+/).filter(Boolean);
    if (speakChunks(chunks, { onEnd: () => setSpeakingId(null) })) setSpeakingId(passage.id);
    setResponses((r) => {
      const next = { ...r };
      for (const q of form.questions) {
        if (q.passage !== passage.id) continue;
        next[q.id] = { ...(next[q.id] || {}), readAloud: true };
      }
      return next;
    });
  }

  /** Read one question and its choices, and mark that question only. */
  function readQuestion(q) {
    if (speakingId === q.id) {
      stopSpeaking();
      setSpeakingId(null);
      return;
    }
    const chunks = [q.prompt, ...q.choices];
    if (speakChunks(chunks, { onEnd: () => setSpeakingId(null) })) setSpeakingId(q.id);
    setResponses((r) => ({ ...r, [q.id]: { ...(r[q.id] || {}), readAloud: true } }));
  }

  function choose(q, i) {
    setResponses((r) => ({ ...r, [q.id]: { ...(r[q.id] || {}), chosen: i } }));
  }

  async function finish() {
    if (saving) return;
    setSaving(true);
    stopSpeaking();
    const g = gradeReadingCheck(form, responses);
    setGrade(g);
    setPhase('done');
    await recordReadingCheck(form, g);
    setSaving(false);
  }

  // ---- the finished screen ----
  if (phase === 'done' && grade) {
    const clean = isFullyUnaided(grade);
    return (
      <main className="mx-auto max-w-2xl px-4 py-8">
        <p className="label-caps">{form.unitName}</p>
        <h1 className="mt-1 font-display text-3xl text-ink-900">All done</h1>

        <div className="panel mt-5 px-5 py-5">
          <p className="font-display text-2xl text-ink-900">
            {grade.right} of {grade.total}
          </p>
          <p className="mt-1 text-sm text-ink-700">
            {grade.percent}% · {grade.letter}
          </p>
        </div>

        {/* ⚠️ WHAT SHE SEES ABOUT READ-ALOUD: NOTHING THAT SOUNDS LIKE A
            DEDUCTION. She is told it was fine to use, because it was. The
            split-out number is a grown-up's instrument, not a verdict on her. */}
        {clean ? (
          <p className="mt-4 rounded-petal bg-sage-300/25 px-4 py-3 text-sm text-ink-900">
            You read every word of that yourself.
          </p>
        ) : (
          <p className="mt-4 rounded-petal bg-cream-100 px-4 py-3 text-sm text-ink-700">
            Listening to a passage and then answering it is reading too.
          </p>
        )}

        <div className="mt-5 space-y-2">
          {form.questions.map((q) => {
            const row = grade.rows.find((r) => r.questionId === q.id);
            return (
              <div
                key={q.id}
                className="rounded-petal border border-cream-300 bg-white px-4 py-3"
              >
                <p className="text-sm font-700 text-ink-900">
                  {row?.correct ? '✓' : '·'} {q.prompt}
                </p>
                {!row?.correct && (
                  <p className="mt-1 text-[0.75rem] text-ink-700">
                    {q.choices[q.answer]} — {q.why}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <button
          type="button"
          onClick={onExit}
          className="mt-6 rounded-full bg-sage-700 px-5 py-2 text-sm font-700 text-white"
        >
          Done
        </button>
      </main>
    );
  }

  // ---- taking it ----
  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <button type="button" onClick={onExit} className="text-xs font-700 text-ink-700">
        ← Back
      </button>

      <header className="mt-3">
        <p className="label-caps">Reading check · {form.unitName}</p>
        <h1 className="mt-1 font-display text-3xl text-ink-900">Read it, then answer</h1>
        <p className="mt-2 text-sm text-ink-700">
          The story stays on the screen the whole time. You can look back at it whenever you
          want.
        </p>
      </header>

      {form.passages.map((p) => {
        const qs = form.questions.filter((q) => q.passage === p.id);
        return (
          <section key={p.id} className="mt-7">
            <div className="panel px-5 py-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="font-display text-xl text-ink-900">{p.title}</h2>
                {speechSupported() && (
                  <button
                    type="button"
                    onClick={() => readPassage(p)}
                    className="rounded-full border border-lavender-500 px-3 py-1 text-xs font-700 text-lavender-700 hover:bg-lavender-300/20"
                  >
                    {speakingId === p.id ? '■ stop' : '▶ read it to me'}
                  </button>
                )}
              </div>
              <div className="mt-3 space-y-3">
                {p.text.split(/\n\n+/).map((para, i) => (
                  <p key={i} className="text-[1.05rem] leading-relaxed text-ink-900">
                    {para}
                  </p>
                ))}
              </div>
            </div>

            <div className="mt-4 space-y-4">
              {qs.map((q) => {
                const picked = responses[q.id]?.chosen;
                return (
                  <div key={q.id} className="rounded-petal border border-cream-300 bg-white px-4 py-4">
                    <div className="flex items-start justify-between gap-3">
                      <p className="font-display text-base text-ink-900">{q.prompt}</p>
                      {speechSupported() && (
                        <button
                          type="button"
                          onClick={() => readQuestion(q)}
                          className="flex-none rounded-full border border-cream-300 px-2.5 py-1 text-[0.65rem] font-700 text-ink-700 hover:border-lavender-500"
                        >
                          {speakingId === q.id ? '■' : '▶'}
                        </button>
                      )}
                    </div>
                    <div className="mt-3 space-y-2">
                      {q.choices.map((c, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => choose(q, i)}
                          className={`block w-full rounded-petal border px-3.5 py-2.5 text-left text-sm ${
                            picked === i
                              ? 'border-sage-500 bg-sage-300/25 font-700 text-ink-900'
                              : 'border-cream-300 bg-white text-ink-900 hover:border-sage-500'
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}

      <div className="mt-7 flex items-center gap-3">
        <button
          type="button"
          onClick={finish}
          disabled={!allAnswered || saving}
          className={`rounded-full px-5 py-2 text-sm font-700 ${
            allAnswered && !saving
              ? 'bg-sage-700 text-white hover:bg-sage-500'
              : 'cursor-not-allowed bg-cream-200 text-ink-500'
          }`}
        >
          {saving ? 'Saving…' : 'I have finished'}
        </button>
        <span className="text-xs text-ink-500">
          {answered} of {form.questions.length} answered
        </span>
      </div>
    </main>
  );
}

export default ReadingCheckView;
