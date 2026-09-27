import { useEffect, useMemo, useRef, useState } from 'react';
import { CadetAvatar } from './CadetAvatar.jsx';
import {
  DECKS, HULL, ROOM, SHAFT, VIEW,
  cellsOn, cellFor, deckOfCell, routeBetween, shaftSpot, standingSpot, tierFor, TIER_NAMES
} from '../../lib/shipCutaway.js';
import { STATIONS, readinessLine, shipIsFlightReady, stationReading } from '../../lib/shipInterior.js';

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
function Room({ cell, station, reading, active, onPick }) {
  const tier = tierFor(reading?.pct);
  const empty = reading?.empty;

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

export function ShipCutaway({
  shipStatus = null,
  journey = null,
  rank = null,
  awards = [],
  crew = [],
  avatar,
  gear,
  onLeave
}) {
  const readings = useMemo(() => {
    const map = {};
    for (const s of STATIONS) map[s.id] = stationReading(s, { shipStatus, journey, rank, awards });
    return map;
  }, [shipStatus, journey, rank, awards]);

  const [atId, setAtId] = useState('pilot-seat');
  const [pos, setPos] = useState(() => standingSpot('pilot-seat') || { x: HULL.x + 100, y: DECKS[0].floor });
  const [walking, setWalking] = useState(false);
  const legs = useRef([]);

  /**
   * The walk itself: step through the route one point at a time, each step a
   * CSS transition. Cleared on unmount and on a new destination so two walks
   * can never fight over the same figure — the bug that would show up as him
   * sliding backwards across the ship.
   */
  useEffect(() => () => legs.current.forEach(clearTimeout), []);

  const walkTo = (stationId) => {
    const station = STATIONS.find((s) => s.id === stationId);
    if (!station || !cellFor(stationId)) return;
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
  const hereReading = atId ? readings[atId] : null;
  const flightReady = shipIsFlightReady(shipStatus) === true;

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
        {[-1, 1].map((side) => {
          const baseY = DECKS[DECKS.length - 1].floor + 30;
          return (
            <path key={side}
              d={`M${HULL.x + HULL.w / 2 + side * 150} ${baseY} l${side * 80} 64 l${-side * 160} 0 Z`}
              fill={HULL_MID} stroke={TRIM} strokeWidth="3" />
          );
        })}

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
                  active={atId === cell.id} onPick={walkTo} />
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

      <div className="mt-2 min-h-[3.5rem] rounded-lg border border-space-700 bg-space-950 px-3 py-2">
        {here ? (
          <>
            <p className="font-display text-sm font-700 text-ink-100">
              {here.name}
              {hereReading?.detail ? <span className="ml-2 text-xs font-400 text-ink-500">{hereReading.detail}</span> : null}
            </p>
            <p className="mt-0.5 text-xs text-ink-400">
              {hereReading?.empty && hereReading?.note ? hereReading.note : here.doing}
            </p>
            {hereReading?.nextStep && (
              <p className={'mt-1 text-xs font-display font-700 ' + (hereReading.built ? 'text-signal-green' : 'text-signal-cyan')}>
                {hereReading.nextStep}
              </p>
            )}
          </>
        ) : (
          <p className="text-xs text-ink-500">Tap a room and he walks to it. The shaft is the lift between decks.</p>
        )}
      </div>
    </div>
  );
}
