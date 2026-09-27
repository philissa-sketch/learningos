import { useEffect, useMemo, useRef, useState } from 'react';
import { CadetAvatar } from './CadetAvatar.jsx';
import {
  DECKS, HULL, ROOM, SHAFT, VIEW,
  cellsOn, cellFor, deckOfCell, routeBetween, shaftSpot, standingSpot, tierFor, TIER_NAMES
} from '../../lib/shipCutaway.js';
import { STATIONS, readinessLine, shipIsFlightReady, stationReading } from '../../lib/shipInterior.js';
import { roomInterior, roomIsSealed } from '../../lib/shipRoom.js';
import { ShipRoomCard } from './ShipRoomCard.jsx';

/**
 * =============================================================================
 * THE SHIP, OPEN DOWN THE MIDDLE.
 * =============================================================================
 *
 * The parent asked for the moving parts to work like the shelter game her son
 * plays. Four things were wanted, and this file is the first two:
 *
 *   1. the whole vehicle visible at once, in cross-section   <- here
 *   2. people who walk between rooms and work in them        <- here
 *   3. crew posted to a station by hand                      <- next
 *   4. rooms that visibly improve as their subject fills     <- here (tiers)
 *
 * ---- WHAT IS DELIBERATELY NOT COPIED ----
 *
 * The tap-to-collect timer. In that game a room fills up on the clock and you
 * tap to harvest it, which rewards coming back rather than doing anything.
 * Here the rooms fill from his actual record — Khan units, books, workouts,
 * writing — so the thing that produces is the work. Same loop, honest cause.
 *
 * ---- HOW IT MOVES ----
 *
 * CSS transforms and SVG only, as the build spec requires: no engine, no
 * canvas, no per-frame React. A walk is a chain of CSS transitions along the
 * points `routeBetween` returns, with a leg cycle running while it moves, and
 * `prefers-reduced-motion` turns the whole thing into an instant arrival.
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

const HULL_DARK = '#16222e';
const HULL_MID = '#22394d';
const TRIM = '#7f9bb3';
const LIT = '#22d3ee';
const WARM = '#f5a524';
const GO = '#34d399';
const INK = '#dbe8f2';
const WALK_MS = 900;

/** A gauge that is honest at zero — empty frame, no minimum sliver. */
function Bar({ x, y, w, h, pct }) {
  const p = typeof pct === 'number' ? Math.max(0, Math.min(1, pct)) : 0;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="3" fill="#0a151f" stroke={TRIM} strokeWidth="1.2" opacity="0.85" />
      {p > 0 && <rect x={x} y={y} width={w * p} height={h} rx="3" fill={p >= 1 ? GO : LIT} opacity="0.9" />}
    </g>
  );
}

/**
 * ---- WHAT A ROOM HOLDS AT EACH TIER ----
 *
 * Equipment ARRIVES as the work comes in: a bare room gains a bench, then
 * instruments, then the finished fit-out. This is the shelter game's upgrade
 * feeling without an upgrade button — there is nothing to buy and nothing
 * stored, because the tier is read from the same percentage the hull reports.
 */
function Fitout({ cell, reading }) {
  const tier = tierFor(reading?.pct);
  const w = cell.w;
  const floorY = cell.floor - cell.y;
  const mid = w / 2;
  const kit = [];

  // Tier 1: a bench or console appears.
  if (tier >= 1) {
    kit.push(
      <g key="bench">
        <rect x={mid - 58} y={floorY - 64} width="116" height="58" rx="6" fill={HULL_MID} stroke={TRIM} strokeWidth="2" />
        <rect x={mid - 44} y={floorY - 56} width="88" height="26" rx="3" fill="#07131d" stroke={TRIM} strokeWidth="1" />
      </g>
    );
  }
  // Tier 2: instruments on the wall behind it.
  if (tier >= 2) {
    kit.push(
      <g key="instruments">
        {/* Lit instruments, not empty boxes: the first frame of a finished
            ship showed three blank squares per room, which read as missing
            art rather than as equipment. */}
        {[-1, 0, 1].map((i) => (
          <g key={i} transform={`translate(${mid + i * 40 - 15} ${floorY - 134})`}>
            <rect width="30" height="30" rx="3" fill="#07131d" stroke={TRIM} strokeWidth="1.4" />
            <rect x="5" y="6" width="20" height="12" rx="2" fill={tier >= 3 ? GO : LIT} opacity="0.55" />
            <line x1="5" y1="23" x2="25" y2="23" stroke={TRIM} strokeWidth="1.5" opacity="0.6" />
          </g>
        ))}
        <rect x={mid - 70} y={floorY - 150} width="140" height="6" rx="3" fill={HULL_MID} />
      </g>
    );
  }
  // Tier 3: the full fit-out, and the room lights up.
  if (tier >= 3) {
    kit.push(
      <g key="complete">
        <rect x={8} y={18} width={w - 16} height={floorY - 26} rx="8" fill={GO} opacity="0.07" />
        {[0.25, 0.75].map((f) => (
          <circle key={f} cx={w * f} cy={30} r="5" fill={GO}>
            {!REDUCED && <animate attributeName="opacity" values="1;0.3;1" dur="2.6s" repeatCount="indefinite" />}
          </circle>
        ))}
      </g>
    );
  }
  return <g>{kit}</g>;
}

/** One room in the cutaway. */
function Room({ cell, station, reading, active, sealed = false, onPick }) {
  const tier = tierFor(reading?.pct);
  const empty = reading?.empty;

  /**
   * ---- A SEALED ROOM IS A SHUT HATCH, NOT A DIMMED ROOM. (Sept 27, 2026.) ----
   *
   * The parent's note was that the rooms "should open with growth but not the
   * finality of the ship" — the first version drew all ten finished on day
   * one. A hatch shows no fit-out, no bar, and not even the room's name: what
   * is behind it is the reward for opening it, and a room that advertises
   * itself is a shop window. The plate says SEALED and the panel underneath
   * says what opens it, once he taps.
   */
  if (sealed) {
    const midY = cell.h / 2;
    return (
      <g
        transform={`translate(${cell.x} ${cell.y})`}
        onClick={() => onPick?.(station.id)}
        style={{ cursor: 'pointer' }}
        role="button"
        tabIndex={0}
        aria-label={`Sealed hatch — ${station.name} has not been started`}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onPick?.(station.id); }}
      >
        <rect x="2" y="2" width={cell.w - 4} height={cell.h - 4} rx="10"
          fill="#0b131b" stroke={active ? TRIM : '#2a3d4e'} strokeWidth={active ? 2.4 : 1.4} />
        {/* Riveted plate across the opening. */}
        <rect x="16" y={midY - 62} width={cell.w - 32} height="124" rx="8"
          fill="#12202c" stroke="#33485b" strokeWidth="2" />
        {[0, 1, 2, 3].map((i) => (
          <circle key={i} cx={28 + i * ((cell.w - 56) / 3)} cy={midY - 48} r="3" fill="#33485b" />
        ))}
        {[0, 1, 2, 3].map((i) => (
          <circle key={`b${i}`} cx={28 + i * ((cell.w - 56) / 3)} cy={midY + 48} r="3" fill="#33485b" />
        ))}
        {/* The seam, so it reads as something that could open. */}
        <line x1={cell.w / 2} y1={midY - 56} x2={cell.w / 2} y2={midY + 56} stroke="#0b131b" strokeWidth="3" />
        <text x={cell.w / 2} y={midY + 5} textAnchor="middle" fontSize="15" fill="#6b8aa3" opacity="0.9"
          letterSpacing="3">SEALED</text>
      </g>
    );
  }

  return (
    <g
      transform={`translate(${cell.x} ${cell.y})`}
      onClick={() => onPick?.(station.id)}
      style={{ cursor: 'pointer' }}
      role="button"
      tabIndex={0}
      aria-label={`${station.name} — ${TIER_NAMES[tier]}`}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onPick?.(station.id); }}
    >
      <rect x="2" y="2" width={cell.w - 4} height={cell.h - 4} rx="10"
        fill={HULL_DARK} stroke={active ? LIT : TRIM} strokeWidth={active ? 3 : 1.6} opacity={active ? 1 : 0.9} />

      {/* The floor of the room, which is what everybody stands on. */}
      <rect x="2" y={cell.h - 26} width={cell.w - 4} height="24" fill="#0c1721" />

      {station.reads === 'journey' ? (
        // The window is the one room that looks outward.
        <g>
          <ellipse cx={cell.w / 2} cy={cell.h / 2 - 30} rx={cell.w / 2 - 34} ry={cell.h / 2 - 70}
            fill="#04070e" stroke={TRIM} strokeWidth="6" />
          {!empty && (
            <circle cx={cell.w / 2 + 20} cy={cell.h / 2 - 40} r={14 + 30 * (reading?.pct ?? 0)} fill={WARM} opacity="0.92" />
          )}
          {[[-60, -90], [40, -60], [-20, 10], [66, 24]].map(([dx, dy], i) => (
            <circle key={i} cx={cell.w / 2 + dx} cy={cell.h / 2 + dy} r="2.4" fill={INK} opacity="0.7">
              {!REDUCED && <animate attributeName="opacity" values="0.7;0.2;0.7" dur={`${5 + i * 2}s`} repeatCount="indefinite" />}
            </circle>
          ))}
        </g>
      ) : (
        <Fitout cell={cell} reading={reading} />
      )}

      {/* The plate over the door: what this room is, and how far along. */}
      <rect x="10" y="10" width={cell.w - 20} height="34" rx="6" fill="#0a1017" opacity="0.92" />
      {/* Fitted, not clipped: "Guidance Console" ran outside its plate in the
          first frame, and a narrower room would clip any of them. */}
      <text
        x={cell.w / 2} y="33" textAnchor="middle" fontSize="16" fill={active ? LIT : INK} opacity="0.95"
        textLength={station.name.length * 9 > cell.w - 28 ? cell.w - 28 : undefined}
        lengthAdjust="spacingAndGlyphs"
      >
        {station.name}
      </text>
      {typeof reading?.pct === 'number' && (
        <Bar x={14} y={cell.h - 22} w={cell.w - 28} h={8} pct={reading.pct} />
      )}
    </g>
  );
}

/** A figure that walks: legs alternate while moving, still when posted. */
/**
 * A figure that walks. `scale` is against the ROOM, not the drawing: the first
 * frame had him as tall as the room he was standing in, because a figure sized
 * for a perspective floor is enormous in a flat elevation.
 */
function Walker({ x, y, walking, avatar, gear, scale = 0.62, label = null }) {
  return (
    <g
      transform={`translate(${x} ${y})`}
      style={{ transition: REDUCED ? undefined : `transform ${WALK_MS}ms linear` }}
    >
      <ellipse cx="0" cy="0" rx={26 * scale} ry={7 * scale} fill="#000" opacity="0.45" />
      <g transform={`translate(0 ${-4}) scale(${scale})`} className={walking && !REDUCED ? 'ship-walking' : undefined}>
        <g transform="translate(0 -29)">
          <CadetAvatar avatar={avatar} gear={gear} stance="stand" raw animate={!REDUCED} />
        </g>
      </g>
      {/* Above the head, inside the room: under the feet it crossed the floor
          line into the deck below in the first frame. */}
      {/* Clear of the figure's own head, whatever it is scaled to — measured
          against the avatar's drawn height rather than guessed. */}
      {label && (
        <text x="0" y={-(170 * scale) - 6} textAnchor="middle" fontSize="12" fill={INK} opacity="0.75">{label}</text>
      )}
    </g>
  );
}

/**
 * ---- THE FOUR PARTS HE CAN BUY. (Moved here Sept 27, 2026.) ----
 *
 * These used to bolt onto the flat drawing on the My Ship screen, which the
 * parent asked to remove once the cutaway could be walked into. They had to
 * come with it: a store that sells a thing which then appears nowhere is the
 * exact fault `verify-store-visibility` exists to prevent.
 *
 * All four are EXTERIOR — boosters, a heat shield, an antenna, a solar array —
 * so they sit outside the cut, around a hull that is already drawn in
 * elevation. Nothing here reads a counter: a part is on the ship if it was
 * bought, and absent if it was not.
 */
const MOUNT_LABEL = {
  'eq-solar': 'Solar array',
  'eq-antenna': 'Antenna',
  'eq-heatshield': 'Heat shield',
  'eq-booster': 'Boosters'
};

/** Drawn under the fins so the fins sit on top of the shield, as they would. */
function HeatShield() {
  return (
    // Spans the full hull width. Inset from the walls it read as a stray band
    // floating under the ship rather than as the base of it.
    <path d="M170 818 Q600 868 1030 818 L1030 844 Q600 894 170 844 Z"
      stroke={WARM} strokeWidth="3" fill="rgba(245,165,36,.12)" />
  );
}

function Boosters() {
  return (
    <g stroke={WARM} strokeWidth="2.5" fill="rgba(245,165,36,.10)">
      {/* Flush with the hull wall (x 160 and 1040), not floating beside it. */}
      <rect x="108" y="600" width="52" height="224" rx="22" />
      <rect x="1040" y="600" width="52" height="224" rx="22" />
      <path d="M134 824 L134 858 M1066 824 L1066 858" strokeLinecap="round" />
    </g>
  );
}

function SolarArray() {
  return (
    <g stroke={GO} strokeWidth="2.5" fill="rgba(52,211,153,.14)">
      <rect x="18" y="380" width="130" height="92" rx="5" />
      <rect x="1052" y="380" width="130" height="92" rx="5" />
      <path d="M148 426 L160 426 M1052 426 L1040 426" />
      <path d="M52 380 L52 472 M96 380 L96 472 M1104 380 L1104 472 M1148 380 L1148 472" opacity=".55" />
    </g>
  );
}

function Antenna() {
  return (
    /**
     * A dish seen edge-on, on a mast bolted to the hull wall. The first render
     * drew it as an open arc, which read as a hook hanging in space — a dish
     * needs a face you can see it pointing with.
     */
    <g stroke={LIT} strokeWidth="2.5" fill="rgba(34,211,238,.14)">
      <ellipse cx="98" cy="300" rx="15" ry="46" transform="rotate(-30 98 300)" />
      <path d="M98 300 L158 312" />
      <path d="M98 300 L70 276" />
      <circle cx="70" cy="276" r="6" fill={LIT} />
    </g>
  );
}

const MOUNT_ART = {
  'eq-heatshield': <HeatShield />,
  'eq-booster': <Boosters />,
  'eq-solar': <SolarArray />,
  'eq-antenna': <Antenna />
};

export function ShipCutaway({
  shipStatus = null,
  journey = null,
  rank = null,
  awards = [],
  crew = [],
  avatar,
  gear,
  onLeave,
  /**
   * ---- THE THREE THINGS THIS FILE REFUSES TO KNOW. (Sept 27, 2026.) ----
   *
   * `supplyFor(systemId)` returns what is inside a room — this Academy's own
   * units, books, entries and logs. `onOpenNext(next)` takes him to wherever
   * that work is done; the destination travels inside `next`, as data, so no
   * screen name is written here. `onRunJob(systemId, payload)` runs the
   * station job against the real ledger.
   *
   * All three are optional. Given none, the ship still draws and still walks —
   * it just has nothing to do inside it, which is what the guards render.
   */
  supplyFor = null,
  onOpenNext = null,
  onRunJob = null,
  /** The cosmetics he has actually bought. Only the four hull parts are read. */
  owned = null
}) {
  const readings = useMemo(() => {
    const map = {};
    for (const s of STATIONS) map[s.id] = stationReading(s, { shipStatus, journey, rank, awards });
    return map;
  }, [shipStatus, journey, rank, awards]);

  const [atId, setAtId] = useState('pilot-seat');
  const [pos, setPos] = useState(() => standingSpot('pilot-seat') || { x: HULL.x + 100, y: DECKS[0].floor });
  const [walking, setWalking] = useState(false);
  const [jobBusy, setJobBusy] = useState(false);
  const [jobResult, setJobResult] = useState(null);
  const legs = useRef([]);

  /**
   * The walk itself: step through the route one point at a time, each step a
   * CSS transition. Cleared on unmount and on a new destination so two walks
   * can never fight over the same figure — the bug that would show up as him
   * sliding backwards across the ship.
   */
  useEffect(() => () => legs.current.forEach(clearTimeout), []);

  /**
   * ---- WALKING STOPS AT A SEALED HATCH ----
   *
   * Tapping one still SELECTS it, so the panel underneath can say what opens
   * it — but nobody walks into a room that is not there yet. Keeping the
   * figure out of sealed rooms is most of what makes the ship feel like it
   * grows rather than like parts of it are switched off.
   */
  const walkTo = (stationId) => {
    const station = STATIONS.find((s) => s.id === stationId);
    if (!station || !cellFor(stationId)) return;
    setJobResult(null);
    if (roomIsSealed(station, readings[stationId])) {
      setAtId(stationId);
      return;
    }
    legs.current.forEach(clearTimeout);
    legs.current = [];
    setAtId(stationId);

    const fromDeck = deckOfCell(atId) || DECKS[0].id;
    const route = routeBetween(fromDeck, pos.x, stationId).slice(1);
    if (REDUCED || route.length === 0) {
      setPos(standingSpot(stationId));
      return;
    }
    setWalking(true);
    route.forEach((point, i) => {
      legs.current.push(setTimeout(() => {
        setPos(point);
        if (i === route.length - 1) {
          legs.current.push(setTimeout(() => setWalking(false), WALK_MS));
        }
      }, i * WALK_MS));
    });
  };

  const here = STATIONS.find((s) => s.id === atId) || null;
  const flightReady = shipIsFlightReady(shipStatus) === true;

  /** The bought hull parts, in a fixed order so the drawing never reshuffles. */
  const mounted = useMemo(
    () => Object.keys(MOUNT_ART).filter((id) => owned && owned.has && owned.has(id)),
    [owned]
  );

  /**
   * The inside of the room he is in. `supplyFor` is asked only for a room that
   * is actually open — a sealed room must not even assemble its contents, or a
   * stray render would leak what is behind the hatch into the DOM.
   */
  const interior = useMemo(() => {
    if (!here) return null;
    const reading = readings[here.id];
    const sealed = roomIsSealed(here, reading);
    // Keyed by system where a room has one, and by the room's own id where it
    // does not — the badge rack holds badges, not a subject's output.
    const supply = !sealed && supplyFor ? supplyFor(here.system || here.id) : null;
    return roomInterior(here, reading, supply);
  }, [here, readings, supplyFor]);

  return (
    <div className="rounded-xl border border-space-700 bg-space-900 p-3 shadow-panel">
      <style>{`
        @keyframes ship-step { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-3px) } }
        .ship-walking { animation: ship-step 320ms steps(2, end) infinite; }
        @media (prefers-reduced-motion: reduce) { .ship-walking { animation: none } }
      `}</style>

      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">The Ship</p>
          <p className={'text-xs ' + (flightReady ? 'text-signal-green' : 'text-ink-500')}>{readinessLine(shipStatus)}</p>
          {/*
            The flat drawing used to carry this sentence. It answers a real
            question — "I bought a booster, where did it go?" — so it moved
            with the parts rather than being dropped with the picture.
          */}
          <p className="mt-0.5 text-[11px] text-ink-600">
            {mounted.length === 0
              ? 'Boosters, a heat shield, an antenna and a solar array can be bought in the Supply store and bolted on.'
              : `${mounted.length} of 4 bought parts mounted: ${mounted.map((id) => MOUNT_LABEL[id]).join(', ')}.`}
          </p>
        </div>
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

      <svg viewBox={`0 0 ${VIEW.w} ${VIEW.h}`} className="w-full" role="img" aria-label="The ship in cross-section">
        <rect x="0" y="0" width={VIEW.w} height={VIEW.h} fill="#070d14" />

        {/*
          THE HULL. The first rendered frame drew the nose as a triangle across
          the full width, which read as the roof of a house sitting on top of
          the rooms. A nose cone is narrow and tall and sits ABOVE the top deck
          — the decks live in the cylinder below it.
        */}
        {(() => {
          // An ogive, not a triangle: the sides bulge out toward the base, which
          // is what makes a nose cone read as a nose cone rather than a roof.
          const cx = HULL.x + HULL.w / 2;
          const baseY = DECKS[0].head;
          const left = HULL.x - 40;
          const right = HULL.x + HULL.w + 40;
          return (
            <path
              d={`M${cx} ${HULL.y}
                  C ${cx + 150} ${HULL.y + 70}, ${right - 20} ${baseY - 150}, ${right} ${baseY}
                  L ${left} ${baseY}
                  C ${left + 20} ${baseY - 150}, ${cx - 150} ${HULL.y + 70}, ${cx} ${HULL.y} Z`}
              fill={HULL_MID}
              stroke={TRIM}
              strokeWidth="3"
            />
          );
        })()}
        <rect x={HULL.x - 40} y={DECKS[0].head - 6} width={HULL.w + 80}
          height={DECKS[DECKS.length - 1].floor + 40 - DECKS[0].head} rx="26"
          fill={HULL_DARK} stroke={TRIM} strokeWidth="3" />
        {/* The heat shield goes on before the fins, so the fins sit over it. */}
        {mounted.includes('eq-heatshield') && MOUNT_ART['eq-heatshield']}
        {[-1, 1].map((side) => {
          const baseY = DECKS[DECKS.length - 1].floor + 30;
          return (
            <path key={side}
              d={`M${HULL.x + HULL.w / 2 + side * 150} ${baseY} l${side * 80} 64 l${-side * 160} 0 Z`}
              fill={HULL_MID} stroke={TRIM} strokeWidth="3" />
          );
        })}
        {/* Everything else he has bought, bolted to the outside of the hull. */}
        {mounted.filter((id) => id !== 'eq-heatshield').map((id) => (
          <g key={id}>{MOUNT_ART[id]}</g>
        ))}

        {/* The lift shaft, floor to nose. */}
        <rect x={SHAFT.x} y={DECKS[0].head} width={SHAFT.w} height={DECKS[DECKS.length - 1].floor - DECKS[0].head}
          rx="8" fill="#0a1720" stroke={TRIM} strokeWidth="2" />
        {DECKS.map((d) => (
          <rect key={d.id} x={SHAFT.x + 6} y={d.floor - 24} width={SHAFT.w - 12} height="18" rx="4" fill={HULL_MID} opacity="0.8" />
        ))}
        {/* The car, at the deck he is on. An empty shaft read as an empty room
            in the first frame — it needs something in it to be a lift. */}
        <g style={{ transition: REDUCED ? undefined : `transform ${WALK_MS}ms linear` }}
          transform={`translate(0 ${(DECKS.find((d) => d.id === (deckOfCell(atId) || DECKS[0].id)) || DECKS[0]).floor - DECKS[0].floor})`}>
          <rect x={SHAFT.x + 12} y={DECKS[0].floor - 150} width={SHAFT.w - 24} height="146" rx="8"
            fill="#0e1c27" stroke={TRIM} strokeWidth="2" />
          <line x1={SHAFT.x + SHAFT.w / 2} y1={DECKS[0].floor - 150} x2={SHAFT.x + SHAFT.w / 2} y2={DECKS[0].floor - 4}
            stroke={TRIM} strokeWidth="1" opacity="0.35" />
        </g>

        {/* The rooms, deck by deck. */}
        {DECKS.map((deck) => (
          <g key={deck.id}>
            <text x={HULL.x - 26} y={deck.head + 26} textAnchor="end" fontSize="15" fill={TRIM} opacity="0.8"
              transform={`rotate(-90 ${HULL.x - 26} ${deck.head + 26})`}>
              {deck.name}
            </text>
            {cellsOn(deck.id).map((cell) => {
              const station = STATIONS.find((s) => s.id === cell.id);
              if (!station) return null;
              return (
                <Room key={cell.id} cell={cell} station={station} reading={readings[cell.id]}
                  active={atId === cell.id} sealed={roomIsSealed(station, readings[cell.id])}
                  onPick={walkTo} />
              );
            })}
          </g>
        ))}

        {/* Crew already at their posts, and him. */}
        {crew.map((member) => {
          const spot = member.post ? standingSpot(member.post) : null;
          if (!spot) return null;
          return (
            <Walker key={member.id} x={spot.x + 40} y={spot.y} walking={false}
              avatar={member.avatar} gear={{}} scale={0.5} label={member.name} />
          );
        })}
        <Walker x={pos.x} y={pos.y} walking={walking} avatar={avatar} gear={gear} />
      </svg>

      {/*
        ---- THE ROOM HE IS STANDING IN. (Sept 27, 2026.) ----

        This used to be a one-line readout under the picture: the room's name
        and how far along it was. The parent's note was that the rooms look
        like doors that open into somewhere things can be done — so the strip
        became the inside of the room, and a sealed hatch shows one sentence
        instead.
      */}
      <div className="mt-2">
        <ShipRoomCard
          interior={interior}
          busy={jobBusy}
          result={jobResult}
          onOpenNext={onOpenNext ? (next) => onOpenNext(next) : null}
          onRunJob={onRunJob && here?.system
            ? async (job, values) => {
                setJobBusy(true);
                setJobResult(null);
                try {
                  const out = await onRunJob(here.system, { ...(job || {}), ...(values || {}) });
                  setJobResult(out || { ok: true, message: 'Done.' });
                } catch {
                  setJobResult({ ok: false, message: 'That did not save. Try once more.' });
                } finally {
                  setJobBusy(false);
                }
              }
            : null}
        />
      </div>
    </div>
  );
}
