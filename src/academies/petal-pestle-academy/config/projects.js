// ---------------------------------------------------------------------------
// PROJECTS — the thing she makes, and the reason Friday exists.
//
// ---- WHY THIS FILE WAS WRITTEN (v3.10) ----
//
// Gigi: "where is the location for her projects" — and there wasn't one. The app
// had 96 lessons, each with a twenty-minute activity, and nowhere at all for the
// bigger piece of work that runs across a fortnight and ends in something she can
// hold up.
//
// It also had no Friday. Her week has always been Monday to Friday: three
// lessons, a test on Thursday, and Friday to catch up whatever did not get
// finished — and for projects to come due.
//
// ---- THE SHAPE ----
//
// ONE project per module. A module is two weeks, so a project is a fortnight's
// work, and it is due on the FRIDAY of the module's second week. Sixteen modules,
// sixteen projects, one every two weeks across the whole year.
//
// Every project is built out of work the lessons already ask for. This is
// deliberate: a project that invents new work on top of a full week is a project
// that does not get done. The bean bags, the root cups, the compost bin, the
// weather station and the field guide are all things the lessons already start —
// the project is the part where she finishes it, writes it up and shows somebody.
//
// ---- RULES ----
//
// * A project is NEVER scored. Petals for finishing it, the same as everything
//   else, and never for how it turned out. Same rule as the Journal.
// * `dueWeek` is a week inside its quarter, and it is always the module's second
//   week — checked by script, because a project due before its own lessons have
//   been taught is a project she cannot do.
// * `needs` is honest about materials. A project she cannot start because nobody
//   bought a thing on Monday is worse than no project.
// ---------------------------------------------------------------------------

/**
 * A project:
 *   id        stable, never renumbered — her record points at it
 *   module    1-16, and the project is due at the end of that module
 *   quarter   which quarter that module runs in
 *   dueWeek   week WITHIN the quarter. Always the module's second week.
 *   title     what she calls it
 *   what      one sentence: what she is actually making
 *   runs      how long it takes across the fortnight, honestly
 *   needs     materials, so a grown-up can get them in advance
 *   steps     what she does, in order
 *   done      what "finished" looks like, so it is not a matter of opinion
 */
/**
 * WHICH COURSE THESE BELONG TO — stated, v3.25.
 *
 * All sixteen are Herbalism projects: one per Herbalism module, due on the
 * Friday of that module's second week. That was obvious while Herbalism was
 * the only course in the app and it stopped being obvious the moment The
 * Science Lab was registered, because `module: 1` now names two different
 * modules in two different courses.
 *
 * Friday decides a project is due by comparing its quarter and week against how
 * far she has got. With two courses that comparison has to know WHICH course it
 * is measuring against, or reading a Science Lab lesson would make a Herbalism
 * project due. check-projects fails the build if this names a course that has no
 * weeks registered.
 */
export const PROJECTS_COURSE = 'herbalism';

export const PROJECTS = [
  // ================= QUARTER 1 =================
  {
    id: 'pj-m1',
    module: 1,
    quarter: 1,
    dueWeek: 2,
    title: 'The Seed Journal',
    what: 'A fourteen-day record of the four bean bags, with the day each one woke up.',
    runs: 'Five minutes a day for two weeks.',
    needs: ['the four bags from Lesson 1', 'the printable log', 'a pencil'],
    steps: [
      'Check all four bags at the same time every day.',
      'Write what you see, even on the days nothing happens.',
      'Mark the day the root came out, and the day the shoot did.',
      'At the end, say which bag won and why the other three did not.'
    ],
    done: 'Fourteen dated rows, and one sentence saying what the four bags proved.'
  },
  {
    id: 'pj-m2',
    module: 2,
    quarter: 1,
    dueWeek: 4,
    title: 'The Root Race chart',
    what: 'Two bar charts comparing root depth and root count across the clear cups.',
    runs: 'Measure every two days for ten days, then chart it.',
    needs: ['the cups from Lesson 9', 'a ruler in centimetres', 'squared paper'],
    steps: [
      'Measure the longest root in each cup, in centimetres.',
      'Count how many roots you can see in each cup.',
      'Plot both, every two days, on separate charts.',
      'Find the cup that wins on depth and the cup that wins on number.'
    ],
    done: 'Two charts, and a sentence about why the winners are different cups.'
  },
  {
    id: 'pj-m3',
    module: 3,
    quarter: 1,
    dueWeek: 6,
    title: 'The Compost Bin',
    what: 'A working compost bin, plus a two-week log of what the decomposers did.',
    runs: 'Build it in one afternoon, then look once a week.',
    needs: ['a lidded tub', 'a grown-up to make the air holes', 'kitchen scraps', 'dry leaves'],
    steps: [
      'Build the bin and write the date on the lid.',
      'Bury one apple core and one plastic spoon, and mark where each one is.',
      'Add scraps through the fortnight and note what you added.',
      'At the end, dig up both and draw what is left of each.'
    ],
    done: 'A working bin, a dated log, and the two drawings side by side.'
  },
  {
    id: 'pj-m4',
    module: 4,
    quarter: 1,
    dueWeek: 8,
    title: 'The Adaptation Hunt',
    what: 'A labelled collection of six real leaves showing six different defences.',
    runs: 'One long walk, then an afternoon mounting it.',
    needs: ['a bag', 'card', 'tape', 'the flower press from Module 7 if it exists yet'],
    steps: [
      'Find a fuzzy leaf, a waxy leaf, a thorn, a tendril, a strong-smelling leaf and a thick one.',
      'Ask before you pick anything, and never taste any of it.',
      'Tape each one to card and label what its trick is.',
      'Write who or what you think each defence is aimed at.'
    ],
    done: 'Six mounted specimens, each labelled with its defence and who it is against.'
  },
  // ================= QUARTER 2 =================
  {
    id: 'pj-m5',
    module: 5,
    quarter: 2,
    dueWeek: 2,
    title: 'The Drainage Investigation',
    what: 'A written-up experiment comparing how three soils let water through.',
    runs: 'One afternoon to run, one to write up.',
    needs: ['four cups', 'a grown-up to punch the holes', 'sand', 'potting mix', 'packed yard dirt', 'a timer'],
    steps: [
      'Set up the four cups, with one cup having no holes as the comparison.',
      'Pour the same amount of water into each and time what comes out.',
      'Write down the numbers before you decide what they mean.',
      'Say which soil you would use for ginger, and why.'
    ],
    done: 'A table of real timings and one decision with a reason under it.'
  },
  {
    id: 'pj-m6',
    module: 6,
    quarter: 2,
    dueWeek: 4,
    title: 'The Pollinator Patch',
    what: 'A planted patch with a water dish, and a two-week log of who visited.',
    runs: 'Plant in one afternoon, then ten minutes of watching every few days.',
    needs: ['a pot or a corner of ground', 'flowering seeds or plants', 'a shallow dish', 'pebbles'],
    steps: [
      'Plant it, and leave one patch of bare ground for the ground-nesting bees.',
      'Set the dish with pebbles so a bee can stand up to drink.',
      'Watch for ten minutes at the same time of day and tally what comes.',
      'Note the weather each time, because it changes what turns up.'
    ],
    done: 'A planted patch, and a tally of visitors across at least six watches.'
  },
  {
    id: 'pj-m7',
    module: 7,
    quarter: 2,
    dueWeek: 6,
    title: 'The Oral History',
    what: 'An interview with Gigi about a plant somebody in the family grew, written down and signed.',
    runs: 'One sitting to record, one to write up.',
    needs: ['paper', 'a pen', 'Gigi', 'somewhere quiet'],
    steps: [
      'Write your questions before you start.',
      'Ask them, and write the answers in her words rather than yours.',
      'Read it back to her and fix anything she says you got wrong.',
      'Date it and both of you sign it.'
    ],
    done: 'A dated, signed record that Gigi agrees says what she actually said.',
    note: 'This is the lesson of Module 7 in one page — the knowledge was oral, so it was easy to lose. She is the one writing it down this time.'
  },
  {
    id: 'pj-m8',
    module: 8,
    quarter: 2,
    dueWeek: 8,
    title: 'The Solar Tea Lab',
    what: 'A sun-brewed tea, with a colour log taken every thirty minutes.',
    runs: 'One sunny afternoon, three hours, checked every half hour.',
    needs: ['a clean glass jar with a lid', 'water', 'peppermint or lemon balm or dried hibiscus', 'a sunny spot'],
    steps: [
      'Put the herbs and water in, lid on, in the sunniest place you have.',
      'Every thirty minutes, look and write down the colour. Do not open it.',
      'After three hours, strain it.',
      'Drink the tea you brewed with the sun, with honey if you want it.'
    ],
    done: 'Six colour observations half an hour apart, and a tea she made herself.',
    note: 'A drink she made. Never a remedy, and the write-up never says it does anything to a person.'
  },
  // ================= QUARTER 3 =================
  {
    id: 'pj-m9',
    module: 9,
    quarter: 3,
    dueWeek: 2,
    title: 'The Weather Station',
    what: 'A rain gauge, a thermometer stand and a wind vane she built, plus fourteen days of readings.',
    runs: 'Build in one afternoon, then five minutes every morning for two weeks.',
    needs: ['a clear bottle', 'a ruler', 'a thermometer', 'a straw', 'card', 'a pin', 'a grown-up for the cutting'],
    steps: [
      'Build all three and put them somewhere they will not be moved.',
      'Read all three at the same time every morning and write it down.',
      'Do not skip the boring days — the boring days are the data.',
      'At the end, graph the fourteen days and find one pattern.'
    ],
    done: 'Three working instruments, fourteen dated readings, and one pattern she can point at.'
  },
  {
    id: 'pj-m10',
    module: 10,
    quarter: 3,
    dueWeek: 4,
    title: 'The Planting Decision',
    what: 'A real forecast, read properly, turned into one written planting decision.',
    runs: 'One afternoon, then check it the following Sunday.',
    needs: ['a real seven-day forecast for her ZIP code', 'her four containers', 'a ruled sheet'],
    steps: [
      'Copy the real seven-day lows, rain and wind into the table. Do not round them.',
      'Walk out and look at all four containers.',
      'Write ONE decision about what you will do this week, and two real numbers under it as the reason.',
      'Get Gigi to sign and date it, then check on Sunday whether you were right.'
    ],
    done: 'A signed, dated decision with two numbers behind it, and a note on Sunday saying how it went.'
  },
  {
    id: 'pj-m11',
    module: 11,
    quarter: 3,
    dueWeek: 6,
    title: 'The Labelled Shelf',
    what: 'Five dried, jarred, correctly labelled samples from her own garden.',
    runs: 'A week of drying, then an afternoon jarring and labelling.',
    needs: ['five clean jars', 'labels', 'a pen that does not smudge', 'herbs from her containers'],
    steps: [
      'Dry the five properly — a grown-up does anything involving the oven.',
      'Jar them when they snap rather than bend.',
      'Label all five: what it is, which part, when you picked it, how you dried it, the date.',
      'Get somebody who was not there to read a label and tell you what is in the jar.'
    ],
    done: 'Five jars, five complete labels, and a stranger able to say what each one holds.',
    note: 'The label IS the project. Module 11 exists to teach the difference between a scientist and a guess.'
  },
  {
    id: 'pj-m12',
    module: 12,
    quarter: 3,
    dueWeek: 8,
    title: "Next Year's Sowing Calendar",
    what: 'A real calendar for next year, counted backwards from her own last frost date.',
    runs: 'Two afternoons with a calendar and a pencil.',
    needs: ['a blank year calendar', "her local frost dates from Module 10", 'seed packets'],
    steps: [
      'Write in the last spring frost and the first autumn freeze.',
      'For each plant, count backwards from the frost date to find the sowing week.',
      'Mark garlic in autumn, because it goes in when the corn comes out.',
      'Check the arithmetic twice — a week wrong here is a crop lost in April.'
    ],
    done: 'A dated calendar with a real sowing week for every plant she means to grow.'
  },
  // ================= QUARTER 4 =================
  {
    id: 'pj-m13',
    module: 13,
    quarter: 4,
    dueWeek: 2,
    title: 'From Plant to Pill',
    what: 'One drug traced all the way from the plant it came from to the pill in a box.',
    runs: 'Two afternoons of reading and drawing.',
    needs: ['card or a big sheet', 'colours', 'the Module 13 lessons'],
    steps: [
      'Pick one: willow, foxglove, cinchona, periwinkle or sweet wormwood.',
      'Draw the plant, then the compound, then who found it and when.',
      'Show the step where somebody isolated it and measured it.',
      'End with what is printed on the box, and why that printing is the point.'
    ],
    done: 'One poster showing every step, with the person and the year named.',
    note: 'History and chemistry. It never says what the drug is for a person, and it never suggests making anything.'
  },
  {
    id: 'pj-m14',
    module: 14,
    quarter: 4,
    dueWeek: 4,
    title: 'Her Own Fair Test',
    what: 'One experiment she designed and ran herself, with a control group and a written prediction.',
    runs: 'Design in one afternoon, run across the fortnight, write up at the end.',
    needs: ['whatever her question needs', 'a pen', 'her prediction written BEFORE she looks'],
    steps: [
      'Write the question, and what you think will happen, in pen, before anything starts.',
      'Say out loud what result would make you drop your idea.',
      'Set up a treatment group and a control group. Change one thing only.',
      'Measure, write the numbers down, and only then decide what they mean.'
    ],
    done: 'A prediction written first, real numbers, and an honest conclusion — including if it was a null result.',
    note: 'A null result is a real answer. The project is finished whether or not she was right.'
  },
  {
    id: 'pj-m15',
    module: 15,
    quarter: 4,
    dueWeek: 6,
    title: 'The Portrait Wall',
    what: 'Six cards for six women, and one letter she writes to the one she wants to be like.',
    runs: 'Two afternoons.',
    needs: ['six cards', 'colours', 'writing paper', 'somewhere to hang them'],
    steps: [
      'One card per woman: her name, the year, and the one thing she did that nobody had done.',
      'Hang all six where you will actually see them.',
      'Pick the one whose work is closest to what you want to do.',
      'Write her a letter saying what you are going to learn first.'
    ],
    done: 'Six cards on a wall and one letter, kept.'
  },
  {
    id: 'pj-m16',
    module: 16,
    quarter: 4,
    dueWeek: 8,
    title: 'Her Field Guide',
    what: 'A field guide to her own garden, built from her own year of records.',
    runs: 'The whole fortnight. This is the big one.',
    needs: ['every Plant Detective Log from September', 'paper', 'her own drawings', 'something to bind it'],
    steps: [
      'Read back through the whole year first, before you write anything new.',
      'One page per plant: her drawing, her measurements, what it did across the year.',
      'Say what surprised her and what she got wrong in September.',
      'Bind it, put her name on it, and date it.'
    ],
    done: 'A finished guide, in her handwriting, from her own data, with her name on the front.',
    note: 'The capstone of the year. It should take the whole fortnight and it should be the thing she keeps.'
  }
];

/** Every project due on or before a given quarter and week, in order. */
export function projectsDueBy(quarter, week) {
  return PROJECTS.filter(
    (p) => p.quarter < quarter || (p.quarter === quarter && p.dueWeek <= week)
  );
}

export function projectById(id) {
  return PROJECTS.find((p) => p.id === id) || null;
}

export function projectForModule(moduleNumber) {
  return PROJECTS.find((p) => p.module === moduleNumber) || null;
}

export default PROJECTS;
