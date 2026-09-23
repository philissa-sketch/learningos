import { useState } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import { MarigoldMessage } from '../Mentor/MarigoldMessage.jsx';

// ---------------------------------------------------------------------------
// FRIDAY.
//
// Gigi: "if she didnt finish everything she will have to make it up friday."
//
// Three lessons Monday to Wednesday, a test on Thursday, and this. No new
// lesson, no new test, no score. Just what is still open, in the order she met
// it, and the projects that have come due.
//
// ---- THE THINGS THIS SCREEN MUST NOT DO ----
//
// * It must not count how late she is. "3 weeks overdue" is a number that makes
//   a ten-year-old close the laptop.
// * It must not block anything. Nothing here gates anything else, the same as
//   the practice gate.
// * It must not be empty and silent. If she is caught up it says so out loud,
//   because the whole point of a catch-up day is that finishing it means
//   something. A blank screen reads like a bug.
// * It must not nag about work she was never going to have done. "Behind" is
//   measured against HER furthest week, not against a calendar — see
//   lib/catchUp.js for why.
// ---------------------------------------------------------------------------

export function CatchUpView({ onNavigate }) {
  // Subscribe to the raw state and derive, for the same reason LessonsView does:
  // a selector that builds a fresh object re-renders on every unrelated change.
  const lessonReads = useAppStore((s) => s.lessonReads);
  const attempts = useAppStore((s) => s.attempts);
  const projectStatus = useAppStore((s) => s.projectStatus);
  const setProjectDone = useAppStore((s) => s.setProjectDone);

  const work = useAppStore.getState().catchUp();
  const [openProject, setOpenProject] = useState(null);

  // ---- she has not started the year ----
  if (!work.started) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-8">
        <header>
          <p className="label-caps">Friday · catch-up day</p>
          <h1 className="mt-1 font-display text-3xl text-ink-900">Nothing to catch up on</h1>
        </header>
        <div className="mt-5">
          <MarigoldMessage
            text="You have not started a lesson yet, so there is nothing behind you. Open My Lessons and begin at Module 1 — Friday will fill itself in when it needs to."
            tone="start"
          />
        </div>
        <button
          type="button"
          onClick={() => onNavigate?.('lessons')}
          className="mt-5 rounded-full bg-sage-500 px-6 py-2.5 font-700 text-white hover:bg-sage-700"
        >
          🌱 Go to My Lessons
        </button>
      </main>
    );
  }

  // ---- she is caught up ----
  if (work.total === 0) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-8">
        <header>
          <p className="label-caps">Friday · catch-up day</p>
          <h1 className="mt-1 font-display text-3xl text-ink-900">You are all caught up</h1>
          <p className="mt-2 text-sm text-ink-700">
            Every lesson read, every test sat, every project finished, right up to Quarter{' '}
            {work.marker.quarter} Week {work.marker.week}.
          </p>
        </header>
        <div className="mt-5">
          <MarigoldMessage
            text="Nothing is waiting for you. That is not luck — you did the work on the days it was set. Today is yours: go and look at your garden, or read ahead if you want to."
            tone="win"
          />
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onNavigate?.('journal')}
            className="rounded-full border border-cream-300 bg-white px-4 py-2 text-sm font-700 text-ink-700 hover:border-sage-500"
          >
            📓 Plant Detective Log
          </button>
          <button
            type="button"
            onClick={() => onNavigate?.('lessons')}
            className="rounded-full border border-cream-300 bg-white px-4 py-2 text-sm font-700 text-ink-700 hover:border-sage-500"
          >
            🌱 Read ahead
          </button>
        </div>
      </main>
    );
  }

  // ---- there is work open ----
  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <header>
        <p className="label-caps">Friday · catch-up day</p>
        <h1 className="mt-1 font-display text-3xl text-ink-900">Finish the week</h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-700">
          No new lessons today. This is everything still open, in the order you met it. Do what you
          can — nothing here is scored and nothing is locked.
        </p>
      </header>

      {/* ---- lessons ---- */}
      {work.lessons.length > 0 && (
        <section className="panel mt-6 px-5 py-5">
          <h2 className="font-display text-xl text-ink-900">
            🌱 Lessons to finish{' '}
            <span className="text-sm font-400 text-ink-500">({work.lessons.length})</span>
          </h2>
          <div className="mt-3 space-y-2">
            {work.lessons.map((l) => (
              <button
                key={l.lessonId}
                type="button"
                onClick={() => onNavigate?.('lessons')}
                className="flex w-full items-center gap-3 rounded-petal border border-cream-300 bg-white px-4 py-3 text-left hover:border-sage-500"
              >
                <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-cream-200 text-xs font-700 text-ink-700">
                  {l.module ?? '·'}
                </span>
                <span className="flex-1">
                  <span className="block text-sm font-700 text-ink-900">{l.title}</span>
                  <span className="block text-[0.7rem] text-ink-500">
                    Quarter {l.quarter} · Week {l.week} · {l.weekTitle}
                  </span>
                </span>
                <span className="text-xs text-ink-500">→</span>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* ---- tests ---- */}
      {work.tests.length > 0 && (
        <section className="mt-6 rounded-petal border-2 border-dashed border-lavender-300 bg-lavender-300/10 px-5 py-5">
          <h2 className="font-display text-xl text-ink-900">
            📝 Tests still to sit{' '}
            <span className="text-sm font-400 text-ink-500">({work.tests.length})</span>
          </h2>
          <p className="mt-1 text-xs text-ink-700">
            You have read all the lessons for these weeks, so the test is ready when you are.
          </p>
          <div className="mt-3 space-y-2">
            {work.tests.map((t) => (
              <button
                key={t.testId}
                type="button"
                onClick={() => onNavigate?.('lessons')}
                className="flex w-full items-center justify-between gap-3 rounded-petal border border-cream-300 bg-white px-4 py-3 text-left hover:border-lavender-500"
              >
                <span>
                  <span className="block text-sm font-700 text-ink-900">
                    Quarter {t.quarter} · Week {t.week} test
                  </span>
                  <span className="block text-[0.7rem] text-ink-500">
                    {t.weekTitle} · 8 questions · about 12 minutes
                  </span>
                </span>
                <span className="text-xs text-ink-500">→</span>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* ---- projects ---- */}
      {work.projects.length > 0 && (
        <section className="mt-6 rounded-petal border-2 border-gold-500/50 bg-gold-300/15 px-5 py-5">
          <h2 className="font-display text-xl text-ink-900">
            🛠️ Projects due{' '}
            <span className="text-sm font-400 text-ink-500">({work.projects.length})</span>
          </h2>
          <p className="mt-1 text-xs text-ink-700">
            A project is two weeks of work. Petals for finishing it — never for how it turned out.
          </p>

          <div className="mt-3 space-y-3">
            {work.projects.map((p) => {
              const open = openProject === p.id;
              return (
                <article key={p.id} className="rounded-petal border border-cream-300 bg-white px-4 py-3.5">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-display text-base text-ink-900">{p.title}</h3>
                    <p className="text-[0.7rem] text-ink-500">
                      Module {p.module} · due Quarter {p.quarter} Week {p.dueWeek}
                    </p>
                  </div>
                  <p className="mt-1 text-sm text-ink-700">{p.what}</p>
                  <p className="mt-1 text-[0.7rem] text-ink-500">{p.runs}</p>

                  <button
                    type="button"
                    onClick={() => setOpenProject(open ? null : p.id)}
                    className="mt-2 text-xs font-700 text-lavender-700 hover:underline"
                  >
                    {open ? 'Hide the steps' : 'Show me what to do'}
                  </button>

                  {open && (
                    <div className="mt-3 space-y-3 border-t border-cream-200 pt-3">
                      <div>
                        <p className="label-caps text-ink-500">What you need</p>
                        <ul className="mt-1 list-disc pl-5 text-xs text-ink-700">
                          {p.needs.map((n) => (
                            <li key={n}>{n}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="label-caps text-ink-500">Steps</p>
                        <ol className="mt-1 list-decimal space-y-1 pl-5 text-xs text-ink-700">
                          {p.steps.map((st) => (
                            <li key={st}>{st}</li>
                          ))}
                        </ol>
                      </div>
                      <div className="rounded-xl bg-sage-300/20 px-3.5 py-2.5">
                        <p className="label-caps text-ink-500">Finished looks like</p>
                        <p className="mt-0.5 text-xs text-ink-900">{p.done}</p>
                      </div>
                      {p.note && <p className="text-[0.7rem] text-ink-500">{p.note}</p>}
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => setProjectDone(p.id, true)}
                    className="mt-3 rounded-full bg-gold-500 px-5 py-2 text-sm font-700 text-ink-900 hover:bg-gold-700"
                  >
                    ✓ I finished this
                  </button>
                </article>
              );
            })}
          </div>
        </section>
      )}

      <p className="mt-6 text-center text-xs text-ink-500">
        Up to date as far as Quarter {work.marker.quarter}, Week {work.marker.week}. Nothing after
        that counts as behind.
      </p>

      <div className="mt-5 flex flex-wrap justify-center gap-2">
        <button
          type="button"
          onClick={() => onNavigate?.('today')}
          className="rounded-full border border-cream-300 bg-white px-4 py-2 text-sm font-700 text-ink-700 hover:border-gold-500"
        >
          🔔 Today’s schedule
        </button>
        <button
          type="button"
          onClick={() => onNavigate?.('lessons')}
          className="rounded-full border border-cream-300 bg-white px-4 py-2 text-sm font-700 text-ink-700 hover:border-sage-500"
        >
          🌱 My Lessons
        </button>
      </div>
    </main>
  );
}

export default CatchUpView;
