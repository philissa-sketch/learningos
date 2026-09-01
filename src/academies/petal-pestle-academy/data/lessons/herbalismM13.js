// ---------------------------------------------------------------------------
// HERBALISM & BOTANY — MODULE 13 · FROM PLANT TO MEDICINE
// QUARTER 4 · WEEKS 1 AND 2 · LESSONS 73–78 of 96
//
//   hb-m13-01  W1 D1  Why plants make chemicals at all
//   hb-m13-02  W1 D2  Willow bark to aspirin
//   hb-m13-03  W1 D3  Finding the active compound
//   hb-m13-04  W2 D1  From a leaf to a pill
//   hb-m13-05  W2 D2  The dose makes the poison
//   hb-m13-06  W2 D3  What we still get from plants
//
// Built to /home/claude/LESSON-SPEC-Q3Q4.md (reading level) and
// /home/claude/LESSON-SPEC.md (everything else), to the shape of
// /home/claude/out/m11Lessons.js — its Quarter 3 predecessor — and written a
// full grade above it, because that is what Quarter 4 is for.
//
// ---- WHAT THIS MODULE IS, AND WHAT IT IS FLATLY NOT ----
//
// This module is the HISTORY AND SCIENCE OF HOW A PLANT BECOMES A DRUG.
// Chemistry, extraction, isolation, structure, synthesis, standardisation,
// testing, manufacture and record-keeping. Six lessons of how somebody DID
// this, over two hundred years, with names and dates that can be checked.
//
// It is never instructions. There is no dosing anywhere in these six lessons.
// No amount is ever framed as an amount for a person. No plant is ever "good
// for" anything. Nothing is a remedy. No sentence tells her to take, drink,
// chew or apply a plant for a symptom. Where a real drug is named — aspirin,
// quinine, digitalis, vincristine, paclitaxel, artemisinin — it is named as a
// manufactured, measured, tested product that doctors give, which is the exact
// opposite of the thing this course is guarding against.
//
// The masses in this module are laboratory masses in an experiment: cornflour
// pellets on a kitchen scale, salt in a beaker of water, food colouring in a
// dilution series. Every one of them sits beside a volume and a number, and
// none of them is anywhere near a human body.
//
// ---- LESSON 77 IS THE DELICATE ONE AND THE MOST IMPORTANT ONE ----
//
// Paracelsus and the dose-response principle. This lesson is deliberately built
// so that a ten-year-old who understands it becomes MORE cautious, not less.
//
// It teaches the principle about SUBSTANCES IN GENERAL, using WATER, SALT and
// OXYGEN as its three worked examples — three things nobody would call a drug,
// all three of which a person cannot live without and all three of which harm
// a person in the wrong amount. Not one herb is used as an example of the
// principle. No symptom is named anywhere in the lesson.
//
// The takeaway is stated in the concept, in beat 2, in the activity conclusion,
// in the ledger and in the check, in almost the same words every time:
//
//   STRONG ENOUGH TO HELP IS STRONG ENOUGH TO HURT, WHICH IS WHY A DOCTOR AND
//   A PHARMACIST MEASURE AND I DO NOT.
//
// The activity is the argument, not the decoration. She makes a dilution series
// of food colouring, where she CAN see the amount, and then an identical set of
// salt solutions, where she CANNOT — three clear glasses that look the same and
// are not the same. She can only tell them apart by weighing them. The lesson
// she walks away with is that a person cannot see how much of something is in
// front of them, so a leaf can never be a dose and an eye can never be a scale.
//
// Foxglove and Pacific yew are named plainly in this lesson as genuinely
// dangerous. Both gave the world real medicines and both will hurt a person who
// eats them, and those two facts sitting side by side are exactly why you never
// eat a plant you have not been taught.
//
// ---- THE THREAD THAT RUNS THROUGH ALL SIX ----
//
// The reason a pill can be trusted is that somebody isolated the compound,
// measured it, tested it, and printed on the box what is inside. Every lesson
// lands that: L74 on the century and a half from bark to tablet, L75 on
// splitting a mixture until one pure compound is left, L76 on batch numbers and
// testing, L77 on why the number matters at all, L78 on Tu Youyou testing what
// an old book only hinted at. An old book was a lead. The test was the proof.
//
// ---- standards: [] ON ALL SIX, ON PURPOSE ----
//
// Same call Modules 7, 11 and 12 made. Herbalism owns ten Georgia elements
// (S4L1a-d, S4E3a-c, S4E4a-d) and Module 10 discharged the last of them.
// Georgia fourth-grade science has no element about drug discovery, chemical
// isolation, pharmaceutical manufacture or dose-response, so this module owes
// none and does not borrow one. No offGrade code either: off-grade means a real
// Georgia element from a lower grade, and none of this is an element from any
// grade. Six empty arrays, deliberately.
//
// ---- THE READING LEVEL WENT UP AGAIN ----
//
// Quarter 4 targets Flesch-Kincaid 3.5–4.5, about eleven words a sentence,
// about eight percent long words — a full grade above Quarter 3 and roughly
// three above where Quarter 1 was measured. That was reached by joining clauses
// that belong together and by leaning on because / so / unless / while / even
// though / once, not by padding. Apply-Its take two steps of reasoning. New
// vocabulary each gets a glossary card in plain words, and these should be
// added to the SUBJECT exemption set in scripts/check-assessment.mjs when this
// merges:
//
//   compound, compounds, alkaloid, alkaloids, herbivore, herbivores,
//   antifeedant, allicin, alliinase, curcumin, gingerol, caffeine, salicin,
//   salicylic, acetylsalicylic, aspirin, isolate, isolated, isolation,
//   fraction, fractions, chromatography, chromatogram, pigment, pigments,
//   solvent, synthesis, synthesise, physostigmine, quinine, cinchona,
//   digitalis, foxglove, excipient, excipients, binder, disintegrant,
//   dissolve, tablet, standardise, standardised, batch, toxicology,
//   Paracelsus, concentration, dilution, periwinkle, vincristine, vinblastine,
//   paclitaxel, artemisinin, Artemisia, leukaemia, malaria, pharmacist
//
// ---- VIDEOS: ALL SIX VERIFIED AT NOEMBED ON 2026-08-14 ----
//
// Every id, title and channel below was fetched from
// https://noembed.com/embed?url=... and is recorded EXACTLY as returned.
// What could NOT be done is read descriptions, durations or transcripts:
// youtube.com is disallowed to the fetcher by robots.txt, and curl through the
// environment proxy is refused (CONNECT returns 403). So verification ran
// through noembed only, DURATIONS ARE UNKNOWN, and every `minutes` field is
// null rather than a plausible-looking guess — the same call Modules 3, 10 and
// 11 made. Gigi should watch each one before Azianna does, which is the
// standing rule anyway.
//
// ---- THE BLACK-AMERICAN-EDUCATOR GAP: CLOSED IN ONE OF SIX ----
//
// Lesson 75 uses "The Story of: Percy L. Julian | Storytime | Black Voices in
// STEAM" from The Lawrence Hall of Science, the public science centre at UC
// Berkeley. It is an episode of an explicitly named Black Voices in STEAM
// series about a Black American chemist, and it sits on the lesson whose whole
// subject is finding and then building an active compound, which is exactly
// what Julian did. Stated honestly: the video id, title and channel are
// verified, and the series name is verified across four sibling episodes
// (Neil deGrasse Tyson, Katherine Johnson, Patricia Bath, Percy L. Julian), but
// the presenter could NOT be identified, because YouTube video pages are not
// fetchable from this environment. Gigi should watch it first and judge.
//
// The other five lessons leave the gap OPEN. Every search run is recorded in
// the relevant `sourceGap` string. Two further near-misses were verified at
// noembed and left unused rather than quietly forgotten:
//
//   823L6n0NTvg  "Dr. Marie M. Daly: Chemistry Pioneer" — American Chemical
//                Society. Verified real. Daly was the first Black American
//                woman to earn a chemistry PhD. It is a biography rather than a
//                lesson on any of these six topics, so it is a genuine
//                candidate for a future history lesson, not for one of these.
//   _Oh3WXAycB8  "Black Botanists Who Changed The World | Black History In
//                Botany" — Jake Inzerra. Verified real. Botany history rather
//                than plant chemistry, and the channel is a single creator, so
//                Gigi should preview it before it is used anywhere.
//
// ---- SAFETY STRINGS ----
//
// Knives, the stove and rubbing alcohol are grown-up jobs and every lesson that
// touches one says so in `safety`. Nothing in any of the six lessons is tasted,
// licked or eaten, including plants she eats at dinner — because in these
// lessons they are samples and not food, and that distinction is worth
// installing. Lesson 74 handles a real medicine box and says twice that a child
// never opens, touches or takes medicine. Lesson 77 says plainly that foxglove
// and yew will hurt a person who eats them.
// ---------------------------------------------------------------------------

/* =========================================================================
 * LESSON 73 · hb-m13-01 · Why plants make chemicals at all
 * ========================================================================= */

const M13L1_CHECK_IN = {
  title: 'A plant cannot run away',
  text: 'A caterpillar can crawl to a different leaf and a deer can walk to a different field, but a plant is stuck exactly where its roots went down. It cannot run, it cannot hide and it cannot bite back. So a plant defends itself the only way it can, which is by building chemicals inside its own tissue.',
  question: 'If you were rooted to one spot for your whole life, what would you build?'
};

const M13L1_BEATS = [
  {
    n: 1,
    label: 'Chemistry instead of legs',
    hook: 'A garlic clove only makes its sharpest chemical after something breaks it open, so the weapon is loaded but not fired until the plant is attacked.',
    teachingText:
      'Plants build compounds that make them bitter, burning, sticky or poisonous, because an animal that gets a mouthful of that goes and eats something else. Those compounds cost the plant energy to make, so they only stay in a species because they work. Nothing a plant builds is free.',
    example:
      'Whole garlic hardly smells at all. It stores a quiet compound called alliin and keeps an enzyme called alliinase locked away from it, and crushing the clove smashes them together to make allicin in seconds. That sharp smell is a defence going off in your hand.',
    applyIt: {
      prompt: 'Two wild plants grow side by side in the same soil. One is bitter and untouched, and one is sweet and chewed down to the stem. Which one is more likely to pass its traits on?',
      choices: [
        'The bitter one, because a bitter plant is still standing when seed time comes',
        'The sweet one, because more animals visit it',
        'Neither, because how a plant tastes has nothing to do with seed',
        'Both the same, because they are growing in the same soil'
      ],
      answer: 0,
      feedback: [
        null,
        'Being popular with the animal that is eating you is not an advantage.',
        'A plant chewed to the stem often never gets to make seed at all.',
        'Same soil, but very different odds of surviving long enough to seed.'
      ],
      why: 'A defence spreads through a species because the defended plants are the ones left alive to make seed.'
    }
  },
  {
    n: 2,
    label: 'It was never made for us',
    hook: 'Caffeine is a defence chemical. In a coffee plant it works on insects that chew the leaves, and the fact that people like it is an accident.',
    teachingText:
      'Every plant compound we later turned into a medicine was built by the plant, for the plant, long before anybody found it. People came along much later, pulled it out, measured it and put it to a different use. That is why a plant is not built to be safe for a child, and why bitter or burning is a warning rather than an invitation.',
    example:
      'Your turmeric makes a yellow compound called curcumin and your ginger makes a hot one called gingerol. The plant is not being generous with either of them. The heat is there so that a hungry insect leaves the rhizome alone underground.',
    applyIt: {
      prompt: 'A leaf you have never met is so bitter that you would spit it out at once. What is the most likely explanation for that bitterness?',
      choices: [
        'The plant is telling you it is ripe and ready to pick',
        'The plant is short of water and today it tastes worse than usual',
        'The plant built a compound whose whole job is to stop things eating it',
        'Bitterness turns up in plants completely at random'
      ],
      answer: 2,
      feedback: [
        'Plants do not send ripeness messages to people, and no plant is labelled.',
        'A thirsty plant wilts. Bitterness is built on purpose over many generations.',
        null,
        'Random traits fade out. Traits that keep a plant alive are the ones that spread.'
      ],
      why: 'Bitter is a defence doing its job, and spitting it out is that defence working exactly as built.'
    }
  }
];

const M13L1_ACTIVITY = {
  title: 'The defence survey',
  prep: 'Ask Gigi to come outside with you, because one step of this needs her hands rather than yours. Take your log and a pen, and take a magnifier if there is one in the house.',
  needs: [
    'her garlic, ginger, turmeric and corn containers',
    'a magnifier',
    'a small chopping board',
    'a knife, to be held by a grown-up only',
    'two clean jars with lids',
    'masking tape and a pen',
    'her Plant Detective Log'
  ],
  steps: [
    'Walk the containers slowly and look at every leaf for holes, chew marks and scars.',
    'Count the damaged leaves on each of the four plants and write the four numbers down.',
    'Rank your plants from most eaten to least eaten, then write your ranking in the log.',
    'Predict which of the four an insect would find hardest to chew, and write down why.',
    'Stand back and ask Gigi to slice one clove of garlic on the board.',
    'Wait ten slow seconds, then smell the board from about a hand span away.',
    'Write down what the smell did between the moment she cut it and ten seconds later.',
    'Ask Gigi to scrape a little skin off the ginger, and smell that from the same distance.',
    'Drop one slice of each into its own jar, label both jars, and leave them shut until tomorrow.',
    'Nothing goes near your mouth at any point in this survey, however familiar it looks.',
    'Finish by writing one sentence: why would a plant bother making a smell that strong?'
  ],
  safety:
    'The knife is a grown-up job and there is no exception to it in this lesson. Nothing is tasted, licked or put in your mouth, not even garlic you have eaten at dinner a hundred times, because today it is a sample and not food. Smell from a hand span away instead of putting your nose against it. Wash your hands before you start and again at the end.',
  grownUpAsks: [
    'Before we go out. Why would a plant spend energy on anything it does not have to?',
    'Which of your four plants looks most chewed, and does that surprise you?',
    'You ranked them. What made you put the last one last?',
    'The whole clove hardly smelled. Where was that smell hiding all along?',
    'Nothing was added when I cut it. So where did the new smell come from?',
    'Why would a plant keep two chemicals apart until something breaks it open?',
    'If you were an insect, which of these four would you leave alone?',
    'Is the ginger being hot on purpose, or is that just how it is?',
    'People like the smell of garlic. Does the garlic plant know that?',
    'A bitter plant and a sweet plant. Which one has more seeds next year?',
    'Say the rule back to me. What do we never do with a sample?'
  ]
};

const M13L1_LEDGER = {
  sheet: 'M13L1-the-defence-survey-PRINTABLE.pdf',
  tasks: [
    'Fill the table with your four plants and how many damaged leaves each one had.',
    'Write your ranking, most eaten first, and one sentence saying why you think so.',
    'Draw the garlic clove before cutting and after cutting, and label where the smell came from.',
    'Write one sentence: who is a plant defence chemical actually built for?'
  ],
  game: {
    title: 'Word Boss',
    cards: ['COMPOUND', 'DEFENCE CHEMICAL', 'HERBIVORE', 'BITTER', 'ALLICIN'],
    rounds: [
      'Say what each word means in your own words. No fancy talk.',
      'A grown-up says the meaning. You say the word. Beat the clock.',
      'Name a real plant for each card, and say what that plant is defending against.'
    ],
    ifSheIsStuck:
      'Go back to the board with the cut garlic on it. COMPOUND and DEFENCE CHEMICAL stop being words the second she smells the difference between a whole clove and a cut one.'
  },
  note: 'Nothing here is graded. Nothing is corrected. Petals are for doing it.'
};

/* =========================================================================
 * LESSON 74 · hb-m13-02 · Willow bark to aspirin
 * ========================================================================= */

const M13L2_CHECK_IN = {
  title: 'Same tree, a hundred and thirty six years',
  text: 'People used willow bark long before anybody could say why it did anything. The bark held something real, but nobody knew which part of it was doing the work, and no two pieces of bark were the same strength. Turning that bark into a tablet took chemists more than a century, and it took five different people in three countries.',
  question: 'What can a chemist know about a tablet that nobody could ever know about a piece of bark?'
};

const M13L2_BEATS = [
  {
    n: 1,
    label: 'Five people, one hundred and thirty six years',
    hook: 'In 1763 an English clergyman named Edward Stone sent a report about willow bark to the Royal Society in London, which was the science club of its day.',
    teachingText:
      'Getting from bark to aspirin was not one discovery, it was a relay. In 1828 a German chemist called Johann Buchner pulled a compound out of willow bark and named it salicin. In 1838 an Italian chemist called Raffaele Piria turned salicin into salicylic acid, and in 1853 Charles Gerhardt in France made acetylsalicylic acid for the first time.',
    example:
      'The German company Bayer finally made acetylsalicylic acid pure and stable in 1897, and by 1899 they were selling it around the world under the name Aspirin. Count from the report of Stone to that name and you get one hundred and thirty six years.',
    applyIt: {
      prompt: 'Gerhardt already made the aspirin compound back in 1853, so why do people still call 1897 the important date?',
      choices: [
        'Because the work of Gerhardt was lost and had to be discovered all over again',
        'Because making a compound once is not the same as making it pure and steady every time',
        'Because nobody was ill in 1853, so there was no reason to bother',
        'Because willow trees did not grow in Germany until much later'
      ],
      answer: 1,
      feedback: [
        'His work was published and known about. The problem was the product, not the paper.',
        null,
        'People in 1853 were exactly as ill as people in 1897.',
        'Willows grow all over Europe and always have done.'
      ],
      why: 'A medicine has to come out the same every single time, and that is a manufacturing problem as well as a chemistry one.'
    }
  },
  {
    n: 2,
    label: 'Why the tablet beat the bark',
    hook: 'Two pieces of bark cut off the very same willow tree can hold quite different amounts of salicin, depending on the season and the age of the branch.',
    teachingText:
      'Bark is a living thing that varies, while a tablet is a manufactured object that does not. Once chemists had isolated the compound they could weigh it, so every tablet in the box could be made to match the one beside it. That sameness is the whole reason a doctor is able to trust it.',
    example:
      'Look at any medicine box in the house and the same three things are printed on it: the name of the active compound, a list of everything else in there, and a batch number. A branch of willow carries none of those, and it never could.',
    applyIt: {
      prompt: 'Two batches of bark come off one tree, one in spring and one in autumn, and a chemist finds they hold different amounts of salicin. What does that tell you about bark as a medicine?',
      choices: [
        'That autumn bark is always the stronger of the two',
        'That the tree was unhealthy when the second batch was cut',
        'That you cannot know the strength of any piece of bark by looking at it',
        'That salicin must have been invented somewhere between spring and autumn'
      ],
      answer: 2,
      feedback: [
        'The season changes things, but not in a way you could count on without measuring.',
        'A perfectly healthy tree varies through the year. That is normal.',
        null,
        'Salicin was there the whole time. Only the amount moved.'
      ],
      why: 'Anything you cannot measure, you cannot repeat, and a medicine that cannot be repeated is a guess.'
    }
  }
];

const M13L2_ACTIVITY = {
  title: 'Build the aspirin timeline to scale',
  prep: 'Turn a sheet of paper sideways so you have the long edge to work on, and find a ruler that reads in centimetres. Ask Gigi to fetch one medicine box from wherever she keeps them, and to keep hold of it herself the whole time.',
  needs: [
    'a sheet of paper turned sideways, or a strip of card',
    'a ruler marked in centimetres',
    'a pencil and a rubber',
    'coloured pens',
    'one medicine box, held by Gigi only',
    'her Plant Detective Log'
  ],
  steps: [
    'Rule a straight line along the paper and mark the very left end as the year 1763.',
    'Work at a scale of one centimetre for every five years, and write that scale at the top.',
    'Buchner named salicin in 1828, which is 65 years on, so mark 13 centimetres.',
    'Piria made salicylic acid in 1838, which is 75 years on, so mark 15 centimetres.',
    'Gerhardt made acetylsalicylic acid in 1853, which is 90 years on, so mark 18 centimetres.',
    'Bayer made it pure and stable in 1897, which is 134 years on, so mark 26.8 centimetres.',
    'The name Aspirin went worldwide in 1899, which is 136 years on, so mark 27.2 centimetres.',
    'Label every mark with the year, the person and what they actually did.',
    'Look at your line and find the longest empty gap, then write down how many years it is.',
    'Now Gigi holds up her medicine box and reads out the name of the active ingredient.',
    'Write that name down, then count how many other ingredients are listed beside it.',
    'Gigi puts the box straight back where it lives, and you do not touch it at any point.'
  ],
  safety:
    'A child never opens, touches or takes medicine, and that stays true whatever is printed on the box. Gigi holds it, Gigi reads it, and Gigi puts it away. Nothing in this lesson is tasted and no willow bark is picked, chewed or brought indoors.',
  grownUpAsks: [
    'Before we rule the line. How long do you think this whole story took?',
    'Your scale is one centimetre for five years. Why not one centimetre for one year?',
    'Where is the longest empty gap on your line, and what might have filled it?',
    'Buchner got the compound out. Why was that not the end of the job?',
    'Gerhardt made it in 1853 and nothing happened. Why not?',
    'What is written on this box that could never be written on a branch?',
    'There is one active ingredient and a whole list of others. Why so many others?',
    'What is a batch number for, do you think?',
    'Who is allowed to open this box in our house?',
    'If two pieces of bark are different strengths, what can you never do with bark?',
    'Say it back to me. What makes a tablet trustworthy?'
  ]
};

const M13L2_LEDGER = {
  sheet: 'M13L2-the-aspirin-timeline-PRINTABLE.pdf',
  tasks: [
    'Copy your timeline onto the sheet with all five dates marked and labelled.',
    'Write the scale you used, and the length of the longest gap in years.',
    'Write the name of the active ingredient Gigi read out, spelled correctly.',
    'Write one sentence: why is a tablet easier to trust than a piece of bark?'
  ],
  game: {
    title: 'Word Boss',
    cards: ['SALICIN', 'ISOLATE', 'ACTIVE INGREDIENT', 'BATCH', 'STANDARDISED'],
    rounds: [
      'Say what each word means in your own words. No fancy talk.',
      'A grown-up says the meaning. You say the word. Beat the clock.',
      'Put the five cards in the order the story happened, and defend your order.'
    ],
    ifSheIsStuck:
      'Point at the two marks on her own timeline that are 44 years apart. ISOLATE and STANDARDISED are the difference between those two marks, and she drew that gap herself.'
  },
  note: 'Nothing here is graded. A crooked line with the right years on it beats a neat one with the wrong ones.'
};

/* =========================================================================
 * LESSON 75 · hb-m13-03 · Finding the active compound
 * ========================================================================= */

const M13L3_CHECK_IN = {
  title: 'A leaf is a crowd',
  text: 'One leaf holds hundreds of different compounds, all mixed together in the same tissue. If one of them does something useful, it is standing in a crowd of hundreds that do nothing at all. Finding it means splitting that crowd into smaller and smaller groups and testing every group you make.',
  question: 'How would you find one loud voice in a crowd of five hundred, if all you could do was listen to groups?'
};

const M13L3_BEATS = [
  {
    n: 1,
    label: 'Split, test, split again',
    hook: 'Chemists call this bioassay-guided fractionation, which is a long name for a short loop: split it, test the pieces, keep the piece that works, and split that piece again.',
    teachingText:
      'You start with the whole plant and separate it into a few fractions, which are simply parts of the mixture. You test every fraction, throw away the ones that do nothing, and split the one that does. Repeat that loop enough times and you finish holding a single pure compound instead of a crowd.',
    example:
      'Two French chemists, Pelletier and Caventou, worked through cinchona bark this way and in 1820 they came out holding quinine, the first compound that genuinely worked against malaria. Before them people had bark. After them people had a compound, and a compound can be weighed.',
    applyIt: {
      prompt: 'You split a plant extract into four fractions and test them. Fractions one, two and four do nothing, and fraction three works. What do you do next?',
      choices: [
        'Mix all four back together, because they came from the same plant',
        'Split fraction three into smaller fractions and test those',
        'Test fraction one again, in case something was missed',
        'Stop, because fraction three is now a pure compound'
      ],
      answer: 1,
      feedback: [
        'Mixing them back rebuilds exactly the crowd you were trying to break up.',
        null,
        'Retesting is fair, but it does not move you any closer to the compound.',
        'Fraction three is a smaller crowd, not one person. It could still hold fifty compounds.'
      ],
      why: 'Each round of splitting and testing shrinks the crowd, and you only stop when nothing is left to split.'
    }
  },
  {
    n: 2,
    label: 'Percy Julian, and what comes after finding it',
    hook: 'Percy Lavon Julian was born in Montgomery, Alabama in 1899, and he graduated top of his year at DePauw University in 1920.',
    teachingText:
      'Finding a compound in a plant is only half the work, because plants run out and forests do not grow back quickly. Once chemists know how a compound is built, they can build it themselves from cheaper starting material. In 1935, working at DePauw with Josef Pikl, Julian built physostigmine in the laboratory from scratch.',
    example:
      'Julian went on to make hormone medicines out of soybeans, which are grown in fields by the tonne rather than gathered from a forest. In 1973 he became the first African American chemist elected to the National Academy of Sciences.',
    applyIt: {
      prompt: 'A useful compound is found in a rare tree that grows in only one valley. Why do chemists work so hard to build that compound in a laboratory instead?',
      choices: [
        'Because the laboratory version is a different compound and works better',
        'Because trees are difficult to photograph properly',
        'Because there are not enough trees, and stripping the valley would end both the tree and the supply',
        'Because laboratories are always cheaper than farms'
      ],
      answer: 2,
      feedback: [
        'If it is built correctly it is the same compound. That is the whole point.',
        'Photographs are not what is stopping anybody.',
        null,
        'Sometimes they are and sometimes they are not. Supply is the real reason.'
      ],
      why: 'Building the compound protects the plant and makes the supply steady, and a steady supply is what a medicine needs.'
    }
  }
];

const M13L3_ACTIVITY = {
  title: 'Chromatography — pull one mixture apart',
  prep: 'Cut coffee filter paper or thick kitchen paper into strips about three centimetres wide and fifteen long. Test your black pen on a scrap first, because a permanent marker will not move in water and a washable one will.',
  needs: [
    'coffee filter paper or thick white kitchen paper',
    'washable felt tip pens, black and brown and green',
    'three tall clear glasses',
    'water',
    'a pencil and a ruler',
    'tape and three lolly sticks or pencils to hang the strips from',
    'a few spinach or basil leaves, for the grown-up run',
    'rubbing alcohol, for the grown-up run only',
    'her Plant Detective Log'
  ],
  steps: [
    'Rule a pencil line across each strip, two centimetres up from the bottom edge.',
    'Put one fat dot of washable black pen in the middle of the line on strip one.',
    'Do the same with brown on strip two and green on strip three, then let them dry.',
    'Pour water into each glass, no more than one centimetre deep.',
    'Tape the top of each strip to a pencil and hang it so the paper touches the water.',
    'The pencil line must stay above the water, or your dot washes off instead of climbing.',
    'Watch for ten minutes as the water climbs and the dot separates into bands of colour.',
    'Lift each strip out, mark where the water stopped, and let them dry flat.',
    'Count the bands on each strip and write down how many colours were hiding in each pen.',
    'For the leaf run, Gigi crushes leaves with rubbing alcohol and does that part herself.',
    'Compare all your strips: one dot went in and several separate colours came out.',
    'Write the sentence that matters: one thing that looked single was a mixture all along.'
  ],
  safety:
    'Rubbing alcohol is a grown-up job from start to finish, and it stays well away from any flame or hot pan. Do the leaf run near an open window. Nothing is tasted and nothing is drunk, and that includes the water in the glasses once a pen has bled into it. Wash your hands at the end.',
  grownUpAsks: [
    'Before we start. How many colours do you think are inside a black pen?',
    'Why did we rule that line in pencil rather than in pen?',
    'What would go wrong if the dot started underneath the water?',
    'The water is climbing the paper on its own. What is pulling it up?',
    'Which colour travelled furthest, and can you think of a reason why?',
    'Your one dot became several bands. Where were those bands before?',
    'A chemist calls each band a fraction. What would she do with them next?',
    'Green leaves gave us more than one colour. Does that surprise you?',
    'How is this paper strip doing the same job as splitting a plant extract?',
    'If a band did something useful, how would you find out which band it was?',
    'Say it back to me. Why can you not trust a mixture to be one thing?'
  ]
};

const M13L3_LEDGER = {
  sheet: 'M13L3-chromatography-PRINTABLE.pdf',
  tasks: [
    'Tape or draw your three strips onto the sheet and label which pen made each one.',
    'Write how many separate bands you counted on each strip.',
    'Name the band that climbed furthest on any strip, and say how far it went.',
    'Write one sentence: what does splitting a mixture let you do that mixing never can?'
  ],
  game: {
    title: 'Word Boss',
    cards: ['MIXTURE', 'FRACTION', 'CHROMATOGRAPHY', 'PURE COMPOUND', 'SYNTHESIS'],
    rounds: [
      'Say what each word means in your own words. No fancy talk.',
      'A grown-up says the meaning. You say the word. Beat the clock.',
      'Point at your own strip and show where MIXTURE, FRACTION and PURE COMPOUND live on it.'
    ],
    ifSheIsStuck:
      'Hold the undipped strip beside the dipped one. MIXTURE is the dot and FRACTION is every band underneath it, and she made both of them herself in ten minutes.'
  },
  note: 'Nothing here is graded. A smudged strip that separated is worth more than a tidy one that did not.'
};

/* =========================================================================
 * LESSON 76 · hb-m13-04 · From a leaf to a pill
 * ========================================================================= */

const M13L4_CHECK_IN = {
  title: 'Most of a tablet is not the medicine',
  text: 'Hold a tablet up and almost all of what you are looking at is not the active compound at all. The compound itself is often a speck, far too small to pick up or to swallow on its own. Everything else in there is a job: something to bulk it out, something to hold it together and something to make it break apart again at the right moment.',
  question: 'Why would anybody deliberately add ingredients that do nothing to your body?'
};

const M13L4_BEATS = [
  {
    n: 1,
    label: 'Every ingredient has a job',
    hook: 'The extra ingredients in a tablet have their own name. Chemists call them excipients, and there are usually more of them than there are active compounds.',
    teachingText:
      'A filler bulks the tablet up so a machine and a hand can both handle it. A binder holds the powder together under pressure so it does not crumble in the box. A disintegrant does the opposite job on purpose, swelling in water so the tablet falls apart once it is swallowed, and a coating keeps it sealed until then.',
    example:
      'If a tablet held nothing but its active compound it would be smaller than a grain of salt, and nobody could count those out or keep track of one. The bulk is not padding. It is what makes an invisible amount into an object a person can hold.',
    applyIt: {
      prompt: 'A tablet comes out of the machine perfectly solid, but it still has not broken up an hour after being swallowed. Which job has gone wrong?',
      choices: [
        'The filler, because there was not enough bulk in it',
        'The binder, because it did not hold the powder together',
        'The coating, because it was too thin',
        'The disintegrant, because nothing made it swell and break apart'
      ],
      answer: 3,
      feedback: [
        'Bulk affects the size of the tablet, not whether it opens up.',
        'The binder clearly worked. That is why it is still in one piece.',
        'A thin coating would let it open too early, which is the opposite problem.',
        null
      ],
      why: 'Holding together and falling apart are two different jobs, and a tablet has to do both at the right times.'
    }
  },
  {
    n: 2,
    label: 'The batch number is the promise',
    hook: 'Every box of tablets carries a batch number, and somewhere there is a file that says which day that batch was made, from which materials, and what happened when it was tested.',
    teachingText:
      'Tablets are made in batches of many thousands, and samples are pulled out of every batch and tested before any of it leaves the factory. If a batch fails, the number lets the company find every box from it and call them all back. Without that number, one bad batch could never be told apart from a good one.',
    example:
      'That is the difference between a factory and a guess. A factory can say which day, which machine and which test. Somebody handing you a jar of unlabelled powder can say none of those things, which is why nobody should ever accept one.',
    applyIt: {
      prompt: 'A test finds a problem in one batch made on a Tuesday. Why does the batch number matter so much on that Wednesday morning?',
      choices: [
        'It tells shops exactly which boxes to pull off the shelf and send back',
        'It tells you how many tablets are inside each box',
        'It proves the factory is bigger than the shop',
        'It tells the customer what colour the tablet is'
      ],
      answer: 0,
      feedback: [
        null,
        'The count is printed too, but that is a different number doing a different job.',
        'Size of company has nothing to do with tracing a fault.',
        'Colour is on the box as well, and it traces nothing.'
      ],
      why: 'A batch number turns thousands of identical boxes back into a list somebody can follow.'
    }
  }
];

const M13L4_ACTIVITY = {
  title: 'Press a batch that is not medicine',
  prep: 'Clear the counter and set the kitchen scale on a flat part of it. Write NOT MEDICINE on a card and stand it beside your work before you start, because a thing that looks like a tablet should always be labelled as what it is.',
  needs: [
    'cornflour, about a cupful',
    'a pinch of turmeric from her own container, as a colour marker',
    'a small bowl and a teaspoon',
    'water in a cup, and a teaspoon to add it with',
    'a kitchen scale that reads in grams',
    'a bottle cap or a small measuring spoon, to press in',
    'two saucers and a jar with a lid',
    'a glass of water and a timer',
    'masking tape and a pen',
    'her Plant Detective Log'
  ],
  steps: [
    'Write NOT MEDICINE on your card and stand it where you can see it the whole time.',
    'Put four teaspoons of cornflour in the bowl and stir a pinch of turmeric through it.',
    'Add water half a teaspoon at a time until the powder just holds a shape when squeezed.',
    'Pack the damp powder into the bottle cap and press it down hard with your thumb.',
    'Tip it out carefully onto a saucer, and that is pellet one.',
    'Make five more the same way, trying to get every one the same as the last.',
    'Weigh all six pellets one at a time and write the six masses in grams.',
    'Find your heaviest and your lightest, and work out the gap between them.',
    'Write a batch number on the tape, using todays date, and stick it on the jar.',
    'Drop one pellet into the glass of water and time how long it takes to fall apart.',
    'That is the disintegrant job, being done badly by water and cornflour alone.',
    'Put the rest in the labelled jar, and nothing goes in a mouth at any point.'
  ],
  safety:
    'These pellets are a model of a tablet and they are not medicine, not food and not a snack, and they are never put in a mouth. Label them and keep them away from anybody small who might not know that. Wash your hands before you start and again at the end, and wipe the counter down properly.',
  grownUpAsks: [
    'Before we start. Why did I make you write NOT MEDICINE first?',
    'What is the cornflour doing in there? Give it a job name.',
    'What happened when you added too much water at once?',
    'Your six pellets came out different. Does that mean you were careless?',
    'What is the gap between your heaviest and your lightest?',
    'A factory makes millions. How close do you think their gap has to be?',
    'How could you make your six more alike than they were?',
    'Why does the jar need a batch number if there are only six in it?',
    'Your pellet took a while to fall apart. What could a factory add to speed that up?',
    'If one of your six was wrong, how would anybody ever know which one?',
    'Say it back to me. Why do we label a thing that looks like a tablet?'
  ]
};

const M13L4_LEDGER = {
  sheet: 'M13L4-press-a-batch-PRINTABLE.pdf',
  tasks: [
    'Fill the table with the mass of all six pellets, in grams.',
    'Write your heaviest, your lightest, and the gap between them.',
    'Write your batch number and the time your pellet took to fall apart in water.',
    'Name the four jobs an ingredient can do in a tablet, in your own words.'
  ],
  game: {
    title: 'Word Boss',
    cards: ['EXCIPIENT', 'FILLER', 'BINDER', 'DISINTEGRANT', 'BATCH NUMBER'],
    rounds: [
      'Say what each word means in your own words. No fancy talk.',
      'A grown-up says the meaning. You say the word. Beat the clock.',
      'Point at your own pellet and say which job the cornflour was doing.'
    ],
    ifSheIsStuck:
      'Hand her the pellet that fell apart in the glass and the one still sitting dry on the saucer. BINDER is in one hand and DISINTEGRANT is in the other, and they are fighting.'
  },
  note: 'Nothing here is graded. Six pellets that came out different is the finding, not the failure.'
};

/* =========================================================================
 * LESSON 77 · hb-m13-05 · The dose makes the poison
 * ========================================================================= */

const M13L5_CHECK_IN = {
  title: 'Three things you cannot live without',
  text: 'Water, salt and oxygen. You would not last long without any one of the three, and every cell you have needs all of them today. Every one of the three will also hurt a person badly in the wrong amount, and that is not a trick or an exception. It is how substances work, and it has been known for about five hundred years.',
  question: 'If a thing you need every day can still hurt you, what is the part that actually decides?'
};

const M13L5_BEATS = [
  {
    n: 1,
    label: 'Paracelsus and the three examples',
    hook: 'A Swiss doctor called Paracelsus, who died in 1541, wrote the line that toxicology has been built on ever since. In Latin it is sola dosis facit venenum, which means only the dose makes the poison.',
    teachingText:
      'Nothing is safe or dangerous all by itself. What decides is how much of it there is, so the same substance can keep you alive at one amount and harm you at another. Water is the plainest example there is, because you are mostly made of it, and yet drinking far too much far too fast has genuinely killed healthy adults by washing the salt out of their blood.',
    example:
      'Salt does the same thing from the other direction, because your nerves cannot work without it and far too much of it is dangerous. Oxygen is stranger still: air is about one fifth oxygen and you need every breath of it, but divers know that pure oxygen under pressure damages the lungs.',
    applyIt: {
      prompt: 'Somebody tells you a substance is completely safe because it is natural and your body already contains it. Using water as your example, what is wrong with that?',
      choices: [
        'Nothing is wrong, because anything already inside you must be safe',
        'They are right about water but wrong about everything else',
        'Being in your body says nothing about how much of it is safe to add',
        'Water is the one exception to the rule and everything else is fine'
      ],
      answer: 2,
      feedback: [
        'Your body contains water, salt and oxygen, and all three harm a person in the wrong amount.',
        'Water is not special here. It is just the clearest case.',
        null,
        'Water is the example precisely because it is not an exception.'
      ],
      why: 'Whether something is inside you already tells you nothing at all about the amount, and the amount is the whole question.'
    }
  },
  {
    n: 2,
    label: 'So somebody has to measure, and it is not me',
    hook: 'Foxglove gave the world a real heart medicine called digitalis, and foxglove will also badly hurt a person who eats it. Both of those are true about the same plant at the same time.',
    teachingText:
      'Anything strong enough to help is strong enough to hurt, so the number matters exactly as much as the name. That is why a doctor works out the amount from the person in front of her, a pharmacist checks it, a machine measures it and a label prints it. Every link in that chain exists because the number matters, and not one link in it is a child.',
    example:
      'A leaf can never be a measured amount, because two leaves off one plant do not hold the same amount of anything, and nobody can see how much is inside either of them. Pacific yew gave us a cancer medicine called paclitaxel, and yew is genuinely poisonous. That is exactly why you never eat a plant you have not been taught.',
    applyIt: {
      prompt: 'You know that a real medicine was once found inside foxglove. What does that tell you about picking a foxglove leaf in a garden?',
      choices: [
        'Nothing useful, because the medicine is a measured compound and the leaf is not',
        'That the leaf must be a weaker and therefore safer version',
        'That it would be fine as long as you only picked a small one',
        'That the plant is safe now, because a medicine came out of it'
      ],
      answer: 0,
      feedback: [
        null,
        'Weaker is not the same as safe, and nobody can tell how strong a leaf is by looking.',
        'A small leaf is still an unknown amount, and unknown is the actual problem.',
        'Foxglove is still poisonous. Finding a medicine in it changed nothing about the plant.'
      ],
      why: 'Strong enough to help is strong enough to hurt, which is why a doctor and a pharmacist measure and I do not.'
    }
  }
];

const M13L5_ACTIVITY = {
  title: 'You cannot see a dose',
  prep: 'This one needs Gigi to set up part of it while you are out of the room, so agree on that before you begin. Get four identical clear glasses for the first part and three more for the second, and put a jug of water and a measuring jug on the counter.',
  needs: [
    'seven identical clear glasses or jars',
    'a measuring jug marked in millilitres',
    'food colouring, one colour',
    'a dropper or the dropper in the bottle lid',
    'table salt and a teaspoon',
    'a kitchen scale that reads in grams',
    'a jug of cold water',
    'masking tape and a pen',
    'her Plant Detective Log'
  ],
  steps: [
    'Line up four glasses and label them A, B, C and D with tape.',
    'Measure 10 millilitres of water into A, 50 into B, 250 into C and 1000 into D.',
    'Put exactly one drop of food colouring into each of the four glasses.',
    'Stir each one and then line them up in front of a window and look along the row.',
    'Write down what you see: same one drop every time, four completely different colours.',
    'Now leave the room while Gigi makes up the second set.',
    'Gigi fills three glasses with 200 millilitres of water each and labels them 1, 2 and 3.',
    'Into one she stirs nothing, into one a level teaspoon of salt, into one four teaspoons.',
    'Come back and try to tell which is which by looking, without tasting anything.',
    'Write down your guess, then tare the scale, weigh each glass, and write the three masses.',
    'The heaviest glass holds the most salt, and the scale knew what your eyes could not.',
    'Write the conclusion in your own words, and read it out loud to Gigi before you finish.'
  ],
  safety:
    'Nothing in this activity is tasted or drunk, not one sip, and the salty water goes down the sink at the end. Food colouring stains, so wear an apron and wipe spills straight away. Wash your hands before you start and again at the end.',
  grownUpAsks: [
    'One drop went into all four glasses. Why does D look so much paler than A?',
    'Is there less colouring in D, or is there more water around it?',
    'What word would you use for how crowded the colouring is in a glass?',
    'Now the salt. Before you weighed them, could you tell them apart at all?',
    'You guessed. Were you right, and how sure were you before the scale answered?',
    'Which was the only tool in this kitchen that could tell you the truth?',
    'Paracelsus said only the dose makes the poison. Say that in your own words.',
    'Water, salt, oxygen. Why did I pick three things you cannot live without?',
    'Foxglove gave us a heart medicine and foxglove is poisonous. How can both be true?',
    'Two leaves off one plant. Would they hold the same amount of anything?',
    'So who works out an amount for a person, and who checks it after her?',
    'Say the whole sentence back to me, the one about strong enough to help.'
  ]
};

const M13L5_LEDGER = {
  sheet: 'M13L5-you-cannot-see-a-dose-PRINTABLE.pdf',
  tasks: [
    'Fill the table with your four volumes and describe the colour of each glass.',
    'Write your guess for glasses 1, 2 and 3, then write the three masses you weighed.',
    'Write whether your eyes got it right, honestly, and one line about why.',
    'Copy the sentence out and sign it: strong enough to help is strong enough to hurt, which is why a doctor and a pharmacist measure and I do not.'
  ],
  game: {
    title: 'Word Boss',
    cards: ['DOSE', 'CONCENTRATION', 'DILUTION', 'TOXICOLOGY', 'PHARMACIST'],
    rounds: [
      'Say what each word means in your own words. No fancy talk.',
      'A grown-up says the meaning. You say the word. Beat the clock.',
      'Point at glass A and glass D and use CONCENTRATION and DILUTION correctly in one sentence each.'
    ],
    ifSheIsStuck:
      'Stand glass A next to glass D. One drop is in both of them, and that is DILUTION standing on the counter. Then hold up the three salt glasses that look identical, and that is why we measure.'
  },
  note: 'Nothing here is graded. Getting the salt guess wrong is the best possible outcome, because it is the point of the whole lesson.'
};

/* =========================================================================
 * LESSON 78 · hb-m13-06 · What we still get from plants
 * ========================================================================= */

const M13L6_CHECK_IN = {
  title: 'Not a history lesson',
  text: 'It is easy to think that plants gave us medicines a long time ago and that laboratories took over afterwards. That is simply not what happened. Three of the most important medicines in the world came out of plants within the lifetime of somebody Gigi could name, and the searching has never stopped.',
  question: 'Why would a chemist with a whole laboratory still bother going out to look at plants?'
};

const M13L6_BEATS = [
  {
    n: 1,
    label: 'Three plants, three living medicines',
    hook: 'The Madagascar periwinkle is a small pink flower that people grow in pots, and two cancer medicines came out of it in the 1950s and 1960s.',
    teachingText:
      'Vinblastine was isolated from that periwinkle in 1958 by Robert Noble and Charles Beer in Canada, and vincristine followed in 1961. Vincristine is on the list of essential medicines kept by the World Health Organization, and it is one of the drugs given to children with a leukaemia that used to kill almost everybody who got it. Most children who get that leukaemia now survive it.',
    example:
      'The Pacific yew tells a similar story. Bark was collected in 1962, the compound was pulled out of it in 1966, it was named taxol in 1967, and its structure was published in 1971 by Monroe Wall and Mansukh Wani. That is nine years from a bag of bark to a printed structure.',
    applyIt: {
      prompt: 'The periwinkle was already growing in gardens all over the world before 1958. So why did nobody know about vincristine until then?',
      choices: [
        'Because the plant only started making it in the 1950s',
        'Because gardeners were not allowed to study plants back then',
        'Because growing a plant is not the same as isolating and testing what is inside it',
        'Because the flower had not been given a scientific name yet'
      ],
      answer: 2,
      feedback: [
        'The compound was in there the whole time. Nobody had separated it out.',
        'Plenty of people studied it. Nobody had done this particular work.',
        null,
        'It was named long before, and a name tells you nothing about the chemistry.'
      ],
      why: 'A compound stays hidden until somebody isolates it and tests it, and looking at the plant is not testing.'
    }
  },
  {
    n: 2,
    label: 'Tu Youyou, and the difference between a lead and a proof',
    hook: 'Tu Youyou read a Chinese handbook written by Ge Hong around the year 340, and one line in it changed how she ran her experiment.',
    teachingText:
      'She was searching for something that worked against malaria, and her extracts of sweet wormwood kept failing. The old text described soaking the plant in cold water rather than boiling it, so she tried a low temperature method, and in 1972 she got artemisinin out. Artemisinin has since saved millions of lives, and in 2015 she was awarded half of the Nobel Prize in Physiology or Medicine.',
    example:
      'Notice carefully what the old book actually did. It did not prove anything and it did not name a compound. It gave her one good idea about temperature, and then she did the isolating and the testing herself. A book was the lead. The test was the proof.',
    applyIt: {
      prompt: 'An old text says a plant was once used against a fever. A careful scientist reads it in 2026. What does she do next?',
      choices: [
        'Treat it as proof, because the text is very old and has lasted a long time',
        'Ignore it completely, because old books are never worth anything',
        'Treat it as a lead worth testing, then isolate and test compounds properly',
        'Publish the text as it stands and let other people decide'
      ],
      answer: 2,
      feedback: [
        'Age is not evidence. Plenty of very old ideas turned out to be wrong.',
        'Tu Youyou proved the opposite of that, and it won a Nobel Prize.',
        null,
        'Passing an untested claim along is how a guess turns into a fact nobody checked.'
      ],
      why: 'Old writing can point you somewhere worth looking, but only a test can tell you whether anything is there.'
    }
  }
];

const M13L6_ACTIVITY = {
  title: 'The medicine map',
  prep: 'Print or draw a world map big enough to write on, and lay it flat with your coloured pens beside it. Have your timeline from Lesson 74 nearby, because two of these entries belong on it.',
  needs: [
    'a printed world map, as large as you can get',
    'coloured pens and a pencil',
    'sticky notes or small paper flags',
    'sticky tack or tape',
    'a ruler',
    'her Plant Detective Log'
  ],
  steps: [
    'Write one flag for each plant: willow, cinchona, foxglove, periwinkle, yew and wormwood.',
    'On the back of each flag write the compound that came out of that plant.',
    'Put willow on Europe, and remember it grows across North America too.',
    'Put cinchona on the Andes in South America, where the bark was first taken from.',
    'Put foxglove on Britain, where William Withering wrote about it in 1785.',
    'Put the Madagascar periwinkle on Madagascar, off the east coast of Africa.',
    'Put Pacific yew on the north west coast of the United States.',
    'Put sweet wormwood on China, and write 2015 and the name Tu Youyou beside it.',
    'Add the calabar bean on West Africa, and write the name Percy Julian beside that.',
    'Now count how many different continents your flags are sitting on.',
    'Circle any plant on your map that could actually grow outdoors in Georgia.',
    'Finish by writing which flag surprised you most, and say out loud why it did.'
  ],
  safety:
    'This one is paper and pens, so the only rule is the standing one. Foxglove and yew are named on your map and both of them will hurt a person who eats them, so they are studied and never picked. Nothing is tasted in this lesson or any other one without Gigi handing it to you herself.',
  grownUpAsks: [
    'Before we start. How many of these six plants had you heard of?',
    'Look at your flags. How many continents did we end up on?',
    'Why do you think the searching went so far from home?',
    'Which of these could grow here in Georgia, and how would you check?',
    'The periwinkle was in gardens for years. Why did nobody know what was in it?',
    'Nine years from yew bark to a printed structure. Fast or slow, do you think?',
    'Tu Youyou read a book from about the year 340. What did the book give her?',
    'What did the book not give her, and who had to supply that part?',
    'Somebody online says an old text proves a plant works. What would you ask them?',
    'Two of these plants are poisonous. Does that make the medicines less real?',
    'Which flag surprised you most, and can you say why in one sentence?',
    'Say it back to me. What turns a lead into a proof?'
  ]
};

const M13L6_LEDGER = {
  sheet: 'M13L6-the-medicine-map-PRINTABLE.pdf',
  tasks: [
    'Fill the table: plant, compound, place and year, for all six flags.',
    'Write how many continents your flags landed on.',
    'Write the name Tu Youyou, the year 2015 and what she was awarded.',
    'Write one sentence in your own words about the difference between a lead and a proof.'
  ],
  game: {
    title: 'Word Boss',
    cards: ['PERIWINKLE', 'PACLITAXEL', 'ARTEMISININ', 'ESSENTIAL MEDICINE', 'LEAD'],
    rounds: [
      'Say what each word means in your own words. No fancy talk.',
      'A grown-up says the meaning. You say the word. Beat the clock.',
      'Put a finger on the map for every card you can, and name the compound as you do it.'
    ],
    ifSheIsStuck:
      'Put her finger on Madagascar and then on China and let her say the two names out loud. LEAD makes sense the moment she remembers that Tu Youyou got an idea from a book and then had to go and prove it.'
  },
  note: 'Nothing here is graded. Six flags on the right continents is a whole module landing at once.'
};

/* =========================================================================
 * THE MODULE
 * ========================================================================= */

export const HERBALISM_M13 = [
  {
    id: 'hb-m13-01',
    course: 'herbalism',
    module: 13,
    quarter: 4,
    week: 1,
    day: 1,
    n: 73,
    title: 'Why plants make chemicals at all',
    minutes: 45,
    spec: '§10 · beats',

    concept:
      'A plant cannot run, so it defends itself with chemistry, and every compound we later turned into a medicine was built by the plant for its own reasons rather than for us.',

    standards: [],

    words: ['compound', 'defence chemical', 'herbivore', 'bitter', 'allicin'],

    glossary: [
      { word: 'compound', plain: 'One kind of chemical, made of the same parts joined the same way every time.' },
      { word: 'defence chemical', plain: 'Something a plant builds to make eating it a bad idea.' },
      { word: 'herbivore', plain: 'An animal that eats plants.' },
      { word: 'bitter', plain: 'A sharp unpleasant taste that usually means stop.' },
      { word: 'allicin', plain: 'The sharp-smelling compound garlic makes the moment a clove is crushed.' },
      { word: 'curcumin', plain: 'The bright yellow compound inside turmeric.' },
      { word: 'gingerol', plain: 'The compound that makes fresh ginger taste hot.' },
      { word: 'antifeedant', plain: 'A chemical whose job is simply to make an animal stop eating.' }
    ],

    video: {
      id: 'Hja0SLs2kus',
      url: 'https://www.youtube.com/watch?v=Hja0SLs2kus',
      title: 'The amazing ways plants defend themselves - Valentin Hammoudi',
      channel: 'TED-Ed',
      minutes: 6,
      verified: '2026-08-15 · re-checked at youtube.com/oembed',
      teaches: [
        'that a plant is rooted in place and cannot escape anything that wants to eat it',
        'that plants make chemicals as a defence, which is the whole premise of this lesson',
        'that some defences are physical and some are chemical',
        'that a defence costs the plant something, so it has to be worth building'
      ],
      sourceGap:
        'OPEN. No Black American educator found for plant chemical defence at this level. Searched: "site:youtube.com TED-Ed why plants make poisons chemicals defense", "SciShow youtube why plants chemicals defense secondary metabolites video", "site:youtube.com Black American botanist plant scientist educator explains plant chemistry defense compounds", and "Black American herbalist OR botanist youtube educator plant medicine history science channel kids". The last two returned no verifiable individual video by a Black American educator on plant chemistry — results were blog posts, paid herbalism courses and a channel index. One near-miss WAS verified at noembed and left unused: _Oh3WXAycB8 "Black Botanists Who Changed The World | Black History In Botany" (Jake Inzerra), which is botany history rather than plant chemistry and comes from a single creator Gigi should preview first. Alexis Nikole Nelson is already the educator in Module 7 Lesson 37 and her material is foraging, not chemistry.'
    },

    checkIn: M13L1_CHECK_IN,
    beats: M13L1_BEATS,
    activity: M13L1_ACTIVITY,
    ledger: M13L1_LEDGER,

    hook: M13L1_CHECK_IN,
    core: M13L1_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing:
      'Survey her own four containers for chew damage, count the damaged leaves on each plant, and rank them from most eaten to least. Then predict which would be hardest for an insect to chew, and test the prediction with her nose: Gigi cuts one clove of garlic while Azianna stands back, and ten seconds later the board smells completely different from the whole clove that was sitting there before. Two labelled jars go on the shelf until tomorrow. Nothing is tasted at any point, because today the garlic is a sample and not food.',

    practice: [
      {
        ask: 'Why does a plant bother spending energy on a chemical that makes it taste bad?',
        answer: 'Because an animal that gets a mouthful goes away, so the plant survives long enough to make seed.',
        why: 'A defence only stays in a species if it keeps the defended plants alive to reproduce.'
      },
      {
        ask: 'Whole garlic barely smells. Why does cut garlic smell so strongly?',
        answer: 'Cutting mixes alliin with an enzyme the plant had kept apart from it, and allicin is made in seconds.',
        why: 'The defence is stored unloaded and only goes off when the plant is damaged.'
      }
    ],

    check: [
      {
        prompt: 'Why do plants make defence chemicals rather than running away?',
        choices: [
          'Because chemicals taste nice to plants',
          'Because a rooted plant cannot go anywhere',
          'Because insects asked them to',
          'Because sunlight forces them to'
        ],
        answer: 1,
        feedback: [
          'Plants do not taste anything. They have no tongue and no brain.',
          null,
          'Insects are the problem here, not the customer.',
          'Sunlight powers the plant. It does not choose what the plant builds.'
        ]
      },
      {
        prompt: 'Which word means an animal that eats plants?',
        choices: ['Herbivore', 'Compound', 'Antifeedant', 'Allicin'],
        answer: 0,
        feedback: [
          null,
          'A compound is a kind of chemical, not an animal.',
          'An antifeedant is the chemical that stops the eating.',
          'Allicin is the sharp compound in cut garlic.'
        ]
      },
      {
        prompt: 'Curcumin and gingerol were built by the plant for whose benefit?',
        choices: [
          'For cooks, so that food tastes better',
          'For doctors, so that medicines exist',
          'For the plant, to make eating it a bad idea',
          'For nobody at all, because they are accidents'
        ],
        answer: 2,
        feedback: [
          'Cooks came along millions of years after the compounds did.',
          'Doctors found them much later and put them to a different use.',
          null,
          'They cost energy to build, so they are not accidents.'
        ]
      }
    ]
  },

  {
    id: 'hb-m13-02',
    course: 'herbalism',
    module: 13,
    quarter: 4,
    week: 1,
    day: 2,
    n: 74,
    title: 'Willow bark to aspirin',
    minutes: 45,
    spec: '§10 · beats',

    concept:
      'Turning willow bark into aspirin took one hundred and thirty six years and five chemists, and every step of it was a step towards being able to measure exactly what was in the packet.',

    standards: [],

    words: ['salicin', 'isolate', 'active ingredient', 'batch', 'standardised'],

    glossary: [
      { word: 'salicin', plain: 'The compound Johann Buchner pulled out of willow bark in 1828.' },
      { word: 'isolate', plain: 'To separate one pure compound out of a mixture and hold it on its own.' },
      { word: 'active ingredient', plain: 'The one compound in a medicine that is doing the work.' },
      { word: 'batch', plain: 'One run of production, made together at the same time from the same materials.' },
      { word: 'standardised', plain: 'Made the same every time, on purpose, and checked to prove it.' },
      { word: 'acetylsalicylic acid', plain: 'The chemical name for aspirin.' },
      { word: 'Royal Society', plain: 'A very old science club in London where findings were reported.' }
    ],

    video: {
      id: 'uRhkDN2WjzI',
      url: 'https://www.youtube.com/watch?v=uRhkDN2WjzI',
      title: 'How aspirin was discovered - Krishna Sudhir',
      channel: 'TED-Ed',
      minutes: 6,
      verified: '2026-08-15 · re-checked at youtube.com/oembed',
      teaches: [
        'the long road from willow bark to a manufactured tablet',
        'that the useful compound had to be isolated before anything could be measured',
        'the named chemists and the century and a half the work took',
        'that aspirin is a made compound and not a piece of a plant'
      ],
      sourceGap:
        'OPEN. No Black American educator found for the history of aspirin. Searched: "site:youtube.com history of aspirin willow bark salicin chemistry video", "SciShow aspirin video youtube how aspirin", "site:youtube.com Reactions ACS aspirin chemistry willow bark video", and "site:youtube.com Periodic Videos OR Reactions aspirin acetylsalicylic acid". The aspirin searches returned a large number of herbal-remedy channels teaching viewers to make willow bark tea and tincture, every one of which is exactly what this course must not link to, and none of them were used or verified. Two alternates WERE verified at noembed: dZobSE6dOZU "How Aspirin Changed Medicine Forever" (SciShow), a good second choice if the TED-Ed is too short, and 823L6n0NTvg "Dr. Marie M. Daly: Chemistry Pioneer" (American Chemical Society), a biography of the first Black American woman to earn a chemistry doctorate — a real candidate for a future history lesson but not a lesson on aspirin.'
    },

    checkIn: M13L2_CHECK_IN,
    beats: M13L2_BEATS,
    activity: M13L2_ACTIVITY,
    ledger: M13L2_LEDGER,

    hook: M13L2_CHECK_IN,
    core: M13L2_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing:
      'Draw the aspirin story as a timeline to scale, at one centimetre for every five years, from the report of Edward Stone in 1763 to the worldwide name Aspirin in 1899. That puts Buchner at 13 centimetres, Piria at 15, Gerhardt at 18, Bayer at 26.8 and the name at 27.2, and the arithmetic is hers to do. Then find the longest empty gap and say what might have filled it. Gigi holds up one real medicine box and reads out the name of the active ingredient while Azianna writes it down and counts the other ingredients listed. The box never leaves the hands of Gigi.',

    practice: [
      {
        ask: 'What did Johann Buchner do in 1828, and why did it matter?',
        answer: 'He pulled salicin out of willow bark and named it, which meant people finally had a compound instead of a piece of bark.',
        why: 'A compound can be weighed and repeated. A piece of bark can be neither.'
      },
      {
        ask: 'Why can a tablet be trusted in a way that a piece of bark cannot?',
        answer: 'Because the amount in a tablet was measured and printed, while the amount in bark changes and nobody can see it.',
        why: 'Sameness every time is the whole basis on which a doctor can rely on a medicine.'
      }
    ],

    check: [
      {
        prompt: 'What did Johann Buchner name in 1828?',
        choices: ['Aspirin', 'Salicin', 'Quinine', 'Digitalis'],
        answer: 1,
        feedback: [
          'Aspirin was the name Bayer used from 1899, seventy one years later.',
          null,
          'Quinine came out of cinchona bark in 1820, and different chemists did it.',
          'Digitalis came from foxglove and belongs to a different story.'
        ]
      },
      {
        prompt: 'Bayer made acetylsalicylic acid pure and stable in which year?',
        choices: ['1763', '1838', '1897', '1935'],
        answer: 2,
        feedback: [
          'That is the year Edward Stone sent his report to the Royal Society.',
          'That is the year Raffaele Piria made salicylic acid from salicin.',
          null,
          'That is the year Percy Julian built physostigmine, in the next lesson.'
        ]
      },
      {
        prompt: 'What does standardised mean?',
        choices: [
          'Made the same every time and checked to prove it',
          'Made from a plant rather than in a factory',
          'Sold in more than one country',
          'Kept in a sealed box'
        ],
        answer: 0,
        feedback: [
          null,
          'Where it came from is a different question from whether it is consistent.',
          'That is about selling, not about the product being consistent.',
          'A sealed box protects it. It does not make it the same as the last one.'
        ]
      }
    ]
  },

  {
    id: 'hb-m13-03',
    course: 'herbalism',
    module: 13,
    quarter: 4,
    week: 1,
    day: 3,
    n: 75,
    title: 'Finding the active compound',
    minutes: 45,
    spec: '§10 · beats',

    concept:
      'A plant is a mixture of hundreds of compounds, so finding the one that does the work means splitting the mixture and testing the pieces over and over until a single pure compound is left.',

    standards: [],

    words: ['mixture', 'fraction', 'chromatography', 'pure compound', 'synthesis'],

    glossary: [
      { word: 'mixture', plain: 'Lots of different substances sitting together without being joined.' },
      { word: 'fraction', plain: 'One part of a mixture after it has been split up.' },
      { word: 'chromatography', plain: 'Letting a liquid carry a mixture along paper so the parts separate out.' },
      { word: 'pure compound', plain: 'One kind of chemical on its own, with nothing else mixed in.' },
      { word: 'synthesis', plain: 'Building a compound yourself instead of taking it out of a plant.' },
      { word: 'quinine', plain: 'The compound isolated from cinchona bark in 1820.' },
      { word: 'physostigmine', plain: 'The compound Percy Julian built in a laboratory in 1935.' },
      { word: 'pigment', plain: 'A compound that gives something its colour.' }
    ],

    video: {
      id: 'vt5dnwjgvPM',
      url: 'https://www.youtube.com/watch?v=vt5dnwjgvPM',
      title: 'The Story of: Percy L. Julian | Storytime | Black Voices in STEAM',
      channel: 'The Lawrence Hall of Science',
      minutes: 13,
      verified: '2026-08-15 · re-checked at youtube.com/oembed',
      teaches: [
        'who Percy Lavon Julian was and what he was up against',
        'that he built plant compounds in a laboratory rather than only extracting them',
        'that a chemist can be the reason a medicine exists at all',
        'a Black American scientist as the person at the centre of the story, not a footnote to it'
      ],
      sourceGap:
        'PARTLY CLOSED, and this is the one lesson in the module where it is. This video is an episode of an explicitly named Black Voices in STEAM series from The Lawrence Hall of Science, the public science centre at UC Berkeley, and its subject is a Black American chemist whose work is exactly this lesson. Verified at noembed: id, title and channel are as recorded. The series is verified across four sibling episodes found in search (Neil deGrasse Tyson, Katherine Johnson, Patricia Bath and this one). What could NOT be verified is who presents it, because YouTube video pages are not fetchable from this environment, so it is honest to say the source is a Black Voices in STEAM series about a Black American scientist rather than to claim the presenter. Gigi should watch it first. Searched to get here: "Black American chemist youtube educator pharmacology drug discovery science communicator channel" (nothing usable), "site:youtube.com Percy Julian chemist calabar bean physostigmine soybean forgotten genius video" (found this, plus Q0-ZyL0T8ic "NOVA | Forgotten Genius" from NOVA PBS Official, verified real and a strong alternate for an older child), and "Black Voices in STEAM Lawrence Hall of Science storytime series host" (confirmed the series, did not name the presenter).'
    },

    checkIn: M13L3_CHECK_IN,
    beats: M13L3_BEATS,
    activity: M13L3_ACTIVITY,
    ledger: M13L3_LEDGER,

    hook: M13L3_CHECK_IN,
    core: M13L3_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing:
      'Run paper chromatography on three washable felt tip pens. One fat dot of ink on a pencil line two centimetres up the strip, one centimetre of water in the glass, and ten minutes of watching the water climb and pull the dot apart into separate bands. Count the bands on each strip and mark where the water stopped. Gigi does an optional leaf run with rubbing alcohol herself, at a window, away from any flame. The conclusion is the point: one thing that looked single was a mixture the whole time, which is precisely what a plant extract is.',

    practice: [
      {
        ask: 'What is bioassay-guided fractionation, in your own words?',
        answer: 'Split the mixture, test every piece, keep the piece that works, and split that piece again.',
        why: 'Every round shrinks the crowd, and the loop only stops when one pure compound is left.'
      },
      {
        ask: 'Why did chemists want to build physostigmine rather than keep taking it from beans?',
        answer: 'Because a plant supply runs out and varies, while a compound built in a laboratory can be made steadily.',
        why: 'Synthesis protects the plant and gives a supply you can count on.'
      }
    ],

    check: [
      {
        prompt: 'What is a fraction?',
        choices: [
          'One part of a mixture after it has been split up',
          'A compound that has never been separated',
          'The colour a plant gives to water',
          'A number written above another number'
        ],
        answer: 0,
        feedback: [
          null,
          'A fraction is what you get after splitting, not before.',
          'That is a pigment, and it is a different word.',
          'That is a fraction in maths. In chemistry it means a separated part.'
        ]
      },
      {
        prompt: 'Pelletier and Caventou isolated which compound from cinchona bark in 1820?',
        choices: ['Salicin', 'Quinine', 'Physostigmine', 'Curcumin'],
        answer: 1,
        feedback: [
          'Salicin came out of willow bark eight years later, in 1828.',
          null,
          'Physostigmine was built by Percy Julian in 1935.',
          'Curcumin is the yellow compound in turmeric.'
        ]
      },
      {
        prompt: 'What does synthesis mean?',
        choices: [
          'Splitting a mixture into fractions',
          'Growing a plant in a container',
          'Building a compound yourself instead of extracting it',
          'Weighing a compound accurately'
        ],
        answer: 2,
        feedback: [
          'That is fractionation, and it is the step before this one.',
          'Growing is farming. Synthesis happens at a bench.',
          null,
          'Weighing is measurement, which matters, but it is not building.'
        ]
      }
    ]
  },

  {
    id: 'hb-m13-04',
    course: 'herbalism',
    module: 13,
    quarter: 4,
    week: 2,
    day: 1,
    n: 76,
    title: 'From a leaf to a pill',
    minutes: 45,
    spec: '§10 · beats',

    concept:
      'A tablet is a manufactured object in which every ingredient has a job and every run carries a number, so that any fault can be traced back to the day and the machine that made it.',

    standards: [],

    words: ['excipient', 'filler', 'binder', 'disintegrant', 'batch number'],

    glossary: [
      { word: 'excipient', plain: 'Any ingredient in a tablet that is not the active compound.' },
      { word: 'filler', plain: 'Something added to make a tablet big enough to handle.' },
      { word: 'binder', plain: 'Something that holds the powder together so the tablet does not crumble.' },
      { word: 'disintegrant', plain: 'Something that swells in water so the tablet breaks apart at the right time.' },
      { word: 'coating', plain: 'The smooth outer layer that seals a tablet until it is swallowed.' },
      { word: 'batch number', plain: 'A code that says exactly which production run something came from.' },
      { word: 'recall', plain: 'Calling every box from one batch back in, because something was found wrong.' }
    ],

    video: {
      id: 'YBAswFuRJMU',
      url: 'https://www.youtube.com/watch?v=YBAswFuRJMU',
      title: 'Making Medicine - How Tablets are Made - Naked Engineering',
      channel: 'NakedScientists',
      minutes: 4,
      verified: '2026-08-15 · re-checked at youtube.com/oembed',
      teaches: [
        'what actually happens inside a tablet press',
        'that a tablet is mostly not the active compound',
        'that powder has to flow, pack and hold together for a machine to work',
        'that this is engineering and measurement rather than cooking'
      ],
      sourceGap:
        'OPEN. No Black American educator found for pharmaceutical manufacture. Searched: "site:youtube.com how tablets are made pharmaceutical tablet manufacturing process factory video" and "site:youtube.com Black pharmacist educator explains how medicines are made pharmacy science channel". The second returned generic pharmacy and pharmacology channels and a WIRED Tech Support episode, none of them by a Black American educator, and nothing from it was verified or used. Worth trying before this module is reprinted: "The Black Food Scientist" (youtube.com/@Theblackfoodscientist), flagged in the Module 11 header for the same reason — process, formulation and quality control are that channel subject matter, and a single verified video on manufacturing or quality control would close this lesson outright. No individual video id from that channel surfaced in search that could be verified, so nothing was used.'
    },

    checkIn: M13L4_CHECK_IN,
    beats: M13L4_BEATS,
    activity: M13L4_ACTIVITY,
    ledger: M13L4_LEDGER,

    hook: M13L4_CHECK_IN,
    core: M13L4_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing:
      'Press six pellets from damp cornflour tinted with a pinch of her own turmeric, using a bottle cap as the die, and stand a NOT MEDICINE card beside the work before starting. Weigh all six on the kitchen scale, find the heaviest and the lightest and work out the gap, then argue about how small a real factory would have to get that gap. Write a batch number on tape and label the jar. Drop one pellet into a glass of water and time how long it takes to fall apart, which is the disintegrant job being done badly by cornflour alone. Nothing goes anywhere near a mouth.',

    practice: [
      {
        ask: 'Why is most of a tablet not the active compound?',
        answer: 'Because the compound is often a speck, so fillers and binders turn it into an object a person can hold and count.',
        why: 'Nobody could handle, count or swallow an amount that small on its own.'
      },
      {
        ask: 'What does a batch number let a company do that nothing else can?',
        answer: 'Trace every box from one production run and call all of them back if a test fails.',
        why: 'Thousands of identical boxes become a list somebody can actually follow.'
      }
    ],

    check: [
      {
        prompt: 'Which ingredient swells in water so a tablet breaks apart?',
        choices: ['Filler', 'Binder', 'Coating', 'Disintegrant'],
        answer: 3,
        feedback: [
          'A filler adds bulk. It does not decide when the tablet opens.',
          'A binder does the opposite job, holding everything together.',
          'A coating seals it up until then.',
          null
        ]
      },
      {
        prompt: 'What is an excipient?',
        choices: [
          'The active compound in a medicine',
          'Any ingredient in a tablet that is not the active compound',
          'The machine that presses tablets',
          'The number printed on the box'
        ],
        answer: 1,
        feedback: [
          'The active compound is the one thing an excipient is not.',
          null,
          'That is a tablet press, and it is a machine rather than an ingredient.',
          'That is the batch number.'
        ]
      },
      {
        prompt: 'A test finds a fault in one batch. What happens next?',
        choices: [
          'Every box from that batch number is called back',
          'Every box the company has ever made is called back',
          'Nothing, because the tablets are already sold',
          'The factory prints a new number on the same boxes'
        ],
        answer: 0,
        feedback: [
          null,
          'That is the point of the number. It narrows the recall to the batch that failed.',
          'Being sold already is exactly why the number exists.',
          'Changing the number would destroy the only record there is.'
        ]
      }
    ]
  },

  {
    id: 'hb-m13-05',
    course: 'herbalism',
    module: 13,
    quarter: 4,
    week: 2,
    day: 2,
    n: 77,
    title: 'The dose makes the poison',
    minutes: 45,
    spec: '§10 · beats',

    concept:
      'Whether a substance harms a person depends on how much of it there is, which is true of water and salt and oxygen too, so anything strong enough to help is strong enough to hurt and the measuring is a job for a doctor and a pharmacist.',

    standards: [],

    words: ['dose', 'concentration', 'dilution', 'toxicology', 'pharmacist'],

    glossary: [
      { word: 'dose', plain: 'How much of a substance there is, worked out and written down by a grown-up whose job it is.' },
      { word: 'concentration', plain: 'How crowded a substance is in whatever it is mixed into.' },
      { word: 'dilution', plain: 'Adding more liquid so the same amount of something is spread thinner.' },
      { word: 'toxicology', plain: 'The study of how substances harm living things, and at what amount.' },
      { word: 'pharmacist', plain: 'The trained person who checks and prepares what a doctor has worked out.' },
      { word: 'Paracelsus', plain: 'A Swiss doctor who died in 1541 and wrote that only the dose makes the poison.' },
      { word: 'digitalis', plain: 'The heart medicine that came out of the foxglove plant.' },
      { word: 'foxglove', plain: 'A tall flower that gave us a real medicine and is genuinely poisonous to eat.' }
    ],

    video: {
      id: 'TvcbIXvWl_k',
      url: 'https://www.youtube.com/watch?v=TvcbIXvWl_k',
      title: 'How Much Water Can Kill You?',
      channel: 'Reactions',
      minutes: 5,
      verified: '2026-08-15 · re-checked at youtube.com/oembed',
      teaches: [
        'that even water harms a person in a large enough amount',
        'that the amount is what decides, not the name of the substance',
        'that this is measurable chemistry rather than an opinion',
        'the exact principle this lesson teaches, using the exact example this lesson uses'
      ],
      sourceGap:
        'OPEN. No Black American educator found for dose-response or toxicology at this level. Searched: "site:youtube.com the dose makes the poison Paracelsus toxicology explained video", "site:youtube.com SciShow too much water water intoxication hyponatremia can kill you", and "site:youtube.com Black toxicologist OR Black scientist explains poison dose safety chemistry educator". The last search returned two shorts about Black scientists, a WIRED toxicologist episode and several wellness channels selling fear about household products, and none of them were by a Black American educator teaching dose-response, so nothing from it was verified or used. Reactions is the American Chemical Society channel, which is the right editorial standard for the single most delicate lesson in the course, and the title states the content unambiguously. GIGI SHOULD WATCH THIS ONE FIRST WITHOUT FAIL — the title is blunt, and the whole lesson depends on it landing as caution rather than as a dare.'
    },

    checkIn: M13L5_CHECK_IN,
    beats: M13L5_BEATS,
    activity: M13L5_ACTIVITY,
    ledger: M13L5_LEDGER,

    hook: M13L5_CHECK_IN,
    core: M13L5_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing:
      'Two halves, and the second half is the argument. First a dilution series: one drop of food colouring into 10, 50, 250 and 1000 millilitres of water, lined up against a window, where she can plainly see the same one drop giving four different colours. Then Gigi makes up three identical glasses of 200 millilitres out of sight, one plain, one with a level teaspoon of salt and one with four, and Azianna has to say which is which by looking. She cannot. Nothing is tasted. The scale settles it, because the heaviest glass holds the most salt, and the point lands on its own: colour let her see the amount and salt did not, and almost everything is like the salt.',

    practice: [
      {
        ask: 'Say the principle of Paracelsus in your own words.',
        answer: 'Nothing is safe or dangerous by itself, because the amount is what decides.',
        why: 'Water, salt and oxygen are all needed every day and all harmful in the wrong amount.'
      },
      {
        ask: 'Why can a leaf never be a measured amount?',
        answer: 'Because two leaves off one plant hold different amounts, and nobody can see how much is inside either of them.',
        why: 'Strong enough to help is strong enough to hurt, which is why a doctor and a pharmacist measure and I do not.'
      }
    ],

    check: [
      {
        prompt: 'What did Paracelsus mean by only the dose makes the poison?',
        choices: [
          'That natural things are always safe',
          'That poisons are a made-up idea',
          'That the amount decides whether a substance harms you',
          'That everything is poisonous all of the time'
        ],
        answer: 2,
        feedback: [
          'Water is natural and harms a person in a large enough amount.',
          'Poisons are real. He was explaining what makes something act as one.',
          null,
          'At the right amount, water and salt and oxygen keep you alive.'
        ]
      },
      {
        prompt: 'One drop of colouring goes into a small glass and one into a large jug. What is different?',
        choices: [
          'The concentration, because the same drop is spread through more water',
          'The number of drops, because bigger containers need more',
          'The colour of the drop itself, which changes in a jug',
          'Nothing at all, because it is one drop either way'
        ],
        answer: 0,
        feedback: [
          null,
          'You put exactly one drop in each. That was the whole design.',
          'The drop is the same drop. Only its surroundings changed.',
          'One drop either way, and yet the two glasses look nothing alike.'
        ]
      },
      {
        prompt: 'Who works out and checks how much of a medicine a person gets?',
        choices: [
          'Anybody who has read about it online',
          'A doctor, and then a pharmacist who checks her',
          'Whoever is holding the box',
          'The person taking it, by how they feel'
        ],
        answer: 1,
        feedback: [
          'Reading about something is not measuring it, and it is not training either.',
          null,
          'Holding a box is not the same as being trained to work out an amount.',
          'Feelings are not a measurement, and you cannot see an amount at all.'
        ]
      }
    ]
  },

  {
    id: 'hb-m13-06',
    course: 'herbalism',
    module: 13,
    quarter: 4,
    week: 2,
    day: 3,
    n: 78,
    title: 'What we still get from plants',
    minutes: 45,
    spec: '§10 · beats',

    concept:
      'Plants are still giving medicine to the world right now, and every one of those medicines had to be isolated and tested, because an old book or a local story is a lead worth following and never a proof.',

    standards: [],

    words: ['periwinkle', 'paclitaxel', 'artemisinin', 'essential medicine', 'lead'],

    glossary: [
      { word: 'periwinkle', plain: 'A small pink flower from Madagascar that gave us two cancer medicines.' },
      { word: 'vincristine', plain: 'A medicine isolated from that periwinkle in 1961.' },
      { word: 'paclitaxel', plain: 'A cancer medicine first taken out of Pacific yew bark in 1966.' },
      { word: 'artemisinin', plain: 'The compound Tu Youyou got out of sweet wormwood in 1972.' },
      { word: 'essential medicine', plain: 'A medicine on the World Health Organization list of the ones every country needs.' },
      { word: 'lead', plain: 'A clue worth following, which is not the same thing as an answer.' },
      { word: 'malaria', plain: 'A disease carried by mosquitoes that still makes millions of people ill each year.' },
      { word: 'leukaemia', plain: 'A cancer that starts in the blood.' }
    ],

    video: {
      id: '0hLx_1Q15eY',
      url: 'https://www.youtube.com/watch?v=0hLx_1Q15eY',
      title: 'Where Do Our Drugs Come From?',
      channel: 'MinuteEarth',
      minutes: 3,
      verified: '2026-08-15 · re-checked at youtube.com/oembed',
      teaches: [
        'that a large share of modern medicines began as compounds found in living things',
        'that finding them means searching, isolating and testing',
        'that the searching is still going on now',
        'that plants are a source of leads rather than a shelf of finished remedies'
      ],
      sourceGap:
        'OPEN. No Black American educator found for plant-derived medicines. Searched: "site:youtube.com where do medicines come from plants drug discovery natural products chemistry video Reactions", "site:youtube.com SciShow medicines that came from plants foxglove periwinkle yew", "site:youtube.com Tu Youyou artemisinin Nobel Prize 2015 sweet wormwood malaria video", and "site:youtube.com Raven the Science Maker OR Dr Raven Baxter science video chemistry molecules". The last search confirmed that Dr Raven Baxter, a Black American molecular biologist and science communicator, has a channel (youtube.com/@RaventheScienceMaven), but no individual video of hers on plant-derived medicines surfaced that could be verified, so nothing was used. That channel is the best remaining lead for this module and is worth an hour of somebody time. Two alternates WERE verified at noembed and left unused: x5fEk3S6QIw "Tu Youyou and the Discovery of Artemisinin - 2015 Nobel Laureate in Physiology or Medicine" (World Scientific), which is on-topic but is from an academic publisher and is probably pitched well above ten years old, and hlC7xPTefu0 "Lifesaving Medicines Made From Plants You have Never Heard Of" (DocUnlock), a medical channel and therefore the wrong register for this course.'
    },

    checkIn: M13L6_CHECK_IN,
    beats: M13L6_BEATS,
    activity: M13L6_ACTIVITY,
    ledger: M13L6_LEDGER,

    hook: M13L6_CHECK_IN,
    core: M13L6_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing:
      'Build a medicine map. One paper flag for each of willow, cinchona, foxglove, Madagascar periwinkle, Pacific yew and sweet wormwood, with the compound written on the back of each, pinned to the place it came from: Europe, the Andes, Britain, Madagascar, the north west coast of the United States and China. Add the calabar bean on West Africa with the name Percy Julian beside it, and 2015 and Tu Youyou beside China. Count the continents, then circle anything that could actually grow outdoors in Georgia. Foxglove and yew are on the map and are studied rather than picked, because both will hurt a person who eats them.',

    practice: [
      {
        ask: 'What did the old handbook actually give Tu Youyou?',
        answer: 'One good idea about using a low temperature, which was a lead and not a proof.',
        why: 'She still had to isolate artemisinin and test it herself, and that is what the Nobel Prize was for.'
      },
      {
        ask: 'Why did nobody know about vincristine until 1961, when the periwinkle was already common in gardens?',
        answer: 'Because growing a plant is not testing it, and nobody had isolated that compound before.',
        why: 'A compound stays hidden until somebody separates it out and puts it through a test.'
      }
    ],

    check: [
      {
        prompt: 'Which plant did artemisinin come out of?',
        choices: ['Pacific yew', 'Sweet wormwood', 'Madagascar periwinkle', 'Cinchona'],
        answer: 1,
        feedback: [
          'Pacific yew gave us paclitaxel.',
          null,
          'The periwinkle gave us vinblastine and vincristine.',
          'Cinchona bark gave us quinine.'
        ]
      },
      {
        prompt: 'In 2015 Tu Youyou was awarded what?',
        choices: [
          'Half of the Nobel Prize in Physiology or Medicine',
          'A patent on the sweet wormwood plant',
          'The first Nobel Prize ever given',
          'A place on the World Health Organization list'
        ],
        answer: 0,
        feedback: [
          null,
          'You cannot patent a wild plant, and that is not what she was recognised for.',
          'Nobel Prizes had been awarded since 1901.',
          'That list is for medicines, not for people.'
        ]
      },
      {
        prompt: 'An old text mentions a plant. What is that text, at best?',
        choices: [
          'A proof, because it is very old',
          'Worthless, because old writing is never useful',
          'A lead worth testing properly',
          'A recipe anybody can follow at home'
        ],
        answer: 2,
        feedback: [
          'Age is not evidence. Plenty of old ideas turned out to be wrong.',
          'Tu Youyou showed the opposite, and it won a Nobel Prize.',
          null,
          'That is the one thing it is never, and following one is how people get hurt.'
        ]
      }
    ]
  }
];

export const HERBALISM_M13_META = {
  courseId: 'herbalism',
  module: 13,
  title: 'From Plant to Medicine',
  blurb:
    'How a plant becomes a drug. Why a rooted plant defends itself with chemistry in the first place, the hundred and thirty six years it took to get from willow bark to a tablet, how chemists split a mixture until one pure compound is left, what is actually inside a pill and why every batch carries a number, why the amount decides everything and why the measuring belongs to a doctor and a pharmacist, and the medicines plants are still giving the world today.'
};

export function m13LessonById(id) {
  return HERBALISM_M13.find((l) => l.id === id) || null;
}

export default HERBALISM_M13;
