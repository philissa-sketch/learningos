// ---------------------------------------------------------------------------
// THE HUMAN BODY · MODULE 15 — STAYING WELL
//
// Four lessons. Quarter 4, weeks 5 and 6. Tuesday and Thursday, 30 minutes.
//
// Fifteen modules have taken a body apart. This one asks the question a doctor
// actually gets asked: what happens when something goes wrong, and what is the
// body already doing about it?
//
// ---- THE DOCTOR'S ACTION: TWO HANDS, A TIMER, AND A CONTROL ----
//
// She coats both hands in oil and pepper, washes one with cold water alone and
// one with soap, TIMES BOTH, and compares. It is a controlled experiment with a
// control group — the first one in this course where the design is the lesson —
// and it settles by observation something children are usually just told.
//
// Lesson 3 turns a thermometer into elapsed-time work. Lesson 4 turns a week of
// bedtimes into a real subtraction table.
//
// ---- READING CAP ----
//
// Quarter 4: 16 words a sentence, floor 7.5. §10.1.
//
// ---- SAFETY, AND THIS ONE HAS TO WALK A LINE ----
//
// A module about illness is one wrong sentence away from teaching a nine-year-old
// to diagnose herself and everybody in the house. It does not do that.
//
//   · NOTHING is named as a symptom of anything. No lists of what to watch for.
//   · NO SELF-DIAGNOSIS. Every lesson lands on the same sentence: tell a
//     grown-up, and a doctor decides. That is stated four times, once per lesson.
//   · NO MEDICINE. No names, no doses, no "take this for that", not even
//     "medicine helps" as a general claim. Nothing here is a treatment.
//   · Fever is explained as a THING THE BODY DOES ON PURPOSE, not as a danger
//     sign — and she never takes anybody's temperature, including her own.
//   · Sleep is taught as repair, never as a rule about her bedtime and never
//     with a number of hours she ought to be getting.
//   · Nothing about food, weight, exercise or appearance, as everywhere else in
//     this course.
//   · Nothing about vaccines, which is a conversation for Gigi and not for a
//     lesson written by a machine.
// ---------------------------------------------------------------------------

// =========================================================== LESSON 1
const L1_CHECK_IN = {
  title: 'Too small to see',
  text: 'Your hands look clean right now, and they are covered in living things far too small to see.',
  question: 'If you cannot see them, how could anybody have found out they were there?'
};

const L1_BEATS = [
  {
    n: 1,
    label: 'Germs are living things too small to see, and most do nothing to you',
    hook: 'The word germ covers several very different things that only have smallness in common.',
    teachingText:
      'Bacteria are tiny living cells. Viruses are smaller still and are barely alive at all. Most of the ones you meet do nothing to you, and some — like the ones in your gut — are useful.',
    example:
      'You met the useful ones in Module 10. The same word covers those and the ones that make you ill.',
    applyIt: {
      prompt: 'Most of the germs you meet:',
      choices: ['Make you ill', 'Do nothing to you at all', 'Are visible if you look', 'Live only outdoors'],
      answer: 1,
      feedback: [
        'Only a small number do that.',
        null,
        'They need a microscope.',
        'They are everywhere, indoors too.'
      ]
    }
  },
  {
    n: 2,
    label: 'Soap does something water alone cannot',
    hook: 'This is not a rule somebody made up. It is chemistry, and you can watch it happen.',
    teachingText:
      'A lot of what sticks to your hands is oily, and water slides straight past oil. Soap grabs oil at one end and water at the other, so it lifts the oil off and carries it away.',
    example:
      'Which is why washing up a greasy pan in plain water fails, and why the same pan comes clean with soap.',
    applyIt: {
      prompt: 'Soap works because it can hold on to:',
      choices: ['Only water', 'Both oil and water at once', 'Only oil', 'Neither'],
      answer: 1,
      feedback: [
        'Water alone would be enough then.',
        null,
        'Then it could not be rinsed away.',
        'It holds both.'
      ]
    }
  }
];

const L1_ACTIVITY = {
  title: 'Two hands, and a fair test',
  prep: 'Cooking oil, ground pepper, soap, a timer, and a sink.',
  needs: ['a little cooking oil', 'ground pepper', 'soap', 'a timer', 'her notebook'],
  steps: [
    'Rub a small amount of oil over both hands, then dip both into the pepper.',
    'Wash your LEFT hand under cold water with no soap, timing it for twenty seconds.',
    'Write down how much pepper is left, using words like most, some or almost none.',
    'Wash your RIGHT hand with soap for twenty seconds, timed the same way.',
    'Write down what is left, and write one sentence about why both hands had to be washed for the same time.'
  ],
  safety:
    'Cooking oil and cold tap water only. Nothing hot, nothing tasted, and nothing near eyes — pepper stings, so hands stay away from her face until they are properly clean.',
  minutes: 16
};

const L1_LEDGER = {
  prompt: 'Write down what you did to each hand, and what was different at the end.',
  ifSheIsStuck:
    'The twenty seconds is the part worth naming. Changing only ONE thing between the two hands is what makes it a fair test, and that is a bigger idea than the soap.'
};

// =========================================================== LESSON 2
const L2_CHECK_IN = {
  title: 'You are already defended',
  text: 'Germs land on you constantly and you are well most of the time.',
  question: 'Something is dealing with them without asking you. What do you think it is?'
};

const L2_BEATS = [
  {
    n: 1,
    label: 'The outside walls come first',
    hook: 'Most germs never get in at all, and never meet anything that could be called a fight.',
    teachingText:
      'Unbroken skin keeps almost everything out. Tears wash eyes. Sticky stuff in your nose traps what you breathe in. Strong stomach juice deals with a good deal of what you swallow.',
    example:
      'You have met every one of those already — the skin in Module 2, the stomach in Module 9. They were defences all along.',
    applyIt: {
      prompt: 'The first thing keeping germs out is:',
      choices: ['White blood cells', 'Unbroken skin and other barriers', 'A fever', 'Sleep'],
      answer: 1,
      feedback: [
        'Those come later, if something gets in.',
        null,
        'That comes later too.',
        'Sleep helps repair, not blocking.'
      ]
    }
  },
  {
    n: 2,
    label: 'Inside, white blood cells go looking',
    hook: 'You met these in Module 6 and they were waiting for this lesson.',
    teachingText:
      'White blood cells travel everywhere the blood goes. Some surround and swallow anything that does not belong. Others remember what they have met before, so the next time is faster.',
    example:
      'That memory is why you can catch some illnesses only once. Your body already knows the answer.',
    applyIt: {
      prompt: 'Some white blood cells remember past germs so that:',
      choices: ['You never get ill again', 'The next response is faster', 'You stop needing skin', 'Germs disappear'],
      answer: 1,
      feedback: [
        'They cannot remember one they have not met.',
        null,
        'Skin still does its job.',
        'Germs are still everywhere.'
      ]
    }
  }
];

const L2_ACTIVITY = {
  title: 'Draw the walls, in order',
  prep: 'Paper and coloured pencils.',
  needs: ['paper', 'coloured pencils', 'her notebook'],
  steps: [
    'Draw a simple outline of a person, big enough to write inside.',
    'Around the outside, label every barrier you can name: skin, tears, nose, stomach juice.',
    'Inside, draw the blood vessels and mark where the white blood cells travel.',
    'Number your barriers 1, 2 and 3 in the order a germ would meet them.',
    'Write one sentence saying which module each barrier first turned up in.'
  ],
  safety:
    'A general outline of a person, not a drawing of her or of anybody she knows. Nothing here is about how a body looks.',
  minutes: 13
};

const L2_LEDGER = {
  prompt: 'Write down three barriers on the outside and what white blood cells do on the inside.',
  ifSheIsStuck:
    'Skin, tears, stomach juice. And white blood cells surround what does not belong, then remember it. She already knew every part of this from earlier modules.'
};

// =========================================================== LESSON 3
const L3_CHECK_IN = {
  title: 'Warmer on purpose',
  text: 'When somebody is fighting off an illness their body often runs warmer than usual.',
  question: 'Do you think that is the illness doing it, or the body doing it?'
};

const L3_BEATS = [
  {
    n: 1,
    label: 'A fever is the body turning its own heat up',
    hook: 'It is not damage. It is a setting being changed.',
    teachingText:
      'Your brain holds your body at a steady warmth, like a thermostat on a wall. When white blood cells find something they do not like, they send a message that moves the setting higher.',
    example:
      'Many germs grow best at your normal warmth and struggle when it rises. Turning the heat up makes you a worse place to live.',
    applyIt: {
      prompt: 'A fever is:',
      choices: ['Damage caused by germs', 'The body raising its own setting', 'A sign the body has given up', 'Caused by cold weather'],
      answer: 1,
      feedback: [
        'The body is doing it on purpose.',
        null,
        'It is the opposite of giving up.',
        'Weather is not the cause.'
      ]
    }
  },
  {
    n: 2,
    label: 'Which is exactly why a grown-up decides, and not you',
    hook: 'Knowing what a fever is for does not tell you what to do about one.',
    teachingText:
      'A doctor uses a temperature as one clue among many, alongside how long it has lasted and everything else she can see. One number on its own does not answer anything.',
    example:
      'It is the same rule as the stethoscope in Module 8 and the pain in Module 12. You observe, you describe, and a grown-up decides.',
    applyIt: {
      prompt: 'If somebody feels unwell, the right thing to do is:',
      choices: ['Work out what they have', 'Tell a grown-up', 'Take their temperature yourself', 'Wait and see'],
      answer: 1,
      feedback: [
        'That is a doctor’s job, not yours.',
        null,
        'That is not your job either.',
        'Tell somebody first.'
      ]
    }
  }
];

const L3_ACTIVITY = {
  title: 'A thermostat you can watch',
  prep: 'A bowl of cool water, a bowl of warm tap water, a kitchen thermometer, and a timer.',
  needs: ['two bowls', 'a kitchen thermometer', 'a timer', 'her notebook'],
  steps: [
    'Put the thermometer in the cool water and write down what it reads.',
    'Move it to the warm water and start the timer at the same moment.',
    'Write down the reading every thirty seconds until it stops climbing.',
    'Write down what time it started, what time it stopped, and how long that was.',
    'Write one sentence about how long the thermometer took to catch up with the water.'
  ],
  safety:
    'WARM TAP WATER ONLY, run by a grown-up, never hot. A KITCHEN thermometer in a bowl — nothing goes in anybody’s mouth, and nobody’s temperature is taken in this lesson, including her own.',
  minutes: 15
};

const L3_LEDGER = {
  prompt: 'Write down your start time, your finish time, and the elapsed time between them.',
  ifSheIsStuck:
    'Fourth time this year for elapsed time. Two clock readings and the gap between them, with the unit on all three numbers.'
};

// =========================================================== LESSON 4
const L4_CHECK_IN = {
  title: 'The work happens at night',
  text: 'You spend about a third of your life asleep, and nothing about it is wasted time.',
  question: 'What do you think your body is doing while you are not using it?'
};

const L4_BEATS = [
  {
    n: 1,
    label: 'Sleep is when repair gets done',
    hook: 'Your body waits until you are out of the way.',
    teachingText:
      'While you sleep, cells divide and replace what wore out, healing carries on, and your brain sorts through the day. It is easier to do all of that when nothing else is being asked.',
    example:
      'A cut heals faster overnight than during a busy afternoon. The building work happens when the shop is shut.',
    applyIt: {
      prompt: 'Sleep is best described as:',
      choices: ['Wasted time', 'When repair and sorting get done', 'Only for children', 'The brain switching off'],
      answer: 1,
      feedback: [
        'A third of your life is not wasted.',
        null,
        'Everybody needs it.',
        'The brain is busy all night.'
      ]
    }
  },
  {
    n: 2,
    label: 'A body keeps time even when nothing tells it to',
    hook: 'You would still get sleepy at roughly the same time in a room with no windows and no clocks.',
    teachingText:
      'Your body runs a clock of its own, close to twenty-four hours long. Daylight nudges it each morning to keep it accurate, but it keeps running whether or not it is told.',
    example:
      'It is why flying a long way leaves people wide awake at three in the morning. Their clock has not caught up.',
    applyIt: {
      prompt: 'Your body’s own clock runs at roughly:',
      choices: ['Twelve hours', 'Twenty-four hours', 'A week', 'Whatever you decide'],
      answer: 1,
      feedback: [
        'Half the length.',
        null,
        'Far too long.',
        'It is not a decision.'
      ]
    }
  }
];

const L4_ACTIVITY = {
  title: 'A week of your own clock',
  prep: 'Paper, a pencil, and a ruler.',
  needs: ['paper', 'a pencil', 'a ruler', 'her notebook'],
  steps: [
    'Rule a table with seven rows for the days and three columns.',
    'Head the columns went to bed, woke up, and hours in between.',
    'Fill in the first two columns each day for a week, using the clock.',
    'Work out the third column yourself by counting on from bedtime to waking.',
    'At the end of the week, write down your longest night, your shortest, and the difference.'
  ],
  safety:
    'This records what actually happened. It is not a target and there is no number she is supposed to reach — bedtime is a grown-up’s decision and this table does not change it.',
  minutes: 14
};

const L4_LEDGER = {
  prompt: 'Write down your longest night, your shortest night, and the difference between them.',
  ifSheIsStuck:
    'Counting on across midnight is the hard part. From 9 at night to 7 in the morning is three hours to midnight and seven more, which is ten.'
};

// ---------------------------------------------------------------------------

export const HUMANBODY_M15 = [
  {
    id: 'body-m15-01',
    course: 'humanbody',
    module: 15,
    quarter: 4,
    week: 5,
    day: 1,
    n: 1,
    title: 'Germs, and why soap works',
    minutes: 30,
    spec: '§10 · beats',
    concept: 'Germs are living things too small to see and most do nothing to you, and soap lifts oily dirt away because it can hold oil and water at the same time.',
    standards: [],
    offGrade: 'A controlled comparison: twenty seconds timed on each hand, changing only one thing between them.',
    words: ['germ', 'bacteria', 'fair test'],
    glossary: [
      { word: 'germ', plain: 'A living thing too small to see that can sometimes make you ill.' },
      { word: 'bacteria', plain: 'Tiny living cells. Most are harmless and many are useful.' },
      { word: 'fair test', plain: 'A test where you change only one thing, so you know what caused the difference.' }
    ],
    video: {
      id: 'GGGtQLFPskQ',
      url: 'https://www.youtube.com/watch?v=GGGtQLFPskQ',
      title: 'Germs for kids | What are Germs? | How do germs spread? | How do we see germs?',
      channel: 'learning junction',
      minutes: 4,
      verified: '2026-08-18 · youtube.com/oembed · 3:53 read from the playlist duration badge',
      teaches: ['what germs are', 'how germs travel from place to place', 'why a microscope is needed to see them'],
      sourceGap:
        'OPEN. Searched: "germs handwashing immune system white blood cells for kids youtube SciShow Kids OR Operation Ouch OR Dr. Binocs", "washing hands germs how soap works for kids youtube SciShow Kids OR Smile and Learn OR Nemours" and "what are germs bacteria viruses for kids youtube Dr. Binocs OR SciShow Kids how germs spread" — returned learning junction, Peekaboo Kidz, CBeebies, Operation Ouch and Shaunna Evans, no Black-educator-led channel. Recorded unknown, not closed. Module 16 answers the requirement directly.'
    },
    checkIn: L1_CHECK_IN,
    beats: L1_BEATS,
    activity: L1_ACTIVITY,
    ledger: L1_LEDGER,
    hook: L1_CHECK_IN,
    core: L1_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L1_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'Do most germs make you ill?', answer: 'No. Most do nothing at all.', why: 'Some, like the gut ones, are useful.' },
      { ask: 'Why does soap beat water alone?', answer: 'It holds oil and water at once.', why: 'So the oily dirt is carried away.' }
    ],
    check: [
      {
        prompt: 'Most of the germs you meet:',
        choices: ['Make you ill', 'Do nothing to you at all', 'Are visible if you look', 'Live only outdoors'],
        answer: 1,
        feedback: ['Only a small number.', null, 'They need a microscope.', 'They are everywhere.']
      },
      {
        prompt: 'Soap works because it can hold on to:',
        choices: ['Only water', 'Only oil', 'Both oil and water at once', 'Neither'],
        answer: 2,
        feedback: ['Water alone would do.', 'Then it could not rinse.', null, 'It holds both.']
      },
      {
        prompt: 'Both hands were washed for twenty seconds so that:',
        choices: ['It was quicker', 'Only one thing differed between them', 'It looked tidier', 'The timer was used'],
        answer: 1,
        feedback: ['Speed is not the point.', null, 'Tidiness is not the point.', 'The timer served the fairness.']
      }
    ]
  },
  {
    id: 'body-m15-02',
    course: 'humanbody',
    module: 15,
    quarter: 4,
    week: 5,
    day: 2,
    n: 2,
    title: 'The walls you already have',
    minutes: 30,
    spec: '§10 · beats',
    concept: 'Barriers like skin, tears and stomach juice keep almost everything out, and white blood cells deal with what gets past and remember it afterwards.',
    standards: [],
    offGrade: null,
    words: ['barrier', 'white blood cell', 'memory'],
    glossary: [
      { word: 'barrier', plain: 'Something that stops other things getting through.' },
      { word: 'white blood cell', plain: 'A blood cell whose job is finding and dealing with what does not belong.' },
      { word: 'memory', plain: 'Keeping something so it can be used again later.' }
    ],
    video: {
      id: 'azE3rv5l28Y',
      url: 'https://www.youtube.com/watch?v=azE3rv5l28Y',
      title: 'How Does Your Immune System Works?| What Is Immune System? | The Dr Binocs Show | Peekaboo Kidz',
      channel: 'Peekaboo Kidz',
      minutes: 6,
      verified: '2026-08-18 · youtube.com/oembed · 6:10 read from the playlist duration badge',
      teaches: ['the barriers that keep germs out', 'what white blood cells do', 'why the second time is faster'],
      sourceGap: 'OPEN. Same searches as body-m15-01 and body-m1-01, both written down there.'
    },
    checkIn: L2_CHECK_IN,
    beats: L2_BEATS,
    activity: L2_ACTIVITY,
    ledger: L2_LEDGER,
    hook: L2_CHECK_IN,
    core: L2_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L2_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'What stops most germs first?', answer: 'Unbroken skin and other barriers.', why: 'Most never get inside at all.' },
      { ask: 'Why is the second time faster?', answer: 'Some white blood cells remember.', why: 'The body already knows the answer.' }
    ],
    check: [
      {
        prompt: 'The first thing keeping germs out is:',
        choices: ['White blood cells', 'A fever', 'Sleep', 'Unbroken skin and other barriers'],
        answer: 3,
        feedback: ['Those come later.', 'That comes later too.', 'Sleep repairs, not blocks.', null]
      },
      {
        prompt: 'Some white blood cells remember past germs so that:',
        choices: ['The next response is faster', 'You never get ill again', 'You stop needing skin', 'Germs disappear'],
        answer: 0,
        feedback: [null, 'Only ones they have met.', 'Skin still works.', 'Germs are still there.']
      },
      {
        prompt: 'Which of these is a barrier you met in an earlier module?',
        choices: ['Strong stomach juice', 'A fever', 'A reflex', 'A growth band'],
        answer: 0,
        feedback: [null, 'That is not a barrier.', 'That protects differently.', 'That is about growing.']
      }
    ]
  },
  {
    id: 'body-m15-03',
    course: 'humanbody',
    module: 15,
    quarter: 4,
    week: 6,
    day: 1,
    n: 3,
    title: 'Why a fever happens',
    minutes: 30,
    spec: '§10 · beats',
    concept: 'A fever is the body deliberately raising its own thermostat setting, and knowing that is not the same as knowing what to do — a grown-up decides.',
    standards: [],
    offGrade: 'Elapsed time across a timed reading, plus reading a scale. Elapsed time scored 0 of 1 on her Check-In.',
    words: ['fever', 'thermostat', 'clue'],
    glossary: [
      { word: 'fever', plain: 'When the body runs warmer than usual on purpose.' },
      { word: 'thermostat', plain: 'A thing that holds a temperature steady at a setting.' },
      { word: 'clue', plain: 'Something that helps you work out an answer, without proving it.' }
    ],
    video: {
      id: 'BqOaG9VuP_I',
      url: 'https://www.youtube.com/watch?v=BqOaG9VuP_I',
      title: 'Why Do We Get a Fever? | The Dr. Binocs Show | Best Learning Videos For Kids | Peekaboo Kidz',
      channel: 'Peekaboo Kidz',
      minutes: 5,
      verified: '2026-08-18 · youtube.com/oembed · 4:40 read from the playlist duration badge',
      teaches: ['what a fever actually is', 'that the body raises its own setting', 'why warmth makes life harder for germs'],
      sourceGap: 'OPEN. Same searches as body-m15-01 and body-m1-01, both written down there.'
    },
    checkIn: L3_CHECK_IN,
    beats: L3_BEATS,
    activity: L3_ACTIVITY,
    ledger: L3_LEDGER,
    hook: L3_CHECK_IN,
    core: L3_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L3_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'What is a fever?', answer: 'The body raising its own setting.', why: 'Not damage — a change of setting.' },
      { ask: 'Who decides what to do about one?', answer: 'A grown-up, and then a doctor.', why: 'One number answers nothing on its own.' }
    ],
    check: [
      {
        prompt: 'A fever is:',
        choices: ['The body raising its own setting', 'Damage caused by germs', 'A sign the body gave up', 'Caused by cold weather'],
        answer: 0,
        feedback: [null, 'The body does it on purpose.', 'The opposite of giving up.', 'Weather is not the cause.']
      },
      {
        prompt: 'If somebody feels unwell, the right thing to do is:',
        choices: ['Work out what they have', 'Take their temperature yourself', 'Tell a grown-up', 'Wait and see'],
        answer: 2,
        feedback: ['That is a doctor’s job.', 'That is not your job.', null, 'Tell somebody first.']
      },
      {
        prompt: 'A reading starts at 2:15 and stops climbing at 2:19. That is:',
        choices: ['4 minutes', '34 minutes', '2 minutes', '19 minutes'],
        answer: 0,
        feedback: [null, 'That is adding them.', 'Count again.', 'That is the end reading.']
      }
    ]
  },
  {
    id: 'body-m15-04',
    course: 'humanbody',
    module: 15,
    quarter: 4,
    week: 6,
    day: 2,
    n: 4,
    title: 'What sleep is for',
    minutes: 30,
    spec: '§10 · beats',
    concept: 'Sleep is when repair and sorting get done, and the body runs a clock of its own about twenty-four hours long whether or not anything tells it the time.',
    standards: [],
    offGrade: 'Elapsed time across midnight, tabulated for seven days, then largest minus smallest.',
    words: ['repair', 'body clock', 'daylight'],
    glossary: [
      { word: 'repair', plain: 'Mending what has worn out or been damaged.' },
      { word: 'body clock', plain: 'The rhythm your body keeps on its own, close to a day long.' },
      { word: 'daylight', plain: 'Light from the sun, which nudges your body clock each morning.' }
    ],
    video: {
      id: 'CoCL0IB4u4g',
      url: 'https://www.youtube.com/watch?v=CoCL0IB4u4g',
      title: 'Why Do We Sleep? The Dr. Binocs Show | Best Learning Videos For Kids | Peekaboo Kidz',
      channel: 'Peekaboo Kidz',
      minutes: 6,
      verified: '2026-08-18 · youtube.com/oembed · 5:47 read from the playlist duration badge',
      teaches: ['what the body does during sleep', 'that the brain stays busy', 'that the body keeps its own rhythm'],
      sourceGap: 'OPEN. Same searches as body-m15-01 and body-m1-01, both written down there.'
    },
    checkIn: L4_CHECK_IN,
    beats: L4_BEATS,
    activity: L4_ACTIVITY,
    ledger: L4_LEDGER,
    hook: L4_CHECK_IN,
    core: L4_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L4_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'What happens during sleep?', answer: 'Repair, replacing and sorting.', why: 'Easier when nothing else is asked.' },
      { ask: 'How long is the body’s own clock?', answer: 'About twenty-four hours.', why: 'Daylight nudges it accurate each morning.' }
    ],
    check: [
      {
        prompt: 'Sleep is best described as:',
        choices: ['Wasted time', 'Only for children', 'The brain switching off', 'When repair and sorting get done'],
        answer: 3,
        feedback: ['A third of a life is not waste.', 'Everybody needs it.', 'The brain is busy.', null]
      },
      {
        prompt: 'Your body’s own clock runs at roughly:',
        choices: ['Twelve hours', 'A week', 'Twenty-four hours', 'Whatever you decide'],
        answer: 2,
        feedback: ['Half the length.', 'Far too long.', null, 'Not a decision.']
      },
      {
        prompt: 'From 9 at night to 7 in the morning is:',
        choices: ['10 hours', '2 hours', '16 hours', '9 hours'],
        answer: 0,
        feedback: [null, 'Count on across midnight.', 'That is adding them.', 'That is the start time.']
      }
    ]
  }
];

export const HUMANBODY_M15_META = {
  courseId: 'humanbody',
  module: 15,
  title: 'Staying Well',
  blurb:
    'A real controlled experiment run on her own two hands with oil, pepper and a timer, the discovery that every defence she has was taught in an earlier module, and a fever explained as something the body does on purpose.'
};

export function humanbodyM15LessonById(id) {
  return HUMANBODY_M15.find((l) => l.id === id) || null;
}

export default HUMANBODY_M15;
