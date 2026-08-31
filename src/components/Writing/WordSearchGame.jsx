import { useState, useMemo } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import { buildWordSearch } from '../../lib/weeklyWords.js';

const key = (r, c) => r + ':' + c;

/**
 * WEDNESDAY, SPELLING — the word search.
 *
 * Asked for by name: "3rd word search". It is the one day in the week that is
 * a game rather than a question, and that is the job it does — the midpoint of
 * a five-day ramp that starts with reading and ends with a blank page.
 *
 * WHAT IT DOES NOT DO IS COUNT TOWARD MASTERING A WORD, and that is deliberate
 * rather than an omission. Finding RECEIVE in a grid means he matched seven
 * letters he was looking straight at. It is real work with the shape of the
 * word, which is why it is here at all, but it is not evidence he can spell it
 * unaided — and this app has just spent a day fixing a screen that claimed
 * work was done when it was not. See MASTERY_ACTIVITIES in lib/weeklyWords.js.
 *
 * HOW IT IS PLAYED: tap the first letter, then tap the last letter. Not a
 * drag — a drag on a touchscreen fights the page scroll, and two taps work
 * identically with a mouse, a finger or a keyboard.
 *
 * The grid is seeded, so it is the same puzzle every time this sitting
 * re-renders and a different one next week.
 */
export function WordSearchGame({ skill, dayKey, onExit }) {
  const getWeeklyWordList = useAppStore((s) => s.getWeeklyWordList);
  const completeWordDayTask = useAppStore((s) => s.completeWordDayTask);
  const { weekNumber, words } = getWeeklyWordList(skill);

  const [attemptSeed] = useState(() => Date.now());
  const wordKey = words.map((w) => w.id).join(',');
  const puzzle = useMemo(
    () => buildWordSearch(words, attemptSeed),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [wordKey, attemptSeed]
  );

  const [found, setFound] = useState([]); // wordIds
  const [anchor, setAnchor] = useState(null); // [r, c]
  const [wrongFlash, setWrongFlash] = useState(false);
  const [finalResult, setFinalResult] = useState(null);

  const foundSet = new Set(found);
  const foundCells = useMemo(() => {
    const cells = new Set();
    for (const p of puzzle.placements) {
      if (!foundSet.has(p.wordId)) continue;
      for (const [r, c] of p.cells) cells.add(key(r, c));
    }
    return cells;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [found, puzzle]);

  const handleCell = (r, c) => {
    if (finalResult) return;
    if (!anchor) {
      setAnchor([r, c]);
      return;
    }
    const [ar, ac] = anchor;
    if (ar === r && ac === c) {
      setAnchor(null);
      return;
    }
    const hit = puzzle.placements.find((p) => {
      if (foundSet.has(p.wordId)) return false;
      const first = p.cells[0];
      const last = p.cells[p.cells.length - 1];
      const forward = first[0] === ar && first[1] === ac && last[0] === r && last[1] === c;
      // Selecting a word end-to-start is still finding it.
      const backward = last[0] === ar && last[1] === ac && first[0] === r && first[1] === c;
      return forward || backward;
    });
    setAnchor(null);
    if (hit) {
      setFound((f) => [...f, hit.wordId]);
      setWrongFlash(false);
    } else {
      setWrongFlash(true);
      setTimeout(() => setWrongFlash(false), 600);
    }
  };

  const allFound = puzzle.placements.length > 0 && found.length === puzzle.placements.length;

  const handleFinish = async () => {
    // Every word he found is a result; nothing here reaches the mastery ledger
    // (completeWordDayTask reads the activity type), so this is completion and
    // XP only.
    const results = puzzle.placements.map((p) => ({ wordId: p.wordId, correct: foundSet.has(p.wordId) }));
    const outcome = await completeWordDayTask(skill, dayKey, results);
    setFinalResult({ found: found.length, total: puzzle.placements.length, xpEarned: outcome.xpEarned });
  };

  if (finalResult) {
    return (
      <div className="mx-auto max-w-2xl space-y-4 px-4 py-6 sm:px-6">
        <div className="rounded-xl border border-signal-green/40 bg-signal-green/5 p-6 text-center shadow-panel">
          <p className="text-xs font-display uppercase tracking-widest text-signal-green">
            Week {weekNumber} Spelling — Word search complete
          </p>
          <h2 className="mt-2 font-display text-3xl font-700 text-ink-100">
            {finalResult.found}/{finalResult.total} found
          </h2>
          <p className="mt-1 text-sm text-ink-300">+{finalResult.xpEarned} XP earned</p>
          <p className="mt-3 text-xs text-ink-500">
            Tomorrow you write them out with letters missing — that is the one that counts toward finishing a word.
          </p>
          <button
            type="button"
            onClick={onExit}
            className="mt-5 rounded-lg bg-signal-cyan px-4 py-2 font-display font-700 text-space-950 transition hover:brightness-110"
          >
            Return to Mission Control
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-4 px-4 py-6 sm:px-6">
      <div className="flex items-center justify-between">
        <button type="button" onClick={onExit} className="text-sm text-ink-500 hover:text-ink-100">
          ← Exit mission
        </button>
        <span className="text-sm text-ink-500">
          Week {weekNumber} Spelling · Word search — {found.length} of {puzzle.placements.length}
        </span>
      </div>

      <div className="rounded-xl border border-space-700 bg-space-800 p-4 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">How to play</p>
        <p className="mt-1 text-sm text-ink-300">
          Tap the <strong>first</strong> letter of a word, then tap its <strong>last</strong> letter. Words run across,
          down, diagonally, and backwards.
        </p>
      </div>

      <div className="overflow-x-auto">
        <div
          className="mx-auto grid w-fit gap-0.5"
          style={{ gridTemplateColumns: `repeat(${puzzle.size}, minmax(0, 1fr))` }}
        >
          {puzzle.grid.map((row, r) =>
            row.map((letter, c) => {
              const isAnchor = anchor && anchor[0] === r && anchor[1] === c;
              const isFound = foundCells.has(key(r, c));
              return (
                <button
                  key={key(r, c)}
                  type="button"
                  onClick={() => handleCell(r, c)}
                  className={
                    'h-7 w-7 rounded text-center font-display text-xs transition sm:h-8 sm:w-8 sm:text-sm ' +
                    (isFound
                      ? 'bg-signal-green/25 text-signal-green'
                      : isAnchor
                        ? (wrongFlash ? 'bg-signal-red/30 text-ink-100' : 'bg-signal-cyan/30 text-ink-100')
                        : 'bg-space-900 text-ink-300 hover:bg-space-700')
                  }
                >
                  {letter}
                </button>
              );
            })
          )}
        </div>
      </div>

      <div className="rounded-xl border border-space-700 bg-space-800 p-4 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-ink-500">This week's words</p>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
          {puzzle.placements.map((p) => (
            <span
              key={p.wordId}
              className={
                'text-sm ' + (foundSet.has(p.wordId) ? 'text-signal-green line-through' : 'text-ink-300')
              }
            >
              {p.display}
            </span>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={handleFinish}
        className={
          'w-full rounded-lg px-4 py-2 font-display font-700 transition ' +
          (allFound
            ? 'bg-signal-cyan text-space-950 hover:brightness-110'
            : 'border border-space-600 text-ink-500 hover:border-signal-cyan/40 hover:text-signal-cyan')
        }
      >
        {allFound ? 'All found — finish' : 'Finish for today'}
      </button>
      {!allFound && (
        <p className="text-center text-xs text-ink-500">
          You can stop early. Finding them all is the goal, not the rule.
        </p>
      )}
    </div>
  );
}
