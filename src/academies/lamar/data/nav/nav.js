// ---------------------------------------------------------------------------
// THIS ACADEMY'S NAVIGATION.
//
// The platform hardcoded this list until Sept 9, 2026. It does not any more —
// a tab belonging to one school was a tab every school received, and a school
// had no way to add one of its own. So each Academy states its own, and this
// file is this Academy's answer.
//
// Every id must be a screen the shell can render; `verify-nav-declared.mjs`
// checks that. `verify-academy-reach.mjs` checks that nothing here quietly
// disappears again.
//
// ---- THE GROUPING, AND WHY IT IS THIS GROUPING ----
//
// By cadence, not topic, because cadence is what a parent navigates by. The
// reasoning moved here with the list, from the platform where it used to live:
//
//   Learn     - the subject content actually studied from
//   Practice  - skill reps and low-stakes play, not graded subject content
//   Plan      - looking back, looking ahead, and the work that is coming
//
// Morning Meeting sits FIRST, above the home screen, on purpose: it is the
// first block of the day, and a morning routine three items down is a morning
// routine that gets skipped.
//
// Garden and Guitar sit in Learn beside PE & Nutrition because those three are
// this school's PARTICIPATION subjects - real work recorded by what was done
// rather than graded.
// ---------------------------------------------------------------------------

export const navSchoolName = 'MISSION CONTROL';
export const navSchoolTagline = 'Homeschool Academy';

export const navGroups = [
  {
    id: 'learn',
    label: 'Learn',
    tabs: [
      { id: 'morning', label: 'Morning Meeting' },
      { id: 'dashboard', label: 'Mission Control' },
      { id: 'lessons', label: 'Lesson Roster' },
      { id: 'pe', label: 'PE & Nutrition' },
      { id: 'garden', label: 'Garden' },
      { id: 'guitar', label: 'Guitar' }
    ]
  },
  {
    id: 'practice',
    label: 'Practice',
    tabs: [
      { id: 'journal', label: 'Writing Journal' },
      { id: 'typing', label: 'Typing' },
      { id: 'games', label: 'Games' },
      { id: 'rewards', label: 'Rewards' }
    ]
  },
  {
    id: 'plan',
    label: 'Plan',
    tabs: [
      { id: 'progress', label: 'Progress' },
      { id: 'schedule', label: 'Schedule' },
      { id: 'academic', label: 'Academic Center' }
    ]
  }
];

export const navParentTab = { id: 'parent', label: 'Parent Dashboard' };
