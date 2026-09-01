// ---------------------------------------------------------------------------
// THE HUMAN BODY · MODULE 7 — THE LUNGS
//
// Four lessons. Quarter 2, weeks 5 and 6. Tuesday and Thursday, 30 minutes.
//
// Module 5 was the pump and Module 6 was what it moves. This is where the
// oxygen comes from in the first place — the short trip's destination, met
// properly.
//
// The doctor's action, and it is TWO measurements:
//
//   · BREATHS A MINUTE, counted the same way she learned to count a pulse.
//   · LUNG VOLUME with a marked bottle — a real measurement, in millilitres,
//     which is a unit she has not met yet and which belongs to the strand that
//     scored 0 of 3 on units.
//
// Both live in the ACTIVITY. Quarter 2 cap: 12 words a sentence.
//
// ---- THE ONE IDEA THE MODULE HANGS ON ----
//
// LUNGS DO NOT PULL AIR IN. They have no muscle of their own. The diaphragm
// underneath them pulls DOWN, the chest gets bigger, and air falls in to fill
// the space. Breathing is something done TO the lungs, not BY them — which is
// genuinely surprising, and it is why the bottle model works.
//
// ---- SAFETY ----
//
// Nothing about holding breath for time, no competition, no comparing volumes
// between people, and NOTHING about anybody's breathing being right or wrong.
// If she feels dizzy she stops. A breathing rate is counted here because
// doctors count it — never so she can judge one.
// ---------------------------------------------------------------------------

// =========================================================== LESSON 1
const L1_CHECK_IN = {
  title: 'Put a hand on your ribs',
  text: 'Rest one hand flat on your ribs. Breathe in slowly, then out.',
  question: 'Your hand moved. What do you think moved it?'
};

const L1_BEATS = [
  {
    n: 1,
    label: 'You have two lungs, and they are not the same size',
    hook: 'Your left lung is smaller than your right one, on purpose.',
    teachingText:
      'You have two lungs, one each side of your chest. The left one is smaller. It gives up some room so your heart can lean into that side.',
    example:
      'Ribs curve round both of them. That is the cage you met in Module 3.',
    applyIt: {
      prompt: 'Why is your left lung smaller?',
      choices: [
        'It works less',
        'It makes room for your heart',
        'It is younger',
        'It holds cleaner air'
      ],
      answer: 1,
      feedback: [
        'Both lungs work hard.',
        null,
        'They are the same age as you.',
        'The air is the same.'
      ]
    }
  },
  {
    n: 2,
    label: 'Air goes down a tree, not a tube',
    hook: 'Inside your chest is a tree, upside down, made of air pipes.',
    teachingText:
      'Air goes down your windpipe. That splits into two, one for each lung. Those split again, and again, into thousands of smaller pipes.',
    example:
      'It branches exactly like a tree, with the trunk at your throat and the twigs deep inside.',
    applyIt: {
      prompt: 'The air pipes inside your lungs are shaped like:',
      choices: ['One straight tube', 'A tree, branching', 'A circle', 'A flat sheet'],
      answer: 1,
      feedback: [
        'It splits many times.',
        null,
        'It does not loop.',
        'It is not flat.'
      ]
    }
  }
];

const L1_ACTIVITY = {
  title: 'Draw the tree, and feel both sides',
  prep: 'Nothing to prepare. Paper and pencils.',
  needs: ['paper', 'a pencil', 'her notebook'],
  steps: [
    'Put one hand on each side of your ribs. Breathe in deeply.',
    'Write down whether both sides moved the same amount.',
    'Draw your windpipe splitting into two, then four, then eight.',
    'Colour the left lung slightly smaller than the right one.',
    'Write one sentence about why they are different sizes.'
  ],
  safety: 'Normal breathing only. No holding your breath, and no deep-breathing races.',
  minutes: 12
};

const L1_LEDGER = {
  prompt: 'Write why your two lungs are different sizes, in your own words.',
  ifSheIsStuck:
    'Ask her what else lives in her chest and which way it leans. She met that in Module 5, and the answer is already hers.'
};

// =========================================================== LESSON 2
const L2_CHECK_IN = {
  title: 'What actually pulls?',
  text: 'Breathe in. Something moved to make that happen.',
  question: 'Do you think your lungs pulled the air in, or did something else?'
};

const L2_BEATS = [
  {
    n: 1,
    label: 'Lungs have no muscle of their own',
    hook: 'Your lungs cannot pull. They have no muscle in them at all.',
    teachingText:
      'A lung is a soft bag. It cannot squeeze and it cannot pull. Something else has to make the air move in and out.',
    example:
      'A paper bag does not fill itself. Somebody has to open it or blow into it.',
    applyIt: {
      prompt: 'Do your lungs pull air in by themselves?',
      choices: ['Yes, always', 'No, they have no muscle', 'Only when you run', 'Only when asleep'],
      answer: 1,
      feedback: [
        'They cannot.',
        null,
        'Not then either.',
        'Nor then.'
      ]
    }
  },
  {
    n: 2,
    label: 'The diaphragm pulls down and air falls in',
    hook: 'A flat sheet of muscle under your lungs does all the work.',
    teachingText:
      'Below your lungs sits a sheet of muscle. It is the diaphragm. When it pulls down, your chest gets bigger and air rushes in to fill the space.',
    example:
      'Let it go and your chest shrinks again. The air is pushed back out. That is breathing out.',
    applyIt: {
      prompt: 'When the diaphragm pulls DOWN, you:',
      choices: ['Breathe out', 'Breathe in', 'Cough', 'Swallow'],
      answer: 1,
      feedback: [
        'That is when it relaxes.',
        null,
        'A cough is different.',
        'That is your throat.'
      ]
    }
  }
];

const L2_ACTIVITY = {
  title: 'The bottle lung',
  prep: 'A clear plastic bottle with the bottom cut off, and two balloons. A grown-up does the cutting.',
  needs: ['a cut plastic bottle', 'two balloons', 'tape', 'her notebook'],
  steps: [
    'Push one balloon into the bottle neck and fold its opening over the rim.',
    'Cut the second balloon and stretch it over the open bottom. Tape it.',
    'Pull the bottom balloon DOWN. Watch the one inside.',
    'Push it back up. Watch again. Write down what happened each time.',
    'Label your drawing: bottle is chest, bottom balloon is diaphragm.'
  ],
  safety:
    'A GROWN-UP cuts the bottle. Balloons are a choking risk for younger children, so keep them out of mouths and away from anybody smaller.',
  minutes: 14
};

const L2_LEDGER = {
  prompt: 'Write what the diaphragm does when you breathe in, and when you breathe out.',
  ifSheIsStuck:
    'Down and in, up and out. Four words. If she can say which goes with which, she has the whole lesson.'
};

// =========================================================== LESSON 3
const L3_CHECK_IN = {
  title: 'Counting something you can change',
  text: 'Count your breaths for fifteen seconds. Do not change how you breathe.',
  question: 'That was harder than counting your pulse. Why do you think that is?'
};

const L3_BEATS = [
  {
    n: 1,
    label: 'Breathing is the one you can take over',
    hook: 'You cannot decide to stop your heart. You can decide to hold your breath.',
    teachingText:
      'Your body breathes without you thinking about it. But you can also take control of it. That makes breathing unusual — it works both ways.',
    example:
      'Your heart, your stomach and your kidneys never hand over the controls. Breathing does.',
    applyIt: {
      prompt: 'What makes breathing unusual?',
      choices: [
        'It is automatic AND you can control it',
        'It never stops',
        'It uses muscles',
        'It happens in your chest'
      ],
      answer: 0,
      feedback: [
        null,
        'Your heart never stops either.',
        'So does your heart.',
        'So does your heart.'
      ]
    }
  },
  {
    n: 2,
    label: 'Which is exactly why it is hard to count',
    hook: 'Watching your own breathing changes your own breathing.',
    teachingText:
      'As soon as you count your breaths, you start controlling them. Doctors know this. They often count while seeming to do something else.',
    example:
      'A doctor may hold your wrist as if taking a pulse, and count breaths instead.',
    applyIt: {
      prompt: 'Why might a doctor count your breaths secretly?',
      choices: [
        'To save time',
        'Because knowing changes how you breathe',
        'To be polite',
        'Because it is a rule'
      ],
      answer: 1,
      feedback: [
        'Time is not the reason.',
        null,
        'Politeness is not it.',
        'No such rule.'
      ]
    }
  }
];

const L3_ACTIVITY = {
  title: 'Count without being counted',
  prep: 'A timer with seconds. A willing grown-up.',
  needs: ['a timer', 'her notebook', 'a grown-up'],
  steps: [
    'Count YOUR OWN breaths for 15 seconds. Multiply by 4. Write it down.',
    'Now ask a grown-up to sit and read something.',
    'Without telling them, count THEIR breaths for 15 seconds. Multiply by 4.',
    'Now tell them you are counting, and count again.',
    'Write down whether their two numbers were different, and why.'
  ],
  safety:
    'Nobody holds their breath and nobody is timed for how long they can. If counting makes you feel odd, stop and breathe normally.',
  minutes: 14
};

const L3_LEDGER = {
  prompt: 'Write your breaths a minute, and one sentence about the counting problem.',
  ifSheIsStuck:
    'Ask what happened to the grown-up’s number once they knew. That change IS the finding, and noticing it is the science.'
};

// =========================================================== LESSON 4
const L4_CHECK_IN = {
  title: 'How much fits?',
  text: 'Take the biggest breath you can. Now let it all the way out.',
  question: 'That was a lot of air. How could you find out how much?'
};

const L4_BEATS = [
  {
    n: 1,
    label: 'Air can be measured, in millilitres',
    hook: 'Air takes up room, so air can be measured like water.',
    teachingText:
      'Volume is how much room something takes up. Liquids and gases are both measured in millilitres. A litre is a thousand millilitres.',
    example:
      'A small carton of juice is about 200 millilitres. Five of those make one litre.',
    applyIt: {
      prompt: 'How many millilitres are in a litre?',
      choices: ['10', '100', '1,000', '10,000'],
      answer: 2,
      feedback: [
        'Far too few.',
        'Still too few.',
        null,
        'Ten times too many.'
      ]
    }
  },
  {
    n: 2,
    label: 'And a bottle of water can measure your breath',
    hook: 'You can push water out of a bottle using nothing but one breath.',
    teachingText:
      'Fill a marked bottle with water and turn it upside down in a bowl. Blow through a tube. The air you breathe out pushes water down.',
    example:
      'Read the mark where the water stopped. That much water is that much air.',
    applyIt: {
      prompt: 'In the bottle test, the water level shows:',
      choices: [
        'How strong you are',
        'How much air you breathed out',
        'How fast you blew',
        'How deep the bowl is'
      ],
      answer: 1,
      feedback: [
        'Not a strength test.',
        null,
        'Speed does not change the amount.',
        'The bowl is not measured.'
      ]
    }
  }
];

const L4_ACTIVITY = {
  title: 'Measure one breath, in millilitres',
  prep: 'A large clear bottle, a marker, a jug with millilitre marks, a bowl, a clean straw or tube.',
  needs: ['a big clear bottle', 'a marker pen', 'a measuring jug', 'a bowl', 'a clean straw'],
  steps: [
    'Pour water into the bottle 100 ml at a time. Mark each level.',
    'Fill it right up, cover the top, and turn it upside down in the bowl.',
    'Slide the straw up inside the neck, under the water.',
    'Take a normal breath and blow it all out through the straw.',
    'Read the mark where the water stopped. Write your number in millilitres.'
  ],
  safety:
    'ONE normal breath, not the biggest you can manage. Nobody holds their breath, nobody competes, and nobody’s number is compared with anybody else’s. Use your own clean straw. Stop and sit down if you feel light-headed.',
  minutes: 14
};

const L4_LEDGER = {
  prompt: 'Write your number in millilitres, and what you had to do to get it.',
  ifSheIsStuck:
    'Ask her how she turned air into a number she could read. Water moved, and the marks said how much. That is the whole method.'
};

// ---------------------------------------------------------------------------

export const HUMANBODY_M7 = [
  {
    id: 'body-m7-01',
    course: 'humanbody',
    module: 7,
    quarter: 2,
    week: 5,
    day: 1,
    n: 1,
    title: 'Two lungs, and the tree inside them',
    minutes: 30,
    spec: '§10 · beats',
    concept: 'There are two lungs of different sizes, and the air pipes inside them branch like a tree.',
    standards: [],
    offGrade: null,
    words: ['lung', 'windpipe', 'branch'],
    glossary: [
      { word: 'lung', plain: 'A soft bag in your chest that fills with air.' },
      { word: 'windpipe', plain: 'The tube from your throat down to your lungs.' },
      { word: 'branch', plain: 'To split into two or more.' }
    ],
    video: {
      id: '1ut0-7VreCM',
      url: 'https://www.youtube.com/watch?v=1ut0-7VreCM',
      title: 'Respiratory System - Learning the Human Body for kids',
      channel: 'Smile and Learn - English',
      minutes: 1,
      verified: '2026-08-18 · youtube.com/oembed · length read from the duration badge',
      teaches: ['what the lungs are', 'the path air takes', 'the parts of the respiratory system'],
      sourceGap:
        'OPEN. Searched: "lungs breathing for kids video SciShow Kids how do lungs work respiratory system elementary" and ""Smile and Learn" OR "Learn Bright" OR "Homeschool Pop" respiratory system lungs heart for kids youtube" — returned KidsHealth, Nemours, Dr. Binocs, Happy Learning and Smile and Learn, no Black-educator-led channel. The two standing searches for this course are written down in full on body-m1-01.'
    },
    checkIn: L1_CHECK_IN,
    beats: L1_BEATS,
    activity: L1_ACTIVITY,
    ledger: L1_LEDGER,
    hook: L1_CHECK_IN,
    core: L1_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L1_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'Why is the left lung smaller?', answer: 'To make room for the heart.', why: 'The heart leans that way.' },
      { ask: 'What shape are the air pipes?', answer: 'A branching tree.', why: 'Splitting again and again.' }
    ],
    check: [
      {
        prompt: 'How many lungs do you have?',
        choices: ['One', 'Two', 'Three', 'Four'],
        answer: 1,
        feedback: ['One each side.', null, 'Two.', 'Two.']
      },
      {
        prompt: 'Your left lung is smaller because:',
        choices: ['It works less', 'It makes room for the heart', 'It is younger', 'It holds cleaner air'],
        answer: 1,
        feedback: ['Both work hard.', null, 'Same age as you.', 'Same air.']
      },
      {
        prompt: 'Air pipes inside the lungs are shaped like:',
        choices: ['One straight tube', 'A branching tree', 'A circle', 'A flat sheet'],
        answer: 1,
        feedback: ['It splits many times.', null, 'It does not loop.', 'Not flat.']
      }
    ]
  },
  {
    id: 'body-m7-02',
    course: 'humanbody',
    module: 7,
    quarter: 2,
    week: 5,
    day: 2,
    n: 2,
    title: 'The diaphragm does the work',
    minutes: 30,
    spec: '§10 · beats',
    concept: 'Lungs have no muscle — the diaphragm pulls down, the chest enlarges, and air falls in.',
    standards: [],
    offGrade: null,
    words: ['diaphragm', 'space', 'fill'],
    glossary: [
      { word: 'diaphragm', plain: 'A flat sheet of muscle under your lungs.' },
      { word: 'space', plain: 'Room for something to go into.' },
      { word: 'fill', plain: 'To take up all the space in something.' }
    ],
    video: {
      id: 'rUVMok4Qp-Y',
      url: 'https://www.youtube.com/watch?v=rUVMok4Qp-Y',
      title: 'Operation Ouch - The Diaphragm | Science for Kids',
      channel: 'Operation Ouch',
      minutes: 5,
      verified: '2026-08-18 · youtube.com/oembed · length read from the duration badge',
      teaches: ['what the diaphragm is', 'how it makes breathing happen', 'that lungs do not move themselves'],
      sourceGap: 'OPEN. Same searches as body-m7-01 and body-m1-01, both written down there. Operation Ouch is a CBBC production.'
    },
    checkIn: L2_CHECK_IN,
    beats: L2_BEATS,
    activity: L2_ACTIVITY,
    ledger: L2_LEDGER,
    hook: L2_CHECK_IN,
    core: L2_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L2_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'Do lungs pull air in?', answer: 'No. They have no muscle.', why: 'The diaphragm does it.' },
      { ask: 'Diaphragm down means:', answer: 'Breathing in.', why: 'More space, so air falls in.' }
    ],
    check: [
      {
        prompt: 'A lung is:',
        choices: ['A muscle', 'A soft bag', 'A bone', 'A tube'],
        answer: 1,
        feedback: ['It has no muscle in it.', null, 'Ribs are the bones.', 'Tubes lead into it.']
      },
      {
        prompt: 'The diaphragm sits:',
        choices: ['Above your lungs', 'Below your lungs', 'Inside a lung', 'In your throat'],
        answer: 1,
        feedback: ['Below, not above.', null, 'Outside them.', 'Much lower.']
      },
      {
        prompt: 'When the diaphragm pulls DOWN you:',
        choices: ['Breathe out', 'Breathe in', 'Cough', 'Swallow'],
        answer: 1,
        feedback: ['That is it relaxing.', null, 'A cough is different.', 'That is your throat.']
      }
    ]
  },
  {
    id: 'body-m7-03',
    course: 'humanbody',
    module: 7,
    quarter: 2,
    week: 6,
    day: 1,
    n: 3,
    title: 'Counting breaths, and why it is tricky',
    minutes: 30,
    spec: '§10 · beats',
    concept: 'Breathing is both automatic and controllable, which is exactly why counting it changes it.',
    standards: [],
    offGrade: null,
    words: ['automatic', 'control', 'notice'],
    glossary: [
      { word: 'automatic', plain: 'Happens by itself, without deciding.' },
      { word: 'control', plain: 'To decide how something happens.' },
      { word: 'notice', plain: 'To become aware of something.' }
    ],
    video: {
      id: 'X2YVt16Kxak',
      url: 'https://www.youtube.com/watch?v=X2YVt16Kxak',
      title: 'Travel through the Respiratory System - Fun Science for Kids',
      channel: 'Smile and Learn - English',
      minutes: 2,
      verified: '2026-08-18 · youtube.com/oembed · length read from the duration badge',
      teaches: ['the journey air takes through the body', 'breathing in and breathing out', 'what happens to oxygen'],
      sourceGap: 'OPEN. Same searches as body-m7-01 and body-m1-01, both written down there.'
    },
    checkIn: L3_CHECK_IN,
    beats: L3_BEATS,
    activity: L3_ACTIVITY,
    ledger: L3_LEDGER,
    hook: L3_CHECK_IN,
    core: L3_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L3_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'What is unusual about breathing?', answer: 'Automatic AND controllable.', why: 'Your heart is not.' },
      { ask: 'Why count breaths secretly?', answer: 'Knowing changes the breathing.', why: 'Doctors count while seeming to do something else.' }
    ],
    check: [
      {
        prompt: 'Breathing is unusual because:',
        choices: ['It never stops', 'It is automatic AND you can control it', 'It uses muscles', 'It is in your chest'],
        answer: 1,
        feedback: ['Your heart never stops either.', null, 'So does your heart.', 'So is your heart.']
      },
      {
        prompt: 'Counting your own breaths tends to:',
        choices: ['Change how you breathe', 'Speed up your pulse', 'Make no difference', 'Stop your breathing'],
        answer: 0,
        feedback: [null, 'Different measurement.', 'It usually does.', 'Never.']
      },
      {
        prompt: 'You count 5 breaths in 15 seconds. In a minute that is:',
        choices: ['10', '15', '20', '5'],
        answer: 2,
        feedback: ['That is × 2.', 'That is × 3.', null, 'That is the 15 seconds.']
      }
    ]
  },
  {
    id: 'body-m7-04',
    course: 'humanbody',
    module: 7,
    quarter: 2,
    week: 6,
    day: 2,
    n: 4,
    title: 'Measuring one breath',
    minutes: 30,
    spec: '§10 · beats',
    concept: 'Air takes up space, so a breath can be measured in millilitres using water it pushes out of a bottle.',
    standards: [],
    offGrade: null,
    words: ['volume', 'millilitre', 'litre'],
    glossary: [
      { word: 'volume', plain: 'How much room something takes up.' },
      { word: 'millilitre', plain: 'A small unit for measuring liquid or air.' },
      { word: 'litre', plain: 'A thousand millilitres.' }
    ],
    video: {
      id: 'mOKmjYwfDGU',
      url: 'https://www.youtube.com/watch?v=mOKmjYwfDGU',
      title: 'Respiratory System | The Dr. Binocs Show | Learn Videos For Kids',
      channel: 'Peekaboo Kidz',
      minutes: 4,
      verified: '2026-08-18 · youtube.com/oembed · length read from the duration badge',
      teaches: ['how the respiratory system works', 'lung capacity', 'what happens to air inside the lungs'],
      sourceGap: 'OPEN. Same searches as body-m7-01 and body-m1-01, both written down there.'
    },
    checkIn: L4_CHECK_IN,
    beats: L4_BEATS,
    activity: L4_ACTIVITY,
    ledger: L4_LEDGER,
    hook: L4_CHECK_IN,
    core: L4_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L4_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'How many millilitres in a litre?', answer: '1,000.', why: 'Same jump as metres to kilometres.' },
      { ask: 'What does the water level show?', answer: 'How much air she breathed out.', why: 'Air pushed the water down.' }
    ],
    check: [
      {
        prompt: 'How many millilitres are in one litre?',
        choices: ['10', '100', '1,000', '10,000'],
        answer: 2,
        feedback: ['Far too few.', 'Still too few.', null, 'Ten times too many.']
      },
      {
        prompt: 'Volume means:',
        choices: ['How loud it is', 'How much room it takes up', 'How heavy it is', 'How long it is'],
        answer: 1,
        feedback: ['A different meaning of the same word.', null, 'That is weight.', 'That is length.']
      },
      {
        prompt: 'In the bottle test, the water level shows:',
        choices: ['How strong you are', 'How much air you breathed out', 'How fast you blew', 'How deep the bowl is'],
        answer: 1,
        feedback: ['Not a strength test.', null, 'Speed does not change the amount.', 'The bowl is not measured.']
      }
    ]
  }
];

export const HUMANBODY_M7_META = {
  courseId: 'humanbody',
  module: 7,
  title: 'The Lungs',
  blurb:
    'Where the oxygen comes from — two lungs of different sizes, a branching tree of air pipes, the diaphragm that does all the work, and one breath measured in millilitres.'
};

export function humanbodyM7LessonById(id) {
  return HUMANBODY_M7.find((l) => l.id === id) || null;
}

export default HUMANBODY_M7;
