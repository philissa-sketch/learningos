// ---------------------------------------------------------------------------
// MUTATION TEST FOR THE PHASE 0 LIGHTING GUARD.
// Run: node scripts/mutate-hq-lighting.mjs
//
// ---- WHY THIS EXISTS ----
//
// A check that has never failed has never been tested. This repo has shipped a
// comment claiming "a test asserts the two lists match" when no such test
// existed, and shipped a check that the Mission Computer shared the desk's
// floor spot while the monitor floated 26 units below the desk's surface. Green
// is not evidence. Green that goes red when you break the thing is evidence.
//
// So: for each invariant added to verify-hq-room.mjs in Phase 0, break exactly
// that one thing in a throwaway copy of the tree and require the suite to fail
// with the named check. If a mutation leaves the suite green, the check does
// not check anything and this script says so.
//
// Nothing here touches the real files: everything happens under a temp copy.
// ---------------------------------------------------------------------------
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const HQ = 'src/components/Rewards/HQRoom.jsx';
const GEO = 'src/lib/hqGeometry.js';

/**
 * Each mutation is ONE edit that should kill exactly ONE check. `expect` is a
 * distinctive fragment of that check's label — matched against the FAIL lines,
 * so a mutation that fails the suite for some unrelated reason does not count
 * as a kill.
 */
const MUTATIONS = [
  { name: 'the desk forgets its footprint', file: HQ,
    from: "'hq-desk': { u: 0.4167, v: 0.125, foot: 96 }",
    to: "'hq-desk': { u: 0.4167, v: 0.125 }",
    expect: 'knows how wide it is' },

  { name: 'the rug stops declaring that it lies flat', file: HQ,
    from: "layer: 'floor', flat: true", to: "layer: 'floor'",
    expect: 'the two that genuinely do not' },

  { name: 'nothing draws the contact shadow', file: HQ,
    from: 'fill="url(#hqContact)"\n          stroke="none"', to: 'fill="none"\n          stroke="none"',
    expect: 'shadow is drawn under every owned piece' },

  { name: 'an unowned outline gets a shadow too', file: HQ,
    from: '{owned && !spot.flat && !spot.standsOn && Number.isFinite(spot.foot) && (',
    to: '{!spot.flat && !spot.standsOn && Number.isFinite(spot.foot) && (',
    expect: 'never under one he does not own' },

  { name: 'the boy goes back to a hard flat disc', file: HQ,
    from: '<ellipse cx="0" cy="2" rx="42" ry={(42 * CONTACT_RATIO).toFixed(1)} fill="url(#hqContact)" />',
    to: '<ellipse cx="0" cy="2" rx="42" ry="10" fill="rgba(0,0,0,.35)" />',
    expect: 'same kind of shadow' },

  { name: 'the component types the shadow constant in by hand', file: HQ,
    from: 'rx={spot.foot * CONTACT_RX}', to: 'rx={spot.foot * 1.06}',
    expect: 'second copy' },

  { name: 'the shadow stands up instead of lying on the floor', file: GEO,
    from: 'export const CONTACT_RATIO = 0.24;', to: 'export const CONTACT_RATIO = 0.95;',
    expect: 'ellipse lying on the floor' },

  { name: 'the shadow stops shrinking with distance', file: GEO,
    from: 'const rx = foot * CONTACT_RX * depth(y);', to: 'const rx = foot * CONTACT_RX;',
    expect: 'smaller than the same one at the front' },

  // The one that matters most: the bug this whole phase actually hit.
  { name: 'the floor goes back to near-black under the shadows', file: HQ,
    from: '<stop offset="100%" stopColor="#172a3c" />', to: '<stop offset="100%" stopColor="#0b1622" />',
    expect: 'light enough for a shadow' },

  { name: 'the light layer tints instead of lighting', file: HQ,
    from: "style={{ mixBlendMode: 'screen' }} pointerEvents=\"none\"", to: 'pointerEvents="none"',
    expect: 'adds light rather than paint' },

  { name: 'the light layer starts swallowing taps', file: HQ,
    from: "style={{ mixBlendMode: 'screen' }} pointerEvents=\"none\"", to: "style={{ mixBlendMode: 'screen' }}",
    expect: 'swallow a tap' },

  { name: 'the vignette starts swallowing taps', file: HQ,
    from: 'fill="url(#hqVignette)" pointerEvents="none"', to: 'fill="url(#hqVignette)"',
    expect: 'swallow a tap' },

  { name: 'the warm half of the light goes away', file: HQ,
    from: '<ellipse cx={lamp.x} cy={lamp.y} rx={lamp.r} ry={lamp.r * 0.82} fill="url(#hqLamp)" />',
    to: '<ellipse cx={lamp.x} cy={lamp.y} rx={lamp.r} ry={lamp.r * 0.82} fill="none" />',
    expect: 'two temperatures' },

  { name: 'the lamp is turned up past its cap', file: GEO,
    from: "lamp: { hot: '#ffc266', edge: '#ff8c1a', max: 0.55 }",
    to: "lamp: { hot: '#ffc266', edge: '#ff8c1a', max: 0.9 }",
    expect: 'warm light stays under its cap' },

  { name: 'the screens are turned up past their cap', file: GEO,
    from: "screen: { hot: '#7ee6ff', edge: '#22d3ee', max: 0.42 }",
    to: "screen: { hot: '#7ee6ff', edge: '#22d3ee', max: 0.7 }",
    expect: 'cool light stays under its cap' },

  { name: 'the vignette starts eating the corners', file: GEO,
    from: 'vignette: 0.34,', to: 'vignette: 0.72,',
    expect: 'frames the picture' },

  { name: 'the warm light is nailed to one spot again', file: HQ,
    from: '<ellipse cx={lamp.x} cy={lamp.y} rx={lamp.r} ry={lamp.r * 0.82} fill="url(#hqLamp)" />',
    to: '<ellipse cx="420" cy="640" rx={lamp.r} ry={lamp.r * 0.82} fill="url(#hqLamp)" />',
    expect: 'wherever the lamp is actually standing' },

  { name: 'a lamp he has not bought lights the room', file: HQ,
    from: "const lampSpot = owned.has('hq-lamp')", to: 'const lampSpot = true',
    expect: 'unowned lamp lights nothing' },

  { name: "the lamp's pool stops shrinking with distance", file: GEO,
    from: 'return { x: p.x, y: p.y + LAMP_GLOW.dy * k, r: LAMP_GLOW.r * k };',
    to: 'return { x: p.x, y: p.y + LAMP_GLOW.dy * k, r: LAMP_GLOW.r };',
    expect: 'pool shrinks with distance' },

  { name: 'the back wall stops receding', file: HQ,
    from: '<filter id="hqFar"', to: '<filter id="hqFarUnused"',
    expect: 'hazed and softened' },

  { name: 'the floor rows go back to one width at every depth', file: HQ,
    from: 'strokeWidth={(2.6 * k).toFixed(2)}', to: 'strokeWidth="2"',
    expect: 'more weight nearer the viewer' },

  { name: 'materials leak onto pieces he does not own', file: HQ,
    from: "const mat = (s, id, unowned = 'none') => (s.solid ? `url(#${id})` : unowned);",
    to: 'const mat = (s, id) => `url(#${id})`;',
    expect: 'one gate' },

  { name: 'the room forgets what metal looks like', file: HQ,
    from: '<linearGradient id="mMetal" x1="0" y1="0" x2="0" y2="1">',
    to: '<linearGradient id="mMetalGone" x1="0" y1="0" x2="0" y2="1">',
    expect: 'what metal looks like' },

  { name: 'the telescope grows its filled wedge back', file: HQ,
    from: '<g fill="none" strokeLinecap="round">\n        <path d="M-30 -6 L0 -74 L30 -6" />',
    to: '<g strokeLinecap="round">\n        <path d="M-30 -6 L0 -74 L30 -6" />',
    expect: 'filled triangle' },

  { name: 'the walk stops asking about reduced motion', file: HQ,
    from: "transition: PREFERS_REDUCED_MOTION ? undefined : 'transform 900ms cubic-bezier(.4,0,.2,1)'",
    to: "transition: 'transform 900ms cubic-bezier(.4,0,.2,1)'",
    expect: 'asks permission before it moves him' },

  /**
   * Phase 0's original check here was "nothing in this file animates at all",
   * and Phase 1 retired it on purpose by adding twelve idle loops. What replaced
   * it is the rule that still holds: motion is allowed, but not the kind that
   * costs a frame budget. This mutation follows the check to its successor
   * rather than being deleted along with it.
   */
  { name: 'the room starts driving frames from JavaScript again', file: HQ,
    from: '  const [atId, setAtId] = useState(null);',
    to: '  const [atId, setAtId] = useState(null);\n  requestAnimationFrame(() => {});',
    expect: 'costs a frame budget' },

  { name: 'the geometry stops exporting the arithmetic', file: GEO,
    from: 'export function contactShadow(foot, y) {', to: 'function contactShadow(foot, y) {',
    expect: 'arithmetic the guard can run' }
];

/* ---- a throwaway copy of everything the suite reads ---- */
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'hq-mutate-'));
fs.cpSync(path.join(REPO, 'src'), path.join(tmp, 'src'), { recursive: true });
fs.mkdirSync(path.join(tmp, 'scripts'));
fs.cpSync(path.join(REPO, 'scripts/verify-hq-room.mjs'), path.join(tmp, 'scripts/verify-hq-room.mjs'));

const pristine = Object.fromEntries(
  [HQ, GEO].map((f) => [f, fs.readFileSync(path.join(tmp, f), 'utf8')])
);

function runSuite() {
  try {
    execFileSync('node', [path.join(tmp, 'scripts/verify-hq-room.mjs')], { encoding: 'utf8' });
    return { failed: false, out: '' };
  } catch (e) {
    return { failed: true, out: (e.stdout || '') + (e.stderr || '') };
  }
}

/* The baseline has to be green, or every "kill" below is meaningless. */
const base = runSuite();
if (base.failed) {
  console.log('The suite does not pass on an UNMUTATED copy. Nothing below means anything.');
  console.log(base.out.split('\n').filter((l) => l.startsWith('FAIL')).join('\n'));
  process.exit(1);
}
console.log('baseline: suite passes on an unmutated copy\n');

let survived = 0;
for (const m of MUTATIONS) {
  const file = path.join(tmp, m.file);
  const src = pristine[m.file];
  if (!src.includes(m.from)) {
    console.log(`SKIP  ${m.name}  — the text this mutation edits is not in the file any more`);
    survived += 1;
    continue;
  }
  fs.writeFileSync(file, src.replace(m.from, m.to));
  const r = runSuite();
  fs.writeFileSync(file, src);

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
  console.log('\nEVERY NEW CHECK IS LOAD-BEARING');
}
