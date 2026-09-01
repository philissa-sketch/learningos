// ---------------------------------------------------------------------------
// THE HUMAN BODY · MODULE 16 — BLACK WOMEN IN MEDICINE
//
// Four lessons. Quarter 4, weeks 7 and 8. The last four lessons of the course
// and the last four lessons Petal & Pestle Academy owes.
//
// ---- WHY THIS MODULE IS PLACED LAST, AND WHY THAT IS NOT AN AFTERTHOUGHT ----
//
// Azianna is nine, Black, American, and intends to be a doctor. Fifteen modules
// have taught her a body. This one tells her who did the teaching, and every
// person in it is a Black American woman who did the thing she says she wants
// to do.
//
// It is last because it is the pay-off, not the preface. She meets Dr. Bath
// AFTER she has found her own blind spot with a card, and Dr. Canady AFTER she
// has done a two-point test on her own skin. The work comes first and then the
// people, so that when she is told a Black woman invented the laser that fixes
// cataracts she already knows what a lens is.
//
// ---- WHAT THIS MODULE IS NOT ----
//
// It is not a Black History Month unit bolted onto a science course, and it is
// not about suffering. Each lesson leads with WHAT SHE DID — the operation, the
// invention, the flight — and the barrier is stated plainly, once, as a fact
// about the country and never as the point of the story. Nobody here is
// remarkable for having endured something. They are remarkable for the work.
//
// ---- THE DOCTOR'S ACTION: A TIMELINE, MEASURED ----
//
// She builds a timeline of the four women on a strip of paper, to a scale she
// works out herself — one centimetre per year — and calculates the gaps between
// the dates. That is subtraction with large numbers, scale, and measurement in
// centimetres, all at once, and the answer to "how long between Dr. Crumpler and
// Dr. Canady?" is a hundred and seventeen years she measured with a ruler.
//
// ---- READING CAP ----
//
// Quarter 4: 16 words a sentence, floor 7.5. §10.1.
//
// ---- ON THE SOURCE REQUIREMENT ----
//
// The standing requirement is that Black American educators are actively sought
// and every failed search written down. Across sixteen modules of this course,
// no Black-educator-led children's anatomy channel was found, and that is
// recorded as unknown in the sourceGap of every lesson. This module does not
// close that gap and does not pretend to: the SUBJECTS here are Black American
// women, and the channels that made the videos are not claimed to be
// Black-led, because that has not been verified.
// ---------------------------------------------------------------------------

// =========================================================== LESSON 1
const L1_CHECK_IN = {
  title: 'Eighteen sixty-four',
  text: 'The Civil War was still being fought when a woman in Boston finished medical school.',
  question: 'What do you think a doctor could actually do for somebody in 1864?'
};

const L1_BEATS = [
  {
    n: 1,
    label: 'Dr. Rebecca Lee Crumpler, the first Black woman doctor in America',
    hook: 'She was the first, and for a long time she was very nearly the only one.',
    teachingText:
      'Rebecca Lee Crumpler qualified as a doctor in Boston in 1864. She had spent years before that working as a nurse, which is how she learned enough to be accepted at all.',
    example:
      'She was the only Black woman in her graduating class, and no medical school in the country had graduated one before.',
    applyIt: {
      prompt: 'Dr. Crumpler became a doctor in:',
      choices: ['1764', '1864', '1964', '2064'],
      answer: 1,
      feedback: [
        'A hundred years too early.',
        null,
        'A hundred years too late.',
        'That has not happened yet.'
      ]
    }
  },
  {
    n: 2,
    label: 'She went where the patients were, and then she wrote it down',
    hook: 'After the war she went south, to people no other doctor would treat.',
    teachingText:
      'She worked in Virginia caring for people who had just been freed from slavery, and who had almost no medical care of any kind. Later she wrote a book about caring for women and children.',
    example:
      'That book is one of the first medical books written by a Black American, and it was written for ordinary mothers to read.',
    applyIt: {
      prompt: 'Dr. Crumpler’s book was written for:',
      choices: ['Other doctors only', 'Ordinary mothers to read', 'Schoolchildren', 'Nobody in particular'],
      answer: 1,
      feedback: [
        'She aimed lower and wider than that.',
        null,
        'It was for the people doing the caring.',
        'It had a clear audience.'
      ]
    }
  }
];

const L1_ACTIVITY = {
  title: 'Start the timeline',
  prep: 'A long strip of paper, a ruler with centimetres, and a pencil.',
  needs: ['a long strip of paper', 'a ruler', 'a pencil', 'her notebook'],
  steps: [
    'Rule a straight line the whole length of your strip and mark the left end 1860.',
    'Decide your scale: one centimetre stands for one year, so ten centimetres is ten years.',
    'Measure four centimetres along and mark 1864, then write Dr. Rebecca Lee Crumpler.',
    'Mark every tenth year along the line — 1870, 1880, 1890 — measuring each one.',
    'Write down how many centimetres long your strip needs to be to reach 1990.'
  ],
  safety:
    'Paper, a ruler and a pencil. Keep the strip somewhere safe, because the next three lessons all add to this same one.',
  minutes: 15
};

const L1_LEDGER = {
  prompt: 'Write down your scale, and how many centimetres stand for one hundred years.',
  ifSheIsStuck:
    'One centimetre for one year makes a hundred years a hundred centimetres, which is one metre — the same metre she measured in Module 10.'
};

// =========================================================== LESSON 2
const L2_CHECK_IN = {
  title: 'A cloudy lens',
  text: 'In Module 13 you found the lens that focuses light at the back of your eye.',
  question: 'What do you think would happen to somebody’s sight if that lens went cloudy?'
};

const L2_BEATS = [
  {
    n: 1,
    label: 'Dr. Patricia Bath invented a better way to remove a cloudy lens',
    hook: 'She built the tool. Not a version of somebody else’s — the tool.',
    teachingText:
      'A cataract is a lens that has gone cloudy, and until 1986 removing one meant cutting it out. Dr. Patricia Bath invented a device that uses a laser to break the cloudy lens up gently instead.',
    example:
      'She called it the Laserphaco Probe. It has restored sight to people who had been blind for decades.',
    applyIt: {
      prompt: 'A cataract is:',
      choices: ['A blind spot', 'A lens that has gone cloudy', 'A damaged eardrum', 'A kind of germ'],
      answer: 1,
      feedback: [
        'Everybody has one of those.',
        null,
        'That is an ear.',
        'It is not an illness you catch.'
      ]
    }
  },
  {
    n: 2,
    label: 'She was the first Black woman doctor in America to patent a medical invention',
    hook: 'A patent is a piece of paper saying: this was mine, and I thought of it.',
    teachingText:
      'Dr. Bath received her patent in 1988. She also founded an organisation built on one idea — that eyesight is a basic human right, and that people go blind for lack of care rather than lack of medicine.',
    example:
      'She had noticed something nobody had measured: her patients in Harlem were going blind at twice the rate of her patients elsewhere.',
    applyIt: {
      prompt: 'What did Dr. Bath notice about her patients in Harlem?',
      choices: ['They had different eyes', 'They went blind at twice the rate', 'They needed different lenses', 'Nothing unusual'],
      answer: 1,
      feedback: [
        'Eyes are eyes.',
        null,
        'The lenses were the same.',
        'She noticed something and measured it.'
      ]
    }
  }
];

const L2_ACTIVITY = {
  title: 'A cloudy lens, and the timeline grows',
  prep: 'The timeline strip, a ruler, a clear glass of water, and a little milk.',
  needs: ['the timeline strip', 'a ruler', 'a glass of water', 'a drop of milk', 'her notebook'],
  steps: [
    'Look at some writing through a glass of clear water and write down what you can read.',
    'Stir in one drop of milk, look again, and write down what changed.',
    'On your timeline, measure along and mark 1986, then write Dr. Patricia Bath.',
    'Measure the distance between your 1864 mark and your 1986 mark in centimetres.',
    'Work out how many years that is, and check it against your ruler measurement.'
  ],
  safety:
    'Water and one drop of milk, looked THROUGH and never drunk. Nothing goes near an eye — this is a model of a lens on a table, not anything done to hers.',
  minutes: 15
};

const L2_LEDGER = {
  prompt: 'Write down what Dr. Bath invented, and how many years after Dr. Crumpler it was.',
  ifSheIsStuck:
    '1986 take away 1864. Let her do it on the ruler first and the arithmetic second — the two should agree, and it is a good moment when they do.'
};

// =========================================================== LESSON 3
const L3_CHECK_IN = {
  title: 'Somebody has to operate on a brain',
  text: 'In Module 12 you learned that the brain sits in a bone box, floating in liquid.',
  question: 'Getting inside that safely would take real skill. Who do you think does it?'
};

const L3_BEATS = [
  {
    n: 1,
    label: 'Dr. Alexa Canady, the first Black woman neurosurgeon in America',
    hook: 'Brain surgery on children, which is the most delicate version of the most delicate job.',
    teachingText:
      'Alexa Canady qualified as a neurosurgeon in 1981 and spent her career operating on children. She later ran the whole neurosurgery department at a children’s hospital in Michigan.',
    example:
      'A neurosurgeon operates on the brain and the spinal cord — the two things Module 12 was about.',
    applyIt: {
      prompt: 'A neurosurgeon operates on:',
      choices: ['Bones', 'The brain and spinal cord', 'The heart', 'The gut'],
      answer: 1,
      feedback: [
        'That is a different surgeon.',
        null,
        'That is a different surgeon again.',
        'And another one.'
      ]
    }
  },
  {
    n: 2,
    label: 'She nearly stopped, and the reason is worth knowing',
    hook: 'She lost her confidence at college and very nearly left.',
    teachingText:
      'Dr. Canady has said plainly that she went through a period of doubting she belonged, and came close to dropping out. She stayed, and then did something nobody had done before.',
    example:
      'The doubt was not a sign she was wrong about herself. It was a thing that happened, and then she carried on.',
    applyIt: {
      prompt: 'Dr. Canady nearly left college because she:',
      choices: ['Was not clever enough', 'Doubted that she belonged', 'Disliked medicine', 'Wanted a different job'],
      answer: 1,
      feedback: [
        'She very clearly was.',
        null,
        'She spent her whole life in it.',
        'She wanted this one.'
      ]
    }
  }
];

const L3_ACTIVITY = {
  title: 'Steady hands, and the timeline grows again',
  prep: 'The timeline strip, a ruler, dried rice or beans, tweezers or two pencils, and a timer.',
  needs: ['the timeline strip', 'a ruler', 'rice or beans', 'tweezers', 'a timer', 'her notebook'],
  steps: [
    'Line up ten grains of rice and move them one at a time to a cup, using tweezers only.',
    'Time it, write the number down, then do it again and write the second time down.',
    'Work out the difference between your two attempts.',
    'On your timeline, measure along and mark 1981, then write Dr. Alexa Canady.',
    'Measure from 1864 to 1981 in centimetres, and check it against the subtraction.'
  ],
  safety:
    'Rice and beans are counters. Nothing is eaten and nothing goes near a mouth, a nose or an ear, and they are put away afterwards where nobody smaller can reach them.',
  minutes: 15
};

const L3_LEDGER = {
  prompt: 'Write down what a neurosurgeon does, and the gap in years between 1864 and 1981.',
  ifSheIsStuck:
    'A hundred and seventeen years. She can check it two ways — on the ruler and on paper — and if they disagree, one of them is worth finding.'
};

// =========================================================== LESSON 4
const L4_CHECK_IN = {
  title: 'A doctor who left the planet',
  text: 'One of the four women in this module trained as a doctor and then went to space.',
  question: 'What use do you think a doctor would be on a spacecraft?'
};

const L4_BEATS = [
  {
    n: 1,
    label: 'Dr. Mae Jemison, doctor first and astronaut second',
    hook: 'She was already a doctor before NASA had heard of her.',
    teachingText:
      'Mae Jemison qualified as a doctor and worked as a medical officer in West Africa. In 1992 she flew on the space shuttle Endeavour, the first Black woman in space.',
    example:
      'Her job on that flight was science: running experiments on what happens to a body when gravity stops pulling on it.',
    applyIt: {
      prompt: 'Dr. Mae Jemison trained first as:',
      choices: ['A pilot', 'A doctor', 'An engineer only', 'A teacher'],
      answer: 1,
      feedback: [
        'She was not a pilot.',
        null,
        'She was an engineer too, and a doctor.',
        'She taught later, not first.'
      ]
    }
  },
  {
    n: 2,
    label: 'What the whole course was actually for',
    hook: 'Sixteen modules ago you counted a pulse for fifteen seconds and multiplied by four.',
    teachingText:
      'Every one of these four women started where you have started: looking carefully at a body, writing down what they found, and asking a question nobody had answered yet.',
    example:
      'You have a notebook full of measurements now. That is not a school exercise. That is the actual job.',
    applyIt: {
      prompt: 'What did all four of these women do first?',
      choices: ['Became famous', 'Looked carefully and wrote things down', 'Invented something', 'Went to space'],
      answer: 1,
      feedback: [
        'That came much later, if at all.',
        null,
        'Only one of them did that.',
        'Only one of them did that.'
      ]
    }
  }
];

const L4_ACTIVITY = {
  title: 'Finish the timeline, and read your own notebook',
  prep: 'The timeline strip, a ruler, and every ledger entry from the whole course.',
  needs: ['the timeline strip', 'a ruler', 'her notebook', 'a pencil'],
  steps: [
    'Measure along your timeline and mark 1992, then write Dr. Mae Jemison.',
    'Write down the gap in years between each pair of women, working left to right.',
    'Now go back through your notebook and find every measurement you took this year.',
    'List them with their units — beats, breaths, centimetres, millilitres, millimetres, seconds.',
    'Write down which measurement you are proudest of, and one question you still have.'
  ],
  safety:
    'Her own notebook, her own numbers. Nothing is compared with anybody else’s and nothing here is marked.',
  minutes: 16
};

const L4_LEDGER = {
  prompt: 'Write down the four names, the four years, and the one question you still want answered.',
  ifSheIsStuck:
    'The question matters more than the list. If she cannot think of one, ask her what she wanted to measure this year and could not — that is a question, and it is hers.'
};

// ---------------------------------------------------------------------------

export const HUMANBODY_M16 = [
  {
    id: 'body-m16-01',
    course: 'humanbody',
    module: 16,
    quarter: 4,
    week: 7,
    day: 1,
    n: 1,
    title: 'Dr. Rebecca Lee Crumpler, 1864',
    minutes: 30,
    spec: '§10 · beats',
    concept: 'Rebecca Lee Crumpler was the first Black woman to qualify as a doctor in America, and she went on to care for people no other doctor would treat and to write it all down.',
    standards: [],
    offGrade: 'Scale and measurement: one centimetre to one year, marked and measured along a strip. Measurement scored 2.00, at the test floor.',
    words: ['qualify', 'scale', 'timeline'],
    glossary: [
      { word: 'qualify', plain: 'To finish the training and be allowed to do a job.' },
      { word: 'scale', plain: 'How much a distance on your drawing stands for in real life.' },
      { word: 'timeline', plain: 'A line with dates marked along it in order.' }
    ],
    video: {
      id: 'Bm62U1t5hv0',
      url: 'https://www.youtube.com/watch?v=Bm62U1t5hv0',
      title: 'Black History for Kids | Rebecca Lee Crumpler: First Black Woman Doctor in America',
      channel: 'Fresberg Cartoon – Learning & History for Students',
      minutes: 3,
      verified: '2026-08-18 · youtube.com/oembed · 3:01 read from the playlist duration badge',
      teaches: ['who Rebecca Lee Crumpler was', 'when and where she qualified', 'what she did after the Civil War'],
      sourceGap:
        'THE SUBJECT MEETS THE REQUIREMENT; THE CHANNEL IS NOT CLAIMED TO. Searched: "Rebecca Lee Crumpler first Black woman doctor video for kids youtube Black history channel". Fresberg Cartoon makes Black History for Kids material, and whether it is a Black-led channel HAS NOT BEEN VERIFIED and is recorded as unknown. Across sixteen modules of this course no Black-educator-led children\'s anatomy channel was found; that gap is open and is written into every lesson. The two standing searches are on body-m1-01.'
    },
    checkIn: L1_CHECK_IN,
    beats: L1_BEATS,
    activity: L1_ACTIVITY,
    ledger: L1_LEDGER,
    hook: L1_CHECK_IN,
    core: L1_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L1_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'When did Dr. Crumpler qualify?', answer: '1864.', why: 'The Civil War was still being fought.' },
      { ask: 'Who did she write her book for?', answer: 'Ordinary mothers.', why: 'The people doing the caring.' }
    ],
    check: [
      {
        prompt: 'Dr. Crumpler became a doctor in:',
        choices: ['1764', '1964', '1864', '2064'],
        answer: 2,
        feedback: ['A century too early.', 'A century too late.', null, 'Not yet.']
      },
      {
        prompt: 'Dr. Crumpler’s book was written for:',
        choices: ['Ordinary mothers to read', 'Other doctors only', 'Schoolchildren', 'Nobody in particular'],
        answer: 0,
        feedback: [null, 'Wider than that.', 'For the carers.', 'It had an audience.']
      },
      {
        prompt: 'At one centimetre to a year, a hundred years is:',
        choices: ['10 cm', '100 cm', '1000 cm', '1 cm'],
        answer: 1,
        feedback: ['That is ten years.', null, 'That is a thousand years.', 'That is one year.']
      }
    ]
  },
  {
    id: 'body-m16-02',
    course: 'humanbody',
    module: 16,
    quarter: 4,
    week: 7,
    day: 2,
    n: 2,
    title: 'Dr. Patricia Bath, and the laser',
    minutes: 30,
    spec: '§10 · beats',
    concept: 'Patricia Bath invented a laser device for removing cloudy lenses, was the first Black woman doctor in America to patent a medical invention, and got there by measuring something nobody had measured.',
    standards: [],
    offGrade: 'Subtraction with four-digit years, checked twice — once by ruler and once on paper.',
    words: ['cataract', 'patent', 'laser'],
    glossary: [
      { word: 'cataract', plain: 'A lens inside the eye that has gone cloudy.' },
      { word: 'patent', plain: 'An official paper saying you invented something first.' },
      { word: 'laser', plain: 'A very narrow, very exact beam of light.' }
    ],
    video: {
      id: 'dkzjmhEDSMM',
      url: 'https://www.youtube.com/watch?v=dkzjmhEDSMM',
      title: 'THE DOCTOR WITH AN EYE FOR EYES Read Aloud by Mrs. K | Dr. Patricia Bath | Kids Book Read Aloud',
      channel: 'Mrs. K\'s Book Worm Adventures',
      minutes: 9,
      verified: '2026-08-18 · youtube.com/oembed · 8:36 read from the playlist duration badge',
      teaches: ['who Dr. Patricia Bath was', 'what a cataract is and how she treated it', 'what she noticed about her Harlem patients'],
      sourceGap:
        'THE SUBJECT MEETS THE REQUIREMENT; THE CHANNEL IS NOT CLAIMED TO. Searched: "Henrietta Lacks OR Patricia Bath for kids video youtube laser cataract inventor Black woman doctor". This is a read-aloud of the picture book "The Doctor With an Eye for Eyes: The Story of Dr. Patricia Bath". Whether the channel is Black-led HAS NOT BEEN VERIFIED and is recorded as unknown. A read-aloud is chosen over the TIME interview clips because those are pitched at adults, which is the v3.40 level failure.'
    },
    checkIn: L2_CHECK_IN,
    beats: L2_BEATS,
    activity: L2_ACTIVITY,
    ledger: L2_LEDGER,
    hook: L2_CHECK_IN,
    core: L2_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L2_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'What is a cataract?', answer: 'A lens that has gone cloudy.', why: 'The lens she found in Module 13.' },
      { ask: 'What did Dr. Bath notice in Harlem?', answer: 'Twice the rate of blindness.', why: 'She noticed it and then measured it.' }
    ],
    check: [
      {
        prompt: 'A cataract is:',
        choices: ['A blind spot', 'A damaged eardrum', 'A kind of germ', 'A lens that has gone cloudy'],
        answer: 3,
        feedback: ['Everybody has one.', 'That is an ear.', 'Not caught.', null]
      },
      {
        prompt: 'What did Dr. Bath notice about her patients in Harlem?',
        choices: ['They went blind at twice the rate', 'They had different eyes', 'They needed different lenses', 'Nothing unusual'],
        answer: 0,
        feedback: [null, 'Eyes are eyes.', 'The lenses were the same.', 'She noticed and measured.']
      },
      {
        prompt: '1986 take away 1864 is:',
        choices: ['112 years', '122 years', '132 years', '22 years'],
        answer: 1,
        feedback: ['Check the subtraction.', null, 'Check the subtraction.', 'Far too small.']
      }
    ]
  },
  {
    id: 'body-m16-03',
    course: 'humanbody',
    module: 16,
    quarter: 4,
    week: 8,
    day: 1,
    n: 3,
    title: 'Dr. Alexa Canady, and the brain',
    minutes: 30,
    spec: '§10 · beats',
    concept: 'Alexa Canady became the first Black woman neurosurgeon in America and spent her career operating on children — after nearly leaving college because she doubted she belonged.',
    standards: [],
    offGrade: 'Elapsed time across two attempts, then the difference, plus subtraction with four-digit years.',
    words: ['neurosurgeon', 'department', 'doubt'],
    glossary: [
      { word: 'neurosurgeon', plain: 'A doctor who operates on the brain and the spinal cord.' },
      { word: 'department', plain: 'One part of a hospital, with a person in charge of it.' },
      { word: 'doubt', plain: 'Not being sure about something, including about yourself.' }
    ],
    video: {
      id: 'XEpV3xPzpio',
      url: 'https://www.youtube.com/watch?v=XEpV3xPzpio',
      title: 'Black History for Kids | Alexa Canady: First Black Woman Neurosurgeon',
      channel: 'Fresberg Cartoon – Learning & History for Students',
      minutes: 3,
      verified: '2026-08-18 · youtube.com/oembed · 3:01 read from the playlist duration badge',
      teaches: ['who Dr. Alexa Canady is', 'what a neurosurgeon does', 'that she nearly left college and carried on'],
      sourceGap:
        'THE SUBJECT MEETS THE REQUIREMENT; THE CHANNEL IS NOT CLAIMED TO. Searched: "Alexa Canady first Black woman neurosurgeon for kids video youtube". Whether Fresberg Cartoon is a Black-led channel HAS NOT BEEN VERIFIED and is recorded as unknown. Adult-level alternatives (the ACS Icons in Surgery interview, the Leaders of Neurosurgery interview) were rejected on level, which is the v3.40 rule.'
    },
    checkIn: L3_CHECK_IN,
    beats: L3_BEATS,
    activity: L3_ACTIVITY,
    ledger: L3_LEDGER,
    hook: L3_CHECK_IN,
    core: L3_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L3_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'What does a neurosurgeon operate on?', answer: 'The brain and the spinal cord.', why: 'The two things Module 12 was about.' },
      { ask: 'Why did she nearly leave college?', answer: 'She doubted that she belonged.', why: 'She stayed, and then did something new.' }
    ],
    check: [
      {
        prompt: 'A neurosurgeon operates on:',
        choices: ['Bones', 'The heart', 'The brain and spinal cord', 'The gut'],
        answer: 2,
        feedback: ['A different surgeon.', 'A different surgeon.', null, 'A different surgeon.']
      },
      {
        prompt: 'Dr. Canady nearly left college because she:',
        choices: ['Doubted that she belonged', 'Was not clever enough', 'Disliked medicine', 'Wanted another job'],
        answer: 0,
        feedback: [null, 'She very clearly was.', 'It was her life’s work.', 'She wanted this one.']
      },
      {
        prompt: '1981 take away 1864 is:',
        choices: ['107 years', '117 years', '127 years', '17 years'],
        answer: 1,
        feedback: ['Check the subtraction.', null, 'Check the subtraction.', 'Far too small.']
      }
    ]
  },
  {
    id: 'body-m16-04',
    course: 'humanbody',
    module: 16,
    quarter: 4,
    week: 8,
    day: 2,
    n: 4,
    title: 'Dr. Mae Jemison, and what you have already done',
    minutes: 30,
    spec: '§10 · beats',
    concept: 'Mae Jemison qualified as a doctor before she flew on the shuttle Endeavour in 1992, and every woman in this module began the way Azianna has begun — by looking carefully and writing it down.',
    standards: [],
    offGrade: 'Gaps between four dates, and a full audit of every measurement and unit used across the year.',
    words: ['astronaut', 'gravity', 'experiment'],
    glossary: [
      { word: 'astronaut', plain: 'Somebody who travels into space.' },
      { word: 'gravity', plain: 'The pull that holds you on the ground.' },
      { word: 'experiment', plain: 'A careful test set up to answer a question.' }
    ],
    video: {
      id: 'UGbEQq0oI2Q',
      url: 'https://www.youtube.com/watch?v=UGbEQq0oI2Q',
      title: 'Mae Jemison for Kids | Bedtime History',
      channel: 'Bedtime History',
      minutes: 10,
      verified: '2026-08-18 · youtube.com/oembed · 9:55 read from the playlist duration badge',
      teaches: ['who Dr. Mae Jemison is', 'that she was a doctor before she was an astronaut', 'what she did on the Endeavour flight'],
      sourceGap:
        'THE SUBJECT MEETS THE REQUIREMENT; THE CHANNEL IS NOT CLAIMED TO. Searched: "Mae Jemison for kids video youtube doctor astronaut Black history for kids". Whether Bedtime History is a Black-led channel HAS NOT BEEN VERIFIED and is recorded as unknown. This is the longest video in Quarter 4 at 9:55; Gigi\'s standing call is that full videos stay and length is a printed guide, not a rule.'
    },
    checkIn: L4_CHECK_IN,
    beats: L4_BEATS,
    activity: L4_ACTIVITY,
    ledger: L4_LEDGER,
    hook: L4_CHECK_IN,
    core: L4_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L4_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'What was Dr. Jemison before NASA?', answer: 'A doctor.', why: 'She worked as a medical officer in West Africa.' },
      { ask: 'What did all four women do first?', answer: 'Looked carefully and wrote it down.', why: 'Which is what her notebook is full of.' }
    ],
    check: [
      {
        prompt: 'Dr. Mae Jemison trained first as:',
        choices: ['A pilot', 'A doctor', 'An engineer only', 'A teacher'],
        answer: 1,
        feedback: ['Not a pilot.', null, 'An engineer too, and a doctor.', 'She taught later.']
      },
      {
        prompt: 'What did all four of these women do first?',
        choices: ['Became famous', 'Invented something', 'Went to space', 'Looked carefully and wrote things down'],
        answer: 3,
        feedback: ['That came later, if at all.', 'Only one did.', 'Only one did.', null]
      },
      {
        prompt: '1992 take away 1864 is:',
        choices: ['118 years', '138 years', '128 years', '28 years'],
        answer: 2,
        feedback: ['Check the subtraction.', 'Check the subtraction.', null, 'Far too small.']
      }
    ]
  }
];

export const HUMANBODY_M16_META = {
  courseId: 'humanbody',
  module: 16,
  title: 'Black Women in Medicine',
  blurb:
    'Four Black American women who did the job Azianna says she wants — and a timeline she measures herself, one centimetre to the year, from Dr. Crumpler in 1864 to Dr. Jemison leaving the planet in 1992.'
};

export function humanbodyM16LessonById(id) {
  return HUMANBODY_M16.find((l) => l.id === id) || null;
}

export default HUMANBODY_M16;
