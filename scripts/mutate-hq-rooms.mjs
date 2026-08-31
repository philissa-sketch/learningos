// ---------------------------------------------------------------------------
// MUTATION TEST FOR THE PHASE 5 GUARD — "the room model".
// Run: TZ=America/New_York node scripts/mutate-hq-rooms.mjs
//
// ---- WHY ----
//
// Section 13 of `verify-hq-room.mjs` is twenty-one new checks, and a check that has
// never failed has never been tested. Three of them are the kind that look
// obviously correct and quietly check nothing:
//
//   * **The partition.** "Every piece is in exactly one room" passes trivially
//     if it is comparing a list to itself. The whole point is that it reads
//     `HQ_ITEMS`, so the day somebody adds a twentieth catalogue item and
//     forgets to give it a room, the suite says so instead of the piece simply
//     never appearing anywhere.
//   * **The empty-room rule.** Phase 3's discipline is that the room refuses to
//     draw what he has not got, and this is that rule one level up. It is
//     checked from both ends and under both presence rules, and it has to
//     actually go red when either end is loosened.
//   * **The door clearance.** This one caught two bad designs before either was
//     drawn — three doors at 78px and a single door at 52px. If it stops
//     measuring, the next bad position ships as a rendered frame with two
//     people standing inside each other.
//
// Nothing here touches the real files: everything happens in a temp copy.
// ---------------------------------------------------------------------------
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ROOMS = 'src/lib/hqRooms.js';
const HQ = 'src/components/Rewards/HQRoom.jsx';

const MUTATIONS = [
  /* ---- the partition ---- */
  { name: 'a piece falls out of every room', file: ROOMS,
    from: "      'hq-rug',\n      'hq-award-wall',",
    to: "      'hq-award-wall',",
    expect: 'every catalogue piece lives in exactly one room' },

  { name: 'a piece is claimed by two rooms at once', file: ROOMS,
    from: "    pieces: ['hq-telescope', 'hq-poster-apollo', 'hq-poster-mars']",
    to: "    pieces: ['hq-telescope', 'hq-poster-apollo', 'hq-poster-mars', 'hq-lab']",
    expect: 'every catalogue piece lives in exactly one room' },

  // The count is what proves the partition was measured against the CATALOGUE
  // rather than against the room list agreeing with itself.
  { name: 'the partition stops counting what it placed', file: ROOMS,
    from: '    count: seen.size,',
    to: '    count: seen.size + 1,',
    expect: 'counted against the catalogue, not a copy of it' },

  { name: 'an unknown piece is quietly filed in the hub', file: ROOMS,
    from: '  return Object.prototype.hasOwnProperty.call(ROOM_OF, pieceId) ? ROOM_OF[pieceId] : null;',
    to: '  return ROOM_OF[pieceId] || HOME_ROOM;',
    expect: 'resolves to null, not to the home room' },

  /* ---- presence ---- */
  { name: 'the hub needs furniture before it exists', file: ROOMS,
    from: '  if (room.id === HOME_ROOM) return true;',
    to: '  if (room.id === HOME_ROOM) return room.pieces.some((id) => owned.has(id));',
    expect: 'the hub is present even when he owns nothing at all' },

  { name: 'an empty room is offered anyway', file: ROOMS,
    from: '  if (!room.pieces.some((id) => owned.has(id))) return false;',
    to: '  if (false) return false;',
    expect: 'no presence rule ever lists a room he owns nothing in' },

  { name: 'the switcher collapses to the hub forever', file: ROOMS,
    from: '  return HQ_ROOMS.filter((room) => roomIsPresent(room, opts));',
    to: '  return [HQ_ROOMS[0]];',
    expect: 'two pieces in two rooms give exactly two' },

  { name: 'the year rule stops being a condition', file: ROOMS,
    from: "  if (rule === 'year') return Boolean(room.unlock) && milestones.has(room.unlock);",
    to: "  if (rule === 'year') return true;",
    expect: 'the year rule is still a real second condition' },

  /* ---- the layout survives the split ---- */
  { name: 'two pieces in one room land on one intersection', file: HQ,
    from: "  'hq-lamp': { u: 0.5833, v: 0.125, foot: 22 },",
    to: "  'hq-lamp': { u: 0.4167, v: 0.125, foot: 22 },",
    expect: 'stand on the same grid intersection' },

  /* ---- the door ---- */
  // The back wall passed every number and was wrong in the picture. These are
  // the checks that hold that lesson shut.
  { name: 'the door goes back onto the back wall', file: ROOMS,
    from: "export const DOOR_SIDE = 'right';",
    to: "export const DOOR_SIDE = 'back';",
    expect: 'the door is on a side wall, not the back one' },

  { name: 'the door opens through the patch wall', file: ROOMS,
    from: 'export const DOOR_P = 0.88;',
    to: 'export const DOOR_P = 0.64;',
    expect: 'does not open through a picture' },

  { name: 'the window stops being findable', file: HQ,
    from: 'fill="url(#hqWindow)"',
    to: 'fill="url(#hqGlazing)"',
    expect: 'window-plus-two-shelves' },

  { name: 'a shelf disappears off the back wall', file: HQ,
    from: '            { x: 462, w: 208 },\n            { x: 930, w: 208 }',
    to: '            { x: 462, w: 208 }',
    expect: 'window-plus-two-shelves' },

  // Without side-wall art, "the door does not open through a picture" is true
  // for the reason that there are no pictures — which is not a check.
  { name: "nothing hangs on the door's own wall any more", file: HQ,
    from: "  'hq-award-wall': { side: 'right', p: 0.32, q: 0.44, s: 0.95 },\n  'hq-patch-wall': { side: 'right', p: 0.64, q: 0.46, s: 1.05 },",
    to: "  'hq-award-wall': { side: 'left', p: 0.20, q: 0.44, s: 0.95 },\n  'hq-patch-wall': { side: 'left', p: 0.80, q: 0.46, s: 1.05 },",
    expect: 'for that to have been a real question' },

  { name: 'the muster point stops being a declaration', file: HQ,
    from: "const MUSTER_SPOT = { u: 0.14, v: 0.20, stance: 'stand' };",
    to: 'const MUSTER_SPOT = { ...HOME_SPOT };',
    expect: 'measuring against the real one' },

  // 0.70 is not an arbitrary bad number: it is where the first single-door
  // design actually put it, 52px from the Task Lamp's standing spot.
  { name: 'the arrival spot lands on the Task Lamp again', file: ROOMS,
    from: 'export const DOOR_SPOT = { u: 0.94, v: 0.92 };',
    to: 'export const DOOR_SPOT = { u: 0.64, v: 0.23 };',
    expect: 'nobody arrives through a door inside somebody else' },

  // The clearance check passes vacuously if no distance is ever computed —
  // every comparison against NaN is false, so nothing is ever "too close".
  // This is the check that catches the check having stopped checking.
  { name: 'the arrival spot stops being a real point', file: ROOMS,
    from: "  return roomById(toRoomId) ? { u: DOOR_SPOT.u, v: DOOR_SPOT.v, stance: 'stand' } : null;",
    to: "  return roomById(toRoomId) ? { u: NaN, v: DOOR_SPOT.v, stance: 'stand' } : null;",
    expect: 'measured against a real standing spot in every room' },

  /* ---- the refusals ---- */
  { name: 'a door to a room that does not exist still moves him', file: ROOMS,
    from: "  return roomById(toRoomId) ? { u: DOOR_SPOT.u, v: DOOR_SPOT.v, stance: 'stand' } : null;",
    to: "  return { u: DOOR_SPOT.u, v: DOOR_SPOT.v, stance: 'stand' };",
    expect: 'moves nobody' },

  { name: 'the switcher offers the room he is standing in', file: ROOMS,
    from: '  return presentRooms(opts).filter((r) => r.id !== roomId);',
    to: '  return presentRooms(opts);',
    expect: 'never offers the room he is already standing in' },

  { name: 'an unposted crew member is nowhere at all', file: ROOMS,
    from: '  if (!crew.post) return HOME_ROOM;',
    to: '  if (!crew.post) return null;',
    expect: 'an unposted crew member is somewhere, and it is the hub' },

  /* ---- the file stays runnable, and tier-free ---- */
  { name: 'the room rules reach for the browser', file: ROOMS,
    from: "import { BACK } from './hqGeometry.js';",
    to: "import { BACK } from './hqGeometry.js';\nexport const _peek = () => document.title;",
    expect: 'plain JavaScript a guard can execute' },

  { name: 'a room grows an upgrade tier', file: ROOMS,
    from: "    unlock: 'year-1',",
    to: "    unlock: 'year-1',\n    tier: 1,",
    expect: 'no room or piece has a tier' }
];

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'hq-rooms-'));
fs.cpSync(path.join(REPO, 'src'), path.join(tmp, 'src'), { recursive: true });
fs.mkdirSync(path.join(tmp, 'scripts'));
fs.cpSync(path.join(REPO, 'scripts/verify-hq-room.mjs'), path.join(tmp, 'scripts/verify-hq-room.mjs'));

const FILES = [ROOMS, HQ];
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
  console.log('\nEVERY ROOM RULE IS LOAD-BEARING');
}
