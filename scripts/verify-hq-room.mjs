// ---------------------------------------------------------------------------
// NOTHING IN HIS HQ STANDS OUTSIDE THE ROOM.
// Run: node scripts/verify-hq-room.mjs
//
// ---- WHERE THIS CAME FROM (Aug 16, 2026) ----
//
// The parent: "I'm looking at his Mission Control HQ and the items are placed
// randomly without any sense to it."
//
// She was right, and the cause was geometric rather than aesthetic. The room is
// drawn in one-point perspective — the floor is a TRAPEZOID, spanning x 430 to
// 1170 at the back wall and 0 to 1600 at the front. Placement was a table of
// flat viewBox pixels. A coordinate that sits comfortably inside the room near
// the viewer is outside it further back, and the Task Lamp (x300, y660) was
// standing through the left wall.
//
// Nothing could catch that, because nothing in the file knew where the floor
// was. The fix is to place in FLOOR coordinates — u across the floor at that
// depth, v from back wall to front — and project. Out-of-room placement stops
// being a mistake you can make.
//
// The second half was real too: eighteen objects spread evenly across a floor
// read as clutter however correct each position is. Rooms group. The layout now
// has zones, and this suite asserts the two that carry meaning — the desk
// cluster stays together, and the rug stays under the furniture standing on it.
// ---------------------------------------------------------------------------
import './lib/academy-under-test.mjs';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const { HQ_ITEMS } = await import(REPO + '/src/academies/lamar/data/rewardCatalog.js');

let passed = 0;
const failures = [];
function ok(label, cond, detail = '') {
  if (cond) { passed += 1; console.log('PASS  ' + label); }
  else { failures.push(label); console.log('FAIL  ' + label + (detail ? `  ${detail}` : '')); }
}
const src = fs.readFileSync(path.join(REPO, 'src/components/Rewards/HQRoom.jsx'), 'utf8');

/**
 * ---- CHECK THE CODE, NOT THE PROSE (Aug 29, 2026) ----
 *
 * HQRoom.jsx is heavily commented on purpose — most of its length is the record
 * of why each thing is the way it is. That makes a naive `src` grep a check on
 * the DOCUMENTATION, and it has now bitten three times in two phases:
 *
 *   Phase 0  "the shadow is drawn under every owned piece" passed because the
 *            BOY's shadow used the same gradient string.
 *   Phase 3  "the computer says so in words" passed because the phrase also
 *            appeared in the comment two lines above the element.
 *   Phase 1  "nothing drives a frame from JavaScript" FAILED because the
 *            comment forbidding requestAnimationFrame contains the word.
 *
 * Three is a pattern, so the answer is structural rather than another careful
 * regex: any check about what the code DOES reads `code`, with comments
 * stripped. Checks about what the file SAYS may still read `src`.
 */
const code = src
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/^\s*\/\/.*$/gm, '');

/**
 * THE GEOMETRY IS IMPORTED, NOT COPIED. (Aug 25, 2026.)
 *
 * This suite used to keep its own copy of BACK and VB and assert they matched a
 * regex against the component — a check that a transcription was still correct,
 * which is a weaker thing than not transcribing. Both now come from
 * `src/lib/hqGeometry.js`, so the suite and the room cannot disagree, and the
 * component is checked for having stopped keeping a second copy.
 */
const { BACK, VB } = await import(REPO + '/src/lib/hqGeometry.js');
ok('the room and this suite read one copy of the perspective',
  !/^const BACK = \{ x1:/m.test(src) && !/^const VB = \{ w:/m.test(src)
    && /from '\.\.\/\.\.\/lib\/hqGeometry\.js'/.test(src),
  'two copies of a projection is the drift bug this project has shipped twice');

const layoutBlock = src.slice(src.indexOf('export const LAYOUT = {'), src.indexOf('\n};', src.indexOf('export const LAYOUT = {')));
const floorSpots = {};
for (const m of layoutBlock.matchAll(/'([\w-]+)':\s*\{\s*u:\s*([\d.]+),\s*v:\s*([\d.]+)([^}]*)\}/g)) {
  floorSpots[m[1]] = { u: Number(m[2]), v: Number(m[3]), rest: m[4] };
}
const wallSpots = [...layoutBlock.matchAll(/'([\w-]+)':\s*\{\s*x:\s*(\d+),\s*y:\s*(\d+),\s*wall: true/g)]
  .map((m) => ({ id: m[1], x: Number(m[2]), y: Number(m[3]) }));
/** Pieces hung on the LEFT or RIGHT wall — parent's question, Aug 16 2026. */
const sideSpots = [...layoutBlock.matchAll(/'([\w-]+)':\s*\{\s*side:\s*'(left|right)',\s*p:\s*([\d.]+),\s*q:\s*([\d.]+)/g)]
  .map((m) => ({ id: m[1], side: m[2], p: Number(m[3]), q: Number(m[4]) }));
/** Pieces standing on a wall shelf — parent's request, Aug 16 2026. */
const shelfSpots = [...layoutBlock.matchAll(/'([\w-]+)':\s*\{\s*x:\s*(\d+),\s*y:\s*(\d+),\s*shelf: true[^}]*s:\s*([\d.]+)/g)]
  .map((m) => ({ id: m[1], x: Number(m[2]), y: Number(m[3]), s: Number(m[4]) }));

/**
 * THE STATION TABLE AND THE PIECE'S OWN BASE, EXTRACTED ONCE. (Aug 30, 2026.)
 *
 * These were declared inside the Phase 2 overlap check. The Phase 5 room-model
 * section needs exactly the same three things — the station table, which piece
 * a station's spot is measured FROM, and how wide that piece's foot is — and
 * the choice was between a second extraction and one shared one.
 *
 * Hoisted, because a second extraction is a second copy, and the last time this
 * suite kept a second copy of something it stayed green while the room was
 * broken. One extraction, two sections, and if the parse ever stops matching
 * the room both go red together instead of one of them quietly measuring
 * nothing.
 */
const stationsBlock = src.slice(
  src.indexOf('export const STATIONS = {'),
  src.indexOf('\n};', src.indexOf('export const STATIONS = {'))
);
const ST = {};
for (const m of stationsBlock.matchAll(/'([\w-]+)':\s*\{\s*([^}]*?)doing:/gs)) {
  const body = m[2];
  const num = (k) => {
    const hit = new RegExp(`\\b${k}:\\s*(-?[\\d.]+)`).exec(body);
    return hit ? Number(hit[1]) : undefined;
  };
  ST[m[1]] = { du: num('du'), dv: num('dv'), u: num('u'), v: num('v') };
}

/** Which piece a station's spot is measured from — the desk, for the computer. */
const baseOf = (id) => {
  const L = floorSpots[id];
  if (!L) return null;
  const follows = /follows: '([\w-]+)'/.exec(L.rest);
  return follows ? floorSpots[follows[1]] : L;
};
/** That piece's half-width footprint, which is what sets a crew standoff. */
const footOf = (id) => {
  const L = floorSpots[id];
  const hit = L && /foot: (\d+)/.exec(L.rest);
  return hit ? Number(hit[1]) : 0;
};

console.log('\n--- 1. every piece is in the room ---');
{
  const placed = (id) => floorSpots[id] || wallSpots.some((w) => w.id === id) ||
    shelfSpots.some((w) => w.id === id) || sideSpots.some((w) => w.id === id);
  ok('every HQ item has a place', HQ_ITEMS.every((i) => placed(i.id)),
    HQ_ITEMS.filter((i) => !placed(i.id)).map((i) => i.id).join(', '));

  const outside = [];
  for (const [id, s] of Object.entries(floorSpots)) {
    if (s.u < 0 || s.u > 1 || s.v < 0 || s.v > 1) outside.push(`${id} (u${s.u} v${s.v})`);
  }
  ok('...and no floor piece is placed outside it', outside.length === 0, outside.join(', '));

  /**
   * The old bug, restated as a check. In the pixel layout the Task Lamp sat at
   * x300 y660, and the floor's left edge at that depth is x313 — thirteen
   * pixels of wall, and a lamp standing in it.
   */
  const lamp = floorSpots['hq-lamp'];
  ok('the Task Lamp in particular is on the floor', lamp && lamp.u > 0.02 && lamp.u < 0.98,
    'it used to stand through the left wall');

  const margin = [];
  for (const [id, s] of Object.entries(floorSpots)) {
    if (s.u < 0.05 || s.u > 0.95) margin.push(id);
  }
  ok('...and nothing is jammed against a side wall', margin.length === 0, margin.join(', '));

  ok('wall pieces hang on the back wall, between its edges',
    wallSpots.length > 0 && wallSpots.every((w) => w.x > BACK.x1 && w.x < BACK.x2 && w.y > BACK.y1 && w.y < BACK.y2),
    wallSpots.filter((w) => w.x <= BACK.x1 || w.x >= BACK.x2).map((w) => w.id).join(', '));
}

console.log('\n--- 2. the room is arranged, not scattered ---');
{
  const d = floorSpots['hq-desk'], c = floorSpots['hq-computer'], ch = floorSpots['hq-chair'], r = floorSpots['hq-rug'];
  ok('the computer shares the desk\'s floor spot', d && c && d.u === c.u && d.v === c.v);

  /**
   * ---- SAME SPOT IS NOT THE SAME AS STANDING ON IT (Aug 25, 2026) ----
   *
   * The check above was the only thing guarding "the computer stands on the
   * desk", and it passed for weeks while the monitor floated 26 units BELOW
   * the desk surface, in the leg space in front of it. Sharing a base point on
   * the floor says nothing about the heights meeting.
   *
   * So the surfaces are compared: the desk's top face, and the bottom of the
   * monitor's stand. In SVG larger y is lower, so "resting on it" means the
   * stand's bottom edge equals the top face's y.
   */
  const deskArt = src.slice(src.indexOf("'hq-desk': (s)"), src.indexOf("'hq-computer':", src.indexOf("'hq-desk': (s)")));
  const compArt = src.slice(src.indexOf("'hq-computer': (s)"), src.indexOf("'hq-chair':", src.indexOf("'hq-computer': (s)")));
  const deskTop = Math.min(...[...deskArt.matchAll(/<rect x="-98" y="(-?\d+)"/g)].map((m) => Number(m[1])));
  const standRects = [...compArt.matchAll(/<rect x="-6" y="(-?\d+)" width="12" height="(\d+)"/g)]
    .map((m) => Number(m[1]) + Number(m[2]));
  ok('...and actually rests ON its top surface',
    standRects.length > 0 && standRects.some((bottom) => Math.abs(bottom - deskTop) <= 1),
    `desk top y=${deskTop}, monitor stand bottom y=${standRects.join(',')} — a mismatch means it floats`);

  /**
   * And the workstation has to look like one. The parent: **"The workstation
   * doesn't look like a workstation. It looks like a boring table."** It was
   * four rectangles — a slab, two legs and a stretcher — for a 200-coin item
   * called an Engineering Workstation.
   *
   * Counting shapes is crude, but it is the honest proxy: a table is four
   * rectangles and a workbench cannot be. The named details are the ones that
   * carry the meaning, so they are asserted by name rather than by count.
   */
  const deskShapes = (deskArt.match(/<(rect|path|circle)\b/g) || []).length;
  ok(`the workstation is drawn from ${deskShapes} shapes, not four`, deskShapes >= 14,
    'a slab and two legs is a table, whatever the price tag calls it');
  for (const [what, re] of [
    ['a drawer pedestal', /drawer pedestal/],
    ['a bench vise', /bench vise/],
    ['a tool rail', /tool rail/],
    ['a drafting sheet', /drafting sheet/],
    ['an instrument box that is powered', /instrument box/]
  ]) {
    ok(`...including ${what}`, re.test(deskArt));
  }

  /**
   * The centre of the desktop must stay clear. The Mission Computer stands at
   * x -42..42 above the surface, and a second screen drawn into that space is
   * two owned items growing through each other — which a depth sort cannot fix
   * when they share one base point.
   */
  const KEY = { x1: -24, x2: 24 }; // the keyboard's footprint on the top face
  const onTop = [...deskArt.matchAll(/<rect x="(-?\d+)" y="(-?\d+)" width="(\d+)"/g)]
    .map((m) => ({ what: `rect x${m[1]} y${m[2]}`, x: Number(m[1]), y: Number(m[2]), w: Number(m[3]) }))
    .filter((r) => r.y < deskTop && r.x + r.w > KEY.x1 && r.x < KEY.x2);

  /**
   * Paths too, not only rects. The first run of this check looked at rects
   * alone and passed a drafting sheet — drawn as a <path> — lying straight
   * across the keyboard. A shape check that only knows one kind of shape is
   * the same blind spot as a guard that only knows one kind of collision.
   */
  const pathsOnTop = [...deskArt.matchAll(/<path d="M(-?[\d.]+) (-?[\d.]+)([^"]*)"/g)]
    .map((m) => {
      const xs = [Number(m[1]), ...[...m[3].matchAll(/[ML](-?[\d.]+) (-?[\d.]+)/g)].map((n) => Number(n[1]))];
      const ys = [Number(m[2]), ...[...m[3].matchAll(/[ML](-?[\d.]+) (-?[\d.]+)/g)].map((n) => Number(n[2]))];
      return { what: `path M${m[1]} ${m[2]}`, x1: Math.min(...xs), x2: Math.max(...xs), yTop: Math.min(...ys), yBot: Math.max(...ys) };
    })
    // Only shapes lying ON the surface — not the tool rail, which rises well
    // above the keyboard and beside it.
    .filter((r) => r.yBot <= deskTop && r.yBot > deskTop - 12 && r.x2 > KEY.x1 && r.x1 < KEY.x2);

  const clashes = [...onTop, ...pathsOnTop];
  ok('...and nothing on the top is drawn through the monitor or its keyboard',
    clashes.length === 0,
    clashes.map((r) => r.what).join(', '));
  ok('...and its price tag is lifted off the desk\'s',
    /labelDy/.test(c.rest || ''),
    'two unowned labels at one point printed on top of each other');
  ok('the chair is pulled out in FRONT of the desk', ch && d && ch.v > d.v,
    'v grows toward the viewer');
  ok('the rug lies under the desk and the chair',
    r && d && ch && r.v > d.v && r.v < ch.v && Math.abs(r.u - d.u) < 0.1);

  /** The two zones that carry meaning. */
  const left = ['hq-plant', 'hq-garden-box'];
  ok('the growing things are together in one corner',
    left.every((id) => floorSpots[id] && floorSpots[id].u < 0.3),
    left.map((id) => `${id} u${floorSpots[id]?.u}`).join(', '));
  /**
   * ---- "AT THE BACK" IS A RELATIONSHIP, NOT A MAGIC NUMBER (Aug 30, 2026) ----
   *
   * This was `lab.v < 0.25`, a threshold that happened to be one notch below
   * where the lab stood when it was written. The perimeter layout moved the lab
   * from the back WALL to the back of the left wall, at v0.25 exactly — still
   * plainly at the back of the room, and the check failed on the boundary.
   *
   * A bare number that only works for one arrangement is a check on that
   * arrangement, not on the property. What actually matters is that the lab
   * bench is a back-of-room display piece and not front-and-centre: it sits in
   * the back third, and behind the chair he sits in.
   */
  {
    const lab = floorSpots['hq-lab'];
    ok('the lab bench stands at the back of the room',
      lab && lab.v <= 0.34 && ch && lab.v < ch.v,
      lab ? `lab v${lab.v}, chair v${ch?.v}` : 'no lab');
  }

  /**
   * ---- THE SHELVES (Aug 16, 2026) ----
   *
   * The parent: "place shelves on the wall to hold small items."
   *
   * The two models were the pieces most responsible for the floor reading as
   * scattered — a rocket display standing on the carpet is the size of a chair.
   * They are display objects, so they display.
   */
  const SHELVES = [{ x: 462, w: 208 }, { x: 930, w: 208 }];
  const SHELF_Y = 505;
  ok('the shelves hold the two models', shelfSpots.length === 2,
    shelfSpots.map((x) => x.id).join(', '));
  ok('...and each one actually stands ON a shelf board',
    shelfSpots.every((it) =>
      it.y === SHELF_Y && SHELVES.some((sh) => it.x > sh.x + 10 && it.x < sh.x + sh.w - 10)),
    shelfSpots.map((it) => `${it.id} x${it.x} y${it.y}`).join(', '));
  ok('...at model scale, not furniture scale', shelfSpots.every((it) => it.s > 0 && it.s < 0.6),
    'on the floor they read as the size of a chair');
  ok('the shelves are FIXTURES, not another thing he has to buy',
    /SHELVES — parent's request/.test(src) && !/hq-shelf/.test(src),
    'she asked for somewhere to put things; charging for the somewhere answers a different question');

  const spread = Object.values(floorSpots).map((s) => s.u);
  ok('...and the floor is actually used, not crowded into one half',
    Math.max(...spread) - Math.min(...spread) > 0.6);
}

console.log('\n--- 2b. nothing collides on screen ---');
{
  /**
   * ---- THE CHECK THAT WOULD HAVE CAUGHT THIS (Aug 16, 2026) ----
   *
   * Placing everything inside the floor was necessary and not sufficient. With
   * the room furnished, the Task Lamp's pole rose straight THROUGH the lab
   * bench, and the telescope grew out of the satellite.
   *
   * Both pairs are at different DEPTHS and were sorted correctly — one is
   * genuinely behind the other. **Two objects at different depths still collide
   * on screen**, and depth sorting cannot fix that for you; it only decides
   * which one wins. Only projected distance can.
   *
   * The desk cluster is exempt by name: the computer stands ON the desk and
   * the chair is pulled up to it, and that overlap is the arrangement working.
   */
  const project = (u, v) => {
    const y = BACK.y2 + v * (VB.h - BACK.y2);
    const xLeft = BACK.x1 * (1 - v);
    const xRight = BACK.x2 + (VB.w - BACK.x2) * v;
    return { x: xLeft + u * (xRight - xLeft), y };
  };
  /** Depth scale, same curve the room draws with. Imported, never copied. */
  const scaleAt = (y) => 0.55 + Math.max(0, Math.min(1, (y - BACK.y2) / (VB.h - BACK.y2))) * 0.65;
  const DESK_CLUSTER = new Set(['hq-desk', 'hq-computer', 'hq-chair', 'hq-rug']);
  const ids = Object.keys(floorSpots);
  const tooClose = [];
  for (let i = 0; i < ids.length; i += 1) {
    for (let j = i + 1; j < ids.length; j += 1) {
      const a = ids[i], b = ids[j];
      if (DESK_CLUSTER.has(a) && DESK_CLUSTER.has(b)) continue;
      const pa = project(floorSpots[a].u, floorSpots[a].v);
      const pb = project(floorSpots[b].u, floorSpots[b].v);
      const dx = Math.abs(pa.x - pb.x), dy = Math.abs(pa.y - pb.y);
      /**
       * ---- MEASURED WIDTHS, NOT AN ASSUMED ONE (Aug 30, 2026) ----
       *
       * This used a blanket box: "pieces are ~120-190 units wide, so two bases
       * within 100px horizontally and 90px vertically overlap whatever the
       * depth says." That was the best available guess when it was written,
       * because no piece knew how wide it was.
       *
       * Phase 0 gave every piece a real `foot` — its half-width where it meets
       * the floor, measured off its own art — so the guess is now strictly
       * worse information than the file already carries. And it fired falsely
       * the moment the room went to a perimeter layout: a desk plant (foot 22)
       * standing 90px from a lab bench (foot 68) has 30px of clear air between
       * them, and the blanket rule called it a collision.
       *
       * A check that fires on a correct layout is how a perimeter arrangement
       * gets abandoned for a rule that was only ever an approximation. So it
       * measures the actual footprints, and still refuses anything genuinely
       * touching at a similar depth.
       */
      const ha = Number(/foot:\s*(\d+(?:\.\d+)?)/.exec(floorSpots[a].rest)?.[1] || 0) * scaleAt(pa.y);
      const hb = Number(/foot:\s*(\d+(?:\.\d+)?)/.exec(floorSpots[b].rest)?.[1] || 0) * scaleAt(pb.y);
      const gap = dx - (ha + hb);
      if (gap < 8 && dy < 90) {
        tooClose.push(`${a} <-> ${b} (gap ${Math.round(gap)}px, dy ${Math.round(dy)})`);
      }
    }
  }
  ok('no two pieces stand on top of each other', tooClose.length === 0, tooClose.join(' · '));

  const lamp = project(floorSpots['hq-lamp'].u, floorSpots['hq-lamp'].v);
  const lab = project(floorSpots['hq-lab'].u, floorSpots['hq-lab'].v);
  ok('the Task Lamp is clear of the lab bench', Math.abs(lamp.x - lab.x) > 100 || Math.abs(lamp.y - lab.y) > 90,
    'its pole rose straight through the bench');
  /**
   * The telescope/satellite collision was fixed by moving the satellite off the
   * floor entirely — it is on a shelf now. Kept as a check that it stays off,
   * because putting a display model back on the carpet would recreate both the
   * overlap and the clutter in one move.
   */
  ok('the satellite is on a shelf, not on the floor',
    !floorSpots['hq-satellite'] && shelfSpots.some((x) => x.id === 'hq-satellite'));
}

console.log('\n--- 2c. the wall is composed around its window ---');
{
  /** The window is drawn at x 700-900, y 360-480. */
  const WIN = { x1: 700, x2: 900, y1: 360, y2: 480 };
  const byId = Object.fromEntries(wallSpots.map((w) => [w.id, w]));
  ok('the display screen is mounted above the window',
    byId['hq-holo'] && byId['hq-holo'].y < WIN.y1 &&
    byId['hq-holo'].x > WIN.x1 && byId['hq-holo'].x < WIN.x2);
  /**
   * The four frames moved to the SIDE walls once the code could reach them
   * (see 2d). The back wall keeps the display screen, the window and the two
   * shelves — one feature wall rather than a noticeboard.
   */
  ok('the back wall is not carrying the frames any more',
    !['hq-poster-apollo', 'hq-poster-mars', 'hq-award-wall', 'hq-patch-wall'].some((id) => byId[id]),
    'it had five items, a window and two shelves on it, and two whole walls were empty');
  ok('...and the shelves are the only things below the window line',
    wallSpots.every((w) => w.y < WIN.y1),
    'everything hung on the back wall is above the window; the shelves sit below it');
  ok('nothing hangs over the window itself',
    wallSpots.every((w) => w.x < WIN.x1 || w.x > WIN.x2 || w.y < WIN.y1));
}

console.log('\n--- 2d. all three walls are used ---');
{
  /**
   * The parent: "why didnt you use the left and right walls"
   *
   * Because nothing could address them. The back wall faces the viewer and
   * takes flat x/y; the side walls are foreshortened and need a skew. There was
   * no such transform, so there was no such placement, and the one wall the
   * code could reach got treated as "the wall".
   */
  ok('something hangs on the left wall', sideSpots.some((x) => x.side === 'left'));
  ok('...and on the right', sideSpots.some((x) => x.side === 'right'));
  // every() over an empty array is TRUE — these two would have passed with both
  // walls bare, which is precisely the state being fixed. Count first.
  const lefts = sideSpots.filter((x) => x.side === 'left');
  const rights = sideSpots.filter((x) => x.side === 'right');
  ok('...and each side says one thing',
    lefts.length > 0 && rights.length > 0 &&
    lefts.every((x) => /poster/.test(x.id)) &&
    rights.every((x) => /award|patch/.test(x.id)),
    'art left, achievements right — a wall of mixed things is the clutter problem again');
  ok('every side piece is on the wall, not past its ends',
    sideSpots.length > 0 && sideSpots.every((x) => x.p > 0.05 && x.p < 0.95 && x.q > 0.1 && x.q < 0.9),
    sideSpots.map((x) => x.id + ' p' + x.p + ' q' + x.q).join(', '));
  ok('...and none is level with the floor',
    sideSpots.length > 0 && sideSpots.every((x) => x.q < 0.75), 'a poster at floor level is a poster on the skirting board');

  const code2 = src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
  ok('side pieces are skewed to the wall they hang on', /skewY\(/.test(code2) && /SIDE_SKEW/.test(code2),
    'in one-point perspective verticals stay vertical and horizontals converge — that is a skewY');
  ok('...in opposite directions on the two walls', /spot\.side === 'left' \? SIDE_SKEW : -SIDE_SKEW/.test(code2));
  ok('...and squeezed horizontally, because the far end is further away',
    /squeeze/.test(code2) && /0\.42 \+ 0\.5 \* spot\.p/.test(code2));
  ok('the skew angle matches the room\'s own geometry',
    /SIDE_SKEW = 19\.2/.test(src),
    'atan(150/430) — the pitch of the wall edges the component already draws');
}

console.log('\n--- 3. painter\'s order ---');
{
  const code = src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
  ok('all walls, then shelves, then floor coverings, then back-to-front',
    /rank = \(L\) => \(L\.wall \|\| L\.side \? 0 : L\.shelf \? 1 : L\.layer === 'floor' \? 2 : 3\)/.test(code));
  ok('...and depth sorting uses v, not a screen pixel', /\(A\.v \?\? 0\) - \(B\.v \?\? 0\)/.test(code));
  ok('the rug is the floor layer', /'hq-rug': \{[^}]*layer: 'floor'/.test(src),
    'sorted as furniture it drew ON TOP of the chair standing on it');
  ok('pieces are projected, never positioned in raw pixels',
    /projectFloor\(spot\.u, spot\.v\)/.test(code) && /projectSideWall\(spot\.side, spot\.p, spot\.q\)/.test(code) &&
    /transform=\{placement\}/.test(code));
}

console.log('\n--- 4. no hairstyle can cover his face ---');
{
  /**
   * The parent, same afternoon: "I put hair on the avatar and it covers the
   * avatar face." She had just bought the Afro — 100 Coins, 15:38.
   *
   * Two faults compounding. <Hair /> was drawn AFTER <Face />, so hair painted
   * over the eyes, brows and mouth by construction. And the afro was a single
   * disc at cy -130, r 34, reaching to y -96: the brows sit at -121, the eyes
   * at -112, the mouth at -98. It covered all three.
   */
  const av = fs.readFileSync(path.join(REPO, 'src/components/Rewards/CadetAvatar.jsx'), 'utf8');

  /**
   * ---- SLICED FROM A COMMENT, WHICH IS NOT A STRUCTURE (Aug 25, 2026) ----
   *
   * This read `av.slice(av.indexOf('{/* hair volume'))`. When the head was
   * wrapped in a group so it could turn, that comment was rewritten — indexOf
   * returned -1, `slice(-1)` returned the last CHARACTER of the file, and all
   * four checks below failed while the layering was perfectly correct.
   *
   * Third guard this session anchored to a comment. A comment is documentation
   * that can be reworded at any time; the render body is the structure. Anchor
   * on the structure, fall back to the whole file, and never on prose.
   */
  const figureAt = av.indexOf('const figure = (');
  const body = figureAt >= 0 ? av.slice(figureAt) : av;
  const iBack = body.indexOf('<HairBack');
  /**
   * Anchored on the HEAD BEING DRAWN, not on the comment above it.
   *
   * This read `body.indexOf('{/* neck + head *\/}')` until Aug 25 2026, when
   * the avatar rebuild moved the head into a `<HumanHead>` component and took
   * the comment with it. The layering property was still perfectly true and the
   * check failed anyway — it was pinned to a comment string, which is the
   * definition of asserting the punctuation instead of the property.
   */
  const iHead = body.indexOf('<HumanHead');
  const iFront = body.indexOf('<HairFront');
  const iFace = body.indexOf('<Face ');
  ok('hair mass is behind the head', iBack > -1 && iHead > -1 && iBack < iHead);
  ok('the hairline is on the head', iFront > iHead);
  ok('**and the face is drawn last, after all hair**', iFace > iFront && iFace > iBack,
    'this is the whole fix — it holds for any hairstyle added later');

  /** Nothing in the hairline may reach the brow line at y -121. */
  const front = av.slice(av.indexOf('function HairFront'), av.indexOf('\n}', av.indexOf('function HairFront')));
  const ys = [...front.matchAll(/-(\d+)(?=[\s"Zq])/g)].map((m) => -Number(m[1])).filter((n) => n < -50);
  ok('no hairline shape reaches the brows', ys.every((y) => y <= -124),
    'lowest is ' + Math.max(...ys) + ', brows are at -121');

  const back = av.slice(av.indexOf('function HairBack'), av.indexOf('\n}', av.indexOf('function HairBack')));
  ok('the locs fall OUTSIDE the head, framing the face', /\[-39, -31, 31, 39\]/.test(back),
    "the head's rx is 27; anything inside that crosses his face");
  ok('...and the afro is a halo behind the head, not a disc in front of it',
    /'av-hair-afro'/.test(back) && /circle cx="0" cy="-126" r="36"/.test(back));
}

console.log('\n--- 6. he can arrange it himself, and cannot make it untidy ---');
{
  /**
   * ---- THE SAME COMPLAINT, TWICE (Aug 25, 2026) ----
   *
   * The parent, on Aug 16: "the items are placed randomly without any sense to
   * it." And again on Aug 25: **"everything is just placed randomly around in
   * the HQ."**
   *
   * The Aug 16 fix was real and evidently not enough. It fixed CORRECTNESS —
   * every piece inside the floor, nothing standing inside anything else, zones
   * that mean something — and she was describing ORDER. Every piece was in a
   * sensible place and no two of them lined up, so the room read as scattered
   * while passing every check ever written about it.
   *
   * Two answers, both of which she offered: put everything on a grid, and let
   * him move it. The checks below hold the property that makes the second one
   * safe — **he cannot produce a worse room than the one he was given.**
   */
  const grid = /export const GRID = \{ cols: (\d+), rows: (\d+) \}/.exec(src);
  ok('the floor has a grid', Boolean(grid), 'a grid is what makes an arrangement look arranged');
  const COLS = grid ? Number(grid[1]) : 0;
  const ROWS = grid ? Number(grid[2]) : 0;

  /**
   * THE LOAD-BEARING CHECK. Every designed floor spot must already sit on an
   * intersection — otherwise the first piece he moves snaps into line and
   * every piece he has NOT moved stays crooked, which is a worse room than
   * before he touched it.
   */
  const offGrid = Object.entries(floorSpots).filter(([, s2]) => {
    const nu = s2.u * COLS, nv = s2.v * ROWS;
    return Math.abs(nu - Math.round(nu)) > 0.02 || Math.abs(nv - Math.round(nv)) > 0.02;
  });
  ok('every designed piece already stands on the grid', COLS > 0 && offGrid.length === 0,
    offGrid.map(([id, s2]) => `${id} (u${s2.u} v${s2.v})`).join(', '));

  /**
   * And they must share rows and columns. Being ON a grid is not enough — a
   * dozen pieces each on their own private intersection is exactly the scatter
   * she is describing. Lining up is the thing she can actually see.
   */
  const rows = new Set(Object.values(floorSpots).map((s2) => Math.round(s2.v * ROWS)));
  const cols = new Set(Object.values(floorSpots).map((s2) => Math.round(s2.u * COLS)));
  const n = Object.keys(floorSpots).length;
  ok(`the ${n} floor pieces stand in ${rows.size} rows, not ${n}`, rows.size <= 5,
    'read across a row and things sit at one depth');
  ok(`...across ${cols.size} columns, not ${n}`, cols.size <= 6,
    'read down a column and things line up');

  ok('anything he moves snaps to an intersection too',
    /export function snapToGrid\(u, v\)/.test(src) && /Math\.round\(u \* GRID\.cols\)/.test(src),
    'without the snap, "move it yourself" produces the scatter she reported');
  ok('...and the snap clamps inside the floor, not onto its edge',
    /Math\.min\(1 - 1 \/ GRID\.cols, Math\.max\(1 \/ GRID\.cols/.test(src),
    'a piece snapped to u=0 stands in the wall — the Task Lamp bug, reintroduced by a feature');

  ok('a drop point can be read back off the floor',
    /export function unprojectFloor\(x, y\)/.test(src),
    'the inverse of projectFloor — without it a drop lands wherever the maths guesses');

  // --- his arrangement has to survive, and travel ---
  const store = fs.readFileSync(path.join(REPO, 'src/store/useAppStore.js'), 'utf8');
  ok('where he put things is persisted', /await saveMeta\(\{ hqLayout \}\)/.test(store));
  ok('...and clamped in the STORE, not only in the screen',
    /Math\.min\(0\.95, Math\.max\(0\.05, Number\(u\)/.test(store),
    'a coordinate outside the floor is a piece standing through a wall');
  ok('...and travels to the other computer', /hqLayout: state\.hqLayout \|\| \{\}/.test(store));
  ok('...merging per piece rather than whole',
    /const hqLayout = \{ \.\.\.\(importedData\.hqLayout \|\| \{\}\), \.\.\.\(state\.hqLayout \|\| \{\}\) \}/.test(store));
  ok('...and there is a way back to the designed room',
    /async resetHqLayout\(\)/.test(store) && /Put it back the way it was/.test(src),
    'he WILL want it, and a room he cannot undo is a room he stops touching');

  /**
   * Moving the desk has to take the computer standing on it. Otherwise he
   * drags the desk away and leaves a monitor floating over the carpet — which
   * is the room made worse by the feature meant to improve it.
   */
  ok('a piece that stands on another one follows it',
    /follows: 'hq-desk'/.test(src) && /const src = L\.follows \|\| id;/.test(src),
    'drag the desk and the monitor must not stay behind');

  // --- arranging must not collide with using ---
  ok('arranging is a MODE, not a permanent drag',
    /const \[arranging, setArranging\] = useState\(false\)/.test(src),
    'one gesture cannot mean both "use this" and "move this"');
  ok('...and the walk-up-and-use tap is disabled while arranging',
    /const usable = owned && Boolean\(onUse\) && !arranging;/.test(src));
  ok('...and a piece he does not own cannot be moved',
    /const movable = owned && arranging && Boolean\(onGrab\)/.test(src));

  /**
   * Both halves of the interaction, because neither can be tested here. A tap
   * with no movement keeps the piece in his hand so the next tap places it; a
   * real drag drops it where he let go. If pointer events misbehave on his
   * machine, one of the two still works.
   */
  ok('it is a drag AND a two-tap place', /if \(!movedRef\.current\) return;/.test(src),
    'no guard in this repo can fire a pointer event, so the interaction must survive half of it failing');

  // Wall and shelf pieces stay put — they are composed around the window.
  ok('only floor pieces are movable',
    /if \(!L \|\| L\.wall \|\| L\.side \|\| L\.shelf\) return null;/.test(src),
    'a poster dragged over the window is the room made worse by the feature meant to improve it');
}

console.log('\n--- his hands reach the thing he walked up to ---');
{
  /**
   * =========================================================================
   * ---- THE THIRD ROUND, AND THE FIRST ONE THAT COULD BE MEASURED ----
   * =========================================================================
   *
   * The parent: **"The Avatar arms just moves a little. Its not doing anything
   * with the workstation."**
   *
   * She sent a screenshot. Measured against the room's own maths, at the
   * workstation he stood **82px left of the desk centre** with his hands **65px
   * below the desk surface** — a desk whose top was level with his shoulders —
   * and a shadow floating 16px below his boots.
   *
   * All arithmetic. All of it shipped because it lived in a .jsx file no guard
   * in this repo can execute: forty suites and not one could answer "do his
   * hands reach the desk?". The only way to find out was to open the app, which
   * meant she found it instead of me, three times.
   *
   * The geometry now lives in `src/lib/hqGeometry.js`, which is plain
   * JavaScript, and this is the check that could not exist before.
   */
  const g = await import(REPO + '/src/lib/hqGeometry.js');
  ok('the room geometry is importable without a browser',
    typeof g.projectFloor === 'function' && typeof g.reachYFor === 'function',
    'the whole reason this fault survived three reports');

  // The stations are read as data from the component source, because importing
  // a .jsx file into bare node cannot work — the same reason the maths moved.
  const surfaceStations = [...src.matchAll(
    /'(hq-[a-z-]+)':\s*\{\s*du:\s*(-?[\d.]+),\s*dv:\s*(-?[\d.]+),\s*stance:\s*'(\w+)',\s*surfaceY:\s*(-?[\d.]+)/g
  )].map((m) => ({ id: m[1], du: +m[2], dv: +m[3], stance: m[4], surfaceY: +m[5] }));

  ok('at least the workstation and the mission computer declare a surface',
    surfaceStations.length >= 2, surfaceStations.map((s) => s.id).join(', '));

  const layoutOf = (id) => {
    const m = new RegExp("'" + id + "':\\s*\\{\\s*u:\\s*(-?[\\d.]+),\\s*v:\\s*(-?[\\d.]+)").exec(src);
    return m ? { u: +m[1], v: +m[2] } : null;
  };

  for (const st of surfaceStations) {
    const follows = new RegExp("'" + st.id + "':[^}]*follows:\\s*'([a-z-]+)'").exec(src);
    const piece = layoutOf(follows ? follows[1] : st.id);
    if (!piece) { ok(`${st.id} has a place in the room`, false); continue; }
    const stand = { u: piece.u + st.du, v: piece.v + st.dv };
    const reach = g.reachYFor({ surfaceY: st.surfaceY }, piece, stand);
    const hands = g.handRoomY(reach, stand);
    const surface = g.surfaceRoomY({ surfaceY: st.surfaceY }, piece);
    const gap = Math.abs(hands - surface);
    ok(`${st.id}: his hands land ON the surface`, gap < 1.5,
      `off by ${gap.toFixed(1)}px — this was 65px`);

    /**
     * AND THE REACH HAS TO BE SOMETHING A BODY CAN DO. Landing on the surface
     * is not enough on its own: the arithmetic would also be satisfied by a
     * surface above his head, which is the state the screenshot showed.
     * Shoulders are at -66 and the top of the head at about -136.
     */
    /**
     * AND THE REACH HAS TO BE SOMETHING A BODY CAN DO. Landing on the surface
     * is not enough on its own — the arithmetic is scale-invariant, so it is
     * equally satisfied by a desk at his eye level. That was the actual state:
     * at FIGURE_SCALE 0.61 the surface computed to -78, above his shoulders at
     * -66, and he stood at his own workstation with his arms over his head.
     *
     * -70 to -20 is chest to hip on this figure. A working surface lives there.
     */
    ok(`...at a height a person could work at`, reach > -70 && reach < -20,
      `reach ${reach.toFixed(0)} (shoulders -66, hip -2) — this was -78, above his shoulders`);

    /**
     * The size relationship that made it so. A cartoon figure with a head a
     * third of its height has to be drawn BIGGER against furniture than
     * anthropometry says, or every surface in the room lands at its chin.
     */
    const pieceK = g.depth(g.projectFloor(piece.u, piece.v).y);
    const figureK = g.depth(g.projectFloor(stand.u, stand.v).y) * g.FIGURE_SCALE;
    const ratio = (165 * figureK) / (-st.surfaceY * pieceK);
    ok(`...and he is sized against his own furniture`, ratio > 2.0 && ratio < 3.0,
      `${ratio.toFixed(2)}x the ${st.id} — 1.76x is a toddler at a kitchen counter`);

    /** And he has to be AT it, not beside it. */
    const p = g.projectFloor(piece.u, piece.v);
    const s2 = g.projectFloor(stand.u, stand.v);
    ok(`...standing at it rather than beside it`, Math.abs(s2.x - p.x) < 70,
      `${(s2.x - p.x).toFixed(0)}px off centre — this was -82`);
  }

  /** The shadow belongs at his feet. It sat 30 units below them for weeks. */
  ok('his shadow is at his feet, not floating below them',
    /<ellipse cx="0" cy="2"/.test(src),
    'cy 30 put a dark blob under his boots with daylight between');

  /** A stance that reaches must say how wide, or the arms cannot be built. */
  const av = fs.readFileSync(path.join(REPO, 'src/components/Rewards/CadetAvatar.jsx'), 'utf8');
  for (const stance of ['work', 'type']) {
    const block = av.slice(av.indexOf(`  ${stance}: {`));
    ok(`the ${stance} stance builds its arms to the surface`,
      /reaches: \{ lx: -?\d+, rx: -?\d+ \}/.test(block.slice(0, 400)),
      'a stance with fixed arm coordinates cannot reach anything');
  }
  ok('...and what he is holding is drawn at the hand',
    /translate\(\$\{r\[0\]\} \$\{r\[1\]\}\)/.test(av),
    'the pencil rendered at his shoes the first time this was drawn');
}

/* ===========================================================================
 * 9. THE ROOM IS LIT, AND EVERYTHING IN IT TOUCHES THE FLOOR.
 *
 * ---- WHY (Phase 0, Aug 29, 2026) ----
 *
 * The first frame rendered of the fully furnished room showed eighteen objects
 * standing on a floor and not one of them touching it. Every piece was in the
 * right place, at the right scale, drawn correctly — and the room read as a
 * wireframe diagram, because a drawn shape only meets a drawn floor if
 * something draws the meeting.
 *
 * The second frame, with the shadows in, showed the same thing. Eleven contact
 * shadows were in the DOM, every one the right size and in the right place, and
 * every one invisible: the floor ran to #0b1622 and **you cannot draw a shadow
 * on a floor that is already black**.
 *
 * Both of those are asserted below. The second one especially — a check that
 * the shadows EXIST would have passed the whole time they could not be seen,
 * and that is the kind of green tick this project has been burned by before.
 * =========================================================================== */
console.log('\n--- 9. the room is lit, and everything in it touches the floor ---');
{
  const G = await import(REPO + '/src/lib/hqGeometry.js');

  /* ---- the numbers live in hqGeometry, not in the JSX ---- */
  ok('the light and the shadows are arithmetic the guard can run',
    typeof G.contactShadow === 'function' && typeof G.lampLightAt === 'function'
      && G.LIGHT && Number.isFinite(G.CONTACT_RX) && Number.isFinite(G.CONTACT_RATIO),
    'geometry inside a .jsx is geometry no suite in this repo can execute');

  ok('...and the component spends them rather than keeping a second copy',
    /CONTACT_RX, CONTACT_RATIO, lampLightAt/.test(src)
      && /rx=\{spot\.foot \* CONTACT_RX\}/.test(src)
      && !/rx=\{spot\.foot \* 1\.06\}/.test(src),
    'a typed-in 1.06 is the drift bug this project has shipped twice');

  /* ---- every piece that stands on the floor has a footprint ---- */
  const footless = [];
  for (const [id, s] of Object.entries(floorSpots)) {
    if (/flat: true/.test(s.rest) || /standsOn:/.test(s.rest)) continue;
    if (!/foot:\s*\d+(\.\d+)?/.test(s.rest)) footless.push(id);
  }
  ok('every floor piece knows how wide it is where it meets the floor',
    footless.length === 0, footless.join(', ') + ' — no foot, so no shadow, so it floats');

  /**
   * The two exemptions are declared, not inferred. A rug lies flat and a
   * monitor stands on a desk; both are true, and both have to be SAID, because
   * the alternative is a guard that quietly excuses any piece someone forgot.
   */
  ok('...and the pieces that do not are the two that genuinely do not',
    /'hq-rug':[^}]*flat: true/.test(layoutBlock) && /'hq-computer':[^}]*standsOn: 'hq-desk'/.test(layoutBlock),
    'a rug casts nothing and a monitor stands on the desk — anything else is an oversight');

  /* ---- and it is DRAWN, under the art, only when he owns the thing ---- */
  /**
   * ---- THIS CHECK USED TO PASS FOR THE WRONG REASON (Aug 29, 2026) ----
   *
   * It was `/fill="url\(#hqContact\)"/.test(src)` — does that string appear
   * anywhere in the file. It does: the BOY's shadow uses the same gradient. So
   * a mutation that deleted the fill from every piece of furniture in the room
   * left this check green, and the mutation test said so within a minute of the
   * check being written.
   *
   * A check bound to "the string exists somewhere" is the same shape of mistake
   * as "the computer shares the desk's floor spot", which passed for weeks while
   * the monitor floated below the desk. So it is bound to the thing it is
   * actually about: the ellipse inside `Piece`, sized from that piece's own
   * footprint, filled with the gradient.
   */
  ok('the shadow is drawn under every owned piece',
    /rx=\{spot\.foot \* CONTACT_RX\}[\s\S]{0,200}?fill="url\(#hqContact\)"/.test(src)
      && /<radialGradient id="hqContact">/.test(src),
    'the furniture must carry it — the boy having one is not the same claim');

  ok('...and never under one he does not own',
    /\{owned && !spot\.flat && !spot\.standsOn && Number\.isFinite\(spot\.foot\) &&/.test(src),
    'a shadow under a dashed outline is the drawing claiming he owns it');

  ok('...and he casts the same kind of shadow the furniture does',
    /<ellipse cx="0" cy="2" rx="42" ry=\{\(42 \* CONTACT_RATIO\)/.test(src)
      && !/rx="42" ry="10" fill="rgba\(0,0,0,\.35\)"/.test(src),
    'a hard disc under a boy in a room of soft shadows reads as pasted on');

  /* ---- distance actually shrinks it ---- */
  /**
   * Stubbed rather than assumed. If the export above is missing, the check for
   * it has already failed and said so — the suite should report that, not die
   * of a TypeError three lines later and take the remaining twenty checks with
   * it. A guard that crashes tells you less than a guard that fails.
   */
  const shadowOf = G.contactShadow || (() => ({ rx: 0, ry: 0 }));
  const lightAt = G.lampLightAt || (() => ({ x: 0, y: 0, r: 0 }));
  const backShadow = shadowOf(96, G.projectFloor(0.5, 0.05).y);
  const frontShadow = shadowOf(96, G.projectFloor(0.5, 0.95).y);
  ok('a shadow at the back of the room is smaller than the same one at the front',
    frontShadow.rx > backShadow.rx * 1.5,
    `${backShadow.rx.toFixed(1)} at the back vs ${frontShadow.rx.toFixed(1)} at the front`);

  ok('...and it is an ellipse lying on the floor, not a circle standing up',
    Math.abs(frontShadow.ry / frontShadow.rx - G.CONTACT_RATIO) < 1e-9 && G.CONTACT_RATIO < 0.4,
    'the floor is seen at a rake, so a shadow on it is squashed');

  /**
   * THE ONE THAT WOULD HAVE CAUGHT TODAY'S BUG.
   *
   * The shadows were correct and invisible, because the surface they were drawn
   * on had no value left to take away. So the floor's own darkest stop is
   * checked for headroom: the contact gradient's core is 0.6 black, and a floor
   * that starts below roughly #14 per channel has nowhere to go under it.
   */
  const floorStops = [...src.matchAll(/<linearGradient id="hqFloor"[\s\S]*?<\/linearGradient>/g)][0]?.[0] || '';
  const darkest = [...floorStops.matchAll(/stopColor="#([0-9a-f]{6})"/gi)]
    .map((m) => Math.min(...[0, 2, 4].map((i) => parseInt(m[1].slice(i, i + 2), 16))));
  ok('the floor is light enough for a shadow to be visible on it',
    darkest.length > 0 && Math.min(...darkest) >= 0x12,
    `darkest floor channel is 0x${(Math.min(...darkest) || 0).toString(16)} — the shadows were all correct and all invisible at 0x0b`);

  /* ---- the light itself ---- */
  ok('the room has a light layer, and it adds light rather than paint',
    /mixBlendMode: 'screen'/.test(src),
    'a translucent colour over furniture tints it; screen lights it');

  /**
   * Every one of those washes is a rectangle the size of the room. One of them
   * swallowing clicks would break walking up to a piece, arranging, and the
   * two-tap place, all three at once and all three silently — the kind of fault
   * that reaches her rather than the suite.
   */
  const lightLayer = src.slice(src.indexOf("mixBlendMode: 'screen'"), src.indexOf('THE EQUIPMENT RACK'));
  ok('...and nothing in it can swallow a tap',
    /mixBlendMode: 'screen' \}\} pointerEvents="none"/.test(src)
      && /fill="url\(#hqVignette\)" pointerEvents="none"/.test(src),
    'a full-room rectangle over the furniture is a full-room click target');

  ok('the light has two temperatures, warm and cool',
    /url\(#hqLamp\)/.test(lightLayer) && /url\(#hqScreen\)/.test(lightLayer),
    'a room lit by one colour is a room lit by a filter');

  /** The spec's caps. Louder than this and it stops being a room. */
  ok('the warm light stays under its cap', G.LIGHT.lamp.max <= 0.55);
  ok('the cool light stays under its cap', G.LIGHT.screen.max <= 0.42);
  ok('the vignette frames the picture rather than swallowing it',
    G.LIGHT.vignette <= 0.34 && G.LIGHT.vignette > 0,
    'his grow box and his aquarium stand in the two corners it would eat first');

  /**
   * The lamp is a floor piece, so he can drag it. The light has to go with it —
   * the same lesson as the Aug 25 station bug, where every place he walked to
   * was an absolute coordinate worked out against where the furniture happened
   * to start.
   */
  ok('the warm light comes from wherever the lamp is actually standing',
    /const lamp = lampSpot \? lampLightAt\(lampSpot\) : null/.test(src)
      && /cx=\{lamp\.x\} cy=\{lamp\.y\}/.test(src),
    'a fixed warm patch is a light that stays behind when he moves the lamp');

  ok('...and an unowned lamp lights nothing',
    /owned\.has\('hq-lamp'\)/.test(src),
    'a room lit by a dashed outline gives away the thing the price tag is asking for');

  const lampBack = lightAt({ u: 0.5, v: 0.05 });
  const lampFront = lightAt({ u: 0.5, v: 0.95 });
  ok('...and its pool shrinks with distance like everything else in the room',
    lampFront.r > lampBack.r * 1.5,
    `${lampBack.r.toFixed(0)} at the back vs ${lampFront.r.toFixed(0)} at the front`);

  /* ---- distance reads as distance ---- */
  ok('the back wall is hazed and softened, and the side walls are not',
    /<filter id="hqFar"/.test(src) && /url\(#hqHaze\)/.test(src)
      && /LAYOUT\[i\.id\]\?\.wall \|\| LAYOUT\[i\.id\]\?\.shelf/.test(src),
    'the side walls run from the back of the room to the front, so one blur across them argues the perspective backwards');

  ok('...and the floor rows carry more weight nearer the viewer',
    /strokeWidth=\{\(2\.6 \* k\)\.toFixed\(2\)\}/.test(src),
    'one width at every depth is the flatness this phase exists to fix');

  /* ---- materials ---- */
  ok('materials are spent through one gate, and it says no to an unowned piece',
    /const mat = \(s, id, unowned = 'none'\) => \(s\.solid \? `url\(#\$\{id\}\)` : unowned\)/.test(src),
    'brushed metal on a dashed outline answers the question the price tag is asking');

  for (const [material, id] of [['metal', 'mMetal'], ['glass', 'mGlass'], ['wood', 'mWood'],
                                ['fabric', 'mFabric'], ['paper', 'mPaper'], ['water', 'mWater']]) {
    ok(`the room knows what ${material} looks like`, new RegExp(`<linearGradient id="${id}"`).test(src));
  }

  /**
   * ---- AN OPEN PATH IS STILL A FILLED PATH (Aug 29, 2026) ----
   *
   * The telescope's two tripod legs were one open path, and SVG fills an open
   * path as though it were closed — so the telescope had been painting a solid
   * wedge between its legs since the day it was drawn. On the old near-black
   * floor it was invisible. Lifting the floor for the shadows revealed it.
   *
   * Not a fault the lighting caused. One it uncovered, which is the argument
   * for rendering frames rather than reasoning about them.
   */
  /**
   * ---- REDUCED MOTION, AND THE PHASE THAT IS COMING ----
   *
   * Phase 0 adds no motion at all: it is gradients and one static blur. That is
   * worth ASSERTING rather than noting, because Phase 1 adds twelve idle loops
   * to this same file, and the moment it does, "nothing here animates" stops
   * being obviously true. A check written while it is true is free; the same
   * check written afterwards is an audit.
   */
  /**
   * ---- NAME THE 900ms, OR THE ROBOT ANSWERS FOR THE WALK (Aug 29, 2026) ----
   *
   * This read `transition: PREFERS_REDUCED_MOTION ? undefined :` and nothing
   * more. In Phase 0 that was unambiguous — the walk was the only transition in
   * the file. Phase 1 gave the robot's head the identical construction, and the
   * mutation test immediately showed the consequence: strip the guard off the
   * WALK and this check still passes, because the ROBOT's line matches it.
   *
   * Fifth time a check has been satisfied by the wrong occurrence. Each
   * transition now asserts its own duration.
   */
  ok('the walk asks permission before it moves him',
    /transition: PREFERS_REDUCED_MOTION \? undefined : 'transform 900ms/.test(code),
    'a person who asked their machine to reduce motion asked this room too');

  /**
   * ---- THIS CHECK DID ITS JOB AND WAS REPLACED (Aug 29, 2026) ----
   *
   * It read `!/@keyframes/.test(src)` — "Phase 0 adds no motion at all" — and it
   * was written while that was still obviously true, precisely so that Phase 1
   * could not add twelve idle loops without someone consciously deciding to.
   * Phase 1 arrived, the check went red, and the decision got made on purpose
   * instead of by accident. That is the whole reason to write a check you expect
   * to delete.
   *
   * What replaces it is not weaker: motion is now allowed, but only the kind
   * that costs nothing. See section 11.
   */
  ok('...and the room still refuses the kind of motion that costs a frame budget',
    !/requestAnimationFrame\s*\(/.test(code) && !/setInterval\s*\(/.test(code),
    'a 1,500-line component must not re-render sixty times a second');

  ok('the telescope stands on legs rather than on a filled triangle',
    /<g fill="none" strokeLinecap="round">\s*<path d="M-30 -6 L0 -74 L30 -6" \/>/.test(src),
    'an open path in SVG is filled as though it were closed');
}

/* ===========================================================================
 * 10. THE ROOM TELLS THE TRUTH. (Phase 3, Aug 29, 2026.)
 *
 * Eight objects read his actual record. The rule that governs all of them, from
 * the build spec: **if a source is empty, the object shows its EMPTY STATE —
 * never a zero, never a fake.** "No badges yet" is true; a grey trophy is a lie.
 *
 * That rule is the entire value of this phase, and it is also the easiest thing
 * in the world to break by accident six months from now — a well-meaning
 * "show at least one so it doesn't look broken" is one line. So it is checked
 * from both ends: the selectors return honest zeros, AND the drawings actually
 * refuse to draw anything on a zero.
 * =========================================================================== */
console.log('\n--- 10. the room tells the truth ---');
{
  const T = await import(REPO + '/src/lib/hqTruth.js');
  const { allLessons } = await import(REPO + '/src/academies/lamar/data/lessons/index.js');
  const { READINESS_SKILLS } = await import(REPO + '/src/lib/readiness.js');
  const truthSrc = fs.readFileSync(path.join(REPO, 'src/lib/hqTruth.js'), 'utf8');

  ok('the selectors are plain JS a guard can execute',
    ['awardsEarned', 'quartersEarned', 'holoReadout', 'masteredStars', 'starField',
     'lastFinished', 'growBoxShoots', 'benchFlasks', 'aquariumFish', 'fishField']
      .every((f) => typeof T[f] === 'function'),
    'selectors that decide what a child is told about his own record must be runnable outside a browser');

  /**
   * THE ROOM READS. IT DOES NOT WRITE.
   *
   * A wall decoration that could alter a grade, a date or a Georgia hour by
   * being looked at would be worth more than it costs. This file must stay
   * pure: no store, no Dexie, no async, no mutation of what it is handed.
   */
  ok('...and nothing in them can write to his record',
    !/useAppStore|from '\.\.\/db|saveMeta|\bawait\b|\.put\(|\.add\(|\.update\(|\.delete\(/.test(truthSrc),
    'a room that changes the record by being looked at is not a room');

  /* ---- every object the spec names is actually bound ---- */
  for (const [id, fn] of [
    ['hq-award-wall', 'awardsEarned'], ['hq-patch-wall', 'quartersEarned'],
    ['hq-holo', 'holoReadout'], ['hq-telescope', 'masteredStars'],
    ['hq-computer', 'lastFinished'], ['hq-garden-box', 'growBoxShoots'],
    ['hq-lab', 'benchFlasks'], ['hq-aquarium', 'aquariumFish']
  ]) {
    ok(`${id} reads real data`, new RegExp(`'${id}': ${fn}\\(`).test(src),
      'the spec binds eight objects; a decoration among them is the phase not done');
  }

  /* ================= THE EMPTY STATE RULE, FROM BOTH ENDS ================= */

  ok('an empty award record earns no badges',
    T.awardsEarned({}, READINESS_SKILLS).any === false && T.awardsEarned({}, READINESS_SKILLS).shown === 0);
  ok('...and the wall draws none of them',
    /\{i < n && \(/.test(src) && /No badges yet/.test(src),
    'three medals hung here whatever he had earned — a gold trophy for nothing is worse than a grey one');

  ok('an untouched year earns no patches', T.quartersEarned([]).count === 0);
  ok('...and the board draws them as empty stitch outlines',
    /const earned = !s\.solid \|\| i < n;/.test(src) && /strokeDasharray=\{s\.solid && !earned \? '3 3' : undefined\}/.test(src));

  ok('no mastered aerospace lesson means no stars',
    T.masteredStars({}, allLessons).count === 0 && T.masteredStars({}, allLessons).total === 54,
    'the sky fills over the year; today it is empty, and that is the point');
  ok('...and the window shows its own night sky instead of his',
    /truth\['hq-telescope'\]\?\.count > 0 \?/.test(src));

  ok('nothing finished means no lesson on the screen', T.lastFinished({}, allLessons) === null);
  /**
   * ---- THIS CHECK USED TO MATCH MY OWN COMMENT (Aug 29, 2026) ----
   *
   * It was `/Awaiting first mission/.test(src)`, and the phrase appears twice in
   * HQRoom.jsx: once in the `<text>` element that draws it, and once in the
   * comment two lines above explaining why it is there. Deleting the message
   * from the SCREEN left the comment behind, and the check went on passing —
   * the mutation test caught it within a minute of the check being written.
   *
   * The same shape of mistake as the Phase 0 shadow check that the boy's
   * shadow satisfied. Bound to the element now, not to the file.
   */
  ok('...and the computer says so in words rather than showing empty bars',
    /<text[^>]*>Awaiting first mission<\/text>/.test(src),
    'a blank screen reads as a broken computer; an invented title is the fake this phase refuses');

  ok('an empty garden log grows no shoots', T.growBoxShoots([]).count === 0);
  ok('...and the grow box draws bare soil',
    /if \(!grown\) return null;/.test(src));

  ok('no graded science unit fills no vials', T.benchFlasks([]).count === 0);
  ok('an empty typing log stocks no fish', T.aquariumFish([]).count === 0);
  ok('...and the tank draws water, gravel and plants with nothing in it',
    /fishField\(s\.truth\?\.count \|\| 0\)/.test(src));

  /**
   * The holo is the ONE exception, and it is deliberate. "Junior Engineer,
   * 0 XP" is a fact about a boy on his first day, not an invented value — the
   * rule forbids fakes, not zeros. Blanking it would be the display refusing to
   * say where he actually is.
   */
  ok('the holo shows a real zero rather than hiding it',
    T.holoReadout({ xp: 0, rank: null, streak: 0 }).xp === 0
      && T.holoReadout({}).rankName === 'Junior Engineer'
      && T.holoReadout({}).any === true,
    '0 XP is a fact; the rule forbids fakes, not facts');
  ok('...but a zero-day streak is not printed as a streak',
    /\{t\.streak > 0 && \(/.test(src),
    'a "0-day streak" is a sentence with nothing in it');

  /* ================= WHAT THE COUNTS ACTUALLY MEAN ================= */

  /**
   * Graded means graded. A unit he finished but that she has not marked is not
   * a filled vial — the bench shows checked work, which is the standard every
   * other screen in this app already applies to a Khan row.
   */
  ok('a finished-but-unmarked science unit does not fill a vial',
    T.benchFlasks([{ subject: 'science', completed: true }]).count === 0
      && T.benchFlasks([{ subject: 'science', grade: 'A', gradedAt: '2026-08-20' }]).count === 1,
    'a bench that filled on his say-so would disagree with her gradebook');

  ok('...and a graded MATHS unit does not fill a science vial',
    T.benchFlasks([{ subject: 'math', grade: 'A', gradedAt: '2026-08-20' }]).count === 0);

  /**
   * Days, not sessions. Five entries in one afternoon is one day of practice,
   * and counting them as five would hand him a full tank for a single sitting —
   * an encouragement that stops meaning anything the moment he works out how it
   * is counted, and he will.
   */
  const oneAfternoon = Array.from({ length: 5 }, () => ({ date: '2026-08-20' }));
  const fiveDays = ['16', '17', '18', '19', '20'].map((d) => ({ date: `2026-08-${d}` }));
  ok('five typing entries in one day earn no fish', T.aquariumFish(oneAfternoon).count === 0);
  ok('...and five different days earn exactly one', T.aquariumFish(fiveDays).count === 1);

  /** Same rule for the garden: a day worked is a day, however many rows it made. */
  ok('two garden sessions on one day grow one shoot',
    T.growBoxShoots([{ kind: 'session', date: '2026-08-14' }, { kind: 'session', date: '2026-08-14' }]).count === 1);
  ok('...and a sun reading is not a session',
    T.growBoxShoots([{ kind: 'sun-reading', date: '2026-08-14' }]).count === 0);

  /**
   * ---- A PATCH IS NOT A BADGE FOR TIME PASSING ----
   *
   * `buildYearPlan` marks a quarter complete when `today > span.end` — the
   * calendar, and nothing else. A patch on that basis is handed to a boy who may
   * not have opened the app once inside that quarter. `quartersEarned` is
   * deliberately stricter, and this is the check that says so.
   */
  ok('a quarter that merely elapsed earns no patch',
    T.quartersEarned([{ status: 'complete', daysLogged: 0, mastered: 0 }]).count === 0,
    '"you were alive in October" is not an achievement');
  ok('...but one with real work in it does',
    T.quartersEarned([{ status: 'complete', daysLogged: 12, mastered: 0 }]).count === 1
      && T.quartersEarned([{ status: 'complete', daysLogged: 0, mastered: 3 }]).count === 1);
  ok('...and a quarter still running earns nothing yet',
    T.quartersEarned([{ status: 'current', daysLogged: 40, mastered: 20 }]).count === 0);

  /* ================= CAPS, SO A COUNT NEVER OUTRUNS ITS ART ================= */

  ok('no selector hands back more things than the drawing has room for',
    T.aquariumFish(Array.from({ length: 400 }, (_, i) => ({ date: `2026-0${1 + (i % 9)}-${String((i % 28) + 1).padStart(2, '0')}` }))).count <= T.HQ_CAPS.fish
      && T.growBoxShoots(Array.from({ length: 90 }, (_, i) => ({ kind: 'session', date: `2026-08-${String((i % 28) + 1).padStart(2, '0')}` }))).count <= T.HQ_CAPS.shoots
      && T.benchFlasks(Array.from({ length: 40 }, () => ({ subject: 'science', grade: 'A', gradedAt: 'x' }))).count <= T.HQ_CAPS.vials,
    'a count with nowhere to draw itself renders as nothing, which looks exactly like a bug');

  ok('...and each cap matches the number of slots actually drawn',
    T.HQ_CAPS.awards === (src.match(/const slots = \[-26, 0, 26\];/) ? 3 : -1)
      && T.HQ_CAPS.vials === 6 && /\[34, 40, 46, 52, 58, 64\]/.test(src)
      && T.HQ_CAPS.shoots === 4 && /\[-40, -14, 14, 40\]/.test(src)
      && T.HQ_CAPS.fish === T.fishField(99).length,
    'a cap here and a different number of slots there is the drift this project has shipped twice');

  /* ================= THE SKY IS STABLE, AND STAYS IN THE WINDOW ================= */

  /**
   * A constellation that reshuffled on every render would be decoration rather
   * than a record, and he would work that out inside a week.
   */
  ok('the same number of mastered lessons always draws the same sky',
    JSON.stringify(T.starField(17)) === JSON.stringify(T.starField(17)));
  ok('...and mastering one more adds a star without moving the others',
    JSON.stringify(T.starField(18).slice(0, 17)) === JSON.stringify(T.starField(17)),
    'a sky that rearranged itself when he earned a star would punish him for earning it');

  /**
   * ---- AND IT STAYS INSIDE THE WINDOW (Aug 29, 2026) ----
   *
   * The first render hung this field above the telescope, and the frame showed
   * stars scattered across the back wall and out over the right wall — the Task
   * Lamp standing through the left wall again, in a new shape. The window is at
   * a fixed spot on the back wall and cannot leave it, which is half the reason
   * the constellation lives there now. This is the other half.
   */
  const WINDOW = { x: 700, y: 360, w: 200, h: 120 };
  const outside = T.starField(54, 170, 96)
    .map((s2) => ({ x: 800 + s2.x, y: 472 + s2.y, r: s2.r }))
    .filter((p) => p.x - p.r < WINDOW.x || p.x + p.r > WINDOW.x + WINDOW.w
      || p.y - p.r < WINDOW.y || p.y + p.r > WINDOW.y + WINDOW.h);
  ok('a full constellation stays inside the window frame',
    outside.length === 0,
    `${outside.length} of 54 stars land on the wall`);
}

/* ===========================================================================
 * 11. THE ROOM BREATHES. (Phase 1, Aug 29, 2026.)
 *
 * Twelve idle loops, and three rules that make them affordable:
 *
 *   1. Declarative only. CSS on SVG, running on the compositor. No
 *      requestAnimationFrame, no interval, nothing that re-renders React.
 *   2. Every period different, so the loops never drift into step and start
 *      pulsing like machinery.
 *   3. Nothing animated is load-bearing. Remove every animation and the room
 *      reads the same, just still — which is what makes reduced motion a
 *      one-line rule instead of a second rendering path.
 * =========================================================================== */
console.log('\n--- 11. the room breathes ---');
{
  const motion = src.slice(src.indexOf('const HQ_MOTION = `'), src.indexOf('`;', src.indexOf('const HQ_MOTION = `')));


  ok('the idle loops exist and live in one stylesheet',
    motion.length > 0 && /<style>\{HQ_MOTION\}<\/style>/.test(src),
    'twelve animations scattered through 1,500 lines is twelve places to forget one');

  /**
   * The rule the build spec is most explicit about, and the reason this phase
   * is cheap: a CSS animation on transform/opacity runs on the compositor and
   * React never hears about it.
   */
  ok('nothing drives a frame from JavaScript',
    !/requestAnimationFrame\s*\(|setInterval\s*\(|setTimeout\s*\([^)]*\b1[0-9]?\s*\)/.test(code),
    'a 1,500-line component re-rendering per frame is the performance rule broken by the phase that has nothing to compute');

  ok('...and the loops move only things that are cheap to move',
    !/@keyframes[^}]*\b(width|height|top|left|margin)\s*:/.test(motion),
    'animating layout properties forces reflow; transform and opacity do not');

  /* ---- the periods the spec named ---- */
  /**
   * A loop's period can live in either of two places, and the check has to read
   * both or it reports a loop missing that is right there. The stylesheet holds
   * the fixed ones (3s breathe, 12s scan, 23s flicker); the shared `.hq-sway`
   * rule takes its period from a `--dur` custom property set at the call site,
   * because the desk plant sways on 8s and the grow box on 7s and they are one
   * rule. Reading only the stylesheet said 6s and 8s did not exist.
   */
  const cssDurations = [...motion.matchAll(/animation:\s*\w+\s+(?:var\(--dur,\s*)?([\d.]+)s/g)].map((m) => m[1]);
  const inlineDurations = [...src.matchAll(/'--dur':\s*'([\d.]+)s'/g)].map((m) => m[1]);
  const durations = [...cssDurations, ...inlineDurations];
  const named = ['3', '6', '7', '8', '12', '20', '23', '30', '40', '1.1'];
  for (const d of named) {
    ok(`the ${d}s loop is on the period the spec gave it`, durations.includes(d),
      `found: ${durations.join(', ')}`);
  }

  /**
   * ---- ONE DELIBERATE COLLISION, AND IT IS THE SPEC'S ----
   *
   * "No two loops share a period" failed on first run, and it was right to: the
   * holo display's scanline and its chart line are BOTH on 12s. That is not an
   * oversight, it is the spec's own row — *"Chart line advances, scanline
   * drifts — 12s"* — and they belong to one screen, where moving together is
   * what a single refreshing display looks like.
   *
   * So the rule is what it was always actually about: enough DISTINCT periods
   * that the room never falls into step. Two motions on one object sharing a
   * clock is a screen. Six objects sharing one would be machinery, and nine
   * distinct periods across twelve loops cannot produce it.
   */
  ok('the loops carry enough distinct periods to never fall into step',
    new Set(durations).size >= 9,
    `${durations.length} declared, ${new Set(durations).size} distinct`);

  /**
   * ---- A FALLBACK IS NOT A PERIOD ----
   *
   * `.hq-sway` and `.hq-fish` read their duration from a `--dur` custom
   * property, with a fallback in the rule. The fallback exists so a malformed
   * element still animates rather than freezing — but if an element ever forgot
   * to supply `--dur`, it would silently run at the fallback and fall into step
   * with whatever else shares it. That is the sync failure this phase is most
   * careful about, arriving through the back door.
   *
   * So: every element using one of those shared rules supplies its own period.
   * Checked by counting, because the alternative is trusting that nobody adds a
   * thirteenth loop in a hurry.
   */
  const sharedRuleUsers = (code.match(/anim\(s, '(?:hq-sway|hq-fish)'\)/g) || []).length;
  ok('every loop on a shared rule declares its own period',
    inlineDurations.length >= 4 && sharedRuleUsers >= 4,
    `${sharedRuleUsers} elements on shared rules, ${inlineDurations.length} declared periods`);

  ok('the fish are staggered against each other',
    /'--dur': `\$\{9 \+ i\}s`, animationDelay: `\$\{-2\.3 \* i\}s`/.test(src),
    'eight fish on one clock is a chorus line');

  ok('...and the grow box shoots sway out of phase',
    /'--dur': '7s', animationDelay: `\$\{-1\.6 \* i\}s`/.test(src),
    'four shoots nodding in unison is a metronome, not a window box');

  /* ---- reduced motion stops all of it ---- */
  const reduced = motion.slice(motion.indexOf('@media (prefers-reduced-motion: reduce)'));
  ok('every loop stops when the machine asks for less motion',
    /@media \(prefers-reduced-motion: reduce\)/.test(motion)
      && ['hq-fish', 'hq-sway', 'hq-breathe', 'hq-blink', 'hq-scan',
          'hq-trace', 'hq-flicker', 'hq-mote', 'hq-sky', 'hq-turn']
        .every((cls) => reduced.includes(cls))
      && /animation:\s*none\s*!important/.test(reduced),
    'a loop that forgets to opt out is a loop that ignores the setting');

  /**
   * The trace is the one loop whose RESTING state is not its drawn state: it
   * animates `stroke-dashoffset` from 240 to 0, so stopping the animation
   * without resetting the offset would leave the chart line invisible. That is
   * the definition of load-bearing decoration, and it is the exact trap this
   * check exists to hold shut.
   */
  ok('...and the one loop that hides its own subject resets when stopped',
    /\.hq-trace \{ stroke-dashoffset: 0 !important; \}/.test(reduced),
    'reduced motion must leave a still room, not an incomplete one');

  ok('the walk still asks permission too',
    /transition: PREFERS_REDUCED_MOTION \? undefined :/.test(src));

  ok('...and so does the robot turning its head',
    /transition: PREFERS_REDUCED_MOTION \? undefined : 'transform 700ms/.test(src),
    'the one motion in this phase that is about him rather than about the room');

  /* ---- nothing animated carries meaning ---- */
  /**
   * The load-bearing test, stated as code. Phase 3 put real data into eight
   * objects; Phase 1 must not put any of it into a moving part, or a person
   * with reduced motion would be shown less of his own record than everyone
   * else. Every animated element is decoration ON something already drawn.
   */
  ok('the chart line traces itself rather than sliding',
    /anim\(s, 'hq-trace'\)/.test(code) && /@keyframes hqTrace \{ to \{ stroke-dashoffset: 0; \} \}/.test(motion),
    'a chart that slid sideways would imply the numbers were changing on a timer');

  /**
   * ---- EVERY ANIMATED ELEMENT, NOT ONE OF THEM (Aug 29, 2026) ----
   *
   * This check was two regexes matching two specific lines, and the mutation
   * test walked straight through it: making the DESK PLANT animate
   * unconditionally left the check green, because the string it matched also
   * appears on the GROW BOX, which was still correctly gated.
   *
   * Fourth time in three phases that a check has passed by matching the wrong
   * occurrence. So this one does not match a line — it enumerates every place an
   * animation class is applied and requires each to be behind an ownership
   * condition. A thirteenth loop added later is covered without anyone
   * remembering to extend a list.
   */
  ok('there is one gate for attaching an idle loop, and it says no to a ghost',
    /const anim = \(s, classes\) => \(s\.solid \? `hq-anim \$\{classes\}` : undefined\);/.test(code),
    'sixteen hand-written class strings is sixteen chances to forget the ownership check');

  /**
   * And nobody writes the class by hand. Everything outside the stylesheet must
   * come through `anim()` — with ONE exception, stated rather than assumed: the
   * constellation drifting in the window is drawn by `HQRoom` itself, not by an
   * ART function, so there is no `s` to hand to `anim()`. It carries its own
   * ownership check on the telescope, which the line below requires.
   */
  const body = code.slice(code.indexOf('`;', code.indexOf('const HQ_MOTION = `')));
  const handWritten = [...body.matchAll(/['"]hq-anim/g)].map((m) => m.index);
  const unownedHandWritten = handWritten.filter(
    (i) => !/owned\.has\(/.test(body.slice(Math.max(0, i - 220), i))
  );
  ok('a ghost piece does not animate',
    unownedHandWritten.length === 0,
    `${unownedHandWritten.length} animation class(es) written by hand without an ownership check`
      + ' — an outline of something he has not bought should not be alive');

  ok('...and every loop in the room goes through that gate',
    (code.match(/anim\(s, '/g) || []).length >= 11,
    `${(code.match(/anim\(s, '/g) || []).length} sites route through anim()`);

  /* ---- the robot looks at HIM, from wherever both of them are standing ---- */
  ok('the robot turns toward where he actually is',
    /const robotFacing = \(\(\) => \{[\s\S]*?spotOf\('hq-robot'\)[\s\S]*?projectFloor\(spot\.u, spot\.v\)/.test(src),
    'a fixed head angle is the Aug 25 station bug once more — a direction that was never a direction');

  ok('...and it stays still for a robot he does not own',
    /if \(!r \|\| !owned\.has\('hq-robot'\)\) return 0;/.test(src));
}

/* ===========================================================================
 * 12. THE CREW. (Phase 4 pilot, Aug 30, 2026.)
 *
 * One crew member built first, at the parent's request — "start with one crew
 * member so we can see how it works" — and because he owns exactly one HQ item,
 * the Engineering Workstation, so every other post is a dashed outline.
 *
 * The measurement the pilot existed to produce: 39 SVG nodes per crew member,
 * 607 projected for all six against 373 today, and 0.11ms per re-render. Six
 * is affordable.
 * =========================================================================== */
console.log('\n--- 12. the crew ---');
{
  const C = await import(REPO + '/src/lib/hqCrew.js');
  const { HQ_CREW } = await import(REPO + '/src/academies/lamar/data/hqCrew.js');
  const G = await import(REPO + '/src/lib/hqGeometry.js');
  const { allLessons } = await import(REPO + '/src/academies/lamar/data/lessons/index.js');
  const crewSrc = fs.readFileSync(path.join(REPO, 'src/lib/hqCrew.js'), 'utf8');
  const store = fs.readFileSync(path.join(REPO, 'src/store/useAppStore.js'), 'utf8');

  ok('the crew rules are plain JS a guard can execute',
    ['hasArrived', 'crewRoster', 'postFor', 'crewSpotFor', 'occupantOf']
      .every((f) => typeof C[f] === 'function'));

  ok('...and nothing in them writes to his record',
    !/useAppStore|from '\.\.\/db|saveMeta|\bawait\b|\.put\(|\.add\(/.test(crewSrc),
    'whether a boy earned a crew member is derived from his work, never stored');

  /* ---- earned, never bought ---- */
  ok('no crew member has a price', HQ_CREW.every((c) => c.cost === undefined && c.price === undefined),
    'crew are earned by real work — that is the rule that separates them from furniture');
  ok('every crew member states how they are earned',
    HQ_CREW.every((c) => c.arrival && c.arrival.kind && c.arrival.count > 0));

  /* ---- arrival ---- */
  const aero = allLessons.filter((l) => l.subject === 'aerospace');
  const engineer = HQ_CREW.find((c) => c.id === 'crew-flight-engineer');
  const masteredN = (n) => Object.fromEntries(aero.slice(0, n).map((l) => [l.id, { mastered: true }]));

  ok('a crew member has not arrived on an empty record',
    C.hasArrived(engineer, { lessonProgress: {}, allLessons }) === false);
  ok('...nor one lesson short of the threshold',
    C.hasArrived(engineer, { lessonProgress: masteredN(9), allLessons }) === false);
  ok('...and arrives exactly on it',
    C.hasArrived(engineer, { lessonProgress: masteredN(10), allLessons }) === true);

  /**
   * The failure mode has to be "he does not have it yet", never "here, have
   * it". An arrival rule nobody implemented must not hand out a crew member.
   */
  ok('an unrecognised arrival rule hands out nobody',
    C.hasArrived({ id: 'x', arrival: { kind: 'somethingNew', count: 1 } }, {}) === false
      && C.hasArrived({ id: 'x' }, {}) === false,
    'an unknown rule must fail closed');

  /* ---- the room draws nobody who has not arrived ---- */
  {
    const empty = C.crewRoster({ lessonProgress: {}, allLessons }, { owned: new Set(['hq-desk']) });
    ok('an unearned crew member carries no post',
      empty.every((c) => !c.arrived && c.post === null),
      'no silhouette, no greyed-out placeholder — the Phase 3 empty-state rule');
    /**
     * Named, not floating. Phase 2 added a SECOND `roster.filter((c) =>
     * c.arrived)` — the roaming figure list — ahead of this one in the file,
     * so a bare pattern would have been answered by the wrong occurrence and
     * the room could have drawn a crew member he has not earned. Bind the
     * declaration this check is actually about.
     */
    ok('...and the room only draws arrived crew',
      /const crewInRoom = useMemo\(\(\) => roster\.filter\(\(c\) => c\.arrived\)/.test(code),
      'the panel may mention someone he has not earned; the room may not');
    ok('...but the panel still shows what is left to earn',
      typeof C.arrivalProgress === 'function'
        && C.arrivalProgress(engineer, { lessonProgress: masteredN(4), allLessons })?.have === 4,
      'a real count against a real threshold, not a bar with nothing behind it');
  }

  /* ---- where they stand ---- */
  {
    /* The desk station, read from the room rather than transcribed. */
    const stationBlock = src.slice(src.indexOf("'hq-desk': {", src.indexOf('export const STATIONS')));
    const du = Number(/du: (-?[\d.]+)/.exec(stationBlock)[1]);
    const dv = Number(/dv: (-?[\d.]+)/.exec(stationBlock)[1]);
    const surfaceY = Number(/surfaceY: (-?\d+)/.exec(stationBlock)[1]);
    const station = { du, dv, stance: 'work', surfaceY };
    const base = { u: 0.4167, v: 0.375 };
    const cadet = { u: base.u + station.du, v: base.v + station.dv };
    const crew = C.crewSpotFor(station, base, 96);   // the workstation's own foot

    /**
     * The fault the first frame showed: posted at the cadet's own offset, the
     * engineer stood in front of the Mission Computer with his back to it,
     * covering the screen Phase 3 exists to fill.
     */
    ok('a posted crew member stands on the far side, not in his spot',
      (cadet.u - base.u) > 0 !== (crew.u - base.u) > 0,
      'the user spot is where HE walks to; a crew member posted there hides the piece all day');

    const gap = Math.abs(G.projectFloor(cadet.u, cadet.v).x - G.projectFloor(crew.u, crew.v).x);
    ok('...far enough apart to read as two people', gap > 80, `${gap.toFixed(0)}px apart`);

    /**
     * ---- AND THE ROOM MUST ACTUALLY ASK FOR IT (Aug 30, 2026) ----
     *
     * This checked only that `reachYFor` returns a sane number for a crew spot
     * — which it does whether or not anything calls it. The mutation test set
     * the room's `reachY` to a flat null and the check stayed green, so the
     * engineer would have stood at the desk with his arms at his sides and
     * nothing would have said so.
     *
     * The same trap as the Phase 0 shadow and the Phase 3 message: assert the
     * property AND the wiring.
     */
    const reach = G.reachYFor(station, base, crew);
    ok('...and their hands land on the surface they are posted at',
      reach !== null && reach > -70 && reach < -20
        && /reachY: reachYFor\(station, spotOf\(postId\), spot\)/.test(code),
      `reach ${reach === null ? 'null' : reach.toFixed(1)} — same invariant the cadet has`);

    ok('the standoff is a named constant, not a number in the JSX',
      Number.isFinite(C.CREW_STANDOFF_PX)
        && /crewSpotFor\(station, base, LAYOUT\[postId\]\?\.foot \|\| 0\)/.test(code));

    /**
     * A fixed offset served the workstation and stranded the engineer 50px
     * clear of the narrower Crew Console. The standoff now comes off the
     * piece's own footprint, so it has to hold for BOTH — a wide piece and a
     * narrow one — or it is just a different constant that happens to fit one.
     */
    const narrow = C.crewSpotFor(station, base, 62);
    const wide = C.crewSpotFor(station, base, 96);
    ok('...and it measures the piece rather than assuming one width',
      Math.abs(narrow.u - base.u) < Math.abs(wide.u - base.u),
      `narrow ${narrow.u.toFixed(4)} vs wide ${wide.u.toFixed(4)} — a slimmer console means standing closer`);
  }

  /* ---- posts follow the furniture, and only to owned stations ---- */
  ok('a post to a station he does not own resolves to nowhere',
    C.postFor(engineer, { posts: { [engineer.id]: 'hq-lab' }, owned: new Set(['hq-desk']) }) === null,
    'nobody works at a dashed outline');
  ok('...and the default post is ignored unless he owns it',
    C.postFor(engineer, { posts: {}, owned: new Set() }) === null
      && C.postFor(engineer, { posts: {}, owned: new Set(['hq-desk']) }) === 'hq-desk');
  ok('the post follows the piece when he drags it',
    /const base = spotOf\(postId\)/.test(code),
    'a post is an offset from a piece, never an absolute floor spot — the Aug 25 lesson');

  /* ---- one crew member per station, enforced in the store ---- */
  ok('one station holds one crew member',
    typeof C.occupantOf === 'function'
      && C.occupantOf('hq-desk', [{ id: 'a', arrived: true, post: 'hq-desk' }]) === 'a',
    'with no limit he would post everybody everywhere and the choice would stop meaning anything');
  ok('...and the STORE enforces it, not only the screen',
    /if \(otherId !== crewId && otherStation === stationId\) delete hqCrewPosts\[otherId\];/.test(store),
    'a rule that only exists in a component is a rule a second component walks past');
  ok('...and the store refuses a station he does not own',
    /if \(stationId && !owned\.has\(stationId\)\) return \{ ok: false, reason: 'not-owned' \};/.test(store));

  /* ---- figures are depth sorted ---- */
  ok('every figure is sorted back to front by its own v',
    /\.sort\(\(a, b\) => \(a\.spot\.v \?\? 0\) - \(b\.spot\.v \?\? 0\)\)/.test(code),
    'drawing the far figure over the near one is the one thing perspective cannot survive');

  /* ---- a crew member is not him ---- */
  ok('crew are drawn as a different figure from his own avatar',
    HQ_CREW.every((c) => c.avatar && c.avatar !== 'avatar-cadet'),
    'a crew member drawn as another cadet reads as a clone of him');
  ok('...and wear none of his gear',
    /avatar: c\.avatar, gear: \{\}/.test(code),
    'gear is his, bought with his coins — putting it on a colleague spends his things');

  /* ---- the post is not a record ---- */
  ok('where he posts crew is stored beside his room layout, not his record',
    /hqCrewPosts: \{\},/.test(store) && /equippedGear, hqLayout, hqCrewPosts, quizLinks,/.test(store),
    'it persists and merges like hqLayout; no report card ever reads it');
}

/* =============================================================================
 * 13. PHASE 2 — NOBODY STANDS STILL ALL DAY.
 *
 * The parent: **"I will like it that the avatar and the worker are moving
 * around the hq unless placed in a specific spot by Lamar. So periodically they
 * will look through the microscope, look at pics, sit in a chair, work at the
 * work station etc."**
 *
 * ---- WHAT CAN ACTUALLY GO WRONG HERE ----
 *
 * Roaming is the first thing in this room that changes state on its own, and
 * every one of its failure modes is quiet:
 *
 *   * **A pin that does not hold.** He posts the engineer at the console, walks
 *     away, comes back and the engineer is at the telescope. That reads as the
 *     app ignoring him, and it is one boolean.
 *   * **Two people in one chair.** Renders as one figure with a doubled shadow
 *     — easy to miss in a still frame, obvious and broken in motion.
 *   * **Somebody standing at a dashed outline.** The Phase 3 empty-state rule
 *     wearing a different hat: the room showing him something he has not
 *     earned.
 *   * **Turning it up.** `WANDER_DWELL_MS.min` edited to 800 during a debugging
 *     session and never put back is a battery drain on the laptop that is also
 *     running his schoolwork, and nothing on screen says so.
 *
 * The rules are pure functions in `lib/hqWander.js` precisely so this file can
 * EXECUTE them rather than grep for them — the randomness is a parameter, so
 * "two figures never share a stop" is checked against a thousand rolls instead
 * of hoped for.
 * ========================================================================== */
{
  const W = await import(REPO + '/src/lib/hqWander.js');
  const C = await import(REPO + '/src/lib/hqCrew.js');
  const G = await import(REPO + '/src/lib/hqGeometry.js');

  /* ---- the rules are runnable at all ---- */
  ok('the roaming rules are plain JS a guard can execute',
    typeof W.wanderTick === 'function' && typeof W.nextStop === 'function',
    'randomness is a parameter, so the rules are testable instead of hoped for');
  ok('...and nothing in them writes',
    !/saveMeta|useAppStore|db\.|await /.test(
      fs.readFileSync(path.join(REPO, 'src/lib/hqWander.js'), 'utf8')),
    'where somebody wandered is not a record of anything');

  const STOPS = ['hq-desk', 'hq-chair', 'hq-telescope', 'hq-lab', 'hq-console'];

  /* ---- never your own stop, never somebody else's, never off the list ---- */
  let selfPick = 0; let stolen = 0; let offList = 0;
  for (let i = 0; i <= 1000; i += 1) {
    const to = W.nextStop('hq-desk', STOPS, ['hq-chair'], i / 1000);
    if (to === 'hq-desk') selfPick += 1;
    if (to === 'hq-chair') stolen += 1;
    if (to !== null && !STOPS.includes(to)) offList += 1;
  }
  ok('nobody ever picks the stop they are already standing at',
    selfPick === 0,
    'a figure that "moves" to where it is reads as one that has frozen');
  ok('...nor one somebody else is standing at',
    stolen === 0,
    'two figures on one chair is one figure with a shadow problem');
  ok('...nor anywhere outside the stop list',
    offList === 0);
  ok('nowhere legal to go means STAY, never somewhere arbitrary',
    W.nextStop('hq-desk', ['hq-desk'], [], 0.5) === null);

  /* ---- the stop list is ownership, so a roamer cannot reach an outline ---- */
  /**
   * ---- AND THE SEVENTH TIME THIS TRAP HAS BEEN SPRUNG (Aug 30, 2026) ----
   *
   * This was a bare `/HQ_ITEMS\.filter\(\(i\) => owned\.has\(i\.id\) &&
   * STATIONS\[i\.id\]\)/`, and the mutation that let roamers walk to pieces he
   * has not bought SURVIVED it. The room contains that same expression twice
   * more, in the crew-posting panel — so the panel's list answered for the
   * roaming list, and a boy would have watched his cadet stand at a dashed
   * outline with a green check beside it.
   *
   * Same fix as every previous time: bind the NAME, and require the named
   * thing to be the one actually used. An expression floating anywhere in a
   * 2,500-line file is not evidence about the one place that matters.
   */
  ok('roaming can only reach pieces he owns',
    /const wanderStops = useMemo\(\s*\(\) => HQ_ITEMS\.filter\(\(i\) => owned\.has\(i\.id\) && STATIONS\[i\.id\]\)/.test(code)
      && /wanderInputs\.current = \{\s*figures: wanderFigures, stops: wanderStops, spotOf: standingSpotOf\s*\};/.test(code),
    'a figure at a dashed outline is the room showing him something he has not earned');

  /* ---- a pin holds ---- */
  {
    const pinned = W.wanderTick({
      state: { cadet: { at: 'hq-lab', until: 0 } },
      figures: [{ id: 'cadet', pinned: true, at: 'hq-chair' }],
      stops: STOPS, now: 999999, rolls: {}
    });
    ok('posting somebody stops them roaming, immediately',
      !('cadet' in pinned.state),
      'a pin that does not hold reads as the app ignoring him');
  }
  ok('...and the cadet is pinned by the tap he already has',
    /\{ id: 'cadet', pinned: Boolean\(atId\), at: atId \|\| null \}/.test(code),
    'tapping a piece already means "stand there"; a second lock control would fight it');
  ok('...and a crew member by the post he already gave them',
    /pinned: Boolean\(hqCrewPosts\[c\.id\]\)/.test(code));
  ok('a pinned crew member ignores wherever they had roamed to',
    /const postId = pinned \? c\.post : \(wander\[c\.id\]\?\.at \|\| c\.post\);/.test(code));

  /* ---- two figures, twenty simulated minutes, no collisions ---- */
  {
    const figures = [
      { id: 'cadet', pinned: false, at: null },
      { id: 'crew-flight-engineer', pinned: false, at: null }
    ];
    let state = {}; let now = 0; let collisions = 0; let moves = 0;
    for (let i = 0; i < 400; i += 1) {
      now += W.WANDER_TICK_MS;
      const rolls = {};
      for (const f of figures) rolls[f.id] = { stop: (i * 0.37) % 1, dwell: (i * 0.61) % 1 };
      const r = W.wanderTick({ state, figures, stops: STOPS, now, rolls });
      if (r.changed) moves += 1;
      state = r.state;
      const a = state.cadet?.at;
      const b = state['crew-flight-engineer']?.at;
      if (a && a === b) collisions += 1;
    }
    ok('two roamers never end up in the same place',
      collisions === 0,
      `${collisions} collisions over 400 ticks`);
    ok('...and the room is not frantic',
      moves > 0 && moves < 200,
      `${moves} state changes over twenty simulated minutes`);
  }

  /* ---- a quiet tick costs NOTHING ---- */
  {
    const state = { cadet: { at: 'hq-desk', until: 999999 } };
    const r = W.wanderTick({
      state, figures: [{ id: 'cadet', pinned: false, at: null }],
      stops: STOPS, now: 1000, rolls: {}
    });
    ok('a tick where nobody is due returns the same object, by reference',
      r.state === state && r.changed === false,
      'a fresh object every three seconds would re-render the whole room to say nothing happened');
  }

  /* ---- the dwell floor ---- */
  {
    let min = Infinity;
    for (let i = 0; i <= 1000; i += 1) min = Math.min(min, W.dwellFor(i / 1000));
    ok('nobody moves more often than the floor allows',
      min >= W.WANDER_MIN_DWELL_MS && W.WANDER_MIN_DWELL_MS >= 12000,
      `shortest possible dwell ${min}ms against a floor of ${W.WANDER_MIN_DWELL_MS}ms`);
    ok('...and the dwell is a RANGE, so two figures never fall into step',
      W.WANDER_DWELL_MS.max - W.WANDER_DWELL_MS.min >= 8000,
      'one dwell length for everybody gives the room a rhythm you can feel');
  }

  /* ---- and it is still not a frame loop ---- */
  ok('roaming is a slow decision, not an animation',
    W.WANDER_TICK_MS >= 1000
      && /setTimeout\(tick, WANDER_TICK_MS\)/.test(code)
      && !/requestAnimationFrame\s*\(|setInterval\s*\(/.test(code),
    'the 900ms CSS transform transition does the travelling; JavaScript only says where to');
  ok('...and the timer is torn down when the room closes',
    /return \(\) => clearTimeout\(timer\);/.test(code),
    'a timer outliving the component is a leak that only shows up after an hour');

  /* ---- reduced motion, and arranging ---- */
  ok('reduced motion stops roaming dead',
    /if \(PREFERS_REDUCED_MOTION \|\| arranging\) return undefined;/.test(code)
      && /PREFERS_REDUCED_MOTION \? null : wander\.cadet\?\.at/.test(code),
    'everybody stands at their post — the room exactly as it behaved before this phase');

  /**
   * The proximity rule is only as good as the model it measures. If
   * `standingSpotFor` says a crew member stands somewhere other than where
   * `crewSpotFor` actually puts them, the room will confidently avoid
   * overlaps that are not there and walk into ones that are — and every
   * simulation in this file would still be green, because it would be
   * measuring the same wrong model.
   */
  {
    const st = { du: 0.045, dv: 0.02, stance: 'work', surfaceY: -58 };
    const base = { u: 0.4167, v: 0.375 };
    const modelled = C.standingSpotFor('crew-flight-engineer', st, base, 96);
    const actual = C.crewSpotFor(st, base, 96);
    ok('the proximity model measures where crew ACTUALLY stand',
      modelled && actual && Math.abs(modelled.u - actual.u) < 1e-9
        && Math.abs(modelled.v - actual.v) < 1e-9,
      'a model that disagrees with the render avoids overlaps that are not there');
  }

  ok('there is ONE implementation of where a figure stands',
    typeof C.standingSpotFor === 'function'
      && !/u: Math\.min\(0\.97, Math\.max\(0\.03, base\.u \+ standStation\.du\)\)/.test(code),
    'the room and this suite call the same function; a second copy is the drift bug shipped twice');

  /* ---- IDENTITY IS NOT PROXIMITY ----------------------------------------
   *
   * The check that had to exist, and did not.
   *
   * `nextStop` refused to send two figures to the same STATION, which sounded
   * like the whole problem. A rendered frame then caught the cadet and the
   * Flight Engineer **2.3px apart at two different stations**, and enumerating
   * every ordered pair of stops found thirteen more inside 70px — the worst
   * being the cadet at the Crew Console and the engineer at the Engineering
   * Workstation, 24px, which is two people standing inside each other.
   *
   * That is roughly a one-in-twenty-five chance on every move, so it would have
   * shipped and shown up at random while a twelve-year-old was watching.
   *
   * So this walks the REAL station table against the REAL layout and the REAL
   * projection, and requires that no pair the room can produce is closer than
   * the minimum. It is also the check that will fail the day somebody drags the
   * furniture into a new arrangement that creates a fresh near-collision.
   */
  {
    /**
     * Where a figure would stand — THE ROOM'S OWN FUNCTION, not a second copy.
     *
     * This was reimplemented here at first, and the mutation suite showed what
     * that is worth: breaking the room's resolver left this suite green,
     * because it was checking one copy of the arithmetic against another copy
     * that still agreed with itself. `standingSpotFor` now lives in
     * `hqCrew.js`, the room calls it, and so does this.
     */
    const standing = (figure, id) => {
      const st = ST[id];
      if (!st) return null;
      const s = C.standingSpotFor(figure, st, baseOf(id), footOf(id));
      if (!s) return null;
      const p = G.projectFloor(s.u, s.v);
      return [p.x, p.y];
    };

    ok('the station table parses for every piece with a station',
      Object.keys(ST).length >= 19,
      `${Object.keys(ST).length} stations read from the room`);

    const ids = Object.keys(ST);
    const tooClose = [];
    for (const a of ids) {
      for (const b of ids) {
        if (a === b) continue;
        const pa = standing('cadet', a);
        const pb = standing('crew', b);
        if (!pa || !pb) continue;
        const d = Math.hypot(pa[0] - pb[0], pa[1] - pb[1]);
        if (d < W.WANDER_MIN_GAP_PX) tooClose.push(`${a}/${b} ${d.toFixed(0)}px`);
      }
    }

    /**
     * Some pairs ARE too close — that is the point, and it is why the rule has
     * to be geometric. What the room must never do is CHOOSE one, so the same
     * pairs are fed through `wanderTick` with the real resolver and none may
     * survive.
     */
    ok('the room has stop pairs that would overlap, and knows it',
      tooClose.length > 0,
      `${tooClose.length} of ${ids.length * (ids.length - 1)} pairs are closer than ${W.WANDER_MIN_GAP_PX}px — an id check alone would ship every one`);

    const spotOf = (figureId, stationId) => standing(figureId === 'cadet' ? 'cadet' : 'crew', stationId);
    let chosenTooClose = 0; let moves = 0;
    for (const start of ids) {
      for (let i = 0; i <= 40; i += 1) {
        const r = W.wanderTick({
          state: { cadet: { at: start, until: 0 }, crew: { at: ids[i % ids.length], until: 1e15 } },
          figures: [{ id: 'cadet', pinned: false, at: null }, { id: 'crew', pinned: false, at: null }],
          stops: ids, now: 1e14, rolls: { cadet: { stop: i / 41, dwell: 0.5 } }, spotOf
        });
        const a = r.state.cadet.at; const b = r.state.crew.at;
        if (!a || !b) continue;
        moves += 1;
        const pa = spotOf('cadet', a); const pb = spotOf('crew', b);
        if (pa && pb && Math.hypot(pa[0] - pb[0], pa[1] - pb[1]) < W.WANDER_MIN_GAP_PX) chosenTooClose += 1;
      }
    }
    ok('...and never walks into one of them',
      moves > 500 && chosenTooClose === 0,
      `${chosenTooClose} overlaps across ${moves} simulated moves — identity is not proximity`);

    ok('the room hands the tick real geometry, not just ids',
      /wanderTick\(\{ state: cur, figures, stops, now, rolls, spotOf: standingAt \}\)/.test(code)
        && /const s = standingSpotFor\(\s*figureId, st, spotOf\(stationId\)/.test(code),
      'without a resolver the proximity rule falls through to true and the 24px overlap ships again');
  }

  /* ---- THE WALK CYCLE -----------------------------------------------------
   *
   * The parent, after Fallout Shelter: **"Can the animation also work the
   * same?"** Nearly all of it already did — that game's dwellers are 2D
   * jointed figures in a cutaway room, which is this skeleton, and Phase 1
   * gave every stance an idle loop. What was missing was the crossing: a
   * static pose sliding 900ms on a CSS transform, legs locked, like a chess
   * piece moved by an invisible hand.
   */
  {
    const av = fs.readFileSync(path.join(REPO, 'src/components/Rewards/CadetAvatar.jsx'), 'utf8');
    const avCode = av.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');

    ok('a figure crossing the room walks rather than glides',
      /walk: \{/.test(avCode) && /legParts: \{/.test(avCode)
        && /legL: \{ type: 'translate'/.test(avCode) && /legR: \{ type: 'translate'/.test(avCode),
      'legs locked together while the figure slides is what the eye reads as "not a person"');

    /**
     * Each leg needs its OWN group. A rotation applied to a bare sibling rect
     * cannot carry the boot with it, so the thigh would swing and the foot
     * stay behind — the same fault that grouped the arms with their hands.
     */
    ok('...with each leg in its own group, so the boot travels with the thigh',
      /<g>\s*<Motion spec=\{motion\?\.legL\} on=\{moving\} \/>/.test(avCode)
        && /<g>\s*<Motion spec=\{motion\?\.legR\} on=\{moving\} \/>/.test(avCode),
      'a rotated bare rect leaves its own foot behind');

    /**
     * ---- THE CHECK THAT REPLACED A GREEN ONE (Aug 30, 2026) ----
     *
     * The first walk counter-rotated the legs about their hips, and this
     * asserted exactly that: correct pivot, opposite phase, both true, green.
     * The rendered frame showed the cadet with his legs splayed into a V,
     * because these figures FACE THE VIEWER and a rotation in the picture
     * plane swings a leg out rather than forward.
     *
     * So the check is no longer about how the motion is expressed. It is about
     * the property that has to hold whatever the expression: **the two legs
     * are never in the same place at the same time.** A walk where both feet
     * rise together is a hop.
     */
    {
      const read = (k) => {
        const m = new RegExp(`${k}: \\{ type: 'translate', values: '([^']+)'`).exec(avCode);
        return m ? m[1].split(';').map((v) => Number(v.trim().split(/\s+/)[1])) : null;
      };
      const L = read('legL'); const R = read('legR');
      const paired = L && R && L.length === R.length && L.length >= 3;
      ok('...and the two legs are never off the ground together',
        paired && L.every((v, i) => v !== R[i]),
        `left ${L ? L.join('/') : '?'} against right ${R ? R.join('/') : '?'} — matching frames would be a hop`);
      ok('...and the step is a step, not a high knee',
        paired && Math.max(...L.map(Math.abs)) >= 2 && Math.max(...L.map(Math.abs)) <= 14,
        `lift of ${L ? Math.max(...L.map(Math.abs)) : '?'} units against a 30-unit thigh`);
    }

    /** The two arms swing against each other, or it is a marching toy. */
    {
      const num = (k) => {
        const m = new RegExp(`${k}: \\{ type: 'rotate', values: '(-?[\\d.]+)`).exec(avCode);
        return m ? Number(m[1]) : null;
      };
      const armL = num('left'); const armR = num('right');
      ok('...and the arms swing against each other',
        armL !== null && armR !== null && Math.sign(armL) !== Math.sign(armR),
        `left arm starts ${armL}, right ${armR} — both the same way is a marching toy`);
      ok('...gently, because these figures are drawn front-on',
        armL !== null && Math.abs(armL) <= 10,
        `${Math.abs(armL)} degrees — a big in-plane swing front-on looks like being held up by the elbows`);
    }

    /* ---- the walk stops when the movement does, without a second timer ---- */
    ok('the walk ends when the BROWSER says the movement ended',
      /onTransitionEnd=/.test(code) && /e\.propertyName === 'transform'/.test(code)
        && !/setTimeout\(\s*\(\) => setWalking/.test(code),
      'a 900ms timer matched to a 900ms transition is two numbers that must stay equal forever, in two files');
    ok('...and only for this group, not something bubbling from a child',
      /e\.target === e\.currentTarget/.test(code));

    /**
     * Reduced motion has no transition, so `transitionend` never fires — a
     * walk started under it would run for ever. It is never started.
     */
    ok('reduced motion never starts a walk it could not stop',
      /if \(moved && !PREFERS_REDUCED_MOTION\) setWalking\(true\);/.test(code),
      'no transition means no transitionend means a figure walking on the spot for ever');

    /* ---- walking outranks the destination ---- */
    ok('a figure walking does not already hold the pose of where it is going',
      /stance=\{walking \? 'walk' : spot\.stance\}/.test(code)
        && /reachY=\{walking \? null : reachY\}/.test(code),
      'hands flat on a desk eight feet away is the floating-monitor fault in human form');

    /* ---- and it is still declarative ---- */
    ok('the walk is SMIL like every other stance, not a frame loop',
      !/requestAnimationFrame\s*\(|setInterval\s*\(/.test(avCode),
      'Phase 1s rule is untouched: nothing in the figure drives a frame from JavaScript');
  }

  /* ---- and the PANEL says which state they are in ---- */
  ok('the panel calls a default post what it is: roaming',
    /\{hqCrewPosts\[c\.id\] \? 'Posted at' : 'Roaming — tap a station to post them'\}/.test(code)
      && /const here = hqCrewPosts\[c\.id\] === i\.id;/.test(code),
    'it highlighted the DEFAULT post as though he had chosen it, while the engineer stood elsewhere');
  ok('...and the stand-down hint only appears when there is something to stand down',
    /\{hqCrewPosts\[c\.id\] && \(\s*<span className="text-\[11px\] text-ink-500">· tap again to let them roam<\/span>/.test(code),
    'the old hint offered to unpost a crew member who was not posted, and did nothing when pressed');

  /* ---- wandering must not SELECT things ---- */
  ok('wandering never lights a piece up or opens its panel',
    /active=\{atId === item\.id && !arranging\}/.test(code)
      && /const standId = atId \|\| /.test(code),
    'a room that popped a panel open each time he drifted past something would grab at his attention');
}

/* ===========================================================================
 * 13. THE ROOM MODEL — Phase 5 groundwork, Aug 30 2026.
 *
 * `docs/hq-room-model.md` is the written version; `src/lib/hqRooms.js` is the
 * executable one, and this section is what stops the two drifting apart.
 *
 * EVERYTHING HERE THAT IS ARITHMETIC IS IMPORTED AND RUN, never reimplemented.
 * The partition is checked by calling `partitionReport()`, which reads
 * `HQ_ITEMS` itself; the door clearance is checked by calling the room's own
 * `standingSpotFor` and `projectFloor`. A second copy of either would be the
 * suite marking its own homework — the fault that left the standing-spot maths
 * green while the room was broken, and the reason `standingSpotFor` was moved
 * into `hqCrew.js` in the first place.
 * ======================================================================== */
console.log('\n--- 13. the room model ---');
{
  const ROOMS = await import(REPO + '/src/lib/hqRooms.js');
  const { standingSpotFor } = await import(REPO + '/src/lib/hqCrew.js');
  const { WANDER_MIN_GAP_PX } = await import(REPO + '/src/lib/hqWander.js');
  const { projectFloor } = await import(REPO + '/src/lib/hqGeometry.js');

  const roomsSrc = fs.readFileSync(path.join(REPO, 'src/lib/hqRooms.js'), 'utf8');
  const roomsCode = roomsSrc
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/^\s*\/\/.*$/gm, '');

  /* ---- 12a. every piece is in exactly one room ---- */
  {
    const p = ROOMS.partitionReport();
    ok('every catalogue piece lives in exactly one room',
      p.missing.length === 0 && p.unknown.length === 0 && p.duplicated.length === 0,
      `missing [${p.missing}] unknown [${p.unknown}] duplicated [${p.duplicated}]`);
    ok('...and the partition is counted against the catalogue, not a copy of it',
      p.count === p.catalogCount && p.catalogCount === HQ_ITEMS.length,
      `${p.count} placed vs ${p.catalogCount} in the catalogue`);

    /**
     * The NULL rule. A piece nobody assigned must surface as a mistake — if
     * `roomOf` fell back to the hub, a twentieth catalogue item would appear on
     * the flight deck because nobody said where it went, and 12a above would
     * still pass.
     */
    ok('an unassigned piece resolves to null, not to the home room',
      ROOMS.roomOf('hq-nonesuch') === null,
      'defaulting an unknown piece into Mission Control would hide the bug this check exists for');
  }

  /* ---- 12b. presence: never empty, never nothing ---- */
  {
    ok('the hub is present even when he owns nothing at all',
      ROOMS.presentRooms({ owned: new Set() }).map((r) => r.id).join() === ROOMS.HOME_ROOM,
      'a boy with no furniture still has somewhere to stand');

    /**
     * THE TWO-PIECE CASE, which is the one the session prompt names.
     * Both directions: two pieces in one room is one room, two pieces in two
     * rooms is two rooms.
     */
    const one = ROOMS.presentRooms({ owned: new Set(['hq-desk', 'hq-lamp']) }).map((r) => r.id);
    const two = ROOMS.presentRooms({ owned: new Set(['hq-desk', 'hq-telescope']) }).map((r) => r.id);
    ok('two pieces in one room give exactly one room',
      one.length === 1 && one[0] === ROOMS.HOME_ROOM, one.join());
    ok('...and two pieces in two rooms give exactly two',
      two.length === 2 && two[0] === ROOMS.HOME_ROOM && two[1] === 'observatory', two.join());

    /**
     * THE EMPTY-ROOM INVARIANT, CHECKED FROM BOTH ENDS AND UNDER BOTH RULES.
     *
     * This is the Phase 3 discipline: the selector must refuse, and it must
     * refuse for the same reason whichever presence rule is switched on. The
     * year rule on its own would open a Workshop with nothing in it the day
     * Year 1 completed — a door to a bare floor, which is the dashed outline
     * one level up.
     *
     * Swept over every single-piece ownership set rather than a chosen few, so
     * this cannot pass by having picked the convenient examples.
     */
    const everyPiece = HQ_ITEMS.map((i) => i.id);
    const allMilestones = new Set(['year-1', 'year-2', 'year-2-spring']);
    const leaks = [];
    for (const rule of ['owned', 'year']) {
      for (const pieceId of everyPiece) {
        const owned = new Set([pieceId]);
        for (const room of ROOMS.presentRooms({ owned, rule, milestones: allMilestones })) {
          if (room.id === ROOMS.HOME_ROOM) continue;
          if (ROOMS.ownedPiecesIn(room.id, owned).length === 0) leaks.push(`${rule}/${pieceId}/${room.id}`);
        }
      }
    }
    ok('no presence rule ever lists a room he owns nothing in',
      leaks.length === 0, leaks.slice(0, 4).join(', '));

    ok('...and the year rule is still a real second condition, not dead code',
      ROOMS.presentRooms({ owned: new Set(['hq-lab']), rule: 'year', milestones: new Set() }).length === 1
        && ROOMS.presentRooms({ owned: new Set(['hq-lab']), rule: 'year', milestones: new Set(['year-1']) }).length === 2,
      'v1 section 6 pacing must stay switchable by one constant');
  }

  /* ---- 12c. two pieces never share a grid intersection inside one room ---- */
  {
    /**
     * `standsOn` is exempt and MUST be: the Mission Computer shares the desk's
     * base point because it stands on the desk. Without the exemption this
     * check fails on a correct room, which is worse than not having it.
     */
    const clashes = [];
    for (const room of ROOMS.HQ_ROOMS) {
      const seen = new Map();
      for (const id of room.pieces) {
        const L = floorSpots[id];
        if (!L || /standsOn:/.test(L.rest)) continue;
        const key = `${L.u.toFixed(4)},${L.v.toFixed(4)}`;
        if (seen.has(key)) clashes.push(`${room.id}: ${seen.get(key)} + ${id}`);
        else seen.set(key, id);
      }
    }
    ok('no two floor pieces in one room stand on the same grid intersection',
      clashes.length === 0, clashes.join('; '));
  }

  /* ---- 12d. the door is somewhere a person can actually arrive ---- */
  {
    /**
     * ---- WHY THE DOOR IS NOT ON THE BACK WALL (Aug 30, 2026) ----
     *
     * It was, at u 0.86. It cleared the window, it cleared every standing spot
     * in every room by 117px, and it passed every check in this section. Then
     * the room was rendered and looked at, and the door was standing behind the
     * right-hand shelf and the Satellite Model.
     *
     * The back wall carries the window AND two shelf fixtures. Take all three
     * out and what is left are four gaps of thirty-odd pixels — a 72-wide door
     * fits in none of them, and a door reaches the floor so it cannot simply be
     * hung above them.
     *
     * These two checks are the shape of that lesson: the door must be on a side
     * wall, and the back wall must still be the full thing that forced it
     * there. If somebody later removes a shelf, the second check fails and the
     * back wall is worth reconsidering — deliberately, rather than by somebody
     * finding the picture wrong again.
     */
    ok('the door is on a side wall, not the back one',
      ROOMS.DOOR_SIDE === 'left' || ROOMS.DOOR_SIDE === 'right',
      'the back wall is a window flanked by two shelves; nothing else fits on it');

    const win = /<rect x="(\d+)" y="\d+" width="(\d+)"[^>]*fill="url\(#hqWindow\)"/.exec(src);
    const shelves = [...src.matchAll(/\{ x: (\d+), w: (\d+) \}/g)].map((m) => [Number(m[1]), Number(m[2])]);
    ok('the back wall is still window-plus-two-shelves, which is why',
      Boolean(win) && shelves.length === 2,
      `window ${Boolean(win)}, ${shelves.length} shelves — if this changed, revisit the back wall`);

    /**
     * FORWARD OF THE ART. Side walls hang pieces at p 0.32 and p 0.64 and
     * nothing in front of them, in every room. Read from LAYOUT rather than
     * restated, so moving a poster moves this check with it.
     */
    const artClash = [];
    for (const room of ROOMS.HQ_ROOMS) {
      for (const w of sideSpots) {
        if (!room.pieces.includes(w.id)) continue;
        if (w.side !== ROOMS.DOOR_SIDE) continue;
        if (Math.abs(w.p - ROOMS.DOOR_P) < 0.16) artClash.push(`${room.id}: ${w.id} at p${w.p}`);
      }
    }
    ok('the door does not open through a picture',
      artClash.length === 0, artClash.join('; '));
    /**
     * The clash check above is vacuously true if nothing hangs on the wall the
     * door is on. So this asserts there is something there to have clashed
     * with — on the DOOR'S OWN SIDE, not merely somewhere in the room.
     */
    ok("...and there is art on the door's own wall for that to have been a real question",
      sideSpots.some((w) => w.side === ROOMS.DOOR_SIDE),
      `nothing hangs on the ${ROOMS.DOOR_SIDE} wall, so the check above proved nothing`);

    /**
     * THE CLEARANCE, RUN RATHER THAN RESTATED.
     *
     * Every standing spot the room can produce in each room — cadet on the near
     * side and a crew member on the far side of every piece, plus the muster
     * point in the hub — against the arrival spot in front of the door. This is
     * the check that caught the three-door design at 78px and the first
     * single-door position at 52px, before either was drawn.
     */
    const musterM = /const MUSTER_SPOT = \{ u: ([\d.]+), v: ([\d.]+)/.exec(src);
    ok('the muster point is still declared, so this suite is measuring against the real one',
      Boolean(musterM), 'a hard-coded copy here would be the second-copy fault again');

    const px = (s) => { const p = projectFloor(s.u, s.v); return [p.x, p.y]; };
    const tight = [];
    let worst = Infinity;
    for (const room of ROOMS.HQ_ROOMS) {
      const arrive = ROOMS.arrivalSpot(room.id);
      const here = px(arrive);
      const spots = [];
      for (const id of room.pieces) {
        const st = ST[id];
        if (!st) continue;
        for (const who of ['cadet', 'crew-probe']) {
          const s = standingSpotFor(who, st, baseOf(id), footOf(id));
          if (s && Number.isFinite(s.u) && Number.isFinite(s.v)) spots.push([`${id}:${who}`, px(s)]);
        }
      }
      if (room.id === ROOMS.HOME_ROOM && musterM) {
        spots.push(['muster', px({ u: Number(musterM[1]), v: Number(musterM[2]) })]);
      }
      for (const [label, p] of spots) {
        const d = Math.hypot(here[0] - p[0], here[1] - p[1]);
        if (d < worst) worst = d;
        if (d < WANDER_MIN_GAP_PX) tight.push(`${room.id} door vs ${label} = ${d.toFixed(1)}px`);
      }
    }
    ok(`nobody arrives through a door inside somebody else (worst ${worst.toFixed(0)}px of ${WANDER_MIN_GAP_PX})`,
      tight.length === 0, tight.slice(0, 3).join('; '));
    ok('...and that was measured against a real standing spot in every room',
      Number.isFinite(worst), 'no spots resolved, so the check above proved nothing');
  }

  /* ---- 12e. the refusals ---- */
  {
    ok('a crossing to a room that does not exist moves nobody',
      ROOMS.arrivalSpot('nope') === null && ROOMS.doorIn('nope') === null,
      'the failure mode must never be "here, have an arbitrary spot"');

    const owned = new Set(HQ_ITEMS.map((i) => i.id));
    const from = ROOMS.destinationsFrom('workshop', { owned });
    ok('the switcher never offers the room he is already standing in',
      from.every((r) => r.id !== 'workshop') && from.length === ROOMS.HQ_ROOMS.length - 1,
      from.map((r) => r.id).join());

    ok('an unposted crew member is somewhere, and it is the hub',
      ROOMS.roomOfCrew({ arrived: true, post: null }) === ROOMS.HOME_ROOM
        && ROOMS.roomOfCrew({ arrived: true, post: 'hq-lab' }) === 'workshop'
        && ROOMS.roomOfCrew({ arrived: false }) === null,
      'a crew member he earned who vanishes off the screen reads as a fault, and he would be right');
  }

  /* ---- 12f. the file stays runnable by a guard, and tier-free ---- */
  {
    ok('hqRooms.js is plain JavaScript a guard can execute',
      !/from 'react'/.test(roomsCode) && !/useAppStore|from '\.\.\/store/.test(roomsCode)
        && !/document\.|window\./.test(roomsCode),
      'the four lib files are plain on purpose; a fifth that needed a browser would be a rule broken quietly');

    /**
     * NO TIERS. Spec v2 section 11 has a level-2/level-3 table; its own
     * addendum, dated later, refuses tiers and the parent restated it. Read
     * from `roomsCode` rather than `roomsSrc` because the comment at the top of
     * the file explains the decision and therefore contains both words — the
     * exact wrong-occurrence trap that made the requestAnimationFrame ban fail
     * on the sentence forbidding it.
     */
    ok('no room or piece has a tier, a level or an upgrade',
      !/\b(tier|level|upgrade)s?\s*:/i.test(roomsCode),
      'the addendum refused the upgrade tree and the v3 prompt restated it');
  }
}

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) {
  console.log(`\n${failures.length} CHECK(S) FAILED`);
  process.exitCode = 1;
} else {
  console.log('\nALL CHECKS PASSED');
}
