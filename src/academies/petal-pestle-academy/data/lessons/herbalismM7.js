// ---------------------------------------------------------------------------
// HERBALISM & BOTANY — MODULE 7 · HERBS IN HISTORY
// QUARTER 2 · WEEKS 5 AND 6 · LESSONS 37–42
//
// Built to /home/claude/LESSON-SPEC.md and to the shape of
// src/data/lessons/herbalismM1.js. Four steps, two beats, an Apply-It inside
// each beat, a 20-minute activity away from the screen, a ledger she writes.
//
// ---- WHY EVERY LESSON HERE DECLARES standards: [] ----
//
// This module carries NO Georgia fourth-grade science element, and that is a
// statement rather than an oversight. Georgia's fourth-grade science map has
// no element about the history of plant use, oral tradition, food history or
// herbarium practice. Bolting one of S4L1's habitat elements onto Lesson 40
// so the module "has a standard" would be exactly the convenience-over-honesty
// the Science Lab split exists to prevent. Six empty arrays, on purpose.
//
// No offGrade code either. Off-grade means "this is a real Georgia element
// from a lower grade." These lessons are not a science element from any grade.
// They are history, and the practice of keeping a record.
//
// ---- THE EDUCATOR-SOURCE GAP, AND WHAT HAPPENED TO IT HERE ----
//
// Across the first 20 lessons of this course the app found essentially no
// Black American educators as video sources, and every lesson's `sourceGap`
// string says so. This module was the place to change that, and it did, in
// three of six lessons — all three verified through the noembed endpoint, not
// assumed from a search result:
//
//   L37  Alexis Nikole Nelson (Black Forager), CBS Mornings.
//   L40  Mary Francis Hill Coley of Albany, Georgia — GPB Education,
//        "Georgia Stories". A Black Georgian woman, taught by Georgia's own
//        public broadcaster, forty minutes down the road from where Azianna
//        lives.
//   L41  Michael W. Twitty, culinary historian, on Townsends.
//
// Three lessons still carry an open gap (L38, L39, L42) and their sourceGap
// strings name the exact searches that came back empty. Two further Black
// American sources were verified and NOT used, kept here as live alternates:
//
//   lCIkucegV9c  "Amirah Mitchell: Preserving History Through Seeds"
//                — Temple University - Ambler Campus. Black seed keeper,
//                  African-diaspora crops. Strong alternate for L41.
//   sIM5Wqn1O5g  "Chris Bolden-Newsome and Owen Taylor of Truelove Seeds"
//                — Dan Brisebois | The Seed Farmer. Adult-pitched interview.
//
// One promising lead was DISCARDED because it did not exist: an Emma Dupree
// interview at rXe8cIgPfuw came back `{"error":"404 Not Found"}` from noembed.
// It is named here so nobody re-finds the same dead search result and trusts it.
//
// ---- LESSON 40 IS THE ONE THAT MATTERS, AND IT IS NOT A HOW-TO ----
//
// Lesson 40 is Black American healing history in the American South. It names
// real people — Mary Francis Hill Coley of Albany, Georgia; Onnie Lee Logan of
// Mobile, Alabama; Emma Dupree of Fountain, North Carolina — and it teaches
// exactly three things: who they were, how the knowledge travelled, and what
// it took to get it written down before it was lost.
//
// It teaches NOTHING about what plant was used for what. Not one remedy, not
// one preparation, not one "this was used for that". The rule is stricter here
// than anywhere else in the course, because this is the one lesson where the
// temptation to slide from history into instructions is real. The activity is
// an oral-history interview: she becomes the person who writes it down. The
// safety string says out loud that we study these people and do not copy them.
//
// ---- FACTS AND WHERE THEY CAME FROM ----
//
//   Coley: b. 15 Aug 1900, d. 8 Mar 1966, Albany GA. Delivered over 3,000
//   babies. "All My Babies" (1952, dir. George C. Stoney) was made about her
//   work, used to train midwives across the South and later abroad, and was
//   added to the National Film Registry in 2002.
//   Logan: Mobile AL; "Motherwit: An Alabama Midwife's Story", 1989.
//   Dupree: 4 Jul 1897 – 12 Mar 1996, Falkland and Fountain, Pitt County NC.
//   Called "that little medicine thing." Brown-Hudson Award 1984; North
//   Carolina Heritage Award 1992.
//   Okra: African plant; the English word traces to an African language and
//   appears in Virginia writing in 1679; reached the Americas via the Atlantic
//   slave trade.
//   African rice (Oryza glaberrima): domesticated about 3,000 years ago in the
//   inland delta of the Upper Niger, in present-day Mali; carried to the
//   Americas as ship provisions, with the growing skill carried by enslaved
//   rice farmers.
//
// The braided-seeds account in L41 is presented as what it is — oral history,
// told by families for generations — and is worded "families have told this"
// rather than stated as an excavated fact. The documented part sits beside it:
// the seed travelled as ship provisions and the skill travelled in people.
//
// ---- READING LEVEL AND SAFETY ----
//
// ~2.5. Short sentences, under 11 words wherever it can be managed. Subject
// vocabulary (herbarium, rhizome, sorghum, midwife) is exempt and gets a
// glossary line. NO DOSING ANYWHERE. Nothing is tasted in any of the six
// lessons; every activity that touches a plant says so in `safety`.
// ---------------------------------------------------------------------------

/* =========================================================================
 * LESSON 37 · hb-m7-01 · Before grocery stores and pharmacies
 * ========================================================================= */

const M7L1_CHECK_IN = {
  title: 'The shelf that was not there',
  text: 'Open the pantry and count the boxes and cans. None of it was on a shelf 200 years ago. Every bit was grown, found or traded for.',
  question: 'No store. So how would you know what was safe to eat?'
};

const M7L1_BEATS = [
  {
    n: 1,
    label: 'No store, no labels',
    hook: 'The first pick-it-yourself grocery store opened in 1916. Before that, a clerk fetched everything.',
    teachingText:
      'Before stores, food came from the yard, the woods and the field. Nothing had a label on it. You had to know the plant by looking at it.',
    example:
      'Your garlic, ginger, turmeric and corn are exactly this. You know those four by sight. A child your age once knew fifty.',
    applyIt: {
      prompt: 'It is 1820. You want to know if a plant is food. What do you do?',
      choices: [
        'Read the label on it',
        'Ask an older person who knows it',
        'Taste a little and wait',
        'Guess from the colour'
      ],
      answer: 1,
      feedback: [
        'Plants do not come with labels.',
        null,
        'Tasting to find out is how people got hurt.',
        'Colour tells you nothing about safety.'
      ],
      why: 'The knowledge lived in people. You got it by asking and by watching.'
    }
  },
  {
    n: 2,
    label: 'One plant, many jobs',
    hook: 'Brooms used to be made from a plant. That is why one kind of sorghum is called broomcorn.',
    teachingText:
      'A useful plant was not only food. The same plant could be a basket, a dye or a broom. Almost nothing got thrown out.',
    example:
      'A gourd grew, dried hard, and became a bowl. Corn gave grain, and the husks were braided into dolls and mats.',
    applyIt: {
      prompt: 'A family plants one patch of sorghum. What do they get from it?',
      choices: [
        'Only grain',
        'Only broom straw',
        'Grain, sweet syrup and broom straw',
        'Nothing they can use'
      ],
      answer: 2,
      feedback: [
        'They used far more of it than that.',
        'Brooms were one job out of several.',
        null,
        'It was one of the most useful plants they had.'
      ],
      why: 'One plant did several jobs. That is why people gave it space.'
    }
  }
];

const M7L1_ACTIVITY = {
  title: 'The hundred step survey',
  prep: 'Draw a rough map of the yard first. Mark the door, the step and your four pots.',
  needs: [
    'a notebook',
    'a pencil',
    'coloured pencils',
    'your rough yard map',
    'gloves',
    'a phone camera if you have one'
  ],
  steps: [
    'Start at the door. Walk one hundred steps around the yard.',
    'Every time you see a different plant, stop and draw it.',
    'Draw the leaf shape big enough to see later.',
    'Write a name beside it if you know one.',
    'Write UNKNOWN if you do not. That is a real answer.',
    'Mark on your map where each one was growing.',
    'Now ask Gigi. Add every name she knows.',
    'Count how many you could name on your own.',
    'Circle the four in your pots. You planted those yourself.',
    'Pick your best unknown. Finding its name is your job this month.'
  ],
  safety:
    'Look, draw and photograph only. Do not pick, rub or taste anything. Some plants sting or itch. Gigi says yes before you touch a leaf, and you wash your hands after.',
  grownUpAsks: [
    'Before we start. How many different plants do you think are out here?',
    'You drew that leaf. Say what shape it is without using your hands.',
    'You wrote UNKNOWN. Is that a wrong answer or a true one?',
    'This one grows here on its own. Did anyone plant it?',
    'Which of these did somebody choose to grow? How can you tell?',
    'You can name this one. Does that mean it is safe to eat?',
    'If the store closed for a year, which of these would you want?',
    'Who taught me the name of this plant, do you think?',
    'What would you have to know to live off this yard?',
    'Pick your favourite unknown. How will you find out what it is?',
    'Say the rule back to me. What do we never do with a plant we cannot name?'
  ]
};

const M7L1_LEDGER = {
  sheet: 'M7L1-hundred-step-survey-PRINTABLE.pdf',
  tasks: [
    'Draw your yard map. Number every plant you found.',
    'Write how many you could name, and how many were unknown.',
    'Pick one unknown. Draw it big, with the leaf edge and the stem.',
    'Write one sentence: what would be hardest about having no store?'
  ],
  game: {
    title: 'Word Boss',
    cards: ['FORAGE', 'CULTIVATE', 'WILD PLANT', 'TRADITION'],
    rounds: [
      'Say what each word means in your own words. No fancy talk.',
      'A grown-up says the meaning. You say the word. Beat the clock.',
      'Stump Gigi. Write her one question you already know the answer to.'
    ],
    ifSheIsStuck:
      'Walk her back out to the step. Point at a pot for CULTIVATE and at the fence line for WILD PLANT.'
  },
  note: 'Nothing here is graded. Nothing is corrected. Petals are for doing it.'
};

/* =========================================================================
 * LESSON 38 · hb-m7-02 · Kitchen physic — what is already in Gigi's kitchen
 * ========================================================================= */

const M7L2_CHECK_IN = {
  title: 'The cabinet is a plant collection',
  text: 'Open the spice cabinet. Line ten jars up on the counter. Every one started as a living plant. Not one is a whole plant.',
  question: 'So which piece of the plant is inside each jar?'
};

const M7L2_BEATS = [
  {
    n: 1,
    label: 'Every jar is a plant part',
    hook: 'Cinnamon is tree skin. It is inner bark, rolled up as it dries.',
    teachingText:
      'Spices come from different parts of plants. Bark, seed, leaf, fruit, flower bud, root. The part tells you where it grew on the plant.',
    example:
      'Your ginger and turmeric are rhizomes. A rhizome is a fat stem that grows sideways underground. It looks like a root, but it is a stem.',
    applyIt: {
      prompt: 'A clove is a flower bud, picked before it opens. What was it going to be?',
      choices: ['A leaf', 'A flower', 'A root', 'A seed pod'],
      answer: 1,
      feedback: [
        'Buds on this tree open into flowers, not leaves.',
        null,
        'Roots grow down. This grew on a branch.',
        'That comes later, after it has flowered.'
      ],
      why: 'A bud is a flower still folded up. Cloves are picked before they open.'
    }
  },
  {
    n: 2,
    label: 'Kitchen physic',
    hook: 'Physic is an old word for plant know-how. Kitchen physic meant the know-how kept at home.',
    teachingText:
      'For hundreds of years the kitchen held the plant knowledge. The cook knew each plant, its part and its place. We ask that same question. We do not copy what they made.',
    example:
      'Garlic is a bulb. Corn is a seed. Ginger and turmeric are rhizomes. Four plants on your step, four different parts.',
    applyIt: {
      prompt: 'You find a jar of dried leaves with no label. What can you still say?',
      choices: [
        'Exactly which plant it is',
        'That it is safe',
        'That it is a leaf, and nothing more',
        'Nothing at all'
      ],
      answer: 2,
      feedback: [
        'A leaf shape on its own is rarely enough.',
        'A jar with no label is never safe.',
        null,
        'You can say it is a leaf. That is something.'
      ],
      why: 'The part is easy to see. The name needs a label. No label, no name.'
    }
  }
];

const M7L2_ACTIVITY = {
  title: 'Sort the spice cabinet',
  prep: 'Ask Gigi first, then clear the counter. Get a world map or a globe out.',
  needs: [
    'ten to twelve jars from the cabinet',
    'six index cards',
    'a world map or globe',
    'a magnifier',
    'a notebook and pencil',
    'sticky notes'
  ],
  steps: [
    'Write one card each: ROOT OR RHIZOME, BARK, LEAF, SEED, FRUIT, FLOWER BUD.',
    'Lay the six cards across the counter in a row.',
    'Take one jar. Tip a little onto a white plate.',
    'Look at it with the magnifier before you decide anything.',
    'Put the jar behind the card you think it belongs to.',
    'Say out loud why. "This is curled bark, so it grew on a trunk."',
    'Do all ten. Argue with Gigi about the hard ones.',
    'Now read the small print for a country. Put a sticky note on the map.',
    'Find the two jars that are the same plant part. Stand them together.',
    'Last: go get your ginger and your garlic. Which cards do they go behind?'
  ],
  safety:
    'Smell and look. Taste nothing unless Gigi hands it to you herself. Pepper in your eye really hurts, so keep your hands away from your face. Wash your hands at the end.',
  grownUpAsks: [
    'Before you open anything. How many of these do you think are seeds?',
    'Pick it up with the magnifier. What part of a plant is that?',
    'Why do you say bark? What are you actually looking at?',
    'Which one surprised you most?',
    'A herb is a leaf. So is this jar a herb or a spice?',
    'Go get your ginger. Root or stem? How do you know?',
    'This one grew a long way from Georgia. Why would we have it here?',
    'Somebody had to know this plant to fill this jar. Who?',
    'If all the labels fell off tonight, what would we still know?',
    'What would we have lost?',
    'Say the rule out loud. When do we taste something?'
  ]
};

const M7L2_LEDGER = {
  sheet: 'M7L2-spice-cabinet-sort-PRINTABLE.pdf',
  tasks: [
    'Fill the table: jar name, plant part, where it grew.',
    'Draw the two that were hardest to sort. Say why they were hard.',
    'Write which part of the plant your ginger is. Use the right word.',
    'Write one question about a jar for Gigi. You must know the answer.'
  ],
  game: {
    title: 'Word Boss',
    cards: ['SPICE', 'HERB', 'RHIZOME', 'BULB', 'BARK'],
    rounds: [
      'Say what each word means in your own words. No fancy talk.',
      'A grown-up holds up a jar. You say the part. Beat the clock.',
      'Stump Gigi. Write her one question you already know the answer to.'
    ],
    ifSheIsStuck:
      'Put the ginger in one hand and the garlic in the other. RHIZOME and BULB stop being words and start being objects.'
  },
  note: 'Nothing here is graded. Nothing is corrected. Petals are for doing it.'
};

/* =========================================================================
 * LESSON 39 · hb-m7-03 · Drying and storing for winter
 * ========================================================================= */

const M7L3_CHECK_IN = {
  title: 'The grape and the raisin',
  text: 'Put a grape and a raisin side by side. Same fruit, same plant. The raisin sat in a box for a year. It is fine. The grape will go furry in a week.',
  question: 'What did somebody take out of the raisin?'
};

const M7L3_BEATS = [
  {
    n: 1,
    label: 'Rot needs water',
    hook: 'Mould is alive. It is a fungus, and like you it needs a drink.',
    teachingText:
      'A fresh leaf is mostly water. Mould and bacteria need that water to grow. Take the water out and they cannot get started.',
    example:
      'A grape is about four fifths water. A raisin is that same grape with the water gone. There is nothing left in it to drink.',
    applyIt: {
      prompt: 'You seal fresh mint in a bag while it is still damp. What happens?',
      choices: ['It dries faster', 'It goes mouldy', 'It keeps for a year', 'It turns into a raisin'],
      answer: 1,
      feedback: [
        'Sealed air stops it drying at all.',
        null,
        'Damp and sealed is the worst mix there is.',
        'A raisin is dry. This is wet and shut in.'
      ],
      why: 'Water plus still air is what mould wants. Dry it first, seal it after.'
    }
  },
  {
    n: 2,
    label: 'Dry it dim, dry it fast',
    hook: 'Sunlight fades a drying leaf. It takes the smell away too.',
    teachingText:
      'Hang small bundles upside down. Pick a dim, airy place. Moving air dries it fast, before mould can win.',
    example:
      'Then store the leaves whole in a jar with a lid. Crush them later, in your hand. Crushing is what lets the smell out.',
    applyIt: {
      prompt: 'Two jars of dried mint. One sat on a sunny sill, one in a dark cupboard. Which smells stronger?',
      choices: ['The sunny one', 'The cupboard one', 'Both the same', 'Neither smells at all'],
      answer: 1,
      feedback: [
        'Sun takes the colour and the smell with it.',
        null,
        'Light makes a real difference over months.',
        'Dried leaves hold their smell for months.'
      ],
      why: 'Light and heat drive the smell out. Dark and cool keep it in.'
    }
  }
];

const M7L3_ACTIVITY = {
  title: 'Three ways to dry, and one of them is wrong',
  prep: 'Ask Gigi for three good handfuls of the same herb. Mint, basil or sage all work. Cut them in the morning, after the dew dries.',
  needs: [
    'three equal bunches of one herb',
    'string',
    'a plate',
    'a zip bag',
    'two clean jars with lids',
    'sticky labels and a pen',
    'a notebook'
  ],
  steps: [
    'Make three bunches that look the same. Weigh them if you can.',
    'Bundle A: tie the stems and hang it upside down somewhere dim and airy.',
    'Bundle B: spread it on a plate in the hottest sun you have.',
    'Bundle C: put it in the zip bag while it is still damp. Seal it.',
    'Write your guess for all three BEFORE day one. Which will keep?',
    'Look at all three every day for seven days. Write what you see.',
    'Day 7: compare the colour of A and B. Say which is greener.',
    'Rub a dry leaf from A between your fingers. Smell your fingers.',
    'Do the same with B. Which one still smells of the plant?',
    'Put A in a jar. Label it with the plant name AND today date.',
    'Look at C from a distance. Do not open it. That is the lesson.'
  ],
  safety:
    'Bundle C will go mouldy. That is the point of it. Do not open the bag and do not sniff it. Gigi takes it straight to the bin. Nothing in this lesson is tasted. Wash your hands at the end.',
  grownUpAsks: [
    'Before we start. Which bundle do you think will win, and why?',
    'Feel a fresh leaf. Now feel a dried one. What left?',
    'Why did we hang bundle A upside down instead of laying it flat?',
    'The dim spot has no sun at all. Will it still dry?',
    'Look at B in the sun. Something is happening to the colour. What?',
    'Smell your fingers after A, then after B. Say the difference out loud.',
    'C is sealed and it is damp. What is growing in there, and why?',
    'Would C have been fine if we had dried it first?',
    'Why does the label need a date and not just a name?',
    'Where in this house should the jar live? Say why.',
    'Say the rule. Do we ever eat something that has gone mouldy?'
  ]
};

const M7L3_LEDGER = {
  sheet: 'M7L3-three-ways-to-dry-PRINTABLE.pdf',
  tasks: [
    'Write your day-one guess for A, B and C. Do it before you look.',
    'Fill the seven-day chart. One line a day for each bundle.',
    'Write which bundle won and what told you.',
    'Copy your jar label onto the sheet. Name and date, both.'
  ],
  game: {
    title: 'Word Boss',
    cards: ['PRESERVE', 'MOISTURE', 'MOULD', 'AIRTIGHT'],
    rounds: [
      'Say what each word means in your own words. No fancy talk.',
      'A grown-up says the meaning. You say the word. Beat the clock.',
      'Stump Gigi. Write her one question you already know the answer to.'
    ],
    ifSheIsStuck:
      'Hold up the grape and the raisin again. MOISTURE is the whole difference between them, in her hand.'
  },
  note: 'Nothing here is graded. Nothing is corrected. Petals are for doing it.'
};

/* =========================================================================
 * LESSON 40 · hb-m7-04 · The granny midwives and the root doctors
 *
 * History. Not instructions. Read the file header before editing this one.
 * ========================================================================= */

const M7L4_CHECK_IN = {
  title: 'Twenty miles to a doctor',
  text: 'Georgia, 1930. A family lives at the end of a dirt road. The nearest hospital is twenty miles off. It will not take Black patients. A baby is coming tonight.',
  question: 'Who comes to the house?'
};

const M7L4_BEATS = [
  {
    n: 1,
    label: 'The granny midwives',
    hook: 'Mary Francis Hill Coley worked in Albany, Georgia. She helped over three thousand babies be born.',
    teachingText:
      'A midwife is a person who helps at a birth. Across the rural South most were Black women. People called them granny midwives.',
    example:
      'Mrs Coley worked in Albany for over thirty years. A film was made about her work in 1952. The Library of Congress keeps it today.',
    applyIt: {
      prompt: 'In 1930 a rural Georgia family lives far from any hospital. Who delivers their baby?',
      choices: [
        'A doctor at the hospital',
        'The granny midwife who lives nearby',
        'Nobody at all',
        'A nurse sent out from the city'
      ],
      answer: 1,
      feedback: [
        'The hospital was far off, and often closed to them.',
        null,
        'Babies were born. Someone was always there.',
        'There was no such service on those roads.'
      ],
      why: 'These women delivered most of the babies in the rural South.'
    }
  },
  {
    n: 2,
    label: 'The root doctors and the herb women',
    hook: 'People in Fountain, North Carolina called Emma Dupree "that little medicine thing".',
    teachingText:
      'Some people knew their county plants better than anyone alive. In the South they were called root doctors or herb women. Almost none of what they knew was written down.',
    example:
      'It was against the law to teach enslaved people to read. So the knowledge travelled by talking and by watching. That is called oral tradition.',
    applyIt: {
      prompt: 'One person knows something nobody ever wrote down. She dies. What happens to it?',
      choices: [
        'It is in a library somewhere',
        'It is lost, unless someone recorded it',
        'It comes back later on its own',
        'It was never real'
      ],
      answer: 1,
      feedback: [
        'A library only holds what somebody wrote.',
        null,
        'Lost knowledge does not come back by itself.',
        'It was real. It was just never written down.'
      ],
      why: 'This is why asking matters. An interview is how it gets saved.'
    }
  }
];

const M7L4_ACTIVITY = {
  title: 'Be the one who writes it down',
  prep: 'Ask Gigi for thirty quiet minutes and for permission to record her. Charge the phone. Write your questions out before you sit down.',
  needs: [
    'a notebook',
    'a pencil',
    'a phone or a recorder',
    'Gigi permission, asked out loud',
    'a quiet room',
    'today date'
  ],
  steps: [
    'Write the date, the place, and who you are talking to. Do that first.',
    'Ask: what grew in the yard when you were my age?',
    'Ask: who in our family grew things? Who knew the names?',
    'Ask: what did somebody hang up to dry?',
    'Ask: who taught you that? Who taught them?',
    'Ask: what did your grandmother keep in her kitchen?',
    'Ask: who did people go to before there was a doctor nearby?',
    'Do not interrupt. Let the quiet sit. People remember in the quiet.',
    'Write plant names down exactly the way she says them.',
    'At the end, read your notes back to her. Ask what you got wrong.',
    'Sign it and date it. It is a record now.'
  ],
  safety:
    'Nothing is picked, made or tasted today. This lesson is history, not instructions. If Gigi names a plant her family used, write the NAME down and stop there. We study these people. We do not copy what they did.',
  grownUpAsks: [
    'Before we start. Why are you writing the date at the top?',
    'You just heard something new. What is your next question?',
    'Say back to me what I just said. In your own words.',
    'Who taught the person who taught me? Did we get that far back?',
    'Which plant name did I say that you had never heard before?',
    'What could you not spell? Ask me to spell it now.',
    'If nobody had asked me these questions, where would the answers go?',
    'Mrs Coley helped over three thousand babies. Why did somebody film her?',
    'Why do you think so little of this got written down at the time?',
    'Are we going to try anything I named today? Say the rule out loud.',
    'Who else in this family should you interview next, and when?'
  ]
};

const M7L4_LEDGER = {
  sheet: 'M7L4-oral-history-record-PRINTABLE.pdf',
  tasks: [
    'Write the name, the place and the date at the top. That is what makes it a record.',
    'Write three things you learned that you did not know this morning.',
    'Write one plant name she said. Write where she saw it growing.',
    'Write one question you ran out of time for. Ask it next week.'
  ],
  game: {
    title: 'Word Boss',
    cards: ['MIDWIFE', 'ORAL TRADITION', 'ROOT DOCTOR', 'RECORD', 'GENERATION'],
    rounds: [
      'Say what each word means in your own words. No fancy talk.',
      'A grown-up says the meaning. You say the word. Beat the clock.',
      'Stump Gigi. Write her one question you already know the answer to.'
    ],
    ifSheIsStuck:
      'Point at her own notebook from ten minutes ago. She wrote the answer to RECORD down herself.'
  },
  note: 'Nothing here is graded. Nothing is corrected. Petals are for doing it. Keep this page. It is the oldest thing in the binder.'
};

/* =========================================================================
 * LESSON 41 · hb-m7-05 · Plants that crossed the ocean
 * ========================================================================= */

const M7L5_CHECK_IN = {
  title: 'Say the word out loud',
  text: 'Okra. Gumbo. Goober. Say all three. Each word came to Georgia from an African language. They came on ships, with people.',
  question: 'If the word crossed the ocean, what else crossed with it?'
};

const M7L5_BEATS = [
  {
    n: 1,
    label: 'African plants in a Georgia garden',
    hook: 'The English word okra came from an African language. It shows up in Virginia writing in 1679.',
    teachingText:
      'Okra, sorghum, black-eyed peas and watermelon are African plants. They reached the Americas on slave ships. They have been in Southern gardens ever since.',
    example:
      'Peanuts went the other way first. They went from South America to Africa. Then back here, with enslaved people. Goober is an African word for peanut.',
    applyIt: {
      prompt: 'A Georgia cookbook from 1850 has an okra recipe in it. What does that tell you?',
      choices: [
        'Okra is a Georgia native plant',
        'Okra had already crossed the ocean',
        'The book made it up',
        'Okra came here from Europe'
      ],
      answer: 1,
      feedback: [
        'Okra is African. It is not from Georgia.',
        null,
        'Okra was common in the South by then.',
        'Okra reached Europe from Africa too.'
      ],
      why: 'The plant was here because people were brought here. They travelled together.'
    }
  },
  {
    n: 2,
    label: 'The knowledge crossed too',
    hook: 'Families have told this for generations. Women braided seeds into their hair before the ships.',
    teachingText:
      'A seed on its own is not enough. Somebody has to know how to grow it. West African farmers knew how to build and flood a rice field.',
    example:
      'African rice was grown on the Niger River three thousand years ago. Rice fields in Georgia and Carolina were built on that same skill.',
    applyIt: {
      prompt: 'You are handed rice seed and a wet field. Why is the seed not enough?',
      choices: [
        'Seed always grows by itself',
        'Somebody has to know how to grow it',
        'Rice needs no water',
        'Wet ground grows nothing'
      ],
      answer: 1,
      feedback: [
        'A rice field has to be built, banked and flooded.',
        null,
        'Rice is grown in flooded fields.',
        'A rice field is made from wet ground on purpose.'
      ],
      why: 'Skill is knowledge, and knowledge travels in people. That is the whole lesson.'
    }
  }
];

const M7L5_ACTIVITY = {
  title: 'The crossing map',
  prep: 'Print a world map big enough to write on. Find Africa, the Atlantic Ocean and Georgia before you start. Get a small handful of each seed out of the pantry.',
  needs: [
    'a big world map',
    'dried black-eyed peas',
    'uncooked rice',
    'watermelon seeds',
    'popcorn or corn kernels',
    'sorghum or plain birdseed',
    'glue',
    'coloured pencils',
    'a small pot with soil'
  ],
  steps: [
    'Lay the map flat. Put your finger on Africa. Now on Georgia.',
    'Glue three black-eyed peas onto West Africa.',
    'Glue a few rice grains onto Mali, on the Niger River.',
    'Glue watermelon seeds onto Africa as well.',
    'Glue corn kernels onto Mexico. Corn travelled the other way.',
    'Draw a line from each seed to Georgia. A different colour each time.',
    'Write the plant name at the Georgia end of every line.',
    'Write THE PEOPLE CAME TOO across the ocean. Say it out loud.',
    'Push three dried black-eyed peas into the pot, about an inch down.',
    'Water it and write the date on the pot. Put it beside your garlic.',
    'Check it every day. Write the day the first shoot shows.'
  ],
  safety:
    'These dried peas are food and they are also seed. Do not eat raw dried beans, they need cooking first. Wash your hands after the soil. Never taste anything out of the garden without Gigi.',
  grownUpAsks: [
    'Before we glue anything. Where do you think okra is from?',
    'Put your finger on Africa, then on Georgia. How far is that?',
    'Say gumbo out loud. Whose word is that?',
    'Peanuts went from South America to Africa and then here. Why?',
    'Corn goes the other way on your map. Who took it?',
    'A seed got here. Was that enough to grow rice? Say why not.',
    'Who knew how to build a rice field? How did they learn?',
    'Nobody wrote the braided-hair story down for a long time. Who kept it?',
    'These peas have been food in our family for a long time. Does that surprise you?',
    'You just planted three of them. What are you actually planting?',
    'Say the rule out loud. When do we taste something from the garden?'
  ]
};

const M7L5_LEDGER = {
  sheet: 'M7L5-the-crossing-map-PRINTABLE.pdf',
  tasks: [
    'Name four plants on your map that came from Africa.',
    'Write one English word that came from an African language.',
    'Write the date you planted the black-eyed peas.',
    'Write one sentence: why is a seed not enough on its own?'
  ],
  game: {
    title: 'Word Boss',
    cards: ['OKRA', 'SORGHUM', 'COWPEA', 'STAPLE CROP', 'GOOBER'],
    rounds: [
      'Say what each word means in your own words. No fancy talk.',
      'A grown-up says the meaning. You say the word. Beat the clock.',
      'Stump Gigi. Write her one question you already know the answer to.'
    ],
    ifSheIsStuck:
      'Put the black-eyed peas in her hand. COWPEA and STAPLE CROP are easier when the crop is sitting in her palm.'
  },
  note: 'Nothing here is graded. Nothing is corrected. Petals are for doing it.'
};

/* =========================================================================
 * LESSON 42 · hb-m7-06 · Build a flower press
 * ========================================================================= */

const M7L6_CHECK_IN = {
  title: 'Seven million flat dead plants',
  text: 'There are rooms full of pressed, dried plants glued onto paper. Kew Gardens in London keeps about seven million of them.',
  question: 'Why would anyone keep a flat dead plant for three hundred years?'
};

const M7L6_BEATS = [
  {
    n: 1,
    label: 'What a herbarium is',
    hook: 'Some sheets in these rooms are over three hundred years old. Scientists still take them out and look.',
    teachingText:
      'A herbarium is a library of pressed plants. Each plant is dried flat and glued to a sheet. Every sheet has a label.',
    example:
      'Pressing does two jobs at once. It squeezes the water out, the same as drying herbs. It also flattens the plant so it fits on a shelf.',
    applyIt: {
      prompt: 'A pressed plant lasts for centuries. A picked flower rots in a week. Why?',
      choices: ['It was never alive', 'The water is gone', 'It is kept cold', 'The glue stops rot'],
      answer: 1,
      feedback: [
        'It was alive. Somebody picked it.',
        null,
        'These rooms are not cold rooms.',
        'Glue holds it down. It does not dry it.'
      ],
      why: 'Same rule as the drying lesson. No water means no mould.'
    }
  },
  {
    n: 2,
    label: 'The label is the science',
    hook: 'Some plants now flower earlier than they used to. Scientists found that out by reading old labels.',
    teachingText:
      'A pressed flower with no label is a decoration. A label turns it into a record. It needs what, where, when and who.',
    example:
      'One sheet from 1899 says the plant flowered on April 20th. A sheet from today says April 2nd. Two labels, one finding.',
    applyIt: {
      prompt: 'You press a beautiful leaf and write nothing on it. What have you got?',
      choices: ['A specimen', 'A record', 'A pretty leaf', 'Data'],
      answer: 2,
      feedback: [
        'A specimen comes with a label.',
        'A record has to say where and when.',
        null,
        'Data is the plant plus the label. You have half.'
      ],
      why: 'The plant is half of it. The label is the other half.'
    }
  }
];

const M7L6_ACTIVITY = {
  title: 'Build the press, then fill it',
  prep: 'A grown-up drills four corner holes through two boards. Cut the newspaper and cardboard to fit inside. Do the building first, the collecting second.',
  needs: [
    'two boards or stiff cardboard, about 9 by 12 inches',
    'four bolts with wing nuts, or two strong straps',
    'ten sheets of newspaper',
    'six pieces of corrugated cardboard',
    'paper towels',
    'index cards for labels',
    'a pencil',
    'gloves',
    'white glue and card, for two weeks time'
  ],
  steps: [
    'Stack it like a sandwich. Board, cardboard, newspaper, plant, newspaper, cardboard.',
    'Keep stacking until there is room for four or five plants.',
    'Put the second board on top. Tighten the wing nuts a little at a time.',
    'Go out with Gigi. Collect four to six plants she says yes to.',
    'Take a leaf, a flower and a bit of stem from each one.',
    'Never take the last one of anything. Leave the patch as you found it.',
    'Fill in a label card the moment you pick it. Do not wait.',
    'Write four things: what it is or UNKNOWN, where exactly, the date, and Collector: Azianna.',
    'Lay each plant flat in the press. Spread the leaves out.',
    'Turn one leaf over so the back of it shows. Scientists always do this.',
    'Tighten the press again in two days. Swap out any damp newspaper.',
    'Open it in two weeks. Glue each plant and its label onto card.'
  ],
  safety:
    'Gigi says yes before you pick anything at all. Wear gloves for prickly or hairy plants. Never pick on somebody else land. Nothing in this lesson is tasted, ever. Wash your hands when you come in.',
  grownUpAsks: [
    'Before we go out. What are the four things a label has to say?',
    'Why does the date matter more than the pretty flower?',
    'You wrote UNKNOWN. Is this specimen worth keeping?',
    'Why turn one leaf over? What is on the back of a leaf?',
    'We only took a little. Why not the whole plant?',
    'Where exactly did this come from? Is "the yard" good enough?',
    'What happens if we leave the damp newspaper in there?',
    'This sheet could last three hundred years. Who reads it in 2300?',
    'Somebody in 1899 wrote a date on a sheet. What did that give us?',
    'Which of yours would be hardest to name, and what would you do?',
    'Say the rule out loud. What do we never do with anything we picked?'
  ]
};

const M7L6_LEDGER = {
  sheet: 'M7L6-specimen-labels-PRINTABLE.pdf',
  tasks: [
    'Fill in a full label for every plant you pressed. All four lines.',
    'Write your name as the collector. That is now part of the record.',
    'Write one sentence: why does a label need a date?',
    'Name one plant you could not name, and write what you will do about it.'
  ],
  game: {
    title: 'Word Boss',
    cards: ['HERBARIUM', 'SPECIMEN', 'PRESS', 'LABEL', 'COLLECTOR'],
    rounds: [
      'Say what each word means in your own words. No fancy talk.',
      'A grown-up says the meaning. You say the word. Beat the clock.',
      'Stump Gigi. Write her one question you already know the answer to.'
    ],
    ifSheIsStuck:
      'Hold up one of her own label cards. COLLECTOR is the line with her name on it.'
  },
  note: 'Nothing here is graded. Nothing is corrected. Petals are for doing it. This one goes in the binder and stays there.'
};

/* =========================================================================
 * THE MODULE
 * ========================================================================= */

export const HERBALISM_M7 = [
  {
    id: 'hb-m7-01',
    course: 'herbalism',
    module: 7,
    quarter: 2,
    week: 5,
    day: 1,
    n: 37,
    title: 'Before grocery stores and pharmacies',
    minutes: 45,
    spec: '§10 · beats',

    concept:
      'Before there were stores, everything came from plants people could find and name, and that naming was carried in people, not on labels.',

    standards: [],

    words: ['forage', 'cultivate', 'wild plant', 'tradition'],

    glossary: [
      { word: 'forage', plain: 'To go out and find food that grew on its own.' },
      { word: 'cultivate', plain: 'To plant something on purpose and look after it.' },
      { word: 'wild plant', plain: 'A plant nobody planted. It came up by itself.' },
      { word: 'tradition', plain: 'Something handed down from older people to younger ones.' },
      { word: 'staple', plain: 'The food a family ate most days. Corn, rice, beans.' },
      { word: 'broomcorn', plain: 'A kind of sorghum. Its stiff tops were tied into brooms.' },
      { word: 'gourd', plain: 'A hard-skinned fruit. Dried out, it becomes a bowl or a dipper.' }
    ],

    video: {
      id: 'mwltqBr1NN0',
      url: 'https://www.youtube.com/watch?v=mwltqBr1NN0',
      title: 'Woman known online as the Black Forager on finding wild edible plants for meals',
      channel: 'CBS Mornings',
      minutes: 6,
      verified: '2026-08-15 · re-checked at youtube.com/oembed',
      teaches: [
        'wild plants growing in ordinary yards and streets',
        'that knowing a plant by sight is a real skill',
        'that this knowledge is taught person to person',
        'that you check with somebody who knows before you eat anything'
      ],
      sourceGap:
        'GAP CLOSED for this lesson. The educator on screen is Alexis Nikole Nelson, a Black American forager and educator, on CBS Mornings. Found via "Alexis Nikole Nelson PBS youtube episode foraging" and confirmed at noembed on 2026-08-14. Two further Alexis Nikole videos were verified and left unused: Up79O8VM-as (Forbes) and lZK24aGL0bQ (United States Botanic Garden, a full lecture and too long for 45 minutes).'
    },

    checkIn: M7L1_CHECK_IN,
    beats: M7L1_BEATS,
    activity: M7L1_ACTIVITY,
    ledger: M7L1_LEDGER,

    hook: M7L1_CHECK_IN,
    core: M7L1_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing:
      'Walk one hundred steps around the yard and draw every different plant you meet. Write a name beside the ones you know and UNKNOWN beside the ones you do not, because UNKNOWN is a true answer. Mark each one on a rough map, then ask Gigi and add her names. Count how many you could name on your own, and pick one unknown to chase down this month.',

    practice: [
      {
        ask: 'Where did food come from before there were grocery stores?',
        answer: 'From the yard, the woods and the field. People grew it or gathered it.',
        why: 'No shelf, no label. If you wanted it you found it or you planted it.'
      },
      {
        ask: 'Why did people once know so many plants by sight?',
        answer: 'Because nothing had a label and getting it wrong could hurt you.',
        why: 'The knowledge lived in people, and it was passed on by showing.'
      }
    ],

    check: [
      {
        prompt: 'What does it mean to forage?',
        choices: [
          'To plant something on purpose',
          'To find food that grew on its own',
          'To dry a plant for winter',
          'To buy food at a store'
        ],
        answer: 1,
        feedback: [
          'That is to cultivate.',
          null,
          'Drying comes later, after you have the plant.',
          'Foraging is what people did before stores.'
        ]
      },
      {
        prompt: 'Nobody planted the weeds by the fence. What are they?',
        choices: ['Cultivated', 'A tradition', 'Wild plants', 'A staple'],
        answer: 2,
        feedback: [
          'Cultivated means somebody planted it.',
          'A tradition is something handed down.',
          null,
          'A staple is the food a family ate most days.'
        ]
      },
      {
        prompt: 'Gigi learned a plant name from her grandmother. What is that called?',
        choices: ['A tradition', 'Foraging', 'Cultivating', 'A staple'],
        answer: 0,
        feedback: [
          null,
          'Foraging is going out and finding it.',
          'Cultivating is planting and tending it.',
          'A staple is a food, not a way of learning.'
        ]
      }
    ]
  },

  {
    id: 'hb-m7-02',
    course: 'herbalism',
    module: 7,
    quarter: 2,
    week: 5,
    day: 2,
    n: 38,
    title: "Kitchen physic — what is already in Gigi's kitchen",
    minutes: 45,
    spec: '§10 · beats',

    concept:
      'Every jar in the spice cabinet is one part of one plant, and knowing which part tells you where it grew.',

    standards: [],

    words: ['spice', 'herb', 'rhizome', 'bulb', 'bark'],

    glossary: [
      { word: 'spice', plain: 'A plant part that is not a leaf. Bark, seed, bud or root.' },
      { word: 'herb', plain: 'The leafy green part of a plant, used for its smell and taste.' },
      { word: 'rhizome', plain: 'A fat stem that grows sideways underground. Ginger is one.' },
      { word: 'bulb', plain: 'A packed ball of short leaves underground. Garlic and onion.' },
      { word: 'bark', plain: 'The skin of a tree or a stem. Cinnamon is rolled bark.' },
      { word: 'flower bud', plain: 'A flower still folded up and closed. A clove is one.' },
      { word: 'kitchen physic', plain: 'An old name for the plant know-how kept in a home kitchen.' }
    ],

    video: {
      id: '6y76ppd5Mq0',
      url: 'https://www.youtube.com/watch?v=6y76ppd5Mq0',
      title: 'How Does Cinnamon Grow?! | Maddie Moate',
      channel: 'Maddie Moate',
      minutes: 16,
      verified: '2026-08-15 · re-checked at youtube.com/oembed',
      teaches: [
        'cinnamon is the inner bark of a tree',
        'the bark curls into quills as it dries',
        'a spice is one part of a living plant',
        'where the plant grows and what it looks like standing up'
      ],
      sourceGap:
        'No Black American educator found for spice botany at this level. Searched: "youtube where do spices come from plants cinnamon ginger black pepper kids educational video", "youtube spices are plant parts bark leaf seed root flower bud", "Black American herbalist youtube channel plant history educator", and "youtube how cinnamon is made / how ginger is grown Insider Great Big Story". Everything that came back was either an adult food channel, a travel spice-farm tour, or a channel giving health advice, which this course does not use. Open.'
    },

    checkIn: M7L2_CHECK_IN,
    beats: M7L2_BEATS,
    activity: M7L2_ACTIVITY,
    ledger: M7L2_LEDGER,

    hook: M7L2_CHECK_IN,
    core: M7L2_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing:
      'Line ten jars from the spice cabinet along the counter and lay out six cards: root or rhizome, bark, leaf, seed, fruit, flower bud. Tip a little of each onto a white plate, look at it under the magnifier, and sort it behind a card while saying out loud why. Then read the small print for a country and put a sticky note on the world map. Finish by fetching your own ginger and garlic and deciding which cards they belong behind.',

    practice: [
      {
        ask: 'What part of the plant is cinnamon?',
        answer: 'Bark. The inner bark of a tree, rolled up as it dries.',
        why: 'Once you know it is bark, you know it grew on a trunk or a branch.'
      },
      {
        ask: 'Ginger looks like a root. Why is it not one?',
        answer: 'It is a rhizome, which is a stem that grows sideways underground.',
        why: 'Rhizomes have buds and grow new shoots. Roots do not.'
      }
    ],

    check: [
      {
        prompt: 'Your ginger and turmeric are which part of the plant?',
        choices: ['Bark', 'Bulbs', 'Rhizomes', 'Seeds'],
        answer: 2,
        feedback: [
          'Bark is the skin of a tree or stem.',
          'A bulb is a packed ball of leaves, like garlic.',
          null,
          'Seeds are what corn gives you.'
        ]
      },
      {
        prompt: 'Garlic grows underground as a packed ball. What is that?',
        choices: ['A bulb', 'A rhizome', 'Bark', 'A flower bud'],
        answer: 0,
        feedback: [
          null,
          'A rhizome grows sideways, like your ginger.',
          'Bark is the skin of a stem or a trunk.',
          'A flower bud is a closed flower, like a clove.'
        ]
      },
      {
        prompt: 'Dried mint leaves. Herb or spice?',
        choices: ['Spice, because it is dried', 'Herb, because it is the leaf', 'Neither', 'Both at once'],
        answer: 1,
        feedback: [
          'Drying does not change which part it is.',
          null,
          'It is one of the two. Look at which part it is.',
          'The leaf makes it a herb. Spices are the other parts.'
        ]
      }
    ]
  },

  {
    id: 'hb-m7-03',
    course: 'herbalism',
    module: 7,
    quarter: 2,
    week: 5,
    day: 3,
    n: 39,
    title: 'Drying and storing for winter',
    minutes: 45,
    spec: '§10 · beats',

    concept: 'Mould needs water, so taking the water out of a plant is what makes it keep.',

    standards: [],

    words: ['preserve', 'moisture', 'mould', 'airtight'],

    glossary: [
      { word: 'preserve', plain: 'To keep something from going bad.' },
      { word: 'moisture', plain: 'Water held inside something. A fresh leaf is full of it.' },
      { word: 'mould', plain: 'A fungus that grows on damp food. It is alive and it needs water.' },
      { word: 'airtight', plain: 'Shut so well that no air gets in or out.' },
      { word: 'bundle', plain: 'A small bunch of stems tied together at the ends.' },
      { word: 'bacteria', plain: 'Living things far too small to see. Some of them spoil food.' }
    ],

    video: {
      id: 'WcKJi-UZlac',
      url: 'https://www.youtube.com/watch?v=WcKJi-UZlac',
      title: 'How do we dry food to preserve it?',
      channel: 'Eat Happy Project',
      minutes: 3,
      verified: '2026-08-15 · re-checked at youtube.com/oembed',
      teaches: [
        'why food spoils',
        'that taking the water out stops the spoiling',
        'what dried food looks like next to fresh',
        'how people stored food before fridges'
      ],
      sourceGap:
        'No Black American educator found for food drying at this level. Searched: "youtube how to dry herbs hanging bundles preserving harvest kids garden video" and "youtube why does drying food preserve it water mold bacteria science kids". The channels that came back were Eat Happy Project, Niki Jabbour and Learn To Grow. Two alternates were verified and left unused: 3JuSismNmOo "How To Harvest and Dry Herbs - Sage" (Learn To Grow) and 8aKp2CiOwEs "How to Preserve Garden Herbs by Drying or Freezing" (Niki Jabbour). Open.'
    },

    checkIn: M7L3_CHECK_IN,
    beats: M7L3_BEATS,
    activity: M7L3_ACTIVITY,
    ledger: M7L3_LEDGER,

    hook: M7L3_CHECK_IN,
    core: M7L3_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing:
      'Make three matching bunches of one herb. Hang bundle A upside down somewhere dim and airy, spread bundle B on a plate in full sun, and seal bundle C damp in a zip bag. Write your guess before day one, then check all three every day for a week. Compare the colour of A and B, rub a leaf from each and smell your fingers, and jar the winner with the plant name and the date on the label. Bundle C stays shut and goes in the bin.',

    practice: [
      {
        ask: 'Why does a dried leaf keep and a fresh one does not?',
        answer: 'Mould and bacteria need water. A dried leaf has none for them.',
        why: 'Take the water away and nothing can get started on it.'
      },
      {
        ask: 'Why hang herbs somewhere dim instead of in the sun?',
        answer: 'Sun fades the colour and drives the smell out.',
        why: 'You want the water gone and the smell left behind.'
      }
    ],

    check: [
      {
        prompt: 'A raisin keeps for a year. What is missing from it?',
        choices: ['Sugar', 'Moisture', 'Mould', 'Skin'],
        answer: 1,
        feedback: [
          'A raisin is very sweet. The sugar stayed.',
          null,
          'Mould was never in it. That is the point.',
          'It still has its skin on.'
        ]
      },
      {
        prompt: 'You shut damp mint in a sealed bag. What grows?',
        choices: ['Nothing', 'Mould', 'New roots', 'More leaves'],
        answer: 1,
        feedback: [
          'Damp and sealed is the worst mix there is.',
          null,
          'A cut stem in a shut bag will not root.',
          'A picked stem does not make new leaves.'
        ]
      },
      {
        prompt: 'Your dried mint is ready. Where should it go?',
        choices: [
          'An airtight jar in a dark cupboard',
          'An open bowl on the sill',
          'A damp bag in the fridge',
          'Back outside in the sun'
        ],
        answer: 0,
        feedback: [
          null,
          'Open air lets the smell out and dust in.',
          'Damp brings the mould straight back.',
          'Sun keeps taking the colour and the smell.'
        ]
      }
    ]
  },

  {
    id: 'hb-m7-04',
    course: 'herbalism',
    module: 7,
    quarter: 2,
    week: 6,
    day: 1,
    n: 40,
    title: 'The granny midwives and the root doctors',
    minutes: 45,
    spec: '§10 · beats',

    concept:
      'In the rural South, Black women and men carried the whole community birth and plant knowledge in their heads, and it survived only where somebody wrote it down.',

    standards: [],

    words: ['midwife', 'granny midwife', 'oral tradition', 'root doctor', 'record'],

    glossary: [
      { word: 'midwife', plain: 'A person who helps a mother when a baby is being born.' },
      {
        word: 'granny midwife',
        plain: 'The name used in the South for the Black women who delivered babies at home.'
      },
      {
        word: 'oral tradition',
        plain: 'Knowledge passed on by talking and watching, never written down.'
      },
      {
        word: 'root doctor',
        plain: 'A Southern name for someone who knew the local plants very well. People went to them when there was no doctor near.'
      },
      { word: 'record', plain: 'Something written down and dated so it lasts after you.' },
      { word: 'generation', plain: 'One step in a family. You, your mother, her mother.' },
      { word: 'interview', plain: 'Asking someone questions and writing their answers down.' },
      { word: 'segregated', plain: 'Kept apart by law. Black families were shut out of many hospitals.' }
    ],

    video: {
      id: 'GyNIcXSP7Tg',
      url: 'https://www.youtube.com/watch?v=GyNIcXSP7Tg',
      title: 'Midwife Saint: Mary Francis Hill Coley | Georgia Stories',
      channel: 'GPB Education',
      minutes: 7,
      verified: '2026-08-15 · re-checked at youtube.com/oembed',
      teaches: [
        'who Mary Francis Hill Coley of Albany, Georgia was',
        'that she helped more than three thousand babies be born',
        'that a film was made about her work in 1952',
        'why families in the segregated South relied on midwives',
        'that this was skilled work, learned from other midwives'
      ],
      sourceGap:
        'GAP CLOSED for this lesson, and this is the best close in the module. Georgia Public Broadcasting Education, teaching a Black Georgian woman from Albany, about ninety minutes from where Azianna lives. Found via "Georgia Public Broadcasting youtube Georgia Stories midwife Mary Coley" and confirmed at noembed on 2026-08-14. Stated honestly: the segment is produced by GPB Education and its subject is Black; the narrator identity is not something the metadata can confirm. Also searched "granny midwives documentary YouTube African American South history", "youtube PBS granny midwives Alabama Margaret Charles Smith OR Onnie Lee Logan", "youtube Bringin in da Spirit midwife documentary", "youtube black herbalism history root doctors herb women South educator", "Michele Elizabeth Lee Working the Roots youtube talk", "Lucretia VanDyke OR Debra Freeman African American herbalism youtube lecture", and "Emma Dupree herb woman North Carolina little medicine thing youtube". Verified alternate, adult-pitched: oWQvetm-ABg "The Legacy of the Black Midwife Part 1/6" (Women\'s eNews). DISCARDED: rXe8cIgPfuw, an Emma Dupree interview that search results claimed exists — noembed returned {"error":"404 Not Found"}. Do not re-add it.'
    },

    checkIn: M7L4_CHECK_IN,
    beats: M7L4_BEATS,
    activity: M7L4_ACTIVITY,
    ledger: M7L4_LEDGER,

    hook: M7L4_CHECK_IN,
    core: M7L4_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing:
      'Interview Gigi and write it down. Date the page, name the place, name the person, then ask what grew in the yard when she was nine, who in the family grew things, who knew the names, what got hung up to dry, and who taught her. Do not interrupt — people remember in the quiet. Write plant names exactly as she says them, read your notes back to her at the end, and ask what you got wrong. Then sign it and date it. Nothing is picked, made or tasted: this is history, and today the job is being the person who writes it down.',

    practice: [
      {
        ask: 'Who was Mary Francis Hill Coley?',
        answer: 'A granny midwife in Albany, Georgia. She helped over three thousand babies be born.',
        why: 'A film was made about her work in 1952 and the Library of Congress keeps it.'
      },
      {
        ask: 'Onnie Lee Logan of Alabama told her life into a tape recorder. Why did that matter?',
        answer: 'Because it turned oral tradition into a book that outlives her.',
        why: 'Her book came out in 1989. Without the tape, all of it would have gone with her.'
      }
    ],

    check: [
      {
        prompt: 'What is a granny midwife?',
        choices: [
          'A Black woman in the South who delivered babies at home',
          'A doctor at a city hospital',
          'A person who knew the local plants',
          'Someone who wrote books about the South'
        ],
        answer: 0,
        feedback: [
          null,
          'The hospitals were far away, and often closed to Black families.',
          'That is a root doctor or a herb woman.',
          'The books came later, and mostly from other people.'
        ]
      },
      {
        prompt: 'Knowledge passed on by talking and watching is called what?',
        choices: ['A record', 'Oral tradition', 'A generation', 'An interview'],
        answer: 1,
        feedback: [
          'A record is written down and dated.',
          null,
          'A generation is one step in a family.',
          'An interview is how you turn one into the other.'
        ]
      },
      {
        prompt: 'Why was so little of this written down at the time?',
        choices: [
          'Nobody thought it was worth knowing',
          'It passed by talking, and reading was kept from many of them by law',
          'It was a secret from everybody',
          'They forgot it too fast to write'
        ],
        answer: 1,
        feedback: [
          'People walked miles to ask these women. It was worth plenty.',
          null,
          'It was not secret. Whole communities used it.',
          'They remembered it for a lifetime. That was the problem when they died.'
        ]
      }
    ]
  },

  {
    id: 'hb-m7-05',
    course: 'herbalism',
    module: 7,
    quarter: 2,
    week: 6,
    day: 2,
    n: 41,
    title: 'Plants that crossed the ocean',
    minutes: 45,
    spec: '§10 · beats',

    concept:
      'Okra, sorghum, cowpeas, watermelon and rice are African plants in a Georgia garden, and the skill to grow them crossed the ocean in people.',

    standards: [],

    words: ['okra', 'sorghum', 'cowpea', 'staple crop'],

    glossary: [
      { word: 'okra', plain: 'A tall green pod. An African plant, grown in the South for centuries.' },
      { word: 'sorghum', plain: 'A tall African grain. Georgia farms still make syrup from it.' },
      {
        word: 'cowpea',
        plain: 'The plant that gives black-eyed peas. It came from West Africa.'
      },
      { word: 'staple crop', plain: 'The crop a family ate most days. Rice, corn, peas.' },
      { word: 'goober', plain: 'An old Southern word for peanut. It came from an African language.' },
      { word: 'gumbo', plain: 'A Southern soup. The word came from an African word for okra.' },
      {
        word: 'plantation',
        plain: 'A very large farm in the South, worked by people who were enslaved.'
      },
      { word: 'enslaved', plain: 'Held by force and made to work, with no freedom and no pay.' }
    ],

    video: {
      id: '0VgTtzukqPM',
      url: 'https://www.youtube.com/watch?v=0VgTtzukqPM',
      title: 'Okra Soup with Michael Twitty',
      channel: 'Townsends',
      minutes: 9,
      verified: '2026-08-15 · re-checked at youtube.com/oembed',
      teaches: [
        'okra as an African plant in Southern cooking',
        'that these dishes came from the food of enslaved people',
        'what okra actually looks like whole, before it is cut',
        'that a food historian works from old written receipts and from the plants'
      ],
      sourceGap:
        'GAP CLOSED for this lesson. The educator on screen is Michael W. Twitty, a Black American culinary historian, filmed at Gunston Hall in Virginia for the Food of the Enslaved series. Found via "Michael Twitty youtube okra history African crops" and confirmed at noembed on 2026-08-14; the series is also carried by The Kid Should See This, which is how the age fit was checked. Noted honestly: the host channel, Townsends, is not Black-owned — Twitty is the guest and the teacher. Verified alternates, both left unused: lCIkucegV9c "Amirah Mitchell: Preserving History Through Seeds" (Temple University - Ambler Campus), a Black seed keeper working with African-diaspora crops, and sIM5Wqn1O5g "Chris Bolden-Newsome and Owen Taylor of Truelove Seeds" (Dan Brisebois | The Seed Farmer), which is pitched at adult farmers.'
    },

    checkIn: M7L5_CHECK_IN,
    beats: M7L5_BEATS,
    activity: M7L5_ACTIVITY,
    ledger: M7L5_LEDGER,

    hook: M7L5_CHECK_IN,
    core: M7L5_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing:
      'Build a crossing map. Glue black-eyed peas onto West Africa, rice grains onto Mali on the Niger River, and watermelon seeds onto Africa, then glue corn onto Mexico because corn travelled the other way. Draw a coloured line from each seed to Georgia and write the plant name at the Georgia end. Write THE PEOPLE CAME TOO across the ocean and say it out loud. Then push three dried black-eyed peas into a pot beside your garlic, water them, and write the date on the pot.',

    practice: [
      {
        ask: 'Name three plants in a Southern garden that came from Africa.',
        answer: 'Okra, sorghum and black-eyed peas. Watermelon too.',
        why: 'They crossed the Atlantic on slave ships with the people who knew them.'
      },
      {
        ask: 'Why does it matter that the farmers came, not just the seed?',
        answer: 'Because somebody has to know how to grow a crop.',
        why: 'West African farmers knew how to build and flood rice fields. That skill built the Carolina and Georgia rice fields.'
      }
    ],

    check: [
      {
        prompt: 'Okra, sorghum and black-eyed peas all came from where?',
        choices: ['Africa', 'Georgia', 'Europe', 'Mexico'],
        answer: 0,
        feedback: [
          null,
          'They grow in Georgia now. They did not start here.',
          'Okra reached Europe from Africa as well.',
          'Corn came from Mexico. These did not.'
        ]
      },
      {
        prompt: 'Which plant gives you black-eyed peas?',
        choices: ['Sorghum', 'Okra', 'The cowpea', 'Rice'],
        answer: 2,
        feedback: [
          'Sorghum is a tall grain, used for syrup.',
          'Okra grows as a green pod.',
          null,
          'Rice is the grain grown in flooded fields.'
        ]
      },
      {
        prompt: 'Somebody hands you rice seed and a wet field. What else do you need?',
        choices: [
          'Nothing, seed grows itself',
          'The knowledge of how to build and flood a rice field',
          'Drier ground',
          'A bigger bag of seed'
        ],
        answer: 1,
        feedback: [
          'A rice field has to be made. It does not happen on its own.',
          null,
          'Rice is grown in flooded fields on purpose.',
          'More seed with no skill is still no rice.'
        ]
      }
    ]
  },

  {
    id: 'hb-m7-06',
    course: 'herbalism',
    module: 7,
    quarter: 2,
    week: 6,
    day: 3,
    n: 42,
    title: 'Build a flower press',
    minutes: 45,
    spec: '§10 · beats',

    concept:
      'A pressed plant with a full label is a record that outlives everybody, and a pressed plant with no label is only a decoration.',

    standards: [],

    words: ['herbarium', 'specimen', 'press', 'label', 'collector'],

    glossary: [
      { word: 'herbarium', plain: 'A library of pressed, dried plants, each one glued to a sheet.' },
      { word: 'specimen', plain: 'One pressed plant with its label. The label is part of it.' },
      { word: 'press', plain: 'Two boards squeezed together. It flattens a plant while it dries.' },
      { word: 'label', plain: 'The card that says what, where, when and who.' },
      { word: 'collector', plain: 'The person who picked it. Their name goes on the label.' },
      { word: 'blotting paper', plain: 'Thick paper that soaks water out of the plant.' },
      { word: 'data', plain: 'Facts written down so somebody else can use them later.' }
    ],

    video: {
      id: '2wFN9YmkBOQ',
      url: 'https://www.youtube.com/watch?v=2wFN9YmkBOQ',
      title: 'RBGE Herbarium: Basic Plant Collecting and Pressing',
      channel: 'Royal Botanic Garden Edinburgh',
      minutes: 12,
      verified: '2026-08-15 · re-checked at youtube.com/oembed',
      teaches: [
        'how a plant is laid out in a press',
        'why one leaf is turned over to show its back',
        'the newspaper and cardboard layers, and swapping damp paper',
        'that the label goes on at the moment of collecting',
        'that this is how a real herbarium does it'
      ],
      sourceGap:
        'No Black American educator found for herbarium practice at this level. Searched: "youtube how to press flowers herbarium specimen botanical garden how plants are preserved video", "youtube herbarium why we press plants museum collection scientists 300 year old specimens", "youtube Kew Gardens OR Smithsonian herbarium pressed plant collection specimens", and "Black botanist youtube HBCU botany plant scientist educator video Black Botanists Week". The last one surfaced Dr Tanisha Williams, founder of Black Botanists Week, in written PBS and Botanical Society coverage — but no YouTube video of hers surfaced that could be verified, so nothing was used. That is the closest near-miss in the module and worth another hour by someone. Verified alternate, unused: AcXkIfuzJ6U "How To Press Plants To Make A Herbarium" (Babylonstoren). Open.'
    },

    checkIn: M7L6_CHECK_IN,
    beats: M7L6_BEATS,
    activity: M7L6_ACTIVITY,
    ledger: M7L6_LEDGER,

    hook: M7L6_CHECK_IN,
    core: M7L6_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing:
      'Build the press first: board, cardboard, newspaper, plant, newspaper, cardboard, board, then tighten the wing nuts evenly. Go out with Gigi and collect four to six plants she says yes to, taking a leaf, a flower and a bit of stem from each and never the last one of anything. Fill in the label the moment you pick it — what it is or UNKNOWN, where exactly, the date, and Collector: Azianna. Lay each one flat, turn one leaf over so the back shows, tighten again in two days, and open it in two weeks to glue each plant and its label onto card.',

    practice: [
      {
        ask: 'Why does pressing make a plant last?',
        answer: 'It squeezes the water out, so mould has nothing to grow on.',
        why: 'Same rule as drying herbs. No water, no rot.'
      },
      {
        ask: 'What four things must a label say?',
        answer: 'What it is, where exactly, when, and who collected it.',
        why: 'Without those four it is a pretty leaf, not a record.'
      }
    ],

    check: [
      {
        prompt: 'What is a herbarium?',
        choices: [
          'A garden of growing herbs',
          'A library of pressed, dried plants on sheets',
          'A jar of dried leaves',
          'A book about plants'
        ],
        answer: 1,
        feedback: [
          'The plants in a herbarium are picked and pressed.',
          null,
          'That is storage. A herbarium keeps whole pressed plants.',
          'A book has no plants in it. A herbarium does.'
        ]
      },
      {
        prompt: 'A pressed flower with no label is what?',
        choices: ['A specimen', 'Data', 'Just a pretty leaf', 'A record'],
        answer: 2,
        feedback: [
          'A specimen comes with its label.',
          'Data needs the where and the when.',
          null,
          'A record has to be dated. This one is not.'
        ]
      },
      {
        prompt: 'Your name goes on the label. What are you called there?',
        choices: ['The specimen', 'The collector', 'The press', 'The herbarium'],
        answer: 1,
        feedback: [
          'The specimen is the plant.',
          null,
          'The press is the two boards.',
          'A herbarium is the whole room of sheets.'
        ]
      }
    ]
  }
];

export const HERBALISM_M7_META = {
  courseId: 'herbalism',
  module: 7,
  title: 'Herbs in History',
  blurb:
    'Where plant knowledge came from and who carried it. Life before stores, the plant parts already in the kitchen, drying for winter, the granny midwives and root doctors of the South, the African plants growing in a Georgia garden, and how to press a plant so it lasts three hundred years.'
};

export function m7LessonById(id) {
  return HERBALISM_M7.find((l) => l.id === id) || null;
}

export default HERBALISM_M7;
