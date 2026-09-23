// ---------------------------------------------------------------------------
// WORD STUDY — her ten words, and the test on them.
//
// ---- ⚠️ THE WORD IS NEVER ON SCREEN WHILE SHE TYPES IT ----
//
// That is the whole mechanism. A spelling test where the word is visible is a
// copying test. So she presses a button, the word is SPOKEN, and she types what
// she heard.
//
// This inverts the read-aloud rule that governs the rest of the app. Everywhere
// else, being read to contaminates the score — v3.80 exists because 63% of
// everything she has ever answered was read to her and nobody could tell a
// reading score from a listening one. HERE, HEARING THE WORD IS THE TEST. It is
// how every spelling test in every school works. So nothing on this screen
// records an "unaided" percentage and nothing ever should: a number that means
// nothing is worse than no number, because somebody will grade her against it.
//
// ---- ⚠️ AND IF THE DEVICE CANNOT SPEAK, THE TEST DOES NOT RUN ----
//
// No silent fallback to showing her the word. That would turn a spelling test
// into a copying test while still writing a grade to her Georgia record, and it
// would look fine on screen. The study list still works without speech; the
// TEST refuses, and says why, in words a grown-up can act on.
//
// ---- FEEDBACK WAITS UNTIL THE END ----
//
// The practice screens give immediate feedback and are not scored. A test is
// scored, so its feedback is delayed — the app's standing rule, because
// practice with delayed feedback rehearses the mistake and a scored question
// with instant feedback is not a measurement.
//
// ---- ⚠️ NOTHING HERE SAYS "BEHIND", "MISSED" OR "AGAIN" ----
//
// Carried words are just words on her list. She is never told that seven of her
// ten are ones she got wrong a fortnight ago. §32's rule: the order carries the
// meaning, and the words that would sting appear only on the grown-up side.
// ---------------------------------------------------------------------------

import { useMemo, useState } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import { wordListFor, vocabularyFor, gradeSpelling } from '../../lib/wordStudy.js';
import { speechSupported, speakChunks, stopSpeaking } from '../../lib/speech.js';

export function WordStudyView({ onExit }) {
  const lessonReads = useAppStore((s) => s.lessonReads);
  const spellingResults = useAppStore((s) => s.spellingResults);
  const recordSpellingResult = useAppStore((s) => s.recordSpellingResult);

  const lessonsRead = useMemo(() => Object.keys(lessonReads || {}), [lessonReads]);

  const plan = useMemo(
    () => wordListFor(lessonsRead, spellingResults),
    [lessonsRead, spellingResults]
  );
  const vocabulary = useMemo(() => vocabularyFor(lessonsRead), [lessonsRead]);

  const [phase, setPhase] = useState('study'); // study · testing · done
  const [typed, setTyped] = useState({});
  const [speaking, setSpeaking] = useState(null);
  const [grade, setGrade] = useState(null);
  const [saving, setSaving] = useState(false);

  const canSpeak = speechSupported();

  function say(word) {
    stopSpeaking();
    setSpeaking(word);
    speakChunks([word], { onEnd: () => setSpeaking(null) });
  }

  async function finish() {
    if (saving) return;
    setSaving(true);
    const g = gradeSpelling(plan.list, typed);
    setGrade(g);
    await recordSpellingResult(plan.listId, g, {
      week: plan.week,
      quarter: plan.quarter,
      weekInQuarter: plan.weekInQuarter,
      carriedCount: plan.carried.length
    });
    setPhase('done');
    setSaving(false);
  }

  // ---- nothing to show -----------------------------------------------------

  if (!plan.list.length) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-8">
        <h1 className="font-display text-2xl text-ink-900">Word Study</h1>
        <p className="mt-3 text-sm text-ink-700">
          There are no words for this week yet.
        </p>
        <button type="button" onClick={onExit} className="mt-5 text-xs font-700 text-lavender-700">
          ← Back
        </button>
      </main>
    );
  }

  // ---- the finished screen -------------------------------------------------

  if (phase === 'done' && grade) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-8">
        <h1 className="font-display text-2xl text-ink-900">Finished</h1>
        <p className="mt-2 text-lg font-700 text-ink-900">
          {grade.right} of {grade.total}
        </p>

        <ul className="mt-5 space-y-2">
          {grade.rows.map((r) => (
            <li
              key={r.word}
              className="rounded-petal border-2 border-cream-200 px-4 py-2 text-sm"
            >
              <span className="font-700 text-ink-900">{r.word}</span>
              {!r.correct && (
                <span className="ml-2 text-ink-500">
                  {r.skipped ? '— left blank' : `— you wrote ${r.given}`}
                </span>
              )}
              <span className="ml-2">{r.correct ? '🌸' : ''}</span>
            </li>
          ))}
        </ul>

        {/* ⚠️ The words she missed come back next week. That is said as a plan,
            never as a verdict, and the word "again" does not appear. */}
        {grade.rows.some((r) => !r.correct) && (
          <p className="mt-5 rounded-petal bg-cream-200 px-4 py-3 text-sm text-ink-700">
            The ones without a flower will be on your list next week.
          </p>
        )}

        <button type="button" onClick={onExit} className="mt-6 text-xs font-700 text-lavender-700">
          ← Back to today
        </button>
      </main>
    );
  }

  // ---- the test ------------------------------------------------------------

  if (phase === 'testing') {
    const done = plan.list.filter((i) => String(typed[i.word] ?? '').trim() !== '').length;

    return (
      <main className="mx-auto max-w-2xl px-4 py-8">
        <h1 className="font-display text-2xl text-ink-900">Spelling test</h1>
        <p className="mt-2 text-sm text-ink-700">
          Press the flower to hear the word, then type it. {done} of {plan.list.length} done.
        </p>

        <ol className="mt-6 space-y-4">
          {plan.list.map((item, i) => (
            <li key={item.word} className="rounded-petal border-2 border-cream-200 px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="w-5 text-sm font-700 text-ink-500">{i + 1}.</span>
                <button
                  type="button"
                  onClick={() => say(item.word)}
                  className="rounded-full border-2 border-sage-500 bg-sage-300/20 px-4 py-1.5 text-sm font-700 text-sage-700 hover:bg-sage-300/40"
                >
                  {speaking === item.word ? '🔊 saying it…' : '🌸 say the word'}
                </button>
                <input
                  type="text"
                  value={typed[item.word] ?? ''}
                  onChange={(e) => setTyped((t) => ({ ...t, [item.word]: e.target.value }))}
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck={false}
                  className="min-w-0 flex-1 rounded-petal border-2 border-cream-200 px-3 py-1.5 text-[0.95rem] text-ink-900"
                  aria-label={`Word ${i + 1}`}
                />
              </div>
            </li>
          ))}
        </ol>

        {/* No score, no marks, nothing green or red until she says she is done. */}
        <button
          type="button"
          onClick={finish}
          disabled={saving}
          className="mt-6 rounded-full border-2 border-lavender-500 bg-lavender-300/30 px-5 py-2 text-sm font-700 text-lavender-700 disabled:opacity-50"
        >
          {saving ? 'Saving…' : 'I have finished'}
        </button>
      </main>
    );
  }

  // ---- the study list ------------------------------------------------------

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="font-display text-2xl text-ink-900">Word Study</h1>
      <p className="mt-2 text-sm text-ink-700">
        Ten words to spell and ten to know. They all come from what you are reading this week.
      </p>

      <h2 className="mt-6 font-display text-lg text-ink-900">Your spelling words</h2>
      <ul className="mt-3 grid grid-cols-2 gap-2">
        {plan.list.map((item) => (
          <li key={item.word} className="rounded-petal bg-cream-200 px-3 py-2 text-[0.95rem] text-ink-900">
            <span className="font-700">{item.word}</span>
            {canSpeak && (
              <button
                type="button"
                onClick={() => say(item.word)}
                className="ml-2 text-xs text-sage-700"
                aria-label={`Say ${item.word}`}
              >
                🔊
              </button>
            )}
          </li>
        ))}
      </ul>

      <h2 className="mt-7 font-display text-lg text-ink-900">Words to know</h2>
      <ul className="mt-3 space-y-1">
        {vocabulary.map((v) => (
          <li key={v.word} className="text-[0.95rem] text-ink-900">
            · {v.word}
          </li>
        ))}
      </ul>

      {/* ⚠️ THE TEST REFUSES TO RUN WITHOUT SPEECH, AND SAYS SO. Falling back to
          showing her the word would write a grade to her record for a copying
          exercise, and it would look completely normal on screen. */}
      {canSpeak ? (
        <button
          type="button"
          onClick={() => setPhase('testing')}
          className="mt-8 rounded-full border-2 border-lavender-500 bg-lavender-300/30 px-5 py-2 text-sm font-700 text-lavender-700"
        >
          I am ready for the test
        </button>
      ) : (
        <p className="mt-8 rounded-petal border-2 border-gold-300 bg-gold-300/15 px-4 py-3 text-sm text-ink-700">
          The spelling test needs this computer to be able to say the words out loud, and it
          cannot. The list above still works — a grown-up can read the words to you.
        </p>
      )}

      <button type="button" onClick={onExit} className="mt-6 block text-xs font-700 text-lavender-700">
        ← Back to today
      </button>
    </main>
  );
}
