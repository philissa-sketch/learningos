import { NovaMessage } from '../Mentor/NovaMessage.jsx';

// ---------------------------------------------------------------------------
// NOVA IN THE PARENT DASHBOARD.
// (Built Aug 9, 2026.)
//
// ---- WHAT THIS DELIBERATELY DOES NOT DO ----
//
// It does not compute a to-do list. The Mission Control Board already does
// that, from her real records: past due, days with no offline minutes logged,
// ungraded Khan units and journal entries, unread messages, reward requests
// waiting, and the Declaration of Intent countdown — each with a button that
// jumps to the screen that clears it. It is the default landing section.
//
// A second system answering "what needs doing" would be two to-do lists that
// can disagree, and the moment they disagree she has to work out which one is
// lying. This project has been bitten twice by two copies of one fact; a
// parent's compliance checklist is the worst possible third time.
//
// ---- WHAT IT DOES INSTEAD ----
//
// Orientation. Twenty-eight sections across six groups, and her own words when
// the Board was built were "there are so many tabs, I don't want to miss
// anything." The Board answers *what needs me right now*. Nothing answered
// *what is this screen for, how often do I need it, and how do I know I am
// done* — which is the question you have on the twenty-two sections that are
// not shouting at you.
//
// So: one line per section. What it is, how often it wants her, and what done
// looks like. On the Board itself Nova explains how to read it and then gets
// out of the way rather than repeating its contents aloud.
// ---------------------------------------------------------------------------

/**
 * `cadence` is the honest answer to "how often must I open this?" — and for
 * most of these the honest answer is "rarely", which is worth saying out loud
 * to someone who feels behind on twenty-eight tabs.
 */
const GUIDES = {
  // ---- This Week ----
  'mission-control-board': {
    cadence: 'Start here',
    what: 'Everything actually waiting on you, read live from your records — nothing here is a stored checklist, so an item disappears only when the work behind it is genuinely done. Urgent items sit at the top. If the board is empty, it means it, and you can close the laptop.'
  },

  // ---- Every Day ----
  attendance: {
    cadence: 'Daily, 2 minutes',
    what: 'App time is measured automatically; offline hours are not. Khan work, reading, field trips and anything away from the screen count as zero until you enter them here — and that is the number Georgia’s 180 days is built from.'
  },
  'coming-up': {
    cadence: 'Daily glance',
    what: 'Everything with a due date, soonest first, including what has already slipped. This is where the board’s "past due" button lands you.'
  },
  'mission-comms': {
    cadence: 'When the badge shows',
    what: 'Two-way messages with him. The red count is his unread messages to you — it clears when you open the thread, not when you reply.'
  },

  // ---- Grading ----
  'khan-academy': {
    cadence: 'Weekly',
    what: 'Khan units he has finished, waiting for a percentage. Grading here is what moves them off the board and into the gradebook.'
  },
  gradebook: {
    cadence: 'Weekly',
    what: 'Every grade in one table, by subject. Read-only — grades are entered where the work lives, not here.'
  },
  'writing-journal': {
    cadence: 'Weekly',
    what: 'His journal entries awaiting a letter grade. Ungraded entries stay on the board until you clear them.'
  },
  'academic-success-center': {
    cadence: 'Weekly',
    what: 'Books and major assignments — the parent side of the same Center he uses. Completed assignments wait here for a grade.'
  },
  'mission-evaluations': {
    cadence: 'Once a quarter',
    what: 'The end-of-quarter write-up. It drafts from real data and you edit it; nothing is submitted anywhere, it is for your own record.'
  },

  // ---- Planning ----
  planner: {
    cadence: 'Weekly, 10 minutes',
    what: 'Where you create assignments with real due dates. Anything you add here appears on his schedule and in Nova’s week-ahead briefing.'
  },
  'year-plan': {
    cadence: 'Once a quarter',
    what: 'The shape of the whole school year — quarters, what each one covers. Worth opening when a quarter turns.'
  },
  'field-trips': {
    cadence: 'Monthly',
    what: 'Trips with dates, costs and travel times, seeded with real Georgia venues. Marking one complete records learning hours and writes a Portfolio entry automatically.'
  },
  'pe-fitness-nutrition': {
    cadence: 'Weekly glance',
    what: 'His workouts, meals, trackers and growth check-ins. You are reading, not entering — he logs it. Exercise demo videos are set here too.'
  },
  readiness: {
    cadence: 'When you see it',
    what: 'Eleven engineering skills at Bronze, Silver or Gold, awarded by you when you watch him actually do it. Each level has written criteria so you are not grading from memory. This is the most college-relevant record in the app.'
  },
  'rewards-manager': {
    cadence: 'When requests arrive',
    what: 'Create real-world rewards and approve or deny what he requests. Denying refunds his coins. Cosmetic purchases never appear here — those cost you nothing and clear instantly.'
  },

  // ---- Records & Reports ----
  'report-card': {
    cadence: 'Once a quarter',
    what: 'A printable report card from grades already entered. Nothing to fill in.'
  },
  'weekly-report': {
    cadence: 'Friday, if you want it',
    what: 'What the week actually contained — lessons, writing, attendance. Useful for a portfolio review or a conversation with him.'
  },
  analytics: {
    cadence: 'Monthly',
    what: 'Patterns rather than totals: where he is fast, where he stalls, which subjects are quietly slipping. Look for trends, not single bad days.'
  },
  compliance: {
    cadence: 'Monthly, and every September',
    what: 'Georgia’s requirements — the Declaration of Intent deadline, the 180-day count, and the packet you would hand someone who asked. The deadline is computed, never hardcoded.'
  },
  records: {
    cadence: 'As needed',
    what: 'Immunisation, testing and other administrative records you keep by hand.'
  },
  'course-descriptions': {
    cadence: 'Once a year',
    what: 'Written descriptions of each course, for a transcript. Tedious once, then done.'
  },
  'reading-log': {
    cadence: 'Monthly',
    what: 'Everything he has read, with dates. Feeds the reading badges and the Sensors system on his ship.'
  },
  // Added Aug 9, 2026 with the section itself. Word study was the one daily
  // strand of his English Language Arts that appeared in no record anywhere,
  // so there was nothing here to explain.
  // Added Aug 9, 2026 with the section itself.
  'science-courses': {
    cadence: 'Once a quarter, or whenever the plan looks short',
    what: 'The four Khan science courses side by side, every unit, and which quarter it falls in. Read it when a quarter looks light: Biology runs all year while a second course rotates beside it, so one quarter routinely holds units from two courses. It also links the teacher unit guides Khan writes for you, which are not part of his work.'
  },
  'word-study': {
    cadence: 'Weekly, on a Friday',
    what: 'Ten spelling words and ten vocabulary words a week, on a fixed seven-day rotation. Anything he misses on Friday carries into next week and new words backfill to ten, so the list always shows what he has not got yet. He does this four or five days a week and until now it reached no record at all.'
  },
  portfolio: {
    cadence: 'Monthly',
    what: 'Completed work gathered from the journal, the Academic Center and your own logged projects. This is the evidence a transcript cannot show on its own.'
  },
  notes: {
    cadence: 'Whenever something happens',
    what: 'Your written observations. The board tells you when it has been a while — these are what a portfolio review is built from, and nobody remembers a term accurately.'
  },

  // ---- Settings ----
  voice: {
    cadence: 'Once',
    what: 'How I sound, and whether I speak at all. The voice list comes from this computer, so his machine has its own — he picks his own there.'
  },
  passcode: {
    cadence: 'Once',
    what: 'The passcode on this dashboard. It keeps his side and your side separate on a shared machine — it is not security, and it is not meant to be.'
  },
  sync: {
    cadence: 'Weekly, Friday',
    what: 'Export from here, import on his machine, and back again. This is the only way his work and your grades meet. Nothing syncs automatically, so a week without an export is a week only one computer knows about.'
  },
  danger: {
    cadence: 'Almost never',
    what: 'Permanent things — resetting progress, clearing data. Export first, always. Nothing here can be undone once it is done.'
  }
};

/**
 * One short line per section.
 *
 * Renders nothing for a section with no entry rather than inventing filler —
 * a wrong explanation is worse than none in a compliance record.
 */
export function NovaParentGuide({ section }) {
  const guide = GUIDES[section];
  if (!guide) return null;

  return (
    <div className="mb-4">
      <NovaMessage tone="brief" speak={guide.what}>
        <span className="inline-block rounded-full border border-signal-cyan/40 bg-signal-cyan/10 px-2 py-0.5 text-[10px] font-display uppercase tracking-widest text-signal-cyan">
          {guide.cadence}
        </span>
        <p className="mt-2 text-sm leading-relaxed text-ink-200">{guide.what}</p>
      </NovaMessage>
    </div>
  );
}

export const NOVA_PARENT_SECTION_IDS = Object.keys(GUIDES);
