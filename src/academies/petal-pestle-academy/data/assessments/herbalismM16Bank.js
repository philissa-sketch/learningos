// ---------------------------------------------------------------------------
// HERBALISM & BOTANY — MODULE 16 QUESTION BANK
// The Herbalist's Year · Lessons 91–96 · Quarter 4, Weeks 7 and 8
//
// Ten questions per lesson, sixty in all. These are NOT asked at the end of a
// lesson. They are the pool the weekly test draws from: three lessons at ten
// questions is a thirty-question pool, and buildWeeklyTest takes eight. They
// also feed the morning warm-up and the extra practice the practice gate serves
// when she misses more than one on a lesson check.
//
//   Week 7 pool — hb-m16-01, hb-m16-02, hb-m16-03  (30 questions)
//   Week 8 pool — hb-m16-04, hb-m16-05, hb-m16-06  (30 questions)
//
// Field shape matches src/data/assessments/herbalismM1Bank.js exactly: id,
// lesson, prompt, choices (four, all different), answer (0-3), feedback (four
// entries, null in the correct slot and a real sentence in every other), and
// why, which is never blank because it is what the review screen shows.
//
// ---- DISTRACTORS ----
//
// Where the payload is vocabulary, the wrong choices are the OTHER words from
// this module, so a miss names the exact word that has not landed. Where the
// payload is method, the distractors are the plausible wrong moves a careful
// child actually makes: dropping the awkward numbers, extending the test after
// seeing the score, leaving the inconvenient weakness out of the presentation.
// Nothing here is filler.
//
// ---- SAFETY. READ THIS BEFORE ADDING A QUESTION HERE. ----
//
// This module is about records, questions, design and honesty, so there is very
// little surface for dosing language and none of it is used. Not one question
// asks what a plant is for, what it does to a person, or how much of anything
// anybody should have. Six questions test the safety line on purpose and should
// never be cut: t-hbm1601j, t-hbm1602j, t-hbm1603h, t-hbm1604j, t-hbm1605j and
// t-hbm1606e. Between them they check that she knows nothing is tasted without
// a grown-up, that leaves are measured where they grow, that a question about
// what a plant does to a person is not hers to test, that a design needing
// something given to a person or an animal may not be run, that she does not
// answer that question when an audience asks it, and what she says to a cousin
// who wants to know about his knee.
//
// ---- READING BAR ----
//
// Quarter 4 caps: prompts up to sixteen words a sentence, answer choices up to
// fifteen words, long-word rate up to ten percent. Written to sit inside those
// and clearly above Quarter 3, which is the direction the guard also runs in.
// The long subject words — phenology, hindsight, specimen, uncertainty,
// limitation, replicate, protocol, referral, ophthalmologist — each carry a
// glossary card in the lesson. Add them to the SUBJECT exemption set in
// scripts/check-assessment.mjs when this merges.
// ---------------------------------------------------------------------------

export const HERBALISM_M16_BANK = [
  // =========================================================================
  // LESSON 91 · hb-m16-01 · Reading back through your own log
  // =========================================================================
  {
    id: 't-hbm1601a',
    lesson: 'hb-m16-01',
    prompt: 'Why do scientists reread their own old notebooks instead of trusting what they remember?',
    choices: [
      'Because everything written last year is more accurate than anything written today'
    ,
      'Because memory quietly rewrites what you thought you saw at the time',
      'Because handwriting is easier to understand than thinking is',
      'Because a notebook is required before anybody may do science'],
    answer: 1,
    feedback: [
      'Old notes can be badly wrong. They are wrong in a way you can go back and check.'
    ,
      null,
      'The page is not easier. It is simply the version that cannot change.',
      'Many laboratories do require them, and that is still not why the habit works.'],
    why: 'The record stays still while you keep learning, which is exactly what makes it useful later.'
  },
  {
    id: 't-hbm1601b',
    lesson: 'hb-m16-01',
    prompt: 'An old entry reads: the corn grew four. There is no unit and no date. What is it?',
    choices: [
      'Evidence, because you were the person who wrote it',
      'A gap in the record'
    ,
      'Usable data, because four is a perfectly clear number',
      'A mark on paper, because nothing says what four counted or when'],
    answer: 3,
    feedback: [
      'Writing it yourself makes it a record. The unit and the date make it usable.',
      'A gap is where nothing was written at all. Something was written here.'
    ,
      'Four centimetres, four leaves and four days are three different answers.',
      null],
    why: 'A number you cannot place in time and in units is not yet data.'
  },
  {
    id: 't-hbm1601c',
    lesson: 'hb-m16-01',
    prompt: 'Your log has nothing written in it for five weeks. What does that stretch tell you?',
    choices: [
      'That nobody was watching, so nothing in there can be claimed',
      'That those weeks should be crossed out of the log'
    ,
      'That nothing happened to the plants during those weeks',
      'That the plants stopped growing while nobody was watching'],
    answer: 0,
    feedback: [
      null,
      'Crossing out the awkward part of a record is the worst thing you can do to it.'
    ,
      'Plenty happened. Nobody wrote any of it down, which is a different thing.',
      'Plants do not wait for an audience before they grow.'],
    why: 'A gap is real information, and what it says is that this stretch belongs to nobody.'
  },
  {
    id: 't-hbm1601d',
    lesson: 'hb-m16-01',
    prompt: 'Measurements stop for five weeks and restart much higher. A friend says the plants shot up in one week. What do you say?',
    choices: [
      'She is right, because the two entries sit next to each other',
      'She is wrong, because garlic can never grow that quickly',
      'Nobody knows, because five unwatched weeks sit between those numbers',
      'The earlier numbers should be dropped so the jump disappears'
    ],
    answer: 2,
    feedback: [
      'Next to each other on the page is not next to each other in time.',
      'Speed is not the problem here. The missing weeks are the problem.',
      null,
      'Deleting the inconvenient half of a record is not tidying. It is spoiling it.'
    ],
    why: 'Growth that happened while nobody measured belongs to the gap, not to either side of it.'
  },
  {
    id: 't-hbm1601e',
    lesson: 'hb-m16-01',
    prompt: 'What is phenology?',
    choices: [
      'The study of how plants defend themselves from insects',
      'The study of where in the world a plant first grew'
    ,
      'The study of when things happen to plants each year',
      'The study of what plants are made of inside'],
    answer: 2,
    feedback: [
      'That was Module 4, and it is about thorns, fuzz and strong smells.',
      'That is a question about origin, and a reference book answers it.'
    ,
      null,
      'That is closer to plant chemistry, which was Module 13.'],
    why: 'Phenology is about timing, which is why it needs dated records kept over a whole year.'
  },
  {
    id: 't-hbm1601f',
    lesson: 'hb-m16-01',
    prompt: 'Which entry could a stranger actually use twenty years from now?',
    choices: [
      '3 March, back step, longest garlic leaf 24 centimetres',
      'Turmeric definitely doing better than last time'
    ,
      'Garlic looking good today',
      'Measured the corn, quite tall now'],
    answer: 0,
    feedback: [
      null,
      'Better than last time needs last time to have a number, and it does not.'
    ,
      'Good is not a measurement, and today is not a date once the page is old.',
      'Quite tall cannot be compared with anything, including your own next entry.'],
    why: 'A usable entry carries the date, the place, the thing measured and the unit.'
  },
  {
    id: 't-hbm1601g',
    lesson: 'hb-m16-01',
    prompt: 'What does hindsight mean?',
    choices: [
      'Looking at a plant from behind before you draw it',
      'Remembering something exactly as it really was'
    ,
      'Guessing correctly what is going to happen next',
      'Seeing clearly now what you could not see at the time'],
    answer: 3,
    feedback: [
      'Nothing in this lesson is about which side of a plant you stand on.',
      'Memory is the thing hindsight quietly changes, which is why the page matters.'
    ,
      'That is prediction, and a prediction gets written down before you look.',
      null],
    why: 'Hindsight is why reading your own September page in April is worth doing at all.'
  },
  {
    id: 't-hbm1601h',
    lesson: 'hb-m16-01',
    prompt: 'You find an entry you now know was wrong. What is the right thing to do with it?',
    choices: [
      'Rub it out, because a log should only hold true things',
      'Leave it, and write underneath what you know now',
      'Tear the page out and start the log again',
      'Change the wording so it agrees with what you know'
    ],
    answer: 1,
    feedback: [
      'A log that only holds true things is a log somebody has been editing.',
      null,
      'Starting again throws away the only proof of how your thinking changed.',
      'Rewriting the past to match the present is the opposite of keeping a record.'
    ],
    why: 'A record of being wrong, with the correction under it, is more useful than a tidy page.'
  },
  {
    id: 't-hbm1601i',
    lesson: 'hb-m16-01',
    prompt: 'Why count how many entries carry a unit and a date, and how many do not?',
    choices: [
      'Because the count tells you how much of your own year you can actually use',
      'Because you need the total number of pages for the front cover',
      'Because entries without units have to be thrown away'
    ,
      'Because the count decides how good a scientist you are'],
    answer: 0,
    feedback: [
      null,
      'The cover needs your name and the year, not a page total.',
      'They stay in. They simply cannot be compared with anything.'
    ,
      'Nothing in this log is graded, and the count is not a score.'],
    why: 'Knowing how much of a record is usable is the first honest thing you learn from reading it.'
  },
  {
    id: 't-hbm1601j',
    lesson: 'hb-m16-01',
    prompt: 'You finish the reading and go out for a last look at the four containers. What is the rule?',
    choices: [
      'Handling is fine now, because the growing year has finished'
    ,
      'Taste one leaf of each to see how the year turned out',
      'Wash your hands after, and taste nothing without a grown-up',
      'Pick a leaf from each plant to keep in the log'],
    answer: 2,
    feedback: [
      'The rule is not about the season. It has never been about the season.'
    ,
      'Nothing has been tasted all year without a grown-up, and today changes nothing.',
      null,
      'Picking damages the plant and the record, and the field guide needs it whole.'],
    why: 'Hands washed, nothing tasted without a grown-up. That rule has held since Module 1.'
  },

  // =========================================================================
  // LESSON 92 · hb-m16-02 · Building your own field guide
  // =========================================================================
  {
    id: 't-hbm1602a',
    lesson: 'hb-m16-02',
    prompt: 'What is a scale bar for?',
    choices: [
      'It shows how many plants were in the container'
    ,
      'It shows how long a real centimetre is on the drawing',
      'It shows how heavy the plant was when you drew it',
      'It shows which end of the page is the top'],
    answer: 1,
    feedback: [
      'The count goes in the corner in words, not in a bar.'
    ,
      null,
      'Weight is a different measurement, and a bar on paper cannot carry it.',
      'Which way up a page goes is not what a scale bar does.'],
    why: 'Without a bar a drawing could be any size at all, so the size has to travel with the picture.'
  },
  {
    id: 't-hbm1602b',
    lesson: 'hb-m16-02',
    prompt: 'Why do naturalists draw a plant instead of photographing it?',
    choices: [
      'Because a photograph is not allowed in a field guide',
      'Because drawings are more accurate than photographs are'
    ,
      'Because a camera cannot show the colours properly',
      'Because drawing takes long enough to make you look at every part'],
    answer: 3,
    feedback: [
      'Photographs appear in plenty of guides. The drawing is for the person drawing.',
      'A photograph is usually more exact. It just does not make you count anything.'
    ,
      'Cameras handle colour very well. That is not the reason.',
      null],
    why: 'The drawing changes the person holding the pencil, which is the whole point of doing it.'
  },
  {
    id: 't-hbm1602c',
    lesson: 'hb-m16-02',
    prompt: 'Which of these does a field guide page NOT need?',
    choices: [ 'A scale bar','The date', 'The place it was growing', 'Your opinion of the plant'],
    answer: 3,
    feedback: [
      'Without a scale bar, the drawing could be any size at all.'
    ,
      'Without a date, nobody knows what time of year it looked like that.',
      'Without the place, the page cannot be matched to any garden, including yours.',
      null],
    why: 'A guide records and does not rank, so what you thought of the plant is not part of it.'
  },
  {
    id: 't-hbm1602d',
    lesson: 'hb-m16-02',
    prompt: 'What is a specimen?',
    choices: [
      'A drawing of a plant made from memory',
      'The one particular plant you actually looked at',
      'A plant that has been pressed and dried',
      'The best-looking plant in the container'
    ],
    answer: 1,
    feedback: [
      'A drawing is a record of a specimen, and it is not the specimen.',
      null,
      'A pressed plant can be a specimen, and so can a living one you sat beside.',
      'Best-looking is a judgement, and a guide records rather than ranks.'
    ],
    why: 'Naming the exact plant you looked at is what stops the page from being about plants in general.'
  },
  {
    id: 't-hbm1602e',
    lesson: 'hb-m16-02',
    prompt: 'A page holds a beautiful drawing and the word CORN, and nothing else. What can a stranger get?',
    choices: [
      'Nothing whatever, because a drawing alone is useless'
    ,
      'The real size, from the size of the drawing',
      'What the plant looked like, and nothing beyond that',
      'When it was drawn, from how yellow the paper is'],
    answer: 2,
    feedback: [
      'The drawing is real information. It simply has no time and no place attached.'
    ,
      'A drawing has no size of its own, which is exactly what a scale bar is for.',
      null,
      'Paper ageing is not a date, and no guide has ever relied on it.'],
    why: 'A record is worth what a stranger can take from it without asking you a question.'
  },
  {
    id: 't-hbm1602f',
    lesson: 'hb-m16-02',
    prompt: 'Why measure the longest leaf where it grows rather than picking it first?',
    choices: [
      'Because a plant you keep stripping stops being a fair thing to record',
      'Because picked leaves are harder to hold against a ruler',
      'Because the ruler would damage the leaf'
    ,
      'Because picked leaves shrink within a few minutes'],
    answer: 0,
    feedback: [
      null,
      'A picked leaf is easier to hold, which is exactly why the temptation is there.',
      'A ruler laid alongside a leaf harms nothing at all.'
    ,
      'Shrinking is slow, and it is not the reason the rule exists.'],
    why: 'A guide to a plant you have stripped is a guide to a plant that no longer exists.'
  },
  {
    id: 't-hbm1602g',
    lesson: 'hb-m16-02',
    prompt: 'In a field guide, what does the word habit mean?',
    choices: [
      'Something the person keeping the guide does every day',
      'The overall shape a plant grows in',
      'The soil a plant prefers to grow in',
      'The month a plant usually flowers in'
    ],
    answer: 1,
    feedback: [
      'That is the everyday meaning, and it is not the one a guide uses.',
      null,
      'Soil matters enormously, and it goes on the page under place instead.',
      'Flowering time is phenology, which was yesterday\'s word.'
    ],
    why: 'Upright, climbing, spreading and creeping are habits, and habit is often the first thing you notice.'
  },
  {
    id: 't-hbm1602h',
    lesson: 'hb-m16-02',
    prompt: 'Why does every page end with a line beginning I am still not sure whether?',
    choices: [
      'Because a page looks unfinished without a last line',
      'Because it makes the guide longer',
      'Because it warns the reader not to trust anything on the page'
    ,
      'Because it shows the reader what is still unsettled'],
    answer: 3,
    feedback: [
      'It is not decoration, and a page is finished when it is usable.',
      'Length is not a quality a guide is judged on.',
      'The rest of the page is careful work. The line marks the edge of it, not the whole.'
    ,
      null],
    why: 'Marking where your knowledge stops is what lets somebody trust the part before it.'
  },
  {
    id: 't-hbm1602i',
    lesson: 'hb-m16-02',
    prompt: 'You draw your turmeric and only then notice the new leaves come out rolled. Why now?',
    choices: [
      'Drawing made you look for long enough to see it',
      'Turmeric only rolls its leaves during the afternoon',
      'A pencil shows things the eye cannot see'
    ,
      'The leaves changed shape while you were sitting there'],
    answer: 0,
    feedback: [
      null,
      'You have no measurements about the time of day, so you cannot say that.',
      'The eye sees it perfectly well once it has been made to stay still.'
    ,
      'The plant did nothing new. You did.'],
    why: 'Noticing is a skill you can practise, and drawing is the cheapest way to practise it.'
  },
  {
    id: 't-hbm1602j',
    lesson: 'hb-m16-02',
    prompt: 'You are sitting beside the containers for half an hour, drawing. What are the rules?',
    choices: [
      'Taste one leaf so you can describe the flavour on the page',
      'Move the containers indoors so nothing gets on your hands'
    ,
      'Wash your hands after, and taste nothing without a grown-up',
      'Wear gloves, because drawing near soil is dangerous'],
    answer: 2,
    feedback: [
      'Flavour is not on a field guide page, and nothing is tasted without a grown-up.',
      'Moving them changes their place, and the place is part of the record.'
    ,
      null,
      'Gloves are for digging. Watching where your hands go is enough here.'],
    why: 'Hands washed, nothing tasted without a grown-up. The rule does not change for a drawing lesson.'
  },

  // =========================================================================
  // LESSON 93 · hb-m16-03 · The question nobody has answered yet
  // =========================================================================
  {
    id: 't-hbm1603a',
    lesson: 'hb-m16-03',
    prompt: 'What are the three piles a question can go in?',
    choices: [
      'True, false and unknown'
    ,
      'Easy, hard and impossible',
      'Look it up, I could test it, nobody knows',
      'Plants, weather and people'],
    answer: 2,
    feedback: [
      'A question is not true or false. The answer might be.'
    ,
      'Difficulty is not the sorting rule. Where the answer lives is.',
      null,
      'That is a subject list, and it says nothing about how to answer anything.'],
    why: 'Deciding which pile a question belongs in comes before spending five weeks on it.'
  },
  {
    id: 't-hbm1603b',
    lesson: 'hb-m16-03',
    prompt: 'Which of these is a testable question about your own containers?',
    choices: [
      'Do the garlic plants nearest the wall grow taller in four weeks?',
      'Why do plants exist at all?'
    ,
      'Is my ginger happy in that pot?',
      'Does corn enjoy Georgia weather?'],
    answer: 0,
    feedback: [
      null,
      'That is a real question and a fascinating one, and no ruler settles it.'
    ,
      'Happy cannot be measured, so nothing you did would count as an answer.',
      'Enjoy is the same problem, and now the whole state is inside the question.'],
    why: 'A testable question names the change, the measurement and the length of time.'
  },
  {
    id: 't-hbm1603c',
    lesson: 'hb-m16-03',
    prompt: 'Which word makes this question vague: does the turmeric do better in the shade?',
    choices: [ 'Shade', 'Does','Turmeric', 'Better'],
    answer: 3,
    feedback: [
      'Shade is a real place you could point at and measure from.',
      'Does is only grammar. It carries no meaning to argue about.'
    ,
      'Turmeric is exactly the plant you mean, so that part is already sharp.',
      null],
    why: 'Better could mean taller, greener, faster or heavier, and two honest people would answer differently.'
  },
  {
    id: 't-hbm1603d',
    lesson: 'hb-m16-03',
    prompt: 'A book says corn generally needs more water than garlic. What is left for you to do?',
    choices: [
      'Run the whole test as though the book did not exist',
      'Take the general answer, then test your own containers',
      'Assume the book is wrong until you can prove otherwise'
    ,
      'Nothing, because the book has settled the matter'],
    answer: 1,
    feedback: [
      'Ignoring careful work that already exists wastes weeks you do not have.',
      null,
      'Doubting everything on principle is not care. It is only slower.'
    ,
      'A book cannot know your soil, your pots or your back step.'],
    why: 'A published answer tells you what usually happens, which is not what happens here.'
  },
  {
    id: 't-hbm1603e',
    lesson: 'hb-m16-03',
    prompt: 'What is an open question?',
    choices: [
      'A question nobody has answered yet, anywhere',
      'A question with more than one correct answer',
      'A question you are allowed to ask out loud',
      'A question a reference book answers in four minutes'
    ],
    answer: 0,
    feedback: [
      null,
      'Several right answers is a different thing, and it usually means the wording is loose.',
      'Every question is allowed. That is not what open means.',
      'That is the look-it-up pile, and it is the opposite of open.'
    ],
    why: 'Open questions are where the work is, because nobody can hand you the answer.'
  },
  {
    id: 't-hbm1603f',
    lesson: 'hb-m16-03',
    prompt: 'You look an answer up and write it on the back of the card. Why write where it came from?',
    choices: [
      'So you remember how long the search took you',
      'So nobody can accuse you of guessing'
    ,
      'So you can find the book again if somebody doubts it',
      'So the card looks properly finished'],
    answer: 2,
    feedback: [
      'How long it took is not information anybody else can use.',
      'Naming the source is not about accusation. It is about checking.'
    ,
      null,
      'A finished look is not a reason to write anything down.'],
    why: 'An answer somebody can trace back to its source is an answer somebody can check.'
  },
  {
    id: 't-hbm1603g',
    lesson: 'hb-m16-03',
    prompt: 'What four things does sharpening a question mean naming?',
    choices: [
      'The plant, the pot, the soil and the weather',
      'The change, the measurement, the unit and the time',
      'The question, the answer, the reason and the source',
      'The variable, the control, the prediction and the sample'
    ],
    answer: 1,
    feedback: [
      'Those are conditions you hold still, and they come later in the design.',
      null,
      'You cannot name the answer while sharpening, because you do not have it yet.',
      'Those four are tomorrow, and they belong on the design sheet.'
    ],
    why: 'A question is ready when you can name the number that would answer it.'
  },
  {
    id: 't-hbm1603h',
    lesson: 'hb-m16-03',
    prompt: 'Where does a question about what a plant does to a person belong?',
    choices: [
      'In LOOK IT UP, if a book gives an answer',
      'In NOBODY KNOWS, which makes it the best one to pick'
    ,
      'In I COULD TEST IT, as long as you are careful',
      'In NOT MINE TO TEST, and it stays there'],
    answer: 3,
    feedback: [
      'Finding a claim in a book does not make it checked, and it is still not yours.',
      'Being unanswered hands it to people who can test it safely, not to you.'
    ,
      'Careful does not make it yours. Those tests need doctors and laboratories.',
      null],
    why: 'That pile has existed since Module 8 and nothing this year has moved it.'
  },
  {
    id: 't-hbm1603i',
    lesson: 'hb-m16-03',
    prompt: 'Which of these questions could no measurement ever settle?',
    choices: [
      'How tall is the corn on 1 April?'
    ,
      'How many days until the ginger sprouts?',
      'Which container holds the most soil?',
      'Which of my four plants is the nicest?'],
    answer: 3,
    feedback: [
      'A ruler and a date settle that one completely.'
    ,
      'Days are countable, so a calendar settles that one.',
      'Soil can be weighed or poured into a jug, so that is measurable.',
      null],
    why: 'Nicest is a judgement, and no ruler in the world has ever measured one.'
  },
  {
    id: 't-hbm1603j',
    lesson: 'hb-m16-03',
    prompt: 'Why look up what is already known before designing a test of your own?',
    choices: [
      'Because looking up is always more accurate than testing',
      'So you do not spend five weeks rediscovering somebody else\'s answer',
      'Because books are the only place real answers live',
      'So you can copy the method exactly as it was published'
    ],
    answer: 1,
    feedback: [
      'Testing your own pots answers things no book ever could.',
      null,
      'Your own containers hold answers no book contains.',
      'Copying a method is often sensible, and it is not the reason to look first.'
    ],
    why: 'Knowing what is already settled is how you spend your weeks on the part that is not.'
  },

  // =========================================================================
  // LESSON 94 · hb-m16-04 · Designing your own investigation
  // =========================================================================
  {
    id: 't-hbm1604a',
    lesson: 'hb-m16-04',
    prompt: 'Which of these is NOT one of the five lines a design needs?',
    choices: [
      'The one thing you change',
      'The group you leave alone',
      'The result you are hoping for',
      'How many plants you will measure'
    ],
    answer: 2,
    feedback: [
      'That is the variable, and it is the first line on the sheet.',
      'That is the control group, and without it nothing can be compared.',
      null,
      'That is the sample size, and it decides how easily luck can fool you.'
    ],
    why: 'What you hope for is not part of a design. What you predict is, and it goes in pen.'
  },
  {
    id: 't-hbm1604b',
    lesson: 'hb-m16-04',
    prompt: 'What does a control group give you that a single treated group cannot?',
    choices: [
      'Something to compare against',
      'A larger number of plants in total',
      'A second chance if the first group fails',
      'Permission to change two things at once'
    ],
    answer: 0,
    feedback: [
      null,
      'More plants help, and a spare group with no job would not be a control.',
      'A control is not a backup. It runs at the same time and stays untouched.',
      'Nothing ever gives you permission to change two things at once.'
    ],
    why: 'Without a comparison, any number you get is just a number rather than a difference.'
  },
  {
    id: 't-hbm1604c',
    lesson: 'hb-m16-04',
    prompt: 'Why is the prediction written in pen before anything is set up?',
    choices: [
      'Because pen is easier to read than pencil',
      'So you cannot quietly change it once you see the numbers',
      'Because pencil fades outdoors within a few weeks',
      'So the sheet looks tidy when somebody reads it'
    ],
    answer: 1,
    feedback: [
      'Readability is not the reason, and both are readable enough.',
      null,
      'Fading is a real nuisance and it is not why this rule exists.',
      'Tidiness has never protected anybody from fooling themselves.'
    ],
    why: 'A prediction you can still edit afterwards was never a prediction at all.'
  },
  {
    id: 't-hbm1604d',
    lesson: 'hb-m16-04',
    prompt: 'Your design says six plants in each group. What is that number called?',
    choices: [ 'The protocol','The variable', 'The baseline', 'The sample size'],
    answer: 3,
    feedback: [
      'The protocol is the whole written plan, not one number in it.'
    ,
      'The variable is the one thing you change, and it is not a count.',
      'The baseline is the first measurement, taken before anything changes.',
      null],
    why: 'Sample size is the first number a careful reader hunts for in anybody\'s design.'
  },
  {
    id: 't-hbm1604e',
    lesson: 'hb-m16-04',
    prompt: 'Why take the finish date off a real calendar instead of writing five weeks?',
    choices: [
      'Because a date on a calendar is harder to move once you see the numbers',
      'Because five weeks is always too short for plants',
      'Because a calendar is more accurate than counting is'
    ,
      'Because weeks are different lengths at different times of year'],
    answer: 0,
    feedback: [
      null,
      'Five weeks may be plenty, depending entirely on what you are measuring.',
      'Counting weeks is perfectly accurate. It is just easier to reinterpret.'
    ,
      'Every week is seven days, and that is not the reason.'],
    why: 'A real date is a promise to yourself that you made before the plants had an opinion.'
  },
  {
    id: 't-hbm1604f',
    lesson: 'hb-m16-04',
    prompt: 'What goes in the box marked WHAT WOULD MAKE ME DROP IT?',
    choices: [
      'The person who could take over the test'
    ,
      'The reason you might run out of time',
      'The result that would make you give up your own idea',
      'The weather that would ruin the containers'],
    answer: 2,
    feedback: [
      'Who runs it is useful and it is not what this box is for.'
    ,
      'Running out of time stops the test. It does not settle the question.',
      null,
      'Weather is a problem to plan around, not a result to accept.'],
    why: 'Agreeing what losing looks like, in advance, is what stops you explaining every awkward number away.'
  },
  {
    id: 't-hbm1604g',
    lesson: 'hb-m16-04',
    prompt: 'The groups look identical after five weeks, so you quietly plan three more. What is that?',
    choices: [
      'Patience, which every scientist needs',
      'Replication, which is exactly what scientists do',
      'Moving the finish line after seeing the score',
      'A better test, because longer is always better'
    ],
    answer: 2,
    feedback: [
      'Patience is choosing five weeks and then sitting through all five of them.',
      'Replication means running the whole thing again from the start, which is different.',
      null,
      'Longer chosen after you saw the numbers is not more evidence.'
    ],
    why: 'A rule you rewrite once you have seen the numbers was never a rule.'
  },
  {
    id: 't-hbm1604h',
    lesson: 'hb-m16-04',
    prompt: 'You put the night pot outside and the morning pot on the kitchen sill. What have you done?',
    choices: [
      'Added a second change, so no result can be trusted',
      'Improved the test, because now one pot is easy to watch',
      'Created a control group without meaning to'
    ,
      'Nothing, because both pots still get watered'],
    answer: 0,
    feedback: [
      null,
      'Watching one pot more closely is another difference, not an improvement.',
      'A control group is a plan, never an accident.'
    ,
      'Both get watered, and only one of them gets weather, wind and full daylight.'],
    why: 'Two things changed, so any difference at the end could belong to either of them.'
  },
  {
    id: 't-hbm1604i',
    lesson: 'hb-m16-04',
    prompt: 'What is a protocol?',
    choices: [
      'The first measurement, taken before anything changes',
      'The group of plants you leave alone',
      'The number of plants in each group'
    ,
      'The written plan for exactly how a test will be run'],
    answer: 3,
    feedback: [
      'That is the baseline, and it is one measurement inside the protocol.',
      'That is the control group, and the protocol says what happens to it.',
      'That is the sample size, which is one line of the protocol.'
    ,
      null],
    why: 'A protocol is what lets a stranger run your test without asking you anything.'
  },
  {
    id: 't-hbm1604j',
    lesson: 'hb-m16-04',
    prompt: 'Your design would need somebody to eat or drink something. What happens to that design?',
    choices: [
      'It runs, as long as a grown-up is watching closely',
      'It is not a design you may run',
      'It runs, as long as the amount is very small',
      'It runs, as long as you write the result down carefully'
    ],
    answer: 1,
    feedback: [
      'Watching does not make that test yours, and it never has.',
      null,
      'A small amount is still an amount, which is the whole of Module 13.',
      'Careful recording of a test you should not run does not rescue it.'
    ],
    why: 'Tests on what a plant does to a person or an animal belong to doctors and laboratories.'
  },

  // =========================================================================
  // LESSON 95 · hb-m16-05 · Presenting what you found
  // =========================================================================
  {
    id: 't-hbm1605a',
    lesson: 'hb-m16-05',
    prompt: 'What are the four parts of an honest report, in order?',
    choices: [
      'What I found, how I know, what I am unsure about, what next',
      'My question, my guess, my answer, my opinion',
      'What I did, how long it took, what went wrong, who to blame'
    ,
      'What I found, why it matters, who helped, what I enjoyed'],
    answer: 0,
    feedback: [
      null,
      'An opinion at the end undoes the work the numbers just did.',
      'Blame is not a section, and no report has ever needed one.'
    ,
      'Enjoyment is real and it is not a part of a report anybody can check.'],
    why: 'The second part lets a stranger check you, and the third is what makes them trust you.'
  },
  {
    id: 't-hbm1605b',
    lesson: 'hb-m16-05',
    prompt: 'Somebody presents a result and only says that it definitely worked. What do you ask for first?',
    choices: [
      'A photograph of the plants at the end',
      'Her promise that she did it all properly',
      'The method and the numbers',
      'Her opinion about why it worked so well'
    ],
    answer: 2,
    feedback: [
      'A photograph of the winners says nothing about how the winners were chosen.',
      'Everybody promises. A promise is not something anybody can check.',
      null,
      'Why it worked comes after whether it worked, and that is still open.'
    ],
    why: 'Without the method and the numbers, a result is a claim wearing a result\'s clothes.'
  },
  {
    id: 't-hbm1605c',
    lesson: 'hb-m16-05',
    prompt: 'One of your containers caught more wind, and nobody else noticed. What do you do?',
    choices: [
      'Leave it out, because the result is cleaner without it',
      'Put it in, because it changes how far the result can be trusted',
      'Leave it out, because nobody would ever find out',
      'Put it in only if somebody asks you about the wind'
    ],
    answer: 1,
    feedback: [
      'A clean result you know is dirty is the one thing you must not present.',
      null,
      'Being unlikely to be caught is not a standard anybody works to.',
      'Waiting to be asked means hoping nobody does, which is hiding it.'
    ],
    why: 'The audience needs your weaknesses in order to judge your strengths honestly.'
  },
  {
    id: 't-hbm1605d',
    lesson: 'hb-m16-05',
    prompt: 'What does it mean to replicate somebody\'s investigation?',
    choices: [
      'To agree with their conclusion in public',
      'To repeat their result to other people'
    ,
      'To copy their write-up in your own words',
      'To run the same test yourself and see whether you get the same answer'],
    answer: 3,
    feedback: [
      'Agreeing is an opinion. Replicating is work.',
      'Repeating a claim is how claims spread, not how they get checked.'
    ,
      'Copying the words changes nothing about whether the result is true.',
      null],
    why: 'A result nobody can repeat is a result nobody should rely on.'
  },
  {
    id: 't-hbm1605e',
    lesson: 'hb-m16-05',
    prompt: 'What is a limitation?',
    choices: [
      'A rule about how long a test may run',
      'A mistake somebody else found after you finished',
      'The smallest number your ruler can measure'
    ,
      'A weak spot in your own test that you point out yourself'],
    answer: 3,
    feedback: [
      'Length is part of the design, and it is decided long before the report.',
      'It counts as a limitation whether or not anybody else spotted it.',
      'That is a real problem with equipment, and it is not what the word means.'
    ,
      null],
    why: 'Naming your own weak spots tells the reader exactly how far your result can be pushed.'
  },
  {
    id: 't-hbm1605f',
    lesson: 'hb-m16-05',
    prompt: 'Why does saying what you are unsure about make people trust you more?',
    choices: [
      'Because it makes you sound modest',
      'Because it shows you know where your result stops working',
      'Because nobody expects a child to be certain',
      'Because it stops anybody asking difficult questions'
    ],
    answer: 1,
    feedback: [
      'Sounding modest is a manner. This is about information.',
      null,
      'Your age has nothing to do with it, and the same rule holds for adults.',
      'It usually invites harder questions, and that is a good thing.'
    ],
    why: 'A person who marks the edge of their own knowledge can be trusted inside it.'
  },
  {
    id: 't-hbm1605g',
    lesson: 'hb-m16-05',
    prompt: 'Somebody asks a question you cannot answer. What is the right thing to say?',
    choices: [
      'Answer a different question that you can answer'
    ,
      'Give your best guess and move on quickly',
      'Say I do not know, and mean it',
      'Say the question is not really about your work'],
    answer: 2,
    feedback: [
      'Swapping the question is the oldest way of avoiding one.'
    ,
      'A guess handed over as an answer is the thing this whole module is against.',
      null,
      'Deciding which questions count is not something the presenter gets to do.'],
    why: 'I do not know is a complete answer, and writing the question down afterwards is the rest of it.'
  },
  {
    id: 't-hbm1605h',
    lesson: 'hb-m16-05',
    prompt: 'Under HOW I KNOW, why show the actual numbers rather than a summary of them?',
    choices: [
      'So people can look for themselves instead of taking your word',
      'Because a summary takes longer to write out',
      'Because a summary is usually wrong'
    ,
      'Because numbers look more impressive on a board'],
    answer: 0,
    feedback: [
      null,
      'That is not why, and a summary is usually quicker to write.',
      'A summary can be perfectly correct and still hide what a reader needs.'
    ,
      'Looking impressive is not a reason to do anything in a report.'],
    why: 'A summary is your reading of the numbers, and the audience is entitled to their own.'
  },
  {
    id: 't-hbm1605i',
    lesson: 'hb-m16-05',
    prompt: 'Why do scientists share their results instead of keeping them?',
    choices: [
      'So nobody else wastes time on the same question'
    ,
      'So other people can repeat the work and check it',
      'So they are remembered after they die',
      'Because sharing is required by every country\'s law'],
    answer: 1,
    feedback: [
      'Somebody else repeating your question is exactly what you want.'
    ,
      null,
      'Some become famous, and fame is not what publishing is for.',
      'Publishing is a habit of the trade rather than a law.'],
    why: 'A finding that nobody outside your head can check is not yet part of what is known.'
  },
  {
    id: 't-hbm1605j',
    lesson: 'hb-m16-05',
    prompt: 'Somebody in your audience asks what one of your plants does to a person. What do you say?',
    choices: [
      'Say you are not sure, and offer your best guess',
      'Say nothing at all and move on to the next question'
    ,
      'Tell them what you have read, and say where you read it',
      'Say that you do not answer that question, and that it belongs to a doctor'],
    answer: 3,
    feedback: [
      'A guess about what a plant does to a person is exactly the wrong thing to offer.',
      'Silence is not the same as naming the limit and naming who to ask.'
    ,
      'Naming your source does not make an untested claim safe to pass on.',
      null],
    why: 'Saying who the question belongs to is a full answer, and it is the professional one.'
  },

  // =========================================================================
  // LESSON 96 · hb-m16-06 · What a herbalist and a doctor both do
  // =========================================================================
  {
    id: 't-hbm1606a',
    lesson: 'hb-m16-06',
    prompt: 'Which of these is NOT something a herbalist and a doctor both do?',
    choices: [
      'Trust what people say without checking',
      'Say plainly where their knowledge stops'
    ,
      'Observe closely',
      'Keep records somebody else could read'],
    answer: 0,
    feedback: [
      null,
      'That is the fifth, and it is the hardest one to learn.'
    ,
      'Observing closely is the first of the five, and it starts every question.',
      'Records are the third, and they are what let another person check you.'],
    why: 'Taking a claim on trust is the opposite of asking what the evidence says.'
  },
  {
    id: 't-hbm1606b',
    lesson: 'hb-m16-06',
    prompt: 'Dr. Patricia Bath noticed a difference among her patients. What did she do next?',
    choices: [
      'She wrote a book about what she believed'
    ,
      'She told other doctors what she had seen',
      'She counted it, and then published what she found',
      'She waited to see whether anybody else noticed'],
    answer: 2,
    feedback: [
      'A book of beliefs is not the same as a paper full of counted numbers.'
    ,
      'Telling people is how a claim spreads, and it is not how one gets checked.',
      null,
      'Waiting for somebody else is exactly what almost everybody does.'],
    why: 'Plenty of people notice things. Going and counting is what turns noticing into evidence.'
  },
  {
    id: 't-hbm1606c',
    lesson: 'hb-m16-06',
    prompt: 'What is an ophthalmologist?',
    choices: [
      'A doctor who delivers babies',
      'A chemist who builds new medicines'
    ,
      'A doctor who treats eyes',
      'A scientist who studies plants'],
    answer: 2,
    feedback: [
      'That is a midwife or an obstetrician, which was Module 7.',
      'That is closer to Percy Julian in Module 13.'
    ,
      null,
      'That is a botanist, and this course has been full of them.'],
    why: 'Patricia Bath was an ophthalmologist, and her whole career started with what she saw in an eye clinic.'
  },
  {
    id: 't-hbm1606d',
    lesson: 'hb-m16-06',
    prompt: 'What is a referral?',
    choices: [
      'Sending a question on to somebody who knows more than you do',
      'Writing a question down instead of answering it',
      'Looking an answer up in a reference book'
    ,
      'Refusing to answer a question you find difficult'],
    answer: 0,
    feedback: [
      null,
      'Writing it down is a good habit, and it is not the same as passing it on.',
      'That is looking something up, which is useful and is a different thing.'
    ,
      'Refusing leaves the person stuck, while a referral tells them where to go.'],
    why: 'Knowing who a question belongs to is itself a skill, and careful people practise it.'
  },
  {
    id: 't-hbm1606e',
    lesson: 'hb-m16-06',
    prompt: 'A cousin asks what your turmeric would do for his sore knee. What does a careful person say?',
    choices: [
      'Refuse to talk about plants with him at all'
    ,
      'Offer him a small amount, because a small amount is harmless',
      'Repeat what a book claims, so the book carries the responsibility',
      'Say it is a doctor\'s question, then tell him what you do know'],
    answer: 3,
    feedback: [
      'Knowing your limits is not silence. You know a great deal about that plant.'
    ,
      'A small amount is still an amount, and the amount was the whole of Module 13.',
      'Repeating a claim does not hand the responsibility to somebody else.',
      null],
    why: 'What a plant does to a person is not yours to decide, and saying so is the professional answer.'
  },
  {
    id: 't-hbm1606f',
    lesson: 'hb-m16-06',
    prompt: 'What separates a person doing science from a person with a strong opinion?',
    choices: [
      'The scientist feels more strongly about the question',
      'The scientist counts, writes it down and lets others check',
      'The scientist has been to university',
      'The scientist noticed it first'
    ],
    answer: 1,
    feedback: [
      'Strength of feeling has never made a claim more likely to be true.',
      null,
      'Training helps enormously, and a degree is not evidence about this question.',
      'Many people notice. Almost nobody goes and counts.'
    ],
    why: 'Counting and recording is what turns a thing you noticed into a thing anybody can check.'
  },
  {
    id: 't-hbm1606g',
    lesson: 'hb-m16-06',
    prompt: 'What is a record, as this course has used the word all year?',
    choices: [
      'Observations kept in date order that somebody else could read',
      'The best result you got out of a whole season',
      'A number written down at the end of a test',
      'Anything you can still remember clearly'
    ],
    answer: 0,
    feedback: [
      null,
      'That is the everyday meaning of the word, and it is not this one.',
      'One number is an entry. A record is the whole run of them.',
      'Memory is precisely what a record exists to replace.'
    ],
    why: 'Date order and readability by a stranger are what make a pile of notes into a record.'
  },
  {
    id: 't-hbm1606h',
    lesson: 'hb-m16-06',
    prompt: 'Which of these is evidence rather than a story?',
    choices: [
      'A photograph of the tallest corn plant in the container'
    ,
      'Gigi remembers the garlic doing well in the blue bucket',
      'Ten leaves measured weekly for five weeks, written down as you went',
      'A neighbour saying her tomatoes grew huge last year'],
    answer: 2,
    feedback: [
      'A picture of the winner tells you nothing about how it was chosen.'
    ,
      'A clear memory with no numbers is an anecdote, however true it feels.',
      null,
      'Huge is not a measurement, and nobody wrote anything down.'],
    why: 'Evidence is careful observations, written down, that another person could check.'
  },
  {
    id: 't-hbm1606i',
    lesson: 'hb-m16-06',
    prompt: 'Why does the limits card go on the FRONT of your field guide?',
    choices: [
      'Because a guide has to open with a warning'
    ,
      'So it is the first thing anybody reads',
      'Because the front cover was empty anyway',
      'So the pages inside stay clean'],
    answer: 1,
    feedback: [
      'It is not a warning. It is a statement of what you do and do not answer.'
    ,
      null,
      'The front already carries your name and the year.',
      'A card on the front protects nothing inside the binder.'],
    why: 'Where your knowledge stops belongs at the start, not buried at the back.'
  },
  {
    id: 't-hbm1606j',
    lesson: 'hb-m16-06',
    prompt: 'It is the last lesson of the year. What is the rule about the four containers?',
    choices: [
      'The rule ends with the school year',
      'Anything you grew yourself is safe to taste',
      'One taste is allowed to celebrate the last day'
    ,
      'Nothing is tasted without a grown-up, and that has not changed'],
    answer: 3,
    feedback: [
      'The rule was never about the calendar, and it does not expire.',
      'Growing it yourself tells you where it came from, and nothing else.',
      'A celebration is not a reason, and there are no exceptions to this one.'
    ,
      null],
    why: 'Ninety-six lessons have carried the same line, and it is now written on her own limits card.'
  }
];

export function itemsForLesson(lessonId) {
  return HERBALISM_M16_BANK.filter((q) => q.lesson === lessonId);
}

export function itemsForLessons(lessonIds) {
  const want = new Set(lessonIds);
  return HERBALISM_M16_BANK.filter((q) => want.has(q.lesson));
}

export default HERBALISM_M16_BANK;
