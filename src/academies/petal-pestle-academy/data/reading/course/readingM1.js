// ---------------------------------------------------------------------------
// READING & LITERATURE — MODULE 1 · FAIRY TALES RETOLD · Quarter 1, weeks 1–2
//
// Gigi, Sept 23 2026: Reading becomes her own course, laid out like Lamar's —
// original passages, four questions each, a real book per module. The app
// teaches it; Khan's unit on the same theme is an optional watch.
// Blueprint: claude/reading-course-blueprint.md (approved Sept 23 2026).
//
// ---- WHAT THIS MODULE TEACHES ----
// The same events, told by a different teller. Every passage is a story she
// may know, told by somebody who never gets to tell it. No question needs the
// original tale: a lesson may only ask for what it gave her.
//
// ---- TWO LESSONS ARE REUSED, NOT REWRITTEN ----
// Lessons 1 and 2 are the two passages she has already sat
// (read-ela2-u1-p1 and -p2, in data/reading/ela2Unit1.js). Her attempts on
// them — 25% and 75% — carry into this module. Both were sat with read-aloud
// offered, so they count as LESSONS, never as ON HER OWN.
//
// ---- THE THURSDAY TESTS HAVE NO READ-ALOUD ----
// Gigi's decision, Sept 23 2026. The Thursday cold read is a passage she has
// never seen, and it is her ON HER OWN score — the first measurement of her
// independent reading this app has ever taken. Her first ones may be low.
// That is a starting line, not a verdict, so both are written at the easy end
// of the Quarter 1 cap.
//
// ---- MEASURED, NOT CLAIMED ----
// Every passage is run through analyse() in lib/readingLoad.js, the same
// function every course in this app is checked with. Quarter 1 cap: 11 words
// a sentence, 6% long words. Every lesson carries all four question kinds:
// main idea · word in context · detail · inference.
//
// Safety: nothing in any story is tasted. The herbs in lesson 5 are for
// planting.
// ---------------------------------------------------------------------------

export const READING_M1 = {
  id: 'rd-m1',
  module: 1,
  quarter: 1,
  title: 'Fairy Tales Retold',
  genre: 'stories',
  skill: 'point of view — who is telling the story',
  khanWatch: {
    course: 'ela2',
    unit: 1,
    note: 'Optional. Khan’s own unit on the same theme.'
  },
  book: {
    title: 'The True Story of the Three Little Pigs',
    author: 'Jon Scieszka',
    illustrator: 'Lane Smith',
    publisher: 'Viking Books for Young Readers (Penguin Random House)',
    ages: 'Ages 5–8, grades K–3 (publisher)',
    note: 'The wolf tells his side. The same skill as this whole module.',
    verifiedOn: '2026-09-23',
    source: 'https://www.penguinrandomhouse.com/books/316998/'
  },
  lessons: [
    {
      id: 'rd-m1-01',
      module: 1,
      week: 1,
      day: 1,
      reuses: 'read-ela2-u1-p1',
      title: 'The Bears Tell It'
    },
    {
      id: 'rd-m1-02',
      module: 1,
      week: 1,
      day: 2,
      reuses: 'read-ela2-u1-p2',
      title: 'Jack and the Bean'
    },
    {
      id: 'rd-m1-03',
      module: 1,
      week: 1,
      day: 3,
      title: 'Slow and Steady',
      skill: 'point of view',
      text: `I am the tortoise. You may know this race. I want to tell it my way.

The hare liked to boast. He told everyone he was the fastest in the wood. He laughed at my short legs. So we set a race to the old oak tree.

He shot off like the wind. Soon I could not see him at all. I did not stop. I did not rush. I just kept on, one foot and then the next.

Halfway there, I passed the hare. He was fast asleep under a bush. He was so sure he would win that he took a nap.

I got to the oak tree first. The hare woke up and ran, but it was too late.

He is faster than me. That is true. But I am the one who kept going.`,
      questions: [
        {
          id: 'rd-m1-03-q1',
          kind: 'main',
          prompt: 'What is this story mostly about?',
          choices: [
            'How to find the old oak tree',
            'Why hares like to sleep',
            'A race the tortoise won by not stopping',
            'A tortoise who learns to run fast'
          ],
          answer: 2,
          feedback: [
            'The oak tree is only where the race ends.',
            'The hare naps once, but the story is about the whole race.',
            null,
            'The tortoise never gets fast. Read the last line again.'
          ],
          why: 'The whole story is the race, and the tortoise wins because he keeps going.'
        },
        {
          id: 'rd-m1-03-q2',
          kind: 'word',
          prompt: '"The hare liked to boast." What does boast mean?',
          choices: [
            'To talk about how good you are',
            'To sleep a lot',
            'To run in a race',
            'To be kind to others'
          ],
          answer: 0,
          feedback: [
            null,
            'He does nap later, but look at the next sentence after boast.',
            'The race comes later in the story.',
            'He laughed at the tortoise. That is not kind.'
          ],
          why: 'The next sentence tells you: he told everyone he was the fastest in the wood.'
        },
        {
          id: 'rd-m1-03-q3',
          kind: 'detail',
          prompt: 'Where was the hare when the tortoise passed him?',
          choices: [
            'At the oak tree',
            'In the river',
            'Behind the tortoise',
            'Asleep under a bush'
          ],
          answer: 3,
          feedback: [
            'The tortoise got to the oak tree first.',
            'There is no river in this story.',
            'He was ahead, until he stopped.',
            null
          ],
          why: 'It says: "He was fast asleep under a bush."'
        },
        {
          id: 'rd-m1-03-q4',
          kind: 'inference',
          prompt: 'Who is telling this story?',
          choices: ['The hare', 'The tortoise', 'The oak tree', 'A bird watching'],
          answer: 1,
          feedback: [
            'The teller talks about the hare as "he".',
            null,
            'The oak tree is only where the race ends.',
            'No bird is in this story.'
          ],
          why: 'The first line is "I am the tortoise."'
        }
      ]
    },
    {
      id: 'rd-m1-04',
      module: 1,
      week: 2,
      day: 1,
      title: 'The Night Helpers',
      skill: 'point of view',
      text: `The shoemaker was poor. He had leather for one pair of shoes, and no more. He cut it out and went to bed.

We came in when the house was dark. There were two of us, and we were very small. We sewed all night. By morning the shoes were done.

The shoemaker could not believe it. He sold the shoes for a good price. Then he bought leather for two pairs. We made those too.

This went on for many nights. Soon his shop was full of people.

One night he and his wife hid and watched us. They saw that our clothes were old and thin. They were grateful. They wanted to say thank you for all our help. So they made us tiny coats and hats.

We put them on and danced out of the door. We had been thanked.`,
      questions: [
        {
          id: 'rd-m1-04-q1',
          kind: 'main',
          prompt: 'What is this story mostly about?',
          choices: [
            'A shoemaker who learns to dance',
            'Two small helpers who make shoes at night and get thanked',
            'How to cut leather',
            'A wife who sells hats'
          ],
          answer: 1,
          feedback: [
            'The helpers dance, not the shoemaker.',
            null,
            'Leather is cut once, at the start. The story is about much more.',
            'She makes two tiny hats. She does not sell them.'
          ],
          why: 'The helpers make the shoes night after night, and at the end they are thanked.'
        },
        {
          id: 'rd-m1-04-q2',
          kind: 'word',
          prompt: '"They were grateful." What does grateful mean?',
          choices: ['Sleepy', 'Angry', 'Very rich', 'Thankful'],
          answer: 3,
          feedback: [
            'Look at the sentence right after it.',
            'Angry people do not make you a coat.',
            'They did have more money, but that is not what this word means.',
            null
          ],
          why: 'The next sentence says they wanted to say thank you.'
        },
        {
          id: 'rd-m1-04-q3',
          kind: 'detail',
          prompt: 'What did the shoemaker buy after he sold the first shoes?',
          choices: ['Leather for two pairs', 'A new shop', 'Coats and hats', 'A new door'],
          answer: 0,
          feedback: [
            null,
            'He kept the same shop. It just got busy.',
            'The coats and hats were made, not bought, and they came later.',
            'The door is only where the helpers dance out.'
          ],
          why: 'He sold the shoes for a good price, then bought leather for two pairs.'
        },
        {
          id: 'rd-m1-04-q4',
          kind: 'inference',
          prompt: 'Who is telling this story?',
          choices: [
            'The shoemaker',
            'The shoemaker’s wife',
            'One of the small helpers',
            'A person in the shop'
          ],
          answer: 2,
          feedback: [
            'The teller talks about the shoemaker as "he".',
            'The teller talks about her as "his wife".',
            null,
            'The teller was there at night, when the shop was shut.'
          ],
          why: 'The teller says "We came in... there were two of us, and we were very small."'
        }
      ]
    },
    {
      id: 'rd-m1-05',
      module: 1,
      week: 2,
      day: 2,
      title: 'Grandma Tells It',
      skill: 'point of view',
      text: `I heard a knock. I opened the door, and there she was, with her red hood up.

My granddaughter had a basket. Mint, sage and lavender were inside. She had picked them for me to plant in my window box.

Behind her, at the edge of the trees, sat a wolf.

I did not scream. I picked up my biggest pot and my biggest spoon. I banged them together as hard as I could. BANG! BANG! BANG!

The noise startled the wolf. He jumped, and his ears went flat. Then he ran back into the wood.

People say a woodcutter saved us. He did not. He was not even there. I did it with a pot.`,
      questions: [
        {
          id: 'rd-m1-05-q1',
          kind: 'main',
          prompt: 'What is this story mostly about?',
          choices: [
            'How Grandma chased a wolf away with a loud noise',
            'How to plant herbs',
            'A woodcutter who saves the day',
            'A wolf who wants a red hood'
          ],
          answer: 0,
          feedback: [
            null,
            'The herbs are in the basket, but nobody plants them in this story.',
            'Grandma says he was not even there.',
            'The story never says what the wolf wanted.'
          ],
          why: 'Grandma bangs a pot and a spoon, and the wolf runs away.'
        },
        {
          id: 'rd-m1-05-q2',
          kind: 'word',
          prompt: '"The noise startled the wolf." What does startled mean?',
          choices: [
            'Made him hungry',
            'Made him fall asleep',
            'Gave him a sudden fright',
            'Made him happy'
          ],
          answer: 2,
          feedback: [
            'Nothing about food is near this word.',
            'He jumped and ran. He did not sleep.',
            null,
            'His ears went flat and he ran away.'
          ],
          why: 'The next sentence says he jumped and his ears went flat. That is a fright.'
        },
        {
          id: 'rd-m1-05-q3',
          kind: 'detail',
          prompt: 'What was in the basket?',
          choices: [
            'Bread and cake',
            'Mint, sage and lavender',
            'A pot and a spoon',
            'Apples'
          ],
          answer: 1,
          feedback: [
            'Bread and cake are not in this story.',
            null,
            'Those were in Grandma’s house.',
            'No apples are in this story.'
          ],
          why: 'It says: "Mint, sage and lavender were inside."'
        },
        {
          id: 'rd-m1-05-q4',
          kind: 'inference',
          prompt: 'Why does Grandma say, "He did not. He was not even there"?',
          choices: [
            'She wants the woodcutter to come',
            'She forgot what happened',
            'She is scared of the woodcutter',
            'She wants people to know she saved them herself'
          ],
          answer: 3,
          feedback: [
            'She says he was not needed.',
            'She tells it very clearly.',
            'Nothing in the story says she is scared of him.',
            null
          ],
          why: 'The last line is "I did it with a pot." She wants the story told right.'
        }
      ]
    },
    {
      id: 'rd-m1-06',
      module: 1,
      week: 2,
      day: 3,
      title: 'The Pea Tells It',
      skill: 'point of view',
      text: `I am a pea. I am small, round and green. For one night I was the most important pea in the land.

A girl came to the castle in the rain. She said she was a princess. The queen wanted to know if that was true.

So the queen put me on a bed. Then she piled twenty mattresses on top of me. Then she piled twenty soft quilts on top of those.

The girl climbed all the way up and went to sleep. Or she tried to.

In the morning she said, "I hardly slept at all. Something hard was under me."

The queen clapped. Only a real princess could feel one pea under all of that. So the prince married her.

Nobody thanked me. They put me in a glass box. I am still there.`,
      questions: [
        {
          id: 'rd-m1-06-q1',
          kind: 'main',
          prompt: 'What is this story mostly about?',
          choices: [
            'How to make a bed',
            'A princess who likes to eat peas',
            'A prince who builds a castle',
            'How one pea helped a queen find out who was a princess'
          ],
          answer: 3,
          feedback: [
            'A bed is made, but that is not what the story is about.',
            'Nobody eats the pea.',
            'The castle is already there.',
            null
          ],
          why: 'The pea goes under the bed, the girl feels it, and the queen knows she is a princess.'
        },
        {
          id: 'rd-m1-06-q2',
          kind: 'word',
          prompt: '"She piled twenty mattresses on top of me." What does piled mean?',
          choices: [
            'Washed',
            'Put one on top of another',
            'Cut in half',
            'Carried outside'
          ],
          answer: 1,
          feedback: [
            'Nothing in the story is washed.',
            null,
            'Nothing is cut.',
            'Everything stays on the bed.'
          ],
          why: 'The words right after it say "on top of me", and then more "on top of those".'
        },
        {
          id: 'rd-m1-06-q3',
          kind: 'detail',
          prompt: 'Where is the pea now?',
          choices: [
            'Still under the bed',
            'In the garden',
            'In a glass box',
            'In the queen’s hand'
          ],
          answer: 2,
          feedback: [
            'It was moved. Read the last lines.',
            'The garden is not in this story.',
            null,
            'Read the last three sentences again.'
          ],
          why: 'It says: "They put me in a glass box. I am still there."'
        },
        {
          id: 'rd-m1-06-q4',
          kind: 'inference',
          prompt: 'How does the pea feel at the end?',
          choices: [
            'A little sad that nobody thanked it',
            'Angry at the princess',
            'Sleepy',
            'Scared of the queen'
          ],
          answer: 0,
          feedback: [
            null,
            'The pea never says anything bad about her.',
            'The girl was the sleepy one.',
            'Nothing says the pea is scared.'
          ],
          why: 'It says "Nobody thanked me." It wanted to be thanked.'
        }
      ]
    }
  ],
  tests: [
    {
      id: 'rd-m1-t1',
      module: 1,
      week: 1,
      kind: 'weekly',
      readAloud: false,
      title: 'The Giant’s Side',
      text: `I live in a castle above the clouds. It is quiet up here. I like it that way.

One day a boy climbed up a green stalk. He walked into my kitchen. I did not ask him in. He took my bag of gold and ran.

He came back the next day. This time he took my hen, the one that lays gold eggs.

He came back a third time. He took my harp that sings. I ran after him, but he got down first. Then he chopped the stalk, and it fell.

Down there, they call him a hero. Up here, we call him a thief. A thief takes things that are not his.

It depends on who tells the story.`,
      questions: [
        {
          id: 'rd-m1-t1-q1',
          kind: 'main',
          prompt: 'What is this story mostly about?',
          choices: [
            'How to grow a green stalk',
            'A hen that lays eggs',
            'A boy who takes things from a giant, told by the giant',
            'A harp that sings songs'
          ],
          answer: 2,
          feedback: [
            'The stalk is already there when the story starts.',
            'The hen is one thing the boy takes.',
            null,
            'The harp is one thing the boy takes.'
          ],
          why: 'The giant tells us about the three times the boy came and took something.'
        },
        {
          id: 'rd-m1-t1-q2',
          kind: 'word',
          prompt: '"Up here, we call him a thief." What is a thief?',
          choices: [
            'Someone who takes things that are not theirs',
            'Someone who helps',
            'Someone who climbs',
            'Someone who cooks'
          ],
          answer: 0,
          feedback: [
            null,
            'The next sentence says what a thief is.',
            'The boy climbs, but that is not what the word means.',
            'The kitchen is in the story, but no one cooks.'
          ],
          why: 'The story says: "A thief takes things that are not his."'
        },
        {
          id: 'rd-m1-t1-q3',
          kind: 'detail',
          prompt: 'What did the boy take the first time?',
          choices: ['The hen', 'The harp', 'The stalk', 'A bag of gold'],
          answer: 3,
          feedback: [
            'The hen was the second time.',
            'The harp was the third time.',
            'He chopped the stalk. He did not take it.',
            null
          ],
          why: 'The first time, "He took my bag of gold and ran."'
        },
        {
          id: 'rd-m1-t1-q4',
          kind: 'detail',
          prompt: 'How many times did the boy come up?',
          choices: ['One', 'Three', 'Two', 'Four'],
          answer: 1,
          feedback: [
            'He came back more than once.',
            null,
            'Count again: gold, hen, harp.',
            'Count again: gold, hen, harp.'
          ],
          why: 'Gold the first day, the hen the next day, the harp the third time.'
        },
        {
          id: 'rd-m1-t1-q5',
          kind: 'detail',
          prompt: 'What did the boy do to the stalk at the end?',
          choices: [
            'He climbed it again',
            'He planted it',
            'He chopped it',
            'He painted it'
          ],
          answer: 2,
          feedback: [
            'He was already down.',
            'It was already growing.',
            null,
            'Nothing is painted in this story.'
          ],
          why: 'It says: "Then he chopped the stalk, and it fell."'
        },
        {
          id: 'rd-m1-t1-q6',
          kind: 'inference',
          prompt: 'Why do the people down below call the boy a hero?',
          choices: [
            'They only hear the boy’s side of the story',
            'The giant told them to',
            'The boy gave them the harp',
            'The boy is very tall'
          ],
          answer: 0,
          feedback: [
            null,
            'The giant calls him a thief.',
            'The story does not say that.',
            'The giant is the tall one.'
          ],
          why: 'The last line says it depends on who tells the story. They heard the boy tell it.'
        }
      ]
    },
    {
      id: 'rd-m1-t2',
      module: 1,
      week: 2,
      kind: 'weekly',
      readAloud: false,
      title: 'The Hen’s Side',
      text: `I found some seeds of wheat in the yard. I asked the cat, the dog and the duck, "Who will help me plant them?"

"Not I," said the cat. "Not I," said the dog. "Not I," said the duck.

So I planted them myself.

The wheat grew tall and gold. By summer it was ripe. That means it was ready to cut. Nobody would help me cut it, so I cut it myself.

Then I took it to the mill to make flour. I baked the flour into bread. I did all of it alone.

The bread smelled warm and sweet. Now the cat, the dog and the duck all came running. "We will help you eat it!" they said.

I shook my head. The ones who help with the work share the bread. I ate it with my chicks.`,
      questions: [
        {
          id: 'rd-m1-t2-q1',
          kind: 'main',
          prompt: 'What is this story mostly about?',
          choices: [
            'A duck who bakes bread',
            'A hen who does all the work, so she keeps the bread',
            'How a cat plants wheat',
            'A dog who helps at the mill'
          ],
          answer: 1,
          feedback: [
            'The duck would not help at all.',
            null,
            'The cat said "Not I."',
            'The hen went to the mill alone.'
          ],
          why: 'She plants, cuts, and bakes alone, then eats the bread with her chicks.'
        },
        {
          id: 'rd-m1-t2-q2',
          kind: 'word',
          prompt: '"By summer it was ripe." What does ripe mean?',
          choices: [
            'Wet from the rain',
            'Too small to use',
            'Eaten by the duck',
            'Ready to cut or pick'
          ],
          answer: 3,
          feedback: [
            'Look at the sentence right after it.',
            'It grew tall.',
            'The duck did not eat the wheat.',
            null
          ],
          why: 'The next sentence says: "That means it was ready to cut."'
        },
        {
          id: 'rd-m1-t2-q3',
          kind: 'detail',
          prompt: 'Who would not help plant the seeds?',
          choices: [
            'The cat, the dog and the duck',
            'The chicks',
            'The miller',
            'Nobody was asked'
          ],
          answer: 0,
          feedback: [
            null,
            'The chicks are only at the end.',
            'Nobody at the mill is asked.',
            'She asked three animals.'
          ],
          why: 'All three said "Not I."'
        },
        {
          id: 'rd-m1-t2-q4',
          kind: 'detail',
          prompt: 'Where did the hen take the wheat to make flour?',
          choices: ['To the yard', 'To the dog’s house', 'To the market', 'To the mill'],
          answer: 3,
          feedback: [
            'The yard is where she found the seeds.',
            'The dog would not help.',
            'There is no market in this story.',
            null
          ],
          why: 'It says: "I took it to the mill to make flour."'
        },
        {
          id: 'rd-m1-t2-q5',
          kind: 'detail',
          prompt: 'Who ate the bread?',
          choices: ['The cat', 'The hen and her chicks', 'The dog', 'Everyone in the yard'],
          answer: 1,
          feedback: [
            'The cat asked, but she said no.',
            null,
            'The dog asked, but she said no.',
            'Only the ones who helped, and her chicks.'
          ],
          why: 'The last line: "I ate it with my chicks."'
        },
        {
          id: 'rd-m1-t2-q6',
          kind: 'inference',
          prompt: 'Why did the hen not share the bread with the cat, the dog and the duck?',
          choices: [
            'There was not enough bread',
            'She was too tired',
            'They did not help with any of the work',
            'The bread was burnt'
          ],
          answer: 2,
          feedback: [
            'The story does not say that.',
            'She never says she is tired.',
            null,
            'It smelled warm and sweet.'
          ],
          why: 'She says the ones who help with the work share the bread. They never helped.'
        }
      ]
    }
  ]
};

export default READING_M1;
