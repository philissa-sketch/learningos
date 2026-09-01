// ---------------------------------------------------------------------------
// THE HUMAN BODY · MODULE 14 — GROWING
//
// Four lessons. Quarter 4, weeks 3 and 4. Tuesday and Thursday, 30 minutes.
//
// ---- READ THIS BEFORE CHANGING A WORD OF THIS FILE ----
//
// This is the module a body course does damage with. It is about a nine-year-old
// girl's own growing body, and she is already carrying a set of test scores that
// told her she is behind. So the fence here is the tightest in the course, and
// every line of it is a rule and not a preference:
//
//   · HEIGHT ONLY. NO WEIGHT ANYWHERE. Not hers, not anybody's, not in a
//     question, not in an example, not as a unit being practised. Gigi's
//     standing rule for The Human Body: no weight, no body composition, no
//     appearance.
//   · SHE IS ONLY EVER COMPARED WITH HERSELF. Her height in June against her
//     height in September. Never against another child, never against a chart
//     of what is usual, never against her age.
//   · THERE IS NO RIGHT HEIGHT AND NO RIGHT SPEED, and the lessons say so out
//     loud rather than leaving it to be inferred. Two questions in the bank make
//     that the correct answer.
//   · NOTHING ABOUT PUBERTY. That is a conversation for Gigi to have when she
//     chooses, in her own words, not a paragraph a machine wrote into a Tuesday.
//   · NOTHING ABOUT FOOD, exercise, or anything a child could read as a way to
//     change how her body turns out.
//   · Lesson 3 explains that growing stops. It does NOT frame that as a loss,
//     and Lesson 4 is deliberately placed after it to show what keeps growing
//     for ever.
//
// ---- THE DOCTOR'S ACTION: MEASURE A NAIL EVERY DAY FOR TWO WEEKS ----
//
// Height changes too slowly to see inside a fortnight, and measuring a child's
// height repeatedly is exactly the habit this module must not build. A NAIL
// grows about 0.1 mm a day, which is measurable over two weeks and belongs to
// nobody's self-image. She marks a nail, measures the gap in MILLIMETRES every
// few days, and plots it. That is measurement, unit work, and her first real
// line graph, on a body part nobody has ever been made to feel bad about.
//
// ---- READING CAP ----
//
// Quarter 4: 16 words a sentence, floor 7.5. §10.1.
// ---------------------------------------------------------------------------

// =========================================================== LESSON 1
const L1_CHECK_IN = {
  title: 'Last year’s coat',
  text: 'Something you wore a year ago does not fit you now.',
  question: 'You are bigger. But what is there MORE of, actually?'
};

const L1_BEATS = [
  {
    n: 1,
    label: 'Everything you are made of is built out of cells',
    hook: 'You are a very large number of very small things, working together.',
    teachingText:
      'A cell is the smallest living piece of you, far too small to see without a microscope. Skin, bone, muscle, blood and nerve are all made of cells, and each kind is shaped for its job.',
    example:
      'A nerve cell is long and thin, because its job is to reach. A red blood cell is a little disc, because its job is to squeeze through gaps.',
    applyIt: {
      prompt: 'A cell is best described as:',
      choices: ['A tiny machine part', 'The smallest living piece of you', 'A kind of bone', 'Something in your blood only'],
      answer: 1,
      feedback: [
        'It is alive, which a machine part is not.',
        null,
        'Bone is made of them.',
        'Every part of you is.'
      ]
    }
  },
  {
    n: 2,
    label: 'Growing means making more cells, not blowing them up',
    hook: 'Your cells did not get bigger. There are simply more of them.',
    teachingText:
      'A cell grows a little, then splits into two. Each of those does the same. That is how a body gets larger, and it is also how a cut closes and how skin replaces itself.',
    example:
      'One becomes two, two become four, four become eight. It does not take many rounds to reach a very large number.',
    applyIt: {
      // The third choice used to read "Cells get heavier", with a feedback line
      // saying this module is not about weight. Both are gone. A distractor that
      // invites the thought is still the thought arriving, and this is the one
      // module where that word does not belong on her screen at all. Replaced
      // with a wrong answer that is wrong for a biological reason instead.
      prompt: 'Your body gets bigger mainly because:',
      choices: ['Each cell swells up', 'There are more cells', 'Cells stretch out longer', 'Cells move apart'],
      answer: 1,
      feedback: [
        'They stay roughly the same size.',
        null,
        'Only nerve cells are long, and that is their job.',
        'They stay packed together.'
      ]
    }
  }
];

const L1_ACTIVITY = {
  title: 'One becomes two',
  prep: 'Paper, a pencil, and dried beans or buttons if you have them.',
  needs: ['paper', 'a pencil', 'about 40 beans or buttons', 'her notebook'],
  steps: [
    'Put one bean on the table. Write down the number 1.',
    'Replace it with two beans and write 2 beside it.',
    'Keep doubling — 2 to 4, 4 to 8 — writing each number down as you go.',
    'Stop when you run out of beans, and write down how many rounds that took.',
    'Without any beans, carry the numbers on for three more rounds on paper.'
  ],
  safety:
    'Beans and buttons are counters and are never eaten or put anywhere near a mouth, an ear or a nose. Keep them away from anybody smaller.',
  minutes: 13
};

const L1_LEDGER = {
  prompt: 'Write down your doubling numbers in order, and how many rounds it took to pass 30.',
  ifSheIsStuck:
    'Doubling is her Khan multiplication work arriving in a body lesson. If she can say "one becomes two and both of those become two", she has the biology.'
};

// =========================================================== LESSON 2
const L2_CHECK_IN = {
  title: 'Where does a bone get longer?',
  text: 'A bone is hard all the way along, and it has to end up longer than it started.',
  question: 'If the middle is solid, whereabouts do you think a bone actually grows?'
};

const L2_BEATS = [
  {
    n: 1,
    label: 'Bones grow at their ends, not in the middle',
    hook: 'There is a soft strip near each end of a long bone, and that strip is the whole answer.',
    teachingText:
      'Near each end of a growing bone sits a band of softer material. New material is added there and then hardens. The middle of the bone stays where it is while the ends move further apart.',
    example:
      'A doctor can look at those bands on an X-ray. While they are still there, more growing is still to come.',
    applyIt: {
      prompt: 'A long bone gets longer:',
      choices: ['In the middle', 'At bands near each end', 'All over at once', 'Only when it breaks'],
      answer: 1,
      feedback: [
        'The middle stays put.',
        null,
        'It is not spread evenly.',
        'Breaking is not how it grows.'
      ]
    }
  },
  {
    n: 2,
    label: 'Growing is slow, and that is why you cannot feel it',
    hook: 'You have never once noticed yourself getting taller.',
    teachingText:
      'A child grows a few centimetres in a whole year. Spread across three hundred and sixty-five days, that is far too little to notice from one morning to the next.',
    example:
      'It is why a doorframe with pencil marks on it is convincing and a mirror is not. The marks hold last year still.',
    applyIt: {
      prompt: 'You cannot feel yourself growing because it happens:',
      choices: ['At night only', 'Very slowly', 'While you eat', 'Once a year, all at once'],
      answer: 1,
      feedback: [
        'It happens all the time.',
        null,
        'It is not tied to meals.',
        'It is spread across the whole year.'
      ]
    }
  }
];

const L2_ACTIVITY = {
  title: 'A mark on the doorframe',
  prep: 'A doorframe or wall a grown-up says you may mark, a pencil, a tape measure, and a grown-up.',
  needs: ['a tape measure', 'a pencil', 'a flat book', 'a grown-up', 'her notebook'],
  steps: [
    'Stand with your back flat to the wall, heels down, and look straight ahead.',
    'Have your grown-up lay the book flat on your head and mark the wall underneath it.',
    'Measure from the floor to the mark and write the number down in centimetres.',
    'Write today’s date beside it, and leave room underneath for next time.',
    'Write down what date you plan to measure again, and put it in your notebook.'
  ],
  safety:
    'ONE measurement, dated, and it is HERS ALONE. It is never compared with another child, never compared with what is usual for her age, and never measured again in the same week. There is no right height. The only useful comparison is her own mark next year.',
  minutes: 14
};

const L2_LEDGER = {
  prompt: 'Write down your height in centimetres with today’s date beside it.',
  ifSheIsStuck:
    'The date matters more than the number. A measurement without a date cannot be compared with anything, which is the whole point of writing it down.'
};

// =========================================================== LESSON 3
const L3_CHECK_IN = {
  title: 'Grown-ups stay the same height',
  text: 'The grown-ups you know have been the same height for as long as you have known them.',
  question: 'Something stopped. What do you think closed?'
};

const L3_BEATS = [
  {
    n: 1,
    label: 'The soft bands close, and then the bone is finished',
    hook: 'Growing does not slow to nothing. Something shuts.',
    teachingText:
      'In the late teens the soft bands near the ends of the bones turn to solid bone themselves. Once that has happened there is nowhere left to add length, and height stops changing.',
    example:
      'A doctor looking at an X-ray can see whether those bands are open or closed, and that tells her whether growing is finished.',
    applyIt: {
      prompt: 'Height stops changing when:',
      choices: ['You decide to stop', 'The soft bands turn to bone', 'You stop eating', 'You turn eighteen exactly'],
      answer: 1,
      feedback: [
        'It is not a decision.',
        null,
        'This module is not about food.',
        'It is not a birthday.'
      ]
    }
  },
  {
    n: 2,
    label: 'Everybody arrives at their own time, and there is no right answer',
    hook: 'Two children the same age can be very different heights and both be exactly as they should be.',
    teachingText:
      'People start growing quickly at different times and finish at different times. Somebody who grows later is not behind. Somebody who grows early has not finished sooner. There is no correct height and no correct speed.',
    example:
      'Which is why a doctor asks how somebody is growing over time, and never whether they match anybody else.',
    applyIt: {
      prompt: 'Two children of the same age, different heights:',
      choices: ['One of them is wrong', 'Both can be exactly as they should be', 'The taller is older', 'The shorter will stay shorter'],
      answer: 1,
      feedback: [
        'Neither is wrong.',
        null,
        'Age and height are not the same thing.',
        'Nobody can say that.'
      ]
    }
  }
];

const L3_ACTIVITY = {
  title: 'The questions a doctor asks',
  prep: 'Paper and a pencil.',
  needs: ['paper', 'a pencil', 'her notebook'],
  steps: [
    'Write down three questions a doctor could ask about how somebody is growing.',
    'Beside each one, write whether it compares a person with themselves or with somebody else.',
    'Cross out any question that compares one person with another.',
    'Look at what is left and write down what all of those questions have in common.',
    'Write one sentence about why a doctor would rather have last year’s number than anybody else’s.'
  ],
  safety:
    'Nobody is measured in this lesson and nobody is described. It is about the shape of a question, not about any real person.',
  minutes: 13
};

const L3_LEDGER = {
  prompt: 'Write down what closes when growing finishes, and why there is no right height.',
  ifSheIsStuck:
    'The bands close. And there is no right height because everybody arrives at their own time — she can say that one in her own words and it will be better than mine.'
};

// =========================================================== LESSON 4
const L4_CHECK_IN = {
  title: 'Something that never stops',
  text: 'Your height will stop changing one day. One or two things about you will keep growing for the whole of your life.',
  question: 'What can you think of that you have to cut, over and over, for ever?'
};

const L4_BEATS = [
  {
    n: 1,
    label: 'Nails and hair are made by cells that never stop dividing',
    hook: 'The part of a nail you can see is not alive at all.',
    teachingText:
      'Under the skin at the base of a nail, cells divide constantly. As new ones arrive they push the older ones forward, and those older ones harden and die. The nail you look at is the finished, dead end of that.',
    example:
      'Which is why cutting a nail does not hurt, and why the base of it does.',
    applyIt: {
      prompt: 'Cutting a nail does not hurt because:',
      choices: ['You cut it quickly', 'The part you cut is not alive', 'Nails have no blood anywhere', 'Nerves stop at the wrist'],
      answer: 1,
      feedback: [
        'Speed makes no difference.',
        null,
        'The base has blood under it.',
        'Nerves reach every part.'
      ]
    }
  },
  {
    n: 2,
    label: 'Slow growth becomes visible the moment you measure it',
    hook: 'A nail grows about a tenth of a millimetre a day, which is nothing — until you wait.',
    teachingText:
      'A tenth of a millimetre cannot be seen in a day. Over fourteen days it adds up to something a ruler can find. Waiting and measuring is how a scientist sees a change too slow to watch.',
    example:
      'The same trick works on the doorframe. Slow change plus a written record equals something you can actually see.',
    applyIt: {
      prompt: 'How does a scientist see a change too slow to watch?',
      choices: ['Watches harder', 'Measures it, waits, and measures again', 'Guesses', 'Uses a stronger light'],
      answer: 1,
      feedback: [
        'Watching cannot help.',
        null,
        'Guessing is not measuring.',
        'Light does not help here.'
      ]
    }
  }
];

const L4_ACTIVITY = {
  title: 'Fourteen days of a fingernail',
  prep: 'A fine washable felt pen, a ruler with millimetres, and squared paper.',
  needs: ['a washable pen', 'a ruler with millimetres', 'squared paper', 'her notebook'],
  steps: [
    'Draw a small line across one fingernail, right at the base where it meets the skin.',
    'Write today’s date, and write 0 mm beside it.',
    'Every third day, measure from the skin to your line in millimetres and write it down with the date.',
    'After fourteen days, plot your dates along the bottom of the squared paper and your millimetres up the side.',
    'Join your points with a line, and write one sentence about what the line does.'
  ],
  safety:
    'A WASHABLE pen, on one fingernail, with a grown-up saying yes first. Nothing is cut and nothing is pushed back. If the mark washes off, start again from a new date rather than guessing.',
  minutes: 15
};

const L4_LEDGER = {
  prompt: 'Write down your measurements with their dates, and what your line looked like.',
  ifSheIsStuck:
    'A line that climbs steadily means steady growth. If two points are level, the mark probably moved — which is a real finding about measuring, not a failure.'
};

// ---------------------------------------------------------------------------

export const HUMANBODY_M14 = [
  {
    id: 'body-m14-01',
    course: 'humanbody',
    module: 14,
    quarter: 4,
    week: 3,
    day: 1,
    n: 1,
    title: 'You are built out of cells',
    minutes: 30,
    spec: '§10 · beats',
    concept: 'Every part of the body is made of cells, and growing means making more of them rather than making each one bigger.',
    standards: [],
    offGrade: 'Doubling, written as a sequence. It feeds her Khan Intro to multiplication work.',
    words: ['cell', 'divide', 'double'],
    glossary: [
      { word: 'cell', plain: 'The smallest living piece of a body, far too small to see on its own.' },
      { word: 'divide', plain: 'To split into two.' },
      { word: 'double', plain: 'To become twice as many.' }
    ],
    video: {
      id: '8vo59AKzU4Q',
      url: 'https://www.youtube.com/watch?v=8vo59AKzU4Q',
      title: 'HUMAN CELL - The Dr. Binocs Show | Best Learning Videos For Kids | Peekaboo Kidz',
      channel: 'Peekaboo Kidz',
      minutes: 4,
      verified: '2026-08-18 · youtube.com/oembed · 3:38 read from the playlist duration badge',
      teaches: ['what a cell is', 'that different cells have different shapes and jobs', 'that cells divide'],
      sourceGap:
        'OPEN. Searched: "how do we grow taller bones growth for kids youtube Dr. Binocs OR SciShow Kids why we grow" and "why does hair and fingernails grow for kids youtube SciShow Kids OR Dr. Binocs" — returned Peekaboo Kidz, Operation Ouch, CBBC and Brains On, no Black-educator-led channel. Recorded unknown, not closed. Module 16 is where this course answers the requirement directly.'
    },
    checkIn: L1_CHECK_IN,
    beats: L1_BEATS,
    activity: L1_ACTIVITY,
    ledger: L1_LEDGER,
    hook: L1_CHECK_IN,
    core: L1_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L1_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'What is a cell?', answer: 'The smallest living piece of you.', why: 'Every part of you is made of them.' },
      { ask: 'How does a body get bigger?', answer: 'By making more cells.', why: 'One divides into two, over and over.' }
    ],
    check: [
      {
        prompt: 'A cell is best described as:',
        choices: ['A tiny machine part', 'A kind of bone', 'The smallest living piece of you', 'Something in blood only'],
        answer: 2,
        feedback: ['It is alive.', 'Bone is made of them.', null, 'Every part of you is.']
      },
      {
        prompt: 'Your body gets bigger mainly because:',
        choices: ['There are more cells', 'Each cell swells up', 'Cells move apart', 'Cells change shape'],
        answer: 0,
        feedback: [null, 'They stay about the same size.', 'They stay packed.', 'Shape is fixed by the job.']
      },
      {
        prompt: 'Doubling from 1, how many rounds to pass 30?',
        choices: ['Three', 'Five', 'Ten', 'Thirty'],
        answer: 1,
        feedback: ['That reaches 8.', null, 'Far more than needed.', 'Far more than needed.']
      }
    ]
  },
  {
    id: 'body-m14-02',
    course: 'humanbody',
    module: 14,
    quarter: 4,
    week: 3,
    day: 2,
    n: 2,
    title: 'Where a bone gets longer',
    minutes: 30,
    spec: '§10 · beats',
    concept: 'A long bone lengthens at soft bands near each end, and it happens too slowly to notice without a dated written record.',
    standards: [],
    offGrade: 'Height in centimetres, recorded once with a date. Measurement scored 2.00, at the test floor.',
    words: ['growth band', 'X-ray', 'record'],
    glossary: [
      { word: 'growth band', plain: 'A softer strip near the end of a bone, where new bone is added.' },
      { word: 'X-ray', plain: 'A picture that shows the bones inside a body.' },
      { word: 'record', plain: 'Something written down and kept, so it can be compared later.' }
    ],
    video: {
      id: 'Z7l1AGGPSHs',
      url: 'https://www.youtube.com/watch?v=Z7l1AGGPSHs',
      title: 'How do Bones Grow?? ☠️ | Operation Ouch!',
      channel: 'CBBC Epic Facts',
      minutes: 5,
      verified: '2026-08-18 · youtube.com/oembed · 5:10 read from the playlist duration badge',
      teaches: ['where a bone grows from', 'what growth plates are', 'how doctors can see growing on an X-ray'],
      sourceGap: 'OPEN. Same searches as body-m14-01 and body-m1-01, both written down there.'
    },
    checkIn: L2_CHECK_IN,
    beats: L2_BEATS,
    activity: L2_ACTIVITY,
    ledger: L2_LEDGER,
    hook: L2_CHECK_IN,
    core: L2_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L2_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'Where does a long bone get longer?', answer: 'At bands near each end.', why: 'The middle stays where it is.' },
      { ask: 'Why can you not feel yourself growing?', answer: 'It happens very slowly.', why: 'A few centimetres across a whole year.' }
    ],
    check: [
      {
        prompt: 'A long bone gets longer:',
        choices: ['In the middle', 'All over at once', 'Only when it breaks', 'At bands near each end'],
        answer: 3,
        feedback: ['The middle stays put.', 'Not spread evenly.', 'Breaking is not growing.', null]
      },
      {
        prompt: 'You cannot feel yourself growing because it happens:',
        choices: ['Very slowly', 'At night only', 'While you eat', 'All at once, once a year'],
        answer: 0,
        feedback: [null, 'All the time.', 'Not tied to meals.', 'Spread across the year.']
      },
      {
        prompt: 'A height measurement is only useful if you also write down:',
        choices: ['The weather', 'The date', 'Who else was there', 'Your age in months'],
        answer: 1,
        feedback: ['Not relevant.', null, 'Not relevant.', 'The date does this job.']
      }
    ]
  },
  {
    id: 'body-m14-03',
    course: 'humanbody',
    module: 14,
    quarter: 4,
    week: 4,
    day: 1,
    n: 3,
    title: 'Why growing stops',
    minutes: 30,
    spec: '§10 · beats',
    concept: 'Height stops changing when the growth bands turn to solid bone, and people reach that point at their own times, so there is no right height and no right speed.',
    standards: [],
    offGrade: null,
    words: ['close', 'compare', 'usual'],
    glossary: [
      { word: 'close', plain: 'To shut, so nothing more can go through.' },
      { word: 'compare', plain: 'To look at two things side by side to see how they differ.' },
      { word: 'usual', plain: 'What happens most often. Not the same as what is right.' }
    ],
    video: {
      id: 'GXF8EkmnrJo',
      url: 'https://www.youtube.com/watch?v=GXF8EkmnrJo',
      title: 'Why Do We Stop Growing? The Dr. Binocs Show | Best Learning Videos For Kids | Peekaboo Kidz',
      channel: 'Peekaboo Kidz',
      minutes: 6,
      verified: '2026-08-18 · youtube.com/oembed · 5:34 read from the playlist duration badge',
      teaches: ['what happens to the growth plates', 'why height stops changing', 'that people finish at different times'],
      sourceGap: 'OPEN. Same searches as body-m14-01 and body-m1-01, both written down there.'
    },
    checkIn: L3_CHECK_IN,
    beats: L3_BEATS,
    activity: L3_ACTIVITY,
    ledger: L3_LEDGER,
    hook: L3_CHECK_IN,
    core: L3_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L3_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'What closes when growing finishes?', answer: 'The soft bands near the ends of the bones.', why: 'They turn to solid bone.' },
      { ask: 'Is there a right height for an age?', answer: 'No. Everybody arrives at their own time.', why: 'A doctor compares a person with themselves.' }
    ],
    check: [
      {
        prompt: 'Height stops changing when:',
        choices: ['You decide to stop', 'You turn eighteen exactly', 'The soft bands turn to bone', 'You stop growing hair'],
        answer: 2,
        feedback: ['Not a decision.', 'Not a birthday.', null, 'Hair is unrelated.']
      },
      {
        prompt: 'Two children of the same age, different heights:',
        choices: ['Both can be exactly as they should be', 'One of them is wrong', 'The taller is older', 'The shorter will stay shorter'],
        answer: 0,
        feedback: [null, 'Neither is wrong.', 'Age is not height.', 'Nobody can say that.']
      },
      {
        prompt: 'A doctor would rather compare your height with:',
        choices: ['Another child’s', 'Your own last measurement', 'The class average', 'A picture'],
        answer: 1,
        feedback: ['That says nothing useful.', null, 'That says nothing useful.', 'Not a measurement.']
      }
    ]
  },
  {
    id: 'body-m14-04',
    course: 'humanbody',
    module: 14,
    quarter: 4,
    week: 4,
    day: 2,
    n: 4,
    title: 'What keeps growing for ever',
    minutes: 30,
    spec: '§10 · beats',
    concept: 'Nails and hair are pushed out by cells that never stop dividing, and measuring something slow over two weeks is how a scientist sees a change too small to watch.',
    standards: [],
    offGrade: 'Millimetres measured over fourteen days, then plotted as a line graph. Units scored 0 of 3 and measurement 2.00, both at the test floor.',
    words: ['millimetre', 'graph', 'steady'],
    glossary: [
      { word: 'millimetre', plain: 'A tiny length. Ten of them make one centimetre.' },
      { word: 'graph', plain: 'A drawing that shows how numbers change, so you can see the pattern.' },
      { word: 'steady', plain: 'Going on at the same rate, without speeding up or slowing down.' }
    ],
    video: {
      id: 'MBHh8Lh6unY',
      url: 'https://www.youtube.com/watch?v=MBHh8Lh6unY',
      title: 'How Your Nails Grow? | The Dr. Binocs Show | Best Learning Videos For Kids | Peekaboo Kidz',
      channel: 'Peekaboo Kidz',
      minutes: 4,
      verified: '2026-08-18 · youtube.com/oembed · 4:09 read from the playlist duration badge',
      teaches: ['where a nail is made', 'why the visible part is not alive', 'how fast nails grow'],
      sourceGap: 'OPEN. Same searches as body-m14-01 and body-m1-01, both written down there.'
    },
    checkIn: L4_CHECK_IN,
    beats: L4_BEATS,
    activity: L4_ACTIVITY,
    ledger: L4_LEDGER,
    hook: L4_CHECK_IN,
    core: L4_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L4_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'Why does cutting a nail not hurt?', answer: 'The part you cut is not alive.', why: 'It was pushed out and hardened.' },
      { ask: 'How do you see a very slow change?', answer: 'Measure, wait, and measure again.', why: 'Written records hold the past still.' }
    ],
    check: [
      {
        prompt: 'Cutting a nail does not hurt because:',
        choices: ['You cut it quickly', 'The part you cut is not alive', 'Nails have no blood anywhere', 'Nerves stop at the wrist'],
        answer: 1,
        feedback: ['Speed makes no difference.', null, 'The base has blood under it.', 'Nerves reach everywhere.']
      },
      {
        prompt: 'How does a scientist see a change too slow to watch?',
        choices: ['Watches harder', 'Guesses', 'Measures, waits, and measures again', 'Uses a brighter light'],
        answer: 2,
        feedback: ['Watching cannot help.', 'Guessing is not measuring.', null, 'Light does not help.']
      },
      {
        prompt: '14 days at about 0.1 mm a day adds up to roughly:',
        choices: ['1.4 mm', '14 mm', '0.14 mm', '140 mm'],
        answer: 0,
        feedback: [null, 'Ten times too much.', 'Ten times too little.', 'Far too much.']
      }
    ]
  }
];

export const HUMANBODY_M14_META = {
  courseId: 'humanbody',
  module: 14,
  title: 'Growing',
  blurb:
    'One bean becoming two and two becoming four, a single dated pencil mark on a doorframe, and fourteen days of a fingernail measured in millimetres and turned into her first line graph.'
};

export function humanbodyM14LessonById(id) {
  return HUMANBODY_M14.find((l) => l.id === id) || null;
}

export default HUMANBODY_M14;
