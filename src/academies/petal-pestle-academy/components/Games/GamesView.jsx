import { useAppStore } from '../../store/useAppStore.js';
import { GAME_LINKS } from '../../data/games/gameLinks.js';
import { DEFAULT_SCHEDULE } from '../../config/schedule.js';
import { dayKeyOf } from '../../lib/reviewQueue.js';
import { strandLabel } from '../../config/strands.js';

// ---------------------------------------------------------------------------
// SOMETHING TO DO INSTEAD OF WALKING AWAY.
//
// Gigi, Aug 19 2026: "I want there to be a tab where there are learning game
// links. When she completes a lesson early she can do those instead of walk
// away."
//
// ---- IT IS NEVER LOCKED, AND THAT IS HER CALL ----
//
// Asked whether to grey this out until the day's work is done, Gigi chose:
// always open, but say what is still left. Same shape as her decision on the
// practice gate, where PRACTICE_GATE.blocking is false and the reason recorded
// was that a wall makes a child stop trying rather than work.
//
// So the top of this screen tells her what is still on her day and then gets
// out of the way. THE INFORMATION, NOT A DOOR. A locked tab also means a bad
// morning ends with a locked door, which is the morning it would matter most.
//
// ---- WEIGHTED TOWARD HER GAPS, NOT MADE OF THEM ----
//
// Her four weakest strands come first — but this is not a remediation screen.
// A tab that is entirely the things she is worst at is a tab she learns to
// avoid, and "instead of walk away" only works if she WANTS to be here.
// Nothing on this screen says "weakest", "gap" or "behind"; the ORDER carries
// it and the words do not.
//
// ---- WHAT IS DELIBERATELY NOT HERE ----
//
// The GAPS list in gameLinks.js — grammar has nothing that passed the bar — is
// for the Grown-Up Corner, not for her. A nine-year-old does not need a panel
// explaining what the adults could not find. v3.59's rule: when there is
// nothing to say, say nothing.
// ---------------------------------------------------------------------------

/** Her weakest strands first. Derived from her levels, never a typed order. */
function orderedForHer(strands) {
  const level = (id) => strands?.[id]?.level ?? 99;
  const weakest = (g) => (g.strands.length === 0 ? 99 : Math.min(...g.strands.map(level)));
  return [...GAME_LINKS].sort((a, b) => weakest(a) - weakest(b));
}

export function GamesView() {
  const strands = useAppStore((s) => s.strands);
  const doneToday = useAppStore((s) => s.doneToday(dayKeyOf()));

  // What is still on her day. Counted, never typed — rule 20.
  const subjectBlocks = DEFAULT_SCHEDULE.filter((b) => b.subject);
  const left = subjectBlocks.filter((b) => !doneToday[b.id]).length;
  const links = orderedForHer(strands);

  return (
    <section className="mx-auto max-w-3xl px-4 py-6">
      <h1 className="font-display text-3xl leading-tight text-ink-900">Play</h1>
      <p className="mt-1.5 text-sm text-ink-700">
        Good things to do when you have finished and there is still time.
      </p>

      {/* ---- WHAT IS LEFT. A SENTENCE, NOT A GATE. ---- */}
      <div className="mt-4 rounded-petal border-2 border-gold-500 bg-gold-300/20 px-4 py-3">
        {left === 0 ? (
          <p className="text-sm font-700 text-ink-900">
            Everything on your day is ticked off. This is all yours. 🌿
          </p>
        ) : (
          <p className="text-sm text-ink-900">
            <span className="font-700">
              You still have {left} thing{left === 1 ? '' : 's'} on your day.
            </span>{' '}
            You can play now if you want to — it is up to you.
          </p>
        )}
      </div>

      <ul className="mt-5 space-y-3">
        {links.map((g) => (
          <li key={g.id} className="panel-white px-4 py-3.5">
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <a
                href={g.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-display text-lg text-lavender-700 underline decoration-lavender-300 underline-offset-4 hover:text-lavender-500"
              >
                {g.label}
              </a>
              {/* A geoboard is not a game and this screen does not pretend it
                  is. Calling a tool a game is a small lie a child notices.

                  AND A HOSTED GAME SAYS SO ON THE CARD. Blooket, Gimkit and
                  Kahoot need a code from somebody running a game. Everything
                  else here she can just open. Letting her find that out by
                  typing nothing into an empty PIN box reads as the app being
                  broken, and she would be right to think so. */}
              <span className="label-caps text-ink-500">
                {g.kind === 'tool'
                  ? 'something to build with'
                  : g.kind === 'hosted'
                    ? 'ask Gigi for a code first'
                    : 'game'}
              </span>
            </div>
            <p className="mt-1 text-[0.92rem] leading-relaxed text-ink-900">{g.blurb}</p>
            <p className="mt-1.5 text-xs text-ink-500">
              {g.source}
              {g.strands.length > 0 && ` · ${g.strands.map(strandLabel).join(' · ')}`}
            </p>
          </li>
        ))}
      </ul>

      <p className="mt-5 text-xs text-ink-500">
        These open in a new tab and they are not part of Petal &amp; Pestle. Nothing you do there
        comes back here — it is just for you.
      </p>
    </section>
  );
}
