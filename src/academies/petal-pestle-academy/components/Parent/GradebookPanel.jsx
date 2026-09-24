import { useState } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import { allWeeks, BANDS } from '../../config/assessment.js';
import { officialAttempt } from '../../lib/assessmentEngine.js';
import { reviewSummary, troubleSpots, dayKeyOf, daysBetween } from '../../lib/reviewQueue.js';
import { bankItemById, itemsForLessons } from '../../data/assessments/appBank.js'; // v3.25 — every course
import { APP_COURSES, lessonById } from '../../data/lessons/appCourses.js'; // v3.95 — every course, at last
import { testLoadByDay, retakeState } from '../../lib/gradebook.js';
import { reportCard, cellText, CELL } from '../../lib/reportCard.js';

// ---------------------------------------------------------------------------
// THE GRADEBOOK.
//
// The half of the assessment system she never sees. She gets a band (Got it,
// Nearly there, Let's go back). A grown-up gets the number, every question,
// what she picked, and which lesson each miss traces back to. Nothing is
// softened: re-takes and failed attempts are all here.
//
// ---- SEPT 24 2026: ONE REPORT CARD, ONE SHAPE ----
//
// Gigi: "The grade book is confusing. Can we clean it up so that it is more
// uniform and makes sense?" She took the plan as recommended:
//
//   1. GRADES FIRST. The screen opens on one report card: every subject a row,
//      the same columns for every row (Quarter 1–4 and the Year). Built by
//      lib/reportCard.js; this file renders and does not calculate.
//   2. EVERY SUBJECT CARD IS THE SAME SHAPE. Grade, one line saying what
//      counts, a row per quarter that opens into the work. Before, courses,
//      Language Arts and Reading were three different layouts, and "nothing
//      yet" was written three different ways.
//   3. ONE NUMBER PER CELL. The grade of record is her latest attempt. Her best
//      is shown inside the quarter, beside the attempt it came from.
//   4. MATH AND GRAMMAR ARE ON THE REPORT CARD, in their own Khan group, read
//      from the Khan tab (where they are still entered). No Khan result is
//      blended into any of this app's grades.
//   5. THE TOOLS MOVED TO TABS, UNCHANGED: What is sticking, Every test (with
//      how much was asked of her each day), Lesson checks. "What is sticking"
//      used to be first on this screen by an earlier decision; Gigi moved it
//      to its own tab so the grades come first.
//
// check-gradebook-uniform.mjs holds all of this.
// ---------------------------------------------------------------------------

const BAND_STYLE = {
  'got-it': 'border-sage-500 bg-sage-300/25',
  nearly: 'border-gold-500 bg-gold-300/25',
  'go-back': 'border-clay-500 bg-clay-500/10'
};

export const GRADEBOOK_TABS = [
  { id: 'grades', label: 'Grades' },
  { id: 'sticking', label: 'What is sticking' },
  { id: 'tests', label: 'Every test' },
  { id: 'lessons', label: 'Lesson checks' }
];

function lessonLabel(lessonId) {
  const l = lessonById(lessonId);
  return l ? `Lesson ${l.n} · ${l.title}` : lessonId;
}

function bandLabel(id) {
  return BANDS.find((b) => b.id === id)?.label || id;
}

const CELL_STYLE = {
  [CELL.graded]: 'font-700 text-ink-900',
  [CELL.notReached]: 'text-ink-500',
  [CELL.noClass]: 'text-[0.7rem] italic text-ink-500/70'
};

export function GradebookPanel() {
  // Raw state subscriptions, then derive — see the note in LessonsView.
  const attempts = useAppStore((s) => s.attempts);
  const reviewItems = useAppStore((s) => s.reviewItems);
  const lessonReads = useAppStore((s) => s.lessonReads);
  const khanGrades = useAppStore((s) => s.khanGrades);
  const writingMarks = useAppStore((s) => s.writingMarks);
  const spellingResults = useAppStore((s) => s.spellingResults);
  const attemptsByTest = useAppStore.getState().attemptsByTest();
  const [tab, setTab] = useState('grades');

  const lessonsRead = Object.keys(lessonReads || {});
  const card = reportCard({ attempts, khanGrades, writingMarks, spellingResults });

  if (!attempts.length && !lessonsRead.length && !(khanGrades || []).length) {
    return (
      <div className="panel px-5 py-6">
        <h2 className="font-display text-lg text-ink-900">Nothing recorded yet</h2>
        <p className="mt-2 text-sm text-ink-700">
          This page fills in as she reads lessons and sits tests. She never sees a percentage; she
          sees Got it, Nearly there, or Let&apos;s go back. The numbers live here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <nav className="flex flex-wrap gap-2" aria-label="Gradebook sections">
        {GRADEBOOK_TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            aria-current={tab === t.id ? 'true' : undefined}
            className={`rounded-full border-2 px-4 py-1.5 text-sm font-700 ${
              tab === t.id ? 'border-sage-500 bg-sage-300/30 text-ink-900' : 'border-cream-300 bg-white text-ink-700'
            }`}
          >
            {t.label}
          </button>
        ))}
      </nav>

      {tab === 'grades' && <GradesTab card={card} attemptsByTest={attemptsByTest} />}
      {tab === 'sticking' && <StickingTab reviewItems={reviewItems} lessonsRead={lessonsRead} />}
      {tab === 'tests' && <TestsTab attempts={attempts} />}
      {tab === 'lessons' && <LessonChecksTab lessonReads={lessonReads} />}
    </div>
  );
}

// ---------------------------------------------------------------------------
// GRADES
// ---------------------------------------------------------------------------

function GradesTab({ card, attemptsByTest }) {
  return (
    <div className="space-y-4">
      <section className="panel px-5 py-5">
        <h2 className="font-display text-lg text-ink-900">Report card</h2>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[34rem] text-left text-sm">
            <thead>
              <tr className="border-b border-cream-300 text-[0.7rem] uppercase tracking-wide text-ink-500">
                <th className="py-2 pr-3">Subject</th>
                {card.quarters.map((q) => (
                  <th key={q} className="py-2 pr-3">
                    Q{q}
                  </th>
                ))}
                <th className="py-2">Year</th>
              </tr>
            </thead>
            {card.groups.map((g) => (
              <tbody key={g.id}>
                <tr>
                  <td colSpan={card.quarters.length + 2} className="pb-1 pt-3 label-caps text-ink-500">
                    {g.label}
                  </td>
                </tr>
                {g.rows.map((r) => (
                  <tr key={r.id} className="border-b border-cream-200">
                    <td className="py-2 pr-3">
                      <a href={`#gb-${r.id}`} className="font-700 text-ink-900 underline decoration-dotted">
                        {r.emoji} {r.label}
                      </a>
                    </td>
                    {r.cells.map((c) => (
                      <td key={c.quarter} className={`tnum py-2 pr-3 ${CELL_STYLE[c.state]}`}>
                        {cellText(c)}
                      </td>
                    ))}
                    <td className="tnum py-2 font-700 text-ink-900">{r.year ? cellText(r.year) : '—'}</td>
                  </tr>
                ))}
              </tbody>
            ))}
          </table>
        </div>
        <p className="mt-3 text-[0.7rem] text-ink-500">
          <span className="font-700">—</span> not reached yet (never a zero) ·{' '}
          <span className="italic">no class</span> that course has no class that quarter · each grade is
          her latest attempt; her best is inside the quarter below.
        </p>
      </section>

      {card.groups.map((g) => (
        <section key={g.id} className="space-y-3">
          <p className="label-caps px-1 text-ink-500">{g.label}</p>
          {g.rows.map((r) => (
            <SubjectCard key={r.id} row={r} attemptsByTest={attemptsByTest} />
          ))}
        </section>
      ))}
    </div>
  );
}

/**
 * ONE SUBJECT, THE SAME SHAPE FOR EVERY SUBJECT: its Year grade, one line of
 * what counts, and a row per quarter that opens into the work behind it.
 */
function SubjectCard({ row, attemptsByTest }) {
  const [openQuarter, setOpenQuarter] = useState(null);
  const weeks = allWeeks();
  return (
    <div id={`gb-${row.id}`} className="panel scroll-mt-4 px-5 py-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-display text-base text-ink-900">
          {row.emoji} {row.label}
        </h3>
        <span className="tnum text-sm font-700 text-ink-900">{row.year ? cellText(row.year) : '—'}</span>
      </div>
      <p className="mt-1 text-xs text-ink-700">{row.counts}</p>

      <div className="mt-3 space-y-1.5">
        {row.cells.map((c) => {
          const open = openQuarter === c.quarter;
          const reached = c.state === CELL.graded;
          return (
            <div key={c.quarter} className="rounded-petal border border-cream-300 bg-white">
              <button
                type="button"
                disabled={!reached}
                onClick={() => setOpenQuarter(open ? null : c.quarter)}
                className={`flex w-full items-center justify-between gap-3 px-3.5 py-2.5 text-left ${
                  reached ? '' : 'cursor-default opacity-60'
                }`}
              >
                <span className="text-sm font-700 text-ink-900">Quarter {c.quarter}</span>
                <span className={`tnum text-sm ${CELL_STYLE[c.state]}`}>{cellText(c)}</span>
              </button>
              {open &&
                (row.detail === 'course' ? (
                  <QuarterWeeks subject={row.subject} quarter={c.quarter} weeks={weeks} attemptsByTest={attemptsByTest} />
                ) : (
                  <QuarterList items={row.itemsByQuarter[c.quarter] || []} />
                ))}
            </div>
          );
        })}
      </div>

      {row.outside > 0 && (
        <p className="mt-2 text-[0.7rem] text-ink-500">
          {row.outside} result{row.outside === 1 ? '' : 's'} from outside the four quarters (summer)
          count in the Year only.
        </p>
      )}
    </div>
  );
}

/** Everything graded in one quarter of a subject that has no weekly tests. */
function QuarterList({ items }) {
  return (
    <div className="border-t border-cream-200 px-3.5 py-3">
      <ul className="space-y-1.5 text-xs">
        {items.map((it) => (
          <li key={it.id} className="flex items-baseline justify-between gap-3">
            <span className="text-ink-900">
              {it.label}
              {it.day && <span className="ml-2 text-ink-500">{it.day}</span>}
            </span>
            <span className="tnum flex-none font-700 text-ink-900">
              {it.score}
              {Number.isFinite(it.best) && <span className="ml-1 font-400 text-ink-500">(best {it.best}%)</span>}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ---------------------------------------------------------------------------
// WHAT IS STICKING — moved here unchanged from the top of the old screen.
// ---------------------------------------------------------------------------

function StickingTab({ reviewItems, lessonsRead }) {
  const readQuestionIds = itemsForLessons(lessonsRead).map((q) => q.id);
  const summary = reviewSummary(reviewItems, readQuestionIds);
  const trouble = troubleSpots(reviewItems, 8);
  const today = dayKeyOf();
  return (
    <section className="panel px-5 py-5">
      <h2 className="font-display text-lg text-ink-900">What is sticking</h2>
      <p className="mt-1 text-xs text-ink-700">
        Across the {summary.total} questions from the {lessonsRead.length} lessons she has read,
        from her daily warm-ups as well as her tests.
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
                <div key={it.questionId} className="rounded-petal border border-cream-300 bg-white px-3.5 py-2.5">
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
  );
}

// ---------------------------------------------------------------------------
// EVERY TEST — how much she sat each day, then every attempt, newest first.
// ---------------------------------------------------------------------------

function TestsTab({ attempts }) {
  const [openAttempt, setOpenAttempt] = useState(null);
  const load = testLoadByDay(attempts);
  return (
    <div className="space-y-4">
      {load.length > 0 && <TestLoad load={load} />}
      <section className="panel px-5 py-5">
        <h2 className="font-display text-lg text-ink-900">Every attempt, question by question</h2>
        {attempts.length === 0 ? (
          <p className="mt-2 text-sm text-ink-700">No tests sat yet.</p>
        ) : (
          <div className="mt-3 space-y-2">
            {[...attempts].reverse().map((a) => (
              <div key={a.attemptId} className={`rounded-petal border-2 ${BAND_STYLE[a.bandId] || 'border-cream-300 bg-white'}`}>
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

// ---------------------------------------------------------------------------
// LESSON CHECKS — the quick check at the end of each lesson.
// ---------------------------------------------------------------------------

function LessonChecksTab({ lessonReads }) {
  const any = Object.keys(lessonReads || {}).length > 0;
  return (
    <section className="panel px-5 py-5">
      <h2 className="font-display text-lg text-ink-900">Lesson checks</h2>
      <p className="mt-1 text-xs text-ink-700">
        Each lesson ends in a quick check. Miss more than one and she gets extra practice from that
        lesson before she finishes. It never blocks her. Each row shows her latest try.
      </p>
      {!any && <p className="mt-3 text-sm text-ink-700">No lessons read yet.</p>}
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
                      <tr key={l.id} className={`border-b border-cream-200 ${p && p.passed === false ? 'bg-gold-300/20' : ''}`}>
                        <td className="py-2.5 pr-3 font-700 text-ink-900">
                          {l.n}. {l.title}
                        </td>
                        <td className="tnum py-2.5 pr-3">
                          {p ? `${p.correct}/${p.asked}${p.passed === false ? ' · shaky' : ''}` : '—'}
                        </td>
                        <td className="tnum py-2.5 pr-3">{p?.extraServed ? `${p.extraCorrect}/${p.extraServed}` : '—'}</td>
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
      {any && (
        <p className="mt-3 text-[0.7rem] text-ink-500">
          A dash under Check means the lesson was finished without the check.
        </p>
      )}
    </section>
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
        The score is her latest attempt. Every re-take is counted in Attempts.
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
        Everything she sat, by day. A low score on a heavy day says as much about the day as about her.
      </p>

      {heavy.length > 0 && (
        <p className="mt-2 rounded-petal border border-gold-500/50 bg-gold-300/20 px-3.5 py-2.5 text-xs text-ink-900">
          <span className="font-700">
            {heavy.length} day{heavy.length === 1 ? '' : 's'} with three or more.
          </span>{' '}
          Worth knowing before reading the scores.
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
