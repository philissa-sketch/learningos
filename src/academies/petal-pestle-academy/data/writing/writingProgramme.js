// ---------------------------------------------------------------------------
// THE FIVE-MINUTE WRITING LESSON — rebuilt at v3.40.
//
// ---- WHY IT WAS REBUILT, IN GIGI'S WORDS ----
//
//   "the journal was teaching about verbs that doesn't end in ed and asked her
//    about a verb run with[out] telling her what the past tense is. That isn't
//    a lesson that makes sense... All lessons needs to be at the learning level."
//
// She was right on both counts, and the disk proved it.
//
// ---- FAULT 1: THE LESSON ASKED FOR WHAT IT NEVER GAVE ----
//
// The old lesson 9 read: "Some verbs do not add ed. You have to know them."
// It showed go, see and bring — then asked for the past of RUN, WRITE and GROW.
// Three words she had never been given, after a lesson whose whole teaching was
// "you have to know them". That is a quiz wearing a lesson's clothes.
//
// So every lesson now carries an ANSWER, and every lesson declares whether its
// task is CLOSED (one right answer) or OPEN (she makes her own). For a closed
// task, check-writing takes every content word of the answer and requires it to
// appear in the lesson itself. Lesson 9 cannot come back: "ran, wrote, grew"
// fails unless the lesson shows ran, wrote and grew.
//
// And the programme cannot dodge the rule by going all-open — the check fails
// if fewer than forty of the seventy-two are closed.
//
// ---- FAULT 2: IT WAS PITCHED YEARS ABOVE HER ----
//
// FORTY OF THE SEVENTY-TWO old lessons read above a 3.0 grade level. One hit
// 8.0. Her Check-In put GRAMMAR & USAGE AT 2.15 — her weakest strand bar the
// two that hit the floor — and Khan has her on "Parts of speech: the noun".
// Her own results doc had already said it: every lesson gets written at her
// reading level, not her age.
//
// Nothing had ever measured these. check-readability guards Check-In items and
// check-assessment guards bank questions; the mini-lesson prose fell in the gap
// between them, exactly as sixty Science Lab questions did at v3.25.
//
// Every lesson is measured now, against a cap that climbs by stage.
//
// ---- FAULT 3: THERE WAS NO ORDER, SO SENTENCES NEVER GOT BUILT ----
//
// The old delivery picked by a hash of the day key. Possessive-plural
// apostrophes could land in week one and "a noun names something" in week
// thirty. A programme with no sequence is not a programme.
//
// Gigi asked for sentence structure "so she can properly write sentences and
// paragraphs", and chose to have it built FIRST and uninterrupted. So the first
// twenty-four lessons are nothing but building a sentence and then a paragraph,
// in order, and the grammar comes after — once she has a sentence to put it in.
//
// ---- HOW THE ORDER IS KEPT WITHOUT A CALENDAR ----
//
// The app has no date-to-quarter function anywhere in src/, on purpose (see
// catchUp.js). So position is HER OWN PROGRESS: the number of earlier days she
// has written in the journal. Write three days a week and she moves three
// lessons. Miss a fortnight and she carries on where she stopped.
//
// Counted from days STRICTLY BEFORE today, so today's lesson does not change
// underneath her the moment she saves an entry.
//
// After all seventy-two she starts again at the top. Second time through is
// review, and the app says so.
// ---------------------------------------------------------------------------

/** Five minutes. It teaches, then it gets out of the way. */
export const MINI_LESSON = {
  minutes: 5,
  graded: false,
  corrected: false,
  note:
    'Read it, say the answer out loud, then write. Nothing here is collected, ' +
    'nothing is marked, and no answer she gives is recorded anywhere.'
};

/**
 * Four stages, in teaching order, each with the reading cap it must stay under.
 *
 * The caps climb because she does — this is the same ramp shape the courses
 * use, starting where her Grammar & Usage actually measured rather than where
 * her age says it should be.
 */
export const STAGES = [
  { n: 1, id: 'sentence', title: 'Building a sentence', from: 1, to: 24, wordsPerSentence: 9, fkCap: 2.6 },
  { n: 2, id: 'words', title: 'Naming words and doing words', from: 25, to: 42, wordsPerSentence: 10, fkCap: 3.1 },
  { n: 3, id: 'describing', title: 'Describing, and standing in', from: 43, to: 58, wordsPerSentence: 11, fkCap: 3.6 },
  { n: 4, id: 'craft', title: 'Making the writing good', from: 59, to: 72, wordsPerSentence: 12, fkCap: 4.1 }
];

export function stageOf(n) {
  return STAGES.find((s) => n >= s.from && n <= s.to) || null;
}

/**
 * The seventy-two, in the order she meets them.
 *
 *   kind      'sentence' · 'grammar' · 'writing'
 *   khanUnit  the Khan Grammar unit this sits under, 1-7
 *   task      'closed' — one right answer, and it must come from this lesson
 *             'open'   — she makes her own, and the answer is a model
 */
export const MINI_LESSONS = [
  // ---- STAGE 1 · BUILDING A SENTENCE (1-24) ----
  { n: 1, kind: 'sentence', khanUnit: 7, task: 'closed', title: 'A sentence tells one whole thing', plain: 'A sentence tells one whole thing. It can stand on its own.', example: 'The seed grew. That is a whole thing.', tryIt: 'Is “under the leaf” a whole thing?', answer: 'No. It is not a whole thing.' },
  { n: 2, kind: 'sentence', khanUnit: 7, task: 'closed', title: 'The naming part', plain: 'Every sentence has a naming part. It says who or what.', example: 'The bee landed. The bee is the naming part.', tryIt: 'Say the naming part: The rain stopped.', answer: 'The rain is the naming part.' },
  { n: 3, kind: 'sentence', khanUnit: 7, task: 'closed', title: 'The doing part', plain: 'Every sentence has a doing part. It says what happens.', example: 'The bee landed. Landed is the doing part.', tryIt: 'Say the doing part: The rain stopped.', answer: 'Stopped is the doing part.' },
  { n: 4, kind: 'sentence', khanUnit: 7, task: 'closed', title: 'Both parts, together', plain: 'A sentence needs both parts. A naming part and a doing part.', example: 'The cat slept. Cat names. Slept does.', tryIt: 'Which part is missing? “The tall bird.”', answer: 'The doing part is missing. The bird does nothing.' },
  { n: 5, kind: 'sentence', khanUnit: 6, task: 'closed', title: 'A sentence starts with a capital', plain: 'The first letter of a sentence is a capital.', example: 'the sky is grey. → The sky is grey.', tryIt: 'Fix it: the pot fell.', answer: 'The pot fell.' },
  { n: 6, kind: 'sentence', khanUnit: 6, task: 'closed', title: 'The full stop at the end', plain: 'A telling sentence ends with a full stop.', example: 'The pot fell.', tryIt: 'Fix it: The sky is grey', answer: 'The sky is grey.' },
  { n: 7, kind: 'sentence', khanUnit: 6, task: 'closed', title: 'The question mark', plain: 'A sentence that asks ends with a question mark.', example: 'Did the pot fall?', tryIt: 'Turn it into an asking sentence: The sky is grey.', answer: 'Is the sky grey?' },
  { n: 8, kind: 'sentence', khanUnit: 7, task: 'closed', title: 'Not a sentence yet: no naming part', plain: 'With no naming part, nobody knows who did it.', example: 'ran down the path → The dog ran down the path.', tryIt: 'Add a naming part: fell off the shelf.', answer: 'The dog fell off the shelf.' },
  { n: 9, kind: 'sentence', khanUnit: 7, task: 'closed', title: 'Not a sentence yet: no doing part', plain: 'With no doing part, nothing happens.', example: 'the small green frog → The small green frog jumped.', tryIt: 'Add a doing part: the wet dog.', answer: 'The wet dog jumped.' },
  { n: 10, kind: 'sentence', khanUnit: 7, task: 'closed', title: 'Make it longer: where', plain: 'You can add where it happened. In the pond, on the shelf.', example: 'The frog jumped. → The frog jumped into the pond.', tryIt: 'Add where: The cat slept.', answer: 'The cat slept on the shelf.' },
  { n: 11, kind: 'sentence', khanUnit: 7, task: 'closed', title: 'Make it longer: when', plain: 'You can add when it happened.', example: 'The frog jumped. → The frog jumped at night.', tryIt: 'Add when: The cat slept.', answer: 'The cat slept at night.' },
  { n: 12, kind: 'sentence', khanUnit: 7, task: 'open', title: 'Make it longer: how', plain: 'You can add how it happened.', example: 'The frog jumped. → The frog jumped fast.', tryIt: 'Add how: The cat slept.', answer: 'Something like: The cat slept quietly.' },
  { n: 13, kind: 'sentence', khanUnit: 7, task: 'open', title: 'Make it longer: a describing word', plain: 'A describing word tells you more about the thing.', example: 'The frog jumped. → The green frog jumped.', tryIt: 'Add one describing word: The cat slept.', answer: 'Something like: The old cat slept. Any true describing word works.' },
  { n: 14, kind: 'sentence', khanUnit: 5, task: 'closed', title: 'Join two with and', plain: 'And joins two things that go together.', example: 'It rained. The pot filled. → It rained and the pot filled.', tryIt: 'Join with and: The sun came out. The path dried.', answer: 'The sun came out and the path dried.' },
  { n: 15, kind: 'sentence', khanUnit: 5, task: 'closed', title: 'Join two with but', plain: 'But joins two things that do not match.', example: 'It rained. The soil stayed dry. → It rained but the soil stayed dry.', tryIt: 'Join with but: The sun came out. The path stayed wet.', answer: 'The sun came out but the path stayed wet.' },
  { n: 16, kind: 'sentence', khanUnit: 5, task: 'closed', title: 'Give a reason with because', plain: 'Because tells you why it happened.', example: 'The seed died because the soil was cold.', tryIt: 'Finish it: The path stayed wet because…', answer: 'The path stayed wet because the soil was cold.' },
  { n: 17, kind: 'sentence', khanUnit: 5, task: 'closed', title: 'Give a result with so', plain: 'So tells you what happened next.', example: 'The soil was cold so the seed died.', tryIt: 'Which one is the result: “the soil was cold” or “the seed died”?', answer: 'The seed died.' },
  { n: 18, kind: 'sentence', khanUnit: 6, task: 'closed', title: 'A comma before the join', plain: 'Put a comma before and or but. Do this when they join two whole sentences.', example: 'I planted it, and it grew.', tryIt: 'Add the comma: The sun came out and the path dried.', answer: 'The sun came out, and the path dried.' },
  { n: 19, kind: 'sentence', khanUnit: 7, task: 'closed', title: 'A comma is not enough', plain: 'A comma cannot hold two sentences together.', example: 'Wrong: it rained, the soil stayed dry.', tryIt: 'Fix it with a full stop: it rained, the soil stayed dry.', answer: 'It rained. The soil stayed dry.' },
  { n: 20, kind: 'sentence', khanUnit: 7, task: 'open', title: 'Mix long and short', plain: 'All the same length is dull to read.', example: 'The green frog jumped into the cold pond. It sank.', tryIt: 'Write two sentences about rain. One long, one short.', answer: 'Something like: The rain fell all afternoon on the beds. Then it stopped.' },
  { n: 21, kind: 'sentence', khanUnit: 7, task: 'closed', title: 'A paragraph is about one thing', plain: 'A paragraph is some sentences about one thing.', example: 'Three sentences about the frog. That is one paragraph.', tryIt: 'Does a paragraph hold one thing or many things?', answer: 'One thing.' },
  { n: 22, kind: 'sentence', khanUnit: 7, task: 'closed', title: 'The first sentence', plain: 'Start a paragraph by saying what it is about.', example: 'The frog was hard to see.', tryIt: 'Which first sentence is about a frog? “The frog was green.” or “I like soup.”', answer: 'The frog was green.' },
  { n: 23, kind: 'sentence', khanUnit: 7, task: 'open', title: 'The middle sentences tell more', plain: 'The next sentences tell more about that thing.', example: 'The frog was green. It sat on a wet leaf. It did not move.', tryIt: 'Add one more sentence about that frog.', answer: 'Something like: Then it jumped into the pond.' },
  { n: 24, kind: 'sentence', khanUnit: 7, task: 'closed', title: 'New thing, new paragraph', plain: 'New thing, new paragraph. Start it on a new line.', example: 'One paragraph on the frog. A new one on the pond.', tryIt: 'You wrote about the frog. Now you write about the pond. Same paragraph or new one?', answer: 'A new one.' },

  // ---- STAGE 2 · NAMING WORDS AND DOING WORDS (25-42) ----
  { n: 25, kind: 'grammar', khanUnit: 1, task: 'closed', title: 'A naming word is a noun', plain: 'A noun is a naming word. It names a person, a place or a thing.', example: 'girl, Georgia, trowel', tryIt: 'Which one is a noun: trowel or dug?', answer: 'Trowel.' },
  { n: 26, kind: 'grammar', khanUnit: 1, task: 'closed', title: 'A special name takes a capital', plain: 'A special name takes a capital letter.', example: 'a state → Georgia · a girl → Azianna', tryIt: 'Which needs a capital: state or Georgia?', answer: 'Georgia.' },
  { n: 27, kind: 'grammar', khanUnit: 1, task: 'closed', title: 'More than one: add s', plain: 'Most nouns add s to mean more than one.', example: 'seed → seeds · pot → pots · root → roots', tryIt: 'Say more than one: pot, seed, root.', answer: 'Pots, seeds, roots.' },
  { n: 28, kind: 'grammar', khanUnit: 1, task: 'closed', title: 'More than one: add es', plain: 'Nouns ending in s, x, ch or sh add es.', example: 'bush → bushes · box → boxes · glass → glasses', tryIt: 'Say more than one: bush, box, glass.', answer: 'Bushes, boxes, glasses.' },
  { n: 29, kind: 'grammar', khanUnit: 1, task: 'closed', title: 'More than one: y turns into ies', plain: 'A word ending in y takes ies.', example: 'berry → berries · fly → flies', tryIt: 'Say more than one: berry, fly.', answer: 'Berries, flies.' },
  { n: 30, kind: 'grammar', khanUnit: 1, task: 'closed', title: 'A few change all the way', plain: 'A few nouns change shape instead of adding s. Here they are.', example: 'child → children · foot → feet · tooth → teeth · mouse → mice · person → people', tryIt: 'Say more than one: foot, tooth, mouse.', answer: 'Feet, teeth, mice.' },
  { n: 31, kind: 'grammar', khanUnit: 2, task: 'closed', title: 'A doing word is a verb', plain: 'A verb is a doing word. Every sentence needs one.', example: 'She plants. It grows. They wait.', tryIt: 'Which one is a verb: plants or trowel?', answer: 'Plants.' },
  { n: 32, kind: 'grammar', khanUnit: 2, task: 'closed', title: 'Happening now', plain: 'A verb can say a thing is happening now.', example: 'I plant. She waits.', tryIt: 'Say it as happening now: I planted.', answer: 'I plant.' },
  { n: 33, kind: 'grammar', khanUnit: 2, task: 'closed', title: 'Already happened: add ed', plain: 'Most verbs add ed to say it already happened.', example: 'plant → planted · wait → waited · pull → pulled', tryIt: 'Say it as already happened: I plant, I wait, I pull.', answer: 'I planted, I waited, I pulled.' },
  { n: 34, kind: 'grammar', khanUnit: 2, task: 'closed', title: 'Verbs that do not add ed', plain: 'Some verbs change instead of adding ed. Here are three.', example: 'run → ran · write → wrote · grow → grew', tryIt: 'Say it as already happened: I run, I write, I grow.', answer: 'I ran, I wrote, I grew.' },
  { n: 35, kind: 'grammar', khanUnit: 2, task: 'closed', title: 'Three more that do not add ed', plain: 'Three more to know. They change too.', example: 'go → went · see → saw · eat → ate', tryIt: 'Say it as already happened: I go, I see, I eat.', answer: 'I went, I saw, I ate.' },
  { n: 36, kind: 'grammar', khanUnit: 2, task: 'closed', title: 'Not yet: will', plain: 'Will says it has not happened yet.', example: 'I will plant. She will wait.', tryIt: 'Say it as not yet: I planted.', answer: 'I will plant.' },
  { n: 37, kind: 'grammar', khanUnit: 2, task: 'closed', title: 'One grows, more than one grow', plain: 'One thing takes a verb with s. More than one takes no s.', example: 'The seed grows. The seeds grow.', tryIt: 'Fix it: The seeds grows.', answer: 'The seeds grow.' },
  { n: 38, kind: 'grammar', khanUnit: 2, task: 'closed', title: 'Is and are', plain: 'Is goes with one. Are goes with more than one.', example: 'The pot is full. The pots are full.', tryIt: 'Fix it: The pots is full.', answer: 'The pots are full.' },
  { n: 39, kind: 'grammar', khanUnit: 2, task: 'closed', title: 'Was and were', plain: 'Was and were say it already happened. Was for one, were for more.', example: 'The pot was full. The pots were full.', tryIt: 'Fix it: The pots was full.', answer: 'The pots were full.' },
  { n: 40, kind: 'grammar', khanUnit: 2, task: 'closed', title: 'Has and have', plain: 'Has goes with one. Have goes with more than one.', example: 'The plant has roots. The plants have roots.', tryIt: 'Fix it: The plants has roots.', answer: 'The plants have roots.' },
  { n: 41, kind: 'grammar', khanUnit: 2, task: 'closed', title: 'Some verbs do nothing at all', plain: 'Is and are do not show an action. They just say a thing is so.', example: 'The soil is dry. The leaves are green.', tryIt: 'Which verb is in it: The soil is dry.', answer: 'Is.' },
  { n: 42, kind: 'grammar', khanUnit: 2, task: 'closed', title: 'Helping words', plain: 'A helping word goes in front of the verb.', example: 'She is planting. She has planted.', tryIt: 'Add a helping word: She planting.', answer: 'She is planting.' },

  // ---- STAGE 3 · DESCRIBING, AND STANDING IN (43-58) ----
  { n: 43, kind: 'grammar', khanUnit: 4, task: 'closed', title: 'A describing word is an adjective', plain: 'An adjective tells you more about a noun.', example: 'dry soil · three pots · a green leaf', tryIt: 'Which word describes: green or leaf?', answer: 'Green.' },
  { n: 44, kind: 'grammar', khanUnit: 4, task: 'open', title: 'Pick a describing word that is true', plain: 'A describing word has to be true, not just nice.', example: 'Not a lovely leaf. A toothed leaf.', tryIt: 'Describe one leaf you can see, in one true word.', answer: 'Something like: a toothed leaf, or a torn leaf. True beats pretty.' },
  { n: 45, kind: 'grammar', khanUnit: 4, task: 'closed', title: 'Describing the doing', plain: 'Some words tell you more about the verb. Many end in ly.', example: 'She watered it slowly.', tryIt: 'Which word tells how: slowly or watered?', answer: 'Slowly.' },
  { n: 46, kind: 'grammar', khanUnit: 4, task: 'closed', title: 'Comparing two: add er', plain: 'Add er when you compare two things.', example: 'tall → taller · green → greener', tryIt: 'Compare two: this plant is tall, that one is more tall.', answer: 'That one is taller.' },
  { n: 47, kind: 'grammar', khanUnit: 4, task: 'closed', title: 'Comparing many: add est', plain: 'Add est when you compare more than two.', example: 'tall → tallest · green → greenest', tryIt: 'Say it for many: of all my plants, this one is the most tall.', answer: 'This one is the tallest.' },
  { n: 48, kind: 'grammar', khanUnit: 4, task: 'closed', title: 'Long words take more and most', plain: 'A long word takes more or most. Not er or est.', example: 'more careful · most careful', tryIt: 'Fix it: she was carefuller than me.', answer: 'She was more careful than me.' },
  { n: 49, kind: 'grammar', khanUnit: 3, task: 'closed', title: 'Words that stand in for a name', plain: 'He, she, it and they stand in for a name.', example: 'Gigi planted it. She planted it.', tryIt: 'Which word stands in for Gigi: she or planted?', answer: 'She.' },
  { n: 50, kind: 'grammar', khanUnit: 3, task: 'closed', title: 'Name first, stand-in after', plain: 'Say the name first. Then you can use the stand-in.', example: 'Gigi planted mint. She waters it every day.', tryIt: 'Fix the order: She waters it. Gigi planted mint.', answer: 'Gigi planted mint. She waters it.' },
  { n: 51, kind: 'grammar', khanUnit: 3, task: 'closed', title: 'Not clear? Use the name', plain: 'If nobody can tell who it means, put the name back.', example: 'Not clear: she told her she was late.', tryIt: 'Make it clear: she told her she was late. One of them is Mom.', answer: 'Mom told her she was late.' },
  { n: 52, kind: 'grammar', khanUnit: 3, task: 'closed', title: 'His, her, its, their', plain: 'These words show belonging. None of them takes an apostrophe.', example: 'her notebook · its roots · their pots', tryIt: 'Which is right: its roots or it’s roots?', answer: 'Its roots.' },
  { n: 53, kind: 'grammar', khanUnit: 3, task: 'closed', title: 'It’s means it is', plain: 'It’s is short for it is. Its means belonging to it.', example: 'It’s a rose. Its thorns are sharp.', tryIt: 'Which goes here: the plant lost ___ leaves.', answer: 'Its leaves.' },
  { n: 54, kind: 'grammar', khanUnit: 5, task: 'closed', title: 'Place words', plain: 'Some small words say where a thing is.', example: 'in, on, under, beside, behind', tryIt: 'Pick a place word: the beetle was ___ the leaf.', answer: 'Under the leaf. On, in or beside also work.' },
  { n: 55, kind: 'grammar', khanUnit: 5, task: 'closed', title: 'Time words', plain: 'Some small words say when a thing is.', example: 'before, after, during', tryIt: 'Pick a time word: ___ the rain, the path dried.', answer: 'After the rain, the path dried.' },
  { n: 56, kind: 'grammar', khanUnit: 6, task: 'closed', title: 'The apostrophe that shows owning', plain: 'Add an apostrophe and s to show it belongs to somebody.', example: 'Gigi’s notebook · the plant’s roots', tryIt: 'Show the roots belong to the plant.', answer: 'The plant’s roots.' },
  { n: 57, kind: 'grammar', khanUnit: 6, task: 'closed', title: 'Commas in a list', plain: 'Put a comma between things in a list.', example: 'I planted basil, mint, and thyme.', tryIt: 'Add the commas: I planted basil mint and thyme.', answer: 'I planted basil, mint, and thyme.' },
  { n: 58, kind: 'grammar', khanUnit: 6, task: 'closed', title: 'Quotation marks', plain: 'Quotation marks go around the words somebody said.', example: 'Gigi said, “Water it in the morning.”', tryIt: 'Add them: Gigi said, Water it in the morning.', answer: 'Gigi said, “Water it in the morning.”' },

  // ---- STAGE 4 · MAKING THE WRITING GOOD (59-72) ----
  { n: 59, kind: 'writing', task: 'closed', title: 'Use the exact word', plain: 'The exact word tells the reader more than a vague one.', example: 'Not a tool. A trowel.', tryIt: 'Make it exact: I picked up a tool.', answer: 'I picked up a trowel.' },
  { n: 60, kind: 'writing', task: 'closed', title: 'Say how many', plain: 'A number makes what you wrote easy to believe.', example: 'Not lots of ants. Eleven ants.', tryIt: 'Add a number: I saw lots of ants.', answer: 'I saw eleven ants.' },
  { n: 61, kind: 'writing', task: 'open', title: 'Compare it to something', plain: 'A comparison helps the reader see it.', example: 'The seed was the size of a full stop.', tryIt: 'Compare one thing you saw today to something in the house.', answer: 'Something like: the leaf was as wide as my hand.' },
  { n: 62, kind: 'writing', task: 'closed', title: 'Show it, do not name it', plain: 'Instead of naming a feeling, say what you saw.', example: 'Not it was sad. The leaves had gone grey and soft.', tryIt: 'Show it: the plant was sad.', answer: 'The leaves had gone grey and soft.' },
  { n: 63, kind: 'writing', task: 'closed', title: 'Start where something happens', plain: 'Begin at the moment, not at the introduction.', example: 'Not I am going to write about a beetle. The beetle was under the leaf.', tryIt: 'Cut the slow start: I am going to write about a beetle. The beetle was under the leaf.', answer: 'The beetle was under the leaf.' },
  { n: 64, kind: 'writing', task: 'open', title: 'Write what you saw', plain: 'Write what is there, not what you think should be there.', example: 'The bud did not open. That is worth writing down.', tryIt: 'Write one thing that did not go the way you expected.', answer: 'Something like: the bud did not open, even after a week.' },
  { n: 65, kind: 'writing', task: 'open', title: 'Read it out loud', plain: 'Read it out loud. Anywhere you stumble is a sentence to change.', example: 'If you run out of breath, the sentence is too long.', tryIt: 'Read what you wrote out loud and find one bumpy sentence.', answer: 'Any sentence you stumbled on. Cut it in two and read it again.' },
  { n: 66, kind: 'writing', task: 'closed', title: 'Cut the words that do nothing', plain: 'Very, really and quite add nothing. Cut them.', example: 'the very really green leaf → the green leaf', tryIt: 'Cut it down: the quite very tall plant.', answer: 'The tall plant.' },
  { n: 67, kind: 'writing', task: 'closed', title: 'Do not repeat a word', plain: 'The same word twice in two sentences makes writing flat.', example: 'The leaf was green. The stem was green too. → The stem was green too.', tryIt: 'Fix it: I saw a bee. I saw a fly.', answer: 'I saw a bee, and then a fly.' },
  { n: 68, kind: 'writing', task: 'closed', title: 'One idea to a paragraph', plain: 'When you change idea, start a new paragraph.', example: 'What it looked like. Then, on its own, what it did.', tryIt: 'You wrote what the bee looked like. Now what it did. New paragraph?', answer: 'Yes. New idea, new paragraph.' },
  { n: 69, kind: 'writing', task: 'open', title: 'Answer what you were asked', plain: 'Before you finish, read the prompt again.', example: 'Half of writing well is answering the actual question.', tryIt: 'Read today’s prompt again. Did you answer it?', answer: 'If not, add one sentence that does. That is the whole fix.' },
  { n: 70, kind: 'writing', task: 'open', title: 'Check the capitals and the full stops', plain: 'Every sentence starts with a capital and ends with a full stop.', example: 'the pot fell → The pot fell.', tryIt: 'Check every sentence you wrote today for both.', answer: 'Fix any that are missing. That is the check.' },
  { n: 71, kind: 'writing', task: 'open', title: 'Check both parts are there', plain: 'Every sentence needs a naming part and a doing part.', example: 'Not a sentence: running through the garden.', tryIt: 'Find one sentence you wrote and name both parts.', answer: 'If one part is missing, add it. Then it is a sentence.' },
  { n: 72, kind: 'writing', task: 'closed', title: 'Stop when you are done', plain: 'When you have said it, stop. Do not add a big ending.', example: 'Not And that is what I learned about beetles.', tryIt: 'Which is the better last line: “It flew off.” or “And that is my beetle report.”', answer: 'It flew off.' }
];

export const MINI_LESSON_COUNT = MINI_LESSONS.length;

/**
 * Which lesson today is, and which time through.
 *
 * Position is HER OWN PROGRESS — the number of earlier days she has written in
 * the journal. Not a date, not a hash. See the header for why the app refuses
 * to grow a calendar.
 *
 * Days are counted STRICTLY BEFORE today, so saving an entry does not move
 * today's lesson out from under her.
 */
export function miniLessonFor(dayKey, journalDayKeys = []) {
  const before = new Set(
    (journalDayKeys || []).map((d) => String(d).slice(0, 10)).filter((d) => d < String(dayKey).slice(0, 10))
  ).size;
  const index = before % MINI_LESSON_COUNT;
  const lesson = MINI_LESSONS[index];
  return {
    ...lesson,
    stage: stageOf(lesson.n),
    position: index + 1,
    of: MINI_LESSON_COUNT,
    pass: Math.floor(before / MINI_LESSON_COUNT) + 1
  };
}

/** Kept so older callers and checks can still name the two halves. */
export const GRAMMAR_POINTS = MINI_LESSONS.filter((l) => l.kind === 'grammar');
export const WRITING_MOVES = MINI_LESSONS.filter((l) => l.kind === 'writing');
export const SENTENCE_LESSONS = MINI_LESSONS.filter((l) => l.kind === 'sentence');

export default MINI_LESSONS;
