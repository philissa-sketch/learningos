// ---------------------------------------------------------------------------
// Q2 — THE PARAGRAPH (weeks 10-18). Part of the daily drill ladder; see
// dailyDrills.js for the design and why this exists.
//
// Q1 built the sentence. This quarter builds the container: a paragraph that
// opens with a claim, supports it, connects its parts, and closes. The order is
// deliberate — conclusion before transitions, because a paragraph that stops
// dead is the most common thing in a twelve-year-old's writing, and evidence
// before ordering, because you cannot sequence what you have not gathered.
// ---------------------------------------------------------------------------

export const dailyDrillsQ2 = [
  // ---- Week 10: concluding sentences ----
  {
    id: 'wd-w10-d1', week: 10, day: 1, skill: 'concluding-sentence',
    skillLabel: 'Concluding sentences',
    title: 'A paragraph that stops is not a paragraph that ends',
    teach: 'The last sentence of a paragraph does a job: it says what the details added up to. Without it, the reader is left holding a pile of facts and has to do your thinking for you.',
    weak: 'The fins were loose. The glue had not cured. The nose cone was cracked.',
    strong: 'The fins were loose, the glue had not cured, and the nose cone was cracked. The rocket was never going to fly straight.',
    task: 'Write 3 short paragraphs — a topic sentence and two supports each — and give every one a concluding sentence that says what it all adds up to.',
    checkFor: 'Each last sentence draws a conclusion, and does not just repeat the topic sentence.',
    minSentences: 12
  },
  {
    id: 'wd-w10-d2', week: 10, day: 2, skill: 'concluding-sentence',
    skillLabel: 'Concluding sentences',
    title: 'Do not just say the topic sentence again',
    teach: 'A weak conclusion repeats the opening in different words. A strong one moves somewhere: what it means, what follows from it, or what you would do next.',
    weak: 'So as you can see, building the model was hard.',
    strong: 'Next time I will test the glue on a scrap piece before I trust it on the airframe.',
    task: 'Here are 3 topic sentences. For each, write a paragraph and end with a conclusion that says what FOLLOWS, not what you already said: (1) The first flight test failed. (2) Reading before bed changed how well I sleep. (3) Learning to type properly was worth the boring part.',
    checkFor: 'No conclusion is a reworded topic sentence.',
    minSentences: 12
  },
  {
    id: 'wd-w10-d3', week: 10, day: 3, skill: 'concluding-sentence',
    skillLabel: 'Concluding sentences',
    title: 'The "so what" test',
    teach: 'After your last sentence, ask yourself "so what?" If you can answer it, that answer probably belongs in the paragraph. If you cannot, the paragraph may not have a point yet.',
    weak: 'The Apollo guidance computer had 4KB of memory. That is very little memory.',
    strong: 'The Apollo guidance computer had about 4KB of memory — less than a single photo on your phone — and it still flew three men to the Moon and back. Good engineering is not the same as powerful equipment.',
    task: 'Write 2 paragraphs about facts that impress you. After each, write "So what?" and then answer it in one more sentence. Keep the answer as the real conclusion.',
    checkFor: 'The "so what" answer says something the facts alone did not.',
    minSentences: 10
  },
  {
    id: 'wd-w10-d4', week: 10, day: 4, skill: 'concluding-sentence',
    skillLabel: 'Concluding sentences',
    title: 'Topic, support, support, conclusion',
    teach: 'This is the four-part paragraph you will use for the rest of the year: state it, back it, back it again, close it. Every part earns its place.',
    weak: 'Space is cool. I like rockets. Mars is red. The end.',
    strong: 'The hardest part of a rocket flight is not going up. Getting to altitude takes nine seconds of thrust, but recovery takes a parachute that has to open at exactly the right moment. On our third flight the chute opened late and the rocket hit hard enough to split a fin. Going up is engine work; coming down is design work.',
    task: 'Write 3 four-part paragraphs on any three topics. Label the parts T, S, S, C at the end of each sentence.',
    checkFor: 'All four parts present and correctly labelled in every paragraph.',
    minSentences: 12
  },

  // ---- Week 11: transitions of time and sequence ----
  {
    id: 'wd-w11-d1', week: 11, day: 1, skill: 'transitions-time',
    skillLabel: 'Transitions: time',
    title: 'First, then, after that, finally',
    teach: 'Transition words tell the reader how one sentence relates to the one before. Time transitions — first, next, then, after, later, finally — put events in order without you having to say "and then" every time.',
    weak: 'I sanded the fins. And then I glued them. And then I painted it. And then I let it dry.',
    strong: 'First I sanded the fins smooth. Once they were glued and squared, I painted the whole airframe and left it overnight to cure.',
    task: 'Describe how you did something in 6 sentences. Use at least four different time transitions, and do not use "and then" once.',
    checkFor: 'Four or more different time transitions, and no "and then".',
    minSentences: 6
  },
  {
    id: 'wd-w11-d2', week: 11, day: 2, skill: 'transitions-time',
    skillLabel: 'Transitions: time',
    title: 'Transitions inside a sentence, not just at the front',
    teach: 'Transitions do not always start the sentence. "Once the glue set, I..." and "I waited until the glue set, then..." both carry the order without a stack of sentences all beginning the same way.',
    weak: 'First, I checked the battery. Next, I loaded the altimeter. Then, I sealed the bay.',
    strong: 'I checked the battery before loading the altimeter, and sealed the bay once both were seated.',
    task: 'Take these 5 step-by-step sentences and rewrite them as 3 sentences with the transitions built INSIDE: (1) First, preheat the oven. (2) Next, mix the dry things. (3) Then add the wet things. (4) After that, pour it in the pan. (5) Finally, bake it.',
    checkFor: 'Three sentences, order still clear, transitions no longer all at the front.',
    minSentences: 3
  },
  {
    id: 'wd-w11-d3', week: 11, day: 3, skill: 'transitions-time',
    skillLabel: 'Transitions: time',
    title: 'Going backwards on purpose',
    teach: 'Sometimes the strongest order is not the order things happened. Starting at the end and then explaining how you got there is a real technique — but only if the transitions make the jump obvious.',
    weak: 'The rocket flew straight. Before that we re-glued the fins. Before that it corkscrewed.',
    strong: 'The second flight went perfectly straight. It had not, the week before — the first attempt corkscrewed off the rail, which is what sent us back to re-glue the fins.',
    task: 'Write a 5-sentence paragraph that starts with how something ENDED, then works backwards to explain it. Make every jump in time clear.',
    checkFor: 'The reader can follow the time order even though it runs backwards.',
    minSentences: 5
  },
  {
    id: 'wd-w11-d4', week: 11, day: 4, skill: 'transitions-time',
    skillLabel: 'Transitions: time',
    title: 'A procedure someone could actually follow',
    teach: 'Time transitions matter most in instructions. If the order is wrong or vague, the reader ruins the thing they are building. This is the writing engineers do most.',
    weak: 'Get the stuff together and put it together and make sure it is right before you finish.',
    strong: 'Lay out all six parts before you start. Fit the shock cord to the nose cone first, because you cannot reach it once the body tube is glued. Only after that joint has cured for an hour should you attach the fins.',
    task: 'Write instructions for something you know how to do, in 6-8 sentences. Include at least one warning about doing a step in the wrong order.',
    checkFor: 'Order is unambiguous, and the warning explains WHY the order matters.',
    minSentences: 6
  },

  // ---- Week 12: transitions that add and contrast ----
  {
    id: 'wd-w12-d1', week: 12, day: 1, skill: 'transitions-logic',
    skillLabel: 'Transitions: adding',
    title: 'Also, in addition, what is more',
    teach: 'Adding transitions stack evidence: also, in addition, furthermore, as well as. They tell the reader "here comes another reason", which is different from "here comes the next event".',
    weak: 'The design was light. The design was cheap. The design was easy to build.',
    strong: 'The design was light enough to fly on a small motor. It was also cheap — under nine dollars in materials — and simple enough that I built it in one evening.',
    task: 'Write 3 paragraphs of 4 sentences each, stacking reasons for a claim. Use a different adding transition in each paragraph.',
    checkFor: 'Adding transitions used for reasons, not for events in time.',
    minSentences: 12
  },
  {
    id: 'wd-w12-d2', week: 12, day: 2, skill: 'transitions-logic',
    skillLabel: 'Transitions: contrasting',
    title: 'However, although, on the other hand',
    teach: 'Contrasting transitions signal a turn: however, but, although, on the other hand, even so. They are what let you show you have thought about both sides instead of only your own.',
    weak: 'Solid rocket motors are simple. Liquid motors are better.',
    strong: 'Solid rocket motors are simple and reliable. Liquid motors, however, can be throttled and shut down — which is why crewed launches use them.',
    task: 'Write 4 pairs of sentences where the second one turns against the first. Use a different contrasting transition each time.',
    checkFor: 'Four different contrast words, and a real turn in each pair.',
    minSentences: 8
  },
  {
    id: 'wd-w12-d3', week: 12, day: 3, skill: 'transitions-logic',
    skillLabel: 'Transitions: cause',
    title: 'Because, therefore, as a result, so',
    teach: 'Cause transitions show one thing making another happen. "Therefore" and "as a result" go at the front of the result; "because" goes in front of the cause. Mixing them up reverses your meaning.',
    weak: 'The parachute tangled. Therefore we packed it wrong.',
    strong: 'We packed the parachute wrong. As a result, the shroud lines tangled and it never opened fully.',
    task: 'Write 5 cause-and-result sentence pairs about things you have observed. Check each one: is the cause really the cause?',
    checkFor: 'Cause and result in the right order every time.',
    minSentences: 10
  },
  {
    id: 'wd-w12-d4', week: 12, day: 4, skill: 'transitions-logic',
    skillLabel: 'Transitions',
    title: 'One paragraph, three kinds of transition',
    teach: 'Real paragraphs mix them: something happens (time), a second reason arrives (adding), and something cuts against it (contrast). Using only one kind is what makes a paragraph feel flat.',
    weak: 'We tested it. We tested it again. It worked. It was good.',
    strong: 'We ran the first test on Saturday morning. The flight was straight, and the altimeter recorded 240 feet — higher than either of us expected. The recovery, however, was a mess: the chute opened forty feet off the ground, and the nose cone cracked on landing.',
    task: 'Write one 6-sentence paragraph about a test, a game, or a project that used at least one time transition, one adding transition, and one contrasting transition. Underline all three by putting them in CAPITALS.',
    checkFor: 'All three kinds present and used correctly.',
    minSentences: 6
  },

  // ---- Week 13: evidence ----
  {
    id: 'wd-w13-d1', week: 13, day: 1, skill: 'evidence',
    skillLabel: 'Evidence',
    title: 'Say where you got it',
    teach: 'Evidence is a fact plus where it came from. Without the source, a reader has no way to check you, and in a research paper that is the difference between a claim and a citation.',
    weak: 'Some people say the first jet flew in the 1930s.',
    strong: 'According to the Smithsonian National Air and Space Museum, the first jet-powered flight took place in Germany in August 1939.',
    task: 'Write 4 sentences, each stating a fact from something you have read this month, and each naming where it came from. Use a different way of naming the source each time.',
    checkFor: 'Every fact carries a real, named source.',
    minSentences: 4
  },
  {
    id: 'wd-w13-d2', week: 13, day: 2, skill: 'evidence',
    skillLabel: 'Evidence',
    title: 'Quoting exactly',
    teach: 'A quotation must be word for word, inside quotation marks, with the speaker or writer named. Change one word and it stops being a quotation.',
    weak: 'Neil Armstrong said something about a small step for man.',
    strong: 'As Neil Armstrong said when he reached the surface, "That’s one small step for man, one giant leap for mankind."',
    task: 'Find 3 short quotations from a book you are reading. Write each one correctly: introduced, in quotation marks, exactly as written, with the speaker named.',
    checkFor: 'Quotation marks correct, wording exact, speaker named.',
    minSentences: 3
  },
  {
    id: 'wd-w13-d3', week: 13, day: 3, skill: 'evidence',
    skillLabel: 'Evidence',
    title: 'Facts, opinions, and the difference',
    teach: 'A fact can be checked. An opinion cannot — but an opinion supported by facts is an argument, which is far stronger than either alone.',
    weak: 'The Saturn V was the best rocket ever built.',
    strong: 'The Saturn V remains the most powerful rocket ever flown successfully: 7.6 million pounds of thrust at liftoff, and thirteen launches without losing a crew.',
    task: 'Write 3 opinions you hold about something you study. Under each, write two facts that support it.',
    checkFor: 'The supports are checkable facts, not more opinions.',
    minSentences: 9
  },
  {
    id: 'wd-w13-d4', week: 13, day: 4, skill: 'evidence',
    skillLabel: 'Evidence',
    title: 'A paragraph built on evidence',
    teach: 'Claim, evidence, source, and what it proves. This is the shape of every body paragraph in every research paper you will write from here to college.',
    weak: 'Flying is safe. Everyone knows it is safer than a car.',
    strong: 'Commercial flying is far safer than driving. The National Safety Council puts the lifetime odds of dying in a car crash at roughly 1 in 93, while the odds for air travel are too small for them to report the same way. The difference is not luck — it is inspection schedules, redundant systems, and two trained pilots on every flight.',
    task: 'Write one paragraph making a claim you can support, with at least two pieces of evidence, each with its source named, and a closing sentence saying what the evidence proves.',
    checkFor: 'Two sourced pieces of evidence, and a conclusion drawn from them.',
    minSentences: 5
  },

  // ---- Week 14: explaining the evidence ----
  {
    id: 'wd-w14-d1', week: 14, day: 1, skill: 'explain-evidence',
    skillLabel: 'Explaining evidence',
    title: 'Never let a quotation stand alone',
    teach: 'A quotation or a statistic does not explain itself. The sentence AFTER it is where you say what it shows. Leaving that out is the most common weakness in student research writing.',
    weak: 'Katherine Johnson checked the computer’s numbers by hand. This shows she was important.',
    strong: 'John Glenn refused to fly until Katherine Johnson had checked the computer’s orbital numbers by hand. That request tells you something the job title does not: the astronaut trusted her arithmetic more than he trusted the machine.',
    task: 'Take 3 facts you know and write each as two sentences — the fact, then a sentence beginning "That shows" or "What that means is" that explains it WITHOUT repeating it.',
    checkFor: 'The explanation adds meaning instead of restating the fact.',
    minSentences: 6
  },
  {
    id: 'wd-w14-d2', week: 14, day: 2, skill: 'explain-evidence',
    skillLabel: 'Explaining evidence',
    title: 'Connecting evidence back to the claim',
    teach: 'Good evidence still fails if the reader cannot see how it supports your point. Say the connection out loud — do not assume it is obvious.',
    weak: 'Wings are curved on top. Bernoulli discovered pressure changes with speed. Planes fly.',
    strong: 'A wing is curved on top so air travels farther and faster over the upper surface. Faster-moving air exerts less pressure, so the pressure underneath the wing is greater than the pressure above it. That pressure difference is lift, and it is what holds the aircraft up.',
    task: 'Write a paragraph explaining how something works, where every fact is followed by a sentence connecting it to the one before. No jumps.',
    checkFor: 'No gaps — each step follows visibly from the one before it.',
    minSentences: 5
  },
  {
    id: 'wd-w14-d3', week: 14, day: 3, skill: 'explain-evidence',
    skillLabel: 'Explaining evidence',
    title: 'When evidence cuts against you',
    teach: 'Honest writing admits the evidence that does not fit, and then explains why the point still stands. Ignoring it does not make it go away — it just means your reader finds it before you do.',
    weak: 'Electric planes are the future and there are no downsides.',
    strong: 'Electric aircraft are quieter and cheaper to run. Their batteries are also far heavier than the equivalent fuel, which is why current designs are limited to short flights — a real limit, but one that mostly affects range, not the case for using them on short hops.',
    task: 'Write 2 paragraphs arguing for something you believe. In each, include one sentence beginning "Admittedly" or "It is true that" and then answer it.',
    checkFor: 'A real objection raised, and a real answer given.',
    minSentences: 8
  },
  {
    id: 'wd-w14-d4', week: 14, day: 4, skill: 'explain-evidence',
    skillLabel: 'Explaining evidence',
    title: 'Claim, evidence, explanation, three times',
    teach: 'This pattern — claim, evidence, explanation — repeated three times with transitions between, is a complete body section. You now have every piece of it.',
    weak: 'Engineering is hard but good. There are lots of examples.',
    strong: 'Engineering rewards people who are willing to be wrong in public. When the Hubble telescope launched with a flawed mirror, the team published exactly what had gone wrong rather than burying it, and that admission is what made the repair mission possible three years later.',
    task: 'Write one paragraph with three claim-evidence-explanation groups, connected by transitions. This is a full body paragraph.',
    checkFor: 'Three complete groups, each with all three parts, joined by transitions.',
    minSentences: 9
  },

  // ---- Week 15: ordering ideas ----
  {
    id: 'wd-w15-d1', week: 15, day: 1, skill: 'ordering',
    skillLabel: 'Ordering ideas',
    title: 'Strongest last',
    teach: 'When you have three reasons, the order changes how convincing they feel. Putting your strongest reason last leaves the reader holding it. Putting it first makes everything after feel like a let-down.',
    weak: 'The design failed because it was ugly, the fin was misaligned, and I did not like the colour.',
    strong: 'The design failed for a few reasons. The paint was uneven and the colour was wrong, but what actually brought it down was a fin misaligned by nearly four degrees.',
    task: 'Write 3 paragraphs, each giving three reasons for something, ordered weakest to strongest. Then write one sentence per paragraph saying why you put the last one last.',
    checkFor: 'The final reason really is the strongest in each paragraph.',
    minSentences: 12
  },
  {
    id: 'wd-w15-d2', week: 15, day: 2, skill: 'ordering',
    skillLabel: 'Ordering ideas',
    title: 'Order that matches the thing you describe',
    teach: 'Describing an object works best in a physical order — front to back, outside to inside, top to bottom. Jumping around makes the reader rebuild the object in their head every sentence.',
    weak: 'It has fins. The nose is pointed. There is a parachute inside. The fins are balsa. It is red.',
    strong: 'The nose cone is moulded plastic, pointed and slightly weighted. Behind it, the body tube holds the parachute and shock cord, and at the base three balsa fins are set a hundred and twenty degrees apart.',
    task: 'Describe an object you can see right now in 6 sentences, using one consistent physical order. Say at the top which order you chose.',
    checkFor: 'One order, held consistently, with no jumping around.',
    minSentences: 6
  },
  {
    id: 'wd-w15-d3', week: 15, day: 3, skill: 'ordering',
    skillLabel: 'Ordering ideas',
    title: 'General to specific, and back',
    teach: 'A paragraph often starts wide and narrows: the general claim, then the specific case. Sometimes the reverse works better — a striking specific first, then what it means in general.',
    weak: 'Rockets are complicated machines with many parts and systems that all work together.',
    strong: 'A single Saturn V engine burned fifteen tons of fuel a second. Five of them fired together for two and a half minutes, and that is only the first stage — which is the shape of the whole problem: everything about a rocket is bigger than it sounds.',
    task: 'Write the same paragraph twice: once general-to-specific, once specific-to-general. Then write one sentence saying which works better and why.',
    checkFor: 'Both versions written, and a real reason given for the preference.',
    minSentences: 9
  },
  {
    id: 'wd-w15-d4', week: 15, day: 4, skill: 'ordering',
    skillLabel: 'Ordering ideas',
    title: 'Fixing a scrambled paragraph',
    teach: 'The fastest way to see whether order matters is to break it. Reading a scrambled paragraph, you can feel exactly where the reader gets lost.',
    weak: 'Then it landed. We drove to the field. The rocket went up. First we packed the car.',
    strong: 'First we packed the car, then drove out to the field. The rocket went up cleanly on the first attempt and landed about forty yards downwind.',
    task: 'Write a 6-sentence paragraph deliberately out of order. Underneath, rewrite it in the right order and add transitions.',
    checkFor: 'The rewrite is genuinely clearer, and the transitions are new.',
    minSentences: 12
  },

  // ---- Week 16: cutting ----
  {
    id: 'wd-w16-d1', week: 16, day: 1, skill: 'cutting',
    skillLabel: 'Cutting',
    title: 'One idea per paragraph',
    teach: 'If a paragraph is about two things, it is two paragraphs. The test: can you write ONE topic sentence that honestly covers everything in it? If not, split it.',
    weak: 'The launch went well and also I have been reading a good book about Mars and my sister has a science fair project.',
    strong: 'The launch went well. [new paragraph] Separately, I have been reading a book about Mars that is worth finishing.',
    task: 'Write a deliberately overloaded paragraph containing three unrelated ideas. Then split it into three proper paragraphs, each with its own topic sentence.',
    checkFor: 'Three paragraphs, each covering exactly one idea.',
    minSentences: 10
  },
  {
    id: 'wd-w16-d2', week: 16, day: 2, skill: 'cutting',
    skillLabel: 'Cutting',
    title: 'Cutting the sentence you liked',
    teach: 'The hardest cut is a good sentence that does not belong. Being interesting is not the same as being relevant. Save it somewhere else if you like it that much.',
    weak: 'The engine failed at ignition. My uncle used to work at a garage. We swapped in the backup.',
    strong: 'The engine failed at ignition, so we swapped in the backup and went again twenty minutes later.',
    task: 'Write a 7-sentence paragraph, then cut exactly two sentences. Write one line under each cut saying why it went.',
    checkFor: 'Two genuine cuts, each with a real reason, and the paragraph still complete.',
    minSentences: 7
  },
  {
    id: 'wd-w16-d3', week: 16, day: 3, skill: 'cutting',
    skillLabel: 'Cutting',
    title: 'Words that are doing nothing',
    teach: 'Very, really, just, actually, basically, kind of, a lot. Most of them can be deleted with no loss of meaning, and the sentence gets stronger every time.',
    weak: 'The test was really very difficult and it basically took a lot of time.',
    strong: 'The test was difficult and it took three hours.',
    task: 'Write 5 sentences stuffed with filler words. Rewrite each with the filler removed and something specific in its place.',
    checkFor: 'Every rewrite is shorter AND more specific.',
    minSentences: 10
  },
  {
    id: 'wd-w16-d4', week: 16, day: 4, skill: 'cutting',
    skillLabel: 'Cutting',
    title: 'Cut it by a third',
    teach: 'A real editing target: take a paragraph and remove a third of the words without losing any information. It is the fastest way to find out how much of your writing was decoration.',
    weak: 'In my personal opinion, I think that the thing that was probably the most difficult part of the whole entire project was really the part where we had to attach the fins on.',
    strong: 'The hardest part of the project was attaching the fins.',
    task: 'Write a 120-word paragraph about anything. Count the words. Then rewrite it in at most 80 words, keeping every fact.',
    checkFor: 'Word counts shown for both, and no information lost in the cut.',
    minSentences: 6
  },

  // ---- Week 17: the full paragraph ----
  {
    id: 'wd-w17-d1', week: 17, day: 1, skill: 'full-paragraph',
    skillLabel: 'Full paragraphs',
    title: 'Everything at once, deliberately',
    teach: 'Topic sentence, two or three supports with real detail, transitions between them, a conclusion that says what it adds up to. You have practised every piece separately. This is the assembly.',
    weak: 'Model rockets are fun. You build them. Then you fly them. It is a good hobby.',
    strong: 'Model rocketry teaches more engineering than it looks like it should. Every flight starts with a stability calculation, because a rocket whose centre of gravity sits behind its centre of pressure will tumble instead of climbing. After that comes the recovery system, which has to deploy at apogee and not a second later. By the time a rocket flies once, its builder has done real physics twice.',
    task: 'Write one full paragraph about a hobby, subject or skill. All four parts, at least one transition, at least two specific details.',
    checkFor: 'Topic, supports with detail, transitions, real conclusion — all four.',
    minSentences: 5
  },
  {
    id: 'wd-w17-d2', week: 17, day: 2, skill: 'full-paragraph',
    skillLabel: 'Full paragraphs',
    title: 'The same paragraph for two readers',
    teach: 'Who you are writing for changes what you explain. A paragraph for a classmate can use words a paragraph for a younger reader has to define.',
    weak: 'Lift is caused by pressure differential over an aerofoil.',
    strong: 'For a younger reader: "The top of a wing is curved, so air has to hurry over it. Hurrying air pushes down less, and the slower air underneath pushes up more. That is what lifts the plane."',
    task: 'Write the same explanation twice: once for someone your age who knows the subject, once for a seven-year-old. Same facts, different words.',
    checkFor: 'Both versions accurate; the second explains rather than simplifies away the truth.',
    minSentences: 10
  },
  {
    id: 'wd-w17-d3', week: 17, day: 3, skill: 'full-paragraph',
    skillLabel: 'Full paragraphs',
    title: 'Two paragraphs that connect',
    teach: 'Paragraphs need transitions between them too, not just inside them. The first sentence of the second paragraph should show how it relates to the one before.',
    weak: '...and that is why the first design failed. The second design used balsa.',
    strong: '...and that is why the first design failed. The second attempt started from that failure: we replaced the cardboard fins with balsa and squared them against a jig.',
    task: 'Write two connected paragraphs about a problem and how you solved it. The first sentence of the second paragraph must link back to the first paragraph.',
    checkFor: 'The link between the paragraphs is explicit, not assumed.',
    minSentences: 10
  },
  {
    id: 'wd-w17-d4', week: 17, day: 4, skill: 'full-paragraph',
    skillLabel: 'Full paragraphs',
    title: 'Grading your own paragraph',
    teach: 'Learning to see your own writing the way a reader sees it is the skill underneath every other one. Use the same four things your mother uses: structure, clarity, detail, mechanics.',
    weak: '(no self-check at all)',
    strong: 'Structure 3 — topic sentence and conclusion are both there. Clarity 3. Detail 2 — I said "a lot" twice instead of giving numbers. Mechanics 4.',
    task: 'Write one full paragraph. Then score yourself 1-4 on structure, clarity, detail and mechanics, and write one sentence saying what you would fix first.',
    checkFor: 'An honest self-score, and a fix named that matches the lowest score.',
    minSentences: 6
  },

  // ---- Week 18: revising ----
  {
    id: 'wd-w18-d1', week: 18, day: 1, skill: 'revising',
    skillLabel: 'Revising',
    title: 'Revising is not proofreading',
    teach: 'Proofreading fixes spelling and commas. Revising changes what the writing says and how it is built. Do the revising first — there is no point proofreading a sentence you are about to delete.',
    weak: 'I fixed three spelling mistakes, so it is done.',
    strong: 'I moved the strongest reason to the end, cut the sentence about my cousin, and added a number to the second support. Then I checked the spelling.',
    task: 'Take any paragraph you wrote this quarter. Revise it — move, cut, or add at least three things — and list what you changed underneath.',
    checkFor: 'Three real structural changes listed, not three spelling fixes.',
    minSentences: 8
  },
  {
    id: 'wd-w18-d2', week: 18, day: 2, skill: 'revising',
    skillLabel: 'Revising',
    title: 'Reading it out loud',
    teach: 'Your ear catches what your eye skips. A sentence you stumble over reading aloud is a sentence a reader will stumble over silently.',
    weak: 'The thing that the reason that it failed was because of was the glue that had not set properly yet at that time.',
    strong: 'It failed because the glue had not set.',
    task: 'Write 5 long, tangled sentences. Read each one aloud, then rewrite it the way you would SAY it. Keep both versions.',
    checkFor: 'The rewrites sound like speech and are all shorter.',
    minSentences: 10
  },
  {
    id: 'wd-w18-d3', week: 18, day: 3, skill: 'revising',
    skillLabel: 'Revising',
    title: 'Adding what is missing',
    teach: 'Revision is not only cutting. Often the fix is a sentence that was never written — the explanation you had in your head, the number you did not include, the conclusion you assumed.',
    weak: 'The second test worked much better than the first.',
    strong: 'The second test worked much better than the first. It reached 240 feet instead of 90, and the parachute opened at the top of the arc rather than halfway down.',
    task: 'Write 4 vague sentences on purpose. Under each, add the two sentences that were missing — the specific detail, and the explanation.',
    checkFor: 'Each addition supplies something genuinely absent, not a reword.',
    minSentences: 12
  },
  {
    id: 'wd-w18-d4', week: 18, day: 4, skill: 'revising',
    skillLabel: 'Revising',
    title: 'Quarter two benchmark',
    teach: 'Everything from this quarter: a paragraph that opens, supports with evidence, explains that evidence, connects with transitions, and closes on a real conclusion — then gets revised.',
    weak: 'This quarter I learned a lot about writing and it was helpful.',
    strong: '(your draft, then your revision, then your list of what changed)',
    task: 'Write one strong paragraph (7-9 sentences) about the most interesting thing you learned this quarter. Then revise it once, and list the three changes you made.',
    checkFor: 'A full paragraph, a genuine revision, and three named changes. This is the quarter benchmark.',
    minSentences: 7
  }
];
