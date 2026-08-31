// ---------------------------------------------------------------------------
// THE SHIP — drawn, with each system lighting up as its subject fills it.
// (Part 10, built Aug 8, 2026.)
//
// My Ship was seven progress bars. The idea it carries is the best answer this
// app has to "why do I have to do this?" — every subject builds a real part of
// the vehicle — and a bar chart is the weakest possible way to say it. A boy
// who wants to be an aerospace engineer should be looking at a spacecraft.
//
// Each system is drawn in place on the hull and fills from empty outline to lit
// as its own subject's work comes in, so the vehicle is visibly incomplete in
// exactly the places his work is. That is honest and specific, and it never has
// to nag: a dark comms dish says more than a sentence about writing would.
//
// The four purchasable spacecraft parts mount here too — bought in the Supply
// store, bolted onto the ship. That closes the loop between the store, the
// subjects, and the vehicle.
// ---------------------------------------------------------------------------

const LIT = '#22D3EE';
const WARM = '#F5A524';
const GO = '#34D399';
const HULL = '#263a4d';
const HULL_LIGHT = '#33506a';
const GHOST = 'rgba(148,180,206,.30)';

/** A system's colour by how far along it is. */
function toneFor(pct) {
  if (pct >= 1) return GO;
  if (pct >= 0.5) return LIT;
  if (pct > 0) return WARM;
  return GHOST;
}

/**
 * Each part is drawn twice: a dim outline that is always there, and a lit
 * version clipped to the fill fraction. The clip is what makes a system look
 * half-built rather than just differently coloured.
 */
function Part({ id, pct, children }) {
  const tone = toneFor(pct);
  const clipId = `fill-${id}`;
  return (
    <g>
      <g stroke={GHOST} strokeWidth="2.5" fill="none" opacity=".55">{children}</g>
      <defs>
        <clipPath id={clipId}>
          {/* Fills bottom-up: a part half-built is half-lit from its base. */}
          <rect x="-400" y={400 - 800 * pct} width="1600" height={800 * pct} />
        </clipPath>
      </defs>
      <g stroke={tone} strokeWidth="2.5" fill="none" clipPath={`url(#${clipId})`}>{children}</g>
    </g>
  );
}

const ART = {
  propulsion: (
    <>
      <path d="M-46 150 L-30 210 L30 210 L46 150 Z" />
      <path d="M-30 210 L-38 246 L-14 246 L-8 210" />
      <path d="M30 210 L38 246 L14 246 L8 210" />
      <path d="M-22 210 L-22 246 M0 210 L0 250 M22 210 L22 246" />
    </>
  ),
  guidance: (
    <>
      <path d="M0 -250 L34 -150 L-34 -150 Z" />
      <circle cx="0" cy="-186" r="15" />
      <path d="M-12 -196 L12 -176 M12 -196 L-12 -176" />
    </>
  ),
  comms: (
    <>
      <path d="M62 -60 a34 34 0 0 1 60 26" />
      <path d="M70 -46 a22 22 0 0 1 38 16" />
      <path d="M92 -34 L74 -6" />
      <circle cx="92" cy="-34" r="5" />
    </>
  ),
  sensors: (
    <>
      <rect x="-128" y="-70" width="54" height="26" rx="6" />
      <path d="M-128 -57 L-152 -57" />
      <circle cx="-158" cy="-57" r="7" />
      <path d="M-101 -44 L-101 -18" />
    </>
  ),
  onboard: (
    <>
      <rect x="-40" y="-92" width="80" height="70" rx="8" />
      <path d="M-24 -74 L24 -74 M-24 -58 L10 -58 M-24 -42 L24 -42" />
      <circle cx="26" cy="-58" r="5" />
    </>
  ),
  'life-support': (
    <>
      <rect x="-58" y="30" width="116" height="54" rx="10" />
      <circle cx="-24" cy="57" r="14" />
      <circle cx="24" cy="57" r="14" />
      <path d="M-24 47 q10 10 0 20 M24 47 q-10 10 0 20" />
    </>
  ),
  morale: (
    <>
      <ellipse cx="0" cy="-6" rx="26" ry="30" />
      <path d="M0 -36 L0 -84" />
      <path d="M-9 -84 L9 -84" />
      <path d="M-14 -14 L14 -14 M-14 0 L14 0" />
    </>
  )
};

/** Where each drawn system sits on the hull. */
const SPOT = {
  guidance: 'translate(0 0)',
  onboard: 'translate(0 0)',
  comms: 'translate(0 0)',
  sensors: 'translate(0 0)',
  propulsion: 'translate(0 0)',
  'life-support': 'translate(0 0)',
  morale: 'translate(0 118) scale(.62)'
};

/** Purchasable spacecraft parts, drawn only once he owns them. */
const MOUNTS = {
  'eq-solar': (
    <g stroke={GO} strokeWidth="2.5" fill="rgba(52,211,153,.14)">
      <rect x="-206" y="6" width="88" height="46" rx="4" />
      <rect x="118" y="6" width="88" height="46" rx="4" />
      <path d="M-118 29 L-58 29 M118 29 L58 29" />
      <path d="M-184 6 L-184 52 M-162 6 L-162 52 M162 6 L162 52 M184 6 L184 52" opacity=".6" />
    </g>
  ),
  'eq-antenna': (
    <g stroke={LIT} strokeWidth="2.5" fill="none">
      <path d="M-96 -110 a30 30 0 0 1 54 22" />
      <path d="M-70 -96 L-58 -70" />
      <circle cx="-70" cy="-96" r="4" />
    </g>
  ),
  'eq-heatshield': (
    <g stroke={WARM} strokeWidth="3" fill="rgba(245,165,36,.12)">
      <path d="M-52 252 q52 30 104 0 L52 262 q-52 28 -104 0 Z" />
    </g>
  ),
  'eq-booster': (
    <g stroke={WARM} strokeWidth="2.5" fill="rgba(245,165,36,.10)">
      <rect x="-92" y="120" width="30" height="112" rx="12" />
      <rect x="62" y="120" width="30" height="112" rx="12" />
      <path d="M-77 232 L-77 254 M77 232 L77 254" strokeLinecap="round" />
    </g>
  )
};

const MOUNT_LABEL = {
  'eq-solar': 'Solar Array',
  'eq-antenna': 'High-Gain Antenna',
  'eq-heatshield': 'Heat Shield',
  'eq-booster': 'Booster'
};

export function ShipDiagram({ systems, owned }) {
  const byId = Object.fromEntries(systems.map((s) => [s.id, s]));
  const has = (id) => owned && owned.has(id);
  const mountedCount = Object.keys(MOUNTS).filter(has).length;

  return (
    <div className="overflow-hidden rounded-2xl border border-space-700 bg-space-950 shadow-panel">
      <svg viewBox="-230 -290 460 600" className="w-full" role="img" aria-label="Your spacecraft">
        {/* hull */}
        <path
          d="M0 -250 L46 -110 L46 150 L-46 150 L-46 -110 Z"
          fill={HULL}
          stroke={HULL_LIGHT}
          strokeWidth="2"
        />
        <path d="M-46 -110 L46 -110" stroke={HULL_LIGHT} strokeWidth="2" />
        <path d="M-46 40 L46 40" stroke={HULL_LIGHT} strokeWidth="1.5" opacity=".6" />

        {/* bought parts, bolted on */}
        {Object.entries(MOUNTS).map(([id, art]) => (has(id) ? <g key={id}>{art}</g> : null))}

        {/* the seven systems */}
        {Object.entries(ART).map(([id, art]) => {
          const sys = byId[id];
          if (!sys) return null;
          return (
            <g key={id} transform={SPOT[id]}>
              <Part id={id} pct={sys.pct}>{art}</Part>
            </g>
          );
        })}
      </svg>

      <div className="border-t border-space-700 px-3 py-2">
        <p className="text-[11px] text-ink-500">
          Each part lights as its own subject fills it — grey at zero, amber under way, cyan past halfway,
          green when flight-ready.{' '}
          {mountedCount === 0
            ? 'Boosters, a heat shield, an antenna and a solar array can be bought in the Supply store and bolted on.'
            : `${mountedCount} of 4 bought parts mounted: ${Object.keys(MOUNTS).filter(has).map((id) => MOUNT_LABEL[id]).join(', ')}.`}
        </p>
      </div>
    </div>
  );
}
