// ---------------------------------------------------------------------------
// HERBALISM & BOTANY — MODULE 13 QUESTION BANK
// From Plant to Medicine · Lessons 73–78 · Quarter 4, Weeks 1 and 2
//
// Ten questions per lesson, sixty in all. These are NOT asked at the end of a
// lesson. They are the pool the Day 4 weekly test draws from: three lessons at
// ten questions is a thirty-question pool, and buildWeeklyTest takes eight.
// They also feed the morning warm-up and the extra practice the practice gate
// serves when she misses more than one on a lesson check.
//
//   Week 1 pool — hb-m13-01, hb-m13-02, hb-m13-03  (30 questions)
//   Week 2 pool — hb-m13-04, hb-m13-05, hb-m13-06  (30 questions)
//
// Field shape matches src/data/assessments/herbalismM1Bank.js exactly: id,
// lesson, prompt, choices (four, all different), answer (0-3), feedback (four
// entries, null in the correct slot, a real sentence in every other), and why
// (never blank — it is what the review screen shows).
//
// ---- DISTRACTORS ----
//
// Where the payload is vocabulary, the wrong choices are the OTHER words from
// this module. A miss on "what a disintegrant does" that lands on BINDER names
// the exact confusion, and the feedback names it back. Where the payload is a
// date or a person, the distractors are the OTHER dates and people from the
// same story, so a miss tells you which link in the chain has not landed.
// Nothing here is filler.
//
// ---- SAFETY. READ THIS BEFORE ADDING A QUESTION HERE ----
//
// This module is the history and science of how a plant becomes a drug, and it
// is never instructions. Not one question in these sixty asks what a plant is
// for, what it does to a person, or how much of anything anybody should take.
// Where a real drug is named, it is named as a manufactured product that
// doctors give. The volumes and masses in the Lesson 77 questions are food
// colouring and table salt in glasses of water on a kitchen counter, and there
// is no human body anywhere near them.
//
// Seven questions test the safety line on purpose, and they should never be
// cut: t-hbm1301j, t-hbm1302j, t-hbm1303j, t-hbm1304j, t-hbm1305g,
// t-hbm1305h and t-hbm1305j. Between them they check that she knows who holds
// the knife, who opens a medicine box, who handles rubbing alcohol, why a thing
// that looks like a tablet gets labelled, that a person cannot see an amount,
// that a plant which gave us a medicine is still poisonous, and who does the
// measuring.
//
// ---- READING BAR ----
//
// Quarter 4 caps: prompts up to sixteen words a sentence, answer choices up to
// fifteen words, long-word rate up to ten percent. Written to sit inside those
// and clearly above Quarter 3, which is the other direction the guard runs in.
// The long subject words — compound, isolate, chromatography, excipient,
// disintegrant, concentration, toxicology, artemisinin, paclitaxel — live
// mostly in the choices and the feedback and each carries a glossary card in
// the lesson. Add them to the SUBJECT exemption set in
// scripts/check-assessment.mjs when this merges.
// ---------------------------------------------------------------------------

export const HERBALISM_M13_BANK = [
  // =========================================================================
  // LESSON 73 · hb-m13-01 · Why plants make chemicals at all
  // =========================================================================
  {
    id: 't-hbm1301a',
    lesson: 'hb-m13-01',
    prompt: 'Why does a plant defend itself with chemicals rather than by escaping?',
    choices: [
      'Because a plant is rooted in place and cannot go anywhere',
      'Because chemicals are cheaper for a plant to build than legs',
      'Because plants prefer chemistry to movement',
      'Because insects cannot see plants that stay still'
    ],
    answer: 0,
    feedback: [
      null,
      'Cost matters, but the real problem is that running was never an option.',
      'A plant has no preferences. It has no brain to have them with.',
      'Insects find still plants perfectly well, which is exactly the problem.'
    ],
    why: 'Roots hold a plant in one spot for life, so its defence has to be built rather than run.'
  },
  {
    id: 't-hbm1301b',
    lesson: 'hb-m13-01',
    prompt: 'A whole garlic clove hardly smells, and a crushed one smells sharply. Why?',
    choices: [
      'Crushing warms the garlic up and warm things always smell stronger',
      'Crushing mixes two chemicals the plant kept apart, and allicin is made',
      'The smell was sitting on the outside of the clove all along',
      'Crushing lets air in, and air is what makes the smell'
    ],
    answer: 1,
    feedback: [
      'The clove does not warm up in your hand anywhere near enough for that.',
      null,
      'If it were on the outside you would smell it before touching it.',
      'Air is involved in a lot of chemistry, but this is the enzyme doing it.'
    ],
    why: 'Alliin and the enzyme alliinase are stored apart, and damage brings them together in seconds.'
  },
  {
    id: 't-hbm1301c',
    lesson: 'hb-m13-01',
    prompt: 'What is an antifeedant?',
    choices: [
      'An animal that refuses to eat plants',
      'A plant that grows without any leaves',
      'A chemical whose job is to make an animal stop eating',
      'A part of a plant that stores food'
    ],
    answer: 2,
    feedback: [
      'The word describes the chemical, not the animal.',
      'Leaves have nothing to do with it.',
      null,
      'That would be a storage organ, like her turmeric rhizome.'
    ],
    why: 'Anti means against and feed means eating, so the word says what the chemical does.'
  },
  {
    id: 't-hbm1301d',
    lesson: 'hb-m13-01',
    prompt: 'Curcumin is the bright yellow compound found in which plant?',
    choices: ['Garlic', 'Ginger', 'Corn', 'Turmeric'],
    answer: 3,
    feedback: [
      'Garlic makes allicin, and it is not yellow.',
      'Ginger makes gingerol, which brings heat rather than colour.',
      'Corn is a grass and is not the source of curcumin.',
      null
    ],
    why: 'Curcumin is what stains everything yellow when turmeric is cut, and she has turmeric in a container.'
  },
  {
    id: 't-hbm1301e',
    lesson: 'hb-m13-01',
    prompt: 'Gingerol is the compound that makes fresh ginger taste how?',
    choices: ['Sweet', 'Hot', 'Salty', 'Sour'],
    answer: 1,
    feedback: [
      'Sweetness in plants usually attracts animals rather than driving them off.',
      null,
      'Salt is a mineral, and a plant does not build it as a defence.',
      'Sour is usually an acid, and gingerol is not what makes it.'
    ],
    why: 'Heat is a warning, and the plant builds it so that something underground stops chewing the rhizome.'
  },
  {
    id: 't-hbm1301f',
    lesson: 'hb-m13-01',
    prompt: 'Two plants grow together. The bitter one is untouched and the sweet one is eaten down. Which spreads?',
    choices: [
      'The sweet one, because animals carry its seeds further',
      'Neither, because taste and seed are unconnected',
      'The bitter one, because it survives long enough to make seed',
      'Both equally, because they share the same soil'
    ],
    answer: 2,
    feedback: [
      'An animal eating the plant to the stem is not carrying seed anywhere.',
      'They are tightly connected, because being eaten stops a plant seeding.',
      null,
      'Shared soil does not mean shared odds of surviving to seed.'
    ],
    why: 'A defence spreads because the defended plants are the ones still standing at seed time.'
  },
  {
    id: 't-hbm1301g',
    lesson: 'hb-m13-01',
    prompt: 'Caffeine is in a coffee plant for what reason?',
    choices: [
      'To keep the plant awake through the night',
      'To act on insects that chew the leaves',
      'To make the beans taste good to people',
      'To help the plant take in more sunlight'
    ],
    answer: 1,
    feedback: [
      'Plants do not sleep and do not need waking.',
      null,
      'People came along long afterwards. That part is an accident.',
      'Sunlight is caught by chlorophyll, which is a different compound entirely.'
    ],
    why: 'Caffeine is a defence chemical, and the fact that people enjoy it was never the point.'
  },
  {
    id: 't-hbm1301h',
    lesson: 'hb-m13-01',
    prompt: 'Building a defence chemical costs the plant something. What?',
    choices: ['Water', 'Energy', 'Seeds', 'Roots'],
    answer: 1,
    feedback: [
      'Water is needed for almost everything, so it does not single this out.',
      null,
      'Seeds are what the plant is protecting, not what it spends.',
      'Roots feed the plant and are not traded away for chemistry.'
    ],
    why: 'Because it costs energy, a defence only stays in a species if it earns that energy back.'
  },
  {
    id: 't-hbm1301i',
    lesson: 'hb-m13-01',
    prompt: 'Which word means an animal that eats plants?',
    choices: ['Compound', 'Allicin', 'Herbivore', 'Antifeedant'],
    answer: 2,
    feedback: [
      'A compound is one kind of chemical.',
      'Allicin is the sharp compound in cut garlic.',
      null,
      'An antifeedant is the chemical that stops the herbivore eating.'
    ],
    why: 'Herbivore names the eater, and every plant defence in this lesson exists because of one.'
  },
  {
    id: 't-hbm1301j',
    lesson: 'hb-m13-01',
    prompt: 'During the defence survey, who cuts the garlic and what happens to it afterwards?',
    choices: [
      'Gigi cuts it, and it goes in a labelled jar and never in a mouth',
      'You cut it, as long as you are careful with the knife',
      'You cut it and taste a tiny piece to compare',
      'Nobody cuts it, because garlic is dangerous to touch'
    ],
    answer: 0,
    feedback: [
      null,
      'The knife is a grown-up job in this lesson, with no exception.',
      'Nothing is tasted, even food you eat at dinner, because today it is a sample.',
      'Garlic is safe to handle. The knife is what needs a grown-up.'
    ],
    why: 'A sample is not food, and keeping those two apart is a habit worth having for life.'
  },

  // =========================================================================
  // LESSON 74 · hb-m13-02 · Willow bark to aspirin
  // =========================================================================
  {
    id: 't-hbm1302a',
    lesson: 'hb-m13-02',
    prompt: 'Who sent a report about willow bark to the Royal Society in 1763?',
    choices: ['Johann Buchner', 'Edward Stone', 'Raffaele Piria', 'Felix Hoffmann'],
    answer: 1,
    feedback: [
      'Buchner isolated and named salicin, and that was 1828.',
      null,
      'Piria turned salicin into salicylic acid in 1838.',
      'Hoffmann worked at Bayer in 1897, at the other end of the story.'
    ],
    why: 'Stone is the first mark on her timeline, and everything after him is measured from that year.'
  },
  {
    id: 't-hbm1302b',
    lesson: 'hb-m13-02',
    prompt: 'What did Johann Buchner pull out of willow bark in 1828?',
    choices: ['Aspirin', 'Quinine', 'Salicin', 'Digitalis'],
    answer: 2,
    feedback: [
      'Aspirin was the Bayer name, and that came in 1899.',
      'Quinine came from cinchona bark in 1820, and different chemists did it.',
      null,
      'Digitalis came from foxglove and belongs to another story.'
    ],
    why: 'Isolating salicin turned bark into a compound, and only a compound can be weighed.'
  },
  {
    id: 't-hbm1302c',
    lesson: 'hb-m13-02',
    prompt: 'Raffaele Piria turned salicin into what, in 1838?',
    choices: ['Salicylic acid', 'Acetylsalicylic acid', 'Quinine', 'Curcumin'],
    answer: 0,
    feedback: [
      null,
      'That came later, from Gerhardt in 1853 and then Bayer in 1897.',
      'Quinine is from cinchona bark and has nothing to do with willow.',
      'Curcumin is the yellow compound in turmeric.'
    ],
    why: 'Each name on the timeline is one more step of chemistry, done by a different person in a different country.'
  },
  {
    id: 't-hbm1302d',
    lesson: 'hb-m13-02',
    prompt: 'Charles Gerhardt made acetylsalicylic acid for the first time in which year?',
    choices: ['1763', '1828', '1853', '1897'],
    answer: 2,
    feedback: [
      'That is the year Edward Stone sent his report.',
      'That is the year Buchner named salicin.',
      null,
      'That is the year Bayer made it pure and stable enough to sell.'
    ],
    why: 'Gerhardt made it once, in 1853, and forty four years passed before anybody could make it reliably.'
  },
  {
    id: 't-hbm1302e',
    lesson: 'hb-m13-02',
    prompt: 'What did Bayer actually achieve in 1897 that had not been achieved before?',
    choices: [
      'They discovered willow bark for the first time',
      'They found the first chemist willing to work on it',
      'They made the compound pure and stable enough to sell',
      'They planted enough willow trees to supply Europe'
    ],
    answer: 2,
    feedback: [
      'Willow bark had been known and written about for well over a century.',
      'Four chemists had already worked on it before Bayer did.',
      null,
      'The tablet is made, not harvested, so trees were not the bottleneck.'
    ],
    why: 'Making a compound once is chemistry, and making it the same every time is manufacturing.'
  },
  {
    id: 't-hbm1302f',
    lesson: 'hb-m13-02',
    prompt: 'What happened in 1899?',
    choices: [
      'Bayer named the drug Aspirin and sold it around the world',
      'Edward Stone wrote to the Royal Society',
      'Salicin was isolated for the first time',
      'The first willow tree was planted in Germany'
    ],
    answer: 0,
    feedback: [
      null,
      'That was 1763, one hundred and thirty six years earlier.',
      'That was Buchner in 1828.',
      'Willows have grown across Europe for far longer than that.'
    ],
    why: '1899 is the last mark on her timeline, at 27.2 centimetres, and the whole story fits before it.'
  },
  {
    id: 't-hbm1302g',
    lesson: 'hb-m13-02',
    prompt: 'Why can two pieces of bark from one willow tree hold different amounts of salicin?',
    choices: [
      'Because bark from a healthy tree is always identical',
      'Because a tree is alive, so season and branch age change what is inside',
      'Because salicin leaks out of bark once a branch is cut',
      'Because only the roots of a willow make salicin'
    ],
    answer: 1,
    feedback: [
      'Even a perfectly healthy tree varies through the year. That is normal.',
      null,
      'Leaking is not the issue. The amount differed before anybody cut anything.',
      'Bark is where it was found, which is why the bark was the thing collected.'
    ],
    why: 'Anything living varies, so anything living has to be measured before it can be trusted.'
  },
  {
    id: 't-hbm1302h',
    lesson: 'hb-m13-02',
    prompt: 'What is the active ingredient in a medicine?',
    choices: [
      'The one compound that is doing the work',
      'Everything in the box except the compound',
      'The number printed on the outside',
      'The colour that has been added to the coating'
    ],
    answer: 0,
    feedback: [
      null,
      'Everything else has its own name, and that name is excipients.',
      'That is the batch number.',
      'Colour helps people tell tablets apart, and it does nothing else.'
    ],
    why: 'Naming the active ingredient on the box is what tells anybody what is really in there.'
  },
  {
    id: 't-hbm1302i',
    lesson: 'hb-m13-02',
    prompt: 'What is a batch?',
    choices: [
      'A single tablet on its own',
      'One production run, made together from the same materials',
      'A shop that sells medicine',
      'The list of ingredients on a box'
    ],
    answer: 1,
    feedback: [
      'One tablet comes from a batch, but it is not the batch.',
      null,
      'That is a pharmacy, and it is where the batch ends up.',
      'That list matters, but it is not what batch means.'
    ],
    why: 'Everything made together shares a number, and that number is what makes tracing a fault possible.'
  },
  {
    id: 't-hbm1302j',
    lesson: 'hb-m13-02',
    prompt: 'In the timeline activity, who is allowed to hold and read the medicine box?',
    choices: [
      'Gigi only, and she puts it straight back afterwards',
      'Whichever of you is closer to the cupboard',
      'You, as long as you keep the box shut',
      'Either of you, because reading a box is not the same as opening it'
    ],
    answer: 0,
    feedback: [
      null,
      'Where you are standing has nothing to do with it.',
      'A child never touches a medicine box, open or shut.',
      'The rule is about touching the box at all, not about opening it.'
    ],
    why: 'A child never opens, touches or takes medicine, whatever is printed on the outside of it.'
  },

  // =========================================================================
  // LESSON 75 · hb-m13-03 · Finding the active compound
  // =========================================================================
  {
    id: 't-hbm1303a',
    lesson: 'hb-m13-03',
    prompt: 'What is a mixture?',
    choices: [
      'One kind of chemical on its own',
      'Lots of different substances together without being joined',
      'A compound built in a laboratory',
      'A plant that has been dried and ground'
    ],
    answer: 1,
    feedback: [
      'That is a pure compound, which is what you get at the end.',
      null,
      'That is synthesis, and it happens after the finding.',
      'Grinding changes the size of the pieces, not what is in them.'
    ],
    why: 'A leaf is a mixture of hundreds of compounds, which is exactly why finding one is hard.'
  },
  {
    id: 't-hbm1303b',
    lesson: 'hb-m13-03',
    prompt: 'What is a fraction, in chemistry?',
    choices: [
      'One part of a mixture after it has been split up',
      'A compound nobody has ever separated',
      'A number written above another number',
      'The colour a leaf gives to water'
    ],
    answer: 0,
    feedback: [
      null,
      'A fraction only exists after splitting, never before it.',
      'That is a fraction in maths, and this is a different meaning.',
      'That is a pigment, which is a compound with a colour.'
    ],
    why: 'Each round of splitting makes fractions, and testing them is how the crowd gets smaller.'
  },
  {
    id: 't-hbm1303c',
    lesson: 'hb-m13-03',
    prompt: 'Fractions one, two and four do nothing, and fraction three works. What comes next?',
    choices: [
      'Mix all four back together and start over',
      'Test fraction one again to be sure',
      'Split fraction three and test the pieces',
      'Stop, because fraction three is now pure'
    ],
    answer: 2,
    feedback: [
      'Mixing them rebuilds the very crowd you were breaking up.',
      'Retesting is fair enough, but it moves you no closer to the compound.',
      null,
      'Fraction three is a smaller crowd, not one compound. It could hold fifty.'
    ],
    why: 'The loop is split, test, keep the piece that works, and split it again until nothing is left to split.'
  },
  {
    id: 't-hbm1303d',
    lesson: 'hb-m13-03',
    prompt: 'Pelletier and Caventou isolated quinine in 1820, from the bark of which tree?',
    choices: ['Willow', 'Cinchona', 'Pacific yew', 'Foxglove'],
    answer: 1,
    feedback: [
      'Willow bark gave salicin, and that was Buchner in 1828.',
      null,
      'Pacific yew gave paclitaxel, and that story starts in the 1960s.',
      'Foxglove is a flower rather than a tree, and it has no bark.'
    ],
    why: 'Before them people had bark, and after them people had a compound they could weigh.'
  },
  {
    id: 't-hbm1303e',
    lesson: 'hb-m13-03',
    prompt: 'What did Percy Julian build in a laboratory in 1935?',
    choices: ['Aspirin', 'Quinine', 'Artemisinin', 'Physostigmine'],
    answer: 3,
    feedback: [
      'Aspirin was Bayer, in 1897.',
      'Quinine was isolated by Pelletier and Caventou in 1820.',
      'Artemisinin was Tu Youyou, in 1972.',
      null
    ],
    why: 'He and Josef Pikl completed the synthesis at DePauw University, building it rather than extracting it.'
  },
  {
    id: 't-hbm1303f',
    lesson: 'hb-m13-03',
    prompt: 'Why do chemists work to build a compound instead of harvesting it from a rare plant?',
    choices: [
      'Because the built version is a different and better compound',
      'Because a rare plant would run out, and stripping it ends the supply',
      'Because harvesting plants is against the law everywhere',
      'Because laboratories are always cheaper than fields'
    ],
    answer: 1,
    feedback: [
      'Built correctly, it is the same compound. That is the whole point of it.',
      null,
      'Plenty of plants are harvested legally. Supply is the real problem.',
      'Sometimes they are and sometimes they are not, and that is not the reason.'
    ],
    why: 'Building it protects the plant and gives a steady supply, which is what a medicine needs.'
  },
  {
    id: 't-hbm1303g',
    lesson: 'hb-m13-03',
    prompt: 'In 1973 Percy Julian became the first African American chemist elected to what?',
    choices: [
      'The Royal Society in London',
      'The Nobel Prize committee',
      'The National Academy of Sciences',
      'The World Health Organization'
    ],
    answer: 2,
    feedback: [
      'The Royal Society is in Britain, and that is where Edward Stone reported.',
      'Nobel Prizes are awarded, not joined.',
      null,
      'That body keeps the essential medicines list, and it is not a science academy.'
    ],
    why: 'It took until 1973, which tells you something true about the country he worked in.'
  },
  {
    id: 't-hbm1303h',
    lesson: 'hb-m13-03',
    prompt: 'Why is the starting line on a chromatography strip drawn in pencil rather than pen?',
    choices: [
      'Because pencil is easier to rub out afterwards',
      'Because pen ink would climb the paper and mix into your result',
      'Because pencil helps the water climb faster',
      'Because pen is too thick to draw a straight line'
    ],
    answer: 1,
    feedback: [
      'You do not rub it out. You need it to stay put and be readable.',
      null,
      'The pencil does nothing to the water at all.',
      'You could draw a fine pen line easily. That is not the problem.'
    ],
    why: 'Pencil is graphite and stays where it is put, while ink is the very thing you are separating.'
  },
  {
    id: 't-hbm1303i',
    lesson: 'hb-m13-03',
    prompt: 'On the strip, what does the climbing water actually do to the dot of ink?',
    choices: [
      'It washes the dot away completely',
      'It turns one colour into several new colours',
      'It carries the parts of the ink different distances up the paper',
      'It dries the ink so that it stops moving'
    ],
    answer: 2,
    feedback: [
      'If it washed away you would see nothing, and you can see bands.',
      'No new colour is made. Those colours were in the pen all along.',
      null,
      'Drying is what happens at the end, after the separating.'
    ],
    why: 'Different compounds travel at different speeds, and that difference is what separates them.'
  },
  {
    id: 't-hbm1303j',
    lesson: 'hb-m13-03',
    prompt: 'Who handles the rubbing alcohol during the leaf run, and where?',
    choices: [
      'Gigi, near an open window and away from any flame',
      'You, as long as you wear gloves',
      'Either of you, because it is only alcohol',
      'Nobody, because rubbing alcohol is never used in science'
    ],
    answer: 0,
    feedback: [
      null,
      'Gloves do not change whose job it is, and this one is not yours.',
      'It burns easily and the fumes are strong, so it is not a shared job.',
      'It is used constantly in laboratories, by trained people.'
    ],
    why: 'Anything that catches fire easily is a grown-up job, and that rule does not bend for a good experiment.'
  },

  // =========================================================================
  // LESSON 76 · hb-m13-04 · From a leaf to a pill
  // =========================================================================
  {
    id: 't-hbm1304a',
    lesson: 'hb-m13-04',
    prompt: 'What is an excipient?',
    choices: [
      'The active compound in a medicine',
      'Any ingredient in a tablet that is not the active compound',
      'The machine that presses tablets',
      'The code that identifies a production run'
    ],
    answer: 1,
    feedback: [
      'The active compound is the one thing an excipient is never.',
      null,
      'That is a tablet press, and it is equipment rather than an ingredient.',
      'That is the batch number.'
    ],
    why: 'Excipients are usually most of the tablet, and every one of them is there for a reason.'
  },
  {
    id: 't-hbm1304b',
    lesson: 'hb-m13-04',
    prompt: 'What job does a filler do?',
    choices: [
      'Holds the powder together under pressure',
      'Makes the tablet break apart in water',
      'Adds bulk so the tablet is big enough to handle',
      'Seals the outside until it is swallowed'
    ],
    answer: 2,
    feedback: [
      'That is the binder.',
      'That is the disintegrant.',
      null,
      'That is the coating.'
    ],
    why: 'An active compound can be smaller than a grain of salt, and nobody could count or hold that.'
  },
  {
    id: 't-hbm1304c',
    lesson: 'hb-m13-04',
    prompt: 'What job does a binder do?',
    choices: [
      'Holds the powder together so the tablet does not crumble',
      'Adds bulk to make the tablet bigger',
      'Swells in water to break the tablet open',
      'Gives the tablet its colour'
    ],
    answer: 0,
    feedback: [
      null,
      'That is the filler.',
      'That is the disintegrant, and it is the opposite job.',
      'Colouring is added so people can tell tablets apart.'
    ],
    why: 'A tablet has to survive a box, a lorry and a pocket without falling to powder.'
  },
  {
    id: 't-hbm1304d',
    lesson: 'hb-m13-04',
    prompt: 'A tablet is still whole an hour after being swallowed. Which ingredient failed?',
    choices: ['Filler', 'Binder', 'Coating', 'Disintegrant'],
    answer: 3,
    feedback: [
      'Bulk decides how big it is, not whether it opens.',
      'The binder plainly worked, which is why it is still in one piece.',
      'A weak coating would open it too early, which is the opposite fault.',
      null
    ],
    why: 'Holding together and falling apart are two different jobs, and a tablet has to do both on time.'
  },
  {
    id: 't-hbm1304e',
    lesson: 'hb-m13-04',
    prompt: 'What does the coating on a tablet do?',
    choices: [
      'Makes the tablet heavier so it is easier to weigh',
      'Seals the tablet until it has been swallowed',
      'Holds the powder together instead of a binder',
      'Marks which batch the tablet came from'
    ],
    answer: 1,
    feedback: [
      'Weighing is done on the powder long before any coating goes on.',
      null,
      'The binder does that inside, and the coating is on the outside.',
      'The batch number goes on the box, not on the tablet.'
    ],
    why: 'A sealed tablet keeps damp air out and keeps the inside intact until it is meant to open.'
  },
  {
    id: 't-hbm1304f',
    lesson: 'hb-m13-04',
    prompt: 'Why does every box carry a batch number?',
    choices: [
      'So that a faulty run can be traced and every box called back',
      'So that shops know how much to charge for it',
      'So that customers can count the tablets inside',
      'So that the factory knows which machine is fastest'
    ],
    answer: 0,
    feedback: [
      null,
      'Price is printed separately and has nothing to do with tracing.',
      'The count is printed too, and it is a different number entirely.',
      'Speed is a factory matter and is not why the number is on your box.'
    ],
    why: 'Without a number, one bad batch could never be told apart from a good one.'
  },
  {
    id: 't-hbm1304g',
    lesson: 'hb-m13-04',
    prompt: 'Why is most of a tablet not the active compound?',
    choices: [
      'Because the compound would be too expensive on its own',
      'Because factories are not able to make it any purer',
      'Because the compound is often a speck too small to handle or count',
      'Because rules say a tablet has to contain many ingredients'
    ],
    answer: 2,
    feedback: [
      'Cost matters in some cases, but the size problem comes first.',
      'Purifying it is exactly what they are good at.',
      null,
      'There are strict rules, but they are about safety rather than about numbers of ingredients.'
    ],
    why: 'Bulk is what turns an invisible amount into an object a person can hold and count.'
  },
  {
    id: 't-hbm1304h',
    lesson: 'hb-m13-04',
    prompt: 'What is a recall?',
    choices: [
      'Testing a sample from every batch before it leaves',
      'Calling every box from one batch back in, because something is wrong',
      'Naming the active ingredient on the outside of a box',
      'Pressing powder into a tablet shape'
    ],
    answer: 1,
    feedback: [
      'That is the testing that happens first, and it is what triggers a recall.',
      null,
      'That is labelling, and it happens on every box either way.',
      'That is tableting, which is the manufacturing step.'
    ],
    why: 'The batch number is the thing that makes a recall possible at all.'
  },
  {
    id: 't-hbm1304i',
    lesson: 'hb-m13-04',
    prompt: 'You weigh your six pellets and they all come out slightly different. What does that show?',
    choices: [
      'That you did the activity carelessly',
      'That the scale is broken and needs new batteries',
      'That making things identical by hand is genuinely hard',
      'That cornflour changes mass while you work with it'
    ],
    answer: 2,
    feedback: [
      'Careful hands still vary. That is the finding, not a fault in you.',
      'A scale that reads different masses for different objects is working.',
      null,
      'Cornflour sitting on a saucer does not change mass on its own.'
    ],
    why: 'Feeling how hard sameness is by hand is what makes a factory measurement mean something.'
  },
  {
    id: 't-hbm1304j',
    lesson: 'hb-m13-04',
    prompt: 'Why do you write NOT MEDICINE on a card before pressing any pellets?',
    choices: [
      'Because a thing that looks like a tablet must never be mistaken for one',
      'Because the cornflour might go off overnight',
      'Because the scale will not work without a label nearby',
      'Because it is a rule about labelling every jar in the kitchen'
    ],
    answer: 0,
    feedback: [
      null,
      'Dry cornflour keeps for a long time, and that is not the risk here.',
      'The scale does not care what is written on your card.',
      'Labelling jars is a good habit, but this card is doing a bigger job.'
    ],
    why: 'Somebody smaller than you might find the jar, and the label is the only thing standing there.'
  },

  // =========================================================================
  // LESSON 77 · hb-m13-05 · The dose makes the poison
  // =========================================================================
  {
    id: 't-hbm1305a',
    lesson: 'hb-m13-05',
    prompt: 'Paracelsus wrote that the amount is what makes something a poison. What did he mean?',
    choices: [
      'That natural substances are always safe',
      'That the amount is what decides whether a substance harms you',
      'That everything is dangerous no matter how little there is',
      'That poisons were invented much later than he thought'
    ],
    answer: 1,
    feedback: [
      'Water is natural and harms a person in a large enough amount.',
      null,
      'At the right amount, water and salt and oxygen are keeping you alive today.',
      'Poisons are real, and he was explaining what makes something act as one.'
    ],
    why: 'Nothing is safe or dangerous by itself, and toxicology has been built on that sentence ever since.'
  },
  {
    id: 't-hbm1305b',
    lesson: 'hb-m13-05',
    prompt: 'Roughly when did Paracelsus live?',
    choices: [
      'About five hundred years ago',
      'About fifty years ago',
      'About two thousand years ago',
      'In the same century as Bayer'
    ],
    answer: 0,
    feedback: [
      null,
      'Fifty years ago is within living memory for plenty of people.',
      'That would put him near Ge Hong, who was later than that anyway.',
      'Bayer is 1897, which is roughly three and a half centuries after he died.'
    ],
    why: 'He died in 1541, so this is an old idea that modern medicine still runs on.'
  },
  {
    id: 't-hbm1305c',
    lesson: 'hb-m13-05',
    prompt: 'Why is water the clearest example of the principle?',
    choices: [
      'Because water is the only substance the rule works for',
      'Because water is not really a substance at all',
      'Because you are mostly water and yet far too much of it harms a person',
      'Because water has no taste, so nobody notices it'
    ],
    answer: 2,
    feedback: [
      'Salt and oxygen do exactly the same thing, and so does almost everything.',
      'Water is a substance, and a very well studied one.',
      null,
      'Taste has nothing to do with whether an amount is safe.'
    ],
    why: 'If the rule holds for the thing you are made of, it holds for everything else too.'
  },
  {
    id: 't-hbm1305d',
    lesson: 'hb-m13-05',
    prompt: 'What is true about salt?',
    choices: [
      'Your nerves need it, and far too much of it is harmful',
      'It is harmful in any amount at all',
      'It is completely safe in any amount',
      'Your body makes all of it for itself'
    ],
    answer: 0,
    feedback: [
      null,
      'You would be in serious trouble without any salt at all.',
      'Far too much salt is genuinely dangerous.',
      'You take it in from food, and your body does not build it.'
    ],
    why: 'Needed and harmful are not opposites, and the amount is what sits between them.'
  },
  {
    id: 't-hbm1305e',
    lesson: 'hb-m13-05',
    prompt: 'Air is about one fifth oxygen. What do divers know about pure oxygen?',
    choices: [
      'That it is completely safe at any pressure',
      'That under pressure it damages the lungs',
      'That it cannot be breathed at all',
      'That it turns into salt underwater'
    ],
    answer: 1,
    feedback: [
      'If that were true, divers would not have to plan their gas mixtures.',
      null,
      'It is breathed in hospitals every day, carefully and with equipment.',
      'Oxygen does not turn into salt anywhere.'
    ],
    why: 'The third of the three examples, and the same rule again: needed to live, harmful at the wrong amount.'
  },
  {
    id: 't-hbm1305f',
    lesson: 'hb-m13-05',
    prompt: 'One drop of colouring goes into a small glass and one into a large jug. What changed?',
    choices: [
      'The number of drops, because a jug needs more',
      'The colour of the drop, which changes with volume',
      'The concentration, because the same drop is spread through more water',
      'Nothing changed, because one drop is one drop'
    ],
    answer: 2,
    feedback: [
      'You put exactly one drop into each. That was the design.',
      'It is the same drop out of the same bottle.',
      null,
      'One drop either way, and yet the two look nothing like each other.'
    ],
    why: 'Concentration is how crowded a substance is, and diluting spreads the same amount thinner.'
  },
  {
    id: 't-hbm1305g',
    lesson: 'hb-m13-05',
    prompt: 'Three identical glasses hold different amounts of salt. How can you tell which is which?',
    choices: [
      'By looking carefully in good light',
      'By weighing them, because your eyes cannot see an amount',
      'By how quickly the water moves when you tip it',
      'You cannot tell by any method at all'
    ],
    answer: 1,
    feedback: [
      'They look identical in any light, which is the whole point of the activity.',
      null,
      'Tipping tells you nothing useful about what is dissolved in there.',
      'A scale tells you straight away, which is why it is on the counter.'
    ],
    why: 'A person cannot see how much of something is in front of them, so an eye is never a scale.'
  },
  {
    id: 't-hbm1305h',
    lesson: 'hb-m13-05',
    prompt: 'A real heart medicine came out of foxglove. What does that tell you about a foxglove leaf?',
    choices: [
      'That the leaf must be a weaker and safer version',
      'That the plant became safe once the medicine was found',
      'Nothing useful, because a leaf is an unknown amount and the plant is poisonous',
      'That a small leaf would be perfectly fine'
    ],
    answer: 2,
    feedback: [
      'Weaker is not the same as safe, and nobody can see how strong a leaf is.',
      'Foxglove is exactly as poisonous now as it was before.',
      null,
      'Small is still unknown, and unknown is the actual problem.'
    ],
    why: 'The medicine is a measured compound made in a factory, and a leaf is none of those things.'
  },
  {
    id: 't-hbm1305i',
    lesson: 'hb-m13-05',
    prompt: 'Pacific yew gave the world a cancer medicine, and yew is poisonous. How can both be true?',
    choices: [
      'They cannot both be true, so one of them is wrong',
      'The medicine is an isolated compound, measured and tested, and the tree is not',
      'Only the roots of a yew are poisonous',
      'The tree stopped being poisonous once it was studied'
    ],
    answer: 1,
    feedback: [
      'Both are true, and holding both at once is the point of this lesson.',
      null,
      'Yew is dangerous well beyond its roots.',
      'Studying a plant changes what people know, not what the plant contains.'
    ],
    why: 'That is exactly why you never eat a plant you have not been taught, whatever came out of it.'
  },
  {
    id: 't-hbm1305j',
    lesson: 'hb-m13-05',
    prompt: 'Who works out and checks how much of a medicine a person is given?',
    choices: [
      'A doctor, and then a pharmacist who checks her working',
      'Anybody who has read enough about it online',
      'The person taking it, going by how they feel',
      'Whoever happens to be holding the box'
    ],
    answer: 0,
    feedback: [
      null,
      'Reading about something is neither training nor measuring.',
      'Feelings are not a measurement, and an amount cannot be seen.',
      'Holding a box is not the same as being trained to work out an amount.'
    ],
    why: 'Strong enough to help is strong enough to hurt, which is why a doctor and a pharmacist measure and I do not.'
  },

  // =========================================================================
  // LESSON 78 · hb-m13-06 · What we still get from plants
  // =========================================================================
  {
    id: 't-hbm1306a',
    lesson: 'hb-m13-06',
    prompt: 'Vincristine and vinblastine came out of which plant?',
    choices: ['Sweet wormwood', 'Pacific yew', 'Madagascar periwinkle', 'Cinchona'],
    answer: 2,
    feedback: [
      'Sweet wormwood gave artemisinin.',
      'Pacific yew gave paclitaxel.',
      null,
      'Cinchona bark gave quinine, back in 1820.'
    ],
    why: 'A small pink flower that people grow in pots turned out to hold two cancer medicines.'
  },
  {
    id: 't-hbm1306b',
    lesson: 'hb-m13-06',
    prompt: 'Vinblastine was isolated from the periwinkle in which year?',
    choices: ['1820', '1897', '1958', '2015'],
    answer: 2,
    feedback: [
      'That is quinine from cinchona bark.',
      'That is Bayer and acetylsalicylic acid.',
      null,
      'That is the year Tu Youyou received her Nobel Prize.'
    ],
    why: 'Robert Noble and Charles Beer did it in Canada in 1958, and vincristine followed in 1961.'
  },
  {
    id: 't-hbm1306c',
    lesson: 'hb-m13-06',
    prompt: 'Paclitaxel was first taken out of the bark of which tree?',
    choices: ['Pacific yew', 'White willow', 'Cinchona', 'Foxglove'],
    answer: 0,
    feedback: [
      null,
      'Willow bark gave salicin, which became aspirin.',
      'Cinchona bark gave quinine.',
      'Foxglove is a flowering plant, not a tree, and it has no bark.'
    ],
    why: 'Bark was collected in 1962, the compound came out in 1966, and the structure was published in 1971.'
  },
  {
    id: 't-hbm1306d',
    lesson: 'hb-m13-06',
    prompt: 'Tu Youyou got artemisinin out of sweet wormwood in which year?',
    choices: ['1935', '1961', '1972', '2015'],
    answer: 2,
    feedback: [
      'That is Percy Julian and physostigmine.',
      'That is vincristine from the Madagascar periwinkle.',
      null,
      'That is the year of the Nobel Prize, forty three years afterwards.'
    ],
    why: 'The work came in 1972, and the world took a very long time to recognise it.'
  },
  {
    id: 't-hbm1306e',
    lesson: 'hb-m13-06',
    prompt: 'What was Tu Youyou awarded in 2015?',
    choices: [
      'A patent on the sweet wormwood plant',
      'Half of the Nobel Prize in Physiology or Medicine',
      'The first Nobel Prize ever awarded',
      'A seat on the World Health Organization'
    ],
    answer: 1,
    feedback: [
      'Nobody can patent a wild plant, and that is not what she was recognised for.',
      null,
      'Nobel Prizes have been awarded since 1901.',
      'That body keeps the essential medicines list, and it is not a prize.'
    ],
    why: 'She shared the prize that year, and her half was for artemisinin.'
  },
  {
    id: 't-hbm1306f',
    lesson: 'hb-m13-06',
    prompt: 'What did the handbook by Ge Hong give Tu Youyou?',
    choices: [
      'A proof that sweet wormwood worked',
      'The chemical structure of artemisinin',
      'One good idea about using a low temperature',
      'A finished medicine ready for testing'
    ],
    answer: 2,
    feedback: [
      'It proved nothing. It pointed somewhere worth looking.',
      'Nobody knew any structures in the year 340.',
      null,
      'She had to isolate and test the compound herself, and that took years.'
    ],
    why: 'The book described soaking rather than boiling, and that hint changed how she ran the extraction.'
  },
  {
    id: 't-hbm1306g',
    lesson: 'hb-m13-06',
    prompt: 'What is the difference between a lead and a proof?',
    choices: [
      'A lead is a clue worth testing. A proof is what a test gives you',
      'A lead is written down, and a proof is spoken aloud',
      'A lead is old, and a proof is new',
      'There is no real difference between them'
    ],
    answer: 0,
    feedback: [
      null,
      'Both can be written down. The difference is whether anybody tested it.',
      'Age has nothing to do with it, and old leads can be excellent ones.',
      'The difference is the whole lesson, and it is what a Nobel Prize was given for.'
    ],
    why: 'A book was the lead and the test was the proof, and mixing those two up is how people get hurt.'
  },
  {
    id: 't-hbm1306h',
    lesson: 'hb-m13-06',
    prompt: 'What is an essential medicine?',
    choices: [
      'A medicine made only from plants',
      'A medicine on the World Health Organization list of ones every country needs',
      'The first medicine ever made for a disease',
      'A medicine that can be bought without asking anybody'
    ],
    answer: 1,
    feedback: [
      'Where it came from is a different question altogether.',
      null,
      'Being first is history, not a place on any list.',
      'How it is sold is decided country by country and is not what the word means.'
    ],
    why: 'Vincristine, which came out of a garden flower, is on that list.'
  },
  {
    id: 't-hbm1306i',
    lesson: 'hb-m13-06',
    prompt: 'The periwinkle was in gardens for years. Why did nobody know about vincristine until 1961?',
    choices: [
      'Because the plant only began making it in the 1950s',
      'Because the flower had not yet been given a scientific name',
      'Because growing a plant is not the same as isolating and testing what is inside',
      'Because gardeners were not permitted to study plants then'
    ],
    answer: 2,
    feedback: [
      'The compound was in there the whole time. Nobody had separated it.',
      'It was named long before, and a name tells you nothing about the chemistry.',
      null,
      'Many people studied it. Nobody had done this particular work.'
    ],
    why: 'A compound stays hidden until somebody isolates it and puts it through a test.'
  },
  {
    id: 't-hbm1306j',
    lesson: 'hb-m13-06',
    prompt: 'Foxglove and Pacific yew are both on your medicine map. What is the rule about them?',
    choices: [
      'They are studied and never picked, because both will hurt a person who eats them',
      'They are safe now, because medicines came out of both of them',
      'They may be picked as long as a grown-up is watching',
      'They are only dangerous when they are flowering'
    ],
    answer: 0,
    feedback: [
      null,
      'Finding a medicine inside a plant changes nothing about the plant.',
      'Watching does not make a poisonous plant safe to pick or handle.',
      'Both are dangerous whether they are in flower or not.'
    ],
    why: 'You never eat a plant you have not been taught, and these two are exactly why that rule exists.'
  }
];

export function itemsForLesson(lessonId) {
  return HERBALISM_M13_BANK.filter((q) => q.lesson === lessonId);
}

export function itemsForLessons(lessonIds) {
  const want = new Set(lessonIds);
  return HERBALISM_M13_BANK.filter((q) => want.has(q.lesson));
}

export default HERBALISM_M13_BANK;
