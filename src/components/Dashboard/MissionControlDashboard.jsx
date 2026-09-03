import { useAppStore, totalMasteredCount } from '../../store/useAppStore.js';
import { RocketProgressMeter } from './RocketProgressMeter.jsx';
import { generateDailyPracticeSet } from '../../engine/dailyPractice.js';
import { getTemplatesUpToTier } from '../../engine/problemTemplates.js';
import { hasSchoolStarted, SCHOOL_YEAR_START_DATE, getCurrentQuarter } from '../../lib/schoolQuarter.js';
import { useCurrentQuarterKhanAssignments } from './KhanAcademyMissionsCard.jsx';
import { TodayRow, StartHereCard, QuietTile } from './TodayRow.jsx';
import { StudentHandoffCard } from './StudentHandoffCard.jsx';
import { AcademicCenterCard } from './AcademicCenterCard.jsx';
import { ClassBellCard } from './ClassBellCard.jsx';
import { TodaysRoutineRail } from './TodaysRoutineRail.jsx';
import { WeekInReviewCard } from './WeekInReviewCard.jsx';
import { FeedbackFromMomCard } from './FeedbackFromMomCard.jsx';
import { drillForDate, drillDoneOn } from '../../lib/dailyWriting.js';
import { gardenForDate, fridayOfSchoolWeek, getSchoolWeekNumber } from '../../lib/plannerFeeds.js';
import { formatShortDate, parseDateStr, toDateStr, addDays } from '../../lib/scheduler.js';
import { NovaDashboardGreeting } from '../Mentor/NovaDashboardGreeting.jsx';
import { DailyMissionCard } from './DailyMissionCard.jsx';
import { WORD_ACTIVITIES } from '../../lib/weeklyWords.js';
import { todayDateStr } from '../../lib/scheduler.js';
import { TimetableOrder } from './TimetableOrder.jsx';
import { BLOCK_FOR_SUBJECT, STRAND_BLOCK, khanReadingStrand, blockForLesson } from '../../lib/scheduledMinutes.js';
import { liveRotatingSubjects, liveMorningSubject, ROTATING_BLOCK_ID } from '../../lib/rotatingBlock.js';
import { useToday } from '../../lib/useToday.js';
import { academyContent } from '../../content/academyContent.js';

const { GUITAR_DAILY_MINUTES, gardenProjects = [], getCurrentGuitarSkill = () => null } = academyContent().electives;
const { allLessons = [] } = academyContent().lessons;
const { getTodaysWorkout = () => null } = academyContent().pe;
const { aerospaceProjects = [], roboticsProjects = [], scienceExperiments = [], technologyProjects = [] } = academyContent().projects;
const { subjectCardLabel = () => null } = academyContent().subjects;
const { dayPattern = () => null, subjectsForDay = () => null } = academyContent().timetable;
const { getThisWeeksScheduledIds = () => [], writingPrompts = [] } = academyContent().writing;

/**
 * MISSION CONTROL — rebuilt Aug 7, 2026.
 *
 * The parent, looking at the running app: "I don't like the way the home
 * screen Mission control looks. It looks cluttered and unorganized."
 *
 * Measured before changing anything: 3,152px tall — three and a half
 * viewports — across 14 cards, the phrase "Today's Lesson" appearing FIVE
 * separate times, and one Khan lesson requiring four nested bordered boxes and
 * three stacked headings to display. Section headers had been added in an
 * earlier pass and had NOT fixed it, because the problem was never grouping.
 * It was that every item carried the same visual weight, so nothing on the
 * screen said "do this one first."
 *
 * The rebuild answers one question at the top — what do I do now — then lists
 * everything else at one line each:
 *
 *   1  a thin status strip        (was two large cards)
 *   2  ONE "Start here" card      (was five things labelled "Today's Lesson")
 *   3  the rest of today, one line each, with a DAILY CHECK-OFF on Khan rows
 *   4  quiet tiles for what exists but is not due today
 *
 * NOTHING WAS REMOVED. Every item from the old screen is still reachable —
 * PE, word study, practice, journal, project, academic centre, messages —
 * shown once each instead of each inside its own card inside another card.
 */
function StatusStrip({ rank, streak, patternLabel }) {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-1 rounded-xl border border-space-700 bg-space-800 px-4 py-2.5 text-sm text-ink-300">
      <span>Rank <b className="font-display text-base font-700 text-ink-100">{rank.name}</b></span>
      <span className="hidden h-1 w-1 rounded-full bg-space-600 sm:inline-block" aria-hidden="true" />
      <span>Streak <b className="font-display text-base font-700 text-signal-amber">{streak} day{streak === 1 ? '' : 's'}</b></span>
      <span className="ml-auto text-xs text-ink-500">{patternLabel}</span>
    </div>
  );
}

/** '14:15' -> '2:15'. Bare, because the column is narrow and every row is PM-obvious. */
function formatBlockTime(t) {
  if (!t) return '';
  const [h, m] = String(t).split(':').map(Number);
  if (!Number.isFinite(h) || !Number.isFinite(m)) return '';
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${String(m).padStart(2, '0')}`;
}

export function MissionControlDashboard({
  onStartLesson,
  onOpenJournal,
  onStartWeeklyProject,
  onStudyWords,
  onQuizWords,
  onPracticeWords,
  onOpenAcademicCenter,
  onOpenPE,
  onOpenGuitar,
  onOpenGarden,
  onOpenTyping,
  onOpenMessages,
  onOpenSchedule,
  onOpenMorningMeeting
}) {
  const streak = useAppStore((s) => s.streak);
  const xp = useAppStore((s) => s.xp);
  /**
   * ---- HOW TIGHTLY THE BOARD PACKS (Aug 25, 2026) ----
   *
   * The parent asked about the board's "color or format". Colour is a theme
   * and is worth paying coins for; this is not. Layout is how he prefers to
   * work, and charging a child coins for a comfortable line height would be
   * the app taxing him for being able to read it.
   *
   * Compact tightens the vertical rhythm on both columns — roughly two more
   * cards visible without scrolling on a laptop. It does not hide anything:
   * a density control that quietly removes a row is a control that loses work.
   */
  const boardDensity = useAppStore((s) => s.boardDensity);
  const setBoardDensity = useAppStore((s) => s.setBoardDensity);
  const compact = boardDensity === 'compact';
  const currentRank = useAppStore((s) => s.currentRank);
  // Messages from Mom he has not opened yet — see the note on the Messages tile.
  const unreadFromMom = useAppStore(
    (s) => (s.messages || []).filter((m) => m.sender === 'parent' && !m.readByStudent).length
  );
  const reviewSchedule = useAppStore((s) => s.reviewSchedule);
  const getTodaysMission = useAppStore((s) => s.getTodaysMission);
  // Subscribed, not read through the getter: the rows must redraw the moment a
  // lesson is mastered, which is the whole point of the note they now carry.
  const lessonProgress = useAppStore((s) => s.lessonProgress);
  const getSubjects = useAppStore((s) => s.getSubjects);
  const getWritingJournalSummary = useAppStore((s) => s.getWritingJournalSummary);
  const khanDailyLog = useAppStore((s) => s.khanDailyLog);
  const markKhanDailySubject = useAppStore((s) => s.markKhanDailySubject);
  const getTypingDailyStreak = useAppStore((s) => s.getTypingDailyStreak);
  const peWorkoutLog = useAppStore((s) => s.peWorkoutLog);
  const peDailyLog = useAppStore((s) => s.peDailyLog);
  const guitarLog = useAppStore((s) => s.guitarLog);
  const gardenLog = useAppStore((s) => s.gardenLog);
  const readingLog = useAppStore((s) => s.readingLog);
  const logBookReading = useAppStore((s) => s.logBookReading);
  const unlogBookReading = useAppStore((s) => s.unlogBookReading);
  const getTodaysWordTask = useAppStore((s) => s.getTodaysWordTask);
  const academicAssignments = useAppStore((s) => s.academicAssignments);
  const writingEntries = useAppStore((s) => s.writingEntries);
  const morningMeetings = useAppStore((s) => s.morningMeetings);
  /**
   * HER timetable, for the clock time printed on every row. Subscribed, not
   * imported from defaultSchedule: she can move any block in the Scheduler and
   * the list must move with it.
   */
  const scheduleBlocks = useAppStore((s) => s.scheduleBlocks);
  const khanAcademyAssignments = useAppStore((s) => s.khanAcademyAssignments);

  const allSubjects = getSubjects();
  const todayPattern = dayPattern();
  /**
   * ---- THE QUARTER ARGUMENT WAS MISSING, AND IT PUT AEROSPACE ON WEDNESDAY ----
   * (Aug 26, 2026.)
   *
   * The parent: **"What day does aerospace lesson supposed to run? it doesn't
   * make any sense to put that warning on the project."** Her screen showed
   * "START HERE — Aerospace Engineering: How Airplanes Fly II" and, further
   * down, the Aerospace project marked *not on today's timetable*. Both true
   * at once, on a Wednesday, about the same subject.
   *
   * `subjectsForDay()` takes a quarter and this call did not pass one. So it
   * returned Wednesday's DEFAULT order — `['aerospace', 'socialStudies']` —
   * while the 2:15 block used Q1's override, `['socialStudies', 'aerospace']`.
   * Two orders for one day. The lesson loop took the first of its list and
   * offered Aerospace; `isOffTimetable` asked the block, which said Social
   * Studies owns Wednesday, and stamped the warning.
   *
   * IN Q1, AEROSPACE RUNS MONDAY. Eleven lessons, eleven Mondays — the
   * zero-slack quarter the pacing panel reports. Wednesday belongs to Social
   * Studies in Q1 only, because Technology needs both Tuesday and Thursday for
   * its 23 lessons; from Q2 Wednesday goes back to Aerospace.
   *
   * The Aug 20 fix declared "the list and the rail now answer the same
   * question" and made the Khan rows agree. The LESSON loop still read the
   * unscoped order, so it kept its own answer for six more days.
   */
  const scheduledToday = subjectsForDay(new Date(), getCurrentQuarter().id);
  /**
   * WHICH SPECIALIZED SUBJECTS ARE ON THE BOARD TODAY.
   *
   * ---- FRIDAY WAS SHOWING NOTHING (found Aug 12, 2026) ----
   *
   * The comment that used to sit here said "Friday and the weekend show
   * everything, so catch-up has something to catch up ON." The code did not do
   * that. Friday is `kind: 'core'` with `subjects: []` (weekPattern.js:113) —
   * deliberately empty, because a fixed subject there would take the day back
   * off the overflow that the Tue/Thu one-subject-per-day split depends on.
   * So the `kind === 'core'` branch filtered against an empty list and
   * `todaysSubjects` came out EMPTY.
   *
   * The result: on the one day of the week that exists to absorb what was
   * missed, the home screen had no Start Here card, no Aerospace, Technology,
   * Social Studies or Robotics row, and no Social Studies or Technology Khan
   * row. The catch-up day had nothing on it to catch up on.
   *
   * `flex` is what distinguishes Friday from Monday-Thursday: those days name
   * the subject that owns the 2:15 block, Friday says "whatever is behind gets
   * it." So a flex day takes the same branch the weekend does — show
   * everything, let him pick up what he missed.
   */
  /**
   * ---- AND THE FILTER PUT THE OLD ORDER STRAIGHT BACK ----
   *
   * Passing the quarter to `subjectsForDay` above was necessary and not
   * sufficient, and I told her it was fixed before checking his screen. This
   * line read `allSubjects.filter((s) => scheduledToday.includes(s))` — which
   * keeps **allSubjects order**, aerospace first, discarding the very
   * preference order the argument had just corrected. Wednesday still opened
   * with an Aerospace lesson.
   *
   * ---- SO IT ASKS THE BLOCK, NOT THE PREFERENCE LIST ----
   *
   * `scheduledToday` is an ORDER OF PREFERENCE, not a list of what runs — the
   * week pattern says so in its own comments. `liveRotatingSubjects` is the
   * function that turns that order into the ONE subject that owns the day's
   * forty-five minutes, and it is what the rail, the Khan rows and
   * `isOffTimetable` have all read since Aug 20.
   *
   * The mission loop was the last caller still reading the preference list. On
   * a Q1 Wednesday that meant offering an Aerospace lesson as START HERE and
   * then stamping the Aerospace project "not on today's timetable" four rows
   * below — the contradiction the parent caught.
   *
   * WEDNESDAY NOW OPENS WITH SOCIAL STUDIES, whose Q1 work is a Khan unit, so
   * the Start Here card steps aside and the Khan row carries the day. That is
   * the documented behaviour: "if every one is clear, the top slot steps aside
   * rather than inventing something to fill itself with." Aerospace is not on
   * his Wednesday because Aerospace does not run on Wednesday in Q1 — it runs
   * Monday, and Friday is where a missed Monday gets caught up.
   *
   * Friday and the weekend are untouched: `flex` still shows everything, which
   * is what makes the overflow day work.
   */
  /**
   * ---- BOTH SLOTS, OR THE SECOND ONE REACHES NOBODY. (Aug 29, 2026.) ----
   *
   * Social Studies took Tuesday's 10:30 block so it could run twice a week.
   * This line decides what he is actually handed today, and asking only about
   * the 2:15 block would have given him Technology on Tuesday and never
   * mentioned Social Studies — a subject with a day on the timetable and
   * nothing on his screen.
   *
   * That is the fault this project keeps finding, and it has been found in the
   * schedule twice already: *"he has social studies to complete but it's not on
   * Today's routine."* Adding a slot without adding it here would have been the
   * third time, in the same subject, for the same reason.
   */
  const todaysSubjects = todayPattern.kind === 'core' && !todayPattern.flex
    ? [
        ...liveRotatingSubjects(new Date(), khanAcademyAssignments),
        ...(liveMorningSubject(new Date(), khanAcademyAssignments)
          ? [liveMorningSubject(new Date(), khanAcademyAssignments)]
          : [])
      ]
    : allSubjects;

  /**
   * LOCAL DATE, NEVER UTC. (Fixed Aug 10, 2026, ~9pm Eastern.)
   *
   * The parent: "now he is unable to select the work hes done on the mission
   * control page." Every checkbox on his home screen had stopped responding.
   *
   * Nothing was broken in the click path. The store writes his tick to
   * khanDailyLog under the LOCAL date (todayDateStr), and this screen was
   * reading it back under the UTC date. Any time after about 8pm Eastern those
   * are different days: the tick saved to 2026-08-10 and the screen looked for
   * 2026-08-11, found nothing, and drew an empty box. It would have started
   * working again by itself at midnight, which is the worst kind of bug — it
   * cannot be reproduced in the morning by whoever is asked to look at it.
   *
   * The store fixed this in itself months ago and left the comment explaining
   * why. The screens were never brought along.
   */
  const today = useToday();
  const dailyDone = (khanDailyLog && khanDailyLog[today]) || {};

  /**
   * Khan subjects that genuinely run EVERY school day, because the printed
   * routine gives each of them its own daily block: 9:00 Mathematics,
   * 10:00 Independent Reading, 11:00 Science, 1:00 Language Arts.
   *
   * Social Studies and Technology do NOT have a daily block. They share the
   * 2:15 rotating slot and, per the 4+1 week the parent chose, run Tuesday and
   * Thursday only — "specialized subjects ROTATE so he never handles more than
   * two in one day."
   */
  const DAILY_KHAN_SUBJECTS = ['math', 'reading', 'science'];

  const currentQuarterKhan = useCurrentQuarterKhanAssignments();
  const khanBySubject = new Map();
  for (const a of currentQuarterKhan) {
    // The bug this fixes, spotted by the parent looking at two Technology rows
    // and asking "They are both every other day?" — they were not. The Mission
    // Control lesson honoured the Tue/Thu rotation; the Khan row ignored the
    // day pattern entirely and appeared all seven days. So on a Monday he was
    // handed a Technology unit with no Technology block on his schedule, which
    // is exactly the "never more than two specialized subjects a day" rule the
    // rotation exists to enforce.
    //
    // On Friday and the weekend todaysSubjects is everything, so catch-up
    // still shows the full list. That was the intent from the start; until
    // Aug 12 the Friday half of it was not actually true — see todaysSubjects.
    if (!DAILY_KHAN_SUBJECTS.includes(a.subject) && !todaysSubjects.includes(a.subject)) continue;
    if (!khanBySubject.has(a.subject)) khanBySubject.set(a.subject, []);
    khanBySubject.get(a.subject).push(a);
  }

  const practiceSubjects = allSubjects.filter(
    (subject) => getTemplatesUpToTier(subject, currentRank.tier).length > 0
  );
  const dueCount = practiceSubjects.reduce((n, subject) => {
    const pool = getTemplatesUpToTier(subject, currentRank.tier);
    return n + pool.filter((t) => {
      const entry = reviewSchedule[t.id];
      return entry && entry.nextDueDate <= today;
    }).length;
  }, 0);

  /**
   * The book he is actually reading, and this week's Journal prompt.
   *
   * The parent, Aug 7 2026: "I am looking at the schedule and it has Reading,
   * Language arts & Writing Journal separate. How does that work because on
   * mission control it page it is all together."
   *
   * They ARE separate — three different activities in three blocks — but only
   * one of the three was on this screen as work. His current book and his
   * Journal prompt sat in the tile row below, under a heading that reads
   * "nothing here is due today," while the printed routine he was told to
   * follow says to do both. The screen and the schedule disagreed, and the
   * schedule was right.
   */
  const currentQuarterLabel = getCurrentQuarter().batchLabel;
  // Sorted by due date, not array order. Now that the quarter's books are
  // staggered rather than stacked on one day, "the current book" is a real
  // question with a real answer: the one due soonest that he has not finished.
  const currentBook =
    academicAssignments
      .filter(
        (a) =>
          a.type === 'Reading Assignment' &&
          a.title &&
          a.dueDate &&
          a.quarter === currentQuarterLabel &&
          a.status !== 'completed'
      )
      .sort((a, b) => a.dueDate.localeCompare(b.dueDate))[0] || null;

  /**
   * THE DAILY DRILL — Monday to Thursday. (Aug 13, 2026.)
   *
   * The parent: "I want Lamar to have daily journals, not weekly. He needs
   * assistance building ELA... to begin to create structural sentences and
   * paragraphs." Mon-Thu is one named structure a day; Friday is the week's
   * real piece from the weekly schedule below, which the drills build toward.
   */
  /**
   * THE GARDEN, ON HIS BOARD AT LAST. (Aug 14, 2026.)
   *
   * The parent: "Add the garden to his planner."
   *
   * It could not appear. Not a setting — a structural gap: the home screen
   * resolves this week's work against weeklyWritingSchedule, and no gd7-* id
   * has ever been in that file. Three separate components import gardenProjects
   * and search it by id; none of those searches could ever match. Meanwhile the
   * garden had its own calendar of 42 dated Fridays that nothing read.
   *
   * This reads that calendar directly. It runs after school at 3:15 on Fridays,
   * which is where the timetable already put it — so the row is deliberately
   * placed last, below the school day, rather than competing with 9am maths.
   */
  const todaysGarden = gardenForDate(today, { gardenLog });

  // Has tonight's reading already been logged for the current book?
  const readingLoggedTonight = Boolean(
    currentBook && (readingLog || []).some((r) => r.title === currentBook.title && r.date === today)
  );

  const todaysDrill = drillForDate(new Date(today + 'T12:00:00'));
  const drillDoneToday = drillDoneOn(writingEntries, todaysDrill?.id, today);

  /**
   * "DONE" MEANS DONE THIS WEEK, NOT EVER. (Fixed Aug 13, 2026.)
   *
   * This was `new Set(writingEntries.map((e) => e.promptId))` — every prompt he
   * had EVER written, with no date filter. The weekly pool only holds 14
   * distinct prompts across 42 weeks, so they repeat: "Mission Report" is
   * scheduled seven times. Writing it once in week 2 silently marked weeks 8,
   * 15, 22, 29 and 36 as "This week's writing — done" without him writing a
   * word. He was doing materially less writing than the schedule claimed, and
   * the screen agreed with him.
   */
  const weekStart = toDateStr(addDays(parseDateStr(today), -((new Date(today + 'T12:00:00').getDay() + 6) % 7)));
  const completedPromptIds = new Set(
    writingEntries
      .filter((e) => e.completedAt && toDateStr(new Date(e.completedAt)) >= weekStart)
      .map((e) => e.promptId)
  );
  const scheduledPromptIds = getThisWeeksScheduledIds();
  // Journal prompts only — the same weekly list also carries hands-on science
  // and aerospace builds, which already have their own home on this screen.
  const weeksJournalPrompts = scheduledPromptIds
    .map((id) => writingPrompts.find((p) => p.id === id))
    .filter(Boolean);
  const nextJournalPrompt =
    weeksJournalPrompts.find((p) => !completedPromptIds.has(p.id)) || null;
  const journalDoneThisWeek = weeksJournalPrompts.length > 0 && !nextJournalPrompt;

  /**
   * This week's hands-on build, resolved to a REAL prompt object.
   *
   * Bug found Aug 7, 2026 by clicking the tile: it was wired
   * `onOpen={onStartWeeklyProject}`, and QuietTile passes its click handler
   * straight through — so the app opened the writing engine with a React
   * MouseEvent where a prompt belonged. The screen rendered a blank
   * "Writing Skill / 0 words" shell. Silent, and it looked like a real screen.
   *
   * Same weekly list as the Journal prompts above, but the ids resolve against
   * the three hands-on collections instead of writingPrompts.
   */
  /**
   * ===========================================================================
   * AND IT GETS A BLOCK, BECAUSE HE WAS IGNORING THE TILE. (Aug 26, 2026.)
   * ===========================================================================
   *
   * The parent: **"This weeks projects should be added to his rest of the day
   * because he is ignoring it."**
   *
   * He is ignoring it because the screen told him to. The tile sits under a
   * heading that reads, in plain English, **"nothing here is due today"** —
   * next to Spelling list and Messages. A parachute drop test that takes most
   * of a week is not the same kind of thing as a word list, and it was filed
   * as one.
   *
   * This is the third time this exact fault has been reported and the wording
   * of the earlier fix is four hundred lines above: *"His current book and his
   * Journal prompt sat in the tile row below, under a heading that reads
   * 'nothing here is due today,' while the printed routine says to do both.
   * The screen and the schedule disagreed, and the schedule was right."*
   *
   * The project now carries its own SUBJECT, which is the only thing that was
   * missing — with it the row knows which timetable block it belongs to and
   * TimetableOrder puts it where the rail already says it goes. A build with
   * no subject could only ever have been a tile.
   */
  const HANDS_ON_SOURCES = [
    { subject: 'aerospace', label: 'Aerospace', list: aerospaceProjects },
    { subject: 'science', label: 'Science', list: scienceExperiments },
    { subject: 'technology', label: 'Technology', list: technologyProjects },
    { subject: 'robotics', label: 'Robotics', list: roboticsProjects },
    { subject: 'gardening', label: 'Garden', list: gardenProjects }
  ];
  const resolveHandsOn = (id) => {
    for (const source of HANDS_ON_SOURCES) {
      const project = source.list.find((p) => p.id === id);
      if (project) return { project, subject: source.subject, label: source.label };
    }
    return null;
  };
  const weeksHandsOn =
    scheduledPromptIds
      .map(resolveHandsOn)
      .filter(Boolean)
      .find((x) => !completedPromptIds.has(x.project.id)) || null;
  const weeksHandsOnProject = weeksHandsOn?.project || null;
  /**
   * The Friday it is due. The weekly schedule is keyed by school week and
   * every item in it lands on that week's Friday — the same fact
   * `plannerFeeds` computes for the Scheduler, imported rather than
   * recalculated so the two can never drift.
   */
  const handsOnDueFriday = fridayOfSchoolWeek(getSchoolWeekNumber(new Date(today + 'T12:00:00')));

  const handleStartPractice = () => {
    const subject = practiceSubjects[0];
    if (!subject) return;
    const set = generateDailyPracticeSet(subject, currentRank.tier, 8, reviewSchedule);
    if (set) onStartLesson(set);
  };

  if (!hasSchoolStarted()) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        <div className="rounded-xl border border-signal-amber/40 bg-signal-amber/5 p-8 text-center shadow-panel">
          <p className="text-xs font-display uppercase tracking-widest text-signal-amber">Mission Control — Standing By</p>
          <p className="mt-3 font-display text-2xl font-700 text-ink-100">
            School starts {SCHOOL_YEAR_START_DATE.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
          <p className="mt-3 text-sm text-ink-300">
            Everything unlocks on the real first day — lessons, Khan Academy assignments, the Writing Journal,
            and this week's project. Come back then and Mission Control will be ready.
          </p>
        </div>
      </div>
    );
  }

  // The single next thing: the first scheduled subject that still has an
  // unmastered Mission Control lesson. If every one is clear, the top slot
  // steps aside rather than inventing something to fill itself with.
  let startHere = null;
  const remainingMissions = [];
  for (const subject of todaysSubjects) {
    const mission = getTodaysMission(subject);
    if (!mission) continue;
    if (!startHere) startHere = { subject, mission };
    else remainingMissions.push({ subject, mission });
  }


  /**
   * WHAT HE ALREADY DID IN THIS SUBJECT — the line the rows were missing.
   *
   * The parent, Aug 11 2026: "Lamar states that he has completed assignments
   * for it and it doesn't mark off on the mission control board but shows a
   * different story when he selects start so he know it went through."
   *
   * Both halves of that were true. A mission row serves the next UNMASTERED
   * lesson, so:
   *
   *   - Master one and the row silently becomes the NEXT lesson, still
   *     labelled Start. Three reading lessons at 100% looked identical to
   *     none, because nothing on the row remembers.
   *   - Finish one BELOW 90% (mastery is 90%) and the row does not move at
   *     all — same title, same button — so real work looks like no work.
   *
   * The only way to find out either way was to press Start and read the
   * screen underneath, which is precisely what he had started doing.
   *
   * This returns the honest one-liner for a subject: what he finished today,
   * or where his best attempt stands against the bar.
   */
  const lessonNote = (mission) => {
    if (!mission) return null;
    const own = lessonProgress[mission.id];
    // Attempted this exact lesson and not over the bar yet.
    if (own && !own.mastered) {
      const best = Math.round((own.bestAccuracy || 0) * 100);
      const tries = own.attempts || 1;
      return {
        note: `Tried ${tries === 1 ? 'once' : tries + ' times'} · best ${best}% · 90% masters it`,
        tone: 'partial',
        action: 'Try again'
      };
    }
    // Nothing attempted on THIS lesson — but did he finish one in this
    // subject today? That is the case where the row had already moved on.
    const finishedToday = allLessons.find(
      (l) => l.subject === mission.subject && lessonProgress[l.id]?.mastered &&
             lessonProgress[l.id]?.lastCompletedDate === today
    );
    if (finishedToday) {
      return { note: `Finished ${finishedToday.title} today`, tone: 'done', action: 'Start' };
    }
    return null;
  };

  /**
   * ===================================================================
   * THE LIST AND THE RAIL NOW ANSWER THE SAME QUESTION.
   * ===================================================================
   *
   * The student, via his parent (Aug 20, 2026): **"Lamar is complaining that
   * he'd like the rest of his day to be in sync with his Today's Routine.
   * Also, he has social studies to complete but it's not on Today's
   * routine."**
   *
   * Both halves were real, and they were the same fault seen from two sides:
   * this screen and the routine rail were each computing "what runs today"
   * from a different source.
   *
   *   the rail   liveRotatingSubjects()  ->  ['technology']
   *   this list  subjectsForDay()        ->  ['socialStudies', 'technology']
   *
   * `subjectsForDay` returns Thursday's **order of preference**, not its
   * owner. So the board handed him a Social Studies unit on a day whose
   * timetable never mentions Social Studies — ten open Khan units with no
   * block to do them in.
   *
   * `whenFor` and `isOffTimetable` below are the two things every row now
   * carries: the clock time of its block, and whether that block is really
   * running today. Both read the same functions the rail reads.
   */
  const blockTimeById = new Map(
    (scheduleBlocks || [])
      .filter((b) => b?.id && b.startTime)
      .map((b) => [b.id, formatBlockTime(b.startTime)])
  );

  /** The subject that actually owns the 2:15 block today, if any. */
  const rotatingOwners = liveRotatingSubjects(new Date(), khanAcademyAssignments);

  // Same source the Progress screen uses, so the two meters can never disagree
  // about how far along he is.
  const totalMastered = totalMasteredCount({ lessonProgress, khanAcademyAssignments });

  const whenFor = (blockId) => blockTimeById.get(blockId) || '';

  /**
   * A rotating subject that is NOT today's owner is off the timetable. Nothing
   * else can be: every other row on this screen owns a block that runs every
   * school day.
   */
  const isOffTimetable = (subject) => {
    if (BLOCK_FOR_SUBJECT[subject] !== ROTATING_BLOCK_ID) return false;
    return !rotatingOwners.includes(subject);
  };

  /**
   * ENGLISH IS TWO BLOCKS, AND A ROW BELONGS TO THE ONE IT TEACHES.
   *
   * The parent: **"The 'Rest of the Day' is supposed to match 'Today's
   * Routine'."** This was the last thing that did not: the Khan row printed
   *
   *     10:00  LANGUAGE ARTS  Punctuation: the comma and the apostrophe
   *
   * while the rail beside it printed 10:00 Reading Lesson and 12:30 Language
   * Arts & Writing Journal. Language Arts at ten and again at half twelve.
   *
   * `reading` is one subject code carrying two subjects — SUBJECT_STRANDS has
   * named them Reading & Literature and Grammar & Writing since August 6. Q1's
   * Khan units are all grammar, so that row is the 12:30 block; the Mission
   * Control lesson beside it is inference and main idea, so it is the 10:00
   * one.
   *
   * LABEL AND BLOCK COME FROM THE SAME FACT so they cannot drift apart. From
   * Q2 the Khan rows become real reading units and both move with them,
   * without a line being edited here.
   */
  const englishRow = (strand) => (
    strand === 'language-arts'
      ? { blockId: STRAND_BLOCK['language-arts'], label: 'Language Arts' }
      : { blockId: STRAND_BLOCK.reading, label: 'Reading' }
  );

  const peDoneToday = peWorkoutLog.some((e) => e.date === today);

  /**
   * ==========================================================================
   * THE PE ROW SAYS WHICH WORKOUT. (Audit item N-1, Aug 25, 2026.)
   * ==========================================================================
   *
   * Migrated off `PEMissionCard.jsx` before that file was retired. The card had
   * been unmounted since the Aug 7 rebuild, and two things it did were nowhere
   * else in the app:
   *
   *   1. The row read **"Today's workout"** — generic — while `getTodaysWorkout`
   *      has always known the day name, the title and how many exercises it
   *      holds. The app knew and the screen never said, on a block he opens
   *      every single day.
   *
   *   2. Nothing anywhere cross-checked the WORKOUT against the daily TRACKERS.
   *      They are two separate records for the same day, and doing one is the
   *      moment you are most likely to forget the other.
   *
   * "Filled in" means at least ONE real number today, not all five. Demanding a
   * complete log to count as started is how a tracker begins to feel like
   * homework.
   */
  const todaysWorkout = getTodaysWorkout();
  const peLogToday = peDailyLog?.[today];
  const peTrackersStarted = Boolean(
    peLogToday &&
      (peLogToday.waterOz || peLogToday.proteinG || peLogToday.sleepHours ||
        peLogToday.activityMinutes || peLogToday.mood)
  );
  const peDetail = peDoneToday && !peTrackersStarted
    ? 'Workout logged — water, sleep and protein are still empty for today'
    : !peDoneToday && peTrackersStarted
      ? 'Trackers started. Workout still to do.'
      : todaysWorkout
        ? `${todaysWorkout.exercises.length} ${todaysWorkout.exercises.length === 1 ? 'exercise' : 'exercises'}`
        : null;

  // The next unmastered Reading & Literature lesson. Null once the track is
  // finished, so the row disappears rather than inventing something.
  const readingLesson = getTodaysMission('reading');

  /**
   * Electric Guitar, and it renders on EVERY day kind for the same reason PE
   * does: it is genuinely daily. It is also the row this whole subject was
   * designed around. He is not self-disciplined with the guitar, and this
   * project has already been caught by naming work only in the code and not on
   * his screen — her words, about spelling and vocabulary: "I told him to
   * follow that schedule but that isn't there."
   *
   * So guitar gets BOTH: a named block on the printed schedule (block-10,
   * 3:00-3:15) and this row. Not either.
   *
   * It sits LAST in the list, where PE sits first, because that is where each
   * one actually falls in his real day — movement before the academic blocks,
   * guitar right after they finish.
   */
  const guitarClearedNumbers = guitarLog
    .filter((r) => r.kind === 'skill-cleared')
    .map((r) => r.data?.skillNumber)
    .filter((n) => typeof n === 'number');
  const guitarSkill = getCurrentGuitarSkill(guitarClearedNumbers);
  const guitarDoneToday = guitarLog.some((r) => r.kind === 'practice' && r.date === today);

  // Typing's daily tick shares khanDailyLog — see NON_KHAN_DAILY_SUBJECT in the
  // store for why, and why the Khan streak skips it.
  const typingDoneToday = dailyDone.typing === true;
  const typingStreak = getTypingDailyStreak();
  const journal = getWritingJournalSummary();

  /**
   * TWO COLUMNS AS OF AUG 9 2026, and the left one is the school day.
   *
   * The parent: "Can you put the Planner, daily, schedule, on the mission
   * control page in the upper left so he can see it without going to the
   * schedule page. So he can follow the schedule with having to go back and
   * forth to that tab."
   *
   * The bell moved up here with it. It answers "how long left in this one" and
   * the routine answers "what is the day" -- they are the same question asked
   * twice, and having them in two different places on the screen was why
   * neither got looked at. The rail is `sticky`, so it stays put while he
   * scrolls the work.
   *
   * It STACKS on a narrow screen (the `lg:` prefixes), routine first, because
   * on a phone a sidebar is just a thing you scroll past to reach the work.
   */
  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
      <div className="lg:flex lg:items-start lg:gap-6">
        {/* The rail scrolls INSIDE itself on a tall screen rather than pushing
            the page down: the bell plus thirteen blocks is taller than a laptop
            viewport, and a sticky column taller than the screen un-sticks
            itself, which is exactly the going-back-and-forth this replaced. */}
        <aside className={
          (compact ? 'mb-3 space-y-2 ' : 'mb-6 space-y-4 ')
          + 'lg:sticky lg:top-4 lg:mb-0 lg:max-h-[calc(100vh-2rem)] lg:w-72 lg:flex-none lg:overflow-y-auto lg:pr-1'
        }>
          <ClassBellCard />
          <TodaysRoutineRail onOpenSchedule={onOpenSchedule} />
        </aside>

        <div className={'min-w-0 flex-1 ' + (compact ? 'space-y-3' : 'space-y-6')}>
      <StatusStrip rank={currentRank} streak={streak} patternLabel={todayPattern.label} />

      <div className="flex items-center justify-end gap-1 text-[11px]">
        <span className="mr-1 font-display uppercase tracking-widest text-ink-500">Board</span>
        {[
          { id: 'comfortable', label: 'Comfortable' },
          { id: 'compact', label: 'Compact' }
        ].map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => setBoardDensity(opt.id)}
            aria-pressed={boardDensity === opt.id}
            className={
              'rounded-md px-2 py-0.5 font-display font-700 transition-colors ' +
              (boardDensity === opt.id
                ? 'bg-signal-cyan/15 text-signal-cyan'
                : 'text-ink-500 hover:text-ink-300')
            }
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/**
        * ---- THE ROCKET HE PAID FOR, WHERE HE CAN SEE IT (Aug 25, 2026) ----
        *
        * The parent, on a list of purchases that appeared to do nothing.
        *
        * Rocket skins were only ever drawn by `RocketProgressMeter`, and that
        * component was mounted in exactly one place: the Progress screen. So a
        * 275-coin skin recoloured one shape on a screen he had to navigate to
        * and go looking for — which is functionally the same as buying nothing.
        * He bought Deep-Space Violet on Aug 19 and there is no reason to think
        * he has ever seen it.
        *
        * It belongs here. This is the screen he opens at 8:30 every morning,
        * the meter is his rank progress, and the rocket on it is the one he
        * chose. Nothing new was built to fix this — the component already
        * existed and already worked. It was mounted in the wrong place.
        */}
      <RocketProgressMeter xp={xp} totalMastered={totalMastered} currentRank={currentRank} />

      {/**
        * THE 08:30 BLOCK, AT THE TOP, ONLY UNTIL IT IS DONE.
        *
        * A nav item alone would not have been enough — the Morning Meeting is
        * the first thing on the timetable and this is the first screen he
        * opens. It disappears the moment he runs it rather than sitting there
        * ticked, because a card that is always present stops being read.
        *
        * On a weekend or a holiday it does not appear at all: there is no
        * school day to open.
        */}
      {onOpenMorningMeeting
        && todayPattern.kind !== 'weekend'
        && todayPattern.kind !== 'holiday'
        && !morningMeetings[todayDateStr()]?.completedAt && (
        <button
          type="button"
          onClick={onOpenMorningMeeting}
          className="flex w-full items-center gap-4 rounded-xl border border-signal-cyan/40 bg-signal-cyan/10 px-4 py-3 text-left transition hover:bg-signal-cyan/20"
        >
          <span className="font-display text-2xl" aria-hidden="true">☀</span>
          <span className="min-w-0 flex-1">
            <span className="block font-display text-sm font-700 text-signal-cyan">
              Start with the Morning Meeting
            </span>
            <span className="mt-0.5 block text-xs text-ink-400">
              Check for a new version, trade files with Mom, see what today holds, and ask
              anything you are unsure about. 8:30–9:00.
            </span>
          </span>
          <span className="shrink-0 font-display text-sm text-signal-cyan" aria-hidden="true">→</span>
        </button>
      )}

      {/* Commander Nova greets him here — first thing on the first screen of
          the day, and the place he lands after time away. Read-only; it can
          change nothing it reports on. */}
      <NovaDashboardGreeting
        patternKind={todayPattern.kind}
        isFlex={todayPattern.flex === true}
        nextUp={startHere ? subjectCardLabel(startHere.subject) : ''}
      />

      {todayPattern.kind !== 'weekend' && (
        <div className="mt-4">
          <DailyMissionCard />
        </div>
      )}

      {todayPattern.kind !== 'core' && (
        <div className="rounded-xl border border-signal-amber/35 bg-signal-amber/5 px-4 py-3 text-sm text-ink-300">
          <p className="font-display text-[11px] uppercase tracking-widest text-signal-amber">
            {todayPattern.kind === 'holiday' ? `${todayPattern.holiday} — Day Off` : 'Weekend'}
          </p>
          <p className="mt-1">
            {todayPattern.kind === 'holiday'
              ? 'A day off for rest. Nothing is due and nothing is late — anything below is here only if he wants it.'
              : 'No new material today. Everything below is open for catch-up — none of it is due.'}
          </p>
        </div>
      )}

      {/* FRIDAY IS A FULL SCHOOL DAY AS OF AUG 9 2026 — this used to be the
          'buffer' notice saying no new material was introduced. It is a core
          day now; what is still different is the 2:15 block, which is open. */}
      {todayPattern.flex && todayPattern.kind === 'core' && (
        <div className="rounded-xl border border-signal-cyan/35 bg-signal-cyan/5 px-4 py-3 text-sm text-ink-300">
          <p className="font-display text-[11px] uppercase tracking-widest text-signal-cyan">
            Friday — Open Block
          </p>
          <p className="mt-1">
            A full school day. The 2:15 block is open: keep going on a long Khan unit,
            finish anything behind from this week, or take a trip that was planned in.
            The garden is after school.
          </p>
        </div>
      )}

      {startHere && (
        <div>
          <p className="mb-2 font-display text-[11px] uppercase tracking-widest text-ink-500">Start here</p>
          <StartHereCard subject={startHere.subject} mission={startHere.mission} onStart={onStartLesson} />
        </div>
      )}

      <div>
        <p className="mb-2 font-display text-[11px] uppercase tracking-widest text-ink-500">
          {startHere ? 'The rest of today' : 'Today'}
        </p>
        <div className="overflow-hidden rounded-xl border border-space-700 bg-space-800">
          <TimetableOrder blocks={scheduleBlocks}>
          <TodayRow
            subject="pe"
            blockId={BLOCK_FOR_SUBJECT.pe}
            when={whenFor(BLOCK_FOR_SUBJECT.pe)}
            title={todaysWorkout ? `${todaysWorkout.dayName}: ${todaysWorkout.title}` : "Today's workout"}
            detail={peDetail}
            kind={peDoneToday ? 'done' : 'mission'}
            onAction={onOpenPE}
            actionLabel={peDoneToday ? 'Done' : 'Start'}
          />

          {/* TYPING — second, next to PE, because they are the same kind of
              thing: short daily habit blocks that only work if they happen
              every day. Added Aug 9 2026 with block-5b (11:15-11:30).

              It renders as a 'khan' row SPECIFICALLY TO GET THE TICK BOX. The
              15 minutes happen on EdClub, which this app cannot see into, so a
              tick he makes himself is the only honest signal there is — the
              same reason the Khan rows have one. A 'mission' row would have
              claimed the app knew something it does not.

              Like PE and guitar it renders on every day kind, because it is
              genuinely daily. */}
          <TodayRow
            subject="typing"
            blockId={BLOCK_FOR_SUBJECT.typing}
            when={whenFor(BLOCK_FOR_SUBJECT.typing)}
            title={typingDoneToday ? '15 minutes done' : '15 minutes on EdClub'}
            detail={
              typingDoneToday
                ? typingStreak > 1
                  ? `${typingStreak} days in a row`
                  : 'Ticked off for today'
                : '11:15, right before lunch — sign in to EdClub, then tick this'
            }
            kind="khan"
            dailyDone={typingDoneToday}
            onToggleDaily={() => markKhanDailySubject('typing', !typingDoneToday)}
            onAction={onOpenTyping}
            actionLabel="Open"
          />

          {remainingMissions.map(({ subject, mission }) => {
            const n = lessonNote({ ...mission, subject });
            return (
              <TodayRow
                key={subject}
                subject={subject}
                blockId={BLOCK_FOR_SUBJECT[subject]}
                when={whenFor(BLOCK_FOR_SUBJECT[subject])}
                offTimetable={isOffTimetable(subject)}
                title={mission.title}
                detail={mission.theme}
                kind="mission"
                progressNote={n?.note}
                progressTone={n?.tone}
                onAction={() => onStartLesson(mission)}
                actionLabel={n?.action || 'Start'}
              />
            );
          })}

          {/* One row per Khan SUBJECT, not per unit — the old screen gave every
              subject its own nested card, which is where five "Today's Lesson"
              labels came from. The daily checkbox is the win he gets for
              showing up; the unit itself is finished by the parent entering
              the Khan score, never from this screen. */}
          {[...khanBySubject.entries()].map(([subject, rows]) => {
            const open = rows.filter((r) => !r.completed);
            const next = [...open].sort((a, b) => (a.sequenceInQuarter || 0) - (b.sequenceInQuarter || 0))[0];
            if (!next) return null;
            // English resolves through the strand of the unit he is actually
            // being handed. Every other subject is one block.
            const english = subject === 'reading' ? englishRow(khanReadingStrand(next)) : null;
            const rowBlock = english ? english.blockId : BLOCK_FOR_SUBJECT[subject];
            return (
              <TodayRow
                key={'khan-' + subject}
                subject={subject}
                label={english ? english.label : undefined}
                blockId={rowBlock}
                when={whenFor(rowBlock)}
                offTimetable={isOffTimetable(subject)}
                title={next.skillTitle}
                detail={open.length + ' unit' + (open.length === 1 ? '' : 's') + ' left this quarter'}
                kind="khan"
                dailyDone={dailyDone[subject] === true}
                onToggleDaily={() => markKhanDailySubject(subject, dailyDone[subject] !== true)}
                /**
                 * THERE IS NO "FINISH THIS UNIT" CONTROL HERE. (Aug 12, 2026.)
                 *
                 * There was one for two days, and it moved his computer four
                 * units past where he actually was — because a Khan unit is
                 * three or four school days and a button beside a lesson gets
                 * pressed at the end of a session, not at the end of a unit.
                 *
                 * The parent: "can we remove the done buttons. The check box
                 * should be good enough so that he won't select the done
                 * multiple times."
                 *
                 * A unit is finished by ONE event now: she enters the Khan
                 * score in the gradebook, which marks it complete and pays the
                 * 20 XP. That is the only signal here with evidence behind it —
                 * this app cannot see Khan Academy, so a score she copied off
                 * Khan's own screen is the closest thing to proof it will ever
                 * hold. The checkbox above stays daily, undoable, and five XP.
                 */
                onAction={() => window.open(next.khanAcademyUrl, '_blank', 'noopener')}
                actionLabel="Open"
              />
            );
          })}

          {/**
            * THE 10:00 BLOCK NOW HAS TEACHING IN IT, NOT JUST A BOOK.
            * (Aug 10, 2026.)
            *
            * The parent: "How are we testing reading and literature?" Nothing
            * was. Forty Reading & Literature lessons exist -- Bessie Coleman,
            * Mae Jemison, Hidden Figures, Guion Bluford, Annie Easley, plus
            * main idea, inference and context clues -- each with a ten-question
            * test, and he had never been offered one, because `reading` is not
            * in ACTIVE_SUBJECTS so it never reached the mission loop.
            *
            * It gets its own row rather than joining that loop, for the same
            * reason PE, typing and guitar do: the loop follows the rotating
            * 2:15 block, and this belongs to the 10:00 block every day.
            *
            * It sits directly above his book because they are the same block —
            * the lesson is the taught part, the book is the reading part.
            */}
          {readingLesson && (() => {
            const n = lessonNote({ ...readingLesson, subject: 'reading' });
            return (
              <TodayRow
                subject="reading"
                label={englishRow(readingLesson.strand).label}
                blockId={blockForLesson(readingLesson.id)}
                when={whenFor(blockForLesson(readingLesson.id))}
                title={readingLesson.title}
                detail={readingLesson.theme}
                kind="mission"
                progressNote={n?.note}
                progressTone={n?.tone}
                onAction={() => onStartLesson(readingLesson)}
                actionLabel={n?.action || 'Start'}
              />
            );
          })()}

          {/**
            * HIS BOOK, WHICH IS NOW A BEDTIME THING. (Aug 10, 2026.)
            *
            * The parent: "I will have him read that book before bed and the
            * reading lessons that you just opened can take the place of the 15
            * minutes." So the 10:00 block is the lesson above; this row is the
            * novel, and it is deliberately kind='rest' — it has a real due date
            * and it belongs on the screen, but nothing about it is owed during
            * the school day, and a 'mission' row would put it back in
            * competition with the work that is.
            */}
          {currentBook && (
            <TodayRow
              subject="reading"
              label="Book"
              /**
               * NO blockId ON PURPOSE. The parent: "I will have him read that
               * book before bed." It is real work with a real due date and it
               * is not a slot in the school day, so it sorts to the tail with
               * the other after-hours rows rather than claiming a block.
               */
              title={currentBook.title}
              detail={
                readingLoggedTonight
                  ? `Logged tonight — ${currentBook.pacingAmount || 2} ${currentBook.pacingUnit || 'chapters'}`
                  : `Read before bed · tick to log ${currentBook.pacingAmount || 2} ${
                      currentBook.pacingUnit || 'chapters'
                    } · due ${formatShortDate(parseDateStr(currentBook.dueDate))}`
              }
              kind="rest"
              /**
               * ONE TAP LOGS TONIGHT'S READING. The amount is the pacing SHE
               * stated — "2 chapters a day until he's finished" — shown on the
               * row before he taps, so the number that reaches the Georgia
               * record is never one nobody chose.
               */
              dailyDone={readingLoggedTonight}
              onToggleDaily={() =>
                readingLoggedTonight ? unlogBookReading(currentBook) : logBookReading(currentBook)
              }
              // Opens THIS book, not the library. The parent, Aug 15 2026:
              // "when book open is selected it takes him to all the book not
              // the specific one." Second time this fault has been reported —
              // the Writing Journal row had it in August. A row that names a
              // thing must open that thing.
              // `{ kind: 'book' }` from Aug 26 2026. This passed a bare
              // `currentBook.id` into a parameter read as an ASSIGNMENT id, so
              // it opened the assignments tab pointed at whatever assignment
              // happened to share that number. Books and assignments are
              // different tables with their own auto-increment.
              onAction={() => onOpenAcademicCenter({ kind: 'book', id: currentBook.id })}
              actionLabel="Open"
            />
          )}

          {/**
            * The daily structure drill, Mon-Thu. It sits ABOVE the weekly piece
            * because it is the one he does today; the weekly piece is Friday's.
            */}
          {todaysDrill && (
            <TodayRow
              subject="reading"
              label="Daily Writing"
              blockId={BLOCK_FOR_SUBJECT.ela}
              when={whenFor(BLOCK_FOR_SUBJECT.ela)}
              title={drillDoneToday ? `${todaysDrill.skillLabel} — done` : todaysDrill.title}
              detail={drillDoneToday ? 'Written today' : `${todaysDrill.skillLabel} · about 15 minutes`}
              kind={drillDoneToday ? 'done' : 'mission'}
              onAction={() => onStartWeeklyProject(todaysDrill)}
              actionLabel={drillDoneToday ? 'Read it' : 'Start'}
            />
          )}

          {/* AFTER SCHOOL — 3:15 Friday, per block-11 on the timetable. Last on
              the list because it is last in the day, not least important. */}
          {todaysGarden && (
            <TodayRow
              subject="gardening"
              label="Garden"
              blockId={BLOCK_FOR_SUBJECT.gardening}
              when={whenFor(BLOCK_FOR_SUBJECT.gardening)}
              title={todaysGarden.done ? `${todaysGarden.title} — logged` : todaysGarden.title}
              detail={
                todaysGarden.done
                  ? 'Recorded in the garden log'
                  : [todaysGarden.estMinutes ? `${todaysGarden.estMinutes} min` : null, 'after school, 3:15']
                      .filter(Boolean)
                      .join(' · ')
              }
              kind={todaysGarden.done ? 'done' : 'mission'}
              onAction={onOpenGarden}
              actionLabel={todaysGarden.done ? 'Open' : 'Start'}
            />
          )}

          {/*
            THIS WEEK'S BUILD, IN THE DAY RATHER THAN BESIDE IT. (Aug 26, 2026.)

            The parent: **"This weeks projects should be added to his rest of
            the day because he is ignoring it."** It was a tile under "nothing
            here is due today" — see the comment on weeksHandsOn above.

            ---- BOTH ROWS SAID 2:15, AND THAT WAS THE BUG (Aug 26, 2026) ----

            The parent: **"fix aerospace being on the board twice."** Third
            report of this shape — the Technology pair before it, and the two
            Technology rows that prompted "They are both every other day?"

            It was never a duplicated row. It was two REAL pieces of work
            wearing one clock time. The row took
            `whenFor(BLOCK_FOR_SUBJECT[subject])`, which for aerospace is
            block-9 — the same 2:15 the day's Aerospace lesson already owns:

                2:15  AEROSPACE          Lift and Drag        [Start]
                2:15  AEROSPACE project  Parachute Drop Test  [Start]

            Same subject, same minute, and the block is forty-five minutes and
            holds ONE of them.

            THE FIX IS THE TIME, NOT THE BLOCK. My first attempt stripped the
            blockId so the row would tail like his book — and two guards caught
            it, because that is walking back into HER OWN earlier report:
            *"This weeks projects should be added to his rest of the day because
            he is ignoring it."* The tail is precisely "beside the day".

            So it keeps its subject's block — it sorts with Aerospace, it is in
            the day, `offTimetable` still marks the days the block runs
            something else — and it shows the day it is actually due instead of
            a clock time it cannot have. One row says 2:15. The other says Fri.
          */}
          {weeksHandsOn && (
            <TodayRow
              subject={weeksHandsOn.subject}
              label={`${weeksHandsOn.label} project`}
              blockId={BLOCK_FOR_SUBJECT[weeksHandsOn.subject]}
              /**
               * THE DUE DAY, NOT THE BLOCK'S CLOCK. Week-long work with a
               * Friday deadline has no single minute, and printing one put it
               * in a slot another row already had.
               */
              when={parseDateStr(handsOnDueFriday).toLocaleDateString(undefined, { weekday: 'short' })}
              /**
               * ---- NO offTimetable HERE, AND I ADDED IT BY MISTAKE ----
               *
               * The parent, the same hour it shipped: **"it doesn't make any
               * sense to put that warning on the project if something supposed
               * to be done each day."** She is right, and the row argued with
               * itself in two adjacent lines:
               *
               *     not on today's timetable
               *     Due Fri, Aug 28 · this week — a bit each day beats all of
               *     it Friday
               *
               * `offTimetable` means "assigned to him, but today has no slot
               * for it." That is true of a LESSON on a day its subject does not
               * own the 2:15 block. It is never true of week-long work: the
               * whole instruction is to do a bit of it every day, so there is
               * no day it is off.
               */
              title={weeksHandsOn.project.title}
              detail={
                [
                  handsOnDueFriday === today
                    ? 'Due today'
                    : handsOnDueFriday > today
                      ? `Due ${formatShortDate(parseDateStr(handsOnDueFriday))}`
                      : `Was due ${formatShortDate(parseDateStr(handsOnDueFriday))}`,
                  'this week — a bit each day beats all of it Friday'
                ].join(' · ')
              }
              kind="mission"
              onAction={() => onStartWeeklyProject(weeksHandsOnProject)}
              actionLabel="Start"
            />
          )}

          {/* Second half of the 1:00 block. */}
          {journalDoneThisWeek ? (
            <TodayRow
              subject="reading"
              label="Writing Journal"
              blockId={BLOCK_FOR_SUBJECT.ela}
              when={whenFor(BLOCK_FOR_SUBJECT.ela)}
              title="This week's writing — done"
              kind="done"
              onAction={onOpenJournal}
              actionLabel="Open"
            />
          ) : nextJournalPrompt ? (
            <TodayRow
              subject="reading"
              label="Writing Journal"
              blockId={BLOCK_FOR_SUBJECT.ela}
              when={whenFor(BLOCK_FOR_SUBJECT.ela)}
              title={nextJournalPrompt.title}
              detail={nextJournalPrompt.theme}
              kind="mission"
              // Straight into THIS prompt. Routing to the journal list made him
              // hunt for the assignment he had just been told to do — the
              // parent caught it the first time she pressed the button.
              onAction={() => onStartWeeklyProject(nextJournalPrompt)}
              actionLabel="Start"
            />
          ) : null}

          {/* ONE ROW PER SKILL, routed by the real daily task. An earlier
              version of this list had a single row hardcoded to
              onStudyWords('spelling'), which left vocabulary unreachable and
              opened "study" on days the cycle actually calls for practice or
              the Friday quiz. The Mon-Fri rhythm lives in lib/weeklyWords.js
              and is unchanged — this just surfaces it again. */}
          {['spelling', 'vocabulary'].map((skill) => {
            const task = getTodaysWordTask(skill);
            const name = skill === 'spelling' ? 'Spelling' : 'Vocabulary';
            /**
             * WEEKENDS SAY SO RATHER THAN VANISHING. (Aug 9, 2026.)
             *
             * The parent, on a Sunday: "spelling and vocab was removed from
             * the list." They had not been removed — word study runs Mon-Fri
             * and these two rows returned null on a weekend, so they silently
             * disappeared while Maths, Language Arts, Science, Social Studies
             * and Technology all stayed on screen.
             *
             * Two of the eleven rows quietly going missing looks exactly like
             * something broken, and there was no way to tell the difference.
             * An empty state that explains itself is worth the line it costs —
             * the same rule this app applies to a locked badge or an empty
             * grading queue.
             *
             * THAT FIRST FIX BORROWED kind='done', AND THAT WAS THE NEXT BUG.
             * 'done' paints a filled green tick and strikes the title through,
             * so a weekend row read as finished work — in her words, "spelling
             * and vocab are marked off as completed when its not." It also said
             * only that there was no task, which answers the wrong question:
             * the week's ten words are the one thing he might actually want on
             * a Sunday, and the row did not offer them. kind='rest' now, and
             * the row opens the list.
             */
            if (task.type === 'weekend') {
              return (
                <TodayRow
                  key={skill}
                  subject="reading"
                  label={name}
                  blockId={BLOCK_FOR_SUBJECT.wordStudy}
                  when={whenFor(BLOCK_FOR_SUBJECT.wordStudy)}
                  title={"This week's " + name.toLowerCase() + ' words'}
                  detail={
                    'Nothing due at the weekend. Monday is ' +
                    WORD_ACTIVITIES[skill].mon.label.toLowerCase() +
                    ' — open the list to see the whole week, or run any day now.'
                  }
                  kind="rest"
                  actionLabel="Open list"
                  onAction={() => onStudyWords(skill)}
                />
              );
            }
            if (task.type === 'done') {
              return (
                <TodayRow
                  key={skill}
                  subject="reading"
                  label={name}
                  blockId={BLOCK_FOR_SUBJECT.wordStudy}
                  when={whenFor(BLOCK_FOR_SUBJECT.wordStudy)}
                  title={name + ' — done for today'}
                  detail="Next step tomorrow. The list stays open if he wants another look."
                  kind="done"
                  actionLabel="Open list"
                  onAction={() => onStudyWords(skill)}
                />
              );
            }
            /**
             * EVERY DAY GOES THROUGH THE SAME DOOR, carrying its dayKey.
             *
             * This used to fork on the task type and send Monday to the word
             * list and Friday to the quiz. With five activities per skill that
             * fork would have needed a branch per activity here AND in App.jsx,
             * in a file that already routes eleven other rows. The router reads
             * the day-to-activity map from lib/weeklyWords.js, so adding an
             * activity never touches this file again.
             */
            const act = () => onPracticeWords(skill, task.dayKey);
            return (
              <TodayRow
                key={skill}
                subject="reading"
                label={name}
                blockId={BLOCK_FOR_SUBJECT.wordStudy}
                when={whenFor(BLOCK_FOR_SUBJECT.wordStudy)}
                title={task.label + (task.isCatchUp ? ' — catching up' : '')}
                detail={task.instructions}
                kind="mission"
                onAction={act}
                actionLabel={task.type === 'test' ? 'Test' : 'Start'}
              />
            );
          })}

          {/*
            ---- AN ACADEMY WITHOUT THIS ELECTIVE GETS NO ROW (Sept 3, 2026) ----

            `getCurrentGuitarSkill` returns the last rung with `ladderComplete`
            when the ladder is finished, so it answers `null` for exactly one
            reason: this Academy has no guitar ladder at all. Two lines below
            already used `guitarSkill?.`; the title did not, and a second
            learner's dashboard died on `null.title` before it drew anything.

            Guarding the whole row rather than the one read, because a Guitar
            line reading "undefined" to a learner who has never played one is
            not better than a crash — it is the same wrongness, quieter. §3c:
            an absent slot is an absent screen.

            The platform shipping this row to every Academy is the real fault,
            and §3c Step 2 is where it stops. This keeps the dashboard alive
            until then.
          */}
          {guitarSkill && (
          <TodayRow
            subject="guitar"
            blockId={BLOCK_FOR_SUBJECT.guitar}
            when={whenFor(BLOCK_FOR_SUBJECT.guitar)}
            title={
              guitarSkill.ladderComplete
                ? `Keep playing — ${guitarSkill.title} was the last rung`
                : guitarSkill.title
            }
            /**
             * ---- THE LADDER RAN OUT AND THE CARD DID NOT SAY SO (O-5) ----
             *
             * Eight skills, all Q1, and a block every school day: from about
             * November this row would have shown the same title, unchanged,
             * for 181 days. The ladder runs the full year now, and when it
             * genuinely does end the row says the routine has not.
             */
            detail={
              guitarDoneToday
                ? 'Practised today'
                : guitarSkill?.ladderComplete
                  ? `${GUITAR_DAILY_MINUTES} minutes at 3:00 — the ladder is finished, so play what you want`
                  : `${GUITAR_DAILY_MINUTES} minutes at 3:00 — tune first, then this`
            }
            kind={guitarDoneToday ? 'done' : 'mission'}
            onAction={onOpenGuitar}
            actionLabel={guitarDoneToday ? 'Open' : 'Start'}
          />
          )}
          </TimetableOrder>
        </div>
        <p className="mt-2 text-xs text-ink-500">
          Tick a Khan subject when he has done it for the day — it clears overnight and counts toward his streak.
          Marking a whole unit finished is separate.
        </p>
      </div>

      {/**
        * PLANNER ITEMS AND BIG ASSIGNMENTS, ON HIS SCREEN (Aug 9, 2026).
        *
        * Two Parent Dashboard screens tell her that Planner work "shows up on
        * the calendar, the Coming Up view, and Lamar's dashboard". That
        * sentence was false in two separate ways, and the audit caught the
        * first: the `assignments` table was not in the progress export, so on
        * his computer a Planner item did not exist at all.
        *
        * The second way only showed up while fixing the first. AcademicCenterCard
        * — the one component that renders Planner items, overdue work and this
        * week's milestone step for the student — was written, complete, and
        * mounted NOWHERE. Not routed, not imported, not rendered. So even on a
        * single computer the promise was untrue: a lab she scheduled reached
        * his dashboard through no component at all.
        *
        * It renders null when there is nothing due and no book in progress, so
        * mounting it costs an empty day nothing.
        */}
      <AcademicCenterCard onOpenAcademicCenter={onOpenAcademicCenter} />

      <div>
        <p className="mb-2 font-display text-[11px] uppercase tracking-widest text-ink-500">
          Also available <span className="normal-case tracking-normal text-ink-600">— nothing here is due today</span>
        </p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <QuietTile
            title="Practice"
            detail={dueCount > 0 ? dueCount + ' due for review' : 'Extra practice'}
            badge={dueCount > 0 ? String(dueCount) : null}
            onOpen={handleStartPractice}
          />
          {/* Only when there is no row for it above — the row names the actual
              prompt and opens the same screen, so showing both is noise. */}
          {weeksJournalPrompts.length === 0 && (
            <QuietTile title="Writing Journal" detail={journal.skillCompleted + '/' + journal.skillTotal + ' skills'} onOpen={onOpenJournal} />
          )}
          {/*
            THE TILE IS GONE ON PURPOSE. (Aug 26, 2026.)

            "This Week's Project" now has a real row in the day, at its own
            subject's block. Leaving the tile here as well would put the same
            build in two places on one screen — one of them under a heading
            that says nothing here is due today, which is the thing that was
            wrong with it. Same rule the Writing Journal tile follows two lines
            down: a tile only when there is no row for it above.
          */}
          <QuietTile title="Academic Center" detail="Books and assignments" onOpen={onOpenAcademicCenter} />
        </div>
        <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {/**
            * THE UNREAD BADGE HE NEVER HAD. (Aug 23, 2026.)
            *
            * This tile said "Mission comms" whether Mom had written to him or
            * not. Nothing anywhere on his screen — not here, not the nav bar —
            * told him a message was waiting; he saw one only by wandering into
            * the thread. The store has carried `readByStudent` on every row
            * since the feature shipped, and a comment in there even refers to
            * clearing "its unread badge". There was no badge.
            *
            * It matters most for the Morning Meeting. Step 7 sends his
            * question to her as a message; her answer comes back the same way.
            * Without this, the loop had no closing half — he asked, she
            * replied, and he had no reason to look.
            *
            * `QuietTile` already accepted a `badge` prop and was never passed
            * one, which is the same shape as the other findings in this
            * audit: the app knew, and the screen never asked.
            */}
          <QuietTile
            title="Messages"
            detail={unreadFromMom > 0 ? `${unreadFromMom} new from Mom` : 'Mission comms'}
            badge={unreadFromMom > 0 ? unreadFromMom : null}
            onOpen={onOpenMessages}
          />
          {/**
            * TWO TILES, BECAUSE THERE ARE TWO WORD LISTS. (Fixed Aug 9, 2026.)
            *
            * This tile said "This week's spelling and vocabulary" and was
            * hardcoded to onStudyWords('spelling') — so vocabulary was
            * unreachable from here, exactly as the parent found: "at the bottom
            * where the spelling and vocab card is its only spelling not vocab."
            *
            * The comment above the daily rows already describes this bug being
            * found and fixed once, in that list. It was left in place here. A
            * fix applied to one of two call sites is half a fix, and the second
            * half is the one nobody looks at.
            */}
          <QuietTile title="Spelling list" detail="This week's ten spelling words" onOpen={() => onStudyWords('spelling')} />
          <QuietTile title="Vocabulary list" detail="This week's ten vocabulary words" onOpen={() => onStudyWords('vocabulary')} />
          {/**
            * THE THIRD ONE WAS BROKEN, AND IS GONE.
            *
            * It read `onOpen={onPracticeWords}` — passing the handler itself,
            * so React called it with the click EVENT as the first argument:
            * `onPracticeWords(event)` where the signature is
            * `(skill, dayKey)`. The skill became a SyntheticMouseEvent,
            * `getWeeklyWordList` found no such skill and returned an empty word
            * list, and the tile opened a practice round with zero questions in
            * it. It also promised "Mixed review", which WordPracticeEngine has
            * never supported — it runs one skill at a time.
            *
            * Removed rather than repaired: the two tiles above reach both word
            * lists, and the daily rows already route to the right practice
            * round for the day (Tue/Wed practice, Thu targeted review, Fri
            * test). A third tile offering a mode that does not exist was the
            * only thing it was adding.
            */}
        </div>

        {/* Friday through Sunday only — see WeekInReviewCard. It sits above
            the handoff card deliberately: reviewing the week and then sending
            it across is one motion. */}
        <WeekInReviewCard />

        {/* The return leg of "explain it in your own words". Renders nothing
            until something has actually been graded. */}
        <FeedbackFromMomCard />

        <StudentHandoffCard />
      </div>
        </div>
      </div>
    </div>
  );
}
