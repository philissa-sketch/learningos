// ---------------------------------------------------------------------------
// HERBALISM & BOTANY — MODULE 12 QUESTION BANK
// The Growing Year · Lessons 67-72 · Quarter 3, Weeks 7 and 8
//
// Ten questions per lesson, sixty in all. These are NOT asked at the end of a
// lesson. They are the pool the Day 4 weekly test draws from: three lessons at
// ten questions is a thirty-question pool, and buildWeeklyTest takes eight.
// They also feed the morning warm-up and the extra practice the practice gate
// serves when she misses more than one on a lesson check.
//
//   Week 7 pool — hb-m12-01, hb-m12-02, hb-m12-03  (30 questions)
//   Week 8 pool — hb-m12-04, hb-m12-05, hb-m12-06  (30 questions)
//
// ---- FIELD SHAPE ----
//
// Built against what scripts/check-assessment.mjs reads: id, lesson, prompt,
// choices (exactly 4, all different), answer (0-3), feedback (4 entries, null
// in the correct slot and a real sentence in every other), and why (never
// blank — it is what the review screen shows). Same shape as the Module 5 and
// Module 10 banks.
//
// ---- THE QUARTER 3 READING BAR ----
//
// Written to the Q3 caps in LESSON-SPEC-Q3Q4.md, which are HIGHER than Q1 and
// Q2: prompts up to 14 words a sentence, answer choices up to 15 words, long
// words up to 10%. A Q3 bank written at Q1's level now fails the build for
// being too easy, so the prompts here carry subordinate clauses and the choices
// carry real reasons rather than bare labels.
//
// Words to add to check-assessment's SUBJECT exemption set when this merges, so
// later modules may use them inside a prompt: succession, companion, pollinated,
// hybrid, maturity, rhizome, nitrogen, decomposer, overwinter.
//
// ---- ARITHMETIC ----
//
// Nine questions in this bank are sums with one right answer, and every one was
// worked by hand against a calendar. The dates are Atlanta's, from Module 10:
// last frost 27 March, first freeze 13 November, about 230 frost-free days.
//
//   6 weeks before 27 March = 13 February   ·   8 weeks = 30 January
//   3 weeks before 27 March = 6 March
//   10 April + 90 days = 9 July
//   15 October to 5 June = about 233 days
//   1 April + 14 + 14 = 15 April and 29 April
//
// The wrong answers on those items are the answers a real slip produces — off
// by two weeks, counted the wrong way, or counted in fives instead of sevens —
// so a miss names the exact mistake rather than being filler.
//
// ---- DISTRACTORS ----
//
// Where the payload is vocabulary, the wrong choices are the OTHER words from
// this module. A miss on "what job does the squash do" that lands on nitrogen
// names the exact confusion, and the feedback names it back.
//
// ---- SAFETY ----
//
// No dosing language anywhere. Nothing in this module treats anything. Saved
// seed is for sowing and is not food; nothing is tasted without a grown-up.
// ---------------------------------------------------------------------------

export const HERBALISM_M12_BANK = [
  // =========================================================================
  // LESSON 67 · hb-m12-01 · Planning a season on paper
  // =========================================================================
  {
    id: 't-hbm1201a',
    lesson: 'hb-m12-01',
    prompt: 'Why does a seed packet count in weeks instead of printing an actual date?',
    choices: [
      'Because gardeners prefer to guess',
      'Because it cannot know where the buyer lives',
      'Because dates are harder to print on paper',
      'Because the seeds change speed every year'
    ],
    answer: 1,
    feedback: [
      'The whole point of the weeks number is that nobody has to guess.',
      null,
      'Printing a date would be no harder. Knowing WHICH date is the problem.',
      'A tomato takes much the same time every year. The frost date is what moves.'
    ],
    why: 'The same packet is sold all over the country, and the last frost date shifts by months from place to place.'
  },
  {
    id: 't-hbm1201b',
    lesson: 'hb-m12-01',
    prompt: 'A packet says six weeks before the last frost. Her last frost is 27 March.',
    choices: ['The 6th of March', 'The 8th of May', 'The 13th of February', 'The 30th of January'],
    answer: 2,
    feedback: [
      'That is three weeks back, so the seedlings would still be tiny.',
      'That is AFTER the frost, and you were asked to count backwards.',
      null,
      'That is eight weeks back. Two weeks too far.'
    ],
    why: 'Six sevens is forty-two days, and forty-two days back from 27 March is 13 February.'
  },
  {
    id: 't-hbm1201c',
    lesson: 'hb-m12-01',
    prompt: 'Peppers say eight weeks before the last frost. Counting back from 27 March gives what?',
    choices: ['The 13th of February', 'The 20th of February', 'The 16th of January', 'The 30th of January'],
    answer: 3,
    feedback: [
      'That is six weeks. Peppers are asking for two weeks more than that.',
      'That is five weeks back, which is three weeks short.',
      'That is ten weeks, so you counted two sevens too many.',
      null
    ],
    why: 'Eight sevens is fifty-six days, and fifty-six days back from 27 March lands on 30 January.'
  },
  {
    id: 't-hbm1201d',
    lesson: 'hb-m12-01',
    prompt: 'What does the days to maturity number on a packet actually tell you?',
    choices: [
      'Roughly how long the plant takes from sowing to picking',
      'How many days the seed stays alive in the packet',
      'How deep the seed has to be buried',
      'How many days of rain the plant wants'
    ],
    answer: 0,
    feedback: [
      null,
      'That is how long seed keeps, which is a different number entirely.',
      'Depth is a separate line on the packet.',
      'No packet counts rainy days for you.'
    ],
    why: 'Counting that many days forward from your sowing date shows whether the crop finishes inside your season.'
  },
  {
    id: 't-hbm1201e',
    lesson: 'hb-m12-01',
    prompt: 'She counts forward and lands three weeks past her first freeze. What now?',
    choices: [
      'Sow it anyway and hope for a warm autumn',
      'Sow earlier, or choose a kind that finishes faster',
      'Sow it later, so it catches up',
      'Water it twice as often all season'
    ],
    answer: 1,
    feedback: [
      'The sum already gave her the answer, so hoping just wastes the season.',
      null,
      'Sowing later moves the finish date later too, so that goes the wrong way.',
      'Water cannot buy a plant three extra warm weeks.'
    ],
    why: 'Only two things move the finish date: sowing sooner, or picking a variety with fewer days to maturity.'
  },
  {
    id: 't-hbm1201f',
    lesson: 'hb-m12-01',
    prompt: 'Which number does the gardener bring, because the packet can never know it?',
    choices: ['The sowing depth', 'How much light it needs', 'Her own last frost date', 'The days to maturity'],
    answer: 2,
    feedback: [
      'Depth belongs to the seed, so the packet knows it perfectly well.',
      'Light needs belong to the plant, not to her town.',
      null,
      'That belongs to the plant, so it is the same everywhere and it is printed.'
    ],
    why: 'The frost date is local. It is the one piece of the sum that has to come from where she actually lives.'
  },
  {
    id: 't-hbm1201g',
    lesson: 'hb-m12-01',
    prompt: 'About how many frost-free days does her part of Georgia get each year?',
    choices: ['About 90', 'About 365', 'About 120', 'About 230'],
    answer: 3,
    feedback: [
      'Ninety days is roughly one corn crop, not a whole season.',
      'That would mean frost never came at all, and it comes every November.',
      'A hundred and twenty days is a short northern season, not hers.',
      null
    ],
    why: 'From about 27 March to about 13 November is roughly 230 days, which is around seven and a half months.'
  },
  {
    id: 't-hbm1201h',
    lesson: 'hb-m12-01',
    prompt: 'Corn sown on 10 April needs about 90 days. Roughly when is it ready?',
    choices: ['Early July', 'Late May', 'Early September', 'Late April'],
    answer: 0,
    feedback: [
      null,
      'Late May is only about forty-five days, which is half of what corn asks.',
      'That is nearly 150 days, so you counted well past ninety.',
      'Two weeks is nowhere near ninety days.'
    ],
    why: 'Ninety days from 10 April lands on about 9 July, which sits comfortably inside her season.'
  },
  {
    id: 't-hbm1201i',
    lesson: 'hb-m12-01',
    prompt: 'Garlic goes in about 15 October and is lifted about 5 June. How long is that?',
    choices: [
      'About 400 days, so it takes more than a year',
      'About 233 days, which is longer than her frost-free season',
      'About 90 days, the same as corn',
      'About 60 days, so it is the quickest crop she grows'
    ],
    answer: 1,
    feedback: [
      'That is more than a whole year, and garlic goes in and comes out inside one.',
      null,
      'Corn is done in about ninety days. Garlic sits there far longer.',
      'Sixty days would not even get garlic through the winter.'
    ],
    why: 'Mid October to early June is about 233 days, so garlic occupies the pot longer than the whole growing season lasts.'
  },
  {
    id: 't-hbm1201j',
    lesson: 'hb-m12-01',
    prompt: 'A cucumber packet says three weeks before the last frost. What date is that?',
    choices: ['The 20th of March', 'The 17th of April', 'The 6th of March', 'The 13th of February'],
    answer: 2,
    feedback: [
      'That is only one week back.',
      'That is three weeks AFTER the frost, so you counted the wrong way.',
      null,
      'That is six weeks back, which is twice as far as this packet asked for.'
    ],
    why: 'Three sevens is twenty-one days, and twenty-one days back from 27 March is 6 March.'
  },

  // =========================================================================
  // LESSON 68 · hb-m12-02 · Starting seeds indoors
  // =========================================================================
  {
    id: 't-hbm1202a',
    lesson: 'hb-m12-02',
    prompt: 'What does a seed need most in its first few days underground?',
    choices: ['Strong light', 'Wind', 'A big pot', 'Warmth'],
    answer: 3,
    feedback: [
      'Light matters enormously, but only once the seedling is actually up.',
      'Wind toughens a stem later. It does nothing for a buried seed.',
      'Pot size is not what wakes a seed up.',
      null
    ],
    why: 'Warmth wakes a seed. A seed underground cannot use light it cannot reach.'
  },
  {
    id: 't-hbm1202b',
    lesson: 'hb-m12-02',
    prompt: 'Her seedlings are tall, pale and floppy. What do they need?',
    choices: [
      'Light brought much closer to their leaves',
      'A great deal more water',
      'A warmer spot than they already have',
      'To be moved to a bigger pot today'
    ],
    answer: 0,
    feedback: [
      null,
      'Stretching is not thirst, and more water on a floppy seedling invites rot.',
      'Extra heat after sprouting makes stretching worse, not better.',
      'A bigger pot cannot fix a plant reaching sideways for a window.'
    ],
    why: 'A leggy seedling is hunting for light, so bringing the lamp down close is the only real fix.'
  },
  {
    id: 't-hbm1202c',
    lesson: 'hb-m12-02',
    prompt: 'What is the usual rule for how deep a seed goes?',
    choices: [
      'Right on the surface, never covered',
      'About twice as deep as the seed is wide',
      'About one inch, whatever the seed is',
      'As deep as your finger will reach'
    ],
    answer: 1,
    feedback: [
      'Most seed needs a little cover, or it dries out before it starts.',
      null,
      'An inch is far too deep for something as small as basil seed.',
      'A finger is deep enough to bury most small seed beyond rescue.'
    ],
    why: 'A seed carries only enough food for a short climb, so its own size sets how far it can travel.'
  },
  {
    id: 't-hbm1202d',
    lesson: 'hb-m12-02',
    prompt: 'Why is soil from the yard a bad choice for a seed tray?',
    choices: [
      'It has no colour, so labels are hard to read',
      'It is too light and blows away indoors',
      'It packs down hard, and tiny roots cannot push through it',
      'It is too expensive to use in trays'
    ],
    answer: 2,
    feedback: [
      'Colour has nothing to do with whether a root can grow.',
      'Packed yard soil is heavy, not light.',
      null,
      'Yard soil is the free option. Cost is not the problem.'
    ],
    why: 'Seed mix is light and open, and it does not carry the moulds that kill young seedlings.'
  },
  {
    id: 't-hbm1202e',
    lesson: 'hb-m12-02',
    prompt: 'When should the label be written?',
    choices: [
      'That evening, once the job is finished',
      'When the first seedlings appear',
      'Only if you happen to sow two kinds',
      'While you are sowing, before anything is covered up'
    ],
    answer: 3,
    feedback: [
      'By evening two trays of bare mix look exactly alike.',
      'By then you have already spent a week guessing.',
      'One kind today becomes three kinds by March.',
      null
    ],
    why: 'The label is written at the moment you still know what went in, which is while you are sowing it.'
  },
  {
    id: 't-hbm1202f',
    lesson: 'hb-m12-02',
    prompt: 'Ginger and turmeric are not grown from seed. What are they grown from?',
    choices: ['A piece of rhizome', 'A cutting from a leaf', 'A bulb, like garlic', 'A cluster of berries'],
    answer: 0,
    feedback: [
      null,
      'A leaf cutting works for some houseplants, but not for these two.',
      'Garlic grows from a clove of a bulb. Ginger is not built that way.',
      'Neither plant makes berries she would ever plant.'
    ],
    why: 'A rhizome is a fat underground stem, and a piece of it with a bud can start a whole new plant.'
  },
  {
    id: 't-hbm1202g',
    lesson: 'hb-m12-02',
    prompt: 'Why does her ginger have to be started indoors in February?',
    choices: [
      'Because ginger will not grow in a container',
      'Because it needs 8 to 10 months, and her season is only about 230 days',
      'Because ginger seed will not sprout outdoors at all',
      'Because February is when ginger is on sale'
    ],
    answer: 1,
    feedback: [
      'Ginger does perfectly well in a big container.',
      null,
      'Ginger is not started from seed in the first place.',
      'When it is sold has nothing to do with when it must be started.'
    ],
    why: 'Eight to ten months does not fit inside 230 frost-free days, so the first months have to happen indoors.'
  },
  {
    id: 't-hbm1202h',
    lesson: 'hb-m12-02',
    prompt: 'When should the cover come off a seed tray?',
    choices: [
      'After two full weeks, no matter what',
      'It should never come off at all',
      'The moment the first seedlings appear',
      'Once every single seed has come up'
    ],
    answer: 2,
    feedback: [
      'A calendar cannot see what the tray is doing.',
      'A cover left on grows mould instead of plants.',
      null,
      'Waiting for the last one keeps the first ones damp and crowded for too long.'
    ],
    why: 'A cover holds damp in for sprouting, and after that the same damp is what rots young stems.'
  },
  {
    id: 't-hbm1202i',
    lesson: 'hb-m12-02',
    prompt: 'How wet should seed mix be when you fill the tray?',
    choices: [
      'Soaking, with water standing on the top',
      'Completely dry, so you can water it later',
      'Wet enough to squeeze a stream out of it',
      'Like a wrung-out cloth, damp but not dripping'
    ],
    answer: 3,
    feedback: [
      'Standing water drives the air out and rots seed before it starts.',
      'Dry mix pushes water straight off the top instead of soaking it in.',
      'If a stream comes out, there is far too much water in there.',
      null
    ],
    why: 'Damp and open is what a seed wants, because roots need air in the mix as well as water.'
  },
  {
    id: 't-hbm1202j',
    lesson: 'hb-m12-02',
    prompt: 'Two trays were sown together. One is short and stocky, one is tall and pale.',
    choices: [
      'The short stocky one is healthier',
      'The tall pale one is healthier, because it grew faster',
      'They are exactly as healthy as each other',
      'Neither one is worth planting out'
    ],
    answer: 0,
    feedback: [
      null,
      'Tall and pale is stretching, and stretching is a plant in trouble.',
      'Their stems are completely different, so they are not the same.',
      'The stocky tray is exactly what she wants to plant.'
    ],
    why: 'Short and thick means the light was close enough. Tall and pale means it was too far away.'
  },

  // =========================================================================
  // LESSON 69 · hb-m12-03 · Hardening off and transplanting
  // =========================================================================
  {
    id: 't-hbm1203a',
    lesson: 'hb-m12-03',
    prompt: 'What does hardening off actually mean?',
    choices: [
      'Pressing the soil down hard around the stem',
      'Letting a plant outside a little longer each day, for about a week',
      'Letting the soil in the tray dry out completely',
      'Putting the plant in the fridge overnight'
    ],
    answer: 1,
    feedback: [
      'That is about planting, and it is not what the word means.',
      null,
      'Drying a tray out is a way to kill it, not to toughen it.',
      'A fridge is a cold shock, and shock is the thing this avoids.'
    ],
    why: 'It works because the increase is small and daily, so the plant has time to build what it lacks.'
  },
  {
    id: 't-hbm1203b',
    lesson: 'hb-m12-03',
    prompt: 'What should the first day of hardening off look like?',
    choices: [
      'A whole night left outdoors',
      'Straight into the container for good',
      'About an hour outside, in the shade, out of the wind',
      'A whole day in direct sun'
    ],
    answer: 2,
    feedback: [
      'Cold nights come at the END of hardening off, not the start.',
      'That is the mistake the whole lesson exists to prevent.',
      null,
      'A full day of direct sun on day one is exactly what scorches a soft leaf.'
    ],
    why: 'Day one is short and shaded, because a leaf grown indoors has no protection built yet.'
  },
  {
    id: 't-hbm1203c',
    lesson: 'hb-m12-03',
    prompt: 'What does wind do for a plant growing outdoors?',
    choices: [
      'It makes the leaves greener',
      'It waters the roots',
      'It does nothing useful at all',
      'It bends the stem, so the stem grows thicker'
    ],
    answer: 3,
    feedback: [
      'Green comes from light and from the soil, not from moving air.',
      'Wind dries a plant out. It never waters it.',
      'It is a large part of why outdoor stems are so much tougher.',
      null
    ],
    why: 'A stem thickens because something keeps bending it, and indoors nothing ever does.'
  },
  {
    id: 't-hbm1203d',
    lesson: 'hb-m12-03',
    prompt: 'When you lift a seedling out of a tray, what should you hold?',
    choices: ['A leaf', 'The stem', 'The roots', 'The growing tip'],
    answer: 0,
    feedback: [
      null,
      'A crushed stem cuts the plant’s only water route, and that never heals.',
      'Bare roots tear easily and dry out in seconds.',
      'The tip is where all the new growth comes from.'
    ],
    why: 'A plant can grow a replacement leaf. It cannot grow a replacement stem.'
  },
  {
    id: 't-hbm1203e',
    lesson: 'hb-m12-03',
    prompt: 'What is the best time of day to transplant a seedling?',
    choices: [
      'It makes no difference at all',
      'The evening, or a cloudy hour',
      'The hottest part of the afternoon',
      'Exactly midday, in full sun'
    ],
    answer: 1,
    feedback: [
      'It decides whether the plant settles quietly or wilts flat.',
      null,
      'A root that has just been moved cannot drink fast enough to survive that.',
      'Midday sun is the hardest hour of the day on a fresh transplant.'
    ],
    why: 'Cool hours give the roots time to settle before the sun starts asking for water.'
  },
  {
    id: 't-hbm1203f',
    lesson: 'hb-m12-03',
    prompt: 'Why water the tray well an hour before lifting anything out of it?',
    choices: [
      'So the seedlings grow taller before the move',
      'So the tray weighs less to carry',
      'So the root ball holds together instead of crumbling',
      'So the leaves look shinier in the photograph'
    ],
    answer: 2,
    feedback: [
      'An hour is far too short to change a plant’s height.',
      'Watering makes a tray heavier, not lighter.',
      null,
      'How it looks is not what this is about.'
    ],
    why: 'A dry root ball falls apart as you lift it, and every root that tears is one the plant has to replace.'
  },
  {
    id: 't-hbm1203g',
    lesson: 'hb-m12-03',
    prompt: 'What is scorch on a leaf?',
    choices: [
      'Small holes chewed by an insect',
      'The yellow colour of a leaf that is simply old',
      'Frost damage from a cold night',
      'Burnt pale patches, from sun that was far too strong too soon'
    ],
    answer: 3,
    feedback: [
      'Chewed holes have ragged edges and something ate them.',
      'Old leaves yellow slowly all over, which looks quite different.',
      'Frost damage goes dark and limp, not pale and dry.',
      null
    ],
    why: 'A leaf grown indoors has no waxy protection, so real sunlight burns it within hours.'
  },
  {
    id: 't-hbm1203h',
    lesson: 'hb-m12-03',
    prompt: 'Which step comes LAST in a week of hardening off?',
    choices: [
      'A whole night left outside',
      'An hour in the shade',
      'A few hours of morning sun',
      'Half a day in a sheltered corner'
    ],
    answer: 0,
    feedback: [
      null,
      'That is day one, the gentlest step of all.',
      'Morning sun comes in the middle of the week.',
      'Half days come before whole days, and whole days come before nights.'
    ],
    why: 'The cold night is the biggest ask, so it goes at the end when the plant is toughest.'
  },
  {
    id: 't-hbm1203i',
    lesson: 'hb-m12-03',
    prompt: 'How deep should a seedling sit in its new hole?',
    choices: [
      'It does not matter in the slightest',
      'At the same depth it was already growing',
      'Much deeper, with the lowest leaves buried',
      'Higher, with the roots partly showing'
    ],
    answer: 1,
    feedback: [
      'Depth is one of the few things that really does decide this.',
      null,
      'Buried leaves rot, and rot under the soil spreads upward.',
      'Roots left in the air dry out and die within a day.'
    ],
    why: 'The plant already worked out where its stem should meet the soil, so keep that line where it was.'
  },
  {
    id: 't-hbm1203j',
    lesson: 'hb-m12-03',
    prompt: 'Why does her corn never need hardening off?',
    choices: [
      'Because corn is a tropical plant',
      'Because corn is planted in the autumn',
      'Because it is sown straight into the container outdoors',
      'Because corn cannot be burnt by the sun'
    ],
    answer: 2,
    feedback: [
      'Corn is not tropical, and that is not the reason anyway.',
      'Garlic is her autumn crop. Corn goes in after the last frost.',
      null,
      'Corn burns like anything else if it is moved from indoors too fast.'
    ],
    why: 'Hardening off is only for plants that started life indoors, and corn never does.'
  },

  // =========================================================================
  // LESSON 70 · hb-m12-04 · Succession and companion planting
  // =========================================================================
  {
    id: 't-hbm1204a',
    lesson: 'hb-m12-04',
    prompt: 'What does succession planting mean?',
    choices: [
      'Sowing the whole packet on one afternoon',
      'Planting different crops beside each other',
      'Saving seed from the best plant you grew',
      'Sowing a few seeds at a time, with a gap between sowings'
    ],
    answer: 3,
    feedback: [
      'That is exactly what succession planting is meant to stop.',
      'That is companion planting, which is a different idea.',
      'That is seed saving, which comes in the next lesson.',
      null
    ],
    why: 'Small batches with a gap make the harvest arrive in waves she can actually keep up with.'
  },
  {
    id: 't-hbm1204b',
    lesson: 'hb-m12-04',
    prompt: 'Batch one goes in on 1 April, and she wants batches two weeks apart.',
    choices: [
      'The 15th and the 29th of April',
      'The 8th and the 15th of April',
      'The 1st of May and the 1st of June',
      'The 3rd and the 5th of April'
    ],
    answer: 0,
    feedback: [
      null,
      'Those are one week apart, so all three batches would crowd together.',
      'A month apart leaves long stretches with nothing at all to pick.',
      'Two days apart is not a succession. That is one sowing.'
    ],
    why: 'Two weeks is fourteen days, so you add fourteen twice and get 15 April and 29 April.'
  },
  {
    id: 't-hbm1204c',
    lesson: 'hb-m12-04',
    prompt: 'What goes wrong when a whole packet of lettuce is sown on one day?',
    choices: [
      'It grows far too slowly to be useful',
      'It is all ready in the same week, and most of it bolts',
      'None of it comes up at all',
      'The seeds fight each other underground'
    ],
    answer: 1,
    feedback: [
      'It grew fast. It just all finished at once.',
      null,
      'It came up beautifully. That is what made the problem.',
      'Crowding is real, but the trouble here is the timing.'
    ],
    why: 'A lettuce is only good for about a fortnight, so forty ready at once is thirty wasted.'
  },
  {
    id: 't-hbm1204d',
    lesson: 'hb-m12-04',
    prompt: 'In the Three Sisters, what do the beans give the corn?',
    choices: [
      'A tall pole to climb up',
      'Water pulled out of the air',
      'Nitrogen, left behind in the soil',
      'Shade for the soil below'
    ],
    answer: 2,
    feedback: [
      'The corn IS the pole. The bean is the one climbing.',
      'No plant pulls water out of the air for another one.',
      null,
      'Shading the ground is the squash’s job, not the bean’s.'
    ],
    why: 'Beans take nitrogen from the air and leave some of it in the soil, which corn cannot do for itself.'
  },
  {
    id: 't-hbm1204e',
    lesson: 'hb-m12-04',
    prompt: 'What job does the corn do in the Three Sisters?',
    choices: [
      'It shades the soil and keeps it damp',
      'It puts nitrogen back into the ground',
      'It keeps insects away from the squash',
      'It is the pole the beans climb'
    ],
    answer: 3,
    feedback: [
      'The squash is the one lying across the ground.',
      'Beans are the nitrogen crop, not corn.',
      'That is not the job this system gives corn.',
      null
    ],
    why: 'A corn stalk is a living support, so the beans need no stakes at all.'
  },
  {
    id: 't-hbm1204f',
    lesson: 'hb-m12-04',
    prompt: 'What job does the squash do down at ground level?',
    choices: [
      'It shades the soil, so weeds struggle and the ground stays damp',
      'It holds the corn upright in the wind',
      'It pulls nitrogen out of the air',
      'It stops the beans climbing too high'
    ],
    answer: 0,
    feedback: [
      null,
      'The corn holds itself up, and it holds the beans as well.',
      'Beans do the nitrogen. Squash does not.',
      'Nobody wants to stop the beans climbing. Climbing is the point.'
    ],
    why: 'Big squash leaves lie over the soil like a living mulch, so less water escapes and fewer weeds get light.'
  },
  {
    id: 't-hbm1204g',
    lesson: 'hb-m12-04',
    prompt: 'Where does the Three Sisters way of planting come from?',
    choices: [
      'Nobody knows where it came from',
      'Indigenous peoples of North America',
      'A seed company in the 1990s',
      'A gardening programme on television'
    ],
    answer: 1,
    feedback: [
      'Its origin is well known and it belongs to real people.',
      null,
      'It is far older than any seed company.',
      'Television only passed it on. It did not invent it.'
    ],
    why: 'It is a farming system developed and used by Indigenous peoples of North America over centuries.'
  },
  {
    id: 't-hbm1204h',
    lesson: 'hb-m12-04',
    prompt: 'Which pairing is most likely to fight instead of helping?',
    choices: [
      'Squash spreading below tall corn',
      'Lettuce in the shade of something taller',
      'Two tall hungry plants right beside each other',
      'Corn with beans planted at its feet'
    ],
    answer: 2,
    feedback: [
      'The squash is using space the corn was never going to use.',
      'A little summer shade suits lettuce very well.',
      null,
      'That is the classic partnership, not a fight.'
    ],
    why: 'Companion planting works when plants use different space and different food. Two of the same simply compete.'
  },
  {
    id: 't-hbm1204i',
    lesson: 'hb-m12-04',
    prompt: 'When do the beans go in, in a Three Sisters container?',
    choices: [
      'On the same day as the corn seed',
      'Weeks before the corn goes in',
      'After the corn has already been harvested',
      'Once the corn is tall enough to be a pole'
    ],
    answer: 3,
    feedback: [
      'Beans sown together with corn will smother it before it can get up.',
      'There would be nothing there for them to climb.',
      'Once the corn is gone, the pole is gone too.',
      null
    ],
    why: 'The bean needs something to climb the moment it starts reaching, so the corn has to be up first.'
  },
  {
    id: 't-hbm1204j',
    lesson: 'hb-m12-04',
    prompt: 'What does it mean when a lettuce bolts?',
    choices: [
      'It shoots up to flower, and its leaves turn bitter',
      'It falls over sideways in the wind',
      'It grows twice as many leaves as usual',
      'Its roots push out through the pot'
    ],
    answer: 0,
    feedback: [
      null,
      'Falling over is a different problem with a different cause.',
      'It stops making good leaves, rather than making more.',
      'That is a plant that has outgrown its pot.'
    ],
    why: 'Once a lettuce starts flowering it puts everything into seed, and the leaves stop being worth eating.'
  },

  // =========================================================================
  // LESSON 71 · hb-m12-05 · Saving seed properly
  // =========================================================================
  {
    id: 't-hbm1205a',
    lesson: 'hb-m12-05',
    prompt: 'Which kind of packet gives seed that comes true next year?',
    choices: ['The cheapest packet', 'Open pollinated', 'F1 hybrid', 'Any packet, because seed is seed'],
    answer: 1,
    feedback: [
      'Price tells you nothing at all about pollination.',
      null,
      'An F1 is a cross of two different parents, so its seed comes out mixed.',
      'It depends on how the plant was pollinated, not on it being seed.'
    ],
    why: 'Open pollinated means both parents were the same kind, so the children turn out much like them.'
  },
  {
    id: 't-hbm1205b',
    lesson: 'hb-m12-05',
    prompt: 'What does F1 on a seed packet actually mean?',
    choices: [
      'It is the first packet of the season',
      'It has been treated to keep insects off',
      'It is a cross between two different parents',
      'It is the fastest kind you can buy'
    ],
    answer: 2,
    feedback: [
      'It is not about when the packet was filled.',
      'Any treatment would be printed separately on the packet.',
      null,
      'Speed is what days to maturity tells you, not the F1 mark.'
    ],
    why: 'The two parents were different, so the seed that F1 plant makes comes out mixed and surprising.'
  },
  {
    id: 't-hbm1205c',
    lesson: 'hb-m12-05',
    prompt: 'Two bean plants are left. One cropped early and stayed healthy, one is small and spotted.',
    choices: [
      'Save from the small spotted one, since its pods are still there',
      'Mix seed from both, to be fair',
      'Save from neither, because beans cannot be saved',
      'Save from the early healthy one'
    ],
    answer: 3,
    feedback: [
      'Still standing is not the same as good, and late and spotted is what gets passed on.',
      'Mixing hides the choice, and half the seed still carries the weak parent.',
      'Beans are one of the easiest seeds of all to save.',
      null
    ],
    why: 'Whatever you save from is choosing the parents of next year’s whole crop.'
  },
  {
    id: 't-hbm1205d',
    lesson: 'hb-m12-05',
    prompt: 'Why tie a ribbon on your best plant back in the summer?',
    choices: [
      'Because by harvest time you will not remember which one it was',
      'Because the ribbon keeps insects away',
      'Because it helps the plant grow taller',
      'Because it stops birds eating the seed'
    ],
    answer: 0,
    feedback: [
      null,
      'A ribbon is a marker, not a barrier.',
      'A ribbon does nothing at all for growth.',
      'A ribbon will not put a bird off anything.'
    ],
    why: 'Once everything is brown and dry, the best plant and the worst plant look almost identical.'
  },
  {
    id: 't-hbm1205e',
    lesson: 'hb-m12-05',
    prompt: 'How can she tell a saved bean is dry enough to store?',
    choices: [
      'It floats when you drop it in water',
      'It snaps instead of bending',
      'It feels cool in your hand',
      'It looks shiny'
    ],
    answer: 1,
    feedback: [
      'Floating is about air inside the seed, not about drying.',
      null,
      'Cool tells you where it was kept, not how dry it is.',
      'A damp bean can look shiny too.'
    ],
    why: 'A seed that still bends is holding water, and water in an envelope turns into mould.'
  },
  {
    id: 't-hbm1205f',
    lesson: 'hb-m12-05',
    prompt: 'Why store saved seed in paper envelopes rather than plastic bags?',
    choices: [
      'Plastic bags are too small for seed',
      'Paper keeps the seed warmer',
      'Paper lets any last damp escape, and plastic traps it',
      'Paper is cheaper than plastic'
    ],
    answer: 2,
    feedback: [
      'Plastic bags come in every size there is.',
      'Warm is the opposite of what stored seed wants.',
      null,
      'Cost is not the reason gardeners choose paper here.'
    ],
    why: 'Trapped damp is what spoils a seed collection, so paper is the safer container.'
  },
  {
    id: 't-hbm1205g',
    lesson: 'hb-m12-05',
    prompt: 'Why write a seed label in pencil instead of pen?',
    choices: [
      'Because pencil is easier to read',
      'Because pen is bad for the seed',
      'Because pencil writing is bigger',
      'Because ink fades and runs if the paper gets damp'
    ],
    answer: 3,
    feedback: [
      'Both are readable. Lasting is the difference.',
      'Ink on the outside of an envelope does the seed no harm.',
      'Size has nothing to do with it.',
      null
    ],
    why: 'A label has to survive a whole year in a cupboard, and pencil outlasts most ink.'
  },
  {
    id: 't-hbm1205h',
    lesson: 'hb-m12-05',
    prompt: 'What four things go on a seed label?',
    choices: [
      'Name, plant part, date, and where it came from',
      'Name and price only',
      'Colour, smell, size and shape',
      'Just the date is enough'
    ],
    answer: 0,
    feedback: [
      null,
      'Saved seed has no price, and the name alone will not be enough in a year.',
      'Those describe the seed but say nothing about where it came from.',
      'A date with no name is a mystery envelope.'
    ],
    why: 'Those four are the label rules from Lesson 66, and saved seed uses exactly the same ones.'
  },
  {
    id: 't-hbm1205i',
    lesson: 'hb-m12-05',
    prompt: 'She plants a garlic clove from her own bulb. What is the new plant?',
    choices: [
      'A wild plant',
      'A copy of the parent',
      'A child of two parents',
      'A hybrid'
    ],
    answer: 1,
    feedback: [
      'It came out of her own container, not out of the woods.',
      null,
      'Two parents means a seed, and a clove is not a seed.',
      'A hybrid needs two different parents crossed together.'
    ],
    why: 'A clove is a piece of the parent, so it grows into the same plant again rather than a child of it.'
  },
  {
    id: 't-hbm1205j',
    lesson: 'hb-m12-05',
    prompt: 'Why is corn hard to save seed from honestly, in a small garden?',
    choices: [
      'Corn does not make seed at all',
      'Corn seed is always sold as F1',
      'The wind carries its pollen far, so it crosses with other corn nearby',
      'Corn seed will not dry properly'
    ],
    answer: 2,
    feedback: [
      'Every kernel on a cob is a seed.',
      'Plenty of corn is open pollinated. The wind is still the difficulty.',
      null,
      'Corn dries very well. Crossing is the problem, not drying.'
    ],
    why: 'Corn is wind pollinated, so a small patch is easily crossed by any corn growing for some distance around.'
  },

  // =========================================================================
  // LESSON 72 · hb-m12-06 · Putting the garden to bed
  // =========================================================================
  {
    id: 't-hbm1206a',
    lesson: 'hb-m12-06',
    prompt: 'Which two of her four containers must be lifted before the first freeze?',
    choices: [
      'The garlic and the corn',
      'The garlic on its own',
      'All four of them',
      'The ginger and the turmeric'
    ],
    answer: 3,
    feedback: [
      'Corn is finished by then, and garlic is going IN rather than coming out.',
      'Garlic is the hardy one, and it sits out the whole winter.',
      'Only the two tropical plants are at risk from a freeze.',
      null
    ],
    why: 'Ginger and turmeric came from the tropics, so a freeze ends them and they come up first.'
  },
  {
    id: 't-hbm1206b',
    lesson: 'hb-m12-06',
    prompt: 'When does garlic go into the ground in Georgia?',
    choices: [
      'In autumn, and it is lifted the following summer',
      'In spring, at the same time as the corn',
      'In the middle of summer',
      'In any month you like'
    ],
    answer: 0,
    feedback: [
      null,
      'Spring garlic never gets the cold months it needs to make a proper bulb.',
      'Midsummer is when garlic is being lifted, not planted.',
      'Garlic is fussy about this, and autumn is the month that works.'
    ],
    why: 'It sits out the whole winter and is lifted in early summer, which is about 233 days in the pot.'
  },
  {
    id: 't-hbm1206c',
    lesson: 'hb-m12-06',
    prompt: 'Why chop the corn stalks up before they go into the compost bin?',
    choices: [
      'Because the bin lid will not shut otherwise',
      'Because decomposers work on surfaces, and chopping makes far more of them',
      'Because short pieces smell better',
      'Because whole stalks are too heavy to carry'
    ],
    answer: 1,
    feedback: [
      'A lid is a small problem. Two years of waiting is a big one.',
      null,
      'Smell is not what decides how fast something breaks down.',
      'A dry corn stalk is very light.'
    ],
    why: 'A whole stalk can still be a whole stalk two years later, because there is so little surface to start on.'
  },
  {
    id: 't-hbm1206d',
    lesson: 'hb-m12-06',
    prompt: 'What happens to spotted or mouldy leaves at clearing time?',
    choices: [
      'They get chopped smaller than the rest',
      'They go in with extra water',
      'They stay out of the compost bin',
      'They go in first, at the very bottom'
    ],
    answer: 2,
    feedback: [
      'Chopping does not deal with what is wrong with them.',
      'Water will not fix them either.',
      null,
      'Putting them in at all is the problem, so the bottom is no safer.'
    ],
    why: 'A home bin may not get hot enough to deal with them, so the trouble can come back out next year.'
  },
  {
    id: 't-hbm1206e',
    lesson: 'hb-m12-06',
    prompt: 'What does a mulch do over the winter?',
    choices: [
      'Feeds the plant straight away',
      'Keeps every insect out of the pot',
      'Makes the soil drain much faster',
      'Holds warmth in and stops the soil washing away'
    ],
    answer: 3,
    feedback: [
      'It breaks down slowly, so it is not a quick feed.',
      'Plenty of small creatures live happily under a mulch.',
      'It slows water down rather than speeding drainage up.',
      null
    ],
    why: 'Covered soil keeps its warmth and does not get washed out by heavy winter rain.'
  },
  {
    id: 't-hbm1206f',
    lesson: 'hb-m12-06',
    prompt: 'Which piece of rhizome should she keep back to start again next year?',
    choices: [
      'The fattest, healthiest piece with good buds',
      'The smallest piece, so more can be eaten',
      'A piece with no buds on it at all',
      'Any piece, because they are all the same'
    ],
    answer: 0,
    feedback: [
      null,
      'Starting from the smallest piece is starting next year at a disadvantage.',
      'A piece with no buds has nothing to grow from.',
      'They are not the same, and the choice is hers to make well.'
    ],
    why: 'The piece she saves is next year’s starting point, so choosing well is the same idea as saving seed from the best plant.'
  },
  {
    id: 't-hbm1206g',
    lesson: 'hb-m12-06',
    prompt: 'Why write the end-of-year notes in November instead of waiting until March?',
    choices: [
      'Because the notes have to match the packet',
      'Because by March she will not remember any of it',
      'Because notes are not allowed in spring',
      'Because November evenings are longer'
    ],
    answer: 1,
    feedback: [
      'The notes are hers, and no packet decides what goes in them.',
      null,
      'She can write notes whenever she likes. Accuracy is the issue.',
      'November evenings are shorter, not longer.'
    ],
    why: 'The dates, the failures and the surprises are only accurate while the year is still in front of her.'
  },
  {
    id: 't-hbm1206h',
    lesson: 'hb-m12-06',
    prompt: 'Which way up does a garlic clove go into the soil?',
    choices: [
      'Lying flat on its side',
      'It makes no difference',
      'Pointy end up',
      'Pointy end down'
    ],
    answer: 2,
    feedback: [
      'Flat wastes the clove’s own sense of which way is up.',
      'It costs the plant time and strength to fix it.',
      null,
      'The shoot then has to turn right round before it can start climbing.'
    ],
    why: 'The point is where the shoot comes out, so putting it up gives the clove the shortest way to the light.'
  },
  {
    id: 't-hbm1206i',
    lesson: 'hb-m12-06',
    prompt: 'Where should lifted ginger and turmeric be kept over the winter?',
    choices: [
      'Outside beside the empty containers',
      'In a sealed plastic bag on the windowsill',
      'In the freezer, so nothing can spoil',
      'Somewhere cool, airy and dry that never freezes'
    ],
    answer: 3,
    feedback: [
      'Outside is exactly the freeze she just lifted them to escape.',
      'A sealed bag traps damp, and trapped damp rots a rhizome.',
      'Freezing is what would have ended them in the garden.',
      null
    ],
    why: 'They need to be out of the freeze but still able to breathe, or they rot instead of resting.'
  },
  {
    id: 't-hbm1206j',
    lesson: 'hb-m12-06',
    prompt: 'Does the compost bin keep working through a Georgia winter?',
    choices: [
      'Yes, but more slowly than in summer',
      'No, it stops completely until March',
      'Yes, and faster than in summer',
      'No, the decomposers all die'
    ],
    answer: 0,
    feedback: [
      null,
      'It slows down, but it does not switch off.',
      'Cold slows decomposers down. It never speeds them up.',
      'They slow right down and wait. They do not all die.'
    ],
    why: 'Decomposers work more slowly when they are cold, so the bin keeps going quietly all winter.'
  }
];

export function m12BankItemById(id) {
  return HERBALISM_M12_BANK.find((q) => q.id === id) || null;
}

export function itemsForLesson(lessonId) {
  return HERBALISM_M12_BANK.filter((q) => q.lesson === lessonId);
}

export function itemsForLessons(lessonIds) {
  const want = new Set(lessonIds);
  return HERBALISM_M12_BANK.filter((q) => want.has(q.lesson));
}

export default HERBALISM_M12_BANK;
