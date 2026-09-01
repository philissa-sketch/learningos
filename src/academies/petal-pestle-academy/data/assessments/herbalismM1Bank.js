// ---------------------------------------------------------------------------
// HERBALISM MODULE 1 — THE QUESTION BANK.
//
// Five questions per lesson, same as herbalismQ1Bank.js, and for the same three
// reasons: a re-take must be a different paper, interleaving needs a pool to
// draw from, and spaced review runs on these ids.
//
// ---- TEN PER LESSON, AND WHY THEY ARE NOT AT THE END OF THE LESSON ----
//
// Lamar's app carries TEN test questions per lesson. Copying that literally
// would break hers: his lesson is the whole session, and hers is 45 minutes
// with a 20-minute activity away from the screen in the middle. Ten questions
// do not fit, and a tired child answering question nine measures tiredness.
//
// So the ten exist and they live HERE. Three lessons at ten is a thirty-question
// pool, and Friday's weekly test draws eight from it. She gets his depth of
// assessment across a week rather than his depth in one sitting.
//
// Inside the lesson she answers five: two Apply-It questions in the beats, and
// a three-question check. Two of those five arrive while the teaching is still
// going on, which is the whole point of beats.
//
// ---- THE FIRST FIVE TEST THE VOCABULARY, ON PURPOSE ----
//
// Lesson 1 is built to its video, and the video's whole payload is five words:
// seed coat, embryo, endosperm, dormant, germination. A child who can pick the
// right one out of four has had the lesson. A child who cannot has watched a
// nice video.
//
// So there is one question per word, and every wrong choice is one of the OTHER
// four words rather than a filler — which means a guess is a real guess, and a
// miss tells you exactly which word she has not got yet.
//
// WRITING RULES, unchanged:
//
//  * Reading level ~2.5. Her reading is the constraint, not her age. The five
//    subject words are exempt from the long-word count for the same reason
//    "photosynthesis" is: you cannot teach the endosperm in a shorter word.
//  * Every wrong choice gets its OWN sentence saying why it is wrong.
//  * The right answer moves around.
//  * NO DOSING. Question five deliberately tests the opposite.
// ---------------------------------------------------------------------------

export const HERBALISM_M1_BANK = [
  // ------------------- L1 · Inside a seed -------------------
  {
    id: 't-hbm101a',
    lesson: 'hb-m1-01',
    prompt: 'What is the embryo?',
    choices: ['The hard skin outside', 'The tiny baby plant', 'The food packed inside', 'The first root'],
    answer: 1,
    feedback: [
      'That is the seed coat.',
      null,
      'That is the endosperm.',
      'The root comes out of the embryo later.'
    ],
    why: 'The embryo is the baby plant. It is inside the seed the whole time.'
  },
  {
    id: 't-hbm101b',
    lesson: 'hb-m1-01',
    prompt: 'A bean sits in a bag with no dirt and still grows. What fed it?',
    choices: ['The paper towel', 'The water', 'Its own endosperm', 'The bag'],
    answer: 2,
    feedback: [
      'Paper is not food.',
      'Water woke it up. Water is not food.',
      null,
      'A bag is just a bag.'
    ],
    why: 'The endosperm is packed in beside the baby plant. It is lunch until leaves can make food.'
  },
  {
    id: 't-hbm101c',
    lesson: 'hb-m1-01',
    prompt: 'What does the seed coat do?',
    choices: [
      'Keeps the baby plant safe and dry',
      'Feeds the baby plant',
      'Grows down into the soil',
      'Makes the flower'
    ],
    answer: 0,
    feedback: [
      null,
      'The endosperm does the feeding.',
      'That is the root.',
      'Flowers come much later.'
    ],
    why: 'The coat is the hard skin. It also senses when the spot is right.'
  },
  {
    id: 't-hbm101d',
    lesson: 'hb-m1-01',
    prompt: 'Rice in a jar has waited a year. What word fits it?',
    choices: ['Germination', 'Sprouted', 'Dormant', 'Dead'],
    answer: 2,
    feedback: [
      'Germination is the waking up. This one has not.',
      'Sprouted means it broke out into the air.',
      null,
      'It is alive. Plant it and see.'
    ],
    why: 'Dormant means alive but asleep. Some seeds wait for hundreds of years.'
  },
  {
    id: 't-hbm101e',
    lesson: 'hb-m1-01',
    prompt: 'You can name all three parts of a seed. Can you taste it?',
    choices: [
      'Yes, naming it means it is safe',
      'Yes, if it smells fine',
      'Only if it is green',
      'No. Ask a grown-up first, every time'
    ],
    answer: 3,
    feedback: [
      'Naming a plant is not the same as knowing it is safe.',
      'A good smell tells you nothing about safety.',
      'Green does not mean safe.',
      null
    ],
    why: 'The first rule of the field. A plant you can name is still a plant you ask about.'
  },
  {
    id: 't-hbm101f',
    lesson: 'hb-m1-01',
    prompt: 'What is germination?',
    choices: ['A seed waking up and starting to grow', 'A seed going to sleep', 'A seed drying out', 'A flower opening'],
    answer: 0,
    feedback: [
      null,
      'That is dormant. The opposite.',
      'Drying out is how a seed gets stored.',
      'Flowers come much later.'
    ],
    why: 'Germination is the waking up. Water, warmth and light give the signal.'
  },
  {
    id: 't-hbm101g',
    lesson: 'hb-m1-01',
    prompt: 'You plant a bean upside down. Which way does the root grow?',
    choices: ['Up, the wrong way', 'Sideways', 'Down anyway', 'It does not grow'],
    answer: 2,
    feedback: [
      'A seed can tell which way is down.',
      'It turns until it is heading down.',
      null,
      'It grows. It just turns first.'
    ],
    why: 'A seed senses gravity. The root heads down however you plant it.'
  },
  {
    id: 't-hbm101h',
    lesson: 'hb-m1-01',
    prompt: 'Which three things does a seed need to germinate?',
    choices: [
      'Soil, seeds and a pot',
      'Water, warmth and the right light',
      'Sugar, salt and water',
      'Wind, rain and a bee'
    ],
    answer: 1,
    feedback: [
      'A bean in a wet paper towel has no soil and still grows.',
      null,
      'A seed does not need sugar or salt.',
      'A bee helps a flower, not a seed waking up.'
    ],
    why: 'Your four bags tested exactly this. Take one away and see what happens.'
  },
  {
    id: 't-hbm101i',
    lesson: 'hb-m1-01',
    prompt: 'Your bean in the dark closet sprouted. What does that tell you?',
    choices: [
      'The closet had a secret light',
      'A seed does not need light to wake up',
      'The bean was already sprouted',
      'Dark is better than light'
    ],
    answer: 1,
    feedback: [
      'It was closed the whole time.',
      null,
      'It was a dry bean on day one. You saw it.',
      'It needs light later, once its lunch runs out.'
    ],
    why: 'A seed carries its own food. Light matters after the endosperm is gone.'
  },
  {
    id: 't-hbm101j',
    lesson: 'hb-m1-01',
    prompt: 'What comes out of the seed AFTER the root?',
    choices: ['The flower', 'The shoot', 'Another root', 'The seed coat'],
    answer: 1,
    feedback: [
      'A flower is a long way off.',
      null,
      'One root comes first. More come later.',
      'The coat cracks and stays behind.'
    ],
    why: 'Root down first, then the shoot up. Stem and first leaves together.'
  }
];

export default HERBALISM_M1_BANK;
