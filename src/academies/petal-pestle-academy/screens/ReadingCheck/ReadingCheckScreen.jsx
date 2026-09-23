// ---------------------------------------------------------------------------
// THE READING CHECK SCREEN. (Brought across Sept 23, 2026.)
//
// From the standalone app's ReadingCheckView, with its rules kept:
//
//   · The passage STAYS ON SCREEN while she answers. A question about a
//     passage she can no longer see is a memory test.
//   · "Read it to me" is always offered and never held against her. Pressing
//     it is RECORDED against those questions, because her independent reading
//     is the thing being measured. Reading a passage aloud marks every question
//     on that passage — it errs toward saying she was helped.
//   · Nothing on her side says she "needed help". The split-out number is for
//     the Grown-Up Corner.
//
// New here: a list of the units first, each opening only when the unit before
// it has been sat with nothing read aloud (see lib/readingCheck.js).
//
// Styled with the platform's colour names, which this school's own stylesheet
// repaints — so it follows her theme rather than carrying a copy of it.
// ---------------------------------------------------------------------------

import { useEffect, useMemo, useState } from 'react';
import {
  attemptRow,
  buildReadingCheck,
  gradeReadingCheck,
  isFullyUnaided,
  unitStatuses
} from '../../lib/readingCheck.js';
import { speechSupported, speakChunks, stopSpeaking } from '../../lib/speech.js';
import {
  RECORDS_ARE_SAVED,
  dayKeyOf,
  loadReadingAttempts,
  newRecordId,
  saveReadingAttempt
} from '../../db/herRecords.js';

const card = 'rounded-xl border border-space-700 bg-space-800';
const primary = 'rounded-full bg-signal-cyan px-5 py-2 text-sm font-display font-700 text-space-900 hover:opacity-90';

export function ReadingCheckScreen({ onExit }) {
  const [attempts, setAttempts] = useState(null);
  const [unitId, setUnitId] = useState(null);

  const refresh = () => loadReadingAttempts().then(setAttempts);
  useEffect(() => {
    refresh();
    return () => stopSpeaking();
  }, []);

  if (unitId) {
    return (
      <Sitting
        unitId={unitId}
        onExit={() => {
          stopSpeaking();
          setUnitId(null);
          refresh();
        }}
      />
    );
  }

  const statuses = attempts ? unitStatuses(attempts) : [];

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      {onExit ? (
        <button type="button" onClick={onExit} className="text-xs font-display font-700 text-ink-300 hover:text-ink-100">
          ← Back
        </button>
      ) : null}
      <p className="mt-3 font-display text-xs uppercase tracking-widest text-ink-500">Reading check</p>
      <h1 className="mt-1 font-display text-3xl text-ink-100">Read a story, then answer</h1>
      <p className="mt-2 text-sm text-ink-300">
        Each one goes with a unit you are reading on Khan. The next one opens after you read one all by yourself.
      </p>

      {!RECORDS_ARE_SAVED ? (
        <p className="mt-4 rounded-xl border border-signal-amber/40 px-4 py-3 text-xs text-ink-300">
          Practice copy — answers here are not saved yet. Use the Petal &amp; Pestle app for the real one.
        </p>
      ) : null}

      <ul className="mt-6 space-y-3">
        {statuses.map((s) => (
          <li key={s.unit.id} className={`${card} flex flex-wrap items-center justify-between gap-3 px-4 py-4`}>
            <div>
              <p className="font-display text-base text-ink-100">{s.unit.unitName}</p>
              <p className="mt-0.5 text-xs text-ink-500">
                {s.open
                  ? s.sittings
                    ? `Read ${s.sittings} time${s.sittings === 1 ? '' : 's'}`
                    : 'Ready when you are'
                  : `Opens after ${s.waitingOn}`}
              </p>
            </div>
            {s.open ? (
              <button type="button" onClick={() => setUnitId(s.unit.id)} className={primary}>
                {s.sittings ? 'Read it again' : 'Start'}
              </button>
            ) : (
              <span className="text-xs text-ink-500">🔒</span>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}

function Sitting({ unitId, onExit }) {
  const form = useMemo(() => buildReadingCheck(unitId), [unitId]);
  const [responses, setResponses] = useState({});
  const [speakingId, setSpeakingId] = useState(null);
  const [grade, setGrade] = useState(null);
  const [saving, setSaving] = useState(false);

  if (!form) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-8">
        <p className="text-sm text-ink-300">There is no reading check for that unit yet.</p>
        <button type="button" onClick={onExit} className="mt-4 text-xs font-700 text-ink-300">← Back</button>
      </main>
    );
  }

  const answered = form.questions.filter((q) => responses[q.id]?.chosen !== undefined).length;
  const allAnswered = answered === form.questions.length;
  const canSpeak = speechSupported();

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
        if (q.passage === passage.id) next[q.id] = { ...(next[q.id] || {}), readAloud: true };
      }
      return next;
    });
  }

  function readQuestion(q) {
    if (speakingId === q.id) {
      stopSpeaking();
      setSpeakingId(null);
      return;
    }
    if (speakChunks([q.prompt, ...q.choices], { onEnd: () => setSpeakingId(null) })) setSpeakingId(q.id);
    setResponses((r) => ({ ...r, [q.id]: { ...(r[q.id] || {}), readAloud: true } }));
  }

  async function finish() {
    if (saving) return;
    setSaving(true);
    stopSpeaking();
    const g = gradeReadingCheck(form, responses);
    await saveReadingAttempt(attemptRow(form, g, { id: newRecordId(), dayKey: dayKeyOf(), at: new Date().toISOString() }));
    setGrade(g);
    setSaving(false);
  }

  if (grade) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-8">
        <p className="font-display text-xs uppercase tracking-widest text-ink-500">{form.unitName}</p>
        <h1 className="mt-1 font-display text-3xl text-ink-100">All done</h1>
        <div className={`${card} mt-5 px-5 py-5`}>
          <p className="font-display text-2xl text-ink-100">{grade.right} of {grade.total}</p>
          <p className="mt-1 text-sm text-ink-300">{grade.percent}% · {grade.letter}</p>
        </div>
        <p className="mt-4 rounded-xl bg-space-800 px-4 py-3 text-sm text-ink-100">
          {isFullyUnaided(grade)
            ? 'You read every word of that yourself.'
            : 'Listening to a story and then answering it is reading too.'}
        </p>
        <div className="mt-5 space-y-2">
          {form.questions.map((q) => {
            const row = grade.rows.find((r) => r.questionId === q.id);
            return (
              <div key={q.id} className={`${card} px-4 py-3`}>
                <p className="text-sm font-700 text-ink-100">{row?.correct ? '✓' : '·'} {q.prompt}</p>
                {!row?.correct ? (
                  <p className="mt-1 text-xs text-ink-300">{q.choices[q.answer]} — {q.why}</p>
                ) : null}
              </div>
            );
          })}
        </div>
        <button type="button" onClick={onExit} className={`${primary} mt-6`}>Done</button>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <button type="button" onClick={onExit} className="text-xs font-display font-700 text-ink-300 hover:text-ink-100">
        ← Back
      </button>
      <header className="mt-3">
        <p className="font-display text-xs uppercase tracking-widest text-ink-500">Reading check · {form.unitName}</p>
        <h1 className="mt-1 font-display text-3xl text-ink-100">Read it, then answer</h1>
        <p className="mt-2 text-sm text-ink-300">The story stays on the screen the whole time. You can look back at it whenever you want.</p>
      </header>

      {form.passages.map((p) => (
        <section key={p.id} className="mt-7">
          <div className={`${card} px-5 py-5`}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="font-display text-xl text-ink-100">{p.title}</h2>
              {canSpeak ? (
                <button type="button" onClick={() => readPassage(p)} className="rounded-full border border-signal-cyan/60 px-3 py-1 text-xs font-700 text-signal-cyan">
                  {speakingId === p.id ? '■ stop' : '▶ read it to me'}
                </button>
              ) : null}
            </div>
            <div className="mt-3 space-y-3">
              {p.text.split(/\n\n+/).map((para, i) => (
                <p key={i} className="text-[1.05rem] leading-relaxed text-ink-100">{para}</p>
              ))}
            </div>
          </div>

          <div className="mt-4 space-y-4">
            {form.questions.filter((q) => q.passage === p.id).map((q) => {
              const picked = responses[q.id]?.chosen;
              return (
                <div key={q.id} className={`${card} px-4 py-4`}>
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-display text-base text-ink-100">{q.prompt}</p>
                    {canSpeak ? (
                      <button type="button" onClick={() => readQuestion(q)} className="flex-none rounded-full border border-space-600 px-2.5 py-1 text-[0.65rem] font-700 text-ink-300">
                        {speakingId === q.id ? '■' : '▶'}
                      </button>
                    ) : null}
                  </div>
                  <div className="mt-3 space-y-2">
                    {q.choices.map((c, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setResponses((r) => ({ ...r, [q.id]: { ...(r[q.id] || {}), chosen: i } }))}
                        className={`block w-full rounded-lg border px-3.5 py-2.5 text-left text-sm ${
                          picked === i ? 'border-signal-cyan bg-signal-cyan/15 font-700 text-ink-100' : 'border-space-600 text-ink-100 hover:border-signal-cyan'
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
      ))}

      <div className="mt-7 flex items-center gap-3">
        <button
          type="button"
          onClick={finish}
          disabled={!allAnswered || saving}
          className={allAnswered && !saving ? primary : 'cursor-not-allowed rounded-full bg-space-700 px-5 py-2 text-sm font-700 text-ink-500'}
        >
          {saving ? 'Saving…' : 'I have finished'}
        </button>
        <span className="text-xs text-ink-500">{answered} of {form.questions.length} answered</span>
      </div>
    </main>
  );
}
