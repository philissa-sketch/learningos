import { useAppStore } from '../../store/useAppStore.js';
import { EXTERNAL_GAMES_LIBRARY } from '../../academies/lamar/data/games/externalGamesLibrary.js';
import { QUIZ_PLATFORMS } from '../../academies/lamar/data/games/quizPlatforms.js';

const SUBJECT_LABELS = {
  math: 'Math',
  science: 'Science',
  socialStudies: 'Social Studies'
};

// Same real mastery gates LessonRoster.jsx used to enforce inline — moved
// here so both signature games live in one dedicated Games tab instead of
// being scattered across the Lesson Roster and the Mission Control
// dashboard (parent feedback, Aug 2026: the dashboard felt cluttered).
const NATION_COMMAND_EXAM_ID = 'exam-socialStudies-q2-2026-2027';
const LAUNCH_DIRECTOR_EXAM_ID = 'exam-aerospace-q3-2026-2027';

/**
 * The single home for everything game-related: the free external games
 * library (Math/Science/Social Studies — Khan Academy has no games of its
 * own) plus Mission Control's two signature simulation games, each still
 * gated behind the same real content mastery it always required. Nothing
 * here is new functionality, just consolidated into its own top-level tab
 * instead of living inline on the Mission Control dashboard and the Lesson
 * Roster, which had gotten visually cluttered.
 */
export function GamesHome({ onOpenNationCommand, onOpenLaunchDirector }) {
  const lessonProgress = useAppStore((s) => s.lessonProgress);
  // The links she pasted. Empty on a machine she has not set them on yet.
  const quizLinks = useAppStore((s) => s.quizLinks);

  const nationCommandUnlocked = Boolean(lessonProgress[NATION_COMMAND_EXAM_ID]?.mastered);
  const launchDirectorUnlocked = Boolean(lessonProgress[LAUNCH_DIRECTOR_EXAM_ID]?.mastered);

  const bySubject = {};
  for (const game of EXTERNAL_GAMES_LIBRARY) {
    bySubject[game.subject] ??= [];
    bySubject[game.subject].push(game);
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-6 sm:px-6">
      <p className="text-xs font-display uppercase tracking-widest text-ink-500">Games</p>

      <div className="space-y-3">
        <h3 className="font-display text-sm font-700 uppercase tracking-wide text-signal-amber">
          Signature Missions
        </h3>

        <GameCard
          emoji="🌍"
          title="Nation Command: Build Your World"
          description="Culminating strategy game — build a nation using real Q2 government, economics, and budgeting content. Not graded, replayable any time."
          unlocked={nationCommandUnlocked}
          lockedMessage="Unlocks after the Q2 Social Studies Quarterly Exam is mastered."
          onOpen={onOpenNationCommand}
        />

        <GameCard
          emoji="🚀"
          title="Launch Director"
          description="Culminating strategy game — plan a real mission using real staging, propellant, trajectory, and weight-budget content. Not graded, replayable any time."
          unlocked={launchDirectorUnlocked}
          lockedMessage="Unlocks after the Q3 Aerospace Quarterly Exam is mastered."
          onOpen={onOpenLaunchDirector}
        />
      </div>

      {/**
        * BLOOKET, KAHOOT AND GIMKIT. (Aug 20, 2026 — the parent asked for all
        * three by name.)
        *
        * They sit ABOVE the free library because they are the ones with real
        * questions Mom chose behind them, and below the signature missions
        * because those are earned.
        *
        * A card with no link is not hidden and is not a dead link. It names the
        * platform and says to ask her — because the failure this project keeps
        * having is work he is told about but cannot reach, and a button that
        * lands on "enter your game code" is exactly that.
        */}
      <div className="space-y-3">
        <h3 className="font-display text-sm font-700 uppercase tracking-wide text-signal-green">
          Quiz Games — Mom sets these up
        </h3>
        <p className="text-sm text-ink-300">
          Mom picks the questions, then puts the link here. If a card says to ask her, the game for
          that one is not set yet.
        </p>
        <div className="space-y-2">
          {QUIZ_PLATFORMS.map((platform) => {
            const link = (quizLinks || {})[platform.id];
            if (!link) {
              return (
                <div
                  key={platform.id}
                  className="rounded-lg border border-space-700 bg-space-900 p-3 opacity-80"
                >
                  <p className="font-display text-sm font-700 text-ink-300">
                    {platform.emoji} {platform.label}
                  </p>
                  <p className="mt-1 text-xs text-ink-500">{platform.blurb}</p>
                  <p className="mt-2 text-xs text-signal-amber">
                    No game set — ask Mom for this week&apos;s {platform.label} link.
                  </p>
                </div>
              );
            }
            return (
              <a
                key={platform.id}
                href={link}
                target="_blank"
                rel="noreferrer"
                className="block rounded-lg border border-signal-green/40 bg-signal-green/5 p-3 transition hover:border-signal-green/70"
              >
                <p className="font-display text-sm font-700 text-signal-green">
                  {platform.emoji} {platform.label} ↗
                </p>
                <p className="mt-1 text-xs text-ink-500">{platform.blurb}</p>
              </a>
            );
          })}
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="font-display text-sm font-700 uppercase tracking-wide text-signal-cyan">
          Practice Games (Free, External)
        </h3>
        <p className="text-sm text-ink-300">
          Khan Academy doesn't have games built in — these are real, free game sites that match what you're
          actually learning. They open in a new tab. Deliberately not shown for Gardening, Guitar, or PE &amp;
          Nutrition — those get real everyday practice instead of a game layer.
        </p>
        <div className="space-y-4">
          {Object.entries(bySubject).map(([subject, games]) => (
            <div key={subject}>
              <p className="font-display text-xs font-700 uppercase tracking-wide text-signal-cyan">
                {SUBJECT_LABELS[subject] || subject}
              </p>
              <div className="mt-2 space-y-2">
                {games.map((game) => (
                  <a
                    key={game.url}
                    href={game.url}
                    target="_blank"
                    rel="noreferrer"
                    className="block rounded-lg border border-space-700 bg-space-900 p-3 transition hover:border-signal-cyan/50"
                  >
                    <p className="font-display text-sm font-700 text-ink-100">{game.label} ↗</p>
                    <p className="mt-1 text-xs text-ink-500">{game.description}</p>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function GameCard({ emoji, title, description, unlocked, lockedMessage, onOpen }) {
  if (!unlocked) {
    return (
      <div className="rounded-xl border border-space-700 bg-space-800 p-4 opacity-70 shadow-panel">
        <p className="font-display text-sm font-700 text-ink-300">
          {emoji} {title}
        </p>
        <p className="mt-1 text-xs text-ink-500">{description}</p>
        <p className="mt-2 text-xs text-signal-amber">Locked — {lockedMessage}</p>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onOpen}
      className="flex w-full items-center justify-between rounded-xl border border-signal-amber/40 bg-signal-amber/5 p-4 text-left shadow-panel transition hover:border-signal-amber/70"
    >
      <div>
        <p className="font-display text-sm font-700 text-signal-amber">
          {emoji} {title}
        </p>
        <p className="mt-1 text-xs text-ink-500">{description}</p>
      </div>
      <span className="text-signal-amber" aria-hidden="true">
        →
      </span>
    </button>
  );
}
