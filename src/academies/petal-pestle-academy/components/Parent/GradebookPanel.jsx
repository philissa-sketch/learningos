import { useState } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import { allWeeks, BANDS } from '../../config/assessment.js';
import { officialAttempt } from '../../lib/assessmentEngine.js';
import { reviewSummary, troubleSpots, dayKeyOf, daysBetween } from '../../lib/reviewQueue.js';
import { bankItemById, itemsForLessons } from '../../data/assessments/appBank.js'; // v3.25 — every course
import { APP_COURSES, lessonById } from '../../data/lessons/appCourses.js'; // v3.95 — every course, at last
import {
  getSubjectGrades,
  sourceSentence,
  testLoadByDay,
  retakeState
} from '../../lib/gradebook.js';

// ---------------------------------------------------------------------------
// THE GRADEBOOK.
//
// This is the half of the assessment system she never sees. She gets a band —
// Got it, Nearly there, Let's go back. A grown-up gets the number, every
// question, what she picked, and which lesson each miss traces back to.
//
// ---- WHY BOTH, RATHER THAN PICKING ONE ----
//
// A nine-year-old who is a year behind in reading does not need a percentage to
// carry around; it becomes an identity faster than anyone intends. But a school
// record built on "she seemed to be doing fine" is not a record, and this year
// is formally 4th grade — there has to be something a transcript can be built
// from that somebody else could check.
//
// So nothing is softened here. What is on this screen is exactly what happened,
// including the re-takes, including the attempts she failed. The kindness is in
// where the number is shown, not in whether it is true.
//
// ---- THE MOST USEFUL THING ON THIS SCREEN IS NOT THE SCORES ----
//
// It is "Slipping" — the questions she has met three or more times and misses
// more than half of. A test score says how one morning went. That list says
// what is not sticking, which is the thing a grown-up can actually do something
// about.
//
// ---- v3.95: ONE CARD PER SUBJECT, AND THIS SCREEN KNOWS ALL FOUR COURSES ----
//
// Gigi: "The long list of randomness in the Test tab under Gradebook is
// confusing. I want to open one place and see how she is doing in each
// subject."
//
// It listed 104 weeks — every week of every course — under a heading that said
// "Herbalism · Quarter 1", with no column saying which course a row was. She
// had sat 11 tests. THE ARITHMETIC LIVES IN src/lib/gradebook.js NOW: this file
// renders and does not calculate, so `check-gradebook` can assert the numbers
// by calling the function instead of reading the JSX. Three bugs in this
// project have come from a check that read text rather than asking the code.
//
// ⚠️ "What is sticking" IS UNCHANGED AND MUST STAY THAT WAY — same position,
// same four stats, same list, same words. It is the most useful thing on the
// screen and it was not what she asked to have fixed. `check-gradebook`
// asserts it rather than trusting this comment.
// ---------------------------------------------------------------------------

const BAND_STYLE = {
  'got-it': 'border-sage-500 bg-sage-300/25',
  nearly: 'border-gold-500 bg-gold-300/25',
  'go-back': 'border-clay-500 bg-clay-500/10'
};

/**
 * v3.95: was `HERBALISM_Q1.find(...)`, so every Science Lab, Social Studies and
 * Human Body question on this screen printed a raw id like `sl-m2-04`.
 * `lessonById` has spanned all four courses since v3.25 and five other files
 * already used it. This one did not.
 */
function lessonLabel(lessonId) {
  const l = lessonById(lessonId);
  return l ? `Lesson ${l.n} · ${l.title}` : lessonId;
}

function bandLabel(id) {
  return BANDS.find((b) => b.id === id)?.label || id;
}

export function GradebookPanel() {
  // Raw state subscriptions, then derive — see the note in LessonsView. A
  // selector that returns a fresh object every call re-renders this panel on
  // every unrelated store change.
  const attempts = useAppStore((s) => s.attempts);
  const reviewItems = useAppStore((s) => s.reviewItems);
  const lessonReads = useAppStore((s) => s.lessonReads);
  const khanGrades = useAppStore((s) => s.khanGrades);
  const writingMarks = useAppStore((s) => s.writingMarks);
  const spellingResults = useAppStore((s) => s.spellingResults);
  const attemptsByTest = useAppStore.getState().attemptsByTest();
  const [openAttempt, setOpenAttempt] = useState(null);

  const lessonsRead = Object.keys(lessonReads || {});
  const readQuestionIds = itemsForLessons(lessonsRead).map((q) => q.id);
  const summary = reviewSummary(reviewItems, readQuestionIds);
  const trouble = troubleSpots(reviewItems, 8);
  const today = dayKeyOf();

  const subjects = getSubjectGrades({ attempts, khanGrades, writingMarks, spellingResults });
  const load = testLoadByDay(attempts);

  if (!attempts.length && !lessonsRead.length) {
    return (
      <div className="panel px-5 py-6">
        <h2 className="font-display text-lg text-ink-900">Nothing recorded yet</h2>
        <p className="mt-2 text-sm text-ink-700">
          This page fills in as she reads lessons and sits weekly tests. It holds every test she
          takes, question by question — what she picked, what was right, and which lesson each miss
          came from.
        </p>
        <p className="mt-2 text-xs text-ink-500">
          She never sees a percentage. She sees Got it, Nearly there, or Let&apos;s go back. The
          numbers live here, because a school record has to be checkable and a nine-year-old does
          not need a number to carry around.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* ---- what is actually sticking ---- */}
      <section className="panel px-5 py-5">
        <h2 className="font-display text-lg text-ink-900">What is sticking</h2>
        <p className="mt-1 text-xs text-ink-700">
          Across the {summary.total} questions from the {lessonsRead.length} lessons she has read.
          This comes from her daily warm-ups as well as her tests, so it is a truer read than any
          single morning.
        </p>
        <div className="mt-3 grid gap-2 sm:grid-cols-4">
          <Stat n={summary.solid} label="Solid" hint="Answered right at long gaps" tone="sage" />
          <Stat n={summary.settling} label="Settling" hint="Still on short gaps" tone="gold" />
          <Stat n={summary.slipping} label="Slipping" hint="Missed more often than not" tone="clay" />
          <Stat n={summary.unseen} label="Not yet met" hint="Waiting in the bank" tone="plain" />
        </div>

        {trouble.length > 0 && (
          <div className="mt-4">
            <p className="label-caps">Worth sitting down with her about</p>
            <div className="mt-2 space-y-1.5">
              {trouble.map((it) => {
                const q = bankItemById(it.questionId);
                if (!q) return null;
                const overdue = daysBetween(it.dueOn, today);
                return (
                  <div
                    key={it.questionId}
                    className="rounded-petal border border-cream-300 bg-white px-3.5 py-2.5"
                  >
                    <p className="text-sm text-ink-900">{q.prompt}</p>
                    <p className="mt-0.5 text-[0.7rem] text-ink-500">
                      {lessonLabel(q.lesson)} · seen {it.seen}, missed {it.missed} ·{' '}
                      {overdue >= 0 ? 'due now' : `back in ${-overdue} day${overdue === -1 ? '' : 's'}`}
                    </p>
                    <p className="mt-1 text-[0.7rem] text-ink-700">
                      Right answer: <span className="font-700">{q.choices[q.answer]}</span> — {q.why}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </section>

      {/* ---- how much was asked of her ---- */}
      {load.length > 0 && <TestLoad load={load} />}

      {/* ---- how she is doing, one card per subject ---- */}
      <section className="space-y-3">
        <div className="panel px-5 py-4">
          <h2 className="font-display text-lg text-ink-900">How she is doing, by subject</h2>
          <p className="mt-1 text-xs text-ink-700">
            One card per subject. Open a quarter to see the weeks inside it, and a week to see the
            questions. A quarter she has not reached says so — it is never a blank and never a
            zero, because a quarter she has not sat is not a quarter she failed.
          </p>
          <p className="mt-1.5 text-[0.7rem] text-ink-500">
            A quarter exam counts for as much as the quarter it tests — the weekly tests she sat in
            it. At equal weight an exam was one score in thirty-six, and she could have failed all
            four and still finished with an A.
          </p>
          <p className="mt-1.5 text-[0.7rem] text-ink-500">
            <span className="font-700">This screen grades the work this app made</span> — her
            weekly tests, her quarter exams, her writing pieces and her spelling. Khan Academy is
            somebody else&apos;s curriculum and it is graded on its own tab, Maths and Grammar
            alike. Nothing is missing from her record: it is on the screen that owns it.
          </p>
        </div>

        {subjects.map((s) => (
          <SubjectCard key={s.id} subject={s} attemptsByTest={attemptsByTest} />
        ))}
      </section>

      {/* ---- the practice gate ---- */}
      {lessonsRead.length > 0 && (
        <section className="panel px-5 py-5">
          <h2 className="font-display text-lg text-ink-900">Lessons and the practice gate</h2>
          <p className="mt-1 text-xs text-ink-700">
            Each lesson ends in a quick check. Miss more than one and she is served extra practice
            from that lesson&apos;s own question bank before she finishes. It never blocks her —
            what it does is make sure a lesson she did not understand shows up here instead of
            passing silently.
          </p>

          {/* v3.95: was HERBALISM_Q1 only, so 23 lessons read could show the Herbalism ones. */}
          {APP_COURSES.map((course) => {
            const read = course.lessons.filter((l) => lessonReads[l.id]);
            if (!read.length) return null;
            return (
              <div key={course.id} className="mt-4">
                <p className="label-caps">
                  {course.emoji} {course.label}
                </p>
                <div className="mt-2 overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-cream-300 text-[0.7rem] uppercase tracking-wide text-ink-500">
                        <th className="py-2 pr-3">Lesson</th>
                        <th className="py-2 pr-3">Check</th>
                        <th className="py-2 pr-3">Extra practice</th>
                        <th className="py-2">Reads</th>
                      </tr>
                    </thead>
                    <tbody>
                      {read.map((l) => {
                        const row = lessonReads[l.id];
                        const p = row.practice;
                        return (
                          <tr
                            key={l.id}
                            className={`border-b border-cream-200 ${p && p.passed === false ? 'bg-gold-300/20' : ''}`}
                          >
                            <td className="py-2.5 pr-3 font-700 text-ink-900">
                              {l.n}. {l.title}
                            </td>
                            <td className="tnum py-2.5 pr-3">
                              {p ? `${p.correct}/${p.asked}${p.passed === false ? ' · shaky' : ''}` : '—'}
                            </td>
                            <td className="tnum py-2.5 pr-3">
                              {p?.extraServed ? `${p.extraCorrect}/${p.extraServed}` : '—'}
                            </td>
                            <td className="tnum py-2.5">{row.reads}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}

          <p className="mt-3 text-xs text-ink-500">
            A dash under Check means she finished that lesson before the gate existed, or without
            doing the check. The row shows her LATEST attempt, not her best — a lesson she has since
            fumbled should say so.
          </p>
        </section>
      )}

      {/* ---- every attempt, question by question ---- */}
      <section className="panel px-5 py-5">
        <h2 className="font-display text-lg text-ink-900">Every attempt, question by question</h2>
        {attempts.length === 0 ? (
          <p className="mt-2 text-sm text-ink-700">No tests sat yet.</p>
        ) : (
          <div className="mt-3 space-y-2">
            {[...attempts].reverse().map((a) => (
              <div key={a.attemptId} className={`rounded-petal border-2 ${BAND_STYLE[a.bandId]}`}>
                <button
                  type="button"
                  onClick={() => setOpenAttempt(openAttempt === a.attemptId ? null : a.attemptId)}
                  className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
                >
                  <span>
                    <span className="block text-sm font-700 text-ink-900">{a.title}</span>
                    <span className="block text-[0.7rem] text-ink-700">
                      {a.dayKey} · attempt {a.attempt} · {bandLabel(a.bandId)}
                    </span>
                  </span>
                  <span className="tnum text-sm font-700 text-ink-900">
                    {a.right}/{a.total} · {a.percent}%
                  </span>
                </button>

                {openAttempt === a.attemptId && <AttemptDetail attempt={a} />}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

/**
 * ONE SUBJECT. Letter, percentage, what the number is made of, and a row per
 * quarter that opens into the weeks and then into the questions.
 */
function SubjectCard({ subject, attemptsByTest }) {
  const [openQuarter, setOpenQuarter] = useState(null);
  const weeks = allWeeks();

  return (
    <div className="panel px-5 py-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-display text-base text-ink-900">
          {subject.emoji} {subject.label}
        </h3>
        {subject.percent === null ? (
          <span className="text-sm text-ink-500">Not yet graded</span>
        ) : (
          <span className="text-right">
            <span className="tnum block text-sm font-700 text-ink-900">
              {subject.letter} · {subject.percent}%
            </span>
            {subject.percentBest !== null && subject.percentBest !== subject.percent && (
              <span className="tnum block text-[0.7rem] text-ink-500">
                her best · {subject.letterBest} {subject.percentBest}%
              </span>
            )}
          </span>
        )}
      </div>

      <p className="mt-1 text-xs text-ink-700">
        {subject.assessedCount > 0
          ? sourceSentence(subject.sources)
          : 'Nothing graded in this subject yet.'}
      </p>

      {subject.notCounted?.readingChecks > 0 && (
        <p className="mt-1.5 text-[0.7rem] text-ink-500">
          {subject.notCounted.readingChecks} reading check
          {subject.notCounted.readingChecks === 1 ? ' is' : 's are'} recorded and reach no subject
          grade yet. That is this app&apos;s own work, so it does belong on this screen — it is
          waiting for Reading to become its own card, because folding it into a writing grade would
          bury the read-aloud number the reading check exists to produce.
        </p>
      )}

      <div className="mt-3 space-y-1.5">
        {subject.quarters.map((q) => {
          const open = openQuarter === q.quarter;
          const reached = q.state === 'graded';
          return (
            <div key={q.quarter} className="rounded-petal border border-cream-300 bg-white">
              <button
                type="button"
                disabled={!reached}
                onClick={() => setOpenQuarter(open ? null : q.quarter)}
                className={`flex w-full items-center justify-between gap-3 px-3.5 py-2.5 text-left ${
                  reached ? '' : 'cursor-default opacity-60'
                }`}
              >
                <span className="text-sm font-700 text-ink-900">{q.label}</span>
                <span className="flex items-baseline gap-3">
                  <span className="text-[0.7rem] text-ink-500">
                    {q.of === null
                      ? `${q.count} graded`
                      : reached
                        ? `${q.sat} of ${q.of} sat`
                        : `not reached yet · ${q.of} weeks`}
                  </span>
                  {reached ? (
                    <span className="text-right">
                      <span className="tnum block text-sm font-700 text-ink-900">
                        {q.letter} · {q.percent}%
                      </span>
                      {q.percentBest !== null && q.percentBest !== q.percent && (
                        <span className="tnum block text-[0.7rem] text-ink-500">
                          best {q.percentBest}%
                        </span>
                      )}
                    </span>
                  ) : (
                    <span className="text-sm text-ink-500">—</span>
                  )}
                </span>
              </button>

              {open && (
                <QuarterWeeks
                  subject={subject}
                  quarter={q.quarter}
                  weeks={weeks}
                  attemptsByTest={attemptsByTest}
                />
              )}
            </div>
          );
        })}
      </div>

      {subject.outside.length > 0 && (
        <p className="mt-2 text-[0.7rem] text-ink-500">
          {subject.outside.length} result{subject.outside.length === 1 ? '' : 's'} recorded outside
          the four quarters — summer term, or before the year began. Counted in the subject, shown
          on no quarter, because it did not happen in one.
        </p>
      )}
    </div>
  );
}

/** The weeks inside one quarter of one subject, each opening to its questions. */
function QuarterWeeks({ subject, quarter, weeks, attemptsByTest }) {
  const [openWeek, setOpenWeek] = useState(null);

  // A blended subject has no weekly tests — it lists what it does have.
  if (subject.kind !== 'course') {
    const rows = subject.assessments.filter((a) => a.quarter === quarter);
    return (
      <div className="border-t border-cream-200 px-3.5 py-3">
        <ul className="space-y-1.5 text-xs">
          {rows.map((a) => (
            <li key={a.id} className="flex items-baseline justify-between gap-3">
              <span className="text-ink-900">{a.label}</span>
              <span className="tnum flex-none font-700 text-ink-900">{a.percent}%</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  const inQuarter = weeks.filter((w) => w.course === subject.id && w.quarter === quarter);
  const examId = `${subject.id}-q${quarter}-final`;
  const exam = officialAttempt(attemptsByTest[examId]);

  return (
    <div className="border-t border-cream-200 px-3.5 py-3">
      <table className="w-full text-left text-xs">
        <thead>
          <tr className="border-b border-cream-200 text-[0.65rem] uppercase tracking-wide text-ink-500">
            <th className="py-1.5 pr-3">Week</th>
            <th className="py-1.5 pr-3">Score</th>
            <th className="py-1.5 pr-3">Band</th>
            <th className="py-1.5 pr-3">Attempts</th>
            <th className="py-1.5">Taken</th>
          </tr>
        </thead>
        <tbody>
          {inQuarter.map((w) => {
            const list = attemptsByTest[w.id] || [];
            const off = officialAttempt(list);
            const open = openWeek === w.id;
            return (
              <WeekRow
                key={w.id}
                label={`Week ${w.n} · ${w.title}`}
                off={off}
                attempts={list.length}
                best={bestOf(list)}
                open={open}
                onToggle={() => setOpenWeek(open ? null : w.id)}
              />
            );
          })}
          <WeekRow
            label={`Quarter ${quarter} Exam`}
            off={exam}
            attempts={(attemptsByTest[examId] || []).length}
            best={bestOf(attemptsByTest[examId])}
            open={openWeek === examId}
            onToggle={() => setOpenWeek(openWeek === examId ? null : examId)}
            highlight
          />
        </tbody>
      </table>
      <p className="mt-2 text-[0.65rem] text-ink-500">
        The score shown is the LATEST attempt, not the best one, and the attempts column says how
        many there were. A re-take that is hidden is a record nobody can trust.
      </p>
    </div>
  );
}

function WeekRow({ label, off, attempts, best, open, onToggle, highlight }) {
  const sat = Boolean(off);
  const retake = retakeState(attempts);
  return (
    <>
      <tr className={`border-b border-cream-200 ${highlight ? 'bg-gold-300/15' : ''}`}>
        <td className="py-2 pr-3 font-700 text-ink-900">
          {sat ? (
            <button type="button" onClick={onToggle} className="text-left underline decoration-dotted">
              {label}
            </button>
          ) : (
            label
          )}
        </td>
        <td className="tnum py-2 pr-3">
          {sat ? `${off.right}/${off.total} · ${off.percent}%` : '—'}
          {sat && Number.isFinite(best) && best !== off.percent && (
            <span className="block text-[0.65rem] text-ink-500">best {best}%</span>
          )}
        </td>
        <td className="py-2 pr-3">{sat ? bandLabel(off.bandId) : 'Not sat'}</td>
        <td className="tnum py-2 pr-3">
          {attempts ? `${retake.used} of ${retake.cap}` : '—'}
          {retake.atCap && (
            <span className="block text-[0.65rem] font-700 text-clay-500">no re-takes left</span>
          )}
        </td>
        <td className="py-2 text-ink-500">{off?.dayKey || '—'}</td>
      </tr>
      {open && sat && (
        <tr>
          <td colSpan={5} className="pb-3">
            <div className="rounded-petal border border-cream-300 bg-white">
              <AttemptDetail attempt={off} />
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

/**
 * One attempt, question by question — what she picked and what was right.
 *
 * Lifted out of the attempts list at v3.95 so the subject drill and the full
 * chronological list render from ONE implementation. Two copies of this would
 * disagree the first time either was touched.
 */
function AttemptDetail({ attempt }) {
  return (
    <div className="border-t border-white/60 bg-white/70 px-4 py-3">
      {attempt.revisit?.length > 0 && (
        <p className="mb-2 text-xs text-ink-700">
          Sent back to:{' '}
          {attempt.revisit.map((r) => lessonLabel(r.lesson).replace('Lesson ', 'L')).join(', ')}
        </p>
      )}
      <ol className="space-y-1.5 text-xs">
        {(attempt.rows || []).map((r, i) => {
          const q = bankItemById(r.questionId);
          return (
            <li key={r.questionId} className="flex gap-2">
              <span
                className={`mt-0.5 flex h-4 w-4 flex-none items-center justify-center rounded-full text-[0.6rem] font-700 ${
                  r.correct ? 'bg-sage-500 text-white' : 'bg-clay-500 text-white'
                }`}
              >
                {r.correct ? '✓' : '✗'}
              </span>
              <span>
                <span className="text-ink-900">
                  {i + 1}. {q?.prompt || r.questionId}
                </span>
                {!r.correct && (
                  <span className="block text-ink-700">
                    {r.skipped
                      ? 'Left blank.'
                      : `She chose "${q?.choices?.[r.chosen] ?? r.chosen}". Right answer: "${q?.choices?.[r.answer] ?? r.answer}".`}
                  </span>
                )}
                <span className="block text-[0.65rem] text-ink-500">{lessonLabel(r.lesson)}</span>
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/** Her highest percentage on a test, for the "best" line beside the latest. */
function bestOf(list) {
  const scored = (list || []).filter((a) => Number.isFinite(a.percent));
  return scored.length ? Math.max(...scored.map((a) => a.percent)) : null;
}

/**
 * HOW MUCH WAS ASKED OF HER, BY DAY.
 *
 * Gigi, Aug 29: "I don't want to overwhelm her. Her grades aren't doing so
 * well." Her record held eleven assessments in ten days — four on Aug 26
 * (75, 63, 60, 50, falling through the day) and three on Aug 28 (38, 38, 38).
 * Every re-take she sat on a LIGHT day went up.
 *
 * Nothing was counting this, so the only story the screen could tell was the
 * one about her. This tells the other one.
 */
function TestLoad({ load }) {
  const heavy = load.filter((d) => d.heavy);
  return (
    <section className="panel px-5 py-5">
      <h2 className="font-display text-lg text-ink-900">How much was asked of her</h2>
      <p className="mt-1 text-xs text-ink-700">
        Everything she sat, by day — tests, re-takes, reading checks and spelling alike, because
        they all cost her the same attention. A test score says how one morning went. This says how
        much was asked of her that morning, which is the part you can change.
      </p>

      {heavy.length > 0 && (
        <p className="mt-2 rounded-petal border border-gold-500/50 bg-gold-300/20 px-3.5 py-2.5 text-xs text-ink-900">
          <span className="font-700">
            {heavy.length} day{heavy.length === 1 ? '' : 's'} with three or more.
          </span>{' '}
          Worth knowing before the scores are read as a verdict — a low mark at the end of a
          four-test day is telling you about the day as much as about her.
        </p>
      )}

      <div className="mt-3 space-y-1">
        {load.slice(0, 14).map((d) => (
          <div key={d.day} className="flex items-center gap-3 text-xs">
            <span className="tnum w-24 flex-none text-ink-500">{d.day}</span>
            <span className="flex flex-none gap-1" aria-hidden="true">
              {Array.from({ length: d.count }).map((_, i) => (
                <span
                  key={i}
                  className={`inline-block h-2.5 w-2.5 rounded-full ${
                    d.heavy ? 'bg-gold-500' : 'bg-sage-500'
                  }`}
                />
              ))}
            </span>
            <span className={`flex-none ${d.heavy ? 'font-700 text-ink-900' : 'text-ink-700'}`}>
              {d.count} sat
            </span>
            {d.low !== null && (
              <span className="tnum text-ink-500">
                {d.low === d.high ? `${d.low}%` : `${d.low}–${d.high}%`}
              </span>
            )}
          </div>
        ))}
      </div>

      <p className="mt-3 text-[0.7rem] text-ink-500">
        Three in a day is flagged, not forbidden — this is a number to look at, not a rule the app
        enforces. Nothing here changes a grade.
      </p>
    </section>
  );
}

const STAT_TONE = {
  sage: 'border-sage-500/50 bg-sage-300/20',
  gold: 'border-gold-500/50 bg-gold-300/20',
  clay: 'border-clay-500/50 bg-clay-500/10',
  plain: 'border-cream-300 bg-white'
};

function Stat({ n, label, hint, tone }) {
  return (
    <div className={`rounded-petal border-2 px-3.5 py-3 ${STAT_TONE[tone]}`}>
      <p className="tnum font-display text-2xl text-ink-900">{n}</p>
      <p className="text-xs font-700 text-ink-900">{label}</p>
      <p className="mt-0.5 text-[0.65rem] leading-snug text-ink-700">{hint}</p>
    </div>
  );
}
