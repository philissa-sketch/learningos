import { useState } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import { buildCompliancePacket } from '../../lib/compliancePacket.js';
import { parseDateStr, todayDateStr, toDateStr, daysUntil } from '../../lib/scheduler.js';
import { instructionMinutes } from '../../lib/instructionTime.js';
import { SCHOOL_YEAR_START_DATE } from '../../lib/schoolQuarter.js';
import { scheduledMinutesByDate, fullInstructionalDayMinutes } from '../../lib/scheduledMinutes.js';
import { EvidenceFoldersSection } from './EvidenceLink.jsx';
import { academyContent } from '../../content/academyContent.js';

const { GEORGIA_LAW_CITATION, GEORGIA_MINUTES_PER_DAY, GEORGIA_REQUIRED_SUBJECTS = [], GEORGIA_REQUIREMENTS = [], declarationCoversToday = () => false, instructionProgress = () => null, nextDeclarationDeadline = () => null } = academyContent().compliance;
const { SUBJECT_LABELS = {} } = academyContent().subjects;
const { isSchoolDay = () => false } = academyContent().timetable;

/**
 * Georgia compliance — PROJECT_PLAN.md Part 8's "State compliance
 * checklist (Georgia)" and the combined compliance packet.
 *
 * Every requirement was verified against two independent sources before
 * this was built (see data/admin/georgiaCompliance.js), and each one
 * links its source so she can check any claim rather than trusting the
 * app.
 *
 * THE HONESTY LINE THIS COMPONENT HOLDS: it files nothing, verifies
 * nothing, and gives no legal advice. Ticking a box records what SHE
 * says she has done. Where the app genuinely holds supporting evidence —
 * attendance, grades, test records — it says so and shows the real
 * number; where it holds nothing, it says that too rather than implying
 * a green checkmark means compliance.
 */
export function ComplianceSection() {
  const complianceChecks = useAppStore((s) => s.complianceChecks);
  const toggleComplianceCheck = useAppStore((s) => s.toggleComplianceCheck);
  const allAttendance = useAppStore((s) => s.allAttendance);
  const adminRecords = useAppStore((s) => s.adminRecords);
  const readingLog = useAppStore((s) => s.readingLog);
  const portfolio = useAppStore((s) => s.portfolio);
  // Completed trips from the Planner belong in section 6 alongside the ones
  // she types by hand. The packet dedups them on destination + date.
  const fieldTrips = useAppStore((s) => s.fieldTrips);
  const courseDescriptions = useAppStore((s) => s.courseDescriptions);
  const getReportCardData = useAppStore((s) => s.getReportCardData);
  const missionEvaluations = useAppStore((s) => s.missionEvaluations);
  // Engineer Readiness reached no record at all until Aug 28, 2026 — see the
  // section it feeds in compliancePacket.js.
  const readinessAwards = useAppStore((s) => s.readinessAwards);
  const getAllSubjectsForRecordkeeping = useAppStore((s) => s.getAllSubjectsForRecordkeeping);
  const evidenceLinks = useAppStore((s) => s.evidenceLinks);
  // The timetable side of attendance. He ticks a subject done; her schedule
  // says how long that block runs; those minutes are instruction whether or not
  // this tab was in front of him.
  const khanDailyLog = useAppStore((s) => s.khanDailyLog);
  const peWorkoutLog = useAppStore((s) => s.peWorkoutLog);
  const guitarLog = useAppStore((s) => s.guitarLog);
  const typingLog = useAppStore((s) => s.typingLog);
  const gardenLog = useAppStore((s) => s.gardenLog);
  const scheduleBlocks = useAppStore((s) => s.scheduleBlocks);
  // The store calls it weeklyWords — { spelling: row, vocabulary: row }.
  const weeklyWordState = useAppStore((s) => s.weeklyWords);
  const writingEntries = useAppStore((s) => s.writingEntries);
  /**
   * The lessons THIS APP teaches. Without it the Rotating Block — Aerospace,
   * Technology, Social Studies and Robotics, 45 minutes a day — could never
   * credit, because those four subjects are not on the Khan checklist.
   */
  const lessonProgress = useAppStore((s) => s.lessonProgress);
  const morningMeetings = useAppStore((s) => s.morningMeetings);
  /**
   * Needed to credit an English day to the right block: `reading` is one
   * subject code carrying two subjects, and only the row he was shown says
   * which. See STRAND_BLOCK in scheduledMinutes.js.
   */
  const khanAcademyAssignments = useAppStore((s) => s.khanAcademyAssignments);

  const [studentName, setStudentName] = useState('');

  const today = todayDateStr();
  /**
   * ---- THE DEADLINE BANNER NOW ASKS WHETHER SHE HAS FILED ----
   *
   * The parent: **"I ticked that i completed the Declaration of Intent in the
   * parent dashboard. The app still shows that it is due."**
   *
   * It did, and it always would have. This banner was computed from the
   * calendar alone — `nextDeclarationDeadline(today)` — and never once looked
   * at `complianceChecks['declaration-of-intent']`, which is the only record of
   * her having done it. Ticking the box below changed the checklist and
   * nothing else, so the one item on this screen with a real legal date sat
   * permanently overdue-looking whatever she did.
   *
   * THE FILING YEAR, NOT THE DATE, IS WHAT A TICK COVERS. Georgia's
   * declaration is annual and due September 1. Filing it in August 2026 covers
   * the 2026-27 school year, so the banner should roll to September 1, 2027 —
   * not simply go quiet, which would leave her with no date at all.
   *
   * A tick from a PREVIOUS year does not count. The record keeps one entry per
   * requirement rather than one per year, so the test is whether the tick
   * happened after the last deadline that has already passed.
   */
  const declarationCheck = complianceChecks['declaration-of-intent'];
  const declarationFiledAt = declarationCheck?.done ? declarationCheck.completedAt || null : null;
  /**
   * ---- THIS ASKED THE WRONG QUESTION FOR A YEAR (fixed Aug 26, 2026) ----
   *
   * It read: was this ticked after LAST September 1? For a Declaration filed in
   * August, which is the normal case and hers, that is right. For one filed even
   * two days LATE — September 3 — it reports the FOLLOWING August that the
   * Declaration is already filed. It is not; that was last year's, filed late,
   * and this banner would sit green through a deadline she had genuinely missed.
   *
   * A false "due" is a nudge. A false "filed" is a missed legal filing.
   *
   * `declarationCoversToday` asks the question this always meant: does the tick
   * belong to the same SCHOOL YEAR we are in now? See georgiaCompliance.js.
   */
  const filedForThisYear = declarationCoversToday(declarationFiledAt, today);
  const deadline = filedForThisYear
    ? toDateStr(new Date(Number(today.slice(0, 4)) + (today <= nextDeclarationDeadline(today) ? 1 : 2), 8, 1))
    : nextDeclarationDeadline(today);
  const daysLeft = daysUntil(deadline, today);
  /**
   * Scoped to real school days. (Aug 16, 2026.) The minute-timer in App.jsx
   * writes an attendance row on any day the tab is open, including weekends,
   * days before the school year began, and time spent on the PARENT's computer.
   * Counting all of it toward Georgia's 180 put a Saturday in July in her
   * record as a school day.
   */
  const scheduledByDate = scheduledMinutesByDate({
    khanDailyLog, peWorkoutLog, guitarLog, typingLog, gardenLog, scheduleBlocks, writingEntries, weeklyWordState,
    lessonProgress,
    morningMeetings,
    khanAcademyAssignments
  });
  const progress = instructionProgress(allAttendance, {
    schoolYearStart: toDateStr(SCHOOL_YEAR_START_DATE),
    isSchoolDay,
    scheduledMinutesByDate: scheduledByDate
  });
  const fullDayMinutes = fullInstructionalDayMinutes(scheduleBlocks, { weekday: 1 });
  const runningSubjects = new Set(getAllSubjectsForRecordkeeping());
  const lastTest = adminRecords.filter((r) => r.kind === 'test').sort((a, b) => b.date.localeCompare(a.date))[0];

  const handleDownload = () => {
    const packet = buildCompliancePacket({
      studentName: studentName.trim() || 'Student',
      generatedOn: today,
      allAttendance,
      reportCard: getReportCardData(),
      readingLog,
      portfolio,
      adminRecords,
      fieldTrips,
      courseDescriptions,
      complianceChecks,
      evidenceLinks,
      missionEvaluations,
      readinessAwards,
      khanDailyLog,
      peWorkoutLog,
      guitarLog,
      typingLog,
      gardenLog,
      scheduleBlocks,
      writingEntries,
      weeklyWordState,
      lessonProgress,
      morningMeetings,
      khanAcademyAssignments
    });
    const blob = new Blob([packet], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `homeschool-records-packet-${today}.txt`;
    // Firefox ignores a click on a detached anchor. See the same note on the
    // transcript download in ParentDashboard. (Aug 23, 2026.)
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Compliance — Georgia</p>
        <h3 className="mt-1 font-display text-lg font-700 text-ink-100">What Georgia Actually Requires</h3>
        <p className="mt-2 text-sm text-ink-300">
          Every requirement below was checked against two independent sources, and each one links where it came
          from. <strong>This is not legal advice, and nothing here is filed with anyone.</strong> Ticking a box
          records what you say you've done — the app doesn't verify it. Confirm against {GEORGIA_LAW_CITATION} or
          the Georgia DOE before relying on it.
        </p>
      </div>

      {/* The one thing with a real, dated deadline. */}
      <div
        className={
          'rounded-xl border p-5 shadow-panel ' +
          (daysLeft <= 45 ? 'border-signal-amber/50 bg-signal-amber/5' : 'border-space-700 bg-space-800')
        }
      >
        <p
          className={
            'text-xs font-display uppercase tracking-widest ' +
            (filedForThisYear ? 'text-signal-green' : 'text-signal-amber')
          }
        >
          {filedForThisYear ? 'Filed' : 'Next deadline'}
        </p>
        <h3 className="mt-1 font-display text-lg font-700 text-ink-100">
          {filedForThisYear ? 'Declaration of Intent — filed' : 'Declaration of Intent — due '}
          {!filedForThisYear
            && parseDateStr(deadline).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
        </h3>
        <p className="mt-2 text-sm text-ink-300">
          {filedForThisYear ? (
            <>
              You marked this done
              {declarationFiledAt
                ? ` on ${parseDateStr(declarationFiledAt.slice(0, 10)).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}`
                : ''}
              . The next one is due{' '}
              {parseDateStr(deadline).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
              {' '}— {daysLeft} day{daysLeft === 1 ? '' : 's'} from today.
            </>
          ) : (
            <>
              {daysLeft <= 0
                ? 'That date has passed. File as soon as you can.'
                : `${daysLeft} day${daysLeft === 1 ? '' : 's'} from today.`}{' '}
              Filed with the Georgia Department of Education, every year by September 1.
            </>
          )}
        </p>
        {/**
          * The honesty line this whole screen holds. A tick is her saying she
          * filed it; the app has sent nothing to anybody and must not imply it
          * has.
          */}
        {filedForThisYear && (
          <p className="mt-1.5 text-xs text-ink-500">
            This records what you told the app. It files nothing with the state.
          </p>
        )}
      </div>

      {/* Real evidence the app can actually show. */}
      <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">What your records show</p>
        <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-space-700 bg-space-900 p-4">
            <p className="text-xs font-display uppercase tracking-widest text-ink-500">Days Logged</p>
            <p className="mt-1 font-display text-3xl font-700 text-signal-cyan">
              {progress.daysLogged}
              <span className="text-base font-400 text-ink-500"> / {progress.required}</span>
            </p>
            <p className="mt-1 text-xs text-ink-500">{progress.remaining} to go</p>
          </div>
          <div className="rounded-lg border border-space-700 bg-space-900 p-4">
            <p className="text-xs font-display uppercase tracking-widest text-ink-500">Met 4.5 Hours</p>
            <p className="mt-1 font-display text-3xl font-700 text-signal-amber">{progress.fullDays}</p>
            <p className="mt-1 text-xs text-ink-500">
              {Math.round(progress.scheduledMinutes / 60)}h from his schedule ·{' '}
              {Math.round(progress.appMinutes / 60)}h measured on screen ·{' '}
              {Math.round(progress.offlineMinutes / 60)}h you logged
            </p>
            {progress.shortDays > 0 && (
              <p className="mt-1 text-xs text-signal-amber">
                {progress.shortDays} school {progress.shortDays === 1 ? 'day is' : 'days are'} under 4.5h — add
                the off-screen time below
              </p>
            )}
          </div>
          <div className="rounded-lg border border-space-700 bg-space-900 p-4">
            <p className="text-xs font-display uppercase tracking-widest text-ink-500">Last Standardized Test</p>
            <p className="mt-1 font-display text-lg font-700 text-ink-100">
              {lastTest ? lastTest.date : 'None recorded'}
            </p>
            <p className="mt-1 text-xs text-ink-500">Required at least every 3 years</p>
          </div>
        </div>

        {(progress.excludedBeforeStart > 0 || progress.excludedNonSchoolDays > 0) && (
          <p className="mt-3 rounded-lg border border-space-700 bg-space-900 px-3 py-2 text-xs text-ink-400">
            <span className="font-display text-ink-200">Not counted toward the 180:</span>{' '}
            {progress.excludedBeforeStart > 0 && (
              <>
                {progress.excludedBeforeStart} day{progress.excludedBeforeStart === 1 ? '' : 's'} before the
                school year began
              </>
            )}
            {progress.excludedBeforeStart > 0 && progress.excludedNonSchoolDays > 0 && ' · '}
            {progress.excludedNonSchoolDays > 0 && (
              <>
                {progress.excludedNonSchoolDays} weekend or holiday{' '}
                {progress.excludedNonSchoolDays === 1 ? 'day' : 'days'}
              </>
            )}
            . The app records a minute whenever it is open, on any day and on either computer. Log offline
            minutes for a day you really did teach and it counts, whatever day of the week it is.
          </p>
        )}

        <OfflineInstructionEntry />

        <MorningMeetingLog />

        <div className="mt-4">
          <p className="text-[10px] font-display uppercase tracking-widest text-ink-600">
            The five subjects Georgia names
          </p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {GEORGIA_REQUIRED_SUBJECTS.map((required) => {
              const covered = required.subjectIds.some((id) => runningSubjects.has(id));
              return (
                <span
                  key={required.law}
                  className={
                    'rounded-full border px-2 py-0.5 text-[10px] font-display uppercase tracking-widest ' +
                    (covered
                      ? 'border-signal-green/40 bg-signal-green/10 text-signal-green'
                      : 'border-signal-red/40 bg-signal-red/10 text-signal-red')
                  }
                >
                  {required.law}
                  {covered ? '' : ' — not running'}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* The checklist itself. */}
      <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Checklist</p>
        <div className="mt-3 space-y-2">
          {GEORGIA_REQUIREMENTS.map((requirement) => {
            const check = complianceChecks[requirement.id];
            const done = Boolean(check?.done);
            return (
              <div key={requirement.id} className="rounded-lg border border-space-700 bg-space-900 px-3 py-3">
                <button
                  type="button"
                  onClick={() => toggleComplianceCheck(requirement.id)}
                  aria-pressed={done}
                  className="flex w-full items-start gap-2.5 text-left"
                >
                  <span
                    aria-hidden="true"
                    className={
                      'mt-0.5 flex h-4 w-4 flex-none items-center justify-center rounded border text-[10px] font-700 ' +
                      (done ? 'border-signal-cyan bg-signal-cyan text-space-950' : 'border-space-600 text-transparent')
                    }
                  >
                    ✓
                  </span>
                  <span className="min-w-0">
                    <span
                      className={
                        'block font-display text-sm font-700 ' + (done ? 'text-ink-500' : 'text-ink-100')
                      }
                    >
                      {requirement.title}
                    </span>
                    <span className="mt-0.5 block text-xs text-ink-300">{requirement.detail}</span>
                  </span>
                </button>
                <p className="mt-1.5 pl-7 text-xs text-ink-600">
                  {requirement.evidenceNote}{' '}
                  <a
                    href={requirement.source}
                    target="_blank"
                    rel="noreferrer"
                    className="text-signal-cyan underline hover:brightness-110"
                  >
                    Source
                  </a>
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Where the actual files live. The app stores links, never files. */}
      <EvidenceFoldersSection />

      {/* The packet. */}
      <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Records Packet</p>
        <h3 className="mt-1 font-display text-lg font-700 text-ink-100">Everything in One File</h3>
        <p className="mt-2 text-sm text-ink-300">
          Attendance, grades, course descriptions, reading log, portfolio, activity and test records, and this
          checklist — assembled from what's already in the app. Georgia keeps these records with you, not with the
          state; this just means you're not rebuilding a year from memory. Plain text, so it prints, emails, and
          still opens in ten years.
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="Student name for the packet"
            className="min-w-[14rem] flex-1 rounded-lg border border-space-600 bg-space-900 px-3 py-2 text-sm text-ink-100 placeholder:text-ink-500 focus:border-signal-cyan focus:outline-none"
          />
          <button
            type="button"
            onClick={handleDownload}
            className="rounded-lg bg-signal-cyan px-4 py-2 font-display font-700 text-space-950 transition hover:brightness-110"
          >
            Download Packet
          </button>
        </div>
        <p className="mt-2 text-xs text-ink-600">
          Keep a copy somewhere outside this app. Georgia asks you to retain records for at least three years, and
          browser storage is not a safe long-term home for them.
          {evidenceLinks.packets && (
            <>
              {' '}
              <a
                href={evidenceLinks.packets}
                target="_blank"
                rel="noreferrer"
                className="text-signal-cyan underline hover:brightness-110"
              >
                Save it to your Compliance Packets folder
              </a>
              .
            </>
          )}
        </p>
      </div>
    </div>
  );
}

/**
 * Record instruction that happened away from this app.
 *
 * From the first-week readiness pass (August 6, 2026). The app counts a
 * minute only while its own tab is in the foreground — correct, and a
 * chronically incomplete picture of the school day. Khan Academy is
 * where the core academics actually happen; reading a physical book, PE,
 * a field trip, a lab and a hands-on build are all real instruction this
 * app never sees.
 *
 * Without this, "Met 4.5 Hours" would have read near zero next to "Days
 * Logged: 180" all year, and a parent glancing at that could reasonably
 * think her records were deficient when they were fine. Georgia counts
 * real instruction, not screen time.
 *
 * Deliberately hours-and-minutes rather than a start/stop timer: she is
 * recording a day that already happened, usually that evening, not
 * running a stopwatch alongside it.
 */
/**
 * HIS MORNING MEETINGS, FOR HER.
 *
 * Two things live on that row that she cannot get anywhere else: the goal he
 * set himself, and whether he actually opened the day rather than starting at
 * Mathematics with the laptop still on yesterday's build.
 *
 * The QUESTION is not shown here on purpose — it is sent to Mission Comms as a
 * real message, which is where she answers him. Printing it in a second place
 * she has to remember to check is how a question goes unanswered for a week.
 *
 * Fourteen days: long enough to see whether the routine is holding, short
 * enough that she is not scrolling a term.
 */
function MorningMeetingLog() {
  const morningMeetings = useAppStore((s) => s.morningMeetings);

  const rows = Object.values(morningMeetings || {})
    .filter((r) => r?.completedAt)
    .sort((a, b) => String(b.date).localeCompare(String(a.date)))
    .slice(0, 14);

  return (
    <div className="mt-4 rounded-lg border border-space-700 bg-space-900 p-4">
      <p className="text-[10px] font-display uppercase tracking-widest text-ink-600">
        Morning meetings — 8:30 block
      </p>
      {rows.length === 0 ? (
        <p className="mt-1 text-xs text-ink-500">
          Nothing logged yet. The meeting is the first thing on his timetable and it books 30
          minutes of instruction on the day he runs it.
        </p>
      ) : (
        <>
          <p className="mt-1 text-xs text-ink-500">
            {rows.length} of the last 14 school days. Each one is 30 minutes on the record.
          </p>
          <ul className="mt-2 space-y-1.5">
            {rows.map((r) => (
              <li key={r.date} className="flex flex-wrap items-baseline gap-x-2 text-xs">
                <span className="w-24 shrink-0 font-mono text-ink-500">{r.date}</span>
                <span className="min-w-0 flex-1 text-ink-300">
                  {r.goal ? r.goal : <span className="text-ink-600">no goal written</span>}
                </span>
                <span className="shrink-0 text-ink-600">
                  {[
                    r.checkedForUpdate ? 'update checked' : 'update not checked',
                    r.syncedWork ? 'synced' : null,
                    // The step she asked for on Aug 20 — whether he actually
                    // looked at the week and the month, not just that he ran
                    // the meeting.
                    r.checkedPlanner ? 'planner read' : null,
                    r.checkedProgress ? 'progress read' : null
                  ].filter(Boolean).join(' · ')}
                </span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

function OfflineInstructionEntry() {
  const allAttendance = useAppStore((s) => s.allAttendance);
  const setOfflineInstructionMinutes = useAppStore((s) => s.setOfflineInstructionMinutes);
  // The same sources the packet above this panel credits from.
  const khanDailyLog = useAppStore((s) => s.khanDailyLog);
  const peWorkoutLog = useAppStore((s) => s.peWorkoutLog);
  const guitarLog = useAppStore((s) => s.guitarLog);
  const typingLog = useAppStore((s) => s.typingLog);
  const gardenLog = useAppStore((s) => s.gardenLog);
  const writingEntries = useAppStore((s) => s.writingEntries);
  const weeklyWordState = useAppStore((s) => s.weeklyWords);
  const scheduleBlocks = useAppStore((s) => s.scheduleBlocks);
  const lessonProgress = useAppStore((s) => s.lessonProgress);
  const morningMeetings = useAppStore((s) => s.morningMeetings);
  /**
   * Needed to credit an English day to the right block: `reading` is one
   * subject code carrying two subjects, and only the row he was shown says
   * which. See STRAND_BLOCK in scheduledMinutes.js.
   */
  const khanAcademyAssignments = useAppStore((s) => s.khanAcademyAssignments);

  const [date, setDate] = useState(todayDateStr());
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(null);

  /**
   * WHAT THAT DAY IS ACTUALLY WORTH.
   *
   * ---- WHERE THIS CAME FROM (Aug 20, 2026) ----
   *
   * The parent: **"Why is he counted for 3:45 hrs but only 2:41 will apply?"**
   *
   * Two panels, one day, two numbers. The attendance list said 3h45m and this
   * one said 2h41m, and this is the panel she acts on — the one where she
   * decides how much offline time to log to close a gap that was not there.
   *
   * `measured + logged` ignores the third and usually largest component: the
   * timetable blocks his ticks earn. This file already computes them at the
   * top for the packet; this panel simply did not ask.
   *
   * It now uses `instructionMinutes` — the same function the packet and the
   * 180-day count use — so the number here cannot disagree with the record it
   * is helping her fill in. Three copies of a rule is two too many, and this
   * was the third.
   */
  const scheduledByDateAll = scheduledMinutesByDate({
    khanDailyLog, peWorkoutLog, guitarLog, typingLog, gardenLog, writingEntries, weeklyWordState, scheduleBlocks,
    lessonProgress,
    morningMeetings,
    khanAcademyAssignments
  });
  const row = allAttendance[date] || {};
  const scheduled = scheduledByDateAll[date] || 0;
  const measured = row.activeMinutes || 0;
  const logged = row.offlineMinutes || 0;
  const total = instructionMinutes(row, scheduled);

  const handleSave = async () => {
    const value = (Number(hours) || 0) * 60 + (Number(minutes) || 0);
    const result = await setOfflineInstructionMinutes(date, value);
    if (!result?.ok) {
      setError(result?.error || 'That didn’t save.');
      return;
    }
    setError(null);
    setHours('');
    setMinutes('');
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };

  return (
    <div className="mt-4 rounded-lg border border-space-700 bg-space-900 p-4">
      <p className="text-[10px] font-display uppercase tracking-widest text-ink-600">
        Instruction away from this app
      </p>
      <p className="mt-1 text-xs text-ink-500">
        Khan Academy, reading a real book, PE, field trips, labs, building things. This app only measures its
        own screen time, so without this the hours column understates every real school day.
      </p>

      <div className="mt-3 flex flex-wrap items-end gap-2">
        <input
          type="date"
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
            setHours('');
            setMinutes('');
          }}
          className="rounded-lg border border-space-600 bg-space-800 px-3 py-2 text-sm text-ink-100"
        />
        <input
          type="number"
          min="0"
          max="23"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          placeholder="hrs"
          className="w-20 rounded-lg border border-space-600 bg-space-800 px-3 py-2 text-sm text-ink-100 placeholder:text-ink-500"
        />
        <input
          type="number"
          min="0"
          max="59"
          step="5"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
          placeholder="min"
          className="w-20 rounded-lg border border-space-600 bg-space-800 px-3 py-2 text-sm text-ink-100 placeholder:text-ink-500"
        />
        <button
          type="button"
          onClick={handleSave}
          disabled={!hours && !minutes}
          className="rounded-lg bg-signal-cyan px-4 py-2 text-sm font-display font-700 text-space-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Save
        </button>
        {saved && <span className="text-xs text-signal-cyan">Saved</span>}
      </div>
      {error && <p className="mt-2 text-xs text-signal-amber">{error}</p>}

      <p className="mt-2 text-xs text-ink-600">
        That day so far: <span className="text-ink-300">{Math.floor(total / 60)}h {total % 60}m</span> —{' '}
        {scheduled > 0 && <>{scheduled} min from the blocks he ticked, </>}
        {measured} min measured in the app{scheduled > measured ? ' (the larger of the two counts, not both)' : ''},
        {' '}{logged} min you logged
        {total >= GEORGIA_MINUTES_PER_DAY ? ' · meets the 4.5-hour bar' : ''}. Saving replaces the logged
        number for that day rather than adding to it.
      </p>
    </div>
  );
}
