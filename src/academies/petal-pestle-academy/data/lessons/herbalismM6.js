// ---------------------------------------------------------------------------
// HERBALISM & BOTANY — MODULE 6 · POLLINATION AND PARTNERSHIP
// QUARTER 2, WEEKS 3 AND 4. Lessons 31-36 of 96.
//
// THIS FILE HOLDS FIVE OF THE SIX. Lesson 31, "What a flower is for", is the
// old `hb-1-08` being re-homed into this module and is NOT rewritten here. It
// already sits in src/config/assessment.js under herbalism-q2-w3. What follows
// is 32 through 36.
//
//   hb-1-08   W3 D1  What a flower is for            (existing · re-homed)
//   hb-m6-02  W3 D2  Inside a flower                 new · lesson 32
//   hb-m6-03  W3 D3  Bees, butterflies, birds and wind   new · lesson 33
//   hb-m6-04  W4 D1  Making a pollinator patch       new · lesson 34
//   hb-m6-05  W4 D2  Fruit is a seed's ride          new · lesson 35
//   hb-m6-06  W4 D3  Partners underground            new · lesson 36
//
// ---- THE SHAPE OF THE MODULE ----
//
// The whole module is one sentence followed all the way down: a flower is a
// machine for making a seed, and it cannot run that machine alone.
//
//   32  takes the machine apart on the kitchen table and names every part.
//   33  asks who moves the pollen, and finds two answers — an animal that
//       gets paid, and the wind, which works for nothing.
//   34  builds the thing that keeps the animals coming back.
//   35  follows the ovary after the pollen lands, and finds a fruit.
//   36  goes underground and finds the other partner, the one with no leaves.
//
// So the module opens with a flower in her hand and closes with a fungus, and
// the word "partner" means something different and truer by the end of it.
//
// ---- WHY EVERY LESSON HERE DECLARES standards: [] ----
//
// Georgia's K-5 science GSE has no element on flower structure, pollination,
// fruit, or plant-fungus partnership. S4L1d touches pollinators, but it does
// so as ENERGY FLOW in an ecosystem, and Module 3 Lesson 18 already discharges
// it — claiming it again here would be double-counting a standard to make this
// module look better dressed than it is.
//
// No offGrade code either, and that is also deliberate. offGrade means "this
// IS a real Georgia element, just a lower grade's" — S2L1 for seeds, S3L1 for
// habitats. Floral anatomy at the depth of Lesson 32 is not S2L1; S2L1 is the
// life cycle as a sequence of stages, not the anther and the stigma. Writing
// offGrade: 'S2L1' on these would be a guess dressed as a citation. An empty
// standards array with this note is the honest version.
//
// Lesson 35 is the one arguable case — flower to fruit to seed IS the life
// cycle closing, and Module 1 already teaches that as S2L1. It is left empty
// here so the code lives in one place instead of two.
//
// ---- THE VIDEOS. EVERY ONE VERIFIED AT noembed ON 2026-08-14 ----
//
//   32  jClk6kThYww  Dissection 101: Best Flower Dissection      SDPB
//   33  rOALjGOUtoY  Pollinators and Pollination for Kids | ...  Learn Bright
//   34  sgMnb2KgiU4  How to Help Bees at Home | Make Your Own
//                    Bee Habitat! | Newsround                    BBC Newsround
//   35  txv2k7OoY7U  Like Fruit? Thank a Bee!                    SciShow Kids
//   36  7kHZ0a_6TxY  How Trees Secretly Talk to Each Other in
//                    the Forest | Decoder                        National Geographic
//
// Five lessons, five different publishers. That is on purpose — Module 3's own
// header flags source concentration as a real weakness, and this module had a
// tempting single-channel answer (Peekaboo Kidz has both a flower-parts and a
// pollination episode, verified as djPVgip_bdU and W-daJxfe4As) which was left
// unused for that reason.
//
// ---- JUDGEMENT CALLS, STATED SO NOBODY HAS TO GUESS ----
//
// 1. VIDEO DURATIONS ARE MOSTLY UNKNOWN. youtube.com returns 429 through the
//    proxy and noembed does not carry duration. Only Lesson 35 has a number,
//    and it comes from a transcript page that states 3:47. Every other lesson
//    carries `minutes: null` rather than a plausible-looking guess.
//
// 2. LESSON 34'S VIDEO CONTENT IS THE WEAKEST LINK IN THIS FILE, AND IT IS
//    RECORDED AS SUCH. The id, title and channel of sgMnb2KgiU4 are verified.
//    Its CONTENT is not: no transcript, description or article about it could
//    be reached (youtube 429, transcript sites blocked by provenance rules).
//    The `teaches` array on that lesson is therefore what the title claims and
//    nothing more, and the lesson is written so that it stands up if the video
//    turns out to be thinner than hoped — the three ideas (clumps, water with
//    pebbles, bare ground) are all carried by the beats and the build, not by
//    the video. A verified narrower fallback, if it disappoints, is
//    qfXu-QGtCKo, "How to Make a Bee Bath | Mission: Invertebrate (The Royal
//    Parks)", The Royal Parks — which covers the water dish and nothing else.
//
//    The other four videos' contents WERE checked against a source that is not
//    the video's own title:
//      32  wpsu.psu.edu's page for the Dissection 101 flower resource states
//          learners "identify the parts of a flower, including the pistil,
//          carpel, stigma, style, ovary, ovules, petal, anther, filament,
//          stamen, and sepal" and cover how to choose the best flower to
//          dissect. That is exactly Lesson 32's payload, in Lesson 32's order.
//      33  learnbright.org's page for this title lists bees (honeybee, bumble,
//          solitary), butterflies, birds, bats, beetles, wasps and flies, plus
//          anther, stigma and nectar, and says "wind and water help to
//          transfer pollen". Grades 3-5.
//      35  transcript read in full. Named order: petals, stamen, pollen,
//          pistil, sticky top, pollen moves, "the bottom starts to grow and
//          swell up... what's left is what we call fruit", then bees carrying
//          pollen on legs, wings and fuzzy body. 3:47.
//      36  the video is a National Geographic Decoder short. It defines
//          mycorrhiza as a partnership between a green plant and a fungus,
//          uses mycelium, and states the trade in both directions — sugars
//          from photosynthesis one way, water and mineral nutrients such as
//          phosphorus the other — and reports the Canadian forest study in
//          which one tree was found joined to 47 others.
//
// 3. LESSON 33 CARRIES WIND POLLINATION FURTHER THAN ITS VIDEO DOES. The Learn
//    Bright video gives wind one line. Her corn is wind-pollinated and standing
//    in a bucket outside, which is a better teacher than any video, so Beat 2
//    and the whole first half of the activity are built on the tassel and the
//    silks. This is a deliberate departure from "write the lesson to the
//    video", made once, on purpose, and flagged here rather than buried.
//
// 4. LESSON 35'S VIDEO IS ABOUT BEES AND OVERLAPS LESSON 33. That is not an
//    accident. It is the only kid-level video found that says out loud that the
//    BOTTOM OF THE FLOWER SWELLS AND BECOMES THE FRUIT, which is the entire
//    payload of Lesson 35, and hearing the pollination story a second time two
//    days later is spaced review rather than repetition.
//
// 5. NINE WORDS IS TOO MANY FOR ONE LESSON, SO LESSON 32 SPLITS THEM. `words`
//    carries seven; the Word Boss deck carries five; the glossary carries
//    eleven with plain meanings, per the rule the Module 1 header sets out. A
//    vocabulary-payload lesson with a bare word list and no plain meanings is
//    the failure that header was written about, and it is not repeated here.
//
// 6. THE SUBJECT WORD LIST NEEDS EXTENDING BEFORE check-assessment.mjs WILL
//    PASS THIS MODULE. Same recommendation Module 3's header makes, different
//    words. Add to SUBJECT in scripts/check-assessment.mjs:
//      'sepal', 'sepals', 'petal', 'petals', 'stamen', 'stamens', 'anther',
//      'anthers', 'pistil', 'pistils', 'stigma', 'ovary', 'ovule', 'ovules',
//      'filament', 'pollination', 'pollinator', 'pollinators', 'pollinated',
//      'nectar', 'tassel', 'kernel', 'kernels', 'disperse', 'habitat',
//      'mycelium', 'mycorrhiza', 'fungus', 'fungi', 'mineral', 'minerals',
//      'partnership'
//    Every prompt in m6Bank.js was written to hold ONE of these at a time, the
//    same constraint Module 3 used, so the sentence-length rule passes today.
//    It is the long-word rule that will flag until the list grows.
//
// ---- BLACK AMERICAN EDUCATOR SOURCES — WHAT WAS SEARCHED, WHAT CAME BACK ----
//
// Not closed for any of these five. Every search is written into that lesson's
// `sourceGap` string. The one real find is recorded here because it is worth
// more than the gap note:
//
//   "Discover, Grow, Bloom with Garden Marcus" is a children's gardening
//   channel by Marcus Bridgewater, a Black American gardener and educator in
//   Houston. It is real, it is for children, and two of its videos were
//   verified at noembed on 2026-08-14:
//       F8Z04N_D4pg  "Learn about seeds! ... Gardening for kids & beginners |
//                     Movement | Songs | Fruits & Vegetables"
//       gxz2ij2tIUc  "Learn to plant herbs! | Spring Garden Activity |
//                     Learning videos for kids | Movement | Colors"
//   No episode was found on pollination, flower parts, fruit or fungi, and the
//   two above are pitched younger than nine — movement and songs. Nothing here
//   could use them honestly. THEY ARE A LEAD FOR MODULE 2 AND FOR MODULE 7
//   LESSON 38, and somebody should go through the full twelve-episode playlist
//   (PLvIe46lbvYrazNRmPxYVxWy411cpMDla_) properly rather than by search.
//
//   Ron Finley (the Gangsta Gardener, Los Angeles) also surfaced repeatedly.
//   His material is food justice and adult-facing, with nothing on pollination
//   or floral anatomy at a child's level. Recorded, not used.
//
// ---- READING LEVEL AND SAFETY ----
//
// ~2.5, the same bar as Module 1. Sentences under eleven words; the subject
// words in note 6 are exempt for the reason "endosperm" is.
//
// NO DOSING. Nothing in this module says what any plant does to a body. It is
// anatomy, who carries what, and who trades what with whom. Every activity
// that puts a plant in her hand says out loud that nothing goes in her mouth
// without a grown-up, and Lesson 36 says twice that a wild mushroom is never
// picked up. Lesson 32 also warns that lilies are dangerous to cats, because
// the activity puts one on the kitchen table.
//
// ---- WIRING THIS UP (not done here, and it is not optional) ----
//
// src/config/assessment.js already has `herbalism-q2-w3` with a single lesson
// in it. It needs the two new ones added, and a whole new week for W4:
//
//   { id: 'herbalism-q2-w3', ... lessons: ['hb-1-08', 'hb-m6-02', 'hb-m6-03'],
//     title: 'What a flower is, and who visits it', planned: 3,
//     blurb: 'Why a flower exists, what is inside one, and who carries the pollen.' }
//
//   { id: 'herbalism-q2-w4', course: 'herbalism', quarter: 2, n: 4, module: 6,
//     title: 'Patches, fruit and partners', planned: 3,
//     lessons: ['hb-m6-04', 'hb-m6-05', 'hb-m6-06'],
//     blurb: 'Build the patch, cut the fruit open, and dig up the partner with no leaves.' }
//
// Week 4 is complete the day this lands. Week 3 is complete only if hb-1-08
// has been re-homed to module 6 in its own file first.
// ---------------------------------------------------------------------------

/* ===========================================================================
 * LESSON 32 · hb-m6-02 · INSIDE A FLOWER · Week 3, Day 2
 * =========================================================================== */

/** STEP 1 · THE CHECK-IN · 5 minutes. */
const M6L2_CHECK_IN = {
  title: 'The flower on the table',
  text: 'There is a lily on the table. It looks like one thing. It is not. It is a stack of parts. Each part has one job.',
  question: 'Which part do you think actually makes the seed?'
};

/**
 * STEP 2 · THE SYSTEM CONCEPT · 12 minutes, as TWO BEATS.
 *
 * Beat 1 works outside in — sepal, petal, stamen — because that is the order
 * her hands will take the flower apart in, and matching the teaching order to
 * the doing order is most of what makes a vocabulary lesson stick.
 *
 * Beat 2 is the pistil on its own. It gets a beat to itself because it is the
 * only part that leads anywhere: the ovary in Beat 2 is the tomato in Lesson
 * 35, and a child who leaves today without "the seed starts in the ovary" has
 * to be told it twice later.
 */
const M6L2_BEATS = [
  {
    n: 1,
    label: 'A flower comes apart in rings',
    hook: 'Petals are not decoration. A petal is a sign that says land here.',
    teachingText:
      'A flower is built in rings, outside to inside. Green sepals, then petals, then a ring of stamens. Each stamen holds an anther on top.',
    example:
      'Bend a lily petal back and look underneath. Those green flaps are sepals. They held the bud shut before it opened.',
    applyIt: {
      prompt: 'You pulled every petal off a lily. A ring of stalks is left. Each has a yellow knob. What are they?',
      choices: ['Sepals', 'Stamens', 'Pistils', 'Ovules'],
      answer: 1,
      feedback: [
        'Sepals are green and sit under the petals.',
        null,
        'There is one pistil, and it stands in the middle.',
        'Ovules are tiny and hidden inside the ovary.'
      ],
      why: 'Stamens grow in a ring. The yellow knob on top of one is the anther.'
    }
  },
  {
    n: 2,
    label: 'The middle part makes the seed',
    hook: 'Slice the fat bottom of a lily open. The seeds are already in there, tiny and white.',
    teachingText:
      'One pistil stands in the middle. Its sticky tip is the stigma. Its fat bottom, the ovary, holds the ovules.',
    example:
      'Cut a lily ovary across. You see rows of tiny white dots. Every dot is one ovule. Every ovule can become one seed.',
    applyIt: {
      prompt: 'You cut an ovary open and count twelve ovules. How many seeds could this flower make?',
      choices: ['Twelve', 'One', 'Twenty-four', 'None — an ovule is not a seed'],
      answer: 0,
      feedback: [
        null,
        'One ovule makes one seed. You counted twelve of them.',
        'Each ovule makes one seed, not two.',
        'An ovule is exactly what a seed starts out as.'
      ],
      why: 'One ovule, one seed. Count the ovules and you know the most it can make.'
    }
  }
];

/** STEP 3 · THE ACTIVITY · 20 minutes. Away from the screen. */
const M6L2_ACTIVITY = {
  title: 'Take a flower apart and lay it out',
  prep: 'Buy two big flowers. A lily, a tulip or a hibiscus. Big flowers come apart easily. Small ones fight you.',
  needs: [
    '2 big flowers — lily, tulip or hibiscus',
    'tweezers',
    'a sheet of white paper',
    'a sheet of dark paper',
    'clear tape',
    'a hand lens',
    'a pencil',
    'a small knife, for a grown-up only'
  ],
  steps: [
    'Rule a line down the white paper. Head it OUTSIDE and INSIDE.',
    'Bend the petals back. Find the green flaps underneath.',
    'Pull the sepals off first. Tape one down. Label it.',
    'Pull the petals off next. Tape one down. Label it.',
    'Now the ring of stamens. Pull one off whole.',
    'Tap its anther onto the dark paper. That dust is pollen.',
    'Touch the very tip of the pistil. Say out loud how it feels.',
    'Ask a grown-up to slice the ovary across.',
    'Look at the cut face through the lens. Count the tiny dots.',
    'Every dot is an ovule. Write your count on the sheet.',
    'Take the second flower apart with your eyes shut. Name each part by feel.'
  ],
  safety:
    'A grown-up does all the cutting. Lily pollen stains skin and cloth. Keep it off your face. Wash your hands after. Never taste any part of a flower without a grown-up. Keep lilies away from cats — lilies are dangerous to them.',
  grownUpAsks: [
    'Before we start. How many different parts do you think are in here?',
    'What were those green flaps doing before the bud opened?',
    'The petals are bright. Who are they bright for?',
    'Rub the anther on your finger. What came off on you?',
    'Now touch the stigma. Why do you think it is sticky?',
    'Pollen lands on the stigma. Where does it have to get to?',
    'What is the fat bottom for? What is the word for it?',
    'Count your dots. How many seeds could this one flower make?',
    'Which part would you miss most if it went missing? Why?',
    'Corn has no big bright petals. Does corn still have these parts?',
    'Eyes shut now. Say the parts back to me from the outside in.'
  ]
};

/** STEP 4 · THE LEDGER ENTRY · 8 minutes. She writes it. Nothing is corrected. */
const M6L2_LEDGER = {
  sheet: 'M6L2-inside-a-flower-PRINTABLE.pdf',
  tasks: [
    'Tape your parts down and label all seven.',
    'Write your ovule count. Circle it.',
    'Draw the pistil big. Mark stigma, style and ovary.',
    'Write one question about flowers for Gigi. You must know the answer.'
  ],
  game: {
    title: 'Word Boss',
    cards: ['SEPAL', 'STAMEN', 'ANTHER', 'STIGMA', 'OVARY'],
    rounds: [
      'Say what each word means in your own words. No fancy talk.',
      'A grown-up says the meaning. You say the word. Beat the clock.',
      'Stump Gigi. Write her one question you already know the answer to.'
    ],
    ifSheIsStuck:
      'Point at the taped-down part on her sheet instead of saying the word. The word comes easier when the thing is under her finger.'
  },
  note: 'Nothing here is graded. Nothing is corrected. Petals are for doing it.'
};

/* ===========================================================================
 * LESSON 33 · hb-m6-03 · BEES, BUTTERFLIES, BIRDS AND WIND · Week 3, Day 3
 * =========================================================================== */

const M6L3_CHECK_IN = {
  title: 'The flower that cannot walk',
  text: 'A flower is stuck in one spot. Its pollen sits up on the anther. It has to reach a stigma, often on a different plant.',
  question: 'The flower cannot move at all. So who moves it?'
};

/**
 * Beat 1 is the deal — nectar out, pollen carried back — because "a bee is
 * shopping, not helping" is the idea that stops pollination sounding like a
 * favour. Beat 2 is the wind, and it is the half she can go outside and see,
 * because her corn is standing in a bucket doing it right now.
 */
const M6L3_BEATS = [
  {
    n: 1,
    label: 'Animals get paid to carry it',
    hook: 'A bee is not trying to help the flower. She is shopping. The pollen is an accident.',
    teachingText:
      'A flower makes nectar, which is a sweet drink. An animal comes to drink and pollen sticks to it. It carries that pollen to the next flower.',
    example:
      'A bee is fuzzy all over, so pollen catches on her. A butterfly needs a flat petal to stand on. A hummingbird wants a deep tube it can hover at.',
    applyIt: {
      prompt: 'A flower is a long red tube. There is nowhere at all to land. Who is it built for?',
      choices: ['A hummingbird', 'A beetle', 'An ant', 'The wind'],
      answer: 0,
      feedback: [
        null,
        'A beetle has to land and crawl. There is no pad here.',
        'An ant walks. It cannot reach into a hanging tube.',
        'Wind flowers are small and dull. This one is red and deep.'
      ],
      why: 'Deep tube, bright red, no landing pad. That says a bird that can hover.'
    }
  },
  {
    n: 2,
    label: 'The wind works for free',
    hook: 'Your corn has not one bright petal on it. It still gets pollinated every summer.',
    teachingText:
      'Wind-pollinated flowers are small and dull. They make no nectar and no scent at all. Instead they make huge clouds of very light pollen.',
    example:
      'The tassel on top of your corn makes the pollen. The silks below catch it. Each silk runs down to one kernel on the ear.',
    applyIt: {
      prompt: 'You shook your corn tassel and yellow dust fell out. Where does that dust need to land?',
      choices: ['On a silk below it', 'On a leaf', 'On the soil', 'On another tassel'],
      answer: 0,
      feedback: [
        null,
        'A leaf makes food. It cannot make a seed.',
        'Soil is where a seed goes later. Pollen goes to a silk.',
        'A tassel gives pollen out. It does not catch any.'
      ],
      why: "A silk is corn's stigma. One silk caught, one kernel made."
    }
  }
];

const M6L3_ACTIVITY = {
  title: 'Shake the tassel, then be the bee',
  prep: 'Do this on a still, dry morning. Corn drops most of its pollen before noon. No tassel yet? Do the flower walk half and come back later.',
  needs: [
    'your corn container',
    'a sheet of dark paper',
    'a hand lens',
    'a soft paintbrush or a cotton swab',
    'a ribbon or a strip of tape, for a tag',
    'a clipboard and a pencil',
    'your flower chart from the sheet'
  ],
  steps: [
    'Hold the dark paper right under the corn tassel.',
    'Tap the tassel once. Just once. Then look down.',
    'Put the lens on the dust. Say what you can see.',
    'Find the silks. They come out of the ear lower down.',
    'Follow one silk with your finger, down into the ear.',
    'Now be the bee. Brush pollen off the tassel.',
    'Wipe the brush gently along the silks.',
    'Tie a tag on that ear. You pollinated it yourself.',
    'Walk to three other flowers in the yard.',
    'For each one write colour, smell and landing pad.',
    'Then write your guess. Bee, butterfly, bird or wind.'
  ],
  safety:
    'Watch bees. Never grab one. Stand still and they leave you alone. Pollen can make you sneeze, so keep it off your face. Wash your hands after. Never taste any plant without a grown-up.',
  grownUpAsks: [
    'Before we tap it. What do you think is going to fall out?',
    'Corn spends nothing at all on petals. Why not?',
    'How much pollen does one tassel make? Guess me a number.',
    'Wind is free. So why does any flower bother making nectar?',
    'Follow that silk with your finger. Where does it end up?',
    'You just moved pollen with a brush. Whose job did you do?',
    'This one smells strong. What does a strong smell tell you?',
    'That flower is red and hangs down. Who do you think comes?',
    'Which of these flowers would still work if every bee vanished?',
    'What happens to your corn in a still, windless week?',
    'Say it back to me. Where does pollen start, and where must it get to?'
  ]
};

const M6L3_LEDGER = {
  sheet: 'M6L3-who-carries-the-pollen-PRINTABLE.pdf',
  tasks: [
    'Fill in your flower chart. Colour, smell, landing pad.',
    'Write your guess for each one. Bee, butterfly, bird or wind.',
    'Draw your corn plant. Mark the tassel and mark the silks.',
    'Write one question about pollinators for Gigi. You must know the answer.'
  ],
  game: {
    title: 'Word Boss',
    cards: ['POLLINATION', 'POLLINATOR', 'NECTAR', 'WIND-POLLINATED', 'TASSEL'],
    rounds: [
      'Say what each word means in your own words. No fancy talk.',
      'A grown-up says the meaning. You say the word. Beat the clock.',
      'Stump Gigi. Write her one question you already know the answer to.'
    ],
    ifSheIsStuck:
      'Send her back out to the corn and let her point. The word comes easier standing next to the tassel.'
  },
  note: 'Nothing here is graded. Nothing is corrected. Petals are for doing it.'
};

/* ===========================================================================
 * LESSON 34 · hb-m6-04 · MAKING A POLLINATOR PATCH · Week 4, Day 1
 * =========================================================================== */

const M6L4_CHECK_IN = {
  title: 'The bees that keep going',
  text: 'Your patio holds garlic, turmeric, ginger and corn. Bees fly over it every day. Almost none of them stop.',
  question: 'What is missing that would make one of them stay?'
};

/**
 * Beat 1 is the one thing everybody gets wrong — planting one of each pretty
 * thing instead of three of one thing. Beat 2 is water and bare ground, which
 * nobody thinks of at all, and which is where the surprise lives: most bees
 * are not hive bees and do not live in hives.
 */
const M6L4_BEATS = [
  {
    n: 1,
    label: 'One flower is a snack. A clump is a meal.',
    hook: 'A bee flies straight past a single flower. It never sees it.',
    teachingText:
      'Pollinators spot big patches of one flower from far away. So plant in clumps of three or more. And pick flowers that open at different times.',
    example:
      'One marigold in one pot is easy to miss. Three pots of marigolds together is a sign. Add something that blooms later and the patch stays open longer.',
    applyIt: {
      prompt: 'You planted one marigold, one zinnia and one sage. Bees still fly past. Why?',
      choices: [
        'One of each is too small to spot',
        'Bees do not like those three flowers',
        'The pots were the wrong colour',
        'It was too windy that week'
      ],
      answer: 0,
      feedback: [
        null,
        'All three are good bee flowers. The number is the problem.',
        'A bee looks at the flowers, not at the pots.',
        'Wind slows a bee down. It does not hide the flowers.'
      ],
      why: 'Three of one thing is a sign. One of three things is nothing.'
    }
  },
  {
    n: 2,
    label: 'Water they can stand on, ground they can dig',
    hook: 'Most bees do not live in a hive at all. Most of them dig a hole in the dirt.',
    teachingText:
      'Bees get thirsty and they cannot swim. A shallow dish of pebbles gives them somewhere to stand. Most native bees also nest down in bare soil.',
    example:
      'Fill a saucer with pebbles. Add water to just below the pebble tops. Then fill a wide pot with plain soil. Leave it bare. No mulch, no bark, sun on it.',
    applyIt: {
      prompt: 'You put out a deep bowl of water. Now you keep finding drowned bees in it. Fix it.',
      choices: [
        'Fill it with pebbles they can stand on',
        'Use a deeper bowl',
        'Stir sugar into the water',
        'Take the water away'
      ],
      answer: 0,
      feedback: [
        null,
        'Deeper is worse. They still cannot swim.',
        'They came for water, and sugar water goes bad fast.',
        'Then they have nowhere at all to drink.'
      ],
      why: 'They have to reach the water without standing in it. Pebbles do that.'
    }
  }
];

const M6L4_ACTIVITY = {
  title: 'Build the pollinator patch',
  prep: 'Get a shallow saucer, pebbles and one wide pot. Get plain soil too. Then seeds or starts for two flowering plants. Three of each if you can.',
  needs: [
    'a shallow saucer or a plant tray',
    'a handful of pebbles or marbles',
    'one wide pot',
    'plain potting soil, no mulch',
    'seeds or starts for two flowering plants',
    'a watering can',
    'a marker and plant labels',
    'your notebook'
  ],
  steps: [
    'Station one. Lay the pebbles in the saucer, one layer deep.',
    'Pour water in until it stops just below the pebble tops.',
    'Set it on the ground near your containers. Not up high.',
    'Station two. Fill the wide pot with plain soil.',
    'Pat the top flat. Put nothing on it. No mulch, no bark.',
    'Stand that pot in the sunniest spot you have.',
    'Station three. Plant your flowers in clumps of three.',
    'Keep each kind together. Do not spread them out.',
    'Label every pot with the name and the date.',
    'Draw a bloom calendar. Twelve boxes, one for each month.',
    'Shade in the months you think each plant will be open.'
  ],
  safety:
    'Change the water every two or three days. Still water breeds mosquitoes. Watch bees from a step back and never grab one. Wash your hands after handling soil. Never taste anything from the patch without a grown-up.',
  grownUpAsks: [
    'If you were a bee, what would make you stop here?',
    'Why three of one flower instead of three different ones?',
    'Which month will be hardest to keep something open? Why?',
    'The saucer goes on the ground, not on the table. Why?',
    'What happens if the water sits higher than the pebbles?',
    'There is nothing planted in this pot. So what is it for?',
    'Most bees do not live in hives. Where do they live?',
    'Why does bark mulch matter to a bee that digs?',
    'What must we do to that water every few days?',
    'Say what your patch gives them. Three things. Go.',
    'What could you add next spring to fill your gap?'
  ]
};

const M6L4_LEDGER = {
  sheet: 'M6L4-pollinator-patch-PRINTABLE.pdf',
  tasks: [
    'Draw your patch from above. Mark all three stations.',
    'Fill in your bloom calendar. Shade the months.',
    'Circle the month with nothing open. That is your gap.',
    'Write one question about native bees for Gigi. You must know the answer.'
  ],
  game: {
    title: 'Word Boss',
    cards: ['HABITAT', 'NATIVE BEE', 'BARE GROUND', 'SHALLOW', 'BLOOM'],
    rounds: [
      'Say what each word means in your own words. No fancy talk.',
      'A grown-up says the meaning. You say the word. Beat the clock.',
      'Stump Gigi. Write her one question you already know the answer to.'
    ],
    ifSheIsStuck:
      'Walk her out to the patch and let her point at the station. The word arrives with the thing.'
  },
  note: 'Nothing here is graded. Nothing is corrected. Petals are for doing it.'
};

/* ===========================================================================
 * LESSON 35 · hb-m6-05 · FRUIT IS A SEED'S RIDE · Week 4, Day 2
 * =========================================================================== */

const M6L5_CHECK_IN = {
  title: 'Five of these are fruit',
  text: 'On the board: tomato, apple, cucumber, bean pod. Also a corn cob and a lettuce leaf.',
  question: 'Five of those six are fruit. Which one is not, and how can you tell?'
};

/**
 * Beat 1 closes the loop opened in Lesson 32: the ovary she cut across on
 * Tuesday is the tomato she cuts across today. Beat 2 asks the question a
 * nine-year-old will actually chew on — why spend energy making something
 * sweet and then give it away — and the answer is a taxi fare.
 */
const M6L5_BEATS = [
  {
    n: 1,
    label: 'The flower turns into the fruit',
    hook: 'Your tomato was once the fat bottom of a yellow flower.',
    teachingText:
      'Pollen lands on the stigma and the petals fall off. Then the ovary at the bottom swells. That swollen ovary is the fruit.',
    example:
      'Look behind a squash flower. You will see a tiny green ball. That ball is the ovary. If pollen came, it swells into a squash.',
    applyIt: {
      prompt: 'Your corn ear has bare gaps with no kernels on them. What happened at those spots?',
      choices: [
        'Those silks never caught any pollen',
        'Those kernels fell off the cob',
        'A bird pecked them out',
        'The plant ran out of water'
      ],
      answer: 0,
      feedback: [
        null,
        'Kernels grow on tight. They do not drop off.',
        'A bird leaves torn husks. These husks were shut.',
        'Thirst makes a small ear, not a gappy one.'
      ],
      why: 'One silk, one kernel. No pollen on a silk means no kernel there.'
    }
  },
  {
    n: 2,
    label: 'The fruit buys the seed a ride',
    hook: "A seed that drops straight down grows in its parent's shade.",
    teachingText:
      'A fruit is packaging with a job. Sweet fruit gets eaten, and the seed comes out somewhere else. Hooked or winged fruit rides on fur or on wind.',
    example:
      'A bird eats a blackberry on your fence and flies off. That seed lands three gardens away, in its own sun.',
    applyIt: {
      prompt: 'A tomato plant came up under the bird feeder. Nobody planted it there. How?',
      choices: [
        'A bird ate a tomato and the seed came out there',
        'The wind rolled a whole tomato over',
        'It grew up from an old root',
        'Tomato seeds live in every soil'
      ],
      answer: 0,
      feedback: [
        null,
        'A whole tomato is heavy. Wind does not move one.',
        'There was never a tomato plant in that spot.',
        'Seeds have to arrive. They are not already everywhere.'
      ],
      why: 'That is the whole deal. The bird gets a meal, the seed gets a ride.'
    }
  }
];

const M6L5_ACTIVITY = {
  title: 'Cut five fruits open and find the ride',
  prep: 'Get a tomato, an apple and a cucumber. Get a fresh bean pod and a corn cob. Soak a few dry corn kernels overnight so one will split.',
  needs: [
    'a tomato',
    'an apple',
    'a cucumber',
    'a bean pod',
    'a corn cob, plus a few soaked kernels',
    'a chopping board',
    'a knife, for a grown-up only',
    'a hand lens',
    'paper towels',
    'your notebook'
  ],
  steps: [
    'Look at the bottom of the apple first. Find the little dry star.',
    'That star is the old sepals. The flower was joined right there.',
    'Ask a grown-up to cut the apple across, not down.',
    'The star shape in the middle is the old ovary. Draw it.',
    'Cut the tomato and the cucumber across too. Count the seeds.',
    'Open the bean pod along its seam with your thumb.',
    'Line the beans up. One pod, one row.',
    'Now the corn. Pull one soaked kernel off the cob.',
    'Split it open. One seed inside. That kernel is a fruit.',
    'So a cob is not one fruit. It is hundreds of them.',
    'Sort your five: eaten, carried, blown, or just dropped.'
  ],
  safety:
    'A grown-up does every cut. Grocery fruit is fine to eat. Anything out of the garden waits until a grown-up says yes. Wash your hands and the board after.',
  grownUpAsks: [
    'Before we cut. Where on this apple was the flower?',
    'Count the points on that little star. Why five?',
    'Count the tomato seeds, then the cucumber seeds. Which won?',
    'Every one of those seeds needed a pollen grain. Sit with that.',
    'What is the pod for? Why not just drop the beans?',
    'That one kernel is a fruit. Does that surprise you? Say why.',
    'So how many fruits are on one corn cob?',
    'Which of these five would travel furthest? How would it go?',
    'Why would a plant spend energy making something sweet?',
    'What would happen if every seed just fell straight down?',
    'Say it back to me. What part of the flower became this fruit?'
  ]
};

const M6L5_LEDGER = {
  sheet: 'M6L5-fruit-is-a-ride-PRINTABLE.pdf',
  tasks: [
    'Draw the apple cut across. Mark the old ovary.',
    'Write your seed count for all five.',
    'Sort the five into eaten, carried, blown or dropped.',
    'Write one question about fruit for Gigi. You must know the answer.'
  ],
  game: {
    title: 'Word Boss',
    cards: ['FRUIT', 'OVARY', 'DISPERSE', 'KERNEL', 'POD'],
    rounds: [
      'Say what each word means in your own words. No fancy talk.',
      'A grown-up says the meaning. You say the word. Beat the clock.',
      'Stump Gigi. Write her one question you already know the answer to.'
    ],
    ifSheIsStuck:
      'Put the cut apple back in her hand and let her point at the middle of it.'
  },
  note: 'Nothing here is graded. Nothing is corrected. Petals are for doing it.'
};

/* ===========================================================================
 * LESSON 36 · hb-m6-06 · PARTNERS UNDERGROUND · Week 4, Day 3
 * =========================================================================== */

const M6L6_CHECK_IN = {
  title: 'The root that is not long enough',
  text: 'Roots are thick. Soil is full of gaps far thinner than any root. Water and minerals sit down in those gaps.',
  question: 'A root cannot get in there. So how does the plant reach it?'
};

/**
 * Beat 1 is the thing itself — threads, and how much thinner than a root they
 * are — because the whole idea rests on that one difference in size.
 *
 * Beat 2 is the trade, and it is the point of the module title. Partnership
 * here is not kindness. It is two living things that each hand over what the
 * other cannot make, and she should leave able to say both directions of it.
 */
const M6L6_BEATS = [
  {
    n: 1,
    label: 'Threads far thinner than a root',
    hook: 'One teaspoon of healthy soil can hold miles of fungal thread.',
    teachingText:
      'A fungus grows as fine threads called mycelium. Each thread is far thinner than a root hair. They slip into gaps no root can enter.',
    example:
      'A mushroom is only the fruit of a fungus. The real body is the mat of threads under the soil. Like an apple on a tree.',
    applyIt: {
      prompt: 'You lifted a small weed out. Its roots have pale fuzzy strands. What are they most likely?',
      choices: ['Fungal threads', 'Baby roots', 'A spider web', 'Fertiliser'],
      answer: 0,
      feedback: [
        null,
        'Roots come off the plant and are much thicker.',
        'Webs are made above ground. This was under the soil.',
        'Fertiliser is powder or liquid. It does not grow strands.'
      ],
      why: 'Most plants carry a fungus on their roots. Ask a grown-up before touching soil fuzz you do not know.'
    }
  },
  {
    n: 2,
    label: 'A fair trade',
    hook: 'In one forest, scientists found a single tree. It was joined to forty-seven others.',
    teachingText:
      'A plant makes sugar in its leaves out of sunlight. A fungus has no leaves and cannot. So the plant hands over sugar. The fungus hands back water and minerals.',
    example:
      'Your ginger roots reach a few inches. Its fungal threads search a far wider circle. The ginger pays in sugar. It gets water it could never find.',
    applyIt: {
      prompt: 'The fungus lives in the dark and has no leaves. So what is it getting out of this deal?',
      choices: ['Sugar from the plant', 'Sunlight', 'Minerals', 'Somewhere to hide'],
      answer: 0,
      feedback: [
        null,
        'There is no light at all down there.',
        'Minerals are what the fungus gives, not what it gets.',
        'It already lives in soil. It needs food, not shelter.'
      ],
      why: 'Each side hands over what the other cannot make. That is a partnership.'
    }
  }
];

const M6L6_ACTIVITY = {
  title: 'Hunt for the threads, then run the trade',
  prep: 'Pick a spot with old mulch or leaf litter. Threads show best where things have been rotting a while. Buy one plain mushroom too.',
  needs: [
    'a trowel',
    'garden gloves',
    'a hand lens',
    'a white plate',
    'a jar of water',
    'one store-bought mushroom',
    '20 white beads — sugar',
    '20 blue beads — water',
    '20 grey beads — minerals',
    'two cups and a piece of string'
  ],
  steps: [
    'Part one. Gloves on. Scrape gently under old mulch.',
    'Look for pale threads running through it. Use the lens.',
    'Pull one small weed up with its whole root ball.',
    'Swish the roots in the jar. Lay them on the white plate.',
    'Hunt for pale fuzz on the roots. That fuzz is the partner.',
    'Turn the store mushroom over. Break the stem in half.',
    'Part two. You are the plant. Gigi is the fungus.',
    'Only you may pick up white sugar beads. Only you.',
    'Gigi holds the far cup of blue and grey. You cannot reach it.',
    'Play one round with no trading at all. Count what each of you has.',
    'Play a second round trading freely. Count again.'
  ],
  safety:
    'Gloves on in the soil, and wash your hands after. Never pick up or taste a wild mushroom. The store mushroom is the only one you handle. A grown-up turns any log or heavy stone.',
  grownUpAsks: [
    'Before we dig. What lives down there that we cannot see?',
    'Those threads are thinner than a root. Why does thin help?',
    'The mushroom is only part of the fungus. Where is the rest?',
    'Round one, nobody traded. How did the two of you do?',
    'Round two you traded. What changed?',
    'What can you make that Gigi cannot make at all?',
    'What can Gigi reach that you cannot reach?',
    'Is anybody being kind here? Or is it just a deal?',
    'Your ginger roots go this far. How far do the threads go?',
    'One tree was joined to forty-seven others. What could travel along that?',
    'Say it back to me. What does the plant give, and what does it get?'
  ]
};

const M6L6_LEDGER = {
  sheet: 'M6L6-partners-underground-PRINTABLE.pdf',
  tasks: [
    'Draw a root with threads on it. Make the threads much thinner.',
    'Write your two bead counts. No trade, then trade.',
    'Draw two arrows between plant and fungus. Label what goes each way.',
    'Write one question about fungi for Gigi. You must know the answer.'
  ],
  game: {
    title: 'Word Boss',
    cards: ['FUNGUS', 'MYCELIUM', 'MYCORRHIZA', 'MINERALS', 'PARTNERSHIP'],
    rounds: [
      'Say what each word means in your own words. No fancy talk.',
      'A grown-up says the meaning. You say the word. Beat the clock.',
      'Stump Gigi. Write her one question you already know the answer to.'
    ],
    ifSheIsStuck:
      'Put the two bead cups back in front of her. The words are easier with the trade on the table.'
  },
  note: 'Nothing here is graded. Nothing is corrected. Petals are for doing it.'
};

/* =========================================================================== */

export const HERBALISM_M6_NEW = [
  {
    id: 'hb-m6-02',
    course: 'herbalism',
    module: 6,
    quarter: 2,
    week: 3,
    day: 2,
    n: 32,
    title: 'Inside a flower',
    minutes: 45,
    spec: '§10 · beats',

    concept:
      'A flower is a machine for making a seed, and every part of it has one job in that machine.',

    /**
     * Empty on purpose. Floral anatomy is not a Georgia K-5 element, and no
     * offGrade code is given because it is not a LOWER grade's element either.
     * See the file header.
     */
    standards: [],

    words: ['sepal', 'petal', 'stamen', 'anther', 'pistil', 'stigma', 'ovary'],

    glossary: [
      { word: 'sepal', plain: 'A small green flap under the petals. It held the bud shut.' },
      { word: 'petal', plain: 'The bright part. It is a sign that says land here.' },
      { word: 'stamen', plain: 'One of the stalks in the ring. It makes pollen.' },
      { word: 'filament', plain: 'The thin stalk of a stamen. It holds the anther up.' },
      { word: 'anther', plain: 'The knob on top of a stamen. Pollen is made here.' },
      { word: 'pollen', plain: 'The fine yellow dust a flower makes.' },
      { word: 'pistil', plain: 'The whole part in the middle. It makes the seeds.' },
      { word: 'stigma', plain: 'The sticky tip of the pistil. Pollen lands here.' },
      { word: 'style', plain: 'The neck under the stigma. Pollen grows down it.' },
      { word: 'ovary', plain: 'The fat bottom of the pistil. Seeds start in here.' },
      { word: 'ovule', plain: 'One tiny egg inside the ovary. Each can become a seed.' }
    ],

    video: {
      id: 'jClk6kThYww',
      url: 'https://www.youtube.com/watch?v=jClk6kThYww',
      title: 'Dissection 101: Best Flower Dissection',
      channel: 'SDPB',
      minutes: 8,
      verified: '2026-08-15 · re-checked at youtube.com/oembed',
      teaches: [
        'how to pick a flower that comes apart easily',
        'sepal and petal',
        'stamen, filament and anther',
        'pistil, stigma, style and ovary',
        'the ovules inside the ovary'
      ],
      sourceGap:
        'No Black American educator found for this lesson. Searched: "SciShow Kids parts of a flower dissection youtube video for kids stamen pistil"; "\'parts of a flower\' video for kids stamen anther stigma ovary ovule Learn Bright OR Peekaboo OR Homeschool Pop OR Generation Genius"; "Black American educator youtube channel elementary science for kids plants pollination botany"; "KQED Dissection 101 flower dissection youtube video lily parts". Returned SDPB, Peekaboo Kidz, OnlineClass4Kids, Art Lady Channel, Science With Mrs. Collins, and NC State\'s Plants for Human Health Institute (1OGGkwgpScg, verified, a lily dissection, held as an alternate). None Black-led that could be confirmed. Open.'
    },

    checkIn: M6L2_CHECK_IN,
    beats: M6L2_BEATS,
    activity: M6L2_ACTIVITY,
    ledger: M6L2_LEDGER,

    hook: M6L2_CHECK_IN,
    core: M6L2_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing:
      'Take a big flower apart on the table, outside to inside, and tape every part down on a labelled sheet. Sepals first, then petals, then one whole stamen with its anther tapped out onto dark paper so the pollen shows. Touch the stigma and say out loud how it feels. Then a grown-up slices the ovary across, and you count the ovules through a lens and write the number down — that is the most seeds this one flower could ever make. Finish by taking a second flower apart with your eyes shut, naming each part by feel.',

    practice: [
      {
        ask: 'Name the parts of a flower from the outside in.',
        answer: 'Sepals, then petals, then stamens, then the pistil in the middle.',
        why: 'A flower is built in rings. Taking it apart in that order keeps it clear.'
      },
      {
        ask: 'Where does a seed actually start?',
        answer: 'As an ovule, inside the ovary at the bottom.',
        why: 'The seed is made in the flower. Only much later does it go in the ground.'
      }
    ],

    check: [
      {
        prompt: 'Which part of a flower makes pollen?',
        choices: ['The stigma', 'The anther', 'The ovary', 'The sepal'],
        answer: 1,
        feedback: [
          'The stigma is the sticky tip. Pollen lands there.',
          null,
          'The ovary is the fat bottom. Ovules are in there.',
          'A sepal is a green flap under the petals.'
        ]
      },
      {
        prompt: 'Pollen has to land on which part?',
        choices: ['The petal', 'The sepal', 'The stigma', 'The anther'],
        answer: 2,
        feedback: [
          'A petal is a sign, not a landing pad for pollen.',
          'A sepal held the bud shut before it opened.',
          null,
          'The anther is where pollen comes from, not where it goes.'
        ]
      },
      {
        prompt: 'What is inside the ovary?',
        choices: ['Ovules', 'Pollen', 'Sepals', 'Petals'],
        answer: 0,
        feedback: [
          null,
          'Pollen is made up top, in the anther.',
          'Sepals are outside, under the petals.',
          'Petals are outside too. Nothing is in there but ovules.'
        ]
      }
    ]
  },

  {
    id: 'hb-m6-03',
    course: 'herbalism',
    module: 6,
    quarter: 2,
    week: 3,
    day: 3,
    n: 33,
    title: 'Bees, butterflies, birds and wind',
    minutes: 45,
    spec: '§10 · beats',

    concept:
      'Pollen has to get from an anther to a stigma, and the shape of a flower tells you what carries it.',

    standards: [],

    words: ['pollination', 'pollinator', 'nectar', 'wind-pollinated', 'tassel'],

    glossary: [
      { word: 'pollination', plain: 'Moving pollen from an anther to a stigma.' },
      { word: 'pollinator', plain: 'An animal that carries pollen flower to flower.' },
      { word: 'nectar', plain: 'The sweet drink a flower makes to pay its visitors.' },
      { word: 'pollen', plain: 'The fine yellow dust made in the anther.' },
      { word: 'wind-pollinated', plain: 'A flower that lets the wind carry its pollen.' },
      { word: 'tassel', plain: 'The dusty top of a corn plant. It makes the pollen.' },
      { word: 'silk', plain: 'One long thread on a corn ear. It catches pollen.' },
      { word: 'hover', plain: 'To hold still in the air, flapping fast.' }
    ],

    video: {
      id: 'rOALjGOUtoY',
      url: 'https://www.youtube.com/watch?v=rOALjGOUtoY',
      title: "Pollinators and Pollination for Kids | Fun facts about pollination and who's responsible!",
      channel: 'Learn Bright',
      minutes: 7,
      verified: '2026-08-15 · re-checked at youtube.com/oembed',
      teaches: [
        'what pollination is',
        'bees, butterflies, birds, bats, beetles, wasps and flies as pollinators',
        'nectar, and why an animal visits a flower at all',
        'anther and stigma as the two ends of the trip',
        'that wind and water move pollen too (named only briefly)'
      ],
      sourceGap:
        'No Black American educator found for this lesson. Searched: "youtube video for kids pollination bees butterflies birds wind pollinated corn"; "Black beekeeper educator youtube video for kids bees pollination for kids"; "Black American educator youtube channel elementary science for kids plants pollination botany". Returned Learn Bright, SciShow Kids, Peekaboo Kidz, Homeschool Pop, JobJams, Kids Discover, Generation Genius and BBC Newsround. None Black-led. Open.'
    },

    checkIn: M6L3_CHECK_IN,
    beats: M6L3_BEATS,
    activity: M6L3_ACTIVITY,
    ledger: M6L3_LEDGER,

    hook: M6L3_CHECK_IN,
    core: M6L3_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing:
      'Hold dark paper under your corn tassel on a still morning and tap it once, then put a lens on the yellow dust that falls. Find the silks coming out of the ear and follow one down with your finger. Then be the bee: brush pollen off the tassel, wipe it along the silks, and tie a tag on the ear you did yourself. Finish by walking to three other flowers in the yard and writing down colour, smell and whether there is anywhere to land — then guess who each one is built for.',

    practice: [
      {
        ask: 'Why does a flower make nectar?',
        answer: 'To pay an animal for carrying its pollen.',
        why: 'Nectar is the deal. The animal drinks, and pollen rides along on it.'
      },
      {
        ask: 'How can you spot a wind-pollinated flower just by looking?',
        answer: 'It is small and dull, with no scent and no nectar.',
        why: 'Wind cannot see colour or smell scent. Paying for them would be a waste.'
      }
    ],

    check: [
      {
        prompt: 'What does pollination actually mean?',
        choices: [
          'Moving pollen from an anther to a stigma',
          'A seed waking up',
          'A flower making nectar',
          'A fruit swelling up'
        ],
        answer: 0,
        feedback: [
          null,
          'That is germination. You learned it in Module 1.',
          'Nectar is the payment, not the job itself.',
          'That comes after pollination, not instead of it.'
        ]
      },
      {
        prompt: 'A flower is small, dull and has no smell. Who carries its pollen?',
        choices: ['A butterfly', 'A hummingbird', 'The wind', 'A bat'],
        answer: 2,
        feedback: [
          'Butterflies come to bright flowers with a landing pad.',
          'Birds come to bright, deep flowers.',
          null,
          'Bats come to big pale flowers that open at night.'
        ]
      },
      {
        prompt: 'What is a corn silk for?',
        choices: ['Making pollen', 'Catching pollen', 'Drinking nectar', 'Holding the ear on'],
        answer: 1,
        feedback: [
          'The tassel up top makes the pollen.',
          null,
          'Corn makes no nectar at all.',
          'The stalk holds the ear on.'
        ]
      }
    ]
  },

  {
    id: 'hb-m6-04',
    course: 'herbalism',
    module: 6,
    quarter: 2,
    week: 4,
    day: 1,
    n: 34,
    title: 'Making a pollinator patch',
    minutes: 45,
    spec: '§10 · beats',

    concept:
      'A pollinator stops where three things sit together — flowers to feed at, water it can stand on, and bare ground to nest in.',

    standards: [],

    words: ['habitat', 'native bee', 'bare ground', 'shallow', 'bloom'],

    glossary: [
      { word: 'habitat', plain: 'The place an animal lives, eats and raises young.' },
      { word: 'native bee', plain: 'A wild bee that already lived here. Most live alone.' },
      { word: 'solitary', plain: 'Living alone, not in a hive with others.' },
      { word: 'bare ground', plain: 'Open soil with no mulch, bark or grass on it.' },
      { word: 'mulch', plain: 'Bark or straw laid on soil to hold the water in.' },
      { word: 'shallow', plain: 'Not deep. You could stand up in it.' },
      { word: 'bloom', plain: 'When a flower is open. Also the flower itself.' },
      { word: 'clump', plain: 'Several of the same plant grown close together.' }
    ],

    video: {
      id: 'sgMnb2KgiU4',
      url: 'https://www.youtube.com/watch?v=sgMnb2KgiU4',
      title: 'How to Help Bees at Home 🐝 | Make Your Own Bee Habitat! | Newsround',
      channel: 'BBC Newsround',
      minutes: 2,
      verified: '2026-08-15 · re-checked at youtube.com/oembed',
      teaches: [
        'that a garden can be made into a bee habitat on purpose',
        'making a home for bees at your own house',
        'NOTE: content beyond the title could NOT be confirmed — see judgement call 2 in the file header'
      ],
      sourceGap:
        'No Black American educator found for this lesson, and this is the lesson where one was most likely. Searched: "Ron Finley gangsta gardener youtube video planting for kids garden pollinators" — Ron Finley is a Black American urban gardener and educator, but everything found is food justice and adult-facing (TED talk EzZzZ_qpZ4w, MasterClass trailer), nothing on pollinators for children. Searched: "\'Garden Marcus\' OR \'Marcus Bridgewater\' youtube video pollinators bees flowers garden teaching" and "gardenmarcuskids Garden Marcus kids video seeds soil roots episode watch" — found a real Black American educator\'s children\'s channel, "Discover, Grow, Bloom with Garden Marcus", and verified two of its videos at noembed (F8Z04N_D4pg seeds, gxz2ij2tIUc planting herbs). No pollinator episode exists on it, and those two are pitched younger than nine. Also searched: "youtube how to make a pollinator garden kids what to plant water bare ground nesting native bees short video"; "Xerces Society youtube video pollinator garden nesting habitat bare ground water dish pebbles". Recorded as a live lead for Module 2 and Module 7. Open.'
    },

    checkIn: M6L4_CHECK_IN,
    beats: M6L4_BEATS,
    activity: M6L4_ACTIVITY,
    ledger: M6L4_LEDGER,

    hook: M6L4_CHECK_IN,
    core: M6L4_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing:
      'Build the patch in three stations. One: a shallow saucer of pebbles with the water stopping just below the pebble tops, set on the ground beside your containers. Two: a wide pot of plain soil, patted flat, with nothing on top of it at all — no mulch, no bark — standing in the sunniest spot you have, because most native bees nest in bare ground. Three: flowers planted in clumps of three of a kind, labelled with the name and the date. Then draw a twelve-box bloom calendar and shade in when each plant will be open, and find the month with nothing in it.',

    practice: [
      {
        ask: 'Why plant three of one flower, not one of three?',
        answer: 'A clump is big enough to spot from far off.',
        why: 'One flower on its own gets flown straight past. Three together is a sign.'
      },
      {
        ask: 'Why does a bee dish need pebbles in it?',
        answer: 'So a bee can stand on something while it drinks.',
        why: 'Bees cannot swim. Open water drowns them instead of feeding them.'
      }
    ],

    check: [
      {
        prompt: 'Why does a bee dish need pebbles in it?',
        choices: [
          'So bees can stand up while they drink',
          'To keep the water cool',
          'To stop birds drinking it',
          'To make it look nice'
        ],
        answer: 0,
        feedback: [
          null,
          'Cool water is not the problem. Drowning is.',
          'Birds are welcome. They are pollinators too.',
          'It is not for looks. It is so they do not drown.'
        ]
      },
      {
        prompt: 'Where do most native bees make their nests?',
        choices: ['In a hive', 'In bare ground', 'Inside flowers', 'In water'],
        answer: 1,
        feedback: [
          'Honeybees do. Most native bees live alone.',
          null,
          'They visit flowers. They do not nest in them.',
          'They cannot even swim in it.'
        ]
      },
      {
        prompt: 'You put bark mulch on every pot on the patio. Who lost out?',
        choices: ['Ground-nesting bees', 'Butterflies', 'Hummingbirds', 'The corn'],
        answer: 0,
        feedback: [
          null,
          'Butterflies feed at flowers. Mulch does not block them.',
          'Hummingbirds nest up in trees and shrubs.',
          'Mulch actually helps the corn hold its water.'
        ]
      }
    ]
  },

  {
    id: 'hb-m6-05',
    course: 'herbalism',
    module: 6,
    quarter: 2,
    week: 4,
    day: 2,
    n: 35,
    title: "Fruit is a seed's ride",
    minutes: 45,
    spec: '§10 · beats',

    concept:
      'Once pollen lands, the ovary swells into a fruit, and the fruit is how the seed gets away from its parent.',

    standards: [],

    words: ['fruit', 'ovary', 'disperse', 'kernel', 'pod'],

    glossary: [
      { word: 'fruit', plain: 'The swollen ovary of a flower, with seeds inside it.' },
      { word: 'ovary', plain: 'The fat bottom of a pistil. It becomes the fruit.' },
      { word: 'disperse', plain: 'To spread out and away from where you started.' },
      { word: 'kernel', plain: 'One grain on a corn cob. A fruit with one seed.' },
      { word: 'pod', plain: 'A dry fruit that splits open along a line.' },
      { word: 'core', plain: 'The middle of an apple. The old ovary walls.' },
      { word: 'blossom end', plain: 'The dent where the flower was joined on.' }
    ],

    video: {
      id: 'txv2k7OoY7U',
      url: 'https://www.youtube.com/watch?v=txv2k7OoY7U',
      title: 'Like Fruit? Thank a Bee!',
      channel: 'SciShow Kids',
      minutes: 4,
      verified: '2026-08-15 · re-checked at youtube.com/oembed',
      teaches: [
        'petals, stamen and pistil named again',
        'that the stamen makes the yellow dust called pollen',
        'that the top of the pistil is flat and sticky',
        'that after pollen arrives the bottom swells up',
        'that the swollen part is what we call fruit',
        'bees carrying pollen on legs, wings and fuzzy body'
      ],
      sourceGap:
        'No Black American educator found for this lesson. Searched: "youtube video for kids how a flower becomes a fruit seed dispersal fruit tomato apple seeds inside"; "SciShow Kids Why Do Plants Make Fruit youtube"; "NGScience OR Next Generation Science All About Fruit video seeds dispersal transcript". Returned SciShow Kids, Generation Genius, NGScience, PBS LearningMedia and Mystery Science. None Black-led. Open.'
    },

    checkIn: M6L5_CHECK_IN,
    beats: M6L5_BEATS,
    activity: M6L5_ACTIVITY,
    ledger: M6L5_LEDGER,

    hook: M6L5_CHECK_IN,
    core: M6L5_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing:
      'Start at the bottom of the apple and find the little dry star — those are the sepals, still there, and the flower was joined right on that spot. A grown-up cuts the apple across so the old ovary shows as a star in the middle. Do the same to a tomato and a cucumber and count the seeds in each. Open a bean pod along its seam and lay the beans out in one row. Then split a soaked corn kernel and find the single seed inside it, which means one kernel is one fruit and a whole cob is hundreds of them. Finish by sorting all five by how they would travel: eaten, carried, blown or just dropped.',

    practice: [
      {
        ask: 'Which part of a flower becomes the fruit?',
        answer: 'The ovary, the fat bottom of the pistil.',
        why: 'It swells once pollen has arrived. The petals dry up and fall off.'
      },
      {
        ask: 'Is a corn kernel a fruit?',
        answer: 'Yes. It is a fruit with one seed inside it.',
        why: 'A cob is hundreds of fruits. Each came from one silk.'
      }
    ],

    check: [
      {
        prompt: 'Which part of a flower becomes the fruit?',
        choices: ['The petal', 'The ovary', 'The anther', 'The sepal'],
        answer: 1,
        feedback: [
          'Petals dry up and fall off first.',
          null,
          'The anther made the pollen, then it fell off too.',
          'Sepals stay on as the little dry star.'
        ]
      },
      {
        prompt: 'Why does a plant spend energy making sweet fruit?',
        choices: [
          'To feed itself',
          'To get its seeds carried away',
          'To make more pollen',
          'To keep bugs off it'
        ],
        answer: 1,
        feedback: [
          'Leaves feed the plant. Fruit costs it energy.',
          null,
          'Pollen is made in the anther, long before the fruit.',
          'Sweet fruit brings animals in, not away.'
        ]
      },
      {
        prompt: 'What is one corn kernel?',
        choices: ['A seed with no fruit', 'A fruit with one seed inside', 'A flower', 'A pod'],
        answer: 1,
        feedback: [
          'There is a fruit wall round it. That is the kernel skin.',
          null,
          'The flower came first, months before.',
          'A pod splits open along a line. A kernel does not.'
        ]
      }
    ]
  },

  {
    id: 'hb-m6-06',
    course: 'herbalism',
    module: 6,
    quarter: 2,
    week: 4,
    day: 3,
    n: 36,
    title: 'Partners underground',
    minutes: 45,
    spec: '§10 · beats',

    concept:
      'Most plants trade sugar to a fungus, and the fungus trades back water and minerals from soil the roots can never reach.',

    standards: [],

    words: ['fungus', 'mycelium', 'mycorrhiza', 'minerals', 'partnership'],

    glossary: [
      { word: 'fungus', plain: 'A living thing that is not a plant or an animal.' },
      { word: 'mycelium', plain: 'The mat of fine fungal threads that grows through soil.' },
      { word: 'thread', plain: 'One strand of the fungus. Far thinner than a root.' },
      { word: 'mycorrhiza', plain: 'A root and a fungus joined up and trading.' },
      { word: 'minerals', plain: 'Tiny bits of rock and salt a plant needs from soil.' },
      { word: 'partnership', plain: 'A deal where both sides get something they need.' },
      { word: 'network', plain: 'Many things joined up, so something can travel between them.' }
    ],

    video: {
      id: '7kHZ0a_6TxY',
      url: 'https://www.youtube.com/watch?v=7kHZ0a_6TxY',
      title: 'How Trees Secretly Talk to Each Other in the Forest | Decoder',
      channel: 'National Geographic',
      minutes: 4,
      verified: '2026-08-15 · re-checked at youtube.com/oembed',
      teaches: [
        'mycorrhiza as a partnership between a green plant and a fungus',
        'mycelium — the thread-like body of the fungus in the soil',
        'trees handing over sugars they made from sunlight',
        'fungi handing back water and mineral nutrients such as phosphorus',
        'a Canadian study where one tree was found joined to 47 others',
        'the nickname the wood wide web'
      ],
      sourceGap:
        'No Black American educator found for this lesson. Searched: "mycorrhizal fungi for kids video wood wide web trees talk fungi roots sugar"; "SciShow Kids OR Crash Course Kids video fungi and plant roots partnership underground helpers"; "SciShow Kids Fungus Among Us OR mushrooms youtube video fungi helping plants roots"; "Black gardener OR mycologist youtube video soil fungi mycorrhizae explained simply". Returned National Geographic, PBS Green Planet, RHS, SciShow Kids and a pile of garden blogs. None Black-led. Open.'
    },

    checkIn: M6L6_CHECK_IN,
    beats: M6L6_BEATS,
    activity: M6L6_ACTIVITY,
    ledger: M6L6_LEDGER,

    hook: M6L6_CHECK_IN,
    core: M6L6_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing:
      'Scrape under old mulch with gloves on and hunt for pale threads with a lens. Pull one small weed up whole, swish its roots in a jar of water, lay them on a white plate and look for the fuzz. Then run the trade game: you are the plant and only you can pick up the white sugar beads, Gigi is the fungus and only she can reach the far cup of blue water beads and grey mineral beads. Play one round where nobody trades and count what each of you ends up with. Play a second round trading freely and count again.',

    practice: [
      {
        ask: 'What does the plant give, and what does it get back?',
        answer: 'It gives sugar. It gets back water and minerals.',
        why: 'Each hands over what the other cannot make or reach.'
      },
      {
        ask: 'Why are fungal threads better than roots at finding water?',
        answer: 'They are far thinner. They fit into gaps a root cannot.',
        why: 'Thin threads reach much further out and into much smaller spaces.'
      }
    ],

    check: [
      {
        prompt: 'What is a mycorrhiza?',
        choices: [
          'A kind of root',
          'A root and a fungus working together',
          'A mushroom cap',
          'A mineral in the soil'
        ],
        answer: 1,
        feedback: [
          'It is more than a root. A fungus is joined onto it.',
          null,
          'The cap is only the fruit of a fungus.',
          'Minerals are what get traded, not the partnership itself.'
        ]
      },
      {
        prompt: 'What does the plant hand over in the trade?',
        choices: ['Water', 'Minerals', 'Sugar', 'Threads'],
        answer: 2,
        feedback: [
          'Water comes the other way, from the fungus.',
          'Minerals come the other way too.',
          null,
          'The threads belong to the fungus.'
        ]
      },
      {
        prompt: 'Why can a fungus not make its own food?',
        choices: ['It has no leaves', 'It has no roots', 'It is too small', 'It lives in soil'],
        answer: 0,
        feedback: [
          null,
          'Roots do not make food. Leaves do.',
          'Size is not the problem. Leaves are.',
          'Plenty of roots live in soil and their plant still eats.'
        ]
      }
    ]
  }
];

export const HERBALISM_M6_NEW_META = {
  courseId: 'herbalism',
  module: 6,
  title: 'Pollination and Partnership',
  blurb:
    'Take a flower apart on the table and find the machine inside it. Then follow the pollen — on a bee, on a butterfly, on the wind off your own corn tassel — build a patch that keeps them coming, cut the fruit open to see where the seed rides, and dig down to meet the partner with no leaves at all.'
};

export function m6LessonById(id) {
  return HERBALISM_M6_NEW.find((l) => l.id === id) || null;
}

export default HERBALISM_M6_NEW;
