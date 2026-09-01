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

import { SUBJECTS, SUBJECT_ORDER, strandsForSubject, strandLabel, strandCardLabel } from './config/strands.js';
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

const isKhanTaughtSubject = (subject) => KHAN_TAUGHT_SUBJECTS.includes(canonicalSubject(subject));

/**
 * One spelling for a subject.
 *
 * The schedule calls the reading block `reading` and the diagnostic calls the
 * subject `ela`; both mean the same subject and a record that files them apart
 * counts her work twice. Unknown ids pass through unchanged rather than being
 * coerced to a default — a subject nobody recognises should look wrong on the
 * screen, not be silently relabelled as something it is not.
 */
function canonicalSubject(subject) {
  if (!subject) return null;
  const id = String(subject).toLowerCase();
  if (id === 'reading' || id === 'writing' || id === 'english') return 'ela';
  if (id === 'mathematics' || id === 'maths') return 'math';
  return id;
}

/** What SHE reads on her own screen, as opposed to what the report prints. */
function subjectCardLabel(subject) {
  const id = canonicalSubject(subject);
  return SUBJECT_LABELS[id] || strandCardLabel(id) || id;
}

export const subjects = {
  ACTIVE_SUBJECTS,
  KHAN_TAUGHT_SUBJECTS,
  LESSON_TRACK_SUBJECTS,
  PARTICIPATION_SUBJECTS,
  SUBJECT_LABELS,
  canonicalSubject,
  isKhanTaughtSubject,
  strandsForSubject,
  subjectCardLabel,
  // Not asked for by the school today, carried because they are this Academy's
  // own vocabulary and the screens that will want them are hers.
  strandLabel,
  strandCardLabel
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

/**
 * What kind of day this is.
 *
 * `core` on a weekday inside a period, `weekend` on Saturday and Sunday,
 * `holiday` for a weekday outside every period — which here means outside the
 * school year or in the gap between two periods, not a named festival.
 *
 * `flex` marks the summer term, where the plan is three days a week rather than
 * five. The school reads `flex` to mean "today is a school day but the subject
 * list is not fixed", which is exactly what a three-day week inside a five-day
 * span is.
 */
function dayPattern(date) {
  const day = weekdayOf(date);
  if (day === 0 || day === 6) return WEEKEND;

  const key = dayKey(date);
  const period = key ? periodFor(key) : null;
  if (!period) return { kind: 'holiday', holiday: 'Outside the school year' };

  return {
    kind: 'core',
    flex: Boolean(period.daysPerWeek && period.daysPerWeek < 5),
    period: period.id,
    label: period.label
  };
}

/**
 * The week, Sunday first, indexed the way `Date.getDay()` counts.
 *
 * Every weekday is the same shape here because this school's timetable does not
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

/**
 * The subjects a given pattern teaches, for a given quarter.
 *
 * Filtered by the quarter each course actually runs in — The Science Lab is
 * quarters 1 and 3, Social Studies is 1 to 3, Herbalism is all four. Passing no
 * quarter returns every taught subject, which is what the screens that ask
 * "what does this school teach" want.
 */
function patternSubjects(pattern, quarterId) {
  if (!pattern || pattern.kind !== 'core') return [];

  const quarter = Number(String(quarterId ?? '').replace(/[^0-9]/g, ''));
  const courses = Number.isFinite(quarter) && quarter > 0
    ? APP_COURSES.filter((c) => c.quarters.includes(quarter))
    : APP_COURSES;

  return [...courses.map((c) => c.id), ...SUBJECT_ORDER];
}

const subjectsForDay = (date) => patternSubjects(dayPattern(date), periodFor(dayKey(date))?.id);

const isSchoolDay = (date) => dayPattern(date).kind === 'core';
const isHoliday = (date) => dayPattern(date).kind === 'holiday';

/**
 * Named holidays inside a span.
 *
 * ALWAYS EMPTY, and it is not a stub. This school files its breaks as the gaps
 * between periods rather than as a list of named days — see the header above,
 * and config/calendar.js for the reasoning that produced it. A screen that
 * wants to print "Thanksgiving" will find nothing here, and the right fix is a
 * decision about this school's calendar, not a list typed into this file.
 */
const holidaysInSpan = () => [];

export const timetable = {
  WEEK_PATTERN,
  dayPattern,
  defaultSchedule: DEFAULT_SCHEDULE,
  holidaysInSpan,
  isHoliday,
  isSchoolDay,
  patternSubjects,
  subjectsForDay,
  // This Academy's own, carried for the screens that are hers.
  SCHOOL_YEAR,
  periodFor
};

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

export const theme = { load: () => import('./academy.css') };
