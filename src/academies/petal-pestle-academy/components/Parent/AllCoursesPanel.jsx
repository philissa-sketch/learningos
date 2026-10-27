import { useAppStore } from '../../store/useAppStore.js';
import { buildCourseCatalog, KHAN_STATUS } from '../../lib/courseCatalog.js';

/**
 * EVERY COURSE, REACHED OR NOT. (Oct 27 2026.)
 *
 * Gigi: "In the parent area I want to be able to see all of her courses to make
 * sure they are there." Nothing here is locked, and nothing here is graded -
 * grades are entered on the Khan grades tab. This is the checklist.
 */
const CHIP = {
  finished: 'border-sage-700 bg-sage-300/30 text-ink-900',
  inProgress: 'border-gold-500 bg-gold-300/25 text-ink-900',
  nextUp: 'border-lavender-500 bg-lavender-500/10 text-ink-900',
  ahead: 'border-cream-300 bg-white text-ink-500'
};

export function AllCoursesPanel() {
  const khanGrades = useAppStore((s) => s.khanGrades);
  const lessonReads = useAppStore((s) => s.lessonReads);
  const { app, khan } = buildCourseCatalog({ khanGrades, lessonReads });
  const groups = [
    ['math', 'Mathematics (Khan Academy)'],
    ['writing', 'Language Arts & Grammar (Khan Academy)'],
    ['reading', 'Reading (Khan Academy, optional watching)']
  ];

  return (
    <div className="space-y-4">
      <section className="panel px-5 py-5">
        <h2 className="font-display text-lg text-ink-900">All her courses</h2>
        <p className="mt-1 text-xs text-ink-700">
          Every course in the app, including the ones she has not reached yet. Nothing here is locked. Khan
          grades are entered on the Khan grades tab.
        </p>
      </section>

      <section className="panel px-5 py-5">
        <h3 className="font-display text-base text-ink-900">Taught in the app</h3>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-left text-xs text-ink-700">
            <thead>
              <tr className="border-b border-cream-300 text-ink-900">
                <th className="py-1.5 pr-3 font-700">Course</th>
                <th className="py-1.5 pr-3 font-700">Quarters</th>
                <th className="py-1.5 pr-3 font-700">Modules</th>
                <th className="py-1.5 pr-3 font-700">Lessons / pieces</th>
                <th className="py-1.5 font-700">Read so far</th>
              </tr>
            </thead>
            <tbody>
              {app.map((c) => (
                <tr key={c.id} className="border-b border-cream-300/60">
                  <td className="py-1.5 pr-3 font-700 text-ink-900">{c.emoji} {c.label}</td>
                  <td className="py-1.5 pr-3 tnum">{(c.quarters || []).map((q) => `Q${q}`).join(' ')}</td>
                  <td className="py-1.5 pr-3 tnum">{c.modules}</td>
                  <td className="py-1.5 pr-3 tnum">{c.lessons}</td>
                  <td className="py-1.5 tnum">{c.lessonsRead == null ? 'see Gradebook' : `${c.lessonsRead} of ${c.lessons}`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {groups.map(([subject, title]) => {
        const rows = khan.filter((c) => c.subject === subject);
        if (!rows.length) return null;
        return (
          <section key={subject} className="panel px-5 py-5">
            <h3 className="font-display text-base text-ink-900">{title}</h3>
            <div className="mt-3 space-y-3">
              {rows.map((c) => (
                <details key={c.courseId} className="rounded-2xl border border-cream-300 bg-white px-4 py-3">
                  <summary className="flex cursor-pointer flex-wrap items-baseline justify-between gap-2">
                    <span className="font-700 text-ink-900">{c.label}</span>
                    <span className="flex items-center gap-2 text-xs text-ink-700">
                      <span className={`rounded-full border px-2 py-0.5 font-700 ${CHIP[c.status]}`}>
                        {KHAN_STATUS[c.status]}
                      </span>
                      <span className="tnum">
                        {c.graded === 'khan' ? `${c.unitsGraded} of ${c.unitCount} units graded` : `${c.unitCount} units · not graded`}
                      </span>
                    </span>
                  </summary>
                  <ul className="mt-2 space-y-1 text-xs text-ink-700">
                    {c.units.map((u) => (
                      <li key={u.n} className="flex flex-wrap items-baseline gap-x-3">
                        <span className="w-4 text-right text-ink-500">{u.graded ? '✓' : ''}</span>
                        <span className="text-ink-500">Unit {u.n}</span>
                        <span className="text-ink-900">{u.name}</span>
                        {u.url && <a className="underline" href={u.url} target="_blank" rel="noreferrer">open the unit ↗</a>}
                        {u.testUrl && <a className="underline" href={u.testUrl} target="_blank" rel="noreferrer">unit test ↗</a>}
                      </li>
                    ))}
                    {c.hasChallenge && (
                      <li className="flex flex-wrap items-baseline gap-x-3 pt-1">
                        <span className="w-4 text-right text-ink-500">{c.challenge ? '✓' : ''}</span>
                        <span className="font-700 text-ink-900">Course Challenge</span>
                        {c.challenge && <span className="tnum">{c.challenge.grade} · {c.challenge.percent}% · {c.challenge.at}</span>}
                        {c.challengeUrl && <a className="underline" href={c.challengeUrl} target="_blank" rel="noreferrer">open the Course Challenge ↗</a>}
                      </li>
                    )}
                  </ul>
                  {c.thenCourse && c.graded === 'khan' && (
                    <p className="mt-2 text-[0.7rem] text-ink-500">After this course (and its Course Challenge), the next course opens: {khan.find((x) => x.courseId === c.thenCourse)?.label}.</p>
                  )}
                </details>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
