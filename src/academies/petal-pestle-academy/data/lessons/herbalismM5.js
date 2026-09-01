// ---------------------------------------------------------------------------
// HERBALISM & BOTANY — MODULE 5 · WATER: THE CYCLE AND THE PLANT
// QUARTER 2 · WEEKS 1 AND 2 · LESSONS 25–30
//
// Built to /home/claude/LESSON-SPEC.md and to the shape of
// src/data/lessons/herbalismM1.js. Four steps, two beats, an Apply-It inside
// each beat, a 20-minute activity away from the screen, a ledger she writes.
//
// ---- THE TWO GEORGIA ELEMENTS THIS MODULE CARRIES ----
//
// This is the first module in the course where a real fourth-grade element has
// a lesson behind it. Both come from S4E3, transcribed here verbatim from the
// GaDOE Science Georgia Standards of Excellence, Fourth Grade:
//
//   S4E3.  Obtain, evaluate, and communicate information to demonstrate the
//          water cycle.
//     a.   Plan and carry out investigations to observe the flow of energy in
//          water as it changes states from solid (ice) to liquid (water) to
//          gas (water vapor) and changes from gas to liquid to solid.
//     b.   Develop models to illustrate multiple pathways water may take
//          during the water cycle (evaporation, condensation, and
//          precipitation). (Clarification statement: Students should
//          understand that the water cycle does not follow a single pathway.)
//
// A NOTE THAT MATTERS, STATED PLAINLY. src/data/standards/georgiaScience4.js
// was NOT present in this working copy, so the text above was taken from the
// GaDOE document as republished by Cobb County Schools and cross-checked
// against a second copy. Both agreed word for word. Before this module ships,
// diff these four lines against georgiaScience4.js and treat that file as the
// authority if they differ.
//
// ---- HOW THE ELEMENTS ARE DELIVERED, AGAINST THE VEHICLE SENTENCES ----
//
// curriculumPlan.js STANDARD_OWNERS promises exactly two things:
//
//   S4E3a — "Ice, water and vapour in a jar on the windowsill."
//   S4E3b — "A bag tied over a living leaf. Transpiration she can see."
//
// Both are delivered as the ACTIVITY, not as a sentence in a card:
//
//   L26 activity IS the jar. Warm water in the bottom, the lid upside down
//        with ice piled on it, on the sunniest sill. She watches liquid become
//        gas, gas become liquid on the cold lid, and the drops fall back. All
//        three states in one jar, with heat as the thing that moves them —
//        which is what "the flow of energy in water" means in S4E3a.
//   L27 activity IS the bag on the leaf, on her own garlic, ginger, turmeric
//        and corn, with a bag on a BARE TWIG as the control.
//
// S4E3b says "multiple pathways" and its parenthetical names evaporation,
// condensation and precipitation. Transpiration is not in that parenthetical.
// It is claimed here anyway, and the claim is honest: the clarification
// statement is that the cycle "does not follow a single pathway", and the
// pathway a nine-year-old with four pots on the step can actually SEE is the
// one through a leaf. L27 shows the pathway; L28 traces it root to leaf so
// that the model she builds has the whole route in it, not just the exit.
//
// ---- LESSONS 29 AND 30 DECLARE NO STANDARD, ON PURPOSE ----
//
// standards: [] is a statement, not an oversight — same reasoning as M1 L1.
// Drainage and reading a wilting plant are not on Georgia's fourth-grade map
// at all. Soil structure sits in the middle grades and plant care sits nowhere.
// They are here because a water module that stops at "the cycle" leaves her
// unable to answer the only water question she will actually face: does this
// plant need water today. No offGrade code is given because neither is a lower
// grade's standard being taught early; they are simply outside the map.
//
// L29 is the module's signature investigation, named in the master plan. She
// pours a measured half-cup into cups of sand, potting mix and packed yard
// dirt, times the holes at the bottom, and measures what comes out — and one
// cup has NO holes, which is the whole point. Roots need air, not just water.
//
// ---- THE CYCLE IS A CIRCLE ----
//
// Spec rule 6 forbids drawing the life cycle as a row. The water cycle gets
// the same treatment and for the same reason: every ledger drawing in this
// module is a circle with arrows. A left-to-right diagram of the water cycle
// teaches a child that water starts in the sea and ends in a cloud, and the
// clarification statement in S4E3b exists to say exactly the opposite.
//
// ---- THE VIDEOS ----
//
// Six videos, all six ids verified on 2026-08-14 through
// https://noembed.com/embed?url=... — title and channel recorded exactly as
// returned. `minutes` is null on all six and that is deliberate: this sandbox
// blocks youtube.com at the proxy and noembed does not return a duration, so
// there was no way to check a running time. A guessed number would have been
// a fabrication in the one field nobody would ever re-check. Fill these in
// when the pages are reachable.
//
// L30's video needs a preview before use. Its id, title and channel are
// verified, and Ron Finley is a Black American gardener and educator, which is
// why it is here — it is the first source in this course that closes the gap
// logged in every previous lesson's sourceGap. But the segment itself could
// not be watched, and its title ("tips for helping plants thrive") is general
// where the other five are literal. See `note` on that video object. If it
// turns out not to fit, the lesson stands on its own; the video is an opener,
// not the spine.
//
// ---- READING LEVEL AND SAFETY ----
//
// ~2.5. Sentences short. The long words are the subject words — evaporation,
// condensation, precipitation, transpiration, stomata, xylem — and every one
// of them has a glossary card with a plain meaning, which is the allowance the
// spec makes and the reason to spend it here.
//
// No dosing anywhere. Water is the safest module in the course for that, but
// the rules still hold: the jar is not a drink, the dyed celery is not a snack,
// and nothing is tasted without a grown-up.
// ---------------------------------------------------------------------------

// ===========================================================================
// LESSON 25 · hb-m5-01 · WHERE RAIN COMES FROM · S4E3a
// ===========================================================================

const M5L1_CHECK_IN = {
  title: 'The puddle that vanished',
  text: 'It rained on Tuesday. A puddle sat by the back step. On Thursday the puddle is gone. Nobody mopped it up.',
  question: 'So where did that water go?'
};

const M5L1_BEATS = [
  {
    n: 1,
    label: 'The sun lifts water up',
    hook: 'The water in your glass may have fallen as rain on a dinosaur.',
    teachingText:
      'Heat from the sun turns water into a gas. That gas is water vapour. You cannot see it, but it rises. The change has a name: evaporation.',
    example:
      'Look at the saucer under your ginger pot. On Monday it held water. By Wednesday it is dry. Nothing drank it. The sun lifted it.',
    applyIt: {
      prompt: 'Two saucers hold the same water. One sits on the sunny sill. One sits in a dark cupboard. Which dries first?',
      choices: ['The sunny one', 'The dark one', 'Both at the same time', 'Neither one dries'],
      answer: 0,
      feedback: [
        null,
        'The cupboard is cool. Cool water is slow to rise.',
        'Heat speeds it up. One has heat and one does not.',
        'Water leaves both. One is just much faster.'
      ],
      why: 'Heat is what lifts water into the air. More heat means faster evaporation.'
    }
  },
  {
    n: 2,
    label: 'The sky gives it back',
    hook: 'A cloud is not smoke. It is millions of tiny water drops, all floating together.',
    teachingText:
      'High up, the air is cold. Cold turns vapour back into tiny drops. That change is condensation. When the drops grow heavy they fall, and falling water is precipitation.',
    example:
      'Pour a cold drink on a hot day. The outside of the glass goes wet. That water did not leak out of the glass. It came out of the warm air.',
    applyIt: {
      prompt: 'Gigi carries a cold jar of tea outside. Soon the jar is wet all over. Where did that water come from?',
      choices: ['It leaked through the glass', 'Out of the warm air', 'Off her hands', 'A little rain fell'],
      answer: 1,
      feedback: [
        'Glass does not leak.',
        null,
        'Her hands are dry, and the bottom is wet too.',
        'The sky is clear.'
      ],
      why: 'Warm air carries vapour. The cold jar cools that air and the vapour turns back into drops. Condensation.'
    }
  }
];

const M5L1_ACTIVITY = {
  title: 'The chalk puddle, and two cups on the sill',
  prep: 'Pick a sunny day. The chalk part takes one hour outside. The cups run all week indoors.',
  needs: [
    'sidewalk chalk',
    'a cup of water to pour out',
    '2 clear cups the same size',
    'a plate or saucer to cover one cup',
    'tape and a marker',
    'a ruler'
  ],
  steps: [
    'Pour one cup of water onto the patio. Make one puddle.',
    'Draw round the edge of the puddle with chalk.',
    'Wait 20 minutes. Draw round it again.',
    'Wait 20 more minutes. Draw round it again.',
    'Count your chalk rings. The puddle is walking inward.',
    'Now fill two clear cups to the same line.',
    'Cover one cup with a plate. Leave the other one open.',
    'Put both on the sunniest windowsill.',
    'Mark the water line on each cup with tape today.',
    'Check both lines once a day for a week.',
    'Lift the plate off the covered cup. Look underneath it. Feel it.'
  ],
  safety:
    'Chalk and plain water only. Do not taste anything out of the garden without a grown-up.',
  grownUpAsks: [
    'Before we start. Where do you think a puddle goes?',
    'The puddle is smaller. Did it sink in, or go up, or both?',
    'Nothing here is boiling. So how is water turning into a gas?',
    'Which cup do you think will lose more water? Say it now.',
    'Look under the plate. What is that?',
    'Where did the drops under the plate come from?',
    'The covered cup barely changed. Why not?',
    'If the sun stopped shining tomorrow, what would happen to the puddle?',
    'Rain fell on Tuesday. Where was that water last month?',
    'Say the three words back to me. Evaporation. Condensation. Precipitation.',
    'Is the water gone, or is it somewhere else?'
  ]
};

const M5L1_LEDGER = {
  sheet: 'M5L1-where-rain-comes-from-PRINTABLE.pdf',
  tasks: [
    'Draw your chalk rings. Write the time beside each one.',
    'Draw the water cycle as a CIRCLE with arrows. Not a line. It has no end.',
    'Label your circle: evaporation, condensation, precipitation.',
    'Write one sentence: where the puddle went, in your own words.'
  ],
  game: {
    title: 'Word Boss',
    cards: ['EVAPORATION', 'WATER VAPOUR', 'CONDENSATION', 'PRECIPITATION', 'WATER CYCLE'],
    rounds: [
      'Say what each word means in your own words. No fancy talk.',
      'A grown-up says the meaning. You say the word. Beat the clock.',
      'Stump Gigi. Write her one question you already know the answer to.'
    ],
    ifSheIsStuck:
      'Point at the chalk rings on the patio, or at the drops under the plate. The word is easier when the thing is in front of her.'
  },
  note: 'Nothing here is graded. Nothing is corrected. Petals are for doing it.'
};

// ===========================================================================
// LESSON 26 · hb-m5-02 · ICE, WATER, VAPOUR IN A JAR · S4E3a
// ===========================================================================

const M5L2_CHECK_IN = {
  title: 'Three things on the table',
  text: 'Gigi sets down three things. An ice cube on a dish. A cup of cool water. A mug so warm you can see the steam curl off it.',
  question: 'Is that three different things, or one thing three ways?'
};

const M5L2_BEATS = [
  {
    n: 1,
    label: 'One water, three ways',
    hook: 'An ice cube and a puff of steam are made of exactly the same stuff.',
    teachingText:
      'Ice is water as a solid. It holds its own shape. Water in a cup is a liquid, so it takes the shape of the cup. Water vapour is a gas, and it spreads out to fill the room.',
    example:
      'Take one ice cube. Drop it in a cup. It melts into liquid. Leave the cup a week and the liquid is gone. It left as gas. Same water the whole time.',
    applyIt: {
      prompt: 'You put one ice cube in a sealed bag. It melts. Is there more water, less water, or the same?',
      choices: ['More water', 'Less water', 'The same water', 'None left'],
      answer: 2,
      feedback: [
        'Nothing was added to the bag.',
        'Nothing got out. The bag is sealed.',
        null,
        'Look again. It is right there, just liquid now.'
      ],
      why: 'Melting changes the state, not the amount. Same water, new shape.'
    }
  },
  {
    n: 2,
    label: 'Heat is what moves it',
    hook: 'Water turns to ice at 32 degrees and boils at 212. Both of those numbers are just heat.',
    teachingText:
      'Add heat and water climbs: ice, then liquid, then gas. Take heat away and it comes back down: gas, then liquid, then ice. The sun is the heat that runs the whole water cycle.',
    example:
      'Your freezer pulls heat out, so water turns to ice. The sunny sill pushes heat in, so water turns to vapour. Same water. Two directions.',
    applyIt: {
      prompt: 'You put the same jar in a cool dark cupboard instead of the sunny sill. Fewer drops form on the lid. Why?',
      choices: ['There is less water', 'There is less heat', 'The lid is broken', 'Cupboards dry things out'],
      answer: 1,
      feedback: [
        'Same jar, same water in it.',
        null,
        'It is the same lid as before.',
        'A cupboard is not a dryer.'
      ],
      why: 'Heat drives the change. Less heat means less vapour, so fewer drops on the lid.'
    }
  }
];

const M5L2_ACTIVITY = {
  title: 'The jar on the windowsill',
  prep: 'Start in the morning so the jar gets the whole day. A grown-up runs the warm tap.',
  needs: [
    'a big clear jar with a lid that sits on top',
    'warm water from the tap',
    'ice cubes',
    'a small dish',
    'tape and a marker',
    'a timer'
  ],
  steps: [
    'Pour warm water into the jar. About two inches deep.',
    'Mark the water line with tape.',
    'Turn the lid upside down and rest it on the jar.',
    'Pile ice cubes on the upturned lid.',
    'Stand the jar on the sunniest windowsill.',
    'Watch the inside of the jar. Fog comes first, then drops.',
    'Watch the drops slide down the lid and fall. That is rain.',
    'Say each part out loud as it happens.',
    'Put one spare ice cube on the dish beside the jar. Time how long it takes to melt.',
    'Come back after lunch. Has the tape line moved?',
    'Draw the jar as a CIRCLE with arrows, not a line.'
  ],
  safety:
    'Warm water, not hot, and a grown-up runs the tap. The jar is an experiment, not a drink.',
  grownUpAsks: [
    'Where is the solid water right now? Point at it.',
    'Where is the liquid water? Where is the gas?',
    'The gas is invisible. So how do we know it is there?',
    'Why did I put ice on the lid instead of leaving it bare?',
    'What is making the drops on the underside of the lid?',
    'Those drops fell back into the jar. What is that called outside?',
    'Did any water leave this jar? Where could it go?',
    'Your spare ice cube melted. What went into it to do that?',
    'If I moved this jar into the fridge, what would stop?',
    'Which way is the heat moving at the lid — in or out?',
    'Show me on your drawing where the cycle starts. Careful with that one.'
  ]
};

const M5L2_LEDGER = {
  sheet: 'M5L2-ice-water-vapour-PRINTABLE.pdf',
  tasks: [
    'Draw your jar. Label the solid, the liquid and the gas.',
    'Draw an arrow where heat goes IN. Draw an arrow where heat goes OUT.',
    'Write the melting time of your spare ice cube.',
    'Write one sentence: what heat does to water.'
  ],
  game: {
    title: 'Word Boss',
    cards: ['SOLID', 'LIQUID', 'GAS', 'MELTING', 'FREEZING'],
    rounds: [
      'Say what each word means in your own words. No fancy talk.',
      'A grown-up names a thing in the kitchen. You say solid, liquid or gas.',
      'Stump Gigi. Write her one question you already know the answer to.'
    ],
    ifSheIsStuck:
      'Hand her the ice cube and the cup of water. Two of the three are already in her hands.'
  },
  note: 'Nothing here is graded. Nothing is corrected. Petals are for doing it.'
};

// ===========================================================================
// LESSON 27 · hb-m5-03 · A BAG ON A LEAF — TRANSPIRATION YOU CAN SEE · S4E3b
// ===========================================================================

const M5L3_CHECK_IN = {
  title: 'The bag that made its own rain',
  text: 'Yesterday Gigi tied a clear bag round a leafy shoot. She sealed it tight. This morning the inside of the bag is covered in drops.',
  question: 'Nothing got into that bag. So who put the water in?'
};

const M5L3_BEATS = [
  {
    n: 1,
    label: 'A leaf is full of little doors',
    hook: 'One leaf can have thousands of holes in it. Every one is too small to see.',
    teachingText:
      'The underside of a leaf is covered in tiny holes. Each one is a pore. Their science name is stomata. They open to let air in, and water slips out.',
    example:
      'Tie a bag on a mint leaf and a bag on a bare stick. In two hours the leaf bag is foggy. The stick bag is still dry. The leaf is doing it.',
    applyIt: {
      prompt: 'You bag one green leaf and one plastic fake leaf. Only one bag gets drops. Which one?',
      choices: ['The fake one — plastic sweats', 'The real one — it has pores', 'Both, the air is wet', 'Neither, bags stay dry'],
      answer: 1,
      feedback: [
        'Plastic has no holes and no water inside it.',
        null,
        'The air is the same round both bags.',
        'One of them is dripping.'
      ],
      why: 'Only a living leaf has pores with water behind them. Water going out of a leaf is transpiration.'
    }
  },
  {
    n: 2,
    label: 'A plant is part of the water cycle',
    hook: 'One big oak tree is a water pump. In a day it lifts more than a bathtub holds.',
    teachingText:
      'Water goes up the plant and out through the leaves. It leaves as vapour. That vapour rises, cools, makes clouds and comes back as rain. So plants help make rain.',
    example:
      'Your corn, your garlic, your ginger and your turmeric are all doing it right now. Every leaf out there is quietly letting water go.',
    applyIt: {
      prompt: 'Two bags on one plant. One leaf sits in bright sun, one sits in shade. Which bag gets more drops?',
      choices: ['The sunny leaf', 'The shady leaf', 'Exactly the same', 'Neither gets drops'],
      answer: 0,
      feedback: [
        null,
        'Shade is cooler, and cool leaves let go more slowly.',
        'Heat changes it. One leaf is hotter than the other.',
        'Both get some. One gets more.'
      ],
      why: 'Heat speeds transpiration the same way it speeds a drying puddle.'
    }
  }
];

const M5L3_ACTIVITY = {
  title: 'Bag a leaf — and bag a bare stick too',
  prep: 'Tie the bags on in the morning. Check at lunch, at dinner, and again the next morning. Then take them all off.',
  needs: [
    '4 clear sandwich bags',
    '4 twist ties or short bits of string',
    'your garlic, ginger, turmeric and corn pots',
    'a bare twig with no leaves on it',
    'a marker',
    'a small ruler'
  ],
  steps: [
    'Slip a bag over a leafy shoot on the garlic. Tie it at the stem, gently.',
    'Do the same on the ginger and on the turmeric.',
    'Now slip a bag over the BARE TWIG. Tie it the same way.',
    'Write the time on every bag with the marker.',
    'Pick one plant in sun and one in shade. Write down which is which.',
    'Come back in two hours. Which bags are foggy?',
    'Come back at dinner. Draw the water line inside each bag.',
    'Leave them overnight. Look first thing in the morning.',
    'Measure the puddle in the corner of each bag with the ruler.',
    'Compare the leaf bags to the bare twig bag. Say out loud what that proves.',
    'Take every bag off. All of them. Today.'
  ],
  safety:
    'Every bag comes off within one day. A bagged leaf in hot sun can cook. Never taste a leaf without a grown-up.',
  grownUpAsks: [
    'Before we tie them on. What do you think will be in the bags?',
    'Why did I make you bag a stick with no leaves on it?',
    'The stick bag is dry. What does that tell you?',
    'Where in the leaf is the water getting out?',
    'The water in the bag is liquid now. What was it when it left the leaf?',
    'Which bag has the most water? Where was that plant standing?',
    'Is the plant losing water on purpose, or is it a leak?',
    'Where does that water go when there is no bag on the leaf?',
    'A whole forest does this all day. What might that do to the sky?',
    'Why must the bags come off today?',
    'Say it back to me. What is the word for water leaving a leaf?'
  ]
};

const M5L3_LEDGER = {
  sheet: 'M5L3-bag-on-a-leaf-PRINTABLE.pdf',
  tasks: [
    'Draw each bag. Shade in how much water it caught.',
    'Circle the CONTROL. Write one line saying why it was in the test.',
    'Add transpiration to your water cycle circle. Draw the arrow from a leaf up.',
    'Write one question about leaves for Gigi. You must know the answer.'
  ],
  game: {
    title: 'Word Boss',
    cards: ['TRANSPIRATION', 'STOMATA', 'PORE', 'WATER VAPOUR', 'CONTROL'],
    rounds: [
      'Say what each word means in your own words. No fancy talk.',
      'A grown-up says the meaning. You say the word. Beat the clock.',
      'Stump Gigi. Write her one question you already know the answer to.'
    ],
    ifSheIsStuck:
      'Hold up the leaf bag beside the stick bag. The difference between them IS the answer.'
  },
  note: 'Nothing here is graded. Nothing is corrected. Petals are for doing it.'
};

// ===========================================================================
// LESSON 28 · hb-m5-04 · FROM THE ROOT TO THE TOP LEAF · S4E3b
// ===========================================================================

const M5L4_CHECK_IN = {
  title: 'No heart, no pump',
  text: 'Your heart beats all day to push blood up to your head. A corn plant grows taller than you are. It has no heart at all.',
  question: 'So how does water get all the way to the top leaf?'
};

const M5L4_BEATS = [
  {
    n: 1,
    label: 'The pipes inside the stem',
    hook: 'Cut a stalk across and you can see the pipes. They look like a ring of dots.',
    teachingText:
      'Roots have tiny hairs that soak water out of the soil. The water moves into thin tubes inside the stem. Those tubes are called xylem. They run all the way to the top leaf.',
    example:
      'Stand a stalk in red water for a day. Then cut across it. A ring of red dots shows up. Every dot is the cut end of one pipe.',
    applyIt: {
      prompt: 'You cut the red stalk across the middle. Where is the red?',
      choices: ['Spread all through it', 'In a ring of small dots', 'Only on the outside skin', 'Nowhere at all'],
      answer: 1,
      feedback: [
        'It travels in tubes, not everywhere.',
        null,
        'The skin stays green. Look inside.',
        'It climbed. Look closely.'
      ],
      why: 'Water rides up inside xylem tubes. Cutting across shows their ends as dots.'
    }
  },
  {
    n: 2,
    label: 'The pull comes from the top',
    hook: 'The plant does not push water up. The leaves pull it up.',
    teachingText:
      'When a leaf lets water go, it leaves room behind. The next drop gets pulled up to fill it. Water sticks to water, so the whole line moves. That is called transpiration pull.',
    example:
      'Think of a straw. You sip at the top and the drink climbs the whole straw. A leaf sips at the top of the plant all day long.',
    applyIt: {
      prompt: 'Two stalks stand in red water. One kept its leaves. One had its leaves cut off. Which climbs faster?',
      choices: ['The one with leaves', 'The one with no leaves', 'Exactly the same', 'Neither one climbs'],
      answer: 0,
      feedback: [
        null,
        'With no leaves, almost nothing is letting water go.',
        'The leaves change it a lot.',
        'Both climb. One is much faster.'
      ],
      why: 'Leaves letting water go IS the pull. No leaves means almost no pull.'
    }
  }
];

const M5L4_ACTIVITY = {
  title: 'The red stalk, and one with no leaves',
  prep: 'A grown-up does all the cutting. Set it up in the morning and read it the next day.',
  needs: [
    '2 stalks of celery with leaves on top',
    '1 white flower with a stem (a carnation is best)',
    'red or blue food colouring',
    '3 jars',
    'water',
    'a knife for the grown-up',
    'a ruler'
  ],
  steps: [
    'A grown-up cuts a slice off the bottom of each stalk. Fresh cuts drink better.',
    'A grown-up cuts every leaf off the second stalk. Keep the first stalk leafy.',
    'Fill three jars with water. Add plenty of colouring to each.',
    'Stand the leafy stalk in jar 1. The bare stalk in jar 2. The white flower in jar 3.',
    'Put all three in the same spot with the same light.',
    'Guess which one will climb fastest. Write it down first.',
    'Check after two hours. Mark how high the colour has got.',
    'Leave them overnight.',
    'In the morning, measure the colour height on each stalk with the ruler.',
    'A grown-up cuts the leafy stalk across the middle. Find the ring of dots.',
    'Look at the white flower. Look at the very edge of each petal.'
  ],
  safety:
    'The grown-up holds the knife, every time. Dyed celery is an experiment, not a snack. Never taste a plant without a grown-up.',
  grownUpAsks: [
    'Before we start. How do you think water gets to the top?',
    'There is no pump in here. So what is doing the lifting?',
    'Which stalk do you think will win? Say it out loud first.',
    'Look at the cut end. Count the dots. What are they?',
    'The colour is in the dots and nowhere else. Why?',
    'The bare stalk barely moved. What is it missing?',
    'What did we learn yesterday that explains that?',
    'The flower turned colour at the petal edge first. Why the edge?',
    'Where does the water go once it reaches the leaf?',
    'Name the whole trip for me. Start at the soil.',
    'If the roots dried out, what would happen up here?'
  ]
};

const M5L4_LEDGER = {
  sheet: 'M5L4-root-to-top-leaf-PRINTABLE.pdf',
  tasks: [
    'Draw the plant. Draw the water path with one long arrow, soil to leaf.',
    'Label it: root hairs, xylem, stem, leaf.',
    'Write the colour height for the leafy stalk and the bare stalk.',
    'Write one sentence: what pulls the water up.'
  ],
  game: {
    title: 'Word Boss',
    cards: ['ROOT HAIRS', 'XYLEM', 'STEM', 'TRANSPIRATION PULL', 'CAPILLARY ACTION'],
    rounds: [
      'Say what each word means in your own words. No fancy talk.',
      'A grown-up traces the path with a finger. You name each part as it passes.',
      'Stump Gigi. Write her one question you already know the answer to.'
    ],
    ifSheIsStuck:
      'Give her a straw and a glass of water. She has done transpiration pull a hundred times at dinner.'
  },
  note: 'Nothing here is graded. Nothing is corrected. Petals are for doing it.'
};

// ===========================================================================
// LESSON 29 · hb-m5-05 · THE DRAINAGE INVESTIGATION · no state element
// ===========================================================================

const M5L5_CHECK_IN = {
  title: 'The pot that never dries out',
  text: 'Gigi has two pots of mint. One is a plain pot with holes in the bottom. One is a pretty pot with no holes at all. Same water. Same sun. One of them is limp, and the soil smells sour.',
  question: 'They got the same care. So why is one of them sick?'
};

const M5L5_BEATS = [
  {
    n: 1,
    label: 'Soil is not solid',
    hook: 'Good garden soil is nearly half empty space.',
    teachingText:
      'Between the grains of soil are little gaps. We call them air pockets. Roots take in air from those gaps. Water fills them up, and when the water drains away the air comes back.',
    example:
      'Pour water into a cup of dry soil and watch the top. Bubbles come up. That is the air being pushed out of the gaps.',
    applyIt: {
      prompt: 'You water a pot with no holes every day for two weeks. The plant goes limp. What ran out?',
      choices: ['Water', 'Air', 'Sunlight', 'Seeds'],
      answer: 1,
      feedback: [
        'There is too much water, not too little.',
        null,
        'The sun did not change.',
        'The plant is already grown.'
      ],
      why: 'The water has nowhere to go. The gaps stay full, so roots get no air.'
    }
  },
  {
    n: 2,
    label: 'Not every soil drains the same',
    hook: 'Georgia is famous for its red clay. It holds water like a bowl.',
    teachingText:
      'Sand has big gaps, so water runs straight through it. Clay has tiny gaps, so water creeps. Loam is a mix of both, and loam is the one gardeners want.',
    example:
      'Pour a cup of water into sand and it is gone in seconds. Pour the same cup onto packed red clay and it can sit on top for minutes.',
    applyIt: {
      prompt: 'Water sits on top of her pot for ten minutes before it soaks in. What does that tell her?',
      choices: ['The soil drains fast', 'The soil drains slowly', 'The plant is thirsty', 'The pot is too big'],
      answer: 1,
      feedback: [
        'Fast soil takes it straight down.',
        null,
        'This is about the soil, not the plant.',
        'Pot size is not what is holding the water.'
      ],
      why: 'Slow soaking means small gaps. That soil needs sand or compost mixed into it.'
    }
  }
];

const M5L5_ACTIVITY = {
  title: 'THE DRAINAGE INVESTIGATION',
  prep: 'A grown-up punches every hole. Collect a cup of sand, a cup of your potting mix and a cup of packed dirt from the yard.',
  needs: [
    '4 clear cups, all the same size',
    'a nail or a pencil for the holes — grown-up only',
    'a cup of sand',
    'a cup of your potting mix',
    'two cups of packed dirt from the yard',
    '4 jars to stand the cups over',
    'a measuring cup',
    'a timer or a phone clock',
    'your notebook'
  ],
  steps: [
    'A grown-up punches five holes in the bottom of THREE cups. The fourth cup gets NO holes.',
    'Fill cup 1 with sand. Cup 2 with potting mix. Cup 3 with yard dirt.',
    'Fill cup 4 — the one with no holes — with yard dirt too.',
    'Fill them all to the same line. Same amount every time.',
    'Stand each cup over its own jar.',
    'Guess the order, fastest to slowest. Write it down BEFORE you pour.',
    'Pour half a cup of water into the sand. Start the timer.',
    'Watch the holes. Stop the timer when the dripping stops. Write the time.',
    'Measure what came out into the jar. Write that down too.',
    'Do the same for the potting mix. Then the yard dirt.',
    'Now cup 4. Pour the same half cup in. Wait. Watch the top of the soil.',
    'Push a finger into all four cups. Which one is soggy?',
    'Read your guess back. Were you right?'
  ],
  safety:
    'The grown-up makes the holes, not you. Wash your hands when you are done. Nothing in this test goes near your mouth.',
  grownUpAsks: [
    'Before you pour. Which one drains first? Say it out loud.',
    'What do you think is in the gaps between the grains?',
    'Bubbles came up when you poured. What were they?',
    'The sand was fastest. What does sand have that clay does not?',
    'Where did the water go in cup 4? It had nowhere to leave.',
    'Push your finger in cup 4. What does that feel like?',
    'A root is living down there. What is it short of?',
    'Which cup would you plant your ginger in? Say why.',
    'Fast drainage sounds good. Is there a problem with sand?',
    'Your pots on the step have holes. Now tell me why.',
    'What could you mix into slow soil to open it up?'
  ]
};

const M5L5_LEDGER = {
  sheet: 'M5L5-drainage-investigation-PRINTABLE.pdf',
  tasks: [
    'Write your guess, then the real order. Fastest to slowest.',
    'Make a table: soil, seconds to stop dripping, water caught.',
    'Draw cup 4. Draw where the water is. Draw where the air should have been.',
    'Write one sentence: what roots need besides water.'
  ],
  game: {
    title: 'Word Boss',
    cards: ['DRAINAGE', 'AIR POCKETS', 'SAND', 'CLAY', 'LOAM'],
    rounds: [
      'Say what each word means in your own words. No fancy talk.',
      'A grown-up describes a soil. You say sand, clay or loam.',
      'Stump Gigi. Write her one question you already know the answer to.'
    ],
    ifSheIsStuck:
      'Let her hold dry sand in one hand and packed clay in the other. Her hands will explain the gaps faster than words will.'
  },
  note: 'Nothing here is graded. Nothing is corrected. Petals are for doing it.'
};

// ===========================================================================
// LESSON 30 · hb-m5-06 · READING A THIRSTY PLANT · no state element
// ===========================================================================

const M5L6_CHECK_IN = {
  title: 'Two limp plants',
  text: 'Two pots sit on the back step. Both plants are drooping the same way. One pot is bone dry. The other pot is wet and heavy.',
  question: 'They droop the same. Do they both need water?'
};

const M5L6_BEATS = [
  {
    n: 1,
    label: 'Wilting is a message, not an answer',
    hook: 'A leaf stands up because it is full of water. Like a balloon full of air.',
    teachingText:
      'Wilting means the leaves have lost their water pressure. Two very different things cause it. Too little water. Or too much water, which rots the roots so they cannot drink at all.',
    example:
      'Your turmeric flopped right over at two in the afternoon. By dark it was standing up again, and the soil was damp the whole time. That plant was hot, not thirsty.',
    applyIt: {
      prompt: 'A plant is drooping. You push a finger in and the soil is wet and cold. What is most likely?',
      choices: ['It is thirsty', 'Its roots are drowning', 'It needs more sun', 'It needs a bigger pot'],
      answer: 1,
      feedback: [
        'Wet soil is not thirst.',
        null,
        'Sun will not fix wet roots.',
        'The pot did not change today.'
      ],
      why: 'Wet soil plus a droop points at drowned roots. Stop watering and let it drain.'
    }
  },
  {
    n: 2,
    label: 'The finger test beats guessing',
    hook: 'The top inch of soil dries first. Underneath it can still be soaking wet.',
    teachingText:
      'Push a finger into the soil, right down to your second knuckle. Dry down there means water it. Damp down there means wait. Check again in the evening, because many plants droop in hot sun and stand back up on their own.',
    example:
      'Your garlic pot looked dry and pale on top on Saturday. One finger in and it was cold and wet an inch down. She waited two days. It was fine.',
    applyIt: {
      prompt: 'The top of the soil is dry and pale. Your finger says damp underneath. What now?',
      choices: ['Water it right now', 'Wait and check tomorrow', 'Move it out of the sun', 'Add more soil on top'],
      answer: 1,
      feedback: [
        'Damp underneath means the roots already have water.',
        null,
        'The sun is not the problem here.',
        'More soil just hides what is going on.'
      ],
      why: 'The roots live below the surface. Judge by what is down there, not by the top.'
    }
  }
];

const M5L6_ACTIVITY = {
  title: 'The plant check-up round',
  prep: 'Do the round in the morning, then do the same round again in the evening. Keep the chart for two weeks.',
  needs: [
    'your garlic, ginger, turmeric and corn pots',
    'your notebook or the printable chart',
    'a wooden skewer or a chopstick',
    'a watering jug',
    'the saucers from under the pots'
  ],
  steps: [
    'Go to the first pot. Lift it. Is it heavy or light?',
    'Push a finger into the soil to your second knuckle. Dry or damp?',
    'Look at the leaves. Limp and soft, or crispy and brown at the edges?',
    'Look at the lowest leaves. Any soft yellow ones?',
    'Look at the saucer. Is there standing water in it?',
    'Look under the pot. Are the holes clear or blocked?',
    'Now decide out loud: water it, or wait. Say why.',
    'Write your decision in the chart before you touch the jug.',
    'If it needs water, pour slowly until it comes out of the holes. Then stop.',
    'Tip out any saucer that is still full ten minutes later.',
    'Do all four pots. Then go back at dinner time and look again.',
    'Write down which plants stood back up on their own.'
  ],
  safety:
    'Wash your hands after handling soil. Never taste a leaf without a grown-up, not even the mint.',
  grownUpAsks: [
    'Both of these are drooping. Do they need the same thing?',
    'Lift this pot. Now lift that one. What does the weight tell you?',
    'Your finger is an inch down. What is it telling you that your eyes did not?',
    'This leaf is crispy and that one is soft. Which one has been dry?',
    'The saucer is full. Is that helping the plant or hurting it?',
    'It flopped at noon and stood up at dark. What was that?',
    'What would you do if you were not sure? What is the safe move?',
    'You poured until it ran out of the holes. Why stop there?',
    'What did the drainage test teach you that helps you right now?',
    'Which plant on this step is the hardest one to read? Why?',
    'Say your watering rule back to me, in your own words.'
  ]
};

const M5L6_LEDGER = {
  sheet: 'M5L6-reading-a-thirsty-plant-PRINTABLE.pdf',
  tasks: [
    'Fill in the check-up chart for all four pots. Morning and evening.',
    'Draw a thirsty leaf and a drowned leaf side by side. Label both.',
    'Write YOUR watering rule. Three lines. Your words, not mine.',
    'Circle the pot you got wrong this week. Write what the plant taught you.'
  ],
  game: {
    title: 'Word Boss',
    cards: ['WILTING', 'CRISPY', 'SOGGY', 'FINGER TEST', 'ROOT ROT'],
    rounds: [
      'Say what each word means in your own words. No fancy talk.',
      'A grown-up describes a plant. You say water it, or wait.',
      'Stump Gigi. Write her one question you already know the answer to.'
    ],
    ifSheIsStuck:
      'Walk her back to the two pots on the step and let her put a finger in each. The soil answers faster than the leaves do.'
  },
  note: 'Nothing here is graded. Nothing is corrected. Petals are for doing it.'
};

// ===========================================================================
// THE MODULE
// ===========================================================================

export const HERBALISM_M5 = [
  {
    id: 'hb-m5-01',
    course: 'herbalism',
    module: 5,
    quarter: 2,
    week: 1,
    day: 1,
    n: 25,
    title: 'Where rain comes from',
    minutes: 45,
    spec: '§10 · beats',

    concept: 'The same water goes round and round. The sun lifts it, the cold sky drops it, and it starts again.',

    standards: ['S4E3a'],

    words: ['evaporation', 'water vapour', 'condensation', 'precipitation', 'water cycle'],

    glossary: [
      { word: 'evaporation', plain: 'When heat turns water into a gas and it floats up.' },
      { word: 'water vapour', plain: 'Water as a gas. It is really there. You just cannot see it.' },
      { word: 'condensation', plain: 'When vapour cools and turns back into tiny drops.' },
      { word: 'precipitation', plain: 'Water falling out of the sky. Rain, snow, sleet or hail.' },
      { word: 'water cycle', plain: 'The same water going round and round, over and over.' },
      { word: 'cloud', plain: 'Millions of tiny water drops floating together.' },
      { word: 'collection', plain: 'Where the fallen water gathers. A pond, a river, the sea, the soil.' }
    ],

    video: {
      id: 'vD-ZwMjRDPU',
      url: 'https://www.youtube.com/watch?v=vD-ZwMjRDPU',
      title: "Water's Amazing Journey | SciShow Kids",
      channel: 'SciShow Kids',
      minutes: 7,
      verified: '2026-08-15 · re-checked at youtube.com/oembed',
      teaches: [
        'evaporation',
        'water vapour',
        'condensation into clouds',
        'precipitation',
        'collection',
        'the same water is used over and over'
      ],
      sourceGap:
        'No Black American educator found for the water cycle at this level. Searched: "Black science educator YouTube channel for elementary kids water cycle evaporation lesson" and "Black American gardener YouTube channel water cycle plants kids educator". Nothing surfaced. Open.'
    },

    checkIn: M5L1_CHECK_IN,
    beats: M5L1_BEATS,
    activity: M5L1_ACTIVITY,
    ledger: M5L1_LEDGER,

    hook: M5L1_CHECK_IN,
    core: M5L1_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing:
      'Pour a cup of water on the patio and chalk round the puddle three times, twenty minutes apart, and watch it walk inward. Then fill two clear cups to the same line, cover one with a plate, and stand both on the sunniest sill. Check the lines every day for a week, and look at the underside of the plate — that is the whole cycle in two cups.',

    practice: [
      {
        ask: 'A puddle dries up in the sun. Where does the water go?',
        answer: 'Up into the air as water vapour.',
        why: 'Heat turns liquid water into a gas. That is evaporation. Nothing is lost.'
      },
      {
        ask: 'Why does a cold glass go wet on a hot day?',
        answer: 'Vapour in the warm air cools and turns back into drops on the glass.',
        why: 'That is condensation, and it is the same thing that makes a cloud.'
      }
    ],

    check: [
      {
        prompt: 'What is it called when water turns into a gas?',
        choices: ['Evaporation', 'Condensation', 'Precipitation', 'Collection'],
        answer: 0,
        feedback: [
          null,
          'That is gas turning back into drops.',
          'That is water falling out of the sky.',
          'That is where the water gathers after it falls.'
        ]
      },
      {
        prompt: 'What is a cloud made of?',
        choices: ['Smoke', 'Millions of tiny water drops', 'Cotton', 'Dry warm air'],
        answer: 1,
        feedback: [
          'Smoke is burnt bits, not water.',
          null,
          'Cotton is a plant. A cloud only looks like it.',
          'Clouds are wet, not dry.'
        ]
      },
      {
        prompt: 'Is the rain falling today brand new water?',
        choices: ['Yes, the sky makes it', 'Yes, it comes from space', 'No, it has been round before', 'No, rain is not water'],
        answer: 2,
        feedback: [
          'The sky does not make water.',
          'Almost no water comes from space.',
          null,
          'Rain is water.'
        ]
      }
    ]
  },

  {
    id: 'hb-m5-02',
    course: 'herbalism',
    module: 5,
    quarter: 2,
    week: 1,
    day: 2,
    n: 26,
    title: 'Ice, water, vapour in a jar',
    minutes: 45,
    spec: '§10 · beats',

    concept: 'Ice, water and vapour are all one thing. Heat moves water one way and cold moves it back.',

    standards: ['S4E3a'],

    words: ['solid', 'liquid', 'gas', 'melting', 'freezing'],

    glossary: [
      { word: 'solid', plain: 'It holds its own shape. Ice is water as a solid.' },
      { word: 'liquid', plain: 'It takes the shape of whatever holds it. Water in a cup.' },
      { word: 'gas', plain: 'It spreads out and fills the room. Water vapour is a gas.' },
      { word: 'melting', plain: 'Solid turning into liquid. Heat going in.' },
      { word: 'freezing', plain: 'Liquid turning into solid. Heat coming out.' },
      { word: 'heat', plain: 'The energy that moves water from ice to water to gas.' },
      { word: 'water vapour', plain: 'Water as a gas. You cannot see it.' }
    ],

    video: {
      id: 'Cgr9hzB66vA',
      url: 'https://www.youtube.com/watch?v=Cgr9hzB66vA',
      title: 'States of Water - Science for Kids!',
      channel: 'Miacademy & MiaPrep Learning Channel',
      minutes: 3,
      verified: '2026-08-15 · re-checked at youtube.com/oembed',
      teaches: [
        'water as a solid, a liquid and a gas',
        'melting',
        'freezing',
        'evaporation',
        'condensation',
        'heat is what changes the state'
      ],
      sourceGap:
        'No Black American educator found for states of matter at this level. Searched: "Black science educator YouTube channel for elementary kids water cycle evaporation lesson". Nothing surfaced. Open.'
    },

    checkIn: M5L2_CHECK_IN,
    beats: M5L2_BEATS,
    activity: M5L2_ACTIVITY,
    ledger: M5L2_LEDGER,

    hook: M5L2_CHECK_IN,
    core: M5L2_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing:
      'Build the jar. Two inches of warm water in a big clear jar, the lid turned upside down on top, a pile of ice cubes sitting on the lid, and the whole thing on the sunniest windowsill. Watch fog, then drops on the underside of the lid, then the drops falling back down as rain. Time a spare ice cube melting beside it, and draw the jar as a circle with arrows.',

    practice: [
      {
        ask: 'What do you add to turn ice into water?',
        answer: 'Heat.',
        why: 'Melting needs energy going in. Heat moves water up from solid to liquid.'
      },
      {
        ask: 'Why do drops form on the cold lid, not the warm glass?',
        answer: 'Because vapour turns back into drops when it touches something cold.',
        why: 'Condensation needs heat to leave. The ice on the lid is where the heat leaves.'
      }
    ],

    check: [
      {
        prompt: 'Which one is water as a gas?',
        choices: ['An ice cube', 'A puddle', 'Water vapour', 'Snow'],
        answer: 2,
        feedback: [
          'Ice is the solid.',
          'A puddle is the liquid.',
          null,
          'Snow is solid too.'
        ]
      },
      {
        prompt: 'Water in the freezer turns to ice. What was taken away?',
        choices: ['Heat', 'Water', 'Air', 'Light'],
        answer: 0,
        feedback: [
          null,
          'The water is all still there, as ice.',
          'Air was not the change.',
          'A freezer is dark, but that is not what did it.'
        ]
      },
      {
        prompt: 'What runs the whole water cycle on Earth?',
        choices: ['Wind only', 'Heat from the sun', 'The moon', 'Rivers'],
        answer: 1,
        feedback: [
          'Wind moves water around. The sun is what lifts it.',
          null,
          'The moon pulls the tides, not the cycle.',
          'Rivers carry water. They do not lift it.'
        ]
      }
    ]
  },

  {
    id: 'hb-m5-03',
    course: 'herbalism',
    module: 5,
    quarter: 2,
    week: 1,
    day: 3,
    n: 27,
    title: 'A bag on a leaf — transpiration you can see',
    minutes: 45,
    spec: '§10 · beats',

    concept: 'A leaf lets water out through tiny holes. That is how a plant feeds the sky.',

    standards: ['S4E3b'],

    words: ['transpiration', 'stomata', 'pore', 'water vapour', 'control'],

    glossary: [
      { word: 'transpiration', plain: 'Water going out of a plant into the air.' },
      { word: 'stomata', plain: 'The tiny holes on a leaf. Mostly on the underside.' },
      { word: 'pore', plain: 'One little hole. Your skin has them too.' },
      { word: 'water vapour', plain: 'Water as a gas. That is how it leaves the leaf.' },
      { word: 'control', plain: 'The part of a test you compare against. Here, the bare stick.' },
      { word: 'water cycle', plain: 'The same water going round and round. A leaf is one of its paths.' }
    ],

    video: {
      id: 'YeOw-wJR9fc',
      url: 'https://www.youtube.com/watch?v=YeOw-wJR9fc',
      title: 'LEAF TRANSPIRATION Experiment (what is transpiration?)',
      channel: 'Kids Fun Science',
      minutes: 4,
      verified: '2026-08-15 · re-checked at youtube.com/oembed',
      teaches: [
        'what transpiration is',
        'tying a bag over a leaf to trap the water',
        'water leaves a leaf as vapour and turns back into drops in the bag',
        'plants move water into the air'
      ],
      sourceGap:
        'No Black American educator found for transpiration. Searched: "Black botanist plant scientist YouTube kids channel explains how plants drink water roots" and "Black science educator YouTube channel for elementary kids". Nothing surfaced. Open. The strongest place in this course to close this gap is M7 L40, Black American herbalism.'
    },

    checkIn: M5L3_CHECK_IN,
    beats: M5L3_BEATS,
    activity: M5L3_ACTIVITY,
    ledger: M5L3_LEDGER,

    hook: M5L3_CHECK_IN,
    core: M5L3_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing:
      'Tie a clear bag over a leafy shoot on the garlic, the ginger and the turmeric — and tie a fourth bag over a bare twig with no leaves on it, which is the control. Write the time on every bag. Check at two hours, at dinner, and again in the morning, and measure the water in each corner. The bare twig bag stays dry, and that is what proves the leaves are doing it. Every bag comes off within a day.',

    practice: [
      {
        ask: 'A bag tied on a leaf gets wet inside. Where did that water come from?',
        answer: 'Out of the leaf.',
        why: 'Leaves let water go as vapour through their stomata. The bag traps it and it turns back into drops.'
      },
      {
        ask: 'Why did you bag a bare stick as well?',
        answer: 'So you can be sure it was the leaves. Not the bag, not the air.',
        why: 'That is a control. Without one, you cannot say what caused the drops.'
      }
    ],

    check: [
      {
        prompt: 'What is water leaving a leaf called?',
        choices: ['Transpiration', 'Evaporation', 'Condensation', 'Germination'],
        answer: 0,
        feedback: [
          null,
          'That is water leaving a puddle or a pond.',
          'That is vapour turning back into drops.',
          'That is a seed waking up.'
        ]
      },
      {
        prompt: 'Water leaves a leaf through tiny holes. What are they called?',
        choices: ['Roots', 'Stomata', 'Seeds', 'Veins'],
        answer: 1,
        feedback: [
          'Roots are underground.',
          null,
          'Seeds make new plants.',
          'Veins carry water about inside the leaf.'
        ]
      },
      {
        prompt: 'Two leaves are bagged. One sits in the sun. Which gets more drops?',
        choices: ['The shady one', 'Exactly the same', 'The sunny one', 'Neither one'],
        answer: 2,
        feedback: [
          'Cool leaves let go more slowly.',
          'Heat changes the speed.',
          null,
          'Both get some. One gets more.'
        ]
      }
    ]
  },

  {
    id: 'hb-m5-04',
    course: 'herbalism',
    module: 5,
    quarter: 2,
    week: 2,
    day: 1,
    n: 28,
    title: 'From the root to the top leaf',
    minutes: 45,
    spec: '§10 · beats',

    concept: 'Water climbs from root to top leaf in tiny pipes. The leaves above do the pulling.',

    standards: ['S4E3b'],

    words: ['root hairs', 'xylem', 'stem', 'transpiration pull', 'capillary action'],

    glossary: [
      { word: 'root hairs', plain: 'Tiny hairs on a root. They soak water out of the soil.' },
      { word: 'xylem', plain: 'The thin tubes that carry water up the stem.' },
      { word: 'stem', plain: 'The part that holds the plant up and carries the water.' },
      { word: 'transpiration pull', plain: 'The tug that starts when a leaf lets water go.' },
      { word: 'capillary action', plain: 'How water creeps up a very thin tube all by itself.' },
      { word: 'sap', plain: 'The watery juice moving inside a plant.' }
    ],

    video: {
      id: 'akt8mjmOalI',
      url: 'https://www.youtube.com/watch?v=akt8mjmOalI',
      title: 'Xylem in Plants | How Water Moves Up the Stem | Water Movement in Plants | Science Experiment',
      channel: 'Hungry SciANNtist',
      minutes: 4,
      verified: '2026-08-15 · re-checked at youtube.com/oembed',
      teaches: [
        'xylem tubes inside the stem',
        'water moving from root to stem to leaf',
        'the dyed-stalk experiment',
        'cutting across a stalk to see the tubes'
      ],
      sourceGap:
        'No Black American educator found. Searched: "Black botanist plant scientist YouTube kids channel explains how plants drink water roots". Nothing surfaced. Open.'
    },

    checkIn: M5L4_CHECK_IN,
    beats: M5L4_BEATS,
    activity: M5L4_ACTIVITY,
    ledger: M5L4_LEDGER,

    hook: M5L4_CHECK_IN,
    core: M5L4_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing:
      'Stand three things in coloured water: a celery stalk with its leaves on, a second stalk with every leaf cut off, and a white flower. Guess which climbs fastest and write it down first. Measure the colour height after two hours and again the next morning, then have a grown-up cut the leafy stalk across to find the ring of red dots — the cut ends of the xylem.',

    practice: [
      {
        ask: 'What carries water up a plant stem?',
        answer: 'Xylem tubes.',
        why: 'They are thin pipes. They run from the roots to the top leaf.'
      },
      {
        ask: 'A plant has no heart. So what pulls the water up?',
        answer: 'The leaves. When they let water go, they pull the next drop up.',
        why: 'Water sticks to water, so pulling one drop pulls the whole line behind it.'
      }
    ],

    check: [
      {
        prompt: 'What takes water in at the bottom of a plant?',
        choices: ['Leaf pores', 'The flower', 'Root hairs', 'The stem'],
        answer: 2,
        feedback: [
          'Pores let water out at the top.',
          'Flowers do not drink.',
          null,
          'The stem carries it. It does not take it in.'
        ]
      },
      {
        prompt: 'You cut a red stalk across. What do you see?',
        choices: ['A ring of red dots', 'Red all through it', 'Nothing red', 'Red only on the skin'],
        answer: 0,
        feedback: [
          null,
          'It travels in tubes, not everywhere.',
          'It climbed. Look closely.',
          'The skin stays green.'
        ]
      },
      {
        prompt: 'Two stalks stand in red water. One has no leaves. Which climbs faster?',
        choices: ['The one with no leaves', 'The one with leaves', 'Exactly the same', 'Neither one climbs'],
        answer: 1,
        feedback: [
          'With no leaves there is almost no pull.',
          null,
          'The leaves change it a lot.',
          'Both climb. One is much faster.'
        ]
      }
    ]
  },

  {
    id: 'hb-m5-05',
    course: 'herbalism',
    module: 5,
    quarter: 2,
    week: 2,
    day: 2,
    n: 29,
    title: 'The Drainage Investigation',
    minutes: 45,
    spec: '§10 · beats',

    concept: 'Roots need air, not just water. Soil that will not drain leaves them nowhere to breathe.',

    /**
     * Empty ON PURPOSE, same as M1 L1. Soil structure and drainage are not on
     * Georgia's fourth-grade map at all — and unlike seeds, this is not a
     * LOWER grade's standard either, so there is no honest offGrade code to
     * give it. It is here because the water cycle without drainage leaves her
     * able to name precipitation and still drown her ginger.
     */
    standards: [],

    words: ['drainage', 'air pockets', 'sand', 'clay', 'loam'],

    glossary: [
      { word: 'drainage', plain: 'Water leaving the soil and running out the bottom.' },
      { word: 'air pockets', plain: 'The little gaps between grains of soil. Roots breathe there.' },
      { word: 'sand', plain: 'Big grains, big gaps. Water runs straight through.' },
      { word: 'clay', plain: 'Tiny grains, tiny gaps. Water creeps and stays.' },
      { word: 'loam', plain: 'A mix of both. It holds some water and still drains.' },
      { word: 'root rot', plain: 'What happens to roots that sit in water with no air.' },
      { word: 'soggy', plain: 'Soaked through and heavy. No air left in it.' }
    ],

    video: {
      id: 'RlscZuGejis',
      url: 'https://www.youtube.com/watch?v=RlscZuGejis',
      title: 'Types of Soil | Water Flow and Absorption Test | Sand, Loam and Clay Soil',
      channel: 'Hungry SciANNtist',
      minutes: 6,
      verified: '2026-08-15 · re-checked at youtube.com/oembed',
      teaches: [
        'sand, loam and clay side by side',
        'pouring the same water through each one',
        'sand drains fastest, clay slowest',
        'how to run a fair comparison'
      ],
      sourceGap:
        'No Black American educator found for soil and drainage at this level. Searched: "Black American gardener YouTube channel water cycle plants kids educator" and "Ron Finley gangsta gardener youtube watch". Ron Finley came up and is used in Lesson 30. Nothing kid-level found for soil. Open. Second lesson in a row from Hungry SciANNtist — worth varying next module.'
    },

    checkIn: M5L5_CHECK_IN,
    beats: M5L5_BEATS,
    activity: M5L5_ACTIVITY,
    ledger: M5L5_LEDGER,

    hook: M5L5_CHECK_IN,
    core: M5L5_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing:
      'Four clear cups. Three have holes punched in the bottom by a grown-up and one has none. Fill them with sand, potting mix and yard dirt, stand each over a jar, and guess the order before you pour. Then pour half a cup into each, time the holes until the dripping stops, and measure what came out. The cup with no holes is the one that teaches the lesson: push a finger in and feel where the air went.',

    practice: [
      {
        ask: 'Why do plant pots have holes in the bottom?',
        answer: 'So the extra water can drain out and air can get back in.',
        why: 'Roots take in air from the gaps in the soil. Full gaps mean no air.'
      },
      {
        ask: 'Water sits on top of a pot for ten minutes. What does that tell you?',
        answer: 'That soil drains slowly. The gaps in it are small.',
        why: 'Slow soil needs sand or compost mixed in to open it up.'
      }
    ],

    check: [
      {
        prompt: 'What do roots need besides water?',
        choices: ['More water', 'Air', 'Sunlight', 'Salt'],
        answer: 1,
        feedback: [
          'Too much water is the problem here, not too little.',
          null,
          'Sunlight is for the leaves.',
          'Salt harms most roots.'
        ]
      },
      {
        prompt: 'Water runs straight through which soil?',
        choices: ['Clay', 'Packed mud', 'Sand', 'Wet loam'],
        answer: 2,
        feedback: [
          'Clay has tiny gaps and holds on to water.',
          'Packed mud is the slowest of all.',
          null,
          'Loam is in between the two.'
        ]
      },
      {
        prompt: 'A pot with no holes is watered daily for weeks. What happens?',
        choices: ['The roots run out of air', 'The plant grows faster', 'The soil dries out', 'Nothing changes'],
        answer: 0,
        feedback: [
          null,
          'A drowned plant does not grow faster.',
          'It stays wet, not dry.',
          'A great deal changes.'
        ]
      }
    ]
  },

  {
    id: 'hb-m5-06',
    course: 'herbalism',
    module: 5,
    quarter: 2,
    week: 2,
    day: 3,
    n: 30,
    title: 'Reading a thirsty plant',
    minutes: 45,
    spec: '§10 · beats',

    concept: 'A drooping plant is asking for something. The soil tells you which thing.',

    /** Empty on purpose. Reading a plant is not on Georgia's map. It is the
     *  payoff of the five lessons before it, and it is the one water question
     *  she will actually be asked every single day. */
    standards: [],

    words: ['wilting', 'crispy', 'soggy', 'finger test', 'root rot'],

    glossary: [
      { word: 'wilting', plain: 'When leaves go limp because they have lost water pressure.' },
      { word: 'crispy', plain: 'Dry and brown at the edges. The sign of a plant gone short of water.' },
      { word: 'soggy', plain: 'Soaked and heavy, with no air left in the soil.' },
      { word: 'finger test', plain: 'Push a finger in to the second knuckle and feel for damp.' },
      { word: 'root rot', plain: 'Roots that have sat in water with no air and gone bad.' },
      { word: 'drainage', plain: 'Water leaving the soil out the bottom of the pot.' }
    ],

    video: {
      id: 'TTNFsZLSs6s',
      url: 'https://www.youtube.com/watch?v=TTNFsZLSs6s',
      title: "'Gangsta Gardener' Ron Finley Shares Tips For Helping Plants Thrive",
      channel: 'TODAY',
      minutes: 5,
      verified: '2026-08-15 · re-checked at youtube.com/oembed',
      teaches: ['keeping growing plants alive and healthy — general care from a working gardener'],
      note:
        'PREVIEW BEFORE USE. The id, title and channel are verified; the segment itself could not be watched, because youtube.com is blocked at the proxy in the machine this was written on. Its title is general where the other five videos in this module are literal, so treat it as an opener rather than as the spine of the lesson. The lesson stands without it. Also check the tone of the "Gangsta Gardener" branding for a nine-year-old before playing it.',
      sourceGap:
        'CLOSED, with a caveat. Ron Finley is a Black American gardener and educator, and this is the first source in this course fronted by one — the gap logged on all fourteen earlier lessons. The caveat is that the host CHANNEL is TODAY, a general news channel, not a Black-owned education channel. Searched: "Black American gardener YouTube channel water cycle plants kids educator", "Ron Finley gangsta gardener youtube", "Black botanist plant scientist YouTube kids channel". Ron Finley was the only Black American educator found across the whole module.'
    },

    checkIn: M5L6_CHECK_IN,
    beats: M5L6_BEATS,
    activity: M5L6_ACTIVITY,
    ledger: M5L6_LEDGER,

    hook: M5L6_CHECK_IN,
    core: M5L6_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing:
      'Walk a check-up round of all four pots. For each one: lift it and feel the weight, push a finger in to the second knuckle, look at the leaves for limp or crispy, check the saucer and the holes, then say out loud whether you water it or wait — and write the decision down before you touch the jug. Go back at dinner and see which plants stood up on their own.',

    practice: [
      {
        ask: 'A plant is drooping and the soil is wet. What is going on?',
        answer: 'The roots are drowning. There is no air in the soil.',
        why: 'Roots with no air stop drinking. The plant droops while sitting in water.'
      },
      {
        ask: 'The top of the soil is dry. Does the plant need water?',
        answer: 'Not always. Check with a finger first.',
        why: 'The surface dries first and lies. What matters is the soil where the roots are.'
      }
    ],

    check: [
      {
        prompt: 'A plant droops and the soil is cold and wet. What is wrong?',
        choices: ['It is thirsty', 'Its roots are drowning', 'It needs less sun', 'It needs a bigger pot'],
        answer: 1,
        feedback: [
          'Wet soil is not thirst.',
          null,
          'Sun is not the clue here.',
          'The pot did not change today.'
        ]
      },
      {
        prompt: 'Crispy brown leaf edges usually mean what?',
        choices: ['Too much water', 'Too little sun', 'Not enough water', 'Too much soil'],
        answer: 2,
        feedback: [
          'Too much water goes soft and yellow, not crispy.',
          'Sun is not the usual cause of crispy edges.',
          null,
          'The amount of soil is not the clue.'
        ]
      },
      {
        prompt: 'A plant flops at noon and stands up by dark. What was that?',
        choices: ['Hot, not thirsty', 'Very thirsty', 'Drowning', 'Dying'],
        answer: 0,
        feedback: [
          null,
          'A truly thirsty plant does not stand back up on its own.',
          'Drowning does not fix itself by dark.',
          'It recovered. It is fine.'
        ]
      }
    ]
  }
];

export const HERBALISM_M5_META = {
  courseId: 'herbalism',
  module: 5,
  title: 'Water — the Cycle and the Plant',
  blurb:
    'The same water, going round and round. Where rain comes from, what heat does to it, how a leaf puts it back into the sky, and why the pot on your step needs holes in the bottom.'
};

export function m5LessonById(id) {
  return HERBALISM_M5.find((l) => l.id === id) || null;
}

export default HERBALISM_M5;
