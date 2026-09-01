// ---------------------------------------------------------------------------
// HERBALISM & BOTANY — MODULE 9 QUESTION BANK
// WEATHER IN THE GARDEN · Quarter 3, Weeks 1 and 2 · S4E4a and S4E4c
//
// Sixty questions. Ten for each of the six lessons, which is what the two weekly
// tests need: three lessons at ten is a thirty-question pool, an eight-question
// paper draws from it, and a re-take can still be a genuinely different paper.
//
// THESE ARE NOT ASKED AT THE END OF THE LESSON. Inside the lesson she answers two
// Apply-Its and a three-question check, five in all. These sixty feed Day 4, the
// morning warm-up, the spaced-review boxes and the extra practice the practice
// gate serves after a poor check.
//
// ---- SHAPE ----
//
// Matched to src/data/assessments/herbalismM3Bank.js, which is the Quarter 1
// standards-bearing bank:
//
//   id        unique across the whole bank — t-hbm9<lesson><letter>
//   lesson    must match a real lesson id
//   prompt    Q3 cap: <= 14 words a sentence
//   choices   exactly 4, all different, Q3 cap: none over 15 words
//   answer    0-3
//   feedback  exactly 4, NULL in the answer slot, a real sentence in the rest
//   why       required, shown on the review screen
//
// ---- THE READING LEVEL IS DELIBERATELY HIGHER THAN MODULES 1 TO 8 ----
//
// LESSON-SPEC-Q3Q4.md raises the bar for Quarter 3: prompts up to fourteen words
// a sentence rather than eleven, answer choices up to fifteen words rather than
// twelve, and a long-word rate up to ten per cent. That is the whole point of
// the quarter, and these questions are written to it — several prompts carry a
// subordinate clause ("because", "so", "even though") because holding two ideas
// in one sentence is the comprehension skill Quarter 3 exists to build.
//
// WARNING FOR WHOEVER RUNS THE BUILD. scripts/check-assessment.mjs in this
// checkout still has the Quarter 1 caps hard-coded at lines 519-521:
// CAP_SENTENCE = 11, CAP_HARD = 0.06, CAP_CHOICE_WORDS = 12. The spec says those
// are now per-quarter; the file has not been changed. Until it is, this bank
// will fail the checker on sentence length. The fix is the checker, not these
// questions. Writing Quarter 3 at Quarter 1's level to make a stale check pass
// is exactly the failure the new caps exist to prevent.
//
// The SUBJECT set in the same file also needs Module 9's vocabulary added, or
// every question about a thermometer or a cumulus cloud trips the long-word
// rule. The full list is in judgement call 10(b) in the header of m9Lessons.js.
//
// ---- THE DISTRACTOR RULE, APPLIED LITERALLY ----
//
// Where a question's payload is vocabulary, the three wrong choices are the
// OTHER WORDS FROM THAT LESSON. Ask which cloud is a low flat grey sheet and the
// wrong answers are cirrus, cumulus and cumulonimbus, so a miss names the exact
// word that has not landed and the Gradebook can say which one. No filler, and
// no obviously silly option to pad the four out.
//
// ---- UNITS ----
//
// Fahrenheit and inches throughout, because she is in Georgia and the whole
// point of Lesson 54 is comparing her own numbers with a local forecast.
//
// ---- SAFETY ----
//
// No dosing, no treatment, no "good for". Nothing in this module touches what a
// plant does to a body — it is air, instruments and numbers. Three questions
// carry the module's own safety rules instead: t-hbm901j (come in when you hear
// thunder), t-hbm904j (never look at the sun) and t-hbm902j (a grown-up does the
// cutting and the pin).
// ---------------------------------------------------------------------------

export const HERBALISM_M9_BANK = [
  // =========================================================================
  // hb-m9-01 · What weather actually is · no element
  // =========================================================================
  {
    id: 't-hbm901a',
    lesson: 'hb-m9-01',
    prompt: 'What is weather?',
    choices: [
      'How hot the whole year usually gets',
      'The season the calendar says it is',
      'The kind of soil your containers hold',
      'What the air is doing over one place right now'
    ],
    answer: 3,
    feedback: [
      'What a year usually does is climate, and that is a different question.',
      'A season lasts months, while weather can change before lunch.',
      'Soil sits under the weather. It is not part of it.',
      null
    ],
    why: 'Weather is the air doing something over one place at one moment, which is why it changes so fast.'
  },
  {
    id: 't-hbm901b',
    lesson: 'hb-m9-01',
    prompt: 'Weather happens inside the atmosphere. What is that?',
    choices: [
      'The clouds and nothing else',
      'The blanket of air wrapped around the Earth',
      'The temperature of one particular day',
      'The wind on its own'
    ],
    answer: 1,
    feedback: [
      'Clouds float about in the atmosphere, but they are only part of it.',
      null,
      'That is one measurement taken inside the atmosphere.',
      'Wind is air moving, so it happens in the atmosphere rather than being it.'
    ],
    why: 'The atmosphere is the deep layer of air around the whole planet, and every bit of weather happens in it.'
  },
  {
    id: 't-hbm901c',
    lesson: 'hb-m9-01',
    prompt: 'Your garden is unchanged, but today is freezing and windy. What changed?',
    choices: [
      'The roots of your garlic',
      'The soil inside the buckets',
      'The air now sitting over the garden',
      'Where your garden is'
    ],
    answer: 2,
    feedback: [
      'Roots feel the cold. They cannot cause it.',
      'The soil felt the change, but the change arrived from somewhere else.',
      null,
      'Nothing moved. Your containers are on the same step as yesterday.'
    ],
    why: 'New air arrives and brings its temperature with it, which is why a still garden can wake up cold.'
  },
  {
    id: 't-hbm901d',
    lesson: 'hb-m9-01',
    prompt: 'What does a meteorologist do?',
    choices: [
      'Measures the weather and works out what is coming next',
      'Grows plants that need a great deal of rain',
      'Studies the soil inside containers',
      'Names clouds and stops there'
    ],
    answer: 0,
    feedback: [
      null,
      'That is a gardener, which is a different job that you also do.',
      'Soil belongs to somebody else. A meteorologist works on air.',
      'Naming clouds is a small part of it, but the forecast is the point.'
    ],
    why: 'A meteorologist measures the parts of the weather and uses them to work out what happens next.'
  },
  {
    id: 't-hbm901e',
    lesson: 'hb-m9-01',
    prompt: 'Two days both read seventy degrees, but one dried your pots out. Why?',
    choices: [
      'One of the thermometers was broken',
      'The pots were bigger on one of the days',
      'The wind was much stronger on one day',
      'One day was longer than the other'
    ],
    answer: 2,
    feedback: [
      'Both readings agreed, so there is no reason to blame the instrument.',
      'They are the same containers on both days.',
      null,
      'The length of the day is not what emptied that soil.'
    ],
    why: 'Wind carries damp air away and dry air in, so it can empty a pot the temperature alone would not.'
  },
  {
    id: 't-hbm901f',
    lesson: 'hb-m9-01',
    prompt: 'Which of these is NOT one of the parts weather is made of?',
    choices: ['Temperature', 'Wind', 'Air pressure', 'The day of the week'],
    answer: 3,
    feedback: [
      'Temperature is measured with a thermometer, so it is a part of weather.',
      'Wind is one of the four parts, and a wind vane gives its direction.',
      'Air pressure is measured with a barometer and it matters a great deal.',
      null
    ],
    why: 'Weather is temperature, wind, the water in the air and air pressure. The calendar has nothing to do with it.'
  },
  {
    id: 't-hbm901g',
    lesson: 'hb-m9-01',
    prompt: 'Humidity is a word for what?',
    choices: [
      'How much water the air is carrying',
      'How hot the air is',
      'How hard the air presses down',
      'Which way the wind comes from'
    ],
    answer: 0,
    feedback: [
      null,
      'That is temperature, and it is measured in degrees.',
      'That is air pressure, and a barometer measures it.',
      'That is wind direction, and a wind vane gives it.'
    ],
    why: 'Humidity is the water the air carries about unseen, which is why some warm days feel heavy.'
  },
  {
    id: 't-hbm901h',
    lesson: 'hb-m9-01',
    prompt: 'You held a ribbon up and it streamed towards the fence. What does that show?',
    choices: [
      'The wind is coming from the fence',
      'The wind is coming from behind you',
      'The wind has stopped blowing',
      'The fence is making the wind'
    ],
    answer: 1,
    feedback: [
      'The ribbon is being pushed away from the wind, not towards it.',
      null,
      'A stopped wind leaves a ribbon hanging straight down.',
      'A fence can block wind, but it cannot make any.'
    ],
    why: 'Wind pushes the ribbon away from itself, so the wind is coming from the side the ribbon left behind.'
  },
  {
    id: 't-hbm901i',
    lesson: 'hb-m9-01',
    prompt: 'Why write a guessed temperature down, even though it is only a guess?',
    choices: [
      'So the sheet looks full',
      'Because a guess is as good as a reading',
      'So you can see later how far off you were',
      'Because Gigi is marking it'
    ],
    answer: 2,
    feedback: [
      'A full sheet is not the point of any of this.',
      'A guess is not as good as a reading, which is why the next lesson builds instruments.',
      null,
      'Nothing in the ledger is marked, so being wrong costs nothing.'
    ],
    why: 'Writing the guess before you know the answer is what lets you find out how good your guessing was.'
  },
  {
    id: 't-hbm901j',
    lesson: 'hb-m9-01',
    prompt: 'You are taking a reading outside and you hear thunder. What do you do?',
    choices: [
      'Finish the reading first, then go in',
      'Go inside straight away',
      'Move under a tree until it passes',
      'Stay out but stop writing'
    ],
    answer: 1,
    feedback: [
      'A reading is never worth it. Lightning can strike well before the rain arrives.',
      null,
      'A tree is one of the worst places to shelter in a storm.',
      'Standing still outside does not make you any safer.'
    ],
    why: 'Thunder means lightning is close enough to matter, and lightning can reach you well ahead of the rain.'
  },

  // =========================================================================
  // hb-m9-02 · Build the weather station · S4E4a
  // =========================================================================
  {
    id: 't-hbm902a',
    lesson: 'hb-m9-02',
    prompt: 'Which instrument measures how much rain fell?',
    choices: ['The thermometer', 'The wind vane', 'The anemometer', 'The rain gauge'],
    answer: 3,
    feedback: [
      'A thermometer gives you degrees, not inches of rain.',
      'A wind vane gives a direction and no number at all.',
      'An anemometer gives wind speed, which is a different question.',
      null
    ],
    why: 'A rain gauge catches rain and measures its depth, usually in inches.'
  },
  {
    id: 't-hbm902b',
    lesson: 'hb-m9-02',
    prompt: 'Why must the rain gauge stand out in the open?',
    choices: [
      'A wall or a roof edge would change how much it catches',
      'It looks better standing on its own',
      'The wind cannot reach it out there',
      'So nobody trips over it'
    ],
    answer: 0,
    feedback: [
      null,
      'How it looks has nothing to do with whether the number is true.',
      'Wind reaches it anywhere, which is why it needs stones holding it down.',
      'Keeping it out of the way is sensible, but it is not the reason.'
    ],
    why: 'A gauge is meant to sample the open sky, so anything overhead makes its number a lie.'
  },
  {
    id: 't-hbm902c',
    lesson: 'hb-m9-02',
    prompt: 'Your wind vane points firmly north. Where is the wind coming from?',
    choices: ['From the south', 'From the north', 'From the east', 'It has no direction'],
    answer: 1,
    feedback: [
      'That is backwards. The vane swings its head into the wind, not away from it.',
      null,
      'The vane is not pointing east, so there is no reason to say east.',
      'A pointing vane means there is wind, and wind always comes from somewhere.'
    ],
    why: 'A wind vane always names the direction the wind is coming FROM, which is why we say "a north wind".'
  },
  {
    id: 't-hbm902d',
    lesson: 'hb-m9-02',
    prompt: 'Why is the tail of a wind vane bigger than the arrow head?',
    choices: [
      'So it looks more like an arrow',
      'To make it heavier at one end',
      'So the wind pushes the tail round and the head into the wind',
      'To keep the rain off the pin'
    ],
    answer: 2,
    feedback: [
      'It is not about the look of it. It is about which end the wind grabs.',
      'Weight would stop it spinning freely, which is the opposite of what you want.',
      null,
      'The tail is nowhere near the pin, so it cannot shelter it.'
    ],
    why: 'The big tail catches more wind and swings downwind, which turns the small head to face the wind.'
  },
  {
    id: 't-hbm902e',
    lesson: 'hb-m9-02',
    prompt: 'Why does the thermometer hang in the shade rather than in the sun?',
    choices: [
      'It would fade in the sunshine',
      'Thermometers only work in the dark',
      'Shade is closer to the containers',
      'Sun falling on it measures the sun and not the air'
    ],
    answer: 3,
    feedback: [
      'Fading might happen one day, but that is not why the reading goes wrong.',
      'A thermometer works perfectly well in daylight.',
      'Where the containers sit does not decide where the instrument goes.',
      null
    ],
    why: 'Direct sun heats the thermometer itself, so the number it gives is no longer the air temperature.'
  },
  {
    id: 't-hbm902f',
    lesson: 'hb-m9-02',
    prompt: 'Why put the rain gauge zero at the inside bottom of the bottle?',
    choices: [
      'So the ruler does not slide down',
      'So the first drop of rain reads as zero depth',
      'Because rulers always start there',
      'To stop the bottle blowing over'
    ],
    answer: 1,
    feedback: [
      'Tape holds the ruler, whatever number is at the bottom.',
      null,
      'A ruler can be taped on starting anywhere, which is why this has to be chosen.',
      'Stones stop it blowing over. The ruler does nothing about wind.'
    ],
    why: 'Depth is measured up from the bottom, so the scale has to start exactly where the water starts.'
  },
  {
    id: 't-hbm902g',
    lesson: 'hb-m9-02',
    prompt: 'S4E4a names five instruments. Which one measures wind SPEED?',
    choices: ['The wind vane', 'The barometer', 'The anemometer', 'The rain gauge'],
    answer: 2,
    feedback: [
      'A vane gives the direction the wind comes from and never a speed.',
      'A barometer measures air pressure, which is about what is coming.',
      null,
      'A rain gauge measures a depth of rain and nothing else at all.'
    ],
    why: 'An anemometer counts how fast the wind blows, which matters because wind is what dries containers out.'
  },
  {
    id: 't-hbm902h',
    lesson: 'hb-m9-02',
    prompt: 'Which answer could Gigi actually compare with last week?',
    choices: [
      'It rained really hard for a while',
      'The step looked properly wet this morning',
      'It felt like a lot of rain to me',
      'The gauge caught three quarters of an inch'
    ],
    answer: 3,
    feedback: [
      'Hard and long are feelings, and neither one is a depth.',
      'A wet step proves it rained but cannot say how much.',
      'It felt like a lot to you, and it may not have to her.',
      null
    ],
    why: 'Only a number can be set beside another number, and comparing is the whole reason for a log.'
  },
  {
    id: 't-hbm902i',
    lesson: 'hb-m9-02',
    prompt: 'Which of these does your weather station NOT tell you?',
    choices: [
      'How much rain fell last night',
      'How hot the air is right now',
      'How fast the wind is blowing',
      'Which way the wind is coming from'
    ],
    answer: 2,
    feedback: [
      'Your rain gauge answers that one every morning.',
      'Your thermometer answers that whenever you look at it.',
      null,
      'Your wind vane answers that, and it is the only answer with no number in it.'
    ],
    why: 'Wind speed needs an anemometer, and she has built a gauge, a thermometer and a vane instead.'
  },
  {
    id: 't-hbm902j',
    lesson: 'hb-m9-02',
    prompt: 'Who does the cutting and handles the pin while you build the station?',
    choices: [
      'A grown-up does both',
      'You do both, carefully',
      'You cut and a grown-up pins',
      'Nobody, because neither is needed'
    ],
    answer: 0,
    feedback: [
      null,
      'Careful is not the same as safe with a blade and a dressmaking pin.',
      'The cutting is the sharper job of the two, so it is not yours either.',
      'The bottle has to be cut and the vane has to be pinned.'
    ],
    why: 'A grown-up does the cutting and the pin, and the pin end stays covered when the vane is indoors.'
  },

  // =========================================================================
  // hb-m9-03 · Reading your own instruments · S4E4a
  // =========================================================================
  {
    id: 't-hbm903a',
    lesson: 'hb-m9-03',
    prompt: 'Why do you read the station at the same time every day?',
    choices: [
      'So the readings can honestly be compared with each other',
      'So the numbers come out lower',
      'So the instruments do not wear out',
      'Because mornings are always colder'
    ],
    answer: 0,
    feedback: [
      null,
      'The time of day is not chosen to make numbers small.',
      'Reading an instrument does not wear it out at all.',
      'Mornings usually are colder, but that is a reason to be consistent, not a rule about time.'
    ],
    why: 'Change the time and you have changed the test, so the numbers stop lining up with each other.'
  },
  {
    id: 't-hbm903b',
    lesson: 'hb-m9-03',
    prompt: 'Why crouch until your eye is level with the water in the gauge?',
    choices: [
      'It stops the gauge tipping over',
      'Looking down at water makes you read it too low',
      'It keeps the rain off your face',
      'The numbers are printed upside down'
    ],
    answer: 1,
    feedback: [
      'Crouching does nothing for the stones that hold it steady.',
      null,
      'Comfort is not the reason. The angle changes the number you see.',
      'The ruler reads the same way up from any height.'
    ],
    why: 'The angle you look from shifts where the water line appears, so eye level is the only honest height.'
  },
  {
    id: 't-hbm903c',
    lesson: 'hb-m9-03',
    prompt: 'You forgot to empty the gauge yesterday. What is wrong with today\'s number?',
    choices: [
      'It is two days of rain pretending to be one',
      'It is only half of what really fell',
      'It cannot be read at all any more',
      'Nothing at all is wrong with it'
    ],
    answer: 0,
    feedback: [
      null,
      'Nothing was taken out, so the number is too big rather than too small.',
      'It reads perfectly well. It just means something different from what the column claims.',
      'The column says one day, and the water in there is from two.'
    ],
    why: 'Emptying the gauge is what makes each row one day of rain instead of a running total.'
  },
  {
    id: 't-hbm903d',
    lesson: 'hb-m9-03',
    prompt: 'Which instrument tells you about tomorrow rather than today?',
    choices: ['The thermometer', 'The rain gauge', 'The barometer', 'The wind vane'],
    answer: 2,
    feedback: [
      'A thermometer reports the air right now and nothing further ahead.',
      'A rain gauge reports rain that has already fallen.',
      null,
      'A vane reports the wind that is blowing at this moment.'
    ],
    why: 'Falling air pressure usually means unsettled weather on the way, so a barometer points forwards.'
  },
  {
    id: 't-hbm903e',
    lesson: 'hb-m9-03',
    prompt: 'What is air pressure?',
    choices: [
      'The weight of all the air above you pressing down',
      'How much water the air is carrying',
      'How fast the air is moving past you',
      'How hot the air has become'
    ],
    answer: 0,
    feedback: [
      null,
      'That is humidity, and a hygrometer measures it.',
      'That is wind speed, and an anemometer measures it.',
      'That is temperature, and a thermometer measures it.'
    ],
    why: 'Air has weight, and a barometer measures how hard the whole column of it is pressing down.'
  },
  {
    id: 't-hbm903f',
    lesson: 'hb-m9-03',
    prompt: 'Pressure has fallen all day, but the gauge is dry. What can you say?',
    choices: [
      'Nothing is coming, because nothing has happened',
      'Something may be on its way, even though nothing has happened yet',
      'It rained earlier and you missed it',
      'The thermometer must be broken'
    ],
    answer: 1,
    feedback: [
      'The other instruments only report the past, so they cannot rule tomorrow out.',
      null,
      'An empty gauge is good evidence that no rain fell.',
      'A steady temperature is not a sign of a broken instrument.'
    ],
    why: 'Falling pressure is a forecasting clue, so it can point at tomorrow while today stays quiet.'
  },
  {
    id: 't-hbm903g',
    lesson: 'hb-m9-03',
    prompt: 'Your log reads 44, 61, 43, and only the middle one was read after lunch. What does the jump show?',
    choices: [
      'That Tuesday was genuinely a hot day',
      'That the thermometer needs replacing',
      'When you read it, rather than how warm the week was',
      'That the wind changed direction'
    ],
    answer: 2,
    feedback: [
      'It may have been warmer, but you changed two things at once so you cannot tell.',
      'An instrument that reads fine on two days out of three is not broken.',
      null,
      'Wind would not lift a reading seventeen degrees in a single day.'
    ],
    why: 'Afternoon is the warm end of the day, so a mixed-up reading time creates jumps the weather never made.'
  },
  {
    id: 't-hbm903h',
    lesson: 'hb-m9-03',
    prompt: 'Why watch the wind vane for a slow count of twenty?',
    choices: [
      'One gust is not the same as the wind',
      'The vane takes twenty seconds to start working',
      'It gives the pin time to warm up',
      'Counting keeps you standing still'
    ],
    answer: 0,
    feedback: [
      null,
      'A freely spinning vane responds at once. It needs no warming up.',
      'The pin does not care about temperature at all.',
      'Standing still is useful, but it is not why you count.'
    ],
    why: 'A single gust can swing a vane right round, so you watch long enough to see where it settles.'
  },
  {
    id: 't-hbm903i',
    lesson: 'hb-m9-03',
    prompt: 'You genuinely forgot to take a reading on day nine. What goes in the log?',
    choices: [
      'A number copied from day eight',
      'Your best guess at what it probably was',
      'The word MISSED, written honestly',
      'Nothing, and you rub the whole row out'
    ],
    answer: 2,
    feedback: [
      'Copying yesterday invents a measurement nobody took.',
      'A guess written into a data column stops being a guess and starts being a lie.',
      null,
      'Rubbing the row out hides the gap instead of recording it.'
    ],
    why: 'A gap you can see is data, but an invented number quietly poisons every pattern you look for later.'
  },
  {
    id: 't-hbm903j',
    lesson: 'hb-m9-03',
    prompt: 'In 1954, June Bacon-Bercey was the first Black woman to do what?',
    choices: [
      'Earning a degree in meteorology',
      'Building a working rain gauge',
      'Flying through a hurricane',
      'Owning a television station'
    ],
    answer: 0,
    feedback: [
      null,
      'Rain gauges are far older than she is, and building one was never her claim.',
      'That is not what she is recorded as being first at.',
      'She worked in television as a meteorologist rather than owning a station.'
    ],
    why: 'She was the first African-American woman to earn a meteorology degree, and later the first to hold the television weather seal.'
  },

  // =========================================================================
  // hb-m9-04 · Clouds from the back step · S4E4c
  // =========================================================================
  {
    id: 't-hbm904a',
    lesson: 'hb-m9-04',
    prompt: 'Thin white streaks so high that blue shows through. Which cloud?',
    choices: ['Cumulus', 'Stratus', 'Cirrus', 'Cumulonimbus'],
    answer: 2,
    feedback: [
      'Cumulus sits lower and is lumpy, and no blue shows through a puff.',
      'Stratus is a low grey sheet with nothing showing through it.',
      null,
      'That is a cumulus tower gone dark, which is nothing like thin or wispy.'
    ],
    why: 'High, thin and wispy is cirrus every time, and it is made of ice rather than water droplets.'
  },
  {
    id: 't-hbm904b',
    lesson: 'hb-m9-04',
    prompt: 'The whole sky is one flat grey lid with no edges. Which cloud?',
    choices: ['Stratus', 'Cirrus', 'Cumulus', 'Cumulonimbus'],
    answer: 0,
    feedback: [
      null,
      'Cirrus is high and thin, and it always leaves plenty of sky showing.',
      'Cumulus comes in separate puffs with gaps between them.',
      'A cumulonimbus is a tall tower, and you can see where it ends.'
    ],
    why: 'Stratus is the low flat sheet that covers everything and takes the colour out of the day.'
  },
  {
    id: 't-hbm904c',
    lesson: 'hb-m9-04',
    prompt: 'White puffs with flat bottoms and blue sky between them. Which cloud?',
    choices: ['Cirrus', 'Cumulus', 'Stratus', 'Fog'],
    answer: 1,
    feedback: [
      'Cirrus is far higher and has no puffiness to it at all.',
      null,
      'Stratus has no gaps and no separate shapes.',
      'Fog is cloud sitting on the ground, not floating with blue behind it.'
    ],
    why: 'Cumulus is the piled cotton-wool cloud, and the flat bottoms all sit at the same height.'
  },
  {
    id: 't-hbm904d',
    lesson: 'hb-m9-04',
    prompt: 'Cirrus clouds are so high and cold that they are made of what?',
    choices: ['Rain drops', 'Dust', 'Ice', 'Smoke'],
    answer: 2,
    feedback: [
      'Drops fall out of lower clouds. Cirrus is far too cold for liquid water.',
      'Dust blows about near the ground, not miles up.',
      null,
      'Smoke is not a cloud at all, however much it can look like one.'
    ],
    why: 'Cirrus forms so high that the water freezes, and the ice crystals are why it looks brushed on.'
  },
  {
    id: 't-hbm904e',
    lesson: 'hb-m9-04',
    prompt: 'Why sort clouds by height before you sort them by shape?',
    choices: [
      'Height is the more reliable sort',
      'Shape does not matter at all',
      'Height is easier to measure exactly',
      'Because the standard says so'
    ],
    answer: 0,
    feedback: [
      null,
      'Shape matters a great deal, which is why you use it second.',
      'You cannot measure the height exactly. You can still tell high from low.',
      'The standard names three clouds. It does not tell you how to sort them.'
    ],
    why: 'The light can make two very different clouds look alike, but high and low still tell them apart.'
  },
  {
    id: 't-hbm904f',
    lesson: 'hb-m9-04',
    prompt: 'Which of these belongs in a cloud log as an observation?',
    choices: [
      'It looks like rain to me',
      'A miserable sort of day',
      'Cloudy, more or less',
      'Cumulus over half the sky at 8am'
    ],
    answer: 3,
    feedback: [
      'That is a prediction, so it belongs in tomorrow\'s forecast instead.',
      'That is how the day feels to you, and nobody else can check it.',
      '"More or less" cannot be compared with anything next week.',
      null
    ],
    why: 'An observation names what you saw and how much of it there was, and both can be graphed later.'
  },
  {
    id: 't-hbm904g',
    lesson: 'hb-m9-04',
    prompt: 'Why record sky cover as well as the name of the cloud?',
    choices: [
      'It fills the column up',
      'It says how much there was, so days can be compared',
      'It proves you went outside',
      'It makes the drawing easier'
    ],
    answer: 1,
    feedback: [
      'Filling a column is never a reason to write anything down.',
      null,
      'Nobody is checking up on you. The log is for you.',
      'The drawing takes twenty seconds either way.'
    ],
    why: 'A name on its own cannot be graphed, but a name with an amount beside it can.'
  },
  {
    id: 't-hbm904h',
    lesson: 'hb-m9-04',
    prompt: 'Two different kinds of cloud are up there at once. What do you write?',
    choices: [
      'Both of them, with the cover for each',
      'Only the one lower down',
      'Only the one covering more sky',
      'Nothing, because the sky is confusing'
    ],
    answer: 0,
    feedback: [
      null,
      'Leaving the high one out throws away the earliest clue you have.',
      'The smaller amount can still be the more useful of the two.',
      'A mixed sky is normal, and it is worth writing down exactly as it is.'
    ],
    why: 'Cirrus above cumulus is a real sky and a useful one, so a log that only allows one name loses it.'
  },
  {
    id: 't-hbm904i',
    lesson: 'hb-m9-04',
    prompt: 'Why stand on the same marked spot facing the same way every day?',
    choices: [
      'So the trees and roof block the same amount each time',
      'So the clouds know where to find you',
      'Because the spot is warmer',
      'So the log looks tidy'
    ],
    answer: 0,
    feedback: [
      null,
      'Clouds are not looking for anybody.',
      'How warm the spot is has nothing to do with the reading.',
      'Tidiness is not why any of these rules exist.'
    ],
    why: 'Move and you see a different slice of sky, so your sky cover would change without the weather changing.'
  },
  {
    id: 't-hbm904j',
    lesson: 'hb-m9-04',
    prompt: 'You are working out how much sky is covered. What must you never do?',
    choices: [
      'Stand still while you look',
      'Look straight at the sun',
      'Count the sky in quarters',
      'Write down two cloud names'
    ],
    answer: 1,
    feedback: [
      'Standing still is exactly what you should do.',
      null,
      'Quarters are how sky cover is recorded.',
      'Two names is honest when there really are two kinds up there.'
    ],
    why: 'The sun can damage your eyes before you feel anything, and a phone camera is no protection at all.'
  },

  // =========================================================================
  // hb-m9-05 · What clouds tell you is coming · S4E4c
  // =========================================================================
  {
    id: 't-hbm905a',
    lesson: 'hb-m9-05',
    prompt: 'High thin cirrus is spreading in from the west. What is the best forecast?',
    choices: [
      'It will rain within the hour',
      'The weather will not change all week',
      'A change is probably coming, though likely not today',
      'Nothing, because it is still sunny'
    ],
    answer: 2,
    feedback: [
      'Cirrus is miles up and made of ice, so it is not the cloud that rains on you.',
      'Cirrus spreading in is a sign of change, so predicting none ignores your own evidence.',
      null,
      'It is sunny AND something is arriving, and both of those are worth writing down.'
    ],
    why: 'Cirrus usually arrives well ahead of the weather it announces, so it belongs in tomorrow\'s forecast.'
  },
  {
    id: 't-hbm905b',
    lesson: 'hb-m9-05',
    prompt: 'Cumulus have been growing into tall dark towers all morning. What is coming?',
    choices: [
      'Clear weather for the rest of the week',
      'A storm, quite possibly this afternoon',
      'A slow grey drizzle lasting all day',
      'Nothing, since cumulus means fair weather'
    ],
    answer: 1,
    feedback: [
      'Towers building up is the opposite of a sky that is clearing.',
      null,
      'Slow steady drizzle comes from stratus thickening, not from towers.',
      'Small scattered cumulus means fair. These are neither small nor scattered any more.'
    ],
    why: 'Cumulus that keeps growing becomes cumulonimbus, and a dark flat base is the sign a storm is building.'
  },
  {
    id: 't-hbm905c',
    lesson: 'hb-m9-05',
    prompt: 'Stratus has been thickening and dropping lower all morning. What usually follows?',
    choices: [
      'A sudden violent thunderstorm',
      'A clear cold night',
      'Steady grey drizzle that lasts',
      'Strong wind and nothing else'
    ],
    answer: 2,
    feedback: [
      'Violent storms come out of towering cumulus, not out of a flat grey sheet.',
      'A lid of cloud is what stops a night going clear.',
      null,
      'Wind can come with it, but the drizzle is the part stratus is known for.'
    ],
    why: 'Stratus that lowers and thickens is the classic sign of slow steady rain rather than a downpour.'
  },
  {
    id: 't-hbm905d',
    lesson: 'hb-m9-05',
    prompt: 'What makes a forecast different from a plain guess?',
    choices: [
      'It always turns out to be right',
      'It is written in pen',
      'A grown-up agreed with it',
      'It names the evidence it was built from'
    ],
    answer: 3,
    feedback: [
      'Forecasts are wrong sometimes, and that does not stop them being forecasts.',
      'The pen keeps you honest, but it is not what makes it a forecast.',
      'Agreement is not evidence, because two people can be wrong together.',
      null
    ],
    why: 'A forecast has to say what it is built on, and that is what lets you find out which clues work.'
  },
  {
    id: 't-hbm905e',
    lesson: 'hb-m9-05',
    prompt: 'Meteorologists have radar and satellites and still get it wrong. Why?',
    choices: [
      'Their instruments are usually broken',
      'They are not really watching',
      'Radar cannot see rain at all',
      'Weather can change at the last minute'
    ],
    answer: 3,
    feedback: [
      'Working instruments still cannot promise something that has not happened yet.',
      'Watching patterns constantly is the whole job.',
      'Radar is exactly how they see where rain is and where it is heading.',
      null
    ],
    why: 'A forecast is the best reading of the evidence so far, and the air can still do something new.'
  },
  {
    id: 't-hbm905f',
    lesson: 'hb-m9-05',
    prompt: 'Your forecast said rain and no rain came. What do you do with it?',
    choices: [
      'Keep it and write what really happened beside it',
      'Rub it out so the log looks right',
      'Decide clouds are useless for forecasting',
      'Change it afterwards to say sunny'
    ],
    answer: 0,
    feedback: [
      null,
      'A record you tidied up afterwards is not a record of anything.',
      'One miss does not undo the times those clouds did bring rain.',
      'Rewriting a prediction afterwards means you never really made one.'
    ],
    why: 'Keeping the misses is how you find out which clues are reliable, and that is how the next one gets better.'
  },
  {
    id: 't-hbm905g',
    lesson: 'hb-m9-05',
    prompt: 'Why take the next day\'s reading BEFORE the sealed slip is opened?',
    choices: [
      'So the envelope stays dry',
      'So what you predicted cannot bend what you record',
      'Because the reading takes longer',
      'So Gigi can mark the forecast first'
    ],
    answer: 1,
    feedback: [
      'The envelope is indoors, so it was never going to get wet.',
      null,
      'Which one takes longer has nothing to do with the order.',
      'Nothing is marked, and Gigi is only holding the envelope.'
    ],
    why: 'Knowing what you predicted makes it far too easy to see it, so the measurement comes first.'
  },
  {
    id: 't-hbm905h',
    lesson: 'hb-m9-05',
    prompt: 'A pattern is something that does what?',
    choices: [
      'Happens the same way over and over again',
      'Happens once and surprises you',
      'Cannot be written down',
      'Only meteorologists can see it'
    ],
    answer: 0,
    feedback: [
      null,
      'One surprising day is exactly what a pattern is not.',
      'Writing it down is how you find out whether it holds.',
      'She found several in her own log with a pencil and a graph.'
    ],
    why: 'Repeating is the whole idea, so one example is a question and many examples are a pattern.'
  },
  {
    id: 't-hbm905i',
    lesson: 'hb-m9-05',
    prompt: 'Which set of clues makes the strongest forecast for tomorrow?',
    choices: [
      'The cloud type on its own',
      'How you feel about the day',
      'Cloud, sky cover, wind direction and the last three days of the log',
      'Yesterday\'s temperature, and nothing else'
    ],
    answer: 2,
    feedback: [
      'One clue can be misread. That is why forecasters stack several.',
      'A feeling is not evidence, and nobody else can check it.',
      null,
      'One number from yesterday is very thin evidence for tomorrow.'
    ],
    why: 'Several clues pointing the same way is far harder to argue with than one clue on its own.'
  },
  {
    id: 't-hbm905j',
    lesson: 'hb-m9-05',
    prompt: 'What is a cumulonimbus?',
    choices: [
      'A cirrus cloud that has sunk lower',
      'A cumulus grown into a tall dark tower',
      'A stratus sheet that has torn apart',
      'Another word for sky cover'
    ],
    answer: 1,
    feedback: [
      'Cirrus does not sink. It is ice, miles above the weather you feel.',
      null,
      'A torn stratus sheet is still a low flat cloud, not a tower.',
      'Sky cover is how much sky is covered, not a kind of cloud.'
    ],
    why: 'Cumulonimbus is the storm cloud, and watching cumulus grow into one is watching a storm assemble.'
  },

  // =========================================================================
  // hb-m9-06 · Two weeks of data · S4E4a
  // =========================================================================
  {
    id: 't-hbm906a',
    lesson: 'hb-m9-06',
    prompt: 'Why plot fourteen readings on a graph instead of reading the column?',
    choices: [
      'A graph shows the shape of all of them at once',
      'A graph is more accurate than the numbers',
      'Columns are hard to write',
      'A graph takes less time to make'
    ],
    answer: 0,
    feedback: [
      null,
      'The graph came from the numbers, so it can never be more accurate than they are.',
      'Writing a column is the easy part. Reading it is what is hard.',
      'Ruling and plotting takes far longer than writing a list.'
    ],
    why: 'A column has to be read one number at a time, and you forget the first before you reach the last.'
  },
  {
    id: 't-hbm906b',
    lesson: 'hb-m9-06',
    prompt: 'Why must both lines on a graph be labelled?',
    choices: [
      'To make the sheet look finished',
      'Because a ruler was used to draw them',
      'Without labels nobody knows what the shape is of',
      'So the dots stay in a straight line'
    ],
    answer: 2,
    feedback: [
      'Tidy is nice, but an unlabelled graph is a picture and not a measurement.',
      'How it was drawn has nothing to do with what it means.',
      null,
      'Labels hold nothing in place. They say what the dots are counting.'
    ],
    why: 'An axis with no label leaves a shape that could mean anything, which is the same as meaning nothing.'
  },
  {
    id: 't-hbm906c',
    lesson: 'hb-m9-06',
    prompt: 'What is an axis?',
    choices: [
      'The highest point on the line',
      'The gap between two readings',
      'Another word for a pattern',
      'One of the two labelled lines a graph is built on'
    ],
    answer: 3,
    feedback: [
      'The highest point is a reading, not a line.',
      'That gap is a difference, and it is measured between the axes.',
      'A pattern is something that repeats, and it is not part of the frame.',
      null
    ],
    why: 'The two axes are the frame, one for the days along the bottom and one for the degrees up the side.'
  },
  {
    id: 't-hbm906d',
    lesson: 'hb-m9-06',
    prompt: 'Rain fell on two of fourteen days and both were warm. What can you claim?',
    choices: [
      'Rain always falls on warm days in Georgia',
      'Very little, because two days is not a pattern',
      'Warm weather causes the rain',
      'The next warm day will certainly be wet'
    ],
    answer: 1,
    feedback: [
      '"Always" would need far more than two days behind it.',
      null,
      'Two things happening together does not show that one caused the other.',
      'That is a coin toss dressed up as a forecast.'
    ],
    why: 'Two matching days is a question worth asking, and it is a long way short of being an answer.'
  },
  {
    id: 't-hbm906e',
    lesson: 'hb-m9-06',
    prompt: 'Four of five north-wind days were followed by a cold morning. What is that?',
    choices: [
      'Proof that a north wind always brings cold',
      'Nothing worth recording',
      'A mistake somewhere in your log',
      'A pattern with one exception, and you record both'
    ],
    answer: 3,
    feedback: [
      'Four out of five is strong, but the fifth day means "always" is not true.',
      'It is the most useful thing in the whole log.',
      'The odd day out is data rather than an error.',
      null
    ],
    why: 'Counting the times it held and the times it did not is more honest than a pattern with no holes.'
  },
  {
    id: 't-hbm906f',
    lesson: 'hb-m9-06',
    prompt: 'Why put rainfall bars underneath the temperature line on the same graph?',
    choices: [
      'To use up the spare paper',
      'To see whether the rainy days and the cold days line up',
      'Because rain is always measured in bars',
      'So the graph has two colours'
    ],
    answer: 1,
    feedback: [
      'Space is not a reason to add anything to a graph.',
      null,
      'Bars are a choice here, not a rule about rainfall.',
      'Colour helps you read it, but it is not why the rain is there.'
    ],
    why: 'Two measurements on one picture is how you find out whether they move together.'
  },
  {
    id: 't-hbm906g',
    lesson: 'hb-m9-06',
    prompt: 'Your data and the printed local data disagree on one day. What does that mean?',
    choices: [
      'Both can be right, since they measured different places',
      'Yours must be the wrong one',
      'The printed page must be wrong',
      'One of you invented a number'
    ],
    answer: 0,
    feedback: [
      null,
      'Your station is in your garden, and being different is not the same as being wrong.',
      'A published record is not automatically wrong either.',
      'Honest measurements taken a few miles apart often disagree.'
    ],
    why: 'Rain in particular falls in patches, so two true readings from two places can differ on the same day.'
  },
  {
    id: 't-hbm906h',
    lesson: 'hb-m9-06',
    prompt: 'What is the range of your fourteen temperature readings?',
    choices: [
      'The number in the middle of them',
      'The one that appears most often',
      'The distance between the highest and the lowest',
      'The total when you add them all up'
    ],
    answer: 2,
    feedback: [
      'The middle sort of number is closer to what an average is.',
      'That is which reading is commonest, and it is a different idea.',
      null,
      'A total of fourteen temperatures is not a number that means anything.'
    ],
    why: 'The range says how far the fortnight swung, which is something no single reading could tell you.'
  },
  {
    id: 't-hbm906i',
    lesson: 'hb-m9-06',
    prompt: 'Why does the temperature axis start below your lowest reading, not at zero?',
    choices: [
      'Because zero degrees is impossible',
      'So the line spreads out and its shape can be seen',
      'Because graphs never start at zero',
      'So the paper lasts longer'
    ],
    answer: 1,
    feedback: [
      'Zero degrees is perfectly possible. It is just far below her readings.',
      null,
      'Plenty of graphs do start at zero. It depends what you are showing.',
      'Saving paper is not a reason to choose a scale.'
    ],
    why: 'Forty empty degrees at the bottom would squash a fortnight of real change into a flat line.'
  },
  {
    id: 't-hbm906j',
    lesson: 'hb-m9-06',
    prompt: 'How will your weather log tell you when the corn can go in?',
    choices: [
      'When the calendar reaches a particular date',
      'When the rain gauge fills right up',
      'When the wind settles in one direction',
      'When the soil reading stays warm enough for several days'
    ],
    answer: 3,
    feedback: [
      'A date is a guess about an average year, and this year may not be average.',
      'A full gauge means a wet bucket, which is not what corn is waiting for.',
      'Wind direction matters to the forecast, not to the seed.',
      null
    ],
    why: 'Corn waits for warm soil, so the reading that decides it is one she takes herself, several days running.'
  }
];

/** Every question for one lesson. */
export function itemsForLesson(lessonId) {
  return HERBALISM_M9_BANK.filter((q) => q.lesson === lessonId);
}

/** Every question across a list of lessons — what the weekly test draws from. */
export function itemsForLessons(lessonIds) {
  const set = new Set(lessonIds || []);
  return HERBALISM_M9_BANK.filter((q) => set.has(q.lesson));
}

export function m9BankItemById(id) {
  return HERBALISM_M9_BANK.find((q) => q.id === id) || null;
}

export default HERBALISM_M9_BANK;
