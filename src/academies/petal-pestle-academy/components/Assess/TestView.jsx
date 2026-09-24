import { useEffect, useMemo, useState } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import { MarigoldMessage } from '../Mentor/MarigoldMessage.jsx';
import { speechSupported, speakChunks, stopSpeaking, chunksForItem } from '../../lib/speech.js';
import { bankItemById } from '../../data/assessments/appBank.js'; // v3.25 — every course
import { gradeTest, presentQuestion } from '../../lib/assessmentEngine.js';
import { EXIT_TICKET } from '../../config/assessment.js';
import { lessonById } from '../../data/lessons/appCourses.js'; // v3.96 — every course

// ---------------------------------------------------------------------------
// SITTING A TEST.
//
// Three decisions in here are pedagogical rather than cosmetic, and each one
// would look like an oversight to anyone tidying up later.
//
// ---- 1. NO FEEDBACK UNTIL THE END ----
//
// Her warm-up tells her immediately whether she was right, because a warm-up is
// practice and practice without feedback rehearses the mistake. A test does
// not. The moment a test explains each answer as she goes it has become a
// lesson, and she starts using question three to work out question four.
//
// Everything is explained afterwards, all at once, with the lessons to go back
// to. That review is itself a second pass over the material, which is where a
// good part of the learning in a test actually happens.
//
// ---- 2. SHE CAN CHANGE HER MIND, AND GO BACK ----
//
// Nothing is locked until she presses Finish. A nine-year-old who realises on
// question eight that she misread question two should be able to fix it. There
// is no clock, and there is no lock, because neither measures anything about
// herbalism.
//
// ---- 3. A REST IN THE MIDDLE OF THE LONG ONE ----
//
// The quarterly test offers a stop at halfway. Twenty-four questions is long
// for her, and a tired second half measures tiredness. She can come back to it
// later the same day or the next day; every answer is already saved.
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// THE EXIT TICKET (v3.1)
//
// Re-asks up to two of the questions she actually missed, right after the
// review, in the same sitting. Taken from her brother's app, which reuses the
// student's own wrong answers rather than authoring new content — so the check
// is targeted at exactly what did not stick.
//
// NOT scored. It does not touch the attempt, the percentage or the band; the
// test is already graded and filed.
//
// AND IT DOES NOT MOVE THE SPACED REVIEW BOXES — see EXIT_TICKET in
// config/assessment.js. She read the answer thirty seconds ago on the screen
// above. Counting that as a successful retrieval would push a question she does
// not know into a longer interval, which is the precise failure the schedule
// exists to prevent. The miss stands. It comes back tomorrow morning.
// ---------------------------------------------------------------------------

function ExitTicket({ questions, onDone }) {
  const [answers, setAnswers] = useState({});
  const done = Object.keys(answers).length === questions.length;

  return (
    <section className="mt-6 rounded-petal border-2 border-lavender-300 bg-lavender-300/10 px-5 py-5">
      <p className="label-caps">One more look · not marked</p>
      <p className="mt-1 text-sm text-ink-700">
        {questions.length === 1 ? 'This one' : 'These two'} caught you out. Now that you have read
        the answer, try {questions.length === 1 ? 'it' : 'them'} again — nothing about this changes
        your score.
      </p>
      <div className="mt-3 space-y-4">
        {questions.map((q, qi) => {
          const picked = answers[qi];
          const settled = picked !== undefined;
          return (
            <article key={q.id} className="rounded-petal bg-white px-4 py-3.5">
              <p className="text-[0.95rem] font-700 text-ink-900">{q.prompt}</p>
              <div className="mt-2.5 space-y-2">
                {q.choices.map((choice, ci) => {
                  const isAnswer = settled && ci === q.answer;
                  const isWrongPick = settled && ci === picked && ci !== q.answer;
                  let cls = 'border-cream-300 bg-white hover:border-lavender-500';
                  if (isAnswer) cls = 'border-sage-500 bg-sage-300/40';
                  else if (isWrongPick) cls = 'border-clay-500 bg-clay-500/10';
                  else if (settled) cls = 'border-cream-300 bg-white opacity-60';
                  return (
                    <button
                      key={ci}
                      type="button"
                      disabled={settled}
                      onClick={() => setAnswers((a) => ({ ...a, [qi]: ci }))}
                      className={`flex w-full items-start gap-2.5 rounded-xl border-2 px-3.5 py-2.5 text-left text-sm ${cls}`}
                    >
                      <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-cream-200 text-[0.65rem] font-700 text-ink-700">
                        {String.fromCharCode(65 + ci)}
                      </span>
                      <span className="text-ink-900">{choice}</span>
                    </button>
                  );
                })}
              </div>
              {settled && (
                <p className="mt-2 text-sm text-ink-900">
                  <span className="font-700">{q.choices[q.answer]}</span> — {q.why}
                </p>
              )}
            </article>
          );
        })}
      </div>
      {done && (
        <p className="mt-3 text-sm font-700 text-ink-900">
          Good. You will see these again in your warm-ups over the next few weeks — that is where
          they actually stick.
        </p>
      )}
      <button
        type="button"
        onClick={onDone}
        className="mt-3 rounded-full border border-cream-300 bg-white px-5 py-2 text-sm font-700 text-ink-700 hover:border-lavender-500"
      >
        {done ? 'Done' : 'Skip this'}
      </button>
    </section>
  );
}

const TONE_RING = {
  sage: 'border-sage-500 bg-sage-300/25',
  gold: 'border-gold-500 bg-gold-300/25',
  clay: 'border-clay-500 bg-clay-500/10'
};

// ---------------------------------------------------------------------------
// v3.96 — THE LABEL KNOWS ALL FOUR COURSES.
//
// This read HERBALISM_Q1.find(...) from v2.x until now. HERBALISM_Q1 holds 13
// of the app's 256 lessons — the hb-1-01..13 flat cards. The other 243 fell
// through to the `: lessonId` fallback, so the results screen after a Human Body
// test offered her a button labelled "hb2-07", and so did Herbalism Q2, Q3 and
// Q4. It never threw, it never went red, and it looked like a design choice.
//
// The same bug the Gradebook had in four places at v3.95: a screen that knows
// one course of four. appCourses.js has answered for all four since v3.25.
//
// This function is a LABEL and has never been a gate. The gate is lessonIsOpen
// in lib/rotatingBlock.js. See the revisit buttons below, which now ask it.
// ---------------------------------------------------------------------------
function lessonTitle(lessonId) {
  const l = lessonById(lessonId);
  return l ? `${l.n}. ${l.title}` : lessonId;
}

// `canOpenLesson` is the gate, handed down by whoever renders this screen. A
// MISSING predicate means CLOSED, not open — see the revisit buttons. Failing
// closed on a forgotten prop shows her a lesson she cannot open; failing open
// hands her the whole course. check-lesson-doors asserts the prop is passed, so
// the closed case is caught before it ships rather than in front of her.
export function TestView({ form, onExit, onOpenLesson, canOpenLesson }) {
  const recordAttempt = useAppStore((s) => s.recordAttempt);

  const [index, setIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const [phase, setPhase] = useState('taking'); // taking | resting | done
  const [grade, setGrade] = useState(null);
  const [speaking, setSpeaking] = useState(false);
  // Sept 23 2026: she used "Read it to me" on 15 of 16 diagnostic questions
  // and on 0 of her last 50 test questions. These tests measure what she knows
  // about plants and the body, not her reading, so she is reminded the button
  // is there. A reminder on the first question only; never forced.
  const [usedReadAloud, setUsedReadAloud] = useState(false);
  const [saving, setSaving] = useState(false);
  const [exitDone, setExitDone] = useState(false);

  // The choices are dealt in a fresh order for this attempt. `responses` still
  // holds the BANK's index, not the on-screen one, so grading and the record
  // never need to know a shuffle happened.
  const questions = useMemo(
    () =>
      (form?.questionIds || [])
        .map((id) => bankItemById(id))
        .filter(Boolean)
        .map((q) => presentQuestion(q, `${form.testId}|attempt${form.attempt}`)),
    [form]
  );
  const current = questions[index] || null;
  const answeredCount = Object.keys(responses).length;
  const allAnswered = answeredCount === questions.length;

  // Stop Dr. Marigold mid-sentence if the question changes underneath her.
  useEffect(() => {
    stopSpeaking();
    setSpeaking(false);
  }, [index, phase]);

  useEffect(() => () => stopSpeaking(), []);

  function handleReadAloud() {
    if (speaking) {
      stopSpeaking();
      setSpeaking(false);
      return;
    }
    if (speakChunks(chunksForItem(current), { onEnd: () => setSpeaking(false) })) {
      setSpeaking(true);
      setUsedReadAloud(true);
    }
  }

  function choose(i) {
    // i is where she tapped; origIndex[i] is what that choice is called in the
    // bank. Everything stored is in the bank's numbering.
    setResponses((r) => ({ ...r, [current.id]: current.origIndex[i] }));
  }

  function next() {
    const at = index + 1;
    if (form.restAfter && at === form.restAfter && phase === 'taking') {
      setPhase('resting');
      return;
    }
    setIndex(Math.min(questions.length - 1, at));
  }

  async function finish() {
    setSaving(true);
    const g = gradeTest(form, responses);
    await recordAttempt(form, responses, g);
    setGrade(g);
    setPhase('done');
    setSaving(false);
  }

  // ---- the halfway rest ----
  if (phase === 'resting') {
    return (
      <main className="mx-auto max-w-2xl px-4 py-10">
        <MarigoldMessage
          text={`That is half of it. ${form.restAfter} down, ${questions.length - form.restAfter} to go. You can carry on now, or stop and come back later — everything you have answered is saved.`}
          tone="good"
        />
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              setPhase('taking');
              setIndex(form.restAfter);
            }}
            className="rounded-full bg-blush-500 px-6 py-2.5 font-700 text-white hover:bg-blush-700"
          >
            Carry on
          </button>
          <button
            type="button"
            onClick={onExit}
            className="rounded-full border border-cream-300 bg-white px-6 py-2.5 font-700 text-ink-700 hover:border-lavender-500"
          >
            Stop for now
          </button>
        </div>
      </main>
    );
  }

  // ---- the review, after Finish ----
  if (phase === 'done' && grade) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-8">
        <p className="label-caps">{form.title}</p>
        <div className={`mt-3 rounded-petal border-2 px-5 py-5 ${TONE_RING[grade.band.tone]}`}>
          <p className="font-display text-2xl text-ink-900">
            {grade.band.icon} {grade.band.label}
          </p>
          <p className="mt-1.5 text-sm text-ink-700">{grade.band.child}</p>
          {/* Deliberately no percentage on her screen. It is in the record. */}
          <p className="mt-2 text-xs text-ink-500">
            You got {grade.right} of {grade.total}.
          </p>
        </div>

        {grade.revisit.length > 0 && (
          <section className="mt-6">
            <h2 className="font-display text-lg text-ink-900">Worth going back to</h2>
            <p className="mt-1 text-xs text-ink-700">
              Not because you failed them. Because going back is what makes them stick.
            </p>
            <div className="mt-3 space-y-2">
              {grade.revisit.map((r) => {
                // v3.96 — THIS DOOR ASKS THE GATE.
                //
                // Gigi, Sep 3 2026: "It is supposed to be that she can only see
                // the lesson that is due so that she doesn't move forward before
                // completing."
                //
                // Until now this button called onOpenLesson straight through and
                // LessonsView opened the reader without asking lessonIsOpen. It
                // was harmless in practice, because a test only covers lessons
                // she has already read and a read lesson is open — but harmless
                // BY ACCIDENT OF THE DATA is not the same as guarded, and every
                // other route into the reader asks. This is the fourth door.
                //
                // Missing predicate means closed. See the note on the props.
                const open = canOpenLesson ? canOpenLesson(r.lesson) : false;
                const missText = r.misses === 1 ? '1 to look at' : `${r.misses} to look at`;
                return (
                  <button
                    key={r.lesson}
                    type="button"
                    disabled={!open}
                    aria-disabled={!open}
                    onClick={() => open && onOpenLesson?.(r.lesson)}
                    className={`flex w-full items-center justify-between rounded-petal border px-4 py-3 text-left ${
                      open
                        ? 'border-cream-300 bg-white hover:border-lavender-500'
                        : 'cursor-not-allowed border-cream-200 bg-cream-100 opacity-60'
                    }`}
                  >
                    <span
                      className={`text-sm font-700 ${open ? 'text-ink-900' : 'text-ink-500'}`}
                    >
                      {lessonTitle(r.lesson)}
                    </span>
                    {/* The closed wording is the list's own wording, word for
                        word — "Not yet — this one comes later", the v3.63 rule.
                        Two screens describing the same lock in two different
                        sentences is how a child learns the app is arbitrary. */}
                    <span className="text-xs text-ink-500">
                      {open ? `${missText} →` : 'Not yet — this one comes later'}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        <section className="mt-7">
          <h2 className="font-display text-lg text-ink-900">Every question</h2>
          <div className="mt-3 space-y-3">
            {grade.rows.map((row, i) => {
              const q = bankItemById(row.questionId);
              if (!q) return null;
              return (
                <article
                  key={row.questionId}
                  className={`rounded-petal border-2 px-4 py-3 ${
                    row.correct ? 'border-sage-500/50 bg-sage-300/15' : 'border-clay-500/45 bg-clay-500/5'
                  }`}
                >
                  <p className="text-[0.8rem] font-700 text-ink-500">
                    {row.correct ? '✓' : '↩'} Question {i + 1}
                  </p>
                  <p className="mt-1 text-[0.95rem] font-700 text-ink-900">{q.prompt}</p>
                  {!row.correct && (
                    <p className="mt-1.5 text-sm text-ink-700">
                      {row.skipped
                        ? 'You did not answer this one.'
                        : q.feedback[row.chosen] || 'Not quite.'}
                    </p>
                  )}
                  <p className="mt-1.5 text-sm text-ink-900">
                    <span className="font-700">{q.choices[q.answer]}</span> — {q.why}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        {/* The exit ticket sits AFTER the full review, never before it — she has
            to have read why she was wrong for re-asking to be worth anything. */}
        {!exitDone && grade.missedQuestionIds.length > 0 && (
          <ExitTicket
            questions={grade.missedQuestionIds
              .slice(0, EXIT_TICKET.maxQuestions)
              .map((id) => presentQuestion(bankItemById(id), `exit|${form.testId}|${form.attempt}`))
              .filter(Boolean)}
            onDone={() => setExitDone(true)}
          />
        )}

        <div className="mt-7 flex justify-center">
          <button
            type="button"
            onClick={onExit}
            className="rounded-full bg-blush-500 px-6 py-2.5 font-700 text-white hover:bg-blush-700"
          >
            Back to my course
          </button>
        </div>
      </main>
    );
  }

  if (!current) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-10 text-center">
        <p className="text-sm text-ink-700">This test has no questions yet.</p>
      </main>
    );
  }

  // ---- taking it ----
  // Back from the bank's numbering to the position on screen.
  const stored = responses[current.id];
  const chosen = stored === undefined ? undefined : current.origIndex.indexOf(stored);
  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="label-caps">{form.title}</p>
          <p className="text-xs text-ink-500">
            Question {index + 1} of {questions.length} · about {form.minutes} minutes · nothing is
            timed
          </p>
        </div>
        <button
          type="button"
          onClick={onExit}
          className="rounded-full border border-cream-300 bg-white px-3.5 py-1.5 text-xs font-700 text-ink-700 hover:border-clay-500"
        >
          Stop for now
        </button>
      </div>

      {/* A row of dots, not a percentage bar. She can jump back to any of them. */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {questions.map((q, i) => (
          <button
            key={q.id}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Question ${i + 1}`}
            className={`h-2.5 w-2.5 rounded-full ${
              i === index
                ? 'bg-blush-500'
                : responses[q.id] !== undefined
                  ? 'bg-lavender-500'
                  : 'bg-cream-300'
            }`}
          />
        ))}
      </div>

      <div className="mt-4 panel-white px-6 py-6">
        {speechSupported() && (
          <button
            type="button"
            onClick={handleReadAloud}
            className={`mb-4 rounded-full border-2 px-5 py-2 text-sm font-700 ${
              speaking
                ? 'border-lavender-500 bg-lavender-300/40 text-lavender-700'
                : 'border-cream-300 bg-white text-ink-700 hover:border-lavender-500'
            }`}
          >
            {speaking ? '⏹ Stop reading' : '🔊 Read it to me'}
          </button>
        )}
        {speechSupported() &&
          index === 0 &&
          !usedReadAloud &&
          (form?.kind === 'weekly' || form?.kind === 'quarter') && (
          <p className="-mt-2 mb-4 rounded-xl bg-lavender-300/20 px-3.5 py-2 text-xs text-ink-900">
            Dr. Marigold can read every question and answer to you. Tap 🔊 on any question.
            It is allowed on this test.
          </p>
        )}

        <p className="font-display text-lg leading-snug text-ink-900">{current.prompt}</p>

        <div className="mt-5 space-y-2.5">
          {current.choices.map((choice, i) => (
            <button
              key={i}
              type="button"
              onClick={() => choose(i)}
              className={`flex w-full items-start gap-3 rounded-xl border-2 px-4 py-3 text-left text-[0.95rem] ${
                chosen === i
                  ? 'border-lavender-500 bg-lavender-300/30'
                  : 'border-cream-300 bg-white hover:border-lavender-500'
              }`}
            >
              <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-cream-200 text-xs font-700 text-ink-700">
                {String.fromCharCode(65 + i)}
              </span>
              <span className="text-ink-900">{choice}</span>
            </button>
          ))}
        </div>

        <p className="mt-4 text-xs text-ink-500">
          You can change any answer until you press Finish. Nothing is marked until then.
        </p>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          disabled={index === 0}
          onClick={() => setIndex(Math.max(0, index - 1))}
          className="rounded-full border border-cream-300 bg-white px-4 py-2 text-sm font-700 text-ink-700 disabled:opacity-40"
        >
          ← Back
        </button>

        {index < questions.length - 1 ? (
          <button
            type="button"
            onClick={next}
            className="rounded-full bg-lavender-500 px-6 py-2.5 font-700 text-white hover:bg-lavender-700"
          >
            Next →
          </button>
        ) : (
          <button
            type="button"
            onClick={finish}
            disabled={saving}
            className="rounded-full bg-blush-500 px-6 py-2.5 font-700 text-white hover:bg-blush-700 disabled:opacity-50"
          >
            {saving ? 'Saving…' : 'Finish'}
          </button>
        )}
      </div>

      {!allAnswered && index === questions.length - 1 && (
        <p className="mt-3 text-center text-xs text-clay-500">
          {questions.length - answeredCount} question
          {questions.length - answeredCount === 1 ? ' is' : 's are'} still blank. Tap a grey dot
          above to go back to them.
        </p>
      )}
    </main>
  );
}
