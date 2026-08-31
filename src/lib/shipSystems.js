// ---------------------------------------------------------------------------
// THE SHIP — every subject builds a real part of the vehicle.
// (Part 10 redesign, built Aug 8, 2026.)
//
// WHY THIS EXISTS: it answers "why do I have to do this?" without a lecture.
// A 12-year-old will accept that math matters in the abstract and still not
// feel it. Seeing the guidance computer sitting at 30% because he has not
// touched math this month is a different kind of argument — and it is an
// honest one, because a real spacecraft genuinely does not fly without every
// one of these.
//
// THE MAPPINGS ARE NOT DECORATIVE. Each one is a job a real crewed vehicle
// actually has, and two of them settle an argument this project kept having
// about whether the "extra" subjects belong:
//
//   - GARDENING is life support. Closed-loop food is not a hobby on a Mars
//     mission, it is the difference between a three-year mission and a
//     one-way trip. NASA has grown food on the ISS since 2014 for exactly
//     this reason.
//   - GUITAR is crew morale. Also literal: astronauts have carried
//     instruments since Gemini, and long-duration crews are selected partly
//     on whether they can stand each other for months.
//
// HOW READINESS IS MEASURED, and the honesty note that goes with it: each
// system reads ONE counter the app already tracks truthfully, against a target
// that represents "this system is built". The targets are a design choice, not
// a discovered fact — they are set so a fully flight-ready ship is roughly a
// two-to-three-year achievement rather than something completed in a term or
// never at all. They are meant to be re-tuned as the curriculum grows, the
// same way the rank gates are.
// ---------------------------------------------------------------------------

export const SHIP_SYSTEMS = [
  {
    id: 'guidance',
    name: 'Guidance & Navigation',
    icon: '🧭',
    subjectLabel: 'Math',
    // Was 'khanUnitsCompleted' — EVERY Khan unit, world history included — so
    // "Guidance runs on Math" was not true. Math units only now, and the target
    // drops with it.
    stat: 'khanMathUnitsCompleted',
    target: 40,
    role: 'Works out where you are, where you are going, and how to get there.',
    why: 'Every course correction is arithmetic done under time pressure. Apollo 11 landed with about 25 seconds of fuel left because the guidance numbers were right.'
  },
  {
    id: 'propulsion',
    name: 'Propulsion',
    icon: '🔥',
    subjectLabel: 'Science & Aerospace',
    // Was 'totalMastered' — every mastered lesson in the app, so propulsion
    // rose after a social studies lesson. Science + aerospace only now. The
    // target had to come down with it: only 93 such lessons exist, so the old
    // 150 would have made this system permanently unreachable.
    stat: 'masteredPropulsion',
    target: 70,
    role: 'Turns stored energy into movement. Nothing else matters if this does not work.',
    why: 'Thrust, pressure, combustion, materials under load — this is physics and chemistry doing a job, not a chapter in a book.'
  },
  {
    id: 'comms',
    name: 'Comms & Mission Logs',
    icon: '📡',
    subjectLabel: 'Writing',
    stat: 'writingEntries',
    target: 60,
    role: 'Sends what you found back to people who were not there.',
    why: 'An experiment nobody can read the results of did not happen. Engineers write more than they build.'
  },
  {
    id: 'sensors',
    name: 'Sensors & Instruments',
    icon: '🔬',
    subjectLabel: 'Reading & Research',
    stat: 'booksCompleted',
    target: 12,
    role: 'Gathers information and tells you what is actually out there.',
    why: 'Reading widely is how you find out what has already been tried, which is most of what stops engineers repeating expensive mistakes.'
  },
  {
    id: 'onboard',
    name: 'Onboard Systems',
    icon: '⚙️',
    subjectLabel: 'Technology & Robotics',
    // Was 'assignmentsCompleted' — Academic Center assignments in ANY subject.
    // Technology and robotics lessons are the honest measure of this system, and
    // there are 52 of them.
    stat: 'masteredOnboard',
    target: 35,
    role: 'Runs the vehicle, and fixes it when something breaks a long way from help.',
    why: 'Every modern spacecraft is a computer with engines attached. The repair drones are not science fiction — the ISS runs on scheduled maintenance.'
  },
  {
    id: 'life-support',
    name: 'Life Support',
    icon: '🌱',
    subjectLabel: 'PE, Nutrition & Gardening',
    stat: 'lifeSupport',
    target: 150,
    role: 'Keeps the crew alive: air, water, food, and a body that still works after months in flight.',
    why: 'Closed-loop food is how a Mars mission eats. Astronauts also lose bone and muscle without daily exercise — fitness is a systems requirement, not a lifestyle choice.'
  },
  {
    id: 'morale',
    name: 'Crew Morale',
    icon: '🎸',
    subjectLabel: 'Guitar',
    stat: 'guitarSessions',
    target: 100,
    role: 'Keeps the crew sane on a long flight. Real missions plan for this.',
    why: 'Astronauts have carried instruments since Gemini. On a multi-year mission, whether the crew can live together is a genuine engineering constraint.'
  }
];

/**
 * A combined counter for life support, since three tracked activities feed it.
 * Meals count for a third each — logging lunch is real, but it is not a workout.
 */
function lifeSupportCount(stats) {
  const workouts = stats.workoutsLogged || 0;
  const garden = stats.gardenSessions || 0;
  const meals = Math.floor((stats.mealsLogged || 0) / 3);
  return workouts + garden + meals;
}

function rawCount(system, stats) {
  if (system.stat === 'lifeSupport') return lifeSupportCount(stats);
  return stats[system.stat] || 0;
}

/** Every system with its live readiness. Nothing here writes; it only reads. */
export function getShipStatus(stats) {
  const systems = SHIP_SYSTEMS.map((s) => {
    const current = rawCount(s, stats);
    const pct = Math.max(0, Math.min(1, current / s.target));
    return {
      ...s,
      current,
      pct,
      percent: Math.round(pct * 100),
      built: pct >= 1,
      // The weakest link is what the ship is actually waiting on.
      status: pct >= 1 ? 'flight-ready' : pct >= 0.5 ? 'coming together' : pct > 0 ? 'under construction' : 'not started'
    };
  });

  const overall = systems.reduce((sum, s) => sum + s.pct, 0) / (systems.length || 1);
  // Sorted ascending, so "what needs attention" is just the first entry.
  const weakest = [...systems].sort((a, b) => a.pct - b.pct)[0] || null;

  return {
    systems,
    overallPercent: Math.round(overall * 100),
    flightReady: systems.every((s) => s.built),
    weakest
  };
}

/**
 * One honest sentence about the ship, for the dashboard and for Nova.
 *
 * Deliberately never scolds. It names the system that needs work and what
 * feeds it, because "your comms array is at 20%" is information, while "you
 * are behind on writing" is a telling-off — and a telling-off delivered by a
 * character he likes is how you lose the character.
 */
export function shipSummary(status) {
  if (!status || !status.systems.length) return '';
  if (status.flightReady) return 'Every system is flight-ready. This ship can go anywhere.';
  const w = status.weakest;
  if (!w || w.current === 0) {
    return `Ship is ${status.overallPercent}% built. ${w ? `${w.name} has not been started — that is ${w.subjectLabel}.` : ''}`.trim();
  }
  return `Ship is ${status.overallPercent}% built. ${w.name} is the system furthest behind at ${w.percent}% — that one runs on ${w.subjectLabel}.`;
}
