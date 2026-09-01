// ---------------------------------------------------------------------------
// HERBALISM QUARTER 1 — THE QUESTION BANK.
//
// Sixty-five questions, five for every lesson. Tests are BUILT from this bank,
// they are not stored as fixed papers. That difference matters for three
// reasons, and all three are about retention rather than tidiness.
//
// ---- 1. A RE-TAKE MUST NOT BE THE SAME PAPER ----
//
// A child who re-takes the identical ten questions two days later is not
// showing she learned the material. She is showing she remembers the paper.
// Five questions per lesson means a second form can be mostly different
// questions about exactly the same ideas, which is the only re-take worth
// giving.
//
// ---- 2. INTERLEAVING NEEDS A POOL TO DRAW FROM ----
//
// Every unit test pulls three questions from earlier units, and the quarterly
// test is cumulative. Neither is possible if questions belong to one paper.
// Here every question knows only which LESSON taught it, and any test can ask
// for whatever mix it needs.
//
// ---- 3. SPACED REVIEW WORKS ON THESE SAME IDS ----
//
// A question she misses in a unit test is the same object that comes back in
// her warm-up the next morning, then three days later, then a week. One bank,
// one id, one memory of how she did.
//
// ---- WRITING RULES ----
//
// * Reading level about 2.5, the same as the lessons. Her reading is the
//   constraint, not her age, and a test written at her age would measure her
//   reading instead of her botany. check-readability holds this file to it.
//
// * Every wrong choice gets its OWN sentence saying why it is wrong. Not a red
//   cross. A wrong answer she understands is worth more than a right one she
//   guessed, and this is the whole of that idea in practice.
//
// * The right answer moves around. The lesson checks in herbalismQ1.js all have
//   the answer in position A — fine inside a lesson where nothing is at stake,
//   and a real flaw in a test, because a child works out the pattern in about
//   four questions and stops reading. check-assessment.mjs fails the build if
//   any position holds more than 35% of the answers.
//
// * NO DOSING. NO "TAKE THIS FOR THAT". No question in this bank asks what a
//   plant is good for, treats, cures or helps. Several deliberately test the
//   opposite — that a plant she can NAME is still a plant she may not taste.
//   check-assessment.mjs fails the build on the language of treatment.
// ---------------------------------------------------------------------------

/**
 * @typedef {object} BankItem
 * @property {string}   id       Stable. Used by the review boxes; never renumber.
 * @property {string}   lesson   The lesson that taught this. Drives "go back to".
 * @property {string}   prompt
 * @property {string[]} choices
 * @property {number}   answer   Index into choices.
 * @property {string[]} feedback Per choice. null in the correct slot.
 * @property {string}   why      Said after a correct answer, and in the review.
 */

import { HERBALISM_M1_BANK } from './herbalismM1Bank.js';

export const HERBALISM_Q1_BANK = [
  // ------------------------- L1 · The parts of a plant -------------------------
  {
    id: 't-hb101a',
    lesson: 'hb-1-01',
    prompt: 'Which part holds a plant down in the soil?',
    choices: ['The stem', 'The roots', 'The flower', 'The leaves'],
    answer: 1,
    feedback: [
      'The stem holds the plant up, not down.',
      null,
      'The flower makes seeds.',
      'Leaves catch the light.'
    ],
    why: 'Roots grip the soil so wind cannot pull the plant over.'
  },
  {
    id: 't-hb101b',
    lesson: 'hb-1-01',
    prompt: 'A young plant has no flower. What does that most likely mean?',
    choices: ['It is dead', 'It has lost its roots', 'It is still young', 'It is not a plant'],
    answer: 2,
    feedback: [
      'A green plant with leaves is alive.',
      'Roots are under the soil where you cannot see them.',
      null,
      'Plenty of plants have no flower yet.'
    ],
    why: 'Flowers come later. A plant with no flower is often just young.'
  },
  {
    id: 't-hb101c',
    lesson: 'hb-1-01',
    prompt: 'Which part catches the light?',
    choices: ['The leaves', 'The roots', 'The seeds', 'The soil'],
    answer: 0,
    feedback: [null, 'Roots sit in the dark.', 'Seeds wait inside the flower.', 'Soil is not part of the plant.'],
    why: 'Leaves are flat and wide so they can catch as much light as they can.'
  },
  {
    id: 't-hb101d',
    lesson: 'hb-1-01',
    prompt: 'Wind pushes hard on a plant but it stays up. Which part is doing that work?',
    choices: ['The petals', 'The pollen', 'The roots', 'The seeds'],
    answer: 2,
    feedback: [
      'Petals are light and thin.',
      'Pollen is a dust. It holds nothing.',
      null,
      'Seeds are not fixed to the ground.'
    ],
    why: 'Roots grip the soil. That grip is what keeps a plant standing.'
  },
  {
    id: 't-hb101e',
    lesson: 'hb-1-01',
    prompt: 'Which list gives the four main parts of a plant?',
    choices: [
      'Root, stem, leaf, flower',
      'Root, rock, leaf, sun',
      'Stem, soil, seed, rain',
      'Leaf, bee, root, wind'
    ],
    answer: 0,
    feedback: [
      null,
      'A rock is not part of a plant. The sun is not either.',
      'Soil and rain are around the plant, not part of it.',
      'A bee visits a plant. It does not belong to one.'
    ],
    why: 'Root, stem, leaf, flower. Every plant you meet is built from these.'
  },

  // ------------------------------ L2 · What roots do ------------------------------
  {
    id: 't-hb102a',
    lesson: 'hb-1-02',
    prompt: 'What do roots take in from the soil?',
    choices: ['Light', 'Water', 'Pollen', 'Air only'],
    answer: 1,
    feedback: [
      'No light reaches under the soil.',
      null,
      'Pollen moves between flowers, up in the air.',
      'Roots need some air, but water is the main thing.'
    ],
    why: 'Roots drink. Water goes in at the roots and up the stem.'
  },
  {
    id: 't-hb102b',
    lesson: 'hb-1-02',
    prompt: 'A carrot is a fat, sweet root. What is it doing?',
    choices: ['Making seeds', 'Storing food', 'Catching light', 'Holding pollen'],
    answer: 1,
    feedback: [
      'Seeds are made in the flower.',
      null,
      'Roots are in the dark. They catch nothing.',
      'Pollen belongs to the flower.'
    ],
    why: 'Some roots hold a store of food. That store is why a carrot is sweet.'
  },
  {
    id: 't-hb102c',
    lesson: 'hb-1-02',
    prompt: 'You stand a cut stem in a jar of water. What may grow?',
    choices: ['A flower', 'Seeds', 'Small white roots', 'Nothing ever'],
    answer: 2,
    feedback: [
      'A cut stem has no way to make a flower yet.',
      'Seeds need a flower first.',
      null,
      'Many stems will root in water.'
    ],
    why: 'A stem in water often grows new roots. It is looking for a drink.'
  },
  {
    id: 't-hb102d',
    lesson: 'hb-1-02',
    prompt: 'Besides drinking, what else do roots do?',
    choices: ['Hold the plant in place', 'Make pollen', 'Open the petals', 'Catch the light'],
    answer: 0,
    feedback: [
      null,
      'Pollen is made in the flower.',
      'Petals open by themselves.',
      'Leaves do the light job.'
    ],
    why: 'Roots have two jobs: they drink, and they hold on.'
  },
  {
    id: 't-hb102e',
    lesson: 'hb-1-02',
    prompt: 'A plant falls over after its roots are cut. Why?',
    choices: ['It has no leaves left', 'Nothing is gripping the soil', 'Its stem turned square', 'Light cannot reach it'],
    answer: 1,
    feedback: [
      'Its leaves are still on the stem.',
      null,
      'Stem shape has nothing to do with falling.',
      'Light still lands on it while it lies down.'
    ],
    why: 'Cut the roots and the grip is gone. Nothing holds the plant up.'
  },

  // ---------------------------- L3 · What the stem does ----------------------------
  {
    id: 't-hb103a',
    lesson: 'hb-1-03',
    prompt: 'What travels UP inside the stem?',
    choices: ['Soil', 'Pollen', 'Light', 'Water'],
    answer: 3,
    feedback: [
      'Soil stays in the ground.',
      'Pollen moves through the air, not the stem.',
      'Light lands on leaves. It does not travel inside a plant.',
      null
    ],
    why: 'Water goes up the stem from the roots to the leaves.'
  },
  {
    id: 't-hb103b',
    lesson: 'hb-1-03',
    prompt: 'You roll a stem and feel four flat sides. The plant is probably —',
    choices: ['A rose', 'In the mint family', 'A carrot', 'A fern'],
    answer: 1,
    feedback: [
      'Rose stems are round, with thorns.',
      null,
      'Carrot stems are round.',
      'Ferns have no flowers and round stalks.'
    ],
    why: 'A square stem is the mint family sign. Very few other plants have one.'
  },
  {
    id: 't-hb103c',
    lesson: 'hb-1-03',
    prompt: 'A plant in deep shade grows tall and thin. Why?',
    choices: ['It is reaching for light', 'It is too warm', 'It is thirsty', 'It has too many leaves'],
    answer: 0,
    feedback: [
      null,
      'Warmth does not stretch a stem.',
      'A thirsty plant droops. It does not stretch.',
      'Extra leaves would make it wider, not thinner.'
    ],
    why: 'The stem grows toward light. In shade it has further to reach.'
  },
  {
    id: 't-hb103d',
    lesson: 'hb-1-03',
    prompt: 'Food made in the leaves travels —',
    choices: ['Out into the air', 'Down through the stem', 'Straight into the soil', 'Up to the sun'],
    answer: 1,
    feedback: [
      'Food stays inside the plant.',
      null,
      'It goes to the roots through the stem, not through the soil.',
      'Nothing travels from a plant to the sun.'
    ],
    why: 'Water goes up the stem and food comes back down it. Two-way traffic.'
  },
  {
    id: 't-hb103e',
    lesson: 'hb-1-03',
    prompt: 'Why is stem shape worth writing in your journal?',
    choices: ['It makes the plant grow', 'It changes the colour', 'It is a clue to the name', 'It keeps bugs away'],
    answer: 2,
    feedback: [
      'Writing something down does not change how it grows.',
      'Shape and colour are two different things.',
      null,
      'Shape has nothing to do with pests.'
    ],
    why: 'Round or square is quick to check and it rules a lot of plants out.'
  },

  // ----------------------------- L4 · What leaves do -----------------------------
  {
    id: 't-hb104a',
    lesson: 'hb-1-04',
    prompt: 'What two things does a leaf need to make food?',
    choices: ['Light and air', 'Soil and rocks', 'Pollen and bees', 'Wind and dark'],
    answer: 0,
    feedback: [
      null,
      'Roots deal with the soil. Rocks do nothing.',
      'Those belong to the flower.',
      'A leaf in the dark makes nothing at all.'
    ],
    why: 'A leaf takes in light and air and turns them into food.'
  },
  {
    id: 't-hb104b',
    lesson: 'hb-1-04',
    prompt: 'The lines you can see inside a leaf are —',
    choices: ['Cracks', 'Veins', 'Roots', 'Teeth'],
    answer: 1,
    feedback: [
      'A cracked leaf is a damaged one. These lines are meant to be there.',
      null,
      'Roots are under the soil.',
      'Teeth are points on the edge, not lines inside.'
    ],
    why: 'Veins are pipes. Water comes in through them and food goes out.'
  },
  {
    id: 't-hb104c',
    lesson: 'hb-1-04',
    prompt: 'Why are most leaves flat and wide?',
    choices: ['To hold rain', 'To scare insects', 'To catch more light', 'To stay warm'],
    answer: 2,
    feedback: [
      'Rain runs straight off a leaf.',
      'Insects are not put off by a wide leaf.',
      null,
      'A wide leaf is not a warm one.'
    ],
    why: 'More flat surface means more light caught, and more food made.'
  },
  {
    id: 't-hb104d',
    lesson: 'hb-1-04',
    prompt: 'A plant is shut in a dark cupboard for weeks. What happens?',
    choices: ['It runs out of food', 'It grows faster', 'It makes more flowers', 'Nothing changes'],
    answer: 0,
    feedback: [
      null,
      'Plants grow badly in the dark.',
      'Flowers take even more food than leaves do.',
      'Light matters a great deal to a plant.'
    ],
    why: 'No light means the leaves cannot make food. The plant lives on its store, then fades.'
  },
  {
    id: 't-hb104e',
    lesson: 'hb-1-04',
    prompt: 'Which part of a plant makes its food?',
    choices: ['The root', 'The stem', 'The leaf', 'The seed'],
    answer: 2,
    feedback: [
      'Roots drink and hold on. Some store food, but none make it.',
      'The stem carries food. It does not make it.',
      null,
      'A seed holds a store of food from its parent plant.'
    ],
    why: 'Only the leaf can make food. No other part can do this job.'
  },

  // ------------------------------ L5 · Leaf shapes ------------------------------
  {
    id: 't-hb105a',
    lesson: 'hb-1-05',
    prompt: 'Which is the best note to write in a field journal?',
    choices: ['Very pretty', 'Long and pointed', 'My favourite one', 'Quite nice'],
    answer: 1,
    feedback: [
      'That tells you nothing about the leaf.',
      null,
      'That is about you, not the plant.',
      'Nobody could find the plant again from that.'
    ],
    why: 'Say what you see. A herbalist writes shape, not opinion.'
  },
  {
    id: 't-hb105b',
    lesson: 'hb-1-05',
    prompt: 'Rosemary leaves look most like —',
    choices: ['Hearts', 'Needles', 'Circles', 'Fans'],
    answer: 1,
    feedback: [
      'Some leaves are heart shaped. Rosemary is not.',
      null,
      'Rosemary leaves are long and narrow, not round.',
      'A fan is wide. Rosemary is thin.'
    ],
    why: 'Short, narrow and sharp at the tip — like a small green needle.'
  },
  {
    id: 't-hb105c',
    lesson: 'hb-1-05',
    prompt: 'Basil leaves are shaped most like —',
    choices: ['An egg', 'A needle', 'A star', 'A tube'],
    answer: 0,
    feedback: [
      null,
      'That is rosemary, not basil.',
      'Leaves are almost never star shaped.',
      'Basil leaves are flat, not rolled.'
    ],
    why: 'Wide at the base and coming to a point — an egg shape.'
  },
  {
    id: 't-hb105d',
    lesson: 'hb-1-05',
    prompt: 'Why does leaf shape matter to a herbalist?',
    choices: ['It makes the plant grow', 'It changes the smell', 'It helps name the plant', 'It waters the plant'],
    answer: 2,
    feedback: [
      'Naming a plant does not change how it grows.',
      'Smell comes from oils in the leaf, not its shape.',
      null,
      'Shape has nothing to do with water.'
    ],
    why: 'Shape is the first clue. No two kinds of plant have quite the same leaf.'
  },
  {
    id: 't-hb105e',
    lesson: 'hb-1-05',
    prompt: 'You line four leaves up from widest to thinnest. You are sorting by —',
    choices: ['Colour', 'Age', 'Smell', 'Shape'],
    answer: 3,
    feedback: [
      'They could all be the same green.',
      'A wide leaf is not an old leaf.',
      'You cannot smell how wide a leaf is.',
      null
    ],
    why: 'Wide and thin are shape words. That is exactly what you were sorting.'
  },

  // --------------------------- L6 · The edge of a leaf ---------------------------
  {
    id: 't-hb106a',
    lesson: 'hb-1-06',
    prompt: 'A leaf edge with small sharp points is called —',
    choices: ['Smooth', 'Lobed', 'Toothed', 'Round'],
    answer: 2,
    feedback: [
      'Smooth means no points at all.',
      'Lobed means big soft curves.',
      null,
      'Round is a shape word, not an edge word.'
    ],
    why: 'Toothed. Small points, like the edge of a saw.'
  },
  {
    id: 't-hb106b',
    lesson: 'hb-1-06',
    prompt: 'A leaf edge with big soft curves is called —',
    choices: ['Lobed', 'Toothed', 'Smooth', 'Narrow'],
    answer: 0,
    feedback: [
      null,
      'Toothed means small sharp points.',
      'Smooth has no curves cut into it.',
      'Narrow is about width, not the edge.'
    ],
    why: 'Lobed. An oak leaf is the one everybody knows.'
  },
  {
    id: 't-hb106c',
    lesson: 'hb-1-06',
    prompt: 'Two leaves are the same shape. One is toothed and one is smooth. So they are —',
    choices: ['The same plant', 'Different plants', 'Both dead', 'Both weeds'],
    answer: 1,
    feedback: [
      'The edge is a real difference, not a small one.',
      null,
      'Both can be perfectly alive.',
      'Neither has to be a weed.'
    ],
    why: 'Shape alone is not enough. The edge splits two plants that look alike.'
  },
  {
    id: 't-hb106d',
    lesson: 'hb-1-06',
    prompt: 'Why look at two or three leaves instead of one?',
    choices: ['To pick the best one', 'To count them', 'Leaves on one plant can differ', 'To make it grow'],
    answer: 2,
    feedback: [
      'You are looking, not choosing.',
      'The number of leaves is not a clue.',
      null,
      'Looking at a plant does not change its growing.'
    ],
    why: 'Young leaves at the top often look different from old ones lower down.'
  },
  {
    id: 't-hb106e',
    lesson: 'hb-1-06',
    prompt: 'An edge with no bumps or points at all is —',
    choices: ['Toothed', 'Lobed', 'Smooth', 'Veined'],
    answer: 2,
    feedback: [
      'Toothed edges are covered in points.',
      'Lobed edges curve in and out.',
      null,
      'Veins are inside the leaf, not on the edge.'
    ],
    why: 'Smooth. Run your finger round it and feel nothing catch.'
  },

  // ----------------------- L7 · How leaves sit on the stem -----------------------
  {
    id: 't-hb107a',
    lesson: 'hb-1-07',
    prompt: 'Leaves growing straight across from each other are called —',
    choices: ['Alternate', 'Opposite', 'Toothed', 'Lobed'],
    answer: 1,
    feedback: [
      'Alternate means taking turns up the stem.',
      null,
      'That word is about the edge of a leaf.',
      'That word is about the edge too.'
    ],
    why: 'Opposite. They sit in pairs, facing each other.'
  },
  {
    id: 't-hb107b',
    lesson: 'hb-1-07',
    prompt: 'Leaves that take turns up the stem are called —',
    choices: ['Opposite', 'Paired', 'Alternate', 'Smooth'],
    answer: 2,
    feedback: [
      'Opposite means they sit across from each other.',
      'Paired is another word for opposite.',
      null,
      'Smooth is an edge word.'
    ],
    why: 'Alternate. One side, a gap, then the other side.'
  },
  {
    id: 't-hb107c',
    lesson: 'hb-1-07',
    prompt: 'A square stem and leaves in pairs points to —',
    choices: ['The mint family', 'A tree', 'A grass', 'A fern'],
    answer: 0,
    feedback: [
      null,
      'Tree stems are round and woody.',
      'Grass stems are round and hollow.',
      'Ferns have no flowers and no square stems.'
    ],
    why: 'Two clues together are much stronger than one. This pair means mint family.'
  },
  {
    id: 't-hb107d',
    lesson: 'hb-1-07',
    prompt: 'Sage leaves take turns up the stem. Sage leaves are —',
    choices: ['Opposite', 'Alternate', 'Toothed', 'Lobed'],
    answer: 1,
    feedback: [
      'Opposite would mean pairs, and these take turns.',
      null,
      'That word describes the edge, not the order.',
      'That word describes the edge too.'
    ],
    why: 'Taking turns is what alternate means.'
  },
  {
    id: 't-hb107e',
    lesson: 'hb-1-07',
    prompt: 'Where do you look to check how leaves are arranged?',
    choices: ['At the tip of the leaf', 'Where the leaf joins the stem', 'Under the soil', 'Inside the flower'],
    answer: 1,
    feedback: [
      'The tip tells you about shape, not order.',
      null,
      'Roots have no leaves.',
      'The flower is a separate clue.'
    ],
    why: 'Look at the join. Is there another leaf right across from it, or not?'
  },

  // ---------------------------- L8 · What a flower is for ----------------------------
  {
    id: 't-hb108a',
    lesson: 'hb-1-08',
    prompt: 'What is the main job of a flower?',
    choices: ['To look nice', 'To make seeds', 'To catch light', 'To hold the plant up'],
    answer: 1,
    feedback: [
      'It looks bright to insects, and there is a reason for that.',
      null,
      'Leaves catch the light.',
      'The stem holds the plant up.'
    ],
    why: 'A flower is how a plant makes the next plant.'
  },
  {
    id: 't-hb108b',
    lesson: 'hb-1-08',
    prompt: 'What do bees carry from flower to flower?',
    choices: ['Water', 'Soil', 'Pollen', 'Seeds'],
    answer: 2,
    feedback: [
      'Bees drink, but they do not ferry water about.',
      'Bees stay well out of the soil.',
      null,
      'Seeds form after the pollen has moved.'
    ],
    why: 'Pollen is a yellow dust. It sticks to a bee and rides to the next flower.'
  },
  {
    id: 't-hb108c',
    lesson: 'hb-1-08',
    prompt: 'Bright petals are best described as —',
    choices: ['A sign for insects', 'A way to stay warm', 'A kind of leaf edge', 'A sort of root'],
    answer: 0,
    feedback: [
      null,
      'Colour adds no warmth.',
      'Edges belong to leaves.',
      'Roots are under the soil.'
    ],
    why: 'The colour is an advert. It tells a bee where to land.'
  },
  {
    id: 't-hb108d',
    lesson: 'hb-1-08',
    prompt: 'No insect visits a flower all season. What may happen?',
    choices: ['It grows taller', 'It makes no seeds', 'It turns green', 'It makes more pollen'],
    answer: 1,
    feedback: [
      'Height has nothing to do with visitors.',
      null,
      'Flowers do not change colour when nobody comes.',
      'More pollen is no use if none of it moves.'
    ],
    why: 'Pollen has to travel for seeds to form. No visitor often means no seed.'
  },
  {
    id: 't-hb108e',
    lesson: 'hb-1-08',
    prompt: 'Pollen is —',
    choices: ['A small seed', 'A kind of root', 'A yellow dust', 'A leaf edge'],
    answer: 2,
    feedback: [
      'A seed comes later, and it is much bigger.',
      'Pollen is up in the flower, not under the soil.',
      null,
      'Edges are on leaves.'
    ],
    why: 'A fine yellow dust made in the flower, that has to reach another flower.'
  },

  // --------------------------------- L9 · Seeds ---------------------------------
  {
    id: 't-hb109a',
    lesson: 'hb-1-09',
    prompt: 'What is inside a seed?',
    choices: ['Soil and water', 'A tiny plant and food', 'Pollen', 'Nothing yet'],
    answer: 1,
    feedback: [
      'Water comes in from outside when the seed is planted.',
      null,
      'Pollen comes before a seed. It is not stored inside one.',
      'A seed is packed full before it ever leaves the plant.'
    ],
    why: 'A whole plant, packed small, with a store of food to start it off.'
  },
  {
    id: 't-hb109b',
    lesson: 'hb-1-09',
    prompt: 'A seed starts to grow under the soil, in the dark. How can it?',
    choices: ['It finds light in the soil', 'It eats the soil', 'It uses the food inside it', 'It does not need food'],
    answer: 2,
    feedback: [
      'Soil is dark all the way down.',
      'Plants do not eat soil.',
      null,
      'Growing always takes food.'
    ],
    why: 'The store inside feeds it until its leaves reach the light and take over.'
  },
  {
    id: 't-hb109c',
    lesson: 'hb-1-09',
    prompt: 'Which list gives what most seeds need to start?',
    choices: ['Water, warmth and air', 'Light, soil and wind', 'Pollen, bees and rain', 'Salt, sun and stone'],
    answer: 0,
    feedback: [
      null,
      'Light comes later, once the shoot is up.',
      'Those belong to the flower stage, before the seed.',
      'Salt and stone help nothing grow.'
    ],
    why: 'All three, or the seed stays asleep.'
  },
  {
    id: 't-hb109d',
    lesson: 'hb-1-09',
    prompt: 'Some seeds sit in the ground for years before growing. This is —',
    choices: ['A sign they are dead', 'Very rare', 'Normal for many plants', 'Bad for the plant'],
    answer: 2,
    feedback: [
      'They can still grow after years of waiting.',
      'It is common, not rare.',
      null,
      'Waiting for a good year helps them.'
    ],
    why: 'Waiting is a plan, not a fault. The seed is holding out for the right year.'
  },
  {
    id: 't-hb109e',
    lesson: 'hb-1-09',
    prompt: 'When does a new plant first need light?',
    choices: ['Before it sprouts', 'Once its leaves are up', 'Never', 'Only at night'],
    answer: 1,
    feedback: [
      'It lives on its own store until then.',
      null,
      'Every green plant needs light in the end.',
      'There is no light at night to use.'
    ],
    why: 'No leaves, no need for light. Once the leaves are out, light becomes everything.'
  },

  // ----------------------------- L10 · Plant families -----------------------------
  {
    id: 't-hb110a',
    lesson: 'hb-1-10',
    prompt: 'Plants in the same family share —',
    choices: ['The same colour', 'The same height', 'The same kind of build', 'The same name'],
    answer: 2,
    feedback: [
      'Family members come in many colours.',
      'Height varies a great deal inside one family.',
      null,
      'They each have their own name.'
    ],
    why: 'Same kind of stem, same kind of flower, same way the leaves sit.'
  },
  {
    id: 't-hb110b',
    lesson: 'hb-1-10',
    prompt: 'Which of these is NOT a sign of the mint family?',
    choices: ['Square stems', 'Leaves in pairs', 'A strong smell', 'Round woody stems'],
    answer: 3,
    feedback: [
      'Square stems ARE a sign.',
      'Paired leaves ARE a sign.',
      'A strong smell when rubbed IS a sign.',
      null
    ],
    why: 'Round and woody is a tree or a shrub. Mint family stems are square and soft.'
  },
  {
    id: 't-hb110c',
    lesson: 'hb-1-10',
    prompt: 'Mint, basil and sage all belong to —',
    choices: ['The mint family', 'The rose family', 'The grass family', 'No family at all'],
    answer: 0,
    feedback: [
      null,
      'Roses have round thorny stems.',
      'Grasses have hollow round stems and no real petals.',
      'Every plant belongs to a family.'
    ],
    why: 'Square stems, paired leaves, strong smell. All three, in all three plants.'
  },
  {
    id: 't-hb110d',
    lesson: 'hb-1-10',
    prompt: 'Why learn families instead of one plant at a time?',
    choices: ['One family covers many plants', 'It makes plants grow', 'It keeps bugs away', 'It is easier to spell'],
    answer: 0,
    feedback: [
      null,
      'Learning a name changes nothing about growing.',
      'Families have nothing to do with pests.',
      'Family names are often the longer ones.'
    ],
    why: 'Learn one family and you can place dozens of plants at a glance.'
  },
  {
    id: 't-hb110e',
    lesson: 'hb-1-10',
    prompt: 'You find a plant you have never seen. It has a square stem and paired leaves. The best thought is —',
    choices: [
      'It must be safe to taste',
      'It may be in the mint family',
      'It is definitely mint',
      'It has no flowers'
    ],
    answer: 1,
    feedback: [
      'Never. A family is a clue to a name. It is never a sign that a plant is safe.',
      null,
      '"May be" and "is" are very different. Two clues are not proof.',
      'You have not looked at the flower yet.'
    ],
    why: 'Two clues make a good guess at a family. They do not make a name, and they never make a plant safe.'
  },

  // -------------------------- L11 · How to key out a plant --------------------------
  {
    id: 't-hb111a',
    lesson: 'hb-1-11',
    prompt: 'To key out a plant means to —',
    choices: ['Guess its name', 'Work through clues in order', 'Pick it and take it home', 'Draw it quickly'],
    answer: 1,
    feedback: [
      'Guessing is the thing a key replaces.',
      null,
      'You can key a plant without touching it.',
      'Drawing helps, but it is not keying.'
    ],
    why: 'Clue by clue, in the same order every time, until only one answer is left.'
  },
  {
    id: 't-hb111b',
    lesson: 'hb-1-11',
    prompt: 'What do you look at FIRST?',
    choices: ['The flower', 'The roots', 'The stem', 'The soil'],
    answer: 2,
    feedback: [
      'The flower comes last, and it is not always there.',
      'You would have to dig the plant up.',
      null,
      'Soil is not part of the plant.'
    ],
    why: 'The stem is quick to check and it rules a lot of plants out at once.'
  },
  {
    id: 't-hb111c',
    lesson: 'hb-1-11',
    prompt: 'You cannot tell if the edge is toothed. What should you write?',
    choices: ['Your best guess, as a fact', 'Not sure', 'Nothing at all', 'A different plant name'],
    answer: 1,
    feedback: [
      'A guess written as a fact will mislead you next year.',
      null,
      'A blank tells you nothing when you come back.',
      'That would be wrong on purpose.'
    ],
    why: 'A good herbalist writes down what she does not know. That is not a failure, it is a record.'
  },
  {
    id: 't-hb111d',
    lesson: 'hb-1-11',
    prompt: 'Why write every clue down?',
    choices: ['Clues add up to an answer', 'To fill the page', 'To keep it neat', 'Because you have to'],
    answer: 0,
    feedback: [
      null,
      'A full page is not the point.',
      'Neat is nice, but it is not the reason.',
      'You do it because it works, not because it is a rule.'
    ],
    why: 'Square stem. Paired leaves. Toothed edge. Now you have four clues, not a feeling.'
  },
  {
    id: 't-hb111e',
    lesson: 'hb-1-11',
    prompt: 'Four written clues beat one strong feeling because —',
    choices: ['They are shorter', 'They can be checked later', 'They are quicker', 'They look tidy'],
    answer: 1,
    feedback: [
      'Length is not what makes them better.',
      null,
      'Writing takes longer, and it is still worth it.',
      'Tidy has nothing to do with true.'
    ],
    why: 'Somebody else can check a written clue. Nobody can check a feeling, including you.'
  },

  // --------------------- L12 · Look-alikes, and the first rule ---------------------
  {
    id: 't-hb112a',
    lesson: 'hb-1-12',
    prompt: 'When may you taste a plant you found outside?',
    choices: ['When you feel sure', 'When it smells nice', 'Only when a grown-up says yes', 'When it looks like mint'],
    answer: 2,
    feedback: [
      'Feeling sure is exactly how people get this wrong.',
      'Smell is not proof of anything.',
      null,
      'Look-alikes are the whole problem. Looking like mint is not being mint.'
    ],
    why: 'The first rule of the field. Not a leaf, not a berry, not once, without a grown-up.'
  },
  {
    id: 't-hb112b',
    lesson: 'hb-1-12',
    prompt: 'Why are look-alikes a problem?',
    choices: ['Two plants can look the same', 'They grow too fast', 'They have no flowers', 'They are hard to draw'],
    answer: 0,
    feedback: [
      null,
      'Speed is not the issue.',
      'Many look-alikes do have flowers.',
      'They are no harder to draw than anything else.'
    ],
    why: 'Some plants have twins. They look the same to a new eye, and even grown-ups get them wrong.'
  },
  {
    id: 't-hb112c',
    lesson: 'hb-1-12',
    prompt: 'Which four things are ALWAYS safe to do with a plant?',
    choices: ['Pick, taste, chew, swallow', 'Guess, hope, try, see', 'Look, draw, write, ask', 'Hide, keep, wait, taste'],
    answer: 2,
    feedback: [
      'Three of those break the first rule.',
      'Guessing is the thing the rule exists to stop.',
      null,
      'Hiding a plant stops you asking about it, which is the one thing that helps.'
    ],
    why: 'Look, draw, write, ask. Those four are always safe, and they are how you learn.'
  },
  {
    id: 't-hb112d',
    lesson: 'hb-1-12',
    prompt: 'You are ALMOST sure a berry is fine. What do you do?',
    choices: ['Taste a very small piece', 'Leave it and ask a grown-up', 'Smell it first, then decide', 'Take it home to try later'],
    answer: 1,
    feedback: [
      'A small piece still breaks the rule. This rule has no small print.',
      null,
      'Smell tells you nothing about safety.',
      'Later is still tasting. The rule does not change indoors.'
    ],
    why: 'Almost sure is not sure. This rule has no "almost" in it.'
  },
  {
    id: 't-hb112e',
    lesson: 'hb-1-12',
    prompt: 'In herbalism, being SURE about a plant means —',
    choices: ['You checked every clue', 'You have a strong feeling', 'A friend told you', 'You saw a picture once'],
    answer: 0,
    feedback: [
      null,
      'Feeling sure and being sure are not the same thing.',
      'A friend can be wrong the same as anyone.',
      'One picture is not a check.'
    ],
    why: 'Sure is work you did — stem, leaves, edge, flower — not a feeling you had.'
  },

  // ------------------------ L13 · Keeping a field journal ------------------------
  {
    id: 't-hb113a',
    lesson: 'hb-1-13',
    prompt: 'What must go on EVERY journal page?',
    choices: ['A perfect drawing', 'A photograph', 'The date and the place', 'A long story'],
    answer: 2,
    feedback: [
      'A rough drawing is fine. It is the looking that counts.',
      'A photo is not needed at all.',
      null,
      'Short and clear beats long every time.'
    ],
    why: 'Without the date and the place, the rest is just a drawing.'
  },
  {
    id: 't-hb113b',
    lesson: 'hb-1-13',
    prompt: 'Which note is more useful next spring?',
    choices: ['Four white petals, toothed leaves', 'A very lovely plant', 'I liked this one', 'It was there'],
    answer: 0,
    feedback: [
      null,
      'That will not help you find it again.',
      'That is about you, not the plant.',
      'That says nothing at all.'
    ],
    why: 'Write what you saw, not what you felt. One of those helps you next spring.'
  },
  {
    id: 't-hb113c',
    lesson: 'hb-1-13',
    prompt: 'Why go back to the same plant a month later?',
    choices: ['To pick it', 'To move it', 'To record what changed', 'To water it'],
    answer: 2,
    feedback: [
      'You are watching it, not harvesting it.',
      'Leave it where it grows.',
      null,
      'Watering is not what a field journal is for.'
    ],
    why: 'Noticing change is the whole skill. That is what the journal is really for.'
  },
  {
    id: 't-hb113d',
    lesson: 'hb-1-13',
    prompt: 'A rough drawing you did yourself beats a perfect photo because —',
    choices: ['It is faster', 'Drawing made you look properly', 'It uses less paper', 'Photos are not allowed'],
    answer: 1,
    feedback: [
      'Drawing is usually slower, and still better.',
      null,
      'Paper is not the reason.',
      'Photos are fine. They just do not make you look.'
    ],
    why: 'You cannot draw a leaf edge without deciding what it is. A camera decides nothing.'
  },
  {
    id: 't-hb113e',
    lesson: 'hb-1-13',
    prompt: 'A field journal is best thought of as —',
    choices: ['A tool, like a hand lens', 'A diary of feelings', 'A book of drawings', 'A place to keep secrets'],
    answer: 0,
    feedback: [
      null,
      'Feelings go somewhere else. This is for what you saw.',
      'Drawings are part of it, not the whole of it.',
      'A journal is for going back to, not for hiding.'
    ],
    why: 'A tool you use in the field, the same as a hand lens or a scale.'
  },

  // -------------------------------------------------------------------------
  // v3.54 — THE THIRTEEN RE-HOMED LESSONS GET THEIR SECOND FIVE.
  //
  // hb-1-01 to hb-1-13 carried FIVE bank questions each while the other 243
  // lessons in the app carried ten. Both documents called these thirteen "still
  // flat cards" and meant the prose; nobody had ever counted the questions.
  // Half a bank is the same gap wearing different clothes.
  //
  // It became load-bearing the moment Gigi asked for a scored test inside every
  // lesson: six practice questions and four scored cannot come out of five.
  //
  // Every one of these is answerable from its own lesson's hook, core, doing or
  // practice — nothing here asks for something the lesson did not give her.
  //
  // ANSWER SLOTS LEAN ON D ON PURPOSE. Herbalism's course spread was
  // 235/239/238/183 and D was the thin one. These sixty-five run 13/13/13/26,
  // which pulls D up without putting any module over the 40% bar.
  // -------------------------------------------------------------------------

  // ---- hb-1-01 · The parts of a plant ----
  {
    id: 't-hb101f',
    lesson: 'hb-1-01',
    prompt: 'Which part makes new seeds?',
    choices: ['The roots', 'The stem', 'The leaves', 'The flower'],
    answer: 3,
    feedback: ['Roots hold the plant down.', 'The stem holds the plant up.', 'Leaves catch the light.', null],
    why: 'Flowers make new seeds. That is the job they have.'
  },
  {
    id: 't-hb101g',
    lesson: 'hb-1-01',
    prompt: 'Why does a plant need all four parts?',
    choices: ['Each part has one job', 'It looks better that way', 'So they can be counted', 'To make it heavier'],
    answer: 0,
    feedback: [null, 'Looks are not the reason.', 'Counting is not a job.', 'Weight is not the reason.'],
    why: 'Roots, stem, leaves and flowers each do one job. The plant needs them all.'
  },
  {
    id: 't-hb101h',
    lesson: 'hb-1-01',
    prompt: 'Roots hold the plant down. What holds it up?',
    choices: ['The soil', 'The flower', 'The leaves', 'The stem'],
    answer: 3,
    feedback: ['Soil holds the roots.', 'The flower sits on top.', 'Leaves catch light.', null],
    why: 'The stem holds the plant up. That is its job in the team.'
  },
  {
    id: 't-hb101i',
    lesson: 'hb-1-01',
    prompt: 'Which part catches the light?',
    choices: ['The roots', 'The leaves', 'The stem', 'The seeds'],
    answer: 1,
    feedback: ['Roots are under the soil.', null, 'The stem lifts the leaves.', 'Seeds come later.'],
    why: 'Leaves catch the light. Roots are in the dark.'
  },
  {
    id: 't-hb101j',
    lesson: 'hb-1-01',
    prompt: 'A plant with no flower yet is —',
    choices: ['Dead', 'Not a plant', 'Still young', 'Missing its roots'],
    answer: 2,
    feedback: ['Green leaves mean it is alive.', 'It is still a plant.', null, 'Roots are under the soil.'],
    why: 'A young plant may have no flower yet. It will grow one later.'
  },

  // ---- hb-1-02 · What roots do ----
  {
    id: 't-hb102f',
    lesson: 'hb-1-02',
    prompt: 'What do roots pull out of the soil?',
    choices: ['Water', 'Light', 'Air', 'Seeds'],
    answer: 0,
    feedback: [null, 'Light lands on the leaves.', 'Roots pull water, not air.', 'Seeds come from the flower.'],
    why: 'Roots pull water out of the soil.'
  },
  {
    id: 't-hb102g',
    lesson: 'hb-1-02',
    prompt: 'Ginger grows under the soil. Ginger is a —',
    choices: ['Leaf', 'Flower', 'Stem', 'Root'],
    answer: 3,
    feedback: ['Leaves are above the soil.', 'Flowers are above the soil.', 'Stems are above the soil.', null],
    why: 'Ginger is a root, the same as a carrot. Both store food.'
  },
  {
    id: 't-hb102h',
    lesson: 'hb-1-02',
    prompt: 'Where does water go after the roots take it?',
    choices: ['Back to the soil', 'Up to the leaves', 'Into the flower only', 'Nowhere'],
    answer: 1,
    feedback: ['It goes up, not back.', null, 'It reaches the leaves too.', 'It does move.'],
    why: 'Water goes up the stem to the leaves.'
  },
  {
    id: 't-hb102i',
    lesson: 'hb-1-02',
    prompt: 'Wind blows hard. What keeps the plant in place?',
    choices: ['The leaves', 'The flower', 'The stem', 'The roots'],
    answer: 3,
    feedback: ['Leaves catch light.', 'The flower makes seeds.', 'The stem holds it up, not down.', null],
    why: 'Roots spread out and grip. That is why wind does not blow a plant away.'
  },
  {
    id: 't-hb102j',
    lesson: 'hb-1-02',
    prompt: 'Why does a carrot hold so much food?',
    choices: ['It is a flower', 'It is a leaf', 'The plant stored it there', 'It grew in the sun'],
    answer: 2,
    feedback: ['A carrot is a root.', 'A carrot is a root.', null, 'A carrot grows in the dark.'],
    why: 'The plant packed the root with food to use later.'
  },

  // ---- hb-1-03 · What the stem does ----
  {
    id: 't-hb103f',
    lesson: 'hb-1-03',
    prompt: 'Food made in the leaves travels —',
    choices: ['Up to the flower only', 'Out into the air', 'Nowhere at all', 'Down the stem'],
    answer: 3,
    feedback: ['It goes down, not only up.', 'Food stays inside the plant.', 'It does move.', null],
    why: 'Water goes up the stem. Food made in the leaves goes back down.'
  },
  {
    id: 't-hb103g',
    lesson: 'hb-1-03',
    prompt: 'Most stems are —',
    choices: ['Square', 'Round', 'Flat', 'Star shaped'],
    answer: 1,
    feedback: ['Square stems are the odd ones.', null, 'Flat stems are rare.', 'Stems are not star shaped.'],
    why: 'Most stems are round. Mint stems are square, and that is a clue.'
  },
  {
    id: 't-hb103h',
    lesson: 'hb-1-03',
    prompt: 'The stem does two jobs. They are —',
    choices: ['Lifting and carrying', 'Drinking and eating', 'Growing and dying', 'Hiding and waiting'],
    answer: 0,
    feedback: [null, 'Roots drink. Leaves make food.', 'That is not a job.', 'A stem does not hide.'],
    why: 'A stem is a pipe and a pole. It lifts the leaves and carries water and food.'
  },
  {
    id: 't-hb103i',
    lesson: 'hb-1-03',
    prompt: 'Why does the stem need to be strong?',
    choices: ['To hold water', 'To make food', 'To hold the leaves up', 'To grip the soil'],
    answer: 2,
    feedback: ['It carries water, but strength is for lifting.', 'Leaves make the food.', null, 'Roots grip the soil.'],
    why: 'Leaves need light, so the stem lifts them up to reach it.'
  },
  {
    id: 't-hb103j',
    lesson: 'hb-1-03',
    prompt: 'Rolling a stem in your fingers can tell you —',
    choices: ['How old it is', 'How tall it will grow', 'What colour its flower is', 'Whether it is square'],
    answer: 3,
    feedback: ['Age does not show that way.', 'Height does not show that way.', 'Colour is on the flower.', null],
    why: 'Rolling a stem tells you if it has edges. A square stem is a real clue.'
  },

  // ---- hb-1-04 · What leaves do ----
  {
    id: 't-hb104f',
    lesson: 'hb-1-04',
    prompt: 'Which part of a plant makes its food?',
    choices: ['The root', 'The leaf', 'The stem', 'The flower'],
    answer: 1,
    feedback: ['Roots drink and hold on.', null, 'The stem lifts and carries.', 'The flower makes seeds.'],
    why: 'A leaf takes light and air and makes food. No other part can do this.'
  },
  {
    id: 't-hb104g',
    lesson: 'hb-1-04',
    prompt: 'A leaf takes in light and —',
    choices: ['Soil', 'Water only', 'Seeds', 'Air'],
    answer: 3,
    feedback: ['Roots handle the soil.', 'Light and air are the pair.', 'Seeds come from flowers.', null],
    why: 'A leaf takes in light and air, and turns them into food.'
  },
  {
    id: 't-hb104h',
    lesson: 'hb-1-04',
    prompt: 'Water reaches the leaf through —',
    choices: ['The flower', 'The soil', 'The veins', 'The petals'],
    answer: 2,
    feedback: ['Flowers make seeds.', 'Soil is where roots drink.', null, 'Petals are on the flower.'],
    why: 'The lines in a leaf are veins. They are pipes for water and food.'
  },
  {
    id: 't-hb104i',
    lesson: 'hb-1-04',
    prompt: 'Why are most leaves flat and wide?',
    choices: ['To stay dry', 'To feel soft', 'To look nice', 'To catch more light'],
    answer: 3,
    feedback: ['Rain lands on them anyway.', 'How it feels is not the reason.', 'Looks are not the reason.', null],
    why: 'A wide leaf catches more light. That is why most leaves are flat.'
  },
  {
    id: 't-hb104j',
    lesson: 'hb-1-04',
    prompt: 'Only one part makes food from light. It is —',
    choices: ['The leaf', 'The root', 'The stem', 'The seed'],
    answer: 0,
    feedback: [null, 'Roots pull up water.', 'The stem carries it.', 'A seed carries stored food.'],
    why: 'No other part can make food from light. That is the leaf alone.'
  },

  // ---- hb-1-05 · Leaf shapes ----
  {
    id: 't-hb105f',
    lesson: 'hb-1-05',
    prompt: 'Basil leaves are shaped most like —',
    choices: ['Needles', 'Hearts', 'Circles', 'Eggs'],
    answer: 3,
    feedback: ['Rosemary leaves are like needles.', 'Some leaves are, but not basil.', 'Basil leaves are not round.', null],
    why: 'Basil leaves are like eggs. Rosemary leaves are like tiny needles.'
  },
  {
    id: 't-hb105g',
    lesson: 'hb-1-05',
    prompt: 'In a journal you should write that a leaf is —',
    choices: ['Lovely', 'My favourite', 'Long and pointed', 'Quite nice'],
    answer: 2,
    feedback: ['That says nothing about the leaf.', 'That is about you.', null, 'Nobody could find it from that.'],
    why: 'Say what you see. Long, wide or pointed is what a herbalist writes down.'
  },
  {
    id: 't-hb105h',
    lesson: 'hb-1-05',
    prompt: 'Shape is useful because it —',
    choices: ['Helps you name the plant', 'Makes the plant grow', 'Waters the plant', 'Keeps it warm'],
    answer: 0,
    feedback: [null, 'Shape does not make it grow.', 'Roots handle water.', 'Shape is not about warmth.'],
    why: 'The shape tells you which plant is which. It is your first clue.'
  },
  {
    id: 't-hb105i',
    lesson: 'hb-1-05',
    prompt: 'Two different kinds of plant have —',
    choices: ['Exactly the same leaf', 'Leaves that are not the same', 'No leaves at all', 'Only round leaves'],
    answer: 1,
    feedback: ['No two kinds have quite the same leaf.', null, 'Most plants have leaves.', 'Leaves come in many shapes.'],
    why: 'No two kinds of plant have quite the same leaf.'
  },
  {
    id: 't-hb105j',
    lesson: 'hb-1-05',
    prompt: 'Which one is a real leaf shape word?',
    choices: ['Nice', 'Good', 'Lovely', 'Heart shaped'],
    answer: 3,
    feedback: ['That is not a shape.', 'That is not a shape.', 'That is not a shape.', null],
    why: 'Some leaves are shaped like a heart. Nice and lovely are not shapes.'
  },

  // ---- hb-1-06 · The edge of a leaf ----
  {
    id: 't-hb106f',
    lesson: 'hb-1-06',
    prompt: 'An edge with no bumps at all is —',
    choices: ['Toothed', 'Lobed', 'Smooth', 'Pointed'],
    answer: 2,
    feedback: ['Toothed means small points.', 'Lobed means big curves.', null, 'Points are the toothed edge.'],
    why: 'A smooth edge has no bumps.'
  },
  {
    id: 't-hb106g',
    lesson: 'hb-1-06',
    prompt: 'Big soft curves round a leaf edge are called —',
    choices: ['Smooth', 'Toothed', 'Pointed', 'Lobed'],
    answer: 3,
    feedback: ['Smooth means no bumps.', 'Toothed means small sharp points.', 'Points are toothed.', null],
    why: 'A lobed edge has big soft curves, not small points.'
  },
  {
    id: 't-hb106h',
    lesson: 'hb-1-06',
    prompt: 'How many kinds of edge did this lesson name?',
    choices: ['One', 'Two', 'Four', 'Three'],
    answer: 3,
    feedback: ['There were more.', 'There were more.', 'There were fewer.', null],
    why: 'Three kinds: smooth, toothed and lobed.'
  },
  {
    id: 't-hb106i',
    lesson: 'hb-1-06',
    prompt: 'The edge matters because it can show —',
    choices: ['Two plants are not the same', 'How tall a plant grows', 'What the flower smells like', 'How old the plant is'],
    answer: 0,
    feedback: [null, 'The edge says nothing about height.', 'Smell comes from oils.', 'The edge does not show age.'],
    why: 'Two leaves can share a shape. If one is toothed and one is smooth, they differ.'
  },
  {
    id: 't-hb106j',
    lesson: 'hb-1-06',
    prompt: 'Leaves at the top of a plant can —',
    choices: ['Always match the low ones', 'Look different from the low ones', 'Have no edge', 'Change colour only'],
    answer: 1,
    feedback: ['They do not always match.', null, 'Every leaf has an edge.', 'The shape can differ too.'],
    why: 'Top leaves can look different. Always check two or three.'
  },

  // ---- hb-1-07 · How leaves sit on the stem ----
  {
    id: 't-hb107f',
    lesson: 'hb-1-07',
    prompt: 'Sage takes turns up the stem. That is called —',
    choices: ['Opposite', 'Toothed', 'Lobed', 'Alternate'],
    answer: 3,
    feedback: ['Opposite means in pairs.', 'That word is about the edge.', 'That word is about the edge.', null],
    why: 'Alternate means the leaves take turns. One side, then the other.'
  },
  {
    id: 't-hb107g',
    lesson: 'hb-1-07',
    prompt: 'Leaves growing in pairs are called —',
    choices: ['Opposite', 'Alternate', 'Smooth', 'Square'],
    answer: 0,
    feedback: [null, 'Alternate means taking turns.', 'That word is about the edge.', 'That word is about the stem.'],
    why: 'Pairs straight across from each other are called opposite.'
  },
  {
    id: 't-hb107h',
    lesson: 'hb-1-07',
    prompt: 'Basil has leaves in pairs. So does —',
    choices: ['Grass', 'Mint', 'A fern', 'A pine tree'],
    answer: 1,
    feedback: ['Grass leaves take turns.', null, 'Ferns are built differently.', 'Pine needles grow in bunches.'],
    why: 'Mint has leaves in pairs. So does basil. The whole mint family does.'
  },
  {
    id: 't-hb107i',
    lesson: 'hb-1-07',
    prompt: 'Where do you look to check how leaves sit?',
    choices: ['At the root', 'At the petal', 'At the tip of the leaf', 'Where the leaf joins the stem'],
    answer: 3,
    feedback: ['Roots are under the soil.', 'Petals are on the flower.', 'The tip is the far end.', null],
    why: 'Look where a leaf joins the stem. Is another leaf right across from it?'
  },
  {
    id: 't-hb107j',
    lesson: 'hb-1-07',
    prompt: 'How leaves sit is useful because it —',
    choices: ['Waters the plant', 'Changes the smell', 'Helps you name the plant', 'Makes leaves grow'],
    answer: 2,
    feedback: ['Roots handle water.', 'Smell comes from oils in the leaf.', null, 'Order does not make them grow.'],
    why: 'Square stem plus paired leaves is the mint family sign. Order helps you name it.'
  },

  // ---- hb-1-08 · What a flower is for ----
  {
    id: 't-hb108f',
    lesson: 'hb-1-08',
    prompt: 'The job of a flower is to —',
    choices: ['Make new seeds', 'Hold the plant up', 'Drink water', 'Catch the light'],
    answer: 0,
    feedback: [null, 'The stem holds it up.', 'Roots drink.', 'Leaves catch light.'],
    why: 'A flower is how a plant makes new seeds. Without it there are no new plants.'
  },
  {
    id: 't-hb108g',
    lesson: 'hb-1-08',
    prompt: 'The yellow dust that moves between flowers is —',
    choices: ['Soil', 'Pollen', 'Seed', 'Sap'],
    answer: 1,
    feedback: ['Soil stays in the ground.', null, 'Seeds form after pollen moves.', 'Sap moves inside the stem.'],
    why: 'Pollen is a yellow dust. It must move from flower to flower.'
  },
  {
    id: 't-hb108h',
    lesson: 'hb-1-08',
    prompt: 'Bees carry pollen on their —',
    choices: ['Wings', 'Eyes', 'Backs only', 'Legs'],
    answer: 3,
    feedback: ['The lesson says legs.', 'The lesson says legs.', 'The lesson says legs.', null],
    why: 'Bees carry pollen on their legs.'
  },
  {
    id: 't-hb108i',
    lesson: 'hb-1-08',
    prompt: 'Bright petals are there to —',
    choices: ['Keep rain off', 'Feed the roots', 'Tell bees where to land', 'Hold the stem up'],
    answer: 2,
    feedback: ['Rain is not the reason.', 'Roots feed themselves from the soil.', null, 'The stem holds the flower.'],
    why: 'The colour is a sign, not decoration. It tells bees where to land.'
  },
  {
    id: 't-hb108j',
    lesson: 'hb-1-08',
    prompt: 'If no bee ever visits a flower, the plant may —',
    choices: ['Grow taller', 'Lose its leaves', 'Turn brown', 'Make no seeds'],
    answer: 3,
    feedback: ['Height is not affected.', 'Leaves are not affected.', 'Colour is not the point.', null],
    why: 'Pollen has to travel for seeds to form.'
  },

  // ---- hb-1-09 · Seeds ----
  {
    id: 't-hb109f',
    lesson: 'hb-1-09',
    prompt: 'A seed holds a tiny plant and —',
    choices: ['Soil', 'Pollen', 'A flower', 'A store of food'],
    answer: 3,
    feedback: ['Soil is outside the seed.', 'Pollen moves between flowers.', 'The flower comes much later.', null],
    why: 'A seed holds a tiny plant and a store of food.'
  },
  {
    id: 't-hb109g',
    lesson: 'hb-1-09',
    prompt: 'Most seeds need water, warmth and —',
    choices: ['Soil', 'Light', 'Pollen', 'Air'],
    answer: 3,
    feedback: ['Many seeds start without soil.', 'Light comes later.', 'Pollen came before the seed.', null],
    why: 'Most seeds need water, warmth and air. Light comes later.'
  },
  {
    id: 't-hb109h',
    lesson: 'hb-1-09',
    prompt: 'A seed can start growing in the dark because —',
    choices: ['It does not really grow', 'Light is not real', 'It has its own food inside', 'Roots make light'],
    answer: 2,
    feedback: ['It does grow.', 'Light is real. It is just not needed yet.', null, 'Roots do not make light.'],
    why: 'The food inside feeds it until leaves can take over.'
  },
  {
    id: 't-hb109i',
    lesson: 'hb-1-09',
    prompt: 'Light matters to a seed —',
    choices: ['Once the shoot is up', 'Before it is planted', 'Never at all', 'Only in winter'],
    answer: 0,
    feedback: [null, 'It is dark under the soil.', 'It matters once leaves appear.', 'The season is not the point.'],
    why: 'Light comes later, once the shoot is up.'
  },
  {
    id: 't-hb109j',
    lesson: 'hb-1-09',
    prompt: 'Some seeds sit for years. That is —',
    choices: ['A sign they are dead', 'Normal for some seeds', 'Caused by too much water', 'Only true of beans'],
    answer: 1,
    feedback: ['They are waiting, not dead.', null, 'Water is not the cause.', 'Many kinds of seed wait.'],
    why: 'Some seeds wait until the year is right. Waiting is normal.'
  },

  // ---- hb-1-10 · Plant families ----
  {
    id: 't-hb110f',
    lesson: 'hb-1-10',
    prompt: 'A plant family is a group that shares —',
    choices: ['The same colour', 'The same build', 'The same garden', 'The same name'],
    answer: 1,
    feedback: ['Colour can differ inside a family.', null, 'Where it grows is not the point.', 'Names differ inside a family.'],
    why: 'A family shares the same build. Same kind of stem, same kind of flower.'
  },
  {
    id: 't-hb110g',
    lesson: 'hb-1-10',
    prompt: 'Basil and sage belong to the —',
    choices: ['Rose family', 'Grass family', 'Mint family', 'Pea family'],
    answer: 2,
    feedback: ['Roses have round thorny stems.', 'Grass stems are round.', null, 'Peas climb and are built differently.'],
    why: 'Mint, basil and sage are all in the mint family.'
  },
  {
    id: 't-hb110h',
    lesson: 'hb-1-10',
    prompt: 'One sign of the mint family is —',
    choices: ['A round stem', 'Leaves that take turns', 'No smell at all', 'A square stem'],
    answer: 3,
    feedback: ['Mint stems are square.', 'Mint leaves grow in pairs.', 'The smell is strong.', null],
    why: 'Square stems, leaves in pairs, and a strong smell when you rub them.'
  },
  {
    id: 't-hb110i',
    lesson: 'hb-1-10',
    prompt: 'Rub a mint leaf and you get —',
    choices: ['Nothing', 'A wet hand', 'A sharp point', 'A strong smell'],
    answer: 3,
    feedback: ['There is a smell.', 'Rubbing does not wet your hand.', 'Mint leaves are not sharp.', null],
    why: 'A strong smell when you rub them is one of the three family signs.'
  },
  {
    id: 't-hb110j',
    lesson: 'hb-1-10',
    prompt: 'Learning families is quicker because —',
    choices: ['One family covers many plants', 'Families have short names', 'There are only two', 'Plants change family'],
    answer: 0,
    feedback: [null, 'Name length is not the point.', 'There are many families.', 'A plant stays in its family.'],
    why: 'Learn one family and you can place dozens of plants at a glance.'
  },

  // ---- hb-1-11 · How to key out a plant ----
  {
    id: 't-hb111f',
    lesson: 'hb-1-11',
    prompt: 'When you key out a plant you start with —',
    choices: ['The flower', 'The edge', 'The roots', 'The stem'],
    answer: 3,
    feedback: ['The flower comes last.', 'The edge comes third.', 'Roots are under the soil.', null],
    why: 'Start with the stem. It is quick to check and it rules a lot out.'
  },
  {
    id: 't-hb111g',
    lesson: 'hb-1-11',
    prompt: 'You name a plant by —',
    choices: ['Working through clues in order', 'Guessing quickly', 'Asking how it feels', 'Its colour alone'],
    answer: 0,
    feedback: [null, 'You do not name a plant by guessing.', 'A feeling is not a clue.', 'Colour alone is not enough.'],
    why: 'You do not name a plant by guessing. You work through clues in order.'
  },
  {
    id: 't-hb111h',
    lesson: 'hb-1-11',
    prompt: 'If you cannot tell what the edge is, you write —',
    choices: ['Toothed', 'Smooth', 'Not sure', 'Nothing at all'],
    answer: 2,
    feedback: ['That would be a guess.', 'That would be a guess.', null, 'A blank tells you nothing later.'],
    why: 'A good herbalist writes down what she does not know.'
  },
  {
    id: 't-hb111i',
    lesson: 'hb-1-11',
    prompt: 'Four clues written down beat —',
    choices: ['A drawing', 'A feeling', 'A journal', 'A hand lens'],
    answer: 1,
    feedback: ['Drawings help too.', null, 'The clues go in the journal.', 'A lens helps you see clues.'],
    why: 'Now you have four clues, not a feeling.'
  },
  {
    id: 't-hb111j',
    lesson: 'hb-1-11',
    prompt: 'Which order does this lesson give?',
    choices: ['Flower, then stem', 'Leaves, then roots', 'Edge, then stem', 'Stem, then leaves'],
    answer: 3,
    feedback: ['The flower comes last.', 'Roots are not on the list.', 'The stem comes first.', null],
    why: 'Stem, then leaves, then the edge, then how they sit, then the flower.'
  },

  // ---- hb-1-12 · Look-alikes, and the first rule ----
  {
    id: 't-hb112f',
    lesson: 'hb-1-12',
    prompt: 'Before any plant goes in your mouth you must —',
    choices: ['Smell it first', 'Check the edge', 'Have a grown-up say yes', 'Draw it'],
    answer: 2,
    feedback: ['Smell is not the rule.', 'Checking is good. It is not the rule.', null, 'Drawing is safe, but not the rule.'],
    why: 'Never put any plant in your mouth unless a grown-up says yes.'
  },
  {
    id: 't-hb112g',
    lesson: 'hb-1-12',
    prompt: 'How many times may you taste a plant on your own?',
    choices: ['Once', 'Twice', 'When you feel sure', 'Never'],
    answer: 3,
    feedback: ['Not once.', 'Not once.', 'Feeling sure is not the same as being sure.', null],
    why: 'Not a leaf. Not a berry. Not once. This rule has no almost.'
  },
  {
    id: 't-hb112h',
    lesson: 'hb-1-12',
    prompt: 'Some plants have twins. That means they —',
    choices: ['Look almost the same', 'Grow in pairs', 'Share one root', 'Have two flowers'],
    answer: 0,
    feedback: [null, 'Twins here means they look alike.', 'They are separate plants.', 'Flower count is not the point.'],
    why: 'Some plants look the same to a new eye. Even grown-ups get them wrong.'
  },
  {
    id: 't-hb112i',
    lesson: 'hb-1-12',
    prompt: 'You are almost sure a berry is safe. You should —',
    choices: ['Taste a little', 'Smell it', 'Rub it on your hand', 'Leave it and ask'],
    answer: 3,
    feedback: ['Almost sure is not sure.', 'Smell does not make it safe.', 'Do not handle it to test it.', null],
    why: 'Leave it. Ask a grown-up. Almost sure is not sure.'
  },
  {
    id: 't-hb112j',
    lesson: 'hb-1-12',
    prompt: 'Being sure means —',
    choices: ['Feeling certain', 'Checking every clue', 'Asking a friend', 'Seeing it twice'],
    answer: 1,
    feedback: ['Feeling sure is not the same thing.', null, 'A friend may be wrong too.', 'Looking twice is not checking.'],
    why: 'Sure is work you did, not a feeling you had.'
  },

  // ---- hb-1-13 · Keeping a field journal ----
  {
    id: 't-hb113f',
    lesson: 'hb-1-13',
    prompt: 'Every journal page must carry —',
    choices: ['A photo', 'A name', 'A colour', 'The date and the place'],
    answer: 3,
    feedback: ['A photo is not required.', 'You may not know the name yet.', 'Colour alone is not enough.', null],
    why: 'Write the day and where you were. Without those, the rest is just a drawing.'
  },
  {
    id: 't-hb113g',
    lesson: 'hb-1-13',
    prompt: 'Instead of lovely, you should write —',
    choices: ['Very nice', 'Four white petals', 'My favourite', 'Quite good'],
    answer: 1,
    feedback: ['That says nothing about the plant.', null, 'That is about you.', 'That says nothing you can use.'],
    why: 'Write what you saw, not what you felt. One of those helps you next spring.'
  },
  {
    id: 't-hb113h',
    lesson: 'hb-1-13',
    prompt: 'A rough drawing you did beats —',
    choices: ['A better drawing', 'No drawing', 'A longer note', 'A photo you never studied'],
    answer: 3,
    feedback: ['Any drawing you did is good.', 'A drawing beats none, but that is not the line.', 'Notes help too.', null],
    why: 'A rough drawing you did beats a perfect photo you did not look at.'
  },
  {
    id: 't-hb113i',
    lesson: 'hb-1-13',
    prompt: 'Going back to the same plant lets you see —',
    choices: ['Where it grew', 'Who planted it', 'What has changed', 'How to pick it'],
    answer: 2,
    feedback: ['You wrote the place down already.', 'The journal does not say that.', null, 'Picking is not the point.'],
    why: 'Visit the same plant in a month. Noticing change is the whole skill.'
  },
  {
    id: 't-hb113j',
    lesson: 'hb-1-13',
    prompt: 'The date and place matter because they let you —',
    choices: ['Return and compare', 'Name the plant', 'Draw it better', 'Pick it safely'],
    answer: 0,
    feedback: [null, 'The clues name it, not the date.', 'Drawing is a separate skill.', 'Never pick without a grown-up.'],
    why: 'They let you return and compare.'
  }
];

/** Every bank in the app, keyed by the quarter it belongs to. */
export const BANKS = {
  'herbalism-q1': HERBALISM_Q1_BANK,
  // v3.3 — Module 1 joins the same pool. One bank, one id, one memory of how she
  // did: the practice gate, the review boxes and every future test all reach in
  // here. A lesson whose questions live somewhere else is a lesson the spaced
  // review cannot see.
  'herbalism-m1': HERBALISM_M1_BANK
};

/** One flat list of every question in the app. */
export function allBankItems() {
  return Object.values(BANKS).flat();
}

export function bankItemById(id) {
  return allBankItems().find((q) => q.id === id) || null;
}

/** Every question that came from a given lesson. */
export function itemsForLesson(lessonId) {
  return allBankItems().filter((q) => q.lesson === lessonId);
}

/** Every question from any of a list of lessons. */
export function itemsForLessons(lessonIds) {
  const set = new Set(lessonIds);
  return allBankItems().filter((q) => set.has(q.lesson));
}
