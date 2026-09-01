// ---------------------------------------------------------------------------
// HERBALISM MODULE 6 — THE QUESTION BANK
// POLLINATION AND PARTNERSHIP · Quarter 2, Weeks 3 and 4
//
// FIFTY QUESTIONS. Ten each for lessons 32-36. Lesson 31 ("What a flower is
// for", the re-homed hb-1-08) keeps its own bank items wherever they live now
// and is NOT duplicated here — its ten belong with its lesson, not with the
// five new ones.
//
// That means Week 3's pool is 30 only once hb-1-08's items are counted in
// beside t-hbm602* and t-hbm603*. Week 4's pool is a clean 30 on its own:
// t-hbm604*, t-hbm605*, t-hbm606*. The Friday test draws eight.
//
// ---- THESE ARE NOT ASKED AT THE END OF THE LESSON ----
//
// Inside the lesson she answers five: two Apply-Its inside the beats and a
// three-question check. These fifty feed Day 4, the morning warm-up, the
// spaced-review boxes, and the extra practice the practice gate serves after a
// poor check. Reasoning in full in the header of herbalismM1Bank.js.
//
// ---- SHAPE ----
//
// Copied from src/data/assessments/herbalismM1Bank.js, which was read directly:
//
//   id        unique across the whole bank
//   lesson    matches a real lesson id
//   prompt    one question, short
//   choices   exactly 4
//   answer    0-3
//   feedback  exactly 4, NULL in the answer slot, a real sentence in the rest
//   why       shown on the review screen
//
// The id convention follows M1's literal 't-hbm101a', giving t-hbm602a through
// t-hbm606j. Lesson 31 is hb-1-08 and keeps whatever ids it already has.
//
// ---- THE DISTRACTOR RULE, APPLIED LITERALLY ----
//
// Where a question's payload is vocabulary, the three wrong choices are the
// OTHER WORDS FROM THAT LESSON. Ask what the anther does and the wrong answers
// are stigma, ovary and sepal — so a guess is a real guess, and a miss names
// the exact word that has not landed yet. Lesson 32 is the heaviest vocabulary
// load in either quarter, so every one of its ten is built that way.
//
// ---- READABILITY ----
//
// ~2.5, same bar as the lessons. Every prompt was written to hold ONE subject
// word at a time, which is what keeps the sentence-length rule satisfied.
// check-assessment.mjs will still flag the long-word rule on 'pollination',
// 'pollinator', 'mycorrhiza', 'mycelium' and the floral parts until its SUBJECT
// set is extended — the exact list to add is judgement call 6 in the header of
// m6Lessons.js. That is a checker update, not a rewrite of these questions:
// there is no shorter word for an anther.
//
// ---- SAFETY ----
//
// No dosing, no treatment, no "good for". This whole module is anatomy and who
// carries what. Four questions carry a safety rule instead of a fact, on
// purpose, and each one is the rule that matters for that lesson:
//   t-hbm602j  naming every part of a flower does not make it safe to taste
//   t-hbm603j  what you do when a bee lands on you
//   t-hbm604i  watching a working bee instead of touching it
//   t-hbm605j  garden fruit waits for a grown-up; grocery fruit does not
//   t-hbm606j  a wild mushroom is never picked up
// ---------------------------------------------------------------------------

export const HERBALISM_M6_NEW_BANK = [
  // ------------------- L32 · hb-m6-02 · Inside a flower -------------------
  {
    id: 't-hbm602a',
    lesson: 'hb-m6-02',
    prompt: 'What is the anther?',
    choices: [
      'The sticky tip of the pistil',
      'The knob that makes pollen',
      'The green flap under the petals',
      'The fat bottom of the pistil'
    ],
    answer: 1,
    feedback: [
      'That is the stigma.',
      null,
      'That is a sepal.',
      'That is the ovary.'
    ],
    why: 'The anther sits on top of a stamen. Pollen is made there and nowhere else.'
  },
  {
    id: 't-hbm602b',
    lesson: 'hb-m6-02',
    prompt: 'Pollen has to land on which part?',
    choices: [ 'The anther', 'The sepal', 'The ovule','The stigma'],
    answer: 3,
    feedback: [
      'The anther is where pollen comes from.',
      'A sepal held the bud shut. Nothing lands there.',
      'An ovule is buried inside the ovary.'
    ,
      null],
    why: 'The stigma is sticky for exactly this reason. It is the landing pad.'
  },
  {
    id: 't-hbm602c',
    lesson: 'hb-m6-02',
    prompt: 'What is a sepal?',
    choices: [
      'A green flap that held the bud shut',
      'The part that makes pollen',
      'A tiny egg inside the ovary'
    ,
      'The bright part of the flower'],
    answer: 0,
    feedback: [
      null,
      'That is the anther.',
      'That is an ovule.'
    ,
      'That is a petal.'],
    why: 'Sepals are the outside ring. Bend a petal back and you will find them.'
  },
  {
    id: 't-hbm602d',
    lesson: 'hb-m6-02',
    prompt: 'Where does a seed start out?',
    choices: ['In the anther', 'In the petal', 'As an ovule in the ovary', 'On the stigma'],
    answer: 2,
    feedback: [
      'The anther makes pollen, not seeds.',
      'A petal is a sign. It makes nothing.',
      null,
      'Pollen lands on the stigma. The seed is made lower down.'
    ],
    why: 'Seeds are made inside the flower first. Only much later do they go in soil.'
  },
  {
    id: 't-hbm602e',
    lesson: 'hb-m6-02',
    prompt: 'You count nine ovules in an ovary. How many seeds could it make?',
    choices: [ 'Eighteen', 'None','Nine', 'One'],
    answer: 2,
    feedback: [
      'Each ovule makes one seed, not two.',
      'An ovule is exactly what a seed starts as.'
    ,
      null,
      'One ovule makes one seed. You counted nine of them.'],
    why: 'One ovule, one seed. Counting ovules tells you the most it can ever make.'
  },
  {
    id: 't-hbm602f',
    lesson: 'hb-m6-02',
    prompt: 'Which part is the whole middle piece that makes seeds?',
    choices: [ 'The pistil', 'The sepal', 'The petal','The stamen'],
    answer: 0,
    feedback: [
      null,
      'Sepals are the green flaps outside.',
      'Petals are the bright ring outside.'
    ,
      'Stamens make a ring around it.'],
    why: 'The pistil is stigma, style and ovary together. One of them, in the middle.'
  },
  {
    id: 't-hbm602g',
    lesson: 'hb-m6-02',
    prompt: 'Name the rings of a flower from the outside in.',
    choices: [
      'Stamens, pistil, petals, sepals',
      'Pistil, stamens, sepals, petals'
    ,
      'Petals, sepals, pistil, stamens',
      'Sepals, petals, stamens, pistil'],
    answer: 3,
    feedback: [
      'That is the order from the inside out.',
      'The pistil is the last thing you reach, not the first.'
    ,
      'Sepals are outside the petals, not inside them.',
      null],
    why: 'Take it apart in that order and nothing gets muddled.'
  },
  {
    id: 't-hbm602h',
    lesson: 'hb-m6-02',
    prompt: 'Why are petals bright?',
    choices: [
      'To hold the bud shut',
      'To tell animals where to land',
      'To hold the seeds'
    ,
      'To make pollen'],
    answer: 1,
    feedback: [
      'The sepals did that job.',
      null,
      'The ovary holds the seeds.'
    ,
      'The anther makes pollen.'],
    why: 'A petal is a sign, not a decoration. It is aimed at a visitor.'
  },
  {
    id: 't-hbm602i',
    lesson: 'hb-m6-02',
    prompt: 'A flower has no bright petals and no smell. Who is it built for?',
    choices: [ 'The wind', 'A hummingbird','A bee', 'A butterfly'],
    answer: 0,
    feedback: [
      null,
      'A bird wants bright colour and a deep tube.'
    ,
      'A bee is drawn in by colour and scent.',
      'A butterfly wants a bright flat petal to stand on.'],
    why: 'Wind cannot see or smell. Paying for petals and scent would be a waste.'
  },
  {
    id: 't-hbm602j',
    lesson: 'hb-m6-02',
    prompt: 'You took a lily apart and named every part. Can you taste a piece?',
    choices: [
      'Yes, if it smells sweet',
      'Only the petal',
      'No. Ask a grown-up first, every time'
    ,
      'Yes, you named all the parts'],
    answer: 2,
    feedback: [
      'A sweet smell tells you nothing about safety.',
      'A petal is a plant part like any other.',
      null
    ,
      'Naming a plant does not make it safe.'],
    why: 'The first rule of the field. A named flower is still one you ask about.'
  },

  // ------------- L33 · hb-m6-03 · Bees, butterflies, birds and wind -------------
  {
    id: 't-hbm603a',
    lesson: 'hb-m6-03',
    prompt: 'What does pollination mean?',
    choices: [
      'A fruit swelling up'
    ,
      'Moving pollen from an anther to a stigma',
      'A seed waking up',
      'A flower making nectar'],
    answer: 1,
    feedback: [
      'That happens after pollination, not instead of it.'
    ,
      null,
      'That is germination, from Module 1.',
      'Nectar is the payment, not the job.'],
    why: 'It is one trip: off the anther, onto the stigma. Everything else follows it.'
  },
  {
    id: 't-hbm603b',
    lesson: 'hb-m6-03',
    prompt: 'What is nectar for?',
    choices: [ 'Making pollen', 'Holding the bud shut','Feeding the seeds', 'Paying the visitor'],
    answer: 3,
    feedback: [
      'Pollen is made in the anther.',
      'The sepals did that.'
    ,
      'Seeds are fed later, by the plant itself.',
      null],
    why: 'Nectar is the wage. The animal drinks and carries pollen away without meaning to.'
  },
  {
    id: 't-hbm603c',
    lesson: 'hb-m6-03',
    prompt: 'A flower is a deep red tube with nowhere to land. Who comes?',
    choices: [ 'A beetle', 'An ant', 'The wind','A hummingbird'],
    answer: 3,
    feedback: [
      'A beetle has to land and crawl about.',
      'An ant walks. It cannot reach up into a hanging tube.',
      'Wind flowers are small and dull, not red and deep.'
    ,
      null],
    why: 'Only a bird that hovers can drink without standing on anything.'
  },
  {
    id: 't-hbm603d',
    lesson: 'hb-m6-03',
    prompt: 'What does a corn tassel do?',
    choices: ['Catches pollen', 'Makes pollen', 'Makes nectar', 'Holds the ear on'],
    answer: 1,
    feedback: [
      'The silks catch it, lower down.',
      null,
      'Corn makes no nectar at all.',
      'The stalk holds the ear on.'
    ],
    why: 'The tassel is corn on the giving end. It stands on top so wind can take it.'
  },
  {
    id: 't-hbm603e',
    lesson: 'hb-m6-03',
    prompt: 'What does a corn silk do?',
    choices: [ 'Holds water','Makes pollen', 'Catches pollen', 'Feeds the plant'],
    answer: 2,
    feedback: [
      'A silk is a thread, not a store.'
    ,
      'The tassel makes it.',
      null,
      'Leaves feed the plant.'],
    why: 'A silk is corn on the catching end. One silk caught, one kernel made.'
  },
  {
    id: 't-hbm603f',
    lesson: 'hb-m6-03',
    prompt: 'Why are wind-pollinated flowers small and dull?',
    choices: [
      'Wind cannot see colour',
      'They are not finished growing',
      'They are sick',
      'Wind prefers small flowers'
    ],
    answer: 0,
    feedback: [
      null,
      'They are fully grown. That is how they stay.',
      'There is nothing wrong with them.',
      'Wind has no preferences at all.'
    ],
    why: 'Colour and scent cost the plant something. Wind will not pay for either.'
  },
  {
    id: 't-hbm603g',
    lesson: 'hb-m6-03',
    prompt: 'You tapped a corn tassel and yellow dust fell. What was it?',
    choices: [ 'Soil','Pollen', 'Nectar', 'Seeds'],
    answer: 1,
    feedback: [
      'Soil does not come out of a tassel.'
    ,
      null,
      'Nectar is a sweet liquid, and corn makes none.',
      'Seeds form later, down on the ear.'],
    why: 'That dust is the whole point of the tassel. It has to reach a silk.'
  },
  {
    id: 't-hbm603h',
    lesson: 'hb-m6-03',
    prompt: 'A bee is fuzzy all over. Why does that matter to a flower?',
    choices: [
      'It keeps her warm at night',
      'It helps her fly faster',
      'It scares birds off'
    ,
      'Pollen catches on the fuzz'],
    answer: 3,
    feedback: [
      'True enough, but the flower does not care about that.',
      'Her wings do the flying.',
      'Fuzz frightens nothing.'
    ,
      null],
    why: 'A smooth bee would carry almost nothing. The fuzz is what does the work.'
  },
  {
    id: 't-hbm603i',
    lesson: 'hb-m6-03',
    prompt: 'Corn makes no nectar at all. Why is that fine?',
    choices: [
      'The wind carries its pollen for free',
      'Corn grows its own bees',
      'Corn does not need pollen',
      'Corn makes seeds without pollen'
    ],
    answer: 0,
    feedback: [
      null,
      'No plant grows bees.',
      'Every kernel on the cob needed a pollen grain.',
      'No pollen on a silk means no kernel there.'
    ],
    why: 'Nothing has to be paid, so nothing has to be made. Wind works for nothing.'
  },
  {
    id: 't-hbm603j',
    lesson: 'hb-m6-03',
    prompt: 'A bee lands on your arm while you are counting. What do you do?',
    choices: ['Swat it fast', 'Shake your arm hard', 'Stay still and let it go', 'Grab it gently'],
    answer: 2,
    feedback: [
      'Swatting is how people get stung.',
      'Shaking frightens it into stinging.',
      null,
      'Never grab a bee, however gently you mean it.'
    ],
    why: 'A bee on your arm is not attacking. Stand still and it leaves on its own.'
  },

  // ------------- L34 · hb-m6-04 · Making a pollinator patch -------------
  {
    id: 't-hbm604a',
    lesson: 'hb-m6-04',
    prompt: 'Why plant flowers in clumps of three?',
    choices: [
      'It looks tidier that way',
      'Bees can only count to three'
    ,
      'A clump is easier to spot from far off',
      'Three plants need less water'],
    answer: 2,
    feedback: [
      'Tidy is for us. The clump is for them.',
      'Bees are not counting anything.'
    ,
      null,
      'Three plants need more water, not less.'],
    why: 'One flower gets flown past. Three of a kind is a sign a bee can read.'
  },
  {
    id: 't-hbm604b',
    lesson: 'hb-m6-04',
    prompt: 'Why does a bee dish need pebbles in it?',
    choices: [
      'So bees can stand while they drink',
      'To stop it blowing away',
      'To keep birds out of it'
    ,
      'To keep the water cool'],
    answer: 0,
    feedback: [
      null,
      'A full saucer is heavy enough already.',
      'Birds are welcome. They pollinate too.'
    ,
      'Cool water is not the problem.'],
    why: 'Bees cannot swim. Without something to stand on, the dish drowns them.'
  },
  {
    id: 't-hbm604c',
    lesson: 'hb-m6-04',
    prompt: 'Where do most native bees nest?',
    choices: [ 'Inside flowers', 'In water','In a hive', 'In bare ground'],
    answer: 3,
    feedback: [
      'They feed at flowers. They do not nest in them.',
      'They cannot even swim in it.'
    ,
      'Honeybees do. Most native bees live alone.',
      null],
    why: 'Most native bees are solitary and dig a hole. Bare soil is their front door.'
  },
  {
    id: 't-hbm604d',
    lesson: 'hb-m6-04',
    prompt: 'What is bare ground?',
    choices: [
      'Soil under a rock'
    ,
      'Soil with no mulch or grass on it',
      'Soil with nothing growing for miles',
      'Dry, cracked soil'],
    answer: 1,
    feedback: [
      'Under a rock is covered, not bare.'
    ,
      null,
      'A bare patch can sit right beside a full pot.',
      'It does not have to be dry. Just uncovered.'],
    why: 'Bare means uncovered on top. A bee has to be able to start digging.'
  },
  {
    id: 't-hbm604e',
    lesson: 'hb-m6-04',
    prompt: 'Why pick plants that bloom at different times?',
    choices: [
      'So something is open all season',
      'So the patch looks busy',
      'So the plants do not crowd',
      'So bees do not get bored'
    ],
    answer: 0,
    feedback: [
      null,
      'How it looks is not the point.',
      'Crowding is about space, not about timing.',
      'A bee needs food, not variety.'
    ],
    why: 'A patch that shuts in July sends them elsewhere. They do not come back.'
  },
  {
    id: 't-hbm604f',
    lesson: 'hb-m6-04',
    prompt: 'You put bark mulch on every pot. Who lost out?',
    choices: [ 'Hummingbirds', 'The corn','Ground-nesting bees', 'Butterflies'],
    answer: 2,
    feedback: [
      'Hummingbirds nest up in trees and shrubs.',
      'Mulch helps the corn hold its water.'
    ,
      null,
      'Butterflies feed at flowers. Mulch does not stop them.'],
    why: 'A bee that digs cannot get through bark. One uncovered pot fixes it.'
  },
  {
    id: 't-hbm604g',
    lesson: 'hb-m6-04',
    prompt: 'Why change the bee dish water every few days?',
    choices: [
      'It turns green in one day'
    ,
      'Mosquitoes breed in still water',
      'Bees only drink fresh water',
      'The pebbles float away'],
    answer: 1,
    feedback: [
      'It takes far longer than a day.'
    ,
      null,
      'They will drink water that has stood a while.',
      'Pebbles sink. They always have.'],
    why: 'A dish you never change turns into a mosquito nursery. Tip it and refill it.'
  },
  {
    id: 't-hbm604h',
    lesson: 'hb-m6-04',
    prompt: 'What does habitat mean?',
    choices: [
      'A dish of water',
      'A group of bees'
    ,
      'A kind of flower',
      'The place an animal lives and feeds'],
    answer: 3,
    feedback: [
      'The dish is one part of it too.',
      'That is a group, not a place.'
    ,
      'A flower is one part of a habitat.',
      null],
    why: 'Habitat is the whole address: food, water and somewhere to nest.'
  },
  {
    id: 't-hbm604i',
    lesson: 'hb-m6-04',
    prompt: 'A bee is working on a flower right beside your hand. What do you do?',
    choices: [ 'Pick that flower', 'Put a cup over it','Blow on it', 'Step back and watch'],
    answer: 3,
    feedback: [
      'Picking it while she is on it earns a sting.',
      'Trapping a bee is how people get stung.'
    ,
      'Blowing on a bee makes it defend itself.',
      null],
    why: 'A working bee ignores you. Give it a step of room. Watch it work.'
  },
  {
    id: 't-hbm604j',
    lesson: 'hb-m6-04',
    prompt: 'Which three things does a pollinator patch give?',
    choices: [
      'Wind, rain and light'
    ,
      'Flowers, water and bare ground',
      'Mulch, shade and grass',
      'Sugar, salt and water'],
    answer: 1,
    feedback: [
      'Weather arrives on its own. You cannot build it.'
    ,
      null,
      'Mulch is the one thing you deliberately left off.',
      'Sugar water goes bad and is not what they came for.'],
    why: 'Food, a drink and a place to nest. All three in one spot is what makes them stay.'
  },

  // ------------- L35 · hb-m6-05 · Fruit is a seed's ride -------------
  {
    id: 't-hbm605a',
    lesson: 'hb-m6-05',
    prompt: 'Which part of a flower becomes the fruit?',
    choices: [ 'The sepal','The petal', 'The ovary', 'The anther'],
    answer: 2,
    feedback: [
      'Sepals stay on as the little dry star.'
    ,
      'Petals dry up and fall off first.',
      null,
      'The anther made the pollen, then dropped off.'],
    why: 'The ovary swells once pollen has arrived. That swollen ovary is the fruit.'
  },
  {
    id: 't-hbm605b',
    lesson: 'hb-m6-05',
    prompt: 'Why does a plant make sweet fruit?',
    choices: [ 'To get its seeds moved', 'To make pollen', 'To scare birds off','To feed itself'],
    answer: 0,
    feedback: [
      null,
      'Pollen is made long before, up in the anther.',
      'Sweet fruit brings birds in, not away.'
    ,
      'Leaves feed the plant. Fruit costs it energy.'],
    why: 'The fruit is the fare. An animal eats it and drops the seed somewhere new.'
  },
  {
    id: 't-hbm605c',
    lesson: 'hb-m6-05',
    prompt: 'What is one corn kernel?',
    choices: [ 'A pod','A fruit with one seed in it', 'A seed with no fruit', 'A flower'],
    answer: 1,
    feedback: [
      'A pod splits along a line. A kernel does not.'
    ,
      null,
      'The kernel skin is a fruit wall. It counts.',
      'The flower was the silk and the tassel, months back.'],
    why: 'Which means a cob is not one fruit. It is hundreds of them on a stick.'
  },
  {
    id: 't-hbm605d',
    lesson: 'hb-m6-05',
    prompt: 'Your corn ear has bare gaps with no kernels. Why?',
    choices: [
      'Those kernels fell off',
      'It was picked too early',
      'It got too much water'
    ,
      'Those silks caught no pollen'],
    answer: 3,
    feedback: [
      'Kernels grow on tight. They do not drop off.',
      'Early picking makes a small ear, not a gappy one.',
      'Too much water makes a poor plant, not gaps.'
    ,
      null],
    why: 'One silk, one kernel. A silk that missed out leaves a hole you can see.'
  },
  {
    id: 't-hbm605e',
    lesson: 'hb-m6-05',
    prompt: 'What is the little dry star on an apple bottom?',
    choices: ['The old sepals', 'The old roots', 'Dried pollen', 'Tiny seeds'],
    answer: 0,
    feedback: [
      null,
      'Roots stayed on the tree.',
      'Pollen went in the top of the flower, not the bottom.',
      'The seeds are in the middle, in the core.'
    ],
    why: 'The flower was joined right there. Its sepals never fell off.'
  },
  {
    id: 't-hbm605f',
    lesson: 'hb-m6-05',
    prompt: 'What does disperse mean?',
    choices: [ 'To sink down', 'To swell up','To spread out and away', 'To dry up'],
    answer: 2,
    feedback: [
      'Sinking is what a seed does if nothing moves it.',
      'Swelling is what the ovary does.'
    ,
      null,
      'Drying is how a seed is stored, not how it travels.'],
    why: "Getting away from the parent plant is a fruit's whole job."
  },
  {
    id: 't-hbm605g',
    lesson: 'hb-m6-05',
    prompt: 'A tomato plant came up under the bird feeder. How?',
    choices: [
      'It grew from an old root',
      'Rain washed it uphill'
    ,
      'A bird carried the seed there',
      'Wind rolled a tomato there'],
    answer: 2,
    feedback: [
      'There was never a tomato plant in that spot.',
      'Water runs downhill, not up.'
    ,
      null,
      'A whole tomato is far too heavy for wind.'],
    why: 'The bird got a meal and the seed got a ride. That is the deal working.'
  },
  {
    id: 't-hbm605h',
    lesson: 'hb-m6-05',
    prompt: 'Which comes first?',
    choices: [
      'The flower, then the fruit',
      'They both appear together',
      'Fruit can come with no flower'
    ,
      'The fruit, then the flower'],
    answer: 0,
    feedback: [
      null,
      'The petals have to fall before the ovary swells.',
      'No flower means no ovary, so no fruit.'
    ,
      'The fruit is made out of part of the flower.'],
    why: 'Flower, pollen, then swelling. You can watch it happen on a squash.'
  },
  {
    id: 't-hbm605i',
    lesson: 'hb-m6-05',
    prompt: 'A bean pod is a fruit. What is inside it?',
    choices: [ 'Nectar', 'Sepals','Pollen', 'Seeds'],
    answer: 3,
    feedback: [
      'Nectar was in the flower, and it is long gone.',
      'Sepals stay outside, at the stem end.'
    ,
      'Pollen never gets inside the ovary wall.',
      null],
    why: 'Every bean in that row was an ovule first. Open one and count them.'
  },
  {
    id: 't-hbm605j',
    lesson: 'hb-m6-05',
    prompt: 'You found a fruit growing in the garden. May you eat it?',
    choices: [
      'Only if it is red',
      'No. Ask a grown-up first, every time'
    ,
      'Yes, all garden fruit is safe',
      'Yes, if it smells sweet'],
    answer: 1,
    feedback: [
      'Red is not a safety colour. It is just a colour.',
      null
    ,
      'Plenty of garden fruit is not for eating.',
      'A sweet smell tells you nothing about safety.'],
    why: 'Grocery fruit is fine. Anything you found waits for a grown-up, every time.'
  },

  // ------------- L36 · hb-m6-06 · Partners underground -------------
  {
    id: 't-hbm606a',
    lesson: 'hb-m6-06',
    prompt: 'What is mycelium?',
    choices: [
      'The mat of fine fungal threads',
      'A kind of root',
      'A mushroom cap',
      'A mineral in the soil'
    ],
    answer: 0,
    feedback: [
      null,
      'Roots belong to the plant and are much thicker.',
      'The cap is only the fruit of the fungus.',
      'Minerals are what get traded along it.'
    ],
    why: 'The threads are the real body of the fungus. Most of it never shows.'
  },
  {
    id: 't-hbm606b',
    lesson: 'hb-m6-06',
    prompt: 'What does the plant give the fungus?',
    choices: [ 'Soil','Water', 'Sugar', 'Minerals'],
    answer: 2,
    feedback: [
      'Soil belongs to nobody in this deal.'
    ,
      'Water comes the other way.',
      null,
      'Minerals come the other way too.'],
    why: 'Only the plant has leaves. Only the plant can make sugar.'
  },
  {
    id: 't-hbm606c',
    lesson: 'hb-m6-06',
    prompt: 'What does the fungus give back?',
    choices: [ 'Sunlight', 'Water and minerals', 'Seeds','Sugar'],
    answer: 1,
    feedback: [
      'There is no sunlight down there at all.',
      null,
      'Fungi do not make seeds.'
    ,
      'Sugar goes the other way. The fungus cannot make any.'],
    why: 'Its threads reach into gaps far too small for a root.'
  },
  {
    id: 't-hbm606d',
    lesson: 'hb-m6-06',
    prompt: 'Why can a fungus not make its own food?',
    choices: [ 'It has no roots', 'It is too small', 'It lives underground','It has no leaves'],
    answer: 3,
    feedback: [
      'Roots do not make food. Leaves do.',
      'Size is not the problem here.',
      'Plenty of roots live underground and their plant still eats.'
    ,
      null],
    why: 'Making food out of sunlight needs leaves. No leaves, no food, so it trades.'
  },
  {
    id: 't-hbm606e',
    lesson: 'hb-m6-06',
    prompt: 'What is a mushroom?',
    choices: [ 'A kind of plant', 'A thick root','The whole fungus', 'The fruit of a fungus'],
    answer: 3,
    feedback: [
      'A fungus is not a plant. It has no leaves.',
      'Roots belong to plants.'
    ,
      'Most of the fungus is threads under the soil.',
      null],
    why: 'Like an apple on a tree. The mushroom is the part you happen to see.'
  },
  {
    id: 't-hbm606f',
    lesson: 'hb-m6-06',
    prompt: 'Why do thin threads beat thick roots at finding water?',
    choices: [
      'They can smell water'
    ,
      'They fit into smaller gaps',
      'They grow much faster',
      'They are stronger'],
    answer: 1,
    feedback: [
      'Nothing down there smells anything.'
    ,
      null,
      'Speed is not what gets them in there.',
      'They are far weaker than a root, in fact.'],
    why: 'Soil is mostly small gaps. A root is too fat to enter most of them.'
  },
  {
    id: 't-hbm606g',
    lesson: 'hb-m6-06',
    prompt: 'What is a mycorrhiza?',
    choices: [
      'A large mushroom',
      'A patch of rich soil'
    ,
      'A root and a fungus joined and trading',
      'A very long root'],
    answer: 2,
    feedback: [
      'The mushroom is only the fruit.',
      'Rich soil is a result of this, not the thing itself.'
    ,
      null,
      'A root on its own is just a root.'],
    why: 'The word means fungus-root. It names the partnership, not either partner.'
  },
  {
    id: 't-hbm606h',
    lesson: 'hb-m6-06',
    prompt: 'One tree in a forest was joined to how many others?',
    choices: [ 'Forty-seven', 'Just its own family','None', 'Two'],
    answer: 0,
    feedback: [
      null,
      'The threads do not care whose family a tree is in.'
    ,
      'Almost every tree there was joined to something.',
      'It was very many more than two.'],
    why: 'Forty-seven, through the threads. Sugar and warning signals can travel that far.'
  },
  {
    id: 't-hbm606i',
    lesson: 'hb-m6-06',
    prompt: 'Both sides give something the other needs. What is that called?',
    choices: [ 'Germination','A partnership', 'A habitat', 'Pollination'],
    answer: 1,
    feedback: [
      'Germination is a seed waking up.'
    ,
      null,
      'A habitat is a place, not a deal.',
      'Pollination is moving pollen.'],
    why: 'Nobody is being kind. Each one has what the other cannot get on its own.'
  },
  {
    id: 't-hbm606j',
    lesson: 'hb-m6-06',
    prompt: 'You find a mushroom growing in the yard. What do you do?',
    choices: [
      'Kick it over'
    ,
      'Taste a very small piece',
      'Pick it up and smell it',
      'Leave it and ask a grown-up'],
    answer: 3,
    feedback: [
      'It is doing a job down there. Leave it alone.'
    ,
      'Never. Some wild mushrooms are deadly.',
      'You do not pick up a wild mushroom at all.',
      null],
    why: 'A wild mushroom is looked at, never handled and never tasted. Ask first.'
  }
];

/** Every question for one lesson. */
export function itemsForLesson(lessonId) {
  return HERBALISM_M6_NEW_BANK.filter((q) => q.lesson === lessonId);
}

/** Every question across a list of lessons — what the weekly test draws from. */
export function itemsForLessons(lessonIds) {
  const set = new Set(lessonIds || []);
  return HERBALISM_M6_NEW_BANK.filter((q) => set.has(q.lesson));
}

export function m6BankItemById(id) {
  return HERBALISM_M6_NEW_BANK.find((q) => q.id === id) || null;
}

export default HERBALISM_M6_NEW_BANK;
