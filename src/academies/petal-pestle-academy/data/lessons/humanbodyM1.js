// ---------------------------------------------------------------------------
// THE HUMAN BODY · MODULE 1 — WHAT A DOCTOR DOES FIRST
//
// Four lessons. Quarter 1, weeks 1 and 2. Tuesday and Thursday, 30 minutes.
//
// ---- WHAT THIS COURSE IS, AND WHAT IT IS NOT ----
//
// It carries NO Georgia standard. Herbalism owns ten of the state's twenty-five
// fourth-grade science elements and The Science Lab owns the other fifteen, so
// her science requirement is already met twice over. This course is enrichment,
// and it was deliberately written last.
//
// That freedom is the reason it is built as WHAT A DOCTOR DOES rather than as a
// list of organ systems. Azianna wants to be a doctor. Every module ends in an
// action a doctor actually performs, and this first one ends with her taking a
// pulse.
//
// ---- THE MEASUREMENT, AND WHY IT IS HERE ----
//
// Her Check-In put Geometry at 2.00 and Measurement & Data at 2.00 — both hit
// the FLOOR of the test, which is a limit of the item bank rather than a
// reading of her. The detail underneath is precise and it is good news: units
// 0 of 3, elapsed time 0 of 1, perimeter 0 of 3, area 0 of 2. She has never
// been taught these. They are blanks, not weaknesses.
//
// Her body is a free measuring instrument, so the measurement lives here — in
// the ACTIVITY, never in the prose. Counting a pulse for 15 seconds and
// multiplying by 4 is this module's, and it feeds her Khan unit *Intro to
// multiplication* at the same time.
//
// ---- HER LEVEL GOVERNS EVERY SENTENCE ----
//
// Quarter 1 cap: 11 words per sentence. Her Grammar & Usage measured 2.15 and
// her Reading 3.46 is a LISTENING score — 10 of her 13 reading questions were
// read aloud. So the prose here is short on purpose, and the video sits above
// it since v3.41.
//
// ---- SAFETY, AND IT IS NOT NEGOTIABLE ----
//
// No dosing. No "take this for that". No self-treatment. NO WEIGHT, no body
// composition, nothing about appearance. AND NOTHING THAT TEACHES HER TO
// DIAGNOSE HERSELF OR HER FAMILY. A pulse is counted here because counting is
// arithmetic and because doctors do it — never so she can decide whether a
// number is wrong. Every lesson below says so where it could be misread.
// ---------------------------------------------------------------------------

// =========================================================== LESSON 1
const L1_CHECK_IN = {
  title: 'What does a doctor do first?',
  text: 'Think of the last time you saw a doctor. Before any medicine. Before anything else.',
  question: 'What did they do first — did they talk, or look, or touch?'
};

const L1_BEATS = [
  {
    n: 1,
    label: 'A doctor looks before anything else',
    hook: 'A doctor learns most of it before they touch you at all.',
    teachingText:
      'A doctor watches you walk in. They watch how you breathe. They look at your face and your hands. All of that is called observing. It is the first tool, and it is free.',
    example:
      'A doctor can often tell you have run there. Your cheeks are pink. You are breathing fast. Nobody had to say a word.',
    applyIt: {
      prompt: 'A doctor watches you walk into the room. What is that called?',
      choices: ['Guessing', 'Observing', 'Treating', 'Waiting'],
      answer: 1,
      feedback: [
        'A guess has nothing behind it. This has looking behind it.',
        null,
        'Treating comes much later.',
        'She is not waiting. She is working.'
      ]
    }
  },
  {
    n: 2,
    label: 'Then they ask, and then they measure',
    hook: 'The three steps have an order, and the order almost never changes.',
    teachingText:
      'First they observe. Then they ask you questions. Then they measure things. Measuring means numbers — how warm you are, how fast your heart goes. Numbers can be written down and compared later.',
    example:
      'Your grandmother can say you feel warm. A thermometer says 38 degrees. Next week she can compare the number.',
    applyIt: {
      prompt: 'Why write a number down instead of just saying "warm"?',
      choices: [
        'Numbers are tidier',
        'So you can compare it another day',
        'Doctors like maths',
        'Warm is a rude word'
      ],
      answer: 1,
      feedback: [
        'Tidy is not the reason.',
        null,
        'Some do. That is still not the reason.',
        'It is not rude. It is just vague.'
      ]
    }
  }
];

const L1_ACTIVITY = {
  title: 'Be the doctor at the door',
  prep: 'Nothing to prepare. You need one willing grown-up.',
  needs: ['her notebook', 'a pencil', 'a grown-up to observe'],
  steps: [
    'Ask a grown-up to walk into the room normally.',
    'Write down five things you noticed. Only things you SAW.',
    'Now ask them three questions about how they feel today.',
    'Write down which you learned more from — looking, or asking.',
    'Do it again with somebody else. Compare your two lists.'
  ],
  safety:
    'This is a game about noticing, not about finding anything wrong. You are not deciding whether anybody is ill. That is a real doctor’s job and nobody else’s.',
  minutes: 12
};

const L1_LEDGER = {
  prompt: 'Write down one thing you noticed about somebody without asking them anything.',
  ifSheIsStuck:
    'Ask her what she can tell about you right now, just by looking. Tired? Warm? In a hurry? Any of those is a real observation, and she made it without a single question.'
};

// =========================================================== LESSON 2
const L2_CHECK_IN = {
  title: 'Find it with two fingers',
  text: 'Put two fingers on the side of your neck, just under your jaw. Press gently. Wait.',
  question: 'Something under your fingers is moving. What do you think it is?'
};

const L2_BEATS = [
  {
    n: 1,
    label: 'Your heart is a muscle that squeezes',
    hook: 'Your heart is about the size of your own fist. Make one and look.',
    teachingText:
      'Your heart is a muscle. It squeezes, then it rests, then it squeezes again. Every squeeze pushes blood out into your body. It has been doing that since before you were born.',
    example:
      'Squeeze a wet sponge over a bowl. Water shoots out. Let go and it fills again. Your heart does that, all day.',
    applyIt: {
      prompt: 'What does your heart actually do?',
      choices: ['It squeezes', 'It thinks', 'It breathes', 'It holds still'],
      answer: 0,
      feedback: [
        null,
        'Your brain thinks. Your heart pumps.',
        'Your lungs breathe.',
        'It never holds still. Not once.'
      ]
    }
  },
  {
    n: 2,
    label: 'A pulse is that squeeze, felt far away',
    hook: 'You can feel your heart in your wrist, and your wrist is nowhere near your heart.',
    teachingText:
      'Each squeeze sends blood along tubes. The tubes push out a little as it passes. Where a tube runs near your skin, you can feel that push. That is your pulse. One pulse means one squeeze.',
    example:
      'Your neck and your wrist both work. Two fingers, never your thumb — your thumb has a pulse of its own and it confuses you.',
    applyIt: {
      prompt: 'One beat of your pulse means what?',
      choices: [
        'One breath',
        'One squeeze of your heart',
        'One second going by',
        'One step you took'
      ],
      answer: 1,
      feedback: [
        'Breathing is your lungs.',
        null,
        'A pulse is not a clock. It changes speed.',
        'You can feel it sitting still.'
      ]
    }
  }
];

const L2_ACTIVITY = {
  title: 'Find yours, then find somebody else’s',
  prep: 'Nothing to prepare.',
  needs: ['two fingers', 'her notebook', 'a willing grown-up'],
  steps: [
    'Find your pulse on your wrist. Two fingers, not your thumb.',
    'Now find it on your neck, under your jaw.',
    'Write down which one was easier for you to feel.',
    'Find a grown-up’s pulse on their wrist.',
    'Say out loud what each beat means. One beat, one squeeze.'
  ],
  safety:
    'Press gently. Never press on both sides of a neck at once, and never press hard. If you cannot find it, move your fingers a little — do not push harder.',
  minutes: 12
};

const L2_LEDGER = {
  prompt: 'Where was your pulse easiest to find, and how did you know you had it?',
  ifSheIsStuck:
    'Ask her to describe the feeling rather than name it. Tapping? Pushing? Bumping? Whatever word she picks is hers, and it is the right one.'
};

// =========================================================== LESSON 3
const L3_CHECK_IN = {
  title: 'Too many to count',
  text: 'Find your pulse. Now try to count every beat for a whole minute without losing it.',
  question: 'That was hard. Can you think of a shorter way to get the same answer?'
};

const L3_BEATS = [
  {
    n: 1,
    label: 'Count fifteen seconds, then multiply by four',
    hook: 'Doctors almost never count for a whole minute. They are busy.',
    teachingText:
      'A minute has 60 seconds. Fifteen seconds is a quarter of that. So count the beats in 15 seconds, then multiply by 4. You get the beats in one minute without counting for one minute.',
    example:
      'You count 19 beats in 15 seconds. 19 × 4 = 76. Your heart beats about 76 times a minute.',
    applyIt: {
      prompt: 'You count 20 beats in 15 seconds. How many in a minute?',
      choices: ['20', '40', '60', '80'],
      answer: 3,
      feedback: [
        'That is only the 15 seconds.',
        'That is doubled, not multiplied by 4.',
        'Close, but 15 goes into 60 four times.',
        null
      ]
    }
  },
  {
    n: 2,
    label: 'Why four, and not some other number',
    hook: 'The 4 is not a rule somebody made up. It is in the clock.',
    teachingText:
      'Fifteen seconds fits into sixty seconds exactly four times. That is where the 4 comes from. If you counted for 30 seconds you would multiply by 2 instead, because 30 fits into 60 twice.',
    example:
      'Count for 30 seconds and get 38. Then 38 × 2 = 76. The same answer, a different route.',
    applyIt: {
      prompt: 'If you counted for 30 seconds, what would you multiply by?',
      choices: ['2', '4', '15', '30'],
      answer: 0,
      feedback: [
        null,
        '4 is for a 15-second count.',
        '15 is a number of seconds, not a multiplier.',
        'That would give you half an hour of beats.'
      ]
    }
  }
];

const L3_ACTIVITY = {
  title: 'Fifteen seconds, times four',
  prep: 'Find a clock or a timer with seconds on it.',
  needs: ['a timer with seconds', 'her notebook', 'a pencil'],
  steps: [
    'Sit still for one whole minute first. Do not skip this.',
    'Count your pulse beats for exactly 15 seconds. Write the number down.',
    'Multiply it by 4. Write that down too. Show your working.',
    'Now count for 30 seconds and multiply by 2.',
    'Are the two answers close? Write down both, and the difference.'
  ],
  safety:
    'Numbers between people are all different and all fine. This is arithmetic practice, not a test of your body, and nothing here says whether a number is good or bad.',
  minutes: 14
};

const L3_LEDGER = {
  prompt: 'Write your two answers and say which way you liked better, and why.',
  ifSheIsStuck:
    'Ask which count was easier to keep hold of. Fifteen seconds is short enough not to lose your place; thirty is more counting but less multiplying. Either preference is a real answer.'
};

// =========================================================== LESSON 4
const L4_CHECK_IN = {
  title: 'Make it change',
  text: 'Take your pulse sitting down. Then run on the spot for one minute. Take it again.',
  question: 'The number changed. What do you think your body was doing?'
};

const L4_BEATS = [
  {
    n: 1,
    label: 'Working muscles ask for more',
    hook: 'Your heart speeds up before you even finish standing.',
    teachingText:
      'Muscles need oxygen to work. Blood carries oxygen. When you run, your muscles need more, so your heart squeezes faster to send more. Faster pulse means harder work.',
    example:
      'Walking upstairs speeds it up a little. Running upstairs speeds it up a lot. Your heart is answering your legs.',
    applyIt: {
      prompt: 'Why does your heart speed up when you run?',
      choices: [
        'Because you are excited',
        'Because your muscles need more oxygen',
        'Because you are breathing',
        'Because you are standing up'
      ],
      answer: 1,
      feedback: [
        'Excitement can too. Running is about the muscles.',
        null,
        'Breathing helps, but the muscles are the reason.',
        'Standing changes it a little. Running changes it a lot.'
      ]
    }
  },
  {
    n: 2,
    label: 'And then it comes back down',
    hook: 'How fast it comes down is its own piece of information.',
    teachingText:
      'When you stop, your muscles need less. Your heart slows down again. It does not drop all at once. It takes a few minutes to settle back to where it started.',
    example:
      'Take it right after running, then a minute later, then a minute after that. Three numbers, going down.',
    applyIt: {
      prompt: 'You stop running. What happens to your pulse?',
      choices: [
        'It stops',
        'It stays fast for ever',
        'It slows down over a few minutes',
        'It drops instantly'
      ],
      answer: 2,
      feedback: [
        'It never stops. Not while you are alive.',
        'It settles back down.',
        null,
        'Not instantly. Take it again a minute later and see.'
      ]
    }
  }
];

const L4_ACTIVITY = {
  title: 'Three numbers, and a line going down',
  prep: 'Somewhere safe to run on the spot. A timer with seconds.',
  needs: ['a timer', 'her notebook', 'squared paper if she has it'],
  steps: [
    'Sitting still, count 15 seconds and multiply by 4. Write it down.',
    'Run on the spot for one minute.',
    'Count again straight away. 15 seconds, times 4. Write it down.',
    'Wait one minute. Count again. Wait another minute. Count again.',
    'You have four numbers now. Put them in order and see the shape.'
  ],
  safety:
    'Stop if you feel dizzy or out of breath, and sit down. This is about the numbers changing, not about pushing hard, and it is nothing to do with how fit anybody is.',
  minutes: 14
};

const L4_LEDGER = {
  prompt: 'Write your four numbers in order. Then write one sentence about the shape they make.',
  ifSheIsStuck:
    'Ask her to read the four numbers out loud in order. The word she reaches for — climbed, jumped, dropped, settled — is the sentence. She does not need the word "recovery".'
};

// ---------------------------------------------------------------------------

export const HUMANBODY_M1 = [
  {
    id: 'body-m1-01',
    course: 'humanbody',
    module: 1,
    quarter: 1,
    week: 1,
    day: 1,
    n: 1,
    title: 'What a doctor does first',
    minutes: 30,
    spec: '§10 · beats',
    concept:
      'A doctor observes first, then asks, then measures — and measuring means a number you can compare later.',
    standards: [],
    offGrade: null,
    words: ['observe', 'measure', 'compare'],
    glossary: [
      { word: 'observe', plain: 'To look carefully and notice things. No touching needed.' },
      { word: 'measure', plain: 'To find out how much of something there is, as a number.' },
      { word: 'compare', plain: 'To put two things side by side and see how they differ.' }
    ],
    video: {
      id: '_w33mjdN6gM',
      url: 'https://www.youtube.com/watch?v=_w33mjdN6gM',
      title:
        "Let's Go To The Doctor! | Caitie's Classroom Field Trip | First Time Experience for Kids",
      channel: 'Super Simple Play with Caitie!',
      minutes: 9,
      verified: '2026-08-17 · youtube.com/oembed · length read from the duration badge',
      teaches: [
        'what happens at a check-up, in order',
        'the tools a doctor uses and what each one is for',
        'that a check-up is measuring, not treating'
      ],
      sourceGap:
        'OPEN. No Black American educator found for elementary "what a doctor does". Searched: "Black educator YouTube channel human body anatomy for kids elementary science" — returned Kenhub, Institute of Human Anatomy and generic compilations, and the search tool stated outright that no Black-educator-led channel matched. Also searched "Seed of Melanin Kids" and "The Magic In Me TV" for human-body content — both channels are real and already recorded as likely from Social Studies Quarter 3, and neither has human-body material these searches surfaced. Module 16 carries Black women in medicine, which is not a substitute for this and does not close it.'
    },
    checkIn: L1_CHECK_IN,
    beats: L1_BEATS,
    activity: L1_ACTIVITY,
    ledger: L1_LEDGER,
    hook: L1_CHECK_IN,
    core: L1_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L1_ACTIVITY.steps.join(' '),
    practice: [
      {
        ask: 'What is the first thing a doctor does?',
        answer: 'Observes — looks and notices.',
        why: 'Before any question and before any tool.'
      },
      {
        ask: 'Why is a number better than the word "warm"?',
        answer: 'You can compare it another day.',
        why: '"Warm" cannot be compared with last week.'
      }
    ],
    check: [
      {
        prompt: 'A doctor watches how you walk in. That is:',
        choices: ['Treating', 'Observing', 'Measuring', 'Guessing'],
        answer: 1,
        feedback: ['Treating comes later.', null, 'Measuring needs a number.', 'Looking is not guessing.']
      },
      {
        prompt: 'Which one of these gives you a number?',
        choices: ['Looking at someone', 'Asking how they slept', 'Using a thermometer', 'Saying they seem tired'],
        answer: 2,
        feedback: ['Looking gives you a description.', 'An answer, not a number.', null, 'That is an observation.'],
      },
      {
        prompt: 'The order a doctor works in is:',
        choices: [
          'Measure, observe, ask',
          'Ask, measure, observe',
          'Observe, ask, measure',
          'It changes every time'
        ],
        answer: 2,
        feedback: [
          'Measuring is last, not first.',
          'Observing starts before anybody speaks.',
          null,
          'It is almost always the same order.'
        ]
      }
    ]
  },
  {
    id: 'body-m1-02',
    course: 'humanbody',
    module: 1,
    quarter: 1,
    week: 1,
    day: 2,
    n: 2,
    title: 'Your heart, and where you can feel it',
    minutes: 30,
    spec: '§10 · beats',
    concept:
      'The heart is a muscle that squeezes, and a pulse is one squeeze felt where a tube runs near the skin.',
    standards: [],
    offGrade: null,
    words: ['heart', 'pulse', 'squeeze'],
    glossary: [
      { word: 'heart', plain: 'A muscle in your chest, about the size of your fist.' },
      { word: 'pulse', plain: 'The push you can feel each time your heart squeezes.' },
      { word: 'squeeze', plain: 'To press together. Your heart does it and blood goes out.' }
    ],
    video: {
      id: 'tF9-jLZNM10',
      url: 'https://www.youtube.com/watch?v=tF9-jLZNM10',
      title: 'How to Feel Your Heart Beat',
      channel: 'SciShow Kids',
      minutes: 4,
      verified: '2026-08-17 · youtube.com/oembed · length read from the duration badge',
      teaches: [
        'that the heart is a muscle',
        'where a pulse can be felt',
        'how to take your own pulse'
      ],
      sourceGap:
        'OPEN. Same two searches as lesson 1, both written down there. Nothing Black-led found at a child’s level for the heart and pulse.'
    },
    checkIn: L2_CHECK_IN,
    beats: L2_BEATS,
    activity: L2_ACTIVITY,
    ledger: L2_LEDGER,
    hook: L2_CHECK_IN,
    core: L2_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L2_ACTIVITY.steps.join(' '),
    practice: [
      {
        ask: 'What does one pulse beat mean?',
        answer: 'One squeeze of your heart.',
        why: 'The beat and the squeeze are the same event.'
      },
      {
        ask: 'Why not use your thumb to feel a pulse?',
        answer: 'Your thumb has a pulse of its own.',
        why: 'You end up counting two things at once.'
      }
    ],
    check: [
      {
        prompt: 'Your heart is a:',
        choices: ['Bone', 'Muscle', 'Tube', 'Kind of blood'],
        answer: 1,
        feedback: ['Bones do not squeeze.', null, 'Tubes carry the blood it pushes.', 'It moves blood, it is not blood.']
      },
      {
        prompt: 'You feel a pulse in your wrist. Why there?',
        choices: [
          'Your wrist has a small heart',
          'A tube runs near the skin there',
          'Wrists are always warm',
          'Blood is stored in your wrist'
        ],
        answer: 1,
        feedback: ['You have one heart.', null, 'Warmth is not the reason.', 'Blood keeps moving. It is not stored.']
      },
      {
        prompt: 'Which fingers should you use?',
        choices: ['Your thumb', 'Two fingers, not your thumb', 'Your whole hand', 'Any one finger, pressed hard'],
        answer: 1,
        feedback: ['Your thumb has its own pulse.', null, 'Too much of it to feel one spot.', 'Pressing hard hides it.']
      }
    ]
  },
  {
    id: 'body-m1-03',
    course: 'humanbody',
    module: 1,
    quarter: 1,
    week: 2,
    day: 1,
    n: 3,
    title: 'Fifteen seconds, times four',
    minutes: 30,
    spec: '§10 · beats',
    concept:
      'Fifteen seconds fits into a minute four times, so counting for 15 and multiplying by 4 gives beats per minute.',
    standards: [],
    offGrade: null,
    words: ['multiply', 'seconds', 'minute'],
    glossary: [
      { word: 'multiply', plain: 'To add a number to itself a set number of times.' },
      { word: 'seconds', plain: 'Small pieces of time. Sixty of them make a minute.' },
      { word: 'minute', plain: 'Sixty seconds.' }
    ],
    video: {
      id: 'wzdVUSVObOw',
      url: 'https://www.youtube.com/watch?v=wzdVUSVObOw',
      title: 'Brain Bites- Heart Rate',
      channel: 'Lynn Hefele',
      minutes: 5,
      verified: '2026-08-17 · youtube.com/oembed · length read from the duration badge',
      teaches: [
        'taking your own pulse',
        'counting for part of a minute and multiplying up',
        'what a heart rate number means'
      ],
      sourceGap:
        'OPEN. Same two searches as lesson 1. Identity of this channel is UNKNOWN and is recorded as unknown, not as a gap closed.'
    },
    checkIn: L3_CHECK_IN,
    beats: L3_BEATS,
    activity: L3_ACTIVITY,
    ledger: L3_LEDGER,
    hook: L3_CHECK_IN,
    core: L3_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L3_ACTIVITY.steps.join(' '),
    practice: [
      {
        ask: '18 beats in 15 seconds. How many in a minute?',
        answer: '72.',
        why: '18 × 4, because 15 goes into 60 four times.'
      },
      {
        ask: 'Where does the 4 come from?',
        answer: 'Sixty seconds divided by fifteen.',
        why: 'The multiplier comes out of the clock.'
      }
    ],
    check: [
      {
        prompt: 'You count 15 beats in 15 seconds. Beats in a minute?',
        choices: ['15', '30', '45', '60'],
        answer: 3,
        feedback: ['That is the 15 seconds.', 'That is × 2.', 'That is × 3.', null]
      },
      {
        prompt: 'Why multiply by 4?',
        choices: [
          'Because 15 fits into 60 four times',
          'Because hearts beat in fours',
          'Because 4 is easy',
          'Because there are 4 seasons'
        ],
        answer: 0,
        feedback: [null, 'They do not.', 'Easy is not a reason.', 'Nothing to do with it.']
      },
      {
        prompt: 'Counting for 30 seconds instead, you would multiply by:',
        choices: ['4', '3', '2', '30'],
        answer: 2,
        feedback: ['4 is for 15 seconds.', '20 seconds would be × 3.', null, 'That is the seconds, not the multiplier.']
      }
    ]
  },
  {
    id: 'body-m1-04',
    course: 'humanbody',
    module: 1,
    quarter: 1,
    week: 2,
    day: 2,
    n: 4,
    title: 'Making your pulse change',
    minutes: 30,
    spec: '§10 · beats',
    concept:
      'Working muscles need more oxygen, so the heart speeds up — and it settles back down over a few minutes.',
    standards: [],
    offGrade: null,
    words: ['oxygen', 'faster', 'settle'],
    glossary: [
      { word: 'oxygen', plain: 'Part of the air. Your muscles need it to work.' },
      { word: 'faster', plain: 'More beats in the same amount of time.' },
      { word: 'settle', plain: 'To go back down slowly to where it started.' }
    ],
    video: {
      id: 'RiWr69OzfPo',
      url: 'https://www.youtube.com/watch?v=RiWr69OzfPo',
      title:
        'Science for kids - Measuring Heart Rate | Body Parts | Experiments for kids | Operation Ouch',
      channel: 'Operation Ouch',
      minutes: 4,
      verified: '2026-08-17 · youtube.com/oembed · length read from the duration badge',
      teaches: [
        'measuring heart rate before and after activity',
        'why the heart speeds up when the body works',
        'that the rate comes back down afterwards'
      ],
      sourceGap:
        'OPEN. Same two searches as lesson 1. Operation Ouch is a CBBC production; no Black American educator found for this content.'
    },
    checkIn: L4_CHECK_IN,
    beats: L4_BEATS,
    activity: L4_ACTIVITY,
    ledger: L4_LEDGER,
    hook: L4_CHECK_IN,
    core: L4_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L4_ACTIVITY.steps.join(' '),
    practice: [
      {
        ask: 'Why does your heart speed up when you run?',
        answer: 'Your muscles need more oxygen.',
        why: 'Blood carries it, so more blood must go.'
      },
      {
        ask: 'What happens after you stop?',
        answer: 'It slows down over a few minutes.',
        why: 'Not instantly. That is why you take it three times.'
      }
    ],
    check: [
      {
        prompt: 'Running makes your pulse:',
        choices: ['Slower', 'Faster', 'Stop', 'Stay the same'],
        answer: 1,
        feedback: ['The opposite.', null, 'Never.', 'Take it and see.']
      },
      {
        prompt: 'Blood carries oxygen to your:',
        choices: ['Hair', 'Muscles', 'Fingernails', 'Clothes'],
        answer: 1,
        feedback: ['Hair does not work for a living.', null, 'Nails are not muscle.', 'Not part of you at all.']
      },
      {
        prompt: 'One minute after you stop running, your pulse is:',
        choices: [
          'Back exactly where it started',
          'Faster than while running',
          'On its way down but not there yet',
          'Stopped'
        ],
        answer: 2,
        feedback: ['It takes longer than that.', 'You have stopped working.', null, 'Never.']
      }
    ]
  }
];

export const HUMANBODY_M1_META = {
  courseId: 'humanbody',
  module: 1,
  title: 'What a Doctor Does First',
  blurb:
    'Observing before touching, the heart as a muscle you can feel, and counting a pulse in fifteen seconds and multiplying by four.'
};

export function humanbodyM1LessonById(id) {
  return HUMANBODY_M1.find((l) => l.id === id) || null;
}

export default HUMANBODY_M1;
