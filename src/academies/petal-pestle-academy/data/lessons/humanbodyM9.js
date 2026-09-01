// ---------------------------------------------------------------------------
// THE HUMAN BODY · MODULE 9 — THE MOUTH AND THE STOMACH
//
// Four lessons. Quarter 3, weeks 1 and 2. Tuesday and Thursday, 30 minutes.
// The first module of Quarter 3, and the start of the food journey.
//
// The doctor's action: TIME HOW LONG A CRACKER TAKES TO TURN SWEET. Chewing a
// plain cracker without swallowing makes it taste sweet after a minute or two,
// because saliva has started breaking the starch down into sugar. She times it
// with a clock, which is ELAPSED TIME — the item she scored 0 of 1 on.
//
// ---- READING CAP ----
//
// Quarter 3: 14 words a sentence, with a FLOOR of 6.5. The floor is the part
// that matters, and it is new this quarter. Sentences that are all four words
// long are not simpler, they are choppier — and a ruler that only had a ceiling
// would push the prose that way. §10.1.
//
// ---- SAFETY, AND IT NARROWS THIS MODULE SHARPLY ----
//
// Food is the second-most likely topic to drift, after blood. So: NOTHING about
// calories, nothing about "good" and "bad" foods, nothing about how much anyone
// should eat, and nothing about weight or appearance anywhere. Digestion is
// taught as a machine that takes food apart, which is what it is. The tasting
// activity uses ONE plain cracker and a grown-up says yes first.
// ---------------------------------------------------------------------------

// =========================================================== LESSON 1
const L1_CHECK_IN = {
  title: 'Run your tongue along them',
  text: 'Close your mouth and run your tongue slowly along your teeth, front to back.',
  question: 'They are not all the same shape. Why do you think that might be?'
};

const L1_BEATS = [
  {
    n: 1,
    label: 'Teeth are tools, and they come in different shapes',
    hook: 'You are carrying four different kinds of tool around in your mouth.',
    teachingText:
      'The flat ones at the front are for cutting, like scissors. The pointed ones beside them are for tearing. The wide bumpy ones at the back are for grinding food into paste.',
    example:
      'Bite an apple with your front teeth and you cut a piece off. Then your back teeth take over and grind it.',
    applyIt: {
      prompt: 'The wide, bumpy teeth at the back are for:',
      choices: ['Cutting', 'Tearing', 'Grinding', 'Smiling'],
      answer: 2,
      feedback: [
        'That is the flat ones at the front.',
        'That is the pointed ones.',
        null,
        'They all do that, and it is not their job.'
      ]
    }
  },
  {
    n: 2,
    label: 'Which shape you have depends on what you eat',
    hook: 'You can guess what an animal eats by looking at its teeth.',
    teachingText:
      'An animal that eats only grass has flat grinding teeth and almost no pointed ones. A hunting animal has long pointed teeth for tearing. People have some of each, because people eat both.',
    example:
      'A horse has wide flat teeth for grinding grass. A cat has sharp points for tearing meat.',
    applyIt: {
      prompt: 'An animal with mostly flat, grinding teeth probably eats:',
      choices: ['Meat', 'Plants', 'Nothing', 'Only water'],
      answer: 1,
      feedback: [
        'That needs tearing teeth.',
        null,
        'Every animal eats something.',
        'Water needs no teeth.'
      ]
    }
  }
];

const L1_ACTIVITY = {
  title: 'A map of your own mouth',
  prep: 'A mirror, paper and a pencil.',
  needs: ['a mirror', 'paper', 'a pencil', 'her notebook'],
  steps: [
    'Draw a big curve for your top teeth and another for the bottom.',
    'Look in the mirror and count how many teeth you have altogether.',
    'Mark the flat cutting ones at the front of your drawing.',
    'Mark the pointed ones, then the wide grinding ones at the back.',
    'Write one sentence saying which kind you have most of, and why that might be.'
  ],
  safety:
    'Looking and counting only. Nothing about how anybody’s teeth look, and no comparing with anybody else — this is a map, not a judgement.',
  minutes: 12
};

const L1_LEDGER = {
  prompt: 'Write down the three shapes of tooth and the job each one does.',
  ifSheIsStuck:
    'Ask her to name a kitchen tool for each shape. Scissors, a fork and a rolling pin will do it, and the words she picks are better than the proper names.'
};

// =========================================================== LESSON 2
const L2_CHECK_IN = {
  title: 'Under the white part',
  text: 'A tooth looks solid all the way through, like a small white stone.',
  question: 'Do you think a tooth is solid inside, or is there something in there?'
};

const L2_BEATS = [
  {
    n: 1,
    label: 'A tooth has layers, and only the outside is hard',
    hook: 'The hardest thing in your whole body is the outside of a tooth.',
    teachingText:
      'The white outer layer is the hardest material your body makes. Under it is a softer layer, and in the very middle is a soft space with nerves and blood in it.',
    example:
      'That middle part is why a tooth can hurt at all. Nerves live there, exactly as they do everywhere else.',
    applyIt: {
      prompt: 'The very middle of a tooth holds:',
      choices: ['Nothing at all', 'Nerves and blood', 'More hard white stuff', 'Air'],
      answer: 1,
      feedback: [
        'It is not hollow.',
        null,
        'The hard part is only the outside.',
        'There is no air inside a tooth.'
      ]
    }
  },
  {
    n: 2,
    label: 'And the part you cannot see is bigger than the part you can',
    hook: 'Most of a tooth is hidden. The bit you see is roughly a third of it.',
    teachingText:
      'A tooth has a root that goes down into your jaw, and the root is longer than the visible part. That is what holds it firmly enough to grind with.',
    example:
      'It is planted like a fence post. The part above ground is the smaller half of the job.',
    applyIt: {
      prompt: 'The root of a tooth is:',
      choices: [
        'Shorter than the visible part',
        'Longer than the visible part',
        'Exactly the same length',
        'Not attached to anything'
      ],
      answer: 1,
      feedback: [
        'It is the other way round.',
        null,
        'The hidden part is bigger.',
        'It sits firmly in your jaw.'
      ]
    }
  }
];

const L2_ACTIVITY = {
  title: 'The fence-post model',
  prep: 'Modelling clay and a small stick or a lolly stick.',
  needs: ['clay', 'a stick', 'a ruler', 'her notebook'],
  steps: [
    'Press the clay into a block. That block is your jaw.',
    'Push the stick in so that only a third of it shows above the clay.',
    'Measure the part above and the part below with your ruler.',
    'Write both numbers down, and work out the difference between them.',
    'Try pushing it in only a little, then wobble it. Write down what changed.'
  ],
  safety: 'Clay and a stick. Nothing goes near anybody’s mouth.',
  minutes: 14
};

const L2_LEDGER = {
  prompt: 'Write why a tooth needs a long root, using what happened when you wobbled it.',
  ifSheIsStuck:
    'Ask her what happened to the stick when it was barely pushed in. A tooth that wobbles cannot grind anything, and she has just seen why.'
};

// =========================================================== LESSON 3
const L3_CHECK_IN = {
  title: 'Wet on purpose, again',
  text: 'Your mouth is always slightly wet, even when you are not eating or drinking.',
  question: 'Your body is making that liquid all day. What do you think it is for?'
};

const L3_BEATS = [
  {
    n: 1,
    label: 'Saliva starts the work before you swallow',
    hook: 'Digestion does not begin in your stomach. It begins in your mouth.',
    teachingText:
      'Saliva makes food wet so it slides down easily. It also carries something that starts breaking food apart while it is still in your mouth.',
    example:
      'Dry crackers are hard to swallow. Chew them a while and saliva turns them into something soft enough to go down.',
    applyIt: {
      prompt: 'Digestion actually begins in your:',
      choices: ['Stomach', 'Mouth', 'Gut', 'Throat'],
      answer: 1,
      feedback: [
        'That is the second stop.',
        null,
        'That is much further along.',
        'Food only passes through there.'
      ]
    }
  },
  {
    n: 2,
    label: 'Which is why a cracker turns sweet if you wait',
    hook: 'Chew a plain cracker long enough and it starts to taste sweet.',
    teachingText:
      'A cracker is made of starch, which is not sweet. Saliva breaks that starch into sugar, a bit at a time. After a minute or two your tongue can taste the change.',
    example:
      'Nothing was added and nothing was taken away. Your own saliva changed one thing into another.',
    applyIt: {
      prompt: 'A chewed cracker turns sweet because saliva:',
      choices: [
        'Adds sugar to it',
        'Breaks starch into sugar',
        'Makes it warmer',
        'Washes the salt off'
      ],
      answer: 1,
      feedback: [
        'Nothing is added.',
        null,
        'Warmth does not change the taste.',
        'The sweetness is new, not uncovered.'
      ]
    }
  }
];

const L3_ACTIVITY = {
  title: 'Time the cracker',
  prep: 'One plain cracker each, and a clock or timer showing seconds. Ask a grown-up first.',
  needs: ['one plain cracker', 'a clock with seconds', 'her notebook', 'a grown-up'],
  steps: [
    'Write down the exact time before you start. Hours, minutes and seconds.',
    'Chew a small piece of plain cracker WITHOUT swallowing it.',
    'Keep chewing gently and notice the taste changing.',
    'Write down the time at the moment it first tastes sweet.',
    'Work out the elapsed time between your two clock readings.'
  ],
  safety:
    'ASK A GROWN-UP FIRST, and only ever a plain cracker you already eat safely. Never do this with anything you have not eaten before. Spit it out whenever you like — the taste is the finding, not finishing it.',
  minutes: 14
};

const L3_LEDGER = {
  prompt: 'Write your two clock times and the elapsed time between them.',
  ifSheIsStuck:
    'Ask her to count on from the first time to the second, in minutes and then seconds. Counting on is how elapsed time is worked out, and she does not need a formula.'
};

// =========================================================== LESSON 4
const L4_CHECK_IN = {
  title: 'Where it goes next',
  text: 'You swallow. The food is gone from your mouth in about a second.',
  question: 'It has arrived somewhere. What do you think happens to it there?'
};

const L4_BEATS = [
  {
    n: 1,
    label: 'The stomach is a bag that squeezes',
    hook: 'Your stomach is a muscular bag, and it churns food like a washing machine.',
    teachingText:
      'Food arrives in a stretchy bag with muscular walls. Those walls squeeze and churn, mixing the food with strong juices until it becomes a thick soup.',
    example:
      'Nothing is standing still in there. Squeezing and mixing is the whole job of a stomach.',
    applyIt: {
      prompt: 'The walls of your stomach:',
      choices: ['Stay still', 'Squeeze and churn', 'Are made of bone', 'Are full of air'],
      answer: 1,
      feedback: [
        'They are muscle, and muscle works.',
        null,
        'No bones in a stomach.',
        'Food, not air.'
      ]
    }
  },
  {
    n: 2,
    label: 'And it protects itself from its own juices',
    hook: 'Stomach juices are strong enough to be a problem for the stomach itself.',
    teachingText:
      'The juices in your stomach are powerful, which is exactly how food gets broken down. Your stomach lines itself with a thick layer of slime so the juices work on the food and not on the bag.',
    example:
      'That lining is replaced constantly. It is being worn away and rebuilt all the time.',
    applyIt: {
      prompt: 'What stops stomach juices harming the stomach?',
      choices: [
        'A thick slimy lining',
        'The juices are weak',
        'Bones around it',
        'It empties too fast'
      ],
      answer: 0,
      feedback: [
        null,
        'They are strong, which is the point.',
        'There are no bones there.',
        'It holds food for hours.'
      ]
    }
  }
];

const L4_ACTIVITY = {
  title: 'The squeezing bag',
  prep: 'A strong sealable plastic bag, a cracker, and a little water.',
  needs: ['a sealable plastic bag', 'a cracker', 'water', 'a timer', 'her notebook'],
  steps: [
    'Put the cracker in the bag and add a small splash of water.',
    'Seal it properly, then squeeze and squash it with your hands.',
    'Time yourself doing that for two whole minutes.',
    'Write down what the cracker looked like before, and what it looks like now.',
    'Write one sentence about which part of the model was your stomach muscles.'
  ],
  safety:
    'Seal the bag properly and keep it away from anybody smaller. Nothing in this model is eaten afterwards — it goes in the bin.',
  minutes: 14
};

const L4_LEDGER = {
  prompt: 'Write down the two jobs your stomach does to food.',
  ifSheIsStuck:
    'She squeezed, and there were juices. Churning and mixing with juice are the two, and her own hands did the first one.'
};

// ---------------------------------------------------------------------------

export const HUMANBODY_M9 = [
  {
    id: 'body-m9-01',
    course: 'humanbody',
    module: 9,
    quarter: 3,
    week: 1,
    day: 1,
    n: 1,
    title: 'Teeth are tools',
    minutes: 30,
    spec: '§10 · beats',
    concept: 'Teeth come in different shapes because they do different jobs, and the shapes match what an animal eats.',
    standards: [],
    offGrade: null,
    words: ['cutting', 'tearing', 'grinding'],
    glossary: [
      { word: 'cutting', plain: 'Slicing something into pieces, like scissors do.' },
      { word: 'tearing', plain: 'Pulling something apart.' },
      { word: 'grinding', plain: 'Crushing something into small bits or paste.' }
    ],
    video: {
      id: 'b5CPd1_r03s',
      url: 'https://www.youtube.com/watch?v=b5CPd1_r03s',
      title: 'Teeth: Not Just for Smiles!',
      channel: 'SciShow Kids',
      minutes: 4,
      verified: '2026-08-18 · youtube.com/oembed · length read from the duration badge',
      teaches: ['what teeth are for', 'the different kinds of teeth', 'how animal teeth match their food'],
      sourceGap:
        'OPEN. Searched: "digestive system for kids video SciShow Kids Operation Ouch stomach teeth saliva journey of food" and "teeth for kids video why we chew AND senses eyes ears for kids Smile and Learn Free School youtube" — returned KidsHealth, Nemours, SciShow Kids, Dr. Binocs, Curious George and Sid the Science Kid, no Black-educator-led channel. The two standing searches for this course are written down in full on body-m1-01.'
    },
    checkIn: L1_CHECK_IN,
    beats: L1_BEATS,
    activity: L1_ACTIVITY,
    ledger: L1_LEDGER,
    hook: L1_CHECK_IN,
    core: L1_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L1_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'What are the back teeth for?', answer: 'Grinding food into paste.', why: 'Wide and bumpy, like a millstone.' },
      { ask: 'Why do people have several shapes?', answer: 'Because people eat many kinds of food.', why: 'Shape follows diet.' }
    ],
    check: [
      {
        prompt: 'The wide bumpy teeth at the back are for:',
        choices: ['Cutting', 'Tearing', 'Grinding', 'Smiling'],
        answer: 2,
        feedback: ['The flat front ones.', 'The pointed ones.', null, 'Not their job.']
      },
      {
        prompt: 'An animal with mostly flat grinding teeth probably eats:',
        choices: ['Meat', 'Plants', 'Nothing', 'Only water'],
        answer: 1,
        feedback: ['That needs tearing teeth.', null, 'Every animal eats.', 'Water needs no teeth.']
      },
      {
        prompt: 'The flat teeth at the front work most like:',
        choices: ['Scissors', 'A hammer', 'A spoon', 'A cup'],
        answer: 0,
        feedback: [null, 'Nothing is hammered.', 'Spoons scoop.', 'Cups hold.']
      }
    ]
  },
  {
    id: 'body-m9-02',
    course: 'humanbody',
    module: 9,
    quarter: 3,
    week: 1,
    day: 2,
    n: 2,
    title: 'Inside a tooth',
    minutes: 30,
    spec: '§10 · beats',
    concept: 'A tooth has hard outer layers over a soft living middle, and its hidden root is longer than the part you see.',
    standards: [],
    offGrade: null,
    words: ['layer', 'root', 'jaw'],
    glossary: [
      { word: 'layer', plain: 'One thickness of something, with more above or below it.' },
      { word: 'root', plain: 'The part that goes down and holds something in place.' },
      { word: 'jaw', plain: 'The bone your teeth are set into.' }
    ],
    video: {
      id: 'tvCeSX9Pthw',
      url: 'https://www.youtube.com/watch?v=tvCeSX9Pthw',
      title: 'How Your Teeth Work? - The Dr. Binocs Show | Best Learning Videos For Kids | Peekaboo Kidz',
      channel: 'Peekaboo Kidz',
      minutes: 6,
      verified: '2026-08-18 · youtube.com/oembed · length read from the duration badge',
      teaches: ['the layers inside a tooth', 'the root and the crown', 'how teeth are held in the jaw'],
      sourceGap: 'OPEN. Same searches as body-m9-01 and body-m1-01, both written down there.'
    },
    checkIn: L2_CHECK_IN,
    beats: L2_BEATS,
    activity: L2_ACTIVITY,
    ledger: L2_LEDGER,
    hook: L2_CHECK_IN,
    core: L2_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L2_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'What is in the middle of a tooth?', answer: 'Nerves and blood.', why: 'Which is why a tooth can hurt.' },
      { ask: 'Which is longer, root or crown?', answer: 'The root.', why: 'Planted like a fence post.' }
    ],
    check: [
      {
        prompt: 'The very middle of a tooth holds:',
        choices: ['Nothing', 'Nerves and blood', 'More hard white stuff', 'Air'],
        answer: 1,
        feedback: ['Not hollow.', null, 'Only the outside is hard.', 'No air inside.']
      },
      {
        prompt: 'The root of a tooth is:',
        choices: ['Shorter than the visible part', 'Longer than the visible part', 'The same length', 'Not attached'],
        answer: 1,
        feedback: ['The other way round.', null, 'The hidden part is bigger.', 'It sits firmly in the jaw.']
      },
      {
        prompt: 'The hardest material your body makes is:',
        choices: ['Bone', 'The outside of a tooth', 'Fingernail', 'Hair'],
        answer: 1,
        feedback: ['Hard, and not the hardest.', null, 'Much softer.', 'Softer still.']
      }
    ]
  },
  {
    id: 'body-m9-03',
    course: 'humanbody',
    module: 9,
    quarter: 3,
    week: 2,
    day: 1,
    n: 3,
    title: 'Saliva, and the cracker that turns sweet',
    minutes: 30,
    spec: '§10 · beats',
    concept: 'Digestion begins in the mouth, where saliva breaks starch into sugar — which you can taste and time.',
    standards: [],
    offGrade: null,
    words: ['saliva', 'starch', 'elapsed'],
    glossary: [
      { word: 'saliva', plain: 'The watery liquid your mouth makes all day.' },
      { word: 'starch', plain: 'What bread, crackers and potatoes are mostly made of.' },
      { word: 'elapsed', plain: 'How much time has gone by between two moments.' }
    ],
    video: {
      id: 'DstSL3I--9I',
      url: 'https://www.youtube.com/watch?v=DstSL3I--9I',
      title: 'How Your Teeth Work',
      channel: 'Nemours KidsHealth',
      minutes: 4,
      verified: '2026-08-18 · youtube.com/oembed · length read from the duration badge',
      teaches: ['chewing and how the mouth prepares food', 'the role of saliva', 'the first step of digestion'],
      sourceGap:
        'OPEN. Same searches as body-m9-01 and body-m1-01. Nemours KidsHealth is a children’s hospital system, which puts it in the same class as GPB and BBC Bitesize — a public-service publisher rather than a channel. ⚠️ NOT WebMD: that was excluded at Module 2 as a consumer medical-information site, and the distinction is that Nemours writes FOR CHILDREN rather than for adults looking up symptoms.'
    },
    checkIn: L3_CHECK_IN,
    beats: L3_BEATS,
    activity: L3_ACTIVITY,
    ledger: L3_LEDGER,
    hook: L3_CHECK_IN,
    core: L3_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L3_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'Where does digestion begin?', answer: 'In your mouth.', why: 'Saliva starts before you swallow.' },
      { ask: 'Why does a cracker turn sweet?', answer: 'Saliva breaks starch into sugar.', why: 'Nothing is added.' }
    ],
    check: [
      {
        prompt: 'Digestion actually begins in your:',
        choices: ['Stomach', 'Mouth', 'Gut', 'Throat'],
        answer: 1,
        feedback: ['The second stop.', null, 'Much further along.', 'Food only passes through.']
      },
      {
        prompt: 'A chewed cracker turns sweet because saliva:',
        choices: ['Adds sugar', 'Breaks starch into sugar', 'Makes it warmer', 'Washes salt off'],
        answer: 1,
        feedback: ['Nothing is added.', null, 'Warmth is not the change.', 'The sweetness is new.']
      },
      {
        prompt: 'You start at 2:47:10 and it turns sweet at 2:48:40. The elapsed time is:',
        choices: ['1 minute 30 seconds', '90 minutes', '1 minute 50 seconds', '30 seconds'],
        answer: 0,
        feedback: [null, 'Those are seconds, not minutes.', 'Count on again from :10 to :40.', 'You crossed a whole minute.']
      }
    ]
  },
  {
    id: 'body-m9-04',
    course: 'humanbody',
    module: 9,
    quarter: 3,
    week: 2,
    day: 2,
    n: 4,
    title: 'The stomach, a bag that squeezes',
    minutes: 30,
    spec: '§10 · beats',
    concept: 'The stomach is a muscular bag that churns food with strong juices, and lines itself with slime for protection.',
    standards: [],
    offGrade: null,
    words: ['stomach', 'churn', 'lining'],
    glossary: [
      { word: 'stomach', plain: 'The stretchy bag food arrives in after you swallow.' },
      { word: 'churn', plain: 'To mix something by moving it around hard.' },
      { word: 'lining', plain: 'A layer covering the inside of something.' }
    ],
    video: {
      id: 'gqCBtbRkOlU',
      url: 'https://www.youtube.com/watch?v=gqCBtbRkOlU',
      title: 'Operation Ouch - The Stomach | Biology for Kids',
      channel: 'Operation Ouch',
      minutes: 3,
      verified: '2026-08-18 · youtube.com/oembed · length read from the duration badge',
      teaches: ['what the stomach does to food', 'stomach acid and the lining', 'how long food stays there'],
      sourceGap:
        'OPEN. Same searches as body-m9-01 and body-m1-01. ⚠️ AND THREE IDS REJECTED HERE, ALL THE SAME WAY: `54p5rHi7PmI` (Camera in Digestive System), `iWIwzXRPfJk` (How Do Our Bodies Make Poo?) and `CXJ96rbHq1w` (Where Does Bacteria Live in Your Body?) all appeared in searches as Operation Ouch full episodes, and ALL THREE RETURNED AN EMPTY BODY FROM oEMBED — the same signature as a deliberately fake id. A search result naming a video is not evidence the video exists. This is exactly the check that noembed.com failed at v3.9.'
    },
    checkIn: L4_CHECK_IN,
    beats: L4_BEATS,
    activity: L4_ACTIVITY,
    ledger: L4_LEDGER,
    hook: L4_CHECK_IN,
    core: L4_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing: L4_ACTIVITY.steps.join(' '),
    practice: [
      { ask: 'What does a stomach do to food?', answer: 'Squeezes and churns it with juices.', why: 'Into a thick soup.' },
      { ask: 'Why is the stomach not harmed?', answer: 'A thick slimy lining.', why: 'Replaced constantly.' }
    ],
    check: [
      {
        prompt: 'The walls of your stomach:',
        choices: ['Stay still', 'Squeeze and churn', 'Are made of bone', 'Are full of air'],
        answer: 1,
        feedback: ['They are muscle.', null, 'No bones there.', 'Food, not air.']
      },
      {
        prompt: 'What stops stomach juices harming the stomach?',
        choices: ['A thick slimy lining', 'The juices are weak', 'Bones around it', 'It empties fast'],
        answer: 0,
        feedback: [null, 'They are strong.', 'No bones there.', 'It holds food for hours.']
      },
      {
        prompt: 'The plastic bag in the activity stood for your:',
        choices: ['Mouth', 'Stomach', 'Gut', 'Teeth'],
        answer: 1,
        feedback: ['That came first.', null, 'That comes after.', 'Your hands did that job.']
      }
    ]
  }
];

export const HUMANBODY_M9_META = {
  courseId: 'humanbody',
  module: 9,
  title: 'The Mouth and the Stomach',
  blurb:
    'Where food begins its journey — four shapes of tooth doing four jobs, what is hidden inside one, the cracker that turns sweet while she times it, and the bag that churns.'
};

export function humanbodyM9LessonById(id) {
  return HUMANBODY_M9.find((l) => l.id === id) || null;
}

export default HUMANBODY_M9;
