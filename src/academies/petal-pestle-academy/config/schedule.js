// ---------------------------------------------------------------------------
// HER SCHOOL DAY.
//
// Built like Lamar's, with a bell — the grandmother's instruction, word for
// word. His app rings between blocks and it is the single thing that makes a
// homeschool day feel like a school day rather than a long afternoon that never
// formally starts or ends.
//
// ---- WHY THESE TIMES ----
//
// This was a FOUR-HOUR instructional day. On Aug 13 Gigi asked for hour-long
// blocks on Maths, Reading and Language Arts & Writing. That is +90 minutes,
// so it is now a 345-minute day — 5h45 of teaching, running 9:00 to 3:55 once
// the three breaks are counted, four days a week.
//
// The arithmetic is not negotiable and is worth stating plainly: three subjects
// at an hour each is three hours before her own course, Science, Social
// Studies, the Journal or Morning Circle get any time at all. A four-hour day
// and three hour-long core blocks cannot both be true.
//
// For comparison, her brother's day is 5h15 of instruction across 08:30–16:45.
// Hers is now slightly more teaching in a shorter elapsed day, which is why a
// third break was added rather than leaving her one gap between lunch and home.
//
// Those two numbers are kept separate on purpose, and scripts/check-schedule.mjs
// verifies the first one. The initial draft of this file claimed four hours and
// contained three hours twenty, because breaks had quietly been counted toward
// the total. An hours figure that might one day be copied onto a state form has
// to be instruction only.
//
// Four focused hours is not a shortcut. Homeschooling a nine-year-old one-to-one
// removes almost everything a classroom spends its day on — roll, transitions,
// waiting for twenty-nine other children, re-explaining to the room. Four
// focused hours at a kitchen table covers what a school day covers, and every
// state that sets an hours requirement for home instruction is comfortably met
// by it.
//
// THE ONE THING WORTH WATCHING. A nine-year-old's genuine focus runs about
// twenty to thirty minutes. A sixty-minute block is not sixty minutes of focus
// — it is two or three shorter goes with something in between, and it only
// works if whoever is sitting with her treats it that way. Khan's own units
// break naturally at about that length, so the hour holds up if it is used as
// two units and a stretch rather than one long sitting.
//
// ---- WHAT IS AND IS NOT SCHEDULED ----
//
// The five Khan subjects get real blocks. The app's own courses get real
// blocks. The participation subjects — Singing, Movement, Garden, Kitchen —
// get blocks too, because a thing with no time on the timetable does not
// happen, and those are the parts she will remember in twenty years.
//
// This is a STARTING POINT, not a rule. Every block is editable in the Grown-Up
// Corner: rename it, move it, change the length, delete it, add your own. The
// default exists so that day one does not begin with a blank page.
// ---------------------------------------------------------------------------

/**
 * A block is: { id, label, icon, start (24h "HH:MM"), minutes, kind, subject }
 *
 * `subject` is what the block OPENS — see lib/blockLinks.js. Without it a block
 * is a label on a timetable and she has to go and find the lesson herself,
 * which is six steps a nine-year-old will not take. Breaks and Singing have no
 * subject on purpose: there is nothing on a screen for them.
 *
 * kind drives nothing but colour and the Grown-Up Corner's grouping:
 *   'core'    — a Khan subject
 *   'signature' — Herbalism & Botany, or The Human Body
 *   'doing'   — participation: singing, movement, garden, kitchen
 *   'break'   — not instruction, and not counted as such
 *   'open'    — journal, reading, her own choosing
 */
export const DEFAULT_SCHEDULE = [
  {
    id: 'blk-open',
    subject: 'notes',
    label: 'Morning Circle',
    icon: '🌅',
    start: '09:00',
    minutes: 15,
    kind: 'open',
    note: 'Read Gigi and Mom’s notes, look at the day, water something.'
  },
  {
    id: 'blk-math',
    subject: 'math',
    label: 'Mathematics',
    icon: '🔢',
    start: '09:15',
    minutes: 60,
    kind: 'core',
    note: 'Khan Academy — the unit on My Plan.'
  },
  {
    id: 'blk-reading',
    subject: 'reading',
    label: 'Reading',
    icon: '📖',
    start: '10:35',
    minutes: 60,
    kind: 'core',
    note: 'Khan Academy, then read anything she likes.'
  },
  {
    id: 'blk-break1',
    label: 'Snack & Move',
    icon: '🍎',
    start: '10:15',
    minutes: 20,
    kind: 'break',
    note: 'Outside if the weather allows.'
  },
  {
    id: 'blk-writing',
    subject: 'writing',
    label: 'Language Arts & Writing',
    icon: '✏️',
    start: '12:10',
    minutes: 60,
    kind: 'core',
    note: 'Khan Academy for grammar and mechanics.'
  },
  {
    id: 'blk-herbalism',
    subject: 'herbalism',
    label: 'Herbalism & Botany',
    icon: '🌿',
    start: '13:10',
    minutes: 45,
    kind: 'signature',
    note: 'Her signature course. Hands in the dirt where possible.'
  },
  {
    id: 'blk-lunch',
    label: 'Lunch',
    icon: '🥣',
    start: '11:35',
    minutes: 35,
    kind: 'break',
    note: 'Kitchen herbs count as school on the days she cooks.'
  },
  {
    // ADDED WITH THE HOUR-LONG CORE BLOCKS (v3.2). Three sixty-minute subjects
    // pushed everything else into the afternoon, and the old day had her going
    // from lunch to home time on one break. She is nine. A fourteen-hundred
    // start on Science after ninety minutes of solid work is a block that
    // happens on paper and not in the room.
    id: 'blk-break2',
    label: 'Stretch & Reset',
    icon: '🌤️',
    start: '13:55',
    minutes: 15,
    kind: 'break',
    note: 'Get up, go outside, look at something green.'
  },
  {
    id: 'blk-science',
    subject: 'science',
    // v3.42: was 'Science'. §4 of the master plan has called this block
    // "The Science Lab" since v3.24 and the link beneath it now says so too.
    // A block whose name and whose link disagree is the smaller version of the
    // fault this version exists to fix.
    label: 'The Science Lab',
    icon: '🔬',
    start: '14:10',
    minutes: 30,
    kind: 'core',
    // v3.5 — this block ALTERNATES BY QUARTER, declared in config/curriculumPlan.js
    // and enforced by scripts/check-curriculum-volume.mjs, which fails if the two
    // courses ever claim the same quarter or leave one empty.
    //
    //   Q1, Q3  The Science Lab — the Georgia standards a garden cannot reach:
    //           forces, gravity, simple machines, light, sound, stars, the moon.
    //   Q2, Q4  The Human Body — ENRICHMENT, and labeled that way on purpose. No
    //           Georgia fourth-grade standard covers the human body; cells and
    //           inherited traits are fifth grade. It stays because it is the course
    //           she opens the app for, and it is not counted as her science.
    //
    // Alternating by quarter rather than by day keeps the three-lessons-then-a-
    // review-day week intact for both. Alternating by day would give each course
    // two lessons a week and no week at all.
    note: 'The Science Lab (Q1, Q3). Open for the garden and her projects in Q2 and Q4 — The Human Body moved to the 2:45 rotating block at v3.22.'
  },
  {
    // ---- THIS BLOCK CHANGES SUBJECT BY DAY (v3.22) ----
    //
    // Gigi: "I will like social studies and the human body to be 2 days a week.
    // They can rotate ex. mon social studies, tues Human Body, etc."
    //
    //   Mon  Social Studies      Tue  The Human Body
    //   Wed  Social Studies      Thu  The Human Body
    //   Fri  catch-up, as every block is
    //
    // The label and icon stored here are the MONDAY ones and are resolved at
    // render time by src/lib/rotatingBlock.js — this is one day template reused
    // Monday to Friday, so no stored string can be right on more than one day.
    // Her brother's app hit the same wall and solved it the same way.
    //
    // What it bought: Social Studies went from 96 lessons to 64, and The Human
    // Body stopped sitting idle for two quarters of every year.
    id: 'blk-social',
    subject: 'social',
    rotating: true,
    label: 'Social Studies',
    icon: '🌍',
    start: '14:40',
    minutes: 30,
    kind: 'core',
    // NOT Khan. Khan Academy has no elementary social studies at all — their
    // own support desk says so, and their SY26-27 content announcement covers
    // only US History and US Government & Civics, both high-school courses.
    // This block has no lesson behind it until the app grows one. The Grown-Up
    // Corner says that rather than sending a nine-year-old to a course written
    // for a seventeen-year-old.
    note: 'Mon & Wed Social Studies · Tue & Thu The Human Body. The app teaches both — Khan has no elementary social studies at all.'
  },
  {
    // The Journal gets its own block, not a corner of the writing block. A
    // feature with no time on the timetable does not happen — which is the
    // same rule check-schedule.mjs applies to the five core subjects.
    id: 'blk-journal',
    subject: 'journal',
    label: 'Journal & Quiet Reading',
    icon: '📓',
    start: '15:10',
    minutes: 30,
    kind: 'open',
    note: 'Write an entry, then read whatever she wants.'
  },
  {
    id: 'blk-doing',
    label: 'Singing & Movement',
    icon: '🎵',
    start: '15:40',
    minutes: 15,
    kind: 'doing',
    note: 'Singing most days, yoga most days. Not graded, not optional.'
  }
];

/**
 * THE NUMBER THE PLAN PROMISES, in one place.
 *
 * The master plan, the Grown-Up Corner's printed total and check-schedule.mjs
 * all read this. Before v3.2 the check hard-coded "about four hours" and the
 * plan said the same thing in prose — two copies of a fact that can drift, and
 * the kind of number that could end up on a state form.
 *
 * Aug 13: Gigi asked for hour-long Maths, Reading and Language Arts blocks.
 * That is +90 minutes, so 240 became 340. The honest response was to change
 * this constant and let the check hold the rest of the app to it — not to widen
 * the check until the failure went away.
 */
// v3.3 — the Herbalism block grew from 40 to 45 so it matches the §10 lesson
// specification (5 + 12 + 20 + 8). The alternative was cutting the Activity to
// 15, and the Activity is the twenty minutes she is away from the screen with
// her hands in something. That was the wrong thing to shorten to protect a
// round number. Everything after 1:55 shifted five minutes later.
export const PROMISED_INSTRUCTIONAL_MINUTES = 345;

/** "09:15" -> 555. Minutes since midnight, for sorting and bell timing. */
export function toMinutes(hhmm) {
  const m = /^(\d{1,2}):(\d{2})$/.exec(String(hhmm || '').trim());
  if (!m) return null;
  const h = Number(m[1]);
  const min = Number(m[2]);
  if (h < 0 || h > 23 || min < 0 || min > 59) return null;
  return h * 60 + min;
}

/** 555 -> "9:15 AM". Twelve-hour, because she is nine. */
export function toClock(minutes) {
  if (minutes == null) return '';
  const h24 = Math.floor(minutes / 60) % 24;
  const m = minutes % 60;
  const period = h24 < 12 ? 'AM' : 'PM';
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h12}:${String(m).padStart(2, '0')} ${period}`;
}

/** Blocks in clock order, each with start/end in minutes. Never mutates input. */
export function orderedBlocks(blocks) {
  return (blocks || [])
    .map((b) => {
      const startMin = toMinutes(b.start);
      const mins = Math.max(1, Math.floor(Number(b.minutes) || 0));
      return { ...b, startMin, endMin: startMin == null ? null : startMin + mins, minutes: mins };
    })
    .filter((b) => b.startMin != null)
    .sort((a, b) => a.startMin - b.startMin);
}

/** Which block is running at a given wall-clock minute, or null between them. */
export function blockAt(blocks, nowMinutes) {
  return orderedBlocks(blocks).find((b) => nowMinutes >= b.startMin && nowMinutes < b.endMin) || null;
}

/** Instructional minutes — breaks excluded, because a records page that counts
 *  lunch as instruction is not a record anyone should file. */
export function instructionalMinutes(blocks) {
  return orderedBlocks(blocks)
    .filter((b) => b.kind !== 'break')
    .reduce((sum, b) => sum + b.minutes, 0);
}

export const KIND_STYLES = {
  core: { chip: 'bg-lavender-300/40 text-lavender-700', dot: '#8E6FC6', label: 'Khan' },
  signature: { chip: 'bg-sage-300/40 text-sage-700', dot: '#4F7A4B', label: 'Her course' },
  doing: { chip: 'bg-blush-300/40 text-blush-700', dot: '#E88AA0', label: 'Doing' },
  break: { chip: 'bg-cream-200 text-ink-500', dot: '#CFC8C0', label: 'Break' },
  open: { chip: 'bg-gold-300/40 text-gold-700', dot: '#D9A82F', label: 'Open' }
};
