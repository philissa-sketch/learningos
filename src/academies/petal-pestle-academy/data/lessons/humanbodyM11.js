// ---------------------------------------------------------------------------
// THE HUMAN BODY · MODULE 11 — THE KIDNEYS AND WATER
//
// Four lessons. Quarter 3, weeks 5 and 6. Tuesday and Thursday, 30 minutes.
//
// Module 6 gave her blood as a delivery service. This module asks the question
// that follows: if blood carries everything everywhere, what takes the rubbish
// back out? Two filters the size of her fist, working every minute of her life.
//
// ---- THE DOCTOR'S ACTION: BUILD A FILTER AND MEASURE WHAT COMES THROUGH ----
//
// She builds a water filter out of a bottle, a cloth, sand and gravel, pours a
// measured amount of muddy water in, and measures what comes out. VOLUME IN
// MILLILITRES, and a subtraction to find what stayed behind. Measurement scored
// 2.00 and units 0 of 3, both at the test floor. This is the third module in a
// row that puts a measuring jug in her hands, and that repetition is deliberate.
//
// ---- READING CAP ----
//
// Quarter 3: 14 words a sentence, floor 6.5. §10.1.
//
// ---- SAFETY, AND THIS MODULE NEEDS THE TIGHTEST FENCE OF THE FOUR ----
//
// Kidneys and water is the exact topic where "drink eight glasses a day" and
// "check the colour of your pee" live. BOTH ARE BANNED HERE. The second is
// worse than the first: it teaches her to inspect her own body for signs of
// illness, which is the thing this course must never do (Gigi, and it is a
// standing rule for The Human Body). So:
//
//   · No amount anybody should drink. Not a number, not a range, not a hint.
//   · No self-inspection of any kind, and nothing about urine colour.
//   · Nothing about kidney disease, dialysis, or what goes wrong.
//   · Nothing about sweat and smell, appearance, or how much anybody sweats.
//   · The filter activity uses garden soil and clean tap water, and NOTHING
//     that comes out of it is drunk or tasted. Ever. It goes down the sink.
// ---------------------------------------------------------------------------

// =========================================================== LESSON 1
const L1_CHECK_IN = {
  title: 'Put your hands on your back',
  text: 'Make two fists and press them against your lower back, one either side of your spine.',
  question: 'Something roughly that size and shape is in there. What do you think it does?'
};

const L1_BEATS = [
  {
    n: 1,
    label: 'You have two, and each is about the size of your fist',
    hook: 'They sit higher up your back than almost everybody guesses.',
    teachingText:
      'Your two kidneys sit either side of your spine, above your waist. Each one is about the size of your own fist and shaped like a bean. You were born with two, and one can do the work if it has to.',
    example:
      'Make a fist and look at it. That is roughly the size and shape of one of them.',
    applyIt: {
      prompt: 'How many kidneys does a person normally have?',
      choices: ['One', 'Two', 'Four', 'None'],
      answer: 1,
      feedback: [
        'One can do the job, but two is normal.',
        null,
        'That is more than anybody has.',
        'Everybody has them.'
      ]
    }
  },
  {
    n: 2,
    label: 'Their job is cleaning the blood',
    hook: 'All of your blood passes through them, over and over, all day.',
    teachingText:
      'Blood arrives at the kidneys carrying waste it has picked up all round the body. The kidneys take that waste out and let the clean blood carry on. The waste leaves in water.',
    example:
      'Your whole blood supply goes through them many times a day. They never stop while you are alive.',
    applyIt: {
      prompt: 'The main job of the kidneys is:',
      choices: ['Pumping blood', 'Cleaning blood', 'Making blood', 'Storing food'],
      answer: 1,
      feedback: [
        'The heart does the pumping.',
        null,
        'Bones make blood.',
        'The gut deals with food.'
      ]
    }
  }
];

const L1_ACTIVITY = {
  title: 'Fist-sized, and where they sit',
  prep: 'Paper, a pencil, and a ruler with centimetres.',
  needs: ['paper', 'a pencil', 'a ruler', 'her notebook'],
  steps: [
    'Put your closed fist on the paper and draw round it.',
    'Measure the drawing across at its widest and write that in centimetres.',
    'Measure it top to bottom and write that number down too.',
    'Draw a simple back view of a person and mark where the two kidneys sit.',
    'Write one sentence saying what surprised you about where they are.'
  ],
  safety:
    'A drawing of a hand and a general back view. Nothing measured on her body, and nothing about how anybody looks.',
  minutes: 12
};

const L1_LEDGER = {
  prompt: 'Write down how many kidneys you have, roughly how big one is, and what they do.',
  ifSheIsStuck:
    'Two, fist-sized, and they clean the blood. If she can say those three things without the notebook, the writing is just the record.'
};

// =========================================================== LESSON 2
const L2_CHECK_IN = {
  title: 'Muddy water',
  text: 'Imagine a jug of water with soil stirred into it.',
  question: 'How could you get the water back without the soil in it?'
};

const L2_BEATS = [
  {
    n: 1,
    label: 'A filter lets some things through and holds others back',
    hook: 'A filter does not choose. Its holes do the choosing.',
    teachingText:
      'A filter is anything with holes small enough to stop some things and let others past. Water slips through easily. Larger bits get caught and stay behind.',
    example:
      'A tea strainer keeps the leaves and lets the tea through. The holes decide, not the strainer.',
    applyIt: {
      prompt: 'What decides what gets through a filter?',
      choices: ['Its colour', 'The size of its holes', 'How heavy it is', 'How old it is'],
      answer: 1,
      feedback: [
        'Colour makes no difference.',
        null,
        'Weight makes no difference.',
        'Age makes no difference.'
      ]
    }
  },
  {
    n: 2,
    label: 'Kidneys filter, then take back what is worth keeping',
    hook: 'A kidney is a fussier filter than a tea strainer.',
    teachingText:
      'A kidney first lets a great deal of water and small bits out of the blood. Then it takes most of the water back, along with anything useful. Only the leftovers go on.',
    example:
      'It is like tipping out a whole drawer to find one broken thing, then putting everything good back in.',
    applyIt: {
      prompt: 'After filtering, the kidney:',
      choices: ['Throws everything away', 'Takes most of the water back', 'Stops working', 'Sends it to the stomach'],
      answer: 1,
      feedback: [
        'That would waste far too much.',
        null,
        'It carries on all day.',
        'The gut is a different system.'
      ]
    }
  }
];

const L2_ACTIVITY = {
  title: 'Build a filter and measure both ways',
  prep: 'A plastic bottle cut in half, a cloth, clean sand, gravel, garden soil, a measuring jug, and a grown-up.',
  needs: ['a cut plastic bottle', 'a cloth', 'sand', 'gravel', 'soil', 'a measuring jug', 'her notebook'],
  steps: [
    'Turn the top half of the bottle upside down and line it with the cloth.',
    'Add a layer of sand, then a layer of gravel on top.',
    'Measure 300 millilitres of water, stir in a spoon of soil, and write the amount down.',
    'Pour it slowly through the filter and wait until it stops dripping.',
    'Measure what came through, write it down, and work out how much stayed behind.'
  ],
  safety:
    'A grown-up cuts the bottle. NOTHING here is drunk or tasted, not before and not after — this water is for measuring only and it goes down the sink. Hands washed at the end.',
  minutes: 16
};

const L2_LEDGER = {
  prompt: 'Write down how much water you poured in, how much came out, and the difference.',
  ifSheIsStuck:
    'Subtraction, and the units go on both numbers. If 300 ml went in and 240 ml came out, 60 ml stayed in the filter. Let her say where she thinks it went.'
};

// =========================================================== LESSON 3
const L3_CHECK_IN = {
  title: 'Water in, water out',
  text: 'You take water in all day, in drinks and in food.',
  question: 'If water keeps going in, where does it all go?'
};

const L3_BEATS = [
  {
    n: 1,
    label: 'The waste and the spare water leave together',
    hook: 'Waste needs a lift out, and water is the lift.',
    teachingText:
      'The waste the kidneys pull out of your blood will not travel on its own. It dissolves in water and leaves that way. That is what urine is — water carrying waste.',
    example:
      'Stir salt into water and the salt disappears into it. Dissolved things travel wherever the water goes.',
    applyIt: {
      prompt: 'Waste leaves the kidneys:',
      choices: ['As a dry powder', 'Dissolved in water', 'Through the skin only', 'It does not leave'],
      answer: 1,
      feedback: [
        'Dry waste could not travel.',
        null,
        'Skin loses some water, but not this.',
        'It leaves every day.'
      ]
    }
  },
  {
    n: 2,
    label: 'There is a bag that waits, so you do not have to',
    hook: 'Your kidneys never stop, but you are not always near a bathroom.',
    teachingText:
      'Two thin tubes carry the liquid down to a stretchy bag called the bladder. It fills slowly and stretches as it fills. Nerves tell your brain when it is getting full.',
    example:
      'A balloon filling with water gets bigger and its walls get thinner. The bladder does the same and then empties.',
    applyIt: {
      prompt: 'The bladder is best described as:',
      choices: ['A hard box', 'A stretchy bag that waits', 'A filter', 'A muscle that pumps blood'],
      answer: 1,
      feedback: [
        'It stretches, so it is not hard.',
        null,
        'The kidneys do the filtering.',
        'The heart pumps blood.'
      ]
    }
  }
];

const L3_ACTIVITY = {
  title: 'A stretchy bag, measured',
  prep: 'A balloon, a measuring jug, water, and a sink or tray.',
  needs: ['a balloon', 'a measuring jug', 'water', 'a tape measure', 'her notebook'],
  steps: [
    'Pour 100 millilitres of water into the balloon and hold the neck shut.',
    'Measure round the balloon at its widest and write that number down.',
    'Add another 100 millilitres and measure round it again.',
    'Do that once more, so you have three volumes and three measurements.',
    'Write one sentence about what happened to the size each time you added water.'
  ],
  safety:
    'Over a sink or tray, with a grown-up nearby. A balloon is never put in the mouth or over the face, and it is emptied and put away at the end.',
  minutes: 15
};

const L3_LEDGER = {
  prompt: 'Write down your three volumes and the measurement that went with each one.',
  ifSheIsStuck:
    'Three pairs of numbers, each with its unit — millilitres for the water, centimetres for the tape. The pattern between them is the finding.'
};

// =========================================================== LESSON 4
const L4_CHECK_IN = {
  title: 'Damp, after running',
  text: 'Run about for a minute and your skin goes damp.',
  question: 'Where do you think that water comes from, and why would your body let it out?'
};

const L4_BEATS = [
  {
    n: 1,
    label: 'Sweat is water your skin lets out on purpose',
    hook: 'You lose water two ways, and only one of them is the kidneys.',
    teachingText:
      'Tiny holes in your skin let water out when you get warm. The water sits on the surface and then dries off into the air. That is not an accident. It is a switch your body throws.',
    example:
      'Wet the back of your hand and blow on it. It feels colder than the dry hand beside it.',
    applyIt: {
      prompt: 'Sweat comes out through:',
      choices: ['Your mouth', 'Tiny holes in your skin', 'Your kidneys', 'Your bones'],
      answer: 1,
      feedback: [
        'Breath carries some water, not sweat.',
        null,
        'Those send water a different way.',
        'Bones do not do this.'
      ]
    }
  },
  {
    n: 2,
    label: 'Drying off is what does the cooling',
    hook: 'Sweat sitting still on you does nothing at all.',
    teachingText:
      'Water needs warmth to turn into air, and it takes that warmth from your skin. So you cool down while the sweat dries, not while it is wet.',
    example:
      'Stepping out of a bath in a draught feels cold. Wrapping up in a towel stops it, because you stopped the drying.',
    applyIt: {
      prompt: 'You cool down when the sweat:',
      choices: ['First appears', 'Dries off into the air', 'Is wiped away at once', 'Runs downwards'],
      answer: 1,
      feedback: [
        'Sitting wet does nothing.',
        null,
        'Wiping it off stops the cooling.',
        'Direction makes no difference.'
      ]
    }
  }
];

const L4_ACTIVITY = {
  title: 'Which hand dries first?',
  prep: 'Water, a clock or timer, and something to fan with.',
  needs: ['water', 'a timer', 'a piece of card to fan with', 'her notebook'],
  steps: [
    'Wet the back of both hands with the same amount of water.',
    'Fan one hand with the card and leave the other one still.',
    'Time how long the fanned hand takes to feel dry, and write it down.',
    'Time the still hand the same way and write that down.',
    'Work out the difference between the two times, and write one sentence about it.'
  ],
  safety:
    'Cool tap water on hands only. This is about how fast water dries, and nothing at all about how much anybody sweats.',
  minutes: 13
};

const L4_LEDGER = {
  prompt: 'Write down your two drying times and the difference between them.',
  ifSheIsStuck:
    'This is elapsed time again, and she has done it twice now. Two readings, and the gap between them, with the unit written on all three.'
};

// ---------------------------------------------------------------------------

export const HUMANBODY_M11 = [
  {
    id: 'body-m11-01',
    course: 'humanbody',
    module: 11,
    quarter: 3,
    week: 5,
    day: 1,
    n: 1,
    title: 'Two filters, fist-sized',
    minutes: 30,
    spec: '§10 · beats',
    concept: 'Two bean-shaped kidneys the size of your fists sit either side of your spine, and their job is cleaning the blood.',
    standards: [],
    offGrade: 'Measuring a drawn outline in centimetres. Her Check-In scored 2.00 on measurement, at the test floor.',
    words: ['kidney', 'waste', 'spine'],
    glossary: [
      { word: 'kidney', plain: 'One of two bean-shaped organs that clean your blood.' },
      { word: 'waste', plain: 'What is left over when your body has finished using something.' },
      { word: 'spine', plain: 'The line of small bones running down the middle of your back.' }
    ],
    video: {
      id: 'Bn8czDqPUvY',
      url: 'https://www.youtube.com/watch?v=Bn8czDqPUvY',
      title: 'Operation Ouch - What are Kidneys? | Biology for Kids',
      channel: 'Operation Ouch',
      minutes: 5,
      verified: '2026-08-18 · youtube.com/oembed · 4:55 read from the playlist duration badge',
      teaches: ['where the kidneys sit and how big they are', 'that there are two of them', 'that their job is cleaning blood'],
      sourceGap:
        'OPEN. Searched: "kidneys for kids youtube SciShow Kids OR Operation Ouch OR Smile and Learn filtering blood" — returned Operation Ouch, learning junction, Peekaboo Kidz and Visible Body, no Black-educator-led channel. REJECTED at oEmbed: Pd7NYJKYT7Q ("What Do Your Kidneys Do?", Operation Ouch) returned an EMPTY BODY, which is what an unavailable id does. Recorded unknown, not closed. The two standing searches for this course are written down in full on body-m1-01.'
    },
    checkIn: L1_CHECK_IN,
    beats: L1_BEATS,
    activity: L1_ACTIVITY,
    ledger: L1_LEDGER,
    hook: L1_CHECK_IN,
    core: L1_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L1_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'How many kidneys, and how big?', answer: 'Two, each about the size of your fist.', why: 'Either side of the spine.' },
      { ask: 'What do they do?', answer: 'Clean the blood.', why: 'Taking out waste it has collected.' }
    ],
    check: [
      {
        prompt: 'How many kidneys does a person normally have?',
        choices: ['One', 'Four', 'Two', 'None'],
        answer: 2,
        feedback: ['One can cope, but two is normal.', 'More than anybody has.', null, 'Everybody has them.']
      },
      {
        prompt: 'The main job of the kidneys is:',
        choices: ['Cleaning blood', 'Pumping blood', 'Making blood', 'Storing food'],
        answer: 0,
        feedback: [null, 'The heart pumps.', 'Bones make blood.', 'The gut handles food.']
      },
      {
        prompt: 'One kidney is roughly the size of:',
        choices: ['Your head', 'Your fist', 'A pea', 'A shoe'],
        answer: 1,
        feedback: ['Far too big.', null, 'Far too small.', 'Too big.']
      }
    ]
  },
  {
    id: 'body-m11-02',
    course: 'humanbody',
    module: 11,
    quarter: 3,
    week: 5,
    day: 2,
    n: 2,
    title: 'What a filter actually does',
    minutes: 30,
    spec: '§10 · beats',
    concept: 'A filter lets some things past and holds others back according to hole size, and a kidney filters then takes back what is worth keeping.',
    standards: [],
    offGrade: 'Volume in millilitres, and subtraction to find what stayed behind. Measurement 2.00 and units 0 of 3, both at the test floor.',
    words: ['filter', 'dissolve', 'millilitre'],
    glossary: [
      { word: 'filter', plain: 'Something with holes that stops big bits and lets small ones through.' },
      { word: 'dissolve', plain: 'To disappear into a liquid and travel with it.' },
      { word: 'millilitre', plain: 'A small amount of liquid. A thousand of them fill a litre bottle.' }
    ],
    video: {
      id: 'rT_vjf5fMw4',
      url: 'https://www.youtube.com/watch?v=rT_vjf5fMw4',
      title: 'Kidney Functions in human body - video for kids',
      channel: 'learning junction',
      minutes: 5,
      verified: '2026-08-18 · youtube.com/oembed · 5:12 read from the playlist duration badge',
      teaches: ['how a kidney filters blood', 'that useful things are taken back', 'what is left over and why'],
      sourceGap: 'OPEN. Same searches as body-m11-01 and body-m1-01, both written down there.'
    },
    checkIn: L2_CHECK_IN,
    beats: L2_BEATS,
    activity: L2_ACTIVITY,
    ledger: L2_LEDGER,
    hook: L2_CHECK_IN,
    core: L2_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L2_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'What decides what gets through a filter?', answer: 'The size of its holes.', why: 'The holes choose, not the filter.' },
      { ask: 'What does a kidney do after filtering?', answer: 'Takes most of the water back.', why: 'Along with anything useful.' }
    ],
    check: [
      {
        prompt: 'What decides what gets through a filter?',
        choices: ['Its colour', 'How heavy it is', 'How old it is', 'The size of its holes'],
        answer: 3,
        feedback: ['Colour makes no difference.', 'Weight makes none.', 'Age makes none.', null]
      },
      {
        prompt: 'After filtering, the kidney:',
        choices: ['Takes most of the water back', 'Throws everything away', 'Stops working', 'Sends it to the stomach'],
        answer: 0,
        feedback: [null, 'That would waste far too much.', 'It works all day.', 'The gut is separate.']
      },
      {
        prompt: 'You pour in 300 ml and 240 ml comes out. What stayed behind?',
        choices: ['540 ml', '60 ml', '40 ml', '260 ml'],
        answer: 1,
        feedback: ['That is adding them.', null, 'Check the subtraction.', 'Check the subtraction.']
      }
    ]
  },
  {
    id: 'body-m11-03',
    course: 'humanbody',
    module: 11,
    quarter: 3,
    week: 6,
    day: 1,
    n: 3,
    title: 'Water carries the waste out',
    minutes: 30,
    spec: '§10 · beats',
    concept: 'Waste dissolves in water and leaves that way, and a stretchy bladder holds the liquid until you are ready.',
    standards: [],
    offGrade: 'Volume in millilitres paired with a length in centimetres — two units read off two instruments in one activity.',
    words: ['bladder', 'dissolved', 'stretch'],
    glossary: [
      { word: 'bladder', plain: 'A stretchy bag inside you that holds liquid until you empty it.' },
      { word: 'dissolved', plain: 'Mixed into a liquid so completely you cannot see it any more.' },
      { word: 'stretch', plain: 'To get bigger without tearing.' }
    ],
    video: {
      id: 'dZREDWD_5bA',
      url: 'https://www.youtube.com/watch?v=dZREDWD_5bA',
      title: 'How Your Urinary System Works? - The Dr. Binocs Show | Best Learning Videos For Kids | Peekaboo Kidz',
      channel: 'Peekaboo Kidz',
      minutes: 4,
      verified: '2026-08-18 · youtube.com/oembed · 4:22 read from the playlist duration badge',
      teaches: ['the route from kidney to bladder', 'what the bladder does', 'why waste travels in water'],
      sourceGap: 'OPEN. Same searches as body-m11-01 and body-m1-01, both written down there.'
    },
    checkIn: L3_CHECK_IN,
    beats: L3_BEATS,
    activity: L3_ACTIVITY,
    ledger: L3_LEDGER,
    hook: L3_CHECK_IN,
    core: L3_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L3_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'How does waste travel out?', answer: 'Dissolved in water.', why: 'Dry waste could not move.' },
      { ask: 'What is the bladder?', answer: 'A stretchy bag that holds the liquid.', why: 'It fills and stretches, then empties.' }
    ],
    check: [
      {
        prompt: 'Waste leaves the kidneys:',
        choices: ['As a dry powder', 'Dissolved in water', 'Through the skin only', 'It does not leave'],
        answer: 1,
        feedback: ['Dry waste could not travel.', null, 'Skin loses water, not this.', 'It leaves every day.']
      },
      {
        prompt: 'The bladder is best described as:',
        choices: ['A filter', 'A hard box', 'A stretchy bag that waits', 'A pump'],
        answer: 2,
        feedback: ['The kidneys filter.', 'It stretches.', null, 'The heart pumps.']
      },
      {
        prompt: 'Adding 100 ml three times gives a total of:',
        choices: ['300 ml', '100 ml', '3 ml', '1300 ml'],
        answer: 0,
        feedback: [null, 'That is one pour.', 'Wrong unit size.', 'Check the addition.']
      }
    ]
  },
  {
    id: 'body-m11-04',
    course: 'humanbody',
    module: 11,
    quarter: 3,
    week: 6,
    day: 2,
    n: 4,
    title: 'The other way water leaves',
    minutes: 30,
    spec: '§10 · beats',
    concept: 'Skin lets water out on purpose through tiny holes, and the cooling happens while that water dries into the air.',
    standards: [],
    offGrade: 'Elapsed time, timed twice and subtracted. Her Check-In scored 0 of 1 on elapsed time.',
    words: ['sweat', 'evaporate', 'cool'],
    glossary: [
      { word: 'sweat', plain: 'Water your skin lets out when you get warm.' },
      { word: 'evaporate', plain: 'To dry off and turn into part of the air.' },
      { word: 'cool', plain: 'To get less warm.' }
    ],
    video: {
      id: 'c2_aN98p0RM',
      url: 'https://www.youtube.com/watch?v=c2_aN98p0RM',
      title: 'Why Do We Sweat? | Sports Science | SciShow Kids',
      channel: 'SciShow Kids',
      minutes: 4,
      verified: '2026-08-18 · youtube.com/oembed · 4:04 read from the playlist duration badge',
      teaches: ['where sweat comes from', 'that drying is what cools you', 'that other animals do it differently'],
      sourceGap: 'OPEN. Searched: "sweating and body temperature for kids youtube Dr. Binocs OR SciShow Kids why do we sweat" — returned Peekaboo Kidz, SciShow Kids and aumsum, no Black-educator-led channel. Recorded unknown, not closed.'
    },
    checkIn: L4_CHECK_IN,
    beats: L4_BEATS,
    activity: L4_ACTIVITY,
    ledger: L4_LEDGER,
    hook: L4_CHECK_IN,
    core: L4_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L4_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'Where does sweat come out?', answer: 'Through tiny holes in the skin.', why: 'A switch the body throws on purpose.' },
      { ask: 'When does the cooling happen?', answer: 'While the sweat dries off.', why: 'Drying takes warmth from the skin.' }
    ],
    check: [
      {
        prompt: 'Sweat comes out through:',
        choices: ['Your mouth', 'Your kidneys', 'Tiny holes in your skin', 'Your bones'],
        answer: 2,
        feedback: ['Breath carries water, not sweat.', 'A different route entirely.', null, 'Bones do not do this.']
      },
      {
        prompt: 'You cool down when the sweat:',
        choices: ['Dries off into the air', 'First appears', 'Is wiped away at once', 'Runs downwards'],
        answer: 0,
        feedback: [null, 'Sitting wet does nothing.', 'Wiping stops the cooling.', 'Direction is not it.']
      },
      {
        prompt: 'One hand dries in 90 seconds and the other in 150. The difference is:',
        choices: ['240 seconds', '60 seconds', '40 seconds', '90 seconds'],
        answer: 1,
        feedback: ['That is adding them.', null, 'Check the subtraction.', 'That is one of the times.']
      }
    ]
  }
];

export const HUMANBODY_M11_META = {
  courseId: 'humanbody',
  module: 11,
  title: 'The Kidneys and Water',
  blurb:
    'Two fist-sized filters working every minute, a real filter built from a bottle and measured both ways, and the discovery that a wet hand only cools you once it starts to dry.'
};

export function humanbodyM11LessonById(id) {
  return HUMANBODY_M11.find((l) => l.id === id) || null;
}

export default HUMANBODY_M11;
