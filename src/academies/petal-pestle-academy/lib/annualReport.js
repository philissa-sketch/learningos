/* ---------------------------------------------------------------------------
 * THE ANNUAL PROGRESS REPORT — v3.78.
 *
 * ---- WHAT GEORGIA ASKS FOR ----
 *
 * O.C.G.A. § 20-2-690(c): a WRITTEN ANNUAL PROGRESS ASSESSMENT, covering each
 * of the five subjects the statute names — reading, language arts,
 * mathematics, social studies and science — kept on file for three years.
 *
 * The five are already mapped to this app's own subject ids in
 * `GEORGIA.requiredSubjects`, and `hoursSummary()` already returns
 * `perStatuteSubject` with a comment saying it exists "so the annual progress
 * report can be written against the five the law actually names". The
 * groundwork was laid for this file before this file existed.
 *
 * ---- BUILT THE WAY LAMAR'S IS, BECAUSE GIGI ASKED FOR THAT EXACTLY ----
 *
 * Mission Control's Report Card, from its own plan: "subject-by-subject LETTER
 * GRADES A-F, based on average accuracy on lessons actually attempted …
 * DELIBERATELY KEPT SEPARATE FROM CURRICULUM-COVERAGE STATS, since 'how much
 * of the curriculum exists so far' and 'how well he's doing' are different
 * things — plus a 'Needs Attention' list of specific weak lessons per subject,
 * printable, and a real downloadable transcript including the grade."
 *
 * And its screenshot shows the shape: ONE grade on the subject line, with an
 * "INSIDE THIS GRADE" breakdown under it, and the note "One grade goes on the
 * transcript. These two are what tell you where to spend the time."
 *
 * ---- ⚠️ THE ERROR THIS FILE EXISTS NOT TO REPEAT, AND GIGI FOUND IT ----
 *
 * His log records it: the Report Card showed "1/106 mastered · 1%" AS IF IT
 * WERE A GRADE — but that number measured how much of the curriculum had been
 * BUILT, "which I control by how fast I build it, not how well he's actually
 * doing". Conflating coverage with performance "made the platform's own
 * unfinished state look like his failure."
 *
 * A nine-year-old's record must never be marked down for a lesson nobody wrote
 * yet. So in this file COVERAGE AND HOURS CANNOT REACH THE GRADE. They are
 * returned beside it, in their own fields, and `check-annual-report` asserts
 * that changing coverage cannot move a single letter.
 *
 * ---- AND UNGRADED IS NOT ZERO ----
 *
 * Blueprint anti-pattern 23: "A missing grade averaged as a zero" → "ungraded
 * is a first-class state everywhere it appears (§3.13)". Lamar's does the same
 * thing in words: "A subject with zero attempts shows 'Not yet graded,' not a
 * misleading 0%."
 *
 * So `grade` is null with a written reason, never 0, and never an F.
 *
 * ---- ONE LADDER, ONE IMPLEMENTATION ----
 *
 * The percent-to-letter conversion is `letterForPercent` from khanGrade.js —
 * the ladder read off Lamar's real report card at v3.75. It is imported, never
 * restated. v3.70's rule: two implementations of one metric drift, and the day
 * they disagree neither number can be trusted.
 * ------------------------------------------------------------------------- */

import { SCHOOL_YEAR } from '../config/calendar.js';
import { GEORGIA, hoursSummary } from './hours.js';
import { letterForPercent, isChallenge } from './khanGrade.js';
import { gradePiece } from '../data/writing/writingPieces.js';
import { officialAttempt } from './assessmentEngine.js';
import { APP_COURSES } from '../data/lessons/appCourses.js';
import { dayKeyOf } from './reviewQueue.js';

/**
 * Which of this app's courses teaches which statute subject.
 *
 * ⚠️ `humanbody` IS DELIBERATELY ABSENT. The Human Body is ENRICHMENT — its
 * own `kind` in curriculumPlan.js says so, and §31 of the master plan says it
 * carries no Georgia element. It is reported, by name, in its own section, and
 * it is NEVER counted toward one of the five. A report that quietly folded an
 * enrichment course into "Science" would be overstating coverage of the thing
 * the statute actually asks about.
 */
const STATUTE_COURSES = {
  Science: ['herbalism', 'sciencelab'],
  'Social studies': ['social']
};

/** Courses the app teaches that are not one of the five. Named, never counted. */
const ENRICHMENT_COURSES = ['humanbody'];

/** Khan course ids that carry each statute subject, via their `subject` field. */
const STATUTE_KHAN_SUBJECTS = {
  Reading: ['reading'],
  'Language arts': ['writing'],
  Mathematics: ['math']
};

/** An average that refuses to invent a number from nothing. */
function mean(values) {
  const nums = values.filter((v) => Number.isFinite(v));
  if (nums.length === 0) return null;
  return Math.round(nums.reduce((a, b) => a + b, 0) / nums.length);
}

/**
 * One component of a subject's grade — a row of the "inside this grade" list.
 *
 * `count` is how many results it is built from, so a letter resting on one
 * sitting cannot be mistaken for a letter resting on twelve.
 */
function component(label, percents, source) {
  const percent = mean(percents);
  if (percent === null) return null;
  return { label, percent, grade: letterForPercent(percent), count: percents.length, source };
}

/**
 * Every graded piece of evidence for one statute subject.
 *
 * ⚠️ WHAT IS DELIBERATELY NOT IN HERE:
 *
 *  · THE CHECK-IN. §3.10.6 keeps diagnostic evidence out of mastery, and a
 *    placement instrument is not a grade — it measures where to start her, not
 *    how she did. It appears under `growth`, on its own scale, per §3.10.8.
 *  · COVERAGE AND HOURS. See the header. They cannot reach a letter.
 *  · THE JOURNAL. It is never graded and never corrected — the oldest locked
 *    rule in this app. Its MARKS are a separate thing and are included, because
 *    Gigi marks them deliberately; the writing itself is not.
 */
function gradedEvidence(statute, data) {
  const { khanGrades = [], writingMarks = [], attempts = [], journalMarks = {} } = data;
  const out = [];

  // ---- Khan: unit tests and the Course Challenge, kept apart ----
  const khanSubjects = STATUTE_KHAN_SUBJECTS[statute] || [];
  if (khanSubjects.length) {
    const mine = khanGrades.filter(
      (g) => g && khanSubjects.includes(g.subject) && Number.isFinite(Number(g.percent))
    );
    const units = mine.filter((g) => !isChallenge(g)).map((g) => Number(g.percent));
    const challenges = mine.filter(isChallenge).map((g) => Number(g.percent));
    const u = component('Khan Academy unit tests', units, 'khan');
    const c = component('Khan Academy Course Challenge', challenges, 'khan-challenge');
    if (u) out.push(u);
    if (c) out.push(c);
  }

  // ---- The app's own weekly and quarterly tests ----
  const courses = STATUTE_COURSES[statute] || [];
  for (const courseId of courses) {
    const byTest = {};
    for (const a of attempts) {
      if (!a || typeof a.testId !== 'string') continue;
      if (!a.testId.startsWith(`${courseId}-`)) continue;
      (byTest[a.testId] = byTest[a.testId] || []).push(a);
    }
    const officials = Object.values(byTest)
      .map((list) => officialAttempt(list))
      .filter((a) => a && Number.isFinite(Number(a.percent)))
      .map((a) => Number(a.percent));
    const course = APP_COURSES.find((c) => c.id === courseId);
    const row = component(`${course ? course.label : courseId} tests`, officials, 'course-test');
    if (row) out.push(row);
  }

  // ---- Writing pieces: book reports and research papers ----
  if (statute === 'Language arts') {
    const marks = writingMarks
      .map((m) => (m && m.pieceId ? gradePiece(m.pieceId, m.marks) : null))
      .filter((g) => g && Number.isFinite(g.percent))
      .map((g) => g.percent);
    const row = component('Book reports and research papers', marks, 'writing-rubric');
    if (row) out.push(row);

    const jm = Object.values(journalMarks || {})
      .map((m) => (m && Number.isFinite(Number(m.percent)) ? Number(m.percent) : null))
      .filter((p) => p !== null);
    const j = component('Daily journal marks', jm, 'journal-mark');
    if (j) out.push(j);
  }

  return out;
}

/** Coverage for a statute subject. NEVER feeds the grade. */
function coverageFor(statute, data) {
  const { lessonReads = [], khanGrades = [] } = data;
  const courses = STATUTE_COURSES[statute] || [];
  const readIds = new Set(lessonReads.map((r) => r && r.lessonId).filter(Boolean));

  let written = 0;
  let read = 0;
  for (const courseId of courses) {
    const course = APP_COURSES.find((c) => c.id === courseId);
    if (!course) continue;
    written += course.lessons.length;
    read += course.lessons.filter((l) => readIds.has(l.id)).length;
  }

  const khanSubjects = STATUTE_KHAN_SUBJECTS[statute] || [];
  const khanUnits = khanGrades.filter(
    (g) => g && khanSubjects.includes(g.subject) && !isChallenge(g)
  ).length;

  return {
    lessonsWritten: written,
    lessonsRead: read,
    khanUnitsRecorded: khanUnits,
    /** Printed as its own line, and it is a statement about the app as much as
     *  about her — which is exactly why it is not a grade. */
    note:
      written === 0 && khanUnits === 0
        ? 'This subject is taught outside the app, so there is no lesson count to give.'
        : null
  };
}

/**
 * Growth — the Check-In, and ONLY the Check-In.
 *
 * §3.10.8: "growth is a delta on ONE INSTRUMENT'S SCALE". This app has exactly
 * one such instrument. A weekly test cannot stand in: those carry
 * `evidenceSource: 'test'`, draw from course banks with no strand, and §3.10.6
 * keeps that wall up deliberately.
 *
 * So this reports the levels and says plainly whether a second sitting exists
 * to compare them against. It does NOT compute a delta it has no second point
 * for, and it never appears inside a letter grade.
 */
function growthFrom(data) {
  const { strandStates = [], baseline = null } = data;
  const rows = (strandStates || [])
    .filter((s) => s && s.strandId)
    .map((s) => ({
      strandId: s.strandId,
      level: Number(s.level),
      settled: !!s.settled,
      baseline: baseline && Number.isFinite(Number(baseline[s.strandId])) ? Number(baseline[s.strandId]) : null
    }))
    .map((r) => ({
      ...r,
      change: r.baseline === null || !Number.isFinite(r.level) ? null : Math.round((r.level - r.baseline) * 100) / 100
    }))
    .sort((a, b) => a.level - b.level);

  const unsettled = rows.filter((r) => !r.settled).length;
  const haveSecondSitting = rows.some((r) => r.change !== null);

  return {
    instrument: 'Check-In',
    rows,
    unsettled,
    haveSecondSitting,
    note: haveSecondSitting
      ? null
      : 'Only one sitting of the Check-In is on record, so there is no growth figure yet — a change needs two readings of the same instrument.'
  };
}

/**
 * The whole report.
 *
 * Every number here is derived from her record at the moment it is called.
 * Nothing is stored, so nothing can go stale, and nothing is typed, so nothing
 * can drift — which is the second reason this file exists. §5.4: "anything
 * countable is generated, never hand-typed", and every hand-typed number in
 * this project has drifted at least once.
 */
export function annualReport(data = {}) {
  const { scheduleDays = {}, scheduleBlocks = [] } = data;
  const hours = hoursSummary({ scheduleDays, blocks: scheduleBlocks });
  const hoursByStatute = Object.fromEntries(
    hours.perStatuteSubject.map((r) => [r.statute, r.hours])
  );

  const subjects = GEORGIA.requiredSubjects.map((req) => {
    const statute = req.statute;
    const inside = gradedEvidence(statute, data);

    /* ---- ONE GRADE, AND IT IS THE MEAN OF ITS COMPONENTS ----
     *
     * Averaged across the component ROWS rather than across every individual
     * result, so eight Khan units cannot drown out one research paper that
     * took her three weeks. Lamar's report card shows the same shape: a
     * subject letter with its parts listed underneath, each carrying its own.
     */
    const percent = mean(inside.map((c) => c.percent));
    const graded = percent !== null;

    return {
      statute,
      appSubjects: req.subjects,
      /** null, never 0 and never F, when there is nothing to grade. */
      grade: graded ? letterForPercent(percent) : null,
      percent: graded ? percent : null,
      ungradedReason: graded
        ? null
        : 'Not yet graded — no completed assessment has been recorded for this subject.',
      inside,
      coverage: coverageFor(statute, data),
      hours: {
        hours: Math.round((hoursByStatute[statute] || 0) * 10) / 10,
        from: req.subjects
      }
    };
  });

  /* ---- WHAT NEEDS ATTENTION, AND IT IS SPECIFIC ----
   *
   * Lamar's carries "a 'Needs Attention' list of specific weak lessons per
   * subject". The most useful version of that for a report written in August
   * is not a weak score — she has almost none yet — it is a subject with NO
   * evidence at all and a year still to run. §5.4's point exactly: the useful
   * moment to find out Social Studies has nothing in it is October, not June.
   */
  const needsAttention = [];
  for (const s of subjects) {
    if (!s.grade) {
      needsAttention.push({
        statute: s.statute,
        what: 'No graded work recorded yet',
        why: 'Georgia asks for an assessment of progress in this subject. There is nothing to assess it from.'
      });
    } else if (s.percent < 70) {
      needsAttention.push({
        statute: s.statute,
        what: `Averaging ${s.percent}% (${s.grade})`,
        why: 'Below the level the rest of her work sits at.'
      });
    }
    if (s.hours.hours <= 0) {
      needsAttention.push({
        statute: s.statute,
        what: 'No instructional hours logged',
        why: 'The statute asks for instruction in this subject, and the ledger has none against it.'
      });
    }
  }

  const enrichment = ENRICHMENT_COURSES.map((id) => {
    const course = APP_COURSES.find((c) => c.id === id);
    const readIds = new Set((data.lessonReads || []).map((r) => r && r.lessonId).filter(Boolean));
    return {
      id,
      label: course ? course.label : id,
      lessonsWritten: course ? course.lessons.length : 0,
      lessonsRead: course ? course.lessons.filter((l) => readIds.has(l.id)).length : 0,
      note: 'Enrichment. Not one of the five subjects the statute names, and never counted as one.'
    };
  });

  return {
    term: {
      id: SCHOOL_YEAR.termId,
      label: SCHOOL_YEAR.label,
      start: SCHOOL_YEAR.start,
      end: SCHOOL_YEAR.end,
      schoolDaysPlanned: SCHOOL_YEAR.declaredSchoolDays
    },
    /** The statute, quoted so the report says what it is answering. */
    statute: {
      cite: 'O.C.G.A. § 20-2-690(c)',
      requires:
        'A written annual progress assessment in each of reading, language arts, mathematics, social studies and science.',
      retainYears: 3
    },
    generatedOn: /* LearningOS, Sept 23 2026: her LOCAL date, not UTC — after 8pm Eastern UTC is already tomorrow. */ dayKeyOf(),
    subjects,
    enrichment,
    growth: growthFrom(data),
    attendance: {
      daysWithWork: hours.daysWithWork,
      daysMeetingRequirement: hours.daysMeetingRequirement,
      daysRequired: GEORGIA.daysPerYear,
      hours: Math.round(hours.hours * 10) / 10,
      hoursRequired: GEORGIA.hoursPerYear
    },
    needsAttention
  };
}

export default annualReport;
