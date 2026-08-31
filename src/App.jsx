import { lazy, Suspense, useEffect, useState } from 'react';
import { useAppStore } from './store/useAppStore.js';
import { applyTheme } from './lib/themes.js';
import { NavBar } from './components/Navigation/NavBar.jsx';
import { MissionControlDashboard } from './components/Dashboard/MissionControlDashboard.jsx';
// ParentGate is deliberately NOT lazy-loaded like the dashboard it wraps.
// It is small, and it has to render the lock screen without pulling the
// dashboard chunk down first — because the gate returns early when
// locked, React.lazy never resolves ParentDashboard and its ~127kb of
// grading UI is never fetched at all until she unlocks.
import { ParentGate } from './components/Dashboard/ParentGate.jsx';
// Catches a crash in any single screen so it can't white-screen the whole
// app (Batch A, Aug 2026). Deliberately NOT lazy — it must exist before
// any screen that could throw.
import { ErrorBoundary } from './components/ErrorBoundary.jsx';
import './academies/lamar/academy.css'; // this Academy's theme and print rules — see the file header

// Performance pass (Aug 2026): everything below is reachable only after
// the Dashboard's first paint (a nav tab, or an action taken from the
// Dashboard), so none of it needs to be in the initial bundle the browser
// has to parse before Mission Control can render. Lazy-loading these
// screen components is a real, low-risk win — it defers their component
// code (ParentDashboard, the Games, LessonEngine, etc. add up to a real
// chunk of JS) until the moment they're actually opened. This does NOT
// touch the big curriculum data files (aerospace7.js, problemTemplates.js,
// etc.) — those load through useAppStore.js itself, which the Dashboard
// needs synchronously on first hydrate, so splitting THAT weight out would
// require restructuring how the store loads lesson/practice data, a much
// bigger and riskier change than this pass. Named exports need the
// `.then(m => ({ default: m.X }))` wrapper since React.lazy requires a
// default export.
const ProgressView = lazy(() =>
  import('./components/Dashboard/ProgressView.jsx').then((m) => ({ default: m.ProgressView }))
);
const ParentDashboard = lazy(() =>
  import('./components/Dashboard/ParentDashboard.jsx').then((m) => ({ default: m.ParentDashboard }))
);
const LessonRoster = lazy(() =>
  import('./components/Lesson/LessonRoster.jsx').then((m) => ({ default: m.LessonRoster }))
);
const PrintoutSheet = lazy(() =>
  import('./components/Lesson/PrintoutSheet.jsx').then((m) => ({ default: m.PrintoutSheet }))
);
const SubjectJournal = lazy(() =>
  import('./components/Lesson/PrintoutSheet.jsx').then((m) => ({ default: m.SubjectJournal }))
);
const StudyGuide = lazy(() =>
  import('./components/Lesson/StudyGuide.jsx').then((m) => ({ default: m.StudyGuide }))
);
const ReviewGame = lazy(() =>
  import('./components/Lesson/ReviewGame.jsx').then((m) => ({ default: m.ReviewGame }))
);
const WeakSpotDrill = lazy(() =>
  import('./components/Lesson/WeakSpotDrill.jsx').then((m) => ({ default: m.WeakSpotDrill }))
);
const NationCommand = lazy(() =>
  import('./components/Games/NationCommand.jsx').then((m) => ({ default: m.NationCommand }))
);
const LaunchDirector = lazy(() =>
  import('./components/Games/LaunchDirector.jsx').then((m) => ({ default: m.LaunchDirector }))
);
const GamesHome = lazy(() =>
  import('./components/Games/GamesHome.jsx').then((m) => ({ default: m.GamesHome }))
);
const LessonEngine = lazy(() => import('./engine/LessonEngine.jsx').then((m) => ({ default: m.LessonEngine })));
const WritingJournal = lazy(() =>
  import('./components/Writing/WritingJournal.jsx').then((m) => ({ default: m.WritingJournal }))
);
const WritingPromptEngine = lazy(() =>
  import('./components/Writing/WritingPromptEngine.jsx').then((m) => ({ default: m.WritingPromptEngine }))
);
const TypingPractice = lazy(() =>
  import('./components/Writing/TypingPractice.jsx').then((m) => ({ default: m.TypingPractice }))
);
const TypingLessons = lazy(() =>
  import('./components/Writing/TypingLessons.jsx').then((m) => ({ default: m.TypingLessons }))
);
const TypingHome = lazy(() =>
  import('./components/Writing/TypingHome.jsx').then((m) => ({ default: m.TypingHome }))
);
/**
 * ONE LAZY IMPORT FOR ALL TEN WORD ACTIVITIES. There were three components to
 * route between when a week held three shapes of day; a five-activity week per
 * skill would have put a ten-branch conditional in the app shell. The router
 * reads the day-to-activity map out of lib/weeklyWords.js so the schedule is
 * stated once.
 */
const WordActivityRouter = lazy(() =>
  import('./components/Writing/WordActivityRouter.jsx').then((m) => ({ default: m.WordActivityRouter }))
);
const SchedulerHome = lazy(() =>
  import('./components/Scheduler/SchedulerHome.jsx').then((m) => ({ default: m.SchedulerHome }))
);
const PEHome = lazy(() => import('./components/PE/PEHome.jsx').then((m) => ({ default: m.PEHome })));
const GardenHome = lazy(() => import('./components/Garden/GardenHome.jsx').then((m) => ({ default: m.GardenHome })));
const GuitarHome = lazy(() => import('./components/Guitar/GuitarHome.jsx').then((m) => ({ default: m.GuitarHome })));
const MissionCommsHome = lazy(() => import('./components/Messages/MissionCommsHome.jsx').then((m) => ({ default: m.MissionCommsHome })));
const MorningMeeting = lazy(() => import('./components/Morning/MorningMeeting.jsx').then((m) => ({ default: m.MorningMeeting })));
const AcademicHome = lazy(() =>
  import('./components/Academic/AcademicHome.jsx').then((m) => ({ default: m.AcademicHome }))
);
const RewardsHome = lazy(() =>
  import('./components/Rewards/RewardsHome.jsx').then((m) => ({ default: m.RewardsHome }))
);

function ScreenLoading() {
  return (
    <div className="flex h-[60vh] items-center justify-center text-ink-500">
      <p className="font-display text-sm uppercase tracking-widest">Loading…</p>
    </div>
  );
}

/**
 * @param {object} props
 * @param {string} [props.initialView]  which view to open on. The front door
 *   passes 'parent' when the grown-up signed in through the parent tab, so she
 *   lands on the dashboard she came for rather than on his school day.
 * @param {Function} [props.onSignOut]  hands the machine back to the front
 *   door. Threaded to the Parent Dashboard and nowhere else — signing out is a
 *   grown-up action, not a button a child can hit mid-lesson.
 */
export default function App({ initialView = 'dashboard', onSignOut }) {
  const hydrate = useAppStore((s) => s.hydrate);
  const hydrated = useAppStore((s) => s.hydrated);
  const hydrationError = useAppStore((s) => s.hydrationError);
  const retryHydrate = useAppStore((s) => s.retryHydrate);
  // 'blocked' | 'versionchange' | null — set by the two db.js failure
  // events (see db.js header comment). Both used to be silent.
  const [dbNotice, setDbNotice] = useState(null);
  const recordActiveMinute = useAppStore((s) => s.recordActiveMinute);
  const recordStudyCycleDay = useAppStore((s) => s.recordStudyCycleDay);
  const [view, setView] = useState(initialView); // 'dashboard' | 'progress' | 'lessons' | 'games' | 'journal' | 'typing' | 'schedule' | 'academic' | 'pe' | 'garden' | 'guitar' | 'messages' | 'morning' | 'parent'
  // Which Scheduler view to open on. Set by the Morning Meeting's look-ahead
  // step; 'daily' everywhere else, which is what the nav has always done.
  const [scheduleMode, setScheduleMode] = useState('daily');
  const [activeLesson, setActiveLesson] = useState(null);
  const [activePrompt, setActivePrompt] = useState(null);
  /**
   * Which thing the Academic Center should open at: `{ kind, id }` or null.
   *
   * ---- WHY IT IS TYPED NOW (Aug 26, 2026) ----
   *
   * It was a bare number, read as an ASSIGNMENT id. The Aug 15 fix for "when
   * book open is selected it takes him to all the book not the specific one"
   * then passed `currentBook.id` into it — a BOOK id, from a different table
   * with its own auto-increment. In her live database "A Long Walk to Water"
   * is book 6, so pressing Open on the reading row sent him to the ASSIGNMENTS
   * tab and highlighted assignment 6, which is a different piece of work
   * entirely.
   *
   * A bare id cannot say what it is an id OF. This one does.
   */
  const [academicFocus, setAcademicFocus] = useState(null);
  const [typingMode, setTypingMode] = useState(null); // null | 'home' | 'lessons' | 'speedtest'
  const [studySkill, setStudySkill] = useState(null); // 'spelling' | 'vocabulary' | null
  const [quizSkill, setQuizSkill] = useState(null);
  const [wordPracticeSelection, setWordPracticeSelection] = useState(null); // { skill, dayKey } | null
  const [studyGuideSelection, setStudyGuideSelection] = useState(null); // { subject, quarter } | null
  const [printoutLesson, setPrintoutLesson] = useState(null); // a lesson with a sheet | null
  const [journalSubject, setJournalSubject] = useState(null); // subject id | null
  const [reviewGameSelection, setReviewGameSelection] = useState(null); // { subject, quarter } | null
  const [weakSpotDrillSelection, setWeakSpotDrillSelection] = useState(null); // { subject, quarter } | null
  const [nationCommandOpen, setNationCommandOpen] = useState(false);
  const [launchDirectorOpen, setLaunchDirectorOpen] = useState(false);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  /**
   * ---- THE THEME, PAINTED ONCE, FROM ONE PLACE (Aug 25, 2026) ----
   *
   * Watching the value rather than calling `applyTheme` at each of the three
   * places it can change — hydrate, equip, and a merge arriving from the other
   * computer. Three call sites is three chances to add a fourth and forget,
   * and a theme that repaints on equip but not after an import is a screen
   * that disagrees with the database until the next reload.
   *
   * `null` is the free default, so this is correct before he owns anything.
   */
  const equippedTheme = useAppStore((s) => s.equippedTheme);
  useEffect(() => {
    applyTheme(equippedTheme);
  }, [equippedTheme]);

  useEffect(() => {
    const onBlocked = () => setDbNotice('blocked');
    const onVersionChange = () => setDbNotice('versionchange');
    window.addEventListener('mc-db-blocked', onBlocked);
    window.addEventListener('mc-db-versionchange', onVersionChange);
    return () => {
      window.removeEventListener('mc-db-blocked', onBlocked);
      window.removeEventListener('mc-db-versionchange', onVersionChange);
    };
  }, []);

  /**
   * ATTENDANCE: HIS MINUTES, NOT WHOEVER HAS THE APP OPEN.
   *
   * Counts a minute only while the tab is actually visible in the foreground,
   * not just "open" — a background tab should not inflate the record used
   * toward the 4.5-hour/day proxy.
   *
   * ---- AND NOT WHILE SHE IS GRADING (Aug 20, 2026) ----
   *
   * The parent, looking at two days she knew he had worked: "It only shows
   * Lamar had 2 hrs of work but he completed everything."
   *
   * Her own record for those two days:
   *
   *     Aug 18   1h 33m   0 activities
   *     Aug 19   2h 17m   0 activities
   *
   * Minutes with zero completions is the signature of an app sitting open, and
   * the app sitting open was HERS — the Parent Dashboard, while she graded, and
   * while this session read her records for hours. `recordActiveMinute` never
   * asked who was looking. **Her admin time was being written into his
   * instructional minutes**, on the record Georgia asks about.
   *
   * The minutes are not thrown away — an adult's time on the record is worth
   * knowing, and deleting data to fix a label is how the next question becomes
   * unanswerable. They are counted separately, and only the student view feeds
   * his attendance.
   */
  useEffect(() => {
    const interval = setInterval(() => {
      if (document.visibilityState !== 'visible') return;
      recordActiveMinute({ parentView: view === 'parent' });
    }, 60000);
    return () => clearInterval(interval);
  }, [recordActiveMinute, view]);

  if (!hydrated) {
    const showProblem = hydrationError || dbNotice;
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4 px-6 text-center text-ink-500">
        {showProblem ? (
          <>
            <p className="font-display text-sm uppercase tracking-widest text-signal-amber">
              Mission data could not load
            </p>
            <p className="max-w-md text-sm">
              {dbNotice === 'blocked'
                ? 'Mission Control looks open in another tab or window. Close the other tab, then press Try Again.'
                : dbNotice === 'versionchange'
                  ? 'Mission Control was updated in another tab. Reload this tab to catch up — nothing is lost.'
                  : `Your saved progress is still on this computer, but the app could not open it: ${hydrationError}`}
            </p>
            <button
              type="button"
              onClick={() => {
                if (dbNotice === 'versionchange') {
                  window.location.reload();
                  return;
                }
                setDbNotice(null);
                retryHydrate();
              }}
              className="rounded-lg border border-space-700 bg-space-800 px-4 py-2 font-display text-sm uppercase tracking-widest transition hover:border-signal-cyan/50"
            >
              {dbNotice === 'versionchange' ? 'Reload' : 'Try Again'}
            </button>
          </>
        ) : (
          <p className="font-display text-sm uppercase tracking-widest">Loading mission data…</p>
        )}
      </div>
    );
  }

  // Same branch order/logic as before this refactor — just collected into
  // one `content` value instead of 13 separate early returns, so the
  // whole thing can share a single Suspense boundary at the bottom
  // (lazy-loaded screens need a Suspense ancestor; wrapping each early
  // return individually would work too but is 13x the boilerplate for
  // the same result).
  let content;

  if (activeLesson) {
    // A lesson's practiceLink names a VIEW, not a component, so this is the one
    // place that knows how to get there. Typing is the awkward case: it is a
    // `view` in the nav but its sub-screens are driven by `typingMode`, so both
    // have to be set or the nav highlights Typing while the dashboard renders.
    content = (
      <LessonEngine
        lesson={activeLesson}
        onExit={() => setActiveLesson(null)}
        onOpenView={(target) => {
          setActiveLesson(null);
          setView(target);
          if (target === 'typing') setTypingMode(null);
        }}
      />
    );
  } else if (activePrompt) {
    content = <WritingPromptEngine prompt={activePrompt} onExit={() => setActivePrompt(null)} />;
  } else if (typingMode === 'lessons') {
    content = <TypingLessons onExit={() => setTypingMode(null)} onGoToSpeedTest={() => setTypingMode('speedtest')} />;
  } else if (typingMode === 'speedtest') {
    content = <TypingPractice onExit={() => setTypingMode(null)} />;
  } else if (quizSkill) {
    // Friday's graded activity, whichever shape that skill's Friday takes --
    // a typed spelling test, or the vocabulary quiz.
    content = <WordActivityRouter skill={quizSkill} dayKey="fri" onExit={() => setQuizSkill(null)} />;
  } else if (wordPracticeSelection) {
    content = (
      <WordActivityRouter
        skill={wordPracticeSelection.skill}
        dayKey={wordPracticeSelection.dayKey}
        onExit={() => setWordPracticeSelection(null)}
      />
    );
  } else if (studySkill) {
    // Opening the list outside Monday (the tiles, the weekend row) passes no
    // dayKey, so it reads as a reference screen and cannot tick Monday off.
    content = (
      <WordActivityRouter
        skill={studySkill}
        dayKey="read-only"
        onStartQuiz={() => {
          setQuizSkill(studySkill);
          setStudySkill(null);
        }}
        // Any day of the week's activities, from the list screen. This is how
        // the five activities are FOUND -- on a Saturday there is no day row to
        // reach them through, and a feature nobody can find is not built.
        onOpenActivity={(day) => {
          setWordPracticeSelection({ skill: studySkill, dayKey: day });
          setStudySkill(null);
        }}
        onExit={() => setStudySkill(null)}
      />
    );
  } else if (printoutLesson) {
    content = <PrintoutSheet lesson={printoutLesson} onExit={() => setPrintoutLesson(null)} />;
  } else if (journalSubject) {
    content = <SubjectJournal subject={journalSubject} onExit={() => setJournalSubject(null)} />;
  } else if (studyGuideSelection) {
    content = (
      <StudyGuide
        subject={studyGuideSelection.subject}
        quarter={studyGuideSelection.quarter}
        onExit={() => {
          // Study Guide is Day 1 of the 5-Day Study Cycle (PROJECT_PLAN.md
          // Part 4) — recordStudyCycleDay is idempotent/order-safe, so this
          // is a harmless no-op if Day 1 is already done or this cycle
          // hasn't started (e.g. reviewing again later).
          recordStudyCycleDay(studyGuideSelection.subject, studyGuideSelection.quarter, 1);
          setStudyGuideSelection(null);
        }}
      />
    );
  } else if (reviewGameSelection) {
    content = (
      <ReviewGame
        subject={reviewGameSelection.subject}
        quarter={reviewGameSelection.quarter}
        onExit={() => setReviewGameSelection(null)}
      />
    );
  } else if (weakSpotDrillSelection) {
    content = (
      <WeakSpotDrill
        subject={weakSpotDrillSelection.subject}
        quarter={weakSpotDrillSelection.quarter}
        onExit={() => setWeakSpotDrillSelection(null)}
      />
    );
  } else if (nationCommandOpen) {
    content = (
      <NationCommand
        onExit={() => {
          setNationCommandOpen(false);
          setView('games');
        }}
      />
    );
  } else if (launchDirectorOpen) {
    content = (
      <LaunchDirector
        onExit={() => {
          setLaunchDirectorOpen(false);
          setView('games');
        }}
      />
    );
  } else {
    content = (
      <>
        <NavBar view={view} onNavigate={setView} onSignOut={onSignOut} />
        {view === 'dashboard' && (
          <MissionControlDashboard
            onStartLesson={setActiveLesson}
            onOpenJournal={() => setView('journal')}
            onStartWeeklyProject={setActivePrompt}
            onStudyWords={setStudySkill}
            onQuizWords={setQuizSkill}
            onPracticeWords={(skill, dayKey) => setWordPracticeSelection({ skill, dayKey })}
            /**
             * Accepts `{ kind: 'book' | 'assignment', id }`, or nothing.
             *
             * The shape check is load-bearing: this handler is also passed
             * straight to onClick in two places, where it receives a click
             * EVENT. An event is an object, so `typeof === 'object'` alone
             * would sail through — the kind and the numeric id are what tell
             * a real request from a stray event.
             */
            onOpenAcademicCenter={(focus = null) => {
              const ok = focus
                && (focus.kind === 'book' || focus.kind === 'assignment')
                && typeof focus.id === 'number';
              setAcademicFocus(ok ? { kind: focus.kind, id: focus.id } : null);
              setView('academic');
            }}
            onOpenPE={() => setView('pe')}
            onOpenGuitar={() => setView('guitar')}
            onOpenGarden={() => setView('garden')}
            /**
             * WAS `setTypingMode('home')`, WHICH DID NOTHING. (Aug 10, 2026.)
             *
             * The parent: "The typing link on the mission control panel
             * doesn't do anything."
             *
             * She was exactly right, and the button was not broken so much as
             * pointed at a screen that does not exist. Typing's home is
             * `view === 'typing'`; `typingMode` only ever selects its SUB-
             * screens ('lessons' | 'speedtest'). Setting it to 'home' matched
             * no branch in the router below, so state changed, nothing
             * rendered, and the dashboard just sat there.
             *
             * typingMode is cleared alongside the view so he lands on the
             * Typing home screen rather than resuming whichever sub-screen he
             * was last in — which is the same pairing the lesson-engine
             * practiceLink handler already does for 'typing'.
             */
            onOpenTyping={() => {
              setView('typing');
              setTypingMode(null);
            }}
            onOpenMessages={() => setView('messages')}
            onOpenSchedule={() => {
              setScheduleMode('daily');
              setView('schedule');
            }}
            onOpenMorningMeeting={() => setView('morning')}
          />
        )}
        {view === 'progress' && <ProgressView />}
        {view === 'lessons' && (
          <LessonRoster
            onStartLesson={setActiveLesson}
            onOpenStudyGuide={(subject, quarter) => setStudyGuideSelection({ subject, quarter })}
            onOpenPrintout={setPrintoutLesson}
            onOpenJournal={setJournalSubject}
            onOpenReviewGame={(subject, quarter) => setReviewGameSelection({ subject, quarter })}
            onOpenWeakSpotDrill={(subject, quarter) => setWeakSpotDrillSelection({ subject, quarter })}
          />
        )}
        {view === 'games' && (
          <GamesHome
            onOpenNationCommand={() => setNationCommandOpen(true)}
            onOpenLaunchDirector={() => setLaunchDirectorOpen(true)}
          />
        )}
        {view === 'journal' && <WritingJournal onStartPrompt={setActivePrompt} />}
        {view === 'typing' && (
          <TypingHome
            onChooseLessons={() => setTypingMode('lessons')}
            onChooseSpeedTest={() => setTypingMode('speedtest')}
            onExit={() => setView('dashboard')}
          />
        )}
        {view === 'schedule' && <SchedulerHome initialMode={scheduleMode} />}
        {view === 'academic' && <AcademicHome focus={academicFocus} />}
        {view === 'rewards' && <RewardsHome />}
        {view === 'pe' && <PEHome onExit={() => setView('dashboard')} />}
        {/* onStartPrompt is the SAME handler the Writing Journal uses: a garden
            project is a `category: 'experiment'` prompt, so opening one from the
            garden and opening it from the Journal land in the same engine and
            produce the same graded entry. */}
        {view === 'garden' && (
          <GardenHome onExit={() => setView('dashboard')} onStartPrompt={setActivePrompt} />
        )}
        {/* Electric Guitar takes no props but onExit: unlike the garden, nothing
            here routes into the writing engine. Its theory items are readings
            with a check, NOT rows in allLessons — see config/subjects.js for why
            that distinction is load-bearing. */}
        {view === 'guitar' && <GuitarHome onExit={() => setView('dashboard')} />}
        {view === 'messages' && <MissionCommsHome onExit={() => setView('dashboard')} />}
        {/* block-1, 08:30-09:00. See components/Morning/MorningMeeting.jsx for
            why a timetable row that existed in one file and nowhere else had to
            become a screen with a record behind it. */}
        {view === 'morning' && (
          <MorningMeeting
            onExit={() => setView('dashboard')}
            onOpenSchedule={() => {
              setScheduleMode('daily');
              setView('schedule');
            }}
            onOpenPlanner={(mode) => {
              setScheduleMode(mode);
              setView('schedule');
            }}
            onOpenProgress={() => setView('progress')}
          />
        )}
        {view === 'parent' && (
          <ParentGate>
            <ParentDashboard onSignOut={onSignOut} />
          </ParentGate>
        )}
      </>
    );
  }

  return (
    <div className="min-h-screen">
      {dbNotice === 'versionchange' && (
        <div className="flex items-center justify-center gap-3 border-b border-signal-amber/40 bg-signal-amber/10 px-4 py-2 text-center text-xs text-ink-500">
          <span>Mission Control was updated in another tab — reload this tab to catch up.</span>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="rounded border border-space-700 bg-space-800 px-2 py-1 font-display uppercase tracking-widest transition hover:border-signal-cyan/50"
          >
            Reload
          </button>
        </div>
      )}
      <ErrorBoundary>
        <Suspense fallback={<ScreenLoading />}>{content}</Suspense>
      </ErrorBoundary>
    </div>
  );
}
