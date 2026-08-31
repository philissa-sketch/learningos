// ---------------------------------------------------------------------------
// Language Arts & Writing — auto-gradable quiz lessons, Tier 1.
// These slot into the standard Lesson Engine/mastery system exactly like
// math and reading lessons (subject: 'reading'). The open-ended writing
// topics from the same doc section (essays, lab reports, journals, etc.)
// are NOT here — they can't be auto-graded, so they live in
// `src/data/writing/writingPrompts.js` and go through WritingPromptEngine
// instead, tracked by completion rather than mastery.
// ---------------------------------------------------------------------------

export const writingLessons7 = [
  {
    id: 'w7-grammar-mechanics',
    subject: 'reading',
    strand: 'language-arts',
    tier: 1,
    title: 'Grammar Mechanics: Mission Logs',
    theme: 'Punctuation, capitalization, and apostrophes in technical writing',
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'Which sentence is punctuated correctly?',
        choices: [
          'Before the launch the crew reviewed the checklist.',
          'Before the launch, the crew reviewed the checklist.',
          'Before, the launch the crew reviewed the checklist.',
          'Before the launch the crew, reviewed the checklist.'
        ],
        answer: 1,
        explanation: 'An introductory phrase like "Before the launch" is followed by a comma before the main clause.',
        choiceFeedback: [
          "This reads fine out loud because you pause there naturally, but on the page the introductory phrase \"Before the launch\" needs a comma to show where it ends.",
          null,
          "The comma belongs at the end of the whole introductory phrase, not after its first word. \"Before the launch,\" is the unit here, not \"Before,\".",
          "A comma never splits a subject from its verb. \"The crew, reviewed\" cuts the sentence at its strongest joint, and the opening phrase is still left unmarked."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: 'Which sentence uses capitalization correctly?',
        choices: [
          "The astronaut trained at nasa's Johnson Space Center.",
          "The Astronaut trained at NASA's johnson space center.",
          "The astronaut trained at NASA's Johnson Space Center.",
          "the astronaut trained at NASA's Johnson space Center."
        ],
        answer: 2,
        explanation: 'NASA (an acronym) and Johnson Space Center (a proper noun) are capitalized; "astronaut" is not, since it\'s a common noun here.',
        choiceFeedback: [
          "You got the space center right, but NASA is an acronym: every letter stands for a whole word, so all four letters are capitals.",
          "This flips the two rules. \"Astronaut\" is a job anyone can hold, while Johnson Space Center is one specific place with a name, so the capitals go the other way.",
          null,
          "Two slips here: the first word of a sentence always gets a capital, and a place name stays capitalized all the way through, as in Johnson Space Center."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'Which sentence uses the apostrophe correctly?',
        choices: [
          "The rockets engine ignited on schedule.",
          "The rocket's engine ignited on schedule.",
          "The rocket's engine's ignited on schedule.",
          "The rockets' engine ignited on schedule."
        ],
        answer: 1,
        explanation: "For one rocket possessing one engine, the correct singular possessive is \"rocket's.\"",
        choiceFeedback: [
          "\"Rockets\" with no apostrophe just means more than one rocket. To show the engine belongs to it, you need \"the rocket's engine.\"",
          null,
          "The second apostrophe turns \"engine's\" into a possessive, but nothing belongs to the engine here. The engine is the thing doing the igniting.",
          "Putting the apostrophe after the s says many rockets share one engine. One rocket owning its own engine is written \"rocket's.\""
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: "Which sentence correctly fixes this comma splice: \"The engine roared to life, the crew cheered.\"",
        choices: [
          'The engine roared to life the crew cheered.',
          'The engine roared to life, and the crew cheered.',
          'The engine, roared to life the crew cheered.',
          'The engine roared, to life the crew cheered.'
        ],
        answer: 1,
        explanation: 'Adding the coordinating conjunction "and" after the comma properly joins the two independent clauses.',
        choiceFeedback: [
          "Taking the comma out trades a comma splice for a run-on. Two complete thoughts still need something joining them, and now they have nothing at all.",
          null,
          "This moves the comma between \"engine\" and \"roared,\" which separates the subject from its verb and leaves the two complete thoughts still jammed together.",
          "The comma lands in the middle of the phrase \"roared to life,\" breaking apart words that work as one unit and scrambling what the sentence says."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 'w7-subject-verb-agreement',
    subject: 'reading',
    strand: 'language-arts',
    tier: 1,
    title: 'Grammar: Subject-Verb Agreement',
    theme: 'Matching verbs to their true subject, including tricky collective and compound subjects',
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'Which sentence has correct subject-verb agreement?',
        choices: [
          'The team of engineers are reviewing the design.',
          'The team of engineers is reviewing the design.',
          'The team of engineers were reviewing the design.',
          'The teams of engineers is reviewing the design.'
        ],
        answer: 1,
        explanation: '"Team" is a singular collective noun, so it takes the singular verb "is," even though "engineers" (plural) sits right before the verb.',
        choiceFeedback: [
          "\"Engineers\" sits closest to the verb, so \"are\" sounds right to your ear. The subject is \"team,\" though, and one team is reviewing.",
          null,
          "Same plural mismatch as \"are,\" with a tense change on top. The singular subject \"team\" still needs \"is reviewing.\"",
          "This one flips the mistake: \"teams\" is plural now, so it would take \"are.\" Make the verb follow the subject, not the subject follow the verb."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: 'Which sentence has correct subject-verb agreement?',
        choices: [
          'Neither the pilot nor the engineers was ready.',
          'Neither the pilot nor the engineers were ready.',
          'Neither the pilots nor the engineer were ready.',
          'Neither the pilots nor the engineer are ready.'
        ],
        answer: 1,
        explanation: 'In "neither...nor" constructions, the verb agrees with the nearer subject — "engineers" (plural) takes "were."',
        choiceFeedback: [
          "You matched the verb to \"pilot,\" the first subject named. With neither/nor, the verb follows whichever subject sits nearer to it, and that is \"engineers.\"",
          null,
          "The nearer subject here is \"engineer,\" singular, so this version would need \"was.\" It also swaps which noun is plural in the original.",
          "\"Are\" is plural, but the noun right beside it is the single \"engineer.\" Read backwards from the verb to find the word it has to match."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'Which sentence has correct subject-verb agreement?',
        choices: [
          'Each of the astronauts have completed training.',
          'Each of the astronauts has completed training.',
          'Each of the astronaut have completed training.',
          'Each of the astronauts having completed training.'
        ],
        answer: 1,
        explanation: '"Each" is singular, so it takes "has," regardless of the plural noun "astronauts" that follows "of."',
        choiceFeedback: [
          "\"Astronauts\" is plural, but it sits inside \"of the astronauts,\" a phrase that only describes. The real subject is \"Each,\" meaning one at a time, so \"has.\"",
          null,
          "Two things went sideways: \"of the astronaut\" should be plural for \"each\" to pick from, and \"Each\" still calls for \"has.\"",
          "\"Having completed\" is not a working verb by itself, so this never becomes a sentence. It stops before telling you what each astronaut did."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'Which sentence has correct subject-verb agreement?',
        choices: [
          'The list of requirements were finalized.',
          'The list of requirements was finalized.',
          'The lists of requirement was finalized.',
          'The list of requirements finalizing.'
        ],
        answer: 1,
        explanation: 'The subject is "list" (singular), not "requirements," so the correct verb is "was."',
        choiceFeedback: [
          "Your ear grabbed \"requirements\" because it sits right before the verb. Cover the \"of\" phrase and the real subject appears: the list was finalized.",
          null,
          "This makes the subject plural with \"lists\" while keeping the singular \"was,\" and shrinks requirements to one. It swaps the error rather than fixing it.",
          "\"Finalizing\" has no helping verb in front of it, so nothing is actually stated. That is a fragment, not a question of agreement."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 'w7-spelling-precision',
    subject: 'reading',
    strand: 'language-arts',
    tier: 1,
    title: 'Spelling Precision: Technical Terms',
    theme: 'Correct spelling of commonly misspelled words used in engineering writing',
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'Which spelling is correct?',
        choices: ['Recieve', 'Receive', 'Receeve', 'Receve'],
        answer: 1,
        explanation: '"i before e except after c" — but this word is actually an exception spelled "ei": Receive.',
        choiceFeedback: [
          "This is the \"i before e\" habit applied where it does not hold. Right after a c, the pair flips around: rec-EI-ve.",
          null,
          "The long ee sound tempted you into two e's, but this word spells that sound with the pair ei: receive.",
          "A letter went missing. Say it slowly, re-CEIVE, and you can hear the vowel pair that \"receve\" leaves out."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: 'Which spelling is correct?',
        choices: ['Occured', 'Occurred', 'Ocurred', 'Occureed'],
        answer: 1,
        explanation: 'The final consonant doubles before adding "-ed": Occurred.',
        choiceFeedback: [
          "When a word ends on a stressed short-vowel syllable, the final consonant doubles before -ed. Occur becomes occurred, the same way refer becomes referred.",
          null,
          "You doubled the r but dropped a c. The base word already begins oc-cur with two c's, before any ending gets added.",
          "The doubling belongs to the r, not the e. You add a plain -ed to occurr-, which gives occurred, never an \"-eed\" ending."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'Which spelling is correct?',
        choices: ['Neccessary', 'Necessary', 'Neccesary', 'Necesary'],
        answer: 1,
        explanation: 'One "c," two "s"s: Necessary.',
        choiceFeedback: [
          "You doubled the c along with the s. Only one of them doubles in this word: a single c and a double s.",
          null,
          "This doubles the wrong letter, c instead of s. One trick that sticks: a shirt has one Collar and two Sleeves.",
          "The single c is right, but the s never got doubled. Necessary has ess in the middle: nec-ESS-ary."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'Which spelling is correct?',
        choices: ['Maneuver', 'Manuever', 'Manuver', 'Maneuvre'],
        answer: 0,
        explanation: 'Maneuver — a commonly misspelled word; note the "eu" order.',
        choiceFeedback: [
          null,
          "The two vowels got swapped. This word keeps eu together, the same pair you see in Europe: man-EU-ver.",
          "This spells exactly what you hear, but the word carries a vowel your mouth skips. Written out, it is maneuver.",
          "The last two letters are flipped. In American technical writing this word ends in -ver, so it is maneuver."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 'w7-engineering-vocabulary',
    subject: 'reading',
    strand: 'language-arts',
    tier: 1,
    title: 'Engineering Vocabulary: Working Terms',
    theme: 'Vocabulary engineers use daily, in context',
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt:
          "Engineers built a prototype to test the design before mass production. What does 'prototype' mean?",
        choices: [
          'A final, mass-produced version',
          'An early working model used for testing',
          'A type of fastening bolt',
          'A safety inspection report'
        ],
        answer: 1,
        explanation: 'A prototype is an early model built to test and refine a design before full production.',
        choiceFeedback: [
          "This is the opposite end of the process. A prototype comes before mass production, which is the whole point of building one while fixes are still cheap.",
          null,
          "\"Proto-\" sounds technical, so guessing a hardware part is tempting. The sentence says they built it to test the design, and that points to a model, not a bolt.",
          "Testing gets mentioned, so you reached for a testing document. But engineers built this thing, and you build an object rather than a report."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt:
          "The team had to iterate on the wing design several times before it performed well. What does 'iterate' mean?",
        choices: [
          'To repeat a process with small improvements each time',
          'To destroy and start over from nothing',
          "To copy someone else's design exactly",
          'To submit a design for a patent'
        ],
        answer: 0,
        explanation: 'To iterate means to repeat a process, refining it a little more each time.',
        choiceFeedback: [
          null,
          "The sentence says the team worked the wing design several times, which is repeating and improving. Iterating keeps whatever already worked.",
          "Repeating is part of iterating, but you repeat your own process with changes each round, not duplicate someone else's finished work.",
          "This is a real engineering step, just not this word. Nothing in the sentence mentions ownership or filing, only doing the design again until it performed."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt:
          "Technicians calibrate the sensor before every test flight. What does 'calibrate' mean?",
        choices: [
          'To paint a new coat on equipment',
          'To adjust an instrument so its readings are accurate',
          'To permanently disable a device',
          'To transport equipment to a new location'
        ],
        answer: 1,
        explanation: 'Calibrating adjusts an instrument so its measurements are accurate and reliable.',
        choiceFeedback: [
          "This treats calibrating as surface upkeep. The word is about the numbers a sensor reports, not about how the equipment looks.",
          null,
          "If they disabled the sensor before every flight, it could not take a single reading. Calibrating puts an instrument into use, not out of it.",
          "Nothing in this sentence moves anywhere. The word names an adjustment made to the instrument itself so its readings come out accurate."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt:
          "The bridge was built with a safety tolerance that allows for small changes in temperature and load. What does 'tolerance' mean here?",
        choices: [
          'The acceptable range of variation a design can safely handle',
          'The total weight a bridge can hold',
          'The number of years a bridge will last',
          'A type of building material'
        ],
        answer: 0,
        explanation: 'Engineering tolerance describes the acceptable range a design can vary within and still function safely.',
        choiceFeedback: [
          null,
          "That describes load capacity, a different number. Tolerance is how much conditions may vary while the design still holds, not the maximum weight it can carry.",
          "You read \"safely handle\" as lasting a long time. The sentence ties tolerance to temperature and load, which are conditions the bridge meets, not years on a calendar.",
          "\"Built with a safety tolerance\" makes it sound like a supply you order. Here the word names a designed-in range of variation, not a substance."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 'w7-sentence-structure',
    subject: 'reading',
    strand: 'language-arts',
    tier: 1,
    title: 'Sentence Structure: Simple, Compound, Complex',
    theme: 'Identifying sentence types and fragments',
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'Which sentence is a simple sentence (one independent clause)?',
        choices: [
          'The rocket launched.',
          'The rocket launched, and the crowd cheered.',
          'Because the weather cleared, the rocket launched.',
          'The rocket launched; the crowd cheered.'
        ],
        answer: 0,
        explanation: 'A simple sentence contains exactly one independent clause and nothing more.',
        choiceFeedback: [
          null,
          "Two independent clauses joined by \"and\" make this compound. Short is not the same as simple; simple means exactly one complete thought.",
          "\"Because the weather cleared\" cannot stand on its own, so this is a complex sentence: one dependent clause plus one independent clause.",
          "The semicolon does the same joining work \"and\" would do, linking two clauses that could each be a sentence. That still counts as compound."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt:
          'Which sentence is a compound sentence (two independent clauses joined by a conjunction or semicolon)?',
        choices: [
          'The engine ignited.',
          'The engine ignited, and the rocket began to rise.',
          'When the engine ignited, the rocket began to rise.',
          'The engine, which was new, ignited.'
        ],
        answer: 1,
        explanation: 'Two independent clauses ("the engine ignited" and "the rocket began to rise") are joined here with a comma and "and."',
        choiceFeedback: [
          "One independent clause with nothing joined to it is a simple sentence. Compound requires two complete thoughts standing side by side.",
          null,
          "\"When\" turns the first clause into a dependent one, so the two halves are not equal partners. That arrangement is called complex.",
          "\"Which was new\" only describes the engine; it is not a second complete thought. One clause is doing all the work in this sentence."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'Which sentence is a complex sentence (an independent clause plus a dependent clause)?',
        choices: [
          'The satellite launched and reached orbit.',
          'The satellite launched.',
          'Because the weather was clear, the satellite launched on schedule.',
          'The satellite launched; it reached orbit.'
        ],
        answer: 2,
        explanation: '"Because the weather was clear" is a dependent clause attached to the independent clause "the satellite launched on schedule."',
        choiceFeedback: [
          "\"And reached orbit\" has no subject of its own and shares the first one, so this is a single clause with two verbs rather than two clauses.",
          "This is one independent clause on its own. Nothing in it depends on anything else, which is exactly what a complex sentence needs.",
          null,
          "Both halves could stand alone as sentences, and a semicolon joins equals. A complex sentence needs one part that cannot survive by itself."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'Which of these is a sentence fragment, not a complete sentence?',
        choices: [
          'The crew boarded the shuttle.',
          'Because the countdown reached zero.',
          'The countdown reached zero, and the crew cheered.',
          'The shuttle lifted off.'
        ],
        answer: 1,
        explanation: '"Because the countdown reached zero" is a dependent clause with no independent clause attached — it can\'t stand alone.',
        choiceFeedback: [
          "Subject, verb, finished thought: this one stands on its own. A fragment is missing at least one of those pieces.",
          null,
          "The extra length can feel like a problem, but both halves are complete and properly joined. Length has nothing to do with being a fragment.",
          "Short, but finished. \"The shuttle\" does something and the thought closes, so nothing is left hanging."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 'w7-persuasive-techniques',
    subject: 'reading',
    strand: 'language-arts',
    tier: 1,
    title: 'Persuasive Techniques: Making the Case',
    theme: 'Recognizing ethos, pathos, and logos in persuasive writing and speech',
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt:
          "An advertisement says '9 out of 10 engineers recommend this calculator' to convince you it's the best choice. This is an example of:",
        choices: [
          'Appeal to authority or popularity',
          'A logical proof',
          'A personal story',
          'A statistical error'
        ],
        answer: 0,
        explanation: 'Citing a majority or expert opinion to persuade, without independent evidence of quality, is an appeal to authority/popularity.',
        choiceFeedback: [
          null,
          "It carries numbers, so it looks like evidence. But \"9 out of 10 recommend\" counts opinions and never tests how well the calculator actually works.",
          "A personal story would be one named person telling what happened to them. This is a crowd's verdict with no story behind it.",
          "Nothing here is miscalculated. The persuasion comes from whose opinion is being counted, not from a mistake in the arithmetic."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt:
          "A speaker says, 'Imagine your family losing their home because we didn't invest in climate research,' to persuade the audience emotionally. This is an example of:",
        choices: [
          'Logos (appeal to logic)',
          'Pathos (appeal to emotion)',
          'Ethos (appeal to credibility)',
          'A counterargument'
        ],
        answer: 1,
        explanation: 'This appeals to fear and empathy — an emotional appeal, or pathos.',
        choiceFeedback: [
          "The sentence offers no data and no chain of reasoning. It asks you to picture losing your home, and picturing a loss moves feelings rather than logic.",
          null,
          "Ethos leans on who the speaker is. No expertise or character is mentioned here; the whole pull is on what the audience fears.",
          "A counterargument answers the other side's point. This speaker is pressing their own case harder, not responding to anyone."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt:
          "A writer lists their engineering degree and 20 years of NASA experience before giving their opinion on a new rocket design. This is an example of:",
        choices: [
          'Pathos (appeal to emotion)',
          'Logos (appeal to logic)',
          'Ethos (appeal to credibility or authority)',
          'A false statistic'
        ],
        answer: 2,
        explanation: "Establishing credentials to build trust in the speaker's credibility is ethos.",
        choiceFeedback: [
          "A long resume can be impressive, but impressive is not the same as emotional. The appeal here is to trust in the person speaking.",
          "Credentials are facts about the writer, not evidence about the rocket. Logos would need data or reasoning about the design itself.",
          null,
          "No measurement is being reported, and nothing hints the credentials are made up. Naming your experience is a credibility move, not a numbers claim."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'Which sentence best demonstrates a logos (logical) appeal in a persuasive argument?',
        choices: [
          'Everyone knows electric cars are better.',
          "You'll feel guilty if you don't switch to electric cars.",
          'Studies show electric cars produce 50% fewer emissions over their lifetime than gas cars.',
          "Trust me, electric cars are the future."
        ],
        answer: 2,
        explanation: 'Citing specific data (a measurable emissions comparison) is a logical (logos) appeal.',
        choiceFeedback: [
          "\"Everyone knows\" points at popularity and skips the proof entirely. If you cannot ask \"how was that measured?\", it is not a logical appeal.",
          "This aims straight at how you would feel. Guilt is an emotional appeal even when the subject is a technical one.",
          null,
          "\"Trust me\" asks you to rely on the speaker's character, which is ethos, and it hands you no figure you could go check."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 'w7-public-speaking',
    subject: 'reading',
    strand: 'language-arts',
    tier: 1,
    title: 'Public Speaking & Presentation Basics',
    theme: 'Practical strategies for confident, clear presentations',
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'If you forget what to say next during a presentation, what is the best strategy?',
        choices: [
          'Stop talking and walk away',
          'Pause, take a breath, and glance at your notes before continuing',
          'Speak faster to cover the mistake',
          'Apologize repeatedly to the audience'
        ],
        answer: 1,
        explanation: 'A brief, composed pause to check notes is far more effective and less disruptive than panicking or rushing.',
        choiceFeedback: [
          "Walking away ends the presentation instead of recovering it. A blank moment is a pause you can work through, not a reason to quit.",
          null,
          "Speeding up feels like covering the gap, but the audience hears rushing and the rest of your talk gets harder to follow.",
          "One quick apology is fine; repeating it keeps everyone's attention parked on the stumble instead of moving to your point."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: 'Why is making eye contact with your audience generally recommended during a presentation?',
        choices: [
          'It has no real effect on the audience',
          'It helps build a connection and shows confidence',
          'It is only useful in large auditoriums',
          'It is required by law for school presentations'
        ],
        answer: 1,
        explanation: 'Eye contact helps engage the audience and signals confidence and preparation.',
        choiceFeedback: [
          "Audiences track where a speaker is looking, and looking back at them is part of how they judge whether you know your material.",
          null,
          "This reverses it. The smaller the room, the more each person notices whether you look up. Room size does not switch the benefit off.",
          "This treats a delivery habit as a rule somebody enforces. Eye contact is advice about connecting with people, not a legal requirement."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'What is the main purpose of practicing a presentation out loud before delivering it?',
        choices: [
          'To memorize every word exactly',
          'To build familiarity with the content and improve timing and delivery',
          'To make the presentation longer',
          'To avoid needing any notes at all'
        ],
        answer: 1,
        explanation: "Practicing builds comfort with the material and helps with pacing — it's not about word-for-word memorization.",
        choiceFeedback: [
          "Memorizing word for word means one forgotten line can derail everything. Rehearsing is for knowing the material well enough to say it in your own words.",
          null,
          "Practice usually changes the length by helping you cut, not add. Length is a result you control, not a reason to rehearse.",
          "Notes are not a failure; even well-prepared speakers glance down. Practice makes you smoother with your notes, not forbidden from them."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt:
          "Which of these is the best way to handle a difficult question from the audience that you don't know the answer to?",
        choices: [
          'Make up an answer confidently',
          'Ignore the question and move on',
          "Acknowledge you don't know, and offer to find out and follow up",
          'Ask the audience member to leave'
        ],
        answer: 2,
        explanation: "Honestly acknowledging a gap and following up afterward is more credible than guessing or dismissing the question.",
        choiceFeedback: [
          "Confidence buys you a few seconds and costs you your credibility the moment someone checks. A guess delivered smoothly is still a guess.",
          "Skipping it looks like dodging, and the person is left still wondering. Promising to find out shows you took the question seriously.",
          null,
          "A hard question is not bad behavior. Treating it as a disruption punishes the audience for actually paying attention."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 'w7-prefixes-suffixes',
    subject: 'reading',
    strand: 'language-arts',
    tier: 1,
    title: 'Prefixes & Suffixes',
    theme: 'Using word parts to figure out unfamiliar words',
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: "The prefix 're-' generally means what?",
        choices: ['Again', 'Not', 'Before', 'Under'],
        answer: 0,
        explanation: "'Re-' generally means 'again,' as in 'rebuild' (build again) or 'rewrite' (write again).",
        choiceFeedback: [
          null,
          "That is the job of un-, non-, or in-, as in unsafe. \"Re-\" does not cancel a word, it runs the word again.",
          "\"Before\" belongs to pre-, as in preflight. Notice the pair: preheat means heat first, reheat means heat a second time.",
          "\"Under\" is sub-, as in submarine. \"Re-\" says nothing about position, only about doing something over."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: "The prefix 'un-' generally means what?",
        choices: ['Not or the opposite of', 'Again', 'Very', 'Before'],
        answer: 0,
        explanation: "'Un-' generally means 'not' or reverses meaning, as in 'unaware' (not aware) or 'unfold' (reverse of fold).",
        choiceFeedback: [
          null,
          "That one is re-. Set redo against undo and you can feel the split: redo means do it again, undo means reverse what was done.",
          "Prefixes that mean \"very\" look more like super- or ultra-. Unhappy is not extra happy; it is the opposite of happy.",
          "\"Before\" is pre-. An unpacked bag was not packed earlier, it has been emptied back out."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: "The suffix '-able' generally means what, as in 'dependable' or 'flexible'?",
        choices: ['Capable of or able to be', 'Never able to be', 'Related to time', 'Related to size'],
        answer: 0,
        explanation: "'-able' generally means 'capable of' or 'able to be,' as in 'dependable' (able to be depended on).",
        choiceFeedback: [
          null,
          "The negative comes from a prefix like un- or in-, as in unbreakable, rather than from -able itself. On its own, -able is positive.",
          "No time is involved. \"Dependable\" tells you what can be done to something, not when it happens.",
          "This suffix describes a capability, not a measurement. A flexible rod bends; being flexible says nothing about how big it is."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: "Knowing that 'mis-' means 'wrongly' and 'understand' means 'to comprehend,' what does 'misunderstand' most likely mean?",
        choices: ['To comprehend something wrongly', 'To comprehend something perfectly', 'To refuse to comprehend anything', 'To comprehend something again'],
        answer: 0,
        explanation: "Combining 'mis-' (wrongly) with 'understand' gives 'to comprehend something wrongly.'",
        choiceFeedback: [
          null,
          "This drops the prefix and keeps only the base word. \"Mis-\" is there precisely to change the meaning, and it means wrongly.",
          "Refusing would be a choice. \"Mis-\" says nothing about willingness, only that the understanding came out wrong.",
          "\"Again\" is re-, as in reread. Swap the prefix and you swap the meaning: misread is not the same as reread."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 'w7-sentence-structure-2',
    subject: 'reading',
    strand: 'language-arts',
    tier: 1,
    title: 'Sentence Structure II: Combining Sentences',
    theme: 'Combining short, choppy sentences into stronger compound and complex sentences',
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt:
          'Which option best combines these two sentences? "The rocket launched. It reached orbit within minutes."',
        choices: [
          'The rocket launched, and it reached orbit within minutes.',
          'The rocket launched it reached orbit within minutes.',
          'The rocket launched. It. Reached orbit within minutes.',
          'The rocket, launched it reached, orbit within minutes.'
        ],
        answer: 0,
        explanation: 'Joining two related, independent sentences with a comma and "and" creates a correctly punctuated compound sentence.',
        choiceFeedback: [
          null,
          "This glues two complete thoughts together with nothing between them, and for a second \"launched it\" reads as though the rocket launched something.",
          "This chops the sentences into more pieces instead of fewer. Combining means joining ideas together, not adding extra periods.",
          "These commas land inside phrases that belong together, cutting \"launched\" off from its subject and \"reached\" off from \"orbit.\""
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt:
          'Which option best combines these two sentences? "The test failed. The team learned valuable lessons."',
        choices: [
          'Although the test failed, the team learned valuable lessons.',
          'The test failed the team learned valuable lessons.',
          'The test, failed the team, learned valuable lessons.',
          'The test failed. Learned valuable lessons the team.'
        ],
        answer: 0,
        explanation: '"Although" turns the first idea into a subordinate clause, correctly combining the sentences into one complex sentence.',
        choiceFeedback: [
          null,
          "With no joining word the two thoughts run straight together, and for a moment it reads as though the test failed the team.",
          "Commas by themselves cannot combine sentences. These ones split a subject from its verb instead of showing how the two ideas relate.",
          "The second part scrambles the word order and still sits as its own separate sentence, so nothing actually got combined."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt:
          'Which option best combines these two sentences? "The engineer checked the wiring. She then approved the panel."',
        choices: [
          'After checking the wiring, the engineer approved the panel.',
          'The engineer checked the wiring she then approved, the panel.',
          'The engineer checked. The wiring, she then, approved the panel.',
          'The engineer, checked the wiring she then approved the panel.'
        ],
        answer: 0,
        explanation: 'Turning the first sentence into an introductory phrase ("After checking the wiring") smoothly combines the two ideas.',
        choiceFeedback: [
          null,
          "Two complete thoughts sit side by side with no connector, and the comma drops in between \"approved\" and the thing she approved.",
          "The period cuts \"checked\" off from \"the wiring,\" so the sentence loses what she checked and picks up a fragment in the middle.",
          "The comma after \"engineer\" separates the subject from its verb, and the two ideas are still fused with nothing joining them."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'Why is combining short, choppy sentences into compound or complex sentences generally good writing practice?',
        choices: [
          'It creates smoother, more sophisticated writing and shows how ideas relate to each other',
          'It always makes writing more confusing',
          'It is never recommended by writing teachers',
          'It removes all meaning from the original sentences'
        ],
        answer: 0,
        explanation: 'Combining related sentences creates smoother writing and shows the relationship between ideas, rather than a string of disconnected short sentences.',
        choiceFeedback: [
          null,
          "Cramming too much into one sentence can confuse a reader, which is a reason to combine carefully rather than a reason it always fails. \"Always\" gives it away.",
          "This is the lesson stated backwards. An absolute word like \"never\" is worth doubting before you pick the answer.",
          "Combining keeps both ideas and adds a word showing how they connect. Nothing gets lost; the relationship is what you gain."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 'w7-grammar-punctuation',
    subject: 'reading',
    strand: 'language-arts',
    tier: 1,
    title: 'Grammar III: Punctuation Rules',
    theme: 'Commas, apostrophes, semicolons, and quotation marks',
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'Which sentence uses a comma correctly to separate items in a list?',
        choices: [
          'The kit includes screws, bolts, and washers.',
          'The kit includes, screws bolts, and washers.',
          'The kit includes screws bolts and, washers.',
          'The kit, includes screws, bolts and washers.'
        ],
        answer: 0,
        explanation: 'Commas separate each item in a list, including before "and" in the Oxford comma style used here.',
        choiceFeedback: [
          null,
          "The first comma splits the verb from its own list, and \"screws bolts\" runs two separate items together with nothing between them.",
          "The comma lands after \"and\" instead of before it, and the first two items still need separating: screws, bolts, and washers.",
          "A comma after \"kit\" cuts the subject off from \"includes.\" The list itself also skips the comma before \"and\" that this lesson uses."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: "Which sentence correctly uses an apostrophe to show possession?",
        choices: [
          "The rocket's fuel tank was inspected.",
          'The rockets fuel tank was inspected.',
          "The rocket'ss fuel tank was inspected.",
          "The rockets' fuel tank was inspected."
        ],
        answer: 0,
        explanation: "For a single rocket, the possessive is formed with 's: \"the rocket's fuel tank.\"",
        choiceFeedback: [
          null,
          "With no apostrophe, \"rockets\" is simply a count of how many. Ownership only shows up once you add the apostrophe and s: the rocket's fuel tank.",
          "Possession takes one apostrophe followed by one s. The extra s is not a stronger version of the rule, just a misspelling.",
          "An apostrophe after the s means several rockets share one tank. Nothing in the sentence says there is more than a single rocket."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'Which sentence correctly uses a semicolon to join two related independent clauses?',
        choices: [
          'The test succeeded; the team celebrated.',
          'The test succeeded, the team celebrated.',
          'The test succeeded; and the team celebrated.',
          'The test; succeeded the team celebrated.'
        ],
        answer: 0,
        explanation: 'A semicolon can join two related independent clauses without needing a conjunction like "and."',
        choiceFeedback: [
          null,
          "Two complete sentences joined by only a comma is a comma splice. A comma is too weak for that seam; a semicolon is strong enough to hold it.",
          "You have doubled the joiners. Use a semicolon by itself, or a comma plus 'and' as in 'succeeded, and the team celebrated' — but not both at once.",
          "The semicolon landed inside a clause, splitting the subject from its verb. It only goes at the seam between two complete sentences, never in the middle of one."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'Which sentence uses quotation marks correctly?',
        choices: [
          'The engineer said, "The design is ready."',
          'The engineer said, The design is ready.',
          'The engineer said "The design is ready".',
          '"The engineer said, The design is ready."'
        ],
        answer: 0,
        explanation: 'Quotation marks surround the exact words spoken, with the closing punctuation inside the quotation marks.',
        choiceFeedback: [
          null,
          "The comma sets up a quotation, but the quoted words never get any marks around them. Readers need marks around 'The design is ready.' to know those are his exact words.",
          "You put the period outside the quotation marks, and there is no comma before the quote begins. American style tucks that final period inside the closing marks.",
          "Quotation marks wrap only the spoken words, not the tag that tells who spoke. 'The engineer said' is your narration, so it stays outside the marks."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 'w7-grammar-verb-tenses',
    subject: 'reading',
    strand: 'language-arts',
    tier: 1,
    title: 'Grammar IV: Verb Tenses',
    theme: 'Past, present, future, and keeping tense consistent',
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'Which sentence is in the past tense?',
        choices: [
          'The rover collected samples yesterday.',
          'The rover collects samples every day.',
          'The rover will collect samples tomorrow.',
          'The rover is collecting samples now.'
        ],
        answer: 0,
        explanation: '"Collected" shows an action that already happened, indicating the past tense.',
        choiceFeedback: [
          null,
          "'Collects' with 'every day' is present tense — a habit happening now. Past tense would be 'collected', with the -ed ending marking it as finished.",
          "'Will collect' points forward, not back. The word 'tomorrow' is your clue that this action has not happened yet.",
          "'Is collecting' describes something in progress at this moment. The -ing form paired with 'is' keeps the action in the present."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: 'Which sentence is in the future tense?',
        choices: [
          'The satellite will launch next month.',
          'The satellite launched last month.',
          'The satellite launches every month.',
          'The satellite is launching now.'
        ],
        answer: 0,
        explanation: '"Will launch" indicates an action that has not yet happened — the future tense.',
        choiceFeedback: [
          null,
          "'Launched' plus 'last month' is finished business. Future tense needs a helper word in front of the plain verb: will launch.",
          "A repeating schedule still counts as present tense. 'Launches every month' covers future launches in meaning, but the verb form itself is present.",
          "The word 'now' pins this to the present moment. An -ing verb can point ahead in other sentences, but not with 'now' attached to it."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'Which sentence correctly uses present perfect tense (an action that started in the past and connects to the present)?',
        choices: [
          'The team has completed three successful tests.',
          'The team complete three successful tests.',
          'The team completing three successful tests.',
          'The team will completed three successful tests.'
        ],
        answer: 0,
        explanation: '"Has completed" is the present perfect form, correctly built from "has" plus a past participle.',
        choiceFeedback: [
          null,
          "There is no helping verb here at all, so no perfect tense is being formed — and 'the team' takes 'completes'. Present perfect needs 'has' plus a past participle.",
          "An -ing verb cannot run a sentence by itself; it needs a helper. Even repaired to 'is completing', that would be progressive, not present perfect.",
          "'Will' always pairs with the plain form: will complete. Putting a past-tense verb after 'will' jams two tenses into one slot."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'Which sentence has a verb tense inconsistency (mixing tenses incorrectly)?',
        choices: [
          'She opened the hatch and checks the seal.',
          'She opened the hatch and checked the seal.',
          'She opens the hatch and checks the seal.',
          'She will open the hatch and will check the seal.'
        ],
        answer: 0,
        explanation: 'This sentence mixes past ("opened") with present ("checks") within the same action sequence, which is inconsistent.',
        choiceFeedback: [
          null,
          "Both verbs are past tense, so this sequence holds together. Nothing here shifts the time on your reader.",
          "Both verbs sit in the present. Present tense can feel unusual for telling what happened, but consistent is consistent — this one is fine.",
          "Repeating 'will' twice may sound clunky, but clunky is not the same as inconsistent. Both actions are future, so the tenses match."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 'w7-sentence-structure-3',
    subject: 'reading',
    strand: 'language-arts',
    tier: 1,
    title: 'Sentence Structure III: Run-ons & Fragments',
    theme: 'Identifying and fixing common sentence errors',
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'Which of these is a run-on sentence?',
        choices: [
          'The engine failed the team quickly diagnosed the problem.',
          'The engine failed, and the team quickly diagnosed the problem.',
          'The engine failed. The team quickly diagnosed the problem.',
          'Because the engine failed, the team diagnosed the problem.'
        ],
        answer: 0,
        explanation: 'This joins two complete sentences with no punctuation or conjunction, making it a run-on.',
        choiceFeedback: [
          null,
          "This one has a comma and the conjunction 'and' doing the joining, which is exactly the repair a run-on needs. Nothing is fused here.",
          "A period is the cleanest fix of all. Two complete sentences standing on their own cannot be a run-on.",
          "'Because' turns the first part into a dependent clause, so only one independent clause is left. That makes it a complex sentence, not a run-on."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: 'Which of these is a sentence fragment (an incomplete sentence)?',
        choices: [
          'Running out of fuel during the final approach.',
          'The plane ran out of fuel.',
          'Running out of fuel, the plane descended quickly.',
          'The plane, running out of fuel, descended quickly.'
        ],
        answer: 0,
        explanation: 'This phrase has no main subject and verb completing a full thought — it is a fragment.',
        choiceFeedback: [
          null,
          "Subject 'the plane', verb 'ran', complete thought. Being short is not the same as being incomplete.",
          "The -ing phrase up front is only an opener; 'the plane descended quickly' finishes the thought. Once a main subject and verb arrive, the fragment is gone.",
          "The commas tuck extra information into the middle, but 'the plane descended quickly' still stands on its own. An interrupter does not break a sentence."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'How would you best fix this run-on: "The rocket launched the crowd cheered"?',
        choices: [
          'The rocket launched, and the crowd cheered.',
          'The rocket launched the crowd, cheered.',
          'The rocket, launched the crowd cheered.',
          'The rocket launched. The, crowd cheered.'
        ],
        answer: 0,
        explanation: 'Adding a comma and conjunction ("and") correctly joins the two independent clauses.',
        choiceFeedback: [
          null,
          "Moving the comma there makes 'the crowd' the thing being launched, which changes the meaning entirely. Commas mark pauses; they cannot join two fused sentences alone.",
          "This comma splits the subject from its verb, and the two sentences are still fused behind it. The joiner belongs at the seam, not after 'rocket'.",
          "Splitting into two sentences was the right instinct, but the stray comma in 'The, crowd' cuts between an article and its noun. Delete it and this works."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'How would you best fix this fragment: "Because the storm delayed the launch."?',
        choices: [
          'Because the storm delayed the launch, the team rescheduled.',
          'Because, the storm delayed the launch.',
          'The storm because delayed the launch.',
          'Because the storm, delayed the launch.'
        ],
        answer: 0,
        explanation: 'Adding a main clause ("the team rescheduled") completes the thought the "because" clause started.',
        choiceFeedback: [
          null,
          "A comma after 'because' does not supply the missing main clause; it only adds a pause where none belongs. You still have to say what happened as a result.",
          "Sliding 'because' between the subject and its verb leaves it connecting nothing. A because-clause has to attach to a second idea, like 'the team rescheduled'.",
          "That comma cuts 'the storm' off from its verb 'delayed', so now nothing has a subject. The fragment is still a fragment, just harder to read."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 'w7-persuasive-ethos-pathos-logos',
    subject: 'reading',
    strand: 'language-arts',
    tier: 1,
    title: 'Persuasive Techniques II: Ethos, Pathos & Logos',
    theme: 'The three classical modes of persuasion',
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: "An argument that appeals to the audience's emotions is using which persuasive technique?",
        choices: ['Pathos', 'Ethos', 'Logos', 'Kairos'],
        answer: 0,
        explanation: 'Pathos is the persuasive appeal to emotion.',
        choiceFeedback: [
          null,
          "Ethos is the credibility appeal — trust me, I have the training for this. Emotion is a different lever entirely.",
          "Logos is the appeal through reasoning and evidence: data, numbers, proof. You can hear 'logic' hiding inside the word.",
          "Kairos is about timing — saying the right thing at the right moment. It is a real term, just not the one for feelings."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: "An argument that establishes the speaker's credibility or trustworthiness is using which technique?",
        choices: ['Ethos', 'Pathos', 'Logos', 'Kairos'],
        answer: 0,
        explanation: 'Ethos is the persuasive appeal based on the credibility of the speaker.',
        choiceFeedback: [
          null,
          "Pathos aims at how the audience feels, not at why they should trust the speaker. Credibility is about the person doing the talking.",
          "Logos rests on the strength of the evidence itself, no matter who presents it. Ethos rests on who is presenting it.",
          "Kairos concerns the moment an argument is made. Being timely and being trusted are two different advantages."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'An argument that uses logic, facts, and evidence is using which technique?',
        choices: ['Logos', 'Pathos', 'Ethos', 'Kairos'],
        answer: 0,
        explanation: 'Logos is the persuasive appeal based on logic and evidence.',
        choiceFeedback: [
          null,
          "Facts and evidence work on the reader's thinking, not on their feelings. Pathos is the appeal that goes for the heart.",
          "Ethos is about who is speaking and why they should be believed. Here the proof sits in the evidence, not in the speaker's background.",
          "Kairos is about choosing the right moment to speak. Logic and data hold up whenever they get presented."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: '"As a certified aerospace engineer with 20 years of experience, I can confirm this design is safe." Which persuasive technique is this primarily using?',
        choices: ['Ethos', 'Pathos', 'Logos', 'None of these'],
        answer: 0,
        explanation: 'Citing credentials and experience to establish credibility is an ethos appeal.',
        choiceFeedback: [
          null,
          "Nothing here reaches for the audience's emotions — no fear, no hope, no sympathy. The speaker is offering credentials, which is an appeal to trust.",
          "The speaker never presents test data or reasoning; the claim rests entirely on his experience. Saying you are qualified is not the same as showing the evidence.",
          "One of the three appeals is clearly at work here. 'Certified' and '20 years of experience' are exactly how a speaker builds authority."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 'w7-persuasive-logical-fallacies',
    subject: 'reading',
    strand: 'language-arts',
    tier: 1,
    title: 'Persuasive Techniques III: Logical Fallacies',
    theme: 'Recognizing flawed argument patterns',
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: "An argument that attacks a person's character rather than their actual argument is called a(n) ___.",
        choices: ['Ad hominem attack', 'Slippery slope', 'False dilemma', 'Straw man'],
        answer: 0,
        explanation: 'An ad hominem attack targets the person rather than addressing their argument.',
        choiceFeedback: [
          null,
          "A slippery slope warns that one step will lead to disaster after disaster. It attacks a chain of imagined outcomes, not a person.",
          "A false dilemma narrows the options down to two. Insulting the speaker does not limit anyone's choices.",
          "A straw man twists what the person said and then knocks down the twisted version. Here the argument is skipped entirely and the character is targeted."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: 'An argument that presents only two options when more actually exist is called a ___.',
        choices: ['False dilemma', 'Ad hominem', 'Bandwagon', 'Circular reasoning'],
        answer: 0,
        explanation: 'A false dilemma wrongly limits choices to only two options.',
        choiceFeedback: [
          null,
          "This one goes after the person making the argument. The fallacy in question is about how many options are on the table, not about anyone's character.",
          "Bandwagon says you should agree because everyone else already does. Popularity is a different flaw from pretending only two paths exist.",
          "Circular reasoning uses its own conclusion as its proof. That is a problem with how the argument loops, not with how many choices it offers."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'An argument that claims one small step will inevitably lead to extreme consequences, without solid evidence, is called a ___.',
        choices: ['Slippery slope', 'False dilemma', 'Ad hominem', 'Straw man'],
        answer: 0,
        explanation: "A slippery slope argument assumes a chain of extreme consequences without solid evidence they'll occur.",
        choiceFeedback: [
          null,
          "A false dilemma limits you to two choices right now. This pattern stretches forward in time instead, predicting worse and worse results.",
          "No one's character is under attack in this pattern. The flaw here is the unproven chain of consequences.",
          "A straw man misrepresents what your opponent actually believes. This one takes a real position and exaggerates where it supposedly leads."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: "An argument that misrepresents someone's position to make it easier to attack is called a ___.",
        choices: ['Straw man', 'Slippery slope', 'Bandwagon', 'Ad hominem'],
        answer: 0,
        explanation: "A straw man argument distorts someone's actual position into a weaker version that's easier to knock down.",
        choiceFeedback: [
          null,
          "A slippery slope exaggerates the consequences of a position. This fallacy exaggerates the position itself, then argues against that distorted version.",
          "Bandwagon urges you to join the crowd. Misrepresenting an opponent has nothing to do with what is popular.",
          "That fallacy attacks the arguer; this one attacks a fake version of the argument. The target is an idea, just not the idea they actually held."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 'w7-public-speaking-2',
    subject: 'reading',
    strand: 'language-arts',
    tier: 1,
    title: 'Public Speaking II: Body Language & Delivery',
    theme: 'Nonverbal communication while presenting',
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'What does confident posture (standing straight, shoulders back) generally communicate to an audience?',
        choices: ['Confidence and preparedness', 'Nervousness', 'Boredom', 'Disrespect'],
        answer: 0,
        explanation: 'Confident, upright posture generally signals preparedness to an audience.',
        choiceFeedback: [
          null,
          "Nervousness usually shows in the opposite signals — hunched shoulders, shifting feet, eyes on the floor. Standing tall is the posture that steadies a room.",
          "Boredom tends to look like slouching or leaning on the podium. Visible effort in your posture reads as effort in your preparation.",
          "Good posture is not aggressive, it is attentive. Audiences read an upright stance as respect for them and for the material."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: 'Why is varying your vocal tone and pace during a speech generally recommended?',
        choices: [
          'It keeps the audience engaged and emphasizes important points',
          'It confuses the audience',
          'It has no effect on engagement',
          'It is only useful for very long speeches'
        ],
        answer: 0,
        explanation: 'Varying tone and pace helps hold attention and highlight the most important points.',
        choiceFeedback: [
          null,
          "A steady monotone is what loses listeners. Changing your pace signals which parts matter most, so it guides an audience rather than confusing them.",
          "Delivery carries real information of its own. The same words spoken flat or spoken with emphasis land very differently on a listener.",
          "Even a two-minute talk benefits from this. Emphasis is about marking your key points, not about filling up time."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'What does crossing your arms while speaking often unintentionally communicate to an audience?',
        choices: ['Defensiveness or closed-off body language', 'Extreme confidence', 'Excitement', 'Nothing at all'],
        answer: 0,
        explanation: 'Crossed arms are often read as defensive or closed-off, even if unintended.',
        choiceFeedback: [
          null,
          "Crossed arms may feel comfortable to you, but the shape reads as a barrier between you and the room. Confidence usually shows in open hands and a relaxed stance.",
          "Excitement tends to show through movement and open gestures. Folded arms hold everything in, which sends the opposite signal.",
          "Audiences read body language whether or not you meant to send a message. Silent signals still get received."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'Why do speakers often practice hand gestures as part of their delivery?',
        choices: [
          'Natural, purposeful gestures can emphasize points and appear more engaging',
          'Gestures should always be avoided completely',
          'Gestures replace the need for words',
          'Gestures are only appropriate in written speeches'
        ],
        answer: 0,
        explanation: 'Purposeful gestures can emphasize key points and make a speaker appear more engaging.',
        choiceFeedback: [
          null,
          "This turns a caution into an absolute rule. Fidgety gestures do distract, but purposeful ones help — the advice is to control them, not erase them.",
          "Gestures support what you say; they cannot carry the content alone. Try describing a wing design with only your hands and you will feel the gap.",
          "Gestures belong to delivery, which is the spoken part of a speech. A written speech has no hands involved until someone stands up to read it."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 'w7-commonly-confused-words',
    subject: 'reading',
    strand: 'language-arts',
    tier: 1,
    title: 'Commonly Confused Words',
    theme: "Affect/effect, its/it's, there/their/they're, your/you're",
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'Which sentence uses "affect" and "effect" correctly?',
        choices: [
          'The delay will affect the schedule, and the effect will be costly.',
          'The delay will effect the schedule, and the affect will be costly.',
          'The delay will affect the schedule, and the affect will be costly.',
          'The delay will effect the schedule, and the effect will be costly.'
        ],
        answer: 0,
        explanation: '"Affect" is usually the verb (to influence); "effect" is usually the noun (the result).',
        choiceFeedback: [
          null,
          "Both words are swapped. 'Effect' as a verb means to bring something into being, and 'affect' as a noun is a rare psychology term — neither one fits here.",
          "The first half is right, but the second slot needs a noun for the result: 'the effect will be costly'. A for action, E for end result.",
          "The second half is fine, but the first verb should be 'affect' — the delay influences the schedule, it does not bring the schedule into existence."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: 'Which sentence correctly uses "its" and "it\'s"?',
        choices: [
          "It's clear the rocket lost its fuel.",
          "Its clear the rocket lost it's fuel.",
          "It's clear the rocket lost it's fuel.",
          "Its clear the rocket lost its fuel."
        ],
        answer: 0,
        explanation: '"It\'s" is the contraction for "it is"; "its" (no apostrophe) shows possession.',
        choiceFeedback: [
          null,
          "Both are backwards. Test by expanding them: 'It is clear' works, so that slot takes the apostrophe, while 'lost it is fuel' clearly does not.",
          "The opening is right, but the second one shows ownership — the rocket's own fuel — so it drops the apostrophe: lost its fuel.",
          "The second one is right, but the sentence opens with 'it is'. That contraction always keeps its apostrophe: It's clear."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'Which sentence correctly uses "there," "their," and "they\'re"?',
        choices: [
          "They're going to check their equipment over there.",
          "There going to check they're equipment over their.",
          "Their going to check there equipment over they're.",
          "They're going to check there equipment over their."
        ],
        answer: 0,
        explanation: '"They\'re" = they are; "their" shows possession; "there" refers to a place.',
        choiceFeedback: [
          null,
          "All three are shuffled. Try the long form as a test: 'they are equipment' falls apart immediately, which tells you that slot needs the possessive.",
          "A sentence does not open with 'their' unless a noun follows to be owned, and 'their going' owns nothing. The last slot names a place, so it needs 'there'.",
          "The opening is right, but the last two are traded. The equipment belongs to them (their), and the place they are headed is over there."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'Which sentence correctly uses "your" and "you\'re"?',
        choices: [
          "You're going to need your safety gear.",
          "Your going to need you're safety gear.",
          "You're going to need you're safety gear.",
          "Your going to need your safety gear."
        ],
        answer: 0,
        explanation: '"You\'re" = you are; "your" shows possession.',
        choiceFeedback: [
          null,
          "Both are flipped. 'Your going' gives you nothing to own, and the second slot unpacks to 'you are safety gear', which is not what anyone means.",
          "The first one is right, but the second expands to 'you are safety gear'. The gear belongs to you, so use the possessive: your safety gear.",
          "The second one is fine, but the sentence opens with 'you are'. That contraction needs its apostrophe: You're going."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 'w7-grammar-active-passive',
    subject: 'reading',
    strand: 'language-arts',
    tier: 1,
    title: 'Grammar V: Active vs. Passive Voice',
    theme: 'Recognizing and choosing between active and passive voice',
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'Which sentence is written in active voice?',
        choices: [
          'The engineer tested the component.',
          'The component was tested by the engineer.',
          'The component was tested.',
          'Testing was done on the component.'
        ],
        answer: 0,
        explanation: 'In active voice, the subject (the engineer) directly performs the action.',
        choiceFeedback: [
          null,
          "The doer is here, but tacked onto the end with 'by'. That 'was ... by' pattern is the signature of passive voice.",
          "This version hides the doer completely. 'Was tested' leaves you asking by whom, which is a reliable sign of passive voice.",
          "Turning the action into the noun 'testing' buries the verb and still leaves nobody doing anything. Active voice needs a subject that acts."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: 'Which sentence is written in passive voice?',
        choices: [
          'The rocket was launched by the team.',
          'The team launched the rocket.',
          'The team will launch the rocket.',
          'The team is launching the rocket.'
        ],
        answer: 0,
        explanation: 'In passive voice, the subject (the rocket) receives the action instead of performing it.',
        choiceFeedback: [
          null,
          "The team is the subject and the team does the launching, so this is active voice. Plain doer-action-thing order is the active pattern.",
          "Future tense is not the same thing as passive voice. The team still performs the action here, so it stays active.",
          "The helper 'is' can look like a passive marker, but the team is still doing the work. Passive requires the subject to receive the action."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'Why do writing guides often recommend active voice over passive voice in most technical writing?',
        choices: [
          'Active voice is usually clearer and more direct about who is performing the action',
          'Passive voice is always grammatically incorrect',
          'Active voice is required in all writing with no exceptions',
          'Passive voice makes sentences shorter'
        ],
        answer: 0,
        explanation: 'Active voice is usually clearer since it directly names who performs the action.',
        choiceFeedback: [
          null,
          "This turns a style preference into a grammar rule. Passive voice is perfectly correct, and science write-ups use it on purpose when the doer does not matter.",
          "No writing rule holds with zero exceptions. 'Usually clearer' is the honest version of this advice, and usually leaves room for judgment.",
          "It generally runs the other way — passive adds helping verbs and a 'by' phrase. Compare 'the engineer tested it' with 'it was tested by the engineer'."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'Rewrite in active voice: "The report was written by the team." Which of these is the correct active-voice version?',
        choices: [
          'The team wrote the report.',
          'The team was writing the report.',
          'The report wrote the team.',
          'Writing the report was the team.'
        ],
        answer: 0,
        explanation: 'Active voice puts the doer (the team) as the subject performing the action directly.',
        choiceFeedback: [
          null,
          "The team is the subject and it acts, so this is active — but you changed the timing to something ongoing. A rewrite should keep the original meaning: wrote.",
          "Swapping the two nouns without touching the verb reverses who did what. Reports do not write teams; move the doer up front and keep the action pointed the same way.",
          "This makes the action the subject and leaves the sentence saying the team equals the writing. Active voice starts with the doer: The team wrote."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 'w7-parallel-structure',
    subject: 'reading',
    strand: 'language-arts',
    tier: 1,
    title: 'Sentence Structure IV: Parallel Structure',
    theme: 'Keeping matching grammatical forms in a list or series',
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: 'Which sentence uses correct parallel structure?',
        choices: [
          'She likes reading, writing, and coding.',
          'She likes reading, writing, and to code.',
          'She likes to read, writing, and coding.',
          'She likes reading, to write, and coding.'
        ],
        answer: 0,
        explanation: 'All three items match the same "-ing" form, keeping the structure parallel.',
        choiceFeedback: [
          null,
          "The first two items are -ing forms and the third jumps to an infinitive. Change 'to code' to 'coding' and the list lines up.",
          "The list opens with an infinitive and then switches forms partway through. Whichever form you start with, every item after it has to match.",
          "The middle item breaks the pattern the other two set. Reading it aloud helps: reading, to write, coding — you can hear the stumble in slot two."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: 'Which sentence uses correct parallel structure?',
        choices: [
          'The engineer designed, tested, and refined the part.',
          'The engineer designed, testing, and refined the part.',
          'The engineer designed, tested, and to refine the part.',
          'The engineer designing, tested, and refined the part.'
        ],
        answer: 0,
        explanation: 'All three verbs ("designed, tested, refined") match the same past-tense form.',
        choiceFeedback: [
          null,
          "The middle verb slips into the -ing form while the ones around it stay past tense. Make it 'tested' and all three share one shape.",
          "The list runs on past-tense verbs and then ends with an infinitive. That last item should be 'refined' to finish the pattern.",
          "The first item sets the pattern for everything after it, and here it is out of step with the two that follow. Start with 'designed'."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: 'Which sentence has a parallel structure error?',
        choices: [
          "The team wanted to launch on time, staying under budget, and to meet safety standards.",
          'The team wanted to launch on time, stay under budget, and meet safety standards.',
          'The team wanted to launch on time, to stay under budget, and to meet safety standards.',
          "Launching on time, staying under budget, and meeting safety standards were the team's goals."
        ],
        answer: 0,
        explanation: 'This mixes "to launch," "staying" (-ing form), and "to meet," breaking the parallel pattern.',
        choiceFeedback: [
          null,
          "The 'to' at the front carries over to all three items, so 'stay' and 'meet' are still infinitives. This one is parallel already.",
          "Repeating 'to' before every item is a fine choice — it just makes the parallel pattern more visible. Matching forms all the way through means no error.",
          "All three items are -ing forms in a matching series. The sentence is rearranged, but the pattern holds together."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: 'Which sentence uses correct parallel structure?',
        choices: [
          'The rover can drive, dig, and photograph its surroundings.',
          'The rover can drive, digging, and photograph its surroundings.',
          'The rover can driving, dig, and photograph its surroundings.',
          'The rover can drive, dig, and to photograph its surroundings.'
        ],
        answer: 0,
        explanation: 'All three verbs ("drive, dig, photograph") match the same base form after "can."',
        choiceFeedback: [
          null,
          "After 'can', every verb stays in its plain form. This middle one has picked up an ending the other two do not have.",
          "'The rover can driving' is the giveaway — a helper like 'can' is always followed by the bare verb, so it should be 'drive'.",
          "That 'to' is left over from a different pattern. 'Can' already sets up all three verbs, so the last item just needs 'photograph'."
        ],
        xp: 10
      }
    ]
  },
  {
    id: 'w7-homophones',
    subject: 'reading',
    strand: 'language-arts',
    tier: 1,
    title: 'Vocabulary: Homophones',
    theme: 'Words that sound alike but have different spellings and meanings',
    questions: [
      {
        id: 'q1',
        type: 'choice',
        prompt: "Which word means 'to hear,' as opposed to 'here' (a location)?",
        choices: ['Hear', 'Here', 'Both are spelled the same', 'Neither is correct'],
        answer: 0,
        explanation: '"Hear" relates to hearing sounds; "here" refers to a location.',
        choiceFeedback: [
          null,
          "This is the location word, the one hiding inside 'there'. The word for taking in sound has an ear right in it.",
          "They sound the same but the letters differ, and that difference is what makes them homophones in the first place.",
          "One of them does mean to take in sound. Homophone questions always have a right pick — the job is matching the spelling to the meaning."
        ],
        xp: 10
      },
      {
        id: 'q2',
        type: 'choice',
        prompt: "Which word correctly completes: 'Turn ___ at the next intersection'?",
        choices: ['Right', 'Write', 'Rite', 'Wright'],
        answer: 0,
        explanation: '"Right" here means a direction; "write" means to compose text.',
        choiceFeedback: [
          null,
          "'Write' is the word for putting words on paper. That silent w is your clue it belongs with writing, not with directions.",
          "A rite is a ceremony or ritual, like a rite of passage. It never names a direction.",
          "A wright is a maker or builder — a playwright, a shipwright, the Wright brothers. It is a job word, not a turn."
        ],
        xp: 10
      },
      {
        id: 'q3',
        type: 'choice',
        prompt: "Which word correctly completes: 'Please ___ your name here'?",
        choices: ['Write', 'Right', 'Rite', 'Wright'],
        answer: 0,
        explanation: '"Write" means to compose or record text.',
        choiceFeedback: [
          null,
          "This word covers directions and correctness, but not the act of putting your name on a page. Signing calls for the w spelling.",
          "'Rite' means a formal ritual or ceremony. Signing a form is an everyday act, and the word for it is 'write'.",
          "'Wright' names someone who builds something, as in shipwright. You are not constructing your name, you are writing it."
        ],
        xp: 10
      },
      {
        id: 'q4',
        type: 'choice',
        prompt: "Which word correctly completes: 'Please check the ___ forecast before the flight'?",
        choices: ['Weather', 'Whether', 'Wether', 'Whither'],
        answer: 0,
        explanation: '"Weather" refers to atmospheric conditions; "whether" introduces a choice or possibility.',
        choiceFeedback: [
          null,
          "'Whether' sets up a choice — whether to fly or wait. A forecast is about rain and wind, so it takes 'weather'.",
          "This spelling is a livestock term, not anything to do with the sky. Dropping that first a changes the word completely.",
          "'Whither' is an old-fashioned word meaning 'to where'. It sounds close, but it points at a destination, not at conditions."
        ],
        xp: 10
      }
    ]
  }
];
