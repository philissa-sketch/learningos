// ---------------------------------------------------------------------------
// MUTATION TEST FOR THE PHASE 2 GUARD — "nobody stands still all day".
// Run: node scripts/mutate-hq-wander.mjs
//
// ---- WHY ----
//
// Every one of the twenty checks this phase added passed the first time they
// were run, which in this repo is the moment to be suspicious rather than
// pleased. The "wrong occurrence" trap has been hit six times here: a check
// satisfied by the boy's shadow instead of the furniture's, by a comment
// instead of code, by the robot answering for the walk.
//
// Roaming is also the first thing in this room that changes state on its own,
// and all four of its failure modes are quiet:
//
//   * a pin that does not hold — he posts the engineer, comes back, and the
//     engineer has wandered off, which reads as the app ignoring him;
//   * two figures in one chair, which is one figure with a doubled shadow;
//   * somebody standing at a piece he has not bought;
//   * the dwell turned down to 800ms during a debugging session and never put
//     back, which is a battery drain nothing on screen mentions.
//
// So each is broken here on purpose, and the suite has to go red on that
// specific check. Nothing touches the real files: everything is a temp copy.
// ---------------------------------------------------------------------------
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const HQ = 'src/components/Rewards/HQRoom.jsx';
const LIB = 'src/lib/hqWander.js';
const CREW = 'src/lib/hqCrew.js';
const AV = 'src/components/Rewards/CadetAvatar.jsx';

const MUTATIONS = [
  /* ---- where somebody goes next ---- */
  { name: 'a figure can pick the stop it is already standing at', file: LIB,
    from: '  const open = stops.filter((id) => id !== current && !blocked.has(id) && isClear(id));',
    to: '  const open = stops.filter((id) => !blocked.has(id) && isClear(id));',
    expect: 'the stop they are already standing at' },

  { name: 'somebody else standing there stops mattering', file: LIB,
    from: '  const blocked = new Set(taken);',
    to: '  const blocked = new Set();',
    expect: 'nor one somebody else is standing at' },

  { name: 'nowhere to go falls back to somewhere arbitrary', file: LIB,
    from: '  if (!open.length) return null;',
    to: '  if (!open.length) return stops[0] ?? null;',
    expect: 'STAY, never somewhere arbitrary' },

  /* ---- roaming reaches only what he owns ---- */
  { name: 'a roamer can walk to a piece he has not bought', file: HQ,
    from: '    () => HQ_ITEMS.filter((i) => owned.has(i.id) && STATIONS[i.id]).map((i) => i.id),',
    to: '    () => HQ_ITEMS.filter((i) => STATIONS[i.id]).map((i) => i.id),',
    expect: 'only reach pieces he owns' },

  /* ---- a pin holds ---- */
  { name: 'posting somebody no longer stops them roaming', file: LIB,
    from: '    if (f.pinned && state[f.id]) {',
    to: '    if (false && state[f.id]) {',
    expect: 'stops them roaming, immediately' },

  { name: 'the cadet roams even while he is standing where he was told', file: HQ,
    from: "    { id: 'cadet', pinned: Boolean(atId), at: atId || null },",
    to: "    { id: 'cadet', pinned: false, at: atId || null },",
    expect: 'pinned by the tap he already has' },

  { name: 'a posted crew member is treated as unposted', file: HQ,
    from: '      pinned: Boolean(hqCrewPosts[c.id]),',
    to: '      pinned: false,',
    expect: 'by the post he already gave them' },

  { name: 'a pinned crew member drifts back to where they had roamed', file: HQ,
    from: '    const postId = pinned ? c.post : (wander[c.id]?.at || c.post);',
    to: '    const postId = wander[c.id]?.at || c.post;',
    expect: 'ignores wherever they had roamed to' },

  /* ---- two people, one chair ---- */
  { name: 'the tick stops tracking who is standing where', file: LIB,
    from: '    const others = [...held.entries()].filter(([id]) => id !== f.id);',
    to: '    const others = [];',
    expect: 'never end up in the same place' },

  /* ---- identity is not proximity ----
   *
   * The first three of these each restore a version of the bug a rendered
   * frame caught: two figures 2.3px apart at two different stations, because
   * the rule compared ids and the room is drawn in pixels.
   */
  { name: 'the proximity rule is dropped and only ids are compared', file: LIB,
    from: '  const open = stops.filter((id) => id !== current && !blocked.has(id) && isClear(id));',
    to: '  const open = stops.filter((id) => id !== current && !blocked.has(id));',
    expect: 'never walks into one of them' },

  { name: 'the tick stops passing the geometry down', file: LIB,
    from: '    const to = nextStop(cur.at, stops, taken, rolls[f.id]?.stop ?? 0, isClear);',
    to: '    const to = nextStop(cur.at, stops, taken, rolls[f.id]?.stop ?? 0);',
    expect: 'never walks into one of them' },

  { name: 'the minimum gap shrinks to nothing', file: LIB,
    from: 'export const WANDER_MIN_GAP_PX = 90;',
    to: 'export const WANDER_MIN_GAP_PX = 4;',
    // A gap of 4px makes NO pair too close, so the overlap simulation has
    // nothing left to catch — what notices is the check asserting the room
    // genuinely has pairs that would overlap. A minimum that excludes nothing
    // is not a minimum.
    expect: 'stop pairs that would overlap' },

  { name: 'the room stops handing the tick a resolver', file: HQ,
    from: '        const r = wanderTick({ state: cur, figures, stops, now, rolls, spotOf: standingAt });',
    to: '        const r = wanderTick({ state: cur, figures, stops, now, rolls });',
    expect: 'real geometry, not just ids' },

  // Breaks the SHARED resolver. The first version of this suite mutated a copy
  // of it inside the room and the check stayed green, because the guard was
  // marking its own homework against a second copy. There is one now.
  { name: 'a crew member is measured as though he stood where the cadet does', file: CREW,
    from: '  if (!isCadet) return crewSpotFor(station, base, foot);',
    to: '  if (!isCadet) return { u: base.u + station.du, v: base.v + station.dv };',
    expect: 'where crew ACTUALLY stand' },

  /* ---- the quiet tick ---- */
  { name: 'every tick allocates a new state object', file: LIB,
    from: '  let next = state;\n  let changed = false;',
    to: '  let next = { ...state };\n  let changed = false;',
    expect: 'the same object, by reference' },

  /* ---- the dwell floor ---- */
  { name: 'the dwell is turned down during a debugging session', file: LIB,
    from: 'export const WANDER_DWELL_MS = { min: 14000, max: 34000 };',
    to: 'export const WANDER_DWELL_MS = { min: 800, max: 34000 };',
    expect: 'more often than the floor allows' },

  { name: 'the dwell range collapses so everybody moves in step', file: LIB,
    from: 'export const WANDER_DWELL_MS = { min: 14000, max: 34000 };',
    to: 'export const WANDER_DWELL_MS = { min: 14000, max: 15000 };',
    expect: 'a RANGE, so two figures never fall into step' },

  /* ---- still not a frame loop ---- */
  // The realest of these: somebody "simplifies" the self-rescheduling timeout
  // into the interval it superficially resembles.
  { name: 'the self-rescheduling timeout is simplified into an interval', file: HQ,
    from: '      timer = setTimeout(tick, WANDER_TICK_MS);\n    };',
    to: '      timer = setInterval(tick, WANDER_TICK_MS);\n    };',
    expect: 'a slow decision, not an animation' },

  { name: 'the timer outlives the room', file: HQ,
    from: '    return () => clearTimeout(timer);',
    to: '    return undefined;',
    expect: 'torn down when the room closes' },

  /* ---- reduced motion ---- */
  { name: 'roaming ignores the reduced-motion setting', file: HQ,
    from: '    if (PREFERS_REDUCED_MOTION || arranging) return undefined;',
    to: '    if (arranging) return undefined;',
    expect: 'stops roaming dead' },

  /* ---- wandering must not SELECT ---- */
  { name: 'drifting past a piece lights it up and opens its panel', file: HQ,
    from: '      active={atId === item.id && !arranging}',
    to: '      active={standId === item.id && !arranging}',
    expect: 'never lights a piece up' },

  /* ---- the panel tells the truth about pinning ---- */
  { name: 'the panel shows a default post as though Lamar had chosen it', file: HQ,
    from: '                    const here = hqCrewPosts[c.id] === i.id;',
    to: '                    const here = c.post === i.id;',
    expect: 'calls a default post what it is' },

  { name: 'the stand-down hint comes back for crew who are not posted', file: HQ,
    from: '                  {hqCrewPosts[c.id] && (\n                    <span className="text-[11px] text-ink-500">· tap again to let them roam</span>',
    to: '                  {c.post && (\n                    <span className="text-[11px] text-ink-500">· tap again to let them roam</span>',
    expect: 'only appears when there is something to stand down' },

  /* ---- the walk cycle ---- */
  { name: 'the figure goes back to gliding with its legs locked', file: AV,
    from: '      legL: { type:', to: '      legXX: { type:',
    expect: 'walks rather than glides' },

  { name: 'the legs lose their own groups and the boots stay behind', file: AV,
    from: '          <g>\n            <Motion spec={motion?.legL} on={moving} />',
    to: '          <g>\n            <Motion spec={undefined} on={moving} />',
    expect: 'the boot travels with the thigh' },

  // Both feet leave the floor on the same frame. That is a hop, and it is the
  // shape of bug a green pivot check happily ignored.
  { name: 'both legs lift together', file: AV,
    from: "      legR: { type: 'translate', values: '0 -7; 0 0; 0 -7', dur: '0.68s' },",
    to: "      legR: { type: 'translate', values: '0 0; 0 -7; 0 0', dur: '0.68s' },",
    expect: 'never off the ground together' },

  { name: 'the step becomes a high knee', file: AV,
    from: "      legL: { type: 'translate', values: '0 0; 0 -7; 0 0', dur: '0.68s' },",
    to: "      legL: { type: 'translate', values: '0 0; 0 -26; 0 0', dur: '0.68s' },",
    expect: 'not a high knee' },

  { name: 'both arms swing the same way, like a marching toy', file: AV,
    from: "      left: { type: 'rotate', values: '9 -30 -66; -9 -30 -66; 9 -30 -66', dur: '0.68s' },",
    to: "      left: { type: 'rotate', values: '-9 -30 -66; 9 -30 -66; -9 -30 -66', dur: '0.68s' },",
    expect: 'arms swing against each other' },

  // The bug the rendered frame caught: a side-on walk cycle on a front-on
  // figure, which splays the legs into a V instead of stepping.
  { name: 'the legs go back to scissoring in the picture plane', file: AV,
    from: "      legL: { type: 'translate', values: '0 0; 0 -7; 0 0', dur: '0.68s' },",
    to: "      legL: { type: 'rotate', values: '-17 -12.5 -4; 17 -12.5 -4; -17 -12.5 -4', dur: '0.68s' },",
    expect: 'walks rather than glides' },

  { name: 'a hand-matched timer replaces the browser event', file: HQ,
    from: '        if (e.target === e.currentTarget && e.propertyName === \'transform\') setWalking(false);',
    to: '        void e; setTimeout(() => setWalking(false), 900);',
    expect: 'the BROWSER says the movement ended' },

  { name: 'reduced motion starts a walk that can never stop', file: HQ,
    from: '    if (moved && !PREFERS_REDUCED_MOTION) setWalking(true);',
    to: '    if (moved) setWalking(true);',
    expect: 'never starts a walk it could not stop' },

  { name: 'a walking figure already holds the pose of where it is going', file: HQ,
    from: "          stance={walking ? 'walk' : spot.stance}",
    to: '          stance={spot.stance}',
    expect: 'does not already hold the pose' },

  { name: 'a walking figure reaches for a desk it has not got to yet', file: HQ,
    from: '          reachY={walking ? null : reachY}',
    to: '          reachY={reachY}',
    expect: 'does not already hold the pose' },

  /* ---- read-only ---- */
  { name: 'the roaming rules reach for the store', file: LIB,
    from: 'export function rollFor() {',
    to: 'export const _save = (v) => saveMeta({ wander: v });\nexport function rollFor() {',
    expect: 'nothing in them writes' }
];

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'hq-wander-'));
fs.cpSync(path.join(REPO, 'src'), path.join(tmp, 'src'), { recursive: true });
fs.mkdirSync(path.join(tmp, 'scripts'));
fs.cpSync(path.join(REPO, 'scripts/verify-hq-room.mjs'), path.join(tmp, 'scripts/verify-hq-room.mjs'));

const FILES = [HQ, LIB, CREW, AV];
const pristine = Object.fromEntries(FILES.map((f) => [f, fs.readFileSync(path.join(tmp, f), 'utf8')]));

function runSuite() {
  try {
    execFileSync('node', [path.join(tmp, 'scripts/verify-hq-room.mjs')], { encoding: 'utf8' });
    return { failed: false, out: '' };
  } catch (e) {
    return { failed: true, out: (e.stdout || '') + (e.stderr || '') };
  }
}

const base = runSuite();
if (base.failed) {
  console.log('The suite does not pass on an UNMUTATED copy. Nothing below means anything.');
  console.log(base.out.split('\n').filter((l) => l.startsWith('FAIL')).join('\n'));
  process.exit(1);
}
console.log('baseline: suite passes on an unmutated copy\n');

let survived = 0;
for (const m of MUTATIONS) {
  const src = pristine[m.file];
  if (!src.includes(m.from)) {
    console.log(`SKIP  ${m.name}  — the text this mutation edits is not in the file any more`);
    survived += 1;
    continue;
  }
  fs.writeFileSync(path.join(tmp, m.file), src.replace(m.from, m.to));
  const r = runSuite();
  fs.writeFileSync(path.join(tmp, m.file), src);

  const killedBy = r.out.split('\n').filter((l) => l.startsWith('FAIL') && l.includes(m.expect));
  if (r.failed && killedBy.length) {
    console.log(`KILLED  ${m.name}`);
  } else if (r.failed) {
    console.log(`WRONG   ${m.name}  — suite failed, but not on "${m.expect}"`);
    console.log('        ' + r.out.split('\n').filter((l) => l.startsWith('FAIL')).join('\n        '));
    survived += 1;
  } else {
    console.log(`SURVIVED  ${m.name}  — nothing noticed. The check for "${m.expect}" does not check.`);
    survived += 1;
  }
}

fs.rmSync(tmp, { recursive: true, force: true });

console.log(`\n${MUTATIONS.length - survived}/${MUTATIONS.length} mutations killed`);
if (survived) {
  console.log(`\n${survived} MUTATION(S) SURVIVED`);
  process.exitCode = 1;
} else {
  console.log('\nEVERY ROAMING RULE IS LOAD-BEARING');
}
