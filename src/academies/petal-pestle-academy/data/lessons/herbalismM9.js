// ---------------------------------------------------------------------------
// HERBALISM & BOTANY — MODULE 9 · WEATHER IN THE GARDEN
// QUARTER 3, WEEKS 1 AND 2. Lessons 49-54 of 96.
//
// The first module of Quarter 3, and the first written at the RAISED reading
// level in LESSON-SPEC-Q3Q4.md. Quarters 1 and 2 measured 1.3 on disk. These six
// are written for 2.5-3.5: longer sentences, subordinate clauses, and more of
// the load carried by vocabulary rather than by extra words.
//
//   hb-m9-01  W1 D1  What weather actually is          (no element)
//   hb-m9-02  W1 D2  Build the weather station         S4E4a
//   hb-m9-03  W1 D3  Reading your own instruments      S4E4a
//   hb-m9-04  W2 D1  Clouds from the back step         S4E4c
//   hb-m9-05  W2 D2  What clouds tell you is coming    S4E4c
//   hb-m9-06  W2 D3  Two weeks of data                 S4E4a
//
// ---- THE STANDARD, VERBATIM FROM src/data/standards/georgiaScience4.js ----
//
// S4E4. Obtain, evaluate, and communicate information to predict weather events
// and infer weather patterns using weather charts/maps and collected weather
// data.
//
//   a. Construct an explanation of how weather instruments (thermometer, rain
//      gauge, barometer, wind vane, and anemometer) are used in gathering
//      weather data and making forecasts.
//   c. Ask questions and use observations of cloud types (cirrus, stratus, and
//      cumulus) and data of weather conditions to predict weather events.
//
// Those two strings were read out of the project's own standards file, not from
// an external listing, and the codes are copied character by character. S4E4b
// (weather maps and fronts) and S4E4d (weather versus climate) are NOT touched
// here — curriculumPlan.js gives them their own vehicles later in Quarter 3, and
// a module that quietly ate them would leave two elements looking covered when
// nothing had taught them.
//
// ---- HOW THESE SIX DISCHARGE THE TWO ELEMENTS ----
//
// S4E4a is not "name the instruments". It says CONSTRUCT AN EXPLANATION of how
// they are used in gathering data AND making forecasts. So:
//
//   L50 builds the three the vehicle sentence promised — rain gauge,
//       thermometer, wind vane — out of a jar, a ruler and a straw.
//   L51 is the reading protocol: same time, same spot, eye level, shade, and
//       empty the gauge afterwards. It also brings in the barometer and the
//       anemometer BY NAME, because the standard lists five instruments and
//       because the barometer is the one that points forwards rather than
//       backwards. That is where "and making forecasts" actually lives.
//   L54 is the payload. Fourteen days of her own readings, plotted on a graph
//       she draws herself, and a pattern found in them and written down. A
//       standard about collected weather data is discharged by collecting
//       weather data, not by a worksheet about somebody else's.
//
// S4E4c names three cloud types and asks her to USE OBSERVATIONS to predict.
//
//   L52 is observation: cirrus, stratus and cumulus named from her own back
//       step, at the same time each day, with sky cover estimated in quarters.
//   L53 is prediction: what each kind usually comes before, a written forecast
//       for tomorrow, sealed, and then scored against what actually happened.
//
// The vehicle sentences in STANDARD_OWNERS promised "a gardener's weather
// station: rain gauge, thermometer, wind vane" and "cloud types from the back
// step, logged for two weeks". Both logs run the full fourteen days across both
// weeks of the module and land in L54. The promise is delivered, not gestured at.
//
// ---- JUDGEMENT CALLS, STATED SO NOBODY HAS TO GUESS ----
//
// 1. FAHRENHEIT AND INCHES, ALL THE WAY THROUGH. She is in Georgia. A rain
//    gauge marked in millimetres is a rain gauge she cannot compare with the
//    forecast on Gigi's phone, and the whole point of L54 is comparison.
//
// 2. THE SEASON IS REAL AND IT IS USED. Quarter 3 falls in late winter and
//    early spring in Georgia. Her garlic went in during the autumn and is
//    growing now; her ginger and turmeric are dormant rhizomes that a frost
//    would ruin; her corn cannot be planted until the soil warms. That is not
//    decoration — it is why a nine-year-old gardener would keep a weather log
//    at all, and L54's last task is a real planting decision made from her own
//    fourteen numbers.
//
// 3. THE WIND VANE MISCONCEPTION IS TAUGHT ON PURPOSE. A wind vane names the
//    direction the wind is coming FROM, not the direction it is going. Almost
//    every child gets this backwards first, exactly as they draw food-web
//    arrows backwards, so it gets its own Apply-It in L50 and its own bank
//    question in L51.
//
// 4. THE BAROMETER IS IN L51 EVEN THOUGH SHE IS NOT BUILDING ONE. S4E4a lists
//    it, and it is the only instrument on that list that tells you about
//    tomorrow instead of today. Cutting it would leave "making forecasts"
//    untaught. The lesson is honest that hers is a borrowed reading or a phone
//    reading, not one she built.
//
// 5. JUNE BACON-BERCEY IS NAMED IN L51 AND IN THE L54 LEDGER. No Black American
//    educator could be found presenting a fourth-grade weather video (see note
//    8), so rather than let the gap mean Azianna never meets one, a real one is
//    put into the teaching text by name. Every claim about her was checked
//    against her Wikipedia entry on 2026-08-14: born 1928, died 2019; first
//    African-American woman to earn a degree in meteorology (UCLA, 1954); first
//    woman and first African-American to receive the American Meteorological
//    Society's Seal of Approval for television weathercasting; forecaster at
//    what is now NOAA; chief meteorologist at WGR-TV in Buffalo; and she earned
//    a teaching credential at fifty-nine and taught school science into her
//    eighties. Nothing beyond that list is asserted anywhere in this module.
//
// 6. VIVIAN BROWN WAS CHECKED AND DELIBERATELY NOT USED. She is a real lead — a
//    television meteorologist at The Weather Channel from 1986 to 2015, and a
//    Jackson State University meteorology graduate. Her Wikipedia entry does not
//    state her race, and a lesson for a nine-year-old is not the place to assert
//    something an encyclopaedia will not. Her YouTube presence is Television
//    Academy interviews for adults, not a four-minute explainer. Recorded as a
//    lead in L49's sourceGap; not used, and not counted as closing the gap.
//
// 7. VIDEO DURATIONS ARE UNVERIFIED AND SAY SO. noembed does not return a
//    duration and youtube.com answered 429 to every direct fetch, exactly as it
//    did for Module 3. Every `minutes` field in this module is null rather than
//    a plausible-looking guess. Every ID, title and channel below IS verified
//    through noembed on 2026-08-14 and the titles are copied from the response.
//
// 8. NO BLACK AMERICAN EDUCATOR WAS FOUND FOR ANY OF THE SIX. Six searches were
//    run and all six are written into the sourceGap strings on these videos,
//    naming what was searched and what came back. The strongest thing found was
//    the historical record rather than a video, which is why note 5 exists.
//
// 9. SOURCE CONCENTRATION: two Smile and Learn and two SciShow Kids across six
//    lessons. That is the same weakness Module 3 recorded with Crash Course
//    Kids. It is written down here rather than smoothed over. The two SciShow
//    Kids episodes are back to back in L53 and L54, which is the worst of it;
//    they were kept because both were transcript-checked and both say exactly
//    what those two lessons need, and swapping one for an unverified alternative
//    would trade a real weakness for a worse one.
//
// 10. TWO CHECKER CHANGES ARE NEEDED BEFORE THIS BUILDS. Neither is a rewrite of
//     these files.
//
//     (a) scripts/check-assessment.mjs still carries the Quarter 1 caps in one
//         place — CAP_SENTENCE = 11, CAP_HARD = 0.06, CAP_CHOICE_WORDS = 12 at
//         lines 519-521. LESSON-SPEC-Q3Q4.md says those are now per-quarter
//         (Q3: 14 words a sentence, 15-word choices, 10% long words), but the
//         copy in this checkout has not been changed. This bank is written to
//         the Q3 caps, so it will fail the on-disk checker until the checker is
//         updated. Do not solve that by writing Q3 questions at Q1's level.
//
//     (b) The SUBJECT set in the same file needs Module 9's vocabulary, on the
//         same principle already applied to "endosperm" and "transpiration" —
//         every one of these is a word a lesson exists to teach and every one
//         carries a glossary card:
//           'thermometer', 'thermometers', 'barometer', 'anemometer',
//           'anemometers', 'meteorologist', 'meteorologists', 'meteorology',
//           'atmosphere', 'humidity', 'forecast', 'forecasts', 'instrument',
//           'instruments', 'cirrus', 'stratus', 'cumulus', 'cumulonimbus',
//           'altitude', 'pattern', 'patterns', 'average', 'degrees', 'gauge'
//         ('precipitation' and 'evaporation' are already on the list from
//         Module 5.)
//
// ---- READING LEVEL AND SAFETY ----
//
// Written to LESSON-SPEC-Q3Q4.md: roughly 2.5-3.5, about nine words a sentence,
// around six per cent long words.
//
// MEASURED ON DISK after writing, with the same analyser and the same field set
// applied to Modules 3 and 7 so the comparison is like for like:
//
//              words/sentence   long words   Flesch-Kincaid
//   Module 3         8.1           4.8%          2.29
//   Module 7         8.4           4.4%          2.45
//   Module 9         9.8           6.2%          3.83
//
// Note the calibration. This analyser reads Q1/Q2 about a point higher than the
// 1.3 the spec quotes for the same modules, so Module 9's 3.83 here corresponds
// to roughly 2.8 on the spec's own scale — inside the 2.5-3.5 band it asks for.
// Words a sentence and long-word rate are absolute and need no calibration:
// 9.8 against a target of about 9, and 6.2% against a target of about 6%.
//
// The lift is in the thinking, not in padding —
// these lessons use because, so, unless, while and even though, and the
// Apply-Its ask her to compare and predict rather than to identify. Read-aloud
// is still on every screen.
//
// NO DOSING. Nothing in this module goes anywhere near what a plant does to a
// body; it is air, water, instruments and numbers. The safety strings cover what
// this module actually risks: lightning, cold, a sharp pin, a glass jar and a
// child looking up at the sky instead of where she is walking. Nobody looks at
// the sun, and nothing is tasted without a grown-up.
//
// ---- WIRING THIS UP (not done here, and it is not optional) ----
//
// src/config/assessment.js WEEKS.herbalism needs two new entries or the weekly
// tests for these six lessons cannot be built:
//
//   { id: 'herbalism-q3-w1', course: 'herbalism', quarter: 3, n: 1, module: 9,
//     title: 'The gardener\'s weather station',
//     lessons: ['hb-m9-01', 'hb-m9-02', 'hb-m9-03'], planned: 3,
//     blurb: 'What weather is made of, three instruments she builds herself, and how to read them honestly.' },
//   { id: 'herbalism-q3-w2', course: 'herbalism', quarter: 3, n: 2, module: 9,
//     title: 'Clouds, forecasts and fourteen days of data',
//     lessons: ['hb-m9-04', 'hb-m9-05', 'hb-m9-06'], planned: 3,
//     blurb: 'Name the clouds from the back step, forecast tomorrow, then graph two weeks and find the pattern.' }
//
// HERBALISM_MODULES in src/data/lessons/herbalismCourse.js needs Module 9 added
// with quarter: 3, or the quarter-test cumulative check has nothing to span.
// ---------------------------------------------------------------------------

// ===========================================================================
// LESSON 49 · hb-m9-01 · WHAT WEATHER ACTUALLY IS · no element
// ===========================================================================

/** STEP 1 · THE CHECK-IN · 5 minutes. */
const M9L1_CHECK_IN = {
  title: 'Two mornings, one back step',
  text: 'Yesterday the air on the back step was still and soft. You went out in a T-shirt. This morning the same step is cold enough to sting. The wind is shoving your corn bucket about. Nothing in the garden moved overnight.',
  question: 'The garden is where you left it, so what changed?'
};

/**
 * STEP 2 · THE SYSTEM CONCEPT · 12 minutes, as TWO BEATS.
 *
 * Written to the Learn Bright video, in its order: weather comes in pairs (hot
 * and cold, wet and dry, clear and cloudy, calm and stormy); it happens in the
 * atmosphere; and it is measured as temperature, humidity, air pressure and
 * wind by a person called a meteorologist.
 *
 * Beat 1 puts the weather in the air rather than in the garden, because a child
 * who thinks weather is something the ground does has nowhere to put wind.
 * Beat 2 breaks it into parts, which is the whole reason the next two lessons
 * can build one instrument per part.
 */
const M9L1_BEATS = [
  {
    n: 1,
    label: 'Weather happens in the air above the garden',
    hook: 'You live at the bottom of an ocean of air. Every bit of weather you have ever had happened inside it.',
    teachingText:
      'The atmosphere is the deep blanket of air around the Earth. Weather is whatever that air is doing over one place. It keeps changing, because the air is never still.',
    example:
      'The cold that reached your garlic was somewhere else last night. It travelled here, and it brought its temperature along. Your garden never moved at all.',
    applyIt: {
      prompt: 'Your four buckets have not moved. Today is freezing and windy. What actually changed?',
      choices: [
        'The air now sitting over your garden',
        'The soil inside the buckets',
        'The roots of the garlic',
        'The place your garden is in'
      ],
      answer: 0,
      feedback: [
        null,
        'The soil felt the change, but it did not cause it. The air arrived first.',
        'Roots respond to cold. They cannot make it.',
        'Nothing moved. Your garden is on the same step as yesterday.'
      ],
      why: 'Weather is the air doing something above one place. So a new day usually means new air arrived.'
    }
  },
  {
    n: 2,
    label: 'Weather is several things at once, and each one can be measured',
    hook: 'A weather report is never just one number. Weather has never once been just one thing.',
    teachingText:
      'Weather is made of temperature, wind, the water in the air, and air pressure. Each part has its own instrument. A meteorologist measures all of them, then works out what happens next.',
    example:
      'Two Georgia afternoons can both read seventy degrees. One is still, and your pots stay damp. The other is windy, and they are bone dry by supper. Temperature alone never told you that.',
    applyIt: {
      prompt: 'Two days both read seventy degrees. One dried your containers right out. What was different?',
      choices: [
        'How hard the wind was blowing',
        'How hot the air was',
        'How big the containers are',
        'What day of the week it was'
      ],
      answer: 0,
      feedback: [
        null,
        'Both days read seventy degrees. That is the one thing you already know matched.',
        'They are the same containers on both days.',
        'The day of the week is not part of the weather at all.'
      ],
      why: 'Wind carries damp air away and dry air in. So it empties a pot that heat alone would not.'
    }
  }
];

/** STEP 3 · THE ACTIVITY · 20 minutes. Away from the screen. */
const M9L1_ACTIVITY = {
  title: 'The five-question weather report, with no instruments at all',
  prep: 'Rule a sheet with five rows: TEMPERATURE, WIND, WATER, SKY, FEELING. Rule three columns across, for three trips outside. Then mark one spot on the back step. You will stand there for the next two weeks.',
  needs: [
    'a clipboard and a pencil that works in the cold',
    'a length of ribbon or a strip of a plastic bag',
    'a coat',
    'your marked spot on the back step',
    'your garlic, turmeric, ginger and corn containers',
    'a watch or a phone, for the time'
  ],
  steps: [
    'Stand on your marked spot. Face the same way every time.',
    'Question one. Is the air warm, mild, cool or cold on your hands?',
    'Now guess the temperature in degrees. Write the number down, even though it is a guess.',
    'Question two. Hold the ribbon up and watch which way it streams.',
    'The wind comes FROM the side the ribbon leaves behind. Write that direction.',
    'Question three. Breathe out hard. Seeing your breath means cold air holding water.',
    'Question four. Look up. Is the sky covered none, a quarter, half, or all?',
    'Question five. Does it feel like something is coming? Say why you think so.',
    'Go out twice more, a few hours apart. Fill the other two columns.',
    'Now ask a grown-up for the real temperature from a phone or a thermometer.',
    'Write the real number beside each guess. Work out how far off you were.'
  ],
  safety:
    'Come straight in if you hear thunder. Lightning can strike a long way from its own rain. Wear a coat. Never stare at the sun, not even for a second, while you judge the sky. Wash your hands when you come in. Never taste anything growing in the garden without a grown-up.',
  grownUpAsks: [
    'Before you go out. What is weather? Say it in your own words.',
    'You guessed three times. Which guess was closest, and why?',
    'You were off by several degrees. Does that make your hands useless, or just rough?',
    'The ribbon streamed that way. So which direction is the wind coming from?',
    'Why would somebody measuring weather want a number instead of a feeling?',
    'Which of your five questions was hardest to answer honestly?',
    'Your garlic is out in this and your ginger is not. Why did we choose that?',
    'The sky changed between trip one and trip three. What else changed with it?',
    'If you knew the temperature and nothing else, what could you still get wrong?',
    'A meteorologist measures all five. What would she have that you did not?',
    'What is the first instrument you would want, if you could only have one?'
  ]
};

/** STEP 4 · THE LEDGER ENTRY · 8 minutes. She writes it. Nothing is corrected. */
const M9L1_LEDGER = {
  sheet: 'M9L1-five-question-report-PRINTABLE.pdf',
  tasks: [
    'Copy your three columns onto the sheet. Put the time of each trip at the top.',
    'Write your three temperature guesses beside the three real numbers.',
    'Circle the row you found hardest to answer without an instrument.',
    'Finish this sentence. The part of weather I most want to measure is ____, because ____.'
  ],
  game: {
    title: 'Word Boss',
    cards: ['WEATHER', 'ATMOSPHERE', 'TEMPERATURE', 'HUMIDITY', 'METEOROLOGIST'],
    rounds: [
      'Say what each word means in your own words, with no fancy talk.',
      'A grown-up says the meaning and she says the word, against the clock.',
      'Stump Gigi. She writes one question she already knows the answer to.'
    ],
    ifSheIsStuck:
      'Point at the five rows on her sheet instead of saying the answer. Four of the five words are sitting on it already.'
  },
  note: 'Nothing here is graded. Nothing is corrected. Petals are for doing it.'
};

// ===========================================================================
// LESSON 50 · hb-m9-02 · BUILD THE WEATHER STATION · S4E4a
// ===========================================================================

const M9L2_CHECK_IN = {
  title: 'Cold is not a number',
  text: 'Yesterday you told Gigi it was cold, and she agreed. Then you both guessed the temperature. Your two guesses were nine degrees apart. You were on the same step, in the same air, at the same moment.',
  question: 'You both felt the same weather. So why were your answers so far apart?'
};

/**
 * Written to Smile and Learn's rain gauge episode, which is the one instrument
 * of the three where the BUILD decides whether the number is true. A jar with
 * sloping sides gives a depth that means nothing, and a gauge under the eaves
 * measures the roof rather than the sky.
 *
 * Beat 2 is the three instruments as three different questions, because that is
 * what stops a weather station being a craft project. One instrument, one
 * question, one number.
 *
 * The wind vane misconception (it names where the wind is FROM) is deliberately
 * put in the Apply-It rather than in the teaching text, so she meets it as a
 * problem to solve while the teaching is still warm.
 */
const M9L2_BEATS = [
  {
    n: 1,
    label: 'An instrument turns a feeling into a number',
    hook: 'Two people can argue about whether it is cold. Nobody argues with a thermometer.',
    teachingText:
      'An instrument measures one thing and gives you a number. That number means the same to everybody. A feeling only means something to the person having it. So a weather station is built out of instruments, not opinions.',
    example:
      'Your rain gauge is a straight-sided jar with a ruler taped on. Even so, it says half an inch fell last night. No amount of standing outside could have told you that.',
    applyIt: {
      prompt: 'Gigi asks whether last night gave the garlic enough rain. Which answer can she use?',
      choices: [
        'The gauge caught three quarters of an inch',
        'It rained really hard for a while',
        'The step looked properly wet this morning',
        'It felt like a lot of rain to me'
      ],
      answer: 0,
      feedback: [
        null,
        'Hard and long are feelings. Neither is a depth she can compare.',
        'A wet step tells you it rained. It cannot say how much.',
        'It felt like a lot to you. It may not have to her.'
      ],
      why: 'A number can sit beside another number. Comparing is the whole reason for keeping a log.'
    }
  },
  {
    n: 2,
    label: 'Three instruments, three completely different questions',
    hook: 'A wind vane and an anemometer both sit in the wind. They are not answering the same question.',
    teachingText:
      'Your thermometer answers how hot the air is, in degrees. Your rain gauge answers how much rain fell, in inches. Your wind vane answers where the wind comes from. It gives no number at all.',
    example:
      'One morning your station reads forty-one degrees. The gauge holds a quarter inch. The vane says north. Three instruments, three answers, and none could replace another.',
    applyIt: {
      prompt: 'Your wind vane is pointing hard at the north side of the garden. What does that tell you?',
      choices: [
        'The wind is coming from the north',
        'The wind is blowing away towards the north',
        'The wind is blowing at a northerly speed',
        'North is where the most rain fell'
      ],
      answer: 0,
      feedback: [
        null,
        'That is the mistake almost everybody makes first. A vane points into the wind.',
        'A vane gives no speed at all. That is an anemometer\'s job.',
        'A vane knows nothing about rain. Your gauge does.'
      ],
      why: 'A wind vane names where the wind comes FROM. That is why forecasters say "a north wind".'
    }
  }
];

const M9L2_ACTIVITY = {
  title: 'Build the three instruments and set them up properly',
  prep: 'A grown-up cuts the top off the plastic bottle. A grown-up also does the sharp work with the pin. Find true north with a compass or a phone first, because a wind vane is useless without it.',
  needs: [
    'a straight-sided plastic bottle or jar, with the top cut off',
    'a ruler and waterproof tape',
    'a cheap outdoor thermometer',
    'a pencil with an eraser on the end, a plastic straw, a dressmaking pin',
    'stiff card for the arrow and the tail, and scissors',
    'a lump of modelling clay and a compass',
    'a permanent marker and four small stones'
  ],
  steps: [
    'Tape the ruler down the outside of the bottle. Put the zero at the inside bottom.',
    'Stand the gauge on open ground, well away from the house. A wall or an eave would steal the rain.',
    'Weigh it down with the stones, so a gust cannot tip the whole night over.',
    'Hang the thermometer in the shade on the north side. Sun on it measures the sun.',
    'Keep it about chest height. Keep it away from brick, which holds heat long after dark.',
    'Now the vane. Cut a small arrow head and a bigger tail fin from the card.',
    'Slot them into the two ends of the straw. The tail must be clearly larger.',
    'Push the pin through the middle of the straw and into the eraser. Leave it loose enough to spin.',
    'Stand the pencil upright in the clay. Use the compass to mark N, S, E and W.',
    'Put it somewhere open. Give it a spin and check that it turns freely.',
    'Write today\'s date on all three instruments. A log needs a day one.',
    'Take one reading from each. Say all three out loud, in order, before you go in.'
  ],
  safety:
    'A grown-up does the cutting and handles the pin. The pin end stays covered when the vane is indoors. Use plastic rather than glass. A jar that shatters in the cold leaves splinters in your soil. Come in at once if you hear thunder. Wash your hands afterwards.',
  grownUpAsks: [
    'Why do we want the gauge out in the open, not tucked against the house?',
    'What would happen to your rain reading under the edge of the roof?',
    'Explain to me why the thermometer goes in the shade.',
    'Why is the tail bigger than the arrow head? What if they matched?',
    'You have three instruments. Say what question each one answers, without looking.',
    'Which of the three will be hardest to read honestly, and why?',
    'The vane points north. Where is the wind coming from, and how do you know?',
    'S4E4a lists five instruments. Which two are missing, and what do they measure?',
    'Your ginger is dormant in its pot. Which instrument matters most to it?',
    'What could go wrong overnight and make tomorrow\'s reading a lie?',
    'Where would you move the station, if you could put it anywhere?'
  ]
};

const M9L2_LEDGER = {
  sheet: 'M9L2-weather-station-build-PRINTABLE.pdf',
  tasks: [
    'Draw all three instruments. Label what each one measures, and in what units.',
    'Write down where each one went. Add one sentence on why that spot.',
    'Write today\'s date as Day 1 at the top of the fourteen-day log table.',
    'Fill in Day 1: temperature, rain, and wind direction.'
  ],
  game: {
    title: 'One Instrument, One Question',
    cards: [
      'HOW MUCH RAIN FELL',
      'HOW HOT THE AIR IS',
      'WHICH WAY THE WIND COMES FROM',
      'HOW FAST THE WIND IS BLOWING',
      'WHETHER THE AIR PRESSURE IS DROPPING'
    ],
    rounds: [
      'Hold up a card. She names the instrument and says whether she has built one.',
      'Turn it round. You name an instrument and she gives you the question it answers.',
      'She writes one card of her own about something a gardener would want to know.'
    ],
    ifSheIsStuck:
      'Ask what units the answer comes in. Inches sends her to the gauge. Degrees sends her to the thermometer. A direction with no number sends her to the vane.'
  },
  note: 'Nothing here is graded. The station stays up for fourteen days, and Day 1 has just happened.'
};

// ===========================================================================
// LESSON 51 · hb-m9-03 · READING YOUR OWN INSTRUMENTS · S4E4a
// ===========================================================================

const M9L3_CHECK_IN = {
  title: 'The woman who read the instruments',
  text: 'In 1954 June Bacon-Bercey earned a degree in meteorology. She was the first African-American woman ever to do it. She was also the first woman, and the first African-American, to earn the television weather seal. She forecast for the weather service. She was chief meteorologist at a station in Buffalo. Then at fifty-nine she got a teaching credential, and she taught school science into her eighties.',
  question: 'She read instruments for a whole career. What did she do when the numbers surprised her?'
};

/**
 * Written to Smile and Learn's thermometer and barometer episode. The episode
 * pairs the two on purpose and so does this lesson, because they are the clean
 * example of the difference S4E4a is really about: gathering data (what has
 * happened) versus making forecasts (what is coming).
 *
 * Beat 1 is the reading protocol and it is the unglamorous half of the standard.
 * A fourteen-day log taken at random times, at random eye heights, with a gauge
 * nobody emptied, is not data — it is fourteen unrelated numbers.
 *
 * Beat 2 brings in the barometer and the anemometer by name so that all five
 * instruments the element lists have been met. She has not built a barometer and
 * the lesson says so.
 */
const M9L3_BEATS = [
  {
    n: 1,
    label: 'Read it the same way every time, or you are measuring yourself',
    hook: 'Two readings four hours apart can differ by fifteen degrees. Neither one of them is wrong.',
    teachingText:
      'A reading only means something beside another reading taken the same way. So you go at the same time each day. You put your eye level with the line. You empty the rain gauge every single time. Skip the emptying, and tomorrow\'s number quietly becomes two days of rain.',
    example:
      'Eight in the morning gives you the cold end of the day. Three in the afternoon gives you the warm end. Either one works as a habit. Mixing them gives you a graph that jumps for no reason.',
    applyIt: {
      prompt: 'Your log says Monday 44, Tuesday 61, Wednesday 43. Only Tuesday was read after lunch. What does the jump show?',
      choices: [
        'When you read it, not how warm the week was',
        'That Tuesday was a genuinely hot day',
        'That the thermometer is broken',
        'That the wind changed direction on Tuesday'
      ],
      answer: 0,
      feedback: [
        null,
        'Maybe it was warmer. You cannot tell, because you changed two things at once.',
        'A thermometer that reads fine on Monday and Wednesday is not broken.',
        'Wind would not lift a reading seventeen degrees in a day.'
      ],
      why: 'Change the time and you have changed the test. The number no longer compares with the others.'
    }
  },
  {
    n: 2,
    label: 'Four instruments look backwards. One looks forwards.',
    hook: 'Sailors watched the barometer more closely than the sky. The sky tells you about now. The barometer hints at tomorrow.',
    teachingText:
      'Your thermometer, rain gauge and wind vane all report what has already happened. A barometer measures the weight of the air pressing down. When that pressure falls steadily, unsettled weather is usually on the way. An anemometer counts how fast the wind blows, and wind speed is what dries a container out.',
    example:
      'You have no barometer, so you borrow the pressure from Gigi\'s phone. It drops all afternoon while your cumulus clouds pile higher. Now you have two pieces of evidence pointing the same way.',
    applyIt: {
      prompt: 'The pressure has fallen all day. Your gauge is dry and the thermometer has barely moved. What can you sensibly say?',
      choices: [
        'Something may be coming, even though nothing has happened yet',
        'Nothing is coming, because nothing has happened yet',
        'It has already rained and you missed it',
        'The thermometer must be wrong'
      ],
      answer: 0,
      feedback: [
        null,
        'The other three instruments only report the past. Falling pressure is the one hint about the future.',
        'An empty gauge is good evidence that no rain fell.',
        'A steady temperature is not evidence of a broken thermometer.'
      ],
      why: 'Falling pressure is a forecasting clue. It can point at tomorrow while every other instrument says today was quiet.'
    }
  }
];

const M9L3_ACTIVITY = {
  title: 'The reading routine, tested against a careless one',
  prep: 'Rule the fourteen-day log table. It needs columns for DATE, TIME, TEMPERATURE, RAIN, WIND FROM and NOTES. Agree one reading time with Gigi. Write that time at the top of the sheet in pen.',
  needs: [
    'your three instruments from yesterday',
    'the fourteen-day log sheet and a pencil',
    'a small jug for emptying the rain gauge',
    'a step or a box to stand on, so your eye reaches the line',
    'a phone or a clock',
    'a second scrap sheet, marked CARELESS'
  ],
  steps: [
    'Go out at your agreed time. Do it carelessly on purpose, first.',
    'Glance down at the thermometer from above. Guess between the lines. Write it on the CARELESS sheet.',
    'Look at the rain gauge from standing height. Write down what you think it says.',
    'Now do the whole thing again, properly. These numbers go on the real log.',
    'Crouch until your eye is level with the water. Looking down makes water read low.',
    'Read the thermometer straight on. Take the line it reaches, not the nearest round number.',
    'Watch the vane for a slow count of twenty. One gust is not the wind.',
    'Tip the gauge out into the jug. Stand it back exactly where it was.',
    'Compare your two sets of numbers. Write down how far apart they are.',
    'Fill in the NOTES column with one sentence about the sky.',
    'Say tomorrow\'s reading time out loud, so you both remember it.'
  ],
  safety:
    'Stand on something steady. Have a grown-up nearby if you need height to reach the thermometer. Empty the gauge away from your containers, so you are not adding your own rain to the soil. Come in if you hear thunder. Wash your hands after handling anything wet.',
  grownUpAsks: [
    'Your careless numbers and your careful ones differ. Which set would you defend?',
    'Why does looking down at water in a jar make you read it low?',
    'What happens to Thursday\'s number if we forget to empty the gauge?',
    'We agreed one time each day. What if we drifted by four hours?',
    'You counted to twenty at the vane. Why not write the first direction you saw?',
    'Which of the five instruments tells you about tomorrow instead of today?',
    'The pressure is falling and nothing has happened. What goes in NOTES?',
    'June Bacon-Bercey read instruments for a living. What was she most careful about?',
    'Could somebody else get your number tomorrow? What would help them?',
    'Which reading will you be tempted to fudge on a cold morning?',
    'What is the honest thing to write on a day you forgot to look?'
  ]
};

const M9L3_LEDGER = {
  sheet: 'M9L3-reading-routine-PRINTABLE.pdf',
  tasks: [
    'Write your reading time at the top of the log, in pen. Put the three rules underneath.',
    'Fill in today\'s row properly. Put the careless numbers in the margin beside it.',
    'Write one sentence on the biggest gap between the careless reading and the careful one.',
    'List the five instruments in the standard. Tick the ones you own.'
  ],
  game: {
    title: 'Backwards or Forwards',
    cards: ['THERMOMETER', 'RAIN GAUGE', 'WIND VANE', 'BAROMETER', 'ANEMOMETER'],
    rounds: [
      'Hold up a card. She says BACKWARDS or FORWARDS, and then says what it measures.',
      'You describe a reading and she names the instrument it came from.',
      'She explains to you, out loud, why the barometer sits on its own.'
    ],
    ifSheIsStuck:
      'Ask one question about each card. Does this tell me what already happened, or what has not happened yet? Four of the five answer the same way, and the odd one out is the point.'
  },
  note: 'Nothing here is graded. A day she honestly missed is written as missed, because a gap in a log is data too.'
};

// ===========================================================================
// LESSON 52 · hb-m9-04 · CLOUDS FROM THE BACK STEP · S4E4c
// ===========================================================================

const M9L4_CHECK_IN = {
  title: 'The only instrument you were born with',
  text: 'Your station cost a few dollars and a cut-up bottle. The clouds cost nothing at all. People were reading them for thousands of years, long before anybody built a thermometer.',
  question: 'If clouds are free and always there, why bother with instruments too?'
};

/**
 * Written to Homeschool Pop's "Clouds for Kids", which names exactly the three
 * types Georgia's S4E4c names and no more. That match is why it was chosen over
 * the ten-cloud videos: a standard that asks for cirrus, stratus and cumulus is
 * not helped by a child trying to hold nimbostratus and altocumulus as well.
 *
 * Beat 1 is HEIGHT FIRST because height is the reliable sort. Shape is what she
 * will notice, but a low puffy cloud and a high wispy one are different animals
 * even when the light makes them look alike.
 *
 * Beat 2 is sky cover, which is what turns cloud-watching into data. "Cumulus"
 * is an observation; "cumulus over about a quarter of the sky at 8am" is a row
 * in a log that L54 can graph.
 */
const M9L4_BEATS = [
  {
    n: 1,
    label: 'Sort by height first, then by shape',
    hook: 'Cirrus clouds are so high and so cold that they hold no water at all. They are made of ice.',
    teachingText:
      'Cirrus clouds are the highest. They look thin and wispy, like hair pulled across the sky. Cumulus clouds sit lower, like piles of cotton wool with flat bottoms. Stratus is lowest of all. It is the flat grey sheet that takes the colour out of a day.',
    example:
      'Stand on your step and look straight up. Separate puffs with blue between them are cumulus. One dull lid with no edges anywhere is stratus.',
    applyIt: {
      prompt: 'You see thin white streaks very high up. They are faint enough that blue shows through. Which kind?',
      choices: ['Cirrus', 'Cumulus', 'Stratus', 'Fog'],
      answer: 0,
      feedback: [
        null,
        'Cumulus is lower and lumpy. No blue shows through the middle of a puff.',
        'Stratus is a low grey sheet. Nothing shows through it.',
        'Fog is cloud sitting on the ground, not streaks miles above you.'
      ],
      why: 'High, thin and wispy is cirrus every time. The ice crystals are why it looks brushed on.'
    }
  },
  {
    n: 2,
    label: 'Naming it is an observation. Measuring it makes it data.',
    hook: 'Weather watchers do not say "cloudy". They say how much of the sky is covered, in quarters.',
    teachingText:
      'An observation is something you actually saw and can describe. A guess is something you decided. So you name the cloud first. Then you say how much sky it covers: none, a quarter, a half, three quarters or all. Those two facts together can be compared with tomorrow.',
    example:
      'Monday you write "cumulus, a quarter". Tuesday you write "stratus, all of it". Two weeks of rows like that show you something. One afternoon of staring upwards never could.',
    applyIt: {
      prompt: 'Which of these belongs in your cloud log as an observation, not a guess?',
      choices: [
        'Stratus, covering the whole sky at 8am',
        'It is going to be a horrible day',
        'The sky looks like rain to me',
        'Cloudy, I suppose'
      ],
      answer: 0,
      feedback: [
        null,
        'That is how you feel about the day. It is not something you saw.',
        'That is a prediction. It belongs in a forecast, not an observation.',
        '"I suppose" means you never decided, so nothing can be compared later.'
      ],
      why: 'An observation names what you saw and how much there was. That is the only kind of row a graph can use.'
    }
  }
];

const M9L4_ACTIVITY = {
  title: 'Cloud watch from the back step',
  prep: 'Add two columns to your fourteen-day log: CLOUD TYPE and SKY COVER. Make a small cloud key on card. Draw three pictures on it: a wispy streak, a flat-bottomed puff, and a flat grey lid. Keep the key on the clipboard.',
  needs: [
    'your log sheet with the two new columns',
    'the three-picture cloud key on card',
    'coloured pencils',
    'your marked spot on the back step',
    'a phone or camera, if you have one',
    'a jumper, because you will be standing still'
  ],
  steps: [
    'Stand on your marked spot, facing the same way as always.',
    'Look up for a slow count of thirty before you write anything.',
    'Hold the key up beside the sky. Match what you see to one of the three pictures.',
    'Write the name in the CLOUD TYPE column. If two kinds are up there, write both.',
    'Now cut the sky into quarters in your head. Decide how many quarters are covered.',
    'Write that in SKY COVER. Be honest, because half is not the same as all.',
    'Draw the clouds in the margin, small and quick, in twenty seconds.',
    'Take a photograph if you can, so you can check your naming later.',
    'Look at the cloud bottoms. Are they flat, ragged, or impossible to find?',
    'Watch for a moment. Say out loud which way they are drifting.',
    'Fill in the rest of the row: temperature, rain, wind direction.',
    'Do the whole thing again tomorrow, and every day, until the fortnight ends.'
  ],
  safety:
    'Never look at the sun, not even briefly, and not through a phone. It can damage your eyes before you feel anything. Look up standing still rather than walking, so you do not trip over the containers. Come in at once if you hear thunder. Put a coat on before you stand about.',
  grownUpAsks: [
    'Which of the three kinds is up there now? What made you decide?',
    'Could it be more than one kind at once? Look again at different heights.',
    'You said a quarter covered. Show me with your hands how much that is.',
    'Cirrus is made of ice, even in summer. Why do you think that is?',
    'Which way are they drifting? Does that match your wind vane?',
    'Your neighbour would say "cloudy". What are you writing, and why is it better?',
    'What would make today\'s row hard for somebody else to trust?',
    'Which cloud will you see most often in a Georgia February?',
    'Does the sky over your ginger pot differ from the sky over the corn?',
    'If you wrote the name but never the cover, what would you lose?'
  ]
};

const M9L4_LEDGER = {
  sheet: 'M9L4-cloud-log-PRINTABLE.pdf',
  tasks: [
    'Draw the three cloud types down the side of the sheet, highest at the top.',
    'Write one plain sentence beside each drawing. Say how you tell it apart.',
    'Fill in today\'s CLOUD TYPE and SKY COVER on the fourteen-day log.',
    'Write Gigi one question about clouds. You must know the answer.'
  ],
  game: {
    title: 'Name That Sky',
    cards: [
      'THIN WHITE STREAKS, VERY HIGH',
      'FLAT GREY LID OVER EVERYTHING',
      'WHITE PUFFS WITH FLAT BOTTOMS',
      'PUFFS PILING UP TALL AND DARK',
      'NO CLOUD AT ALL'
    ],
    rounds: [
      'Read a card. She names the cloud and says roughly how high it is.',
      'You name a cloud and she describes it back to you without using its name.',
      'She goes to the window, describes the real sky, and you have to name it.'
    ],
    ifSheIsStuck:
      'Ask height before shape. High and thin is cirrus. Low and lumpy is cumulus. Low and flat is stratus. That one question sorts almost every sky she will ever see.'
  },
  note: 'Nothing here is graded. Keep the photographs, because a naming she got wrong is worth another look in June.'
};

// ===========================================================================
// LESSON 53 · hb-m9-05 · WHAT CLOUDS TELL YOU IS COMING · S4E4c
// ===========================================================================

const M9L5_CHECK_IN = {
  title: 'Evidence, not a promise',
  text: 'Your log has cumulus on Monday and stratus on Tuesday. On Wednesday morning the cumulus came back. By lunchtime they had grown into towers with dark flat bottoms. By three o\'clock the rain was coming down sideways.',
  question: 'The clouds changed hours before the rain did. What were they telling you?'
};

/**
 * Written to SciShow Kids' "How Do We Know When It Will Rain?", and written to
 * what the transcript actually says rather than to what the title suggests. The
 * episode's real content is: meteorologists use radar and satellites, they watch
 * cloud types and movement, they watch what happens when warm air meets cold
 * air, and — its own words — "meteorologists look at weather patterns all the
 * time and use the patterns they find as clues", where "a pattern is something
 * that happens the same way over and over again". It ends by saying predictions
 * are not always perfect.
 *
 * So Beat 2 is honesty about forecasts, not a list of cloud omens. A child who
 * learns that a wrong forecast means the forecaster was stupid has learned the
 * opposite of science, and this is the lesson that hands her a prediction she
 * will personally get wrong two or three times in a fortnight.
 */
const M9L5_BEATS = [
  {
    n: 1,
    label: 'What each kind usually comes before',
    hook: 'Cirrus often arrives a full day ahead of the weather it announces. It is the earliest warning your own eyes can give you.',
    teachingText:
      'Cirrus streaking in high above usually means a change is on its way, though not today. Stratus that thickens and drops lower brings slow grey drizzle that lasts. Small scattered cumulus means fair weather. The same cumulus piling into tall dark towers means a storm is building.',
    example:
      'Wednesday started with harmless cumulus over the corn bucket. They grew taller all morning, until their bottoms went dark and flat. The growing is the part that mattered, not the puffs at breakfast.',
    applyIt: {
      prompt: 'The sky was clear this morning. Now high thin streaks are spreading in from the west. What do you forecast?',
      choices: [
        'A change is probably coming, but likely not today',
        'It will rain within the hour',
        'The weather will stay exactly the same all week',
        'Nothing at all, because it is still sunny'
      ],
      answer: 0,
      feedback: [
        null,
        'Cirrus is miles up and made of ice. It is not the cloud that rains on you.',
        'Cirrus spreading in is a sign of change. Predicting none ignores your own evidence.',
        'It is sunny AND something is arriving. Both are worth writing down.'
      ],
      why: 'Cirrus is the early warning. It belongs in a forecast for tomorrow, not one for this afternoon.'
    }
  },
  {
    n: 2,
    label: 'A forecast is a guess with evidence behind it, and it can still be wrong',
    hook: 'Meteorologists have radar and satellites, and they still get tomorrow wrong. Weather can change at the last minute.',
    teachingText:
      'A forecast puts several clues together. The clouds, the wind direction, the temperature, and what happened on days like this before. A pattern is something that happens the same way over and over. Patterns are what forecasters are really hunting for. Even so, a forecast is a good guess and never a promise.',
    example:
      'A meteorologist watches rain cross a radar screen and says it will reach you soon. You watch cumulus grow taller over your garlic and say the same. You are both reading evidence, and both sometimes wrong.',
    applyIt: {
      prompt: 'You forecast rain from tall dark cumulus and wrote it down. It never rained. What now?',
      choices: [
        'Keep the forecast and write down what really happened beside it',
        'Rub out the forecast so the log looks right',
        'Decide that clouds are useless for forecasting',
        'Change the forecast to say sunny'
      ],
      answer: 0,
      feedback: [
        null,
        'A record you tidied up afterwards is not a record of anything.',
        'One miss does not undo the times the same clouds did bring rain.',
        'Rewriting a prediction after the fact means you never made one.'
      ],
      why: 'Keeping the wrong forecasts shows you which clues are reliable. That is the only way the next one gets better.'
    }
  }
];

const M9L5_ACTIVITY = {
  title: 'Seal a forecast, then score it tomorrow',
  prep: 'Fold six small slips of paper and find an envelope. Rule a scoring strip with three columns: WHAT I SAID, WHAT HAPPENED, RIGHT OR WRONG. Keep the last few days of the log to hand, because yesterday is evidence.',
  needs: [
    'six paper slips and an envelope',
    'your fourteen-day log so far',
    'the scoring strip',
    'your three instruments',
    'a pen, not a pencil, for the forecast',
    'a grown-up to hold the envelope'
  ],
  steps: [
    'Take today\'s full reading first. A forecast with no evidence is only a wish.',
    'Look at four things together. Cloud type, sky cover, wind direction, and whether the temperature is rising.',
    'Look back at the last three days in your log. Say out loud whether anything is repeating.',
    'Now write tomorrow\'s forecast on a slip, in pen, in one sentence.',
    'Underneath it write WHY. Name at least two of the clues you used.',
    'Add how sure you are: fairly sure, or a coin toss.',
    'Fold the slip. Put it in the envelope and hand it to a grown-up.',
    'Tomorrow, take the reading BEFORE the envelope is opened. That order matters.',
    'Open it. Read the forecast aloud, then fill in the scoring strip honestly.',
    'If you were wrong, name the clue that misled you. Do not just write "wrong".',
    'Do it again every day. By the end of the fortnight you will have six scored forecasts.',
    'On the last day, count how many you got right. Does that surprise you?'
  ],
  safety:
    'Do the reading and go in. A forecast is not worth standing out in a storm for. Lightning can reach you before the rain does. Never look at the sun while you judge the sky. Wash your hands when you come in.',
  grownUpAsks: [
    'Name the two clues you are leaning on hardest. Why those two?',
    'How sure are you, honestly? Would you bet a petal on it?',
    'Why do we take tomorrow\'s reading before we open the envelope?',
    'What would it mean if you got every single forecast right?',
    'You were wrong today. Which clue let you down? Has it before?',
    'Cirrus came in yesterday and nothing has happened. Has it failed you?',
    'Meteorologists have radar and still miss. Does that make radar useless?',
    'What is the difference between a pattern and a coincidence?',
    'Your ginger is dormant and your garlic is growing. Which is your forecast for?',
    'If you could add one instrument before tomorrow, which would help most?',
    'Read me your forecast in one sentence, with no maybes in it.'
  ]
};

const M9L5_LEDGER = {
  sheet: 'M9L5-forecast-and-score-PRINTABLE.pdf',
  tasks: [
    'Copy today\'s sealed forecast onto the sheet. Put the clues you used underneath.',
    'Fill in yesterday\'s scoring row. What you said, what happened, right or wrong.',
    'Write one line about the clue that has been most reliable so far.',
    'Write one line about the clue that has fooled you.'
  ],
  game: {
    title: 'Then What?',
    cards: [
      'HIGH THIN STREAKS SPREADING IN',
      'GREY SHEET DROPPING LOWER ALL MORNING',
      'SMALL PUFFS WITH LOTS OF BLUE',
      'PUFFS GROWING INTO DARK TOWERS',
      'PRESSURE FALLING AND WIND SWINGING ROUND'
    ],
    rounds: [
      'Draw a card. She says what it usually comes before, and how soon.',
      'She has to add what she would do in the garden about it.',
      'She writes a card of her own from something in her own log, and you answer it.'
    ],
    ifSheIsStuck:
      'Ask whether the cloud is getting thicker and lower, or thinner and higher. Thicker and lower is nearly always weather arriving. Thinner and higher is nearly always weather leaving.'
  },
  note: 'Nothing here is graded. A forecast that missed is worth as many petals as one that landed.'
};

// ===========================================================================
// LESSON 54 · hb-m9-06 · TWO WEEKS OF DATA · S4E4a
// ===========================================================================

const M9L6_CHECK_IN = {
  title: 'Fourteen numbers in a column',
  text: 'Your log is full. Fourteen days of temperature, rain, wind and cloud. You wrote every row yourself, at the same time each morning. Now read the temperature column out loud. Forty-four, thirty-nine, fifty-two, fifty-one, forty. It sounds like nothing much.',
  question: 'The pattern is in there somewhere. So why can you not hear it?'
};

/**
 * Written to SciShow Kids' "Be a Weather Watcher", whose transcript is this
 * lesson in miniature: keep a weather journal, take the reading at the same time
 * each day for several days, use a thermometer, and then look back across the
 * days for patterns — and keep going for months or years if you can.
 *
 * This is the S4E4a payload. The element says "gathering weather data and making
 * forecasts", and by this lesson she has gathered fourteen days of it herself.
 * Beat 1 is why a graph works at all — a column is read one number at a time,
 * while a line is read all at once. Beat 2 borrows the definition of a pattern
 * from L53's video on purpose, because the same words twice in a fortnight is
 * how a nine-year-old ends up owning a word.
 *
 * The activity's last step is a real decision about her real corn. A standard
 * about collected data is worth nothing if the data never decides anything.
 */
const M9L6_BEATS = [
  {
    n: 1,
    label: 'A graph is your numbers turned into a shape',
    hook: 'Your eyes compare fourteen dots in about a second. Reading fourteen numbers takes half a minute, and you forget the first one.',
    teachingText:
      'On a graph the days run along the bottom and the degrees run up the side. You put one dot where each day meets its temperature. Then you join the dots. The line is the same fourteen numbers, but now you see their shape all at once.',
    example:
      'Your column said forty-four, thirty-nine, fifty-two, fifty-one, forty. Plotted and joined up, that is a dip, a climb and a drop. The drop lines up exactly with the day the wind swung north.',
    applyIt: {
      prompt: 'You plot rainfall as bars under your temperature line. What can you see now that two columns never showed?',
      choices: [
        'Whether the rainy days and the cold days line up',
        'Exactly how much rain fell on day nine',
        'Which day you forgot to empty the gauge',
        'What the weather will be in June'
      ],
      answer: 0,
      feedback: [
        null,
        'The column already told you that, more exactly than a bar can.',
        'Your notes column tells you that. A graph cannot confess for you.',
        'Fourteen days cannot reach June. That would be climate, not weather.'
      ],
      why: 'Two measurements on one picture is how you see whether they move together. No single column can show it.'
    }
  },
  {
    n: 2,
    label: 'A pattern is something that happens the same way over and over',
    hook: 'One cold morning after a north wind is a coincidence. Four cold mornings after four north winds is a pattern.',
    teachingText:
      'A pattern is something that happens the same way again and again. One example is never enough to make one. So you ask a question your data can answer. Does the temperature always drop after the wind swings north? Then you count the times it held and the times it did not.',
    example:
      'Four of your five north-wind days were followed by a cold morning. One was not. That is a pattern with a hole in it. A hole is a truer thing to write down.',
    applyIt: {
      prompt: 'Your log shows rain on day 3 and day 11. Both days were warm. What can you honestly claim?',
      choices: [
        'Almost nothing yet, because two days is not a pattern',
        'Rain always comes on warm days here',
        'Warm weather causes rain in Georgia',
        'It will rain on day 19, because it is warm'
      ],
      answer: 0,
      feedback: [
        null,
        '"Always" needs far more than two days behind it.',
        'Two days together does not show that one caused the other.',
        'A prediction built on two matching days is a coin toss with extra steps.'
      ],
      why: 'A pattern needs the same thing over and over. Two matching days is a question worth asking, not an answer.'
    }
  }
];

const M9L6_ACTIVITY = {
  title: 'Graph fourteen days, then find the pattern in them',
  prep: 'Tape two sheets of grid paper together, landscape, so fourteen days will fit across. Have the finished log, a ruler and three colours ready. Gigi prints one page of real Georgia weather data for the same fortnight. That gives you a second set of numbers on the table.',
  needs: [
    'grid paper, two sheets taped together',
    'a ruler, a pencil and three coloured pencils',
    'your completed fourteen-day log',
    'a printed page of real local weather data for the same dates',
    'your six scored forecasts from Lesson 53',
    'a soil thermometer or an ordinary thermometer pushed into the corn bucket'
  ],
  steps: [
    'Rule the bottom line. Mark fourteen equal steps along it, one per day, and label them.',
    'Rule the side line and mark the degrees. Start a little below your lowest reading.',
    'Label both lines. An axis with no label is a picture, not a graph.',
    'Put one dot for each day\'s temperature. Join the dots with a ruled line.',
    'In a second colour, draw a bar up from each day for the rain that fell.',
    'In a third colour, letter the cloud above each day. C for cirrus, S for stratus, U for cumulus.',
    'Now stand back. Look at the whole fortnight at once, without reading any numbers.',
    'Question one. Where are the highest and lowest points? How far apart are they?',
    'Question two. Do the rain bars land on warm days, cold days, or neither?',
    'Question three. What happened to the temperature after a north wind?',
    'Answer each in a full sentence. Say how many days it held and how many it did not.',
    'Put the printed data beside yours. Find one thing that agrees and one that does not.',
    'Last, push the thermometer into the corn bucket soil. Read it against your fortnight.',
    'Finish this sentence. From my own data, the corn can go in when ____, and it is not yet because ____.'
  ],
  safety:
    'Wear gloves for the soil reading, and wash your hands afterwards. Push the thermometer into the soil gently, so you do not spear a root. Never taste soil, or anything growing in it, without a grown-up.',
  grownUpAsks: [
    'Before you plot. From the column alone, which day was coldest? How long did that take?',
    'Now look at the graph. Same question. What was different about answering it?',
    'Why does the side line start below your lowest reading, not at zero?',
    'What would happen to your line if you had not labelled the days?',
    'Show me a pattern. Now show me how often it held and how often it broke.',
    'Is that a pattern, or two days that happened to match?',
    'The printed data disagrees on one day. Does that make one of you wrong?',
    'What question would need another two weeks of data?',
    'Your garlic sat through all fourteen days. Which day was hardest on it?',
    'The soil is still too cold for corn. How will your log tell you when it is not?',
    'If you kept this graph going all year, what would it show?'
  ]
};

const M9L6_LEDGER = {
  sheet: 'M9L6-fourteen-day-graph-PRINTABLE.pdf',
  tasks: [
    'Stick or copy your graph onto the sheet. Label both axes and put a title on top.',
    'Write your three pattern answers underneath, in full sentences, with the counts.',
    'Write one line comparing your data with the printed local data.',
    'Write the corn sentence. Say which soil reading you are waiting for, and how you will know.'
  ],
  game: {
    title: 'Word Boss',
    cards: ['DATA', 'PATTERN', 'GRAPH', 'AXIS', 'FORECAST', 'AVERAGE'],
    rounds: [
      'Say what each word means in your own words, with no fancy talk.',
      'A grown-up says the meaning and she says the word, against the clock.',
      'For each word, she points at the place on her own graph where it lives.'
    ],
    ifSheIsStuck:
      'Put her finger on the graph and ask what that part is called. Every one of these words except AVERAGE is on the sheet in front of her.'
  },
  note: 'Nothing here is graded. This graph is fourteen days of her own measurements. It goes in the Plant Detective Log, next to June Bacon-Bercey\'s name.'
};

// ===========================================================================
// THE MODULE
// ===========================================================================

export const HERBALISM_M9 = [
  {
    id: 'hb-m9-01',
    course: 'herbalism',
    module: 9,
    quarter: 3,
    week: 1,
    day: 1,
    n: 49,
    title: 'What weather actually is',
    minutes: 45,
    spec: '§10 · beats',

    concept:
      'Weather is what the air above your garden is doing right now. It is made of several parts, and each part can be measured on its own.',

    standards: [],

    words: ['weather', 'atmosphere', 'temperature', 'humidity', 'meteorologist'],

    glossary: [
      { word: 'weather', plain: 'What the air is doing over one place right now.' },
      { word: 'atmosphere', plain: 'The deep blanket of air wrapped around the Earth.' },
      { word: 'temperature', plain: 'How hot or cold something is, measured in degrees.' },
      { word: 'humidity', plain: 'How much water the air is carrying about, unseen.' },
      { word: 'air pressure', plain: 'How hard the air is pressing down on you and everything else.' },
      { word: 'meteorologist', plain: 'A scientist who measures the weather and works out what comes next.' },
      { word: 'instrument', plain: 'A tool that measures one thing and gives you a number for it.' }
    ],

    video: {
      id: 'nNmWAo0kDGk',
      url: 'https://www.youtube.com/watch?v=nNmWAo0kDGk',
      title: 'Weather for Kids | What is weather, and how does it work?',
      channel: 'Learn Bright',
      minutes: 8,
      verified: '2026-08-15 · re-checked at youtube.com/oembed',
      teaches: [
        'weather comes in pairs — hot and cold, wet and dry, clear and cloudy, calm and stormy',
        'weather happens in the atmosphere, the layer of gases around the Earth',
        'temperature, humidity, air pressure and wind',
        'the instruments that measure each one',
        'what a meteorologist does'
      ],
      sourceGap:
        'No Black American educator found. Searched: "Black American science educator YouTube channel elementary weather clouds kids meteorologist" — returned the American Meteorological Society, Science Trek, weatherthings.com, a Wikipedia page for meteorologist Vivian Brown, a video by Meteorologist JD Rudd, SciShow Kids and PBS. Nothing Black-led at this level. Vivian Brown was then checked directly: a real lead, a television meteorologist at The Weather Channel from 1986 to 2015 and a Jackson State meteorology graduate, but her Wikipedia entry does not state her race and her YouTube material is adult Television Academy interviews, not a short explainer. Recorded as a lead, not used. Open.'
    },

    checkIn: M9L1_CHECK_IN,
    beats: M9L1_BEATS,
    activity: M9L1_ACTIVITY,
    ledger: M9L1_LEDGER,

    hook: M9L1_CHECK_IN,
    core: M9L1_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing:
      'Mark one spot on the back step. Stand on it three times in one day, facing the same way. Use no instruments at all. Answer five questions with your body instead. How does the air feel? Which way does a ribbon stream? Does your breath show? How much sky is covered? Does it feel like something is coming? Guess the temperature in degrees each time, and write the number down even though it is a guess. Then ask a grown-up for the real number, and work out how far off your hands were.',

    practice: [
      {
        ask: 'What is weather, in your own words?',
        answer: 'What the air over one place is doing right now.',
        why: 'It happens in the atmosphere and it changes because the air is always moving somewhere else.'
      },
      {
        ask: 'Why is one number never enough to describe the weather?',
        answer: 'Because weather is temperature and wind and water and pressure, all at once.',
        why: 'Two days at the same temperature behave differently if the wind is not the same.'
      }
    ],

    check: [
      {
        prompt: 'Which of these best describes what weather actually is?',
        choices: [
          'What the air is doing over one place right now',
          'How hot it is outside today',
          'What the sky looks like from your window',
          'The season the year is in'
        ],
        answer: 0,
        feedback: [
          null,
          'Temperature is one part of weather, but it is not all of it.',
          'The sky is one clue. Wind and temperature are weather too, and you cannot see either.',
          'A season lasts months. Weather changes between breakfast and lunch.'
        ]
      },
      {
        prompt: 'Weather happens in the atmosphere. What is the atmosphere?',
        choices: [
          'The blanket of air wrapped around the Earth',
          'The clouds and nothing else',
          'The soil your containers sit in',
          'The temperature of one day'
        ],
        answer: 0,
        feedback: [
          null,
          'Clouds float in the atmosphere. They are not all of it.',
          'Soil is under the weather, not part of it.',
          'That is one measurement taken inside the atmosphere.'
        ]
      },
      {
        prompt: 'What does a meteorologist do?',
        choices: [
          'Measures the weather and works out what is coming',
          'Grows plants that need a lot of rain',
          'Studies the soil in containers',
          'Names the clouds and stops there'
        ],
        answer: 0,
        feedback: [
          null,
          'That is a gardener, which is a different job you also do.',
          'Soil is somebody else\'s subject. A meteorologist works on air.',
          'Naming clouds is part of it, but the forecast is the point of the job.'
        ]
      }
    ]
  },

  {
    id: 'hb-m9-02',
    course: 'herbalism',
    module: 9,
    quarter: 3,
    week: 1,
    day: 2,
    n: 50,
    title: 'Build the weather station',
    minutes: 45,
    spec: '§10 · beats',

    concept:
      'An instrument turns a feeling into a number anybody can compare. Each instrument answers one question and no others.',

    standards: ['S4E4a'],

    words: ['instrument', 'thermometer', 'rain gauge', 'wind vane', 'degrees'],

    glossary: [
      { word: 'instrument', plain: 'A tool that measures one thing and gives you a number for it.' },
      { word: 'thermometer', plain: 'The instrument that measures how hot the air is, in degrees.' },
      { word: 'rain gauge', plain: 'A straight-sided container that catches rain so you can measure its depth.' },
      { word: 'wind vane', plain: 'A spinning arrow that points at the direction the wind is coming FROM.' },
      { word: 'anemometer', plain: 'The instrument that measures how fast the wind is blowing.' },
      { word: 'degrees', plain: 'The units temperature is measured in.' },
      { word: 'weather station', plain: 'A set of instruments kept in one place and read every day.' }
    ],

    video: {
      id: 'VkyfKtpPZG8',
      url: 'https://www.youtube.com/watch?v=VkyfKtpPZG8',
      title: 'RAIN GAUGES and HYGROMETERS 💧🌧️ Weather Instruments for Kids🌡 Episode 1',
      channel: 'Smile and Learn - English',
      minutes: 5,
      verified: '2026-08-15 · re-checked at youtube.com/oembed',
      teaches: [
        'what a rain gauge is and what it measures',
        'that rainfall is measured as a depth',
        'what a hygrometer is and that it measures humidity',
        'that each weather instrument measures one thing'
      ],
      sourceGap:
        'No Black American educator found. Searched: "Black-owned kids science YouTube channel weather unit elementary Black homeschool STEM educator clouds weather station" — returned Science Trek, four homeschool unit-study blogs, Mystery Science, a general STEM-channels listicle and weather.gov. None Black-led, and none a video at all. Open.'
    },

    checkIn: M9L2_CHECK_IN,
    beats: M9L2_BEATS,
    activity: M9L2_ACTIVITY,
    ledger: M9L2_LEDGER,

    hook: M9L2_CHECK_IN,
    core: M9L2_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing:
      'Build all three instruments. Then put each one in the right place, which matters just as much. Tape a ruler down a straight-sided bottle, with the zero at the inside bottom. Stand it out in the open, well away from the house, so no eave can steal the rain. Weigh it down with stones. Hang the thermometer in the shade on the north side, at about chest height. Sun falling on it would measure the sun instead of the air. Then make the wind vane. You need a straw, a card arrow with a bigger tail, a pin and a pencil in clay. Mark the compass points round its base and check that it spins freely. Date all three, take one reading from each, and say them out loud before you go in.',

    practice: [
      {
        ask: 'Why does the rain gauge have to stand out in the open?',
        answer: 'Because a wall or a roof edge would block or add rain. The number would be a lie.',
        why: 'A gauge measures what fell on that spot. That spot has to be a fair sample of the sky.'
      },
      {
        ask: 'Your wind vane points north. Where is the wind coming from?',
        answer: 'From the north.',
        why: 'The big tail catches the wind and swings round, which turns the small arrow head into it.'
      }
    ],

    check: [
      {
        prompt: 'Why does the thermometer hang in the shade instead of the sun?',
        choices: [
          'Sun on it measures the sun, not the air',
          'It would fade in the sunshine',
          'Thermometers only work in the dark',
          'The shade is nearer the containers'
        ],
        answer: 0,
        feedback: [
          null,
          'Fading might happen eventually, but that is not why the reading goes wrong.',
          'A thermometer works fine in daylight. The problem is direct sun heating it.',
          'Where the containers are is not what decides this.'
        ]
      },
      {
        prompt: 'Which instrument gives you an answer with no number in it at all?',
        choices: ['The wind vane', 'The rain gauge', 'The thermometer', 'The anemometer'],
        answer: 0,
        feedback: [
          null,
          'A gauge gives you a depth in inches, which is a number.',
          'A thermometer gives you degrees, which is a number.',
          'An anemometer gives a speed, and a speed is a number.'
        ]
      },
      {
        prompt: 'Gigi says last night felt like a lot of rain. Why is your gauge better?',
        choices: [
          'It gives a depth you can compare with last week',
          'It is newer than she is',
          'It was outside all night and she was not',
          'It measures wind as well as rain'
        ],
        answer: 0,
        feedback: [
          null,
          'Age has nothing to do with whether a measurement is useful.',
          'Being outside is not the point. The number is the point.',
          'A rain gauge knows nothing about wind. That is the vane\'s job.'
        ]
      }
    ]
  },

  {
    id: 'hb-m9-03',
    course: 'herbalism',
    module: 9,
    quarter: 3,
    week: 1,
    day: 3,
    n: 51,
    title: 'Reading your own instruments',
    minutes: 45,
    spec: '§10 · beats',

    concept:
      'A reading is only worth something if it was taken the same way as the one before it. And one instrument on the list points forwards instead of backwards.',

    standards: ['S4E4a'],

    words: ['reading', 'data', 'barometer', 'air pressure', 'forecast'],

    glossary: [
      { word: 'reading', plain: 'The number an instrument is showing at the moment you look.' },
      { word: 'data', plain: 'Measurements you wrote down, kept together so you can compare them.' },
      { word: 'barometer', plain: 'The instrument that measures how hard the air is pressing down.' },
      { word: 'air pressure', plain: 'The weight of all the air above you, pressing down.' },
      { word: 'forecast', plain: 'A careful guess about tomorrow, built out of evidence.' },
      { word: 'anemometer', plain: 'The instrument that measures how fast the wind is blowing.' },
      { word: 'log', plain: 'The sheet where every day\'s readings are written in order.' }
    ],

    video: {
      id: 'fPneyo-KiZo',
      url: 'https://www.youtube.com/watch?v=fPneyo-KiZo',
      title: 'THERMOMETER and BAROMETER 🌬️🔥 Weather Instruments for Kids 🧪 Episode 3',
      channel: 'Smile and Learn - English',
      minutes: 5,
      verified: '2026-08-15 · re-checked at youtube.com/oembed',
      teaches: [
        'what a thermometer measures and how it is read',
        'what a barometer measures',
        'that air pressure is the weight of the air pressing down',
        'that changing pressure is used to work out what weather is coming'
      ],
      sourceGap:
        'No Black American educator found. Searched: "Black meteorologist YouTube channel for kids science weather explainer Black scientist children clouds" — returned weather.gov, Meteorologist JD Rudd, SciShow Kids, Crash Course Kids, Learn Bright and an unrelated Wikipedia page for a person named Emily Black. None Black-led. June Bacon-Bercey was then searched and confirmed through her Wikipedia entry: first African-American woman to earn a meteorology degree, and the first woman and first African-American to hold the American Meteorological Society television seal. No teaching video of her exists that could be found, so she is named in this lesson\'s check-in text instead. Open.'
    },

    checkIn: M9L3_CHECK_IN,
    beats: M9L3_BEATS,
    activity: M9L3_ACTIVITY,
    ledger: M9L3_LEDGER,

    hook: M9L3_CHECK_IN,
    core: M9L3_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing:
      'Read the station twice on purpose. Once badly, once properly, and then compare the two. First glance down at the thermometer from above. Squint at the gauge from standing height. Write those numbers on a sheet marked CARELESS. Then do it again the right way. Crouch until your eye is level with the water. Read the line the thermometer actually reaches, not the nearest round number. Watch the vane for a slow count of twenty before you commit. Empty the gauge into a jug and put it back exactly where it was. Then work out how far apart your two sets of numbers were. Last, agree one reading time that will hold for the whole fortnight.',

    practice: [
      {
        ask: 'Why must you read at the same time every day?',
        answer: 'Because a morning reading and an afternoon reading are not measuring the same thing.',
        why: 'Change the time and you have changed the test, so the numbers stop comparing with each other.'
      },
      {
        ask: 'Which instrument in the standard tells you about tomorrow?',
        answer: 'The barometer.',
        why: 'Falling air pressure usually means unsettled weather on the way. The others only report what already happened.'
      }
    ],

    check: [
      {
        prompt: 'Why do you crouch until your eye is level with the water in the gauge?',
        choices: [
          'Looking down at water makes you read it too low',
          'It stops the gauge from tipping over',
          'It keeps the rain off your face',
          'The numbers are printed upside down'
        ],
        answer: 0,
        feedback: [
          null,
          'Crouching does nothing for the stones holding it down.',
          'Comfort is not why. The angle you look from changes the number.',
          'The ruler reads the same way up whatever height you stand at.'
        ]
      },
      {
        prompt: 'You forgot to empty the gauge yesterday. What is wrong with today\'s number?',
        choices: [
          'It is two days of rain pretending to be one',
          'It is half of what really fell',
          'It cannot be read at all now',
          'Nothing is wrong with it'
        ],
        answer: 0,
        feedback: [
          null,
          'Nothing was taken out, so the number is too big and not too small.',
          'You can read it perfectly well. It just means something different.',
          'It is now the total for two days, which is not what the column claims.'
        ]
      },
      {
        prompt: 'Which of these measures how fast the wind is blowing?',
        choices: ['An anemometer', 'A wind vane', 'A barometer', 'A rain gauge'],
        answer: 0,
        feedback: [
          null,
          'A vane gives the direction the wind comes from and no speed at all.',
          'A barometer measures air pressure, which is about tomorrow.',
          'A rain gauge measures depth of rain and nothing else.'
        ]
      }
    ]
  },

  {
    id: 'hb-m9-04',
    course: 'herbalism',
    module: 9,
    quarter: 3,
    week: 2,
    day: 1,
    n: 52,
    title: 'Clouds from the back step',
    minutes: 45,
    spec: '§10 · beats',

    concept:
      'Clouds sort into a few kinds by how high they sit and what shape they hold. Name one properly, say how much sky it covers, and looking up becomes data.',

    standards: ['S4E4c'],

    words: ['cirrus', 'stratus', 'cumulus', 'sky cover', 'observation'],

    glossary: [
      { word: 'cirrus', plain: 'The highest clouds. Thin white streaks, made of ice.' },
      { word: 'stratus', plain: 'A low flat grey sheet that covers the whole sky.' },
      { word: 'cumulus', plain: 'Puffy clouds with flat bottoms, like piled cotton wool.' },
      { word: 'sky cover', plain: 'How much of the sky the cloud is covering, counted in quarters.' },
      { word: 'observation', plain: 'Something you actually saw and wrote down, not something you decided.' },
      { word: 'altitude', plain: 'How high above the ground something is.' }
    ],

    video: {
      id: 'dvCa1rjGNH0',
      url: 'https://www.youtube.com/watch?v=dvCa1rjGNH0',
      title: 'Clouds for Kids | Cirrus, Cumulus, & Stratus',
      channel: 'Homeschool Pop',
      minutes: 10,
      verified: '2026-08-15 · re-checked at youtube.com/oembed',
      teaches: [
        'cirrus clouds are highest and look thin and wispy',
        'cumulus clouds are puffy with flat bottoms',
        'stratus clouds are low flat grey sheets',
        'how to tell the three apart by height and shape'
      ],
      sourceGap:
        'No Black American educator found. Searched: "Black science communicator youtube kids weather OR clouds channel like SciShow Kids Black host elementary science explainer" — returned six listicles of children\'s science channels, a SciShow Kids weather playlist and a KidzSearch mirror of SciShow Kids. Not one Black-led channel appeared in any of the six lists. Open.'
    },

    checkIn: M9L4_CHECK_IN,
    beats: M9L4_BEATS,
    activity: M9L4_ACTIVITY,
    ledger: M9L4_LEDGER,

    hook: M9L4_CHECK_IN,
    core: M9L4_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing:
      'Stand on your marked spot. Look up for a slow count of thirty before you write a word. Hold a three-picture cloud key beside the sky. Match what is up there to cirrus, cumulus or stratus. Write both names if two kinds are showing. Then cut the sky into quarters in your head and record how many are covered. "Cloudy" is not a measurement. "Cumulus over a quarter of the sky at eight" is. Sketch it in the margin in twenty seconds and photograph it if you can. Watch which way it is drifting, and check that against your wind vane. Then do the whole thing again tomorrow, and every day, until the fortnight ends.',

    practice: [
      {
        ask: 'How do you tell cirrus from cumulus?',
        answer: 'Cirrus is very high and thin and wispy. Cumulus is lower and puffy with a flat bottom.',
        why: 'Sorting by height first works even when the light makes two clouds look alike.'
      },
      {
        ask: 'Why do you record sky cover as well as the cloud name?',
        answer: 'Because it turns what you saw into something you can compare with tomorrow.',
        why: 'A name on its own cannot be graphed, but a name with an amount can.'
      }
    ],

    check: [
      {
        prompt: 'Thin white streaks so high that blue shows through them. Which cloud?',
        choices: ['Cirrus', 'Cumulus', 'Stratus', 'Cumulonimbus'],
        answer: 0,
        feedback: [
          null,
          'Cumulus is lower and lumpy, and no blue shows through the middle of a puff.',
          'Stratus is a low grey sheet with nothing showing through it.',
          'That is a cumulus tower gone dark, and it is nothing like thin or wispy.'
        ]
      },
      {
        prompt: 'The whole sky is one flat grey lid with no edges anywhere. Which cloud?',
        choices: ['Stratus', 'Cirrus', 'Cumulus', 'Sky cover'],
        answer: 0,
        feedback: [
          null,
          'Cirrus is high and thin, and it leaves plenty of sky showing.',
          'Cumulus has separate puffs with gaps between them.',
          'Sky cover is how much is covered, not the name of a cloud.'
        ]
      },
      {
        prompt: 'Which of these belongs in a cloud log as an observation?',
        choices: [
          'Cumulus over half the sky at 8am',
          'Looks like rain to me',
          'A miserable sort of day',
          'Cloudy, more or less'
        ],
        answer: 0,
        feedback: [
          null,
          'That is a prediction, so it belongs in a forecast rather than an observation.',
          'That is how the day feels to you, and nobody else can check it.',
          '"More or less" cannot be compared with anything next week.'
        ]
      }
    ]
  },

  {
    id: 'hb-m9-05',
    course: 'herbalism',
    module: 9,
    quarter: 3,
    week: 2,
    day: 2,
    n: 53,
    title: 'What clouds tell you is coming',
    minutes: 45,
    spec: '§10 · beats',

    concept:
      'Clouds are evidence about what is coming, not a promise. A forecast puts them with the other readings, and then gets checked against what really happened.',

    standards: ['S4E4c'],

    words: ['forecast', 'evidence', 'pattern', 'cumulonimbus', 'predict'],

    glossary: [
      { word: 'forecast', plain: 'A careful guess about tomorrow, built out of evidence.' },
      { word: 'evidence', plain: 'The things you actually saw or measured that back up what you say.' },
      { word: 'pattern', plain: 'Something that happens the same way over and over again.' },
      { word: 'cumulonimbus', plain: 'A cumulus cloud grown into a tall dark tower. It brings storms.' },
      { word: 'predict', plain: 'To say what you think will happen, before it happens.' },
      { word: 'radar', plain: 'A machine that shows where rain is, and which way it is moving.' }
    ],

    video: {
      id: 'dLQ0lHpyZd8',
      url: 'https://www.youtube.com/watch?v=dLQ0lHpyZd8',
      title: 'How Do We Know When It Will Rain? | Weather Science | SciShow Kids',
      channel: 'SciShow Kids',
      minutes: 4,
      verified: '2026-08-15 · re-checked at youtube.com/oembed',
      teaches: [
        'meteorologists use radar to see where rain is and which way it is moving',
        'satellites photograph clouds and storms from space',
        'cloud types and movement, wind, and warm air meeting cold air are all clues',
        'a pattern is something that happens the same way over and over again',
        'predictions are not always perfect, because weather can change at the last minute'
      ],
      sourceGap:
        'No Black American educator found. Searched: "Black meteorologist Atlanta Georgia teaching kids weather youtube video school visit explains clouds rain gauge" — returned an UrbanGeekz feature on African-Americans in meteorology, a TheGrio piece on Black meteorologists at The Weather Channel, two listicles of Black meteorology trailblazers, an AccuWeather profile, and two local-news stories about meteorologists visiting elementary schools, neither of them a usable video. Real history, no teachable video. Open.'
    },

    checkIn: M9L5_CHECK_IN,
    beats: M9L5_BEATS,
    activity: M9L5_ACTIVITY,
    ledger: M9L5_LEDGER,

    hook: M9L5_CHECK_IN,
    core: M9L5_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing:
      'Take today\'s full reading first. A forecast with no evidence behind it is only a wish. Then look at four things together: cloud type, sky cover, wind direction, and whether the temperature is climbing or falling. Check the last three days of the log for anything repeating. Write tomorrow\'s forecast in pen on a slip. Name at least two of the clues you used, and say how sure you are. Fold it and hand the envelope to a grown-up. Tomorrow you take the reading BEFORE the envelope is opened, and then you score yourself honestly. When you are wrong, write down which clue misled you rather than just writing "wrong". Keep going until you have six scored forecasts.',

    practice: [
      {
        ask: 'High thin cirrus is spreading in. What does that usually mean?',
        answer: 'A change is probably on the way, though most likely not today.',
        why: 'Cirrus is miles up and made of ice, so it arrives well ahead of the weather it announces.'
      },
      {
        ask: 'Your forecast was wrong. What do you do with it?',
        answer: 'Keep it, and write what really happened beside it.',
        why: 'Keeping the misses is how you find out which clues are worth trusting.'
      }
    ],

    check: [
      {
        prompt: 'Small cumulus have been growing into tall dark towers all morning. What is coming?',
        choices: [
          'A storm, quite possibly this afternoon',
          'Clear weather for the rest of the week',
          'A slow grey drizzle that lasts all day',
          'Nothing, because cumulus is a fair-weather cloud'
        ],
        answer: 0,
        feedback: [
          null,
          'Towers building up is exactly the opposite of clearing.',
          'Slow steady drizzle comes from stratus thickening, not from towers.',
          'Small scattered cumulus means fair. These are neither small nor scattered any more.'
        ]
      },
      {
        prompt: 'Meteorologists have radar and satellites and still get it wrong. Why?',
        choices: [
          'Weather can change at the last minute',
          'Their instruments are usually broken',
          'They are not really looking',
          'Radar cannot see rain at all'
        ],
        answer: 0,
        feedback: [
          null,
          'Working instruments still cannot promise what has not happened yet.',
          'They watch patterns constantly. That is the whole job.',
          'Radar is exactly how they see where rain is and where it is heading.'
        ]
      },
      {
        prompt: 'What makes a forecast different from a plain guess?',
        choices: [
          'It names the evidence it was built from',
          'It always turns out to be right',
          'It is written down in pen',
          'A grown-up agreed with it'
        ],
        answer: 0,
        feedback: [
          null,
          'Forecasts are wrong sometimes, and that does not stop them being forecasts.',
          'Writing it in pen keeps you honest, but the pen is not what makes it a forecast.',
          'Agreement is not evidence. Two people can be wrong together.'
        ]
      }
    ]
  },

  {
    id: 'hb-m9-06',
    course: 'herbalism',
    module: 9,
    quarter: 3,
    week: 2,
    day: 3,
    n: 54,
    title: 'Two weeks of data',
    minutes: 45,
    spec: '§10 · beats',

    concept:
      'Fourteen numbers in a column say almost nothing. Plotted on a graph they show a shape. And a pattern is only a pattern once it has happened the same way over and over.',

    standards: ['S4E4a'],

    words: ['data', 'graph', 'axis', 'pattern', 'average'],

    glossary: [
      { word: 'data', plain: 'Measurements you wrote down, kept together so you can compare them.' },
      { word: 'graph', plain: 'A picture of your numbers, so you can see their shape all at once.' },
      { word: 'axis', plain: 'One of the two labelled lines a graph is built on.' },
      { word: 'pattern', plain: 'Something that happens the same way over and over again.' },
      { word: 'average', plain: 'The middle sort of number. Add them all up and share them out evenly.' },
      { word: 'range', plain: 'The distance between your highest reading and your lowest.' }
    ],

    video: {
      id: 'Uo8lbeVVb4M',
      url: 'https://www.youtube.com/watch?v=Uo8lbeVVb4M',
      title: 'Be a Weather Watcher | Weather Science | SciShow Kids',
      channel: 'SciShow Kids',
      minutes: 4,
      verified: '2026-08-15 · re-checked at youtube.com/oembed',
      teaches: [
        'keeping a weather journal in writing and in drawings',
        'observing the weather at the same time every day',
        'using a thermometer and recording the temperature beside the observation',
        'looking back across several days for patterns',
        'that watching for months or years shows you more than watching for days'
      ],
      sourceGap:
        'No Black American educator found. Searched: "Vivian Brown meteorologist YouTube video for children weather explainer" — returned her Wikipedia and Kiddle pages and four Television Academy interview clips, all adult long-form about her career rather than any teaching video. She stays a lead and nothing here uses her. Six searches across this module found no Black-led fourth-grade weather video anywhere, which is why June Bacon-Bercey is named in Lesson 51\'s text and in this lesson\'s ledger note instead. Open.'
    },

    checkIn: M9L6_CHECK_IN,
    beats: M9L6_BEATS,
    activity: M9L6_ACTIVITY,
    ledger: M9L6_LEDGER,

    hook: M9L6_CHECK_IN,
    core: M9L6_BEATS.map((b) => ({ heading: b.label, text: b.teachingText })),
    doing:
      'Turn the whole fortnight into one picture. Rule fourteen equal steps along the bottom for the days, and the degrees up the side. Label both axes. Plot a dot for each day\'s temperature and join them with a ruled line. Add the rainfall as coloured bars underneath, and a tiny letter above each day for the cloud. Then stand back and answer three questions in full sentences. Where are the highest and lowest points, and how far apart? Do the rain bars land on the warm days or the cold ones? What happened to the temperature after each north wind? Every time, say how many days it held and how many it did not. Put a printed page of real local data beside yours. Find one thing that agrees and one that does not. Finish by pushing a thermometer into the corn bucket. Write down which soil reading you are waiting for before the corn can go in.',

    practice: [
      {
        ask: 'Why plot the numbers instead of just reading the column?',
        answer: 'Because a graph shows the shape of all fourteen days at once.',
        why: 'A column is read one number at a time. You forget the first before you reach the last.'
      },
      {
        ask: 'How do you know something in your log is a pattern?',
        answer: 'It has to happen the same way over and over, not once or twice.',
        why: 'Two matching days is a question worth asking. It is not yet an answer.'
      }
    ],

    check: [
      {
        prompt: 'Why do both lines on a graph need labels?',
        choices: [
          'Without them nobody knows what the shape is of',
          'To make the sheet look finished',
          'Because a ruler was used to draw them',
          'So the dots stay in a straight line'
        ],
        answer: 0,
        feedback: [
          null,
          'Tidy is nice, but an unlabelled graph is a picture and not a measurement.',
          'How it was drawn has nothing to do with what it means.',
          'Labels do not hold dots anywhere. They say what the dots are counting.'
        ]
      },
      {
        prompt: 'Rain fell on two of your fourteen days and both were warm. What can you claim?',
        choices: [
          'Very little, because two days is not a pattern',
          'Rain always falls on warm days in Georgia',
          'Warm weather makes rain happen',
          'The next warm day will definitely be wet'
        ],
        answer: 0,
        feedback: [
          null,
          '"Always" would need far more than two days behind it.',
          'Two things happening together does not show that one caused the other.',
          'That is a coin toss dressed up as a forecast.'
        ]
      },
      {
        prompt: 'Four of your five north-wind days were followed by a cold morning. What is that?',
        choices: [
          'A pattern with one exception, and you write both down',
          'Proof that north wind always brings cold',
          'Nothing worth recording at all',
          'A mistake in your log'
        ],
        answer: 0,
        feedback: [
          null,
          'Four out of five is strong, but the fifth day means "always" is not true.',
          'Four out of five is well worth recording. It is the most useful thing in the log.',
          'The odd day out is data, not an error.'
        ]
      }
    ]
  }
];

export const HERBALISM_M9_META = {
  courseId: 'herbalism',
  module: 9,
  title: 'Weather in the Garden',
  blurb:
    'Build a rain gauge, a thermometer stand and a wind vane out of a bottle and a straw, learn to read them the same way every morning, name the clouds from your own back step, forecast tomorrow and score yourself — then graph fourteen days of your own numbers and find the pattern hiding in them.'
};

export function m9LessonById(id) {
  return HERBALISM_M9.find((l) => l.id === id) || null;
}

export default HERBALISM_M9;
