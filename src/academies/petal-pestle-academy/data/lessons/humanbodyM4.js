// ---------------------------------------------------------------------------
// THE HUMAN BODY · MODULE 4 — MUSCLES, THE PULL
//
// Four lessons. Quarter 1, weeks 7 and 8. Tuesday and Thursday, 30 minutes.
// The last module of Quarter 1. Week 9 is the quarter exam.
//
// The doctor's action: TEST A REFLEX. A doctor taps a knee and watches. It is
// the purest version of what Module 1 started with — observe, then measure —
// because a reflex is a measurement the body takes for you.
//
// ---- THE ONE IDEA THE WHOLE MODULE HANGS ON ----
//
// MUSCLES ONLY PULL. They never push. That single fact explains why they come
// in pairs, why the elbow needs two of them, and why a body could not work with
// half its muscles. It is also genuinely surprising to a nine-year-old, which
// is why it opens the module rather than being tucked into a list.
//
// ---- MEASUREMENT ----
//
// Reaction time, in Lesson 4, is ELAPSED TIME — her weakest single item on the
// Check-In at 0 of 1. It is measured with a dropped ruler and counted in
// centimetres, so it uses the ruler she has already met in Module 3 and needs
// no stopwatch she does not own.
//
// ---- SAFETY ----
//
// No tapping anybody's knee with anything hard, and nothing that invites her to
// decide whether a reflex is "right". A reflex is watched and described, never
// judged — a doctor testing one is looking for information, and reading that
// information is a doctor's job and nobody else's. No strength comparisons, no
// weight, nothing about size or appearance.
//
// Quarter 1 cap: 11 words a sentence.
// ---------------------------------------------------------------------------

// =========================================================== LESSON 1
const L1_CHECK_IN = {
  title: 'Try to push with a muscle',
  text: 'Put your hand flat on the table. Now make your arm muscle push it down.',
  question: 'Something odd happened. Did a muscle push, or did one pull?'
};

const L1_BEATS = [
  {
    n: 1,
    label: 'A muscle can only pull',
    hook: 'Every muscle you own does exactly one thing. It gets shorter.',
    teachingText:
      'A muscle works by getting shorter. That is all it can do. Getting shorter pulls the two ends closer together. Nothing about it can push.',
    example:
      'Think of a rope. You can pull a gate shut with a rope. You cannot push one open with it.',
    applyIt: {
      prompt: 'A muscle moves a bone by:',
      choices: ['Pushing it', 'Pulling it', 'Growing longer', 'Turning'],
      answer: 1,
      feedback: [
        'A muscle cannot push at all.',
        null,
        'It gets shorter, not longer.',
        'It is not a wheel.'
      ]
    }
  },
  {
    n: 2,
    label: 'Muscles pull on bones, through tendons',
    hook: 'Look at the back of your hand and wiggle a finger. Watch the cords move.',
    teachingText:
      'A muscle is joined to a bone by a tough cord. That cord is a tendon. When the muscle gets shorter, the tendon pulls the bone.',
    example:
      'The cords moving on the back of your hand are tendons. The muscles doing the pulling are up in your forearm.',
    applyIt: {
      prompt: 'What joins a muscle to a bone?',
      choices: ['A tendon', 'A joint', 'Skin', 'A nerve'],
      answer: 0,
      feedback: [
        null,
        'A joint is where two bones meet.',
        'Skin covers it all.',
        'A nerve carries the message, not the pull.'
      ]
    }
  }
];

const L1_ACTIVITY = {
  title: 'Watch the cords, and find the puller',
  prep: 'Nothing to prepare.',
  needs: ['her notebook', 'a pencil'],
  steps: [
    'Rest your hand flat and wiggle each finger in turn.',
    'Watch the cords move on the back of your hand. Draw them.',
    'Now put your other hand on your forearm and wiggle again.',
    'Write down where you felt the movement, and where you saw it.',
    'Write one sentence about why those two places are different.'
  ],
  safety: 'Just looking and wiggling. Nothing to squeeze and nobody to test.',
  minutes: 12
};

const L1_LEDGER = {
  prompt: 'Write down why a muscle cannot push, in your own words.',
  ifSheIsStuck:
    'Hand her a piece of string. Ask her to pull a book across the table with it, then to push the book back with it. The string will not push, and neither will a muscle.'
};

// =========================================================== LESSON 2
const L2_CHECK_IN = {
  title: 'The one that gets fat',
  text: 'Bend your elbow up hard. Feel the top of your arm with your other hand.',
  question: 'Something went short and hard. What do you think it just did?'
};

const L2_BEATS = [
  {
    n: 1,
    label: 'Muscles work in pairs, pulling opposite ways',
    hook: 'If a muscle can only pull, something else has to pull it back.',
    teachingText:
      'One muscle bends your elbow. A second one straightens it. They sit on opposite sides and take turns. Neither could do the other job.',
    example:
      'The one on top bends your arm. The one underneath straightens it. Two pulls, two directions.',
    applyIt: {
      prompt: 'Why does an elbow need two muscles?',
      choices: [
        'For extra strength',
        'Because one cannot push it back',
        'Because bones are heavy',
        'In case one gets tired'
      ],
      answer: 1,
      feedback: [
        'Strength is not the reason.',
        null,
        'Weight is not the reason either.',
        'Spares are not how it works.'
      ]
    }
  },
  {
    n: 2,
    label: 'One shortens while the other lets go',
    hook: 'They never both pull at once. One works, one relaxes.',
    teachingText:
      'When one muscle of a pair gets shorter, the other must relax and stretch. If both pulled at the same time, your arm would lock and go nowhere.',
    example:
      'Bend and straighten your arm slowly. Feel the top go hard, then soft. They are taking turns.',
    applyIt: {
      prompt: 'While one muscle of a pair pulls, the other:',
      choices: ['Pulls too', 'Relaxes and stretches', 'Falls off', 'Pushes'],
      answer: 1,
      feedback: [
        'Then nothing would move.',
        null,
        'It stays where it is.',
        'It cannot push.'
      ]
    }
  }
];

const L2_ACTIVITY = {
  title: 'Feel both halves of the pair',
  prep: 'Nothing to prepare.',
  needs: ['her notebook', 'a pencil', 'a light book'],
  steps: [
    'Rest one hand on the top of your other arm. Bend the elbow up.',
    'Write down what you felt happen under your hand.',
    'Now move your hand underneath the arm. Straighten the elbow.',
    'Write down what you felt that time.',
    'Hold a light book and do it again slowly. Write which one worked harder.'
  ],
  safety:
    'A light book only. This is about feeling the two muscles take turns, not about how much anybody can lift.',
  minutes: 12
};

const L2_LEDGER = {
  prompt: 'Draw your arm and mark the two muscles. Say what each one does.',
  ifSheIsStuck:
    'Two arrows on a drawing is a complete answer. One arrow bending the arm, one straightening it, and she has understood the whole lesson.'
};

// =========================================================== LESSON 3
const L3_CHECK_IN = {
  title: 'Who told your hand to move?',
  text: 'Wiggle your fingers. You decided to, and then it happened.',
  question: 'Something carried that decision from your head to your hand. What?'
};

const L3_BEATS = [
  {
    n: 1,
    label: 'Nerves carry the message',
    hook: 'The message from your brain to your foot travels faster than a car.',
    teachingText:
      'Your brain sends a message down a nerve. The nerve carries it to the muscle. The muscle gets shorter. All of that takes less than a second.',
    example:
      'Nerves run everywhere, like wires. Your spinal cord is the thick bundle down your back.',
    applyIt: {
      prompt: 'What carries a message from your brain to a muscle?',
      choices: ['A tendon', 'A bone', 'A nerve', 'Blood'],
      answer: 2,
      feedback: [
        'A tendon pulls. It does not carry messages.',
        'Bones carry nothing.',
        null,
        'Blood carries oxygen and food.'
      ]
    }
  },
  {
    n: 2,
    label: 'Three parts, working in order',
    hook: 'Brain, nerve, muscle. Break any one and nothing moves.',
    teachingText:
      'Moving needs three things in order. The brain decides. The nerve carries. The muscle pulls. Bones and joints are what gets moved.',
    example:
      'It is the same order every time — decide, carry, pull. A doctor checking movement is checking all three.',
    applyIt: {
      prompt: 'Put these in order: nerve · muscle · brain.',
      choices: [
        'Muscle, nerve, brain',
        'Brain, nerve, muscle',
        'Nerve, brain, muscle',
        'Brain, muscle, nerve'
      ],
      answer: 1,
      feedback: [
        'That is backwards.',
        null,
        'The brain goes first.',
        'The nerve is in the middle.'
      ]
    }
  }
];

const L3_ACTIVITY = {
  title: 'Map the route',
  prep: 'A large sheet of paper.',
  needs: ['a large sheet of paper', 'coloured pencils', 'her notebook'],
  steps: [
    'Draw a big outline of a person on the paper.',
    'Mark the brain. Draw a line down the back for the spinal cord.',
    'Draw one nerve going from there to a hand, and one to a foot.',
    'Label the three parts: BRAIN, NERVE, MUSCLE.',
    'Write the order along the bottom, with arrows between them.'
  ],
  safety: 'Drawing only.',
  minutes: 12
};

const L3_LEDGER = {
  prompt: 'Write the three parts in order and what each one does.',
  ifSheIsStuck:
    'Ask her to say it as a sentence about her own hand. "My brain said move, the nerve carried it, my muscle pulled." That is exactly right.'
};

// =========================================================== LESSON 4
const L4_CHECK_IN = {
  title: 'The one you cannot stop',
  text: 'Ask a grown-up to pretend to flick at your eyes. You blinked. You could not help it.',
  question: 'You did not decide to blink. So who did?'
};

const L4_BEATS = [
  {
    n: 1,
    label: 'A reflex skips your brain to save time',
    hook: 'Your hand leaves a hot pan before your brain even knows it was hot.',
    teachingText:
      'A reflex is a move you do not decide. The message goes to your spinal cord and straight back out. Your brain finds out afterwards.',
    example:
      'That is why the hand is already moving before it hurts. Skipping the brain saves the time.',
    applyIt: {
      prompt: 'A reflex is fast because it:',
      choices: [
        'Uses a bigger nerve',
        'Does not go all the way to your brain',
        'Uses stronger muscles',
        'Happens twice'
      ],
      answer: 1,
      feedback: [
        'Size is not the reason.',
        null,
        'The same muscles do it.',
        'It happens once.'
      ]
    }
  },
  {
    n: 2,
    label: 'Which is why a doctor taps a knee',
    hook: 'The tap is a question, and the kick is the answer.',
    teachingText:
      'A doctor taps just under your kneecap. Your leg kicks by itself. That tells the doctor the nerve and the muscle are talking to each other.',
    example:
      'She is not testing how hard you can kick. She is checking that the route works, and how fast.',
    applyIt: {
      prompt: 'When a doctor taps a knee, she is checking:',
      choices: [
        'How strong you are',
        'That the nerve and muscle are working',
        'How tall you are',
        'Whether it hurts'
      ],
      answer: 1,
      feedback: [
        'Strength is not what a reflex shows.',
        null,
        'Nothing to do with height.',
        'It should not hurt.'
      ]
    }
  }
];

const L4_ACTIVITY = {
  title: 'The dropped ruler — reaction time you can measure',
  prep: 'A 30 cm ruler and a willing grown-up.',
  needs: ['a 30 cm ruler', 'her notebook', 'a grown-up'],
  steps: [
    'Hold your hand open, ready to catch, with fingers apart.',
    'A grown-up holds the ruler above your hand, at the 0 end.',
    'They drop it without warning. Catch it. Read the number you caught at.',
    'Do it five times. Write down all five numbers.',
    'Circle your best and your worst. Then work out the difference.'
  ],
  safety:
    'A ruler and a catch, nothing more. Nobody taps anybody’s knee with anything, and nothing here says whether a number is good or bad. Everybody’s numbers are different and all of them are fine.',
  minutes: 14
};

const L4_LEDGER = {
  prompt: 'Write your five numbers, then one sentence about whether you got better.',
  ifSheIsStuck:
    'Ask whether the last two catches were lower numbers than the first two. Getting better at expecting it is a real finding, and so is not getting better.'
};

// ---------------------------------------------------------------------------

export const HUMANBODY_M4 = [
  {
    id: 'body-m4-01',
    course: 'humanbody',
    module: 4,
    quarter: 1,
    week: 7,
    day: 1,
    n: 1,
    title: 'Muscles only pull',
    minutes: 30,
    spec: '§10 · beats',
    concept: 'A muscle works by getting shorter, so it can only ever pull — and it pulls bones through tendons.',
    standards: [],
    offGrade: null,
    words: ['muscle', 'pull', 'tendon'],
    glossary: [
      { word: 'muscle', plain: 'A part of you that gets shorter to move a bone.' },
      { word: 'pull', plain: 'To bring something toward you.' },
      { word: 'tendon', plain: 'A tough cord joining a muscle to a bone.' }
    ],
    video: {
      id: 'OSsntU6sTWI',
      url: 'https://www.youtube.com/watch?v=OSsntU6sTWI',
      title: 'Muscular System for Kids | Muscles for kids | A fun intro to the muscular system',
      channel: 'Learn Bright',
      minutes: 8,
      verified: '2026-08-18 · youtube.com/oembed · length read from the duration badge',
      teaches: ['what muscles are', 'how muscles move bones', 'the kinds of muscle in the body'],
      sourceGap:
        'OPEN. Searched: "Homeschool Pop OR SciShow Kids muscles for kids video how muscles pull bones move" — returned PBS, Study.com, Sid the Science Kid and SciShow Kids, no Black-educator-led channel. ⚠️ ALSO REJECTED HERE: 3haTJCOkyxA, "How do our muscles and bones work? | BBC Teach", which verified fine at oEmbed but FAILED TO LOAD IN A PLAYLIST TWICE — almost certainly UK-only, which means it would not embed for her in Georgia either. A video that verifies and will not play is worse than one that never verified. The two standing searches for this course are on body-m1-01.'
    },
    checkIn: L1_CHECK_IN,
    beats: L1_BEATS,
    activity: L1_ACTIVITY,
    ledger: L1_LEDGER,
    hook: L1_CHECK_IN,
    core: L1_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L1_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'What is the only thing a muscle can do?', answer: 'Get shorter, which pulls.', why: 'There is no pushing muscle anywhere.' },
      { ask: 'What joins muscle to bone?', answer: 'A tendon.', why: 'The cords on the back of your hand.' }
    ],
    check: [
      {
        prompt: 'A muscle moves a bone by:',
        choices: ['Pushing it', 'Pulling it', 'Growing longer', 'Turning it'],
        answer: 1,
        feedback: ['Muscles cannot push.', null, 'It gets shorter.', 'It is not a wheel.']
      },
      {
        prompt: 'The cords you see on the back of your hand are:',
        choices: ['Muscles', 'Bones', 'Tendons', 'Nerves'],
        answer: 2,
        feedback: ['Those are up in your forearm.', 'Bones do not move like that.', null, 'Nerves are too fine to see.']
      },
      {
        prompt: 'A rope is a good model for a muscle because:',
        choices: ['It is long', 'It can pull but not push', 'It is strong', 'It is soft'],
        answer: 1,
        feedback: ['Length is not the point.', null, 'Strength is not the point either.', 'Nor softness.']
      }
    ]
  },
  {
    id: 'body-m4-02',
    course: 'humanbody',
    module: 4,
    quarter: 1,
    week: 7,
    day: 2,
    n: 2,
    title: 'Why they come in pairs',
    minutes: 30,
    spec: '§10 · beats',
    concept: 'Because a muscle can only pull, muscles work in opposing pairs — one shortens while the other relaxes.',
    standards: [],
    offGrade: null,
    words: ['pair', 'bend', 'straighten'],
    glossary: [
      { word: 'pair', plain: 'Two things that work together.' },
      { word: 'bend', plain: 'To fold at a joint.' },
      { word: 'straighten', plain: 'To make straight again.' }
    ],
    video: {
      id: 'j918PoWWaB0',
      url: 'https://www.youtube.com/watch?v=j918PoWWaB0',
      title: 'How Do Our Bodies Move?',
      channel: 'SciShow Kids',
      minutes: 4,
      verified: '2026-08-18 · youtube.com/oembed · length read from the duration badge',
      teaches: ['how muscles and bones work together to move', 'that muscles pull on bones', 'muscles working in pairs'],
      sourceGap: 'OPEN. Same searches as body-m4-01 and body-m1-01, both written down there.'
    },
    checkIn: L2_CHECK_IN,
    beats: L2_BEATS,
    activity: L2_ACTIVITY,
    ledger: L2_LEDGER,
    hook: L2_CHECK_IN,
    core: L2_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L2_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'Why two muscles at an elbow?', answer: 'One cannot push it back.', why: 'Pulling only works one way.' },
      { ask: 'What does the other one do meanwhile?', answer: 'Relaxes and stretches.', why: 'They take turns.' }
    ],
    check: [
      {
        prompt: 'Muscles come in pairs because:',
        choices: ['Two are stronger', 'One cannot push a bone back', 'Bones are heavy', 'One might get tired'],
        answer: 1,
        feedback: ['Strength is not the reason.', null, 'Weight is not it.', 'Spares are not how it works.']
      },
      {
        prompt: 'If both muscles of a pair pulled at once, your arm would:',
        choices: ['Move faster', 'Lock still', 'Bend twice', 'Get longer'],
        answer: 1,
        feedback: ['Nothing would move.', null, 'It cannot bend twice.', 'Arms do not stretch.']
      },
      {
        prompt: 'The muscle on top of your arm:',
        choices: ['Straightens the elbow', 'Bends the elbow', 'Does both', 'Does neither'],
        answer: 1,
        feedback: ['That is the one underneath.', null, 'Neither can do both.', 'It has a job.']
      }
    ]
  },
  {
    id: 'body-m4-03',
    course: 'humanbody',
    module: 4,
    quarter: 1,
    week: 8,
    day: 1,
    n: 3,
    title: 'Brain, nerve, muscle',
    minutes: 30,
    spec: '§10 · beats',
    concept: 'Movement runs in a fixed order — the brain decides, a nerve carries the message, the muscle pulls.',
    standards: [],
    offGrade: null,
    words: ['nerve', 'message', 'order'],
    glossary: [
      { word: 'nerve', plain: 'A thin line that carries messages round your body.' },
      { word: 'message', plain: 'An instruction sent from one place to another.' },
      { word: 'order', plain: 'The sequence things happen in.' }
    ],
    video: {
      id: 'KZVeFTDszTs',
      url: 'https://www.youtube.com/watch?v=KZVeFTDszTs',
      title: 'The Nervous System  | Video for Kids',
      channel: 'learning junction',
      minutes: 3,
      verified: '2026-08-18 · youtube.com/oembed · length read from the duration badge',
      teaches: ['what nerves are', 'how a message travels from the brain', 'the spinal cord'],
      sourceGap:
        'OPEN. Searched: ""Free School" OR "Smile and Learn" nervous system reflexes brain for kids video" — returned KidsHealth, Study.com, Happy Learning and Untamed Science, no Black-educator-led channel. ⚠️ Note the title carries a DOUBLE SPACE before the pipe — recorded exactly as YouTube returned it, because a title is copied and never tidied. Identity of this channel is UNKNOWN and recorded as unknown.'
    },
    checkIn: L3_CHECK_IN,
    beats: L3_BEATS,
    activity: L3_ACTIVITY,
    ledger: L3_LEDGER,
    hook: L3_CHECK_IN,
    core: L3_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L3_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'The three parts, in order.', answer: 'Brain, nerve, muscle.', why: 'Decide, carry, pull.' },
      { ask: 'What is the spinal cord?', answer: 'The thick bundle of nerves down your back.', why: 'The main line.' }
    ],
    check: [
      {
        prompt: 'A nerve carries:',
        choices: ['Blood', 'Messages', 'Air', 'Food'],
        answer: 1,
        feedback: ['Blood goes in tubes.', null, 'Air goes to your lungs.', 'Food goes to your stomach.']
      },
      {
        prompt: 'The right order is:',
        choices: ['Muscle, nerve, brain', 'Nerve, brain, muscle', 'Brain, nerve, muscle', 'Brain, muscle, nerve'],
        answer: 2,
        feedback: ['Backwards.', 'The brain is first.', null, 'The nerve is in the middle.']
      },
      {
        prompt: 'The thick bundle of nerves down your back is your:',
        choices: ['Spine bone', 'Spinal cord', 'Tendon', 'Rib'],
        answer: 1,
        feedback: ['The bone is around it.', null, 'A tendon pulls bones.', 'Ribs are at the front and sides.']
      }
    ]
  },
  {
    id: 'body-m4-04',
    course: 'humanbody',
    module: 4,
    quarter: 1,
    week: 8,
    day: 2,
    n: 4,
    title: 'Reflexes, and testing one',
    minutes: 30,
    spec: '§10 · beats',
    concept: 'A reflex skips the brain and returns from the spinal cord, which is why a doctor uses one to test the route.',
    standards: [],
    offGrade: null,
    words: ['reflex', 'automatic', 'react'],
    glossary: [
      { word: 'reflex', plain: 'A move your body makes without you deciding.' },
      { word: 'automatic', plain: 'Happens by itself, with no thinking.' },
      { word: 'react', plain: 'To do something because something else happened.' }
    ],
    video: {
      id: 'FssFyeKRCic',
      url: 'https://www.youtube.com/watch?v=FssFyeKRCic',
      title: 'The Nervous System | Educational Videos for Kids',
      channel: 'FlexFlix Kids in English',
      minutes: 3,
      verified: '2026-08-18 · youtube.com/oembed · length read from the duration badge',
      teaches: ['reflex actions', 'that some responses skip the brain', 'why reflexes protect the body'],
      sourceGap:
        'OPEN. Same searches as body-m4-03 and body-m1-01. ⚠️ ALSO REJECTED HERE, AND ON LEVEL RATHER THAN LENGTH: c-dD0N53QRg, "2-Minute Neuroscience: Knee-jerk Reflex" by Neuroscientifically Challenged. It is two minutes and squarely on topic, and it is an ADULT neuroscience channel explaining reflex arcs with motor neurones and antagonistic muscle groups. Her Grammar & Usage measured 2.15 and her independent reading is below a 3.46 listening score. That is the v3.40 failure — content pitched years above her — and it is refused here rather than caught later.'
    },
    checkIn: L4_CHECK_IN,
    beats: L4_BEATS,
    activity: L4_ACTIVITY,
    ledger: L4_LEDGER,
    hook: L4_CHECK_IN,
    core: L4_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L4_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'Why is a reflex so fast?', answer: 'It does not go to your brain.', why: 'It turns round at the spinal cord.' },
      { ask: 'What is a doctor checking with a knee tap?', answer: 'That nerve and muscle are talking.', why: 'Not strength.' }
    ],
    check: [
      {
        prompt: 'A reflex is:',
        choices: ['Something you decide', 'Something automatic', 'A kind of muscle', 'A kind of bone'],
        answer: 1,
        feedback: ['You do not decide it.', null, 'It uses muscles, it is not one.', 'Nothing to do with bones.']
      },
      {
        prompt: 'A reflex message turns round at your:',
        choices: ['Brain', 'Spinal cord', 'Hand', 'Heart'],
        answer: 1,
        feedback: ['Skipping the brain is what makes it fast.', null, 'The hand is where it started.', 'Not involved.']
      },
      {
        prompt: 'The knee tap tells a doctor:',
        choices: ['How strong you are', 'That the route works', 'How tall you are', 'Whether you are tired'],
        answer: 1,
        feedback: ['A reflex does not measure strength.', null, 'Nothing to do with height.', 'Nor tiredness.']
      }
    ]
  }
];

export const HUMANBODY_M4_META = {
  courseId: 'humanbody',
  module: 4,
  title: 'Muscles, the Pull',
  blurb:
    'The one fact the whole body runs on — a muscle can only pull — and everything that follows from it: pairs, tendons, the brain-nerve-muscle route, and the reflex a doctor tests.'
};

export function humanbodyM4LessonById(id) {
  return HUMANBODY_M4.find((l) => l.id === id) || null;
}

export default HUMANBODY_M4;
