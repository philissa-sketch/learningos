import { useMemo } from 'react';
import { useAppStore, totalMasteredCount } from '../../store/useAppStore.js';
import { StreakCounter } from './StreakCounter.jsx';
import { XPBar } from './XPBar.jsx';
import { RankBadge } from './RankBadge.jsx';
import { RocketProgressMeter } from './RocketProgressMeter.jsx';
import { SubjectProgressOverview } from './SubjectProgressOverview.jsx';
import { StudentGradesCard } from './StudentGradesCard.jsx';
import { getJourney, journeySummary } from '../../lib/journey.js';
import { NovaProgressPanel } from './NovaProgressPanel.jsx';
import { academyContent } from '../../content/academyContent.js';

const { KHAN_TAUGHT_SUBJECTS = [] } = academyContent().subjects;

// ---------------------------------------------------------------------------
// PROGRESS — the "where am I, overall" screen.
// (Reviewed and extended Aug 9, 2026 at the parent's request.)
//
// What it was: rank, XP, streak, Mission Control lesson mastery, grades. All
// correct, and all of it academic.
//
// Two problems that review turned up.
//
// 1. THE ARCHIVED SUBJECTS SHOWED A ZERO THAT COULD NEVER MOVE. Math, Reading
//    and Science were handed to Khan Academy, but their retired Mission Control
//    lessons — 204 of 356 — still rendered as mastery bars stuck at 0%. His real
//    work in those subjects appeared nowhere. Fixed in SubjectProgressOverview:
//    an archived subject now reports Khan units completed.
//
// 2. MORE THAN HALF OF WHAT HE DOES WAS MISSING. Books, workouts, the garden,
//    guitar, field trips, assignments, badges — none of it appeared on the one
//    screen called Progress, even though every piece is already tracked and
//    already earns badges. A progress screen that only counts lessons teaches
//    him which work the app thinks is real.
// ---------------------------------------------------------------------------

/** One compact figure. Deliberately no bars: several of these have no ceiling,
 *  and a bar implies a finish line that does not exist. */
function Stat({ label, value, sub }) {
  return (
    <div className="rounded-lg border border-space-700 bg-space-900 px-3 py-2">
      <p className="font-display text-lg font-700 text-ink-100">{value}</p>
      <p className="text-[11px] font-display uppercase tracking-widest text-ink-500">{label}</p>
      {sub && <p className="text-[10px] text-ink-600">{sub}</p>}
    </div>
  );
}

export function ProgressView() {
  const xp = useAppStore((s) => s.xp);
  const streak = useAppStore((s) => s.streak);
  const currentRank = useAppStore((s) => s.currentRank);
  const lessonProgress = useAppStore((s) => s.lessonProgress);
  const khanAcademyAssignments = useAppStore((s) => s.khanAcademyAssignments);
  const getSubjectProgress = useAppStore((s) => s.getSubjectProgress);
  const getGamificationStats = useAppStore((s) => s.getGamificationStats);

  // Slices the gamification snapshot reads, so the figures below refresh when
  // the underlying work does. A getter called bare in a render body never
  // re-subscribes — the staleness class Batch B fixed across the dashboards.
  const writingEntries = useAppStore((s) => s.writingEntries);
  const peWorkoutLog = useAppStore((s) => s.peWorkoutLog);
  const peMeals = useAppStore((s) => s.peMeals);
  const portfolio = useAppStore((s) => s.portfolio);
  const gardenLog = useAppStore((s) => s.gardenLog);
  const guitarLog = useAppStore((s) => s.guitarLog);
  const fieldTrips = useAppStore((s) => s.fieldTrips);
  const academicBooks = useAppStore((s) => s.academicBooks);
  const academicAssignments = useAppStore((s) => s.academicAssignments);
  const ledger = useAppStore((s) => s.ledger);

  /**
   * BOTH halves, or the rank card lies. A graded Khan unit at 90%+ counts
   * toward mastery now (see totalMasteredCount) — subscribing to only
   * lessonProgress would leave this stale every time she enters a Khan score.
   */
  const totalMastered = useMemo(
    () => totalMasteredCount({ lessonProgress, khanAcademyAssignments }),
    [lessonProgress, khanAcademyAssignments]
  );

  // Memoised: this walks all 356 lessons, and it used to run on every render.
  const subjectProgress = useMemo(
    () => getSubjectProgress(),
    [getSubjectProgress, lessonProgress]
  );

  /** Khan units per Khan-taught subject — the work that replaced those lessons. */
  const khanBySubject = useMemo(() => {
    const out = {};
    for (const s of KHAN_TAUGHT_SUBJECTS) out[s] = { completed: 0, total: 0 };
    for (const a of khanAcademyAssignments || []) {
      if (!out[a.subject]) continue;
      out[a.subject].total += 1;
      if (a.completed) out[a.subject].completed += 1;
    }
    return out;
  }, [khanAcademyAssignments]);

  const stats = useMemo(
    () => getGamificationStats(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [getGamificationStats, lessonProgress, khanAcademyAssignments, writingEntries,
     peWorkoutLog, peMeals, portfolio, gardenLog, guitarLog, fieldTrips,
     academicBooks, academicAssignments, ledger, xp, currentRank]
  );

  const journey = useMemo(
    () => getJourney(xp, totalMastered, currentRank),
    [xp, totalMastered, currentRank]
  );

  return (
    <div className="mx-auto max-w-5xl space-y-4 px-4 py-6 sm:px-6">
      <div>
        <p className="text-xs font-display uppercase tracking-widest text-ink-500">Progress</p>
        <h2 className="mt-1 font-display text-2xl font-700 text-ink-100">Rank &amp; Mastery</h2>
      </div>

      {/*
        Nova first, then grades. He opens this screen to find out how he is
        doing; the figures below prove it, but they do not say it. Grades moved
        up from the bottom for the same reason — it is the thing he checks, and
        it was under everything else.
      */}
      <NovaProgressPanel journey={journey} stats={stats} />

      <StudentGradesCard />

      <RocketProgressMeter xp={xp} totalMastered={totalMastered} currentRank={currentRank} />

      {/* One plain sentence about where he is, above the numbers that prove it. */}
      <div className="rounded-xl border border-signal-cyan/40 bg-signal-cyan/5 p-3 shadow-panel">
        <p className="flex items-center gap-2 font-display text-sm font-700 text-ink-100">
          <span className="text-lg">{journey.current.icon}</span>
          {journey.current.name}
        </p>
        <p className="mt-0.5 text-xs text-ink-300">{journeySummary(journey)}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StreakCounter streak={streak} />
        <XPBar xp={xp} currentRank={currentRank} totalMastered={totalMastered} />
        <RankBadge currentRank={currentRank} />
      </div>

      <SubjectProgressOverview subjectProgress={subjectProgress} khanBySubject={khanBySubject} />

      {/*
        Everything that is not a Mission Control lesson. This is over half of
        what he actually does, and none of it was on this screen — which quietly
        told him which work the app counts as real.
      */}
      <div className="rounded-xl border border-space-700 bg-space-800 p-4 shadow-panel">
        <p className="mb-1 text-xs font-display uppercase tracking-widest text-ink-500">Everything Else</p>
        <p className="mb-3 text-[11px] text-ink-600">
          Reading, fitness, the garden, the guitar and real-world trips. All of it counts.
        </p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Stat label="Khan units" value={stats.khanUnitsCompleted} sub="all subjects" />
          <Stat label="Books" value={stats.booksCompleted} sub="finished" />
          <Stat label="Workouts" value={stats.workoutsLogged} sub="logged" />
          <Stat label="Journal" value={stats.writingEntries} sub="entries" />
          <Stat label="Garden" value={stats.gardenSessions} sub="sessions" />
          <Stat label="Guitar" value={stats.guitarSessions} sub="practices" />
          <Stat label="Field trips" value={stats.fieldTripsCompleted} sub="completed" />
          <Stat label="Projects" value={stats.portfolioEntries} sub="in portfolio" />
        </div>
      </div>

    </div>
  );
}
