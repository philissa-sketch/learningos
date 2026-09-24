// ---------------------------------------------------------------------------
// HER READING COURSE — today's lesson or test (Sept 24 2026).
//
// Opened from the Reading block on Today. It asks readingToday() which piece is
// next, the SAME function the block asks, so the two can never disagree about
// where she is. Finishing saves the piece, and saving it is what moves her on.
//
// Lessons: the passage stays on screen, "read it to me" is offered and recorded
// per answer. Thursday tests and quarter tests: NO read-aloud button at all
// (Gigi, Sept 23 2026); they are her ON HER OWN score.
//
// Every wrong answer gets its feedback when she finishes. No videos here.
// ---------------------------------------------------------------------------

import { useMemo, useState } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import { gradeReadingCheck } from '../../lib/readingCheck.js';
import { readingToday, buildReadingForm } from '../../lib/readingProgress.js';
import { speechSupported, speakChunks, stopSpeaking } from '../../lib/speech.js';

export function ReadingLessonView({ onExit }) {
  const attempts = useAppStore((s) => s.attempts);
  const recordReadingWork = useAppStore((s) => s.recordReadingWork);

  // Worked out ONCE when the screen opens. After she finishes, `attempts`
  // changes and readingToday moves on; the finished screen must keep showing
  // the piece she just did, not jump to the next one.
  const [plan] = useState(() => readingToday(useAppStore.getState().attempts, new Date()));
  const form = useMemo(
    () => (plan.canStart && plan.next ? buildReadingForm(plan.next.id) : null),
    [plan]
  );

  const [responses, setResponses] = useState({});
  const [speakingId, setSpeakingId] = useState(null);
  const [grade, setGrade] = useState(null);
  const [saving, setSaving] = useState(false);

  const after = grade ? readingToday(attempts, new Date()) : null;

  if (!form) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-8">
        <p className="label-caps">📖 Reading</p>
        <h1 className="mt-1 font-display text-3xl text-ink-900">
          {plan.next ? 'Today’s reading is done' : 'Every reading lesson so far is done'}
        </h1>
        <p className="mt-3 text-sm text-ink-700">
          {plan.next
            ? `Next time: ${plan.next.title}. Now it is book time.`
            : 'More lessons are being written. Now it is book time.'}
        </p>
        <button type="button" onClick={onExit} className="mt-6 rounded-full bg-sage-700 px-5 py-2 text-sm font-700 text-white">
          Back to my day
        </button>
      </main>
    );
  }

  const isTest = form.type !== 'lesson';
  const answered = form.questions.filter((q) => responses[q.id]?.chosen !== undefined).length;
  const allAnswered = answered === form.questions.length;
  const canSpeak = form.readAloud && speechSupported();

  // Reading the passage marks every question on it as read-aloud: the cautious
  // direction, the same rule as the reading check.
  function readPassage(p) {
    if (!form.readAloud) return;
    if (speakingId === p.id) {
      stopSpeaking();
      setSpeakingId(null);
      return;
    }
    if (speakChunks(p.text.split(/\n\n+/).filter(Boolean), { onEnd: () => setSpeakingId(null) })) setSpeakingId(p.id);
    setResponses((r) => {
      const next = { ...r };
      for (const q of form.questions) if (q.passage === p.id) next[q.id] = { ...(next[q.id] || {}), readAloud: true };
      return next;
    });
  }

  function readQuestion(q) {
    if (!form.readAloud) return;
    if (speakingId === q.id) {
      stopSpeaking();
      setSpeakingId(null);
      return;
    }
    if (speakChunks([q.prompt, ...q.choices], { onEnd: () => setSpeakingId(null) })) setSpeakingId(q.id);
    setResponses((r) => ({ ...r, [q.id]: { ...(r[q.id] || {}), readAloud: true } }));
  }

  function choose(q, i) {
    setResponses((r) => ({ ...r, [q.id]: { ...(r[q.id] || {}), chosen: i } }));
  }

  async function finish() {
    if (saving || !allAnswered) return;
    setSaving(true);
    stopSpeaking();
    const g = gradeReadingCheck(form, responses);
    await recordReadingWork(form, g);
    setGrade(g);
    setSaving(false);
    if (typeof window !== 'undefined') window.scrollTo(0, 0);
  }

  // ---- finished ----
  if (grade) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-8">
        <p className="label-caps">
          📖 Module {form.module} · {form.moduleTitle}
        </p>
        <h1 className="mt-1 font-display text-3xl text-ink-900">{form.title}: done</h1>
        <div className="panel mt-5 px-5 py-5">
          <p className="font-display text-2xl text-ink-900">
            {grade.right} of {grade.total}
          </p>
          <p className="mt-1 text-sm text-ink-700">{isTest ? 'On your own' : 'Lesson'}</p>
        </div>

        <div className="mt-5 space-y-2">
          {form.questions.map((q) => {
            const row = grade.rows.find((r) => r.questionId === q.id);
            const wrong = !row?.correct;
            return (
              <div key={q.id} className="rounded-petal border border-cream-300 bg-white px-4 py-3">
                <p className="text-sm font-700 text-ink-900">
                  {wrong ? '·' : '✓'} {q.prompt}
                </p>
                {wrong && (
                  <>
                    {row?.chosen != null && q.feedback?.[row.chosen] && (
                      <p className="mt-1 text-[0.8rem] text-ink-900">{q.feedback[row.chosen]}</p>
                    )}
                    <p className="mt-1 text-[0.75rem] text-ink-700">
                      <span className="font-700">{q.choices[q.answer]}</span> — {q.why}
                    </p>
                  </>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-5 rounded-petal border border-sage-500/40 bg-sage-300/15 px-4 py-3 text-sm text-ink-900">
          {after?.next ? (
            <p>
              Next {after.canStart ? 'up' : 'time'}: <span className="font-700">{after.next.title}</span>
              {after.canStart ? ' (it is Friday catch-up, so you may keep going).' : '.'}
            </p>
          ) : (
            <p>That was the last lesson written so far.</p>
          )}
          <p className="mt-1">
            Now it is book time
            {form.book ? (
              <>
                : <span className="italic">{form.book.title}</span>, or any book you like.
              </>
            ) : (
              '.'
            )}
          </p>
        </div>

        <button type="button" onClick={onExit} className="mt-6 rounded-full bg-sage-700 px-5 py-2 text-sm font-700 text-white">
          Back to my day
        </button>
      </main>
    );
  }

  // ---- doing it ----
  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <button type="button" onClick={onExit} className="text-xs font-700 text-ink-700">
        ← Back
      </button>

      <header className="mt-3">
        <p className="label-caps">
          📖 Module {form.module} · {form.moduleTitle} ·{' '}
          {form.type === 'lesson' ? 'Lesson' : form.type === 'test' ? 'Thursday test' : 'Quarter test'}
        </p>
        <h1 className="mt-1 font-display text-3xl text-ink-900">{form.title}</h1>
        <p className="mt-2 text-sm text-ink-700">
          {isTest
            ? 'This one you read on your own. There is no read-aloud today. Take your time, and look back at the story whenever you want.'
            : 'Read the story, then answer. The story stays on the screen the whole time.'}
        </p>
      </header>

      {form.passages.map((p) => {
        const qs = form.questions.filter((q) => q.passage === p.id);
        return (
          <section key={p.id} className="mt-7">
            <div className="panel px-5 py-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="font-display text-xl text-ink-900">{p.title}</h2>
                {canSpeak && (
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
                      {canSpeak && (
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
            allAnswered && !saving ? 'bg-sage-700 text-white hover:bg-sage-500' : 'cursor-not-allowed bg-cream-200 text-ink-500'
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

export default ReadingLessonView;
