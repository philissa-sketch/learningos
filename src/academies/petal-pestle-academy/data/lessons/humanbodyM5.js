// ---------------------------------------------------------------------------
// THE HUMAN BODY · MODULE 5 — THE HEART, A PUMP
//
// Four lessons. Quarter 2, weeks 1 and 2. Tuesday and Thursday, 30 minutes.
//
// Quarter 1 met the heart from the outside — she found her pulse and counted
// it. This module goes inside: four rooms, two circuits, valves that click, and
// a pump that has never once taken a day off.
//
// The doctor's action: PULSE BEFORE AND AFTER MOVING, and this time she reads
// the two numbers as one finding rather than two. Module 1 taught her to count.
// This one teaches her what the change means.
//
// ---- READING CAP ----
//
// Quarter 2: 12 words a sentence, up from 11. That is one word, and it is the
// whole ramp — §10.1. Her Grammar & Usage measured 2.15 and her independent
// reading sits below a 3.46 listening score, so the ramp climbs slowly on
// purpose.
//
// ---- SAFETY ----
//
// No weight, no body composition, nothing about appearance, and nothing that
// teaches her to judge a heart. Pulse numbers are HER OWN, compared with HER
// OWN, before and after — never against anybody else and never against a chart.
// The word "healthy" does not appear as something a number can prove.
// ---------------------------------------------------------------------------

// =========================================================== LESSON 1
const L1_CHECK_IN = {
  title: 'Where is it, really?',
  text: 'Most people point to the left side of their chest. Put your hand there.',
  question: 'Do you think your heart is on the left, or somewhere else?'
};

const L1_BEATS = [
  {
    n: 1,
    label: 'It sits in the middle, tilted left',
    hook: 'Your heart is almost in the middle of your chest. It only leans left.',
    teachingText:
      'Your heart sits behind your breastbone, near the middle. It tilts to the left. That tilt is why the beat feels left-sided when you press.',
    example:
      'Your left lung is smaller than your right one. It made room for the heart to lean in.',
    applyIt: {
      prompt: 'Where does your heart actually sit?',
      choices: ['Far left', 'Near the middle, tilted left', 'Far right', 'Below your stomach'],
      answer: 1,
      feedback: [
        'That is where the beat is loudest, not where it sits.',
        null,
        'No — the tilt goes the other way.',
        'It is up in your chest.'
      ]
    }
  },
  {
    n: 2,
    label: 'It is a pump with four rooms',
    hook: 'A heart is not one bag. It has four separate rooms inside.',
    teachingText:
      'Inside, your heart has four rooms. Two take blood in. Two push blood out. Doors between them open one way only, so blood cannot go backwards.',
    example:
      'Those one-way doors are valves. The sound of them shutting is the thump you hear.',
    applyIt: {
      prompt: 'How many rooms does a heart have?',
      choices: ['One', 'Two', 'Four', 'Six'],
      answer: 2,
      feedback: [
        'It is divided inside.',
        'Two on each side makes four.',
        null,
        'Four is the number.'
      ]
    }
  }
];

const L1_ACTIVITY = {
  title: 'Build a fist-sized heart',
  prep: 'Modelling clay or playdough. Paper and a pencil.',
  needs: ['clay or dough', 'paper', 'a pencil', 'her notebook'],
  steps: [
    'Make a fist. That is roughly the size of your own heart.',
    'Shape the clay into something the same size as your fist.',
    'Press four dents into it for the four rooms.',
    'Draw it on paper and label the four rooms one to four.',
    'Write down which two take blood IN and which two push it OUT.'
  ],
  safety: 'Clay and paper only. Nothing goes in anybody’s mouth.',
  minutes: 12
};

const L1_LEDGER = {
  prompt: 'Write where your heart really sits, and why people point to the left.',
  ifSheIsStuck:
    'Ask her where the thump was loudest when she pressed. Then ask whether loudest means the same as where it lives. That gap is the whole answer.'
};

// =========================================================== LESSON 2
const L2_CHECK_IN = {
  title: 'Two trips, not one',
  text: 'Blood leaves your heart and comes back. Then it leaves again.',
  question: 'Why would blood need to come back before it goes round your body?'
};

const L2_BEATS = [
  {
    n: 1,
    label: 'The short trip goes to the lungs',
    hook: 'Blood makes two journeys, and the first one is very short.',
    teachingText:
      'The right side of your heart pushes blood to your lungs. There it picks up oxygen. Then it comes straight back to the left side.',
    example:
      'That trip is only from your chest to your lungs and back. It is the short one.',
    applyIt: {
      prompt: 'Where does blood go on the SHORT trip?',
      choices: ['To your legs', 'To your lungs', 'To your brain', 'To your stomach'],
      answer: 1,
      feedback: [
        'That is on the long trip.',
        null,
        'Also the long trip.',
        'The long trip again.'
      ]
    }
  },
  {
    n: 2,
    label: 'The long trip goes everywhere else',
    hook: 'The left side pushes hardest, because it has the whole body to reach.',
    teachingText:
      'The left side pushes the oxygen-carrying blood out to your whole body. Down to your toes, up to your head. Then it returns to the right side.',
    example:
      'That is why the left side has the thickest muscle. It has the furthest to push.',
    applyIt: {
      prompt: 'Which side of your heart pushes hardest?',
      choices: ['The right', 'The left', 'Both the same', 'Neither pushes'],
      answer: 1,
      feedback: [
        'It only has to reach the lungs.',
        null,
        'One has much further to go.',
        'A pump pushes.'
      ]
    }
  }
];

const L2_ACTIVITY = {
  title: 'Walk the two circuits',
  prep: 'Space to walk. Two chairs, and something to carry.',
  needs: ['two chairs', 'a small object to carry', 'chalk or string', 'her notebook'],
  steps: [
    'Put one chair down as HEART and one as LUNGS.',
    'Walk the short trip: heart, lungs, back to heart. Carry the object.',
    'Pick the object up at the lungs. That is oxygen.',
    'Now walk the long trip: heart, round the whole room, back to heart.',
    'Write down which trip took longer and why that side pushes harder.'
  ],
  safety: 'Walking, not running. Clear the floor first.',
  minutes: 14
};

const L2_LEDGER = {
  prompt: 'Draw the two trips as two loops, and label where oxygen is picked up.',
  ifSheIsStuck:
    'Two circles joined at one point is a correct drawing. The small loop is the lungs, the big loop is everything else, and the join is the heart.'
};

// =========================================================== LESSON 3
const L3_CHECK_IN = {
  title: 'Never once stopped',
  text: 'Your heart has beaten every second of your whole life. It is beating now.',
  question: 'Roughly how many times do you think it has beaten today?'
};

const L3_BEATS = [
  {
    n: 1,
    label: 'The numbers are enormous, and they are just arithmetic',
    hook: 'Your heart beats about 100,000 times a day, and never asks for a rest.',
    teachingText:
      'A heart beats roughly 100,000 times a day. Over a year that is about 35 million. It does it while you sleep, without you deciding anything.',
    example:
      'If your pulse is 80 a minute, that is 80 × 60 in an hour. Then × 24 for a day.',
    applyIt: {
      prompt: 'Your pulse is 80 a minute. How many beats in an hour?',
      choices: ['800', '4,800', '480', '80'],
      answer: 1,
      feedback: [
        'That is 10 minutes.',
        null,
        'That is 6 minutes.',
        'That is one minute.'
      ]
    }
  },
  {
    n: 2,
    label: 'It rests between beats, not between days',
    hook: 'The rest is hidden. It happens between every single beat.',
    teachingText:
      'Your heart does rest. It rests in the gap after each squeeze. Those tiny gaps add up to hours of rest a day.',
    example:
      'Squeeze your fist hard, then let go. The letting go is the rest. Now do it once a second.',
    applyIt: {
      prompt: 'When does your heart rest?',
      choices: ['At night', 'Between each beat', 'When you sit down', 'It never rests'],
      answer: 1,
      feedback: [
        'It beats all night.',
        null,
        'It beats then too.',
        'It does rest — in tiny gaps.'
      ]
    }
  }
];

const L3_ACTIVITY = {
  title: 'The arithmetic of one day',
  prep: 'Paper, a pencil, and a calculator if she wants one.',
  needs: ['her notebook', 'a pencil', 'a timer'],
  steps: [
    'Count your pulse for 15 seconds. Multiply by 4 for one minute.',
    'Now multiply that by 60. Write down the beats in one hour.',
    'Multiply again by 24. That is roughly one day. Show your working.',
    'Squeeze your fist once a second for one whole minute.',
    'Write down how your hand felt, and what that says about your heart.'
  ],
  safety:
    'Stop squeezing if your hand aches. The numbers are arithmetic practice, and nothing here says whether anybody’s pulse is right or wrong.',
  minutes: 14
};

const L3_LEDGER = {
  prompt: 'Write your beats-per-day number and one sentence about the fist test.',
  ifSheIsStuck:
    'Ask what her hand felt like after sixty squeezes. Then ask her heart to do that all day, every day, since before she was born. The sentence writes itself.'
};

// =========================================================== LESSON 4
const L4_CHECK_IN = {
  title: 'Two numbers, one finding',
  text: 'Take your pulse sitting still. Write it down. Do not move yet.',
  question: 'What do you think will happen to that number after a minute of moving?'
};

const L4_BEATS = [
  {
    n: 1,
    label: 'Resting and working are two different readings',
    hook: 'One pulse number tells you very little. Two tell you a great deal.',
    teachingText:
      'A pulse taken sitting still is a resting reading. A pulse taken after moving is a working reading. A doctor wants both.',
    example:
      'The difference between them is the finding. One number on its own has nothing to be compared with.',
    applyIt: {
      prompt: 'Why does a doctor want two pulse readings?',
      choices: [
        'To check the first was right',
        'Because the difference is the finding',
        'To fill in the form',
        'Because one is always wrong'
      ],
      answer: 1,
      feedback: [
        'Checking is sensible, and not the reason.',
        null,
        'Forms are not why.',
        'Both can be right.'
      ]
    }
  },
  {
    n: 2,
    label: 'And how fast it settles is a third reading',
    hook: 'The going up is easy. The coming down is the interesting part.',
    teachingText:
      'After you stop, your pulse falls. How quickly it falls is its own piece of information. That is why you take it three times, not once.',
    example:
      'Straight after, one minute later, two minutes later. Three numbers, going down.',
    applyIt: {
      prompt: 'What does taking a pulse THREE times after moving show you?',
      choices: [
        'That you counted right',
        'How quickly it settles',
        'How fit you are',
        'Nothing extra'
      ],
      answer: 1,
      feedback: [
        'Checking is not the point.',
        null,
        'It does not measure that.',
        'It shows a shape.'
      ]
    }
  }
];

const L4_ACTIVITY = {
  title: 'Rest, work, and settle — a table of your own',
  prep: 'A timer with seconds. Space to move safely.',
  needs: ['a timer', 'her notebook', 'a ruler for the table'],
  steps: [
    'Sit still one minute. Count 15 seconds × 4. Write it under RESTING.',
    'March on the spot for one minute.',
    'Count again straight away. Write it under WORKING.',
    'Wait a minute, count again. Wait another minute, count again.',
    'Rule a table with all four numbers. Write the biggest difference.'
  ],
  safety:
    'March, do not sprint. Sit down if you feel dizzy. These are YOUR numbers compared with YOUR numbers — never with anybody else’s, and no number here is good or bad.',
  minutes: 14
};

const L4_LEDGER = {
  prompt: 'Write your four numbers in a table. Then one sentence about the shape.',
  ifSheIsStuck:
    'Ask her to read the four numbers aloud in order. Whatever word she reaches for — jumped, dropped, settled — is her sentence, and it is the right one.'
};

// ---------------------------------------------------------------------------

export const HUMANBODY_M5 = [
  {
    id: 'body-m5-01',
    course: 'humanbody',
    module: 5,
    quarter: 2,
    week: 1,
    day: 1,
    n: 1,
    title: 'Where the heart sits, and what is inside it',
    minutes: 30,
    spec: '§10 · beats',
    concept: 'The heart sits near the middle of the chest, tilted left, and has four rooms with one-way valves.',
    standards: [],
    offGrade: null,
    words: ['chest', 'room', 'valve'],
    glossary: [
      { word: 'chest', plain: 'The part of you between your neck and your tummy.' },
      { word: 'room', plain: 'A separate space inside something.' },
      { word: 'valve', plain: 'A door that only opens one way.' }
    ],
    video: {
      id: 'Vot7V7_2UoI',
      url: 'https://www.youtube.com/watch?v=Vot7V7_2UoI',
      title: 'The Human Body: The Heart | Educational Videos For Kids',
      channel: 'Happy Learning English',
      minutes: 6,
      verified: '2026-08-18 · youtube.com/oembed · length read from the duration badge',
      teaches: ['where the heart sits', 'the chambers inside it', 'how blood moves through it'],
      sourceGap:
        'OPEN. Searched: "SciShow Kids OR Operation Ouch heart pumping blood circulatory system video for children" and ""Happy Learning" the heart for kids video AND how a stethoscope works for children youtube" — returned KidsHealth, Operation Ouch, Dr. Binocs and Happy Learning, no Black-educator-led channel. The two standing searches for this course are written down in full on body-m1-01.'
    },
    checkIn: L1_CHECK_IN,
    beats: L1_BEATS,
    activity: L1_ACTIVITY,
    ledger: L1_LEDGER,
    hook: L1_CHECK_IN,
    core: L1_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L1_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'Where does the heart sit?', answer: 'Near the middle, tilted left.', why: 'Loudest on the left is not the same as living there.' },
      { ask: 'What is a valve for?', answer: 'Stopping blood going backwards.', why: 'A door that opens one way only.' }
    ],
    check: [
      {
        prompt: 'Your heart sits:',
        choices: ['Far left', 'Near the middle, tilted left', 'Far right', 'Below your stomach'],
        answer: 1,
        feedback: ['That is where it is loudest.', null, 'The tilt goes the other way.', 'It is in your chest.']
      },
      {
        prompt: 'A heart has how many rooms?',
        choices: ['One', 'Two', 'Four', 'Six'],
        answer: 2,
        feedback: ['It is divided.', 'Two on each side makes four.', null, 'Four.']
      },
      {
        prompt: 'Valves stop blood from:',
        choices: ['Going backwards', 'Getting warm', 'Carrying oxygen', 'Leaving the heart'],
        answer: 0,
        feedback: [null, 'Not a temperature job.', 'It still carries it.', 'Leaving is the point.']
      }
    ]
  },
  {
    id: 'body-m5-02',
    course: 'humanbody',
    module: 5,
    quarter: 2,
    week: 1,
    day: 2,
    n: 2,
    title: 'The two trips blood makes',
    minutes: 30,
    spec: '§10 · beats',
    concept: 'Blood makes a short trip to the lungs for oxygen and a long trip around the whole body.',
    standards: [],
    offGrade: null,
    words: ['circuit', 'oxygen', 'return'],
    glossary: [
      { word: 'circuit', plain: 'A trip that goes round and comes back to the start.' },
      { word: 'oxygen', plain: 'Part of the air that your body needs.' },
      { word: 'return', plain: 'To come back to where you started.' }
    ],
    video: {
      id: 'tg_ObDJEaGo',
      url: 'https://www.youtube.com/watch?v=tg_ObDJEaGo',
      title: 'How Your Heart Works? - The Dr. Binocs Show | Best Learning Videos For Kids | Peekaboo Kidz',
      channel: 'Peekaboo Kidz',
      minutes: 4,
      verified: '2026-08-18 · youtube.com/oembed · length read from the duration badge',
      teaches: ['how the heart pumps', 'the two circuits of blood', 'why blood goes to the lungs first'],
      sourceGap: 'OPEN. Same searches as body-m5-01 and body-m1-01, both written down there.'
    },
    checkIn: L2_CHECK_IN,
    beats: L2_BEATS,
    activity: L2_ACTIVITY,
    ledger: L2_LEDGER,
    hook: L2_CHECK_IN,
    core: L2_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L2_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'Where does the short trip go?', answer: 'To the lungs and back.', why: 'To pick up oxygen.' },
      { ask: 'Why is the left side stronger?', answer: 'It pushes to the whole body.', why: 'Much further to reach.' }
    ],
    check: [
      {
        prompt: 'The short trip takes blood to your:',
        choices: ['Legs', 'Lungs', 'Brain', 'Stomach'],
        answer: 1,
        feedback: ['Long trip.', null, 'Long trip.', 'Long trip.']
      },
      {
        prompt: 'Blood picks up oxygen at your:',
        choices: ['Heart', 'Stomach', 'Lungs', 'Skin'],
        answer: 2,
        feedback: ['The heart pushes it.', 'That is food.', null, 'Skin keeps things out.']
      },
      {
        prompt: 'The side of the heart with the thickest muscle is:',
        choices: ['The left', 'The right', 'Both the same', 'The top'],
        answer: 0,
        feedback: [null, 'It only reaches the lungs.', 'One works harder.', 'Not how it is divided.']
      }
    ]
  },
  {
    id: 'body-m5-03',
    course: 'humanbody',
    module: 5,
    quarter: 2,
    week: 2,
    day: 1,
    n: 3,
    title: 'A hundred thousand times a day',
    minutes: 30,
    spec: '§10 · beats',
    concept: 'A heart beats roughly 100,000 times a day, and it rests in the gap between beats rather than between days.',
    standards: [],
    offGrade: null,
    words: ['million', 'multiply', 'rest'],
    glossary: [
      { word: 'million', plain: 'A thousand thousands. A very big number.' },
      { word: 'multiply', plain: 'To add a number to itself many times.' },
      { word: 'rest', plain: 'To stop working for a while.' }
    ],
    video: {
      id: 'bJVcgROEJAo',
      url: 'https://www.youtube.com/watch?v=bJVcgROEJAo',
      title: 'The Human Heart: AMAZING FUN FACTS | Educational Videos For Kids',
      channel: 'Happy Learning English',
      minutes: 2,
      verified: '2026-08-18 · youtube.com/oembed · length read from the duration badge',
      teaches: ['how often a heart beats', 'how much blood it moves', 'facts about the heart across a lifetime'],
      sourceGap: 'OPEN. Same searches as body-m5-01 and body-m1-01, both written down there.'
    },
    checkIn: L3_CHECK_IN,
    beats: L3_BEATS,
    activity: L3_ACTIVITY,
    ledger: L3_LEDGER,
    hook: L3_CHECK_IN,
    core: L3_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L3_ACTIVITY.steps.join(' '),
    practice: [
      { ask: '70 beats a minute — how many in an hour?', answer: '4,200.', why: '70 × 60.' },
      { ask: 'When does a heart rest?', answer: 'In the gap after every beat.', why: 'The gaps add up.' }
    ],
    check: [
      {
        prompt: 'A pulse of 80 a minute is how many beats in an hour?',
        choices: ['800', '4,800', '480', '80'],
        answer: 1,
        feedback: ['That is 10 minutes.', null, 'That is 6 minutes.', 'That is one minute.']
      },
      {
        prompt: 'Roughly how many times does a heart beat in a day?',
        choices: ['1,000', '10,000', '100,000', '10 million'],
        answer: 2,
        feedback: ['Far more.', 'Still more.', null, 'That is nearer a year.']
      },
      {
        prompt: 'Your heart rests:',
        choices: ['At night', 'Between each beat', 'When you sit', 'Never'],
        answer: 1,
        feedback: ['It beats all night.', null, 'It beats then too.', 'It does rest, in tiny gaps.']
      }
    ]
  },
  {
    id: 'body-m5-04',
    course: 'humanbody',
    module: 5,
    quarter: 2,
    week: 2,
    day: 2,
    n: 4,
    title: 'Resting, working, and settling',
    minutes: 30,
    spec: '§10 · beats',
    concept: 'One pulse reading says little — the difference between resting and working, and how fast it settles, is the finding.',
    standards: [],
    offGrade: null,
    words: ['resting', 'working', 'settle'],
    glossary: [
      { word: 'resting', plain: 'Sitting still and not working.' },
      { word: 'working', plain: 'Moving and using your muscles.' },
      { word: 'settle', plain: 'To go slowly back to normal.' }
    ],
    video: {
      id: 'QtphvUlwJMQ',
      url: 'https://www.youtube.com/watch?v=QtphvUlwJMQ',
      title: 'Science for kids | Body Parts - CARDIOVASCULAR SYSTEM | Operation Ouch | Experiments for kids',
      channel: 'Operation Ouch',
      minutes: 37,
      verified: '2026-08-18 · youtube.com/oembed · length read from the duration badge',
      teaches: ['how the heart responds to exercise', 'measuring heart rate', 'experiments with the cardiovascular system'],
      sourceGap:
        'OPEN. Same searches as body-m5-01 and body-m1-01. ⚠️ LENGTH: 37 minutes — the longest video in the app. It is a COMPILATION of separate items, so it stops and restarts cleanly. Gigi’s call, Aug 17: "Just leave the videos alone the way they are. It maybe good to have her watch the full videos." Worth knowing before the Thursday: this one will not fit in a single 30-minute block.'
    },
    checkIn: L4_CHECK_IN,
    beats: L4_BEATS,
    activity: L4_ACTIVITY,
    ledger: L4_LEDGER,
    hook: L4_CHECK_IN,
    core: L4_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L4_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'Why two readings, not one?', answer: 'The difference is the finding.', why: 'One number has nothing to compare with.' },
      { ask: 'What does a third reading show?', answer: 'How quickly it settles.', why: 'The coming down is its own information.' }
    ],
    check: [
      {
        prompt: 'A doctor wants two pulse readings because:',
        choices: ['One is always wrong', 'The difference is the finding', 'To fill in a form', 'To check the counting'],
        answer: 1,
        feedback: ['Both can be right.', null, 'Forms are not why.', 'Sensible, and not the reason.']
      },
      {
        prompt: 'A resting pulse is taken when you are:',
        choices: ['Sitting still', 'Marching', 'Running', 'Just finished moving'],
        answer: 0,
        feedback: [null, 'That is working.', 'Also working.', 'That is the working reading.']
      },
      {
        prompt: 'Taking your pulse three times after moving shows:',
        choices: ['That you counted right', 'How quickly it settles', 'How fit you are', 'Nothing extra'],
        answer: 1,
        feedback: ['Not the point.', null, 'It does not measure that.', 'It shows a shape.']
      }
    ]
  }
];

export const HUMANBODY_M5_META = {
  courseId: 'humanbody',
  module: 5,
  title: 'The Heart, a Pump',
  blurb:
    'Inside the pump she already learned to count — four rooms, one-way valves, two circuits, and the difference between a resting pulse and a working one.'
};

export function humanbodyM5LessonById(id) {
  return HUMANBODY_M5.find((l) => l.id === id) || null;
}

export default HUMANBODY_M5;
