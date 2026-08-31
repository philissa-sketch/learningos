// ---------------------------------------------------------------------------
// MUTATION TEST FOR THE PHASE 4 GUARD — "the crew".
// Run: node scripts/mutate-hq-crew.mjs
//
// ---- WHY ----
//
// Crew carry two rules that are easy to break in ways nobody sees for months:
//
//   * **Earned, never bought.** A price on a crew member, or an arrival rule
//     that fails open, hands a twelve-year-old something he did not work for —
//     and it would look exactly like a feature.
//   * **The room draws nobody who has not arrived.** Loosening that is the same
//     one-line "so it doesn't look empty" temptation that Phase 3's whole
//     mutation suite exists to hold shut.
//
// Plus the geometry: a crew member posted in the cadet's own spot stands in
// front of the piece all day, which the first rendered frame caught and no
// amount of reading would have.
//
// Nothing here touches the real files: everything happens in a temp copy.
// ---------------------------------------------------------------------------
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const HQ = 'src/components/Rewards/HQRoom.jsx';
const LIB = 'src/lib/hqCrew.js';
const DATA = 'src/academies/lamar/data/hqCrew.js';
const STORE = 'src/store/useAppStore.js';

const MUTATIONS = [
  /* ---- earned, never bought ---- */
  { name: 'a crew member acquires a price', file: DATA,
    from: "    avatar: 'avatar-astronaut',",
    to: "    avatar: 'avatar-astronaut',\n    cost: 400,",
    expect: 'no crew member has a price' },

  { name: 'an unknown arrival rule hands one out anyway', file: LIB,
    from: '    default:\n      return false;',
    to: '    default:\n      return true;',
    expect: 'unrecognised arrival rule hands out nobody' },

  { name: 'the threshold is met one lesson early', file: LIB,
    from: '      return mastered >= a.count;',
    to: '      return mastered >= a.count - 1;',
    expect: 'nor one lesson short of the threshold' },

  { name: 'a crew member arrives on an empty record', file: LIB,
    from: '  const a = crew?.arrival;\n  if (!a) return false;',
    to: '  const a = crew?.arrival;\n  if (!a) return true;',
    expect: 'hands out nobody' },

  /* ---- the room draws nobody unearned ---- */
  { name: 'the room draws crew he has not earned', file: HQ,
    from: 'const crewInRoom = useMemo(() => roster.filter((c) => c.arrived)',
    to: 'const crewInRoom = useMemo(() => roster.filter(() => true)',
    expect: 'the room only draws arrived crew' },

  { name: 'an unearned crew member is handed a post', file: LIB,
    from: '      post: arrived ? postFor(crew, { posts, owned }) : null',
    to: '      post: postFor(crew, { posts, owned })',
    expect: 'unearned crew member carries no post' },

  /* ---- where they stand ---- */
  { name: 'the crew member stands in his spot again', file: LIB,
    from: '    u: Math.min(0.97, Math.max(0.03, base.u - halfU)),',
    to: '    u: Math.min(0.97, Math.max(0.03, base.u + station.du)),',
    expect: 'stands on the far side' },

  // Shrinks the mirror instead of the standoff: still the far side, but close
  // enough to overlap him. Setting CREW_STANDOFF alone does NOT do this — the
  // mirror is what creates the gap, which the first version of this mutation
  // got wrong and the run showed.
  { name: 'the two of them stand on top of each other', file: LIB,
    from: '  const halfU = floorWidth > 0 ? (foot * depth(p.y) + CREW_STANDOFF_PX) / floorWidth : 0.04;',
    to: '  const halfU = 0.004;',
    expect: 'far enough apart to read as two people' },

  { name: 'the crew member reaches for nothing', file: HQ,
    from: 'reachY: reachYFor(station, spotOf(postId), spot)',
    to: 'reachY: null',
    expect: 'hands land on the surface' },

  { name: 'the standoff becomes a number in the JSX', file: LIB,
    from: 'export const CREW_STANDOFF_PX = 12;',
    to: 'const CREW_STANDOFF_PX = 12;',
    expect: 'named constant' },

  { name: 'the standoff stops measuring the piece', file: LIB,
    from: '  const halfU = floorWidth > 0 ? (foot * depth(p.y) + CREW_STANDOFF_PX) / floorWidth : 0.04;',
    to: '  const halfU = 0.085;',
    expect: 'measures the piece rather than assuming one width' },

  /* ---- posts ---- */
  { name: 'a post survives him not owning the station', file: LIB,
    from: '  if (chosen && owned.has(chosen)) return chosen;\n  if (chosen) return null;',
    to: '  if (chosen) return chosen;',
    expect: 'station he does not own resolves to nowhere' },

  { name: 'the default post ignores ownership', file: LIB,
    from: '  if (crew.defaultPost && owned.has(crew.defaultPost)) return crew.defaultPost;',
    to: '  if (crew.defaultPost) return crew.defaultPost;',
    expect: 'default post is ignored unless he owns it' },

  { name: 'the post stops following the furniture', file: HQ,
    from: '    const base = spotOf(postId) || { u: HOME_SPOT.u, v: HOME_SPOT.v };',
    to: '    const base = { u: 0.4167, v: 0.375 };',
    expect: 'follows the piece when he drags it' },

  /* ---- one per station, in the store ---- */
  { name: 'two crew stack on one desk', file: STORE,
    from: '        if (otherId !== crewId && otherStation === stationId) delete hqCrewPosts[otherId];',
    to: '        void otherId; void otherStation;',
    expect: 'STORE enforces it' },

  { name: 'the store accepts a station he does not own', file: STORE,
    from: "    if (stationId && !owned.has(stationId)) return { ok: false, reason: 'not-owned' };",
    to: '    void owned;',
    expect: 'refuses a station he does not own' },

  { name: 'occupancy stops being detectable', file: LIB,
    from: "  const held = roster.find((c) => c.arrived && c.post === stationId);",
    to: '  const held = null;',
    expect: 'one station holds one crew member' },

  /* ---- depth ---- */
  { name: 'the figures stop being depth sorted', file: HQ,
    from: '            .sort((a, b) => (a.spot.v ?? 0) - (b.spot.v ?? 0))',
    to: '            .slice()',
    expect: 'sorted back to front' },

  /* ---- a crew member is not him ---- */
  { name: 'the crew member becomes another copy of him', file: DATA,
    from: "    avatar: 'avatar-astronaut',",
    to: "    avatar: 'avatar-cadet',",
    expect: 'different figure from his own avatar' },

  { name: 'the crew member starts wearing his gear', file: HQ,
    from: 'avatar: c.avatar, gear: {}',
    to: 'avatar: c.avatar, gear: equippedGear',
    expect: 'wear none of his gear' },

  /* ---- read-only ---- */
  { name: 'the crew rules reach for the store', file: LIB,
    from: "import { HQ_CREW } from '../academies/lamar/data/hqCrew.js';",
    to: "import { HQ_CREW } from '../academies/lamar/data/hqCrew.js';\nexport const _save = (v) => saveMeta({ crew: v });",
    expect: 'nothing in them writes' },

  /* ---- persistence ---- */
  { name: 'crew posts stop being saved', file: STORE,
    from: 'equippedGear, hqLayout, hqCrewPosts, quizLinks,',
    to: 'equippedGear, hqLayout, quizLinks,',
    expect: 'stored beside his room layout' },

  /* ---- the panel still tells him what is left ---- */
  { name: 'progress toward a crew member stops being reported', file: LIB,
    from: '  return { have: Math.min(have, a.count), need: a.count, kind: a.kind, subject: a.subject || null };',
    to: '  return null;',
    expect: 'shows what is left to earn' },

  { name: 'a crew member stops saying how they are earned', file: DATA,
    from: "    arrival: { kind: 'lessonsMastered', subject: 'aerospace', count: 10 },",
    to: '    arrival: null,',
    expect: 'states how they are earned' }
];

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'hq-crew-'));
fs.cpSync(path.join(REPO, 'src'), path.join(tmp, 'src'), { recursive: true });
fs.mkdirSync(path.join(tmp, 'scripts'));
fs.cpSync(path.join(REPO, 'scripts/verify-hq-room.mjs'), path.join(tmp, 'scripts/verify-hq-room.mjs'));

const FILES = [HQ, LIB, DATA, STORE];
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
  console.log('\nEVERY CREW RULE IS LOAD-BEARING');
}
