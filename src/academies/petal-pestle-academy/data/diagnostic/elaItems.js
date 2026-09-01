// ---------------------------------------------------------------------------
// READING & WRITING ITEM BANK — four strands, hand-written.
//
// WHY THESE ARE NOT GENERATED. A maths question with different numbers is the
// same question. A reading question with a different passage is a different
// question, and a generated passage is a passage nobody read before a child
// was asked to reason about it. Every passage, every distractor and every line
// of feedback below was written on purpose.
//
// `choiceFeedback[i]` is null at the correct answer and a specific diagnosis of
// THAT mistake everywhere else. The correct answer is deliberately not always
// in the same position.
//
// READING LOAD IS MEASURED, NOT CLAIMED. An earlier version of this comment
// asserted that every passage sat at or below the grade it tests. That was an
// assertion, nobody had checked it, and when it was finally checked a third of
// the bank failed. `npm run check:reading` now measures sentence length and
// long-word rate on every item in every subject and fails the build if any item
// demands more reading than it tests. Do not re-add a claim here — add a check
// there.
// ---------------------------------------------------------------------------

export const elaItems = [
  // =========================================================================
  // READING COMPREHENSION
  // =========================================================================
  {
    id: 'rc-01',
    strand: 'reading-comprehension',
    level: 2.3,
    type: 'choice',
    passage: 'Mint grows fast. It spreads under the ground and pops up in new places. Many gardeners plant mint in a pot so it cannot take over the whole garden.',
    prompt: 'Why do gardeners plant mint in a pot?',
    choices: ['So it will grow faster', 'So it does not spread all over the garden', 'Because mint likes pots best', 'So the flowers look pretty'],
    answer: 1,
    choiceFeedback: [
      'The passage says mint already grows fast — a pot is not there to speed it up.',
      null,
      'The passage never says mint prefers pots. Look for the reason the writer actually gives.',
      'The passage does not talk about how mint looks. Find the sentence that explains the pot.'
    ],
    explanation: 'The last sentence gives the reason: a pot stops mint from taking over the whole garden.'
  },
  {
    id: 'rc-02',
    strand: 'reading-comprehension',
    level: 2.9,
    type: 'choice',
    passage: 'Maya put a chamomile flower under her microscope. At first it looked like one yellow button with white petals. Up close, she saw that the yellow button was made of hundreds of tiny flowers packed together.',
    prompt: 'What did Maya learn by looking closely?',
    choices: [
      'Chamomile is yellow and white',
      'The yellow middle is really many tiny flowers',
      'Microscopes are hard to use',
      'Chamomile has white petals'
    ],
    answer: 1,
    choiceFeedback: [
      'True, but she could see that without a microscope. The question asks what looking CLOSELY taught her.',
      null,
      'The passage never says the microscope was hard to use.',
      'True, but that was visible before she looked closely. Find the new thing she discovered.'
    ],
    explanation: 'The surprise is in the last sentence — the yellow "button" is really hundreds of tiny flowers.'
  },
  {
    id: 'rc-03',
    strand: 'reading-comprehension',
    level: 3.4,
    type: 'choice',
    passage: 'For hundreds of years, people chewed willow bark when they had a headache. In the 1800s, scientists studied the bark and found the chemical that helped. Later they used what they learned to make aspirin.',
    prompt: 'What is the MAIN idea of this passage?',
    choices: [
      'Willow trees grow near water',
      'Headaches are very common',
      'A medicine people use today came from studying a plant',
      'Scientists worked in the 1800s'
    ],
    answer: 2,
    choiceFeedback: [
      'Willow trees growing near water is not mentioned anywhere in the passage.',
      'Headaches are mentioned, but only as an example. The main idea is bigger than one detail.',
      null,
      'That is one detail from the middle. A main idea has to cover the whole passage, not one sentence.'
    ],
    explanation: 'Every sentence builds the same point: studying a plant led to a medicine we still use.'
  },
  {
    id: 'rc-04',
    strand: 'reading-comprehension',
    level: 3.9,
    type: 'choice',
    passage: 'Nia checked her garden journal. "The basil by the fence is tall and green," she wrote, "but the basil near the wall is short and pale. Both got water every day." She looked up at the wall. It threw a long shadow over the second plant all morning.',
    prompt: 'Why is the basil near the wall probably short and pale?',
    choices: [
      'It did not get enough water',
      'It did not get enough sunlight',
      'It was planted later',
      'The soil near the wall is too wet'
    ],
    answer: 1,
    choiceFeedback: [
      'The passage says clearly that both plants got water every day, so water is not the difference.',
      null,
      'The passage never mentions when either plant was planted. Use the clue the writer put there on purpose.',
      'Nothing in the passage says anything about wet soil. The last sentence points somewhere else.'
    ],
    explanation: 'The writer rules out water on purpose, then mentions the shadow — that is the clue you are meant to use.'
  },
  {
    id: 'rc-05',
    strand: 'reading-comprehension',
    level: 4.4,
    type: 'choice',
    passage: 'Some plants protect themselves with chemicals. A stinging nettle carries tiny hollow hairs like miniature needles. Brush against one and it breaks, releasing a sting. Yet the same plant, once cooked, has been eaten as a spring green for centuries — heat destroys the sting completely.',
    prompt: 'Which sentence best states the CONTRAST the author is making?',
    choices: [
      'Nettles are dangerous and should be avoided',
      'A plant can be both a defence and a food, depending on how it is treated',
      'Cooking makes all plants safe to eat',
      'Nettles have hollow hairs'
    ],
    answer: 1,
    choiceFeedback: [
      'That takes only the first half of the passage. The second half deliberately complicates it.',
      null,
      'The passage says heat destroys the sting of THIS plant. It never makes a claim about all plants — and that claim is not true.',
      'That is a detail, not the contrast. A contrast needs two sides held against each other.'
    ],
    explanation: 'The word "Yet" signals the turn: the same plant stings raw and feeds people cooked.'
  },
  {
    id: 'rc-06',
    strand: 'reading-comprehension',
    level: 4.9,
    type: 'choice',
    passage: 'When Dr. Amina Yusuf began her research, most of the plants she studied had never appeared in a scientific journal — but they had been named, used and passed down by the grandmothers of her region for generations. "The knowledge was never missing," she said. "It simply was not written in the language the journals read."',
    prompt: 'What does Dr. Yusuf mean by her final sentence?',
    choices: [
      'The grandmothers did not speak English',
      'Scientific journals should be translated',
      'The knowledge existed, but science had not counted it as knowledge',
      'The plants had no names'
    ],
    answer: 2,
    choiceFeedback: [
      'That reads "language" too literally. She is talking about the FORM knowledge has to take to be recognised, not which words were spoken.',
      'A reasonable idea, but not what she says. She is making a point about what counts as knowledge, not about translation services.',
      null,
      'She says the opposite — the plants had been named for generations.'
    ],
    explanation: '"Not written in the language the journals read" means the knowledge was real but unrecognised by that system.'
  },
  {
    id: 'rc-07',
    strand: 'reading-comprehension',
    level: 5.3,
    type: 'choice',
    passage: 'Advocates for herbal remedies often point out that many modern drugs began as plant compounds. Critics reply that the crucial word is "began": a purified, measured dose is not the same as a handful of leaves, and the difference between a helpful amount and a harmful one can be small.',
    prompt: "What is the critics' main objection?",
    choices: [
      'Plants have never produced useful medicines',
      'Herbal remedies are always dangerous',
      'The amount and purity of a dose matters, and a plant does not come measured',
      'Modern drugs are too expensive'
    ],
    answer: 2,
    choiceFeedback: [
      'The critics accept that point — the passage says drugs "began as plant compounds" without disputing it.',
      'Too strong. The critics say the difference between helpful and harmful can be SMALL, which is a caution, not a blanket condemnation.',
      null,
      'Cost is never mentioned in the passage.'
    ],
    explanation: 'The critics concede the origin and object to the leap: purified and measured is not the same as a handful of leaves.'
  },
  {
    id: 'rc-08',
    strand: 'reading-comprehension',
    level: 5.8,
    type: 'choice',
    passage: 'The clinical trial found no measurable effect. This did not settle the question. The dose tested was lower than the dose traditionally used, the plant was harvested out of season, and the trial ran for four weeks against a traditional course of three months. A study can be well run and still answer a question nobody asked.',
    prompt: 'What is the author MOST likely arguing?',
    choices: [
      'The remedy definitely works',
      'Clinical trials are useless',
      'A negative result only rules out what the study actually tested',
      'The scientists were dishonest'
    ],
    answer: 2,
    choiceFeedback: [
      'The author never claims this. Pointing out the limits of a study is not the same as claiming the opposite result.',
      'The author calls the study "well run". The objection is about the match between the question and the test, not about trials in general.',
      null,
      'Nothing suggests dishonesty. The author says the study was well run — the criticism is about its design fit, not its integrity.'
    ],
    explanation: 'The last sentence is the thesis: a careful study can still fail to test the thing in dispute.'
  },
  {
    id: 'rc-09',
    strand: 'reading-comprehension',
    level: 6.2,
    type: 'choice',
    passage: 'Every pharmacopoeia is also an archive of who was believed. Remedies recorded by physicians entered the canon; the identical remedy, described by a midwife, was often noted as folklore and dropped by the next edition. The chemistry of the plant did not change between those two pages.',
    prompt: 'The final sentence functions mainly to —',
    choices: [
      'add a scientific fact for interest',
      'show that the difference between the two entries came from status, not evidence',
      'explain how chemists analyse plants',
      'suggest the plants were mislabelled'
    ],
    answer: 1,
    choiceFeedback: [
      'It is a fact, but it is placed as an argument. Ask what work the sentence does, not just what it says.',
      null,
      'The passage explains no chemistry at all. It only asserts that the chemistry stayed the same.',
      'Mislabelling is never suggested — the passage says it was the IDENTICAL remedy.'
    ],
    explanation: 'By noting the chemistry was unchanged, the author shows only the speaker changed — so status, not evidence, decided.'
  },
  {
    id: 'rc-10',
    strand: 'reading-comprehension',
    level: 6.4,
    type: 'choice',
    passage: 'It is tempting to read the persistence of a remedy as proof that it works. But remedies persist for many reasons: they are cheap, they are familiar, they are administered by someone who cares for you, and most illnesses resolve on their own. Persistence is evidence of something. It is not, by itself, evidence of efficacy.',
    prompt: 'Which best describes the reasoning error the author is warning against?',
    choices: [
      'Assuming something is true because it is old',
      'Assuming a remedy caused a recovery that would have happened anyway',
      'Assuming cheap things are ineffective',
      'Assuming doctors are always right'
    ],
    answer: 1,
    choiceFeedback: [
      'Close, and the passage touches it — but the author names a specific mechanism, and it is in the last item on that list.',
      null,
      'The author lists cheapness as a reason remedies survive, not as a reason they fail.',
      'Doctors are not mentioned at all in this passage.'
    ],
    explanation: '"Most illnesses resolve on their own" is the key: the recovery gets credited to the remedy when it may have happened regardless.'
  },

  // =========================================================================
  // VOCABULARY
  // =========================================================================
  {
    id: 'vo-01',
    strand: 'vocabulary',
    level: 2.4,
    type: 'choice',
    prompt: 'Grandma said the dried lavender had a "faint" smell. What does FAINT mean here?',
    choices: ['very strong', 'weak and hard to notice', 'sweet', 'terrible'],
    answer: 1,
    choiceFeedback: [
      'Faint means the opposite of strong.',
      null,
      'Faint describes HOW MUCH smell there is, not whether it is nice.',
      'Faint is not about good or bad — it is about how easy something is to notice.'
    ],
    explanation: 'Faint means weak or barely there.'
  },
  {
    id: 'vo-02',
    strand: 'vocabulary',
    level: 3.0,
    type: 'choice',
    prompt: 'The soil in the raised bed was very MOIST. What does MOIST mean?',
    choices: ['slightly wet', 'completely dry', 'frozen solid', 'full of rocks'],
    answer: 0,
    choiceFeedback: [
      null,
      'Dry is the opposite of moist.',
      'Frozen describes temperature, not how wet something is.',
      'That describes what is IN the soil, not how wet it is.'
    ],
    explanation: 'Moist means a little bit wet — damp, but not soaking.'
  },
  {
    id: 'vo-03',
    strand: 'vocabulary',
    level: 3.5,
    type: 'choice',
    prompt: 'A plant that is EDIBLE is one that —',
    choices: ['grows very tall', 'can be safely eaten', 'has thorns', 'blooms in spring'],
    answer: 1,
    choiceFeedback: [
      'That describes height, not whether it can be eaten.',
      null,
      'Thorns are about how a plant protects itself.',
      'Blooming is about when a plant flowers.'
    ],
    explanation: 'Edible means safe to eat. Related word: "edibles". Always ask a grown-up before eating any plant.'
  },
  {
    id: 'vo-04',
    strand: 'vocabulary',
    level: 4.0,
    type: 'choice',
    prompt: 'The herbs were ABUNDANT this summer. Which word means the same as ABUNDANT?',
    choices: ['plentiful', 'scarce', 'expensive', 'colourful'],
    answer: 0,
    choiceFeedback: [
      null,
      'Scarce means there is not much of something — the opposite of abundant.',
      'Abundant is about the amount, not the price.',
      'Abundant is about how much, not what it looks like.'
    ],
    explanation: 'Abundant means there is a lot of something.'
  },
  {
    id: 'vo-05',
    strand: 'vocabulary',
    level: 4.5,
    type: 'choice',
    prompt: 'The word HERBALIST is built from "herb" + "-ist". What does the ending "-ist" tell you?',
    choices: [
      'it is a kind of plant',
      'it is a person who works with that thing',
      'it happened in the past',
      'there is more than one'
    ],
    answer: 1,
    choiceFeedback: [
      'The "herb" part tells you that. The ENDING adds something different.',
      null,
      'Past tense usually comes from "-ed", not "-ist".',
      'Plurals usually come from "-s". "-ist" does something else.'
    ],
    explanation: '"-ist" means a person who does or studies something: artist, scientist, herbalist.'
  },
  {
    id: 'vo-06',
    strand: 'vocabulary',
    level: 5.0,
    type: 'choice',
    prompt: 'A DORMANT seed is one that —',
    choices: [
      'has already sprouted',
      'is alive but resting, not yet growing',
      'has died',
      'grows only at night'
    ],
    answer: 1,
    choiceFeedback: [
      'Dormant is the stage BEFORE sprouting.',
      null,
      'This is the important difference: dormant means resting, not dead. Given the right conditions it will grow.',
      'Dormant is not about time of day.'
    ],
    explanation: 'Dormant means alive but paused. The root is the same as "dormir", to sleep.'
  },
  {
    id: 'vo-07',
    strand: 'vocabulary',
    level: 5.4,
    type: 'choice',
    prompt: 'The two mints were nearly IDENTICAL. Only one had a hairy stem. What does IDENTICAL mean?',
    choices: ['exactly the same', 'very different', 'both poisonous', 'closely related'],
    answer: 0,
    choiceFeedback: [
      null,
      'The word "but" is the clue. It only makes sense if identical means the same.',
      'The sentence says nothing about safety.',
      'Close, but weaker. Identical is stronger than related — it means matching exactly.'
    ],
    explanation: 'Identical means exactly alike. The one hairy stem is the thing that was not.'
  },
  {
    id: 'vo-08',
    strand: 'vocabulary',
    level: 5.9,
    type: 'choice',
    prompt: 'A remedy described as POTENT is —',
    choices: ['weak', 'strong and powerful', 'sweet-tasting', 'made from flowers'],
    answer: 1,
    choiceFeedback: [
      'Potent means the opposite of weak.',
      null,
      'Potent is about strength of effect, not flavour.',
      'Potent says nothing about what a remedy is made from.'
    ],
    explanation: 'Potent means having a strong effect. Related words: potential, potency.'
  },
  {
    id: 'vo-09',
    strand: 'vocabulary',
    level: 6.1,
    type: 'choice',
    prompt: 'The prefix "anti-" appears in ANTIFUNGAL and ANTISEPTIC. What does "anti-" mean?',
    choices: ['before', 'against or preventing', 'inside', 'many'],
    answer: 1,
    choiceFeedback: [
      '"Before" is "ante-" — one letter different, and a genuinely easy mix-up.',
      null,
      '"Inside" is closer to "intra-".',
      '"Many" is "multi-" or "poly-".'
    ],
    explanation: '"anti-" means against. Antifungal works against fungus; antiseptic works against infection.'
  },
  {
    id: 'vo-10',
    strand: 'vocabulary',
    level: 6.4,
    type: 'choice',
    prompt: 'A scientist writes that a result is "INCONCLUSIVE". This means the study —',
    choices: [
      'proved the remedy does not work',
      'proved the remedy works',
      'did not give a clear enough answer either way',
      'was done incorrectly'
    ],
    answer: 2,
    choiceFeedback: [
      'That would be a conclusive NEGATIVE result. Inconclusive is a third possibility, and mixing these up is one of the most common mistakes in reading science.',
      'That would be a conclusive positive result.',
      null,
      'Inconclusive describes the RESULT, not the quality of the work. A careful study can still be inconclusive.'
    ],
    explanation: 'In-conclusive: not concluding. The evidence was not strong enough to decide either way.'
  },

  // =========================================================================
  // GRAMMAR & USAGE
  // =========================================================================
  {
    id: 'gr-01',
    strand: 'grammar-usage',
    level: 2.3,
    type: 'choice',
    prompt: 'Which sentence is written the right way?',
    choices: [
      'the mint smells fresh',
      'The mint smells fresh.',
      'The mint smells fresh',
      'the Mint smells fresh.'
    ],
    answer: 1,
    choiceFeedback: [
      'A sentence needs a capital letter at the start AND a full stop at the end. This has neither.',
      null,
      'Good capital letter — but a sentence needs a full stop at the end too.',
      'Only names of people and places get capitals in the middle of a sentence. "Mint" is an ordinary noun, and the first word needs the capital instead.'
    ],
    explanation: 'Capital at the start, full stop at the end.'
  },
  {
    id: 'gr-02',
    strand: 'grammar-usage',
    level: 2.9,
    type: 'choice',
    prompt: 'Choose the correct word: "The flowers ___ in the sunshine."',
    choices: ['grows', 'grow', 'growing', 'growed'],
    answer: 1,
    choiceFeedback: [
      '"Grows" goes with ONE thing (the flower grows). "Flowers" is more than one.',
      null,
      '"Growing" needs a helper word in front, like "are growing".',
      '"Growed" is not a word. The past tense of grow is "grew".'
    ],
    explanation: 'More than one flower, so the verb drops the -s: the flowers grow.'
  },
  {
    id: 'gr-03',
    strand: 'grammar-usage',
    level: 3.4,
    type: 'choice',
    prompt: 'Maya carefully picked the chamomile. Which word is the ADVERB?',
    choices: ['Maya', 'carefully', 'picked', 'chamomile'],
    answer: 1,
    choiceFeedback: [
      'Maya is a noun — a person\'s name.',
      null,
      '"Picked" is the verb, the action word. The adverb is the word describing HOW she did it.',
      'Chamomile is a noun — a thing.'
    ],
    explanation: 'An adverb describes how an action was done. "Carefully" tells you how she picked.'
  },
  {
    id: 'gr-04',
    strand: 'grammar-usage',
    level: 3.9,
    type: 'choice',
    prompt: 'Which sentence uses the apostrophe the right way?',
    choices: [
      'The garden\'s herbs are drying.',
      'The gardens\' herbs are drying.',
      'The gardens herb\'s are drying.',
      'The garden\'s herb\'s are drying.'
    ],
    answer: 0,
    choiceFeedback: [
      null,
      'That apostrophe says MANY gardens own the herbs. If it is one garden, the apostrophe goes before the s.',
      'The apostrophe landed on "herbs", which is just a plural — more than one herb, not herbs owning anything.',
      'The second apostrophe is wrong. "Herbs" here is simply a plural, and plurals do not take apostrophes.'
    ],
    explanation: 'One garden owning something: garden\'s. Plurals like "herbs" never take an apostrophe.'
  },
  {
    id: 'gr-05',
    strand: 'grammar-usage',
    level: 4.4,
    type: 'choice',
    prompt: 'Which sentence is a COMPLETE sentence?',
    choices: [
      'Because the lavender bloomed early.',
      'Growing in the sunny corner of the bed.',
      'The lavender bloomed early.',
      'After the rain stopped and the sun came out.'
    ],
    answer: 2,
    choiceFeedback: [
      'This starts with "Because", which leaves you waiting for the rest. What happened because of it?',
      'There is no subject — WHO or what is growing there?',
      null,
      'This sets up a time but never says what happened then. It is a fragment.'
    ],
    explanation: 'A complete sentence needs a subject and a verb and must express a finished thought.'
  },
  {
    id: 'gr-06',
    strand: 'grammar-usage',
    level: 4.9,
    type: 'choice',
    prompt: 'Which sentence has its commas in the right places?',
    choices: [
      'Grandma grows mint thyme and sage.',
      'Grandma grows mint, thyme, and sage.',
      'Grandma grows, mint thyme and sage.',
      'Grandma, grows mint, thyme and sage.'
    ],
    answer: 1,
    choiceFeedback: [
      'A list of three or more items needs commas between them.',
      null,
      'The comma after "grows" splits the verb from what it acts on. Commas separate the LIST items, not the verb.',
      'The comma after "Grandma" cuts the subject off from its verb.'
    ],
    explanation: 'Separate list items with commas: mint, thyme, and sage.'
  },
  {
    id: 'gr-07',
    strand: 'grammar-usage',
    level: 5.3,
    type: 'choice',
    prompt: 'Which sentence uses the correct verb tense throughout?',
    choices: [
      'Yesterday Maya picks the herbs and dried them.',
      'Yesterday Maya picked the herbs and dries them.',
      'Yesterday Maya picked the herbs and dried them.',
      'Yesterday Maya pick the herbs and dry them.'
    ],
    answer: 2,
    choiceFeedback: [
      '"Picks" is present tense but "yesterday" and "dried" are past. Keep one tense.',
      '"Picked" is past but "dries" jumps back to present. Both verbs should match.',
      null,
      'Both verbs are present tense, but "yesterday" puts this firmly in the past.'
    ],
    explanation: '"Yesterday" sets it in the past, so both verbs take past tense: picked, dried.'
  },
  {
    id: 'gr-08',
    strand: 'grammar-usage',
    level: 5.8,
    type: 'choice',
    prompt: 'Which sentence correctly joins two complete thoughts?',
    choices: [
      'The tea steeped for ten minutes, it turned deep gold.',
      'The tea steeped for ten minutes; it turned deep gold.',
      'The tea steeped for ten minutes it turned deep gold.',
      'The tea steeped for ten minutes, and, it turned deep gold.'
    ],
    answer: 1,
    choiceFeedback: [
      'This is a comma splice — a comma alone is not strong enough to join two complete sentences.',
      null,
      'Two complete thoughts have been run together with nothing between them at all.',
      'The extra comma after "and" is not needed and breaks the flow.'
    ],
    explanation: 'Two independent clauses need a semicolon, a full stop, or a comma PLUS a joining word.'
  },
  {
    id: 'gr-09',
    strand: 'grammar-usage',
    level: 6.1,
    type: 'choice',
    prompt: 'Which sentence has NO misplaced modifier?',
    choices: [
      'Dried in the sun, Maya stored the petals in a jar.',
      'Maya stored the petals, dried in the sun, in a jar.',
      'Maya stored the petals in a jar dried in the sun.',
      'In a jar, dried in the sun, Maya stored the petals.'
    ],
    answer: 1,
    choiceFeedback: [
      'As written, this says MAYA was dried in the sun. A modifier attaches to whatever it sits next to.',
      null,
      'This says the JAR was dried in the sun. The petals were.',
      'This still attaches the drying to the jar rather than to the petals.'
    ],
    explanation: 'A describing phrase must sit next to the thing it describes. The petals were dried, so it goes beside "petals".'
  },
  {
    id: 'gr-10',
    strand: 'grammar-usage',
    level: 6.4,
    type: 'choice',
    prompt: 'Which sentence keeps parallel structure?',
    choices: [
      'She enjoys planting, harvesting, and to dry herbs.',
      'She enjoys to plant, harvesting, and drying herbs.',
      'She enjoys planting, harvesting, and drying herbs.',
      'She enjoys planting, to harvest, and drying herbs.'
    ],
    answer: 2,
    choiceFeedback: [
      'The first two are -ing but the third switches to "to dry". All three items in a list should take the same form.',
      'The list starts with "to plant" then switches to -ing. Pick one form and hold it.',
      null,
      'The middle item breaks the pattern. Two -ing words around one "to" verb is the giveaway.'
    ],
    explanation: 'Items in a list should share a grammatical form: planting, harvesting, drying.'
  },

  // =========================================================================
  // WRITING STRATEGIES
  // =========================================================================
  {
    id: 'ws-01',
    strand: 'writing-strategies',
    level: 2.5,
    type: 'choice',
    prompt: 'Maya is writing about how to plant a seed. Which sentence should come FIRST?',
    choices: [
      'Water it gently every day.',
      'First, fill the pot with soil.',
      'Soon a green sprout will appear.',
      'Cover the seed with a little soil.'
    ],
    answer: 1,
    choiceFeedback: [
      'Watering comes after the seed is in the soil.',
      null,
      'The sprout is the last thing to happen, not the first.',
      'You cannot cover a seed before you have soil in the pot.'
    ],
    explanation: 'Instructions go in the order the steps happen. The word "First" is a signal.'
  },
  {
    id: 'ws-02',
    strand: 'writing-strategies',
    level: 3.1,
    type: 'choice',
    prompt: 'This paragraph is about caring for a mint plant. Which sentence does NOT belong?',
    choices: [
      'Mint needs water about twice a week.',
      'Keep mint where it gets some sunshine.',
      'My favourite colour is purple.',
      'Trim the tops so the plant grows bushy.'
    ],
    answer: 2,
    choiceFeedback: [
      'This is about caring for mint, so it belongs.',
      'This is about caring for mint, so it belongs.',
      null,
      'This is about caring for mint, so it belongs.'
    ],
    explanation: 'Every sentence in a paragraph should stick to the topic. A favourite colour is off-topic here.'
  },
  {
    id: 'ws-03',
    strand: 'writing-strategies',
    level: 3.6,
    type: 'choice',
    prompt: 'A paragraph will explain why bees matter to a herb garden. Which is the best TOPIC SENTENCE?',
    choices: [
      'Bees are yellow and black.',
      'Bees are important visitors that help a herb garden grow.',
      'I saw a bee last Tuesday.',
      'Bees can sting you.'
    ],
    answer: 1,
    choiceFeedback: [
      'That is one small detail about how bees look, not the point of the paragraph.',
      null,
      'That is a personal detail, not a main idea the paragraph can build on.',
      'That is a detail, and it points away from the paragraph\'s topic.'
    ],
    explanation: 'A topic sentence states the main idea the rest of the paragraph will support.'
  },
  {
    id: 'ws-04',
    strand: 'writing-strategies',
    level: 4.2,
    type: 'choice',
    prompt: 'Maya wrote: "Chamomile is easy to grow." Which sentence best SUPPORTS that with evidence?',
    choices: [
      'Chamomile is my favourite herb.',
      'Chamomile flowers are white and yellow.',
      'It survives poor soil, needs little water, and reseeds itself each year.',
      'Everyone should grow chamomile.'
    ],
    answer: 2,
    choiceFeedback: [
      'That is an opinion about how she feels, not evidence about how easy it is.',
      'That describes how it looks, which does not tell you anything about growing it.',
      null,
      'That is another opinion, and a stronger one. Opinions do not support other opinions.'
    ],
    explanation: 'Evidence gives specific facts that back the claim. Three concrete reasons do that; opinions do not.'
  },
  {
    id: 'ws-05',
    strand: 'writing-strategies',
    level: 4.7,
    type: 'choice',
    prompt: 'Which transition word best fits? "Lavender likes dry soil. ___ , mint likes soil that stays damp."',
    choices: ['For example', 'In contrast', 'As a result', 'Finally'],
    answer: 1,
    choiceFeedback: [
      '"For example" introduces an illustration of the same point. These two sentences disagree with each other.',
      null,
      '"As a result" shows cause and effect. Mint liking damp soil is not caused by lavender liking dry soil.',
      '"Finally" signals the last item in a sequence, and this is not a sequence.'
    ],
    explanation: 'The two sentences point in opposite directions, so the transition should signal contrast.'
  },
  {
    id: 'ws-06',
    strand: 'writing-strategies',
    level: 5.2,
    type: 'choice',
    prompt: 'Which revision makes this sentence clearest? "The thing that the plant does when it is dry is that it wilts."',
    choices: [
      'The thing a plant does when dry is wilting.',
      'A dry plant wilts.',
      'When it is dry, the thing that happens is the plant wilts.',
      'Wilting is the thing dry plants do.'
    ],
    answer: 1,
    choiceFeedback: [
      'Still carries "the thing that" padding. Cut every word that is not doing work.',
      null,
      'Longer than the original, not shorter. "The thing that happens is" adds nothing.',
      'Better, but "the thing" is still there and the sentence is turned back to front.'
    ],
    explanation: 'Cut the filler and name the subject and action directly: A dry plant wilts.'
  },
  {
    id: 'ws-07',
    strand: 'writing-strategies',
    level: 5.7,
    type: 'choice',
    prompt: 'Maya is writing a report for her science teacher. Which sentence best fits that AUDIENCE and purpose?',
    choices: [
      'OMG chamomile is literally the best!!',
      'People have used chamomile in tea for centuries, and scientists have studied it.',
      'You should totally try chamomile, trust me.',
      'Chamomile. Wow. Just wow.'
    ],
    answer: 1,
    choiceFeedback: [
      'The casual tone and exclamation marks do not suit a report for a teacher.',
      null,
      '"Trust me" asks the reader to take her word for it. A report offers evidence instead.',
      'Fragments and exclamation suit a personal note, not a science report.'
    ],
    explanation: 'A science report uses a formal tone and points to evidence rather than to the writer\'s enthusiasm.'
  },
  {
    id: 'ws-08',
    strand: 'writing-strategies',
    level: 6.0,
    type: 'choice',
    prompt: 'An essay argues that herbal medicine deserves more study. Which sentence best introduces a COUNTERARGUMENT?',
    choices: [
      'Herbal medicine is clearly the best kind of medicine.',
      'Critics reasonably point out that plant compounds vary in strength from harvest to harvest.',
      'Some people just do not understand plants.',
      'Everyone agrees that plants are useful.'
    ],
    answer: 1,
    choiceFeedback: [
      'That restates the writer\'s own position more strongly. A counterargument states the OTHER side.',
      null,
      'That dismisses the other side rather than stating it. A counterargument has to be presented fairly to be worth answering.',
      'That claims there is no disagreement, which removes the counterargument instead of raising it.'
    ],
    explanation: 'A counterargument states the strongest fair version of the opposing view before answering it.'
  },
  {
    id: 'ws-09',
    strand: 'writing-strategies',
    level: 6.3,
    type: 'choice',
    prompt: 'Maya cites a website with no author, no date, and advertisements for the product it recommends. What is the BEST revision?',
    choices: [
      'Keep it — it supports her point',
      'Keep it but add "some people say"',
      'Replace it with a peer-reviewed study or a university source',
      'Remove the citation and make the claim without a source'
    ],
    answer: 2,
    choiceFeedback: [
      'A source that sells the product it recommends has a reason to be one-sided, however well it fits her point.',
      'Softening the wording does not fix the source. The problem is the evidence, not the phrasing.',
      null,
      'Removing the source leaves the claim with nothing behind it, which is weaker still.'
    ],
    explanation: 'No author, no date, and a financial interest are three reasons to find a better source, not to reword the sentence.'
  },
  {
    id: 'ws-10',
    strand: 'writing-strategies',
    level: 6.5,
    type: 'choice',
    prompt: 'Which conclusion best ends an essay without simply repeating it?',
    choices: [
      'In conclusion, as I said, herbs are important and useful.',
      'To sum up, I made three points about herbs.',
      'Not whether plants hold useful compounds, but whether we will study them properly.',
      'And that is why herbs are the best.'
    ],
    answer: 2,
    choiceFeedback: [
      '"As I said" is a signal that the sentence is only repeating. A conclusion should move the idea forward.',
      'Announcing that you made three points is not the same as landing them.',
      null,
      'This restates the thesis in weaker, more casual words than the essay itself used.'
    ],
    explanation: 'A strong conclusion reframes the argument and points at what follows from it.'
  },

  // =========================================================================
  // SECOND PASS — two more per strand, added so an eight-question strand can be
  // re-sat without repeating a question. Ordering does not matter: the bank is
  // sorted by level when it is loaded.
  // =========================================================================
  {
    id: 'rc-11',
    strand: 'reading-comprehension',
    level: 3.1,
    type: 'choice',
    passage: 'Grandma keeps her dried herbs in dark glass jars on a low shelf. She says sunlight fades the colour and takes the smell away.',
    prompt: 'Why does Grandma use dark glass jars?',
    choices: ['Because dark jars are prettier', 'To keep sunlight off the herbs', 'Because they are cheaper', 'To make the shelf tidy'],
    answer: 1,
    choiceFeedback: [
      'The passage never says anything about how the jars look.',
      null,
      'Price is not mentioned anywhere in the passage.',
      'Tidiness is not the reason given. Look at the second sentence.'
    ],
    explanation: 'The second sentence gives the reason: sunlight fades the colour and takes the smell away.'
  },
  {
    id: 'rc-12',
    strand: 'reading-comprehension',
    level: 4.6,
    type: 'choice',
    passage: 'The recipe had been copied by hand four times before it reached her. Somewhere along the way, a pinch of dried thyme had become a bunch of dried thyme. Nobody noticed until the soup came out ruined.',
    prompt: 'What does this passage suggest about copying information by hand?',
    choices: [
      'Handwriting is difficult to read',
      'Small errors can be introduced and passed on without anyone noticing',
      'Recipes should never be shared',
      'Thyme is a difficult herb to use'
    ],
    answer: 1,
    choiceFeedback: [
      'Legibility might be part of how it happened, but the passage is making a bigger point about what happens to information as it travels.',
      null,
      'The passage does not argue against sharing — it shows what can go wrong in the copying.',
      'The thyme is the example, not the point.'
    ],
    explanation: 'One small change survived four copies undetected. That is the point being made about copied information.'
  },
  {
    id: 'vo-11',
    strand: 'vocabulary',
    level: 3.8,
    type: 'choice',
    prompt: 'Grandma said the seedlings were FRAGILE. What does FRAGILE mean?',
    choices: ['easily broken or damaged', 'very strong', 'growing quickly', 'brightly coloured'],
    answer: 0,
    choiceFeedback: [
      null,
      'Fragile means the opposite of strong.',
      'Fragile describes how easily something breaks, not how fast it grows.',
      'Fragile is not about colour.'
    ],
    explanation: 'Fragile means delicate — easily broken. You see it stamped on parcels for the same reason.'
  },
  {
    id: 'vo-12',
    strand: 'vocabulary',
    level: 5.6,
    type: 'choice',
    prompt: 'A plant described as PERENNIAL is one that —',
    choices: [
      'lives for one season only',
      'comes back year after year',
      'grows only in winter',
      'never produces flowers'
    ],
    answer: 1,
    choiceFeedback: [
      'That is an ANNUAL — the opposite. This pair is worth learning together.',
      null,
      'Perennial is about how many years, not which season.',
      'Many perennials flower every year.'
    ],
    explanation: 'Per-ennial: through the years. An annual lasts one season; a perennial returns.'
  },
  {
    id: 'gr-11',
    strand: 'grammar-usage',
    level: 3.1,
    type: 'choice',
    prompt: 'Which word in this sentence is the VERB? "Grandma waters the seedlings every morning."',
    choices: ['Grandma', 'waters', 'seedlings', 'morning'],
    answer: 1,
    choiceFeedback: [
      'Grandma is a noun — the person doing the action.',
      null,
      'Seedlings is a noun — the thing being watered.',
      'Morning is a noun telling you when.'
    ],
    explanation: 'The verb is the action word. Grandma DOES the watering, so "waters" is the verb.'
  },
  {
    id: 'gr-12',
    strand: 'grammar-usage',
    level: 5.6,
    type: 'choice',
    prompt: 'Which sentence uses its pronoun clearly?',
    choices: [
      'Maya told Nia that she had picked the wrong herb.',
      'Maya told Nia, "You picked the wrong herb."',
      'She told her that she picked it wrong.',
      'Maya told Nia about it and she was wrong.'
    ],
    answer: 1,
    choiceFeedback: [
      '"She" could mean Maya or Nia. The sentence has two possible meanings and no way to choose.',
      null,
      'Three pronouns and no names at all — nobody can tell who did what.',
      '"She" is ambiguous again, and "it" has no clear thing it refers to.'
    ],
    explanation: 'A pronoun must point unmistakably at one person. Direct speech removes the ambiguity here.'
  },
  {
    id: 'ws-11',
    strand: 'writing-strategies',
    level: 3.9,
    type: 'choice',
    prompt: 'Maya is writing instructions for drying herbs. Which sentence gives the CLEAREST step?',
    choices: [
      'Do the thing with the herbs.',
      'Tie the stems together and hang them upside down in a dry, dark place.',
      'Herbs should probably be dried somehow.',
      'Drying is important.'
    ],
    answer: 1,
    choiceFeedback: [
      '"The thing" tells the reader nothing about what to actually do.',
      null,
      '"Somehow" leaves the reader exactly where they started.',
      'That says why it matters, not what to do.'
    ],
    explanation: 'A good instruction names the action and the details needed to carry it out.'
  },
  {
    id: 'ws-12',
    strand: 'writing-strategies',
    level: 5.5,
    type: 'choice',
    prompt: 'Which sentence best combines these two? "The chamomile bloomed early." / "The spring was unusually warm."',
    choices: [
      'The chamomile bloomed early and the spring was unusually warm.',
      'The chamomile bloomed early because the spring was unusually warm.',
      'The chamomile bloomed early, the spring was unusually warm.',
      'The chamomile bloomed early but the spring was unusually warm.'
    ],
    answer: 1,
    choiceFeedback: [
      '"And" only stacks the two facts. The relationship between them is more specific than that.',
      null,
      'That is a comma splice, and it still does not show how the two facts connect.',
      '"But" signals a contrast, and these two facts do not contradict each other.'
    ],
    explanation: 'The warm spring explains the early bloom, so a cause-and-effect joining word is the accurate one.'
  },

  // =========================================================================
  // SECOND BANK — 15 more items in each of the four strands.
  //
  // WHY THESE EXIST. Until v3.14 each ELA strand held 15 items and the
  // diagnostic can ask 8, so a strand that had already been sat had at most 7
  // items left. reopenStrand() hid that by clearing the seen-items list, which
  // meant a re-take could serve the same paper — the bug Gigi found. The fix
  // keeps the seen list, and keeping it is only honest if the bank is deep
  // enough to answer with. verify-itembank.mjs now fails the build below
  // MAX_ITEMS_PER_STRAND * 2, so this section is load-bearing, not decorative.
  //
  // The maths strands were already at 30 because they are generated three
  // variants to a template. These are hand-written, like everything else in
  // this file, for the reason stated at the top of it.
  // =========================================================================
  // ---- Reading Comprehension, second bank -------------------------------
  {
    id: 'rc-13',
    strand: 'reading-comprehension',
    level: 1.5,
    type: 'choice',
    passage: 'Ben has a small pot of mint. He puts it on the windowsill. The sun helps it grow.',
    prompt: 'Where does Ben keep his mint?',
    choices: ['On the windowsill', 'Under his bed', 'In the sink', 'Out in the garden'],
    answer: 0,
    choiceFeedback: [
      null,
      'The passage never mentions a bed. Find the sentence with the word "puts".',
      'The passage does not mention a sink.',
      'The mint is in a pot indoors. Find where he puts the pot.'
    ],
    explanation: 'The second sentence says he puts the pot on the windowsill.'
  },
  {
    id: 'rc-14',
    strand: 'reading-comprehension',
    level: 1.7,
    type: 'choice',
    passage: 'Rosa picks a mint leaf. She rubs it between her fingers. Now her hand smells fresh.',
    prompt: 'Why does her hand smell fresh?',
    choices: ['She washed it with soap', 'She rubbed a mint leaf', 'She picked a flower', 'She held a cup of tea'],
    answer: 1,
    choiceFeedback: [
      'The passage never mentions soap or washing.',
      null,
      'She picked a leaf, not a flower.',
      'The passage does not mention tea.'
    ],
    explanation: 'The smell comes from the mint leaf she rubbed between her fingers.'
  },
  {
    id: 'rc-15',
    strand: 'reading-comprehension',
    level: 2.1,
    type: 'choice',
    passage: 'Seeds need water to start growing. They also need warmth. A seed left in a dry, cold shed will just stay a seed.',
    prompt: 'What does a seed need to start growing?',
    choices: ['Water and warmth', 'A shed', 'Cold air', 'Nothing at all'],
    answer: 0,
    choiceFeedback: [
      null,
      'The shed in the passage is where a seed does NOT grow.',
      'The passage says a cold seed just stays a seed.',
      'The first two sentences each name something a seed does need.'
    ],
    explanation: 'The first two sentences name both things: water and warmth.'
  },
  {
    id: 'rc-16',
    strand: 'reading-comprehension',
    level: 2.6,
    type: 'choice',
    passage: 'Grandma hangs her herbs upside down in the shed. The air moves around them and dries them slowly. If she dried them in the sun, the colour would fade.',
    prompt: 'Why does Grandma dry her herbs in the shed?',
    choices: ['The shed is closer to the house', 'The sun would fade their colour', 'Herbs will not dry in the sun', 'She has no room outside'],
    answer: 1,
    choiceFeedback: [
      'The passage never says where the shed is.',
      null,
      'The passage does not say sun-dried herbs stay wet. It names a different problem.',
      'The passage never mentions running out of room.'
    ],
    explanation: 'The last sentence gives the reason: the sun would make the colour fade.'
  },
  {
    id: 'rc-17',
    strand: 'reading-comprehension',
    level: 2.8,
    type: 'choice',
    passage: 'Maya wanted to know if mint grows better in sun or shade. She put one pot in each place. She gave both the same water. After three weeks she measured them.',
    prompt: 'What was Maya trying to find out?',
    choices: ['How much water mint needs', 'Whether sun or shade grows better mint', 'How tall mint can grow', 'Which pot was bigger'],
    answer: 1,
    choiceFeedback: [
      'She gave both pots the same water, so that was not her question.',
      null,
      'She measured the plants, but only to compare the two places.',
      'The passage never compares the pots themselves.'
    ],
    explanation: 'The first sentence states her question: sun or shade.'
  },
  {
    id: 'rc-18',
    strand: 'reading-comprehension',
    level: 3.0,
    type: 'choice',
    passage: 'Nettle leaves sting when you brush past them. Tiny hairs on the leaf break off in your skin. Growers wear thick gloves before they touch a nettle patch.',
    prompt: 'What causes the sting?',
    choices: ['The colour of the leaf', 'Tiny hairs that break off in the skin', 'Thick gloves', 'The size of the patch'],
    answer: 1,
    choiceFeedback: [
      'The passage never mentions the colour.',
      null,
      'Gloves are what stops the sting, not what causes it.',
      'The passage does not say the size of the patch matters.'
    ],
    explanation: 'The second sentence explains it: tiny hairs break off in your skin.'
  },
  {
    id: 'rc-19',
    strand: 'reading-comprehension',
    level: 3.3,
    type: 'choice',
    passage: 'Bees visit lavender all summer long. While they drink, pollen sticks to their legs. They carry it to the next flower, and that is how new seeds get made.',
    prompt: 'What is the pollen doing in this passage?',
    choices: ['Feeding the bees', 'Riding from flower to flower on the bees', 'Making the lavender smell strong', 'Keeping the bees warm'],
    answer: 1,
    choiceFeedback: [
      'The bees drink from the flower. The pollen is the thing that sticks to them.',
      null,
      'The passage never mentions smell.',
      'The passage says nothing about warmth.'
    ],
    explanation: 'The bees carry pollen to the next flower, which is how new seeds are made.'
  },
  {
    id: 'rc-20',
    strand: 'reading-comprehension',
    level: 3.7,
    type: 'choice',
    passage: 'Sailors on long voyages once fell ill because they had no fresh food. In 1747 a doctor named James Lind split sick sailors into groups. He gave each group a different food. The men who ate citrus fruit got well again.',
    prompt: 'What made Lind’s work matter?',
    choices: ['He sailed on a long voyage', 'He compared groups to find out what worked', 'He was the first doctor at sea', 'He cured every sailor on the ship'],
    answer: 1,
    choiceFeedback: [
      'The passage is about what he did with the sailors, not about him sailing.',
      null,
      'The passage never says he was the first.',
      'The passage says the men who ate citrus got well, not that everyone did.'
    ],
    explanation: 'He gave different groups different foods and compared what happened. That is a fair test.'
  },
  {
    id: 'rc-21',
    strand: 'reading-comprehension',
    level: 4.1,
    type: 'choice',
    passage: 'Comfrey grows so fast that growers cut it back three or four times a year. The cut leaves rot down quickly into a dark, rich mulch. Some growers plant a row of it purely to feed the rest of the beds.',
    prompt: 'Why do some growers plant comfrey on purpose?',
    choices: ['Because it flowers early', 'To use the cut leaves as mulch for other plants', 'Because it is hard to grow', 'To keep bees away from the beds'],
    answer: 1,
    choiceFeedback: [
      'The passage never mentions when comfrey flowers.',
      null,
      'The passage says the opposite: it grows so fast it needs cutting back.',
      'The passage does not mention bees.'
    ],
    explanation: 'The last sentence says it plainly: they grow it to feed the other beds.'
  },
  {
    id: 'rc-22',
    strand: 'reading-comprehension',
    level: 4.5,
    type: 'choice',
    passage: 'A herbalist writing in 1653 claimed that a plant’s shape showed its use — a leaf shaped like a liver must be for the liver. The idea was tidy, well liked, and quite wrong. It lasted two hundred years because no one tested it.',
    prompt: 'Why did the idea last so long?',
    choices: ['It was written in a famous book', 'No one checked whether it was true', 'The leaves really did look like organs', 'Doctors agreed with it'],
    answer: 1,
    choiceFeedback: [
      'The passage mentions a writer, but that is not the reason it lasted.',
      null,
      'The passage says the leaves looked that way. Looking alike was never proof.',
      'The passage never says what doctors thought.'
    ],
    explanation: 'The last sentence gives the reason: it lasted because no one tested it.'
  },
  {
    id: 'rc-23',
    strand: 'reading-comprehension',
    level: 4.8,
    type: 'choice',
    passage: 'Two beds sat side by side. One was watered every morning; the other only when the soil felt dry. By August the second bed looked better, and its owner said less water had made the roots grow deeper. But the two beds also had different soil, and one got more afternoon shade.',
    prompt: 'What is the problem with the owner’s conclusion?',
    choices: ['She did not water enough', 'More than one thing was different between the beds', 'August is too late to compare beds', 'Deeper roots do not matter'],
    answer: 1,
    choiceFeedback: [
      'The passage does not say her plants suffered. The problem is with her reasoning.',
      null,
      'The passage never says the time of year was the problem.',
      'The passage does not argue about whether deep roots help.'
    ],
    explanation: 'The soil and the shade differed too, so the water cannot be shown to be the cause.'
  },
  {
    id: 'rc-24',
    strand: 'reading-comprehension',
    level: 5.2,
    type: 'choice',
    passage: 'Dried herb jars often carry a harvest date. Growers argue about how much it matters. One side says the oils that give a leaf its scent fade within a year. An old jar, they say, is weaker. The other side says storage matters more than age. A jar kept dark and cool will outlast a fresh one on a sunny shelf.',
    prompt: 'How do the two sides disagree?',
    choices: ['One trusts labels and the other does not', 'They disagree about whether age or storage matters more', 'One thinks scent is not worth keeping', 'They disagree about how to dry herbs'],
    answer: 1,
    choiceFeedback: [
      'Both sides accept the date. They disagree about what it tells you.',
      null,
      'Both sides treat scent as the thing worth keeping.',
      'Neither side is arguing about drying.'
    ],
    explanation: 'One side puts the weight on age. The other puts it on how the jar was stored.'
  },
  {
    id: 'rc-25',
    strand: 'reading-comprehension',
    level: 5.6,
    type: 'choice',
    passage: 'A study followed 200 growers for a year. Those who grew herbs said they ate more greens. A paper reported this as proof that growing herbs makes people eat better. The study team had said something narrower: the two things went together, and the study could not say which came first.',
    prompt: 'What did the paper get wrong?',
    choices: ['The number of growers in the study', 'It treated two things that went together as cause and effect', 'It said the study lasted a year', 'It reported on greens instead of herbs'],
    answer: 1,
    choiceFeedback: [
      'The passage does not say the number was reported wrongly.',
      null,
      'The passage agrees the study ran for a year.',
      'Greens are what the study measured, so reporting them is not the error.'
    ],
    explanation: 'Two things happening together is correlation. The study could not show that one caused the other.'
  },
  {
    id: 'rc-26',
    strand: 'reading-comprehension',
    level: 5.9,
    type: 'choice',
    passage: 'Willow bark was chewed for pain long before anyone knew why it worked. Chemists later drew out the active part, then changed it to be gentler on the stomach. That changed version became aspirin. The plant did not hold the medicine; it held the clue.',
    prompt: 'What does the last sentence mean?',
    choices: ['The plant was of no use to chemists', 'The willow pointed chemists toward something they then had to make', 'Aspirin grows inside willow bark', 'Chewing bark works as well as aspirin'],
    answer: 1,
    choiceFeedback: [
      'The passage says the plant held the clue, which is the opposite of no use.',
      null,
      'The last sentence says directly that the plant did not hold the medicine.',
      'The passage never compares how well the two work.'
    ],
    explanation: 'The willow gave chemists a starting point. They still had to change it themselves.'
  },
  {
    id: 'rc-27',
    strand: 'reading-comprehension',
    level: 6.3,
    type: 'choice',
    passage: 'Two herb books printed thirty years apart describe the same plant. The first lists where it grows, what it looks like, and a dozen uses drawn from local custom. The second repeats those uses word for word and names no source. A reader who takes the second as proof of the first has counted one book twice.',
    prompt: 'Why is the second book not evidence for the first?',
    choices: ['It was printed too long afterwards', 'It copies the first rather than checking it', 'It describes a different plant', 'It lists fewer uses than the first'],
    answer: 1,
    choiceFeedback: [
      'The gap in time is not the problem. The problem is where the second book got its claims.',
      null,
      'The passage says both books describe the same plant.',
      'The passage says it repeats the same uses, not fewer.'
    ],
    explanation: 'A book that copies another is not a second source. Counting it as one counts the same evidence twice.'
  },

  // ---- Vocabulary, second bank ------------------------------------------
  {
    id: 'vo-13',
    strand: 'vocabulary',
    level: 1.5,
    type: 'choice',
    prompt: 'The seed pot was TINY. What does TINY mean?',
    choices: ['very small', 'very heavy', 'very old', 'very wet'],
    answer: 0,
    choiceFeedback: [null, 'Heavy is about weight, not size.', 'Old is about age, not size.', 'Wet is about water, not size.'],
    explanation: 'Tiny means very small.'
  },
  {
    id: 'vo-14',
    strand: 'vocabulary',
    level: 1.7,
    type: 'choice',
    prompt: 'The stem felt FIRM. What does FIRM mean?',
    choices: ['hard and solid', 'soft and floppy', 'bright green', 'very tall'],
    answer: 0,
    choiceFeedback: [null, 'Floppy is the opposite of firm.', 'That is a colour, not how it feels.', 'That is height, not how it feels.'],
    explanation: 'Firm means hard and solid, not soft.'
  },
  {
    id: 'vo-15',
    strand: 'vocabulary',
    level: 2.1,
    type: 'choice',
    prompt: 'Rosa TRIMMED the plant. What does TRIMMED mean?',
    choices: ['cut a little off it', 'gave it water', 'moved it outside', 'drew a picture of it'],
    answer: 0,
    choiceFeedback: [null, 'Watering adds water. Trimming uses shears.', 'Moving changes where it is, not its shape.', 'Drawing it does not change the plant.'],
    explanation: 'To trim is to cut a small amount off.'
  },
  {
    id: 'vo-16',
    strand: 'vocabulary',
    level: 2.6,
    type: 'choice',
    prompt: 'The jar was NEARLY full. What does NEARLY mean?',
    choices: ['almost', 'never', 'twice', 'only just started'],
    answer: 0,
    choiceFeedback: [null, 'Never means not at all.', 'Twice means two times.', 'Nearly full is much more than just started.'],
    explanation: 'Nearly means almost — very close to it.'
  },
  {
    id: 'vo-17',
    strand: 'vocabulary',
    level: 2.8,
    type: 'choice',
    prompt: 'Rosa SCATTERED the seeds. What does SCATTERED mean?',
    choices: ['threw them loosely over the soil', 'buried them deep', 'counted them', 'washed them'],
    answer: 0,
    choiceFeedback: [null, 'Burying puts each one in one spot. Scattering does not.', 'Counting is not the same as spreading.', 'Washing is about cleaning, not spreading.'],
    explanation: 'To scatter is to throw things loosely so they spread out.'
  },
  {
    id: 'vo-18',
    strand: 'vocabulary',
    level: 3.0,
    type: 'choice',
    prompt: 'The basil WILTED in the heat. What does WILTED mean?',
    choices: ['went limp and droopy', 'grew taller', 'turned bright green', 'made new seeds'],
    answer: 0,
    choiceFeedback: [null, 'Growing is the opposite of what a wilted plant does.', 'A wilted plant loses colour, it does not gain it.', 'Making seeds is not about drooping.'],
    explanation: 'A wilted plant has gone limp and droopy, usually from a lack of water.'
  },
  {
    id: 'vo-19',
    strand: 'vocabulary',
    level: 3.3,
    type: 'choice',
    prompt: 'Grandma brought in the HARVEST. What does HARVEST mean?',
    choices: ['the crop that was gathered', 'the tool she used', 'the shed she works in', 'the seeds she has not planted'],
    answer: 0,
    choiceFeedback: [null, 'A harvest is what you gather, not what you gather it with.', 'The harvest is the crop, not the building.', 'A harvest has already been gathered. Seeds have not.'],
    explanation: 'A harvest is the crop that has been gathered in.'
  },
  {
    id: 'vo-20',
    strand: 'vocabulary',
    level: 3.7,
    type: 'choice',
    prompt: 'The bed had FERTILE soil. What does FERTILE mean?',
    choices: ['rich, so plants grow well in it', 'stony and bare', 'flat and even', 'newly dug'],
    answer: 0,
    choiceFeedback: [null, 'Stony and bare soil is the opposite of fertile.', 'Fertile is about what soil feeds, not its shape.', 'Freshly dug soil is not always rich.'],
    explanation: 'Fertile soil is rich soil — plants grow well in it.'
  },
  {
    id: 'vo-21',
    strand: 'vocabulary',
    level: 4.1,
    type: 'choice',
    prompt: 'The crushed leaf had a PUNGENT smell. What does PUNGENT mean?',
    choices: ['sharp and very strong', 'faint and sweet', 'damp', 'pleasant to everyone'],
    answer: 0,
    choiceFeedback: [null, 'Faint is the opposite of pungent.', 'Damp is about water, not smell.', 'Pungent says how strong a smell is, not whether people like it.'],
    explanation: 'A pungent smell is sharp and very strong.'
  },
  {
    id: 'vo-22',
    strand: 'vocabulary',
    level: 4.5,
    type: 'choice',
    prompt: 'To DILUTE a liquid is to —',
    choices: ['make it weaker by adding water', 'boil it down', 'shake it hard', 'pour it away'],
    answer: 0,
    choiceFeedback: [null, 'Boiling down does the opposite: it makes a thing stronger.', 'Shaking mixes. It does not make anything weaker.', 'Pouring it away leaves you with nothing at all.'],
    explanation: 'To dilute is to add water so the mixture becomes weaker.'
  },
  {
    id: 'vo-23',
    strand: 'vocabulary',
    level: 4.8,
    type: 'choice',
    prompt: 'The seedlings came up SPARSE. What does SPARSE mean?',
    choices: ['thinly spread, with gaps', 'packed tight', 'very tall', 'the same height'],
    answer: 0,
    choiceFeedback: [null, 'Packed tight is the opposite of sparse.', 'Sparse is about how many, not how tall.', 'Sparse is about spacing, not evenness.'],
    explanation: 'Sparse means thinly spread out, with gaps between.'
  },
  {
    id: 'vo-24',
    strand: 'vocabulary',
    level: 5.2,
    type: 'choice',
    prompt: 'To INFUSE dried petals in hot water is to —',
    choices: ['let them soak so the water takes on their colour and scent', 'grind them to powder', 'dry them a second time', 'plant them again'],
    answer: 0,
    choiceFeedback: [null, 'Grinding breaks a thing up. Infusing soaks it.', 'Infusing uses water, so it is not a way of drying.', 'Petals are not planted.'],
    explanation: 'To infuse is to soak something so the water takes on its colour and scent.'
  },
  {
    id: 'vo-25',
    strand: 'vocabulary',
    level: 5.6,
    type: 'choice',
    prompt: 'A claim called ANECDOTAL rests on —',
    choices: ['one or two stories rather than gathered data', 'a large careful study', 'a measurement taken twice', 'a rule everyone agrees on'],
    answer: 0,
    choiceFeedback: [null, 'A large study is the thing anecdotal evidence is being compared against.', 'One repeated measurement is data, not a story.', 'Wide agreement is not the same as one person’s story.'],
    explanation: 'Anecdotal means it rests on stories from a few people, not on gathered data.'
  },
  {
    id: 'vo-26',
    strand: 'vocabulary',
    level: 5.9,
    type: 'choice',
    prompt: 'An idea described as PLAUSIBLE is —',
    choices: ['believable, but not yet shown to be true', 'proven', 'silly', 'impossible'],
    answer: 0,
    choiceFeedback: [null, 'Proven is stronger. Plausible stops short of that.', 'Plausible means it sounds reasonable, which is the opposite of silly.', 'Impossible is the opposite of plausible.'],
    explanation: 'Plausible means an idea sounds believable — but nobody has shown it is true yet.'
  },
  {
    id: 'vo-27',
    strand: 'vocabulary',
    level: 6.3,
    type: 'choice',
    prompt: 'When a study is REPLICATED, someone has —',
    choices: ['run it again to see if the same result comes out', 'written about it', 'argued against it', 'made it larger'],
    answer: 0,
    choiceFeedback: [null, 'Writing about a study is not the same as running it again.', 'Arguing is not testing.', 'A bigger study is a new study, not the same one run again.'],
    explanation: 'To replicate a study is to run it again and see whether the same result comes out.'
  },

  // ---- Grammar & Usage, second bank -------------------------------------
  {
    id: 'gr-13',
    strand: 'grammar-usage',
    level: 1.5,
    type: 'choice',
    prompt: 'Which one is written the right way?',
    choices: ['The mint is green.', 'the mint is green.', 'The mint is green', 'the mint is green'],
    answer: 0,
    choiceFeedback: [null, 'A sentence starts with a capital letter.', 'A sentence ends with a full stop.', 'This one is missing both the capital letter and the full stop.'],
    explanation: 'A sentence starts with a capital letter and ends with a full stop.'
  },
  {
    id: 'gr-14',
    strand: 'grammar-usage',
    level: 1.7,
    type: 'choice',
    prompt: 'Rosa ___ the seeds each day. Which word fits?',
    choices: ['waters', 'water', 'watering', 'to water'],
    answer: 0,
    choiceFeedback: [null, 'Say it aloud: "Rosa water the seeds" does not sound right.', '"Watering" needs a helper word in front of it, like "is".', '"To water" cannot be the action word on its own here.'],
    explanation: 'One person doing something now takes the -s ending: Rosa waters.'
  },
  {
    id: 'gr-15',
    strand: 'grammar-usage',
    level: 2.1,
    type: 'choice',
    prompt: 'Ben picks a leaf. Which word is the DOING word?',
    choices: ['Ben', 'picks', 'a', 'leaf'],
    answer: 1,
    choiceFeedback: ['Ben is a naming word — a person.', null, '"A" is a little word in front of a naming word.', 'Leaf is a naming word — a thing.'],
    explanation: 'The doing word, or verb, is the action. Here the action is picks.'
  },
  {
    id: 'gr-16',
    strand: 'grammar-usage',
    level: 2.6,
    type: 'choice',
    prompt: 'Which word means MORE THAN ONE leaf?',
    choices: ['leaf', 'leaves', 'leafy', 'leafing'],
    answer: 1,
    choiceFeedback: ['That is just one.', null, '"Leafy" describes something. It does not count anything.', 'That is an action word ending, not a way of counting.'],
    explanation: 'Some naming words change their spelling for more than one: leaf becomes leaves.'
  },
  {
    id: 'gr-17',
    strand: 'grammar-usage',
    level: 2.8,
    type: 'choice',
    prompt: 'Yesterday Rosa ___ the herbs. Which word fits?',
    choices: ['dries', 'dried', 'dry', 'drying'],
    answer: 1,
    choiceFeedback: ['"Dries" is happening now, and this sentence says yesterday.', null, '"Dry" does not show that it already happened.', '"Drying" needs a helper word such as "was" in front of it.'],
    explanation: 'The word "yesterday" means it already happened, so the verb takes its past form: dried.'
  },
  {
    id: 'gr-18',
    strand: 'grammar-usage',
    level: 3.0,
    type: 'choice',
    prompt: 'Rosa and Ben planted mint. ___ watered it together. Which word fits?',
    choices: ['Them', 'They', 'Him', 'It'],
    answer: 1,
    choiceFeedback: ['"Them" is used after the verb, not in front of it.', null, '"Him" is one boy, and the sentence is about two people.', '"It" is a thing, not two people.'],
    explanation: 'A pronoun doing the action takes the form "they".'
  },
  {
    id: 'gr-19',
    strand: 'grammar-usage',
    level: 3.3,
    type: 'choice',
    prompt: 'Which sentence puts the commas in the right place?',
    choices: ['We grew mint, basil and sage.', 'We grew mint basil, and sage.', 'We grew, mint basil and sage.', 'We, grew mint basil and sage.'],
    answer: 0,
    choiceFeedback: [null, 'The comma has landed between the wrong two items.', 'A comma does not go between the verb and the list.', 'A comma does not go between who did it and what they did.'],
    explanation: 'In a list, the comma separates the items themselves.'
  },
  {
    id: 'gr-20',
    strand: 'grammar-usage',
    level: 3.7,
    type: 'choice',
    prompt: 'Which one shows that the jar belongs to Maya?',
    choices: ['Mayas jar', 'Maya’s jar', 'Mayas’ jar', 'Maya jars'],
    answer: 1,
    choiceFeedback: ['Owning needs an apostrophe. This has none.', null, 'The apostrophe goes after the s only when there is more than one owner.', 'That reads as more than one jar, not as owning.'],
    explanation: 'One owner takes an apostrophe and then an s: Maya’s jar.'
  },
  {
    id: 'gr-21',
    strand: 'grammar-usage',
    level: 4.1,
    type: 'choice',
    prompt: 'The tall nettle stung her. Which word is the ADJECTIVE?',
    choices: ['The', 'tall', 'nettle', 'stung'],
    answer: 1,
    choiceFeedback: ['"The" points at a noun. It does not describe it.', null, 'Nettle is the noun. The adjective is the word describing it.', '"Stung" is the verb, the action.'],
    explanation: 'An adjective describes a noun. "Tall" tells you what the nettle was like.'
  },
  {
    id: 'gr-22',
    strand: 'grammar-usage',
    level: 4.5,
    type: 'choice',
    prompt: 'Which sentence is correct?',
    choices: ['The row of jars is dusty.', 'The row of jars are dusty.', 'The row of jars were dusty.', 'The row of jars been dusty.'],
    answer: 0,
    choiceFeedback: [null, 'The jars are not doing anything here. The row is, and a row is one thing.', 'Same trap, in the past. The row is still one thing.', '"Been" needs a helper word such as "has" in front of it.'],
    explanation: 'The subject is "the row", not "jars", and one row takes "is".'
  },
  {
    id: 'gr-23',
    strand: 'grammar-usage',
    level: 4.8,
    type: 'choice',
    prompt: 'Which one is a complete sentence?',
    choices: ['The soil was dry.', 'Because the soil was dry.', 'Drying in the shed all week.', 'After she picked the mint.'],
    answer: 0,
    choiceFeedback: [null, '"Because" leaves you waiting for the rest. It is a fragment.', 'There is no one doing the action here.', '"After" leaves you waiting for what happened next.'],
    explanation: 'A complete sentence has someone or something and a verb, and it does not leave you hanging.'
  },
  {
    id: 'gr-24',
    strand: 'grammar-usage',
    level: 5.2,
    type: 'choice',
    prompt: 'Which sentence is correct?',
    choices: ['The plant lost its leaves.', 'The plant lost it’s leaves.', 'The plant lost its’ leaves.', 'The plant lost its leave’s.'],
    answer: 0,
    choiceFeedback: [null, '"It’s" is short for "it is", and "the plant lost it is leaves" makes no sense.', 'There is no such word as "its’".', 'The apostrophe has been put on the wrong word entirely.'],
    explanation: 'Owning takes "its" with no apostrophe. "It’s" only ever means "it is".'
  },
  {
    id: 'gr-25',
    strand: 'grammar-usage',
    level: 5.6,
    type: 'choice',
    prompt: 'Which one fixes the run-on "The mint spread we moved it"?',
    choices: ['The mint spread, so we moved it.', 'The mint spread, we moved it.', 'The mint spread we moved it!', 'The mint spread; we moved it,'],
    answer: 0,
    choiceFeedback: [null, 'A comma on its own cannot join two complete sentences. That is a comma splice.', 'Changing the end mark does not join the two halves.', 'The semicolon is right, but the sentence now ends on a comma.'],
    explanation: 'Two complete sentences need a joining word, a semicolon, or a full stop between them.'
  },
  {
    id: 'gr-26',
    strand: 'grammar-usage',
    level: 5.9,
    type: 'choice',
    prompt: 'Which sentence keeps one tense the whole way through?',
    choices: ['She picked the leaves and hung them up.', 'She picked the leaves and hangs them up.', 'She picks the leaves and hung them up.', 'She picking the leaves and hung them up.'],
    answer: 0,
    choiceFeedback: [null, 'It starts in the past and then jumps to now.', 'It starts now and then jumps to the past.', '"Picking" needs a helper word, and the tense still jumps.'],
    explanation: 'Both verbs should sit in the same time. Picked and hung are both past.'
  },
  {
    id: 'gr-27',
    strand: 'grammar-usage',
    level: 6.3,
    type: 'choice',
    prompt: 'Which sentence uses the semicolon the right way?',
    choices: ['The mint spread quickly; we moved it to a pot.', 'The mint spread quickly; and we moved it.', 'The mint spread quickly; because it likes damp soil.', 'The mint; spread quickly to the next bed.'],
    answer: 0,
    choiceFeedback: [null, 'A semicolon already does the joining, so the joining word is one too many.', 'What follows is not a complete sentence, so a semicolon is too strong.', 'A semicolon never separates who did it from what they did.'],
    explanation: 'A semicolon joins two halves that could each stand alone as a sentence.'
  },

  // ---- Writing Strategies, second bank ----------------------------------
  {
    id: 'ws-13',
    strand: 'writing-strategies',
    level: 1.5,
    type: 'choice',
    passage: 'Rosa planted a seed. It grew into a plant. She picked a leaf.',
    prompt: 'Which one happened FIRST?',
    choices: ['Rosa planted a seed', 'It grew into a plant', 'She picked a leaf', 'She washed the pot'],
    answer: 0,
    choiceFeedback: [null, 'That happened after the seed went in.', 'That happened last.', 'The passage never says she washed a pot.'],
    explanation: 'The first sentence tells you what happened first: she planted a seed.'
  },
  {
    id: 'ws-14',
    strand: 'writing-strategies',
    level: 1.7,
    type: 'choice',
    prompt: 'Which title fits a story about growing mint?',
    choices: ['Growing Mint in a Pot', 'My Dog', 'A Rainy Day', 'New Shoes'],
    answer: 0,
    choiceFeedback: [null, 'The story is not about a dog.', 'The story is not about the weather.', 'The story is not about shoes.'],
    explanation: 'A title should tell the reader what the writing is about.'
  },
  {
    id: 'ws-15',
    strand: 'writing-strategies',
    level: 2.1,
    type: 'choice',
    prompt: 'Which sentence does NOT belong in a paragraph about drying herbs?',
    choices: ['My bike is red.', 'Hang the herbs upside down.', 'Keep them out of the sun.', 'Wait until they feel crisp.'],
    answer: 0,
    choiceFeedback: [null, 'That is a step in drying herbs.', 'That is a step in drying herbs.', 'That tells you when the drying is done.'],
    explanation: 'Every sentence in a paragraph should be about the same topic. A bike is not.'
  },
  {
    id: 'ws-16',
    strand: 'writing-strategies',
    level: 2.6,
    type: 'choice',
    prompt: 'It rained ___ we stayed inside. Which joining word fits?',
    choices: ['so', 'but', 'or', 'if'],
    answer: 0,
    choiceFeedback: [null, '"But" shows a contrast, and these two facts do not clash.', '"Or" offers a choice between two things.', '"If" makes it a maybe, but the rain already happened.'],
    explanation: 'The rain is the reason they stayed in, and "so" shows a reason leading to a result.'
  },
  {
    id: 'ws-17',
    strand: 'writing-strategies',
    level: 2.8,
    type: 'choice',
    prompt: 'Which sentence gives the reader the MOST detail?',
    choices: ['The mint grew from a seed to my knee in six weeks.', 'The plant grew.', 'The plant grew fast.', 'It was a plant.'],
    answer: 0,
    choiceFeedback: [null, 'That tells the reader almost nothing.', 'Better, but it still does not say how fast or how big.', 'That gives no detail at all.'],
    explanation: 'Detail means specifics — what plant, how big, how long it took.'
  },
  {
    id: 'ws-18',
    strand: 'writing-strategies',
    level: 3.0,
    type: 'choice',
    prompt: 'Maya is writing instructions for planting seeds. Which sentence belongs at the START?',
    choices: ['Gather a pot, soil and seeds.', 'Water them every morning.', 'Wait for the first green shoot.', 'Move the pot to a sunny window.'],
    answer: 0,
    choiceFeedback: [null, 'Watering comes after the seeds are in.', 'Waiting is near the end.', 'That comes after the pot is filled and planted.'],
    explanation: 'Instructions start by telling the reader what to gather before anything else.'
  },
  {
    id: 'ws-19',
    strand: 'writing-strategies',
    level: 3.3,
    type: 'choice',
    prompt: 'Which sentence is an OPINION?',
    choices: ['Mint is the best herb to grow.', 'Mint has square stems.', 'Mint spreads underground.', 'Mint grows in many gardens.'],
    answer: 0,
    choiceFeedback: [null, 'You can check that by looking at a stem.', 'You can check that by digging.', 'You can check that by counting gardens.'],
    explanation: 'An opinion is what someone thinks. A fact can be checked.'
  },
  {
    id: 'ws-20',
    strand: 'writing-strategies',
    level: 3.7,
    type: 'choice',
    prompt: 'Which would make the BEST opening line for a report on nettles?',
    choices: ['A plant that stings you on purpose is worth a closer look.', 'Nettles are plants.', 'I like nettles.', 'This report is about nettles.'],
    answer: 0,
    choiceFeedback: [null, 'True, but it gives the reader no reason to keep reading.', 'That is how the writer feels, not a way in for the reader.', 'That announces the report instead of starting it.'],
    explanation: 'A strong opening gives the reader a reason to read on.'
  },
  {
    id: 'ws-21',
    strand: 'writing-strategies',
    level: 4.1,
    type: 'choice',
    passage: 'First she cut the stems. Next she tied them into bundles. ___ she hung them in the shed.',
    prompt: 'Which joining word fits the last step?',
    choices: ['Finally', 'Because', 'However', 'First'],
    answer: 0,
    choiceFeedback: [null, '"Because" gives a reason, and this sentence gives a step.', '"However" signals a contrast, and there is none here.', '"First" is already used, and this is the last step.'],
    explanation: 'The steps run first, next, finally. The last one needs a word that closes the order.'
  },
  {
    id: 'ws-22',
    strand: 'writing-strategies',
    level: 4.5,
    type: 'choice',
    prompt: 'Which sentence is too vague to follow?',
    choices: ['Do the drying part properly.', 'Cut the stems just above a pair of leaves.', 'Tie five stems into one bundle.', 'Hang the bundle in a dry shed.'],
    answer: 0,
    choiceFeedback: [null, 'That says exactly where to cut.', 'That gives a number, so the reader knows what to do.', 'That says where to put it.'],
    explanation: 'Instructions must say what to do. "Properly" leaves the reader guessing.'
  },
  {
    id: 'ws-23',
    strand: 'writing-strategies',
    level: 4.8,
    type: 'choice',
    prompt: 'Which sentence states a claim most clearly?',
    choices: ['Growing herbs at home saves money over a year.', 'Herbs and gardens and things like that.', 'I think maybe herbs might be cheaper, possibly.', 'Herbs are green.'],
    answer: 0,
    choiceFeedback: [null, 'That is a list of topics, not a claim about any of them.', 'So many hedges that the reader cannot tell what is being claimed.', 'That is a fact about colour, not a claim worth arguing.'],
    explanation: 'A claim says one clear thing that a reader could agree or disagree with.'
  },
  {
    id: 'ws-24',
    strand: 'writing-strategies',
    level: 5.2,
    type: 'choice',
    prompt: 'Maya claims mint spreads faster than sage. Which sentence SUPPORTS that best?',
    choices: ['In one season mint filled the whole bed while the sage stayed in one clump.', 'Mint smells stronger than sage.', 'My grandmother prefers mint.', 'Sage is harder to grow from seed.'],
    answer: 0,
    choiceFeedback: [null, 'Smell has nothing to do with how fast a plant spreads.', 'What one person prefers is not evidence about spreading.', 'That is about starting a plant, not about spreading.'],
    explanation: 'Support has to be evidence about the thing claimed — here, how far each plant spread.'
  },
  {
    id: 'ws-25',
    strand: 'writing-strategies',
    level: 5.6,
    type: 'choice',
    prompt: 'Which sentence answers someone who disagrees without giving up the claim?',
    choices: ['Sage does use less water — but mint still fills a bed faster.', 'Anyone who disagrees has never grown mint.', 'Maybe I am wrong about mint after all.', 'Sage is simply not worth growing.'],
    answer: 0,
    choiceFeedback: [null, 'That attacks the reader instead of answering the point.', 'That gives up the claim rather than defending it.', 'That dismisses the other side without dealing with the point.'],
    explanation: 'A good answer grants what is true on the other side and then holds its own claim.'
  },
  {
    id: 'ws-26',
    strand: 'writing-strategies',
    level: 5.9,
    type: 'choice',
    prompt: 'Which sentence uses a source honestly?',
    choices: ['One study of 200 growers found that herb growers ate more greens.', 'A study proved that herbs work better than anything else.', 'Everyone knows herbs are worth growing.', 'Studies say herbs are the answer.'],
    answer: 0,
    choiceFeedback: [null, '"Proved" claims far more than one study can show.', '"Everyone knows" is not a source at all.', 'Which studies? A source you cannot look up is not a source.'],
    explanation: 'An honest source says who was studied, how many, and what was actually found.'
  },
  {
    id: 'ws-27',
    strand: 'writing-strategies',
    level: 6.3,
    type: 'choice',
    passage: 'Maya wrote: "The mint bed grew twice as fast this year, so the new compost must be better."',
    prompt: 'Which revision removes the leap in her reasoning?',
    choices: ['The bed grew twice as fast. The compost changed, but so did the rainfall.', 'The mint bed grew twice as fast this year, so the compost is better.', 'The mint bed grew twice as fast, which proves the compost worked.', 'The new compost made the mint bed grow twice as fast.'],
    answer: 0,
    choiceFeedback: [null, 'That is the same leap with softer wording.', '"Proves" makes the leap larger, not smaller.', 'That states the leap as though it were a fact.'],
    explanation: 'More than one thing changed, so the compost cannot be named as the cause on this evidence.'
  },

];
