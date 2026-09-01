// ---------------------------------------------------------------------------
// HERBALISM & BOTANY — FIVE NEW LESSONS ACROSS MODULES 1 AND 2, QUARTER 1.
//
// Written against /home/claude/pp/src/data/lessons/herbalismM1.js, which is the
// reference implementation of the §10 beats standard. hb-m1-01 in that file is
// Lesson 1 of the module this file extends, so these are written to sit beside
// it, not near it.
//
//   HERBALISM_M1_NEW
//     hb-m1-02  W1 D2  n=2   The circle — seed to seed        off-grade S2L1
//     hb-m1-04  W2 D1  n=4   Annuals and perennials           off-grade S2L1
//     hb-m1-05  W2 D2  n=5   What a plant needs               off-grade S2L1
//
//   HERBALISM_M2_NEW
//     hb-m2-03  W3 D3  n=9   The Root Race                    off-grade S3L1
//     hb-m2-06  W4 D3  n=12  Soil is alive                    off-grade S3L1
//
// Lessons 1, 3 and 6 of Module 1 and lessons 1, 2, 4 and 5 of Module 2 are
// written or rebuilt elsewhere. Nothing here assumes their internals — only
// hb-m1-01, which is read directly and called back to by id.
//
// ---- STANDARDS: EMPTY ON PURPOSE, ON ALL FIVE ----
//
// Every `standards` array here is `[]`. That is a statement, not an oversight,
// and it is the same statement hb-m1-01 makes. Life cycles are S2L1 (SECOND
// grade) and roots/soil are S3L1 (THIRD grade). Georgia's fourth-grade botany
// elements — the whole of S4L1 — arrive in Module 3. These five are taught
// anyway because a botany course without a life cycle or a root in it is not a
// botany course, and each carries `offGrade` so curriculumPlan.js
// TAUGHT_OFF_GRADE records what it actually is.
//
// ---- THE VIDEOS, AND EXACTLY HOW FAR THE VERIFICATION GOES ----
//
// Four of the five carry a video. Every id below was fetched from
// https://noembed.com/embed?url=...  on 2026-08-14, and the `title` and
// `channel` strings are copied character for character out of that response.
// Nothing here was taken from a search result.
//
//   hb-m1-02   2SBVz4MgeIE   The Pique Lab
//   hb-m1-04   NONE — see the judgement call below
//   hb-m1-05   TxMdMTzf2YU   SciShow Kids
//   hb-m2-03   aNmZOJHuf3k   Hungry SciANNtist
//   hb-m2-06   Q-J2FErZHuA   SciShow Kids
//
// **THE `minutes` FIELD ON EACH VIDEO IS AN ESTIMATE, NOT A VERIFIED NUMBER.**
// The oEmbed endpoint returns title, author and thumbnail — it does not return
// duration, and youtube.com itself is not reachable from the machine these were
// written on (the egress proxy refuses the CONNECT and YouTube 429s the
// fetcher). So the ids, titles and channels are hard facts and the durations
// are the usual run time for those channels. Anyone with a browser should
// correct them in thirty seconds; nothing else in the video block needs it.
//
// ---- JUDGEMENT CALL 1 · hb-m1-04 HAS NO VIDEO, DELIBERATELY ----
//
// Annuals and perennials has `video: null`. Four candidates were found AND
// VERIFIED through oEmbed, and all four were rejected for the same reason:
// they are adult gardening channels, not children's science.
//
//   QcS4LCfQGCQ  "What is the Difference Between Annual and Perennial Plants"
//                — iCultivate
//   BdYkpJWo194  "Annuals vs. Perennials: Understanding the Difference for
//                Your Garden" — Kellogg Garden
//   -jQsd1fNFA8  "The Difference Between Annuals and Perennials"
//                — HortTube with Jim Putnam
//   Z_QqwySxpTc  "Plant Types Explained: Annuals, biennial, perennials, shrubs
//                and trees guide" — Garden Ninja: Lee Burkhill
//
// The ids are recorded so nobody re-runs this search from zero. They are real
// videos; they are simply garden-centre talk aimed at homeowners choosing
// bedding plants. §10's rule is to pick the video first and write the lesson to
// what it teaches — none of these four teaches a nine-year-old anything, so
// writing a lesson to one of them would mean writing a lesson to nothing. The
// field is null and the report says so.
//
// ---- JUDGEMENT CALL 2 · THE CIRCLE IS NEVER DRAWN AS A ROW ----
//
// hb-m1-02 is the life cycle, and the binding rule on it is that it is a RING.
// A left-to-right row teaches a child the cycle has an end, and a cycle with an
// end makes pollination incomprehensible when Module 6 arrives and asks why a
// flower bothers.
//
// So: the activity builds a physical ring on a paper plate, the printable
// prints a ring with the arrows already drawn and NO START MARKED, and Beat 2
// exists for no other reason than to make her say out loud why a line is wrong.
// Its Apply-It hands her a straight-line drawing and asks her to find the fault.
//
// The video is an exception that has to be handled out loud rather than hidden.
// A "seed to fruit" animation runs its stages in an order, as any animation
// must. Gigi's line before the video is written into the check-in: it goes
// around, and the last picture joins the first.
//
// ---- JUDGEMENT CALL 3 · GARLIC IS THE INTERESTING ONE ----
//
// hb-m1-04 sorts her four real containers, and the honest answer is not two
// tidy piles:
//
//   corn      annual. Whole ring in one year, then it dies. Only seed is left.
//   ginger    perennial. Comes back from the rhizome under the dirt.
//   turmeric  perennial. Same — but neither of these two takes a hard frost,
//             so the POT comes in. That is a gardener's job, not the plant's.
//   garlic    perennial that gets grown like an annual, because harvesting it
//             means digging up the exact bulb that would have come back.
//
// The lesson teaches that fourth one rather than smoothing it away. "It depends
// what you do to it" is a real botany answer and she is old enough for it.
//
// ---- JUDGEMENT CALL 4 · THE ROOT RACE HAS TWO WINNERS ----
//
// hb-m2-03 is named in the master plan as a signature activity. The chart is
// built so that the deepest root and the most roots are DIFFERENT CUPS. If one
// cup won everything the activity would teach "radish is best". Two champions
// teach that shape is a strategy, which is the actual idea.
//
// ---- READING LEVEL AND SAFETY ----
//
// ~2.5, same as the reference. Sentences under about eleven words. The subject
// words — germination, pollination, rhizome, perennial, fibrous, hydroponics,
// humus, decomposer — are exempt from the long-word count for the same reason
// photosynthesis is: there is no shorter word for the thing.
//
// No dosing, anywhere. Ginger, turmeric and garlic are handled in three of
// these five lessons and not one of them says what any of it is for. They are
// plants she grows. Every activity that puts a plant in her hands carries the
// taste rule in `safety`, and hb-m1-05 and hb-m2-06 both repeat it because both
// involve jars of water and handfuls of soil.
// ---------------------------------------------------------------------------

/* ===========================================================================
 * MODULE 1 · LESSON 2 — hb-m1-02 · THE CIRCLE — SEED TO SEED
 * ======================================================================== */

/**
 * STEP 1 · THE CHECK-IN · 5 minutes. Aliased below as `hook`.
 *
 * The hook is the Day-5 result of the four-bag experiment she set up in
 * hb-m1-01 — Bag 1 wet on the window, Bag 2 dry on the window, Bag 3 wet in a
 * dark closet, Bag 4 wet in the fridge. She wrote a prediction down on Day 1
 * and has not been allowed to change it. Today she reads it back.
 *
 * Bag 3 is the one worth stopping on. It grew in the dark, which is the wrong
 * answer to "plants need light" and the right answer to "a seed carries its own
 * lunch" — and it is pale, which is the first crack in that. That crack is
 * hb-m1-05's whole lesson, three days from now.
 */
const M1L2_CHECK_IN = {
  title: 'Day 5. Go and get your four bags.',
  text: 'Bag 1 has a root and a small shoot. Bag 3 sat in the dark and grew too. It looks pale and thin. Bag 2 and Bag 4 have done nothing at all.',
  question: 'Your Bag 1 bean is not a seed any more. So what is it turning into?'
};

/**
 * STEP 2 · THE SYSTEM CONCEPT · 12 minutes, as TWO BEATS.
 *
 * Beat 1 walks the stages. Beat 2 closes the ring, and it is the more important
 * of the two. Its Apply-It is the only question in this module that hands her a
 * WRONG drawing and asks what is wrong with it, because the mistake it contains
 * is the exact mistake the lesson exists to prevent.
 *
 * The video sits between the beats. It runs the stages in an order, as an
 * animation has to, so Gigi says the closing line before pressing play: watch
 * where the last picture goes.
 */
const M1L2_BEATS = [
  {
    n: 1,
    label: 'The stages of a life',
    hook: 'Your bean in Bag 1 is already three stages in, and it is five days old.',
    teachingText:
      'A seed wakes up. It grows a root and a shoot. Now it is a seedling. It grows bigger and becomes an adult plant. Then it makes a flower.',
    example:
      'Your garlic is an adult plant right now. Your corn is a seedling. Your bean in the bag is younger than both.',
    applyIt: {
      prompt: 'Your bean has a root, a shoot and two small leaves. What stage is that?',
      choices: ['Still a seed', 'A seedling', 'An adult plant', 'A fruit'],
      answer: 1,
      feedback: [
        'The coat has already cracked open. It is past that.',
        null,
        'An adult plant is big enough to make a flower.',
        'Fruit comes long after the flower.'
      ],
      why: 'A seedling is a young plant that has just come out of its seed.'
    }
  },
  {
    n: 2,
    label: 'Why it is a ring and not a line',
    hook: 'A line has an end. A plant\'s life does not have one.',
    teachingText:
      'The flower gets pollinated. Then it makes a fruit. Seeds are packed inside that fruit. Those seeds drop and start the whole thing again.',
    example:
      'Pull one kernel off a dried corn cob. That kernel is a seed. Plant it and you are back at the start of the ring.',
    applyIt: {
      prompt: 'Gigi draws the life cycle in a straight line. Seed at the left, fruit at the right. What is wrong with her drawing?',
      choices: [
        'Nothing. That is how it works',
        'The fruit is full of seeds, and the line gives them nowhere to go',
        'The seed belongs on the right',
        'Plants do not make fruit'
      ],
      answer: 1,
      feedback: [
        'Then the plant would stop forever. It does not.',
        null,
        'Which end it starts at is not the problem. Having an end is.',
        'Your corn cob is a fruit full of seeds.'
      ],
      why: 'The last stage makes the first stage. That is what makes it a ring.'
    }
  }
];

/**
 * STEP 3 · THE ACTIVITY · 20 minutes. Away from the screen.
 *
 * She builds the ring with her hands before she ever sees it printed. A paper
 * plate is used on purpose: it has no left and no right, so there is no place
 * to put a beginning. The last card must be taped next to the first one, and
 * the moment she notices there is no space left over is the moment the lesson
 * has landed.
 */
const M1L2_ACTIVITY = {
  title: 'Build the ring on a paper plate',
  prep: 'One paper plate, and six small cards or sticky notes. Have the four bean bags on the table.',
  needs: [
    'a paper plate',
    '6 sticky notes or small cards',
    'a marker',
    'tape',
    'your four bean bags',
    'one dried corn cob or a handful of corn seed'
  ],
  steps: [
    'Draw one card for each stage. Seed. Seedling. Adult plant. Flower. Fruit. Seeds again.',
    'Draw a picture on each card. No words needed if you do not want them.',
    'Lay them around the rim of the plate, like numbers on a clock.',
    'Now tape the last card down. Look where it lands.',
    'It lands right next to the first one. There is no gap.',
    'Draw arrows on the plate going one way round.',
    'Put a small dot on the stage your Bag 1 bean is at today.',
    'Go outside. Find what stage your garlic and your corn are at.',
    'Move the dot for each one and say the stage out loud.',
    'Keep checking the bags once a day. The dot moves as they grow.'
  ],
  safety:
    'The soaked beans are still not a snack. Never taste any plant without a grown-up, every single time.',
  grownUpAsks: [
    'Read me your Day 1 guess. Were you right about all four bags?',
    'Bag 3 was in the dark and it still grew. How?',
    'Bag 3 looks pale. What do you think it is missing?',
    'Which card should come first? Why that one?',
    'Where does the last card go? Look at the space left.',
    'Is there any card that ends the plate? Why not?',
    'What has to happen to the flower before there is fruit?',
    'What is inside a fruit? Break the corn cob apart and check.',
    'Point at the stage your bean is at today.',
    'Point at the stage your garlic is at today.',
    'If I cut the ring here, what stops happening?'
  ]
};

/** STEP 4 · THE LEDGER ENTRY · 8 minutes. She writes it. Nothing is corrected. */
const M1L2_LEDGER = {
  sheet: 'M1L2-the-circle-PRINTABLE.pdf',
  tasks: [
    'The sheet prints a ring with the arrows already on it. Fill in the six stages.',
    'No stage is marked as the start. Do not add one.',
    'Mark today\'s stage for Bag 1, for your garlic and for your corn.',
    'Write one sentence: what makes it a ring instead of a line?',
    'Write one question about the life cycle for Gigi. You must know the answer.'
  ],
  game: {
    title: 'Spin the Ring',
    cards: ['SEED', 'SEEDLING', 'ADULT PLANT', 'FLOWER', 'FRUIT', 'LIFE CYCLE'],
    rounds: [
      'Gigi points at any stage. You say the one that comes next.',
      'Now go backwards. She points, you say the one before.',
      'She starts at fruit and keeps going. Do not let her stop at the end.',
      'Stump Gigi. Write her one question you already know the answer to.'
    ],
    ifSheIsStuck:
      'Put her finger on the plate and walk it round. The answer is the next card along, and it is right there under her hand.'
  },
  note: 'Nothing here is graded. Nothing is corrected. Petals are for doing it.'
};

/* ===========================================================================
 * MODULE 1 · LESSON 4 — hb-m1-04 · ANNUALS AND PERENNIALS
 * ======================================================================== */

/**
 * STEP 1 · THE CHECK-IN · 5 minutes.
 *
 * The question is a real one about her own containers and she cannot answer it
 * from the ring alone, which is the point: the ring says every plant goes round,
 * but it does not say how many times the SAME plant goes round.
 */
const M1L4_CHECK_IN = {
  title: 'Which pots will still be there in May?',
  text: 'You have four containers. Garlic, turmeric, ginger and corn. Winter is coming and every one of them will look dead.',
  question: 'In May, which ones come up on their own, and which ones do you have to plant again?'
};

/**
 * STEP 2 · TWO BEATS.
 *
 * Beat 1 is the clean split, taught off her own corn and her own ginger.
 * Beat 2 is the honest mess, and it is the reason this lesson is worth a day.
 * Garlic is a perennial that gets grown as an annual because we eat the exact
 * part that would have come back. Ginger and turmeric are perennials that
 * cannot take a Georgia frost outdoors, so the pot comes in.
 *
 * "It depends what you do to it" is a real botany answer. She is nine and she
 * has the containers on the porch, so she can hold both halves of it.
 */
const M1L4_BEATS = [
  {
    n: 1,
    label: 'One year, or many years',
    hook: 'Some plants finish their whole ring in one summer. Others take fifty years.',
    teachingText:
      'An annual goes all the way round once and then dies. It leaves only seed. A perennial keeps its roots alive under the dirt and comes back.',
    example:
      'Your corn is an annual. It dries up and that is the end of it. Your ginger is a perennial. The rhizome under the soil is still alive.',
    applyIt: {
      prompt: 'In January your corn bucket and your ginger pot both look empty. In May one comes up by itself. Which one?',
      choices: ['The corn', 'The ginger', 'Both of them', 'Neither of them'],
      answer: 1,
      feedback: [
        'Corn leaves seed, not roots. Seed has to be planted.',
        null,
        'Only one of them kept something alive down there.',
        'Something is alive under that soil. Dig gently and see.'
      ],
      why: 'The ginger rhizome is a living root that waits underground all winter.'
    }
  },
  {
    n: 2,
    label: 'The tricky ones',
    hook: 'Garlic is a perennial. Almost nobody grows it like one.',
    teachingText:
      'Garlic could come back every year from its bulb. But we dig the whole bulb up to eat it. So we plant new cloves each fall.',
    example:
      'Ginger and turmeric are tricky in a different way. They come back fine, but a hard frost kills them. So their pots come indoors.',
    applyIt: {
      prompt: 'You dig up your whole garlic bulb in June. Will garlic come up in that spot next spring?',
      choices: [
        'Yes. Garlic is a perennial',
        'No. You dug up the part that would have come back',
        'Yes, it grows back from the old leaves',
        'No. Garlic never comes back anywhere'
      ],
      answer: 1,
      feedback: [
        'It is a perennial. But it is not still in the ground.',
        null,
        'The leaves are cut and gone. The bulb was the living part.',
        'Leave a bulb in the ground and it will. That is the whole point.'
      ],
      why: 'A perennial only comes back if you leave the living part in the dirt.'
    }
  }
];

/**
 * STEP 3 · THE ACTIVITY · 20 minutes.
 *
 * A sort with a real consequence at the end of it. The last three steps are a
 * winter plan for her four actual containers, with the first frost date looked
 * up rather than guessed. If she does it, two of her pots survive the winter
 * and she made that happen.
 */
const M1L4_ACTIVITY = {
  title: 'The Come-Back Sort, and a winter plan',
  prep: 'Print or write four labels: GARLIC, TURMERIC, GINGER, CORN. Have a pen and something to write on outside.',
  needs: [
    '4 plant labels or strips of card',
    'a marker that does not wash off',
    'two sheets of paper, headed COMES BACK and PLANT AGAIN',
    'your four containers',
    'a calendar'
  ],
  steps: [
    'Put the two headed sheets on the table. COMES BACK. PLANT AGAIN.',
    'Take the four labels one at a time. Say which sheet it goes on, and why.',
    'Now the tricky part. Garlic goes on both. Say out loud why.',
    'Go outside. Find five more plants in the yard.',
    'For each one ask: was this here last year? Sort it.',
    'Write A for annual or P for perennial on each of your four labels.',
    'Push the label into the right container so it stays there.',
    'With Gigi, look up the first frost date where you live.',
    'Write that date on the calendar. Circle it.',
    'Write which two pots have to come indoors before that date.'
  ],
  safety:
    'You are handling garlic, ginger and turmeric today. You are growing them, not tasting them. Never taste a plant without a grown-up.',
  grownUpAsks: [
    'Which of our four do you think comes back? Say it before we sort.',
    'What is left behind when an annual dies?',
    'What is left behind when a perennial dies back?',
    'Where is the living part of the ginger hiding right now?',
    'Garlic went on both sheets. Explain that to me.',
    'If we left one garlic bulb in the ground, what happens in spring?',
    'The grass by the porch. Was it here last year? So what is it?',
    'Which two pots have to come inside? What kills them if they do not?',
    'Is a plant that dies in a frost a bad plant?',
    'How many times does an annual go round the ring?',
    'How many times does a perennial go round it?'
  ]
};

/** STEP 4 · THE LEDGER ENTRY · 8 minutes. */
const M1L4_LEDGER = {
  sheet: 'M1L4-annuals-and-perennials-PRINTABLE.pdf',
  tasks: [
    'Fill in the two-column sort. Four containers, plus the five you found outside.',
    'Garlic gets a line of its own at the bottom. Write why it is odd.',
    'Write your first frost date in the box and circle it.',
    'Winter plan: one row per container. Comes in, stays out, or replant.',
    'Write one question about coming back for Gigi. You must know the answer.'
  ],
  game: {
    title: 'Come Back or Not',
    cards: ['ANNUAL', 'PERENNIAL', 'BULB', 'RHIZOME', 'DIE BACK'],
    rounds: [
      'Gigi names a plant. You say annual or perennial. Fast.',
      'She says a meaning. You say the word. Beat the clock.',
      'One round of hard ones: garlic, a tomato, an oak tree, grass.',
      'Stump Gigi. Write her one question you already know the answer to.'
    ],
    ifSheIsStuck:
      'Ask her one question instead of giving the word: was it there last year? The answer she gives is the answer she needed.'
  },
  note: 'Nothing here is graded. Nothing is corrected. Petals are for doing it.'
};

/* ===========================================================================
 * MODULE 1 · LESSON 5 — hb-m1-05 · WHAT A PLANT NEEDS
 * ======================================================================== */

/**
 * STEP 1 · THE CHECK-IN · 5 minutes.
 *
 * Written to land on the video, which is why it is about dirt not being on the
 * list. She has already grown four beans with no dirt at all, so she has the
 * evidence in her hand before the claim is made.
 */
const M1L5_CHECK_IN = {
  title: 'Your beans never had any dirt',
  text: 'Bag 1 grew a root and a shoot in a wet paper towel. There was no soil in that bag. Not one crumb.',
  question: 'So is dirt on the list of things a plant needs, or is it not?'
};

/**
 * STEP 2 · TWO BEATS, WITH THE VIDEO BETWEEN THEM.
 *
 * The video is SciShow Kids growing plants with no soil at all. It teaches by
 * subtraction: take the soil away and you have to hand the plant the things
 * soil was quietly doing. That is exactly the argument, so Beat 1 makes the
 * list, the video takes the soil off it, and Beat 2 says what soil was for.
 *
 * Beat 1's Apply-It is the pale bean from Bag 3, which has been sitting there
 * unexplained since Lesson 2. It gets explained here.
 */
const M1L5_BEATS = [
  {
    n: 1,
    label: 'The list is shorter than you think',
    hook: 'You can grow a whole head of lettuce in nothing but water.',
    teachingText:
      'A plant needs light, water, air and nutrients. It also needs room, and something to hold it up. Dirt is not on that list.',
    example:
      'Your Bag 1 bean had water, air, warmth and light. It had its own packed lunch for food. It grew fine with no dirt.',
    applyIt: {
      prompt: 'Your bean in the dark closet grew, then went pale and floppy. What ran out?',
      choices: [
        'Water',
        'Its packed lunch, and it had no light to make more food',
        'Air',
        'Room in the bag'
      ],
      answer: 1,
      feedback: [
        'The towel was still wet. Go and feel it.',
        null,
        'The bag was not sealed tight. Air got in.',
        'It is a small plant in a big bag.'
      ],
      why: 'The endosperm only lasts so long. After that the leaves need light to make food.'
    }
  },
  {
    n: 2,
    label: 'So what is soil actually for?',
    hook: 'Farmers grow tomatoes in buildings with no soil in them anywhere.',
    teachingText:
      'Soil does three jobs at once. It holds water. It holds the plant up. It holds nutrients the roots can drink.',
    example:
      'Take the soil away and you must do all three yourself. That is hydroponics. Water in a jar, nutrients added, and something to prop the plant up.',
    applyIt: {
      prompt: 'You grow lettuce in a jar of plain water with no soil. It grows, then stops and yellows. What is missing?',
      choices: [
        'Light',
        'Nutrients in the water',
        'Air',
        'Nothing. Lettuce cannot grow in water'
      ],
      answer: 1,
      feedback: [
        'It is on the windowsill. Light is not the problem.',
        null,
        'There is air on the leaves and in the water.',
        'It grew for weeks. It can.'
      ],
      why: 'Plain water is not food. Soil normally holds the nutrients. In a jar you add them.'
    }
  }
];

/**
 * STEP 3 · THE ACTIVITY · 20 minutes.
 *
 * Two things running at once, and they answer different questions. The jar is
 * "can it grow with no soil". The pair of matched seedlings is "what happens
 * when you take exactly one thing away", which is the same design as her four
 * bags and is the beginning of controlled testing. She writes the prediction
 * down before she looks. That habit is the whole course.
 */
const M1L5_ACTIVITY = {
  title: 'Grow one in water. Then take one thing away.',
  prep: 'Save the root end of a green onion or a celery heart. Have two small seedlings the same size, in the same size pot.',
  needs: [
    'a clear jar',
    'the root end of a green onion, or a celery heart',
    'water',
    '2 seedlings the same size, in matching pots',
    'a ruler',
    'tape and a marker'
  ],
  steps: [
    'Put the onion root end in the jar. Add water up to the roots only.',
    'Stand it on the windowsill. Change the water every two days.',
    'Measure it with the ruler today. Write the number down.',
    'Now the second test. Put your two seedlings side by side.',
    'They get the same pot, the same water, the same day.',
    'Change ONE thing. One stays on the window. One goes in a closet.',
    'Write your guess down now, before anything happens.',
    'Measure both every three days. Write both numbers.',
    'Also write the colour. Pale is a number too, in its own way.',
    'After two weeks, bring the closet one out and put it back in the light.'
  ],
  safety:
    'Do not drink the jar water. Wash your hands after handling roots. Never taste a plant without a grown-up.',
  grownUpAsks: [
    'Say the list back to me. What does a plant need?',
    'Is dirt on the list? Prove it with your bean bags.',
    'What three jobs is soil doing for a plant?',
    'In the jar, who is doing those three jobs now?',
    'Why are we changing only ONE thing between the two pots?',
    'What would go wrong if we changed the water AND the light?',
    'Write your guess before you look. What do you think happens?',
    'Which one do you think grows taller? Which one stays greener?',
    'That one is pale. Where did its green go?',
    'It grew tall AND pale. Why would it stretch like that?',
    'If we put it back in the light now, do you think it recovers?'
  ]
};

/** STEP 4 · THE LEDGER ENTRY · 8 minutes. */
const M1L5_LEDGER = {
  sheet: 'M1L5-what-a-plant-needs-PRINTABLE.pdf',
  tasks: [
    'Fill the needs list. One box per thing a plant needs.',
    'Cross out anything on the sheet that is NOT needed. There is a trap on it.',
    'Jar log: date, height in cm, and what you noticed.',
    'Two-pot log: your guess at the top, then both heights every three days.',
    'Write one question about what plants need for Gigi. You must know the answer.'
  ],
  game: {
    title: 'Take It Away',
    cards: ['LIGHT', 'WATER', 'AIR', 'NUTRIENTS', 'HYDROPONICS'],
    rounds: [
      'Gigi takes one card away. You say what happens to the plant.',
      'She says a meaning. You say the word. Beat the clock.',
      'Hard round: she takes the SOIL away. You say what still has to be given.',
      'Stump Gigi. Write her one question you already know the answer to.'
    ],
    ifSheIsStuck:
      'Point at the jar on the windowsill. There is no soil in it and it is growing. The answer is on the sill.'
  },
  note: 'Nothing here is graded. Nothing is corrected. Petals are for doing it.'
};

/* ===========================================================================
 * MODULE 2 · LESSON 3 — hb-m2-03 · THE ROOT RACE
 * ======================================================================== */

/**
 * STEP 1 · THE CHECK-IN · 5 minutes.
 *
 * Two weeds, pulled for real, before any teaching happens. One comes up whole
 * with a fat pale root. One snaps and leaves a mat behind. She has felt the
 * difference in her hands before she has a name for either.
 */
const M2L3_CHECK_IN = {
  title: 'Pull two weeds and look at what came up',
  text: 'One came up whole. It has one fat root going straight down. The other snapped off and left a mat of thin roots in the dirt.',
  question: 'Same yard, same rain. So why are those two roots not the same shape?'
};

/**
 * STEP 2 · TWO BEATS.
 *
 * Beat 1 names the two shapes. Beat 2 is the one that matters: the shape is a
 * STRATEGY, not a decoration. Deep goes for water far down and stores food up
 * for later. Wide grabs a light rain the moment it lands and grips the topsoil.
 * Neither one is the better root, which is why the Root Race has two winners.
 */
const M2L3_BEATS = [
  {
    n: 1,
    label: 'Two shapes of root',
    hook: 'A dandelion root can go down further than you are tall.',
    teachingText:
      'A taproot is one thick root going straight down. Small roots branch off it. Fibrous roots are many thin roots, spread out wide.',
    example:
      'A carrot is a taproot. You eat the root itself. Your corn has fibrous roots, spread out like a mat under the bucket.',
    applyIt: {
      prompt: 'You pull two weeds. One comes up whole with a fat pale root. One snaps and leaves a mat behind. Which had the taproot?',
      choices: [
        'The one that snapped',
        'The one that came up whole',
        'Both of them',
        'Neither. Weeds have no roots'
      ],
      answer: 1,
      feedback: [
        'A mat of thin roots grips in lots of places. That is fibrous.',
        null,
        'They came out two different ways. That is the clue.',
        'Every plant has roots. You are holding them.'
      ],
      why: 'One thick root pulls up in one piece. A mat of thin ones tears.'
    }
  },
  {
    n: 2,
    label: 'The shape is a plan',
    hook: 'Grass can drink a rain shower that never reaches a dandelion.',
    teachingText:
      'A taproot digs deep. It reaches water far down, and it stores food. Fibrous roots stay near the top. They catch rain fast and hold the soil.',
    example:
      'That is why we eat carrots, beets and turnips. They are all taproots packed with stored food.',
    applyIt: {
      prompt: 'No rain for two weeks. Then a small shower wets only the top inch. Which drinks it first, the grass or the dandelion?',
      choices: [
        'The dandelion, because its root is bigger',
        'The grass, because its roots are already up there',
        'Neither. One inch is not enough',
        'Both at exactly the same speed'
      ],
      answer: 1,
      feedback: [
        'Its root is deep. The water never got down to most of it.',
        null,
        'One inch of wet soil is plenty for shallow roots.',
        'Their roots are at different depths. Depth decides it.'
      ],
      why: 'Fibrous roots sit where a light rain lands. Deep roots wait for water that soaks down.'
    }
  }
];

/**
 * STEP 3 · THE ACTIVITY · 20 minutes. THE ROOT RACE.
 *
 * Named as a signature activity in the master plan. Clear cups, paper rolled
 * against the wall so the roots grow where she can see them, four kinds of
 * seed, a ruler, and a chart she keeps for ten days.
 *
 * The seed list is chosen so that the answer is not one winner. Radish drives a
 * taproot straight down and will win DEEPEST. Corn and grass throw out many
 * roots and will win MOST. If a single cup won both, the chart would teach
 * "radish is best" instead of "shape is a strategy", which is the actual idea.
 * The chart therefore has two winner boxes and they are not the same cup.
 */
const M2L3_ACTIVITY = {
  title: 'The Root Race',
  prep: 'Four clear plastic cups. Roll a paper towel inside each one, against the wall, so seeds sit between paper and plastic.',
  needs: [
    '4 clear plastic cups',
    '4 paper towels',
    'radish seed, corn, bean and grass seed',
    'water',
    'a ruler with cm on it',
    'tape and a marker'
  ],
  steps: [
    'Roll a paper towel inside each cup, pressed to the wall.',
    'Stuff the middle with more crumpled towel so the roll stays put.',
    'Slide 2 seeds down between the paper and the plastic. One kind per cup.',
    'Label each cup. Radish. Corn. Bean. Grass.',
    'Water until the paper is wet all through. Keep it wet, never flooded.',
    'Day 2: mark where the longest root ends with a dot and the date.',
    'Measure that root in cm. Write the number on your chart.',
    'Do that every two days for ten days. Same time of day.',
    'Also count how many roots each one has. That is a second number.',
    'Day 10: sort the cups two ways. Deepest root, then most roots.',
    'Write down which cup won each one. They will not be the same cup.'
  ],
  safety:
    'Seeds for planting are not food. Some are treated. Wash your hands after. Never taste a plant without a grown-up.',
  grownUpAsks: [
    'Before we start. Which seed do you think goes deepest?',
    'Write that guess down. We check it on Day 10.',
    'Why did we put the seeds against the plastic and not in the middle?',
    'Which way is every root heading? Does that surprise you?',
    'Look at the radish. One big root or many? So what is it called?',
    'Look at the grass. Now what is that shape called?',
    'Which cup is winning on depth today? Which is winning on number?',
    'Two different cups are winning. What does that tell you?',
    'A carrot is a taproot we eat. What is stored in there?',
    'Which shape would you want in a dry summer? Say why.',
    'Which shape would hold a hillside together in the rain? Say why.'
  ]
};

/** STEP 4 · THE LEDGER ENTRY · 8 minutes. */
const M2L3_LEDGER = {
  sheet: 'M2L3-the-root-race-PRINTABLE.pdf',
  tasks: [
    'Write your Day 0 guess in the box at the top. Do not change it later.',
    'Chart: four cups down the side, days across the top. Length in cm.',
    'Second chart, same shape, for how many roots you counted.',
    'Draw each root shape in its box. Label it taproot or fibrous.',
    'Two winner boxes at the bottom. Deepest root, and most roots.',
    'Write one question about roots for Gigi. You must know the answer.'
  ],
  game: {
    title: 'Root Shape Snap',
    cards: ['TAPROOT', 'FIBROUS ROOTS', 'ROOT HAIRS', 'ANCHOR', 'ABSORB'],
    rounds: [
      'Gigi names a plant. You say taproot or fibrous. Fast.',
      'She says a meaning. You say the word. Beat the clock.',
      'Hard round: she names a job. You say which shape does it better.',
      'Stump Gigi. Write her one question you already know the answer to.'
    ],
    ifSheIsStuck:
      'Turn the cups round so she can see all four at once. The shapes answer the question without anybody saying a word.'
  },
  note: 'Nothing here is graded. Nothing is corrected. Petals are for doing it.'
};

/* ===========================================================================
 * MODULE 2 · LESSON 6 — hb-m2-06 · SOIL IS ALIVE
 * ======================================================================== */

/**
 * STEP 1 · THE CHECK-IN · 5 minutes.
 *
 * The oak leaves are the hook because nobody did anything and the leaves went
 * away regardless. A thing that happened with no person involved at all is the
 * cleanest possible evidence that something else is at work.
 */
const M2L6_CHECK_IN = {
  title: 'Where did last year\'s leaves go?',
  text: 'A whole tree of leaves fell last fall. Nobody raked them up. Go and look at that spot now.',
  question: 'They are gone. Nobody moved them. So what happened to them?'
};

/**
 * STEP 2 · TWO BEATS, WITH THE VIDEO BETWEEN THEM.
 *
 * Beat 1 takes soil apart into what it is made of. Beat 2 is the living part,
 * and it is written to hand straight over to Module 3: the compost bin she
 * builds in hb-m3-02 is nothing but a box where she does this on purpose.
 *
 * Beat 1's Apply-It is about squeezing the air out, which is deliberate. It is
 * the same idea the Drainage Investigation runs on in Module 5, and hearing it
 * once here means it is not brand new then.
 */
const M2L6_BEATS = [
  {
    n: 1,
    label: 'What is in one handful',
    hook: 'It takes about five hundred years to make one inch of topsoil.',
    teachingText:
      'Soil is ground-up rock, in tiny bits. Mixed in is humus — dead plants and leaves, broken down. And there is water, and air, in the gaps.',
    example:
      'Scoop soil from your garlic bucket onto a white plate. Spread it thin. You can pick out grit, root bits and old leaf.',
    applyIt: {
      prompt: 'You squeeze wet soil into a hard ball and pack it into a pot. The plant does badly. What did you squeeze out?',
      choices: ['The air', 'The water', 'The rock', 'The humus'],
      answer: 0,
      feedback: [
        null,
        'Squeezing wet soil does not dry it. It is still wet.',
        'The rock bits are still there. They just got pushed together.',
        'The humus is still in there too.'
      ],
      why: 'Roots need air in the gaps. Packed soil has no gaps left for them.'
    }
  },
  {
    n: 2,
    label: 'The part that is alive',
    hook: 'One spoon of soil can hold more living things than there are people on earth.',
    teachingText:
      'Worms, bugs, fungi and bacteria all live in soil. Many of them are decomposers. They eat dead leaves and turn them into humus.',
    example:
      'That is where last fall\'s leaves went. They were eaten, bit by bit, and they are now the dark crumbly stuff under the tree.',
    applyIt: {
      prompt: 'A plastic fork and an apple core both lie under the tree all winter. In spring only one is still there. Which, and why?',
      choices: [
        'The apple core. Nothing eats apple',
        'The fork. Decomposers can eat the apple but not plastic',
        'Both are gone',
        'Both are still there'
      ],
      answer: 1,
      feedback: [
        'Decomposers get to an apple core in weeks.',
        null,
        'One of them is not food for anything in that soil.',
        'Go and check. One of them will not be.'
      ],
      why: 'Decomposers only break down things that were once alive.'
    }
  }
];

/**
 * STEP 3 · THE ACTIVITY · 20 minutes.
 *
 * Three things, and the third one is the point of the whole lesson sitting
 * where it does. The jar test separates soil into visible layers. The plate
 * sort and the worm count find the living part. Then she starts a scrap tub —
 * which is Module 3's compost bin, begun two weeks early so that when she
 * builds the box in hb-m3-02 she already has something to put in it.
 */
const M2L6_ACTIVITY = {
  title: 'Take soil apart, then start feeding it',
  prep: 'A clear jar with a lid that seals. A tub with a lid for kitchen scraps. Gloves.',
  needs: [
    'a clear jar with a tight lid',
    'soil from the garden, about a third of the jar',
    'water',
    'a white plate',
    'a spoon and gloves',
    'a tub with a lid',
    'a hand lens if you have one'
  ],
  steps: [
    'Put soil in the jar until it is a third full. Fill the rest with water.',
    'Lid on tight. Shake it hard for one whole minute.',
    'Stand it somewhere flat and do not touch it. Layers take hours.',
    'While it settles: scoop one spoon of soil onto the white plate.',
    'Spread it thin. Sort what you find into piles. Rock. Old plant. Alive.',
    'Go outside. Mark a square the size of this page and dig 10 cm down.',
    'Count every living thing you find. Then put them all back.',
    'Come back to the jar. Sand sank first, then silt, then clay on top.',
    'Anything floating on the water is humus. Draw the layers.',
    'Last: put the lidded tub by the sink. Fruit and veg scraps only.',
    'That tub is the start of your compost bin. You build the box soon.'
  ],
  safety:
    'Gloves on for digging. Wash your hands well after, every time. Never taste soil, and never taste a plant without a grown-up. Put every living thing back where you found it.',
  grownUpAsks: [
    'Before we start. Is soil alive, or is it just dirt?',
    'Name me three things you think are in one handful.',
    'On the plate. What is the grit? Where did rock that small come from?',
    'What is the dark crumbly stuff? What was it before?',
    'How many living things did you find in your square? Count out loud.',
    'You only dug 10 cm. How many are down where we did not dig?',
    'What are the worms and bugs eating down there?',
    'Look at the jar layers. Which sank first? Why the heaviest?',
    'What is floating on the top? Why does that float?',
    'What do you think happens to the scraps in that tub?',
    'If nothing lived in soil, where would the fallen leaves go?'
  ]
};

/** STEP 4 · THE LEDGER ENTRY · 8 minutes. */
const M2L6_LEDGER = {
  sheet: 'M2L6-soil-is-alive-PRINTABLE.pdf',
  tasks: [
    'Draw your jar and label the layers. Sand, silt, clay, humus.',
    'The handful box: list the five things soil is made of.',
    'Living count: one tally mark per living thing in your square.',
    'Name three decomposers you found or know about.',
    'Scrap tub list: three things that go in, and two that never do.',
    'Write one question about soil for Gigi. You must know the answer.'
  ],
  game: {
    title: 'In the Handful',
    cards: ['SOIL', 'HUMUS', 'MINERALS', 'DECOMPOSER', 'TOPSOIL'],
    rounds: [
      'Gigi names a thing. You say if a decomposer can eat it.',
      'She says a meaning. You say the word. Beat the clock.',
      'Hard round: she names one of the five parts. You say its job.',
      'Stump Gigi. Write her one question you already know the answer to.'
    ],
    ifSheIsStuck:
      'Put the white plate back in front of her. Every word on the cards is sitting on that plate somewhere.'
  },
  note: 'Nothing here is graded. Nothing is corrected. Petals are for doing it.'
};

/* ===========================================================================
 * THE EXPORTS
 * ======================================================================== */

export const HERBALISM_M1_NEW = [
  {
    id: 'hb-m1-02',
    course: 'herbalism',
    module: 1,
    quarter: 1,
    week: 1,
    day: 2,
    n: 2,
    title: 'The circle — seed to seed',
    minutes: 45,
    spec: '§10 · beats',

    concept: 'A plant\'s life is a ring. The last stage makes the seed that starts the first one.',

    standards: [],
    offGrade: 'S2L1',

    words: ['life cycle', 'seedling', 'adult plant', 'pollination', 'fruit'],

    glossary: [
      { word: 'life cycle', plain: 'All the stages of a life, going round and round.' },
      { word: 'seedling', plain: 'A young plant that just came out of its seed.' },
      { word: 'adult plant', plain: 'A plant big enough to make a flower.' },
      { word: 'pollination', plain: 'When a flower gets what it needs to make seeds.' },
      { word: 'fruit', plain: 'The part that grows around the seeds and holds them.' },
      { word: 'stage', plain: 'One step in the ring. Every plant goes through all of them.' },
      { word: 'seed', plain: 'The start and the end of the ring, at the same time.' }
    ],

    video: {
      id: '2SBVz4MgeIE',
      url: 'https://www.youtube.com/watch?v=2SBVz4MgeIE',
      title: 'Plant Life Cycle Stages From Seed To Fruit | Primary School Science Animation',
      channel: 'The Pique Lab',
      minutes: 4,
      verified: '2026-08-14',
      teaches: ['life cycle', 'germination', 'seedling', 'adult plant', 'flower', 'pollination', 'fruit', 'seed'],
      sourceGap:
        'No Black American educator found at this level. Searched Black kids\' YouTube round-ups, Black Mommas Do Science, Learning with Ms. Houston, Mike Likes Science, Black homeschool STEM channel lists. Nothing Black-led on the plant life cycle at elementary level. Open.'
    },

    checkIn: M1L2_CHECK_IN,
    beats: M1L2_BEATS,
    activity: M1L2_ACTIVITY,
    ledger: M1L2_LEDGER,

    hook: M1L2_CHECK_IN,
    core: M1L2_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing:
      'Read back your Day 1 guess about the four bean bags and see how you did. Then build the life cycle on a paper plate — one card per stage, laid round the rim like a clock. Tape the last card down and look at where it lands: right next to the first one, with no gap. Draw the arrows going one way round. Then put a dot on the stage your bean, your garlic and your corn are at today, and move it as they grow.',

    practice: [
      {
        ask: 'Name the stages of a plant\'s life cycle.',
        answer: 'Seed, seedling, adult plant, flower, fruit, and seeds again.',
        why: 'The seeds in that fruit start the ring over. That is why it is a ring.'
      },
      {
        ask: 'Why do we draw the life cycle as a circle and not a line?',
        answer: 'Because the fruit is full of seeds, and a line gives them nowhere to go.',
        why: 'A line has an end. A plant that made seeds has not ended.'
      }
    ],

    check: [
      {
        prompt: 'What comes right after a seed germinates?',
        choices: ['A flower', 'A seedling', 'A fruit', 'Another seed'],
        answer: 1,
        feedback: [
          'A flower needs an adult plant first.',
          null,
          'Fruit comes after the flower.',
          'Seeds come at the far end of the ring.'
        ]
      },
      {
        prompt: 'Where do the seeds for the next plant come from?',
        choices: ['The roots', 'The fruit', 'The stem', 'The first leaves'],
        answer: 1,
        feedback: [
          'Roots hold the plant down and drink.',
          null,
          'The stem holds the plant up.',
          'The first leaves start making food.'
        ]
      },
      {
        prompt: 'Your corn plant dries up and dies. Is the life cycle over?',
        choices: [
          'Yes. That plant is dead',
          'No. Its seeds can start the ring again',
          'Yes, unless it rains',
          'No. The same plant comes back'
        ],
        answer: 1,
        feedback: [
          'That plant is. The cycle is not the same thing as one plant.',
          null,
          'Rain will not wake a dead corn stalk.',
          'Corn does not come back. Its seed does.'
        ]
      }
    ]
  },

  {
    id: 'hb-m1-04',
    course: 'herbalism',
    module: 1,
    quarter: 1,
    week: 2,
    day: 1,
    n: 4,
    title: 'Annuals and perennials',
    minutes: 45,
    spec: '§10 · beats',

    concept: 'Some plants go round the ring once and die. Others keep a living part underground and come back.',

    standards: [],
    offGrade: 'S2L1',

    words: ['annual', 'perennial', 'bulb', 'rhizome', 'die back'],

    glossary: [
      { word: 'annual', plain: 'A plant that lives one year, makes seed, and dies.' },
      { word: 'perennial', plain: 'A plant that comes back year after year.' },
      { word: 'bulb', plain: 'A fat underground bud that stores food. Garlic is one.' },
      { word: 'rhizome', plain: 'A fat root that creeps sideways. Ginger is one.' },
      { word: 'die back', plain: 'When the top dies off but the roots stay alive.' },
      { word: 'frost', plain: 'A night cold enough to freeze water. It kills tender plants.' },
      { word: 'harvest', plain: 'To take the part of a plant you want to keep.' }
    ],

    /**
     * NULL ON PURPOSE. Four adult gardening videos were found and verified
     * through oEmbed, and all four rejected as wrong for a nine-year-old.
     * The ids are in this file's header so nobody searches from zero again.
     * §10 says a lesson with an unverified video is worse than no lesson, and
     * a lesson written to a video that teaches her nothing is the same problem
     * wearing a better coat.
     */
    video: {
      id: 'Z_QqwySxpTc',
      url: 'https://www.youtube.com/watch?v=Z_QqwySxpTc',
      title: 'Plant Types Explained: Annuals, biennial, perennials, shrubs and trees guide',
      channel: 'Garden Ninja: Lee Burkhill',
      minutes: 10,
      verified: '2026-08-14',
      teaches: ['annual', 'biennial', 'perennial', 'shrub', 'tree'],
      fallback: true,
      // A FALLBACK, and the reason is on the page rather than in someone's memory.
      //
      // Ten search angles across two passes found NO children's video anywhere on
      // annuals versus perennials. Four adult garden-centre videos were verified
      // through oEmbed and rejected on age: QcS4LCfQGCQ, BdYkpJWo194, -jQsd1fNFA8,
      // and this one.
      //
      // This one comes back because the locked decision says a lesson MAY ship
      // with a fallback source so long as the gap is recorded. Holding a finished
      // lesson hostage to a source that may not exist teaches nothing; quietly
      // using the fallback and calling the requirement met is worse.
      //
      // It is an adult gardening channel and it reads well above 2.5, so the
      // lesson does NOT lean on it. The two beats and the container sort carry the
      // whole payload. The video is a short look-up watched together, not the
      // spine. REPLACE IT when a children's source exists.
      sourceGap:
        'No children-level video exists for annuals vs perennials — ten searches, two passes. ' +
        'No Black American educator either: searched Black gardener and homeschool science ' +
        'channels, Garden Marcus (@gardenmarcuskids — real, Black-led, but pitched younger ' +
        'than nine and no episode on this), Ron Finley (adult). Adult gardening channel used ' +
        'as a stopgap. Open, not closed.'
    },

    checkIn: M1L4_CHECK_IN,
    beats: M1L4_BEATS,
    activity: M1L4_ACTIVITY,
    ledger: M1L4_LEDGER,

    hook: M1L4_CHECK_IN,
    core: M1L4_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing:
      'Sort your four containers onto two sheets: COMES BACK and PLANT AGAIN. Garlic goes on both, and you have to say why out loud. Then go outside and sort five more plants from the yard by asking one question about each: was this here last year? Write A or P on a label and push it into each container. Finish with a winter plan. Look up your first frost date with Gigi and circle it on the calendar. Then write down which two pots have to come indoors before it.',

    practice: [
      {
        ask: 'What is the difference between an annual and a perennial?',
        answer: 'An annual dies after one year. A perennial comes back from its roots.',
        why: 'An annual leaves only seed behind. A perennial leaves something alive in the dirt.'
      },
      {
        ask: 'Why do we plant garlic again every year if it is a perennial?',
        answer: 'Because we dig up the whole bulb to eat it.',
        why: 'The bulb was the part that would have come back. We took it.'
      }
    ],

    check: [
      {
        prompt: 'Which of your four containers is a true annual?',
        choices: ['Ginger', 'Turmeric', 'Corn', 'Garlic'],
        answer: 2,
        feedback: [
          'Ginger comes back from its rhizome.',
          'Turmeric comes back from its rhizome too.',
          null,
          'Garlic is a perennial we grow like an annual.'
        ]
      },
      {
        prompt: 'A perennial dies back in winter. What is still alive?',
        choices: [
          'The leaves',
          'The roots, bulb or rhizome underground',
          'The flowers',
          'Nothing. It starts from seed'
        ],
        answer: 1,
        feedback: [
          'The leaves are the part that died back.',
          null,
          'Flowers are long gone by winter.',
          'That is what an annual does.'
        ]
      },
      {
        prompt: 'Your ginger pot is outside and a hard frost is coming. What do you do?',
        choices: [
          'Nothing. It is a perennial',
          'Bring the pot indoors',
          'Water it more',
          'Cut it down to the soil and leave it'
        ],
        answer: 1,
        feedback: [
          'Perennial does not mean frost-proof.',
          null,
          'Water does not stop a freeze.',
          'The rhizome still freezes in the pot.'
        ]
      }
    ]
  },

  {
    id: 'hb-m1-05',
    course: 'herbalism',
    module: 1,
    quarter: 1,
    week: 2,
    day: 2,
    n: 5,
    title: 'What a plant needs',
    minutes: 45,
    spec: '§10 · beats',

    concept: 'A plant needs light, water, air and nutrients. Soil is just the usual way it gets them.',

    standards: [],
    offGrade: 'S2L1',

    words: ['nutrients', 'hydroponics', 'sunlight', 'air', 'support'],

    glossary: [
      { word: 'nutrients', plain: 'Tiny bits of food a plant drinks up through its roots.' },
      { word: 'hydroponics', plain: 'Growing plants in water instead of soil.' },
      { word: 'sunlight', plain: 'The light a plant uses to make its own food.' },
      { word: 'air', plain: 'Plants need it at the leaves and down at the roots too.' },
      { word: 'support', plain: 'Something to hold a plant up so it does not fall over.' },
      { word: 'soil', plain: 'Holds water, holds nutrients, and holds the plant up.' }
    ],

    video: {
      id: 'TxMdMTzf2YU',
      url: 'https://www.youtube.com/watch?v=TxMdMTzf2YU',
      title: 'Growing Plants Without Soil! | Squeaks Grows a Garden! | SciShow Kids',
      channel: 'SciShow Kids',
      minutes: 4,
      verified: '2026-08-14',
      teaches: ['what a plant needs', 'water', 'nutrients', 'sunlight', 'air', 'support', 'hydroponics', 'soil is not on the list'],
      sourceGap:
        'No Black American educator found at this level. Searched Black science YouTubers for kids, Black Mommas Do Science, Learning with Ms. Houston, Black-owned homeschool STEM channel round-ups, Black gardener and farmer channels. Nothing Black-led on plant needs at elementary level. Open.'
    },

    checkIn: M1L5_CHECK_IN,
    beats: M1L5_BEATS,
    activity: M1L5_ACTIVITY,
    ledger: M1L5_LEDGER,

    hook: M1L5_CHECK_IN,
    core: M1L5_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing:
      'Start an onion root or a celery heart in a jar of water on the windowsill. No soil at all. Measure it as it grows. Then run a second test with two matching seedlings: same pot, same water, same day, and change exactly ONE thing. One stays on the window and one goes in a closet. Write your guess down before anything happens. Measure both every three days and write the colour down too, because pale is a result.',

    practice: [
      {
        ask: 'What does a plant need to grow?',
        answer: 'Light, water, air, nutrients, and room to grow.',
        why: 'Dirt is not on the list. Your beans grew in a bag with none.'
      },
      {
        ask: 'What three jobs does soil do for a plant?',
        answer: 'It holds water, it holds the plant up, and it holds nutrients.',
        why: 'Take the soil away and somebody has to do all three by hand.'
      }
    ],

    check: [
      {
        prompt: 'Which of these is NOT on the list of things a plant needs?',
        choices: ['Water', 'Soil', 'Light', 'Air'],
        answer: 1,
        feedback: [
          'Every plant needs water.',
          null,
          'Leaves need light to make food.',
          'Roots and leaves both need air.'
        ]
      },
      {
        prompt: 'A plant grows in a jar of plain water and then yellows. What is missing?',
        choices: ['Light', 'Air', 'Nutrients', 'Support'],
        answer: 2,
        feedback: [
          'It is on the windowsill. It has light.',
          'There is air on the leaves and in the water.',
          null,
          'A jar holds a small plant up fine.'
        ]
      },
      {
        prompt: 'Why did the seedling in the closet grow tall and pale?',
        choices: [
          'It got too much water',
          'It stretched looking for light and could not make green',
          'It was a different kind of plant',
          'Closets are too warm'
        ],
        answer: 1,
        feedback: [
          'Both pots got the same water. That was the rule.',
          null,
          'They were the same size and the same kind on day one.',
          'The closet is the same temperature as the room.'
        ]
      }
    ]
  }
];

export const HERBALISM_M2_NEW = [
  {
    id: 'hb-m2-03',
    course: 'herbalism',
    module: 2,
    quarter: 1,
    week: 3,
    day: 3,
    n: 9,
    title: 'The Root Race',
    minutes: 45,
    spec: '§10 · beats',

    concept: 'Root shape is a plan. One deep root hunts water down low; many thin roots grab it up top.',

    standards: [],
    offGrade: 'S3L1',

    words: ['taproot', 'fibrous roots', 'root hairs', 'anchor', 'absorb'],

    glossary: [
      { word: 'taproot', plain: 'One thick root going straight down. A carrot is one.' },
      { word: 'fibrous roots', plain: 'Many thin roots spread out wide, like a mat.' },
      { word: 'root hairs', plain: 'Tiny hairs on a root. They do most of the drinking.' },
      { word: 'anchor', plain: 'To hold something down so it cannot be pulled over.' },
      { word: 'absorb', plain: 'To soak something up, the way a sponge does.' },
      { word: 'store', plain: 'To keep food for later. A carrot is a root full of it.' }
    ],

    video: {
      id: 'aNmZOJHuf3k',
      url: 'https://www.youtube.com/watch?v=aNmZOJHuf3k',
      title: 'Functions of Roots | Types of Roots | Taproot | Fibrous Root | Lesson for Kids',
      channel: 'Hungry SciANNtist',
      minutes: 5,
      verified: '2026-08-14',
      teaches: ['what roots do', 'anchor', 'absorb water', 'store food', 'taproot', 'fibrous roots'],
      sourceGap:
        'No Black American educator found at this level. Searched Black gardener and farmer YouTube channels, Black Mommas Do Science, Black kids\' science channel round-ups, Black homeschool STEM lists, and root-specific searches. A second verified option, m9JQtaYm1vw "Roots Lab: Taproots and Fibrous Roots" by Rescue My Plant with Dr. D, was checked and the host could not be confirmed either way — it must NOT be counted as closing this gap. Open.'
    },

    checkIn: M2L3_CHECK_IN,
    beats: M2L3_BEATS,
    activity: M2L3_ACTIVITY,
    ledger: M2L3_LEDGER,

    hook: M2L3_CHECK_IN,
    core: M2L3_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing:
      'Run the Root Race. Four clear cups, each with a paper towel rolled against the wall. Seeds go between the paper and the plastic, so every root grows where you can see it: radish, corn, bean and grass. Write down which one you think goes deepest before you start. Then measure the longest root in cm every two days for ten days, and count how many roots each one has. On Day 10 there are two winners — deepest root and most roots — and they are not the same cup.',

    practice: [
      {
        ask: 'What is the difference between a taproot and fibrous roots?',
        answer: 'A taproot is one thick root going down. Fibrous roots are many thin ones spread wide.',
        why: 'One digs deep for water. The other grabs rain near the top.'
      },
      {
        ask: 'Why do we eat carrots, beets and turnips?',
        answer: 'They are taproots, and the plant packed stored food into them.',
        why: 'A taproot stores food for later. We eat the store.'
      }
    ],

    check: [
      {
        prompt: 'Which plant has fibrous roots?',
        choices: ['A carrot', 'Grass', 'A dandelion', 'A beet'],
        answer: 1,
        feedback: [
          'A carrot is one fat taproot. You eat it.',
          null,
          'A dandelion has a deep taproot. That is why it is hard to pull.',
          'A beet is a taproot too.'
        ]
      },
      {
        prompt: 'What is the main job of root hairs?',
        choices: [
          'To hold the plant up',
          'To absorb water and nutrients',
          'To store food for winter',
          'To make food from light'
        ],
        answer: 1,
        feedback: [
          'The whole root system does the anchoring.',
          null,
          'A thick taproot does the storing.',
          'Leaves do that, not roots.'
        ]
      },
      {
        prompt: 'A hillside is washing away in the rain. Which root shape holds the soil best?',
        choices: [
          'One deep taproot',
          'A wide mat of fibrous roots',
          'Neither. Roots do not hold soil',
          'Whichever root is longest'
        ],
        answer: 1,
        feedback: [
          'It grips in one spot and goes deep. Deep is not wide.',
          null,
          'That is one of the two big jobs roots do.',
          'Length is not the same as spread.'
        ]
      }
    ]
  },

  {
    id: 'hb-m2-06',
    course: 'herbalism',
    module: 2,
    quarter: 1,
    week: 4,
    day: 3,
    n: 12,
    title: 'Soil is alive',
    minutes: 45,
    spec: '§10 · beats',

    concept: 'Soil is ground rock, dead plants, water, air — and a huge amount of living things.',

    standards: [],
    offGrade: 'S3L1',

    words: ['soil', 'humus', 'minerals', 'decomposer', 'topsoil'],

    glossary: [
      { word: 'soil', plain: 'Rock bits, dead plants, water, air and living things, mixed.' },
      { word: 'humus', plain: 'The dark crumbly part. Dead plants, broken all the way down.' },
      { word: 'minerals', plain: 'Tiny bits of ground-up rock. Plants drink them in water.' },
      { word: 'decomposer', plain: 'A living thing that breaks dead stuff down.' },
      { word: 'topsoil', plain: 'The top layer, where almost everything lives and grows.' },
      { word: 'compost', plain: 'Humus you make on purpose, out of scraps.' }
    ],

    video: {
      id: 'Q-J2FErZHuA',
      url: 'https://www.youtube.com/watch?v=Q-J2FErZHuA',
      title: 'Soil Is Alive! | SciShow Kids',
      channel: 'SciShow Kids',
      minutes: 4,
      verified: '2026-08-14',
      teaches: ['soil is a habitat', 'living things in soil', 'worms', 'bugs', 'fungi', 'decomposers', 'humus'],
      sourceGap:
        'No Black American educator found at this level. Searched Black farmer and gardener channels, Black Mommas Do Science, Black kids\' YouTube round-ups, Black homeschool STEM lists, and soil-and-compost-specific searches. Nothing Black-led on soil at elementary level. Module 7 Lesson 40 is where this gap should actually be closed. Open.'
    },

    checkIn: M2L6_CHECK_IN,
    beats: M2L6_BEATS,
    activity: M2L6_ACTIVITY,
    ledger: M2L6_LEDGER,

    hook: M2L6_CHECK_IN,
    core: M2L6_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing:
      'Take soil apart three ways. Shake a third of a jar of soil with water, lid on tight. Leave it flat and it settles into layers — sand first, then silt, then clay, with humus floating on top. While it settles, spread one spoonful on a white plate and sort what you find into rock, old plant and alive. Then mark a small square outside, dig 10 cm, count every living thing and put them all back. Last, put a lidded tub by the sink for fruit and veg scraps. That tub is the start of your compost bin.',

    practice: [
      {
        ask: 'What is soil made of?',
        answer: 'Ground-up rock, humus from dead plants, water, air, and living things.',
        why: 'Five things. Only one of them is rock.'
      },
      {
        ask: 'What does a decomposer do?',
        answer: 'It breaks down dead plants and animals and turns them into humus.',
        why: 'That is where last fall\'s leaves went. They were eaten.'
      }
    ],

    check: [
      {
        prompt: 'What is humus?',
        choices: [
          'Ground-up rock',
          'Dead plants broken all the way down',
          'Water held in the gaps',
          'The air between soil bits'
        ],
        answer: 1,
        feedback: [
          'Those are the minerals.',
          null,
          'Water is in soil, but it is not humus.',
          'Air is in the gaps. Also not humus.'
        ]
      },
      {
        prompt: 'You pack soil down hard in a pot and the plant does badly. Why?',
        choices: [
          'You squeezed the air out and the roots cannot breathe',
          'Packing makes soil too dry',
          'Packing kills the minerals',
          'Plants like loose soil for no real reason'
        ],
        answer: 0,
        feedback: [
          null,
          'Packed wet soil is still wet. It is the gaps that went.',
          'Rock bits are not alive. They cannot be killed.',
          'There is a real reason, and it is about air.'
        ]
      },
      {
        prompt: 'Which of these will decomposers in your soil NOT break down?',
        choices: ['An apple core', 'Fallen leaves', 'A plastic fork', 'A dead worm'],
        answer: 2,
        feedback: [
          'Gone in weeks. It was alive once.',
          'That is exactly what happened under the oak tree.',
          null,
          'It was alive, so it breaks down like anything else.'
        ]
      }
    ]
  }
];

export const HERBALISM_M1_NEW_META = {
  courseId: 'herbalism',
  module: 1,
  title: 'The Plant Life Cycle',
  blurb:
    'The ring from seed to seed, which herbs come back on their own, and the short list of things every plant needs.'
};

export const HERBALISM_M2_NEW_META = {
  courseId: 'herbalism',
  module: 2,
  title: 'Roots, Shoots and Soil',
  blurb:
    'Two shapes of root and what each one is for, and what a handful of soil is really made of.'
};

export function m1NewLessonById(id) {
  return HERBALISM_M1_NEW.find((l) => l.id === id) || null;
}

export function m2NewLessonById(id) {
  return HERBALISM_M2_NEW.find((l) => l.id === id) || null;
}

export default { HERBALISM_M1_NEW, HERBALISM_M2_NEW };
