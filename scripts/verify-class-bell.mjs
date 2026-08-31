// ---------------------------------------------------------------------------
// CLASS BELL GUARD. Run: node scripts/verify-class-bell.mjs
//
// The parent, Aug 9 2026: "Is there anyway a timer and an alarm can be added to
// the schedule so he know when to switch classes."
//
// An alarm is a feature you cannot check by looking at it. It is right or wrong
// at 10:44 on a Tuesday, and wrong quietly — a bell that does not ring looks
// exactly like a bell that had nothing to ring for. So the arithmetic lives in
// pure functions and this runs them against real clock times: mid-block, on the
// boundary, in a gap, before school, after school, and at the weekend.
//
// Every check below runs the SHIPPED logic from src/lib/classBell.js against
// the SHIPPED schedule from src/academies/lamar/data/schedule/defaultSchedule.js.
// ---------------------------------------------------------------------------
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { defaultSchedule } from '../src/academies/lamar/data/schedule/defaultSchedule.js';
import { toMinutes, formatClock, formatCountdown, normaliseBlocks, scheduleStatus, bellDue, bellKey, minutesSinceMidnight } from '../src/lib/classBell.js';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
let failures = 0;
const ok = (cond, msg, detail) => {
  console.log(`${cond ? 'PASS' : 'FAIL'}  ${msg}`);
  if (!cond) { failures++; if (detail) console.log('      ' + detail); }
};
const at = (hhmm) => toMinutes(hhmm);

// ===========================================================================
console.log('\n--- 1. the schedule parses, and is a timeline ---');
// ===========================================================================
const blocks = normaliseBlocks(defaultSchedule);
ok(blocks.length === defaultSchedule.length,
  `every one of the ${defaultSchedule.length} blocks has usable times (${blocks.length} parsed)`,
  defaultSchedule.filter((b) => !blocks.some((n) => n.id === b.id)).map((b) => b.id).join(', '));
ok(blocks.every((b) => b.endMin > b.startMin), 'no block ends before it starts');
const overlaps = blocks.filter((b, i) => i > 0 && b.startMin < blocks[i - 1].endMin)
  .map((b) => `${b.label} starts before ${blocks[blocks.indexOf(b) - 1].label} ends`);
ok(overlaps.length === 0, 'no two blocks overlap', overlaps.join(' | '));
console.log(`      day runs ${formatClock(blocks[0].startMin)} – ${formatClock(blocks[blocks.length - 1].endMin)}, ${blocks.length} blocks`);

// Malformed input must be dropped, not defaulted to midnight — a bad block
// sorting to the top of the day would put the bell on the wrong thing all
// morning.
ok(normaliseBlocks([{ id: 'x', startTime: '99:99', endTime: '10:00' }]).length === 0,
  'a block with an impossible time is dropped, not defaulted to midnight');
ok(normaliseBlocks([{ id: 'x', startTime: '10:00', endTime: '09:00' }]).length === 0,
  'a block that ends before it starts is dropped');

// ===========================================================================
console.log('\n--- 2. where are we in the day ---');
// ===========================================================================
const S = (hhmm, isSchoolDay = true) => scheduleStatus(defaultSchedule, { minutes: at(hhmm), isSchoolDay });

ok(S('07:30').phase === 'before', 'before the first block: "before"');
ok(S('07:30').next.label.includes('Morning Meeting'), 'and it names the morning meeting as next');
ok(S('09:30').phase === 'in-block' && S('09:30').current.label === 'Mathematics',
  '9:30am is Mathematics', S('09:30').current?.label);
// DERIVED, NOT HARDCODED. This trio broke on Aug 9 2026 when the morning was
// retimed (Reading 45 -> 15 min, Language Arts 30 -> 60) and Science moved from
// 11:00-12:00 to 10:30-11:30. The checks were right about the BEHAVIOUR and
// wrong only about the clock, which is the third time a guard in this project
// has failed on a stale literal. Read the block's real times instead.
const SCIENCE = defaultSchedule.find((b) => b.label === 'Science');
const midScience = (a, b) => {
  const m = (t) => { const [h, mm] = t.split(':').map(Number); return h * 60 + mm; };
  const mid = Math.floor((m(a) + m(b)) / 2);
  return String(Math.floor(mid / 60)).padStart(2, '0') + ':' + String(mid % 60).padStart(2, '0');
};
ok(S(midScience(SCIENCE.startTime, SCIENCE.endTime)).current.label === 'Science',
  'the middle of the Science block is Science',
  S(midScience(SCIENCE.startTime, SCIENCE.endTime)).current?.label);
ok(S('13:35').current.label === 'Spelling & Vocabulary',
  '1:35pm is Spelling & Vocabulary', S('13:35').current?.label);
ok(S('15:05').current.label === 'Electric Guitar Practice',
  '3:05pm is guitar practice', S('15:05').current?.label);
ok(S('20:00').phase === 'after', '8pm is after the school day');
ok(S('11:30', false).phase === 'no-school', 'a weekend is "no-school" whatever the time');

// A boundary belongs to the block STARTING, not the one ending — at 10:00
// exactly he is in whatever starts at 10:00, not still in Maths.
//
// DERIVED, NOT NAMED. This asserted the literal 'Independent Reading' and broke
// the day that block became the Reading Lesson — the fifth stale-literal
// failure in this project in a week, and the thing under test was never the
// label. It is that the boundary belongs to the block starting.
const tenOClock = defaultSchedule.find((b) => b.startTime === '10:00');
ok(S('10:00').current.label === tenOClock.label,
  `on the boundary, the new block is the current one (${tenOClock.label})`, S('10:00').current?.label);

// The countdown.
// A HARDCODED 3600 UNTIL AUG 9 2026, and it broke the moment Science went from
// 60 minutes to 45 to make room for typing. Fourth stale-literal failure in a
// week; the rule this project keeps relearning is that a guard hardcoding a
// value the app owns will fail on the next legitimate change. Derived now.
const SCIENCE_SECONDS = (toMinutes(SCIENCE.endTime) - toMinutes(SCIENCE.startTime)) * 60;
ok(S(SCIENCE.startTime).secondsLeftInBlock === SCIENCE_SECONDS,
  `the whole of Science is left at the top of Science (${SCIENCE_SECONDS / 60} min)`);

// --- blocks that do not run every day ------------------------------------
// The after-school garden block is Fridays only. One day template is reused
// Mon-Fri, so without the `days` filter the bell announces it on a Tuesday —
// a bell ringing for a class nobody is in, which is what the holiday fix the
// same day was about.
const gardenB = defaultSchedule.find((b) => b.id === 'block-11');
ok(Array.isArray(gardenB?.days) && gardenB.days.length === 1 && gardenB.days[0] === 5,
  'the garden block declares Friday and only Friday', JSON.stringify(gardenB?.days));
const midGarden = toMinutes(gardenB.startTime) + 5;
ok(scheduleStatus(defaultSchedule, { minutes: midGarden, isSchoolDay: true, weekday: 5 }).current?.id === 'block-11',
  'on Friday, 3:20pm is the garden');
ok(scheduleStatus(defaultSchedule, { minutes: midGarden, isSchoolDay: true, weekday: 2 }).current === null,
  'on Tuesday, 3:20pm is nothing — school is over');
ok(scheduleStatus(defaultSchedule, { minutes: midGarden, isSchoolDay: true, weekday: 2 }).phase === 'after',
  'on Tuesday the day is already "after" by 3:20pm');
// 3:15 rings on BOTH days and should — that is guitar ending, not the garden
// starting. What must never happen is a bell that names the garden block on a
// day the garden does not run, so that is what is asserted: across the whole
// garden window, no Tuesday bell and no Tuesday block is ever block-11.
for (let t = toMinutes(gardenB.startTime); t <= toMinutes(gardenB.endTime); t += 5) {
  const tueDue = bellDue(defaultSchedule, { minutes: t, isSchoolDay: true, weekday: 2 });
  if (tueDue && tueDue.blockId === 'block-11') {
    ok(false, `no Tuesday bell names the garden (rang at ${formatClock(t)})`);
  }
  const tueNow = scheduleStatus(defaultSchedule, { minutes: t, isSchoolDay: true, weekday: 2 }).current;
  if (tueNow && tueNow.id === 'block-11') {
    ok(false, `the garden is never the current Tuesday block (was at ${formatClock(t)})`);
  }
}
ok(true, 'across the whole garden window, no Tuesday bell or block is ever the garden');
const friStart = bellDue(defaultSchedule, { minutes: toMinutes(gardenB.startTime), isSchoolDay: true, weekday: 5 });
ok(!!friStart, 'the bell still rings at 3:15 on a Friday');
ok(scheduleStatus(defaultSchedule, { minutes: toMinutes(gardenB.endTime) - 1, isSchoolDay: true, weekday: 5 }).current?.id === 'block-11',
  'the garden runs to its end on a Friday');

// --- typing, added the same day ------------------------------------------
const typing = defaultSchedule.find((b) => b.id === 'block-5b');
ok(!!typing, 'the printed schedule carries the typing block');
ok(toMinutes(typing.endTime) - toMinutes(typing.startTime) === 15, 'typing runs 15 minutes');
ok(typing.startTime === SCIENCE.endTime, 'typing starts the moment Science ends');
const lunchB = defaultSchedule.find((b) => b.id === 'block-6');
ok(typing.endTime === lunchB.startTime, 'typing ends the moment lunch starts — a hard edge, not a judgement call');

// --- typing gets BOTH a block and a card, not either ---------------------
// block-10's own comment states the rule this project learned the hard way:
// "An unnamed fifteen minutes will not happen." Guitar and PE each have a named
// block AND a row on his home screen. Typing was shipped with only the block on
// Aug 9 2026 and the card added the same day; these assert it keeps both.
//
// SOURCE-TEXT CHECKS, and labelled as such — the dashboard cannot be rendered
// from node. They catch the row being deleted, which is the failure that
// matters; they do not prove it renders correctly.
const tDash = fs.readFileSync(path.join(REPO, 'src/components/Dashboard/MissionControlDashboard.jsx'), 'utf8');
ok(/subject="typing"/.test(tDash), 'the home screen carries a typing row');
ok(/kind="khan"[\s\S]{0,400}?onToggleDaily=\{\(\) => markKhanDailySubject\('typing'/.test(tDash)
  || /subject="typing"[\s\S]{0,600}?markKhanDailySubject\('typing'/.test(tDash),
  'the typing row is tickable — EdClub progress is invisible to this app, so his tick is the only signal');
const tApp = fs.readFileSync(path.join(REPO, 'src/App.jsx'), 'utf8');
/**
 * THIS CHECK USED TO ASSERT THE BUG. (Rewritten Aug 10, 2026.)
 *
 * It read: onOpenTyping={() => setTypingMode('home')} — and passed, every run,
 * while the button did nothing at all. `typingMode` selects Typing's SUB-
 * screens ('lessons' | 'speedtest'); the home screen is `view === 'typing'`.
 * 'home' matched no branch, so the click changed state and rendered nothing.
 *
 * The parent found it, not this file: "The typing link on the mission control
 * panel doesn't do anything."
 *
 * That is the sixth time a source-text check has frozen a literal instead of a
 * behaviour. The lesson each time is the same: assert the DESTINATION EXISTS,
 * not that one line reads a particular way. So this now checks that the
 * handler routes to a view AND that the router has somewhere for it to land.
 */
ok(/onOpenTyping=\{[\s\S]{0,900}?setView\('typing'\)/.test(tApp),
  'the typing row actually opens the typing screen');
ok(/\{view === 'typing' &&/.test(tApp),
  '...and the router has a typing screen to land on — the half that was missing');
ok(/onOpenTyping=\{[\s\S]{0,900}?setTypingMode\(null\)/.test(tApp),
  '...landing on Typing home rather than resuming an old sub-screen');

// The Khan streak must NOT count typing. Ticking typing is a real day of
// typing; it is not a day of Khan, and a streak that says otherwise is a lie
// he can run up without doing any Khan work.
const tStore = fs.readFileSync(path.join(REPO, 'src/store/useAppStore.js'), 'utf8');
ok(/export const NON_KHAN_DAILY_SUBJECT = 'typing';/.test(tStore),
  'the non-Khan daily key is declared once, not scattered as a literal');
const streakFn = tStore.slice(tStore.indexOf('getKhanDailyStreak()'), tStore.indexOf('getTypingDailyStreak()'));
ok(/NON_KHAN_DAILY_SUBJECT/.test(streakFn), 'the Khan daily streak excludes typing');
ok(/getTypingDailyStreak\(\)/.test(tStore), 'typing has a streak of its own');

// The link he is actually sent to.
const typingData = fs.readFileSync(path.join(REPO, 'src/academies/lamar/data/writing/typingLessons.js'), 'utf8');
ok(/EDCLUB_PORTAL_URL = 'https:\/\/www\.edclub\.com\/sportal\/'/.test(typingData),
  'the EdClub portal URL is where the app says it is');
const typingHome = fs.readFileSync(path.join(REPO, 'src/components/Writing/TypingHome.jsx'), 'utf8');
ok(/EDCLUB_PORTAL_URL/.test(typingHome), 'the typing screen links EdClub');
ok(/sign in/i.test(typingHome),
  'the EdClub card warns about the sign-in wall — a login screen reads as a broken link');
const oneMinuteBefore = (t) => {
  const [h, mm] = t.split(':').map(Number);
  const v = h * 60 + mm - 1;
  return String(Math.floor(v / 60)).padStart(2, '0') + ':' + String(v % 60).padStart(2, '0');
};
ok(S(oneMinuteBefore(SCIENCE.endTime)).secondsLeftInBlock === 60,
  'one minute left one minute before Science ends');
ok(S('07:30').secondsUntilNext === 60 * 60, 'an hour until school at 7:30');

// ===========================================================================
console.log('\n--- 3. the bell rings when it should, and only then ---');
// ===========================================================================
const D = (hhmm, warn = 2, isSchoolDay = true) =>
  bellDue(defaultSchedule, { minutes: at(hhmm), warningMinutes: warn, isSchoolDay });

ok(D('09:30') === null, 'no bell mid-block');
ok(D('10:00')?.kind === 'switch', 'switch bell when Maths ends at 10:00', JSON.stringify(D('10:00')));
ok(D('09:58')?.kind === 'warning', 'warning two minutes before, at 9:58', JSON.stringify(D('09:58')));
ok(D('09:58', 0) === null, 'no warning at all when the lead is set to zero');
ok(D('09:55', 5)?.kind === 'warning', 'a five-minute lead warns at 9:55');
ok(D('08:30')?.kind === 'start', 'the day opens with the start bell');
ok(D('10:00', 2, false) === null, 'nothing rings at the weekend');
ok(D('20:00') === null, 'nothing rings long after the last block');

/**
 * The throttled-tab case, which is the whole reason this returns a boundary
 * rather than a boolean. A background tab can be starved for a minute; when it
 * gets a turn again the bell it missed should still ring, late but correct.
 */
const lateByHalfMin = bellDue(defaultSchedule, { minutes: at('10:00') + 0.5, warningMinutes: 2 });
ok(lateByHalfMin?.kind === 'switch', 'a tab that wakes 30 seconds late still rings the switch');
const lateByFiveMin = bellDue(defaultSchedule, { minutes: at('10:00') + 5, warningMinutes: 2 });
ok(lateByFiveMin === null, 'but a boundary five minutes gone is not rung — too late to be useful');

/**
 * Idempotence. The component fires on a CHANGE of key, so the same boundary
 * evaluated repeatedly inside one second must produce one key, and two
 * different boundaries must produce two.
 */
const k1 = bellKey('2026-08-10', D('10:00'));
const k2 = bellKey('2026-08-10', bellDue(defaultSchedule, { minutes: at('10:00') + 0.2, warningMinutes: 2 }));
ok(k1 === k2 && k1 !== null, 'the same boundary yields the same key, so it rings once', `${k1} vs ${k2}`);
ok(bellKey('2026-08-10', D('10:45')) !== k1, 'a different boundary yields a different key');
ok(bellKey('2026-08-11', D('10:00')) !== k1, 'the same boundary tomorrow rings again');

/**
 * A warning must never land on top of a switch. A block shorter than the
 * warning lead would otherwise chime "two minutes to go" at the moment the
 * previous block ended.
 */
const shortDay = [
  { id: 'a', startTime: '09:00', endTime: '09:02', label: 'Tiny' },
  { id: 'b', startTime: '09:02', endTime: '09:04', label: 'Also tiny' },
  { id: 'c', startTime: '09:04', endTime: '10:00', label: 'Next' }
];
// 09:00 is block a's warning AND the start of the day.
const clashStart = bellDue(shortDay, { minutes: at('09:00'), warningMinutes: 2 });
ok(clashStart?.kind === 'start',
  'a warning landing on the start of the day defers to the start bell', JSON.stringify(clashStart));
// 09:02 is block b's warning AND block a's switch.
const clashSwitch = bellDue(shortDay, { minutes: at('09:02'), warningMinutes: 2 });
ok(clashSwitch?.kind === 'switch',
  'a warning landing on a switch defers to the switch — "move now" beats "move soon"',
  JSON.stringify(clashSwitch));
// The 15-minute Break with a 15-minute lead: the warning is the block's own
// start. It must be dropped, not rung at the moment he sits down.
const breakBlock = [{ id: 'brk', startTime: '10:45', endTime: '11:00', label: 'Break' }];
ok(bellDue(breakBlock, { minutes: at('10:45'), warningMinutes: 15 })?.kind !== 'warning',
  'a warning as long as the block does not fire at the moment the block begins');

// ===========================================================================
console.log('\n--- 4. gaps are a real state ---');
// ===========================================================================
const gapped = [
  { id: 'a', startTime: '09:00', endTime: '10:00', label: 'First' },
  { id: 'b', startTime: '10:30', endTime: '11:00', label: 'Second' }
];
const inGap = scheduleStatus(gapped, { minutes: at('10:15') });
ok(inGap.phase === 'gap', 'ten minutes with nothing scheduled is a gap, not the previous block');
ok(inGap.current === null, 'and nothing is reported as running');
ok(inGap.next.label === 'Second', 'the gap still names what is coming');
ok(bellDue(gapped, { minutes: at('10:15'), warningMinutes: 2 }) === null,
  'no bell rings during a gap — he is not late for anything');

// ===========================================================================
console.log('\n--- 5. how it reads ---');
// ===========================================================================
ok(formatCountdown(45) === '45 sec', 'under a minute shows seconds');
ok(formatCountdown(600) === '10 min', 'ten minutes reads as minutes');
ok(formatCountdown(3900) === '1 hr 5 min', 'over an hour reads in hours and minutes');
ok(formatClock(at('13:05')) === '1:05 PM', 'times are shown as a twelve-year-old reads a clock');
ok(formatClock(at('00:00')) === '12:00 AM', 'midnight is 12 AM, not 0 AM');

// ===========================================================================
console.log('\n--- 6. wiring ---');
// ===========================================================================
const card = fs.readFileSync(path.join(REPO, 'src/components/Dashboard/ClassBellCard.jsx'), 'utf8');
const dash = fs.readFileSync(path.join(REPO, 'src/components/Dashboard/MissionControlDashboard.jsx'), 'utf8');
const sfx = fs.readFileSync(path.join(REPO, 'src/lib/sfx.js'), 'utf8');
const strip = (t) => t.replace(/\{\/\*[\s\S]*?\*\/\}/g, '').replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
const cardCode = strip(card);
const dashCode = strip(dash);

ok(/<ClassBellCard \/>/.test(dashCode), 'the card is mounted on the student dashboard');
ok((dashCode.match(/<ClassBellCard/g) || []).length === 1, 'mounted exactly once');
/**
 * Audio cannot play before a user gesture. If the card ever stops calling
 * unlockAudio from the arm button, the bell becomes silent and still LOOKS
 * armed — the one failure mode that would let him miss every switch while
 * believing he would be told.
 */
ok(/unlockAudio\(\)/.test(cardCode), 'arming the bell unlocks the audio context');
/**
 * THE BELL MUST SURVIVE NAVIGATION. (Aug 10, 2026.)
 *
 * The parent: "the bell keeps turning off when he leaves the mission control."
 * `armed` was React state on a card that unmounts the moment he opens anything
 * else, so the bell disarmed itself several times a day and he had to know to
 * come back and press the button again. He did not, and the bell he was told
 * to rely on stopped ringing.
 *
 * The browser's gate is per PAGE LOAD, not per component mount. The audio
 * context is therefore the honest source of truth: it survives navigation and
 * resets on reload, which is exactly the real rule.
 */
ok(/isAudioUnlocked\(\)/.test(cardCode),
  'armed is read from the audio engine, not remembered on the card');
ok(/onAudioUnlockChange\(/.test(cardCode),
  '...and the card re-renders when any other tap in the app unlocks audio');
ok(/export function isAudioUnlocked\(/.test(sfx) && /audioCtx\.state === 'running'/.test(sfx),
  'isAudioUnlocked reports the context state rather than a remembered flag');
ok(!/localStorage|saveMeta\(\{ *classBellArmed/.test(cardCode),
  'armed state is still NOT persisted across reloads — it cannot be, and pretending it is would mute the bell silently');
ok(/playBellSwitch|playBellWarning|playBellStart/.test(cardCode), 'the card plays the bell sounds');
for (const fn of ['playBellWarning', 'playBellSwitch', 'playBellStart']) {
  ok(new RegExp('export function ' + fn + '\\(').test(sfx), `sfx exports ${fn}`);
}
/**
 * ---- IT HAS TO SOUND LIKE A SCHOOL BELL (Aug 10, 2026) ----
 *
 * The parent: "the bell is disappointing to him, he wants it to ring like a
 * school bell."
 *
 * The first version was two sine notes. That is a DOORBELL. Three properties
 * separate struck metal from a chime, and all three are checked here because
 * losing any one of them puts it back to sounding like app noise.
 */
ok(/export function playSchoolBell\(/.test(sfx), 'there is an actual school bell to ring');
ok(/const BELL_PARTIALS/.test(sfx) && /2\.76/.test(sfx),
  'it is built from INHARMONIC partials — the reason a bell sounds like a bell',
  'whole-number multiples would make it a chime again');
ok(/function noiseBurst\(/.test(sfx) && /bandpass/.test(sfx),
  'each strike has a noise transient — the clack of the hammer on metal');
const schoolBody = sfx.slice(sfx.indexOf('export function playSchoolBell'), sfx.indexOf('export function playBellWarning'));
ok(/STRIKE_EVERY/.test(schoolBody) && /for \(let i = 0; i < strikes/.test(schoolBody),
  'the clapper strikes repeatedly — the rattle IS the school bell',
  'one strike is a gong, not a school bell');
ok(/playSchoolBell\(/.test(sfx.slice(sfx.indexOf('export function playBellSwitch'))),
  'the switch bell is the school bell');

/**
 * The bell must still not sound like a REWARD. Every reward sound in this app
 * rises; a rising bell would read as "you earned something" at the moment it
 * means "stop and switch", and within a week the two stop being
 * distinguishable. A repeated single-pitch strike cannot rise — so the check
 * is that no upward glide was added to it.
 */
ok(!/to: /.test(schoolBody),
  'the school bell does not glide, so it cannot be mistaken for a reward chime');
const warnBody = sfx.slice(sfx.indexOf('export function playBellWarning'), sfx.indexOf('export function playBellSwitch'));
ok(/bellStrike\(/.test(warnBody) && !/STRIKE_EVERY/.test(warnBody),
  'the 2-minute warning is ONE tap of the same bell — recognisable, but not the full ring');

const store = fs.readFileSync(path.join(REPO, 'src/store/useAppStore.js'), 'utf8');
ok(/async setClassBellSettings\(/.test(store), 'the parent can turn the bell on and off');
ok(/classBellWarningMinutes: meta\?\.classBellWarningMinutes \?\? 2/.test(store),
  'the warning lead is loaded from meta with a sane default');
ok(/Math\.min\(15, Math\.max\(0,/.test(store), 'the warning lead is clamped to 0-15 minutes');

// ===========================================================================
const label = failures === 0 ? 'ALL CHECKS PASSED' : `${failures} CHECK(S) FAILED`;
// ---------------------------------------------------------------------------
// THE CLOCK -> MINUTES CONVERSION, which is where the bell was actually broken.
//
// Every check above hands `minutes` to the library directly, so the library was
// always right and this guard always passed -- while ClassBellCard computed
// `getHours() + getMinutes()/60 + getSeconds()/3600` (HOURS) and handed 10.87
// to it at ten to eleven in the morning. The card read that as 00:11, said
// "School starts at 8:30 AM" all day, and the bell could never ring.
//
// A guard that tests a library and not its one caller tests the half that was
// not broken.
// ---------------------------------------------------------------------------
console.log('\n--- the clock conversion (the caller, not just the library) ---');
{
  const clock = (h, m, sec = 0) => new Date(2026, 7, 12, h, m, sec);
  ok(minutesSinceMidnight(clock(0, 0)) === 0, 'midnight is 0');
  ok(minutesSinceMidnight(clock(8, 30)) === 510, '8:30 AM is 510');
  ok(minutesSinceMidnight(clock(10, 52)) === 652, '10:52 AM is 652 -- not 10.87');
  ok(minutesSinceMidnight(clock(23, 59)) === 1439, '11:59 PM is 1439');
  ok(Math.abs(minutesSinceMidnight(clock(9, 0, 30)) - 540.5) < 1e-9, 'seconds move it by less than a minute');
  ok((() => {
    let prev = -1;
    for (let h = 0; h < 24; h++) {
      for (let m = 0; m < 60; m += 7) {
        const v = minutesSinceMidnight(clock(h, m));
        if (v <= prev) return false;
        prev = v;
      }
    }
    return true;
  })(), 'it climbs all day and never wraps');

  const midMorning = scheduleStatus(defaultSchedule, {
    minutes: minutesSinceMidnight(clock(10, 52)),
    isSchoolDay: true,
    weekday: 3
  });
  ok(midMorning.phase === 'in-block', '10:52 on a Wednesday is IN a block, not before school', `phase ${midMorning.phase}`);
  ok(Boolean(midMorning.current) && midMorning.current.label === 'Science',
    '...and the block it names is Science', midMorning.current ? midMorning.current.label : 'no current block');

  for (const file of ['src/components/Dashboard/ClassBellCard.jsx', 'src/components/Dashboard/TodaysRoutineRail.jsx']) {
    const name = file.split('/').pop();
    const src = fs.readFileSync(path.join(REPO, file), 'utf8');
    ok(/minutesSinceMidnight\(/.test(src), `${name} uses minutesSinceMidnight`);
    ok(!/const minutes = now\.getHours\(\) \+/.test(src), `${name} does not roll its own hour maths`,
      'that exact expression is the bug');
  }
}

console.log(`\n${label}\n`);
process.exit(failures === 0 ? 0 : 1);
