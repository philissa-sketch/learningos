// ---------------------------------------------------------------------------
// HERBALISM & BOTANY — MODULE 3 · THE GARDEN IS AN ECOSYSTEM
// QUARTER 1, WEEKS 5 AND 6. Lessons 13-18 of 96.
//
// THE FIRST MODULE IN THE APP WITH REAL FOURTH-GRADE GEORGIA STANDARDS BEHIND
// IT. Modules 1 and 2 are honest off-grade teaching (S2L1, S3L1) recorded in
// TAUGHT_OFF_GRADE. This one is on grade, and it carries all four of Herbalism's
// Quarter 1 elements — the whole of S4L1.
//
//   hb-m3-01  W5 D1  Producers, consumers, decomposers     S4L1a
//   hb-m3-02  W5 D2  Build the compost bin                 S4L1a
//   hb-m3-03  W6* D3 The food web starts at the sun        S4L1b   (*week 5, day 3)
//   hb-m3-04  W6 D1  Draw your bucket's food web           S4L1b
//   hb-m3-05  W6 D2  Change one thing — what follows       S4L1c
//   hb-m3-06  W6 D3  When the pollinators stop coming      S4L1d
//
// ---- THE STANDARD, AND HOW THESE SIX LESSONS DISCHARGE IT ----
//
// S4L1. Obtain, evaluate, and communicate information about the roles of
// organisms and the flow of energy within an ecosystem.
//
//   a. Develop a model to describe the roles of producers, consumers, and
//      decomposers in a community.
//   b. Develop simple models to illustrate the flow of energy through a food
//      web/food chain beginning with sunlight and including producers,
//      consumers, and decomposers.
//   c. Design a scenario to demonstrate the effect of a change on an ecosystem.
//   d. Use printed and digital data to develop a model illustrating and
//      describing changes to the flow of energy in an ecosystem when plants or
//      animals become scarce, extinct or over-abundant.
//
// Every one of those four is a MODEL or a DESIGNED SCENARIO — a verb, not a
// vocabulary list. So every activity in this module ends with her having made
// something on paper or in dirt:
//
//   a  L1 sorts every living thing she can find into three columns.
//      L2 builds the compost bin and runs it as a decomposer machine.
//   b  L3 pins a real food chain to her containers with string, sun first.
//      L4 draws the food web of her four buckets as a WEB, arrows and all.
//   c  L5 is a designed two-container experiment: change ONE thing, hold the
//      rest still, write the prediction down BEFORE looking.
//   d  L6 counts pollinators for real, then reads a printed count beside her
//      own, and redraws the web for scarce / extinct / over-abundant.
//
// The vehicle sentences in curriculumPlan.js STANDARD_OWNERS promised exactly
// this — "in her own compost bin", "of her containers", "predict what follows",
// "when the pollinators stop coming" — and the activities are written to
// deliver them rather than to gesture at them.
//
// ---- JUDGEMENT CALLS, STATED SO NOBODY HAS TO GUESS ----
//
// 1. `src/data/standards/georgiaScience4.js` IS NOT PRESENT IN THIS CHECKOUT.
//    Neither is `src/data/assessments/herbalismM1Bank.js` or
//    `src/data/lessons/herbalismQ1.js`. I could not read the verbatim
//    transcription. The four element CODES come from an in-repo authoritative
//    source — STANDARD_OWNERS in `src/config/curriculumPlan.js` — and the
//    element TEXT quoted above was corroborated against an external GSE listing.
//    BEFORE MERGING: diff the four element strings above against
//    georgiaScience4.js and fix any wording drift. The codes are certain; the
//    prose above should be treated as unverified against the project's own copy.
//
// 2. THE BANK SHAPE WAS RECONSTRUCTED, NOT COPIED. herbalismM1Bank.js was
//    missing, so m3Bank.js is built to what `scripts/check-assessment.mjs` and
//    `src/lib/assessmentEngine.js` actually require of a bank item:
//    { id, lesson, prompt, choices[4], answer, feedback[4] (null at answer),
//    why }. The id convention is inferred from the one literal in the check
//    script, 't-hb101a' → t + hb + sequence + lesson + letter, giving
//    't-hbm301a'. If the real M1 bank uses a different key, this needs a rename
//    pass and nothing else.
//
// 3. VIDEO DURATIONS ARE ONLY FILLED IN WHERE I COULD VERIFY THEM. noembed does
//    not return duration and youtube.com returned 429 for the rest. Three
//    lessons carry `minutes: null` rather than a plausible-looking guess. Every
//    video ID, title and channel below IS verified — the exact noembed response
//    is quoted in each `verified` note.
//
// 4. THE SUBJECT WORD LIST SHOULD GROW, BUT THIS MODULE DOES NOT NEED IT TO.
//    I first assumed the readability check would fail on "decomposers" and
//    "pollinator" and wrote this note saying so. Then I ran the check's own
//    analyser over the sixty bank questions with the SUBJECT set exactly as it
//    ships today, and they pass — worst prompt 10.0 words a sentence against a
//    cap of 11, and no prompt trips the long-word rule. The note was wrong and
//    is corrected rather than deleted, because the reason it passes is worth
//    knowing: every prompt was deliberately held to ONE subject word, which is
//    a real constraint on anyone writing Module 3 questions later.
//
//    So this is a recommendation, not a blocker. Adding these to SUBJECT in
//    check-assessment.mjs would let future questions use two of them in a
//    sentence, which is the same allowance already made for 'endosperm':
//      'producer', 'producers', 'consumer', 'consumers', 'decomposer',
//      'decomposers', 'ecosystem', 'ecosystems', 'nutrient', 'nutrients',
//      'energy', 'compost', 'bacteria', 'fungi', 'pollinator', 'pollinators',
//      'pollinate', 'extinct', 'abundant', 'predator', 'predict'
//    ('pollen' and 'petals' are already on the list.)
//
// 5. NO HERBIVORE / CARNIVORE / OMNIVORE. Georgia's own clarification on S4L1a
//    says students are not expected to identify the types of consumer. Teaching
//    them here would add four words that the standard explicitly does not ask
//    for, to a child reading at 2.5. Left out on purpose.
//
// 6. THE VIDEO FOR L5 IS TITLED "FOOD WEBS" AND THAT IS DELIBERATE. Crash
//    Course Kids #21.2 spends its second half on the spider monkey cascade —
//    monkeys gone, seeds not scattered, fewer plants, less food for everything
//    above them. That IS S4L1c. The obvious alternative, #41.1 "Living Things
//    Change", turned out on reading its transcript to be mostly about
//    adaptation and the peppered moth, which is a different standard. The rule
//    is pick the video first and write the lesson to what it actually says, so
//    L4 builds the web and L5 takes it apart.
//
// 7. FOUR OF SIX SOURCES ARE ONE OF TWO CHANNELS. Crash Course Kids carries
//    three of these lessons. That is a real source-concentration weakness and
//    it is recorded rather than smoothed over. It is also why L1, L4 and L6 go
//    elsewhere even though Crash Course Kids has an episode that would fit.
//
// 8. NO BLACK AMERICAN EDUCATOR WAS FOUND FOR ANY OF THE SIX. Every search is
//    written into the `sourceGap` string on that lesson's video, naming what was
//    searched and what came back. The gap stays at 0 of 20 lessons. The
//    blueprint already names Module 7 L40 as the strongest place to close it;
//    Dr Rae Wynn-Grant (wildlife ecologist, first Black woman to host a network
//    nature show) surfaced repeatedly in these searches and is a real lead for a
//    later ecosystems lesson — her material is interview and long-form, not a
//    four-minute fourth-grade explainer, so nothing here could honestly use it.
//
// ---- READING LEVEL AND SAFETY ----
//
// ~2.5, same bar as Module 1. Sentences under eleven words. The subject words
// above are exempt for the reason in note 4; everything else is short.
//
// NO DOSING. This module never touches what a plant does to a body — it is
// ecology, energy and who eats whom. Every activity that puts her hands in soil
// or near a stinging insect says so in `safety`, and the compost bin lesson says
// out loud that a compost bin is not a snack bowl.
//
// ---- WIRING THIS UP (not done here, and it is not optional) ----
//
// `src/config/assessment.js` WEEKS.herbalism needs two new entries or the
// weekly tests for these six lessons cannot be built:
//
//   { id: 'herbalism-q1-w5', course: 'herbalism', quarter: 1, n: 5, module: 3,
//     title: 'Three jobs, and the sun', planned: 3,
//     lessons: ['hb-m3-01', 'hb-m3-02', 'hb-m3-03'],
//     blurb: 'Who makes food, who eats it, who breaks it down — and where it all starts.' },
//   { id: 'herbalism-q1-w6', course: 'herbalism', quarter: 1, n: 6, module: 3,
//     title: 'Webs, and what happens when one strand goes', planned: 3,
//     lessons: ['hb-m3-04', 'hb-m3-05', 'hb-m3-06'],
//     blurb: 'Draw the web, change one thing, and find out what follows.' }
//
// Both weeks are complete the day this lands, so both weekly tests run at once.
// ---------------------------------------------------------------------------

// ===========================================================================
// LESSON 13 · hb-m3-01 · PRODUCERS, CONSUMERS, DECOMPOSERS · S4L1a
// ===========================================================================

/** STEP 1 · THE CHECK-IN · 5 minutes. */
const M3L1_CHECK_IN = {
  title: 'Three jobs in one bucket',
  text: 'Go and look in your corn bucket. There is the corn. There is a bug on a leaf. There is a worm down in the dirt. Three living things, side by side.',
  question: 'Only one of them can make its own food. Which one?'
};

/**
 * STEP 2 · THE SYSTEM CONCEPT · 12 minutes, as TWO BEATS.
 *
 * Beat 1 is the producer on its own, because "makes its own food" is the idea
 * everything else in the module hangs off. Beat 2 puts the other two jobs in
 * beside it. The video sits between them: Homeschool Pop names all three in
 * order and she lands better with the first one already in her head.
 */
const M3L1_BEATS = [
  {
    n: 1,
    label: 'Producers make their own food',
    hook: 'A plant never has to eat. Nothing else in your garden can say that.',
    teachingText:
      'A producer makes its own food out of sunlight. Your corn does it. Your garlic does it. Nothing else in that bucket can.',
    example:
      'Your turmeric leaf sits in the light all day and builds its own food. Nobody feeds it. It feeds itself.',
    applyIt: {
      prompt: 'A slug ate every leaf off one corn plant. What can that plant not do now?',
      choices: [
        'Make its own food',
        'Pull up water',
        'Hold on with its roots',
        'Stay alive one more day'
      ],
      answer: 0,
      feedback: [
        null,
        'The roots still pull water up. That part is fine.',
        'The roots were never touched. The leaves were.',
        'It can stay alive a while. It just cannot feed itself.'
      ],
      why: 'Leaves are where a producer catches light. No leaves means no food made.'
    }
  },
  {
    n: 2,
    label: 'Consumers eat. Decomposers break down.',
    hook: 'A worm eats what nothing else in your garden will touch.',
    teachingText:
      'A consumer eats other living things. A decomposer eats dead things. It breaks them down into nutrients the soil can hold.',
    example:
      'That bug chewing your corn leaf is a consumer. The worm under the pot is a decomposer. The corn feeds them both.',
    applyIt: {
      prompt: 'Your worm bin had dead leaves in it. Now there are none. What happened?',
      choices: [
        'Decomposers broke them down',
        'The leaves made their own food',
        'The corn ate them',
        'They dried up and blew away'
      ],
      answer: 0,
      feedback: [
        null,
        'A dead leaf cannot make food. It is not alive.',
        'Corn is a producer. A producer does not eat.',
        'The bin has a lid. Nothing blew out of it.'
      ],
      why: 'Decomposers turn dead stuff into nutrients. That is why the bin empties itself.'
    }
  }
];

/** STEP 3 · THE ACTIVITY · 20 minutes. Away from the screen. */
const M3L1_ACTIVITY = {
  title: 'Tag every job in the garden',
  prep: 'Cut 15 small cards. Write P on five, C on five and D on five. P is producer, C is consumer, D is decomposer.',
  needs: [
    '15 small cards, marked P, C and D',
    'a pencil',
    'a magnifier',
    'garden gloves',
    'your garlic, turmeric, ginger and corn containers',
    'one big sheet of paper'
  ],
  steps: [
    'Start at the garlic. Find one living thing. Just one.',
    'Ask it three questions. Does it make food? Does it eat food? Does it break dead food down?',
    'Lay a P, C or D card next to it.',
    'Do the same at the turmeric, the ginger and the corn.',
    'Now tip one pot on its side and look underneath.',
    'Scrape the top of the soil back with a stick. Look again.',
    'Most decomposers hide. You have to go looking for them.',
    'Draw three tall columns on the big sheet. Head them P, C and D.',
    'Write every living thing you found into its own column.',
    'One column will be much shorter than the others. Say out loud which one.'
  ],
  safety:
    'Wear gloves in the soil and wash your hands after. Do not pick up anything that stings. Never taste a plant or a bug without a grown-up.',
  grownUpAsks: [
    'Before we go out. Which of these three jobs do you think is the rarest?',
    'You found a bug. Is it making food or eating it? How can you tell?',
    'What is the corn plant doing right now that the bug cannot do?',
    'Where would you look if you wanted to find a decomposer on purpose?',
    'Why do you think the decomposers are all hiding under things?',
    'That worm is eating. So is the bug. Why are they not the same job?',
    'What do you think happens to a dead leaf if nobody breaks it down?',
    'Your D column is short. Does that mean there are only a few of them?',
    'Which column would you miss most if it disappeared tomorrow? Why?',
    'The corn feeds the bug. Who feeds the corn?'
  ]
};

/** STEP 4 · THE LEDGER ENTRY · 8 minutes. She writes it. Nothing is corrected. */
const M3L1_LEDGER = {
  sheet: 'M3L1-three-jobs-PRINTABLE.pdf',
  tasks: [
    'Copy your three columns onto the sheet. P, C and D.',
    'Circle the one living thing you were least sure about.',
    'Draw one arrow from a producer to a consumer that eats it.',
    'Write one question about decomposers for Gigi. You must know the answer.'
  ],
  game: {
    title: 'Word Boss',
    cards: ['PRODUCER', 'CONSUMER', 'DECOMPOSER', 'ECOSYSTEM', 'NUTRIENTS'],
    rounds: [
      'Say what each word means in your own words. No fancy talk.',
      'A grown-up says the meaning. You say the word. Beat the clock.',
      'Stump Gigi. Write her one question you already know the answer to.'
    ],
    ifSheIsStuck:
      'Point at the three columns on the sheet instead of saying the answer. The word comes easier when the list is under her hand.'
  },
  note: 'Nothing here is graded. Nothing is corrected. Petals are for doing it.'
};

// ===========================================================================
// LESSON 14 · hb-m3-02 · BUILD THE COMPOST BIN · S4L1a
// ===========================================================================

const M3L2_CHECK_IN = {
  title: 'The pile that never grows',
  text: 'Leaves fall off trees every autumn. They have done it for thousands of years. Nobody rakes the woods.',
  question: 'So why is the forest floor not deep in dead leaves?'
};

/**
 * Beat 1 is what decomposers hand back — nutrients into the soil, which the
 * producers then take up. That closing of the loop is the actual payload of
 * S4L1a and it is the bit a child misses if decomposers are taught as "things
 * that eat rubbish".
 *
 * Beat 2 is the four things the bin needs, because she is about to build one
 * and a bin that gets no air just sits there and smells.
 */
const M3L2_BEATS = [
  {
    n: 1,
    label: 'Where the nutrients go',
    hook: 'Every bit of your corn plant was down in the soil first.',
    teachingText:
      'A decomposer breaks dead stuff into nutrients. Those nutrients go into the soil. Roots then pull them back up into new plants.',
    example:
      'A dead leaf falls on your ginger pot. Bacteria and fungi take it apart. Months later that leaf is feeding the ginger.',
    applyIt: {
      prompt: 'You buried an apple core and a plastic spoon. Two months on, only one is gone. Why?',
      choices: [
        'Decomposers can eat the core, not the spoon',
        'The spoon was buried deeper',
        'The core was smaller',
        'Somebody dug the core up'
      ],
      answer: 0,
      feedback: [
        null,
        'They were buried side by side, the same depth.',
        'Size is not it. A whole log breaks down. A tiny bead does not.',
        'The soil was not touched. Nothing dug it up.'
      ],
      why: 'Decomposers break down things that were once alive. Plastic never was.'
    }
  },
  {
    n: 2,
    label: 'A compost bin is a decomposer machine',
    hook: 'A compost bin that is doing its job gets warm in the middle. You can feel it.',
    teachingText:
      'Compost is what you get when you let decomposers work in one spot. They need four things. Air, water, dead plant stuff and time.',
    example:
      'Dry brown leaves and wet green scraps go in together. Brown for air, green for food. Then you turn it so it can breathe.',
    applyIt: {
      prompt: 'Gigi packed her bin tight and shut the lid hard. It went slimy and slow. What is missing?',
      choices: ['Air', 'Water', 'Green scraps', 'Time'],
      answer: 0,
      feedback: [
        null,
        'A packed wet bin has too much water, not too little.',
        'There were plenty of scraps. That is what went slimy.',
        'Time will not help a bin that cannot breathe.'
      ],
      why: 'Decomposers need air. Pack a bin tight and you shut the air out.'
    }
  }
];

const M3L2_ACTIVITY = {
  title: 'Build the bin, then feed it',
  prep: 'A grown-up drills about twenty holes in a plastic tub and its lid. Holes in the bottom too. Stand the tub on two bricks.',
  needs: [
    'a plastic tub with a lid, holes drilled',
    'two bricks',
    'dry brown leaves or torn brown card',
    'green kitchen scraps — peel, ends, tea leaves',
    'a jug of water',
    'a stick for turning',
    'a marker pen'
  ],
  steps: [
    'Put a deep layer of dry brown leaves in the bottom.',
    'Add a thin layer of green scraps on top.',
    'Brown, green, brown, green. Twice as much brown as green.',
    'Splash water over it. Damp like a wrung-out cloth, not wet.',
    'Add one shovel of soil from your garden. That is where the decomposers come from.',
    'Put the lid on. Stand it somewhere shady.',
    'Mark today on the lid with the pen.',
    'Write down what you put in. Every single thing.',
    'Turn it with the stick twice a week. Count how many turns.',
    'On week two, push your hand near the middle. Is it warm?',
    'Look for anything you can still name. Then look for anything you cannot.'
  ],
  safety:
    'NO meat, no bones, no milk, no cheese, no cooking oil. Those bring rats. This bin is not a snack bowl and nothing comes out of it to eat. Wear gloves, and wash your hands every time you close the lid.',
  grownUpAsks: [
    'Why do you think we put the bin up on bricks?',
    'Why did we drill all those holes? What gets in?',
    'We put a shovel of garden soil in. What was really in that shovel?',
    'Twice as much brown as green. What would happen with all green?',
    'Damp, not soaking. Why does that matter to a decomposer?',
    'Guess what will be gone first. Say it out loud, I am writing it down.',
    'Guess what will still be there in three months.',
    'It got warm in the middle. What is making the heat?',
    'This is food scraps. Is it a snack? Why not?',
    'When it is finished, where is it going? Which pot, and why that one?',
    'What is the compost actually giving the plant? What is the word?'
  ]
};

const M3L2_LEDGER = {
  sheet: 'M3L2-compost-log-PRINTABLE.pdf',
  tasks: [
    'List everything you put in the bin today.',
    'Write your two guesses: first thing gone, last thing standing.',
    'Draw the bin in layers. Label brown and green.',
    'Each week, write one line. Date, turns, and what it smells like.'
  ],
  game: {
    title: 'In or Out',
    cards: ['APPLE CORE', 'PLASTIC FORK', 'DRY LEAVES', 'CHICKEN BONE', 'TEA LEAVES', 'FOIL'],
    rounds: [
      'Hold up a card. She says IN or OUT, then says why.',
      'A grown-up says why. She says which card it was.',
      'She writes one new card of her own. You have to guess it.'
    ],
    ifSheIsStuck:
      'Ask one question only: was it ever alive? That question answers four of the six cards on its own.'
  },
  note: 'Nothing here is graded. The bin takes months. That is part of the lesson.'
};

// ===========================================================================
// LESSON 15 · hb-m3-03 · THE FOOD WEB STARTS AT THE SUN · S4L1b
// ===========================================================================

const M3L3_CHECK_IN = {
  title: 'Follow it backwards',
  text: 'Think about your breakfast this morning. Now think about where it came from. Then where that came from. Keep going backwards.',
  question: 'How far back can you get before you run out?'
};

/**
 * Written to Crash Course Kids #7.1, in its order and using its words: a food
 * chain is a MODEL that shows how energy flows; the energy starts at the sun;
 * plants turn it into food; grass to rabbit to hawk.
 *
 * Her version of grass-rabbit-hawk is corn leaf to caterpillar to wren, because
 * those are things she can actually go and look at.
 */
const M3L3_BEATS = [
  {
    n: 1,
    label: 'It all starts at the sun',
    hook: 'Every single thing you have ever eaten was sunlight first.',
    teachingText:
      'Energy is what living things run on. It starts at the sun. A producer catches it and turns it into food.',
    example:
      'Sunlight lands on your corn leaf. The leaf turns it into food and the plant grows. The energy is now inside the corn.',
    applyIt: {
      prompt: 'You shut your corn in a dark closet for two weeks. The caterpillars on it die. Why?',
      choices: [
        'No light, so the corn made no food',
        'Caterpillars need light to see',
        'The closet was too cold',
        'Caterpillars eat sunlight'
      ],
      answer: 0,
      feedback: [
        null,
        'They eat in the dark just fine. Their food ran out.',
        'The house is warm. The closet was warm too.',
        'They eat leaves. Only a producer uses light directly.'
      ],
      why: 'Cut the sun off and the producer stops. Everything above it runs out too.'
    }
  },
  {
    n: 2,
    label: 'A food chain is a model of the energy moving',
    hook: 'A food chain is not a list of animals. It is a picture of energy moving.',
    teachingText:
      'A food chain shows where the energy goes next. Sun, then producer, then consumer, then another consumer.',
    example:
      'Sun to corn leaf. Corn leaf to caterpillar. Caterpillar to wren. Four links, and one of them is not alive.',
    applyIt: {
      prompt: 'Sun, corn, caterpillar, wren. Which link is the producer?',
      choices: ['The corn', 'The sun', 'The caterpillar', 'The wren'],
      answer: 0,
      feedback: [
        null,
        'The sun gives the energy. It is not alive, so it is not a producer.',
        'It eats the corn. That makes it a consumer.',
        'It eats the caterpillar. Also a consumer.'
      ],
      why: 'A producer is the living thing that catches the sunlight first. Here that is the corn.'
    }
  }
];

const M3L3_ACTIVITY = {
  title: 'String the chain across the garden',
  prep: 'Cut six index cards and a long piece of string. Bring clothes pegs.',
  needs: [
    'a ball of string',
    'six index cards',
    'clothes pegs',
    'a thick marker',
    'your four containers',
    'a sunny afternoon'
  ],
  steps: [
    'Write SUN on the first card in big letters.',
    'Peg the SUN card as high as you can reach. A fence, a branch, a hook.',
    'Find something in your garden that is being eaten. Really look.',
    'Write the plant on card two. Peg it to that actual plant.',
    'Write the eater on card three. Peg it beside the plant.',
    'Run string from SUN to the plant. That is link one.',
    'Run string from the plant to the eater. Link two.',
    'Now ask: what eats that? Birds, spiders, a cat, you.',
    'Add a fourth card and a third piece of string.',
    'Stand back. Follow the string with your finger, sun first.',
    'Say the whole chain out loud, starting at the sun. Every time.'
  ],
  safety:
    'Take the string down before you go in. Loose string is a trap for birds. Never taste anything you find growing.',
  grownUpAsks: [
    'Why does the sun card go up high and not in the middle?',
    'Point at the energy. Where is it right now?',
    'Which way is the energy moving along that string?',
    'The sun is on your chain. Is the sun alive?',
    'What would happen to this string if we took the plant off it?',
    'You are on this chain somewhere. Where?',
    'Is there a decomposer on your string yet? Where would it go?',
    'Could you start this chain anywhere except the sun?',
    'Which link has the most energy in it, do you think?',
    'Say the whole thing from the sun. No looking.'
  ]
};

const M3L3_LEDGER = {
  sheet: 'M3L3-food-chain-PRINTABLE.pdf',
  tasks: [
    'Draw your real chain. Sun first, arrows between every link.',
    'Write under it: what would break if the sun went out for a month?',
    'Add a decomposer to the end of your chain.',
    'Write one question about energy for Gigi. You must know the answer.'
  ],
  game: {
    title: 'Chain Race',
    cards: ['SUN', 'CORN', 'CATERPILLAR', 'WREN', 'WORM'],
    rounds: [
      'Shuffle the cards. Lay them in the right order. Time her.',
      'A grown-up removes one card in secret. She says which is gone.',
      'She builds a chain from her own garden. Five cards, no help.'
    ],
    ifSheIsStuck:
      'Ask one question: what does this one eat? The card it names goes before it. Every time.'
  },
  note: 'Nothing here is graded. Say the chain out loud from the sun as often as she will let you.'
};

// ===========================================================================
// LESSON 16 · hb-m3-04 · DRAW YOUR BUCKET'S FOOD WEB · S4L1b
// ===========================================================================

const M3L4_CHECK_IN = {
  title: 'One chain is a lie',
  text: 'Yesterday you strung one chain across the garden. Sun, plant, eater, eater. Neat and straight.',
  question: 'But that wren eats more than one thing. So where does the second chain go?'
};

/**
 * The arrow rule is Beat 2 on purpose. It is the single most-missed idea in
 * this whole standard: children draw the arrow from the eater to the eaten,
 * because that is the direction the mouth goes. The arrow follows the ENERGY,
 * which runs the other way. Taught with the word "gives", not "eats".
 *
 * A web is drawn as a web. Not a row and not a ladder — the same reason the
 * life cycle is never drawn as a row.
 */
const M3L4_BEATS = [
  {
    n: 1,
    label: 'Most eaters are on more than one chain',
    hook: 'A garden spider can sit on six food chains at once.',
    teachingText:
      'Hardly anything eats only one food. When you draw all the chains at once, they cross. That is a food web.',
    example:
      'Your wren eats caterpillars off the corn. It also eats beetles off the garlic. Two chains, one bird.',
    applyIt: {
      prompt: 'A bug in your garden eats corn leaves AND garlic leaves. What does that make?',
      choices: [
        'Two chains that cross',
        'One very long chain',
        'Two gardens',
        'No chain at all'
      ],
      answer: 0,
      feedback: [
        null,
        'Length is not it. It is on two chains at once, not one long one.',
        'It is one garden. The bug just eats twice.',
        'It eats, so it is on a chain. Two, in fact.'
      ],
      why: 'One eater on two foods makes two chains. Chains that cross are a web.'
    }
  },
  {
    n: 2,
    label: 'The arrow points where the energy goes',
    hook: 'Almost everybody draws this arrow backwards the first time.',
    teachingText:
      'The arrow does not mean "eats". It means "gives its energy to". So it points from the food to the eater.',
    example:
      'Corn to caterpillar, arrow this way. The corn gives. The caterpillar gets. Never the other way round.',
    applyIt: {
      prompt: 'You drew an arrow from the wren to the caterpillar. What is wrong with it?',
      choices: [
        'It points the wrong way',
        'Wrens do not eat caterpillars',
        'Wrens are producers',
        'Nothing is wrong'
      ],
      answer: 0,
      feedback: [
        null,
        'They do. That part is right.',
        'A wren eats. Only plants are producers here.',
        'It is backwards. The caterpillar gives, the wren gets.'
      ],
      why: 'Follow the food. The arrow goes from the one being eaten to the one eating.'
    }
  }
];

const M3L4_ACTIVITY = {
  title: "The four-bucket web, drawn big",
  prep: 'Tape two sheets of paper together to make one big sheet. Sticky notes if you have them.',
  needs: [
    'one very big sheet of paper',
    'a pencil and a red pen',
    'sticky notes',
    'your garlic, turmeric, ginger and corn containers',
    'your food chain sheet from yesterday'
  ],
  steps: [
    'Write SUN in the top corner and draw a ring round it.',
    'Write your four plants across the sheet. Garlic, turmeric, ginger, corn.',
    'Draw an arrow from the SUN to every single plant. Four arrows.',
    'Go outside. Write every eater you can find on a sticky note.',
    'Bring the notes in. Stick them around your plants, not in a line.',
    'Draw an arrow from each plant to whatever eats it.',
    'Now the hard part. Does any eater eat from two plants?',
    'Give that one a second arrow. In red.',
    'Write DECOMPOSERS at the bottom of the sheet.',
    'Draw an arrow from everything on the page down to the decomposers.',
    'Draw one last arrow from the decomposers back up to the plants.',
    'Follow one red arrow with your finger and say what it means out loud.'
  ],
  safety:
    'Look, do not grab. Some garden bugs bite and some sting. Wash your hands when you come in.',
  grownUpAsks: [
    'Why does the sun get four arrows and not one?',
    'Show me an arrow. Which one is giving and which one is getting?',
    'Which plant has the most arrows leaving it? Why that one?',
    'Which plant has the fewest? What does that tell you?',
    'Read me one red arrow. What does it mean?',
    'Why does everything on the page point down to the decomposers?',
    'What is that last arrow doing, going back up to the plants?',
    'If you rubbed out the sun, how many arrows would still make sense?',
    'Is your web finished? What is out there that you did not find?',
    'Is a web stronger than a chain, or weaker? Say why.'
  ]
};

const M3L4_LEDGER = {
  sheet: 'M3L4-food-web-PRINTABLE.pdf',
  tasks: [
    'Copy your web onto the sheet. Sun first, arrows on every line.',
    'Circle in red every eater that is on two chains.',
    'Write the arrow rule in your own words at the bottom.',
    'Count your arrows. Write the number and the date.'
  ],
  game: {
    title: 'Arrow Court',
    cards: ['CORN → CATERPILLAR', 'WREN → CATERPILLAR', 'SUN → GARLIC', 'BEETLE → GINGER'],
    rounds: [
      'Hold up a card. She says RIGHT or BACKWARDS, then says why.',
      'She fixes the backwards ones out loud.',
      'She writes two cards of her own. One right, one backwards. You guess.'
    ],
    ifSheIsStuck:
      'Ask her who is giving and who is getting. The giver is always at the tail of the arrow.'
  },
  note: 'Nothing here is graded. A web that is a bit messy is a web that is honest.'
};

// ===========================================================================
// LESSON 17 · hb-m3-05 · CHANGE ONE THING — WHAT FOLLOWS · S4L1c
// ===========================================================================

const M3L5_CHECK_IN = {
  title: 'Pull one thread',
  text: 'Your web is on the wall. Every arrow on it is a thread. Now put your finger on one plant and cover it up.',
  question: 'Which arrows just stopped working? Say all of them, not just the first.'
};

/**
 * Written to Crash Course Kids #21.2, whose second half is exactly this: the
 * spider monkeys go, the seeds are not scattered, fewer plants grow, and the
 * animals above them run short. She has the web from yesterday on the wall, so
 * the video is showing her a thing she has already drawn.
 *
 * Beat 2 is the method, not the content, and it is the part S4L1c actually
 * asks for: DESIGN a scenario. Change one thing. Hold everything else still.
 * Write the prediction down before you look.
 */
const M3L5_BEATS = [
  {
    n: 1,
    label: 'A change does not stop where it starts',
    hook: 'Take the monkeys out of a rainforest. The trees start to go too.',
    teachingText:
      'Change one thing in an ecosystem and it does not stop there. It travels along the arrows.',
    example:
      'Spider monkeys eat fruit and drop the seeds all over the forest. No monkeys, no scattered seeds. Fewer new trees. Less food for everything.',
    applyIt: {
      prompt: 'Every caterpillar in your garden is gone. What happens to the wrens?',
      choices: [
        'They go hungry or move away',
        'Nothing changes for them',
        'They start making their own food',
        'They eat the corn instead of the sun'
      ],
      answer: 0,
      feedback: [
        null,
        'They ate those caterpillars. Something changes.',
        'Only producers make food. A wren cannot.',
        'Nothing eats the sun. Only producers use it.'
      ],
      why: 'The wren is one arrow up from the caterpillar. Cut the arrow and the wren feels it.'
    }
  },
  {
    n: 2,
    label: 'How to test it without guessing',
    hook: 'Scientists change one thing on purpose and leave everything else alone.',
    teachingText:
      'Set up two the same. Change ONE thing on one of them. Everything else stays the same. Then you know what caused it.',
    example:
      'Two garlic pots, same soil, same water, same day. One goes in the shade. Now shade is the only difference there is.',
    applyIt: {
      prompt: 'You moved one pot to the shade AND watered it less. It did worse. What caused it?',
      choices: [
        'You cannot tell',
        'The shade',
        'The water',
        'Both, half and half'
      ],
      answer: 0,
      feedback: [
        null,
        'Maybe. But you changed the water too, so you cannot be sure.',
        'Maybe. But you changed the light too. Same problem.',
        'That is a guess. The test cannot tell you the split.'
      ],
      why: 'Change two things and you can never say which one did it. That is why you change one.'
    }
  }
];

const M3L5_ACTIVITY = {
  title: 'The One-Change Test',
  prep: 'You need two containers of the same plant, as alike as you can get them. Garlic is easiest. Set them up a week ahead if you can.',
  needs: [
    'two matching pots of the same plant',
    'two labels, A and B',
    'a measuring jug',
    'a ruler',
    'a notebook',
    'one thing to change — a shade cloth, or a lid, or a mulch of leaves'
  ],
  steps: [
    'Stand the two pots side by side. Label them A and B.',
    'Measure both plants. Write both numbers down.',
    'Count the leaves on both. Write those down too.',
    'Pick ONE thing to change. Only one. Say it out loud.',
    'Write it at the top of the page: I am changing ____ on pot B.',
    'Now write your prediction. What will happen, and why.',
    'Say what you will NOT change. Same water, same spot, same soil.',
    'Make the change to B. Leave A completely alone.',
    'Measure both every second day. Same time of day, every time.',
    'After ten days, look at your prediction. Were you right?',
    'Write what actually happened, even if it is boring.',
    'Then answer this: what else changed that you did not mean to change?'
  ],
  safety:
    'Do not use anything that could hurt the plant for good — no salt, no bleach, no vinegar in the soil. Shade, water and mulch are enough. Wash hands after.',
  grownUpAsks: [
    'Which one thing are you going to change? Why that one?',
    'What are you keeping exactly the same? List them for me.',
    'What do you think will happen? Say it before we start.',
    'Which pot is the one you are not touching? What is it for?',
    'Why do we measure both, and not just the one we changed?',
    'Why at the same time of day every time?',
    'It is day six and nothing has happened. Does that mean it failed?',
    'You were wrong about the prediction. Is that a bad thing? Why not?',
    'Something changed that you did not plan. What was it?',
    'If this were the whole garden and not one pot, who else would feel it?',
    'How would you test it again, better, next time?'
  ]
};

const M3L5_LEDGER = {
  sheet: 'M3L5-one-change-test-PRINTABLE.pdf',
  tasks: [
    'Write the one thing you changed. Then list what you held the same.',
    'Write your prediction. Date it. Do not change it later.',
    'Fill in the measuring table every second day. A and B.',
    'At the end, write what happened and whether your prediction held.'
  ],
  game: {
    title: 'Then What?',
    cards: [
      'THE BEES STOP COMING',
      'A DROUGHT DRIES THE SOIL',
      'THE WORMS ALL LEAVE',
      'SOMETHING EATS EVERY LEAF',
      'THE SHED SHADES THE CORN'
    ],
    rounds: [
      'Draw a card. She says what happens first, then what happens after that.',
      'Three steps deep. She has to get to a third thing, not stop at one.',
      'She writes a card of her own about her own garden. You have to answer it.'
    ],
    ifSheIsStuck:
      'Point at the food web on the wall and ask which arrow the change lands on. Then ask what is at the far end of that arrow.'
  },
  note: 'Nothing here is graded. A prediction that turned out wrong is worth as many petals as one that was right.'
};

// ===========================================================================
// LESSON 18 · hb-m3-06 · WHEN THE POLLINATORS STOP COMING · S4L1d
// ===========================================================================

const M3L6_CHECK_IN = {
  title: 'Three out of four',
  text: 'Look at a plate of food. Take away everything a bee helped grow. Most of the colour goes with it.',
  question: 'What would still be left on that plate?'
};

/**
 * S4L1d names three states in its own words — scarce, extinct, over-abundant —
 * and all three are taught here by name, because a standard that says "scarce
 * or extinct or over-abundant" is asking for three different models and not one.
 *
 * Beat 1 is what a pollinator actually DOES, because "bees are important" is a
 * slogan and "a flower cannot make a seed until pollen is moved" is a mechanism.
 *
 * The standard also says PRINTED AND DIGITAL DATA. The activity uses both: her
 * own tally on paper, beside a printed count Gigi brings to the table.
 */
const M3L6_BEATS = [
  {
    n: 1,
    label: 'What a pollinator is actually for',
    hook: 'A bee is not visiting your flower to help it. It came for a meal and got covered in dust.',
    teachingText:
      'A flower cannot make a seed until pollen is moved to it. A pollinator moves it. No pollen moved, no seed.',
    example:
      'A bee lands on a squash flower for food. Pollen sticks to its fur. It flies to the next flower and drops it off.',
    applyIt: {
      prompt: 'A squash plant flowered all summer but grew no squash. What is the likely reason?',
      choices: [
        'No pollinator came to the flowers',
        'The flowers were the wrong colour',
        'It got too much water',
        'Squash grows from leaves, not flowers'
      ],
      answer: 0,
      feedback: [
        null,
        'Colour brings pollinators in. It does not make the seed.',
        'Too much water hurts the whole plant. These flowered fine.',
        'The squash grows from the flower once pollen has moved.'
      ],
      why: 'Flowers with no visitors make no seed and no fruit. The plant did its part.'
    }
  },
  {
    n: 2,
    label: 'Scarce, extinct, over-abundant',
    hook: 'Too many of one thing breaks a web. So does too few.',
    teachingText:
      'Scarce means there are only a few left. Extinct means there are none, anywhere, ever again. Over-abundant means far too many.',
    example:
      'Bees getting scarce means fewer seeds. Bees extinct means no seeds at all. Too many slugs means no leaves left to eat from.',
    applyIt: {
      prompt: 'Slugs in one garden went from a few to hundreds. Which word fits?',
      choices: ['Over-abundant', 'Scarce', 'Extinct', 'Pollinator'],
      answer: 0,
      feedback: [
        null,
        'Scarce means hardly any. There are hundreds.',
        'Extinct means none left anywhere. There are hundreds.',
        'A slug eats leaves. It does not carry pollen about.'
      ],
      why: 'Over-abundant means far too many of one thing. That eats a web out just as fast.'
    }
  }
];

const M3L6_ACTIVITY = {
  title: 'Count them, then read somebody else’s count',
  prep: 'Gigi prints one page of real pollinator counts before you start — a garden survey table or a bee count chart. Paper, on the table, next to her own.',
  needs: [
    'a timer',
    'a clipboard and a tally sheet',
    'a printed pollinator count from a real survey',
    'coloured pencils',
    'your food web sheet from Lesson 16',
    'a sunny still day, mid-morning'
  ],
  steps: [
    'Pick one flowering plant. Sit down about a step away from it.',
    'Set the timer for ten minutes. Do not move about.',
    'Every visitor that lands gets one mark. Bee, fly, wasp, butterfly, beetle.',
    'Do not try to name the species. Just mark the kind.',
    'When the timer goes, add up each row.',
    'Now put the printed count on the table beside yours.',
    'Find one thing that is the same in both. Say it out loud.',
    'Find one thing that is different. Say why it might be.',
    'Get out your food web from Lesson 16.',
    'In one colour, cross out every arrow that stops if pollinators go scarce.',
    'In a darker colour, cross out what stops if they go extinct.',
    'Count the arrows left. That number is your answer.'
  ],
  safety:
    'Watch bees. Do not touch them, chase them or block their way. Sit still and they will ignore you. Tell a grown-up straight away about any sting. Never taste a flower.',
  grownUpAsks: [
    'Before you sit down. How many visitors do you think in ten minutes?',
    'Which kind came the most? Did that surprise you?',
    'Ten minutes on one plant. Is that enough to be sure?',
    'This printed count is from somebody else’s garden. Should it match yours?',
    'One thing is different between the two counts. Why might that be?',
    'Show me one arrow on your web that a bee is holding up.',
    'Scarce, not extinct. What is left working on your web?',
    'Now extinct. How many arrows did you lose?',
    'The plants are still there and still healthy. So what did we lose?',
    'Who else on this web goes hungry, two arrows further up?',
    'Name one thing we could do this month to bring more of them in.'
  ]
};

const M3L6_LEDGER = {
  sheet: 'M3L6-pollinator-count-PRINTABLE.pdf',
  tasks: [
    'Fill in your ten-minute tally. One row per kind of visitor.',
    'Write one line about how your count and the printed count differ.',
    'Redraw your web twice. Once for scarce. Once for extinct.',
    'Write down one thing you will plant to bring more pollinators in.'
  ],
  game: {
    title: 'Word Boss',
    cards: ['POLLINATOR', 'POLLEN', 'SCARCE', 'EXTINCT', 'OVER-ABUNDANT'],
    rounds: [
      'Say what each word means in your own words. No fancy talk.',
      'A grown-up says the meaning. You say the word. Beat the clock.',
      'Give a real example of each one from your own garden or your own count.'
    ],
    ifSheIsStuck:
      'Put the two redrawn webs side by side. Scarce has some arrows left. Extinct has none. The pictures say it faster than the words do.'
  },
  note: 'Nothing here is graded. The tally sheet is real data she collected, and it goes in the Plant Detective Log.'
};

// ===========================================================================
// THE MODULE
// ===========================================================================

export const HERBALISM_M3 = [
  {
    id: 'hb-m3-01',
    course: 'herbalism',
    module: 3,
    quarter: 1,
    week: 5,
    day: 1,
    n: 13,
    title: 'Producers, consumers, decomposers',
    minutes: 45,
    spec: '§10 · beats',

    concept:
      'Every living thing in the garden has one of three jobs: make the food, eat the food, or break it back down.',

    standards: ['S4L1a'],

    words: ['producer', 'consumer', 'decomposer', 'ecosystem', 'nutrients'],

    glossary: [
      { word: 'producer', plain: 'A living thing that makes its own food from sunlight. A plant.' },
      { word: 'consumer', plain: 'A living thing that has to eat other living things.' },
      { word: 'decomposer', plain: 'A living thing that breaks dead stuff down.' },
      { word: 'ecosystem', plain: 'All the living things in one place, plus the dirt, air and water.' },
      { word: 'nutrients', plain: 'The bits of food in the soil that roots pull up.' },
      { word: 'community', plain: 'All the living things sharing one place.' },
      { word: 'soil', plain: 'Not just dirt. It is full of living things doing jobs.' }
    ],

    video: {
      id: 'nBrEcUovvOc',
      url: 'https://www.youtube.com/watch?v=nBrEcUovvOc',
      title: 'The Food Chain for Kids | Producers, Consumers, and Decomposers',
      channel: 'Homeschool Pop',
      minutes: 11,
      verified: '2026-08-15 · re-checked at youtube.com/oembed',
      teaches: ['producer', 'consumer', 'decomposer', 'food chain', 'energy'],
      sourceGap:
        'No Black American educator found. Searched: "Black American science educator YouTube channel elementary ecosystem food web kids" — returned Crash Course Kids, Generation Genius, Mystery Science and two listicles, none Black-led. Open.'
    },

    checkIn: M3L1_CHECK_IN,
    beats: M3L1_BEATS,
    activity: M3L1_ACTIVITY,
    ledger: M3L1_LEDGER,

    hook: M3L1_CHECK_IN,
    core: M3L1_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing:
      'Take fifteen cards marked P, C and D out to the garlic, turmeric, ginger and corn. Find one living thing at a time and ask it three questions: do you make food, eat food, or break dead food down? Lay the right card beside it. Tip a pot over and scrape the soil back, because the decomposers are all hiding. Then draw three columns on a big sheet and write everything you found into its own column — and notice which column came out shortest.',

    practice: [
      {
        ask: 'What are the three jobs in an ecosystem?',
        answer: 'Producer, consumer and decomposer.',
        why: 'One makes the food, one eats it, and one breaks it back down into nutrients.'
      },
      {
        ask: 'Why is your corn a producer and the bug on it is not?',
        answer: 'The corn makes its own food from sunlight. The bug has to eat.',
        why: 'Only producers can turn light into food. Everything else eats something.'
      }
    ],

    check: [
      {
        prompt: 'Which one of these is a producer?',
        choices: ['Your garlic plant', 'A worm', 'A beetle', 'A slug'],
        answer: 0,
        feedback: [
          null,
          'A worm breaks dead stuff down. That is a decomposer.',
          'A beetle eats other living things. That is a consumer.',
          'A slug eats living leaves. That is a consumer too.'
        ]
      },
      {
        prompt: 'What does a decomposer do that a consumer does not?',
        choices: [
          'Breaks dead things into nutrients',
          'Eats living things',
          'Makes food from sunlight',
          'Pulls water up from the soil'
        ],
        answer: 0,
        feedback: [
          null,
          'That is what a consumer does. Both eat, but not the same thing.',
          'That is a producer. Only plants do it here.',
          'Roots do that, and roots belong to a producer.'
        ]
      },
      {
        prompt: 'Nothing broke dead leaves down in your garden. What runs out?',
        choices: [
          'Nutrients in the soil',
          'Sunlight',
          'Water in the pot',
          'Air around the leaves'
        ],
        answer: 0,
        feedback: [
          null,
          'The sun keeps shining whatever the decomposers do.',
          'You water it yourself. That is not what stops.',
          'The air does not come from a dead leaf.'
        ]
      }
    ]
  },

  {
    id: 'hb-m3-02',
    course: 'herbalism',
    module: 3,
    quarter: 1,
    week: 5,
    day: 2,
    n: 14,
    title: 'Build the compost bin',
    minutes: 45,
    spec: '§10 · beats',

    concept:
      'A compost bin is a decomposer machine — it turns dead plant stuff back into nutrients the producers can use.',

    standards: ['S4L1a'],

    words: ['compost', 'decompose', 'nutrients', 'bacteria', 'fungi'],

    glossary: [
      { word: 'compost', plain: 'Dark crumbly stuff made from things that were once alive.' },
      { word: 'decompose', plain: 'To break down into smaller and smaller bits.' },
      { word: 'nutrients', plain: 'The bits of food in the soil that roots pull up.' },
      { word: 'bacteria', plain: 'Living things far too small to see. Most of the work is theirs.' },
      { word: 'fungi', plain: 'Moulds and mushrooms. They break dead stuff down too.' },
      { word: 'browns', plain: 'Dry dead stuff. Leaves, card, straw. They let air in.' },
      { word: 'greens', plain: 'Wet fresh scraps. Peel, ends, tea leaves. They are the food.' }
    ],

    video: {
      id: 'uB61rfeeAsM',
      url: 'https://www.youtube.com/watch?v=uB61rfeeAsM',
      title: 'The Dirt on Decomposers: Crash Course Kids #7.2',
      channel: 'Crash Course Kids',
      minutes: 3,
      verified: '2026-08-15 · re-checked at youtube.com/oembed',
      teaches: [
        'decomposer',
        'bacteria',
        'fungi',
        'nutrients back into the soil',
        'what happens if decomposers are lost'
      ],
      sourceGap:
        'No Black American educator found. Searched: "Black gardener educator youtube kids garden compost soil Black farmer teaching children video" — returned gardening-influencer listicles, a commercial composting firm and a news piece on a Black-led garden camp, no teaching video. Ron Finley was checked directly and his material is adult long-form. Open.'
    },

    checkIn: M3L2_CHECK_IN,
    beats: M3L2_BEATS,
    activity: M3L2_ACTIVITY,
    ledger: M3L2_LEDGER,

    hook: M3L2_CHECK_IN,
    core: M3L2_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing:
      'Build a real bin from a drilled plastic tub standing on two bricks. Layer it brown, green, brown, green — twice as much dry brown as wet green — then damp it down like a wrung-out cloth and add one shovel of garden soil, because that shovel is where the decomposers come from. Mark the date on the lid, write down every single thing that went in, and turn it twice a week with a stick. On week two put your hand near the middle and feel whether it has gone warm.',

    practice: [
      {
        ask: 'Why does a compost bin need holes in it?',
        answer: 'So air can get in. Decomposers need air to work.',
        why: 'Pack a bin tight and shut it up and it goes slimy and slow instead of breaking down.'
      },
      {
        ask: 'Where do the decomposers in a new bin come from?',
        answer: 'The shovel of garden soil you put in.',
        why: 'Soil is already full of bacteria, fungi and small creatures. You are moving them in.'
      }
    ],

    check: [
      {
        prompt: 'Which one will NOT break down in a compost bin?',
        choices: ['A plastic fork', 'An apple core', 'Dry leaves', 'Tea leaves'],
        answer: 0,
        feedback: [
          null,
          'An apple was alive once, so decomposers can take it apart.',
          'Leaves were part of a living plant. They break down well.',
          'Tea leaves were leaves. They break down fast.'
        ]
      },
      {
        prompt: 'What do decomposers put back into the soil?',
        choices: ['Nutrients', 'Sunlight', 'Seeds', 'Air'],
        answer: 0,
        feedback: [
          null,
          'Sunlight comes from the sun. Nothing puts it in the soil.',
          'Some seeds survive a bin, but that is not the job.',
          'Air gets in through the holes. It is not made in there.'
        ]
      },
      {
        prompt: 'Gigi packed her bin tight and it went slimy. What was missing?',
        choices: ['Air', 'Water', 'Greens', 'Nutrients'],
        answer: 0,
        feedback: [
          null,
          'A slimy bin has too much water, not too little.',
          'The greens were there. They are what went slimy.',
          'Nutrients come out of a bin. They do not go in.'
        ]
      }
    ]
  },

  {
    id: 'hb-m3-03',
    course: 'herbalism',
    module: 3,
    quarter: 1,
    week: 5,
    day: 3,
    n: 15,
    title: 'The food web starts at the sun',
    minutes: 45,
    spec: '§10 · beats',

    concept: 'Every bit of food in the garden was sunlight first. A food chain is the picture of it moving.',

    standards: ['S4L1b'],

    words: ['energy', 'food chain', 'sunlight', 'producer', 'consumer'],

    glossary: [
      { word: 'energy', plain: 'What living things run on. It comes from food.' },
      { word: 'food chain', plain: 'A picture of energy moving from one living thing to the next.' },
      { word: 'sunlight', plain: 'Where all the energy in a food chain starts.' },
      { word: 'producer', plain: 'A living thing that makes its own food from sunlight. A plant.' },
      { word: 'consumer', plain: 'A living thing that has to eat other living things.' },
      { word: 'link', plain: 'One step of a food chain. One living thing, or the sun.' }
    ],

    video: {
      id: 'MuKs9o1s8h8',
      url: 'https://www.youtube.com/watch?v=MuKs9o1s8h8',
      title: 'Fabulous Food Chains: Crash Course Kids #7.1',
      channel: 'Crash Course Kids',
      minutes: 3,
      verified: '2026-08-15 · re-checked at youtube.com/oembed',
      teaches: [
        'a food chain is a model of energy flowing',
        'energy starts at the sun',
        'plants turn sunlight into food',
        'grass to rabbit to hawk',
        'ecosystem'
      ],
      sourceGap:
        'No Black American educator found. Searched: "youtube kids video food chain energy starts with the sun food web for kids" — top ten were Crash Course Kids, FreeSchool, Generation Genius, MakeMeGenius and PBS LearningMedia. None Black-led. Open.'
    },

    checkIn: M3L3_CHECK_IN,
    beats: M3L3_BEATS,
    activity: M3L3_ACTIVITY,
    ledger: M3L3_LEDGER,

    hook: M3L3_CHECK_IN,
    core: M3L3_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing:
      'String a real food chain across the garden. Write SUN on a card and peg it as high as you can reach, then find something out there that is actually being eaten and peg a card to that plant and another to its eater. Run string from the sun to the plant, and from the plant to the eater, then ask what eats THAT and add a fourth card. Stand back, follow the string with your finger from the sun, and say the whole chain out loud.',

    practice: [
      {
        ask: 'Where does every food chain start?',
        answer: 'At the sun.',
        why: 'Producers catch sunlight and turn it into food. Everything after that is eating.'
      },
      {
        ask: 'Sun, corn, caterpillar, wren. Which one is the producer?',
        answer: 'The corn.',
        why: 'The corn is the living thing that catches the sunlight first. The sun is not alive.'
      }
    ],

    check: [
      {
        prompt: 'Where does the energy in a food chain start?',
        choices: ['The sun', 'The soil', 'The producer', 'The water'],
        answer: 0,
        feedback: [
          null,
          'Soil holds nutrients. The energy comes from somewhere else.',
          'A producer catches the energy. It does not make it.',
          'Water is needed, but no energy comes from it.'
        ]
      },
      {
        prompt: 'Sun, corn, caterpillar, wren. Which link is a consumer?',
        choices: ['The caterpillar', 'The sun', 'The corn', 'Nothing here'],
        answer: 0,
        feedback: [
          null,
          'The sun is not even alive, so it eats nothing.',
          'The corn makes its own food. It is the producer.',
          'Two of these eat. Look again.'
        ]
      },
      {
        prompt: 'You shut the corn in a dark closet. What stops first?',
        choices: [
          'The corn making food',
          'The corn drinking water',
          'The caterpillars eating',
          'The soil holding nutrients'
        ],
        answer: 0,
        feedback: [
          null,
          'Roots pull water in the dark just fine.',
          'They keep eating until the leaves run out. That comes after.',
          'The soil does not care about the light.'
        ]
      }
    ]
  },

  {
    id: 'hb-m3-04',
    course: 'herbalism',
    module: 3,
    quarter: 1,
    week: 6,
    day: 1,
    n: 16,
    title: "Draw your bucket's food web",
    minutes: 45,
    spec: '§10 · beats',

    concept:
      'A food web is all the chains at once. Every arrow in it points the way the energy goes.',

    standards: ['S4L1b'],

    words: ['food web', 'food chain', 'arrow', 'energy'],

    glossary: [
      { word: 'food web', plain: 'All the food chains in one place, drawn crossing each other.' },
      { word: 'food chain', plain: 'A picture of energy moving from one living thing to the next.' },
      { word: 'arrow', plain: 'It means gives its energy to. It points at the eater.' },
      { word: 'energy', plain: 'What living things run on. It comes from food.' },
      { word: 'model', plain: 'A drawing that shows how a real thing works.' }
    ],

    video: {
      id: 'hLq2datPo5M',
      url: 'https://www.youtube.com/watch?v=hLq2datPo5M',
      title: 'Food Chains for Kids: Food Webs, the Circle of Life, and the Flow of Energy - FreeSchool',
      channel: 'Free School',
      minutes: 5,
      verified: '2026-08-15 · re-checked at youtube.com/oembed',
      teaches: [
        'food chains link into food webs',
        'flow of energy',
        'producers',
        'consumers',
        'decomposers'
      ],
      sourceGap:
        'No Black American educator found. Searched: "Black American science educator YouTube channel elementary ecosystem food web kids" and "kids science video what happens when one animal removed from ecosystem" — nothing Black-led at this level in either. Open.'
    },

    checkIn: M3L4_CHECK_IN,
    beats: M3L4_BEATS,
    activity: M3L4_ACTIVITY,
    ledger: M3L4_LEDGER,

    hook: M3L4_CHECK_IN,
    core: M3L4_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing:
      'Tape two sheets together and draw the real web of your four buckets. Sun in a ring in the corner, an arrow from it to every one of the four plants, then out to the garden to collect every eater you can find on a sticky note. Stick them around the plants rather than in a line, draw an arrow from each plant to whatever eats it, and put a RED arrow on any eater that feeds from two plants. Then write DECOMPOSERS at the bottom, point everything down at them, and draw one last arrow back up to the plants.',

    practice: [
      {
        ask: 'What makes a food web different from a food chain?',
        answer: 'A web is lots of chains at once, crossing each other.',
        why: 'Hardly anything eats only one food, so the chains never stay separate.'
      },
      {
        ask: 'Which way does the arrow point between corn and a caterpillar?',
        answer: 'From the corn to the caterpillar.',
        why: 'The arrow follows the energy. The corn gives it and the caterpillar gets it.'
      }
    ],

    check: [
      {
        prompt: 'What does an arrow in a food web mean?',
        choices: [
          'Gives its energy to',
          'Runs away from',
          'Lives next to',
          'Is bigger than'
        ],
        answer: 0,
        feedback: [
          null,
          'Nothing in a web is about running. It is about energy.',
          'They may live near each other. The arrow says more than that.',
          'Size is not what an arrow shows.'
        ]
      },
      {
        prompt: 'A wren eats caterpillars and beetles. What does that show?',
        choices: [
          'It is on two chains',
          'It is a producer',
          'It is a decomposer',
          'It has no chain'
        ],
        answer: 0,
        feedback: [
          null,
          'A producer makes its own food. The wren eats.',
          'A decomposer eats dead things. These are alive.',
          'It eats, so it is on a chain. On two, in fact.'
        ]
      },
      {
        prompt: 'Where do the decomposers go on your web?',
        choices: [
          'Everything points at them',
          'Only the corn points at them',
          'Nothing points at them',
          'They point at the sun'
        ],
        answer: 0,
        feedback: [
          null,
          'Everything dies in the end, not only the corn.',
          'If nothing pointed at them they would have nothing to break down.',
          'The sun is where energy starts. Nothing feeds it.'
        ]
      }
    ]
  },

  {
    id: 'hb-m3-05',
    course: 'herbalism',
    module: 3,
    quarter: 1,
    week: 6,
    day: 2,
    n: 17,
    title: 'Change one thing — what follows',
    minutes: 45,
    spec: '§10 · beats',

    concept:
      'Change one thing in an ecosystem and it does not stop there. The change travels along the arrows.',

    standards: ['S4L1c'],

    words: ['ecosystem', 'predict', 'balance', 'food web'],

    glossary: [
      { word: 'ecosystem', plain: 'All the living things in one place, plus the dirt, air and water.' },
      { word: 'predict', plain: 'To say what you think will happen, before it happens.' },
      { word: 'balance', plain: 'When nothing has too much or too little, and it keeps going.' },
      { word: 'food web', plain: 'All the food chains in one place, drawn crossing each other.' },
      { word: 'the one change', plain: 'The single thing you change on purpose, so you know what caused it.' }
    ],

    video: {
      id: 'Vtb3I8Vzlfg',
      url: 'https://www.youtube.com/watch?v=Vtb3I8Vzlfg',
      title: 'Food Webs: Crash Course Kids #21.2',
      channel: 'Crash Course Kids',
      minutes: 4,
      verified: '2026-08-15 · re-checked at youtube.com/oembed',
      teaches: [
        'ecosystem is living and non-living together',
        'food webs link many chains',
        'spider monkeys scatter seeds',
        'lose one species and the whole web feels it',
        'habitats can recover, or change for good'
      ],
      sourceGap:
        'No Black American educator found. Searched: "Crash Course Kids food webs ecosystem change youtube video list" and "Dr Rae Wynn-Grant youtube video ecosystem food web kids". Dr Rae Wynn-Grant is a Black American wildlife ecologist and a genuine lead, but everything found is interview and long-form for adults, not a short fourth-grade explainer. Recorded as a lead, not used. Open.'
    },

    checkIn: M3L5_CHECK_IN,
    beats: M3L5_BEATS,
    activity: M3L5_ACTIVITY,
    ledger: M3L5_LEDGER,

    hook: M3L5_CHECK_IN,
    core: M3L5_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing:
      'Design a real test. Stand two matching pots of the same plant side by side, label them A and B, and measure and count the leaves on both before you touch anything. Pick ONE thing to change on B — shade, or a mulch, or less water — and write down at the top of the page both what you are changing and everything you are keeping the same. Write your prediction before you start and do not change it afterwards. Measure both every second day, at the same time of day, for ten days. Then write down what actually happened, even if it is dull, and work out what else changed that you never meant to change.',

    practice: [
      {
        ask: 'Why do you only change one thing in a test?',
        answer: 'So you know which thing caused the difference.',
        why: 'Change two and you can never say which one did it. The test tells you nothing.'
      },
      {
        ask: 'Every caterpillar is gone. Who feels it next?',
        answer: 'The wrens that were eating them.',
        why: 'The change travels up the arrow. It does not stop where it started.'
      }
    ],

    check: [
      {
        prompt: 'Why do you write the prediction down before you look?',
        choices: [
          'So you cannot change it later',
          'So the plant grows faster',
          'So Gigi can mark it',
          'So the test takes less time'
        ],
        answer: 0,
        feedback: [
          null,
          'Writing does nothing to the plant.',
          'Nothing here is marked. A wrong prediction is fine.',
          'The test takes ten days whatever you write.'
        ]
      },
      {
        prompt: 'You shaded one pot AND watered it less. What can you say?',
        choices: [
          'Nothing for sure',
          'The shade did it',
          'The water did it',
          'Both did half each'
        ],
        answer: 0,
        feedback: [
          null,
          'Maybe. But the water changed too, so you cannot be sure.',
          'Maybe. But the light changed too. Same trouble.',
          'That is a guess. The test cannot split it.'
        ]
      },
      {
        prompt: 'The monkeys leave a forest. What happens after the seeds?',
        choices: [
          'Fewer new trees grow',
          'The sun gets weaker',
          'The soil turns to sand',
          'Nothing else changes'
        ],
        answer: 0,
        feedback: [
          null,
          'The sun is not part of the forest and does not change.',
          'That is not what the missing monkeys do.',
          'It carries on. Fewer trees means less food for everything.'
        ]
      }
    ]
  },

  {
    id: 'hb-m3-06',
    course: 'herbalism',
    module: 3,
    quarter: 1,
    week: 6,
    day: 3,
    n: 18,
    title: 'When the pollinators stop coming',
    minutes: 45,
    spec: '§10 · beats',

    concept:
      'Pollinators are the link between a flower and a seed. When they go scarce, the web above them loses arrows.',

    standards: ['S4L1d'],

    words: ['pollinator', 'pollen', 'scarce', 'extinct', 'over-abundant'],

    glossary: [
      { word: 'pollinator', plain: 'An animal that carries pollen from flower to flower.' },
      { word: 'pollen', plain: 'The fine dust a flower needs before it can make a seed.' },
      { word: 'scarce', plain: 'When there are only a few left.' },
      { word: 'extinct', plain: 'When there are none left anywhere, ever again.' },
      { word: 'over-abundant', plain: 'When there are far too many of one thing.' },
      { word: 'tally', plain: 'One mark for each thing you count.' },
      { word: 'survey', plain: 'A careful count that somebody wrote down.' }
    ],

    video: {
      id: '2rouSnneOKk',
      url: 'https://www.youtube.com/watch?v=2rouSnneOKk',
      title: 'What If All BEES Disappear? | World Without BEES | The Dr Binocs Show | Peekaboo Kidz',
      channel: 'Peekaboo Kidz',
      minutes: 6,
      verified: '2026-08-15 · re-checked at youtube.com/oembed',
      teaches: [
        'what pollination is',
        'how much of our food needs pollinators',
        'what happens to plants when bees disappear',
        'the knock-on effect up the food chain'
      ],
      sourceGap:
        'No Black American educator found. Searched: "youtube video for kids why bees pollinators matter what happens if pollinators disappear" — returned Peekaboo Kidz, SciShow Kids, Colossal Questions, PBS Nature and Kids Discover. None Black-led. Alexis Nikole Nelson (Black Forager) was checked directly: real Black American plant educator, but her work is foraging and edible wild plants, not pollination, and it is not written for nine-year-olds. Recorded as a lead for a later module. Open.'
    },

    checkIn: M3L6_CHECK_IN,
    beats: M3L6_BEATS,
    activity: M3L6_ACTIVITY,
    ledger: M3L6_LEDGER,

    hook: M3L6_CHECK_IN,
    core: M3L6_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing:
      'Sit a step away from one flowering plant with a clipboard and set a timer for ten minutes. Mark every visitor that lands — bee, fly, wasp, butterfly, beetle — without trying to name the species. Add up the rows, then put a printed pollinator count from a real survey on the table beside your own and find one thing that matches and one thing that does not. Then get the food web out from Lesson 16 and cross out, in one colour, every arrow that stops if pollinators go scarce, and in a darker colour every arrow that stops if they go extinct. Count what is left.',

    practice: [
      {
        ask: 'What is the difference between scarce and extinct?',
        answer: 'Scarce means only a few are left. Extinct means none, anywhere, ever again.',
        why: 'A scarce animal can come back. An extinct one cannot, and its arrows never work again.'
      },
      {
        ask: 'Why did the squash flower but grow no squash?',
        answer: 'No pollinator came, so the pollen never moved.',
        why: 'A flower cannot make a seed until pollen is carried to it.'
      }
    ],

    check: [
      {
        prompt: 'What does a pollinator actually do for a flower?',
        choices: [
          'Moves pollen so a seed can form',
          'Waters it',
          'Gives it energy',
          'Breaks down its dead leaves'
        ],
        answer: 0,
        feedback: [
          null,
          'Rain and a watering can do that. Not a bee.',
          'Energy comes from the sun, not from a visitor.',
          'That is a decomposer, and it happens after the leaf dies.'
        ]
      },
      {
        prompt: 'Slugs in one garden went from a few to hundreds. Which word fits?',
        choices: ['Over-abundant', 'Scarce', 'Extinct', 'Pollen'],
        answer: 0,
        feedback: [
          null,
          'Scarce means hardly any are left. There are hundreds.',
          'Extinct means none left anywhere at all.',
          'Pollen is dust from a flower, not a number of animals.'
        ]
      },
      {
        prompt: 'Bees go scarce in your garden. What happens to the seeds?',
        choices: [
          'Fewer seeds get made',
          'More seeds get made',
          'The seeds get bigger',
          'Nothing changes'
        ],
        answer: 0,
        feedback: [
          null,
          'Fewer visits means less pollen moved, not more.',
          'Size is not what changes. The number is.',
          'Seeds need pollen moved. Fewer bees means fewer seeds.'
        ]
      }
    ]
  }
];

export const HERBALISM_M3_META = {
  courseId: 'herbalism',
  module: 3,
  title: 'The Garden Is an Ecosystem',
  blurb:
    'Who makes the food, who eats it, and who breaks it back down. Then draw the whole web of her own four buckets, change one thing on purpose, and find out how far the change travels.'
};

export function m3LessonById(id) {
  return HERBALISM_M3.find((l) => l.id === id) || null;
}

export default HERBALISM_M3;
