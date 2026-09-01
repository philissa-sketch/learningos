import { useState } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import { academyContent } from '../../content/academyContent.js';

const { guitarTheory = [] } = academyContent().electives;

/**
 * Guitar theory — short readings with ONE check question, recorded as
 * participation.
 *
 * NOT A LESSON, and deliberately not shaped like one. There is no ten-question
 * quiz, no 90% mastery gate and no letter grade behind this screen, because
 * Electric Guitar is a participation subject (see config/subjects.js). What
 * there IS: real teaching, a question that makes him retrieve rather than
 * recognise, and per-wrong-answer feedback — because a wrong answer that only
 * says "wrong" teaches nothing, and that is true whether or not anybody is
 * marking it.
 *
 * Getting the check wrong does not lock anything. He reads it again and answers
 * again. The only thing recorded is that he did it.
 */
export function TheoryView() {
  const guitarLog = useAppStore((s) => s.guitarLog);
  const recordGuitarLogEntry = useAppStore((s) => s.recordGuitarLogEntry);

  const [openId, setOpenId] = useState(null);
  const [picked, setPicked] = useState(null);
  const [saving, setSaving] = useState(false);

  const doneIds = new Set(
    guitarLog.filter((r) => r.kind === 'theory').map((r) => r.data?.itemId || r.theoryId)
  );
  const item = guitarTheory.find((t) => t.id === openId) || null;

  const open = (id) => {
    setOpenId(id);
    setPicked(null);
  };

  const handleAnswer = async (index) => {
    setPicked(index);
    if (index !== item.check.answerIndex || doneIds.has(item.id)) return;
    setSaving(true);
    await recordGuitarLogEntry({
      kind: 'theory',
      theoryId: item.id,
      title: `Theory — ${item.title}`,
      data: { itemId: item.id, correct: true }
    });
    setSaving(false);
  };

  if (!item) {
    return (
      <div className="space-y-3">
        <div className="rounded-xl border border-space-700 bg-space-800 p-4 shadow-panel">
          <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Theory</p>
          <p className="mt-1 text-sm text-ink-300">
            Short readings — about five minutes each, one question at the end. This is the part a music teacher
            actually tests, and it makes everything on the guitar faster. It runs in the 2:15 block on quiet
            Fridays, alongside the garden.
          </p>
          <p className="mt-2 text-xs text-ink-500">
            {doneIds.size} of {guitarTheory.length} read. There is no grade here — reading one is recorded, the
            same way a workout is.
          </p>
        </div>
        {guitarTheory.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => open(t.id)}
            className="block w-full rounded-xl border border-space-700 bg-space-800 p-4 text-left shadow-panel transition hover:border-signal-cyan/40"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs font-display uppercase tracking-widest text-ink-500">
                  Theory {t.number} · {t.readingMinutes} min
                </p>
                <p className="mt-0.5 font-display text-base font-700 text-ink-100">{t.title}</p>
              </div>
              {doneIds.has(t.id) && (
                <span className="flex-none rounded-full bg-signal-green px-2 py-0.5 text-[10px] font-display font-700 text-space-950">
                  Read
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
    );
  }

  const correct = picked !== null && picked === item.check.answerIndex;

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={() => setOpenId(null)}
        className="rounded-lg border border-space-600 px-3 py-1.5 text-xs font-display font-600 text-ink-300 hover:text-ink-100"
      >
        ← All theory
      </button>

      <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">
          Theory {item.number} · {item.readingMinutes} min
        </p>
        <h3 className="mt-1 font-display text-2xl font-700 text-ink-100">{item.title}</h3>
        <div className="mt-4 space-y-4">
          {item.teaching.map((block, i) => (
            <div key={i}>
              <p className="font-display text-sm font-700 text-signal-amber">{block.heading}</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-300">{block.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Check yourself</p>
        <p className="mt-1 text-sm text-ink-100">{item.check.question}</p>
        <div className="mt-3 space-y-2">
          {item.check.choices.map((choice, i) => {
            const chosen = picked === i;
            const isAnswer = i === item.check.answerIndex;
            return (
              <button
                key={i}
                type="button"
                onClick={() => handleAnswer(i)}
                disabled={saving}
                className={
                  'block w-full rounded-lg border px-3 py-2 text-left text-sm transition ' +
                  (chosen && isAnswer
                    ? 'border-signal-green bg-signal-green/10 text-ink-100'
                    : chosen
                      ? 'border-signal-red bg-signal-red/10 text-ink-100'
                      : 'border-space-600 text-ink-300 hover:border-signal-cyan/40 hover:text-ink-100')
                }
              >
                {choice}
              </button>
            );
          })}
        </div>
        {picked !== null && (
          <p
            className={
              'mt-3 rounded-lg p-3 text-sm ' +
              (correct ? 'bg-signal-green/10 text-ink-100' : 'bg-signal-red/10 text-ink-100')
            }
          >
            {item.check.choiceFeedback[picked]}
          </p>
        )}
        {picked !== null && !correct && (
          <p className="mt-2 text-xs text-ink-500">
            Nothing is locked and nothing is scored. Read the section again and pick another one.
          </p>
        )}
      </div>

      <div className="rounded-xl border border-space-700 bg-space-800 p-4 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-ink-500">Where this came from</p>
        <ul className="mt-2 space-y-1">
          {item.sources.map((src) => (
            <li key={src.url} className="text-sm">
              <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-signal-cyan underline">
                {src.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
