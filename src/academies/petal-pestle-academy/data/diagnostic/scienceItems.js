// ---------------------------------------------------------------------------
// PARKED — NOT LOADED INTO THE DIAGNOSTIC.
//
// These 36 questions are not imported by data/diagnostic/index.js and no strand
// in config/strands.js refers to them. They are kept, whole, for the Herbalism
// & Botany course.
//
// WHY THEY CAME OUT. The grandmother, on the three science strands: "she
// doesn't need testing for this, she doesn't know any of this." That is not a
// preference, it is a correction. An adaptive diagnostic measures where a child
// sits on material she has been TAUGHT. Point it at content she has never met
// and every answer is a coin toss, the staircase walks to the floor, and the
// number it prints is not a low level — it is the absence of a measurement,
// formatted to look like one.
//
// Teach it first, then measure it. That is the order.
// ---------------------------------------------------------------------------
//
// SCIENCE ITEM BANK — three strands, hand-written.
//
// THE HUMAN BODY strand exists because she wants to be a doctor. It is here to
// find out what she already knows about how a body works, and it is the strand
// most likely to be the reason she keeps opening this app.
//
// CONTENT RULE, ENFORCED IN EVERY ITEM BELOW AND IN scripts/verify-itembank.mjs:
// nothing in this bank tells a child that a plant treats a condition, and
// nothing gives an amount, a dose or a preparation to take. Questions may ask
// what a plant IS, how it grows, what part is used, how people have used it
// historically, and how a claim about it would be TESTED. That is botany,
// history and scientific reasoning. Anything past that line is medical advice
// aimed at a nine-year-old, which this app does not give.
// ---------------------------------------------------------------------------

export const scienceItems = [
  // =========================================================================
  // PLANTS & LIFE SCIENCE
  // =========================================================================
  {
    id: 'pl-01',
    strand: 'plants-life',
    level: 2.3,
    type: 'choice',
    prompt: 'Which part of a plant takes in water from the soil?',
    choices: ['the flower', 'the roots', 'the leaves', 'the seeds'],
    answer: 1,
    choiceFeedback: [
      'Flowers make seeds and attract insects. Something further down does the drinking.',
      null,
      'Leaves catch sunlight and let out water vapour. Water gets IN somewhere else.',
      'Seeds are how a plant makes new plants.'
    ],
    explanation: 'Roots hold the plant steady and pull water and minerals up out of the soil.'
  },
  {
    id: 'pl-02',
    strand: 'plants-life',
    level: 2.8,
    type: 'choice',
    prompt: 'What do most plants need in order to grow?',
    choices: ['sunlight, water and air', 'only water', 'darkness and cold', 'meat and bones'],
    answer: 0,
    choiceFeedback: [
      null,
      'Water alone is not enough. A plant in a dark cupboard with plenty of water still will not thrive.',
      'Most plants grow towards light, not away from it.',
      'Plants make their own food from sunlight — they do not eat animals. (A few unusual ones catch insects, but that is extra, not their main food.)'
    ],
    explanation: 'Plants use sunlight, water and air (carbon dioxide) to make their own food.'
  },
  {
    id: 'pl-03',
    strand: 'plants-life',
    level: 3.3,
    type: 'choice',
    prompt: 'Grandma dries her herbs before storing them. Why does drying help herbs last longer?',
    choices: [
      'It makes them taste sweeter',
      'It removes water, so mould finds it harder to grow',
      'It makes them heavier',
      'It turns them into seeds'
    ],
    answer: 1,
    choiceFeedback: [
      'Drying concentrates flavour, but that is not what stops them spoiling.',
      null,
      'Drying makes herbs LIGHTER, because the water leaves.',
      'Drying does not turn a leaf into a seed — those are different parts of the plant.'
    ],
    explanation: 'Mould and bacteria need moisture. Take the water out and they have a much harder time.'
  },
  {
    id: 'pl-04',
    strand: 'plants-life',
    level: 3.8,
    type: 'choice',
    prompt: 'Put the life cycle of a flowering plant in the right order.',
    choices: [
      'seed → seedling → adult plant → flower → new seed',
      'flower → seed → adult plant → seedling',
      'seedling → seed → flower → adult plant',
      'adult plant → seed → flower → seedling'
    ],
    answer: 0,
    choiceFeedback: [
      null,
      'A flower grows ON a plant — the plant has to exist first.',
      'A seedling comes FROM a seed, so the seed comes first.',
      'The plant grows from a seed, so the seed cannot come after the adult plant in the cycle.'
    ],
    explanation: 'Seed, seedling, adult plant, flower, and the flower makes the next seed — a cycle that repeats.'
  },
  {
    id: 'pl-05',
    strand: 'plants-life',
    level: 4.3,
    type: 'choice',
    prompt: 'Bees move pollen from flower to flower. What does this help plants do?',
    choices: [
      'grow taller',
      'make seeds so new plants can grow',
      'take in more water',
      'change colour'
    ],
    answer: 1,
    choiceFeedback: [
      'Height comes from growth, not from pollen.',
      null,
      'Water comes in through the roots, and pollen has nothing to do with it.',
      'Flower colour attracts the bee in the first place — it is the cause, not the result.'
    ],
    explanation: 'Pollination lets a flower make seeds. No pollination, no seeds, no next generation.'
  },
  {
    id: 'pl-06',
    strand: 'plants-life',
    level: 4.8,
    type: 'choice',
    prompt: 'In photosynthesis, what does a plant mainly use to make its food?',
    choices: [
      'soil and rocks',
      'sunlight, water and carbon dioxide',
      'oxygen and sugar',
      'nitrogen from the air only'
    ],
    answer: 1,
    choiceFeedback: [
      'Soil supplies minerals and support, but it is not what the food is built from.',
      null,
      'Those are the OUTPUTS of photosynthesis, not the inputs. The plant produces sugar and releases oxygen.',
      'Nitrogen matters for growth but is not the raw material of photosynthesis, and plants cannot use it straight from the air.'
    ],
    explanation: 'Sunlight powers the reaction that turns water and carbon dioxide into sugar, releasing oxygen.'
  },
  {
    id: 'pl-07',
    strand: 'plants-life',
    level: 5.3,
    type: 'choice',
    prompt: 'Two mint plants are grown side by side in the same soil, water and light, and one grows much larger. What is the MOST likely explanation?',
    choices: [
      'One plant wanted to grow more',
      'A difference between the plants themselves, such as their genes or their starting size',
      'Plants always grow at different rates for no reason',
      'The larger one is a different species entirely'
    ],
    answer: 1,
    choiceFeedback: [
      'Plants do not want things. Look for a physical difference.',
      null,
      '"No reason" is not an explanation. Something caused the difference, even if it is not obvious.',
      'Possible, but not the MOST likely — the question says both are mint.'
    ],
    explanation: 'When the environment is held the same, remaining differences usually come from the organisms themselves.'
  },
  {
    id: 'pl-08',
    strand: 'plants-life',
    level: 5.8,
    type: 'choice',
    prompt: 'Some plants produce bitter chemicals in their leaves. What is the most likely reason this trait survived over many generations?',
    choices: [
      'Bitter leaves taste better to insects',
      'Bitterness discourages animals from eating them, so more of those plants survive to reproduce',
      'The plants decided to become bitter',
      'Bitterness helps the plant absorb sunlight'
    ],
    answer: 1,
    choiceFeedback: [
      'If insects preferred them, the plants would be eaten more, not less.',
      null,
      'Plants do not decide. Traits spread because the individuals carrying them leave more offspring.',
      'Sunlight is absorbed by chlorophyll in the leaves, which is unrelated to taste.'
    ],
    explanation: 'A trait that helps an organism survive and reproduce becomes more common over generations.'
  },
  {
    id: 'pl-09',
    strand: 'plants-life',
    level: 6.2,
    type: 'choice',
    prompt: 'A field guide warns that one edible plant has a dangerous look-alike. What is the most scientifically sound response?',
    choices: [
      'Pick it anyway — most plants are safe',
      'Learn several identifying features, and never rely on one',
      'Taste a small piece to check',
      'Only pick the ones that smell nice'
    ],
    answer: 1,
    choiceFeedback: [
      '"Most are safe" is exactly the reasoning the warning exists to correct. A single mistake is what matters here.',
      null,
      'Tasting to identify a plant is never a safe test. Identification happens before anything reaches your mouth — and always with a knowledgeable adult.',
      'Smell can be one clue among several, but a single feature is never enough for a plant with a dangerous look-alike.'
    ],
    explanation: 'Careful identification uses multiple independent features — leaf, stem, flower, smell, habitat — checked together, with an expert adult.'
  },
  {
    id: 'pl-10',
    strand: 'plants-life',
    level: 6.5,
    type: 'choice',
    prompt: 'The same herb is grown in two different places. Why might it hold different amounts of its active compounds?',
    choices: [
      'Because the species is different in each place',
      'Because soil, climate, sunlight and harvest time all affect what a plant produces',
      'Because plants change species as they travel',
      'Because measuring equipment is unreliable'
    ],
    answer: 1,
    choiceFeedback: [
      'The question says it is the same species in both places.',
      null,
      'Species do not change as plants are moved. What changes is how the plant grows.',
      'Possible in principle, but the question asks about the PLANT, and there is a well-established biological answer.'
    ],
    explanation: 'Growing conditions shape a plant\'s chemistry — which is exactly why standardising a plant-based product is difficult.'
  },

  // =========================================================================
  // THE HUMAN BODY
  // =========================================================================
  {
    id: 'hb-01',
    strand: 'human-body',
    level: 2.4,
    type: 'choice',
    prompt: 'Which body part pumps blood around your body?',
    choices: ['the lungs', 'the heart', 'the stomach', 'the brain'],
    answer: 1,
    choiceFeedback: [
      'Lungs take in air. Something else does the pumping.',
      null,
      'The stomach helps digest food.',
      'The brain sends messages and controls the body, but it is not the pump.'
    ],
    explanation: 'The heart is a muscle that pumps blood all around your body, over and over, all day.'
  },
  {
    id: 'hb-02',
    strand: 'human-body',
    level: 2.9,
    type: 'choice',
    prompt: 'What do your lungs do when you breathe in?',
    choices: ['take in air', 'push out blood', 'digest food', 'make bones'],
    answer: 0,
    choiceFeedback: [
      null,
      'That is closer to what the heart does.',
      'Digesting happens in the stomach and intestines.',
      'Bones grow, but the lungs are not what makes them.'
    ],
    explanation: 'Lungs take in air so your body can get the oxygen it needs.'
  },
  {
    id: 'hb-03',
    strand: 'human-body',
    level: 3.4,
    type: 'choice',
    prompt: 'What is the main job of your skeleton?',
    choices: [
      'to help you think',
      'to support your body and protect organs inside it',
      'to digest your food',
      'to make you taller each year'
    ],
    answer: 1,
    choiceFeedback: [
      'Thinking happens in the brain — which your skull happens to protect.',
      null,
      'Digestion is the stomach and intestines.',
      'You do grow, but growing is not the skeleton\'s job — it is something that happens to it.'
    ],
    explanation: 'Bones hold you up, let you move, and shield soft organs like your brain, heart and lungs.'
  },
  {
    id: 'hb-04',
    strand: 'human-body',
    level: 3.9,
    type: 'choice',
    prompt: 'Where is most food broken down and taken into the blood?',
    choices: ['the mouth', 'the small intestine', 'the lungs', 'the heart'],
    answer: 1,
    choiceFeedback: [
      'Digestion STARTS in the mouth with chewing and saliva, but most of it happens much further along.',
      null,
      'Lungs handle air, not food.',
      'The heart moves blood; it does not process food.'
    ],
    explanation: 'The small intestine is where most food is broken down and nutrients pass into the blood.'
  },
  {
    id: 'hb-05',
    strand: 'human-body',
    level: 4.4,
    type: 'choice',
    prompt: 'Why does your heart beat faster when you run?',
    choices: [
      'because you are excited',
      'because your muscles need more oxygen, so blood must move faster',
      'because your lungs get smaller',
      'because your bones get heavier'
    ],
    answer: 1,
    choiceFeedback: [
      'Excitement can raise your heart rate, but your heart speeds up when you run even when you are calm. There is a physical reason.',
      null,
      'Lungs do not shrink when you run — they work harder.',
      'Bone weight does not change while you run.'
    ],
    explanation: 'Working muscles use oxygen faster, so the heart pumps faster to deliver it.'
  },
  {
    id: 'hb-06',
    strand: 'human-body',
    level: 4.9,
    type: 'choice',
    prompt: 'What is the main role of white blood cells?',
    choices: [
      'carrying oxygen',
      'helping the body fight infection',
      'building bone',
      'digesting food'
    ],
    answer: 1,
    choiceFeedback: [
      'That is RED blood cells. The two do different jobs — an easy and important pair to keep straight.',
      null,
      'Bone-building cells are a different type entirely.',
      'Digestion happens in the digestive system, not in the blood.'
    ],
    explanation: 'White blood cells are part of the immune system — they find and fight germs.'
  },
  {
    id: 'hb-07',
    strand: 'human-body',
    level: 5.4,
    type: 'choice',
    prompt: 'A doctor takes a patient\'s temperature, pulse and blood pressure before asking any questions. Why measure first?',
    choices: [
      'to save time',
      'to gather objective information that does not depend on how the patient describes it',
      'because measurements are always more important than symptoms',
      'to decide the diagnosis immediately'
    ],
    answer: 1,
    choiceFeedback: [
      'It may save time, but that is not the medical reason.',
      null,
      'Too strong. What the patient reports matters enormously — measurements ADD to it, they do not replace it.',
      'Vital signs rarely give a diagnosis on their own. They are a starting point.'
    ],
    explanation: 'Vital signs are measurable and comparable, which makes them a reliable starting point alongside what the patient describes.'
  },
  {
    id: 'hb-08',
    strand: 'human-body',
    level: 5.9,
    type: 'choice',
    prompt: 'Some things help in a small amount. Why can the same thing harm in a large amount?',
    choices: [
      'It cannot — harmful things are always harmful',
      'Because the body handles a certain amount, and past that point the effect changes',
      'Because large amounts taste worse',
      'Because it becomes a different substance'
    ],
    answer: 1,
    choiceFeedback: [
      'Water, salt, iron and oxygen are all necessary in some amounts and dangerous in others. Amount is part of the effect.',
      null,
      'Taste has nothing to do with whether something is safe.',
      'The substance is the same. What changes is how much of it the body is dealing with.'
    ],
    explanation: 'This is why amounts matter in medicine, and why only a doctor or pharmacist decides them — never a guess.'
  },
  {
    id: 'hb-09',
    strand: 'human-body',
    level: 6.2,
    type: 'choice',
    prompt: 'Two body systems work together to deliver oxygen to your cells. Which two?',
    choices: [
      'digestive and skeletal',
      'respiratory and circulatory',
      'nervous and muscular',
      'immune and digestive'
    ],
    answer: 1,
    choiceFeedback: [
      'Digestion handles food and the skeleton gives structure — neither moves oxygen.',
      null,
      'Those two work together for movement, not for oxygen delivery.',
      'Immunity fights infection; digestion processes food.'
    ],
    explanation: 'The respiratory system takes oxygen in; the circulatory system carries it to every cell.'
  },
  {
    id: 'hb-10',
    strand: 'human-body',
    level: 6.5,
    type: 'choice',
    prompt: 'A patient feels better after starting a new remedy. Why is that alone not enough to prove the remedy worked?',
    choices: [
      'Patients cannot be trusted',
      'Many illnesses improve on their own, and expecting to feel better can change how you feel',
      'Feeling better is not important',
      'Remedies never work'
    ],
    answer: 1,
    choiceFeedback: [
      'This is not about honesty. An accurate report of feeling better still does not tell you WHY.',
      null,
      'Feeling better matters a great deal. The question is what CAUSED it.',
      'Some do. The question is how you find out which.'
    ],
    explanation: 'This is why controlled trials exist — to separate the effect of the treatment from recovery that was happening anyway.'
  },

  // =========================================================================
  // SCIENTIFIC METHOD & INVESTIGATION
  // =========================================================================
  {
    id: 'sm-01',
    strand: 'scientific-method',
    level: 2.5,
    type: 'choice',
    prompt: 'Maya wonders if plants grow better near a window. What should she do FIRST?',
    choices: [
      'Decide the answer',
      'Ask a question she can test',
      'Tell everyone the answer',
      'Throw the plant away'
    ],
    answer: 1,
    choiceFeedback: [
      'Deciding the answer before testing is the one thing a scientist must not do.',
      null,
      'You cannot tell people the answer before you have found it out.',
      'She needs the plant to run the test.'
    ],
    explanation: 'Science starts with a question you can actually test.'
  },
  {
    id: 'sm-02',
    strand: 'scientific-method',
    level: 3.0,
    type: 'choice',
    prompt: 'Maya waters one basil plant with 100 mL a day and the other with 300 mL. Everything else is the same. What is she testing?',
    choices: [
      'how much light the plants get',
      'how much water the plants get',
      'what kind of pot is better',
      'how warm the room is'
    ],
    answer: 1,
    choiceFeedback: [
      'Light was kept the same for both plants, so it cannot be what she is testing.',
      null,
      'The pots were the same, so they are not the thing being tested.',
      'Both plants are in the same room, so temperature is the same for both.'
    ],
    explanation: 'The one thing you change on purpose is the thing you are testing.'
  },
  {
    id: 'sm-03',
    strand: 'scientific-method',
    level: 3.6,
    type: 'choice',
    prompt: 'In both pots Maya keeps everything the same except the water. Why does that matter?',
    choices: [
      'to make it look tidy',
      'so she can tell that any difference was caused by the water',
      'because plants like matching pots',
      'to use less soil'
    ],
    answer: 1,
    choiceFeedback: [
      'Tidiness is nice but it is not the scientific reason.',
      null,
      'Plants have no preference about matching. The reason is about her CONCLUSION, not their comfort.',
      'Soil amount is one of the things kept the same, not the purpose of keeping it the same.'
    ],
    explanation: 'If two things change at once, you cannot tell which one caused the result. That is called a fair test.'
  },
  {
    id: 'sm-04',
    strand: 'scientific-method',
    level: 4.1,
    type: 'choice',
    prompt: 'In Maya\'s experiment, what is the DEPENDENT variable — the thing she measures?',
    choices: [
      'the amount of water',
      'the height the plants grow',
      'the type of soil',
      'the size of the pot'
    ],
    answer: 1,
    choiceFeedback: [
      'That is the INDEPENDENT variable — the thing she changes on purpose.',
      null,
      'Soil is kept the same, so it is a controlled variable.',
      'Pot size is kept the same, so it is a controlled variable.'
    ],
    explanation: 'The dependent variable is the result you measure. It DEPENDS on what you changed.'
  },
  {
    id: 'sm-05',
    strand: 'scientific-method',
    level: 4.6,
    type: 'choice',
    prompt: 'Maya tested only one plant in each group. What is the biggest weakness in her experiment?',
    choices: [
      'She should have used more plants in each group',
      'She measured too carefully',
      'She should have changed two things at once',
      'She wrote down too much'
    ],
    answer: 0,
    choiceFeedback: [
      null,
      'Careful measurement is a strength, never a weakness.',
      'Changing two things at once would make the result impossible to interpret.',
      'Detailed records are a strength.'
    ],
    explanation: 'One plant might just be an unusual plant. More plants per group makes the result more trustworthy.'
  },
  {
    id: 'sm-06',
    strand: 'scientific-method',
    level: 5.1,
    type: 'choice',
    prompt: 'What is a CONTROL group?',
    choices: [
      'the group that gets the biggest amount',
      'the group that does not receive the thing being tested, used for comparison',
      'the person running the experiment',
      'the group that is measured most often'
    ],
    answer: 1,
    choiceFeedback: [
      'That is usually the treatment group at its highest level.',
      null,
      'That is the researcher, not a group.',
      'How often a group is measured is not what makes it a control.'
    ],
    explanation: 'Without a control group you have nothing to compare against, so you cannot say the treatment did anything.'
  },
  {
    id: 'sm-07',
    strand: 'scientific-method',
    level: 5.6,
    type: 'choice',
    prompt: 'A study found that students who drank herbal tea got better grades. Why does that NOT show the tea caused it?',
    choices: [
      'Because tea has no effect on anything',
      'Something else may differ between the two groups. Linked is not the same as caused.',
      'Because grades cannot be measured',
      'Because the study was too small'
    ],
    answer: 1,
    choiceFeedback: [
      'The problem is not that tea definitely does nothing. It is that this study cannot tell us either way.',
      null,
      'Grades are measurable. That is not the flaw here.',
      'Size might also be an issue, but the deeper problem holds no matter how big the study is.'
    ],
    explanation: 'Correlation is not causation. Tea drinkers might sleep more, study more, or differ in some other way entirely.'
  },
  {
    id: 'sm-08',
    strand: 'scientific-method',
    level: 6.0,
    type: 'choice',
    prompt: 'In some trials, neither the patient nor the researcher knows who got the real treatment. Why is it done that way?',
    choices: [
      'to make the study harder',
      'to stop expectations from either person influencing the results',
      'to save money',
      'because patients would refuse otherwise'
    ],
    answer: 1,
    choiceFeedback: [
      'Difficulty is a side effect, not a purpose.',
      null,
      'Blinding usually costs MORE, not less.',
      'Patients consent to blinded trials all the time — they are told it is blinded.'
    ],
    explanation: 'This is a double-blind trial. If either side knows, expectation can shape both what patients feel and how researchers judge it.'
  },
  {
    id: 'sm-09',
    strand: 'scientific-method',
    level: 6.3,
    type: 'choice',
    prompt: 'A researcher runs twenty tests and reports only the one that produced a positive result. What is wrong with this?',
    choices: [
      'Nothing — the positive result is still real',
      'Running many tests makes a chance result likely, so reporting only the winner overstates the evidence',
      'Twenty tests is too few',
      'The other tests were probably done incorrectly'
    ],
    answer: 1,
    choiceFeedback: [
      'The single result might be real, but reporting it alone hides how many chances it had to appear by luck.',
      null,
      'The number of tests is not the problem. Hiding nineteen of them is.',
      'There is no reason to assume that. The issue is selective reporting, not competence.'
    ],
    explanation: 'Test enough things and something will look significant by chance. That is why all results get reported, not just the flattering one.'
  },
  {
    id: 'sm-10',
    strand: 'scientific-method',
    level: 6.5,
    type: 'choice',
    prompt: 'Two good studies on the same plant reach different answers. What is the best next step?',
    choices: [
      'Believe whichever study you prefer',
      'Compare how each was designed — dose, duration, participants, measurements — to find what differs',
      'Conclude that science cannot answer the question',
      'Average the two results together'
    ],
    answer: 1,
    choiceFeedback: [
      'Choosing by preference is how you stop learning anything.',
      null,
      'Disagreement between studies is normal and is usually where the interesting question is, not a dead end.',
      'Averaging two studies that tested different things produces a number about nothing.'
    ],
    explanation: 'Conflicting results usually mean the studies asked slightly different questions. Finding the difference is the real work.'
  },

  // =========================================================================
  // SECOND PASS — two more per strand so an eight-question strand can be re-sat
  // without repeating a question. Order does not matter; the bank sorts by level.
  // =========================================================================
  {
    id: 'pl-11',
    strand: 'plants-life',
    level: 3.1,
    type: 'choice',
    prompt: 'Which part of a plant makes most of its food?',
    choices: ['the roots', 'the leaves', 'the stem', 'the seeds'],
    answer: 1,
    choiceFeedback: [
      'Roots take in water and minerals, and they are underground where there is no light.',
      null,
      'The stem carries water and food around the plant, but it is not where food is made.',
      'Seeds carry a food store for the baby plant — they do not make it.'
    ],
    explanation: 'Leaves are flat and wide to catch as much sunlight as possible, which is what powers food-making.'
  },
  {
    id: 'pl-12',
    strand: 'plants-life',
    level: 5.6,
    type: 'choice',
    prompt: 'Many desert plants have small, waxy or spiny leaves. Why not large flat ones?',
    choices: [
      'To catch more sunlight',
      'To lose less water',
      'To grow faster',
      'To attract more insects'
    ],
    answer: 1,
    choiceFeedback: [
      'Large flat leaves catch MORE sunlight. Desert plants are trading some of that away for something they need more.',
      null,
      'Leaf shape in the desert is about surviving, not speed.',
      'Flowers attract insects. Leaf shape is doing a different job.'
    ],
    explanation: 'Water escapes through leaf surfaces. Less surface area means less water lost — a trade-off against catching light.'
  },
  {
    id: 'hb-11',
    strand: 'human-body',
    level: 3.1,
    type: 'choice',
    prompt: 'Which of these is one of your five senses?',
    choices: ['breathing', 'smell', 'sleeping', 'growing'],
    answer: 1,
    choiceFeedback: [
      'Breathing is something your body does, not a way of sensing the world.',
      null,
      'Sleeping is a state your body goes into, not a sense.',
      'Growing is a change over time, not a sense.'
    ],
    explanation: 'The five senses are sight, hearing, smell, taste and touch — the ways your body takes in information.'
  },
  {
    id: 'hb-12',
    strand: 'human-body',
    level: 5.6,
    type: 'choice',
    prompt: 'Why does a doctor ask about a patient\'s family history?',
    choices: [
      'To be polite',
      'Because some conditions run in families, which changes what is worth checking for',
      'Because families always get the same illnesses',
      'To fill in the paperwork'
    ],
    answer: 1,
    choiceFeedback: [
      'It is a medical question, not small talk.',
      null,
      'Too strong. Family history shifts the odds — it does not decide the outcome.',
      'Paperwork is a side effect. The question has a medical purpose.'
    ],
    explanation: 'Family history changes which possibilities are more likely, which changes what a doctor looks at first.'
  },
  {
    id: 'sm-11',
    strand: 'scientific-method',
    level: 3.9,
    type: 'choice',
    prompt: 'Maya writes down the height of each plant every Monday. Why write it down instead of remembering?',
    choices: [
      'Writing is good practice',
      'Because memory changes and written measurements do not',
      'Because it takes longer',
      'Because her teacher said so'
    ],
    answer: 1,
    choiceFeedback: [
      'True in general, but not the scientific reason.',
      null,
      'Taking longer is not a reason to do something.',
      'It might be true, but the question asks WHY it matters for the experiment.'
    ],
    explanation: 'A record made at the time is evidence. A memory of a measurement is a guess about a measurement.'
  },
  {
    id: 'sm-12',
    strand: 'scientific-method',
    level: 5.9,
    type: 'choice',
    prompt: 'Maya\'s results do not match what she expected. What should she do?',
    choices: [
      'Change the numbers so they match',
      'Report what she actually found and try to work out why',
      'Throw the experiment away and start again quietly',
      'Only tell people about the parts that matched'
    ],
    answer: 1,
    choiceFeedback: [
      'That is falsifying data — the most serious thing a scientist can do wrong.',
      null,
      'Hiding an unexpected result is how the interesting question gets lost. Unexpected results are often where discoveries start.',
      'Selective reporting makes the evidence look stronger than it is.'
    ],
    explanation: 'A result that surprises you is data, not a mistake. The next step is finding out why, in public.'
  }
];
