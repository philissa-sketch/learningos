// ---------------------------------------------------------------------------
// THE HUMAN BODY · MODULE 13 — EYES AND EARS
//
// Four lessons. Quarter 4, weeks 1 and 2. Tuesday and Thursday, 30 minutes.
// Module 12 gave her nerves carrying messages IN. This asks where those
// messages come from in the first place.
//
// ---- THE DOCTOR'S ACTION: FIND YOUR OWN BLIND SPOT, AND MEASURE IT ----
//
// Every eye has a hole in its picture where the nerve leaves the back of it.
// She finds hers with a card and two marks, then measures HOW FAR FROM HER FACE
// the mark disappears — in centimetres, twice, once per eye. It is the oldest
// self-experiment in vision, it is completely safe, and it produces a number.
//
// Lesson 4 measures a DISTANCE IN METRES: how far away a ticking clock stops
// being audible, paced out and then converted. Measurement scored 2.00 and
// units 0 of 3, both at the test floor, and Quarter 4 is the last chance this
// course gets at them.
//
// ---- READING CAP ----
//
// Quarter 4: 16 words a sentence, with a floor of 7.5. The highest cap of the
// year and the highest floor. §10.1.
//
// ---- SAFETY ----
//
// Eyes and ears is where a body course drifts into telling a child her senses
// are faulty. It does not happen here.
//
//   · NOTHING is put in an eye or an ear. Not a finger, not a cotton bud,
//     nothing. Said in the activity of every lesson that goes near one.
//   · No hearing test, no eye test, and NO RESULT MEANS ANYTHING IS WRONG.
//     The blind spot is universal. Finding one is the normal outcome.
//   · Nothing about glasses, hearing aids, or needing either — and nothing
//     about how anybody’s eyes look.
//   · The loud-sound lesson protects hearing without frightening her: it names
//     what is loud and says to move away, and it does not describe damage.
// ---------------------------------------------------------------------------

// =========================================================== LESSON 1
const L1_CHECK_IN = {
  title: 'Five doors',
  text: 'Sit still for a moment and notice one thing you can see, one you can hear, and one you can feel.',
  question: 'Those three arrived by different routes. What do you think they all have in common?'
};

const L1_BEATS = [
  {
    n: 1,
    label: 'A sense turns something outside you into a message inside you',
    hook: 'Your brain has never seen anything. It has only ever read messages about it.',
    teachingText:
      'Light, sound, smell, taste and touch are all things out in the world. Each sense organ catches one of them and turns it into the same kind of nerve signal. Your brain reads the signals and builds the world back up.',
    example:
      'An eye does not send a picture up a wire. It sends millions of tiny signals, and the picture is made at the other end.',
    applyIt: {
      prompt: 'What does a sense organ actually do?',
      choices: ['Sends a picture to the brain', 'Turns something outside into a nerve signal', 'Thinks about what it finds', 'Stores memories'],
      answer: 1,
      feedback: [
        'Nothing travels up a nerve as a picture.',
        null,
        'The brain does the thinking.',
        'Memory is a brain job.'
      ]
    }
  },
  {
    n: 2,
    label: 'Different animals have different doors open',
    hook: 'A dog is walking through a world you cannot smell.',
    teachingText:
      'Which senses an animal has, and how sharp they are, depends on how it lives. A dog reads far more with its nose than you ever could. An owl hears a mouse under snow.',
    example:
      'None of those animals is better than you. They have different doors open, because they need different things.',
    applyIt: {
      prompt: 'A dog smells far better than a person because:',
      choices: ['It is cleverer', 'Its nose has far more sense cells', 'It has a bigger brain', 'It eats differently'],
      answer: 1,
      feedback: [
        'Cleverness is not what smelling needs.',
        null,
        'Brain size is not the reason.',
        'Diet is not the reason.'
      ]
    }
  }
];

const L1_ACTIVITY = {
  title: 'Which sense told you?',
  prep: 'Paper, a pencil, and a helper with a few safe household objects.',
  needs: ['paper', 'a pencil', 'a helper', 'her notebook'],
  steps: [
    'Rule five columns and head them see, hear, smell, taste and touch.',
    'Have your helper bring you five ordinary things, one at a time, while your eyes are shut.',
    'For each one, write down which senses told you anything at all about it.',
    'Open your eyes and write down what seeing added that the others missed.',
    'Write one sentence about which sense did the most work with your eyes shut.'
  ],
  safety:
    'Nothing is tasted unless a grown-up says yes and it is food she already eats. Nothing goes near an eye, an ear or a nose — objects are held, not poked with.',
  minutes: 13
};

const L1_LEDGER = {
  prompt: 'Write down what every sense organ does, in one sentence of your own.',
  ifSheIsStuck:
    'It turns something outside into a message inside. If she says it as "it changes it into something the brain can read", that is the same sentence and it is hers.'
};

// =========================================================== LESSON 2
const L2_CHECK_IN = {
  title: 'A hole in the picture',
  text: 'The nerve carrying pictures out of your eye leaves through the back of it, and where it leaves there are no sense cells at all.',
  question: 'If part of your eye cannot see, why does the world not have a hole in it?'
};

const L2_BEATS = [
  {
    n: 1,
    label: 'An eye works like a camera, and the picture arrives upside down',
    hook: 'Everything you have ever seen landed on the back of your eye the wrong way up.',
    teachingText:
      'Light comes in through a clear window, passes through a lens, and lands on a sheet of sense cells at the back. The lens flips the picture over on the way. Your brain has always turned it back, so you have never noticed.',
    example:
      'The black circle in the middle of an eye is not a spot. It is a hole, and the darkness is the inside of your own eye.',
    applyIt: {
      prompt: 'The picture that lands at the back of your eye is:',
      choices: ['The right way up', 'Upside down', 'Flat grey', 'Not a picture at all'],
      answer: 1,
      feedback: [
        'The lens flips it on the way in.',
        null,
        'It is in full colour.',
        'It is very much a picture.'
      ]
    }
  },
  {
    n: 2,
    label: 'Your brain fills in what the eye missed',
    hook: 'The hole is real. Your brain is covering it up, all day, without telling you.',
    teachingText:
      'Where the nerve leaves, there are no sense cells and no picture at all. Your brain guesses what belongs there, using what is round the edges. That guess is so good you cannot see the join.',
    example:
      'It is the same brain that named the wrong place in Module 12. Filling in a gap and misnaming a pain are the same habit.',
    applyIt: {
      prompt: 'You cannot normally notice your blind spot because:',
      choices: ['It is very small', 'Your brain fills it in', 'You have two eyes only', 'It moves about'],
      answer: 1,
      feedback: [
        'Size is not why it is hidden.',
        null,
        'It is hidden even with one eye shut.',
        'It stays where it is.'
      ]
    }
  }
];

const L2_ACTIVITY = {
  title: 'Find your own blind spot, and measure it',
  prep: 'A plain card or postcard, a pen, and a ruler with centimetres.',
  needs: ['a card', 'a pen', 'a ruler', 'her notebook'],
  steps: [
    'On the card draw a small cross on the left and a solid dot on the right, about 10 cm apart.',
    'Hold the card at arm’s length, shut your left eye, and look straight at the cross.',
    'Move the card slowly towards your face until the dot vanishes, and stop there.',
    'Measure from the card to your face in centimetres and write that number down.',
    'Swap eyes — shut the right, look at the dot — and write the second number down.'
  ],
  safety:
    'Nothing touches an eye and nothing goes near one. The card stays in front of her face, not against it. FINDING A BLIND SPOT IS THE NORMAL RESULT — every eye has one, and it means nothing at all about hers.',
  minutes: 15
};

const L2_LEDGER = {
  prompt: 'Write down your two distances in centimetres, and which eye each one belongs to.',
  ifSheIsStuck:
    'The numbers will not match exactly and that is fine — two eyes, two measurements. Ask her which was further and let her guess why.'
};

// =========================================================== LESSON 3
const L3_CHECK_IN = {
  title: 'Sound is air being pushed',
  text: 'Rest two fingers on the front of your throat and hum.',
  question: 'You can feel it moving. How do you think that gets across a room and into somebody else?'
};

const L3_BEATS = [
  {
    n: 1,
    label: 'A drum, then three tiny bones, then a coil of liquid',
    hook: 'The three smallest bones you own are inside your ear, and all three would fit on a fingernail.',
    teachingText:
      'Sound is air being pushed in waves. The waves push a tight skin called the eardrum, the eardrum shakes three tiny bones, and the bones pass the shaking into a coil filled with liquid. Sense cells in the coil turn it into signals.',
    example:
      'Three handovers between the air outside and the nerve inside. Each one passes on a shake.',
    applyIt: {
      prompt: 'The eardrum is best described as:',
      choices: ['A bone', 'A tight skin that shakes', 'A liquid', 'A muscle'],
      answer: 1,
      feedback: [
        'The bones come after it.',
        null,
        'The liquid is further in.',
        'It is not a muscle.'
      ]
    }
  },
  {
    n: 2,
    label: 'Loud means a bigger push, high means a faster one',
    hook: 'Loud and high are two different things, and people mix them up constantly.',
    teachingText:
      'A bigger push makes a louder sound. A faster wobble makes a higher sound. A tiny bird can be very loud and very high at once, and a big drum can be loud and very low.',
    example:
      'Pluck a rubber band gently and hard — that is loudness. Stretch it tighter and pluck it — that is pitch.',
    applyIt: {
      prompt: 'A sound is higher when the wobble is:',
      choices: ['Bigger', 'Faster', 'Slower', 'Warmer'],
      answer: 1,
      feedback: [
        'Bigger makes it louder.',
        null,
        'Slower makes it lower.',
        'Temperature is not involved.'
      ]
    }
  }
];

const L3_ACTIVITY = {
  title: 'A drum and a rubber band',
  prep: 'A bowl, cling film or a balloon skin, a rubber band, dry rice, and a saucepan lid.',
  needs: ['a bowl', 'cling film', 'a rubber band', 'a few grains of rice', 'her notebook'],
  steps: [
    'Stretch the cling film tightly over the bowl and hold it with the rubber band.',
    'Scatter a few grains of rice on top and bang a saucepan lid nearby.',
    'Write down what the rice does, and what that tells you about the air.',
    'Stretch the rubber band between two fingers and pluck it gently, then hard.',
    'Stretch it tighter and pluck again, and write down which change made it higher.'
  ],
  safety:
    'The lid is banged BESIDE the bowl, never near anybody’s ear. Nothing at all goes into an ear — not a finger, not a cotton bud, not ever.',
  minutes: 15
};

const L3_LEDGER = {
  prompt: 'Write down the three handovers a sound makes between the air and your nerves.',
  ifSheIsStuck:
    'Air to drum, drum to three bones, bones to liquid. Let her count them off on her fingers before she writes.'
};

// =========================================================== LESSON 4
const L4_CHECK_IN = {
  title: 'Shut your eyes and stand on one leg',
  text: 'Try it now, near something to hold on to.',
  question: 'It is much harder with your eyes shut. What was helping you before?'
};

const L4_BEATS = [
  {
    n: 1,
    label: 'Your ears also tell you which way up you are',
    hook: 'Balance is an ear job, and almost nobody knows it.',
    teachingText:
      'Behind the hearing coil sit three loops, also full of liquid, set at three different angles. When your head turns, the liquid lags behind and bends tiny hairs. That is how you know you moved.',
    example:
      'Spin round and stop, and the world keeps turning for a second. The liquid was still moving after you stopped.',
    applyIt: {
      prompt: 'The loops in your ear tell you:',
      choices: ['How loud something is', 'Which way your head moved', 'What colour something is', 'How far away it is'],
      answer: 1,
      feedback: [
        'That is the hearing coil.',
        null,
        'Colour is an eye job.',
        'Distance uses two ears and two eyes.'
      ]
    }
  },
  {
    n: 2,
    label: 'Two ears are how you know where a sound came from',
    hook: 'A sound reaches one of your ears very slightly before the other.',
    teachingText:
      'If something makes a noise on your left, the sound arrives at your left ear a fraction sooner and a little louder. Your brain compares the two and works out a direction.',
    example:
      'Which is why you turn your head towards a sound without deciding to — the comparison happens before you think.',
    applyIt: {
      prompt: 'You work out where a sound came from by:',
      choices: ['Guessing', 'Comparing what each ear received', 'Looking first', 'Using one ear carefully'],
      answer: 1,
      feedback: [
        'It is a measurement, not a guess.',
        null,
        'You turn before you look.',
        'One ear cannot compare.'
      ]
    }
  }
];

const L4_ACTIVITY = {
  title: 'How far can you hear it?',
  prep: 'A ticking clock or a quiet phone alarm, a tape measure, a blindfold, and a helper.',
  needs: ['a ticking clock', 'a tape measure', 'a scarf for a blindfold', 'a helper', 'her notebook'],
  steps: [
    'Put the ticking clock down and walk backwards until you can only just still hear it.',
    'Measure that distance in metres, then write it again in centimetres.',
    'Now sit still, wear the blindfold, and have your helper tick the clock from four places.',
    'Point to where you think each one came from, and record right or wrong for each.',
    'Take the blindfold off and write one sentence about which direction was hardest.'
  ],
  safety:
    'Quiet sounds only, and never close to an ear. If anything is loud enough to be uncomfortable, move away from it — that is the whole rule for looking after ears. Walk backwards only where a grown-up has checked the floor.',
  minutes: 15
};

const L4_LEDGER = {
  prompt: 'Write down your hearing distance in metres and in centimetres, and how many directions you got right.',
  ifSheIsStuck:
    'One metre is a hundred centimetres, and she has converted three times now. Four out of four is not the point — the point is that two ears beat one.'
};

// ---------------------------------------------------------------------------

export const HUMANBODY_M13 = [
  {
    id: 'body-m13-01',
    course: 'humanbody',
    module: 13,
    quarter: 4,
    week: 1,
    day: 1,
    n: 1,
    title: 'What a sense actually does',
    minutes: 30,
    spec: '§10 · beats',
    concept: 'A sense organ turns something out in the world into a nerve signal, and the brain builds the world back up from those signals.',
    standards: [],
    offGrade: null,
    words: ['sense', 'signal', 'organ'],
    glossary: [
      { word: 'sense', plain: 'A way of finding out about the world — seeing, hearing, smelling, tasting or touching.' },
      { word: 'signal', plain: 'A message sent from one place to another.' },
      { word: 'organ', plain: 'A part of the body built to do one particular job.' }
    ],
    video: {
      id: 'fkLiFTuB0Bg',
      url: 'https://www.youtube.com/watch?v=fkLiFTuB0Bg',
      title: 'The Five Senses For Kids Video  (Learning Videos For Kids)',
      channel: 'Learning Videos For Kids',
      minutes: 5,
      verified: '2026-08-18 · youtube.com/oembed · 5:21 read from the playlist duration badge',
      teaches: ['what the five senses are', 'which organ handles each one', 'that senses send messages to the brain'],
      sourceGap:
        'OPEN. Searched: "how the eye works for kids youtube SciShow Kids OR Dr. Binocs OR Operation Ouch vision" and "how the ear works hearing for kids youtube Dr. Binocs OR SciShow Kids eardrum" — returned Peekaboo Kidz, SciShow Kids, Operation Ouch and Nemours, no Black-educator-led channel. Recorded unknown, not closed. The two standing searches for this course are written down in full on body-m1-01, and Module 16 is where this course answers the requirement directly.'
    },
    checkIn: L1_CHECK_IN,
    beats: L1_BEATS,
    activity: L1_ACTIVITY,
    ledger: L1_LEDGER,
    hook: L1_CHECK_IN,
    core: L1_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L1_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'What does a sense organ do?', answer: 'Turns something outside into a nerve signal.', why: 'The brain builds the world from signals.' },
      { ask: 'Why does a dog smell so much better?', answer: 'Its nose has far more sense cells.', why: 'Different doors open, not a better animal.' }
    ],
    check: [
      {
        prompt: 'What does a sense organ actually do?',
        choices: ['Sends a picture to the brain', 'Thinks about what it finds', 'Turns something outside into a nerve signal', 'Stores memories'],
        answer: 2,
        feedback: ['Nothing travels as a picture.', 'The brain thinks.', null, 'Memory is a brain job.']
      },
      {
        prompt: 'A dog smells far better than a person because:',
        choices: ['Its nose has far more sense cells', 'It is cleverer', 'It has a bigger brain', 'It eats differently'],
        answer: 0,
        feedback: [null, 'Cleverness is not it.', 'Brain size is not it.', 'Diet is not it.']
      },
      {
        prompt: 'How many senses does this lesson name?',
        choices: ['Three', 'Five', 'Two', 'Ten'],
        answer: 1,
        feedback: ['More than that.', null, 'Far more.', 'Far fewer.']
      }
    ]
  },
  {
    id: 'body-m13-02',
    course: 'humanbody',
    module: 13,
    quarter: 4,
    week: 1,
    day: 2,
    n: 2,
    title: 'The eye, and the hole in the picture',
    minutes: 30,
    spec: '§10 · beats',
    concept: 'An eye works like a camera and lands its picture upside down, and every eye has a blind spot the brain quietly fills in.',
    standards: [],
    offGrade: 'Distance in centimetres, measured twice and compared. Her Check-In scored 2.00 on measurement, at the test floor.',
    words: ['lens', 'blind spot', 'pupil'],
    glossary: [
      { word: 'lens', plain: 'A clear curved part that bends light to make a sharp picture.' },
      { word: 'blind spot', plain: 'The place at the back of an eye with no sense cells, where the nerve leaves.' },
      { word: 'pupil', plain: 'The black circle in the middle of an eye. It is a hole that lets light in.' }
    ],
    video: {
      id: 'axpCN6Vj9p0',
      url: 'https://www.youtube.com/watch?v=axpCN6Vj9p0',
      title: 'Human Eye - The Dr. Binocs Show | Best Learning Videos For Kids | Peekaboo Kidz',
      channel: 'Peekaboo Kidz',
      minutes: 4,
      verified: '2026-08-18 · youtube.com/oembed · 4:17 read from the playlist duration badge',
      teaches: ['the parts of the eye and what each does', 'how light gets to the back of the eye', 'that the pupil is a hole'],
      sourceGap:
        'OPEN. Same searches as body-m13-01 and body-m1-01, both written down there. REJECTED: cuwosIye2pQ ("What is Peripheral Vision?", Operation Ouch) verified at oEmbed and then DROPPED OUT OF A PLAYLIST — the third Operation Ouch id to do that, and the same pattern the region-locked BBC Teach video showed. A video that verifies and will not play is worse than one that never verified.'
    },
    checkIn: L2_CHECK_IN,
    beats: L2_BEATS,
    activity: L2_ACTIVITY,
    ledger: L2_LEDGER,
    hook: L2_CHECK_IN,
    core: L2_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L2_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'Which way up does the picture land?', answer: 'Upside down.', why: 'The lens flips it on the way in.' },
      { ask: 'Why can you not see your blind spot?', answer: 'Your brain fills it in.', why: 'Using whatever is round the edges.' }
    ],
    check: [
      {
        prompt: 'The picture that lands at the back of your eye is:',
        choices: ['The right way up', 'Flat grey', 'Not a picture at all', 'Upside down'],
        answer: 3,
        feedback: ['The lens flips it.', 'It is in colour.', 'It is a picture.', null]
      },
      {
        prompt: 'You cannot normally notice your blind spot because:',
        choices: ['Your brain fills it in', 'It is very small', 'You have two eyes', 'It moves about'],
        answer: 0,
        feedback: [null, 'Size is not why.', 'Hidden with one eye shut too.', 'It stays put.']
      },
      {
        prompt: 'The pupil of an eye is:',
        choices: ['A black spot', 'A hole that lets light in', 'A lens', 'A muscle'],
        answer: 1,
        feedback: ['It only looks like one.', null, 'The lens is behind it.', 'Not a muscle.']
      }
    ]
  },
  {
    id: 'body-m13-03',
    course: 'humanbody',
    module: 13,
    quarter: 4,
    week: 2,
    day: 1,
    n: 3,
    title: 'The ear, a drum and a chain',
    minutes: 30,
    spec: '§10 · beats',
    concept: 'Sound is pushed air, and an ear passes that push from a drum to three tiny bones to a coil of liquid, where it becomes a nerve signal.',
    standards: [],
    offGrade: null,
    words: ['eardrum', 'vibration', 'pitch'],
    glossary: [
      { word: 'eardrum', plain: 'A tight skin just inside your ear that shakes when sound hits it.' },
      { word: 'vibration', plain: 'A fast shaking back and forth.' },
      { word: 'pitch', plain: 'How high or low a sound is. Not the same as how loud.' }
    ],
    video: {
      id: 'mptjEoHF2aI',
      url: 'https://www.youtube.com/watch?v=mptjEoHF2aI',
      title: 'How Your Ear Works? - The Dr. Binocs Show | Best Learning Videos For Kids | Peekaboo Kidz',
      channel: 'Peekaboo Kidz',
      minutes: 5,
      verified: '2026-08-18 · youtube.com/oembed · 4:33 read from the playlist duration badge',
      teaches: ['the eardrum and the three small bones', 'how sound becomes a nerve signal', 'the parts of the ear in order'],
      sourceGap: 'OPEN. Same searches as body-m13-01 and body-m1-01, both written down there.'
    },
    checkIn: L3_CHECK_IN,
    beats: L3_BEATS,
    activity: L3_ACTIVITY,
    ledger: L3_LEDGER,
    hook: L3_CHECK_IN,
    core: L3_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L3_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'What is the eardrum?', answer: 'A tight skin that shakes.', why: 'Sound pushes it, and it passes the push on.' },
      { ask: 'What makes a sound higher?', answer: 'A faster wobble.', why: 'A bigger push makes it louder instead.' }
    ],
    check: [
      {
        prompt: 'The eardrum is best described as:',
        choices: ['A bone', 'A liquid', 'A tight skin that shakes', 'A muscle'],
        answer: 2,
        feedback: ['The bones come after.', 'The liquid is further in.', null, 'Not a muscle.']
      },
      {
        prompt: 'A sound is higher when the wobble is:',
        choices: ['Faster', 'Bigger', 'Slower', 'Warmer'],
        answer: 0,
        feedback: [null, 'Bigger is louder.', 'Slower is lower.', 'Temperature is not it.']
      },
      {
        prompt: 'How many tiny bones pass the shaking along?',
        choices: ['One', 'Two', 'Three', 'Ten'],
        answer: 2,
        feedback: ['More than one.', 'One more than that.', null, 'Far fewer.']
      }
    ]
  },
  {
    id: 'body-m13-04',
    course: 'humanbody',
    module: 13,
    quarter: 4,
    week: 2,
    day: 2,
    n: 4,
    title: 'What ears do besides hear',
    minutes: 30,
    spec: '§10 · beats',
    concept: 'Three fluid-filled loops in the ear report which way your head moved, and comparing two ears is how you work out where a sound came from.',
    standards: [],
    offGrade: 'A distance in metres converted to centimetres. Units scored 0 of 3, at the test floor.',
    words: ['balance', 'loop', 'direction'],
    glossary: [
      { word: 'balance', plain: 'Staying upright without falling over.' },
      { word: 'loop', plain: 'A circle of tube that comes back to where it started.' },
      { word: 'direction', plain: 'Which way something is, from where you are.' }
    ],
    video: {
      id: '6WNHyAXIN8c',
      url: 'https://www.youtube.com/watch?v=6WNHyAXIN8c',
      title: 'How Ears Let Us Hear the World! | SciShow Kids',
      channel: 'SciShow Kids',
      minutes: 8,
      verified: '2026-08-18 · youtube.com/oembed · 8:22 read from the playlist duration badge',
      teaches: ['how the whole ear works together', 'that ears are involved in balance', 'why two ears are better than one'],
      sourceGap: 'OPEN. Same searches as body-m13-01 and body-m1-01, both written down there.'
    },
    checkIn: L4_CHECK_IN,
    beats: L4_BEATS,
    activity: L4_ACTIVITY,
    ledger: L4_LEDGER,
    hook: L4_CHECK_IN,
    core: L4_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L4_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'What do the three loops report?', answer: 'Which way your head moved.', why: 'The liquid lags behind and bends tiny hairs.' },
      { ask: 'How do you locate a sound?', answer: 'By comparing what each ear received.', why: 'One arrives sooner and slightly louder.' }
    ],
    check: [
      {
        prompt: 'The loops in your ear tell you:',
        choices: ['How loud something is', 'Which way your head moved', 'What colour something is', 'How heavy it is'],
        answer: 1,
        feedback: ['That is the hearing coil.', null, 'Colour is an eye job.', 'Weight is not a sense.']
      },
      {
        prompt: 'You work out where a sound came from by:',
        choices: ['Guessing', 'Looking first', 'Comparing what each ear received', 'Using one ear carefully'],
        answer: 2,
        feedback: ['It is a measurement.', 'You turn before you look.', null, 'One ear cannot compare.']
      },
      {
        prompt: '4 metres written in centimetres is:',
        choices: ['40 cm', '400 cm', '4000 cm', '4 cm'],
        answer: 1,
        feedback: ['Ten times too small.', null, 'Ten times too big.', 'The unit did not change.']
      }
    ]
  }
];

export const HUMANBODY_M13_META = {
  courseId: 'humanbody',
  module: 13,
  title: 'Eyes and Ears',
  blurb:
    'The oldest self-experiment in vision — her own blind spot found with a card and measured in centimetres — rice dancing on a drum skin, and the discovery that her ears are what keep her upright.'
};

export function humanbodyM13LessonById(id) {
  return HUMANBODY_M13.find((l) => l.id === id) || null;
}

export default HUMANBODY_M13;
