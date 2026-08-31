import { toDateStr } from '../../../../lib/scheduler.js';
import { quarterlyAcademicPlaceholders } from './placeholders.js';

/**
 * Assignment recommendations — real topics, proposed per slot, for the
 * parent to accept or pass on.
 *
 * WHY: the parent's words — "I don't want to set up any assignments. I
 * want the option to but I prefer not to. I will like AI to do so and I
 * can just accept it or not." Same model the book slots already use.
 *
 * WHAT MAKES THESE HONEST: unlike books, these topics need no external
 * verification, because they aren't claims about the world — they're
 * derived from THIS APP'S OWN CURRICULUM. Every topic below points at a
 * real lesson the student actually studies that quarter. The Q3
 * Aerospace research topics reference the real Q3 lessons (Orbital
 * Mechanics, Satellites, NASA Missions, Moon Missions, Mars Missions);
 * the Q2 Social Studies budget project references the real SS7E10
 * personal money management lesson; the Portfolio Entry suggestions name
 * real projects that already exist in aerospaceProjects.js and
 * scienceExperiments.js. Nothing here invents a lesson that isn't there.
 *
 * `dueHint` gives each slot a suggested real due date rather than
 * leaving the date blank. Two rules behind the numbers:
 *   - Land late enough in the quarter that the relevant lessons have
 *     actually been taught first.
 *   - Stagger multiple assignments in the same quarter, so two big
 *     pieces never land the same week. That's the same workload-collision
 *     problem the Parent Dashboard's Coming Up view flags; here it's
 *     avoided at the source.
 * The parent can change any date — it's a starting point, not a rule.
 */

const FRIDAY = 5;

/**
 * REAL DUE-DATE SCHEDULING — rewritten Aug 2026 after the parent asked
 * why assignments were scheduled so far out. She was right, and the old
 * approach was wrong in three separate ways:
 *
 *   1. Every assignment landed in the LAST MONTH of its quarter. Q1 runs
 *      August through October and nothing was due until October 9th —
 *      nine weeks of nothing, then seven assignments in three weeks.
 *   2. Assignments collided ACROSS subjects. Three landed on Oct 23,
 *      three more on Dec 11. The old check only prevented collisions
 *      within a single subject, which missed the thing that actually
 *      matters to a student: how much is due that week, total.
 *   3. One landed on DECEMBER 25th. Picking "the 4th Friday of the
 *      month" without checking what day that actually is produced a
 *      Technology presentation due on Christmas.
 *
 * The fix is to stop hand-picking dates entirely. Each quarter has a
 * real working window (with runway at the start so lessons get taught
 * first, and holidays excluded), and each quarter's assignments are
 * spread evenly across the real Fridays inside it. Heavier work sorts
 * later so it gets more runway. Nothing can land on a holiday because
 * holidays aren't in the candidate list to begin with.
 */

/**
 * The real working window per quarter, as [month, day] pairs, plus the
 * dates to keep clear. Derived from the actual 2026-2027 Clayton County
 * calendar this project already verified (school year Aug 3, 2026 -
 * May 26, 2027; see lib/schoolQuarter.js).
 *
 * Each window starts about three weeks into its quarter — assignments
 * shouldn't be due before the lessons they depend on have been taught —
 * and ends before the quarter's real edge, leaving grading time.
 */
const QUARTER_DUE_WINDOWS = {
  Q1: { start: [8, 24], end: [10, 30] },
  Q2: { start: [11, 6], end: [12, 18] },
  Q3: { start: [1, 23], end: [3, 26] },
  Q4: { start: [4, 17], end: [5, 22] },
  Summer: { start: [6, 19], end: [7, 31] }
};

/**
 * Kept clear on purpose. Thanksgiving week and the winter break are real
 * dates on the district calendar; the last week of the school year is
 * excluded so nothing is due while the year is being closed out.
 */
export const EXCLUDED_RANGES = [
  ['2026-11-23', '2026-11-27'],
  ['2026-12-19', '2027-01-04'],
  ['2027-05-23', '2027-05-31']
];

function isExcluded(dateStr) {
  return EXCLUDED_RANGES.some(([from, to]) => dateStr >= from && dateStr <= to);
}

/** The school year a quarter label belongs to, per schoolQuarter.js's rule. */
function yearsFor(quarterLabel) {
  const summer = /^Summer (\d{4})$/.exec(quarterLabel);
  if (summer) return { key: 'Summer', year: Number(summer[1]) };
  const m = /^(Q[1-4]) (\d{4})-(\d{4})$/.exec(quarterLabel);
  if (!m) return null;
  const key = m[1];
  // Aug-Dec belong to the first year; Jan-May to the second.
  const year = key === 'Q1' || key === 'Q2' ? Number(m[2]) : Number(m[3]);
  return { key, year };
}

/**
 * Every usable Friday in a quarter's working window — real dates, built
 * from local Date parts and formatted with toDateStr, never
 * toISOString(). Holidays and closing week are filtered out here, which
 * is why no downstream code has to remember about Christmas.
 */
export function availableDueDates(quarterLabel) {
  const resolved = yearsFor(quarterLabel);
  if (!resolved) return [];
  const window = QUARTER_DUE_WINDOWS[resolved.key];
  if (!window) return [];

  const start = new Date(resolved.year, window.start[0] - 1, window.start[1]);
  const end = new Date(resolved.year, window.end[0] - 1, window.end[1]);

  const dates = [];
  const cursor = new Date(start);
  // Advance to the first Friday on or after the window start.
  cursor.setDate(cursor.getDate() + ((FRIDAY - cursor.getDay() + 7) % 7));
  while (cursor <= end) {
    const dateStr = toDateStr(cursor);
    if (!isExcluded(dateStr)) dates.push(dateStr);
    cursor.setDate(cursor.getDate() + 7);
  }
  return dates;
}

/**
 * Heavier work sorts later in the quarter so it gets more runway. A
 * portfolio entry can land early; a research paper shouldn't.
 */
const TYPE_WEIGHT = {
  'Portfolio Entry': 1,
  'Writing Portfolio Entry': 1,
  'Book Report': 2,
  'Presentation': 2,
  'Research Paper': 3,
  'Reading Assignment': 4 // quarter-long by nature — always lands last
};

/**
 * Assigns every slot in a quarter a position, then spreads those
 * positions evenly across the quarter's available Fridays.
 *
 * Computed once at module load from the same seed data the app uses, so
 * it can never drift from the real slot list. Deterministic: sorted by
 * weight then slotId, so the same slot always gets the same date.
 */
function buildSchedule() {
  const schedule = {};
  const byQuarter = {};

  for (const [subject, byQ] of Object.entries(quarterlyAcademicPlaceholders)) {
    for (const [quarter, slots] of Object.entries(byQ)) {
      for (const slot of slots) {
        (byQuarter[quarter] ??= []).push({ ...slot, subject });
      }
    }
  }

  for (const [quarter, slots] of Object.entries(byQuarter)) {
    const fridays = availableDueDates(quarter);
    if (fridays.length === 0) continue;

    // Everything goes into ONE spread, sorted by weight. An earlier
    // version pulled Reading Assignments out and pinned them all to the
    // final Friday, which just moved the pile-up rather than removing
    // it — three reading deadlines plus the quarter's heaviest paper all
    // landing the same day. Sorting them last inside the same spread
    // gets the intent (long-horizon work lands late) without the stack.
    const byWeight = slots.sort(
      (a, b) => (TYPE_WEIGHT[a.type] || 2) - (TYPE_WEIGHT[b.type] || 2) || a.slotId.localeCompare(b.slotId)
    );

    // De-cluster by TYPE. Sorting by weight alone put two Book Reports in
    // back-to-back weeks (Oct 2 and Oct 9), which is exactly the kind of
    // bunching the 4+1 scheduling decision is meant to avoid — the
    // guidance is roughly one book report every 6-8 weeks, not two in a
    // fortnight. This greedy pass keeps the light-to-heavy shape but
    // refuses to place the same type twice in a row when an alternative
    // of similar weight is available.
    const ordered = [];
    const remaining = [...byWeight];
    while (remaining.length > 0) {
      const lastType = ordered.length > 0 ? ordered[ordered.length - 1].type : null;
      let pickIndex = remaining.findIndex((s) => s.type !== lastType);
      if (pickIndex === -1) pickIndex = 0; // only same-type left — unavoidable
      ordered.push(remaining.splice(pickIndex, 1)[0]);
    }

    const n = ordered.length;
    ordered.forEach((slot, i) => {
      // Spread evenly end to end. When a quarter has more assignments
      // than Fridays — Q2 is genuinely short — this doubles some days up
      // rather than overflowing the quarter, which is the honest
      // outcome: the work really is denser in a shorter quarter.
      const position = n === 1 ? Math.floor((fridays.length - 1) / 2) : Math.round((i * (fridays.length - 1)) / (n - 1));
      schedule[slot.slotId] = fridays[position];
    });
  }

  return schedule;
}

const SLOT_DUE_DATES = buildSchedule();

/**
 * The suggested due date for a slot — a real, spread-out, holiday-free
 * Friday. The parent can change any of them; this is a starting point,
 * not a rule.
 */
export function suggestedDueDateForSlot(slotId) {
  return SLOT_DUE_DATES[slotId] || null;
}

/**
 * Kept for the components' existing call shape. `dueHint` is no longer
 * a hand-picked month — the slot's real scheduled date is looked up
 * from the spread above.
 */
export function resolveSuggestedDueDate(quarterLabel, dueHint) {
  if (!dueHint || !dueHint.slotId) return null;
  return suggestedDueDateForSlot(dueHint.slotId);
}

/**
 * Static topic candidates, keyed by slotId. Reading Assignment slots are
 * deliberately absent — those are generated from the subject's actual
 * approved book at runtime (see readingAssignmentSuggestion below),
 * because "read chapters 3-4" is meaningless until a real book exists.
 */
export const assignmentRecommendations = {
  // ---------------- Aerospace ----------------
  'asg::aerospace::Q1::2': [
    {
      id: 'arec-aero-q1-p1',
      title: 'Engineering journal: Bottle Rocket build',
      about:
        "Write up the Bottle Rocket project as a real engineering journal entry — the design, what happened on each launch, what he changed, and what he'd change next.",
      why: 'Q1 covers Lift, Drag, and Thrust. The Bottle Rocket is the project where all three show up at once.',
      dueHint: { slotId: 'asg::aerospace::Q1::2' }
    },
    {
      id: 'arec-aero-q1-p2',
      title: 'Engineering journal: Parachute Drop Test',
      about:
        'Document the Parachute Drop Test — canopy size, drop height, fall time, and how drag changed the result.',
      why: 'A cleaner isolation of drag alone, if you want the write-up focused on one force instead of three.',
      dueHint: { slotId: 'asg::aerospace::Q1::2' }
    }
  ],
  // Re-pointed from asg::aerospace::Q2::2 to Q2::1 on Aug 8, 2026 when
  // *Chasing Space* was dropped. Both formats describe an engineering or
  // biography report on the quarter's aerospace read, and *Spaceman* — an
  // astronaut's memoir — is exactly that read. The recommendation ids are
  // unchanged so anything she has already dismissed stays dismissed.
  'asg::aerospace::Q2::1': [
    {
      id: 'arec-aero-q2-b1',
      title: 'Engineering analysis book report',
      about:
        'Instead of a plot summary: what problem were the engineers solving, what did they try, what failed, and what finally worked? Same structure as a real design review.',
      why: 'Q2 is Aircraft Design, Rocket Design, Jet Engines, and Spacecraft — all design-decision lessons.',
      dueHint: { slotId: 'asg::aerospace::Q2::1' }
    },
    {
      id: 'arec-aero-q2-b2',
      title: 'Biography book report: the person behind the machine',
      about:
        "Report on the person rather than the technology — what they were trying to prove, what stood in the way, and what they'd already failed at first.",
      why: 'Pairs with whichever biography he reads this quarter, and connects to the Trailblazers unit.',
      dueHint: { slotId: 'asg::aerospace::Q2::1' }
    }
  ],
  'asg::aerospace::Q3::2': [
    {
      id: 'arec-aero-q3-r1',
      title: 'Engineering-analysis report on a Q3 aerospace read',
      about:
        'Not a plot summary: what problem were the engineers in this book solving, what did they try, what failed, and what finally worked?',
      why: 'Q3 covers Orbital Mechanics, Satellites, and the NASA/Moon/Mars missions — the book gives him a real case to analyze.',
      dueHint: { slotId: 'asg::aerospace::Q3::2' }
    },
    {
      id: 'arec-aero-q3-r2',
      title: 'Research paper: What made the Moon landings possible?',
      about:
        'Pick the Apollo program and trace the specific engineering problems that had to be solved first — and which ones nearly stopped it.',
      why: 'Q3 covers NASA Missions and Moon Missions directly, so the lessons feed the paper.',
      dueHint: { slotId: 'asg::aerospace::Q3::2' }
    },
    {
      id: 'arec-aero-q3-r3',
      title: 'Research paper: Why is landing on Mars so much harder than the Moon?',
      about:
        'Compare the two — atmosphere, distance, communication delay, and why so many Mars landers have failed.',
      why: 'Q3 ends on Mars Missions. Good fit if he wants the harder, more open question.',
      dueHint: { slotId: 'asg::aerospace::Q3::2' }
    }
  ],
  'asg::aerospace::Q4::2': [
    {
      id: 'arec-aero-q4-pres1',
      title: 'Present a design using the Engineering Design Process',
      about:
        'Walk through one of his own builds start to finish using the real process: define, brainstorm, prototype, test, improve. Slides, poster, or spoken — his pick.',
      why: 'Q4 ends on the Engineering Design Process itself, so this is the quarter demonstrating what it learned.',
      dueHint: { slotId: 'asg::aerospace::Q4::2' }
    },
    {
      id: 'arec-aero-q4-pres2',
      title: 'Present: what SpaceX changed about rockets',
      about:
        'Explain reusable boosters to someone who knows nothing about rockets — what was thrown away before, and why landing one is hard.',
      why: 'Q4 opens with SpaceX Innovations. Explaining it simply is the real test of understanding it.',
      dueHint: { slotId: 'asg::aerospace::Q4::2' }
    }
  ],
  'asg::aerospace::Summer::2': [
    {
      id: 'arec-aero-sum-p1',
      title: 'Summer project write-up: Simple Wind Tunnel Test',
      about: 'Build the wind tunnel test, then write up what he was measuring and what surprised him.',
      why: 'Summer covers Wind Tunnels & Flight Testing directly, and the project already exists in his journal.',
      dueHint: { slotId: 'asg::aerospace::Summer::2' }
    },
    {
      id: 'arec-aero-sum-p2',
      title: 'Summer project write-up: design a space suit component',
      about:
        'Pick one job a space suit has to do — pressure, temperature, air, mobility — and design and sketch a solution for just that piece.',
      why: 'Summer opens with Space Suits and Reentry & Heat Shields. Design-only, no build required.',
      dueHint: { slotId: 'asg::aerospace::Summer::2' }
    }
  ],

  // ---------------- Science ----------------
  'asg::science::Q1::1': [
    {
      id: 'arec-sci-q1-1',
      title: 'Lab report: Egg Drop Challenge',
      about:
        'Full lab report — hypothesis, materials, procedure, what happened, and why. Include the designs that failed.',
      why: 'A real experiment already in his journal, and failure analysis is the honest part of science.',
      dueHint: { slotId: 'asg::science::Q1::1' }
    },
    {
      id: 'arec-sci-q1-2',
      title: 'Lab report: Baking Soda & Vinegar Reaction',
      about: 'Measure it properly — vary the amounts, record the reaction, and explain what gas is being produced.',
      why: 'Simplest setup of the experiments, and it makes measurement and controls the focus.',
      dueHint: { slotId: 'asg::science::Q1::1' }
    }
  ],
  'asg::science::Q2::1': [
    {
      id: 'arec-sci-q2-1',
      title: 'Lab report: Solar Oven',
      about: 'Build it, measure the temperature over time, and explain how energy is being trapped.',
      why: 'Energy transfer, and it connects to the Khan Academy matter-and-energy units this quarter.',
      dueHint: { slotId: 'asg::science::Q2::1' }
    },
    {
      id: 'arec-sci-q2-2',
      title: 'Lab report: Homemade Compass',
      about: 'Build the compass, test it against a real one, and explain what is actually making the needle move.',
      why: 'Short and self-contained — good for the shorter Q2.',
      dueHint: { slotId: 'asg::science::Q2::1' }
    }
  ],
  'asg::science::Q3::1': [
    {
      id: 'arec-sci-q3-1',
      title: 'Scientific-review report on a life-science read',
      about:
        'What question was this book really asking, what evidence did it give, and what did it leave unanswered? Evidence from the text throughout.',
      why: 'Q3 Khan Academy is Interactions in Ecosystems and Biodiversity — the book supplies the case, the report supplies the analysis.',
      dueHint: { slotId: 'asg::science::Q3::1' }
    },
    {
      id: 'arec-sci-q3-2',
      title: 'Research paper: How do living things survive somewhere hostile?',
      about:
        'Compare adaptations in an extreme environment — deep ocean, desert, or the edge of space — and what they trade away to survive.',
      why: 'Ecosystems plus a natural bridge to life-support engineering, which is aerospace.',
      dueHint: { slotId: 'asg::science::Q3::1' }
    }
  ],
  'asg::science::Q4::1': [
    {
      id: 'arec-sci-q4-1',
      title: 'Lab report: Marble Roller Coaster',
      about: 'Build the track, then explain the energy changes at each point and where the energy goes.',
      why: 'Q4 Khan Academy previews Motion and Forces. This makes it physical.',
      dueHint: { slotId: 'asg::science::Q4::1' }
    },
    {
      id: 'arec-sci-q4-2',
      title: 'Lab report: Bridge Building Challenge',
      about: 'Build, load-test to failure, and write up where it broke and why that point was the weakest.',
      why: 'Forces made visible, and testing to failure is real engineering practice.',
      dueHint: { slotId: 'asg::science::Q4::1' }
    }
  ],
  'asg::science::Summer::1': [
    {
      id: 'arec-sci-sum-1',
      title: 'Present an experiment science-fair style',
      about:
        'Pick the experiment he is proudest of, build a real display board, and present it — question, method, data, conclusion.',
      why: 'Summer is the natural time for it, and it is genuine practice for a real science fair.',
      dueHint: { slotId: 'asg::science::Summer::1' }
    },
    {
      id: 'arec-sci-sum-2',
      title: 'Present: Mars Rover Model',
      about: 'Show the rover model and explain each design choice — wheels, power, instruments — and what it would be for.',
      why: 'Bridges Science and Aerospace, and the project already exists in his journal.',
      dueHint: { slotId: 'asg::science::Summer::1' }
    }
  ],

  // ---------------- Technology ----------------
  'asg::technology::Q1::1': [
    {
      id: 'arec-tech-q1-1',
      title: 'Build a real web page about his own project',
      about:
        'A working HTML/CSS page about something he actually built — a rocket, an experiment, a model — with real headings, images, and styling.',
      why: 'Q1 covers HTML Basics and CSS Basics. The page is the proof he can use them.',
      dueHint: { slotId: 'asg::technology::Q1::1' }
    },
    {
      id: 'arec-tech-q1-2',
      title: 'Write a Python program that does something useful',
      about:
        'Small but real — a workout-log calculator, a unit converter for his rocket math, or a quiz generator for his own vocabulary words.',
      why: 'Q1 covers Python Programming, and useful beats toy for staying motivated.',
      dueHint: { slotId: 'asg::technology::Q1::1' }
    }
  ],
  'asg::technology::Q2::1': [
    {
      id: 'arec-tech-q2-1',
      title: 'Build a program using lists and conditionals',
      about:
        'Something that stores multiple items and makes decisions about them — a launch checklist that flags what is missing, for instance.',
      why: 'Q2 opens with Python II: Lists & Conditionals. This is exactly that skill, applied.',
      dueHint: { slotId: 'asg::technology::Q2::1' }
    },
    {
      id: 'arec-tech-q2-2',
      title: 'Design an automation with sensors and a feedback loop',
      about:
        'On paper or in code: what it senses, what it decides, what it does, and how it knows it worked.',
      why: 'Q2 ends on Automation II: Sensors & Feedback Loops — the core idea behind every control system.',
      dueHint: { slotId: 'asg::technology::Q2::1' }
    }
  ],
  'asg::technology::Q2::2': [
    {
      id: 'arec-tech-q2-pres1',
      title: 'Demo a working program he wrote',
      about:
        'Show it running, then explain one part of the code line by line and one bug he had to hunt down.',
      why: 'Explaining your own code out loud is the fastest way to find out how well you understand it.',
      dueHint: { slotId: 'asg::technology::Q2::2' }
    },
    {
      id: 'arec-tech-q2-pres2',
      title: 'Present: how does a neural network actually learn?',
      about: 'Explain training data and why an AI can be confidently wrong, in plain language, with an example.',
      why: 'Q2 covers AI II: Neural Networks & Training Data — and it is worth him being clear-eyed about this.',
      dueHint: { slotId: 'asg::technology::Q2::2' }
    }
  ],

  // ---------------- Social Studies ----------------
  'asg::socialStudies::Q1::2': [
    {
      id: 'arec-ss-q1-1',
      title: 'Historical-analysis report using real records',
      about:
        'Read a history book, then check one claim in it against a real record — census, certificate, primary document — and report what you found.',
      why: 'Q1 is Genealogy Research Methods and Evaluating Historical Evidence. Checking a book against a record IS that unit.',
      dueHint: { slotId: 'asg::socialStudies::Q1::2' }
    },
    {
      id: 'arec-ss-q1-2',
      title: 'Local history investigation',
      about:
        'Research how one place near you changed over time, using records rather than a summary someone else wrote.',
      why: 'Same research skills as the family project, if he would rather not make it personal.',
      dueHint: { slotId: 'asg::socialStudies::Q1::2' }
    },
    {
      id: 'arec-ss-q1-3',
      title: 'Investigation: when the records disagree',
      about:
        'Find a person or event where two sources conflict, then work out which is more reliable and defend the choice.',
      why: 'Q1 teaches corroboration and Racial Reclassification in Historical Records — where records genuinely conflict.',
      dueHint: { slotId: 'asg::socialStudies::Q1::2' }
    }
  ],
  'asg::socialStudies::Q2::2': [
    {
      id: 'arec-ss-q2-1',
      title: 'Build a real personal budget',
      about:
        'A working budget with real numbers — income, saving, spending — and a written explanation of the choices behind it.',
      why: 'Q2 ends on Economics II: Personal Money Management (SS7E10). This makes it real instead of theoretical.',
      dueHint: { slotId: 'asg::socialStudies::Q2::2' }
    },
    {
      id: 'arec-ss-q2-2',
      title: 'Budget and plan a real project',
      about:
        'Cost out something he actually wants to build — a rocket, a computer, a garden bed — and plan how to fund it.',
      why: 'Same money-management skill, aimed at something he already wants.',
      dueHint: { slotId: 'asg::socialStudies::Q2::2' }
    }
  ],
  'asg::socialStudies::Q3::2': [
    {
      id: 'arec-ss-q3-1',
      title: 'Present a region to someone who has never been there',
      about:
        'Pick one region from the World History units and explain its geography, government, and economy — and how those three shape each other.',
      why: 'Q2-Q3 cover Africa, Southwest Asia, and Southern & Eastern Asia across all three of those angles.',
      dueHint: { slotId: 'asg::socialStudies::Q3::2' }
    },
    {
      id: 'arec-ss-q3-2',
      title: 'Present a Black STEM trailblazer',
      about:
        'Pick one of the 17 trailblazers already in his Social Studies unit and present their work, the obstacles, and what came after them.',
      why: 'The biographies already exist in the app, so the research is a real deepening rather than a cold start.',
      dueHint: { slotId: 'asg::socialStudies::Q3::2' }
    }
  ],

  // ---------------- Math ----------------
  'asg::math::Q1::1': [
    {
      id: 'arec-math-q1-1',
      title: 'Scale drawing of a real rocket',
      about: 'Pick a real rocket, find its actual dimensions, and draw it accurately to scale with the ratio shown.',
      why: 'Ratios and scale drawings are core 7th-grade math, and this puts them on something he cares about.',
      dueHint: { slotId: 'asg::math::Q1::1' }
    },
    {
      id: 'arec-math-q1-2',
      title: 'Measurement project: how much does it hold?',
      about: 'Calculate volume and surface area for real containers, then measure to check how close the math was.',
      why: 'Volume and surface area are on the Khan sequence, and checking predictions against reality is the point.',
      dueHint: { slotId: 'asg::math::Q1::1' }
    }
  ],
  'asg::math::Q2::1': [
    {
      id: 'arec-math-q2-1',
      title: 'Unit-rate comparison: what is actually the better deal?',
      about: 'Compare real prices at real stores using unit rates, and write up which wins and by how much.',
      why: 'Q2 Khan Academy covers Rates and Percentages, and this pairs with the Social Studies budget project.',
      dueHint: { slotId: 'asg::math::Q2::1' }
    },
    {
      id: 'arec-math-q2-2',
      title: 'Recipe scaling project',
      about: 'Take a real recipe and scale it up and down with fractions, then cook one version and see if the math held.',
      why: 'Fraction operations, and it doubles as a Nutrition track activity.',
      dueHint: { slotId: 'asg::math::Q2::1' }
    }
  ],
  'asg::math::Q3::1': [
    {
      id: 'arec-math-q3-1',
      title: 'Model a real situation with an equation',
      about:
        'Find something that changes at a steady rate — fuel burn, savings, distance — write the equation, and use it to predict.',
      why: 'Q3 Khan Academy covers expressions, equations, and constant of proportionality.',
      dueHint: { slotId: 'asg::math::Q3::1' }
    },
    {
      id: 'arec-math-q3-2',
      title: 'Geometry in a real structure',
      about: 'Measure a real structure, calculate its angles and areas, and explain why those shapes were chosen.',
      why: 'Q3 covers geometry, and "why this shape" is an engineering question, not just a math one.',
      dueHint: { slotId: 'asg::math::Q3::1' }
    }
  ],
  'asg::math::Q4::1': [
    {
      id: 'arec-math-q4-1',
      title: 'Statistics project using his own data',
      about:
        'Use a real data set he already has — workout logs, water intake, lesson scores — and find the mean, spread, and any real pattern.',
      why: 'Q4 Khan Academy is Statistics and Probability, and his own PE trackers are already collecting the data.',
      dueHint: { slotId: 'asg::math::Q4::1' }
    },
    {
      id: 'arec-math-q4-2',
      title: 'Probability project: test whether it is really fair',
      about: 'Predict probabilities, then run enough real trials to see how close the results come to the prediction.',
      why: 'Q4 covers probability, and the gap between theory and 100 real trials is the whole lesson.',
      dueHint: { slotId: 'asg::math::Q4::1' }
    }
  ],
  'asg::math::Summer::1': [
    {
      id: 'arec-math-sum-1',
      title: 'Math of a real trip',
      about: 'Plan a real or imagined trip with actual distances, times, fuel, and costs — every number defensible.',
      why: 'Pulls together rates, percentages, and multi-step problem solving in one place.',
      dueHint: { slotId: 'asg::math::Summer::1' }
    },
    {
      id: 'arec-math-sum-2',
      title: 'Design something to a budget and a size limit',
      about: 'Pick a build, set a real budget and a real size constraint, and show the math that makes it fit both.',
      why: 'Constraints are what makes engineering math different from textbook math.',
      dueHint: { slotId: 'asg::math::Summer::1' }
    }
  ],

  // ---------------- Reading ----------------
  'asg::reading::Q1::2': [
    {
      id: 'arec-read-q1-1',
      title: 'Book report: the problem and how it got solved',
      about:
        'What problem does the main character face, what do they try, what fails, and what finally works? Evidence from the text for each.',
      why: 'The same structure as an engineering design review, applied to a story — familiar shape, new material.',
      dueHint: { slotId: 'asg::reading::Q1::2' }
    },
    {
      id: 'arec-read-q1-2',
      title: 'Book report: character change over time',
      about: 'Who is this person at the start, who are they at the end, and what specific events moved them?',
      why: 'The standard middle-school book report, done properly with evidence.',
      dueHint: { slotId: 'asg::reading::Q1::2' }
    }
  ],
  'asg::reading::Q3::2': [
    {
      id: 'arec-read-q3-1',
      title: 'Present a book to someone who has not read it',
      about: 'Make the case for or against reading it — no spoilers, real reasons, and an honest verdict.',
      why: 'Persuasive speaking with something he actually has an opinion about.',
      dueHint: { slotId: 'asg::reading::Q3::2' }
    },
    {
      id: 'arec-read-q3-2',
      title: 'Present: compare two books',
      about: 'Take two books he read this year and compare how each handled the same idea — survival, fairness, or failure.',
      why: 'Comparison is harder than summary, and it is the skill high school English will expect.',
      dueHint: { slotId: 'asg::reading::Q3::2' }
    }
  ],

  // ---------------- Writing ----------------
  'asg::writing::Q1::1': [
    {
      id: 'arec-write-q1-1',
      title: 'Choose his strongest writing from this quarter',
      about: 'He picks the entry he is proudest of, revises it once more, and writes a short note on why he chose it.',
      why: 'Choosing and defending your own best work is a real skill, and the entries already exist in the journal.',
      dueHint: { slotId: 'asg::writing::Q1::1' }
    }
  ],
  'asg::writing::Q2::1': [
    {
      id: 'arec-write-q2-1',
      title: 'Research paper: the history of flight',
      about:
        'Two pages, three real sources, cited. Trace how flight went from impossible to routine, and name the specific problems that had to be solved.',
      why: 'Cross-curricular by design — counts for both Language Arts and Aerospace, so it is one piece of work, not two.',
      dueHint: { slotId: 'asg::writing::Q2::1' }
    },
    {
      id: 'arec-write-q2-2',
      title: 'Research paper: a specific aircraft or spacecraft',
      about: 'Pick one machine, explain what it was built to do, how it worked, and whether it succeeded. Two pages, three sources.',
      why: 'Narrower than the history topic, which makes a first research paper easier to finish.',
      dueHint: { slotId: 'asg::writing::Q2::1' }
    }
  ],
  'asg::writing::Q3::1': [
    {
      id: 'arec-write-q3-1',
      title: 'Portfolio entry: technical writing',
      about: 'Pick a mission report or lab write-up, revise it for someone who was not there, and note what he clarified.',
      why: 'Technical writing is the writing an engineer actually does most — and Q3 is deliberately kept free of research papers.',
      dueHint: { slotId: 'asg::writing::Q3::1' }
    }
  ],
  'asg::writing::Q4::1': [
    {
      id: 'arec-write-q4-1',
      title: 'Capstone research paper: a modern aerospace engineering problem',
      about:
        'Three pages, built over about a month — reusable rockets, orbital debris, or getting humans to Mars. Real sources, cited, with his own view at the end.',
      why: 'The year-end capstone, and the first paper long enough to need a real outline. Points straight at what he wants to do.',
      dueHint: { slotId: 'asg::writing::Q4::1' }
    },
    {
      id: 'arec-write-q4-2',
      title: 'Capstone research paper: an engineering failure and what changed after it',
      about: 'Pick a real failure, explain what went wrong, and trace what got redesigned because of it. Three pages.',
      why: 'Failure analysis is how engineering actually advances, and it is easier to structure than an open question.',
      dueHint: { slotId: 'asg::writing::Q4::1' }
    }
  ],
  'asg::writing::Summer::1': [
    {
      id: 'arec-write-sum-1',
      title: 'Portfolio entry: year-end reflection',
      about: 'What he learned, what was hard, what he would do differently, and what he wants next year to include.',
      why: 'Also gives you a real record for your homeschool file at year end.',
      dueHint: { slotId: 'asg::writing::Summer::1' }
    }
  ]
};

/**
 * Reading Assignment slots are generated, not stored, because their real
 * content depends on which book was actually approved for that subject.
 * "Read chapters 3-4" is meaningless without a book, and inventing a
 * chapter count for a book that hasn't been chosen would be exactly the
 * kind of false precision this project avoids.
 *
 * Returns null when the subject has no book yet — the UI then says so
 * and points at the book slot, which is the honest thing to show.
 */
export function readingAssignmentSuggestion(slot, booksForSubject) {
  const usable = booksForSubject.filter((b) => b.title && b.status !== 'completed');
  if (usable.length === 0) return null;

  // Prefer a book he's already reading, then a Required one, then anything.
  const book =
    usable.find((b) => b.status === 'in-progress') ||
    usable.find((b) => b.type === 'Required') ||
    usable[0];

  return {
    id: `arec-reading-${slot.slotId}-${book.id}`,
    title: `Read ${book.title}`,
    about: `Work through ${book.title}${book.author ? ` by ${book.author}` : ''} across this quarter at a steady pace, with a short written reaction at the end.`,
    why: 'Generated from the book actually approved for this subject — no pacing is invented for a book that has not been chosen.',
    dueHint: null,
    generated: true
  };
}

/** All static candidates for an assignment slot, in offer order. */
export function assignmentCandidatesForSlot(slotId) {
  return assignmentRecommendations[slotId] || [];
}

/**
 * The next topic awaiting a yes/no on this assignment slot — the first
 * she hasn't turned down. Reading Assignment slots resolve dynamically
 * against the subject's books. Returns null once a real title exists or
 * the options run out.
 */
export function nextAssignmentRecommendation(assignment, booksForSubject = []) {
  if (!assignment || assignment.title) return null;
  const rejected = new Set(assignment.rejectedRecommendationIds || []);

  if (assignment.type === 'Reading Assignment') {
    const generated = readingAssignmentSuggestion(assignment, booksForSubject);
    if (!generated || rejected.has(generated.id)) return null;
    return generated;
  }

  return assignmentCandidatesForSlot(assignment.slotId).find((c) => !rejected.has(c.id)) || null;
}
