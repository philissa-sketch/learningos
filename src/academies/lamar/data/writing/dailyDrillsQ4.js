// ---------------------------------------------------------------------------
// Q4 — REVISION AND VOICE (weeks 28-36), then WRITING THAT LEAVES THE HOUSE
// (weeks 37-43). Part of the daily drill ladder; see dailyDrills.js for the
// design and why this exists.
//
// The first stretch is deliberately not new structures. By now he can build a
// sentence, a paragraph, and a piece. What separates a competent writer from a
// good one is what happens on the second pass: active voice, cut words, varied
// rhythm, the right word instead of the nearly-right one, and knowing who is
// reading.
//
// Week 36 is the year benchmark. It asks for everything at once, on purpose.
//
// ---- WEEKS 37-43 WERE MISSING (added Aug 23, 2026) ----
//
// The ladder stopped at week 36 and the school year does not. Q4 runs to
// 2027-05-26, which `getSchoolWeekNumber` puts in week 43 — so from Monday
// 2027-04-12 there were TWENTY-SEVEN Mon-Thu school days with no drill at all.
// `MissionControlDashboard` renders the Daily Writing row behind
// `{todaysDrill && ...}`, so the row did not fail; it silently disappeared for
// the last seven weeks of the year, taking most of block-7's content with it.
// Found by an audit, not by anyone noticing an empty screen in April.
//
// The arc for those seven weeks is deliberately NOT more revision practice.
// Week 36 was the year benchmark; repeating it would read as filler, and he
// would know. These are the forms writing actually takes once it leaves the
// house and reaches another person: an email that gets answered, instructions
// someone can follow, a summary of something long, a case made with evidence,
// an honest description of data, a paragraph about himself, and a letter
// forward. Each one is a real aerospace-adjacent job, which is the standing
// rule for this curriculum, and each one leans on a skill the year already
// built rather than introducing a new structure in May.
//
// Week 43 is the last week of school and only runs Mon-Wed (May 24, 25, 26).
// Its day-4 drill is written anyway: the ladder is keyed by (week, day) and a
// day that never comes up costs nothing, whereas a missing key is the exact
// shape of the bug this block exists to fix.
// ---------------------------------------------------------------------------

export const dailyDrillsQ4 = [
  // ---- Week 28: active voice ----
  {
    id: 'wd-w28-d1', week: 28, day: 1, skill: 'active-voice',
    skillLabel: 'Active voice',
    title: 'Who did it?',
    teach: 'In active voice the subject does the action: "The engineer checked the wiring." In passive, the action happens to the subject and the doer can vanish entirely: "The wiring was checked." Active is usually shorter and always clearer about who is responsible.',
    weak: 'Mistakes were made and the launch was delayed.',
    strong: 'We packed the parachute damp, and that delayed the launch by two hours.',
    task: 'Rewrite these 5 passive sentences as active, inventing a doer where one is missing: (1) The test was completed. (2) It was decided to postpone. (3) The report was written. (4) Errors were found. (5) The wing was damaged.',
    checkFor: 'Every rewrite names who did it.',
    minSentences: 5
  },
  {
    id: 'wd-w28-d2', week: 28, day: 2, skill: 'active-voice',
    skillLabel: 'Active voice',
    title: 'Spotting passive in your own writing',
    teach: 'The tell is a form of "to be" plus a past participle — was checked, is designed, were found. Once you can see it, you will find it everywhere in your own drafts.',
    weak: 'The data was collected and was then analysed by the team.',
    strong: 'The team collected the data, then analysed it.',
    task: 'Take a paragraph you wrote earlier this year. Find every passive construction, list them, and rewrite each in active voice.',
    checkFor: 'Every passive found and rewritten, with the originals shown.',
    minSentences: 8
  },
  {
    id: 'wd-w28-d3', week: 28, day: 3, skill: 'active-voice',
    skillLabel: 'Active voice',
    title: 'When passive is the right choice',
    teach: 'Passive is not a mistake. Use it when the doer is unknown, irrelevant, or genuinely less important than the thing acted on — which is why science writing uses it. "The sample was heated to 400 degrees" is correct: who held the burner does not matter.',
    weak: 'Believing passive voice is always wrong and rewriting a lab method into a story about yourself.',
    strong: 'Active for your argument, passive for procedures where the actor is irrelevant.',
    task: 'Write 3 sentences where passive is the BETTER choice, and 3 where active is. Under each, write why in a few words.',
    checkFor: 'Six sentences, each with a defensible reason for its voice.',
    minSentences: 6
  },
  {
    id: 'wd-w28-d4', week: 28, day: 4, skill: 'active-voice',
    skillLabel: 'Active voice',
    title: 'A paragraph in each voice',
    teach: 'Reading the same content in both voices, back to back, is the fastest way to feel the difference in energy and in clarity about responsibility.',
    weak: '(a paragraph written half in each without noticing)',
    strong: '(the same paragraph twice, deliberately)',
    task: 'Write a 5-sentence paragraph entirely in passive voice. Then rewrite it entirely active. Count the words in each and write both totals.',
    checkFor: 'Both versions complete, both word counts given, and the active version shorter.',
    minSentences: 10
  },

  // ---- Week 29: concision ----
  {
    id: 'wd-w29-d1', week: 29, day: 1, skill: 'concision',
    skillLabel: 'Concision',
    title: 'Phrases that can be one word',
    teach: '"Due to the fact that" is "because". "At this point in time" is "now". "In order to" is usually "to". These phrases are habits, not decisions, and cutting them costs nothing.',
    weak: 'Due to the fact that the weather was bad, we made the decision to postpone.',
    strong: 'Because the weather was bad, we postponed.',
    task: 'Shorten these to one or two words each: due to the fact that, at this point in time, in the event that, has the ability to, is able to, in order to, for the purpose of, a large number of. Then write 4 sentences using the short versions.',
    checkFor: 'All eight shortened, and used correctly in the sentences.',
    minSentences: 4
  },
  {
    id: 'wd-w29-d2', week: 29, day: 2, skill: 'concision',
    skillLabel: 'Concision',
    title: 'Saying the same thing twice',
    teach: 'Redundancy hides in pairs: "past history", "future plans", "final outcome", "each and every", "basic fundamentals". If one word already contains the other, delete one.',
    weak: 'The final end result of our past experience was a basic fundamental change.',
    strong: 'The result was a fundamental change.',
    task: 'Find and fix the redundancy in each: past history, advance warning, close proximity, end result, unexpected surprise, free gift, completely finished. Then write 3 sentences of your own containing redundancy and fix them.',
    checkFor: 'All seven fixed, plus three self-caught examples.',
    minSentences: 6
  },
  {
    id: 'wd-w29-d3', week: 29, day: 3, skill: 'concision',
    skillLabel: 'Concision',
    title: 'Getting to the verb faster',
    teach: 'Long stretches of throat-clearing before the main verb make a sentence hard to hold. "What I think is that..." usually means "I think...". Get to the action.',
    weak: 'One of the things that I have noticed about the way that rockets work is that they are heavy.',
    strong: 'Rockets are heavier than they look.',
    task: 'Write 5 sentences that take too long to reach the verb. Rewrite each so the verb arrives in the first six words.',
    checkFor: 'Every rewrite reaches its main verb within six words.',
    minSentences: 10
  },
  {
    id: 'wd-w29-d4', week: 29, day: 4, skill: 'concision',
    skillLabel: 'Concision',
    title: 'Cut by half without losing anything',
    teach: 'Harder than the third-cut you did in week 16. At half, you have to make real decisions about what the piece is for — which is the point of the exercise.',
    weak: 'Cutting words until the meaning goes with them.',
    strong: 'Half the words, all the information.',
    task: 'Write a 150-word paragraph. Then rewrite it in 75 words or fewer, keeping every fact. Give both word counts.',
    checkFor: 'Half or less, with no information lost. Counts given.',
    minSentences: 6
  },

  // ---- Week 30: sentence variety ----
  {
    id: 'wd-w30-d1', week: 30, day: 1, skill: 'sentence-variety',
    skillLabel: 'Sentence variety',
    title: 'Long, long, long, short',
    teach: 'A short sentence after several long ones lands hard. That is the oldest rhythm trick in English prose, and it only works if the long ones came first.',
    weak: 'It failed. We fixed it. It worked. We were happy.',
    strong: 'The first flight corkscrewed off the rail and came down in the treeline, which cost us an hour of searching and most of the good light. The second one, after we squared the fins against a jig and let the glue cure overnight, went straight up. It worked.',
    task: 'Write 3 paragraphs, each of four sentences, where the last sentence is under six words and the three before it are over fifteen.',
    checkFor: 'The rhythm is real — long, long, long, short, three times.',
    minSentences: 12
  },
  {
    id: 'wd-w30-d2', week: 30, day: 2, skill: 'sentence-variety',
    skillLabel: 'Sentence variety',
    title: 'Counting your own sentence lengths',
    teach: 'Take a paragraph and write the word count of each sentence in a row. If the numbers are all within three of each other, the paragraph is droning and you cannot hear it because you wrote it.',
    weak: '14, 15, 13, 14, 16',
    strong: '22, 9, 31, 5, 17',
    task: 'Take a paragraph you wrote this year, list the word count of each sentence, and rewrite it so the numbers vary by at least ten between the longest and shortest.',
    checkFor: 'Both number series shown, and the second genuinely more varied.',
    minSentences: 10
  },
  {
    id: 'wd-w30-d3', week: 30, day: 3, skill: 'sentence-variety',
    skillLabel: 'Sentence variety',
    title: 'Mixing simple, compound and complex again',
    teach: 'Q1 taught the three types. This is using them as a rhythm decision rather than a grammar exercise: a complex sentence to carry a reason, a simple one to land a point.',
    weak: 'Five complex sentences in a row, each with a because-clause.',
    strong: 'A complex sentence, then a compound one, then four words that stop.',
    task: 'Write a 6-sentence paragraph and label each sentence S, CD or CX. No more than two of the same type may appear in a row.',
    checkFor: 'Labels correct, and no three of one type consecutively.',
    minSentences: 6
  },
  {
    id: 'wd-w30-d4', week: 30, day: 4, skill: 'sentence-variety',
    skillLabel: 'Sentence variety',
    title: 'Reading for rhythm',
    teach: 'Read a paragraph aloud and mark where you naturally pause for breath. If the pauses come at even intervals, the writing is monotonous even when every sentence is correct.',
    weak: 'Correct writing that puts the reader to sleep.',
    strong: 'Writing where the pauses land unevenly, so the reader stays awake.',
    task: 'Read one of your paragraphs aloud, mark every place you paused, then revise it so the pauses fall at uneven intervals. Keep both versions.',
    checkFor: 'Pauses marked on the original, and the revision genuinely changes their spacing.',
    minSentences: 10
  },

  // ---- Week 31: word choice ----
  {
    id: 'wd-w31-d1', week: 31, day: 1, skill: 'word-choice',
    skillLabel: 'Word choice',
    title: 'The nearly-right word',
    teach: 'Words that are close in meaning are not interchangeable. Big, large, vast, enormous and substantial all mean roughly "not small", and each is wrong in most sentences where the others are right.',
    weak: 'The rocket had a vast engine and an enormous fin.',
    strong: 'The rocket had a large engine and oversized fins.',
    task: 'For 5 common words (big, said, walked, good, bad), list four alternatives each and write one sentence where each alternative is the RIGHT one.',
    checkFor: 'Twenty sentences where the chosen word is genuinely the best fit.',
    minSentences: 20
  },
  {
    id: 'wd-w31-d2', week: 31, day: 2, skill: 'word-choice',
    skillLabel: 'Word choice',
    title: 'Technical when it earns its place',
    teach: 'Use the technical term when it is more precise than the everyday one — apogee is not just "the top". Do not use it to sound impressive; a reader who catches you doing that stops trusting the rest.',
    weak: 'We utilised an adhesive substance to facilitate attachment.',
    strong: 'We glued it.',
    task: 'Write 5 sentences where a technical word is genuinely more precise, and 5 where a plain word is better. Keep them in two labelled lists.',
    checkFor: 'Both lists defensible — the technical ones really are more precise.',
    minSentences: 10
  },
  {
    id: 'wd-w31-d3', week: 31, day: 3, skill: 'word-choice',
    skillLabel: 'Word choice',
    title: 'Words that carry an opinion',
    teach: 'Some words state a fact and smuggle in a judgement. "Cheap" and "inexpensive" describe the same price. In informative writing, notice which one you reached for and whether you meant to.',
    weak: 'The scheme was a reckless waste of taxpayer money. (in a report meant to inform)',
    strong: 'The programme cost $4.2 billion, which was 60% over its original estimate.',
    task: 'Write 5 pairs of sentences that state the same fact, one neutrally and one with a judgement built into the word choice. Underline the loaded word.',
    checkFor: 'Each pair states the same fact; the loaded word is identified.',
    minSentences: 10
  },
  {
    id: 'wd-w31-d4', week: 31, day: 4, skill: 'word-choice',
    skillLabel: 'Word choice',
    title: 'Upgrading a paragraph, word by word',
    teach: 'Go through a finished paragraph and question every noun and verb: is there a word that carries more information for the same space? Usually four or five upgrades exist per paragraph.',
    weak: 'The person went into the place and did the job with the tool.',
    strong: 'The machinist walked into the shop and cut the part on a lathe.',
    task: 'Take any paragraph you wrote and upgrade at least six nouns or verbs. Show the original word in brackets after each change.',
    checkFor: 'Six genuine upgrades, originals shown for comparison.',
    minSentences: 6
  },

  // ---- Week 32: audience ----
  {
    id: 'wd-w32-d1', week: 32, day: 1, skill: 'audience',
    skillLabel: 'Writing for a reader',
    title: 'What does this reader already know?',
    teach: 'Everything you explain is a guess about what the reader already has. Explain too much and you insult them; too little and you lose them. Naming your reader before you write settles most of those guesses.',
    weak: 'Writing for "everyone", which means writing for no one.',
    strong: 'Writing for a specific person: a classmate, a grandparent, a judge at a science fair.',
    task: 'Explain the same idea to three named readers — a seven-year-old, a classmate, and an expert. Four sentences each. Say what you added or removed for each.',
    checkFor: 'Three genuinely different versions, with the changes named.',
    minSentences: 12
  },
  {
    id: 'wd-w32-d2', week: 32, day: 2, skill: 'audience',
    skillLabel: 'Writing for a reader',
    title: 'Writing for someone who was not there',
    teach: 'The most common failure in journals and reports: writing as though the reader saw what you saw. "Then it did the thing again" makes sense only to you.',
    weak: 'It happened again like last time so we did the same fix.',
    strong: 'The fin loosened at the root for the second time, so we re-glued it and added a fillet, the same repair as the previous flight.',
    task: 'Write a 6-sentence account of something that happened, for a reader who was not present. Then read it back and mark every place you assumed knowledge.',
    checkFor: 'No unexplained "it", "that time", or "the usual".',
    minSentences: 6
  },
  {
    id: 'wd-w32-d3', week: 32, day: 3, skill: 'audience',
    skillLabel: 'Writing for a reader',
    title: 'Formal and informal, on purpose',
    teach: 'Register is a choice, not a rule. Contractions and short sentences suit a journal; a research paper for a stranger usually does not want them. What matters is consistency — a paper that switches sounds unedited.',
    weak: 'Furthermore, the results were kinda surprising and we were pretty stoked.',
    strong: 'The results were surprising: two of the three runs exceeded the predicted altitude.',
    task: 'Write the same paragraph twice — once informally for your journal, once formally for a report. Then find one sentence in your recent writing that mixes the two and fix it.',
    checkFor: 'Both versions internally consistent, and a real mixed sentence found and fixed.',
    minSentences: 10
  },
  {
    id: 'wd-w32-d4', week: 32, day: 4, skill: 'audience',
    skillLabel: 'Writing for a reader',
    title: 'The reader who disagrees with you',
    teach: 'Writing to persuade someone who already agrees is easy and pointless. Write for the reader who does not — it forces you to give evidence rather than adjectives.',
    weak: 'Obviously anyone can see that this is the right answer.',
    strong: 'The strongest objection is cost, and it is a fair one: the programme ran 60% over budget. What that figure leaves out is where the money went.',
    task: 'Argue for something you believe, in one paragraph, written for a reader who disagrees. You must state their strongest objection fairly before answering it.',
    checkFor: 'The objection is stated fairly, not as a straw man.',
    minSentences: 6
  },

  // ---- Week 33: quoting and paraphrasing ----
  {
    id: 'wd-w33-d1', week: 33, day: 1, skill: 'quoting',
    skillLabel: 'Quoting and paraphrasing',
    title: 'Quote, paraphrase, or summarise',
    teach: 'Quote when the exact words matter. Paraphrase when the idea matters but the words do not. Summarise when only the shape of it matters. Quoting everything is a sign you have not decided which.',
    weak: 'Four long quotations in a row with a sentence of yours between them.',
    strong: 'One quotation because the phrasing mattered; the rest in your own words.',
    task: 'Take one paragraph from something you are reading. Quote one sentence, paraphrase another, and summarise the whole thing. Label all three.',
    checkFor: 'All three techniques used correctly and labelled.',
    minSentences: 5
  },
  {
    id: 'wd-w33-d2', week: 33, day: 2, skill: 'quoting',
    skillLabel: 'Quoting and paraphrasing',
    title: 'Working a quotation into your own sentence',
    teach: 'A quotation dropped in on its own line stops the writing dead. Build it into your sentence so the grammar runs through it.',
    weak: 'Armstrong stepped onto the surface. "That’s one small step for man." It was famous.',
    strong: 'Armstrong marked the moment with a line he had reportedly considered for weeks — "one small step for man" — before he ever left the ladder.',
    task: 'Take 4 quotations and work each one into a sentence of your own so that the whole thing reads as one sentence.',
    checkFor: 'Grammar runs cleanly through every quotation.',
    minSentences: 4
  },
  {
    id: 'wd-w33-d3', week: 33, day: 3, skill: 'quoting',
    skillLabel: 'Quoting and paraphrasing',
    title: 'Paraphrasing without stealing the sentence',
    teach: 'A real paraphrase changes the structure, not just the words. Swapping synonyms into someone else’s sentence is plagiarism with a thesaurus.',
    weak: 'Original: "The computer had extremely limited memory." Paraphrase: "The computer had very restricted memory."',
    strong: 'Original: "The computer had extremely limited memory." Paraphrase: "Memory was the tightest constraint the designers faced."',
    task: 'Paraphrase 4 sentences from a source. Then compare each to the original: if the sentence structure is the same, do it again.',
    checkFor: 'No paraphrase shares its structure with the original.',
    minSentences: 8
  },
  {
    id: 'wd-w33-d4', week: 33, day: 4, skill: 'quoting',
    skillLabel: 'Quoting and paraphrasing',
    title: 'A sourced paragraph',
    teach: 'Everything together: a claim, a quotation worked in, a paraphrase, and every source named. This is what a research paragraph looks like.',
    weak: 'A paragraph of borrowed sentences with one source listed at the bottom.',
    strong: 'A paragraph where the reader can tell, sentence by sentence, whose idea is whose.',
    task: 'Write one research-style paragraph using at least one direct quotation and one paraphrase, both with sources named in the sentence.',
    checkFor: 'Whose idea is whose is clear in every sentence.',
    minSentences: 6
  },

  // ---- Week 34: titles and structure signals ----
  {
    id: 'wd-w34-d1', week: 34, day: 1, skill: 'titles',
    skillLabel: 'Titles and headings',
    title: 'A title that says what it is',
    teach: 'A title is a promise about the contents. Clever is fine; unclear is not. If the reader cannot guess the subject from the title, the title has failed.',
    weak: 'Up, Up and Away!',
    strong: 'Why Our Second Rocket Flew Straight: A Fin Alignment Post-Mortem',
    task: 'Write titles for 5 pieces you have written this year. Then write a second version of each that is clearer, even if less clever.',
    checkFor: 'Ten titles; the second of each pair is genuinely clearer.',
    minSentences: 10
  },
  {
    id: 'wd-w34-d2', week: 34, day: 2, skill: 'titles',
    skillLabel: 'Titles and headings',
    title: 'Headings that let someone skim',
    teach: 'In a report, headings let a reader find what they need without reading everything. That is not laziness on their part — it is what technical documents are for.',
    weak: 'Section 2',
    strong: 'Recovery System: Why the Parachute Opened Late',
    task: 'Take a longer piece you wrote and add 4 headings to it. Each heading must say what its section concludes, not just what it is about.',
    checkFor: 'Headings state conclusions, not topics.',
    minSentences: 6
  },
  {
    id: 'wd-w34-d3', week: 34, day: 3, skill: 'titles',
    skillLabel: 'Titles and headings',
    title: 'The first sentence after a heading',
    teach: 'A heading is not part of the sentence beneath it. "Recovery System — It failed" reads as though the heading were the subject. The first sentence has to stand alone.',
    weak: 'Fin Alignment. Was off by four degrees.',
    strong: 'Fin Alignment. The starboard fin was off by four degrees, measured against a square.',
    task: 'Write 4 heading-plus-first-sentence pairs where each sentence stands alone without the heading.',
    checkFor: 'Every first sentence makes sense with the heading covered up.',
    minSentences: 8
  },
  {
    id: 'wd-w34-d4', week: 34, day: 4, skill: 'titles',
    skillLabel: 'Titles and headings',
    title: 'A document someone can navigate',
    teach: 'Title, headings, and an opening that says what the document contains. This is the shape of every report, manual and paper you will write from here on.',
    weak: 'A wall of correct paragraphs with no way in.',
    strong: 'A document a reader can enter at any heading and still understand.',
    task: 'Write a short structured report (title, opening paragraph, 3 headed sections of 3 sentences each) on a project you have done.',
    checkFor: 'Title, opening, and three headed sections, each entered at any point.',
    minSentences: 12
  },

  // ---- Week 35: proofreading ----
  {
    id: 'wd-w35-d1', week: 35, day: 1, skill: 'proofreading',
    skillLabel: 'Proofreading',
    title: 'Read it backwards',
    teach: 'Reading the last sentence first, then the one before it, stops your brain from auto-correcting what it expects to see. It is the oldest proofreading trick and it works.',
    weak: 'Reading it through once and calling it checked.',
    strong: 'Reading it sentence by sentence, from the bottom up, looking only at the words.',
    task: 'Take a piece you wrote, read it backwards sentence by sentence, and list every error you find. Then read it forwards and see how many you had missed.',
    checkFor: 'A real list of found errors, with the two counts compared.',
    minSentences: 6
  },
  {
    id: 'wd-w35-d2', week: 35, day: 2, skill: 'proofreading',
    skillLabel: 'Proofreading',
    title: 'The mistakes YOU make',
    teach: 'Everyone has a personal set of recurring errors — its/it’s, their/there, missing commas after opening phrases, sentences that run on. Knowing your own three is worth more than knowing all the rules.',
    weak: 'Checking everything vaguely and catching nothing.',
    strong: 'Three named errors, hunted for specifically, one pass each.',
    task: 'Look through three pieces you wrote this year and identify your three most common mistakes. Write them as a personal checklist, then apply it to a fourth piece.',
    checkFor: 'Three genuinely recurring errors named, and the checklist actually applied.',
    minSentences: 6
  },
  {
    id: 'wd-w35-d3', week: 35, day: 3, skill: 'proofreading',
    skillLabel: 'Proofreading',
    title: 'What a checker catches and what it cannot',
    teach: 'A grammar checker finds spelling and many punctuation errors. It cannot tell you that your topic sentence is missing, your evidence does not support your claim, or your paragraph is about two things. Run it — then do the part it cannot.',
    weak: 'Treating a green tick from a checker as proof the writing is good.',
    strong: 'Checker first for mechanics, then your own eyes for structure.',
    task: 'Run a piece through a grammar checker. List what it caught. Then list three problems it did NOT catch that you can see yourself.',
    checkFor: 'Three structural problems found that a checker could not have flagged.',
    minSentences: 6
  },
  {
    id: 'wd-w35-d4', week: 35, day: 4, skill: 'proofreading',
    skillLabel: 'Proofreading',
    title: 'The final pass, in order',
    teach: 'Revise first (structure, evidence, order), then edit (sentences, words), then proofread (spelling, punctuation). Doing it in the other order means proofreading sentences you later delete.',
    weak: 'Fixing commas in a paragraph you are about to cut.',
    strong: 'Three passes, in order, each looking for one kind of thing.',
    task: 'Take a draft and do all three passes, in order. After each pass, write one line saying what you changed.',
    checkFor: 'Three separate passes, each with its own changes listed.',
    minSentences: 9
  },

  // ---- Week 36: the year ----
  {
    id: 'wd-w36-d1', week: 36, day: 1, skill: 'year-review',
    skillLabel: 'Putting it together',
    title: 'Planning before you write',
    teach: 'A plan is a thesis and three topic sentences. Ten minutes of planning saves an hour of rewriting, and it is the habit that separates writers who finish from writers who restart.',
    weak: 'Starting to write and hoping the point turns up.',
    strong: 'A thesis and three topic sentences on a page before the first paragraph exists.',
    task: 'Choose a subject you care about. Write a thesis and three topic sentences. Do not write the piece yet.',
    checkFor: 'A provable thesis and three topic sentences that would prove it.',
    minSentences: 4
  },
  {
    id: 'wd-w36-d2', week: 36, day: 2, skill: 'year-review',
    skillLabel: 'Putting it together',
    title: 'Drafting from the plan',
    teach: 'A draft written from a plan is allowed to be rough. Its job is to exist. You already know what each paragraph has to do, so write straight through and do not stop to fix anything.',
    weak: 'Editing sentence one for twenty minutes and never reaching paragraph two.',
    strong: 'A complete rough draft with problems in it.',
    task: 'Draft the full piece you planned yesterday — introduction, three bodies, conclusion. Do not edit anything while drafting.',
    checkFor: 'A complete draft exists, rough or not.',
    minSentences: 20
  },
  {
    id: 'wd-w36-d3', week: 36, day: 3, skill: 'year-review',
    skillLabel: 'Putting it together',
    title: 'Revising your draft',
    teach: 'Now everything from Q4: cut what is not carrying its weight, put the strongest support last, fix the passive constructions, vary the sentence lengths, upgrade the words.',
    weak: 'Changing three words and declaring it revised.',
    strong: 'A revision list with at least six real changes on it.',
    task: 'Revise yesterday’s draft. List every change you made and why. Aim for at least six.',
    checkFor: 'Six or more real changes, each with a reason.',
    minSentences: 8
  },
  {
    id: 'wd-w36-d4', week: 36, day: 4, skill: 'year-review',
    skillLabel: 'Putting it together',
    title: 'Year benchmark — the finished piece',
    teach: 'This is the last drill of the year, and it asks for everything: a plan, a draft, a revision, and a proofread, on a subject you chose. Compare it to week 1, day 1 — four sentences about something you built. That distance is the point.',
    weak: '(week 1: "I like space. Space is big. There are planets. I want to go.")',
    strong: '(this week: a planned, drafted, revised, proofread five-paragraph piece)',
    task: 'Proofread and finalise your piece. Then write a short note underneath: what is the biggest difference between this and what you wrote in week 1?',
    checkFor: 'A finished piece and an honest comparison. This is the year benchmark.',
    minSentences: 22
  },

  // ==== WEEKS 37-43: WRITING THAT LEAVES THE HOUSE ====

  // ---- Week 37: the email that gets answered ----
  {
    id: 'wd-w37-d1', week: 37, day: 1, skill: 'professional-email',
    skillLabel: 'Writing to a stranger',
    title: 'Subject lines that get opened',
    teach: 'An engineer writes more email than anything else, and the subject line decides whether it is read today or next week. A good one names the thing and the ask in under eight words. "Question" is not a subject line. "Question about the Artemis II launch window" is.',
    weak: 'Subject: hi\nSubject: quick question\nSubject: (blank)',
    strong: 'Subject: Requesting a tour of the wind tunnel, week of June 7',
    task: 'Write 6 subject lines, each under 8 words, for: (1) asking a museum about a school visit, (2) reporting a broken link on a website, (3) asking an engineer one question about her job, (4) following up after no reply, (5) sending a finished project to your teacher, (6) cancelling something you signed up for.',
    checkFor: 'Six lines, all under eight words, each naming both the topic and the ask.',
    minSentences: 6
  },
  {
    id: 'wd-w37-d2', week: 37, day: 2, skill: 'professional-email',
    skillLabel: 'Writing to a stranger',
    title: 'Who you are, what you want, why them',
    teach: 'A cold email has three jobs in its first three sentences: say who you are, say exactly what you are asking for, and say why you are asking THIS person. Skip any one of them and the reader has to guess, and people do not answer emails they have to guess at.',
    weak: 'Hi, I love space and I was wondering if you could tell me some stuff about engineering. Thanks.',
    strong: 'My name is Lamar and I am a seventh-grade homeschool student in Georgia. I am asking for fifteen minutes of your time to ask about propulsion testing. I am writing to you because your name was on the Artemis static-fire report I read this month.',
    task: 'Write a real cold email to someone whose work you have actually read about. Three sentences for the three jobs, then one specific question, then a sign-off. Do not send it yet.',
    checkFor: 'Who, what, why-them, one specific question, a sign-off. The why-them must reference something real.',
    minSentences: 5
  },
  {
    id: 'wd-w37-d3', week: 37, day: 3, skill: 'professional-email',
    skillLabel: 'Writing to a stranger',
    title: 'The tone dial',
    teach: 'The same request can be written three ways, and only one of them fits. Too casual and an adult stops taking you seriously; too stiff and you sound like you copied a form. The target is plain and polite: full sentences, no slang, no apologising for existing.',
    weak: 'hey so i was wondering if maybe u could possibly help me out sorry to bother you!!',
    strong: 'I would be grateful for fifteen minutes of your time. If this week is difficult, I am happy to wait.',
    task: 'Take yesterday\u2019s email. Rewrite it twice: once far too casual, once far too formal. Then mark which sentences in your original were drifting toward either edge.',
    checkFor: 'Three versions, and at least two sentences honestly marked as drifting.',
    minSentences: 9
  },
  {
    id: 'wd-w37-d4', week: 37, day: 4, skill: 'professional-email',
    skillLabel: 'Writing to a stranger',
    title: 'The follow-up nobody resents',
    teach: 'Most first emails get no reply, and that is usually not a no. A follow-up works when it is short, repeats the ask in one line, and gives the reader an easy way out. Never guilt someone for not answering.',
    weak: 'I emailed you two weeks ago and never heard back. Did you get it?',
    strong: 'Following up on my note of 3 June about a fifteen-minute conversation on propulsion testing. If now is not a good time, I understand completely and will not write again.',
    task: 'Write the follow-up to your week-37 email. Under 60 words. It must name the date of the first email, repeat the ask in one sentence, and offer a graceful exit.',
    checkFor: 'Under 60 words, all three parts present, no guilt.',
    minSentences: 3
  },

  // ---- Week 38: writing to be read on a screen ----
  //
  // NOT procedure writing — week 25 already did that properly, right down to
  // "test it on a real person". This is the other half nobody teaches: the
  // reader does not read, the reader SCANS, and the shape on the page decides
  // what they take away.
  {
    id: 'wd-w38-d1', week: 38, day: 1, skill: 'skim-formatting',
    skillLabel: 'Writing to be scanned',
    title: 'Most people do not read, they scan',
    teach: 'A reader on a screen looks at the first line, the headings, and anything bold, then decides whether to read at all. That is not laziness — it is how everyone reads now, including the engineer you emailed. Writing for it is a skill, not a compromise.',
    weak: 'A 400-word block with the one thing that mattered in sentence nine.',
    strong: 'The same 400 words with the point in sentence one, three headings, and the deadline in bold.',
    task: 'Take any long paragraph you have written this year. Without changing the words, break it up: add a heading, split it into shorter paragraphs, and bold the single most important phrase. Then write two sentences on what a scanner now sees first.',
    checkFor: 'Real structure added, and an honest account of what a scanner sees first.',
    minSentences: 4
  },
  {
    id: 'wd-w38-d2', week: 38, day: 2, skill: 'skim-formatting',
    skillLabel: 'Writing to be scanned',
    title: 'The most important thing first',
    teach: 'Journalists call it the inverted pyramid: conclusion first, then support, then detail, so a reader who stops after one line still leaves with the right thing. Engineering status reports work the same way. Save the build-up for stories.',
    weak: 'We ran the tests on Tuesday. The weather was fine. We used three canopies. After analysis, we found the launch should be delayed.',
    strong: 'The launch should be delayed. Tuesday\u2019s tests showed the 40 cm canopy failing at a lower speed than expected. Detail follows.',
    task: 'Write the same 5-sentence update twice: once building to the point, once with the point first. Then say which you would send to an adult who is busy, and why.',
    checkFor: 'Both versions written, and a real reason for the choice.',
    minSentences: 11
  },
  {
    id: 'wd-w38-d3', week: 38, day: 3, skill: 'skim-formatting',
    skillLabel: 'Writing to be scanned',
    title: 'When a list beats a paragraph, and when it does not',
    teach: 'Bullets are for things that are genuinely parallel — five materials, four steps, three options. They are not for an argument, because bullets throw away the connections between ideas, and in an argument the connections ARE the argument.',
    weak: '\u2022 rockets are expensive \u2022 budgets are limited \u2022 therefore something',
    strong: 'Because each launch costs $1.5 bn against a $4 bn annual budget, a fourth flight would consume the whole programme reserve.',
    task: 'Write one list that should be a list, and one paragraph that somebody would be tempted to bullet but should not be. Explain in a sentence why each is right.',
    checkFor: 'Both examples, and a reason that names connection or parallelism.',
    minSentences: 6
  },
  {
    id: 'wd-w38-d4', week: 38, day: 4, skill: 'skim-formatting',
    skillLabel: 'Writing to be scanned',
    title: 'The one-page status update',
    teach: 'Everything from this week at once. One page, scannable: the headline first, headings a reader can jump between, a short list where things really are parallel, and the one date or number that matters in bold.',
    weak: 'A page of solid text about how the project is going.',
    strong: 'A page a busy adult can read the first line of and know where things stand.',
    task: 'Write a one-page status update on a project you are actually working on. Headline first, at least two headings, one genuine list, one bolded number or date.',
    checkFor: 'All four elements, and the first line alone tells the truth about the project.',
    minSentences: 12
  },

  // ---- Week 39: asking for something in writing ----
  //
  // NOT summarising — week 27 covered that, at three lengths. A proposal is
  // the form that decides whether an engineer gets to do the work at all, and
  // nothing else in the year teaches it.
  {
    id: 'wd-w39-d1', week: 39, day: 1, skill: 'proposal',
    skillLabel: 'Asking in writing',
    title: 'What you want, exactly',
    teach: 'A proposal that does not say precisely what is being asked for cannot be said yes to. "Some help with materials" is unanswerable. "$40 for balsa and a 2 m length of 6 mm dowel, by 12 June" can be approved in ten seconds.',
    weak: 'Can I get some stuff for my next project sometime?',
    strong: 'I am asking for $40 and the use of the garage table on Saturday mornings through June.',
    task: 'Write 5 one-sentence asks for things you genuinely want, each naming the exact thing, the exact amount, and the exact date. No vagueness anywhere.',
    checkFor: 'Five asks, each with thing, amount and date. Anything answerable only with "it depends" does not count.',
    minSentences: 5
  },
  {
    id: 'wd-w39-d2', week: 39, day: 2, skill: 'proposal',
    skillLabel: 'Asking in writing',
    title: 'What the other person gets',
    teach: 'Every proposal is read by someone asking, silently, "why should I?" Answering that is not flattery — it is the part that makes a yes reasonable. Say what changes for them, or for the thing they care about, if they agree.',
    weak: 'This would be really fun for me and I would enjoy it a lot.',
    strong: 'The garage table means the glue cures flat, so I stop rebuilding warped wings, which is where most of the materials money has gone this year.',
    task: 'Take your strongest ask from yesterday. Write a paragraph on what the person saying yes actually gets \u2014 in their terms, not yours.',
    checkFor: 'Benefit stated in the other person\u2019s terms, not the writer\u2019s enjoyment.',
    minSentences: 5
  },
  {
    id: 'wd-w39-d3', week: 39, day: 3, skill: 'proposal',
    skillLabel: 'Asking in writing',
    title: 'The plan that makes it believable',
    teach: 'An ask is only as credible as the plan behind it. Dates, steps, and what you will show at the end. This is where most proposals fall down: the want is clear, and there is no evidence the person asking has thought past getting the yes.',
    weak: 'I will work on it over the summer and see how it goes.',
    strong: 'Week 1 build, week 2 test at three heights, week 3 write it up. I will show you the log and the finished write-up on 30 June.',
    task: 'Write the plan for your proposal: at least three dated stages and exactly what you will show at the end.',
    checkFor: 'Three dated stages and a specific deliverable \u2014 not "I will show you how it went".',
    minSentences: 6
  },
  {
    id: 'wd-w39-d4', week: 39, day: 4, skill: 'proposal',
    skillLabel: 'Asking in writing',
    title: 'The whole proposal, on one page',
    teach: 'Everything from this week: the exact ask, what the other person gets, the dated plan, and the one thing you will show at the end. This is the form real engineers use to get projects funded, and it is short on purpose.',
    weak: 'Three pages of enthusiasm with no number and no date in any of them.',
    strong: 'One page a person could say yes to without asking you a single question.',
    task: 'Write the full one-page proposal for something you actually want. Exact ask, their benefit, dated plan, final deliverable. Then give it to Mom.',
    checkFor: 'One page, all four parts, and no question left that the reader would have to ask.',
    minSentences: 14
  },

  // ---- Week 40: making a case ----
  {
    id: 'wd-w40-d1', week: 40, day: 1, skill: 'argument',
    skillLabel: 'Making a case',
    title: 'A claim you could be wrong about',
    teach: 'A claim worth arguing is one a reasonable person could dispute. "Space exploration is interesting" is not a claim, it is a feeling. "Crewed Mars missions should wait until we can produce fuel on the surface" is a claim \u2014 you can imagine someone disagreeing, and that is the test.',
    weak: 'Rockets are important.',
    strong: 'NASA should fund more uncrewed missions than crewed ones for the next decade.',
    task: 'Write 5 claims about engineering, space or technology that a reasonable person could dispute. Beside each, write the sentence someone who disagreed would say.',
    checkFor: 'Five disputable claims, each with a real opposing sentence.',
    minSentences: 10
  },
  {
    id: 'wd-w40-d2', week: 40, day: 2, skill: 'argument',
    skillLabel: 'Making a case',
    title: 'Evidence, not adjectives',
    teach: 'Piling on stronger words does not make an argument stronger \u2014 it makes it louder. What makes it stronger is a number, a source or a specific case. Swap "incredibly expensive" for "$1.5 billion per launch" and the sentence stops asking to be believed and starts giving a reason.',
    weak: 'The Shuttle was unbelievably, ridiculously expensive.',
    strong: 'Each Shuttle flight cost about $1.5 billion, against the $54 million originally projected.',
    task: 'Choose one claim from yesterday. Write three supports for it, each containing a number, a named source or a specific documented case. No adjectives doing the work.',
    checkFor: 'Three supports, each with hard evidence rather than intensity.',
    minSentences: 6
  },
  {
    id: 'wd-w40-d3', week: 40, day: 3, skill: 'argument',
    skillLabel: 'Making a case',
    title: 'The strongest thing against you',
    teach: 'Answering a weak objection fools nobody. Find the best argument against your claim, state it as fairly as its own supporters would, and then answer it. Doing this well is the single clearest signal that a writer has actually thought.',
    weak: 'Some people say crewed missions are good, but they are wrong.',
    strong: 'The strongest case for crewed missions is that a geologist on the surface can re-plan in a minute what a rover takes a week to attempt. That is real. It still does not outweigh \u2014',
    task: 'Write the strongest objection to your claim, as fairly as you can. Then answer it in a paragraph. Your version of the objection must be one its supporters would accept.',
    checkFor: 'A fair objection and a real answer \u2014 not a straw man knocked over.',
    minSentences: 8
  },
  {
    id: 'wd-w40-d4', week: 40, day: 4, skill: 'argument',
    skillLabel: 'Making a case',
    title: 'The whole case, in five paragraphs',
    teach: 'Everything from this week at once: claim, three evidenced supports, the strongest objection answered, and a conclusion that does not just repeat the opening. Put your strongest support last \u2014 it is what the reader carries away.',
    weak: 'In conclusion, as I said at the start, rockets are important.',
    strong: 'A conclusion that names what would change your mind.',
    task: 'Write the full five-paragraph case for your claim. Strongest support last. End by naming what evidence would change your mind.',
    checkFor: 'Five paragraphs, evidence in each support, the objection answered, and a real answer to what would change your mind.',
    minSentences: 18
  },

  // ---- Week 41: writing about data ----
  {
    id: 'wd-w41-d1', week: 41, day: 1, skill: 'data-writing',
    skillLabel: 'Writing about data',
    title: 'Describe the shape, not every point',
    teach: 'Nobody wants a chart read aloud. Describing data means naming the shape \u2014 it rises, it flattens, it jumps here \u2014 and then giving the two or three numbers that pin the shape down. Trend first, then evidence.',
    weak: 'In week 1 it was 4, in week 2 it was 5, in week 3 it was 5, in week 4 it was 7\u2026',
    strong: 'Descent time rose steadily with canopy size, from 2.1 s at 20 cm to 3.8 s at 40 cm, with almost all the gain arriving before 30 cm.',
    task: 'Take a set of numbers from any project this year. Write a paragraph that names the shape first and then supports it with no more than three numbers.',
    checkFor: 'Shape named before any number appears; three numbers at most.',
    minSentences: 5
  },
  {
    id: 'wd-w41-d2', week: 41, day: 2, skill: 'data-writing',
    skillLabel: 'Writing about data',
    title: 'What the data does not say',
    teach: 'The honest half of writing about results is the limits: how many trials, what you did not control, what else could explain it. Engineers who skip this are not being confident, they are being unreliable \u2014 and one unreliable report is remembered longer than ten good ones.',
    weak: 'This proves bigger parachutes are always better.',
    strong: 'Three drops per size is too few to rule out wind. The 40 cm canopy was also tested last, when the afternoon was calmer, and that alone could account for its result.',
    task: 'Write the limits paragraph for yesterday\u2019s data: how many trials, what you did not control, and one alternative explanation you cannot rule out.',
    checkFor: 'All three, and an alternative explanation that is genuinely plausible.',
    minSentences: 5
  },
  {
    id: 'wd-w41-d3', week: 41, day: 3, skill: 'data-writing',
    skillLabel: 'Writing about data',
    title: 'Honest and dishonest charts',
    teach: 'A chart can tell the truth about its numbers and still mislead: an axis that starts at 90 instead of 0 turns a 2% difference into a cliff. Writing about data means saying what the picture does, not just what it shows.',
    weak: 'The graph shows a massive increase.',
    strong: 'The graph appears to show a cliff, but the vertical axis starts at 90 \u2014 the real difference is two percentage points.',
    task: 'Find or sketch two charts of the same numbers, one drawn honestly and one drawn to exaggerate. Write a paragraph explaining exactly what the second one does and how.',
    checkFor: 'The specific trick named \u2014 axis, scale, cherry-picked range \u2014 not just "it looks bigger".',
    minSentences: 6
  },
  {
    id: 'wd-w41-d4', week: 41, day: 4, skill: 'data-writing',
    skillLabel: 'Writing about data',
    title: 'The results section',
    teach: 'A results section is data first and meaning second, kept apart on purpose. State what happened, then in a separate paragraph say what you think it means. Mixing them is how a reader loses track of which part is measurement and which part is you.',
    weak: 'The bigger parachute obviously worked better because bigger is better, and it took 3.8 seconds.',
    strong: 'Results: 20 cm \u2014 2.1 s. 30 cm \u2014 3.4 s. 40 cm \u2014 3.8 s (n = 3 each).\nDiscussion: the gain flattens above 30 cm, which is consistent with \u2014',
    task: 'Write a two-part results section for one project: a Results paragraph with only what happened, and a Discussion paragraph with what you think it means.',
    checkFor: 'No interpretation in Results; no new numbers in Discussion.',
    minSentences: 8
  },

  // ---- Week 42: writing about yourself ----
  {
    id: 'wd-w42-d1', week: 42, day: 1, skill: 'personal-statement',
    skillLabel: 'Writing about yourself',
    title: 'Show the moment, not the label',
    teach: 'Anyone can write "I am passionate about engineering", and everyone does, which is why it lands as nothing. What lands is the moment: the specific afternoon, the thing that broke, what you did next. Labels are claims about yourself; moments are evidence.',
    weak: 'I have always been passionate about aerospace engineering since I was young.',
    strong: 'The first glider I built snapped its wing on the third throw. I spent the rest of that afternoon working out that the balsa grain ran the wrong way.',
    task: 'Write 4 sentences that each show a moment instead of stating a label about yourself. Beside each, write the flat label version you avoided.',
    checkFor: 'Four real moments, each with the label it replaces.',
    minSentences: 8
  },
  {
    id: 'wd-w42-d2', week: 42, day: 2, skill: 'personal-statement',
    skillLabel: 'Writing about yourself',
    title: 'The three-sentence bio',
    teach: 'A short bio is who you are, what you do, and one specific thing \u2014 the specific thing is the whole point, because it is the only part nobody else could have written. Programmes, competitions and applications all ask for this.',
    weak: 'Lamar is a student who likes science and hopes to do well in the future.',
    strong: 'Lamar is a seventh-grade homeschool student in Georgia building toward aerospace engineering. He runs his own parachute drop tests in the back yard and logs every trial. His current problem is why canopy gains flatten above 30 cm.',
    task: 'Write your three-sentence bio in the third person. The third sentence must contain something specific and true that nobody else could write.',
    checkFor: 'Three sentences, third person, a genuinely unrepeatable third sentence.',
    minSentences: 3
  },
  {
    id: 'wd-w42-d3', week: 42, day: 3, skill: 'personal-statement',
    skillLabel: 'Writing about yourself',
    title: 'Writing about something that went wrong',
    teach: 'Applications ask about failure because the answer is hard to fake. A good one is specific about what you did wrong, honest that it was yours, and clear about what you changed. Blaming circumstances is the tell.',
    weak: 'My project failed because I did not have the right materials and there was not enough time.',
    strong: 'I glued the fins by eye instead of marking 120 degrees, and the rocket corkscrewed. I now mark every angle before any glue comes out, on everything I build.',
    task: 'Write a paragraph about a real thing of yours that failed this year: what you did, what went wrong, what you actually changed afterwards. No blaming circumstances.',
    checkFor: 'A real failure, ownership rather than excuse, and a change that actually stuck.',
    minSentences: 6
  },
  {
    id: 'wd-w42-d4', week: 42, day: 4, skill: 'personal-statement',
    skillLabel: 'Writing about yourself',
    title: 'The one-page statement',
    teach: 'Everything from this week: a moment to open, what you have actually built, one honest failure, and where you are heading. A page. No labels doing work that moments should be doing.',
    weak: 'I am passionate, hardworking and dedicated to my dream of becoming an aerospace engineer.',
    strong: 'A page in which the word "passionate" never appears and the reader finishes it certain anyway.',
    task: 'Write a one-page statement about yourself as an engineer-in-training. Open with a moment. Include something you built, something that failed, and where you are going. Ban the words passionate, dedicated and hardworking.',
    checkFor: 'A full page, opens on a moment, all three banned words absent, and a reader would believe it.',
    minSentences: 16
  },

  // ---- Week 43: the last week (Mon 24 - Wed 26 May 2027) ----
  {
    id: 'wd-w43-d1', week: 43, day: 1, skill: 'year-close',
    skillLabel: 'Closing the year',
    title: 'The year in five sentences',
    teach: 'Summarising a year is the same skill as summarising an article, turned on yourself: the claim, the load-bearing support, and everything else cut. Five sentences forces the choice about what actually mattered.',
    weak: 'This year I did a lot of things and learned a lot and it was good.',
    strong: 'This year I learned to finish. Nine of the eleven projects I started reached a written-up ending, against three last year.',
    task: 'Write exactly five sentences summarising your school year. The first must be a claim about what changed, not a topic.',
    checkFor: 'Exactly five sentences, opening on a claim rather than a topic.',
    minSentences: 5
  },
  {
    id: 'wd-w43-d2', week: 43, day: 2, skill: 'year-close',
    skillLabel: 'Closing the year',
    title: 'A letter to next year',
    teach: 'The most useful thing you can hand yourself in August is what you know in May and will have forgotten by then. Write it as advice to a real person, because in twelve weeks that is exactly what he will be.',
    weak: 'Dear future me, work hard and do your best!',
    strong: 'Dear August: the drills are twenty minutes if you start them and ninety if you argue about them first. You already know this. Start them.',
    task: 'Write a letter to yourself on the first day of eighth grade. Include three specific pieces of advice you learned the hard way, and one thing you want him to keep doing.',
    checkFor: 'Three specific hard-won pieces of advice, not general encouragement.',
    minSentences: 8
  },
  {
    id: 'wd-w43-d3', week: 43, day: 3, skill: 'year-close',
    skillLabel: 'Closing the year',
    title: 'Thanking someone specifically',
    teach: 'A thank-you that names the specific thing is worth ten that say "for everything". Name what the person did, name what it changed for you, and keep it short. This is a real skill and most adults never learn it.',
    weak: 'Thank you for everything you did this year, it meant a lot.',
    strong: 'Thank you for sitting through the bottle-rocket instructions without helping me. Watching you get stuck at step 4 taught me more about writing than the drill did.',
    task: 'Write a thank-you note to someone who actually helped you this year \u2014 Mom, a teacher, an author, whoever it truly was. Name the specific thing and what it changed. Under 100 words.',
    checkFor: 'A specific act named, a specific change named, under 100 words. Then give it to them.',
    minSentences: 4
  },
  {
    id: 'wd-w43-d4', week: 43, day: 4, skill: 'year-close',
    skillLabel: 'Closing the year',
    title: 'The last page',
    teach: 'The last drill of the ladder. One page, no prompt, no structure given, no rules except the ones you now know without being told. That is what the year was for.',
    weak: '(a blank page, because nobody said what to write about)',
    strong: '(a page about whatever mattered, planned and revised without being asked to)',
    task: 'Write one page about anything you choose. Plan it, draft it, revise it, proofread it. Nobody is going to tell you how.',
    checkFor: 'A page that shows planning and revision without having been told to do either.',
    minSentences: 14
  }
];
