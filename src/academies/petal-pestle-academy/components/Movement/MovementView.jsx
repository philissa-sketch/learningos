import { useState } from 'react';
import {
  SINGING_LADDER,
  YOGA_LADDER,
  MOVEMENT_CHANNELS,
  MOVEMENT_SAFETY,
  clockOf
} from '../../data/movement/movementLadders.js';

// ---------------------------------------------------------------------------
// SINGING & MOVEMENT — 15:40, fifteen minutes, and she asked for it.
//
// The block has been on her schedule since v3.2 and led NOWHERE. This is the
// door it should always have opened.
//
// ---- NOT GRADED, AND THE SCREEN SAYS SO TRUTHFULLY ----
//
// §9: "Participation, not a grade." Nothing here writes an itemEvent, moves a
// review box or reaches the Gradebook — so unlike the retrieve beat, this
// screen MAY say nothing is recorded, because nothing is. v3.56's rule scoped
// per panel: a panel that writes nothing may say so.
//
// ---- SHE PICKS THE RUNG ----
//
// A ladder that advances itself would decide she is "done" with rung one on a
// day she was not. Anti-pattern 28 is a learner with zero choices, and §3.7
// asks for real ones — this is a genuine one, and it costs nothing.
//
// ---- EMBEDDED, NEVER LINKED ----
//
// youtube-nocookie with rel=0, the same as every lesson video. A link to
// youtube.com/watch drops a nine-year-old into recommendations, autoplay and
// comments — and puts a pre-roll ad in front of her.
// ---------------------------------------------------------------------------

function Ladder({ title, icon, rungs, channel, showSafety }) {
  const [openRung, setOpenRung] = useState(rungs[0].rung);
  const current = rungs.find((r) => r.rung === openRung) || rungs[0];

  return (
    <section className="mt-6">
      <h2 className="font-display text-2xl text-ink-900">
        {icon} {title}
      </h2>

      {showSafety && (
        <p className="mt-2 rounded-petal border-2 border-gold-500 bg-gold-300/20 px-4 py-3 text-[0.92rem] font-700 leading-relaxed text-ink-900">
          {MOVEMENT_SAFETY}
        </p>
      )}

      {/* She chooses. It never advances itself. */}
      <div className="mt-3 flex flex-wrap gap-2">
        {rungs.map((r) => (
          <button
            key={r.rung}
            type="button"
            onClick={() => setOpenRung(r.rung)}
            className={`rounded-full border-2 px-3.5 py-1.5 text-sm font-700 ${
              r.rung === openRung
                ? 'border-lavender-500 bg-lavender-300/40 text-lavender-700'
                : 'border-cream-300 bg-white text-ink-700 hover:border-lavender-500'
            }`}
          >
            {r.rung} · {clockOf(r.seconds)}
          </button>
        ))}
      </div>

      <div className="mt-3 panel-white px-4 py-4">
        <p className="font-display text-lg leading-snug text-ink-900">{current.title}</p>
        <p className="mt-1 text-[0.9rem] text-ink-700">{current.why}</p>
        <div className="mt-3 aspect-video w-full overflow-hidden rounded-petal">
          <iframe
            key={current.videoId}
            className="h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${current.videoId}?rel=0`}
            title={current.title}
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <p className="mt-2 text-xs text-ink-500">
          {clockOf(current.seconds)} · {channel.label}
        </p>
      </div>
    </section>
  );
}

export function MovementView() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-6">
      <h1 className="font-display text-3xl leading-tight text-ink-900">Singing &amp; Movement</h1>
      <p className="mt-1.5 text-sm text-ink-700">
        Fifteen minutes at the end of the day. Singing most days, yoga most days.
      </p>

      {/* TRUE, and check-delivery is allowed to see it say so — this screen
          writes nothing anywhere. */}
      <p className="mt-2 text-[0.85rem] text-ink-500">
        This one is not scored and nothing is written down. Tick the block when you have done it.
      </p>

      <Ladder
        title="Singing"
        icon="🎵"
        rungs={SINGING_LADDER}
        channel={MOVEMENT_CHANNELS.singing}
      />

      <Ladder
        title="Yoga"
        icon="🧘🏽"
        rungs={YOGA_LADDER}
        channel={MOVEMENT_CHANNELS.yoga}
        showSafety
      />

      <p className="mt-6 text-xs text-ink-500">
        Both of these are Gigi&rsquo;s choices. {MOVEMENT_CHANNELS.singing.label} is a Black
        American vocal coach from Detroit.
      </p>
    </section>
  );
}
