// ---------------------------------------------------------------------------
// THE HUMAN BODY · MODULE 6 — BLOOD, AND WHAT IT CARRIES
//
// Four lessons. Quarter 2, weeks 3 and 4. Tuesday and Thursday, 30 minutes.
//
// Module 5 was the pump. This is what the pump moves, and the pipes it moves it
// through. Four jobs in one red liquid: carrying oxygen, carrying food, fighting
// germs, and mending leaks. She has already met the mending in Module 2, when a
// cut scabbed over — this is the same event from the inside.
//
// The doctor's action: READ WHAT A CUFF SHOWS. Blood pressure is a real number
// a doctor takes, and she can watch one being taken and write down what she saw.
// She does NOT take her own reading and she is never asked whether one is good.
//
// ---- READING CAP ----
//
// Quarter 2: 12 words a sentence.
//
// ---- SAFETY, AND IT NARROWS THIS MODULE ----
//
// Blood is the topic most likely to drift into things a nine-year-old should
// not be asked to judge. So: nothing about blood types beyond naming them,
// nothing about donation, nothing about illness, no numbers she is invited to
// call high or low, and NOTHING that teaches her to check anybody. A cuff is
// watched and described. Reading one is a doctor's job and nobody else's.
// ---------------------------------------------------------------------------

// =========================================================== LESSON 1
const L1_CHECK_IN = {
  title: 'More than one thing',
  text: 'Blood looks like one red liquid. It is not.',
  question: 'If you could let a drop settle in a glass, what might separate out?'
};

const L1_BEATS = [
  {
    n: 1,
    label: 'Blood is mostly water, with things floating in it',
    hook: 'A little over half of your blood is a pale yellow liquid, not red.',
    teachingText:
      'Blood is a liquid with tiny parts floating in it. The liquid is called plasma and it is pale yellow. The parts floating in it are what make blood red.',
    example:
      'Left to settle, blood separates into layers. The yellow liquid rises and the red parts sink.',
    applyIt: {
      prompt: 'The liquid part of blood is:',
      choices: ['Red', 'Pale yellow', 'Clear like water', 'White'],
      answer: 1,
      feedback: [
        'The floating parts make it red.',
        null,
        'It has things dissolved in it.',
        'That is one of the cells.'
      ]
    }
  },
  {
    n: 2,
    label: 'Three kinds of part, three different jobs',
    hook: 'Red ones carry, white ones fight, and the tiny ones patch holes.',
    teachingText:
      'Red parts carry oxygen. White parts fight germs. Tiny sticky parts called platelets plug leaks. All three float in the plasma together.',
    example:
      'You met the platelets in Module 2. They are what turned a cut sticky before it scabbed.',
    applyIt: {
      prompt: 'Which part of blood fights germs?',
      choices: ['Red parts', 'White parts', 'Platelets', 'Plasma'],
      answer: 1,
      feedback: [
        'Those carry oxygen.',
        null,
        'Those plug leaks.',
        'That is the liquid they float in.'
      ]
    }
  }
];

const L1_ACTIVITY = {
  title: 'Blood in a jar',
  prep: 'A clear jar, water, red beads or rajma beans, a few white beans, and rice.',
  needs: ['a clear jar', 'water', 'red and white beans', 'rice', 'her notebook'],
  steps: [
    'Half fill the jar with water. That is the plasma.',
    'Add a big handful of red beans. Those are the oxygen carriers.',
    'Add a few white beans. Those fight germs — notice how few there are.',
    'Add a spoon of rice for the platelets.',
    'Draw the jar and label all four parts with what each one does.'
  ],
  safety:
    'Dry beans and rice, in a jar, and none of it goes near anybody’s mouth. This is a model of blood, not blood.',
  minutes: 14
};

const L1_LEDGER = {
  prompt: 'Write the four parts of blood and one job each.',
  ifSheIsStuck:
    'Point at the jar. Liquid, red, white, tiny. Carry, fight, plug. She has four labels and three verbs already sitting in front of her.'
};

// =========================================================== LESSON 2
const L2_CHECK_IN = {
  title: 'Three kinds of pipe',
  text: 'Look at the inside of your wrist. You can see faint blue-green lines.',
  question: 'Those are pipes carrying blood. Where do you think they are going?'
};

const L2_BEATS = [
  {
    n: 1,
    label: 'Arteries carry away, veins bring back',
    hook: 'Away and back have different names, and the names are worth learning.',
    teachingText:
      'Pipes carrying blood away from the heart are arteries. Pipes bringing it back are veins. Arteries have thicker walls, because the push is stronger.',
    example:
      'The lines you can see at your wrist are veins. They lie nearer the surface.',
    applyIt: {
      prompt: 'A pipe carrying blood AWAY from the heart is:',
      choices: ['A vein', 'An artery', 'A valve', 'A tendon'],
      answer: 1,
      feedback: [
        'Those bring it back.',
        null,
        'That is a one-way door.',
        'That joins muscle to bone.'
      ]
    }
  },
  {
    n: 2,
    label: 'And the smallest ones are where the work happens',
    hook: 'The most important pipes in your body are too thin to see.',
    teachingText:
      'Between arteries and veins sit tiny pipes with very thin walls. Oxygen passes out through those walls to your body. That is where the delivery happens.',
    example:
      'They are so thin that blood cells go through in single file, one after another.',
    applyIt: {
      prompt: 'Where does oxygen leave the blood?',
      choices: ['In the heart', 'In the arteries', 'In the tiniest pipes', 'In the veins'],
      answer: 2,
      feedback: [
        'The heart only pushes.',
        'Their walls are too thick.',
        null,
        'Those are on the way back.'
      ]
    }
  }
];

const L2_ACTIVITY = {
  title: 'Map your own visible pipes',
  prep: 'Nothing to prepare. Good light helps.',
  needs: ['her notebook', 'a blue pencil and a red pencil'],
  steps: [
    'Look at the inside of your wrist and the back of your hand.',
    'Draw your hand and mark the lines you can actually see.',
    'Those are veins. Colour them blue on your drawing.',
    'Feel for your pulse. That is an artery — mark it in red.',
    'Write down which one you could SEE and which one you could FEEL.'
  ],
  safety:
    'Looking and gentle feeling only. Nothing is pressed hard, and nothing here is about how anybody’s hands look.',
  minutes: 12
};

const L2_LEDGER = {
  prompt: 'Write the difference between an artery and a vein, in your own words.',
  ifSheIsStuck:
    'Away and back. If she writes those two words with the right names attached, she has the whole lesson.'
};

// =========================================================== LESSON 3
const L3_CHECK_IN = {
  title: 'How much, and how far',
  text: 'All the pipes in one person, laid end to end, would go a very long way.',
  question: 'Have a guess. Around a room? Around a town? Further?'
};

const L3_BEATS = [
  {
    n: 1,
    label: 'The distances are hard to believe, and they are measured',
    hook: 'Laid end to end, one person’s blood vessels would circle the Earth twice.',
    teachingText:
      'Most of that length is the tiny pipes. There are billions of them. Added together they make a length nobody could walk in a lifetime.',
    example:
      'The Earth is about 40,000 km round. Two times round is about 80,000 km of pipe.',
    applyIt: {
      prompt: 'Most of that enormous length is made of:',
      choices: ['Arteries', 'Veins', 'The tiniest pipes', 'The heart'],
      answer: 2,
      feedback: [
        'There are far fewer of those.',
        'Fewer of those as well.',
        null,
        'The heart is one organ.'
      ]
    }
  },
  {
    n: 2,
    label: 'And a drop of blood does the whole circuit in under a minute',
    hook: 'One trip round your entire body takes less than sixty seconds.',
    teachingText:
      'A drop of blood leaves your heart, goes round your body, and comes back. The whole trip takes under a minute while you are sitting still.',
    example:
      'Time one minute on a clock. In that time, a drop went everywhere and came home.',
    applyIt: {
      prompt: 'A full trip round the body takes about:',
      choices: ['An hour', 'Ten minutes', 'Less than a minute', 'A day'],
      answer: 2,
      feedback: [
        'Far quicker.',
        'Still quicker.',
        null,
        'Nowhere near.'
      ]
    }
  }
];

const L3_ACTIVITY = {
  title: 'String, and a very long number',
  prep: 'A ball of string, a ruler, and a large space or a long corridor.',
  needs: ['string', 'a ruler', 'her notebook', 'a pencil'],
  steps: [
    'Cut a piece of string one metre long. Measure it properly.',
    'Now work out how many of those make one kilometre. Write it down.',
    'Then how many metres are in 80,000 kilometres. Show your working.',
    'Lay your one metre on the floor and look at it again.',
    'Write one sentence about the two numbers side by side.'
  ],
  safety: 'String and a ruler. Nothing goes round anybody’s neck or fingers.',
  minutes: 14
};

const L3_LEDGER = {
  prompt: 'Write how far the pipes would stretch, and how long one trip takes.',
  ifSheIsStuck:
    'Two facts, one sentence each. Twice round the Earth, and under a minute. The surprise is that both are true of the same body.'
};

// =========================================================== LESSON 4
const L4_CHECK_IN = {
  title: 'The band on your arm',
  text: 'A doctor puts a band round your arm and pumps it up. It squeezes, then lets go.',
  question: 'What do you think that band is measuring?'
};

const L4_BEATS = [
  {
    n: 1,
    label: 'A cuff measures the push inside an artery',
    hook: 'The squeeze is not a punishment. It is how the number is taken.',
    teachingText:
      'The band squeezes until blood stops flowing. Then it lets go slowly. The doctor listens for when the flow starts again. That moment is the number.',
    example:
      'That is why it needs the stethoscope too. The ears and the band work together.',
    applyIt: {
      prompt: 'What is a blood pressure cuff measuring?',
      choices: [
        'How fast your heart beats',
        'The push inside an artery',
        'How much blood you have',
        'Your temperature'
      ],
      answer: 1,
      feedback: [
        'That is a pulse, and it is a different reading.',
        null,
        'It does not measure amount.',
        'That is a thermometer.'
      ]
    }
  },
  {
    n: 2,
    label: 'It gives TWO numbers, not one',
    hook: 'Blood pressure is always said as one number over another. There is a reason.',
    teachingText:
      'The first number is the push when your heart squeezes. The second is the push when it rests between beats. Both matter, so both are said.',
    example:
      'It is written like a fraction and read out loud as "over" — the squeeze, then the rest.',
    applyIt: {
      prompt: 'Why does blood pressure have two numbers?',
      choices: [
        'One is a spare',
        'The squeeze and the rest are both measured',
        'One is for each arm',
        'One is the pulse'
      ],
      answer: 1,
      feedback: [
        'Neither is spare.',
        null,
        'One arm gives both.',
        'The pulse is separate.'
      ]
    }
  }
];

const L4_ACTIVITY = {
  title: 'Watch one being taken, and write down what you saw',
  prep: 'A grown-up willing to have their blood pressure taken, or a video of it.',
  needs: ['her notebook', 'a pencil', 'a grown-up'],
  steps: [
    'Watch a grown-up have a cuff put on, or watch it in the video.',
    'Write down the ORDER of what happened, step by step.',
    'Note where the stethoscope went and when the listening started.',
    'Write down the two numbers if they are offered. Just write them.',
    'Write one question you would ask the person taking the reading.'
  ],
  safety:
    'She WATCHES. She does not put a cuff on anybody, including herself, and she is not asked whether any number is good, high or low. Reading a blood pressure is a doctor’s job and only a doctor’s. If no cuff is to hand, watching the video is the whole activity.',
  minutes: 12
};

const L4_LEDGER = {
  prompt: 'Write the steps of taking a blood pressure, in the order they happened.',
  ifSheIsStuck:
    'Ask what came first, and keep asking "and then?". Band on, pump up, let go slowly, listen. Four steps is a complete answer.'
};

// ---------------------------------------------------------------------------

export const HUMANBODY_M6 = [
  {
    id: 'body-m6-01',
    course: 'humanbody',
    module: 6,
    quarter: 2,
    week: 3,
    day: 1,
    n: 1,
    title: 'What blood is made of',
    minutes: 30,
    spec: '§10 · beats',
    concept: 'Blood is plasma with three kinds of part floating in it — carriers, fighters and menders.',
    standards: [],
    offGrade: null,
    words: ['plasma', 'cell', 'platelet'],
    glossary: [
      { word: 'plasma', plain: 'The pale yellow liquid part of blood.' },
      { word: 'cell', plain: 'A tiny living part your body is built from.' },
      { word: 'platelet', plain: 'A tiny sticky part that plugs leaks.' }
    ],
    video: {
      id: 'KNFeZpdemmE',
      url: 'https://www.youtube.com/watch?v=KNFeZpdemmE',
      title: 'Your Blood Is A Super Team (And Here’s Why) 🩸 | Circulatory System Song, Lesson & Quiz for Kids',
      channel: 'STEM Spark Zone',
      minutes: 3,
      verified: '2026-08-18 · youtube.com/oembed · length read from the duration badge',
      teaches: ['what blood is made of', 'red cells, white cells and platelets', 'the job each part does'],
      sourceGap:
        'OPEN. Searched: "red blood cells white blood cells platelets for kids video Free School OR Smile and Learn" and "youtube circulatory system OR blood for kids video Learn Bright Homeschool Pop what is blood made of" — returned KidsHealth, Study.com, Twinkl and PBS, no Black-educator-led channel. Identity of this channel is UNKNOWN and recorded as unknown. Note the title carries a CURLY apostrophe in "Here’s" and an emoji — recorded exactly as YouTube returned it. The two standing searches for this course are on body-m1-01.'
    },
    checkIn: L1_CHECK_IN,
    beats: L1_BEATS,
    activity: L1_ACTIVITY,
    ledger: L1_LEDGER,
    hook: L1_CHECK_IN,
    core: L1_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L1_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'What colour is plasma?', answer: 'Pale yellow.', why: 'The floating parts make blood red.' },
      { ask: 'Which part plugs a leak?', answer: 'Platelets.', why: 'She met them as a scab in Module 2.' }
    ],
    check: [
      {
        prompt: 'The liquid part of blood is called:',
        choices: ['Plasma', 'Platelets', 'Oxygen', 'Marrow'],
        answer: 0,
        feedback: [null, 'Those float in it.', 'That is carried, not the liquid.', 'That is inside bone.']
      },
      {
        prompt: 'White parts of blood mainly:',
        choices: ['Carry oxygen', 'Fight germs', 'Plug leaks', 'Carry food'],
        answer: 1,
        feedback: ['Red parts do that.', null, 'Platelets do that.', 'Plasma carries food.']
      },
      {
        prompt: 'Platelets are the ones that:',
        choices: ['Carry oxygen', 'Fight germs', 'Plug leaks', 'Make blood yellow'],
        answer: 2,
        feedback: ['Red parts.', 'White parts.', null, 'Plasma is the yellow part.']
      }
    ]
  },
  {
    id: 'body-m6-02',
    course: 'humanbody',
    module: 6,
    quarter: 2,
    week: 3,
    day: 2,
    n: 2,
    title: 'Arteries, veins, and the tiny ones',
    minutes: 30,
    spec: '§10 · beats',
    concept: 'Arteries carry blood away from the heart, veins bring it back, and the tiniest pipes are where oxygen is delivered.',
    standards: [],
    offGrade: null,
    words: ['artery', 'vein', 'thin'],
    glossary: [
      { word: 'artery', plain: 'A pipe carrying blood away from the heart.' },
      { word: 'vein', plain: 'A pipe bringing blood back to the heart.' },
      { word: 'thin', plain: 'Not thick. Easy to pass through.' }
    ],
    video: {
      id: 'ZjT3qjxYTro',
      url: 'https://www.youtube.com/watch?v=ZjT3qjxYTro',
      title: 'Operation Ouch - Blood Vessels | Science for Kids',
      channel: 'Operation Ouch',
      minutes: 5,
      verified: '2026-08-18 · youtube.com/oembed · length read from the duration badge',
      teaches: ['arteries and veins', 'how blood vessels differ', 'where blood vessels run in the body'],
      sourceGap: 'OPEN. Same searches as body-m6-01 and body-m1-01, both written down there. Operation Ouch is a CBBC production.'
    },
    checkIn: L2_CHECK_IN,
    beats: L2_BEATS,
    activity: L2_ACTIVITY,
    ledger: L2_LEDGER,
    hook: L2_CHECK_IN,
    core: L2_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L2_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'Artery — away or back?', answer: 'Away from the heart.', why: 'Veins bring it back.' },
      { ask: 'Where is oxygen delivered?', answer: 'In the tiniest pipes.', why: 'Their walls are thin enough.' }
    ],
    check: [
      {
        prompt: 'Veins carry blood:',
        choices: ['Away from the heart', 'Back to the heart', 'Into the lungs only', 'Nowhere'],
        answer: 1,
        feedback: ['That is arteries.', null, 'They go everywhere.', 'They carry plenty.']
      },
      {
        prompt: 'Arteries have thicker walls because:',
        choices: ['They are older', 'The push is stronger', 'They are nearer the skin', 'They carry more'],
        answer: 1,
        feedback: ['Age is not it.', null, 'Veins are nearer the surface.', 'Not the reason.']
      },
      {
        prompt: 'The lines you can see at your wrist are:',
        choices: ['Arteries', 'Veins', 'Tendons', 'Nerves'],
        answer: 1,
        feedback: ['Those are deeper.', null, 'You met those in Module 4.', 'Too fine to see.']
      }
    ]
  },
  {
    id: 'body-m6-03',
    course: 'humanbody',
    module: 6,
    quarter: 2,
    week: 4,
    day: 1,
    n: 3,
    title: 'Twice round the Earth, in under a minute',
    minutes: 30,
    spec: '§10 · beats',
    concept: 'The blood vessels in one body would stretch about 80,000 km, and a drop completes the circuit in under a minute.',
    standards: [],
    offGrade: null,
    words: ['kilometre', 'stretch', 'circuit'],
    glossary: [
      { word: 'kilometre', plain: 'A thousand metres.' },
      { word: 'stretch', plain: 'To reach from one place to another.' },
      { word: 'circuit', plain: 'A trip that comes back to where it started.' }
    ],
    video: {
      id: 'Dw0WO2XZ5fM',
      url: 'https://www.youtube.com/watch?v=Dw0WO2XZ5fM',
      title: 'Circulatory System for Kids | Learn all about how blood travels through the body',
      channel: 'Learn Bright',
      minutes: 8,
      verified: '2026-08-18 · youtube.com/oembed · length read from the duration badge',
      teaches: ['how blood travels through the body', 'the scale of the circulatory system', 'how quickly blood completes a circuit'],
      sourceGap: 'OPEN. Same searches as body-m6-01 and body-m1-01, both written down there.'
    },
    checkIn: L3_CHECK_IN,
    beats: L3_BEATS,
    activity: L3_ACTIVITY,
    ledger: L3_LEDGER,
    hook: L3_CHECK_IN,
    core: L3_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L3_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'How many metres in a kilometre?', answer: '1,000.', why: 'Same jump as centimetres to metres.' },
      { ask: 'How long is one full circuit?', answer: 'Under a minute.', why: 'Sitting still.' }
    ],
    check: [
      {
        prompt: 'How many metres are in one kilometre?',
        choices: ['100', '1,000', '10,000', '10'],
        answer: 1,
        feedback: ['That is 100 metres.', null, 'That is ten kilometres.', 'Far too few.']
      },
      {
        prompt: 'Most of the length of your blood vessels is:',
        choices: ['Arteries', 'Veins', 'The tiniest pipes', 'The heart'],
        answer: 2,
        feedback: ['Far fewer of those.', 'Fewer of those too.', null, 'One organ.']
      },
      {
        prompt: 'A drop of blood goes all the way round your body in about:',
        choices: ['An hour', 'Ten minutes', 'Less than a minute', 'A day'],
        answer: 2,
        feedback: ['Far quicker.', 'Still quicker.', null, 'Nowhere near.']
      }
    ]
  },
  {
    id: 'body-m6-04',
    course: 'humanbody',
    module: 6,
    quarter: 2,
    week: 4,
    day: 2,
    n: 4,
    title: 'What the cuff on your arm is doing',
    minutes: 30,
    spec: '§10 · beats',
    concept: 'A blood pressure cuff measures the push inside an artery, and gives two numbers — the squeeze and the rest.',
    standards: [],
    offGrade: null,
    words: ['cuff', 'pressure', 'squeeze'],
    glossary: [
      { word: 'cuff', plain: 'The band a doctor puts round your arm.' },
      { word: 'pressure', plain: 'How hard something is pushing.' },
      { word: 'squeeze', plain: 'To press together.' }
    ],
    video: {
      id: '2Efh50dxK3k',
      url: 'https://www.youtube.com/watch?v=2Efh50dxK3k',
      title: 'Science for kids | Blood | Cardiovascular System | Body Parts| Experiments for kids | Operation Ouch',
      channel: 'Operation Ouch',
      minutes: 29,
      verified: '2026-08-18 · youtube.com/oembed · length read from the duration badge',
      teaches: ['what blood does in the body', 'how doctors measure what blood is doing', 'experiments with the cardiovascular system'],
      sourceGap:
        'OPEN. Same searches as body-m6-01 and body-m1-01. ⚠️ LENGTH: 29 minutes, a compilation of separate items, so it stops and restarts cleanly rather than needing one sitting. Gigi’s call, Aug 17: the full videos stay. Note the title carries "Body Parts|" with NO SPACE before the pipe — recorded exactly as YouTube returned it, because a title is copied and never tidied.'
    },
    checkIn: L4_CHECK_IN,
    beats: L4_BEATS,
    activity: L4_ACTIVITY,
    ledger: L4_LEDGER,
    hook: L4_CHECK_IN,
    core: L4_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L4_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'What does a cuff measure?', answer: 'The push inside an artery.', why: 'Not the pulse, and not the amount.' },
      { ask: 'Why two numbers?', answer: 'The squeeze, and the rest between beats.', why: 'Both matter, so both are said.' }
    ],
    check: [
      {
        prompt: 'A blood pressure cuff measures:',
        choices: ['Heart rate', 'The push inside an artery', 'How much blood you have', 'Temperature'],
        answer: 1,
        feedback: ['That is a pulse.', null, 'Not the amount.', 'That is a thermometer.']
      },
      {
        prompt: 'Blood pressure is given as two numbers because:',
        choices: ['One is spare', 'The squeeze and the rest are both measured', 'One per arm', 'One is the pulse'],
        answer: 1,
        feedback: ['Neither is spare.', null, 'One arm gives both.', 'The pulse is separate.']
      },
      {
        prompt: 'Who reads a blood pressure and says what it means?',
        choices: ['Anybody with a cuff', 'A real doctor', 'The person wearing it', 'The machine alone'],
        answer: 1,
        feedback: ['Taking a number is not reading it.', null, 'How you feel is not a reading.', 'A machine gives a number, not a meaning.']
      }
    ]
  }
];

export const HUMANBODY_M6_META = {
  courseId: 'humanbody',
  module: 6,
  title: 'Blood, and What It Carries',
  blurb:
    'What the pump moves and the pipes it moves it through — four parts with four jobs, arteries and veins, 80,000 km of vessel, and the two numbers a cuff gives.'
};

export function humanbodyM6LessonById(id) {
  return HUMANBODY_M6.find((l) => l.id === id) || null;
}

export default HUMANBODY_M6;
