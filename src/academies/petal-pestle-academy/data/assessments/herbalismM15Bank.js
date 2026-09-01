// ---------------------------------------------------------------------------
// HERBALISM & BOTANY — MODULE 15 QUESTION BANK
// Black Women in Medicine and Botany · Lessons 85–90 · Quarter 4, Weeks 5 and 6
//
// Ten questions per lesson, sixty in all. These are NOT asked at the end of a
// lesson. They are the pool the Day 4 weekly test draws from: three lessons at
// ten questions is a thirty-question pool, and buildWeeklyTest takes eight.
// They also feed the morning warm-up and the extra practice the practice gate
// serves when she misses more than one on a lesson check.
//
//   Week 5 pool — hb-m15-01, hb-m15-02, hb-m15-03  (30 questions)
//   Week 6 pool — hb-m15-04, hb-m15-05, hb-m15-06  (30 questions)
//
// Field shape matches src/data/assessments/herbalismM1Bank.js exactly: id,
// lesson, prompt, choices (four, all different), answer (0-3), feedback (four
// entries, null in the correct slot, a real sentence in every other), and why
// (never blank — it is what the review screen shows).
//
// ---- DISTRACTORS ----
//
// Where the payload is vocabulary, the wrong choices are the OTHER words from
// this module. Where the payload is a person or a date, the distractors are the
// OTHER people and dates from these same six lessons — so a miss on Crumpler
// that lands on Cole names exactly which of the six has not landed yet, and the
// feedback says which one it actually was. Nothing here is filler.
//
// ---- ACCURACY. READ THIS BEFORE ADDING A QUESTION HERE. ----
//
// Every name, date, institution and claim in these sixty questions comes from
// the sources listed in the header of m15Lessons.js, which were read for this
// module rather than recalled. If you add a question, source it the same way.
// Getting a fact wrong about one of these women, in a lesson written for a
// Black girl who says she wants to be a doctor, is the worst thing this file
// could do. Where sources disagreed, the module dropped the detail rather than
// picking a side, and no dropped detail is quietly reintroduced here.
//
// ---- SAFETY ----
//
// Illness in these sixty questions is what doctors study and treat, and never
// anything Azianna could act on. No plant is for anything. No remedy appears.
// No amount of any substance is aimed at a person anywhere in this file. The
// measured quantities are grams of cornflour and salt on a kitchen scale,
// spoons of water on seeds in a dish, and centimetres on a dropped ruler.
//
// Six questions test the safety and judgement line on purpose and should never
// be cut: t-hbm1501j, t-hbm1502j, t-hbm1503j, t-hbm1504j, t-hbm1505j and
// t-hbm1506j. Between them they check that she knows reading about medicine is
// not practising it, that a crowded room is nobody's fault, that a sample is
// not food, that you never experiment on the plants you are growing, who holds
// the blunt points, and who designs and gives a vaccine.
//
// ---- READING BAR ----
//
// Quarter 4 caps: prompts up to sixteen words a sentence, answer choices up to
// fifteen words, long-word rate up to ten percent. Written to sit inside those
// and clearly above Quarter 3. The long subject words — physician, prevention,
// dispensary, overcrowding, cholesterol, chemotherapy, hydrocephalus,
// immunologist, cyanobacteria — live mostly in the choices and the feedback and
// each carries a glossary card in the lesson. Add them to the SUBJECT exemption
// set in scripts/check-assessment.mjs when this merges.
// ---------------------------------------------------------------------------

export const HERBALISM_M15_BANK = [
  // =========================================================================
  // LESSON 85 · hb-m15-01 · The first: Rebecca Lee Crumpler
  // =========================================================================
  {
    id: 't-hbm1501a',
    lesson: 'hb-m15-01',
    prompt: 'In which year did Rebecca Lee Crumpler earn her medical degree?',
    choices: ['1852', '1864', '1867', '1883'],
    answer: 1,
    feedback: [
      '1852 is when she moved to Charlestown and began working as a nurse.',
      null,
      '1867 is the year Rebecca Cole earned hers, three years later.',
      '1883 is the year her book was published, long after the degree.'
    ],
    why: 'The college voted her the degree on the first of March in 1864, and no Black woman in America had one before.'
  },
  {
    id: 't-hbm1501b',
    lesson: 'hb-m15-01',
    prompt: 'What was Crumpler doing between 1852 and 1860, before any college took her?',
    choices: [
      'Studying at a medical college in another country',
      'Teaching music to children in Washington',
      'Running a dispensary of her own in Brooklyn'
    ,
      'Working as a nurse beside doctors, because no nursing school existed'],
    answer: 3,
    feedback: [
      'She trained in Massachusetts, and there was no earlier college anywhere.',
      'That was Susan McKinney Steward, who taught music before medicine.',
      'Steward practised in Brooklyn. Crumpler was in Massachusetts and Virginia.'
    ,
      null],
    why: 'Eight years of real work is what got the doctors who watched her to recommend her.'
  },
  {
    id: 't-hbm1501c',
    lesson: 'hb-m15-01',
    prompt: 'Why did Crumpler move to Richmond in 1865?',
    choices: [
      'Because slavery had ended and thousands of freed people needed care',
      'Because a college in Virginia had offered her a teaching post',
      'Because her book was about to be published there'
    ,
      'Because the weather in Boston was making her unwell'],
    answer: 0,
    feedback: [
      null,
      'She went to work with the Freedmen\'s Bureau, not to teach.',
      'The book came out eighteen years later, and in Boston.'
    ,
      'Nothing in the record says that, and she returned to Boston later anyway.'],
    why: 'She wrote that she had access each day to a very large number of people in a population of over thirty thousand.'
  },
  {
    id: 't-hbm1501d',
    lesson: 'hb-m15-01',
    prompt: 'Who did Crumpler dedicate A Book of Medical Discourses to?',
    choices: [
      'The college that had admitted her in 1860',
      'Other physicians, so they would take her seriously',
      'Nurses and mothers, who did the daily caring',
      'The Freedmen\'s Bureau, which had employed her'
    ],
    answer: 2,
    feedback: [
      'The college appears nowhere in the dedication.',
      'She had good reason to want that, and it is not who she named.',
      null,
      'She worked with the Bureau in Richmond, and the dedication is not to it.'
    ],
    why: 'She wrote for the people who look after children every day, which is exactly what prevention needs.'
  },
  {
    id: 't-hbm1501e',
    lesson: 'hb-m15-01',
    prompt: 'What does prevention mean in medicine?',
    choices: [
      'Stopping a patient from seeing another doctor',
      'Writing down everything that happens in a hospital'
    ,
      'Care given before somebody becomes ill',
      'Care given only once somebody is very ill'],
    answer: 2,
    feedback: [
      'That is not medicine at all, and no doctor does it.',
      'Records matter, and keeping them is not what prevention means.'
    ,
      null,
      'That is treatment, which is the thing prevention tries to make unnecessary.'],
    why: 'Most of Crumpler\'s book is about keeping a child well rather than about treating a child who is already ill.'
  },
  {
    id: 't-hbm1501f',
    lesson: 'hb-m15-01',
    prompt: 'What was a doctress of medicine?',
    choices: [
      'The title her college wrote on a degree it gave a woman',
      'A doctor who was only allowed to treat children',
      'Somebody who had written a medical book'
    ,
      'A nurse who had worked for at least eight years'],
    answer: 0,
    feedback: [
      null,
      'She treated women and children by choice, and no rule required it.',
      'She wrote her book nineteen years after the degree.'
    ,
      'Nursing was not a degree at all in 1864, which was part of the problem.'],
    why: 'It is the old word the New England Female Medical College used, and it names a full medical degree.'
  },
  {
    id: 't-hbm1501g',
    lesson: 'hb-m15-01',
    prompt: 'What was the Freedmen\'s Bureau?',
    choices: [
      'A college that trained Black doctors in Virginia'
    ,
      'A hospital in Boston for women and children',
      'A club where doctors argued about new treatments',
      'The office set up after the Civil War to help newly freed people'],
    answer: 3,
    feedback: [
      'It employed doctors. It did not train them.'
    ,
      'Crumpler practised in Boston too, and that is not what the Bureau was.',
      'That describes something more like the oncology society founded in 1964.',
      null],
    why: 'It is why there was medical work in Richmond in 1865 for a doctor willing to go.'
  },
  {
    id: 't-hbm1501h',
    lesson: 'hb-m15-01',
    prompt: 'A doctor sees forty patients a day. Her book sits in a thousand kitchens. What does that show?',
    choices: [
      'That writing is easier work than seeing patients is',
      'That a written record reaches further than one person\'s hands can',
      'That patients would rather read than be examined',
      'That books were the only way anybody learned in 1883'
    ],
    answer: 1,
    feedback: [
      'Nothing about writing a medical book in 1883 was easy.',
      null,
      'Nobody prefers a book to a doctor, and most of them had no doctor.',
      'Most learning still passed by word of mouth, which is exactly the problem.'
    ],
    why: 'One doctor is in one room at a time, and a book is in every room that owns a copy.'
  },
  {
    id: 't-hbm1501i',
    lesson: 'hb-m15-01',
    prompt: 'Crumpler died in 1895 and a headstone was placed on her grave in 2020. How long was that?',
    choices: [ 'A hundred and twenty five years', 'A hundred and eighty nine years','Twenty five years', 'Sixty four years'],
    answer: 0,
    feedback: [
      null,
      'A hundred and eighty nine years is her birth in 1831 to 2020.'
    ,
      'Check the subtraction again, and use the two years on your timeline.',
      'Sixty four years is how long she lived, from 1831 to 1895.'],
    why: 'That gap is the longest empty stretch on her timeline, and she drew it herself.'
  },
  {
    id: 't-hbm1501j',
    lesson: 'hb-m15-01',
    prompt: 'You have read about a doctor and written a page for a nurse or a mother. What can you now do?',
    choices: [
      'Fill in a prescription the way a pharmacist would'
    ,
      'Tell a friend what to take when she feels unwell',
      'Write down ideas about keeping well, and treat nobody at all',
      'Decide what a family member should be given'],
    answer: 2,
    feedback: [
      'A pharmacist trains for years and works from a doctor\'s written order.'
    ,
      'Never. Nothing in this course is ever an instruction about a person.',
      null,
      'That belongs to a doctor and a pharmacist, and it is not a job for you.'],
    why: 'Reading about medicine is how you begin. Practising it is a job you grow into, and years away.'
  },

  // =========================================================================
  // LESSON 86 · hb-m15-02 · Rebecca Cole and Susan McKinney Steward
  // =========================================================================
  {
    id: 't-hbm1502a',
    lesson: 'hb-m15-02',
    prompt: 'Rebecca Cole earned her medical degree in 1867. Which Black woman doctor in America was she?',
    choices: ['The first', 'The second', 'The third', 'The fifth'],
    answer: 1,
    feedback: [
      'Rebecca Lee Crumpler was first, three years earlier in 1864.',
      null,
      'The third was Susan McKinney Steward, in New York.',
      'Nothing in the record puts her fifth, and the first three are well documented.'
    ],
    why: 'Crumpler in 1864, Cole in 1867, Steward in 1870, and that order is worth knowing by heart.'
  },
  {
    id: 't-hbm1502b',
    lesson: 'hb-m15-02',
    prompt: 'Susan McKinney Steward was the first Black woman physician in which state?',
    choices: [ 'Ohio','Massachusetts', 'Pennsylvania', 'New York'],
    answer: 3,
    feedback: [
      'She worked in Ohio much later, at Wilberforce University.'
    ,
      'Massachusetts is where Crumpler trained and practised.',
      'Pennsylvania is where Cole was born and took her degree.',
      null],
    why: 'She was the third Black woman in the country to earn a medical degree and the first in New York State.'
  },
  {
    id: 't-hbm1502c',
    lesson: 'hb-m15-02',
    prompt: 'What did a sanitary visitor actually do?',
    choices: [
      'Cleaned wards between operations',
      'Carried medicines from a pharmacy to houses'
    ,
      'Waited in a clinic for patients to arrive',
      'Went into homes to see how people were living'],
    answer: 3,
    feedback: [
      'Cleaning matters in a hospital, and that is not what the title meant.',
      'A dispensary handed things over. A sanitary visitor went out looking.'
    ,
      'That is the opposite of the job, and it is why the job was invented.',
      null],
    why: 'Cole could only argue that the conditions were the cause because she had gone and counted them.'
  },
  {
    id: 't-hbm1502d',
    lesson: 'hb-m15-02',
    prompt: 'What did Rebecca Cole argue was making people in poor districts ill?',
    choices: [
      'Something inside the bodies of the people who lived there',
      'The crowding, the damp and the bad air in the buildings',
      'Bad luck, which nobody could do anything about',
      'The weather, which changed from street to street'
    ],
    answer: 1,
    feedback: [
      'That is exactly the idea she spent her career arguing against.',
      null,
      'She was pointing at something measurable, which is the opposite of luck.',
      'Weather does not change from one street to the next, and the illness did.'
    ],
    why: 'She had been inside the rooms, so she could name the cause and ask for laws about air space.'
  },
  {
    id: 't-hbm1502e',
    lesson: 'hb-m15-02',
    prompt: 'What was a dispensary?',
    choices: [
      'A college for women who wanted to be physicians',
      'An office that recorded how many people had died'
    ,
      'A place where people who could not pay a doctor could still be seen',
      'A room where medicines were made from plants'],
    answer: 2,
    feedback: [
      'That is a medical college, which is where Steward trained.',
      'That is a records office, and it treated nobody.'
    ,
      null,
      'Preparing medicine happened there too, and that is not what the word names.'],
    why: 'Steward helped found one because skill helps nobody who cannot reach it.'
  },
  {
    id: 't-hbm1502f',
    lesson: 'hb-m15-02',
    prompt: 'Which word names far more people in a space than it has room or air for?',
    choices: [ 'Overcrowding', 'Public health','Dispensary', 'Conditions'],
    answer: 0,
    feedback: [
      null,
      'Public health means looking after whole groups of people at once.'
    ,
      'A dispensary is a place people go to be seen.',
      'Conditions is the whole set of them, and this is one of them.'],
    why: 'It is the one condition Cole named most often, and she asked for a law about it.'
  },
  {
    id: 't-hbm1502g',
    lesson: 'hb-m15-02',
    prompt: 'What did Susan McKinney Steward do before she went to medical school?',
    choices: [
      'Nursed under doctors for eight years',
      'Played the organ and taught music',
      'Ran a dispensary in Philadelphia',
      'Studied chemistry at Queens College'
    ],
    answer: 1,
    feedback: [
      'That was Crumpler, in Massachusetts, from 1852.',
      null,
      'Cole opened a directory for women and children in Philadelphia.',
      'Queens College and chemistry belong to Marie Maynard Daly.'
    ],
    why: 'She came to medicine from music, and still finished top of her class.'
  },
  {
    id: 't-hbm1502h',
    lesson: 'hb-m15-02',
    prompt: 'A town has one brilliant doctor and no clinic, no hospital and no dispensary. What is missing?',
    choices: [
      'Better medicines, because a doctor cannot work without them'
    ,
      'Nothing, because a brilliant doctor is enough on her own',
      'More doctors, because one is never enough for a whole town',
      'A place people can reach and afford, so the skill can be used'],
    answer: 3,
    feedback: [
      'Medicines matter, and they still have to be handed over somewhere.'
    ,
      'Skill nobody can get to helps nobody, which is what Steward built around.',
      'More doctors with nowhere to work leaves the same problem twice over.',
      null],
    why: 'Care needs a place as well as a person, which is why Steward built one instead of only working in one.'
  },
  {
    id: 't-hbm1502i',
    lesson: 'hb-m15-02',
    prompt: 'Twenty people in one damp room keep falling ill and five next door stay well. What do you check first?',
    choices: [
      'How crowded, damp and airless the room is next to the house',
      'Whether the twenty are simply weaker people',
      'How long each group has lived in the same street'
    ,
      'Whether the twenty complain more than the five do'],
    answer: 0,
    feedback: [
      null,
      'That is a guess about people, and Cole spent her life showing it was wrong.',
      'Worth knowing later, and it does not explain one room and not the other.'
    ,
      'Complaining is not a measurement and tells you nothing about a cause.'],
    why: 'Two groups differ in more than one way, so you measure the conditions before you blame anybody.'
  },
  {
    id: 't-hbm1502j',
    lesson: 'hb-m15-02',
    prompt: 'You have mapped a crowded room. Whose fault is the crowding, most of the time?',
    choices: [
      'The children, for taking up space'
    ,
      'The people sleeping there, who should have found somewhere better',
      'Nobody in the room, because most people cannot choose their housing',
      'The doctor, for not visiting more often'],
    answer: 2,
    feedback: [
      'That is not how anybody who studies conditions thinks about a family.'
    ,
      'Choosing costs money, and Cole knew exactly who had none.',
      null,
      'A doctor visiting more often does not add a window to the wall.'],
    why: 'A map of conditions is a record and not a judgement, and Cole asked for laws rather than blaming families.'
  },

  // =========================================================================
  // LESSON 87 · hb-m15-03 · Marie Maynard Daly and the chemistry of the body
  // =========================================================================
  {
    id: 't-hbm1503a',
    lesson: 'hb-m15-03',
    prompt: 'Marie Maynard Daly was the first Black American woman to earn a doctorate in what?',
    choices: [ 'Immunology','Medicine', 'Chemistry', 'Plant biology'],
    answer: 2,
    feedback: [
      'Kizzmekia Corbett\'s doctorate is in microbiology and immunology, in 2014.'
    ,
      'Crumpler was the first to earn a medical degree, in 1864.',
      null,
      'Beronda Montgomery earned hers in plant biology, in 2001.'],
    why: 'She finished it at Columbia in 1947, and no Black American woman had one in chemistry before.'
  },
  {
    id: 't-hbm1503b',
    lesson: 'hb-m15-03',
    prompt: 'What was Daly\'s doctorate research actually about?',
    choices: [
      'How an enzyme breaks down corn starch',
      'How cholesterol travels through an artery',
      'How DNA winds around histones',
      'How a plant senses the colour of light'
    ],
    answer: 0,
    feedback: [
      null,
      'That came much later, with Quentin Deming.',
      'The histone work came after her doctorate, at the Rockefeller Institute.',
      'That is Beronda Montgomery\'s subject, fifty years later.'
    ],
    why: 'Her first big piece of work was about the same starch your corn container is storing right now.'
  },
  {
    id: 't-hbm1503c',
    lesson: 'hb-m15-03',
    prompt: 'What is an enzyme?',
    choices: [
      'The part of a cell where DNA is kept',
      'A long chain of sugars a plant stores'
    ,
      'A fatty substance carried in the blood',
      'A protein that cuts or joins things without being used up'],
    answer: 3,
    feedback: [
      'That is the nucleus, which is a place rather than a compound.',
      'That is starch, which is the thing an enzyme acts on.'
    ,
      'That is cholesterol, which is not a protein at all.',
      null],
    why: 'Amylase is the enzyme in Daly\'s research, and it cuts long starch chains into short pieces.'
  },
  {
    id: 't-hbm1503d',
    lesson: 'hb-m15-03',
    prompt: 'What is a histone?',
    choices: [
      'The clear fluid the brain floats in'
    ,
      'A protein that DNA winds around inside a cell',
      'An enzyme that cuts starch into sugars',
      'A fatty substance found in arteries'],
    answer: 1,
    feedback: [
      'That belongs to Lesson 89 and the nervous system.'
    ,
      null,
      'That is amylase, and it works on food rather than on DNA.',
      'That is cholesterol, which she studied later with Quentin Deming.'],
    why: 'Daly worked out what those proteins are made of, which nobody had done before.'
  },
  {
    id: 't-hbm1503e',
    lesson: 'hb-m15-03',
    prompt: 'What is cholesterol?',
    choices: [
      'A fatty substance that travels in the blood',
      'A sugar that plants store in their seeds',
      'A signal that travels along a nerve'
    ,
      'A protein that DNA winds around'],
    answer: 0,
    feedback: [
      null,
      'That is starch, which is what Daly studied first.',
      'That is a nerve impulse, which belongs to the next lesson.'
    ,
      'That is a histone, and it is a protein rather than a fat.'],
    why: 'Daly and Deming studied how it is linked to blocked arteries and high blood pressure.'
  },
  {
    id: 't-hbm1503f',
    lesson: 'hb-m15-03',
    prompt: 'Why must a compound be separated out before it is measured?',
    choices: [
      'Because separating makes the compound stronger'
    ,
      'Because a mixture weighs more than its parts do',
      'Because a number from a mixture does not belong to any one thing',
      'Because mixtures are always dangerous to weigh'],
    answer: 2,
    feedback: [
      'Separating changes nothing about the compound except what is beside it.'
    ,
      'A mixture weighs exactly what its parts weigh together.',
      null,
      'Plenty of mixtures are perfectly safe. That is not the reason.'],
    why: 'A number only means something once you know which compound it belongs to.'
  },
  {
    id: 't-hbm1503g',
    lesson: 'hb-m15-03',
    prompt: 'You stir salt into water until you cannot see it. Where is the salt?',
    choices: [
      'Turned into water, so it no longer exists',
      'Spread through the water where you cannot see it',
      'Destroyed by the warmth of the water',
      'Sitting on the bottom in a layer too thin to see'
    ],
    answer: 1,
    feedback: [
      'Nothing turned into anything, which is why the saucer gets it back.',
      null,
      'Warm water dissolves salt faster and destroys none of it.',
      'It is spread all through, and the saucer experiment proves it.'
    ],
    why: 'Invisible does not mean gone, which is exactly why chemists weigh instead of looking.'
  },
  {
    id: 't-hbm1503h',
    lesson: 'hb-m15-03',
    prompt: 'You pour your jar through a coffee filter. What stays behind in the filter?',
    choices: [
      'Everything, including the water',
      'Nothing at all, because a filter only slows water down'
    ,
      'The salt only',
      'The sand and the cornflour'],
    answer: 3,
    feedback: [
      'The water passes through, which is the whole point of filtering.',
      'A filter catches whatever is too big to pass, and here that is two of the three.'
    ,
      'The salt is dissolved, so it goes straight through with the water.',
      null],
    why: 'A filter splits a mixture by size, and dissolved salt is far too small to be caught.'
  },
  {
    id: 't-hbm1503i',
    lesson: 'hb-m15-03',
    prompt: 'The saucer is dry the next day and there is white powder on it. What does that prove?',
    choices: [
      'That the filter had failed and let sand through',
      'That salt turns into powder when it is left alone'
    ,
      'That the water made new salt overnight',
      'That the salt was in the water the whole time'],
    answer: 3,
    feedback: [
      'Sand stayed in the filter, and it does not dissolve or reappear.',
      'It was always powder. It was only spread out where you could not see it.'
    ,
      'Water makes nothing. It only carried what was already there.',
      null],
    why: 'The water left and the salt could not, which is separating a mixture by letting one part go.'
  },
  {
    id: 't-hbm1503j',
    lesson: 'hb-m15-03',
    prompt: 'The powder on your saucer looks exactly like table salt. What do you do with it?',
    choices: [
      'Taste a little, since salt from the shaker is safe enough',
      'Weigh it, write the number down, and taste nothing',
      'Put it back in the salt pot for cooking later',
      'Rub a little on your hand to check it feels right'
    ],
    answer: 1,
    feedback: [
      'Never. Today it is a sample, and a sample is not food however familiar it looks.',
      null,
      'It has been through a jar, a filter and a saucer, so it goes down the drain.',
      'Nothing from an experiment is tested on a person, including you.'
    ],
    why: 'The rule that a sample is never food is exactly the habit that keeps a scientist safe.'
  },

  // =========================================================================
  // LESSON 88 · hb-m15-04 · Jane Cooke Wright
  // =========================================================================
  {
    id: 't-hbm1504a',
    lesson: 'hb-m15-04',
    prompt: 'What is a tissue culture?',
    choices: [
      'A list of every drug a hospital keeps in stock'
    ,
      'A careful drawing of cells seen under a microscope',
      'Living cells kept alive and growing in a dish',
      'A thin tube that carries a drug into the body'],
    answer: 2,
    feedback: [
      'That is a pharmacy list, and nothing in it is alive.'
    ,
      'A drawing is a record of cells and not the cells themselves.',
      null,
      'That is a catheter, which Wright also used, for a different problem.'],
    why: 'Wright grew cells from the patient\'s own tumour so the drugs could be tried on those exact cells.'
  },
  {
    id: 't-hbm1504b',
    lesson: 'hb-m15-04',
    prompt: 'Why did Wright test drugs on cells from the patient rather than on laboratory mice?',
    choices: [
      'Because cells from that patient answer the question about that patient',
      'Because mice cost more than a dish of cells does',
      'Because a mouse cannot become ill in the first place'
    ,
      'Because mice are much harder to keep alive than cells are'],
    answer: 0,
    feedback: [
      null,
      'Cost is real and it is not what changed the science here.',
      'Mice get ill, which is exactly why they were used before.'
    ,
      'Laboratories kept mice for a century, so difficulty was not the point.'],
    why: 'The closer the sample is to the person, the more the answer is worth to that person.'
  },
  {
    id: 't-hbm1504c',
    lesson: 'hb-m15-04',
    prompt: 'A drug kills the tumour cells in the dish. Why is the question still not settled?',
    choices: [
      'Because dish results are usually wrong',
      'Because a dish has no blood, no liver and no rest of a body',
      'Because the drug will have gone off before it reaches anybody',
      'Because one good result always has to be thrown away'
    ],
    answer: 1,
    feedback: [
      'A real dish result stays real, and the method exists because it is checkable.',
      null,
      'Storage is a real laboratory problem and it is not the reason here.',
      'A result is kept and then tested further, never thrown away.'
    ],
    why: 'A dish narrows the choices, and only a proper trial in people can finish the job.'
  },
  {
    id: 't-hbm1504d',
    lesson: 'hb-m15-04',
    prompt: 'In your two dishes of seeds, what makes the plain water dish the control?',
    choices: [
      'It has fewer seeds in it than the other dish does',
      'It is the one you expect to fail'
    ,
      'It was set up second, so it acts as a check',
      'Nothing about it was changed, so it shows what normal looks like'],
    answer: 3,
    feedback: [
      'Both dishes get ten seeds, which is what makes them comparable.',
      'You expect it to do well, and that is the point of comparing.'
    ,
      'The order you set them up in changes nothing about which is which.',
      null],
    why: 'Without something unchanged to compare against, a result means nothing at all.'
  },
  {
    id: 't-hbm1504e',
    lesson: 'hb-m15-04',
    prompt: 'In 1964 Jane Cooke Wright helped found the American Society of Clinical Oncology. How many founders were there?',
    choices: [ 'Seven', 'Twenty','Two', 'Four'],
    answer: 0,
    feedback: [
      null,
      'Twenty is far too many, and the founding group was small.'
    ,
      'Seven people founded it, and she was one of them.',
      'Seven is the number, and it is well recorded.'],
    why: 'Oncology is the part of medicine that studies and treats cancer, and she helped build the room it argues in.'
  },
  {
    id: 't-hbm1504f',
    lesson: 'hb-m15-04',
    prompt: 'Why did Wright develop a way to send drugs through a thin tube?',
    choices: [
      'To let a patient decide the amount for themselves'
    ,
      'To make the treatment cheaper for the hospital',
      'Because some tumours sit deep inside an organ and are hard to reach',
      'Because patients preferred tubes to tablets'],
    answer: 2,
    feedback: [
      'Doctors decide and measure that, and a patient never sets it.'
    ,
      'Cost was not the problem she was solving, and tubes are not cheap.',
      null,
      'Nothing in the record is about preference. It is about arriving.'],
    why: 'Working and arriving are two different problems, and the tube solves the second one.'
  },
  {
    id: 't-hbm1504g',
    lesson: 'hb-m15-04',
    prompt: 'Where did Jane Cooke Wright lead cancer research?',
    choices: [
      'Children\'s Hospital of Michigan',
      'The New York Infirmary for Women and Children'
    ,
      'The Harlem Hospital Cancer Research Foundation',
      'The Rockefeller Institute in New York'],
    answer: 2,
    feedback: [
      'That is where Alexa Canady was chief of neurosurgery.',
      'That is where Rebecca Cole gained her practical experience.'
    ,
      null,
      'That is where Marie Maynard Daly worked on histones.'],
    why: 'She joined her father there in 1949 and became its director in 1952.'
  },
  {
    id: 't-hbm1504h',
    lesson: 'hb-m15-04',
    prompt: 'Your salty dish and your plain dish sit in different rooms by mistake. What is wrong with the test?',
    choices: [
      'Two things now differ, so you cannot tell which one caused the result',
      'The seeds will not sprout at all in either room',
      'You only need to start again if the results look strange'
    ,
      'Nothing, because the water is still the only thing you changed'],
    answer: 0,
    feedback: [
      null,
      'They will very likely sprout. That is not the problem.',
      'You cannot decide a test is fair based on whether you like the answer.'
    ,
      'The rooms differ in light and warmth, so the water is no longer the only change.'],
    why: 'A fair test changes one thing, and Module 14 said so before this lesson ever did.'
  },
  {
    id: 't-hbm1504i',
    lesson: 'hb-m15-04',
    prompt: 'A hospital team tests a chemical against tumours. Who decides what a patient is given, and measures it?',
    choices: [
      'Anybody in the family who has read about it',
      'The scientist who first found the chemical'
    ,
      'The patient, who knows their own body best',
      'Doctors and pharmacists, who decide and measure everything'],
    answer: 3,
    feedback: [
      'Reading about something is not the same as being trained to give it.',
      'Finding a chemical and treating a person are two entirely different jobs.'
    ,
      'A patient can ask anything, and the deciding and measuring is not theirs.',
      null],
    why: 'Every real medicine is decided and measured by trained people, and never by anybody else.'
  },
  {
    id: 't-hbm1504j',
    lesson: 'hb-m15-04',
    prompt: 'You want to know whether salty water harms corn. Why not just water your own corn container with it?',
    choices: [
      'Because the container is too heavy to move'
    ,
      'Because you never run an experiment on the plant you are growing',
      'Because salt water cannot hurt a plant anyway',
      'Because corn is the only plant that dislikes salt'],
    answer: 1,
    feedback: [
      'Weight has nothing to do with whether a test is a good idea.'
    ,
      null,
      'Salt water can harm a plant badly, which is why the question is worth asking.',
      'Most plants struggle in salty water, so corn is not unusual.'],
    why: 'Test on twenty spare seeds first, which is exactly what Wright did with a piece of a tumour.'
  },

  // =========================================================================
  // LESSON 89 · hb-m15-05 · Alexa Canady, brain surgeon
  // =========================================================================
  {
    id: 't-hbm1505a',
    lesson: 'hb-m15-05',
    prompt: 'What three things make up the nervous system?',
    choices: [
      'The brain, the spinal cord and the nerves',
      'The skull, the backbone and the ribs',
      'The muscles, the bones and the joints'
    ,
      'The heart, the blood and the arteries'],
    answer: 0,
    feedback: [
      null,
      'Those are the bones that protect it, which is not the same as being it.',
      'Those move you, and only when a nerve tells them to.'
    ,
      'That system moves blood rather than signals.'],
    why: 'A neurosurgeon works on all three, which is why she has to know what every part does.'
  },
  {
    id: 't-hbm1505b',
    lesson: 'hb-m15-05',
    prompt: 'What is the spinal cord?',
    choices: [
      'The clear fluid the brain floats in',
      'The bone that protects the brain'
    ,
      'The thick cable of nerves running down inside your backbone',
      'A tube a surgeon puts in to drain fluid'],
    answer: 2,
    feedback: [
      'The fluid cushions the brain, and it carries no signals.',
      'That is the skull, which protects rather than carries.'
    ,
      null,
      'That is a shunt, and it is put in rather than grown.'],
    why: 'Almost every signal between your body and your brain passes through it.'
  },
  {
    id: 't-hbm1505c',
    lesson: 'hb-m15-05',
    prompt: 'Your hand pulls back from a hot pan before you feel any pain. Why?',
    choices: [
      'Your brain decided first and your hand was slow to obey',
      'The spinal cord sent the order out before your brain was told',
      'Your muscles decided by themselves without any signal',
      'Pain always arrives late for no particular reason'
    ],
    answer: 1,
    feedback: [
      'If the brain had decided first, the feeling would have arrived first too.',
      null,
      'Muscles only pull when a nerve tells them to, and they decide nothing.',
      'The lateness has a cause, and the cause is the length of the path.'
    ],
    why: 'A shorter path takes less time, so the reflex happens before the feeling catches up.'
  },
  {
    id: 't-hbm1505d',
    lesson: 'hb-m15-05',
    prompt: 'What happens in hydrocephalus?',
    choices: [
      'The spinal cord grows longer than the backbone',
      'Blood stops reaching one side of the brain'
    ,
      'A nerve stops carrying signals to the hand',
      'The clear fluid around the brain builds up instead of draining'],
    answer: 3,
    feedback: [
      'The cord does not outgrow the backbone, and that is not this condition.',
      'That is a problem with blood rather than with fluid.'
    ,
      'That is a different problem, and it is not what a shunt is for.',
      null],
    why: 'It is one of the conditions Alexa Canady operated on in children, and doctors treat it.'
  },
  {
    id: 't-hbm1505e',
    lesson: 'hb-m15-05',
    prompt: 'What is a shunt?',
    choices: [
      'A movement ordered by the spinal cord',
      'The fluid that cushions the brain'
    ,
      'A bundle of fibres carrying signals as electricity',
      'A thin tube that carries extra fluid somewhere else'],
    answer: 3,
    feedback: [
      'That is a reflex, and it moves a limb rather than a fluid.',
      'The fluid is what a shunt moves, not the shunt itself.'
    ,
      'That is a nerve, which is grown rather than fitted.',
      null],
    why: 'Canady shares a patent for one, and it drains fluid without letting gravity pull it too fast.'
  },
  {
    id: 't-hbm1505f',
    lesson: 'hb-m15-05',
    prompt: 'A child with a shunt lies down all night and stands up quickly. Why is that the difficult moment?',
    choices: [
      'Standing up makes the body produce far more fluid at once',
      'Gravity can pull fluid down the tube too fast once she is upright',
      'A shunt stops working completely whenever a person stands',
      'Fluid is only made at night and never in the daytime'
    ],
    answer: 1,
    feedback: [
      'The body makes that fluid steadily, and standing changes the rate not at all.',
      null,
      'It keeps working, and that is the problem. It can work too well for a moment.',
      'It is made all day and all night, which is why draining has to be steady.'
    ],
    why: 'That is exactly the problem the shunt Canady patented was built to solve.'
  },
  {
    id: 't-hbm1505g',
    lesson: 'hb-m15-05',
    prompt: 'In which year did Alexa Canady finish her neurosurgery training?',
    choices: ['1971', '1975', '1981', '1987'],
    answer: 2,
    feedback: [
      '1971 is when she finished her first degree, in zoology.',
      '1975 is when she earned her medical degree.',
      null,
      '1987 is when she became chief of neurosurgery at a children\'s hospital.'
    ],
    why: 'Finishing that training in 1981 made her the first Black woman neurosurgeon in the United States.'
  },
  {
    id: 't-hbm1505h',
    lesson: 'hb-m15-05',
    prompt: 'Your fingertip tells two blunt points apart at a smaller gap than your neck. Why?',
    choices: [
      'Nerve endings are packed closer together in a fingertip',
      'The neck has no nerves in it at all',
      'You were paying more attention during the fingertip test'
    ,
      'Fingertips are colder, so they feel more'],
    answer: 0,
    feedback: [
      null,
      'The neck has plenty. They are just spread further apart.',
      'Attention helps a little, and it does not explain a difference that large.'
    ,
      'Temperature changes how something feels, and not how finely you can place it.'],
    why: 'The more crowded the endings, the smaller the gap you can still tell apart.'
  },
  {
    id: 't-hbm1505i',
    lesson: 'hb-m15-05',
    prompt: 'Why must a neurosurgeon know exactly what each part of the brain does?',
    choices: [
      'Because a surgeon is tested on it every single year'
    ,
      'Because the body keeps no spare parts to swap in',
      'Because every brain is laid out completely differently',
      'Because the brain grows new parts to replace lost ones'],
    answer: 1,
    feedback: [
      'Doctors do keep learning, and that is not why this matters here.'
    ,
      null,
      'Brains vary a little, and the plan is much the same in everybody.',
      'It does not, which is exactly the reason for the care.'],
    why: 'Damage in one small place changes one particular thing, and nothing grows back to replace it.'
  },
  {
    id: 't-hbm1505j',
    lesson: 'hb-m15-05',
    prompt: 'In the two-point touch test, who holds the points and who chooses them?',
    choices: [
      'You do it alone, as long as you are careful',
      'Either of you, as long as the points are sharp enough to feel'
    ,
      'You hold them and Gigi guesses what she feels',
      'A grown-up blunts them, checks them and does all the touching'],
    answer: 3,
    feedback: [
      'Anything touching skin in this house is a grown-up job first.',
      'Sharp points are exactly what this test must never use.'
    ,
      'The whole test only works if the person feeling cannot see or predict it.',
      null],
    why: 'Blunt points, a grown-up doing the touching, and a light touch, because this measures feeling and is not a poke.'
  },

  // =========================================================================
  // LESSON 90 · hb-m15-06 · Kizzmekia Corbett, Beronda Montgomery, and now
  // =========================================================================
  {
    id: 't-hbm1506a',
    lesson: 'hb-m15-06',
    prompt: 'What is a virus?',
    choices: [
      'A package of instructions with a shape on the outside',
      'A protein that DNA winds around',
      'A green living thing that uses light'
    ,
      'A tiny animal that hunts cells'],
    answer: 0,
    feedback: [
      null,
      'That is a histone, which lives inside your own cells.',
      'That is cyanobacteria, which Beronda Montgomery studies.'
    ,
      'It does not hunt, and it is not really alive at all.'],
    why: 'The shape on the outside is the part your immune system can learn.'
  },
  {
    id: 't-hbm1506b',
    lesson: 'hb-m15-06',
    prompt: 'What does a vaccine show the body?',
    choices: [
      'A list of the illnesses going around this year',
      'A medicine that kills a virus already inside you'
    ,
      'A shape from the virus, without the virus doing anything',
      'A whole living virus, so the body can practise fighting'],
    answer: 2,
    feedback: [
      'A body cannot read, and it learns shapes instead.',
      'That would be a treatment, and a vaccine works before anything arrives.'
    ,
      null,
      'The point is to learn without the meeting, which is the opposite of that.'],
    why: 'Learning a shape in advance is far faster than learning it in the middle of a fight.'
  },
  {
    id: 't-hbm1506c',
    lesson: 'hb-m15-06',
    prompt: 'What is your immune system actually learning?',
    choices: [
      'Which country the germ came from'
    ,
      'The name of whatever made you ill',
      'A shape it can recognise again later',
      'How many germs arrived that day'],
    answer: 2,
    feedback: [
      'That matters to people tracking an outbreak, and not to your body.'
    ,
      'A body has no words, and names are for people.',
      null,
      'Counting matters to a scientist, and your body learns a shape.'],
    why: 'It is the whole reason a vaccine can work at all, because a shape can be shown safely.'
  },
  {
    id: 't-hbm1506d',
    lesson: 'hb-m15-06',
    prompt: 'What is the spike protein?',
    choices: [
      'The knob that sticks out of a coronavirus',
      'A protein that DNA winds around',
      'The fluid that cushions the brain'
    ,
      'A thin tube that delivers a drug'],
    answer: 0,
    feedback: [
      null,
      'That is a histone, from Lesson 87.',
      'That belongs to Lesson 89 and the nervous system.'
    ,
      'That is a catheter, from Lesson 88.'],
    why: 'It is the shape Corbett\'s team had to hold still so a body could learn it.'
  },
  {
    id: 't-hbm1506e',
    lesson: 'hb-m15-06',
    prompt: 'Why did the spike have to be locked into one shape before it could be used?',
    choices: [
      'Because a moving shape would break the needle',
      'Because it was too small to see unless it was held still',
      'Because a virus cannot be studied while it is alive'
    ,
      'Because it folds into a different shape, and the wrong shape teaches wrong'],
    answer: 3,
    feedback: [
      'Nothing about the needle depends on the shape of a protein.',
      'It is too small to see either way, and that is not the problem.',
      'A virus is not alive to begin with, so that is not the reason.'
    ,
      null],
    why: 'You can only learn a shape that stays the same long enough to be learned.'
  },
  {
    id: 't-hbm1506f',
    lesson: 'hb-m15-06',
    prompt: 'What was Kizzmekia Corbett\'s job at the vaccine research centre?',
    choices: [
      'She ran the hospital where patients were treated',
      'She was the scientific lead for the coronavirus vaccine team',
      'She was a student learning the work for the first time',
      'She wrote the rules that all vaccines have to follow'
    ],
    answer: 1,
    feedback: [
      'It is a research centre, and treating patients happens elsewhere.',
      null,
      'She finished her doctorate in 2014 and led a team afterwards.',
      'Rules like that are written by other parts of government.'
    ],
    why: 'She spent seven years there, and the first human trial started 66 days after the virus sequence was published.'
  },
  {
    id: 't-hbm1506g',
    lesson: 'hb-m15-06',
    prompt: 'What does Beronda Montgomery study?',
    choices: [
      'How plants and cyanobacteria sense light and respond to it',
      'How DNA is wound around proteins inside a nucleus',
      'How fluid drains from around a child\'s brain'
    ,
      'How cancer drugs reach tumours deep inside an organ'],
    answer: 0,
    feedback: [
      null,
      'That was Marie Maynard Daly\'s work on histones.',
      'That is Alexa Canady\'s field, in neurosurgery.'
    ,
      'That was Jane Cooke Wright\'s problem, twenty years earlier.'],
    why: 'A plant has no eyes and still measures its light, and she studies the machinery that does it.'
  },
  {
    id: 't-hbm1506h',
    lesson: 'hb-m15-06',
    prompt: 'You turn your corn container round and within days the stems lean the other way. What is happening?',
    choices: [
      'The draught from the window is pushing the stems over'
    ,
      'The plant remembers where the window used to be',
      'The plant is sensing where the light is now and growing towards it',
      'The plant is growing faster in every direction at once'],
    answer: 2,
    feedback: [
      'Move it away from any draught and it still leans, so air is not doing it.'
    ,
      'It responds to the light in front of it, not to the light that has gone.',
      null,
      'Faster growth everywhere gives you a bigger plant pointing nowhere.'],
    why: 'Sensing means measuring something outside yourself and changing what you do because of the answer.'
  },
  {
    id: 't-hbm1506i',
    lesson: 'hb-m15-06',
    prompt: 'What did all six women in this module have in common?',
    choices: [
      'They all trained at the same college',
      'They all found out how a living thing works, and wrote it down',
      'They all studied plants for a living'
    ,
      'They all worked in the same city'],
    answer: 1,
    feedback: [
      'Six different colleges, across six different decades.',
      null,
      'Only Montgomery studies plants, and the other five studied bodies.'
    ,
      'Boston, Philadelphia, Brooklyn, New York, Detroit and Boston again.'],
    why: 'Six subjects, one job: find out how something actually works, then write it down so it lasts.'
  },
  {
    id: 't-hbm1506j',
    lesson: 'hb-m15-06',
    prompt: 'Who designs a vaccine, and who gives one to a person?',
    choices: [
      'Anybody who has read enough about how they work',
      'The person receiving it decides both',
      'A pharmacist designs them and a family gives them'
    ,
      'Scientists design them and doctors and nurses give them'],
    answer: 3,
    feedback: [
      'Reading about something is never the same as being trained to make or give it.',
      'People can ask every question they like, and deciding is not theirs to do.',
      'Pharmacists prepare and check medicines, and they do not design vaccines.'
    ,
      null],
    why: 'This is a job to grow into, exactly like every other job in this module, and years away.'
  }
];

export function itemsForLesson(lessonId) {
  return HERBALISM_M15_BANK.filter((q) => q.lesson === lessonId);
}

export function itemsForLessons(lessonIds) {
  const want = new Set(lessonIds);
  return HERBALISM_M15_BANK.filter((q) => want.has(q.lesson));
}

export default HERBALISM_M15_BANK;
