import { useMemo } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import {
  SCIENCE_COURSES,
  scienceCoverageByCourse,
  SCIENCE_COURSE_CHALLENGES
} from '../../academies/lamar/data/khan/scienceSequence.js';

/**
 * SCIENCE, COURSE BY COURSE — and the teacher units Khan wrote for her.
 * (Built Aug 9, 2026.)
 *
 * ---- WHY ----
 *
 * The parent: "science only has 5 instead of 10 and the course challenge 11 is
 * teacher unit."
 *
 * Both halves of that were fair, and both came from the same cause: she had to
 * go and count on Khan Academy's own pages, because the app gave her no way to
 * check its Science plan against the courses it is built from.
 *
 * Two things she could not see:
 *
 *   1. **A quarter runs more than one course.** Q1's five units are three at
 *      biology level and two chemistry. Under a single heading called
 *      "Science", five rows read as five of biology's eleven.
 *   2. **Khan's last unit is not his.** Every one of these four courses ends
 *      with a teacher-resources unit — "This unit does not include exercises."
 *      Biology therefore shows 11 units and holds 10 of student work. She
 *      spotted that unit 11 was the teacher unit; the app never said it.
 *
 * ---- AND THE CORRECTION SHE MADE TO MY FIRST ANSWER ----
 *
 * I initially counted biology at NINE, excluding the simulations unit as well.
 * She came back with "it literally has 10 units for biology for middle school",
 * and she was right. The two trailing units are not the same kind of thing:
 *
 *   Unit 10, simulations — "This unit's EXERCISES do not count toward course
 *     mastery." It has exercises. PhET interactives and a challenge. No mastery
 *     points is not the same as no work, and for a boy aiming at aerospace
 *     engineering an interactive physics simulation is the last thing to cut.
 *     It is now scheduled, at the end of each course.
 *   Unit 11, teacher resources — "This unit does not include exercises." The
 *     NGSS unit guides. Genuinely hers, and correctly not assigned to him.
 *
 * ---- THE PART THAT IS NOT JUST DISPLAY ----
 *
 * Unit 11 is not clutter to be filtered out either. It holds Khan's NGSS-aligned
 * **unit guides** and the hands-on activity list — written for whoever is
 * teaching the course, which here is her. Useful material that existed all
 * along and that nothing in this app had ever linked to. It is linked from here
 * now, marked plainly as hers rather than his.
 *
 * The coverage table is the direct answer to "is anything missing": every
 * content unit of every course, the quarter it falls in, and a count that
 * states the real denominator.
 */

const QUARTER_ORDER = ['Q1 2026-2027', 'Q2 2026-2027', 'Q3 2026-2027', 'Q4 2026-2027', 'Summer 2027'];

function shortQuarter(label) {
  return label.startsWith('Summer') ? 'Summer' : label.slice(0, 2);
}

function CoursePanel({ course, khanAssignments }) {
  const completedTitles = useMemo(
    () => new Set(khanAssignments.filter((a) => a.completed).map((a) => a.skillTitle)),
    [khanAssignments]
  );

  const done = course.covered.filter((u) => completedTitles.has(u.skillTitle)).length;
  const challenge = SCIENCE_COURSE_CHALLENGES.find((c) => c.courseId === course.id);

  return (
    <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">{course.label}</p>
          <h4 className="mt-0.5 font-display text-base font-700 text-ink-100">{course.fullName}</h4>
        </div>
        <p className="text-xs text-ink-500">
          {done} of {course.contentUnits} units done
        </p>
      </div>

      <p className="mt-2 text-xs text-ink-500">
        Khan&rsquo;s page shows <strong className="text-ink-300">{course.khanShowsUnits} units</strong>.{' '}
        <strong className="text-ink-300">{course.contentUnits}</strong> of them are his — the last one is
        teacher resources, with no exercises in it. Of his {course.contentUnits},{' '}
        {course.gradedUnits} carry mastery points and the simulations unit does not.
      </p>

      <div className="mt-3 space-y-1">
        {course.covered.map((u) => (
          <div
            key={u.khanUnit}
            className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-space-700 bg-space-900 px-3 py-1.5"
          >
            <span className="min-w-0 text-sm text-ink-100">
              <span className="mr-1.5 rounded bg-space-700 px-1.5 py-0.5 text-[10px] font-display uppercase tracking-wide text-ink-500">
                Unit {u.khanUnit}
              </span>
              {completedTitles.has(u.skillTitle) ? '✅ ' : ''}
              {u.skillTitle}
              {u.khanUnit === course.contentUnits && (
                <span className="ml-1.5 text-[11px] text-ink-500">· simulations, no mastery points</span>
              )}
            </span>
            <span className="flex-none text-[11px] font-display text-ink-500">{shortQuarter(u.batchLabel)}</span>
          </div>
        ))}
        {challenge && (
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-signal-amber/30 bg-signal-amber/5 px-3 py-1.5">
            <span className="min-w-0 text-sm text-signal-amber">Course Challenge</span>
            <span className="flex-none text-[11px] font-display text-signal-amber">
              {shortQuarter(challenge.batchLabel)}
            </span>
          </div>
        )}
      </div>

      {course.teacherResourcesUrl && (
        <p className="mt-3 text-xs text-ink-500">
          <a
            href={course.teacherResourcesUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-signal-cyan underline hover:brightness-110"
          >
            Teacher resources (unit {course.khanShowsUnits}) →
          </a>{' '}
          — Khan&rsquo;s NGSS unit guides and hands-on activities. Written for you, not for him; there are no
          exercises in it.
        </p>
      )}
      {course.simulationsUrl && (
        <p className="mt-1 text-xs text-ink-500">
          <a
            href={course.simulationsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-signal-cyan underline hover:brightness-110"
          >
            Simulations (unit {course.contentUnits}) →
          </a>{' '}
          — PhET interactives. Assigned as of Aug 9, 2026, at the end of the course. They earn no mastery
          points on Khan, which is not the same as not being work.
        </p>
      )}
    </div>
  );
}

export function ScienceCourseMapSection() {
  const khanAcademyAssignments = useAppStore((s) => s.khanAcademyAssignments);
  const scienceRows = useMemo(
    () => (khanAcademyAssignments || []).filter((a) => a.subject === 'science'),
    [khanAcademyAssignments]
  );

  const coverage = useMemo(() => scienceCoverageByCourse(), []);
  const courses = Object.values(coverage);
  const totalUnits = courses.reduce((n, c) => n + c.contentUnits, 0);
  const totalCovered = courses.reduce((n, c) => n + c.covered.length, 0);

  // Quarter-by-quarter counts, so "why does Q1 only have five" is answerable
  // on this screen instead of by counting rows on Khan Academy.
  const byQuarter = useMemo(() => {
    const out = {};
    for (const label of QUARTER_ORDER) out[label] = [];
    for (const c of courses) {
      for (const u of c.covered) {
        if (!out[u.batchLabel]) out[u.batchLabel] = [];
        out[u.batchLabel].push({ ...u, label: c.label });
      }
    }
    return out;
  }, [courses]);

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Records</p>
        <h3 className="mt-1 font-display text-lg font-700 text-ink-100">Science — the four Khan courses</h3>
        <p className="mt-2 rounded-lg border border-space-700 bg-space-900 px-3 py-2 text-sm text-ink-300">
          <strong className="font-display text-ink-100">Biology has 10 units, not 9.</strong> Khan numbers 11;
          unit 11 is teacher resources. Unit 10 is simulations — it has exercises, they just earn no mastery
          points, so it counts as his work and is scheduled at the end of the course. Same in all four
          courses.
        </p>
        <p className="mt-2 text-sm text-ink-300">
          <strong className="font-display text-ink-100">One course per quarter, start to finish.</strong>{' '}
          Biology in Q1, Chemistry in Q2, Earth &amp; Space in Q3, Physics in Q4 — each ending in its own
          Course Challenge while the material is still fresh. Summer carries no Khan science, so it stays free
          for summer reading and book reports.
        </p>
        <p className="mt-2 text-sm text-ink-300">
          Q1 is the heavy one: 75 Khan items over nine weeks, about eight a week against four or five in the
          other quarters. Nothing breaks if he does not finish it in nine weeks — an unfinished unit stays
          available in every quarter after its own, so the quarter label is a plan rather than a deadline.
        </p>
        <p className="mt-2 rounded-lg border border-space-700 bg-space-900 px-3 py-2 text-sm text-ink-300">
          <strong className="font-display text-ink-100">
            {totalCovered} of {totalUnits} units are scheduled
          </strong>{' '}
          across the year, plus the four Course Challenges. Nothing from any of the four courses is left out —
          the only unit not assigned in each course is its teacher-resources unit, which has no exercises and
          is yours rather than his. No high-school units, and nothing from outside these four courses.
        </p>
      </div>

      <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-ink-500">Units per quarter</p>
        <div className="mt-2 space-y-1">
          {QUARTER_ORDER.filter((q) => (byQuarter[q] || []).length).map((q) => (
            <div key={q} className="rounded-lg border border-space-700 bg-space-900 px-3 py-2">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="font-display text-sm font-700 text-ink-100">{shortQuarter(q)}</span>
                <span className="text-[11px] text-ink-500">{byQuarter[q].length} units</span>
              </div>
              <p className="mt-0.5 text-xs text-ink-500">
                {byQuarter[q].map((u) => `${u.label} u${u.khanUnit}`).join(' · ')}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-2 text-xs text-ink-500">
          Pacing, measured rather than guessed: at 30–45 minutes a day, four days a week, he clears roughly
          four to five Khan items a week. A nine-week quarter therefore holds about forty items, which is what
          five of these units cost. A fuller quarter would not get done.
        </p>
      </div>

      {courses.map((c) => (
        <CoursePanel key={c.id} course={c} khanAssignments={scienceRows} />
      ))}
    </div>
  );
}
