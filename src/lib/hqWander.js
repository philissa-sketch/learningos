/**
 * =============================================================================
 * NOBODY STANDS STILL ALL DAY.
 * =============================================================================
 *
 * Phase 2, Aug 30, 2026. The parent: **"I will like it that the avatar and the
 * worker are moving around the hq unless placed in a specific spot by Lamar. So
 * periodically they will look through the microscope, look at pics, sit in a
 * chair, work at the work station etc."**
 *
 * Until now the room had two figures nailed to two coordinates. A boy who owns
 * nineteen things watched two statues stand in front of two of them. The room
 * had light, truth and idle motion, and still read as a diorama, because the
 * only things in it shaped like people were the only things not moving.
 *
 * ---- WHY THE RULES LIVE HERE AND THE RANDOMNESS DOES NOT ----
 *
 * Plain JavaScript, no React, nothing that needs a browser — the same reason
 * `hqGeometry.js`, `hqTruth.js` and `hqCrew.js` are plain: a guard has to be
 * able to run it.
 *
 * But roaming is random, and a guard cannot test `Math.random()`. So the ROLL
 * is a parameter. Every function here is pure: give it the same state, the same
 * clock and the same rolls and it returns the same answer, every time. The one
 * call to `Math.random()` in this feature lives in the component, at the edge,
 * where nothing depends on it being any particular value.
 *
 * That is what makes "two figures never stand in the same place" a testable
 * claim rather than a hope. It is asserted against every roll from 0 to 1.
 *
 * ---- AND WHY THERE IS NO FRAME LOOP ----
 *
 * Phase 1's rule stands: nothing in this room drives a frame from JavaScript.
 * Roaming does not need to. A figure's position is a CSS `transform` with a
 * 900ms transition already on it — the same transition that walks him to a
 * piece he taps. Moving someone is therefore ONE state change, and the browser
 * does the travelling on the compositor.
 *
 * So this is not animation. It is a decision, taken rarely — roughly twice a
 * minute per figure — and the floor on how rare is enforced by a guard, because
 * "make it a bit livelier" is a one-line edit that turns a background detail
 * into a battery drain on the laptop that is also running his schoolwork.
 * =============================================================================
 */

/**
 * HOW LONG SOMEBODY STAYS SOMEWHERE.
 *
 * Fourteen to thirty-four seconds, drawn per visit, so two figures never fall
 * into step. This is deliberately SLOW. The instinct when you build this is to
 * turn it up so you can see it working, and a room where people reposition
 * every three seconds is not alive, it is agitated — and it pulls the eye away
 * from whatever he is actually reading on screen.
 *
 * The range is wide on purpose: an eight-second spread between the shortest and
 * longest visit is what stops the room developing a rhythm you can feel.
 */
export const WANDER_DWELL_MS = { min: 14000, max: 34000 };

/**
 * The floor nothing may dwell below, asserted by the guard.
 *
 * This exists so that turning the room up is a decision somebody has to argue
 * with a failing test about, rather than a number quietly edited to 800 during
 * a debugging session and never put back.
 */
export const WANDER_MIN_DWELL_MS = 12000;

/**
 * How often the room ASKS whether anybody is due to move — not how often
 * anybody moves.
 *
 * Three seconds. Almost every tick is a no-op that returns the state object it
 * was given, unchanged and by reference, so React re-renders nothing. In the
 * worst case this costs twenty comparisons a minute; a `requestAnimationFrame`
 * loop costs three thousand six hundred.
 */
export const WANDER_TICK_MS = 3000;

/**
 * HOW CLOSE IS TOO CLOSE, IN SCREEN PIXELS.
 *
 * ---- WHY AN ID CHECK WAS NOT ENOUGH (Aug 30, 2026) ----
 *
 * The first version of this file refused to send two figures to the same
 * STATION, which sounded like the whole problem and was not. A rendered frame
 * caught the cadet and the Flight Engineer **2.3px apart** at two different
 * stations, and enumerating all 342 ordered pairs of stops afterwards found
 * thirteen more under 70px — the worst being the cadet at the Crew Console and
 * the engineer at the Engineering Workstation, **24px**, which is two people
 * standing inside each other.
 *
 * Of course it is. Nineteen pieces are arranged around the walls of one room;
 * neighbouring pieces have neighbouring standing spots, the cadet stands on the
 * near side of his and a crew member on the FAR side of theirs, and the `v`
 * clamp at 0.95 collapses several front-row stops onto the same line. Different
 * ids, same square foot of floor.
 *
 * **Identity is not proximity.** So the rule is now geometric, and the geometry
 * is injected (see `spotOf` below) rather than imported, because this file has
 * to stay runnable by a guard.
 */
export const WANDER_MIN_GAP_PX = 90;

/** A dwell length from a roll in [0, 1). */
export function dwellFor(roll) {
  const r = Math.min(1, Math.max(0, Number.isFinite(roll) ? roll : 0));
  return Math.round(WANDER_DWELL_MS.min + r * (WANDER_DWELL_MS.max - WANDER_DWELL_MS.min));
}

/**
 * WHERE SOMEBODY GOES NEXT.
 *
 * Three refusals, and each one is a rendered frame somebody would otherwise
 * have had to notice:
 *
 *   1. **Never where you already are.** Picking your own stop reads as a figure
 *      that has frozen — he simply dwells twice as long, and the room looks
 *      broken rather than calm.
 *   2. **Never where somebody else is.** Two figures on one chair is one figure
 *      with a shadow problem. This is the same rule the store enforces for
 *      posted crew, applied to the ones that are moving.
 *   3. **Never a piece he does not own.** A figure standing at a dashed outline
 *      is the room drawing something he has not earned — the exact rule Phase 3
 *      exists to hold shut, wearing a different hat.
 *   4. **Never close enough to overlap somebody.** Rule 2 compares ids; this
 *      compares floor positions, and the rendered frame proved that the two are
 *      not the same question. `isClear` is supplied by the caller because the
 *      geometry lives one layer up.
 *
 * `stops` is already the owned set; rule 3 is the caller's job to satisfy and
 * the guard checks the caller does. Returns null when there is nowhere legal to
 * go, and null means STAY PUT — never a fallback to somewhere arbitrary.
 */
export function nextStop(current, stops = [], taken = [], roll = 0, isClear = () => true) {
  const blocked = new Set(taken);
  const open = stops.filter((id) => id !== current && !blocked.has(id) && isClear(id));
  if (!open.length) return null;
  const r = Math.min(0.999999, Math.max(0, Number.isFinite(roll) ? roll : 0));
  return open[Math.floor(r * open.length)];
}

/**
 * ONE TICK OF THE ROOM.
 *
 * `state` is `{ [figureId]: { at, until } }`. `figures` is
 * `[{ id, pinned, at }]` — `pinned` meaning Lamar put them somewhere, `at`
 * being where a pinned figure is standing so the roamers can avoid it.
 *
 * Returns `{ state, changed }`. **When nothing is due, the state that came in
 * is returned by reference**, so the component can bail out before calling
 * `setState` and the room re-renders exactly as often as somebody actually
 * moves. A tick that returned a fresh object every time would re-render a
 * 2,400-line tree twenty times a minute to say "nothing happened".
 *
 * A pinned figure is DROPPED from the state rather than frozen in it: posting
 * somebody has to mean they are not roaming, not that they are roaming to one
 * place. When he unposts them, they get a fresh dwell and rejoin the room.
 */
export function wanderTick({
  state = {}, figures = [], stops = [], now = 0, rolls = {}, spotOf = null
} = {}) {
  const roamers = figures.filter((f) => !f.pinned);

  // Everywhere somebody is standing that a roamer must not walk into: the
  // pinned figures' posts, plus every roamer's own current stop.
  const held = new Map();
  for (const f of figures) {
    if (f.pinned) { if (f.at) held.set(f.id, f.at); }
    else if (state[f.id]?.at) held.set(f.id, state[f.id].at);
  }

  let next = state;
  let changed = false;
  const write = (id, value) => {
    if (!changed) { next = { ...state }; changed = true; }
    next[id] = value;
  };

  // Anybody Lamar has posted since the last tick stops roaming immediately.
  for (const f of figures) {
    if (f.pinned && state[f.id]) {
      if (!changed) { next = { ...state }; changed = true; }
      delete next[f.id];
      held.delete(f.id);
    }
  }

  for (const f of roamers) {
    const cur = next[f.id];

    // New arrival: give them a dwell where they stand rather than moving them
    // the instant the room opens. He should see his room before it rearranges
    // itself in front of him.
    if (!cur) {
      write(f.id, { at: f.at ?? null, until: now + dwellFor(rolls[f.id]?.dwell ?? 0.5) });
      continue;
    }
    if (cur.until > now) continue;

    const others = [...held.entries()].filter(([id]) => id !== f.id);
    const taken = others.map(([, at]) => at);

    /**
     * Rule 4, with the geometry the caller injected. Without a `spotOf` this
     * falls through to `true` and the id rule stands alone — which is what
     * every test that does not care about pixels wants, and is also exactly
     * the behaviour that shipped the 24px overlap, so the guard checks that
     * the ROOM passes one.
     */
    const isClear = (candidate) => {
      if (typeof spotOf !== 'function') return true;
      const p = spotOf(f.id, candidate);
      if (!p) return true;
      for (const [otherId, otherAt] of others) {
        const q = otherAt ? spotOf(otherId, otherAt) : null;
        if (!q) continue;
        if (Math.hypot(p[0] - q[0], p[1] - q[1]) < WANDER_MIN_GAP_PX) return false;
      }
      return true;
    };

    const to = nextStop(cur.at, stops, taken, rolls[f.id]?.stop ?? 0, isClear);

    // Nowhere legal to go — stay, and ask again after another dwell rather
    // than re-rolling every tick.
    write(f.id, { at: to ?? cur.at, until: now + dwellFor(rolls[f.id]?.dwell ?? 0.5) });
    if (to) held.set(f.id, to);
  }

  return { state: next, changed };
}

/** A roll pair for one figure. The only randomness in the feature. */
export function rollFor() {
  return { stop: Math.random(), dwell: Math.random() };
}
