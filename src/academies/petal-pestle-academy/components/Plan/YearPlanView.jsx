import { useAppStore } from '../../store/useAppStore.js';
import { MarigoldMessage } from '../Mentor/MarigoldMessage.jsx';
import { buildYearPlan } from '../../lib/yearPlan.js';
// v3.25 — every course the app teaches, not Herbalism plus a hard-coded blank.
import { courseById, lessonById } from '../../data/lessons/appCourses.js';
import { APP_COURSES, QUARTER, lessonsRequired } from '../../config/curriculumPlan.js';
import { allWeeks } from '../../config/assessment.js';

// ---------------------------------------------------------------------------
// THE WHOLE YEAR, IN FOUR QUARTERS.
//
// My Plan answers "what do I open today". This answers "and then what" — the
// shape of the year, so a grown-up can see where it is going instead of one
// unit at a time.
//
// ---- THE HONEST HALF OF THIS SCREEN ----
//
// Five of her nine strands do not get a year, and this screen says so in as
// many words. Their numbers are ceilings: the test never asked her anything
// easier than where it placed her, so it never found her floor.
//
// It would be trivial to fill those five in anyway. Nobody would notice, and it
// would look like a complete plan. It would also mean a year of work aimed at a
// level nobody measured — a small bug turned into thirty-six weeks of the wrong
// difficulty. A plan with a stated gap can be corrected in fifteen minutes. A
// plan that quietly guesses cannot be corrected at all, because nothing about
// it looks wrong.
// ---------------------------------------------------------------------------

const QUARTER_TINT = ['bg-blush-300/25', 'bg-lavender-300/25', 'bg-sage-300/25', 'bg-gold-300/25'];

function QuarterCard({ q }) {
  return (
    <div className={`rounded-petal px-4 py-3 ${QUARTER_TINT[q.quarter - 1]}`}>
      <p className="label-caps">Quarter {q.quarter}</p>
      <p className="mt-1 text-sm font-700 text-ink-900">{q.courseLabel}</p>
      {q.units ? (
        <ul className="mt-1.5 list-disc pl-4 text-xs leading-relaxed text-ink-700">
          {q.units.map((u) => (
            <li key={u}>{u}</li>
          ))}
        </ul>
      ) : (
        <p className="mt-1.5 text-xs leading-relaxed text-ink-700">{q.focus}</p>
      )}
      <a
        href={q.courseUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-2 inline-block rounded-full bg-white px-3.5 py-1 text-[0.7rem] font-700 text-lavender-700 hover:bg-lavender-300/40"
      >
        Open on Khan ↗
      </a>
      {!q.named && (
        <p className="mt-1.5 text-[0.65rem] text-ink-500">
          A skill focus, not a Khan unit name — their reading units are themed and change.
        </p>
      )}
    </div>
  );
}

export function YearPlanView({ onNavigate }) {
  const strands = useAppStore((s) => s.strands);
  // `blocked` is intentionally unused since v3.23 — see the note further down.
  // Kept destructured so the shape of buildYearPlan stays visible here.
  const { ready } = buildYearPlan(strands);
  const anyMeasured = Object.values(strands || {}).some((s) => s?.asked > 0);

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <header>
        <p className="label-caps">The whole year</p>
        <h1 className="mt-1 font-display text-3xl text-ink-900">Her Courses, Quarter by Quarter</h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-700">
          Four quarters per subject, starting from where she actually tested. Khan Academy teaches
          the five core subjects; the two courses this app teaches are at the bottom.
        </p>
      </header>

      {!anyMeasured && (
        <div className="mt-5">
          <MarigoldMessage
            text="Nothing is measured yet, so there is no year to lay out. The Check-In comes first — then this page fills itself in."
            tone="start"
          />
        </div>
      )}

      {/* ---- the strands with a real year ---- */}
      {ready.length > 0 && (
        <section className="mt-7">
          <h2 className="font-display text-xl text-ink-900">Planned</h2>
          <p className="mt-1 text-xs text-ink-700">
            These levels are trustworthy — the Check-In found her floor, so the year is built on a
            real number.
          </p>
          <div className="mt-4 space-y-5">
            {ready.map((r) => (
              <article key={r.strand.id} className="panel px-5 py-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-lg text-ink-900">
                    {r.strand.plant} {r.strand.label}
                  </h3>
                  <p className="tnum text-xs text-ink-500">
                    measured {r.state.level.toFixed(2)} · starts in {r.startedAt.courseLabel}
                  </p>
                </div>
                <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {r.quarters.map((q) => (
                    <QuarterCard key={q.quarter} q={q} />
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* ---- REMOVED v3.23 ----
        There used to be a "Not planned yet — on purpose" section here, listing
        Measurement & Data, Geometry, Patterns, Grammar and Writing with a
        "Needs re-measuring first" badge and no year behind them.

        Gigi: "Remove that from My Learning because she isn't going to complete
        the diagnostic test again."

        It is gone because it stopped being TRUE, not because she declined the
        re-take. Until v3.21 a year was built by walking forward from wherever
        her number sat, so a ceiling put her in the wrong place and refusing to
        plan protected her. Since v3.21 the number chooses only the COURSE and
        the course starts at Unit 1 — a Geometry ceiling of 2.00 and a true 1.4
        send her to exactly the same first unit. A ceiling can no longer misplace
        her, so the block was the only thing standing between her and a year.

        The FACT is not gone. `ceilingNote()` still returns it, My Levels and the
        Grown-Up Corner still say the number is an upper bound, and
        check-yearplan now fails the build if a ceiling is ever planned anywhere
        except the beginning of its course. What went was the block, not the
        honesty — and the guard was inverted, not deleted.

        Five red panels on the screen she opens to see her own year, telling her
        five of her nine subjects have nothing planned, for a re-take that is not
        going to happen. That is not a warning any more, it is just a wall.
      */}

      {/* ---- the courses this app teaches ----------------------------------
           EVERY NUMBER ON THIS SECTION IS COUNTED, NOT TYPED.

           Until v3.8 this was hand-written HTML: "52 lessons across the year",
           "4 unit tests + a quarter test", and Quarters 2 to 4 marked "outlined,
           lessons not written yet". By then the course was 96 lessons a year, the
           unit test had been replaced by the weekly test, and Quarters 1 and 2
           were fully built. Every one of those claims was false and the screen
           had no way to know.

           That is the same failure as the lessonsWritten drift that
           check-curriculum-volume caught, and it is the reason for the rule
           taken from Lamar's app: decisions and reasons are written by hand,
           anything countable is generated. So this section reads APP_COURSES,
           appCourses.js and WEEKS, and it cannot drift again.

           v3.25 — it read HERBALISM_MODULES and a literal empty array for every
           other course, so The Science Lab drew a bar saying "6 of 24" with no
           modules under it and no way to tell whether that was because none were
           written or because the screen could not see them. Both courses now
           come from the same place and a third would too.
           --------------------------------------------------------------- */}
      <section className="mt-8">
        <h2 className="font-display text-xl text-ink-900">Her own courses</h2>
        <p className="mt-1 text-xs text-ink-700">
          Khan does not teach these. This app does, and they do not wait on the Check-In. Every
          count below is read from the lessons themselves.
        </p>

        {APP_COURSES.map((course) => {
          const owed = lessonsRequired(course);
          // Counted from the lessons themselves wherever the app actually has
          // them; only a course with no data at all falls back to its claim.
          const taught = courseById(course.id);
          const written = taught ? taught.lessons.length : course.lessonsWritten;
          const weeks = allWeeks().filter((w) => w.course === course.id);
          const modules = taught ? taught.modules : [];

          return (
            <article key={course.id} className="panel mt-4 px-5 py-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-lg text-ink-900">
                  {taught ? `${taught.emoji} ` : ''}
                  {!taught && course.id === 'sciencelab' && '🔬 '}
                  {course.id === 'humanbody' && '🫀 '}
                  {course.id === 'social' && '🌍 '}
                  {course.title}
                  {course.kind === 'enrichment' && (
                    <span className="ml-2 rounded-full bg-cream-200 px-2 py-0.5 text-[0.6rem] font-700 uppercase tracking-wide text-ink-500">
                      Enrichment
                    </span>
                  )}
                </h3>
                <p className="tnum text-xs text-ink-500">
                  {written} of {owed} lessons · {Math.round((written / owed) * 100)}%
                </p>
              </div>

              <p className="mt-1 text-xs text-ink-700">{course.note}</p>

              {modules.length > 0 ? (
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {course.quarters.map((qn) => {
                    const modsThisQ = modules.filter((m) => m.quarter === qn);
                    const lessonsThisQ = modsThisQ.flatMap((m) => m.lessons);
                    const writtenThisQ = lessonsThisQ.filter((id) => lessonById(id)).length;
                    const built = writtenThisQ === QUARTER.lessonsPerQuarter;

                    return (
                      <div
                        key={qn}
                        className={`rounded-petal px-4 py-3 ${QUARTER_TINT[qn - 1]}`}
                      >
                        <div className="flex items-baseline justify-between gap-2">
                          <p className="label-caps">Quarter {qn}</p>
                          <p className="tnum text-[0.65rem] text-ink-500">
                            {writtenThisQ}/{QUARTER.lessonsPerQuarter}
                          </p>
                        </div>

                        {modsThisQ.length > 0 ? (
                          <ul className="mt-1.5 space-y-1 text-xs leading-relaxed text-ink-700">
                            {modsThisQ.map((m) => (
                              <li key={m.n}>
                                <span className="font-700 text-ink-900">
                                  {m.n}. {m.title}
                                </span>
                                <span className="text-ink-500">
                                  {' '}
                                  · weeks {m.weeks.join('–')}
                                </span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="mt-1.5 text-xs leading-relaxed text-ink-700">
                            Not laid out yet.
                          </p>
                        )}

                        <p
                          className={`mt-2 text-[0.7rem] font-700 ${
                            built ? 'text-sage-700' : 'text-ink-500'
                          }`}
                        >
                          {built
                            ? `✓ built · ${weeks.filter((w) => w.quarter === qn).length} weekly tests + an exam`
                            : 'Outlined — lessons not written yet'}
                        </p>

                        {built && (
                          <button
                            type="button"
                            onClick={() => onNavigate?.('lessons')}
                            className="mt-2 inline-block rounded-full bg-white px-3.5 py-1 text-[0.7rem] font-700 text-lavender-700 hover:bg-lavender-300/40"
                          >
                            Open the lessons →
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {course.quarters.map((qn) => (
                    <div key={qn} className={`rounded-petal px-4 py-3 ${QUARTER_TINT[qn - 1]}`}>
                      <p className="label-caps">Quarter {qn}</p>
                      <p className="mt-1.5 text-xs leading-relaxed text-ink-700">
                        {QUARTER.lessonsPerQuarter} lessons owed.
                      </p>
                      <p className="mt-2 text-[0.7rem] text-ink-500">
                        Outlined — lessons not written yet
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </article>
          );
        })}

        <p className="mt-3 text-xs text-ink-500">
          No dosing, ever. Structure, growing, ecosystems, history, and how to tell a real claim
          from a story.
        </p>
        <p className="mt-1.5 text-xs text-ink-500">
          Three lessons a week, then a review game and an eight-question test on day four. Eight
          teaching weeks, then a cumulative exam. Three questions each morning bring old lessons
          back on an expanding schedule — 1 day, 3, 7, 16, 35, 70 — which is what makes September
          still be there in May.
        </p>
      </section>

      <div className="mt-7 flex flex-wrap justify-center gap-2">
        <button
          type="button"
          onClick={() => onNavigate?.('plan')}
          className="rounded-full border border-cream-300 bg-white px-4 py-2 text-sm font-700 text-ink-700 hover:border-lavender-500"
        >
          🗺️ What do I open today?
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
