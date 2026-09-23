// ---------------------------------------------------------------------------
// READING & LITERATURE — MODULE 2 · THE MOON · Quarter 1, weeks 3–4
//
// Informational reading. The skill is holding a cause and its effect across
// two or three sentences: the moon pulls, so the sea moves; there is no air,
// so the sky is black. Blueprint: claude/reading-course-blueprint.md.
//
// Lessons 1 and 2 reuse the two passages she already has
// (read-ela2-u2-p1 and -p2, in data/reading/ela2Unit2.js).
//
// ---- FACTS, CHECKED ----
// Tides: the moon's pull is the main cause; most coasts get two high tides a
// day. Moon's day: about two weeks of sunlight, hotter than boiling water in
// the sun and colder than a freezer at night; no air, so a black sky and no
// sound. Same face: the moon spins once for each trip around Earth, about a
// month. Moonflower (Ipomoea alba) opens at dusk and is visited by night-flying
// moths. A lunar eclipse is Earth's shadow on a full moon, it can turn the
// moon red, and it is safe to look at. Apollo 11, July 1969: Neil Armstrong
// and Buzz Aldrin walked; Michael Collins stayed in orbit.
//
// Thursday tests have no read-aloud (Gigi, Sept 23 2026). Measured by
// analyse() against the Quarter 1 cap: 11 words a sentence, 6% long words.
// ---------------------------------------------------------------------------

export const READING_M2 = {
  id: 'rd-m2',
  module: 2,
  quarter: 1,
  title: 'The Moon',
  genre: 'informational',
  skill: 'cause and effect — what happens, and why',
  khanWatch: {
    course: 'ela2',
    unit: 2,
    note: 'Optional. Khan’s own unit on the same theme.'
  },
  book: {
    title: 'The Moon Seems to Change',
    author: 'Franklyn M. Branley',
    illustrator: 'Barbara and Ed Emberley',
    publisher: 'HarperCollins (Let’s-Read-and-Find-Out Science, Stage 2)',
    ages: 'Early elementary (publisher: Stage 2 of the series)',
    note: 'Why the moon looks different night to night. It picks up where Borrowed Light stops.',
    verifiedOn: '2026-09-23',
    source: 'https://www.harpercollins.com.au/9780062439031/the-moon-seems-to-change/'
  },
  lessons: [
    {
      id: 'rd-m2-01',
      module: 2,
      week: 3,
      day: 1,
      reuses: 'read-ela2-u2-p1',
      title: 'Borrowed Light'
    },
    {
      id: 'rd-m2-02',
      module: 2,
      week: 3,
      day: 2,
      reuses: 'read-ela2-u2-p2',
      title: 'Footprints That Stay'
    },
    {
      id: 'rd-m2-03',
      module: 2,
      week: 3,
      day: 3,
      title: 'The Moon and the Sea',
      skill: 'cause and effect',
      text: `Go to the beach in the morning. Then go back after lunch. The sea may not be in the same place.

At some times of day, the water comes far up the sand. This is high tide. At other times, it slides back and leaves wet sand behind. This is low tide.

What moves all that water? The moon does. The moon pulls on the sea, just a little. The pull makes the sea heap up in two big bumps. There is one on each side of Earth.

As Earth turns, each beach moves into a bump and then out of it. So the sea comes in, and then it goes out.

Earth passes through both bumps each day. So at most beaches, the sea comes in about two times each day. The moon is far away, but it still moves the sea.`,
      questions: [
        {
          id: 'rd-m2-03-q1',
          kind: 'main',
          prompt: 'What is this passage mostly about?',
          choices: [
            'What to do at the beach after lunch',
            'How the moon makes the sea come in and go out',
            'How far away the moon is',
            'Why sand gets wet'
          ],
          answer: 1,
          feedback: [
            'Lunch is only a way to tell the time.',
            null,
            'It says the moon is far, but not how far.',
            'Wet sand is one small detail.'
          ],
          why: 'The passage asks "What moves all that water?" and answers: the moon.'
        },
        {
          id: 'rd-m2-03-q2',
          kind: 'word',
          prompt: 'What is high tide?',
          choices: [
            'When the waves are very tall',
            'When the moon is high in the sky',
            'When the water slides back',
            'When the water comes far up the sand'
          ],
          answer: 3,
          feedback: [
            'The passage talks about how far the water comes, not how tall.',
            'The passage does not say that.',
            'That is low tide.',
            null
          ],
          why: 'It says: "the water comes far up the sand. This is high tide."'
        },
        {
          id: 'rd-m2-03-q3',
          kind: 'detail',
          prompt: 'About how many times a day does the sea come in at most beaches?',
          choices: ['About two times', 'Once a week', 'Only at night', 'Ten times'],
          answer: 0,
          feedback: [
            null,
            'It happens every day.',
            'It happens in the morning and after lunch too.',
            'Read the last paragraph again.'
          ],
          why: 'It says: "this happens about two times each day."'
        },
        {
          id: 'rd-m2-03-q4',
          kind: 'inference',
          prompt: 'If there were no moon, what would most likely happen to the tides?',
          choices: [
            'They would be much bigger',
            'The sea would turn to sand',
            'They would be much smaller',
            'The beach would move away'
          ],
          answer: 2,
          feedback: [
            'The moon is what heaps the water up.',
            'Nothing in the passage says that.',
            null,
            'The beach does not move by itself.'
          ],
          why: 'The moon is what pulls the water. Take the pull away and the water barely moves.'
        }
      ]
    },
    {
      id: 'rd-m2-04',
      module: 2,
      week: 4,
      day: 1,
      title: 'A Day on the Moon',
      skill: 'cause and effect',
      text: `On Earth, a day and a night last one day. On the moon, the sunny part lasts about two weeks. Then the dark part lasts about two weeks.

The moon has no air around it. That changes everything.

With no air, the sky is black, even when the sun is up. It looks like night, but it is day.

With no air, there is nothing to hold the heat. In the sun, the ground gets hotter than boiling water. In the dark, it gets colder than any freezer.

With no air, there is no sound. A rock could fall right next to you, and you would not hear it.

That is why people on the moon must wear space suits. The suit gives them air, and it keeps them safe from the heat and the cold.`,
      questions: [
        {
          id: 'rd-m2-04-q1',
          kind: 'main',
          prompt: 'What is this passage mostly about?',
          choices: [
            'How having no air makes the moon very different from Earth',
            'How to make a space suit',
            'Why rocks fall on the moon',
            'How to find stars at night'
          ],
          answer: 0,
          feedback: [
            null,
            'Space suits come at the end, but not how to make one.',
            'A falling rock is one example.',
            'The passage says you can see stars in the day.'
          ],
          why: 'Three paragraphs start "With no air..." — that is the big idea.'
        },
        {
          id: 'rd-m2-04-q2',
          kind: 'word',
          prompt: '"There is nothing to hold the heat." What does hold mean here?',
          choices: [
            'Pick up with your hands',
            'Wait for a while',
            'Keep in one place',
            'Make louder'
          ],
          answer: 2,
          feedback: [
            'Nobody is picking anything up.',
            'That is a different kind of hold.',
            null,
            'Sound comes in the next paragraph.'
          ],
          why: 'With nothing to keep the heat in, the ground gets very hot and then very cold.'
        },
        {
          id: 'rd-m2-04-q3',
          kind: 'detail',
          prompt: 'What color is the sky on the moon when the sun is up?',
          choices: ['Blue', 'Red', 'White', 'Black'],
          answer: 3,
          feedback: [
            'That is Earth’s sky.',
            'The passage does not say red.',
            'Read the third paragraph again.',
            null
          ],
          why: 'It says: "the sky is black, even when the sun is up."'
        },
        {
          id: 'rd-m2-04-q4',
          kind: 'inference',
          prompt: 'Why could two people on the moon not hear each other shout?',
          choices: [
            'It is too cold to shout',
            'There is no air to carry the sound',
            'Their suits are too big',
            'The sky is black'
          ],
          answer: 1,
          feedback: [
            'Cold is a different paragraph.',
            null,
            'The passage does not say that.',
            'A black sky does not stop sound.'
          ],
          why: 'It says with no air there is no sound. A shout is a sound.'
        }
      ]
    },
    {
      id: 'rd-m2-05',
      module: 2,
      week: 4,
      day: 2,
      title: 'Flowers That Wait for the Moon',
      skill: 'cause and effect',
      text: `Most flowers open in the morning. The moonflower does not. It waits.

In the day, the moonflower is closed tight, like a rolled-up paper. In the evening, as the sun goes down, it slowly opens. By the time the moon is up, it is a big white flower.

Why would a flower open at night? Because its helpers come out at night.

Big moths fly after dark. They sip from the flower. As they do, they carry dust from one flower to the next. That dust helps the plant make seeds.

The white petals are easy to see in the dark. The sweet smell helps the moths find the way.

In the morning, the flower closes again. Its work is done.`,
      questions: [
        {
          id: 'rd-m2-05-q1',
          kind: 'main',
          prompt: 'What is this passage mostly about?',
          choices: [
            'How moths find their homes',
            'Why most flowers open in the morning',
            'How to roll up paper',
            'Why the moonflower opens at night'
          ],
          answer: 3,
          feedback: [
            'Moths are in it, but the flower is the main thing.',
            'That is only the first sentence.',
            'Paper is only there to show what the closed flower looks like.',
            null
          ],
          why: 'The passage asks "Why would a flower open at night?" and answers it.'
        },
        {
          id: 'rd-m2-05-q2',
          kind: 'word',
          prompt: '"They sip from the flower." What does sip mean?',
          choices: [
            'Sleep inside',
            'Drink a little at a time',
            'Break off a petal',
            'Paint a color'
          ],
          answer: 1,
          feedback: [
            'The moths are busy, not asleep.',
            null,
            'Nothing is broken.',
            'The petals are already white.'
          ],
          why: 'Moths drink from flowers in small sips, then fly to the next one.'
        },
        {
          id: 'rd-m2-05-q3',
          kind: 'detail',
          prompt: 'What does the dust the moths carry help the plant do?',
          choices: ['Make seeds', 'Grow taller', 'Stay closed', 'Change color'],
          answer: 0,
          feedback: [
            null,
            'The passage does not say taller.',
            'The dust is carried when the flower is open.',
            'The flower stays white.'
          ],
          why: 'It says: "That dust helps the plant make seeds."'
        },
        {
          id: 'rd-m2-05-q4',
          kind: 'inference',
          prompt: 'Why is it helpful that the moonflower is white and smells sweet?',
          choices: [
            'So people can pick it',
            'So it can close in the day',
            'So the moths can find it in the dark',
            'So the sun can see it'
          ],
          answer: 2,
          feedback: [
            'People are not in this passage.',
            'Color and smell do not close a flower.',
            null,
            'It opens after the sun goes down.'
          ],
          why: 'White is easy to see at night, and the smell shows the way.'
        }
      ]
    },
    {
      id: 'rd-m2-06',
      module: 2,
      week: 4,
      day: 3,
      title: 'The Face We Always See',
      skill: 'cause and effect',
      text: `Look at the full moon. You may see dark shapes on it. Some people say they look like a face.

Here is a strange thing. We always see the same face. We never see the back of the moon from Earth.

Why? The moon goes all the way around Earth in about one month. It also spins, like a slow top. It spins one time in that same month.

So as the moon goes around us, it turns just enough to keep the same side facing us. Try it. Walk around a chair, and keep your face to the chair the whole time. You turn all the way around, but the chair only sees your face.

People did not see the back of the moon until a spacecraft flew behind it and took pictures.`,
      questions: [
        {
          id: 'rd-m2-06-q1',
          kind: 'main',
          prompt: 'What is this passage mostly about?',
          choices: [
            'How to spin a top',
            'What the dark shapes are made of',
            'Why we always see the same side of the moon',
            'How to walk around a chair'
          ],
          answer: 2,
          feedback: [
            'A top is only used to show how the moon spins.',
            'The passage does not say.',
            null,
            'The chair is a way to try the idea.'
          ],
          why: 'It says "We always see the same face" and then explains why.'
        },
        {
          id: 'rd-m2-06-q2',
          kind: 'word',
          prompt: '"The moon ... keeps the same side facing us." What does facing mean?',
          choices: ['Pointing toward', 'Hiding from', 'Painted on', 'Far behind'],
          answer: 0,
          feedback: [
            null,
            'We can see that side, so it is not hiding.',
            'Nothing is painted.',
            'The back of the moon is the side we do not see.'
          ],
          why: 'The chair game shows it: your face points toward the chair the whole time.'
        },
        {
          id: 'rd-m2-06-q3',
          kind: 'detail',
          prompt: 'How long does the moon take to go all the way around Earth?',
          choices: ['One day', 'About one month', 'One year', 'One hour'],
          answer: 1,
          feedback: [
            'Read the third paragraph again.',
            null,
            'That is too long.',
            'That is much too short.'
          ],
          why: 'It says: "The moon goes all the way around Earth in about one month."'
        },
        {
          id: 'rd-m2-06-q4',
          kind: 'inference',
          prompt: 'How did people finally see the back of the moon?',
          choices: [
            'They looked very hard from Earth',
            'The moon turned around one night',
            'They walked around a chair',
            'A spacecraft went behind it and took pictures'
          ],
          answer: 3,
          feedback: [
            'The passage says we never see it from Earth.',
            'It keeps the same side to us.',
            'The chair was only a game to show the idea.',
            null
          ],
          why: 'From Earth it is always hidden, so someone had to go behind it.'
        }
      ]
    }
  ],
  tests: [
    {
      id: 'rd-m2-t1',
      module: 2,
      week: 3,
      kind: 'weekly',
      readAloud: false,
      title: 'The Night the Moon Turned Red',
      text: `One night, Nia's mom woke her up. "Come and see the moon," she said.

They stood in the yard. The full moon was bright. Then a dark edge slid across it. Bit by bit, the moon went dim.

"What is happening?" Nia asked.

"Earth is right between the sun and the moon," said Mom. "So Earth's shadow falls on the moon. This is called an eclipse."

After a while, the moon did not go black. It turned a deep red, like a copper coin.

"Is it safe to look?" Nia asked.

"Yes," said Mom. "This kind is safe to watch."

Later that night, the shadow moved on. The moon was white again.`,
      questions: [
        {
          id: 'rd-m2-t1-q1',
          kind: 'main',
          prompt: 'What is this story mostly about?',
          choices: [
            'Nia finds a copper coin',
            'Nia cannot sleep',
            'The sun goes behind a cloud',
            'Nia and her mom watch Earth’s shadow cover the moon'
          ],
          answer: 3,
          feedback: [
            'The coin is only used to show the color.',
            'Her mom woke her up to see something.',
            'It is night, and there are no clouds in the story.',
            null
          ],
          why: 'The story is about the eclipse they watch together.'
        },
        {
          id: 'rd-m2-t1-q2',
          kind: 'word',
          prompt: '"Bit by bit, the moon went dim." What does dim mean?',
          choices: ['Very big', 'Very hot', 'Less bright', 'Full of holes'],
          answer: 2,
          feedback: [
            'Its size did not change.',
            'Nothing in the story is about heat.',
            null,
            'The shadow covered it. Nothing made holes.'
          ],
          why: 'The moon was bright, then a dark edge slid across it.'
        },
        {
          id: 'rd-m2-t1-q3',
          kind: 'detail',
          prompt: 'What color did the moon turn?',
          choices: ['Deep red', 'Black', 'Blue', 'Green'],
          answer: 0,
          feedback: [
            null,
            'The story says it did NOT go black.',
            'Blue is not in the story.',
            'Green is not in the story.'
          ],
          why: 'It says: "It turned a deep red, like a copper coin."'
        },
        {
          id: 'rd-m2-t1-q4',
          kind: 'detail',
          prompt: 'What is between the sun and the moon during an eclipse like this one?',
          choices: ['A cloud', 'Earth', 'Another moon', 'The stars'],
          answer: 1,
          feedback: [
            'Mom does not say a cloud.',
            null,
            'There is only one moon.',
            'The stars are not in the story.'
          ],
          why: 'Mom says: "Earth is right between the sun and the moon."'
        },
        {
          id: 'rd-m2-t1-q5',
          kind: 'detail',
          prompt: 'Where were Nia and her mom when they watched the moon?',
          choices: ['On the roof', 'At the beach', 'In the yard', 'In a car'],
          answer: 2,
          feedback: [
            'Read the second paragraph again.',
            'There is no beach in this story.',
            null,
            'There is no car in this story.'
          ],
          why: 'It says: "They stood in the yard."'
        },
        {
          id: 'rd-m2-t1-q6',
          kind: 'inference',
          prompt: 'Why did the moon go dim?',
          choices: [
            'Earth’s shadow fell on it',
            'The moon ran out of light',
            'Nia closed her eyes',
            'The moon moved behind the sun'
          ],
          answer: 0,
          feedback: [
            null,
            'The moon has no light of its own to run out of.',
            'She was watching.',
            'Mom says Earth was in the middle.'
          ],
          why: 'Earth was between the sun and the moon, so its shadow covered the moon.'
        }
      ]
    },
    {
      id: 'rd-m2-t2',
      module: 2,
      week: 4,
      kind: 'weekly',
      readAloud: false,
      title: 'Three People, One Trip',
      text: `In July of 1969, three men flew to the moon. Their names were Neil Armstrong, Buzz Aldrin and Michael Collins.

Near the moon, their spacecraft split into two parts. Neil and Buzz rode the small part down to the ground. It was called the Eagle.

Neil stepped out first. Buzz came out next. They walked on the grey dust. They put up a flag and picked up rocks to bring home.

Michael did not walk on the moon. He stayed in the big part and flew around and around the moon, alone. His job was just as important. Without him, the others had no ride home.

After about a day, the Eagle flew back up. The three men were together again. They flew home to Earth.`,
      questions: [
        {
          id: 'rd-m2-t2-q1',
          kind: 'main',
          prompt: 'What is this passage mostly about?',
          choices: [
            'How to put up a flag',
            'Three men who flew to the moon, and the job each one did',
            'Why the moon is grey',
            'How eagles fly'
          ],
          answer: 1,
          feedback: [
            'The flag is one small detail.',
            null,
            'The passage does not say why.',
            'Eagle was the name of their spacecraft.'
          ],
          why: 'It names all three men and tells what each one did on the trip.'
        },
        {
          id: 'rd-m2-t2-q2',
          kind: 'word',
          prompt: '"Their spacecraft split into two parts." What does split mean?',
          choices: ['Got bigger', 'Broke down', 'Went faster', 'Came apart'],
          answer: 3,
          feedback: [
            'It went from one to two, but no bigger.',
            'Nothing went wrong. It was the plan.',
            'The passage does not talk about speed there.',
            null
          ],
          why: 'One spacecraft became two parts: a small one and a big one.'
        },
        {
          id: 'rd-m2-t2-q3',
          kind: 'detail',
          prompt: 'Who stepped onto the moon first?',
          choices: [
            'Neil Armstrong',
            'Buzz Aldrin',
            'Michael Collins',
            'All three at once'
          ],
          answer: 0,
          feedback: [
            null,
            'Buzz came out next.',
            'Michael did not walk on the moon.',
            'One stepped out first.'
          ],
          why: 'It says: "Neil stepped out first."'
        },
        {
          id: 'rd-m2-t2-q4',
          kind: 'detail',
          prompt: 'What was the small part of the spacecraft called?',
          choices: ['The Moon', 'The Flag', 'July', 'The Eagle'],
          answer: 3,
          feedback: [
            'The moon is where it landed.',
            'The flag was put up on the ground.',
            'July is when they flew.',
            null
          ],
          why: 'It says: "It was called the Eagle."'
        },
        {
          id: 'rd-m2-t2-q5',
          kind: 'detail',
          prompt: 'What did Neil and Buzz pick up to bring home?',
          choices: ['Flags', 'Water', 'Rocks', 'Plants'],
          answer: 2,
          feedback: [
            'They put a flag up. They did not bring one home.',
            'There is no water in the passage.',
            null,
            'Nothing grows on the moon.'
          ],
          why: 'It says they "picked up rocks to bring home."'
        },
        {
          id: 'rd-m2-t2-q6',
          kind: 'inference',
          prompt: 'Why does the passage say Michael’s job was just as important?',
          choices: [
            'He walked the farthest',
            'The others needed him to get home',
            'He picked up the most rocks',
            'He flew the Eagle down'
          ],
          answer: 1,
          feedback: [
            'He did not walk on the moon at all.',
            null,
            'He never touched the ground.',
            'Neil and Buzz rode the Eagle.'
          ],
          why: 'It says: "Without him, the others had no ride home."'
        }
      ]
    }
  ]
};

export default READING_M2;
