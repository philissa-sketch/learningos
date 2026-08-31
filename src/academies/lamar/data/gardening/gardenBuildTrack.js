// ---------------------------------------------------------------------------
// Gardening — the five-build track, and where each build's skills come from.
//
// WHY THIS FILE EXISTS (Aug 8, 2026, at the parent's direct question): "was
// there anything mentioning building items so that there can be more grown in
// that small space, using lessons learned in aerospace, nasa, robotics, tech?"
//
// The answer was yes in the design and no in the app. The build track and its
// cross-subject sourcing were written down in PROJECT_PLAN.md Part 4 and were
// visible NOWHERE to the student. Nothing told him that the parametric shelf he
// models in Tinkercad in Q2 is the vertical rack that goes in the garden, or
// that the sensor threshold he tunes in Robotics in Q4 is what will eventually
// water his buckets. A connection that exists only in a planning document is
// not a connection he can use.
//
// It also discharges a specific instruction from the design: NAME THE Q4
// MOISTURE SENSOR IN AUGUST, "so every water measurement between now and April
// is data for a build he already knows is coming." That naming happens here and
// in the Aug 28 brief.
//
// GATING: build 1 (the sun survey) gates every build after it, and that is real
// rather than decorative — builds 2 through 5 all place a physical object in a
// zone, and until the survey has produced numbers nobody knows which zone. The
// UI shows 2-5 as locked with the reason stated, not hidden. A locked build he
// can read is a promise; a hidden one is a surprise.
//
// ONE LIVE PROJECT AT A TIME is the design's named defense against load creep.
// This file is a map of the year, NOT a queue of things to start.
//
// Q1 HAS NO BUILD, on purpose. You do not bolt a rack into a zone nobody has
// measured. Q1 is measurement; the building starts in Q2.
// ---------------------------------------------------------------------------

export const gardenBuildTrack = [
  {
    number: 1,
    id: 'gd7-build-sun-survey',
    projectId: 'gd7-project-sun-survey',
    title: 'The Sun Survey',
    quarter: 'Q1 2026-2027',
    when: 'August',
    status: 'active',
    buildsWhat: 'Nothing physical — a measured map of the garden floor.',
    theProblem:
      'Light is the binding constraint under an awning, and nobody knows the number. Every build after this one puts an object in a zone, and no zone has been measured.',
    gatedBy: null,
    gatedReason: null,
    // The project's estMinutes (90) is the setup and the write-up. It is NOT
    // the whole job, and printed alone it is a lie in the other direction from
    // "this takes a month" — hence the note. Added Aug 24 2026 after the parent
    // read the Build Track and said the builds "seem like these are builds that
    // can be completed in a month."
    timeNote:
      'The 90 minutes is marking out the zones and writing it up. The measuring is two clear days of hourly checks, 9am to 6pm — ten checks a day, a minute each, done between everything else.',
    drawsOn: [
      {
        subject: 'aerospace',
        what: 'Predict, then measure, then compare',
        detail: 'The leggy summer plants are the prediction. The hourly survey is the measurement.'
      }
    ],
    measureBeforeAfter: 'Direct-sun hours per zone — eight numbers that did not exist before.'
  },
  {
    number: 2,
    id: 'gd7-build-self-watering-buckets',
    projectId: 'gd7-project-self-watering-bucket',
    title: 'Self-Watering Buckets',
    quarter: 'Q2 2026-2027',
    when: 'November',
    // BUILT Q2. Still `gatedBy: 1` — the gate is about WHERE the first one goes
    // (the thirstiest zone, which only the survey and the watering log identify),
    // not about whether the instructions exist.
    status: 'built',
    buildsWhat: 'Two buckets with a reservoir underneath, a wicking column into the mix, and an overflow. One plain bucket is kept unchanged as a control.',
    theProblem:
      'Under an awning no rain ever falls and every drop is carried by hand. A bucket that drinks on its own is fewer trips and a plant that is never thirsty between visits.',
    gatedBy: 1,
    gatedReason: 'The first one goes in the thirstiest zone — which the watering log and the sun map identify.',
    drawsOn: [
      {
        subject: 'gardening',
        what: 'NASA Veggie — wicking, clay pillows, no poured water',
        detail: 'Taught in the Sep 25 brief. In microgravity poured water drowns roots or strands them in air; wicking is how NASA solved it.'
      },
      {
        subject: 'aerospace',
        what: 'Change one variable, keep a control',
        detail: 'Two self-watering buckets and one plain bucket. Without the control you have a build and a feeling, not a result.'
      }
    ],
    measureBeforeAfter: 'Waterings per week per bucket, and plant growth, self-watering versus control.'
  },
  {
    number: 3,
    id: 'gd7-build-vertical-structure',
    projectId: 'gd7-project-vertical-structure',
    title: 'The Vertical Structure',
    quarter: 'Q3 2026-2027',
    when: 'February',
    // BUILT Q3, and built STEPPED rather than stacked. Shelves directly above
    // each other would have roofed the floor that already worked — under an
    // awning the light arrives sideways, so each tier steps back to keep a
    // clear line to the open edge. That trade is the build.
    status: 'built',
    buildsWhat: 'A tiered rack that turns headroom into growing area — designed in CAD first, then built.',
    theProblem:
      'The garden has 32 square feet of floor and about 224 cubic feet of volume. This is the build that goes after the difference. It is also the one that answers "how do I grow more in this small space" most directly.',
    gatedBy: 1,
    gatedReason: 'A rack shades whatever sits under it. Where it can stand without killing a zone is a question only the sun map answers.',
    drawsOn: [
      {
        subject: 'technology',
        what: 'The Change-One-Number Test — a parametric shelf in Tinkercad',
        detail: 'Technology project tech7-tinkercad-parametric-shelf, from CAD II in Q2. He models a shelf, changes one dimension, and watches the model update. That shelf is this rack.'
      },
      {
        subject: 'technology',
        what: 'CAD Software Fundamentals and 3D Modeling',
        detail: 'Technology Q1 — already running now. Dimensioned drawing before cutting anything.'
      },
      {
        subject: 'aerospace',
        what: 'Load, tipping, and reach',
        detail: 'A wet bucket is far heavier than a dry one. What holds at the top of a tier, and can a 12-year-old actually reach it?'
      }
    ],
    measureBeforeAfter: 'Square-feet-hours: area times direct-sun hours, gained on the new tiers against lost on the shaded floor. The verdict can come out negative, and if it does that is the result.'
  },
  {
    number: 4,
    id: 'gd7-build-trellis-v2',
    projectId: 'gd7-project-trellis-v2',
    title: 'Trellis v2',
    quarter: 'Q3 2026-2027',
    when: 'March',
    // BUILT Q3. Diagnostic first: load the existing one until something moves,
    // THEN design against the failure you measured rather than the part that
    // looked flimsy.
    status: 'built',
    buildsWhat: 'A rebuild of the trellis already standing in the garden — anchored better, tensioned, and rated for a real load.',
    theProblem:
      'One already exists, and making it better is the brief. A loaded, wet, fruiting vine weighs far more than the bare frame was ever asked to hold.',
    gatedBy: 1,
    gatedReason: 'A trellis is a vertical surface that casts shade. Where it can stand depends on the sun map.',
    drawsOn: [
      {
        subject: 'aerospace',
        what: 'Anchoring, tension, and load paths',
        detail: 'Every load has to reach the ground somehow. Finding the path it takes is the design.'
      },
      {
        subject: 'technology',
        what: 'The engineering design process — defining the problem, testing, iterating',
        detail: 'Technology Q3, tech7-engineering-design-process. Version 2 of anything is that process made literal.'
      }
    ],
    measureBeforeAfter: 'Weight it holds without deflecting, and the vertical growing area gained.'
  },
  {
    number: 5,
    id: 'gd7-build-gravity-irrigation',
    projectId: 'gd7-project-gravity-irrigation',
    title: 'Gravity Irrigation',
    quarter: 'Q4 2026-2027',
    when: 'April',
    // BUILT Q4. The measurement is the build: identical cups under every
    // outlet for exactly one minute, because a system that overwaters the near
    // bucket and starves the far one looks fine from the doorway.
    status: 'built',
    buildsWhat: 'One raised reservoir feeding several buckets through tubing — and the fix for why the far bucket gets less than the near one.',
    theProblem:
      'Self-watering buckets still get filled one at a time. One reservoir filling all of them is the last manual step removed before a sensor can take over.',
    gatedBy: 1,
    gatedReason: 'Head pressure depends on how high the reservoir sits and how far each bucket is from it — which depends on where the buckets ended up.',
    drawsOn: [
      {
        subject: 'aerospace',
        what: 'Head pressure and flow rate',
        detail: 'Height drives pressure, and pressure drives flow. The far bucket gets less for a reason you can calculate before you see it.'
      },
      {
        subject: 'robotics',
        what: 'Sensors, thresholds, and hysteresis',
        detail: 'Robotics Q4 — rb7-sensors and rb7-sensors-2. Read a real sensor, pick a threshold, watch it chatter at the boundary, fix it with a dead zone.'
      }
    ],
    measureBeforeAfter: 'Water delivered to the nearest versus the farthest bucket, before and after levelling the flow.'
  }
];

/**
 * The year's capstone, named in August on purpose.
 *
 * From the design: "Name it in August so every water measurement between now
 * and April is data for a build he already knows is coming." A capstone
 * announced in April is a surprise; announced in August it makes eight months
 * of otherwise tedious logging into data collection with a point.
 */
export const gardenCapstone = {
  id: 'gd7-capstone-moisture-sensor',
  projectId: 'gd7-project-moisture-capstone',
  status: 'built',
  title: 'The Soil-Moisture Sensor',
  quarter: 'Q4 2026-2027',
  when: 'April - May',
  namedOn: '2026-08-28',
  summary:
    'A sensor in a bucket that reports when that bucket actually needs water — and then, wired to the gravity-irrigation reservoir, waters it without being asked.',
  whyItIsReal:
    'Under an awning no rain ever falls and every drop is carried by hand. This is not a demonstration of a sensor; it is the solution to the central problem of this specific garden.',
  needsFromNow:
    'The watering log. How much water this garden really uses, and how that changes with the weather and the season, is not on any website — the only possible source is a log that starts in August.',
  drawsOn: [
    { subject: 'robotics', what: 'Reading a sensor, choosing a threshold, and hysteresis' },
    { subject: 'gardening', what: 'Eight months of watering data and the NASA Advanced Plant Habitat, at 180+ sensors' },
    { subject: 'technology', what: 'Designing the housing that puts electronics in a wet bucket safely' }
  ]
};

/** Builds unlocked by the state of the gating build. */
export function buildsUnlockedBy(completedBuildNumbers = []) {
  return gardenBuildTrack.filter(
    (b) => b.gatedBy === null || completedBuildNumbers.includes(b.gatedBy)
  );
}
