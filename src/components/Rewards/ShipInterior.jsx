import { useMemo, useState } from 'react';
import { CadetAvatar } from './CadetAvatar.jsx';
import { DECKS, HOME_DECK, STATIONS, arrivalOn, otherDeck, stationReading, stationsOn } from '../../lib/shipInterior.js';
import { VB, BACK, depth, projectFloor, FIGURE_SCALE, FIGURE_FEET_Y, LIGHT, contactShadow } from '../../lib/hqGeometry.js';

/**
 * =============================================================================
 * THE SHIP, FROM THE INSIDE.
 * =============================================================================
 *
 * The parent, Sept 27 2026, asked for the flat ship on the My Ship screen to be
 * a place that can be entered.
 *
 * The hull there is the best idea in this app — every subject builds a real
 * part of a real vehicle — and it was a picture you looked at. Two decks now:
 * the flight deck, and the hold under it, with a ladder between.
 *
 * ---- WHAT IT DRAWS, AND WHAT IT REFUSES TO ----
 *
 * Every panel reads `shipInterior.js`, which reads `shipSystems.js` — the same
 * counters the hull outside is drawn from. There is no second arithmetic here.
 * A tank he has not filled is drawn EMPTY, with a sentence naming the subject
 * that fills it. Nothing is drawn part-full to look busier than the record is;
 * that rule is the whole reason the room is worth looking at.
 *
 * ---- HOW IT IS DRAWN ----
 *
 * Same projection as the HQ (`hqGeometry.js`), so the cadet is the same size in
 * both places and the floor rakes the same way. Same materials, same two light
 * temperatures, same contact shadow under everything that touches the floor.
 * Declarative animation only — no rAF, nothing re-rendering per frame — and all
 * of it stops under `prefers-reduced-motion`, which leaves a room that still
 * works.
 */

const REDUCED = (() => {
  try {
    return typeof window !== 'undefined'
      && typeof window.matchMedia === 'function'
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch {
    return false;
  }
})();

const HULL = '#25384a';
const HULL_LIT = '#33506a';
const TRIM = '#7f9bb3';
const LIT = '#22d3ee';
const WARM = '#f5a524';
const GO = '#34d399';
const INK = '#dbe8f2';

/** A filled gauge that is honest at zero: empty frame, no minimum sliver. */
function Gauge({ x, y, w, h, pct, vertical = false }) {
  const p = typeof pct === 'number' ? Math.max(0, Math.min(1, pct)) : 0;
  const tone = p >= 1 ? GO : p > 0 ? LIT : 'none';
  const fill = vertical
    ? { x, y: y + h * (1 - p), width: w, height: h * p }
    : { x, y, width: w * p, height: h };
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="3" fill="#0d1a25" stroke={TRIM} strokeWidth="1.5" opacity="0.9" />
      {p > 0 && <rect {...fill} rx="2" fill={tone} opacity="0.85" />}
    </g>
  );
}

/**
 * ---- THE VIEWPORT IS ON THE WALL. (Found in the first rendered frame.) ----
 *
 * It was a floor station like everything else, which drew a 90-pixel porthole
 * hanging in mid-air near the back wall at the depth scale of a bar stool. A
 * window is part of the hull: fixed to the back wall, big, and not subject to
 * the floor projection at all. The renderer caught this before she did, which
 * is the entire reason the renderer exists.
 */
function Viewport({ reading, active, onPick }) {
  const empty = reading?.empty;
  const pct = typeof reading?.pct === 'number' ? reading.pct : null;
  const cx = (BACK.x1 + BACK.x2) / 2;
  const cy = BACK.y1 + (BACK.y2 - BACK.y1) * 0.42;

  return (
    <g onClick={() => onPick?.('viewport')} style={{ cursor: 'pointer' }} role="button" tabIndex={0}
      aria-label={`Viewport — ${empty ? 'nothing on the scope yet' : reading?.label}`}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onPick?.('viewport'); }}>
      <ellipse cx={cx} cy={cy} rx="252" ry="150" fill="#04070e" stroke={TRIM} strokeWidth="10" />
      <ellipse cx={cx} cy={cy} rx="252" ry="150" fill="none" stroke="#0a1622" strokeWidth="18" opacity="0.7" />
      {!empty && (
        <>
          {/* The destination, out there, growing as he closes on it. */}
          <circle cx={cx + 40} cy={cy - 18} r={18 + 44 * (pct ?? 0)} fill={WARM} opacity="0.92" />
          <ellipse cx={cx + 40} cy={cy - 18} rx={(18 + 44 * (pct ?? 0)) * 1.9} ry={(18 + 44 * (pct ?? 0)) * 0.42}
            fill="none" stroke={WARM} strokeWidth="3" opacity="0.4" transform={`rotate(-18 ${cx + 40} ${cy - 18})`} />
        </>
      )}
      {[[-150, -70], [-64, 62], [96, -92], [170, 40], [-190, 24], [22, 96], [140, -22]].map(([dx, dy], i) => (
        <circle key={i} cx={cx + dx} cy={cy + dy} r="2.6" fill={INK} opacity="0.75">
          {!REDUCED && <animate attributeName="opacity" values="0.75;0.2;0.75" dur={`${5 + i * 1.9}s`} repeatCount="indefinite" />}
        </circle>
      ))}
      <text x={cx} y={cy + 186} textAnchor="middle" fontSize="20" fill={active ? LIT : INK} opacity="0.85">
        {empty ? 'Viewport — nothing on the scope yet' : `${reading?.detail || 'Heading for'} ${reading?.label}`}
      </text>
    </g>
  );
}

/** One station, drawn on the floor at its own depth. */
function Station({ station, reading, active, onPick }) {
  const spot = projectFloor(station.u, station.v);
  const k = depth(spot.y);
  const shadow = contactShadow(46, spot.y);
  const pct = reading?.pct;
  const empty = reading?.empty;

  return (
    <g
      transform={`translate(${spot.x} ${spot.y}) scale(${k})`}
      onClick={() => onPick?.(station.id)}
      style={{ cursor: 'pointer' }}
      role="button"
      tabIndex={0}
      aria-label={`${station.name}${empty ? ' — nothing recorded yet' : ''}`}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onPick?.(station.id); }}
    >
      <ellipse cx="0" cy="2" rx={shadow.rx / k} ry={shadow.ry / k} fill="#000" opacity={LIGHT.contact.from} />

      {station.reads === 'deck-change' ? (
        // The ladder: two rails and five rungs, drawn going up out of frame.
        <g stroke={TRIM} strokeWidth="4" fill="none">
          {/* The hatch it leads to. A ladder to nothing is a prop; a ladder to
              a hatch is a way out. */}
          <rect x="-34" y="-186" width="68" height="34" rx="6" fill="#0a151f" />
          <line x1="-18" y1="0" x2="-18" y2="-150" />
          <line x1="18" y1="0" x2="18" y2="-150" />
          {[0, 1, 2, 3, 4].map((i) => (
            <line key={i} x1="-18" y1={-18 - i * 30} x2="18" y2={-18 - i * 30} />
          ))}
        </g>
      ) : station.reads === 'rank' ? (
        // The pilot's seat, back to us, rank plate on the headrest.
        <g>
          <path d="M-52 0 L-44 -108 Q0 -126 44 -108 L52 0 Z" fill={HULL_LIT} stroke={TRIM} strokeWidth="3" />
          {/* The plate is sized to the longest rank name, not to the drawing
              that looked fine with no text in it — "Flight Cadet" overran a
              68-wide plate in the first frame. */}
          <rect x="-60" y="-106" width="120" height="26" rx="4" fill="#0d1a25" stroke={TRIM} strokeWidth="1.5" />
          <rect x="-40" y="-8" width="80" height="12" rx="4" fill={HULL} stroke={TRIM} strokeWidth="2" />
        </g>
      ) : station.reads === 'awards' ? (
        // The badge rack: pegs, and a badge on a peg only where one was earned.
        <g>
          <rect x="-86" y="-104" width="172" height="104" rx="6" fill={HULL} stroke={TRIM} strokeWidth="3" />
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const cx = -66 + (i % 3) * 66;
            const cy = -76 + Math.floor(i / 3) * 46;
            const earned = !empty && i < Math.min(6, Number(String(reading?.detail || '0').split(' ')[0]) || 0);
            return earned
              ? <circle key={i} cx={cx} cy={cy} r="15" fill={WARM} stroke="#7a4d00" strokeWidth="2" />
              : <circle key={i} cx={cx} cy={cy} r="15" fill="none" stroke={TRIM} strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />;
          })}
        </g>
      ) : station.id === 'fuel-tanks' ? (
        // Two tanks, filled to the real number and no further.
        <g>
          {[-44, 44].map((dx) => (
            <g key={dx} transform={`translate(${dx} 0)`}>
              <rect x="-30" y="-150" width="60" height="150" rx="26" fill={HULL} stroke={TRIM} strokeWidth="3" />
              <Gauge x={-22} y={-142} w={44} h={134} pct={pct} vertical />
            </g>
          ))}
        </g>
      ) : (
        // Every other station is a console: a body, a screen, one gauge.
        <g>
          <path d="M-72 0 L-64 -74 L64 -74 L72 0 Z" fill={HULL} stroke={TRIM} strokeWidth="3" />
          <rect x="-54" y="-66" width="108" height="42" rx="4" fill="#07131d" stroke={TRIM} strokeWidth="1.5" />
          <Gauge x={-46} y={-56} w={92} h={10} pct={pct} />
          {!empty && !REDUCED && (
            <circle cx="46" cy="-36" r="4" fill={GO}>
              <animate attributeName="opacity" values="1;0.2;1" dur="3s" repeatCount="indefinite" />
            </circle>
          )}
          {empty && <circle cx="46" cy="-36" r="4" fill={TRIM} opacity="0.4" />}
        </g>
      )}

      {/* The label, and — when there is nothing to show — the reason why. */}
      {/* The rank plate on the headrest — the record, not the furniture's name. */}
      {station.reads === 'rank' && !empty && (
        <text x="0" y="-88" textAnchor="middle" fontSize="15" fill={LIT} opacity="0.95">{reading.label}</text>
      )}

      <text x="0" y="24" textAnchor="middle" fontSize="15" fill={active ? LIT : INK} opacity={active ? 1 : 0.75}>
        {station.name}
      </text>
      {reading?.detail && (
        <text x="0" y="42" textAnchor="middle" fontSize="12.5" fill={INK} opacity="0.55">{reading.detail}</text>
      )}
    </g>
  );
}

/**
 * The deck itself: hull walls, floor plates, then the stations back to front.
 */
export function ShipInterior({
  shipStatus = null,
  journey = null,
  rank = null,
  awards = [],
  avatar,
  gear,
  onLeave,
  startDeck = HOME_DECK
}) {
  const [deckId, setDeckId] = useState(startDeck);
  const [standing, setStanding] = useState(() => arrivalOn(startDeck));
  const [atId, setAtId] = useState(null);

  const deck = DECKS.find((d) => d.id === deckId) || DECKS[0];
  const stations = useMemo(() => stationsOn(deckId), [deckId]);
  const readings = useMemo(() => {
    const map = {};
    for (const s of STATIONS) map[s.id] = stationReading(s, { shipStatus, journey, rank, awards });
    return map;
  }, [shipStatus, journey, rank, awards]);

  const walkTo = (stationId) => {
    const station = STATIONS.find((s) => s.id === stationId);
    if (!station) return;
    if (station.reads === 'deck-change') {
      const next = otherDeck(deckId);
      setDeckId(next);
      setStanding(arrivalOn(next));
      setAtId(null);
      return;
    }
    setStanding({ u: station.u, v: Math.min(0.95, station.v + 0.1) });
    setAtId(stationId);
  };

  const foot = projectFloor(standing.u, standing.v);
  const k = depth(foot.y);
  const here = atId ? STATIONS.find((s) => s.id === atId) : null;
  const hereReading = atId ? readings[atId] : null;

  return (
    <div className="rounded-xl border border-space-700 bg-space-900 p-3 shadow-panel">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">{deck.name}</p>
          <p className="text-xs text-ink-500">{deck.blurb}</p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => walkTo(stations.find((s) => s.reads === 'deck-change')?.id)}
            className="rounded-lg border border-space-600 px-3 py-1.5 font-display text-xs font-700 text-ink-100 hover:border-signal-cyan"
          >
            {deckId === 'hold' ? 'Up to the flight deck' : 'Down to the hold'}
          </button>
          {onLeave && (
            <button
              type="button"
              onClick={onLeave}
              className="rounded-lg border border-space-600 px-3 py-1.5 font-display text-xs font-700 text-ink-400 hover:text-ink-100"
            >
              Step outside
            </button>
          )}
        </div>
      </div>

      <svg viewBox={`0 0 ${VB.w} ${VB.h}`} className="w-full rounded-lg" role="img" aria-label={`Inside the ship — ${deck.name}`}>
        <defs>
          <radialGradient id="si-screenlight" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={LIGHT.screen.hot} stopOpacity={LIGHT.screen.max} />
            <stop offset="100%" stopColor={LIGHT.screen.edge} stopOpacity="0" />
          </radialGradient>
          <radialGradient id="si-vignette" cx="50%" cy="50%" r="72%">
            <stop offset="55%" stopColor="#000" stopOpacity="0" />
            <stop offset="100%" stopColor="#000" stopOpacity={LIGHT.vignette} />
          </radialGradient>
          <linearGradient id="si-floor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#16232f" />
            <stop offset="100%" stopColor="#0b131b" />
          </linearGradient>
        </defs>

        {/* Hull: back wall, then the floor running to the front edge. */}
        <rect x="0" y="0" width={VB.w} height={VB.h} fill="#080f16" />
        <rect x={BACK.x1} y={BACK.y1} width={BACK.x2 - BACK.x1} height={BACK.y2 - BACK.y1} fill={HULL} />
        <path d={`M0 ${VB.h} L${BACK.x1} ${BACK.y2} L${BACK.x2} ${BACK.y2} L${VB.w} ${VB.h} Z`} fill="url(#si-floor)" />
        <path d={`M0 0 L${BACK.x1} ${BACK.y1} L${BACK.x1} ${BACK.y2} L0 ${VB.h} Z`} fill={HULL} opacity="0.75" />
        <path d={`M${VB.w} 0 L${BACK.x2} ${BACK.y1} L${BACK.x2} ${BACK.y2} L${VB.w} ${VB.h} Z`} fill={HULL} opacity="0.75" />
        <path d={`M0 0 L${BACK.x1} ${BACK.y1} L${BACK.x2} ${BACK.y1} L${VB.w} 0 Z`} fill="#0e1a24" />

        {/* Ribs, so it reads as a fuselage rather than a box. */}
        {[0.2, 0.45, 0.7].map((t) => (
          <path
            key={t}
            d={`M${BACK.x1 * (1 - t)} ${BACK.y2 + t * (VB.h - BACK.y2)} L${BACK.x1 * (1 - t) + 6} ${BACK.y1 * (1 - t)} `}
            stroke={TRIM}
            strokeWidth="2"
            opacity="0.18"
            fill="none"
          />
        ))}

        {/* Cool wash from the panels — the only light source in here. */}
        <ellipse cx={VB.w / 2} cy={BACK.y2} rx="620" ry="300" fill="url(#si-screenlight)" opacity="0.5" />

        {/* The window is hull, so it is drawn with the hull rather than
            among the furniture — and only on the deck that has one. */}
        {stations.some((s) => s.reads === 'journey') && (
          <Viewport reading={readings.viewport} active={atId === 'viewport'} onPick={walkTo} />
        )}

        {stations.filter((s) => s.reads !== 'journey').map((s) => (
          <Station key={s.id} station={s} reading={readings[s.id]} active={atId === s.id} onPick={walkTo} />
        ))}

        {/* The cadet, at whatever he last walked to. */}
        <g
          transform={`translate(${foot.x} ${foot.y}) scale(${k * FIGURE_SCALE})`}
          style={{ transition: REDUCED ? undefined : 'transform 700ms cubic-bezier(.4,0,.2,1)' }}
        >
          <g transform={`translate(0 ${-FIGURE_FEET_Y})`}>
            <CadetAvatar avatar={avatar} gear={gear} stance={here ? 'lift' : 'stand'} raw animate={!REDUCED} />
          </g>
        </g>

        <rect x="0" y="0" width={VB.w} height={VB.h} fill="url(#si-vignette)" pointerEvents="none" />
      </svg>

      {/* What he is standing at, in words. Empty states say what fills them. */}
      <div className="mt-2 min-h-[3.25rem] rounded-lg border border-space-700 bg-space-950 px-3 py-2">
        {here ? (
          <>
            <p className="font-display text-sm font-700 text-ink-100">
              {here.name}
              {hereReading?.detail ? <span className="ml-2 text-xs font-400 text-ink-500">{hereReading.detail}</span> : null}
            </p>
            <p className="mt-0.5 text-xs text-ink-400">
              {hereReading?.empty && hereReading?.note ? hereReading.note : here.doing}
            </p>
          </>
        ) : (
          <p className="text-xs text-ink-500">
            Tap a station to walk over to it. The ladder moves you between decks.
          </p>
        )}
      </div>
    </div>
  );
}
