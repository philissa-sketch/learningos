// ---------------------------------------------------------------------------
// HER SCHOOL — her whole child side, as one screen. (Sept 23, 2026)
//
// This is the standalone Petal & Pestle app's App.jsx, child side, with her
// own screens and her own menu (NavBar), running on her own records
// (db/db.js). Every screen below is her app's, unchanged.
//
// ---- WHY ONE SCREEN WITH HER OWN MENU, NOT ONE PLATFORM TAB PER SCREEN ----
//
// Her screens move her between each other all day — Today opens a lesson, a
// lesson opens the reading check, the Market sends her to the Greenhouse —
// with onNavigate(view, course, lesson). A school screen in LearningOS is only
// handed "go back to the dashboard" (src/content/slots/views.js). So as
// separate platform tabs every one of those links would go nowhere. Inside
// this one screen they all work exactly as they do in her app.
//
// ---- WHAT CHANGED FROM HER APP'S App.jsx ----
//
//   · No port banner. Her app warns when it is not open at localhost:5180;
//     LearningOS runs at its own address, so the warning would always show.
//   · Her "Grown-Up Corner" button opens THIS school's Grown-Up Corner
//     (behind the platform's passcode lock), not her app's own lock, and
//     leaving it comes back to Today.
//   · Her bar carries the build date and Sign out, because the platform's own
//     bar is turned off in this school (nav.navShellBar, Sept 23, 2026).
//   · It opens on Today, not Home (the parent's choice, Sept 23, 2026).
//   · Wrapped in `.pp-app`, the scope her app's styles are compiled to
//     (styles/herApp.css), so they cannot restyle a platform screen.
// ---------------------------------------------------------------------------

import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import { NavBar } from '../../components/Navigation/NavBar.jsx';
import { HomeDashboard } from '../../components/Home/HomeDashboard.jsx';
import { ErrorBoundary } from '../../components/ErrorBoundary.jsx';
import { currentReadingCheck } from '../../lib/readingCheck.js';
import { GrownUpCorner } from '../GrownUpCorner/GrownUpCorner.jsx';
import '../../styles/herApp.css';

const pick = (name) => (m) => ({ default: m[name] });
const DiagnosticView = lazy(() => import('../../components/Diagnostic/DiagnosticView.jsx').then(pick('DiagnosticView')));
const LevelsView = lazy(() => import('../../components/Levels/LevelsView.jsx').then(pick('LevelsView')));
const PlanView = lazy(() => import('../../components/Plan/PlanView.jsx').then(pick('PlanView')));
const HerbLibraryView = lazy(() => import('../../components/Herbs/HerbLibraryView.jsx').then(pick('HerbLibraryView')));
const GamesView = lazy(() => import('../../components/Games/GamesView.jsx').then(pick('GamesView')));
const MovementView = lazy(() => import('../../components/Movement/MovementView.jsx').then(pick('MovementView')));
const MarketView = lazy(() => import('../../components/Rewards/MarketView.jsx').then(pick('MarketView')));
const GreenhouseView = lazy(() => import('../../components/Rewards/GreenhouseView.jsx').then(pick('GreenhouseView')));
const YearPlanView = lazy(() => import('../../components/Plan/YearPlanView.jsx').then(pick('YearPlanView')));
const TodayView = lazy(() => import('../../components/Schedule/TodayView.jsx').then(pick('TodayView')));
const CatchUpView = lazy(() => import('../../components/Schedule/CatchUpView.jsx').then(pick('CatchUpView')));
const LessonsView = lazy(() => import('../../components/Lessons/LessonsView.jsx').then(pick('LessonsView')));
const JournalView = lazy(() => import('../../components/Journal/JournalView.jsx').then(pick('JournalView')));
const WordStudyView = lazy(() => import('../../components/Assess/WordStudyView.jsx').then(pick('WordStudyView')));
const ReadingCheckView = lazy(() => import('../../components/Assess/ReadingCheckView.jsx').then(pick('ReadingCheckView')));

function ScreenLoading() {
  return (
    <div className="flex h-[50vh] items-center justify-center text-ink-500">
      <p className="font-display text-sm">Growing…</p>
    </div>
  );
}

export function HerSchool({ onSignOut }) {
  const hydrate = useAppStore((s) => s.hydrate);
  const hydrated = useAppStore((s) => s.hydrated);
  const hydrationError = useAppStore((s) => s.hydrationError);
  const retryHydrate = useAppStore((s) => s.retryHydrate);
  // Her app opens on Home. In LearningOS she starts her day on Today (the
  // parent, Sept 23, 2026); Today's first block, Morning Circle, leads Home.
  const [view, setView] = useState('today');
  const [dbNotice, setDbNotice] = useState(null);

  const strands = useAppStore((s) => s.strands);
  const khanGrades = useAppStore((s) => s.khanGrades);
  const readingUnitId = currentReadingCheck(strands, khanGrades)?.id ?? null;

  const [viewCourse, setViewCourse] = useState(null);
  const [viewLesson, setViewLesson] = useState(null);
  const navigate = useCallback((next, course = null, lesson = null) => {
    setView(next);
    setViewCourse(course || null);
    setViewLesson(lesson || null);
    if (typeof window !== 'undefined') window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    const onBlocked = () => setDbNotice('blocked');
    const onVersionChange = () => setDbNotice('versionchange');
    window.addEventListener('pp-db-blocked', onBlocked);
    window.addEventListener('pp-db-versionchange', onVersionChange);
    return () => {
      window.removeEventListener('pp-db-blocked', onBlocked);
      window.removeEventListener('pp-db-versionchange', onVersionChange);
    };
  }, []);

  if (view === 'parent') return <GrownUpCorner onExit={() => navigate('today')} />;

  if (!hydrated) {
    const problem = hydrationError || dbNotice;
    return (
      <div className="pp-app">
        <div className="flex h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
          {problem ? (
            <>
              <p className="text-4xl">🌱</p>
              <p className="font-display text-lg text-ink-900">Your saved work could not open</p>
              <p className="max-w-md text-sm text-ink-700">
                {dbNotice === 'blocked'
                  ? 'Petal & Pestle looks open in another tab. Close the other tab, then press Try Again.'
                  : dbNotice === 'versionchange'
                    ? 'The app was updated in another tab. Reload this one to catch up — nothing is lost.'
                    : `Everything is still saved on this computer, but the app could not read it: ${hydrationError}`}
              </p>
              <button
                type="button"
                onClick={() => {
                  if (dbNotice === 'versionchange') return window.location.reload();
                  setDbNotice(null);
                  retryHydrate();
                }}
                className="rounded-full bg-blush-500 px-6 py-2.5 font-700 text-white hover:bg-blush-700"
              >
                {dbNotice === 'versionchange' ? 'Reload' : 'Try again'}
              </button>
            </>
          ) : (
            <p className="font-display text-sm text-ink-500">Opening the greenhouse…</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="pp-app min-h-screen">
      {dbNotice === 'versionchange' && (
        <div className="print-hide flex items-center justify-center gap-3 border-b border-gold-500/40 bg-gold-300/30 px-4 py-2 text-center text-xs text-ink-700">
          <span>The app was updated in another tab — reload this one to catch up.</span>
          <button type="button" onClick={() => window.location.reload()} className="rounded-full border border-cream-300 bg-white px-3 py-1 font-700">
            Reload
          </button>
        </div>
      )}
      <NavBar view={view} onNavigate={navigate} onSignOut={onSignOut} />
      <ErrorBoundary>
        <Suspense fallback={<ScreenLoading />}>
          {view === 'home' && <HomeDashboard onNavigate={navigate} />}
          {view === 'today' && <TodayView onNavigate={navigate} />}
          {view === 'lessons' && <LessonsView onNavigate={navigate} courseId={viewCourse} lessonId={viewLesson} />}
          {view === 'reading' && <ReadingCheckView unitId={readingUnitId} onExit={() => navigate('today')} />}
          {view === 'words' && <WordStudyView onExit={() => navigate('today')} />}
          {view === 'friday' && <CatchUpView onNavigate={navigate} />}
          {view === 'journal' && <JournalView />}
          {view === 'diagnostic' && <DiagnosticView onNavigate={navigate} />}
          {view === 'levels' && <LevelsView onNavigate={navigate} />}
          {view === 'plan' && <PlanView onNavigate={navigate} />}
          {view === 'year' && <YearPlanView onNavigate={navigate} />}
          {view === 'greenhouse' && <GreenhouseView onNavigate={navigate} />}
          {view === 'market' && <MarketView onNavigate={navigate} />}
          {view === 'herbs' && <HerbLibraryView />}
          {view === 'games' && <GamesView />}
          {view === 'movement' && <MovementView />}
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
