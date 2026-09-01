// ---------------------------------------------------------------------------
// HERBALISM & BOTANY — MODULE 1, QUARTER 1, WEEK 1
//
// LESSON 1 · INSIDE A SEED
//
// THE REFERENCE IMPLEMENTATION OF THE BEATS STANDARD. The other 274 lessons
// get built against this shape, so it is worth reading the reasoning once.
//
// ---- WHY THE LESSON WAS REBUILT AGAIN (v3.6) ----
//
// Gigi read Lamar's plan beside this one and said the lessons were brief. She
// was right, and his plan says exactly why in one line:
//
//     "small teach -> immediate practice -> next small teach -> practice ->
//      final no-hint test. NOT one long briefing followed by a wall of
//      questions."
//
// This lesson was the wall. Seven cards, then three questions at the end. For
// a child who reads below her age, seven cards is a wall no matter how short
// the sentences are.
//
// ---- THE BEATS ----
//
// Two beats. Each one is: a label, a "Did you know?" hook, a short piece of
// teaching, a worked example, and then IMMEDIATELY an Apply-It question about
// that beat and nothing else. She answers something within about three minutes
// of starting, and again three minutes later.
//
// ---- WHERE THE TEN QUESTIONS WENT, AND WHY NOT AT THE END ----
//
// His standard is ten test questions per lesson. Copying that literally would
// break her lesson, because his lesson IS the whole session and hers is 45
// minutes with a 20-minute activity away from the screen in the middle of it.
// Ten questions do not fit, and a tired child answering question nine measures
// tiredness.
//
// So the ten questions exist — they live in the BANK. Three lessons at ten
// questions is a thirty-question pool, and the Friday weekly test draws eight
// from it. She gets his depth of assessment across a week instead of his depth
// in a single sitting.
//
// What she answers inside the lesson: 2 Apply-It questions in the beats, then
// a 3-question check. Five, up from three, and two of them arrive while the
// teaching is still happening rather than after it is all over.
//
// ---- WHERE THIS LESSON SITS ----
//
//   Course   herbalism      Quarter 1      Week 1      Day 1
//
// Week 1 is Inside a Seed, The Circle, and Seeds That Travel. Day 4 is the
// Review Game and the weekly test over all three.
//
// ---- STANDARDS, STATED HONESTLY ----
//
// This lesson has NO Georgia fourth-grade code, and that is not an oversight.
// Seeds and life cycles are S2L1 — SECOND grade. It is taught anyway because a
// botany course with no seeds in it is not a botany course, and it is recorded
// as off-grade in curriculumPlan.js TAUGHT_OFF_GRADE rather than dressed up as
// something it is not. Herbalism's ten real fourth-grade elements — S4L1, S4E3,
// S4E4 — arrive in Weeks 3 onward.
//
// ---- READING LEVEL AND SAFETY, unchanged ----
//
// ~2.5. The five subject words are exempt from the long-word count for the same
// reason "photosynthesis" is. No dosing. The soaked beans are not a snack, and
// the lesson says so out loud.
// ---------------------------------------------------------------------------

/** STEP 1 · THE CHECK-IN · 5 minutes. Aliased below as `hook`. */
const M1L1_CHECK_IN = {
  title: 'The snack bowl mystery',
  text: 'Pour out popcorn kernels, dried beans, rice and sunflower seeds. Every one of these is a seed. Every one could be a plant.',
  question: 'So why are they sitting in a bowl instead of growing?'
};

/**
 * STEP 2 · THE SYSTEM CONCEPT · 12 minutes, as TWO BEATS.
 *
 * Beat 1 opens the seed. Beat 2 wakes it up. The video sits between them,
 * because it covers both and it lands better once she already has the three
 * parts in her head.
 *
 * Each beat's Apply-It is a SCENARIO, not a definition question. "What is the
 * endosperm" tests whether she read the card. "Your bean grew in a bag with no
 * dirt, so what fed it" tests whether she can use the idea, which is the only
 * thing worth testing three minutes after teaching it.
 */
const M1L1_BEATS = [
  {
    n: 1,
    label: 'What a seed is made of',
    hook: 'Every seed on earth is built from the same three parts — an acorn, a grain of rice, and the corn in your bucket.',
    teachingText:
      'A seed has a hard skin called the seed coat. Inside is a tiny baby plant, the embryo. Packed in beside it is its food, the endosperm.',
    example:
      'Split a soaked bean and you can see all three with your eyes. The skin peels off. The little white curl is the baby. The two fat halves are its lunch.',
    applyIt: {
      prompt: 'Your bean grew in a bag with a wet paper towel and no dirt at all. What fed it?',
      choices: ['The paper towel', 'Its own endosperm', 'The water', 'Nothing — it was not really growing'],
      answer: 1,
      feedback: [
        'Paper is not food.',
        null,
        'Water woke it up. Water is not food.',
        'It grew a root and a shoot. It ate something.'
      ],
      why: 'The lunch is packed inside the seed. It lasts until leaves can make food from sunlight.'
    }
  },
  {
    n: 2,
    label: 'How a seed wakes up',
    hook: 'Some seeds have woken up after sleeping for more than a thousand years.',
    teachingText:
      'A seed in a bowl is dormant. That means alive but asleep. Give it water, warmth and the right light and the coat cracks open. Waking up is called germination.',
    example:
      'The root always comes out first, and it always grows down — even if the seed was lying upside down. The shoot goes up second.',
    applyIt: {
      prompt: 'You plant a bean upside down by mistake. What does the root do?',
      choices: ['Grows up, the wrong way', 'Grows down anyway', 'Stops growing', 'Turns into a shoot'],
      answer: 1,
      feedback: [
        'A seed can tell which way is down.',
        null,
        'It keeps going. It just turns.',
        'The root and the shoot are different parts.'
      ],
      why: 'A seed senses gravity. However you plant it, the root heads down and the shoot heads up.'
    }
  }
];

/** STEP 3 · THE ACTIVITY · 20 minutes. Away from the screen. */
const M1L1_ACTIVITY = {
  title: 'Open a seed, then wake four up',
  prep: 'Soak six dried beans in water overnight. A dry bean will not open. Lima or pinto are easiest.',
  needs: [
    '6 dried beans, soaked',
    'a bowl of dry seeds you can eat',
    '4 zip bags',
    '4 paper towels',
    'water',
    'tape'
  ],
  steps: [
    'Split a soaked bean along its seam with your thumbnail.',
    'Peel the seed coat off first. Find all three parts.',
    'Find the tiny curl. That is the embryo. The baby plant.',
    'The two big fat halves are the endosperm. Its lunch.',
    'Bag 1: a bean in a WET paper towel. Tape it to a sunny window.',
    'Bag 2: a DRY paper towel. Sunny window. No water.',
    'Bag 3: a wet paper towel. A dark closet. No light.',
    'Bag 4: a wet paper towel. The fridge. No warmth.',
    'Guess which bags will germinate. Write it down before you know.',
    'Check once a day for two weeks. Watch which part comes out first.'
  ],
  safety:
    'The bowl of dry seeds is a snack. The soaked beans are NOT. Never taste a plant without a grown-up.',
  grownUpAsks: [
    'Before you open it. What do you think is inside a seed?',
    'Peel the coat off. What is that skin for?',
    'Find the tiny curl. What do you think it turns into?',
    'Was this seed alive before the water, or did the water make it alive?',
    'What are the two fat halves for? What is the word for them?',
    'Why do the seeds in the snack bowl not grow? What is that word?',
    'These soaked beans look like a snack. Are they?',
    'Which bags will germinate? Say it out loud. I am writing it down.',
    'Bag 3 gets no light at all. Will it still germinate? Why?',
    'There is no dirt in any bag. So where is it getting food?',
    'Which part do you think comes out first, the root or the leaves?'
  ]
};

/** STEP 4 · THE LEDGER ENTRY · 8 minutes. She writes it. Nothing is corrected. */
const M1L1_LEDGER = {
  sheet: 'M1L1-inside-a-seed-PRINTABLE.pdf',
  tasks: [
    'Label your split bean: seed coat, embryo, endosperm.',
    'Circle Y or N for each bag. Your guess, before Day 1.',
    'Which part came out first? Write the day it happened.',
    'Write one question about seeds for Gigi. You must know the answer.'
  ],
  game: {
    title: 'Word Boss',
    cards: ['SEED COAT', 'EMBRYO', 'ENDOSPERM', 'DORMANT', 'GERMINATION'],
    rounds: [
      'Say what each word means in your own words. No fancy talk.',
      'A grown-up says the meaning. You say the word. Beat the clock.',
      'Stump Gigi. Write her one question you already know the answer to.'
    ],
    ifSheIsStuck:
      'Point at the split bean on the table instead of saying the answer. The word is easier when the thing is in front of her.'
  },
  note: 'Nothing here is graded. Nothing is corrected. Petals are for doing it.'
};

export const HERBALISM_M1 = [
  {
    id: 'hb-m1-01',
    course: 'herbalism',
    module: 1,
    quarter: 1,
    week: 1,
    day: 1,
    n: 1,
    title: 'Inside a seed',
    minutes: 45,
    spec: '§10 · beats',

    concept: 'A seed is a baby plant with a coat and a packed lunch, asleep until it is woken up.',

    /**
     * No Georgia fourth-grade element. Seeds and life cycles are S2L1, SECOND
     * grade. Declared empty on purpose and recorded in TAUGHT_OFF_GRADE — an
     * empty array is a statement, a missing field is an oversight.
     */
    standards: [],
    offGrade: 'S2L1',

    words: ['seed coat', 'embryo', 'endosperm', 'dormant', 'germination'],

    glossary: [
      { word: 'seed coat', plain: 'The hard skin outside. It keeps the baby plant safe and dry.' },
      { word: 'embryo', plain: 'The tiny baby plant inside. It is already alive.' },
      { word: 'endosperm', plain: 'The food packed in beside it. Its lunch.' },
      { word: 'dormant', plain: 'Alive but asleep. Some seeds wait for years.' },
      { word: 'germination', plain: 'When a seed wakes up and starts to grow.' },
      { word: 'root', plain: 'The first part out. It always grows down.' },
      { word: 'shoot', plain: 'The stem and first leaves. They push up.' },
      { word: 'sprouted', plain: 'When the shoot breaks out into the air.' }
    ],

    video: {
      id: 'tkFPyue5X3Q',
      url: 'https://www.youtube.com/watch?v=tkFPyue5X3Q',
      title: 'How Does A Seed Become A Plant? | Backyard Science | SciShow Kids',
      channel: 'SciShow Kids',
      minutes: 4,
      verified: '2026-08-14',
      teaches: ['seed coat', 'embryo', 'endosperm', 'dormant', 'germination', 'root', 'shoot'],
      sourceGap: 'No Black American educator found at this level. Searched. Open.'
    },

    // ---- the four §10 steps ----
    checkIn: M1L1_CHECK_IN,
    beats: M1L1_BEATS,
    activity: M1L1_ACTIVITY,
    ledger: M1L1_LEDGER,

    // ---- old field names, pointing at the same content. See herbalismM1 header. ----
    hook: M1L1_CHECK_IN,
    core: M1L1_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing:
      'Split a soaked bean and find all three parts: the seed coat, the embryo and the endosperm. Then set up four bags — wet on the window, dry on the window, wet in a dark closet, wet in the fridge. Guess which will germinate before you look. Check once a day, and watch which part comes out first.',

    practice: [
      {
        ask: 'What are the three parts of every seed?',
        answer: 'The seed coat, the embryo and the endosperm.',
        why: 'A coat to keep it safe, a baby plant, and a lunch to get it started.'
      },
      {
        ask: 'A seed sits in a jar for two years. Is it alive?',
        answer: 'Yes. It is dormant.',
        why: 'Dormant means asleep, not dead. Some seeds wait far longer than two years.'
      }
    ],

    check: [
      {
        prompt: 'Which part of a seed is the baby plant?',
        choices: ['The embryo', 'The seed coat', 'The endosperm', 'The root'],
        answer: 0,
        feedback: [
          null,
          'The seed coat is the hard skin outside.',
          'The endosperm is the food packed beside it.',
          'The root grows later, once it wakes up.'
        ]
      },
      {
        prompt: 'Popcorn kernels sit in a bowl and never grow. Why not?',
        choices: ['They are dead', 'They are dormant', 'They are not really seeds', 'They have no embryo'],
        answer: 1,
        feedback: [
          'They are alive. Plant one and see.',
          null,
          'Popcorn is a seed. So are beans and rice.',
          'Every seed has one. It is asleep, not missing.'
        ]
      },
      {
        prompt: 'When a seed germinates, which part comes out first?',
        choices: ['The leaves', 'The flower', 'The root', 'The shoot'],
        answer: 2,
        feedback: [
          'Leaves come later, on the shoot.',
          'A flower is a long way off.',
          null,
          'The shoot goes up second. The root goes down first.'
        ]
      }
    ]
  }
];

export const HERBALISM_M1_META = {
  courseId: 'herbalism',
  module: 1,
  title: 'The Plant Life Cycle',
  blurb:
    'It starts inside a seed. What a seed is made of, why one sits in a bowl and does nothing, and what wakes it up.'
};

export function m1LessonById(id) {
  return HERBALISM_M1.find((l) => l.id === id) || null;
}

export default HERBALISM_M1;
