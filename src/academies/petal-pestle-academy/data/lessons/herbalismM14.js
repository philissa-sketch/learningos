// ---------------------------------------------------------------------------
// HERBALISM & BOTANY — MODULE 14 · HOW A CLAIM GETS TESTED
// QUARTER 4, WEEKS 3 AND 4. Lessons 79-84 of 96.
//
//   hb-m14-01  W3 D1  n79  What makes something evidence
//   hb-m14-02  W3 D2  n80  The fair test
//   hb-m14-03  W3 D3  n81  Why we need a control group
//   hb-m14-04  W4 D1  n82  The placebo, and why it fools people
//   hb-m14-05  W4 D2  n83  Reading a label and reading a claim
//   hb-m14-06  W4 D3  n84  When the experts change their minds
//
// Built to /home/claude/LESSON-SPEC-Q3Q4.md for the reading level and to
// /home/claude/LESSON-SPEC.md for everything else.
//
// ---- WHAT THIS MODULE IS ----
//
// This is the intellectual capstone of the whole course. Thirteen modules
// taught her about plants. This one teaches her how to find out whether
// anything at all is true, which is the thing she will still be using at
// thirty when every plant fact in here has been revised twice.
//
// It is a genuine escalation of Module 8 Lesson 48, "Making a claim and
// testing it", and it was written with that lesson open. L48 gave her two
// ideas: a claim is not evidence, and a fair test changes one thing. Both are
// still true and both are named out loud here so she recognises them. This
// module then goes past them, into the five things L48 did not have room for:
//
//   sample size            L79 — one plant is a story, twelve is data
//   after is not because   L80 — the thing that came next did not have to cause it
//   the control group      L81 — with nothing to compare against you have nothing
//   placebo and blinding   L82 — why sincere people report a result that is not there
//   cherry-picking         L83 — the claim is worth what it leaves out
//
// and then L84, the one most courses skip: what a scientist does when the
// evidence turns against something everybody already believes.
//
// ---- NO DOSING. NOT ONE SENTENCE OF IT. ----
//
// This module talks about testing and about medicine getting tested, so the
// line has to be walked carefully and it was. Nothing in these six lessons
// tells her that any plant is for anything, and no amount of anything is ever
// aimed at a person. Every worked example is an ordinary testable garden
// claim: does the fuzzy-leaved plant really get eaten less, does watering at
// night really help, does mulch really keep a pot damper, do seeds from the
// biggest tomato really grow best. Her own containers of garlic, turmeric,
// ginger and corn in Georgia supply the claims, and they are real claims with
// real answers she does not know yet.
//
// Lesson 84 tells a true medical story — Warren, Marshall and stomach ulcers —
// because it is the cleanest checkable example of science correcting itself
// that exists. It is told as history and as method. No treatment is described,
// no amount is given, and the lesson says plainly that Marshall swallowing a
// culture of bacteria is NOT something anybody should copy and would not be
// allowed today.
//
// Lesson 82 is about the placebo effect, and the frame is fixed and deliberate:
// THIS IS WHY WE NEED THE TEST, NOT WHY PEOPLE ARE LIARS. A nine-year-old who
// learns that people lie about remedies has learned to be a cynic. A ten-year-
// old who learns that sincere, honest, careful people genuinely feel better
// after something that did nothing has learned the single most useful thing in
// medicine. The activity runs the effect on her, and then she runs it on
// somebody else, and both rounds end with the trick explained kindly.
//
// ---- standards: [] ON ALL SIX ----
//
// Herbalism owns ten Georgia elements: S4L1a-d, S4E3a-c and S4E4a-d. Module 10
// discharged the last two. There is nothing left on this course map to claim
// and claiming one twice would make the coverage report lie. Georgia's
// fourth-grade science map has no element about study design, sample size,
// control groups, blinding or evaluating a claim, which is a comment on the
// map and not on the content. No offGrade code either: off-grade means a real
// element from a lower grade, and this is not an element from any grade.
//
// ---- THE READING LEVEL ----
//
// Quarter 4 is the hardest reading in the course: Flesch-Kincaid 3.5-4.5,
// about eleven words a sentence, about eight percent long words. That was
// reached by joining clauses that belong together and by letting the
// vocabulary carry weight, not by padding. Apply-Its need two steps of
// reasoning. Read-aloud stays on every screen.
//
// New subject words that should be added to the SUBJECT exemption set in
// scripts/check-assessment.mjs when this merges:
//
//   anecdote, evidence, variation, coincidence, variable, control group,
//   treatment group, baseline, placebo, blinded, expectation, ingredient,
//   cherry-picking, consensus, revise, bacterium, bacteria, Helicobacter,
//   endoscopy, Semmelweis, gastritis
//
// ---- VIDEOS: ALL SIX VERIFIED AT NOEMBED ON 2026-08-14 ----
//
// Every id, title and channel below was fetched from
// https://noembed.com/embed?url=... and is recorded EXACTLY as returned.
// What could NOT be done is read the descriptions or the transcripts:
// youtube.com is disallowed to the fetcher by robots.txt, so the channel page
// returns metadata only. DURATIONS ARE THEREFORE UNKNOWN and every `minutes`
// field is null rather than a plausible-looking guess, which is the same call
// Modules 3, 10, 11 and 12 made. Gigi should watch each one before Azianna
// does, which is the standing rule anyway.
//
// ---- THE BLACK-AMERICAN-EDUCATOR GAP IS OPEN IN ALL SIX ----
//
// Stated plainly. Seven searches were run across the module and every one of
// them is written into the relevant `sourceGap` string. One near-miss was
// verified at noembed and then REJECTED on grounds other than existence:
//
//   sHNopBbQVFA  "Science is Everywhere! with Dr. Raven the Science Maven and
//                 Ada Twist" — Netflix Jr. Verified real. Dr. Raven Baxter is
//                 a Black American molecular biologist and science educator and
//                 she is exactly the kind of source this course keeps looking
//                 for. Not used: Ada Twist is pitched at four to seven year
//                 olds, and Quarter 4 is the quarter where writing to a
//                 nine-year-old would already be holding her back. Recorded so
//                 nobody re-finds it and assumes it was missed. Her own channel
//                 (@RaventheScienceMaven) is the live lead and it is worth an
//                 hour: a single verified video from it on how science checks
//                 itself would close Lesson 79 or Lesson 84 outright.
//
// ---- SAFETY STRINGS ----
//
// Only water is ever tasted in this module, and only when Gigi pours it. No
// plant material goes in anybody's mouth in any of these six lessons. Lesson
// 84 carries a second safety line about self-experiment: what Barry Marshall
// did to himself in 1984 is history, not an example to follow.
// ---------------------------------------------------------------------------

/* =========================================================================
 * LESSON 79 · hb-m14-01 · What makes something evidence
 * ========================================================================= */

const M14L1_CHECK_IN = {
  title: 'One plant is a story',
  text: 'Somebody tells you that the plant with the fuzzy leaves never gets eaten. She looked at one plant, on one morning, and it had no holes in it. That is a true thing she saw, and it is still not enough to build an answer on.',
  question: 'How many plants would you want to look at before you believed it, and why that many?'
};

const M14L1_BEATS = [
  {
    n: 1,
    label: 'A story is not evidence',
    hook: 'A single story is the most convincing kind of weak evidence there is, because it arrives with a person telling it.',
    teachingText:
      'Evidence is a record of careful observations that somebody else could check. A story is one thing that happened once, remembered by one person, and usually it was never written down at all.',
    example:
      'Gigi remembers that the garlic did beautifully the year she used the blue bucket. That is a story. Six containers, measured every week in pen, would be evidence.',
    applyIt: {
      prompt: 'A neighbour says her tomatoes grew huge because she buried a fish under them. She measured nothing. What do you have so far?',
      choices: [
        'Evidence, because she saw the whole thing happen herself',
        'A story worth testing, and nothing more than that',
        'Proof, because the tomatoes really were enormous',
        'Nothing useful, so the sensible thing is to ignore her'
      ],
      answer: 1,
      feedback: [
        'Seeing something once is how a question starts, not how it ends.',
        null,
        'The tomatoes were huge. What made them huge is the part nobody measured.',
        'Throwing a claim away untested is just as careless as believing it.'
      ],
      why: 'A story tells you what is worth testing next. It never tells you the answer.'
    }
  },
  {
    n: 2,
    label: 'How many did you measure',
    hook: 'Scientists have a name for how many things somebody measured, and it is sample size. It is usually the first number a careful reader hunts for.',
    teachingText:
      'One measurement can be pure luck, because plants vary for a hundred reasons that have nothing to do with your question. The more you measure, the harder it becomes for luck to fool you, so you measure many and take the average.',
    example:
      'Measure one garlic leaf from the sunny pot and one from the shady pot, and either pot can win. Measure ten leaves from each and the pattern stops jumping around.',
    applyIt: {
      prompt: 'Two corn plants in your shady container are taller than anything in the sunny one, while the other eleven are shorter. What do those two tall plants tell you?',
      choices: [
        'That shade grows taller corn than sunshine does',
        'That something has gone badly wrong with your test',
        'That plants vary, so two of them settle nothing',
        'That you should measure only the tall ones from now on'
      ],
      answer: 2,
      feedback: [
        'Two out of thirteen is exactly the kind of luck a large sample is built to survive.',
        'Nothing went wrong. Living things vary, and you should expect them to.',
        null,
        'Measuring only what agrees with you is the oldest way people fool themselves.'
      ],
      why: 'Every group has odd ones in it, which is why one measurement is never an answer.'
    }
  }
];

const M14L1_ACTIVITY = {
  title: 'Ten measurements beat one story',
  prep: 'Gigi writes one testable claim about the garden on a card before you begin, using a difference she genuinely does not know the answer to. Something like: the garlic leaves on the sunny side of the container are longer than the ones on the shady side. Have a ruler, a pen that does not rub out and a fresh page ready.',
  needs: [
    'her garlic container, and the corn container as well if it is going',
    'a ruler marked in centimetres',
    'a pen that does not rub out',
    'a fresh page ruled into two columns of ten rows',
    'twenty small paper tags or bits of masking tape',
    'a calculator, or paper for adding up',
    'the claim card Gigi wrote'
  ],
  steps: [
    'Read the claim out loud, then write it at the top of your page in your own words.',
    'Pick one leaf from each side, measure both, and write the two numbers down.',
    'Look at what you just did. If those two numbers had come out the other way round, would you have believed the opposite?',
    'Now do it properly. Tag ten leaves on the sunny side without choosing which ones.',
    'Say out loud how you are avoiding choosing: closest to the tag, or every third leaf, or eyes shut.',
    'Measure all ten from the base of the leaf to the tip, and write each number down as you go.',
    'Tag and measure ten leaves on the shady side the same way.',
    'Add each column up and divide by ten, which gives you the average for that side.',
    'Compare the two averages, then write one sentence saying what the numbers let you say.',
    'Circle the longest leaf on the page and the shortest, and notice how far apart they are.',
    'Write the date, your name and how many leaves you measured under your answer.'
  ],
  safety:
    'Measure the leaves where they are growing rather than picking them, because a plant you keep stripping stops being a fair thing to measure. Wash your hands after handling soil. Nothing from the garden goes anywhere near your mouth in this lesson.',
  grownUpAsks: [
    'Before we measure anything. What would change your mind about this claim?',
    'You measured one leaf each. Honestly now, could you have picked a pair to prove either answer?',
    'How did you decide which ten leaves to tag? Say the rule you used.',
    'Why does it matter that you did not get to choose your favourites?',
    'What is the difference between the average and any single leaf on your list?',
    'Your longest and shortest leaves are far apart. Does that ruin the test?',
    'Suppose the averages came out almost the same. What would you write then?',
    'Twenty leaves, or two hundred. Which answer would you trust more, and why?',
    'Somebody reads your page next year. What do they need on it to understand it?',
    'Is this evidence yet, or is it still a story? Defend your answer.',
    'What is the next question your own numbers just handed you?'
  ]
};

const M14L1_LEDGER = {
  sheet: 'M14L1-story-or-evidence-PRINTABLE.pdf',
  tasks: [
    'Write the claim at the top, then your two columns of ten measurements.',
    'Write both averages, and the difference between them, in centimetres.',
    'Write one sentence that your numbers actually support. No more than that.',
    'Write the sample size on the line provided. It is the number of leaves you measured.'
  ],
  game: {
    title: 'Word Boss',
    cards: ['EVIDENCE', 'ANECDOTE', 'SAMPLE SIZE', 'AVERAGE', 'VARIATION'],
    rounds: [
      'Say what each word means in your own words. No fancy talk.',
      'A grown-up says the meaning. You say the word. Beat the clock.',
      'A grown-up reads a garden claim. You call out STORY or EVIDENCE and say why.'
    ],
    ifSheIsStuck:
      'Put her two-leaf answer beside her twenty-leaf answer on the same page. ANECDOTE and EVIDENCE stop being words the moment she can see her own two numbers next to her own two averages.'
  },
  note: 'Nothing here is graded. Nothing is corrected. Petals are for doing it.'
};

/* =========================================================================
 * LESSON 80 · hb-m14-02 · The fair test
 * ========================================================================= */

const M14L2_CHECK_IN = {
  title: 'Watering at night',
  text: 'Somebody swears that watering at night is better for plants. You water your corn at nine in the evening, and by morning it is standing up straight and looking greener than it did all week. It certainly seems to have worked.',
  question: 'What else happened between nine at night and seven in the morning that could explain it?'
};

const M14L2_BEATS = [
  {
    n: 1,
    label: 'One change, everything else held still',
    hook: 'The hardest part of a fair test is not changing the one thing. It is refusing to change any of the others.',
    teachingText:
      'A fair test changes one thing deliberately and holds everything else as still as you can manage. The thing you change on purpose is the variable, and every other condition has to match between your groups or the answer belongs to nobody.',
    example:
      'To test night watering you need matching containers, the same soil, the same corn, the same amount of water and the same day. Only the hour on the clock is allowed to differ.',
    applyIt: {
      prompt: 'You set up the night pot outdoors and the morning pot on the kitchen windowsill, because there was no room outside. What has that done to your test?',
      choices: [
        'Nothing, because both pots still get watered',
        'Improved it, because now you can watch one of them closely',
        'Ruined it, so the whole idea should be abandoned',
        'Added a second change, so no result can be trusted'
      ],
      answer: 3,
      feedback: [
        'Both get watered, but only one of them gets weather, wind and full daylight.',
        'Watching one pot more closely is another difference, not an improvement.',
        'The idea is fine. The setup needs fixing, which takes ten minutes.',
        null
      ],
      why: 'Two things changed, so a difference at the end could belong to either of them.'
    }
  },
  {
    n: 2,
    label: 'After is not the same as because',
    hook: 'Almost every wrong idea about plants and about medicine started as somebody noticing that one thing happened right after another.',
    teachingText:
      'Something happening after something else is not proof that the first one caused it. Time only runs one way, so there is always something that came just before, and most of the time it is a coincidence.',
    example:
      'Your corn perked up after the night watering. It also got cooler, the sun went down, the wind dropped and a shower passed at midnight. Any of those could be the reason.',
    applyIt: {
      prompt: 'You sang to your turmeric every morning for a fortnight and it sprouted on day twelve. Turmeric usually sprouts somewhere between day ten and day twenty. What can you honestly say?',
      choices: [
        'The singing worked, because it sprouted while you were singing',
        'Nothing about the singing, because that is when it sprouts anyway',
        'The singing does nothing, and that is now settled',
        'Nothing at all can ever be learned from turmeric'
      ],
      answer: 1,
      feedback: [
        'It sprouted during the singing. It would have sprouted during silence too.',
        null,
        'You have not shown that either. You have shown you cannot tell yet.',
        'Plenty can be learned. It just needs a pot you did not sing to.'
      ],
      why: 'When the thing would have happened anyway, what came before it explains nothing.'
    }
  }
];

const M14L2_ACTIVITY = {
  title: 'Design the night-watering test properly, and set it up',
  prep: 'Six matching containers, or six matching cups with holes punched in the bottom, all filled from the same bag of soil on the same afternoon. Gigi keeps one measuring jug and does the pouring at night herself, because nine in the evening is a grown-up hour. Have the planning sheet ready before any soil is touched.',
  needs: [
    'six matching containers with drainage holes',
    'soil from one bag, mixed in one bucket first',
    'six seeds or cloves of the same kind, from the same packet',
    'a measuring jug marked in millilitres',
    'labels and a pen that does not rub out',
    'a ruler',
    'the planning sheet',
    'a clock or a phone with a timer'
  ],
  steps: [
    'Write the claim at the top: watering at night grows better plants than watering in the morning.',
    'Underline the one thing you are changing. It is the hour, and nothing else.',
    'List every single thing you are holding the same. Aim for at least six.',
    'Write down how many pots are in each group, and say why three beats one.',
    'Write your prediction in pen, and put today date beside it.',
    'Write the exact result that would prove you wrong, before you have any data.',
    'Mix all the soil in one bucket, then fill all six containers to the same line.',
    'Plant one seed in each, all at the same depth, measured with the ruler.',
    'Label three pots NIGHT and three pots MORNING, and add the date to every label.',
    'Give every pot the same number of millilitres from the same jug.',
    'Set the two groups side by side in the same light, because light is being held still.',
    'Write the day you will measure, and how you will measure it, before you finish.'
  ],
  safety:
    'Gigi does the evening watering, because that is a grown-up hour and a dark garden. Gloves on in the soil and hands washed afterwards. Nothing here is tasted, and no seed goes in a mouth.',
  grownUpAsks: [
    'Read me your claim. Which single word is the thing you are changing?',
    'Name six things you are holding still. Out loud, without the sheet.',
    'Why three pots in each group instead of one?',
    'What would make you say your own prediction was wrong? Be specific.',
    'The corn looked better the morning after we watered. Name three other things that changed overnight.',
    'If a shower falls on both groups, is the test spoiled or not?',
    'Suppose I move one pot into better light. What have I just cost you?',
    'What is the difference between after and because? Give me a garden example.',
    'How long do you have to leave this before the numbers mean anything?',
    'Who else could run your test from this sheet alone? What is still missing on it?',
    'Say the rule back to me. One change, and then what?'
  ]
};

const M14L2_LEDGER = {
  sheet: 'M14L2-fair-test-plan-PRINTABLE.pdf',
  tasks: [
    'Write the claim, then circle the one thing you are changing.',
    'List everything you are holding the same. Six or more.',
    'Write your prediction in pen and date it.',
    'Write the result that would prove you wrong. This line is not optional.'
  ],
  game: {
    title: 'Word Boss',
    cards: ['VARIABLE', 'FAIR TEST', 'COINCIDENCE', 'CAUSE', 'PREDICTION'],
    rounds: [
      'Say what each word means in your own words. No fancy talk.',
      'A grown-up says the meaning. You say the word. Beat the clock.',
      'A grown-up describes a setup. You spot the second change that spoiled it.'
    ],
    ifSheIsStuck:
      'Move one pot two feet to the left, into brighter light, and ask her what her test can still tell her. COINCIDENCE is hard in words and obvious in a pot.'
  },
  note: 'Nothing here is graded. Nothing is corrected. Petals are for doing it.'
};

/* =========================================================================
 * LESSON 81 · hb-m14-03 · Why we need a control group
 * ========================================================================= */

const M14L3_CHECK_IN = {
  title: 'Compared with what',
  text: 'Every plant in the garden looks better this week than it did last week. You put mulch on top of the soil last Sunday. It would be very easy, and very satisfying, to decide that the mulch is what did it.',
  question: 'What would you need in the garden to find out whether the mulch did anything at all?'
};

const M14L3_BEATS = [
  {
    n: 1,
    label: 'Nothing means anything without a comparison',
    hook: 'A result on its own is not a result. It only becomes one when you can say what it is better or worse than.',
    teachingText:
      'A control group is the group you deliberately leave alone, so you have something honest to compare against. The group you do change is the treatment group, and the difference between the two is the only thing your test can actually tell you.',
    example:
      'Mulch three garlic pots and leave three bare, everything else the same. If both groups improve equally, the improvement was June and not the mulch.',
    applyIt: {
      prompt: 'Your mulched pots grew four centimetres this fortnight. You have nothing to compare them with. What does the four centimetres tell you about mulch?',
      choices: [
        'That mulch grows four centimetres of garlic a fortnight',
        'That mulch works, but only a little bit',
        'Nothing yet, because you do not know what bare pots did',
        'That the test needs to run for another fortnight'
      ],
      answer: 2,
      feedback: [
        'The garlic grew four centimetres. Nothing has shown that the mulch is why.',
        'Working a little is still a claim, and you have no comparison to support it.',
        null,
        'Longer will not help. A missing control group stays missing.'
      ],
      why: 'A number with nothing beside it cannot tell you whether anything happened.'
    }
  },
  {
    n: 2,
    label: 'Things change on their own',
    hook: 'Most things get better by themselves eventually, which is why whatever was tried last always seems to get the credit.',
    teachingText:
      'Living things do not sit still while you study them, because weather turns, seasons move on and bodies mend. A control group catches all of that changing on its own, so you can subtract it and see what is left.',
    example:
      'A scraped knee heals in about a week whether anybody fusses over it or not. Whatever was put on it on day six will get the credit for day seven.',
    applyIt: {
      prompt: 'Both groups of garlic grew four centimetres, mulched and bare alike. What is the honest conclusion?',
      choices: [
        'The mulch worked on both groups somehow',
        'The garlic grew for reasons that had nothing to do with mulch',
        'The test failed and should not be written down',
        'Mulch is bad for garlic and should never be used'
      ],
      answer: 1,
      feedback: [
        'The bare pots had no mulch on them at all. It cannot have worked on those.',
        null,
        'That is a real result and it belongs in the log. A null result is still data.',
        'Nothing here shows harm. It shows no difference, which is a different finding.'
      ],
      why: 'When both groups move together, the thing you changed is not what moved them.'
    }
  }
];

const M14L3_ACTIVITY = {
  title: 'The mulch test, with a control group and a scale',
  prep: 'Six matching pots from Lesson 80 can be reused if the seedlings are up, or set six fresh ones. Gigi decides which three get mulched by flipping a coin for each pot, so that nobody chooses the healthy ones for the treatment. A kitchen scale that reads in grams is the measuring instrument here.',
  needs: [
    'six matching pots, same soil, same plants, same size',
    'enough mulch for three pots: straw, dry leaves or wood chips',
    'a kitchen scale that reads in grams',
    'a coin to flip',
    'labels and a pen that does not rub out',
    'a measuring jug',
    'a chart with six rows and a column for each day'
  ],
  steps: [
    'Write the claim: mulch on top keeps the soil in a pot damper for longer.',
    'Flip the coin for each pot in turn and write down which group it landed in.',
    'Say out loud why flipping a coin is fairer than picking the pots yourself.',
    'Label three pots MULCH and three pots BARE, and date every label.',
    'Water all six with exactly the same number of millilitres from the same jug.',
    'Weigh each pot straight afterwards and write down its starting mass in grams.',
    'Spread mulch on the three MULCH pots only, then weigh those three again.',
    'Write down the new mass, because the mulch itself has added some.',
    'Weigh all six pots at the same time every day for a week, and log every number.',
    'Work out how much mass each pot lost, because the mass that left was water.',
    'Average the three MULCH losses and the three BARE losses, then compare them.',
    'Write one sentence about what the control group let you say that the treatment group could not.'
  ],
  safety:
    'Gloves on in the soil, hands washed afterwards. Mulch can hide insects, so shake it out before you spread it and let Gigi look first. Nothing here goes near your mouth.',
  grownUpAsks: [
    'Which three pots are the control group, and what makes them a control?',
    'Why did we flip a coin instead of you choosing?',
    'Suppose you had put the mulch on the three biggest plants. What would that cost you?',
    'What is the mass that goes missing every day? Where did it go?',
    'Both groups lost some water. What does that tell us before we compare anything?',
    'If both groups lose the same mass, what is the honest answer?',
    'Is no difference a failed test, or is it a result? Convince me.',
    'The mulch pots weigh more at the start. Does that break the comparison?',
    'Name one other thing we have to hold still for a whole week.',
    'What would you have to do to be sure this was not just a lucky week?',
    'Say it plainly. What is a control group for?'
  ]
};

const M14L3_LEDGER = {
  sheet: 'M14L3-control-group-PRINTABLE.pdf',
  tasks: [
    'Write which pots went into which group, and how the coin decided it.',
    'Fill in the daily mass table for all six pots.',
    'Work out the average mass lost by each group over the week.',
    'Write one sentence comparing the two groups. Use the word control in it.'
  ],
  game: {
    title: 'Word Boss',
    cards: ['CONTROL GROUP', 'TREATMENT GROUP', 'COMPARISON', 'BASELINE', 'NULL RESULT'],
    rounds: [
      'Say what each word means in your own words. No fancy talk.',
      'A grown-up says the meaning. You say the word. Beat the clock.',
      'A grown-up describes a test. You say whether it has a control group or not.'
    ],
    ifSheIsStuck:
      'Cover the BARE column on her chart with your hand and ask her what the MULCH numbers mean now. The answer is nothing, and she can see it happen.'
  },
  note: 'Nothing here is graded. Nothing is corrected. Petals are for doing it.'
};

/* =========================================================================
 * LESSON 82 · hb-m14-04 · The placebo, and why it fools people
 * ========================================================================= */

const M14L4_CHECK_IN = {
  title: 'They are not lying',
  text: 'Somebody tells you that something helped them, and they mean every word of it. They are not making it up and they are not trying to sell you anything. They felt better, they remember feeling better, and the thing they took did nothing at all.',
  question: 'How can both of those be true at the same time?'
};

const M14L4_BEATS = [
  {
    n: 1,
    label: 'Expecting something changes what you notice',
    hook: 'In real medical trials, the people given a pill with nothing in it often report feeling genuinely better, and sometimes their bodies really do change.',
    teachingText:
      'A placebo is something with no active ingredient in it, handed over as though it were the real thing. Expecting help changes what a person notices, what they remember and how much attention they pay, and that is not lying. It is how attention works in everybody, including you.',
    example:
      'Tell somebody a glass holds special mountain water and they will taste something in it. Pour the same tap water into both glasses and they will still pick a favourite.',
    applyIt: {
      prompt: 'Gigi tells you she gave three of your pots a special plant food. A fortnight later you rank those three as the greenest. Then she tells you all six got plain water. What happened?',
      choices: [
        'Gigi tricked you, so nothing you measured counts for anything',
        'Those three really were greener, so the plain water worked',
        'Knowing which pots were special changed how you looked at them',
        'Your eyes are simply worse than other people at judging green'
      ],
      answer: 2,
      feedback: [
        'She ran a test on your judging. What you measured is exactly the point.',
        'All six got the same water. Green has to come from somewhere else.',
        null,
        'This happens to trained scientists too. It is not about your eyes.'
      ],
      why: 'Expectation bends what a person notices, so the person judging has to be protected from it.'
    }
  },
  {
    n: 2,
    label: 'This is why we hide which is which',
    hook: 'In the strongest trials, neither the patient nor the doctor knows who got the real thing until the whole study is finished.',
    teachingText:
      'A blinded test hides which group is which, so expectation cannot lean on the result. When the person being tested does not know, it is blinded. When the person measuring does not know either, it is double-blinded, and that is the strongest ordinary test there is.',
    example:
      'Gigi covers your pot labels with codes A to F and keeps the key in her pocket. You measure and rank them knowing nothing, and she matches the codes to the groups afterwards.',
    applyIt: {
      prompt: 'You measure your mulch pots yourself, and you already believe mulch works. Why should somebody else read the ruler, or the labels be hidden?',
      choices: [
        'Because measuring is boring and sharing it is fairer',
        'Because two people always get a bigger number than one',
        'Because your hope can nudge a close reading without you noticing',
        'Because rulers give different answers to different people'
      ],
      answer: 2,
      feedback: [
        'It is not about boredom. It is about what hoping does to a close call.',
        'Two people do not change the plant. They change whose hope is holding the ruler.',
        null,
        'The ruler is fine. It is the eye above the ruler that needs protecting.'
      ],
      why: 'Blinding does not assume you are dishonest. It assumes you are human, which you are.'
    }
  }
];

const M14L4_ACTIVITY = {
  title: 'Run the placebo on yourself, then run it on somebody else',
  prep: 'Gigi sets this up before Azianna comes in. She codes the six pots A to F with tape, keeps the key hidden, and tells Azianna that three of them have been given a special plant food without saying which. She gives all six exactly the same water and nothing else. Round two needs two identical glasses and one jug of ordinary tap water. Both rounds end with the truth told kindly, and neither round is left as a joke on anybody.',
  needs: [
    'the six pots, relabelled A to F by a grown-up',
    'a hidden key sheet that only Gigi can see',
    'a ruler and a ranking sheet',
    'two identical clean glasses',
    'one jug of ordinary tap water',
    'two labels reading SPRING WATER and TAP WATER',
    'a notebook for what people say, in their own words'
  ],
  steps: [
    'Round one. You are the subject. Rank all six pots from greenest to palest and write your ranking down.',
    'Write one sentence saying which three you think were given the special food.',
    'Now measure the tallest leaf in every pot with the ruler and write those numbers down.',
    'Gigi reveals the key. All six pots got the same plain water and nothing else.',
    'Compare your ranking with your measurements and see whether they agree with each other.',
    'Write down how confident you had felt, and say out loud that you were not lying.',
    'Round two. You are the experimenter now. Gigi fills both glasses from the same jug.',
    'Label one glass SPRING WATER and the other TAP WATER while your volunteer watches.',
    'Ask your volunteer to taste both and say which one tastes fresher, and write their exact words down.',
    'Ask a second volunteer, and a third if you can get one, and write down every answer.',
    'Tell every volunteer the truth as soon as they have answered, and thank them properly.',
    'Write the rule at the bottom of your page: this is why we need the test, not why people are liars.'
  ],
  safety:
    'Only water is tasted in this lesson, and only Gigi pours it, into clean glasses from the tap. Nothing from a plant goes into a mouth. Never run this on somebody without telling them the truth straight afterwards, and never let anyone feel stupid for having been fooled, because it fools everybody.',
  grownUpAsks: [
    'Before I tell you anything. How sure are you about your top three?',
    'Your ranking and your ruler disagree in places. Which one do you trust?',
    'All six got the same water. So where did the difference you saw come from?',
    'Were you lying to me just now? Say what you were doing instead.',
    'Your volunteer said the spring water tasted fresher. Was she lying?',
    'What would you have to hide to make that taste test fair?',
    'What does blinded mean? Now tell me what double-blinded means.',
    'If somebody swears a plant helped them, what have they actually got?',
    'Does the placebo effect mean the person felt nothing? Careful with this one.',
    'How would you test a claim like that properly, if you were allowed to?',
    'Say the rule back to me. Why do we need the test?'
  ]
};

const M14L4_LEDGER = {
  sheet: 'M14L4-placebo-and-blinding-PRINTABLE.pdf',
  tasks: [
    'Write your ranking of the six pots, then your six ruler measurements beside it.',
    'Write what you believed before the reveal, and what you knew after it.',
    'Write down what each volunteer said about the two glasses, word for word.',
    'Finish the sentence at the bottom: we blind a test because ...'
  ],
  game: {
    title: 'Word Boss',
    cards: ['PLACEBO', 'BLINDED', 'DOUBLE-BLINDED', 'EXPECTATION', 'BIAS'],
    rounds: [
      'Say what each word means in your own words. No fancy talk.',
      'A grown-up says the meaning. You say the word. Beat the clock.',
      'A grown-up describes a test. You say what still needs hiding, and from whom.'
    ],
    ifSheIsStuck:
      'Read her own confident sentence about the special three back to her, in her own handwriting. PLACEBO stops being a word the moment she recognises herself in it.'
  },
  note: 'Nothing here is graded. Nothing is corrected. Petals are for doing it.'
};

/* =========================================================================
 * LESSON 83 · hb-m14-05 · Reading a label and reading a claim
 * ========================================================================= */

const M14L5_CHECK_IN = {
  title: 'Turn the packet over',
  text: 'The front of a packet is a picture and a promise, and somebody was paid to design it. The back is a list of facts that the law makes them print. Those two sides of the same box are not trying to do the same job at all.',
  question: 'Which side of the packet would you read first, and what would you look for there?'
};

const M14L5_BEATS = [
  {
    n: 1,
    label: 'Read what is actually printed',
    hook: 'On most food packets the ingredients are listed in order of how much is in there, so whatever is named first is the biggest part of it.',
    teachingText:
      'The back of a packet carries the checkable facts: what is in it, how much it weighs, where it was made and the dates. You already know this shape, because it is the five-line label you learned to write in the apothecary module.',
    example:
      'A seed packet tells you the plant, the year the seed was packed and how many days it usually takes to come up. Those are the lines you can actually test in your own containers.',
    applyIt: {
      prompt: 'Two boxes of the same size cost the same. One says 340 grams on the back and one says 500 grams. The lighter box has the nicer picture on the front. Which fact settles it?',
      choices: [
        'The picture, because it shows what is inside',
        'The net weight, because it is the amount you are actually getting',
        'Neither, because the boxes are the same size',
        'The colour of the box, because bright colours mean fresher food'
      ],
      answer: 1,
      feedback: [
        'The picture on the front is a drawing that somebody was paid to make.',
        null,
        'Same box, different amount inside. That is exactly why the weight is printed.',
        'Colour is a choice made by a designer, not a measurement of anything.'
      ],
      why: 'The printed numbers are the part of the packet that somebody can be held to.'
    }
  },
  {
    n: 2,
    label: 'Notice what the claim does not say',
    hook: 'Nine out of ten people preferred it. Out of how many people asked, and who was standing there asking them?',
    teachingText:
      'A claim is worth exactly what it leaves out. Words like helps, supports, up to, may and natural sound like promises while promising nothing you could ever check. Picking only the results that agree with you and burying the rest is called cherry-picking, and it is the commonest trick there is.',
    example:
      'A bag of plant food says feeds up to three months. Up to three months includes one week, and the packet never says three months of what, measured how, on which plant.',
    applyIt: {
      prompt: 'A packet says gardeners agree it grows bigger tomatoes. Which question does that sentence leave completely unanswered?',
      choices: [
        'Whether tomatoes are grown by gardeners at all',
        'Whether the packet is made of cardboard or plastic',
        'How many gardeners were asked, and bigger than what',
        'Whether tomatoes are a fruit or a vegetable'
      ],
      answer: 2,
      feedback: [
        'Gardeners obviously grow tomatoes. That part is not the trick.',
        'The packet material has nothing to do with the claim being made.',
        null,
        'That is a real question, and this packet was never trying to answer it.'
      ],
      why: 'Bigger than what, and compared against whom, are the two questions a soft claim never answers.'
    }
  }
];

const M14L5_ACTIVITY = {
  title: 'The label audit',
  prep: 'Gigi gathers five packages from around the house before you start, and none of them is a medicine bottle. A tea box, a spice jar, a cereal box, a seed packet and a bag of plant food or potting compost make an excellent set, because the last two make the boldest claims of all. Rule a table with five rows and four columns.',
  needs: [
    'five packages: food, tea, spice, a seed packet and a bag of plant food',
    'a table ruled into five rows and four columns',
    'a highlighter or a coloured pencil',
    'a pen that does not rub out',
    'two blank labels and a jar of her own dried herbs from the apothecary module',
    'a magnifier for the small print'
  ],
  steps: [
    'Head your four columns: WHAT IT IS, PRINTED FACTS, CLAIMS, WHAT IT DOES NOT SAY.',
    'Take the first package and fill the whole row before you pick up the next one.',
    'Under PRINTED FACTS write the weight, the ingredients and any date you can find.',
    'Read the ingredients out loud and say which one there is most of, and how you know.',
    'Under CLAIMS write every sentence on the front that sounds like a promise.',
    'Highlight the slippery words in each claim: helps, supports, up to, may, natural.',
    'Under WHAT IT DOES NOT SAY write the question the claim leaves unanswered.',
    'Do the same for all five packages, and use the magnifier on the smallest print.',
    'Rank the five from most checkable to least checkable, and defend your ranking.',
    'Now write two labels for your own jar of dried herbs from the apothecary module.',
    'The first label is honest: plant, part, when it was picked, how it was prepared, and the date.',
    'The second label says nothing at all while sounding wonderful. Then say which one a scientist would want.'
  ],
  safety:
    'Packages only, and no medicine bottles of any kind are used in this lesson. Nothing is opened, nothing is tasted, and nothing comes off a shelf without Gigi handing it to you.',
  grownUpAsks: [
    'Front of the packet or back of the packet. Which one did you read first, and why?',
    'Which ingredient is there most of? How does the list tell you that?',
    'Read me a claim off the front. Now tell me what it does not say.',
    'What does up to three months actually promise? What is the smallest it allows?',
    'Nine out of ten people preferred it. What is my next question?',
    'Which of your five packages is the most checkable, and what makes it so?',
    'What is cherry-picking? Give me an example from your own garden numbers.',
    'Your honest label and your lovely label. Which one would you trust from a stranger?',
    'A claim is not the same as a lie. Say what the difference is.',
    'What could a packet print that would let you actually test it?',
    'Say the rule out loud. A claim is worth what?'
  ]
};

const M14L5_LEDGER = {
  sheet: 'M14L5-label-audit-PRINTABLE.pdf',
  tasks: [
    'Fill in all five rows of your table, all four columns.',
    'Copy out the three slipperiest claim words you found, with the packet each came from.',
    'Write both of your labels for your own jar, the honest one and the lovely one.',
    'Write one question you would ask the company that made your least checkable packet.'
  ],
  game: {
    title: 'Word Boss',
    cards: ['CLAIM', 'INGREDIENT', 'NET WEIGHT', 'CHERRY-PICKING', 'UP TO'],
    rounds: [
      'Say what each word means in your own words. No fancy talk.',
      'A grown-up says the meaning. You say the word. Beat the clock.',
      'A grown-up reads a claim off a packet. You say what it leaves out.'
    ],
    ifSheIsStuck:
      'Put her honest label and her lovely label side by side and ask which one she could check with a ruler and a calendar. The difference between a fact and a claim is that one of them can be checked.'
  },
  note: 'Nothing here is graded. Nothing is corrected. Petals are for doing it.'
};

/* =========================================================================
 * LESSON 84 · hb-m14-06 · When the experts change their minds
 * ========================================================================= */

const M14L6_CHECK_IN = {
  title: 'Everybody knew it, and everybody was wrong',
  text: 'For most of the last century, doctors taught that stomach ulcers were caused by stress and spicy food. It was in the textbooks, it was taught in every medical school, and it was wrong. Two doctors in Australia found bacteria living in the stomach, and almost nobody believed them for years.',
  question: 'What would it take to change the mind of somebody who has believed something for thirty years?'
};

const M14L6_BEATS = [
  {
    n: 1,
    label: 'The stomach that everybody was wrong about',
    hook: 'In 1984 Barry Marshall swallowed a culture of the bacteria himself, because nobody would take the evidence seriously without it.',
    teachingText:
      'Robin Warren kept seeing curved bacteria in stomach samples, and in 1982 he and Barry Marshall grew them in the laboratory. Within days of swallowing them Marshall was ill, and a camera inside his stomach on day eight showed the inflammation. They were awarded the Nobel Prize in 2005.',
    example:
      'From Warren first noticing something odd under a microscope to the Nobel Prize took more than twenty years, because the evidence had to beat what everybody already knew.',
    applyIt: {
      prompt: 'Marshall had a story about his own stomach and Warren had samples from many patients. Which one changed medicine, and why?',
      choices: [
        'The self-experiment, because a doctor tested it on himself',
        'The patient samples, because many careful observations beat one story',
        'Neither, because the Nobel Prize is what settled it',
        'Both were useless until the textbooks were rewritten'
      ],
      answer: 1,
      feedback: [
        'The self-experiment got attention. It was still a sample size of one person.',
        null,
        'The prize came twenty years after the evidence. It recorded the change, it did not cause it.',
        'The textbooks were rewritten because of the evidence, not the other way round.'
      ],
      why: 'A dramatic story wins the argument for a week, but the many careful measurements are what win it for good.'
    }
  },
  {
    n: 2,
    label: 'Changing your mind is the strong move',
    hook: 'In 1847 Ignaz Semmelweis showed that doctors washing their hands cut deaths in his hospital ward from about eighteen in a hundred to about two, and his colleagues were insulted rather than convinced.',
    teachingText:
      'A scientist who changes position when the evidence changes is doing the hardest and best thing in the job. The way you protect yourself from stubbornness is to say out loud, before you look, exactly what result would make you drop your idea.',
    example:
      'You wrote in pen that night watering would grow taller corn. If the morning pots come out taller, the strong move is to write that down and say so.',
    applyIt: {
      prompt: 'Your data says your own prediction was wrong. Somebody suggests running it again until it comes out right. What is the honest thing to do?',
      choices: [
        'Run it again, because the first result must have been a mistake',
        'Throw the numbers out, since the prediction was written in pen',
        'Write the result down as it is, and say what it changed your mind about',
        'Keep both results but only show people the second one'
      ],
      answer: 2,
      feedback: [
        'Repeating a test is fine. Repeating it until it agrees with you is not.',
        'The pen is there so you cannot quietly edit yourself afterwards.',
        null,
        'Showing only the run that agrees with you is cherry-picking, from Lesson 83.'
      ],
      why: 'Saying what would change your mind, and then meaning it, is what makes the rest of the method work.'
    }
  }
];

const M14L6_ACTIVITY = {
  title: 'The change-your-mind card, and a timeline of twenty-six years',
  prep: 'Bring out every sheet from this module: the leaf measurements from Lesson 79, the night-watering plan from Lesson 80, the mulch table from Lesson 81 and the placebo page from Lesson 82. Cut a long strip of paper for the timeline, and have a pen that does not rub out. Gigi should think beforehand of one thing she genuinely changed her mind about, because she will be asked.',
  needs: [
    'every sheet from Lessons 79 to 83',
    'a long strip of paper for the timeline',
    'four index cards',
    'a pen that does not rub out',
    'a ruler',
    'the Plant Detective Log'
  ],
  steps: [
    'Lay all four of your data sheets out where you can see them at once.',
    'Read your own predictions back, in your own handwriting, and read them out loud.',
    'Mark each prediction HELD, CHANGED or NOT YET, and date each mark.',
    'Take an index card for each of your three garden claims and write the claim at the top.',
    'On each card, write the exact result that would make you drop that claim.',
    'Be specific with numbers. If the two averages come within one centimetre, say so on the card.',
    'Sign and date every card, then clip it to the sheet it belongs with.',
    'Now rule the timeline strip and mark 1979, 1982, 1984 and 2005 along it.',
    'Write what happened at each mark, and measure the gap between the first and the last.',
    'Write one sentence about why twenty-six years is not a sign that science is broken.',
    'Interview Gigi. Ask her one thing about plants or cooking that she used to believe and no longer does.',
    'Write her answer down in her words, and ask her what changed her mind, and write that too.'
  ],
  safety:
    'This lesson has a safety rule of its own, and it is important. Barry Marshall swallowing bacteria in 1984 is history, not an example. Nobody tests anything on their own body, on another person, or on any animal, ever, and a scientist today would not be allowed to do what he did. We test how plants grow.',
  grownUpAsks: [
    'What did doctors believe caused ulcers before 1982, and who taught them that?',
    'Warren saw something odd for years before anyone listened. Why is that so hard?',
    'Marshall tested it on himself. Name two reasons that was a bad way to do it.',
    'Why did it take until 2005 for the prize? Was that too slow, or about right?',
    'Semmelweis showed the numbers and the doctors were offended. What was really being challenged?',
    'Read me one prediction you got wrong. How did it feel to mark it CHANGED?',
    'What have you written on this card that would make you drop the claim?',
    'Somebody says a scientist changing their mind means science cannot be trusted. Answer them.',
    'What is the difference between changing your mind and just giving up?',
    'What is one thing you believe about your garden that you have never actually tested?',
    'Last one, and it is the whole module. How do you find out whether something is true?'
  ]
};

const M14L6_LEDGER = {
  sheet: 'M14L6-change-your-mind-PRINTABLE.pdf',
  tasks: [
    'Mark each of your predictions HELD, CHANGED or NOT YET, with a date.',
    'Write out your three change-your-mind cards, with real numbers on them.',
    'Draw your timeline with all four years marked and the gap measured.',
    'Write down what Gigi changed her mind about, and what changed it.'
  ],
  game: {
    title: 'Word Boss',
    cards: ['REVISE', 'CONSENSUS', 'BACTERIUM', 'EVIDENCE', 'SELF-EXPERIMENT'],
    rounds: [
      'Say what each word means in your own words. No fancy talk.',
      'A grown-up says the meaning. You say the word. Beat the clock.',
      'A grown-up names a belief. You say what evidence would change it.'
    ],
    ifSheIsStuck:
      'Hand her the prediction she wrote in pen in Lesson 80 and ask her what she would need to see to give it up. REVISE is abstract until it is her own handwriting she is arguing with.'
  },
  note: 'Nothing here is graded. Nothing is corrected. Petals are for doing it.'
};

/* =========================================================================
 * THE EXPORTS
 * ========================================================================= */

export const HERBALISM_M14 = [
  {
    id: 'hb-m14-01',
    course: 'herbalism',
    module: 14,
    quarter: 4,
    week: 3,
    day: 1,
    n: 79,
    title: 'What makes something evidence',
    minutes: 45,
    spec: '§10 · beats',

    concept:
      'Evidence is a record of many careful observations that somebody else could check, so one plant seen once is a story rather than an answer.',

    standards: [],

    words: ['evidence', 'anecdote', 'sample size', 'average', 'variation'],

    glossary: [
      { word: 'evidence', plain: 'Careful observations, written down, that another person could check.' },
      { word: 'anecdote', plain: 'One thing that happened once, remembered by one person.' },
      { word: 'sample size', plain: 'How many things you actually measured. Bigger is harder to fool.' },
      { word: 'average', plain: 'Add all your numbers up and divide by how many there were.' },
      { word: 'variation', plain: 'The way living things differ from each other for no reason you asked about.' },
      { word: 'observation', plain: 'Something you noticed and wrote down at the moment you noticed it.' },
      { word: 'data', plain: 'The numbers and notes a test gives you, before anybody argues about them.' }
    ],

    video: {
      id: '3X9lnUAjlGM',
      url: 'https://www.youtube.com/watch?v=3X9lnUAjlGM',
      title: 'Try Trials: Crash Course Kids #39.2',
      channel: 'Crash Course Kids',
      minutes: 3,
      verified: '2026-08-15 · re-checked at youtube.com/oembed',
      teaches: [
        'that one run of a test is not enough to trust',
        'why a scientist repeats the same test many times',
        'what those repeated runs are called, and how they are recorded',
        'how repeated results are put together into one answer'
      ],
      sourceGap:
        'OPEN. No Black American educator found teaching evidence and sample size at this level. Searched: "Black American science educator youtube channel kids scientific method evidence claim testing elementary", which returned four listicles of elementary science channels and two teacher blog round-ups, every channel already known and none Black-led; and "Dr. Raven the Science Maven youtube video title how do we know OR science watch?v=", which surfaced her real channel (@RaventheScienceMaven) plus sHNopBbQVFA "Science is Everywhere! with Dr. Raven the Science Maven and Ada Twist" (Netflix Jr.). That id was VERIFIED at noembed and then rejected: Ada Twist is pitched at four to seven year olds and this is the hardest quarter of the course. Her own channel could not be read for individual video ids because youtube.com is disallowed to the fetcher, so nothing unverified was used. One verified video from that channel would close this lesson outright.'
    },

    checkIn: M14L1_CHECK_IN,
    beats: M14L1_BEATS,
    activity: M14L1_ACTIVITY,
    ledger: M14L1_LEDGER,

    hook: M14L1_CHECK_IN,
    core: M14L1_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing:
      'Take one claim about her own garden that Gigi genuinely does not know the answer to, and answer it twice. First measure one leaf from each side of the garlic container, and notice how easily a chosen pair could have proved either answer. Then tag ten leaves on each side without choosing them, measure all twenty from base to tip, and average each column. Compare the two averages, circle the longest and shortest leaves to see how much plants vary on their own, and write the sample size under the answer.',

    practice: [
      {
        ask: 'What is the difference between an anecdote and evidence?',
        answer: 'An anecdote is one thing somebody remembers. Evidence is many observations written down.',
        why: 'A record that another person can check is the part an anecdote is missing.'
      },
      {
        ask: 'Why measure ten leaves on each side instead of one?',
        answer: 'Because plants vary, so one leaf can be lucky and ten cannot be lucky in the same way.',
        why: 'A larger sample size makes it much harder for chance to hand you a wrong answer.'
      }
    ],

    check: [
      {
        prompt: 'Gigi says the garlic did better the year she used the blue bucket. What is that?',
        choices: ['Evidence', 'An anecdote', 'A control group', 'An average'],
        answer: 1,
        feedback: [
          'Evidence needs observations written down at the time. There are none.',
          null,
          'A control group is a group you leave alone on purpose. There was not one.',
          'An average needs several numbers, and nobody wrote down even one.'
        ]
      },
      {
        prompt: 'You measured twenty leaves. What is the number twenty called?',
        choices: ['The average', 'The variation', 'The sample size', 'The evidence'],
        answer: 2,
        feedback: [
          'The average is what you get after adding up and dividing.',
          'Variation is how much the leaves differ from each other.',
          null,
          'The evidence is the whole record, not the count of leaves in it.'
        ]
      },
      {
        prompt: 'Two of thirteen corn plants disagree with all the others. What should you do?',
        choices: [
          'Leave those two out of your numbers',
          'Start the entire test again from scratch',
          'Keep them in, because variation is normal',
          'Decide that corn cannot be measured'
        ],
        answer: 2,
        feedback: [
          'Dropping the ones that disagree is cherry-picking, and it makes the answer worthless.',
          'Nothing has gone wrong. Odd ones are what a big sample is for.',
          null,
          'Corn measures perfectly well. It just varies, like everything alive.'
        ]
      }
    ]
  },

  {
    id: 'hb-m14-02',
    course: 'herbalism',
    module: 14,
    quarter: 4,
    week: 3,
    day: 2,
    n: 80,
    title: 'The fair test',
    minutes: 45,
    spec: '§10 · beats',

    concept:
      'A fair test changes one thing deliberately and holds everything else still, because something happening after something else is not proof that it happened because of it.',

    standards: [],

    words: ['variable', 'fair test', 'coincidence', 'cause', 'prediction'],

    glossary: [
      { word: 'variable', plain: 'The one thing you change on purpose in a test.' },
      { word: 'fair test', plain: 'A test where one thing changes and everything else is held still.' },
      { word: 'coincidence', plain: 'Two things happening near each other for no connected reason.' },
      { word: 'cause', plain: 'The thing that actually made the other thing happen.' },
      { word: 'prediction', plain: 'What you say will happen, written down before you look.' },
      { word: 'condition', plain: 'Anything about the setup: the light, the soil, the water, the hour.' },
      { word: 'group', plain: 'A set of pots or plants that are all treated the same way.' }
    ],

    video: {
      id: 'BXFU86GNmrg',
      url: 'https://www.youtube.com/watch?v=BXFU86GNmrg',
      title: 'Bowled Over - Isolating Variables: Crash Course Kids #39.1',
      channel: 'Crash Course Kids',
      minutes: 5,
      verified: '2026-08-15 · re-checked at youtube.com/oembed',
      teaches: [
        'what a variable is in an experiment',
        'why only one variable can change at a time',
        'how everything else in the setup has to be held the same',
        'what happens to your answer when two things change at once'
      ],
      sourceGap:
        'OPEN. No Black American educator found for experimental design at this level. Searched: "Crash Course Kids fair test variables controlled experiment youtube video", which returned Crash Course Kids, Crash Course Statistics and two unattributed classroom uploads, none Black-led; and "Black American science educator youtube channel kids scientific method evidence claim testing elementary", which returned only listicles of already-known channels. This is the same gap Module 8 Lesson 48 recorded when it used qAJ8IF4HI20 for the same subject, and it has not moved. The companion video 3X9lnUAjlGM "Try Trials: Crash Course Kids #39.2" is used in Lesson 79, so the pair runs in the order the series intended.'
    },

    checkIn: M14L2_CHECK_IN,
    beats: M14L2_BEATS,
    activity: M14L2_ACTIVITY,
    ledger: M14L2_LEDGER,

    hook: M14L2_CHECK_IN,
    core: M14L2_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing:
      'Design and set up a real test of a real claim: does watering at night grow better plants than watering in the morning. Six matching containers, soil mixed in one bucket first, the same seed from the same packet at the same depth, and the same millilitres from the same jug. Three pots are watered at night by Gigi and three in the morning, and everything else on the planning sheet is listed as held still. She writes her prediction in pen and, underneath it, the exact result that would prove her wrong, both dated before a single seed goes in.',

    practice: [
      {
        ask: 'Why does only one thing get changed in a fair test?',
        answer: 'Because if two things change, a difference at the end could belong to either of them.',
        why: 'The whole point is to know which change did the work.'
      },
      {
        ask: 'Your plant perked up after you watered at night. Why is that not proof?',
        answer: 'Because the temperature dropped, the sun went down and the wind fell at the same time.',
        why: 'Something always comes just before, so after is not the same as because.'
      }
    ],

    check: [
      {
        prompt: 'You test night watering, but you also move one pot into brighter light. What now?',
        choices: [
          'The test is better, because more is happening',
          'Two things changed, so no result can be trusted',
          'Nothing has changed about the test at all',
          'The light will cancel the watering out'
        ],
        answer: 1,
        feedback: [
          'More changes is blurrier, not better.',
          null,
          'Light is a condition, and you just made it different between the groups.',
          'Cancelling out is not a thing conditions do. They pile up.'
        ]
      },
      {
        prompt: 'What is the one thing you change on purpose called?',
        choices: ['The condition', 'The prediction', 'The variable', 'The coincidence'],
        answer: 2,
        feedback: [
          'Conditions are everything about the setup, including the ones held still.',
          'A prediction is what you think will happen, written before you look.',
          null,
          'A coincidence is two things happening near each other for no reason.'
        ]
      },
      {
        prompt: 'Turmeric sprouts between day ten and day twenty. Yours sprouted on day twelve, after singing to it daily. What can you say?',
        choices: [
          'Singing made it sprout eight days early',
          'Nothing about the singing, because that is when it sprouts anyway',
          'Singing has now been proved useless',
          'The turmeric was listening the whole time'
        ],
        answer: 1,
        feedback: [
          'Day twelve is an ordinary day for turmeric to come up, with or without singing.',
          null,
          'You have not shown that either. You have shown you cannot tell yet.',
          'Nothing here tests that, and nothing here supports it.'
        ]
      }
    ]
  },

  {
    id: 'hb-m14-03',
    course: 'herbalism',
    module: 14,
    quarter: 4,
    week: 3,
    day: 3,
    n: 81,
    title: 'Why we need a control group',
    minutes: 45,
    spec: '§10 · beats',

    concept:
      'A control group is the group you deliberately leave alone, and without one you cannot tell your own result apart from everything that was changing anyway.',

    standards: [],

    words: ['control group', 'treatment group', 'comparison', 'baseline', 'null result'],

    glossary: [
      { word: 'control group', plain: 'The group you deliberately leave alone, so you have something to compare with.' },
      { word: 'treatment group', plain: 'The group that gets the thing you are testing.' },
      { word: 'comparison', plain: 'Holding two results side by side to see what is different.' },
      { word: 'baseline', plain: 'The measurement you take at the start, before anything is changed.' },
      { word: 'null result', plain: 'Finding no difference. It is a real answer, not a failure.' },
      { word: 'randomise', plain: 'To let chance decide, like a coin flip, so nobody can choose the easy ones.' },
      { word: 'conclusion', plain: 'What your numbers let you say at the end, and no more than that.' }
    ],

    video: {
      id: 'GUpd2HJHUt8',
      url: 'https://www.youtube.com/watch?v=GUpd2HJHUt8',
      title: 'Not all scientific studies are created equal - David H. Schwartz',
      channel: 'TED-Ed',
      minutes: 4,
      verified: '2026-08-15 · re-checked at youtube.com/oembed',
      teaches: [
        'that studies differ enormously in how much they can actually show',
        'what a control group is and why a study without one proves little',
        'why groups are assigned by chance rather than chosen',
        'that one study on its own is not the end of a question'
      ],
      sourceGap:
        'OPEN. No Black American educator found teaching study design at this level. Searched: "youtube video for kids control group experiment explained why scientists use a control group", which returned Study.com behind a login, two blog explainers and two unattributed classroom uploads with no identifiable educator; and "Black doctor scientist youtube video for children explains how a medicine is tested clinical trial placebo control group", which returned hospital, charity and pharmaceutical-company pages rather than any educator channel. HONEST NOTE ON THE VIDEO ITSELF: this is a TED-Ed title aimed higher than nine, and it was picked for Quarter 4 on purpose, but its content could not be read because youtube.com is disallowed to the fetcher and only the noembed title and channel were verifiable. Gigi should watch it first, which is the standing rule, and should expect it to mention medical trials in general terms.'
    },

    checkIn: M14L3_CHECK_IN,
    beats: M14L3_BEATS,
    activity: M14L3_ACTIVITY,
    ledger: M14L3_LEDGER,

    hook: M14L3_CHECK_IN,
    core: M14L3_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing:
      'Test whether mulch really keeps a pot damper, using a scale as the instrument. Six matching pots, and a coin flip decides which three get mulched so that nobody chooses the healthy ones. Water all six with the same millilitres, weigh every pot straight afterwards, then weigh all six at the same time every day for a week. The mass that goes missing is the water that left, which is the measurement from the apothecary module used again. Average the three mulched losses and the three bare losses, compare them, and write down what the control group made it possible to say.',

    practice: [
      {
        ask: 'What is a control group, and what is it for?',
        answer: 'It is the group you leave alone, so you have something honest to compare against.',
        why: 'Without it you cannot tell your change apart from everything else that was happening.'
      },
      {
        ask: 'Both groups grew the same amount. What is the conclusion?',
        answer: 'That the thing you changed is not what made them grow.',
        why: 'When both groups move together, the difference between them is what stayed at zero.'
      }
    ],

    check: [
      {
        prompt: 'Your mulched pots grew four centimetres. You have nothing else to compare them with. What can you say about mulch?',
        choices: [
          'That mulch grows four centimetres a fortnight',
          'That mulch works a little',
          'Nothing, because you do not know what bare pots did',
          'That mulch works better in June than in March'
        ],
        answer: 2,
        feedback: [
          'The garlic grew. Nothing has shown that the mulch is the reason.',
          'Working a little is still a claim with no comparison behind it.',
          null,
          'Nothing in this test looked at March at all.'
        ]
      },
      {
        prompt: 'Why did Gigi flip a coin to decide which pots got mulch?',
        choices: [
          'So the mulch is spread more evenly',
          'So nobody can choose the healthiest pots for the treatment',
          'Because coins are quicker than thinking',
          'Because three is an unlucky number otherwise'
        ],
        answer: 1,
        feedback: [
          'A coin has nothing to do with how the mulch is spread.',
          null,
          'It is not about speed. It is about who gets to choose.',
          'Luck has nothing to do with it. Choosing does.'
        ]
      },
      {
        prompt: 'Both the mulched and the bare pots lost the same mass all week. What is that called?',
        choices: ['A failed test', 'A null result', 'A baseline', 'A coincidence'],
        answer: 1,
        feedback: [
          'Nothing failed. The test answered the question you asked it.',
          null,
          'A baseline is the measurement you take at the very start.',
          'A coincidence is two things happening near each other for no reason.'
        ]
      }
    ]
  },

  {
    id: 'hb-m14-04',
    course: 'herbalism',
    module: 14,
    quarter: 4,
    week: 4,
    day: 1,
    n: 82,
    title: 'The placebo, and why it fools people',
    minutes: 45,
    spec: '§10 · beats',

    concept:
      'Expecting something to help genuinely changes what a person notices and reports, which is why a serious test hides who got what from everybody involved.',

    standards: [],

    words: ['placebo', 'blinded', 'double-blinded', 'expectation', 'bias'],

    glossary: [
      { word: 'placebo', plain: 'Something with nothing active in it, given as though it were the real thing.' },
      { word: 'blinded', plain: 'A test where the person being tested does not know which group they are in.' },
      { word: 'double-blinded', plain: 'A test where the person measuring does not know either.' },
      { word: 'expectation', plain: 'What you are already expecting to happen before anything happens.' },
      { word: 'bias', plain: 'A lean in one direction that you did not choose and cannot feel.' },
      { word: 'subject', plain: 'The person or plant being tested in a study.' },
      { word: 'reveal', plain: 'The moment at the end when everybody is told which group was which.' }
    ],

    video: {
      id: 'z03FQGlGgo0',
      url: 'https://www.youtube.com/watch?v=z03FQGlGgo0',
      title: 'The power of the placebo effect - Emma Bryce',
      channel: 'TED-Ed',
      minutes: 5,
      verified: '2026-08-15 · re-checked at youtube.com/oembed',
      teaches: [
        'what a placebo is and what happens when people are given one',
        'that the effect is real and measurable rather than imaginary',
        'why trials compare a real treatment against a placebo',
        'why the effect makes an untested claim so convincing to sincere people'
      ],
      sourceGap:
        'OPEN. No Black American educator found teaching the placebo effect at this level. Searched: "Black physician youtube channel explains placebo effect to students educator African American doctor science communicator", which returned a ScienceDirect paper, a PNAS podcast, the Wikipedia page for Ted Kaptchuk and three unattributed explainer uploads; and "TED-Ed placebo effect video youtube power of the placebo effect Emma Bryce", which found this video. GIGI SHOULD PREVIEW THIS ONE PARTICULARLY. It is a medical-trials video and it will mention pills and treatments in general terms, which is the subject of the lesson. The lesson itself contains no dosing, names no remedy and tells her nothing is for anything, and the activity uses only pots of her own plants and two glasses of tap water.'
    },

    checkIn: M14L4_CHECK_IN,
    beats: M14L4_BEATS,
    activity: M14L4_ACTIVITY,
    ledger: M14L4_LEDGER,

    hook: M14L4_CHECK_IN,
    core: M14L4_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing:
      'Two rounds, and she is on both sides of the glass. In round one Gigi has already coded the six pots A to F and told her that three of them were given a special plant food, which is not true. She ranks them by eye, writes down which three she believes were treated, then measures every pot with a ruler and compares her ranking with her own numbers before Gigi reveals that all six got plain water. In round two she becomes the experimenter, pours two glasses from one jug of tap water, labels one SPRING WATER, and writes down what each volunteer says. Every volunteer is told the truth immediately, and the page ends with the rule written out: this is why we need the test, not why people are liars.',

    practice: [
      {
        ask: 'Somebody says a plant helped them and they mean it. Are they lying?',
        answer: 'No. Expecting help genuinely changes what a person notices and remembers.',
        why: 'That is exactly why a claim needs a test, and why a sincere report is not evidence.'
      },
      {
        ask: 'What is a double-blinded test?',
        answer: 'One where neither the person being tested nor the person measuring knows which group is which.',
        why: 'It protects the result from the hopes of everybody in the room.'
      }
    ],

    check: [
      {
        prompt: 'Gigi says three pots got special plant food, and you rank those three greenest. All six had plain water. What happened?',
        choices: [
          'The plain water worked on three pots only',
          'Knowing which pots were special changed how you looked at them',
          'You were making it up to please Gigi',
          'Your ruler was giving wrong readings all along'
        ],
        answer: 1,
        feedback: [
          'All six got the same water, so the water cannot explain a difference.',
          null,
          'You were not making anything up, and that is the whole point of the lesson.',
          'The ruler was fine. It was what you expected that leaned on the answer.'
        ]
      },
      {
        prompt: 'What is a placebo?',
        choices: [
          'A test with a control group in it',
          'Something with nothing active in it, given as though it were real',
          'A claim printed on a packet',
          'The group that gets the real treatment'
        ],
        answer: 1,
        feedback: [
          'That is a controlled test, which is a different idea from Lesson 81.',
          null,
          'A claim is words on a package. A placebo is a thing handed over.',
          'That is the treatment group. The placebo goes to the other one.'
        ]
      },
      {
        prompt: 'You believe mulch works, and you are the one reading the ruler. Why hide the labels from you?',
        choices: [
          'Because measuring twice is always better',
          'Because rulers read differently in different hands',
          'Because hoping can nudge a close reading without you feeling it',
          'Because the plants can tell which pot they are in'
        ],
        answer: 2,
        feedback: [
          'Measuring twice is good practice, but it is not what blinding is for.',
          'The ruler is the same. The eye above it is the part that needs protecting.',
          null,
          'The plants know nothing about labels. The person reading them does.'
        ]
      }
    ]
  },

  {
    id: 'hb-m14-05',
    course: 'herbalism',
    module: 14,
    quarter: 4,
    week: 4,
    day: 2,
    n: 83,
    title: 'Reading a label and reading a claim',
    minutes: 45,
    spec: '§10 · beats',

    concept:
      'The back of a package carries facts somebody can be held to, while the front carries claims, and a claim is worth exactly what it leaves out.',

    standards: [],

    words: ['claim', 'ingredient', 'net weight', 'cherry-picking', 'weasel word'],

    glossary: [
      { word: 'claim', plain: 'Something somebody says is true, printed where you will see it first.' },
      { word: 'ingredient', plain: 'One of the things a product is made of. They are listed by amount.' },
      { word: 'net weight', plain: 'How much is actually inside, not counting the packet.' },
      { word: 'cherry-picking', plain: 'Showing only the results that agree with you and hiding the rest.' },
      { word: 'weasel word', plain: 'A word like helps or up to that sounds like a promise but promises nothing.' },
      { word: 'small print', plain: 'The part printed smallest, which is often the part that matters.' },
      { word: 'checkable', plain: 'Written so that somebody else could actually go and test it.' }
    ],

    video: {
      id: 'w1CeRpfByG8',
      url: 'https://www.youtube.com/watch?v=w1CeRpfByG8',
      title: 'Can you spot the problem with these headlines? (Level 1) - Jeff Leek & Lucy McGowan',
      channel: 'TED-Ed',
      minutes: 5,
      verified: '2026-08-15 · re-checked at youtube.com/oembed',
      teaches: [
        'that a headline and the study behind it often say different things',
        'how to ask what a claim is actually based on',
        'why the number of people studied matters to the claim',
        'what questions to ask before believing a printed claim'
      ],
      sourceGap:
        'OPEN. No Black American educator found for reading claims and labels at this level. Searched: "TED-Ed Can you spot the problem with these headlines Sanden Totten youtube", which found this video under different authors, Jeff Leek and Lucy McGowan, and the title and channel here are recorded exactly as noembed returned them rather than as the search claimed; "youtube video how to read a food label claims marketing words natural what labels do not tell you kids", which returned blog articles and one unattributed marketing upload; and "Black American educator youtube video reading nutrition label food package claims students consumer science", which returned teacher-marketplace worksheets and FDA pages, with no educator channel of any kind. STATED PLAINLY: this video covers the claim half of the lesson and not the label half. The packet reading is carried by the activity, which uses five real packages off the kitchen shelves, and by the callback to the five-line label from Module 11.'
    },

    checkIn: M14L5_CHECK_IN,
    beats: M14L5_BEATS,
    activity: M14L5_ACTIVITY,
    ledger: M14L5_LEDGER,

    hook: M14L5_CHECK_IN,
    core: M14L5_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing:
      'Audit five real packages from around the house, and none of them a medicine bottle: a tea box, a spice jar, a cereal box, a seed packet and a bag of plant food. Fill a four-column table for each one — what it is, the printed facts, the claims, and what the claim does not say. Highlight the slippery words wherever they appear, work out which ingredient there is most of, and use the magnifier on the small print. Rank the five from most checkable to least. Then write two labels for her own jar of dried herbs: one honest five-line label, and one that sounds wonderful while saying nothing at all.',

    practice: [
      {
        ask: 'A bag says feeds up to three months. What does up to actually promise?',
        answer: 'Almost nothing, because up to three months includes one week.',
        why: 'Up to sets a ceiling and never sets a floor, which is why it is used.'
      },
      {
        ask: 'What is cherry-picking?',
        answer: 'Showing only the results that agree with you and quietly leaving out the rest.',
        why: 'It can make a useless thing look excellent without a single false sentence.'
      }
    ],

    check: [
      {
        prompt: 'Two same-sized boxes cost the same. One says 340 grams and the other 500 grams. Which fact decides it?',
        choices: [
          'The picture on the front',
          'The net weight printed on the back',
          'The colour of the packaging',
          'Which one is on the higher shelf'
        ],
        answer: 1,
        feedback: [
          'The picture was drawn by somebody who was paid to make it appealing.',
          null,
          'Colour is a design choice, not a measurement of anything.',
          'Shelf position is a shop decision and tells you nothing about the contents.'
        ]
      },
      {
        prompt: 'A packet says gardeners agree it grows bigger tomatoes. What is left unanswered?',
        choices: [
          'Whether gardeners grow tomatoes at all',
          'How many gardeners were asked, and bigger than what',
          'Whether the packet is recyclable',
          'Whether tomatoes need water'
        ],
        answer: 1,
        feedback: [
          'Gardeners do grow tomatoes. That part is not the trick.',
          null,
          'Recycling matters, but it is not what this claim was about.',
          'That is a real question, and this claim was never about it.'
        ]
      },
      {
        prompt: 'Where on a food packet are the ingredients listed in order of how much there is?',
        choices: [
          'On the front, under the picture',
          'On the back, in the ingredients list',
          'Nowhere, because that order is random',
          'Only on packets that make no claims'
        ],
        answer: 1,
        feedback: [
          'The front is the picture and the promise. The facts are on the other side.',
          null,
          'The order is not random. The biggest part is named first.',
          'The list is printed whether the front makes claims or not.'
        ]
      }
    ]
  },

  {
    id: 'hb-m14-06',
    course: 'herbalism',
    module: 14,
    quarter: 4,
    week: 4,
    day: 3,
    n: 84,
    title: 'When the experts change their minds',
    minutes: 45,
    spec: '§10 · beats',

    concept:
      'Changing your position when the evidence changes is the strongest thing a scientist does, and the story of stomach ulcers is what that looks like from the outside.',

    standards: [],

    words: ['revise', 'consensus', 'bacterium', 'self-experiment', 'evidence'],

    glossary: [
      { word: 'revise', plain: 'To change what you think because something you learned made you.' },
      { word: 'consensus', plain: 'What almost everybody who studies a thing currently believes about it.' },
      { word: 'bacterium', plain: 'One single living thing far too small to see without a microscope.' },
      { word: 'bacteria', plain: 'More than one bacterium.' },
      { word: 'self-experiment', plain: 'Testing something on your own body. Scientists today are not allowed to.' },
      { word: 'ulcer', plain: 'A sore place on the lining of the stomach.' },
      { word: 'Nobel Prize', plain: 'A prize given each year for work that changed a whole field.' }
    ],

    video: {
      id: 'HP6Zf1ff7Sw',
      url: 'https://www.youtube.com/watch?v=HP6Zf1ff7Sw',
      title: 'The Man Who Tried to Give Himself An Ulcer... For Science',
      channel: 'SciShow',
      minutes: 4,
      verified: '2026-08-15 · re-checked at youtube.com/oembed',
      teaches: [
        'what doctors believed caused stomach ulcers before the 1980s',
        'what Robin Warren and Barry Marshall found instead',
        'what Marshall did to himself in 1984 and what happened to him',
        'how long it took the rest of medicine to accept the evidence'
      ],
      sourceGap:
        'OPEN. No Black American educator found for this story or for the history of medicine at this level. Searched: "youtube SciShow Barry Marshall drank bacteria ulcers Helicobacter pylori video", which found this video plus Nobel Prize podcast pages and two adult conference talks by Marshall himself; "Black American scientist youtube changed their minds OR changing your mind evidence science self-correcting educator", which returned magazine articles and radio archives and no video source at all; and "Black American history of medicine educator youtube video how doctors were wrong and changed their minds evidence students", which surfaced two Black-history-in-medicine compilation uploads with no identifiable educator and no bearing on how evidence changes a consensus. FACTS CHECKED BEFORE WRITING: Warren and Marshall met in 1981 and cultured Helicobacter pylori in 1982; Marshall swallowed a culture in 1984 and an endoscopy on day eight showed gastritis; the two were awarded the Nobel Prize in Physiology or Medicine in 2005 for the discovery of the bacterium and its role in gastritis and peptic ulcer disease. The Semmelweis figures in beat 2 were checked as well: Vienna General Hospital, 1847, chlorinated lime handwashing, mortality in that clinic falling from about eighteen percent to about two percent, and his colleagues rejecting it.'
    },

    checkIn: M14L6_CHECK_IN,
    beats: M14L6_BEATS,
    activity: M14L6_ACTIVITY,
    ledger: M14L6_LEDGER,

    hook: M14L6_CHECK_IN,
    core: M14L6_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing:
      'Bring every sheet from this module back onto the table and audit her own mind with them. She reads her own predictions in her own handwriting, marks each one HELD, CHANGED or NOT YET, and dates the mark. Then she writes a change-your-mind card for each of her three garden claims, with a specific number on it: the exact result that would make her drop the claim. She rules a timeline marked 1979, 1982, 1984 and 2005, measures the twenty-six years across it, and writes why that gap is not a sign that science is broken. It ends with an interview: she asks Gigi one thing she used to believe about plants or cooking, and what changed her mind.',

    practice: [
      {
        ask: 'What did doctors believe caused stomach ulcers before the 1980s?',
        answer: 'Stress and spicy food. It was in the textbooks and it was wrong.',
        why: 'Everybody agreeing is not the same as everybody having checked.'
      },
      {
        ask: 'Why is changing your mind a strong thing for a scientist to do?',
        answer: 'Because following the evidence matters more than being right in front of people.',
        why: 'The method only works if the answer is allowed to beat the person who guessed.'
      }
    ],

    check: [
      {
        prompt: 'Warren and Marshall showed that bacteria were involved in stomach ulcers. When were they awarded the Nobel Prize?',
        choices: ['1982', '1984', '2005', '1979'],
        answer: 2,
        feedback: [
          'That is the year they first grew the bacteria in the laboratory.',
          'That is the year Marshall swallowed a culture of them himself.',
          null,
          'That is around when Warren first kept seeing them under the microscope.'
        ]
      },
      {
        prompt: 'Marshall tested it on himself. Why is a self-experiment weak evidence even when it works?',
        choices: [
          'Because he already believed the answer',
          'Because the sample size is one person',
          'Because he was not a real doctor',
          'Because it happened a long time ago'
        ],
        answer: 1,
        feedback: [
          'He did believe it, and that matters, but it is not the main weakness here.',
          null,
          'He was a doctor. That is not what is wrong with a sample of one.',
          'Age does not weaken evidence. Being a single person does.'
        ]
      },
      {
        prompt: 'Your own data says your prediction was wrong. What is the strong move?',
        choices: [
          'Run the test again until it agrees with you',
          'Show only the run that came out best',
          'Write the result down and say what it changed',
          'Leave the prediction out of the log'
        ],
        answer: 2,
        feedback: [
          'Repeating until it agrees is how people fool themselves on purpose.',
          'Showing only your best run is cherry-picking, straight out of Lesson 83.',
          null,
          'The prediction is the part that makes the result mean anything.'
        ]
      }
    ]
  }
];

export const HERBALISM_M14_META = {
  courseId: 'herbalism',
  module: 14,
  title: 'How a Claim Gets Tested',
  blurb:
    'The module that arms a future doctor. What separates evidence from a story, how many measurements is enough, the fair test and why after is not because, the control group you leave alone on purpose, the placebo effect and why sincere people report a result that was never there, what a claim on a packet leaves out, and why changing your mind when the evidence changes is the strongest thing a scientist ever does.'
};

export function m14LessonById(id) {
  return HERBALISM_M14.find((l) => l.id === id) || null;
}

export default HERBALISM_M14;
