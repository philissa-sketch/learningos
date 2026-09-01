import { participationSummary } from './participationRecord.js';
import { toDateStr } from './scheduler.js';
import { SCHOOL_YEAR_START_DATE } from './schoolQuarter.js';
import { scheduledMinutesByDate } from './scheduledMinutes.js';
import { parseDateStr } from './scheduler.js';
import { EVIDENCE_FOLDERS } from './driveLinks.js';
import { READINESS_SKILLS } from './readiness.js';
import { academyContent } from '../content/academyContent.js';

const { GEORGIA_LAW_CITATION, GEORGIA_REQUIREMENTS = [], MISSION_RUBRIC_CRITERIA = [], findProposal = () => null, instructionProgress = () => null, missionScoreTotals = () => null } = academyContent().compliance;
const { SUBJECT_LABELS = {} } = academyContent().subjects;
const { isSchoolDay = () => false } = academyContent().timetable;

/**
 * The combined compliance packet — Part 8's "generate one combined,
 * exportable compliance packet from them rather than making the parent
 * assemble it by hand each year."
 *
 * Explicitly NOT a new data source. Every line below is read from
 * records the app already holds: attendance, grades, the reading log,
 * the portfolio, administrative records, course descriptions. If
 * something is missing here, the fix is to record it in the app, not to
 * type it into the packet.
 *
 * WHAT THIS DOCUMENT IS CAREFUL NOT TO CLAIM: it does not certify
 * compliance and it is not filed with anyone. Georgia keeps these
 * records with the parent — the point is that she can produce them in
 * one step instead of reconstructing a year from memory. The header of
 * the generated file says exactly that, so a printed copy carries the
 * caveat too rather than losing it on the way to the printer.
 *
 * Plain text on purpose: it prints, it emails, it opens on any machine
 * in ten years, and it does not depend on this app still existing.
 *
 * DRIVE LINKS ARE PRINTED IN FULL, not hidden behind link text. A packet
 * gets printed and emailed; a bare URL survives both, and "click here"
 * survives neither. This is what makes the link approach work as a
 * records strategy rather than just as a UI convenience — the packet is
 * a table of contents that points at where the actual scans live.
 */

function line(label, value) {
  return `${label}: ${value}`;
}

function section(title) {
  return `\n${title}\n${'-'.repeat(title.length)}`;
}

function formatDate(dateStr) {
  if (!dateStr) return 'no date';
  return parseDateStr(dateStr.slice(0, 10)).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

const KIND_LABELS = {
  'field-trip': 'Field Trips',
  volunteer: 'Volunteer & Service Hours',
  extracurricular: 'Extracurricular Activities',
  award: 'Awards & Certificates',
  test: 'Standardized Test Records',
  'work-sample': 'Student Work Samples'
};

export function buildCompliancePacket({
  studentName = 'Student',
  schoolYear = '',
  generatedOn,
  allAttendance = {},
  reportCard = [],
  readingLog = [],
  portfolio = [],
  adminRecords = [],
  fieldTrips = [],
  courseDescriptions = {},
  complianceChecks = {},
  evidenceLinks = {},
  missionEvaluations = [],
  readinessAwards = {},
  // The timetable side of attendance — see lib/scheduledMinutes.js. Passed in
  // rather than imported from the store so this stays a pure function.
  khanDailyLog = {},
  peWorkoutLog = [],
  guitarLog = [],
  typingLog = [],
  gardenLog = [],
  scheduleBlocks = null,
  writingEntries = [],
  weeklyWordState = {},
  lessonProgress = {},
  morningMeetings = {},
  khanAcademyAssignments = []
}) {
  const out = [];

  out.push('HOME STUDY PROGRAM — RECORDS PACKET');
  out.push('='.repeat(38));
  out.push(line('Student', studentName));
  if (schoolYear) out.push(line('School year', schoolYear));
  out.push(line('Generated', formatDate(generatedOn)));
  out.push(line('State requirements referenced', `Georgia, ${GEORGIA_LAW_CITATION}`));
  out.push('');
  out.push(
    'This packet is assembled from records kept in Mission Control Homeschool Academy.'
  );
  out.push(
    'It is a convenience copy of records the parent already keeps. It is not filed with'
  );
  out.push(
    'any agency, it does not certify compliance, and it is not legal advice. Verify current'
  );
  out.push('requirements against the statute or the Georgia Department of Education.');

  // ---- Instruction ----
  // Same scoping as the on-screen counter — the packet and the screen must
  // never disagree about how many school days there were.
  const progress = instructionProgress(allAttendance, {
    schoolYearStart: toDateStr(SCHOOL_YEAR_START_DATE),
    isSchoolDay,
    scheduledMinutesByDate: scheduledMinutesByDate({
      khanDailyLog, peWorkoutLog, guitarLog, typingLog, gardenLog, scheduleBlocks, writingEntries, weeklyWordState,
      lessonProgress,
      morningMeetings,
      khanAcademyAssignments
    })
  });
  out.push(section('1. DAYS OF INSTRUCTION'));
  out.push(line('Days with recorded activity', `${progress.daysLogged} of ${progress.required}`));
  out.push(line('Days meeting 4.5 hours', String(progress.fullDays)));
  out.push(line('Days remaining to reach 180', String(progress.remaining)));
  out.push(line('Hours measured in the app', String(Math.round(progress.appMinutes / 60))));
  out.push(line('Hours recorded by the parent', String(Math.round(progress.offlineMinutes / 60))));
  out.push('');
  out.push('Note: "days with recorded activity" counts any day with real completed work or');
  out.push('recorded time. Instruction hours come from two sources, kept separate above and');
  out.push('added together only for the 4.5-hour test: minutes this app measured while it was');
  out.push('in the foreground, and minutes the parent recorded for instruction that happened');
  out.push('away from it — Khan Academy, physical books, PE, field trips, labs and building.');

  // ---- Subjects and grades ----
  out.push(section('2. SUBJECTS AND PROGRESS'));
  if (reportCard.length === 0) {
    out.push('No graded subjects recorded yet.');
  } else {
    for (const row of reportCard) {
      const label = SUBJECT_LABELS[row.subject] || row.subject;
      // Recorded by participation, not by grade — PE & Nutrition has no
      // assessments by design. "0 of 0 lessons mastered" would misrepresent a
      // subject he does every single day.
      if (row.isParticipation) {
        /**
         * EACH SUBJECT DESCRIBES ITSELF. (Fixed Aug 15, 2026.)
         *
         * This line had PE's field names hardcoded. Gardening and Guitar have
         * none of them, so every value fell through the `|| 0` and this packet
         * told a Georgia reviewer, for a boy who had worked in the garden all
         * season: "Gardening & Applied Engineering: participation credit — 0
         * workouts completed, 0 days tracked, 0 of 0 weekly goals met."
         *
         * Not a crash and not a blank — a confident, specific, wrong sentence
         * in a legal record, about activities the subject does not even have.
         * PE was the only participation subject when this was written, and a
         * default that is right for the only case is invisible until there is
         * a second one.
         */
        out.push(`${label}: ${participationSummary(row.subject, row.participation)}`);
        continue;
      }
      const grade = row.letterGrade || 'not yet graded';
      const pct =
        typeof row.averageAccuracy === 'number' ? ` (${Math.round(row.averageAccuracy * 100)}%)` : '';
      out.push(`${label}: ${grade}${pct} — ${row.mastered} of ${row.totalLessons} lessons mastered`);
      // Where a subject carries two distinct skills under one transcript
      // line, the packet shows both. A single averaged figure would hide
      // exactly the imbalance a reviewer would want to see.
      for (const strand of row.strands || []) {
        if (!strand.letterGrade) continue;
        out.push(
          `    ${strand.label}: ${strand.letterGrade} (${Math.round(strand.averageAccuracy * 100)}%) — ${strand.mastered} of ${strand.totalLessons} mastered`
        );
      }
    }
  }

  // ---- Course descriptions ----
  const described = Object.entries(courseDescriptions).filter(([, v]) => v?.description);
  out.push(section('3. COURSE DESCRIPTIONS'));
  if (described.length === 0) {
    out.push('None written yet.');
  } else {
    for (const [subject, value] of described) {
      out.push(`${SUBJECT_LABELS[subject] || subject}:`);
      out.push(value.description);
      out.push('');
    }
  }

  // ---- Reading ----
  out.push(section('4. READING LOG'));
  if (readingLog.length === 0) {
    out.push('No reading logged yet.');
  } else {
    out.push(line('Entries', String(readingLog.length)));
    for (const entry of readingLog.slice(0, 100)) {
      out.push(
        `${formatDate(entry.date)} — ${entry.title}${entry.author ? ` (${entry.author})` : ''}: ${entry.amount} ${entry.unit}`
      );
    }
    if (readingLog.length > 100) out.push(`...and ${readingLog.length - 100} more entries.`);
  }

  // ---- Portfolio ----
  out.push(section('5. PORTFOLIO OF COMPLETED WORK'));
  if (portfolio.length === 0) {
    out.push('No portfolio entries yet.');
  } else {
    for (const item of portfolio.slice(0, 100)) {
      const subject = item.subject ? ` [${SUBJECT_LABELS[item.subject] || item.subject}]` : '';
      /**
       * THE FIELD IS dateCompleted, NOT completedAt. (Fixed Aug 13, 2026.)
       *
       * This line read `item.completedAt`, which portfolio rows have never
       * had — the schema is `portfolio: '++id, dateCompleted'` (db.js) and
       * addPortfolioEntry writes `dateCompleted`. So `formatDate(undefined)`
       * returned its 'no date' fallback and EVERY portfolio line in the
       * Georgia records packet printed "no date — <title>". Every entry, for
       * as long as this section has existed.
       *
       * It survived because the fallback is graceful: a packet full of
       * "no date" looks like a parent who has not filled things in, not like
       * a bug. A loud failure here would have been found in a day.
       *
       * `completedAt` is kept as a fallback because a row that arrives from
       * the other computer's export, or from an older build, may carry it.
       */
      out.push(`${formatDate(item.dateCompleted || item.completedAt)} — ${item.title}${subject}`);
      if (item.reflection) out.push(`    Reflection: ${item.reflection}`);
      if (item.driveUrl) out.push(`    File: ${item.driveUrl}`);
    }
    if (portfolio.length > 100) out.push(`...and ${portfolio.length - 100} more entries.`);
  }

  // ---- Administrative records ----
  out.push(section('6. ACTIVITY AND TEST RECORDS'));
  /**
   * COMPLETED FIELD TRIPS COME FROM TWO PLACES, AND BOTH BELONG HERE.
   * (Fixed Aug 13, 2026.)
   *
   * This section used to read `adminRecords` alone. That table is what the
   * parent types by hand in Records. But the app also has a Field Trip
   * Planner with 21 researched Georgia trips in it, and completing one there
   * wrote to `fieldTrips` — a table this packet never looked at.
   *
   * So a trip she planned, drove to, and marked complete reached her Georgia
   * records only as a generic Portfolio line, while the section headed
   * "Field Trips" sat empty unless she typed the same trip in a second time.
   *
   * The dedup below is the reason this is safe to merge rather than append:
   * if she DID type it in by hand, destination+date matches and the planner
   * copy stands down, so the trip appears once.
   */
  const handKeys = new Set(
    adminRecords
      .filter((r) => r.kind === 'field-trip')
      .map((r) => `${(r.title || '').trim().toLowerCase()}|${(r.date || '').slice(0, 10)}`)
  );
  const plannerTrips = fieldTrips
    .filter((t) => t.status === 'completed' && t.destination)
    .map((t) => ({
      kind: 'field-trip',
      date: (t.date || t.completedAt || '').slice(0, 10),
      title: t.destination,
      hours: Number(t.hours) || 0,
      detail: t.notes || null,
      driveUrl: null
    }))
    .filter((t) => !handKeys.has(`${t.title.trim().toLowerCase()}|${t.date}`));

  const byKind = {};
  for (const record of [...adminRecords, ...plannerTrips]) (byKind[record.kind] ??= []).push(record);
  for (const list of Object.values(byKind)) {
    list.sort((a, b) => (a.date || '').localeCompare(b.date || ''));
  }
  const kinds = Object.keys(KIND_LABELS).filter((k) => byKind[k]?.length);
  if (kinds.length === 0) {
    out.push('None recorded yet.');
  } else {
    for (const kind of kinds) {
      out.push('');
      out.push(KIND_LABELS[kind]);
      // Field trips carry hours for the same reason volunteering does: it is
      // instructional time, and a reviewer asking "how much" should not have
      // to add up a list by hand.
      if (kind === 'volunteer' || kind === 'field-trip') {
        const total = byKind[kind].reduce((n, r) => n + (Number(r.hours) || 0), 0);
        if (total > 0) out.push(`Total hours: ${total}`);
      }
      for (const record of byKind[kind]) {
        const hours =
          (kind === 'volunteer' || kind === 'field-trip') && record.hours
            ? ` — ${record.hours} hours`
            : '';
        /**
         * THE TEST SCORE PRINTS. (Aug 23, 2026.)
         *
         * `addAdminRecordEntry` stores a `score` on every `kind: 'test'` row,
         * deliberately, with a note about tracking growth across years. This
         * loop printed a date and a title and dropped it — so under the
         * heading "Standardized Test Records", in the one document a Georgia
         * reviewer is handed, the packet named the test and withheld the
         * result. The number was on screen everywhere else and missing from
         * the only place it is evidence.
         */
        const score = kind === 'test' && record.score ? ` — ${record.score}` : '';
        out.push(`${formatDate(record.date)} — ${record.title}${score}${hours}`);
        if (record.detail) out.push(`    ${record.detail}`);
        if (record.driveUrl) out.push(`    File: ${record.driveUrl}`);
      }
    }
  }

  // ---- Quarterly Mission Evaluations ----
  //
  // Placed after the portfolio and before the filing-cabinet address,
  // because for a homeschool record this IS the assessment evidence —
  // it stands in for the standardized testing this family deliberately
  // does not do more often than the law requires.
  //
  // ONLY APPROVED EVALUATIONS APPEAR. A scored-but-unapproved rubric is
  // a draft, and a draft that shows up in a records packet a year later
  // reads exactly like a finished assessment.
  out.push(section('7. QUARTERLY MISSION EVALUATIONS'));
  const approvedMissions = missionEvaluations
    .filter((m) => m.parentApproved && missionScoreTotals(m.scores))
    .sort((a, b) => (a.quarter || '').localeCompare(b.quarter || ''));
  if (approvedMissions.length === 0) {
    out.push('None finalized yet.');
  } else {
    out.push('Project-based assessment, scored on the same rubric each quarter and');
    out.push('finalized by the parent. Scores run 1 (not yet) to 4 (excellent).');
    for (const mission of approvedMissions) {
      const totals = missionScoreTotals(mission.scores);
      const title = mission.customTitle || findProposal(mission.projectId)?.title || 'Mission';
      out.push('');
      out.push(`${mission.quarter} — ${title}`);
      out.push(`  Score: ${totals.total} of ${totals.max}`);
      for (const criterion of MISSION_RUBRIC_CRITERIA) {
        out.push(`    ${criterion.label}: ${mission.scores[criterion.id]}`);
      }
      if (mission.completedAt) out.push(`  Completed: ${formatDate(mission.completedAt)}`);
      if (mission.driveUrl) out.push(`  Files: ${mission.driveUrl}`);
      if (mission.feedback) {
        out.push('  Assessment:');
        for (const paragraph of mission.feedback.split('\n').filter(Boolean)) {
          out.push(`    ${paragraph}`);
        }
      }
    }
  }


  /**
   * ---- THE SKILLS NO TEST MEASURES. (Added Aug 28, 2026.) ----
   *
   * The parent: *"how to use the engineer readiness in the parent dashboard.
   * that isn't connected to anything."*
   *
   * She was right. Eleven skills, three levels, a written rubric, and a full
   * dated history of every level change — all of it stored, and read by exactly
   * two screens: the one she awards on, and a counter on his rewards page. It
   * reached no record at all.
   *
   * The rule at the top of this file says what that made it: *"Every line below
   * is read from records the app already holds. If something is missing here,
   * the fix is to record it in the app, not to type it into the packet."* This
   * WAS recorded in the app. The packet was the thing that was wrong.
   *
   * `readiness.js` states the case better than this comment can: *"a homeschool
   * transcript struggles to evidence soft skills, and dated levels against a
   * written standard are exactly that evidence."*
   *
   * ---- WHY THE HISTORY AND NOT JUST THE LEVEL ----
   *
   * "Gold in Technical Writing" is an opinion. "Bronze Oct 2026, Silver Feb
   * 2027, Gold Mar 2028" is a record of growth, and the second one is what a
   * reader can actually use. The history array already exists precisely because
   * overwriting it once destroyed the date he first reached Bronze.
   *
   * ---- THE EMPTY STATE IS A REAL ANSWER ----
   *
   * A skill with no award prints as not yet awarded. It does NOT print Bronze,
   * a dash, or a zero. This is the same rule `participationRecord.js` enforces:
   * a blank is true, an invented level is a lie in a compliance document.
   */
  out.push(section('8. ENGINEER READINESS'));
  const awardedSkills = READINESS_SKILLS.filter((skill) => readinessAwards[skill.id]?.level);
  out.push('Practical engineering skills, assessed by the parent against a written');
  out.push('rubric rather than by a test. Levels run Bronze (does it when prompted)');
  out.push('to Silver (does it unprompted, and can say why) to Gold (does it in');
  out.push('open-ended situations, and can teach it). Not graded, and deliberately');
  out.push('not part of any subject average.');
  out.push('');
  if (awardedSkills.length === 0) {
    out.push(`None awarded yet. ${READINESS_SKILLS.length} skills are tracked.`);
  } else {
    out.push(`${awardedSkills.length} of ${READINESS_SKILLS.length} skills awarded.`);
    for (const skill of awardedSkills) {
      const award = readinessAwards[skill.id];
      out.push('');
      out.push(`${skill.name} — ${award.level}`);
      const criteria = skill.levels?.[award.level];
      if (criteria) out.push(`  Standard met: ${criteria}`);
      // The dated ladder. Falls back to the single updatedAt for a row written
      // before the history array existed, so an early award is not shown as
      // undated when the app does know when it happened.
      const history = Array.isArray(award.history) && award.history.length
        ? award.history
        : award.updatedAt
          ? [{ level: award.level, at: award.updatedAt }]
          : [];
      for (const step of history) {
        out.push(`  ${step.level}: ${formatDate(step.at)}`);
      }
      if (award.note) out.push(`  Evidence: ${award.note}`);
    }
    const notYet = READINESS_SKILLS.filter((skill) => !readinessAwards[skill.id]?.level);
    if (notYet.length > 0) {
      out.push('');
      out.push(`Not yet awarded: ${notYet.map((s) => s.name).join(', ')}.`);
    }
  }

  // ---- Checklist ----
  out.push(section('9. GEORGIA REQUIREMENTS CHECKLIST'));
  out.push('As marked by the parent. Ticking a box records her own confirmation;');
  out.push('this app does not verify or file anything.');
  out.push('');
  for (const requirement of GEORGIA_REQUIREMENTS) {
    const check = complianceChecks[requirement.id];
    const mark = check?.done ? '[x]' : '[ ]';
    const when = check?.done && check.completedAt ? ` (marked ${formatDate(check.completedAt)})` : '';
    out.push(`${mark} ${requirement.title}${when}`);
  }

  // ---- Where the supporting files live ----
  //
  // Last, not first, because it is a pointer rather than a record. A
  // reader wants the attendance and the grades before they want the
  // filing cabinet's address.
  out.push(section('10. SUPPORTING FILES'));
  const linkedFolders = EVIDENCE_FOLDERS.filter((folder) => evidenceLinks[folder.key]);
  if (linkedFolders.length === 0) {
    out.push('No document folders linked. Scans, photos, certificates and score reports');
    out.push('are not stored in this app — link the folders that hold them so this packet');
    out.push('can point at them.');
  } else {
    out.push('This app stores no files, only links. The documents behind these records live');
    out.push('at the addresses below. Access to them is controlled where they are stored, not');
    out.push('by this packet.');
    for (const folder of linkedFolders) {
      out.push('');
      out.push(folder.label);
      out.push(`  ${evidenceLinks[folder.key]}`);
    }
  }

  out.push('');
  out.push('End of packet.');
  return out.join('\n');
}
