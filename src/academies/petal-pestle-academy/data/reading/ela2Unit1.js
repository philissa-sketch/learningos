// ---------------------------------------------------------------------------
// READING CHECK — ela2 UNIT 1, "FAIRY TALES RETOLD".
//
// ---- WHY THIS FILE EXISTS ----
//
// Gigi, Aug 25 2026: "Can you look through Kahn Academy reading lessons that
// she is doing. There are no unit tests. How can we test her. In Lamar's app we
// have passages that he has to read and is tested on it."
//
// She is right, and this app already knew. khanUnits.js, written Aug 16 after
// somebody counted it on the rendered page:
//
//     "KHAN BUILT NO TESTS FOR THIS COURSE, AND THAT IS NOT A GAP IN THE
//      RESEARCH. Counted on the rendered page: 77 links — 49 videos, 15
//      exercises, 6 articles, ZERO assessments... Khan's elementary ELA is
//      themed reading, not a graded course; its gradeable ELA starts at 4th
//      grade."
//
// That course carries `graded: 'parent'` — the grades were always meant to come
// from Gigi by hand. This is the instrument that lets her stop doing it by hand.
//
// ---- ⚠️ WHICH UNIT, AND WHY IT IS SECOND GRADE ----
//
// The reading block sends her to her LOWEST strand in the subject. That is
// VOCABULARY at 2.91, not Reading Comprehension at 3.46 — and below 3.00 maps to
// second grade. So she is in ela2, Unit 1, "Fairy Tales Retold".
//
// Gigi said "she is currently in 2nd grade reading" and a session said third,
// having computed it off an eight-day-old export instead of asking the app.
// Verify against the disk, not against a file that was true last week.
//
// ---- ⚠️ WHAT THIS MEASURES THAT NOTHING ELSE EVER HAS ----
//
// 54 of her 86 recorded answers were READ ALOUD to her — 63%, and 5 of her 6
// Reading Comprehension answers. Her diagnostic document has said since Aug 13:
//
//     "Reading 3.46 and Vocabulary 2.91 are listening scores, not reading
//      scores. Her independent reading level is likely lower than both."
//
// HER INDEPENDENT READING HAS NEVER BEEN MEASURED. Not once, in any instrument
// this app has. That is the largest blank on her record and it is the blank this
// file exists to fill.
//
// So read-aloud is OFFERED here and RECORDED PER ANSWER. Withholding it would
// measure decoding nobody has taught her and hand Gigi a low score she would
// read as "she did not understand". Hiding whether it was used would produce a
// reading score that is secretly another listening score — which is exactly the
// confusion already sitting in her file.
//
// The first score she earns WITHOUT pressing "read it to me" is the first
// independent reading measurement in this app's history. It should be recorded
// as such and not averaged with the rest.
//
// ---- HOW HARD THE PROSE IS, MEASURED RATHER THAN CLAIMED ----
//
// Run through the app's own analyse() from src/lib/readingLoad.js, the same
// function check-lesson-prose uses:
//
//   The Bears Tell It   112 words · 7.5 words a sentence · 0.0% long words
//   Jack and the Bean    99 words · 7.6 words a sentence · 0.0% long words
//
// The Quarter 1 cap is 11 words a sentence and 6% long words. Both sit well
// under it, DELIBERATELY.
//
// ⚠️ AND "WELL UNDER" IS A DECISION THAT COULD BE WRONG. §34 records a FLOOR at
// Quarter 3 for exactly this reason — "prose written too easy is as wrong as
// prose written too hard". Quarter 1 has no floor, so nothing here is breaking a
// rule. But this is the FIRST time anyone measures what she can read alone, and
// a first measurement that defeats her tells you nothing except that it was too
// hard. Start under, and let the next unit ramp on evidence rather than on hope.
//
// ---- WHAT THE QUESTIONS MAY ASK ----
//
// A lesson may only ask for what it gave her. Every answer below is stated in
// the passage above it, in plain words, and no question needs a fairy tale she
// has read somewhere else — which is the trap in a RETELLING unit, where the
// tempting question is "what happened in the real story".
//
// The answer key is spread: 2, 2, 2 and 2 across four slots, 25% each, against
// the 40% ceiling. §3.6's rule, and the Science Lab bug that produced it — 42 of
// 60 in one slot.
// ---------------------------------------------------------------------------

/**
 * A passage she reads, and the questions that may be asked about it.
 *
 * `unit` ties this to Khan's own unit so the app can say WHY it is asking —
 * "you have been reading fairy tales retold; here is one of ours." A test that
 * arrives with no relationship to the week is a test she has no reason to trust.
 */
export const ELA2_UNIT1 = {
  id: 'read-ela2-u1',
  khanCourse: 'ela2',
  khanUnit: 1,
  unitName: 'Fairy Tales Retold',
  label: 'Reading check · Fairy Tales Retold',

  /**
   * ⚠️ THIS IS NOT A KHAN GRADE AND MUST NEVER BE RECORDED AS ONE.
   *
   * v3.76's rule, in a new place: a Course Challenge and a unit test are not the
   * same thing and are kept apart in both directions. This is a THIRD kind —
   * a test this app wrote, about a Khan unit, sat in this app.
   *
   * Filing it in khanGrades would put a number Khan never produced onto what
   * becomes a transcript, and `nextUnitFor` would then advance her Khan unit on
   * the strength of a test Khan has never seen.
   */
  neverAKhanGrade: true,

  passages: [
    {
      id: 'read-ela2-u1-p1',
      title: 'The Bears Tell It',
      // Point of view is the whole skill of a retelling unit: the same events,
      // a different teller. Nothing here asks her to remember Goldilocks.
      skill: 'point of view',
      text: `Everyone knows the story about the three bears. Nobody ever asks the bears.

We went out that morning because the porridge was too hot. That is all. We walked in the wood and we came back.

The door was open. My chair was moved. My bowl was empty, and I had not eaten it.

Then I went up to my room. There was a girl asleep in my bed. She had yellow hair and muddy shoes, and she was in MY bed.

She woke up. She screamed at us. Then she ran out of the door and down the path, and she never came back.

We were the ones who were scared.`
    },
    {
      id: 'read-ela2-u1-p2',
      title: 'Jack and the Bean',
      // Cause and effect, and one plant. Azianna wants to be a herbalist; a
      // beanstalk is the one fairy tale that is also a growing thing.
      skill: 'what happened, and why',
      text: `Jack had one cow and no food. His mother told him to sell the cow at market.

On the road he met a man with five beans. The man said the beans were magic. Jack gave him the cow and took the beans home.

His mother was angry. She threw the beans out of the window into the garden.

That night it rained. In the morning a green stalk stood outside, thick as a tree. It went up past the roof and into the cloud.

Jack put one hand on it. The stalk was warm. He began to climb.`
    }
  ],

  /**
   * Eight questions, four to a passage.
   *
   * `passage` is which text answers it. A question whose passage is not on
   * screen is a memory test, and check-reading-check fails the build on one.
   */
  questions: [
    {
      id: 'read-ela2-u1-q1',
      passage: 'read-ela2-u1-p1',
      prompt: 'Who is telling this story?',
      choices: ['The girl', 'A man in the wood', 'The bears', 'Her mother'],
      answer: 2,
      feedback: [
        'The girl is IN the story, but somebody else is telling it.',
        'There is no man in this story.',
        null,
        'Her mother is not in this story.'
      ],
      why: 'It says "Nobody ever asks the bears" — and then the bears tell it.'
    },
    {
      id: 'read-ela2-u1-q2',
      passage: 'read-ela2-u1-p1',
      prompt: 'Why did the bears go out that morning?',
      choices: [
        'The porridge was too hot',
        'They were going to market',
        'They heard a noise',
        'They were looking for the girl'
      ],
      answer: 0,
      feedback: [
        null,
        'Nobody goes to market in this story.',
        'They did not hear anything. They went out first.',
        'They had never met her yet.'
      ],
      why: 'They say it themselves: they went out because the porridge was too hot.'
    },
    {
      id: 'read-ela2-u1-q3',
      passage: 'read-ela2-u1-p1',
      prompt: 'What did the bear find in the bedroom?',
      choices: ['An empty bowl', 'A moved chair', 'An open door', 'A girl asleep'],
      answer: 3,
      feedback: [
        'The bowl was downstairs.',
        'The chair was downstairs.',
        'The door was downstairs.',
        null
      ],
      why: 'The bowl, the chair and the door came first. The girl was upstairs.'
    },
    {
      id: 'read-ela2-u1-q4',
      passage: 'read-ela2-u1-p1',
      prompt: 'At the end, who does the bear say was frightened?',
      choices: ['The girl', 'The bears', 'Nobody', 'The whole wood'],
      answer: 1,
      feedback: [
        'She screamed and ran — but read the last line again.',
        null,
        'Somebody was frightened.',
        'The wood is not in the last line.'
      ],
      why: 'The last line is "We were the ones who were scared." That is the bears.'
    },
    {
      id: 'read-ela2-u1-q5',
      passage: 'read-ela2-u1-p2',
      prompt: 'What did Jack get for the cow?',
      choices: ['Some money', 'Five beans', 'A green stalk', 'Food for his mother'],
      answer: 1,
      feedback: [
        'No money changes hands.',
        null,
        'The stalk grew later. It was not what he was given.',
        'He brought home beans, not food.'
      ],
      why: 'He met a man with five beans and gave him the cow.'
    },
    {
      id: 'read-ela2-u1-q6',
      passage: 'read-ela2-u1-p2',
      prompt: 'How did the beans get into the garden?',
      choices: [
        'Jack planted them',
        'The man planted them',
        'The rain washed them there',
        'His mother threw them out of the window'
      ],
      answer: 3,
      feedback: [
        'Jack brought them home, but he did not plant them.',
        'The man stayed on the road.',
        'The rain came later, that night.',
        null
      ],
      why: 'She was angry, and she threw them out of the window into the garden.'
    },
    {
      id: 'read-ela2-u1-q7',
      passage: 'read-ela2-u1-p2',
      prompt: 'What happened the night after the beans landed in the garden?',
      choices: ['It rained', 'Jack climbed', 'The cow came back', 'The man returned'],
      answer: 0,
      feedback: [
        null,
        'He climbed in the morning, not that night.',
        'The cow does not come back.',
        'The man is not seen again.'
      ],
      why: 'That night it rained. The stalk was standing there in the morning.'
    },
    {
      id: 'read-ela2-u1-q8',
      passage: 'read-ela2-u1-p2',
      prompt: 'What did Jack do after he felt that the stalk was warm?',
      choices: [
        'He went to tell his mother',
        'He waited for the rain to stop',
        'He began to climb',
        'He picked a bean'
      ],
      answer: 2,
      feedback: [
        'He does not go back inside.',
        'The rain had already stopped. It was morning.',
        null,
        'There are no beans on it to pick.'
      ],
      why: 'He put a hand on it, felt it was warm, and started climbing.'
    }
  ]
};

/** Every reading check in the app, by id. One so far. */
export const READING_UNITS = [ELA2_UNIT1];

export function readingUnitFor(khanCourse, khanUnit) {
  return (
    READING_UNITS.find((u) => u.khanCourse === khanCourse && u.khanUnit === khanUnit) || null
  );
}

export function readingUnitById(id) {
  return READING_UNITS.find((u) => u.id === id) || null;
}

export default READING_UNITS;
