// ---------------------------------------------------------------------------
// Hands-on Gardening projects — Q1 (fall season), Aug 2026.
//
// Same infrastructure as aerospaceProjects.js, scienceExperiments.js,
// technologyProjects.js and roboticsProjects.js: `category: 'experiment'`
// routes these through WritingPromptEngine / submitWritingEntry, so a finished
// project becomes a real Portfolio entry and a graded Writing Journal
// submission rather than an afternoon that disappears.
//
// WHY THIS ARRAY HAS EXACTLY ONE ENTRY RIGHT NOW, and that is deliberate:
// the approved design (PROJECT_PLAN.md Part 4, "Gardening — the real design")
// gates the whole build track behind project 1. The sun survey decides what
// each zone of the garden can physically hold, and projects 2-5 (self-watering
// buckets, vertical structure, trellis v2, gravity irrigation) all place things
// in zones. Writing them before the survey has produced numbers would mean
// designing a shelf for a spot nobody has measured. ONE LIVE PROJECT AT A TIME
// is the named defense against load creep in that same section.
//
// THE GARDEN THIS IS WRITTEN FOR: 4 ft x 8 ft of floor, 7 ft of headroom, under
// an awning, at an apartment complex. Buckets, and a trellis they already
// built. It is not a hypothetical — it exists, it is already planted from the
// summer, and on Aug 14 it gets turned over for fall.
//
// SCAFFOLDING LEVEL: HIGH, on purpose. He is 12 and this is the first project
// in the subject. The question is handed to him, the zones are defined for him,
// the measurement is specified, and the decision rule is given. That is the
// design's stated intent — "first 2-3 projects heavily scaffolded, loosening
// through the year," and that progression IS the subject. Do not lower the
// scaffolding here retroactively; lower it in project 3 and after.
//
// NO PURCHASE REQUIRED. The sun survey costs nothing but attention.
//
// TOOL POLICY (set by the parent, Aug 8 2026): HE RUNS THE TOOLS. Her words —
// "since he is 12 i think that he can handle drilling, using a hand saw etc.
// I will like him to be a builder via aerospace and daily life."
//
// So safetyTips in every build below teach TECHNIQUE, not avoidance. "An adult
// runs the drill" is removed wherever it appeared; what replaces it is how to
// clamp the work, how to start a saw cut without the blade skating across your
// thumb, why gloves are a hazard in a rotating tool rather than protection, and
// what is behind the workpiece when the bit goes through. A 12-year-old told to
// stand back learns nothing; a 12-year-old taught to secure the work learns the
// thing that actually keeps his hands.
//
// SCOPE OF TOOLS, stated so a later session does not quietly escalate it:
// a drill/driver, hand saws, a utility knife, clamps, and measuring and marking
// tools. Every build in this subject is designed to be completed with those.
// Powered SAWS - circular, miter, table - are a different risk class and are
// deliberately not required by any build here. If he wants one later that is a
// conversation with his mother, not an assumption baked into a lesson.
//
// Each build also carries a `toolSkill`: the named, transferable shop skill it
// teaches. That is the through-line that makes this a builder's education
// rather than five unrelated garden gadgets.
// ---------------------------------------------------------------------------

export const gardenProjects = [
  {
    id: 'gd7-project-sun-survey',
    subject: 'gardening',
    tier: 1,
    category: 'experiment',
    title: 'The Sun Survey',
    theme: 'Light is the binding constraint — and right now nobody knows the number',
    // Gardening briefs are NOT lessons (see config/subjects.js — this is a
    // PARTICIPATION subject, so nothing here enters allLessons). The cross-link
    // therefore points at a brief id, not a lesson id, and
    // scripts/verify-gardening.mjs resolves it against gardenBriefs.js.
    relatedBriefId: 'gd7-q1-b1-changeover',
    relatedLessonId: null,
    toolUrl: 'https://fieldreport.caes.uga.edu/publications/C1258/fall-vegetable-gardening',
    toolLabel: 'UGA Extension C1258 — Fall Vegetable Gardening',
    objectives:
      "Measure how many hours of direct sun each part of the garden actually gets, instead of guessing. Every decision after this one depends on this number: which bucket can hold a crop that has to make fruit, which can only hold leaves, and which cannot grow food at all. You are not going to look this up. There is no website that knows what your awning does.",
    materials: [
      'Chalk, painter’s tape, or eight scraps of paper to label the zones',
      'A clock or a phone — the hour is the whole measurement',
      'The Garden Log in Mission Control (one tap per zone, per hour)',
      'Optional but strongly recommended: a phone photo of the whole garden at each check, taken from the same spot every time',
      'Two or three days with clear skies. A cloudy day is not a bad day of data — it is no data. Skip it and start again.'
    ],
    procedure: [
      'Divide the floor into eight zones. The space is 4 ft by 8 ft, so mark it as two rows of four squares, each about 2 ft by 2 ft. Label the row nearest the wall A1 A2 A3 A4 and the row nearest the open edge B1 B2 B3 B4. Write the labels down where they will still be readable in three days.',
      'Before you measure anything, walk the garden once and record what is in each zone right now — which bucket, what is growing in it, and whether that plant looks stretched and leggy or short and stocky. Log that as your starting picture. You will want it later.',
      'Pick your first clear day. Starting at 9:00 in the morning, go out at the top of every hour until 6:00 in the evening. That is ten checks.',
      'At each check, look at all eight zones and record one of three things for each: DIRECT (the sun is falling straight on that square right now), BRIGHT SHADE (no direct sun, but you could read a book there), or FULL SHADE.',
      'Take your photo from the same standing spot each hour before you go back inside.',
      'Do the whole thing again on a second clear day. If the two days disagree by more than about an hour in any zone, do a third — one of the two days had clouds you did not notice.',
      'Now add it up. For each zone, count how many checks said DIRECT. Because you checked once an hour, the count IS the number of hours of direct sun. Write all eight numbers down.',
      'Draw the map. Sketch the two rows of four squares and write each zone’s number inside it. That drawing is the real output of this project — not the log, the map.',
      'Apply the decision rule. A zone with about 4 hours or more can grow leafy greens. A zone with 6 to 8 hours can grow a crop that has to make fruit. A zone under about 2 hours cannot grow food, and that is a finding, not a failure — it is where the watering can and the empty buckets should live.'
    ],
    safetyTips: [
      'Look at the sun’s effect on the ground, never at the sun itself. You are reading the squares, not the sky.',
      'August in Georgia at 2:00 in the afternoon is genuinely hot. Take water out with you, and if you feel dizzy or your head hurts, go inside and log that check late. A missed hour is a small hole in the data; heat exhaustion is not.',
      'Nothing here needs a ladder. If a zone is hard to see, stand somewhere else — do not climb on the buckets or the trellis.'
    ],
    concepts: [
      'Binding constraint',
      'Direct sun vs. bright shade',
      'Measurement before design',
      'Zone mapping',
      'Decision rule',
      'Baseline'
    ],
    difficulty: 'Beginner',
    estMinutes: 90,
    toolSkill: null, // measurement project - no tools beyond a clock and a pencil
    instructions:
      "Write up the survey the way an engineer writes up a test. State the question you were answering in one sentence. Say how you measured — the zones, the hours, how many days, and anything that went wrong. Then give the numbers: all eight zones, in order. Say which zone gets the MOST direct sun and which gets the LEAST, and by how much. Then answer the question that started this: based on your own numbers, which zones can grow leafy greens, which could grow something that has to make fruit, and which cannot grow food at all? Finally — and this is the part most people skip — say what surprised you. Before you measured, which zone did you think would win? Were you right?",
    minWords: 90,
    iterationPrompt:
      'Run the survey again in late October and compare the two maps. Here is the prediction to make BEFORE you measure, and write it down first: the sun is lower in the sky in October than in August. Under a flat awning, does a lower sun reach FARTHER under the cover, or less far? Commit to an answer, then go find out. Whichever way it goes, you have just learned the reason overhangs exist.'
  },
  {
    id: 'gd7-project-self-watering-bucket',
    subject: 'gardening',
    tier: 1,
    category: 'experiment',
    title: 'The Bucket That Drinks By Itself',
    theme: 'Build 2 - a reservoir, a wick, and one plain bucket kept unchanged so the answer means something',
    relatedBriefId: 'gd7-q2-b2-build-self-watering',
    toolUrl: 'https://fieldreport.caes.uga.edu/publications/C943/vegetable-garden-calendar/',
    toolLabel: 'UGA Extension C943 - Vegetable Garden Calendar',
    objectives:
      "Build two self-watering buckets that hold their own water underneath and let the plant drink through a wick - the same idea NASA uses in Veggie, for a related reason. Then keep ONE ordinary bucket exactly as it is. Without that plain bucket you will have a build and a feeling. With it you have an answer.",
    materials: [
      'Three 5-gallon buckets you already have, or about $5 each new - two get converted, one stays plain',
      'Two smaller rigid containers that fit inside, about 4-6 inches tall (a yogurt tub, a cut-off drink bottle, a takeaway container)',
      'About 2 ft of rigid tubing or thin PVC for the fill pipe - roughly $3',
      'A drill/driver with a small twist bit and a larger spade or hole bit - you are running it',
      'Two clamps, or a helper holding the bucket steady from OUTSIDE the drill path',
      'Eye protection. Not optional, and not negotiable',
      'Potting mix to top the buckets back up',
      'NOTHING is attached to the building. These stand on the floor, exactly like every bucket already out there. Drilling a BUCKET is fine; drilling the wall or the awning is not, and is not part of this build.',
      'Total under about $25 for both, and less if the buckets are already in the garden'
    ],
    procedure: [
      'Take one bucket. The smaller container goes upside down in the bottom - this is the platform that holds the mix up off the reservoir floor.',
      'Punch or drill several holes through that inner container so water can move through it freely.',
      'Cut a hole in the top of the inner container big enough to pack potting mix down into it. That packed column is the WICK: it sits down in the water and pulls it upward into the mix above.',
      'Drill an overflow hole in the side of the outer bucket, level with the TOP of the inner container. This is the most important hole in the build - it makes it physically impossible to fill the reservoir higher than the platform and drown the roots.',
      'Cut a hole near the rim for the fill pipe and push the tube down to the bottom of the reservoir. You will pour water down this, not onto the mix.',
      'Fill the bucket with potting mix, packing it firmly into the wick column and loosely above it.',
      'Repeat for the second bucket. Then set the third bucket up the ordinary way with the same mix and the same crop, and change nothing about it. That is your CONTROL.',
      'Plant all three the same day, with the same crop, at the same size, and put them in zones with similar sun from your survey map. Anything you let differ between them is something you will not be able to explain later.',
      'Fill the reservoirs through the pipe until water runs out of the overflow hole. That is the definition of full.',
      'From now on, log every watering for all three buckets separately - which bucket, how much, and the date.'
    ],
    safetyTips: [
      'CLAMP THE BUCKET. This is the whole safety lesson of this build and it is worth more than the bucket. A bucket is round, so a spinning bit does not just drill it - it tries to spin it. A clamped workpiece cannot grab. An unclamped one turns into a handle swinging at whatever is holding it.',
      'Never steady the work with your hand anywhere the bit could come through. Put your hand on the opposite side of the bucket from the hole, or use the second clamp instead.',
      'Eye protection before the bit touches plastic. Drilled plastic throws hard little chips upward, and they go exactly where you are looking.',
      'NO GLOVES on a drill, and this surprises people. A glove is loose fabric next to a rotating shaft. If it catches, your hand goes with it - bare hands let go, gloves do not. Gloves are for the sanding and the sharp edges afterward, not for the drilling.',
      'Know what is behind the hole before you make it. A bit that punches through keeps going. Nothing you care about, and no part of you, sits on the far side.',
      'Start slow and let the bit cut. Leaning on a spade bit in thin plastic makes it grab and snatch. Light pressure, steady speed, and let the tool do the work - which is true of every cutting tool you will ever pick up.',
      'Cut edges on plastic are sharper than they look. Sand or file any edge you will be reaching past all winter.',
      'Do not skip the overflow hole. Without it the reservoir can rise into the root zone and drown the plant - the exact failure this design exists to prevent.'
    ],
    toolSkill:
      'Drill and clamp. Securing round work, choosing bit size, controlled entry, and knowing what sits behind the hole. Every build after this assumes you can do it.',
    concepts: ['Reservoir', 'Capillary action', 'Wicking', 'Overflow', 'Control group', 'Confounded comparison'],
    difficulty: 'Intermediate',
    estMinutes: 120,
    instructions:
      "Write this up as a build report. Describe what you made, in enough detail that somebody could make it from your description alone - including the overflow hole and why it is there. Explain what the wick actually does and why the mix has to be packed tightly in the column but loose above it. Then explain the control bucket: what it is, why you did not improve it, and what you would NOT be able to say if you had skipped it. Finally, predict - before you have any data - how many waterings each bucket will need over the next three weeks, and say which one you think will be healthier and why.",
    minWords: 100,
    iterationPrompt:
      'Your two self-watering buckets are identical. Make them different on purpose: pack the wick column tightly in one and loosely in the other, and change nothing else. Predict which one delivers water faster before you look. Capillary action moves water through the SPACES between particles - so does packing tighter give you more small spaces to pull through, or fewer spaces overall? Both answers sound reasonable, which is why you have to measure it.'
  },
  {
    id: 'gd7-project-vertical-structure',
    subject: 'gardening',
    tier: 1,
    category: 'experiment',
    title: 'The Stepped Rack',
    theme: 'Build 3 - turning 7 ft of headroom into growing area, without shading the floor you already had',
    relatedBriefId: 'gd7-q3-b3-build-vertical',
    toolUrl: 'https://secure.caes.uga.edu/extension/publications/files/html/B577/B577PlantingChart.pdf',
    toolLabel: 'UGA Extension B577 - Georgia Home Garden Planting Chart',
    objectives:
      "Build a free-standing rack that puts a second and third row of buckets into the air above the ones you already have - WITHOUT turning the bottom row into a shaded dead zone. That second half is the whole engineering problem. Anybody can stack shelves. The question is whether what you gain on top is worth more than what you lose underneath, and you are going to answer it with numbers rather than opinion.",
    materials: [
      'Reclaimed pallet boards, or about $25 of 1x4 and 2x2 pine - either works, and free is better',
      'Deck screws, 1-1/2 in and 2-1/2 in',
      'A hand saw, a tape measure, a pencil, and a combination square',
      'A drill/driver for pilot holes and screws - the clamp skill from build 2 applies here too',
      'Two clamps',
      'A level, or a phone with a level app',
      'Eye protection',
      'FREE-STANDING ONLY. Nothing is screwed, bolted, hung or anchored to the building, the awning, the railing or the fence. It stands on the floor under its own weight and it must be stable enough that it would be fine if it were sitting in the middle of an empty room.'
    ],
    procedure: [
      'Before cutting anything, go get the numbers. From the sun survey: which zones have the most direct hours. From the buckets: how much a FULL, WET 5-gallon bucket weighs - actually put one on a bathroom scale, do not estimate it. That number decides everything about how this is framed.',
      'Now the design decision. Do NOT build shelves stacked directly above each other - that is the obvious design and it is the wrong one, because the top shelf becomes a roof over the bottom one and your sunlight arrives sideways under an awning to begin with. Build a STEPPED rack instead: each tier set BACK from the one below it, like a staircase, so every tier still has open sky in front of it.',
      'Work out the step depth. Look at your sun map and think about where the light actually comes from - the open edge, not overhead. The further back each tier steps, the more light reaches the one below, and the deeper the whole rack has to be. That trade is yours to make. Write down the step depth you chose and WHY before you cut.',
      'Sketch it with real dimensions on paper first. Width, tier depth, tier height, step-back. A drawing with numbers on it is a plan; a drawing without them is a doodle.',
      'Measure and mark your cuts. Use the square - a line drawn freehand will not be square, and a rack built from out-of-square parts racks over sideways.',
      'Cut with the hand saw. Start the cut with the blade against your thumb knuckle on the BACK stroke, then move your thumb away and saw normally. Let the saw do the work.',
      'Drill pilot holes before driving screws near the end of any board. Pine splits, and a split board at a joint is a joint that will fail when it is loaded and wet.',
      'Assemble the frame, checking square as you go by measuring the two diagonals - when they are equal, it is square.',
      'LOAD TEST IT BEFORE A SINGLE PLANT GOES ON IT. Put the full wet buckets on every tier and leave them. Push the rack sideways at the top with your hand. If it sways, add a diagonal brace from one back corner to the opposite one - a rectangle folds, a triangle does not.',
      'Only once it passes the load test, move the buckets on. Then run a mini sun survey on the BOTTOM tier: same method as August, once an hour, and count the direct hours.'
    ],
    safetyTips: [
      'Clamp every board before you saw it. A board that moves while you cut gives you a bad cut and a saw that skates - and a saw that skates goes toward your hand.',
      'Start the cut on the BACK stroke with your thumb knuckle guiding the blade, then move your thumb before you cut properly. That is how you start a cut without the blade jumping across the board and across you.',
      'Cut on the waste side of your line, and know where the offcut is going to fall before it falls.',
      'Eye protection for sawing and drilling both.',
      'Pilot-drill near board ends. This is a safety point as much as a quality one: a joint that splits under load lets a wet bucket fall from above your head height.',
      'The load test is not optional and it is not a formality. A 5-gallon bucket full of wet mix is heavy enough to break a foot. Find out that the rack sways while you are standing there pushing it on purpose, not later when he is reaching past it.',
      'Nothing gets attached to the building. If the only way you can make it stable is by leaning it on something that is not yours, the design is not finished yet.'
    ],
    concepts: ['Vertical growing area', 'Shading', 'Stepped geometry', 'Load path', 'Triangulation', 'Square', 'Trade-off'],
    difficulty: 'Advanced',
    estMinutes: 240,
    toolSkill:
      'Hand saw and square. Measuring, marking, cutting to a line, checking square by diagonals, pilot-drilling to prevent splits, and bracing a frame with a triangle.',
    instructions:
      "Write this up as a design report, not a diary. State the problem in numbers: floor area before, and how much growing area you were trying to add. Give the weight of one full wet bucket and explain how that number shaped the frame. Explain the stepped design - why you did not stack the tiers directly on top of each other, what step depth you chose, and what you were trading away to get it. Describe the load test and what happened when you pushed it. Then the real result: how many direct sun hours does the BOTTOM tier get, measured the same way you measured in August? Compare it to what that same spot got before the rack existed. Finally, the honest verdict - did you gain more growing area than you shaded out? Show the arithmetic. If the answer is no, say so; that is a finding, and a rack that fails this test on paper is worth more than one that gets away with it.",
    minWords: 140,
    iterationPrompt:
      'Move the whole rack 90 degrees - turn it so the tiers face a different direction - and re-run the bottom-tier sun count. Predict first: under an awning, does the direction the steps face matter more or less than the step depth does? You have two variables now and only one of them costs lumber. Knowing which one to spend on is the entire skill.'
  },
  {
    id: 'gd7-project-trellis-v2',
    subject: 'gardening',
    tier: 1,
    category: 'experiment',
    title: 'Trellis v2',
    theme: 'Build 4 - the one that already exists, rebuilt for what a loaded wet vine actually weighs',
    relatedBriefId: 'gd7-q3-b5-build-trellis',
    toolUrl: 'https://secure.caes.uga.edu/extension/publications/files/html/B577/B577PlantingChart.pdf',
    toolLabel: 'UGA Extension B577 - Georgia Home Garden Planting Chart',
    objectives:
      "There is already a trellis in this garden. Making it better is the assignment. Version 2 means finding out what is actually wrong with version 1 - by testing it rather than by looking at it - then fixing that specific thing and proving the fix with a number.",
    materials: [
      'The existing trellis - do not throw it away until v2 is standing',
      'Reclaimed boards or about $20 of 1x2 and 2x2 pine',
      'Deck screws, and a handful of eye screws',
      'Garden twine or light rope',
      'A hand saw, tape measure, pencil, square, drill/driver, clamps',
      'A bathroom scale, or a bucket you can fill with a known weight of water for load testing',
      'FREE-STANDING ONLY. Nothing anchored to the building. A trellis is a sail as well as a frame, so it has to stand on its own in wind.'
    ],
    procedure: [
      'First, find the failure. Do not guess. Load the EXISTING trellis until it complains: hang weight from the top, a bit at a time, and watch where it moves first. Does it lean? Does a joint open? Does the whole thing slide on the floor? Write down what failed and at what weight.',
      'Now work out what it will really have to carry. Find out what a loaded, wet, fruiting vine weighs - grow-season pole beans or a cucumber vine soaked with water is far heavier than the bare string it climbed. Weigh something comparable rather than assuming.',
      'Design v2 against the failure you actually found, not against a general idea of strength. If it leaned, it needs a wider base or a triangle. If a joint opened, that joint needs a different fastener or a gusset. If it slid, it needs weight or feet. One diagnosed problem, one targeted fix.',
      'Sketch v2 with dimensions before cutting.',
      'Cut, pilot-drill and assemble. Check square by diagonals as you did on the rack.',
      'Triangulate. Any rectangle you build can fold into a parallelogram; a diagonal brace stops it. Put the brace where the movement was.',
      'String it. Run twine between eye screws under real tension - a slack string lets a vine sag into itself and shade its own lower leaves.',
      'Load test v2 exactly the way you tested v1, with the same weights in the same places, and record where and when it moves.',
      'Compare the two numbers. That comparison is the result of this build.'
    ],
    safetyTips: [
      'Load-test away from your body and away from anything breakable. Add weight gradually and expect it to fail - that is the point of the test - so stand where nothing lands on you when it does.',
      'Never load-test something over your own head.',
      'Clamp before sawing, every time.',
      'Start hand-saw cuts on the back stroke with a knuckle guide, then move your thumb.',
      'Pilot-drill near board ends. Splits at joints are how loaded frames come apart.',
      'Twine under tension stores energy. If it snaps it whips - eye protection while tensioning, and keep your face out of the plane of the string.',
      'A trellis catches wind like a sail. Test that it stands up to a shove from the side, not just to weight hanging down.'
    ],
    concepts: ['Failure testing', 'Load path', 'Triangulation', 'Tension vs compression', 'Targeted fix', 'Before and after measurement'],
    difficulty: 'Advanced',
    estMinutes: 180,
    toolSkill:
      'Diagnostic load testing and tensioning. Finding the actual failure point before designing the fix, bracing against the movement you measured, and putting a line under real tension.',
    instructions:
      "Write this as a failure report followed by a fix. Start with v1: how did you load it, what moved first, and at what weight? Be specific - 'it was wobbly' is not a finding, 'the top leaned about 3 inches once I hung 15 pounds on it' is. Then say what you concluded the real problem was, and why you believed that rather than one of the other possibilities. Describe v2 and point at the specific change that addresses the specific failure. Then give the after number from the identical test, and compare. Finish with the question that matters most in engineering: is v2 strong enough for the load a real wet vine will put on it in July, or is it only strong enough for the load you happened to test with?",
    minWords: 130,
    iterationPrompt:
      'You braced against the failure you found first. But a structure has more than one way to fail, and fixing the weakest one just promotes the second-weakest to the top of the list. Load v2 until IT complains. Where does it move now? Whatever answers that question is what version 3 would be about - and noticing that a fix does not end the problem, it relocates it, is one of the more grown-up ideas in engineering.'
  },
  {
    id: 'gd7-project-gravity-irrigation',
    subject: 'gardening',
    tier: 1,
    category: 'experiment',
    title: 'One Reservoir, Many Buckets',
    theme: 'Build 5 - gravity does the pumping, and the far bucket gets less until you work out why',
    relatedBriefId: 'gd7-q4-b2-build-irrigation',
    toolUrl: 'https://fieldreport.caes.uga.edu/publications/C943/vegetable-garden-calendar/',
    toolLabel: 'UGA Extension C943 - Vegetable Garden Calendar',
    objectives:
      "Feed several buckets from ONE raised reservoir through tubing, using nothing but height as the pump. Then find the fault that every gravity system has - the far bucket gets less than the near one - measure it, and fix it. This is the last build before the sensor, and it exists so that watering becomes one action instead of eight.",
    materials: [
      'One 5-gallon bucket as the reservoir, raised - the top tier of your rack, or on blocks',
      'About 25 ft of 1/4 in irrigation tubing, roughly $8',
      'Barbed tees and elbows, and one small inline valve - about $10 together',
      'Drip emitters, or just open tube ends if you would rather control flow yourself',
      'A utility knife or tubing cutter',
      'Measuring cups or a kitchen scale for catching and comparing output',
      'A level',
      'FREE-STANDING. The reservoir sits on your own rack or on blocks. Nothing is hung from the building.',
      'Total roughly $20-25'
    ],
    procedure: [
      'Before building anything, predict. You are going to run one line to several buckets. Which bucket do you think gets the most water, and why? Write it down now - this prediction is worth more than the build.',
      'Raise the reservoir. The higher it sits above the buckets, the more pressure it makes. Measure that height difference in inches and record it - this is your HEAD.',
      'Run a main line from the reservoir along the buckets, with a tee dropping into each one.',
      'Cut the tubing square. A crushed or angled cut at a barb leaks, and a leak at the first joint starves everything downstream.',
      'Put the inline valve just after the reservoir so you can start and stop the whole system.',
      'THE MEASUREMENT, and this is the actual experiment: put an identical cup under every outlet instead of into the buckets. Open the valve for exactly one minute. Close it. Now measure what each cup caught.',
      'Compare the numbers. The far outlet will almost certainly have less than the near one. Write down how much less, as a percentage, not as an impression.',
      'Now fix it, one change at a time. Try raising the reservoir higher and re-run the identical one-minute test. Try partially closing the nearest outlet to hold pressure for the far ones. Try a bigger main line. Re-measure after EACH change, changing only one thing between runs.',
      'Keep going until the outlets are within about 10 percent of each other, or until you can explain exactly why they will not be.',
      'Only then connect the outlets to the actual buckets, and log the fill time.'
    ],
    safetyTips: [
      'A raised full reservoir is heavy and it is above head height. Load-test the shelf it sits on the same way you tested the rack, before you fill it.',
      'Water and height together mean anything that falls, falls hard. Nothing goes above where someone stands or reaches.',
      'Cut tubing away from yourself. A utility knife on a round, slippery tube skates easily - brace the tube on a flat surface, never cut it in your hand.',
      'Do not walk away from the first full-pressure run. Find the leaks while you are standing there.',
      'Check the reservoir shelf again once the whole thing is wet and loaded. Wet weight is not the weight you designed for if you designed with a dry bucket.'
    ],
    concepts: ['Head pressure', 'Flow rate', 'Pressure drop along a line', 'Gravity feed', 'One change at a time', 'Percentage difference'],
    difficulty: 'Advanced',
    estMinutes: 180,
    toolSkill:
      'Fluid plumbing and controlled testing. Cutting and joining tubing without leaks, measuring flow rather than eyeballing it, and isolating one variable per test run.',
    instructions:
      "Write this up as a test report. State your prediction first - which outlet you expected to deliver most, and why - then the measured result from the one-minute test, in real numbers for every outlet. Explain head: how high the reservoir sits and why height is the only pump in the system. Then explain WHY the far outlet gets less, in your own words, using what you saw rather than what you read. List every change you tried, one at a time, with the numbers after each. Finish with the final spread between outlets and whether you got them within 10 percent - and if you did not, say precisely what is still causing it.",
    minWords: 130,
    iterationPrompt:
      'Run the identical one-minute test with the reservoir nearly EMPTY instead of full, without changing anything else. Predict first: does a nearly-empty reservoir deliver the same, more, or less than a full one? Head is the height of the water surface above the outlet - not the height of the bucket. So a reservoir empties at a changing rate all by itself, which means your system waters differently at the end of a fill than at the start. That is a real flaw in every gravity system ever built, and now you can measure yours.'
  },
  {
    id: 'gd7-project-moisture-capstone',
    subject: 'gardening',
    tier: 2,
    category: 'experiment',
    title: 'The Sensor That Knows',
    theme: 'The capstone - a sensor that tells you when a bucket is actually dry, using a threshold only your own log could supply',
    relatedBriefId: 'gd7-q4-b4-capstone',
    toolUrl: 'https://www.tinkercad.com/circuits',
    toolLabel: 'Open Tinkercad Circuits',
    objectives:
      "Put a soil-moisture sensor in a real bucket, read what it says as the bucket dries out over days, and turn those readings into a THRESHOLD that means 'this bucket needs water' in this garden. Stage two, if you choose to take it, is wiring that threshold to the gravity system so the garden waters itself.",
    materials: [
      'The microcontroller and the sensor skills from Robotics Q4',
      'A capacitive soil-moisture sensor - roughly $8. Capacitive, NOT the cheap two-prong resistive kind: those corrode away in wet soil within weeks, which is a real lesson about choosing parts for the environment they live in rather than for the price tag',
      'A small microcontroller board, roughly $10-15 if one is not already on hand',
      'A weatherproof box or a sealed container for the electronics - a food container with a cable notch works',
      'STAGE 2 ONLY, and optional: a 12V solenoid valve and a power supply, roughly $25-35 more',
      'HONEST NOTE ON COST AND SCOPE: everything in Robotics up to now has run in Tinkercad Circuits, which is free and simulates the circuit and the code. This is the first time the electronics are REAL, outdoors, and wet. Stage 1 is the cheap half and it is where the learning is. Stage 2 costs more and can wait, or never happen, without stage 1 being incomplete.'
    ],
    procedure: [
      'Build and test the circuit in Tinkercad Circuits FIRST, exactly as you did all through Robotics. Get the code reading the sensor and printing numbers before any hardware is bought or any wire is stripped.',
      'Wire the real sensor and print its readings, the same first move as the very first Robotics project: get a real number out of the physical world.',
      'CALIBRATE, which is the whole project. Put the sensor in a bucket you have just watered until it ran out of the overflow, and record the number. That is SOAKED. Now leave it, and take a reading at the same time every day as the bucket dries.',
      'Water that bucket only when the PLANT tells you to - by the method you have used since October: feel the mix, look at the leaves. When you decide it needs water, write down what the sensor said at that moment. Do this several times.',
      'Those numbers are your threshold. Not a number off a website, not the number in the sensor listing - the number that corresponds to dry IN THIS MIX, IN THIS GARDEN, under this awning.',
      'Cross-check the threshold against your watering log going back to August. Does the number the sensor gives on a hot dry day match the days the log shows you carrying the most water?',
      'Now add hysteresis, exactly as you did with the photoresistor in Robotics. Use TWO numbers - one to say needs water, a lower one to say satisfied - so a sensor sitting right at the boundary does not flip back and forth.',
      'Seal the electronics. The sensor goes in the wet; the board does not. Work out how the cable enters the box without letting water follow it in.',
      'STAGE 1 IS COMPLETE HERE: a sensor that tells you. Run it for two weeks against your own judgement and count how many times it agreed with you.',
      'STAGE 2, optional: wire the threshold to a valve on the gravity line so crossing it opens the reservoir. Add a maximum run time in the code so that a stuck sensor cannot empty the whole reservoir into one bucket.'
    ],
    safetyTips: [
      'Electronics and water are the whole risk here. Keep the board, the battery and every connection in a sealed box, and make the cable enter from BELOW or through a downward loop so water cannot run along it into the box.',
      'Low-voltage only. A microcontroller and a 12V supply are safe to work with; nothing in this project ever connects to household mains, and if a solution seems to require that, it is the wrong solution.',
      'Unplug before rewiring. Every time, even when it seems unnecessary.',
      'Build it in Tinkercad first. A short circuit in a simulation costs nothing.',
      'If you build stage 2, put a maximum-run-time limit in the code BEFORE you connect the valve. A sensor that fails wet reads dry forever - and a valve told to open until the soil is wet, on a sensor that will never say wet, empties everything you have.',
      'Test stage 2 with the reservoir nearly empty the first time, so a failure costs a litre rather than five gallons.'
    ],
    concepts: ['Calibration', 'Threshold', 'Hysteresis', 'Sensor drift', 'Failure mode', 'Fail-safe limits', 'Sense-decide-act'],
    difficulty: 'Advanced',
    estMinutes: 300,
    toolSkill:
      'Calibration and fail-safe design. Turning raw sensor readings into a threshold that means something in one specific place, and asking what happens when the sensor lies before trusting it with anything.',
    instructions:
      "This is the capstone write-up, so treat it as the report on a year of work. Explain what the sensor actually measures and what it does NOT. Give your calibration numbers: soaked, and the readings on the days you judged the bucket needed water. State your threshold and defend it with your own data - including the cross-check against the watering log from August onward. Explain hysteresis and why one number is not enough. Then the part that matters most: describe how this sensor could FAIL, what the garden would do if it failed that way, and what you built in to stop it. Finally, answer honestly - over two weeks, how often did the sensor agree with your own judgement, and when it disagreed, who was right?",
    minWords: 160,
    iterationPrompt:
      'Your threshold came from one bucket. Move the sensor to a different bucket - different crop, different tier, different mix age - and take a soaked reading. Predict first: is the number the same? Mix that has been running since August holds water differently from fresh mix, and a bucket in full sun on the top tier dries differently from one on the floor. If one threshold does not fit every bucket, then either you need a sensor per bucket or a threshold per zone. Working out which is affordable and which is correct is the difference between a demo and a system.'
  }
];
