import { useEffect, useMemo, useRef, useState } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import { DEFAULT_AVATAR_ID } from '../../lib/rewards.js';
import { CadetAvatar } from './CadetAvatar.jsx';
import {
  VB, BACK, depth, projectFloor, FIGURE_SCALE, reachYFor,
  LIGHT, CONTACT_RX, CONTACT_RATIO, lampLightAt
} from '../../lib/hqGeometry.js';
import { READINESS_SKILLS } from '../../lib/readiness.js';
import { buildYearPlan } from '../../lib/yearPlan.js';
import { todayDateStr } from '../../lib/scheduler.js';
import {
  awardsEarned, quartersEarned, holoReadout, masteredStars, starField,
  lastFinished, growBoxShoots, benchFlasks, aquariumFish, fishField
} from '../../lib/hqTruth.js';
import { crewRoster, crewSpotFor, standingSpotFor } from '../../lib/hqCrew.js';
import { wanderTick, rollFor, WANDER_TICK_MS } from '../../lib/hqWander.js';
import { academyContent } from '../../content/academyContent.js';

const { allLessons = [] } = academyContent().lessons;
const { HQ_ITEMS = [], MISSION_EQUIPMENT = [] } = academyContent().rewards;

// ---------------------------------------------------------------------------
// MISSION CONTROL HQ — drawn, not arranged.
// (Part 10, built Aug 8, 2026. Third attempt, and the right one.)
//
// Attempt one was a grid of cards. Attempt two moved emoji to coordinates over
// two gradient bands and called it perspective. Neither looked like a room,
// because neither WAS one: emoji are glyphs sitting in front of a background,
// and no amount of positioning turns a glyph into furniture.
//
// This is geometry. One-point perspective with a real vanishing point: back
// wall, two side walls converging to it, a floor plane, and every object drawn
// as SVG shapes standing on that floor. That is what "SVG and CSS drawn in
// code" actually affords, and the earlier versions were a default I had dressed
// up as a limit.
//
// UNOWNED ITEMS ARE DRAWN AS OUTLINES IN PLACE — the empty room shows its own
// floor plan. That is the motivation: a half-built HQ asks to be finished in a
// way a locked card never does.
// ---------------------------------------------------------------------------



const C = {
  wallBack: '#12283c',
  wallSide: '#0d1e2e',
  wallSideDark: '#0a1826',
  ceiling: '#0a1723',
  floor: '#16283a',
  floorFar: '#1b3047',
  line: 'rgba(148,180,206,.10)',
  edge: 'rgba(148,180,206,.22)',
  cyan: '#22D3EE',
  amber: '#F5A524',
  green: '#34D399',
  metal: '#43596e',
  metalLight: '#5d7c99',
  ghost: 'rgba(148,180,206,.28)'
};

/**
 * Spend a material — but only on a piece he owns.
 *
 * An unowned piece is a dashed outline with a price under it, and that is the
 * whole motivation for drawing the empty room in the first place: a half-built
 * HQ asks to be finished in a way a locked card never does. Giving the outline
 * brushed metal and real glass would answer the question the price tag is
 * asking. So every material in this file goes through here, and here says no
 * until he has bought the thing.
 */
const mat = (s, id, unowned = 'none') => (s.solid ? `url(#${id})` : unowned);

/* ===========================================================================
 * PHASE 1 — THE ROOM BREATHES.
 *
 * Twelve idle loops. All of them CSS on SVG, none of them touching React.
 *
 * ---- WHY IT IS A STYLESHEET AND NOT A TIMER ----
 *
 * The build spec is explicit, and it is the right call: **no requestAnimationFrame
 * driving React state.** This component is over fifteen hundred lines and renders
 * eighteen objects, a figure and a light layer. Asking it to re-render sixty times
 * a second would spend a laptop's entire frame budget re-deciding facts that have
 * not changed — on a machine that is simultaneously running his schoolwork.
 *
 * A CSS animation on `transform` or `opacity` runs on the compositor. React never
 * hears about it, the component never re-renders, and the cost of twelve of them
 * is close to the cost of none.
 *
 * ---- WHY THE PERIODS ARE ALL DIFFERENT ----
 *
 * 3s, 6s, 7s, 8s, 9-17s, 11s, 12s, 20s, 23s, 30s, 40s, 1.1s. Straight from the
 * spec, and the variety is the whole point: loops on matching periods drift into
 * step and the room starts pulsing like a machine. Nothing in a real room does
 * that. The fish are additionally staggered against each other for the same
 * reason — eight fish sharing one duration is a chorus line.
 *
 * ---- NOTHING HERE IS LOAD-BEARING ----
 *
 * Every loop moves something that is already drawn and already correct. Remove
 * every animation and the room reads exactly the same, just still: the fish are
 * still there, the status light is still lit, the cursor is still on the screen.
 * That is what makes the reduced-motion block below a one-liner rather than a
 * second rendering path — and it is why Phase 3's data can never be carried by
 * a moving part.
 * =========================================================================== */
const HQ_MOTION = `
.hq-anim { transform-box: fill-box; transform-origin: center; will-change: transform, opacity; }

/* aquarium: a fish crosses its lane and turns at the glass */
@keyframes hqFish {
  0%   { transform: translateX(-14px) scaleX(1); }
  44%  { transform: translateX(14px) scaleX(1); }
  50%  { transform: translateX(14px) scaleX(-1); }
  94%  { transform: translateX(-14px) scaleX(-1); }
  100% { transform: translateX(-14px) scaleX(1); }
}
.hq-fish { animation: hqFish var(--dur, 12s) ease-in-out infinite; }

/* anything rooted that sways: plants, shoots, weed */
@keyframes hqSway {
  0%, 100% { transform: rotate(-2.2deg); }
  50%      { transform: rotate(2.2deg); }
}
.hq-sway { transform-origin: bottom center; animation: hqSway var(--dur, 7s) ease-in-out infinite; }

/* the robot's status light, breathing */
@keyframes hqBreathe {
  0%, 100% { opacity: .35; }
  50%      { opacity: 1; }
}
.hq-breathe { animation: hqBreathe 3s ease-in-out infinite; }

/* a cursor on the mission computer */
@keyframes hqBlink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }
.hq-blink { animation: hqBlink 1.1s steps(1, end) infinite; }

/* the holo's scanline, drifting down the panel */
@keyframes hqScan {
  0%   { transform: translateY(-42px); opacity: 0; }
  12%  { opacity: .5; }
  88%  { opacity: .5; }
  100% { transform: translateY(42px); opacity: 0; }
}
.hq-scan { animation: hqScan 12s linear infinite; }

/* ...and its chart line advancing, drawn by stroke-dash rather than by moving */
@keyframes hqTrace { to { stroke-dashoffset: 0; } }
.hq-trace { stroke-dasharray: 240; stroke-dashoffset: 240; animation: hqTrace 12s ease-in-out infinite; }

/* the task lamp, flickering once in a long while — 23s of nothing, then a blink */
@keyframes hqFlicker {
  0%, 92%, 100% { opacity: 1; }
  93%   { opacity: .72; }
  94.5% { opacity: 1; }
  96%   { opacity: .82; }
}
.hq-flicker { animation: hqFlicker 23s linear infinite; }

/* dust in the lamp beam */
@keyframes hqMote {
  0%   { transform: translate(0, 0); opacity: 0; }
  15%  { opacity: .55; }
  85%  { opacity: .35; }
  100% { transform: translate(14px, -46px); opacity: 0; }
}
.hq-mote { animation: hqMote 30s linear infinite; }

/* the constellation, drifting the way a real sky does */
@keyframes hqSkyDrift {
  0%, 100% { transform: translate(0, 0); }
  50%      { transform: translate(5px, 2px); }
}
.hq-sky { animation: hqSkyDrift 40s ease-in-out infinite; }

/* the rocket display, turning slowly on its stand */
@keyframes hqTurn {
  0%   { transform: scaleX(1); }
  50%  { transform: scaleX(-1); }
  100% { transform: scaleX(1); }
}
.hq-turn { animation: hqTurn 20s ease-in-out infinite; }

/**
 * ---- AND ALL OF IT STOPS WHEN ASKED ----
 *
 * A person who has told their operating system to reduce motion has told every
 * app on it, and a room with twelve things moving in it is exactly what that
 * setting exists to stop. One rule, covering every class above, so a loop added
 * later cannot forget to opt in: it opts out by default.
 *
 * The room does not degrade into a different room. It becomes the same room,
 * still — which is the test the spec sets and the reason nothing animated is
 * allowed to carry meaning.
 */
@media (prefers-reduced-motion: reduce) {
  .hq-anim, .hq-fish, .hq-sway, .hq-breathe, .hq-blink,
  .hq-scan, .hq-trace, .hq-flicker, .hq-mote, .hq-sky, .hq-turn {
    animation: none !important;
  }
  .hq-trace { stroke-dashoffset: 0 !important; }
}
`;

/**
 * HOW LOUDLY AN UNOWNED PIECE ASKS.
 *
 * It was 0.5, tuned against a floor that ran to near-black. Phase 0 brought the
 * floor up so the contact shadows could be seen at all, and that took contrast
 * away from the one thing in this room made of nothing BUT contrast — the
 * rendered frame of the EMPTY room, which is the room he actually has today,
 * showed the outlines going quiet.
 *
 * The empty room is the whole argument for drawing a room instead of a grid of
 * cards: a half-built HQ asks to be finished in a way a locked card never does.
 * It cannot ask quietly.
 */
const GHOST_OPACITY = 0.62;

/**
 * Attach an idle loop — but only to a piece he owns.
 *
 * The exact shape of `mat()` above, and for the same reason. Sixteen animation
 * classes scattered through the ART table is sixteen chances to write one
 * without an ownership check, and a dashed outline that sways is an outline
 * pretending to be a plant.
 *
 * ---- WHY THIS IS A FUNCTION AND NOT A CONVENTION (Aug 29, 2026) ----
 *
 * It was a convention first — `className={s.solid ? 'hq-anim hq-sway' : undefined}`
 * written out at each site — and the mutation test broke it immediately. Taking
 * the guard OFF the desk plant left the suite green, because the check was
 * matching that identical string on the grow box, which was still correct. The
 * fourth time in three phases a check has passed by matching the wrong
 * occurrence.
 *
 * A convention you can forget needs a check that enumerates every site. A
 * function you must call to get the class at all needs no check beyond "nobody
 * wrote the string by hand" — and that one is trivial and cannot be fooled.
 */
const anim = (s, classes) => (s.solid ? `hq-anim ${classes}` : undefined);

/* ------------------------------------------------------------------ *
 * Furniture. Each is drawn from its own base point (0,0 = where it
 * meets the floor, horizontally centred), so placement is just a
 * translate and the depth scale.
 *
 * ---- MATERIALS (Phase 0, Aug 29, 2026) ----
 *
 * Each piece below now says what it is MADE of, not just what shape it
 * is. The rule from the build spec is "materials, not outlines": metal
 * gets a specular band, glass a highlight and something behind it,
 * wood a grain, fabric a gradient and deliberately no specular at all.
 *
 * The outlines all stayed. They are what makes the room legible on a
 * laptop screen at a third of this size, and they are what an unowned
 * piece falls back to.
 * ------------------------------------------------------------------ */

const ART = {
  /**
   * ===========================================================================
   * THE ENGINEERING WORKSTATION. (Redrawn Aug 25, 2026.)
   * ===========================================================================
   *
   * The parent: **"The workstation doesn't look like a workstation. It looks
   * like a boring table."**
   *
   * She is exactly right, and it was four rectangles: a slab, two legs and a
   * stretcher. That is the definition of a table. It costs 200 coins and it is
   * called an Engineering Workstation, and nothing about the drawing agreed
   * with either fact.
   *
   * A workstation is not a table with a better name — it is a table that
   * carries the evidence of work. So: a drawer pedestal, an instrument box
   * slung under the bay with a live power lamp, a cable reaching the floor, a
   * bench vise clamped to the near edge, a parts tray, a tool rail with three
   * tools on it, and a drafting sheet lying on the surface, skewed with the
   * perspective because a flat sheet on a receding top is a trapezoid.
   *
   * WHAT IS DELIBERATELY LEFT EMPTY: the centre of the top, x -42..42 above the
   * surface. The Mission Computer stands exactly there, and drawing a second
   * screen into that space would have the two items growing through each other
   * — the Aug 16 lamp-through-the-lab-bench fault, in a place a depth sort
   * cannot help with because both pieces share one base point.
   */
  'hq-desk': (s) => (
    <g stroke={s.stroke} strokeWidth="2" fill={s.fill}>
      {/* --- drawer pedestal, left. Under the top, so in its shadow: the
              understructure of a desk is the darkest thing about it. --- */}
      <rect x="-92" y="-48" width="52" height="48" rx="2" fill={s.solid ? '#1a2836' : s.fill} />
      {s.solid && (
        <g strokeWidth="1.4" opacity=".7">
          <path d="M-92 -33 L-40 -33 M-92 -18 L-40 -18" />
          <path d="M-76 -41 L-56 -41 M-76 -26 L-56 -26 M-76 -11 L-56 -11" strokeWidth="2.4" strokeLinecap="round" />
        </g>
      )}

      {/* --- leg frame with a brace, right --- */}
      <rect x="76" y="-48" width="11" height="48" fill={s.solid ? '#1a2836' : s.fill} />
      <rect x="42" y="-48" width="9" height="48" fill={s.solid ? '#1a2836' : s.fill} />
      <path d="M51 -14 L76 -14" />

      {/* --- instrument box under the bay, with a light that is on --- */}
      <rect x="54" y="-44" width="20" height="32" rx="2" />
      {s.solid && (
        <>
          <circle cx="64" cy="-39" r="2.2" fill={C.green} stroke="none" />
          <g strokeWidth="1.3" opacity=".55">
            <path d="M58 -30 L70 -30 M58 -25 L70 -25 M58 -20 L70 -20" />
          </g>
        </>
      )}
      {/* the cable, because equipment that is plugged in reads as equipment */}
      <path d="M64 -12 q5 8 -7 11" fill="none" strokeWidth="1.5" opacity=".7" />

      {/* --- the top: a steel slab, and the one band of light on it is what
              tells you it is steel rather than a plank --- */}
      <rect x="-98" y="-58" width="196" height="11" rx="2" fill={mat(s, 'mMetal', s.fill)} />
      {s.solid && (
        <rect x="-96" y="-56.5" width="192" height="2.2" rx="1.1" fill="#b6d4ea" opacity=".5" stroke="none" />
      )}
      <rect x="-98" y="-47" width="196" height="4" opacity=".5" />

      {/* --- a drafting sheet lying on it, skewed with the perspective --- */}
      {/* Starts at x 28 — right of the keyboard's edge at x 24. A sheet drawn
          under the keys is two owned items in the same place, which is the
          fault this whole redraw exists to avoid. */}
      <path d="M28 -60 L86 -60 L94 -67 L36 -67 Z" fill={s.solid ? 'rgba(34,211,238,.16)' : 'none'} />
      {s.solid && (
        <g strokeWidth="1.2" opacity=".75">
          <path d="M40 -62 L86 -62 M44 -64.5 L78 -64.5" />
        </g>
      )}

      {/* --- parts tray, LEFT of the keyboard's x -24..24 --- */}
      <rect x="-66" y="-64" width="24" height="6" rx="2" />

      {/* --- bench vise, clamped to the near edge --- */}
      <rect x="-97" y="-70" width="23" height="12" rx="2" />
      <rect x="-91" y="-77" width="6" height="7" />

      {/* --- tool rail, kept LEFT of where the monitor stands --- */}
      <path d="M-70 -58 L-70 -98" strokeLinecap="round" />
      <path d="M-70 -94 L-48 -94" strokeLinecap="round" />
      {s.solid && (
        <g strokeWidth="2.2" opacity=".85" strokeLinecap="round">
          <path d="M-64 -94 L-64 -81" />
          <path d="M-57 -94 L-57 -78" />
          <path d="M-51 -94 L-51 -84" />
        </g>
      )}
    </g>
  ),
  /**
   * ---- AND IT WAS NOT STANDING ON THE DESK (Aug 25, 2026) ----
   *
   * Found while redrawing the workstation. `LAYOUT` says the Mission Computer
   * "shares the desk's base point, because it stands on the desk" — and the
   * two DO share a base point, which is all the guard ever checked. But the
   * monitor's stand ended at y -32 while the desk's top surface is at y -58,
   * and larger y is lower: **the monitor floated 26 units BELOW the surface**,
   * in the leg space in front of the desk.
   *
   * Same base point is not the same as standing on it. The whole drawing moves
   * up 26 so the keyboard and the stand rest on the top face, and the guard now
   * asserts the surfaces meet rather than that the coordinates match.
   */
  'hq-computer': (s) => (
    <g stroke={s.stroke} strokeWidth="2" fill={s.fill}>
      {/* the bezel is metal; the panel inside it is dark glass with content on
          it. A screen drawn as a flat cyan rectangle is a lit rectangle, not a
          screen — what makes it read is that the glass is DARKER than the case
          and the text is the only bright thing on it. */}
      <rect x="-42" y="-122" width="84" height="52" rx="4" fill={mat(s, 'mMetal', s.fill)} />
      <rect x="-34" y="-115" width="68" height="38" rx="2" fill={mat(s, 'mScreenGlass')} stroke="none" />
      {s.solid && (
        <>
          {/**
            * THE LAST THING HE FINISHED, ON THE SCREEN. (Phase 3.)
            *
            * Three abstract bars used to sit here meaning nothing. Now the top
            * line is the title of the most recent lesson in `lessonProgress`,
            * and the line under it says when.
            *
            * When he has finished nothing the screen says so in words rather
            * than showing three empty bars: a blank screen would read as a
            * broken computer, and an invented lesson title would be the fake
            * the whole phase exists to refuse. "Awaiting first mission" is
            * true on day one and stops being shown the moment it stops being
            * true.
            */}
          {s.truth ? (
            <g stroke="none">
              <text x="-28" y="-105" fontSize="7" fill="#8ef0ff" opacity=".95">
                {String(s.truth.title).slice(0, 22)}
              </text>
              <text x="-28" y="-96" fontSize="5.5" fill="rgba(142,240,255,.6)">
                {s.truth.mastered ? 'MASTERED ' : 'COMPLETED '}{s.truth.date}
              </text>
              <rect x="-28" y="-90" width="34" height="2" rx="1" fill="#8ef0ff" opacity=".4" />
              {/* the cursor, blinking on 1.1s — the fastest thing in the room,
                  and the only loop anyone consciously notices */}
              <rect className={anim(s, 'hq-blink')} x="8" y="-91" width="3" height="4" fill="#8ef0ff" stroke="none" />
            </g>
          ) : (
            <g stroke="none">
              <text x="-28" y="-102" fontSize="6" fill="rgba(142,240,255,.65)">Awaiting first mission</text>
              <rect x="-28" y="-95" width="14" height="2" rx="1" fill="#8ef0ff" opacity=".35" />
              <rect className={anim(s, 'hq-blink')} x="-12" y="-96" width="3" height="4" fill="#8ef0ff" stroke="none" />
            </g>
          )}
          {/* the bloom: a screen throws a little light onto its own bezel */}
          <rect x="-34" y="-115" width="68" height="38" rx="2" fill="rgba(34,211,238,.16)" stroke="none" />
          {/* and a reflection down the glass, which is the tell for glass */}
          <path d="M-34 -115 L-12 -115 L-34 -88 Z" fill="rgba(205,238,251,.09)" stroke="none" />
        </>
      )}
      {/* stand and keyboard now rest ON the top face at y -58 */}
      <rect x="-6" y="-70" width="12" height="12" fill={s.solid ? '#22323f' : s.fill} />
      <rect x="-24" y="-63" width="48" height="5" rx="2" fill={mat(s, 'mMetal', s.fill)} />
    </g>
  ),
  /**
   * FABRIC ON A METAL BASE, and the material difference is the drawing.
   *
   * A flight chair is upholstery bolted to a machined column. The seat back
   * gets a soft gradient and NO specular — the absence of a highlight is what
   * says fabric, in the same way its presence is what says steel — and the
   * column and star base get the metal band. Draw both the same and you have a
   * chair-shaped outline again.
   */
  /**
   * THE CREW CONSOLE. (Added Aug 30, 2026.)
   *
   * A second working position, drawn so it can never be mistaken for the
   * Engineering Workstation standing next to it. The workstation is a BENCH —
   * a flat top, a vise, a tool rail, drawers, the evidence of things being
   * built. This is a CONSOLE: a plinth, an angled lit surface, a display
   * standing behind it. Two different jobs, two different silhouettes.
   *
   * That distinction is the whole reason not to reuse the desk art with a
   * different price. Two identical desks side by side would read as a copy-paste
   * mistake, which is exactly what the room has been accused of three times.
   *
   * The angled top is the tell. Nothing else in this room is drawn on a slope,
   * and a raked console face is the single most recognisable shape in every
   * control room ever photographed — including the one she sent.
   */
  'hq-console': (s) => (
    <g stroke={s.stroke} strokeWidth="2" fill={s.fill}>
      {/* plinth, slightly tapered so it reads as moulded rather than boxy */}
      <path d="M-58 0 L-52 -44 L52 -44 L58 0 Z" fill={mat(s, 'mMetal', s.fill)} />
      {s.solid && (
        <g stroke="rgba(10,20,30,.35)" strokeWidth="1.4" fill="none">
          <path d="M-40 -34 L40 -34 M-42 -24 L42 -24 M-44 -14 L44 -14" />
        </g>
      )}
      {/* the raked face — the shape that says 'console' */}
      <path d="M-62 -44 L62 -44 L54 -64 L-54 -64 Z" fill={mat(s, 'mMetal', s.fill)} />
      {s.solid && (
        <>
          <path d="M-54 -47 L54 -47 L49 -61 L-49 -61 Z" fill="url(#mScreenGlass)" stroke="none" />
          <g stroke="none" fill="#8ef0ff">
            <rect x="-44" y="-58" width="26" height="2.4" rx="1.2" opacity=".85" />
            <rect x="-44" y="-53.5" width="38" height="2.4" rx="1.2" opacity=".6" />
            <rect x="8" y="-58" width="34" height="8" rx="1.5" opacity=".22" />
          </g>
          {/* a hard highlight along the top lip — raked metal catches the light */}
          <path d="M-54 -64 L54 -64" stroke="#b6d4ea" strokeWidth="2" opacity=".5" fill="none" />
        </>
      )}
      {/* the upright display behind it */}
      <rect x="-38" y="-104" width="76" height="40" rx="4" fill={mat(s, 'mMetal', s.fill)} />
      <rect x="-31" y="-98" width="62" height="28" rx="2" fill={mat(s, 'mScreenGlass')} stroke="none" />
      {s.solid && (
        <>
          <path d="M-26 -78 L-10 -90 L2 -83 L16 -95 L26 -86" fill="none" stroke="#8ef0ff" strokeWidth="2" opacity=".8" />
          <rect x="-31" y="-98" width="62" height="28" rx="2" fill="rgba(34,211,238,.14)" stroke="none" />
        </>
      )}
    </g>
  ),
  'hq-chair': (s) => (
    <g stroke={s.stroke} strokeWidth="2" fill={s.fill}>
      <rect x="-30" y="-70" width="60" height="46" rx="8" fill={mat(s, 'mFabric', s.fill)} />
      {s.solid && (
        <path d="M-22 -64 L-22 -30 M0 -66 L0 -28 M22 -64 L22 -30"
              stroke="rgba(10,20,30,.32)" strokeWidth="1.6" fill="none" />
      )}
      <rect x="-28" y="-28" width="56" height="10" rx="4" fill={mat(s, 'mFabric', s.fill)} />
      <rect x="-4" y="-18" width="8" height="14" fill={mat(s, 'mMetalX', s.fill)} />
      <path d="M-26 -4 L26 -4" strokeLinecap="round" />
      <path d="M-18 -4 L-24 4 M18 -4 L24 4" strokeLinecap="round" />
    </g>
  ),
  /** Steel top, and glassware you can actually see through. */
  'hq-lab': (s) => (
    <g stroke={s.stroke} strokeWidth="2" fill={s.fill}>
      <rect x="-70" y="-54" width="140" height="10" rx="2" fill={mat(s, 'mMetal', s.fill)} />
      {s.solid && <rect x="-68" y="-52.5" width="136" height="2" rx="1" fill="#b6d4ea" opacity=".45" stroke="none" />}
      <rect x="-64" y="-44" width="8" height="44" fill={s.solid ? '#1a2836' : s.fill} />
      <rect x="56" y="-44" width="8" height="44" fill={s.solid ? '#1a2836' : s.fill} />
      {/* flasks — liquid in the bottom, glass over the whole vessel, and one
          highlight down the left. Three layers is what transparency costs. */}
      <path d="M-34 -54 L-34 -74 M-46 -54 L-46 -68" />
      <path d="M-52 -54 L-40 -78 L-28 -54 Z" fill={s.solid ? 'rgba(52,211,153,.3)' : 'none'} />
      <path d="M-52 -54 L-40 -78 L-28 -54 Z" fill={mat(s, 'mGlass')} stroke="none" />
      <circle cx="18" cy="-66" r="12" fill={s.solid ? 'rgba(34,211,238,.22)' : 'none'} />
      <circle cx="18" cy="-66" r="12" fill={mat(s, 'mGlass')} stroke="none" />
      {s.solid && <path d="M11 -71 a12 12 0 0 0 -1 8" stroke="rgba(230,248,255,.55)" strokeWidth="1.6" fill="none" />}
      <rect x="12" y="-78" width="12" height="8" fill={mat(s, 'mGlass', s.fill)} />

      {/**
        * FILLED VIALS ARE SCIENCE UNITS SHE HAS GRADED. (Phase 3.)
        *
        * Six in the rack. Each one he has had marked fills with green; the rest
        * stay empty glass, which is what an unused vial looks like and is a
        * true statement about work not yet done.
        *
        * GRADED, not finished. A unit he completed but that she has not marked
        * is not a filled vial — the bench is showing checked work, which is the
        * same standard `MorningMeeting` and the feedback card already apply to
        * a Khan row. A bench that filled on his say-so would be a bench that
        * disagreed with her gradebook.
        */}
      {/**
        * ---- AND THE RACK HAS TO STAND ON THE BENCH (Aug 29, 2026) ----
        *
        * First render put these at y -40..-24, which on a bench whose top face
        * is at y -54 is BELOW the surface — six vials floating in the leg space
        * under the bench, exactly the fault that had the Mission Computer
        * hanging 26 units under the desk for weeks. Larger y is lower, and it
        * catches everyone who draws in this coordinate system, twice.
        *
        * They now sit at -70..-54, bottom edge flush with the top face, and to
        * the RIGHT of the beaker so the rack is not standing inside the
        * glassware — the other half of the same mistake.
        */}
      <g strokeWidth="1.4">
        {[34, 40, 46, 52, 58, 64].map((x, i) => {
          const filled = s.solid && i < (s.truth?.count || 0);
          return (
            <g key={x}>
              <rect x={x} y="-70" width="5" height="16" rx="1.5"
                    fill={s.solid ? 'rgba(205,238,251,.10)' : 'none'} />
              {filled && <rect x={x + 0.8} y="-62" width="3.4" height="8" rx="1" fill="rgba(52,211,153,.65)" stroke="none" />}
            </g>
          );
        })}
      </g>
    </g>
  ),
  /** Brushed metal, and exactly ONE hard highlight down the body. */
  'hq-rocket-model': (s) => (
    <g stroke={s.stroke} strokeWidth="2" fill={s.fill}>
      {/**
        * A display model turns on its stand, once every twenty seconds.
        *
        * SVG has no third axis, so the rotation is a `scaleX` sweep from 1 to
        * -1 and back — the standard 2D reading of a symmetrical object turning.
        * What sells it is the specular highlight sweeping across with it: the
        * body is near-symmetric, so without the highlight the flip would read
        * as nothing happening at all.
        *
        * The STAND does not turn, because stands do not.
        */}
      <g className={anim(s, 'hq-turn')}>
        <path d="M0 -132 L16 -78 L16 -34 L-16 -34 L-16 -78 Z" fill={mat(s, 'mMetalX', s.fill)} />
        {s.solid && <path d="M-7 -112 L-7 -36" stroke="rgba(226,242,252,.5)" strokeWidth="3" strokeLinecap="round" fill="none" />}
        <path d="M-16 -34 L-32 -6 L-16 -6 Z" fill={s.solid ? '#22323f' : s.fill} />
        <path d="M16 -34 L32 -6 L16 -6 Z" fill={s.solid ? '#2c3f4f' : s.fill} />
        <circle cx="0" cy="-84" r="8" fill={s.solid ? 'rgba(34,211,238,.3)' : 'none'} />
        <circle cx="0" cy="-84" r="8" fill={mat(s, 'mGlass')} stroke="none" />
      </g>
      <rect x="-26" y="-6" width="52" height="6" rx="2" fill={mat(s, 'mMetal', s.fill)} />
    </g>
  ),
  /** Metal body, gold foil wings — the one warm colour on the back shelf. */
  'hq-satellite': (s) => (
    <g stroke={s.stroke} strokeWidth="2" fill={s.fill}>
      <rect x="-18" y="-96" width="36" height="44" rx="3" fill={mat(s, 'mMetal', s.fill)} />
      <rect x="-62" y="-88" width="40" height="28" rx="2" fill={mat(s, 'mFoil', s.fill)} />
      <rect x="22" y="-88" width="40" height="28" rx="2" fill={mat(s, 'mFoil', s.fill)} />
      {s.solid && (
        <g stroke="rgba(40,26,4,.45)" strokeWidth="1.2" fill="none">
          <path d="M-49 -88 L-49 -60 M-36 -88 L-36 -60 M35 -88 L35 -60 M48 -88 L48 -60" />
        </g>
      )}
      <path d="M0 -52 L0 -8" />
      <path d="M-16 -8 L16 -8" strokeLinecap="round" />
      <path d="M0 -96 L0 -110 M-8 -110 L8 -110" />
    </g>
  ),
  /** Metal tube, dark glass objective, and a tripod that touches the floor. */
  'hq-telescope': (s) => (
    <g stroke={s.stroke} strokeWidth="2" fill={s.fill}>
      {/**
        * ---- THE TRIPOD WAS A SOLID TRIANGLE (Aug 29, 2026) ----
        *
        * An open path in SVG is still FILLED as though it were closed, so these
        * two legs had been painting a filled wedge between them since the day
        * they were drawn. On the old near-black floor nobody could tell. The
        * moment the floor came up for the contact shadows, the telescope grew a
        * black sail — a fault the lighting did not cause, only revealed.
        *
        * Three legs, no fill, and the third one going back so it reads as a
        * tripod rather than a letter A.
        */}
      {/**
        * ---- THE CONSTELLATION IS NOT DRAWN HERE (Aug 29, 2026) ----
        *
        * It was, for one render. One star per mastered aerospace lesson, in a
        * field above the tube — and the frame showed them scattered across the
        * back wall and out over the right wall, because a field 128 units wide
        * hung above a piece standing at u 0.83 does not stay inside the room.
        * That is the Task Lamp standing through the left wall again, in a new
        * shape: a drawing that did not know where the walls were.
        *
        * The stars now go in the WINDOW, which is the room's one view of
        * outside, is at a fixed spot on the back wall, and cannot leave it. It
        * is also the better idea — a telescope points at a sky, it does not
        * carry one — and it makes buying the telescope reveal the sky he has
        * already earned. See the window group in `HQRoom`.
        */}
      <g fill="none" strokeLinecap="round">
        <path d="M-30 -6 L0 -74 L30 -6" />
        <path d="M0 -74 L-6 -4" opacity=".55" />
        <path d="M-19 -32 L19 -32" strokeWidth="1.6" opacity=".7" />
      </g>
      <path d="M0 -74 L0 -58" />
      <g transform="rotate(-28)">
        <rect x="-14" y="-118" width="28" height="72" rx="8" fill={mat(s, 'mMetalX', s.fill)} />
        {s.solid && <path d="M-6 -114 L-6 -50" stroke="rgba(226,242,252,.42)" strokeWidth="2.6" strokeLinecap="round" fill="none" />}
        {/* the objective. A lens is DARK — it is a hole that collects light,
            not a thing that gives it off, and drawing it bright is the single
            most common way a drawn telescope stops being one. */}
        <rect x="-18" y="-124" width="36" height="10" rx="3" fill={mat(s, 'mScreenGlass', s.fill)} />
      </g>
    </g>
  ),
  /**
   * Metal shell, lit eyes, and a status light that is ON.
   *
   * The status light is the piece of this drawing that does the most work for
   * the least ink: a machine with a lamp lit on it is a machine that is
   * powered, and a machine that is powered is a machine that does something.
   * (It starts breathing in Phase 1. It is already the right shape for it.)
   */
  'hq-robot': (s) => (
    <g stroke={s.stroke} strokeWidth="2" fill={s.fill}>
      <rect x="-26" y="-64" width="52" height="46" rx="6" fill={mat(s, 'mMetal', s.fill)} />
      {/* the head turns toward him when he arrives — see `robotFacing` */}
      <g
        style={s.solid ? {
          transform: `translateX(${(s.facing || 0) * 3.2}px) rotate(${(s.facing || 0) * 7}deg)`,
          transformBox: 'fill-box',
          transformOrigin: '50% 90%',
          transition: PREFERS_REDUCED_MOTION ? undefined : 'transform 700ms cubic-bezier(.4,0,.2,1)'
        } : undefined}
      >
        <rect x="-18" y="-92" width="36" height="28" rx="6" fill={mat(s, 'mMetal', s.fill)} />
        {s.solid && <rect x="-15" y="-90" width="30" height="2.4" rx="1.2" fill="#c3dded" opacity=".55" stroke="none" />}
        <circle cx="-7" cy="-79" r="3.5" fill={s.solid ? '#9ff4ff' : 'none'} stroke="none" />
        <circle cx="7" cy="-79" r="3.5" fill={s.solid ? '#9ff4ff' : 'none'} stroke="none" />
      </g>
      {/* the status light, on its chest, green because it is fine — and
          breathing on 3s, the shortest loop in the room after the cursor. A
          machine with a lamp that pulses is a machine that is thinking. */}
      {s.solid && <circle className={anim(s, 'hq-breathe')} cx="0" cy="-46" r="3.6" fill={C.green} stroke="none" />}
      <path d="M0 -92 L0 -102 M-6 -104 L6 -104" />
      <rect x="-36" y="-58" width="10" height="30" rx="4" fill={s.solid ? '#22323f' : s.fill} />
      <rect x="26" y="-58" width="10" height="30" rx="4" fill={s.solid ? '#22323f' : s.fill} />
      <rect x="-18" y="-18" width="14" height="18" rx="3" fill={s.solid ? '#1a2836' : s.fill} />
      <rect x="4" y="-18" width="14" height="18" rx="3" fill={s.solid ? '#1a2836' : s.fill} />
    </g>
  ),
  /**
   * GLASS, WATER, AND A LIGHT INSIDE IT.
   *
   * The old drawing was a rectangle with a flat cyan wash and two triangles in
   * it. What makes a tank read as a tank is that the water is a gradient — pale
   * at the surface where the hood lamp hits it, deep at the gravel — with a
   * hard highlight band down the front glass and the fish BEHIND that highlight.
   * Order matters more than detail here: water, then fish, then glass.
   */
  'hq-aquarium': (s) => (
    <g stroke={s.stroke} strokeWidth="2" fill={s.fill}>
      <rect x="-56" y="-30" width="112" height="8" rx="2" fill={mat(s, 'mMetal', s.fill)} />
      <rect x="-48" y="-22" width="96" height="22" fill={s.solid ? '#1a2836' : s.fill} />
      <rect x="-56" y="-92" width="112" height="62" rx="4" fill={s.solid ? '#0a1a26' : s.fill} />
      {/* the hood, and the lamp under it that lights the whole thing */}
      {s.solid && <rect x="-58" y="-96" width="116" height="8" rx="3" fill="url(#mMetal)" stroke="none" />}
      <rect x="-50" y="-86" width="100" height="54" fill={mat(s, 'mWater')} stroke="none" />
      {s.solid && (
        <>
          {/* gravel */}
          <path d="M-50 -32 q14 -7 26 -1 q13 -7 25 0 q12 -6 24 1 q10 -5 25 0 L50 -32 Z" fill="#2b2117" stroke="none" />
          {/* plants, back to front, swaying on the 6s the spec gives them */}
          <g className={anim(s, 'hq-sway')} style={{ '--dur': '6s' }}>
            <path d="M-38 -32 q6 -16 0 -30 M-32 -32 q9 -13 5 -24" stroke="rgba(52,211,153,.7)" strokeWidth="2.4" fill="none" strokeLinecap="round" />
          </g>
          <g className={anim(s, 'hq-sway')} style={{ '--dur': '6s', animationDelay: '-2.4s' }}>
            <path d="M38 -32 q-6 -14 0 -24 M31 -32 q-8 -11 -4 -20" stroke="rgba(52,211,153,.55)" strokeWidth="2.4" fill="none" strokeLinecap="round" />
          </g>
        </>
      )}
      {/**
        * ONE FISH PER FIVE DAYS OF TYPING PRACTICE. (Phase 3.)
        *
        * Days, not sessions — five entries in one afternoon is one day, and
        * `aquariumFish` carries the reasoning. Capped at eight, which is the
        * number of lanes the tank has room for.
        *
        * An empty tank is a real tank: water, gravel, plants and a light, with
        * nothing swimming in it yet. That is a tank waiting to be stocked, not
        * a broken drawing — and unlike a grey fish, it is true.
        */}
      {/**
        * Each fish gets its OWN group, its own duration and its own negative
        * delay. Eight fish sharing one period is a chorus line; 9s through 16s,
        * each already part-way through its own crossing, is a tank.
        *
        * The turn at the glass is the `scaleX(-1)` at the midpoint of the
        * keyframe — a fish that slid back and forth without ever facing the way
        * it was going would be the one thing in the tank that proved it was a
        * drawing.
        */}
      {s.solid && fishField(s.truth?.count || 0).map((f, i) => (
        <g
          key={i}
          className={anim(s, 'hq-fish')}
          style={{ '--dur': `${9 + i}s`, animationDelay: `${-2.3 * i}s` }}
        >
          <path
            d={`M${f.x} ${f.y} l${i % 2 ? 9 : -9} -5 l${i % 2 ? -9 : 9} -5 z`}
            fill={i % 3 === 0 ? C.amber : i % 3 === 1 ? C.green : '#7ee6ff'}
            stroke="none"
            opacity=".9"
          />
        </g>
      ))}
      {/* the ghost keeps two fish so the shop picture still shows an aquarium */}
      {!s.solid && (
        <>
          <path d="M-24 -52 l10 -6 l-10 -6 z" fill="none" stroke="none" />
          <path d="M14 -62 l8 -5 l-8 -5 z" fill="none" stroke="none" />
        </>
      )}
      {/* the front glass goes on LAST, over the water and the fish, because
          that is where it is */}
      {s.solid && (
        <>
          <rect x="-56" y="-92" width="112" height="62" rx="4" fill="url(#mGlass)" stroke="none" />
          <path d="M-44 -88 L-30 -88 L-44 -36 Z" fill="rgba(226,246,255,.16)" stroke="none" />
        </>
      )}
    </g>
  ),
  /** Two greens, so the leaves in front read as being in front. */
  'hq-plant': (s) => (
    <g stroke={s.stroke} strokeWidth="2" fill={s.fill}>
      <path d="M-20 -34 L-14 0 L14 0 L20 -34 Z" fill={s.solid ? '#7a4a32' : s.fill} />
      {s.solid && <path d="M-19 -30 L19 -30" stroke="rgba(255,224,190,.28)" strokeWidth="2.4" fill="none" />}
      {/* the foliage sways as one, from the soil line, on 8s */}
      <g className={anim(s, 'hq-sway')} style={s.solid ? { '--dur': '8s' } : undefined}>
        <path d="M0 -34 L0 -76" />
        <path d="M0 -68 q-30 -6 -34 -30 q26 -2 34 30" fill={s.solid ? 'rgba(31,148,102,.55)' : 'none'} />
        <path d="M0 -60 q30 -8 34 -32 q-26 -2 -34 32" fill={s.solid ? 'rgba(52,211,153,.42)' : 'none'} />
        <path d="M0 -76 q-16 -18 -4 -34 q14 14 4 34" fill={s.solid ? 'rgba(74,222,168,.5)' : 'none'} />
      </g>
    </g>
  ),
  /** Wood with a grain, dark soil, and shoots drawn one at a time. */
  'hq-garden-box': (s) => (
    <g stroke={s.stroke} strokeWidth="2" fill={s.fill}>
      <rect x="-64" y="-34" width="128" height="34" rx="3" fill={mat(s, 'mWood', s.fill)} />
      {s.solid && (
        <g stroke="rgba(30,18,8,.34)" strokeWidth="1.3" fill="none">
          <path d="M-58 -28 q30 -3 58 0 q30 3 58 -1" />
          <path d="M-56 -18 q34 4 60 0 q28 -4 56 1" />
          <path d="M-60 -9 q28 -3 56 1 q30 3 58 -2" />
        </g>
      )}
      {/* the soil, which is the darkest thing in the room and should be */}
      {s.solid && <rect x="-60" y="-34" width="120" height="8" rx="2" fill="url(#mSoil)" stroke="none" />}
      <path d="M-64 -26 L64 -26" opacity=".5" />
      {/**
        * ONE SHOOT PER DAY WORKED IN THE GARDEN. (Phase 3.)
        *
        * The build spec asked this box to show what is planted. The garden log
        * cannot answer that — it records sessions against briefs, never a crop
        * — so it shows what the log DOES know, and `growBoxShoots` carries the
        * full reasoning. Four slots, four days, and then it is full.
        *
        * Empty is bare soil in a wooden box, which is exactly what an unplanted
        * grow box looks like and is the most honest thing in this room.
        */}
      {[-40, -14, 14, 40].map((x, i) => {
        const grown = !s.solid || i < (s.truth?.count || 0);
        if (!grown) return null;
        return (
          /* 7s each, but each shoot a second and a half out of phase with its
             neighbour — four shoots nodding in unison is a metronome, not a
             window box. */
          <g
            key={x}
            className={anim(s, 'hq-sway')}
            style={s.solid ? { '--dur': '7s', animationDelay: `${-1.6 * i}s` } : undefined}
          >
            <path d={`M${x} -34 L${x} -58`} />
            <path d={`M${x} -50 q-12 -4 -14 -14 q11 0 14 14`} fill={s.solid ? 'rgba(31,148,102,.5)' : 'none'} />
            <path d={`M${x} -46 q12 -5 14 -15 q-11 0 -14 15`} fill={s.solid ? 'rgba(74,222,168,.45)' : 'none'} />
          </g>
        );
      })}
    </g>
  ),
  /**
   * THE ROOM'S LIGHT SOURCE, AND IT LOOKS LIKE ONE.
   *
   * The shade is HOT — brighter than anything else drawn in this room, because
   * it is the thing everything else is lit by. A lamp drawn in the same greys
   * as the furniture, with a warm pool on the floor beside it, is a room with
   * an unexplained glow in it.
   *
   * The visible cone is what connects the two. It is drawn here rather than in
   * the light layer because it belongs to the lamp and follows it.
   */
  'hq-lamp': (s) => (
    <g stroke={s.stroke} strokeWidth="2" fill={s.fill}>
      <ellipse cx="0" cy="-2" rx="20" ry="6" fill={mat(s, 'mMetal', s.fill)} />
      <path d="M0 -6 L0 -110" />
      {/**
        * THE FLICKER, AND WHY IT IS ON 23 SECONDS.
        *
        * The whole loop is 23s of the lamp being perfectly steady and about one
        * second of it not being. A lamp that flickered rhythmically would read
        * as broken, or worse, as a decoration — and he would learn to expect it.
        * At this period he will catch it out of the corner of his eye
        * occasionally and never be able to predict it, which is what a real
        * fluorescent tube does.
        *
        * The shade, the cone and the hot underside dim together, because they
        * are one light.
        */}
      <g className={anim(s, 'hq-flicker')}>
        {/* the cone, thrown down and forward, running out before it lands */}
        {s.solid && (
          <path d="M-18 -128 L18 -128 L72 -2 L-72 -2 Z" fill="url(#mLampCone)" stroke="none" />
        )}
        <path d="M-26 -110 L26 -110 L16 -142 L-16 -142 Z" fill={s.solid ? 'rgba(245,165,36,.3)' : 'none'} />
        {s.solid && (
          <>
            {/* the hot underside of the shade — the brightest pixels in the room */}
            <path d="M-26 -110 L26 -110 L20 -117 L-20 -117 Z" fill="#ffdca6" stroke="none" />
            <ellipse cx="0" cy="-110" rx="26" ry="4" fill="#fff1cf" stroke="none" opacity=".85" />
          </>
        )}
      </g>

      {/**
        * DUST IN THE BEAM. Six motes on a 30s drift, each starting at a
        * different point in the loop so they never arrive together.
        *
        * They exist only inside the cone, which is the only place you can
        * actually see dust — that is the entire physical reason a sunbeam looks
        * solid, and drawing them anywhere else would be drawing dirt.
        */}
      {s.solid && [
        [-38, -18], [-14, -46], [10, -30], [34, -12], [-26, -70], [22, -62]
      ].map(([mx, my], i) => (
        <circle
          key={i}
          className={anim(s, 'hq-mote')}
          cx={mx} cy={my} r={i % 2 ? 1.1 : 1.6}
          fill="#ffe9c2" stroke="none"
          style={{ animationDelay: `${-5 * i}s` }}
        />
      ))}
    </g>
  ),
  /** Fabric: a soft edge, no specular, and it takes light from the lamp. */
  'hq-rug': (s) => (
    <g stroke={s.stroke} strokeWidth="2" fill={s.fill}>
      <ellipse cx="0" cy="0" rx="130" ry="34" fill={s.solid ? 'rgba(84,116,143,.3)' : 'none'} />
      <ellipse cx="0" cy="0" rx="96" ry="24" opacity=".6" />
      <ellipse cx="0" cy="0" rx="58" ry="14" opacity=".4" />
    </g>
  )
};

/** Wall-mounted pieces, drawn flat on the back wall. */
const WALL_ART = {
  /** Paper in a frame, lit from the lamp side — which is the left of the room. */
  'hq-poster-apollo': (s) => (
    <g stroke={s.stroke} strokeWidth="2" fill={s.fill}>
      <rect x="-38" y="-52" width="76" height="104" rx="3" fill={s.solid ? 'rgba(245,165,36,.12)' : 'none'} />
      <circle cx="0" cy="-14" r="18" fill={s.solid ? 'rgba(245,165,36,.3)' : 'none'} />
      <path d="M-24 34 L0 6 L24 34" />
      {s.solid && <rect x="-38" y="-52" width="76" height="104" rx="3" fill="url(#mPaper)" stroke="none" />}
    </g>
  ),
  'hq-poster-mars': (s) => (
    <g stroke={s.stroke} strokeWidth="2" fill={s.fill}>
      <rect x="-34" y="-46" width="68" height="92" rx="3" fill={s.solid ? 'rgba(239,68,68,.12)' : 'none'} />
      <circle cx="0" cy="-6" r="20" fill={s.solid ? 'rgba(239,68,68,.28)' : 'none'} />
      <path d="M-14 -12 q14 -8 28 0" opacity=".7" />
      {s.solid && <rect x="-34" y="-46" width="68" height="92" rx="3" fill="url(#mPaper)" stroke="none" />}
    </g>
  ),
  /**
   * EMISSIVE. It is the only object in the room that gives off its own light
   * rather than reflecting the lamp's, so it gets scanlines and a glow and no
   * specular band at all — a screen has nothing to reflect with.
   */
  /**
   * REAL NUMBERS, LIVE. (Phase 3.)
   *
   * Rank, XP and streak, straight off the store. This is the one bound object
   * where a zero is not a fake and must not be hidden: "Junior Engineer · 0 XP"
   * is a true sentence about a boy on his first day, and it is the thing he is
   * standing at the bottom of. Blanking it would be the display refusing to say
   * where he actually is.
   *
   * The streak line only appears once there IS a streak — a "0 day streak" is a
   * sentence with nothing in it.
   */
  'hq-holo': (s) => {
    const t = s.truth;
    return (
      <g stroke={s.stroke} strokeWidth="2" fill={s.fill}>
        <rect x="-72" y="-44" width="144" height="88" rx="5" fill={mat(s, 'mScreenGlass', 'none')} />
        {s.solid && <rect x="-72" y="-44" width="144" height="88" rx="5" fill="rgba(34,211,238,.16)" stroke="none" />}
        {s.solid && (
          <g stroke="rgba(126,230,255,.13)" strokeWidth="1.6" fill="none">
            {[-36, -26, -16, -6, 4, 14, 24, 34].map((y) => <path key={y} d={`M-70 ${y} L70 ${y}`} />)}
          </g>
        )}
        {/* one brighter scanline drifting down the panel on 12s — the tell that
            a screen is a screen rather than a lit rectangle */}
        {s.solid && (
          <rect
            className={anim(s, 'hq-scan')}
            x="-70" y="-2" width="140" height="3"
            fill="#8ef0ff" stroke="none"
          />
        )}
        {s.solid && t ? (
          <g stroke="none" fontFamily="inherit">
            <text x="-62" y="-24" fontSize="12" fill="#8ef0ff" opacity=".95">{t.rankName}</text>
            <text x="-62" y="-8" fontSize="10" fill="rgba(180,226,244,.75)">TIER {t.tier}</text>
            <text x="-62" y="16" fontSize="18" fill="#d6f6ff">{t.xp.toLocaleString()}</text>
            <text x="-62" y="28" fontSize="8" fill="rgba(180,226,244,.6)">XP</text>
            {t.streak > 0 && (
              <text x="20" y="28" fontSize="9" fill="rgba(180,226,244,.7)">
                {t.streak}-day streak
              </text>
            )}
          </g>
        ) : (
          <>
            <path d="M-56 20 L-30 -8 L-6 6 L20 -26 L52 -2" fill="none" stroke={s.stroke} strokeWidth="2.5" />
            <path d="M-56 -30 L-20 -30 M-56 -20 L-38 -20" opacity=".6" />
          </>
        )}
        {/* the chart line stays, under the numbers, because the display is a
            display and an empty frame with two figures in it is a spreadsheet */}
        {/**
          * The chart line ADVANCES rather than moves: it is drawn by animating
          * `stroke-dashoffset`, so the line traces itself out along its own path
          * over 12s and then starts again.
          *
          * That is deliberately not a translation. A chart that slid sideways
          * would imply the numbers were changing, and these numbers change when
          * he does the work, not on a timer. Tracing shows a display refreshing;
          * sliding would have been the room inventing data — which is the one
          * thing Phase 3 spent its whole budget forbidding.
          */}
        {s.solid && t && (
          <path
            className={anim(s, 'hq-trace')}
            d="M-56 34 L-30 22 L-6 30 L20 14 L52 24"
            fill="none" stroke="rgba(142,240,255,.35)" strokeWidth="2"
          />
        )}
      </g>
    );
  },
  /**
   * THE BADGES HE WAS ACTUALLY GIVEN. (Phase 3.)
   *
   * Three medals used to hang here whatever he had earned, which for a boy with
   * an empty readiness record meant the wall told him he had three awards. That
   * is the exact failure the empty-state rule names: a grey trophy is a lie, and
   * a gold one for nothing is a worse one.
   *
   * Empty now means EMPTY — a lit frame with its hanging pegs and no medals on
   * them. It reads as a place where badges will go, which is true, and which is
   * the only encouraging thing that is also honest.
   */
  'hq-award-wall': (s) => {
    const t = s.truth;
    const n = t?.shown || 0;
    const slots = [-26, 0, 26];
    return (
      <g stroke={s.stroke} strokeWidth="2" fill={s.fill}>
        <rect x="-46" y="-36" width="92" height="72" rx="3" fill={mat(s, 'mMetal', s.fill)} />
        {s.solid && <rect x="-40" y="-30" width="80" height="60" rx="2" fill="#0e1e2c" stroke="none" />}
        {slots.map((x, i) => (
          <g key={x}>
            {/* the peg is always there — it is the furniture, not the award */}
            {s.solid && <path d={`M${x} -26 L${x} -21`} stroke="rgba(148,180,206,.4)" strokeWidth="2" />}
            {i < n && (
              <>
                <circle cx={x} cy="-12" r="9" fill={s.solid ? 'url(#mFoil)' : 'none'} />
                {s.solid && <circle cx={x - 3} cy="-15" r="2.6" fill="rgba(255,246,222,.7)" stroke="none" />}
                <path d={`M${x - 5} -3 L${x} 12 L${x + 5} -3`} />
              </>
            )}
          </g>
        ))}
        {/* An unowned piece keeps the old outline so the shop still shows what
            it is you would be buying — the ghost is a catalogue picture. */}
        {!s.solid && slots.map((x) => (
          <g key={'g' + x}>
            <circle cx={x} cy="-12" r="9" fill="none" />
            <path d={`M${x - 5} -3 L${x} 12 L${x + 5} -3`} />
          </g>
        ))}
        {s.solid && !t?.any && (
          <text x="0" y="26" textAnchor="middle" fontSize="9" fill="rgba(148,180,206,.55)" stroke="none">
            No badges yet
          </text>
        )}
      </g>
    );
  },
  /**
   * ONE PATCH PER QUARTER FINISHED. (Phase 3.)
   *
   * Four patches for four quarters, and a quarter earns its patch by being over
   * AND having something real recorded inside it — see `quartersEarned`, which
   * is deliberately stricter than the planner's calendar-only "complete".
   *
   * The empty board still shows its four stitch outlines. A crew board with
   * marked places and nothing on them says what the year is going to be; four
   * filled patches in August would say the year is already over.
   */
  'hq-patch-wall': (s) => {
    const n = s.truth?.count || 0;
    return (
      <g stroke={s.stroke} strokeWidth="2" fill={s.fill}>
        <rect x="-44" y="-34" width="88" height="68" rx="3" fill={mat(s, 'mFabric', s.fill)} />
        {[[-22, -12], [22, -12], [-22, 14], [22, 14]].map(([x, y], i) => {
          const earned = !s.solid || i < n;
          return (
            <g key={i}>
              <path
                d={`M${x} ${y - 12} L${x + 11} ${y - 4} L${x + 7} ${y + 10} L${x - 7} ${y + 10} L${x - 11} ${y - 4} Z`}
                fill={s.solid && earned ? 'rgba(34,211,238,.3)' : 'none'}
                strokeOpacity={earned ? 1 : 0.35}
                strokeDasharray={s.solid && !earned ? '3 3' : undefined}
              />
              {s.solid && earned && (
                <path
                  d={`M${x} ${y - 8.5} L${x + 7.6} ${y - 3} L${x + 4.8} ${y + 6.6} L${x - 4.8} ${y + 6.6} L${x - 7.6} ${y - 3} Z`}
                  fill="none" stroke="rgba(226,242,252,.4)" strokeWidth="1" strokeDasharray="2 2"
                />
              )}
            </g>
          );
        })}
      </g>
    );
  }
};

/**
 * Placement. `x`/`y` are room coordinates in the viewBox; `y` also sets depth,
 * which drives scale and draw order. Wall pieces carry their own fixed scale.
 */
/* ------------------------------------------------------------------ *
 * WHERE THINGS STAND — IN FLOOR COORDINATES, NOT SCREEN ONES.
 *
 * ---- WHY THIS CHANGED (Aug 16, 2026) ----
 *
 * The parent: "I'm looking at his Mission Control HQ and the items are placed
 * randomly without any sense to it."
 *
 * Two faults, and the first caused the look of the second.
 *
 * **The layout was in viewBox pixels while the floor is a trapezoid.** The room
 * is one-point perspective: at the back wall the floor spans x 430-1170, at the
 * front it spans 0-1600. A pixel pair that sits comfortably inside the room at
 * the front is OUTSIDE it at the back — and the Task Lamp, at x300 y660, was
 * standing through the left wall. Nothing in the code could notice, because
 * nothing in the code knew where the floor was.
 *
 * Placement is now (u, v): u runs 0 to 1 ACROSS THE FLOOR AT THAT DEPTH, v runs
 * 0 at the back wall to 1 at the front. Projection puts them on screen.
 * **A piece can no longer be placed outside the room**, and a guard asserts it.
 *
 * ---- AND THEN: THE ROOM HAS ZONES ----
 *
 * Even in bounds, eighteen objects spread evenly across a floor read as
 * clutter. Rooms group. Four zones, and the grouping IS the sense she was
 * looking for:
 *
 *   BACK WALL     posters, awards, patches, the holo display
 *   BACK OF ROOM  lab bench and the models — the display shelf
 *   CENTRE        the desk. Rug under it, computer on it, chair pulled out,
 *                 lamp beside it. This is what the room is FOR.
 *   LEFT          the green corner — plant and grow box together
 *   RIGHT         observe and build — telescope, robot, aquarium
 * ------------------------------------------------------------------ */

/**
 * ---- THE SIDE WALLS (Aug 16, 2026) ----
 *
 * The parent: "why didnt you use the left and right walls"
 *
 * Because the code could not, and I had not noticed that was the reason. The
 * back wall faces the viewer, so a thing on it takes flat x/y and looks right.
 * The side walls are foreshortened parallelograms running to the vanishing
 * point — anything on one has to be skewed to sit on it. There was no such
 * transform, so there was no such placement, so I furnished the one wall the
 * existing code could reach and treated the wall as done.
 *
 * In one-point perspective **verticals stay vertical** and horizontals converge,
 * which is exactly a skewY: it tilts horizontal edges and leaves vertical ones
 * alone. Plus a horizontal squeeze, because the far end of a side wall is
 * further from the eye than the near end.
 *
 *   left wall    0,0    430,150   430,570   0,900
 *   right wall   1600,0 1170,150  1170,570  1600,900
 *
 * p runs 0 at the BACK wall to 1 at the viewer; q runs 0 at the ceiling to 1
 * at the floor.
 */
const SIDE_SKEW = 19.2; // degrees — atan(150/430), the pitch of the wall's own edges

function projectSideWall(side, p, q) {
  const x = side === 'left' ? BACK.x1 * (1 - p) : BACK.x2 + (VB.w - BACK.x2) * p;
  const topY = BACK.y1 * (1 - p);
  const bottomY = BACK.y2 + (VB.h - BACK.y2) * p;
  return { x, y: topY + q * (bottomY - topY) };
}

/** Floor plane: the polygon is 0,900  1600,900  1170,570  430,570. */

/* ===========================================================================
 * THE FLOOR GRID.
 *
 * ---- WHY (Aug 25, 2026) ----
 *
 * The parent, for the SECOND time: **"everything is just placed randomly
 * around in the HQ."**
 *
 * She said it on Aug 16 as well. That fix was real — zones, a floor plan, a
 * guard that no two pieces stand inside each other — and it plainly did not
 * answer her, because it fixed CORRECTNESS and she was describing ORDER. Every
 * piece was in a sensible place and no two of them lined up with each other,
 * so the room read as scattered while passing every check written about it.
 *
 * A grid is what makes an arrangement look arranged. Twelve columns across the
 * floor and eight rows front-to-back; every piece sits on an intersection, and
 * anything he moves snaps to one. **He cannot make it untidy**, which is the
 * only honest way to offer a twelve-year-old a room to rearrange.
 * =========================================================================== */
export const GRID = { cols: 12, rows: 8 };

/** Nearest intersection, clamped inside the floor rather than onto its edge. */
export function snapToGrid(u, v) {
  const su = Math.round(u * GRID.cols) / GRID.cols;
  const sv = Math.round(v * GRID.rows) / GRID.rows;
  return {
    u: Math.min(1 - 1 / GRID.cols, Math.max(1 / GRID.cols, su)),
    v: Math.min(1 - 1 / GRID.rows, Math.max(1 / GRID.rows, sv))
  };
}

/** Floor plane point -> (u, v). The inverse of projectFloor, for dropping. */
export function unprojectFloor(x, y) {
  const v = (y - BACK.y2) / (VB.h - BACK.y2);
  const xLeft = BACK.x1 * (1 - v);
  const xRight = BACK.x2 + (VB.w - BACK.x2) * v;
  return { u: (x - xLeft) / (xRight - xLeft), v };
}

/* ---------------------------------------------------------------------------
 * `foot` — HOW WIDE THE THING IS WHERE IT MEETS THE FLOOR. (Aug 29, 2026.)
 *
 * Half-width, in the piece's OWN drawing units, measured off its own art rather
 * than guessed: the desk's top spans x -98..98 so its foot is 96; the lamp's
 * base ellipse has rx 20 so its foot is 22.
 *
 * It exists because of what the first rendered frame of the furnished room
 * showed — eighteen objects standing on a floor and not one of them touching
 * it. A drawn shape meets a drawn floor only if something draws the meeting,
 * and the thing that draws it is a contact shadow the width of the object's
 * base. It is the single biggest change in the whole lighting phase and it is
 * one number per piece.
 *
 * Two exemptions, both marked in place rather than inferred:
 *   `standsOn`  the piece rests on another piece, not on the floor
 *   `flat`      the piece IS floor covering and casts nothing
 * ------------------------------------------------------------------------- */
export const LAYOUT = {
  // --- back wall (flat; no perspective) ---
  // The WINDOW (x 700-900, y 360-480) is the feature of this wall, so the wall
  // is composed around it rather than ignoring it: the display screen mounted
  // high and centred above it, the two posters flanking it on the left at eye
  // height, the two award frames flanking on the right.
  'hq-holo': { x: 800, y: 250, wall: true, s: 0.95 },
  // --- THE SIDE WALLS ---
  // Art goes left, achievements go right, so each wall says one thing. These
  // are NOT rearrangeable, and that is deliberate: they are composed around
  // the window and the shelves, and a poster dragged over the window would be
  // the room made worse by the feature meant to improve it.
  'hq-poster-apollo': { side: 'left', p: 0.32, q: 0.44, s: 0.95 },
  'hq-poster-mars': { side: 'left', p: 0.64, q: 0.46, s: 1.05 },
  'hq-award-wall': { side: 'right', p: 0.32, q: 0.44, s: 0.95 },
  'hq-patch-wall': { side: 'right', p: 0.64, q: 0.46, s: 1.05 },

  // --- ON THE SHELVES ---
  // Both are display MODELS. On the floor they read as furniture the size of a
  // chair, and they were the two pieces most responsible for the floor looking
  // scattered on Aug 16.
  'hq-rocket-model': { x: 566, y: 505, shelf: true, s: 0.42, foot: 28 },
  'hq-satellite': { x: 1034, y: 505, shelf: true, s: 0.38, foot: 18 },

  /* ---------------------------------------------------------------------
   * THE FLOOR, ON THE GRID. Four rows, back to front.
   *
   *   row 1 (v .125)  the lab bench, against the back
   *   row 3 (v .375)  plant · desk+computer · telescope
   *   row 5 (v .625)  lamp · rug · robot
   *   row 6 (v .75)   grow box · chair · aquarium
   *
   * Read down a column and things line up; read across a row and they sit at
   * one depth. That is the whole difference between this and the old numbers,
   * which were individually reasonable and collectively a scatter.
   * ------------------------------------------------------------------- */
  /* ---------------------------------------------------------------------
   * ---- THE THIRD TIME SHE SAID IT (Aug 30, 2026) ----
   *
   * The parent, with a reference picture of an orbital control room: **"The
   * work station up against walls. Just have everything in an organized
   * fashion instead of randomly sitting places."**
   *
   * She said it on Aug 16 and again on Aug 25. Both fixes were real and both
   * missed her point:
   *
   *   Aug 16  placement moved to floor coordinates and gained zones, so no
   *           piece could stand through a wall. That fixed CORRECTNESS.
   *   Aug 25  a 12x8 grid, so every piece sits on an intersection. That fixed
   *           ALIGNMENT.
   *
   * Both left the furniture standing in the MIDDLE OF THE FLOOR, in rows. A
   * grid of objects in open space is a tidy scatter, and she has now told me
   * three times that it reads as random. The picture is what finally said why:
   * in a real control room the consoles are **against the walls** and the
   * centre floor is **empty**. Nothing in the reference stands in open space.
   *
   * So the room is now a PERIMETER, not a grid of rows:
   *
   *   BACK WALL   the workstation + computer, under the window   (v .125)
   *   LEFT WALL   lab (v .25) · plant (v .5) · grow box (v .875)  (u .0833)
   *   RIGHT WALL  robot (v .25) · telescope (v .5) · tank (v .875)(u .9167)
   *   CENTRE      lamp beside the desk, the rug, and the chair
   *
   * FIRST ATTEMPT PUT FOUR PIECES ALONG THE BACK WALL and left the whole front
   * half of the floor bare. The frame showed it immediately: everything bunched
   * into the narrowest band of the room, which is a different kind of untidy.
   * The reference runs its consoles down the SIDE walls, front to back, and
   * that is what the depth of a one-point-perspective room is for.
   *
   * Measured, not eyeballed: every wall piece sits 28-72px clear of its wall,
   * nothing collides, and the whole middle and front of the floor is open —
   * which is where he and the crew stand.
   *
   * The desk stays the hero and goes against the BACK wall, under the window,
   * facing into the room. That is both what she asked for and what the
   * reference does with its main console.
   * ------------------------------------------------------------------- */
  'hq-console': { u: 0.25, v: 0.125, foot: 62 },
  'hq-desk': { u: 0.4167, v: 0.125, foot: 96 },
  // Shares the desk's base point, because it stands ON the desk — and it
  // follows the desk when he moves it, for the same reason. Its PRICE tag is
  // lifted onto the monitor so two unowned labels do not print on top of
  // each other.
  // It stands on the desk's top face, so its shadow belongs on that face and
  // not on the carpet two feet in front of it. Marked, not inferred.
  'hq-computer': { u: 0.4167, v: 0.125, labelDy: -121, follows: 'hq-desk', standsOn: 'hq-desk' },

  /* --- the side walls, running the depth of the room --- */
  'hq-lab': { u: 0.0833, v: 0.25, foot: 68 },
  'hq-lamp': { u: 0.5833, v: 0.125, foot: 22 },
  'hq-robot': { u: 0.9167, v: 0.25, foot: 28 },

  /* the desk's own floor, between it and the chair pulled out from it */
  // The rug is floor covering and is drawn UNDER everything (layer 'floor'),
  // not sorted by depth. Sorting it by its own base point put it on top of the
  // chair legs, which is part of what read as nonsense on Aug 16.
  'hq-rug': { u: 0.4167, v: 0.375, layer: 'floor', flat: true },

  /* --- the side walls --- */
  'hq-plant': { u: 0.0833, v: 0.5, foot: 22 },
  'hq-chair': { u: 0.4167, v: 0.5, foot: 30 },
  'hq-telescope': { u: 0.9167, v: 0.5, foot: 32 },

  'hq-garden-box': { u: 0.0833, v: 0.875, foot: 64 },
  'hq-aquarium': { u: 0.9167, v: 0.875, foot: 54 }
};


/* ===========================================================================
 * STATIONS — where he stands, and what he is doing there.
 *
 * ---- WHY (Aug 25, 2026) ----
 *
 * The parent: **"Can he also have his Avatar move around the HQ to use items in
 * there. ex use the engineering work station, telescope, and the mission
 * computer. sit in the flight chair, and look at the item like the aquarium and
 * items on the wall when he buys items for the HQ."**
 *
 * The room was a picture of a room. Every piece was drawn correctly and none of
 * them could be used, so buying the eighteenth item produced the same feeling
 * as buying the first: something appeared in a corner and that was the end of
 * it. A place you cannot stand in is a diagram.
 *
 * Each station is a floor spot to walk to, a STANCE (see CadetAvatar), and one
 * line saying what he is doing. `stand` is where he walks BACK to, so the room
 * always has him in it.
 *
 * ONLY OWNED ITEMS ARE STATIONS. Walking to a dashed outline and miming a
 * telescope he has not bought would be the shop's promise made worse, not
 * better — so an unowned piece stays a price tag and nothing more.
 *
 * The `doing` lines are written to be worth reading twice. Real detail beats a
 * verb: the aquarium says what a closed system is, the telescope says why you
 * point it away from the window.
 *
 * ---- THE SPOT IS AN OFFSET, NOT A PLACE (Aug 25, 2026) ----
 *
 * The parent: **"when the items are arranged the avatar doesn't move to the
 * new location."**
 *
 * My bug, one day old. Every station held an ABSOLUTE floor spot, worked out
 * against where the designed layout happened to put each piece. The moment
 * arranging shipped, moving the desk left the station coordinates behind — so
 * he walked to the middle of an empty floor and mimed working at a workstation
 * that was now across the room.
 *
 * A floor station stores `du, dv` — **where to stand relative to the piece** —
 * and the spot is computed from wherever that piece is standing right now.
 * Move the desk and the place he works at moves with it, because it was never
 * a place; it was always "just in front of the desk".
 *
 * Wall and shelf pieces keep absolute `u, v`, because those pieces cannot be
 * moved. Two shapes rather than one, and the shape says which kind it is.
 * =========================================================================== */
export const STATIONS = {
  /* ---- floor pieces: WHERE TO STAND RELATIVE TO THE PIECE ---- */
  'hq-chair': {
    du: 0, dv: 0, stance: 'sit',
    doing: 'Flight chair. Feet flat, back straight, hands where the controls would be — the position every launch is flown from.'
  },
  'hq-desk': {
    du: 0.045, dv: 0.02, stance: 'work', surfaceY: -58,
    doing: 'Engineering workstation. Drawings go here before anything gets cut, because a mistake on paper costs a pencil.'
  },
  'hq-computer': {
    du: 0.012, dv: 0.02, stance: 'type', surfaceY: -58,
    doing: 'Mission computer. Telemetry in, decisions out. Apollo flew to the Moon on less memory than one photo takes today.'
  },
  'hq-console': {
    du: 0.055, dv: 0.03, stance: 'type', surfaceY: -60,
    doing: 'Crew console. Two people can run a mission from one room, but only if each has a screen of their own — that is the whole reason a control room has more than one seat.'
  },
  'hq-lab': {
    du: 0.03, dv: 0.15, stance: 'work',
    doing: 'Laboratory bench. Measure it twice, write it down once — an experiment nobody recorded did not happen.'
  },
  'hq-telescope': {
    du: -0.02, dv: 0.15, stance: 'reach',
    doing: 'Telescope. Point it away from every light you own, then let your eyes adjust for ten minutes before you judge anything.'
  },
  'hq-aquarium': {
    du: -0.05, dv: 0.09, stance: 'gaze',
    doing: 'Aquarium. A sealed tank is a closed system — light in, oxygen and waste balanced inside. The same problem as keeping a crew alive.'
  },
  'hq-robot': {
    du: -0.07, dv: 0.13, stance: 'gaze',
    doing: 'Workshop robot. It does the repeat you would get bored doing, at the same tolerance every time. That is the whole argument for robots.'
  },
  'hq-garden-box': {
    du: 0.13, dv: 0.05, stance: 'tend',
    doing: 'Grow box. The same question as the garden outside: how much light reaches it, and how much water does it actually use?'
  },
  'hq-plant': {
    du: 0.06, dv: 0.14, stance: 'tend',
    doing: 'Desk plant. It leans toward the window without being told. Free evidence about where the light is.'
  },
  'hq-lamp': {
    du: 0.06, dv: 0.10, stance: 'gaze',
    doing: 'Task lamp. Light on the work, not in your eyes — the difference between seeing detail and squinting at it.'
  },
  'hq-rug': {
    du: 0, dv: 0, stance: 'stand',
    doing: 'Orbit rug. Concentric rings, like the drawing on every mission-planning board.'
  },

  /* ---- wall and shelf pieces: FIXED, because the pieces are ---- */
  'hq-holo': {
    u: 0.50, v: 0.20, stance: 'gaze',
    doing: 'Holographic display. Big enough that two people can argue over the same number at once, which is the point of it.'
  },
  'hq-rocket-model': {
    u: 0.30, v: 0.30, stance: 'lift',
    doing: 'Rocket display. Take it down and look at how much of it is fuel tank. Almost all of it is fuel tank.'
  },
  'hq-satellite': {
    u: 0.70, v: 0.30, stance: 'lift',
    doing: 'Satellite model. Solar wings, a dish, and a body barely bigger than a fridge. Most of a satellite is the parts that face outward.'
  },
  'hq-poster-apollo': {
    u: 0.09, v: 0.56, stance: 'gaze',
    doing: 'Apollo poster. Five F-1 engines, 7.5 million pounds of thrust, and thirteen launches without losing a crew on the way up.'
  },
  'hq-poster-mars': {
    u: 0.08, v: 0.74, stance: 'gaze',
    doing: 'Mars map. Olympus Mons is on it — three times the height of Everest, and so wide you could stand on it and not know.'
  },
  'hq-award-wall': {
    u: 0.92, v: 0.56, stance: 'gaze',
    doing: 'Award display. Everything on this wall came from work that was checked by somebody else.'
  },
  'hq-patch-wall': {
    u: 0.93, v: 0.74, stance: 'gaze',
    doing: 'Patch wall. Every crew designs their own. The good ones say what the mission was without a word of text.'
  }
};

/** Where he stands when he is not at anything: the middle of his own room. */
const HOME_SPOT = { u: 0.60, v: 0.58, stance: 'stand' };

/** Depth scale: the far wall sits at y=570, the front of the room at y=900. */

function Piece({ item, owned, onUse, active, at: liveSpot, arranging, held, onGrab, truth = null, facing = 0 }) {
  const base = LAYOUT[item.id];
  if (!base) return null;
  // A moved piece keeps everything the designer gave it — its label offset, its
  // layer, its scale — and changes only where it stands.
  const spot = liveSpot ? { ...base, ...liveSpot } : base;
  const draw = spot.wall || spot.side ? WALL_ART[item.id] || ART[item.id] : ART[item.id];
  if (!draw) return null;

  // Wall pieces are flat on the back wall and carry their own x/y. Floor
  // pieces carry (u, v) and are projected — which is what keeps them in the
  // room no matter how the perspective is retuned.
  // Three kinds of place. Wall pieces hang flat and carry x/y. SHELF pieces
  // stand on a shelf — same artwork as a floor piece, because a shelf is a
  // surface and the art is drawn from whatever it stands on — at a fixed spot
  // and a small scale. Floor pieces carry (u, v) and are projected.
  const fixed = spot.wall || spot.shelf;
  const at = spot.side
    ? projectSideWall(spot.side, spot.p, spot.q)
    : fixed
      ? { x: spot.x, y: spot.y }
      : projectFloor(spot.u, spot.v);
  // A side wall recedes, so a piece near the back of it is both smaller and
  // horizontally squeezed. Both follow p.
  const scale = spot.side
    ? (0.55 + 0.45 * spot.p) * (spot.s || 1)
    : fixed
      ? spot.s
      : depth(at.y);
  const squeeze = spot.side ? (0.42 + 0.5 * spot.p).toFixed(3) : 1;
  const skew = spot.side === 'left' ? SIDE_SKEW : -SIDE_SKEW;
  const placement = spot.side
    ? 'translate(' + at.x + ' ' + at.y + ') skewY(' + skew + ') scale(' + squeeze + ' 1) scale(' + scale + ')'
    : 'translate(' + at.x + ' ' + at.y + ') scale(' + scale + ')';
  /**
   * `truth` is what this object knows about him, or null for the ten pieces
   * that are furniture and nothing more. It is handed to the art as part of the
   * style object so a drawing can read it without reaching into the store —
   * every ART function stays a pure function of its arguments, which is what
   * lets the empty states be reasoned about at all.
   */
  const style = owned
    ? { stroke: '#7f9bb3', fill: 'rgba(23,42,60,.92)', solid: true, truth, facing }
    : { stroke: C.ghost, fill: 'none', solid: false, truth: null, facing: 0 };

  /**
   * A piece is TAPPABLE only when he owns it and it has a station. Walking to a
   * dashed outline and miming a telescope he has not bought would make the
   * shop's promise worse, not better — an unowned piece stays a price tag.
   */
  const usable = owned && Boolean(onUse) && !arranging;
  const movable = owned && arranging && Boolean(onGrab);

  return (
    <g
      transform={placement}
      opacity={owned ? (held ? 0.75 : 1) : GHOST_OPACITY}
      strokeDasharray={owned ? undefined : '5 5'}
      strokeLinejoin="round"
      onClick={usable ? onUse : undefined}
      onPointerDown={movable ? onGrab : undefined}
      style={usable ? { cursor: 'pointer' } : movable ? { cursor: held ? 'grabbing' : 'grab' } : undefined}
      role={usable || movable ? 'button' : undefined}
      tabIndex={usable || movable ? 0 : undefined}
      onKeyDown={
        usable
          ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onUse(); } }
          : movable
            ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onGrab(e); } }
            : undefined
      }
      aria-label={usable ? `Use the ${item.name}` : movable ? `Move the ${item.name}` : undefined}
    >
      {/* While he is holding it, a ring on the floor says which one is in
          his hand — the piece itself is half-transparent and easy to lose
          against the furniture behind it. */}
      {held && (
        <ellipse cx="0" cy="4" rx="62" ry="16" fill="none" stroke={C.amber} strokeWidth="3" strokeDasharray="8 6" />
      )}
      {/* A ring under the piece he is currently using, so the room says where
          he is even when the figure is behind something. */}
      {active && (
        <ellipse cx="0" cy="4" rx="62" ry="16" fill="none" stroke={C.cyan} strokeWidth="3" opacity=".75" />
      )}
      {/**
        * IT TOUCHES THE FLOOR.
        *
        * Drawn before the art so the object sits ON its own shadow, and inside
        * this group so the group's own `scale(depth(y))` shrinks the shadow with
        * distance for free — which is why the radius here is in the piece's own
        * units and is NOT multiplied by depth a second time. `contactShadow()`
        * in hqGeometry resolves the same shape to the screen, and the guard
        * checks the two agree.
        *
        * Only for a piece he OWNS. An unowned piece is a dashed outline of
        * something that is not in the room, and a shadow under it would be the
        * drawing claiming otherwise — the same lie as a grey trophy for a badge
        * he has not earned.
        */}
      {owned && !spot.flat && !spot.standsOn && Number.isFinite(spot.foot) && (
        <ellipse
          cx="0"
          cy="0"
          rx={spot.foot * CONTACT_RX}
          ry={spot.foot * CONTACT_RX * CONTACT_RATIO}
          fill="url(#hqContact)"
          stroke="none"
        />
      )}
      {draw(style)}
      {!owned && (
        <text x="0" y={26 + (spot.labelDy || 0)} textAnchor="middle" fontSize="20" fill="rgba(148,180,206,.5)">
          {item.cost}
        </text>
      )}
    </g>
  );
}

/* ------------------------------------------------------------------ *
 * The equipment rack — a real rack: uprights, a rail, hooks, shelf.
 * ------------------------------------------------------------------ */

const KIT_ART = {
  'eq-helmet-basic': (s) => (
    <g stroke={s.stroke} strokeWidth="2" fill={s.fill}>
      <circle cx="0" cy="0" r="24" />
      <path d="M-20 4 a20 14 0 0 0 40 0 a20 16 0 0 0 -40 0" fill={s.solid ? 'rgba(34,211,238,.22)' : 'none'} />
      <rect x="-26" y="16" width="52" height="8" rx="3" />
    </g>
  ),
  'eq-suit-flight': (s) => (
    <g stroke={s.stroke} strokeWidth="2" fill={s.fill}>
      <path d="M-18 -18 L-30 -6 L-24 8 L-16 2 L-16 34 L16 34 L16 2 L24 8 L30 -6 L18 -18 Z" fill={s.solid ? 'rgba(245,165,36,.18)' : 'none'} />
      <path d="M-6 -18 q6 8 12 0" />
      <path d="M0 4 L0 34" opacity=".5" />
    </g>
  ),
  'eq-boots': (s) => (
    <g stroke={s.stroke} strokeWidth="2" fill={s.fill}>
      <path d="M-22 -14 L-6 -14 L-6 10 L-24 10 L-24 2 Z" />
      <path d="M6 -14 L22 -14 L24 2 L24 10 L6 10 Z" />
    </g>
  ),
  // 'eq-gloves' art removed Aug 25 2026 — no such item has ever existed in
  // MISSION_EQUIPMENT, so this drawing was unreachable and its slot in
  // KIT_ORDER put a permanent hole in the rack. See the note on KIT_ORDER.
  'eq-tether': (s) => (
    <g stroke={s.stroke} strokeWidth="2" fill="none">
      <circle cx="0" cy="0" r="20" />
      <circle cx="0" cy="0" r="13" opacity=".7" />
      <path d="M20 0 q14 6 10 20" strokeLinecap="round" />
    </g>
  ),
  'eq-visor-gold': (s) => (
    <g stroke={s.stroke} strokeWidth="2" fill={s.fill}>
      <path d="M-24 -6 a24 18 0 0 1 48 0 a24 22 0 0 1 -48 0 Z" fill={s.solid ? 'rgba(245,165,36,.35)' : 'none'} />
    </g>
  ),
  'eq-toolkit': (s) => (
    <g stroke={s.stroke} strokeWidth="2" fill={s.fill}>
      <rect x="-26" y="-8" width="52" height="30" rx="3" />
      <path d="M-10 -8 L-10 -16 q10 -6 20 0 L10 -8" />
      <path d="M-26 4 L26 4" opacity=".6" />
    </g>
  ),
  'eq-jetpack': (s) => (
    <g stroke={s.stroke} strokeWidth="2" fill={s.fill}>
      <rect x="-24" y="-20" width="18" height="42" rx="8" />
      <rect x="6" y="-20" width="18" height="42" rx="8" />
      <rect x="-8" y="-14" width="16" height="28" rx="4" />
      <path d="M-15 22 q0 12 -4 18 M15 22 q0 12 4 18" strokeLinecap="round"
            stroke={s.solid ? C.amber : s.stroke} />
    </g>
  ),
  'eq-pack-life': (s) => (
    <g stroke={s.stroke} strokeWidth="2" fill={s.fill}>
      <rect x="-20" y="-22" width="40" height="46" rx="6" />
      <rect x="-12" y="-14" width="24" height="14" rx="2" fill={s.solid ? 'rgba(52,211,153,.25)' : 'none'} />
      <path d="M-20 -10 q-10 10 0 20 M20 -10 q10 10 0 20" />
    </g>
  )
};

/**
 * Hanging order, left to right. Every non-ship item in MISSION_EQUIPMENT must
 * appear here — a piece missing from this list is purchasable but invisible,
 * which is the exact failure this whole screen was built to fix.
 *
 * ---- THE TEST THAT DID NOT EXIST (Aug 25, 2026) ----
 *
 * This comment used to end "A test asserts the two lists match." **It did
 * not.** Nothing anywhere referenced KIT_ORDER, and the list contained
 * `eq-gloves` — an id that has never been in MISSION_EQUIPMENT. (The gloves
 * are `av-gloves`, an Avatar Gear item, a different catalogue entirely.)
 *
 * `byId['eq-gloves']` was undefined so the whole `<g>` was skipped, but `cols`
 * still counted nine, so the rack has been drawing eight items across nine
 * slots with a permanent hole in position six — and 40 lines of art for a
 * piece that cannot be bought.
 *
 * A claimed test is worse than no test: it is the reason nobody looked. The
 * assertion now genuinely exists, in scripts/verify-store-visibility.mjs, and
 * it is mutation-tested.
 */
const KIT_ORDER = ['eq-helmet-basic', 'eq-visor-gold', 'eq-suit-flight', 'eq-pack-life',
                   'eq-jetpack', 'eq-boots', 'eq-tether', 'eq-toolkit'];

function EquipmentRack({ owned, items }) {
  const byId = useMemo(() => Object.fromEntries(items.map((i) => [i.id, i])), [items]);
  const cols = KIT_ORDER.length;
  const W = 1200, H = 300;
  const gap = (W - 140) / (cols - 1);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Equipment rack">
      {/* uprights */}
      <rect x="34" y="20" width="16" height={H - 40} rx="4" fill="#1b2c3d" stroke={C.edge} />
      <rect x={W - 50} y="20" width="16" height={H - 40} rx="4" fill="#1b2c3d" stroke={C.edge} />
      {/* feet */}
      <rect x="14" y={H - 26} width="56" height="10" rx="4" fill="#1b2c3d" stroke={C.edge} />
      <rect x={W - 70} y={H - 26} width="56" height="10" rx="4" fill="#1b2c3d" stroke={C.edge} />
      {/* hanging rail */}
      <rect x="42" y="56" width={W - 84} height="10" rx="5" fill="#2b3f53" stroke={C.edge} />
      {/* lower shelf */}
      <rect x="42" y={H - 62} width={W - 84} height="8" rx="3" fill="#1f3243" stroke={C.edge} />

      {KIT_ORDER.map((id, i) => {
        const item = byId[id];
        if (!item) return null;
        const has = owned.has(id);
        const x = 70 + i * gap;
        const draw = KIT_ART[id];
        const style = has
          ? { stroke: '#8aa6bd', fill: 'rgba(23,42,60,.92)', solid: true }
          : { stroke: C.ghost, fill: 'none', solid: false };
        return (
          <g key={id}>
            {/* hook */}
            <path d={`M${x} 61 L${x} 96`} stroke={has ? '#8aa6bd' : C.ghost} strokeWidth="3" strokeLinecap="round" />
            <g
              transform={`translate(${x} 140) scale(1.35)`}
              opacity={has ? 1 : 0.5}
              strokeDasharray={has ? undefined : '5 5'}
              strokeLinejoin="round"
            >
              {draw(style)}
            </g>
            <text x={x} y={H - 74} textAnchor="middle" fontSize="17" fill={has ? '#9db6cb' : 'rgba(148,180,206,.45)'}>
              {has ? item.name.split(' ')[0] : item.cost}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ------------------------------------------------------------------ */

const SHIP_PART_IDS = new Set(['eq-booster', 'eq-heatshield', 'eq-antenna', 'eq-solar']);

/**
 * THE CADET, STANDING IN HIS OWN ROOM.
 *
 * ---- SCALE, WORKED OUT RATHER THAN GUESSED ----
 *
 * The desk is drawn 58 units tall from its base point, and a desk is about
 * 75cm. A twelve-year-old is about 150cm, so he should be roughly twice the
 * desk: ~116 room units. `CadetAvatar` draws into a 190-unit-tall box with the
 * feet at y +29, so the figure occupies about 190 of its own units and the
 * ratio is 116/190 ≈ 0.61.
 *
 * Then multiplied by `depth(y)` like every other object, so he shrinks toward
 * the back wall exactly as the furniture does. A figure that ignored the
 * perspective would be the one thing in the room that proves it is a drawing.
 *
 * ---- ON THE ANIMATION ----
 *
 * The walk is a CSS transition on the transform. If a browser declines to
 * animate it he arrives instantly instead — the feature still works, it just
 * stops being a walk. That degradation is deliberate: no guard in this repo has
 * ever rendered a component, so motion is the one thing here that cannot be
 * proven without opening it.
 */

/**
 * Does this machine want motion at all?
 *
 * Read once at module load, the same way `CadetAvatar` reads it — one copy per
 * module rather than one shared constant, because these are the only two places
 * that need it and an import for a four-line expression is not a saving.
 *
 * ---- WHY IT IS HERE NOW (Aug 29, 2026) ----
 *
 * The walk across the room is a 900ms CSS transition, and it was the one piece
 * of motion in this file that nothing asked permission for. `CadetAvatar` has
 * honoured the setting since it was written; the room it stands in did not, so
 * a person who had told their operating system to reduce motion still watched a
 * figure slide across a floor. The build spec is unambiguous — reduced motion
 * means all decoration stops and the room still works — and it does: without
 * the transition he ARRIVES at the station instead of walking to it. Every
 * feature intact, one less thing moving.
 */
const PREFERS_REDUCED_MOTION = (() => {
  try {
    return typeof window !== 'undefined'
      && typeof window.matchMedia === 'function'
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch {
    return false;
  }
})();

/**
 * WHERE AN UNPOSTED CREW MEMBER STANDS.
 *
 * Back-left of the room, out of the desk cluster and off the walking line. A
 * crew member he has earned but not assigned is still HIS — hiding them until
 * they have a job would make earning one feel like nothing happened.
 */
const MUSTER_SPOT = { u: 0.14, v: 0.20, stance: 'stand' };

/**
 * IS THIS FIGURE WALKING RIGHT NOW?
 *
 * ---- WHY THE BROWSER IS ASKED RATHER THAN A TIMER (Aug 30, 2026) ----
 *
 * A walk cycle needs to run for exactly as long as the figure is travelling
 * and stop the moment it arrives. The obvious way to do that is a 900ms
 * `setTimeout` matched to the transition — and that is two numbers that have
 * to stay equal forever, in two files, with nothing to catch them drifting.
 *
 * The transition already knows when it finishes. `transitionend` is a plain
 * DOM event: no timer, no frame loop, and no second copy of the duration. The
 * walk starts when the destination changes and stops when the browser says the
 * movement is over, so the two can never disagree.
 *
 * Under reduced motion there IS no transition, so `transitionend` would never
 * fire and the walk would run forever — which is why it is never started.
 * Reduced motion means he arrives, exactly as before this phase.
 */
function useWalking(spot) {
  const [walking, setWalking] = useState(false);
  const from = useRef(null);
  useEffect(() => {
    const moved = from.current
      && (from.current.u !== spot.u || from.current.v !== spot.v);
    from.current = { u: spot.u, v: spot.v };
    if (moved && !PREFERS_REDUCED_MOTION) setWalking(true);
  }, [spot.u, spot.v]);
  return [walking, setWalking];
}

function CadetInRoom({ spot, avatar, gear, reachY = null }) {
  const at = projectFloor(spot.u, spot.v);
  const k = depth(at.y) * FIGURE_SCALE;
  const [walking, setWalking] = useWalking(spot);
  return (
    <g
      onTransitionEnd={(e) => {
        // Only this group's own transform, not something bubbling from a child.
        if (e.target === e.currentTarget && e.propertyName === 'transform') setWalking(false);
      }}
      style={{
        transform: `translate(${at.x}px, ${at.y}px) scale(${k})`,
        transition: PREFERS_REDUCED_MOTION ? undefined : 'transform 900ms cubic-bezier(.4,0,.2,1)'
      }}
    >
      {/*
        A contact shadow, AT HIS FEET.

        It was at cy 30 — thirty units below the floor point, so it followed him
        round the room as a dark blob hovering under his boots with daylight
        between. A leftover from before the figure was shifted up by 29 to put
        its feet on the floor point; the shadow never got the same correction,
        and the rendered picture shows it plainly.
      */}
      {/**
        * ---- AND HE GETS THE SAME SHADOW AS THE FURNITURE (Aug 29, 2026) ----
        *
        * This was a flat `rgba(0,0,0,.35)` ellipse, which was fine while it was
        * the only shadow in the room. The moment every object got a soft
        * gradient one, his became the odd shape out — a hard-edged disc under a
        * boy standing in a room of softly grounded furniture, which reads as
        * him being pasted onto the picture rather than standing in it.
        *
        * One shadow language for the whole room. Same gradient, same rake.
        */}
      <ellipse cx="0" cy="2" rx="42" ry={(42 * CONTACT_RATIO).toFixed(1)} fill="url(#hqContact)" />
      {/**
        * WALKING OUTRANKS THE DESTINATION'S STANCE, and drops the reach.
        *
        * He is crossing the floor toward the workstation; he is not drafting
        * at it yet. Carrying the destination stance while travelling gave a
        * figure sliding across the room with its hands already flat on a desk
        * eight feet away — the Aug 25 floating-monitor fault in human form.
        */}
      <g transform="translate(0 -29)">
        <CadetAvatar
          avatar={avatar}
          gear={gear}
          stance={walking ? 'walk' : spot.stance}
          raw
          animate
          reachY={walking ? null : reachY}
        />
      </g>
    </g>
  );
}


export function HQRoom() {
  const unlocked = useAppStore((s) => s.unlockedCosmetics);
  const owned = useMemo(() => new Set(unlocked || []), [unlocked]);
  const equippedAvatar = useAppStore((s) => s.equippedAvatar) || DEFAULT_AVATAR_ID;
  const equippedGear = useAppStore((s) => s.equippedGear) || {};

  /**
   * Which station he is at. `null` is the middle of the room.
   *
   * Deliberately NOT persisted. Where he is standing is not a record of
   * anything — it is not attendance, it is not a grade, and writing it to
   * Dexie would put a row in the two-computer merge for a thing that means
   * nothing tomorrow. He starts each visit in the middle of his own room.
   */
  const [atId, setAtId] = useState(null);
  const station = (atId && owned.has(atId) && STATIONS[atId]) || null;
  const atItem = station ? HQ_ITEMS.find((i) => i.id === atId) : null;

  /* =====================================================================
   * PHASE 2 — NOBODY STANDS STILL ALL DAY.
   *
   * The parent: **"I will like it that the avatar and the worker are moving
   * around the hq unless placed in a specific spot by Lamar."**
   *
   * `{ [figureId]: { at, until } }`. Not persisted, for the same reason
   * `atId` is not: where somebody happened to be standing when he closed
   * the tab is not a record of anything, and it would put a row in the
   * two-computer merge that means nothing by tomorrow.
   *
   * PINNING IS NOT A NEW CONTROL. It is the two he already has:
   *
   *   * tapping a piece sets `atId`, which is him saying "stand there" —
   *     so the cadet roams only while `atId` is null;
   *   * posting a crew member writes `hqCrewPosts`, which is him saying
   *     the same thing about somebody else.
   *
   * Inventing a third "lock" toggle would have meant a boy who tapped his
   * chair watching his cadet wander off two seconds later, which is the
   * feature actively fighting him.
   * ===================================================================== */
  const [wander, setWander] = useState({});

  /* =====================================================================
   * PHASE 3 — THE ROOM TELLS THE TRUTH.
   *
   * Eight objects read his actual record. Everything below is a READ; not
   * one line of it writes a grade, a date, an attendance row or a Georgia
   * hour. The selectors themselves live in `lib/hqTruth.js`, in plain JS,
   * so a guard can execute them — the same reason the projection does.
   *
   * The empty-state rule governs every one of them: an empty source draws
   * an empty object, never a zero dressed up as a thing. A grey trophy is
   * a lie, and this room is read by the child whose record it is.
   * ===================================================================== */
  const lessonProgress = useAppStore((s) => s.lessonProgress);
  const readinessAwards = useAppStore((s) => s.readinessAwards);
  const khanAcademyAssignments = useAppStore((s) => s.khanAcademyAssignments);
  const gardenLog = useAppStore((s) => s.gardenLog);
  const typingLog = useAppStore((s) => s.typingLog);
  const xp = useAppStore((s) => s.xp);
  const streak = useAppStore((s) => s.streak);
  const currentRank = useAppStore((s) => s.currentRank);
  const academicAssignments = useAppStore((s) => s.academicAssignments);
  const academicBooks = useAppStore((s) => s.academicBooks);
  const missionEvaluations = useAppStore((s) => s.missionEvaluations);
  const allAttendance = useAppStore((s) => s.allAttendance);

  /**
   * One object per bound piece, recomputed only when its own source moves.
   * A 1,400-line component that rebuilt every selector on every pointer move
   * while he drags a desk around would be the performance rule broken by the
   * phase that has nothing to animate.
   */
  const truth = useMemo(() => ({
    'hq-award-wall': awardsEarned(readinessAwards, READINESS_SKILLS),
    'hq-patch-wall': quartersEarned(buildYearPlan({
      today: todayDateStr(),
      allLessons,
      lessonProgress,
      academicAssignments,
      academicBooks,
      missionEvaluations,
      allAttendance,
      khanAcademyAssignments
    })),
    'hq-holo': holoReadout({ xp, rank: currentRank, streak }),
    'hq-telescope': masteredStars(lessonProgress, allLessons),
    'hq-computer': lastFinished(lessonProgress, allLessons),
    'hq-garden-box': growBoxShoots(gardenLog),
    'hq-lab': benchFlasks(khanAcademyAssignments),
    'hq-aquarium': aquariumFish(typingLog)
  }), [
    readinessAwards, lessonProgress, khanAcademyAssignments, gardenLog, typingLog,
    xp, streak, currentRank, academicAssignments, academicBooks, missionEvaluations, allAttendance
  ]);

  /* =====================================================================
   * ARRANGING.
   *
   * The parent: **"maybe that it can be moved around so Lamar can place them
   * where he wants them."**
   *
   * A MODE rather than a permanent drag. Tapping a piece already means "walk
   * over and use it", and one gesture cannot mean two things — a boy who
   * wanted to sit in his chair and instead dragged it across the room has been
   * punished for tapping the thing he owns.
   *
   * The interaction is deliberately BOTH a drag and a two-tap place:
   * pointerdown picks a piece up, it follows the pointer, and pointerup drops
   * it — unless he never moved, in which case it stays in his hand and his
   * next tap on the floor puts it down. Drag works, tapping works, and neither
   * needs to be explained. That matters because **no guard in this repo can
   * test a pointer event**, so the interaction has to survive one of its two
   * halves not behaving.
   * ===================================================================== */
  const hqLayout = useAppStore((s) => s.hqLayout) || {};
  const setHqSpot = useAppStore((s) => s.setHqSpot);
  const resetHqLayout = useAppStore((s) => s.resetHqLayout);

  const [arranging, setArranging] = useState(false);
  const [heldId, setHeldId] = useState(null);
  const [ghost, setGhost] = useState(null); // live {u,v} while it is in his hand
  const svgRef = useRef(null);
  const movedRef = useRef(false);

  /** Where a piece stands right now: his choice, else the designed spot. */
  const spotOf = (id) => {
    const L = LAYOUT[id];
    if (!L || L.wall || L.side || L.shelf) return null;
    // A piece that rides on another one follows it, so moving the desk takes
    // the computer standing on it. Without this he drags the desk away and
    // leaves a monitor floating over the carpet.
    const src = L.follows || id;
    return hqLayout[src] || { u: LAYOUT[src].u, v: LAYOUT[src].v };
  };

  /**
   * WHERE HE IS STANDING, resolved from the piece's CURRENT position.
   *
   * A floor station carries an offset, so this reads where the piece actually
   * is — including anywhere he has dragged it — and stands him beside it. A
   * wall or shelf station carries an absolute spot, because those pieces do
   * not move. Clamped, because an offset off the edge of the floor would put
   * him in a wall.
   */
  /**
   * WHERE HE IS STANDING vs WHAT HE HAS SELECTED — two different questions,
   * and Phase 2 is the reason they had to come apart.
   *
   * `atId` means "he tapped this": it lights the piece up, opens the panel
   * that explains it, and pins him there. `standId` means "his feet are
   * here", which is `atId` when he has chosen something and his current
   * roaming stop when he has not.
   *
   * Keeping these separate is what stops the room selecting things by
   * itself. A wandering cadet who lit up every piece he drifted past, and
   * popped a panel of text open each time, would be a room grabbing at his
   * attention while he is trying to read something else on screen.
   */
  const standId = atId || (PREFERS_REDUCED_MOTION ? null : wander.cadet?.at) || null;
  const standStation = (standId && owned.has(standId) && STATIONS[standId]) || null;

  const spot = (() => {
    if (!standStation) return HOME_SPOT;
    const base = spotOf(standId) || { u: HOME_SPOT.u, v: HOME_SPOT.v };
    return standingSpotFor('cadet', standStation, base) || HOME_SPOT;
  })();

  /**
   * How high his hands have to be to meet the thing he walked up to. Computed
   * from where the piece IS, so dragging the desk moves the surface his hands
   * reach for — the same reason the standing spot is an offset and not a place.
   */
  const reachY = standStation ? reachYFor(standStation, spotOf(standId), spot) : null;

  /** Client coords -> floor (u, v). Null if the SVG has no CTM yet. */
  const floorAt = (e) => {
    const svg = svgRef.current;
    if (!svg || !svg.getScreenCTM) return null;
    const ctm = svg.getScreenCTM();
    if (!ctm) return null;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const p = pt.matrixTransform(ctm.inverse());
    return unprojectFloor(p.x, p.y);
  };

  const grab = (id) => (e) => {
    if (e.preventDefault) e.preventDefault();
    movedRef.current = false;
    // Tapping the floor while holding something puts it down; tapping a
    // DIFFERENT piece swaps to that one rather than doing nothing.
    setHeldId(id);
    setGhost(spotOf(id));
  };

  const onMove = (e) => {
    if (!heldId) return;
    const at = floorAt(e);
    if (!at) return;
    movedRef.current = true;
    setGhost({ u: Math.min(0.98, Math.max(0.02, at.u)), v: Math.min(0.98, Math.max(0.02, at.v)) });
  };

  const drop = (at) => {
    if (!heldId || !at) return;
    const snapped = snapToGrid(at.u, at.v);
    setHqSpot(heldId, snapped.u, snapped.v);
    setHeldId(null);
    setGhost(null);
  };

  const onUp = (e) => {
    if (!heldId) return;
    // A tap with no movement keeps it in his hand — that is the two-tap half.
    if (!movedRef.current) return;
    drop(floorAt(e) || ghost);
  };

  /** Tapping bare floor while holding: put it down there. */
  const onFloorTap = (e) => {
    if (!heldId) return;
    drop(floorAt(e));
  };

  const kit = useMemo(() => MISSION_EQUIPMENT.filter((i) => !SHIP_PART_IDS.has(i.id)), []);
  const shipParts = useMemo(() => MISSION_EQUIPMENT.filter((i) => SHIP_PART_IDS.has(i.id)), []);

  const ownedHq = HQ_ITEMS.filter((i) => owned.has(i.id)).length;
  const pct = HQ_ITEMS.length ? Math.round((ownedHq / HQ_ITEMS.length) * 100) : 0;

  /**
   * Painter's order: walls, then anything lying ON the floor, then everything
   * else back-to-front.
   *
   * The middle band is new (Aug 16, 2026). The rug was sorted by its own base
   * point like a piece of furniture, which drew it OVER the desk and chair
   * standing on it. A rug on top of a chair is a small thing that makes a whole
   * room read as nonsense.
   */
  const ordered = useMemo(
    () => [...HQ_ITEMS].sort((a, b) => {
      const A = LAYOUT[a.id], B = LAYOUT[b.id];
      if (!A || !B) return 0;
      const rank = (L) => (L.wall || L.side ? 0 : L.shelf ? 1 : L.layer === 'floor' ? 2 : 3);
      if (rank(A) !== rank(B)) return rank(A) - rank(B);
      if (A.wall || A.side || A.shelf) return 0;
      return (A.v ?? 0) - (B.v ?? 0);
    }),
    []
  );

  /**
   * THE ROBOT LOOKS UP WHEN HE WALKS PAST. (Phase 1, "on arrival".)
   *
   * The only motion in this phase that is not a loop, and the only one that is
   * about him rather than about the room. -1 is fully left, +1 fully right, 0 is
   * straight ahead — computed from where the cadet is standing relative to
   * wherever the robot is currently standing, so it survives both of them being
   * dragged somewhere else.
   *
   * It is a CSS TRANSITION, not an animation: the value changes when he arrives
   * at a station and at no other time, so this costs one re-render per walk
   * rather than sixty per second. A head that swivelled continuously would be a
   * security camera; a head that turns once, when someone arrives, is a machine
   * noticing him.
   */
  /* =====================================================================
   * PHASE 4 — THE CREW.
   *
   * One crew member today, the Flight Engineer, because she asked to see one
   * work before six are built and because he owns exactly one HQ item — the
   * Engineering Workstation — so every other post is a dashed outline.
   *
   * Arrival is DERIVED, never stored. Where they are posted is his choice and
   * lives in `hqCrewPosts` next to `hqLayout`.
   * ===================================================================== */
  const hqCrewPosts = useAppStore((s) => s.hqCrewPosts) || {};
  const setCrewPost = useAppStore((s) => s.setCrewPost);

  const roster = useMemo(
    () => crewRoster(
      { lessonProgress, allLessons, khanAcademyAssignments, gardenLog },
      { posts: hqCrewPosts, owned }
    ),
    [lessonProgress, khanAcademyAssignments, gardenLog, hqCrewPosts, owned]
  );

  /**
   * Only crew who have ARRIVED are drawn. A crew member he has not earned is
   * not in the room at all — no silhouette, no greyed-out placeholder. Same
   * empty-state rule as the award wall.
   *
   * A posted crew member stands where that station's `STATIONS` entry says to
   * stand, using the same `du/dv` offset the cadet uses — so dragging the desk
   * takes the engineer with it, for free. An unposted one waits at the muster
   * point.
   */
  /**
   * EVERYWHERE THERE IS TO GO: pieces he OWNS that have a station.
   *
   * Derived from ownership every time, so a roamer can never be sent to a
   * dashed outline. That is the Phase 3 empty-state rule wearing a
   * different hat — a figure standing at a piece he has not bought is the
   * room showing him something he has not earned, and it would look like a
   * feature rather than the bug it is.
   */
  const wanderStops = useMemo(
    () => HQ_ITEMS.filter((i) => owned.has(i.id) && STATIONS[i.id]).map((i) => i.id),
    [owned]
  );

  /**
   * Who is roaming and who is pinned. `at` is where a PINNED figure is, so
   * the roamers know which stop not to walk into.
   */
  const wanderFigures = useMemo(() => ([
    { id: 'cadet', pinned: Boolean(atId), at: atId || null },
    ...roster.filter((c) => c.arrived).map((c) => ({
      id: c.id,
      pinned: Boolean(hqCrewPosts[c.id]),
      at: c.post || null
    }))
  ]), [atId, roster, hqCrewPosts]);

  /**
   * ---- ONE SLOW TIMER, AND WHY THAT IS NOT THE THING PHASE 1 BANNED ----
   *
   * Phase 1's rule is that nothing in this room drives a FRAME from
   * JavaScript, and its guard bans `requestAnimationFrame` and
   * `setInterval` outright. This does neither. It wakes every three
   * seconds, asks a pure function whether anybody's dwell has run out, and
   * almost always gets back the same state object it passed in — at which
   * point `setWander` returns `cur`, React bails out, and nothing renders.
   *
   * When somebody IS due, it is one state change. The travelling is done
   * by the 900ms CSS transform transition that was already on the figure
   * for walking to a tapped piece. The compositor moves them; JavaScript
   * only ever says where to.
   *
   * Twenty comparisons a minute against rAF's three thousand six hundred,
   * on the laptop that is also running his schoolwork.
   *
   * Held in a ref rather than the dependency list so that tapping a piece
   * does not tear the timer down and start the three seconds again — a
   * boy tapping around his room could otherwise starve the tick forever
   * and the roaming would look broken exactly when he was paying attention.
   */
  /**
   * WHERE A GIVEN FIGURE WOULD STAND AT A GIVEN STATION, in screen pixels.
   *
   * The cadet takes the near side of a piece (`du/dv`), a crew member the far
   * side (`crewSpotFor`) — so the same station is two different places
   * depending on WHO is being asked, and the answer has to know which.
   *
   * This exists because refusing to send two figures to the same station id
   * turned out not to be the same thing as keeping them apart: a rendered
   * frame caught two of them 2.3px apart at two DIFFERENT stations, and
   * enumerating all 342 pairs found thirteen more inside 70px. Neighbouring
   * furniture has neighbouring standing spots; the front-row `v` clamp
   * collapses several onto one line. Identity is not proximity.
   */
  const standingSpotOf = (figureId, stationId) => {
    const st = stationId && owned.has(stationId) ? STATIONS[stationId] : null;
    if (!st) return null;
    const s = standingSpotFor(
      figureId, st, spotOf(stationId) || { u: HOME_SPOT.u, v: HOME_SPOT.v },
      LAYOUT[stationId]?.foot || 0
    );
    if (!s) return null;
    const p = projectFloor(s.u, s.v);
    return [p.x, p.y];
  };

  const wanderInputs = useRef(null);
  wanderInputs.current = {
    figures: wanderFigures, stops: wanderStops, spotOf: standingSpotOf
  };

  useEffect(() => {
    // Reduced motion stops it dead: everybody stands at their post, which
    // is precisely the room as it behaved before this phase. Every feature
    // intact, one less thing moving. Arranging stops it too — figures
    // wandering under a desk he is dragging would be unusable.
    if (PREFERS_REDUCED_MOTION || arranging) return undefined;
    let timer = null;
    const tick = () => {
      const { figures, stops, spotOf: standingAt } = wanderInputs.current || {};
      const rolls = {};
      for (const f of figures || []) rolls[f.id] = rollFor();
      const now = Date.now();
      setWander((cur) => {
        const r = wanderTick({ state: cur, figures, stops, now, rolls, spotOf: standingAt });
        return r.changed ? r.state : cur;
      });
      timer = setTimeout(tick, WANDER_TICK_MS);
    };
    timer = setTimeout(tick, WANDER_TICK_MS);
    return () => clearTimeout(timer);
  }, [arranging]);

  /**
   * A crew member stands at the post Lamar gave them; an unposted one
   * stands wherever they have roamed to, falling back to their default
   * post until the first tick moves them.
   *
   * `crewSpotFor` puts them on the FAR side of whatever they are at, so a
   * roamer and the cadet at neighbouring pieces still read as two people
   * working rather than one figure with a shadow problem.
   */
  const crewInRoom = useMemo(() => roster.filter((c) => c.arrived).map((c) => {
    const pinned = Boolean(hqCrewPosts[c.id]);
    const postId = pinned ? c.post : (wander[c.id]?.at || c.post);
    const station = postId && owned.has(postId) ? STATIONS[postId] : null;
    if (!station) return { ...c, spot: MUSTER_SPOT, reachY: null };
    const base = spotOf(postId) || { u: HOME_SPOT.u, v: HOME_SPOT.v };
    const spot = crewSpotFor(station, base, LAYOUT[postId]?.foot || 0);
    if (!spot) return { ...c, spot: MUSTER_SPOT, reachY: null };
    return { ...c, spot, reachY: reachYFor(station, spotOf(postId), spot) };
  }), [roster, hqLayout, wander, hqCrewPosts, owned]);

  const robotFacing = (() => {
    const r = spotOf('hq-robot');
    if (!r || !owned.has('hq-robot')) return 0;
    const rp = projectFloor(r.u, r.v);
    const bp = projectFloor(spot.u, spot.v);
    return Math.max(-1, Math.min(1, (bp.x - rp.x) / 260));
  })();

  /** One piece, wherever it is standing right now. Used by both depth bands. */
  const renderPiece = (item) => (
    <Piece
      key={item.id}
      item={item}
      owned={owned.has(item.id)}
      active={atId === item.id && !arranging}
      at={
        heldId && ghost && (item.id === heldId || LAYOUT[item.id]?.follows === heldId)
          ? snapToGrid(ghost.u, ghost.v)
          : spotOf(item.id)
      }
      arranging={arranging}
      held={heldId === item.id}
      onGrab={grab(item.id)}
      truth={truth[item.id] ?? null}
      facing={item.id === 'hq-robot' ? robotFacing : 0}
      onUse={STATIONS[item.id] ? () => setAtId((cur) => (cur === item.id ? null : item.id)) : undefined}
    />
  );

  /**
   * WHERE THE WARM LIGHT IS, RIGHT NOW.
   *
   * Read from the lamp's live spot, so dragging the lamp drags the light. And
   * only if he OWNS the lamp: an unbought lamp is a dashed outline, and a room
   * lit by an outline would be the shop's promise delivered for free. Without
   * it the room is lit by its screens and the window, which is cooler, dimmer,
   * and true — and makes the Task Lamp the most worthwhile 120 coins in the
   * store, which it should be.
   */
  const lampSpot = owned.has('hq-lamp')
    ? (heldId === 'hq-lamp' && ghost ? snapToGrid(ghost.u, ghost.v) : spotOf('hq-lamp'))
    : null;
  const lamp = lampSpot ? lampLightAt(lampSpot) : null;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="font-display text-xs uppercase tracking-widest text-signal-amber">Mission Control HQ</p>
          <p className="text-[11px] text-ink-500">{ownedHq} of {HQ_ITEMS.length} installed · {pct}% furnished</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-24 overflow-hidden rounded-full bg-space-800">
            <div className="h-full rounded-full bg-signal-amber transition-all" style={{ width: `${pct}%` }} />
          </div>
          {ownedHq > 0 && (
            <button
              type="button"
              onClick={() => {
                setArranging((on) => !on);
                setHeldId(null);
                setGhost(null);
                setAtId(null);
              }}
              className={
                'rounded-lg border px-3 py-1 text-xs font-display font-700 transition ' +
                (arranging
                  ? 'border-signal-cyan bg-signal-cyan/15 text-signal-cyan'
                  : 'border-space-600 bg-space-800 text-ink-300 hover:border-signal-cyan hover:text-ink-100')
              }
            >
              {arranging ? 'Done' : 'Arrange'}
            </button>
          )}
        </div>
      </div>

      {arranging && (
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-signal-cyan/40 bg-signal-cyan/5 p-3">
          <p className="min-w-0 text-[11px] leading-relaxed text-ink-300">
            {heldId ? (
              <>
                <span className="text-signal-cyan">Holding it.</span> Drop it anywhere on the floor — it
                snaps to the grid, so it lands straight whatever you do.
              </>
            ) : (
              <>
                Drag any piece where you want it, or tap it and tap the floor. Everything snaps to the
                grid. <span className="text-ink-500">Wall pieces and the two shelf models stay put.</span>
              </>
            )}
          </p>
          <button
            type="button"
            onClick={() => { resetHqLayout(); setHeldId(null); setGhost(null); }}
            className="flex-none rounded-lg border border-space-600 bg-space-800 px-3 py-1 text-xs font-display font-700 text-ink-300 transition hover:border-signal-amber hover:text-ink-100"
          >
            Put it back the way it was
          </button>
        </div>
      )}

      {/* ================== THE ROOM ================== */}
      <div className="overflow-hidden rounded-2xl border border-space-700 shadow-panel">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${VB.w} ${VB.h}`}
          className="w-full"
          role="img"
          aria-label="Mission Control HQ room"
          onPointerMove={arranging ? onMove : undefined}
          onPointerUp={arranging ? onUp : undefined}
          onPointerLeave={arranging && heldId ? () => { setHeldId(null); setGhost(null); } : undefined}
          onClick={arranging && heldId ? onFloorTap : undefined}
          style={arranging ? { touchAction: 'none' } : undefined}
        >
          {/**
            * The idle loops, as a stylesheet inside the drawing.
            *
            * Scoped here rather than added to `index.css` because these class
            * names mean nothing outside this room, and a global `.hq-sway` is a
            * name waiting to collide with something. The rules ride with the SVG.
            */}
          <style>{HQ_MOTION}</style>

          <defs>
            {/**
              * ---- THE FLOOR CAME UP (Aug 29, 2026) ----
              *
              * The first lit frame had eleven contact shadows in the DOM, every
              * one of them the right size and in the right place, and not one
              * of them visible. The floor ran to #0b1622 — near black — and
              * **you cannot draw a shadow on a floor that is already dark**.
              * The shadows were correct and the surface had no room for them.
              *
              * So the floor gets value back at both ends. It is the least
              * interesting line in this file and it is the one that decides
              * whether the biggest change in the whole phase is visible.
              */}
            <linearGradient id="hqFloor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#24405c" />
              <stop offset="100%" stopColor="#172a3c" />
            </linearGradient>
            <radialGradient id="hqWindow" cx="35%" cy="35%">
              <stop offset="0%" stopColor="#1d4260" />
              <stop offset="100%" stopColor="#050b13" />
            </radialGradient>

            {/* ==============================================================
                THE LIGHT. (Phase 0, Aug 29, 2026.)

                All of it is declarative — gradients and one blur, no script,
                nothing that re-renders. The build spec is explicit about why:
                this component is 1,400 lines and must not be asked to run
                sixty times a second on a laptop that is also running his
                schoolwork.

                Every colour below comes from LIGHT in hqGeometry.js rather
                than being typed in twice. The brand tokens underneath are
                untouched: light is added ON TOP with mix-blend-mode screen, so
                a theme change still reaches a lit room. If a browser declines
                to blend, the layer draws as a soft translucent wash instead of
                a glow — dimmer than intended, and still a room.
                ============================================================== */}

            {/* Under every object: black at its foot, gone by its edge. The
                core is held flat to 40% of the radius before it falls — a
                shadow that starts fading the instant it leaves the object
                reads as a smudge under it rather than as contact with it. */}
            <radialGradient id="hqContact">
              <stop offset="0%" stopColor="#000" stopOpacity={LIGHT.contact.from} />
              <stop offset="40%" stopColor="#000" stopOpacity={LIGHT.contact.from * 0.8} />
              <stop offset="75%" stopColor="#000" stopOpacity={LIGHT.contact.from * 0.28} />
              <stop offset="100%" stopColor="#000" stopOpacity={LIGHT.contact.to} />
            </radialGradient>

            {/* The task lamp. Hot in the middle, amber at the edge, out by the
                rim — a lamp lights a patch, not a hemisphere. */}
            <radialGradient id="hqLamp">
              <stop offset="0%" stopColor={LIGHT.lamp.hot} stopOpacity={LIGHT.lamp.max} />
              <stop offset="42%" stopColor={LIGHT.lamp.edge} stopOpacity={LIGHT.lamp.max * 0.42} />
              <stop offset="100%" stopColor={LIGHT.lamp.edge} stopOpacity="0" />
            </radialGradient>

            {/* Screens, the window, the lit tank. Cool, and there are several,
                which is where the two-temperature depth comes from. */}
            <radialGradient id="hqScreen">
              <stop offset="0%" stopColor={LIGHT.screen.hot} stopOpacity={LIGHT.screen.max} />
              <stop offset="55%" stopColor={LIGHT.screen.edge} stopOpacity={LIGHT.screen.max * 0.35} />
              <stop offset="100%" stopColor={LIGHT.screen.edge} stopOpacity="0" />
            </radialGradient>

            {/* Fill from the front of the room. Without it everything away from
                the lamp collapses to silhouette, which reads as a hole in the
                picture rather than as shadow. */}
            <linearGradient id="hqFill" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor={LIGHT.fill.color} stopOpacity={LIGHT.fill.opacity} />
              <stop offset="100%" stopColor={LIGHT.fill.color} stopOpacity="0" />
            </linearGradient>

            {/* A vignette, gently. 0.34 — enough to frame, not enough to
                swallow the corners, and the corners are where his grow box and
                his aquarium stand. */}
            <radialGradient id="hqVignette" cx="50%" cy="52%" r="72%">
              <stop offset="0%" stopColor="#000" stopOpacity="0" />
              <stop offset="62%" stopColor="#000" stopOpacity="0" />
              <stop offset="100%" stopColor="#000" stopOpacity={LIGHT.vignette} />
            </radialGradient>

            {/* Haze on the back wall. Distance is not just smaller — it is
                lower in contrast, which is the half that makes a flat drawing
                read as deep. */}
            <linearGradient id="hqHaze" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2a4a68" stopOpacity=".22" />
              <stop offset="100%" stopColor="#2a4a68" stopOpacity=".08" />
            </linearGradient>

            {/**
              * The far wall goes slightly soft. Applied ONLY to pieces hung on
              * the back wall and standing on the back shelves — the side-wall
              * posters run from the back of the room to the front of it, and
              * blurring a poster near the viewer would be the perspective
              * argued backwards.
              *
              * stdDeviation is small on purpose. This is a static filter on a
              * static group, so it costs one rasterisation, not one per frame.
              */}
            <filter id="hqFar" x="-8%" y="-8%" width="116%" height="116%">
              <feGaussianBlur stdDeviation="0.9" />
            </filter>

            {/**
              * The floorboards fade toward the vanishing point.
              *
              * The spec asks for grid lines that thicken toward the viewer, and
              * the ROWS below genuinely do — each row sits at one depth, so it
              * can take one width from `depth(y)`. The converging boards cannot:
              * a single SVG stroke has one width along its whole length, and
              * these run from the front of the room to the back of it. Varying
              * the stroke's OPACITY along the same axis buys the same read —
              * near lines assert themselves, far ones give way — and it is the
              * thing SVG will actually do. Written down because "why is this one
              * done differently" is a fair question to ask of it later.
              */}
            <linearGradient id="hqGridFade" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#94b4ce" stopOpacity=".20" />
              <stop offset="100%" stopColor="#94b4ce" stopOpacity=".045" />
            </linearGradient>

            {/* ==============================================================
                MATERIALS, NOT OUTLINES.

                Everything in this room was drawn as a stroked outline with one
                flat fill, and a stroked outline is a diagram of an object
                rather than the object. What separates a desk from a drawing of
                a desk, at this level of detail, is almost entirely that the
                desk's top catches light along one band and its legs do not.

                Six materials, shared by all eighteen pieces. Shared on purpose:
                eighteen bespoke gradients would be eighteen places for the room
                to drift out of agreement with itself, and the pieces are meant
                to look like they were bought for the same room.

                Every one of these is spent through `mat()`, which hands back
                `none` for a piece he does not own — an unowned piece stays a
                dashed outline with a price under it, and giving it brushed
                metal would be the store's window dressing the empty shelf.
                ============================================================== */}

            {/* METAL — one hard specular band, because that is the whole tell */}
            <linearGradient id="mMetal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#54708a" />
              <stop offset="30%" stopColor="#3d5266" />
              <stop offset="38%" stopColor="#9dbdd6" />
              <stop offset="46%" stopColor="#41576b" />
              <stop offset="100%" stopColor="#26333f" />
            </linearGradient>
            {/* the same, running across — for tubes and uprights */}
            <linearGradient id="mMetalX" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#26333f" />
              <stop offset="26%" stopColor="#4a6076" />
              <stop offset="34%" stopColor="#a2c2da" />
              <stop offset="44%" stopColor="#44596d" />
              <stop offset="100%" stopColor="#222d38" />
            </linearGradient>

            {/* GLASS — a highlight and something you can see through */}
            <linearGradient id="mGlass" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#cdeefb" stopOpacity=".34" />
              <stop offset="30%" stopColor="#cdeefb" stopOpacity=".05" />
              <stop offset="100%" stopColor="#9fd8ee" stopOpacity=".12" />
            </linearGradient>

            {/* WOOD — grain, and warmer than anything else in a cold room */}
            <linearGradient id="mWood" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8c6238" />
              <stop offset="35%" stopColor="#6d4a28" />
              <stop offset="100%" stopColor="#422c17" />
            </linearGradient>

            {/* FABRIC — soft, no specular at all. That absence IS the material */}
            <linearGradient id="mFabric" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#54748f" />
              <stop offset="100%" stopColor="#26384a" />
            </linearGradient>

            {/* PAPER — lit from the lamp side, which is the left of this room */}
            <linearGradient id="mPaper" x1="0" y1="0" x2="1" y2="0.4">
              <stop offset="0%" stopColor="#efe3c8" stopOpacity=".26" />
              <stop offset="100%" stopColor="#efe3c8" stopOpacity=".06" />
            </linearGradient>

            {/* WATER — lit from within, darker at the bottom of the tank */}
            <linearGradient id="mWater" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#5ee0f7" stopOpacity=".34" />
              <stop offset="100%" stopColor="#0d5f7d" stopOpacity=".5" />
            </linearGradient>

            {/* SOIL — dark, and the only genuinely matte black in the room */}
            <linearGradient id="mSoil" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#33241a" />
              <stop offset="100%" stopColor="#150e08" />
            </linearGradient>

            {/* GOLD FOIL — the satellite's panels, and nothing else */}
            <linearGradient id="mFoil" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f0c063" />
              <stop offset="40%" stopColor="#a97a24" />
              <stop offset="55%" stopColor="#ffe2a0" />
              <stop offset="100%" stopColor="#8a5f18" />
            </linearGradient>

            {/**
              * THE LAMP'S CONE.
              *
              * It was a flat wash in a trapezoid, and the first frame showed
              * exactly what that is: a solid amber wedge with three hard edges,
              * standing on the floor like a piece of card. Light has no edges.
              * The gradient runs it out to nothing before it reaches the
              * carpet, and the carpet is lit by the light layer instead — which
              * is the honest division of labour, because that is where the pool
              * of light actually is.
              */}
            <linearGradient id="mLampCone" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffc266" stopOpacity=".2" />
              <stop offset="55%" stopColor="#ffb04d" stopOpacity=".07" />
              <stop offset="100%" stopColor="#ff8c1a" stopOpacity="0" />
            </linearGradient>

            {/* DARK GLASS — a screen that is off, or an objective lens */}
            <linearGradient id="mScreenGlass" x1="0" y1="0" x2="0.6" y2="1">
              <stop offset="0%" stopColor="#0e2735" />
              <stop offset="45%" stopColor="#071722" />
              <stop offset="100%" stopColor="#0b2130" />
            </linearGradient>
          </defs>

          {/* --- the box: one-point perspective --- */}
          <polygon points={`0,0 ${VB.w},0 ${BACK.x2},${BACK.y1} ${BACK.x1},${BACK.y1}`} fill={C.ceiling} />
          <polygon points={`0,0 ${BACK.x1},${BACK.y1} ${BACK.x1},${BACK.y2} 0,${VB.h}`} fill={C.wallSide} />
          <polygon points={`${VB.w},0 ${BACK.x2},${BACK.y1} ${BACK.x2},${BACK.y2} ${VB.w},${VB.h}`} fill={C.wallSideDark} />
          <rect x={BACK.x1} y={BACK.y1} width={BACK.x2 - BACK.x1} height={BACK.y2 - BACK.y1} fill={C.wallBack} />
          <polygon points={`0,${VB.h} ${VB.w},${VB.h} ${BACK.x2},${BACK.y2} ${BACK.x1},${BACK.y2}`} fill="url(#hqFloor)" />

          {/* floorboards converging on the vanishing point, fading as they go */}
          {[0.12, 0.3, 0.5, 0.7, 0.88].map((t) => (
            <line
              key={t}
              x1={VB.w * t} y1={VB.h}
              x2={BACK.x1 + (BACK.x2 - BACK.x1) * t} y2={BACK.y2}
              stroke="url(#hqGridFade)" strokeWidth="2.4"
            />
          ))}
          {/* The rows DO thicken toward the viewer: each sits at one depth, so
              each takes its weight from that depth — 1.4 units against the back
              wall, 3.1 at the front edge, off the same `depth()` every object
              in the room is scaled by. */}
          {[0.25, 0.5, 0.78].map((t) => {
            const y = BACK.y2 + (VB.h - BACK.y2) * t * t;
            const inset = (BACK.x1) * (1 - (y - BACK.y2) / (VB.h - BACK.y2));
            const k = depth(y);
            return (
              <line
                key={t}
                x1={inset} y1={y} x2={VB.w - inset} y2={y}
                stroke={C.line} strokeWidth={(2.6 * k).toFixed(2)}
                opacity={(0.55 + 0.45 * k).toFixed(2)}
              />
            );
          })}

          {/* wall/floor and wall/wall edges */}
          <polyline
            points={`0,${VB.h} ${BACK.x1},${BACK.y2} ${BACK.x2},${BACK.y2} ${VB.w},${VB.h}`}
            fill="none" stroke={C.edge} strokeWidth="2"
          />
          <line x1={BACK.x1} y1={BACK.y1} x2={BACK.x1} y2={BACK.y2} stroke={C.edge} strokeWidth="2" />
          <line x1={BACK.x2} y1={BACK.y1} x2={BACK.x2} y2={BACK.y2} stroke={C.edge} strokeWidth="2" />
          <line x1={BACK.x1} y1={BACK.y1} x2={BACK.x2} y2={BACK.y1} stroke={C.edge} strokeWidth="2" />

          {/**
            * THE WINDOW — the reason the room exists, and now the sky he has
            * earned. (Phase 3.)
            *
            * One star for every aerospace lesson mastered, out of the 54 that
            * exist; the constellation fills over the year. Positions come from
            * `starField`, which is deterministic, so the sky he saw yesterday is
            * the sky he sees today plus whatever he mastered since. A field that
            * reshuffled on every render would be decoration, and he would work
            * that out inside a week.
            *
            * It is gated on OWNING THE TELESCOPE, because the telescope is the
            * object the spec binds this to — so the piece he buys is the piece
            * that shows him what he has done. Without it the window keeps its
            * three original stars and its planet: a night sky, just not his.
            *
            * The empty state is a sky with nothing in it, which is what an
            * unearned constellation genuinely looks like and is the reason to
            * point a telescope at anything.
            */}
          <g>
            <rect x="700" y="360" width="200" height="120" rx="8" fill="url(#hqWindow)" stroke="rgba(34,211,238,.3)" strokeWidth="2" />
            {owned.has('hq-telescope') && truth['hq-telescope']?.count > 0 ? (
              /* The field drifts on 40s — the slowest loop in the room, because
                 it is standing in for the rotation of the Earth. Five units in
                 forty seconds is barely perceptible, and that is correct: a sky
                 that visibly slid would be a sky on a conveyor belt. */
              <g className="hq-anim hq-sky" stroke="none">
                {starField(truth['hq-telescope'].count, 170, 96).map((st, i) => (
                  <circle
                    key={i}
                    cx={800 + st.x}
                    cy={472 + st.y}
                    r={st.r}
                    fill="#dff2ff"
                    opacity={0.5 + (i % 3) * 0.18}
                  />
                ))}
              </g>
            ) : (
              <>
                <circle cx="762" cy="404" r="2.5" fill="#cfe4f2" opacity=".9" />
                <circle cx="836" cy="440" r="2" fill="#cfe4f2" opacity=".7" />
                <circle cx="806" cy="386" r="1.6" fill="#cfe4f2" opacity=".6" />
              </>
            )}
            <circle cx="866" cy="404" r="9" fill="rgba(245,165,36,.35)" />
          </g>

          {/* ------------------------------------------------------------------
              SHELVES — parent's request, Aug 16 2026: "place shelves on the
              wall to hold small items."

              Fixtures, not purchases. She asked for somewhere to PUT things,
              and charging him for the somewhere would be answering a different
              question. They also do real work on the empty room: two solid
              horizontal lines on a wall that is otherwise five dashed ghosts.

              Flanking the window rather than crossing it, and below the frames
              hanging above them, so the wall reads top-to-bottom as: display,
              art, shelf.
             ------------------------------------------------------------------ */}
          {[
            { x: 462, w: 208 },
            { x: 930, w: 208 }
          ].map((sh) => (
            <g key={sh.x}>
              {/* board */}
              <rect x={sh.x} y={505} width={sh.w} height="9" rx="2" fill={C.metal} />
              <rect x={sh.x} y={505} width={sh.w} height="3" rx="1.5" fill={C.metalLight} opacity=".7" />
              {/* brackets */}
              <path
                d={`M${sh.x + 18} 514 l0 22 l14 -22 Z M${sh.x + sh.w - 18} 514 l0 22 l-14 -22 Z`}
                fill={C.metal}
                opacity=".8"
              />
            </g>
          ))}

          {/* baseboard */}
          <rect x={BACK.x1} y={BACK.y2 - 14} width={BACK.x2 - BACK.x1} height="14" fill="rgba(0,0,0,.25)" />

          {/* The grid he is snapping to, shown only while he is arranging.
              Visible at all times it would be graph paper; visible only then,
              it explains why the piece jumped where it did. */}
          {arranging && (
            <g opacity="0.5">
              {Array.from({ length: GRID.cols - 1 }).map((_, i) => {
                const u = (i + 1) / GRID.cols;
                const a = projectFloor(u, 1 / GRID.rows);
                const b = projectFloor(u, 1 - 1 / GRID.rows);
                return <line key={`c${u}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={C.cyan} strokeWidth="1.5" opacity=".35" />;
              })}
              {Array.from({ length: GRID.rows - 1 }).map((_, i) => {
                const v = (i + 1) / GRID.rows;
                const a = projectFloor(1 / GRID.cols, v);
                const b = projectFloor(1 - 1 / GRID.cols, v);
                return <line key={`r${v}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={C.cyan} strokeWidth="1.5" opacity=".35" />;
              })}
            </g>
          )}

          {/* Where it will land — snapped, so he sees the grid decide before
              he lets go rather than after. */}
          {arranging && heldId && ghost && (() => {
            const sn = snapToGrid(ghost.u, ghost.v);
            const at = projectFloor(sn.u, sn.v);
            const k = depth(at.y);
            return (
              <g transform={`translate(${at.x} ${at.y}) scale(${k})`}>
                <ellipse cx="0" cy="0" rx="58" ry="15" fill="rgba(34,211,238,.18)" stroke={C.cyan} strokeWidth="2.5" />
              </g>
            );
          })()}

          {/**
            * --- everything in it, in two bands ---
            *
            * DISTANCE READS AS DISTANCE. The pieces against the back wall — the
            * holo display, and the two models on the back shelves — go through
            * a small blur and then under a haze, because the far end of a room
            * is softer and lower in contrast than the near end. That is the
            * half of depth that scale alone does not buy.
            *
            * The split is by band, not by a new sort: `ordered` is already
            * painted wall → shelf → rug → furniture, so taking the first two
            * ranks into their own group preserves the painter's order exactly.
            * Side-wall pieces stay in the near band on purpose — they run from
            * the back of the room to the front of it, so a single blur across
            * them would argue the perspective backwards.
            */}
          <g filter="url(#hqFar)">
            {ordered.filter((i) => LAYOUT[i.id]?.wall || LAYOUT[i.id]?.shelf).map(renderPiece)}
          </g>

          {/* the haze itself, over the back wall and everything hung on it */}
          <rect
            x={BACK.x1} y={BACK.y1}
            width={BACK.x2 - BACK.x1} height={BACK.y2 - BACK.y1}
            fill="url(#hqHaze)" pointerEvents="none"
          />

          {ordered.filter((i) => !(LAYOUT[i.id]?.wall || LAYOUT[i.id]?.shelf)).map(renderPiece)}

          {/**
            * HIM, DRAWN LAST so he stands in front of the furniture rather
            * than inside it.
            *
            * A proper depth sort would insert him into `ordered` by his own v,
            * which would be more correct and would also let a desk drawn at
            * v0.44 cover a boy standing at v0.54. Drawing him on top is the
            * honest trade for a room this size: at these depths the only thing
            * that could legitimately occlude him is the aquarium, and a
            * twelve-year-old looking for himself in his own room should never
            * have to find himself behind the furniture.
            */}
          {/* He steps out while the furniture is moving. A figure standing in
              the middle of a room being rearranged is one more thing to drag
              by accident. */}
          {/**
            * EVERY FIGURE, SORTED BACK TO FRONT.
            *
            * ---- WHY THIS STOPPED BEING OPTIONAL (Aug 30, 2026) ----
            *
            * With one figure, drawing him last was an honest trade and the file
            * said so: at these depths the only thing that could legitimately
            * cover him is the aquarium, and a boy looking for himself in his own
            * room should never have to find himself behind the furniture.
            *
            * With two, that reasoning breaks. A crew member posted at the lab
            * bench stands at v0.125, against the back wall; the cadet at his
            * desk stands at v0.395, most of the room nearer. Drawing them in
            * array order would put the far figure ON TOP of the near one, which
            * is the one thing perspective cannot survive.
            *
            * So figures are sorted among themselves by their own v — the same
            * number the furniture is sorted by. They are still drawn after all
            * the furniture, which keeps the original trade intact: he is never
            * lost behind a desk, and the crew are never lost behind him.
            */}
          {!arranging && [
            { key: 'cadet', spot, avatar: equippedAvatar, gear: equippedGear, reachY },
            ...crewInRoom.map((c) => ({
              key: c.id, spot: c.spot, avatar: c.avatar, gear: {}, reachY: c.reachY
            }))
          ]
            .sort((a, b) => (a.spot.v ?? 0) - (b.spot.v ?? 0))
            .map((f) => (
              <CadetInRoom
                key={f.key}
                spot={f.spot}
                avatar={f.avatar}
                gear={f.gear}
                reachY={f.reachY}
              />
            ))}

          {/* ==============================================================
              THE LIGHT LAYER.

              Drawn LAST and blended with `screen`, which is what makes this
              light rather than paint: screen can only brighten, so it adds a
              glow over whatever is underneath instead of tinting it a flat
              colour. The furniture keeps its own materials and gets lit.

              `pointerEvents: none` throughout. Every one of these is a
              rectangle the size of the room, and a rectangle the size of the
              room that swallowed clicks would break arranging, walking up to a
              piece, and the two-tap place — all three at once, silently.

              TWO TEMPERATURES, which is where the depth comes from: warm from
              the one lamp, cool from the screens, the window and the tank. A
              room lit by one colour is a room lit by a filter.
              ============================================================== */}
          <g style={{ mixBlendMode: 'screen' }} pointerEvents="none" aria-hidden="true">
            {/* fill from the front, so nothing away from the lamp goes to
                silhouette */}
            <rect x="0" y={BACK.y2 - 60} width={VB.w} height={VB.h - BACK.y2 + 60} fill="url(#hqFill)" />

            {/**
              * The cool sources, all kept SMALL.
              *
              * They were half again this size in the first lit frame and they
              * merged into one cyan cloud across the whole back wall — which
              * brightened the far end of the room above the near end and
              * cancelled the haze drawn three lines earlier to do the opposite.
              * A screen lights the desk in front of it and the wall behind it,
              * and then it stops.
              */}
            {/* the window is a light source and always has been */}
            <ellipse cx="800" cy="420" rx="200" ry="145" fill="url(#hqScreen)" opacity=".5" />

            {/* the holo display on the back wall */}
            {owned.has('hq-holo') && (
              <ellipse cx="800" cy="250" rx="155" ry="105" fill="url(#hqScreen)" opacity=".6" />
            )}

            {/* the monitor, which sits above wherever the desk is */}
            {owned.has('hq-computer') && (() => {
              const d = spotOf('hq-desk');
              if (!d) return null;
              const p = projectFloor(d.u, d.v);
              const k = depth(p.y);
              return <ellipse cx={p.x} cy={p.y - 96 * k} rx={165 * k} ry={120 * k} fill="url(#hqScreen)" opacity=".7" />;
            })()}

            {/* the aquarium is lit from inside, which is most of why an
                aquarium looks like an aquarium */}
            {owned.has('hq-aquarium') && (() => {
              const a = spotOf('hq-aquarium');
              if (!a) return null;
              const p = projectFloor(a.u, a.v);
              const k = depth(p.y);
              return <ellipse cx={p.x} cy={p.y - 58 * k} rx={125 * k} ry={92 * k} fill="url(#hqScreen)" opacity=".5" />;
            })()}

            {/* warm: the task lamp, from wherever it is standing */}
            {lamp && (
              <ellipse cx={lamp.x} cy={lamp.y} rx={lamp.r} ry={lamp.r * 0.82} fill="url(#hqLamp)" />
            )}
          </g>

          {/* The vignette goes on top of the light, not under it — a frame the
              glow can spill into is not a frame. */}
          <rect x="0" y="0" width={VB.w} height={VB.h} fill="url(#hqVignette)" pointerEvents="none" aria-hidden="true" />
        </svg>
      </div>
      {/**
        * ---- WHAT HE IS DOING, IN WORDS (Aug 25, 2026) ----
        *
        * The parent asked for the avatar to USE the items, and a figure that
        * silently changes posture is a puppet. The line below is the half that
        * makes it worth doing twice — each one carries something real about the
        * thing he walked up to, so the room teaches instead of just moving.
        */}
      {atItem ? (
        <div className="flex items-start justify-between gap-3 rounded-xl border border-signal-cyan/40 bg-signal-cyan/5 p-3 shadow-panel">
          <div className="min-w-0">
            <p className="font-display text-xs uppercase tracking-widest text-signal-cyan">
              {atItem.icon} {atItem.name}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-ink-300">{STATIONS[atId].doing}</p>
          </div>
          <button
            type="button"
            onClick={() => setAtId(null)}
            className="flex-none rounded-lg border border-space-600 bg-space-800 px-3 py-1.5 text-xs font-display font-700 text-ink-300 transition hover:border-signal-cyan hover:text-ink-100"
          >
            Stand up
          </button>
        </div>
      ) : (
        <p className="text-[11px] text-ink-500">
          {ownedHq === 0
            ? 'Your HQ is empty. The dashed outlines are its floor plan — everything shown is in the Supply store, with its price.'
            : ownedHq === HQ_ITEMS.length
              ? 'Fully furnished. Tap anything to go and use it.'
              : 'Tap anything you own to go and use it. Dashed outlines are still in the Supply store — the number under each is its price.'}
        </p>
      )}

      {/* ================== CREW ==================
          Phase 4. A panel rather than a third pointer gesture: tapping a piece
          already means "walk over and use it", and dragging already means
          "move it". A third meaning for the same tap is how a boy who wanted to
          sit in his chair ends up posting an engineer to it.

          The panel is also the only place a crew member he has NOT earned may
          be mentioned — the room draws nobody who has not arrived, but hiding
          them entirely would make the six a secret rather than a goal. */}
      <div>
        <p className="text-xs font-display uppercase tracking-widest text-signal-amber">Crew</p>
        <p className="text-[11px] text-ink-500">
          Earned by real work, never bought. Post one to a station and they work there.
        </p>
        <div className="mt-2 space-y-2">
          {roster.map((c) => (
            <div
              key={c.id}
              className={
                'rounded-xl border p-3 shadow-panel ' +
                (c.arrived
                  ? 'border-signal-amber/40 bg-signal-amber/5'
                  : 'border-dashed border-space-700 bg-space-950/40')
              }
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className={'font-display text-sm font-700 ' + (c.arrived ? 'text-signal-amber' : 'text-ink-500')}>
                    {c.name}
                  </p>
                  <p className="mt-0.5 text-[11px] leading-relaxed text-ink-300">{c.who}</p>
                </div>
                {/* Not yet earned: say exactly what is missing, in real numbers.
                    A progress bar with nothing behind it is the fake this whole
                    project keeps refusing. */}
                {!c.arrived && c.progress && (
                  <p className="flex-none text-[11px] text-ink-500">
                    {c.progress.have} of {c.progress.need} Aerospace lessons mastered
                  </p>
                )}
              </div>

              {/**
                * ---- POSTED vs ROAMING, SAID HONESTLY (Aug 30, 2026) ----
                *
                * This highlighted `c.post`, which is the crew member's
                * DEFAULT post when Lamar has not chosen one. So a roaming
                * engineer was shown as "Posted at Engineering Workstation"
                * while standing at the telescope, and the "tap again to
                * stand them down" hint was a no-op — unposting fell straight
                * back to the same default and nothing on screen changed.
                *
                * A control that claims a state the room contradicts, and
                * does nothing when pressed, is worse than no control. Only a
                * post LAMAR CHOSE is a post; everything else is roaming, and
                * the panel now says which.
                */}
              {c.arrived && (
                <div className="mt-2 flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] text-ink-500">
                    {hqCrewPosts[c.id] ? 'Posted at' : 'Roaming — tap a station to post them'}
                  </span>
                  {HQ_ITEMS.filter((i) => owned.has(i.id) && STATIONS[i.id]).map((i) => {
                    const here = hqCrewPosts[c.id] === i.id;
                    return (
                      <button
                        key={i.id}
                        type="button"
                        onClick={() => setCrewPost(c.id, here ? null : i.id)}
                        className={
                          'rounded-lg border px-2 py-1 text-[11px] font-display transition ' +
                          (here
                            ? 'border-signal-amber bg-signal-amber/15 text-signal-amber'
                            : 'border-space-600 bg-space-800 text-ink-300 hover:border-signal-amber hover:text-ink-100')
                        }
                      >
                        {i.icon} {i.name}
                      </button>
                    );
                  })}
                  {/* Nothing to post them to yet — true, and worth saying. */}
                  {!HQ_ITEMS.some((i) => owned.has(i.id) && STATIONS[i.id]) && (
                    <span className="text-[11px] text-ink-500">
                      nothing yet — the Supply store has the stations
                    </span>
                  )}
                  {hqCrewPosts[c.id] && (
                    <span className="text-[11px] text-ink-500">· tap again to let them roam</span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ================== EQUIPMENT RACK ================== */}
      <div>
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Equipment Rack</p>
        <p className="text-[11px] text-ink-500">Personal kit — what a crew member wears and carries.</p>
        <div className="mt-2 overflow-hidden rounded-2xl border border-space-700 bg-space-900 shadow-panel">
          <EquipmentRack owned={owned} items={kit} />
        </div>
      </div>

      {/* ================== SHIP PARTS ================== */}
      <div>
        <p className="text-xs font-display uppercase tracking-widest text-signal-green">Spacecraft Parts</p>
        {/**
          * ---- THIS SAID THEY WERE NOT MOUNTED YET. THEY WERE. (Aug 25, 2026.)
          *
          * The parent: **"where does the mission equipment go after purchasing
          * from the store."**
          *
          * It goes here, and onto the ship — `ShipDiagram` has mounted these
          * four parts onto the drawn spacecraft since the day it was written.
          * This paragraph told him it was "still to come" the whole time, so
          * the app's own answer to her question was that his purchase went
          * nowhere. It had gone somewhere; the copy had not caught up.
          *
          * Stale copy about an unfinished feature is not harmless once the
          * feature ships. It is the app telling a twelve-year-old his coins
          * bought nothing.
          */}
        <p className="text-[11px] text-ink-500">
          These belong on the vehicle, not in a room. Every one you own is bolted onto your ship — open{' '}
          <span className="text-signal-cyan">My Ship</span> to see it mounted.
        </p>
        <div className="mt-2 grid grid-cols-4 gap-2">
          {shipParts.map((item) => {
            const has = owned.has(item.id);
            return (
              <div
                key={item.id}
                className={
                  'rounded-xl border p-2 text-center ' +
                  (has ? 'border-signal-green/40 bg-signal-green/5' : 'border-dashed border-space-700 bg-space-950/40')
                }
                title={has ? item.name : `${item.name} — ${item.cost} coins`}
              >
                <span className={'text-xl ' + (has ? '' : 'opacity-25 grayscale')}>{item.icon}</span>
                <p className={'mt-0.5 truncate text-[10px] ' + (has ? 'text-ink-300' : 'text-ink-700')}>
                  {has ? item.name : `🪙 ${item.cost}`}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
