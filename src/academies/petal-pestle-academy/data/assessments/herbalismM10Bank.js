// ---------------------------------------------------------------------------
// HERBALISM & BOTANY — MODULE 10 QUESTION BANK
// READING THE SKY AND THE MAP · Quarter 3, Weeks 3 and 4 · S4E4b and S4E4d
//
// Sixty questions. Ten for each of the six lessons, which is what the two
// weekly tests need: three lessons at ten is a thirty-question pool, an
// eight-question paper draws from it, and a re-take can still be a genuinely
// different paper.
//
// THESE ARE NOT ASKED AT THE END OF THE LESSON. Inside the lesson she answers
// two Apply-Its and a three-question check, five in all. These sixty feed Day 4,
// the morning warm-up, the spaced-review boxes and the extra practice the
// practice gate serves after a poor check.
//
// ---- SHAPE ----
//
// Matched to src/data/assessments/herbalismM3Bank.js, which is what
// scripts/check-assessment.mjs and src/lib/assessmentEngine.js require:
//
//   id        unique across the whole bank
//   lesson    must match a real lesson id
//   prompt    Quarter 3 cap: <= 14 words a sentence
//   choices   exactly 4, all different, none over 15 words
//   answer    0-3
//   feedback  exactly 4, NULL in the answer slot, a real sentence in the rest
//   why       required, shown on the review screen
//
// IDS. The repo convention is t-hb + m + module + two-digit lesson + letter.
// For a two-digit module that gives t-hbm10 + 01 + a, so t-hbm1001a through
// t-hbm1006j. It reads awkwardly beside Module 1's t-hbm101a but it does not
// collide with it, and one rule is better than two.
//
// ---- READING LEVEL: QUARTER 3, WHICH IS HARDER ON PURPOSE ----
//
// LESSON-SPEC-Q3Q4 raises the bar: prompts up to 14 words a sentence, choices up
// to 15 words, long-word rate up to 10 percent. Quarter 1 and 2 ran at Flesch-
// Kincaid 1.3, which by March would be holding her back. So these questions use
// subordinate clauses — because, unless, while, even though — and several of
// them need two steps of reasoning rather than one lookup.
//
// WARNING FOR THE BUILD: scripts/check-assessment.mjs in this checkout still
// carries the Quarter 1 caps (11 words, 6 percent, 12-word choices) and has NOT
// been given the per-quarter caps the Q3/Q4 spec describes. Until it is, this
// bank will trip it, and that is the checker being out of date rather than the
// questions being wrong. It also needs the weather vocabulary added to SUBJECT —
// the list is in the header of m10Lessons.js, judgement call 6.
//
// ---- THE DISTRACTOR RULE, APPLIED LITERALLY ----
//
// Where a question's payload is vocabulary, the three wrong choices are the
// OTHER WORDS FROM THAT LESSON. Ask which symbol means a cold front and the
// wrong answers are the warm front symbol, the stationary front symbol and the
// pressure letters — so a miss names the exact thing that has not landed. No
// filler, and no obviously silly option to pad the four out.
//
// ---- LOCAL NUMBERS ----
//
// Every Atlanta date in here is sourced in the header of m10Lessons.js: average
// first freeze 13 November and record extremes from NWS Peachtree City, most
// likely last frost 27 March from the Atlanta record, zone 8 from the 2023 USDA
// map via UGA Extension, and ginger at eight to ten months from UGA Extension.
// Nothing here is rounded to make a question tidier.
//
// ---- SAFETY ----
//
// No dosing, no treatment, no "good for". This whole module is maps, numbers,
// dates and decisions, and it never touches what a plant does to a body. Three
// questions carry a safety rule instead: t-hbm1001j (thunder means indoors),
// t-hbm1003j (nothing is planted or moved without a grown-up) and t-hbm1006j
// (plastic straight onto leaves overnight does harm).
// ---------------------------------------------------------------------------

export const HERBALISM_M10_BANK = [
  // =========================================================================
  // hb-m10-01 · What a weather map shows · S4E4b
  // =========================================================================
  {
    id: 't-hbm1001a',
    lesson: 'hb-m10-01',
    prompt: 'On a weather map, what does a green patch show?',
    choices: ['Precipitation', 'Warm air', 'High pressure', 'A cold front'],
    answer: 0,
    feedback: [
      null,
      'Temperature is shown by the background colour, not by patches.',
      'Pressure is marked with a letter, either H or L.',
      'A front is a line with symbols on it, never a patch.'
    ],
    why: 'Green and blue patches are the precipitation layer, so that is rain falling right now.'
  },
  {
    id: 't-hbm1001b',
    lesson: 'hb-m10-01',
    prompt: 'A weather map is really a picture of what?',
    choices: [
      'A photograph taken from space',
      'Measurements drawn on top of a map',
      'What a meteorologist hopes will happen',
      'The colour of the sky today'
    ],
    answer: 1,
    feedback: [
      'Satellite pictures exist, but a surface map is drawn from instrument readings.',
      null,
      'Hoping is not measuring, and a map is built out of measurements.',
      'The colours stand for temperature, not for how the sky looks.'
    ],
    why: 'Every mark on a weather map came off an instrument somewhere, which is why it can be trusted.'
  },
  {
    id: 't-hbm1001c',
    lesson: 'hb-m10-01',
    prompt: 'What does the letter H mean on a weather map?',
    choices: ['Heavy rain', 'Hot weather', 'High pressure', 'Hurricane'],
    answer: 2,
    feedback: [
      'Rain is a green or blue patch, not a letter.',
      'Heat is shown by colour, and an H can sit over a very cold place.',
      null,
      'A hurricane has its own symbol and its own warning.'
    ],
    why: 'H marks high pressure, where the air is sinking, so the sky tends to clear.'
  },
  {
    id: 't-hbm1001d',
    lesson: 'hb-m10-01',
    prompt: 'Which layer of the map is shown by colour?',
    choices: ['Wind', 'Pressure', 'Fronts', 'Temperature'],
    answer: 3,
    feedback: [
      'Wind is drawn with arrows or barbs, not with a colour wash.',
      'Pressure gets a letter, H or L, rather than a colour.',
      'Fronts are lines with triangles or half circles along them.',
      null
    ],
    why: 'The colour wash across a weather map is the temperature layer, warm at one end and cold at the other.'
  },
  {
    id: 't-hbm1001e',
    lesson: 'hb-m10-01',
    prompt: 'Rain sits over Alabama and is drifting east. What is likely in Atlanta tomorrow?',
    choices: ['Rain arriving', 'A dry, sunny day', 'Snow instead', 'Nothing can be said'],
    answer: 0,
    feedback: [
      null,
      'The rain is heading straight this way, so dry is the least likely answer.',
      'Rain does not become snow just by crossing a state line.',
      'Direction and distance together are exactly what a prediction is made from.'
    ],
    why: 'Weather here travels west to east, so what is over Alabama today often reaches Atlanta tomorrow.'
  },
  {
    id: 't-hbm1001f',
    lesson: 'hb-m10-01',
    prompt: 'Why does a Georgia gardener look west on the map rather than east?',
    choices: [
      'Because west is always colder',
      'Because weather here moves west to east',
      'Because the map is printed that way',
      'Because rain only forms in the west'
    ],
    answer: 1,
    feedback: [
      'West is not colder. It is simply where the next system is coming from.',
      null,
      'Which way a map is printed changes nothing about the air.',
      'Rain forms wherever air rises, which happens all over the country.'
    ],
    why: 'Systems travel west to east across the United States, so tomorrow is usually to the left of her star.'
  },
  {
    id: 't-hbm1001g',
    lesson: 'hb-m10-01',
    prompt: 'What turns a weather map into a forecast?',
    choices: [
      'Waiting until tomorrow morning',
      'Printing it in colour',
      'Knowing which way the weather is travelling',
      'Adding more symbols to it'
    ],
    answer: 2,
    feedback: [
      'Waiting until tomorrow is not predicting. It is just finding out.',
      'Colour makes it easier to read, but it does not make it a prediction.',
      null,
      'More symbols would only crowd the map. Direction is what matters.'
    ],
    why: 'A map shows today. Movement is the extra piece that lets you say something about tomorrow.'
  },
  {
    id: 't-hbm1001h',
    lesson: 'hb-m10-01',
    prompt: 'Which of these is NOT a layer on a weather map?',
    choices: ['Temperature', 'Precipitation', 'Pressure', 'Soil type'],
    answer: 3,
    feedback: [
      'Temperature is the colour layer, and it is definitely on there.',
      'Precipitation shows as green and blue patches.',
      'Pressure is marked with H and L on every surface map.',
      null
    ],
    why: 'A weather map measures the air. What the ground is made of belongs on a different map altogether.'
  },
  {
    id: 't-hbm1001i',
    lesson: 'hb-m10-01',
    prompt: 'Why do you write a prediction down and date it before checking?',
    choices: [
      'So you cannot quietly change it later',
      'So it comes true',
      'So Gigi can mark it',
      'So the map stays tidy'
    ],
    answer: 0,
    feedback: [
      null,
      'Writing something down has no effect at all on the weather.',
      'Nothing here is marked. A prediction that missed is worth the same petals.',
      'The map is not affected by anything written in the log.'
    ],
    why: 'A prediction written afterwards is not a prediction. Dating it is what makes it honest.'
  },
  {
    id: 't-hbm1001j',
    lesson: 'hb-m10-01',
    prompt: 'You go out to check the sky and hear thunder. What do you do?',
    choices: [
      'Finish the reading quickly first',
      'Go indoors and read the map from there',
      'Stand under a tree until it passes',
      'Keep going unless you see lightning'
    ],
    answer: 1,
    feedback: [
      'Hurrying does not make you any safer. Distance from the storm does.',
      null,
      'A tree is one of the worst places to shelter in a thunderstorm.',
      'If you can hear thunder, you are already close enough to be struck.'
    ],
    why: 'Thunder means the storm is within reach of you, so the rule is simple: hear it, go inside.'
  },

  // =========================================================================
  // hb-m10-02 · Fronts, highs and lows · S4E4b
  // =========================================================================
  {
    id: 't-hbm1002a',
    lesson: 'hb-m10-02',
    prompt: 'Blue triangles along a line on the map mean which kind of front?',
    choices: ['Cold', 'Warm', 'Stationary', 'None, that is pressure'],
    answer: 0,
    feedback: [
      null,
      'A warm front is drawn in red with half circles along it.',
      'A stationary front carries both symbols on the same line.',
      'Pressure is marked with a letter, not with a toothed line.'
    ],
    why: 'Blue with triangles is the cold front symbol, and the triangles point the way it is moving.'
  },
  {
    id: 't-hbm1002b',
    lesson: 'hb-m10-02',
    prompt: 'What is a front, in plain words?',
    choices: [
      'A line of heavy rain',
      'The border where two air masses meet',
      'The edge of a state',
      'A row of clouds moving north'
    ],
    answer: 1,
    feedback: [
      'Rain often comes with a front, but the front itself is the border.',
      null,
      'Nothing on a weather map cares where a state ends.',
      'Clouds mark a front sometimes, but they are not what it is.'
    ],
    why: 'Air travels in huge masses, and the front is simply the boundary where two of them press together.'
  },
  {
    id: 't-hbm1002c',
    lesson: 'hb-m10-02',
    prompt: 'A front on the map has triangles AND half circles on it. What is it?',
    choices: ['Cold', 'Warm', 'Stationary', 'Drawn wrongly'],
    answer: 2,
    feedback: [
      'A cold front carries triangles on their own.',
      'A warm front carries half circles on their own.',
      null,
      'Both symbols together is a proper marking, not a mistake.'
    ],
    why: 'Both sets of symbols means the front has stalled, so its weather sits over you instead of passing.'
  },
  {
    id: 't-hbm1002d',
    lesson: 'hb-m10-02',
    prompt: 'What usually follows a cold front through Georgia?',
    choices: [
      'Days of grey drizzle that never lifts',
      'A short hard burst of rain, then cooler and clearer',
      'Slowly rising temperatures and no rain',
      'Nothing changes at all'
    ],
    answer: 1,
    feedback: [
      'Grey and endless is what a stalled front does, not a cold front.',
      null,
      'A cold front brings colder air behind it, which is the whole point.',
      'A front is the edge of different air, so something always changes.'
    ],
    why: 'Cold air shoves under the warm air quickly, which gives a sharp burst of rain and then a clearing.'
  },
  {
    id: 't-hbm1002e',
    lesson: 'hb-m10-02',
    prompt: 'Under an H the air is doing what?',
    choices: ['Sinking', 'Rising', 'Standing still', 'Turning to rain'],
    answer: 0,
    feedback: [
      null,
      'Rising air is what happens under an L, and it is how clouds get made.',
      'Air is never quite still, and under a high it is coming down.',
      'Air itself does not turn into rain. The water in it does.'
    ],
    why: 'Sinking air under a high breaks up cloud and drops the wind, which is why highs mean calm and clear.'
  },
  {
    id: 't-hbm1002f',
    lesson: 'hb-m10-02',
    prompt: 'Why does rising air under an L make clouds?',
    choices: [
      'Because it picks up dust on the way up',
      'Because rising air cools, and cool air makes cloud',
      'Because the sun is stronger up high',
      'Because lows are always over water'
    ],
    answer: 1,
    feedback: [
      'Dust helps droplets form, but the cooling is what does the work.',
      null,
      'Height does not make sunlight stronger in the way this suggests.',
      'Lows form over land just as readily as over water.'
    ],
    why: 'Air cools as it rises, and cooler air cannot hold as much water, so the water shows up as cloud.'
  },
  {
    id: 't-hbm1002g',
    lesson: 'hb-m10-02',
    prompt: 'A cold front passes Tuesday and a big H follows. What is Wednesday night likely to be?',
    choices: [
      'Warm with heavy rain',
      'Cloudy, windy and mild',
      'Clear, calm and cold',
      'The same as Tuesday'
    ],
    answer: 2,
    feedback: [
      'Heavy rain needs rising air, and under a high the air is sinking.',
      'Cloud and wind come with a low, and a high does the opposite.',
      null,
      'The front changed the air over us, so Wednesday cannot match Tuesday.'
    ],
    why: 'Behind a cold front a high brings sinking air, so the sky clears, the wind drops and the heat escapes.'
  },
  {
    id: 't-hbm1002h',
    lesson: 'hb-m10-02',
    prompt: 'Which way do the triangles on a cold front point?',
    choices: [
      'Towards the nearest H',
      'North, always',
      'Back the way it came',
      'The way the front is moving'
    ],
    answer: 3,
    feedback: [
      'The symbols have nothing to do with where the pressure centres sit.',
      'A front can move in any direction, and the symbols follow it.',
      'That would tell you where it has been, which helps nobody.',
      null
    ],
    why: 'The symbol carries two things at once: which kind of front it is, and which way it is travelling.'
  },
  {
    id: 't-hbm1002i',
    lesson: 'hb-m10-02',
    prompt: 'Which front would annoy a gardener most, and why?',
    choices: [
      'A stationary front, because its rain hangs about for days',
      'A cold front, because it clears up quickly',
      'A warm front, because it brings warmer air',
      'None of them bother a garden'
    ],
    answer: 0,
    feedback: [
      null,
      'Clearing up quickly is the easiest of the three to work around.',
      'Warmer air is usually welcome in a Georgia spring.',
      'Soaked soil, a lost planting day and no drying time all bother a garden.'
    ],
    why: 'A front that will not move keeps its cloud and rain over the same spot, so nothing dries and nothing gets done.'
  },
  {
    id: 't-hbm1002j',
    lesson: 'hb-m10-02',
    prompt: 'Why is a clear, still night colder than a cloudy, windy one?',
    choices: [
      'Clouds are warmer than clear sky',
      'The ground loses its heat fastest with no cloud and no wind',
      'Wind blows warm air away',
      'Stars make the air colder'
    ],
    answer: 1,
    feedback: [
      'Cloud is not warm. It acts like a lid that slows the heat escaping.',
      null,
      'Wind actually mixes the air, which keeps the ground from getting as cold.',
      'Stars are far too distant to change anything in your garden.'
    ],
    why: 'Cloud traps heat and wind mixes it, so a clear, still night lets the ground shed heat with nothing in the way.'
  },

  // =========================================================================
  // hb-m10-03 · Should I plant this week? · S4E4b
  // =========================================================================
  {
    id: 't-hbm1003a',
    lesson: 'hb-m10-03',
    prompt: 'A forecast says 40% chance of rain. What does that mean?',
    choices: [
      'Rain fell on four in ten days that looked like this',
      'Rain will cover 40% of the sky',
      'It will rain for 40% of the day',
      'It will definitely rain a little'
    ],
    answer: 0,
    feedback: [
      null,
      'It is not a share of the sky. It is a chance worked out from past days.',
      'It says nothing about how long the rain lasts.',
      'Nothing is definite about a 40 percent chance.'
    ],
    why: 'A percentage in a forecast is a likelihood, built from what happened on days like this one before.'
  },
  {
    id: 't-hbm1003b',
    lesson: 'hb-m10-03',
    prompt: 'The forecast said 20% rain and it rained. Was the forecast wrong?',
    choices: [
      'Yes, it should have said 100%',
      'No, because 20% still happens sometimes',
      'Yes, forecasts are always wrong',
      'No, because 20% means no rain'
    ],
    answer: 1,
    feedback: [
      'Nobody could know that days ahead, which is exactly why it is a chance.',
      null,
      'They are right far more often than not, which is why people read them.',
      'Twenty percent means rain is not likely. It does not mean it cannot happen.'
    ],
    why: 'A small chance is not no chance, so one wet Saturday cannot prove a percentage wrong.'
  },
  {
    id: 't-hbm1003c',
    lesson: 'hb-m10-03',
    prompt: 'Which forecast number matters most to a ginger plant in a container?',
    choices: ['The afternoon high', 'The chance of rain', 'The overnight low', 'The sunrise time'],
    answer: 2,
    feedback: [
      'A warm afternoon does not undo a cold night.',
      'Rain does not end a tropical plant, but cold does.',
      null,
      'The clock is not what harms a plant.'
    ],
    why: 'Ginger is tropical, so the coldest part of the night is the number that decides whether it survives.'
  },
  {
    id: 't-hbm1003d',
    lesson: 'hb-m10-03',
    prompt: 'Tonight the low is 55 and tomorrow night it is 34. What is the plan?',
    choices: [
      'Bring the tender pots in both nights',
      'Leave them out both nights',
      'Bring them in tonight only',
      'Leave them out tonight, bring them in tomorrow'
    ],
    answer: 3,
    feedback: [
      'Fifty-five harms nothing, so tonight is heavy work for no reason at all.',
      'Thirty-four is close enough to freezing to end a tropical plant.',
      'That is backwards. The dangerous night is the second one.',
      null
    ],
    why: 'The choice follows the number for that one night, not an average across the week.'
  },
  {
    id: 't-hbm1003e',
    lesson: 'hb-m10-03',
    prompt: 'Why does a written decision need a reason beside it?',
    choices: [
      'So it can be checked afterwards',
      'So it looks more scientific',
      'So Gigi can grade it',
      'So it takes up more of the page'
    ],
    answer: 0,
    feedback: [
      null,
      'Looking scientific is not the same as being useful later.',
      'Nothing here is graded, right call or wrong call.',
      'Filling the page is not the point of anything in this course.'
    ],
    why: 'On Sunday she compares the reason with what really happened, and that is how the next call gets better.'
  },
  {
    id: 't-hbm1003f',
    lesson: 'hb-m10-03',
    prompt: 'The forecast says 38 degrees. Could her own back yard be colder than that?',
    choices: [
      'No, a forecast is exact',
      'Yes, a forecast covers a whole area, not one yard',
      'Only if it rains',
      'Only in the middle of winter'
    ],
    answer: 1,
    feedback: [
      'A forecast covers many square miles, so it cannot be exact for one garden.',
      null,
      'Rain has nothing to do with it. Low spots and clear skies do.',
      'It can happen in any season with a clear, still night.'
    ],
    why: 'Cold air settles in low spots, so a yard can easily run a few degrees under the forecast number.'
  },
  {
    id: 't-hbm1003g',
    lesson: 'hb-m10-03',
    prompt: 'Which three numbers does a gardener take off the forecast?',
    choices: [
      'Humidity, pressure, visibility',
      'Sunrise, sunset, moon phase',
      'Overnight low, chance of rain, wind',
      'Yesterday, today and tomorrow'
    ],
    answer: 2,
    feedback: [
      'A meteorologist uses those. A gardener needs a shorter list.',
      'Those matter to other jobs, but they will not save a tender plant.',
      null,
      'Those are days, not numbers you can act on.'
    ],
    why: 'Cold can kill, rain decides watering, and wind dries soil and knocks young plants over.'
  },
  {
    id: 't-hbm1003h',
    lesson: 'hb-m10-03',
    prompt: 'Why copy the forecast numbers exactly instead of rounding them?',
    choices: [
      'Because the numbers change anyway',
      'Because rounding takes longer',
      'Because the table looks neater',
      'Because 33 and 35 lead to different decisions'
    ],
    answer: 3,
    feedback: [
      'They do change, and that is a reason to record them, not to blur them.',
      'Rounding is quicker, which is exactly the temptation to resist.',
      'A neat table that lost the useful digit is worth nothing.',
      null
    ],
    why: 'Near freezing, two degrees is the whole decision, so a rounded number can cost her the plant.'
  },
  {
    id: 't-hbm1003i',
    lesson: 'hb-m10-03',
    prompt: 'It is Sunday and the week went another way. Was her call wrong?',
    choices: [
      'Not necessarily, a good call can still be unlucky',
      'Yes, because the outcome was different',
      'Yes, forecasts cannot be trusted',
      'No, decisions are never wrong'
    ],
    answer: 0,
    feedback: [
      null,
      'Judging only by the result would make luck look like skill.',
      'They are trusted for good reason, and this week does not change that.',
      'Decisions certainly can be wrong. This one just might not be.'
    ],
    why: 'She judges the decision by whether the reasoning was sound, not only by how the week turned out.'
  },
  {
    id: 't-hbm1003j',
    lesson: 'hb-m10-03',
    prompt: 'She decides a container must move tonight. What happens next?',
    choices: [
      'She carries it in on her own',
      'A grown-up helps her move it',
      'She drags it across the yard',
      'She waits until morning'
    ],
    answer: 1,
    feedback: [
      'A container of wet soil is far heavier than it looks.',
      null,
      'Dragging it damages the roots and it is no safer for her.',
      'Morning is too late. The damage happens overnight.'
    ],
    why: 'Nothing gets planted, moved or tasted without a grown-up, and wet containers are heavy enough to hurt.'
  },

  // =========================================================================
  // hb-m10-04 · Weather is not climate · S4E4d
  // =========================================================================
  {
    id: 't-hbm1004a',
    lesson: 'hb-m10-04',
    prompt: 'Which of these sentences is about climate?',
    choices: [
      'Georgia summers are hot and wet most years',
      'It is raining in Atlanta right now',
      'A storm is coming tonight',
      'It hit 94 degrees on Tuesday'
    ],
    answer: 0,
    feedback: [
      null,
      'Right now is the giveaway, and a reading is weather.',
      'One night can never be a pattern.',
      'One Tuesday is one day, and climate needs years of them.'
    ],
    why: 'Most years is the phrase that makes it climate, because it describes a pattern rather than a reading.'
  },
  {
    id: 't-hbm1004b',
    lesson: 'hb-m10-04',
    prompt: 'What is weather?',
    choices: [
      'The pattern of many years put together',
      'What the air is doing right now, where you are',
      'The average of thirty years of readings',
      'What the air does every summer'
    ],
    answer: 1,
    feedback: [
      'A pattern over many years is climate, not weather.',
      null,
      'An average of thirty years is exactly what climate means.',
      'Every summer is a pattern, and patterns are climate.'
    ],
    why: 'Weather is a single reading, and it can change inside an hour.'
  },
  {
    id: 't-hbm1004c',
    lesson: 'hb-m10-04',
    prompt: 'About how many years of records do scientists want before calling something climate?',
    choices: ['About one', 'About three', 'About thirty', 'About three hundred'],
    answer: 2,
    feedback: [
      'One year is a single trip round the sun, and it proves nothing.',
      'Three years is still weather, and a run of odd years would fool you.',
      null,
      'That is far longer than the records for most places go back.'
    ],
    why: 'Thirty years is long enough that a few strange years cannot shift the average very far.'
  },
  {
    id: 't-hbm1004d',
    lesson: 'hb-m10-04',
    prompt: 'It snowed in Atlanta in January. Does that prove Georgia has a cold climate?',
    choices: [
      'No, because snow is not weather',
      'Yes, snow proves it',
      'Yes, if it snows twice',
      'No, one day cannot set an average'
    ],
    answer: 3,
    feedback: [
      'Snow is certainly weather. The trouble is with the reasoning.',
      'A day that stands out is the worst possible day to build a rule on.',
      'Two unusual days are still unusual days, not a thirty-year pattern.',
      null
    ],
    why: 'Climate is an average of thousands of readings, so one striking day barely moves it.'
  },
  {
    id: 't-hbm1004e',
    lesson: 'hb-m10-04',
    prompt: 'Dr Shepherd says weather is your mood. What is climate in the same sentence?',
    choices: ['Your personality', 'Your birthday', 'Your favourite season', 'Your temper today'],
    answer: 0,
    feedback: [
      null,
      'A birthday is a single date, and it changes nothing about you.',
      'What you like is a preference, not a long-run pattern of the air.',
      'Today is a mood again, which is the weather side of it.'
    ],
    why: 'A mood is one afternoon and a personality is the pattern of thousands of them. So is climate.'
  },
  {
    id: 't-hbm1004f',
    lesson: 'hb-m10-04',
    prompt: 'What is a thirty-year normal?',
    choices: [
      'The hottest day ever recorded there',
      'The average for a place on a particular date',
      'What the weather will do tomorrow',
      'A rule the weather has to follow'
    ],
    answer: 1,
    feedback: [
      'That is a record, and records are the opposite of normal.',
      null,
      'Tomorrow is a forecast, and a forecast is not an average.',
      'The weather follows nothing. A normal only describes what usually happens.'
    ],
    why: 'A normal is worked out from thirty years of readings for that date, which is why today can miss it.'
  },
  {
    id: 't-hbm1004g',
    lesson: 'hb-m10-04',
    prompt: 'Today was eight degrees above the normal. Has the climate changed?',
    choices: [
      'No, climates never change',
      'Yes, definitely',
      'You cannot tell from one day',
      'Only if tomorrow is warm too'
    ],
    answer: 2,
    feedback: [
      'Climates do change, but not on the evidence of one afternoon.',
      'One day above normal is ordinary. Half of all days are above it.',
      null,
      'Two days is barely better than one for answering a question like this.'
    ],
    why: 'An average has days above it and days below it, so a single reading tells you nothing about the pattern.'
  },
  {
    id: 't-hbm1004h',
    lesson: 'hb-m10-04',
    prompt: 'Why do scientists keep written records instead of relying on memory?',
    choices: [
      'Memory is always completely wrong',
      'Writing is faster than remembering',
      'Records are needed for the news',
      'Memory keeps the dramatic days and loses the ordinary ones'
    ],
    answer: 3,
    feedback: [
      'Memory is not useless, it is just uneven, and averages need every day.',
      'Speed is not the point. Being able to check it years later is.',
      'The news may use them, but that is not why they are kept.',
      null
    ],
    why: 'An average needs the dull days as much as the dramatic ones, and only writing them down keeps both.'
  },
  {
    id: 't-hbm1004i',
    lesson: 'hb-m10-04',
    prompt: 'Which of these would you check by looking out of the window?',
    choices: [
      'Whether it is raining',
      'Whether summers here are humid',
      'Whether winters here are mild',
      'Whether it snows most years'
    ],
    answer: 0,
    feedback: [
      null,
      'That would take years of summers to answer properly.',
      'Mild winters is a pattern, and one window cannot show you a pattern.',
      'Most years is climate, and the window only shows you today.'
    ],
    why: 'If a window answers it, it is weather. If it would take years of records, it is climate.'
  },
  {
    id: 't-hbm1004j',
    lesson: 'hb-m10-04',
    prompt: 'Which one decides what she can grow at all?',
    choices: ['Today\'s weather', 'Climate', 'The morning forecast', 'The radar picture'],
    answer: 1,
    feedback: [
      'Today decides watering and covering, not what is worth planting.',
      null,
      'A forecast reaches a week ahead. A growing season is years of data.',
      'Radar shows rain right now, which is as short a view as there is.'
    ],
    why: 'Weather decides today\'s watering. Climate decides what a Georgia garden can grow at all.'
  },

  // =========================================================================
  // hb-m10-05 · Georgia's growing season · S4E4d
  // =========================================================================
  {
    id: 't-hbm1005a',
    lesson: 'hb-m10-05',
    prompt: 'What does the growing season measure?',
    choices: [
      'Days between the last and first freeze',
      'How cold the coldest night gets',
      'How much rain falls in a year',
      'How many hours of sun there are'
    ],
    answer: 0,
    feedback: [
      null,
      'That is the hardiness zone, which is a different measurement.',
      'Rainfall matters to a garden, but this number does not count it.',
      'Sunshine hours are useful, but the season is counted in frost-free days.'
    ],
    why: 'The growing season is a length of time: the frost-free stretch between spring and autumn.'
  },
  {
    id: 't-hbm1005b',
    lesson: 'hb-m10-05',
    prompt: 'Roughly how long is the frost-free season around Atlanta?',
    choices: ['About 90 days', 'About 150 days', 'About 230 days', 'All year round'],
    answer: 2,
    feedback: [
      'Ninety days is closer to a short northern summer.',
      'A hundred and fifty would be a much colder state than Georgia.',
      null,
      'Atlanta freezes most winters, so it is not frost-free all year.'
    ],
    why: 'From about the 27th of March to about the 13th of November is roughly 230 days.'
  },
  {
    id: 't-hbm1005c',
    lesson: 'hb-m10-05',
    prompt: 'A hardiness zone tells you what?',
    choices: [
      'How much rain a place gets',
      'How long the growing season is',
      'How cold an average winter gets',
      'Which crops are popular there'
    ],
    answer: 2,
    feedback: [
      'Rainfall is not part of the zone at all.',
      'Two places in the same zone can have very different season lengths.',
      null,
      'Nothing about a zone is about what people like to plant.'
    ],
    why: 'A zone answers one question: how cold does the coldest night of an average year get?'
  },
  {
    id: 't-hbm1005d',
    lesson: 'hb-m10-05',
    prompt: 'Ginger needs nine months. Atlanta gives seven and a half outdoors. So?',
    choices: [
      'It should be planted in autumn',
      'It cannot be grown in Georgia',
      'It grows faster here to catch up',
      'It has to start indoors, early'
    ],
    answer: 3,
    feedback: [
      'Autumn planting suits garlic. Ginger would meet the freeze at once.',
      'People grow it here every year. They simply do not start it outdoors.',
      'A plant does not speed up because the calendar is short.',
      null
    ],
    why: 'Nine months will not fit inside seven and a half, so the missing weeks happen indoors.'
  },
  {
    id: 't-hbm1005e',
    lesson: 'hb-m10-05',
    prompt: 'Atlanta moved from zone 7b to zone 8 on the 2023 map. What changed?',
    choices: [
      'Thirty years of temperature records',
      'The city moved south',
      'Somebody redrew the state lines',
      'Gardeners voted for it'
    ],
    answer: 0,
    feedback: [
      null,
      'Atlanta is exactly where it always was.',
      'State lines have nothing to do with hardiness zones.',
      'Nobody votes on a measurement.'
    ],
    why: 'The map is built from records, so when the records shifted the map shifted with them. That is climate.'
  },
  {
    id: 't-hbm1005f',
    lesson: 'hb-m10-05',
    prompt: 'Two towns are both zone 8, but one has a shorter season. Is that possible?',
    choices: [
      'No, the zone sets the season',
      'Yes, a zone only measures winter cold',
      'Only if one is in Georgia',
      'No, zone 8 is the same everywhere'
    ],
    answer: 1,
    feedback: [
      'A zone is one number about winter, and it says nothing about summer.',
      null,
      'The state name changes nothing. The measurement is what counts.',
      'Two places can share a coldest night and still have very different years.'
    ],
    why: 'Winter cold and season length are two separate measurements, so they do not have to match.'
  },
  {
    id: 't-hbm1005g',
    lesson: 'hb-m10-05',
    prompt: 'Which of her four crops crosses the whole Georgia winter outdoors?',
    choices: ['Ginger', 'Corn', 'Garlic', 'Turmeric'],
    answer: 2,
    feedback: [
      'Ginger is tropical and would not survive a winter outside.',
      'Corn waits for the last frost, so it starts after winter is done.',
      null,
      'Turmeric is tropical too, and it comes up before the freeze.'
    ],
    why: 'Garlic is planted in autumn, sits through the winter, and is lifted in early summer.'
  },
  {
    id: 't-hbm1005h',
    lesson: 'hb-m10-05',
    prompt: 'Why does corn have to wait until after the last frost date?',
    choices: [
      'Corn only grows in autumn',
      'Corn seeds need frost first',
      'The days are too short before then',
      'Frost would kill the young plants'
    ],
    answer: 3,
    feedback: [
      'Corn is a warm-season crop, and autumn is when it comes out.',
      'Some seeds do want a cold spell, but corn is not one of them.',
      'Day length is not the problem in late March. Cold is.',
      null
    ],
    why: 'Corn is not hardy, so putting it out before the last frost risks losing the whole planting.'
  },
  {
    id: 't-hbm1005i',
    lesson: 'hb-m10-05',
    prompt: 'Where do the growing season dates actually come from?',
    choices: [
      'Decades of recorded freeze dates',
      'A rule set by the state',
      'What gardeners remember',
      'The date on the seed packet'
    ],
    answer: 0,
    feedback: [
      null,
      'No state can decide when the air freezes.',
      'Memory keeps the dramatic years and loses the ordinary ones.',
      'A packet gives advice, but the dates behind it came from records.'
    ],
    why: 'They are averages worked out from decades of measurements, which is what makes them climate.'
  },
  {
    id: 't-hbm1005j',
    lesson: 'hb-m10-05',
    prompt: 'A crop needs 30 days. Will it fit inside a 230 day season?',
    choices: [
      'No, it is far too long',
      'Yes, easily, with room for more sowings',
      'Only if it is started indoors',
      'Only in a warmer zone'
    ],
    answer: 1,
    feedback: [
      'Thirty is much smaller than 230, so it fits with a great deal to spare.',
      null,
      'A crop that quick has no need of an indoor start here.',
      'A warmer zone would not change the arithmetic at all.'
    ],
    why: 'Comparing the crop\'s days with the season\'s days is the whole method, and 30 fits inside 230 many times over.'
  },

  // =========================================================================
  // hb-m10-06 · First frost, last frost · S4E4d
  // =========================================================================
  {
    id: 't-hbm1006a',
    lesson: 'hb-m10-06',
    prompt: 'When is Atlanta\'s first freeze, on average?',
    choices: ['Mid September', 'Mid October', 'Mid November', 'Mid January'],
    answer: 2,
    feedback: [
      'September is far too early. The record earliest is October.',
      'It has happened in October, but that was a record, not the average.',
      null,
      'By January the first freeze is long past.'
    ],
    why: 'The average first freeze for Atlanta lands around the 13th of November.'
  },
  {
    id: 't-hbm1006b',
    lesson: 'hb-m10-06',
    prompt: 'When is Atlanta\'s last frost of spring, most likely?',
    choices: ['Late January', 'Late February', 'Late March', 'Late May'],
    answer: 2,
    feedback: [
      'January is deep in the frost season, not the end of it.',
      'February is the earliest it has ever finished, not the usual date.',
      null,
      'By late May the season has been running for weeks.'
    ],
    why: 'Around the 27th of March is the most likely last frost for Atlanta, give or take a good deal.'
  },
  {
    id: 't-hbm1006c',
    lesson: 'hb-m10-06',
    prompt: 'What is the difference between a frost and a freeze?',
    choices: [
      'They mean exactly the same',
      'A frost is colder than a freeze',
      'A freeze means the air reaches 32 or below',
      'A frost only happens in winter'
    ],
    answer: 2,
    feedback: [
      'They overlap, but frost can form while the air is still above freezing.',
      'It is the other way round. A freeze is the harder of the two.',
      null,
      'Frost appears in autumn and spring too, which is why her dates matter.'
    ],
    why: 'A freeze is about the air temperature. Frost is ice forming on surfaces, and it can happen a little warmer.'
  },
  {
    id: 't-hbm1006d',
    lesson: 'hb-m10-06',
    prompt: 'The last frost date is 27 March. Can it frost on 5 April?',
    choices: [
      'Only in the mountains',
      'No, frost stops on that date',
      'Only if it snows first',
      'Yes, the date is only an average'
    ],
    answer: 3,
    feedback: [
      'It has happened in Atlanta itself, in late April, more than once.',
      'Nothing about the weather obeys a date on a calendar.',
      'Snow has nothing to do with it. An average simply has two sides.',
      null
    ],
    why: 'An average sits in the middle of a range, so roughly half of all years run later than it.'
  },
  {
    id: 't-hbm1006e',
    lesson: 'hb-m10-06',
    prompt: 'Clear sky, no wind, forecast low of 36. Which containers go on the porch?',
    choices: [
      'The ginger and the turmeric',
      'The garlic on its own',
      'None, 36 is safe',
      'All four of them'
    ],
    answer: 0,
    feedback: [
      null,
      'Garlic is the hardy one, so it is the one that stays out.',
      'On a clear, still night 36 in the forecast can still leave frost on a leaf.',
      'Carrying the hardy ones is heavy work that buys her nothing.'
    ],
    why: 'Ginger and turmeric are tropical, and a clear still night is when frost forms most easily.'
  },
  {
    id: 't-hbm1006f',
    lesson: 'hb-m10-06',
    prompt: 'Why can frost form when the porch thermometer says 36?',
    choices: [
      'Thermometers are usually broken',
      'The air touching a cold leaf is colder than the air higher up',
      'Frost forms at any temperature',
      'The thermometer is in the wrong yard'
    ],
    answer: 1,
    feedback: [
      'A working thermometer is telling the truth about where it is hanging.',
      null,
      'Frost needs the surface at freezing, which is not any temperature.',
      'It is the right yard. It is just five feet off the ground.'
    ],
    why: 'A thermometer reads the air around it, and the leaf surface below it can be several degrees colder.'
  },
  {
    id: 't-hbm1006g',
    lesson: 'hb-m10-06',
    prompt: 'Why weight the edges of a frost cover down to the ground?',
    choices: [
      'To keep insects out overnight',
      'To stop the plant growing through it',
      'To keep the heat rising from the soil underneath',
      'To make it look tidy'
    ],
    answer: 2,
    feedback: [
      'Insects are not the problem on a frost night.',
      'A plant does not grow enough overnight for that to matter.',
      null,
      'How it looks makes no difference to whether the plant survives.'
    ],
    why: 'The warmth comes up out of the soil, so a cover only works if it traps that heat instead of letting it escape.'
  },
  {
    id: 't-hbm1006h',
    lesson: 'hb-m10-06',
    prompt: 'Why water the soil in the afternoon before a frost night?',
    choices: [
      'It makes the leaves stronger',
      'Water freezes and warms the plant',
      'It washes the frost off early',
      'Damp soil holds heat better than dry soil'
    ],
    answer: 3,
    feedback: [
      'A drink in the afternoon does not toughen a tropical leaf.',
      'Freezing water is not a way to warm anything in a garden.',
      'The frost has not arrived yet, so there is nothing to wash off.',
      null
    ],
    why: 'Wet soil takes in more heat during the day and gives it back slowly at night, which lifts the temperature a little.'
  },
  {
    id: 't-hbm1006i',
    lesson: 'hb-m10-06',
    prompt: 'Which of her four plants cares least about the November date?',
    choices: ['Garlic', 'Ginger', 'Turmeric', 'They all care equally'],
    answer: 0,
    feedback: [
      null,
      'Ginger is tropical, and a frost ends its leaves.',
      'Turmeric is tropical too, and it has to be up before the freeze.',
      'Two of the four are hardy about it and two are not.'
    ],
    why: 'Garlic is hardy and is meant to be in the ground through the winter, so a November freeze suits it fine.'
  },
  {
    id: 't-hbm1006j',
    lesson: 'hb-m10-06',
    prompt: 'Why should plastic never lie straight on leaves overnight?',
    choices: [
      'Plastic is too heavy for a plant',
      'Where it touches, it can damage the leaf',
      'It keeps the plant too warm',
      'It stops the plant seeing the moon'
    ],
    answer: 1,
    feedback: [
      'A sheet of plastic weighs very little. Contact is the problem.',
      null,
      'Too warm is not what happens on a frost night under thin plastic.',
      'Moonlight makes no difference to a plant at all.'
    ],
    why: 'Plastic gives no protection where it touches, so use cloth, or hold the plastic off the leaves with a frame.'
  }
];

/** Every question for one lesson. */
export function itemsForLesson(lessonId) {
  return HERBALISM_M10_BANK.filter((q) => q.lesson === lessonId);
}

/** Every question across a list of lessons — what the weekly test draws from. */
export function itemsForLessons(lessonIds) {
  const set = new Set(lessonIds || []);
  return HERBALISM_M10_BANK.filter((q) => set.has(q.lesson));
}

export function m10BankItemById(id) {
  return HERBALISM_M10_BANK.find((q) => q.id === id) || null;
}

export default HERBALISM_M10_BANK;
