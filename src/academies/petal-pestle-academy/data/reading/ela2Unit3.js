// ---------------------------------------------------------------------------
// READING CHECK — ela2 UNIT 3, "RURAL, SUBURBAN, URBAN".
//
// The third and last of the ela2 units. With this one written, recording a
// reading result can no longer empty her screen: Unit 1 hands to Unit 2, Unit 2
// to Unit 3, and Unit 3 to the end of the course.
//
// ---- ⚠️ WRITTEN WITHOUT BEING ABLE TO RUN check-reading-check ----
//
// Same as ela2Unit2.js, and worth repeating rather than cross-referencing: a
// Windows update released Sep 8 2026 stopped this workspace reaching the folder,
// so nothing here has been machine-verified. Every number was computed by hand.
//
// ---- ⚠️ THE WORD THIS UNIT IS NAMED AFTER CANNOT APPEAR IN THE PROSE ----
//
// "Suburban" counts THREE syllables in the app's own counter — su/bur/ban — and
// it is in neither SUBJECT_TERMS nor COMMON_WORDS. Used once in a 70-word
// passage it is 1.4% of the text; used four times, as a unit about suburbs
// naturally would, it is over the 6% cap on its own and the check fails the
// build on a passage that is otherwise easy to read.
//
// "Suburb" counts TWO — su/burb — and is used instead throughout. The unit keeps
// Khan's name in `unitName`, which is not measured, so the child still sees the
// word she saw on Khan.
//
// ⚠️ THIS IS A WORKAROUND AND IT SHOULD BE WRITTEN DOWN AS ONE. The right answer
// is probably that "suburban", "suburb" and "urban" belong in SUBJECT_TERMS —
// they are the CONTENT of a unit about where people live, which is exactly what
// that list is for ("Content words a question or lesson is allowed to use
// because they ARE the content"). That is a change to a shared word list that
// every readability check in the app reads, so it is Gigi's call and not one to
// slip in beside a content file. Recorded in the build log as owed.
//
// ---- THE MEASUREMENTS, WORKED BY HAND ----
//
//   Three Places to Live   72 words · 11 sentences · 6.5 a sentence · 0 long
//   The Same Day, Three    66 words · 12 sentences · 5.5 a sentence · 0 long
//
// Cap is 11 words a sentence and 6% long words. Words checked by hand for a
// third syllable and deliberately kept out: suburban, apartment, pavement,
// sidewalk, elevator, quieter, faraway.
//
// ---- WHAT THE QUESTIONS MAY ASK ----
//
// A lesson may only ask for what it gave her. The trap in a unit about where
// people live is the question that rewards the child who has BEEN to a city, so
// no question here can be answered from experience — every answer is stated in
// the passage above it.
//
// Nothing in either passage says one kind of place is better, and the first
// passage says so outright. She lives in one of these three.
//
// Answer key spread 2, 2, 2, 2 — 25% each, against the 40% ceiling.
// ---------------------------------------------------------------------------

export const ELA2_UNIT3 = {
  id: 'read-ela2-u3',
  khanCourse: 'ela2',
  khanUnit: 3,
  unitName: 'Rural, Suburban, Urban',
  label: 'Reading check · Rural, Suburban, Urban',

  neverAKhanGrade: true,

  passages: [
    {
      id: 'read-ela2-u3-p1',
      title: 'Three Places to Live',
      // Compare and contrast with a flat structure — three paragraphs built the
      // same way, so the shape of the text teaches the shape of the idea.
      skill: 'comparing three things',
      text: `Some people live on a farm. Fields go on for miles. The nearest shop may be far away.

Some people live in a city. Tall buildings stand close together. Buses and cars fill the street.

Some people live in a suburb. It sits just outside a city. There are houses with small gardens, and a short bus ride to the shops.

All three are homes. None of them is the best one.`
    },
    {
      id: 'read-ela2-u3-p2',
      title: 'The Same Day, Three Ways',
      // The same idea again as narrative rather than description. Reading the
      // second passage after the first is the whole point: she should recognise
      // which girl lives where without being told the word.
      skill: 'using what one text taught you to read another',
      text: `Maya wakes on the farm. She feeds the hens before school. The bus ride takes forty minutes.

Ben wakes in the city. He hears traffic under his window. His school is two streets away, so he walks.

Rosa wakes in a suburb. Her street is quiet in the morning. She rides her bike to school past rows of houses.

Three girls. Three homes. One school day.`
    }
  ],

  questions: [
    {
      id: 'read-ela2-u3-q1',
      passage: 'read-ela2-u3-p1',
      prompt: 'What does the passage say about a farm?',
      choices: [
        'Buses and cars fill the street',
        'The houses have small gardens',
        'Fields go on for miles',
        'It sits just outside a city'
      ],
      answer: 2,
      feedback: [
        'That is the city.',
        'That is the suburb.',
        null,
        'That is the suburb.'
      ],
      why: 'The farm paragraph says fields go on for miles.'
    },
    {
      id: 'read-ela2-u3-q2',
      passage: 'read-ela2-u3-p1',
      prompt: 'In the city, what fills the street?',
      choices: ['Buses and cars', 'Fields', 'Hens', 'Small gardens'],
      answer: 0,
      feedback: [
        null,
        'Fields are on the farm.',
        'There are no hens in this passage.',
        'The gardens are in the suburb.'
      ],
      why: 'It says buses and cars fill the street.'
    },
    {
      id: 'read-ela2-u3-q3',
      passage: 'read-ela2-u3-p1',
      prompt: 'Where does the passage say a suburb sits?',
      choices: [
        'In the middle of a city',
        'On a farm',
        'A long way from any city',
        'Just outside a city'
      ],
      answer: 3,
      feedback: [
        'It sits outside the city, not in the middle of it.',
        'A suburb is not a farm.',
        'It is close enough for a short bus ride.',
        null
      ],
      why: 'It says a suburb sits just outside a city.'
    },
    {
      id: 'read-ela2-u3-q4',
      passage: 'read-ela2-u3-p1',
      prompt: 'What does the passage say at the end?',
      choices: [
        'The city is the best place',
        'None of them is the best one',
        'The farm is the best place',
        'A suburb is the best place'
      ],
      answer: 1,
      feedback: [
        'The passage does not pick one.',
        null,
        'The passage does not pick one.',
        'The passage does not pick one.'
      ],
      why: 'The last line says all three are homes, and none of them is the best one.'
    },
    {
      id: 'read-ela2-u3-q5',
      passage: 'read-ela2-u3-p2',
      prompt: 'How long does the bus ride take for Maya?',
      choices: ['Ten minutes', 'Forty minutes', 'A whole hour', 'Two minutes'],
      answer: 1,
      feedback: [
        'Read the third line again.',
        null,
        'Read the third line again.',
        'Ben is the one who lives two streets away.'
      ],
      why: 'It says the bus ride takes forty minutes.'
    },
    {
      id: 'read-ela2-u3-q6',
      passage: 'read-ela2-u3-p2',
      prompt: 'Why does Ben walk to school?',
      choices: [
        'He has no money for the bus',
        'He likes to walk',
        'The bus was full',
        'His school is two streets away'
      ],
      answer: 3,
      feedback: [
        'The passage does not say anything about money.',
        'It may be true, but the passage gives a different reason.',
        'There is no bus in the city paragraph.',
        null
      ],
      why: 'It says his school is two streets away, so he walks.'
    },
    {
      id: 'read-ela2-u3-q7',
      passage: 'read-ela2-u3-p2',
      prompt: 'How does Rosa get to school?',
      choices: ['On her bike', 'On the bus', 'In a car', 'She walks'],
      answer: 0,
      feedback: [
        null,
        'Maya is the one who takes the bus.',
        'No one goes by car in this passage.',
        'Ben is the one who walks.'
      ],
      why: 'It says she rides her bike to school past rows of houses.'
    },
    {
      id: 'read-ela2-u3-q8',
      passage: 'read-ela2-u3-p2',
      prompt: 'What is the same for all three girls?',
      choices: ['Their street', 'Their home', 'The school day', 'The bus ride'],
      answer: 2,
      feedback: [
        'Each street is different.',
        'Three homes, the passage says, and all different.',
        null,
        'Only Maya takes a bus.'
      ],
      why: 'The last lines are three girls, three homes, one school day.'
    }
  ]
};

export default ELA2_UNIT3;
