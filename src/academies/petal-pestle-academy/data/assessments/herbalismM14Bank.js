// ---------------------------------------------------------------------------
// HERBALISM & BOTANY — MODULE 14 QUESTION BANK
// How a Claim Gets Tested · Lessons 79–84 · Quarter 4, Weeks 3 and 4
//
// Ten questions per lesson, sixty in all. These are NOT asked at the end of a
// lesson. They are the pool the Day 4 weekly test draws from: three lessons at
// ten questions is a thirty-question pool, and buildWeeklyTest takes eight.
// They also feed the morning warm-up and the extra practice the practice gate
// serves when she misses more than one on a lesson check.
//
//   Week 3 pool — hb-m14-01, hb-m14-02, hb-m14-03  (30 questions)
//   Week 4 pool — hb-m14-04, hb-m14-05, hb-m14-06  (30 questions)
//
// Field shape matches src/data/assessments/herbalismM13Bank.js exactly: id,
// lesson, prompt, choices (four, all different), answer (0-3), feedback (four
// entries, null in the correct slot, a real sentence in every other), and why
// (never blank — it is what the review screen shows).
//
// ---- WHAT THIS BANK IS TESTING ----
//
// Not plants. Module 14 is the one module in the course whose subject is how
// you find out whether anything is true, so every question here is a question
// about method: is this evidence or a story, how many did you measure, what
// else changed, what are you comparing against, who knew which pot was which,
// what does the claim leave out, and what would make you drop your own idea.
// The worked material is her own garden — the garlic, turmeric, ginger and corn
// in containers in Georgia — because a claim she can go outside and settle is
// worth more than a claim she can only agree with.
//
// ---- DISTRACTORS ----
//
// Where the payload is vocabulary, the wrong choices are the OTHER words from
// that same lesson. A miss on "what is a control group" that lands on BASELINE
// or NULL RESULT names the exact confusion, and the feedback names it back.
// Where the payload is a date or a person, the distractors are the OTHER dates
// from the same timeline: 1979, 1982, 1984 and 2005 are all real marks on the
// strip she rules in Lesson 84, so a miss says which link has not landed.
// Nothing here is filler.
//
// ---- SAFETY. READ THIS BEFORE ADDING A QUESTION HERE ----
//
// This module talks about testing, and about medicine being tested, so the line
// is walked carefully. Not one question in these sixty says a plant is for
// anything, and no amount of anything is ever aimed at a person. Every test in
// here is a pot, a ruler, a kitchen scale or a glass of tap water.
//
// Two questions carry the safety line on purpose and should never be cut:
// t-hbm1404j, which says a person you fooled is told the truth immediately and
// never left feeling silly, and t-hbm1406f, which says that what Barry Marshall
// did to himself in 1984 is history and not an example — nobody tests anything
// on a body, and a scientist today would not be allowed to either.
//
// ---- READING BAR ----
//
// Quarter 4 caps: prompts up to sixteen words a sentence, answer choices up to
// fifteen words, long-word rate up to ten percent. Written to sit inside those
// and clearly above Quarter 3, which is the other direction the guard runs in.
// The long subject words — anecdote, evidence, variation, coincidence, variable,
// control group, treatment group, baseline, placebo, blinded, expectation,
// ingredient, cherry-picking, consensus, bacterium, bacteria, Semmelweis — live
// mostly in the choices and the feedback, and every one of them carries a
// glossary card in the lesson it belongs to. Add them to the SUBJECT exemption
// set in scripts/check-assessment.mjs when this merges.
// ---------------------------------------------------------------------------

export const HERBALISM_M14_BANK = [
  // =========================================================================
  // LESSON 79 · hb-m14-01 · What makes something evidence
  // =========================================================================
  {
    id: 't-hbm1401a',
    lesson: 'hb-m14-01',
    prompt: 'What is an anecdote?',
    choices: [
      'One thing that happened once, remembered by one person',
      'Many careful observations that another person could check',
      'How many things you actually measured in a test',
      'The way living things differ from one another'
    ],
    answer: 0,
    feedback: [
      null,
      'That is evidence, which is the word for a record somebody can check.',
      'That is the sample size, which counts what you measured.',
      'That is variation, and it is why one plant settles so little.'
    ],
    why: 'An anecdote is one story, told from memory, and nothing was written down at the time.'
  },
  {
    id: 't-hbm1401b',
    lesson: 'hb-m14-01',
    prompt: 'You measured ten garlic leaves on each side of the pot. What is twenty called?',
    choices: ['The variation', 'The evidence', 'The sample size', 'The average'],
    answer: 2,
    feedback: [
      'Variation is how much the leaves differ, not how many there were.',
      'The evidence is the whole written record, not the count inside it.',
      null,
      'The average is what you get after adding up and dividing.'
    ],
    why: 'Sample size is simply how many things you measured, and a bigger one is harder to fool.'
  },
  {
    id: 't-hbm1401c',
    lesson: 'hb-m14-01',
    prompt: 'A neighbour says a buried fish grew her huge tomatoes. She measured nothing. What have you got?',
    choices: [
      'Nothing useful, so the sensible thing is to ignore her',
      'A story worth testing, and nothing more than that',
      'Evidence, because she watched the whole thing herself',
      'Proof, because the tomatoes really were enormous'
    ],
    answer: 1,
    feedback: [
      'Throwing a claim away untested is as careless as believing it.',
      null,
      'Seeing something once is how a question starts, not how it ends.',
      'The tomatoes were huge. What made them huge is the part nobody measured.'
    ],
    why: 'A story tells you what is worth testing next. It never tells you the answer.'
  },
  {
    id: 't-hbm1401d',
    lesson: 'hb-m14-01',
    prompt: 'Why measure ten leaves on each side instead of one?',
    choices: [
      'Because the longest leaf is the one that matters most',
      'Because ten leaves make the two sides grow more evenly',
      'Because ten numbers will prove the claim you started with',
      'Because one leaf can be lucky and ten cannot be, in the same way'
    ],
    answer: 3,
    feedback: [
      'Picking the longest is choosing your favourites, and it spoils the count.',
      'Measuring a plant does not change how that plant grows.',
      'A test that can only agree with you is not a test.',
      null
    ],
    why: 'A bigger sample size makes it much harder for chance to hand you a wrong answer.'
  },
  {
    id: 't-hbm1401e',
    lesson: 'hb-m14-01',
    prompt: 'Two corn plants beat the rest for no reason you asked about. What is that?',
    choices: ['Variation', 'An average', 'A sample size', 'Evidence'],
    answer: 0,
    feedback: [
      null,
      'An average is a number you work out, not a difference between plants.',
      'Sample size counts how many you measured. It does not describe them.',
      'Evidence is the record of what you found, not the spread inside it.'
    ],
    why: 'Living things differ from each other for a hundred reasons your test never asked about.'
  },
  {
    id: 't-hbm1401f',
    lesson: 'hb-m14-01',
    prompt: 'You have ten leaf lengths on your page. How do you work out the average?',
    choices: [
      'Count how many leaves you measured',
      'Add them all up, then divide by ten',
      'Pick the longest one and write it down',
      'Take the shortest away from the longest'
    ],
    answer: 1,
    feedback: [
      'That count is your sample size, and it is a different number.',
      null,
      'The longest leaf is one leaf, and it speaks for nobody else.',
      'That is the spread, which tells you about variation instead.'
    ],
    why: 'An average puts every measurement into one number, so no single leaf gets to decide.'
  },
  {
    id: 't-hbm1401g',
    lesson: 'hb-m14-01',
    prompt: 'What turns a pile of observations into evidence?',
    choices: [
      'Telling several people the same story',
      'Keeping only the numbers that agree with you',
      'Writing them down so somebody else could check them',
      'Believing them strongly enough to argue about them'
    ],
    answer: 2,
    feedback: [
      'A story repeated is still one story, told more times.',
      'Keeping what agrees is exactly how a record stops being honest.',
      null,
      'How sure you feel is not something another person can check.'
    ],
    why: 'Evidence is a record, made at the time, that another person could go and check.'
  },
  {
    id: 't-hbm1401h',
    lesson: 'hb-m14-01',
    prompt: 'Somebody looked at one plant on one morning. Why is that not enough?',
    choices: [
      'Because one plant on one day can easily be luck',
      'Because one plant is too small to see properly',
      'Because mornings are the wrong hour to look at plants',
      'Because plants only show what they are doing in summer'
    ],
    answer: 0,
    feedback: [
      null,
      'Size has nothing to do with it. The count does.',
      'Any hour is fine, so long as every plant gets the same one.',
      'The season is not the trouble here. A sample of one is.'
    ],
    why: 'A sample of one has no way of telling you what all the others are doing.'
  },
  {
    id: 't-hbm1401i',
    lesson: 'hb-m14-01',
    prompt: 'You write the date, your name and the number of leaves under your answer. Why?',
    choices: [
      'So the page looks tidy when it is finished',
      'So you can prove you were right all along',
      'So nobody else is allowed to repeat your test',
      'So another person could check the whole thing later'
    ],
    answer: 3,
    feedback: [
      'Tidiness is pleasant. It is not what makes a record useful.',
      'The record gets written whether it agrees with you or not.',
      'The opposite is true. You write it so somebody can repeat it.',
      null
    ],
    why: 'A record nobody else could follow is a story again, however carefully it was measured.'
  },
  {
    id: 't-hbm1401j',
    lesson: 'hb-m14-01',
    prompt: 'Your two longest leaves came from the shady side. What do you do with them?',
    choices: [
      'Measure the shady side only from now on',
      'Keep them in, because odd ones are normal',
      'Leave them out, because they disagree with the rest',
      'Start the whole test again from the beginning'
    ],
    answer: 1,
    feedback: [
      'Then you would have no comparison left, and no answer either.',
      null,
      'Dropping what disagrees is how people fool themselves without noticing.',
      'Nothing has gone wrong. Odd ones are what a big sample is for.'
    ],
    why: 'Every group has odd ones in it, and a large sample is built to survive them.'
  },
  // =========================================================================
  // LESSON 80 · hb-m14-02 · The fair test
  // =========================================================================
  {
    id: 't-hbm1402a',
    lesson: 'hb-m14-02',
    prompt: 'What is the variable in a test?',
    choices: [
      'Everything about the setup that you hold still',
      'What you say will happen before you look',
      'Two things landing near each other for no reason',
      'The one thing you change on purpose'
    ],
    answer: 3,
    feedback: [
      'Those are the conditions, and they are the things you do not change.',
      'That is your prediction, and it goes down in pen beforehand.',
      'That is a coincidence, which is what a fair test protects you from.',
      null
    ],
    why: 'One variable changes on purpose, and every other condition is held as still as you can manage.'
  },
  {
    id: 't-hbm1402b',
    lesson: 'hb-m14-02',
    prompt: 'The night pot goes outside and the morning pot sits on the kitchen windowsill. What now?',
    choices: [
      'The test is ruined, so the whole idea must be dropped',
      'Two things changed, so no result can be trusted',
      'Nothing changed, because both pots still get watered',
      'The test improved, because one pot is easier to watch'
    ],
    answer: 1,
    feedback: [
      'The idea is fine. The setup needs fixing, and that takes ten minutes.',
      null,
      'Both get watered, but only one of them gets wind and full daylight.',
      'Watching one pot more closely is another difference, not an improvement.'
    ],
    why: 'When two things change, a difference at the end could belong to either of them.'
  },
  {
    id: 't-hbm1402c',
    lesson: 'hb-m14-02',
    prompt: 'You sang to your turmeric daily and it came up on day twelve. It normally comes up between day ten and day twenty.',
    choices: [
      'Nothing about the singing, because that is when it comes up anyway',
      'The singing worked, because it came up while you sang',
      'The singing does nothing, and that is now settled',
      'Nothing at all can ever be learned from a pot'
    ],
    answer: 0,
    feedback: [
      null,
      'It came up during the singing. It would have come up during silence too.',
      'You have not shown that either. You have shown you cannot tell yet.',
      'Plenty can be learned. It just needs a pot you did not sing to.'
    ],
    why: 'When the thing would have happened anyway, what came before it explains nothing.'
  },
  {
    id: 't-hbm1402d',
    lesson: 'hb-m14-02',
    prompt: 'Two things happen near each other for no connected reason. What is that?',
    choices: ['A variable', 'A prediction', 'A coincidence', 'A cause'],
    answer: 2,
    feedback: [
      'A variable is the one thing you change on purpose in a test.',
      'A prediction is what you say will happen before you look.',
      null,
      'A cause is the thing that actually made the other thing happen.'
    ],
    why: 'Time only runs one way, so something always came just before, and usually it means nothing.'
  },
  {
    id: 't-hbm1402e',
    lesson: 'hb-m14-02',
    prompt: 'Why is your prediction written in pen before a single seed goes in?',
    choices: [
      'So the sheet looks neater than it would in pencil',
      'So the prediction is more likely to come true',
      'So a grown-up can mark it right or wrong',
      'So you cannot quietly change it once you see the result'
    ],
    answer: 3,
    feedback: [
      'Neatness is not the reason. Being unable to rub it out is.',
      'Writing something down has no power over how a plant grows.',
      'Nothing here is graded. The pen is there to keep you honest.',
      null
    ],
    why: 'A prediction you can edit afterwards has stopped being a prediction.'
  },
  {
    id: 't-hbm1402f',
    lesson: 'hb-m14-02',
    prompt: 'Why three pots in each group instead of one?',
    choices: [
      'Because a fair test must always use the number three',
      'Because the middle pot decides which group wins',
      'Because one pot can be lucky and three are harder to fool',
      'Because three pots hold more soil than one pot does'
    ],
    answer: 2,
    feedback: [
      'There is no magic number. More pots simply leave less room for luck.',
      'No single pot decides anything. You average the whole group.',
      null,
      'How much soil there is counts as a condition, not a reason for three.'
    ],
    why: 'Sample size belongs in the plan, because plants vary whatever hour you water them.'
  },
  {
    id: 't-hbm1402g',
    lesson: 'hb-m14-02',
    prompt: 'The corn looked greener the morning after a night watering. What else changed?',
    choices: [
      'The corn decided to grow because you were watching',
      'The air cooled, the sun set and the wind dropped',
      'Nothing else, because the garden was asleep',
      'Only the water, which is why the water gets the credit'
    ],
    answer: 1,
    feedback: [
      'Corn decides nothing, and nothing in this test looks at that.',
      null,
      'A garden at night is busy. Air, light and wind all move.',
      'The water was not alone. Several conditions changed at the same time.'
    ],
    why: 'Something always comes just before, which is why after is not the same as because.'
  },
  {
    id: 't-hbm1402h',
    lesson: 'hb-m14-02',
    prompt: 'What has to be written down before you have any data at all?',
    choices: [
      'The exact result that would prove you wrong',
      'The result you are quietly hoping to see',
      'The names of everybody who helped you',
      'How long the whole test is going to feel'
    ],
    answer: 0,
    feedback: [
      null,
      'Hoping is allowed. It is not the line that keeps you honest.',
      'Names belong on the page, but that is not what this line is for.',
      'How it feels is not a measurement, and nothing rests on it.'
    ],
    why: 'Saying beforehand what would change your mind is what stops you arguing with your own numbers.'
  },
  {
    id: 't-hbm1402i',
    lesson: 'hb-m14-02',
    prompt: 'The soil, the light, the water and the pot size are all what?',
    choices: [
      'Predictions you have written down',
      'Coincidences inside your test',
      'Conditions you are holding still',
      'Variables you are changing'
    ],
    answer: 2,
    feedback: [
      'A prediction is what you expect, not a part of the setup.',
      'A coincidence is two things landing near each other by chance.',
      null,
      'Only one thing gets changed on purpose, and here it is the hour.'
    ],
    why: 'Everything about the setup is a condition, and all but one of them have to match.'
  },
  {
    id: 't-hbm1402j',
    lesson: 'hb-m14-02',
    prompt: 'What makes a test a fair test?',
    choices: [
      'Both groups are given exactly the same treatment',
      'Everybody involved agrees that the result is fair',
      'The person running it wants a fair answer',
      'One thing changes and everything else is held still'
    ],
    answer: 3,
    feedback: [
      'Then nothing differs between them, and the test can answer nothing.',
      'Agreeing about a result is not the same as controlling a setup.',
      'Wanting fairness is good. It is not what makes the test fair.',
      null
    ],
    why: 'A fair test is one change against a matched setup, with nothing else moving.'
  },
  // =========================================================================
  // LESSON 81 · hb-m14-03 · Why we need a control group
  // =========================================================================
  {
    id: 't-hbm1403a',
    lesson: 'hb-m14-03',
    prompt: 'What is a control group?',
    choices: [
      'A test that found no difference at all',
      'The group you deliberately leave alone',
      'The group that gets the thing you are testing',
      'The measurement you take before anything changes'
    ],
    answer: 1,
    feedback: [
      'That is a null result, which is an answer rather than a group.',
      null,
      'That is the treatment group, and it is the other half of the test.',
      'That is the baseline, and it is taken at the start.'
    ],
    why: 'You leave one group alone so that you have something honest to compare against.'
  },
  {
    id: 't-hbm1403b',
    lesson: 'hb-m14-03',
    prompt: 'Your mulched pots grew four centimetres. Nothing was left bare to compare them with. What can you say?',
    choices: [
      'That mulch grows four centimetres of garlic a fortnight',
      'That mulch works, but only a little',
      'That the test needs one more fortnight to finish',
      'Nothing yet, because you do not know what bare pots did'
    ],
    answer: 3,
    feedback: [
      'The garlic grew. Nothing has shown that the mulch is the reason.',
      'Working a little is still a claim, and you have no comparison for it.',
      'Longer will not help. A missing control group stays missing.',
      null
    ],
    why: 'A number with nothing beside it cannot tell you whether anything happened at all.'
  },
  {
    id: 't-hbm1403c',
    lesson: 'hb-m14-03',
    prompt: 'The mulched pots and the bare pots both grew four centimetres. What is the honest conclusion?',
    choices: [
      'The garlic grew for reasons that had nothing to do with mulch',
      'The mulch somehow worked on both groups',
      'The test failed and should not be written down',
      'Mulch is bad for garlic and should never be used'
    ],
    answer: 0,
    feedback: [
      null,
      'The bare pots had no mulch on them at all.',
      'That is a real result, and it belongs in the log.',
      'Nothing here shows harm. It shows no difference, which is a different finding.'
    ],
    why: 'When both groups move together, the thing you changed is not what moved them.'
  },
  {
    id: 't-hbm1403d',
    lesson: 'hb-m14-03',
    prompt: 'A test finds no difference between the two groups. What is that called?',
    choices: ['A baseline', 'A coincidence', 'A null result', 'A failed test'],
    answer: 2,
    feedback: [
      'A baseline is the measurement you take at the very start.',
      'A coincidence is two things happening near each other for no reason.',
      null,
      'Nothing failed. The test answered the question you asked it.'
    ],
    why: 'Finding no difference is a real answer, and it goes into the log like any other.'
  },
  {
    id: 't-hbm1403e',
    lesson: 'hb-m14-03',
    prompt: 'Why does a coin flip decide which three pots get the mulch?',
    choices: [
      'Because a coin brings a test good luck',
      'So that nobody can pick the healthiest pots for the treatment',
      'So that the mulch ends up spread more evenly',
      'Because flipping is quicker than thinking about it'
    ],
    answer: 1,
    feedback: [
      'Luck is the thing you are trying to remove, not invite in.',
      null,
      'A coin has nothing to do with how the mulch gets spread.',
      'It is not about speed. It is about who gets to choose.'
    ],
    why: 'Letting chance choose keeps your own hopes out of which pot went into which group.'
  },
  {
    id: 't-hbm1403f',
    lesson: 'hb-m14-03',
    prompt: 'You weigh all six pots before anything is added. What is that first weight?',
    choices: ['The baseline', 'The null result', 'The variation', 'The conclusion'],
    answer: 0,
    feedback: [
      null,
      'A null result is finding no difference at the end of a test.',
      'Variation is how much the pots differ from one another.',
      'A conclusion comes at the end, once all the numbers are in.'
    ],
    why: 'A baseline is where you started, and every later weight is measured against it.'
  },
  {
    id: 't-hbm1403g',
    lesson: 'hb-m14-03',
    prompt: 'A scraped knee mends in about a week whether anybody fusses or not. What does that show?',
    choices: [
      'Nothing gets better unless somebody does something',
      'A week is how long every test ought to run',
      'Knees are easier to study than plants are',
      'Things often mend on their own, so whatever came last gets the credit'
    ],
    answer: 3,
    feedback: [
      'Plenty of things mend on their own, and that is exactly the problem.',
      'Different questions need different lengths of time.',
      'Neither is easier. Both keep changing while you watch them.',
      null
    ],
    why: 'A control group catches everything that was going to change anyway, so you can subtract it.'
  },
  {
    id: 't-hbm1403h',
    lesson: 'hb-m14-03',
    prompt: 'Which group is given the thing you are actually testing?',
    choices: ['The baseline group', 'The bigger group', 'The treatment group', 'The control group'],
    answer: 2,
    feedback: [
      'A baseline is a first measurement, not a group of pots.',
      'Both groups should be the same size wherever you can manage it.',
      null,
      'The control group is the one you deliberately leave alone.'
    ],
    why: 'Treatment group and control group are the two halves, and the gap between them is your answer.'
  },
  {
    id: 't-hbm1403i',
    lesson: 'hb-m14-03',
    prompt: 'Why weigh all six pots at the same time every day?',
    choices: [
      'So the only difference between the days is the water that left',
      'So the scale gets used the same number of times',
      'So the pots have longer to dry out overnight',
      'So the mulch has time to settle down'
    ],
    answer: 0,
    feedback: [
      null,
      'How often the scale is used has no effect on the answer.',
      'Drying happens whether you weigh at nine or at noon.',
      'Settling is not the thing being measured. Lost mass is.'
    ],
    why: 'Holding the hour still is one more condition matched, so the numbers stay comparable.'
  },
  {
    id: 't-hbm1403j',
    lesson: 'hb-m14-03',
    prompt: 'The mulch pots weigh more at the start. Does that break the comparison?',
    choices: [
      'Yes, because both groups have to weigh the same',
      'Yes, because heavier pots always hold more water',
      'No, because a kitchen scale is never that exact',
      'No, because you compare how much mass each pot lost'
    ],
    answer: 3,
    feedback: [
      'They only have to be compared fairly, and losses can be.',
      'The extra mass is mulch, not water, and you weighed it on purpose.',
      'The scale is exact enough, which is why the difference is fine.',
      null
    ],
    why: 'You wrote the starting mass down, so the number you compare is what went missing.'
  },
  // =========================================================================
  // LESSON 82 · hb-m14-04 · The placebo, and why it fools people
  // =========================================================================
  {
    id: 't-hbm1404a',
    lesson: 'hb-m14-04',
    prompt: 'What is a placebo?',
    choices: [
      'The group that is given the real thing',
      'A claim printed on the front of a packet',
      'Something with nothing active in it, handed over as the real thing',
      'A test that has a control group in it'
    ],
    answer: 2,
    feedback: [
      'That is the treatment group. The placebo goes to the other one.',
      'A claim is words on a package. A placebo is a thing handed over.',
      null,
      'That is a controlled test, which is the idea from Lesson 81.'
    ],
    why: 'A placebo looks like the real thing and holds nothing that could do anything.'
  },
  {
    id: 't-hbm1404b',
    lesson: 'hb-m14-04',
    prompt: 'Gigi said three pots got special food. You ranked those three greenest. All six had plain water.',
    choices: [
      'Knowing which pots were special changed how you looked at them',
      'The plain water worked on three of the pots',
      'You were making it up to please Gigi',
      'Your ruler was giving wrong readings all along'
    ],
    answer: 0,
    feedback: [
      null,
      'All six got the same water, so the water cannot explain a difference.',
      'You were not making anything up, and that is the whole point.',
      'The ruler was fine. What you expected leaned on the answer.'
    ],
    why: 'Expectation bends what a person notices, and it happens to trained scientists too.'
  },
  {
    id: 't-hbm1404c',
    lesson: 'hb-m14-04',
    prompt: 'In a blinded test, who is the one kept from knowing?',
    choices: [
      'The person doing the measuring, and nobody else',
      'Everybody except the person being tested',
      'Nobody, because the groups are labelled clearly',
      'The person being tested'
    ],
    answer: 3,
    feedback: [
      'Hiding it from the measurer as well is what makes it double-blinded.',
      'That is backwards. The subject is the first one kept in the dark.',
      'Clear labels are exactly what blinding covers up.',
      null
    ],
    why: 'Blinded means the subject does not know, so expectation cannot lean on what they report.'
  },
  {
    id: 't-hbm1404d',
    lesson: 'hb-m14-04',
    prompt: 'What makes a test double-blinded?',
    choices: [
      'The labels are covered up at the very end',
      'The person measuring does not know either',
      'The whole test is run twice from the start',
      'Two people are tested instead of one'
    ],
    answer: 1,
    feedback: [
      'Covering them afterwards protects nothing. They stay hidden throughout.',
      null,
      'Running it twice is repeating. It is not blinding at all.',
      'How many people are tested is sample size, which is another idea.'
    ],
    why: 'Double-blinded protects the result from the hopes of everybody in the room.'
  },
  {
    id: 't-hbm1404e',
    lesson: 'hb-m14-04',
    prompt: 'You believe mulch works and you are the one reading the ruler. Why hide the labels?',
    choices: [
      'Because measuring twice is always better than once',
      'Because the plants can tell which pot they are in',
      'Because hoping can nudge a close reading without you feeling it',
      'Because rulers read differently in different hands'
    ],
    answer: 2,
    feedback: [
      'Measuring twice is good practice, and it is not what blinding is for.',
      'The plants know nothing about labels. The person reading them does.',
      null,
      'The ruler is the same. The eye above it is what needs protecting.'
    ],
    why: 'Blinding does not assume you are dishonest. It assumes you are human, which you are.'
  },
  {
    id: 't-hbm1404f',
    lesson: 'hb-m14-04',
    prompt: 'Your volunteer said the spring water tasted fresher. One jug filled both glasses. Was she lying?',
    choices: [
      'No, because expecting a difference changed what she tasted',
      'Yes, because the water in both glasses was the same',
      'Yes, because she wanted to please you',
      'No, because one of the glasses really was fresher'
    ],
    answer: 0,
    feedback: [
      null,
      'Same water, honest answer. That is the surprising part of this.',
      'People do like to be helpful, but this happens even when they do not.',
      'One jug filled them both, so neither glass was fresher than the other.'
    ],
    why: 'Expectation is not lying. It changes what a sincere person actually notices.'
  },
  {
    id: 't-hbm1404g',
    lesson: 'hb-m14-04',
    prompt: 'What is a bias?',
    choices: [
      'A lie told deliberately to win an argument',
      'A mistake made while adding your numbers up',
      'The moment everybody is told which group was which',
      'A lean in one direction you did not choose'
    ],
    answer: 3,
    feedback: [
      'A bias is not chosen, and you cannot feel it happening.',
      'A slip in the adding is an error. A bias leans the whole result.',
      'That is the reveal, and it comes at the end.',
      null
    ],
    why: 'A bias is a lean you did not choose and cannot feel, so tests are designed around it.'
  },
  {
    id: 't-hbm1404h',
    lesson: 'hb-m14-04',
    prompt: 'Why does the placebo effect make an untested claim so convincing?',
    choices: [
      'Because nobody ever checks a claim a second time',
      'Because sincere people really do report a difference',
      'Because people who make claims are usually dishonest',
      'Because the claim is printed somewhere official'
    ],
    answer: 1,
    feedback: [
      'Plenty of claims do get checked. That is what a trial is for.',
      null,
      'Most of them are perfectly honest, which is what makes it convincing.',
      'Where a claim is printed says nothing about what a person felt.'
    ],
    why: 'An honest report from a sincere person is exactly what a placebo produces.'
  },
  {
    id: 't-hbm1404i',
    lesson: 'hb-m14-04',
    prompt: 'At the end, everybody is told which group they were in. What is that called?',
    choices: ['The baseline', 'The prediction', 'The variation', 'The reveal'],
    answer: 3,
    feedback: [
      'A baseline is the measurement taken before anything begins.',
      'A prediction is written down before you look at anything.',
      'Variation is how much the things you measured differ.',
      null
    ],
    why: 'The reveal comes last, so that nothing anybody knew could lean on the result.'
  },
  {
    id: 't-hbm1404j',
    lesson: 'hb-m14-04',
    prompt: 'You fooled a volunteer with two glasses of tap water. What do you do next?',
    choices: [
      'Tell her that she was very easy to fool',
      'Write it down and never mention it to her',
      'Tell her the truth straight away and thank her',
      'Keep it secret so the trick still works later'
    ],
    answer: 2,
    feedback: [
      'Nobody should be left feeling silly, because this fools everybody.',
      'Writing it down is right. Saying nothing to her is not.',
      null,
      'A person who has been tested has a right to know what happened.'
    ],
    why: 'Every round ends with the truth told kindly, because it fools everybody including you.'
  },
  // =========================================================================
  // LESSON 83 · hb-m14-05 · Reading a label and reading a claim
  // =========================================================================
  {
    id: 't-hbm1405a',
    lesson: 'hb-m14-05',
    prompt: 'Two boxes are the same size and price. One says 340 grams, one says 500. Which fact decides?',
    choices: [
      'The net weight, because it is what you actually get',
      'The picture on the front of the box',
      'The colour of the packaging',
      'The shelf the box was sitting on'
    ],
    answer: 0,
    feedback: [
      null,
      'The picture was drawn by somebody paid to make it appealing.',
      'Colour is a design choice, not a measurement of anything.',
      'Shelf position is a shop decision and says nothing about the contents.'
    ],
    why: 'Net weight is how much is inside, not counting the packet, and anybody can check it.'
  },
  {
    id: 't-hbm1405b',
    lesson: 'hb-m14-05',
    prompt: 'Which ingredient is there most of in a packet of food?',
    choices: [
      'The one named last in the list',
      'The one printed in the biggest letters',
      'The one shown in the picture on the front',
      'The one named first in the list'
    ],
    answer: 3,
    feedback: [
      'Last in the list means there is least of it.',
      'Letter size is a design choice, not an amount.',
      'The front picture shows whatever sells the box best.',
      null
    ],
    why: 'Ingredients are listed in order of how much is in there, so the first one is the biggest part.'
  },
  {
    id: 't-hbm1405c',
    lesson: 'hb-m14-05',
    prompt: 'A bag of plant food says it feeds up to three months. What does up to promise?',
    choices: [
      'Three months on any plant it is used on',
      'Almost nothing, because up to three months includes one week',
      'Exactly three months of feeding, every time',
      'At least three months, and probably longer'
    ],
    answer: 1,
    feedback: [
      'The packet never says which plant, or how anybody measured it.',
      null,
      'Up to sets a ceiling. It never sets a floor.',
      'At least would be a promise. Up to is the opposite of one.'
    ],
    why: 'Words like up to and helps sound like promises while promising nothing you could check.'
  },
  {
    id: 't-hbm1405d',
    lesson: 'hb-m14-05',
    prompt: 'You ran your test three times and show only the run you liked. What is that?',
    choices: ['A fair test', 'A baseline', 'Cherry-picking', 'A null result'],
    answer: 2,
    feedback: [
      'A fair test shows every run, including the ones you did not like.',
      'A baseline is a first measurement, not a way of choosing results.',
      null,
      'A null result is finding no difference, and you would report it.'
    ],
    why: 'Cherry-picking shows only what agrees with you, and it needs no false sentence at all.'
  },
  {
    id: 't-hbm1405e',
    lesson: 'hb-m14-05',
    prompt: 'A packet says gardeners agree it grows bigger tomatoes. What does that leave out?',
    choices: [
      'How many gardeners were asked, and bigger than what',
      'Whether gardeners grow tomatoes at all',
      'Whether the packet can be recycled',
      'Whether tomatoes need watering'
    ],
    answer: 0,
    feedback: [
      null,
      'Gardeners do grow tomatoes. That part is not the trick.',
      'Recycling matters, but it is not what this claim was about.',
      'That is a real question, and this claim was never about it.'
    ],
    why: 'Bigger than what, and compared against whom, are the two questions a soft claim never answers.'
  },
  {
    id: 't-hbm1405f',
    lesson: 'hb-m14-05',
    prompt: 'Which side of a packet carries facts that somebody can be held to?',
    choices: [
      'Whichever side has the bigger writing on it',
      'The back, where the weight and the ingredients are printed',
      'The front, where the promise is printed',
      'Neither side, because a packet is never checked'
    ],
    answer: 1,
    feedback: [
      'Big writing is a design choice, not a sign of a fact.',
      null,
      'The front is a picture and a promise, designed to be seen first.',
      'The law makes them print the back, and it can be checked.'
    ],
    why: 'The front was made to sell it, and the back is the part somebody has to stand behind.'
  },
  {
    id: 't-hbm1405g',
    lesson: 'hb-m14-05',
    prompt: 'What makes a printed sentence checkable?',
    choices: [
      'It sounds confident when you read it out loud',
      'It appears on more than one packet',
      'A picture beside it shows the same thing',
      'Somebody else could go and test whether it is true'
    ],
    answer: 3,
    feedback: [
      'Confidence is a tone of voice, and it cannot be tested.',
      'The same sentence printed twice is still untested.',
      'A picture is a drawing, and it proves nothing about the contents.',
      null
    ],
    why: 'Checkable means written so plainly that somebody else could go and find out.'
  },
  {
    id: 't-hbm1405h',
    lesson: 'hb-m14-05',
    prompt: 'Nine out of ten people preferred it. What is your first question?',
    choices: [
      'Whether the tenth person was upset about it',
      'What the packet itself is made of',
      'Out of how many people, and who was asking them',
      'Which of the ten people was the nicest'
    ],
    answer: 2,
    feedback: [
      'That is a kind thought, and it is not what the claim hides.',
      'The packaging material has nothing to do with the claim.',
      null,
      'How nice they were changes nothing about the number.'
    ],
    why: 'A claim is worth exactly what it leaves out, and this one leaves out the sample size.'
  },
  {
    id: 't-hbm1405i',
    lesson: 'hb-m14-05',
    prompt: 'What belongs on the honest label for her own jar of dried herbs?',
    choices: [
      'Nothing, because she knows what is in it',
      'The plant, the part, when it was picked and how',
      'A picture of the plant looking its best',
      'A sentence about how wonderful the jar is'
    ],
    answer: 1,
    feedback: [
      'A label is written so that somebody else can know too.',
      null,
      'A picture is decoration. It is not one of the five lines.',
      'That is a claim, and a claim is not a printed fact.'
    ],
    why: 'Plant, part, date, how it was prepared and who made it are the lines that can be checked.'
  },
  {
    id: 't-hbm1405j',
    lesson: 'hb-m14-05',
    prompt: 'A claim is not the same as a lie. What is the difference?',
    choices: [
      'A claim can be true and still leave out what matters',
      'A claim is always false and a lie is not',
      'A lie is printed and a claim is spoken',
      'There is no difference between the two at all'
    ],
    answer: 0,
    feedback: [
      null,
      'Plenty of claims are perfectly true, and that is what makes them work.',
      'Both of them get printed. Where it appears is not the difference.',
      'There is one, and it is what makes a soft claim so useful.'
    ],
    why: 'A soft claim says something true and quietly leaves out the part you would want.'
  },
  // =========================================================================
  // LESSON 84 · hb-m14-06 · When the experts change their minds
  // =========================================================================
  {
    id: 't-hbm1406a',
    lesson: 'hb-m14-06',
    prompt: 'What did doctors teach caused stomach ulcers before the 1980s?',
    choices: [
      'Nothing, because nobody had a theory yet',
      'Stress and spicy food',
      'Bacteria living in the stomach',
      'Something in the water supply'
    ],
    answer: 1,
    feedback: [
      'There was a theory, it was in every textbook, and it was wrong.',
      null,
      'That is what Warren and Marshall showed, and almost nobody believed them.',
      'Nothing in this story points at the water supply.'
    ],
    why: 'It was taught in every medical school, and everybody agreeing is not the same as everybody checking.'
  },
  {
    id: 't-hbm1406b',
    lesson: 'hb-m14-06',
    prompt: 'What is a bacterium?',
    choices: [
      'A sore place on the lining of the stomach',
      'A prize given for work that changed a field',
      'One single living thing far too small to see',
      'More than one of them, all together'
    ],
    answer: 2,
    feedback: [
      'That is an ulcer, and it is what these bacteria turned out to matter for.',
      'That is the Nobel Prize, and these two were given it in 2005.',
      null,
      'That is bacteria, which is simply the word for more than one.'
    ],
    why: 'A bacterium is one and bacteria is more than one, and Warren kept seeing curved ones.'
  },
  {
    id: 't-hbm1406c',
    lesson: 'hb-m14-06',
    prompt: 'What did Warren and Marshall manage to do in 1982?',
    choices: [
      'They grew the bacteria in the laboratory',
      'They were awarded the Nobel Prize',
      'They rewrote the medical textbooks',
      'They swallowed a culture of the bacteria'
    ],
    answer: 0,
    feedback: [
      null,
      'The prize came in 2005, twenty-three years later.',
      'The textbooks changed slowly, and only after the evidence won.',
      'That was 1984, and Marshall did it on his own.'
    ],
    why: 'Growing them in the laboratory turned something odd under a microscope into evidence.'
  },
  {
    id: 't-hbm1406d',
    lesson: 'hb-m14-06',
    prompt: 'In which year were Warren and Marshall awarded the Nobel Prize?',
    choices: ['1979', '1982', '1984', '2005'],
    answer: 3,
    feedback: [
      'That is around when Warren first kept seeing them under the microscope.',
      'That is the year they first grew the bacteria in the laboratory.',
      'That is the year Marshall swallowed a culture of them himself.',
      null
    ],
    why: 'The prize came in 2005, more than twenty years after the evidence was first there.'
  },
  {
    id: 't-hbm1406e',
    lesson: 'hb-m14-06',
    prompt: 'Marshall swallowed a culture in 1984. Why is that still weak evidence?',
    choices: [
      'Because it happened such a long time ago',
      'Because the sample size is one single person',
      'Because he already believed the answer',
      'Because he was not a real doctor'
    ],
    answer: 1,
    feedback: [
      'Age does not weaken evidence. Being a single person does.',
      null,
      'He did believe it, and that matters, but it is not the main weakness.',
      'He was a doctor. That is not what is wrong with a sample of one.'
    ],
    why: 'A dramatic story wins the argument for a week, and careful measurements win it for good.'
  },
  {
    id: 't-hbm1406f',
    lesson: 'hb-m14-06',
    prompt: 'Marshall tested it on his own body. What is the rule for you?',
    choices: [
      'Nobody tests anything on a body, ever',
      'You may copy it while a grown-up watches',
      'You may do it once you are older',
      'Only on an animal, and never on a person'
    ],
    answer: 0,
    feedback: [
      null,
      'Watching changes nothing. This is not something anybody copies.',
      'A scientist today would not be allowed to do it either.',
      'Not on an animal either. In this course we test how plants grow.'
    ],
    why: 'What Marshall did in 1984 is history, not an example, and we test plants in pots.'
  },
  {
    id: 't-hbm1406g',
    lesson: 'hb-m14-06',
    prompt: 'In 1847 Semmelweis showed that washing hands cut deaths on his ward. How did the doctors answer?',
    choices: [
      'They gave him a prize for the work',
      'They asked him to go and gather more numbers',
      'They were insulted rather than convinced',
      'They changed their habits that same week'
    ],
    answer: 2,
    feedback: [
      'No prize came. His evidence was rejected in his own lifetime.',
      'They were not asking for more evidence. They did not want this one.',
      null,
      'They did not. The numbers were there and the doctors were offended.'
    ],
    why: 'Being shown that you were causing harm is hard to hear, even with the numbers on the page.'
  },
  {
    id: 't-hbm1406h',
    lesson: 'hb-m14-06',
    prompt: 'What does consensus mean?',
    choices: [
      'Something that has been proved beyond all doubt',
      'A change of mind once new evidence arrives',
      'A prize for work that changed a whole field',
      'What almost everybody who studies a thing believes now'
    ],
    answer: 3,
    feedback: [
      'A consensus can be wrong, which is exactly what this lesson shows.',
      'That is revising, and it is what happens when a consensus breaks.',
      'That is the Nobel Prize, and it went to these two in 2005.',
      null
    ],
    why: 'The consensus was stress and spicy food, and the consensus was wrong for thirty years.'
  },
  {
    id: 't-hbm1406i',
    lesson: 'hb-m14-06',
    prompt: 'Your own data says your prediction was wrong. What is the strong move?',
    choices: [
      'Leave the prediction off the page altogether',
      'Write the result down and say what it changed',
      'Run the test again until it agrees with you',
      'Show people only the run that came out best'
    ],
    answer: 1,
    feedback: [
      'The prediction is the part that makes the result mean anything.',
      null,
      'Repeating a test is fine. Repeating it until it agrees is not.',
      'Showing your best run only is cherry-picking, from Lesson 83.'
    ],
    why: 'Changing your position when the evidence changes is the hardest and best thing in the job.'
  },
  {
    id: 't-hbm1406j',
    lesson: 'hb-m14-06',
    prompt: 'Somebody says science cannot be trusted because experts change their minds. Answer them.',
    choices: [
      'Experts hardly ever change their minds anyway',
      'It only happened once, with the ulcer story',
      'Changing with the evidence is exactly why it can be trusted',
      'They are right, because the textbooks keep being rewritten'
    ],
    answer: 2,
    feedback: [
      'They do, and this whole lesson is one long example of it.',
      'It happens constantly. Semmelweis is a second example in this lesson.',
      null,
      'Rewriting is the method working, not the method failing.'
    ],
    why: 'Twenty-six years from a curious slide to a Nobel Prize is the method working, slowly.'
  }
];

export function m14BankItemById(id) {
  return HERBALISM_M14_BANK.find((q) => q.id === id) || null;
}

export function itemsForLesson(lessonId) {
  return HERBALISM_M14_BANK.filter((q) => q.lesson === lessonId);
}

export function itemsForLessons(lessonIds) {
  const want = new Set(lessonIds);
  return HERBALISM_M14_BANK.filter((q) => want.has(q.lesson));
}

export default HERBALISM_M14_BANK;
