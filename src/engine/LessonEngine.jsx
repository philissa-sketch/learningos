import { useMemo, useState } from 'react';
import { useAppStore } from '../store/useAppStore.js';
import { isAnswerCorrect, scoreLessonAttempt, getWrongAnswerFeedback, isAutoGradable } from './lessonScoring.js';
import { hashSeed, shuffleQuestionChoices, shuffleQuestionSet } from './shuffleChoices.js';
import { getTemplateById } from './problemTemplates.js';
import { QuestionCard } from '../components/Lesson/QuestionCard.jsx';
import { FeedbackPanel } from '../components/Lesson/FeedbackPanel.jsx';
import { NovaMessage } from '../components/Mentor/NovaMessage.jsx';
import { GlossaryText } from '../components/Mentor/GlossaryText.jsx';
import { getHintMessage } from '../lib/novaVoice.js';
import { buildGuidedNotes, GuidedNotes } from '../components/Lesson/GuidedNotes.jsx';
import { getDiagramComponent } from '../components/Lesson/diagrams/index.js';

/**
 * LessonEngine — the single, reusable lesson flow every subject plugs a
 * `lesson` object into. Do not fork this per subject — add new question
 * `type`s or phases here instead if a future subject needs one.
 *
 * Phases, in order (a lesson can skip phases it doesn't have data for):
 *   'passage'      — Reading-style lessons show a passage first (unchanged).
 *   'beat-teach'   — Commander Nova teaches ONE small concept (2-4
 *                    sentences + one example), with any new vocabulary
 *                    introduced inside that example's sentence, not a
 *                    separate glossary box (Duolingo's pattern). Beats may
 *                    also carry an optional `diagramId` — a simple inline
 *                    SVG diagram rendered alongside the worked example
 *                    where a picture genuinely aids understanding (see
 *                    components/Lesson/diagrams — scoped lesson-by-lesson,
 *                    not every beat) — and an optional `hook`, the
 *                    Learn-Do template's "Hook" stage: a 1-2 sentence
 *                    surprising fact or question rendered above the
 *                    teaching text, before any instruction happens.
 *                    Skipped automatically when absent.
 *   'beat-guided-notes' — Scaffolding step (only shown when the beat's
 *                    teaching text actually contains glossary terms to
 *                    blank out): an auto-generated fill-in-the-blank recap
 *                    of what was just taught, built from `teachingText` +
 *                    `novaIntro.glossary` — no new hand-authored content.
 *                    Ungraded. Skipped automatically when there's nothing
 *                    to blank out.
 *   'beat-practice'— Immediately after teaching that one concept, a small
 *                    set of contextual practice questions on JUST that
 *                    concept (Brilliant's pattern — small teach, then
 *                    immediate practice, not one long briefing followed by
 *                    a wall of unrelated drilling). Hints available. Not
 *                    scored for mastery.
 *   'beat-apply-it'— The Learn-Do template's "Active Application" stage,
 *                    completing what beat-practice alone doesn't cover:
 *                    ONE scenario-style question per beat (`beat.
 *                    applyItQuestion`) that asks the student to apply the
 *                    concept to a new situation, not just answer a drilled
 *                    variant of it. No hints (this is a transfer check,
 *                    not more scaffolding) — still ungraded, still doesn't
 *                    count toward mastery. Skipped automatically when a
 *                    beat has no `applyItQuestion` authored yet.
 *   'beat-reflect' — Self-explanation step, ungraded ("explain this to
 *                    Commander Nova in your own words"): a free-text box
 *                    captured (not scored — no live AI/API integration
 *                    exists in this app to evaluate it) after each beat's
 *                    practice (and apply-it question, if there is one),
 *                    before moving to the next beat's teach screen, or to
 *                    'test' if this was the last beat.
 *   'test'         — The lesson's fixed `questions` array, no hints, mixing
 *                    all beats together. Mastery (90%+) scored from here.
 *                    Wrong answers get feedback specific to THAT wrong
 *                    choice (see lessonScoring.getWrongAnswerFeedback),
 *                    not a generic explanation.
 *   'debrief'      — FeedbackPanel, unchanged.
 *
 * Backward compatible: lessons using the older `novaIntro.steps` /
 * `novaIntro.concept` shape (not yet migrated to `beats`) fall back to a
 * single briefing screen followed by the old practice/test flow, so nothing
 * breaks mid-retrofit.
 */
/**
 * A BEAT CAN DECLINE THE "EXPLAIN IT BACK" STEP. (Aug 9, 2026.)
 *
 * The parent, looking at a grading queue full of "ASDFGHJKL;" and "MPH FOR
 * WORDS": "the app currently has this setup for Typing in Tech but I am
 * wonder if it is useful to have this graded."
 *
 * It was not, and the deeper problem was that the question should never have
 * been asked. Teach-it-back is a real study technique and it works on ideas —
 * "explain how a wing makes lift, in your own words" is worth answering. It
 * has nothing to grab onto in a motor-skill drill: the honest answer to
 * "explain the home row" IS "asdfghjkl;". He was not being lazy. The prompt
 * had no content in it, and it ran on every beat of every lesson because
 * nothing let a beat say no.
 *
 * Opt-OUT rather than opt-in, deliberately: the default is still to ask, so a
 * new conceptual lesson gets the step without anyone remembering this flag
 * exists. Only a beat that is drilling a physical skill sets `reflect: false`.
 */
export function beatWantsReflection(beat) {
  return beat?.reflect !== false;
}

export function LessonEngine({ lesson, onExit, onOpenView }) {
  const recordLessonResult = useAppStore((s) => s.recordLessonResult);
  const recordSelfExplanation = useAppStore((s) => s.recordSelfExplanation);

  const hasBeats = Boolean(lesson.novaIntro?.beats);
  const beats = lesson.novaIntro?.beats || [];
  const legacyHasPractice = !hasBeats && Boolean(lesson.novaIntro?.practiceGeneratorId);
  const legacyPracticeTarget = lesson.novaIntro?.practiceCount || 20;
  const legacyPracticeGenerator = legacyHasPractice ? getTemplateById(lesson.novaIntro.practiceGeneratorId) : null;

  const [phase, setPhase] = useState(() => {
    if (lesson.passage) return 'passage';
    if (hasBeats) return 'beat-teach';
    if (lesson.novaIntro) return 'briefing'; // legacy single-briefing flow
    return 'test';
  });
  const [beatIndex, setBeatIndex] = useState(0);
  const activeBeat = beats[beatIndex];
  const beatGenerator = activeBeat ? getTemplateById(activeBeat.practiceGeneratorId) : null;
  const beatPracticeTarget = activeBeat?.practiceCount || 4;

  // --- Beat practice state (also reused for the legacy single-practice-block flow) ---
  const [practiceCount, setPracticeCount] = useState(0);
  const [practiceQuestion, setPracticeQuestion] = useState(() =>
    beatGenerator ? beatGenerator.build() : legacyPracticeGenerator ? legacyPracticeGenerator.build() : null
  );
  const [practiceResult, setPracticeResult] = useState(null);
  const [practiceHintShown, setPracticeHintShown] = useState(false);
  // Practice mastery gate (parent's confirmed requirement): a student
  // must get PRACTICE_MASTERY_THRESHOLD correct on THIS beat's practice
  // before the test unlocks. `practiceCorrectHistory` tracks every
  // practice answer given so far in the current beat (reset each time a
  // new beat starts). If accuracy falls short once the normal target is
  // reached, practice EXTENDS with more real questions from the same
  // generator rather than letting the student through anyway — capped at
  // PRACTICE_MAX_ROUNDS so a struggling student is never trapped with no
  // way forward, just genuinely more practice first.
  const [practiceCorrectHistory, setPracticeCorrectHistory] = useState([]);
  const [practiceExtended, setPracticeExtended] = useState(false);

  // --- Self-explanation state (gap 3 — ungraded "teach it back" free text) ---
  const [reflectionText, setReflectionText] = useState('');

  // --- Apply-It state (Learn-Do template's Active Application stage) ---
  const [applyItResult, setApplyItResult] = useState(null);

  // --- Test phase state ---
  const [questionIndex, setQuestionIndex] = useState(0);

  /**
   * When this attempt started.
   *
   * Added August 6, 2026 for the Learning Analytics Dashboard. The plan
   * lists "which lessons took the longest" as unanswerable because
   * lesson duration was never recorded anywhere — only completion and
   * accuracy. That stays true forever unless the recording starts, and
   * data not collected today is data not available in June, so this
   * begins accumulating now even though nothing reads it for weeks.
   *
   * A lazy useState initializer, so it is the moment the lesson opened
   * rather than a value that resets on every re-render.
   */
  const [startedAtMs] = useState(() => Date.now());

  /**
   * Seed for this sitting's choice-order shuffle (see shuffleChoices.js).
   *
   * A lazy useState initializer on purpose — it must be fixed for the whole
   * attempt so the buttons never reorder mid-question on a re-render, and it
   * must differ between attempts so a retake of a failed quarterly exam
   * re-tests the material instead of replaying a memorized button sequence.
   * The component remounts per lesson open, so opening a lesson again is a
   * new seed.
   */
  const [attemptSeed] = useState(() => Date.now() >>> 0);
  const [answersById, setAnswersById] = useState({});
  const [lastResult, setLastResult] = useState(null);
  const [attemptResult, setAttemptResult] = useState(null);
  const [hintShownFor, setHintShownFor] = useState(null);

  // DEFENSIVE, added Aug 6, 2026 after a real crash was found in testing.
  //
  // This used to read `lesson.questions[questionIndex]` directly. That line
  // runs unconditionally on every render, so ANY lesson missing its
  // `questions` array threw "Cannot read properties of undefined" the
  // instant it opened — and because the app has no error boundary yet
  // (roadmap item #3), the whole app went white, not just the lesson.
  //
  // It was not hypothetical: 32 of the 36 Technology lessons are in exactly
  // that state. scripts/verify-curriculum.mjs now fails on any lesson with
  // no questions array, so this is caught in seconds rather than by a
  // student hitting a blank screen.
  //
  // The guard does NOT paper over the content gap. `hasTestQuestions` stays
  // false, and the test phase renders an honest "not finished yet" panel
  // instead of a zero-question test — which would score 0/0 and hand
  // lessonScoring a NaN accuracy.
  //
  // CHOICE ORDER, added Aug 6, 2026 — see src/engine/shuffleChoices.js for
  // the full writeup. In short: the correct answer was at index 0 in ~98% of
  // every hand-authored test question in the app, and nothing shuffled them,
  // so "always click the first button" scored roughly 98%. Every graded
  // number in the record — mastery, report card letter grades, the
  // transcript — sat on top of that.
  //
  // The permuted array is what the rest of this component uses for
  // EVERYTHING downstream: rendering, submitting, scoring, and the exit
  // check. It must never be mixed with `lesson.questions`, because
  // `answer` is an index and the two arrays disagree about what index 0
  // means. `scoreLessonAttempt` below is handed these questions, not the
  // lesson's originals, for exactly that reason.
  // Deps are `lesson.questions` itself, not a derived array — a
  // `? x : []` fallback allocates a fresh [] every render, which would
  // re-run the shuffle (and visibly reorder the buttons) on every keystroke.
  // shuffleQuestionSet already returns [] for a non-array input.
  const testQuestions = useMemo(
    () => shuffleQuestionSet(lesson.questions, { lessonId: lesson.id, attemptSeed }),
    [lesson.questions, lesson.id, attemptSeed]
  );
  const hasTestQuestions = testQuestions.length > 0;
  const question = testQuestions[questionIndex];

  // Apply-It transfer questions are hand-authored too, so they carry the
  // same index-0 bias. Shuffled once per beat and shared by BOTH the submit
  // handler and the render below — reshuffling between those two would score
  // the answer against a different arrangement than the one clicked.
  const activeApplyItQuestion = useMemo(
    () =>
      activeBeat?.applyItQuestion
        ? shuffleQuestionChoices(
            activeBeat.applyItQuestion,
            hashSeed(lesson.id, 'apply-it', String(beatIndex), attemptSeed)
          )
        : null,
    [activeBeat, lesson.id, beatIndex, attemptSeed]
  );
  const isLastQuestion = questionIndex === testQuestions.length - 1;
  const activePracticeTarget = hasBeats ? beatPracticeTarget : legacyPracticeTarget;
  const PRACTICE_MASTERY_THRESHOLD = 0.8;
  const PRACTICE_MAX_ROUNDS = activePracticeTarget * 2; // humane cap — never traps the student indefinitely

  // ---- Practice submit (shared by beat-practice and legacy practice) ----
  const handlePracticeSubmit = (submittedValue) => {
    const correct = isAnswerCorrect(practiceQuestion, submittedValue);
    const feedback = correct ? practiceQuestion.explanation : getWrongAnswerFeedback(practiceQuestion, submittedValue);
    setPracticeResult({ correct, feedback });
    setPracticeCorrectHistory((prev) => [...prev, correct]);
  };

  const handlePracticeContinue = () => {
    const nextCount = practiceCount + 1;
    setPracticeResult(null);
    setPracticeHintShown(false);

    const historyAfterThis = practiceCorrectHistory; // already includes this question, set in handlePracticeSubmit
    const accuracySoFar = historyAfterThis.length > 0
      ? historyAfterThis.filter(Boolean).length / historyAfterThis.length
      : 0;
    const metTarget = nextCount >= activePracticeTarget;
    const metMastery = accuracySoFar >= PRACTICE_MASTERY_THRESHOLD;
    const hitMaxRounds = nextCount >= PRACTICE_MAX_ROUNDS;

    if (metTarget && !metMastery && !hitMaxRounds) {
      // Below the 80% gate but hasn't hit the humane cap yet — extend
      // practice with one more real question from the same generator,
      // re-checking accuracy after every additional question.
      setPracticeExtended(true);
      setPracticeCount(nextCount);
      const gen = hasBeats ? beatGenerator : legacyPracticeGenerator;
      setPracticeQuestion(gen.build());
      return;
    }

    if (metTarget || hitMaxRounds) {
      setPracticeExtended(false);
      setPracticeCorrectHistory([]);
      if (hasBeats) {
        // Active Application (Learn-Do template): a beat with a real
        // applyItQuestion authored gets that transfer question next;
        // otherwise skip straight to self-explanation, same "skip when
        // absent" rule every other optional phase in this engine follows.
        if (activeBeat?.applyItQuestion) {
          setApplyItResult(null);
          setPhase('beat-apply-it');
        } else if (beatWantsReflection(activeBeat)) {
          setReflectionText('');
          setPhase('beat-reflect');
        } else {
          advanceFromBeat();
        }
      } else {
        setPhase('test');
      }
    } else {
      setPracticeCount(nextCount);
      const gen = hasBeats ? beatGenerator : legacyPracticeGenerator;
      setPracticeQuestion(gen.build());
    }
  };

  // ---- Self-explanation continue (gap 3) — captures the reflection (if
  // any was typed), then does the actual beat-advance/move-to-test that
  // handlePracticeContinue used to do directly before this step existed. ----
  const advanceFromBeat = () => {
    if (beatIndex < beats.length - 1) {
      const nextBeat = beats[beatIndex + 1];
      const nextGen = getTemplateById(nextBeat.practiceGeneratorId);
      setBeatIndex((i) => i + 1);
      setPracticeCount(0);
      setPracticeQuestion(nextGen.build());
      setPhase('beat-teach');
    } else {
      setPhase('test');
    }
  };

  const handleReflectContinue = () => {
    if (reflectionText.trim()) {
      recordSelfExplanation(lesson.id, activeBeat?.label, reflectionText);
    }
    setReflectionText('');
    advanceFromBeat();
  };

  // ---- Apply-It handlers (Active Application — a single scenario question,
  // no hints, then straight into self-explanation) ----
  const handleApplyItSubmit = (submittedValue) => {
    const q = activeApplyItQuestion;
    const correct = isAnswerCorrect(q, submittedValue);
    const feedback = correct ? q.explanation : getWrongAnswerFeedback(q, submittedValue);
    setApplyItResult({ correct, feedback });
  };

  const handleApplyItContinue = () => {
    setApplyItResult(null);
    if (!beatWantsReflection(activeBeat)) {
      advanceFromBeat();
      return;
    }
    setReflectionText('');
    setPhase('beat-reflect');
  };

  // ---- Test phase handlers ----
  const handleSubmit = (submittedValue) => {
    // A written answer is stored for his mother to read and is left out of the
    // score entirely (see lessonScoring.scoreLessonAttempt). It goes through
    // the same selfExplanations table as the "explain it to Commander Nova"
    // reflections, so it surfaces in the Ready to Grade queue beside them
    // rather than needing a second pipeline.
    if (!isAutoGradable(question)) {
      recordSelfExplanation(lesson.id, `${lesson.title} — ${question.prompt}`, String(submittedValue ?? ''));
      setLastResult({
        correct: null,
        awaitingParentGrade: true,
        feedback: question.explanation
          ? `Saved for your mom to read and grade.\n\n${question.explanation}`
          : 'Saved for your mom to read and grade. This one is not scored automatically.'
      });
      setAnswersById((prev) => ({ ...prev, [question.id]: submittedValue }));
      return;
    }
    const correct = isAnswerCorrect(question, submittedValue);
    const feedback = correct ? question.explanation : getWrongAnswerFeedback(question, submittedValue);
    setLastResult({ correct, feedback });
    setAnswersById((prev) => ({ ...prev, [question.id]: submittedValue }));
  };

  const handleContinue = () => {
    setHintShownFor(null);
    if (!isLastQuestion) {
      setQuestionIndex((i) => i + 1);
      setLastResult(null);
      return;
    }
    const finalAnswers = { ...answersById, [question.id]: answersById[question.id] };
    // Scored against the SHUFFLED questions, not `lesson.questions` — the
    // student's submitted values are indexes into what was actually on
    // screen. Handing the originals here would mark nearly every correct
    // answer wrong.
    const result = scoreLessonAttempt({ ...lesson, questions: testQuestions }, finalAnswers);
    setAttemptResult(result);
    // Minutes on this attempt, rounded. Capped in the store rather than
    // here — a lesson left open over lunch is a stale tab, not an hour
    // of instruction.
    recordLessonResult(lesson.id, { ...result, durationMs: Date.now() - startedAtMs });
  };

  // ---- Exit ticket state (parent's confirmed requirement: 1-2 quick,
  // ungraded checks right after the lesson, separate from the mastery
  // test, to spot immediate confusion). Deliberately reuses the test's
  // OWN missed questions rather than requiring new authored content per
  // lesson — every lesson already has this data, no new writing needed,
  // and re-asking exactly what was missed is a more targeted check than
  // a generic extra question would be. Capped at 2, per the confirmed
  // "1 to 2 exit-ticket questions" spec. Not scored toward mastery —
  // purely a same-sitting confidence/confusion check for the student. ----
  const [showExitCheck, setShowExitCheck] = useState(false);
  const [exitCheckIndex, setExitCheckIndex] = useState(0);
  const [exitCheckResult, setExitCheckResult] = useState(null);
  const exitCheckQuestions = attemptResult
    ? attemptResult.results
        .filter((r) => !r.correct)
        .slice(0, 2)
        .map((r) => testQuestions.find((q) => q.id === r.questionId))
        .filter(Boolean)
    : [];

  const handleExitCheckSubmit = (submittedValue) => {
    const q = exitCheckQuestions[exitCheckIndex];
    const correct = isAnswerCorrect(q, submittedValue);
    setExitCheckResult({ correct, feedback: correct ? q.explanation : getWrongAnswerFeedback(q, submittedValue) });
  };

  const handleExitCheckContinue = () => {
    setExitCheckResult(null);
    if (exitCheckIndex + 1 < exitCheckQuestions.length) {
      setExitCheckIndex((i) => i + 1);
    } else {
      onExit();
    }
  };

  // ---- Exit Check phase ----
  if (attemptResult && showExitCheck && exitCheckQuestions.length > 0) {
    const ecq = exitCheckQuestions[exitCheckIndex];
    return (
      <div className="mx-auto max-w-2xl space-y-4 px-4 py-6 sm:px-6">
        <div className="rounded-lg border border-signal-cyan/30 bg-signal-cyan/5 p-3 text-center">
          <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">
            Quick Exit Check — {exitCheckIndex + 1} of {exitCheckQuestions.length} — Not Scored
          </p>
          <p className="mt-1 text-xs text-ink-500">
            One more look at something from today, now that you've seen the answer. This doesn't
            change your grade — it's just to make sure it really stuck.
          </p>
        </div>
        <QuestionCard
          key={`exit-check-${ecq.id}`}
          question={ecq}
          index={exitCheckIndex}
          total={exitCheckQuestions.length}
          onSubmit={handleExitCheckSubmit}
          locked={Boolean(exitCheckResult)}
          lastResult={exitCheckResult}
          glossaryTerms={lesson.novaIntro?.glossary}
        />
        {exitCheckResult && (
          <button
            type="button"
            onClick={handleExitCheckContinue}
            className="w-full rounded-lg bg-signal-cyan px-4 py-2 font-display font-700 text-space-950 transition hover:brightness-110"
          >
            {exitCheckIndex + 1 < exitCheckQuestions.length ? 'Next Quick Check' : 'Return to Mission Control'}
          </button>
        )}
      </div>
    );
  }

  // ---- Debrief ----
  if (attemptResult) {
    return (
      <FeedbackPanel
        attemptResult={attemptResult}
        lesson={lesson}
        onDone={onExit}
        onExitCheck={exitCheckQuestions.length > 0 ? () => setShowExitCheck(true) : null}
        onOpenView={onOpenView}
      />
    );
  }

  const ExitBar = ({ label }) => (
    <div className="flex items-center justify-between">
      <button type="button" onClick={onExit} className="text-sm text-ink-500 hover:text-ink-100">
        ← Exit mission
      </button>
      <span className="text-sm text-ink-500">{label}</span>
    </div>
  );

  // ---- Passage phase (Reading-style lessons, unchanged) ----
  if (phase === 'passage') {
    return (
      <div className="mx-auto max-w-2xl space-y-4 px-4 py-6 sm:px-6">
        <ExitBar label={lesson.title} />
        <div className="rounded-xl border border-space-700 bg-space-800 p-6 shadow-panel">
          <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Reading Passage</p>
          <h2 className="mt-2 font-display text-2xl font-700 text-ink-100">{lesson.title}</h2>
          <div className="mt-4 space-y-3 text-ink-300">
            {lesson.passage.split('\n\n').map((paragraph, i) => (
              <p key={i} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
        <button
          type="button"
          onClick={() => setPhase(hasBeats ? 'beat-teach' : lesson.novaIntro ? 'briefing' : 'test')}
          className="w-full rounded-lg bg-signal-cyan px-4 py-2 font-display font-700 text-space-950 transition hover:brightness-110"
        >
          Begin Questions
        </button>
      </div>
    );
  }

  // ---- Beat teach phase — ONE small concept, taught with vocabulary woven into the example ----
  if (phase === 'beat-teach') {
    const beat = beats[beatIndex];
    const DiagramComponent = beat.diagramId ? getDiagramComponent(beat.diagramId) : null;
    const guidedNotesForBeat = buildGuidedNotes(beat.teachingText, lesson.novaIntro?.glossary);
    return (
      <div className="mx-auto max-w-2xl space-y-4 px-4 py-6 sm:px-6">
        <ExitBar label={`${lesson.title} — ${beatIndex + 1} of ${beats.length}`} />

        {beat.hook && (
          <div className="rounded-lg border border-signal-green/30 bg-signal-green/5 p-3">
            <p className="text-xs font-display uppercase tracking-widest text-signal-green">Did You Know?</p>
            <p className="mt-1 text-sm text-ink-200">{beat.hook}</p>
          </div>
        )}

        <NovaMessage label="Commander Nova" tone="brief">
          <p className="font-display text-sm font-700 text-signal-cyan">{beat.label}</p>
          <p className="mt-2">
            <GlossaryText text={beat.teachingText} terms={lesson.novaIntro.glossary} keyPrefix="teach-" />
          </p>
          {beat.example && (
            <div className="mt-3 rounded-lg border border-space-700 bg-space-900 p-3">
              <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Worked Example</p>
              <p className="mt-1 font-mono text-sm text-ink-100">
                <GlossaryText text={beat.example} terms={lesson.novaIntro.glossary} keyPrefix="ex-" />
              </p>
            </div>
          )}
          {DiagramComponent && (
            <div className="mt-3 rounded-lg border border-space-700 bg-space-900 p-3">
              <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Diagram</p>
              <div className="mt-2">
                <DiagramComponent />
              </div>
            </div>
          )}
          {beatIndex === beats.length - 1 && lesson.novaIntro.connection && (
            <div className="mt-3 rounded-lg border border-signal-amber/30 bg-signal-amber/5 p-3">
              <p className="text-xs font-display uppercase tracking-widest text-signal-amber">
                How an Aerospace Engineer Uses This
              </p>
              <p className="mt-1">
                <GlossaryText text={lesson.novaIntro.connection} terms={lesson.novaIntro.glossary} keyPrefix="conn-" />
              </p>
            </div>
          )}
          {beatIndex === beats.length - 1 && lesson.novaIntro.videoUrl && (
            <a
              href={lesson.novaIntro.videoUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block text-sm text-signal-cyan underline hover:text-signal-cyan/80"
            >
              ▶ Watch a short video on this concept
            </a>
          )}
        </NovaMessage>

        <button
          type="button"
          onClick={() => setPhase(guidedNotesForBeat ? 'beat-guided-notes' : 'beat-practice')}
          className="w-full rounded-lg bg-signal-cyan px-4 py-2 font-display font-700 text-space-950 transition hover:brightness-110"
        >
          {guidedNotesForBeat ? 'Guided Notes First' : `Try It — ${beatPracticeTarget} Quick Practice Questions`}
        </button>
      </div>
    );
  }

  // ---- Guided notes phase (gap 2 — scaffolding) — only reached when the
  // current beat's teaching text actually has glossary terms to blank out. ----
  if (phase === 'beat-guided-notes') {
    const beat = beats[beatIndex];
    const guidedNotes = buildGuidedNotes(beat.teachingText, lesson.novaIntro?.glossary);
    return (
      <div className="mx-auto max-w-2xl space-y-4 px-4 py-6 sm:px-6">
        <ExitBar label={`${lesson.title} — ${beatIndex + 1} of ${beats.length}`} />
        <GuidedNotes key={beatIndex} guidedNotes={guidedNotes} onDone={() => setPhase('beat-practice')} />
      </div>
    );
  }

  // ---- Apply-It phase (Learn-Do template's Active Application stage) —
  // only reached when the current beat has a real applyItQuestion
  // authored; one scenario-style question, no hints (this checks transfer,
  // not more scaffolding), ungraded. ----
  if (phase === 'beat-apply-it') {
    const applyItQuestion = activeApplyItQuestion;
    return (
      <div className="mx-auto max-w-2xl space-y-4 px-4 py-6 sm:px-6">
        <ExitBar label={`${lesson.title} — Apply It`} />
        <div className="rounded-lg border border-signal-amber/30 bg-signal-amber/5 p-3 text-center">
          <p className="text-xs font-display uppercase tracking-widest text-signal-amber">Apply It — Not Scored</p>
          <p className="mt-1 text-xs text-ink-500">
            A new situation, not a repeat of practice — use what you just learned to work through it.
          </p>
        </div>
        <QuestionCard
          key={`apply-it-${beatIndex}`}
          question={applyItQuestion}
          index={0}
          total={1}
          onSubmit={handleApplyItSubmit}
          locked={Boolean(applyItResult)}
          lastResult={applyItResult}
          glossaryTerms={lesson.novaIntro?.glossary}
        />
        {applyItResult && (
          <button
            type="button"
            onClick={handleApplyItContinue}
            className="w-full rounded-lg bg-signal-cyan px-4 py-2 font-display font-700 text-space-950 transition hover:brightness-110"
          >
            Continue
          </button>
        )}
      </div>
    );
  }

  /**
   * ---- Self-explanation phase (gap 3), reached after this beat's practice is
   * done, before moving to the next beat or the test. ----
   *
   * IT USED TO SAY, TWICE, THAT THIS WAS NOT GRADED. (Changed Aug 21, 2026.)
   *
   * It was true for a fortnight. The parent removed the grade on Aug 9 —
   * correctly, because the letter reached nothing — and then, once his answers
   * had grown from "mile stone" into real paragraphs, asked for it back and
   * chose to have it count toward his subject grade.
   *
   * **So these two lines had to change the same day.** Telling a twelve-year-old
   * his writing is not graded and then grading it is the one thing that would
   * make him stop writing honestly here, and the whole value of a
   * self-explanation is that he says what he actually thinks rather than what
   * scores.
   *
   * The wording keeps the low-stakes part that makes the technique work — there
   * is no single right answer, he is not being caught out — while being
   * straight that Mom reads it and may put a grade on it.
   */
  if (phase === 'beat-reflect') {
    return (
      <div className="mx-auto max-w-2xl space-y-4 px-4 py-6 sm:px-6">
        <ExitBar label={`${lesson.title} — Teach It Back`} />
        <NovaMessage label="Commander Nova" tone="brief">
          <p className="font-display text-sm font-700 text-signal-cyan">Explain it to me in your own words</p>
          <p className="mt-2">
            Before we move on — how would YOU explain {activeBeat?.label ? `"${activeBeat.label}"` : 'this'} to
            a new recruit? There's no single right answer. Mom reads these, and she may put a grade on how
            clearly you explained it — so write it properly, in your own words.
          </p>
        </NovaMessage>
        <textarea
          value={reflectionText}
          onChange={(e) => setReflectionText(e.target.value)}
          rows={5}
          placeholder="Type your explanation here..."
          className="w-full rounded-lg border border-space-600 bg-space-900 px-4 py-3 text-ink-100 placeholder:text-ink-500 focus:border-signal-cyan focus:outline-none"
        />
        <p className="text-xs text-ink-500">
          Graded on how clearly you explain it, not on being right first time.
        </p>
        <button
          type="button"
          onClick={handleReflectContinue}
          className="w-full rounded-lg bg-signal-cyan px-4 py-2 font-display font-700 text-space-950 transition hover:brightness-110"
        >
          {beatIndex < beats.length - 1 ? 'Continue to Next Concept' : 'Continue to the Test'}
        </button>
      </div>
    );
  }

  // ---- Legacy single briefing phase (older novaIntro.steps/concept shape, no beats yet) ----
  if (phase === 'briefing') {
    const intro = lesson.novaIntro;
    const steps = intro.steps || [{ label: null, explanation: intro.concept, example: intro.example }];
    return (
      <div className="mx-auto max-w-2xl space-y-4 px-4 py-6 sm:px-6">
        <ExitBar label={lesson.title} />
        <NovaMessage label="Commander Nova's Briefing" tone="brief">
          <p className="font-display text-base font-700 text-ink-100">{lesson.title}</p>
          {intro.vocabulary && intro.vocabulary.length > 0 && (
            <div className="mt-3 rounded-lg border border-space-700 bg-space-900 p-3">
              <p className="text-xs font-display uppercase tracking-widest text-signal-green">Words You'll See</p>
              <dl className="mt-2 space-y-2">
                {intro.vocabulary.map((v, i) => (
                  <div key={i}>
                    <dt className="font-display text-sm font-700 text-ink-100">{v.term}</dt>
                    <dd className="text-sm text-ink-300">{v.definition}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
          {steps.map((step, i) => (
            <div key={i} className={i > 0 ? 'mt-4 border-t border-space-700 pt-4' : 'mt-3'}>
              {step.label && (
                <p className="font-display text-sm font-700 text-signal-cyan">
                  {steps.length > 1 ? `${i + 1}. ` : ''}
                  {step.label}
                </p>
              )}
              <p className={step.label ? 'mt-1' : ''}>{step.explanation}</p>
              {step.example && (
                <div className="mt-2 rounded-lg border border-space-700 bg-space-900 p-3">
                  <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Worked Example</p>
                  <p className="mt-1 font-mono text-sm text-ink-100">{step.example}</p>
                </div>
              )}
            </div>
          ))}
          <div className="mt-3 rounded-lg border border-signal-amber/30 bg-signal-amber/5 p-3">
            <p className="text-xs font-display uppercase tracking-widest text-signal-amber">
              How an Aerospace Engineer Uses This
            </p>
            <p className="mt-1">{intro.connection}</p>
          </div>
          {intro.videoUrl && (
            <a
              href={intro.videoUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block text-sm text-signal-cyan underline hover:text-signal-cyan/80"
            >
              ▶ Watch a short video on this concept
            </a>
          )}
        </NovaMessage>
        <button
          type="button"
          onClick={() => setPhase(legacyHasPractice ? 'legacy-practice' : 'test')}
          className="w-full rounded-lg bg-signal-cyan px-4 py-2 font-display font-700 text-space-950 transition hover:brightness-110"
        >
          {legacyHasPractice ? "I'm Ready — Start Practice" : "I'm Ready — Start Mission"}
        </button>
      </div>
    );
  }

  // ---- Practice phase (used for both beat-practice and the legacy single-block flow) ----
  if (phase === 'beat-practice' || phase === 'legacy-practice') {
    const label = hasBeats ? `${lesson.title} — Practice ${beatIndex + 1} of ${beats.length}` : lesson.title;
    const displayTotal = practiceExtended ? PRACTICE_MAX_ROUNDS : activePracticeTarget;
    return (
      <div className="mx-auto max-w-2xl space-y-4 px-4 py-6 sm:px-6">
        <ExitBar label={label} />

        {practiceExtended ? (
          <div className="rounded-lg border border-signal-amber/30 bg-signal-amber/5 p-3 text-center">
            <p className="text-xs font-display uppercase tracking-widest text-signal-amber">
              A Little More Practice First — Question {practiceCount + 1} of {displayTotal}
            </p>
            <p className="mt-1 text-xs text-ink-500">
              You need 80% correct on practice before the real test unlocks. That's completely normal —
              a few more questions here means you'll be more ready, not that you did anything wrong.
            </p>
          </div>
        ) : (
          <div className="rounded-lg border border-signal-green/30 bg-signal-green/5 p-3 text-center">
            <p className="text-xs font-display uppercase tracking-widest text-signal-green">
              Practice — Not Scored — Question {practiceCount + 1} of {displayTotal}
            </p>
            <p className="mt-1 text-xs text-ink-500">
              Hints are always available here. Get 80% correct here to unlock the real test.
            </p>
          </div>
        )}

        <QuestionCard
          key={`practice-${beatIndex}-${practiceCount}`}
          question={practiceQuestion}
          index={practiceCount}
          total={displayTotal}
          onSubmit={handlePracticeSubmit}
          locked={Boolean(practiceResult)}
          lastResult={practiceResult}
          glossaryTerms={lesson.novaIntro?.glossary}
        />

        {!practiceResult && (
          <div>
            {practiceHintShown ? (
              <NovaMessage tone="hint" label="Hint from Commander Nova">
                {getHintMessage(practiceQuestion.hint)}
              </NovaMessage>
            ) : (
              <button
                type="button"
                onClick={() => setPracticeHintShown(true)}
                className="text-sm text-signal-amber underline hover:text-signal-amber/80"
              >
                Need a hint from Commander Nova?
              </button>
            )}
          </div>
        )}

        {practiceResult && (
          <button
            type="button"
            onClick={handlePracticeContinue}
            className="w-full rounded-lg bg-space-700 px-4 py-2 font-display font-700 text-ink-100 transition hover:bg-space-600"
          >
            {(() => {
              const nextCount = practiceCount + 1;
              const acc = practiceCorrectHistory.length > 0
                ? practiceCorrectHistory.filter(Boolean).length / practiceCorrectHistory.length
                : 0;
              const metTarget = nextCount >= activePracticeTarget;
              const metMastery = acc >= PRACTICE_MASTERY_THRESHOLD;
              const hitMaxRounds = nextCount >= PRACTICE_MAX_ROUNDS;
              if (metTarget && !metMastery && !hitMaxRounds) return 'More Practice Needed — Continue';
              if (metTarget || hitMaxRounds) {
                // hasBeats always goes to the self-explanation step next
                // (gap 3), not straight to the next concept or the test.
                return hasBeats ? 'Continue' : 'Ready for the Test — No More Hints';
              }
              return 'Next Practice Question';
            })()}
          </button>
        )}
      </div>
    );
  }

  // ---- Test phase — fixed questions, no hints once any practice has happened, per-wrong-answer feedback ----
  const hadAnyPractice = hasBeats || legacyHasPractice;

  // A lesson whose test questions were never authored. Before Aug 6, 2026
  // this crashed the whole app on open (see the guard above). Now it says so
  // plainly: the teaching, practice, and apply-it beats the student just
  // worked through were real and still counted, and only the graded test is
  // missing. Nothing is recorded as mastered, because nothing was tested.
  if (!hasTestQuestions) {
    return (
      <div className="mx-auto max-w-2xl space-y-4 px-4 py-6 sm:px-6">
        <ExitBar label={lesson.title} />
        <div className="rounded-lg border border-signal-amber/40 bg-signal-amber/5 p-4">
          <p className="text-xs font-display uppercase tracking-widest text-signal-amber">
            Lesson not finished yet
          </p>
          <p className="mt-2 text-sm text-ink-200">
            The teaching and practice for this lesson are built, but its graded test questions have not been
            written yet — so there is nothing here to score. Everything you just worked through still counted as
            practice.
          </p>
          <p className="mt-2 text-xs text-ink-500">
            Nothing is marked mastered for this lesson. Let your parent know you reached this screen.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-4 px-4 py-6 sm:px-6">
      <ExitBar label={lesson.title} />

      {hadAnyPractice && questionIndex === 0 && !lastResult && (
        <div className="rounded-lg border border-signal-cyan/30 bg-signal-cyan/5 p-3 text-center">
          <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">
            Final Test — No Hints — This Counts Toward Mastery
          </p>
        </div>
      )}

      <QuestionCard
        key={question.id}
        question={question}
        index={questionIndex}
        total={testQuestions.length}
        onSubmit={handleSubmit}
        locked={Boolean(lastResult)}
        lastResult={lastResult}
        glossaryTerms={lesson.novaIntro?.glossary}
      />

      {!hadAnyPractice && (question.hint || lesson.novaIntro) && !lastResult && (
        <div>
          {hintShownFor === question.id ? (
            <NovaMessage tone="hint" label="Hint from Commander Nova">
              {getHintMessage(question.hint || lesson.novaIntro.concept)}
            </NovaMessage>
          ) : (
            <button
              type="button"
              onClick={() => setHintShownFor(question.id)}
              className="text-sm text-signal-amber underline hover:text-signal-amber/80"
            >
              Need a hint from Commander Nova?
            </button>
          )}
        </div>
      )}

      {lastResult && (
        <button
          type="button"
          onClick={handleContinue}
          className="w-full rounded-lg bg-space-700 px-4 py-2 font-display font-700 text-ink-100 transition hover:bg-space-600"
        >
          {isLastQuestion ? 'Finish Mission' : 'Next Question'}
        </button>
      )}
    </div>
  );
}
