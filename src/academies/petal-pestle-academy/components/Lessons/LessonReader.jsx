import { useEffect, useMemo, useState } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import { MarigoldMessage } from '../Mentor/MarigoldMessage.jsx';
import { speechSupported, speakChunks, stopSpeaking, chunksForItem } from '../../lib/speech.js';
import { practiceGateResult, PRACTICE_GATE } from '../../config/assessment.js';
import { itemsForLesson, bankItemById } from '../../data/assessments/appBank.js'; // v3.25 — every course
import { presentQuestion } from '../../lib/assessmentEngine.js';
import { dayKeyOf } from '../../lib/reviewQueue.js';
import { lessonFinishSummary } from '../../lib/lessonFinish.js';
import { lessonById } from '../../data/lessons/appCourses.js';

// ---------------------------------------------------------------------------
// READING A LESSON.
//
// The thirteen Herbalism lessons have existed as data since v2.8 with no way to
// read them. This is the screen that was missing, and it had to be built before
// the tests could mean anything: a test that says "go back to lesson 6" is a
// dead end if lesson 6 cannot be opened.
//
// ---- THE SHAPE ----
//
// hook → core → doing → practice → check. The same shape every lesson uses.
// It is laid out as one page she scrolls, not a slideshow she clicks through —
// a child who wants to look back at the second heading while answering the
// check should be able to just scroll up.
//
// ---- WHAT "READ" MEANS ----
//
// A lesson counts as read when she presses the button at the bottom, not when
// she opens it. Opening is not reading, and lessons-read is what unlocks a unit
// test — so a loose definition here would let her sit a test on four lessons she
// clicked past.
//
// ---- THE CHECK QUESTIONS AT THE BOTTOM ----
//
// These give immediate feedback and are not scored. They stay out of the
// spaced-review boxes — the boxes are fed from the test bank, which has five
// questions per lesson covering the same ground with stable ids. Two sources
// feeding one queue would mean questions that can never come back round in a
// warm-up, which is a quiet way to lose half the review schedule.
//
// What they DO now drive, as of v3.1, is the practice gate.
//
// ---- THE PRACTICE GATE ----
//
// Miss more than one and the lesson does not simply end: she gets more real
// practice, drawn from the test bank's five questions for this lesson, capped
// at twice the check length. Taken from her brother's app, which has had this
// for months and which this one did not — until now a child who understood
// nothing could press "I have finished this lesson" and walk into the unit test.
//
// The extra questions come from the bank, so those answers DO move the review
// boxes, and are therefore excluded from any test she sits later the same day
// by the same guard that stops the morning warm-up leaking into the afternoon.
//
// It never locks the door. She can always finish. See PRACTICE_GATE.blocking.
// ---------------------------------------------------------------------------

/**
 * What "Read the lesson to me" actually says, in the order the screen shows it.
 *
 * ---- ⚠️ IT USED TO READ EVERY LESSON TWICE — FIXED v3.43 ----
 *
 * The old version read `lesson.core` and THEN `lesson.beats`, unconditionally.
 * The screen has never done that: it renders beats OR the flat cards, never
 * both. And 179 of the 192 lessons carry BOTH fields, holding the same content
 * — hb-m1-01's core headings are "What a seed is made of" and "How a seed wakes
 * up", and its two beat labels are those same two strings.
 *
 * So the child who leans hardest on this button heard the whole lesson, then
 * the words "Go and do this.", then the whole lesson again. For a nine-year-old
 * whose Reading 3.46 is a LISTENING score and who pressed read-aloud on 36 of
 * 61 Check-In questions, this was not a cosmetic bug. It was the main way she
 * takes a lesson in, and it was doubled and out of order.
 *
 * Nothing caught it because every check asked about the SCREEN. The read-aloud
 * is a second rendering of the same lesson through a different function, and
 * nothing had ever compared the two. That is the same shape as v3.34 — a rule
 * enforced on the config and not on the paper the child is handed — except here
 * the paper was the sound.
 *
 * ---- WHAT IT DOES NOW ----
 *
 * It follows the screen, top to bottom, including the video moved up at v3.41:
 *
 *   title · hook · the question · THE VIDEO · beats (or the flat cards, never
 *   both) · the words · what to go and do
 *
 * The video is named rather than skipped, because on screen it sits between the
 * question and Part 1 and a child listening with her eyes shut should not have
 * a silent gap where the main event is.
 *
 * check-delivery asserts this function agrees with the component about which
 * branch renders.
 */
function lessonChunks(lesson) {
  const out = [lesson.title, lesson.hook.text, lesson.hook.question];

  if (lesson.video?.id) {
    out.push(`Now watch this. ${lesson.video.title}.`);
  }

  // BEATS OR CORE — the same choice the component makes, never both.
  if (lesson.beats?.length > 0) {
    for (const b of lesson.beats) {
      out.push(`Part ${b.n}. ${b.label}`, b.hook, b.teachingText, b.example, b.applyIt?.prompt);
    }
  } else {
    for (const c of lesson.core || []) {
      out.push(c.heading);
      out.push(c.text);
    }
  }

  for (const g of lesson.glossary || []) {
    out.push(`${g.word}. ${g.plain}`);
  }

  out.push('Go and do this.');
  out.push(lesson.doing);
  return out;
}

/**
 * WHAT SHE SEES WHEN SHE FINISHES A LESSON.
 *
 * ---- WHAT THIS REPLACED, AND WHY IT MATTERED ----
 *
 * One message. The same one, every time:
 *
 *     🌿 Lesson finished
 *     Some of this will come back in your warm-up tomorrow.
 *
 * Identical for three of three and for one of three. On sl-m2-01 — a real
 * lesson, on a real day, Aug 17 — she answered two of the three wrong and the
 * app told her nothing at all. It said "Lesson finished" and moved her on.
 *
 * Gigi, asked whether a weekly summary was enough for a child who is behind:
 * "Should it be only weekly for a child that is behind in her levels?" It is
 * not. The step-back view belongs to the week; THIS is the moment that closes a
 * gap, because the lesson is still on the screen behind her and the words are
 * still in her head.
 *
 * ---- THE RULES THIS FOLLOWS ----
 *
 * WARM, NEVER SOFTENED. §3.7.2 rule 2: recognition is structurally separate
 * from assessment, and "warm tone must never inflate or soften an honest
 * score." Two of three stays two of three. There is no "great job!" over a
 * miss, because a child works out very quickly that praise which arrives
 * whatever she does is not about her.
 *
 * IT SHOWS THE MISS, NOT A LABEL FOR THE MISS. She sees the question again, the
 * right answer, and the line explaining why the one she picked was wrong. No
 * new writing was needed for any of it — every check item already carries
 * per-choice feedback, on all 768 of them.
 *
 * IT IS READ ALOUD. Her Reading 3.46 is a LISTENING score — ten of her thirteen
 * Check-In reading questions were read to her. A summary she cannot read is a
 * summary she does not get, and the whole point of this screen is that she gets
 * it. The chunks follow the screen top to bottom, the v3.43 rule.
 */
function FinishSummary({ lesson, answers, onBack }) {
  const [speaking, setSpeaking] = useState(false);
  useEffect(() => () => stopSpeaking(), []);

  // EVERY WORD ON THIS SCREEN COMES FROM ONE PURE FUNCTION, which check-delivery
  // calls directly with made-up answers. It used to be decided inline here, and
  // the check written for it was satisfied by a string that appeared elsewhere
  // in the file — two negative tests came back green on a branch that had been
  // deleted. A rule lives where a check can CALL it.
  const s = lessonFinishSummary(lesson, answers);

  function readAloud() {
    if (speaking) {
      stopSpeaking();
      setSpeaking(false);
      return;
    }
    if (speakChunks(s.chunks, { onEnd: () => setSpeaking(false) })) setSpeaking(true);
  }

  return (
    <div
      className={`rounded-petal border-2 px-5 py-5 ${
        s.allRight ? 'border-sage-500/45 bg-sage-300/20' : 'border-gold-500/50 bg-gold-300/15'
      }`}
    >
      <p className="text-center font-display text-lg text-ink-900">
        {s.allRight ? '🌿' : '🌱'} {s.headline}
      </p>

      {s.missed.length > 0 && (
        <div className="mt-4 space-y-3">
          <p className="label-caps text-center">{s.heading}</p>
          {s.missed.map((m) => (
            <article key={m.index} className="rounded-petal bg-white px-4 py-3.5 text-left">
              <p className="text-[0.95rem] font-700 text-ink-900">{m.prompt}</p>
              <p className="mt-2 text-sm text-ink-900">
                <span className="font-700 text-sage-700">{m.answerText}</span>
              </p>
              {m.whyWrong && <p className="mt-1 text-sm text-ink-700">{m.whyWrong}</p>}
            </article>
          ))}
        </div>
      )}

      <p className="mt-4 text-center text-sm text-ink-700">{s.closing}</p>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
        {speechSupported() && (
          <button
            type="button"
            onClick={readAloud}
            className="rounded-full border-2 border-lavender-500 px-5 py-2 text-sm font-700 text-ink-900 hover:bg-lavender-500/15"
          >
            {speaking ? 'Stop reading' : 'Read this to me'}
          </button>
        )}
        <button
          type="button"
          onClick={onBack}
          className="rounded-full bg-blush-500 px-6 py-2.5 font-700 text-white hover:bg-blush-700"
        >
          Back to my course
        </button>
      </div>
    </div>
  );
}

export function LessonReader({ lesson, onBack, unitTitle }) {
  const markLessonRead = useAppStore((s) => s.markLessonRead);
  const recordReview = useAppStore((s) => s.recordReview);
  const recordItemEvents = useAppStore((s) => s.recordItemEvents);
  const alreadyRead = useAppStore((s) => !!s.lessonReads[lesson?.id]);

  const [speaking, setSpeaking] = useState(false);
  const [answers, setAnswers] = useState({});
  const [finished, setFinished] = useState(false);
  // The practice gate's extra round.
  const [extraOpen, setExtraOpen] = useState(false);
  const [extraAnswers, setExtraAnswers] = useState({});

  // Deterministic, so a re-render never deals her a different question
  // mid-thought. Seeded on the lesson and the day.
  const extraPool = useMemo(() => {
    if (!lesson) return [];
    const allowed = (lesson.check?.length || 0) * PRACTICE_GATE.extraMultiple;
    return itemsForLesson(lesson.id)
      .slice(0, allowed)
      .map((q) => presentQuestion(q, `practice|${lesson.id}|${dayKeyOf()}`));
  }, [lesson]);

  useEffect(() => {
    stopSpeaking();
    setSpeaking(false);
    setAnswers({});
    setFinished(false);
    setExtraOpen(false);
    setExtraAnswers({});
  }, [lesson?.id]);

  useEffect(() => () => stopSpeaking(), []);

  if (!lesson) return null;

  const checkResults = (lesson.check || []).map((c, i) => ({
    answered: answers[i] !== undefined,
    correct: answers[i] === c.answer
  }));
  const allChecked = checkResults.every((r) => r.answered);
  const gate = practiceGateResult(allChecked ? checkResults : []);
  const needsExtra = allChecked && !gate.passed && extraPool.length > 0;
  const extraDone = extraPool.length > 0 && Object.keys(extraAnswers).length === extraPool.length;

  function readAloud() {
    if (speaking) {
      stopSpeaking();
      setSpeaking(false);
      return;
    }
    if (speakChunks(lessonChunks(lesson), { onEnd: () => setSpeaking(false) })) setSpeaking(true);
  }

  async function answerExtra(qIndex, choiceIndex) {
    const q = extraPool[qIndex];
    if (extraAnswers[qIndex] !== undefined) return;
    setExtraAnswers((a) => ({ ...a, [qIndex]: choiceIndex }));
    // Bank questions, so this is a real retrieval and moves the boxes — and
    // takes the question out of any test she sits later today.
    await recordReview([{ questionId: q.id, correct: choiceIndex === q.answer }], 'practice');
    // The gate's extra round is graded practice (§3.2 beat table), so it counts
    // toward mastery — unlike the Check-In, which counts toward nothing.
    await recordItemEvents([
      {
        questionId: q.id,
        lessonId: lesson.id,
        evidenceSource: 'practice',
        correct: choiceIndex === q.answer,
        chosen: choiceIndex
      }
    ]);
  }

  async function finish() {
    const extraCorrect = extraPool.filter(
      (q, i) => extraAnswers[i] !== undefined && extraAnswers[i] === q.answer
    ).length;
    // The record is what happened, not the best of what happened: how the check
    // went, whether the gate was cleared, and how much extra she needed. The
    // Gradebook reads this; a lesson that took two rounds should look like one.
    // The Quick check is `instruction` — answered while the teaching is still
    // on screen. It counts toward mastery, but it is recognition rather than
    // retention (§3.6), and the warm-up days later is the stronger evidence.
    await recordItemEvents(
      (lesson.check || []).map((c, i) => ({
        questionId: `${lesson.id}-check-${i + 1}`,
        lessonId: lesson.id,
        evidenceSource: 'instruction',
        correct: answers[i] === c.answer,
        chosen: answers[i] ?? null
      }))
    );

    await markLessonRead(lesson.id, {
      asked: gate.asked,
      correct: gate.correct,
      passed: gate.passed,
      extraServed: Object.keys(extraAnswers).length,
      extraCorrect
    });
    setFinished(true);
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <button
        type="button"
        onClick={onBack}
        className="rounded-full border border-cream-300 bg-white px-3.5 py-1.5 text-xs font-700 text-ink-700 hover:border-lavender-500"
      >
        ← Back to my course
      </button>

      <header className="mt-4">
        {unitTitle && <p className="label-caps">{unitTitle}</p>}
        <h1 className="mt-1 font-display text-3xl leading-tight text-ink-900">
          {lesson.n}. {lesson.title}
        </h1>
        <p className="mt-1.5 text-xs text-ink-500">
          About {lesson.minutes} minutes
          {alreadyRead && ' · you have read this before'}
        </p>
      </header>

      {speechSupported() && (
        <button
          type="button"
          onClick={readAloud}
          className={`mt-4 rounded-full border-2 px-5 py-2 text-sm font-700 ${
            speaking
              ? 'border-lavender-500 bg-lavender-300/40 text-lavender-700'
              : 'border-cream-300 bg-white text-ink-700 hover:border-lavender-500'
          }`}
        >
          {speaking ? '⏹ Stop reading' : '🔊 Read the lesson to me'}
        </button>
      )}

      {/* ---- THE RETRIEVE BEAT — §3.2's ladder opens here, not with teach ----

           Renders NOTHING on the first lesson of a course, and nothing when
           fewer than LESSON_RETRIEVE.minimumPool questions are available. A
           doorway with one question in it is a routine, not a doorway. ---- */}
      <RetrieveBeat lessonId={lesson.id} />

      {/* ---- hook ---- */}
      <section className="mt-5">
        <MarigoldMessage text={lesson.hook.text} tone="start" />
        <p className="mt-3 rounded-petal bg-gold-300/25 px-4 py-3 text-[0.95rem] font-700 text-ink-900">
          {lesson.hook.question}
        </p>
      </section>

      {/* ---- THE VIDEO — IT SITS ABOVE THE PROSE, AND THAT IS THE WHOLE POINT --

           Moved here at v3.41, from below every beat.

           Where it used to be: after Part 1, Part 2 and both Apply-Its — which
           meant she read the entire lesson before reaching the thing meant to
           explain it. The comment that used to sit here claimed it was inside
           the System Concept step. It was not, and that wrong comment is what
           the plan repeated back for several versions. A comment nothing tests
           is a comment that goes stale.

           Why it moved: her Reading 3.46 is a LISTENING score — 10 of her 13
           reading questions were read aloud — so her independent reading is
           below it, and she pressed read-aloud on 36 of 61 Check-In questions.
           Reading is the expensive part of this page. The video is what makes
           the rest of it cheap.

           The order is the teaching: hook, then the question the hook raises,
           then the video that answers it, THEN Part 1. She watches with a
           question already in her head, and reads afterwards to pin it down.

           Guarded on `lesson.video`, so a lesson without one simply skips it.
           All 192 lessons carry one, including the thirteen flat cards.

           The title on screen is the title YouTube RETURNED when the id was
           checked, not the title a search result claimed. A search result can
           be stale; oEmbed cannot.

           `check-delivery` asserts this position STRUCTURALLY — by where the
           element renders, not by looking for the word "video" anywhere on the
           page. Moving it back down fails the build. Do not move it without
           moving that assertion too.
           ------------------------------------------------------------------ */}
      {lesson.video?.id && (
        <section className="mt-5 overflow-hidden rounded-petal border-2 border-lavender-300 bg-lavender-300/10">
          <div className="px-5 pt-4">
            <p className="label-caps">Watch this bit</p>
            <p className="mt-1 text-[0.95rem] font-700 leading-snug text-ink-900">
              {lesson.video.title}
            </p>
            <p className="mt-0.5 text-xs text-ink-500">{lesson.video.channel}</p>
          </div>
          <div className="mt-3 aspect-video w-full bg-ink-900/5">
            <iframe
              className="h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${lesson.video.id}?rel=0`}
              title={lesson.video.title}
              allow="accelerometer; clipboard-write; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </div>
          <p className="px-5 py-3 text-xs text-ink-700">
            Watching is not the lesson. The doing is. Now read the rest of the page.
          </p>
        </section>
      )}

      {/* ---- BEATS, or the flat cards for lessons written before the standard ----

           Lamar's plan states the design in one line and it is the whole
           difference between his lessons and the first thirteen of hers:

             "small teach -> immediate practice -> next small teach -> practice
              -> final no-hint test. NOT one long briefing followed by a wall of
              questions."

           A beat is a label, a "Did you know?" hook, a short piece of teaching,
           a worked example, and then IMMEDIATELY an Apply-It question about that
           beat and nothing else. She answers something about three minutes in,
           and again three minutes later.

           The Apply-It is a SCENARIO, never a definition. "What is the
           endosperm" tests whether she read the card. "Your bean grew in a bag
           with no dirt, so what fed it" tests whether she can USE it, which is
           the only thing worth asking three minutes after teaching it.

           It is answered in place, feedback shows immediately — unlike a real
           test, where feedback waits until the end — and it is NOT scored.
           Practice with delayed feedback rehearses the mistake; a scored
           question mid-lesson turns teaching into examining.

           Guarded on `lesson.beats`, so the thirteen Quarter 1 lessons render
           their flat cards exactly as they always did.
           ------------------------------------------------------------------ */}
      {lesson.beats?.length > 0 ? (
        <section className="mt-6 space-y-5">
          {lesson.beats.map((b) => (
            <article key={b.n} className="panel-white overflow-hidden px-0 py-0">
              <div className="border-b border-cream-300 px-5 py-3.5">
                <p className="label-caps">Part {b.n}</p>
                <h2 className="mt-0.5 font-display text-lg text-ink-900">{b.label}</h2>
              </div>

              {b.hook && (
                <p className="border-b border-cream-300 bg-gold-300/20 px-5 py-3 text-[0.9rem] text-ink-900">
                  <span className="font-700">Did you know?</span> {b.hook}
                </p>
              )}

              <div className="px-5 py-4">
                <p className="text-[0.95rem] leading-relaxed text-ink-900">{b.teachingText}</p>
                {b.example && (
                  <p className="mt-3 rounded-petal border-l-4 border-sage-500 bg-sage-300/15 px-4 py-3 text-[0.92rem] leading-relaxed text-ink-900">
                    {b.example}
                  </p>
                )}
              </div>

              {b.applyIt && <ApplyIt beat={b} />}
            </article>
          ))}
        </section>
      ) : (
        <section className="mt-6 space-y-4">
          {lesson.core.map((c) => (
            <article key={c.heading} className="panel-white px-5 py-4">
              <h2 className="font-display text-lg text-ink-900">{c.heading}</h2>
              <p className="mt-1.5 text-[0.95rem] leading-relaxed text-ink-900">{c.text}</p>
            </article>
          ))}
        </section>
      )}

      {/* ---- words -----------------------------------------------------------
           Two shapes, on purpose.

           The thirteen Quarter 1 lessons carry `words` as a bare list, and they
           still render as one line exactly as they always did.

           A lesson written to the specification can also carry `glossary` — the
           word AND what it means, in her words, not a dictionary's. That is not
           decoration: in a lesson built to a video, the vocabulary IS the
           payload. A child who can say what "endosperm" means has had the
           lesson; a child who cannot has watched a nice video. Putting the
           meanings on the page, read-aloud like everything else, is the
           difference between hearing a word once and owning it.
           ------------------------------------------------------------------ */}
      {lesson.glossary?.length > 0 ? (
        <section className="mt-5 rounded-petal border-2 border-gold-500/45 bg-gold-300/15 px-5 py-4">
          <p className="label-caps">The words for this lesson</p>
          <p className="mt-1 text-xs text-ink-700">
            Say each one out loud. Then say what it means without looking.
          </p>
          <dl className="mt-3 space-y-2">
            {lesson.glossary.map((g) => (
              <div
                key={g.word}
                className="rounded-xl border border-cream-300 bg-white px-3.5 py-2.5"
              >
                <dt className="text-sm font-700 text-ink-900">{g.word}</dt>
                <dd className="mt-0.5 text-[0.9rem] leading-relaxed text-ink-700">{g.plain}</dd>
              </div>
            ))}
          </dl>
        </section>
      ) : (
        lesson.words?.length > 0 && (
          <section className="mt-5 rounded-petal border border-cream-300 bg-cream-100 px-4 py-3">
            <p className="label-caps">Words from this lesson</p>
            <p className="mt-1.5 text-sm text-ink-900">{lesson.words.join(' · ')}</p>
          </section>
        )
      )}

      {/* ---- doing ---- */}
      <section className="mt-5 rounded-petal border-2 border-sage-500/45 bg-sage-300/15 px-5 py-4">
        <p className="label-caps">Go and do this</p>
        <p className="mt-1.5 text-[0.95rem] leading-relaxed text-ink-900">{lesson.doing}</p>
        <p className="mt-2 text-xs text-ink-700">
          This one happens outside, not on the screen. It is the part that makes the rest stick.
        </p>
      </section>

      {/* ---- practice: say it out loud ---- */}
      <section className="mt-6">
        <h2 className="font-display text-lg text-ink-900">Say these out loud first</h2>
        <p className="mt-1 text-xs text-ink-700">
          Answer in your head before you tap. Trying to remember is what does the work — even when
          you get it wrong.
        </p>
        <div className="mt-3 space-y-2">
          {lesson.practice.map((p) => (
            <PracticeRow key={p.ask} p={p} />
          ))}
        </div>
      </section>

      {/* ---- check ---- */}
      <section className="mt-7">
        <h2 className="font-display text-lg text-ink-900">Quick check</h2>
        {/* ------------------------------------------------------------------
            THIS LINE USED TO SAY "Nothing is written down. This is just for
            you." IT WAS NOT TRUE.

            markLessonRead() writes asked, correct, passed, extraServed and
            extraCorrect into lessonReads on every finish. That row goes into
            her backup, feeds the Gradebook, and is what shakyLessons() reads to
            tell Gigi which lessons need going over.

            So the screen told a nine-year-old her answers were not kept, and
            kept them. Low stakes was the right FEELING and it is preserved
            below — what changed is that the sentence is now true. You cannot
            show a child how she did on a screen that has just promised her
            nothing was recorded.
            ------------------------------------------------------------------ */}
        <p className="mt-1 text-xs text-ink-700">
          This is not a test and it does not go on your report card. It shows Gigi what to go over
          with you.
        </p>
        <div className="mt-3 space-y-4">
          {lesson.check.map((c, ci) => {
            const picked = answers[ci];
            return (
              <article key={c.prompt} className="panel-white px-5 py-4">
                <p className="text-[0.95rem] font-700 text-ink-900">{c.prompt}</p>
                <div className="mt-3 space-y-2">
                  {c.choices.map((choice, i) => {
                    const settled = picked !== undefined;
                    const isAnswer = settled && i === c.answer;
                    const isWrongPick = settled && i === picked && i !== c.answer;
                    let cls = 'border-cream-300 bg-white hover:border-lavender-500';
                    if (isAnswer) cls = 'border-sage-500 bg-sage-300/40';
                    else if (isWrongPick) cls = 'border-clay-500 bg-clay-500/10';
                    else if (settled) cls = 'border-cream-300 bg-white opacity-60';
                    return (
                      <button
                        key={choice}
                        type="button"
                        disabled={settled}
                        onClick={() => setAnswers((a) => ({ ...a, [ci]: i }))}
                        className={`flex w-full items-start gap-2.5 rounded-xl border-2 px-3.5 py-2.5 text-left text-sm ${cls}`}
                      >
                        <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-cream-200 text-[0.65rem] font-700 text-ink-700">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span className="text-ink-900">{choice}</span>
                      </button>
                    );
                  })}
                </div>
                {picked !== undefined && picked !== c.answer && (
                  <p className="mt-2.5 text-sm text-ink-700">{c.feedback[picked]}</p>
                )}
              </article>
            );
          })}
        </div>
      </section>

      {/* ---- the practice gate ---- */}
      {needsExtra && !finished && (
        <section className="mt-7 rounded-petal border-2 border-gold-500/50 bg-gold-300/15 px-5 py-5">
          {!extraOpen ? (
            <>
              <p className="font-display text-lg text-ink-900">
                Let&apos;s do a few more before we call this done
              </p>
              {/* ----------------------------------------------------------
                  THIS USED TO SAY "That is not a problem and IT IS NOT A
                  SCORE." Half of that was true and half was not.

                  Not a problem — true, and worth saying to a nine-year-old
                  looking at a miss. Not a score — no. The result is written
                  down: markLessonRead keeps asked, correct and passed, and
                  shakyLessons() reads it to tell Gigi which lessons to go over.
                  It is not GRADED, which is a different sentence.

                  Gigi spotted the mismatch herself, from a screenshot: this
                  panel said "not a score" three inches below a line that had
                  just been corrected to say the opposite. The soft version had
                  survived because it sounded kind, which is exactly how a
                  wrong sentence stays in a product.

                  The fix is to DROP the false half and keep the kind half,
                  rather than to bolt "Gigi can see this" on here — the Quick
                  check above already says so, and saying it twice on one page
                  turns a fair warning into a child being watched.
                  ---------------------------------------------------------- */}
              <p className="mt-1.5 text-sm text-ink-700">
                You got {gate.correct} of {gate.asked}. That is not a problem — it just means this
                one is worth a bit more practice while you are still here. {extraPool.length} more
                questions, same lesson.
              </p>
              <button
                type="button"
                onClick={() => setExtraOpen(true)}
                className="mt-3 rounded-full bg-gold-500 px-6 py-2.5 font-700 text-ink-900 hover:bg-gold-700"
              >
                Give me the extra practice
              </button>
              <p className="mt-2 text-xs text-ink-500">
                You can skip it and finish the lesson — the button below still works. Doing it is
                better.
              </p>
            </>
          ) : (
            <>
              <p className="label-caps">Extra practice · {extraPool.length} questions</p>
              <div className="mt-3 space-y-4">
                {extraPool.map((q, qi) => {
                  const picked = extraAnswers[qi];
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
                              onClick={() => answerExtra(qi, ci)}
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
                          {picked !== q.answer && (
                            <span className="block text-ink-700">{q.feedback[picked]}</span>
                          )}
                          <span className="font-700">{q.choices[q.answer]}</span> — {q.why}
                        </p>
                      )}
                    </article>
                  );
                })}
              </div>
              {extraDone && (
                <p className="mt-3 text-sm font-700 text-ink-900">
                  That is the extra round done. These will come back in your warm-ups too.
                </p>
              )}
            </>
          )}
        </section>
      )}

      {/* ---- finish ---- */}
      <div className="mt-8">
        {finished ? (
          <FinishSummary lesson={lesson} answers={answers} onBack={onBack} />
        ) : (
          <>
            {/* ----------------------------------------------------------------
                THE BUTTON USED TO BE LIVE ALWAYS, AND THAT PUT A FALSE ROW IN A
                GEORGIA RECORD.

                practiceGateResult([]) returns asked: 0, passed: TRUE — so a
                lesson finished without a single question answered was written
                down as PASSED. And `needsExtra` was computed on line 163 and
                never consulted by finish(), so on sl-m2-01 the gate fired, the
                extra round was offered, and she was served nothing: asked 3,
                correct 1, passed false, extraServed 0.

                ---- WHY THIS IS NOT THE WALL GIGI RULED OUT ----

                PRACTICE_GATE.blocking stays FALSE and her reason stands: a
                nine-year-old behind a wall she cannot pass stops opening the
                app. This is not that wall. ANY answer opens the button —
                right, wrong, or a guess. Nothing bars her from finishing and
                nothing bars her from the test afterwards.

                What it stops is the app WRITING DOWN A RESULT IT NEVER TOOK.
                Three taps is not a gate on the child; it is a gate on the
                record. Confirmed with Gigi before it was built, Aug 18 2026.
                ---------------------------------------------------------------- */}
            <button
              type="button"
              onClick={finish}
              disabled={!allChecked}
              className="w-full rounded-full bg-blush-500 px-6 py-3 font-700 text-white hover:bg-blush-700 disabled:cursor-not-allowed disabled:bg-cream-300 disabled:text-ink-500"
            >
              {alreadyRead ? 'I have read this again' : 'I have finished this lesson'}
            </button>
            {!allChecked && (lesson.check || []).length > 0 && (
              <p className="mt-2 text-center text-xs text-ink-500">
                {/* Counted, never typed — a lesson could carry four one day. */}
                {checkResults.filter((r) => !r.answered).length} more to answer in the quick check
                above. Any answer opens this button — a guess is fine. It is not a test.
              </p>
            )}
          </>
        )}
      </div>
    </main>
  );
}

function PracticeRow({ p }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-petal border border-cream-300 bg-white px-4 py-3">
      <p className="text-[0.95rem] font-700 text-ink-900">{p.ask}</p>
      {open ? (
        <>
          <p className="mt-1.5 text-sm text-ink-900">{p.answer}</p>
          <p className="mt-1 text-xs text-ink-700">{p.why}</p>
        </>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mt-2 rounded-full border border-cream-300 bg-cream-100 px-3.5 py-1 text-xs font-700 text-ink-700 hover:border-lavender-500"
        >
          Show me the answer
        </button>
      )}
    </div>
  );
}

/**
 * One Apply-It question, answered inside the beat that taught it.
 *
 * Deliberately NOT scored and deliberately NOT recorded. It exists to make her
 * use the idea while the teaching is still warm, and feedback appears the
 * instant she answers — the opposite of the real test, where feedback waits
 * until the end. Practice without feedback rehearses the mistake; a test that
 * explains as it goes has stopped being a test.
 *
 * Its own component so the hook state belongs to the question rather than to
 * the whole reader — three beats on a screen would otherwise share one answer.
 */
// ---------------------------------------------------------------------------
// THE RETRIEVE BEAT — WHAT DO YOU ALREADY KNOW, BEFORE ANYONE TEACHES YOU ANY
// MORE OF IT.
//
// §3.2's ladder: retrieve → teach → check → teach → check → practice → apply →
// test. Until now this app started at `teach`.
//
// Gigi, Aug 19: "I want my grandbaby to learn and improve." Pulling a thing
// back out of memory is what makes it stick. Reading it again is not, and it
// FEELS more productive, which is why almost no one does the first one.
//
// ---- FOUR RULES THIS PANEL LIVES UNDER ----
//
// 1. IT NEVER BLOCKS. Get both wrong and the lesson is right there. A gate here
//    turns "what do you remember?" into "prove you deserve the lesson."
// 2. IT NEVER ASKS ABOUT THE LESSON IT OPENS. Nobody has taught her that yet.
// 3. IT IS RECORDED, AND IT DOES NOT PRETEND OTHERWISE. It moves the Leitner
//    boxes and writes an itemEvent as `review` evidence. v3.56 caught this app
//    telling her "nothing is written down" on a panel that wrote three things,
//    and check-delivery has failed the build on that class of lie ever since.
// 4. A MISS IS ANSWERED, NOT SCORED. She gets the right answer and the line
//    saying why hers was wrong — the material is about to be built on, so a
//    wrong idea left standing here is a wrong idea carried into the lesson.
// ---------------------------------------------------------------------------
function RetrieveBeat({ lessonId }) {
  const ids = useAppStore((s) => s.lessonRetrieveFor(lessonId));
  const recordReview = useAppStore((s) => s.recordReview);
  const [picked, setPicked] = useState({});
  const [done, setDone] = useState(false);

  // ---- EVERY QUESTION CARRIES THE LESSON IT CAME FROM. ----
  //
  // Gigi, Aug 19, looking at the second Social Studies lesson: "Why would there
  // be questions about something she hasn't learned yet?"
  //
  // She HAD learned it. The question was ss-m1-01-q1 and it belongs to Lesson 1,
  // "The war that came with a bill", which says in its own first beat: "Britain
  // and France fought for years over land in America."
  //
  // THE BEAT WAS RIGHT AND THE SCREEN WAS UNREADABLE. "2 quick ones from earlier
  // in this course" is vague enough that the one adult who can audit this had no
  // way to check it, and her first reading was that the app was testing a child
  // on material nobody had taught her. A panel a grown-up cannot verify at a
  // glance is a panel she is right not to trust.
  const questions = useMemo(
    () =>
      ids
        .map((id) => bankItemById(id))
        .filter(Boolean)
        .map((q) => ({ ...q, from: lessonById(q.lesson) })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ids.join('|')]
  );

  // NOTHING TO PULL BACK MEANS NOTHING ON THE SCREEN. First lesson of a course,
  // every course, and any morning the pool is thin.
  if (questions.length === 0) return null;

  function choose(q, i) {
    if (picked[q.id] !== undefined) return;
    setPicked((p) => ({ ...p, [q.id]: i }));
  }

  const answered = questions.filter((q) => picked[q.id] !== undefined).length;
  const allAnswered = answered === questions.length;

  // Named, in order, without repeating a lesson that supplied both questions.
  const sourceLine = [...new Set(questions.map((q) => (q.from ? `Lesson ${q.from.n}` : 'earlier')))]
    .join(' and ');

  async function finishRetrieve() {
    if (done) return;
    setDone(true);
    await recordReview(
      questions.map((q) => ({ questionId: q.id, correct: picked[q.id] === q.answer })),
      'review'
    );
  }

  return (
    <section className="mt-5 rounded-petal border-2 border-sage-500 bg-sage-300/15 px-5 py-4">
      <p className="label-caps">Before we start</p>
      <h2 className="mt-0.5 font-display text-lg text-ink-900">What do you remember?</h2>
      <p className="mt-1 text-[0.85rem] text-ink-700">
        {questions.length} quick ones from {sourceLine} — lessons you have already read. Not a test
        — this is the part that makes things stick.
      </p>

      {questions.map((q) => {
        const chose = picked[q.id];
        const reveal = chose !== undefined;
        const right = reveal && chose === q.answer;
        return (
          <div key={q.id} className="mt-4 rounded-petal bg-white px-4 py-3.5">
            <p className="text-[0.95rem] font-700 leading-snug text-ink-900">{q.prompt}</p>

            {/* HER READING 3.46 IS A LISTENING SCORE. The lesson's own
                "Read the lesson to me" button reads lessonChunks(), which walks
                the prose — it does not know about this panel. A retrieval
                question she cannot read is a retrieval she does not get, so it
                gets its own button, using the SAME chunksForItem() the warm-up
                uses rather than a second way of saying a question aloud. */}
            {speechSupported() && (
              <button
                type="button"
                onClick={() => speakChunks(chunksForItem(q))}
                className="mt-2 rounded-full border border-cream-300 bg-white px-3.5 py-1 text-[0.7rem] font-700 text-ink-700 hover:border-sage-500"
              >
                🔊 Read it to me
              </button>
            )}
            <div className="mt-2.5 space-y-2">
              {q.choices.map((c, i) => (
                <button
                  key={c}
                  type="button"
                  disabled={reveal}
                  onClick={() => choose(q, i)}
                  className={`flex w-full items-start gap-2.5 rounded-petal border-2 px-3.5 py-2.5 text-left text-[0.9rem] ${
                    reveal && i === q.answer
                      ? 'border-sage-500 bg-sage-300/25 text-ink-900'
                      : chose === i
                        ? 'border-clay-500 bg-clay-500/10 text-ink-900'
                        : 'border-cream-300 bg-white text-ink-900 hover:border-sage-500'
                  }`}
                >
                  <span className="font-700">{'ABCD'[i]}</span>
                  <span className="flex-1">{c}</span>
                </button>
              ))}
            </div>

            {reveal && (
              <div className="mt-3 rounded-petal bg-cream-300/40 px-3.5 py-3">
                <p className="text-sm font-700 text-ink-900">
                  {right ? 'Yes — you kept that one.' : q.feedback[chose]}
                </p>
                <p className="mt-1 text-[0.88rem] leading-relaxed text-ink-700">{q.why}</p>
              </div>
            )}
          </div>
        );
      })}

      {allAnswered && !done && (
        <button
          type="button"
          onClick={finishRetrieve}
          className="mt-4 rounded-full bg-sage-700 px-5 py-2 text-sm font-700 text-white hover:bg-sage-500"
        >
          Done — start the lesson
        </button>
      )}

      {done && (
        <p className="mt-4 text-[0.85rem] font-700 text-ink-900">
          Good. Now the new part. ↓
        </p>
      )}

      {/* NOT the "nothing is written down" lie this app told once. It IS kept —
          it moves her review boxes, which is what brings a question back before
          she forgets it. Said plainly, and kindly. */}
      <p className="mt-3 text-[0.7rem] text-ink-500">
        Gigi can see these. Getting one wrong just means it comes back sooner.
      </p>
    </section>
  );
}

function ApplyIt({ beat }) {
  const [picked, setPicked] = useState(null);
  const q = beat.applyIt;
  const right = picked !== null && picked === q.answer;

  return (
    <div className="border-t-2 border-dashed border-lavender-300 bg-lavender-300/10 px-5 py-4">
      <p className="label-caps">Try it now</p>
      <p className="mt-1 text-[0.95rem] font-700 leading-snug text-ink-900">{q.prompt}</p>

      <div className="mt-3 space-y-2">
        {q.choices.map((c, i) => {
          const chosen = picked === i;
          const reveal = picked !== null;
          return (
            <button
              key={c}
              type="button"
              disabled={reveal}
              onClick={() => setPicked(i)}
              className={`flex w-full items-start gap-2.5 rounded-petal border-2 px-3.5 py-2.5 text-left text-[0.9rem] ${
                reveal && i === q.answer
                  ? 'border-sage-500 bg-sage-300/25 text-ink-900'
                  : chosen
                    ? 'border-clay-500 bg-clay-500/10 text-ink-900'
                    : 'border-cream-300 bg-white text-ink-900 hover:border-lavender-500'
              }`}
            >
              <span className="font-700">{'ABCD'[i]}</span>
              <span className="flex-1">{c}</span>
            </button>
          );
        })}
      </div>

      {picked !== null && (
        <div className="mt-3 rounded-petal bg-white px-4 py-3">
          <p className="text-sm font-700 text-ink-900">
            {right ? 'Yes. That is it.' : q.feedback[picked]}
          </p>
          <p className="mt-1 text-[0.88rem] leading-relaxed text-ink-700">{q.why}</p>
          <p className="mt-2 text-[0.7rem] text-ink-500">
            This one is not scored. It is here so you use it while it is fresh.
          </p>
        </div>
      )}
    </div>
  );
}
