// ---------------------------------------------------------------------------
// HERBALISM & BOTANY — MODULE 11 · THE APOTHECARY
// QUARTER 3 · WEEKS 5 AND 6 · LESSONS 61–66 of 96
//
//   hb-m11-01  W5 D1  The tools on the bench
//   hb-m11-02  W5 D2  Weighing and measuring properly
//   hb-m11-03  W5 D3  Drying, and why it works
//   hb-m11-04  W6 D1  Infusion, decoction, maceration
//   hb-m11-05  W6 D2  Shelf life and spoilage
//   hb-m11-06  W6 D3  The label is the science
//
// Built to /home/claude/LESSON-SPEC-Q3Q4.md (reading level) and
// /home/claude/LESSON-SPEC.md (everything else), to the shape of
// src/data/lessons/herbalismM7.js — its Quarter 2 predecessor — and written
// harder, because that is what Quarter 3 is for.
//
// ---- WHAT THIS MODULE IS, AND WHAT IT IS FLATLY NOT ----
//
// This module is TECHNIQUE, MEASUREMENT AND RECORD-KEEPING. Mass, volume,
// temperature, time, water content, evaporation, surface area, extraction,
// contamination, spoilage, labelling and dating. It is kitchen and laboratory
// practice, and every one of those words is a physical-science word.
//
// It is NOT about treating anything, and it must never read as though it is.
// There is no dosing anywhere in these six lessons: no amount is ever framed as
// an amount FOR a person, no plant is ever "good for" anything, nothing is a
// remedy, and no sentence tells her to take, drink or use a plant for a
// symptom. The masses and volumes in here (10 g of dried mint, 200 mL of water)
// are laboratory quantities in an extraction experiment, exactly as a gram of
// salt in a dissolving experiment is, and every one of them sits in a table
// with a temperature and a time beside it.
//
// The materials are ordinary culinary herbs — peppermint, lemon balm, rosemary,
// and her own garlic, ginger and turmeric in their containers in Georgia. The
// outputs are a cup of tea, a dried jar and a labelled sample. Never a
// preparation for a person's body.
//
// The line is tighter here than anywhere else in the course because this is the
// module where the temptation to slide from craft into instructions is real.
// Lesson 64 in particular teaches three real extraction methods, and it teaches
// them by WHAT PHYSICALLY HAPPENS — hot water on thin leaves, a simmer for
// dense roots and bark, a long cold soak when heat would drive the smell off.
// That is botany and physical science. It is not medicine, and the lesson never
// says what any of it is for, because it is not for anything. It is an
// experiment about water and plant material.
//
// ---- LESSON 66 IS THE SPINE OF THE MODULE ----
//
// A label that says what the plant is, which part it is, when it was picked,
// how it was prepared, and the date — that is the difference between a
// scientist and a guess. It is also the single habit a future doctor needs
// most, and it is the habit this whole module is built to install. Lessons 61
// to 65 each end with something labelled and dated; Lesson 66 is where she
// finds out why, by being handed her own jars back and having to reconstruct
// what happened to them from the label alone. If a future editor trims one
// lesson from this module, it is not this one.
//
// ---- standards: [] ON ALL SIX, ON PURPOSE ----
//
// Same call Module 7 made, for the same reason. Georgia's fourth-grade science
// map has no element about measurement technique, food preservation practice,
// extraction or record-keeping. Module 10 discharged the last of Herbalism's
// ten assigned elements (S4E4b and S4E4d), so this module owes none and is not
// going to borrow one. No offGrade code either: off-grade means a real Georgia
// element from a lower grade, and this is not an element from any grade. Six
// empty arrays, deliberately.
//
// ---- THE READING LEVEL WENT UP, AND HOW ----
//
// Quarter 3 targets Flesch-Kincaid 2.5–3.5, about nine words a sentence, about
// six percent long words. That was reached by joining clauses that belong
// together and by using because / so / unless / while / even though, not by
// padding. Apply-Its ask her to compare, predict and explain. Read-aloud stays
// on every screen. New vocabulary — infusion, decoction, maceration, tare,
// evaporation, spoilage, surface area — each gets a glossary card in plain
// words, and those words should be added to the SUBJECT exemption set in
// scripts/check-assessment.mjs when this merges:
//
//   infusion, infusions, decoction, decoctions, maceration, macerate,
//   extraction, solvent, apothecary, mortar, pestle, spoilage, brittle,
//   millilitre, millilitres, milliliter, peppermint, spearmint, rosemary,
//   turmeric, volatile, repeatable, contamination
//
// ---- VIDEOS: ALL SIX VERIFIED AT NOEMBED ON 2026-08-14 ----
//
// Every id, title and channel below was fetched from
// https://noembed.com/embed?url=... and is recorded EXACTLY as returned. What
// could NOT be done is read the descriptions or the transcripts: youtube.com
// is disallowed to the fetcher by robots.txt and curl through the environment's
// proxy is refused (403 on CONNECT). So verification ran through noembed only,
// DURATIONS ARE UNKNOWN, and every `minutes` field is null rather than a
// plausible-looking guess — the same call Modules 3 and 10 made. Each video was
// chosen on a title that states its content unambiguously and on a channel with
// a known editorial standard. Gigi should watch each one before Azianna does,
// which is the standing rule anyway.
//
// ---- THE BLACK-AMERICAN-EDUCATOR GAP IS OPEN IN ALL SIX ----
//
// Stated plainly rather than softened: this module closes the gap in none of
// its six lessons. Every search that was run is recorded in the relevant
// `sourceGap` string, and the near-misses are named there too, including two
// that were verified at noembed and then REJECTED on grounds other than
// existence:
//
//   ptuZuYJpsv8  "Early education of African American pharmacists"
//                — MedicalUpdateOnline. Verified real. Not used: the channel
//                  is a medical channel, the pitch is adult, and a module that
//                  must never read as medicine is the wrong place to bring a
//                  medical channel in. Recorded so nobody re-finds it and
//                  assumes it was missed.
//   2yXSQ1BmZFM  "A flavorful field guide to foraging | Alexis Nikole Nelson |
//                  TED" — TED. Verified real, and she is already the educator
//                  in Module 7 Lesson 37. It is a foraging talk and does not
//                  teach bench technique, so it is a genuine alternate for a
//                  future foraging lesson rather than for anything here.
//
// The closest live lead, still unresolved, is "The Black Food Scientist"
// (youtube.com/@Theblackfoodscientist). Food science is exactly this module's
// subject matter — water activity, shelf life, spoilage, labelling — and a
// single verified video from that channel on spoilage or shelf life would close
// Lesson 65 outright. No individual video id from it surfaced in search that
// could be verified, so nothing was used. That is an hour of somebody's time
// well spent, and it is the first thing to try before this module is reprinted.
//
// ---- SAFETY STRINGS ----
//
// Boiling water, the stove and the oven are grown-up jobs and every lesson that
// touches one says so in `safety`. Nothing in any of the six lessons is tasted
// unless Gigi hands it over herself, and the two lessons that produce something
// drinkable (64) or openable (65) say it twice.
// ---------------------------------------------------------------------------

/* =========================================================================
 * LESSON 61 · hb-m11-01 · The tools on the bench
 * ========================================================================= */

const M11L1_CHECK_IN = {
  title: 'Five jobs, one bench',
  text: 'Clear a table and look at what the work actually needs. Something to crush with, something to weigh with, something to strain through, something to store in, and something to write with. Nothing belongs on that table unless it does one of those five jobs.',
  question: 'Which of the five do you think people get wrong most often, and why?'
};

const M11L1_BEATS = [
  {
    n: 1,
    label: 'Every tool does one job',
    hook: 'The word apothecary comes from a Greek word meaning storehouse. The room was named after its jars, not after the person standing in it.',
    teachingText:
      'A working bench has five jobs on it: crush, weigh, separate, store and record. Each tool is built for exactly one of them, so reaching for the wrong one goes wrong before the work has even started.',
    example:
      'A mortar crushes dried rosemary, a strainer separates the powder from the woody bits, and a jar with a good lid holds what is left. Gigi kitchen already has all three of those.',
    applyIt: {
      prompt: 'You ground some dried peppermint, and now small stems are mixed all through the powder. Which tool comes next?',
      choices: [
        'A sieve, so the powder drops through and the stems stay behind',
        'The scale, because then you know the mass',
        'A funnel, because then nothing spills',
        'A heavier pestle, so you can grind it harder'
      ],
      answer: 0,
      feedback: [
        null,
        'Weighing tells you how much there is, not which bits are which.',
        'A funnel moves things into a jar without sorting them at all.',
        'Grinding harder gives you smaller stems, not fewer stems.'
      ],
      why: 'Separating is a job of its own, and a sieve is the tool built to do it.'
    }
  },
  {
    n: 2,
    label: 'Why crushing changes anything',
    hook: 'A tea bag brews faster than a whole leaf, because the leaf inside it was cut into tiny pieces first.',
    teachingText:
      'Crushing does not make anything new appear. It breaks one piece into many, so far more of the plant is touching the water. That extra outside is called surface area, and it is the reason a mortar exists at all.',
    example:
      'Hold a whole sprig of dried rosemary in one hand and a pinch of ground rosemary in the other. The ground pinch smells stronger straight away, because the pestle broke open cells that were holding the smell in.',
    applyIt: {
      prompt: 'Same rosemary, same warm water, same ten minutes. One sample is a whole sprig and one was ground. Which water colours faster?',
      choices: [
        'They will match exactly, because it is the same plant',
        'Neither, because rosemary puts no colour in water',
        'The ground one, because much more of it touches the water',
        'The whole one, because the sprig is bigger'
      ],
      answer: 2,
      feedback: [
        'Same plant, but not the same amount of surface, so not the same speed.',
        'Rosemary tints water a pale gold, and you can watch it happen.',
        null,
        'A big piece has less surface touching water than the same piece crushed.'
      ],
      why: 'More surface touching water means faster extraction, which is why anything tough gets crushed first.'
    }
  }
];

const M11L1_ACTIVITY = {
  title: 'Set up the bench, then grind and sift',
  prep: 'Ask Gigi which counter you may use, and clear it right down to bare surface. Wash and dry every tool before anything starts, because a clean bench is part of the method and not a chore that comes after it.',
  needs: [
    'a mortar and pestle, or a sturdy bowl and the back of a heavy spoon',
    'a kitchen scale that reads in grams',
    'a tea strainer or a small sieve',
    'two small bowls',
    'a clean dry jar with a lid',
    'masking tape and a pen',
    'a magnifier',
    'a small handful of dried rosemary or dried mint'
  ],
  steps: [
    'Write five cards: CRUSH, WEIGH, SEPARATE, STORE, RECORD.',
    'Lay the cards in a row and set the right tool behind each one.',
    'Weigh your dried rosemary first, and write the mass in grams before you touch it.',
    'Grind it for one full minute, pressing and turning rather than pounding at it.',
    'Hold the mortar steady with your other hand so that nothing slides on the counter.',
    'Tip everything into the strainer over a bowl, and shake it gently until it stops falling through.',
    'Look at both piles under the magnifier and write down how they are different.',
    'Weigh the fine powder, then weigh whatever stayed behind in the strainer.',
    'Add those two masses together and compare the total to your very first number.',
    'Pour the powder into the jar, then label it with the plant, the part and today date.',
    'Wash every tool and dry it properly, because a damp tool spoils the next batch.'
  ],
  safety:
    'Nothing in this lesson is tasted, not one crumb. A mortar is heavy, so keep it in the middle of the counter and keep your fingers off the rim while you grind. Wash your hands before you start and again at the end.',
  grownUpAsks: [
    'Before we clear anything. What do you think belongs on a bench like this?',
    'Say the five jobs back to me without looking at your cards.',
    'You weighed it before grinding. Why does the order of those two matter?',
    'Feel the inside of the mortar. Why is it rough instead of smooth?',
    'Smell the whole sprig, then the powder. Describe the difference in words.',
    'Where did the smell come from? It was in there the whole time.',
    'Your two masses added up. Should they match the first number exactly?',
    'If they do not match, where did the missing bit go?',
    'Which of these five tools could you replace with something else in this kitchen?',
    'What would go wrong if we put damp powder into that jar?',
    'Say the rule out loud. What do we never do with anything on this bench?'
  ]
};

const M11L1_LEDGER = {
  sheet: 'M11L1-set-up-the-bench-PRINTABLE.pdf',
  tasks: [
    'Draw your bench from above, with all five stations named.',
    'Write the mass before grinding, the powder mass, and the mass left in the sieve.',
    'Write one sentence about how the powder and the sprig smelled different.',
    'Copy your jar label onto the sheet. Plant, part and date, all three.'
  ],
  game: {
    title: 'Word Boss',
    cards: ['MORTAR', 'PESTLE', 'SIEVE', 'SURFACE AREA', 'APOTHECARY'],
    rounds: [
      'Say what each word means in your own words. No fancy talk.',
      'A grown-up says the meaning. You say the word. Beat the clock.',
      'Touch the real tool for every card you can. Say what job it does.'
    ],
    ifSheIsStuck:
      'Put the whole sprig in one hand and the ground powder in the other. SURFACE AREA stops being a phrase the moment she can smell the difference.'
  },
  note: 'Nothing here is graded. Nothing is corrected. Petals are for doing it.'
};

/* =========================================================================
 * LESSON 62 · hb-m11-02 · Weighing and measuring properly
 * ========================================================================= */

const M11L2_CHECK_IN = {
  title: 'Two cups that are not the same',
  text: 'Fill a cup to the brim with whole dried mint. Fill a second cup to the brim with the same mint, ground. Both cups are full, so both hold the same volume — but put them on a scale and the two numbers are nowhere near each other.',
  question: 'If the cups match and the numbers do not, which measurement would you trust?'
};

const M11L2_BEATS = [
  {
    n: 1,
    label: 'Mass and volume ask different questions',
    hook: 'Bakers weigh flour instead of scooping it, because two people scooping the same cup can end up with very different amounts.',
    teachingText:
      'Volume asks how much room a thing takes up, while mass asks how much matter is actually in it. Dried leaves are mostly air, so a cup of them can hold almost any mass at all, depending on how hard somebody pressed.',
    example:
      'A cup of your whole peppermint might weigh six grams, and a cup of the same mint ground can weigh three times that. Nothing was added to it. It simply packed tighter.',
    applyIt: {
      prompt: 'Gigi presses her cup down hard while you spoon yours in loosely. Whose cup holds more mint?',
      choices: [
        'There is no way anybody could tell',
        'Gigi cup, because pressing forced more leaf into the same space',
        'Yours, because loose leaves are lighter and lighter means more',
        'They match, because the two cups are the same size'
      ],
      answer: 1,
      feedback: [
        'You can tell exactly, as soon as both cups go on the scale.',
        null,
        'Lighter means less matter in there, which is the opposite of more mint.',
        'Same space is not the same amount of leaf inside that space.'
      ],
      why: 'The volume was equal and the mass was not, which is why the scale settles the argument.'
    }
  },
  {
    n: 2,
    label: 'Tare it, then write the unit',
    hook: 'Tare is the button that tells a scale to forget the jar and count only what you put in next.',
    teachingText:
      'Set the empty jar on the scale and press tare, so the display drops back to zero. Now the number you read is the plant on its own. Then write that number with its unit, because a 12 with nothing after it means nothing at all.',
    example:
      'Your jar weighs 210 grams empty. Press tare, spoon mint in until it reads 12 grams, and you know you have 12 grams of mint rather than 222 grams of mint and glass together.',
    applyIt: {
      prompt: 'You weigh mint in a bowl without taring, and you write 65 in your notebook. What is wrong a week later?',
      choices: [
        'Nothing is wrong, because 65 is a real number',
        'The dried mint has grown heavier in the jar',
        'The scale will have forgotten the reading',
        'You cannot tell how much of that 65 was just the bowl'
      ],
      answer: 3,
      feedback: [
        'A number nobody can explain later is not a measurement.',
        'Dried mint sitting in a jar does not gain mass on its own.',
        'The scale is fine. It is the record that failed.',
        null
      ],
      why: 'A measurement only counts if somebody else could repeat it and land on the same number.'
    }
  }
];

const M11L2_ACTIVITY = {
  title: 'Three scoops, one scale',
  prep: 'Set the scale on a flat counter, not on a wobbly board, and put fresh batteries in it if the display flickers. Have your log open before you touch anything, because a number you remember is not a number you recorded.',
  needs: [
    'a kitchen scale that reads in grams',
    'a measuring cup',
    'a measuring jug marked in millilitres',
    'a jar with a lid',
    'a bowl',
    'cold tap water',
    'dried mint or dried rosemary',
    'her Plant Detective Log and a pen'
  ],
  steps: [
    'Zero the scale with nothing on it, so you know it starts honest.',
    'Scoop one level cup of dried mint, weigh it, and write the mass in grams.',
    'Tip it back, scoop again the same way, and weigh it again.',
    'Do it a third time, then find your biggest number and your smallest.',
    'Subtract the smallest from the biggest. That gap is how wrong a cup can be.',
    'Now stand your jar on the scale and press tare until the display reads zero.',
    'Spoon mint in until it reads exactly 10 grams, then stop and screw the lid on.',
    'Measure 100 millilitres of water in the jug, on the table, with your eye level with the mark.',
    'Tare a bowl on the scale, pour that water in, and read the mass.',
    'Write what you found: 100 millilitres of water comes out at very nearly 100 grams.',
    'Write every number in your log with its unit beside it, every single time.'
  ],
  safety:
    'Cold tap water only, because nothing in this lesson needs heating. Nothing is tasted. Wipe up spills straight away so the scale stays dry, and wash your hands at the end.',
  grownUpAsks: [
    'Before we start. Which do you think is fairer, a cup or a scale?',
    'Your three scoops came out different. Does that mean you did it badly?',
    'What is the biggest gap between any two of your scoops?',
    'Why did we press tare instead of doing the subtraction ourselves?',
    'Read the jug from above, then from eye level. Do you get the same answer?',
    'You wrote 10. Ten what? Tell me why that matters in a year.',
    'Water came out at about 100 grams for 100 millilitres. Would mint do that?',
    'Somebody else follows your notes tomorrow. Could they get your numbers?',
    'Which measurement in this house do you trust least, and why?',
    'A doctor writes the number and the unit every time. What is she protecting against?',
    'Say the rule back to me. What do we never do on this bench?'
  ]
};

const M11L2_LEDGER = {
  sheet: 'M11L2-three-scoops-one-scale-PRINTABLE.pdf',
  tasks: [
    'Fill the table with your three scoop masses, in grams.',
    'Write the biggest, the smallest, and the gap between them.',
    'Write what the scale said for 100 millilitres of water.',
    'Write one sentence: why is a scale fairer than a cup?'
  ],
  game: {
    title: 'Word Boss',
    cards: ['MASS', 'VOLUME', 'GRAM', 'MILLILITRE', 'TARE'],
    rounds: [
      'Say what each word means in your own words. No fancy talk.',
      'A grown-up says the meaning. You say the word. Beat the clock.',
      'Point at the tool that measures each one. TARE is a button, not a tool.'
    ],
    ifSheIsStuck:
      'Hand her the full cup and the 10 gram jar at the same time. MASS is in one hand and VOLUME is in the other.'
  },
  note: 'Nothing here is graded. A messy first scoop is data, not a mistake.'
};

/* =========================================================================
 * LESSON 63 · hb-m11-03 · Drying, and why it works
 * ========================================================================= */

const M11L3_CHECK_IN = {
  title: 'Where did forty grams go?',
  text: 'Weigh 50 grams of fresh mint from the garden and spread it out on a rack. Weigh those very same leaves a week later and the scale says about 10 grams. Nobody took any away and nothing was thrown out, so forty grams of something left while you were not watching.',
  question: 'So where did the missing forty grams actually go?'
};

const M11L3_BEATS = [
  {
    n: 1,
    label: 'A fresh leaf is mostly water',
    hook: 'About four fifths of a fresh leaf is water, which is why a whole armful of mint dries down into one small jar.',
    teachingText:
      'Drying does not destroy the water, it moves it. The water leaves the leaf as vapour and joins the air in the room, which is evaporation doing the whole job. You can measure exactly how much of it left, because the mass that went missing went out as water.',
    example:
      'Fifty grams of fresh mint that dries to ten grams lost forty grams of water. That is four fifths of what you started with, and you proved it with a scale rather than being told it.',
    applyIt: {
      prompt: 'You dry 50 grams of fresh basil and it settles at 10 grams. Where are the other 40 grams?',
      choices: [
        'They soaked down into the drying tray',
        'They turned into the smell of basil',
        'They left the leaves as water vapour and went into the air',
        'They burned away into nothing at all'
      ],
      answer: 2,
      feedback: [
        'A dry tray under a drying leaf stays dry, so nothing soaked in.',
        'The smell is a tiny part of it. Forty grams is water.',
        null,
        'Nothing burned. There was no heat here beyond a warm room.'
      ],
      why: 'Mass that goes missing during drying is water, and evaporation is where it went.'
    }
  },
  {
    n: 2,
    label: 'Warm, moving, dry air — and thin pieces',
    hook: 'A thin slice of ginger dries in a day, while a whole knob of it can go mouldy before the middle is dry.',
    teachingText:
      'Four things speed drying up: warm air, moving air, dry air, and small thin pieces. Moisture has to travel from the middle of a piece out to its surface before it can evaporate, so a thick root gets sliced thin before it ever reaches the rack.',
    example:
      'Your ginger and turmeric are dense rhizomes, so Gigi slices them thin as coins first. Peppermint leaves need no slicing at all, because a leaf is already thin.',
    applyIt: {
      prompt: 'Two trays of ginger dry side by side. One is cut in thick chunks and one in thin coins. Which finishes first?',
      choices: [
        'The thin coins, because water has a shorter way out',
        'The thick chunks, because they hold more heat',
        'Both together, because the air is the same',
        'Neither, because ginger cannot be dried'
      ],
      answer: 0,
      feedback: [
        null,
        'Holding heat is not the problem. Getting water out to the surface is.',
        'Same air, but the water inside has a much longer trip in a chunk.',
        'Dried ginger is one of the oldest dried things there is.'
      ],
      why: 'Thin means a short trip to the surface and more surface to leave from, so it dries faster.'
    }
  }
];

const M11L3_ACTIVITY = {
  title: 'The eighty percent test',
  prep: 'Cut the herb in the morning, once the dew has dried off it but before the day gets hot. Ask Gigi first, and take from several stems rather than stripping one plant bare.',
  needs: [
    'about 60 grams of fresh mint, rosemary or lemon balm',
    'a kitchen scale that reads in grams',
    'a cooling rack or a mesh tray',
    'a second small tray',
    'a chopping board and a knife, for Gigi',
    'a clean jar with a lid',
    'masking tape and a pen',
    'her Plant Detective Log'
  ],
  steps: [
    'Weigh out exactly 50 grams of fresh leaves and set the rest aside.',
    'Spread them in one single layer on the rack, so no leaf sits on another.',
    'Put the rack somewhere warm and airy but out of direct sunlight, because sunlight takes the colour and the smell as well as the moisture.',
    'Write down the date, the time and the starting mass before you walk away.',
    'On the second tray, ask Gigi to slice a small piece of your ginger thin as coins.',
    'Weigh the ginger slices too, and write that number in its own row.',
    'Weigh both trays at the same time every day for seven days.',
    'Plot the mint masses on a graph, one dot a day, and join the dots.',
    'Stop when two days in a row give you the same number, because the drying is finished.',
    'Snap a stem. A dried stem breaks cleanly, while a damp one only bends.',
    'Work out what you lost: starting mass minus final mass, then compare it to the start.',
    'Jar the dried mint and label it with the plant, the part and the date.'
  ],
  safety:
    'If Gigi finishes a tray in the oven, the oven is entirely her job and you stand back from the door, because oven air burns skin before you have even touched anything. Gigi does all the slicing. Nothing here is tasted. Anything that smells sour or looks furry goes straight to Gigi, and then to the bin.',
  grownUpAsks: [
    'Before we weigh anything. How much of that leaf do you think is water?',
    'Why did we spread it out instead of piling it up?',
    'Your graph is steep at the start and flat at the end. Why does it flatten?',
    'How do you know for certain that it has finished drying?',
    'The room feels no wetter than before. Where did all that water go?',
    'Why did I slice the ginger and not the mint?',
    'Which dried faster, and does that surprise you?',
    'What would happen if we sealed this in a jar on day three?',
    'A damp stem bends and a dry one snaps. Why is that a useful test?',
    'If we did this again in December, would it take longer? Say why.',
    'Say the rule out loud. What happens to anything that looks furry?'
  ]
};

const M11L3_LEDGER = {
  sheet: 'M11L3-eighty-percent-test-PRINTABLE.pdf',
  tasks: [
    'Fill in the seven-day table. One mass a day, in grams, for both trays.',
    'Draw the graph and mark the day the line went flat.',
    'Work out the mass you lost, and write it as a fraction of the start.',
    'Copy your jar label. Plant, part and date, all three lines.'
  ],
  game: {
    title: 'Word Boss',
    cards: ['EVAPORATION', 'WATER CONTENT', 'AIRFLOW', 'BRITTLE'],
    rounds: [
      'Say what each word means in your own words. No fancy talk.',
      'A grown-up says the meaning. You say the word. Beat the clock.',
      'Snap a dried stem and bend a fresh one. Say which card that proves.'
    ],
    ifSheIsStuck:
      'Show her the two numbers again, 50 and 10, side by side on her own sheet. WATER CONTENT is the gap between them.'
  },
  note: 'Nothing here is graded. Nothing is corrected. Petals are for doing it.'
};

/* =========================================================================
 * LESSON 64 · hb-m11-04 · Infusion, decoction, maceration
 *
 * Three extraction methods, taught by what physically happens to water and
 * plant material. Read the file header before editing this one.
 * ========================================================================= */

const M11L4_CHECK_IN = {
  title: 'Same water, two very different results',
  text: 'Hot water poured over peppermint leaves turns green in about a minute. The same water poured over a slice of ginger hardly changes colour at all. Ginger is a dense rhizome, and water has to work far harder to get inside it.',
  question: 'So what would you change first — the heat, the time, or the size of the pieces?'
};

const M11L4_BEATS = [
  {
    n: 1,
    label: 'Infusion: hot water, soft parts, a lid on top',
    hook: 'The smell rising off a hot cup is oil turning to vapour and leaving. A lid catches that vapour and drips it back in.',
    teachingText:
      'An infusion is hot water poured over leaves or flowers and then left to stand. Heat makes water molecules move faster, so they pull colour and smell out of a leaf quickly. Leaves are thin, so a few minutes is usually enough.',
    example:
      'Gigi pours just-boiled water over peppermint from your pot and covers the cup with a saucer. Ten minutes later the underside of that saucer is beaded with drops, and those drops smell of mint.',
    applyIt: {
      prompt: 'Two cups of peppermint stand for ten minutes. One is covered with a saucer and one is left open. Which smells stronger?',
      choices: [
        'The open one, because the smell could get out to your nose',
        'They will smell the same, since the mint was the same',
        'Neither, because smell has nothing to do with a lid',
        'The covered one, because the vapour cooled and dripped back in'
      ],
      answer: 3,
      feedback: [
        'What reached your nose across the room is exactly what the cup lost.',
        'Same mint, but one cup kept its vapour and one let it go.',
        'A lid is the difference between keeping that vapour and losing it.',
        null
      ],
      why: 'Volatile oil leaves as vapour when it is hot, so a lid holds it in and gives it back.'
    }
  },
  {
    n: 2,
    label: 'Decoction and maceration: dense parts, or no heat at all',
    hook: 'Decoction comes from a Latin word meaning boiled down. Maceration comes from a word meaning softened by soaking.',
    teachingText:
      'A decoction is a gentle simmer rather than a pour, and it suits dense parts such as roots, bark and seeds. Maceration is the opposite: cold water and a long soak, sometimes overnight, which works slowly and keeps the heat out of it. You pick your method by how tough the plant part is.',
    example:
      'Your ginger and turmeric get sliced thin and simmered for twenty minutes, because a rhizome will not give anything up to a two-minute pour. Peppermint in cold water in the fridge goes green overnight without any heat at all.',
    applyIt: {
      prompt: 'You want colour out of a dried turmeric rhizome. A two-minute pour of hot water, or a twenty-minute simmer?',
      choices: [
        'Neither, because turmeric gives no colour to water',
        'The simmer, because a dense rhizome needs heat and time together',
        'The pour, because hot water always works fastest',
        'Either one, since the water gets hot in both'
      ],
      answer: 1,
      feedback: [
        'Turmeric will stain a spoon yellow, so it certainly gives colour up.',
        null,
        'Hot water works fast on a thin leaf, not on a packed root.',
        'The water is hot in both. Only one of them stays hot long enough.'
      ],
      why: 'Tough, dense material needs a longer simmer, while thin leaves only need a short steep.'
    }
  }
];

const M11L4_ACTIVITY = {
  title: 'Three glasses, three methods',
  prep: 'Gigi boils the kettle and does every pour. Start the cold soak the night before, so all three are ready to compare at the same moment. Rule the table into your log before anything is poured.',
  needs: [
    'fresh or dried peppermint from her pot',
    'a small piece of her ginger, sliced thin by Gigi',
    'a kitchen scale',
    'three heatproof glasses or jars',
    'three saucers, to use as lids',
    'a small pan, for Gigi',
    'a measuring jug',
    'a timer',
    'a sheet of white paper',
    'her Plant Detective Log'
  ],
  steps: [
    'Weigh 2 grams of peppermint twice, and 2 grams of thin ginger slices once.',
    'Write your prediction for all three glasses before anything is poured.',
    'Glass A, infusion: Gigi pours 200 millilitres of just-boiled water over mint.',
    'Cover glass A with a saucer at once and start the timer for ten minutes.',
    'Glass B, decoction: Gigi simmers the ginger in 200 millilitres of water for twenty minutes, lid on.',
    'Glass C, maceration: put mint in 200 millilitres of cold water and stand it in the fridge overnight.',
    'Line all three up against white paper and describe each colour in real words.',
    'Waft the smell towards your nose with your hand. Never lean over a hot glass.',
    'Fill your table: method, plant part, water temperature, time, colour, smell.',
    'Label all three glasses with the method and the time you started.',
    'Write which one used heat, which used time, and which used both.',
    'Gigi decides whether the cooled mint infusion gets tasted at all.'
  ],
  safety:
    'The kettle, the stove and every pour are Gigi jobs from start to finish, and you stand well back while she pours, because steam burns deeper than water does. Glass holds heat for a long time, so you lift a glass only when Gigi says it has cooled. Nothing is tasted unless Gigi hands it to you herself. What we are studying here is what water does to plant material, and nothing else.',
  grownUpAsks: [
    'Before anything is poured. Which glass do you think goes darkest?',
    'Why did I put the saucer on the mint the second the water went in?',
    'Look under the saucer. What are those drops, and where were they before?',
    'The ginger simmered twenty minutes. Why would ten not have done?',
    'The cold glass got there in the end. What did it use instead of heat?',
    'Which of the three would you use for a thin flower, and why?',
    'Which would you use for a piece of bark? Say what makes you sure.',
    'Colour and smell are not the same thing. Which one changed more?',
    'If you did this again, what one thing would you change?',
    'Why did we label all three glasses before we started comparing?',
    'Say the rule out loud. Who decides whether anything here is tasted?'
  ]
};

const M11L4_LEDGER = {
  sheet: 'M11L4-three-methods-PRINTABLE.pdf',
  tasks: [
    'Fill the table: method, part, water temperature, time, colour, smell.',
    'Write your prediction for each glass, and then what really happened.',
    'Write which plant part suits each of the three methods, and why.',
    'Write one question about extraction that today did not answer.'
  ],
  game: {
    title: 'Method Match',
    cards: ['INFUSION', 'DECOCTION', 'MACERATION', 'EXTRACTION', 'SOLVENT'],
    rounds: [
      'Say what each word means in your own words. No fancy talk.',
      'A grown-up names a plant part. You name the method that fits it.',
      'Point at the glass on the counter that matches each card.'
    ],
    ifSheIsStuck:
      'Put a mint leaf in one hand and a ginger slice in the other. The leaf chooses INFUSION and the rhizome chooses DECOCTION without any explaining.'
  },
  note: 'Nothing here is graded. A prediction that missed is worth the same petals as one that landed.'
};

/* =========================================================================
 * LESSON 65 · hb-m11-05 · Shelf life and spoilage
 * ========================================================================= */

const M11L5_CHECK_IN = {
  title: 'The jar on the sunny sill',
  text: 'Two identical jars were filled from the same batch of dried mint on the same afternoon. One went onto a sunny windowsill and the other went into a dark cupboard. Six months later the windowsill jar is pale straw and smells of almost nothing.',
  question: 'Nobody ever opened either jar. So what got into the one on the sill?'
};

const M11L5_BEATS = [
  {
    n: 1,
    label: 'Water, air, light and heat',
    hook: 'Sunlight fades a dried leaf the same way it fades a curtain, only faster, because a leaf is thin.',
    teachingText:
      'Four things shorten how long a jar stays good: water, air, light and heat. Water is by far the most dangerous of them, because mould needs only a trace of moisture to begin growing. The other three work slowly instead, taking the colour and the smell away across months.',
    example:
      'A closed cupboard away from the stove deals with light and heat at once, while an airtight lid deals with the air. Drying properly before you ever fill the jar is what deals with the moisture.',
    applyIt: {
      prompt: 'You open your jar and find water droplets clinging under the lid. What does that tell you?',
      choices: [
        'The leaves went into the jar before they were fully dry',
        'The jar is too big for what is in it',
        'The cupboard has been much too dark',
        'The mint has started making its own water'
      ],
      answer: 0,
      feedback: [
        null,
        'A big jar holds more air, but air does not turn into droplets.',
        'Dark is what you want. Dark is not the problem here.',
        'A picked leaf makes nothing. That water was already inside it.'
      ],
      why: 'Water left in the leaf comes out into the jar, and any water at all is how spoilage starts.'
    }
  },
  {
    n: 2,
    label: 'A date is data',
    hook: 'A best before date is a company guess about quality. It is not a switch that flips at midnight.',
    teachingText:
      'Shelf life is how long something stays good, and spoilage is a slope rather than a cliff. Your own jars have no printed date, so the date you write is the only one that will ever exist. Without it, a faded jar could be genuinely old, or it could simply have been dried badly.',
    example:
      'Two jars of your mint, one filled in June and one filled last year. The older jar is paler and its smell is fainter, and you can only prove that because both were dated.',
    applyIt: {
      prompt: 'Two jars of mint, neither one dated. One is bright green and one is pale. What can you say for certain?',
      choices: [
        'That the pale one is definitely the older jar',
        'That the green one was dried in an oven',
        'That both are exactly the same age',
        'Only that one is paler. You cannot say which is older'
      ],
      answer: 3,
      feedback: [
        'Pale could mean old, or it could mean it sat in the light for a week.',
        'Nothing on that jar says how it was dried.',
        'With no dates, you cannot claim they match either.',
        null
      ],
      why: 'Without a date you have a colour and a story, and a story is not evidence.'
    }
  }
];

const M11L5_ACTIVITY = {
  title: 'Shelf-life patrol, and a test of your own',
  prep: 'Ask Gigi before you open her cupboard, and agree that you will put every jar back exactly where it came from. Rule your table first: jar, date found, colour, smell, where it lives.',
  needs: [
    'ten to twelve jars from the cupboard',
    'her Plant Detective Log and a pen',
    'masking tape',
    'two identical small jars with lids',
    'dried mint from Lesson 63',
    'a torch, for reading small print',
    'a thermometer, if there is one'
  ],
  steps: [
    'Take out ten jars and stand them in a row on the counter.',
    'Find a date on each one and write it down, or write NONE if there is not one.',
    'Note the colour of each, and waft the smell towards you rather than sniffing hard.',
    'Write down where each jar was living, and how close that was to the stove.',
    'Rank them from freshest looking to oldest looking, using colour and smell only.',
    'Now compare your ranking to the dates you found. Where were you wrong?',
    'Put masking tape on every undated jar and write today date on it.',
    'Move any jar that was sitting in light or beside the stove, and tell Gigi why.',
    'Split your own dried mint between two matching jars, and date both labels.',
    'Stand one jar on the sunny sill and one in the dark cupboard.',
    'Write the date you will open them: four weeks from today.',
    'On that day, compare colour and smell and write down which one held up.'
  ],
  safety:
    'Look and smell, but taste nothing at all. Waft the air towards your nose instead of putting your nose in the jar. If anything is furry, spotted or smells sour, the lid goes back on and Gigi takes it from there. Wash your hands after handling old jars.',
  grownUpAsks: [
    'Before we open the cupboard. Which jar in here do you think is oldest?',
    'You ranked them by colour. How close were you when you saw the dates?',
    'Which jar surprised you most, and what surprised you about it?',
    'This one lives beside the stove. Which of the four spoilers is that?',
    'Why is water worse than light, even though light is doing damage too?',
    'A best before date passed last month. Does that mean it went bad that day?',
    'What would you need to know to answer that properly?',
    'You just dated an undated jar. Is that date the truth?',
    'What could you write instead, so nobody is misled later?',
    'Your two test jars are identical except for one thing. Name it.',
    'Say the rule out loud. What happens if a jar looks furry?'
  ]
};

const M11L5_LEDGER = {
  sheet: 'M11L5-shelf-life-patrol-PRINTABLE.pdf',
  tasks: [
    'Fill the audit table for ten jars: date, colour, smell, where it lives.',
    'Write the two jars you moved, and the reason for each move.',
    'Write the date you set up your two test jars, and where each one is.',
    'Write your prediction for the sill jar, in one sentence, before you look.'
  ],
  game: {
    title: 'Word Boss',
    cards: ['SHELF LIFE', 'SPOILAGE', 'AIRTIGHT', 'BEST BEFORE'],
    rounds: [
      'Say what each word means in your own words. No fancy talk.',
      'A grown-up says the meaning. You say the word. Beat the clock.',
      'Hold up a real jar for every card and say which one it shows.'
    ],
    ifSheIsStuck:
      'Stand the sill jar and the cupboard jar side by side on the same sheet of white paper. SHELF LIFE is the difference she can see.'
  },
  note: 'Nothing here is graded. Nothing is corrected. Petals are for doing it.'
};

/* =========================================================================
 * LESSON 66 · hb-m11-06 · The label is the science
 *
 * The spine of the module. Read the file header before editing this one.
 * ========================================================================= */

const M11L6_CHECK_IN = {
  title: 'Two jars that both say MINT',
  text: 'Here are two jars, and both labels say MINT. One holds peppermint leaf, air dried for six days last June. The other holds spearmint, dried in an oven in an hour, at some point last year. Both labels are true, and neither is any use.',
  question: 'What would those labels have to say before you could tell the jars apart?'
};

const M11L6_BEATS = [
  {
    n: 1,
    label: 'Five lines, and every one of them earns its place',
    hook: 'A jar in a real laboratory that arrives without a full label gets thrown out, however good whatever is inside it looks.',
    teachingText:
      'A useful label answers five questions: what plant, which part, when it was picked, how it was prepared, and the date it went into the jar. Miss one line and somebody later has to guess, and a guess written in a record is worse than a blank line.',
    example:
      'PEPPERMINT · LEAF · picked 14 May from my own pot · air dried six days, whole leaf · jarred 20 May · Collector: Azianna. Six weeks later that jar can still answer any question you ask it.',
    applyIt: {
      prompt: 'Your label gives the plant, the part and the date, but nothing about how you dried it. What can you no longer compare?',
      choices: [
        'Which plant is actually in the jar',
        'Which part of the plant you picked',
        'Whether air drying or oven drying kept more of the smell',
        'How old the jar in your hand is'
      ],
      answer: 2,
      feedback: [
        'The plant name is on there too.',
        'The part is on there as well. It is the method that is missing.',
        null,
        'The date is on there, so age is the one thing you still know.'
      ],
      why: 'The line you leave off is exactly the question you will not be able to answer later.'
    }
  },
  {
    n: 2,
    label: 'A label is what makes an experiment repeatable',
    hook: 'Scientists change one thing at a time. A label is how anybody can tell which one thing that was.',
    teachingText:
      'Two jars that came out differently only teach you something if you know what was different about them. When both are fully labelled, a change in colour or smell points at a real cause. When neither is, the difference is only a story you tell yourself.',
    example:
      'Your June jar was air dried over six days and your August jar was oven dried in one hour. The June jar smells stronger. Because both carried full labels, that comparison is worth writing down.',
    applyIt: {
      prompt: 'One jar of mint is fully labelled and one has no label at all. The labelled one smells much stronger. What have you learned?',
      choices: [
        'That the unlabelled jar must be older',
        'Something real, but only about the labelled jar',
        'That labels make herbs smell stronger',
        'Nothing whatsoever from either jar'
      ],
      answer: 1,
      feedback: [
        'You cannot say that. There is nothing on it to say it with.',
        null,
        'A label is paper. It changes the record, not the plant.',
        'The labelled jar still tells you its own story properly.'
      ],
      why: 'You can only learn from a comparison when you know what was different, and the label is where that lives.'
    }
  }
];

const M11L6_ACTIVITY = {
  title: 'Label the whole bench, then prove the labels work',
  prep: 'Gather every jar, tray and glass from Lessons 61 to 65 and stand them together on the bench. Have your log open at the pages where you wrote each one up, because that is where the five lines have to come from.',
  needs: [
    'every sample from this module',
    'blank labels or masking tape',
    'a fine pen that will not smudge',
    'her Plant Detective Log',
    'a ruler, for straight lines',
    'a fresh index card for the method sheet'
  ],
  steps: [
    'Write the five headings on one card and keep it in front of you: PLANT, PART, PICKED, PREPARED, DATED.',
    'Take the first jar and fill in all five lines from your log, not from memory.',
    'Add a batch code to each label, such as M11-L3-A, so two jars can never be confused.',
    'Where you do not know a line, write UNKNOWN rather than guessing at it.',
    'Sign every label with your name, because the collector is part of the record.',
    'Now write a method sheet for your mint infusion on the index card.',
    'Put real numbers on it: mass in grams, water in millilitres, minutes, and lid on or off.',
    'Write it so that somebody who has never met you could follow it exactly.',
    'Hand Gigi two jars. She shuffles them and hands them back later in the day.',
    'Tell her everything that happened to each jar, using only what is on the label.',
    'Write down any question her jars raised that your label could not answer.',
    'Add that missing line to your label design, and use it from now on.'
  ],
  safety:
    'Nothing is opened for tasting today and nothing new is made. Handle the jars with clean, dry hands, because a damp hand puts water straight back into a dried herb. Wash your hands before you start and again when you finish.',
  grownUpAsks: [
    'Before we start. Which five things does a label have to say?',
    'You wrote it from your log, not from memory. Why did I make you do that?',
    'This jar says UNKNOWN on one line. Is that jar still worth keeping?',
    'Why is a guessed name worse than an empty line?',
    'What does the batch code do that the date on its own does not?',
    'Read me your method sheet. Could I follow it without asking you anything?',
    'You wrote 200 millilitres. What would happen if you had written a jugful?',
    'A doctor dates and signs everything she writes. Why do you think that is?',
    'I shuffled your jars. Did the labels hold up, or did you need me?',
    'Which line did you wish you had written, and when did you notice?',
    'Say it back to me. What is the difference between a jar and a record?'
  ]
};

const M11L6_LEDGER = {
  sheet: 'M11L6-five-line-labels-PRINTABLE.pdf',
  tasks: [
    'Copy out a full five-line label for three of your jars.',
    'Write your method sheet out neatly, with every number and its unit.',
    'Write the one line you wished you had written down, and why.',
    'Write one sentence: what turns a jar into a record?'
  ],
  game: {
    title: 'Word Boss',
    cards: ['LABEL', 'BATCH', 'METHOD', 'RECORD', 'REPEATABLE'],
    rounds: [
      'Say what each word means in your own words. No fancy talk.',
      'A grown-up says the meaning. You say the word. Beat the clock.',
      'Hold up a jar from the bench for each card, and say how it shows that word.'
    ],
    ifSheIsStuck:
      'Hand her the unlabelled jar and ask her one question about it. She will find she cannot answer, and that is RECORD explained without a definition.'
  },
  note: 'Nothing here is graded. Nothing is corrected. This one goes in the binder and stays there, because it is the habit the rest of the course is built on.'
};

/* =========================================================================
 * THE MODULE
 * ========================================================================= */

export const HERBALISM_M11 = [
  {
    id: 'hb-m11-01',
    course: 'herbalism',
    module: 11,
    quarter: 3,
    week: 5,
    day: 1,
    n: 61,
    title: 'The tools on the bench',
    minutes: 45,
    spec: '§10 · beats',

    concept:
      'Every tool on a working bench does exactly one physical job — crush, weigh, separate, store or record — and crushing matters because it multiplies the surface that water can reach.',

    standards: [],

    words: ['mortar', 'pestle', 'sieve', 'surface area', 'apothecary'],

    glossary: [
      { word: 'apothecary', plain: 'An old word for the room where plant work was done, and for the person who did it.' },
      { word: 'mortar', plain: 'A heavy bowl made to be crushed in, usually stone.' },
      { word: 'pestle', plain: 'The heavy stick you crush with, held in your fist.' },
      { word: 'sieve', plain: 'A mesh that lets small pieces through and holds bigger ones back.' },
      { word: 'surface area', plain: 'How much outside a thing has. Break it up and there is far more of it.' },
      { word: 'funnel', plain: 'A cone that guides what you are pouring into a narrow jar.' },
      { word: 'bench', plain: 'The clear worktop where the work happens, set up on purpose.' }
    ],

    video: {
      id: 'DL5zGV6Ppsc',
      url: 'https://www.youtube.com/watch?v=DL5zGV6Ppsc',
      title: "Mortar and Pestle | How It's Made",
      channel: 'Science Channel',
      minutes: 3,
      verified: '2026-08-15 · re-checked at youtube.com/oembed',
      teaches: [
        'what a mortar and pestle actually is, close up',
        'that it is cut from stone, and why stone rather than something light',
        'that the inside is left rough on purpose',
        'that this is a made tool with a job, not an ornament'
      ],
      sourceGap:
        'OPEN. No Black American educator found for bench tools at this level. Searched: "youtube mortar and pestle how it works grinding herbs kitchen science video for kids", "youtube apothecary shop museum tour historic pharmacy mortar pestle scales jars history", "Black American herbalist youtube channel educator apothecary making tea from plants kitchen", "Black chemist youtube channel kitchen chemistry educator African American science communicator video", and "Black American pharmacist history youtube video apothecary Black pharmacists museum educator". The last search surfaced ptuZuYJpsv8 "Early education of African American pharmacists" (MedicalUpdateOnline), which WAS verified at noembed and then rejected: it is a medical channel pitched at adults, and this module must not read as medicine. Two further alternates were verified and left unused: Xz2I8GHr7_U "Exploring the Use of Mortar and Pestle in the Laboratory" (Laboratory Cognizance), a small channel with a laboratory framing, and BE5zHhpsGRw "Rate of Dissolving - Increase the Rate - Surface Area - Stir - Temperature - Straight Science" (Straight Science), which is the better fit for beat 2 alone if the mortar video proves too short.'
    },

    checkIn: M11L1_CHECK_IN,
    beats: M11L1_BEATS,
    activity: M11L1_ACTIVITY,
    ledger: M11L1_LEDGER,

    hook: M11L1_CHECK_IN,
    core: M11L1_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing:
      'Set the bench up as five stations — CRUSH, WEIGH, SEPARATE, STORE, RECORD — with the right tool behind each card. Weigh a handful of dried rosemary before you touch it, grind it for one full minute, then tip it through a strainer over a bowl. Look at the powder and the leftovers under a magnifier, weigh both, and add them together to see whether they still come to your starting number. Jar the powder, label it with plant, part and date, then wash and dry every tool, because a damp tool spoils the next batch.',

    practice: [
      {
        ask: 'What are the five jobs a bench has to do?',
        answer: 'Crush, weigh, separate, store and record.',
        why: 'Every tool on the bench is there because it does one of those five and nothing else.'
      },
      {
        ask: 'Why does ground rosemary give up its smell faster than a whole sprig?',
        answer: 'Because crushing it makes far more surface, and the smell escapes from the surface.',
        why: 'Surface area is the whole reason a mortar and pestle exists.'
      }
    ],

    check: [
      {
        prompt: 'Which tool separates fine powder from woody stems?',
        choices: ['A scale', 'A sieve', 'A mortar', 'A funnel'],
        answer: 1,
        feedback: [
          'A scale tells you the mass, not which bits are which.',
          null,
          'A mortar crushes. It cannot sort what it has crushed.',
          'A funnel guides things into a jar without sorting anything.'
        ]
      },
      {
        prompt: 'Crushing a leaf makes more of what?',
        choices: ['Water', 'Mass', 'Colour', 'Surface area'],
        answer: 3,
        feedback: [
          'Crushing does not add water to anything.',
          'The mass is the same before and after. It just changed shape.',
          'The colour was already in there, waiting to get out.',
          null
        ]
      },
      {
        prompt: 'What did the word apothecary originally mean?',
        choices: ['A storehouse', 'A doctor', 'A garden', 'A stone bowl'],
        answer: 0,
        feedback: [
          null,
          'It came to mean the person later, but the word started with the room.',
          'The plants were grown elsewhere and stored here.',
          'That is a mortar, and it was one thing kept in that room.'
        ]
      }
    ]
  },

  {
    id: 'hb-m11-02',
    course: 'herbalism',
    module: 11,
    quarter: 3,
    week: 5,
    day: 2,
    n: 62,
    title: 'Weighing and measuring properly',
    minutes: 45,
    spec: '§10 · beats',

    concept:
      'Volume asks how much room something takes and mass asks how much matter is really there, so a measurement in grams can be repeated tomorrow while a scoop in a cup cannot.',

    standards: [],

    words: ['mass', 'volume', 'gram', 'millilitre', 'tare'],

    glossary: [
      { word: 'mass', plain: 'How much matter is in something. A scale measures it.' },
      { word: 'volume', plain: 'How much room something takes up. A cup or a jug measures it.' },
      { word: 'gram', plain: 'The small unit we weigh in. A paperclip is about one gram.' },
      { word: 'millilitre', plain: 'The small unit we measure liquid in. A teaspoon holds about five.' },
      { word: 'tare', plain: 'The button that sets a scale back to zero, so the jar is not counted.' },
      { word: 'unit', plain: 'The word after the number. Grams, millilitres, minutes.' },
      { word: 'repeatable', plain: 'Done in a way somebody else could copy and get the same answer.' }
    ],

    video: {
      id: 'E6cCodPaqbo',
      url: 'https://www.youtube.com/watch?v=E6cCodPaqbo',
      title: 'The Best Way to Measure Flour',
      channel: "America's Test Kitchen",
      minutes: 1,
      verified: '2026-08-15 · re-checked at youtube.com/oembed',
      teaches: [
        'that scooping the same cup twice gives you different amounts',
        'that packing a dry ingredient down changes the mass without changing the volume',
        'that weighing in grams is the measurement that can be repeated',
        'how a kitchen scale is actually used on a counter'
      ],
      sourceGap:
        'OPEN. No Black American educator found teaching measurement at this level. Searched: "youtube why do we weigh ingredients grams kitchen scale mass vs volume science video kids", "America\'s Test Kitchen Kids how to use a kitchen scale weigh ingredients video", "Black science teacher youtube elementary lesson measuring mass grams balance scale demonstration", and "Black American food scientist youtube channel explains food science educator kids". The last of those surfaced the channel "The Black Food Scientist" (youtube.com/@Theblackfoodscientist), which is the strongest live lead in this whole module — but no individual video id from it could be surfaced and verified, so nothing was used. Verified alternate, left unused: jmJLpCZbAFk "Learn about grams and kilograms on a kitchen scale (3rd grade math)" (Math Mammoth), which is pitched a little below her but shows a kitchen scale being read in grams, and is the right fallback if the flour video proves too fast.'
    },

    checkIn: M11L2_CHECK_IN,
    beats: M11L2_BEATS,
    activity: M11L2_ACTIVITY,
    ledger: M11L2_LEDGER,

    hook: M11L2_CHECK_IN,
    core: M11L2_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing:
      'Zero the scale, then scoop one level cup of dried mint three times and weigh every scoop. Find the biggest and the smallest, subtract, and see for yourself how far a cup can drift. Then put the jar on the scale, press tare so it reads zero, and spoon in exactly ten grams. Measure 100 millilitres of water in a jug at eye level, weigh it, and find that it comes out at very nearly 100 grams. Every number goes into the log with its unit beside it.',

    practice: [
      {
        ask: 'Why do two cups of the same herb weigh different amounts?',
        answer: 'Because leaves are mostly air, and pressing them packs more leaf into the same space.',
        why: 'The volume stayed the same while the mass changed, which is why a scale is fairer.'
      },
      {
        ask: 'What does the tare button do?',
        answer: 'It sets the scale back to zero, so the jar on it stops being counted.',
        why: 'Then the number you read is the plant on its own, with nothing else mixed in.'
      }
    ],

    check: [
      {
        prompt: 'Which measurement could somebody else repeat exactly tomorrow?',
        choices: ['A small handful', 'A good pinch', '12 grams on a scale', 'One heaped cup'],
        answer: 2,
        feedback: [
          'Your hand and my hand are not the same size.',
          'A pinch is a guess wearing a name.',
          null,
          'Heaped by whose hand? That number moves every time.'
        ]
      },
      {
        prompt: 'A cup of whole leaves and a cup of ground leaves. What matches?',
        choices: ['How long they keep', 'Their volume', 'Their mass', 'Their surface area'],
        answer: 1,
        feedback: [
          'That depends on the jar and the cupboard, not on the cup.',
          null,
          'Ground leaves pack tighter, so the mass is bigger.',
          'Grinding multiplies surface area. That is the point of it.'
        ]
      },
      {
        prompt: 'You write 65 in your log with no unit. What is the problem?',
        choices: [
          'Nobody can tell later what 65 was measuring',
          'The scale will lose the number',
          'Sixty-five is too big a number',
          'Nothing at all is wrong'
        ],
        answer: 0,
        feedback: [
          null,
          'The scale forgets everything. That is what your log is for.',
          'The size of the number is not the issue here.',
          'A number with no unit is not yet a measurement.'
        ]
      }
    ]
  },

  {
    id: 'hb-m11-03',
    course: 'herbalism',
    module: 11,
    quarter: 3,
    week: 5,
    day: 3,
    n: 63,
    title: 'Drying, and why it works',
    minutes: 45,
    spec: '§10 · beats',

    concept:
      'A fresh leaf is about four fifths water, and drying simply moves that water into the air, which is why the mass you lose is a measurement of the water that left.',

    standards: [],

    words: ['evaporation', 'water content', 'airflow', 'brittle'],

    glossary: [
      { word: 'evaporation', plain: 'Water turning into vapour and drifting away into the air.' },
      { word: 'water content', plain: 'How much of a thing is water. In a fresh leaf it is most of it.' },
      { word: 'airflow', plain: 'Air moving past. Still air stays damp, while moving air carries water off.' },
      { word: 'brittle', plain: 'Dry enough to snap instead of bend.' },
      { word: 'vapour', plain: 'Water in the air as a gas, too small to see.' },
      { word: 'humid', plain: 'Air that is already holding a lot of water, so it takes up less.' },
      { word: 'single layer', plain: 'Spread out so no piece is sitting on top of another.' }
    ],

    video: {
      id: '3JuSismNmOo',
      url: 'https://www.youtube.com/watch?v=3JuSismNmOo',
      title: 'How To Harvest and Dry Herbs - Sage',
      channel: 'Learn To Grow',
      minutes: 5,
      verified: '2026-08-15 · re-checked at youtube.com/oembed',
      teaches: [
        'when in the day to cut herbs for drying',
        'how much to take from a plant without stripping it',
        'how the leaves are spread or hung so air can reach them',
        'what a properly dried leaf looks and sounds like'
      ],
      sourceGap:
        'OPEN. No Black American educator found for drying and preserving at this level. Searched: "youtube how does a food dehydrator work science of drying food removing water preserve", "youtube water activity food science why drying stops mold explained moisture content", "Black gardener youtube channel harvesting drying herbs from the garden Black homesteader educational", and "Alexis Nikole Nelson Black Forager youtube video drying herbs preserving harvest jar". The last one returned only her foraging work, including 2yXSQ1BmZFM "A flavorful field guide to foraging | Alexis Nikole Nelson | TED" (TED), which was verified and is a real alternate for a future foraging lesson but teaches nothing about drying. Stated honestly: this video is a TECHNIQUE video and the physics — water content, evaporation, surface area, the mass that goes missing — is carried by the beats and by the activity, not by the screen. Verified alternate, unused: 1QbOBH1C6QI "The Science Behind Freeze-Drying Foods" (Allison Van Rassel), which is the harder science but goes at freeze-drying rather than air drying. The Module 7 drying video, WcKJi-UZlac, was deliberately NOT reused: she has already seen it, and this lesson has to go further than it did.'
    },

    checkIn: M11L3_CHECK_IN,
    beats: M11L3_BEATS,
    activity: M11L3_ACTIVITY,
    ledger: M11L3_LEDGER,

    hook: M11L3_CHECK_IN,
    core: M11L3_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing:
      'Weigh out exactly 50 grams of fresh mint and spread it in a single layer on a rack somewhere warm and airy, out of the sun. Ask Gigi to slice a little ginger thin as coins onto a second tray. Weigh both trays at the same time every day for a week, plot the mint on a graph, and stop when two days in a row give the same number, because that is what finished looks like. Snap a stem to check it breaks instead of bending, work out how much mass you lost, then jar the mint with plant, part and date on the label.',

    practice: [
      {
        ask: 'Fifty grams of fresh mint dries to ten grams. What left?',
        answer: 'Forty grams of water, which evaporated into the air in the room.',
        why: 'Mass that goes missing while something dries is water, and you can weigh it.'
      },
      {
        ask: 'How do you know when drying has finished?',
        answer: 'When the mass stops changing from one day to the next.',
        why: 'A number that has stopped moving means there is no more water left to leave.'
      }
    ],

    check: [
      {
        prompt: '50 grams of fresh mint dries down to 10 grams. What left the leaves?',
        choices: ['Colour', 'Smell', 'Nothing at all', 'Water, as vapour'],
        answer: 3,
        feedback: [
          'The colour fades a little, but colour has almost no mass.',
          'A little smell goes too, but forty grams of it? No.',
          'Forty grams went somewhere, and the scale proves it.',
          null
        ]
      },
      {
        prompt: 'Why does Gigi slice ginger thin before it goes on the tray?',
        choices: [
          'Thick pieces hold too much heat',
          'Thin slices weigh less to begin with',
          'Water has a shorter way out of a thin slice',
          'Thin slices look neater on a tray'
        ],
        answer: 2,
        feedback: [
          'Heat is not what is trapped in there. Water is.',
          'The mass is the same whether you slice it or not.',
          null,
          'It does look neater. That is not why we do it.'
        ]
      },
      {
        prompt: 'Which of these dries herbs fastest?',
        choices: ['Warm moving air', 'Still humid air', 'A sealed bag', 'A cold damp cellar'],
        answer: 0,
        feedback: [
          null,
          'Still air sits there getting damper and takes no more.',
          'A sealed bag traps the vapour and grows mould instead.',
          'Cold and damp is the slowest place in the house.'
        ]
      }
    ]
  },

  {
    id: 'hb-m11-04',
    course: 'herbalism',
    module: 11,
    quarter: 3,
    week: 6,
    day: 1,
    n: 64,
    title: 'Infusion, decoction, maceration',
    minutes: 45,
    spec: '§10 · beats',

    concept:
      'Water pulls colour and smell out of plant material, and you pick between a hot steep, a long simmer and a cold soak by how tough the plant part is.',

    standards: [],

    words: ['extraction', 'infusion', 'decoction', 'maceration', 'solvent'],

    glossary: [
      { word: 'extraction', plain: 'Getting something out of a plant and into a liquid.' },
      { word: 'infusion', plain: 'Hot water poured over leaves or flowers and left to stand.' },
      { word: 'decoction', plain: 'A gentle simmer, used for tough parts like roots and bark.' },
      { word: 'maceration', plain: 'A long soak in cold water, with no heat used at all.' },
      { word: 'solvent', plain: 'The liquid that does the pulling out. Here it is plain water.' },
      { word: 'steep', plain: 'To leave something sitting in liquid while it works.' },
      { word: 'volatile oil', plain: 'The part that carries the smell. Heat turns it to vapour easily.' }
    ],

    video: {
      id: 'RrQVkh-gF4Y',
      url: 'https://www.youtube.com/watch?v=RrQVkh-gF4Y',
      title: "The Science Behind Tea, the Second Most Popular Beverage in the World | What's Eating Dan",
      channel: "America's Test Kitchen",
      minutes: 10,
      verified: '2026-08-15 · re-checked at youtube.com/oembed',
      teaches: [
        'that hot water pulls things out of a leaf, and what actually comes out',
        'that water temperature changes the result',
        'that steeping time changes the result',
        'that the size of the pieces changes how fast it happens'
      ],
      sourceGap:
        'OPEN. No Black American educator found teaching extraction at this level. Searched: "youtube science of tea steeping hot water extraction why hot water extracts faster explained", "TED-Ed tea chemistry history of tea steeping leaves hot water video youtube", "ACS Reactions cold brew coffee chemistry hot water extraction temperature video", and "Black American herbalist youtube channel educator apothecary making tea from plants kitchen". That last search returned adult herbal channels that make health claims, which this course does not use at any age, so none was considered further. Three alternates were verified and left unused: iMcsReYBGCA "What is the Perfect Temperature for Brewing Tea? and More Questions | What\'s Eating Dan" (America\'s Test Kitchen), which is narrower and goes straight at temperature; 2DcpPiZHZVo "Science of Coffee: Hot vs. Cold Brewed Coffee" (Starbucks Coffee), which contrasts hot and cold extraction exactly as this lesson does but sits on a company channel; and BE5zHhpsGRw "Rate of Dissolving - Increase the Rate - Surface Area - Stir - Temperature - Straight Science" (Straight Science), which is the underlying physics with no plants in it at all.'
    },

    checkIn: M11L4_CHECK_IN,
    beats: M11L4_BEATS,
    activity: M11L4_ACTIVITY,
    ledger: M11L4_LEDGER,

    hook: M11L4_CHECK_IN,
    core: M11L4_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing:
      'Run all three methods side by side with the same scale and the same jug. Glass A is an infusion: Gigi pours 200 millilitres of just-boiled water over 2 grams of peppermint, and the saucer goes on straight away for ten minutes. Glass B is a decoction: Gigi simmers 2 grams of thin ginger slices in 200 millilitres for twenty minutes with the lid on. Glass C is a maceration, standing in cold water in the fridge overnight. Predict first, then line all three against white paper, describe the colours properly, waft the smells towards you, and fill in a table of method, part, temperature, time, colour and smell. Every glass gets labelled with its method and its start time, and Gigi alone decides whether the cooled mint infusion is tasted.',

    practice: [
      {
        ask: 'Why does a lid go on an infusion straight away?',
        answer: 'Because the smell leaves as vapour, and a lid cools it and drips it back in.',
        why: 'What you can smell across the room is exactly what the cup has lost.'
      },
      {
        ask: 'Why are roots simmered while leaves are only steeped?',
        answer: 'A root is dense, so water needs heat and time together to get inside it.',
        why: 'A leaf is thin and gives up quickly. A rhizome will not.'
      }
    ],

    check: [
      {
        prompt: 'Hot water poured over leaves and left to stand is called what?',
        choices: ['Evaporation', 'An infusion', 'A decoction', 'A maceration'],
        answer: 1,
        feedback: [
          'Evaporation is water leaving, not water pulling something out.',
          null,
          'A decoction is a simmer, and it is used for tough parts.',
          'Maceration is a cold soak, with no heat in it at all.'
        ]
      },
      {
        prompt: 'Your ginger is a dense rhizome. Which method suits it?',
        choices: ['A quick rinse', 'No water at all', 'A twenty-minute simmer', 'A two-minute pour'],
        answer: 2,
        feedback: [
          'A rinse washes the outside and gets nothing out.',
          'Water is the solvent here. Without it nothing happens.',
          null,
          'Two minutes barely touches something that dense.'
        ]
      },
      {
        prompt: 'What is maceration?',
        choices: [
          'A hot pour over leaves',
          'A gentle simmer in a pan',
          'Drying on a rack',
          'A long soak in cold water'
        ],
        answer: 3,
        feedback: [
          'That is an infusion, and it takes minutes rather than hours.',
          'That is a decoction, and it uses heat.',
          'Drying takes water out. Maceration puts plant material in.',
          null
        ]
      }
    ]
  },

  {
    id: 'hb-m11-05',
    course: 'herbalism',
    module: 11,
    quarter: 3,
    week: 6,
    day: 2,
    n: 65,
    title: 'Shelf life and spoilage',
    minutes: 45,
    spec: '§10 · beats',

    concept:
      'Water, air, light and heat each shorten how long a jar stays good, and because shelf life is a slope rather than a cliff, the date you write is the only way to know where on that slope a jar is.',

    standards: [],

    words: ['shelf life', 'spoilage', 'airtight', 'best before'],

    glossary: [
      { word: 'shelf life', plain: 'How long something stays good once it is stored.' },
      { word: 'spoilage', plain: 'Food going bad, whether by mould, damp or plain old age.' },
      { word: 'airtight', plain: 'Sealed so well that no air gets in or out.' },
      { word: 'best before', plain: 'The maker guess at when quality drops off. Not a safety switch.' },
      { word: 'mould', plain: 'A fungus that grows on damp food. It is alive and it needs water.' },
      { word: 'fade', plain: 'To lose colour slowly, the way light fades a curtain.' },
      { word: 'audit', plain: 'Going through everything on purpose and writing down what you find.' }
    ],

    video: {
      id: 'jDg8DQl7ZeQ',
      url: 'https://www.youtube.com/watch?v=jDg8DQl7ZeQ',
      title: "Food expiration dates don't mean what you think - Carolyn Beans",
      channel: 'TED-Ed',
      minutes: 5,
      verified: '2026-08-15 · re-checked at youtube.com/oembed',
      teaches: [
        'that a printed date is about quality, not a moment when food turns bad',
        'the difference between the dates printed on packets',
        'what actually makes food spoil',
        'that a date is somebody making a judgement, and how that judgement is made'
      ],
      sourceGap:
        'OPEN, and this is the lesson where the gap is most closeable. Searched: "SciShow Kids why does food go bad mold spoilage video", "youtube what do expiration dates mean food spoilage science explained", "youtube water activity food science why drying stops mold explained moisture content", "Black American food scientist youtube channel explains food science educator kids", and "\'The Black Food Scientist\' youtube video shelf life food spoilage water activity preservation". The channel "The Black Food Scientist" (youtube.com/@Theblackfoodscientist) exists and its subject IS this lesson — shelf life, spoilage and water in food — but the searches returned only blog articles and no video id that could be put through noembed. Nothing unverified was used. One verified video from that channel would close this gap outright, and it is the first thing to try before this module is reprinted.'
    },

    checkIn: M11L5_CHECK_IN,
    beats: M11L5_BEATS,
    activity: M11L5_ACTIVITY,
    ledger: M11L5_LEDGER,

    hook: M11L5_CHECK_IN,
    core: M11L5_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing:
      'Audit ten jars out of the cupboard. Write down the date on each one, or NONE where there is not one, then the colour, the smell and where the jar was living. Rank them oldest to freshest by look and smell alone, then check your ranking against the dates and find out where your eyes fooled you. Tape a date onto every undated jar and move anything that was sitting in light or beside the stove. Then set up your own test: split your dried mint between two matching jars, date both, stand one on the sunny sill and one in the dark cupboard, and write the date four weeks from now when you will open them.',

    practice: [
      {
        ask: 'Which of the four spoilers matters most in a jar of dried herbs?',
        answer: 'Water. Mould only needs a trace of it to get started.',
        why: 'Light, air and heat work slowly. Damp can ruin a jar in a week.'
      },
      {
        ask: 'What does a best before date actually tell you?',
        answer: 'It is the maker guess about quality, not the day something becomes unsafe.',
        why: 'Shelf life is a slope. Nothing flips over at midnight.'
      }
    ],

    check: [
      {
        prompt: 'Which spoiler does the most damage to a jar of dried mint?',
        choices: ['Heat', 'Water', 'Light', 'Air'],
        answer: 1,
        feedback: [
          'Heat speeds everything up, but water is what mould needs.',
          null,
          'Light fades it over months. Damp can ruin it in days.',
          'Air dulls it slowly, and a good lid handles that.'
        ]
      },
      {
        prompt: 'You find droplets under the lid of your jar. What happened?',
        choices: [
          'The cupboard was too dark',
          'The jar was too large',
          'The mint made its own water',
          'It was jarred before it was fully dry'
        ],
        answer: 3,
        feedback: [
          'Dark is exactly where you want it. Dark is not the fault.',
          'A big jar holds more air, but air does not bead up like that.',
          'A picked leaf makes nothing. That water was already inside.',
          null
        ]
      },
      {
        prompt: 'Your jar has no printed date on it anywhere. So what do you do?',
        choices: [
          'Write the date you filled it on the label',
          'Guess how old it looks and write that',
          'Leave it blank and remember',
          'Throw the jar out'
        ],
        answer: 0,
        feedback: [
          null,
          'A guessed date becomes a wrong fact the moment you write it.',
          'Nobody remembers. That is what a label is for.',
          'The mint is fine. It is the record that was missing.'
        ]
      }
    ]
  },

  {
    id: 'hb-m11-06',
    course: 'herbalism',
    module: 11,
    quarter: 3,
    week: 6,
    day: 3,
    n: 66,
    title: 'The label is the science',
    minutes: 45,
    spec: '§10 · beats',

    concept:
      'A label that says what the plant is, which part, when it was picked, how it was prepared and the date turns a jar into a record, and a record is the difference between a scientist and a guess.',

    standards: [],

    words: ['label', 'batch', 'method', 'record', 'repeatable'],

    glossary: [
      { word: 'label', plain: 'The five lines on a jar that say what happened to what is inside it.' },
      { word: 'batch', plain: 'One lot, made at one time. The next lot is a different batch.' },
      { word: 'method', plain: 'The exact steps you followed, written so anyone could follow them.' },
      { word: 'record', plain: 'Something written down and dated, so it outlasts your memory.' },
      { word: 'repeatable', plain: 'Set out clearly enough that somebody else could do it again.' },
      { word: 'collector', plain: 'The person who picked it. Their name belongs on the label.' },
      { word: 'unknown', plain: 'The honest thing to write when you do not know. Never a guess.' }
    ],

    video: {
      id: '-47lJ-fso7U',
      url: 'https://www.youtube.com/watch?v=-47lJ-fso7U',
      title: 'Why keep a journal - Think like a scientist (1/10)',
      channel: 'OpenLearn from The Open University',
      minutes: 7,
      verified: '2026-08-15 · re-checked at youtube.com/oembed',
      teaches: [
        'why a scientist writes things down at the moment they happen',
        'that a record is for the person who reads it later, including you',
        'that memory is not evidence',
        'what belongs in an entry and what does not'
      ],
      sourceGap:
        'OPEN. No Black American educator found for scientific record-keeping at this level. Searched: "youtube why scientists keep a lab notebook write everything down record keeping science students video", "Black chemist youtube channel kitchen chemistry educator African American science communicator video", "\'ThatBlackChemist\' OR \'That Black Chemist\' youtube video chemistry extraction lab measuring", and "\'Colah B. Tawkin\' youtube video Black in the Garden plants episode". The chemistry search surfaced the channel @ThatBlackChemist and the Black In SciComm channel, and the last surfaced Colah B. Tawkin, a Black American plant educator whose Black In The Garden episodes ARE on YouTube — but every id that came back from those searches was an adult interview or a podcast episode with no bearing on labelling or record-keeping, so none was used. This is the module\'s spine lesson and it deserves better than an Open University clip; another hour on it is worth spending.'
    },

    checkIn: M11L6_CHECK_IN,
    beats: M11L6_BEATS,
    activity: M11L6_ACTIVITY,
    ledger: M11L6_LEDGER,

    hook: M11L6_CHECK_IN,
    core: M11L6_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing:
      'Bring every jar, tray and glass from this module onto the bench and label all of them properly. Five lines each, taken from her log and not from memory: plant, part, when it was picked, how it was prepared, and the date it was jarred, plus a batch code and her signature. Where a line is not known, she writes UNKNOWN instead of guessing. Then she writes a method sheet for her mint infusion with real numbers on it — grams, millilitres, minutes, lid on or off — clear enough for a stranger to follow. Gigi shuffles two jars and hands them back, and she has to say what happened to each one using nothing but the label.',

    practice: [
      {
        ask: 'What five things does a full label have to say?',
        answer: 'The plant, the part, when it was picked, how it was prepared, and the date.',
        why: 'Every missing line is a question nobody can answer later.'
      },
      {
        ask: 'Why does a label make an experiment worth something?',
        answer: 'Because it shows what was different between two jars.',
        why: 'You can only learn from a comparison when you know what changed.'
      }
    ],

    check: [
      {
        prompt: 'A label says PEPPERMINT · LEAF · picked 14 May. Which line is missing?',
        choices: ['The part', 'The picking date', 'How it was prepared', 'The plant'],
        answer: 2,
        feedback: [
          'Leaf is on there. That is the part.',
          '14 May is on there. That is the picking date.',
          null,
          'Peppermint is right there on the first line.'
        ]
      },
      {
        prompt: 'You cannot name the plant you dried. What goes on the label?',
        choices: [
          'Your best guess at a name',
          'Nothing, so leave it off',
          'A question mark and no date',
          'UNKNOWN, with every other line still filled in'
        ],
        answer: 3,
        feedback: [
          'A guessed name becomes a wrong fact the moment somebody trusts it.',
          'The date and the place are still good data. Keep them.',
          'Somebody can name it later. Nobody can add the date later.',
          null
        ]
      },
      {
        prompt: 'Two jars smell different. Only one carries a label. What can you learn?',
        choices: [
          'That the unlabelled jar is older',
          'Something real, but only about the labelled jar',
          'That labels change how herbs smell',
          'Nothing from either jar at all'
        ],
        answer: 1,
        feedback: [
          'There is nothing on that jar to tell you its age.',
          null,
          'A label is paper. It changes the record, not the plant.',
          'The labelled jar still tells its own story properly.'
        ]
      }
    ]
  }
];

export const HERBALISM_M11_META = {
  courseId: 'herbalism',
  module: 11,
  title: 'The Apothecary',
  blurb:
    'The craft of preparing plant material, done properly. The five jobs a bench has to do, weighing in grams instead of guessing in cups, drying measured on a scale, three ways water gets colour and smell out of a leaf or a root, what shortens the life of a jar, and the five-line label that turns a jar into a record.'
};

export function m11LessonById(id) {
  return HERBALISM_M11.find((l) => l.id === id) || null;
}

export default HERBALISM_M11;
