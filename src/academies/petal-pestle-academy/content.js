// ---------------------------------------------------------------------------
// THIS ACADEMY'S ANSWER TO THE CONTENT CONTRACT.
//
// ---- WRITTEN BY HAND, AND WHY THAT IS NOT A MISTAKE ----
//
// The other manifest in this repository says "GENERATED — do not edit by hand"
// at the top. This one is the opposite, deliberately.
//
// scripts/generate-academy-manifest.mjs matches BY NAME: it takes each name the
// school asks for and looks for a module in the Academy folder that exports
// something called that. That works when a folder already speaks the school's
// vocabulary. This folder does not. Run against it, the generator finds two
// names out of a hundred and sixty-two — `getDailyLine` and `strandsForSubject`
// — not because the content is missing but because it is called something else.
//
// So this file is the translation, and translation is what the manifest was
// always for. src/content/academyContent.js says it plainly: the manifest
// "lives in the Academy's own folder because the adapting is that Academy's
// business."
//
// ---- THE RULE FOR EDITING THIS FILE ----
//
// Everything below reads out of THIS folder. Nothing reaches into another
// Academy, and nothing invents a value to satisfy a name. Where the school asks
// for something this Academy genuinely does not have, the answer is absence —
// the slot is left unfilled and the screen that needed it does not render. A
// slot filled with a plausible-looking empty is worse than a blank one, because
// blank is visible and plausible is not.
// ---------------------------------------------------------------------------

import { SUBJECTS, SUBJECT_ORDER, STRANDS } from './config/strands.js';
import { APP_COURSES } from './config/curriculumPlan.js';
import { DEFAULT_SCHEDULE } from './config/schedule.js';
import { SCHOOL_YEAR, periodFor } from './config/calendar.js';
import { getDailyLine } from './data/mentor/marigoldLines.js';
import { ALL_LESSONS } from './data/lessons/appCourses.js';
import { toEngineShapeAll } from './data/lessons/toEngineShape.js';
import { allItems, itemsForStrand, getItem, bankSummary } from './data/diagnostic/index.js';
import { WEEKS, allWeeks, weekById, weekForLesson, weekTestReady, BANDS, bandFor } from './config/assessment.js';
import {
  ALL_BANK_ITEMS,
  BANKS,
  allBankItems,
  itemsForLesson,
  itemsForLessons,
  bankItemById,
  courseOfQuestion
} from './data/assessments/appBank.js';

/* ==========================================================================
 * DATES
 *
 * The school hands these helpers a `Date` in some places and a 'YYYY-MM-DD'
 * string in others — both shapes appear at real call sites. Normalised once,
 * here, rather than each helper below guessing.
 *
 * Local, never UTC. `toISOString()` on a Date built from local midnight can
 * roll a day backwards west of Greenwich, which is how a school day quietly
 * becomes a weekend for one timezone.
 * ======================================================================== */
function dayKey(value) {
  if (!value) return null;
  if (typeof value === 'string') return value.slice(0, 10);
  const d = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function weekdayOf(value) {
  if (value instanceof Date) return value.getDay();
  const key = dayKey(value);
  return key ? new Date(`${key}T00:00:00`).getDay() : null;
}

/* ==========================================================================
 * SUBJECTS
 *
 * Two different things in this folder are both "a subject", and the school
 * needs them merged into one list.
 *
 *   config/strands.js SUBJECTS   — the two the DIAGNOSTIC measures: maths and
 *                                  reading & writing. These are the ones that
 *                                  carry strands and levels.
 *   config/curriculumPlan.js     — the four COURSES this school teaches:
 *   APP_COURSES                    Herbalism & Botany, The Science Lab, The
 *                                  Human Body, Social Studies.
 *
 * They are not the same set and neither is a subset of the other. A course is
 * taught here and has lessons; a diagnostic subject is placed by a check-in and
 * is taught elsewhere, at a level her record decides. The school's `subjects`
 * slot wants both, which is why this is a merge rather than a rename.
 * ======================================================================== */

/** Course id -> title, and diagnostic subject id -> label, in one map. */
const SUBJECT_LABELS = {
  ...Object.fromEntries(SUBJECT_ORDER.map((id) => [id, SUBJECTS[id].label])),
  ...Object.fromEntries(APP_COURSES.map((c) => [c.id, c.title]))
};

/**
 * Order matters on screen: the signature course first, then the rest of the
 * taught courses, then the two placed subjects. Derived from `signature` in
 * curriculumPlan.js rather than typed, so renaming a course cannot leave a
 * stale list behind.
 */
const COURSE_IDS = [
  ...APP_COURSES.filter((c) => c.signature).map((c) => c.id),
  ...APP_COURSES.filter((c) => !c.signature).map((c) => c.id)
];

const ACTIVE_SUBJECTS = [...COURSE_IDS, ...SUBJECT_ORDER];

/** The courses whose lessons run through the LessonEngine in this app. */
const LESSON_TRACK_SUBJECTS = COURSE_IDS;

/** The two placed by the check-in and taught on an outside course provider. */
const KHAN_TAUGHT_SUBJECTS = [...SUBJECT_ORDER];

/**
 * Participation subjects — taught, attended, never graded.
 *
 * EMPTY, AND THAT IS A STATEMENT. This school's movement and journal work is
 * real and daily, but neither is filed as a subject with a grade attached: the
 * Journal is explicitly never graded and never corrected, and movement is a
 * ladder she climbs rather than a course she sits. An empty array here says
 * "asked and answered"; leaving the name off would say "nobody looked yet".
 */
const PARTICIPATION_SUBJECTS = [];

/**
 * One spelling for a subject.
 *
 * The schedule calls the reading block `reading` and the diagnostic calls the
 * subject `ela`; both mean the same subject and a record that files them apart
 * counts her work twice. Every id this school uses is lower case, so it asks
 * the platform to fold spellings before looking them up.
 *
 * These were three functions until Sept 21, 2026. The lookups now live in
 * src/content/slots/subjects.js; what stays here is this school's own table.
 */
const SUBJECT_ALIASES = {
  reading: 'ela',
  writing: 'ela',
  english: 'ela',
  mathematics: 'math',
  maths: 'math'
};
const SUBJECT_ID_CASE = 'lower';

export const subjects = {
  ACTIVE_SUBJECTS,
  KHAN_TAUGHT_SUBJECTS,
  LESSON_TRACK_SUBJECTS,
  PARTICIPATION_SUBJECTS,
  SUBJECT_LABELS,
  SUBJECT_ALIASES,
  SUBJECT_ID_CASE,
  STRANDS
};

/* ==========================================================================
 * LESSONS
 *
 * Adapted at the boundary rather than in the files. The lessons on disk are the
 * ones that were written — with their reasoning above them and their fields
 * under their own names — and `toEngineShape` renames what the engine needs
 * renamed on the way through. See that file for why this is not 256 edits.
 *
 * Mapped once, at module load, rather than per render: `allLessons` is read all
 * over the school, and re-deriving 256 objects on every read would allocate a
 * new array each time and defeat every memo downstream of it.
 * ======================================================================== */

export const lessons = { allLessons: toEngineShapeAll(ALL_LESSONS) };

/* ==========================================================================
 * TIMETABLE
 *
 * ---- TWO CALENDARS THAT DISAGREE ABOUT WHAT A YEAR IS ----
 *
 * The school asks for a WEEK PATTERN and a HOLIDAY LIST: which subjects fall on
 * which weekday, and which named days are off.
 *
 * This Academy keeps neither, on purpose. Its year is five PERIODS with a
 * declared school-day count each, and config/calendar.js says why a holiday
 * list was refused: the long breaks here run at three days a week rather than
 * closing, the dates are not written down, and "a wrong list would be worse
 * than an honest approximation."
 *
 * So the adapters below derive what the school needs from what this Academy
 * actually knows, and where it knows nothing they say so rather than inventing
 * a plausible answer. `holidaysInSpan` returning an empty array is the honest
 * shape of "this school does not keep that list", and it is the one place a
 * reader should look if a break ever needs naming on a screen.
 * ======================================================================== */

const WEEKEND = { kind: 'weekend' };

/* ==========================================================================
 * THIS SCHOOL NAMES ITS TERMS; IT DOES NOT NAME ITS DAYS OFF. (Sept 22, 2026.)
 *
 * `dayPattern`, `subjectsForDay`, `isSchoolDay`, `isHoliday`, `holidaysInSpan`
 * and this folder's own `patternSubjects` were six functions here until the
 * timetable slot took them. A stored Academy cannot hold a function, and every
 * one of them was this school's CALENDAR expressed as code.
 *
 * What it answers with instead:
 *
 *   TERMS               the dated blocks it teaches in — a weekday outside
 *                       every one of them is a day off. `daysPerWeek: 3` on
 *                       the summer term is what the platform reads as `flex`.
 *   OUTSIDE_TERM_LABEL  what a day outside the terms is called on a screen.
 *   SUBJECTS_BY_TERM    which courses run in which term, worked out from the
 *                       plan rather than typed, so renaming a course cannot
 *                       leave a stale list behind.
 *   SCHOOL_HOLIDAYS     ABSENT, AND THAT IS A STATEMENT. This school files its
 *                       breaks as the gaps between terms rather than as named
 *                       days. A screen that wants to print a holiday name will
 *                       find nothing, and the right fix is a decision about
 *                       this school's calendar, not a list typed in here.
 * ======================================================================== */

const TERMS = SCHOOL_YEAR.periods;
const OUTSIDE_TERM_LABEL = 'Outside the school year';

/**
 * The subjects each term teaches.
 *
 * Filtered by the quarter each course actually runs in — The Science Lab is
 * quarters 1 and 3, Social Studies is 1 to 3, Herbalism is all four. The two
 * placed subjects run throughout, so they are on every term.
 */
const SUBJECTS_BY_TERM = Object.fromEntries(
  TERMS.map((term) => {
    const quarter = Number(String(term.id).replace(/[^0-9]/g, ''));
    const courses = Number.isFinite(quarter) && quarter > 0
      ? APP_COURSES.filter((c) => c.quarters.includes(quarter))
      : APP_COURSES;
    return [term.id, [...courses.map((c) => c.id), ...SUBJECT_ORDER]];
  })
);

/**
 * The week, Sunday first, indexed the way `Date.getDay()` counts.
 *
 * Every weekday is the same shape because this school's timetable does not
 * rotate — config/schedule.js is one ordered list of blocks that runs each day,
 * and the variation is inside a block rather than between days. A school that
 * rotates subjects by weekday fills these five entries differently; this one
 * genuinely does not, and saying so is more accurate than manufacturing five
 * identical-but-distinct entries.
 */
const WEEK_PATTERN = [
  WEEKEND,
  { kind: 'core' },
  { kind: 'core' },
  { kind: 'core' },
  { kind: 'core' },
  { kind: 'core' },
  WEEKEND
];

export const timetable = {
  WEEK_PATTERN,
  TERMS,
  OUTSIDE_TERM_LABEL,
  SUBJECTS_BY_TERM,
  defaultSchedule: DEFAULT_SCHEDULE,
  // This Academy's own, carried for the screens that are hers.
  //
  // `periodFor` left on Sept 22, 2026. It was a function in a slot a stored
  // school has to be able to fill, nothing outside this file called it, and
  // the platform now answers the same question from TERMS — `termFor` in
  // src/content/slots/timetable.js. config/calendar.js still exports it for
  // this folder's own use.
  SCHOOL_YEAR
};

/* ==========================================================================
 * SCHOOL YEAR (Sept 22, 2026)
 *
 * Until today this school had no answer here and inherited another school's:
 * its first day and its quarter names, typed into the platform's quarter
 * logic. The platform now asks — src/content/slots/schoolYear.js — and this
 * school answers from config/calendar.js, the same dated periods TERMS uses.
 *
 * FIRST_DAY is the calendar's own start. Each period's months are read off its
 * start and end dates, never typed, so moving a date in the calendar moves the
 * period with it.
 *
 * ---- WHY THE IDS ARE 'Q1'..'Q4' AND 'Summer', NOT THE CALENDAR'S 'q1' ----
 *
 * A period id is written into saved rows as the start of their label
 * ('Q1 2026-2027', 'Summer 2027'). Every row the platform has written for this
 * school so far used the inherited ids, so the answer keeps them: a lower-case
 * id would leave every existing row unrecognised. The labels are this
 * school's own.
 * ======================================================================== */

const ROW_IDS = { q1: 'Q1', q2: 'Q2', q3: 'Q3', q4: 'Q4', summer: 'Summer' };

/** Every month a dated period touches, in order. */
function monthsOf(term) {
  const [sy, sm] = term.start.split('-').map(Number);
  const [ey, em] = term.end.split('-').map(Number);
  const out = [];
  for (let y = sy, m = sm; y < ey || (y === ey && m <= em); m === 12 ? (y += 1, m = 1) : (m += 1)) out.push(m);
  return out;
}

const FIRST_DAY = SCHOOL_YEAR.start;

/** The summer term's rows are labelled by calendar year ('Summer 2027'). */
const PERIODS = SCHOOL_YEAR.periods.map((term) => ({
  id: ROW_IDS[term.id] || term.id,
  label: term.label,
  months: monthsOf(term),
  labelYear: term.id === 'summer' ? 'calendar' : 'span'
}));

export const schoolYear = { FIRST_DAY, PERIODS };

/* ==========================================================================
 * GUIDE
 *
 * The one name that matched without translation. `getDailyLine(dateStr)` is
 * date-seeded rather than random, which is the rule §3b sets and the reason a
 * line does not rewrite itself mid-screen on a re-render.
 * ======================================================================== */

export const guide = { getDailyLine };

/* ==========================================================================
 * PLACEMENT
 *
 * ---- THE SLOT NOTHING HAS FILLED BEFORE ----
 *
 * `placement` was added to the contract by reading THIS folder. The note in
 * src/content/academyContent.js says so: the slot list was derived from the one
 * Academy that existed in code, checked against this one before being frozen,
 * and this was the single genuine hole it found.
 *
 * So this is the first content that slot has ever carried, and the diagnostic
 * it holds is the instrument that produced nine settled strand levels.
 *
 * Note what is NOT here: her levels. A bank of items belongs to the Academy; a
 * child's results belong to her database. Putting a measured level in a content
 * folder would weld a reading of one child into a file that ships in a build.
 * ======================================================================== */

export const placement = { allItems, itemsForStrand, getItem, bankSummary };

/* ==========================================================================
 * EXAMS
 *
 * The school reads NO names out of this slot today — its own exam screens were
 * built against a different shape and have not been generalised yet. So this is
 * carried rather than consumed, and that is the point: the banks are 2,560
 * written and checked items, and data preserved costs nothing while data
 * dropped is gone.
 *
 * `WEEKS` and the assessment rules come from config/assessment.js; the question
 * banks come from data/assessments/. Both belong to the same idea — what gets
 * tested, when, and how it is scored — so they fill one slot together.
 * ======================================================================== */

export const exams = {
  WEEKS,
  allWeeks,
  weekById,
  weekForLesson,
  weekTestReady,
  BANDS,
  bandFor,
  ALL_BANK_ITEMS,
  BANKS,
  allBankItems,
  itemsForLesson,
  itemsForLessons,
  bankItemById,
  courseOfQuestion
};

/* ==========================================================================
 * THEME
 *
 * A function rather than a static import so the stylesheet travels in this
 * Academy's chunk and loads when this Academy does. A static import here would
 * put every Academy's theme in every learner's download, which is the thing the
 * folder split exists to prevent.
 * ======================================================================== */

export const theme = { appearance: () => import('./academy.css') };

/* ==========================================================================
 * NAV (Sept 22, 2026)
 *
 * Until today this school had no nav and inherited the template's: every
 * shared tab, and the shared Parent Dashboard. The parent's decision: her
 * school shows her own screens, and her own grown-up area — "I don't want the
 * Parent Dashboard to be shared."
 *
 * So the tabs below are only screens that are this school's. None exist yet;
 * each screen that comes across from the standalone app (the reading check
 * first) adds its tab here in the same change. The landing page is the
 * shell's own and is not a tab.
 *
 * The parent button opens `grownups`, this school's own screen (views.js),
 * behind the platform's passcode lock. The shared Parent Dashboard is never
 * reachable from this school.
 *
 * Groups are declared above the export, never inside it: the slot export
 * stays flat (see _template/content.js).
 * ======================================================================== */

// 'school' is her whole child side — her app's own screens and menu
// (screens/HerSchool), including her reading check.
//
// Sept 23, 2026, the parent: "Pick the next unit from the Khan grades." So the
// separate reading-check tab (which held unit 2 until unit 1 was read unaided)
// was removed; her app's own reading check, inside My School, is the one.
const NAV_GROUPS = [
  {
    id: 'learning',
    label: 'My Learning',
    tabs: [{ id: 'school', label: 'My School' }]
  }
];

const NAV_PARENT_TAB = { id: 'grownups', label: 'Grown-Up Corner' };

export const nav = {
  navGroups: NAV_GROUPS,
  navParentTab: NAV_PARENT_TAB,
  navSchoolName: 'Petal & Pestle',
  navSchoolTagline: 'Academy'
};

/* ==========================================================================
 * VIEWS — this school's own screens, declared by hand in views.js.
 * ======================================================================== */

export { views } from './views.js';
