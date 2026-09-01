import { useMemo } from 'react';
import { NovaMessage } from '../Mentor/NovaMessage.jsx';
import { evaluateBadges } from '../../lib/badges.js';
import { getShipStatus } from '../../lib/shipSystems.js';
import { todayDateStr } from '../../lib/scheduler.js';
import { academyContent } from '../../content/academyContent.js';

const { getDailyLine } = academyContent().guide;

// ---------------------------------------------------------------------------
// NOVA ON THE PROGRESS SCREEN.
// (Built Aug 9, 2026.)
//
// Two jobs, and they are different in kind.
//
// 1. A DAILY LINE — one per day, date-seeded so it does not change on reload.
//    Mostly Nova in her own voice; occasionally a genuinely documented quote,
//    named. See dailyLines.js for why invented attributions were refused.
//
// 2. A LIVE READ OF THE PAGE — what these numbers actually say today. This is
//    the part that makes it worth opening: a wall of figures does not tell a
//    twelve-year-old what to DO with them, and "you are 4 lessons from Rocket
//    Builder" does.
//
// THE OBSERVATIONS ARE RANKED AND CAPPED AT TWO. Everything here is true, so
// the temptation is to say all of it — and six true observations is a lecture
// nobody reads. Nearest-thing-to-finishing comes first, because it is the one
// that changes what he does next.
//
// NOTHING HERE SCOLDS. The weakest ship system is reported as information
// ("comms is furthest behind — that runs on writing"), never as a failing. Same
// rule the ship summary already follows, for the same reason: a telling-off
// delivered by a character he likes is how you lose the character.
// ---------------------------------------------------------------------------

/**
 * The most useful two things this screen can say right now.
 *
 * Deliberately silent when there is nothing real to report. A brand-new account
 * has no nearly-finished badge and no meaningful weakest system, and inventing
 * encouragement for a boy who has not started yet is how a mentor stops being
 * believable.
 */
function observationsFor({ journey, stats }) {
  const out = [];

  // 1. How far to the next destination. Concrete, and it moves.
  if (journey && !journey.complete && journey.remaining) {
    const { lessons, xp } = journey.remaining;
    const bits = [];
    if (lessons > 0) bits.push(`${lessons} more lesson${lessons === 1 ? '' : 's'}`);
    if (xp > 0) bits.push(`${xp} XP`);
    if (bits.length) {
      out.push(`${bits.join(' and ')} and you reach ${journey.next.name}.`);
    }
  }

  // 2. The badge closest to unlocking — the cheapest real win available.
  const nearest = evaluateBadges(stats)
    .filter((b) => !b.earned && b.progress && b.progress.current > 0)
    .sort((a, b) => b.progress.pct - a.progress.pct)[0];
  if (nearest) {
    const left = nearest.progress.target - nearest.progress.current;
    out.push(`${left} more and "${nearest.name}" unlocks — you are at ${nearest.progress.current} of ${nearest.progress.target}.`);
  }

  // 3. Only if neither of the above had anything: name the system waiting on him.
  if (out.length < 2) {
    const ship = getShipStatus(stats);
    const w = ship.weakest;
    if (w && w.percent < 100) {
      out.push(
        w.current === 0
          ? `Your ${w.name.toLowerCase()} has not been started yet — that one runs on ${w.subjectLabel}.`
          : `${w.name} is the system furthest behind at ${w.percent}% — that one runs on ${w.subjectLabel}.`
      );
    }
  }

  return out.slice(0, 2);
}

export function NovaProgressPanel({ journey, stats }) {
  const today = todayDateStr();
  const line = useMemo(() => getDailyLine(today), [today]);
  const observations = useMemo(() => observationsFor({ journey, stats }), [journey, stats]);

  // The spoken version reads the quote, the attribution, then the observations —
  // in the order they appear, so hearing it and reading it match.
  const speak = useMemo(() => {
    const quote = line.who ? `${line.text} That was ${line.who}.` : line.text;
    return [quote, ...observations].join(' ');
  }, [line, observations]);

  return (
    <div className="mb-4">
      <NovaMessage tone="brief" speak={speak}>
        <p className="italic text-ink-200">&ldquo;{line.text}&rdquo;</p>
        {line.who && <p className="mt-1 text-[11px] text-ink-500">— {line.who}</p>}

        {observations.length > 0 && (
          <div className="mt-3 border-t border-space-700 pt-2">
            <p className="text-[10px] font-display uppercase tracking-widest text-ink-600">Where you are</p>
            <ul className="mt-1 space-y-1">
              {observations.map((o, i) => (
                <li key={i} className="text-sm text-ink-200">
                  {o}
                </li>
              ))}
            </ul>
          </div>
        )}
      </NovaMessage>
    </div>
  );
}
