import { useAppStore } from '../../store/useAppStore.js';
import { SUBJECTS, SUBJECT_ORDER, strandsForSubject } from '../../config/strands.js';
import { describeLevel, subjectLevel, MIN_LEVEL, MAX_LEVEL } from '../../engine/diagnosticEngine.js';
import { MarigoldMessage } from '../Mentor/MarigoldMessage.jsx';
import { levelsLine } from '../../lib/marigold.js';
import { gardenFor } from '../../lib/garden.js';

/**
 * HER view of her results.
 *
 * TWO THINGS ON ONE SCREEN, and they answer different questions.
 *
 * The GARDEN answers "am I getting anywhere?" — one plant per subject, growing
 * on the days she has actually worked it. It moves every school day.
 *
 * The LEVELS answer "where am I?" — the Check-In's reading, in words. The
 * decimal (4.2) is deliberately absent here and present in the Grown-Up Corner.
 *
 * Until v3.15 these were the same thing: the plant's height WAS the level. That
 * could not do what Gigi asked for — "so that she can see real change" — because
 * a level moves twice a year. It also drew nine plants sorted short to tall,
 * which is a ranking of a child's own skills rendered as stunted stems. Growth
 * belongs to effort. The measurement belongs in words.
 */

/** One plant, drawn at its stage. (0,0) is where it meets the soil. */
function Plant({ stage, blooms, flower }) {
  const id = stage.id;
  const stemTop = { seed: 0, sprout: -22, leaf: -46, bud: -66, flower: -78 }[id];

  return (
    <svg viewBox="-46 -104 92 118" width="92" height="118" role="img" aria-label={stage.label}>
      {/* soil, always */}
      <ellipse cx="0" cy="8" rx="30" ry="7" fill="#B08A5A" />
      <ellipse cx="0" cy="6" rx="30" ry="7" fill="#C89B62" />

      {id === 'seed' && (
        <>
          <ellipse cx="0" cy="1" rx="7" ry="5.5" fill="#8A6A42" />
          <path d="M-3 0 q3 -3 6 0" stroke="#6E5334" strokeWidth="1.4" fill="none" />
        </>
      )}

      {id !== 'seed' && (
        <path
          d={`M0 4 L0 ${stemTop}`}
          stroke="#5E8A57"
          strokeWidth={id === 'sprout' ? 3 : 4}
          strokeLinecap="round"
          fill="none"
        />
      )}

      {id === 'sprout' && (
        <>
          <ellipse cx="-9" cy="-22" rx="9" ry="5.5" fill="#8FBF86" transform="rotate(-20 -9 -22)" />
          <ellipse cx="9" cy="-22" rx="9" ry="5.5" fill="#8FBF86" transform="rotate(20 9 -22)" />
        </>
      )}

      {(id === 'leaf' || id === 'bud' || id === 'flower') && (
        <>
          <ellipse cx="-14" cy="-26" rx="13" ry="7" fill="#7FA87A" transform="rotate(-22 -14 -26)" />
          <ellipse cx="14" cy="-36" rx="13" ry="7" fill="#7FA87A" transform="rotate(22 14 -36)" />
          <ellipse cx="-13" cy="-46" rx="11" ry="6" fill="#8FBF86" transform="rotate(-18 -13 -46)" />
        </>
      )}

      {id === 'bud' && (
        <>
          <path d="M0 -66 q-8 -12 0 -20 q8 8 0 20 Z" fill="#E4A8B8" stroke="#C98FA8" strokeWidth="1.6" />
          <path d="M-5 -66 q5 6 10 0" stroke="#5E8A57" strokeWidth="2.4" fill="none" />
        </>
      )}

      {id === 'flower' &&
        Array.from({ length: blooms }).map((_, i) => {
          // Blooms fan out from the top, alternating sides, so eight of them
          // still read as one plant rather than a bouquet.
          const side = i % 2 === 0 ? -1 : 1;
          const tier = Math.floor(i / 2);
          const bx = i === 0 ? 0 : side * (11 + tier * 8);
          const by = i === 0 ? -84 : -76 + tier * 9;
          return (
            <g key={i}>
              {i > 0 && (
                <path
                  d={`M0 ${-70 + tier * 6} Q${bx * 0.6} ${by + 6} ${bx} ${by}`}
                  stroke="#5E8A57"
                  strokeWidth="2.2"
                  fill="none"
                />
              )}
              <text x={bx} y={by + 6} textAnchor="middle" fontSize={i === 0 ? 21 : 15}>
                {flower}
              </text>
            </g>
          );
        })}
    </svg>
  );
}

/** One subject's plant, with what it takes to move it on. */
function GardenPlot({ plant }) {
  return (
    <div className="flex flex-col items-center rounded-petal border border-cream-300 bg-white px-3 py-3 text-center shadow-petal">
      <Plant stage={plant.stage} blooms={plant.blooms} flower={plant.flower} />
      <p className="mt-1 text-[0.8rem] font-700 leading-tight text-ink-900">{plant.label}</p>
      <p className="mt-0.5 text-[0.7rem] font-700 uppercase tracking-wide text-sage-700">
        {plant.stage.label}
        {plant.blooms > 1 && ` · ${plant.blooms} blooms`}
      </p>
      <p className="mt-1 text-[0.7rem] leading-tight text-ink-500">
        {plant.days === 0
          ? 'Not started yet'
          : `${plant.days} day${plant.days === 1 ? '' : 's'} of work`}
      </p>
      {plant.next && (
        <p className="mt-1 text-[0.66rem] leading-tight text-lavender-700">
          {plant.next.daysToGo} more day{plant.next.daysToGo === 1 ? '' : 's'} → {plant.next.label}
        </p>
      )}
    </div>
  );
}

/** The Check-In's reading for one strand. In words. No plant. */
function StrandCard({ strand, state }) {
  const measured = state && state.asked > 0;
  const described = measured ? describeLevel(state.level) : null;
  return (
    <div className="rounded-petal border border-cream-300 bg-white px-3 py-3 shadow-petal">
      <p className="text-[0.8rem] font-700 leading-tight text-ink-900">{strand.cardLabel}</p>
      <p className="mt-1 text-[0.72rem] leading-tight text-ink-500">
        {measured ? described.short : 'Not measured yet'}
      </p>
      {measured && !state.settled && (
        <p className="mt-1 text-[0.62rem] uppercase tracking-wide text-lavender-700">
          still measuring
        </p>
      )}
    </div>
  );
}

export function LevelsView({ onNavigate }) {
  const strands = useAppStore((s) => s.strands);
  const progress = useAppStore((s) => s.progress());
  const scheduleDays = useAppStore((s) => s.scheduleDays);
  const blocks = useAppStore((s) => s.scheduleBlocks);
  const garden = gardenFor({ scheduleDays, blocks });

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <p className="label-caps">My Levels</p>
      <h1 className="mt-1 font-display text-3xl text-ink-900">Your garden</h1>
      <p className="mt-2 max-w-2xl text-sm text-ink-700">
        One plant for each subject. They grow on the days you do the work — a seed, then a sprout,
        then leaves, then a bud, then a flower. Nothing here is about how many you got right.
      </p>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {garden.map((plant) => (
          <GardenPlot key={plant.subject} plant={plant} />
        ))}
      </div>

      <div className="mt-6">
        <MarigoldMessage text={levelsLine({ progress })} size="sm" />
      </div>

      <h2 className="mt-10 font-display text-2xl text-ink-900">What the Check-In found</h2>
      <p className="mt-1 max-w-2xl text-sm text-ink-700">
        Where you were starting from, subject by subject. This moves when you do the Check-In again,
        not day to day — that is what the garden above is for.
      </p>

      {progress.askedCount === 0 && (
        <div className="mt-6 panel px-6 py-8 text-center">
          <p className="text-4xl">🌱</p>
          <p className="mt-3 text-sm text-ink-700">
            Nothing has been measured yet. Your plants still grow every day you work — the Check-In
            is how we find out which Khan units to open first.
          </p>
          <button
            type="button"
            onClick={() => onNavigate('diagnostic')}
            className="mt-5 rounded-full bg-blush-500 px-6 py-3 font-700 text-white hover:bg-blush-700"
          >
            Begin the Check-In
          </button>
        </div>
      )}

      {SUBJECT_ORDER.map((subjectId) => {
        const subject = SUBJECTS[subjectId];
        const list = strandsForSubject(subjectId);
        const level = subjectLevel(strands, list.map((s) => s.id));
        const described = describeLevel(level);
        return (
          <section key={subjectId} className="mt-8">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="font-display text-xl text-ink-900">
                <span aria-hidden="true" className="mr-1.5">
                  {subject.icon}
                </span>
                {subject.label}
              </h2>
              <p className="text-sm text-ink-500">
                {level == null ? 'Not measured yet' : `Overall: ${described.text}`}
              </p>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {list.map((strand) => (
                <StrandCard key={strand.id} strand={strand} state={strands[strand.id]} />
              ))}
            </div>
          </section>
        );
      })}

      <div className="mt-10 panel px-5 py-5">
        <p className="text-sm text-ink-700">
          Want to know what to actually <em>do</em> about all this?
        </p>
        <button
          type="button"
          onClick={() => onNavigate('plan')}
          className="mt-3 rounded-full bg-blush-500 px-6 py-2.5 font-700 text-white hover:bg-blush-700"
        >
          Open my plan →
        </button>
      </div>
    </div>
  );
}
