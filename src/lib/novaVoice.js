// ---------------------------------------------------------------------------
// Commander Nova's voice. Kept in one place so his personality stays
// consistent everywhere he shows up: lesson briefings, hints, mastery
// celebrations, and review encouragement.
//
// Personality: warm, genuinely curious, never condescending. Treats
// mistakes as useful data, not failure. Ties concepts back to real
// aerospace engineering work. Gives hints as guiding questions, never
// the answer itself. Celebrates specific effort and progress, not
// generic praise.
// ---------------------------------------------------------------------------

import { choice } from '../engine/mathHelpers.js';

export const NOVA_NAME = 'Commander Nova';

/** Shown when a student masters a lesson for the first time. */
const MASTERY_MESSAGES = [
  "That's a full systems check — mastered. You didn't just get the right answers, you understood why they're right. That's the difference between memorizing and actually knowing something.",
  "Mission complete, and cleanly done. I want you to notice something: you just did what real engineers do every day — worked a problem through, step by step, until it held up.",
  "Mastered. Nice work. Every one of these builds toward something bigger — you're not just checking a box, you're building the exact kind of thinking this field runs on.",
  "That's mastery. I've watched a lot of cadets work through this material, and the ones who stick with it the way you just did are the ones who end up designing the real thing someday.",
  "Systems nominal, mission mastered. That wasn't luck — that was you working through it properly. Keep stacking these up."
];

/** Shown when a student doesn't reach mastery on an attempt — encouraging, not discouraging, with a concrete next step. */
const REVIEW_MESSAGES = [
  "Not mastered yet, and that's completely fine — this is exactly what test data is for. Take a look back at the briefing, then try again. Every engineer re-runs the numbers.",
  "You're not there yet, but you're closer than you were five minutes ago. Go back through the concept once more — most of this clicks the second time through.",
  "This one needs another pass. That's normal, not a setback — even real mission plans get revised before they fly. Review the briefing and give it another shot.",
  "Good data, not a bad result. Every wrong answer tells us exactly what to look at again. Revisit the concept, then come back at it.",
  "Almost — and 'almost' is where real learning happens. Take another look at the briefing above, then try the mission again."
];

/** Suggests what to do next after finishing a lesson, based on how it went. */
const ENRICHMENT_SUGGESTIONS = [
  'If this clicked for you, the Daily Practice Drill has more like it waiting — a great way to lock it in.',
  "Curious how far this idea goes? Try explaining it out loud to someone else — if you can teach it, you've really got it.",
  'Want to go deeper? See if you can come up with your own example problem using this concept, from scratch.',
  "This connects to real aerospace work more than it might look like right now — worth sitting with for a minute before you move on."
];

export function getMasteryMessage() {
  return choice(MASTERY_MESSAGES);
}

export function getReviewMessage() {
  return choice(REVIEW_MESSAGES);
}

export function getEnrichmentSuggestion() {
  return choice(ENRICHMENT_SUGGESTIONS);
}

/** Shown as a hint before a student submits an answer — reframes the concept, never gives the answer. */
export function getHintMessage(conceptReminder) {
  return `Here's a nudge, not the answer: ${conceptReminder}`;
}

// ---------------------------------------------------------------------------
// DASHBOARD GREETINGS (added Aug 8, 2026)
//
// WHY THIS SECTION EXISTS: until now Nova was a lesson-time character. He
// appeared inside the lesson engine — briefing, hints, debrief — and nowhere
// else, so the only trace of him on the rest of the app was his name printed
// on a certificate. The parent went looking for him after he gained a voice
// and reasonably reported "I don't see Nova anywhere."
//
// A companion who only exists once you are already working cannot do the job
// a companion is for. These lines put him on the dashboard, which is the first
// thing seen every morning and the last thing seen after a few days away.
//
// THE MOST IMPORTANT LINES IN THIS FILE ARE THE RETURNING ONES. Every
// long-running system loses people during a gap, and the moment that decides
// whether they come back is the one where they open it again after missing
// time. Guilt closes the app. So these name the absence, refuse to moralize
// about it, and hand back one small thing to do.
// ---------------------------------------------------------------------------

/** The one place the student's name is set for Nova's spoken lines. */
export const STUDENT_NAME = 'Lamar';

/**
 * Deterministic pick — the SAME line for the whole day, then a different one
 * tomorrow.
 *
 * Deliberately NOT random. `choice()` re-rolls on every React render, which
 * meant Nova's debrief text silently rewrote itself mid-screen (fixed in
 * FeedbackPanel the same day). With a voice attached that bug gets worse: a
 * re-render restarts him mid-sentence. Seeding from the date keeps him steady
 * all day and still keeps the app from feeling scripted.
 */
function pickStable(list, seed) {
  if (!list.length) return '';
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return list[h % list.length];
}

const FIRST_DAY = [
  `Welcome to Mission Control, ${STUDENT_NAME}. I'm Commander Nova — I'll be with you the whole way. Every engineer starts at day one; let's get the first one on the board.`,
  `Systems online, ${STUDENT_NAME}. This is day one of a long mission, and I'm glad to be flying it with you. Start anywhere — the first step is the only one that matters today.`
];

const BACK_AFTER_A_WHILE = [
  `Good to see you back, ${STUDENT_NAME}. No lecture, no catch-up speech — pick one small thing and we'll be moving again.`,
  `There you are. Missions pause sometimes; that's normal, even the real ones. Let's start with something short and get the systems warm again.`,
  `Welcome back, ${STUDENT_NAME}. I kept everything exactly where you left it. One task, then we'll see how you feel.`
];

const BACK_AFTER_A_DAY = [
  `Back at it, ${STUDENT_NAME}. Yesterday's gap costs you nothing — let's pick up where we stopped.`,
  `Good to see you. One day off is just a day off. Ready when you are.`
];

const WEEKEND = [
  `It's the weekend, ${STUDENT_NAME} — nothing here is due. If you want to poke at something anyway, I'm around.`,
  `Weekend, cadet. Rest counts toward the mission too. Anything you do today is bonus.`
];

const FRIDAY = [
  `Friday — no new material today. Catch-up, hands-on work, or a field trip. Finish what's open and the time is yours.`,
  `Light day, ${STUDENT_NAME}. Fridays are for closing loops rather than opening new ones.`
];

const MORNING = [
  `Morning, ${STUDENT_NAME}. Systems are green and the board is ready when you are.`,
  `Good morning. Best time to take the hardest thing on the list, while you're fresh.`,
  `Morning, cadet. Let's put a good first hour on the board.`
];

const AFTERNOON = [
  `Afternoon, ${STUDENT_NAME}. Plenty of runway left in the day.`,
  `Good afternoon. Pick the next thing and let's keep it moving.`,
  `Still time on the clock, ${STUDENT_NAME}. What's next?`
];

const STREAK_NOTE = [
  `That's {n} school days in a row — consistency is the part most people can't do.`,
  `{n} straight school days. That streak is worth more than any single good day.`,
  `{n} in a row now. This is exactly how real engineering discipline gets built.`
];

/**
 * Nova's dashboard greeting.
 *
 * Priority is deliberate: an absence outranks everything, because that is the
 * moment the whole system either keeps him or loses him. A streak note is
 * added only when the streak is genuinely notable — praise that arrives every
 * single day stops registering as praise.
 *
 * @param {object} o
 * @param {number|null} o.daysAway    days since last activity (null = never used)
 * @param {number} o.streak
 * @param {string} o.patternKind      'core' | 'buffer' | 'weekend' | 'holiday'
 * @param {boolean} o.isFlex          true on Friday — the open-block day
 * @param {string} o.today            YYYY-MM-DD, used as the stable seed
 * @param {number} o.hour             0-23
 * @param {string} [o.nextUp]         subject label of the first thing on deck
 */
/**
 * A short, factual sentence about what is due in the school week.
 *
 * WHY THIS IS SEPARATE from the greeting lines: the greetings are a stable
 * random pick, so the same day always produces the same words. This is not a
 * flavour line — it is information, and it must be the same information no
 * matter which greeting was drawn.
 *
 * Deliberately never a warning. "Four things due this week, starting with the
 * geometry set on Monday" is a briefing; "you have four things due!" is a
 * nag, and a nag delivered by a character he likes is how you lose the
 * character.
 */
/**
 * Work whose due date has already passed.
 *
 * THE HARD ONE TO WORD. Every natural phrasing of "overdue" shames — you are
 * behind, you are late, you should have. Said by a character he likes, that is
 * how the character stops being someone he wants to hear from, and the voice
 * gets muted a week later.
 *
 * The rule used here: state the fact, name the oldest item, and give him a way
 * back. "Two things are past their due date. The oldest is the lab report from
 * Tuesday — clear that one and the rest follows" is information plus a move.
 * "You are behind on two assignments" is a verdict, and a verdict leaves him
 * nothing to do except feel bad.
 *
 * Deliberately never counts anything he has already finished, and never scales
 * its language with the number: nine items get the same calm sentence as one.
 * An alarm that grows louder as things pile up is exactly the moment a child
 * stops opening the app.
 */
export function overdueLine(overdue) {
  if (!overdue || !overdue.count) return '';
  const { count, oldestLabel, oldestDay } = overdue;
  const one = count === 1;
  const things = one ? '1 thing is' : `${count} things are`;
  const from = oldestDay ? `, from ${oldestDay}` : '';
  if (oldestLabel) {
    // "oldest is X" and "the rest gets easier" both read wrong when there is
    // exactly one — it implies a pile that is not there, which overstates the
    // situation in the one direction this line must never overstate.
    const named = one ? `${oldestLabel}${from}` : `oldest is ${oldestLabel}${from}`;
    const move = one ? 'Clear that and you are clear.' : 'Start there and the rest gets easier.';
    return ` ${things} past the due date — ${named}. ${move}`;
  }
  return one
    ? ' 1 thing is past the due date.'
    : ` ${count} things are past the due date. Pick the oldest one first.`;
}

export function weekAheadLine(weekAhead, lead = 'This week') {
  if (!weekAhead || !weekAhead.count) return '';
  const { count, nextLabel, nextDay } = weekAhead;
  const things = count === 1 ? '1 thing' : `${count} things`;
  // Do not repeat the day if the lead-in already names it: "Starting Monday:
  // 4 things due, next is Geometry, Monday" reads like a stutter.
  const day = nextDay && !lead.toLowerCase().includes(String(nextDay).toLowerCase()) ? `, ${nextDay}` : '';
  if (nextLabel) return ` ${lead}: ${things} due — first is ${nextLabel}${day}.`;
  return ` ${lead}: ${things} due.`;
}

export function getDashboardGreeting({ daysAway, streak = 0, patternKind = 'core', isFlex = false, today = '', hour = 9, nextUp = '', weekAhead = null, overdue = null }) {
  if (daysAway === null || daysAway === undefined) return pickStable(FIRST_DAY, today);
  if (daysAway >= 3) return pickStable(BACK_AFTER_A_WHILE, today);
  if (daysAway === 2) return pickStable(BACK_AFTER_A_DAY, today);
  // The weekend line used to end at "nothing is due" and stop, which on a
  // Saturday is the whole message — exactly when a look at the week ahead is
  // most useful, and the parent asked for it.
  if (patternKind === 'weekend') return pickStable(WEEKEND, today) + overdueLine(overdue) + weekAheadLine(weekAhead, 'Starting Monday');
  // FRIDAY WAS patternKind 'buffer' UNTIL AUG 9 2026. It is a core day now, so
  // the Friday voice is selected by the flex flag instead — same lines, and
  // they still read true: the open block is what they were always about.
  if (patternKind === 'buffer' || isFlex) return pickStable(FRIDAY, today) + overdueLine(overdue) + weekAheadLine(weekAhead);

  let line = pickStable(hour < 12 ? MORNING : AFTERNOON, today);
  if (nextUp) line += ` First up: ${nextUp}.`;
  line += overdueLine(overdue);
  line += weekAheadLine(weekAhead);
  // Only call out a streak that actually means something — every 5 school days.
  if (streak >= 5 && streak % 5 === 0) {
    line += ' ' + pickStable(STREAK_NOTE, today).replace('{n}', String(streak));
  }
  return line;
}
