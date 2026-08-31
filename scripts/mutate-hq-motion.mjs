// ---------------------------------------------------------------------------
// MUTATION TEST FOR THE PHASE 1 GUARD — "the room breathes".
// Run: node scripts/mutate-hq-motion.mjs
//
// ---- WHY ----
//
// Motion is the one thing in this project that a guard cannot see. No suite here
// renders a component, so nothing can assert that a fish actually swims. What a
// guard CAN hold shut is the set of rules that make twelve loops affordable and
// safe, and those rules are all quiet failures:
//
//   * an animation added without a reduced-motion opt-out breaks the setting for
//     the one person who needed it, and nobody else ever notices;
//   * two loops on the same period drift into step over minutes, so the room
//     looks fine when you check it and wrong when he sits with it;
//   * a requestAnimationFrame slipped in costs a frame budget on the laptop that
//     is also running his schoolwork, and looks identical in a screenshot.
//
// None of those show up in a picture. So each rule is broken here on purpose and
// the suite has to go red on that specific check.
//
// Nothing touches the real files: everything happens in a temp copy.
// ---------------------------------------------------------------------------
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const HQ = 'src/components/Rewards/HQRoom.jsx';

const MUTATIONS = [
  /* ---- reduced motion ---- */
  { name: 'the reduced-motion block is removed entirely',
    from: '@media (prefers-reduced-motion: reduce) {',
    to: '@media (min-width: 0px) and (max-width: 0px) {',
    expect: 'every loop stops when the machine asks' },

  { name: 'one loop forgets to opt out of reduced motion',
    from: '.hq-scan, .hq-trace, .hq-flicker, .hq-mote, .hq-sky, .hq-turn {',
    to: '.hq-scan, .hq-trace, .hq-flicker, .hq-sky, .hq-turn {',
    expect: 'every loop stops when the machine asks' },

  { name: 'the chart line stays hidden when motion is switched off',
    from: '  .hq-trace { stroke-dashoffset: 0 !important; }',
    to: '',
    expect: 'hides its own subject resets when stopped' },

  { name: "the robot's head ignores the reduced-motion setting",
    from: "transition: PREFERS_REDUCED_MOTION ? undefined : 'transform 700ms cubic-bezier(.4,0,.2,1)'",
    to: "transition: 'transform 700ms cubic-bezier(.4,0,.2,1)'",
    expect: 'so does the robot turning its head' },

  /* ---- the performance rule ---- */
  { name: 'a frame loop creeps back in',
    from: '  const [atId, setAtId] = useState(null);',
    to: '  const [atId, setAtId] = useState(null);\n  requestAnimationFrame(() => {});',
    expect: 'nothing drives a frame from JavaScript' },

  { name: 'an interval starts re-rendering the room',
    from: '  const [atId, setAtId] = useState(null);',
    to: '  const [atId, setAtId] = useState(null);\n  setInterval(() => {}, 16);',
    expect: 'nothing drives a frame from JavaScript' },

  { name: 'a loop starts animating a layout property',
    from: '@keyframes hqBreathe {\n  0%, 100% { opacity: .35; }',
    to: '@keyframes hqBreathe {\n  0%, 100% { opacity: .35; width: 4px; }',
    expect: 'cheap to move' },

  /* ---- periods ---- */
  { name: 'the status light slows to the scanline\'s period',
    from: '.hq-breathe { animation: hqBreathe 3s ease-in-out infinite; }',
    to: '.hq-breathe { animation: hqBreathe 12s ease-in-out infinite; }',
    expect: 'the 3s loop is on the period' },

  { name: 'the desk plant loses its own period',
    from: "className={anim(s, 'hq-sway')} style={s.solid ? { '--dur': '8s' } : undefined}",
    to: "className={anim(s, 'hq-sway')}",
    expect: 'the 8s loop is on the period' },

  { name: 'the loops collapse onto a handful of clocks',
    from: '.hq-flicker { animation: hqFlicker 23s linear infinite; }',
    to: '.hq-flicker { animation: hqFlicker 12s linear infinite; }',
    expect: 'the 23s loop is on the period' },

  { name: 'the fish all swim on one clock',
    from: "style={{ '--dur': `${9 + i}s`, animationDelay: `${-2.3 * i}s` }}",
    to: "style={{ '--dur': '12s' }}",
    expect: 'fish are staggered against each other' },

  { name: 'the grow box shoots nod in unison',
    from: "style={s.solid ? { '--dur': '7s', animationDelay: `${-1.6 * i}s` } : undefined}",
    to: "style={s.solid ? { '--dur': '7s' } : undefined}",
    expect: 'sway out of phase' },

  /* ---- the stylesheet itself ---- */
  { name: 'the stylesheet is never mounted',
    from: '<style>{HQ_MOTION}</style>',
    to: '{null}',
    expect: 'live in one stylesheet' },

  /* ---- nothing animated carries meaning ---- */
  { name: 'the chart line slides instead of tracing',
    from: "className={anim(s, 'hq-trace')}",
    to: "className={anim(s, 'hq-scan')}",
    expect: 'traces itself rather than sliding' },

  { name: 'a piece he has not bought starts moving',
    from: "<g className={anim(s, 'hq-sway')} style={s.solid ? { '--dur': '8s' } : undefined}>",
    to: "<g className={'hq-anim hq-sway'} style={{ '--dur': '8s' }}>",
    expect: 'a ghost piece does not animate' },

  { name: 'the ownership gate itself stops saying no',
    from: "const anim = (s, classes) => (s.solid ? `hq-anim ${classes}` : undefined);",
    to: 'const anim = (s, classes) => `hq-anim ${classes}`;',
    expect: 'one gate for attaching an idle loop' },

  /* ---- the robot looks at HIM ---- */
  { name: 'the robot head is nailed to one angle',
    from: '    const rp = projectFloor(r.u, r.v);\n    const bp = projectFloor(spot.u, spot.v);',
    to: '    const rp = { x: 800 };\n    const bp = { x: 900 };',
    expect: 'turns toward where he actually is' },

  { name: 'an unowned robot watches him anyway',
    from: "    if (!r || !owned.has('hq-robot')) return 0;",
    to: '    if (!r) return 0;',
    expect: 'stays still for a robot he does not own' }
];

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'hq-motion-'));
fs.cpSync(path.join(REPO, 'src'), path.join(tmp, 'src'), { recursive: true });
fs.mkdirSync(path.join(tmp, 'scripts'));
fs.cpSync(path.join(REPO, 'scripts/verify-hq-room.mjs'), path.join(tmp, 'scripts/verify-hq-room.mjs'));

const pristine = fs.readFileSync(path.join(tmp, HQ), 'utf8');

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
  if (!pristine.includes(m.from)) {
    console.log(`SKIP  ${m.name}  — the text this mutation edits is not in the file any more`);
    survived += 1;
    continue;
  }
  fs.writeFileSync(path.join(tmp, HQ), pristine.replace(m.from, m.to));
  const r = runSuite();
  fs.writeFileSync(path.join(tmp, HQ), pristine);

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
  console.log('\nEVERY MOTION RULE IS LOAD-BEARING');
}
