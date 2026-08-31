// ---------------------------------------------------------------------------
// Gardening — Q1 Friday briefs (fall season, Aug 14 - Oct 30 2026).
//
// THESE ARE NOT LESSONS, and that is a load-bearing distinction. Gardening is
// a PARTICIPATION subject (see config/subjects.js) — it is recorded by what he
// did, not by a grade. Nothing in this file enters `allLessons`, so nothing
// here appears in Today's Mission, the Lesson Roster, the Cumulative Review
// pool, a Quarterly Exam, or a mastery gate, and no Gardening letter grade is
// ever computed. You cannot grade a boy on whether it rained, and grading
// germination rate teaches him to fudge the log.
//
// The write-ups ARE graded — through the Writing Journal, via gardenProjects.js
// (`category: 'experiment'`), which already grades real composition.
//
// CADENCE: 12 Fridays fall in this window and only 8 carry a brief. That is
// deliberate and is the design's own revision of "a brief lesson every Friday":
// a lesson that exists because it is Friday rather than because the garden
// needs it is padding, which this project refuses everywhere else. The four
// open Fridays (Sep 11, Oct 2, Oct 16, Oct 30) go to catch-up, field trips, or
// simply tending — which is what Friday was built for. See gardenCalendar.js.
//
// SOURCING: UGA Extension is the primary source for this subject the way Khan
// Academy is for the Khan subjects — free, Georgia-specific, and verifiable
// rather than invented. The North Georgia planting windows below were verified
// against C1258 and are recorded in PROJECT_PLAN.md Part 4; they are NOT to be
// re-derived or "improved" by a later session. UGA's B577 chart is written for
// MIDDLE Georgia; north Georgia plants about two weeks earlier in fall, which
// is why these dates lead the chart.
//
// HONEST ADJUSTMENT, stated in the content rather than glossed: UGA's guidance
// assumes in-ground beds in full sun. This garden is buckets under an awning.
// Containers dry faster, heat more and hold less root volume, and partial shade
// narrows what is viable — which happens to point at exactly the crops fall
// wants anyway, since leafy greens tolerate shade better than anything that
// must fruit. The season is not against this garden; the awning is.
//
// SHAPE of a brief: `whyToday` is the one-sentence reason it is happening on
// THIS Friday and not another. `teaching` carries the real content. `doInTheGarden`
// is what his hands do. `logThis` names the gardenLog rows the day should
// produce, so the record is a consequence of the work rather than a chore
// bolted on after it.
// ---------------------------------------------------------------------------

export const gardenBriefs = [
  // -------------------------------------------------------------------------
  {
    id: 'gd7-q1-b1-changeover',
    subject: 'gardening',
    quarter: 'Q1 2026-2027',
    sequenceInQuarter: 1,
    date: '2026-08-14',
    title: 'Turn the Garden Over',
    theme: 'The summer garden comes out, the fall garden goes in — and you measure the box before you fill it',
    estMinutes: 90,
    whyToday:
      "Tomorrow, August 15, is the single biggest fall planting date in north Georgia. The garden is still full of summer. Today is the changeover, and it has to happen today.",
    teaching: [
      {
        heading: 'A garden is a box somebody else designed',
        text:
          "Your garden is 4 feet by 8 feet, with about 7 feet of headroom, under an awning, at an apartment complex. Write those numbers down, because every single decision this year runs into one of them.\n\nHere is the first thing worth noticing. Four feet times eight feet is 32 square feet of floor. That is small. But 32 square feet of floor with 7 feet of headroom over it is about 224 cubic feet of space. You are not short on room. You are short on FLOOR — and floor is only one way to hold a plant.\n\nThat is the difference between a gardener's problem and an engineer's problem. A gardener asks what will fit in 32 square feet. An engineer asks how much of 224 cubic feet can be reached, lit, watered, and held up. Same garden, and the second question has a much better answer.\n\nYou also have constraints you did not choose and cannot argue with: no ground to dig into, a fixed ceiling you cannot raise, sunlight that arrives sideways instead of from overhead, and an apartment complex with rules about what may be attached to what. Working inside rules you did not write is not a limitation on engineering. It is most of what engineering actually is."
      },
      {
        heading: 'Changeover is a decision, not a chore',
        text:
          "Every bucket out there right now is holding a summer crop, and each one gets one of three verdicts from you today.\n\nKEEP — it is still producing and it is not in the way. Peppers and okra often run well into fall in Georgia, and pulling a plant that is still feeding you to plant one that might feed you later is a bad trade.\n\nPULL — it is finished. Spent, yellow, woody, or done fruiting. It is now occupying a bucket that fall needs.\n\nREPLACE — this is the hard one. The plant is still alive but it is not earning its bucket, and something planted tomorrow will earn it more. Pulling a living plant on purpose feels wrong the first time you do it. Do it anyway, and write down why. That sentence is the whole skill.\n\nWhen a bucket comes empty, do not just refill it. Old mix compacts, and a season of roots leaves a dense mat behind. Break the root ball apart with your hands, pull the big roots out, and loosen what is left. Then top it back up, because used mix always settles lower than it started."
      },
      {
        heading: 'Read the plants before you pull them — they have been measuring the sun all summer',
        text:
          "Before anything comes out, walk the whole garden once and look at how each plant GREW rather than what it produced.\n\nA plant that got plenty of light is short and stocky, with close-together leaves and a thick stem. A plant that did not is leggy — long stretched gaps between the leaves, a thin stem, and it leans. That lean is not random. It points at the light.\n\nThose plants have been running your sun survey for you all summer, for free, and you are about to throw the results away. So record them first: which zones grew stocky plants and which grew stretched ones, and which way the stretched ones lean.\n\nThat gives you a prediction. Tomorrow you start measuring the sun for real, with a clock, and in a week you will have actual numbers. Then you get to find out whether the plants were right. A prediction you wrote down BEFORE the measurement is worth ten explanations invented afterward — that is the same rule that governs every test you run in Aerospace."
      }
    ],
    doInTheGarden: [
      'Mark the eight zones — two rows of four, each about 2 ft by 2 ft. Nearest the wall is A1-A4, nearest the open edge is B1-B4. Use chalk, tape, or labeled scraps.',
      'Walk every bucket and record what is in it, which zone it sits in, and whether the plant is stocky or leggy — and if leggy, which way it leans.',
      'Give every bucket a verdict: KEEP, PULL, or REPLACE. Say the reason out loud for each one.',
      'Empty the PULL and REPLACE buckets. Break up the root balls by hand, pull out the big roots, loosen and top up the mix.',
      'Set the emptied buckets in place for tomorrow, using your best guess about light for now — you will move them once the survey has real numbers.',
      'Start the sun survey. First check at 9:00 tomorrow if today is already gone, and take the same photo from the same standing spot every hour.'
    ],
    logThis: [
      { kind: 'changeover', what: 'One row for the season turn — how many buckets kept, pulled, replaced, and why.' },
      { kind: 'observation', what: 'One row per bucket: zone, what was growing, stocky or leggy, which way it leaned.' }
    ],
    sources: [
      { label: 'UGA Extension C1258 — Fall Vegetable Gardening', url: 'https://fieldreport.caes.uga.edu/publications/C1258/fall-vegetable-gardening' },
      { label: 'UGA Extension C1166 — Georgia School Garden Calendar', url: 'https://fieldreport.caes.uga.edu/publications/C1166/georgia-school-garden-calendar' }
    ],
    connectsTo: [
      { subject: 'aerospace', label: 'Write the prediction before the measurement', detail: 'Same discipline as every Aerospace test: commit to what you expect, then measure, then compare. The leggy plants are your prediction.' }
    ],
    opensProjectId: 'gd7-project-sun-survey',
    closesProjectId: null
  },

  // -------------------------------------------------------------------------
  {
    id: 'gd7-q1-b2-reading-the-survey',
    subject: 'gardening',
    quarter: 'Q1 2026-2027',
    sequenceInQuarter: 2,
    date: '2026-08-21',
    title: 'Reading the Survey',
    theme: 'Eight numbers, one map, and the first real decision the garden has ever been given',
    estMinutes: 75,
    whyToday:
      "A week of hourly checks is finished. Today the readings become a map, the map becomes a rule, and the rule decides where every bucket goes for the rest of the year.",
    teaching: [
      {
        heading: 'Ten checks is ten hours — and knowing why matters more than the number',
        text:
          "You checked once an hour, on the hour, from 9:00 to 18:00. So if a zone read DIRECT on six of those checks, you call it six hours of direct sun.\n\nBe clear about what you actually did there. You did not watch that square for six hours. You looked at it ten times and assumed each look stood for the whole hour around it. That is called sampling, and it is how almost all real measurement works — nobody watches anything continuously.\n\nSampling costs you accuracy at the edges. If the sun leaves a zone at 2:20, your 2:00 check said DIRECT and your 3:00 check said SHADE, and you counted a full hour that was really twenty minutes. So your number could be off by up to about half an hour in either direction.\n\nDoes that matter? Ask what decision it changes. If a zone reads 6 hours it might really be 5.5 or 6.5 — and every one of those is still a fruiting zone. If a zone reads 4, it might be 3.5, which is not. So the error matters at the boundaries and nowhere else. Knowing WHERE your measurement is shaky, instead of pretending it is perfect, is the actual skill."
      },
      {
        heading: 'Why leaves are cheap and fruit is expensive',
        text:
          "The rule you are about to apply is that leafy greens want roughly 4 hours of direct sun and crops that must produce fruit want 6 to 8. That is not an arbitrary gardening custom. It is an energy budget.\n\nA plant builds sugar out of light. What it does with that sugar is a spending decision. A lettuce leaf is a solar panel that mostly pays for itself — the plant builds the thing that collects the energy, so leaves are cheap. A tomato is different. A fruit collects nothing. It is pure export: sugar, water, and structure poured into a package the plant then gives away. Fruit is the most expensive thing a plant can build.\n\nSo a plant that has to make fruit needs a much bigger energy income than one you are simply going to eat the leaves off. Same reason a spacecraft that only runs instruments needs a smaller solar array than one that also has to run an engine.\n\nAnd this is why the fall season and your awning happen to agree. Fall is the leafy-green season in Georgia anyway, and leafy greens are exactly what tolerates the partial shade an awning creates. The season is not working against this garden. The awning is — and fall is the time of year when that costs you least."
      },
      {
        heading: 'A zero is a finding, not a failure',
        text:
          "You will almost certainly have at least one zone that got very little direct sun — probably one of the A zones tucked against the wall. It is tempting to treat that as bad news, or to squint at the numbers until it looks better.\n\nDo not. That zone just told you something true, for free, that you would otherwise have discovered in November by watching a plant slowly fail in it.\n\nGive it a job instead. A zone under about two hours cannot grow food, but it is a perfect place for the watering can, the spare bags of mix, the empty buckets, and the tools. Every square foot you stop asking to grow food is a square foot that stops cluttering the ones that can.\n\nThis is a real engineering move and it has a name: you do not fight a constraint you cannot change, you reassign around it. You just made your garden bigger without adding a single square foot to it."
      }
    ],
    doInTheGarden: [
      'Total each zone: count the DIRECT checks. Do it for both survey days and average them.',
      'Draw the map — two rows of four squares, each zone number written inside it. This drawing is the real output.',
      'Label each zone: FRUITING (6h+), GREENS (about 4h+), or STORAGE (under about 2h).',
      'Compare against your prediction from last week. Were the leggy plants pointing at the right zones?',
      'Move the buckets. Anything that has to fruit goes to your best zones; the greens fill the middle; the storage zone gets the cans and the spare mix.',
      'Write up the survey in the Writing Journal — this is the graded piece.'
    ],
    logThis: [
      { kind: 'measurement', what: 'One row per zone with its direct-sun hours and its assigned class.' },
      { kind: 'observation', what: 'Whether the leggy-plant prediction matched the measured map.' }
    ],
    sources: [
      { label: 'UGA Extension C1258 — Fall Vegetable Gardening', url: 'https://fieldreport.caes.uga.edu/publications/C1258/fall-vegetable-gardening' }
    ],
    connectsTo: [
      { subject: 'aerospace', label: 'Measurement error and where it matters', detail: 'Same sampling logic used when reading test data — an error bar only matters where it crosses a decision boundary.' },
      { subject: 'technology', label: 'The map is a drawing to scale', detail: 'CAD Software Fundamentals covers why a dimensioned drawing beats a description.' }
    ],
    opensProjectId: null,
    closesProjectId: 'gd7-project-sun-survey'
  },

  // -------------------------------------------------------------------------
  {
    id: 'gd7-q1-b3-water',
    subject: 'gardening',
    quarter: 'Q1 2026-2027',
    sequenceInQuarter: 3,
    date: '2026-08-28',
    title: 'The Place It Never Rains',
    theme: 'Every drop in this garden is carried by hand — so start counting them',
    estMinutes: 60,
    whyToday:
      "The fall crops went in two weeks ago and are past the daily-watering stretch. This is the moment the real watering routine starts, and the moment to start measuring it.",
    teaching: [
      {
        heading: 'UGA says one to two inches a week. Your garden gets zero.',
        text:
          "The standard guidance for a Georgia vegetable garden is to water daily for about the first week after planting, then give roughly 1 to 2 inches per week.\n\nAn inch of what, though? An inch of rain means a layer of water one inch deep spread over the ground. That is a depth, not a volume — so to use it you have to convert it, and the conversion is worth doing yourself.\n\nOne inch of water over one square foot is 144 cubic inches, which is about 0.623 gallons. So: measure the top diameter of one of your buckets, work out its area in square feet, multiply by 0.623, and you have the gallons that bucket needs for one inch of water. Do that arithmetic today with a real bucket and a real tape measure. Do not let me hand you the answer.\n\nThen the part that actually matters. Your garden is under an awning. It has never received a single one of those inches and never will. Rain is not a supplement here. It is a system you do not have, and you are the replacement for it."
      },
      {
        heading: 'A bucket is not a piece of ground',
        text:
          "There is a second correction, and it runs the other way. UGA's inch-per-week guidance is written for in-ground beds. Yours are containers, and containers behave differently in three ways that all point the same direction.\n\nThey dry faster, because a bucket has sides exposed to moving air on every face while ground only has a top. They heat more, because that same exposed sidewall soaks up August sun and warms the root zone. And they hold far less, because a bucket's root volume is a hard limit — in the ground, roots chase water down and sideways as far as they need, and in a bucket they hit plastic.\n\nPut together: in the ground an inch a week is a reasonable target, and in a black bucket in a Georgia August it can be closer to what a plant wants in a DAY. That is not a small adjustment. It is the difference between a routine that works and one that kills things while you follow it correctly.\n\nSo the rule is not a number you were given. It is a number you have to find, in your buckets, in your zones, this season."
      },
      {
        heading: 'Start counting cups — and here is what they are for',
        text:
          "From today, every watering gets logged: which zone, and how much you actually carried. Cups, jugs, or gallons — pick one unit and never change it.\n\nThis will feel pointless for about three weeks. It is not, and you should know exactly why now rather than being told later.\n\nIn Q4 you start Robotics, and the capstone build for this whole year is a soil-moisture sensor for this garden — something that tells you when a bucket actually needs water, and eventually waters it for you. That build needs to know two things: how much water this garden really uses, and how that changes with the weather and the season. There is no website that knows that. The only possible source is a log that starts now.\n\nSo every cup you write down between today and April is a measurement for a machine you are going to build. You will also learn the sensor side properly first — in Robotics you will wire a real sensor, read its numbers, pick a threshold, and watch it chatter at the boundary until you fix it. Same skill, different sensor. The garden just supplies the problem worth solving."
      }
    ],
    doInTheGarden: [
      'Measure the top diameter of one bucket. Compute its area in square feet, then multiply by 0.623 to get the gallons in one inch of water. Write the number down.',
      'Pick your unit — cups, a labeled jug, or gallons — and commit to it for the whole year.',
      'Water the garden and count. Do not estimate; count.',
      'Log every watering this week, by zone.',
      'At the end of the week, compare what you actually carried against the inch-per-week figure you computed. Which is bigger, and by how much?'
    ],
    logThis: [
      { kind: 'measurement', what: 'Bucket diameter, area, and the computed gallons per inch.' },
      { kind: 'watering', what: 'One row per watering: zone and amount carried. Every week from here to April.' }
    ],
    sources: [
      { label: 'UGA Extension C1258 — Fall Vegetable Gardening', url: 'https://fieldreport.caes.uga.edu/publications/C1258/fall-vegetable-gardening' },
      { label: 'UGA Extension C943 — Vegetable Garden Calendar', url: 'https://fieldreport.caes.uga.edu/publications/C943/vegetable-garden-calendar' }
    ],
    connectsTo: [
      { subject: 'robotics', label: 'The Q4 capstone is named today', detail: 'A soil-moisture sensor for this garden. Robotics Q4 teaches sensors, thresholds and hysteresis; the watering log started today is its training data.' },
      { subject: 'aerospace', label: 'Convert the units before you trust the number', detail: 'An inch is a depth, not a volume. Unit conversion is where real engineering errors live.' }
    ],
    opensProjectId: null,
    closesProjectId: null
  },

  // -------------------------------------------------------------------------
  {
    id: 'gd7-q1-b4-second-window',
    subject: 'gardening',
    quarter: 'Q1 2026-2027',
    sequenceInQuarter: 4,
    date: '2026-09-04',
    title: 'The Second Window',
    theme: 'A second planting date, two ways of starting a plant, and one crop that outlasts the school year',
    estMinutes: 60,
    whyToday:
      "The August 30 to September 1 window has just opened for a different set of crops, and it closes fast.",
    teaching: [
      {
        heading: 'Why north Georgia plants ahead of the chart',
        text:
          "UGA publishes a planting chart for the whole state, B577. It is genuinely good and you should use it. But it is written for MIDDLE Georgia, and you are north of that.\n\nIn fall, north Georgia plants about two weeks EARLIER than the chart says. That direction surprises people, so it is worth understanding rather than memorizing. In spring you plant later up north because you are waiting for it to warm up. In fall you plant earlier up north because you are racing something — the first frost. Colder region, earlier frost, less time. So everything has to go in sooner to be ready before it arrives.\n\nThat is why your August 15 date led the chart, and why this window is open now:\n\nAugust 30 to September 1 — Brussels sprouts, Chinese cabbage, cauliflower, garlic, onions.\n\nFor comparison, here is what went in on August 15: beets, broccoli, cabbage, carrots, collards, kale, leeks, mustard, spinach, and Swiss chard. And one more window is still coming, September 15 to October 15, for leaf lettuces and radishes."
      },
      {
        heading: 'Seed or start — and why the answer is about roots',
        text:
          "Some things go in as seed, straight into the bucket. Others go in as a young plant somebody else already started. The choice is not about difficulty. It is about roots.\n\nCarrots, radishes and beets are direct-seeded because the part you eat IS the root. Transplanting them means disturbing that root while it is forming, and a disturbed carrot root forks, twists, or stunts. You cannot move it and get a straight carrot.\n\nBroccoli, cabbage and cauliflower transplant well because the part you want grows above ground, and their roots recover from being moved. Buying them as starts also buys you weeks — which matters a lot when you are racing a frost date.\n\nSo the rule is: if the crop IS a root, seed it where it will live. If the crop is a head or a leaf, a transplant is fine and often smarter. Notice that this is a constraint reasoned from the structure of the thing, not a rule handed to you. That is the same move you made with the sun zones."
      },
      {
        heading: 'Garlic and onions run on a different clock',
        text:
          "Everything else you have planted this fall works on a scale of weeks. Garlic does not.\n\nGarlic planted now will not be harvested until early next summer. It sits in that bucket through the entire school year — through the whole of Q2, Q3 and Q4, through every other project in this subject. It will be the longest-running thing in your garden by a very wide margin.\n\nThat has a real cost worth stating plainly: a bucket of garlic is a bucket you cannot use for anything else for nine months. In a garden with 32 square feet of floor, committing a zone that long is a genuine decision, not a free one. Decide it on purpose.\n\nIt also has a real reward. Most of what you plant, you will find out about in six weeks. Garlic teaches something the fast crops cannot — that some things you set up now do not report back for most of a year, and you have to keep them alive through the whole stretch without feedback. Every long project works like that."
      }
    ],
    doInTheGarden: [
      'Check your zone map before you plant anything. This window goes into zones the survey says can support it.',
      'Plant the second window: Brussels sprouts, Chinese cabbage, cauliflower, garlic, or onions — whichever you have.',
      'For each crop, decide seed or transplant BEFORE you plant, and say why out loud.',
      'Give garlic a zone on purpose, knowing it holds that bucket until early summer. Mark it so nobody disturbs it.',
      'Keep logging every watering.'
    ],
    logThis: [
      { kind: 'planting', what: 'One row per crop: what, which zone, seed or transplant, and the date.' }
    ],
    sources: [
      { label: 'UGA Extension C1258 — Fall Vegetable Gardening', url: 'https://fieldreport.caes.uga.edu/publications/C1258/fall-vegetable-gardening' },
      { label: 'UGA Extension B577 — Georgia Home Garden Planting Chart', url: 'https://secure.caes.uga.edu/extension/publications/files/html/B577/B577PlantingChart.pdf' }
    ],
    connectsTo: [
      { subject: 'aerospace', label: 'Long-lead items', detail: 'Garlic is the garden version of a part with a nine-month lead time — you commit early, without feedback, and everything downstream waits on it.' }
    ],
    opensProjectId: null,
    closesProjectId: null
  },

  // -------------------------------------------------------------------------
  {
    id: 'gd7-q1-b5-ph',
    subject: 'gardening',
    quarter: 'Q1 2026-2027',
    sequenceInQuarter: 5,
    date: '2026-09-18',
    title: 'pH, and Why Old Mix Lies to You',
    theme: 'The most common cause of a starving plant is not missing food — it is food the plant cannot reach',
    estMinutes: 60,
    whyToday:
      "Everything is planted and growing, and this is the point where a nutrient problem starts showing up in the leaves — early enough to fix, late enough to be visible.",
    teaching: [
      {
        heading: 'pH is not food. It is whether the food is reachable.',
        text:
          "The target for vegetables is a soil pH of about 6.2 to 6.8 — slightly acidic. Almost every gardening source will tell you that number. Far fewer will tell you what it is doing.\n\npH does not measure how much nutrition is in your mix. It measures how acidic or alkaline it is, and that controls whether the nutrients already sitting there can dissolve into water and enter a root. A plant can only take up what is dissolved. Everything else may as well be a rock.\n\nWhen pH climbs too high, iron and manganese lock up — they stop dissolving. The plant starves for iron while surrounded by iron. When pH drops too low, other elements become too available, to the point of being toxic, and the plant is poisoned by an excess rather than starved by a shortage.\n\nSo the frustrating case, and the common one, is a plant showing every sign of hunger in a bucket with plenty of nutrition in it. Adding more fertilizer to that bucket does nothing except cost money. The problem is not supply. It is access — and 6.2 to 6.8 is simply the window where the most nutrients are reachable at once."
      },
      {
        heading: 'Why mix that was fine in March is not fine in September',
        text:
          "Fresh potting mix usually arrives in the right range. Then it drifts, and container mix drifts faster than ground does, for reasons that are all consequences of it being in a bucket.\n\nIt decomposes. Most mixes are largely organic material — bark, coir, peat — and organic material breaks down. As it does, the structure collapses, the mix compacts and holds less air, and its chemistry shifts.\n\nFertilizer salts accumulate. Every feeding leaves a residue behind. In the ground, rain flushes those down and away. Under an awning nothing ever flushes anything, because nothing ever rains. Whatever you add stays.\n\nAnd it is a small closed volume. A bucket holds a few cubic feet, so any change you make lands hard. The ground buffers itself; a bucket cannot.\n\nThis is also the delayed reason the August changeover mattered. Breaking up those root balls and topping up the mix was not tidying. It was resetting a system that had spent a whole summer drifting."
      },
      {
        heading: 'Test it. Do not guess it, and do not test everything.',
        text:
          "A soil pH test kit costs a few dollars and gives you a real number in about ten minutes. There is no way to see pH by looking at a plant — the symptoms of a pH problem look exactly like the symptoms of a nutrient shortage, which is precisely why people fix the wrong one.\n\nBut do not test eight buckets. Test by GROUP: one sample from your fruiting zones, one from your greens zones, one from any bucket whose plant looks unhappy compared to its neighbors.\n\nThat last one is the real experiment. You have a bucket that is doing worse than the ones beside it, growing in the same mix, under the same sun, on the same watering. If its pH matches theirs, pH is not your answer and you have honestly ruled something out — which is a result. If it does not match, you just found the cause.\n\nRuling a suspect out is not a wasted test. In any real diagnosis, most of the tests you run come back normal, and each one narrows what is left."
      }
    ],
    doInTheGarden: [
      'Take three samples: one from a fruiting zone, one from a greens zone, one from whichever bucket looks worst.',
      'Run the pH test on all three and write the numbers down before you interpret anything.',
      'Compare each against the 6.2 to 6.8 target and against each other.',
      'Look closely at every plant and note anything yellowing, spotted, or smaller than its neighbors — the leaves are evidence.',
      'Decide, in writing, whether pH explains what you are seeing or whether you have just ruled it out.'
    ],
    logThis: [
      { kind: 'measurement', what: 'One row per sample: which zone, the pH reading, and whether it sits in range.' },
      { kind: 'observation', what: 'Any plant looking worse than its neighbors, with what you actually see.' }
    ],
    sources: [
      { label: 'UGA Extension C1258 — Fall Vegetable Gardening', url: 'https://fieldreport.caes.uga.edu/publications/C1258/fall-vegetable-gardening' },
      { label: 'UGA Extension B577 — Georgia Home Garden Planting Chart', url: 'https://secure.caes.uga.edu/extension/publications/files/html/B577/B577PlantingChart.pdf' }
    ],
    connectsTo: [
      { subject: 'aerospace', label: 'Ruling a cause out is a result', detail: 'Most tests in a real investigation come back normal. Each one still narrows the field.' },
      { subject: 'robotics', label: 'A sensor reads one property, not the whole problem', detail: 'A pH kit measures acidity, not nutrition — the same limit every sensor you wire in Q4 will have.' }
    ],
    opensProjectId: null,
    closesProjectId: null
  },

  // -------------------------------------------------------------------------
  {
    id: 'gd7-q1-b6-nasa-water',
    subject: 'gardening',
    quarter: 'Q1 2026-2027',
    sequenceInQuarter: 6,
    date: '2026-09-25',
    title: 'How NASA Waters a Box',
    theme: 'Six plants in a container the size of carry-on luggage — and why their hardest problem is your hardest problem',
    estMinutes: 60,
    whyToday:
      "You have four weeks of your own watering data now. That is exactly what you need to understand why NASA stopped pouring water on plants, and it sets up the build that comes next quarter.",
    teaching: [
      {
        heading: 'Veggie, and the problem with pouring water in space',
        text:
          "There is a plant growth system on the International Space Station called Veggie. It holds six plants in a container roughly the size of a piece of carry-on luggage. Astronauts have grown and eaten food out of it — kale and Dragoon lettuce harvested and eaten on November 28, 2018, and since then chile peppers and dwarf wheat.\n\nThe interesting part is how it delivers water, because it does not pour it. Each plant grows in a small pillow packed with baked clay and fertilizer, and water is drawn through by wicking rather than poured on top.\n\nThat is not a preference. In microgravity, water does not fall. It clings and forms blobs, so a poured drink either drowns the roots in a sphere of water they cannot escape, or leaves them stranded in a pocket of air with nothing touching them at all. Roots need water AND air, at the same time, in contact with the same surfaces — and gravity is what normally arranges that for free.\n\nSo NASA had to build the arrangement gravity usually provides. Wicking does it: water moves through the material by capillary action, spreading evenly, with air still in the gaps.\n\nThey also lit it with magenta LEDs — red and blue — because plants use red and blue light most efficiently and green light is largely reflected. That reflection is why leaves look green to you. Every photon of green you see is one the plant declined."
      },
      {
        heading: 'A different constraint, the same question',
        text:
          "Do not file this as a space fact. The two gardens are asking the same question.\n\nNASA's constraint: no gravity, so water will not distribute itself. Your constraint: no rain, ever, so water does not arrive at all. Different causes — and in both cases, water delivery becomes the central engineering problem rather than a chore around the edges.\n\nThere is a second thing they share, and it is the harder one. Both are CLOSED. Nothing enters Veggie that the crew does not put in. Nothing enters your garden that you do not carry in. In an open garden, rain flushes salts out, wind moves air, insects arrive, and the ground buffers your mistakes. Under an awning, most of that is switched off — which is exactly what you worked out in the pH brief without calling it that.\n\nThere is also a bigger, enclosed system on the station called the Advanced Plant Habitat, carrying more than 180 sensors so it can run mostly without crew attention. Sit with that number. 180 sensors is what it costs to stop a human from having to look at a plant every day. You are the sensors in this garden right now, and in Q4 you are going to build your first one."
      },
      {
        heading: 'What you are going to build, and why not yet',
        text:
          "Next quarter's build is a self-watering bucket, and it borrows Veggie's idea directly. A reservoir underneath, a wicking column running up into the mix, and an overflow so it cannot flood. The plant drinks what it needs, when it needs it, instead of when you happen to be out there.\n\nAnd you are going to build it properly, which means you will build TWO of them and keep one ordinary bucket exactly as it is. That plain bucket is the control. Without it, you would have a self-watering bucket and a feeling. With it, you have a comparison: how often did each need attention, and how did the plants actually do.\n\nThat is why today is reading and looking rather than building. Right now you are still collecting the numbers that will tell you whether the build worked — four weeks in, and you need more. Open your watering log and find the zone that has eaten the most water. That zone is where the first self-watering bucket goes, because that is where it saves you the most.\n\nBuilding the thing is the easy part. Knowing where to put it is what the last four weeks were for."
      }
    ],
    doInTheGarden: [
      'Open your watering log and total the water carried per zone over the last four weeks.',
      'Rank the zones from thirstiest to least. Write the ranking down.',
      'Pick the zone that would benefit most from a reservoir — that is where build 2 goes in Q2.',
      'Look at one of your plants and find the green you are seeing. That is light the plant refused.',
      'Nothing gets built today. Keep watering, keep logging.'
    ],
    logThis: [
      { kind: 'observation', what: 'The zone ranking by water used, and which zone is chosen for the first self-watering bucket.' }
    ],
    sources: [
      { label: 'NASA — Station Science 101: Plant Research (Veggie, and the Advanced Plant Habitat)', url: 'https://www.nasa.gov/missions/station/ways-the-international-space-station-helps-us-study-plant-growth-in-space/' },
      { label: 'NASA — The Shape of Watering Plants in Space', url: 'https://www.nasa.gov/missions/station/the-shape-of-watering-plants-in-space/' },
      { label: 'NASA Facts — The Advanced Plant Habitat (the 180-sensor figure)', url: 'https://www.nasa.gov/wp-content/uploads/2021/07/advanced-plant-habitat.pdf' }
    ],
    connectsTo: [
      { subject: 'aerospace', label: 'Closed systems and life support', detail: 'Growing food in a sealed box is the same problem class as keeping a crew alive in one.' },
      { subject: 'robotics', label: '180 sensors is what replaces a person looking', detail: 'The Advanced Plant Habitat automates attention. Your Q4 moisture sensor is the first one of those you will build yourself.' },
      { subject: 'technology', label: 'Build 2 gets designed before it gets built', detail: 'The reservoir, wicking column and overflow are three parts with dimensions — which is a CAD drawing.' }
    ],
    opensProjectId: null,
    closesProjectId: null
  },

  // -------------------------------------------------------------------------
  {
    id: 'gd7-q1-b7-succession',
    subject: 'gardening',
    quarter: 'Q1 2026-2027',
    sequenceInQuarter: 7,
    date: '2026-10-09',
    title: 'Succession, and the Fast Crops',
    theme: 'Getting more food out of the same square feet without building anything at all',
    estMinutes: 60,
    whyToday:
      "The September 15 to October 15 window is open right now and closes in under a week. These are the fastest crops of the season, and speed is what makes the whole idea work.",
    teaching: [
      {
        heading: 'The fastest crops you will grow all year',
        text:
          "This window is for leaf lettuces and radishes, and both are unusually quick.\n\nRadishes are the fastest thing in most gardens — roughly 25 to 30 days from seed to pulling one out of the bucket. Plant on the 9th and you can be eating them in early November.\n\nLeaf lettuce takes longer, roughly 45 to 55 days, but it does something better. If you harvest by cutting the outer leaves and leaving the growing center alone, the plant keeps producing. Gardeners call it cut-and-come-again. Harvest a head lettuce and the plant is over; harvest a leaf lettuce correctly and you are back in a couple of weeks.\n\nHold those two facts next to your garlic from September. Garlic occupies a bucket for nine months and gives you one harvest. A leaf lettuce occupies a bucket for about seven weeks and gives you several. Neither is better. But if you are trying to get the most out of 32 square feet, they are extremely different deals, and you should be able to say which is which."
      },
      {
        heading: 'Succession — the same space, more times',
        text:
          "Here is the move, and it is a good one. Do not plant all your radish seed today.\n\nPlant a small batch now. Plant another small batch in about two weeks. Maybe a third after that, if the season allows. This is called succession planting.\n\nPlant everything at once and every radish is ready in the same week. You get more radishes than anyone can eat, followed by weeks of nothing, in a bucket now sitting empty. Stagger them and the harvest spreads out, the bucket keeps working, and you eat radishes over a month instead of in a single overwhelming Saturday.\n\nNow notice what actually happened there. You just got more food out of the same 32 square feet — and you did not build anything, buy anything, or find a single extra square foot. You changed WHEN, not WHERE.\n\nThat is worth sitting with for a minute, because your instinct all year has been that more food means more space. Sometimes it means more turns. In your garden the floor is fixed at 32 square feet, but the number of times each square foot can be used in a year is not fixed at all. It is a variable, and you control it."
      },
      {
        heading: 'Two directions to grow, and you have now used both',
        text:
          "Step back and look at what this subject has actually been teaching you.\n\nThere are only two ways to get more out of a fixed footprint. You can use more SPACE — stack upward into the 224 cubic feet you are not touching, which is builds 2 through 5 and starts next quarter. Or you can use more TIME — turn each square foot over more often, which is what you did today with a packet of radish seed and a calendar.\n\nSpace costs money, materials, and construction. Time costs planning. Time is almost always the cheaper one, and almost nobody tries it first because it does not feel like doing anything.\n\nSo the honest order is: exhaust the free move before you spend on the expensive one. You are about to spend a quarter building a vertical structure — and you should, because you genuinely do run out of turns eventually. But you should walk into that build knowing you already took the free win, and knowing exactly how much it was worth. Count it in November."
      }
    ],
    doInTheGarden: [
      'Check the zone map. Lettuce and radishes are quick but they still want your better-lit zones.',
      'Plant a SMALL first batch of radishes — a fraction of the packet, not all of it.',
      'Plant leaf lettuce, and mark it so you remember to harvest outer leaves only.',
      'Put a reminder two weeks out for the second radish batch. That reminder IS the technique.',
      'Write down how many separate harvests you expect from these buckets before the season ends.'
    ],
    logThis: [
      { kind: 'planting', what: 'One row per batch, with the batch number and date — the point is the staggering.' }
    ],
    sources: [
      { label: 'UGA Extension C1258 — Fall Vegetable Gardening', url: 'https://fieldreport.caes.uga.edu/publications/C1258/fall-vegetable-gardening' },
      { label: 'UGA Extension C943 — Vegetable Garden Calendar', url: 'https://fieldreport.caes.uga.edu/publications/C943/vegetable-garden-calendar' }
    ],
    connectsTo: [
      { subject: 'technology', label: 'Solve it with scheduling before you solve it with hardware', detail: 'The cheapest fix to a capacity problem is usually not a bigger machine.' },
      { subject: 'aerospace', label: 'Throughput versus capacity', detail: 'How many times a fixed resource can be reused is a different question from how big it is.' }
    ],
    opensProjectId: null,
    closesProjectId: null
  },

  // -------------------------------------------------------------------------
  {
    id: 'gd7-q1-b8-harvest-and-zinnia',
    subject: 'gardening',
    quarter: 'Q1 2026-2027',
    sequenceInQuarter: 8,
    date: '2026-10-23',
    title: 'First Harvest, and the Zinnia',
    theme: 'Taking food off the plants — and learning to read one that is failing',
    estMinutes: 75,
    whyToday:
      "The August 15 planting is ready. This is the payoff Friday, and it is also the right moment to learn what a struggling plant is telling you, while there is still season left to act on it.",
    teaching: [
      {
        heading: 'How you harvest decides whether you harvest again',
        text:
          "There are two ways to take food off a plant, and choosing wrong ends the plant early.\n\nCut-and-come-again: take the outer, older leaves and leave the growing point at the center untouched. Kale, collards, Swiss chard, mustard and leaf lettuce all work this way. The plant keeps making new leaves from the middle and you keep coming back for weeks.\n\nWhole-plant: the thing you want IS the plant, or the part you want only forms once. Radishes, carrots, beets and a head of cabbage come out whole. That bucket is now empty and ready for the next thing.\n\nThe mistake worth naming is harvesting a cut-and-come-again crop as though it were a whole-plant one — cutting the whole kale plant off at the base for one big pile of greens. You get one harvest instead of six, and the bucket is empty for a month.\n\nAnd notice this is the same lesson as the radishes two weeks ago, wearing different clothes. More harvests out of the same square feet, decided by how you take the food rather than by how much space you have."
      },
      {
        heading: 'The zinnia that got sick in orbit',
        text:
          "In 2016, before the lettuce and the peppers, NASA grew zinnia flowers on the space station, and they did not go well. On December 27 the station commander, Scott Kelly, reported that the plants \"aren't looking too good.\" Traces of mold were found on them.\n\nWhat happened next is the part worth keeping. Kelly said he was going to have to channel his \"inner Mark Watney\" — the botanist from The Martian — which is an astronaut's way of saying he was about to start making judgment calls instead of following the plan. By January 8 he reported the plants were recovering and no longer looking sad.\n\nSo the crop came back because somebody stood in front of it and decided, not because a better procedure had been written in advance. NASA's payload scientist drew the lesson out afterward: lighting and other environmental conditions turn out to be MORE critical for a flowering crop than for a leafy vegetable — which is a thing you only learn by trying it and watching it go wrong.\n\nA schedule assumes the conditions you predicted. A plant lives in the conditions it actually got. When those two disagree, the plant is right.\n\nYou should hear something familiar there. You are running a watering log. It is genuinely useful and you should keep it. But the log is a schedule, and the zinnia is the reminder that the log does not overrule the plant. In Q4 you will build a sensor to watch the buckets for you, and that sensor will have exactly the same weakness — it will report the one thing it measures and stay silent about everything else. It will never see mold."
      },
      {
        heading: 'Reading a plant that is failing',
        text:
          "So walk the garden today and diagnose, not just harvest. A few things are worth being able to tell apart, because they look similar and mean opposite things.\n\nWilting with dry mix means thirsty — water it. Wilting with WET mix means the opposite: the roots are drowning and cannot take up water even though it surrounds them. Watering that plant harms it. Always feel the mix before you decide, because the leaves alone will lie to you here.\n\nYellowing that starts on the oldest, lowest leaves usually means a nutrient is short and the plant is moving it to the new growth — it is triaging. Yellowing on the newest leaves first is a different problem and points back at the pH work you did in September.\n\nSpots, fuzz, or powder on leaves are living things, not a nutrient issue. Improve airflow, avoid wetting the foliage, and water the mix rather than the plant. This is precisely why drip and soaker delivery beat overhead watering — dry leaves get sick far less.\n\nAnd stretched, leggy growth means not enough light. You know exactly what to do with that one now: you have a map."
      }
    ],
    doInTheGarden: [
      'Harvest the August 15 planting. For each crop, decide cut-and-come-again or whole-plant BEFORE you cut anything.',
      'On the cut-and-come-again crops, take outer leaves only and leave the center alone.',
      'Walk every bucket and write down anything wrong: wilting, yellowing, spots, or leggy growth.',
      'For each problem, feel the mix first, then name what you think is happening and what you will change.',
      'Log the harvest — and weigh or count it if you can. It is the first real output number this garden has produced.'
    ],
    logThis: [
      { kind: 'harvest', what: 'One row per crop harvested, with amount and whether it can be harvested again.' },
      { kind: 'observation', what: 'Any struggling plant, what you saw, what you concluded, and what you changed.' }
    ],
    sources: [
      { label: 'NASA — Zinnias From Space! NASA Studies the Multiple Benefits of Gardening', url: 'https://www.nasa.gov/humans-in-space/zinnias-from-space-nasa-studies-the-multiple-benefits-of-gardening/' },
      { label: 'UGA Extension C1258 — Fall Vegetable Gardening', url: 'https://fieldreport.caes.uga.edu/publications/C1258/fall-vegetable-gardening' }
    ],
    connectsTo: [
      { subject: 'robotics', label: 'A sensor only reports what it measures', detail: 'The Q4 moisture sensor will never see mold. Knowing what an instrument cannot tell you is part of using it.' },
      { subject: 'aerospace', label: 'The failure taught more than the successes', detail: 'A crop that went wrong in orbit produced better guidance than the ones that went right.' }
    ],
    opensProjectId: null,
    closesProjectId: null
  },

  // =========================================================================
  // Q2 — Building & Creating (Nov-Dec 2026). LIGHT ON PURPOSE: 4 briefs across
  // 6 usable Fridays. The design predicted this shape before the content
  // existed — "light in Nov when the work is planning and soil tests" — and
  // UGA's own C943 calendar independently says the same thing for Nov-Dec:
  // spread compost and leaves, take soil samples, order seed, plan next year.
  // Two Fridays are lost to Thanksgiving and Christmas; see gardenCalendar.js.
  // =========================================================================
  {
    id: 'gd7-q2-b1-frost',
    subject: 'gardening',
    quarter: 'Q2 2026-2027',
    sequenceInQuarter: 1,
    date: '2026-11-06',
    title: 'The Frost Question',
    theme: 'Nobody publishes your frost date - and the most repeated fact about frost does not survive being measured',
    estMinutes: 75,
    whyToday:
      "Frost is close now, and the whole fall garden either survives it or does not. This is also the last comfortable Friday to prepare rather than react.",
    teaching: [
      {
        heading: 'Nobody will hand you your frost date',
        text:
          "You would think there is a website that says \"north Georgia freezes on this day.\" There is not, and finding that out is the first lesson.\n\nUGA Extension does not publish a single frost date for the state. What it does instead is point at the Georgia Automated Environmental Monitoring Network - a set of real automated weather stations across Georgia - and let you pull the numbers for a location near you.\n\nAnd when you do, you will notice the answer does not come back as a date. It comes back as a PROBABILITY: something like a 50 percent chance of hitting 32 degrees by a certain day, and a 90 percent chance by a later one. That is not the science being vague. That is the science being honest. Frost is weather, and weather does not keep appointments.\n\nSo the thing you actually want is not \"the frost date.\" It is \"the date by which I would be foolish to still have unprotected plants out.\" Those are different questions, and only the second one is answerable.\n\nGo find your number today and write it in the log. You will use it every fall for the rest of your life, and you will have gotten it yourself."
      },
      {
        heading: 'What frost actually does, and why your buckets are in more danger than a garden bed',
        text:
          "A frost kills a plant by freezing the water inside it. Ice takes up more room than liquid water, so ice crystals forming inside a cell push the cell walls apart and rupture them. When it thaws, the structure is gone - that is why a frosted squash plant goes black and limp rather than merely looking cold.\n\nCool-season crops - kale, collards, spinach, cabbage - handle this far better than warm-season ones. Warm-season crops like tomatoes and peppers do not handle it at all. That is the entire reason a fall garden is planted with the crops it is planted with.\n\nNow the part specific to you. Your plants are in buckets, and a bucket is a far more dangerous place to be on a cold night than the ground is.\n\nThink about where the roots are. In a garden bed, roots sit down inside the earth, and the earth is an enormous heat battery - it soaked up warmth all day and gives it back all night, and it takes an extremely long time to freeze more than a few inches down. In a bucket, the roots are ABOVE grade with cold air on every side, in a few gallons of mix with almost no thermal mass at all. A bucket can freeze through. Ground almost never does.\n\nSo the same crop, on the same night, is genuinely at more risk in your garden than in a neighbor's bed. Grouping the buckets tightly together helps, because a cluster has less exposed surface than eight scattered buckets. Pushing them against the building helps, because the wall gives back heat too. That is the same logic as the earth, borrowed."
      },
      {
        heading: 'The most repeated fact about frost - and what happened when somebody measured it',
        text:
          "Ask any gardener and you will hear this: frost makes kale and collards sweeter, because the cold turns the plant's starch into sugar.\n\nIt is repeated everywhere. It sounds like it explains something. And researchers at the University of Tennessee actually went and tested it - sampling kale, radishes and turnips from plots before and after a frost, and measuring sugars, starch, protein and digestibility.\n\nHere is what they found. Sugar in the leaves was slightly higher after frost - so far so good for the story. But starch was ALSO slightly higher, not lower. And if starch did not go down, then starch did not turn into sugar. The mechanism everybody quotes is not what happened. In the taproots, sugar levels did not change at all.\n\nSit with that for a second, because it is the most useful thing in this brief and it has nothing to do with kale.\n\nA claim can be repeated by thousands of people, sound completely sensible, come with a tidy mechanism attached, and still not be what the measurements show. Repeated is not the same as verified. The only way anyone ever found out was that somebody bothered to sample the plants and run the numbers.\n\nYou have run one test like that already this year - you predicted which zones had the most sun from how the plants grew, and then you measured. Do not stop doing that just because a claim is popular. Popular claims are the ones nobody checks."
      }
    ],
    doInTheGarden: [
      'Look up freeze probabilities for a Georgia weather station near you and write the dates in the log - the 50 percent date and the 90 percent date, not one guess.',
      'Walk the garden and sort what is out there: which crops shrug off a frost, and which are finished the first cold night.',
      'Group the buckets together, and move the most vulnerable ones nearest the wall. Less exposed surface, more borrowed heat.',
      'Find something to throw over them on a cold night - an old sheet or a length of row cover. Drape it to the ground so it traps ground heat, and take it off in the morning.',
      'Write down a prediction: which plant out there will be the first to show frost damage?'
    ],
    logThis: [
      { kind: 'measurement', what: 'Your two freeze-probability dates, and where you got them.' },
      { kind: 'observation', what: 'What you moved and why, plus your prediction about the first plant to show damage.' }
    ],
    sources: [
      { label: 'UGA Extension - Frost Dates in Georgia (Georgia Automated Environmental Monitoring Network)', url: 'https://extension.uga.edu/about/our-impact/impact-stories/impact-brief/1883/frost-dates-in-georgia.html' },
      { label: 'University of Tennessee - Do Brassicas Actually Get "Sweeter" After a Frost?', url: 'https://fwf.tennessee.edu/wp-content/uploads/sites/24/2021/07/Do-brassicas-get-sweeter_QW28.2.pdf' }
    ],
    connectsTo: [
      { subject: 'socialStudies', label: 'Evaluating a source', detail: 'Social Studies Q2 teaches corroboration and bias for genealogy. Same skill, aimed at a gardening claim instead of a record.' },
      { subject: 'aerospace', label: 'A probability is a more honest answer than a date', detail: 'Nothing in engineering is certain; it is stated with a confidence attached.' }
    ],
    opensProjectId: null,
    closesProjectId: null
  },

  {
    id: 'gd7-q2-b2-build-self-watering',
    subject: 'gardening',
    quarter: 'Q2 2026-2027',
    sequenceInQuarter: 2,
    date: '2026-11-13',
    title: 'Build 2 - The Bucket That Drinks By Itself',
    theme: 'Your first real build: a reservoir, a wick, an overflow - and one plain bucket you deliberately do not improve',
    estMinutes: 120,
    whyToday:
      "The sun survey is written up, which unlocks the build track. And November is the right month to build rather than plant - nothing new is going in the ground, so the garden can spare the attention.",
    teaching: [
      {
        heading: 'Why a plant drinks better than you pour',
        text:
          "Watering by hand produces a sawtooth. Right after you water, the mix is soaked - so wet that air is pushed out of the spaces between particles, and roots that need oxygen are temporarily drowning. Then it dries, and dries, and by the time you come back the plant has spent hours or days genuinely short of water. It is either too wet or too dry, and it is only briefly right in between.\n\nA plant does not want a flood followed by a drought. It wants water CONTINUOUSLY AVAILABLE, in a mix that still has air in it.\n\nThat is what a reservoir underneath gets you. The water is not sitting in the root zone - it is below it, and the mix pulls up only as much as it can hold. The top stays airy. The bottom stays supplied. The plant takes what it needs when it needs it instead of when you happen to be out there.\n\nAnd remember why NASA cared about this. In Veggie, poured water does not fall - it clings in blobs, so roots either drown or get stranded in an air pocket. They had to build the arrangement gravity normally provides for free. You have gravity. What you do not have is rain, so your reservoir is solving your version of the same problem: getting water to a root without standing there holding a can."
      },
      {
        heading: 'Capillary action - and why how hard you pack it matters',
        text:
          "The wick is a column of potting mix packed down into the water. Water climbs UP it, against gravity, with nothing pushing it. That is capillary action, and it is worth understanding rather than accepting.\n\nTwo things are happening at once. Water molecules stick to the surfaces around them - that is adhesion, and it is what pulls water up the walls of a narrow space. Water molecules also stick to each other - that is cohesion, and it is what drags the rest of the column along behind. In a narrow enough gap, adhesion at the edges lifts water faster than gravity pulls it down, and the water climbs. The narrower the space, the higher it climbs.\n\nThis is why packing matters, and why the instructions tell you to do two opposite things in the same bucket. In the wick column you pack the mix FIRMLY, because tightly packed particles leave narrow spaces and narrow spaces climb well. Above the column you leave it LOOSE, because up there you want big spaces holding air for the roots.\n\nOne bucket, packed two different ways, for two different reasons. If you pack the whole thing tight you get a wick with no air; if you pack it all loose you get air with no wick.",
      },
      {
        heading: 'NASA built your bucket, and got it wrong twice first',
        text:
          "Right now, on the space station, the way a plant gets watered in Veggie is that an astronaut pushes a SYRINGE into the fabric pillow it is growing in and injects the water by hand. A person, a syringe, one pillow at a time.\n\nThat should sound familiar. It is you with a watering can, in a place where rain does not fall — except their reason is that water will not fall at all.\n\nSo NASA built the thing you are building today. It is called PONDS, the Passive Orbital Nutrient Delivery System, and the word that matters is PASSIVE. NASA describes it as an entirely passive system: no electricity, no pumps, no moving parts. It carries a 400 millilitre reservoir, and that reservoir is what buys the crew a longer stretch between waterings.\n\nA reservoir, a wick, no moving parts, so a person can stop showing up every day. That is your bucket. You are not doing a scaled-down version of something clever NASA did — you are solving the same problem with the same strategy.\n\nAnd here is the part worth more than the flattery. The first time PONDS was tested in microgravity, TOO MUCH water was delivered to the seeds. The second time, TOO LITTLE. Two flights, two failures, in opposite directions. What eventually helped was narrower, skinnier wicks made of a different material, along with structures to make sure oxygen still got to the roots.\n\nRead that again with your own build in mind, because it tells you exactly what to expect. The wick is the hard part, the two ways to fail are opposite — too much drowns the roots, too little starves them — and the fix is the geometry of the wick itself. NASA needed more than one try in orbit. You will probably need more than one try on a bucket, and now you know that is what the work looks like rather than a sign you did it wrong."
      },
      {
        heading: 'The bucket you are not allowed to improve',
        text:
          "You are building two self-watering buckets. You are also keeping a third bucket exactly as it is - same mix, same crop, same day, same kind of light - and doing nothing clever to it at all. That is the CONTROL, and it is the part most people skip.\n\nHere is why it is not optional. Suppose you build the two, and in three weeks the plants look great. What did you learn? Nothing. Maybe they look great because of the reservoir. Maybe November is simply an easier month than August. Maybe that crop was going to do well regardless. You cannot tell, because you have nothing to compare against.\n\nNow suppose the plain bucket sits right beside them, treated the same, and IT needed watering nine times while the other two needed three. Now you have a number that means something.\n\nThe trap is called a confounded comparison, and it is easy to fall into by being helpful. If your self-watering buckets get the better zone, or a healthier seedling, or a fresher bag of mix, then at the end you will not know whether the reservoir did it or the sunshine did. Every difference you allow between them is a possible explanation you can no longer rule out. So you allow exactly one: the reservoir.\n\nToday you also start being a builder rather than someone who reads about building. The tool skill is the drill - and the real skill is not the drilling. It is clamping the work first."
      }
    ],
    doInTheGarden: [
      'Read the whole build through once before you pick up a tool. Builders read the plan first.',
      'Clamp every bucket before drilling. A round bucket with a bit spinning in it wants to spin too.',
      'Build both self-watering buckets - platform, wick column, overflow hole, fill pipe.',
      'Set up the third bucket the ordinary way and change nothing about it. This is the hard discipline of the day.',
      'Plant all three the same, in similar light, on the same afternoon.',
      'Fill the reservoirs through the pipe until water runs out of the overflow.',
      'Write your prediction down BEFORE the data starts: how many waterings will each bucket need in three weeks?'
    ],
    logThis: [
      { kind: 'measurement', what: 'The build itself - dimensions, overflow height, and what you predicted.' },
      { kind: 'watering', what: 'Every watering from now on, logged PER BUCKET. The comparison is only as good as this log.' }
    ],
    sources: [
      { label: 'NASA — The Shape of Watering Plants in Space (PONDS)', url: 'https://www.nasa.gov/missions/station/the-shape-of-watering-plants-in-space/' },
      { label: 'NASA — Station Science 101: Plant Research', url: 'https://www.nasa.gov/missions/station/ways-the-international-space-station-helps-us-study-plant-growth-in-space/' },
      { label: 'UGA Extension C943 - Vegetable Garden Calendar', url: 'https://fieldreport.caes.uga.edu/publications/C943/vegetable-garden-calendar/' }
    ],
    connectsTo: [
      { subject: 'aerospace', label: 'A passive system beats a powered one when nobody is there to fix it', detail: 'PONDS runs with no pumps and no moving parts on purpose. Fewer parts, fewer failures, no power budget.' },
      { subject: 'aerospace', label: 'Change one variable, keep a control', detail: 'The plain bucket is what turns a build into an experiment.' },
      { subject: 'technology', label: 'Read the plan before you cut', detail: 'The engineering design process, applied with real tools in your hands.' }
    ],
    opensProjectId: 'gd7-project-self-watering-bucket',
    closesProjectId: null
  },

  {
    id: 'gd7-q2-b3-comparison',
    subject: 'gardening',
    quarter: 'Q2 2026-2027',
    sequenceInQuarter: 3,
    date: '2026-12-04',
    title: 'Reading the Comparison',
    theme: 'Three weeks of data, one honest complication, and the question you should always ask before you look',
    estMinutes: 75,
    whyToday:
      "Three weeks of separate watering logs is enough to compare. It is also the last Friday before the garden goes quiet, so the result gets read while the buckets are still fresh in mind.",
    teaching: [
      {
        heading: 'Count first, conclude second',
        text:
          "Open the log and do the arithmetic before you form an opinion. For each of the three buckets: how many times did you water it, and how much did you carry in total?\n\nDo it in that order deliberately. If you decide first that the build worked and then go looking at the numbers, you will find a way to read them that agrees with you - everybody does, which is exactly why the order matters. The numbers come out of the log before the conclusion goes in.\n\nThen look at the plants themselves, and be specific rather than general. \"The self-watering ones look better\" is not a measurement. Height, leaf count, colour, whether anything wilted between visits - those are.\n\nAnd check the third thing people forget: how much water did each bucket actually CONSUME? A self-watering bucket you filled three times may have taken more total water than a plain bucket you watered nine times. Fewer trips is not the same as less water. Those are two different results and the build might win one and lose the other."
      },
      {
        heading: 'December is a bad month to test a watering system - and that is a real finding',
        text:
          "Here is something that may frustrate you, and it is worth more than a clean result would be.\n\nThe difference between your buckets is probably SMALLER right now than it would have been in August. Cold air holds less moisture and pulls less out of the mix. The sun is low and weak. The plants are growing slowly, so they are drinking slowly. Nothing dries out fast in December.\n\nWhich means a self-watering bucket, in December, is solving a problem that has mostly gone away on its own. If your three buckets came out close to identical, the honest conclusion is not \"the build does not work.\" It is \"December cannot tell me whether the build works.\"\n\nThat is a genuinely important idea and it applies far beyond a bucket. WHEN you run a test decides what the test is capable of showing you. Run it under conditions where the thing you are measuring barely happens, and you will measure nothing, no matter how good your equipment is. Engineers test landing gear at the loads a landing actually produces, not on a stand in a quiet room.\n\nSo write down what you have, and then write down when the real test happens: next August, in Georgia heat, when a bucket can go dry in a day. Your build is not being judged today. It is being introduced."
      },
      {
        heading: 'What would have changed your mind?',
        text:
          "One more habit to pick up, and it is the one that separates someone who runs experiments from someone who decorates opinions with numbers.\n\nBefore you write your conclusion, answer this: what result WOULD have convinced you the self-watering bucket was not worth building?\n\nIf you cannot answer that, then no result was ever going to change your mind, and the experiment was decoration. Maybe your answer is \"if the plain bucket needed the same number of waterings.\" Maybe it is \"if a plant in a self-watering bucket drowned.\" Any of those is fine. Having one is the point.\n\nThis works in reverse too, and it is how you stay honest when a build you are proud of does badly. You made those buckets with your own hands. That makes you want them to win, which is completely normal and is exactly the pressure a control bucket exists to resist.\n\nThe zinnia in October taught you that a plant tells the truth even when the schedule disagrees. This is the same rule pointed at yourself: the bucket tells the truth even when the builder disagrees.\n\nOne last thing, so you know the plain bucket is not a homework exercise. When NASA grew tomatoes on the station in VEG-05, they ran the same experiment AT THE SAME TIME in ground chambers at Kennedy Space Center set up to mimic station conditions. That ground run is a control bucket. It is how they worked out that an unexpected drop in humidity — not something about spaceflight itself — had dried the seeds out during germination. Without something to compare against, that finding simply was not available to them.\n\nThey got 12 ripe tomatoes in space against more than 100 in preflight testing on the ground. A big, disappointing gap — and the only reason the gap means anything is that somebody grew the control."
      }
    ],
    doInTheGarden: [
      'Total the waterings and the water carried for each of the three buckets, separately.',
      'Measure the plants - height and leaf count - rather than describing how they look.',
      'Compare the total water CONSUMED, not just the number of trips. They can disagree.',
      'Write down what result would have convinced you the build was not worth it.',
      'Write the build report up in the Writing Journal - this is the graded piece.',
      'Note in the log when the real test happens: next August.'
    ],
    logThis: [
      { kind: 'measurement', what: 'Waterings, total water and plant size for all three buckets side by side.' },
      { kind: 'observation', what: 'Your conclusion, and the result that would have changed your mind.' }
    ],
    sources: [
      { label: 'NASA — NASA Teams Persevere Through Plant Challenges in Space (VEG-05)', url: 'https://www.nasa.gov/missions/station/nasa-teams-persevere-through-plant-challenges-in-space/' },
      { label: 'UGA Extension C943 - Vegetable Garden Calendar', url: 'https://fieldreport.caes.uga.edu/publications/C943/vegetable-garden-calendar/' }
    ],
    connectsTo: [
      { subject: 'aerospace', label: 'Test conditions decide what a test can show', detail: 'A test run where the effect barely occurs measures nothing, however good the instruments.' },
      { subject: 'socialStudies', label: 'Stating your falsifier in advance', detail: 'The same discipline as weighing evidence that disagrees with the story you expected to find.' }
    ],
    opensProjectId: null,
    closesProjectId: 'gd7-project-self-watering-bucket'
  },

  {
    id: 'gd7-q2-b4-winter-audit',
    subject: 'gardening',
    quarter: 'Q2 2026-2027',
    sequenceInQuarter: 4,
    date: '2026-12-18',
    title: 'The Winter Audit',
    theme: 'Soil samples, the whole log read back, and the rule that runs backwards in spring',
    estMinutes: 75,
    whyToday:
      "UGA's own calendar puts soil samples and next-year planning in November and December, for a good reason: it is the only stretch when nothing is growing and there is time to think.",
    teaching: [
      {
        heading: 'Take the soil sample now, not in March',
        text:
          "UGA's vegetable garden calendar gives Georgia gardeners the same instruction for November and December every year: spread compost and leaves, and take soil samples.\n\nThe timing is not arbitrary, and the reason is scheduling rather than science. A soil test takes time to come back. If you sample in March, the results reach you around the time you needed to have already acted on them - and worse, if the test says your pH is off, fixing pH is slow. Amendments take weeks to months to shift it. A correction started in December has all winter to work. A correction started in March is a correction you will actually be making for next year.\n\nThere is a second reason, and it is one you have already run into. In September you tested pH and learned that a plant can starve surrounded by nutrition, because pH decides what is reachable. That test told you where you were. This one tells you where you are going, with enough runway to change it.\n\nWinter is also when you deal with the mix itself. Everything you learned in September about container mix drifting - decomposing, compacting, accumulating fertilizer salts with no rain to ever flush them - applies hardest to the buckets that have been running since August."
      },
      {
        heading: 'Read the whole year back',
        text:
          "This is the first time the garden log is worth reading as a document rather than adding to. Sit down with the whole thing.\n\nThe sun map from August, with eight numbers on it. Every watering since. The pH readings from September. The harvest from October. Three buckets compared in December. That is a real dataset, collected by you, about a place nobody else has ever measured.\n\nSo ask it real questions. Which zone actually produced the most food - and was it the one with the most sun? Which crop was worth its bucket, and which took up 2 square feet all fall for a handful of leaves? Did your total water use change from August to December, and by how much? Was your leggy-plant prediction back in August right?\n\nWrite the answers down. Not because anyone is grading them, but because next August you will be standing in the same 32 square feet making the same decisions, and you will either have this or be guessing again.\n\nAnd notice what the log has quietly become. It started as a chore attached to Friday. It is now the only record in existence of how much water this specific garden uses across a season - which is precisely what the moisture sensor you build in the spring needs in order to know what \"dry\" means here."
      },
      {
        heading: 'Spring runs the rule backwards',
        text:
          "Now look forward, because seed gets ordered in winter and the plan gets made before the season starts, not during it.\n\nIn September you learned that north Georgia plants about two weeks EARLIER than UGA's chart in the fall, because the chart is written for middle Georgia and you are racing an earlier frost.\n\nSpring reverses it. UGA states it plainly: spring planting dates run one to three weeks LATER as you move north through the mountain counties, while fall dates run about two weeks earlier. Same chart, same state, opposite corrections.\n\nMake sure you can say why, because this is the kind of thing that is trivial once understood and impossible to memorise otherwise. In fall you are racing TOWARD a deadline - the first freeze - and up north it arrives sooner, so you must start sooner. In spring you are waiting FOR something - soil and air warm enough for a seed - and up north it arrives later, so you must wait longer. One rule, two directions, because you are on opposite sides of the cold.\n\nUGA's calendar says January is for garden plans and seed orders, and February is when seed boxes get started indoors for the crops that need a head start. So the work in the next few weeks is paper work: what goes where, given a sun map you now have and did not have last spring."
      }
    ],
    doInTheGarden: [
      'Take soil samples now, so any pH correction has the whole winter to work.',
      'Top up and refresh the mix in the buckets that have been running since August.',
      'Read the entire garden log start to finish, and answer four questions in writing: best zone, best crop, water trend, was the August prediction right.',
      'Order seed for spring, remembering that north Georgia plants LATER than the chart in spring.',
      'Sketch a spring plan onto your zone map - the first time you have planned a season with real light numbers instead of guesses.'
    ],
    logThis: [
      { kind: 'measurement', what: 'Soil sample taken, from which zones, and the results when they come back.' },
      { kind: 'observation', what: 'The four answers from reading the log back, and the spring plan.' }
    ],
    sources: [
      { label: 'UGA Extension C943 - Vegetable Garden Calendar', url: 'https://fieldreport.caes.uga.edu/publications/C943/vegetable-garden-calendar/' },
      { label: 'UGA Extension B577 - Georgia Home Garden Planting Chart', url: 'https://secure.caes.uga.edu/extension/publications/files/html/B577/B577PlantingChart.pdf' }
    ],
    connectsTo: [
      { subject: 'robotics', label: 'The log is the sensor\'s training data', detail: 'A moisture sensor needs to know what dry means HERE. Only this log knows that.' },
      { subject: 'aerospace', label: 'Lead time', detail: 'A correction that takes months to act has to be started months early. Same reason garlic went in on purpose in September.' }
    ],
    opensProjectId: null,
    closesProjectId: null
  },

  // =========================================================================
  // Q3 - Innovation (Jan-Mar 2027). SIX briefs across 12 usable Fridays, and
  // the heaviest build quarter of the year: the vertical structure and the
  // trellis rebuild both land here, which is what "heavy again in March" in
  // the design meant.
  //
  // SPRING DATES: verified against UGA B577 during this build, NOT pattern-
  // matched from the fall windows. B577's own note - "North Georgia plantings
  // should vary by about 2 weeks later in the spring" - is the correction
  // applied throughout, and it runs OPPOSITE to the fall rule for a reason the
  // Dec 18 brief already made him explain.
  // =========================================================================
  {
    id: 'gd7-q3-b1-paper-season',
    subject: 'gardening',
    quarter: 'Q3 2026-2027',
    sequenceInQuarter: 1,
    date: '2027-01-08',
    title: 'The Paper Season',
    theme: 'Planning a garden with real numbers for the first time - and working backwards from a date',
    estMinutes: 75,
    whyToday:
      "The first cool-season spring window opens in a few weeks and every decision it needs has to be made before it opens. UGA puts garden plans and seed orders in January for exactly this reason.",
    teaching: [
      {
        heading: 'You have something this January that you did not have last January',
        text:
          "Last spring, planning this garden meant guessing. This year you have a sun map with eight measured numbers on it, a season of watering totals, pH readings, a harvest record, and a bucket comparison. Nobody else has that data because nobody else has ever measured this particular 32 square feet.\n\nSo the planning is different now. \"Where do the tomatoes go\" stopped being a matter of taste in August. Tomatoes have to make fruit, fruit is the most expensive thing a plant builds, and your survey already told you which zones can pay for it. There may only be one or two - and if there are none, that is a real answer too, and it points straight at why you are building a rack next month to get some buckets up into better light.\n\nHere is the honest shape of this Friday: it is paperwork, and paperwork is where gardens are actually won. Every mistake you avoid on paper in January costs nothing. The same mistake discovered in May costs the season."
      },
      {
        heading: 'Spring runs the rule backwards - and here are the real numbers',
        text:
          "You worked this out in December. Fall in north Georgia runs about two weeks EARLIER than UGA's chart, because you are racing an earlier freeze. Spring runs about two weeks LATER, because you are waiting for warmth that arrives later up here. B577 says it plainly: north Georgia plantings should vary by about two weeks later in the spring.\n\nSo take UGA's dates and push them right. Their cool-season spring window opens January 15 for a long list - cabbage, carrots, lettuce, mustard, garden peas, Irish potatoes, radishes, spinach, turnips - which for you means roughly the start of February. Collards run February 1 to March 20 on the chart; broccoli February 15 to March 15. Add your two weeks.\n\nThen the warm-season crops, which are a different world: beans, cucumbers, eggplant, okra, peppers and squash all start April 1 on the chart. Tomatoes March 25. Corn March 15. For north Georgia that is mid-April and later, and those are the ones a late frost kills outright.\n\nWrite the adjusted dates into your own calendar rather than trying to remember a chart you will not have in front of you in a bucket-filled corner in February."
      },
      {
        heading: 'Days to maturity is a budget, and you spend it backwards',
        text:
          "Next to every crop on UGA's chart is a second number most people skip: days to maturity. Radishes 25 to 30. Spinach 40 to 45. Lettuce 60 to 85. Broccoli 60 to 80. Tomatoes 70 to 85. Corn 80 to 100.\n\nThat number is a budget, and it lets you run the calendar in reverse. Instead of asking \"what can I plant today,\" ask \"when do I want to be eating this, and what does that mean I have to do, and when?\" A radish you want in the first week of March gets planted in the first week of February. Not roughly - that is what the number is for.\n\nRunning a schedule backwards from a delivery date is exactly how a launch works, and it is why you keep hearing about long-lead items. Your garlic was one: nine months, planted in September, and if you had not planted it then there is no way to catch up in June. No amount of extra effort in spring produces a garlic bulb.\n\nSo do this today. Pick three crops you actually want to eat. Look up their days to maturity, pick the date you want them, count backwards, and write down the planting date. Then check it against the window UGA gives - and if your backwards date lands outside the window, the window wins, because the window is about whether the plant survives at all."
      }
    ],
    doInTheGarden: [
      'Get your sun map and your whole garden log out on the table. This is a desk Friday.',
      'Write out the adjusted north Georgia spring dates - UGA chart plus about two weeks - for every crop you are considering.',
      'Assign crops to zones using the measured sun hours, not preference. Fruiting crops only go where the numbers support them.',
      'Pick three crops, find their days to maturity, choose a harvest date, and count backwards to a planting date.',
      'Note which crops your sun map says you CANNOT grow at ground level. That list is the argument for the rack you build in February.',
      'Order seed.'
    ],
    logThis: [
      { kind: 'observation', what: 'The spring plan: crop, zone, adjusted planting date, and the sun number that justified the zone.' },
      { kind: 'measurement', what: 'Your three backwards-calculated planting dates and the maturity numbers behind them.' }
    ],
    sources: [
      { label: 'UGA Extension B577 - Georgia Home Garden Planting Chart', url: 'https://secure.caes.uga.edu/extension/publications/files/html/B577/B577PlantingChart.pdf' },
      { label: 'UGA Extension C943 - Vegetable Garden Calendar', url: 'https://fieldreport.caes.uga.edu/publications/C943/vegetable-garden-calendar/' }
    ],
    connectsTo: [
      { subject: 'aerospace', label: 'Working a schedule backwards from a delivery date', detail: 'Days to maturity is a lead time. Long-lead items get ordered first or the whole schedule slips.' },
      { subject: 'technology', label: 'Plan on paper before you commit materials', detail: 'The engineering design process starts by defining the problem, not by building.' }
    ],
    opensProjectId: null,
    closesProjectId: null
  },

  {
    id: 'gd7-q3-b2-seed-starting',
    subject: 'gardening',
    quarter: 'Q3 2026-2027',
    sequenceInQuarter: 2,
    date: '2027-01-22',
    title: 'Starting Seeds Where There Is No Sun',
    theme: 'Indoors, in January, with a windowsill that is nowhere near bright enough - and the leggy stem you already know how to read',
    estMinutes: 75,
    whyToday:
      "UGA puts seed boxes for tomato, pepper and eggplant in January and February, because those crops need a head start indoors to be big enough to go out when the warm window finally opens in April.",
    teaching: [
      {
        heading: 'Two different jobs, and people get them backwards',
        text:
          "Germinating a seed and growing a seedling are not the same job, and they want opposite things.\n\nGetting a seed to sprout is mostly about WARMTH and moisture. It does not need light at all - the seed is running on its own stored food, underground, in the dark. That is why the top of a refrigerator or a warm room works.\n\nThe moment it breaks the surface, the job flips completely. Now it needs LIGHT, badly and immediately, and warmth becomes much less important. A seedling that stays warm and dim does the worst possible thing: it grows fast and weak, racing upward looking for light it cannot find.\n\nThe mistake almost everyone makes is leaving the tray in the warm dark place that worked so well for germination. It worked - for the first job. It is actively harmful for the second."
      },
      {
        heading: 'You already know how to read a leggy stem',
        text:
          "In August, on the very first Friday, you walked the garden and wrote down which plants were short and stocky and which were stretched and leaning. You used that as a prediction about where the light was, and then the sun survey told you whether you were right.\n\nA seedling on a windowsill in January is the same measurement, in a smaller pot and a shorter timescale. Stretched, pale, thin-stemmed, leaning hard toward the glass means not enough light. Short, thick-stemmed, sturdy, deep green means enough.\n\nThe difference is that this time you can DO something about it inside a day, and you can see the result inside a week. That makes it the fastest feedback loop in this entire subject. Outdoors you change something and wait a month. Here you move a tray two feet and know by Friday.\n\nAnd the fix is not complicated. Get the light closer. A bright windowsill in January is far dimmer than it looks - your eyes adjust and lie to you about brightness, which is exactly why you measured the garden with a clock instead of an opinion. If a windowsill is all there is, turn the tray daily so it does not learn to lean, and accept that stocky beats tall every time.\n\nOne more thing you can do for free: brush your hand gently across the tops of the seedlings once a day. Stems thicken in response to being moved. A seedling that has never felt anything push on it goes outside in April with no reason to have built a strong stem."
      },
      {
        heading: 'Count backwards to know when to start',
        text:
          "Seeds started indoors are the clearest case of the backwards planning you did two weeks ago, because you have to work back from a date that has not been announced yet.\n\nA tomato wants roughly six to eight weeks indoors before it goes out. It goes out after the frost risk has passed - and B577 puts tomatoes at March 25 to May 1 for middle Georgia, so for you, about two weeks later. Count back six to eight weeks from your adjusted date and that is when the seed goes in the tray.\n\nStart too early and you get a plant that outgrows its pot, gets root-bound and stressed, and sits indoors going backwards while it waits for weather. Start too late and you are putting a tiny seedling out in May and losing weeks of the season it needed.\n\nThere is no way to fix either one later. That is what makes it a real planning problem instead of a chore, and it is the same shape as the garlic: some decisions can only be made at one moment, and being right about them is worth more than working hard afterward."
      }
    ],
    doInTheGarden: [
      'Set up seed trays for the crops that need a head start - tomato, pepper, eggplant.',
      'Germinate somewhere WARM. Light does not matter yet.',
      'The moment anything breaks the surface, move it to the brightest place you have. This is the step people miss.',
      'Check the seedlings every day and record stocky or stretched - the same reading you did on the summer plants in August.',
      'Turn the trays daily so they do not learn to lean, and brush the tops with your hand once a day.',
      'Count backwards from your adjusted transplant date and write the start date for anything not yet sown.'
    ],
    logThis: [
      { kind: 'planting', what: 'What you sowed, how many, and the date - indoors counts.' },
      { kind: 'observation', what: 'Stocky or stretched, checked regularly. This is a sun survey at seedling scale.' }
    ],
    sources: [
      { label: 'UGA Extension B577 - Georgia Home Garden Planting Chart', url: 'https://secure.caes.uga.edu/extension/publications/files/html/B577/B577PlantingChart.pdf' },
      { label: 'UGA Extension C943 - Vegetable Garden Calendar', url: 'https://fieldreport.caes.uga.edu/publications/C943/vegetable-garden-calendar/' }
    ],
    connectsTo: [
      { subject: 'aerospace', label: 'A fast feedback loop is worth more than a slow one', detail: 'Change something, see the result in days rather than a month. Test rigs exist for exactly this reason.' }
    ],
    opensProjectId: null,
    closesProjectId: null
  },

  {
    id: 'gd7-q3-b3-build-vertical',
    subject: 'gardening',
    quarter: 'Q3 2026-2027',
    sequenceInQuarter: 3,
    date: '2027-02-05',
    title: 'Build 3 - The Stepped Rack',
    theme: 'The build this whole subject has been pointing at - and the reason you do not stack the shelves',
    estMinutes: 240,
    whyToday:
      "This is the build that goes after the difference between 32 square feet of floor and 224 cubic feet of space. It has to be standing and load-tested before the spring planting fills it.",
    teaching: [
      {
        heading: 'The obvious design is the wrong one',
        text:
          "You want more growing area, you have 7 feet of headroom, so you build shelves. Straightforward.\n\nExcept a shelf above a bucket is a ROOF over that bucket. Stack three tiers directly on top of each other and you have not created three rows of growing space - you have created one good row on top and two shaded boxes underneath, and you have taken away floor that was working perfectly well before you got there.\n\nAnd remember where your light actually comes from. You are under an awning. Almost nothing arrives from straight overhead; it comes in SIDEWAYS from the open edge. That is the single most useful fact in this build, and you measured it yourself in August.\n\nSideways light is what makes the fix possible. Step each tier BACK from the one below, like a staircase, and every tier keeps a clear line to the open edge. The trade is depth: the further back you step, the more light gets through, and the more floor the rack eats. That trade is yours to make, and there is no correct answer printed anywhere - only the answer your own sun map supports.\n\nThis is what engineering actually is, by the way. Not building the thing you first thought of, but noticing that the obvious version creates a new problem, and designing against that."
      },
      {
        heading: 'Weigh a wet bucket before you cut anything',
        text:
          "Go put a full, soaked 5-gallon bucket on a bathroom scale. Do not estimate it. Almost everybody guesses low, and the guess is what the frame gets built for.\n\nThat number is the load, and the load decides the frame. Then follow it downward and ask where it goes: bucket, shelf board, shelf support, upright, floor. That chain is the LOAD PATH, and every structure has one. A frame fails at whichever link in that chain you did not think about - usually the joint, usually because a screw was driven too close to the end of a board and split it.\n\nThen there is the sideways problem, which is the one people miss because nothing is pushing sideways when they build it. A rectangle is not a rigid shape. Push the top of a rectangle and it folds over into a parallelogram - all four joints still attached, whole thing leaning. A triangle cannot do that. It is the only shape that cannot change its angles without one of its sides changing length.\n\nSo one diagonal brace across the back turns a rack that sways into a rack that does not. One board. It is the single highest-value piece of lumber in the build, and it is the one a beginner leaves out because the rack looked fine while it was empty.\n\nWhich is why you load-test it before a plant goes on it. Empty and stable means nothing."
      },
      {
        heading: 'NASA had to take gravity away to find out which cue wins',
        text:
          "Your bottom tier is about to have light coming at it from the side instead of from above. So which way will those plants grow - up, or toward the light?\n\nBoth, and they are two different systems arguing. Growing in response to gravity is GRAVITROPISM. Growing toward light is PHOTOTROPISM. On Earth those two almost always agree - light comes from the sky, up is away from the ground - so you can go your whole life without noticing there are two of them.\n\nNASA had to separate them, and the only way to do that is to remove gravity. In an experiment called TROPI, they grew Arabidopsis seedlings - the seeds are about the size of a grain of sand - on the space station, more than a thousand of them on gridded membranes, spinning them in centrifuges to produce microgravity, Moon gravity, Mars gravity and Earth gravity, then hitting them with red or blue LED light and photographing them three times a minute to watch which way they bent.\n\nThey found something genuinely new. Plants were known to sense direction from BLUE light. TROPI turned up a red-light mechanism too - a second, phytochrome-based way of working out where the light is coming from.\n\nNow bring that back down to your rack. Your bottom-tier plants are in a small version of the same experiment: gravity says up, the light says sideways, and you get to watch which way the stems go. If they lean hard toward the open edge, phototropism is winning and the plant is telling you the tier is underlit - the same leggy-stem reading you have been doing since August, now with a name and a NASA experiment behind it."
      }
    ],
    doInTheGarden: [
      'Weigh a full wet bucket on a scale. Write the number down before you design anything.',
      'Decide your step-back depth from your own sun map, and write down why you chose it.',
      'Sketch the rack with real dimensions. Numbers on the drawing, not a doodle.',
      'Measure, mark with a square, and cut. Clamp every board. Start each cut on the back stroke with a knuckle guide.',
      'Pilot-drill near board ends so nothing splits, and check square by measuring the diagonals.',
      'Add the diagonal back brace. A rectangle folds; a triangle does not.',
      'LOAD TEST with full wet buckets on every tier, and push it sideways at the top. Fix any sway before a single plant goes on it.'
    ],
    logThis: [
      { kind: 'measurement', what: 'Weight of a full wet bucket, chosen step depth, rack dimensions, and what happened in the load test.' },
      { kind: 'observation', what: 'Which way the bottom-tier stems lean once plants are on it - gravitropism versus phototropism, live.' }
    ],
    sources: [
      { label: 'NASA - TROPI (STS-121): gravitropism and phototropism in microgravity', url: 'https://www.nasa.gov/ames/space-biosciences/tropi-sts-121/' },
      { label: 'UGA Extension B577 - Georgia Home Garden Planting Chart', url: 'https://secure.caes.uga.edu/extension/publications/files/html/B577/B577PlantingChart.pdf' }
    ],
    connectsTo: [
      { subject: 'technology', label: 'The Change-One-Number Test', detail: 'Technology tech7-tinkercad-parametric-shelf - the parametric shelf you modelled in CAD. This is that shelf, in wood, holding real weight.' },
      { subject: 'aerospace', label: 'Load path and triangulation', detail: 'Every load has to reach the ground. A rectangle folds; a triangle is the only shape that cannot change its angles without changing a side length.' },
      { subject: 'robotics', label: 'Sensing direction', detail: 'A plant runs two direction sensors that usually agree. TROPI separated them by removing one.' }
    ],
    opensProjectId: 'gd7-project-vertical-structure',
    closesProjectId: null
  },

  {
    id: 'gd7-q3-b4-bottom-shelf',
    subject: 'gardening',
    quarter: 'Q3 2026-2027',
    sequenceInQuarter: 4,
    date: '2027-02-26',
    title: 'What the Bottom Shelf Actually Got',
    theme: 'Measuring the rack the same way you measured the garden - and doing the arithmetic even if it goes against you',
    estMinutes: 90,
    whyToday:
      "The rack has been standing and loaded for three weeks. That is long enough for a real sun count on the bottom tier and long enough for the plants to have told you something.",
    teaching: [
      {
        heading: 'Measure it the same way, or you cannot compare it',
        text:
          "Run the survey again on the bottom tier: once an hour, 9:00 to 18:00, direct or bright shade or full shade, across two clear days. Exactly the August method.\n\nThe sameness is the point. If you change the method you cannot compare the numbers, and comparison is the entire purpose. Same hours, same three categories, same way of deciding what counts as direct. A measurement is only as useful as the one you are comparing it against.\n\nThen do the subtraction that most people avoid. That patch of floor had a sun number back in August, before a rack existed above it. Now it has a new one. The difference is what the rack COST you, in the only currency this garden actually trades in.\n\nThere is a fair objection worth naming: February sun is lower and weaker than August sun, so some of the change is the season rather than the rack. Good - that is real, and noticing it is worth more than a clean number. If you want to separate the two, you already know how: measure a patch of floor that has no rack over it on the same two days. That untouched patch is a control, and by now you should be reaching for one automatically."
      },
      {
        heading: 'The arithmetic, run honestly',
        text:
          "Now the question the whole build exists to answer. Did you gain more than you lost?\n\nWork in square-feet-hours, which sounds fancy and is just multiplication: area times the direct sun hours it gets. A 2 square foot tier getting 5 hours is 10. The same 2 square feet of floor that used to get 5 hours and now gets 1 lost you 8.\n\nAdd up what the new tiers gained. Add up what the shaded floor lost. Subtract. That single number is the honest verdict on your rack, and it is far better than \"it looks great.\"\n\nIt may come out negative. If it does, do not soften it - you built the thing, you measured it, and it did not pay for itself in its current position. That is a real engineering result and it is genuinely more valuable than a win, because it comes with a next move attached: step the tiers back further, turn the rack toward the open edge, or move it to a zone that had less to lose in the first place.\n\nAnd notice what would have happened without the numbers. A rack with plants on it LOOKS like more garden. It looks like a success from the doorway. The only reason you can tell the difference between looking like more garden and being more garden is that you measured the floor in August, before you had any idea you would need it."
      },
      {
        heading: 'Read the stems',
        text:
          "Last, go and look at what the plants have decided, because they have been running your experiment for three weeks without being asked.\n\nOn the bottom tier: are the stems straight up, or leaning out toward the open edge? A hard lean means phototropism is beating gravitropism - the light is coming from the side and the plant is spending its growth chasing it. Pale and stretched with long gaps between the leaves means it is not getting enough, full stop.\n\nOn the top tier, look for the opposite problem, which people never anticipate: a plant now sitting several feet higher, closer to the edge of the awning, is more exposed. More light, but also more wind and faster drying. Check whether the top tier is drinking noticeably more than the bottom. If it is, your watering routine now has to be different by tier, and your self-watering buckets probably belong up there rather than down here.\n\nThat is the thing about changing one part of a system. You set out to solve shading and you have quietly created a watering problem, an exposure problem and a reach problem. None of those are failures. They are just what happens next, and the person who notices them early is the one who gets to decide about them instead of discovering them in July."
      }
    ],
    doInTheGarden: [
      'Re-run the sun survey on the bottom tier: same hours, same categories, two clear days.',
      'Measure an untouched patch of floor on the same days as a control for the season change.',
      'Compare the bottom tier now against what that floor got in August.',
      'Do the square-feet-hours arithmetic: gained versus lost, and write the verdict down even if it is negative.',
      'Read the stems on the bottom tier for leaning and stretching.',
      'Compare watering between top and bottom tiers - the top is more exposed than it was.',
      'Write the design report in the Writing Journal. This is the graded piece.'
    ],
    logThis: [
      { kind: 'measurement', what: 'Bottom-tier sun hours, the control patch, and the square-feet-hours gained-versus-lost verdict.' },
      { kind: 'watering', what: 'Per tier from now on. The top tier is a different microclimate to the bottom.' }
    ],
    sources: [
      { label: 'NASA - TROPI (STS-121): gravitropism and phototropism in microgravity', url: 'https://www.nasa.gov/ames/space-biosciences/tropi-sts-121/' },
      { label: 'UGA Extension B577 - Georgia Home Garden Planting Chart', url: 'https://secure.caes.uga.edu/extension/publications/files/html/B577/B577PlantingChart.pdf' }
    ],
    connectsTo: [
      { subject: 'aerospace', label: 'A negative result is still a result', detail: 'It arrives with a next move attached, which a vague win does not.' },
      { subject: 'technology', label: 'Changing one part changes the system', detail: 'Solving shading created an exposure problem and a reach problem. That is normal, and worth catching early.' }
    ],
    opensProjectId: null,
    closesProjectId: 'gd7-project-vertical-structure'
  },

  {
    id: 'gd7-q3-b5-build-trellis',
    subject: 'gardening',
    quarter: 'Q3 2026-2027',
    sequenceInQuarter: 5,
    date: '2027-03-12',
    title: 'Build 4 - Trellis v2',
    theme: 'Break the one you have on purpose, find out where it actually fails, and fix that - not your idea of it',
    estMinutes: 180,
    whyToday:
      "Vining crops go in within weeks, and a trellis has to be finished before the vine needs it. Rebuilding a loaded trellis in June is not an option the plant will give you.",
    teaching: [
      {
        heading: 'Find the failure before you design the fix',
        text:
          "There is a trellis in this garden already. The assignment is to make it better - and the temptation is to look at it, decide what seems flimsy, and reinforce that.\n\nDo not. Test it instead. Hang weight from the top, a bit at a time, and watch what moves FIRST and at what weight. That is the failure point, and it is very often not the part that looked weakest. A structure fails at its weakest link, not at its thinnest-looking one, and those are different things - a thin brace in the right place carries load beautifully while a chunky joint in the wrong place opens up at nothing.\n\nWrite down what moved and the weight it moved at. Now you have a diagnosis instead of an impression, and version 2 gets to fix a specific thing rather than being generally sturdier. Generally sturdier is how you spend money and lumber on the part that was fine.\n\nThis is exactly what you did with the buckets in September, when one plant was doing worse than its neighbours and you tested pH rather than guessing. Same discipline, pointed at wood instead of soil."
      },
      {
        heading: 'A wet loaded vine is much heavier than the string it climbed',
        text:
          "The load a trellis is designed for is almost never the load people picture. A bare frame with twine on it in March feels like it could hold anything. In July it is carrying a mass of vine, leaves and fruit, and then it rains - or you water - and every leaf and every inch of stem is holding water too.\n\nSo weigh something comparable rather than assuming. Then think about where that weight actually goes: from vine to twine, from twine to the frame, from the frame to its feet, from the feet to the floor. Any link in that chain that cannot take it is where you will find the failure.\n\nThere are two different kinds of force in that chain, worth being able to tell apart. Twine under load is in TENSION - pulled from both ends. It only has to not snap. A vertical post is in COMPRESSION - squashed - and it can fail a second way, by buckling sideways rather than crushing. That is why a long thin post can hold much less than you would expect, and why bracing it in the middle helps so much.\n\nAnd a trellis has a third problem the rack did not: it is a SAIL. A frame covered in leaves catches wind. It has to stand up to a shove from the side, not just to weight hanging down - so test it that way too."
      },
      {
        heading: 'Tension is a design decision, not tidiness',
        text:
          "When you string v2, put the lines under real tension rather than letting them sag, and know why you are doing it.\n\nA slack line lets a vine sag into itself. The plant ends up growing through a heap of its own leaves, and the lower leaves get shaded by the upper ones - the same shading problem you spent all of February solving in wood, showing up again in string. A vine on a taut line spreads out and every leaf keeps its own light.\n\nThere is a real trade, though, and it is not free. A tight line pulls harder on whatever it is tied to. Tension you add at the string comes out at the joints, so tightening the twine loads the frame more, not less. Tighten it beyond what the frame can carry and you have moved the failure rather than removed it.\n\nThat idea is worth keeping, because it comes back everywhere: fixing the weakest link promotes the second-weakest to the top of the list. You have not eliminated failure, you have relocated it. The professional question is not \"is it strong enough\" but \"where will it go first, and is that somewhere I can live with?\""
      }
    ],
    doInTheGarden: [
      'Load-test the EXISTING trellis until something moves. Record what moved and at what weight.',
      'Weigh something comparable to a wet loaded vine rather than assuming.',
      'Design v2 against the failure you found - one diagnosed problem, one targeted fix.',
      'Sketch with dimensions, then cut, clamp, pilot-drill and assemble.',
      'Triangulate wherever the movement was.',
      'String it under real tension, and keep your face out of the plane of the line.',
      'Load-test v2 identically to v1 and compare the numbers.',
      'Push it sideways too - a leafy trellis is a sail.'
    ],
    logThis: [
      { kind: 'measurement', what: 'v1 failure point and weight, v2 failure point and weight, side by side.' },
      { kind: 'observation', what: 'What you concluded the real problem was and why you believed that over the alternatives.' }
    ],
    sources: [
      { label: 'UGA Extension B577 - Georgia Home Garden Planting Chart', url: 'https://secure.caes.uga.edu/extension/publications/files/html/B577/B577PlantingChart.pdf' },
      { label: 'UGA Extension C943 - Vegetable Garden Calendar', url: 'https://fieldreport.caes.uga.edu/publications/C943/vegetable-garden-calendar/' }
    ],
    connectsTo: [
      { subject: 'aerospace', label: 'Tension, compression and buckling', detail: 'A long thin post fails by bending sideways long before it crushes. Bracing the middle is why that matters.' },
      { subject: 'technology', label: 'The engineering design process, version 2', detail: 'Technology tech7-engineering-design-process: define, test, iterate. Version 2 of anything is that loop made literal.' }
    ],
    opensProjectId: 'gd7-project-trellis-v2',
    closesProjectId: null
  },

  {
    id: 'gd7-q3-b6-spring-windows',
    subject: 'gardening',
    quarter: 'Q3 2026-2027',
    sequenceInQuarter: 6,
    date: '2027-03-26',
    title: 'The Spring Windows',
    theme: 'The warm-season gate is about to open, everything is built, and this time you have somewhere to put it all',
    estMinutes: 75,
    whyToday:
      "The warm-season window opens in days, and it is the one window in the year where being early is genuinely dangerous rather than just untidy.",
    teaching: [
      {
        heading: 'The one window where early is dangerous',
        text:
          "Every planting window so far has been forgiving at the front. Plant a little early in fall and you get a slightly longer season. Plant cool-season crops a bit early in spring and they mostly cope.\n\nWarm-season crops are different, and the difference is a hard edge. Beans, cucumbers, eggplant, okra, peppers, squash, tomatoes, watermelon - UGA calls them frost-TENDER, and that word is exact. One frost does not slow them down. It kills them.\n\nHere are the chart dates: beans, cucumbers, eggplant, okra, peppers and squash from April 1. Tomatoes from March 25. Corn from March 15. Watermelon March 20, cantaloupe March 25. Add your two weeks for north Georgia, so most of that lands from mid-April.\n\nAnd remember what you learned in November: a frost date is a PROBABILITY, not a date. The chart tells you when the odds have turned in your favour, not when frost has become impossible. Which is why experienced gardeners keep covers within reach for two weeks after they plant. Planting on the right date and then losing the lot to one unlucky night is a thing that happens to people who treated a probability as a promise.\n\nSo the plan is boring and correct: cool-season crops are already in from February, warm-season goes in from mid-April, and you keep a sheet handy."
      },
      {
        heading: 'This year you have somewhere to put them',
        text:
          "Stand back and look at what the garden is now compared to what it was in August.\n\nIn August it was 32 square feet of floor with buckets on it and nobody knew how much sun any of them got. Now there is a measured map, a rack with tiers, a rebuilt trellis, two self-watering buckets and a control, and a log of every drop of water carried since the end of August.\n\nThat changes what spring planting even is. Last year it was \"what fits.\" This year it is an assignment problem: you have crops with known light needs, and spaces with known light numbers, and your job is to match them. Fruiting crops - the expensive ones, the ones that have to build something to give away - go where the hours support it, which after February probably means the upper tiers. Greens tolerate less and can take the shadier spots. The vining crops go on the trellis, which is now rated for a load you actually measured.\n\nAnd the succession trick from October is still available and still free. You do not have to fill everything on one day. Staggering plantings gets more harvests out of the same space by changing WHEN, not WHERE - and that one costs nothing but a calendar reminder."
      },
      {
        heading: 'What is coming, and why the log has been running since August',
        text:
          "Q4 is two builds. The first is gravity irrigation: one raised reservoir feeding several buckets through tubing instead of you filling each one by hand. Once that exists, the last manual step left in this garden is deciding WHEN to water.\n\nThe second is the thing you have been collecting data for since the end of August. A soil-moisture sensor that knows when a bucket is actually dry, wired so it can open the reservoir and water the bucket itself.\n\nThat is the capstone, and this is the moment to notice that it was never going to work without the log. A sensor gives you a number. A number means nothing until you know what number corresponds to \"this bucket needs water\" IN THIS GARDEN, with this mix, in this heat, under this awning. There is no website with that answer. The only source that has ever existed is the record you have been keeping every Friday since August, one boring line at a time.\n\nThat is worth sitting with. The most tedious part of this subject turns out to be the part that makes the most interesting build possible. It usually is."
      }
    ],
    doInTheGarden: [
      'Write the adjusted warm-season dates on the calendar - chart dates plus about two weeks for north Georgia.',
      'Assign every spring crop to a specific space using measured sun numbers: tiers, floor zones, or the trellis.',
      'Put the fruiting crops in the best-lit spaces you now have, which after the rack may be up top.',
      'Plan a succession for the fast crops instead of planting everything at once.',
      'Keep a frost cover within reach for two weeks after the warm-season planting goes in.',
      'Check the watering log is still running cleanly - Q4 depends on it.'
    ],
    logThis: [
      { kind: 'planting', what: 'Every spring planting: crop, exact space, date, and whether it is a succession batch.' },
      { kind: 'observation', what: 'The assignment reasoning - which crop got which space, and the sun number that decided it.' }
    ],
    sources: [
      { label: 'UGA Extension B577 - Georgia Home Garden Planting Chart', url: 'https://secure.caes.uga.edu/extension/publications/files/html/B577/B577PlantingChart.pdf' },
      { label: 'UGA Extension C943 - Vegetable Garden Calendar', url: 'https://fieldreport.caes.uga.edu/publications/C943/vegetable-garden-calendar/' }
    ],
    connectsTo: [
      { subject: 'robotics', label: 'The capstone needs the log', detail: 'A moisture sensor reports a number. Only your record says what number means dry HERE.' },
      { subject: 'aerospace', label: 'A probability is not a promise', detail: 'The chart says the odds turned, not that frost became impossible. Keep the cover handy.' }
    ],
    opensProjectId: null,
    closesProjectId: null
  },

  // =========================================================================
  // Q4 - Leadership & Life (Apr-May 2027). FOUR briefs across 8 usable
  // Fridays. Build-dominated: the writing load lives in the projects, which is
  // why the brief count drops while the work does not.
  //
  // This is where the year lands. Build 5 removes the last of the carrying,
  // and the capstone removes the last of the deciding - using a threshold that
  // no source on earth could have supplied except the watering log he started
  // on August 28.
  // =========================================================================
  {
    id: 'gd7-q4-b1-warm-season',
    subject: 'gardening',
    quarter: 'Q4 2026-2027',
    sequenceInQuarter: 1,
    date: '2027-04-09',
    title: 'The Warm Season, and the Trellis Report',
    theme: 'The frost-tender crops finally go in - onto a trellis you rebuilt against a failure you measured',
    estMinutes: 90,
    whyToday:
      "The north Georgia warm-season window is open now. The vining crops go on the trellis today, which makes it the right day to finish the trellis report - you are about to trust it with something alive.",
    teaching: [
      {
        heading: 'Hardening off - the step that quietly kills more transplants than frost',
        text:
          "Your indoor seedlings have lived their whole lives in a stable room with weak, unchanging light and no wind. Outside is none of those things. Take a plant straight from a windowsill to an April afternoon and it can be scorched and wrecked inside a day, in weather that a plant raised outdoors would not notice.\n\nThat is not about cold. That is about a plant that never had a reason to build the things outdoor plants have - thicker cuticle on the leaves, sturdier stems, the ability to handle full sun. It is the same idea as your seedlings going leggy in January, running in the other direction.\n\nSo you harden off: an hour or two outside in shade, then longer, then some direct sun, building up over a week or so, bringing them in at night. You are not protecting them. You are making them build what they are missing, which is a genuinely different thing.\n\nAnd it should sound familiar, because you have already met it in your own body. In PE, load is added gradually because tissue adapts to stress it is given time to adapt to, and injuries happen when the jump is too big. Same principle, different organism. Nothing adapts to a stress it never meets, and nothing survives a stress it meets all at once."
      },
      {
        heading: 'Frost-tender means exactly what it says',
        text:
          "The crops going in now - beans, cucumbers, eggplant, okra, peppers, squash, tomatoes, watermelon - are the ones UGA calls frost-tender. Chart dates start April 1 for most of them, tomatoes March 25, and north Georgia runs about two weeks later, so this is your window.\n\nOne frost does not set these back. It ends them.\n\nAnd you already know why that is not the same as saying frost is impossible after today. In November you learned that a frost date is a PROBABILITY - the odds turned in your favour, nothing more. So the frost cover stays within reach for a couple of weeks after planting, and if a cold night is forecast, it goes on.\n\nThat gap between 'the odds are good' and 'it cannot happen' is where most losses live, in gardens and in everything else. A cheap sheet on a cold night is the entire cost of not being wrong about it."
      },
      {
        heading: 'Finish the trellis report before you load it',
        text:
          "In March you did something to the trellis that most people never do: you loaded the old one until it moved, and you wrote down what failed and at what weight, before you decided what to fix.\n\nToday you write that up, and the reason today is the right day is that vines are about to go on it. You are moving from a test load you controlled to a live load that will grow, get wet, and stay for months.\n\nSo the report closes with the only question worth asking about a structure: is v2 strong enough for what a wet loaded vine will put on it in July - or is it only strong enough for the weight you happened to test with in March?\n\nBe honest about the difference. You tested with a known weight, hung where you chose to hang it, on a dry day, with nobody's dinner depending on it. July is a heavier, wetter, windier, less tidy version of that. If your answer is 'probably, and here is the margin I left,' that is a real engineering answer. If it is 'it felt fine,' you have not finished the report."
      }
    ],
    doInTheGarden: [
      'Harden off the indoor seedlings over about a week - shade first, building up, in at night.',
      'Plant the warm-season crops in the spaces the sun map supports, and put the vining ones on the rebuilt trellis.',
      'Keep the frost cover within reach for two weeks and use it if a cold night is forecast.',
      'Write the trellis v2 report in the Writing Journal - v1 failure, diagnosis, fix, v2 numbers, and the July question.',
      'Log every planting: crop, exact space, date.'
    ],
    logThis: [
      { kind: 'planting', what: 'Every warm-season planting, with the space it went into and why.' },
      { kind: 'observation', what: 'Hardening-off progress, and the trellis verdict for a real July load.' }
    ],
    sources: [ { label: 'UGA Extension B577 - Georgia Home Garden Planting Chart', url: 'https://secure.caes.uga.edu/extension/publications/files/html/B577/B577PlantingChart.pdf' }, { label: 'UGA Extension C943 - Vegetable Garden Calendar', url: 'https://fieldreport.caes.uga.edu/publications/C943/vegetable-garden-calendar/' } ],
    connectsTo: [
      { subject: 'pe', label: 'Progressive overload', detail: 'Hardening off is the same principle as adding load gradually in training. Nothing adapts to a stress it never meets.' },
      { subject: 'aerospace', label: 'Test load versus service load', detail: 'What you tested with is not what it will carry. The margin between them is the design.' }
    ],
    opensProjectId: null,
    closesProjectId: 'gd7-project-trellis-v2'
  },

  {
    id: 'gd7-q4-b2-build-irrigation',
    subject: 'gardening',
    quarter: 'Q4 2026-2027',
    sequenceInQuarter: 2,
    date: '2027-04-23',
    title: 'Build 5 - One Reservoir, Many Buckets',
    theme: 'Height is the only pump you need - and the far bucket gets less until you find out why',
    estMinutes: 180,
    whyToday:
      "Everything is planted and the garden is about to get thirsty. This is the last week where you can rebuild the watering system without a bucket full of growing plants depending on it.",
    teaching: [
      {
        heading: 'Height is the pump',
        text:
          "Raise a bucket of water above the garden, run a tube down, and water flows. No electricity, no pump, no moving parts. The energy came from you lifting the water up there, and gravity gives it back on the way down.\n\nThe pressure that drives it is called HEAD, and it is simply the height of the water SURFACE above the outlet. Not the height of the bucket - the surface of the water inside it. Twice the height, roughly twice the pressure. Higher reservoir, faster flow.\n\nHold that definition carefully, because it contains a flaw you will meet later: as the reservoir empties, the water surface drops, so the head drops, so the flow slows. A gravity system does not water at a constant rate. It waters fastest when it is full and slowest just before it runs out, without anybody changing anything.\n\nAnd notice you have chosen a passive system again, on purpose - the same choice NASA made with PONDS. No pumps means no power, no motor to burn out, and nothing to fail while nobody is watching. Fewer parts is not a compromise. It is usually the better design."
      },
      {
        heading: 'The far bucket gets less, and you are going to measure exactly how much',
        text:
          "Here is the fault every gravity irrigation system has, including yours, including expensive ones: the outlet nearest the reservoir delivers more water than the one at the far end.\n\nWater loses pressure as it travels along a tube - it rubs against the walls, it loses more at every tee and bend, and every outlet it passes bleeds some off. By the time it reaches the last bucket there is simply less push behind it.\n\nWhich means if you connect this up and walk away, you have not built a watering system. You have built a system that overwaters the near bucket and underwaters the far one, every single time, forever - and quietly, because both buckets get SOMETHING and nothing looks broken.\n\nSo do not connect it to the buckets yet. Put an identical cup under every outlet, open the valve for exactly one minute, close it, and measure what each cup caught. Now you have numbers instead of an assumption.\n\nThen fix it the way you have fixed everything this year: one change at a time, re-measuring after each. Raise the reservoir. Restrict the near outlet to hold pressure for the far ones. Try a bigger main line. Each change, one minute, measure again. Keep going until the outlets are within about 10 percent - or until you can explain precisely why they will not be, which is also a finished answer."
      },
      {
        heading: 'What is left after this',
        text:
          "Count what watering this garden used to take. Fill a can, carry it, pour it into a bucket, and repeat eight times - a decision and an action for every bucket, every time.\n\nAfter today it is: open a valve. One action. The carrying is gone, the pouring is gone, the eight separate decisions about how much each bucket gets are gone because you set that with the tubing.\n\nOne thing is left. Somebody still has to decide WHEN.\n\nThat is the whole remaining job, and it is the one that never lets up - because it depends on the weather, on the season, on how big the plants have got, and on which tier a bucket is sitting on. It is also the one you have been quietly collecting the answer to since the end of August, one boring watering line at a time.\n\nThat is next month."
      }
    ],
    doInTheGarden: [
      'Predict, in writing, which outlet you think will deliver the most water and why.',
      'Raise the reservoir and measure the head - the height of the water surface above the outlets.',
      'Run the main line with a tee to each bucket, cutting the tubing square so the barbs do not leak.',
      'Run the one-minute test into identical cups, NOT into the buckets, and record every number.',
      'Fix the spread one change at a time, re-running the identical test after each.',
      'Only connect to the buckets once the outlets are within about 10 percent, or you can explain why not.',
      'Load-test the shelf holding the full reservoir before you trust it.'
    ],
    logThis: [
      { kind: 'measurement', what: 'Head height, the one-minute output of every outlet, and the numbers after each fix.' },
      { kind: 'watering', what: 'Keep logging. The capstone threshold is built on this record and it is not finished yet.' }
    ],
    sources: [
      { label: 'NASA - The Shape of Watering Plants in Space (PONDS, a passive system)', url: 'https://www.nasa.gov/missions/station/the-shape-of-watering-plants-in-space/' },
      { label: 'UGA Extension C943 - Vegetable Garden Calendar', url: 'https://fieldreport.caes.uga.edu/publications/C943/vegetable-garden-calendar/' }
    ],
    connectsTo: [
      { subject: 'aerospace', label: 'Head pressure and flow', detail: 'Height drives pressure, pressure drives flow, and pressure is lost along the way. The far outlet suffers for a calculable reason.' },
      { subject: 'aerospace', label: 'Passive beats powered when nobody is watching', detail: 'The same reasoning behind PONDS: fewer parts, no power, nothing to burn out unattended.' }
    ],
    opensProjectId: 'gd7-project-gravity-irrigation',
    closesProjectId: null
  },

  {
    id: 'gd7-q4-b3-irrigation-results',
    subject: 'gardening',
    quarter: 'Q4 2026-2027',
    sequenceInQuarter: 3,
    date: '2027-05-07',
    title: 'Levelling the Flow',
    theme: 'Two weeks of a system running - and the flaw that shows up only when the reservoir runs low',
    estMinutes: 90,
    whyToday:
      "Two weeks is long enough for the system to have watered the garden many times, and long enough for the emptying-reservoir problem to have shown itself.",
    teaching: [
      {
        heading: 'Did the fix hold once it was doing real work?',
        text:
          "You levelled the outlets to within about 10 percent using cups on a bench. Now it has been feeding real buckets for two weeks, and a bench test and a working system are not the same thing.\n\nSo check it the way that actually matters: look at the BUCKETS, not the outlets. Is the mix in the far bucket as damp as the near one, at the same time of day, a few hours after a run? Push a finger in rather than looking at the surface - the top inch of any container dries first and tells you almost nothing.\n\nThen re-run the identical one-minute cup test and compare against your numbers from two weeks ago. If the spread has grown, something has changed: an emitter partly clogged, a tube kinked when someone moved a bucket, or algae starting in the line. Systems drift. That is not a failure of your build, it is a property of anything left running, and the only reason you can see the drift at all is that you have the original numbers to compare against."
      },
      {
        heading: 'The flaw that only appears when the reservoir runs low',
        text:
          "Here is the one predicted by the definition of head, and it is worth doing deliberately rather than discovering by accident.\n\nHead is the height of the water SURFACE above the outlet. As the reservoir empties, that surface falls. So the head falls, so the flow slows - without you touching anything.\n\nWhich means the same one-minute run delivers noticeably more water when the reservoir is full than when it is nearly empty. Your garden gets watered differently depending on how long it has been since you filled the tank. Test it: run the identical one-minute test with a full reservoir, then again with it nearly empty, and put the two numbers side by side.\n\nNow you have a real design problem with several honest answers, and none of them is obviously right. Always refill before the level gets low, which is discipline rather than engineering. Use a taller, narrower reservoir so the surface falls more slowly for the same volume - a genuinely clever fix. Or accept the variation and water by time-plus-judgement rather than pretending the system is consistent.\n\nPick one and say why. That is the difference between owning a system and being surprised by one."
      },
      {
        heading: 'One job left, and it is the one that never ends',
        text:
          "Look at what watering costs you now compared to last August. The carrying is gone. The pouring is gone. How much each bucket gets is decided by the tubing rather than by you standing there guessing.\n\nWhat is left is deciding WHEN to open the valve - and unlike the others, that decision never stops needing to be made. It changes with the weather, the season, the size of the plants, and which tier a bucket sits on. Miss it for two days in July and something dies.\n\nThat is the capstone, and you start it in two weeks. But the thing worth understanding today is that you have been building it since August 28 without touching a wire.\n\nA moisture sensor gives you a number. A number is useless until you know which number means 'this bucket needs water' - here, in this mix, in this heat, under this awning. No website has that. No sensor arrives knowing it. The only source that has ever existed is your own watering log, and it exists because you kept writing the boring line down every Friday when nothing interesting was happening.\n\nThat is usually how it goes. The tedious record is what makes the interesting build possible."
      }
    ],
    doInTheGarden: [
      'Check the far bucket against the near one by feel, a few inches down, not by looking at the surface.',
      'Re-run the identical one-minute cup test and compare with the numbers from two weeks ago.',
      'Investigate any drift - clogged emitter, kinked tube, algae in the line.',
      'Run the full-versus-nearly-empty reservoir test and record both numbers.',
      'Choose how you will handle the falling-head problem, and write down why you chose it.',
      'Write the irrigation report in the Writing Journal - this is the graded piece.'
    ],
    logThis: [
      { kind: 'measurement', what: 'Outlet spread now versus two weeks ago, and the full-versus-empty reservoir comparison.' },
      { kind: 'observation', what: 'Your chosen answer to the falling-head problem and the reasoning behind it.' }
    ],
    sources: [ { label: 'UGA Extension C943 - Vegetable Garden Calendar', url: 'https://fieldreport.caes.uga.edu/publications/C943/vegetable-garden-calendar/' } ],
    connectsTo: [
      { subject: 'aerospace', label: 'Systems drift once they are left running', detail: 'You can only see drift against a baseline you took at the start.' },
      { subject: 'robotics', label: 'What is left is a decision, and decisions can be automated', detail: 'When to water is a threshold problem, which is exactly what Robotics Q4 taught.' }
    ],
    opensProjectId: null,
    closesProjectId: 'gd7-project-gravity-irrigation'
  },

  {
    id: 'gd7-q4-b4-capstone',
    subject: 'gardening',
    quarter: 'Q4 2026-2027',
    sequenceInQuarter: 4,
    date: '2027-05-21',
    title: 'The Capstone - The Sensor That Knows',
    theme: 'Nine months of a boring log turn into a number that means something, in one place, that nobody else has',
    estMinutes: 300,
    whyToday:
      "This was named on August 28 so that every watering measurement since would be data for it. The log is nine months long now, the garden is in full growth, and this is the last brief of the school year.",
    teaching: [
      {
        heading: 'NASA runs a garden nobody looks at',
        text:
          "There is a growth chamber on the space station called the Advanced Plant Habitat, and it is the most automated garden ever built. It is fully enclosed and closed-loop, and NASA states it carries MORE THAN 180 SENSORS, relaying real-time information including temperature, oxygen content and moisture levels.\n\nIt controls its own lighting - red, blue, green and broad-spectrum white LEDs - along with temperature, humidity and airflow. And this is the line that matters most for what you are about to build: it has an active watering system with sensors that detect when the plants need water.\n\nThe crew barely touch it. NASA says it needs minimal crew involvement - install the science, add water, maintenance - and that it is controlled by the team at Kennedy Space Center on the ground, through a system that sends back real-time telemetry, takes remote commands, and downlinks photos.\n\nSo think about what those 180 sensors are actually FOR. They are not there because more data is nicer. They exist so that a human being does not have to stand in front of the plants and look. Astronaut time is the scarcest thing on that station, and every sensor is a purchase of somebody's attention back.\n\nYou have been the sensors in your garden all year. Every Friday, every reading, every judgement about whether a bucket looked dry - that was you, doing by hand what 180 sensors do up there. Today you build the first one that does it without you."
      },
      {
        heading: 'Calibration is the whole project, and your log is the only source',
        text:
          "Here is the thing people get wrong about sensors, and it is the reason this build is a capstone rather than a shopping trip.\n\nA moisture sensor does not tell you the soil is dry. It gives you a NUMBER - some reading with no units that means nothing on its own. Turning that number into 'this bucket needs water' is the entire job, and it is called calibration.\n\nAnd that translation is local. It depends on your potting mix, which has been decomposing and compacting since August. On your buckets. On the heat under your awning. On which tier the bucket sits on. A threshold that is correct in a raised bed in Ohio is wrong in your garden, and no manufacturer can supply it because no manufacturer has ever been in your corner.\n\nSo you build it from your own record. Water a bucket until it runs out the overflow and note the reading - that is soaked. Then let it dry, reading daily. And crucially: water it when the PLANT tells you to, by the method you have used since October - finger in the mix, look at the leaves - and each time, write down what the sensor said at that moment.\n\nDo that several times and you have a threshold that came from your own judgement, in your own garden, cross-checked against nine months of watering data. That is not a number off a website. That is a measurement of a place.\n\nThen add hysteresis - two numbers instead of one, a needs-water and a satisfied - exactly as you did with the photoresistor in Robotics when the LED chattered at the boundary. Same fix, same reason."
      },
      {
        heading: 'Ask how it lies before you trust it with anything',
        text:
          "Stage 1 is a sensor that TELLS you. Stage 2 is a sensor that WATERS. The gap between those two is bigger than the wiring suggests, and it is entirely about failure.\n\nWhile it only tells you, a wrong sensor costs you a wrong opinion, and you will catch it because you are still looking. The moment it controls a valve on a five-gallon reservoir, a wrong sensor costs you the reservoir - into one bucket, overnight, while everyone is asleep.\n\nSo before any valve gets connected, answer this: how can this sensor be wrong? It can corrode. It can work loose and sit in an air pocket, reading dry in wet soil. Its cable can fail. And each of those failures has a direction - most of them read DRY, which tells a controller to water forever.\n\nThat is why stage 2 needs a maximum run time in the code before the valve is ever attached. Not 'water until the soil is wet' - a sensor that will never say wet turns that into 'water until the tank is empty.' Instead: water for at most this many seconds, then stop and re-check, no matter what the sensor claims. A limit that does not trust its own input.\n\nThe zinnia said this in October and the log said it in December: the instrument is not the truth. A sensor reports the one thing it measures and stays silent about everything else. It will never see mold. So the last thing this year teaches you is the least glamorous and the most professional: build the thing, then work out how it lies, then build the limit that holds when it does."
      }
    ],
    doInTheGarden: [
      'Build and test the circuit in Tinkercad Circuits before buying or wiring anything real.',
      'Wire the real capacitive sensor and get it printing numbers.',
      'Record the soaked reading, then read daily as the bucket dries.',
      'Water only when the PLANT tells you to, and write down what the sensor said at that moment. Repeat several times.',
      'Cross-check the threshold against the watering log going back to August.',
      'Add hysteresis - two numbers, not one.',
      'Seal the electronics so water cannot follow the cable in.',
      'Run stage 1 for two weeks against your own judgement and count the agreements and disagreements.',
      'Stage 2 only if you want it, and only with a maximum run time written into the code FIRST.'
    ],
    logThis: [
      { kind: 'measurement', what: 'Soaked reading, daily dry-down readings, and the sensor value each time you judged it needed water.' },
      { kind: 'observation', what: 'The threshold, the hysteresis gap, the failure modes you identified, and the limits you built against them.' }
    ],
    sources: [
      { label: 'NASA Facts - The Advanced Plant Habitat', url: 'https://www.nasa.gov/wp-content/uploads/2021/07/advanced-plant-habitat.pdf' },
      { label: 'NASA - Station Science 101: Plant Research', url: 'https://www.nasa.gov/missions/station/ways-the-international-space-station-helps-us-study-plant-growth-in-space/' }
    ],
    connectsTo: [
      { subject: 'robotics', label: 'Sensors, thresholds and hysteresis', detail: 'Robotics rb7-sensors and rb7-sensors-2, aimed at a real bucket instead of a simulated photoresistor.' },
      { subject: 'aerospace', label: 'Fail-safe design', detail: 'Ask how the instrument lies, and in which direction, before you let it act on anything.' },
      { subject: 'technology', label: 'Housing the electronics', detail: 'The sensor lives in the wet; the board must not. That is a design problem with dimensions.' }
    ],
    opensProjectId: 'gd7-project-moisture-capstone',
    closesProjectId: null
  },

  // =========================================================================
  // Summer 2027 (Jun-Jul). THREE briefs across 9 Fridays, and the lightest
  // quarter by design - Summer already runs at 3 school days a week, and July
  // in Georgia is survival rather than planting.
  //
  // It closes two loops that were opened in August: the capstone results, and
  // the second sun survey the very first project's iterationPrompt demanded.
  // Then it hands the garden back to where it started - a changeover - which
  // is the honest shape of a growing year.
  // =========================================================================
  {
    id: 'gd7-su-b1-sensor-report',
    subject: 'gardening',
    quarter: 'Summer 2027',
    sequenceInQuarter: 1,
    date: '2027-06-04',
    title: 'What the Sensor Got Right',
    theme: 'Two weeks of a machine and a boy disagreeing about the same bucket - and working out who was wrong',
    estMinutes: 90,
    whyToday:
      "The sensor has been running for two weeks against your own judgement, and June heat has arrived - which means the garden is finally under the conditions the whole system was built for.",
    teaching: [
      {
        heading: 'Count the disagreements, not the agreements',
        text:
          "For two weeks you have had two opinions about every bucket: the sensor's and yours. Today you count.\n\nThe agreements are the boring part. The DISAGREEMENTS are where everything useful is, so go through them one at a time and ask a question that is harder than it sounds: who was right?\n\nSometimes it was you. A sensor sits in one spot in one bucket and reports the moisture at that spot. You looked at the whole plant. If a leaf was wilting while the sensor said fine, the sensor may have been sitting in a damp pocket while the roots on the other side were dry.\n\nSometimes it was the sensor, and this is the one that stings. The top inch of any container dries first and looks convincing. You may well have watered buckets this year that did not need it, because the surface looked dry and the sensor - four inches down where the roots actually are - knew better.\n\nEither way, write down what you conclude. 'The sensor was wrong 3 times out of 14, all in the same bucket, and all after I moved it' is a finding with a cause attached. 'It mostly worked' is not."
      },
      {
        heading: 'Drift, and the reason instruments get re-checked',
        text:
          "Your threshold came from a calibration you did in May. It is June now, and three things have quietly moved underneath it.\n\nThe mix has aged - it has been decomposing and compacting since last August, and old mix holds water differently from the fresh mix you calibrated against. The plants are far bigger, so they drink faster and a bucket crosses your threshold sooner. And the heat has changed, which changes evaporation from the surface.\n\nThe sensor has not changed. Your threshold has not changed. The world it was describing has.\n\nThat is DRIFT, and it is why real instruments get re-calibrated on a schedule rather than once. So do it: water a bucket until it runs from the overflow and take a fresh soaked reading. Is it the same number you got in May? If not, your threshold has been slowly lying to you for weeks and nothing about the hardware was broken.\n\nThis is the same lesson the irrigation gave you in May, when the outlet spread grew after two weeks of real running. Systems left alone do not stay where you put them - and the only reason you can see it at all is that you wrote down the original numbers."
      },
      {
        heading: 'June is when the garden finally gets hard',
        text:
          "Everything you have built has been tested in mild weather. That ends now.\n\nIn Georgia summer, a bucket in sun can go from soaked to genuinely dry in a day. All the reasons you worked out back in August apply harder: containers dry faster because air moves on every side, they heat more because the walls take sun directly, and they hold less because root volume is capped by plastic. And under the awning there is still no rain to help.\n\nSo this is the real exam for the year's work, and it is the test December could not give you. Back then your self-watering buckets came out nearly level with the plain one, and the honest conclusion was that December could not tell you whether the build worked. June can. Compare the buckets again now, in heat, and see whether the reservoir earns its build.\n\nSame for the irrigation and the sensor. A system that copes in April and fails in July has not been proven - it has just not been asked yet. Watch the top tier especially: it is higher, closer to the open edge, more exposed to wind and sun, and it will dry fastest of anything you own."
      }
    ],
    doInTheGarden: [
      'Go through every sensor-versus-you disagreement from the last two weeks and decide who was right, with a reason.',
      'Take a fresh soaked reading and compare it with your May calibration. Adjust the threshold if it has drifted.',
      'Compare the self-watering buckets against the plain control bucket again - this time in real heat.',
      'Watch the top tier closely. It is the most exposed thing in the garden.',
      'Write the capstone report in the Writing Journal. This is the graded piece and it covers the whole year of data.'
    ],
    logThis: [
      { kind: 'measurement', what: 'Fresh soaked reading versus May, the adjusted threshold, and the buckets compared in heat.' },
      { kind: 'observation', what: 'Every disagreement, who was right, and why.' }
    ],
    sources: [ { label: 'UGA Extension C943 - Vegetable Garden Calendar', url: 'https://fieldreport.caes.uga.edu/publications/C943/vegetable-garden-calendar/' } ],
    connectsTo: [
      { subject: 'robotics', label: 'Calibration drifts', detail: 'An instrument calibrated once is an instrument that is slowly going wrong.' },
      { subject: 'aerospace', label: 'Untested is not the same as proven', detail: 'A system that has not met its hardest conditions has not passed anything yet.' }
    ],
    opensProjectId: null,
    closesProjectId: 'gd7-project-moisture-capstone'
  },

  {
    id: 'gd7-su-b2-highest-sun',
    subject: 'gardening',
    quarter: 'Summer 2027',
    sequenceInQuarter: 2,
    date: '2027-07-02',
    title: 'The Highest Sun of the Year',
    theme: 'The survey you were told to run again in August - and the answer is the opposite of what everyone expects',
    estMinutes: 90,
    whyToday:
      "The sun is as high in the sky as it gets all year right now. If the awning behaves the way the geometry says it should, this is the most extreme measurement you will ever take in this garden.",
    teaching: [
      {
        heading: 'Make the prediction before you measure. Again.',
        text:
          "The very first project you did, back in August, ended with an instruction: run the survey again and predict first.\n\nSo predict. It is early July. The days are the longest they get, the sun is higher in the sky than at any other time of year, and it is brutally bright out there. Does your garden - under a flat awning - get MORE direct sun hours now than it did in August, or FEWER?\n\nWrite your answer down before you go outside. Then here is the geometry, and it is worth thinking through rather than being told.\n\nA flat awning sticks out horizontally over your space. When the sun is HIGH, its light comes down steeply - and steep light hits the top of the awning and stops. When the sun is LOW, its light comes in at a shallow angle - and shallow light slides in underneath the awning and reaches far back into the space.\n\nSo the highest sun of the year is the one that penetrates LEAST. Your garden is likely to get fewer direct hours in July than in October, on the brightest days of the year.\n\nThat is not a quirk of your apartment. It is why overhangs exist at all: an overhang sized correctly shades a window in summer and lets sun in during winter, using nothing but the sun's changing height. Whoever designed your building did that on purpose for the windows. Your garden is living underneath the consequence."
      },
      {
        heading: 'Magenta light, and a question NASA does not answer on the page',
        text:
          "While you are thinking about light, here is the last NASA piece of the year, and it comes with a loose end on purpose.\n\nNASA's Veggie chamber glows magenta pink. The reason given is straightforward: plants reflect a lot of green light and use more red and blue wavelengths, so the lights are mostly red and blue, and red plus blue looks magenta. That also answers a question you have been able to see all year without asking it - every leaf looks green to you because green is the light the plant DECLINED.\n\nNeat story. Now the complication.\n\nThe Advanced Plant Habitat - the big automated one with more than 180 sensors - does not use only red and blue. NASA lists red, green and blue, plus white, far red and even infrared. If green is the wavelength plants reflect, why build green LEDs into your most advanced growth chamber and fly them to orbit, where every gram and every watt is fought over?\n\nI went looking for NASA's reason and could not find it stated on the pages available. So I am not going to invent one for you. What I can tell you is that the tidy version - plants do not use green - is too tidy, because NASA's own hardware disagrees with it, and NASA does not put mass in orbit for decoration.\n\nThat is a real open question and you are allowed to go answer it. You have spent a year learning that a claim being repeated everywhere is not the same as it being verified - the frost-and-sugar story in November taught you exactly that. This is the same shape, and this time nobody has handed you the answer at the end of the paragraph."
      },
      {
        heading: 'The whole year, in one comparison',
        text:
          "Put the two sun maps side by side: August 2026 and July 2027. Same eight zones, same method, same hours, eleven months apart.\n\nThen add everything in between: the pH numbers from September, the water totals month by month, the harvest, the bucket comparison from December and again from June, the bottom-tier count from February after the rack went up, the irrigation outlet spread, the sensor threshold.\n\nNobody else has this. There is no website, no book, and no extension publication that knows how much sun the back-left corner of your garden gets in July, because nobody has ever measured it. You did, twice, with a clock and a notebook.\n\nAnd notice how you got here. Every single one of those numbers came from the same move: state the question, predict, measure, compare, write it down. Not from being clever - from being willing to go out on the hour and record something boring.\n\nThe interesting builds this year were all downstream of that. The rack was designed from the sun map. The sensor threshold came from the watering log. Neither was possible without eleven months of unremarkable lines in a notebook, and that is the least glamorous and most reliable thing you have learned all year."
      }
    ],
    doInTheGarden: [
      'Write your prediction down FIRST: more or fewer direct hours than August?',
      'Run the full sun survey again - eight zones, once an hour, 9:00 to 18:00, two clear days. Same method or the comparison is worthless.',
      'Include the rack tiers this time. They did not exist in August.',
      'Put the August map and the July map side by side and mark every zone that changed.',
      'Write down whether your prediction was right, and what the geometry explanation is in your own words.',
      'Find a leaf and remember that its green is light the plant refused.'
    ],
    logThis: [
      { kind: 'sun-reading', what: 'The full second survey, zone by zone and hour by hour.' },
      { kind: 'measurement', what: 'August versus July per zone, and whether your prediction held.' }
    ],
    sources: [
      { label: 'NASA - Growing Plants in Space (why the light is magenta; the APH spectrum)', url: 'https://www.nasa.gov/exploration-research-and-technology/growing-plants-in-space/' },
      { label: 'NASA Facts - The Advanced Plant Habitat', url: 'https://www.nasa.gov/wp-content/uploads/2021/07/advanced-plant-habitat.pdf' }
    ],
    connectsTo: [
      { subject: 'aerospace', label: 'Sun angle and overhang geometry', detail: 'The same principle that makes a correctly-sized overhang shade a window in summer and admit sun in winter.' },
      { subject: 'socialStudies', label: 'A tidy explanation is worth checking', detail: 'The green-light story is repeated everywhere, and NASA hardware complicates it. That is an open question, not a settled one.' }
    ],
    opensProjectId: null,
    closesProjectId: null
  },

  {
    id: 'gd7-su-b3-round-two',
    subject: 'gardening',
    quarter: 'Summer 2027',
    sequenceInQuarter: 3,
    date: '2027-07-23',
    title: 'Round Two',
    theme: 'Planning the fall garden with a year of your own data - and doing the changeover again, this time knowing what you are doing',
    estMinutes: 90,
    whyToday:
      "UGA puts fall planning in July for a reason: the first big fall window opens in the middle of August, and everything it needs has to be decided before it arrives.",
    teaching: [
      {
        heading: 'Same date, completely different position',
        text:
          "In about three weeks it is the middle of August again, and the biggest fall planting date in north Georgia comes round for the second time. The date has not changed. Everything else has.\n\nLast August you stood in this garden and did not know how much sun any part of it got. You had a summer crop that was finished, a trellis somebody had built, and no record of anything. Every decision was a guess dressed up as a preference.\n\nThis August you have: a sun map measured twice, eleven months of watering data, pH readings, a stepped rack you designed and load-tested, a rebuilt trellis you broke on purpose first, two self-watering buckets and a control, a gravity irrigation system levelled to within ten percent, and a moisture sensor calibrated to this specific mix in this specific corner.\n\nSo the fall plan is not a guess this year. It is an assignment problem with real inputs - and you should be able to say, for every crop, exactly which space it goes in and which number justified it.\n\nOne thing to think about carefully, because it is the most interesting decision available to you: your July survey probably showed that the awning blocks the most sun in high summer and lets more in as the sun drops through autumn. If that is what your numbers say, then zones that failed in July may be genuinely viable in October - and last year you would have written them off."
      },
      {
        heading: 'The changeover, done by somebody who knows how',
        text:
          "The work in the next few weeks is the same work as the very first Friday of the year: walk every bucket, give it a verdict of keep, pull or replace, empty the finished ones, break up the root balls, refresh the mix and replant for fall.\n\nBut do it differently this time, in three specific ways.\n\nFirst, the mix is a year older. Everything you learned in September about container mix drifting - decomposing, compacting, accumulating fertilizer salts with no rain to flush them - has now had a full year to happen. Some buckets probably need replacing rather than topping up, and your pH tests will tell you which.\n\nSecond, you have somewhere to put things. Last year the changeover was eight buckets on a floor. Now there are tiers with different light and different exposure, and a trellis rated for a load you measured. The changeover is a placement decision, not just a cleaning job.\n\nThird, and this is the one worth noticing: read the leggy plants again. Last August that reading was a guess you were about to check. This year you know exactly what it means, and you can predict what the survey will say before you run it. That is what a year of measuring buys - not certainty, but a prediction worth making."
      },
      {
        heading: 'What the log actually was',
        text:
          "Look back at what happened this year and notice the shape of it, because the shape is the point.\n\nThe sun survey was tedious. Ten checks a day for two days, writing down one of three words. The watering log was more tedious - a line every time you carried water, for eleven months, mostly on days when nothing was happening.\n\nAnd every genuinely interesting thing you built stood on top of those. The rack was designed from the sun map. The step depth came from knowing light arrives sideways. The sensor threshold could only ever have come from the watering log, because no manufacturer, no website and no book knows what dry means in your buckets under your awning. The capstone was possible because of the most boring habit in the subject.\n\nThat is worth carrying out of this year and into whatever you build next, because it does not only apply to gardens. The exciting work is almost always downstream of a boring record somebody was disciplined enough to keep when nothing was happening yet.\n\nYou also got several things wrong on purpose and learned more from those than from the wins - a bucket comparison in December that could not tell you anything, a rack that may not have paid for itself in square-feet-hours, a trellis that failed somewhere you did not expect, a sensor that disagreed with you. None of those were failures. Each one arrived with a next move attached, which is the only thing a real result has to do.\n\nAugust 15 is in three weeks. Go and plant it."
      }
    ],
    doInTheGarden: [
      'Read the whole year of the garden log start to finish - both sun maps, the water totals, pH, harvests, every build result.',
      'Write the fall plan: every crop, the space it goes in, and the measured number that justified the space.',
      'Check whether any zone the July survey rejected becomes viable as the sun drops in autumn.',
      'Do the changeover: verdict every bucket, empty the finished ones, break up root balls, refresh or replace the mix.',
      'Test pH before refilling - a year-old mix has drifted further than a season-old one.',
      'Read the leggy plants again, and this time predict what the survey will say before you run it.',
      'Order fall seed for the mid-August window.'
    ],
    logThis: [
      { kind: 'changeover', what: 'The second season turn - buckets kept, pulled, replaced, and the mix replaced rather than topped up.' },
      { kind: 'observation', what: 'The fall plan with the number that justified each placement, and your prediction for the next survey.' }
    ],
    sources: [ { label: 'UGA Extension C1258 - Fall Vegetable Gardening', url: 'https://fieldreport.caes.uga.edu/publications/C1258/fall-vegetable-gardening' }, { label: 'UGA Extension C943 - Vegetable Garden Calendar', url: 'https://fieldreport.caes.uga.edu/publications/C943/vegetable-garden-calendar/' } ],
    connectsTo: [
      { subject: 'aerospace', label: 'The boring record is what makes the interesting build possible', detail: 'Every result this year stood on a log kept when nothing was happening.' },
      { subject: 'technology', label: 'Iteration, at the scale of a year', detail: 'Version 2 of the garden, designed from measurements version 1 produced.' }
    ],
    opensProjectId: null,
    closesProjectId: null
  }
];

/** Look up a brief by its id. */
export function getGardenBriefById(id) {
  return gardenBriefs.find((b) => b.id === id) || null;
}
