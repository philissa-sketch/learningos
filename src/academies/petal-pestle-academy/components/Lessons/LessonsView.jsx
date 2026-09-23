import { useEffect, useState } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import { MarigoldMessage } from '../Mentor/MarigoldMessage.jsx';
import { LessonReader } from './LessonReader.jsx';
import { TestView } from '../Assess/TestView.jsx';
import {
  APP_COURSES,
  courseById,
  lessonById,
  courseOfLesson
} from '../../data/lessons/appCourses.js';
import { WEEKS, weekForLesson, weekTestReady } from '../../config/assessment.js';
import { lessonIsOpen, nextLessonFor } from '../../lib/rotatingBlock.js';
import {
  buildWeeklyTest,
  buildQuarterTest,
  quarterTestReady,
  retakeStatus,
  officialAttempt
} from '../../lib/assessmentEngine.js';
import { dayKeyOf } from '../../lib/reviewQueue.js';

// ---------------------------------------------------------------------------
// HER COURSE, END TO END.
//
// Every module is a FORTNIGHT — two weeks — and the quarter exam opens when all
// eight weekly tests in that quarter are behind her.
//
// ---- HOW MANY LESSONS ARE IN A WEEK DEPENDS ON THE COURSE ----
//
// This comment used to read "eight modules, each week is three lessons", which
// was true when the app held one course and stopped being true at v3.22. It is
// written out properly now, because a stale comment is where a wrong plan comes
// from (v3.41, where three separate documents described a layout that had never
// existed).
//
//   Herbalism      3 days a week → 3 lessons a week → 6 to a module
//   The Science Lab 3 days a week → 3 lessons a week → 6 to a module
//   Social Studies  2 days a week → 2 lessons a week → 4 to a module
//   The Human Body  2 days a week → 2 lessons a week → 4 to a module
//
// The two-day courses are two-day BY GIGI'S DECISION, not by omission: they
// share the 2:45 block and rotate, Social Studies on Mon/Wed and The Human Body
// on Tue/Thu. A week card showing two lessons is that decision on the screen.
// The count next to the module heading is the module's own — 4, not 2.
//
// ---- WHY EVERYTHING IS ON ONE SCREEN ----
//
// Lessons in one place and tests in another would mean a test is something that
// arrives, rather than the obvious next step after the lessons it covers. Here
// the test sits at the bottom of its own unit, greyed out until the lessons
// above it are read, saying exactly which ones are still missing.
//
// ---- WHAT IS LOCKED, AND WHY EACH LOCK EXISTS ----
//
// * A weekly test needs its lessons read. Otherwise it is a trick question.
// * A quarter exam needs all eight weekly tests sat. It is cumulative; sitting it
//   early would measure material she has not been through.
// * A re-take waits two days. That one is the least obvious and the most
//   important — see retakeStatus in lib/assessmentEngine.js.
//
// None of these are locks on HER. Every one of them can be explained in a
// sentence on screen, and every one of them is on screen.
// ---------------------------------------------------------------------------

// ---- WHY THERE IS A COURSE SWITCHER, v3.25 ----
//
// This screen used to name Herbalism in its own heading and render
// HERBALISM_MODULES directly. That was honest while Herbalism was the only
// course the app taught itself.
//
// It stopped being honest at v3.24, when six Science Lab lessons were written
// and there was no way to open one. The course existed on disk, passed its own
// check, was recorded as shipped — and its only appearance anywhere in
// src/components was a microscope emoji beside its name on the year plan.
//
// So the screen asks appCourses.js what courses there are. A course added there
// appears here; a course NOT added there is invisible, which is the failure this
// exists because of, and check-delivery fails the build on it.

const BAND_STYLE = {
  'got-it': 'border-sage-500 bg-sage-300/25 text-ink-900',
  nearly: 'border-gold-500 bg-gold-300/25 text-ink-900',
  'go-back': 'border-clay-500 bg-clay-500/10 text-ink-900'
};

// One lookup across every lesson in the app, whatever course it belongs to.
// Imported from appCourses.js — see the note above.

export function LessonsView({
  onNavigate,
  courseId: requestedCourseId = null,
  lessonId: requestedLessonId = null
}) {
  // Subscribe to the RAW state, then derive.
  //
  // Subscribing to a selector that builds a fresh object every call —
  // `useAppStore((s) => s.attemptsByTest())` — makes the store re-render this
  // screen on every unrelated change, because the new object never equals the
  // last one. Subscribing to the arrays and deriving from getState() costs
  // nothing and re-renders exactly when the underlying data moves.
  const lessonReads = useAppStore((s) => s.lessonReads);
  const attempts = useAppStore((s) => s.attempts);
  const reviewItems = useAppStore((s) => s.reviewItems);

  const lessonsRead = Object.keys(lessonReads || {});
  const shaky = useAppStore.getState().shakyLessons();
  const attemptsByTest = useAppStore.getState().attemptsByTest();
  // Nothing she has already answered this morning goes into this afternoon's
  // test — it would rehearse her for it and inflate the recorded score.
  const answeredToday = useAppStore.getState().answeredTodayIds();
  const today = dayKeyOf();

  const [openLesson, setOpenLesson] = useState(null);
  const [activeForm, setActiveForm] = useState(null);
  // v3.42 — THE COURSE THE LINK MEANT, when a link sent her here.
  //
  // This used to be APP_COURSES[0].id unconditionally, which is Herbalism. That
  // was invisible for as long as Herbalism was the only block that linked here.
  // The moment the timetable's Science and Social Studies blocks started
  // working, pressing "Social Studies" at 2:45 would have opened Herbalism —
  // a link that goes to the wrong place, which is worse than the missing link
  // Gigi reported, because it looks like it worked.
  //
  // She can still switch course by hand and her choice sticks: the effect below
  // only fires when a NEW request comes in from a link.
  const [courseId, setCourseId] = useState(requestedCourseId || APP_COURSES[0].id);
  const [quarter, setQuarter] = useState(1);

  useEffect(() => {
    if (requestedCourseId) setCourseId(requestedCourseId);
  }, [requestedCourseId]);

  // v3.79 — A LINK THAT MEANT ONE LESSON OPENS THAT LESSON.
  //
  // Gigi, Aug 25 2026: "her today prompt just sends her to the lesson she is to
  // complete and she doesn't see the other lessons."
  //
  // Same shape as the course effect above, and same reason it is an effect
  // rather than initial state: she can press Back and browse what she has
  // already done, and her choice must stick until a NEW link arrives. Seeding
  // useState with it instead would reopen the lesson every time this screen
  // re-rendered, which on a store this chatty means she could not get out of it.
  useEffect(() => {
    if (requestedLessonId) setOpenLesson(requestedLessonId);
  }, [requestedLessonId]);

  const course = courseById(courseId) || APP_COURSES[0];
  // Only quarters this course actually has modules registered in. A quarter tab
  // that opens on nothing is a promise the screen cannot keep.
  const quartersWithWork = course.quarters.filter((q) =>
    course.modules.some((m) => m.quarter === q)
  );
  const shownQuarter = quartersWithWork.includes(quarter) ? quarter : quartersWithWork[0];

  // -------------------------------------------------------------------------
  // v3.96 — ONE GATE, AND EVERY DOOR ASKS IT.
  //
  // There are four ways into LessonReader from this screen. Three of them asked
  // lessonIsOpen, directly or upstream. The fourth — the "Worth going back to"
  // buttons on a test's results — did not, and had not since the feature was
  // written. Nothing was wrong on screen, because a test only covers lessons she
  // has already read and a read lesson is open. That is luck, not a lock.
  //
  // The course comes from the LESSON, not from `courseId`. She can be looking at
  // the Herbalism tab with a Human Body test's results on screen, and asking the
  // gate about the wrong course is exactly the v3.42 bug — a link that goes to
  // the wrong place, which is worse than one that goes nowhere.
  //
  // check-lesson-doors enumerates the doors and fails on a fifth one.
  // -------------------------------------------------------------------------
  const canOpenLesson = (lid) => {
    const c = courseOfLesson(lid);
    return Boolean(c) && lessonIsOpen(lid, c, lessonsRead);
  };

  if (activeForm) {
    return (
      <TestView
        form={activeForm}
        onExit={() => setActiveForm(null)}
        canOpenLesson={canOpenLesson}
        onOpenLesson={(lessonId) => {
          // Asked twice on purpose. The button is greyed when the gate says no,
          // but a disabled button is a fact about the SCREEN. The door should
          // not depend on the screen having got it right.
          if (!canOpenLesson(lessonId)) return;
          setActiveForm(null);
          setOpenLesson(lessonId);
        }}
      />
    );
  }

  if (openLesson) {
    const lesson = lessonById(openLesson);
    const week = weekForLesson(openLesson);
    return (
      <LessonReader
        lesson={lesson}
        unitTitle={week ? `Week ${week.n} · ${week.title}` : null}
        onBack={() => setOpenLesson(null)}
      />
    );
  }

  const modules = course.modules.filter((m) => m.quarter === shownQuarter);
  const quarterRef = `${course.id}-q${shownQuarter}`;
  const qReady = quarterTestReady(quarterRef, attemptsByTest);
  const qAttempts = attemptsByTest[`${quarterRef}-final`] || [];
  const qRetake = retakeStatus(qAttempts, today);
  const qOfficial = officialAttempt(qAttempts);
  const weeksOfQuarter = (WEEKS[course.id] || []).filter((w) => w.quarter === shownQuarter);

  function startWeeklyTest(week) {
    const attempts = attemptsByTest[week.id] || [];
    const asked = attempts.flatMap((a) => a.rows.map((r) => r.questionId));
    setActiveForm(
      buildWeeklyTest(week.id, {
        attempt: attempts.length + 1,
        alreadyAsked: asked,
        answeredToday
      })
    );
  }

  function startQuarterTest() {
    const asked = qAttempts.flatMap((a) => a.rows.map((r) => r.questionId));
    setActiveForm(
      buildQuarterTest(quarterRef, {
        attempt: qAttempts.length + 1,
        alreadyAsked: asked,
        answeredToday
      })
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <header>
        <p className="label-caps">
          {course.emoji} {course.label} · her course
        </p>
        <h1 className="mt-1 font-display text-3xl text-ink-900">My Lessons</h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-700">{course.blurb}</p>
        <p className="mt-2 text-xs text-ink-500">
          {course.lessons.filter((l) => lessonsRead.includes(l.id)).length} of{' '}
          {course.lessons.length} lessons read · {course.minutes} minutes a lesson
        </p>
      </header>

      {/* ---- which course ---- */}
      {APP_COURSES.length > 1 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {APP_COURSES.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCourseId(c.id)}
              className={`rounded-full px-4 py-1.5 text-sm font-700 ${
                c.id === course.id
                  ? 'bg-lavender-500 text-white'
                  : 'border border-cream-300 bg-white text-ink-700 hover:border-lavender-500'
              }`}
            >
              {c.emoji} {c.label}
            </button>
          ))}
        </div>
      )}

      {/* ---- v3.79 — THE ONE SHE IS UP TO, AT THE TOP, WITH A BUTTON ----
           Today's Planner opens the lesson directly. THIS TAB DOES NOT — the
           nav bar has a Lessons button, and pressing it lands her on the index
           exactly as before. Sending her into a lesson from the planner and
           then handing her a menu the moment she uses the other door is the
           same feature half-built, which is how "correct and unreachable" keeps
           happening here. So the answer is on the screen either way.
           It is a shortcut, never a gate: everything below is still visible. */}
      {(() => {
        const next = nextLessonFor(course.id, lessonsRead);
        if (!next) return null;
        const nl = lessonById(next.lessonId);
        if (!nl) return null;
        return (
          <button
            type="button"
            onClick={() => setOpenLesson(next.lessonId)}
            className="mt-4 flex w-full items-center gap-3 rounded-petal border-2 border-sage-500 bg-sage-300/15 px-4 py-3.5 text-left hover:bg-sage-300/30"
          >
            <span className="flex-1">
              <span className="label-caps text-sage-700">You are up to</span>
              <span className="mt-0.5 block font-display text-lg text-ink-900">{nl.title}</span>
              <span className="block text-[0.7rem] text-ink-500">
                Week {next.week.n} · {next.week.title} · {nl.minutes} min
              </span>
            </span>
            <span className="rounded-full bg-sage-700 px-4 py-1.5 text-xs font-700 text-white">
              Start →
            </span>
          </button>
        );
      })()}

      {/* ---- which quarter ---- */}
      <div className="mt-3 flex gap-2">
        {quartersWithWork.map((q) => (
          <button
            key={q}
            type="button"
            onClick={() => setQuarter(q)}
            className={`rounded-full px-4 py-1.5 text-sm font-700 ${
              q === shownQuarter
                ? 'bg-sage-500 text-white'
                : 'border border-cream-300 bg-white text-ink-700 hover:border-sage-500'
            }`}
          >
            Quarter {q}
          </button>
        ))}
      </div>

      {lessonsRead.length === 0 && (
        <div className="mt-5">
          <MarigoldMessage
            text="Start at the top and work down. Three lessons, then a review game and a small test — and a warm-up on your Home screen each morning, so nothing you learn quietly slips away."
            tone="start"
          />
        </div>
      )}

      {/* ---- the modules ---- */}
      <div className="mt-7 space-y-7">
        {modules.map((mod) => {
          const modWeeks = weeksOfQuarter.filter((w) => mod.weeks.includes(w.n));
          const modLessons = mod.lessons.map(lessonById).filter(Boolean);
          const doneCount = mod.lessons.filter((l) => lessonsRead.includes(l)).length;

          return (
            <section key={mod.n} className="panel px-5 py-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="font-display text-xl text-ink-900">
                  {course.emoji} Module {mod.n} · {mod.title}
                </h2>
                <p className="text-xs text-ink-500">
                  {doneCount}/{modLessons.length} lessons
                </p>
              </div>
              <p className="mt-1 text-xs text-ink-700">{mod.blurb}</p>

              {modWeeks.map((week) => {
                const ready = weekTestReady(week, lessonsRead);
                const wAttempts = attemptsByTest[week.id] || [];
                const wOfficial = officialAttempt(wAttempts);
                const wRetake = retakeStatus(wAttempts, today);

                return (
                  <div key={week.id} className="mt-4">
                    <p className="label-caps text-ink-500">
                      Week {week.n} · {week.title}
                    </p>

                    <div className="mt-2 space-y-2">
                      {week.lessons.map((lid) => {
                        const l = lessonById(lid);
                        if (!l) return null;
                        const read = lessonsRead.includes(lid);
                        const isShaky = shaky.includes(lid);
                        // v3.79 — THE ROAD AHEAD IS VISIBLE AND NOT OPEN.
                        //
                        // Gigi chose this on Aug 25 2026: she may see the shape
                        // of her year, she may go back over anything she has
                        // finished, and she may not jump ahead. `lessonIsOpen`
                        // is the ONE definition — the screen asks the same
                        // function the block walks, so the list can never say a
                        // different lesson is next from the one Today opens.
                        const open = lessonIsOpen(lid, course.id, lessonsRead);
                        const isNext = open && !read;
                        return (
                          <button
                            key={lid}
                            type="button"
                            disabled={!open}
                            aria-disabled={!open}
                            onClick={() => open && setOpenLesson(lid)}
                            className={`flex w-full items-center gap-3 rounded-petal border px-4 py-3 text-left ${
                              open
                                ? `border-cream-300 bg-white hover:border-sage-500${
                                    isNext ? ' ring-2 ring-sage-500' : ''
                                  }`
                                : 'cursor-not-allowed border-cream-200 bg-cream-100 opacity-60'
                            }`}
                          >
                            <span
                              className={`flex h-7 w-7 flex-none items-center justify-center rounded-full text-xs font-700 ${
                                isShaky
                                  ? 'bg-gold-300 text-ink-900'
                                  : read
                                    ? 'bg-sage-300 text-ink-900'
                                    : open
                                      ? 'bg-cream-200 text-ink-700'
                                      : 'bg-cream-200 text-ink-500'
                              }`}
                            >
                              {isShaky ? '~' : read ? '✓' : l.n}
                            </span>
                            <span className="flex-1">
                              <span
                                className={`block text-sm font-700 ${
                                  open ? 'text-ink-900' : 'text-ink-500'
                                }`}
                              >
                                {l.title}
                              </span>
                              {/* The words below never say behind, weakest or
                                  catch up — the v3.63 rule. "Not yet" is a fact
                                  about the order of the course, not a judgement
                                  about her. And the next one says so plainly,
                                  because a ring of colour with no words is a
                                  thing a child has to work out. */}
                              <span className="block text-[0.7rem] text-ink-500">
                                {!open
                                  ? 'Not yet — this one comes later'
                                  : isNext
                                    ? `This one is next · ${l.minutes} min`
                                    : isShaky
                                      ? 'Worth another look'
                                      : `${l.minutes} min · ${(l.words || []).join(', ')}`}
                              </span>
                            </span>
                            {l.standards?.length > 0 && (
                              <span className="rounded-full bg-sage-300/40 px-2 py-0.5 text-[0.65rem] font-700 text-ink-700">
                                {l.standards.join(' ')}
                              </span>
                            )}
                            {l.video?.id && (
                              <span className="rounded-full bg-lavender-300/40 px-2 py-0.5 text-[0.65rem] font-700 text-lavender-700">
                                ▶ video
                              </span>
                            )}
                            <span className="text-xs text-ink-500">{open ? '→' : '🔒'}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* ---- day 4: the weekly test ---- */}
                    <div className="mt-3 rounded-petal border-2 border-dashed border-lavender-300 bg-lavender-300/10 px-4 py-3.5">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <p className="font-display text-base text-ink-900">
                          📝 Week {week.n} Test
                        </p>
                        <p className="text-[0.7rem] text-ink-500">
                          8 questions · about 12 minutes · day 4
                        </p>
                      </div>

                      {wOfficial && (
                        <div
                          className={`mt-2.5 rounded-xl border-2 px-3.5 py-2.5 ${BAND_STYLE[wOfficial.bandId]}`}
                        >
                          <p className="text-sm font-700">
                            {wOfficial.right} of {wOfficial.total} · {wOfficial.percent}%
                            {wOfficial.wasRetake && ` · attempt ${wOfficial.attempts}`}
                          </p>
                          <p className="mt-0.5 text-[0.7rem] text-ink-700">
                            Taken {wOfficial.dayKey}
                          </p>
                        </div>
                      )}

                      {/* A nudge, never a lock. A child who hits a wall she
                          cannot pass stops opening the app. */}
                      {ready.ready && week.lessons.some((l) => shaky.includes(l)) && (
                        <p className="mt-2.5 rounded-xl bg-gold-300/25 px-3.5 py-2.5 text-xs text-ink-900">
                          Worth re-reading first:{' '}
                          {week.lessons
                            .filter((l) => shaky.includes(l))
                            .map((l) => lessonById(l)?.title)
                            .filter(Boolean)
                            .join(', ')}
                          . You can still take the test.
                        </p>
                      )}

                      {!ready.ready ? (
                        <p className="mt-2.5 text-xs text-ink-700">{ready.reason}</p>
                      ) : wRetake.allowed ? (
                        <button
                          type="button"
                          onClick={() => startWeeklyTest(week)}
                          className="mt-2.5 rounded-full bg-lavender-500 px-5 py-2 text-sm font-700 text-white hover:bg-lavender-700"
                        >
                          {wAttempts.length ? 'Take it again' : 'Start the week test'}
                        </button>
                      ) : (
                        <p className="mt-2.5 text-xs text-ink-700">{wRetake.reason}</p>
                      )}

                      {wAttempts.length > 1 && (
                        <p className="mt-2 text-[0.7rem] text-ink-500">
                          {wAttempts.length} attempts, all kept in the record.
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </section>
          );
        })}
      </div>

      {/* ---- the quarter exam ---- */}
      <section className="mt-7 rounded-petal border-2 border-gold-500/50 bg-gold-300/15 px-5 py-5">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="font-display text-xl text-ink-900">🏅 Quarter {shownQuarter} Exam</h2>
          <p className="text-xs text-ink-500">24 questions · about 35 minutes · a rest halfway</p>
        </div>
        <p className="mt-1.5 text-xs text-ink-700">
          Everything from all four modules, mixed together. Mixed on purpose — pulling an answer
          out when you do not know which week it came from is what proves you actually have it.
        </p>

        {qOfficial && (
          <div className={`mt-3 rounded-xl border-2 px-4 py-3 ${BAND_STYLE[qOfficial.bandId]}`}>
            <p className="text-sm font-700">
              {qOfficial.right} of {qOfficial.total} · {qOfficial.percent}%
              {qOfficial.wasRetake && ` · attempt ${qOfficial.attempts}`}
            </p>
            <p className="mt-0.5 text-[0.7rem] text-ink-700">Taken {qOfficial.dayKey}</p>
          </div>
        )}

        {!qReady.ready ? (
          qReady.unbuilt > 0 ? (
            /* NOT the same sentence as "she has not sat them yet". This quarter
               is still being written, and telling a child to go and sit tests
               that do not exist is worse than telling her nothing. */
            <p className="mt-3 text-xs text-ink-700">
              Still being written — {qReady.built} of {qReady.planned} weeks of this quarter are
              ready so far. The exam opens when the whole quarter is here.
            </p>
          ) : (
            <p className="mt-3 text-xs text-ink-700">
              Opens after all {qReady.planned} week tests. Still to sit:{' '}
              {qReady.missing.map((w) => `Week ${w.n}`).join(', ')}.
            </p>
          )
        ) : qRetake.allowed ? (
          <button
            type="button"
            onClick={startQuarterTest}
            className="mt-3 rounded-full bg-gold-500 px-6 py-2.5 font-700 text-ink-900 hover:bg-gold-700"
          >
            {qAttempts.length ? 'Take it again' : 'Start the quarter exam'}
          </button>
        ) : (
          <p className="mt-3 text-xs text-ink-700">{qRetake.reason}</p>
        )}
      </section>

      <div className="mt-7 flex flex-wrap justify-center gap-2">
        <button
          type="button"
          onClick={() => onNavigate?.('year')}
          className="rounded-full border border-cream-300 bg-white px-4 py-2 text-sm font-700 text-ink-700 hover:border-lavender-500"
        >
          📚 The whole year
        </button>
        <button
          type="button"
          onClick={() => onNavigate?.('today')}
          className="rounded-full border border-cream-300 bg-white px-4 py-2 text-sm font-700 text-ink-700 hover:border-gold-500"
        >
          🔔 Today’s schedule
        </button>
      </div>
    </main>
  );
}