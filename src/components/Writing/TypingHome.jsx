
export function TypingHome({ onChooseLessons, onChooseSpeedTest, onExit }) {
  return (
    <div className="mx-auto max-w-2xl space-y-4 px-4 py-6 sm:px-6">
      <div className="flex items-center justify-between">
        <button type="button" onClick={onExit} className="text-sm text-ink-500 hover:text-ink-100">
          ← Exit
        </button>
        <span className="text-sm text-ink-500">Typing</span>
      </div>

      {/* EDCLUB IS FIRST because it is what the 11:15 block on the schedule is
          for. The two cards below it are the same content they always were,
          demoted to what they actually are now: the backup. */}
      <a
        href={EDCLUB_PORTAL_URL}
        target="_blank"
        rel="noreferrer"
        className="block w-full rounded-xl border border-signal-cyan/50 bg-space-800 p-6 text-left shadow-panel transition hover:border-signal-cyan"
      >
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">
          Daily · 11:15 – 11:30
        </p>
        <h2 className="mt-2 font-display text-xl font-700 text-ink-100">
          EdClub — Today&rsquo;s 15 Minutes ↗
        </h2>
        <p className="mt-2 text-sm text-ink-300">
          Your typing course. Opens in a new tab and will ask you to sign in — that is normal,
          not a broken link. Fifteen minutes, every school day, then stop when lunch starts.
        </p>
      </a>

      <p className="px-1 text-xs text-ink-500">
        Below is the practice built into Mission Control — use it when EdClub is down or you are
        offline. Only this version feeds your XP and mastery record.
      </p>

      {/* THE LESSON, WHERE THE PRACTICE HAPPENS. Typing II teaches posture and
          accuracy-before-speed; before Aug 9 2026 that teaching lived only in a
          quiz he took once. A habit is not built by being told about it in
          August — it is built by being reminded of it at 11:15. */}
      <div className="rounded-xl border border-space-700 bg-space-900 p-4">
        <p className="text-xs font-display uppercase tracking-widest text-signal-amber">
          Before you start — from Typing II
        </p>
        <ul className="mt-2 space-y-1.5">
          {ERGONOMICS_CHECKLIST.map((item) => (
            <li key={item.id} className="flex gap-2 text-sm text-ink-300">
              <span aria-hidden="true" className="flex-none text-signal-amber">·</span>
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        onClick={onChooseLessons}
        className="block w-full rounded-xl border border-space-700 bg-space-800 p-6 text-left shadow-panel transition hover:border-signal-cyan"
      >
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Start Here</p>
        <h2 className="mt-2 font-display text-xl font-700 text-ink-100">Learn to Type</h2>
        <p className="mt-2 text-sm text-ink-300">
          A step-by-step progression teaching finger placement and key positions — home row, top row, bottom row,
          numbers, and punctuation — building up to full sentences.
        </p>
      </button>

      <button
        type="button"
        onClick={onChooseSpeedTest}
        className="block w-full rounded-xl border border-space-700 bg-space-800 p-6 text-left shadow-panel transition hover:border-signal-cyan"
      >
        <p className="text-xs font-display uppercase tracking-widest text-signal-amber">Once You Know the Keys</p>
        <h2 className="mt-2 font-display text-xl font-700 text-ink-100">Speed Test</h2>
        <p className="mt-2 text-sm text-ink-300">
          Type full passages against the clock to measure words per minute and accuracy, and track your personal
          best over time.
        </p>
      </button>
    </div>
  );
}
import { academyContent } from '../../content/academyContent.js';

const { EDCLUB_PORTAL_URL, ERGONOMICS_CHECKLIST = [] } = academyContent().writing;
