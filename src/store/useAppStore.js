import { create } from 'zustand';
import {
  db,
  META_ID,
  loadMeta,
  saveMeta,
  loadAllLessonProgress,
  saveLessonProgress,
  loadAllWritingEntries,
  saveWritingEntry,
  updateWritingEntryRecord,
  loadWeeklyWordState,
  saveWeeklyWordState,
  loadSchedule,
  saveSchedule,
  loadAllTypingLessonProgress,
  saveTypingLessonProgress,
  resetAllProgress as dbResetAllProgress,
  loadAllAttendance,
  loadAttendanceRecord,
  saveAttendanceRecord,
  loadAllParentNotes,
  saveParentNote,
  deleteParentNote,
  loadAllAssignments,
  saveAssignment,
  updateAssignment,
  deleteAssignment,
  loadAllReadingLog,
  saveReadingLogEntry,
  deleteReadingLogEntry,
  loadAllPortfolio,
  savePortfolioEntry,
  deletePortfolioEntry,
  updatePortfolioEntryFields,
  loadAllKhanAcademyAssignments,
  addKhanAcademyAssignmentRecord,
  updateKhanAcademyAssignmentRecord,
  deleteKhanAcademyAssignmentRecord,
  loadAllRewards,
  addRewardRecord,
  updateRewardRecord,
  deleteRewardRecord,
  loadAllRewardRedemptions,
  addRewardRedemptionRecord,
  loadAllLedgerEntries,
  loadAllDreamGoals,
  putDreamGoalRecord,
  addLedgerEntries,
  updateRewardRedemptionRecord,
  loadAllReadinessAwards,
  saveReadinessAwardRecord,
  deleteReadinessAwardRecord,
  loadAllFieldTrips,
  addFieldTripRecord,
  updateFieldTripRecord,
  deleteFieldTripRecord,
  loadAllMessages,
  loadRecentMessages,
  addMessageRecord,
  updateMessageRecord,
  loadAllReviewSchedule,
  saveReviewScheduleEntry,
  saveSelfExplanationEntry,
  loadAllSelfExplanations,
  updateSelfExplanationEntry,
  loadAllStudyCycle,
  saveStudyCycleEntry,
  loadAllPEBodyMetrics,
  savePEBodyMetricsEntry,
  loadAllPEDailyLog,
  savePEDailyLogEntry,
  loadAllPEWorkoutLog,
  savePEWorkoutLogEntry,
  loadAllGardenLog,
  loadAllGuitarLog,
  loadAllTypingLog,
  loadTypingScore,
  saveTypingScore,
  saveGardenLogEntry,
  saveGuitarLogEntry,
  saveTypingLogEntry,
  loadAllPEWeeklyGoals,
  savePEWeeklyGoalEntry,
  loadAllPEMeals,
  loadRecentPEMeals,
  loadKhanDailyLog,
  saveKhanDailyLogRecord,
  loadMorningMeetings,
  loadAllMorningMeetings,
  saveMorningMeetingRecord,
  bulkPutMorningMeetings,
  addPEMealRecord,
  deletePEMealRecord,
  loadAllAdminRecords,
  addAdminRecord,
  deleteAdminRecordById,
  updateAdminRecordFields,
  loadAllEvidenceLinks,
  saveEvidenceLinkRecord,
  loadParentAuth,
  saveParentAuth,
  loadAllMissionEvaluations,
  saveMissionEvaluation,
  deleteMissionEvaluation,
  loadAllCourseDescriptions,
  saveCourseDescriptionRecord,
  loadAllComplianceChecks,
  saveComplianceCheckRecord,
  loadAllAcademicBooks,
  addAcademicBookRecord,
  updateAcademicBookRecord,
  deleteAcademicBookRecord,
  loadAllAcademicAssignments,
  addAcademicAssignmentRecord,
  updateAcademicAssignmentRecord,
  deleteAcademicAssignmentRecord,
  resetAcademicProgressStatuses,
  // Added Aug 9, 2026 with the round-trip completeness fix — see
  // exportProgressData / importProgressData below and the v31 schema note.
  newSyncId,
  loadAllTypingScores,
  bulkPutTypingScores,
  loadAllWeeklyWordState,
  bulkPutWeeklyWordState,
  loadAllKhanDailyLog,
  bulkPutKhanDailyLog,
  bulkPutRewards,
  bulkPutRewardRedemptions,
  bulkPutReadinessAwards,
  bulkPutFieldTrips,
  // v34 — the three tables that were missed on v31. See the v34 note in db.js.
  bulkPutReadingLog,
  bulkPutPortfolio,
  bulkPutPEMeals,
  bulkPutAssignments,
  bulkPutSelfExplanations
} from '../db/db.js';
import { getCurrentRank as computeRankFromGates, RANKS } from '../lib/ranks.js';
import { CRATE_COST, crateMonthKey, crateOfferFor, crateOpenedIn, crateSourceKey } from '../lib/supplyCrate.js';
import {
  balanceFor,
  creditPurchaseApproval,
  dreamMatchFor,
  earnedFromXp,
  makeEntry,
  mergeLedgers,
  openingCredits,
  sumEntries
} from '../lib/economy.js';
import { percentToLetter, parsePercent, letterToPercent } from '../lib/gradeScale.js';
import { todayDateStr, toDateStr } from '../lib/scheduler.js';
import { scheduledMinutesByDate } from '../lib/scheduledMinutes.js';
import { DEFAULT_REWARDS } from '../lib/rewards.js';
import { applyTheme } from '../lib/themes.js';
import { generateLearningPack, DEFAULT_FIELD_TRIPS, LIBRARY_TRIP_RENAMES, fieldTripSyncId, planFieldTripDedupe } from '../lib/fieldTrips.js';
import { planBookSwap } from '../lib/bookSwap.js';
import { READINESS_SKILLS } from '../lib/readiness.js';
import { getCurrentQuarter, isQuarterlyBatchLabel, isSummerBatchLabel, groupByQuarter, isQuarterAvailable, getQuarterDateRange, quarterRank, SCHOOL_YEAR_START_DATE } from '../lib/schoolQuarter.js';
import { BUILD_STAMP } from '../lib/buildStamp.js';
// CONSUMER 7 OF 7 for hands-on project arrays. See
// scripts/verify-gardening.mjs — a project array wired into fewer than all
// seven files fails SILENTLY: the project exists and can even be done, but
// nothing points at it and finishing it leaves no record. This codebase has
// shipped that bug twice (Science experiments, then Tinkercad).
import {
  computeWeeklyWordState,
  appendQuizResult,
  quizAveragesByQuarter,
  getWordsByIds,
  getTodaysWordTask as getTodaysWordTaskFor,
  applyResultsToMastery,
  mergeWordHistories,
  advanceToNextList,
  masteryCounts,
  stalledWordIds,
  activityFor,
  MASTERY_ACTIVITIES,
  MASTERY_STREAK
} from '../lib/weeklyWords.js';
import { nextReviewScheduleEntry } from '../engine/dailyPractice.js';
import { studyCycleKey, nextTermBlitzSlot } from '../lib/studyCycle.js';
import { EVIDENCE_FOLDER_KEYS, SEEDED_FOLDER_URLS, normalizeEvidenceUrl, REFERENCE_LINK_TYPES } from '../lib/driveLinks.js';
import { missionScoresForSubject, missionEvidencePhrase } from '../lib/missionGrades.js';
import {
  buildPasscodeRecord,
  verifyPasscode,
  verifyRecoveryCode,
  validatePasscode,
  generateRecoveryCode,
  cryptoAvailable
} from '../lib/parentAuth.js';
import { academyContent } from '../content/academyContent.js';

/**
 * ---- EMPTY OF THE RIGHT SHAPE (Sept 1, 2026) ----
 *
 * `academyContent()` now hands back `{}` for a slot an Academy does not fill,
 * so the school gets past import. That fixed the white page and moved the
 * failure one step later: the store hydrates by SEEDING curriculum rows, and a
 * seeder that indexes or iterates a name from an empty slot still throws —
 * during hydration, which takes the whole school down rather than one screen.
 *
 * Three of those were found one reload at a time, which is no way to do it:
 *
 *     undefined['general']   seeding the grammar ladder
 *     undefined['g78']       the same ladder, a different rung
 *     undefined.slice        the weekly word pool
 *
 * So every name below now defaults to an EMPTY VALUE OF ITS OWN SHAPE — `[]`
 * for a list, `{}` for a lookup, `new Set()` for a set. A loop over an empty
 * list runs zero times and a lookup miss returns undefined, which is what a
 * seeder for content this Academy does not have should do.
 *
 * **The shapes were read from the code, not guessed** — see
 * scripts/triage-content-names.mjs, which resolves every contract name to its
 * declaration. A `{}` where a list belongs would crash on `.filter` just as
 * hard as `undefined` did.
 *
 * ---- FUNCTIONS, AND THE LINE THAT MATTERS ----
 *
 * Leaving every function undefined was the first instinct and it was wrong in
 * one direction and right in the other. `scienceRowsFor is not a function` took
 * the whole school down during hydration — for a seeder whose only job was to
 * add science rows this Academy does not have.
 *
 * The distinction is what the function RETURNS:
 *
 *   Returns a LIST a seeder iterates  -> defaults to empty. The loop runs zero
 *                                        times and NOTHING is written. That is
 *                                        the correct outcome, not a silent one.
 *   ANSWERS A QUESTION                -> defaults to "no" / null. A miss is
 *                                        already a state every caller handles.
 *   BUILDS A STRING FOR A RECORD      -> **no default.** `grammarRowTitle` and
 *                                        `grammarUnitUrl` compose a row's title
 *                                        and URL; an empty default would write
 *                                        a blank, untitled row into a real
 *                                        database, and a silently wrong record
 *                                        is worse than a loud failure.
 *
 * Those last two are unreachable for an Academy with no grammar courses anyway:
 * they are only called inside the ladder loop, which skips every rung whose
 * course is missing from an empty `GRAMMAR_COURSES`.
 */
const { availableDueDates = () => [], bookRationale = {}, hasMilestones = () => false, milestonesFor = () => [], quarterlyAcademicPlaceholders = {}, subjectBookPlaceholders = {} } = academyContent().academicCenter;
const { findProposal = () => null, missionScoreTotals = () => null } = academyContent().compliance;
const { gardenProjects = [] } = academyContent().electives;
const { QUIZ_PLATFORM_IDS = [] } = academyContent().games;
const { GRAMMAR_COURSES = {}, KHAN_GRAMMAR_UNITS = [], LEGACY_GRAMMAR_TITLES = {}, SCIENCE_CANONICAL_KEYS = new Set(), SCIENCE_CANONICAL_TITLES = new Set(), generalGrammarUnitByUrl = () => null, grammarRowTitle, grammarUnitUrl, khanGrammarUnitByUrl = () => null, scienceCanonicalRow = () => null, scienceCourseChallengeRows = () => [], scienceRowsFor = () => [] } = academyContent().khanSequences;
const { allLessons = [] } = academyContent().lessons;
const { aerospaceProjects = [], roboticsProjects = [], scienceExperiments = [], technologyProjects = [] } = academyContent().projects;
const { SEEDED_REWARD_LADDER_MAP = {}, catalogRewardRows = () => [] } = academyContent().rewards;
const { ACTIVE_SUBJECTS = [], KHAN_TAUGHT_SUBJECTS = [], LESSON_TRACK_SUBJECTS = [], PARTICIPATION_SUBJECTS = [], canonicalSubject = () => null, strandsForSubject = () => null } = academyContent().subjects;
const { defaultSchedule = [] } = academyContent().timetable;
const { spellingWordPool = [], vocabularyWordPool = [], writingPrompts = [] } = academyContent().writing;

const WRITING_ENTRY_XP = 15;
// Academic Success Center. A book report, research paper, or
// presentation is a multi-day piece of work — bigger than a single Khan
// Academy skill (20 XP) or one journal entry (15 XP), so it pays more.
// Finishing a whole book pays the same as a Khan skill: real, tracked,
// but not the same lift as producing a graded piece of work.
const ACADEMIC_ASSIGNMENT_COMPLETION_XP = 30;
const ACADEMIC_BOOK_COMPLETION_XP = 20;
// Small on purpose. A milestone is one week's step toward something
// bigger, not a finished piece of work — the reward for the paper itself
// is still the paper. Enough to make checking it off feel worth doing.
const ACADEMIC_MILESTONE_XP = 5;
const WEEKLY_QUIZ_CORRECT_XP = 10;
// Deliberately lower than a real quiz's per-correct XP — Term Blitz is
// a low-stakes review game, not scored toward mastery, so its reward
// should feel like a nice bonus, not compete with real assessment XP.
const REVIEW_GAME_CORRECT_XP = 5;
// A one-time-per-play flat bonus, not a per-question score — shared by
// every "signature simulation game" (Nation Command, Launch Director,
// and any future one), since none of them have a single "correct" path
// (every choice is a real tradeoff, not a right answer). XP rewards
// genuine completion of the culminating activity, same spirit as Term
// Blitz's low-stakes reward but without a "how many did you get right"
// metric that wouldn't make sense for a strategy game like this.
const SIGNATURE_GAME_COMPLETION_XP = 30;
// PE & Nutrition — flat, low-stakes XP for real logging habits, matching
// this app's existing pattern of not treating trackers like graded
// quizzes (same reasoning as REVIEW_GAME_CORRECT_XP/SIGNATURE_GAME_
// COMPLETION_XP above). A completed workout is the bigger "did the real
// thing" action, so it's worth more than a single quick-log entry.
const PE_WORKOUT_COMPLETION_XP = 20;
const PE_DAILY_LOG_XP = 5;
// Gardening — the same flat, low-stakes shape as the PE constants above, and
// for the same reason: this is a PARTICIPATION subject, so there is no score
// to scale a reward against. Going out and doing the Friday work is the whole
// action, and a single log row (one watering, one observation) is the smaller
// habit — worth something, worth less than the session.
const GARDEN_SESSION_XP = 20;
const GARDEN_LOG_XP = 5;
// Electric Guitar. A finished 15-minute practice session earns the session-sized
// award; a theory item, a song he picked, a song he finished and a recording all
// earn the smaller one. Same two-tier shape as gardening on purpose — guitar does
// NOT get its own motivation engine. XP, ranks, streaks and the Rewards system
// are already live and he already responds to them.
const GUITAR_PRACTICE_XP = 20;
const GUITAR_LOG_XP = 5;
const PE_BODY_METRICS_XP = 5;
const PE_WEEKLY_GOAL_XP = 10;
// Daily word-study rhythm (Mon-Thu, Fri is the real test at
// WEEKLY_QUIZ_CORRECT_XP above). Monday's "Introduce" step has no
// right/wrong answers, so it's a flat completion bonus, same reasoning
// as PE_DAILY_LOG_XP. Tue/Wed/Thu are auto-graded practice rounds, so
// they earn per-correct-answer XP like a review game.
const WORD_INTRODUCE_XP = 5;
const WORD_PRACTICE_CORRECT_XP = 5;

// Gamification (Part 5): coins are a byproduct of XP — 1 coin per this many
// XP. Since XP is only awarded on verified real completions, coins (and every
// reward they buy) stay tied to real work with zero extra award sites.
// XP_PER_COIN LIVES IN lib/economy.js, WHERE IT IS 2 — NOT 5.
//
// A `const XP_PER_COIN = 5;` sat here under a comment reading as though it were
// authoritative. It was dead — nothing referenced it, the real math goes
// through the imported balanceFor()/earnedFromXp() — but it was a 2.5x-wrong
// number one file away from the live one, waiting for someone to "use the
// constant that is already here". Removed Aug 13, 2026.

const WORD_POOLS = { spelling: spellingWordPool, vocabulary: vocabularyWordPool };

// Version stamped into every progress export (exportProgressData) and checked
// on import (importProgressData). Bump only when the payload changes in a way
// an older app could not merge safely; older backups (including files with no
// exportVersion at all) must always keep importing.
const EXPORT_VERSION = 3;
// v2 (Aug 8, 2026) adds the Marketplace ledger, longestStreak, and the
// achievement dates. Older files (v1, or with no version at all) still import
// cleanly: every new field is read with a default, so a backup taken before
// the Marketplace existed simply contributes nothing to it.
//
// v3 (Aug 9, 2026) adds the eight tables the round-trip audit found missing:
// selfExplanations, rewards, rewardRedemptions, readinessAwards, fieldTrips,
// assignments, typingScores, weeklyWordState, khanDailyLog. Same rule holds —
// a v2 file still imports, it simply contributes nothing to those tables. The
// bump exists so the RECEIVING side can tell the parent something true: a v2
// file cannot carry his written explanations, and she should ask for a fresh
// export rather than wonder why the grading queue is empty.

/**
 * Rows in an export payload, for the backup receipt.
 *
 * Arrays count their length, keyed maps their key count, and scalars nothing.
 * Deliberately approximate — its job is to make "this backup is suspiciously
 * small" visible, not to be an accounting figure.
 */
function countExportRows(payload) {
  let total = 0;
  for (const value of Object.values(payload || {})) {
    if (Array.isArray(value)) total += value.length;
    else if (value && typeof value === 'object') total += Object.keys(value).length;
  }
  return total;
}

/**
 * How many days a backup can be before the dashboard starts asking.
 *
 * Seven, matching the weekly rhythm the parent actually works to, and short
 * enough that a lost drive costs one week of records rather than a quarter.
 */
export const BACKUP_STALE_DAYS = 7;

/**
 * Merge two copies of a table that carries a generated `syncId`.
 *
 * The rule is last-write-wins per ROW, decided by `updatedAt`, with three
 * deliberate refinements:
 *
 *   - A row only on one side is simply kept. Adds never conflict.
 *   - A tie, or two rows with no timestamps to compare, leaves the LOCAL row
 *     standing. Never overwrite on a coin toss — the same rule the grade merge
 *     already uses, and for the same reason: one of these rows is a human
 *     judgment and the other might be a stale file.
 *   - `deletedAt` is just another field, so a deletion is an edit like any
 *     other and wins or loses on its timestamp. This is what makes removing a
 *     reward stick instead of being resurrected by the next import.
 *
 * `fallbackKey` handles rows written before v31, which have no syncId: they
 * are matched on a natural key instead (a reward's name, an assignment's
 * title+due date) so the first merge after upgrading pairs them up rather than
 * doubling them. After that first merge everything has a syncId.
 *
 * Returns { merged, changed } — `changed` is only the rows this machine needs
 * to write, so an import costs writes proportional to what actually moved.
 */
// Exported for scripts/verify-export-completeness.mjs, which runs the real
// merge over real payloads rather than pattern-matching the source of it.
export function mergeBySyncId(localRows, incomingRows, fallbackKey = null) {
  const keyOf = (row) => row?.syncId || (fallbackKey ? fallbackKey(row) : null);
  const byKey = new Map();
  for (const row of localRows || []) {
    const key = keyOf(row);
    if (key) byKey.set(key, row);
  }

  const changed = [];
  for (const incoming of incomingRows || []) {
    const key = keyOf(incoming);
    if (!key) continue; // unidentifiable row — cannot be merged safely, so it is not
    const local = byKey.get(key);
    if (!local) {
      // New here. Strip the other machine's auto-increment id so Dexie
      // assigns a local one; syncId is what ties the two copies together.
      const { id: _theirId, ...row } = incoming;
      const fresh = { ...row, syncId: incoming.syncId || key };
      byKey.set(key, fresh);
      changed.push(fresh);
      continue;
    }
    const localAt = local.updatedAt || local.resolvedAt || local.completedAt || local.createdAt || '';
    const incomingAt = incoming.updatedAt || incoming.resolvedAt || incoming.completedAt || incoming.createdAt || '';
    if (!incomingAt || incomingAt <= localAt) continue; // local stands
    // Keep THIS machine's primary key; take the other machine's content.
    const { id: _theirId, ...row } = incoming;
    const merged = { ...row, id: local.id, syncId: local.syncId || key };
    byKey.set(key, merged);
    changed.push(merged);
  }

  return { merged: [...byKey.values()], changed };
}

/**
 * Merge two copies of a table keyed by a natural key, taking the higher value
 * of each numeric field and OR-ing each boolean.
 *
 * Used for typingScores (personal bests), weeklyWordState (spelling and
 * vocabulary progress) and khanDailyLog (did he work on this subject today).
 * All three are monotonic by nature — a personal best does not get worse, a
 * word already learned does not become unlearned, and a day he worked does not
 * become a day he did not — so "take the better of the two" is not a
 * compromise, it is the correct answer.
 */
// Exported for scripts/verify-export-completeness.mjs, which runs the real
// merge over real payloads rather than pattern-matching the source of it.
export function mergeMonotonic(localValue, incomingValue) {
  if (localValue == null) return incomingValue;
  if (incomingValue == null) return localValue;
  if (typeof localValue === 'number' && typeof incomingValue === 'number') {
    return Math.max(localValue, incomingValue);
  }
  if (typeof localValue === 'boolean' || typeof incomingValue === 'boolean') {
    return Boolean(localValue) || Boolean(incomingValue);
  }
  if (Array.isArray(localValue) && Array.isArray(incomingValue)) {
    return localValue.length >= incomingValue.length ? localValue : incomingValue;
  }
  if (
    localValue && incomingValue &&
    typeof localValue === 'object' && typeof incomingValue === 'object'
  ) {
    const out = { ...localValue };
    for (const [key, value] of Object.entries(incomingValue)) {
      out[key] = mergeMonotonic(localValue[key], value);
    }
    return out;
  }
  // Strings and everything else: the later/greater one. For ISO dates that is
  // chronological, which is what every string field in these three tables is.
  return String(incomingValue) > String(localValue) ? incomingValue : localValue;
}

/**
 * WHERE EVERY LANGUAGE ARTS UNIT BELONGS, FOR THE WHOLE YEAR.
 *
 * Hoisted to module scope on Aug 9, 2026 so the two EARLIER repair passes in
 * hydrate can see it. They could not before, and that caused a quiet fault:
 * `q1RestructureMap` placed three 7th-grade reading rows at Q1 slots 1-3,
 * `elaSequenceMap` then placed the same three at Q1 slots 11-13, and this map
 * finally moved them to Q2 — so every one of those rows was rewritten twice in
 * IndexedDB on every single app start, and anyone reading either earlier map
 * would reasonably believe those units were scheduled for Q1.
 *
 * The final state was right, which is why it never showed up on screen. The
 * fix is that the earlier passes now skip any row this map owns: they exist to
 * repair rows this one does not cover, not to fight it.
 *
 * This map is the single authority on ELA placement. Q1 comes from
 * data/khan/grammarCourseOrder.js and is checked against it by
 * scripts/verify-ela-sequence.mjs.
 */
const ELA_PLACEMENT_MAP = {
  /**
   * Q1 IS KHAN'S GRAMMAR COURSE, AND NOW RUNS IN KHAN'S OWN ORDER.
   * (Corrected Aug 9, 2026, on the parent's report: "language arts isnt
   * starting at the beginning of the units. it is starting at unit 3
   * instead of unit 1.")
   *
   * Nine of the ten grammar units were seeded as one block and numbered
   * 1-9. The tenth — Khan's unit 2, `parts-of-speech-the-verb` — had been
   * seeded separately and much earlier under the name the IXL report gave
   * it, "Verb tenses, including the perfect tenses", and was appended at
   * slot 10 instead of being merged back into the sequence. So the quarter
   * ran unit 1 -> unit 3 -> unit 4, and the verb arrived last, AFTER the
   * two syntax units and usage-and-style, all three of which assume it.
   *
   * It also meant IXL's single most specific recommendation for his
   * weakest strand — "Use the perfect verb tenses" — was scheduled for the
   * end of October.
   *
   * These numbers are generated from data/khan/grammarCourseOrder.js and
   * checked against it by scripts/verify-ela-sequence.mjs. They must also
   * match elaSequenceMap above exactly, or the two maps rewrite each other
   * on every startup.
   */
  'Parts of speech: the noun': { batchLabel: 'Q1 2026-2027', sequenceInQuarter: 1 },
  // Khan's own title. Pass (a2) in hydrate renames every grammar row to it,
  // keyed on the URL, so the row and the page he opens finally agree.
  'Parts of speech: the verb': { batchLabel: 'Q1 2026-2027', sequenceInQuarter: 2 },
  // The seeded IXL name, kept so a row that predates that rename is still
  // recognised as this unit rather than falling through unplaced.
  'Verb tenses, including the perfect tenses': { batchLabel: 'Q1 2026-2027', sequenceInQuarter: 2 },
  'Parts of speech: the pronoun': { batchLabel: 'Q1 2026-2027', sequenceInQuarter: 3 },
  'Parts of speech: the modifier': { batchLabel: 'Q1 2026-2027', sequenceInQuarter: 4 },
  'Parts of speech: the preposition and the conjunction': { batchLabel: 'Q1 2026-2027', sequenceInQuarter: 5 },
  'Punctuation: the comma and the apostrophe': { batchLabel: 'Q1 2026-2027', sequenceInQuarter: 6 },
  'Punctuation: the colon, semicolon, and more': { batchLabel: 'Q1 2026-2027', sequenceInQuarter: 7 },
  'Syntax: sentences and clauses': { batchLabel: 'Q1 2026-2027', sequenceInQuarter: 8 },
  'Syntax: conventions of standard English': { batchLabel: 'Q1 2026-2027', sequenceInQuarter: 9 },
  'Usage and style': { batchLabel: 'Q1 2026-2027', sequenceInQuarter: 10 },
  'Themes, figures of speech, and comparing texts (reading strategies)': { batchLabel: 'Q2 2026-2027', sequenceInQuarter: 1 },
  'How word choice/figurative language affects meaning and tone': { batchLabel: 'Q2 2026-2027', sequenceInQuarter: 2 },
  'Antonyms, connotation, and word choice (vocabulary)': { batchLabel: 'Q2 2026-2027', sequenceInQuarter: 3 },
  'Vocabulary (7th grade course)': { batchLabel: 'Q2 2026-2027', sequenceInQuarter: 4 },
  'Uncovering Meaning: Context Clues, Word Choice, and Author\'s Purpose': { batchLabel: 'Q2 2026-2027', sequenceInQuarter: 5 },
  'Uncovering Meaning: Long Passage Practice': { batchLabel: 'Q2 2026-2027', sequenceInQuarter: 6 },
  'Blazing New Trails (thematic reading unit)': { batchLabel: 'Q2 2026-2027', sequenceInQuarter: 7 },
  'Blazing New Trails: Long Passage Practice': { batchLabel: 'Q2 2026-2027', sequenceInQuarter: 8 },
  'Mysteries (thematic reading unit)': { batchLabel: 'Q2 2026-2027', sequenceInQuarter: 9 },
  'Mysteries: Long Passage Practice': { batchLabel: 'Q3 2026-2027', sequenceInQuarter: 1 },
  'Living Tongues (thematic reading unit)': { batchLabel: 'Q3 2026-2027', sequenceInQuarter: 2 },
  'Trailblazing Women (distinct course version)': { batchLabel: 'Q3 2026-2027', sequenceInQuarter: 3 },
  'Mysteries of the Past (thematic reading unit)': { batchLabel: 'Q3 2026-2027', sequenceInQuarter: 4 },
  'Mysteries of the Past: unit vocabulary': { batchLabel: 'Q3 2026-2027', sequenceInQuarter: 5 },
  'The Mind at Play (8th grade thematic unit)': { batchLabel: 'Q3 2026-2027', sequenceInQuarter: 6 },
  'To Your Health (8th grade thematic unit)': { batchLabel: 'Q3 2026-2027', sequenceInQuarter: 7 },
  'Craft and Structure: Long Passage Practice (8th grade)': { batchLabel: 'Q3 2026-2027', sequenceInQuarter: 8 },
  'Obscuring the Truth (8th grade thematic unit)': { batchLabel: 'Q4 2026-2027', sequenceInQuarter: 1 },
  'Obscuring the Truth: unit vocabulary': { batchLabel: 'Q4 2026-2027', sequenceInQuarter: 2 },
  'The World Beneath (8th grade thematic unit)': { batchLabel: 'Q4 2026-2027', sequenceInQuarter: 3 },
  'Crossing the Line (8th grade thematic unit)': { batchLabel: 'Q4 2026-2027', sequenceInQuarter: 4 },
  'Funny Business (8th grade thematic unit)': { batchLabel: 'Q4 2026-2027', sequenceInQuarter: 5 },
  'Funny Business: unit vocabulary': { batchLabel: 'Q4 2026-2027', sequenceInQuarter: 6 },
  'Vocabulary (8th grade course)': { batchLabel: 'Q4 2026-2027', sequenceInQuarter: 7 },
  '7th Grade ELA — Course Challenge': { batchLabel: 'Q3 2026-2027', sequenceInQuarter: 99 },
  '8th Grade ELA — Course Challenge': { batchLabel: 'Q4 2026-2027', sequenceInQuarter: 99 },
  // Not a Grammar-course unit: a 5th-grade Reading & Vocabulary sub-skill,
  // seeded because it covers IXL's "prefixes dis-, mis-, pre-"
  // recommendation. It has no place inside Khan's numbering, so it follows
  // all ten. (The verb is now at slot 2, where Khan puts it.)
  'Roots, prefixes, and suffixes': { batchLabel: 'Q1 2026-2027', sequenceInQuarter: 11 }
};

/**
 * How many mastered lessons belong to a given set of subjects.
 *
 * Built once into a lessonId -> subject map: lessonProgress is keyed by id and
 * carries no subject, and scanning 356 lessons per lookup inside a render path
 * is exactly the kind of thing this project has already had to fix twice.
 */
const LESSON_SUBJECT = (() => {
  const map = new Map();
  for (const l of allLessons) map.set(l.id, l.subject);
  return map;
})();

/**
 * ===========================================================================
 * THE TWO REFLECTIONS THAT WERE GRADED AND REACHED NOTHING. (Aug 25, 2026.)
 * ===========================================================================
 *
 * Found by the Aug 23 audit, item O-6(c). The two signature games close with
 * "explain your highest-scoring decision", and that sentence is stored in
 * `selfExplanations` — the same table every other reflection uses — but tagged
 * with a fixed GAME id rather than a lesson id, because no lesson owns a game.
 * The store said so out loud when it was built: *"tagged with a fixed game id
 * instead of a lesson id."*
 *
 * The Mission Control Board queues every ungraded reflection with text in it.
 * No filter on the id, so these two are offered a grade picker like everything
 * else — and she graded them. Then `reflectionGraded` looked the id up in
 * `LESSON_SUBJECT`, got `undefined`, and dropped the row. The letter was
 * written to the record and counted toward nothing.
 *
 * **A grade that reaches no average is the thing she removed.** This file says
 * that in two other places about two other bugs. Third time.
 *
 * ---- WHY THE SUBJECT IS DERIVED AND NOT TYPED ----
 *
 * The obvious fix is `'game-nation-command' -> 'socialStudies'`. That is a
 * fourth place where a subject key is written down by hand, and this codebase
 * has been bitten four separate times by one fact living in two places.
 *
 * Both games are built ON specific lessons — `nationCommandContent.js` names
 * the four Q2 Social Studies lessons it draws every government type from, and
 * `launchDirectorContent.js` names the Aerospace ones. So the game points at
 * its source LESSON, and the subject comes from wherever that lesson's subject
 * already lives. Rename a subject and this follows on its own.
 *
 * scripts/verify-audit-aug23.mjs asserts both ids resolve, because the failure
 * mode of a dangling id here is silent — exactly the bug being fixed.
 *
 * ---- WHAT THIS DOES NOT CHANGE ----
 *
 * The GAMES are still ungraded: flat completion XP, no mastery gate, replayable
 * forever. That was a deliberate decision and it stands. What is graded is the
 * REFLECTION — a piece of written work, judged the same way as every other
 * reflection in the app.
 */
const GAME_REFLECTION_SOURCE_LESSON = {
  'game-nation-command': 'ss7-government-political-systems',
  'game-launch-director': 'ae7-rocket-design'
};

export const GAME_REFLECTION_SUBJECT = new Map(
  Object.entries(GAME_REFLECTION_SOURCE_LESSON).map(([gameId, lessonId]) => [
    gameId,
    LESSON_SUBJECT.get(lessonId) || null
  ])
);

/**
 * Which subject a reflection belongs to — lessons first, then the two games.
 *
 * Deliberately NOT folded into `LESSON_SUBJECT` itself: that map is also read
 * by the mastered-lesson count and the Friday week-in-review, and a game id
 * appearing there would make a game look like a lesson he mastered.
 */
export function subjectOfReflection(lessonId) {
  return LESSON_SUBJECT.get(lessonId) || GAME_REFLECTION_SUBJECT.get(lessonId) || null;
}

/**
 * lessonId -> title. Built once for the same reason as LESSON_SUBJECT above.
 *
 * Added Aug 9, 2026 for the Friday week-in-review, which needs to say "you
 * mastered Newton's Third Law" rather than "you mastered 3 lessons". Naming
 * the work is most of what makes a debrief feel like it was about him.
 */
const LESSON_TITLE = (() => {
  const map = new Map();
  for (const l of allLessons) map.set(l.id, l.title);
  return map;
})();

function masteredInSubjects(lessonProgress, subjects) {
  const want = new Set(subjects);
  let n = 0;
  for (const [id, p] of Object.entries(lessonProgress || {})) {
    if (p && p.mastered && want.has(LESSON_SUBJECT.get(id))) n++;
  }
  return n;
}

function todayStr() {
  // Local-timezone 'YYYY-MM-DD', delegated to lib/scheduler.js so the store
  // and the calendar always agree on what "today" is. The old
  // toISOString() version was UTC — it stamped evening work (after ~8pm
  // Eastern) with TOMORROW'S date, misdating attendance, streaks, and the
  // Georgia 180-day record. (Batch A fix, Aug 2026.)
  return todayDateStr();
}

function formatShortDate(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

function daysBetween(a, b) {
  const ms = new Date(b) - new Date(a);
  return Math.round(ms / (1000 * 60 * 60 * 24));
}

/** Mon-Fri. The school week is 4 deep days + a light Friday (weekPattern.js). */
function isSchoolDay(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number);
  const dow = new Date(y, m - 1, d).getDay();
  return dow >= 1 && dow <= 5;
}

/** School days strictly after `from`, up to and including `to`. */
function schoolDaysBetween(from, to) {
  const total = daysBetween(from, to);
  if (total <= 0) return 0;
  const [y, m, d] = from.split('-').map(Number);
  const cursor = new Date(y, m - 1, d);
  let count = 0;
  for (let i = 0; i < total; i++) {
    cursor.setDate(cursor.getDate() + 1);
    const iso = `${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, '0')}-${String(cursor.getDate()).padStart(2, '0')}`;
    if (isSchoolDay(iso)) count++;
  }
  return count;
}

/**
 * The learning streak, counted in SCHOOL days rather than calendar days.
 *
 * WHY THIS CHANGED (Aug 8, 2026): the old version counted calendar days, in an
 * app whose entire premise is a Mon-Fri school week. Saturday and Sunday have
 * no scheduled work, so every Monday the streak reset to 1 and the maximum
 * reachable streak was 5. That made two of the three streak badges — "Week
 * Strong" (7) and "Unstoppable" (30) — impossible to earn by design, and made
 * the third flicker on every Wednesday and off every Saturday. Nobody had
 * noticed because the app had not yet run through a full week with a student
 * in it.
 *
 * Friday to Monday is now consecutive. Weekend work neither breaks the streak
 * nor pads it — a Saturday session simply moves the date forward without
 * counting as a new school day.
 *
 * longestStreak is a HIGH-WATER MARK and never decreases. Badges test against
 * it, not the live streak, because an achievement that silently un-earns
 * itself the moment a streak lapses is worse than never having awarded it.
 */
function computeStreak(previousLastActiveDate, previousStreak, previousLongest = 0) {
  const today = todayStr();
  const best = (streak) => Math.max(streak, previousLongest || 0);
  if (!previousLastActiveDate) return { streak: 1, lastActiveDate: today, longestStreak: best(1) };

  const gap = schoolDaysBetween(previousLastActiveDate, today);
  // No school day has passed — same day, or a weekend session after Friday.
  if (gap === 0) {
    const streak = previousStreak || 1;
    return { streak, lastActiveDate: today, longestStreak: best(streak) };
  }
  if (gap === 1) {
    const streak = (previousStreak || 0) + 1;
    return { streak, lastActiveDate: today, longestStreak: best(streak) };
  }
  return { streak: 1, lastActiveDate: today, longestStreak: best(1) }; // a school day was missed
}

/**
 * Rank, with a floor: it can rise but never fall.
 *
 * This shadows the imported gate calculation on purpose, so all ~20 call sites
 * in this store get the guarantee without being edited individually.
 *
 * WHY A FLOOR IS NEEDED: the gates in ranks.js are absolute lesson counts, and
 * they have to be re-scaled whenever the curriculum grows (it went 331 -> 356
 * unnoticed). Re-scaling raises the bar, which without this would DEMOTE a
 * student who had already passed the old one. No child should lose a rank
 * because new subjects shipped. With the floor in place, recalibration is safe
 * to do routinely instead of being quietly avoided.
 */
let highWaterRankTier = 1;

/**
 * WHEN each rank and mastery milestone was reached.
 *
 * WHY THIS EXISTS: certificates are printable and explicitly "for the binder" —
 * they are Georgia homeschool records. They carried no student name and no
 * date, which makes them decorative rather than evidence. A date has to be
 * captured at the moment the thing is achieved; it cannot be reconstructed
 * afterwards, so it is recorded here, in the one place rank advancement is
 * detected. Certificates for milestones reached BEFORE this shipped simply
 * print without a date rather than inventing one.
 */
let rankTierDates = {};        // tier -> 'YYYY-MM-DD'
let masteryMilestoneDates = {}; // threshold -> 'YYYY-MM-DD'

/** Thresholds that have a certificate behind them. */
const MASTERY_CERTIFICATE_THRESHOLDS = [100];

/**
 * HOW MANY THINGS HE HAS ACTUALLY MASTERED — the second half of every rank gate.
 *
 * ---- WHY THIS FUNCTION EXISTS (Aug 13, 2026) ----
 *
 * The parent, looking at his Progress screen: 1,085 XP against a 500 target, a
 * bar pinned full, "0 XP to Flight Cadet" — and still Junior Engineer, Tier 1
 * of 8. "check how the xp works, whats it for, and what needs to be updated."
 *
 * The rank was right. Advancement is a DUAL gate — XP *and* lessons mastered
 * (ranks.js) — and he had 6 mastered against Flight Cadet's 32.
 *
 * The reason he had 6 is the part worth writing down. This count was computed
 * in nineteen places in this file as
 *
 *     totalMasteredCount(state)
 *
 * i.e. Mission Control lessons and nothing else. But Math, Science and Reading
 * moved to Khan Academy months ago; four of the five subjects he touches on a
 * normal day are Khan. All of that work paid XP and moved his rank NOT AT ALL.
 * The two halves of the gate had quietly stopped measuring the same boy.
 *
 * So a graded Khan unit now counts, and the bar for it is the SAME bar a
 * lesson has to clear: MASTERY_THRESHOLD, 90%. Not "he pressed done", not "she
 * entered any score at all" — 90% on the unit test, because the word in
 * `minMasteredForTier` is *mastered*, and a gate that counts 70% as mastery is
 * a gate that means nothing. He can see the rule and aim at it.
 *
 * Nineteen copies of one expression is also how two of them come to disagree,
 * so there is now one.
 */
const KHAN_MASTERY_PERCENT = 90;

export function totalMasteredCount(state) {
  const lessons = Object.values(state?.lessonProgress || {}).filter((p) => p.mastered).length;
  const khan = (state?.khanAcademyAssignments || []).filter(
    (a) => a.completed && Number(a.gradePercent) >= KHAN_MASTERY_PERCENT
  ).length;
  return lessons + khan;
}

/**
 * WHICH SUBJECT A WRITING ENTRY BELONGS TO.
 *
 * Every writing prompt and every daily drill is English Language Arts — the
 * prompts carry `subject: 'reading'` (this app's id for ELA after the Aug 6
 * Language Arts merge), and the drills are the sentence-and-paragraph work that
 * sits underneath the same subject.
 *
 * ---- THE PROJECT POOLS ARE PROMPTS TOO (Aug 23, 2026) ----
 *
 * This function used to search `writingPrompts` alone — fourteen rows, every
 * one of them `subject: 'reading'` — while its own docstring claimed
 * "experiment write-ups reached the same table from Aerospace and Science, so
 * those are read off the prompt rather than assumed." That was false, and it
 * had been false since the project pools were added.
 *
 * `WritingPromptEngine` submits against ids from six pools, not one. The other
 * five carry **32 project prompts** — the bottle rocket, the parachute drop,
 * the wind tunnel, the Tinkercad nameplate, the sun survey, thirteen science
 * experiments — and every one of them declares its own `subject`. Searching
 * only `writingPrompts` returned `null` for all 32, so `writingGraded` could
 * never match one, so **a graded project write-up reached no subject average,
 * no transcript and no records packet.** Graded, and gone.
 *
 * `src/lib/academicPortfolio.js` has always resolved this correctly, across
 * all six pools. Two functions were answering the same question and only one
 * of them was right; this is the other one being brought into line.
 */
const WRITING_PROMPT_POOLS = [
  writingPrompts,
  aerospaceProjects,
  scienceExperiments,
  technologyProjects,
  roboticsProjects,
  gardenProjects
];

/** promptId -> subject, built once from every pool the prompt engine can serve. */
const PROMPT_SUBJECT = new Map();
for (const pool of WRITING_PROMPT_POOLS) {
  for (const item of pool || []) {
    if (item?.id && item.subject) PROMPT_SUBJECT.set(item.id, item.subject);
  }
}

function subjectOfWritingEntry(entry) {
  if (!entry) return null;
  const subject = PROMPT_SUBJECT.get(entry.promptId);
  if (subject) return subject;
  // Daily drills (wd-w##-d#) are ELA by construction.
  if (typeof entry.promptId === 'string' && /^wd-w\d{2}-d\d$/.test(entry.promptId)) return 'reading';
  return null;
}

function getCurrentRank(xp, totalMastered) {
  const computed = computeRankFromGates(xp, totalMastered);

  let dirty = false;
  if (computed.tier > highWaterRankTier) {
    highWaterRankTier = computed.tier;
    if (!rankTierDates[computed.tier]) rankTierDates[computed.tier] = todayStr();
    dirty = true;
  }
  for (const threshold of MASTERY_CERTIFICATE_THRESHOLDS) {
    if (totalMastered >= threshold && !masteryMilestoneDates[threshold]) {
      masteryMilestoneDates[threshold] = todayStr();
      dirty = true;
    }
  }
  if (dirty) {
    // Fire-and-forget: this happens a handful of times in the student's life,
    // and earning a rank must never be blocked by writing down that he did.
    saveMeta({ highestRankTier: highWaterRankTier, rankTierDates, masteryMilestoneDates }).catch(() => {});
  }

  return computed.tier >= highWaterRankTier ? computed : RANKS[highWaterRankTier - 1] || computed;
}

const initialState = {
  hydrated: false,
  hydrationError: null, // set when loading saved data fails, so App.jsx can show a real message + Retry instead of an endless spinner (Batch A, Aug 2026)
  xp: 0,
  streak: 0,
  longestStreak: 0, // high-water mark; badges test this so they can never un-earn
  lastActiveDate: null,
  lessonProgress: {}, // lessonId -> { mastered, bestAccuracy, attempts, lastCompletedDate }
  reviewGameCompletions: {}, // `${subject}::${quarter}` -> ISO date of most recent Term Blitz completion. Used to gate Quarterly Exam retakes: per the confirmed retake policy (PROJECT_PLAN.md Part 4), a failed exam requires real re-practice (Term Blitz counts) before a retry unlocks — this is that re-practice's timestamp.
  writingEntries: [], // flat array of { id, promptId, text, wordCount, completedAt }
  weeklyWords: { spelling: null, vocabulary: null }, // skill -> weekly word state row
  scheduleBlocks: [], // [{ id, startTime, endTime, label, colorKey }, ...], parent-customizable
  typingLessonProgress: {}, // lessonId -> { mastered, bestAccuracy, attempts }
  allAttendance: {}, // date ('YYYY-MM-DD') -> { activeMinutes, lessonsCompleted, writingEntries, typingSessions }
  parentNotes: [], // [{ id, text, subject, createdAt }, ...]
  assignments: [], // [{ id, title, instructions, dueDate, subject, assignmentType, estimatedTime, referenceType, referenceDetails, uploadFile, uploadFileName, completed, createdAt }, ...] — `description` was the pre-Assignment-Creator field name; old rows may still have it (see addAssignment's comment)
  readingLog: [], // [{ id, title, author, amount, unit, date, notes }, ...]
  portfolio: [], // [{ id, title, reflection, dateCompleted, subject }, ...]
  // "Explain this to Commander Nova in your own words" — one row per beat.
  // Held in state (as of Aug 8, 2026) so the Ready to Grade queue can show
  // them. Before this they were written and never read back.
  selfExplanations: [], // [{ id, lessonId, beatLabel, text, completedAt, grade, gradedAt }, ...]
  khanAcademyAssignments: [],
  // One row per DAY: { date, subjects: { math: true, ... } }. Separate from
  // khanAcademyAssignments because "did he work today" and "is this unit
  // finished" are different questions — a unit spans several days.
  khanDailyLog: {}, // [{ id, subject, skillTitle, gradeLevel, khanAcademyUrl, completed, grade, completedAt, createdAt, batchLabel }, ...]
  /**
   * One row per DAY: date -> { date, completedAt, goal, question,
   * checkedForUpdate, syncedWork, buildStamp }.
   *
   * The 08:30 block. See db.js v33 for why it had to become a real record
   * rather than an assumption: block-1 was thirty minutes a day that nothing
   * in the app could ever mark as having happened.
   */
  morningMeetings: {},
  reviewSchedule: {}, // generatorId -> { intervalDays, nextDueDate, lastResult, lastReviewedDate } — real spaced-repetition due dates (PROJECT_PLAN.md instructional-design audit, gap 1)
  studyCycles: {}, // `${subject}::${quarter}` -> { day1CompletedAt, day2CompletedAt, day3CompletedAt, day4CompletedAt } — the 5-day spaced-retrieval study cycle (PROJECT_PLAN.md Part 4)
  peBodyMetrics: [], // [{ id, date, heightIn, weightLb, note, createdAt }, ...] — periodic height/weight check-ins, health-framed only
  peDailyLog: {}, // date ('YYYY-MM-DD') -> { waterOz, proteinG, sleepHours, activityMinutes, mood, updatedAt }
  peWorkoutLog: [], // [{ id, date, category, exerciseIds, completedAt }, ...] — completed workout sessions
  peWeeklyGoals: {}, // weekKey (e.g. '2026-W32') -> { goalText, achieved, createdAt }
  peMeals: [], // [{ id, date, mealType, description, proteinG, createdAt }, ...] — logged meals/snacks, fuel/energy-framed
  gardenLog: [], // [{ id, date, kind, briefId, projectId, title, notes, data, createdAt }, ...] — one row per real thing done in the garden (db.js v28)
  guitarLog: [], // [{ id, date, kind, skillId, theoryId, title, notes, data, createdAt }, ...] — one row per real thing done with the guitar (db.js v29)
  /**
   * One row per real piece of typing practice, CARRYING THE DATE IT HAPPENED
   * (db.js v35). `typingScores` and `typingLessonProgress` hold his bests and
   * his mastery and neither has ever held a date, which is why block-5b —
   * fifteen minutes a day — could not be credited toward his Georgia hours.
   * A personal best is not evidence of a school day.
   */
  typingLog: [], // [{ id, date, kind: 'lesson' | 'speed', passageId, lessonId, wpm, accuracy, createdAt }, ...]
  academicBooks: [], // [{ id, subject, slotId, type, title, author, note, status, startedAt, completedAt, isCustom, createdAt }, ...] — Academic Success Center Family/Subject Library (PROJECT_PLAN.md Part 9)
  adminRecords: [], // [{ id, kind, date, title, detail, hours, subject, createdAt }, ...] — Part 8 field trips, volunteer hours, extracurriculars, awards, test records
  courseDescriptions: {}, // subject -> { description, updatedAt } — formal per-subject descriptions for transcripts
  complianceChecks: {}, // requirement id -> { done, completedAt, note } — Georgia checklist, what the PARENT says she did
  evidenceLinks: {}, // folder slot key (see lib/driveLinks.js EVIDENCE_FOLDERS) -> Drive URL or null. Where the actual scans, photos and certificates live, since the app deliberately stores no files itself.
  missionEvaluations: [], // [{ quarter, projectId, customTitle, status, scores, feedback, parentApproved, driveUrl, declinedIds, ... }] — ONE per quarter (PROJECT_PLAN.md Part 8)
  parentAuth: { configured: false, declined: false, hint: null }, // NEVER holds the passcode or its hash — just what the UI needs to decide which screen to show
  parentUnlocked: false, // session-only, deliberately never persisted: closing the tab re-locks. Persisting it would mean unlocking once unlocks forever, which is the whole thing this is meant to prevent.
  academicAssignments: [], // [{ id, subject, slotId, quarter, type, title, note, dueDate, status, grade, startedAt, completedAt, gradedAt, isCustom, createdAt }, ...]
  /**
   * The Marketplace ledger (Part 10). Append-only, one row per discrete money
   * event. Balances are FOLDED from this plus XP-derived earning and never
   * stored — see src/lib/economy.js for why that is the only shape that
   * survives the two-computer handoff.
   */
  ledger: [],

  /**
   * Dream Goals (Part 10, v32). One row per goal he has set; at most one
   * 'active' at a time. The MONEY is not here — reserved Credits leave his
   * spendable balance as ledger entries, exactly like a purchase, so there is
   * only ever one account of where his Credits are.
   */
  dreamGoals: [],

  // Gamification (Part 5). coinsSpent + cosmetics + equipped live in the meta
  // singleton (saveMeta merges); rewards/redemptions are their own tables.
  coinsSpent: 0,
  unlockedCosmetics: [], // cosmetic ids the student has bought
  equippedAvatar: null, // cosmetic id or null (→ default Cadet)
  equippedRocket: null, // cosmetic id or null (→ default Classic)
  equippedTheme: null, // theme id or null (→ Telemetry). See lib/themes.js.
  /**
   * 'comfortable' | 'compact' — how tightly the Mission Control board packs.
   *
   * A setting rather than a purchase: layout is how he prefers to work, not a
   * reward, and charging coins for a readable line height would be the app
   * taxing him for his own eyesight.
   */
  boardDensity: 'comfortable',
  /**
   * Avatar Gear, one item per slot: { hair, face, body, hands, expression,
   * victory } -> item id. An object rather than a list because a slot holds
   * exactly one thing, and "which hat is on" is a different question from
   * "which hats do I own" (that stays in unlockedCosmetics).
   */
  equippedGear: {},
  /**
   * WHERE HE HAS PUT HIS FURNITURE: { hqItemId -> { u, v } }.
   *
   * ---- WHY (Aug 25, 2026) ----
   *
   * The parent, for the SECOND time: **"everything is just placed randomly
   * around in the HQ."** She said it on Aug 16 too, and that fix — zones, a
   * floor plan, a guard against pieces standing inside each other — was real
   * and evidently not enough. A layout somebody else chose is still somebody
   * else's layout.
   *
   * So this is her own alternative, taken: *"maybe that it can be moved around
   * so Lamar can place them where he wants them."*
   *
   * Empty means the designed layout, so this table only ever holds the pieces
   * he has actually moved. That matters for the merge — an empty object is
   * "I have not rearranged anything", not "I have arranged everything at the
   * origin".
   */
  hqLayout: {},
  /**
   * WHERE HE HAS POSTED HIS CREW: { crewId -> stationId }.
   *
   * His arrangement of his own room, exactly like `hqLayout` — not a record of
   * anything. Nothing in the report card, the transcript or the compliance
   * packet reads it, and it is deliberately sparse: an empty object means "I
   * have not posted anyone", not "everyone is unassigned".
   *
   * Whether a crew member has ARRIVED is never stored here. That is derived
   * from his schoolwork every time it is asked (`lib/hqCrew.js`), because a
   * stored "you earned this" flag is a second opinion about his record, and two
   * opinions eventually disagree.
   */
  hqCrewPosts: {},
  /**
   * PARENT-CURATED exercise demo videos: { exerciseId -> url }.
   *
   * WHY THE PARENT PICKS THESE. The obvious build was a YouTube search link per
   * exercise. That was rejected: YouTube itself limits how often it recommends
   * fitness and weight content to teenagers, on its own safety review of
   * body-image harm — so dropping a twelve-year-old into search results on a
   * screen he opens daily would land him on precisely the surface the platform
   * has flagged, via the sidebar and autoplay rather than the video anyone
   * chose.
   *
   * Hard-coding 70 third-party video ids was rejected too: nobody here can
   * verify what any of them will contain in a year, and this app has to last
   * six. Link rot is already a documented risk for the external educational
   * links elsewhere in the plan.
   *
   * So: empty by default, the parent adds a link once she has watched it, and
   * the student only ever sees a video she chose. Where she has not set one,
   * the existing form cues and safety notes stand on their own — they are
   * detailed enough to work without video.
   */
  /**
   * platformId -> the link SHE pasted. Blooket, Kahoot and Gimkit are
   * teacher-hosted: the address that gets him into a game changes every time
   * she sets one, so there is nothing to hard-code. Empty until she fills it
   * in, and his card says so rather than sending him to a code box he cannot
   * fill. See data/games/quizPlatforms.js.
   */
  quizLinks: {},
  exerciseVideos: {},
  /** Which creator's channel demo searches are scoped to, and whether they show at all. */
  exerciseVideoSourceId: null,
  exerciseVideosEnabled: true,
  rewards: [], // parent-defined real-world rewards catalog
  rewardRedemptions: [], // coin-spend history + parent-approval queue
  readinessAwards: {}, // skillId -> { level, note, updatedAt } — parent-awarded Engineer Readiness
  fieldTrips: [], // [{ id, destination, date, cost, travelTimeMin, subjects, gradeLevel, notes, hours, status, learningPack, portfolioEntryId, completedAt, createdAt }, ...]
  messages: [], // [{ id, sender: 'parent'|'student', body, createdAt, readByParent, readByStudent }, ...] — Mission Comms thread (oldest → newest)

  /**
   * Backup bookkeeping (go-live open item 1, built Aug 9, 2026).
   *
   * Nothing in this app knew when its records had last been copied
   * anywhere. That was survivable while the only thing at stake was a
   * score; it stopped being survivable the day Credits started
   * converting into real outings and the year's attendance record —
   * which Georgia asks for — lived in one browser's IndexedDB on one
   * laptop. `null` means never.
   */
  /**
   * The class bell (Aug 9, 2026). Parent-set, persisted in meta.
   *
   * `classBellArmed` is NOT stored — arming needs a real tap in THIS tab
   * because browsers refuse to play audio otherwise, so remembering it across
   * reloads would produce a card claiming the bell is on while it silently
   * cannot ring. That is the one state worth being pessimistic about.
   */
  /** Parent toggle for the monthly supply crate. Default ON (design D11). */
  supplyCrateEnabled: true,

  classBellEnabled: true,
  classBellWarningMinutes: 2,

  lastExportAt: null,
  lastImportAt: null,
  /** The `exportedAt` stamp INSIDE the file last imported — not when we imported it. */
  lastImportedExportAt: null,
  lastExportBytes: null,
  lastExportRowCount: null,

  currentRank: getCurrentRank(0, 0)
};

/**
 * Guards against two hydrations running at once.
 *
 * React StrictMode (see main.jsx) deliberately invokes effects twice in
 * development, so App.jsx's `useEffect(() => hydrate())` fires two
 * concurrent calls. Every seed block in hydrate() follows read-then-
 * insert: both calls read the table before either writes, both conclude
 * the slot is missing, and both insert it. The result is duplicated
 * seeded rows — which is exactly why the Khan Academy seeding below
 * already carries a de-duplication pass.
 *
 * Rather than adding a cleanup pass per table forever, this closes the
 * race itself: a second call while one is in flight awaits the first
 * instead of racing it. Cleared on completion, so later re-hydration
 * (after a reset, or in tests) still works normally.
 */
let hydrationInFlight = null;

/**
 * Bring a parent's SAVED schedule forward to include blocks added to the
 * recommended default AFTER that schedule was first written — without
 * discarding a single thing she customized.
 *
 * The problem is structural, not cosmetic. `scheduleBlocks` is persisted whole
 * on first run and then treated as parent-owned config, which is correct — but
 * it means every later improvement to `defaultSchedule` is invisible to
 * existing users, and the only escape hatch in the UI is "Reset to Recommended
 * Schedule", which is destructive. A parent who has moved lunch, renamed a
 * block, or added her own slot has to choose between keeping her work and
 * getting the new block. That is a false choice, and on Aug 7, 2026 it was the
 * live situation: "I told him to follow that schedule but that isn't there."
 *
 * Rules:
 *   - Match by BLOCK ID, never by label or time — the parent may have renamed
 *     or moved anything, and a renamed block is still that block.
 *   - Only ADD what is missing. Never delete, never reorder.
 *   - Carve a new block out of its host block ONLY if that host is still
 *     sitting at its shipped default window. The moment the parent has moved
 *     or shortened it, her times are hers: append at the end of the day
 *     instead, where she can drag it wherever she wants. (An early draft
 *     skipped this check and produced a 14:00–13:30 block — a negative
 *     duration — for a parent who had moved Language Arts.)
 *   - Return the ORIGINAL array reference when nothing changed, so the caller
 *     can skip the write. Idempotence is the whole contract: this runs on
 *     every hydrate, forever.
 */
/**
 * The one key in khanDailyLog that is not a Khan subject.
 *
 * Typing runs on EdClub, which this app cannot see into, so the only honest
 * signal is him ticking a box. That is exactly the shape khanDailyLog already
 * has — date -> { subject: true } — so it lives there rather than growing a
 * second daily-log slice, a second table and a second import merge. The single
 * cost is that anything counting "Khan work" has to skip this key.
 */
export const NON_KHAN_DAILY_SUBJECT = 'typing';

export function migrateSavedSchedule(saved) {
  if (!Array.isArray(saved) || saved.length === 0) return saved;

  const toMinutes = (hhmm) => {
    const m = /^(\d{1,2}):(\d{2})$/.exec(String(hhmm ?? ''));
    return m ? Number(m[1]) * 60 + Number(m[2]) : null;
  };
  const toHHMM = (mins) => {
    const capped = Math.max(0, Math.min(23 * 60 + 59, mins));
    return String(Math.floor(capped / 60)).padStart(2, '0') + ':' + String(capped % 60).padStart(2, '0');
  };

  const have = new Set(saved.map((b) => b && b.id));
  let blocks = saved;
  let changed = false;

  // --- Spelling & Vocabulary (block-7b), added to the default Aug 7, 2026 ---
  // Spelling and vocabulary run a real Mon-Fri cycle (introduce, practice x3,
  // quiz) in lib/weeklyWords.js, but the printed routine never named them — so
  // "follow the schedule" genuinely did not tell him to do it.
  if (!have.has('block-7b')) {
    const spec = defaultSchedule.find((b) => b.id === 'block-7b');
    const hostSpec = defaultSchedule.find((b) => b.id === 'block-7');
    if (spec && hostSpec) {
      const runLength = (toMinutes(spec.endTime) ?? 0) - (toMinutes(spec.startTime) ?? 0);
      const next = [...blocks];
      const hostIndex = next.findIndex((b) => b && b.id === 'block-7');
      const host = hostIndex === -1 ? null : next[hostIndex];
      // "Untouched" = still starts where it shipped and still runs long enough
      // to give up the 15 minutes. Anything else is the parent's own layout.
      const hostUntouched =
        !!host &&
        host.startTime === hostSpec.startTime &&
        (toMinutes(host.endTime) ?? 0) >= (toMinutes(spec.endTime) ?? 0);

      if (hostUntouched) {
        // Carve the 15 minutes out of Language Arts rather than bolting it on
        // the end, so the school day does not silently grow.
        next[hostIndex] = { ...host, endTime: spec.startTime };
        next.splice(hostIndex + 1, 0, { ...spec });
      } else {
        let latestEnd = null;
        for (const b of next) {
          const end = toMinutes(b && b.endTime);
          if (end !== null && (latestEnd === null || end > latestEnd)) latestEnd = end;
        }
        const start = latestEnd === null ? (toMinutes(spec.startTime) ?? 0) : latestEnd;
        next.push({
          ...spec,
          startTime: toHHMM(start),
          endTime: toHHMM(start + (runLength > 0 ? runLength : 15))
        });
      }
      blocks = next;
      changed = true;
    }
  }

  // --- Electric Guitar practice (block-10), added to the default Aug 8, 2026 ---
  // Adding a block to defaultSchedule.js alone reaches NOBODY who already has a
  // saved schedule — and both of this family's computers do. scheduleBlocks is
  // persisted whole on first run and then treated as parent-owned config, which
  // is correct, and which is exactly why this function exists.
  //
  // UNLIKE block-7b, this one is NOT carved out of a host block. Fifteen minutes
  // of guitar after the school day genuinely makes the day fifteen minutes
  // longer, and pretending otherwise by stealing the time from Aerospace would
  // be a lie about what was agreed. So it is appended AFTER the last block she
  // has, wherever that is — if she has moved her day around, it lands at the end
  // of HER day rather than at a time that no longer means anything.
  if (!have.has('block-10')) {
    const spec = defaultSchedule.find((b) => b.id === 'block-10');
    const hostSpec = defaultSchedule.find((b) => b.id === 'block-9');
    if (spec && hostSpec) {
      const runLength = (toMinutes(spec.endTime) ?? 15) - (toMinutes(spec.startTime) ?? 0);
      const next = blocks === saved ? [...blocks] : blocks;
      const host = next.find((b) => b && b.id === 'block-9');
      // "Untouched" = block-9 still ends where it shipped, so 3:00 is still the
      // real end of her school day and the habit cue this block was chosen for
      // still fires there.
      const hostUntouched = !!host && host.endTime === hostSpec.endTime;
      if (hostUntouched) {
        next.push({ ...spec });
      } else {
        let latestEnd = null;
        for (const b of next) {
          const end = toMinutes(b && b.endTime);
          if (end !== null && (latestEnd === null || end > latestEnd)) latestEnd = end;
        }
        const start = latestEnd === null ? (toMinutes(spec.startTime) ?? 0) : latestEnd;
        next.push({
          ...spec,
          startTime: toHHMM(start),
          endTime: toHHMM(start + (runLength > 0 ? runLength : 15))
        });
      }
      blocks = next;
      changed = true;
    }
  }

  // --- block-9 gains Gardening and Guitar in its name, Aug 8, 2026 ---
  // Same rule as every other rename in this function: ONLY a label that is
  // itself a shipped default is touched. If she has typed her own name for this
  // block, hers stays and this does nothing.
  const LEGACY_BLOCK_9_LABELS = new Set([
    // Replaced Aug 9 2026 when gardening moved after school and the block went
    // to one subject per day. Kept here so a saved schedule still carrying it
    // is relabelled rather than treated as the parent's own wording.
    'Aerospace / Social Studies / Coding / Robotics / STEM Project · Fridays: Gardening or Guitar Theory',
    'Aerospace / Social Studies / Coding / Robotics / STEM Project',
    'Aerospace / Coding / Robotics / STEM Project',
    // THE ONE THAT WAS ACTUALLY ON HER MACHINE. Added Aug 8, 2026 after she
    // sent a screenshot of her real Schedule screen still reading this.
    //
    // It was left out of the first pass because testmig3's fixture calls it
    // "her custom block-9 wording" and asserts it must be untouched. That
    // fixture is wrong, and PROJECT_LOG.md settles it in so many words:
    // "block-9's label changed from 'Aerospace Engineering / Coding / Robotics
    // / STEM Project' to 'Aerospace / Social Studies / Coding / Robotics / STEM
    // Project'". MASTER_VISION.md lists it as the original recommended routine
    // too. It was a SHIPPED DEFAULT, and her saved schedule is simply frozen at
    // it because no migration had ever renamed block-9 before this one.
    //
    // Renaming it fixes two things at once: her printed schedule has never
    // named Social Studies either, even though Social Studies has been running
    // in this block on Tuesdays and Thursdays all along.
    'Aerospace Engineering / Coding / Robotics / STEM Project'
  ]);
  const block9Index = blocks.findIndex(
    (b) => b && b.id === 'block-9' && LEGACY_BLOCK_9_LABELS.has(b.label)
  );
  if (block9Index !== -1) {
    const spec = defaultSchedule.find((b) => b.id === 'block-9');
    if (spec && spec.label !== blocks[block9Index].label) {
      const next = blocks === saved ? [...blocks] : blocks;
      next[block9Index] = { ...next[block9Index], label: spec.label };
      blocks = next;
      changed = true;
    }
  }

  // --- block-3: "Reading" (Aug 7) then "Independent Reading" (Aug 10) ---
  // The slot now holds the Reading & Literature lesson; the novel moved to
  // bedtime at the parent's instruction. Same rule as everywhere else here:
  // rename ONLY a label that was itself a shipped default, so a parent who
  // typed her own name for this block keeps it.
  if (blocks.some((b) => b && b.id === 'block-3' && (b.label === 'Reading' || b.label === 'Independent Reading'))) {
    const spec = defaultSchedule.find((b) => b.id === 'block-3');
    if (spec && spec.label !== 'Reading' && spec.label !== 'Independent Reading') {
      const next = blocks === saved ? [...blocks] : blocks;
      const i = next.findIndex((b) => b && b.id === 'block-3');
      next[i] = { ...next[i], label: spec.label };
      blocks = next;
      changed = true;
    }
  }

  // --- Retire the "Writing" wording (subject merged into Reading, Aug 6) ---
  // Label only, and only for labels that were themselves shipped defaults —
  // never for anything the parent typed herself.
  const LEGACY_BLOCK_7_LABELS = new Set([
    'Writing / Language Arts',
    'Writing & Language Arts',
    'Language Arts / Writing',
    'Writing'
  ]);
  const legacyIndex = blocks.findIndex(
    (b) => b && b.id === 'block-7' && LEGACY_BLOCK_7_LABELS.has(b.label)
  );
  if (legacyIndex !== -1) {
    const spec = defaultSchedule.find((b) => b.id === 'block-7');
    if (spec) {
      const next = blocks === saved ? [...blocks] : blocks;
      next[legacyIndex] = { ...next[legacyIndex], label: spec.label };
      blocks = next;
      changed = true;
    }
  }

  // --- Morning retime, Aug 9 2026 ---
  // Reading 45 -> 15 min, Language Arts & Writing 30 -> 60. Changing
  // defaultSchedule.js alone reaches NOBODY who already has a saved schedule,
  // and both of this family's computers do — same reason every other migration
  // in this function exists.
  //
  // THIS IS THE FIRST MIGRATION THAT CHANGES TIMES RATHER THAN LABELS, so the
  // "was it a shipped default" test has to be stricter, not looser. All five
  // blocks must still carry the EXACT times they shipped with. If even one has
  // been moved, the parent has laid out her own morning and this does nothing
  // at all — a partial retime would leave her with overlapping or gapped
  // blocks, which is worse than leaving it alone.
  const MORNING_RETIME = [
    { id: 'block-3', from: ['10:00', '10:45'], to: ['10:00', '10:15'] },
    { id: 'block-4', from: ['10:45', '11:00'], to: ['10:15', '10:30'] },
    { id: 'block-5', from: ['11:00', '12:00'], to: ['10:30', '11:30'] },
    { id: 'block-6', from: ['12:00', '13:00'], to: ['11:30', '12:30'] },
    // block-7 keeps its 13:30 end on purpose — that is what leaves Spelling &
    // Vocabulary, PE, the rotating block and Guitar sitting exactly where they
    // already sat.
    { id: 'block-7', from: ['13:00', '13:30'], to: ['12:30', '13:30'] }
  ];
  const retimeTargets = MORNING_RETIME.map((spec) => ({
    spec,
    index: blocks.findIndex((b) => b && b.id === spec.id)
  }));
  const allShipped = retimeTargets.every(
    ({ spec, index }) =>
      index !== -1 &&
      blocks[index].startTime === spec.from[0] &&
      blocks[index].endTime === spec.from[1]
  );
  if (allShipped) {
    const next = blocks === saved ? [...blocks] : blocks;
    for (const { spec, index } of retimeTargets) {
      next[index] = { ...next[index], startTime: spec.to[0], endTime: spec.to[1] };
    }
    blocks = next;
    changed = true;
  }

  // --- Typing (block-5b), added to the default Aug 9 2026 -------------------
  // The parent: "I also wanted to have science to 45 minutes and 15 minutes of
  // typing." Carved OUT of Science rather than bolted on, so lunch still starts
  // at 11:30 and the school day does not grow by fifteen minutes.
  //
  // Same "was this a shipped default" test as block-7b: Science must still
  // start where it shipped AND still run long enough to give up the quarter
  // hour. A Science block the parent has already retimed is her layout, and
  // carving into it would leave her with a gap or an overlap.
  if (!have.has('block-5b')) {
    const spec = defaultSchedule.find((b) => b.id === 'block-5b');
    const hostSpec = defaultSchedule.find((b) => b.id === 'block-5');
    if (spec && hostSpec) {
      const next = blocks === saved ? [...blocks] : blocks;
      const hostIndex = next.findIndex((b) => b && b.id === 'block-5');
      const host = hostIndex === -1 ? null : next[hostIndex];
      const hostUntouched =
        !!host &&
        host.startTime === hostSpec.startTime &&
        (toMinutes(host.endTime) ?? 0) >= (toMinutes(spec.endTime) ?? 0);
      if (hostUntouched) {
        next[hostIndex] = { ...host, endTime: spec.startTime };
        next.splice(hostIndex + 1, 0, { ...spec });
        blocks = next;
        changed = true;
      }
    }
  }

  // --- Gardening after school (block-11), added to the default Aug 9 2026 ---
  // The parent: "Gardening will be after school." It used to live inside
  // Friday's 2:15 block, which was never long enough — garden briefs run 60 to
  // 300 minutes. This is appended AFTER the last block rather than carved out
  // of anything, because it sits outside the school day and takes no
  // instructional time from it. Guitar keeps 3:00-3:15 and still marks the end
  // of school.
  //
  // Only added when the tail of the saved schedule is still the shipped one. If
  // the parent has built her own afternoon, appending a 90-minute block to the
  // end of it would be this file guessing at her layout.
  if (!have.has('block-11')) {
    const spec = defaultSchedule.find((b) => b.id === 'block-11');
    const guitarSpec = defaultSchedule.find((b) => b.id === 'block-10');
    const guitarIndex = blocks.findIndex((b) => b && b.id === 'block-10');
    const guitar = guitarIndex === -1 ? null : blocks[guitarIndex];
    const guitarUntouched =
      !!guitar && !!guitarSpec &&
      guitar.startTime === guitarSpec.startTime &&
      guitar.endTime === guitarSpec.endTime &&
      guitarIndex === blocks.length - 1;
    if (spec && guitarUntouched) {
      const next = blocks === saved ? [...blocks] : blocks;
      next.push({ ...spec });
      blocks = next;
      changed = true;
    }
  }

  return changed ? blocks : saved;
}

/**
 * One book at a time.
 *
 * The parent, Aug 7 2026: "The reading assignment is due in 2 months. Is that
 * the correct amount of time for a book report."
 *
 * It was not, and the cause was worse than the length: EVERY reading
 * assignment in a period carried the SAME due date. Q1 had four books all
 * stamped Oct 9; the whole year had nineteen books across five dates. The home
 * screen showed whichever one it found first, so three of his four Q1 books
 * were invisible, and the calendar showed one crowded day instead of a term of
 * steady reading.
 *
 * These dates stagger them. Q1 is paced against measured lengths and ordered
 * easiest-first against his IXL reading level of 690-810 — A Long Walk to
 * Water (720L, at level) before Hatchet (1020L) before Apollo 8 (1200L, and
 * the hardest thing on the list).
 *
 * Applied at hydrate, and ONLY to rows still sitting on the old stacked date
 * with no work started. A date the parent has since changed herself, or a book
 * he has already finished, is left exactly as it is.
 */
const readingStaggerMap = {
  'asg::socialStudies::Q1::1': '2026-08-28',
  'asg::reading::Q1::1': '2026-09-18',
  'asg::reading::Q1::2': '2026-10-09',
  'asg::aerospace::Q1::1': '2026-10-16',
  'asg::socialStudies::Q1::2': '2026-10-30',
  'asg::reading::Q2::1': '2026-11-20',
  'asg::socialStudies::Q2::1': '2026-12-04',
  'asg::reading::Q2::2': '2026-12-11',
  'asg::aerospace::Q2::1': '2026-12-18',
  'asg::reading::Q3::1': '2027-01-29',
  'asg::socialStudies::Q3::1': '2027-02-12',
  'asg::science::Q3::1': '2027-02-26',
  'asg::aerospace::Q3::2': '2027-03-12',
  'asg::aerospace::Q3::1': '2027-03-26',
  'asg::reading::Q4::1': '2027-04-23',
  'asg::reading::Q4::2': '2027-05-14',
  'asg::socialStudies::Q4::1': '2027-05-07',
  'asg::aerospace::Q4::1': '2027-05-21',
  'asg::reading::Summer::1': '2027-06-25',
  'asg::socialStudies::Summer::1': '2027-07-16',
  'asg::aerospace::Summer::1': '2027-07-30'
};

/**
 * The Aug 7, 2026 book-library rebuild, applied to rows already in the
 * database.
 *
 * The parent's rule, in her words: "I want the first selection to be Black
 * American books but if there isn't a book you can select one out of that
 * range. Black Americans don't [have] a full range of books."
 *
 * Only swaps a row that still holds the ORIGINAL seeded title and that he has
 * not started or finished. A book she has changed herself, or one already in
 * progress, is left exactly as it is — the `from` check is what makes that
 * safe, and it is why this is keyed by title as well as slot.
 */
const bookSwapMap = {
  'book::math::1': { from: 'The Number Devil: A Mathematical Adventure', title: 'Reaching for the Moon: The Autobiography of NASA Mathematician Katherine Johnson', author: 'Katherine Johnson' },
  'book::reading::1': { from: 'Hatchet', title: 'Ghost', author: 'Jason Reynolds' },
  'book::reading::3': { from: 'The Martian: Classroom Edition', title: 'Tristan Strong Punches a Hole in the Sky', author: 'Kwame Mbalia' },
  'book::writing::1': { from: 'Woe Is I Jr.: The Younger Grammarphobe\'s Guide to Better English', title: 'Just Write: Here\'s How!', author: 'Walter Dean Myers' },
  'book::aerospace::1': { from: 'Apollo 8: The Mission That Changed Everything', title: 'Black Wings: Courageous Stories of African Americans in Aviation and Space History', author: 'Von Hardesty' },
  'book::aerospace::2': { from: 'Spaceman (Adapted for Young Readers)', title: 'Eugene Bullard: World\'s First Black Fighter Pilot', author: 'Larry W. Greenly' },
  'book::science::1': { from: 'Cells: Experience Life at Its Tiniest', title: 'The Immortal Life of Henrietta Lacks: The Young Reader’s Edition', author: 'Rebecca Skloot and Gregory Mone' },
  'book::technology::2': { from: 'The Boy Who Harnessed the Wind: Young Readers Edition', title: 'Great Minds of Science (Black Lives #1): A Nonfiction Graphic Novel', author: 'Tonya Bolden' }
};

export const useAppStore = create((set, get) => ({
  ...initialState,

  /** Load persisted state from IndexedDB (via Dexie) on app start. */
  async hydrate() {
    if (hydrationInFlight) return hydrationInFlight;
    hydrationInFlight = get()
      ._hydrateOnce()
      .catch((err) => {
        // Without this catch, any Dexie failure (storage quota, a blocked
        // version upgrade, corrupt IndexedDB) left the app on the loading
        // screen forever with no message. Saved data is NOT touched here —
        // hydrate only reads.
        console.error('LearningOS could not load saved data:', err);
        set({
          hydrationError:
            (err && (err.message || String(err.name || err))) ||
            'Unknown problem opening saved data.'
        });
      })
      .finally(() => {
        hydrationInFlight = null;
      });
    return hydrationInFlight;
  },

  /** Clear a failed load and try again — wired to the Retry button in App.jsx. */
  async retryHydrate() {
    set({ hydrationError: null });
    return get().hydrate();
  },

  async _hydrateOnce() {
    // Every table loads by NAME into one object — never positionally.
    // The old version was a single 33-element array destructure: adding
    // one table in the middle silently shifted every later table into the
    // wrong variable, with no runtime error. Keyed loading makes that
    // mistake impossible. (Batch A, Aug 2026.)
    // Working-window cutoff for the meal log (see loadRecentPEMeals in
    // db.js): local-date math via the same helpers the scheduler uses,
    // never toISOString().
    const mealCutoff = new Date();
    mealCutoff.setDate(mealCutoff.getDate() - 120);
    const mealCutoffStr = toDateStr(mealCutoff);

    const tableLoads = {
      meta: loadMeta(),
      progressRows: loadAllLessonProgress(),
      writingEntries: loadAllWritingEntries(),
      selfExplanationRows: loadAllSelfExplanations(),
      spellingState: loadWeeklyWordState('spelling'),
      vocabState: loadWeeklyWordState('vocabulary'),
      scheduleRow: loadSchedule(),
      typingLessonRows: loadAllTypingLessonProgress(),
      attendanceRows: loadAllAttendance(),
      parentNotesRows: loadAllParentNotes(),
      assignmentRows: loadAllAssignments(),
      readingLogRows: loadAllReadingLog(),
      portfolioRows: loadAllPortfolio(),
      khanAcademyRows: loadAllKhanAcademyAssignments(),
      reviewScheduleRows: loadAllReviewSchedule(),
      studyCycleRows: loadAllStudyCycle(),
      peBodyMetricsRows: loadAllPEBodyMetrics(),
      peDailyLogRows: loadAllPEDailyLog(),
      peWorkoutLogRows: loadAllPEWorkoutLog(),
      peWeeklyGoalsRows: loadAllPEWeeklyGoals(),
      // Full table, not a window: the garden produces a handful of rows a
      // week, and the Q4 moisture-sensor build needs EVERY watering row back
      // to August. Windowing this would quietly amputate its own dataset.
      gardenLogRows: loadAllGardenLog(),
      // Full table, same reasoning as the garden: a handful of rows a week, and
      // the practice streak and the participation record both need every row
      // back to August. Windowing this would amputate the record it exists for.
      guitarLogRows: loadAllGuitarLog(),
      typingLogRows: loadAllTypingLog(),
      // 120-day window, not the full table: covers every current UI need
      // (7-day meal rollups, the recent-meals list). Full history stays in
      // IndexedDB and is always included in exports.
      peMealsRows: loadRecentPEMeals(mealCutoffStr),
      academicBookRows: loadAllAcademicBooks(),
      academicAssignmentRows: loadAllAcademicAssignments(),
      adminRecordRows: loadAllAdminRecords(),
      courseDescriptionRows: loadAllCourseDescriptions(),
      complianceCheckRows: loadAllComplianceChecks(),
      evidenceLinkRows: loadAllEvidenceLinks(),
      parentAuthRow: loadParentAuth(),
      missionEvaluationRows: loadAllMissionEvaluations(),
      rewardRows: loadAllRewards(),
      rewardRedemptionRows: loadAllRewardRedemptions(),
      readinessAwardRows: loadAllReadinessAwards(),
      ledgerRows: loadAllLedgerEntries(),
      dreamGoalRows: loadAllDreamGoals(),
      fieldTripRows: loadAllFieldTrips(),
      // Last 500 messages, not the full table: covers the whole visible
      // chat thread. Full history stays in IndexedDB and is always
      // included in exports.
      messageRows: loadRecentMessages(500)
    };
    const loaded = Object.fromEntries(
      await Promise.all(Object.entries(tableLoads).map(async ([name, p]) => [name, await p]))
    );
    const {
      meta,
      progressRows,
      writingEntries,
      selfExplanationRows,
      spellingState,
      vocabState,
      scheduleRow,
      typingLessonRows,
      attendanceRows,
      parentNotesRows,
      assignmentRows,
      readingLogRows,
      portfolioRows,
      khanAcademyRows,
      reviewScheduleRows,
      studyCycleRows,
      peBodyMetricsRows,
      peDailyLogRows,
      peWorkoutLogRows,
      peWeeklyGoalsRows,
      peMealsRows,
      gardenLogRows,
      guitarLogRows,
      typingLogRows,
      academicBookRows,
      academicAssignmentRows,
      adminRecordRows,
      courseDescriptionRows,
      complianceCheckRows,
      evidenceLinkRows,
      parentAuthRow,
      missionEvaluationRows,
      rewardRows,
      rewardRedemptionRows,
      readinessAwardRows,
      ledgerRows,
      dreamGoalRows,
      fieldTripRows,
      messageRows
    } = loaded;

    const peDailyLog = {};
    for (const row of peDailyLogRows) {
      peDailyLog[row.date] = {
        waterOz: row.waterOz,
        proteinG: row.proteinG,
        sleepHours: row.sleepHours,
        activityMinutes: row.activityMinutes,
        mood: row.mood,
        updatedAt: row.updatedAt
      };
    }

    const peWeeklyGoals = {};
    for (const row of peWeeklyGoalsRows) {
      peWeeklyGoals[row.weekKey] = {
        goalText: row.goalText,
        achieved: row.achieved,
        createdAt: row.createdAt
      };
    }

    const reviewSchedule = {};
    for (const row of reviewScheduleRows) {
      reviewSchedule[row.generatorId] = {
        intervalDays: row.intervalDays,
        nextDueDate: row.nextDueDate,
        lastResult: row.lastResult,
        lastReviewedDate: row.lastReviewedDate
      };
    }

    const studyCycles = {};
    for (const row of studyCycleRows) {
      studyCycles[row.key] = {
        subject: row.subject,
        quarter: row.quarter,
        day1CompletedAt: row.day1CompletedAt,
        day2CompletedAt: row.day2CompletedAt,
        day3CompletedAt: row.day3CompletedAt,
        day4CompletedAt: row.day4CompletedAt
      };
    }

    const lessonProgress = {};
    for (const row of progressRows) {
      lessonProgress[row.lessonId] = {
        mastered: row.mastered,
        bestAccuracy: row.bestAccuracy,
        attempts: row.attempts,
        lastCompletedDate: row.lastCompletedDate
      };
    }

    const today = todayStr();
    const nextSpelling = computeWeeklyWordState(spellingWordPool, spellingState ?? null, today);
    const nextVocab = computeWeeklyWordState(vocabularyWordPool, vocabState ?? null, today);
    const weeklyWords = { spelling: nextSpelling, vocabulary: nextVocab };
    // Persist immediately if this hydration triggered a rotation, so it isn't
    // recomputed (and doesn't re-roll) on the next load the same day.
    await Promise.all([
      saveWeeklyWordState('spelling', nextSpelling),
      saveWeeklyWordState('vocabulary', nextVocab)
    ]);

    const xp = meta?.xp ?? 0;
    const { streak, lastActiveDate, longestStreak } = computeStreak(
      meta?.lastActiveDate ?? null,
      meta?.streak ?? 0,
      meta?.longestStreak ?? 0
    );
    // Seed the rank floor before any getCurrentRank() call below reads it.
    highWaterRankTier = Math.max(1, meta?.highestRankTier ?? 1);
    rankTierDates = { ...(meta?.rankTierDates || {}) };
    masteryMilestoneDates = { ...(meta?.masteryMilestoneDates || {}) };
    const totalMastered = totalMasteredCount({ lessonProgress, khanAcademyAssignments: khanAcademyRows });

    // Seed the recommended schedule on first run only — never overwrite a
    // parent's existing customization.
    let scheduleBlocks = scheduleRow?.blocks ?? null;
    if (!scheduleBlocks) {
      scheduleBlocks = defaultSchedule;
      await saveSchedule(scheduleBlocks);
    } else {
      // ...but a saved schedule is frozen at whatever the default looked
      // like the day it was written, and never learns about blocks added
      // later. Repair it in place instead of making her choose between her
      // customizations and the new block. Idempotent — an already-current
      // schedule comes back by reference and no write happens.
      const migratedSchedule = migrateSavedSchedule(scheduleBlocks);
      if (migratedSchedule !== scheduleBlocks) {
        scheduleBlocks = migratedSchedule;
        await saveSchedule(scheduleBlocks);
      }
    }

    // --- Book library rebuild (Aug 7, 2026) ---
    for (const row of academicBookRows) {
      const swap = bookSwapMap[row.slotId];
      if (!swap) continue;
      if (row.title !== swap.from) continue;               // already swapped, or she changed it
      if (row.status && row.status !== 'not-started') continue; // he has started it
      const changes = { title: swap.title, author: swap.author, blackExcellence: true };
      await updateAcademicBookRecord(row.id, changes);
      Object.assign(row, changes);
    }

    // Badge every qualifying book, not only the ones swapped today. Hidden
    // Figures was Black-American from the start and had never been flagged, so
    // the one book on the shelf that most obviously belonged was the one
    // missing the badge. Driven off the rationale so the two can't drift.
    for (const row of academicBookRows) {
      const rat = bookRationale[row.slotId];
      if (!rat) continue;
      const shouldFlag = rat.range !== 'outside';
      if (Boolean(row.blackExcellence) === shouldFlag) continue;
      await updateAcademicBookRecord(row.id, { blackExcellence: shouldFlag });
      row.blackExcellence = shouldFlag;
    }


    /**
     * --- Retitle the Q1 Aerospace portfolio slot (Aug 20, 2026) ---
     *
     * It was called "Bottle rocket — design, launch, and results" and dated
     * Sept 16: the title of the week-2 project on the date of the week-6 one.
     * The parent: "I don't understand why the rocket project was setup so
     * late. It doesn't take a month to do it."
     *
     * Renamed to the Wind Tunnel write-up, which is what Sept 16 was always
     * for. The bottle rocket's write-up already exists — Writing Journal,
     * Aug 16, graded C.
     *
     * SKIPPED IF HE HAS TOUCHED IT, or if she has retitled it herself. A
     * migration that overwrites her wording is the same defect as an import
     * that overwrites her due dates, and that one has already been fixed once.
     */
    for (const row of academicAssignmentRows) {
      if (row.slotId !== 'asg::aerospace::Q1::2') continue;
      const staleTitle = row.title === 'Bottle rocket — design, launch, and results';
      const staleDate = row.title === 'Wind tunnel test — design, results, and what the airflow showed'
        && row.dueDate === '2026-08-16';
      if (!staleTitle && !staleDate) continue;
      if (row.status && row.status !== 'not-started') continue;
      if (row.grade != null || row.completedAt) continue;
      /**
       * THE DATE MOVES WITH THE TITLE, OR THE FIX IS WORSE THAN THE FAULT.
       *
       * Due dates are hers and a migration has no business rewriting one — that
       * rule stands and is why the import splits student-owned from
       * parent-owned fields. This is the exception it is worth naming: her copy
       * read Aug 16, which was chosen for the BOTTLE ROCKET. Retitling to the
       * Wind Tunnel and leaving Aug 16 would have produced a write-up due
       * three and a half weeks before the thing it writes up gets built.
       *
       * So the date moves only from that one stale value, only on a slot he has
       * not touched. Any other date means she chose it, and it stays.
       */
      const changes = {
        title: 'Wind tunnel test — design, results, and what the airflow showed',
        note: 'Engineering-journal write-up of the Wind Tunnel Test built in week 6 — the fullest hands-on Aerospace project of the quarter',
        ...(row.dueDate === '2026-08-16' || row.dueDate === '2026-09-16'
          ? { dueDate: '2026-09-16' }
          : {})
      };
      await updateAcademicAssignmentRecord(row.id, changes);
      Object.assign(row, changes);
    }

    // --- Retire the "book TBD" note clause (Aug 7, 2026) ---
    // The note describes the SLOT's purpose and is still accurate; only the
    // trailing '— book TBD' is stale. It was written when the slot was empty
    // and never updated when a title was chosen, so the app's own answer to
    // "why this book?" read as "to be decided" — which is exactly what the
    // parent hit. Trimmed in place rather than copied from the seed, so a note
    // she has edited herself is never overwritten.
    const STALE_TBD_CLAUSE = /\s*[—-]\s*(book|topic) TBD\s*$/;
    for (const row of [...academicBookRows, ...academicAssignmentRows]) {
      if (typeof row.note !== 'string' || !STALE_TBD_CLAUSE.test(row.note)) continue;
      const note = row.note.replace(STALE_TBD_CLAUSE, '');
      const save = row.slotId && row.slotId.startsWith('book::')
        ? updateAcademicBookRecord
        : updateAcademicAssignmentRecord;
      await save(row.id, { note });
      row.note = note;
    }

    // --- Stagger the reading assignments (Aug 7, 2026) ---
    for (const row of academicAssignmentRows) {
      const target = readingStaggerMap[row.slotId];
      if (!target || row.dueDate === target) continue;
      // Never move a book he has started or finished, and never overwrite a
      // date the parent set herself — only rows still on the seeded date.
      if (row.status && row.status !== 'not-started') continue;
      await updateAcademicAssignmentRecord(row.id, { dueDate: target });
      row.dueDate = target;
    }

    const typingLessonProgress = {};
    for (const row of typingLessonRows) {
      typingLessonProgress[row.lessonId] = {
        mastered: row.mastered,
        bestAccuracy: row.bestAccuracy,
        attempts: row.attempts
      };
    }

    const allAttendance = {};
    for (const row of attendanceRows) {
      allAttendance[row.date] = {
        activeMinutes: row.activeMinutes,
        lessonsCompleted: row.lessonsCompleted,
        writingEntries: row.writingEntries,
        typingSessions: row.typingSessions,
        offlineMinutes: row.offlineMinutes || 0
      };
    }

    const parentNotes = [...parentNotesRows].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const assignments = [...assignmentRows].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    /**
     * Tombstones filtered out at the boundary, from v34 — the same treatment
     * `selfExplanations`, `assignments`, `rewards`, `rewardRedemptions` and
     * `fieldTrips` have had since v31.
     *
     * The ROW still exists in Dexie and still travels in the export; it just
     * never reaches state, so nothing that renders these tables had to change.
     * That is the whole point of a tombstone: the deletion is a fact both
     * computers can merge, rather than an absence that the other machine
     * cannot tell from "never had it".
     */
    const readingLog = readingLogRows
      .filter((r) => !r.deletedAt)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
    const portfolio = portfolioRows
      .filter((p) => !p.deletedAt)
      .sort((a, b) => new Date(b.dateCompleted) - new Date(a.dateCompleted));

    // Seed the Khan Academy Assignments table on first run only, from the
    // actual verified Month 1 plan (built July 27, 2026, from Lamar's real,
    // final IXL Diagnostic Action Plan before the subscription was
    // canceled — every link below was individually checked against Khan
    // Academy's live site, none guessed). IXL has no ongoing role in this
    // app anymore; this seed data is kept as real historical work already
    // in progress, not regenerated from IXL going forward. Science has no
    // entries yet since no Science diagnostic ever existed for it.
    let khanAcademyAssignments = [...khanAcademyRows];
    if (khanAcademyAssignments.length === 0) {
      const createdAt = new Date().toISOString();
      const batchLabel = 'Month 1 — July 2026';
      const seedRows = [
        { subject: 'reading', skillTitle: 'Roots, prefixes, and suffixes', gradeLevel: '5th', khanAcademyUrl: 'https://www.khanacademy.org/ela/5th-grade-reading-and-vocab/xb350e60168d6e96f:vocabulary-5th/xb350e60168d6e96f:roots-prefixes-and-suffixes-5th-vocab/a/common-roots-prefixes-and-suffixes-5' },
        { subject: 'reading', skillTitle: 'Verb tenses, including the perfect tenses', gradeLevel: '5th', khanAcademyUrl: 'https://www.khanacademy.org/humanities/grammar/parts-of-speech-the-verb' }
      ].map((r) => ({ ...r, completed: false, grade: null, completedAt: null, createdAt, batchLabel }));

      const ids = await Promise.all(seedRows.map((r) => addKhanAcademyAssignmentRecord(r)));
      khanAcademyAssignments = seedRows.map((r, i) => ({ id: ids[i], ...r }));
    }

    // ---------------------------------------------------------------------
    // Khan renamed its ELA units. Rename his rows to match, IN PLACE.
    //
    // Aug 8, 2026. Khan rebuilt 7th and 8th grade reading from thematic units
    // to skill-based ones, so a row labelled "Blazing New Trails" now opens a
    // page titled "Key ideas and details". Same work — but the wrong name on
    // his screen, and a retired name in the gradebook and on a transcript.
    //
    // Every URL was verified by LOADING it (a status check returns 200 for all
    // of these; the redirect is client-side and invisible to fetch). Each old
    // unit maps to exactly ONE distinct new unit — checked specifically for
    // collisions, because several thematic units collapsing onto the same
    // destination would have meant him doing identical work two or three times
    // under different names. There are none. So URLs are left alone and only
    // the labels move.
    //
    // THIS MUST RUN BEFORE THE READING BATCHES BELOW. The seeder matches on
    // (subject, skillTitle, batchLabel); renaming after it would leave the
    // freshly-seeded new-title row AND the renamed old row side by side.
    //
    // Renaming preserves the row id, so completion and grade history survive —
    // the same rule that governs slotIds and lesson ids everywhere else.
    //
    // NOT RENAMED: the pisa-2025-english-supplement and cc-7th-reading-vocab
    // courses were never restructured. Living Tongues, Mysteries of the Past,
    // Trailblazing Women, Obscuring the Truth, Crossing the Line and Funny
    // Business all still land on their own pages under their own names.
    // ---------------------------------------------------------------------
    const ELA_RETITLES = new Map([
      ["Uncovering Meaning: Context Clues, Word Choice, and Author's Purpose", "Craft and Structure (7th grade)"],
      ["Uncovering Meaning: Long Passage Practice", "Craft and Structure: Long Passage Practice (7th grade)"],
      ["Blazing New Trails (thematic reading unit)", "Key Ideas and Details (7th grade)"],
      ["Blazing New Trails: Long Passage Practice", "Key Ideas and Details: Long Passage Practice (7th grade)"],
      ["Mysteries (thematic reading unit)", "Integration of Knowledge and Ideas (7th grade)"],
      ["Mysteries: Long Passage Practice", "Integration of Knowledge and Ideas: Long Passage Practice (7th grade)"],
      ["The Mind at Play (8th grade thematic unit)", "Key Ideas and Details (8th grade)"],
      ["To Your Health (8th grade thematic unit)", "Integration of Knowledge and Ideas (8th grade)"],
      ["The World Beneath (8th grade thematic unit)", "Craft and Structure (8th grade)"]
    ]);
    const elaRetitled = [];
    khanAcademyAssignments = khanAcademyAssignments.map((a) => {
      if (a.subject !== 'reading') return a;
      const next = ELA_RETITLES.get(a.skillTitle);
      if (!next) return a;
      const fixed = { ...a, skillTitle: next };
      elaRetitled.push(fixed);
      return fixed;
    });
    if (elaRetitled.length > 0) {
      await Promise.all(elaRetitled.map((r) => updateKhanAcademyAssignmentRecord(r.id, r)));
    }

    /**
     * ---- MATH Q1: THE SAME TREATMENT, FOR ROWS THAT ALREADY EXIST ----
     * (Aug 11, 2026.)
     *
     * The parent: "the add fractions with unlike denominators is incorrect.
     * He is at add and subtractions Unit 4."
     *
     * Fixing mathQ1Rows below only helps a fresh install — these rows have
     * been in both databases since July. Read against Khan's live course page,
     * three of the sixteen were wrong: a unit renamed to something Khan does
     * not call it, a link that went to one EXERCISE instead of its unit, and a
     * row pointing at Florida's course rather than the one he is enrolled in.
     *
     * Keyed on the WRONG title, so a row she has renamed herself is left
     * alone, and running twice does nothing the second time.
     */
    const MATH_Q1_CORRECTIONS = new Map([
      ['Add and Subtract Decimals', {
        skillTitle: 'Add decimals',
        khanAcademyUrl: 'https://www.khanacademy.org/math/cc-fifth-grade-math/imp-addition-and-subtraction-3'
      }],
      ['Add fractions with unlike denominators', {
        skillTitle: 'Add and subtract fractions',
        khanAcademyUrl: 'https://www.khanacademy.org/math/cc-fifth-grade-math/imp-fractions-3'
      }],
      ['Volume of cubes and rectangular prisms: word problems', {
        skillTitle: 'Volume',
        khanAcademyUrl: 'https://www.khanacademy.org/math/cc-fifth-grade-math/5th-volume'
      }],
      // "(Geometry)" was ours, not Khan's — a small thing, but the whole point
      // of this map is that the two lists read identically.
      ['Properties of Shapes (Geometry)', {
        skillTitle: 'Properties of shapes',
        khanAcademyUrl: 'https://www.khanacademy.org/math/cc-fifth-grade-math/properties-of-shapes'
      }]
    ]);
    const mathRetitled = [];
    khanAcademyAssignments = khanAcademyAssignments.map((a) => {
      if (a.subject !== 'math') return a;
      const fix = MATH_Q1_CORRECTIONS.get(a.skillTitle);
      if (!fix) return a;
      const fixed = { ...a, ...fix };
      mathRetitled.push(fixed);
      return fixed;
    });
    if (mathRetitled.length > 0) {
      await Promise.all(mathRetitled.map((r) => updateKhanAcademyAssignmentRecord(r.id, r)));
    }

    // Seed the first real full-year quarterly batch — Q1 2026-2027 Math —
    // once, idempotently — checked PER LESSON (subject+skillTitle+
    // batchLabel), not per-batch, since a batch that already has some
    // lessons seeded still needs to accept new ones added to it later
    // (confirmed as a real gap: an earlier version checked only whether
    // the whole "Q1 2026-2027" batch existed at all, meaning lessons
    // added to Q1 in a later session would silently never get seeded,
    // since the batch already "existed" from the first 4). Every unit
    // URL below was individually verified against Khan Academy's actual
    // live site before being added, same standard as the original
    // Month 1 plan — none guessed. This is the full-year, quarterly-
    // planned Khan Academy content described in PROJECT_PLAN.md Part 3
    // (replacing the retired diagnostic-driven monthly model) — Q4,
    // Summer, and the other three subjects (Reading, Language Arts,
    // Science) still need this same treatment.
    //
    // Q1 is now PURE 5th grade, confirmed with the parent after
    // reconsidering: mixing in 7th-grade material would have left too
    // few real 5th-grade fundamentals lessons for a student who
    // genuinely needs that grounding before moving on. The 7th-grade
    // content that used to sit here moved to Q3 instead (see the
    // mathQ3Rows block below) as a head start once fundamentals are
    // reinforced.
    const mathQ1Label = 'Q1 2026-2027';
    // FULL 16-unit coverage of Khan Academy's 5th-grade course, in the
    // course's own unit order (Unit 1 Decimal place value → Unit 16
    // Properties of shapes), so every unit the end-of-course Course
    // Challenge tests is actually assigned. Expanded Aug 6, 2026 at the
    // parent's request from the earlier curated 12 by adding the 5 units it
    // was missing — Subtract decimals (U3), Divide decimals (U9), Coordinate
    // plane (U12), Converting units of measure (U14), Line plots (U15) —
    // with unit URLs read directly off Khan's live course page. The one
    // 6th-grade carry-over (Follow directions on a coordinate plane) sorts
    // after the 16 as enrichment. q1RestructureMap below re-applies this
    // order to already-persisted rows; the 5 new units seed into existing
    // installs via the missing-rows check, so nobody has to reinstall. The
    // earlier 6th-grade coordinate-plane carry-over was removed Aug 6, 2026
    // at the parent's request (see the removal pass after the restructure).
    /**
     * ---- THE UNIT NAMES NOW MATCH KHAN'S OWN (Aug 11, 2026) ----
     *
     * The parent: "the add fractions with unlike denominators is incorrect.
     * He is at add and subtractions Unit 4."
     *
     * She was right, and it was worse than one bad title. Read against Khan's
     * live 5th-grade course page, three of the sixteen rows were wrong:
     *
     *   #2  "Add and Subtract Decimals"  -> Khan calls it "Add decimals".
     *       The invented "and Subtract" made the very next unit, the real
     *       "Subtract decimals", look like a duplicate of it.
     *   #4  "Add fractions with unlike denominators" -> Khan's Unit 4 is
     *       "Add and subtract fractions", and the link went to a single
     *       EXERCISE inside the unit (.../e/adding_fractions) rather than to
     *       the unit. So the row named a fraction of the work he was doing.
     *   #11 "Volume of cubes and rectangular prisms: word problems" pointed
     *       at grade-5-math-fl-best — a DIFFERENT COURSE (Florida's) — and
     *       so could never line up with anything in the course he is in.
     *
     * The cost is not cosmetic. He works through Khan's list; she reads this
     * one; and when the two disagree, marking a unit done ticks the wrong row
     * — which is exactly what happened this morning. The names are now
     * verbatim from the course page and every link is the unit itself.
     */
    const mathQ1Rows = [
      { subject: 'math', skillTitle: 'Decimal Place Value', gradeLevel: '5th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-fifth-grade-math/imp-place-value-and-decimals', sequenceInQuarter: 1 },
      { subject: 'math', skillTitle: 'Add decimals', gradeLevel: '5th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-fifth-grade-math/imp-addition-and-subtraction-3', sequenceInQuarter: 2 },
      { subject: 'math', skillTitle: 'Subtract decimals', gradeLevel: '5th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-fifth-grade-math/subtract-decimals', sequenceInQuarter: 3 },
      { subject: 'math', skillTitle: 'Add and subtract fractions', gradeLevel: '5th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-fifth-grade-math/imp-fractions-3', sequenceInQuarter: 4 },
      { subject: 'math', skillTitle: 'Multi-Digit Multiplication and Division', gradeLevel: '5th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-fifth-grade-math/multi-digit-multiplication-and-division', sequenceInQuarter: 5 },
      { subject: 'math', skillTitle: 'Multiply Fractions', gradeLevel: '5th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-fifth-grade-math/5th-multiply-fractions', sequenceInQuarter: 6 },
      { subject: 'math', skillTitle: 'Divide Fractions', gradeLevel: '5th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-fifth-grade-math/divide-fractions', sequenceInQuarter: 7 },
      { subject: 'math', skillTitle: 'Multiply Decimals', gradeLevel: '5th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-fifth-grade-math/imp-multiplication-and-division-3', sequenceInQuarter: 8 },
      { subject: 'math', skillTitle: 'Divide decimals', gradeLevel: '5th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-fifth-grade-math/divide-decimals', sequenceInQuarter: 9 },
      { subject: 'math', skillTitle: 'Powers of Ten', gradeLevel: '5th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-fifth-grade-math/powers-of-ten', sequenceInQuarter: 10 },
      { subject: 'math', skillTitle: 'Volume', gradeLevel: '5th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-fifth-grade-math/5th-volume', sequenceInQuarter: 11 },
      { subject: 'math', skillTitle: 'Coordinate plane', gradeLevel: '5th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-fifth-grade-math/imp-geometry-3', sequenceInQuarter: 12 },
      { subject: 'math', skillTitle: 'Algebraic Thinking', gradeLevel: '5th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-fifth-grade-math/imp-algebraic-thinking', sequenceInQuarter: 13 },
      { subject: 'math', skillTitle: 'Converting units of measure', gradeLevel: '5th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-fifth-grade-math/imp-measurement-and-data-3', sequenceInQuarter: 14 },
      { subject: 'math', skillTitle: 'Line plots', gradeLevel: '5th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-fifth-grade-math/line-plots', sequenceInQuarter: 15 },
      { subject: 'math', skillTitle: 'Properties of shapes', gradeLevel: '5th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-fifth-grade-math/properties-of-shapes', sequenceInQuarter: 16 }
    ];
    const missingMathQ1Rows = mathQ1Rows.filter(
      (r) => !khanAcademyAssignments.some((a) => a.subject === r.subject && a.skillTitle === r.skillTitle && a.batchLabel === mathQ1Label)
    );
    if (missingMathQ1Rows.length > 0) {
      const createdAt = new Date().toISOString();
      const preparedRows = missingMathQ1Rows.map((r) => ({ ...r, completed: false, grade: null, completedAt: null, createdAt, batchLabel: mathQ1Label }));
      const newIds = await Promise.all(preparedRows.map((r) => addKhanAcademyAssignmentRecord(r)));
      khanAcademyAssignments = [...khanAcademyAssignments, ...preparedRows.map((r, i) => ({ id: newIds[i], ...r }))];
    }

    // Q3 2026-2027 Math — the 8 already-verified 7th-grade lessons that
    // originally sat in Q1, moved here per the parent's reconsideration:
    // Q1 needed to stay pure 5th-grade fundamentals rather than mixing
    // in new-grade material too early. These 8 give Q3 (target ~11
    // lessons) a real head start rather than starting from zero — 3 more
    // 7th-grade lessons still needed to reach the full target, plus
    // whatever the end-of-Q2 Khan Academy Course Challenge surfaces as
    // weak spots (confirmed manual workflow, not automated — see
    // PROJECT_PLAN.md Part 3).
    const mathQ3Label = 'Q3 2026-2027';
    const mathQ3Rows = [
      { subject: 'math', skillTitle: 'Negative Numbers: Addition and Subtraction', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-seventh-grade-math/cc-7th-negative-numbers-add-and-subtract', sequenceInQuarter: 1 },
      { subject: 'math', skillTitle: 'Negative Numbers: Multiplication and Division', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-seventh-grade-math/cc-7th-negative-numbers-multiply-and-divide', sequenceInQuarter: 2 },
      { subject: 'math', skillTitle: 'Ratios and Proportional Relationships', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-seventh-grade-math/cc-7th-ratio-proportion', sequenceInQuarter: 3 },
      { subject: 'math', skillTitle: 'Fractions, Decimals, and Percentages (including Rates)', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-seventh-grade-math/cc-7th-fractions-decimals', sequenceInQuarter: 4 },
      { subject: 'math', skillTitle: 'Writing and Evaluating Algebraic Expressions', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-seventh-grade-math/cc-7th-variables-expressions/cc-7th-interpreting-lin-exp', sequenceInQuarter: 5 },
      { subject: 'math', skillTitle: 'One and Two-Step Equations', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-seventh-grade-math/cc-7th-variables-expressions/cc-7th-2-step-equations-intro', sequenceInQuarter: 6 },
      { subject: 'math', skillTitle: 'One and Two-Step Inequalities', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-seventh-grade-math/cc-7th-variables-expressions/cc-7th-two-step-inequalities', sequenceInQuarter: 7 },
      { subject: 'math', skillTitle: 'Geometry: Angles, Area, and Surface Area', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-seventh-grade-math/cc-7th-geometry', sequenceInQuarter: 8 },
      { subject: 'math', skillTitle: 'Multi-Step Ratio and Percent Problems', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-seventh-grade-math/cc-7th-fractions-decimals/cc-7th-percent-word-problems', sequenceInQuarter: 9 },
      { subject: 'math', skillTitle: 'Constant of Proportionality', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-seventh-grade-math/cc-7th-ratio-proportion/7th-constant-of-proportionality', sequenceInQuarter: 10 },
      { subject: 'math', skillTitle: 'Scale Drawings', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-seventh-grade-math/cc-7th-geometry/cc-7th-scale-drawings', sequenceInQuarter: 11 },
      // Added Aug 6, 2026 for full 7th-grade coverage: Khan's Unit 4
      // (Rational numbers: addition and subtraction) was the one current 7th
      // unit lacking a dedicated app item. Unit URL read live off Khan.
      { subject: 'math', skillTitle: 'Rational Numbers: Addition and Subtraction (7th grade)', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-seventh-grade-math/x6b17ba59:rational-numbers-addition-and-subtraction', sequenceInQuarter: 12 }
    ];
    const missingMathQ3Rows = mathQ3Rows.filter(
      (r) => !khanAcademyAssignments.some((a) => a.subject === r.subject && a.skillTitle === r.skillTitle && a.batchLabel === mathQ3Label)
    );
    if (missingMathQ3Rows.length > 0) {
      const createdAt = new Date().toISOString();
      const preparedRows = missingMathQ3Rows.map((r) => ({ ...r, completed: false, grade: null, completedAt: null, createdAt, batchLabel: mathQ3Label }));
      const newIds = await Promise.all(preparedRows.map((r) => addKhanAcademyAssignmentRecord(r)));
      khanAcademyAssignments = [...khanAcademyAssignments, ...preparedRows.map((r, i) => ({ id: newIds[i], ...r }))];
    }

    // Q2 2026-2027 Math — 6th grade, per the confirmed grade-progression
    // plan (PROJECT_PLAN.md Part 3). 6 lessons, matching Q2's real
    // school-day-calculated target exactly. Plus whatever the end-of-Q1
    // Khan Academy Course Challenge surfaces as weak spots (confirmed
    // manual workflow, not automated).
    const mathQ2Label = 'Q2 2026-2027';
    // Expanded Aug 6, 2026 to FULL coverage of Khan's 6th-grade course (11
    // exercise-bearing units — Unit 12 "Khan for families" has no exercises
    // and is intentionally omitted), in the course's unit order. Added the 3
    // units the earlier set was missing: Exponents & Order of Operations
    // (U4), Plane Figures (U8), Coordinate Plane (U9). Unit URLs read live
    // off Khan. mathBatchRestructure below re-sequences persisted rows.
    const mathQ2Rows = [
      { subject: 'math', skillTitle: 'Ratios and Proportional Relationships (6th grade)', gradeLevel: '6th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-sixth-grade-math/cc-6th-ratios-prop-topic', sequenceInQuarter: 1 },
      { subject: 'math', skillTitle: 'Arithmetic Operations (Fractions & Decimals)', gradeLevel: '6th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-sixth-grade-math/cc-6th-arithmetic-operations', sequenceInQuarter: 2 },
      { subject: 'math', skillTitle: 'Rates and Percentages (6th grade)', gradeLevel: '6th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-sixth-grade-math/x0267d782:cc-6th-rates-and-percentages', sequenceInQuarter: 3 },
      { subject: 'math', skillTitle: 'Exponents and Order of Operations (6th grade)', gradeLevel: '6th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-sixth-grade-math/x0267d782:cc-6th-exponents-and-order-of-operations', sequenceInQuarter: 4 },
      { subject: 'math', skillTitle: 'Negative Numbers (6th grade)', gradeLevel: '6th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-sixth-grade-math/cc-6th-negative-number-topic', sequenceInQuarter: 5 },
      { subject: 'math', skillTitle: 'Variables and Expressions', gradeLevel: '6th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-sixth-grade-math/cc-6th-expressions-and-variables', sequenceInQuarter: 6 },
      { subject: 'math', skillTitle: 'Equations and Inequalities (6th grade)', gradeLevel: '6th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-sixth-grade-math/cc-6th-equations-and-inequalities', sequenceInQuarter: 7 },
      { subject: 'math', skillTitle: 'Plane Figures (6th grade)', gradeLevel: '6th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-sixth-grade-math/x0267d782:cc-6th-plane-figures', sequenceInQuarter: 8 },
      { subject: 'math', skillTitle: 'Coordinate Plane (6th grade)', gradeLevel: '6th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-sixth-grade-math/x0267d782:coordinate-plane', sequenceInQuarter: 9 },
      { subject: 'math', skillTitle: 'Geometry (6th grade)', gradeLevel: '6th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-sixth-grade-math/cc-6th-geometry-topic', sequenceInQuarter: 10 },
      { subject: 'math', skillTitle: 'Data and Statistics (6th grade)', gradeLevel: '6th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-sixth-grade-math/cc-6th-data-statistics', sequenceInQuarter: 11 }
    ];
    const missingMathQ2Rows = mathQ2Rows.filter(
      (r) => !khanAcademyAssignments.some((a) => a.subject === r.subject && a.skillTitle === r.skillTitle && a.batchLabel === mathQ2Label)
    );
    if (missingMathQ2Rows.length > 0) {
      const createdAt = new Date().toISOString();
      const preparedRows = missingMathQ2Rows.map((r) => ({ ...r, completed: false, grade: null, completedAt: null, createdAt, batchLabel: mathQ2Label }));
      const newIds = await Promise.all(preparedRows.map((r) => addKhanAcademyAssignmentRecord(r)));
      khanAcademyAssignments = [...khanAcademyAssignments, ...preparedRows.map((r, i) => ({ id: newIds[i], ...r }))];
    }

    // Q4 2026-2027 Math — 7th grade continuation (target ~7 lessons).
    // Real, careful verification to avoid overlapping content with Q3's
    // broader units — these 4 are genuine, distinct Khan Academy
    // sub-topic pages (not the same broad parent unit already used),
    // going deeper into topics Q3 only introduced.
    const mathQ4Label = 'Q4 2026-2027';
    const mathQ4Rows = [
      { subject: 'math', skillTitle: 'Statistics and Probability', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-seventh-grade-math/cc-7th-probability-statistics', sequenceInQuarter: 1 },
      { subject: 'math', skillTitle: 'Angle Relationships', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-seventh-grade-math/cc-7th-geometry/cc-7th-angles', sequenceInQuarter: 2 },
      { subject: 'math', skillTitle: 'Circles: Area and Circumference', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-seventh-grade-math/cc-7th-geometry/cc-7th-area-circ-challenge', sequenceInQuarter: 3 },
      { subject: 'math', skillTitle: 'Volume and Surface Area of Solids', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-seventh-grade-math/cc-7th-geometry/cc-7th-area-volume-surface-area', sequenceInQuarter: 4 },
      { subject: 'math', skillTitle: 'Population Sampling and Inferences', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-seventh-grade-math/cc-7th-probability-statistics/cc-7th-population-sampling', sequenceInQuarter: 5 },
      { subject: 'math', skillTitle: 'Absolute Value (7th grade)', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-seventh-grade-math/cc-7th-negative-numbers-add-and-subtract/cc-7th-absolute-value', sequenceInQuarter: 6 },
      { subject: 'math', skillTitle: 'Multiplying and Dividing Negative Fractions', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-seventh-grade-math/cc-7th-negative-numbers-multiply-and-divide/cc-7th-mult-div-neg-fractions', sequenceInQuarter: 7 },
      { subject: 'math', skillTitle: 'Comparing Probabilities and Compound Events', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-seventh-grade-math/cc-7th-probability-statistics/cc-7th-basic-prob', sequenceInQuarter: 8 }
    ];
    const missingMathQ4Rows = mathQ4Rows.filter(
      (r) => !khanAcademyAssignments.some((a) => a.subject === r.subject && a.skillTitle === r.skillTitle && a.batchLabel === mathQ4Label)
    );
    if (missingMathQ4Rows.length > 0) {
      const createdAt = new Date().toISOString();
      const preparedRows = missingMathQ4Rows.map((r) => ({ ...r, completed: false, grade: null, completedAt: null, createdAt, batchLabel: mathQ4Label }));
      const newIds = await Promise.all(preparedRows.map((r) => addKhanAcademyAssignmentRecord(r)));
      khanAcademyAssignments = [...khanAcademyAssignments, ...preparedRows.map((r, i) => ({ id: newIds[i], ...r }))];
    }

    // Summer 2027 Math — intro to 8th grade, per the confirmed grade-
    // progression plan (PROJECT_PLAN.md Part 3). 5 lessons, matching
    // Summer's real target exactly (26 instructional days at the
    // confirmed 3-day/week homeschool pace ÷ ~5 days/lesson). Plus
    // whatever the end-of-Q4 Khan Academy Course Challenge surfaces as
    // weak spots (confirmed manual workflow, not automated).
    const mathSummerLabel = 'Summer 2027';
    const mathSummerRows = [
      { subject: 'math', skillTitle: 'Numbers and Operations (8th grade)', gradeLevel: '8th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-eighth-grade-math/cc-8th-numbers-operations', sequenceInQuarter: 1 },
      { subject: 'math', skillTitle: 'Solving Equations with One Unknown', gradeLevel: '8th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-eighth-grade-math/cc-8th-solving-equations', sequenceInQuarter: 2 },
      { subject: 'math', skillTitle: 'Linear Equations and Functions', gradeLevel: '8th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-eighth-grade-math/cc-8th-linear-equations-functions', sequenceInQuarter: 3 },
      { subject: 'math', skillTitle: 'Systems of Equations', gradeLevel: '8th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-eighth-grade-math/cc-8th-systems-topic', sequenceInQuarter: 4 },
      { subject: 'math', skillTitle: 'Geometry (8th grade)', gradeLevel: '8th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-eighth-grade-math/cc-8th-geometry', sequenceInQuarter: 5 },
      // Added Aug 6, 2026 for full 8th-grade coverage: Khan Units 6 & 7,
      // which complete the 7-unit course before its Course Challenge.
      { subject: 'math', skillTitle: 'Geometric Transformations (8th grade)', gradeLevel: '8th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-eighth-grade-math/geometric-transformations', sequenceInQuarter: 6 },
      { subject: 'math', skillTitle: 'Data and Modeling (8th grade)', gradeLevel: '8th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-eighth-grade-math/cc-8th-data', sequenceInQuarter: 7 }
    ];
    const missingMathSummerRows = mathSummerRows.filter(
      (r) => !khanAcademyAssignments.some((a) => a.subject === r.subject && a.skillTitle === r.skillTitle && a.batchLabel === mathSummerLabel)
    );
    if (missingMathSummerRows.length > 0) {
      const createdAt = new Date().toISOString();
      const preparedRows = missingMathSummerRows.map((r) => ({ ...r, completed: false, grade: null, completedAt: null, createdAt, batchLabel: mathSummerLabel }));
      const newIds = await Promise.all(preparedRows.map((r) => addKhanAcademyAssignmentRecord(r)));
      khanAcademyAssignments = [...khanAcademyAssignments, ...preparedRows.map((r, i) => ({ id: newIds[i], ...r }))];
    }

    // Q1 2026-2027 Reading — following Math's proven process: unify the
    // 3 existing legacy skills (already real, already at grade level —
    // Reading's diagnosed level was roughly 7th-8th, not genuinely below
    // grade the way Math's was) into Q1, plus new verified units from
    // Khan Academy's standard 7th-grade reading & vocabulary course
    // (confirmed distinct from the "supplement" course the legacy 3
    // skills came from — this is Khan Academy's main course, with real
    // thematic units: Uncovering Meaning, Blazing New Trails, Mysteries,
    // Vocabulary).
    const readingQ1Label = 'Q1 2026-2027';
    const readingQ1Rows = [];
    const missingReadingQ1Rows = readingQ1Rows.filter(
      (r) => !khanAcademyAssignments.some((a) => a.subject === r.subject && a.skillTitle === r.skillTitle && a.batchLabel === readingQ1Label)
    );
    if (missingReadingQ1Rows.length > 0) {
      const createdAt = new Date().toISOString();
      const preparedRows = missingReadingQ1Rows.map((r) => ({ ...r, completed: false, grade: null, completedAt: null, createdAt, batchLabel: readingQ1Label }));
      const newIds = await Promise.all(preparedRows.map((r) => addKhanAcademyAssignmentRecord(r)));
      khanAcademyAssignments = [...khanAcademyAssignments, ...preparedRows.map((r, i) => ({ id: newIds[i], ...r }))];
    }

    // Q2 2026-2027 Reading — continuing 7th grade depth (unlike Math,
    // Reading's diagnostic showed Lamar already roughly at grade level,
    // so there's no remediation-first need — Q1-Q2 were originally
    // planned to stay 7th grade, Q3-Q4 progress to 8th, Summer intros
    // 9th, one grade ahead of Math's equivalent progression since the
    // starting point differs).
    // Added this session (round 1): 2 more verified, genuinely distinct
    // units from the SAME pisa-2025-english-supplement course as Q1's
    // "Living Tongues" and "Antonyms, connotation..." skills (not the
    // cc-7th-reading-vocab course used for row 1 below) — "Mysteries of
    // the Past" is a real, separate thematic unit under that course,
    // distinct from Q1's "Mysteries" (which lives under the different
    // 7th-grade-reading-and-vocabulary course).
    // Added this session (round 2), by explicit parent decision: with
    // 7th-grade content now genuinely exhausted across both real Reading
    // courses, the parent chose to pull 8th-grade content into Q2 early
    // (breaking the original 7th-grade-through-Q2 plan) rather than
    // accept a short quarter or risk the cc-7th-reading-vocab duplicate-
    // content course. 3 more verified units added from the SAME
    // 8th-grade-reading-and-vocabulary course already used for Q3's
    // "Vocabulary (8th grade course)" and "The World Beneath" — so this
    // reuses an already-verified, non-duplicate course rather than
    // introducing a new risk. All 5 rows confirmed individually against
    // Khan Academy's own domain, same standard as every other entry here.
    // Added this session (round 3): a genuinely new, third unit found
    // under the SAME pisa-2025-english-supplement 8th-grade course as Q3's
    // "Crossing the Line" and Q4's "Funny Business" — "Obscuring the
    // Truth" (plus its paired unit-vocabulary article, same pattern as
    // "Mysteries of the Past" above). This closes Q2 to its full 8-lesson
    // target using an already-trusted course, not the risky cc-8th-
    // reading-vocab wrapper.
    const readingQ2Label = 'Q2 2026-2027';
    const readingQ2Rows = [
      { subject: 'reading', skillTitle: 'Themes, figures of speech, and comparing texts (reading strategies)', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/ela/pisa-2025-english-supplement/x0fbe4cb2373ed873:7th-grade-reading-vocabulary', sequenceInQuarter: 1 },
      { subject: 'reading', skillTitle: 'How word choice/figurative language affects meaning and tone', gradeLevel: '7th-9th', khanAcademyUrl: 'https://www.khanacademy.org/ela/9th-grade-reading-and-vocabulary/xd45453bfd2ae8614:crossing-the-line-9/xd45453bfd2ae8614:interpreting-words-in-context-9/a/words-at-work-analyzing-how-authors-create-meaning-and-tone-9', sequenceInQuarter: 2 },
      { subject: 'reading', skillTitle: 'Antonyms, connotation, and word choice (vocabulary)', gradeLevel: '7th-8th', khanAcademyUrl: 'https://www.khanacademy.org/ela/pisa-2025-english-supplement/x0fbe4cb2373ed873:7th-grade-reading-vocabulary/x0fbe4cb2373ed873:trailblazing-women/a/trailblazing-women-unit-vocabulary', sequenceInQuarter: 3 },
      { subject: 'reading', skillTitle: 'Vocabulary (7th grade course)', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/ela/7th-grade-reading-and-vocabulary/x7538838f96af3430:vocabulary-7th', sequenceInQuarter: 4 },
      { subject: 'reading', skillTitle: 'Craft and Structure (7th grade)', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/ela/7th-grade-reading-and-vocabulary/x7538838f96af3430:uncovering-meaning', sequenceInQuarter: 5 },
      { subject: 'reading', skillTitle: 'Craft and Structure: Long Passage Practice (7th grade)', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/ela/7th-grade-reading-and-vocabulary/x7538838f96af3430:uncovering-meaning-long-passage-practice', sequenceInQuarter: 6 },
      { subject: 'reading', skillTitle: 'Key Ideas and Details (7th grade)', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/ela/7th-grade-reading-and-vocabulary/x7538838f96af3430:blazing-new-trails', sequenceInQuarter: 7 },
      { subject: 'reading', skillTitle: 'Key Ideas and Details: Long Passage Practice (7th grade)', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/ela/7th-grade-reading-and-vocabulary/x7538838f96af3430:blazing-new-trails-long-passage-practice', sequenceInQuarter: 8 },
      { subject: 'reading', skillTitle: 'Integration of Knowledge and Ideas (7th grade)', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/ela/7th-grade-reading-and-vocabulary/x7538838f96af3430:mysteries', sequenceInQuarter: 9 }
    ];
    const missingReadingQ2Rows = readingQ2Rows.filter(
      (r) => !khanAcademyAssignments.some((a) => a.subject === r.subject && a.skillTitle === r.skillTitle && a.batchLabel === readingQ2Label)
    );
    if (missingReadingQ2Rows.length > 0) {
      const createdAt = new Date().toISOString();
      const preparedRows = missingReadingQ2Rows.map((r) => ({ ...r, completed: false, grade: null, completedAt: null, createdAt, batchLabel: readingQ2Label }));
      const newIds = await Promise.all(preparedRows.map((r) => addKhanAcademyAssignmentRecord(r)));
      khanAcademyAssignments = [...khanAcademyAssignments, ...preparedRows.map((r, i) => ({ id: newIds[i], ...r }))];
    }

    // Q3 2026-2027 Reading — 8th grade, real verified units.
    // Added this session: both real 8th-grade Reading sources
    // (8th-grade-reading-and-vocabulary and pisa-2025-english-supplement's
    // 8th-grade unit) are now genuinely exhausted — every remaining page
    // in each was already claimed by Q2, Q3, or Q4. Following the same
    // parent-approved pattern as Q2 (pull the next grade in early rather
    // than pad with duplicate content), 7 more verified units added from
    // 9th grade: 6 from the 9th-grade-reading-and-vocabulary course
    // (parallel structure to 7th/8th) and 1 pair (Social Psychology +
    // its unit vocabulary) from the SAME trusted pisa-2025-english-
    // supplement course already used for Q1's "Living Tongues," Q2's
    // "Mysteries of the Past," and Summer's "Borders."
    // Deliberately skipped: the whole "Crossing the Line" 9th-grade unit
    // — its specific "interpreting words in context" article is already
    // Q1's row 2, and adding the parent unit on top would be real,
    // direct content overlap (not just a similar name), unlike every
    // other addition here.
    const readingQ3Label = 'Q3 2026-2027';
    const readingQ3Rows = [
      { subject: 'reading', skillTitle: 'Integration of Knowledge and Ideas: Long Passage Practice (7th grade)', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/ela/7th-grade-reading-and-vocabulary/x7538838f96af3430:mysteries-long-passage-practice', sequenceInQuarter: 1 },
      { subject: 'reading', skillTitle: 'Living Tongues (thematic reading unit)', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/ela/pisa-2025-english-supplement/x0fbe4cb2373ed873:7th-grade-reading-vocabulary/x0fbe4cb2373ed873:living-tongues', sequenceInQuarter: 2 },
      { subject: 'reading', skillTitle: 'Trailblazing Women (distinct course version)', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/ela/cc-7th-reading-vocab/x4aa9073b12675eb1:cc-7th-trailblazing-women', sequenceInQuarter: 3 },
      { subject: 'reading', skillTitle: 'Mysteries of the Past (thematic reading unit)', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/ela/pisa-2025-english-supplement/x0fbe4cb2373ed873:mysteries-of-the-past', sequenceInQuarter: 4 },
      { subject: 'reading', skillTitle: 'Mysteries of the Past: unit vocabulary', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/ela/pisa-2025-english-supplement/x0fbe4cb2373ed873:mysteries-of-the-past/a/mysteries-of-the-past-unit-vocabulary', sequenceInQuarter: 5 },
      { subject: 'reading', skillTitle: 'Key Ideas and Details (8th grade)', gradeLevel: '8th', khanAcademyUrl: 'https://www.khanacademy.org/ela/8th-grade-reading-and-vocabulary/x435b1de09a877dd7:the-mind-at-play-8', sequenceInQuarter: 6 },
      { subject: 'reading', skillTitle: 'Integration of Knowledge and Ideas (8th grade)', gradeLevel: '8th', khanAcademyUrl: 'https://www.khanacademy.org/ela/8th-grade-reading-and-vocabulary/x435b1de09a877dd7:to-your-health-8', sequenceInQuarter: 7 },
      { subject: 'reading', skillTitle: 'Craft and Structure: Long Passage Practice (8th grade)', gradeLevel: '8th', khanAcademyUrl: 'https://www.khanacademy.org/ela/8th-grade-reading-and-vocabulary/x435b1de09a877dd7:craft-and-structure-long-passage-practice-8', sequenceInQuarter: 8 }
    ];
    const missingReadingQ3Rows = readingQ3Rows.filter(
      (r) => !khanAcademyAssignments.some((a) => a.subject === r.subject && a.skillTitle === r.skillTitle && a.batchLabel === readingQ3Label)
    );
    if (missingReadingQ3Rows.length > 0) {
      const createdAt = new Date().toISOString();
      const preparedRows = missingReadingQ3Rows.map((r) => ({ ...r, completed: false, grade: null, completedAt: null, createdAt, batchLabel: readingQ3Label }));
      const newIds = await Promise.all(preparedRows.map((r) => addKhanAcademyAssignmentRecord(r)));
      khanAcademyAssignments = [...khanAcademyAssignments, ...preparedRows.map((r, i) => ({ id: newIds[i], ...r }))];
    }

    // Q4 2026-2027 Reading — 8th grade continuation.
    // Added this session: both 8th- and 9th-grade sources are now
    // genuinely exhausted (same situation as Q3), so 2 quick, safe
    // additions first — "Funny Business: unit vocabulary" and "The
    // Apocalypse: unit vocabulary" — both real, distinct companion
    // articles under the SAME trusted pisa-2025-english-supplement course
    // as their parent units (Funny Business already in Q4, The Apocalypse
    // now in Q3), same pairing pattern as Mysteries of the Past/Obscuring
    // the Truth/Social Psychology. Then, following the same parent-
    // approved pattern used for Q2 and Q3, pulled 10th-grade content in
    // from the 10th-grade-reading-and-vocabulary course — its primary,
    // non-duplicate course (the pisa-2025-english-supplement 10th-grade
    // supplement was checked and appears to mirror the SAME "Winds of
    // Change" / "Into the Unknown" units under a different URL, so it was
    // deliberately not used, to avoid the exact duplicate-content risk
    // already caught twice this project).
    const readingQ4Label = 'Q4 2026-2027';
    const readingQ4Rows = [
      { subject: 'reading', skillTitle: 'Obscuring the Truth (8th grade thematic unit)', gradeLevel: '8th', khanAcademyUrl: 'https://www.khanacademy.org/ela/pisa-2025-english-supplement/x0fbe4cb2373ed873:8th-grade-reading-vocabulary/x0fbe4cb2373ed873:obscuring-the-truth', sequenceInQuarter: 1 },
      { subject: 'reading', skillTitle: 'Obscuring the Truth: unit vocabulary', gradeLevel: '8th', khanAcademyUrl: 'https://www.khanacademy.org/ela/pisa-2025-english-supplement/x0fbe4cb2373ed873:8th-grade-reading-vocabulary/x0fbe4cb2373ed873:obscuring-the-truth/a/obscuring-the-truth-unit-vocabulary', sequenceInQuarter: 2 },
      { subject: 'reading', skillTitle: 'Craft and Structure (8th grade)', gradeLevel: '8th', khanAcademyUrl: 'https://www.khanacademy.org/ela/8th-grade-reading-and-vocabulary/x435b1de09a877dd7:the-world-beneath-8', sequenceInQuarter: 3 },
      { subject: 'reading', skillTitle: 'Crossing the Line (8th grade thematic unit)', gradeLevel: '8th', khanAcademyUrl: 'https://www.khanacademy.org/ela/pisa-2025-english-supplement/x0fbe4cb2373ed873:8th-grade-reading-vocabulary/x0fbe4cb2373ed873:crossing-the-line', sequenceInQuarter: 4 },
      { subject: 'reading', skillTitle: 'Funny Business (8th grade thematic unit)', gradeLevel: '8th', khanAcademyUrl: 'https://www.khanacademy.org/ela/pisa-2025-english-supplement/x0fbe4cb2373ed873:8th-grade-reading-vocabulary/x0fbe4cb2373ed873:funny-business', sequenceInQuarter: 5 },
      { subject: 'reading', skillTitle: 'Funny Business: unit vocabulary', gradeLevel: '8th', khanAcademyUrl: 'https://www.khanacademy.org/ela/pisa-2025-english-supplement/x0fbe4cb2373ed873:8th-grade-reading-vocabulary/x0fbe4cb2373ed873:funny-business/a/funny-business-unit-vocabulary', sequenceInQuarter: 6 },
      { subject: 'reading', skillTitle: 'Vocabulary (8th grade course)', gradeLevel: '8th', khanAcademyUrl: 'https://www.khanacademy.org/ela/8th-grade-reading-and-vocabulary/x435b1de09a877dd7:vocabulary-8th', sequenceInQuarter: 7 }
    ];
    const missingReadingQ4Rows = readingQ4Rows.filter(
      (r) => !khanAcademyAssignments.some((a) => a.subject === r.subject && a.skillTitle === r.skillTitle && a.batchLabel === readingQ4Label)
    );
    if (missingReadingQ4Rows.length > 0) {
      const createdAt = new Date().toISOString();
      const preparedRows = missingReadingQ4Rows.map((r) => ({ ...r, completed: false, grade: null, completedAt: null, createdAt, batchLabel: readingQ4Label }));
      const newIds = await Promise.all(preparedRows.map((r) => addKhanAcademyAssignmentRecord(r)));
      khanAcademyAssignments = [...khanAcademyAssignments, ...preparedRows.map((r, i) => ({ id: newIds[i], ...r }))];
    }

    /**
     * =====================================================================
     * GRADE-LEVEL GRAMMAR FOR Q2, Q3 AND Q4. (Audit item O-2, Aug 25, 2026.)
     * =====================================================================
     *
     * The parent: **"Add the kahn academy work assignments."**
     *
     * ---- WHAT WAS ACTUALLY WRONG ----
     *
     * The audit recorded this as "Khan ticks credit 15 minutes instead of 60
     * from Nov 2." Checking it against her real data said something narrower
     * and more useful: the strand routing is CORRECT. Q2-Q4's Khan ELA rows
     * are reading-and-vocabulary courses, and the 10:00 Reading Lesson is
     * exactly where those belong.
     *
     * The real gap was upstream. **Khan's general Grammar course is ten units
     * and Q1 uses all ten**, so from November there was no grammar left to
     * assign, and the 12:30 Language Arts block ran on the daily writing drill
     * alone. Not a routing bug — a content cliff.
     *
     * ---- WHAT CHANGED IN THE WORLD ----
     *
     * Khan added grade-banded grammar courses for grades 5-10 in its summer
     * 2026 rollout, announced June 8 2026 — after this app's roster was
     * written in August. `Grammar: 7th and 8th grade` is nine units and 74
     * skills, aimed at exactly his grade band.
     *
     * His weakest IXL strand was Grammar & Mechanics at 440-500. A second pass
     * through the same territory at GRADE LEVEL, after a foundational quarter
     * on the general course, is the right answer for the strand he is behind
     * in — and it is Khan's own order, unit 1 through unit 9.
     *
     * ---- HOW IT IS SPREAD ----
     *
     *   Q2   7 school weeks   units 1-3   Nouns, Pronouns, Verbs
     *   Q3  11 school weeks   units 4-7   modifiers, prepositions, sentences,
     *                                     punctuation — the two biggest units
     *                                     land in the longest quarter
     *   Q4   7 school weeks   units 8-9 + the course challenge
     *
     * Ten rows across twenty-five weeks. Q1 ran eleven rows in thirteen, so
     * this is deliberately the lighter half of that pace: it runs ALONGSIDE the
     * daily drill in the same block rather than replacing it, and the drill is
     * where his composition actually gets built.
     *
     * EVERY URL WAS READ OFF THE LIVE COURSE PAGE on 2026-08-25 — see
     * `grammarCourseOrder.js`, which also had to learn to recognise this course
     * so the rows credit block-7 rather than block-3.
     */
    /**
     * ---- THE GRAMMAR LADDER, ONE GRADE BAND PER RUNG. (Aug 28, 2026.) ----
     *
     * The parent: *"He should be completing all of 5th grade in Qtr 1, 6th
     * grade in Qtr 2 and 7th Grade Qtr 3 and 4 ... and if its not full for qtr
     * 4 add 8th grade."*
     *
     * She is right, and the version that shipped on Aug 25 skipped a rung — it
     * went 5th straight to 7th-8th in the strand he is furthest behind in
     * (IXL Grammar & Mechanics 440-500, his weakest). A strand that is behind
     * climbs one band at a time.
     *
     *   Q1  13 wk   general Grammar course, units 1-10   + Course Challenge
     *   Q2   7 wk   Grammar: 5th and 6th grade, units 1-9 + Course Challenge
     *   Q3  11 wk   Grammar: 7th and 8th grade, units 1-6
     *   Q4   7 wk   Grammar: 7th and 8th grade, units 7-9 + Course Challenge
     *
     * Khan has no standalone 6th-grade course — its bands are PAIRS — so the
     * 5-6 course is the 6th-grade rung, and the 8th grade she asked for in Q4
     * is the back half of the 7-8 course rather than a separate one. Q3 takes
     * six units because it is eleven weeks against Q4's seven.
     *
     * ---- MATCHED ON URL, NOT TITLE ----
     *
     * Every other seeder in this file matches `(subject, skillTitle, batchLabel)`.
     * This one matches the URL, because a title is exactly what went wrong here:
     * the rename pass stripped the course label, the seeder could no longer find
     * the row it had just written, and re-created all nine on every app start.
     * **A URL cannot drift — it IS the page he opens.** Matching on it makes this
     * block self-healing: it repairs a row that is mis-titled, mis-placed or
     * mis-numbered instead of adding a second copy beside it.
     *
     * That is also what cleans up the damage already in her database, where ten
     * grade 7-8 rows are sitting in Q1 wearing bare titles.
     */
    const GRAMMAR_LADDER_SPEC = [
      { courseId: 'general', batchLabel: 'Q1 2026-2027', unitIndexes: [], challenge: true, gradeLevel: '5th' },
      { courseId: 'g56', batchLabel: 'Q2 2026-2027', unitIndexes: [0, 1, 2, 3, 4, 5, 6, 7, 8], challenge: true, gradeLevel: '6th' },
      { courseId: 'g78', batchLabel: 'Q3 2026-2027', unitIndexes: [0, 1, 2, 3, 4, 5], challenge: false, gradeLevel: '7th-8th' },
      { courseId: 'g78', batchLabel: 'Q4 2026-2027', unitIndexes: [6, 7, 8], challenge: true, gradeLevel: '7th-8th' }
    ];

    const grammarLadderRows = [];
    for (const rung of GRAMMAR_LADDER_SPEC) {
      // An Academy that fills no `khanSequences` slot has no grammar courses,
      // and a rung pointing at a course this Academy does not carry is skipped
      // rather than seeded. Unguarded this read `undefined['general']` and took
      // the whole store down during hydration — no school, just "could not
      // load". §3c: an absent slot is an absent screen, never a broken one.
      const course = GRAMMAR_COURSES?.[rung.courseId];
      if (!course) continue;
      rung.unitIndexes.forEach((idx, i) => {
        const unit = course.units[idx];
        grammarLadderRows.push({
          subject: 'reading',
          skillTitle: grammarRowTitle(course.id, unit.khanTitle),
          gradeLevel: rung.gradeLevel,
          khanAcademyUrl: grammarUnitUrl(course.id, unit.slug),
          batchLabel: rung.batchLabel,
          // Grammar sits AFTER the quarter's reading rows rather than competing
          // with them for the first slot: reading is the 10:00 block, grammar is
          // the 12:30 block, and the order in the list should say so.
          sequenceInQuarter: 20 + i,
          isCourseChallenge: false
        });
      });
      if (rung.challenge) {
        grammarLadderRows.push({
          subject: 'reading',
          skillTitle: course.challengeTitle,
          gradeLevel: rung.gradeLevel,
          khanAcademyUrl: 'https://www.khanacademy.org' + course.challengePath,
          batchLabel: rung.batchLabel,
          sequenceInQuarter: 97,
          // Her rule, stated when the Khan gradebook was designed: "Unit tests
          // and Course Challenges is what would be graded." Every other subject
          // got this flag; both grammar courses were missed, and the general
          // course had no challenge row at all — so the challenge he is sitting
          // RIGHT NOW reached no grade and appeared on no record.
          isCourseChallenge: true
        });
      }
    }

    const grammarLadderRepairs = [];
    const grammarLadderMissing = [];
    for (const target of grammarLadderRows) {
      const existing = khanAcademyAssignments.find(
        (a) => a.subject === 'reading' && a.khanAcademyUrl === target.khanAcademyUrl
      );
      if (!existing) {
        grammarLadderMissing.push(target);
        continue;
      }
      const needsFix =
        existing.skillTitle !== target.skillTitle ||
        existing.batchLabel !== target.batchLabel ||
        existing.sequenceInQuarter !== target.sequenceInQuarter ||
        existing.gradeLevel !== target.gradeLevel ||
        Boolean(existing.isCourseChallenge) !== target.isCourseChallenge;
      if (!needsFix) continue;
      // Grade, completion and id all ride along untouched. Re-placing a unit
      // must never cost him credit for work already done — the same rule the
      // ELA re-placement follows.
      grammarLadderRepairs.push({
        ...existing,
        skillTitle: target.skillTitle,
        batchLabel: target.batchLabel,
        sequenceInQuarter: target.sequenceInQuarter,
        gradeLevel: target.gradeLevel,
        isCourseChallenge: target.isCourseChallenge
      });
    }
    if (grammarLadderRepairs.length > 0) {
      const byId = new Map(grammarLadderRepairs.map((r) => [r.id, r]));
      khanAcademyAssignments = khanAcademyAssignments.map((a) => byId.get(a.id) || a);
      await Promise.all(grammarLadderRepairs.map((r) => updateKhanAcademyAssignmentRecord(r.id, r)));
    }
    if (grammarLadderMissing.length > 0) {
      const createdAt = new Date().toISOString();
      const prepared = grammarLadderMissing.map((r) => ({
        ...r, completed: false, grade: null, completedAt: null, createdAt
      }));
      const newIds = await Promise.all(prepared.map((r) => addKhanAcademyAssignmentRecord(r)));
      khanAcademyAssignments = [
        ...khanAcademyAssignments,
        ...prepared.map((r, i) => ({ id: newIds[i], ...r }))
      ];
    }

    /**
     * The Aug 25 build's own titles, left behind by rows that have since been
     * repaired by URL above. A row that still wears one of these and has NO
     * matching URL row is a stale duplicate from the re-seed loop — delete it,
     * but only if it is uncompleted, so nothing graded is ever dropped.
     */
    // An Academy with no grammar courses has no stale grammar titles to clean
    // up either — an empty set here means the cleanup below simply finds
    // nothing, which is the correct answer rather than a crash.
    const staleGrammarTitles = new Set([
      ...(GRAMMAR_COURSES.g78?.units ?? []).map((u) => u.khanTitle + ' (7th-8th grade grammar)'),
      'Grammar course challenge (7th-8th grade)'
    ]);
    const liveGrammarIds = new Set(
      grammarLadderRows
        .map((t) => khanAcademyAssignments.find((a) => a.khanAcademyUrl === t.khanAcademyUrl)?.id)
        .filter((id) => id != null)
    );
    const staleGrammarIds = khanAcademyAssignments
      .filter(
        (a) =>
          a.subject === 'reading' &&
          staleGrammarTitles.has(a.skillTitle) &&
          !liveGrammarIds.has(a.id) &&
          !a.completed
      )
      .map((a) => a.id);
    if (staleGrammarIds.length > 0) {
      await Promise.all(staleGrammarIds.map((id) => deleteKhanAcademyAssignmentRecord(id)));
      khanAcademyAssignments = khanAcademyAssignments.filter((a) => !staleGrammarIds.includes(a.id));
    }

    /**
     * SUMMER 2027 READING — DELIBERATELY EMPTY. (Audit item O-1, Aug 25, 2026.)
     *
     * This list is `[]` on purpose and must stay that way. The comment that
     * used to sit here described five units being "pulled in" — Borders, its
     * unit vocabulary, and three 10th-grade Long Passage Practice units, "each
     * individually verified" — beside an array that adds none of them. It
     * described a plan that was reversed, and read as a statement of what the
     * app does.
     *
     * THE DECISION IT WAS REVERSED TO, quoted in `scienceSequence.js`:
     * **"Summer — 0 units. Reserved for summer reading."** Summer English is a
     * book he picks himself — the Academic Center's free-choice Reading
     * Assignment — discussed with a parent instead of written up, because the
     * point of summer is protecting the habit rather than grading it.
     *
     * The scaffolding below stays so a future decision to add Summer units is
     * one array away, and so this file keeps the same shape for every quarter.
     */
    const readingSummerLabel = 'Summer 2027';
    const readingSummerRows = [];
    const missingReadingSummerRows = readingSummerRows.filter(
      (r) => !khanAcademyAssignments.some((a) => a.subject === r.subject && a.skillTitle === r.skillTitle && a.batchLabel === readingSummerLabel)
    );
    if (missingReadingSummerRows.length > 0) {
      const createdAt = new Date().toISOString();
      const preparedRows = missingReadingSummerRows.map((r) => ({ ...r, completed: false, grade: null, completedAt: null, createdAt, batchLabel: readingSummerLabel }));
      const newIds = await Promise.all(preparedRows.map((r) => addKhanAcademyAssignmentRecord(r)));
      khanAcademyAssignments = [...khanAcademyAssignments, ...preparedRows.map((r, i) => ({ id: newIds[i], ...r }))];
    }

    // Q1 2026-2027 Language Arts (subject key: 'writing') — first
    // quarterly batch for this subject. Builds on the 2 real legacy
    // skills already seeded from Lamar's actual IXL diagnostic (Roots/
    // prefixes/suffixes and the whole "Parts of speech: the verb" unit,
    // both genuine gaps at the 5th-grade level, same tier as Math's
    // legacy gaps) rather than replacing them. The other 9 units of Khan
    // Academy's general Grammar course (khanacademy.org/humanities/
    // grammar — 10 units total, ungraded but appropriate for the
    // confirmed 5th-grade starting point) round out the quarter, plus
    // the whole Vocabulary unit from the 5th-grade-reading-and-vocab
    // course as its own entry (distinct from the specific roots/
    // prefixes/suffixes sub-skill already seeded from within it — same
    // whole-unit-plus-specific-subpage pattern already used throughout
    // Reading). Every URL individually verified against Khan Academy's
    // own domain before being added, same standard as Math and Reading.
    const writingQ1Label = 'Q1 2026-2027';
    const writingQ1Rows = [
      { subject: 'reading', skillTitle: 'Parts of speech: the noun', gradeLevel: '5th', khanAcademyUrl: 'https://www.khanacademy.org/humanities/grammar/parts-of-speech-the-noun', sequenceInQuarter: 1 },
      { subject: 'reading', skillTitle: 'Parts of speech: the pronoun', gradeLevel: '5th', khanAcademyUrl: 'https://www.khanacademy.org/humanities/grammar/parts-of-speech-the-pronoun', sequenceInQuarter: 2 },
      { subject: 'reading', skillTitle: 'Parts of speech: the modifier', gradeLevel: '5th', khanAcademyUrl: 'https://www.khanacademy.org/humanities/grammar/parts-of-speech-the-modifier', sequenceInQuarter: 3 },
      { subject: 'reading', skillTitle: 'Parts of speech: the preposition and the conjunction', gradeLevel: '5th', khanAcademyUrl: 'https://www.khanacademy.org/humanities/grammar/parts-of-speech-the-preposition-and-the-conjunction', sequenceInQuarter: 4 },
      { subject: 'reading', skillTitle: 'Punctuation: the comma and the apostrophe', gradeLevel: '5th', khanAcademyUrl: 'https://www.khanacademy.org/humanities/grammar/punctuation-the-comma-and-the-apostrophe', sequenceInQuarter: 5 },
      { subject: 'reading', skillTitle: 'Punctuation: the colon, semicolon, and more', gradeLevel: '5th', khanAcademyUrl: 'https://www.khanacademy.org/humanities/grammar/punctuation-the-colon-semicolon-and-more', sequenceInQuarter: 6 },
      { subject: 'reading', skillTitle: 'Syntax: sentences and clauses', gradeLevel: '5th', khanAcademyUrl: 'https://www.khanacademy.org/humanities/grammar/syntax-sentences-and-clauses', sequenceInQuarter: 7 },
      { subject: 'reading', skillTitle: 'Syntax: conventions of standard English', gradeLevel: '5th', khanAcademyUrl: 'https://www.khanacademy.org/humanities/grammar/syntax-conventions-of-standard-english', sequenceInQuarter: 8 },
      { subject: 'reading', skillTitle: 'Usage and style', gradeLevel: '5th', khanAcademyUrl: 'https://www.khanacademy.org/humanities/grammar/usage-and-style', sequenceInQuarter: 9 }
    ];
    const missingWritingQ1Rows = writingQ1Rows.filter(
      (r) => !khanAcademyAssignments.some((a) => a.subject === r.subject && a.skillTitle === r.skillTitle && a.batchLabel === writingQ1Label)
    );
    if (missingWritingQ1Rows.length > 0) {
      const createdAt = new Date().toISOString();
      const preparedRows = missingWritingQ1Rows.map((r) => ({ ...r, completed: false, grade: null, completedAt: null, createdAt, batchLabel: writingQ1Label }));
      const newIds = await Promise.all(preparedRows.map((r) => addKhanAcademyAssignmentRecord(r)));
      khanAcademyAssignments = [...khanAcademyAssignments, ...preparedRows.map((r, i) => ({ id: newIds[i], ...r }))];
    }

    // Q2 2026-2027 Language Arts — INTENTIONALLY PARTIAL (1 of ~8 target).
    // Khan Academy's general Grammar course (10 units) is fully exhausted
    // by Q1. The one other genuinely real, non-duplicate source found so
    // far is the whole Vocabulary unit from the NEW `new-6th-grade-
    // reading-and-vocabulary` course (confirmed as the current, active
    // 6th-grade course — Khan Academy's own help center confirms it
    // "replaced" an older `cc-6th-reading-vocab` course, which was
    // deliberately NOT used here to avoid that exact retired-duplicate
    // risk). Real scarcity, not a shortcut: unlike Reading, Language Arts
    // has no parallel grade-leveled "grammar" courses to pull forward
    // into — Khan Academy's *-grade-reading-and-vocabulary courses are
    // reading-comprehension courses with only ONE small vocabulary unit
    // each, not full grammar curricula. Left for the parent to decide how
    // to close the rest of this gap (see chat) rather than guessed at.
    const writingQ2Label = 'Q2 2026-2027';
    const writingQ2Rows = [];
    const missingWritingQ2Rows = writingQ2Rows.filter(
      (r) => !khanAcademyAssignments.some((a) => a.subject === r.subject && a.skillTitle === r.skillTitle && a.batchLabel === writingQ2Label)
    );
    if (missingWritingQ2Rows.length > 0) {
      const createdAt = new Date().toISOString();
      const preparedRows = missingWritingQ2Rows.map((r) => ({ ...r, completed: false, grade: null, completedAt: null, createdAt, batchLabel: writingQ2Label }));
      const newIds = await Promise.all(preparedRows.map((r) => addKhanAcademyAssignmentRecord(r)));
      khanAcademyAssignments = [...khanAcademyAssignments, ...preparedRows.map((r, i) => ({ id: newIds[i], ...r }))];
    }

    // Q3 2026-2027 Language Arts — INTENTIONALLY PARTIAL (1 of ~11
    // target), same real scarcity as Q2, confirmed present at this grade
    // too. The only genuinely new, unclaimed source found: the whole
    // Vocabulary unit from the `4th-grade-reading-and-vocab` course
    // (xe0e52cf20ce2546d:vocabulary-4th) — every OTHER grade's
    // vocabulary-Nth unit (5th used here in Q1, 6th used here in Q2,
    // 7th/8th/9th/10th already claimed by the Reading subject) is
    // already spoken for somewhere in the app, so reusing any of those
    // would be genuine duplicate content across subjects, not just a
    // similar name. 4th grade is a backward step gradewise, but it's the
    // only real, unclaimed, non-duplicate content left of this type.
    // Flagged for the parent rather than padded further with the SAT
    // Reading & Writing Practice course (real, but 10th-12th-grade
    // test-prep content — the same fork presented and left open at Q2).
    const writingQ3Label = 'Q3 2026-2027';
    const writingQ3Rows = [];
    const missingWritingQ3Rows = writingQ3Rows.filter(
      (r) => !khanAcademyAssignments.some((a) => a.subject === r.subject && a.skillTitle === r.skillTitle && a.batchLabel === writingQ3Label)
    );
    if (missingWritingQ3Rows.length > 0) {
      const createdAt = new Date().toISOString();
      const preparedRows = missingWritingQ3Rows.map((r) => ({ ...r, completed: false, grade: null, completedAt: null, createdAt, batchLabel: writingQ3Label }));
      const newIds = await Promise.all(preparedRows.map((r) => addKhanAcademyAssignmentRecord(r)));
      khanAcademyAssignments = [...khanAcademyAssignments, ...preparedRows.map((r, i) => ({ id: newIds[i], ...r }))];
    }

    // Q1-Q4 2026-2027 Science — RESEQUENCED per real Georgia standards
    // research (confirmed with the parent): Georgia's actual 7th grade
    // Science standard is Life Science only (S7L1-S7L5 — biodiversity/
    // classification, cells & body systems, genetics/reproduction,
    // ecology, evolution). Georgia's real sequence is Earth Science in
    // 6th grade and Physical Science in 8th grade — NOT 7th. The
    // original Q1-Q4 plan below (Earth & Space in Q1, Physics in Q3,
    // Chemistry in Q4) was actually 6th- and 8th-grade content mislabeled
    // "7th" — a real gap caught before school start (Aug 3, 2026) and
    // fixed here. All 4 quarters now anchor on Khan Academy's Middle
    // School Biology course (11 real units, individually verified),
    // supplemented by High School Biology's "Human body systems" topic
    // for S7L2 depth (the one gap ms-biology alone doesn't fully cover).
    // The displaced Earth Science/Physics/Chemistry content isn't lost —
    // Physics and Chemistry move to Summer as a real 8th-grade preview
    // (see below); Earth Science is retired outright since it's 6th-grade
    // material he's already past, not a 7th-grade requirement to make up.

    // Q1 2026-2027 Science — Cells, Organization & Body Systems (S7L1
    // partial + S7L2). "Human body systems" URL verified live on Khan
    // Academy's current hs-bio course (the older
    // /science/high-school-biology/hs-human-body-systems URL is marked
    // DEPRECATED by Khan Academy itself — this is the replacement).
    /**
     * DO NOT SEED A UNIT HE HAS ALREADY FINISHED SOMEWHERE ELSE.
     * (Added Aug 9, 2026, with the chemistry-to-Q2 re-placement.)
     *
     * Moving a unit between quarters is safe for work not yet started: the
     * reconcile below deletes the uncompleted row from the old quarter and
     * these loops add it to the new one. A COMPLETED row is different — the
     * reconcile deliberately never deletes one, because it is real work and a
     * real grade in his record. So without this guard, re-placing a unit he had
     * already finished would leave the finished row in the old quarter AND seed
     * a fresh, unfinished twin in the new one. The same unit, twice, one of
     * them asking him to do it again.
     *
     * The completed row wins and the twin is not created. Keeping it where he
     * actually did the work is also the more honest record: attributing a unit
     * he finished in Q1 to Q2 would misstate when it happened.
     */
    const scienceDoneElsewhere = new Set(
      khanAcademyAssignments
        .filter((a) => a.subject === 'science' && (a.completed || a.grade != null))
        .map((a) => a.skillTitle)
    );
    const scienceNotDoneElsewhere = (row, label) =>
      !(scienceDoneElsewhere.has(row.skillTitle) &&
        !khanAcademyAssignments.some(
          (a) => a.subject === 'science' && a.skillTitle === row.skillTitle &&
                 a.batchLabel === label && (a.completed || a.grade != null)
        ));

    const scienceQ1Label = 'Q1 2026-2027';
    const scienceQ1Rows = scienceRowsFor('Q1 2026-2027');
    const missingScienceQ1Rows = scienceQ1Rows.filter(
      (r) => !khanAcademyAssignments.some((a) => a.subject === r.subject && a.skillTitle === r.skillTitle && a.batchLabel === scienceQ1Label)
        && scienceNotDoneElsewhere(r, scienceQ1Label)
    );
    if (missingScienceQ1Rows.length > 0) {
      const createdAt = new Date().toISOString();
      const preparedRows = missingScienceQ1Rows.map((r) => ({ ...r, completed: false, grade: null, completedAt: null, createdAt, batchLabel: scienceQ1Label }));
      const newIds = await Promise.all(preparedRows.map((r) => addKhanAcademyAssignmentRecord(r)));
      khanAcademyAssignments = [...khanAcademyAssignments, ...preparedRows.map((r, i) => ({ id: newIds[i], ...r }))];
    }

    // Q2 2026-2027 Science — Genetics, Heredity & Reproduction (S7L3).
    const scienceQ2Label = 'Q2 2026-2027';
    const scienceQ2Rows = scienceRowsFor('Q2 2026-2027');
    const missingScienceQ2Rows = scienceQ2Rows.filter(
      (r) => !khanAcademyAssignments.some((a) => a.subject === r.subject && a.skillTitle === r.skillTitle && a.batchLabel === scienceQ2Label)
        && scienceNotDoneElsewhere(r, scienceQ2Label)
    );
    if (missingScienceQ2Rows.length > 0) {
      const createdAt = new Date().toISOString();
      const preparedRows = missingScienceQ2Rows.map((r) => ({ ...r, completed: false, grade: null, completedAt: null, createdAt, batchLabel: scienceQ2Label }));
      const newIds = await Promise.all(preparedRows.map((r) => addKhanAcademyAssignmentRecord(r)));
      khanAcademyAssignments = [...khanAcademyAssignments, ...preparedRows.map((r, i) => ({ id: newIds[i], ...r }))];
    }

    // Q3 2026-2027 Science — Ecology (S7L4, plus the biodiversity half of
    // S7L1).
    const scienceQ3Label = 'Q3 2026-2027';
    const scienceQ3Rows = scienceRowsFor('Q3 2026-2027');
    const missingScienceQ3Rows = scienceQ3Rows.filter(
      (r) => !khanAcademyAssignments.some((a) => a.subject === r.subject && a.skillTitle === r.skillTitle && a.batchLabel === scienceQ3Label)
        && scienceNotDoneElsewhere(r, scienceQ3Label)
    );
    if (missingScienceQ3Rows.length > 0) {
      const createdAt = new Date().toISOString();
      const preparedRows = missingScienceQ3Rows.map((r) => ({ ...r, completed: false, grade: null, completedAt: null, createdAt, batchLabel: scienceQ3Label }));
      const newIds = await Promise.all(preparedRows.map((r) => addKhanAcademyAssignmentRecord(r)));
      khanAcademyAssignments = [...khanAcademyAssignments, ...preparedRows.map((r, i) => ({ id: newIds[i], ...r }))];
    }

    // Q4 2026-2027 Science — Evolution (S7L5). Only 2 real units exist on
    // Khan Academy for this topic — reflects the actual course structure,
    // not a search shortfall (verified against the live ms-biology course
    // outline).
    const scienceQ4Label = 'Q4 2026-2027';
    const scienceQ4Rows = scienceRowsFor('Q4 2026-2027');
    const missingScienceQ4Rows = scienceQ4Rows.filter(
      (r) => !khanAcademyAssignments.some((a) => a.subject === r.subject && a.skillTitle === r.skillTitle && a.batchLabel === scienceQ4Label)
        && scienceNotDoneElsewhere(r, scienceQ4Label)
    );
    if (missingScienceQ4Rows.length > 0) {
      const createdAt = new Date().toISOString();
      const preparedRows = missingScienceQ4Rows.map((r) => ({ ...r, completed: false, grade: null, completedAt: null, createdAt, batchLabel: scienceQ4Label }));
      const newIds = await Promise.all(preparedRows.map((r) => addKhanAcademyAssignmentRecord(r)));
      khanAcademyAssignments = [...khanAcademyAssignments, ...preparedRows.map((r, i) => ({ id: newIds[i], ...r }))];
    }

    // Summer 2027 Science — Physical Science Preview, real 8th-grade-GA
    // content (S8P) that used to be mislabeled as Q3/Q4 "7th grade."
    // Georgia's real sequence puts Physical Science in 8th grade, so
    // Summer (the gap between 7th and 8th) is actually the honest place
    // for it — same "intro to next level" pattern already used for Math
    // and Reading's Summer quarters, just now genuinely accurate instead
    // of coincidentally similar. Picked the 4 most foundational units
    // across Physics + Chemistry rather than all 7 (matches the "intro,
    // not full course" scope of every other subject's Summer batch).
    const scienceSummerLabel = 'Summer 2027';
    const scienceSummerRows = scienceRowsFor('Summer 2027');
    const missingScienceSummerRows = scienceSummerRows.filter(
      (r) => !khanAcademyAssignments.some((a) => a.subject === r.subject && a.skillTitle === r.skillTitle && a.batchLabel === scienceSummerLabel)
        && scienceNotDoneElsewhere(r, scienceSummerLabel)
    );
    if (missingScienceSummerRows.length > 0) {
      const createdAt = new Date().toISOString();
      const preparedRows = missingScienceSummerRows.map((r) => ({ ...r, completed: false, grade: null, completedAt: null, createdAt, batchLabel: scienceSummerLabel }));
      const newIds = await Promise.all(preparedRows.map((r) => addKhanAcademyAssignmentRecord(r)));
      khanAcademyAssignments = [...khanAcademyAssignments, ...preparedRows.map((r, i) => ({ id: newIds[i], ...r }))];
    }

    // One-time retirement of the old, mis-sequenced Science rows (Earth &
    // Space Science in Q1, High School Physics intro in Summer) now that
    // real Georgia standards research replaced them above. Only removes
    // INCOMPLETE rows — if either Lamar or the parent already completed
    // and graded one of these before the correction, it's left alone so
    // no real progress or grade history is ever silently erased. Runs
    // every hydrate so it retroactively cleans up anyone who already ran
    // the app under the old sequencing, not just fresh installs.
    // Aug 7, 2026 — the four Earth & space titles that used to be listed here
    // ('Earth in Space', 'The Geosphere', 'Weather and Climate', 'Earth and
    // Society') have been REMOVED from this set. Middle School Earth and space
    // science is now a real part of the sequence, with URLs verified against
    // the live course. Leaving them here would have deleted them on every
    // single hydrate, silently, forever.
    //
    // The '(8th grade preview)' rows are new here: those same Chemistry and
    // Physics units now run during the school year under clean titles, so the
    // Summer-labelled preview rows they replace are retired. Incomplete only —
    // a completed row is real work and is never removed.
    const RETIRED_SCIENCE_TITLES = new Set([
      'Forces and Motion (High School intro)',
      'Introduction to Energy (High School intro)',
      'Wave Properties (High School intro)',
      'Electromagnetic Radiation (High School intro)',
      'Motion and Forces (8th grade preview)',
      'Non-Contact Interactions (8th grade preview)',
      'Classifying Matter (8th grade preview)',
      'Physical Properties of Matter (8th grade preview)',
      /**
       * Human Body Systems — retired Aug 9, 2026 at the parent's instruction:
       * "if the human body system dont belong in this year dont add it."
       *
       * A HIGH-SCHOOL biology unit that had been seeded into Q1 as a
       * "supplement" because MS Biology unit 1 covers organization in the human
       * body but not at that depth. It is not one of Khan's ten middle-school
       * biology units, it overlaps unit 1 rather than filling a gap, and it was
       * the only row in the science year with no measured item count — so it
       * sat outside the pacing arithmetic every other unit is held to.
       *
       * IT HAS TO BE LISTED HERE, not merely deleted from scienceSequence.js.
       * The reconcile below only ever considers titles the sequence OWNS —
       * the rule that stops it touching assignments the parent added herself.
       * Drop a title from the sequence and it becomes invisible to that
       * cleanup and survives in her database forever. This list is the
       * mechanism that actually removes it, and it removes uncompleted copies
       * only: if he has already done it, the work stays in his record.
       *
       * The reverse trap is real too and is guarded: verify-curriculum asserts
       * no actively-seeded unit is also listed here, because a title left in
       * both places would be deleted on every hydrate, silently, forever.
       */
      'Human Body Systems'
    ]);
    // ---------------------------------------------------------------------
    // Reconcile Science against data/khan/scienceSequence.js, which is the
    // single source of truth for what Science units exist and which quarter
    // each belongs to.
    //
    // WHY THIS IS NOT JUST A RELOCATION (Aug 7, 2026): the live database was
    // found holding 13 rows from an older sequence the source hadn't produced
    // in a long time — Chemistry sitting in Q4, Physics in Q3, and
    // 'Ecosystems and Biodiversity' existing in Q2, Q3 and Q4 at the same
    // time. Every earlier cleanup removed rows by an explicit title list, so
    // anything nobody thought to list survived, and the drift compounded
    // quietly across rewrites. A named list would just repeat that mistake.
    //
    // TWO SAFETY RULES, both load-bearing:
    //   1. Only rows whose TITLE is one this sequence owns are ever
    //      considered. An assignment the parent added herself has a title we
    //      do not own, so the cleanup cannot see it, let alone delete it.
    //   2. Completed or graded rows are never removed. That is real work and
    //      a real grade in his record, even if the unit later moved quarters.
    // ---------------------------------------------------------------------
    const staleScienceIds = khanAcademyAssignments
      .filter((a) => a.subject === 'science'
        && !a.completed && a.grade == null
        && SCIENCE_CANONICAL_TITLES.has(a.skillTitle)
        && !SCIENCE_CANONICAL_KEYS.has(a.skillTitle + '||' + a.batchLabel))
      .map((a) => a.id);
    if (staleScienceIds.length > 0) {
      await Promise.all(staleScienceIds.map((id) => deleteKhanAcademyAssignmentRecord(id)));
      khanAcademyAssignments = khanAcademyAssignments.filter((a) => !staleScienceIds.includes(a.id));
    }

    // Repair drifted presentation fields on Science rows that already exist.
    //
    // The seeding loops above only ADD missing rows — that is what makes them
    // safe to run on every hydrate, and it is also why an existing row never
    // picks up a corrected field. Five rows were found carrying sequence
    // numbers from a superseded ordering; Q2 had two units both numbered 2
    // and none numbered 1, which makes "what is next" ambiguous and renders
    // the quarter in the wrong order.
    //
    // Only sequenceInQuarter, khanAcademyUrl and gradeLevel are touched.
    // completed, grade, completedAt and createdAt are his record and are
    // never written here. Idempotent: once a row matches, it is skipped.
    const scienceFieldRepairs = [];
    for (const a of khanAcademyAssignments) {
      if (a.subject !== 'science') continue;
      const want = scienceCanonicalRow(a.skillTitle, a.batchLabel);
      if (!want) continue;
      const patch = {};
      if (a.sequenceInQuarter !== want.sequenceInQuarter) patch.sequenceInQuarter = want.sequenceInQuarter;
      if (want.khanAcademyUrl && a.khanAcademyUrl !== want.khanAcademyUrl) patch.khanAcademyUrl = want.khanAcademyUrl;
      if (want.gradeLevel && a.gradeLevel !== want.gradeLevel) patch.gradeLevel = want.gradeLevel;
      if (Object.keys(patch).length > 0) scienceFieldRepairs.push({ ...a, ...patch });
    }
    if (scienceFieldRepairs.length > 0) {
      await Promise.all(scienceFieldRepairs.map((r) => updateKhanAcademyAssignmentRecord(r.id, r)));
      const byId = new Map(scienceFieldRepairs.map((r) => [r.id, r]));
      khanAcademyAssignments = khanAcademyAssignments.map((a) => byId.get(a.id) || a);
    }
    const retiredIds = khanAcademyAssignments
      .filter((a) => a.subject === 'science' && RETIRED_SCIENCE_TITLES.has(a.skillTitle) && !a.completed)
      .map((a) => a.id);
    if (retiredIds.length > 0) {
      await Promise.all(retiredIds.map((id) => deleteKhanAcademyAssignmentRecord(id)));
      khanAcademyAssignments = khanAcademyAssignments.filter((a) => !retiredIds.includes(a.id));
    }

    // Q1-Q4 2026-2027 Social Studies (Khan Academy) — added per real
    // Georgia standards research (confirmed with the parent). Georgia's
    // actual 7th grade Social Studies requirement is World Area Studies:
    // Africa, Southwest Asia (the Middle East), and Southern/Eastern Asia
    // (SS7H1-3 History, SS7G1-12 Geography, SS7CG1-4 Government/Civics,
    // SS7E1-10 Economics) — NOT general US/world history, which is what
    // the original hybrid-model assumption had been. This batch is
    // real, individually-verified Khan Academy World History content
    // covering all 3 required regions; it runs ALONGSIDE (not instead
    // of) the Mission-Control-built genealogy/reclassification/
    // investigation lessons in socialStudies7.js — those are real,
    // valuable enrichment, but this Khan Academy content is what
    // actually satisfies the state's regional requirement.
    //
    // Honest gap, confirmed by direct research (not guessed): Khan
    // Academy has NO standalone Geography course for any region, and NO
    // Government/Civics or Economics content specific to Africa, the
    // Middle East, or Southern/Eastern Asia — only "US Government and
    // Civics" (US-only) and generic macro/micro Economics exist. So this
    // batch covers the History angle (SS7H1-3) well; Geography (SS7G),
    // Government (SS7CG), and Economics (SS7E) remain a real gap Khan
    // Academy cannot fill — flagged in PROJECT_PLAN.md as a follow-up
    // need (likely non-Khan-Academy source, e.g. CIA World Factbook for
    // geography basics, or a Mission-Control-built lesson pair per
    // region for gov/econ, similar to how Aerospace and Social Studies
    // lessons are already hand-built).
    //
    // Sequenced in Khan Academy's own World History course order
    // (chronological, not strictly regional — that's the real shape of
    // the only verified source available): ancient foundations (Q1) ->
    // classical empires & early Islam (Q2) -> medieval regional contact
    // (Q3) -> modern colonization & independence across all 3 regions
    // (Q4). All 5 unit URLs individually verified live against Khan
    // Academy's actual World History course (canonical URL confirmed,
    // not pattern-matched from another course).
    const socialStudiesQ1Label = 'Q1 2026-2027';
    // All 9 World History units + the Course Challenge, in Khan Academy's own
    // course order. See the migration comment further down for why the
    // missing-row check for THIS batch deliberately ignores batchLabel.
    const socialStudiesQ1Rows = [
      { subject: 'socialStudies', skillTitle: 'Origins of History', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/humanities/world-history/x66f79d8a:origins-of-history', sequenceInQuarter: 1 },
      { subject: 'socialStudies', skillTitle: 'Early Humans (250,000 BP to 3000 BCE)', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/humanities/world-history/x66f79d8a:early-humans', sequenceInQuarter: 2 },
      { subject: 'socialStudies', skillTitle: 'Early Agrarian Societies (Ancient Egypt, Ancient India & Early China)', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/humanities/world-history/x66f79d8a:early-agrarian-societies', sequenceInQuarter: 3 },
      { subject: 'socialStudies', skillTitle: 'Empires and Belief Systems (Persia, Imperial China & Origins of Islam)', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/humanities/world-history/x66f79d8a:empires-and-belief-systems', sequenceInQuarter: 4 },
      { subject: 'socialStudies', skillTitle: 'Regional Webs (Islamic World, Golden Age of Islam, Silk Road & Song China)', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/humanities/world-history/x66f79d8a:regional-webs', sequenceInQuarter: 5 },
      { subject: 'socialStudies', skillTitle: 'The First Global Age (1200 to 1750 CE)', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/humanities/world-history/x66f79d8a:the-first-global-age', sequenceInQuarter: 6 },
      { subject: 'socialStudies', skillTitle: 'Industrial Imperialism & Resisting Colonialism (Africa & Asia)', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/humanities/world-history/x66f79d8a:the-long-nineteenth-century', sequenceInQuarter: 7 },
      { subject: 'socialStudies', skillTitle: 'Decolonization (Africa & Asia)', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/humanities/world-history/x66f79d8a:global-conflict', sequenceInQuarter: 8 },
      { subject: 'socialStudies', skillTitle: 'Globalization (1900 CE to the Present)', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/humanities/world-history/x66f79d8a:globalization', sequenceInQuarter: 9 },
      { subject: 'socialStudies', skillTitle: 'World History — Course Challenge', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/humanities/world-history/test/x66f79d8a:course-challenge', isCourseChallenge: true, sequenceInQuarter: 99 }
    ];
    // DELIBERATELY ignores batchLabel - see the consolidation comment below.
    // A unit that already exists under an old quarter label must NOT be
    // re-created here; the migration relocates it instead. Matching on title
    // alone is safe because Khan unit titles are unique across the course.
    const missingSocialStudiesQ1Rows = socialStudiesQ1Rows.filter(
      (r) => !khanAcademyAssignments.some((a) => a.subject === r.subject && a.skillTitle === r.skillTitle)
    );
    if (missingSocialStudiesQ1Rows.length > 0) {
      const createdAt = new Date().toISOString();
      const preparedRows = missingSocialStudiesQ1Rows.map((r) => ({ ...r, completed: false, grade: null, completedAt: null, createdAt, batchLabel: socialStudiesQ1Label }));
      const newIds = await Promise.all(preparedRows.map((r) => addKhanAcademyAssignmentRecord(r)));
      khanAcademyAssignments = [...khanAcademyAssignments, ...preparedRows.map((r, i) => ({ id: newIds[i], ...r }))];
    }

    const socialStudiesQ2Label = 'Q2 2026-2027';
    // Q2 is Genealogy - the Mission Control lesson track owns this quarter
    // outright, per the parent: "Qtr 2 is Genealogy." The world-history unit
    // that used to sit here moved to Q1 with the rest of the course.
    const socialStudiesQ2Rows = [];
    const missingSocialStudiesQ2Rows = socialStudiesQ2Rows.filter(
      (r) => !khanAcademyAssignments.some((a) => a.subject === r.subject && a.skillTitle === r.skillTitle && a.batchLabel === socialStudiesQ2Label)
    );
    if (missingSocialStudiesQ2Rows.length > 0) {
      const createdAt = new Date().toISOString();
      const preparedRows = missingSocialStudiesQ2Rows.map((r) => ({ ...r, completed: false, grade: null, completedAt: null, createdAt, batchLabel: socialStudiesQ2Label }));
      const newIds = await Promise.all(preparedRows.map((r) => addKhanAcademyAssignmentRecord(r)));
      khanAcademyAssignments = [...khanAcademyAssignments, ...preparedRows.map((r, i) => ({ id: newIds[i], ...r }))];
    }

    const socialStudiesQ3Label = 'Q3 2026-2027';
    // Q3 is geography, government and economics on the Mission Control
    // track. Its world-history unit moved to Q1.
    const socialStudiesQ3Rows = [];
    const missingSocialStudiesQ3Rows = socialStudiesQ3Rows.filter(
      (r) => !khanAcademyAssignments.some((a) => a.subject === r.subject && a.skillTitle === r.skillTitle && a.batchLabel === socialStudiesQ3Label)
    );
    if (missingSocialStudiesQ3Rows.length > 0) {
      const createdAt = new Date().toISOString();
      const preparedRows = missingSocialStudiesQ3Rows.map((r) => ({ ...r, completed: false, grade: null, completedAt: null, createdAt, batchLabel: socialStudiesQ3Label }));
      const newIds = await Promise.all(preparedRows.map((r) => addKhanAcademyAssignmentRecord(r)));
      khanAcademyAssignments = [...khanAcademyAssignments, ...preparedRows.map((r, i) => ({ id: newIds[i], ...r }))];
    }

    const socialStudiesQ4Label = 'Q4 2026-2027';
    // Q4 is environment and culture on the Mission Control track. Its two
    // world-history units moved to Q1.
    const socialStudiesQ4Rows = [];
    const missingSocialStudiesQ4Rows = socialStudiesQ4Rows.filter(
      (r) => !khanAcademyAssignments.some((a) => a.subject === r.subject && a.skillTitle === r.skillTitle && a.batchLabel === socialStudiesQ4Label)
    );
    if (missingSocialStudiesQ4Rows.length > 0) {
      const createdAt = new Date().toISOString();
      const preparedRows = missingSocialStudiesQ4Rows.map((r) => ({ ...r, completed: false, grade: null, completedAt: null, createdAt, batchLabel: socialStudiesQ4Label }));
      const newIds = await Promise.all(preparedRows.map((r) => addKhanAcademyAssignmentRecord(r)));
      khanAcademyAssignments = [...khanAcademyAssignments, ...preparedRows.map((r, i) => ({ id: newIds[i], ...r }))];
    }

    // Summer 2027 Social Studies — 8th grade preview. Added Aug 8, 2026 at the
    // parent's direction ("complete social studies gap").
    //
    // Social Studies was the only active subject with a genuinely empty period.
    // Every other Khan-taught subject uses Summer the same way: Math previews
    // 8th grade math, Reading previews 9th/10th ELA, Science previews 8th-grade
    // physical science. This does the same thing for Social Studies.
    //
    // Georgia's 8th-grade standard is GEORGIA STUDIES, and Khan Academy has no
    // Georgia Studies course — checked directly, it does not exist. What Khan
    // has is the national frame Georgia's story sits inside, and the first five
    // units of its US History course map onto the first half of SS8H:
    //
    //   Unit 1  Worlds collide (1491-1607)        -> SS8H1  Native cultures, contact
    //   Unit 2  Colonial America (1607-1754)      -> SS8H2  founding of Georgia
    //   Unit 3  The Revolutionary Era (1754-1800) -> SS8H3/H4  Revolution, statehood
    //   Unit 4  The Early Republic (1800-1848)    -> SS8H4/H5  land lotteries, removal
    //   Unit 5  The Civil War Era (1844-1877)     -> SS8H5/H6  secession, war, Reconstruction
    //
    // Five units over Summer's eight weeks is roughly the Q1 pace, gentled.
    // Units 6-9 (Gilded Age through the Modern Era) are deliberately left for
    // 8th grade itself — a preview, not the whole year crammed into a summer.
    //
    // NO COURSE CHALLENGE, and this is a deliberate exception to the standing
    // rule that he sits every course challenge. Khan's US History Course
    // Challenge covers all NINE units; he will have done five. It belongs at
    // the end of 8th grade. Its URL, so it is not lost when that time comes:
    //   https://www.khanacademy.org/humanities/us-history/test/x71a94f19:course-challenge
    //
    // All five URLs were loaded in a real browser and their rendered <h1> read
    // back — Khan's pages are JS-rendered and retired units redirect
    // CLIENT-SIDE, so an HTTP 200 proves nothing. No redirects; every heading
    // matched the title seeded here.
    const socialStudiesSummerLabel = 'Summer 2027';
    const socialStudiesSummerRows = [
      { subject: 'socialStudies', skillTitle: 'Worlds collide (1491–1607)', gradeLevel: '8th', khanAcademyUrl: 'https://www.khanacademy.org/humanities/us-history/precontact-and-early-colonial-era', sequenceInQuarter: 1 },
      { subject: 'socialStudies', skillTitle: 'Colonial America (1607–1754)', gradeLevel: '8th', khanAcademyUrl: 'https://www.khanacademy.org/humanities/us-history/colonial-america', sequenceInQuarter: 2 },
      { subject: 'socialStudies', skillTitle: 'The Revolutionary Era (1754–1800)', gradeLevel: '8th', khanAcademyUrl: 'https://www.khanacademy.org/humanities/us-history/road-to-revolution', sequenceInQuarter: 3 },
      { subject: 'socialStudies', skillTitle: 'The Early Republic (1800–1848)', gradeLevel: '8th', khanAcademyUrl: 'https://www.khanacademy.org/humanities/us-history/the-early-republic', sequenceInQuarter: 4 },
      { subject: 'socialStudies', skillTitle: 'The Civil War Era (1844–1877)', gradeLevel: '8th', khanAcademyUrl: 'https://www.khanacademy.org/humanities/us-history/civil-war-era', sequenceInQuarter: 5 }
    ];
    const missingSocialStudiesSummerRows = socialStudiesSummerRows.filter(
      (r) => !khanAcademyAssignments.some((a) => a.subject === r.subject && a.skillTitle === r.skillTitle && a.batchLabel === socialStudiesSummerLabel)
    );
    if (missingSocialStudiesSummerRows.length > 0) {
      const createdAt = new Date().toISOString();
      const preparedRows = missingSocialStudiesSummerRows.map((r) => ({ ...r, completed: false, grade: null, completedAt: null, createdAt, batchLabel: socialStudiesSummerLabel }));
      const newIds = await Promise.all(preparedRows.map((r) => addKhanAcademyAssignmentRecord(r)));
      khanAcademyAssignments = [...khanAcademyAssignments, ...preparedRows.map((r, i) => ({ id: newIds[i], ...r }))];
    }

    // =====================================================================
    // TECHNOLOGY & COMPUTER SCIENCE — Khan Academy content, added Aug 6, 2026
    // at the parent's direct instruction: "The lessons should be created as
    // the other courses. ex math."
    //
    // WHY THIS EXISTS: Technology was the ONLY active subject with zero Khan
    // Academy rows (math 58, reading 61, science 14, socialStudies 5,
    // technology 0). That meant its 32 hand-built Mission Control lessons
    // were the entire subject — and those lessons average 734 characters of
    // teaching against Social Studies' 2,123, with no test questions at all.
    // Khan now carries the computer-science core, exactly as it does for
    // math, and Mission Control keeps only what Khan genuinely doesn't teach.
    //
    // EVERY URL BELOW WAS READ LIVE off Khan Academy's own course pages
    // through the browser on Aug 6, 2026 — same method used for all 58 math
    // units, never pattern-matched from another course. Unit order is Khan's
    // OWN course order, not a re-sort.
    //
    // SEMESTER SUBJECT: Technology is semester-paced (Q1 + Q2 only) per the
    // standing pacing directive, so it gets the Q1 (~12) and Q2 (~8) targets
    // and no Q3/Q4/Summer rows.
    //
    // GRADING — a real difference from math, verified rather than assumed.
    // Khan's computing catalog is not uniform:
    //   * "Computers and the Internet" HAS unit tests, quizzes, and a Course
    //     Challenge — it fits the confirmed A-F unit-test grading model
    //     exactly, like every math course.
    //   * "Intro to computer science - Python" and "Computer programming"
    //     have NO unit tests, no quizzes, and no Course Challenge. They are
    //     built around coding challenges and projects.
    // Those rows are therefore marked `gradedBy: 'project'` so the parent
    // dashboard can tell the difference instead of showing an A-F unit-test
    // field for a course that has no unit test. This is additive — rows
    // without the field behave exactly as before.
    //
    // OMITTED ON PURPOSE: "Meet the professional" (Computer programming U8)
    // and "Teacher resources" (Python U8) carry no student exercises — same
    // convention that omitted 6th-grade math's "Khan for families" unit.
    const technologyQ1Label = 'Q1 2026-2027';
    const technologyQ1Rows = [
      // Course: Computers and the Internet — 5 units, in Khan's order.
      // The foundations course, and the one that maps onto Georgia's
      // digital-literacy expectations and this subject's own topic list
      // (internet research, cybersecurity, AI).
      { subject: 'technology', skillTitle: 'Digital information', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/computing/computers-and-internet/xcae6f4a7ff015e7d:digital-information', sequenceInQuarter: 1 },
      { subject: 'technology', skillTitle: 'Computers', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/computing/computers-and-internet/xcae6f4a7ff015e7d:computers', sequenceInQuarter: 2 },
      { subject: 'technology', skillTitle: 'The Internet', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/computing/computers-and-internet/xcae6f4a7ff015e7d:the-internet', sequenceInQuarter: 3 },
      { subject: 'technology', skillTitle: 'Online data security', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/computing/computers-and-internet/xcae6f4a7ff015e7d:online-data-security', sequenceInQuarter: 4 },
      { subject: 'technology', skillTitle: 'Computing innovations', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/computing/computers-and-internet/xcae6f4a7ff015e7d:computing-innovations', sequenceInQuarter: 5 },
      // Course: Intro to computer science - Python — units 1-6, Khan's order.
      // Real programming, and the language actually used in aerospace work.
      { subject: 'technology', skillTitle: 'Computational thinking with variables', gradeLevel: '7th', gradedBy: 'project', khanAcademyUrl: 'https://www.khanacademy.org/computing/intro-to-python-fundamentals/x5279a44ae0ab15d6:computational-thinking-with-variables', sequenceInQuarter: 6 },
      { subject: 'technology', skillTitle: 'Designing algorithms with conditionals', gradeLevel: '7th', gradedBy: 'project', khanAcademyUrl: 'https://www.khanacademy.org/computing/intro-to-python-fundamentals/x5279a44ae0ab15d6:designing-algorithms-with-conditionals', sequenceInQuarter: 7 },
      { subject: 'technology', skillTitle: 'Simulating phenomena with loops', gradeLevel: '7th', gradedBy: 'project', khanAcademyUrl: 'https://www.khanacademy.org/computing/intro-to-python-fundamentals/x5279a44ae0ab15d6:simulating-phenomena-with-loops', sequenceInQuarter: 8 },
      { subject: 'technology', skillTitle: 'Playing games with functions', gradeLevel: '7th', gradedBy: 'project', khanAcademyUrl: 'https://www.khanacademy.org/computing/intro-to-python-fundamentals/x5279a44ae0ab15d6:playing-games-with-functions', sequenceInQuarter: 9 },
      { subject: 'technology', skillTitle: 'Automating tasks with lists', gradeLevel: '7th', gradedBy: 'project', khanAcademyUrl: 'https://www.khanacademy.org/computing/intro-to-python-fundamentals/x5279a44ae0ab15d6:automating-tasks-with-lists', sequenceInQuarter: 10 },
      { subject: 'technology', skillTitle: 'Analyzing data with dictionaries', gradeLevel: '7th', gradedBy: 'project', khanAcademyUrl: 'https://www.khanacademy.org/computing/intro-to-python-fundamentals/x5279a44ae0ab15d6:analyzing-data-with-dictionaries', sequenceInQuarter: 11 },
      // Course Challenge for Computers and the Internet — that course
      // finishes this quarter, so its challenge sorts last here (99), same
      // convention as every math Course Challenge.
      { subject: 'technology', skillTitle: 'Course Challenge — Computers and the Internet', gradeLevel: '7th', isCourseChallenge: true, khanAcademyUrl: 'https://www.khanacademy.org/computing/computers-and-internet/test/xcae6f4a7ff015e7d:course-challenge', sequenceInQuarter: 99 }
    ];
    const missingTechnologyQ1Rows = technologyQ1Rows.filter(
      (r) => !khanAcademyAssignments.some((a) => a.subject === r.subject && a.skillTitle === r.skillTitle && a.batchLabel === technologyQ1Label)
    );
    if (missingTechnologyQ1Rows.length > 0) {
      const createdAt = new Date().toISOString();
      const preparedRows = missingTechnologyQ1Rows.map((r) => ({ ...r, completed: false, grade: null, completedAt: null, createdAt, batchLabel: technologyQ1Label }));
      const newIds = await Promise.all(preparedRows.map((r) => addKhanAcademyAssignmentRecord(r)));
      khanAcademyAssignments = [...khanAcademyAssignments, ...preparedRows.map((r, i) => ({ id: newIds[i], ...r }))];
    }

    /**
     * ==================================================================
     * THESE EIGHT UNITS MOVED FROM Q2 TO Q3 (Aug 26, 2026). O-3, her call.
     * ==================================================================
     *
     * They finish Python, then work through Khan's "Computer programming -
     * JavaScript and the web" course in ITS OWN unit order (JS Drawing &
     * Animation is Khan's Unit 1, HTML/CSS Unit 2, SQL Unit 3, and so on) —
     * deliberately not resorted into what might look like a friendlier
     * sequence, because the parent's instruction was to keep the lessons in
     * order and Khan's order is the verified one. That order is unchanged.
     * Only the quarter moved.
     *
     * WHY. The pacing panel (`lib/pacing.js`, shipped the same day) did the
     * arithmetic nobody had done: **Q2 needed 13 more days than it had, with
     * 7 open Fridays.** Technology alone was 10 of that — 11 Mission Control
     * lessons plus these 8 units, in 9 Tuesdays. Social Studies was the other
     * 3. The quarter could not finish, and nothing on any screen said so.
     *
     * Q3 had **12 open Fridays doing nothing** and Technology sitting on 3
     * spare days. Moving the units there costs no lesson order and no
     * content:
     *
     *     Q2  short 13 of 7 Fridays   ->  short 5 of 7,  2 left over
     *     Q3  short  0 of 12          ->  short 5 of 12, 7 left over
     *
     * THE "SEMESTER SUBJECT" NOTE ABOVE IS NOW HALF TRUE, deliberately. The
     * Khan seed was Q1+Q2 only; Technology's Mission Control lessons have
     * always run into Q3 (nine of them). The subject was never really a two
     * quarter subject — only its Khan roster was, and that is what created
     * the pile-up in the middle of the year.
     */
    const technologyQ3Label = 'Q3 2026-2027';
    const technologyQ3Rows = [
      { subject: 'technology', skillTitle: 'Building software with classes', gradeLevel: '7th', gradedBy: 'project', khanAcademyUrl: 'https://www.khanacademy.org/computing/intro-to-python-fundamentals/x5279a44ae0ab15d6:building-software-with-classes', sequenceInQuarter: 1 },
      { subject: 'technology', skillTitle: 'Intro to JS: Drawing & Animation', gradeLevel: '7th', gradedBy: 'project', khanAcademyUrl: 'https://www.khanacademy.org/computing/computer-programming/programming', sequenceInQuarter: 2 },
      { subject: 'technology', skillTitle: 'Intro to HTML/CSS: Making webpages', gradeLevel: '7th', gradedBy: 'project', khanAcademyUrl: 'https://www.khanacademy.org/computing/computer-programming/html-css', sequenceInQuarter: 3 },
      { subject: 'technology', skillTitle: 'Intro to SQL: Querying and managing data', gradeLevel: '7th', gradedBy: 'project', khanAcademyUrl: 'https://www.khanacademy.org/computing/computer-programming/sql', sequenceInQuarter: 4 },
      { subject: 'technology', skillTitle: 'Advanced JS: Games & Visualizations', gradeLevel: '7th', gradedBy: 'project', khanAcademyUrl: 'https://www.khanacademy.org/computing/computer-programming/programming-games-visualizations', sequenceInQuarter: 5 },
      { subject: 'technology', skillTitle: 'Advanced JS: Natural Simulations', gradeLevel: '7th', gradedBy: 'project', khanAcademyUrl: 'https://www.khanacademy.org/computing/computer-programming/programming-natural-simulations', sequenceInQuarter: 6 },
      { subject: 'technology', skillTitle: 'HTML/JS: Making webpages interactive', gradeLevel: '7th', gradedBy: 'project', khanAcademyUrl: 'https://www.khanacademy.org/computing/computer-programming/html-css-js', sequenceInQuarter: 7 },
      { subject: 'technology', skillTitle: 'HTML/JS: Making webpages interactive with jQuery', gradeLevel: '7th', gradedBy: 'project', khanAcademyUrl: 'https://www.khanacademy.org/computing/computer-programming/html-js-jquery', sequenceInQuarter: 8 }
    ];
    /**
     * THE MOVE, FOR THE INSTALLS THAT ALREADY HAVE THESE ROWS IN Q2.
     *
     * Reseeding cannot do this. The seed below is keyed on
     * (subject, skillTitle, batchLabel), so with the label changed to Q3 it
     * would find no match and add a SECOND copy of all eight units, leaving
     * him sixteen. The existing rows have to be relabelled first, and this
     * runs every hydrate rather than as a one-shot Dexie upgrade — a version
     * upgrade fires once and never again, which is exactly how the retired
     * subject ids above came to be stranded on rows written after it.
     *
     * A COMPLETED UNIT DOES NOT MOVE. If he has already finished one, its
     * grade was earned in Q2 and belongs to Q2's record — dragging it into
     * Q3 would quietly rewrite a quarter she has already reported on. None
     * are complete today (Q2 opens Nov 2), so this is a guard against the
     * future, not a repair of the present.
     */
    const technologyMovedTitles = new Set(technologyQ3Rows.map((r) => r.skillTitle));
    const technologyMoved = [];
    khanAcademyAssignments = khanAcademyAssignments.map((a) => {
      if (a.subject !== 'technology') return a;
      if (a.batchLabel !== 'Q2 2026-2027') return a;
      if (!technologyMovedTitles.has(a.skillTitle)) return a;
      if (a.completed) return a;
      const moved = { ...a, batchLabel: technologyQ3Label };
      technologyMoved.push(moved);
      return moved;
    });
    if (technologyMoved.length > 0) {
      await Promise.all(technologyMoved.map((r) => updateKhanAcademyAssignmentRecord(r.id, r)));
    }

    const missingTechnologyQ3Rows = technologyQ3Rows.filter(
      (r) => !khanAcademyAssignments.some((a) => a.subject === r.subject && a.skillTitle === r.skillTitle && a.batchLabel === technologyQ3Label)
    );
    if (missingTechnologyQ3Rows.length > 0) {
      const createdAt = new Date().toISOString();
      const preparedRows = missingTechnologyQ3Rows.map((r) => ({ ...r, completed: false, grade: null, completedAt: null, createdAt, batchLabel: technologyQ3Label }));
      const newIds = await Promise.all(preparedRows.map((r) => addKhanAcademyAssignmentRecord(r)));
      khanAcademyAssignments = [...khanAcademyAssignments, ...preparedRows.map((r, i) => ({ id: newIds[i], ...r }))];
    }

    // Course Challenges — one per grade-level Khan Academy course, added
    // Aug 6, 2026 at the parent's request. A Course Challenge covers a whole
    // course and is taken AFTER all of that course's units, so each is
    // placed in the quarter where its grade-level content concludes and
    // given a high sequence (99) so it always sorts last in its quarter —
    // surfacing as "today's lesson" only once every unit before it is done.
    // Scored A-F in the parent-only Khan Academy Grades section, same as a
    // Unit Test. Marked isCourseChallenge:true so the UI can label it.
    // Seeded idempotently by (subject, skillTitle, batchLabel), same pattern
    // as every batch above.
    const courseChallengeRows = [
      { subject: 'math', skillTitle: '5th Grade Math — Course Challenge', gradeLevel: '5th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-fifth-grade-math', batchLabel: 'Q1 2026-2027', isCourseChallenge: true, sequenceInQuarter: 99 },
      { subject: 'math', skillTitle: '6th Grade Math — Course Challenge', gradeLevel: '6th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-sixth-grade-math', batchLabel: 'Q2 2026-2027', isCourseChallenge: true, sequenceInQuarter: 99 },
      { subject: 'math', skillTitle: '7th Grade Math — Course Challenge', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-seventh-grade-math', batchLabel: 'Q4 2026-2027', isCourseChallenge: true, sequenceInQuarter: 99 },
      { subject: 'math', skillTitle: '8th Grade Math — Course Challenge', gradeLevel: '8th', khanAcademyUrl: 'https://www.khanacademy.org/math/cc-eighth-grade-math', batchLabel: 'Summer 2027', isCourseChallenge: true, sequenceInQuarter: 99 },
      { subject: 'reading', skillTitle: '7th Grade ELA — Course Challenge', gradeLevel: '7th', khanAcademyUrl: 'https://www.khanacademy.org/ela/7th-grade-reading-and-vocabulary', batchLabel: 'Q3 2026-2027', isCourseChallenge: true, sequenceInQuarter: 99 },
      { subject: 'reading', skillTitle: '8th Grade ELA — Course Challenge', gradeLevel: '8th', khanAcademyUrl: 'https://www.khanacademy.org/ela/8th-grade-reading-and-vocabulary', batchLabel: 'Q4 2026-2027', isCourseChallenge: true, sequenceInQuarter: 99 },
      // Science course challenges — added Aug 7, 2026 at the parent's
      // request ("he has to complete the course challenges as well").
      // Four courses now run through the year, so four challenges, each in
      // the quarter where its course concludes. See data/khan/scienceSequence.js.
      ...scienceCourseChallengeRows()
    ];
    const missingCourseChallengeRows = courseChallengeRows.filter(
      (r) => !khanAcademyAssignments.some((a) => a.subject === r.subject && a.skillTitle === r.skillTitle && a.batchLabel === r.batchLabel)
    );
    if (missingCourseChallengeRows.length > 0) {
      const createdAt = new Date().toISOString();
      const preparedRows = missingCourseChallengeRows.map((r) => ({ ...r, completed: false, grade: null, completedAt: null, createdAt }));
      const newIds = await Promise.all(preparedRows.map((r) => addKhanAcademyAssignmentRecord(r)));
      khanAcademyAssignments = [...khanAcademyAssignments, ...preparedRows.map((r, i) => ({ id: newIds[i], ...r }))];
    }

    // One-time correction for two real errors caught by the parent after
    // actual use: (1) the Reading skill "Antonyms, connotation, and word
    // choice" was seeded pointing at the SAME URL as a different Reading
    // skill ("Themes, figures of speech..."), making them look like
    // duplicate/redundant lessons rather than two distinct assignments —
    // fixed with a genuinely distinct, individually-verified vocabulary-
    // specific URL. (2) the Math skill "Rates and Percentages" is
    // retitled to match Khan Academy's actual official unit name,
    // "Fractions, Decimals, and Percentages (including Rates)" — the
    // link itself was correct, just imprecisely labeled. This runs every
    // hydrate (cheap — a handful of comparisons) so it retroactively
    // fixes anyone who already ran the app before this correction
    // existed, not just fresh installs.
    const OLD_DUPLICATE_ANTONYMS_URL = 'https://www.khanacademy.org/ela/pisa-2025-english-supplement/x0fbe4cb2373ed873:7th-grade-reading-vocabulary';
    const CORRECTED_ANTONYMS_URL = 'https://www.khanacademy.org/ela/pisa-2025-english-supplement/x0fbe4cb2373ed873:7th-grade-reading-vocabulary/x0fbe4cb2373ed873:trailblazing-women/a/trailblazing-women-unit-vocabulary';
    const corrections = [];
    khanAcademyAssignments = khanAcademyAssignments.map((a) => {
      if (a.skillTitle === 'Antonyms, connotation, and word choice (vocabulary)' && a.khanAcademyUrl === OLD_DUPLICATE_ANTONYMS_URL) {
        const fixed = { ...a, khanAcademyUrl: CORRECTED_ANTONYMS_URL };
        corrections.push(fixed);
        return fixed;
      }
      if (a.skillTitle === 'Rates and Percentages' && a.subject === 'math') {
        const fixed = { ...a, skillTitle: 'Fractions, Decimals, and Percentages (including Rates)' };
        corrections.push(fixed);
        return fixed;
      }
      return a;
    });
    if (corrections.length > 0) {
      await Promise.all(corrections.map((r) => updateKhanAcademyAssignmentRecord(r.id, r)));
    }

    // One-time restructuring migration, confirmed with the parent: Q1
    // Math now leads with the 4 real diagnosed 5th/6th-grade fundamentals
    // (moved here from the old "Month 1" legacy batch, since he needs
    // these solid before 7th-grade content will stick), followed by the
    // 8 already-verified 7th-grade lessons. Runs every hydrate so it
    // retroactively fixes anyone who already ran the app under the old
    // structure, not just fresh installs.
    const q1RestructureMap = {
      // Old Month-1-batch math skills -> new Q1 lessons 1-4, with the
      // "Divide whole numbers" title/grade bug fixed at the same time
      // (was wrongly tagged 6th grade; the real Khan Academy content is
      // 5th grade and covers multiplication and division broadly, not a
      // narrow "3-digit divisors" skill).
      // Q1 Math re-sequenced Aug 6, 2026 to Khan Academy's 5th-grade course
      // order (Decimal Place Value first, Multi-Digit Mult/Div at Unit 5's
      // slot). Every Q1 math skill is listed so already-persisted rows
      // re-sequence too, not just fresh installs. Both the legacy title
      // ('Divide whole numbers - 3-digit divisors') and the corrected title
      // ('Multi-Digit Multiplication and Division') map to the same slot,
      // covering installs at either migration stage.
      // Q1 Math re-sequenced Aug 6, 2026 to Khan's full 16-unit 5th-grade
      // course order. The 5 newly-added units (Subtract decimals, Divide
      // decimals, Coordinate plane, Converting units of measure, Line plots)
      // seed into existing installs via the missing-rows check; they're
      // listed here too so their sequence is enforced regardless of seed
      // order. Both the legacy title ('Divide whole numbers - 3-digit
      // divisors') and corrected title map to the Unit 5 slot.
      'Decimal Place Value': { sequenceInQuarter: 1, batchLabel: 'Q1 2026-2027' },
      'Add and Subtract Decimals': { sequenceInQuarter: 2, batchLabel: 'Q1 2026-2027' },
      'Subtract decimals': { sequenceInQuarter: 3, batchLabel: 'Q1 2026-2027' },
      'Add fractions with unlike denominators': { sequenceInQuarter: 4, batchLabel: 'Q1 2026-2027' },
      'Divide whole numbers - 3-digit divisors': { newTitle: 'Multi-Digit Multiplication and Division', newGrade: '5th', sequenceInQuarter: 5, batchLabel: 'Q1 2026-2027' },
      'Multi-Digit Multiplication and Division': { sequenceInQuarter: 5, batchLabel: 'Q1 2026-2027' },
      'Multiply Fractions': { sequenceInQuarter: 6, batchLabel: 'Q1 2026-2027' },
      'Divide Fractions': { sequenceInQuarter: 7, batchLabel: 'Q1 2026-2027' },
      'Multiply Decimals': { sequenceInQuarter: 8, batchLabel: 'Q1 2026-2027' },
      'Divide decimals': { sequenceInQuarter: 9, batchLabel: 'Q1 2026-2027' },
      'Powers of Ten': { sequenceInQuarter: 10, batchLabel: 'Q1 2026-2027' },
      'Volume of cubes and rectangular prisms: word problems': { sequenceInQuarter: 11, batchLabel: 'Q1 2026-2027' },
      'Coordinate plane': { sequenceInQuarter: 12, batchLabel: 'Q1 2026-2027' },
      'Algebraic Thinking': { sequenceInQuarter: 13, batchLabel: 'Q1 2026-2027' },
      'Converting units of measure': { sequenceInQuarter: 14, batchLabel: 'Q1 2026-2027' },
      'Line plots': { sequenceInQuarter: 15, batchLabel: 'Q1 2026-2027' },
      'Properties of Shapes (Geometry)': { sequenceInQuarter: 16, batchLabel: 'Q1 2026-2027' },
      // Q2 Math (6th grade) re-sequenced Aug 6, 2026 to Khan's 11-unit
      // course order, with 3 units added (Exponents & Order of Operations,
      // Plane Figures, Coordinate Plane). Every Q2 item is listed so
      // already-persisted rows re-order too. Titles are unique per batch.
      'Ratios and Proportional Relationships (6th grade)': { sequenceInQuarter: 1, batchLabel: 'Q2 2026-2027' },
      'Arithmetic Operations (Fractions & Decimals)': { sequenceInQuarter: 2, batchLabel: 'Q2 2026-2027' },
      'Rates and Percentages (6th grade)': { sequenceInQuarter: 3, batchLabel: 'Q2 2026-2027' },
      'Exponents and Order of Operations (6th grade)': { sequenceInQuarter: 4, batchLabel: 'Q2 2026-2027' },
      'Negative Numbers (6th grade)': { sequenceInQuarter: 5, batchLabel: 'Q2 2026-2027' },
      'Variables and Expressions': { sequenceInQuarter: 6, batchLabel: 'Q2 2026-2027' },
      'Equations and Inequalities (6th grade)': { sequenceInQuarter: 7, batchLabel: 'Q2 2026-2027' },
      'Plane Figures (6th grade)': { sequenceInQuarter: 8, batchLabel: 'Q2 2026-2027' },
      'Coordinate Plane (6th grade)': { sequenceInQuarter: 9, batchLabel: 'Q2 2026-2027' },
      'Geometry (6th grade)': { sequenceInQuarter: 10, batchLabel: 'Q2 2026-2027' },
      'Data and Statistics (6th grade)': { sequenceInQuarter: 11, batchLabel: 'Q2 2026-2027' },
      // Old Q1 lessons (7th grade, previously sequenced 1-8 or 5-12
      // depending on which version of this migration a user last ran)
      // -> moved to Q3 as lessons 1-8, per the parent's reconsideration:
      // Q1 needed to stay pure 5th-grade fundamentals, not mixed with
      // new-grade material. Any of these found in the Q1 batch (any old
      // sequence number) get relocated to Q3 with corrected sequencing.
      'Negative Numbers: Addition and Subtraction': { sequenceInQuarter: 1, batchLabel: 'Q3 2026-2027' },
      'Negative Numbers: Multiplication and Division': { sequenceInQuarter: 2, batchLabel: 'Q3 2026-2027' },
      'Ratios and Proportional Relationships': { sequenceInQuarter: 3, batchLabel: 'Q3 2026-2027' },
      'Fractions, Decimals, and Percentages (including Rates)': { sequenceInQuarter: 4, batchLabel: 'Q3 2026-2027' },
      'Writing and Evaluating Algebraic Expressions': { sequenceInQuarter: 5, batchLabel: 'Q3 2026-2027' },
      'One and Two-Step Equations': { sequenceInQuarter: 6, batchLabel: 'Q3 2026-2027' },
      'One and Two-Step Inequalities': { sequenceInQuarter: 7, batchLabel: 'Q3 2026-2027' },
      'Geometry: Angles, Area, and Surface Area': { sequenceInQuarter: 8, batchLabel: 'Q3 2026-2027' },
      // Reading's 3 legacy skills used to be listed here as Q1 lessons 1-3.
      // REMOVED Aug 9, 2026: the Aug 7 IXL placement moved all three to Q2,
      // and ELA_PLACEMENT_MAP has owned them ever since. Because this pass now
      // defers to that map, these entries were unreachable — and they said
      // "Q1, first three lessons" to anyone reading the file, which is the
      // opposite of true. Unreachable configuration that contradicts the live
      // configuration is exactly the drift that put the verb unit at slot 10.
      // Writing's 2 legacy skills, unified from the old "Month 1" batch into
      // the Q1 Grammar batch above, same pattern as Math and Reading.
      //
      // CORRECTED Aug 9, 2026. "Verb tenses, including the perfect tenses" is
      // Khan's `parts-of-speech-the-verb` — GRAMMAR UNIT 2 — wearing the name
      // the IXL report gave it. Parked at slot 10, it made the quarter run
      // noun (unit 1) -> pronoun (unit 3), with the verb arriving after
      // syntax and usage, both of which assume it. See
      // data/khan/grammarCourseOrder.js for the full reasoning; that file is
      // now the single source of this order and a guard checks it.
      // Khan's title, because pass (a2) renames the row to it. The legacy IXL
      // name stays as an alias for a row that has somehow not been through
      // that pass — a very old backup, most likely.
      'Parts of speech: the verb': { sequenceInQuarter: 2, batchLabel: 'Q1 2026-2027' },
      'Verb tenses, including the perfect tenses': { sequenceInQuarter: 2, batchLabel: 'Q1 2026-2027' },
      // Not a Grammar-course unit at all — a 5th-grade vocabulary sub-skill,
      // so it sits after all ten rather than inside their numbering.
      'Roots, prefixes, and suffixes': { sequenceInQuarter: 11, batchLabel: 'Q1 2026-2027' }
    };
    const restructured = [];
    khanAcademyAssignments = khanAcademyAssignments.map((a) => {
      if (a.subject !== 'math' && a.subject !== 'reading' && a.subject !== 'writing') return a;
      /**
       * Do not touch a Language Arts row that ELA_PLACEMENT_MAP owns.
       *
       * Three 7th-grade reading rows appear in BOTH this map (Q1 slots 1-3)
       * and the final placement map (Q2), so before this guard they were
       * written here, rewritten by elaSequenceMap, and rewritten again by the
       * placement pass — three IndexedDB writes per row on every app start,
       * for a value that was only ever going to end up at the third one.
       *
       * These earlier passes exist to repair rows the placement map does not
       * cover. Where it does cover a row, it wins outright.
       */
      if (canonicalSubject(a.subject) === 'reading' && ELA_PLACEMENT_MAP[a.skillTitle]) return a;
      const migration = q1RestructureMap[a.skillTitle];
      // Only touch records already at the OLD position — a record that's
      // already correctly at its target sequence/batch should be left
      // alone (idempotent — safe to run every hydrate without re-writing
      // already-correct data every time).
      if (!migration) return a;
      const alreadyCorrect =
        a.sequenceInQuarter === migration.sequenceInQuarter &&
        a.batchLabel === (migration.batchLabel || a.batchLabel) &&
        (!migration.newTitle || a.skillTitle === migration.newTitle);
      if (alreadyCorrect) return a;
      const fixed = {
        ...a,
        sequenceInQuarter: migration.sequenceInQuarter,
        ...(migration.batchLabel ? { batchLabel: migration.batchLabel } : {}),
        ...(migration.newTitle ? { skillTitle: migration.newTitle } : {}),
        ...(migration.newGrade ? { gradeLevel: migration.newGrade } : {})
      };
      restructured.push(fixed);
      return fixed;
    });
    if (restructured.length > 0) {
      await Promise.all(restructured.map((r) => updateKhanAcademyAssignmentRecord(r.id, r)));
    }

    // Social Studies consolidation, Aug 7, 2026 (parent: "Q1 should have all
    // 9 lessons and the course Challenge. His grades are conducive of this."
    // and "Qtr 2 is Genealogy."). Khan's World History course is nine units
    // plus a Course Challenge; only five had ever been seeded, scattered one
    // per quarter, so two of the units that come BEFORE the one he is
    // currently working in did not exist in the app at all. All nine now sit
    // in Q1 in Khan's own course order.
    //
    // Relocates rows that already exist under an old quarter label. Same
    // shape and same idempotence guarantee as q1RestructureMap above: a row
    // already at its target position is left untouched, so this is safe to
    // run on every hydrate. Completion state, grades and completedAt ride
    // along unchanged - moving a unit between quarters must never cost him
    // credit for work already done.
    const socialStudiesQ1ConsolidationMap = {
      'Origins of History': { sequenceInQuarter: 1 },
      'Early Humans (250,000 BP to 3000 BCE)': { sequenceInQuarter: 2 },
      'Early Agrarian Societies (Ancient Egypt, Ancient India & Early China)': { sequenceInQuarter: 3 },
      'Empires and Belief Systems (Persia, Imperial China & Origins of Islam)': { sequenceInQuarter: 4 },
      'Regional Webs (Islamic World, Golden Age of Islam, Silk Road & Song China)': { sequenceInQuarter: 5 },
      'The First Global Age (1200 to 1750 CE)': { sequenceInQuarter: 6 },
      'Industrial Imperialism & Resisting Colonialism (Africa & Asia)': { sequenceInQuarter: 7 },
      'Decolonization (Africa & Asia)': { sequenceInQuarter: 8 },
      'Globalization (1900 CE to the Present)': { sequenceInQuarter: 9 },
      'World History — Course Challenge': { sequenceInQuarter: 99 }
    };
    const socialStudiesConsolidated = [];
    khanAcademyAssignments = khanAcademyAssignments.map((a) => {
      if (a.subject !== 'socialStudies') return a;
      const target = socialStudiesQ1ConsolidationMap[a.skillTitle];
      if (!target) return a;
      if (a.batchLabel === socialStudiesQ1Label && a.sequenceInQuarter === target.sequenceInQuarter) return a;
      const fixed = { ...a, batchLabel: socialStudiesQ1Label, sequenceInQuarter: target.sequenceInQuarter };
      socialStudiesConsolidated.push(fixed);
      return fixed;
    });
    if (socialStudiesConsolidated.length > 0) {
      await Promise.all(socialStudiesConsolidated.map((r) => updateKhanAcademyAssignmentRecord(r.id, r)));
    }

    // ELA repair after the Aug 6 Writing->Reading merge (Aug 7, 2026).
    // See the patch script in _to_delete/ela-build for the full reasoning.
    //
    // (a) RETIRED SUBJECT IDS. The v21 Dexie upgrade retags 'writing' to
    // 'reading', but a Dexie upgrade fires once and never again - rows
    // written after it stayed stranded, and the Khan card renders an
    // unrecognised subject as its own group headed with the raw id. That is
    // the lowercase "writing" card the parent screenshotted. canonicalSubject()
    // was written during the merge for precisely this and had never been
    // called anywhere in the app. Running it here, every hydrate, is what the
    // one-shot upgrade could not be. Once retagged these collide with the
    // seeded copies on (subject, skillTitle, batchLabel) and the
    // de-duplication safeguard further down collapses them, keeping any
    // completed or graded copy.
    const retagged = [];
    khanAcademyAssignments = khanAcademyAssignments.map((a) => {
      const canonical = canonicalSubject(a.subject);
      if (canonical === a.subject) return a;
      const fixed = { ...a, subject: canonical };
      retagged.push(fixed);
      return fixed;
    });
    if (retagged.length > 0) {
      await Promise.all(retagged.map((r) => updateKhanAcademyAssignmentRecord(r.id, r)));
    }

    /**
     * ==================================================================
     * (a2) Q1 GRAMMAR, PLACED AND NAMED FROM THE URL — NOT THE TITLE.
     * (Aug 9, 2026.)
     * ==================================================================
     *
     * The order fix earlier today keyed on `skillTitle`. The parent then
     * said of the verb unit: "it looks like it was already renamed."
     * Nothing in the code renames it — but a title can differ from the
     * seed for reasons the code cannot see: a database written by an
     * older build, a row that arrived in an import from the other
     * computer, a hand edit. And a title-keyed map SILENTLY SKIPS a row
     * wearing any other name, so the fix would have appeared to ship and
     * changed nothing at all. That is the worst kind of failure: the one
     * that reports success.
     *
     * So the ten grammar units are matched on their Khan URL. A URL
     * cannot drift, because it IS the page he opens — a row pointing at
     * `/humanities/grammar/parts-of-speech-the-verb` is unit 2 whatever
     * anybody has called it.
     *
     * This pass does three things at once, all idempotent:
     *
     *   1. Places each unit at its Khan unit number in Q1.
     *   2. Renames it to Khan's own title. One name for the row and the
     *      page, which is what stops this confusion recurring — the verb
     *      unit was mis-filed in the first place precisely because "Verb
     *      tenses, including the perfect tenses" does not read like a
     *      Grammar-course unit.
     *   3. Leaves grade, completion and everything else untouched.
     *
     * The rename is safe for the two-computer merge, which matches on
     * `subject|skillTitle|batchLabel`, BECAUSE it is deterministic and
     * runs in hydrate on both machines: they converge on the same name
     * before any export between them. The de-duplication pass further
     * down then collapses any pair that had been living under two names,
     * preferring a completed copy.
     */
    const grammarFixed = [];
    khanAcademyAssignments = khanAcademyAssignments.map((a) => {
      if (a.subject !== 'reading') return a;
      // Match on the URL first; fall back to a known legacy title for a row
      // whose URL is missing or was edited.
      //
      // ---- THIS MATCHER IS NARROW ON PURPOSE. (Fixed Aug 28, 2026.) ----
      //
      // It used to call `khanGrammarUnitByUrl`, which answers "is this grammar
      // at all" across every grammar course. This pass then stamps whatever it
      // matches into Q1 — see `batchLabel` below, which is hardcoded and
      // correct ONLY for the general course. When the wide matcher was handed
      // to it on Aug 25, all ten grade 7-8 rows were dragged out of Q2-Q4 into
      // Q1 on every app start, renamed, and numbered on top of the general
      // course's own units. He was handed "Nouns" instead of Khan unit 8.
      //
      // `generalGrammarUnitByUrl` matches the ten units of /humanities/grammar
      // and nothing else. Widening it moves units between quarters.
      const unit =
        generalGrammarUnitByUrl(a.khanAcademyUrl) ||
        KHAN_GRAMMAR_UNITS.find((u) => u.khanTitle === LEGACY_GRAMMAR_TITLES[a.skillTitle]) ||
        null;
      if (!unit) return a;
      const target = {
        skillTitle: unit.khanTitle,
        batchLabel: 'Q1 2026-2027',
        sequenceInQuarter: unit.unit
      };
      if (
        a.skillTitle === target.skillTitle &&
        a.batchLabel === target.batchLabel &&
        a.sequenceInQuarter === target.sequenceInQuarter
      ) {
        return a;
      }
      const fixed = { ...a, ...target };
      grammarFixed.push(fixed);
      return fixed;
    });
    if (grammarFixed.length > 0) {
      await Promise.all(grammarFixed.map((r) => updateKhanAcademyAssignmentRecord(r.id, r)));
    }

    // (b) THE 4th-GRADE UNIT, removed at the parent's instruction - it sat in
    // Q3 three grades below everything around it. Only uncompleted copies are
    // deleted; a finished one stays in his records.
    const elaDroppedIds = khanAcademyAssignments
      .filter((a) => a.subject === 'reading' && a.skillTitle === 'Vocabulary (4th grade course)' && !a.completed)
      .map((a) => a.id);
    if (elaDroppedIds.length > 0) {
      await Promise.all(elaDroppedIds.map((id) => deleteKhanAcademyAssignmentRecord(id)));
      khanAcademyAssignments = khanAcademyAssignments.filter((a) => !elaDroppedIds.includes(a.id));
    }

    // (c) SEQUENCE + GRADE REPAIR. Reading and writing were numbered
    // independently, so the merge left two lessons at position 1, two at 2,
    // and so on - and "today's lesson" is the first unfinished row in
    // sequence order, so which of each pair he got was arbitrary. This map is
    // GENERATED from the seed arrays above by the same code that numbers
    // them, so the two can never drift. Ordering rule: ascending grade level;
    // equal grades alternate reading with language so both strands run
    // through the quarter; Course Challenge last. Idempotent - a row already
    // correct is untouched.
    const elaSequenceMap = {
      // Q1 grammar runs in KHAN'S OWN COURSE ORDER as of Aug 9, 2026 — the
      // verb is unit 2, not slot 10. These numbers must match elaPlacementMap
      // below exactly; if the two disagree they rewrite each other on every
      // startup and the quarter never settles. Source of truth:
      // data/khan/grammarCourseOrder.js.
      'Parts of speech: the noun': { batchLabel: 'Q1 2026-2027', sequenceInQuarter: 1, gradeLevel: '5th' },
      'Parts of speech: the verb': { batchLabel: 'Q1 2026-2027', sequenceInQuarter: 2, gradeLevel: '5th' },
      'Verb tenses, including the perfect tenses': { batchLabel: 'Q1 2026-2027', sequenceInQuarter: 2, gradeLevel: '5th' },
      'Parts of speech: the pronoun': { batchLabel: 'Q1 2026-2027', sequenceInQuarter: 3, gradeLevel: '5th' },
      'Parts of speech: the modifier': { batchLabel: 'Q1 2026-2027', sequenceInQuarter: 4, gradeLevel: '5th' },
      'Parts of speech: the preposition and the conjunction': { batchLabel: 'Q1 2026-2027', sequenceInQuarter: 5, gradeLevel: '5th' },
      'Punctuation: the comma and the apostrophe': { batchLabel: 'Q1 2026-2027', sequenceInQuarter: 6, gradeLevel: '5th' },
      'Punctuation: the colon, semicolon, and more': { batchLabel: 'Q1 2026-2027', sequenceInQuarter: 7, gradeLevel: '5th' },
      'Syntax: sentences and clauses': { batchLabel: 'Q1 2026-2027', sequenceInQuarter: 8, gradeLevel: '5th' },
      'Syntax: conventions of standard English': { batchLabel: 'Q1 2026-2027', sequenceInQuarter: 9, gradeLevel: '5th' },
      'Usage and style': { batchLabel: 'Q1 2026-2027', sequenceInQuarter: 10, gradeLevel: '5th' },
      'Roots, prefixes, and suffixes': { batchLabel: 'Q1 2026-2027', sequenceInQuarter: 11, gradeLevel: '5th' },
      // Removed from the year by the Aug 7 placement (vocabulary is his
      // STRONGEST strand); kept here only so a stale copy still gets parked
      // somewhere sane before the pull step deletes it.
      'Vocabulary (5th grade course)': { batchLabel: 'Q1 2026-2027', sequenceInQuarter: 12, gradeLevel: '5th' },
      // The same three rows were also listed here at Q1 11-13. Removed for the
      // same reason: ELA_PLACEMENT_MAP puts them in Q2, this pass defers to
      // it, and a Q1 number here only misleads whoever reads it next.
      'Uncovering Meaning: Context Clues, Word Choice, and Author\'s Purpose': { batchLabel: 'Q1 2026-2027', sequenceInQuarter: 14, gradeLevel: '7th' },
      'Blazing New Trails (thematic reading unit)': { batchLabel: 'Q1 2026-2027', sequenceInQuarter: 15, gradeLevel: '7th' },
      'Mysteries (thematic reading unit)': { batchLabel: 'Q1 2026-2027', sequenceInQuarter: 16, gradeLevel: '7th' },
      'Vocabulary (7th grade course)': { batchLabel: 'Q1 2026-2027', sequenceInQuarter: 17, gradeLevel: '7th' },
      'Living Tongues (thematic reading unit)': { batchLabel: 'Q1 2026-2027', sequenceInQuarter: 18, gradeLevel: '7th' },
      'Mysteries: Long Passage Practice': { batchLabel: 'Q1 2026-2027', sequenceInQuarter: 19, gradeLevel: '7th' },
      'Blazing New Trails: Long Passage Practice': { batchLabel: 'Q1 2026-2027', sequenceInQuarter: 20, gradeLevel: '7th' },
      'Uncovering Meaning: Long Passage Practice': { batchLabel: 'Q1 2026-2027', sequenceInQuarter: 21, gradeLevel: '7th' },
      'Vocabulary (6th grade course)': { batchLabel: 'Q2 2026-2027', sequenceInQuarter: 1, gradeLevel: '6th' },
      'Trailblazing Women (distinct course version)': { batchLabel: 'Q2 2026-2027', sequenceInQuarter: 2, gradeLevel: '7th' },
      'Mysteries of the Past (thematic reading unit)': { batchLabel: 'Q2 2026-2027', sequenceInQuarter: 3, gradeLevel: '7th' },
      'Mysteries of the Past: unit vocabulary': { batchLabel: 'Q2 2026-2027', sequenceInQuarter: 4, gradeLevel: '7th' },
      'The Mind at Play (8th grade thematic unit)': { batchLabel: 'Q2 2026-2027', sequenceInQuarter: 5, gradeLevel: '8th' },
      'To Your Health (8th grade thematic unit)': { batchLabel: 'Q2 2026-2027', sequenceInQuarter: 6, gradeLevel: '8th' },
      'Craft and Structure: Long Passage Practice (8th grade)': { batchLabel: 'Q2 2026-2027', sequenceInQuarter: 7, gradeLevel: '8th' },
      'Obscuring the Truth (8th grade thematic unit)': { batchLabel: 'Q2 2026-2027', sequenceInQuarter: 8, gradeLevel: '8th' },
      'Obscuring the Truth: unit vocabulary': { batchLabel: 'Q2 2026-2027', sequenceInQuarter: 9, gradeLevel: '8th' },
      '7th Grade ELA — Course Challenge': { batchLabel: 'Q2 2026-2027', sequenceInQuarter: 99, gradeLevel: '7th' },
      'Vocabulary (8th grade course)': { batchLabel: 'Q3 2026-2027', sequenceInQuarter: 1, gradeLevel: '8th' },
      'The World Beneath (8th grade thematic unit)': { batchLabel: 'Q3 2026-2027', sequenceInQuarter: 2, gradeLevel: '8th' },
      'Crossing the Line (8th grade thematic unit)': { batchLabel: 'Q3 2026-2027', sequenceInQuarter: 3, gradeLevel: '8th' },
      'Key Ideas and Details (9th grade skills unit)': { batchLabel: 'Q3 2026-2027', sequenceInQuarter: 4, gradeLevel: '9th' },
      'Bridging the Gap (9th grade thematic unit)': { batchLabel: 'Q3 2026-2027', sequenceInQuarter: 5, gradeLevel: '9th' },
      'Thriving (9th grade thematic unit)': { batchLabel: 'Q3 2026-2027', sequenceInQuarter: 6, gradeLevel: '9th' },
      'Thriving: Long Passage Practice (9th grade)': { batchLabel: 'Q3 2026-2027', sequenceInQuarter: 7, gradeLevel: '9th' },
      'Vocabulary (9th grade course)': { batchLabel: 'Q3 2026-2027', sequenceInQuarter: 8, gradeLevel: '9th' },
      'Social Psychology (9th grade thematic unit)': { batchLabel: 'Q3 2026-2027', sequenceInQuarter: 9, gradeLevel: '9th' },
      'Social Psychology: unit vocabulary': { batchLabel: 'Q3 2026-2027', sequenceInQuarter: 10, gradeLevel: '9th' },
      'The Apocalypse (9th grade thematic unit)': { batchLabel: 'Q3 2026-2027', sequenceInQuarter: 11, gradeLevel: '9th' },
      'Funny Business (8th grade thematic unit)': { batchLabel: 'Q4 2026-2027', sequenceInQuarter: 1, gradeLevel: '8th' },
      'Funny Business: unit vocabulary': { batchLabel: 'Q4 2026-2027', sequenceInQuarter: 2, gradeLevel: '8th' },
      'The Apocalypse: unit vocabulary': { batchLabel: 'Q4 2026-2027', sequenceInQuarter: 3, gradeLevel: '9th' },
      'Into the Unknown (10th grade thematic unit)': { batchLabel: 'Q4 2026-2027', sequenceInQuarter: 4, gradeLevel: '10th' },
      'Winds of Change (10th grade thematic unit)': { batchLabel: 'Q4 2026-2027', sequenceInQuarter: 5, gradeLevel: '10th' },
      'Ties That Bind (10th grade thematic unit)': { batchLabel: 'Q4 2026-2027', sequenceInQuarter: 6, gradeLevel: '10th' },
      'Vocabulary (10th grade course)': { batchLabel: 'Q4 2026-2027', sequenceInQuarter: 7, gradeLevel: '10th' },
      'Key Ideas and Details: Long Passage Practice (10th grade)': { batchLabel: 'Q4 2026-2027', sequenceInQuarter: 8, gradeLevel: '10th' },
      '8th Grade ELA — Course Challenge': { batchLabel: 'Q4 2026-2027', sequenceInQuarter: 99, gradeLevel: '8th' },
      /**
       * ---- NO KHAN ELA IN SUMMER, AND THE MAP SAYS SO NOW ----
       * (Audit item O-1, Aug 25, 2026.)
       *
       * Seven titles used to be placed here, into 'Summer 2027'. Not one of
       * them is ever created: `readingSummerRows` is `[]` and this map only
       * RE-SEQUENCES rows that already exist. So these were seven instructions
       * about work that does not and will not exist.
       *
       * They are the residue of a plan that was reversed. The current decision
       * is stated in `scienceSequence.js`, which quotes it: **"Summer — 0
       * units. Reserved for summer reading."** Summer ELA is a book he chooses,
       * from the Academic Center's free-choice Reading Assignment, not a Khan
       * roster.
       *
       * Deleted rather than commented out. A map entry that can never fire is
       * worse than no entry: the next person to read this file has no way to
       * tell it apart from the ones that run, and would price a whole quarter's
       * ELA against work nobody is going to do.
       */
    };
    const elaResequenced = [];
    khanAcademyAssignments = khanAcademyAssignments.map((a) => {
      if (a.subject !== 'reading') return a;
      // Same rule as the pass above: the placement map is the authority, so a
      // row it owns is left alone here rather than written twice.
      if (ELA_PLACEMENT_MAP[a.skillTitle]) return a;
      const t = elaSequenceMap[a.skillTitle];
      if (!t) return a;
      if (a.batchLabel === t.batchLabel && a.sequenceInQuarter === t.sequenceInQuarter && a.gradeLevel === t.gradeLevel) return a;
      const fixed = { ...a, batchLabel: t.batchLabel, sequenceInQuarter: t.sequenceInQuarter, gradeLevel: t.gradeLevel };
      elaResequenced.push(fixed);
      return fixed;
    });
    if (elaResequenced.length > 0) {
      await Promise.all(elaResequenced.map((r) => updateKhanAcademyAssignmentRecord(r.id, r)));
    }

    // ELA re-placement from the Aug 7, 2026 IXL diagnostic. Q1 is grammar
    // catch-up (his weakest strand, 440-500, and both of IXL's recommended
    // skills sit in slots 10 and 11). Q2-Q4 run 7th then 8th. Summer carries
    // no Khan units - the parent is using it for summer reading and book
    // reports. Everything 9th and 10th grade is deferred to next school year;
    // the 5th- and 6th-grade Vocabulary courses are removed because vocabulary
    // is his STRONGEST strand and they were aimed at the wrong weakness.
    //
    // Idempotent, like every repair in this function: a row already at its
    // target is untouched. Grades and completion ride along - re-placing a
    // unit must never cost him credit for work already done.
    const elaPlacementMap = ELA_PLACEMENT_MAP;
    const elaPlaced = [];
    khanAcademyAssignments = khanAcademyAssignments.map((a) => {
      if (a.subject !== 'reading') return a;
      const t = elaPlacementMap[a.skillTitle];
      if (!t) return a;
      if (a.batchLabel === t.batchLabel && a.sequenceInQuarter === t.sequenceInQuarter) return a;
      const fixed = { ...a, batchLabel: t.batchLabel, sequenceInQuarter: t.sequenceInQuarter };
      elaPlaced.push(fixed);
      return fixed;
    });
    if (elaPlaced.length > 0) {
      await Promise.all(elaPlaced.map((r) => updateKhanAcademyAssignmentRecord(r.id, r)));
    }

    // Pulled out of this school year. Only rows he has NOT completed are
    // deleted - anything finished stays in his records and on his report card.
    const elaPulledTitles = [
      'Vocabulary (5th grade course)',
      'Vocabulary (6th grade course)',
      'Key Ideas and Details (9th grade skills unit)',
      'Bridging the Gap (9th grade thematic unit)',
      'Thriving (9th grade thematic unit)',
      'Thriving: Long Passage Practice (9th grade)',
      'Vocabulary (9th grade course)',
      'Social Psychology (9th grade thematic unit)',
      'Social Psychology: unit vocabulary',
      'The Apocalypse (9th grade thematic unit)',
      'The Apocalypse: unit vocabulary',
      'Into the Unknown (10th grade thematic unit)',
      'Winds of Change (10th grade thematic unit)',
      'Ties That Bind (10th grade thematic unit)',
      'Vocabulary (10th grade course)',
      'Key Ideas and Details: Long Passage Practice (10th grade)',
      'Borders (9th grade thematic unit)',
      'Borders: unit vocabulary',
      'Into the Unknown: Long Passage Practice (10th grade)',
      'Winds of Change: Long Passage Practice (10th grade)',
      'Ties That Bind: Long Passage Practice (10th grade)',
      '9th Grade ELA — Course Challenge',
      '10th Grade ELA — Course Challenge'
    ];
    const elaPulledIds = khanAcademyAssignments
      .filter((a) => a.subject === 'reading' && elaPulledTitles.includes(a.skillTitle) && !a.completed)
      .map((a) => a.id);
    if (elaPulledIds.length > 0) {
      await Promise.all(elaPulledIds.map((id) => deleteKhanAcademyAssignmentRecord(id)));
      khanAcademyAssignments = khanAcademyAssignments.filter((a) => !elaPulledIds.includes(a.id));
    }

    // A pulled unit he ALREADY COMPLETED is kept - it is real work and belongs
    // on his record - but it would otherwise sit at whatever sequence number
    // the old plan gave it and collide with a live unit that now holds that
    // slot. Park those at 90+ so they trail the live work as history without
    // ever being handed to him as 'today's lesson', and without breaking the
    // one-sequence-per-slot invariant the rest of this placement relies on.
    const elaKeptHistory = [];
    let elaHistorySlot = 90;
    for (const a of khanAcademyAssignments) {
      if (a.subject !== 'reading' || !elaPulledTitles.includes(a.skillTitle)) continue;
      if (a.sequenceInQuarter >= 90) continue;
      const fixed = { ...a, sequenceInQuarter: elaHistorySlot++ };
      elaKeptHistory.push(fixed);
    }
    if (elaKeptHistory.length > 0) {
      const byId = new Map(elaKeptHistory.map((r) => [r.id, r]));
      khanAcademyAssignments = khanAcademyAssignments.map((a) => byId.get(a.id) || a);
      await Promise.all(elaKeptHistory.map((r) => updateKhanAcademyAssignmentRecord(r.id, r)));
    }

    /**
     * =====================================================================
     * THE ROSTERS CUT TO THE YEAR THEY ACTUALLY FIT IN. (Aug 29, 2026.)
     * =====================================================================
     *
     * The parent, after counting one Khan unit with me: *"cut the kahn courses
     * to the real numbers."*
     *
     * ---- WHAT WAS WRONG ----
     *
     * Technology carried **twenty** units — three separate Khan courses stacked
     * on one subject that meets twice a week: *Computers and the Internet* (5),
     * *Intro to Python Fundamentals* (7) and the *Computer Programming* track
     * (7). One unit of the first course was measured on 2026-08-29 at 20
     * videos, 10 exercises, 3 quizzes and a unit test — about eight sittings.
     * Twenty of those is roughly four years of Technology.
     *
     * That is why he was skipping the videos and going straight to the unit
     * test: **he was being asked to finish in one session what takes eight.**
     *
     * Social Studies carried World History (9 units + course challenge) AND
     * five US History units on one day a week.
     *
     * ---- WHAT IS KEPT ----
     *
     * Technology: the five units of the course he is in, plus its challenge —
     * a full, complete year at two days a week and one SECTION per session.
     * Social Studies: World History, whole, plus its challenge.
     *
     * Nothing here is deleted from the curriculum for good. Python, the
     * Computer Programming track and US History are next year's, and the rows
     * come back by adding them to a seed array.
     *
     * ---- SCIENCE IS DELIBERATELY UNTOUCHED ----
     *
     * I recommended cutting it to two courses and was wrong twice over. The
     * per-unit cost I used came from the Technology unit and inflated Science
     * about threefold; the repaired `khanUnitDays` model puts all 26 units at
     * 70 days against 144 available. And Chemistry is recorded in
     * `scienceSequence.js` as **the course Lamar asked for**. A roster cut that
     * deletes a course a twelve-year-old chose, to solve a shortage that was an
     * arithmetic error, is the worst thing in this file.
     *
     * ---- ONLY UNCOMPLETED ROWS GO ----
     *
     * The same rule the ELA pull follows: a unit he has finished is real work
     * and stays on his record whatever happens to the plan.
     */
    const KEEP_TECHNOLOGY_COURSE = '/computing/computers-and-internet';
    const rosterPulledIds = khanAcademyAssignments
      .filter((a) => {
        if (a.completed) return false;
        if (a.subject === 'technology') {
          return !String(a.khanAcademyUrl || '').includes(KEEP_TECHNOLOGY_COURSE);
        }
        if (a.subject === 'socialStudies') {
          // World History and its challenge stay; the US History course does not.
          return !/world-history/.test(String(a.khanAcademyUrl || ''));
        }
        return false;
      })
      .map((a) => a.id);
    if (rosterPulledIds.length > 0) {
      await Promise.all(rosterPulledIds.map((id) => deleteKhanAcademyAssignmentRecord(id)));
      khanAcademyAssignments = khanAcademyAssignments.filter((a) => !rosterPulledIds.includes(a.id));
    }

    // Removal — the leftover 6th-grade "Follow directions on a coordinate
    // plane" item is retired from Q1 (Aug 6, 2026, parent's request): the
    // real 5th-grade Coordinate plane unit (U12) now covers coordinate
    // graphing, so this off-grade extra is redundant. Deletes it from
    // already-persisted installs, protecting any completed copy (same guard
    // the retired-science cleanup uses) so a real grade is never lost.
    const coordPlaneRetiredIds = khanAcademyAssignments
      .filter((a) => a.subject === 'math' && a.skillTitle === 'Follow directions on a coordinate plane' && a.batchLabel === 'Q1 2026-2027' && !a.completed)
      .map((a) => a.id);
    if (coordPlaneRetiredIds.length > 0) {
      await Promise.all(coordPlaneRetiredIds.map((id) => deleteKhanAcademyAssignmentRecord(id)));
      khanAcademyAssignments = khanAcademyAssignments.filter((a) => !coordPlaneRetiredIds.includes(a.id));
    }

    // De-duplication safeguard — confirmed by the parent directly (a
    // screenshot showing Language Arts with 4 records for only 2 real
    // lessons, each duplicated) that genuine duplicate records can exist
    // in a real browser's persisted data, likely from having run several
    // different code versions across sessions over time — something this
    // testing environment's always-fresh browser instances never
    // naturally exercised. This runs every hydrate, groups records by
    // (subject, skillTitle, batchLabel), and collapses any group with
    // more than one record down to a single copy — preferring a
    // completed/graded copy if one exists (so real progress is never
    // lost to the cleanup), otherwise the earliest-created copy. Extra
    // copies are actually deleted from the database, not just hidden.
    const groups = {};
    for (const a of khanAcademyAssignments) {
      // Normalise a legacy grammar title to Khan's, so a row that arrived
      // under the old name — from an old backup, or an import taken before the
      // Aug 9 rename — collapses into its twin instead of surviving as a
      // second copy of a unit he may already have finished.
      const title = LEGACY_GRAMMAR_TITLES[a.skillTitle] || a.skillTitle;
      const key = `${a.subject}|${title}|${a.batchLabel}`;
      groups[key] ??= [];
      groups[key].push(a);
    }
    const idsToDelete = [];
    const deduped = [];
    for (const group of Object.values(groups)) {
      if (group.length === 1) {
        deduped.push(group[0]);
        continue;
      }
      const completedCopy = group.find((a) => a.completed);
      const keeper = completedCopy || [...group].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))[0];
      deduped.push(keeper);
      for (const a of group) {
        if (a.id !== keeper.id) idsToDelete.push(a.id);
      }
    }
    if (idsToDelete.length > 0) {
      await Promise.all(idsToDelete.map((id) => deleteKhanAcademyAssignmentRecord(id)));
      khanAcademyAssignments = deduped;
    }

    // ---- Academic Success Center: seed real rows from the static slot
    // definitions, idempotently PER slotId (PROJECT_PLAN.md Part 9).
    //
    // Same shape as the Khan Academy seeding above and for the same
    // reason: the seed file is the source of truth for WHICH slots
    // exist, the Dexie rows are the source of truth for what the parent
    // actually put in them. Checking per-slotId (not "is the table
    // empty?") is what makes it safe to add Aerospace/Science/
    // Technology — or a new quarter — to the seed file later: only the
    // genuinely-new slots get inserted, and a slot she already filled in
    // is never touched, re-seeded, or reset.
    //
    // Seeded rows deliberately start with title: null. Nothing in this
    // app invents a book title or an assignment topic — a slot stays
    // 'empty'/'placeholder' until the parent enters the real one.
    // Daily Khan check-off. 60 days is enough for the streak, the attendance
    // view, and a quarter-to-date glance without loading a year of history.
    const khanDailyRows = await loadKhanDailyLog(
      toDateStr(new Date(Date.now() - 60 * 864e5))
    );
    const khanDailyLog = {};
    for (const r of khanDailyRows) khanDailyLog[r.date] = r.subjects || {};

    /**
     * REPAIR: STRIP ANYTHING THAT IS NOT A SUBJECT TICK. (Aug 23, 2026.)
     *
     * A subject tick is `subjectId -> boolean`. Nothing else belongs in this
     * map. On Aug 23 an import baselined off the wrong shape folded whole rows
     * into it, so days came out holding `date` (a string) and `subjects` (an
     * object) alongside the real flags. `coveredBlockIds` walks every truthy
     * entry here to credit instructional minutes, so junk in this map is junk
     * in the Georgia attendance record.
     *
     * Keeping only boolean-valued keys is the exact test, needs no list of
     * subject ids to fall out of date, and is idempotent — a clean row is
     * rewritten by nothing.
     */
    const khanDailyRepairs = [];
    for (const [date, subjects] of Object.entries(khanDailyLog)) {
      const clean = Object.fromEntries(
        Object.entries(subjects).filter(([, v]) => typeof v === 'boolean')
      );
      if (Object.keys(clean).length === Object.keys(subjects).length) continue;
      khanDailyLog[date] = clean;
      khanDailyRepairs.push({ date, subjects: clean });
    }
    if (khanDailyRepairs.length > 0) {
      await bulkPutKhanDailyLog(khanDailyRepairs);
    }

    // Same 60-day working window and the same reason: enough for the streak,
    // the attendance view and a quarter-to-date glance. Export and import use
    // loadAllMorningMeetings, never this — a backup must hold every row.
    const morningMeetingRows = await loadMorningMeetings(
      toDateStr(new Date(Date.now() - 60 * 864e5))
    );
    const morningMeetings = {};
    for (const r of morningMeetingRows) morningMeetings[r.date] = r;

    let academicBooks = [...academicBookRows];
    const existingBookSlotIds = new Set(academicBooks.map((b) => b.slotId).filter(Boolean));
    const missingBookSeeds = [];
    for (const [subject, slots] of Object.entries(subjectBookPlaceholders)) {
      for (const slot of slots) {
        if (existingBookSlotIds.has(slot.slotId)) continue;
        missingBookSeeds.push({
          subject,
          slotId: slot.slotId,
          type: slot.type,
          // A slot may now ship WITH a real title (parent-approved in chat,
          // Aug 7 2026). Slots without one still seed null and stay 'empty',
          // exactly as before.
          title: slot.title ?? null,
          author: slot.author ?? null,
          note: slot.note,
          blackExcellence: slot.blackExcellence === true,
          rejectedRecommendationIds: [],
          totalUnits: null,
          unit: 'chapters',
          unitsDone: 0,
          favorite: false,
          rating: null,
          status: slot.title ? 'not-started' : 'empty',
          startedAt: null,
          completedAt: null,
          isCustom: false,
          createdAt: new Date().toISOString()
        });
      }
    }
    if (missingBookSeeds.length > 0) {
      const newIds = await Promise.all(missingBookSeeds.map((r) => addAcademicBookRecord(r)));
      academicBooks = [...academicBooks, ...missingBookSeeds.map((r, i) => ({ id: newIds[i], ...r }))];
    }

    // BACKFILL, Aug 7 2026. Her database already holds these slots from an
    // earlier run, with title: null - the seeder above only creates slots that
    // are MISSING, so a newly-supplied title would never reach an existing
    // row. This fills them, and mirrors exactly what updateAcademicBook does
    // when she types a title herself: status follows the title across the
    // empty -> not-started boundary and nothing else changes.
    //
    // Only fills a slot whose title is STILL NULL. Anything she has entered
    // herself is never overwritten.
    const bookBackfill = [];
    for (const [subject, slots] of Object.entries(subjectBookPlaceholders)) {
      for (const slot of slots) {
        if (!slot.title) continue;
        const row = academicBooks.find((b) => b.slotId === slot.slotId);
        if (!row || row.title) continue;
        bookBackfill.push({ ...row, title: slot.title, author: slot.author ?? null, status: row.status === 'empty' ? 'not-started' : row.status });
      }
    }
    if (bookBackfill.length > 0) {
      const byId = new Map(bookBackfill.map((r) => [r.id, r]));
      academicBooks = academicBooks.map((b) => byId.get(b.id) || b);
      await Promise.all(bookBackfill.map((r) => updateAcademicBookRecord(r.id, r)));
    }

    let academicAssignments = [...academicAssignmentRows];

    /**
     * Slots dropped from the curriculum AFTER they had already been seeded.
     *
     * Removing a slot from placeholders.js only stops it being seeded again.
     * A row already in her database has no other owner — it would sit in the
     * Academic Success Center forever with nothing left in the codebase
     * describing it, which is exactly how the Science orphans happened.
     *
     * asg::aerospace::Q2::2 — *Chasing Space: Young Readers' Edition*,
     * dropped Aug 8, 2026 at the parent's direction. Q2 is the short quarter,
     * seven weeks, and it carried four books; two of them were astronaut
     * memoirs adapted for young readers running at the same time.
     *
     * Only removes a row he has NOT touched. A grade, a completion, recorded
     * milestones, or any status past 'not-started' keeps it — a dropped
     * assignment is never worth deleting real work over.
     */
    const RETIRED_ASSIGNMENT_SLOTS = new Set(['asg::aerospace::Q2::2']);
    const retiredAssignmentIds = academicAssignments
      .filter(
        (a) =>
          RETIRED_ASSIGNMENT_SLOTS.has(a.slotId) &&
          !a.grade &&
          !a.completedAt &&
          !a.gradedAt &&
          !a.startedAt &&
          !a.milestones?.length &&
          (a.status === 'not-started' || a.status === 'placeholder')
      )
      .map((a) => a.id);
    if (retiredAssignmentIds.length > 0) {
      const retiredIdSet = new Set(retiredAssignmentIds);
      academicAssignments = academicAssignments.filter((a) => !retiredIdSet.has(a.id));
      await Promise.all(retiredAssignmentIds.map((id) => deleteAcademicAssignmentRecord(id)));
    }

    const existingAssignmentSlotIds = new Set(academicAssignments.map((a) => a.slotId).filter(Boolean));
    const missingAssignmentSeeds = [];
    for (const [subject, byQuarter] of Object.entries(quarterlyAcademicPlaceholders)) {
      for (const [quarter, slots] of Object.entries(byQuarter)) {
        for (const slot of slots) {
          if (existingAssignmentSlotIds.has(slot.slotId)) continue;
          missingAssignmentSeeds.push({
            subject,
            slotId: slot.slotId,
            quarter,
            type: slot.type,
            title: slot.title ?? null,
            note: slot.note,
            dueDate: null,
            status: slot.title ? 'not-started' : 'placeholder',
            rejectedRecommendationIds: [],
            format: slot.format ?? null,
            rubricScores: {},
            grade: null,
            startedAt: null,
            completedAt: null,
            gradedAt: null,
            isCustom: false,
            createdAt: new Date().toISOString()
          });
        }
      }
    }
    // Same backfill for assignment slots, plus the four Book Report slots that
    // were downgraded to Reading Assignments. The type change is applied only
    // while the slot is still an untouched placeholder - once she has made it
    // real, its type is hers.
    const asgBackfill = [];
    for (const [subject, byQuarter] of Object.entries(quarterlyAcademicPlaceholders)) {
      for (const [quarter, slots] of Object.entries(byQuarter)) {
        for (const slot of slots) {
          const row = academicAssignments.find((a) => a.slotId === slot.slotId);
          if (!row) continue;
          const changes = {};
          // A slot that has gained a due date since her rows were created.
          // Only fills an EMPTY dueDate — a date she set herself is hers.
          if (slot.dueDate && !row.dueDate) changes.dueDate = slot.dueDate;
          if (slot.title && !row.title) {
            changes.title = slot.title;
            changes.note = slot.note;
            if (slot.format) changes.format = slot.format;
            if (row.status === 'placeholder') changes.status = 'not-started';
          }
          if (row.status === 'placeholder' && !row.title && row.type !== slot.type) changes.type = slot.type;
          if (Object.keys(changes).length > 0) asgBackfill.push({ ...row, ...changes });
        }
      }
    }
    if (asgBackfill.length > 0) {
      const byId = new Map(asgBackfill.map((r) => [r.id, r]));
      academicAssignments = academicAssignments.map((a) => byId.get(a.id) || a);
      await Promise.all(asgBackfill.map((r) => updateAcademicAssignmentRecord(r.id, r)));
    }

    /**
     * =====================================================================
     * ONE-TIME CORRECTIONS TO ROWS THAT ALREADY EXIST. (Aug 10, 2026.)
     * =====================================================================
     *
     * ---- WHY THE BACKFILL ABOVE WAS NOT ENOUGH ----
     *
     * The backfill fills EMPTY fields only: a due date she never set, a title
     * a placeholder never had. That rule is right — it is what stops a seed
     * change from silently overwriting a date she chose herself. But it also
     * means a seeded value that turns out to be WRONG can never be corrected,
     * because the field is not empty; it is filled with the wrong thing.
     *
     * That bit hard. An audit found four of the five Maths projects carrying a
     * Q1 date while filed under Q2, Q3, Q4 and Summer — so every maths project
     * for the year was due on Sept 16, 2026 — plus two assignments due on a
     * Saturday, and nineteen assignments with no format, which in this app
     * means no required sections, no checklist and NO RUBRIC. All of it was
     * fixed in placeholders.js, all of it verified, and none of it reached the
     * two databases that actually matter. The parent looked at her real screen
     * and the old dates were still there.
     *
     * ---- THE RULE THIS FOLLOWS ----
     *
     * The same rule migrateSavedSchedule uses for her timetable: a value still
     * sitting at exactly what was shipped may be corrected; a value she has
     * changed is HERS and is never touched. So every entry below states what
     * the wrong value WAS, and the correction applies only on an exact match.
     * If she moved a date herself, this walks past it.
     *
     * Formats are only ever ADDED, never replaced — picking a different format
     * is a real editorial choice and this must not undo one.
     */
    const ASSIGNMENT_CORRECTIONS = {
      // --- dates: filed in one quarter, due in another -------------------
      'asg::math::Q1::1':         { fromDueDate: '2026-09-16', dueDate: '2026-10-02', format: 'applied-math' },
      'asg::math::Q2::1':         { fromDueDate: '2026-09-16', dueDate: '2026-11-06', format: 'applied-math' },
      'asg::math::Q3::1':         { fromDueDate: '2026-09-16', dueDate: '2027-02-05', format: 'applied-math' },
      'asg::math::Q4::1':         { fromDueDate: ['2026-09-16', '2027-04-16'], dueDate: '2027-04-30', format: 'applied-math' },
      'asg::math::Summer::1':     { fromDueDate: '2026-09-16', dueDate: '2027-07-09', format: 'applied-math' },
      // --- dates: nine assignments on one day ----------------------------
      'asg::technology::Q1::1':   { fromDueDate: '2026-09-16', dueDate: '2026-09-11', format: 'build' },
      'asg::science::Q1::1':      { fromDueDate: '2026-09-16', dueDate: '2026-09-25', format: 'build' },
      'asg::writing::Q1::1':      { fromDueDate: '2026-09-16', dueDate: '2026-10-23', format: 'writing-sample' },
      // --- dates: outside their own quarter, or inside a school break ----
      //
      // Found Aug 30, 2026 by scripts/verify-assignment-dates.mjs, written
      // after the parent asked why Q1 looked heavier than the other quarters.
      // The rules these break — QUARTER_DUE_WINDOWS and EXCLUDED_RANGES — were
      // already in assignmentRecommendations.js, but only ever governed dates
      // the app SUGGESTED. Hand-written seed dates were never measured.
      //
      // The worst was the aerospace Book Report on 2027-04-02: after Q3 ends
      // and before Q4 begins, so NO quarter's grade would have collected it.
      'asg::aerospace::Q4::3':    { fromDueDate: '2027-04-02', dueDate: '2027-04-23' },
      'asg::aerospace::Q4::1':    { fromDueDate: '2027-05-26', dueDate: '2027-05-21' },
      // --- dates: two research papers due together, and a Saturday -------
      'asg::socialStudies::Q2::1':{ fromDueDate: '2026-12-04', dueDate: '2026-11-13' },
      'asg::socialStudies::Q2::2':{ fromDueDate: '2026-12-18', dueDate: '2026-12-04', format: 'historical-investigation' },
      'asg::socialStudies::Q3::2':{ fromDueDate: '2027-02-13', dueDate: '2027-02-19', format: 'build' },
      'asg::writing::Q3::1':      { fromDueDate: '2027-02-13', dueDate: '2027-03-05', format: 'writing-sample' },
      // --- formats only: the row's date was already right ----------------
      'asg::writing::Q2::1':      { format: 'person-study' },
      'asg::writing::Q4::1':      { fromDueDate: '2027-05-26', dueDate: '2027-05-21', format: 'failure-analysis' },
      'asg::writing::Summer::1':  { format: 'writing-sample' },
      'asg::aerospace::Q1::2':    { format: 'investigation' },
      'asg::aerospace::Summer::2':{ format: 'build' },
      'asg::science::Q2::1':      { fromDueDate: '2026-11-25', dueDate: '2026-12-02', format: 'investigation' },
      'asg::science::Q4::1':      { format: 'investigation' },
      'asg::technology::Q2::1':   { fromDueDate: '2026-11-25', dueDate: '2026-12-02', format: 'investigation' },
      // --- notes that promised a report nothing scheduled ----------------
      'asg::socialStudies::Q1::2': {
        fromNote: 'Historical-analysis report on a world-regional history read',
        note: 'Weekly chapter pacing. The historical analysis is due three weeks after you finish it.'
      },
      'asg::science::Q3::1': {
        fromNote: 'Scientific-review report on a Q3 life-science read',
        note: 'Weekly chapter pacing. The scientific review below is due three weeks after you finish it.'
      },
      'asg::aerospace::Q3::2': {
        fromNote: 'Engineering-analysis or biography report on a Q3 Aerospace read — book and format TBD',
        note: 'Weekly chapter pacing. The engineering analysis is due three weeks after you finish it.'
      }
    };

    const corrected = [];
    for (const row of academicAssignments) {
      const fix = ASSIGNMENT_CORRECTIONS[row.slotId];
      if (!fix) continue;
      const changes = {};
      // A date only moves if it is still sitting on the wrong shipped value.
      // `fromDueDate` may name several wrong values. A row that already took
      // an earlier correction sits on a different date than one that never
      // did, and both are still "untouched by her" — so both must be
      // reachable, or the second fix only lands on half the databases.
      if (fix.dueDate && [].concat(fix.fromDueDate).includes(row.dueDate)) changes.dueDate = fix.dueDate;
      // A note only changes if it is still the misleading shipped text.
      if (fix.note && row.note === fix.fromNote) changes.note = fix.note;
      // A format is only ever added. Never replace one she has chosen.
      if (fix.format && !row.format) changes.format = fix.format;
      if (Object.keys(changes).length > 0) corrected.push({ ...row, ...changes });
    }
    if (corrected.length > 0) {
      const byId = new Map(corrected.map((r) => [r.id, r]));
      academicAssignments = academicAssignments.map((a) => byId.get(a.id) || a);
      await Promise.all(corrected.map((r) => updateAcademicAssignmentRecord(r.id, r)));
    }


    if (missingAssignmentSeeds.length > 0) {
      const newIds = await Promise.all(missingAssignmentSeeds.map((r) => addAcademicAssignmentRecord(r)));
      academicAssignments = [
        ...academicAssignments,
        ...missingAssignmentSeeds.map((r, i) => ({ id: newIds[i], ...r }))
      ];
    }

    // Clean up duplicates the StrictMode race created before the guard
    // above existed. Keyed by slotId, keeping whichever copy carries real
    // work — a title, progress, or milestones — over an untouched one, so
    // cleaning up can never cost the parent something she entered.
    // Custom rows (slotId null) are never touched; they're hers.
    function dedupeBySlot(rows, hasRealWork) {
      const groups = {};
      for (const row of rows) {
        if (!row.slotId) continue;
        (groups[row.slotId] ??= []).push(row);
      }
      const idsToDelete = [];
      const superseded = new Set();
      for (const group of Object.values(groups)) {
        if (group.length === 1) continue;
        const keeper =
          group.find(hasRealWork) || [...group].sort((a, b) => (a.id ?? 0) - (b.id ?? 0))[0];
        for (const row of group) {
          if (row.id !== keeper.id) {
            idsToDelete.push(row.id);
            superseded.add(row.id);
          }
        }
      }
      return { idsToDelete, superseded };
    }

    const bookDupes = dedupeBySlot(academicBooks, (b) => Boolean(b.title));
    if (bookDupes.idsToDelete.length > 0) {
      academicBooks = academicBooks.filter((b) => !bookDupes.superseded.has(b.id));
      await Promise.all(bookDupes.idsToDelete.map((id) => deleteAcademicBookRecord(id)));
    }

    const assignmentDupes = dedupeBySlot(
      academicAssignments,
      (a) => Boolean(a.title) || a.status !== 'placeholder' || a.milestones?.length
    );
    if (assignmentDupes.idsToDelete.length > 0) {
      academicAssignments = academicAssignments.filter((a) => !assignmentDupes.superseded.has(a.id));
      await Promise.all(assignmentDupes.idsToDelete.map((id) => deleteAcademicAssignmentRecord(id)));
    }

    /**
     * Evidence folder links — static seed plus persisted override, the
     * same pattern as books, assignments and Khan Academy work above.
     *
     * The eight Drive folders were created in the parent's own Drive at
     * her request, so the seed makes the feature work on first open
     * instead of showing her eight empty boxes to fill in by hand. Seeded
     * per key and only when that key is absent, so it is idempotent and
     * an edit she makes is never overwritten on the next load.
     *
     * A row whose url is explicitly null counts as present: that is how
     * "I cleared this link on purpose" is distinguished from "never
     * seeded", and without it a cleared link would silently come back.
     */
    const evidenceLinks = {};
    for (const row of evidenceLinkRows) evidenceLinks[row.key] = row.url ?? null;
    const missingFolderKeys = EVIDENCE_FOLDER_KEYS.filter(
      (key) => !Object.prototype.hasOwnProperty.call(evidenceLinks, key) && SEEDED_FOLDER_URLS[key]
    );
    if (missingFolderKeys.length > 0) {
      await Promise.all(
        missingFolderKeys.map((key) => {
          evidenceLinks[key] = SEEDED_FOLDER_URLS[key];
          return saveEvidenceLinkRecord(key, SEEDED_FOLDER_URLS[key]);
        })
      );
    }

    // Default real-world rewards (Part 5) — seeded ONCE, at the parent's
    // request (Aug 6, 2026), so her Rewards Manager and his store start
    // populated instead of empty. Idempotent via a meta flag, NOT by name:
    // once seeded, deleting a reward keeps it gone rather than having it
    // reappear on the next load. She can edit/delete/add freely afterward.
    let rewardsList = [...rewardRows];
    /**
     * ONE-TIME ECONOMY MIGRATION (Part 10).
     *
     * Before this, coins were `floor(xp / 5) - coinsSpent` with coinsSpent a
     * single stored number. Two things have to carry across without loss:
     *
     *   1. Anything already SPENT stays spent. It becomes one opening entry
     *      rather than being silently forgiven.
     *   2. Credits start with the opening grant (xp/50, capped 100, floor 25),
     *      so the real-world half of the store is not a wall of grey on day
     *      one — which would be a poor first five minutes for the feature
     *      meant to carry six years.
     *
     * Guarded by a meta flag, so it runs exactly once per machine and a second
     * hydrate never re-grants. Deliberately runs BEFORE any balance is read.
     *
     * Note on the coin rate: earning moves from 1-per-5-XP to 1-per-2-XP here.
     * That is applied to total XP rather than split at a cutover, which is a
     * simplification worth naming — it is harmless because this ships with the
     * student at effectively zero XP, so there is no historical windfall to
     * create. Had this run mid-year it would have needed a cutover entry.
     */
    let ledger = [...(ledgerRows || [])];
    if (!meta?.economyMigratedAt) {
      const openingEntries = [];
      const legacySpent = Number(meta?.coinsSpent) || 0;
      if (legacySpent > 0) {
        openingEntries.push(
          makeEntry({
            currency: 'coin',
            amount: -legacySpent,
            kind: 'opening',
            source: 'migration',
            note: 'Coins spent before the Marketplace opened'
          })
        );
      }
      const opening = openingCredits(xp);
      openingEntries.push(
        makeEntry({
          currency: 'credit',
          amount: opening,
          kind: 'opening',
          source: 'migration',
          note: 'Credit for work completed before the Marketplace opened'
        })
      );
      if (openingEntries.length) {
        await addLedgerEntries(openingEntries);
        ledger = mergeLedgers(ledger, openingEntries);
      }
      await saveMeta({ economyMigratedAt: new Date().toISOString() });
    }

    if (!meta?.defaultRewardsSeeded) {
      const rewardCreatedAt = new Date().toISOString();
      const toAdd = DEFAULT_REWARDS.filter((d) => !rewardRows.some((r) => r.name === d.name));
      const prepared = toAdd.map((d) => ({ name: d.name, cost: d.cost, note: d.note || '', active: true, createdAt: rewardCreatedAt }));
      const ids = await Promise.all(prepared.map((r) => addRewardRecord(r)));
      rewardsList = [...rewardRows, ...prepared.map((r, i) => ({ id: ids[i], ...r }))];
      await saveMeta({ defaultRewardsSeeded: true });
    }

    /**
     * ================================================================
     * THE STORE STARTS CHARGING THE PRICES THAT WERE DESIGNED
     * (Aug 9, 2026 — audit finding 1)
     * ================================================================
     *
     * `data/rewardCatalog.js` held the approved, ladder-priced, tested
     * catalog and NO COMPONENT IMPORTED IT. The store the student saw was
     * this `rewards` table, seeded on Aug 6 at coin-era prices and then
     * charged in Credits. Museum day cost 250 instead of 1,500. Three
     * items involving real money or the car sat under the 100-Credit
     * auto-approve line and cleared without her.
     *
     * A one-time migration, not a re-seed, and the difference matters:
     *
     *   - Rows are matched by NAME against SEEDED_REWARD_LADDER_MAP, so
     *     only the Aug 6 seeds are touched. Anything she typed herself is
     *     hers and is left exactly as it is.
     *   - A row whose price she has edited is skipped and left alone. Her
     *     price beats the ladder — she is the one who pays for these.
     *   - Rows she DELETED are not resurrected. Only catalog items that
     *     were never in the Aug 6 seed get added, because those are the
     *     only ones she has not already had the chance to say no to.
     *
     * Bump LADDER_MIGRATION_VERSION only for a deliberate future
     * re-pricing; on any given machine this runs once.
     */
    const LADDER_MIGRATION_VERSION = 1;
    if ((meta?.rewardsLadderVersion || 0) < LADDER_MIGRATION_VERSION) {
      const now = new Date().toISOString();
      const catalogRows = catalogRewardRows();
      const catalogById = new Map(catalogRows.map((r) => [r.catalogId, r]));
      const working = rewardsList.map((r) => ({ ...r }));
      const writes = [];

      // (1) Re-price the Aug 6 seeds onto the ladder.
      for (const row of working) {
        const catalogId = row.catalogId || SEEDED_REWARD_LADDER_MAP[row.name];
        if (!catalogId) continue; // her own reward — never touched
        const target = catalogById.get(catalogId);
        if (!target) continue;
        if (row.priceEditedByParent) {
          // Her price stands. Still tag the row so the Rewards Manager can
          // show it against the ladder and offer to snap it if she wants.
          if (row.catalogId === catalogId && row.tier === target.tier) continue;
          const tagged = { ...row, catalogId, tier: target.tier, kind: target.kind, requiresParent: target.requiresParent, updatedAt: now, syncId: row.syncId || newSyncId() };
          Object.assign(row, tagged);
          writes.push(updateRewardRecord(row.id, tagged));
          continue;
        }
        const repriced = {
          ...row,
          catalogId,
          cost: target.cost,
          tier: target.tier,
          kind: target.kind,
          requiresParent: target.requiresParent,
          note: row.note || target.note,
          updatedAt: now,
          syncId: row.syncId || newSyncId()
        };
        if (repriced.cost === row.cost && row.catalogId === catalogId) continue;
        Object.assign(row, repriced);
        writes.push(updateRewardRecord(row.id, repriced));
      }

      // (2) Add the catalog items that were never in the Aug 6 seed, so the
      // store finally holds the whole designed catalogue — including the
      // eight Dream Rewards, which existed only in a file until today.
      const seededCatalogIds = new Set(Object.values(SEEDED_REWARD_LADDER_MAP));
      const presentCatalogIds = new Set(working.map((r) => r.catalogId).filter(Boolean));
      const presentNames = new Set(working.map((r) => r.name));
      const missing = catalogRows.filter(
        (c) => !seededCatalogIds.has(c.catalogId) && !presentCatalogIds.has(c.catalogId) && !presentNames.has(c.name)
      );
      if (missing.length) {
        const prepared = missing.map((c) => ({
          name: c.name,
          cost: c.cost,
          note: c.note || '',
          active: true,
          createdAt: now,
          catalogId: c.catalogId,
          tier: c.tier,
          kind: c.kind,
          icon: c.icon || null,
          requiresParent: c.requiresParent,
          syncId: newSyncId(),
          updatedAt: now
        }));
        const ids = await Promise.all(prepared.map((r) => addRewardRecord(r)));
        working.push(...prepared.map((r, i) => ({ id: ids[i], ...r })));
      }

      await Promise.all(writes);
      rewardsList = working;
      await saveMeta({ rewardsLadderVersion: LADDER_MIGRATION_VERSION, rewardsLadderMigratedAt: now });
    }

    // Default Georgia field trips (Part 5) — from real research (Aug 6, 2026,
    // parent's request): SNAP EBT / Museums for All, free library Experience
    // Passes, homeschool rates, and free venues, travel times from her home in
    // Ellenwood, GA. VERSIONED seed: bumping FIELD_TRIP_SEED_VERSION applies new
    // content to installs that already seeded an earlier version. Each pass, in
    // order: (0) RENAME/RETARGET the old generic library trips to the real,
    // dated library programs (v3); (a) add any default trips still missing by
    // destination; (b) backfill a suggested date onto a default-matching trip
    // whose date is still blank. Her manual reschedules, cancellations, and
    // completed trips are never touched, and deleting a default trip still
    // sticks within the same version.
    const FIELD_TRIP_SEED_VERSION = 4;
    // v3: the three original generic library trips are retargeted to real
    // Clayton County Library programs (from the library's own brochure). Maps
    // old destination → new default destination; the rest of the new content is
    // pulled from DEFAULT_FIELD_TRIPS so there is a single source of truth.
    // LIBRARY_TRIP_RENAMES now lives in lib/fieldTrips.js beside the sync-id
    // builder that has to resolve it. It was declared here and used only here
    // until Aug 28, when the merge key started needing the same map — and a
    // rename map that exists in two places is how the two copies disagree.
    let fieldTripsList = [...fieldTripRows];
    if ((meta?.defaultFieldTripsSeedVersion || 0) < FIELD_TRIP_SEED_VERSION) {
      const ftCreatedAt = new Date().toISOString();
      const firstSeed = !meta?.defaultFieldTripsSeeded;
      const defByDest = new Map(DEFAULT_FIELD_TRIPS.map((d) => [d.destination, d]));

      // Working copy we mutate as we migrate, so later steps see current state.
      let workingRows = fieldTripRows.map((t) => ({ ...t }));

      // (0) Rename/retarget old generic library trips → real dated programs.
      // Only touches trips the parent hasn't completed; overwrites the generic
      // date/notes with the real event's date, time, and details.
      for (const [oldDest, newDest] of Object.entries(LIBRARY_TRIP_RENAMES)) {
        const def = defByDest.get(newDest);
        if (!def) continue;
        const row = workingRows.find((t) => t.destination === oldDest && t.status !== 'completed');
        if (!row) continue;
        const patch = {
          destination: def.destination,
          date: def.date || '',
          time: def.time || '',
          cost: Number(def.cost) || 0,
          travelTimeMin: Number(def.travelTimeMin) || 0,
          subjects: Array.isArray(def.subjects) ? def.subjects : [],
          notes: def.notes || ''
        };
        await updateFieldTripRecord(row.id, patch);
        Object.assign(row, patch);
      }

      // (a) Add default trips that aren't in the planner yet (matched by name).
      // Runs against the post-rename rows so retargeted trips aren't duplicated.
      const toAdd = DEFAULT_FIELD_TRIPS.filter((d) => !workingRows.some((t) => t.destination === d.destination));
      const prepared = toAdd.map((d) => ({
        destination: d.destination,
        date: d.date || '',
        time: d.time || '',
        cost: Number(d.cost) || 0,
        travelTimeMin: Number(d.travelTimeMin) || 0,
        subjects: Array.isArray(d.subjects) ? d.subjects : [],
        gradeLevel: d.gradeLevel || '7th',
        notes: d.notes || '',
        hours: 0,
        status: 'planned',
        learningPack: null,
        portfolioEntryId: null,
        completedAt: null,
        createdAt: ftCreatedAt,
        // The stable merge key. Without it the import fell back to
        // destination|date, and both of those get rewritten by the seeder
        // itself — which is how the same trip ended up listed twice.
        syncId: fieldTripSyncId(d.destination)
      }));
      const ftIds = await Promise.all(prepared.map((r) => addFieldTripRecord(r)));
      const added = prepared.map((r, i) => ({ id: ftIds[i], ...r }));

      // (b) Backfill the suggested date onto an already-seeded default trip that
      // still has no date and isn't completed. Only runs when upgrading an
      // existing seed (not the very first seed, where (a) already set dates).
      const dateByDest = new Map(DEFAULT_FIELD_TRIPS.map((d) => [d.destination, d.date || '']));
      if (!firstSeed) {
        for (const t of workingRows) {
          const wantDate = dateByDest.get(t.destination);
          if (wantDate && !(t.date || '').trim() && t.status !== 'completed') {
            await updateFieldTripRecord(t.id, { date: wantDate });
            t.date = wantDate;
          }
        }
      }

      fieldTripsList = [...workingRows, ...added];
      await saveMeta({ defaultFieldTripsSeeded: true, defaultFieldTripsSeedVersion: FIELD_TRIP_SEED_VERSION });
    }

    /**
     * ==================================================================
     * THE REPEATED FIELD TRIPS. (Aug 28, 2026.)
     * ==================================================================
     *
     * The parent: *"there are multiple repeat field trips listed."*
     *
     * Runs on EVERY hydrate, not just a seed-version bump, because the
     * duplicates arrive through the import — which can happen any day.
     *
     * ---- WHY THE FIRST ATTEMPT DID NOTHING (Aug 29) ----
     *
     * *"the field trip planer is worse than before."*
     *
     * Yesterday's version only filled in a syncId that was MISSING. Her rows
     * are not missing one — all 85 carry a stale one (21 in the old
     * `destination|date` form, 63 random UUIDs from the import). So every row
     * was skipped, the four copies of a trip stayed in four different groups,
     * and not one duplicate collapsed. **A derived key is not an identity:**
     * only an id already in canonical `ft::` form is preserved.
     *
     * The whole plan is computed by `planFieldTripDedupe`, which is pure and
     * tested against the real shape of her export. It never deletes a row
     * carrying work, and never deletes a second visit she planned to the same
     * place on a different date.
     */
    {
      const plan = planFieldTripDedupe(fieldTripsList);
      if (plan.idWrites.length > 0) {
        const byId = new Map(fieldTripsList.map((t) => [t.id, t]));
        await Promise.all(plan.idWrites.map((w) => updateFieldTripRecord(w.id, { syncId: w.syncId })));
        for (const w of plan.idWrites) {
          const row = byId.get(w.id);
          if (row) row.syncId = w.syncId;
        }
      }
      if (plan.dropIds.length > 0) {
        const drop = new Set(plan.dropIds);
        await Promise.all([...drop].map((id) => deleteFieldTripRecord(id)));
        fieldTripsList = fieldTripsList.filter((t) => !drop.has(t.id));
      }
    }

    /**
     * ==================================================================
     * BACKFILL: A LETTER GRADE THAT NEVER GOT ITS PERCENTAGE.
     * ==================================================================
     *
     * ---- WHY THIS RUNS EVERY HYDRATE (Aug 23, 2026) ----
     *
     * Until today `gradeWritingEntry` wrote `gradePercent: null`. That is the
     * Mission Control Board's grading path — the Sunday screen built so she
     * could clear a week of his writing in one sitting — and `writingGraded`
     * in the report card counts only rows carrying a finite percentage. So
     * every grade she entered there reached no average, no transcript and no
     * records packet.
     *
     * Fixing the writer only fixes what happens NEXT. The rows already on
     * disk still hold a letter and no number, and would stay uncounted
     * forever. Her machine has one; his may have more.
     *
     * A Dexie `.upgrade()` would fire once and never again — and that is
     * exactly the failure this file already documents for the v21 subject
     * retag: "a Dexie upgrade fires once and never again - rows written after
     * it stayed stranded." His computer runs an older build for days at a
     * time by design (that is what the build stamp is for), so a machine
     * still on the old code will keep producing these and they will arrive
     * here by import. Running the repair on every hydrate is what a one-shot
     * migration could not be.
     *
     * IT ONLY EVER FILLS A HOLE. A row with a percentage is untouched, a row
     * with no letter is untouched, and an unrecognised letter is left alone
     * rather than guessed at. So it is idempotent, and it can never overwrite
     * a rubric score she actually chose.
     */
    const writingPercentBackfill = [];
    const writingEntriesRepaired = writingEntries.map((entry) => {
      if (!entry?.grade || Number.isFinite(entry.gradePercent)) return entry;
      const gradePercent = letterToPercent(entry.grade);
      if (gradePercent === null) return entry;
      writingPercentBackfill.push({ id: entry.id, gradePercent });
      return { ...entry, gradePercent };
    });
    if (writingPercentBackfill.length > 0) {
      await Promise.all(
        writingPercentBackfill.map((r) => updateWritingEntryRecord(r.id, { gradePercent: r.gradePercent }))
      );
    }

    const nextState = {
      hydrated: true,
      hydrationError: null,
      xp,
      streak,
      longestStreak,
      lastActiveDate,
      lessonProgress,
      writingEntries: writingEntriesRepaired,
      // Tombstoned rows stay in Dexie so the deletion can travel; they
      // are filtered out of everything the UI reads. See the note on the
      // rewards/fieldTrips slices further down.
      selfExplanations: selfExplanationRows.filter((e) => !e.deletedAt),
      weeklyWords,
      scheduleBlocks,
      typingLessonProgress,
      allAttendance,
      parentNotes,
      assignments: assignments.filter((a) => !a.deletedAt),
      readingLog,
      portfolio,
      khanAcademyAssignments,
      khanDailyLog,
      morningMeetings,
      reviewSchedule,
      studyCycles,
      peBodyMetrics: [...peBodyMetricsRows].sort((a, b) => new Date(a.date) - new Date(b.date)),
      peDailyLog,
      peWorkoutLog: [...peWorkoutLogRows].sort((a, b) => new Date(a.date) - new Date(b.date)),
      peWeeklyGoals,
      // Tombstones filtered out from v34 — see the note on readingLog above.
      peMeals: peMealsRows
        .filter((m) => !m.deletedAt)
        .sort((a, b) => new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date)),
      gardenLog: [...gardenLogRows].sort((a, b) => (a.date || '').localeCompare(b.date || '')),
      guitarLog: [...guitarLogRows].sort((a, b) => (a.date || '').localeCompare(b.date || '')),
      typingLog: [...typingLogRows].sort((a, b) => (a.date || '').localeCompare(b.date || '')),
      academicBooks,
      academicAssignments,
      adminRecords: [...adminRecordRows].sort((a, b) => (b.date || '').localeCompare(a.date || '')),
      courseDescriptions: Object.fromEntries(
        courseDescriptionRows.map((r) => [r.subject, { description: r.description, updatedAt: r.updatedAt }])
      ),
      complianceChecks: Object.fromEntries(
        complianceCheckRows.map((r) => [r.key, { done: r.done, completedAt: r.completedAt, note: r.note }])
      ),
      evidenceLinks,
      missionEvaluations: [...missionEvaluationRows],
      // Only the three flags the UI needs. The salt and hashes stay in
      // Dexie and are read on demand by the verify actions, so they
      // never sit in a React store that a component could render.
      parentAuth: {
        configured: Boolean(parentAuthRow?.hash),
        declined: Boolean(parentAuthRow?.declined),
        hint: parentAuthRow?.hint ?? null
      },
      reviewGameCompletions: meta?.reviewGameCompletions ?? {},
      coinsSpent: meta?.coinsSpent ?? 0,
      unlockedCosmetics: meta?.unlockedCosmetics ?? [],
      equippedAvatar: meta?.equippedAvatar ?? null,
      equippedRocket: meta?.equippedRocket ?? null,
      // Added Aug 25 2026 with the theme store — see lib/themes.js.
      equippedTheme: meta?.equippedTheme ?? null,
      boardDensity: meta?.boardDensity === 'compact' ? 'compact' : 'comfortable',
      equippedGear: meta?.equippedGear ?? {},
      hqLayout: meta?.hqLayout ?? {},
      hqCrewPosts: meta?.hqCrewPosts ?? {},
      quizLinks: meta?.quizLinks ?? {},
      exerciseVideos: meta?.exerciseVideos ?? {},
      exerciseVideoSourceId: meta?.exerciseVideoSourceId ?? null,
      exerciseVideosEnabled: meta?.exerciseVideosEnabled !== false,
      /**
       * TOMBSTONES ARE FILTERED HERE, NOT DELETED (v31, Aug 9 2026).
       *
       * A row the parent removed keeps existing in Dexie carrying a
       * `deletedAt`, so the deletion can travel to the other computer
       * and stay deleted. Every screen reads the store, so filtering
       * once here is what makes a soft delete look exactly like a real
       * one everywhere in the UI.
       *
       * A cleared Engineer Readiness award is the same idea wearing a
       * different shape: the row survives with `level: null`, because
       * it also carries the dated Bronze -> Silver -> Gold history that
       * a transcript will want years from now.
       */
      rewards: rewardsList.filter((r) => !r.deletedAt).sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)),
      rewardRedemptions: rewardRedemptionRows
        .filter((r) => !r.deletedAt)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
      readinessAwards: Object.fromEntries(
        readinessAwardRows
          .filter((r) => r.level)
          .map((r) => [r.skillId, { level: r.level, note: r.note, updatedAt: r.updatedAt, history: r.history || [] }])
      ),
      ledger,
      dreamGoals: [...(dreamGoalRows || [])].sort((a, b) => String(a.createdAt).localeCompare(String(b.createdAt))),
      fieldTrips: fieldTripsList
        .filter((t) => !t.deletedAt)
        .sort((a, b) => (a.date || '').localeCompare(b.date || '')),
      messages: [...messageRows].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)),

      supplyCrateEnabled: meta?.supplyCrateEnabled !== false,
      classBellEnabled: meta?.classBellEnabled !== false,
      classBellWarningMinutes: meta?.classBellWarningMinutes ?? 2,

      // Backup bookkeeping — see the initial-state note.
      lastExportAt: meta?.lastExportAt ?? null,
      lastImportAt: meta?.lastImportAt ?? null,
      lastImportedExportAt: meta?.lastImportedExportAt ?? null,
      lastExportBytes: meta?.lastExportBytes ?? null,
      lastExportRowCount: meta?.lastExportRowCount ?? null,

      currentRank: getCurrentRank(xp, totalMastered)
    };
    set(nextState);

    // Persist the (possibly updated) streak/date immediately so a same-day
    // refresh doesn't double-increment on next load.
    await saveMeta({ xp, streak, longestStreak, lastActiveDate, highestRankTier: highWaterRankTier });
  },

  /** Record the result of a completed lesson attempt. */
  async recordLessonResult(lessonId, attemptResult) {
    const state = get();
    const prior = state.lessonProgress[lessonId];
    const bestAccuracy = Math.max(prior?.bestAccuracy ?? 0, attemptResult.accuracy);
    const mastered = Boolean(prior?.mastered) || attemptResult.mastered;
    const attempts = (prior?.attempts ?? 0) + 1;
    const lastCompletedDate = todayStr();

    /**
     * Time on this attempt, in minutes (Learning Analytics, Aug 2026).
     *
     * CAPPED AT 90 MINUTES, and the cap is the point: a lesson left open
     * over lunch would otherwise record two hours of "instruction" and
     * quietly corrupt both the analytics and — because attendance feeds
     * Georgia's 4.5-hour figure — the compliance record. A stale tab is
     * not instruction. Attempts with no duration (older rows, imports)
     * stay undefined rather than becoming a fake zero, so an average
     * over them is honest about what it does not know.
     */
    const DURATION_CAP_MINUTES = 90;
    const attemptMinutes =
      typeof attemptResult.durationMs === 'number' && attemptResult.durationMs > 0
        ? Math.min(DURATION_CAP_MINUTES, Math.round(attemptResult.durationMs / 60000))
        : null;
    const totalMinutes =
      attemptMinutes === null ? prior?.totalMinutes : (prior?.totalMinutes || 0) + attemptMinutes;

    const newProgressEntry = {
      mastered,
      bestAccuracy,
      attempts,
      lastCompletedDate,
      ...(typeof totalMinutes === 'number' ? { totalMinutes } : {}),
      ...(attemptMinutes === null ? {} : { lastAttemptMinutes: attemptMinutes })
    };
    const lessonProgress = { ...state.lessonProgress, [lessonId]: newProgressEntry };

    /**
     * THE MASTERY BONUS IS PAID ONCE PER LESSON. (Fixed Aug 13, 2026.)
     *
     * `mastered` above is sticky — `Boolean(prior?.mastered) || ...` — so the
     * mastery COUNT never moved on a re-attempt. The XP did: scoreLessonAttempt
     * added its 20-point bonus on every scored attempt that cleared 90%, so
     * re-opening a mastered lesson paid it again, and again, with no limit.
     *
     * That is the exact shape of what the parent was looking at — 1,085 XP
     * beside 6 lessons mastered, an XP bar pinned full, and a rank that would
     * not move. Re-practice is worth encouraging and still pays its
     * per-question XP; it just cannot re-sell the same milestone.
     */
    const alreadyMastered = Boolean(prior?.mastered);
    const xpEarned = alreadyMastered
      ? Math.max(0, attemptResult.xpEarned - (attemptResult.masteryBonusXp || 0))
      : attemptResult.xpEarned;
    const xp = state.xp + xpEarned;
    const totalMastered = totalMasteredCount({ lessonProgress, khanAcademyAssignments: state.khanAcademyAssignments });
    const currentRank = getCurrentRank(xp, totalMastered);

    // Real spaced-repetition scheduling (PROJECT_PLAN.md instructional-
    // design audit, gap 1): any result carrying a `templateId` came from a
    // daily-practice generator (see dailyPractice.js/lessonScoring.js) —
    // update that generator's due date based on whether THIS answer was
    // correct. Curated lesson questions never carry templateId, so this is
    // a no-op for every non-practice lesson attempt.
    const today = todayStr();
    let reviewSchedule = state.reviewSchedule;
    const scheduleWrites = [];
    for (const r of attemptResult.results) {
      if (!r.templateId) continue;
      const updated = nextReviewScheduleEntry(reviewSchedule[r.templateId], r.correct, today);
      reviewSchedule = { ...reviewSchedule, [r.templateId]: updated };
      scheduleWrites.push(saveReviewScheduleEntry(r.templateId, updated));
    }

    set({ lessonProgress, xp, currentRank, reviewSchedule });

    await Promise.all([
      saveLessonProgress(lessonId, newProgressEntry),
      saveMeta({ xp, streak: state.streak, lastActiveDate: state.lastActiveDate }),
      ...scheduleWrites
    ]);
    await get().bumpTodayAttendance('lessonsCompleted');
  },

  /**
   * Self-explanation ("explain this to Commander Nova in your own
   * words") — captured, never scored (PROJECT_PLAN.md instructional-
   * design audit, gap 3). No live AI/API integration exists in this app
   * to evaluate free text, so this is deliberately just storage for the
   * parent to review later, not a graded step.
   */
  async recordSelfExplanation(lessonId, beatLabel, text) {
    const trimmed = text.trim();
    if (!trimmed) return;
    const now = new Date().toISOString();
    const entry = {
      lessonId,
      beatLabel: beatLabel ?? null,
      text: trimmed,
      completedAt: now,
      // Written on HIS computer, read on HERS — so it needs an identity
      // that survives the crossing. See the v31 schema note in db.js.
      syncId: newSyncId(),
      updatedAt: now,
      gradeNote: null
    };
    const id = await saveSelfExplanationEntry(entry);
    // Held in state as well as written, so the reflection reaches the Ready
    // to Grade queue in this session rather than only after a reload.
    set({ selfExplanations: [...get().selfExplanations, { ...entry, id }] });
  },

  /**
   * Grade a reflection, A-F, and optionally say something back.
   *
   * Deliberately a PARENT action. Grading free text automatically would need
   * either an API this local-first app does not have, or keyword matching,
   * which scores vocabulary rather than thinking — a good answer in unusual
   * words marked wrong, a keyword salad marked right.
   *
   * ---- WHY A NOTE, AND NOT JUST A LETTER (Aug 9, 2026) ----
   *
   * The audit put it plainly: he writes an explanation in his own words, and
   * what comes back is a letter. For a maths answer a letter is enough — the
   * answer was right or it was not. For "explain how a wing makes lift, in
   * your own words", a B tells him nothing he can use. He does not learn which
   * part was the good part, and the one place in this app where he is asked to
   * think out loud is the one place with no reply.
   *
   * The note is optional and stays optional. A parent grading twelve
   * reflections on a Sunday should not be required to write twelve
   * paragraphs — but when she has something to say, it now reaches him,
   * travels in the export, and appears next to what he wrote.
   */
  /**
   * ==================================================================
   * HIS WRITING IS READ AND REPLIED TO. IT IS NOT GRADED. (Aug 9, 2026.)
   * ==================================================================
   *
   * The lesson screen tells him, twice, in these words: "There's no wrong
   * answer here, and it isn't graded" and "Ungraded -- this is just for you to
   * check your own understanding." The Parent Dashboard then put a **Set
   * grade** button on every one of them. One of those two statements was a lie
   * to a twelve-year-old, and he would have worked out which.
   *
   * The grade also reached nothing. It is not in the transcript, the gradebook
   * average, the compliance packet or Learning Analytics -- a letter that
   * landed in a row and stopped. So the queue cost her real time on a Sunday
   * and bought a record nobody would ever read.
   *
   * What is worth keeping is the reply. Reading what he wrote and saying one
   * specific thing back is the entire reason for asking, and it is the half
   * that was optional.
   *
   * `readAt` is what clears the row. A note sets it too -- replying to
   * something is a stronger form of having read it than ticking that you did.
   */
  async respondToSelfExplanation(id, note) {
    const readAt = new Date().toISOString();
    const gradeNote = (note || '').trim() || null;
    const changes = { gradeNote, readAt, updatedAt: readAt };
    const selfExplanations = get().selfExplanations.map((e) =>
      e.id === id ? { ...e, ...changes } : e
    );
    set({ selfExplanations });
    await updateSelfExplanationEntry(id, changes);
  },

  /**
   * Kept because rows graded before today still carry a grade, and the merge
   * between the two computers still has to move one that already exists. No
   * screen calls it any more.
   */
  async gradeSelfExplanation(id, grade, note) {
    const gradedAt = new Date().toISOString();
    const gradeNote = (note || '').trim() || null;
    /**
     * GRADING IS A STRONGER FORM OF HAVING READ IT than ticking that you did,
     * so it sets readAt too and the row clears. Without this she would grade a
     * reflection and watch it sit there — the fault reported on Aug 21 about
     * replies, one action over.
     */
    const changes = { grade, gradedAt, gradeNote, readAt: gradedAt, updatedAt: gradedAt };
    const selfExplanations = get().selfExplanations.map((e) =>
      e.id === id ? { ...e, ...changes } : e
    );
    set({ selfExplanations });
    await updateSelfExplanationEntry(id, changes);
  },

  /** The next lesson the student hasn't mastered yet, in curriculum order, for a given subject. */
  /**
   * The next lesson this subject should serve today.
   *
   * QUARTER GATING added Aug 6, 2026, from a bug the parent caught: "Why
   * is genealogy even being shown when that isnt to be completed until
   * qtr 2?" This used to return the next unmastered lesson in plain array
   * order, ignoring `quarter` entirely. That looked correct only while
   * every subject's first lessons happened to be its Q1 lessons — and
   * broke immediately when Social Studies was re-quartered, because Q1
   * then had no Mission Control lessons and this reached forward into
   * Q2's genealogy block. The same latent bug also let a fast student run
   * from Q1 straight into Q4 Aerospace content.
   *
   * `isQuarterAvailable` allows the current period AND earlier ones, so a
   * student who is behind can still finish what he missed. Only running
   * ahead is blocked. Khan Academy assignments already worked this way;
   * this puts Mission Control's own lessons on the same rule.
   *
   * Returns null when there is nothing left available — which now means
   * either "everything in this subject is mastered" OR "this quarter's
   * work is done." TodaysMissionCard words it as caught-up, not finished.
   */
  getTodaysMission(subject) {
    const { lessonProgress } = get();
    const next = allLessons.find(
      (lesson) =>
        lesson.subject === subject &&
        !lessonProgress[lesson.id]?.mastered &&
        // The 17 Black STEM & Aerospace Trailblazer biographies are
        // deliberately untagged by quarter and never mastery-gated — a
        // browsable library, per PROJECT_PLAN.md Part 4. They must never be
        // served as a daily mission, which is exactly what happened the
        // first time quarter gating went in: Social Studies had nothing
        // available in Q1, so the search fell through to the first
        // Trailblazer bio.
        !lesson.isTrailblazerBio &&
        isQuarterAvailable(lesson.quarter)
    );
    return next || null;
  },

  /**
   * True when a subject has unmastered lessons waiting in a LATER quarter.
   *
   * Lets the dashboard tell two very different situations apart, which it
   * could not once quarter gating went in (Aug 6, 2026): "you have finished
   * this whole subject" versus "you are caught up for THIS quarter and more
   * arrives next quarter." Saying the first when the second is true would
   * tell a 12-year-old he was done with Social Studies for the year.
   */
  hasLaterQuarterLessons(subject) {
    const { lessonProgress } = get();
    return allLessons.some(
      (lesson) =>
        lesson.subject === subject &&
        !lesson.isTrailblazerBio &&
        !lessonProgress[lesson.id]?.mastered &&
        !isQuarterAvailable(lesson.quarter)
    );
  },

  /**
   * Subjects whose Mission Control lessons are OFFERED to him — the Lesson
   * Roster, and anywhere he can pick a lesson to do.
   *
   * This is getSubjects() plus the Khan-taught subjects that still have a live
   * lesson track. Kept separate from getSubjects() on purpose: that getter also
   * decides which subject can fill the rotating 2:15 block, and English
   * Language Arts must not start appearing there — it has its own two blocks.
   */
  getLessonRosterSubjects() {
    const seen = [...get().getSubjects()];
    for (const subject of LESSON_TRACK_SUBJECTS) {
      if (!seen.includes(subject) && allLessons.some((l) => l.subject === subject)) seen.push(subject);
    }
    return seen;
  },

  /** Every subject that currently has lessons, in curriculum order of first appearance. */
  getSubjects() {
    const seen = [];
    for (const lesson of allLessons) {
      if (ACTIVE_SUBJECTS.includes(lesson.subject) && !seen.includes(lesson.subject)) seen.push(lesson.subject);
    }
    return seen;
  },

  /**
   * Active subjects plus archived ones (Math/Reading/Writing/Science,
   * superseded by Khan Academy) — for parent-facing historical views only
   * (Gradebook, Report Card, Notes, Portfolio, custom Assignments).
   * The point of archiving is removing these from the daily
   * student-facing flow, not erasing the real work already done in
   * them — a parent should still be able to look up his actual Math
   * grade history.
   */
  getAllSubjectsForRecordkeeping() {
    const active = get().getSubjects();
    const khanTaughtWithLessons = KHAN_TAUGHT_SUBJECTS.filter((s) => allLessons.some((l) => l.subject === s));
    // Participation subjects (PE & Nutrition) have no lessons, so getSubjects()
    // — which walks the lessons — never sees them. Added here and ONLY here, so
    // they reach the record without appearing in his mission list or the Lesson
    // Roster. See PARTICIPATION_SUBJECTS in config/subjects.js.
    const participation = PARTICIPATION_SUBJECTS.filter((s) => !active.includes(s));
    // De-duplicated: `reading` is both an offered lesson track and a
    // Khan-taught subject, and listing it twice would print two Language Arts
    // rows on the report card.
    return [...new Set([...active, ...participation, ...khanTaughtWithLessons])];
  },

  /** Subject-level rollups for the dashboard's progress overview. */
  getSubjectProgress() {
    const { lessonProgress } = get();
    const bySubject = {};
    for (const lesson of allLessons) {
      bySubject[lesson.subject] ??= { total: 0, mastered: 0 };
      bySubject[lesson.subject].total += 1;
      if (lessonProgress[lesson.id]?.mastered) bySubject[lesson.subject].mastered += 1;
    }
    return bySubject;
  },

  /** Save a writing journal submission and award XP for it. */
  /**
   * ---- WHAT HE OVERRODE TRAVELS WITH THE ENTRY. (Aug 25, 2026.) ----
   *
   * The parent, on two D- grades: **"He received D minuses because he rushed,
   * didn't use punctuation marks, capitalization, or complete sentences."**
   *
   * The pre-flight check on the writing screen makes him LOOK before saving,
   * and lets him save anyway — that was her call, and the right one. But an
   * override nobody can see is the same as no check: she would still be
   * discovering it by reading the prose days later.
   *
   * `checkIssues` is how many the check still found at the moment he pressed
   * save. `0` means he fixed them or there were none; `3` means he read the
   * list and saved regardless. It is a fact about the submission, not a grade,
   * and it appears beside the entry on her grading screen so "he rushed" stops
   * being an inference.
   *
   * `null` for every entry written before this shipped, and for anything
   * submitted by a path that does not run the check — an unknown is recorded as
   * an unknown, never as a zero. A zero would read as "he checked and it was
   * clean", which is a claim this app would have no evidence for.
   */
  async submitWritingEntry(promptId, text, { checkIssues = null } = {}) {
    const state = get();
    const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
    const completedAt = new Date().toISOString();
    // grade starts null — ungraded until the parent reviews it in the
    // Parent Dashboard's Writing Journal Review section, same manual
    // A-F grading model as Khan Academy assignments (confirmed with the
    // parent: writing entries get a real letter grade, not just
    // complete/incomplete).
    const entry = {
      promptId,
      text,
      wordCount,
      completedAt,
      grade: null,
      gradedAt: null,
      checkIssues: Number.isFinite(checkIssues) ? checkIssues : null
    };

    const savedId = await saveWritingEntry(entry);
    const withId = { id: savedId, ...entry };
    const writingEntries = [...state.writingEntries, withId];

    const xp = state.xp + WRITING_ENTRY_XP;
    const totalMastered = totalMasteredCount(state);
    const currentRank = getCurrentRank(xp, totalMastered);

    set({ writingEntries, xp, currentRank });
    await saveMeta({ xp, streak: state.streak, lastActiveDate: state.lastActiveDate });
    await get().bumpTodayAttendance('writingEntries');
    return withId;
  },

  /**
   * Parent grades a writing journal entry — manual A-F, same model and
   * same reasoning as Khan Academy assignments: there's no automated way
   * to score a student's actual composition, so the parent reads it in
   * the Writing Journal Review section and picks the letter grade
   * directly. Confirmed with the parent: writing entries run ALONGSIDE
   * Khan Academy Language Arts content, not as a replacement — both
   * count together toward Language Arts.
   */
  /**
   * THE FOUR-CRITERION RUBRIC, A NOTE HE CAN READ, AND A LETTER DERIVED FROM
   * BOTH. (Aug 13, 2026.)
   *
   * The parent: "He needs assistance building ELA and I think that will help
   * him to begin to create structural sentences and paragraphs."
   *
   * Grading a piece of writing with a single letter and no comment tells him
   * one thing — how he did — and not the only thing that would make the next
   * one better, which is WHAT TO FIX. That gap was the whole reason structure
   * was not improving: nothing in the app had ever named a structural problem
   * out loud.
   *
   * The four criteria are the same ones the Academic Success Center already
   * uses for book reports and research papers (RUBRIC_CRITERIA.written), so a
   * daily drill and a research paper are judged on the same axes and the
   * vocabulary carries across the whole year.
   *
   * THE SCALE. 1 Not yet, 2 Getting there, 3 Solid, 4 Excellent — and "Solid"
   * means he did what was asked, clearly. That has to land as a good grade or
   * the rubric will quietly teach him that meeting the standard is a C. So the
   * average maps 1 -> 60, 2 -> ~73, 3 -> ~87, 4 -> 100 rather than straight
   * out of 16, which would have made straight 3s a 75.
   *
   * The percentage is stored as well as the letter, for the same reason Khan
   * units store theirs: it is what she actually judged, the letter is derived,
   * and a scale change later re-derives every letter without her re-reading a
   * single entry.
   */
  async gradeWritingEntryRubric(id, scores, note = '') {
    const state = get();
    const entry = (state.writingEntries || []).find((e) => e.id === id);
    if (!entry) return { ok: false, error: 'That entry is not in the record.' };

    const keys = ['structure', 'clarity', 'detail', 'mechanics'];
    const values = keys.map((k) => Number(scores?.[k]));
    if (values.some((v) => !Number.isFinite(v) || v < 1 || v > 4)) {
      return { ok: false, error: 'Score all four from 1 to 4.' };
    }
    const rubric = Object.fromEntries(keys.map((k, i) => [k, values[i]]));
    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    const gradePercent = Math.round(60 + ((avg - 1) / 3) * 40);
    const grade = percentToLetter(gradePercent);

    const changes = {
      rubric,
      gradePercent,
      grade,
      gradeNote: String(note || '').trim() || null,
      gradedAt: new Date().toISOString()
    };
    set({
      writingEntries: state.writingEntries.map((e) => (e.id === id ? { ...e, ...changes } : e))
    });
    await updateWritingEntryRecord(id, changes);
    return { ok: true, grade, gradePercent };
  },

  /**
   * The one-letter path, kept because the Mission Control Board grades in a
   * single tap and that speed is worth protecting on a Sunday. It clears any
   * rubric on the row rather than leaving a letter and a rubric that disagree.
   */
  /**
   * ONE-TAP LETTER ON A JOURNAL ENTRY — AND IT NOW COUNTS. (Aug 23, 2026.)
   *
   * This is the grading path on the Mission Control Board: the Sunday screen
   * built so she can clear a week of his writing in one sitting. It wrote
   * `gradePercent: null`, and `writingGraded` in the report card counts only
   * rows with a finite `gradePercent`. **Every writing grade entered on that
   * board reached no subject average, no transcript and no records packet.**
   *
   * It was worse than inert. An entry she had already rubric-graded in the
   * Writing Journal — which does store a percent, and was counting — lost both
   * `rubric` and `gradePercent` the moment she tapped a letter on the board.
   * The grade dropped OUT of the average it was already in.
   *
   * The letter now converts through `letterToPercent`, the same
   * middle-of-band conversion book reports have used since Aug 10 and
   * reflections since Aug 21. The old refusal was argued in the report card as
   * "inventing a percentage from a letter would put a number she never chose
   * into a legal record" — but the app already does exactly that for the other
   * two, and the note at `writingGraded` said outright that both could not be
   * right. This is the third one coming into line rather than a fourth
   * position being invented.
   *
   * `rubric` is still cleared, and that is deliberate: a four-part rubric that
   * no longer agrees with the letter on the row is worse than no rubric.
   */
  async gradeWritingEntry(id, grade) {
    const state = get();
    const gradedAt = new Date().toISOString();
    const gradePercent = letterToPercent(grade);
    const changes = { grade, gradedAt, rubric: null, gradePercent };
    const writingEntries = state.writingEntries.map((e) =>
      e.id === id ? { ...e, ...changes } : e
    );
    set({ writingEntries });
    await updateWritingEntryRecord(id, changes);
  },

  /** All journal entries for one prompt, most recent first. */
  getEntriesForPrompt(promptId) {
    const { writingEntries } = get();
    return writingEntries
      .filter((e) => e.promptId === promptId)
      .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt));
  },

  /**
   * Summary for the dashboard's Writing Journal card. `projectEntryCount`
   * counts every recurring/hands-on entry logged into `writingEntries` —
   * writing-category "project" prompts AND the hands-on Aerospace
   * projects AND Science experiments, since all three get logged into
   * this same table via WritingPromptEngine regardless of which one
   * started the entry. Previously this only counted the writing-prompt
   * subset, undercounting real completed work (found while confirming
   * the parent's "doesn't the journal go with Aerospace/Science?"
   * question — it does, the full Writing Journal screen already treats
   * them as one list; this summary card just hadn't caught up).
   */
  getWritingJournalSummary() {
    const { writingEntries } = get();
    // An Academy that fills no `writing` slot has no prompts, and this card is
    // on the dashboard — the landing screen. Unguarded, a school with no
    // writing journal fails to render the page that would have said so.
    // §3c: an absent slot is an absent screen, never a broken one.
    const prompts = Array.isArray(writingPrompts) ? writingPrompts : [];
    const skillPrompts = prompts.filter((p) => p.category === 'skill');
    const projectPrompts = prompts.filter((p) => p.category === 'project');
    const completedSkillIds = new Set(writingEntries.map((e) => e.promptId));
    const skillCompleted = skillPrompts.filter((p) => completedSkillIds.has(p.id)).length;
    const projectIds = new Set([
      ...projectPrompts.map((p) => p.id),
      ...aerospaceProjects.map((p) => p.id),
      ...scienceExperiments.map((p) => p.id),
      ...technologyProjects.map((p) => p.id),
      ...roboticsProjects.map((p) => p.id),
      ...gardenProjects.map((p) => p.id)
    ]);
    const projectEntryCount = writingEntries.filter((e) => projectIds.has(e.promptId)).length;
    return {
      skillCompleted,
      skillTotal: skillPrompts.length,
      projectEntryCount
    };
  },

  /** Today's Mon-Fri word-study task for a skill (see lib/weeklyWords.js). */
  getTodaysWordTask(skill) {
    const { weeklyWords } = get();
    // The skill decides WHICH activity each weekday holds -- spelling runs
    // read / choose / word search / missing letters / spelling test, and
    // vocabulary runs read / meaning / fill the blank / recall / test. Before
    // Aug 9 2026 both ran the same multiple-choice round four days running.
    return getTodaysWordTaskFor(weeklyWords[skill], new Date(), skill);
  },

  /** This week's actual word objects (not just IDs) for a given skill. */
  getWeeklyWordList(skill) {
    const { weeklyWords } = get();
    const state = weeklyWords[skill];
    if (!state) return { weekNumber: 1, words: [], quizTakenThisWeek: false };
    const pool = WORD_POOLS[skill];
    return {
      weekNumber: state.weekNumber,
      words: getWordsByIds(pool, state.currentWordIds),
      quizTakenThisWeek: state.quizTakenThisWeek,
      lastQuizMissedIds: state.lastQuizMissedIds,
      dayMissedIds: state.dayMissedIds || {},
      wordMastery: state.wordMastery || {}
    };
  },

  /**
   * ==================================================================
   * ONE WRITE PATH FOR EVERY DAILY ACTIVITY. (Aug 9, 2026.)
   * ==================================================================
   *
   * There used to be three near-identical actions -- introduce, practice,
   * quiz -- because there were only three shapes of day. There are now ten
   * activities across the two skills, and copying this function ten times is
   * how the three drifted apart in the first place (practice wrote
   * dayMissedIds, the quiz wrote lastQuizMissedIds, introduce wrote neither,
   * and none of them recorded anything per word).
   *
   * `countsForMastery` is the one real decision in here. Reading the list and
   * finding words in a grid complete the day and earn XP, but they are
   * recognition, not recall -- banking a mastery streak off a word search
   * would retire words he cannot actually spell.
   */
  async completeWordDayTask(skill, dayKey, results = [], options = {}) {
    const state = get();
    const priorRow = state.weeklyWords[skill];
    if (!priorRow) return { xpEarned: 0, mastered: [] };

    const activity = activityFor(skill, dayKey);
    const countsForMastery =
      options.countsForMastery !== undefined
        ? options.countsForMastery
        : Boolean(activity && MASTERY_ACTIVITIES.has(activity.type));

    const graded = Array.isArray(results) ? results : [];
    const missedWordIds = graded.filter((r) => !r.correct).map((r) => r.wordId);
    const correctCount = graded.filter((r) => r.correct).length;

    const beforeMastery = priorRow.wordMastery || {};
    const wordMastery = applyResultsToMastery(beforeMastery, graded, countsForMastery);
    // Words that crossed the line on THIS sitting, so the screen can say so.
    const newlyMastered = Object.keys(wordMastery).filter(
      (id) => wordMastery[id].mastered && !(beforeMastery[id] && beforeMastery[id].mastered)
    );

    const completedDayTasks = Array.from(new Set([...(priorRow.completedDayTasks || []), dayKey]));
    /**
     * THE DATE HE DID IT, WRITTEN DOWN RATHER THAN DERIVED.
     *
     * This is the half of `completedDayTasks` that feeds his Georgia hours, and
     * it must survive every Monday rotation, every repair, and the parent's
     * "start the next list now" button. See the comment on creditedDates in
     * lib/weeklyWords.js for how that was found.
     */
    const creditedDates = Array.from(new Set([...(priorRow.creditedDates || []), todayStr()]));
    const dayMissedIds = { ...(priorRow.dayMissedIds || {}) };
    if (dayKey !== 'fri' && graded.length > 0) dayMissedIds[dayKey] = missedWordIds;

    const isTest = dayKey === 'fri';
    /**
     * FRIDAY'S SCORE IS KEPT. (Aug 10, 2026.)
     *
     * Until today it survived exactly seven days: every field on this row
     * describes the current week, and Monday's rotation overwrote it. So there
     * was no history, which is why word study could not contribute a grade even
     * in principle. One entry per sat test, and a retake replaces its week
     * rather than counting twice.
     */
    const quizHistory = isTest && graded.length > 0
      ? appendQuizResult(priorRow.quizHistory, {
          weekNumber: priorRow.weekNumber,
          weekStartDate: priorRow.weekStartDate,
          date: todayDateStr(),
          correct: correctCount,
          total: graded.length,
          percent: Math.round((correctCount / graded.length) * 100)
        })
      : priorRow.quizHistory || [];

    const updatedRow = {
      ...priorRow,
      completedDayTasks,
      creditedDates,
      dayMissedIds,
      wordMastery,
      quizHistory,
      ...(isTest ? { quizTakenThisWeek: true, lastQuizMissedIds: missedWordIds } : {})
    };
    const weeklyWords = { ...state.weeklyWords, [skill]: updatedRow };

    const perCorrect = options.xpPerCorrect !== undefined
      ? options.xpPerCorrect
      : isTest
        ? WEEKLY_QUIZ_CORRECT_XP
        : WORD_PRACTICE_CORRECT_XP;
    const xpEarned = (options.flatXp || 0) + correctCount * perCorrect;
    const xp = state.xp + xpEarned;
    const totalMastered = totalMasteredCount(state);
    const currentRank = getCurrentRank(xp, totalMastered);

    set({ weeklyWords, xp, currentRank });
    await Promise.all([
      saveWeeklyWordState(skill, updatedRow),
      saveMeta({ xp, streak: state.streak, lastActiveDate: state.lastActiveDate })
    ]);
    return { xpEarned, mastered: newlyMastered, masteryStreakNeeded: MASTERY_STREAK };
  },

  /**
   * The three original word actions, kept as thin wrappers over
   * completeWordDayTask so nothing that already calls them breaks — and so
   * that all four write paths share ONE mastery ledger. Before this they were
   * three separate copies of the same twenty lines, which is how they came to
   * disagree about what a completed day even records.
   */
  async submitWeeklyQuiz(skill, missedWordIds, correctCount) {
    const words = get().weeklyWords?.[skill]?.currentWordIds || [];
    const missed = new Set(missedWordIds || []);
    const results = words.map((id) => ({ wordId: id, correct: !missed.has(id) }));
    return get().completeWordDayTask(skill, 'fri', results, {
      countsForMastery: true,
      xpPerCorrect: WEEKLY_QUIZ_CORRECT_XP
    });
  },

  /**
   * THE PARENT MOVES THE LIST ON. See advanceToNextList in lib/weeklyWords.js
   * for why this is a button and not another rule.
   *
   * Returns what actually happened so the screen can report it rather than
   * claiming success: the words that left, the words that arrived, and how
   * many of this week's days were cleared.
   */
  async advanceWordListNow(skill) {
    const pool = WORD_POOLS[skill];
    if (!pool) return null;
    const before = get().weeklyWords?.[skill];
    if (!before) return null;
    const after = advanceToNextList(pool, before, todayStr());
    const weeklyWords = { ...get().weeklyWords, [skill]: after };
    set({ weeklyWords });
    await saveWeeklyWordState(skill, after);
    return {
      skill,
      weekNumber: after.weekNumber,
      daysCleared: (before.completedDayTasks || []).length,
      left: getWordsByIds(pool, before.currentWordIds).map((w) => w.word),
      arrived: getWordsByIds(pool, after.currentWordIds).map((w) => w.word)
    };
  },

  /**
   * Monday's read-through. Flat bonus, no right or wrong answers to grade —
   * and deliberately NO mastery credit: reading a word is not evidence he can
   * produce it.
   */
  async completeWordIntroduceTask(skill) {
    return get().completeWordDayTask(skill, 'mon', [], {
      countsForMastery: false,
      flatXp: WORD_INTRODUCE_XP
    });
  },

  async completeWordPracticeTask(skill, dayKey, missedWordIds, correctCount) {
    const words = get().weeklyWords?.[skill]?.currentWordIds || [];
    const missed = new Set(missedWordIds || []);
    const results = words.map((id) => ({ wordId: id, correct: !missed.has(id) }));
    return get().completeWordDayTask(skill, dayKey, results);
  },

  /**
   * Marks one day of the 5-Day Study Cycle complete for a subject/
   * quarter (PROJECT_PLAN.md Part 4 — the "5-day spaced-retrieval study
   * cycle" that never got a real build decision until now; see
   * src/lib/studyCycle.js for the full design rationale). Idempotent and
   * order-safe: only writes if `day` is actually the next real, spaced-
   * available step for that cycle — a stray call (e.g. re-opening the
   * Study Guide after the cycle is already finished, just to review
   * again) is a harmless no-op, not an overwrite or an error. This is a
   * SOFT gate only — it never blocks anything; it just tracks real
   * progress so the tracker card can show it.
   */
  async recordStudyCycleDay(subject, quarter, day) {
    const state = get();
    const key = studyCycleKey(subject, quarter);
    const prior = state.studyCycles[key];
    const today = todayStr();

    const priorDone = {
      1: Boolean(prior?.day1CompletedAt),
      2: Boolean(prior?.day2CompletedAt),
      3: Boolean(prior?.day3CompletedAt),
      4: Boolean(prior?.day4CompletedAt)
    };
    if (priorDone[day]) return; // already recorded — no-op
    if (day > 1 && !priorDone[day - 1]) return; // prior day not done yet — not this cycle's turn

    const updated = {
      subject,
      quarter,
      day1CompletedAt: prior?.day1CompletedAt ?? null,
      day2CompletedAt: prior?.day2CompletedAt ?? null,
      day3CompletedAt: prior?.day3CompletedAt ?? null,
      day4CompletedAt: prior?.day4CompletedAt ?? null,
      [`day${day}CompletedAt`]: today
    };
    const studyCycles = { ...state.studyCycles, [key]: updated };
    set({ studyCycles });
    await saveStudyCycleEntry(key, updated);
  },

  /**
   * The Study Cycle's Day 3 — a real weak-spot drill built from the
   * quarter's own lowest-accuracy lessons (src/lib/studyCycle.js
   * pickWeakSpotGeneratorIds), not a blank rest day. Scored the same
   * low-stakes way as Term Blitz (XP per correct answer only, never
   * written to lessonProgress or mastery), and marks Day 3 of the
   * cycle complete.
   */
  async submitWeakSpotDrill(subject, quarter, correctCount) {
    const state = get();
    const xpEarned = correctCount * REVIEW_GAME_CORRECT_XP;
    const xp = state.xp + xpEarned;
    const totalMastered = totalMasteredCount(state);
    const currentRank = getCurrentRank(xp, totalMastered);

    set({ xp, currentRank });
    await saveMeta({ xp, streak: state.streak, lastActiveDate: state.lastActiveDate });
    await get().recordStudyCycleDay(subject, quarter, 3);
    return { xpEarned };
  },

  /**
   * Records a Term Blitz review game result. Deliberately NOT written
   * to `lessonProgress` and doesn't touch mastery/rank-gate the way a
   * real test does — this is a low-stakes review game, so it only
   * awards XP, matching the same pattern as `submitWeeklyQuiz` above.
   *
   * It DOES record a per-subject-per-quarter completion timestamp in
   * `reviewGameCompletions` (keyed `${subject}::${quarter}`, NOT just
   * `quarter` — fixed once a second subject, Social Studies, got its
   * own Quarterly Exams and glossary; a plain-quarter key would have
   * let an Aerospace Q1 Term Blitz falsely satisfy Social Studies Q1's
   * retake gate, and vice versa) — this is what lets a Quarterly Exam
   * retry satisfy the confirmed retake policy (real re-practice before
   * a retake unlocks, see PROJECT_PLAN.md Part 4). The Term Blitz
   * itself stays low-stakes for the student (no mastery gate, no
   * exam-scoped pass/fail); "playing it after a failed exam" is what
   * counts as the re-practice, not any particular score within it.
   *
   * ALSO advances the 5-Day Study Cycle (PROJECT_PLAN.md Part 4) if
   * this completion is genuinely the next spaced slot for that cycle —
   * round 1 (Day 2) or round 2 (Day 4). Playing Term Blitz outside the
   * cycle's real sequence (e.g. for extra practice) still works exactly
   * as before and simply doesn't advance the cycle.
   */
  async submitReviewGame(subject, quarter, gotItCount, totalTerms) {
    const state = get();
    const xpEarned = gotItCount * REVIEW_GAME_CORRECT_XP;
    const xp = state.xp + xpEarned;
    const totalMastered = totalMasteredCount(state);
    const currentRank = getCurrentRank(xp, totalMastered);
    const key = `${subject}::${quarter}`;
    const reviewGameCompletions = { ...state.reviewGameCompletions, [key]: todayStr() };

    set({ xp, currentRank, reviewGameCompletions });
    await saveMeta({ xp, streak: state.streak, lastActiveDate: state.lastActiveDate, reviewGameCompletions });

    const cycleKey = studyCycleKey(subject, quarter);
    const slot = nextTermBlitzSlot(state.studyCycles[cycleKey], todayStr());
    if (slot) await get().recordStudyCycleDay(subject, quarter, slot);

    return { xpEarned };
  },

  /**
   * "Nation Command: Build Your World" — the signature Social Studies
   * simulation game (PROJECT_PLAN.md's games section). Real content:
   * government types, economic systems, and a trade-event response are
   * pulled directly from the Q2 lessons (see
   * `data/games/nationCommandContent.js`); this is a low-stakes,
   * replayable culminating activity, NOT a graded exam — flat completion
   * XP, no mastery gate, no lock on replaying it. The closing "explain
   * your highest-scoring decision" sentence reuses the same
   * `selfExplanations` table gap 3 already built (captured, never
   * scored), just tagged with a fixed game id instead of a lesson id, so
   * no new Dexie table was needed for this.
   */
  async submitNationCommand(reflectionText) {
    const state = get();
    const xpEarned = SIGNATURE_GAME_COMPLETION_XP;
    const xp = state.xp + xpEarned;
    const totalMastered = totalMasteredCount(state);
    const currentRank = getCurrentRank(xp, totalMastered);

    set({ xp, currentRank });
    await saveMeta({ xp, streak: state.streak, lastActiveDate: state.lastActiveDate });

    if (reflectionText && reflectionText.trim()) {
      await saveSelfExplanationEntry({
        lessonId: 'game-nation-command',
        beatLabel: 'Nation Command — Scorecard Reflection',
        text: reflectionText.trim(),
        completedAt: new Date().toISOString()
      });
    }

    return { xpEarned };
  },

  /**
   * "Launch Director" — Aerospace's equivalent signature simulation game
   * (approved design, PROJECT_PLAN.md games section), built the same way
   * as `submitNationCommand` above: flat completion XP (no single
   * "correct" path through real engineering tradeoffs), reflection reused
   * via the same `selfExplanations` table, tagged with a fixed game id.
   */
  async submitLaunchDirector(reflectionText) {
    const state = get();
    const xpEarned = SIGNATURE_GAME_COMPLETION_XP; // same flat completion bonus as Nation Command
    const xp = state.xp + xpEarned;
    const totalMastered = totalMasteredCount(state);
    const currentRank = getCurrentRank(xp, totalMastered);

    set({ xp, currentRank });
    await saveMeta({ xp, streak: state.streak, lastActiveDate: state.lastActiveDate });

    if (reflectionText && reflectionText.trim()) {
      await saveSelfExplanationEntry({
        lessonId: 'game-launch-director',
        beatLabel: 'Launch Director — Scorecard Reflection',
        text: reflectionText.trim(),
        completedAt: new Date().toISOString()
      });
    }

    return { xpEarned };
  },

  /**
   * Daily schedule management — fully parent-customizable. All actions
   * persist immediately so edits survive a refresh, matching the pattern
   * used elsewhere in this store (optimistic set(), then write to Dexie).
   */
  async updateScheduleBlock(blockId, changes) {
    const state = get();
    const scheduleBlocks = state.scheduleBlocks.map((b) => (b.id === blockId ? { ...b, ...changes } : b));
    set({ scheduleBlocks });
    await saveSchedule(scheduleBlocks);
  },

  async addScheduleBlock(afterBlockId) {
    const state = get();
    const newBlock = {
      id:
        'block-' +
        (typeof crypto !== 'undefined' && crypto.randomUUID
          ? crypto.randomUUID()
          : Date.now() + '-' + Math.random().toString(36).slice(2, 8)), // unique even on double-click / StrictMode double-fire (Batch B)
      startTime: '12:00',
      endTime: '12:30',
      label: 'New Activity',
      colorKey: 'neutral'
    };
    const index = state.scheduleBlocks.findIndex((b) => b.id === afterBlockId);
    const scheduleBlocks = [...state.scheduleBlocks];
    if (index === -1) {
      scheduleBlocks.push(newBlock);
    } else {
      scheduleBlocks.splice(index + 1, 0, newBlock);
    }
    set({ scheduleBlocks });
    await saveSchedule(scheduleBlocks);
    return newBlock.id;
  },

  async removeScheduleBlock(blockId) {
    const state = get();
    const scheduleBlocks = state.scheduleBlocks.filter((b) => b.id !== blockId);
    set({ scheduleBlocks });
    await saveSchedule(scheduleBlocks);
  },

  /** direction: -1 to move a block earlier in the list, +1 to move it later. */
  async moveScheduleBlock(blockId, direction) {
    const state = get();
    const blocks = [...state.scheduleBlocks];
    const index = blocks.findIndex((b) => b.id === blockId);
    const targetIndex = index + direction;
    if (index === -1 || targetIndex < 0 || targetIndex >= blocks.length) return;
    [blocks[index], blocks[targetIndex]] = [blocks[targetIndex], blocks[index]];
    set({ scheduleBlocks: blocks });
    await saveSchedule(blocks);
  },

  async resetScheduleToDefault() {
    set({ scheduleBlocks: defaultSchedule });
    await saveSchedule(defaultSchedule);
  },

  /**
   * Record a completed typing lesson attempt. Mastery here is
   * accuracy-based (per-lesson minAccuracy), since the goal is correct
   * finger placement, not raw speed — speed-building happens afterward in
   * the separate Speed Test passages.
   */
  async recordTypingLessonResult(lessonId, accuracy, minAccuracy) {
    const state = get();
    const prior = state.typingLessonProgress[lessonId];
    const bestAccuracy = Math.max(prior?.bestAccuracy ?? 0, accuracy);
    const mastered = Boolean(prior?.mastered) || accuracy >= minAccuracy;
    const attempts = (prior?.attempts ?? 0) + 1;

    const newEntry = { mastered, bestAccuracy, attempts };
    const typingLessonProgress = { ...state.typingLessonProgress, [lessonId]: newEntry };

    const xpEarned = mastered && !prior?.mastered ? 20 : 5; // one-time bonus for first mastery, small XP otherwise
    const xp = state.xp + xpEarned;
    const totalMastered = totalMasteredCount(state);
    const currentRank = getCurrentRank(xp, totalMastered);

    set({ typingLessonProgress, xp, currentRank });
    await Promise.all([
      saveTypingLessonProgress(lessonId, newEntry),
      saveMeta({ xp, streak: state.streak, lastActiveDate: state.lastActiveDate })
    ]);
    await get().bumpTodayAttendance('typingSessions');
    /**
     * ...AND THE DATED ROW, which is the only part of this a calendar can read.
     * `typingLessonProgress` is keyed by lesson and holds a best and a mastery
     * flag; it cannot say WHEN. See `_logTyping` below.
     */
    await get()._logTyping({ kind: 'lesson', lessonId, accuracy });
    return { mastered, xpEarned };
  },

  /**
   * ==================================================================
   * THE ROW THAT MAKES TYPING COUNT. (Aug 26, 2026, audit item O-6.)
   * ==================================================================
   *
   * block-5b is fifteen minutes a day on her printed timetable — about 45
   * hours across a school year. Until today **nothing in this app could credit
   * it**, and the reason was not an oversight in `coveredBlockIds`: it was that
   * neither typing table carried a date. `typingScores` is keyed by passage,
   * `typingLessonProgress` by lesson. A personal best is not evidence of a
   * school day, so no branch could have been written.
   *
   * lib/scheduledMinutes.js states the cost of exactly this, about block-1:
   *
   *   > "a block nothing can credit is ninety hours a year that cannot be
   *   > counted, and this project has already shipped exactly that once"
   *
   * Twice. This is the second one closed.
   *
   * ONE ROW PER SITTING, NOT PER DAY. Deduping to one row a day would be
   * tempting and wrong — `scheduledMinutesOn` counts the BLOCK once however
   * many rows a date has, so a second passage costs nothing and adds a real
   * record of a real attempt. The day's minutes cannot be double-counted.
   */
  async _logTyping({ kind, passageId = null, lessonId = null, wpm = null, accuracy = null }) {
    const row = {
      date: todayStr(),
      kind,
      passageId,
      lessonId,
      wpm,
      accuracy,
      createdAt: new Date().toISOString()
    };
    const id = await saveTypingLogEntry(row);
    set({
      typingLog: [...get().typingLog, { id, ...row }].sort((a, b) =>
        (a.date || '').localeCompare(b.date || '')
      )
    });
    return { id, ...row };
  },

  /**
   * A finished speed-test passage.
   *
   * The screen used to call `saveTypingScore` directly, which is how a real
   * piece of recorded work came to book NOTHING — no attendance bump, no
   * block credit, no dated row. The best-per-passage table it writes is still
   * the right home for a personal best; it was never a record of a school day.
   */
  async recordTypingSpeedTest(passageId, { wpm, accuracy }) {
    const prior = await loadTypingScore(passageId);
    const bestWpm = Math.max(prior?.bestWpm ?? 0, wpm);
    await saveTypingScore(passageId, {
      bestWpm,
      lastAccuracy: accuracy,
      attempts: (prior?.attempts ?? 0) + 1
    });
    await get().bumpTodayAttendance('typingSessions');
    await get()._logTyping({ kind: 'speed', passageId, wpm, accuracy });
    return { bestWpm };
  },

  /**
   * PE & Nutrition — records a periodic body-metric check-in (height/
   * weight). Deliberately framed for the parent/student as health and
   * growth tracking, never an appearance metric — no BMI, no "goal
   * weight" field, just real measurements over time the same way a
   * pediatrician would track growth. Flat low-stakes XP, same pattern
   * as every other tracker in this app.
   */
  async recordPEBodyMetrics({ heightIn, weightLb, note }) {
    const state = get();
    const date = todayStr();
    const entry = { date, heightIn: heightIn ?? null, weightLb: weightLb ?? null, note: note ?? '', createdAt: new Date().toISOString() };
    const id = await savePEBodyMetricsEntry(entry);
    const peBodyMetrics = [...state.peBodyMetrics, { id, ...entry }].sort((a, b) => new Date(a.date) - new Date(b.date));

    const xpEarned = PE_BODY_METRICS_XP;
    const xp = state.xp + xpEarned;
    const totalMastered = totalMasteredCount(state);
    const currentRank = getCurrentRank(xp, totalMastered);

    set({ peBodyMetrics, xp, currentRank });
    await saveMeta({ xp, streak: state.streak, lastActiveDate: state.lastActiveDate });
    return { xpEarned };
  },

  /**
   * PE & Nutrition — records/updates today's quick-log entry (water,
   * protein, sleep, activity minutes, mood). One row per calendar date
   * (upsert, not append) — logging again the same day updates today's
   * numbers rather than creating duplicate rows, matching the real
   * "one true log per day" shape `peDailyLog` is keyed on in db.js.
   * Any field left undefined keeps its previously-logged value for
   * today, so a water-only quick-log doesn't blank out a protein entry
   * logged earlier the same day.
   */
  async recordPEDailyLog(fields) {
    const state = get();
    const date = todayStr();
    const prior = state.peDailyLog[date] || {};
    const updated = {
      waterOz: fields.waterOz ?? prior.waterOz ?? null,
      proteinG: fields.proteinG ?? prior.proteinG ?? null,
      sleepHours: fields.sleepHours ?? prior.sleepHours ?? null,
      activityMinutes: fields.activityMinutes ?? prior.activityMinutes ?? null,
      mood: fields.mood ?? prior.mood ?? null,
      updatedAt: new Date().toISOString()
    };
    const peDailyLog = { ...state.peDailyLog, [date]: updated };

    /**
     * ONCE A DAY, NOT ONCE AN EDIT. (Fixed Aug 13, 2026.)
     *
     * The row is an upsert keyed by date; the XP was not. Correcting today's
     * water figure five times paid 25 XP for one day's logging. Same class of
     * bug as the Khan checkbox, found in the same sweep — and the same fix:
     * the reward follows the FACT (he logged today), not the keystroke.
     */
    const xpEarned = state.peDailyLog[date] ? 0 : PE_DAILY_LOG_XP;
    const xp = state.xp + xpEarned;
    const totalMastered = totalMasteredCount(state);
    const currentRank = getCurrentRank(xp, totalMastered);

    set({ peDailyLog, xp, currentRank });
    await Promise.all([
      savePEDailyLogEntry(date, updated),
      saveMeta({ xp, streak: state.streak, lastActiveDate: state.lastActiveDate })
    ]);
    return { xpEarned };
  },

  /**
   * PE & Nutrition — marks today's rotating workout (see
   * `data/pe/weeklyWorkoutPlan.js::getTodaysWorkout`) complete, logging
   * which real exercises were done. Flat completion XP, same
   * "genuine completion, not a graded score" reasoning as
   * SIGNATURE_GAME_COMPLETION_XP — a workout doesn't have a "correct
   * answer" to score.
   */
  async recordPEWorkoutCompletion(category, exerciseIds) {
    const state = get();
    const date = todayStr();
    const entry = { date, category, exerciseIds, completedAt: new Date().toISOString() };
    const id = await savePEWorkoutLogEntry(entry);
    const peWorkoutLog = [...state.peWorkoutLog, { id, ...entry }].sort((a, b) => new Date(a.date) - new Date(b.date));

    const xpEarned = PE_WORKOUT_COMPLETION_XP;
    const xp = state.xp + xpEarned;
    const totalMastered = totalMasteredCount(state);
    const currentRank = getCurrentRank(xp, totalMastered);

    set({ peWorkoutLog, xp, currentRank });
    await saveMeta({ xp, streak: state.streak, lastActiveDate: state.lastActiveDate });
    await get().bumpTodayAttendance('lessonsCompleted');
    return { xpEarned };
  },

  /**
   * Gardening — records one real thing that happened in the garden.
   *
   * `kind` is one of 'changeover' | 'session' | 'sun-reading' | 'planting' |
   * 'watering' | 'observation' | 'measurement' | 'harvest' (see db.js v28), and
   * `data` carries whatever that kind needs — a sun reading has
   * { hour, zone, condition }, a watering has { zone, amount, unit }.
   *
   * ATTENDANCE is the part that matters beyond XP. Georgia requires 180 days,
   * and Friday only counts toward that if real activity is RECORDED on it (see
   * data/schedule/weekPattern.js). Gardening is the subject that now occupies
   * Friday, so a garden row has to bump attendance exactly the way a completed
   * workout does — otherwise a boy who spent Friday building and planting has a
   * blank day on his record.
   *
   * A 'session' is the day's work as a whole and earns the larger flat XP; every
   * other kind is one observation inside it.
   */
  async recordGardenLogEntry({ kind, briefId = null, projectId = null, title = '', notes = '', data = null, date = null }) {
    const state = get();
    const entry = {
      date: date || todayStr(),
      kind,
      briefId,
      projectId,
      title,
      notes,
      data,
      createdAt: new Date().toISOString()
    };
    const id = await saveGardenLogEntry(entry);
    const gardenLog = [...state.gardenLog, { id, ...entry }].sort((a, b) =>
      (a.date || '').localeCompare(b.date || '')
    );

    const xpEarned = kind === 'session' ? GARDEN_SESSION_XP : GARDEN_LOG_XP;
    const xp = state.xp + xpEarned;
    const totalMastered = totalMasteredCount(state);
    const currentRank = getCurrentRank(xp, totalMastered);

    set({ gardenLog, xp, currentRank });
    await saveMeta({ xp, streak: state.streak, lastActiveDate: state.lastActiveDate });
    await get().bumpTodayAttendance('lessonsCompleted');
    return { xpEarned };
  },

  /**
   * Electric Guitar — records one real thing he did with the guitar.
   *
   * THE APP CANNOT HEAR HIM. It cannot tell whether he is in tune, whether his
   * timing drifts, or whether his fretting wrist is collapsing. So nothing here
   * scores a performance; every row is a fact about what he did, which is the
   * only thing this app is actually in a position to know.
   *
   * `kind` is one of 'practice' | 'theory' | 'skill-cleared' | 'song-picked' |
   * 'song-learned' | 'recording' (see db.js v29), and `data` carries whatever
   * that kind needs — a practice row has { minutes, skillNumber }, a theory row
   * has { itemId, correct }.
   *
   * ATTENDANCE bumps the same way a workout or a garden row does. He is a
   * homeschooled boy doing fifteen minutes of a scheduled subject, and Georgia
   * counts a day on which real activity is recorded.
   */
  async recordGuitarLogEntry({ kind, skillId = null, theoryId = null, title = '', notes = '', data = null, date = null }) {
    const state = get();
    const entry = {
      date: date || todayStr(),
      kind,
      skillId,
      theoryId,
      title,
      notes,
      data,
      createdAt: new Date().toISOString()
    };
    const id = await saveGuitarLogEntry(entry);
    const guitarLog = [...state.guitarLog, { id, ...entry }].sort((a, b) =>
      (a.date || '').localeCompare(b.date || '')
    );

    const xpEarned = kind === 'practice' ? GUITAR_PRACTICE_XP : GUITAR_LOG_XP;
    const xp = state.xp + xpEarned;
    const totalMastered = totalMasteredCount(state);
    const currentRank = getCurrentRank(xp, totalMastered);

    set({ guitarLog, xp, currentRank });
    await saveMeta({ xp, streak: state.streak, lastActiveDate: state.lastActiveDate });
    await get().bumpTodayAttendance('lessonsCompleted');
    return { xpEarned };
  },

  /**
   * The practice streak — consecutive days, counting back from today, on which
   * a practice row exists.
   *
   * Computed, never stored. A stored streak is a number that can be wrong, and
   * the one thing worse than a broken streak is a streak that lies to him.
   *
   * TODAY NOT BEING DONE YET DOES NOT BREAK IT. If he has not practised today,
   * the count runs back from yesterday instead — because at nine in the morning
   * a boy on a fourteen-day run should not be looking at a zero.
   */
  getGuitarPracticeStreak() {
    const days = new Set(
      (get().guitarLog || []).filter((r) => r.kind === 'practice').map((r) => r.date)
    );
    if (days.size === 0) return 0;
    const cursor = new Date();
    if (!days.has(toDateStr(cursor))) cursor.setDate(cursor.getDate() - 1);
    let streak = 0;
    while (days.has(toDateStr(cursor))) {
      streak += 1;
      cursor.setDate(cursor.getDate() - 1);
    }
    return streak;
  },

  /**
   * PE & Nutrition — sets or updates the student's own real, free-text
   * weekly goal (e.g. "do 3 full push-up sets without stopping",
   * "drink my water goal every day this week") and whether it was
   * achieved. Deliberately free-text rather than a numeric weight/
   * appearance target — see db.js's v15 schema comment for why.
   * Awards XP once, the first time a goal is marked achieved (not
   * every time this function is called while editing/updating).
   */
  async updatePEWeeklyGoal(weekKey, { goalText, achieved }) {
    const state = get();
    const prior = state.peWeeklyGoals[weekKey];
    const wasAchieved = Boolean(prior?.achieved);
    const updated = {
      goalText: goalText ?? prior?.goalText ?? '',
      achieved: achieved ?? false,
      createdAt: prior?.createdAt ?? new Date().toISOString()
    };
    const peWeeklyGoals = { ...state.peWeeklyGoals, [weekKey]: updated };

    const newlyAchieved = updated.achieved && !wasAchieved;
    const xpEarned = newlyAchieved ? PE_WEEKLY_GOAL_XP : 0;
    const xp = state.xp + xpEarned;
    const totalMastered = totalMasteredCount(state);
    const currentRank = getCurrentRank(xp, totalMastered);

    set({ peWeeklyGoals, xp, currentRank });
    await Promise.all([
      savePEWeeklyGoalEntry(weekKey, updated),
      saveMeta({ xp, streak: state.streak, lastActiveDate: state.lastActiveDate })
    ]);
    return { xpEarned };
  },

  /**
   * Meal Log (Part 5): record one meal/snack. Health/fuel-framed — the app
   * captures what he ate to build awareness, never to restrict. `date` defaults
   * to today. Returns the created record.
   */
  async addPEMeal({ date, mealType, description, proteinG }) {
    const state = get();
    const entry = {
      date: date || todayStr(), // local date — see todayStr's Batch A comment
      mealType: mealType || 'Snack',
      description: (description || '').trim(),
      proteinG: proteinG === '' || proteinG == null ? null : Number(proteinG),
      createdAt: new Date().toISOString()
    };
    const id = await addPEMealRecord(entry);
    const record = { id, ...entry };
    set({ peMeals: [record, ...state.peMeals] });
    return record;
  },

  async deletePEMeal(id) {
    const state = get();
    set({ peMeals: state.peMeals.filter((m) => m.id !== id) });
    await deletePEMealRecord(id);
  },

  /**
   * Parent Dashboard action: wipes all recorded progress (XP, streak,
   * lesson mastery, Quarterly Exam retake re-practice history, writing
   * journal, typing scores/lessons, weekly word state) back to a fresh
   * start. Deliberately leaves the daily schedule
   * untouched — that's configuration the parent set up, not progress to
   * clear. Irreversible; the confirmation step lives in the UI layer,
   * not here.
   */
  async resetAllProgress() {
    await dbResetAllProgress();
    // The rank floor is progress, not a parent record — a full reset clears it
    // along with the XP and mastery that earned it. Reset back to Tier 1 BEFORE
    // any getCurrentRank() call below, or the floor would hold the old rank up
    // against a now-empty progress table.
    highWaterRankTier = 1;
    rankTierDates = {};
    masteryMilestoneDates = {};
    // Academic Success Center rows are NOT cleared — they hold the
    // parent's own setup (real book titles/authors, real assignment
    // titles and due dates) alongside the student's progress. Only the
    // progress fields are reset, in place, so a reset never destroys
    // work she did. Same principle as the schedule and parent notes
    // being left alone, applied at field level instead of table level.
    const { books: academicBooks, assignments: academicAssignments } = await resetAcademicProgressStatuses();
    set({ academicBooks, academicAssignments });
    set({
      xp: 0,
      streak: 0,
      longestStreak: 0,
      ledger: [],
      dreamGoals: [],
      lastActiveDate: null,
      lessonProgress: {},
      reviewGameCompletions: {},
      reviewSchedule: {},
      studyCycles: {},
      writingEntries: [],
      weeklyWords: { spelling: null, vocabulary: null },
      typingLessonProgress: {},
      allAttendance: {},
      peBodyMetrics: [],
      peDailyLog: {},
      peWorkoutLog: [],
      peWeeklyGoals: {},
      peMeals: [],
      gardenLog: [],
      guitarLog: [],
      typingLog: [],
      currentRank: getCurrentRank(0, 0)
    });
    // Weekly word state was cleared in the DB but the student-facing cards
    // expect a computed current-week row to exist — reseed both skills
    // fresh, exactly the way first-ever hydration does (same argument
    // order: wordPool, priorState, today).
    const today = todayStr();
    const freshSpelling = computeWeeklyWordState(spellingWordPool, null, today);
    const freshVocab = computeWeeklyWordState(vocabularyWordPool, null, today);
    await Promise.all([
      saveWeeklyWordState('spelling', freshSpelling),
      saveWeeklyWordState('vocabulary', freshVocab)
    ]);
    set({ weeklyWords: { spelling: freshSpelling, vocabulary: freshVocab } });
  },

  /**
   * Parent Dashboard action: packages everything that represents the
   * student's real progress into one downloadable JSON file, for the
   * two-computer workflow (student does lessons on their own computer,
   * parent grades/views on a separate one) — this app has no cloud sync
   * yet (see PROJECT_PLAN.md Part 6, "v2 deferred"), so this manual
   * export/import is the practical bridge until that's built.
   *
   * Deliberately scoped to PROGRESS only, not configuration. What is in
   * and what is out is no longer decided here in prose: it lives in
   * `EXPORT_TABLE_POLICY` in db/db.js, next to the schema, and
   * scripts/verify-export-completeness.mjs fails the build if this
   * payload and that policy disagree. See the v31 schema note for why.
   *
   * ---- WHAT WAS ADDED AUGUST 9, 2026, AND WHY IT MATTERED ----
   *
   * A full audit found eight tables written on one machine that could
   * never reach the other. Each one broke a feature the app openly
   * promises:
   *
   *   selfExplanations — every beat reflection, both signature games'
   *     closing explanations, and the Social Studies Q4 short-answer
   *     question. Written on his computer, they could never appear in
   *     her "In His Own Words" queue. The whole point of that feature is
   *     that a person reads what he wrote; on two computers, nobody did.
   *   rewards + rewardRedemptions — he spent the Credits (the ledger
   *     travelled) but the REQUEST never did, so a purchase over the
   *     auto-approve line sat reading "waiting for a parent to approve
   *     it" forever, unapprovable, undeniable, unrefundable. Her catalog
   *     edits never reached his store either.
   *   assignments — the Planner. Two screens tell her these "show up on
   *     Lamar's dashboard"; on his machine they did not exist at all.
   *   readinessAwards — his Rewards screen read "0 of 11 started" no
   *     matter how many she awarded.
   *   fieldTrips — his Progress trip count, three badges and the
   *     seasonal operation's field-trip objective were permanently 0.
   *   weeklyWordState — spelling and vocabulary, four or five days a
   *     week, in no record anywhere.
   *   typingScores, khanDailyLog — his personal bests and his daily
   *     Khan check-offs, same story.
   *
   * This is the fourth repeat of one bug: a hand-maintained export
   * payload silently omitting a table. The guard script exists so there
   * is not a fifth.
   */
  async exportProgressData() {
    const state = get();

    // Every ARRAY table is read in full from Dexie here, NOT from store
    // state: hydrate now loads only a working window of some slices
    // (peMeals, messages — see _hydrateOnce), and a backup must always
    // contain everything. Keyed maps (lessonProgress, allAttendance,
    // peDailyLog, …) and meta-derived scalars (xp, streak) stay full in
    // state, so those still come from state below, unchanged.
    const [
      dbWritingEntries,
      dbKhanAcademyAssignments,
      dbReadingLog,
      dbPortfolio,
      dbAcademicBooks,
      dbAcademicAssignments,
      dbPEBodyMetrics,
      dbPEWorkoutLog,
      dbPEMeals,
      dbMessages,
      dbGardenLog,
      dbGuitarLog,
      dbTypingLog,
      dbSelfExplanations,
      dbRewards,
      dbRewardRedemptions,
      dbReadinessAwards,
      dbFieldTrips,
      dbAssignments,
      dbTypingScores,
      dbWeeklyWordState,
      dbKhanDailyLog,
      dbMorningMeetings
    ] = await Promise.all([
      loadAllWritingEntries(),
      loadAllKhanAcademyAssignments(),
      loadAllReadingLog(),
      loadAllPortfolio(),
      loadAllAcademicBooks(),
      loadAllAcademicAssignments(),
      loadAllPEBodyMetrics(),
      loadAllPEWorkoutLog(),
      loadAllPEMeals(),
      loadAllMessages(),
      loadAllGardenLog(),
      loadAllGuitarLog(),
      loadAllTypingLog(),
      loadAllSelfExplanations(),
      loadAllRewards(),
      loadAllRewardRedemptions(),
      loadAllReadinessAwards(),
      loadAllFieldTrips(),
      loadAllAssignments(),
      loadAllTypingScores(),
      loadAllWeeklyWordState(),
      loadAllKhanDailyLog(),
      loadAllMorningMeetings()
    ]);

    const exportPayload = {
      exportVersion: EXPORT_VERSION,
      exportedAt: new Date().toISOString(),
      xp: state.xp,
      streak: state.streak,
      longestStreak: state.longestStreak,
      highestRankTier: state.currentRank?.tier ?? 1,
      rankTierDates,
      masteryMilestoneDates,
      ledger: state.ledger,
      /**
       * DREAM GOALS TRAVEL. (Aug 16, 2026.)
       *
       * Stated here rather than assumed, because this project has already made
       * the opposite mistake once: rewardRedemptions was absent from the export
       * until Aug 9, so a request raised on his computer could never reach hers
       * — unapprovable, undeniable, unrefundable, with the Credits already
       * gone. A goal he saves into on his machine and a claim she approves on
       * hers is the same round trip. It travels.
       */
      dreamGoals: state.dreamGoals,
      /**
       * COSMETIC OWNERSHIP TRAVELS WITH THE LEDGER. (Added Aug 8, 2026.)
       *
       * These were absent from the export while `ledger` was present, which
       * split a purchase in half: the coins left his balance on both machines,
       * and the thing he bought existed on only one. Setting up a second
       * computer — an explicitly supported flow — would have restored a wallet
       * full of spends with an empty inventory, and the ledger would have been
       * the evidence that he HAD paid for items he no longer owned.
       *
       * This is the "nothing in the export silently dropped" rule that
       * offlineMinutes already taught this project once.
       */
      unlockedCosmetics: state.unlockedCosmetics || [],
      equippedAvatar: state.equippedAvatar,
      equippedRocket: state.equippedRocket,
      // His theme and his board layout are his choices, made on his machine —
      // same rule as the avatar directly above. Left out of the export they
      // would reset every time he set up the app anywhere else.
      equippedTheme: state.equippedTheme,
      boardDensity: state.boardDensity,
      equippedGear: state.equippedGear || {},
      // His room arrangement travels: he rearranges on his machine, and the
      // point of the two-computer sync is that his work reaches hers intact.
      hqLayout: state.hqLayout || {},
      hqCrewPosts: state.hqCrewPosts || {},
      // Parent-set, but it MUST travel: he is the one who clicks it.
      quizLinks: state.quizLinks || {},
      exerciseVideos: state.exerciseVideos || {},
      exerciseVideoSourceId: state.exerciseVideoSourceId,
      exerciseVideosEnabled: state.exerciseVideosEnabled,
      // The bell is parent-set configuration, and it is the kind she would
      // rather set once than set twice — so it travels, unlike the schedule
      // blocks themselves, which stay machine-local by long-standing decision.
      supplyCrateEnabled: state.supplyCrateEnabled,
      classBellEnabled: state.classBellEnabled,
      classBellWarningMinutes: state.classBellWarningMinutes,
      lastActiveDate: state.lastActiveDate,
      lessonProgress: state.lessonProgress,
      typingLessonProgress: state.typingLessonProgress,
      reviewGameCompletions: state.reviewGameCompletions,
      allAttendance: state.allAttendance,
      writingEntries: dbWritingEntries,
      khanAcademyAssignments: dbKhanAcademyAssignments,
      readingLog: dbReadingLog,
      portfolio: dbPortfolio,

      /**
       * Added August 6, 2026, after a real gap was found: the parent
       * zips this app and sends it to her son, so he works in HIS
       * browser and she keeps the records in hers. Everything below was
       * being created on his side and never coming back — every book he
       * marked as reading, every assignment he finished, every workout,
       * every glass of water. The Learning Analytics dashboard reads
       * exactly this data, so on her machine it would have shown a boy
       * doing almost nothing.
       *
       * WHAT IS DELIBERATELY NOT HERE, and must stay that way: her
       * compliance checklist, admin records, course descriptions,
       * evidence links, Mission Evaluation scores, parent notes and the
       * dashboard passcode. Those are HER records and her judgments, not
       * his work. Syncing them would mean a file leaving his computer
       * could overwrite her assessment of him, and the passcode would
       * travel in a file she emails around.
       */
      academicBooks: dbAcademicBooks,
      academicAssignments: dbAcademicAssignments,
      peBodyMetrics: dbPEBodyMetrics,
      peDailyLog: state.peDailyLog,
      peWorkoutLog: dbPEWorkoutLog,
      peWeeklyGoals: state.peWeeklyGoals,
      peMeals: dbPEMeals,
      messages: dbMessages,
      // His work, so it travels on his side of the sync boundary — same rule
      // as the PE tables above. Without this every watering, planting and sun
      // reading he records on HIS computer never reaches her records.
      gardenLog: dbGardenLog,
      // Same sync-boundary rule: his practice, his theory, his songs and his
      // recordings are HIS work, so they travel. Without this, every session he
      // logs on his computer never reaches her records and Electric Guitar reads
      // as a subject he never touched.
      guitarLog: dbGuitarLog,
      // Same rule again, and the one that carries his Georgia hours for
      // block-5b: fifteen minutes a day of typing that no calendar could read
      // until v35 gave it a date.
      typingLog: dbTypingLog,
      studyCycles: state.studyCycles,
      reviewSchedule: state.reviewSchedule,

      /**
       * ---- The eight tables added Aug 9, 2026 (see the header note) ----
       *
       * Whole rows, straight from Dexie, including their `syncId`,
       * `updatedAt` and any `deletedAt` tombstone. The local `id` rides
       * along and is ignored by the merge — `syncId` is the identity.
       */
      selfExplanations: dbSelfExplanations,
      rewards: dbRewards,
      rewardRedemptions: dbRewardRedemptions,
      readinessAwards: dbReadinessAwards,
      fieldTrips: dbFieldTrips,
      // Planner items. Parent-authored in practice (only the Parent
      // Dashboard creates or ticks them), but merged by last-write-wins
      // rather than by a hard direction rule, so no machine has to know
      // which one it is — and a tombstone means a deletion she makes
      // sticks instead of being resurrected by his next export.
      assignments: dbAssignments,
      typingScores: dbTypingScores,
      weeklyWordState: dbWeeklyWordState,
      khanDailyLog: dbKhanDailyLog,
      /**
       * His morning meetings. The goal he set and the question he asked are
       * for her to read, and each completed row is thirty minutes of
       * instruction on the Georgia record — left behind, every school day
       * would understate by half an hour.
       */
      morningMeetings: dbMorningMeetings
    };

    // Compact JSON on purpose: pretty-printing inflated the file ~1.4x
    // and doubled peak memory while building the download.
    const json = JSON.stringify(exportPayload);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mission-control-progress-${todayStr()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    /**
     * Stamp the backup date. This is go-live open item 1, and the reason
     * it is not optional: from today Credits convert into real outings,
     * so "how old is the last copy of his record" stopped being a
     * housekeeping question and became "how much of his year would a
     * dead hard drive take with it". Georgia wants attendance and
     * portfolio evidence for the whole year; this app is where both live.
     *
     * `lastExportBytes` and `lastExportRowCount` are stored alongside so
     * the reminder can say something checkable ("1.4 MB, 3,812 rows")
     * rather than just a date — an export that silently produced almost
     * nothing is the failure worth catching, and a date alone hides it.
     */
    const lastExportAt = new Date().toISOString();
    const lastExportBytes = json.length;
    const lastExportRowCount = countExportRows(exportPayload);
    set({ lastExportAt, lastExportBytes, lastExportRowCount });
    await saveMeta({ lastExportAt, lastExportBytes, lastExportRowCount });

    return exportPayload;
  },

  /**
   * Parent Dashboard action: merges a progress export (see
   * `exportProgressData` above) from the student's computer into this
   * computer's local data. This is a MERGE, not an overwrite — critical,
   * since the parent may have already graded Writing Journal entries or
   * Khan Academy assignments locally, and a blind overwrite from the
   * student's computer (which never receives those grades back) would
   * silently erase that grading work on every re-import.
   *
   * Merge rules, by field shape:
   * - `lessonProgress` / `typingLessonProgress` (keyed by a stable
   *   lessonId, safe to compare directly): per lesson, keep whichever
   *   side has more attempts recorded — the more complete picture.
   * - `reviewGameCompletions` (keyed by quarter): per quarter, keep the
   *   later date.
   * - `allAttendance` (keyed by date): per date, take the max of each
   *   numeric field so a day's recorded activity never regresses.
   * - `xp`: take the higher total (XP only ever increases from real
   *   activity, so the higher number reflects more accumulated work).
   * - `streak` / `lastActiveDate`: taken together from whichever side
   *   has the more recent `lastActiveDate` — a streak is meaningless
   *   without its paired date, so these are never blended separately.
   * - `writingEntries`, `khanAcademyAssignments`, `readingLog`,
   *   `portfolio` (arrays with a local Dexie auto-increment `id` that
   *   is NOT stable across two separate local databases — a
   *   `writingEntries` row with id 5 on the student's computer has no
   *   relationship to id 5 on the parent's): matched instead by a
   *   NATURAL key (e.g. promptId+completedAt for writing entries,
   *   subject+skillTitle+batchLabel for Khan Academy — the same key
   *   already used elsewhere in this file for seed-data dedup). Any
   *   incoming record whose natural key already exists locally is
   *   skipped entirely, not touched — this is what protects a local
   *   grade from ever being overwritten. Only genuinely new records
   *   (new natural key) get added — batched via bulkAdd with their ids
   *   stripped, so each gets a fresh local auto-increment id exactly as
   *   the old per-row adds did.
   *
   * Returns a short summary object so the UI can tell the parent what
   * actually changed.
   */
  async importProgressData(importedData) {
    if (!importedData || typeof importedData !== 'object') {
      throw new Error('That file could not be read as a progress export.');
    }
    // Forward-compat guard: refuse a backup stamped by a NEWER app than
    // this one — its payload may contain shapes this merge doesn't
    // understand. Files with an equal/older version, or none at all
    // (pre-versioning backups), proceed as always. Same error convention
    // as the check above: throw, caught and shown by the Sync UI.
    if (typeof importedData.exportVersion === 'number' && importedData.exportVersion > EXPORT_VERSION) {
      throw new Error('This backup was made by a newer version of Mission Control. Update this computer first.');
    }
    const state = get();

    // Dedup baselines for the two WINDOWED slices must come from the full
    // Dexie tables — state.peMeals / state.messages hold only a working
    // window after hydrate, and deduping against a window would re-add
    // rows that already exist outside it. Every other table's baseline
    // stays a state slice because those slices are still hydrated in full.
    //
    // typingScores and weeklyWordState are not held in the store at all (the
    // UI reads a single row when it needs one), so their baselines can only
    // come from Dexie — added Aug 9, 2026 with the round-trip fix.
    //
    // ---- khanDailyLog AND morningMeetings JOINED THIS LIST (Aug 23, 2026) ----
    //
    // Both became WINDOWED slices after the comment above was written, and
    // neither was added to it. Their merges baselined off `state.khanDailyLog`
    // and `state.morningMeetings` — sixty days — while the incoming file
    // carries every row `loadAllKhanDailyLog` / `loadAllMorningMeetings` can
    // find. For any date older than sixty days the local value read as
    // `undefined`, so the monotonic OR silently degraded to a whole-row
    // OVERWRITE and `bulkPut` replaced the local row.
    //
    // That is not a cosmetic loss. `khanDailyLog` is what `coveredBlockIds`
    // turns into instructional minutes: it is the Georgia attendance evidence.
    // A subject he ticked on her machine, on a day more than two months back,
    // could be erased by importing his file — and nothing would say so.
    const [dbPeMeals, dbMessages, dbTypingScores, dbWeeklyWordState, dbKhanDailyLog, dbMorningMeetings] = await Promise.all([
      loadAllPEMeals(),
      loadAllMessages(),
      loadAllTypingScores(),
      loadAllWeeklyWordState(),
      loadAllKhanDailyLog(),
      loadAllMorningMeetings()
    ]);
    // Full-table baselines, keyed by date, exactly as the windowed state
    // slices are keyed — so the merge below reads unchanged.
    /**
     * THE TWO MAPS ARE NOT THE SAME SHAPE, AND THAT COST A DAY. (Aug 23, 2026.)
     *
     * `state.khanDailyLog` is keyed date -> **the subjects object**
     * (`khanDailyLog[r.date] = r.subjects || {}` in hydrate).
     * `state.morningMeetings` is keyed date -> **the whole row**
     * (`morningMeetings[r.date] = r`).
     *
     * When these baselines were first written to fix the 60-day window bug,
     * both were mapped to `r`. That is right for morning meetings and wrong
     * for the Khan log: `mergeMonotonic` then folded a whole row into a
     * subjects map, and every merged day came out carrying `date` and
     * `subjects` as if they were school subjects. It reached the parent's real
     * database on her next import. The tick data itself survived — the junk
     * keys sat beside it — but this is the Georgia attendance table, and a
     * repair pass in hydrate now strips them.
     *
     * Each baseline must mirror exactly what hydrate puts in state, because
     * that is what the merge below compares against.
     */
    const khanDailyBaseline = Object.fromEntries(dbKhanDailyLog.map((r) => [r.date, r.subjects || {}]));
    const morningBaseline = Object.fromEntries(dbMorningMeetings.map((r) => [r.date, r]));
    // The same 60-day working window hydrate uses, applied to a merged map.
    const WORKING_WINDOW_FROM = toDateStr(new Date(Date.now() - 60 * 864e5));
    const withinWorkingWindow = (byDate) =>
      Object.fromEntries(Object.entries(byDate).filter(([date]) => date >= WORKING_WINDOW_FROM));
    const summary = {
      lessonsUpdated: 0,
      writingEntriesAdded: 0,
      khanAcademyAdded: 0,
      readingLogAdded: 0,
      portfolioAdded: 0,
      academicUpdated: 0,
      gradesReceived: 0,
      peEntriesAdded: 0,
      // Added Aug 9, 2026 — the eight tables the audit found stranded. The
      // parent sees these counts after an import, so "his written answers
      // arrived" is something the screen says rather than something she has to
      // go and check.
      explanationsAdded: 0,
      explanationGradesReceived: 0,
      redemptionsResolved: 0,
      plannerItemsAdded: 0,
      wordStudyWeeksMerged: 0,
      khanDaysMerged: 0
    };

    // --- lessonProgress / typingLessonProgress: keep the more complete side ---
    const mergeByAttempts = (local, incoming) => {
      const merged = { ...local };
      for (const [key, incomingEntry] of Object.entries(incoming || {})) {
        const localEntry = merged[key];
        if (!localEntry || (incomingEntry.attempts ?? 0) > (localEntry.attempts ?? 0)) {
          merged[key] = incomingEntry;
        }
      }
      return merged;
    };
    const lessonProgress = mergeByAttempts(state.lessonProgress, importedData.lessonProgress);
    const typingLessonProgress = mergeByAttempts(state.typingLessonProgress, importedData.typingLessonProgress);
    summary.lessonsUpdated = Object.keys(importedData.lessonProgress || {}).filter(
      (id) => lessonProgress[id] === importedData.lessonProgress[id]
    ).length;

    // --- reviewGameCompletions: keep the later date per quarter ---
    const reviewGameCompletions = { ...state.reviewGameCompletions };
    for (const [quarter, incomingDate] of Object.entries(importedData.reviewGameCompletions || {})) {
      if (!reviewGameCompletions[quarter] || incomingDate > reviewGameCompletions[quarter]) {
        reviewGameCompletions[quarter] = incomingDate;
      }
    }

    // --- allAttendance: max of each numeric field per date, never regress a day ---
    const allAttendance = { ...state.allAttendance };
    for (const [date, incomingRecord] of Object.entries(importedData.allAttendance || {})) {
      const localRecord = allAttendance[date];
      if (!localRecord) {
        allAttendance[date] = incomingRecord;
      } else {
        allAttendance[date] = {
          activeMinutes: Math.max(localRecord.activeMinutes || 0, incomingRecord.activeMinutes || 0),
          lessonsCompleted: Math.max(localRecord.lessonsCompleted || 0, incomingRecord.lessonsCompleted || 0),
          writingEntries: Math.max(localRecord.writingEntries || 0, incomingRecord.writingEntries || 0),
          typingSessions: Math.max(localRecord.typingSessions || 0, incomingRecord.typingSessions || 0),
          // Take the higher value like every other field. Rebuilding this
          // object field-by-field is why offlineMinutes had to be added
          // here explicitly — anything omitted is silently destroyed on
          // import, which for a compliance record is the worst kind of bug.
          offlineMinutes: Math.max(localRecord.offlineMinutes || 0, incomingRecord.offlineMinutes || 0),
          // Added the same day parentMinutes was — because the comment above
          // is right, and a field left out of this list is destroyed on the
          // next import without anything failing.
          parentMinutes: Math.max(localRecord.parentMinutes || 0, incomingRecord.parentMinutes || 0)
        };
      }
    }

    /**
     * --- cosmetics: UNION of owned, never a replacement ---
     *
     * Ownership is monotonic — you cannot un-buy something — so the union is
     * the only correct merge, and it cannot conflict. Equipped choices are a
     * preference rather than a record: keep whatever this machine has set, and
     * adopt the incoming one only where this machine has none, so importing a
     * file never silently redresses him.
     */
    const unlockedCosmetics = [...new Set([
      ...(state.unlockedCosmetics || []),
      ...(importedData.unlockedCosmetics || [])
    ])];
    const equippedAvatar = state.equippedAvatar || importedData.equippedAvatar || null;
    const equippedRocket = state.equippedRocket || importedData.equippedRocket || null;
    const equippedTheme = state.equippedTheme || importedData.equippedTheme || null;
    const boardDensity = state.boardDensity || importedData.boardDensity || 'comfortable';
    const equippedGear = { ...(importedData.equippedGear || {}), ...(state.equippedGear || {}) };
    // Same rule as the gear directly above: per-item, and this machine wins a
    // conflict. Moving a desk is not a monotonic fact — the last person to
    // touch a piece on THIS computer meant it.
    const hqLayout = { ...(importedData.hqLayout || {}), ...(state.hqLayout || {}) };
    const hqCrewPosts = { ...(importedData.hqCrewPosts || {}), ...(state.hqCrewPosts || {}) };
    // The parent curates these on her machine; her copy wins on conflict, but
    // anything only he has is kept rather than dropped.
    const exerciseVideos = { ...(importedData.exerciseVideos || {}), ...(state.exerciseVideos || {}) };

    /**
     * Quiz links follow exerciseVideos exactly: she curates them, so her copy
     * wins on conflict, and anything only the other machine has is kept rather
     * than dropped. On HIS machine `state.quizLinks` is empty, so hers arrive
     * intact — which is the whole point of the field.
     */
    const quizLinks = { ...(importedData.quizLinks || {}), ...(state.quizLinks || {}) };

    /**
     * ==================================================================
     * OFF WINS. AND WHY THE OLD RULE COULD NEVER FIRE. (Aug 23, 2026.)
     * ==================================================================
     *
     * These three on/off switches used to merge as "a machine that has been
     * configured keeps its setting; a machine that never has takes the
     * incoming one", written as `state.X !== undefined ? state.X : incoming`.
     *
     * **That test can never be false.** Every one of them has a default in
     * `initialState` (`classBellEnabled: true`, `exerciseVideosEnabled: true`,
     * `supplyCrateEnabled: true`) and hydrate re-asserts a boolean with
     * `meta?.X !== false`. So `state.X` is ALWAYS a boolean, never
     * `undefined`, the local value always wins, and the imported value is
     * never read on either machine. The merge looked correct and moved
     * nothing — for the bell, since it was written; for the other two, from
     * the moment they were added this morning.
     *
     * It is the same class of fault as the rest of this audit: the value
     * crossed, and the code that should have read it asked a question that
     * could only ever have one answer.
     *
     * **The rule now is: OFF WINS.** If either machine has one of these
     * switched off, it stays off everywhere. Nobody turns a safety switch off
     * by accident, and `exerciseVideosEnabled` gates YouTube fitness and
     * body-image content for a twelve-year-old — the failure that matters is
     * an OFF being lost, never an OFF spreading. The crate and the bell follow
     * the same rule so all three behave alike.
     *
     * `exerciseVideoSourceId` is not a switch and keeps `??`: null genuinely
     * means "not chosen here", so the other machine's choice fills it.
     */
    const offWins = (localValue, incomingValue) => localValue !== false && incomingValue !== false;

    const classBellEnabled = offWins(state.classBellEnabled, importedData.classBellEnabled);
    const classBellWarningMinutes = state.classBellWarningMinutes ?? importedData.classBellWarningMinutes ?? 2;

    /**
     * ==================================================================
     * THREE SETTINGS THAT WERE EXPORTED AND NEVER READ. (Aug 23, 2026.)
     * ==================================================================
     *
     * `exportProgressData` has been putting `exerciseVideosEnabled`,
     * `exerciseVideoSourceId` and `supplyCrateEnabled` in the file. This
     * function never mentioned any of the three, and neither did the
     * `saveMeta` at the end of it — so they crossed to the other computer and
     * were dropped on the floor. Every other exported meta scalar is merged
     * six lines above this one.
     *
     * **`exerciseVideosEnabled` is the one that matters.** It is the master
     * off-switch for exercise demo videos, and it exists — the reasoning is
     * written out where it is defined — because YouTube restricts fitness and
     * body-image content for teenagers. She turns demo videos OFF on her
     * machine; he imports; his machine keeps showing them, while cheerfully
     * merging in the `exerciseVideos` URL map that the switch was meant to
     * gate. **The safety decision did not travel and the content it governs
     * did.**
     *
     * `supplyCrateEnabled` has the same shape: she turns the monthly crate
     * off, his machine keeps awarding it.
     *
     * Merged with `offWins` — see the note above it for why the obvious rule
     * could never fire.
     */
    const exerciseVideosEnabled = offWins(state.exerciseVideosEnabled, importedData.exerciseVideosEnabled);
    const exerciseVideoSourceId = state.exerciseVideoSourceId ?? importedData.exerciseVideoSourceId ?? null;
    const supplyCrateEnabled = offWins(state.supplyCrateEnabled, importedData.supplyCrateEnabled);

    // --- xp: take the higher total; streak/lastActiveDate travel together from the more recent side ---
    const xp = Math.max(state.xp, importedData.xp ?? 0);
    let streak = state.streak;
    let lastActiveDate = state.lastActiveDate;
    if (importedData.lastActiveDate && (!lastActiveDate || importedData.lastActiveDate > lastActiveDate)) {
      streak = importedData.streak ?? streak;
      lastActiveDate = importedData.lastActiveDate;
    }

    /**
     * High-water marks take the MAX of both sides, never the newer side.
     *
     * The live streak travels with whichever record is more recent (above),
     * because a current streak is a fact about right now. These two are not:
     * they are "the best he has ever reached", so the correct merge is the
     * larger of the two machines. Taking the newer one instead would let an
     * import from a freshly-set-up computer erase a rank he had earned or a
     * streak record he had set — the exact class of silent data loss the
     * grade-merge rules above were written to prevent.
     *
     * An older export that predates these fields has no value to contribute,
     * so `?? 0` leaves the local value standing.
     */
    const longestStreak = Math.max(state.longestStreak || 0, importedData.longestStreak ?? 0, streak || 0);
    const importedRankTier = importedData.highestRankTier ?? 0;
    if (importedRankTier > highWaterRankTier) highWaterRankTier = importedRankTier;
    // Dates are add-only and the EARLIER one wins: whichever machine saw the
    // achievement first is the machine that witnessed it. A later date from the
    // other side is a re-detection, not the real event.
    for (const [tier, date] of Object.entries(importedData.rankTierDates || {})) {
      if (!rankTierDates[tier] || date < rankTierDates[tier]) rankTierDates[tier] = date;
    }
    for (const [threshold, date] of Object.entries(importedData.masteryMilestoneDates || {})) {
      if (!masteryMilestoneDates[threshold] || date < masteryMilestoneDates[threshold]) masteryMilestoneDates[threshold] = date;
    }

    /**
     * The ledger merges by UNION on entryId — the reason it was built this way.
     *
     * No "which side wins" question exists here, because every row is an event
     * that genuinely happened on one machine or the other: she granted a bonus
     * on hers while he bought a helmet on his, and after the merge both are
     * simply true. Importing the same file twice is a no-op, because the ids
     * already exist. This is the one part of the sync that cannot be got wrong
     * by a conflict, which is exactly why money lives here rather than in a
     * running total.
     */
    const mergedLedger = mergeLedgers(state.ledger, importedData.ledger || []);
    const newLedgerRows = mergedLedger.filter(
      (e) => !(state.ledger || []).some((x) => x.entryId === e.entryId)
    );

    // --- Natural-key-matched arrays: add-only, never touch an existing local record ---
    // Same dedup rules as before; only the WRITE mechanics changed: new rows
    // (ids stripped, exactly as the old per-row adds did) accumulate into
    // local arrays and land in one bulkAdd per table, grouped in a single
    // transaction, instead of one awaited add() per row. `allKeys: true`
    // returns the fresh auto-increment ids so the in-memory rows below can
    // carry them, same as the old per-row return values.
    /**
     * Which side's grade wins for a row that exists on BOTH computers.
     *
     * The gap this closes, found Aug 7 2026 while walking the parent through
     * her weekly routine: "I log his grades, notes, etc. and export it back to
     * him." Khan units and Writing Journal entries were matched on a natural
     * key and then treated as ADD-ONLY — an incoming row that already existed
     * locally was skipped entirely. That is correct for his work travelling TO
     * her (a stale export must never overwrite a newer local record) and
     * silently wrong in the other direction: every unit she had just graded
     * already existed on his side, so every grade she sent was discarded. She
     * could have graded a whole quarter and he would have seen none of it.
     *
     * Monotonic and symmetric, so the same code is safe on both machines:
     *   - a grade beats no grade
     *   - between two grades, the later gradedAt wins
     *   - with no timestamps to compare, the local grade stands — never
     *     overwrite a human judgment on a coin toss
     */
    const incomingGradeWins = (local, incoming) => {
      if (!incoming || incoming.grade == null) return false;
      if (local.grade == null) return true;
      if (incoming.gradedAt && local.gradedAt) return incoming.gradedAt > local.gradedAt;
      return Boolean(incoming.gradedAt) && !local.gradedAt;
    };

    const stripId = (row) => {
      const { id: _discardedId, ...rowWithoutId } = row;
      return rowWithoutId;
    };

    const writingKey = (e) => `${e.promptId}|${e.completedAt}`;
    const localWritingByKey = new Map(state.writingEntries.map((e) => [writingKey(e), e]));
    const newWritingRows = [];
    const writingGradeUpdates = [];
    for (const entry of importedData.writingEntries || []) {
      const local = localWritingByKey.get(writingKey(entry));
      if (!local) { newWritingRows.push(stripId(entry)); continue; }
      if (incomingGradeWins(local, entry)) {
        writingGradeUpdates.push({ id: local.id, grade: entry.grade, gradedAt: entry.gradedAt ?? null });
      }
    }

    /**
     * A NAME THIS ROW MIGHT HAVE ARRIVED UNDER IS STILL THIS ROW.
     *
     * The natural key includes `skillTitle`, so renaming a unit — as the Aug 9
     * grammar fix does, giving every Khan grammar row Khan's own title —
     * changes its identity for the merge. Both machines run the same rename in
     * hydrate, so they converge, and in normal use this never bites.
     *
     * It bites in the one case that matters most: restoring an OLD backup, or
     * importing an export taken before the rename. The incoming row carries
     * "Verb tenses, including the perfect tenses", the local row now says
     * "Parts of speech: the verb", nothing matches, and the merge adds a
     * SECOND copy of a unit he may already have finished — quietly splitting
     * his record for that unit in two.
     *
     * Normalising the legacy name away in the key costs nothing and closes it.
     */
    const khanKey = (a) => {
      const title = LEGACY_GRAMMAR_TITLES[a.skillTitle] || a.skillTitle;
      return `${a.subject}|${title}|${a.batchLabel}`;
    };
    const localKhanByKey = new Map(state.khanAcademyAssignments.map((a) => [khanKey(a), a]));
    const newKhanRows = [];
    const khanGradeUpdates = [];
    for (const row of importedData.khanAcademyAssignments || []) {
      const local = localKhanByKey.get(khanKey(row));
      if (!local) { newKhanRows.push(stripId(row)); continue; }
      // "Completed" only ever moves forward — a stale export must never
      // un-finish a unit he really did.
      const completed = Boolean(local.completed || row.completed);
      const completedAt = local.completedAt || row.completedAt || null;
      if (incomingGradeWins(local, row)) {
        khanGradeUpdates.push({
          id: local.id,
          grade: row.grade,
          gradePercent: row.gradePercent ?? null,
          // Travels with the percentage it was derived from. A grade that
          // arrives as 82% with the "9/11" lost is a record that can no longer
          // be checked against Khan's own screen.
          gradeRaw: row.gradeRaw ?? null,
          gradedAt: row.gradedAt ?? null,
          completed,
          completedAt
        });
      } else if (completed && !local.completed) {
        khanGradeUpdates.push({ id: local.id, completed, completedAt });
      }
    }

    /**
     * =====================================================================
     * READING LOG AND PORTFOLIO — A REAL MERGE, NOT AN APPEND. (Aug 25.)
     * =====================================================================
     *
     * Audit item N-2. What stood here was:
     *
     *     if (existingReadingKeys.has(readingKey(row))) continue;
     *
     * A row whose natural key already existed was skipped WHOLE. So an edit —
     * a corrected title, a page count added later, the Drive link she attaches
     * to a finished project — could never cross between the two computers, and
     * nothing about that looked like a failure. Meanwhile a deletion could not
     * cross either, because a hard-deleted row is an ABSENCE, and the other
     * machine cannot tell an absence from "never had it". It came straight
     * back on the next import.
     *
     * Both halves are the same missing idea, and v31 already had it: a row
     * identity that survives the trip, and a `deletedAt` that is just another
     * field. `mergeBySyncId` has done exactly this for five tables since then.
     * These two now use it — no new merge rule, the fifth and sixth caller of
     * the one that already exists.
     *
     * MATCHED AGAINST THE FULL DEXIE TABLE, NOT `state`. State has tombstones
     * filtered out of it (see hydrate). Merging against state would mean a row
     * she deleted looks absent here, gets re-added from his copy, and the
     * resurrection bug survives its own fix wearing a tombstone. This is the
     * same mistake I made on Aug 23 with `khanDailyLog`, where the baseline
     * was built from the wrong shape — so it is worth naming twice.
     *
     * The fallback keys are the same natural keys the old code used, which is
     * what pairs up every row written before today rather than doubling it.
     */
    const readingKey = (r) => (r?.title ? `${r.title}|${r.date}` : null);
    const portfolioKey = (p) => (p?.title ? `${p.title}|${p.dateCompleted}` : null);

    const [allReadingRows, allPortfolioRows] = await Promise.all([
      loadAllReadingLog(),
      loadAllPortfolio()
    ]);
    const readingMerge = mergeBySyncId(allReadingRows, importedData.readingLog, readingKey);
    const portfolioMerge = mergeBySyncId(allPortfolioRows, importedData.portfolio, portfolioKey);

    const [writingIds, khanIds] = await db.transaction(
      'rw',
      [db.writingEntries, db.khanAcademyAssignments],
      async () =>
        Promise.all([
          db.writingEntries.bulkAdd(newWritingRows, { allKeys: true }),
          db.khanAcademyAssignments.bulkAdd(newKhanRows, { allKeys: true })
        ])
    );

    // Written after the transaction above for the same reason the grade
    // updates are: a failure there must not leave half a merge behind.
    await Promise.all([
      bulkPutReadingLog(readingMerge.changed),
      bulkPutPortfolio(portfolioMerge.changed)
    ]);

    // Grades arriving from the other computer, applied to rows that already
    // exist here. Written after the bulkAdd transaction above, so a failure
    // there cannot leave half a merge behind.
    await Promise.all([
      ...khanGradeUpdates.map(({ id, ...changes }) => updateKhanAcademyAssignmentRecord(id, changes)),
      ...writingGradeUpdates.map(({ id, ...changes }) => updateWritingEntryRecord(id, changes))
    ]);
    const khanPatchById = new Map(khanGradeUpdates.map(({ id, ...c }) => [id, c]));
    const writingPatchById = new Map(writingGradeUpdates.map(({ id, ...c }) => [id, c]));
    summary.gradesReceived = khanGradeUpdates.length + writingGradeUpdates.length;

    // In-memory ordering replicates the old per-row loops exactly:
    // writing/Khan appended in incoming order; reading/portfolio were
    // unshifted one at a time, so they end up reversed at the front.
    const writingEntries = [
      ...state.writingEntries.map((e) =>
        writingPatchById.has(e.id) ? { ...e, ...writingPatchById.get(e.id) } : e
      ),
      ...newWritingRows.map((r, i) => ({ id: writingIds[i], ...r }))
    ];
    const khanAcademyAssignments = [
      ...state.khanAcademyAssignments.map((a) =>
        khanPatchById.has(a.id) ? { ...a, ...khanPatchById.get(a.id) } : a
      ),
      ...newKhanRows.map((r, i) => ({ id: khanIds[i], ...r }))
    ];
    /**
     * Re-read rather than spliced together in memory.
     *
     * The old code appended the new rows onto `state`, which worked only
     * because nothing but adds could ever happen. Now a merge can edit a row
     * or tombstone it, and reconstructing that by hand is how a screen ends up
     * disagreeing with the database it was just written from. Tombstones are
     * filtered here on the same rule hydrate uses.
     */
    const [mergedReadingRows, mergedPortfolioRows] = await Promise.all([
      loadAllReadingLog(),
      loadAllPortfolio()
    ]);
    const readingLog = mergedReadingRows
      .filter((r) => !r.deletedAt)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
    const portfolio = mergedPortfolioRows
      .filter((p) => !p.deletedAt)
      .sort((a, b) => new Date(b.dateCompleted) - new Date(a.dateCompleted));
    summary.writingEntriesAdded = newWritingRows.length;
    summary.khanAcademyAdded = newKhanRows.length;
    summary.readingLogAdded = readingMerge.changed.length;
    summary.portfolioAdded = portfolioMerge.changed.length;

    /**
     * ---- His work coming back (added August 6, 2026) ----
     *
     * These tables live on the son's copy of the app. The merge rules
     * differ per table because the tables mean different things, and one
     * blanket rule would get at least one of them wrong.
     */

    // Academic Center rows are matched on `slotId` — the stable seed key
    // both copies share. Matching on `id` would fail: both databases
    // auto-increment independently, so his book #7 and her book #7 are
    // different books. Progress moves forward only: a row that is
    // 'completed' on either side stays completed, because a stale export
    // must never un-finish work he really did.
    const ACADEMIC_RANK = { empty: 0, placeholder: 0, 'not-started': 1, 'in-progress': 2, completed: 3, graded: 4 };
    const rankOf = (row) => ACADEMIC_RANK[row?.status] ?? 0;

    /**
     * HIS PROGRESS CROSSES. THE ASSIGNMENT ITSELF DOES NOT.
     *
     * ---- WHY THIS SPLIT EXISTS (Aug 11, 2026) ----
     *
     * This used to replace the whole row: `{ ...incoming, id: local.id }`.
     * Whenever his copy was further along, HIS ENTIRE ROW WON — including the
     * title, the due date, the note and the format.
     *
     * Those are not his to send. The two computers run different builds for
     * days at a time (his is updated by copying a folder across), and on
     * Aug 10 a schedule audit moved twelve due dates and added nineteen
     * formats on her machine. His export still carried the old ones. The first
     * assignment he touched would have quietly handed back the wrong due date
     * and wiped the format — and with the format goes the rubric, the required
     * sections and the checklist. She would have had no way to know: the row
     * would simply look the way it did last week.
     *
     * So the fields are split by who owns them:
     *
     *   HIS   — how far along he is, and what he did:
     *           status, milestones, reflection, timestamps, rubric scores,
     *           and a grade (through the same monotonic rule everything else
     *           in this import uses).
     *   HERS  — what the assignment IS:
     *           title, note, dueDate, format, type, quarter, subject.
     *
     * A row she does not have at all is still skipped entirely — her seed
     * governs which assignments exist.
     */
    const STUDENT_OWNED_ASSIGNMENT_FIELDS = [
      'status',
      'startedAt',
      'completedAt',
      'milestones',
      'reflection',
      'reflectedAt',
      'rubricScores'
    ];

    /**
     * ==================================================================
     * "ADD YOUR OWN" NEVER REACHED THE OTHER COMPUTER. (Aug 23, 2026.)
     * ==================================================================
     *
     * A custom book or assignment — one she typed in herself on the Academic
     * setup screen, rather than one that came from the seed — is stored with
     * `slotId: null`. This merge opened with `if (!incoming?.slotId) continue;`
     * and closed with `if (!local) continue;`, so a row with no slot was
     * dropped twice over.
     *
     * Both tables travel in the export. So the sequence was: she adds a book,
     * exports, he imports, **and the book is not there.** Nothing errors,
     * nothing warns. Every book and every assignment she added beyond the
     * seeded slots — which is the entire point of an "add your own" button —
     * existed only on the machine she typed it on.
     *
     * Slot rows are unchanged: her seed still governs which of those exist,
     * and only his progress fields cross. What is new is that a SLOTLESS row
     * is matched on a natural key and ADDED when the receiving machine does
     * not have it — the same add-on-natural-key rule `readingLog` and
     * `portfolio` already use, for the same reason (no shared id exists).
     *
     * Deletion still does not travel, exactly as it does not for those two.
     * That is a known limit of a union merge and it is written down at v31;
     * it is not made worse here.
     */
    const customKeyOf = (row) =>
      [row?.subject || '', String(row?.title || '').trim().toLowerCase(), row?.dueDate || '']
        .join('::');

    function mergeBySlot(localRows, incomingRows, updateFn, addFn) {
      const writes = [];
      const bySlot = new Map(localRows.filter((r) => r.slotId).map((r) => [r.slotId, r]));
      const byCustomKey = new Map(
        localRows.filter((r) => !r.slotId && r.title).map((r) => [customKeyOf(r), r])
      );
      const merged = [...localRows];
      for (const incoming of incomingRows || []) {
        if (!incoming?.slotId) {
          // ---- a custom row: match on the natural key, add when missing ----
          if (!incoming?.title || !addFn) continue;
          const key = customKeyOf(incoming);
          if (byCustomKey.has(key)) continue; // already here; her copy governs the wording
          const { id: _incomingId, ...row } = incoming;
          byCustomKey.set(key, row);
          merged.push(row);
          writes.push(addFn(row));
          continue;
        }
        const local = bySlot.get(incoming.slotId);
        if (!local) continue; // a slot she doesn't have — her seed governs
        const changes = {};
        if (rankOf(incoming) > rankOf(local)) {
          for (const field of STUDENT_OWNED_ASSIGNMENT_FIELDS) {
            if (incoming[field] !== undefined) changes[field] = incoming[field];
          }
        }
        // A grade travels on its own terms, exactly as it does everywhere else
        // in this import — a grade beats no grade, later gradedAt wins.
        if (incomingGradeWins(local, incoming)) {
          changes.grade = incoming.grade;
          changes.gradedAt = incoming.gradedAt ?? null;
          if (incoming.feedback !== undefined) changes.feedback = incoming.feedback;
        }
        if (Object.keys(changes).length === 0) continue;
        const next = { ...local, ...changes };
        const index = merged.findIndex((r) => r.id === local.id);
        merged[index] = next;
        writes.push(updateFn(local.id, changes));
      }
      return { merged, writes };
    }

    const bookMerge = mergeBySlot(
      state.academicBooks,
      importedData.academicBooks,
      updateAcademicBookRecord,
      addAcademicBookRecord
    );
    const assignmentMerge = mergeBySlot(
      state.academicAssignments,
      importedData.academicAssignments,
      updateAcademicAssignmentRecord,
      addAcademicAssignmentRecord
    );
    summary.academicUpdated = bookMerge.writes.length + assignmentMerge.writes.length;

    // PE daily log: per-date, take the higher of each number. He drank
    // the water on his machine; she should not lose it, and no field
    // should ever go down.
    const peDailyLog = { ...state.peDailyLog };
    const peDailyWrites = [];
    for (const [date, incoming] of Object.entries(importedData.peDailyLog || {})) {
      const local = peDailyLog[date];
      const merged = local
        ? {
            waterOz: Math.max(local.waterOz || 0, incoming.waterOz || 0),
            proteinG: Math.max(local.proteinG || 0, incoming.proteinG || 0),
            sleepHours: Math.max(local.sleepHours || 0, incoming.sleepHours || 0),
            activityMinutes: Math.max(local.activityMinutes || 0, incoming.activityMinutes || 0),
            mood: incoming.mood || local.mood || null
          }
        : incoming;
      peDailyLog[date] = merged;
      peDailyWrites.push(savePEDailyLogEntry(date, merged));
    }

    // Workouts and body check-ins are dated events, so they append rather
    // than merge. Deduped on date+category (and date for metrics) so
    // importing the same file twice doesn't double his month. Rows are
    // collected first (ids stripped, same as before) and written in one
    // bulkAdd per table below — same dedup, batched writes.
    function collectNew(baselineRows, incomingRows, keyOf) {
      const seen = new Set(baselineRows.map(keyOf));
      const rows = [];
      for (const incoming of incomingRows || []) {
        const key = keyOf(incoming);
        if (!key || seen.has(key)) continue;
        seen.add(key);
        rows.push(stripId(incoming));
      }
      return rows;
    }

    const newWorkoutRows = collectNew(
      state.peWorkoutLog,
      importedData.peWorkoutLog,
      (w) => (w?.date ? `${w.date}::${w.category || ''}` : null)
    );
    const newMetricRows = collectNew(
      state.peBodyMetrics,
      importedData.peBodyMetrics,
      (m) => m?.date || null
    );
    /**
     * peMeals joined the tombstoned tables on v34 (audit item N-2), so this is
     * a `mergeBySyncId` like reading and portfolio above rather than a
     * collect-the-new-ones append. Deleting a logged meal on one computer used
     * to be undone by the other's next import, and correcting a protein figure
     * never crossed at all.
     *
     * Baseline is the FULL Dexie table (`dbPeMeals`, loaded above), not the
     * windowed `state.peMeals` — hydrate keeps only a recent window, and
     * merging against a window would treat every older meal as new and double
     * it. The fallback key is the one this table already used.
     */
    const mealKey = (m) =>
      m?.createdAt || (m?.date ? `${m.date}::${m.description || ''}::${m.mealType || ''}` : null);
    const mealMerge = mergeBySyncId(dbPeMeals, importedData.peMeals, mealKey);

    // The same 120-day working window hydrate applies, so an import cannot
    // leave state holding more than a reload would rebuild.
    const importMealCutoff = new Date();
    importMealCutoff.setDate(importMealCutoff.getDate() - 120);
    const importMealCutoffStr = toDateStr(importMealCutoff);
    const newMessageRows = collectNew(
      dbMessages,
      importedData.messages,
      (m) => m?.createdAt ? `${m.createdAt}::${m.sender || ''}` : null
    );
    // Garden rows are dated events like workouts, so they append rather than
    // merge. Deduped on createdAt (an ISO timestamp, unique per row) and NOT on
    // date+kind — he can legitimately water twice on the same day, and a
    // date+kind key would silently swallow the second one.
    const newGardenRows = collectNew(
      state.gardenLog,
      importedData.gardenLog,
      (g) => g?.createdAt || (g?.date ? `${g.date}::${g.kind || ''}::${g.title || ''}` : null)
    );

    // Guitar rows are dated events like workouts, so they append rather than
    // merge. Deduped on createdAt (an ISO timestamp, unique per row) and NOT on
    // date+kind — he can legitimately practise twice in a day, and a date+kind
    // key would silently swallow the second session.
    const newGuitarRows = collectNew(
      state.guitarLog,
      importedData.guitarLog,
      (g) => g?.createdAt || (g?.date ? `${g.date}::${g.kind || ''}::${g.title || ''}` : null)
    );

    /**
     * Typing rows follow the guitar rule exactly, and for the same reason: they
     * are dated events, he can legitimately do two passages in one sitting, and
     * a date+kind key would swallow the second one. `createdAt` is the identity.
     *
     * THIS MERGE IS THE HALF THAT MATTERS. The export was never the hard part —
     * a one-way export is half a round trip, and typing practice happens on HIS
     * computer while the Georgia record is assembled on HERS. Without this the
     * fifteen minutes still never reaches the record it was created to reach.
     */
    const newTypingRows = collectNew(
      state.typingLog,
      importedData.typingLog,
      (t) => t?.createdAt || (t?.date ? `${t.date}::${t.kind || ''}::${t.passageId || t.lessonId || ''}` : null)
    );

    const [workoutIds, metricIds, messageIds, gardenIds, guitarIds, typingIds] = await db.transaction(
      'rw',
      [db.peWorkoutLog, db.peBodyMetrics, db.messages, db.gardenLog, db.guitarLog, db.typingLog],
      async () =>
        Promise.all([
          db.peWorkoutLog.bulkAdd(newWorkoutRows, { allKeys: true }),
          db.peBodyMetrics.bulkAdd(newMetricRows, { allKeys: true }),
          db.messages.bulkAdd(newMessageRows, { allKeys: true }),
          db.gardenLog.bulkAdd(newGardenRows, { allKeys: true }),
          db.guitarLog.bulkAdd(newGuitarRows, { allKeys: true }),
          db.typingLog.bulkAdd(newTypingRows, { allKeys: true })
        ])
    );
    // peMeals is an upsert now, not an add, so it writes outside that
    // transaction — same placement as the reading/portfolio merge above.
    await bulkPutPEMeals(mealMerge.changed);
    const newWorkouts = newWorkoutRows.map((r, i) => ({ id: workoutIds[i], ...r }));
    const newMetrics = newMetricRows.map((r, i) => ({ id: metricIds[i], ...r }));
    const newMessages = newMessageRows.map((r, i) => ({ id: messageIds[i], ...r }));
    const newGardenRowsWithIds = newGardenRows.map((r, i) => ({ id: gardenIds[i], ...r }));
    const newGuitarRowsWithIds = newGuitarRows.map((r, i) => ({ id: guitarIds[i], ...r }));
    const newTypingRowsWithIds = newTypingRows.map((r, i) => ({ id: typingIds[i], ...r }));
    summary.peEntriesAdded =
      newWorkouts.length + newMetrics.length + mealMerge.changed.length + peDailyWrites.length;

    // Weekly goals and study cycles: fill in weeks/cycles she doesn't
    // have. Hers wins on a conflict — she set the goal.
    /**
     * ==================================================================
     * TWO "FIRST IMPORT WINS" MERGES THAT FROZE HIS WORK. (Aug 23, 2026.)
     * ==================================================================
     *
     * Both of these used to read `if (existing) continue;` — once a key
     * existed on the receiving machine, nothing about it could ever update
     * again. For a row written ONCE that is fine. Neither of these is.
     *
     * **peWeeklyGoals.** The old comment said "Hers wins on a conflict — she
     * set the goal." The premise was wrong: this row is written by
     * `WeeklyGoalCard`, a STUDENT screen, and it is written twice a week —
     * Monday with the goal text, Friday with `achieved: true`. After the first
     * import created the week's row on her machine, Friday could never arrive.
     * Her weekly-goal panel showed every single week as unachieved, forever.
     *
     * **studyCycles.** A study-cycle row is a five-day accumulator —
     * `day1CompletedAt` … `day4CompletedAt`, one filled per day. He does Day 1
     * Monday and exports; her machine takes the row. He does Days 2, 3 and 4
     * and exports; every import hits `continue`. Her Study Cycle tracker sat
     * frozen at Day 1 for the rest of the quarter.
     *
     * Both now merge FIELD BY FIELD and monotonically: a completed day never
     * goes back to null, `achieved` ORs across machines, and goal text is kept
     * wherever it is non-empty. Neither machine can erase the other's day.
     */
    const peWeeklyGoals = { ...state.peWeeklyGoals };
    const goalWrites = [];
    for (const [weekKey, incoming] of Object.entries(importedData.peWeeklyGoals || {})) {
      const local = peWeeklyGoals[weekKey];
      if (!local) {
        peWeeklyGoals[weekKey] = incoming;
        goalWrites.push(savePEWeeklyGoalEntry(weekKey, incoming));
        continue;
      }
      const merged = {
        ...local,
        goalText: String(local.goalText || '').trim() || incoming?.goalText || '',
        achieved: Boolean(local.achieved) || Boolean(incoming?.achieved)
      };
      if (JSON.stringify(merged) === JSON.stringify(local)) continue;
      peWeeklyGoals[weekKey] = merged;
      goalWrites.push(savePEWeeklyGoalEntry(weekKey, merged));
    }

    const studyCycles = { ...state.studyCycles };
    const cycleWrites = [];
    const STUDY_CYCLE_DAY_FIELDS = ['day1CompletedAt', 'day2CompletedAt', 'day3CompletedAt', 'day4CompletedAt'];
    for (const [key, incoming] of Object.entries(importedData.studyCycles || {})) {
      const local = studyCycles[key];
      if (!local) {
        studyCycles[key] = incoming;
        cycleWrites.push(saveStudyCycleEntry(key, incoming));
        continue;
      }
      const merged = { ...local };
      for (const field of STUDY_CYCLE_DAY_FIELDS) {
        // A day that is done on either machine is done. Earliest date wins so
        // re-importing the same file never moves a completion later.
        const a = local[field] || null;
        const b = incoming?.[field] || null;
        merged[field] = a && b ? (a <= b ? a : b) : a || b;
      }
      if (JSON.stringify(merged) === JSON.stringify(local)) continue;
      studyCycles[key] = merged;
      cycleWrites.push(saveStudyCycleEntry(key, merged));
    }

    // Spaced repetition: the LATER due date wins, because it reflects the
    // more recent review. Pulling a due date backwards would re-drill
    // material he has already answered correctly since.
    const reviewSchedule = { ...state.reviewSchedule };
    const reviewWrites = [];
    for (const [generatorId, incoming] of Object.entries(importedData.reviewSchedule || {})) {
      const local = reviewSchedule[generatorId];
      if (local && (local.nextDueDate || '') >= (incoming.nextDueDate || '')) continue;
      reviewSchedule[generatorId] = incoming;
      reviewWrites.push(saveReviewScheduleEntry(generatorId, incoming));
    }

    /**
     * ================================================================
     * THE ROUND TRIP, COMPLETED (August 9, 2026)
     * ================================================================
     *
     * Eight tables that could previously only ever exist on the machine
     * that wrote them. See the header note on exportProgressData for
     * what each one broke. The merge rules below differ per table
     * because the tables mean different things; one blanket rule would
     * get several of them wrong.
     */

    // --- selfExplanations: his writing travels to her, her grade AND her
    // note travel back. Matched on syncId, with lessonId+completedAt as
    // the fallback for rows written before v31 — those two together are
    // already unique, since he cannot finish the same beat twice in the
    // same millisecond.
    const explanationFallback = (e) => (e?.lessonId ? `${e.lessonId}|${e.completedAt || ''}|${e.beatLabel || ''}` : null);
    const explanationMerge = mergeBySyncId(
      state.selfExplanations,
      importedData.selfExplanations,
      explanationFallback
    );
    /**
     * A grade must never travel backwards. mergeBySyncId is last-write-wins
     * on the whole row, which is right for the text but wrong for the
     * grade: if he opens the app and something re-stamps his row after
     * she graded it, plain LWW would drop her grade. So the graded
     * fields are re-applied on top, using the same monotonic rule the
     * Writing Journal already uses — a grade beats no grade, and between
     * two grades the later gradedAt wins.
     */
    const localExplanationByKey = new Map(
      state.selfExplanations.map((e) => [e.syncId || explanationFallback(e), e]).filter(([k]) => k)
    );
    const mergedExplanations = explanationMerge.merged.map((row) => {
      const local = localExplanationByKey.get(row.syncId || explanationFallback(row));
      if (!local) return row;
      // readAt and the note travel with the grade: they are now the whole of
      // her side of this row, and losing them would put a reflection she has
      // already answered back into her queue on the other computer.
      const keep = {
        gradeNote: local.gradeNote ?? row.gradeNote ?? null,
        readAt: local.readAt ?? row.readAt ?? null
      };
      if (incomingGradeWins(row, local)) {
        return { ...row, grade: local.grade, gradedAt: local.gradedAt, ...keep };
      }
      return { ...row, ...keep };
    });
    const explanationWrites = explanationMerge.changed.map((row) => {
      const local = localExplanationByKey.get(row.syncId || explanationFallback(row));
      if (!local) return row;
      const keep = {
        gradeNote: local.gradeNote ?? row.gradeNote ?? null,
        readAt: local.readAt ?? row.readAt ?? null
      };
      if (incomingGradeWins(row, local)) {
        return { ...row, grade: local.grade, gradedAt: local.gradedAt, ...keep };
      }
      return { ...row, ...keep };
    });
    summary.explanationsAdded = explanationMerge.changed.filter((r) => !r.id).length;
    summary.explanationGradesReceived = explanationMerge.changed.filter(
      (r) => r.id && r.grade != null
    ).length;

    // --- rewards: her catalog, in both directions. Fallback key is the
    // reward's name, which is what the seeding code has always deduped on.
    const rewardMerge = mergeBySyncId(state.rewards, importedData.rewards, (r) => (r?.name ? `name:${r.name}` : null));

    // --- rewardRedemptions: his requests and her decisions.
    //
    // This is the table whose absence made a >100-Credit request
    // unresolvable: the Credits left his balance (the ledger travelled)
    // but the request never reached her, so the store read "waiting for
    // a parent to approve it" permanently. The refund on a denial is a
    // LEDGER entry, created once by resolveRedemption on her machine and
    // merged by union — so applying a 'denied' status here does not, and
    // must not, mint a second refund.
    const redemptionMerge = mergeBySyncId(
      state.rewardRedemptions,
      importedData.rewardRedemptions,
      (r) => (r?.createdAt ? `${r.createdAt}|${r.rewardName || ''}` : null)
    );
    /**
     * --- dreamGoals: merged by syncId, later updatedAt wins.
     *
     * reservedCredits is NOT summed across machines, and that is deliberate.
     * The reserve itself is a LEDGER entry, and the ledger merges by union on
     * entryId — so the money is reconciled there, once. Adding the two rows'
     * reserved totals would double every Credit he saved.
     */
    const dreamGoalMerge = mergeBySyncId(
      state.dreamGoals,
      importedData.dreamGoals,
      (g) => (g?.createdAt ? `${g.createdAt}|${g.name || ''}` : null)
    );

    summary.redemptionsResolved = redemptionMerge.changed.filter(
      (r) => r.id && r.status && r.status !== 'pending'
    ).length;

    // --- readinessAwards: keyed by skillId (a stable seed key, identical
    // on both machines), so no syncId is needed. Later updatedAt wins,
    // and the dated Bronze -> Silver -> Gold history is UNIONed rather
    // than replaced: each machine may have witnessed a different step,
    // and that history is the part a transcript will need in 2032.
    const readinessAwards = { ...state.readinessAwards };
    const readinessWrites = [];
    for (const incoming of importedData.readinessAwards || []) {
      const skillId = incoming?.skillId;
      if (!skillId) continue;
      const local = readinessAwards[skillId];
      const historyByKey = new Map();
      for (const h of [...(local?.history || []), ...(incoming.history || [])]) {
        if (h && h.at) historyByKey.set(`${h.level}|${h.at}`, h);
      }
      const history = [...historyByKey.values()].sort((a, b) => String(a.at).localeCompare(String(b.at)));
      const incomingWins = !local || String(incoming.updatedAt || '') > String(local.updatedAt || '');
      const next = incomingWins
        ? { level: incoming.level ?? null, note: incoming.note || '', updatedAt: incoming.updatedAt, history }
        : { ...local, history };
      if (JSON.stringify(next) === JSON.stringify(local)) continue;
      readinessAwards[skillId] = next;
      readinessWrites.push({ skillId, ...next });
    }

    // --- fieldTrips: either machine can plan one.
    //
    // The fallback key used to be `destination|date`. Both halves are fields
    // the SEEDER rewrites — it backfills dates and renames three library
    // trips — so one machine running a newer seed than the other gave the
    // same trip two keys, and this merge added a second copy instead of
    // reconciling them. That is the "multiple repeat field trips" the parent
    // reported on Aug 28. `fieldTripSyncId` resolves the rename map and
    // ignores the date, so the key survives both rewrites.
    const fieldTripMerge = mergeBySyncId(
      state.fieldTrips,
      importedData.fieldTrips,
      (t) => fieldTripSyncId(t?.destination)
    );

    // --- assignments (Planner): she writes them, he needs to see them.
    // Fallback key is title+dueDate.
    const plannerMerge = mergeBySyncId(
      state.assignments,
      importedData.assignments,
      (a) => (a?.title ? `${a.title}|${a.dueDate || ''}` : null)
    );
    summary.plannerItemsAdded = plannerMerge.changed.filter((r) => !r.id).length;

    // --- typingScores / weeklyWordState / khanDailyLog: monotonic, keyed
    // by their own natural keys. Nothing here can conflict, because
    // nothing here can go backwards.
    // Neither of these two tables is held in the store (the UI reads one
    // row at a time), so the baseline comes from Dexie, loaded at the top
    // of this action alongside the other full-table baselines.
    const typingByKey = new Map(dbTypingScores.map((r) => [r.passageId, r]));
    const typingWrites = [];
    for (const incoming of importedData.typingScores || []) {
      if (!incoming?.passageId) continue;
      const merged = mergeMonotonic(typingByKey.get(incoming.passageId), incoming);
      if (JSON.stringify(merged) === JSON.stringify(typingByKey.get(incoming.passageId))) continue;
      typingByKey.set(incoming.passageId, merged);
      typingWrites.push(merged);
    }

    /**
     * weeklyWordState: the week with more WORK done wins, not the later date.
     *
     * Both machines rotate the list on the same 7-day calendar, so they agree
     * on which week it is without needing to be told. What they do NOT agree
     * on is what he did during it — Monday's introduce, Tuesday and
     * Wednesday's practice, Thursday's review, Friday's test all happen on his
     * computer and were reaching no record at all before today.
     *
     * So: the higher weekNumber wins outright (that side has rotated further),
     * and within the same week the completed days are UNIONed, the quiz flag
     * is OR-ed, and the missed-word lists come from whichever side actually
     * sat the quiz. Her copy, opened only to grade, never overwrites his week.
     */
    const wordWrites = [];
    const localWordByskill = new Map(dbWeeklyWordState.map((r) => [r.skill, r]));
    for (const incoming of importedData.weeklyWordState || []) {
      const skill = incoming?.skill;
      if (!skill) continue;
      const local = localWordByskill.get(skill);
      let merged;
      if (!local) {
        merged = incoming;
      } else if ((incoming.weekNumber || 0) > (local.weekNumber || 0)) {
        merged = { ...incoming, ...mergeWordHistories(local, incoming) };
      } else if ((incoming.weekNumber || 0) < (local.weekNumber || 0)) {
        merged = { ...local, ...mergeWordHistories(local, incoming) };
      } else {
        /**
         * ---- THE SAME WEEK, TWO DIFFERENT LISTS (Aug 17, 2026) ----
         *
         * Until the rotation was fixed both machines were frozen on the same
         * first ten words, so which side owned `currentWordIds` never came up.
         * It comes up now: her machine repairs the moment she loads the new
         * build, his repairs when he does, and in between they hold different
         * ten-word lists at the same week number.
         *
         * Unioning completed days across two different lists would credit
         * Tuesday on words Tuesday never showed him. So when the lists differ,
         * the side with more work done this week owns the WEEK - list, days and
         * missed words together - which is the same principle this whole merge
         * runs on: the week with more work in it wins.
         */
        const sameList =
          (local.currentWordIds || []).join() === (incoming.currentWordIds || []).join();
        if (!sameList) {
          const localWork = (local.completedDayTasks || []).length;
          const incomingWork = (incoming.completedDayTasks || []).length;
          merged = {
            ...(incomingWork > localWork ? incoming : local),
            ...mergeWordHistories(local, incoming)
          };
        } else {
          const completedDayTasks = [
            ...new Set([...(local.completedDayTasks || []), ...(incoming.completedDayTasks || [])])
          ];
          const quizTakenThisWeek = Boolean(local.quizTakenThisWeek || incoming.quizTakenThisWeek);
          // Only the side that actually sat the quiz has meaningful missed-word
          // data; an empty list from the side that did not must not blank it.
          const lastQuizMissedIds = incoming.quizTakenThisWeek && !local.quizTakenThisWeek
          ? (incoming.lastQuizMissedIds || [])
          : (local.lastQuizMissedIds || incoming.lastQuizMissedIds || []);
          merged = {
            ...local,
            ...mergeWordHistories(local, incoming),
            completedDayTasks,
            quizTakenThisWeek,
            lastQuizMissedIds,
            dayMissedIds: { ...(incoming.dayMissedIds || {}), ...(local.dayMissedIds || {}) }
          };
        }
      }
      if (JSON.stringify(merged) === JSON.stringify(local)) continue;
      localWordByskill.set(skill, merged);
      wordWrites.push(merged);
    }
    // Anything that changed also has to reach the live store, or the Word
    // Study card keeps showing the pre-import week until the next reload.
    const weeklyWords = { ...state.weeklyWords };
    for (const row of wordWrites) {
      if (weeklyWords[row.skill] !== undefined) weeklyWords[row.skill] = { ...row };
    }
    summary.wordStudyWeeksMerged = wordWrites.length;

    const khanDailyLog = { ...khanDailyBaseline };
    const khanDailyWrites = [];
    for (const incoming of importedData.khanDailyLog || []) {
      const date = incoming?.date;
      if (!date) continue;
      const merged = mergeMonotonic(khanDailyLog[date], incoming.subjects || {});
      if (JSON.stringify(merged) === JSON.stringify(khanDailyLog[date])) continue;
      khanDailyLog[date] = merged;
      khanDailyWrites.push({ date, subjects: merged });
    }
    summary.khanDaysMerged = khanDailyWrites.length;

    /**
     * MORNING MEETINGS: ONE ROW PER DAY, AND A DONE DAY STAYS DONE.
     *
     * Keyed by date, so the merge needs no ids and no ordering. The rule is
     * the same one `mergeMonotonic` applies to the Khan ticks and for the same
     * reason: **a day that happened on either machine happened.** Letting a
     * file that predates the meeting blank out a completed row would delete
     * thirty minutes off his Georgia record, silently, on import — which is
     * the shape of bug this table exists to fix, not one to reintroduce.
     *
     * The written fields — his goal, his question for her — are taken from
     * whichever side has them, preferring the incoming file only where the
     * local row is empty. He types them on his computer, so his copy is the
     * original; her machine has no way to author one.
     */
    const morningMeetings = { ...morningBaseline };
    const morningWrites = [];
    for (const incoming of importedData.morningMeetings || []) {
      const date = incoming?.date;
      if (!date) continue;
      const local = morningMeetings[date];
      const merged = {
        ...incoming,
        ...local,
        date,
        completedAt: local?.completedAt || incoming.completedAt || null,
        goal: local?.goal || incoming.goal || '',
        question: local?.question || incoming.question || '',
        checkedForUpdate: Boolean(local?.checkedForUpdate || incoming.checkedForUpdate),
        syncedWork: Boolean(local?.syncedWork || incoming.syncedWork),
        checkedPlanner: Boolean(local?.checkedPlanner || incoming.checkedPlanner),
        checkedProgress: Boolean(local?.checkedProgress || incoming.checkedProgress)
      };
      if (JSON.stringify(merged) === JSON.stringify(local)) continue;
      morningMeetings[date] = merged;
      morningWrites.push(merged);
    }
    summary.morningMeetingsMerged = morningWrites.length;

    // --- Persist the keyed/scalar fields (arrays already persisted row-by-row above) ---
    const totalMastered = totalMasteredCount({ lessonProgress, khanAcademyAssignments });
    const currentRank = getCurrentRank(xp, totalMastered);

    set({
      lessonProgress,
      typingLessonProgress,
      reviewGameCompletions,
      allAttendance,
      xp,
      streak,
      longestStreak,
      ledger: mergedLedger,
      unlockedCosmetics,
      equippedAvatar,
      equippedRocket,
      equippedTheme,
      boardDensity,
      equippedGear,
      hqLayout,
      hqCrewPosts,
      quizLinks,
      exerciseVideos,
      classBellEnabled,
      classBellWarningMinutes,
      exerciseVideosEnabled,
      exerciseVideoSourceId,
      supplyCrateEnabled,
      lastActiveDate,
      writingEntries,
      khanAcademyAssignments,
      readingLog,
      portfolio,
      academicBooks: bookMerge.merged,
      academicAssignments: assignmentMerge.merged,
      peDailyLog,
      peWorkoutLog: [...state.peWorkoutLog, ...newWorkouts].sort((a, b) =>
        (a.date || '').localeCompare(b.date || '')
      ),
      peBodyMetrics: [...state.peBodyMetrics, ...newMetrics].sort((a, b) =>
        (a.date || '').localeCompare(b.date || '')
      ),
      /**
       * From the merged set — a merge can now edit or delete a meal, not only
       * add one, so the old `[...state.peMeals, ...newMeals]` splice would
       * miss both.
       *
       * Re-windowed to the same 120 days hydrate uses, and tombstones dropped
       * on the same rule. Handing state the FULL table here would quietly undo
       * the working window on every import — the state slice would grow past
       * what hydrate would rebuild on the next reload, and the screen would
       * then show more meals after an import than after a refresh.
       */
      peMeals: mealMerge.merged
        .filter((m) => !m.deletedAt && (!m.date || m.date >= importMealCutoffStr))
        .sort((a, b) => new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date)),
      messages: [...state.messages, ...newMessages].sort((a, b) =>
        new Date(a.createdAt) - new Date(b.createdAt)
      ),
      gardenLog: [...state.gardenLog, ...newGardenRowsWithIds].sort((a, b) =>
        (a.date || '').localeCompare(b.date || '')
      ),
      guitarLog: [...state.guitarLog, ...newGuitarRowsWithIds].sort((a, b) =>
        (a.date || '').localeCompare(b.date || '')
      ),
      typingLog: [...state.typingLog, ...newTypingRowsWithIds].sort((a, b) =>
        (a.date || '').localeCompare(b.date || '')
      ),
      peWeeklyGoals,
      studyCycles,
      reviewSchedule,
      currentRank,

      // ---- The completed round trip (Aug 9, 2026) ----
      // Deleted rows are filtered out of the live store rather than kept as
      // visible tombstones: the merge needs them, the screens must not show
      // them. They stay in Dexie and keep travelling in every export.
      selfExplanations: mergedExplanations
        .filter((e) => !e.deletedAt)
        .sort((a, b) => String(a.completedAt || '').localeCompare(String(b.completedAt || ''))),
      rewards: rewardMerge.merged
        .filter((r) => !r.deletedAt)
        .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)),
      rewardRedemptions: redemptionMerge.merged,
      dreamGoals: dreamGoalMerge.merged
        .filter((r) => !r.deletedAt)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
      readinessAwards,
      fieldTrips: fieldTripMerge.merged
        .filter((t) => !t.deletedAt)
        .sort((a, b) => (a.date || '').localeCompare(b.date || '')),
      assignments: plannerMerge.merged
        .filter((a) => !a.deletedAt)
        .sort((a, b) => (a.dueDate || '').localeCompare(b.dueDate || '')),
      /**
       * RE-WINDOWED BEFORE IT REACHES STATE. The merge above now baselines off
       * the FULL Dexie tables so nothing outside the window can be overwritten
       * — but the store's working slices are deliberately the last 60 days
       * (see hydrate), and handing them a year of history here would quietly
       * change what every screen reading them is holding. Disk gets
       * everything; state keeps its window.
       */
      khanDailyLog: withinWorkingWindow(khanDailyLog),
      morningMeetings: withinWorkingWindow(morningMeetings),
      weeklyWords
    });

    // Flush ONLY the entries the merge actually changed, instead of
    // unconditionally rewriting every key in these three maps. Unchanged
    // entries are usually the same object reference (the merge spreads the
    // local map and only replaces winners), so the reference check catches
    // most; the JSON.stringify diff catches rebuilt-but-identical records
    // (e.g. an attendance day whose Math.max fields all matched). Cheap at
    // this scale, and it turns an import into writes proportional to what
    // changed rather than to the size of the whole history.
    const entryChanged = (before, after) =>
      before !== after && JSON.stringify(before) !== JSON.stringify(after);

    await Promise.all([
      ...Object.entries(lessonProgress)
        .filter(([id, progress]) => entryChanged(state.lessonProgress[id], progress))
        .map(([id, progress]) => saveLessonProgress(id, progress)),
      ...Object.entries(typingLessonProgress)
        .filter(([id, progress]) => entryChanged(state.typingLessonProgress[id], progress))
        .map(([id, progress]) => saveTypingLessonProgress(id, progress)),
      ...Object.entries(allAttendance)
        .filter(([date, record]) => entryChanged(state.allAttendance[date], record))
        .map(([date, record]) => saveAttendanceRecord(date, record)),
      saveMeta({ xp, streak, longestStreak, lastActiveDate, reviewGameCompletions, highestRankTier: highWaterRankTier, rankTierDates, masteryMilestoneDates, unlockedCosmetics, equippedAvatar, equippedRocket, equippedTheme, boardDensity, equippedGear, hqLayout, hqCrewPosts, quizLinks, exerciseVideos, classBellEnabled, classBellWarningMinutes, exerciseVideosEnabled, exerciseVideoSourceId, supplyCrateEnabled }),
      addLedgerEntries(newLedgerRows),
      ...bookMerge.writes,
      ...assignmentMerge.writes,
      ...peDailyWrites,
      ...goalWrites,
      ...cycleWrites,
      ...reviewWrites,

      // ---- The completed round trip (Aug 9, 2026) ----
      // bulkPut, not bulkAdd, and deliberately: rows that already exist here
      // are being UPDATED (a grade arriving, an approval arriving, a deletion
      // arriving), and rows that do not have had the other machine's `id`
      // stripped by mergeBySyncId so Dexie assigns a fresh one. Importing the
      // same file twice writes the same values twice, which is a no-op — the
      // property the Handoff card promises the student in so many words.
      bulkPutSelfExplanations(explanationWrites),
      bulkPutRewards(rewardMerge.changed),
      bulkPutRewardRedemptions(redemptionMerge.changed),
      Promise.all((dreamGoalMerge.changed || []).map((g) => putDreamGoalRecord(g))),
      bulkPutReadinessAwards(readinessWrites),
      bulkPutFieldTrips(fieldTripMerge.changed),
      bulkPutAssignments(plannerMerge.changed),
      bulkPutTypingScores(typingWrites),
      bulkPutWeeklyWordState(wordWrites),
      bulkPutKhanDailyLog(khanDailyWrites),
      bulkPutMorningMeetings(morningWrites)
    ]);

    /**
     * ---- Re-read the five syncId tables, so state carries real Dexie ids ----
     *
     * `mergeBySyncId` strips the other machine's auto-increment id from a row
     * that is new here, because that id belongs to THEIR database and would
     * collide in ours. Dexie assigns a fresh one during the bulkPut above —
     * but the object already handed to `set()` does not have it.
     *
     * That is not cosmetic. Every list rendering these tables keys on
     * `row.id`, so a batch of freshly imported rows would all key on
     * `undefined` until the next reload: duplicate React keys, and every
     * per-row action (grade this reflection, approve this request, tick this
     * planner item) firing against an id that does not exist.
     *
     * Five reads on a rare, deliberate, user-initiated action is a fair price
     * for state that provably matches disk.
     */
    /**
     * The two academic tables join this re-read as of Aug 23, 2026, for exactly
     * the reason the block above describes. A custom book or assignment that
     * crosses machines is INSERTED here, and Dexie assigns its `++id` inside
     * the write we just awaited — so the copy sitting in `bookMerge.merged`
     * has no id at all. Without the re-read, the first thing she clicked on a
     * newly-arrived custom row would fire against `undefined`.
     */
    const [freshExplanations, freshRewards, freshRedemptions, freshTrips, freshPlanner, freshBooks, freshAcademicAssignments] = await Promise.all([
      loadAllSelfExplanations(),
      loadAllRewards(),
      loadAllRewardRedemptions(),
      loadAllFieldTrips(),
      loadAllAssignments(),
      loadAllAcademicBooks(),
      loadAllAcademicAssignments()
    ]);
    set({
      // Tombstoned rows stay in Dexie and keep travelling in every export;
      // they never reach a screen. Same filter as hydrate.
      selfExplanations: freshExplanations
        .filter((e) => !e.deletedAt)
        .sort((a, b) => String(a.completedAt || '').localeCompare(String(b.completedAt || ''))),
      rewards: freshRewards
        .filter((r) => !r.deletedAt)
        .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)),
      rewardRedemptions: freshRedemptions
        .filter((r) => !r.deletedAt)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
      fieldTrips: freshTrips
        .filter((t) => !t.deletedAt)
        .sort((a, b) => (a.date || '').localeCompare(b.date || '')),
      assignments: freshPlanner
        .filter((a) => !a.deletedAt)
        .sort((a, b) => (a.dueDate || '').localeCompare(b.dueDate || '')),
      academicBooks: freshBooks,
      academicAssignments: freshAcademicAssignments
    });

    /**
     * Stamp the import date too, for the same reason as the export date:
     * "when did these two computers last actually agree" is the question
     * behind every one of the sync bugs this project has had, and until
     * today nothing in the app could answer it.
     */
    /**
     * Two different dates, and the difference is the whole point: WHEN SHE
     * IMPORTED, and WHEN THE FILE SHE IMPORTED WAS MADE. The screen showed the
     * first and she spent an evening believing his work had been lost, because
     * the file she picked was two days old and nothing said so.
     */
    const lastImportAt = new Date().toISOString();
    const lastImportedExportAt =
      typeof importedData.exportedAt === 'string' ? importedData.exportedAt : get().lastImportedExportAt;
    set({ lastImportAt, lastImportedExportAt });
    await saveMeta({ lastImportAt, lastImportedExportAt });

    return summary;
  },

  /**
   * Internal-ish helper (still exposed like any other action, but meant to
   * be called by other actions, not directly from UI): increments one
   * field of today's attendance record and persists it. `field` is one
   * of 'lessonsCompleted' | 'writingEntries' | 'typingSessions'.
   */
  /**
   * `by` defaults to 1 — every existing caller is counting one more of a
   * thing. The Morning Meeting passes 0: it needs the DAY to exist on the
   * attendance record (the Georgia counter iterates attendance rows, so a day
   * with no row is a day that never happened, however many minutes its blocks
   * are worth) without pretending a lesson was completed. Half an hour of
   * calendar and goal-setting is instruction; it is not a lesson.
   */
  async bumpTodayAttendance(field, by = 1) {
    const state = get();
    const today = todayStr();
    const prior = state.allAttendance[today] || { activeMinutes: 0, lessonsCompleted: 0, writingEntries: 0, typingSessions: 0 };
    const updated = { ...prior, [field]: (prior[field] || 0) + by };
    const allAttendance = { ...state.allAttendance, [today]: updated };
    set({ allAttendance });
    await saveAttendanceRecord(today, updated);
  },

  /**
   * Called roughly once a minute by a Page-Visibility-aware timer (see
   * App.jsx) — only while the tab is actually visible/foregrounded, so
   * this reflects real active time, not just "the tab was left open."
   * This is the app's contribution toward Georgia's 4.5-hours/day
   * homeschool requirement — a supporting proxy, not a certified log.
   */
  /**
   * Record instruction that happened away from this app — Khan Academy,
   * a physical book, PE, a field trip, a lab, a build.
   *
   * From the first-week readiness pass (August 6, 2026): the app only
   * counts foreground minutes in its own tab, so without this the
   * 4.5-hour figure would understate every real school day, all year.
   * Sets rather than adds, so correcting a typo means retyping the
   * number instead of doing arithmetic against whatever is already
   * there. Pass 0 to clear a day.
   */
  async setOfflineInstructionMinutes(dateStr, minutes) {
    const date = dateStr || todayStr();
    const value = Math.max(0, Math.round(Number(minutes) || 0));
    // 24 hours is not a school day; treat it as a slipped digit.
    if (value > 24 * 60) return { ok: false, error: 'That is more hours than a day holds.' };

    const state = get();
    const prior = state.allAttendance[date] || {
      activeMinutes: 0,
      lessonsCompleted: 0,
      writingEntries: 0,
      typingSessions: 0
    };
    const updated = { ...prior, offlineMinutes: value };
    const allAttendance = { ...state.allAttendance, [date]: updated };
    set({ allAttendance });
    await saveAttendanceRecord(date, updated);
    return { ok: true };
  },

  /**
   * ONE MINUTE OF SOMEONE LOOKING AT THE APP.
   *
   * `parentView` decides whose column it lands in. Time on the Parent
   * Dashboard is hers — grading, records, exports — and counting it as his
   * instructional minutes put her admin time on the Georgia record. See the
   * comment on the timer in App.jsx for how that was found.
   *
   * Adult minutes are kept, not discarded. They are a real fact about the
   * household's day and they are simply not his attendance.
   */
  async recordActiveMinute({ parentView = false } = {}) {
    const state = get();
    const today = todayStr();
    const prior = state.allAttendance[today] || { activeMinutes: 0, lessonsCompleted: 0, writingEntries: 0, typingSessions: 0 };
    // Spread `prior` first so offlineMinutes she entered is carried
    // forward rather than dropped on the next minute tick.
    const updated = parentView
      ? { ...prior, parentMinutes: (prior.parentMinutes || 0) + 1 }
      : { ...prior, activeMinutes: (prior.activeMinutes || 0) + 1 };
    const allAttendance = { ...state.allAttendance, [today]: updated };
    set({ allAttendance });
    await saveAttendanceRecord(today, updated);
  },

  /**
   * Summary for the Parent Dashboard's Attendance section: total distinct
   * days with any recorded activity (toward Georgia's 180-day
   * requirement), today's active minutes (toward the 4.5-hour/day
   * target), and the most recent 14 days as a simple list, newest first.
   */
  getAttendanceSummary() {
    const { allAttendance } = get();
    const dates = Object.keys(allAttendance).sort(); // ascending, YYYY-MM-DD sorts correctly as strings
    /**
     * A DAY ON THE RECORD IS A DAY HE DID SOMETHING.
     *
     * This counted `activeMinutes > 0`, and until today activeMinutes included
     * every minute the Parent Dashboard was open. A day she spent grading, on
     * which he did nothing, counted toward Georgia's 180.
     *
     * `parentMinutes` is deliberately absent from this test.
     */
    const daysWithActivity = dates.filter((d) => {
      const r = allAttendance[d];
      return (r.activeMinutes || 0) > 0
        || (r.offlineMinutes || 0) > 0
        || r.lessonsCompleted > 0
        || r.writingEntries > 0
        || r.typingSessions > 0;
    });
    const today = todayStr();
    const todayRecord = allAttendance[today] || { activeMinutes: 0, lessonsCompleted: 0, writingEntries: 0, typingSessions: 0 };
    /**
     * THE NUMBER SHE JUDGES THE DAY BY.
     *
     * ---- WHERE THIS CAME FROM (Aug 20, 2026) ----
     *
     * The parent: **"It only shows Lamar had 2 hrs of work but he completed
     * everything. Khan Academy work was supposed to log the time when he
     * checked them off as done."**
     *
     * It does. Her own record, the same morning:
     *
     *     Aug 17   active 2h19m   credited 3h00m
     *     Aug 14   active 4h51m   credited 3h45m
     *     Aug 11   active 2h12m   credited 2h45m
     *
     * This list printed the FIRST column. `activeMinutes` is foreground time —
     * how long the app was on screen — and it is the weakest of the three
     * numbers the compliance packet uses. The packet already takes
     * `max(active, scheduled) + offline`; this screen showed neither the
     * scheduled credit his ticks earn nor the offline minutes she logs.
     *
     * So on a day he did an hour of Khan and closed the laptop, the screen
     * said one hour and his record said three. She read the smaller number and
     * concluded the ticks were not working.
     *
     * Now it shows what the record actually counts, with the app-time in
     * brackets — because when the two disagree, which one is bigger is the
     * useful fact.
     */
    const creditedByDate = scheduledMinutesByDate({
      khanDailyLog: get().khanDailyLog,
      peWorkoutLog: get().peWorkoutLog,
      guitarLog: get().guitarLog,
      typingLog: get().typingLog,
      gardenLog: get().gardenLog,
      writingEntries: get().writingEntries,
      weeklyWordState: get().weeklyWords,
      scheduleBlocks: get().scheduleBlocks,
      lessonProgress: get().lessonProgress,
      morningMeetings: get().morningMeetings,
      khanAcademyAssignments: get().khanAcademyAssignments
    });

    const recentDays = [...dates]
      .reverse()
      .slice(0, 14)
      .map((date) => {
        const row = allAttendance[date] || {};
        const active = row.activeMinutes || 0;
        const offline = row.offlineMinutes || 0;
        const scheduled = creditedByDate[date] || 0;
        return {
          date,
          ...row,
          creditedMinutes: Math.max(active, scheduled) + offline,
          scheduledMinutes: scheduled
        };
      });

    return {
      totalDaysLogged: daysWithActivity.length,
      todayActiveMinutes: todayRecord.activeMinutes,
      todayActivitiesCount: todayRecord.lessonsCompleted + todayRecord.writingEntries + todayRecord.typingSessions,
      recentDays
    };
  },

  /** Add a parent observation note. `subject` is optional — null/undefined means "General". */
  async addParentNote(text, subject) {
    const trimmed = text.trim();
    if (!trimmed) return;
    const createdAt = new Date().toISOString();
    const id = await saveParentNote({ text: trimmed, subject: subject || null, createdAt });
    const state = get();
    const parentNotes = [{ id, text: trimmed, subject: subject || null, createdAt }, ...state.parentNotes];
    set({ parentNotes });
  },

  /** Remove a parent observation note by id. */
  async removeParentNote(id) {
    await deleteParentNote(id);
    const state = get();
    set({ parentNotes: state.parentNotes.filter((n) => n.id !== id) });
  },

  /**
   * Full per-lesson breakdown for one subject, in curriculum order — the
   * Parent Dashboard's Gradebook. Includes every lesson in that subject,
   * not just attempted ones, so a parent can see the full scope: not
   * started, attempted but not mastered, or mastered, each with best
   * accuracy and attempt count.
   */
  /**
   * ==================================================================
   * THE GRADEBOOK INCLUDES KHAN UNITS. (Aug 10, 2026.)
   * ==================================================================
   *
   * The parent, after Khan grades were made to count toward the subject grade:
   * "i still dont see the grades in the grade book."
   *
   * Right again, and a different screen from the last one. This getter walked
   * `allLessons` and nothing else, so the section literally called **Gradebook**
   * -- "Lesson-by-Lesson Record" -- listed only Mission Control lessons.
   *
   * Khan units are not lessons. They live in `khanAcademyAssignments`, and the
   * only screen that had ever shown them was the separate "Khan Academy Grades"
   * entry list. So for Math, Science and Language Arts -- the three subjects
   * taught entirely on Khan this year -- the Gradebook read "No lessons
   * attempted yet in this subject" and would have gone on reading that all
   * year, however many percentages she typed in.
   *
   * A gradebook that omits the work is not a gradebook. Khan units are rows in
   * it now, tagged `kind: 'khan'` so the screen can label where each row came
   * from, and carrying the fraction she typed so the record shows 9/11 and not
   * just 82%.
   *
   * Rows are returned lessons-first, then Khan units in the order he works
   * them (quarter, then sequence) -- not interleaved, because they are two
   * different kinds of evidence and a reviewer should be able to see which is
   * which at a glance.
   */
  getGradebookData(subject) {
    const { lessonProgress, khanAcademyAssignments } = get();

    const lessonRows = allLessons
      .filter((lesson) => lesson.subject === subject)
      .map((lesson) => {
        const progress = lessonProgress[lesson.id];
        return {
          kind: 'lesson',
          lessonId: lesson.id,
          title: lesson.title,
          tier: lesson.tier,
          mastered: Boolean(progress?.mastered),
          attempted: Boolean(progress),
          bestAccuracy: progress?.bestAccuracy ?? null,
          attempts: progress?.attempts ?? 0,
          lastCompletedDate: progress?.lastCompletedDate ?? null
        };
      });

    const khanRows = (khanAcademyAssignments || [])
      .filter((a) => canonicalSubject(a.subject) === subject)
      .sort(
        (a, b) =>
          quarterRank(a.batchLabel) - quarterRank(b.batchLabel) ||
          (a.sequenceInQuarter ?? 999) - (b.sequenceInQuarter ?? 999)
      )
      .map((a) => {
        const hasPercent = typeof a.gradePercent === 'number' && Number.isFinite(a.gradePercent);
        return {
          kind: 'khan',
          lessonId: 'khan-' + a.id,
          title: a.skillTitle,
          quarter: a.batchLabel || null,
          isCourseChallenge: Boolean(a.isCourseChallenge),
          // "Attempted" for a Khan row means she has recorded something about
          // it -- a score, or at minimum that he finished it. A row nobody has
          // touched is still listed under "not started", same as a lesson.
          attempted: Boolean(a.completed || hasPercent || a.grade),
          mastered: hasPercent ? a.gradePercent >= 90 : false,
          bestAccuracy: hasPercent ? a.gradePercent / 100 : null,
          gradeRaw: a.gradeRaw || null,
          letterGrade: a.grade || null,
          attempts: a.completed ? 1 : 0,
          lastCompletedDate: (a.gradedAt || a.completedAt || '').slice(0, 10) || null
        };
      });

    return [...lessonRows, ...khanRows];
  },

  // ---- Custom Assignments (parent-created tasks, separate from the auto-sequenced curriculum) ----
  // Accepts a single options object rather than positional args — the
  // Custom Assignment Creator (Part 5) grew this from 4 fields to 10,
  // and positional args stop being readable well before that. `instructions`
  // is the renamed-for-clarity successor to the old `description` field
  // (see PROJECT_PLAN.md Part 5); new records only ever write
  // `instructions`, but PlannerSection reads `a.instructions ?? a.description`
  // so any assignment created before this change still displays its notes.
  async addAssignment({
    title,
    instructions,
    dueDate,
    subject,
    assignmentType,
    estimatedTime,
    referenceType,
    referenceDetails,
    uploadFile,
    uploadFileName
  }) {
    const trimmed = (title || '').trim();
    if (!trimmed) return;
    const createdAt = new Date().toISOString();
    const record = {
      title: trimmed,
      instructions: instructions || '',
      dueDate: dueDate || null,
      subject: subject || null,
      assignmentType: assignmentType || 'Assignment',
      estimatedTime: estimatedTime || null,
      referenceType: referenceType || 'None',
      /**
       * THE ONE USER URL THAT SKIPPED THE FILTER. (Aug 23, 2026.)
       *
       * Every other place a link reaches this app from a human — evidence
       * links, portfolio files, admin records, reading log — goes through
       * `normalizeEvidenceUrl`, which rejects any scheme that is not http or
       * https. `driveLinks.js` says outright that "nothing reaches the UI
       * without passing through" it. This field did not, and the Parent
       * Dashboard renders it directly as an `href` whenever the reference type
       * is a Khan lesson, a YouTube video or a website.
       *
       * The realistic failure is not an attack, it is a paste. `type="url"`
       * would have caught a scheme-less `khanacademy.org/...` — except the
       * Custom Assignment creator is a set of inputs with no `<form>` around
       * them, so constraint validation never fires. A scheme-less string
       * becomes a RELATIVE href: clicking it navigates the app to a broken
       * in-app path instead of Khan. That is the "link goes to an empty page"
       * failure this project has already shipped once, with PE videos.
       *
       * ONLY THE LINK TYPES ARE NORMALISED. The same field holds a book title
       * for `Book` and a page reference for `PDF`, and those are rendered as
       * plain text, never as an href — running them through a URL parser would
       * throw away "Hidden Figures, ch. 4". The three link types are the three
       * the dashboard turns into an `<a>`.
       *
       * A link that cannot be normalised is stored as empty rather than stored
       * broken — the row keeps its title and its due date, and the dashboard's
       * existing guard hides the anchor.
       */
      referenceDetails: REFERENCE_LINK_TYPES.includes(referenceType)
        ? normalizeEvidenceUrl(referenceDetails).url || ''
        : referenceDetails || '',
      uploadFile: uploadFile || null,
      uploadFileName: uploadFileName || null,
      completed: false,
      createdAt,
      // Planner items now travel to the student's computer (Aug 9, 2026),
      // which two screens had already been telling the parent they did.
      // See the v31 schema note in db.js for why a generated id and not
      // Dexie's auto-increment.
      syncId: newSyncId(),
      updatedAt: createdAt
    };
    const id = await saveAssignment(record);
    const state = get();
    const assignments = [...state.assignments, { id, ...record }].sort((a, b) => new Date(a.dueDate || '9999') - new Date(b.dueDate || '9999'));
    set({ assignments });
  },

  async toggleAssignmentComplete(id) {
    const state = get();
    const assignment = state.assignments.find((a) => a.id === id);
    if (!assignment) return;
    const updated = {
      ...assignment,
      completed: !assignment.completed,
      syncId: assignment.syncId || newSyncId(),
      updatedAt: new Date().toISOString()
    };
    await updateAssignment(id, updated);
    set({ assignments: state.assignments.map((a) => (a.id === id ? updated : a)) });
  },

  // Soft delete — the row survives carrying a tombstone so the removal
  // reaches the other computer instead of being undone by its next export.
  async removeAssignment(id) {
    await deleteAssignment(id);
    const state = get();
    set({ assignments: state.assignments.filter((a) => a.id !== id) });
  },

  // ---- Reading Log (independent reading, separate from the Reading subject's lessons) ----
  /**
   * TONIGHT'S READING, IN ONE TAP, FROM THE ROW THAT TOLD HIM TO READ.
   *
   * ---- WHY (Aug 15, 2026) ----
   *
   * Nova was telling the parent "No independent reading logged" while her son
   * was, in fact, reading two chapters a night. Both were correct. The Reading
   * Log is a separate record — title, author, amount, unit, date — and filling
   * it meant leaving the board, opening the Book Library, and typing four
   * fields about a book the app already knows he is reading.
   *
   * So the log stayed empty, the Georgia record showed no independent reading,
   * and the one screen that mentioned it did so as a reprimand.
   *
   * THE AMOUNT COMES FROM HER, NOT FROM A GUESS. She said: "He will read 2
   * chapters a day until he's finished." That is stored on the assignment as
   * its pacing and shown on the row before he taps, so the number that lands in
   * a legal record is never one nobody chose. Changing the pacing changes both
   * the row and the log.
   *
   * UNDOABLE, and matched on (title, date) — the same shape as every other
   * daily tick in this app. Two taps in one evening must not become four
   * chapters.
   */
  async logBookReading(assignment) {
    if (!assignment?.title) return { ok: false };
    const date = todayStr();
    const state = get();
    const title = assignment.title;
    if ((state.readingLog || []).some((r) => r.title === title && r.date === date)) {
      return { ok: false, error: 'Already logged today.' };
    }
    const amount = Number(assignment.pacingAmount) || 2;
    const unit = assignment.pacingUnit || 'chapters';
    const record = {
      title,
      author: assignment.author || '',
      amount,
      unit,
      date,
      notes: 'Logged from the board'
    };
    const id = await saveReadingLogEntry(record);
    set({ readingLog: [{ id, ...record }, ...state.readingLog] });
    // Reading is instruction. The garden log bumps the same counter for the
    // same reason: a day he read is a day taught.
    await get().bumpTodayAttendance('lessonsCompleted');

    /**
     * AND THE LIBRARY LEARNS HE HAS OPENED IT. (Aug 16, 2026.)
     *
     * Found while fixing the order of these lists. The Book Library sorts
     * "reading now" to the top of its subject — and every one of the twenty
     * books said not-started, including the one he had been reading two
     * chapters a night since Aug 14. Logging a session wrote a readingLog row
     * and stopped; nothing ever moved the library row off not-started, so the
     * header read "0 being read now" indefinitely and no amount of sorting
     * could show him where he was.
     *
     * Only ever a promotion, never a demotion: a finished book stays finished,
     * and un-ticking tonight's log does not un-start the book, because he did
     * start it. Matched on normalized title, the same join
     * matchReadingLogToBooks already uses — the log has no book id and never
     * will retroactively.
     */
    const norm = (t) => (t || '').trim().toLowerCase();
    const opened = get().academicBooks.filter(
      (b) => b.title && b.status === 'not-started' && norm(b.title) === norm(title)
    );
    for (const book of opened) await get().setAcademicBookStatus(book.id, 'in-progress');

    return { ok: true, amount, unit };
  },

  /** Undo tonight's tick. Removes only TODAY's row for that book. */
  async unlogBookReading(assignment) {
    if (!assignment?.title) return { ok: false };
    const date = todayStr();
    const state = get();
    const row = (state.readingLog || []).find((r) => r.title === assignment.title && r.date === date);
    if (!row) return { ok: false };
    await deleteReadingLogEntry(row.id);
    set({ readingLog: state.readingLog.filter((r) => r.id !== row.id) });
    return { ok: true };
  },

  async addReadingLogEntry(title, author, amount, unit, notes) {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;
    const date = todayStr();
    const record = { title: trimmedTitle, author: author || '', amount: Number(amount) || 0, unit: unit || 'minutes', date, notes: notes || '' };
    const id = await saveReadingLogEntry(record);
    const state = get();
    const readingLog = [{ id, ...record }, ...state.readingLog];
    set({ readingLog });
  },

  async removeReadingLogEntry(id) {
    await deleteReadingLogEntry(id);
    const state = get();
    set({ readingLog: state.readingLog.filter((r) => r.id !== id) });
  },

  // ---- Project Portfolio (hands-on STEM projects actually completed) ----
  async addPortfolioEntry(title, reflection, subject, driveUrl) {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;
    const dateCompleted = todayStr();
    // An invalid link must not silently take the whole entry down with
    // it — the project really was built, and losing the record over a
    // mistyped URL would be the worse failure. Bad link, no link.
    const link = normalizeEvidenceUrl(driveUrl);
    const record = {
      title: trimmedTitle,
      reflection: reflection || '',
      dateCompleted,
      subject: subject || null,
      driveUrl: link.ok ? link.url : null
    };
    const id = await savePortfolioEntry(record);
    const state = get();
    const portfolio = [{ id, ...record }, ...state.portfolio];
    set({ portfolio });
  },

  /**
   * ==================================================================
   * THE DOMAINS-LAYER ENTRY: a project that lives whole
   * (PROJECT_PLAN.md Part "Applied Learning", built Aug 9 2026)
   * ==================================================================
   *
   * The plan asked for exactly three things and said only one of them
   * was content: a repeatable research method, an entry type where a
   * project lives whole, and the domains themselves. This is thing two —
   * and it was the piece still missing on the week its first real user
   * starts, because the sun survey runs from Friday August 14.
   *
   * Built as a PORTFOLIO entry type rather than a new system, as the
   * plan specified. That is not just less code: the portfolio is already
   * what the compliance packet reads, what the Academic Center shows,
   * and what a transcript will be assembled from. A separate store would
   * have meant a fourth place records live and a fourth thing to sync.
   *
   * The seven fields ARE the engineering design cycle with source
   * evaluation welded on the front, in the plan's own words:
   *
   *   problem   — stated precisely. "The garden needs more space" is a
   *               wish; "the back buckets get 2.5 hours of sun and the
   *               front get 5 — can I raise them above 4?" is a project.
   *   known     — what he already knows before looking anything up.
   *   sources   — where he looked AND why he trusts it. The 'why' is the
   *               whole point: this is the same evidence-evaluation
   *               skill Social Studies Q2 teaches for genealogy, met a
   *               second time against a different target.
   *   finding   — what he found, in his own words. Not a quote.
   *   tried     — what he actually changed. One thing.
   *   measured  — BEFORE and AFTER, as numbers. The plan names this as
   *               the single discipline that stops the whole layer going
   *               vague, so it is a structured field rather than prose.
   *   next      — what he would change. A real result always arrives
   *               with a next move attached.
   *
   * GRADED ON PROCESS, NEVER OUTCOME. The tomato dies and the shelf is
   * crooked; that is not the failure. `processScore` counts how many of
   * the seven parts are genuinely filled in, which is the thing he
   * controls. Nothing here scores whether the number went the right way.
   */
  async addDomainProject({ domain, title, problem, known, sources, finding, tried, measuredBefore, measuredAfter, unit, next, subject, driveUrl }) {
    const trimmedTitle = (title || '').trim();
    if (!trimmedTitle) return { ok: false, reason: 'no-title' };
    const dateCompleted = todayStr();
    const link = normalizeEvidenceUrl(driveUrl);
    const project = {
      domain: domain || 'garden',
      problem: (problem || '').trim(),
      known: (known || '').trim(),
      // [{ where, whyTrusted }] — the pair is the point; a URL on its own
      // is the "go research it" failure the plan warns about.
      sources: Array.isArray(sources)
        ? sources
            .map((s) => ({ where: (s.where || '').trim(), whyTrusted: (s.whyTrusted || '').trim() }))
            .filter((s) => s.where)
        : [],
      finding: (finding || '').trim(),
      tried: (tried || '').trim(),
      measuredBefore: measuredBefore === '' || measuredBefore == null ? null : Number(measuredBefore),
      measuredAfter: measuredAfter === '' || measuredAfter == null ? null : Number(measuredAfter),
      unit: (unit || '').trim(),
      next: (next || '').trim(),
      updatedAt: new Date().toISOString()
    };
    const record = {
      title: trimmedTitle,
      // The reflection field is what every existing portfolio reader
      // already renders, so a domain project shows up sensibly in all of
      // them without a single one needing to know this type exists.
      reflection: project.problem || '',
      dateCompleted,
      subject: subject || null,
      driveUrl: link.ok ? link.url : null,
      kind: 'domain-project',
      project
    };
    const id = await savePortfolioEntry(record);
    set({ portfolio: [{ id, ...record }, ...get().portfolio] });
    return { ok: true, id };
  },

  /** Edit a domain project in place — these are worked on over weeks, not filed once. */
  async updateDomainProject(id, changes) {
    const existing = get().portfolio.find((p) => p.id === id);
    if (!existing || existing.kind !== 'domain-project') return { ok: false };
    const project = { ...(existing.project || {}), ...changes, updatedAt: new Date().toISOString() };
    const patch = { project, reflection: project.problem || existing.reflection || '' };
    await updatePortfolioEntryFields(id, patch);
    set({ portfolio: get().portfolio.map((p) => (p.id === id ? { ...p, ...patch } : p)) });
    return { ok: true };
  },

  /**
   * How complete a domain project's PROCESS is, 0-7.
   *
   * The measurement counts as one part and only when BOTH numbers exist —
   * a before with no after is the commonest way one of these quietly
   * turns back into a diary entry.
   */
  getDomainProjectProgress(entry) {
    const p = entry?.project;
    if (!p) return { done: 0, total: 7, missing: [] };
    const parts = [
      ['problem', Boolean(p.problem)],
      ['what you already knew', Boolean(p.known)],
      ['sources you trust', (p.sources || []).some((s) => s.where && s.whyTrusted)],
      ['what you found', Boolean(p.finding)],
      ['what you changed', Boolean(p.tried)],
      ['measured before and after', p.measuredBefore != null && p.measuredAfter != null],
      ['what you would change next', Boolean(p.next)]
    ];
    return {
      done: parts.filter(([, v]) => v).length,
      total: parts.length,
      missing: parts.filter(([, v]) => !v).map(([label]) => label)
    };
  },

  async removePortfolioEntry(id) {
    await deletePortfolioEntry(id);
    const state = get();
    set({ portfolio: state.portfolio.filter((p) => p.id !== id) });
  },

  /**
   * Attach (or clear) the Drive link on a portfolio entry that already
   * exists. The normal order of events is that the project gets logged
   * the day it happens and the photos get uploaded that weekend, so the
   * link has to be addable after the fact rather than only at creation.
   *
   * Returns { ok, error } so the caller can show a validation message
   * rather than failing silently.
   */
  async setPortfolioDriveUrl(id, url) {
    const link = normalizeEvidenceUrl(url);
    if (!link.ok) return link;
    await updatePortfolioEntryFields(id, { driveUrl: link.url });
    set({
      portfolio: get().portfolio.map((p) => (p.id === id ? { ...p, driveUrl: link.url } : p))
    });
    return link;
  },

  /**
   * Weekly Report: what actually happened in the last 7 days, derived
   * entirely from existing records — no separate storage. Lessons
   * mastered this week (by lastCompletedDate), writing entries, typing
   * sessions, active minutes, and days with any activity, all scoped to
   * the last 7 calendar days including today.
   */
  getWeeklyReport() {
    const state = get();
    const today = new Date();
    const cutoff = new Date(today);
    cutoff.setDate(cutoff.getDate() - 6); // last 7 days inclusive of today
    const cutoffStr = toDateStr(cutoff); // local date — toISOString() is UTC and shifted the window boundary after ~8pm ET

    const lessonsMasteredThisWeek = Object.entries(state.lessonProgress)
      .filter(([, p]) => p.mastered && p.lastCompletedDate && p.lastCompletedDate >= cutoffStr)
      .map(([lessonId]) => allLessons.find((l) => l.id === lessonId))
      .filter(Boolean);

    const writingEntriesThisWeek = state.writingEntries.filter((e) => e.completedAt?.slice(0, 10) >= cutoffStr);

    const attendanceThisWeek = Object.entries(state.allAttendance)
      .filter(([date]) => date >= cutoffStr)
      .map(([date, record]) => ({ date, ...record }));

    const totalActiveMinutes = attendanceThisWeek.reduce((sum, d) => sum + (d.activeMinutes || 0), 0);
    const totalTypingSessions = attendanceThisWeek.reduce((sum, d) => sum + (d.typingSessions || 0), 0);
    const daysActiveThisWeek = attendanceThisWeek.filter(
      (d) => d.activeMinutes > 0 || d.lessonsCompleted > 0 || d.writingEntries > 0 || d.typingSessions > 0
    ).length;

    const bySubject = {};
    for (const lesson of lessonsMasteredThisWeek) {
      bySubject[lesson.subject] = (bySubject[lesson.subject] || 0) + 1;
    }

    return {
      periodLabel: `${formatShortDate(cutoffStr)} – ${formatShortDate(todayStr())}`,
      lessonsMasteredThisWeek,
      lessonsMasteredBySubject: bySubject,
      writingEntriesThisWeek,
      totalActiveMinutes,
      totalTypingSessions,
      daysActiveThisWeek
    };
  },

  /**
   * Report Card / Transcript data: a full subject-by-subject summary
   * (lessons mastered, total lessons, percent complete) for printing or
   * exporting. Same underlying data as the Gradebook and Progress tab,
   * reorganized for a formal document rather than an interactive list.
   */
  /**
   * Letter grade cutoffs — standard scale, since Georgia's homeschool
   * standards (and colleges, eventually) grade this way.
   */
  /**
   * What a participation subject's record row says.
   *
   * Counts, not a grade — see PARTICIPATION_SUBJECTS. Every number here is
   * something he actually did and the app actually logged, and none of it is
   * framed against a target he can fall short of.
   */
  getParticipationRecord(subject) {
    const state = get();
    if (subject === 'gardening') {
      // Counts of real things done, never a score. There is no target here he
      // can fall short of — you cannot grade a boy on whether it rained, and
      // grading germination rate teaches him to fudge the log.
      const log = state.gardenLog || [];
      const kindCount = (k) => log.filter((r) => r.kind === k).length;
      return {
        sessions: kindCount('session'),
        daysInTheGarden: new Set(log.map((r) => r.date)).size,
        seasonChangeovers: kindCount('changeover'),
        sunReadings: kindCount('sun-reading'),
        plantings: kindCount('planting'),
        waterings: kindCount('watering'),
        measurements: kindCount('measurement'),
        observations: kindCount('observation'),
        harvests: kindCount('harvest'),
        entriesLogged: log.length
      };
    }
    if (subject === 'guitar') {
      // Counts of real work, never a score. This app cannot hear him play, so a
      // number here that claimed to describe HOW WELL he plays would be invented.
      // What it can honestly say is how many times he picked the thing up, which
      // for a boy who is not self-disciplined with it is the number that matters.
      const log = state.guitarLog || [];
      const kindCount = (k) => log.filter((r) => r.kind === k).length;
      const practiceRows = log.filter((r) => r.kind === 'practice');
      return {
        practiceSessions: practiceRows.length,
        daysPractised: new Set(practiceRows.map((r) => r.date)).size,
        minutesPractised: practiceRows.reduce((n, r) => n + (Number(r.data?.minutes) || 0), 0),
        theoryItemsRead: new Set(
          log.filter((r) => r.kind === 'theory').map((r) => r.data?.itemId || r.theoryId)
        ).size,
        skillsCleared: new Set(
          log.filter((r) => r.kind === 'skill-cleared').map((r) => r.data?.skillNumber)
        ).size,
        songsChosen: kindCount('song-picked'),
        songsLearned: kindCount('song-learned'),
        recordings: kindCount('recording'),
        entriesLogged: log.length
      };
    }
    if (subject !== 'pe') return null;
    const goals = Object.values(state.peWeeklyGoals || {});
    return {
      workouts: state.peWorkoutLog.length,
      daysTracked: Object.keys(state.peDailyLog || {}).length,
      mealsLogged: state.peMeals.length,
      weeklyGoalsSet: goals.length,
      weeklyGoalsMet: goals.filter((g) => g.achieved).length,
      checkIns: state.peBodyMetrics.length
    };
  },

  /**
   * ==================================================================
   * ENGINEER READINESS, AS A RECORD. (Aug 28, 2026.)
   * ==================================================================
   *
   * The parent: *"how to use the engineer readiness in the parent dashboard.
   * that isn't connected to anything."*
   *
   * It was not. Eleven skills, three levels, a written rubric and a dated
   * history of every level change — read by her awarding screen and a counter
   * on his rewards page, and by nothing else. No record carried it.
   *
   * ---- WHY THIS IS A SEPARATE GETTER AND NOT A ROW IN getReportCardData ----
   *
   * Because `getReportCardData()` returns the array every average is computed
   * from. A readiness row inside it would be one careless `.filter()` away from
   * moving his GPA, and six screens read that shape. Keeping readiness in its
   * own getter means it CANNOT reach a grade — not "is not currently reaching
   * one". `verify-readiness-record.mjs` asserts the separation from both ends.
   *
   * This is the same reasoning that keeps participation subjects flagged
   * `isParticipation` rather than silently zeroed: the record should say what
   * kind of thing it is.
   */
  /**
   * What he has already BUILT, by project id — so a mission that duplicates a
   * project can say so at the moment she chooses it. (Aug 29, 2026.)
   *
   * A hands-on project is finished by writing it up: the Writing Journal entry
   * carries the project's id as its `promptId`, and her grade. That entry IS
   * the completion record, so this reads it rather than inventing a second one.
   *
   * Most recent write-up per project wins — a redo should report the redo.
   */
  getProjectCompletions() {
    const out = {};
    for (const entry of get().writingEntries || []) {
      const id = entry?.promptId;
      if (!id) continue;
      const when = entry.completedAt || entry.gradedAt || '';
      const prior = out[id];
      if (prior && String(prior.completedAt || '') >= String(when)) continue;
      out[id] = { completedAt: when || null, grade: entry.grade || null };
    }
    return out;
  },

  getReadinessRecord() {
    const awards = get().readinessAwards || {};
    const skills = READINESS_SKILLS.map((skill) => {
      const award = awards[skill.id];
      const level = award?.level || null;
      // A row written before the history array existed still knows its date.
      const history = Array.isArray(award?.history) && award.history.length
        ? award.history
        : level && award?.updatedAt
          ? [{ level, at: award.updatedAt }]
          : [];
      return {
        id: skill.id,
        name: skill.name,
        icon: skill.icon,
        level,
        // Never invented. An unawarded skill reports null and the screen says
        // so — the rule participationRecord.js already enforces for the packet.
        criteria: level ? skill.levels?.[level] || null : null,
        note: award?.note || '',
        awardedAt: award?.updatedAt || null,
        history
      };
    });
    return {
      skills,
      awardedCount: skills.filter((s) => s.level).length,
      totalCount: skills.length,
      // Stated on the object itself so a future caller cannot mistake this for
      // something that belongs in an average.
      isGraded: false
    };
  },

  getReportCardData() {
    const state = get();
    const subjects = get().getAllSubjectsForRecordkeeping();
    return subjects.map((subject) => {
      // A participation subject short-circuits the whole lesson-accuracy
      // pipeline below. Every field the grade path returns is still present
      // and zeroed, because six screens read this shape and a missing
      // strands or needsAttention would throw rather than degrade.
      if (PARTICIPATION_SUBJECTS.includes(subject)) {
        return {
          subject,
          isParticipation: true,
          participation: get().getParticipationRecord(subject),
          letterGrade: null,
          averageAccuracy: null,
          attemptedCount: 0,
          totalLessons: 0,
          mastered: 0,
          needsAttention: [],
          strands: [],
          khanGradedCount: 0,
          khanAverage: null,
          lessonAverage: null,
          assignmentGradedCount: 0,
          assignmentAverage: null,
          wordStudyQuarters: [],
          assessedCount: 0
        };
      }
      const subjectLessons = allLessons.filter((l) => l.subject === subject);
      /**
       * ==================================================================
       * THIS YEAR'S WORK ONLY. (Aug 10, 2026.)
       * ==================================================================
       *
       * The parent: "Remove that preschool grade."
       *
       * His Math grade was an F built from exactly one thing: `Fuel Tank
       * Fractions`, attempted once, scored 0%, on **23 July 2026** -- eleven
       * days BEFORE the school year starts on 3 August. Pre-year poking around,
       * sitting in this year's record as the only assessment in the subject and
       * about to be averaged against every Khan score she enters.
       *
       * Fixed as a RULE rather than by deleting that row: a report card counts
       * the work done inside the school year. That is a sentence she can say to
       * a reviewer; "we dropped a bad score" is not. The attempt stays visible
       * in the Gradebook as work he did -- it just is not in this year's
       * average.
       */
      const attemptedLessons = subjectLessons.filter(
        (l) => state.lessonProgress[l.id] && inSchoolYear(state.lessonProgress[l.id].lastCompletedDate)
      );
      const mastered = subjectLessons.filter((l) => state.lessonProgress[l.id]?.mastered).length;

      /**
       * ==================================================================
       * KHAN SCORES COUNT TOWARD THE SUBJECT GRADE. (Aug 10, 2026.)
       * ==================================================================
       *
       * The parent: "The grades from Kahn Academy arent being saved anywhere."
       *
       * They were being saved. setKhanAcademyAssignmentPercent wrote
       * gradePercent and a letter to the row, correctly, and had done all
       * along. NOTHING READ THEM BACK. This function -- the source for the
       * report card, the transcript download, the compliance packet and the
       * student's own grades screen -- computed every subject's grade from
       * lessonProgress alone.
       *
       * For Aerospace or Social Studies that was fine: those subjects are
       * taught by Mission Control's own lessons. For MATH, SCIENCE and
       * LANGUAGE ARTS it was not, because all three are taught on Khan
       * Academy this year and he does no Mission Control lessons in them.
       * attemptedLessons.length === 0 meant letterGrade = null, so she could
       * enter Khan percentages every week for a year and the report card
       * would still read "Not yet graded" -- for three of the five subjects
       * Georgia actually requires.
       *
       * A grade written to a row that no record reads is not a grade.
       *
       * EQUAL WEIGHT PER ASSESSMENT, deliberately. One graded Khan unit test
       * counts the same as one Mission Control lesson. Any other weighting is
       * a judgement someone has to defend to a reviewer, and there is no
       * honest basis for calling a Khan unit test 0.7 of a lesson. Both
       * numbers are also reported separately, so the blend is never something
       * she has to take on trust.
       *
       * Rows graded gradedBy: 'project' carry a letter and no percentage -- a
       * Tinkercad build has no Khan score -- and the numeric filter drops them
       * rather than counting them as a zero.
       */
      const khanGraded = (state.khanAcademyAssignments || []).filter(
        (a) =>
          canonicalSubject(a.subject) === subject &&
          typeof a.gradePercent === 'number' &&
          Number.isFinite(a.gradePercent) &&
          inSchoolYear(a.completedAt || a.gradedAt)
      );
      const khanAverage =
        khanGraded.length > 0
          ? khanGraded.reduce((acc, a) => acc + a.gradePercent / 100, 0) / khanGraded.length
          : null;

      const lessonAverage =
        attemptedLessons.length > 0
          ? attemptedLessons.reduce((acc, l) => acc + (state.lessonProgress[l.id]?.bestAccuracy ?? 0), 0) /
            attemptedLessons.length
          : null;

      /**
       * BOOK REPORTS AND RESEARCH PAPERS COUNT. (Aug 10, 2026.)
       *
       * The parent: "How are we testing reading and literature?" The honest
       * answer was: barely. His novels carry real due dates and real graded
       * reports in the Academic Success Center -- and those grades reached the
       * subject grade through nothing at all, the same gap the Khan rows had
       * one table over.
       *
       * They are graded against a rubric, so they carry a LETTER and no
       * percentage. letterToPercent() takes the middle of the band, never the
       * top: taking the top would inflate every rubric-graded piece of work by
       * up to three points against the scored work it sits beside, all year, in
       * one direction.
       *
       * They count toward the SUBJECT and not toward either strand. A book
       * report is plainly reading, a research paper is plainly writing, and
       * `type` does not reliably say which — so rather than guess a strand and
       * be quietly wrong on the diagnosis screen, they are counted where they
       * are certainly right.
       */
      const assignmentGraded = (state.academicAssignments || [])
        .map((a) => ({ a, pct: canonicalSubject(a.subject) === subject ? letterToPercent(a.grade) : null }))
        .filter((r) => r.pct !== null && inSchoolYear(r.a.completedAt || r.a.gradedAt));
      const assignmentAverage =
        assignmentGraded.length > 0
          ? assignmentGraded.reduce((acc, r) => acc + r.pct / 100, 0) / assignmentGraded.length
          : null;

      /**
       * ==================================================================
       * WEEKLY SPELLING AND VOCABULARY, ONE GRADE PER QUARTER PER SKILL.
       * (Aug 10, 2026 — the parent's choice.)
       * ==================================================================
       *
       * He does word study four or five days a week, all year — the most
       * consistent habit on his timetable — and it counted toward nothing.
       *
       * Counting all 72 Friday tests would have made a fifteen-minute ten-word
       * quiz roughly 40% of his English grade, because this app weights every
       * assessment equally and has no "quizzes count less than tests" category.
       * So each quarter's tests average to ONE number per skill: eight to ten
       * grades a year, proportionate to a Khan unit test or a book report, and
       * one missed Friday cannot dent the record.
       *
       * Spelling is encoding and mechanics -> Grammar & Writing.
       * Vocabulary is word meaning -> Reading & Literature, which is where the
       * app already files "Roots, prefixes and suffixes".
       *
       * Every individual week is still in the Spelling & Vocabulary section.
       * This is the grade; that is the record.
       */
      const wordStudyByStrand = { 'language-arts': [], reading: [] };
      if (subject === 'reading') {
        for (const [skill, strandId] of [['spelling', 'language-arts'], ['vocabulary', 'reading']]) {
          const history = (state.weeklyWords?.[skill]?.quizHistory || []).filter((r) => inSchoolYear(r.date));
          for (const q of quizAveragesByQuarter(history, quarterLabelForDate)) {
            wordStudyByStrand[strandId].push({ skill, ...q });
          }
        }
      }
      const wordStudyQuarters = [...wordStudyByStrand['language-arts'], ...wordStudyByStrand.reading];

      /**
       * WRITING ENTRIES NOW COUNT. (Aug 13, 2026.)
       *
       * They did not, and nothing said so. The parent read every entry and
       * picked a letter, and that letter reached the Portfolio display and
       * stopped — not the report card, not the transcript, not the gradebook,
       * not the compliance packet. This is the identical failure already found
       * and fixed for self-explanations in August ("a letter that landed in a
       * row and stopped"), sitting one table away, unnoticed.
       *
       * ---- THREE THINGS FIXED HERE ON Aug 23, 2026 ----
       *
       * 1. **The one-tap letter now carries a percentage.** This block used to
       *    say a letter "does not" produce one and that inventing it "would put
       *    a number she never chose into a legal record". Book reports and
       *    reflections both do exactly that, and the note below said outright
       *    that both positions could not be right. `gradeWritingEntry` now
       *    converts through `letterToPercent`, so the Mission Control Board's
       *    grades finally arrive here instead of stopping at the row.
       *
       * 2. **The school year is now applied.** Every other source in this
       *    function tests `inSchoolYear` — lessons, Khan, assignments, word
       *    study, reflections. Writing was the one that did not, so an entry
       *    graded before Aug 3 2026 still counted. That rule exists because
       *    the parent said "Remove that preschool grade"; it now covers all six.
       *
       * 3. **The subject goes through `canonicalSubject`.** Harmless while
       *    every prompt said `reading`, but the project pools brought in
       *    aerospace, technology and robotics — and those must land on the
       *    same subject ids the rest of the report card uses.
       */
      const writingGraded = (state.writingEntries || []).filter(
        (e) =>
          canonicalSubject(subjectOfWritingEntry(e)) === subject &&
          Number.isFinite(e.gradePercent) &&
          inSchoolYear(e.gradedAt || e.completedAt)
      );

      /**
       * ==================================================================
       * "IN HIS OWN WORDS" NOW COUNTS. (Aug 21, 2026.)
       * ==================================================================
       *
       * The parent: **"In HIs own words isn't graded?"** — and, asked how she
       * wanted it, she chose *grade it, and make it count*.
       *
       * The history matters, because this is the third position this app has
       * held. It was graded; on Aug 9 she said *"I am wonder if it is useful to
       * have this graded"* and she was right — the letter reached the Portfolio
       * and stopped, costing her a Sunday for a record nobody would read. So it
       * became read-and-reply. What changed since is his writing: the
       * reflections behind the first decision were "fortnit" and "mile stone";
       * the ones on screen now are 26 to 43 word paragraphs.
       *
       * **A grade that reaches no average is the thing she removed. So this one
       * reaches the average.**
       *
       * COUNTED BY LETTER, THROUGH letterToPercent — the same path book reports
       * and research papers take, middle of the band and never the top.
       *
       * NOTE THE INCONSISTENCY, because it is real and one table away:
       * `writingGraded` above deliberately refuses this, on the grounds that
       * "inventing a percentage from a letter would put a number she never
       * chose into a legal record", while `assignmentGraded` has done exactly
       * that for book reports since Aug 10. Both cannot be right. This follows
       * the assignment precedent because that is the one already in the
       * transcript, and the disagreement is written down rather than quietly
       * settled a third way.
       *
       * TO THE SUBJECT, NOT TO A STRAND — same reasoning as book reports. A
       * reflection can hang off any lesson in any subject, so guessing which
       * half of English it belongs to would be quietly wrong on the diagnosis
       * screen.
       */
      const reflectionGraded = (state.selfExplanations || [])
        .map((e) => ({
          e,
          // subjectOfReflection, not LESSON_SUBJECT — the two signature-game
          // reflections carry a game id that no lesson owns. See the note on
          // GAME_REFLECTION_SUBJECT above.
          pct: canonicalSubject(subjectOfReflection(e.lessonId)) === subject ? letterToPercent(e.grade) : null
        }))
        .filter((r) => r.pct !== null && inSchoolYear(r.e.gradedAt || r.e.completedAt));

      /**
       * ==================================================================
       * REFLECTIONS ARE COLLAPSED PER QUARTER. (Aug 23, 2026.)
       * ==================================================================
       *
       * The parent, asked directly: *cap reflections, and weight exams.*
       *
       * Measured before changing anything. In Aerospace: 54 Mission Control
       * lessons, 5 quarterly exams, and up to **98 reflection prompts** — so
       * reflections were **64% of the subject grade** and a Quarterly Exam was
       * **0.7%** of it. Technology 55%, Social Studies 46%, Robotics 64%.
       * Because this app weights every assessment equally, adding reflections
       * on Aug 21 quietly made a one-paragraph "explain it in your own words"
       * the dominant assessment in four subjects.
       *
       * This is the SAME fault the Friday word tests already had and the same
       * fix: `wordStudyQuarters` collapses 72 ten-word quizzes into ~10 grades
       * a year, with the reasoning that "counting all 72 would have made a
       * fifteen-minute ten-word quiz roughly 40% of his English grade".
       * Reflections now collapse the same way — **one grade per quarter per
       * subject, the average of that quarter's reflections.** Four or five
       * grades a year, proportionate to a book report.
       *
       * Nothing is thrown away. Every individual reflection is still on the
       * Mission Control Board and in the portfolio, with her letter on it.
       * This is the grade; that is the record.
       */
      const reflectionByQuarter = new Map();
      for (const r of reflectionGraded) {
        const label = quarterLabelForDate(
          String(r.e.gradedAt || r.e.completedAt || '').slice(0, 10)
        );
        if (!label) continue;
        const b = reflectionByQuarter.get(label) || { label, total: 0, count: 0 };
        b.total += r.pct;
        b.count += 1;
        reflectionByQuarter.set(label, b);
      }
      const reflectionQuarters = [...reflectionByQuarter.values()].map((b) => ({
        quarter: b.label,
        reflections: b.count,
        percent: Math.round(b.total / b.count)
      }));

      /**
       * ==================================================================
       * A QUARTERLY EXAM WEIGHS WHAT THE QUARTER WEIGHS. (Aug 23, 2026.)
       * ==================================================================
       *
       * Her second instruction in the same answer. Before this, the exam that
       * covers a whole quarter of Aerospace was one score in a list of 152 —
       * literally 0.7% of the subject grade, less than a single reflection
       * pair. A student could fail every quarterly exam and finish with an A.
       *
       * So `allScores` carries a WEIGHT now, and an exam's weight is the
       * number of that quarter's ordinary lessons he actually sat. An exam
       * therefore counts for as much as the quarter it tests — which is what
       * "quarterly exam" has always meant everywhere except in this average.
       *
       * Everything else stays at weight 1, so no other proportion moves.
       */
      const lessonsSatInQuarter = new Map();
      for (const l of attemptedLessons) {
        if (l.isQuarterlyExam || !l.quarter) continue;
        lessonsSatInQuarter.set(l.quarter, (lessonsSatInQuarter.get(l.quarter) || 0) + 1);
      }
      const examWeight = (lesson) => Math.max(1, lessonsSatInQuarter.get(lesson.quarter) || 1);

      /**
       * ==================================================================
       * A MISSION GRADES THE SUBJECTS IT NAMES. (Aug 26, 2026, O-6(a).)
       * ==================================================================
       *
       * The seventh grade source, and the one the compliance packet already
       * calls *"the assessment evidence — it stands in for the standardized
       * testing this family deliberately does not do."* It reached no subject
       * average at all until today, so the app's own primary assessment
       * counted for nothing on the transcript while a book report counted.
       *
       * Not an oversight in the design — the design said to do this. Every
       * proposal in missionEvaluations.js carries a `subjects` array under a
       * comment reading *"a mission that only touches Aerospace grades
       * Aerospace."* Nothing had ever read it.
       *
       * WEIGHT: the parent's decision, asked with the arithmetic in front of
       * her — **the same as a quarterly exam.** `examWeight` is the number of
       * ordinary lessons in that quarter, so a mission counts for as much as
       * the quarter it belongs to. At weight 1 four whole projects would be
       * 3.9% of Aerospace, which is the exact failure she already ruled on for
       * exams: he could fail every one and finish with an A.
       */
      /**
       * "AS MUCH AS THE QUARTER" HAS TO MEAN THAT IN EVERY SUBJECT.
       *
       * `examWeight` counts a quarter's ordinary LESSONS, which is right for
       * the four subjects that have quarterly exams and useless for the three
       * that do not. Maths, Reading and Science carry no quarter-tagged
       * lessons at all — they run on Khan Academy — so a lessons-only weight
       * would silently hand a maths mission weight 1 while an aerospace
       * mission got eleven. Same rule, wildly different answers, and nothing
       * would have said so.
       *
       * So a mission's weight is everything this subject actually recorded in
       * that quarter: the lessons he sat plus the Khan units she graded.
       */
      const khanGradedInQuarter = new Map();
      for (const a of khanGraded) {
        if (!a.batchLabel) continue;
        khanGradedInQuarter.set(a.batchLabel, (khanGradedInQuarter.get(a.batchLabel) || 0) + 1);
      }
      const missionRows = missionScoresForSubject(subject, state.missionEvaluations, {
        weightFor: (quarterLabel) =>
          Math.max(
            1,
            (lessonsSatInQuarter.get(quarterLabel) || 0) + (khanGradedInQuarter.get(quarterLabel) || 0)
          ),
        inSchoolYear
      });

      const allScores = [
        ...attemptedLessons.map((l) => ({
          value: state.lessonProgress[l.id]?.bestAccuracy ?? 0,
          weight: l.isQuarterlyExam ? examWeight(l) : 1
        })),
        ...missionRows.map((m) => ({ value: m.value, weight: m.weight })),
        ...khanGraded.map((a) => ({ value: a.gradePercent / 100, weight: 1 })),
        ...assignmentGraded.map((r) => ({ value: r.pct / 100, weight: 1 })),
        ...wordStudyQuarters.map((q) => ({ value: q.percent / 100, weight: 1 })),
        ...writingGraded.map((e) => ({ value: e.gradePercent / 100, weight: 1 })),
        ...reflectionQuarters.map((q) => ({ value: q.percent / 100, weight: 1 }))
      ];

      let averageAccuracy = null;
      let letterGrade = null;
      if (allScores.length > 0) {
        const weightTotal = allScores.reduce((acc, s) => acc + s.weight, 0);
        averageAccuracy = allScores.reduce((acc, s) => acc + s.value * s.weight, 0) / weightTotal;
        letterGrade = accuracyToLetterGrade(averageAccuracy);
      }

      // "Needs attention" — attempted lessons scoring below a C (80%),
      // so a parent can see exactly what's dragging the grade down, not
      // just the aggregate number.
      const needsAttention = attemptedLessons
        .map((l) => ({ lessonId: l.id, title: l.title, bestAccuracy: state.lessonProgress[l.id]?.bestAccuracy ?? 0 }))
        .filter((l) => l.bestAccuracy < 0.8)
        .sort((a, b) => a.bestAccuracy - b.bestAccuracy);

      /**
       * Strand breakdown — one grade on the record, two numbers where
       * decisions get made.
       *
       * From the parent's question about Language Arts (Aug 6, 2026):
       * an 80% that is 95/65 and an 80% that is 80/80 are identical on a
       * report card and mean completely different things about what he
       * needs Tuesday morning. Merging Reading and Language Arts was
       * right for the transcript; letting it merge the diagnosis too
       * would not have been.
       *
       * Computed the same way as the subject grade so the numbers are
       * comparable, and returned as [] for any subject without strands —
       * which is every subject but this one, so nothing else changes.
       */
      const strands = strandsForSubject(subject)
        .map((strand) => {
          const inStrand = subjectLessons.filter((l) => l.strand === strand.id);
          const attempted = inStrand.filter(
            (l) => state.lessonProgress[l.id] && inSchoolYear(state.lessonProgress[l.id].lastCompletedDate)
          );
          /**
           * KHAN UNITS BELONG TO A STRAND TOO. (Aug 10, 2026.)
           *
           * The breakdown counted Mission Control lessons only, so on the same
           * card the grade read "B, 80%" and both strands underneath it read
           * "Not started" -- the card contradicting itself, because every piece
           * of ELA work this year is a Khan unit and none of it reached here.
           *
           * Which strand a Khan row belongs to is not a guess: the ten Q1 units
           * ARE Khan's Grammar course, identified by URL in
           * data/khan/grammarCourseOrder.js, and that is the grammar-and-writing
           * half by definition. Everything else on the ELA track is a thematic
           * reading unit or a vocabulary course, which is the reading half.
           */
          const strandKhan = khanGraded.filter((a) => khanStrandFor(subject, a) === strand.id);
          const strandWords = wordStudyByStrand[strand.id] || [];
          const strandScores = [
            ...attempted.map((l) => state.lessonProgress[l.id]?.bestAccuracy ?? 0),
            ...strandKhan.map((a) => a.gradePercent / 100),
            ...strandWords.map((q) => q.percent / 100)
          ];
          if (strandScores.length === 0) {
            return {
              id: strand.id,
              label: strand.label,
              attemptedCount: 0,
              totalLessons: inStrand.length,
              mastered: 0,
              khanGradedCount: 0,
              wordStudyQuarters: 0,
              averageAccuracy: null,
              letterGrade: null
            };
          }
          const strandAvg = strandScores.reduce((acc, n) => acc + n, 0) / strandScores.length;
          return {
            id: strand.id,
            label: strand.label,
            attemptedCount: attempted.length,
            totalLessons: inStrand.length,
            mastered: inStrand.filter((l) => state.lessonProgress[l.id]?.mastered).length,
            khanGradedCount: strandKhan.length,
            wordStudyQuarters: strandWords.length,
            averageAccuracy: strandAvg,
            letterGrade: accuracyToLetterGrade(strandAvg)
          };
        })
        // A strand with no lessons at all is a data problem, not
        // something to render as an empty row.
        .filter((strand) => strand.totalLessons > 0);

      return {
        subject,
        letterGrade,
        averageAccuracy,
        attemptedCount: attemptedLessons.length,
        totalLessons: subjectLessons.length,
        mastered,
        needsAttention,
        strands,
        // The blend, broken out. `attemptedCount` deliberately still means
        // Mission Control lessons only -- several screens print it against
        // `totalLessons` and changing what it counts would make every one of
        // those sentences wrong. `assessedCount` is the honest "is there any
        // grade here at all", and it is what decides whether a subject shows.
        khanGradedCount: khanGraded.length,
        khanAverage,
        lessonAverage,
        assignmentGradedCount: assignmentGraded.length,
        assignmentAverage,
        wordStudyQuarters,
        /**
         * THE OTHER TWO SOURCES, COUNTED. (Aug 23, 2026.)
         *
         * `getReportCardData` averaged six things and reported counts for
         * four. Writing entries and reflections were in the number and in no
         * count, so no screen could name them even if it wanted to — the data
         * simply was not returned. The transcript's evidence line was the
         * visible consequence: a subject graded entirely by book reports and
         * journal work printed "Grade: B — Curriculum: No graded work
         * recorded", contradicting itself in a document a college reads.
         */
        writingGradedCount: writingGraded.length,
        reflectionQuarters,
        reflectionGradedCount: reflectionGraded.length,
        /**
         * THE SEVENTH SOURCE, COUNTED THE SAME WAY — and for the same reason
         * the comment above gives. A source that moves the grade and appears
         * in no count is a source no screen can name, which is how a subject
         * came to print "Grade: B — Curriculum: No graded work recorded".
         * Missions are now the heaviest single item in a quarter; they must
         * be the least deniable thing on the evidence line, not the most.
         */
        missionGradedCount: missionRows.length,
        missionRows,
        missionEvidence: missionEvidencePhrase(missionRows),
        assessedCount: allScores.length
      };
    });
  },

  /**
   * Marks one Khan Academy Assignment (a single skill, not a whole
   * subject) complete and records the A-F grade the parent assigns based
   * on what Khan Academy displayed on screen after the exercise —
   * Mastered=A, Proficient=A-/B+, Familiar 90-99%=B, Familiar 70-89%=C,
   * below 70% or heavy hint use=D, not completed=F/hold. This is a
   * manual grade, not computed automatically — Khan Academy has no
   * public API to pull real scores into this app (confirmed: their API
   * was deprecated in 2020 and hasn't returned).
   */
  // -------------------------------------------------------------------
  // Academic Success Center (PROJECT_PLAN.md Part 9 — v1: Books,
  // Assignments, Portfolio).
  //
  // Two clear roles, deliberately kept separate in these actions:
  //   PARENT sets up real content — book title/author, assignment
  //     title/topic, optional due date, custom books/assignments she
  //     adds herself, and the letter grade after reading finished work.
  //   STUDENT moves status forward — not-started → in-progress →
  //     completed — and earns XP for it.
  // A slot with no real title stays 'empty'/'placeholder' and is never
  // presented to the student as work, which is the same honesty rule
  // the old preview-only version enforced.
  // -------------------------------------------------------------------

  /**
   * Parent fills in (or edits) a real book. Passing a real title
   * promotes an 'empty' slot to 'not-started'; clearing the title back
   * to blank demotes it to 'empty' again so it can't sit in the
   * student's list as a nameless book.
   */
  async updateAcademicBook(id, { title, author, type, note }) {
    const state = get();
    const existing = state.academicBooks.find((b) => b.id === id);
    if (!existing) return;

    const nextTitle = title === undefined ? existing.title : title.trim() || null;
    const changes = {
      title: nextTitle,
      author: author === undefined ? existing.author : author.trim() || null,
      type: type === undefined ? existing.type : type,
      note: note === undefined ? existing.note : note
    };

    // Status follows the title, but only across the empty/not-started
    // boundary — never knock a book he's already reading or has
    // finished back down just because the parent fixed a typo.
    if (!nextTitle) {
      changes.status = 'empty';
      changes.startedAt = null;
      changes.completedAt = null;
    } else if (existing.status === 'empty') {
      changes.status = 'not-started';
    }

    const academicBooks = state.academicBooks.map((b) => (b.id === id ? { ...b, ...changes } : b));
    set({ academicBooks });
    await updateAcademicBookRecord(id, changes);
  },

  /**
   * ==================================================================
   * CHANGE THE BOOK ON A READING ASSIGNMENT. (Aug 28, 2026.)
   * ==================================================================
   *
   * The parent: *"There is a book report and the book is Hatchet. Can I change
   * that book to another book that is in his book list?"*
   *
   * She could not — nothing in the app retitled a seeded assignment. Nineteen
   * books are scheduled across the year, so the alternative was asking me to
   * edit code nineteen times.
   *
   * All of the reasoning is in `lib/bookSwap.js` as pure functions, because a
   * guard cannot execute a component. This action is only the write.
   *
   * Returns the plan either way, so the caller can show her exactly what
   * changed — or, when it refuses, why. It never half-applies: the reading
   * assignment and its book report move together or neither moves.
   */
  async changeAssignmentBook(assignmentId, newBook) {
    const state = get();
    const plan = planBookSwap({
      assignmentId,
      newBook,
      assignments: state.academicAssignments,
      library: state.academicBooks
    });
    if (!plan.ok) return plan;

    await Promise.all(
      plan.changes.map((c) => updateAcademicAssignmentRecord(c.id, { title: c.to }))
    );
    const byId = new Map(plan.changes.map((c) => [c.id, c.to]));
    set({
      academicAssignments: state.academicAssignments.map((a) =>
        byId.has(a.id) ? { ...a, title: byId.get(a.id) } : a
      )
    });
    return plan;
  },

  /**
   * Student (or parent) moves a book's reading status. Only awards XP
   * on the transition INTO 'completed', and only once — re-marking a
   * finished book doesn't farm XP.
   */
  async setAcademicBookStatus(id, status) {
    const state = get();
    const existing = state.academicBooks.find((b) => b.id === id);
    if (!existing || !existing.title) return; // a nameless slot isn't a real book yet

    const now = new Date().toISOString();
    const changes = { status };
    if (status === 'in-progress' && !existing.startedAt) changes.startedAt = now;
    if (status === 'completed') changes.completedAt = now;
    if (status === 'not-started') {
      changes.startedAt = null;
      changes.completedAt = null;
    }

    const isNewCompletion = status === 'completed' && existing.status !== 'completed';
    const academicBooks = state.academicBooks.map((b) => (b.id === id ? { ...b, ...changes } : b));

    if (isNewCompletion) {
      const xp = state.xp + ACADEMIC_BOOK_COMPLETION_XP;
      const currentRank = getCurrentRank(xp, totalMasteredCount(state));
      set({ academicBooks, xp, currentRank });
      await Promise.all([
        updateAcademicBookRecord(id, changes),
        saveMeta({ xp, streak: state.streak, lastActiveDate: state.lastActiveDate })
      ]);
      return;
    }

    set({ academicBooks });
    await updateAcademicBookRecord(id, changes);
  },

  /**
   * Adds a book from the curated Black American Excellence Library
   * (Part 9) into a subject's library in one click.
   *
   * Prefers to FILL that subject's empty Black-Excellence slot rather
   * than create a second row next to it — otherwise picking a book
   * would leave the slot sitting there still reading "no book yet,"
   * which is exactly the kind of stale-looking state this Center is
   * supposed to eliminate. Falls back to a custom row when the slot is
   * already taken (she can keep more than one).
   *
   * Refuses duplicates by title within the same subject, so tapping Add
   * twice can't quietly produce two copies of the same book.
   */
  async addRecommendedBook(subject, recommendation) {
    const state = get();
    const normalized = recommendation.title.trim().toLowerCase();
    const alreadyThere = state.academicBooks.some(
      (b) => b.subject === subject && (b.title || '').trim().toLowerCase() === normalized
    );
    if (alreadyThere) return null;

    const openSlot = state.academicBooks.find(
      (b) => b.subject === subject && b.blackExcellence && !b.title
    );

    if (openSlot) {
      const changes = {
        title: recommendation.title,
        author: recommendation.author,
        status: 'not-started'
      };
      set({ academicBooks: state.academicBooks.map((b) => (b.id === openSlot.id ? { ...b, ...changes } : b)) });
      await updateAcademicBookRecord(openSlot.id, changes);
      return { ...openSlot, ...changes };
    }

    return get().addCustomAcademicBook(subject, {
      type: 'Recommended',
      title: recommendation.title,
      author: recommendation.author,
      note: recommendation.about
    });
  },

  /**
   * Parent approves the book the app suggested for a slot — the "agree"
   * half of Part 9's approval workflow, and the normal way a slot gets
   * filled. Same effect as typing the title in by hand, minus the typing.
   */
  async approveBookRecommendation(bookId, recommendation) {
    const state = get();
    const existing = state.academicBooks.find((b) => b.id === bookId);
    if (!existing) return;

    const changes = {
      title: recommendation.title,
      author: recommendation.author,
      status: existing.status === 'empty' ? 'not-started' : existing.status,
      approvedRecommendationId: recommendation.id
    };
    set({ academicBooks: state.academicBooks.map((b) => (b.id === bookId ? { ...b, ...changes } : b)) });
    await updateAcademicBookRecord(bookId, changes);
  },

  /**
   * Parent turns down a suggestion — the "disagree" half. The rejection
   * is REMEMBERED on the row, so the next suggestion moves up and the
   * one she said no to never comes back. Without persisting this, a
   * rejected book would reappear on the next page load, which would make
   * the whole approve/reject flow feel broken.
   */
  async rejectBookRecommendation(bookId, recommendationId) {
    const state = get();
    const existing = state.academicBooks.find((b) => b.id === bookId);
    if (!existing) return;

    const prior = existing.rejectedRecommendationIds || [];
    if (prior.includes(recommendationId)) return;
    const changes = { rejectedRecommendationIds: [...prior, recommendationId] };

    set({ academicBooks: state.academicBooks.map((b) => (b.id === bookId ? { ...b, ...changes } : b)) });
    await updateAcademicBookRecord(bookId, changes);
  },

  /**
   * Puts every turned-down suggestion for a slot back on the table.
   * Rejections are permanent by design, so there has to be a way back
   * if she changes her mind or wants to see the options again.
   */
  async resetBookRecommendations(bookId) {
    const state = get();
    const changes = { rejectedRecommendationIds: [] };
    set({ academicBooks: state.academicBooks.map((b) => (b.id === bookId ? { ...b, ...changes } : b)) });
    await updateAcademicBookRecord(bookId, changes);
  },

  /**
   * Parent says how long the book actually is — the one fact the app
   * cannot know and will not guess. Without it there is no reading plan
   * and the UI asks for the number instead of inventing a length.
   */
  async setBookPacing(bookId, { totalUnits, unit }) {
    const state = get();
    const existing = state.academicBooks.find((b) => b.id === bookId);
    if (!existing) return;

    const parsed = Number.parseInt(totalUnits, 10);
    const changes = {
      totalUnits: Number.isInteger(parsed) && parsed > 0 ? parsed : null,
      unit: unit || existing.unit || 'chapters'
    };
    set({ academicBooks: state.academicBooks.map((b) => (b.id === bookId ? { ...b, ...changes } : b)) });
    await updateAcademicBookRecord(bookId, changes);
  },

  /**
   * Student records how far he's actually read. Clamped to the real
   * length so progress can't exceed the book, and marking the last
   * chapter finishes the book outright — he shouldn't have to say he's
   * done twice.
   */
  async recordBookProgress(bookId, unitsDone) {
    const state = get();
    const existing = state.academicBooks.find((b) => b.id === bookId);
    if (!existing || !existing.title) return;

    const max = existing.totalUnits || Number.MAX_SAFE_INTEGER;
    const clamped = Math.max(0, Math.min(Number(unitsDone) || 0, max));

    const changes = { unitsDone: clamped };
    if (clamped > 0 && existing.status === 'not-started') changes.status = 'in-progress';

    const finishing = existing.totalUnits && clamped >= existing.totalUnits && existing.status !== 'completed';
    if (finishing) {
      changes.status = 'completed';
      changes.completedAt = new Date().toISOString();
    }

    const academicBooks = state.academicBooks.map((b) => (b.id === bookId ? { ...b, ...changes } : b));

    if (finishing) {
      const xp = state.xp + ACADEMIC_BOOK_COMPLETION_XP;
      const currentRank = getCurrentRank(xp, totalMasteredCount(state));
      set({ academicBooks, xp, currentRank });
      await Promise.all([
        updateAcademicBookRecord(bookId, changes),
        saveMeta({ xp, streak: state.streak, lastActiveDate: state.lastActiveDate })
      ]);
      return;
    }

    set({ academicBooks });
    await updateAcademicBookRecord(bookId, changes);
  },

  /**
   * Family Favorite — Part 9's "Mark books as: Required, Recommended,
   * Optional, Reference, Family Favorite."
   *
   * Kept as a separate flag rather than a sixth `type`, because a book
   * can be both Required AND a favorite. Folding it into type would
   * force a false choice.
   */
  async toggleBookFavorite(bookId) {
    const state = get();
    const existing = state.academicBooks.find((b) => b.id === bookId);
    if (!existing || !existing.title) return;
    const changes = { favorite: !existing.favorite };
    set({ academicBooks: state.academicBooks.map((b) => (b.id === bookId ? { ...b, ...changes } : b)) });
    await updateAcademicBookRecord(bookId, changes);
  },

  /**
   * Lamar's own 1-5 rating, and deliberately his rather than a grade.
   * Tapping the same star again clears it. Nothing anywhere uses this to
   * score him — a rating that affected his marks would stop being honest
   * about whether he liked the book.
   */
  async rateBook(bookId, rating) {
    const state = get();
    const existing = state.academicBooks.find((b) => b.id === bookId);
    if (!existing || !existing.title) return;
    const next = existing.rating === rating ? null : rating;
    set({ academicBooks: state.academicBooks.map((b) => (b.id === bookId ? { ...b, rating: next } : b)) });
    await updateAcademicBookRecord(bookId, { rating: next });
  },

  // -------------------------------------------------------------------
  // Homeschool Administration (PROJECT_PLAN.md Part 8)
  // -------------------------------------------------------------------

  /**
   * One action for every dated administrative record — field trips,
   * volunteer hours, extracurriculars, awards, standardized test
   * results. Part 8 lists them separately, but they share a shape, and
   * five parallel actions would be five places for the compliance export
   * to forget one.
   */
  async addAdminRecordEntry({ kind, date, title, detail, hours, subject, driveUrl, score }) {
    const trimmed = (title || '').trim();
    if (!trimmed || !kind) return null;

    // Same rule as portfolio entries: a bad link never costs you the
    // record. The certificate exists whether or not the URL parsed.
    const link = normalizeEvidenceUrl(driveUrl);
    const record = {
      kind,
      // A real local date string. `date` comes from an <input type="date">,
      // which is already local 'YYYY-MM-DD' — never built via toISOString.
      date: date || todayStr(),
      title: trimmed,
      detail: (detail || '').trim() || null,
      hours: kind === 'volunteer' ? Number(hours) || 0 : null,
      // A numeric score, test records only. Added August 6, 2026 for
      // benchmark growth: a score with nothing to compare it against
      // tells you whether he passed, not whether he grew — and growth is
      // the whole reason Part 0 chose free annual benchmarks over a paid
      // recurring diagnostic. Null rather than 0 when not given, so an
      // unscored record never reads as a zero on the trend.
      score: kind === 'test' && score !== undefined && score !== null && `${score}`.trim() !== ''
        ? Number(score)
        : null,
      subject: subject || null,
      driveUrl: link.ok ? link.url : null,
      createdAt: new Date().toISOString()
    };
    const id = await addAdminRecord(record);
    const withId = { id, ...record };
    set({
      adminRecords: [withId, ...get().adminRecords].sort((a, b) => (b.date || '').localeCompare(a.date || ''))
    });
    return withId;
  },

  async removeAdminRecord(id) {
    await deleteAdminRecordById(id);
    set({ adminRecords: get().adminRecords.filter((r) => r.id !== id) });
  },

  /**
   * Attach (or clear) the Drive link on an administrative record after
   * the fact — you log the field trip that evening, you scan the museum
   * program on Saturday.
   */
  async setAdminRecordDriveUrl(id, url) {
    const link = normalizeEvidenceUrl(url);
    if (!link.ok) return link;
    await updateAdminRecordFields(id, { driveUrl: link.url });
    set({
      adminRecords: get().adminRecords.map((r) => (r.id === id ? { ...r, driveUrl: link.url } : r))
    });
    return link;
  },

  /**
   * Set or clear one of the named evidence FOLDER links (see
   * lib/driveLinks.js EVIDENCE_FOLDERS).
   *
   * Clearing writes an explicit null rather than deleting the row, so
   * the hydrate-time seed can tell "she cleared this deliberately" from
   * "never seeded" and doesn't helpfully restore a link she just removed.
   */
  // ---- Quarterly Mission Evaluations (PROJECT_PLAN.md Part 8) ----
  //
  // Project-based assessment replacing the recurring paid diagnostic
  // dropped in Part 0. One mission per quarter, chosen by the parent
  // from three proposals — the same accept-or-decline model she asked
  // for with books and assignments, rather than a project imposed on a
  // schedule she then has to work around.

  _missionRow(quarter) {
    return get().missionEvaluations.find((m) => m.quarter === quarter) || null;
  },

  async _writeMission(quarter, changes) {
    await saveMissionEvaluation(quarter, changes);
    const existing = get().missionEvaluations.find((m) => m.quarter === quarter);
    const merged = { ...existing, ...changes, quarter };
    set({
      missionEvaluations: existing
        ? get().missionEvaluations.map((m) => (m.quarter === quarter ? merged : m))
        : [...get().missionEvaluations, merged]
    });
    return merged;
  },

  /** Accept one of the quarter's proposals as this quarter's mission. */
  async acceptMissionProposal(quarter, projectId) {
    if (!findProposal(projectId)) return { ok: false, error: 'Unknown project.' };
    const existing = get()._missionRow(quarter);
    if (existing?.parentApproved) {
      return { ok: false, error: 'That quarter is already finalized.' };
    }
    await get()._writeMission(quarter, {
      projectId,
      customTitle: null,
      status: 'accepted',
      startedAt: todayStr(),
      declinedIds: existing?.declinedIds || []
    });
    return { ok: true };
  },

  /**
   * Say no to a proposal. Recorded so it is not offered again — the
   * point of declining is not seeing it next time.
   */
  async declineMissionProposal(quarter, projectId) {
    const existing = get()._missionRow(quarter);
    const declinedIds = [...new Set([...(existing?.declinedIds || []), projectId])];
    await get()._writeMission(quarter, { declinedIds, status: existing?.status || 'proposed' });
    return { ok: true };
  },

  /** Her own project instead of any of the three. */
  async setCustomMission(quarter, title, subjects = []) {
    const trimmed = (title || '').trim();
    if (!trimmed) return { ok: false, error: 'Give the mission a title.' };
    await get()._writeMission(quarter, {
      projectId: null,
      customTitle: trimmed,
      /**
       * ---- WHY A CUSTOM MISSION CARRIES ITS OWN SUBJECTS (Aug 26, 2026) ----
       *
       * A mission grades the subjects it names, and the twelve proposals name
       * theirs. A mission SHE types in names none — so without this it would
       * be chosen, built, scored, approved, printed in the compliance packet,
       * and grade absolutely nothing. Silently, at the end of a quarter, on
       * the heaviest assessment in it.
       *
       * Empty is allowed, because it is an honest state and she may not have
       * decided yet. It is never a silent one: `missionGradeGap` puts it on
       * the screen before she spends an evening scoring it.
       */
      customSubjects: [...new Set(subjects)],
      status: 'accepted',
      startedAt: todayStr()
    });
    return { ok: true };
  },

  /** Change which subjects a custom mission grades, after the fact. */
  async setMissionSubjects(quarter, subjects = []) {
    const existing = get()._missionRow(quarter);
    if (!existing) return { ok: false, error: 'No mission this quarter yet.' };
    /**
     * A FINALIZED MISSION IS NOT RE-POINTED. Approval is the moment her
     * judgment becomes the record; moving the subjects afterwards would
     * silently rewrite grades in two subjects at once — the one it leaves and
     * the one it lands in. Reopen it first, the same as changing a score.
     */
    if (existing.parentApproved) return { ok: false, error: 'Reopen the evaluation before changing its subjects.' };
    await get()._writeMission(quarter, { customSubjects: [...new Set(subjects)] });
    return { ok: true };
  },

  async setMissionStatus(quarter, status) {
    if (!get()._missionRow(quarter)) return { ok: false, error: 'No mission for that quarter yet.' };
    await get()._writeMission(quarter, {
      status,
      completedAt: status === 'completed' ? todayStr() : get()._missionRow(quarter)?.completedAt || null
    });
    return { ok: true };
  },

  /**
   * Score one rubric criterion.
   *
   * Deliberately does NOT touch `feedback`. The draft is generated on
   * demand in the UI and only written when she saves it, so re-scoring a
   * criterion after she has edited the narrative cannot silently
   * overwrite her words with a regenerated paragraph.
   */
  async setMissionScore(quarter, criterionId, level) {
    const row = get()._missionRow(quarter);
    if (!row) return { ok: false, error: 'No mission for that quarter yet.' };
    if (row.parentApproved) return { ok: false, error: 'That mission is already final.' };
    const value = Number(level);
    if (![1, 2, 3, 4].includes(value)) return { ok: false, error: 'Scores run 1 to 4.' };

    const scores = { ...(row.scores || {}), [criterionId]: value };
    const complete = Boolean(missionScoreTotals(scores));
    await get()._writeMission(quarter, {
      scores,
      status: complete && row.status !== 'approved' ? 'scored' : row.status
    });
    return { ok: true };
  },

  async setMissionFeedback(quarter, feedback) {
    const row = get()._missionRow(quarter);
    if (!row) return { ok: false, error: 'No mission for that quarter yet.' };
    await get()._writeMission(quarter, { feedback: (feedback || '').trim() || null });
    return { ok: true };
  },

  /**
   * The approval step the plan requires: nothing is final until she says
   * so. Refuses on a partial rubric, because an approved-but-half-scored
   * evaluation is exactly the kind of thing that looks complete in a
   * records packet a year later and is not.
   */
  async approveMissionEvaluation(quarter) {
    const row = get()._missionRow(quarter);
    if (!row) return { ok: false, error: 'No mission for that quarter yet.' };
    if (!missionScoreTotals(row.scores)) {
      return { ok: false, error: 'Score every criterion before finalizing.' };
    }
    await get()._writeMission(quarter, {
      parentApproved: true,
      status: 'approved',
      approvedAt: todayStr(),
      completedAt: row.completedAt || todayStr()
    });
    return { ok: true };
  },

  /** Reopen a finalized mission — a correction has to be possible. */
  async reopenMissionEvaluation(quarter) {
    if (!get()._missionRow(quarter)) return { ok: false, error: 'No mission for that quarter yet.' };
    await get()._writeMission(quarter, { parentApproved: false, status: 'scored', approvedAt: null });
    return { ok: true };
  },

  /** Photos or video of the finished build, in Drive. */
  async setMissionDriveUrl(quarter, url) {
    if (!get()._missionRow(quarter)) return { ok: false, error: 'No mission for that quarter yet.' };
    const link = normalizeEvidenceUrl(url);
    if (!link.ok) return link;
    await get()._writeMission(quarter, { driveUrl: link.url });
    return link;
  },

  /** Start the quarter over — clears the mission entirely. */
  async clearMissionEvaluation(quarter) {
    await deleteMissionEvaluation(quarter);
    set({ missionEvaluations: get().missionEvaluations.filter((m) => m.quarter !== quarter) });
  },

  // ---- Parent Dashboard passcode ----
  //
  // See lib/parentAuth.js for what this does and does not protect. In
  // short: it keeps a 12-year-old out of the grading and compliance
  // screens; it is not security, because the records live in his own
  // browser either way, and the UI says so rather than pretending.

  /**
   * First-run setup. Returns the recovery code exactly once — it is
   * never stored in a readable form and cannot be shown again, which is
   * the point of it being a recovery code rather than a second password.
   */
  async setParentPasscode(passcode, hint) {
    if (!cryptoAvailable()) {
      return {
        ok: false,
        error:
          'This browser can\u2019t create a passcode securely here. Open the app at localhost or over https and try again.'
      };
    }
    const valid = validatePasscode(passcode);
    if (!valid.ok) return valid;

    const recoveryCode = generateRecoveryCode();
    const record = await buildPasscodeRecord(valid.value, recoveryCode, hint);
    await saveParentAuth({ ...record, declined: false });
    set({
      parentAuth: { configured: true, declined: false, hint: record.hint },
      // Setting it up shouldn't then lock her out of the screen she is
      // standing on.
      parentUnlocked: true
    });
    return { ok: true, recoveryCode };
  },

  async verifyParentPasscode(attempt) {
    const record = await loadParentAuth();
    if (!record?.hash) return { ok: false, error: 'No passcode is set.' };
    const matched = await verifyPasscode(record, (attempt || '').trim());
    if (!matched) return { ok: false, error: 'That passcode didn\u2019t match.' };
    set({ parentUnlocked: true });
    return { ok: true };
  },

  /**
   * The way back in when the passcode is forgotten. Without this,
   * forgetting it would cost a year of attendance, grades and compliance
   * records — far worse than the snooping the lock prevents.
   *
   * Unlocks but deliberately does NOT clear the passcode: she lands
   * inside, where the UI prompts her to set a new one.
   */
  async unlockWithRecoveryCode(attempt) {
    const record = await loadParentAuth();
    if (!record?.recoveryHash) return { ok: false, error: 'No recovery code is on file.' };
    const matched = await verifyRecoveryCode(record, attempt);
    if (!matched) return { ok: false, error: 'That recovery code didn\u2019t match.' };
    set({ parentUnlocked: true });
    return { ok: true };
  },

  async changeParentPasscode(currentPasscode, nextPasscode, hint) {
    const record = await loadParentAuth();
    if (record?.hash) {
      const matched = await verifyPasscode(record, (currentPasscode || '').trim());
      if (!matched) return { ok: false, error: 'Your current passcode didn\u2019t match.' };
    }
    const valid = validatePasscode(nextPasscode);
    if (!valid.ok) return valid;

    // A new recovery code every time, so an old one written down and
    // since shared cannot be used to get back in.
    const recoveryCode = generateRecoveryCode();
    const built = await buildPasscodeRecord(valid.value, recoveryCode, hint);
    await saveParentAuth({ ...built, declined: false });
    set({ parentAuth: { configured: true, declined: false, hint: built.hint }, parentUnlocked: true });
    return { ok: true, recoveryCode };
  },

  /**
   * Turn the lock off entirely. Requires the current passcode, so it
   * can't be used as a way around the lock.
   */
  async removeParentPasscode(currentPasscode) {
    const record = await loadParentAuth();
    if (record?.hash) {
      const matched = await verifyPasscode(record, (currentPasscode || '').trim());
      if (!matched) return { ok: false, error: 'That passcode didn\u2019t match.' };
    }
    await saveParentAuth({ declined: true });
    set({ parentAuth: { configured: false, declined: true, hint: null }, parentUnlocked: true });
    return { ok: true };
  },

  /** She chose to run without a passcode. Asked once, then dropped. */
  async declineParentPasscode() {
    await saveParentAuth({ declined: true });
    set({ parentAuth: { ...get().parentAuth, declined: true }, parentUnlocked: true });
  },

  lockParentDashboard() {
    set({ parentUnlocked: false });
  },

  /**
   * Unlock WITHOUT verifying here — because the verification already happened,
   * at the front door, against this same record.
   *
   * LearningOS step 2 (Aug 31 2026) put a parent tab on the sign-in screen, and
   * it checks the passcode with the same `verifyPasscode` against the same
   * hash. Making her type it a second time to get past ParentGate would not add
   * a check; it would add a keystroke and teach her the lock is noise.
   *
   * The ONLY caller is src/FrontDoorGate.jsx, immediately after a successful
   * parent sign-in, and scripts/verify-front-door.mjs holds that to one caller.
   * If a component ever calls this to skip a gate, that guard fails.
   */
  unlockParentDashboard() {
    set({ parentUnlocked: true });
  },

  async setEvidenceFolderLink(key, url) {
    if (!EVIDENCE_FOLDER_KEYS.includes(key)) return { ok: false, url: null, error: 'Unknown folder.' };
    const link = normalizeEvidenceUrl(url);
    if (!link.ok) return link;
    await saveEvidenceLinkRecord(key, link.url);
    set({ evidenceLinks: { ...get().evidenceLinks, [key]: link.url } });
    return link;
  },

  /**
   * Formal per-subject course description, for transcripts and college
   * applications (Part 8). Kept as free text on purpose — a real course
   * description is prose, and a form with fields would produce something
   * a college would not accept.
   */
  async saveCourseDescription(subject, description) {
    const trimmed = (description || '').trim();
    const updatedAt = new Date().toISOString();
    set({
      courseDescriptions: { ...get().courseDescriptions, [subject]: { description: trimmed, updatedAt } }
    });
    await saveCourseDescriptionRecord(subject, trimmed);
  },

  /**
   * Ticks a Georgia requirement.
   *
   * Records what the PARENT says she has done. This app files nothing
   * with the state, and a checkbox here must never be read as the app
   * having verified compliance — the UI says so in as many words.
   */
  async toggleComplianceCheck(key, note) {
    const state = get();
    const prior = state.complianceChecks[key];
    const done = !prior?.done;
    const entry = {
      done,
      completedAt: done ? new Date().toISOString() : null,
      note: note ?? prior?.note ?? null
    };
    set({ complianceChecks: { ...state.complianceChecks, [key]: entry } });
    await saveComplianceCheckRecord(key, entry);
  },

  /** Parent adds a book beyond the seeded slots (Part 9's Family Library). */
  async addCustomAcademicBook(subject, { type, title, author, note }) {
    const trimmedTitle = (title || '').trim();
    if (!trimmedTitle) return null;
    const record = {
      subject,
      slotId: null,
      type: type || 'Recommended',
      title: trimmedTitle,
      author: (author || '').trim() || null,
      note: (note || '').trim() || null,
      blackExcellence: false,
      rejectedRecommendationIds: [],
      totalUnits: null,
      unit: 'chapters',
      unitsDone: 0,
      favorite: false,
      rating: null,
      status: 'not-started',
      startedAt: null,
      completedAt: null,
      isCustom: true,
      createdAt: new Date().toISOString()
    };
    const id = await addAcademicBookRecord(record);
    const withId = { id, ...record };
    set({ academicBooks: [...get().academicBooks, withId] });
    return withId;
  },

  /**
   * Deletes a custom book outright. A SEEDED slot is never deleted —
   * it's part of the curriculum's shape, so it's cleared back to empty
   * instead and stays available for a different book later.
   */
  async removeAcademicBook(id) {
    const state = get();
    const existing = state.academicBooks.find((b) => b.id === id);
    if (!existing) return;

    if (existing.isCustom) {
      set({ academicBooks: state.academicBooks.filter((b) => b.id !== id) });
      await deleteAcademicBookRecord(id);
      return;
    }

    const changes = {
      title: null,
      author: null,
      status: 'empty',
      startedAt: null,
      completedAt: null,
      totalUnits: null,
      unitsDone: 0,
      favorite: false,
      rating: null
    };
    set({ academicBooks: state.academicBooks.map((b) => (b.id === id ? { ...b, ...changes } : b)) });
    await updateAcademicBookRecord(id, changes);
  },

  /**
   * Parent schedules a placeholder slot into a real assignment: a real
   * title/topic and (optionally) a real due date.
   *
   * `dueDate` must be a local-timezone 'YYYY-MM-DD' string produced by
   * lib/scheduler.js's toDateStr (which is what an <input type="date">
   * gives directly). Never build it with toISOString() — that's UTC and
   * silently rolls a late-evening local date to the next day, a bug
   * class this project has already hit and fixed once.
   */
  async scheduleAcademicAssignment(id, { title, dueDate, type, note }) {
    const state = get();
    const existing = state.academicAssignments.find((a) => a.id === id);
    if (!existing) return;

    const nextTitle = title === undefined ? existing.title : title.trim() || null;
    const changes = {
      title: nextTitle,
      dueDate: dueDate === undefined ? existing.dueDate : dueDate || null,
      type: type === undefined ? existing.type : type,
      note: note === undefined ? existing.note : note
    };

    if (!nextTitle) {
      changes.status = 'placeholder';
      changes.startedAt = null;
      changes.completedAt = null;
    } else if (existing.status === 'placeholder') {
      changes.status = 'not-started';
    }

    const academicAssignments = state.academicAssignments.map((a) => (a.id === id ? { ...a, ...changes } : a));
    set({ academicAssignments });
    await updateAcademicAssignmentRecord(id, changes);
  },

  /**
   * Student moves an assignment forward. Completing one awards XP once
   * and counts toward the day's attendance record as real work, same as
   * a completed Khan Academy skill. The letter grade is separate and
   * comes from the parent afterward (see gradeAcademicAssignment).
   */
  async setAcademicAssignmentStatus(id, status) {
    const state = get();
    const existing = state.academicAssignments.find((a) => a.id === id);
    if (!existing || !existing.title) return; // still a placeholder, not real work

    const now = new Date().toISOString();
    const changes = { status };
    if (status === 'in-progress' && !existing.startedAt) changes.startedAt = now;
    if (status === 'completed') changes.completedAt = now;
    if (status === 'not-started') {
      changes.startedAt = null;
      changes.completedAt = null;
    }

    const isNewCompletion = status === 'completed' && existing.status !== 'completed';
    const academicAssignments = state.academicAssignments.map((a) => (a.id === id ? { ...a, ...changes } : a));

    if (isNewCompletion) {
      const xp = state.xp + ACADEMIC_ASSIGNMENT_COMPLETION_XP;
      const currentRank = getCurrentRank(xp, totalMasteredCount(state));
      set({ academicAssignments, xp, currentRank });
      await Promise.all([
        updateAcademicAssignmentRecord(id, changes),
        saveMeta({ xp, streak: state.streak, lastActiveDate: state.lastActiveDate })
      ]);
      await get().bumpTodayAttendance('lessonsCompleted');
      return;
    }

    set({ academicAssignments });
    await updateAcademicAssignmentRecord(id, changes);
  },

  /**
   * Student checks off (or un-checks) one weekly step of a multi-week
   * assignment.
   *
   * Milestones are computed on demand until the first time one is
   * ticked, then persisted whole — which is what lets them appear on
   * assignments approved before this feature existed, and lets them
   * follow a due-date change, without a migration. Once stored they stop
   * recomputing, because at that point they carry his real progress.
   */
  async toggleAssignmentMilestone(assignmentId, milestoneId) {
    const state = get();
    const existing = state.academicAssignments.find((a) => a.id === assignmentId);
    if (!existing || !hasMilestones(existing.type)) return;

    const current = milestonesFor(existing);
    let turnedOn = false;
    const milestones = current.map((m) => {
      if (m.id !== milestoneId) return m;
      const completed = Boolean(m.completedAt);
      turnedOn = !completed;
      return { ...m, completedAt: completed ? null : new Date().toISOString() };
    });

    // Starting the first step is what actually moves an assignment from
    // "not started" to "in progress" — he shouldn't have to say so twice.
    const anyDone = milestones.some((m) => m.completedAt);
    const status =
      existing.status === 'not-started' && anyDone
        ? 'in-progress'
        : existing.status === 'in-progress' && !anyDone
          ? 'not-started'
          : existing.status;

    const changes = { milestones, status };
    const academicAssignments = state.academicAssignments.map((a) =>
      a.id === assignmentId ? { ...a, ...changes } : a
    );

    /**
     * PAID ONCE PER MILESTONE. (Fixed Aug 13, 2026.)
     *
     * `turnedOn` fires on every off->on transition, so untick / retick paid 5
     * XP a cycle, forever. `xpAwardedAt` is the receipt — the same shape as
     * `unitXpAwardedAt` on a Khan unit, and for the same reason: unticking a
     * step is a correction, and a correction should never be a payday.
     */
    const target = milestones.find((m) => m.id === milestoneId) || null;
    const alreadyPaid = Boolean(target && target.xpAwardedAt);
    if (turnedOn && !alreadyPaid) {
      if (target) target.xpAwardedAt = new Date().toISOString();
      const xp = state.xp + ACADEMIC_MILESTONE_XP;
      const currentRank = getCurrentRank(xp, totalMasteredCount(state));
      set({ academicAssignments, xp, currentRank });
      await Promise.all([
        updateAcademicAssignmentRecord(assignmentId, changes),
        saveMeta({ xp, streak: state.streak, lastActiveDate: state.lastActiveDate })
      ]);
      return;
    }

    set({ academicAssignments });
    await updateAcademicAssignmentRecord(assignmentId, changes);
  },

  /**
   * Student's reflection on finished work — Part 9's requirement that
   * every completed assignment ends with one.
   *
   * Deliberately UNGRADED and never required. A reflection that gets
   * scored stops being honest, and "what would you do differently"
   * only works if admitting something costs him nothing. Saving an
   * empty one clears it rather than storing a blank.
   */
  /**
   * HE WRITES THE REPORT IN THE APP. (Aug 14, 2026.)
   *
   * The parent: "for his book reports I want him to do them in the app. Add
   * the notes and structure in that area where it list, the rough draft, and
   * edit and finish."
   *
   * Everything needed for that already existed except the writing itself. The
   * milestones name the four weeks — Read the book, Notes & structure, Rough
   * draft, Edit & finish. Every format carries a `sections` array that is
   * literally the outline he is meant to follow. And there was nowhere to type.
   * He could tick "Rough draft" and the app held no draft.
   *
   * So a book report was, in practice, written on paper or in some other
   * program and then ticked off here — which means the app records that a
   * report happened and holds no evidence of it. For a homeschool portfolio
   * that is the wrong way round: the artifact is the record.
   *
   * TWO FIELDS, NOT ONE, and deliberately so. Notes and draft are different
   * kinds of thinking a week apart, and collapsing them into one box would
   * quietly delete the planning step the milestone exists to protect.
   *
   * `field` is whitelisted rather than passed through, because this writes to
   * an arbitrary key on a record that also holds his grade.
   */
  /**
   * ---- AND A THIRD, BECAUSE THERE WAS NOWHERE TO FINISH. (Aug 26, 2026.) ----
   *
   * The parent: **"there isn't a location for the edit and finish. Is he to
   * write this in Google Docs?"**
   *
   * A fair question with an embarrassing answer: the app had a ROUGH draft box
   * and a proofreading checklist, and no box holding the finished report. The
   * only honest reading of that screen was "polish it somewhere else."
   *
   * `final` is a separate field rather than editing the draft in place, on
   * purpose. Revision is the thing being taught, and if the finished copy
   * overwrites the rough one there is no evidence he revised anything — the
   * portfolio would hold one text and no proof of the work between the two
   * drafts. Two fields, and the difference between them IS the record.
   */
  async saveAssignmentWriting(assignmentId, field, text) {
    const ALLOWED = { notes: 'notesText', draft: 'draftText', final: 'finalText' };
    const key = ALLOWED[field];
    if (!key) return { ok: false, error: 'Unknown field.' };

    const state = get();
    const existing = (state.academicAssignments || []).find((a) => a.id === assignmentId);
    if (!existing) return { ok: false, error: 'That assignment is not in the record.' };

    const value = String(text ?? '');
    const wordCount = value.trim() ? value.trim().split(/\s+/).filter(Boolean).length : 0;
    const changes = {
      [key]: value.trim() ? value : null,
      [key + 'Words']: wordCount,
      writingUpdatedAt: new Date().toISOString()
    };
    set({
      academicAssignments: state.academicAssignments.map((a) =>
        a.id === assignmentId ? { ...a, ...changes } : a
      )
    });
    await updateAcademicAssignmentRecord(assignmentId, changes);
    return { ok: true, wordCount };
  },

  async saveAssignmentReflection(assignmentId, text) {
    const state = get();
    const existing = state.academicAssignments.find((a) => a.id === assignmentId);
    if (!existing) return;

    const trimmed = (text || '').trim();
    const changes = {
      reflection: trimmed || null,
      reflectedAt: trimmed ? new Date().toISOString() : null
    };
    set({
      academicAssignments: state.academicAssignments.map((a) => (a.id === assignmentId ? { ...a, ...changes } : a))
    });
    await updateAcademicAssignmentRecord(assignmentId, changes);
  },

  /**
   * Parent picks the format for a Book Report or Presentation — which
   * decides its required sections, the student's checklist, and which
   * rubric criteria apply.
   *
   * Changing the format clears any rubric scores already given, because
   * the criteria themselves change (a poster is graded on craft, a
   * speech on delivery). Carrying old scores across would silently mean
   * something different.
   */
  async setAssignmentFormat(assignmentId, formatId) {
    const state = get();
    const existing = state.academicAssignments.find((a) => a.id === assignmentId);
    if (!existing) return;
    const changes = { format: formatId || null, rubricScores: {} };
    set({
      academicAssignments: state.academicAssignments.map((a) => (a.id === assignmentId ? { ...a, ...changes } : a))
    });
    await updateAcademicAssignmentRecord(assignmentId, changes);
  },

  /**
   * Parent scores one rubric criterion 1-4. Tapping the same score again
   * clears it, so a mis-tap is one tap to undo.
   *
   * This never sets the grade by itself. The rubric produces a SUGGESTED
   * letter the parent can accept or ignore — its job is to remove the
   * arithmetic and keep the standard steady across a school year, not to
   * decide what a piece of writing is worth.
   */
  async setAssignmentRubricScore(assignmentId, criterionId, score) {
    const state = get();
    const existing = state.academicAssignments.find((a) => a.id === assignmentId);
    if (!existing) return;

    const prior = existing.rubricScores || {};
    const rubricScores = { ...prior };
    if (rubricScores[criterionId] === score) delete rubricScores[criterionId];
    else rubricScores[criterionId] = score;

    set({
      academicAssignments: state.academicAssignments.map((a) =>
        a.id === assignmentId ? { ...a, rubricScores } : a
      )
    });
    await updateAcademicAssignmentRecord(assignmentId, { rubricScores });
  },

  /**
   * Parent grades a completed assignment — manual A-F, same model and
   * same reason as Khan Academy assignments and Writing Journal
   * entries: there is no automated way to score a real book report,
   * research paper, or presentation, so the parent reads it and picks
   * the letter directly.
   */
  async gradeAcademicAssignment(id, grade, feedback) {
    const state = get();
    const gradedAt = new Date().toISOString();
    // `feedback` is optional and, when omitted, the existing note is
    // LEFT ALONE rather than cleared. Changing a letter from B to A
    // should not silently delete the paragraph explaining why.
    const existing = state.academicAssignments.find((a) => a.id === id);
    const nextFeedback =
      feedback === undefined ? (existing?.feedback ?? null) : (feedback || '').trim() || null;

    const changes = { grade, gradedAt, feedback: nextFeedback };
    const academicAssignments = state.academicAssignments.map((a) =>
      a.id === id ? { ...a, ...changes } : a
    );
    set({ academicAssignments });
    await updateAcademicAssignmentRecord(id, changes);
  },

  /**
   * Written feedback on a completed assignment, without touching the
   * grade — so she can leave a note on something ungraded, or add one
   * later without re-picking a letter.
   *
   * Added August 6, 2026 at the parent's request: "I would like for him
   * to see feedback on his assignments." A letter alone tells a
   * 12-year-old where he landed and nothing about what to do next time.
   */
  async setAcademicAssignmentFeedback(id, feedback) {
    const value = (feedback || '').trim() || null;
    const academicAssignments = get().academicAssignments.map((a) =>
      a.id === id ? { ...a, feedback: value } : a
    );
    set({ academicAssignments });
    await updateAcademicAssignmentRecord(id, { feedback: value });
    return { ok: true };
  },

  /**
   * Parent accepts the topic the app proposed for an assignment slot —
   * the "agree" half of the approval workflow, and now the normal way an
   * assignment gets scheduled. Takes the suggested due date too, so
   * accepting is genuinely one tap and not "now pick a date."
   */
  async approveAssignmentRecommendation(assignmentId, recommendation, suggestedDueDate) {
    const state = get();
    const existing = state.academicAssignments.find((a) => a.id === assignmentId);
    if (!existing) return;

    const changes = {
      title: recommendation.title,
      note: recommendation.about || existing.note,
      dueDate: existing.dueDate || suggestedDueDate || null,
      status: existing.status === 'placeholder' ? 'not-started' : existing.status,
      approvedRecommendationId: recommendation.id
    };
    set({
      academicAssignments: state.academicAssignments.map((a) => (a.id === assignmentId ? { ...a, ...changes } : a))
    });
    await updateAcademicAssignmentRecord(assignmentId, changes);
  },

  /**
   * Parent passes on a proposed topic. Remembered on the row so it never
   * comes back, exactly like book rejections — same reasoning: a
   * suggestion reappearing after a refresh would make the whole flow
   * feel broken.
   */
  async rejectAssignmentRecommendation(assignmentId, recommendationId) {
    const state = get();
    const existing = state.academicAssignments.find((a) => a.id === assignmentId);
    if (!existing) return;

    const prior = existing.rejectedRecommendationIds || [];
    if (prior.includes(recommendationId)) return;
    const changes = { rejectedRecommendationIds: [...prior, recommendationId] };
    set({
      academicAssignments: state.academicAssignments.map((a) => (a.id === assignmentId ? { ...a, ...changes } : a))
    });
    await updateAcademicAssignmentRecord(assignmentId, changes);
  },

  /**
   * "Move to another quarter" — the last approval verb from Part 9 §4.
   *
   * The real case: a Book Report that didn't happen in Q1 should slide
   * to Q2 rather than being cleared and rebuilt from scratch.
   *
   * THE DESIGN PROBLEM AND HOW IT'S HANDLED: a seeded assignment's
   * `slotId` encodes its quarter (`asg::aerospace::Q1::2`). Simply
   * changing the row's quarter would move the slot out of Q1 entirely,
   * quietly deleting part of the curriculum's shape — Q1 would no longer
   * have an Aerospace book report at all.
   *
   * So a move DETACHES the work from its slot: the row becomes a custom
   * assignment in the new quarter carrying her real title, format and
   * milestones, and the original seeded slot re-seeds empty in its home
   * quarter on the next load. Her work moves; the curriculum's shape
   * stays. Custom assignments (no slotId) just change quarter directly,
   * since there is no slot to leave behind.
   *
   * The due date is recomputed to a real, holiday-safe date in the
   * target quarter rather than carried over — a Q1 date on a Q3
   * assignment would show as months overdue the moment it moved.
   * Milestones are cleared so they recompute from the new date.
   */
  async moveAssignmentToQuarter(assignmentId, targetQuarter) {
    const state = get();
    const existing = state.academicAssignments.find((a) => a.id === assignmentId);
    if (!existing || !targetQuarter || targetQuarter === existing.quarter) return;

    const fridays = availableDueDates(targetQuarter);
    const dueDate = fridays.length ? fridays[Math.floor(fridays.length / 2)] : null;

    const changes = {
      quarter: targetQuarter,
      dueDate,
      milestones: [],
      // Detaching is what leaves the empty slot behind in its home
      // quarter for the next hydrate to re-seed.
      slotId: existing.slotId ? null : existing.slotId,
      isCustom: existing.slotId ? true : existing.isCustom
    };

    set({
      academicAssignments: state.academicAssignments.map((a) => (a.id === assignmentId ? { ...a, ...changes } : a))
    });
    await updateAcademicAssignmentRecord(assignmentId, changes);
  },

  /** Puts every passed-over topic for a slot back on the table. */
  async resetAssignmentRecommendations(assignmentId) {
    const state = get();
    const changes = { rejectedRecommendationIds: [] };
    set({
      academicAssignments: state.academicAssignments.map((a) => (a.id === assignmentId ? { ...a, ...changes } : a))
    });
    await updateAcademicAssignmentRecord(assignmentId, changes);
  },

  /**
   * Accept every currently-pending assignment suggestion at once — the
   * parent's stated preference is to not set assignments up at all, so
   * requiring 28 individual taps would miss the point. She can still
   * change or clear any of them afterward.
   */
  async approveAllAssignmentRecommendations(pairs) {
    for (const { assignmentId, recommendation, suggestedDueDate } of pairs) {
      await get().approveAssignmentRecommendation(assignmentId, recommendation, suggestedDueDate);
    }
  },

  /**
   * Undo for "Accept all" — puts a quarter's seeded assignments back to
   * unscheduled so the suggestions come around again.
   *
   * This exists because the bulk Accept button shipped without a bulk
   * undo, which made accepting feel riskier than it should. Trying
   * something to see what it does is a completely reasonable way to use
   * software, and it should be reversible.
   *
   * Three deliberate limits:
   *   - Only SEEDED slots reset. A custom assignment the parent wrote
   *     herself is her own work, not something the app proposed, so
   *     wiping it here would be destroying real input.
   *   - Anything already in progress or completed is LEFT ALONE and
   *     reported back, so an undo can never erase work the student
   *     actually did.
   *   - Rejections are cleared too, so the suggestions genuinely start
   *     over rather than coming back already half-used.
   *
   * Returns { reset, skipped } so the UI can tell her exactly what
   * happened instead of silently doing something different from what
   * the button said.
   */
  async resetAcademicAssignmentsForQuarter(quarter) {
    const state = get();
    const inQuarter = state.academicAssignments.filter((a) => a.quarter === quarter && !a.isCustom && a.slotId);

    const resettable = inQuarter.filter((a) => a.title && (a.status === 'not-started' || a.status === 'placeholder'));
    const skipped = inQuarter.filter((a) => a.title && a.status !== 'not-started' && a.status !== 'placeholder');

    if (resettable.length === 0) return { reset: 0, skipped: skipped.length };

    const changes = {
      title: null,
      dueDate: null,
      status: 'placeholder',
      grade: null,
      startedAt: null,
      completedAt: null,
      gradedAt: null,
      approvedRecommendationId: null,
      rejectedRecommendationIds: [],
      milestones: [],
      format: null,
      rubricScores: {}
    };
    const resetIds = new Set(resettable.map((a) => a.id));

    set({
      academicAssignments: state.academicAssignments.map((a) => (resetIds.has(a.id) ? { ...a, ...changes } : a))
    });
    await Promise.all([...resetIds].map((id) => updateAcademicAssignmentRecord(id, changes)));

    return { reset: resettable.length, skipped: skipped.length };
  },

  /** Parent adds an assignment beyond the seeded quarterly slots. */
  async addCustomAcademicAssignment(subject, quarter, { type, title, dueDate, note }) {
    const trimmedTitle = (title || '').trim();
    if (!trimmedTitle) return null;
    const record = {
      subject,
      slotId: null,
      quarter,
      type: type || 'Portfolio Entry',
      title: trimmedTitle,
      note: (note || '').trim() || null,
      dueDate: dueDate || null,
      status: 'not-started',
      rejectedRecommendationIds: [],
      grade: null,
      startedAt: null,
      completedAt: null,
      gradedAt: null,
      isCustom: true,
      createdAt: new Date().toISOString()
    };
    const id = await addAcademicAssignmentRecord(record);
    const withId = { id, ...record };
    set({ academicAssignments: [...get().academicAssignments, withId] });
    return withId;
  },

  /**
   * Same rule as books: a custom assignment is deleted, a seeded slot is
   * cleared back to 'placeholder' so the curriculum's shape survives.
   */
  async removeAcademicAssignment(id) {
    const state = get();
    const existing = state.academicAssignments.find((a) => a.id === id);
    if (!existing) return;

    if (existing.isCustom) {
      set({ academicAssignments: state.academicAssignments.filter((a) => a.id !== id) });
      await deleteAcademicAssignmentRecord(id);
      return;
    }

    const changes = {
      title: null,
      dueDate: null,
      status: 'placeholder',
      grade: null,
      startedAt: null,
      completedAt: null,
      gradedAt: null,
      milestones: [],
      format: null,
      rubricScores: {},
      reflection: null,
      reflectedAt: null
    };
    set({ academicAssignments: state.academicAssignments.map((a) => (a.id === id ? { ...a, ...changes } : a)) });
    await updateAcademicAssignmentRecord(id, changes);
  },

  // The STUDENT marks a lesson done (daily completion / attendance / XP);
  // he no longer assigns the grade. `grade` is therefore optional — when
  // omitted, any grade the parent already entered is preserved rather than
  // wiped. The A-F Unit Test grade is set separately by the parent in the
  // parent-only Khan Academy Grades section (setKhanAcademyAssignmentGrade).
  /**
   * Daily check-off for one Khan subject. Tapping it again the same day
   * un-checks it — a mis-tap should be recoverable, and this is a student
   * control, not a grade.
   *
   * "Resets" tomorrow with no scheduled job: the record is keyed by date, so
   * a new day is simply a key that does not exist yet. A midnight rollover
   * task would be a task that silently fails every night the laptop is shut.
   *
   * Deliberately does NOT touch khanAcademyAssignments. Working on a unit
   * today and finishing that unit are different events; conflating them would
   * either mark units done that are not, or lose the daily signal entirely.
   */
  async markKhanDailySubject(subject, done = true) {
    const state = get();
    const today = todayStr();
    const priorDay = state.khanDailyLog[today] || {};
    const wasDone = priorDay[subject] === true;
    if (wasDone === done) return;

    const subjects = { ...priorDay, [subject]: done };
    if (!done) delete subjects[subject];
    const khanDailyLog = { ...state.khanDailyLog, [today]: subjects };

    /**
     * Small XP — a fraction of the 20 a scored unit pays, because showing up
     * for a day is real but it is not the same as finishing a unit.
     *
     * ---- AND UNTICKING GIVES IT BACK (Aug 12, 2026) ----
     *
     * It used to be paid on the way ON and kept on the way OFF. That was
     * harmless while this box sat beside a bigger button. It is not harmless
     * now that it is the ONLY control on his Khan rows: tick, untick, tick,
     * untick pays 5 XP a tap, forever, for nothing. Tested it — six taps,
     * 20 XP.
     *
     * This is not the "never claw back XP" rule bending. That rule protects
     * work he really did, on some unit or other, when an ADULT later corrects
     * the record. Here he is undoing his own tick, seconds old, on the same
     * day — the day did not happen twice, and it did not happen zero times
     * either. The XP should simply follow the box.
     */
    const KHAN_DAILY_XP = 5;
    const xp = done ? state.xp + KHAN_DAILY_XP : Math.max(0, state.xp - KHAN_DAILY_XP);
    const currentRank = getCurrentRank(xp, totalMasteredCount(state));

    set({ khanDailyLog, xp, currentRank });
    await saveKhanDailyLogRecord(today, subjects);
    /**
     * saveMeta runs on BOTH edges, and that is load-bearing. It used to sit
     * inside `if (done)`, which was fine while unticking changed nothing —
     * now that unticking gives the 5 XP back, skipping the write would leave
     * the lower number in memory and the higher one on disk, and the next
     * reload would hand it straight back. A half-persisted balance is worse
     * than either rule on its own.
     */
    await saveMeta({ xp, streak: state.streak, lastActiveDate: state.lastActiveDate });
    if (done) {
      await get().bumpTodayAttendance('lessonsCompleted');
    }
  },

  /**
   * TODAY'S MORNING MEETING — the 08:30 block, as a record rather than a hope.
   *
   * ---- WHY THIS EXISTS (Aug 20, 2026) ----
   *
   * The parent: **"Lamar logs in at 8:30 every morning and is working on his
   * school work until he completes everything. It has to be longer than 4 1/2
   * hrs."**
   *
   * `block-1` — Morning Meeting, Goals & Calendar, 08:30-09:00 — appeared in
   * one file, the timetable, and nowhere else. It could not be credited
   * because there was nothing anywhere in the app that could say it happened.
   *
   * Given the choice between a bare checkbox and a real screen she chose the
   * screen, and named what belongs on it: check email for a new build, load
   * back what she graded, read what today holds, and say what he is confused
   * about **before** he is stuck alone with it at two in the afternoon.
   *
   * IDEMPOTENT AND RE-OPENABLE. Running it twice on one day is one meeting —
   * the row is keyed by date. But he can also come back and add a question he
   * only thought of at ten o'clock, and the original completedAt is kept so
   * the record still says when the meeting was, not when he last edited it.
   */
  async completeMorningMeeting({
    goal = '', question = '', checkedForUpdate = false, syncedWork = false,
    checkedPlanner = false, checkedProgress = false
  } = {}) {
    const state = get();
    const date = todayStr();
    const prior = state.morningMeetings[date] || null;

    const row = {
      date,
      completedAt: prior?.completedAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      goal: String(goal || '').trim(),
      question: String(question || '').trim(),
      checkedForUpdate: Boolean(checkedForUpdate),
      syncedWork: Boolean(syncedWork),
      /**
       * Did he look at the week and the month? The parent asked for this
       * step so he sees what is coming rather than meeting it on the day.
       */
      checkedPlanner: Boolean(checkedPlanner),
      /**
       * Did he look at where he actually stands? The parent asked for this
       * step on Aug 20 — a boy who never sees his own progress has only
       * today's list, and today's list never says he is getting better.
       */
      checkedProgress: Boolean(checkedProgress),
      /**
       * Which build he was on when he ran it. If she ever has to work out why
       * his screen disagreed with hers on a given morning, this is the line
       * that answers it without guessing.
       */
      buildStamp: BUILD_STAMP
    };

    set({ morningMeetings: { ...state.morningMeetings, [date]: row } });
    await saveMorningMeetingRecord(row);

    /**
     * XP only on the FIRST completion of a given day. Same rule the Khan tick
     * learned the hard way: a button that pays every time it is pressed is a
     * button that gets pressed.
     */
    if (!prior) {
      const MORNING_MEETING_XP = 5;
      const xp = state.xp + MORNING_MEETING_XP;
      const currentRank = getCurrentRank(xp, totalMasteredCount(state));
      set({ xp, currentRank });
      await saveMeta({ xp, streak: state.streak, lastActiveDate: state.lastActiveDate });
    }

    /**
     * The meeting is the start of the school day, so the day is now a school
     * day on the attendance record even before he ticks a subject. Without
     * this, a morning he showed up for and then lost to a dentist appointment
     * has a meeting row and no attendance row.
     */
    await get().bumpTodayAttendance('lessonsCompleted', 0);
    return { ok: true, row };
  },

  /** Today's morning meeting row, or null if he has not run it yet. */
  getTodaysMorningMeeting() {
    return get().morningMeetings[todayStr()] || null;
  },

  /** Which Khan subjects has he checked off today? */
  getKhanDailyStatus() {
    return get().khanDailyLog[todayStr()] || {};
  },

  /**
   * How many days in a row has he checked off at least one Khan subject?
   *
   * TYPING IS STORED IN THIS SAME MAP AND IS DELIBERATELY EXCLUDED HERE.
   * Reusing khanDailyLog for the daily typing tick (added Aug 9 2026) buys the
   * whole persistence path for free — the record, the export, the monotonic
   * import merge, attendance. What it must NOT buy is a Khan streak he can run
   * up without doing any Khan work. Ticking typing alone is a real day of
   * typing; it is not a day of Khan.
   */
  getKhanDailyStreak() {
    const log = get().khanDailyLog;
    let streak = 0;
    for (let i = 0; i < 60; i++) {
      const d = toDateStr(new Date(Date.now() - i * 864e5));
      const day = log[d];
      const any = day && Object.entries(day).some(([subject, v]) => v && subject !== NON_KHAN_DAILY_SUBJECT);
      if (any) streak += 1;
      else if (i > 0) break;
    }
    return streak;
  },

  /** How many days in a row has he done his 15 minutes of typing? */
  getTypingDailyStreak() {
    const log = get().khanDailyLog;
    let streak = 0;
    for (let i = 0; i < 60; i++) {
      const d = toDateStr(new Date(Date.now() - i * 864e5));
      if (log[d] && log[d][NON_KHAN_DAILY_SUBJECT]) streak += 1;
      else if (i > 0) break;
    }
    return streak;
  },

  /**
   * markKhanAcademyAssignmentComplete IS GONE. (Aug 12, 2026.) Deliberately —
   * this is not a gap waiting to be filled.
   *
   * It was the store action behind the student's "Unit done" button, and it
   * did the honest thing with a dishonest input: it took a tap as proof a
   * Khan unit was finished, paid 20 XP, and advanced the subject. A Khan unit
   * is three or four school days of work. Pressed at the end of a session —
   * which is what a button beside a lesson invites — it walked his computer
   * four units ahead of where he actually was, and nothing could contradict
   * it, because this app cannot see Khan Academy.
   *
   * The parent: "can we remove the done buttons. The check box should be good
   * enough so that he won't select the done multiple times."
   *
   * A unit is now completed by exactly two things, both of them evidence:
   *
   *   - setKhanAcademyAssignmentPercent / setKhanAcademyAssignmentGrade — the
   *     parent entering the score off Khan's own screen. This is where the
   *     20 XP moved to, paid once, on the row's FIRST grade.
   *   - importProgressData, merging a row already completed on the other
   *     computer, which is that same event arriving second-hand.
   *
   * The daily checkbox (markKhanDailySubject) is what he gets: 5 XP for the
   * day, keyed by date, undoable, and it never advances a unit.
   *
   * Do not reintroduce a student-facing completion action.
   * verify-khan-unit-completion.mjs fails if one comes back.
   */

  // PARENT sets (or changes) the A-F Unit Test grade for one Khan Academy
  // assignment, from the parent-only Khan Academy Grades section.
  //
  // Grading does not merely IMPLY the work is done — since Aug 12 it is the
  // only thing that establishes it. The student has no completion control at
  // all; the score she copies off Khan's own screen is the single piece of
  // evidence this app can hold, so it is what marks the unit complete and what
  // pays the 20 XP (once, via _unitXpChanges). See TodayRow.jsx for why.
  /**
   * Grade a Khan unit by PERCENTAGE — the number Khan Academy actually shows —
   * and derive the letter from it.
   *
   * The parent, Aug 7 2026: "I will like to enter in the percentage of the Unit
   * and Course Challenge. Based on the percentage Mission Control creates the
   * letter grade." Reading Khan's mastery wording and converting it to a letter
   * by hand was three lossy steps repeated 151 times a year; the same
   * performance could easily earn a B in October and a C in March.
   *
   * Stores BOTH. The percentage is the record — it is what she entered and what
   * a transcript reviewer can check — and the letter is derived, so changing the
   * scale later re-derives every letter without her re-entering a single score.
   *
   * Passing null clears both, and un-completes nothing: marking a unit finished
   * and scoring it are separate events, and a mistyped grade should be erasable
   * without also erasing the fact that he did the work.
   *
   * No Dexie version bump: gradePercent is a plain unindexed field, and the
   * record writer merges rather than replaces.
   */
  /**
   * PUT A UNIT BACK TO NOT-FINISHED.
   *
   * ---- WHY THIS HAD TO EXIST (Aug 11, 2026) ----
   *
   * The parent: "on my son's computer the app moved his classes for math and
   * science up towards the next units. But the app in my computer is correct.
   * I deleted the folder in his computer and sent him the folder in my
   * computer and it is still showing the incorrect lessons."
   *
   * Two things were true at once, and neither was obvious:
   *
   *   1. HIS PROGRESS IS NOT IN THE FOLDER. It is in his browser's own
   *      storage. Replacing the folder replaces the app; it does not touch a
   *      single row of what he has done. That is why a clean copy changed
   *      nothing.
   *   2. NOTHING COULD UNDO A COMPLETION. Not the UI — there was no control
   *      for it anywhere — and deliberately not the import either, which
   *      takes `local.completed || row.completed` so that a stale export can
   *      never un-finish real work. Both rules are right on their own. The
   *      two together meant a wrongly-marked unit was permanent.
   *
   * That is what "moved up towards the next units" was: units marked finished
   * that Khan had never seen, pushing his Mission Control row past the work he
   * actually had to do. And the grades screen looked perfect throughout,
   * because those rows carry no grade — there is nothing there to look wrong.
   *
   * The grade goes with it: a score belongs to a finished unit, and leaving a
   * B- attached to a unit now marked unfinished would be a worse record than
   * either state on its own.
   *
   * XP and attendance are NOT clawed back. He did the work that earned them,
   * on some unit or other; taking points off a twelve-year-old to correct our
   * bookkeeping would be punishing him for our mistake.
   *
   * `unitXpAwardedAt` is deliberately left in place too, and it is the same
   * decision read from the other side: the receipt is what stops the 20 XP
   * being paid a SECOND time when this unit is later graded for real. Clearing
   * it here would turn every correction into a small payday.
   */
  async markKhanAcademyAssignmentNotDone(id) {
    const state = get();
    const existing = (state.khanAcademyAssignments || []).find((a) => a.id === id);
    if (!existing || !existing.completed) return { ok: false };
    const changes = {
      completed: false,
      completedAt: null,
      grade: null,
      gradePercent: null,
      gradeRaw: null,
      gradedAt: new Date().toISOString()
    };
    set({
      khanAcademyAssignments: state.khanAcademyAssignments.map((a) =>
        a.id === id ? { ...a, ...changes } : a
      )
    });
    await updateKhanAcademyAssignmentRecord(id, changes);
    return { ok: true };
  },

  /**
   * THE 20 XP FOR FINISHING A UNIT, PAID ONCE, WHEN THE SCORE ARRIVES.
   *
   * It used to be paid by the student's own "Unit done" button. Moving it here
   * did not change what he earns for a finished unit — it changed what has to
   * be true before he earns it. A score she copied off Khan is the only
   * evidence this system will ever hold that a unit is genuinely done.
   *
   * `unitXpAwardedAt` is the receipt, and it is a PERMANENT mark on the row.
   * It is not cleared by clearing the grade, and not cleared by "Not done" —
   * because both of those are corrections to OUR record, and he should never
   * be paid twice for one unit, nor have points taken back because an adult
   * fixed a typo. Regrading a unit pays nothing extra for the same reason.
   *
   * Returns the fields to merge into the row, so the caller writes once.
   */
  _unitXpChanges(existing) {
    if (!existing || existing.unitXpAwardedAt) return null;
    const state = get();
    const KHAN_ACADEMY_COMPLETION_XP = 20;
    const xp = state.xp + KHAN_ACADEMY_COMPLETION_XP;
    const currentRank = getCurrentRank(
      xp,
      totalMasteredCount(state)
    );
    return { xp, currentRank, rowChanges: { unitXpAwardedAt: new Date().toISOString() } };
  },

  async setKhanAcademyAssignmentPercent(id, percent, raw = null) {
    const state = get();
    const existing = state.khanAcademyAssignments.find((a) => a.id === id);
    if (!existing) return;

    if (percent === null || percent === undefined || percent === '') {
      const cleared = { gradePercent: null, gradeRaw: null, grade: null, gradedAt: new Date().toISOString() };
      set({
        khanAcademyAssignments: state.khanAcademyAssignments.map((a) =>
          a.id === id ? { ...a, ...cleared } : a
        )
      });
      await updateKhanAcademyAssignmentRecord(id, cleared);
      return;
    }

    const grade = percentToLetter(percent);
    if (!grade) return; // out of range or unparseable — refuse rather than store a wrong number
    /**
     * WAS A SECOND PARSER. This line read
     * `Math.round(Number(String(percent).replace(/%$/, '').trim()))`, which is
     * the same job parsePercent already does one import away -- and would have
     * produced NaN the moment a fraction like "9/11" reached it, silently
     * writing a broken record for a row the letter grade above had just
     * accepted. Two implementations of one parse is how they come to disagree.
     */
    const gradePercent = parsePercent(percent);
    if (gradePercent === null) return;
    const completedAt = existing.completedAt || new Date().toISOString();
    // gradedAt is what lets a REGRADE win when this row travels back to his
    // computer. Without it the merge cannot tell her newer grade from his older one.
    /**
     * The fraction is kept alongside the percentage (Aug 10, 2026). Khan
     * reports "9/11" and the denominator moves between units, so this is what
     * a transcript reviewer can check against Khan's own screen -- and it says
     * something the percentage cannot: the test had eleven questions on it.
     */
    const gradeRaw = (raw || '').trim() || null;
    const award = get()._unitXpChanges(existing);
    const changes = {
      gradePercent, gradeRaw, grade, completed: true, completedAt,
      gradedAt: new Date().toISOString(),
      ...(award ? award.rowChanges : {})
    };

    set({
      khanAcademyAssignments: state.khanAcademyAssignments.map((a) =>
        a.id === id ? { ...a, ...changes } : a
      ),
      ...(award ? { xp: award.xp, currentRank: award.currentRank } : {})
    });
    await updateKhanAcademyAssignmentRecord(id, changes);
    if (award) {
      await saveMeta({ xp: award.xp, streak: state.streak, lastActiveDate: state.lastActiveDate });
    }
  },

  /**
   * The letter-only path, kept for the rows she grades straight to a letter.
   * Pays the same one-time unit XP as the percentage path — the reward has to
   * follow the EVENT (a unit was scored), not the shape of the entry field, or
   * he earns different amounts for the same work depending on which box she
   * happened to type in.
   */
  async setKhanAcademyAssignmentGrade(id, grade) {
    const state = get();
    const existing = state.khanAcademyAssignments.find((a) => a.id === id);
    const completedAt = existing?.completedAt || new Date().toISOString();
    const award = grade ? get()._unitXpChanges(existing) : null;
    const changes = { grade, completed: true, completedAt, ...(award ? award.rowChanges : {}) };
    const khanAcademyAssignments = state.khanAcademyAssignments.map((a) =>
      a.id === id ? { ...a, ...changes } : a
    );
    set({
      khanAcademyAssignments,
      ...(award ? { xp: award.xp, currentRank: award.currentRank } : {})
    });
    await updateKhanAcademyAssignmentRecord(id, changes);
    if (award) {
      await saveMeta({ xp: award.xp, streak: state.streak, lastActiveDate: state.lastActiveDate });
    }
  },

  // ---- Gamification: coins, cosmetics, rewards (Part 5) ----

  /**
   * When each rank / mastery milestone was reached, for printing on
   * certificates. Read on demand rather than mirrored into React state: these
   * change a handful of times ever and nothing needs to re-render when they do.
   */
  getAchievementDates() {
    return { rankTierDates: { ...rankTierDates }, masteryMilestoneDates: { ...masteryMilestoneDates } };
  },

  /**
   * Spendable balance for one currency: XP-derived earning plus the ledger.
   *
   * Never stored. The moment a balance becomes a stored number it stops being
   * reconcilable with the events that produced it, and it stops being able to
   * merge between the two computers.
   */
  getBalance(currency) {
    const s = get();
    return balanceFor(s.ledger, currency, s.xp || 0);
  },

  /** Kept as the name the Rewards screens already call. */
  getCoinBalance() {
    return get().getBalance('coin');
  },

  getCreditBalance() {
    return get().getBalance('credit');
  },

  /**
   * Add one ledger entry. The single write path for money — everything that
   * moves a balance goes through here, so nothing can change a balance without
   * leaving a row explaining why.
   */
  async addLedgerEntry({ currency, amount, kind, source = '', note = '' }) {
    if (!amount) return null;
    const entry = makeEntry({ currency, amount, kind, source, note });
    await addLedgerEntries([entry]);
    set({ ledger: [...get().ledger, entry] });
    return entry;
  },

  /**
   * Pay out a completed challenge — exactly once, ever.
   *
   * THE DOUBLE-CLAIM PROBLEM. Ledger entries carry a random `entryId`, so a
   * union merge across the two computers CANNOT detect that two rows are the
   * same reward: each machine would have generated a different id for it. The
   * `source` key is what makes it detectable, which is why every challenge
   * payout is written with the key from lib/challenges.js and why this checks
   * for that key before writing anything.
   *
   * Append-only, like everything else here: an already-claimed challenge is a
   * no-op rather than an error, so a double-tap, a re-render, or an import of a
   * file that already contains the payout all settle to the same balance.
   */
  async claimChallenge({ key, coin = 0, credit = 0, note = '' }) {
    if (!key) return { ok: false, reason: 'no-key' };
    const existing = get().ledger || [];
    if (existing.some((e) => e && e.source === key)) return { ok: false, reason: 'already-claimed' };
    if (coin > 0) {
      await get().addLedgerEntry({ currency: 'coin', amount: coin, kind: 'challenge', source: key, note });
    }
    if (credit > 0) {
      await get().addLedgerEntry({ currency: 'credit', amount: credit, kind: 'challenge', source: key, note });
    }
    return { ok: true, coin, credit };
  },

  /** Has this exact challenge already been paid? Used to render Claim vs Claimed. */
  isChallengeClaimed(key) {
    return (get().ledger || []).some((e) => e && e.source === key);
  },

  /**
   * Parent awards or removes currency by hand — good character, effort the app
   * cannot see, a correction. This is the capability that was impossible
   * before the ledger existed, and roughly a third of the parent-control spec
   * depended on it.
   */
  async adjustCurrency({ currency, amount, note }) {
    const n = Math.round(Number(amount) || 0);
    if (!n) return { ok: false, reason: 'no-amount' };
    await get().addLedgerEntry({
      currency,
      amount: n,
      kind: n > 0 ? 'grant' : 'deduct',
      source: 'parent',
      note: note || (n > 0 ? 'Parent bonus' : 'Parent adjustment')
    });
    return { ok: true };
  },

  /* ---------------------------------------------------------------------
   * DREAM GOALS — the place to put money so it stops being spendable.
   *
   * ---- WHY THIS EXISTS (Aug 16, 2026) ----
   *
   * The parent: "He's banking something he can't spend."
   *
   * Spending already worked. `redeemReward` has taken Credits and raised a
   * parent approval since Aug 9. What did not exist, in any file, was SAVING —
   * and `dreamMatchFor()` had been sitting in economy.js since the economy
   * shipped, exported and documented and called by nothing.
   *
   * Which quietly made the top half of the Credit ladder unreachable. A boy
   * with 120 Credits and a 2,000-Credit goal has nowhere to hold money still,
   * and the 50-Credit privilege is always right there. **Without a place to
   * save, every economy collapses to its cheapest item.**
   *
   * ---- FOUR DECISIONS ----
   *
   * **One active goal.** Choosing is the lesson. Two goals is a wish list.
   *
   * **The match accrues as he saves, not at the end.** The design brief's whole
   * argument for it is that he learns compounding "by watching his own money
   * grow faster because he didn't touch it" — which requires that he can watch
   * it. A lump at the finish teaches nothing on the way.
   *
   * **Taking money back costs the match on it.** Not a penalty — the match is
   * paid for committed saving, so uncommitting returns exactly what he put in
   * and no more. He is never worse off than if he had never saved.
   *
   * **The reserved Credits leave his spendable balance immediately**, as
   * ordinary ledger entries. There is one account of where his money is, and
   * it is the ledger. A "reserved" column on a goal row would be a second.
   * ------------------------------------------------------------------------ */

  /** The one goal he is saving into, or null. */
  getActiveDreamGoal() {
    return (get().dreamGoals || []).find((g) => g.status === 'active') || null;
  },

  /**
   * Reserved + match + what is still to go, for one goal. Derived, never
   * stored, so it cannot disagree with the ledger.
   */
  dreamGoalProgress(goal) {
    if (!goal) return null;
    const reserved = Math.max(0, Number(goal.reservedCredits) || 0);
    const match = dreamMatchFor(reserved);
    const target = Math.max(1, Number(goal.targetCredits) || 0);
    const total = reserved + match;
    return {
      reserved,
      match,
      total,
      target,
      remaining: Math.max(0, target - total),
      pct: Math.min(100, Math.round((total / target) * 100)),
      ready: total >= target
    };
  },

  async createDreamGoal({ name, targetCredits, note = '', catalogId = null }) {
    const trimmed = String(name || '').trim();
    const target = Math.round(Number(targetCredits) || 0);
    if (!trimmed) return { ok: false, reason: 'no-name' };
    if (target <= 0) return { ok: false, reason: 'no-target' };
    if (get().getActiveDreamGoal()) return { ok: false, reason: 'already-active' };

    const goal = {
      syncId: newSyncId(),
      name: trimmed,
      targetCredits: target,
      reservedCredits: 0,
      note,
      catalogId,
      status: 'active',
      createdAt: new Date().toISOString(),
      achievedAt: null,
      updatedAt: new Date().toISOString()
    };
    await putDreamGoalRecord(goal);
    set({ dreamGoals: [...get().dreamGoals, goal] });
    return { ok: true, goal };
  },

  /** Move Credits out of spendable and into the goal. */
  async reserveToDreamGoal(amount) {
    const n = Math.round(Number(amount) || 0);
    if (n <= 0) return { ok: false, reason: 'no-amount' };
    const goal = get().getActiveDreamGoal();
    if (!goal) return { ok: false, reason: 'no-goal' };
    if (get().getCreditBalance() < n) return { ok: false, reason: 'insufficient' };

    await get().addLedgerEntry({
      currency: 'credit',
      amount: -n,
      kind: 'spend',
      // NOT 'auto' — reserving must never eat the weekly instant-purchase cap.
      // Saving is the behaviour this whole system is trying to encourage; it
      // would be perverse for it to use up his ability to buy something small.
      source: 'dream-reserve',
      note: `Saved toward ${goal.name}`
    });
    return get()._writeDreamGoal(goal.syncId, {
      reservedCredits: (Number(goal.reservedCredits) || 0) + n
    });
  },

  /**
   * Take reserved Credits back out.
   *
   * Returns exactly what he put in. The match on those Credits is not paid,
   * because it was never his — it is paid for saving that was committed, and
   * this is the moment it stops being. He is never worse off than if he had
   * not saved; he simply does not keep a reward for a thing he undid.
   */
  async unreserveFromDreamGoal(amount) {
    const n = Math.round(Number(amount) || 0);
    if (n <= 0) return { ok: false, reason: 'no-amount' };
    const goal = get().getActiveDreamGoal();
    if (!goal) return { ok: false, reason: 'no-goal' };
    const reserved = Number(goal.reservedCredits) || 0;
    if (n > reserved) return { ok: false, reason: 'over-reserved' };

    await get().addLedgerEntry({
      currency: 'credit',
      amount: n,
      kind: 'refund',
      source: 'dream-unreserve',
      note: `Taken back from ${goal.name}`
    });
    return get()._writeDreamGoal(goal.syncId, { reservedCredits: reserved - n });
  },

  /**
   * The goal is reached and he claims it.
   *
   * This raises an ordinary redemption, so it lands in the same approval queue
   * as every other real-world reward — a Dream Reward is a museum day or a
   * telescope, and it always waits for her. The Credits are NOT deducted again:
   * they left his balance as he reserved them. The match is written to the
   * ledger here as its own entry, so the history shows her contribution as a
   * distinct thing he can point at.
   */
  async claimDreamGoal() {
    const goal = get().getActiveDreamGoal();
    if (!goal) return { ok: false, reason: 'no-goal' };
    const progress = get().dreamGoalProgress(goal);
    if (!progress.ready) return { ok: false, reason: 'not-ready' };

    const at = new Date().toISOString();
    if (progress.match > 0) {
      await get().addLedgerEntry({
        currency: 'credit',
        amount: progress.match,
        kind: 'match',
        source: `dream-match:${goal.syncId}`,
        note: `Dream Match — ${goal.name}`
      });
      // ...and straight back out, because the match is spent ON the goal. Both
      // entries are written so the ledger SHOWS the match rather than implying
      // it: he should be able to see the number his mother added.
      await get().addLedgerEntry({
        currency: 'credit',
        amount: -progress.match,
        kind: 'spend',
        source: `dream-claim:${goal.syncId}`,
        note: `Dream Match applied — ${goal.name}`
      });
    }

    const redemption = {
      kind: 'reward',
      currency: 'credit',
      rewardId: null,
      rewardName: `Dream Goal — ${goal.name}`,
      cost: progress.total,
      // A Dream Reward is never auto-approved, whatever the arithmetic says.
      status: 'pending',
      createdAt: at,
      resolvedAt: null,
      syncId: newSyncId(),
      updatedAt: at
    };
    const id = await addRewardRedemptionRecord(redemption);
    set({ rewardRedemptions: [{ id, ...redemption }, ...get().rewardRedemptions] });

    await get()._writeDreamGoal(goal.syncId, { status: 'achieved', achievedAt: at });
    return { ok: true, total: progress.total, match: progress.match };
  },

  /**
   * Abandon a goal and take everything back. The match is not paid, for the
   * same reason it is not paid on a partial withdrawal.
   */
  async abandonDreamGoal() {
    const goal = get().getActiveDreamGoal();
    if (!goal) return { ok: false, reason: 'no-goal' };
    const reserved = Number(goal.reservedCredits) || 0;
    if (reserved > 0) {
      await get().addLedgerEntry({
        currency: 'credit',
        amount: reserved,
        kind: 'refund',
        source: 'dream-abandon',
        note: `Goal cancelled — ${goal.name}`
      });
    }
    return get()._writeDreamGoal(goal.syncId, {
      status: 'abandoned',
      reservedCredits: 0,
      abandonedAt: new Date().toISOString()
    });
  },

  /** One write path for a goal row, so status and totals cannot diverge. */
  async _writeDreamGoal(syncId, changes) {
    const goals = get().dreamGoals || [];
    const existing = goals.find((g) => g.syncId === syncId);
    if (!existing) return { ok: false, reason: 'missing' };
    const updated = { ...existing, ...changes, updatedAt: new Date().toISOString() };
    await putDreamGoalRecord(updated);
    set({ dreamGoals: goals.map((g) => (g.syncId === syncId ? updated : g)) });
    return { ok: true, goal: updated };
  },

  /** Newest-first money history, for the earn/spend log. */
  getLedgerHistory(currency = null, limit = 50) {
    const rows = (get().ledger || []).filter((e) => !currency || e.currency === currency);
    return [...rows].sort((a, b) => String(b.at).localeCompare(String(a.at))).slice(0, limit);
  },

  /** One snapshot for badges, certificates, and the coin header. */
  getGamificationStats() {
    const s = get();
    const totalMastered = totalMasteredCount(s);
    const coinsEarned = earnedFromXp(s.xp || 0, 'coin');
    return {
      xp: s.xp || 0,
      rankTier: s.currentRank.tier,
      rankName: s.currentRank.name,
      streak: s.streak || 0,
      longestStreak: Math.max(s.longestStreak || 0, s.streak || 0),
      totalMastered,
      khanUnitsCompleted: s.khanAcademyAssignments.filter((a) => a.completed).length,
      /**
       * PER-SUBJECT COUNTS, for the ship. (Added Aug 8, 2026.)
       *
       * The ship claims every subject builds its own part of the vehicle, and
       * two of its seven systems were quietly breaking that promise: Guidance
       * said "Math" but counted EVERY Khan unit including world history, and
       * Propulsion said "Science & Aerospace" but counted every mastered lesson
       * in the app. Both rose when he did anything at all — so the one screen
       * that answers "why do I have to do this?" was giving an answer that did
       * not survive checking, to a boy who checks.
       *
       * Lesson subjects come from allLessons, which is already imported here;
       * Khan rows carry their own subject.
       */
      khanMathUnitsCompleted: s.khanAcademyAssignments.filter((a) => a.completed && a.subject === 'math').length,
      masteredPropulsion: masteredInSubjects(s.lessonProgress, ['science', 'aerospace']),
      masteredOnboard: masteredInSubjects(s.lessonProgress, ['technology', 'robotics']),
      writingEntries: s.writingEntries.length,
      workoutsLogged: s.peWorkoutLog.length,
      mealsLogged: s.peMeals.length,
      portfolioEntries: s.portfolio.length,
      /**
       * The subjects that shipped after the badge set was written (Aug 6) and
       * had no badges at all until now: gardening, guitar, field trips and the
       * book library. The Aug 8 review flagged that the whole-child half of
       * this platform — self-sufficiency, music, real-world trips, reading —
       * was the least-rewarded part of it, despite being the explicit point.
       *
       * Counted the way each subject defines "a real thing done": gardening
       * uses kind 'session' for actual work in the beds (a 'log' row is a
       * lighter note), guitar uses 'practice' for a real practice session, and
       * trips and books count only what is actually finished.
       */
      gardenSessions: (s.gardenLog || []).filter((r) => r.kind === 'session').length,
      guitarSessions: (s.guitarLog || []).filter((r) => r.kind === 'practice').length,
      guitarSongsLearned: (s.guitarLog || []).filter((r) => r.kind === 'song-learned').length,
      fieldTripsCompleted: (s.fieldTrips || []).filter((t) => t.status === 'completed').length,
      booksCompleted: (s.academicBooks || []).filter((b) => b.status === 'completed').length,
      assignmentsCompleted: (s.academicAssignments || []).filter((a) => a.status === 'completed').length,
      coinsEarned,
      coinsSpent: Math.abs(Math.min(0, sumEntries(s.ledger, 'coin'))),
      coinBalance: balanceFor(s.ledger, 'coin', s.xp || 0),
      creditsEarned: earnedFromXp(s.xp || 0, 'credit'),
      creditBalance: balanceFor(s.ledger, 'credit', s.xp || 0)
    };
  },

  /**
   * Day- and week-scoped activity counts, for the Challenges system.
   *
   * WHY THIS EXISTS: every other snapshot in this store is CUMULATIVE — badges,
   * ranks and the ship all ask "how much, ever". Daily and weekly challenges ask
   * a different question: "how much TODAY". There was no way to answer it, which
   * is what blocked the mission panel even though lib/challenges.js was finished.
   *
   * Dates are compared as 'YYYY-MM-DD' strings against the LOCAL date helper.
   * Never `new Date(str)`: parsing a bare date string is treated as UTC, which
   * lands on the previous day west of Greenwich — the same class of bug that
   * once misdated attendance across this whole app.
   */
  getPeriodCounts() {
    const s = get();
    const today = todayStr();

    // Monday of the current school week, so Friday and the Monday before it
    // belong to the same week — matching weeklyPeriodId in lib/challenges.js.
    const d = new Date(today + 'T00:00:00');
    const dow = d.getDay() || 7; // Sunday = 7
    d.setDate(d.getDate() - (dow - 1));
    const weekStart = toDateStr(d);

    const onDate = (v) => String(v || '').slice(0, 10) === today;
    const inWeek = (v) => {
      const k = String(v || '').slice(0, 10);
      return k >= weekStart && k <= today;
    };
    /**
     * The quarter window, added Aug 9, 2026 (go-live open item 2).
     *
     * The Seasonal Operation is a QUARTER-scale challenge and was being
     * scored against cumulative lifetime totals. That was right by
     * coincidence and only in Q1, because the operations launched in the
     * same week as the school year — the previous note in
     * ChallengesSection said as much and said it would stop being true
     * in Q2. On November 1 the Q2 operation would have opened with every
     * objective already satisfied by Q1's work, and paid out its reward
     * for nothing. Counting inside the quarter's own dates is what makes
     * "this quarter's mission" mean anything.
     */
    const quarterRange = getQuarterDateRange(d);
    const inQuarter = (v) => {
      const k = String(v || '').slice(0, 10);
      return Boolean(k) && k >= quarterRange.start && k <= today;
    };

    const build = (match) => {
      const readingMinutes = (s.readingLog || [])
        .filter((r) => match(r.date) && /min/i.test(r.unit || ''))
        .reduce((n, r) => n + (Number(r.amount) || 0), 0);

      const khanUnits = Object.entries(s.khanDailyLog || {})
        .filter(([date]) => match(date))
        .reduce((n, [, subjects]) => n + Object.values(subjects || {}).filter(Boolean).length, 0);

      const counts = {
        lessonsMastered: Object.values(s.lessonProgress || {})
          .filter((p) => p.mastered && match(p.lastCompletedDate)).length,
        khanUnits,
        writingEntries: (s.writingEntries || []).filter((w) => match(w.completedAt)).length,
        workouts: (s.peWorkoutLog || []).filter((w) => match(w.date)).length,
        meals: (s.peMeals || []).filter((m) => match(m.date)).length,
        readingMinutes,
        gardenSessions: (s.gardenLog || []).filter((r) => r.kind === 'session' && match(r.date)).length,
        guitarSessions: (s.guitarLog || []).filter((r) => r.kind === 'practice' && match(r.date)).length,
        assignmentsCompleted: (s.academicAssignments || [])
          .filter((a) => a.status === 'completed' && match(a.completedAt || a.dueDate)).length,
        // Date-scoped like every other count here. It was cumulative, which
        // is wrong for a "this week" or "this quarter" figure — a book he
        // finished in September counted toward November's operation. Rows
        // finished before completedAt was recorded have no date and are
        // simply not counted in a windowed total, which is the honest
        // answer: nothing knows when they were finished.
        booksCompleted: (s.academicBooks || [])
          .filter((b) => b.status === 'completed' && match(b.completedAt)).length,
        // The seasonal operations have a field-trip objective, and this was
        // the only counts builder that did not produce the field it reads —
        // so the objective sat at 0 whatever he did.
        fieldTripsCompleted: (s.fieldTrips || [])
          .filter((t) => t.status === 'completed' && match(t.completedAt || t.date)).length,
        portfolioEntries: (s.portfolio || []).filter((p) => match(p.dateCompleted)).length
      };

      /**
       * "Did something in N different subjects" — counted as distinct AREAS of
       * activity rather than curriculum subject ids, because the point of the
       * challenge is breadth across what he actually does in a week, and half
       * of that (meals, guitar, the garden) is not a school subject at all.
       */
      counts.subjectsTouched = [
        counts.lessonsMastered, counts.khanUnits, counts.writingEntries,
        counts.workouts, counts.readingMinutes, counts.gardenSessions,
        counts.guitarSessions, counts.assignmentsCompleted
      ].filter((n) => n > 0).length;

      return counts;
    };

    const week = build(inWeek);

    /**
     * The 4+1 week: everything due this week finished, and finished by Thursday.
     *
     * Only ever true ON or BEFORE Thursday — claiming it on Friday would be
     * rewarding the ordinary week, which is the opposite of the point. It also
     * requires at least one assignment to have existed, so an empty week cannot
     * quietly award it.
     */
    const dueThisWeek = (s.academicAssignments || [])
      .filter((a) => { const k = String(a.dueDate || '').slice(0, 10); return k >= weekStart && k <= toDateStr(new Date(new Date(weekStart + 'T00:00:00').getTime() + 4 * 864e5)); });
    const allDone = dueThisWeek.length > 0 && dueThisWeek.every((a) => a.status === 'completed');
    week.finishedByThursday = allDone && dow <= 4 ? 1 : 0;

    return {
      today: build(onDate),
      week,
      quarter: build(inQuarter),
      quarterStart: quarterRange.start,
      quarterId: quarterRange.id,
      todayStr: today,
      weekStart
    };
  },

  /**
   * ==================================================================
   * IS THERE A RECENT BACKUP? (go-live open item 1, Aug 9 2026)
   * ==================================================================
   *
   * Everything this app knows lives in one browser's IndexedDB on one
   * laptop. Clearing site data, a browser reinstall, or a dead drive
   * takes the whole year with it — the attendance log Georgia asks for,
   * the portfolio, the grades, the ledger. Nothing in the app had ever
   * mentioned this, and nothing knew when a copy had last been made.
   *
   * Returns a plain object rather than a rendered string so the two
   * places that show it (her dashboard, his handoff card) can say it in
   * their own voice.
   */
  getBackupStatus() {
    const s = get();
    const { lastExportAt, lastImportAt, lastImportedExportAt, lastExportBytes, lastExportRowCount } = s;
    const dayMs = 864e5;
    const daysSince = (iso) => (iso ? Math.floor((Date.now() - new Date(iso).getTime()) / dayMs) : null);
    const days = daysSince(lastExportAt);
    return {
      lastExportAt,
      lastImportAt,
      lastImportedExportAt,
      lastExportBytes,
      lastExportRowCount,
      daysSinceExport: days,
      // Never exported is its own state, not "very stale" — the message
      // for someone who has never done this is a different message.
      neverExported: !lastExportAt,
      stale: !lastExportAt || days >= BACKUP_STALE_DAYS,
      staleAfterDays: BACKUP_STALE_DAYS
    };
  },

  /**
   * ==================================================================
   * SPELLING AND VOCABULARY, AS A RECORD (audit MISSING 2)
   * ==================================================================
   *
   * He does word study four or five days a week — introduce, two
   * practice rounds, a targeted review, a Friday test — and none of it
   * appeared in the Parent Dashboard, the compliance packet, or Learning
   * Analytics. Not summarised badly: absent. A whole strand of English
   * Language Arts, done all year, that the records could not show.
   *
   * This returns what a homeschool record actually needs: which words,
   * how the test went, which days were done, and how many weeks have
   * been completed — per skill, with the current week broken out.
   */
  getWordStudyRecord() {
    const s = get();
    const skills = ['spelling', 'vocabulary'];
    const out = {};
    for (const skill of skills) {
      const row = s.weeklyWords?.[skill];
      if (!row) {
        out[skill] = null;
        continue;
      }
      const words = getWordsByIds(WORD_POOLS[skill] || [], row.currentWordIds || []);
      const missed = getWordsByIds(WORD_POOLS[skill] || [], row.lastQuizMissedIds || []);
      const total = (row.currentWordIds || []).length;
      const missedCount = (row.lastQuizMissedIds || []).length;
      out[skill] = {
        skill,
        weekNumber: row.weekNumber || 1,
        weekStartDate: row.weekStartDate || null,
        words,
        wordCount: total,
        // Only meaningful once the Friday test has actually been sat —
        // a 100% for a quiz nobody took would be a lie in a record.
        quizTaken: Boolean(row.quizTakenThisWeek),
        missedWords: missed,
        scorePercent: row.quizTakenThisWeek && total
          ? Math.round(((total - missedCount) / total) * 100)
          : null,
        daysCompleted: [...(row.completedDayTasks || [])],
        // Mon-Thu from completedDayTasks, Friday from the real quiz flag —
        // Friday's completion has always been tracked separately.
        daysCompletedCount: new Set([
          ...(row.completedDayTasks || []),
          ...(row.quizTakenThisWeek ? ['fri'] : [])
        ]).size,
        // Weeks 1..n-1 are finished by definition: the rotation only ever
        // moves forward, and it moves on the calendar, not on passing.
        weeksCompleted: Math.max(0, (row.weekNumber || 1) - 1),
        wordsSeen: Math.max(0, row.poolCursor || 0),
        poolSize: (WORD_POOLS[skill] || []).length,
        /**
         * WORDS MASTERED IS THE NUMBER THAT MATTERS, and until today there was
         * no such number. The record reported "words seen 10 / 360" after three
         * weeks and that was the honest figure, because the list could not move
         * without a Friday test. Seen is exposure; mastered is
         * MASTERY_STREAK correct in a row across separate sittings.
         */
        wordsMastered: masteryCounts(row.wordMastery).mastered,
        masteryStreakNeeded: MASTERY_STREAK,
        /**
         * Carried three weeks without being mastered, then set aside. These are
         * the words that need HER, not another quiz — the whole reason they are
         * surfaced instead of silently blocking the list.
         */
        stalledWords: getWordsByIds(WORD_POOLS[skill] || [], stalledWordIds(row.wordMastery)),
        masteredThisWeek: (row.currentWordIds || []).filter(
          (id) => row.wordMastery && row.wordMastery[id] && row.wordMastery[id].mastered
        ).length
      };
    }
    return out;
  },

  /**
   * ==================================================================
   * THE FRIDAY WEEK IN REVIEW (audit MISSING 3)
   * ==================================================================
   *
   * PE has weekly goals. Academics had nothing — no moment in the week
   * where he looks back at it. That is the self-regulated-learning piece
   * the app was missing, and the whole thing is buildable out of data it
   * already holds: no new tracking, no new input, nothing extra for him
   * to remember to do.
   *
   * Three parts, deliberately: what went well, one thing that slipped,
   * and a suggested focus for next week. ONE slipped thing, never a
   * list — a debrief that opens with six failures is a debrief a
   * twelve-year-old learns to close.
   */
  getWeekInReview(date = new Date()) {
    const s = get();
    const periods = get().getPeriodCounts();
    const week = periods.week;
    const weekStart = periods.weekStart;
    const today = periods.todayStr;
    const inWeek = (v) => {
      const k = String(v || '').slice(0, 10);
      return k >= weekStart && k <= today;
    };

    // ---- What he actually finished, named rather than counted ----
    const masteredThisWeek = Object.entries(s.lessonProgress || {})
      .filter(([, p]) => p.mastered && inWeek(p.lastCompletedDate))
      .map(([lessonId]) => ({
        lessonId,
        subject: LESSON_SUBJECT.get(lessonId) || null,
        title: LESSON_TITLE.get(lessonId) || lessonId
      }));

    const wins = [];
    if (masteredThisWeek.length) {
      wins.push({
        key: 'mastered',
        label: `${masteredThisWeek.length} lesson${masteredThisWeek.length === 1 ? '' : 's'} mastered`,
        detail: masteredThisWeek.slice(0, 3).map((l) => l.title).join(' · ')
      });
    }
    if (week.khanUnits) wins.push({ key: 'khan', label: `${week.khanUnits} Khan Academy unit${week.khanUnits === 1 ? '' : 's'}` });
    if (week.writingEntries) wins.push({ key: 'writing', label: `${week.writingEntries} piece${week.writingEntries === 1 ? '' : 's'} of writing` });
    if (week.workouts) wins.push({ key: 'pe', label: `${week.workouts} workout${week.workouts === 1 ? '' : 's'}` });
    if (week.readingMinutes) wins.push({ key: 'reading', label: `${week.readingMinutes} minutes of reading` });
    if (week.gardenSessions) wins.push({ key: 'garden', label: `${week.gardenSessions} in the garden` });
    if (week.guitarSessions) wins.push({ key: 'guitar', label: `${week.guitarSessions} guitar session${week.guitarSessions === 1 ? '' : 's'}` });
    if (week.assignmentsCompleted) wins.push({ key: 'assignments', label: `${week.assignmentsCompleted} assignment${week.assignmentsCompleted === 1 ? '' : 's'} handed in` });

    /**
     * ONE thing that slipped, chosen by what matters most this week.
     *
     * Ordered by consequence rather than by size of the number: something
     * genuinely overdue outranks a missed practice round, and word study
     * outranks "no garden this week" because one is graded work and the
     * other is a Friday activity. If nothing is behind, this is null and
     * the card says so — a debrief that has to find a fault every week
     * teaches him that finishing is never enough.
     */
    let slipped = null;
    const overdue = (s.academicAssignments || []).filter(
      (a) => a.status !== 'completed' && a.dueDate && String(a.dueDate).slice(0, 10) < today
    );
    const plannerOverdue = (s.assignments || []).filter(
      (a) => !a.completed && a.dueDate && String(a.dueDate).slice(0, 10) < today
    );
    const wordsBehind = ['spelling', 'vocabulary'].filter((skill) => {
      const row = s.weeklyWords?.[skill];
      if (!row) return false;
      const done = new Set([...(row.completedDayTasks || []), ...(row.quizTakenThisWeek ? ['fri'] : [])]);
      return done.size < 5;
    });

    if (overdue.length || plannerOverdue.length) {
      const n = overdue.length + plannerOverdue.length;
      slipped = {
        key: 'overdue',
        label: `${n} thing${n === 1 ? ' is' : 's are'} past due`,
        detail: [...overdue, ...plannerOverdue].slice(0, 2).map((a) => a.title).join(' · '),
        fix: 'Pick the oldest one and start there — the oldest is always the cheapest to clear.'
      };
    } else if (wordsBehind.length) {
      slipped = {
        key: 'words',
        label: `${wordsBehind.join(' and ')} word study is not finished`,
        detail: 'The daily rounds are what make Friday easy.',
        fix: 'Catch up the earliest missed day — it takes about five minutes.'
      };
    } else if (!week.workouts) {
      slipped = { key: 'pe', label: 'No workout logged this week', fix: 'One session before Sunday still counts as a week.' };
    } else if (!week.readingMinutes) {
      slipped = { key: 'reading', label: 'No independent reading logged', fix: 'Twenty minutes tonight, and log it.' };
    }

    /**
     * Next week's focus — a SUGGESTION he can accept or overrule.
     *
     * Deliberately not a target he can fail. The point of the ritual is
     * that he practises choosing what to work on, which is the skill an
     * engineering degree will actually demand of him.
     */
    const focusOptions = [
      { key: 'overdue', label: 'Clear what is past due', when: Boolean(overdue.length || plannerOverdue.length) },
      { key: 'words', label: 'Finish word study every day', when: Boolean(wordsBehind.length) },
      { key: 'math', label: 'Get ahead in Math', when: true },
      { key: 'aerospace', label: 'Push the Aerospace project on', when: true },
      { key: 'reading', label: 'Read every day', when: true },
      { key: 'pe', label: 'Three workouts', when: true }
    ].filter((o) => o.when);

    const dow = new Date(today + 'T00:00:00').getDay();
    return {
      weekStart,
      today,
      // Friday onward is when a week is worth reviewing. Shown from Friday
      // through Sunday so a Saturday catch-up still finds it.
      isReviewDay: dow === 5 || dow === 6 || dow === 0,
      wins,
      masteredThisWeek,
      slipped,
      focusOptions,
      subjectsTouched: week.subjectsTouched,
      // The honest empty state. A week with nothing in it should say so
      // rather than manufacture a win out of an empty list.
      quiet: wins.length === 0
    };
  },

  /**
   * Student buys a cosmetic. COINS, always instant, never needs approval —
   * it costs the parent nothing and waiting would break the loop between the
   * work and the reward.
   */
  async redeemCosmetic(item) {
    const s = get();
    if ((s.unlockedCosmetics || []).includes(item.id)) return { ok: false, reason: 'already-owned' };
    if (get().getCoinBalance() < item.cost) return { ok: false, reason: 'insufficient' };
    const unlockedCosmetics = [...(s.unlockedCosmetics || []), item.id];
    const createdAt = new Date().toISOString();
    const redemption = { kind: 'cosmetic', currency: 'coin', rewardId: item.id, rewardName: item.name, cost: item.cost, status: 'fulfilled', createdAt, resolvedAt: createdAt, syncId: newSyncId(), updatedAt: createdAt };
    const id = await addRewardRedemptionRecord(redemption);
    set({ unlockedCosmetics, rewardRedemptions: [{ id, ...redemption }, ...s.rewardRedemptions] });
    await get().addLedgerEntry({ currency: 'coin', amount: -item.cost, kind: 'spend', source: 'cosmetic', note: item.name });
    await saveMeta({ unlockedCosmetics });
    return { ok: true };
  },

  async setSupplyCrateEnabled(enabled) {
    const supplyCrateEnabled = Boolean(enabled);
    set({ supplyCrateEnabled });
    await saveMeta({ supplyCrateEnabled });
  },

  /** This month's crate, and whether he can open it. Pure read. */
  getSupplyCrate() {
    const s = get();
    const monthKey = crateMonthKey(todayStr());
    const opened = crateOpenedIn(monthKey, s.ledger);
    const item = crateOfferFor(monthKey, s.unlockedCosmetics || []);
    return {
      monthKey,
      opened,
      enabled: s.supplyCrateEnabled !== false,
      cost: CRATE_COST,
      canAfford: get().getCoinBalance() >= CRATE_COST,
      /** Nothing left he doesn't own — do NOT take his Coins for nothing. */
      soldOut: item === null,
      /** The contents are NOT revealed before opening; this is for the reveal. */
      item
    };
  },

  /**
   * Open this month's crate.
   *
   * ---- WHAT MAKES THIS NOT A LOOT BOX (Aug 16, 2026) ----
   *
   * The item is chosen deterministically from the month itself, so there is
   * nothing to reroll — refreshing, closing the tab and coming back all produce
   * the same crate. Only items worth at least the crate price are eligible, so
   * he cannot lose: the surprise is WHICH one, never WHETHER. Once a month,
   * Coins only, and his mother can switch it off entirely.
   *
   * The claim key lives in the ledger rather than a flag, for the same reason
   * every other claim in this app does: a flag can be out of step with the
   * money, and a ledger entry cannot.
   */
  async openSupplyCrate() {
    const crate = get().getSupplyCrate();
    if (!crate.enabled) return { ok: false, reason: 'disabled' };
    if (crate.opened) return { ok: false, reason: 'already-opened' };
    if (crate.soldOut) return { ok: false, reason: 'nothing-left' };
    if (!crate.canAfford) return { ok: false, reason: 'insufficient' };

    const item = crate.item;
    const s = get();
    const unlockedCosmetics = [...(s.unlockedCosmetics || []), item.id];
    set({ unlockedCosmetics });
    await saveMeta({ unlockedCosmetics });

    // The spend carries the month key, so re-opening is impossible even if two
    // machines both try — the ledger merges by union and the key is identical.
    await get().addLedgerEntry({
      currency: 'coin',
      amount: -CRATE_COST,
      kind: 'crate',
      source: crateSourceKey(crate.monthKey),
      note: `Supply crate — ${item.name}`
    });
    return { ok: true, item };
  },

  /** Equip an owned (or free) cosmetic. item.type is 'avatar' | 'rocket'. */
  /**
   * Equip or clear one Avatar Gear slot.
   *
   * Passing an item already in its slot UNEQUIPS it, so every slot can be
   * emptied without needing a separate "take off" control — at twelve, tapping
   * the thing you are wearing to remove it is the obvious gesture.
   *
   * Gear does not change the drawn avatar; it renders as a loadout beside it.
   * That is a real limitation, stated in the UI rather than hidden.
   */
  /**
   * Set or clear the demo video for one exercise. Parent-only in practice —
   * it is reached from the Parent Dashboard, behind the gate.
   *
   * An empty string removes the entry rather than storing a blank, so "no
   * video" is one state and not two.
   */
  /**
   * Parent settings for the class bell.
   *
   * Warning lead is clamped to 0-15 minutes: zero turns the early warning off
   * and keeps only the switch bell, and anything past fifteen would start
   * warning about the next block before the current one is half done.
   */
  async setClassBellSettings({ enabled, warningMinutes }) {
    const patch = {};
    if (enabled !== undefined) patch.classBellEnabled = Boolean(enabled);
    if (warningMinutes !== undefined) {
      patch.classBellWarningMinutes = Math.min(15, Math.max(0, Math.round(Number(warningMinutes) || 0)));
    }
    if (!Object.keys(patch).length) return { ok: false };
    set(patch);
    await saveMeta(patch);
    return { ok: true };
  },

  /**
   * Turns demo links off entirely.
   *
   * `sourceId` used to pick a creator whose channel was searched on his behalf.
   * That default is gone (Aug 10, 2026 — half those searches opened an empty
   * page), so it no longer selects anything. It is still accepted and still
   * stored so an older saved value and an import from the other computer both
   * round-trip instead of throwing.
   */
  async setExerciseVideoSettings({ sourceId, enabled }) {
    const patch = {};
    if (sourceId !== undefined) patch.exerciseVideoSourceId = sourceId;
    if (enabled !== undefined) patch.exerciseVideosEnabled = Boolean(enabled);
    if (!Object.keys(patch).length) return { ok: false };
    set(patch);
    await saveMeta(patch);
    return { ok: true };
  },

  /**
   * WHERE HE GOES TO PLAY THIS WEEK'S BLOOKET / KAHOOT / GIMKIT.
   *
   * The parent: **"add blooket, kahoot, and gimkit to Lamar game section"** —
   * and, asked how he should get in, she chose to paste the link herself.
   *
   * Same http(s)-only check as setExerciseVideo, and for the same reason: a
   * `javascript:` or `data:` URL typed here would be handed straight to a link
   * a twelve-year-old taps. Empty clears the link, which puts his card back to
   * "ask Mom" rather than leaving a stale one from three weeks ago.
   */
  async setQuizLink(platformId, url) {
    if (!platformId || !QUIZ_PLATFORM_IDS.includes(platformId)) return { ok: false, reason: 'unknown-platform' };
    const trimmed = String(url || '').trim();
    if (trimmed && !/^https?:\/\//i.test(trimmed)) return { ok: false, reason: 'bad-url' };
    const next = { ...(get().quizLinks || {}) };
    if (trimmed) next[platformId] = trimmed;
    else delete next[platformId];
    set({ quizLinks: next });
    await saveMeta({ quizLinks: next });
    return { ok: true };
  },

  async setExerciseVideo(exerciseId, url) {
    if (!exerciseId) return { ok: false };
    const trimmed = String(url || '').trim();
    // Only http(s). A javascript: or data: URL here would be handed straight to
    // a link the student taps.
    // 'none' is the sentinel for "show him nothing for this exercise" -- it has
    // to be distinguishable from "not set", which now falls through to the
    // curated default in data/pe/exerciseDemoVideos.js.
    if (trimmed && trimmed !== 'none' && !/^https?:\/\//i.test(trimmed)) {
      return { ok: false, reason: 'bad-url' };
    }
    const next = { ...(get().exerciseVideos || {}) };
    if (trimmed) next[exerciseId] = trimmed;
    else delete next[exerciseId];
    set({ exerciseVideos: next });
    await saveMeta({ exerciseVideos: next });
    return { ok: true };
  },

  async equipGear(item) {
    const s = get();
    if (!item || !item.slot) return { ok: false, reason: 'no-slot' };
    if (!(s.unlockedCosmetics || []).includes(item.id)) return { ok: false, reason: 'not-owned' };
    const current = s.equippedGear || {};
    const equippedGear = { ...current };
    if (equippedGear[item.slot] === item.id) delete equippedGear[item.slot];
    else equippedGear[item.slot] = item.id;
    set({ equippedGear });
    await saveMeta({ equippedGear });
    return { ok: true, equipped: equippedGear[item.slot] === item.id };
  },

  async equipCosmetic(item) {
    const s = get();
    const owned = item.cost === 0 || (s.unlockedCosmetics || []).includes(item.id);
    if (!owned) return { ok: false, reason: 'not-owned' };
    /**
     * Three kinds now, not two. `theme` added Aug 25 2026 — see lib/themes.js.
     *
     * The switch is on `item.type` rather than an if/else on 'avatar', because
     * the old two-branch form would have silently equipped a THEME as a rocket:
     * anything that was not an avatar fell through to `equippedRocket`. A
     * default that quietly absorbs anything it does not recognise is how a
     * purchase disappears, which is the whole class of bug being fixed today.
     */
    const FIELD = { avatar: 'equippedAvatar', rocket: 'equippedRocket', theme: 'equippedTheme' };
    const field = FIELD[item.type];
    if (!field) return { ok: false, reason: 'unknown-type' };
    const patch = { [field]: item.id };
    set(patch);
    await saveMeta(patch);
    if (item.type === 'theme') applyTheme(item.id);
    return { ok: true };
  },

  /**
   * How dense the Mission Control board is. Not a purchase — a setting.
   *
   * The parent asked for board "color or format". Colour is a theme and is
   * worth paying for; layout is not a reward, it is how he prefers to work,
   * and charging coins for a comfortable line height would be the app taxing
   * him for being able to read it.
   */
  /**
   * Put one HQ piece somewhere. `null` for u puts it back where it was designed.
   *
   * Clamped here rather than in the component, because a coordinate outside
   * [0,1] is a piece standing through a wall — the exact bug of Aug 16, when
   * the Task Lamp stood thirteen pixels inside the left wall — and a store is
   * the last place that can refuse it.
   */
  async setHqSpot(itemId, u, v) {
    if (!itemId) return { ok: false };
    const s = get();
    const hqLayout = { ...(s.hqLayout || {}) };
    if (u === null || u === undefined) delete hqLayout[itemId];
    else {
      hqLayout[itemId] = {
        u: Math.min(0.95, Math.max(0.05, Number(u) || 0)),
        v: Math.min(0.95, Math.max(0.02, Number(v) || 0))
      };
    }
    set({ hqLayout });
    await saveMeta({ hqLayout });
    return { ok: true };
  },

  /** Back to the designed room. One button, because he WILL want it. */
  async resetHqLayout() {
    set({ hqLayout: {} });
    await saveMeta({ hqLayout: {} });
    return { ok: true };
  },

  /**
   * POST A CREW MEMBER TO A STATION. (Phase 4, Aug 30, 2026.)
   *
   * `stationId` of null unposts them — they go back to the muster point, which
   * is a real place in the room and not a disappearance.
   *
   * ---- THE RULES ARE ENFORCED HERE, NOT IN THE SCREEN ----
   *
   * The panel could check all of this and probably will, but a rule that only
   * exists in a component is a rule that a second component can walk past. Both
   * of these have already bitten this project in other shapes: a piece placed
   * outside the room (Aug 16) and a monitor standing below its own desk (Aug
   * 25) were both cases of the only check living somewhere that could be
   * bypassed.
   *
   *   1. ONLY A STATION HE OWNS. Nobody works at a dashed outline.
   *   2. ONE CREW MEMBER PER STATION. Posting a second to an occupied station
   *      MOVES THE FIRST OUT rather than stacking two people on one desk. That
   *      is the behaviour that makes assignment a choice — with no limit he
   *      would post everybody everywhere and the decision would stop meaning
   *      anything.
   *
   * Deliberately NOT checked here: whether the crew member has arrived. Arrival
   * is derived from his schoolwork and can move both ways as work is graded and
   * re-graded; a post written while he qualified should not be destroyed the
   * moment a grade is edited. The ROOM decides who to draw, and it draws nobody
   * who has not arrived.
   */
  async setCrewPost(crewId, stationId) {
    if (!crewId) return { ok: false, reason: 'no-crew' };
    const s = get();
    const owned = new Set(s.unlockedCosmetics || []);
    if (stationId && !owned.has(stationId)) return { ok: false, reason: 'not-owned' };

    const hqCrewPosts = { ...(s.hqCrewPosts || {}) };
    if (!stationId) delete hqCrewPosts[crewId];
    else {
      // Whoever was there is moved out first — one post, one person.
      for (const [otherId, otherStation] of Object.entries(hqCrewPosts)) {
        if (otherId !== crewId && otherStation === stationId) delete hqCrewPosts[otherId];
      }
      hqCrewPosts[crewId] = stationId;
    }
    set({ hqCrewPosts });
    await saveMeta({ hqCrewPosts });
    return { ok: true };
  },

  async setBoardDensity(density) {
    const value = density === 'compact' ? 'compact' : 'comfortable';
    set({ boardDensity: value });
    await saveMeta({ boardDensity: value });
    return { ok: true, density: value };
  },

  /**
   * Student requests a real-world reward. CREDITS, spent immediately.
   *
   * Small ones clear on the spot; anything over the threshold — or that would
   * breach the weekly instant limit — waits for a parent. That split is not
   * bureaucracy: on two computers an approval travels at the speed of the
   * export round-trip, so if everything needed approving, the reward would
   * arrive days after the work and stop feeling connected to it. Privileges
   * that cost the parent nothing clear now; anything involving money or the
   * car waits, which is the delayed-gratification lesson as a mechanic rather
   * than a lecture.
   */
  async redeemReward(reward) {
    const s = get();
    if (get().getCreditBalance() < reward.cost) return { ok: false, reason: 'insufficient' };
    const approval = creditPurchaseApproval(reward.cost, s.ledger, {
      // Set from the reward's ladder tier by the migration — a treat, an
      // outing, a kit, a day out or a Dream Reward always waits for her,
      // whatever it happens to cost.
      requiresParent: Boolean(reward.requiresParent)
    });
    const createdAt = new Date().toISOString();
    const redemption = {
      kind: 'reward',
      currency: 'credit',
      rewardId: reward.id,
      rewardName: reward.name,
      cost: reward.cost,
      status: approval.auto ? 'approved' : 'pending',
      createdAt,
      resolvedAt: approval.auto ? createdAt : null,
      /**
       * THE ID THAT MAKES AN APPROVAL POSSIBLE AT ALL.
       *
       * Before Aug 9, 2026 a request made on his computer never reached
       * hers — this table was not in the export — so anything over the
       * auto-approve line sat reading "waiting for a parent to approve
       * it" forever: unapprovable, undeniable, and unrefundable, with
       * the Credits already gone from his balance. Even once the table
       * travelled, Dexie's auto-increment would have collided her
       * redemption #12 with his, so the merge needs a generated id.
       */
      syncId: newSyncId(),
      updatedAt: createdAt
    };
    const id = await addRewardRedemptionRecord(redemption);
    set({ rewardRedemptions: [{ id, ...redemption }, ...s.rewardRedemptions] });
    await get().addLedgerEntry({
      currency: 'credit',
      amount: -reward.cost,
      kind: 'spend',
      // 'auto' is what autoApprovedCreditsThisWeek counts against the cap.
      source: approval.auto ? 'auto' : 'reward',
      note: reward.name
    });
    return { ok: true, auto: approval.auto, reason: approval.reason };
  },

  /**
   * Parent resolves a redemption. status: 'approved' | 'fulfilled' | 'denied'.
   *
   * A denial REFUNDS as a new positive entry rather than deleting the spend.
   * The ledger is append-only, so the history reads honestly — he asked, it
   * was declined, the credits came back — and, less obviously, a deletion
   * cannot be represented in a union merge, so undoing by removal would
   * silently resurrect itself on the next import.
   */
  async resolveRedemption(id, status) {
    const s = get();
    const r = s.rewardRedemptions.find((x) => x.id === id);
    if (!r) return;
    const resolvedAt = new Date().toISOString();
    const rewardRedemptions = s.rewardRedemptions.map((x) =>
      x.id === id ? { ...x, status, resolvedAt, updatedAt: resolvedAt, syncId: x.syncId || newSyncId() } : x
    );
    set({ rewardRedemptions });
    await updateRewardRedemptionRecord(id, {
      status,
      resolvedAt,
      // The decision has to beat the request when the two rows meet on
      // the other machine, and `updatedAt` is what the merge compares.
      updatedAt: resolvedAt,
      syncId: r.syncId || newSyncId()
    });
    if (status === 'denied' && r.status !== 'denied' && r.cost) {
      await get().addLedgerEntry({
        currency: r.currency || 'credit',
        amount: r.cost,
        kind: 'refund',
        source: 'denied',
        note: `Refund — ${r.rewardName}`
      });
    }
  },

  /** Parent adds a real-world reward to the catalog. */
  async addReward({ name, cost, note, catalogId, tier }) {
    const createdAt = new Date().toISOString();
    const rec = {
      name,
      cost: Number(cost) || 0,
      note: note || '',
      active: true,
      createdAt,
      // `catalogId` ties a row back to data/rewardCatalog.js when it came
      // from there, so the ladder can re-price it later without guessing
      // from the name. Rows she types herself simply have none.
      catalogId: catalogId || null,
      tier: tier || null,
      syncId: newSyncId(),
      updatedAt: createdAt
    };
    const id = await addRewardRecord(rec);
    set({ rewards: [...get().rewards, { id, ...rec }] });
  },

  async updateReward(id, changes) {
    const patch = { ...changes, updatedAt: new Date().toISOString() };
    // A price she sets by hand is HER price. Marking it means the ladder
    // migration will never quietly overwrite it — see migrateRewardsToLadder.
    if (Object.prototype.hasOwnProperty.call(changes, 'cost')) patch.priceEditedByParent = true;
    await updateRewardRecord(id, patch);
    set({ rewards: get().rewards.map((r) => (r.id === id ? { ...r, ...patch } : r)) });
  },

  // Soft delete — the row stays in Dexie with a tombstone so the removal
  // travels. Without this, deleting "Trip for ice cream" on her computer
  // would be undone by his next export.
  async deleteReward(id) {
    await deleteRewardRecord(id);
    set({ rewards: get().rewards.filter((r) => r.id !== id) });
  },

  /** Parent awards (or clears) an Engineer Readiness skill level.
   *  level: 'Bronze' | 'Silver' | 'Gold', or null/'' to clear the award. */
  async setReadinessAward(skillId, level, note) {
    const s = get();
    const readinessAwards = { ...s.readinessAwards };
    if (!level) {
      delete readinessAwards[skillId];
      set({ readinessAwards });
      await deleteReadinessAwardRecord(skillId);
      return;
    }
    const updatedAt = new Date().toISOString();
    /**
     * Keep the FULL Bronze -> Silver -> Gold progression, not just the latest.
     *
     * The row only ever held the current level and an updatedAt that was
     * overwritten on each change, so the date he first reached Bronze was
     * destroyed the moment he reached Silver. Over six years that is the
     * substance of the record: "demonstrated Gold in Technical Writing, March
     * 2028" is exactly the evidence a homeschool transcript struggles to show,
     * and it is unrecoverable once lost. Appended only when the level actually
     * changes, so re-saving a note does not pad the history.
     */
    const prior = s.readinessAwards[skillId];
    const priorHistory = Array.isArray(prior?.history) ? prior.history : [];
    const history =
      prior?.level === level ? priorHistory : [...priorHistory, { level, at: updatedAt }];

    readinessAwards[skillId] = { level, note: note || '', updatedAt, history };
    set({ readinessAwards });
    await saveReadinessAwardRecord({ skillId, level, note: note || '', updatedAt, history });
  },

  // ---- Field Trip Planner (Part 5) ----

  async addFieldTrip(data) {
    const createdAt = new Date().toISOString();
    const rec = {
      destination: (data.destination || '').trim(),
      date: data.date || '',
      cost: Number(data.cost) || 0,
      travelTimeMin: Number(data.travelTimeMin) || 0,
      subjects: Array.isArray(data.subjects) ? data.subjects : [],
      gradeLevel: data.gradeLevel || '',
      notes: data.notes || '',
      hours: 0,
      status: 'planned',
      learningPack: null,
      portfolioEntryId: null,
      completedAt: null,
      createdAt,
      // Trips are counted by his Progress screen, three badges and the
      // seasonal operation, all of which read zero on his machine until
      // these travelled. See the v31 schema note in db.js.
      syncId: newSyncId(),
      updatedAt: createdAt
    };
    const id = await addFieldTripRecord(rec);
    set({ fieldTrips: [...get().fieldTrips, { id, ...rec }] });
    return id;
  },

  async updateFieldTrip(id, changes) {
    const patch = { ...changes, updatedAt: new Date().toISOString() };
    await updateFieldTripRecord(id, patch);
    set({ fieldTrips: get().fieldTrips.map((t) => (t.id === id ? { ...t, ...patch } : t)) });
  },

  // Soft delete — see the note on deleteReward.
  async deleteFieldTrip(id) {
    await deleteFieldTripRecord(id);
    set({ fieldTrips: get().fieldTrips.filter((t) => t.id !== id) });
  },

  /** Build (or rebuild) the subject-aware Learning Pack template for a trip. */
  async generateFieldTripLearningPack(id) {
    const trip = get().fieldTrips.find((t) => t.id === id);
    if (!trip) return;
    const learningPack = generateLearningPack(trip);
    await get().updateFieldTrip(id, { learningPack });
  },

  /** Mark a trip completed — records hours and auto-creates a Portfolio entry
   *  (the completed trip feeding the portfolio, per Part 5). */
  /**
   * CORRECT A COMPLETED TRIP — its hours, its date, or both.
   *
   * ---- WHY THIS HAD TO EXIST (Aug 13, 2026) ----
   *
   * The parent: "i dont see an edit button on the completed field trip."
   *
   * She was looking for one because her Victory Creek trip is recorded as
   * `hours: 160` — the length of the trip in MINUTES, typed into a box whose
   * whole label was the placeholder "hrs". The build an hour earlier caught
   * that mistake going IN, and labelled the box so it would not happen again.
   * It did nothing for the trip already sitting there wrong, and a completed
   * trip card offered exactly two actions: regenerate the learning pack, or
   * delete the whole thing.
   *
   * Delete-and-recreate is not an edit. It would have thrown away the notes
   * she wrote, the portfolio entry built from them, and the learning pack.
   *
   * ---- THE ONE HARD RULE HERE ----
   *
   * This writes to her Georgia attendance record, so it has to be able to
   * LOWER a number — that is the entire point of a correction — without ever
   * eating minutes she logged for something else that day.
   *
   * The test is whether the day's current figure is the one THIS TRIP put
   * there (`prior === trip.instructionMinutes`). If it is, the trip owns it and
   * may replace it with anything, up or down. If it is not, she has typed
   * something herself since, and the trip may only raise it — never overwrite.
   */
  async updateCompletedFieldTrip(id, { hours, date } = {}) {
    const trip = (get().fieldTrips || []).find((t) => t.id === id);
    if (!trip || trip.status !== 'completed') return { ok: false, error: 'That trip is not marked complete.' };

    const nextHours = hours === undefined || hours === null || hours === ''
      ? Number(trip.hours) || 0
      : Number(hours);
    if (!Number.isFinite(nextHours) || nextHours < 0) {
      return { ok: false, error: 'Hours has to be a number.' };
    }
    const nextDate = (date || trip.date || trip.completedAt || '').slice(0, 10);
    if (!nextDate) return { ok: false, error: 'This trip needs a date before it can count as a school day.' };

    const IMPLAUSIBLE_HOURS = 12;
    const minutes = Math.round(nextHours * 60);
    const oldDate = trip.instructionDate || null;
    const oldMinutes = Number(trip.instructionMinutes) || 0;

    /**
     * If the day is changing, take the trip's own contribution off the OLD day
     * first — otherwise a mistyped date leaves phantom instruction minutes
     * behind on a day nothing happened, and the 180-day count quietly gains a
     * school day she never taught.
     */
    if (oldDate && oldDate !== nextDate && oldMinutes > 0) {
      const priorOld = Math.max(0, Math.round(Number(get().allAttendance[oldDate]?.offlineMinutes) || 0));
      if (priorOld === oldMinutes) await get().setOfflineInstructionMinutes(oldDate, 0);
    }

    let instructionMinutes = null;
    let instructionSkipped = null;
    if (minutes > 0) {
      if (nextHours > IMPLAUSIBLE_HOURS) {
        instructionSkipped = 'implausible-hours';
      } else {
        const prior = Math.max(0, Math.round(Number(get().allAttendance[nextDate]?.offlineMinutes) || 0));
        // The trip owns the number it wrote, and may correct it downwards.
        // Anything else on that day is hers and can only be raised.
        const mayReplace = oldDate === nextDate && prior === oldMinutes;
        if (mayReplace || minutes > prior) {
          const res = await get().setOfflineInstructionMinutes(nextDate, minutes);
          if (res && res.ok) instructionMinutes = minutes;
          else instructionSkipped = 'rejected';
        } else {
          instructionSkipped = 'already-higher';
        }
      }
    }

    await get().updateFieldTrip(id, {
      hours: nextHours,
      date: nextDate,
      instructionMinutes,
      instructionDate: instructionMinutes ? nextDate : null,
      instructionSkipped
    });
    return { ok: true, instructionMinutes, instructionSkipped };
  },

  async completeFieldTrip(id, hours) {
    const trip = get().fieldTrips.find((t) => t.id === id);
    if (!trip || trip.status === 'completed') return;
    const completedAt = new Date().toISOString();
    const subject = (trip.subjects && trip.subjects[0]) || 'aerospace';
    await get().addPortfolioEntry(
      `Field Trip: ${trip.destination}`,
      trip.notes || `Learning experience at ${trip.destination}.`,
      subject,
      ''
    );
    const created = get().portfolio[0]; // addPortfolioEntry unshifts the new entry
    const loggedHours = Number(hours) || trip.hours || 0;

    /**
     * THE TRIP NOW COUNTS AS A SCHOOL DAY. (Aug 13, 2026.)
     *
     * Until today this function recorded the trip, created a portfolio entry,
     * and stopped. The hours the parent typed were displayed back to her on
     * the trip card and read nowhere else — not summed, not in the records
     * packet, and above all not in the 180-day count, which reads
     * `allAttendance` only (yearPlan.js `daysLogged`).
     *
     * Meanwhile MissionControlBoard told her, in as many words: "Log where you
     * went. A logged trip is a real school day toward the 180." That was not
     * true, and it is the worst kind of untrue — a compliance promise. She
     * found it because she took her son on a field trip and asked what
     * happens to the record.
     *
     * DECISIONS MADE HERE, since they are hers to overrule:
     *
     *   - THE DATE IS THE TRIP'S DATE, not the day she got round to ticking
     *     it off. Instruction happened when they went.
     *   - IT NEVER LOWERS A NUMBER SHE TYPED. If the day already has more
     *     offline minutes than the trip is worth, hers stands — she may have
     *     logged the trip plus an evening of work, and this must not quietly
     *     eat the difference. Same reason it writes rather than adds: adding
     *     would double-count the moment she records the trip in both places.
     *   - IT IS VISIBLE. The completed trip card states the minutes and the
     *     date it wrote them to, so a number that appears in her legal record
     *     is never one she cannot trace.
     *
     * She can always edit the figure by hand in Compliance; this only makes
     * sure the day is not silently worth zero.
     */
    const tripDate = (trip.date || completedAt).slice(0, 10);
    const tripMinutes = Math.round(loggedHours * 60);
    let instructionMinutesWritten = null;
    let instructionSkipped = null;

    /**
     * THE FIELD SAYS HOURS AND SHE TYPED MINUTES. (Aug 13, 2026.)
     *
     * Found on her own record within minutes of shipping the line above: the
     * Victory Creek Waterfall trip carried `hours: 160`. Not a slip — 160 is
     * exactly how long the trip took IN MINUTES, entered into a box labelled
     * "hrs". A three-character placeholder is not a label, and hours is the
     * odd unit out in an app that measures instruction in minutes everywhere
     * else.
     *
     * Left alone, 160 hours becomes 9,600 minutes, setOfflineInstructionMinutes
     * rejects it as "more hours than a day holds", and the trip silently books
     * nothing — the exact failure this whole fix exists to end.
     *
     * So an implausible figure is caught HERE and named, rather than being
     * bounced by a validator whose message she never sees. Twelve hours is the
     * line: a genuine all-day trip fits under it, and anything above it is far
     * more likely to be minutes.
     */
    const IMPLAUSIBLE_HOURS = 12;
    if (tripMinutes > 0) {
      if (loggedHours > IMPLAUSIBLE_HOURS) {
        instructionSkipped = 'implausible-hours';
      } else {
        const prior = get().allAttendance[tripDate];
        const already = Math.max(0, Math.round(Number(prior?.offlineMinutes) || 0));
        if (tripMinutes > already) {
          const res = await get().setOfflineInstructionMinutes(tripDate, tripMinutes);
          if (res && res.ok) instructionMinutesWritten = tripMinutes;
          else instructionSkipped = 'rejected';
        } else {
          instructionSkipped = 'already-higher';
        }
      }
    }

    await get().updateFieldTrip(id, {
      status: 'completed',
      completedAt,
      hours: loggedHours,
      portfolioEntryId: created?.id ?? null,
      // What was booked, against which day, and if nothing was booked, why —
      // so the card can say so instead of leaving her to guess.
      instructionMinutes: instructionMinutesWritten,
      instructionDate: instructionMinutesWritten ? tripDate : null,
      instructionSkipped
    });
  },

  /**
   * Mission Comms (Part 5) — post a message to the parent ⇄ student thread.
   * `sender` is set by the surface: the Parent Dashboard sends as 'parent', the
   * student view as 'student'. A message is auto-read by its own author.
   */
  async sendMessage({ sender, body }) {
    const text = (body || '').trim();
    if (!text) return null;
    const who = sender === 'parent' ? 'parent' : 'student';
    const entry = {
      sender: who,
      body: text,
      createdAt: new Date().toISOString(),
      readByParent: who === 'parent',
      readByStudent: who === 'student'
    };
    const id = await addMessageRecord(entry);
    const record = { id, ...entry };
    set({ messages: [...get().messages, record] });
    return record;
  },

  /**
   * Mark every message from the OTHER party as read by `reader`
   * ('parent'|'student') — used when a surface opens the thread, to clear its
   * unread badge. Only writes the rows that actually change.
   */
  async markMessagesRead(reader) {
    const who = reader === 'parent' ? 'parent' : 'student';
    const flag = who === 'parent' ? 'readByParent' : 'readByStudent';
    const state = get();
    const toUpdate = state.messages.filter((m) => m.sender !== who && !m[flag]);
    if (toUpdate.length === 0) return;
    const messages = state.messages.map((m) =>
      m.sender !== who && !m[flag] ? { ...m, [flag]: true } : m
    );
    set({ messages });
    await Promise.all(toUpdate.map((m) => updateMessageRecord(m.id, { [flag]: true })));
  },

  /**
   * Adds a fresh batch of Khan Academy Assignments — going forward this is
   * used when planning full-school-year content aligned to the quarterly
   * rotation schedule (see PROJECT_PLAN.md), not driven by any diagnostic
   * (IXL has been dropped entirely). Old completed rows are kept, not
   * deleted, so the Gradebook retains full
   * history across batches.
   */
  async addKhanAcademyAssignmentBatch(rows, batchLabel) {
    const createdAt = new Date().toISOString();
    const prepared = rows.map((r) => ({ ...r, completed: false, grade: null, completedAt: null, createdAt, batchLabel }));
    const ids = await Promise.all(prepared.map((r) => addKhanAcademyAssignmentRecord(r)));
    const newRows = prepared.map((r, i) => ({ id: ids[i], ...r }));
    const state = get();
    set({ khanAcademyAssignments: [...state.khanAcademyAssignments, ...newRows] });
  },

  /**
   * Khan Academy grades for one subject, in the same shape the Gradebook
   * already expects for lesson-based subjects — lets the Parent Dashboard
   * show Khan Academy skills alongside Mission Control's own lessons
   * without a second, differently-shaped display.
   *
   * WARNING FOR FUTURE USE: same reactivity caveat as
   * `getCurrentQuarterKhanAcademyAssignments` below — don't select this
   * as a function in a component's render body. Not currently used by
   * any component (kept for non-component use).
   */
  getKhanAcademyGradebookData(subject) {
    const { khanAcademyAssignments } = get();
    return khanAcademyAssignments
      .filter((a) => a.subject === subject)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  /**
   * Mission Board view — only the CURRENT quarter's assignments, not
   * every batch ever added (see PROJECT_PLAN.md Part 3, "Khan Academy
   * tracking — quarterly and yearly, not monthly"). Legacy assignments
   * predating the quarterly system (batchLabel like "Month 1 — July
   * 2026", from the retired IXL-diagnostic-driven model) don't match
   * any quarter label and are shown alongside the current quarter
   * rather than hidden — they're real historical work still being
   * graded, not something to bury just because they predate this system.
   *
   * WARNING FOR FUTURE USE: do not select this getter function directly
   * in a React component (`useAppStore((s) => s.getCurrentQuarterKhan...)`)
   * and call it in the render body — the function's reference never
   * changes, so Zustand won't re-render the component when the
   * underlying data does. Confirmed as a real bug during testing.
   * Components should instead select `s.khanAcademyAssignments`
   * (reactive) directly and filter inline — see
   * `KhanAcademyMissionsCard.jsx` for the correct pattern. This getter
   * is kept for non-component use (exports, one-off reports, etc.).
   */
  getCurrentQuarterKhanAcademyAssignments() {
    const { khanAcademyAssignments } = get();
    const { batchLabel: currentQuarterLabel } = getCurrentQuarter();
    return khanAcademyAssignments.filter((a) => {
      const isRecognizedPeriod = isQuarterlyBatchLabel(a.batchLabel) || isSummerBatchLabel(a.batchLabel);
      return a.batchLabel === currentQuarterLabel || !isRecognizedPeriod;
    });
  },

  /**
   * Khan Academy grades for one subject, grouped by quarter batch so a
   * real year-long record builds up as quarters pass — a completed Q1
   * stays visible and graded in its own section after Q2's assignments
   * are added, rather than all-time history mixing into one flat list.
   * Legacy pre-quarterly assignments get their own "Earlier" group.
   *
   * WARNING FOR FUTURE USE: same reactivity caveat noted on
   * `getCurrentQuarterKhanAcademyAssignments` above — not currently used
   * by any component (`KhanAcademyGradesSection` uses the pure
   * `groupByQuarter` helper from `lib/schoolQuarter.js` directly against
   * reactively-selected state instead). Kept here for non-component use.
   */
  getKhanAcademyGradebookDataByQuarter(subject) {
    return groupByQuarter(get().getKhanAcademyGradebookData(subject));
  }
}));

/**
 * Which half of English Language Arts a Khan row sits in.
 *
 * Decided by the URL, never by the title -- the same rule that fixed the Q1
 * ordering bug in August. A row pointing at /humanities/grammar/... is a unit
 * of Khan's Grammar course whatever anybody has renamed it to.
 *
 * Returns null for every subject that has no strands, which is all of them
 * except `reading`.
 */
/**
 * Is this dated piece of work inside the school year?
 *
 * A missing date returns TRUE. It cannot be shown to be out-of-year, and
 * dropping his work because a field is blank is the worse of the two mistakes.
 */
function inSchoolYear(dateish) {
  if (!dateish) return true;
  const d = new Date(dateish);
  if (Number.isNaN(d.getTime())) return true;
  return d.getTime() >= SCHOOL_YEAR_START_DATE.getTime();
}

/** The quarter label a date falls in — injected into quizAveragesByQuarter. */
function quarterLabelForDate(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return null;
  return getCurrentQuarter(d).batchLabel;
}

function khanStrandFor(subject, row) {
  if (subject !== 'reading') return null;
  return khanGrammarUnitByUrl(row?.khanAcademyUrl) ? 'language-arts' : 'reading';
}

/**
 * A SUBJECT AVERAGE, AS A LETTER — ON THE SAME SCALE AS EVERYTHING ELSE.
 *
 * ---- WHY THIS CHANGED (Aug 23, 2026) ----
 *
 * This function used to carry its own five-band scale — 90/80/70/60, no plus
 * or minus — while the rest of the app used the thirteen-band plus/minus
 * `GRADE_SCALE`. Two scales, and the app was showing her both at once:
 * `GRADE_SCALE_SUMMARY` is printed on the Parent Dashboard telling her the
 * scale IS plus/minus, book reports are entered and converted on it, and then
 * the subject letter on the transcript came off a different one.
 *
 * The effect ran one way only. An 80.5% average is a `B-` on the scale she is
 * shown and printed as a flat `B` on the transcript — every subject landing in
 * a minus band was overstated by a full notch, in a document a college reads.
 *
 * Asked which to keep, the parent chose plus/minus everywhere. So the subject
 * letter now comes from `percentToLetter`, the single scale, and there is no
 * longer a second one to drift from it.
 */
function accuracyToLetterGrade(accuracy) {
  return percentToLetter(Math.round(accuracy * 100));
}
