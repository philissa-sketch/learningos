// ---------------------------------------------------------------------------
// READING CHECK — ela2 UNIT 2, "THE MOON".
//
// ---- WHY THIS FILE EXISTS ----
//
// Gigi, Sep 12 2026: "for reading check new reading lessons are supposed show up
// for her to read each day and its the same one."
//
// Two things were true at once. Her record held NO Khan grade for ela2, so
// `nextUnitFor` correctly returned Unit 1 every day — and even once that is
// recorded, `READING_UNITS` held exactly ONE unit, so the check would have gone
// from repeating to disappearing on the same afternoon.
//
// readingCheck.js said so plainly and nobody had read it: "Returns null when
// there is no check written for her unit yet — ONE of the three ela2 units has
// one." That sentence was a backlog item written where only a developer would
// find it. This file and ela2Unit3.js are the other two.
//
// ---- ⚠️ WRITTEN WITHOUT BEING ABLE TO RUN check-reading-check ----
//
// Sep 12 2026: a Windows update released Sep 8 stopped this workspace reaching
// Gigi's folder, so `node` could not be run at all. Every number below was
// computed BY HAND against the rules read out of the check and out of
// readingLoad.js, and NONE of it has been machine-verified.
//
// `RUN-THE-CHECKS.bat` is the run that counts, and for this file it is not a
// second pair of eyes — it is the first.
//
// ---- THE MEASUREMENTS, WORKED BY HAND ----
//
// analyse() counts a word HARD at three or more syllables unless it is in
// SUBJECT_TERMS or COMMON_WORDS. The Quarter 1 cap is 11 words a sentence and
// 6% long words, and check-reading-check applies the Quarter 1 cap to EVERY
// unit, not just Quarter 1 ones.
//
//   Borrowed Light        76 words · 11 sentences · 6.9 a sentence · 0 long
//   Footprints That Stay  60 words ·  9 sentences · 6.7 a sentence · 0 long
//
// Zero long words is deliberate and is the same choice Unit 1 made. §34 puts a
// FLOOR at Quarter 3 because prose written too easy is as wrong as prose written
// too hard — but her independent reading STILL has not been measured once, and
// the first measurement that defeats her tells you nothing except that it was
// too hard. Ramp on evidence, not on hope. The words checked by hand for a third
// syllable and deliberately kept out: astronaut, telescope, evening, faraway.
//
// ---- WHY THE MOON, FOR THIS CHILD ----
//
// Khan named this unit and the passages answer to it. Azianna wants to be a
// doctor and a herbalist — both are observing jobs, and "the moon makes no light
// of its own, it gives back the sun" is the first time a science idea in this
// app asks her to hold two facts together to explain a third.
//
// The answer key is spread 2, 2, 2, 2 across four slots — 25% each, against the
// 40% ceiling. §3.6, and the Science Lab bug that produced it.
// ---------------------------------------------------------------------------

export const ELA2_UNIT2 = {
  id: 'read-ela2-u2',
  khanCourse: 'ela2',
  khanUnit: 2,
  unitName: 'The Moon',
  label: 'Reading check · The Moon',

  /** Same rule as Unit 1, and it is not weaker for being repeated. */
  neverAKhanGrade: true,

  passages: [
    {
      id: 'read-ela2-u2-p1',
      title: 'Borrowed Light',
      // The skill is holding a cause across two sentences: the sun shines, the
      // moon gives it back. Nothing here asks her to know the phases by name.
      skill: 'cause and effect',
      text: `The moon looks bright at night. It has no light of its own.

The light comes from the sun. The sun shines on the moon. The moon throws that light back to us.

Half of the moon is always lit. Half of it is always dark. We do not always see the lit half.

Some nights we see a thin curve. Some nights we see a round white disc. It is the same moon each time.`
    },
    {
      id: 'read-ela2-u2-p2',
      title: 'Footprints That Stay',
      // Compare and contrast, with the comparison stated rather than implied:
      // Earth has wind and rain, the moon has neither, so the marks stay.
      skill: 'what is different, and what follows from it',
      text: `Men walked on the moon in nineteen sixty nine. They left footprints in the grey dust.

Those footprints are still there now. Nothing has swept them away.

On Earth, wind moves the dust. Rain washes it. The moon has no wind and no rain.

So the marks stay. A footprint on the moon may last for a very long time.`
    }
  ],

  questions: [
    {
      id: 'read-ela2-u2-q1',
      passage: 'read-ela2-u2-p1',
      prompt: 'Where does the light on the moon come from?',
      choices: ['From inside the moon', 'From the sun', 'From the stars', 'From Earth'],
      answer: 1,
      feedback: [
        'The passage says the moon has no light of its own.',
        null,
        'The stars are not in this passage.',
        'Earth is not in this passage.'
      ],
      why: 'It says the light comes from the sun, and the moon throws it back to us.'
    },
    {
      id: 'read-ela2-u2-q2',
      passage: 'read-ela2-u2-p1',
      prompt: 'How much of the moon is lit at any one time?',
      choices: ['All of it', 'None of it', 'A thin curve', 'Half of it'],
      answer: 3,
      feedback: [
        'Half of it is always dark.',
        'Half of it is always lit.',
        'That is what we sometimes SEE, not how much is lit.',
        null
      ],
      why: 'Half of the moon is always lit and half is always dark.'
    },
    {
      id: 'read-ela2-u2-q3',
      passage: 'read-ela2-u2-p1',
      prompt: 'Why does the moon look different on different nights?',
      choices: [
        'We do not always see the lit half',
        'The moon changes shape',
        'A cloud covers part of it',
        'The sun stops shining on it'
      ],
      answer: 0,
      feedback: [
        null,
        'The passage says it is the same moon each time.',
        'There are no clouds in this passage.',
        'The sun shines on it all the time.'
      ],
      why: 'Half is always lit. What changes is how much of the lit half we can see.'
    },
    {
      id: 'read-ela2-u2-q4',
      passage: 'read-ela2-u2-p1',
      prompt: 'What does the passage say about the moon we see each night?',
      choices: [
        'It is a new moon each night',
        'It grows and then shrinks',
        'It is the same moon each time',
        'It is made out of light'
      ],
      answer: 2,
      feedback: [
        'The last line says the opposite.',
        'It looks different, but the passage does not say it grows.',
        null,
        'It has no light of its own.'
      ],
      why: 'The last line says it is the same moon each time.'
    },
    {
      id: 'read-ela2-u2-q5',
      passage: 'read-ela2-u2-p2',
      prompt: 'What did the men leave in the grey dust?',
      choices: ['Their boots', 'A rock', 'Footprints', 'A light'],
      answer: 2,
      feedback: [
        'The passage does not say anything about boots.',
        'The passage does not say they left a rock.',
        null,
        'The passage does not say they left a light.'
      ],
      why: 'They left footprints in the grey dust.'
    },
    {
      id: 'read-ela2-u2-q6',
      passage: 'read-ela2-u2-p2',
      prompt: 'Why are the footprints still there?',
      choices: [
        'The moon has no wind and no rain',
        'Nobody is allowed to walk there',
        'They were cut into rock',
        'Somebody painted over them'
      ],
      answer: 0,
      feedback: [
        null,
        'The passage does not say anything about who is allowed there.',
        'They are in dust, not rock.',
        'Nobody paints anything in this passage.'
      ],
      why: 'On Earth wind and rain move the dust. The moon has neither, so the marks stay.'
    },
    {
      id: 'read-ela2-u2-q7',
      passage: 'read-ela2-u2-p2',
      prompt: 'On Earth, what moves the dust?',
      choices: ['The sun', 'The moon', 'People walking', 'Wind'],
      answer: 3,
      feedback: [
        'The sun is not in this passage.',
        'The moon does not move dust on Earth.',
        'The passage does not say people move it.',
        null
      ],
      why: 'It says wind moves the dust and rain washes it.'
    },
    {
      id: 'read-ela2-u2-q8',
      passage: 'read-ela2-u2-p2',
      prompt: 'What does the passage say a footprint on the moon may do?',
      choices: [
        'Fade away by morning',
        'Last for a very long time',
        'Fill up with rain',
        'Blow away in the wind'
      ],
      answer: 1,
      feedback: [
        'Nothing has swept them away since nineteen sixty nine.',
        null,
        'The moon has no rain.',
        'The moon has no wind.'
      ],
      why: 'The last line says it may last for a very long time.'
    }
  ]
};

export default ELA2_UNIT2;
