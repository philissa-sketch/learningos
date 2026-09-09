// ---------------------------------------------------------------------------
// THE TEMPLATE — what every Academy inherits.
//
// Written by hand, not generated. The generator builds an ACADEMY's manifest
// from its own files; this is the other side of that contract, and every line
// in it is a decision about what is generic.
//
// ---- THE RULE FOR PUTTING SOMETHING HERE ----
//
// It belongs here if it would be true for a child studying anything at all. If
// it would look wrong in the folder of a learner whose subjects you have never
// thought about, it is not generic — it is one Academy's answer wearing a
// neutral name, and it belongs in that Academy's folder.
//
// ---- WHAT IS DELIBERATELY ABSENT ----
//
// `subjects` and `lessons`. The loader refuses a template that fills either,
// and the reason is worth keeping in front of whoever adds to this file: a
// default curriculum is not a gentler fallback, it is a school made of nothing
// that still opens. It would hide the exact state the Empty and Configured
// screens exist to show a family. Those two come from a real Academy or not at
// all.
//
// ---- HOW IT MERGES ----
//
// Slot by slot, name by name — an Academy's own answers land on top of these,
// and anything it does not mention it keeps. So an Academy can supply one line
// pool of its own without losing the rest of the guide.
// ---------------------------------------------------------------------------

import { getDailyLine } from './guide/dailyLines.js';

/**
 * The guide, before anybody writes one.
 *
 * §3b: a new Academy must have a guide who doesn't repeat on day one. An
 * Academy that later writes its own lines overrides `getDailyLine` and this
 * disappears behind it.
 */
export const guide = { getDailyLine };

/**
 * The look, before anybody designs one.
 *
 * Loaded as a function so the stylesheet travels in the chunk that needs it
 * rather than every learner's download — same reason as an Academy's own theme.
 *
 * An Academy that ships `academy.css` replaces this entirely. One that does not
 * gets a plain, readable school rather than a white page, which is what makes
 * the Configured state survivable while a family is still setting up.
 */
export const theme = { load: () => import('./theme/template.css') };


/**
 * The navigation, before an Academy declares its own.
 *
 * Every entry here is a screen the PLATFORM provides, so every one of them is
 * true for a child studying anything at all. An Academy that teaches something
 * of its own — an elective, a domain, a subject with its own screen — declares
 * that entry in its own manifest and it lands on top of this.
 *
 * The rule for adding a line: if the tab would look wrong in the folder of a
 * learner whose subjects you have never thought about, it is not generic. A
 * garden, an instrument, a named school: none of those belong here.
 *
 * Ids must be views the shell can render. `verify-nav-declared.mjs` checks
 * every id against what App.jsx switches on, so a typo is a failed build
 * rather than a tab that does nothing.
 *
 * ---- WHY THE GROUPS ARE DECLARED ABOVE THE SLOT, NOT INSIDE IT ----
 *
 * A slot is read as a flat bag of names. `verify-content-interface` matches
 * a slot export up to its first closing brace, so an object
 * nested directly inside the export would be read as content names and the
 * check would report the insides of a tab as unused defaults. The shape below
 * keeps the slot flat, which is the convention every other slot already
 * follows.
 */
const GENERIC_GROUPS = [
  {
    id: 'learn',
    label: 'Learn',
    tabs: [
      { id: 'morning', label: 'Morning Meeting' },
      { id: 'dashboard', label: 'Today' },
      { id: 'lessons', label: 'Lesson Roster' },
      { id: 'pe', label: 'PE & Nutrition' }
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

const GENERIC_PARENT_TAB = { id: 'parent', label: 'Parent Dashboard' };

/**
 * The school's own name, shown in the nav bar.
 *
 * Blank on purpose. An Academy that has not named itself shows no name rather
 * than someone else's, which is the same rule every other blank slot follows.
 * If a fuller identity slot is ever added — a name for reports and the records
 * packet as well as the nav bar — it takes these two over and they leave here.
 */
export const nav = {
  navGroups: GENERIC_GROUPS,
  navParentTab: GENERIC_PARENT_TAB,
  navSchoolName: '',
  navSchoolTagline: ''
};
