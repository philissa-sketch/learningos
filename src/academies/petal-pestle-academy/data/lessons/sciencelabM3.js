// ---------------------------------------------------------------------------
// THE SCIENCE LAB — MODULE 3, QUARTER 1, WEEKS 5-6
// SIX SIMPLE MACHINES IN THE GARDEN SHED
//
// Georgia S4P3c — "Ask questions to identify and explain the uses of simple
// machines (lever, pulley, wedge, inclined plane, screw, wheel and axle) and
// how forces are changed when simple machines are used to complete tasks."
//
// ---- ONE MACHINE PER LESSON, AND THIS MODULE IS WHY THE BLUEPRINT WAS RE-CUT ----
//
// The first draft of Quarter 1 bundled these six into three lessons — "the
// pulley and the screw", "the inclined plane and the wedge" — and then went
// looking for six videos to cover them. It could not be done honestly, and the
// seams showed immediately: the pulley-and-screw lesson ended up carrying a
// video titled "Types of Levers", and the wedge lesson got one about the screw.
//
// Georgia names exactly six machines. There are exactly six real videos, one
// for each, because each machine is a genuinely different thing. So there are
// six lessons. This module is the clearest case in the whole course of the rule
// that came out of that audit: if no video exists that teaches a lesson, the
// lesson is not distinct enough — and that is never a licence to reach for
// something adjacent.
//
// ---- THE SHED IS THE POINT ----
//
// Every one of the six is already in her garden and she has used all of them
// without knowing they had names. The trowel is a lever. The barrow is a lever
// AND a wheel and axle. The hanging basket runs on a pulley. The plank up to
// the raised bed is an inclined plane. The spade is a wedge. The jar lid is a
// screw. Nothing in this module needs buying, and a machine she can go and put
// her hands on is a machine she keeps.
//
// ---- WHAT "SIMPLE MACHINE" ACTUALLY MEANS, SAID PLAINLY ----
//
// Not a machine with an engine. A shape that changes a force — makes it
// smaller, or points it somewhere else. Every one of the six trades something
// away to do it, and the trade is the interesting half: a ramp makes lifting
// easier by making the journey longer. Nothing is free. That trade is what
// Georgia means by "how forces are changed", and it is in every lesson here.
//
// Shape, reading level, safety: as Modules 1 and 2. Thirty minutes, two beats,
// an Apply-It inside each, a three-question check, ten in the bank.
//
// SAFETY NOTE FOR THIS MODULE SPECIFICALLY: it is the one with sharp edges in
// it. The wedge lesson uses a spade and a butter knife, never pruners and never
// an axe, and a grown-up handles anything with a blade. That is written into
// every activity rather than assumed.
// ---------------------------------------------------------------------------

// =========================================================== LESSON 13 · LEVER
const L13_CHECK_IN = {
  title: 'Lift the paving slab with one finger',
  text: 'Try to lift the edge of a heavy pot with one finger. Now slide a trowel under it and press the handle.',
  question: 'Your finger did not get stronger. So what did?'
};

const L13_BEATS = [
  {
    n: 1,
    label: 'A stiff bar and a place to tip',
    hook: 'A lever is the oldest machine there is, and there is one in her hand every time she weeds.',
    teachingText:
      'A lever is a stiff bar that turns on one spot. That spot is called the fulcrum. The heavy thing you are moving is the load, and the push you give is the effort.',
    example:
      'Push the trowel handle down and the tip comes up under the pot. The trowel turns on the rim of the pot — that rim is the fulcrum.',
    applyIt: {
      prompt: 'What is the fulcrum?',
      choices: ['The heavy thing being lifted', 'The spot the bar turns on', 'The push you give', 'The handle'],
      answer: 1,
      feedback: [
        'That is the load.',
        null,
        'That is the effort.',
        'The handle is where the effort goes in.'
      ],
      why: 'Every lever turns on one spot, and that spot is the fulcrum.'
    }
  },
  {
    n: 2,
    label: 'Move the fulcrum and everything changes',
    hook: 'The same trowel can feel heavy or light, and all she changes is where it rests.',
    teachingText:
      'The closer the fulcrum sits to the load, the less effort it takes. She does not get stronger. The lever spreads her push out, and she trades a longer push for an easier one.',
    example:
      'Rest the trowel close to the pot and it lifts easily. Rest it far away and the same pot feels heavy again.',
    applyIt: {
      prompt: 'To lift a heavy pot with the least effort, put the fulcrum:',
      choices: ['Close to the pot', 'Far from the pot', 'Under your hand', 'It makes no difference'],
      answer: 0,
      feedback: [
        null,
        'That makes it harder, not easier.',
        'Then there is no lever at all.',
        'Try both and feel the difference.'
      ],
      why: 'Fulcrum near the load means a small effort moves a big load.'
    }
  }
];

const L13_ACTIVITY = {
  title: 'The ruler and the pebbles',
  prep: 'Nothing to buy. A pencil and a ruler will do the whole thing.',
  needs: ['a wooden ruler', 'a pencil', 'a small stack of pebbles', 'one heavy stone', 'her notebook'],
  steps: [
    'Lay the pencil under the middle of the ruler. That is your fulcrum.',
    'Put the heavy stone on one end and press the other end down. How hard was it?',
    'Now roll the pencil closer to the stone and press again. Easier or harder?',
    'Now roll it far away from the stone and press again.',
    'Write down which position was easiest, and how far your hand had to travel each time.',
    'Go and find three levers in the shed. A trowel, the barrow handles, and one more.'
  ],
  safety: 'Nothing heavy near the edge of the bench, and nothing balanced above a foot.',
  minutes: 12
};

const L13_LEDGER = {
  prompt: 'Draw your ruler lever. Mark the fulcrum, the load and the effort with three arrows.',
  ifSheIsStuck:
    'Three questions in order: what is turning, what is it turning on, and where is she pushing. Those are the bar, the fulcrum and the effort.'
};

// ================================================= LESSON 14 · WHEEL AND AXLE
const L14_CHECK_IN = {
  title: 'Drag the bag, then wheel it',
  text: 'Drag a bag of compost two metres across the path. Now put it in the barrow and push it the same way.',
  question: 'It weighs exactly the same. Why was one so much harder?'
};

const L14_BEATS = [
  {
    n: 1,
    label: 'A wheel and the rod it turns on',
    hook: 'A wheel on its own is just a circle. It becomes a machine when it is joined to a rod.',
    teachingText:
      'A wheel and axle is a round wheel fixed to a rod through its middle. The rod is the axle. Turn one and the other has to turn with it.',
    example:
      'The barrow wheel turns on its axle. So does the hose reel, and so does a doorknob.',
    applyIt: {
      prompt: 'What is the axle?',
      choices: ['The round outside part', 'The rod through the middle', 'The load', 'The handle'],
      answer: 1,
      feedback: [
        'That is the wheel.',
        null,
        'The load is what is being carried.',
        'The handle is not part of the pair.'
      ],
      why: 'Wheel outside, axle through the middle, fixed together.'
    }
  },
  {
    n: 2,
    label: 'Rolling beats dragging',
    hook: 'She met the reason in Module 1 and it has a name she already knows.',
    teachingText:
      'Dragging rubs the whole load along the ground the whole way. A wheel only touches the ground at one small spot at a time, so there is far less friction to fight.',
    example:
      'The same bag of compost dragged leaves a scraped line on the path. Wheeled, it leaves one thin track.',
    applyIt: {
      prompt: 'Wheeling the bag is easier than dragging it because there is less:',
      choices: ['Weight', 'Gravity', 'Friction', 'Air'],
      answer: 2,
      feedback: [
        'The bag weighs the same either way.',
        'Gravity pulls the same on both.',
        null,
        'Air is not what was slowing it.'
      ],
      why: 'Rolling rubs far less than dragging. That is friction, from Module 1.'
    }
  }
];

const L14_ACTIVITY = {
  title: 'Rollers under a box',
  prep: 'Six round pencils, all the same thickness.',
  needs: ['a heavy box or a stack of books', 'six round pencils', 'a flat floor', 'her notebook'],
  steps: [
    'Push the box across the floor with nothing under it. Feel how hard.',
    'Now lay the six pencils side by side and set the box on top of them.',
    'Push it again. Feel the difference.',
    'Watch what the pencils do as the box moves forward.',
    'Take one pencil away, then another. When does it get hard again?',
    'Write one sentence saying what the pencils were doing for her.'
  ],
  safety: 'Do this on a floor, not on a table. Pencils roll and so do things standing on them.',
  minutes: 12
};

const L14_LEDGER = {
  prompt: 'Name three wheels and axles in your garden, and say what each one carries or turns.',
  ifSheIsStuck: 'Look for anything with a rod through the middle of a circle. Doorknob. Tap. Hose reel.'
};

// ============================================================ LESSON 15 · PULLEY
const L15_CHECK_IN = {
  title: 'Pull down to lift up',
  text: 'Throw a rope over a strong branch, tie a small bucket to one end, and pull the other end down.',
  question: 'You pulled DOWN. Which way did the bucket go, and why is that useful?'
};

const L15_BEATS = [
  {
    n: 1,
    label: 'A wheel with a groove and a rope in it',
    hook: 'A pulley does not make the load lighter. It changes which way she has to pull.',
    teachingText:
      'A pulley is a wheel with a groove around it and a rope running in the groove. Pull the rope down and the load on the other end goes up.',
    example:
      'The hanging basket on its bracket, and the bucket in an old well, both work this way.',
    applyIt: {
      prompt: 'She pulls down on the rope. The basket:',
      choices: ['Goes up', 'Goes down too', 'Stays still', 'Swings sideways'],
      answer: 0,
      feedback: [
        null,
        'The rope goes over the wheel, so the ends move opposite ways.',
        'Something moved. She felt it.',
        'It goes straight up if the rope is straight.'
      ],
      why: 'The rope runs over the wheel, so one end goes up as the other comes down.'
    }
  },
  {
    n: 2,
    label: 'Why pulling down is easier than lifting up',
    hook: 'She weighs more than the basket does, and that turns out to matter.',
    teachingText:
      'Lifting straight up uses only her arms. Pulling down lets her use her whole body weight to help. The load has not changed at all — only the direction she has to work in.',
    example:
      'A hanging basket she can barely lift over her head comes down easily on a rope she can pull with both hands.',
    applyIt: {
      prompt: 'A single pulley mainly changes:',
      choices: ['How heavy the load is', 'Which way you pull', 'How far the load travels', 'How much it weighs'],
      answer: 1,
      feedback: [
        'The load is exactly as heavy as it was.',
        null,
        'It goes up as far as she pulls down.',
        'Weight is not what changed.'
      ],
      why: 'One pulley redirects the force. It does not shrink it.'
    }
  }
];

const L15_ACTIVITY = {
  title: 'A pulley from a cotton reel',
  prep: 'A cotton reel, a pencil and a length of string. Ten minutes to build, ten to play.',
  needs: ['an empty cotton reel', 'a pencil', 'string', 'a small bag with a stone in it', 'a chair back'],
  steps: [
    'Push the pencil through the cotton reel so the reel spins freely.',
    'Rest the pencil ends on the back of a chair so the reel hangs between them.',
    'Run the string over the reel. Tie the bag to one end.',
    'Pull the free end down. Watch the bag rise.',
    'Now lift the bag straight up with one hand instead. Which felt easier?',
    'Write down which was easier, and whether the bag got any lighter.'
  ],
  safety: 'Keep the bag light — one small stone, not a brick. Nothing hangs over anybody.',
  minutes: 14
};

const L15_LEDGER = {
  prompt: 'Draw your cotton reel pulley with the rope on it. Put an arrow on each end of the rope.',
  ifSheIsStuck: 'The two arrows point opposite ways. That is the whole idea in one picture.'
};

// ==================================================== LESSON 16 · INCLINED PLANE
const L16_CHECK_IN = {
  title: 'Up the plank, or straight up',
  text: 'Lift a full pot straight up onto the raised bed. Now lean a plank against the bed and slide the same pot up it.',
  question: 'Which way was easier — and which way was further?'
};

const L16_BEATS = [
  {
    n: 1,
    label: 'A slope is a machine',
    hook: 'The ramp up to the raised bed is doing real work, and it has no moving parts at all.',
    teachingText:
      'An inclined plane is a flat surface with one end higher than the other. A ramp. Pushing something up a slope takes less effort than lifting it straight up.',
    example:
      'A plank leaned against the raised bed, a path that climbs, and the slope of a shed roof are all inclined planes.',
    applyIt: {
      prompt: 'An inclined plane is:',
      choices: ['A wheel on a rod', 'A rope over a wheel', 'A flat slope', 'A sharp edge'],
      answer: 2,
      feedback: [
        'That is a wheel and axle.',
        'That is a pulley.',
        null,
        'That is a wedge.'
      ],
      why: 'A ramp. Flat, with one end higher than the other.'
    }
  },
  {
    n: 2,
    label: 'Nothing is free — you pay in distance',
    hook: 'The ramp did not make the pot lighter. It made the journey longer.',
    teachingText:
      'A gentle slope is easier to climb and longer to walk. A steep slope is shorter and harder. Every simple machine makes a trade like this, and the ramp is where it is easiest to see.',
    example:
      'Sliding the pot up two metres of gentle plank is easier than lifting it half a metre straight up, and she travels four times as far doing it.',
    applyIt: {
      prompt: 'A longer, gentler ramp to the same height is:',
      choices: ['Harder to push up', 'Easier to push up', 'Exactly the same', 'Impossible'],
      answer: 1,
      feedback: [
        'Gentler means less effort, not more.',
        null,
        'Try a steep plank and a gentle one.',
        'Gentle ramps are the usual kind.'
      ],
      why: 'Gentler is easier and longer. That is the trade.'
    }
  }
];

const L16_ACTIVITY = {
  title: 'Three ramps, one pot',
  prep: 'A plank or a stiff piece of card, and a stack of books to raise one end.',
  needs: ['a plank or stiff card', 'books to prop it', 'a pot with soil in it', 'string', 'a tape measure'],
  steps: [
    'Prop the plank on one book. Tie string to the pot and pull it up the slope.',
    'Measure how far the pot travelled along the plank.',
    'Now prop the plank on three books. Pull the pot up again.',
    'Now on six books. Pull again.',
    'Write down, for each: how steep, how hard it felt, and how far the pot travelled.',
    'Answer this in the notebook: did any ramp let her do less total work, or just less at a time?'
  ],
  safety: 'Prop the plank against something solid so it cannot slide out. Nobody stands below it.',
  minutes: 14
};

const L16_LEDGER = {
  prompt: 'Which ramp was easiest, and what did it cost you? Write both halves.',
  ifSheIsStuck:
    'Easiest and longest were the same ramp. Ask her whether that seems like a fair swap, and why anybody would take it.'
};

// ============================================================= LESSON 17 · WEDGE
const L17_CHECK_IN = {
  title: 'Push down, split apart',
  text: 'Press the flat back of a butter knife into a lump of clay. Now press the sharp side in the same way.',
  question: 'You pushed the same. Why did only one of them go in?'
};

const L17_BEATS = [
  {
    n: 1,
    label: 'Two ramps back to back',
    hook: 'A wedge is an inclined plane she moves, instead of one she climbs.',
    teachingText:
      'A wedge is a thick end that narrows to a sharp edge. Push it in and it pushes sideways as it goes. That is how one push downward splits something in two directions.',
    example:
      'The blade of a spade going into soil. A doorstop. The front of a boat pushing water aside.',
    applyIt: {
      prompt: 'A wedge turns a push down into a push:',
      choices: ['Sideways, both ways', 'Straight down only', 'Upward', 'Backward'],
      answer: 0,
      feedback: [
        null,
        'Then nothing would split.',
        'Nothing rises when a spade goes in.',
        'It goes forward, not back.'
      ],
      why: 'The slope on each side turns her downward push outward.'
    }
  },
  {
    n: 2,
    label: 'Thin edges do more with the same push',
    hook: 'A sharp spade and a blunt one weigh the same and do not work the same.',
    teachingText:
      'The same push spread over a thin edge presses much harder on each small bit of what it is cutting. A thin edge cuts. A thick edge spreads the push out and only squashes.',
    example:
      'A sharpened spade slices into turf. The same spade left blunt bounces off it.',
    applyIt: {
      prompt: 'Why does a sharp edge cut better than a blunt one?',
      choices: ['It is heavier', 'It presses on a smaller strip', 'It is longer', 'It is colder'],
      answer: 1,
      feedback: [
        'Sharpening takes metal off. It gets lighter.',
        null,
        'Length is not the reason.',
        'Temperature is not the reason.'
      ],
      why: 'Same push, smaller strip, so much more push on every bit of it.'
    }
  }
];

const L17_ACTIVITY = {
  title: 'Clay, card and a butter knife',
  prep: 'Modelling clay or firm play dough. NO pruners and NO axe in this lesson, on purpose.',
  needs: ['a lump of clay', 'a butter knife', 'a plastic ruler', 'a wooden doorstop if there is one'],
  steps: [
    'Press the flat back of the knife into the clay. Note what happens.',
    'Press the sharp side in the same way, with the same push.',
    'Now press the flat edge of the ruler in. Is it more like the back or the blade?',
    'Push the doorstop under a door and look at its shape from the side.',
    'Draw the side view of the knife blade. It is a triangle. Mark the two slopes.',
    'Find three wedges in the house that are not knives.'
  ],
  safety:
    'A BUTTER knife only, and a grown-up hands it over and takes it back. No pruners, no axe, no kitchen knives, no scissors. Nothing sharp is ever pointed at a hand.',
  minutes: 12
};

const L17_LEDGER = {
  prompt: 'Draw a wedge from the side and mark its two slopes. Then name three wedges in your house.',
  ifSheIsStuck: 'Anything that is fat at one end and thin at the other. A door wedge, a nail, her own front teeth.'
};

// ============================================================= LESSON 18 · SCREW
const L18_CHECK_IN = {
  title: 'Wrap a ramp round a pencil',
  text: 'Cut a long thin triangle of paper. Wind it round a pencil, starting at the wide end.',
  question: 'Look at the edge that spirals up the pencil. Where have you seen that shape before?'
};

const L18_BEATS = [
  {
    n: 1,
    label: 'A slope wrapped round a post',
    hook: 'A screw is an inclined plane that has been rolled up, and the paper triangle proves it.',
    teachingText:
      'A screw is a ramp wrapped in a spiral around a rod. The ridge that winds round it is called the thread. Turning the screw makes it travel along that ramp.',
    example:
      'A jar lid, a bolt, the auger bit on a drill and the cap on a hose fitting are all screws.',
    applyIt: {
      prompt: 'The ridge that winds round a screw is called the:',
      choices: ['Groove', 'Fulcrum', 'Thread', 'Axle'],
      answer: 2,
      feedback: [
        'A groove is on a pulley wheel.',
        'A fulcrum belongs to a lever.',
        null,
        'An axle is a straight rod.'
      ],
      why: 'Thread. It is the wrapped-up ramp itself.'
    }
  },
  {
    n: 2,
    label: 'Many small turns instead of one big push',
    hook: 'Nobody can push a screw into wood. Everybody can turn one in.',
    teachingText:
      'A screw trades a long easy turning for a short hard push. Turning it many times moves it a small way in, and it grips hard enough to hold when she stops.',
    example:
      'A jar lid seals tight after four easy turns. Pressing the same lid straight down does nothing at all.',
    applyIt: {
      prompt: 'A screw with threads closer together is:',
      choices: ['Easier to turn and slower to go in', 'Harder to turn', 'Not a screw', 'Faster to go in'],
      answer: 0,
      feedback: [
        null,
        'Closer threads make a gentler ramp, so it is easier.',
        'It is still a screw.',
        'It goes in less far per turn, not more.'
      ],
      why: 'Closer threads mean a gentler ramp. Easier turns, more of them.'
    }
  }
];

const L18_ACTIVITY = {
  title: 'The paper screw, and six machines in one shed',
  prep: 'Paper, scissors for the grown-up, a pencil, and a jar with a lid.',
  needs: ['paper', 'a pencil', 'a marker pen', 'a jar with a screw lid', 'her notebook'],
  steps: [
    'A grown-up cuts a long thin triangle of paper, about as long as the pencil.',
    'Colour the long slanting edge with the marker so it shows up.',
    'Wind the triangle round the pencil, wide end first, and look at the coloured line.',
    'Compare it to the thread on the jar lid. Same shape?',
    'Count how many turns it takes to seal the jar.',
    'Now walk the shed and find all six machines. Write each one and what it is.'
  ],
  safety: 'The grown-up does all the cutting. Glass jars stay on the bench, away from the edge.',
  minutes: 14
};

const L18_LEDGER = {
  prompt: 'List all six simple machines and, next to each, one thing in your garden that is that machine.',
  ifSheIsStuck:
    'She has met all six this fortnight: trowel, barrow wheel, hanging basket, plank, spade, jar lid. One each, in order.'
};

export const SCIENCELAB_M3 = [
  {
    id: 'sl-m3-01',
    course: 'sciencelab',
    module: 3,
    quarter: 1,
    week: 5,
    day: 1,
    n: 13,
    title: 'The lever, and the trowel under the pot',
    minutes: 30,
    spec: '§10 · beats',
    concept: 'A lever is a stiff bar turning on a fulcrum, and moving the fulcrum changes how much effort a load needs.',
    standards: ['S4P3c'],
    offGrade: null,
    words: ['lever', 'fulcrum', 'load', 'effort'],
    glossary: [
      { word: 'lever', plain: 'A stiff bar that turns on one spot to move something.' },
      { word: 'fulcrum', plain: 'The spot a lever turns on.' },
      { word: 'load', plain: 'The heavy thing being moved.' },
      { word: 'effort', plain: 'The push or pull she puts in.' }
    ],
    video: {
      id: 'lueqE0lxLyc',
      url: 'https://www.youtube.com/watch?v=lueqE0lxLyc',
      title: 'Super Simple Machines: Levers',
      channel: 'SciShow Kids',
      minutes: 4,
      verified: '2026-08-16',
      teaches: ['lever', 'fulcrum', 'load', 'effort', 'simple machine'],
      sourceGap:
        'No Black American educator found for simple machines at elementary level. Searched "Black science teacher simple machines elementary lesson", "African American educator levers pulleys kids science channel", "Black STEM teacher inclined plane wedge screw for children", "Black homeschool science channel simple machines 4th grade". Results were Bozeman Science, Learn Bright, Science With Sophie, Bow Tie Guy and Wife, Miacademy — none identifiable. Open.'
    },
    checkIn: L13_CHECK_IN,
    beats: L13_BEATS,
    activity: L13_ACTIVITY,
    ledger: L13_LEDGER,
    hook: L13_CHECK_IN,
    core: L13_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L13_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'What are the three parts of a lever?', answer: 'The bar, the fulcrum, and the load — with her effort on it.', why: 'Every lever has all three.' },
      { ask: 'Where does the fulcrum go to make lifting easiest?', answer: 'Close to the load.', why: 'Near the load means a small effort moves a big load.' }
    ],
    check: [
      { prompt: 'The spot a lever turns on is the:', choices: ['Load', 'Fulcrum', 'Effort', 'Handle'], answer: 1, feedback: ['That is the heavy thing.', null, 'That is her push.', 'The handle is where she pushes.'] },
      { prompt: 'Moving the fulcrum closer to the pot makes lifting:', choices: ['Easier', 'Harder', 'Impossible', 'Exactly the same'], answer: 0, feedback: [null, 'That is the other way round.', 'It gets easier, not impossible.', 'Try both and feel it.'] },
      { prompt: 'Using a lever, she gets:', choices: ['Stronger arms', 'A lighter pot', 'A longer push in exchange for an easier one', 'Something for nothing'], answer: 2, feedback: ['Her arms are the same.', 'The pot never changed.', null, 'No machine gives that.'] }
    ]
  },
  {
    id: 'sl-m3-02',
    course: 'sciencelab',
    module: 3,
    quarter: 1,
    week: 5,
    day: 2,
    n: 14,
    title: 'The wheel and axle, and why the barrow wins',
    minutes: 30,
    spec: '§10 · beats',
    concept: 'A wheel fixed to an axle turns dragging into rolling, and rolling meets far less friction.',
    standards: ['S4P3c'],
    offGrade: null,
    words: ['wheel', 'axle', 'roll', 'turn'],
    glossary: [
      { word: 'wheel', plain: 'The round part that goes around.' },
      { word: 'axle', plain: 'The rod through the middle of the wheel.' },
      { word: 'roll', plain: 'To turn along the ground instead of sliding on it.' },
      { word: 'turn', plain: 'To go around a middle point.' }
    ],
    video: {
      id: 'ymvSy5vniCM',
      url: 'https://www.youtube.com/watch?v=ymvSy5vniCM',
      title: 'Simple Machines -  Wheel and Axle | Science for Kids',
      channel: 'Little School',
      minutes: 4,
      verified: '2026-08-16',
      teaches: ['wheel', 'axle', 'turn', 'roll', 'simple machine'],
      sourceGap:
        'No Black American educator found for the wheel and axle at elementary level. Same four searches as Lesson 13, all recorded there. Open.'
    },
    checkIn: L14_CHECK_IN,
    beats: L14_BEATS,
    activity: L14_ACTIVITY,
    ledger: L14_LEDGER,
    hook: L14_CHECK_IN,
    core: L14_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L14_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'What is an axle?', answer: 'The rod through the middle of a wheel.', why: 'Turn one and the other turns with it.' },
      { ask: 'Why is wheeling easier than dragging?', answer: 'Rolling meets far less friction.', why: 'A wheel touches the ground at one small spot at a time.' }
    ],
    check: [
      { prompt: 'The rod through the middle of a wheel is the:', choices: ['Fulcrum', 'Axle', 'Thread', 'Groove'], answer: 1, feedback: ['That belongs to a lever.', null, 'That belongs to a screw.', 'That belongs to a pulley.'] },
      { prompt: 'Wheeling a bag is easier than dragging it because of less:', choices: ['Weight', 'Gravity', 'Friction', 'Air'], answer: 2, feedback: ['It weighs the same.', 'Gravity pulls the same.', null, 'Air was not slowing it.'] },
      { prompt: 'Which of these is a wheel and axle?', choices: ['A doorknob', 'A doorstop', 'A jar lid', 'A ramp'], answer: 0, feedback: [null, 'That is a wedge.', 'That is a screw.', 'That is an inclined plane.'] }
    ]
  },
  {
    id: 'sl-m3-03',
    course: 'sciencelab',
    module: 3,
    quarter: 1,
    week: 5,
    day: 3,
    n: 15,
    title: 'The pulley, and pulling down to lift up',
    minutes: 30,
    spec: '§10 · beats',
    concept: 'A pulley is a grooved wheel with a rope in it, and one pulley changes the direction of a force rather than its size.',
    standards: ['S4P3c'],
    offGrade: null,
    words: ['pulley', 'rope', 'lift', 'groove'],
    glossary: [
      { word: 'pulley', plain: 'A wheel with a groove and a rope running in it.' },
      { word: 'rope', plain: 'What runs over the wheel and carries the pull.' },
      { word: 'lift', plain: 'To raise something up.' },
      { word: 'groove', plain: 'The dip around the wheel that keeps the rope on.' }
    ],
    video: {
      id: 'Nj4J7QNeBNk',
      url: 'https://www.youtube.com/watch?v=Nj4J7QNeBNk',
      title: 'Need a Lift? Try a Pulley!',
      channel: 'SciShow Kids',
      minutes: 4,
      verified: '2026-08-16',
      teaches: ['pulley', 'rope', 'lift', 'wheel', 'direction'],
      sourceGap:
        'No Black American educator confirmed for pulleys at elementary level. The search "African American educator levers pulleys kids science channel" surfaced "STEM with Mr N" — an individual creator whose identity was NOT established, recorded as unknown rather than as a gap closed, and its video is an activity rather than a lesson on what a pulley is. Open.'
    },
    checkIn: L15_CHECK_IN,
    beats: L15_BEATS,
    activity: L15_ACTIVITY,
    ledger: L15_LEDGER,
    hook: L15_CHECK_IN,
    core: L15_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L15_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'What does a single pulley change?', answer: 'Which way she has to pull.', why: 'It redirects the force. It does not shrink it.' },
      { ask: 'She pulls the rope down. Which way does the load go?', answer: 'Up.', why: 'The rope runs over the wheel, so the ends move opposite ways.' }
    ],
    check: [
      { prompt: 'A pulley is a wheel with a rope running in its:', choices: ['Groove', 'Axle', 'Thread', 'Fulcrum'], answer: 0, feedback: [null, 'That is the rod in a wheel and axle.', 'That is on a screw.', 'That belongs to a lever.'] },
      { prompt: 'One pulley makes the load:', choices: ['Lighter', 'Heavier', 'Exactly as heavy as before', 'Disappear'], answer: 2, feedback: ['A single pulley does not do that.', 'Nothing was added.', null, 'It is still on the rope.'] },
      { prompt: 'Pulling down is easier than lifting up because she can use:', choices: ['Stronger arms', 'Her whole body weight', 'Less rope', 'More gravity'], answer: 1, feedback: ['Her arms are the same arms.', null, 'Rope length is not the reason.', 'Gravity is the same everywhere in the garden.'] }
    ]
  },
  {
    id: 'sl-m3-04',
    course: 'sciencelab',
    module: 3,
    quarter: 1,
    week: 6,
    day: 1,
    n: 16,
    title: 'The inclined plane, and the plank to the raised bed',
    minutes: 30,
    spec: '§10 · beats',
    concept: 'A ramp makes lifting easier by making the journey longer — the clearest example of the trade every simple machine makes.',
    standards: ['S4P3c'],
    offGrade: null,
    words: ['ramp', 'slope', 'incline', 'distance'],
    glossary: [
      { word: 'ramp', plain: 'A flat surface with one end higher than the other.' },
      { word: 'slope', plain: 'How steeply something rises.' },
      { word: 'incline', plain: 'Another word for a slope.' },
      { word: 'distance', plain: 'How far something travels.' }
    ],
    video: {
      id: '3COvm0TtxWg',
      url: 'https://www.youtube.com/watch?v=3COvm0TtxWg',
      title: 'Ramps: A Super, Simple Machine!  - #sciencegoals',
      channel: 'SciShow Kids',
      minutes: 4,
      verified: '2026-08-16',
      teaches: ['ramp', 'incline', 'slope', 'simple machine', 'effort'],
      sourceGap:
        'No Black American educator found for inclined planes at elementary level. Same four searches as Lesson 13, all recorded there. Open.'
    },
    checkIn: L16_CHECK_IN,
    beats: L16_BEATS,
    activity: L16_ACTIVITY,
    ledger: L16_LEDGER,
    hook: L16_CHECK_IN,
    core: L16_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L16_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'What is an inclined plane?', answer: 'A flat slope — a ramp.', why: 'One end higher than the other, and no moving parts.' },
      { ask: 'What does a gentle ramp cost her?', answer: 'A longer journey.', why: 'Easier at every moment, and further overall.' }
    ],
    check: [
      { prompt: 'An inclined plane is:', choices: ['A wheel on a rod', 'A rope over a wheel', 'A flat slope', 'A sharp edge'], answer: 2, feedback: ['That is a wheel and axle.', 'That is a pulley.', null, 'That is a wedge.'] },
      { prompt: 'A longer, gentler ramp to the same height is:', choices: ['Harder to push up', 'Easier to push up', 'Exactly the same', 'Not a ramp'], answer: 1, feedback: ['Gentler means less effort.', null, 'Try a steep one and a gentle one.', 'It is still a ramp.'] },
      { prompt: 'The ramp made lifting easier by making the journey:', choices: ['Shorter', 'Steeper', 'Longer', 'Heavier'], answer: 2, feedback: ['It got longer, not shorter.', 'Steeper is harder.', null, 'The pot weighs the same.'] }
    ]
  },
  {
    id: 'sl-m3-05',
    course: 'sciencelab',
    module: 3,
    quarter: 1,
    week: 6,
    day: 2,
    n: 17,
    title: 'The wedge, and the spade going into the soil',
    minutes: 30,
    spec: '§10 · beats',
    concept: 'A wedge is a moving ramp that turns one push downward into a push out to both sides, and a thinner edge does more with the same push.',
    standards: ['S4P3c'],
    offGrade: null,
    words: ['wedge', 'split', 'edge', 'sharp'],
    glossary: [
      { word: 'wedge', plain: 'A thick end that narrows to a sharp edge.' },
      { word: 'split', plain: 'To push apart into two.' },
      { word: 'edge', plain: 'The thin line where a wedge meets what it is cutting.' },
      { word: 'sharp', plain: 'Coming to a very thin edge.' }
    ],
    video: {
      id: 'No5Df2231YA',
      url: 'https://www.youtube.com/watch?v=No5Df2231YA',
      title: 'Simple Machines: The Wedge',
      channel: 'funsciencedemos',
      minutes: 5,
      verified: '2026-08-16',
      teaches: ['wedge', 'split', 'edge', 'sharp', 'force'],
      sourceGap:
        'No Black American educator found for the wedge at elementary level. Same four searches as Lesson 13, all recorded there. Open.'
    },
    checkIn: L17_CHECK_IN,
    beats: L17_BEATS,
    activity: L17_ACTIVITY,
    ledger: L17_LEDGER,
    hook: L17_CHECK_IN,
    core: L17_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L17_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'What does a wedge do to a push?', answer: 'Turns one push down into a push out to both sides.', why: 'Its two slopes send the force sideways.' },
      { ask: 'Why does a sharp edge work better?', answer: 'The same push lands on a much smaller strip.', why: 'More push on every bit of what it is cutting.' }
    ],
    check: [
      { prompt: 'A wedge turns a push down into a push:', choices: ['Sideways, both ways', 'Straight down only', 'Upward', 'Backward'], answer: 0, feedback: [null, 'Then nothing would split.', 'Nothing rises when a spade goes in.', 'It goes forward, not back.'] },
      { prompt: 'A wedge is really two of which machine, back to back?', choices: ['Pulleys', 'Levers', 'Inclined planes', 'Axles'], answer: 2, feedback: ['No rope and no wheel.', 'Nothing turns on a spot.', null, 'Nothing spins.'] },
      { prompt: 'A sharp edge cuts better than a blunt one because it:', choices: ['Is heavier', 'Is longer', 'Is colder', 'Presses on a smaller strip'], answer: 3, feedback: ['Sharpening takes metal off.', 'Length is not the reason.', 'Temperature is not the reason.', null] }
    ]
  },
  {
    id: 'sl-m3-06',
    course: 'sciencelab',
    module: 3,
    quarter: 1,
    week: 6,
    day: 3,
    n: 18,
    title: 'The screw, and the ramp wrapped round a rod',
    minutes: 30,
    spec: '§10 · beats',
    concept: 'A screw is an inclined plane wound in a spiral, trading many easy turns for a push nobody could make.',
    standards: ['S4P3c'],
    offGrade: null,
    words: ['screw', 'thread', 'spiral', 'grip'],
    glossary: [
      { word: 'screw', plain: 'A ramp wound round a rod in a spiral.' },
      { word: 'thread', plain: 'The ridge that winds round a screw.' },
      { word: 'spiral', plain: 'A line that winds round and round, going along as it goes.' },
      { word: 'grip', plain: 'To hold on tightly and not slip.' }
    ],
    video: {
      id: 'uIUfdcyrNzg',
      url: 'https://www.youtube.com/watch?v=uIUfdcyrNzg',
      title: 'Simple Machines -  Screws | Science for Kids',
      channel: 'Little School',
      minutes: 4,
      verified: '2026-08-16',
      teaches: ['screw', 'thread', 'spiral', 'turn', 'hold'],
      sourceGap:
        'No Black American educator found for the screw at elementary level. Searched "simple machines screw for kids science lesson", "the screw simple machine funsciencedemos", "SciShow Kids screw simple machine" plus the four in Lesson 13. Results were Little School, Science With Sophie, Next Generation Science, SciShow Kids — none identifiable. Open.'
    },
    checkIn: L18_CHECK_IN,
    beats: L18_BEATS,
    activity: L18_ACTIVITY,
    ledger: L18_LEDGER,
    hook: L18_CHECK_IN,
    core: L18_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L18_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'What is a screw, really?', answer: 'A ramp wrapped round a rod in a spiral.', why: 'The paper triangle on the pencil shows it exactly.' },
      { ask: 'What is the ridge round a screw called?', answer: 'The thread.', why: 'It is the wrapped-up ramp itself.' }
    ],
    check: [
      { prompt: 'The ridge that winds round a screw is the:', choices: ['Groove', 'Fulcrum', 'Thread', 'Axle'], answer: 2, feedback: ['That is on a pulley.', 'That belongs to a lever.', null, 'That is a straight rod.'] },
      { prompt: 'A screw is really which machine, wrapped up?', choices: ['A lever', 'An inclined plane', 'A pulley', 'A wheel and axle'], answer: 1, feedback: ['Nothing turns on a fulcrum.', null, 'There is no rope.', 'Nothing rolls along.'] },
      { prompt: 'A screw trades a short hard push for:', choices: ['Nothing at all', 'A shorter push', 'Many easy turns', 'A heavier load'], answer: 2, feedback: ['Every machine trades something.', 'It is longer, not shorter.', null, 'The load is unchanged.'] }
    ]
  }
];

export const SCIENCELAB_M3_META = {
  courseId: 'sciencelab',
  module: 3,
  title: 'Six Simple Machines in the Garden Shed',
  blurb:
    'Georgia names six, and every one of them is already in her shed. The trowel, the barrow wheel, the hanging basket, the plank, the spade and the jar lid — and what each one trades away to make her job easier.'
};

export function m3LessonById(id) {
  return SCIENCELAB_M3.find((l) => l.id === id) || null;
}

export default SCIENCELAB_M3;
