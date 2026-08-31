/**
 * Book report and presentation formats, with required sections,
 * student checklists, and grading rubrics.
 *
 * Straight from PROJECT_PLAN.md Part 9's own two lists — the Book Report
 * Center names 16 formats, the Presentation Center names 11 — plus the
 * spec's requirement that every report carry a "Rubric, Checklist, Due
 * date, Instructions, Required sections, Grading guide, Portfolio
 * storage, Reflection."
 *
 * TWO PROBLEMS THIS SOLVES, both real:
 *
 *   1. Five book reports and five presentations are scheduled this year,
 *      and every one of them said only "write a report." Same shape five
 *      times is how a book report becomes a chore.
 *   2. Grading was a judgment call every single time. A rubric doesn't
 *      grade the writing — a parent still does — but it turns twenty
 *      minutes of "is this a B?" into a two-minute pass, and keeps the
 *      standard steady from October to May. That matters for records.
 *
 * WHY RUBRIC CRITERIA ARE SHARED BY KIND, NOT PER FORMAT: a poster and a
 * podcast need genuinely different SECTIONS, but "is the evidence
 * there?" is the same question for both. Writing 27 near-identical
 * rubrics would produce 27 chances to drift, and no extra value. What
 * varies per format is what the thing must contain and what he checks
 * before turning it in.
 */

/**
 * The 4-point scale. Deliberately 4 and not 5 — an odd-numbered scale
 * invites defaulting to the middle, which is how rubrics quietly stop
 * distinguishing anything.
 */
export const RUBRIC_LEVELS = [
  { score: 1, label: 'Not yet', hint: 'Missing, or would need to be redone.' },
  { score: 2, label: 'Getting there', hint: 'Attempted, but thin or unclear in places.' },
  { score: 3, label: 'Solid', hint: 'Does what was asked, clearly.' },
  { score: 4, label: 'Excellent', hint: 'Does what was asked and then some.' }
];

/**
 * Criteria by kind of work. Four each — enough to be fair, few enough to
 * actually score in a couple of minutes.
 */
export const RUBRIC_CRITERIA = {
  written: [
    { id: 'understanding', label: 'Understanding', lookFor: 'Shows he actually read and followed it — not a summary of the back cover.' },
    { id: 'evidence', label: 'Evidence', lookFor: 'Specific examples, quotes, or facts from the source, not just opinions.' },
    { id: 'organization', label: 'Organization', lookFor: 'Has the required sections, in an order that makes sense.' },
    { id: 'mechanics', label: 'Mechanics', lookFor: 'Spelling, grammar, and neatness. Was it proofread at all?' }
  ],
  visual: [
    { id: 'content', label: 'Content', lookFor: 'The real information is there and is correct.' },
    { id: 'clarity', label: 'Clarity', lookFor: 'Someone who knows nothing could follow it without him standing there.' },
    { id: 'craft', label: 'Craft', lookFor: 'Built with care — legible, sturdy, finished rather than abandoned.' },
    { id: 'effort', label: 'Depth of work', lookFor: 'Evidence of real time spent, not thrown together the night before.' }
  ],
  spoken: [
    { id: 'content', label: 'Content', lookFor: 'Knows the material and gets the main point across.' },
    { id: 'structure', label: 'Structure', lookFor: 'Clear beginning, middle, and end — not a list of facts.' },
    { id: 'delivery', label: 'Delivery', lookFor: 'Audible, paced, eyes up. Practiced rather than read aloud cold.' },
    { id: 'questions', label: 'Handling questions', lookFor: 'Can answer a follow-up, or say honestly that he does not know.' }
  ]
};

/** Part 9's Book Report Center list — all 16. */
export const BOOK_REPORT_FORMATS = [
  {
    id: 'traditional',
    name: 'Traditional',
    rubricKind: 'written',
    bestFor: 'Any book. The default when nothing else fits.',
    sections: ['Title, author, and what kind of book it is', 'What happens (without spoiling the ending)', 'The main character and what they want', 'What you thought, and why'],
    checklist: ['Named the book and author', 'Explained the main problem in the story', 'Gave at least two examples from the text', 'Said what I actually thought', 'Read it back for spelling']
  },
  {
    id: 'biography',
    name: 'Biography Report',
    rubricKind: 'written',
    bestFor: 'A book about one real person.',
    sections: ['Who they were and when they lived', 'What they were trying to do', 'What stood in the way', 'What changed because of them'],
    checklist: ['Gave real dates, not just "a long time ago"', 'Named a specific obstacle they faced', 'Explained what they accomplished', 'Said why they still matter', 'Proofread it']
  },
  {
    id: 'historical-analysis',
    name: 'Historical Analysis',
    rubricKind: 'written',
    bestFor: 'History books, primary sources, anything set in a real period.',
    sections: ['The time and place', 'What was happening in the wider world', "The author's point of view", 'What this source shows that others might not'],
    checklist: ['Set the scene with a real date and place', 'Named who wrote it and why that matters', 'Compared it to something else I know', 'Quoted the source at least once', 'Proofread it']
  },
  {
    id: 'scientific-review',
    name: 'Scientific Review',
    rubricKind: 'written',
    bestFor: 'Science books and nonfiction that makes claims.',
    sections: ['The question the book is asking', 'The evidence it gives', 'What it leaves unanswered', 'What I would want to test'],
    checklist: ['Stated the central question in one sentence', 'Listed the evidence given', 'Named something the book did not answer', 'Suggested a real way to find out', 'Proofread it']
  },
  {
    id: 'engineering-analysis',
    name: 'Engineering Analysis',
    rubricKind: 'written',
    bestFor: 'Aerospace and technology books. The default for a design story.',
    sections: ['The problem the engineers faced', 'What they tried', 'What failed and why', 'What finally worked, and the trade-off it cost'],
    checklist: ['Stated the problem in engineering terms', 'Described at least one failure', 'Explained why the failure happened', 'Named a trade-off in the final design', 'Proofread it']
  },
  {
    id: 'compare-contrast',
    name: 'Compare and Contrast',
    rubricKind: 'written',
    bestFor: 'Two books, or a book and a film, on the same subject.',
    sections: ['What both have in common', 'Where they differ', 'Why they differ', 'Which one did it better, and why'],
    checklist: ['Covered both sources fairly', 'Gave examples from each', 'Explained the reason for a difference', 'Picked one and defended it', 'Proofread it']
  },
  {
    id: 'character-study',
    name: 'Character Study',
    rubricKind: 'written',
    bestFor: 'Novels with a character who changes.',
    sections: ['Who they are at the start', 'What happens to them', 'Who they are at the end', 'The moment that changed them'],
    checklist: ['Described the character at the beginning', 'Named the turning point', 'Quoted the moment of change', 'Explained what caused it', 'Proofread it']
  },
  {
    id: 'current-events',
    name: 'Current Events Review',
    rubricKind: 'written',
    bestFor: 'Connecting a book to something happening now.',
    sections: ['What the book says', 'A real event happening now', 'How they connect', 'What the book helps you understand about it'],
    checklist: ['Found a real, current event', 'Named my source for it', 'Explained the connection clearly', 'Avoided forcing a connection that is not there', 'Proofread it']
  },
  {
    id: 'timeline',
    name: 'Timeline',
    rubricKind: 'visual',
    bestFor: 'Biographies and histories where the order of events matters.',
    sections: ['At least 8 dated events', 'A caption for each', 'The most important event marked and explained', 'Source for the dates'],
    checklist: ['Used real dates', 'Put events in the right order', 'Wrote a caption for every entry', 'Marked which one mattered most and said why', 'Made it readable from a few feet away']
  },
  {
    id: 'poster',
    name: 'Poster',
    rubricKind: 'visual',
    bestFor: 'When the ideas are easier to show than to describe.',
    sections: ['Title and book information', 'The main idea, large and clear', 'Three supporting points', 'Images, diagrams, or a model'],
    checklist: ['Title is readable across a room', 'Main idea stands out', 'Included at least three real details', 'Nothing is misspelled', 'It is finished, not half-blank']
  },
  {
    id: 'creative-project',
    name: 'Creative Project',
    rubricKind: 'visual',
    bestFor: 'Building, drawing, or making something that proves he read it.',
    sections: ['The thing he made', 'A written page explaining what it represents', 'Which part of the book it comes from', 'What he would change'],
    checklist: ['The project connects to something specific in the book', 'Wrote the explanation page', 'Pointed to the chapter or scene it comes from', 'It is actually finished', 'Explained one thing I would redo']
  },
  {
    id: 'slide-presentation',
    name: 'Slide Presentation',
    rubricKind: 'spoken',
    bestFor: 'Practicing the format he will use for the rest of his life.',
    sections: ['Title slide', 'The main point in one sentence', 'Three supporting slides', 'A closing slide with his own opinion'],
    checklist: ['Fewer words on the slides than in my mouth', 'One idea per slide', 'Practiced out loud twice', 'Can explain every slide without reading it', 'Ready for one question']
  },
  {
    id: 'oral-presentation',
    name: 'Oral Presentation',
    rubricKind: 'spoken',
    bestFor: 'No slides, no props — just talking about the book.',
    sections: ['Opening that gets attention', 'What the book is about', 'Two things worth knowing', 'Why someone should or should not read it'],
    checklist: ['Practiced out loud twice, standing up', 'Timed it', 'Can do it without reading notes', 'Planned an opening line', 'Ready for one question']
  },
  {
    id: 'podcast',
    name: 'Podcast',
    rubricKind: 'spoken',
    bestFor: 'A student who talks more comfortably than he writes.',
    sections: ['Intro naming the book', 'The discussion — at least three points', 'A favorite passage read aloud', 'Sign-off with a recommendation'],
    checklist: ['Recorded all the way through', 'Audible and not rushed', 'Read a real passage from the book', 'Made a clear recommendation', 'Listened back once']
  },
  {
    id: 'video-presentation',
    name: 'Video Presentation',
    rubricKind: 'spoken',
    bestFor: 'When he wants to show something as well as say it.',
    sections: ['Intro naming the book', 'The main content', 'Something shown on camera', 'Closing thought'],
    checklist: ['Camera steady, audio clear', 'Showed something, not just talked', 'Practiced before recording', 'Watched it back once', 'Under the agreed length']
  },
  {
    id: 'parent-interview',
    name: 'Parent Interview',
    rubricKind: 'spoken',
    bestFor: 'A short book, or a week when a written report is too much.',
    sections: ['You ask about the plot or subject', 'You ask what he thought', 'You ask for evidence from the book', 'He asks you one question about it'],
    checklist: ['Finished the book first', 'Can answer without the book in hand', 'Gave a real example when asked', 'Asked a genuine question back', 'Talked for at least five minutes']
  }
];

/** Part 9's Presentation Center list — all 11. */
export const PRESENTATION_FORMATS = [
  {
    id: 'slides',
    name: 'Slides',
    rubricKind: 'spoken',
    bestFor: 'The default. The format he will use in school and work.',
    sections: ['Title slide', 'The one thing the audience should remember', 'Three supporting points', 'Closing and questions'],
    checklist: ['One idea per slide', 'Fewer words on screen than in my mouth', 'Practiced out loud twice', 'Can explain every slide without reading', 'Ready for one question']
  },
  {
    id: 'poster-board',
    name: 'Poster Board',
    rubricKind: 'visual',
    bestFor: 'Standing beside the work and talking people through it.',
    sections: ['Title readable from across a room', 'Question or purpose', 'What was done and found', 'Images, diagrams, or data'],
    checklist: ['Title readable from a distance', 'Sections laid out in reading order', 'Included real data or images', 'Nothing misspelled', 'Board is full, not half-empty']
  },
  {
    id: 'physical-model',
    name: 'Physical Model',
    rubricKind: 'visual',
    bestFor: 'Aerospace and engineering — rockets, satellites, structures.',
    sections: ['The model itself', 'What it represents and at what scale', 'What is accurate and what is simplified', 'What he would build better next time'],
    checklist: ['Model holds together', 'Can state the scale', 'Named one simplification honestly', 'Explained one design choice', 'Named one improvement']
  },
  {
    id: 'demonstration',
    name: 'Demonstration',
    rubricKind: 'spoken',
    bestFor: 'Showing something working — a program, an experiment, a build.',
    sections: ['What you are about to see', 'The demonstration itself', 'What just happened and why', 'What could go wrong'],
    checklist: ['Tested it beforehand', 'Have a backup if it fails', 'Can narrate while doing it', 'Explained the why, not just the what', 'Practiced once end to end']
  },
  {
    id: 'video',
    name: 'Video',
    rubricKind: 'spoken',
    bestFor: 'Anything easier to show than to describe live.',
    sections: ['Intro', 'Main content', 'Something shown on camera', 'Closing thought'],
    checklist: ['Audio is clear', 'Camera is steady', 'Practiced before recording', 'Watched it back once', 'Within the agreed length']
  },
  {
    id: 'speech',
    name: 'Speech',
    rubricKind: 'spoken',
    bestFor: 'Building real public-speaking nerve — no slides to hide behind.',
    sections: ['An opening that earns attention', 'Three points', 'One story or example', 'A closing worth remembering'],
    checklist: ['Practiced standing up, out loud, twice', 'Timed it', 'Memorized the opening and closing', 'Notes are cue cards, not a script', 'Made eye contact while practicing']
  },
  {
    id: 'digital-portfolio',
    name: 'Digital Portfolio',
    rubricKind: 'visual',
    bestFor: 'Showing a body of work rather than one project.',
    sections: ['Introduction — who he is and what he does', 'Three to five pieces of real work', 'A note on each explaining it', 'What he wants to learn next'],
    checklist: ['Included only real, finished work', 'Wrote a note for every piece', 'Put the strongest piece first', 'Checked every link or file opens', 'Proofread the writing']
  },
  {
    id: 'science-fair-display',
    name: 'Science Fair Display',
    rubricKind: 'visual',
    bestFor: 'A real experiment with real data. Practice for an actual fair.',
    sections: ['Question', 'Hypothesis', 'Method', 'Results with data', 'Conclusion'],
    checklist: ['Stated a testable question', 'Showed real data, not made-up numbers', 'Included the method so someone could repeat it', 'Conclusion answers the question honestly', 'Said what I would do differently']
  },
  {
    id: 'engineering-showcase',
    name: 'Engineering Showcase',
    rubricKind: 'visual',
    bestFor: 'A design-and-build project, presented like a design review.',
    sections: ['The problem and its constraints', 'Designs considered', 'What was built', 'Test results', 'What the next version changes'],
    checklist: ['Named the real constraints', 'Showed more than one design idea', 'Included real test results, including failures', 'Explained a trade-off', 'Named the next improvement']
  },
  {
    id: 'debate',
    name: 'Debate',
    rubricKind: 'spoken',
    bestFor: 'A question with a real second side.',
    sections: ['His position', 'Three supporting arguments', 'The strongest argument against him', 'His answer to it'],
    checklist: ['Stated my position clearly', 'Backed each point with evidence', 'Stated the other side fairly', 'Answered it rather than dodging', 'Practiced out loud']
  },
  {
    id: 'mock-interview',
    name: 'Mock Interview',
    rubricKind: 'spoken',
    bestFor: 'Career practice — being interviewed about his own work.',
    sections: ['Introducing himself and his work', 'Answering three questions about it', 'Explaining a decision he made', 'A question he asks back'],
    checklist: ['Can describe my work in 30 seconds', 'Answered without rambling', 'Explained one real decision and why', 'Asked a genuine question back', 'Practiced with someone once']
  }
];


/**
 * ===========================================================================
 * RESEARCH PAPER FORMATS. (Added Aug 10, 2026.)
 * ===========================================================================
 *
 * ---- WHY THESE DID NOT EXIST, AND WHAT IT COST ----
 *
 * formatsForType() returned [] for 'Research Paper'. A format is not a label
 * here — it is the ONLY thing that produces required sections, a checklist,
 * the Quill link, and the rubric (AssignmentFormatPicker renders the scorer
 * only when a format is chosen). So all three research papers on the calendar
 * showed a title, a date and four weekly steps, and nothing else:
 *
 *   Dec 18 — a Black American aviator or engineer, three sources
 *   Dec  4 — family history, one ancestor, three independent sources
 *   May 26 — THE CAPSTONE: an engineering failure and what it changed
 *
 * The capstone — the largest single piece of writing in his year — had no
 * stated requirements and no rubric. The parent would have graded it on
 * instinct, in May, against nothing.
 *
 * ---- WHY THE SECTIONS LOOK LIKE THIS ----
 *
 * Part 9's Research Center names the skills this is supposed to teach across
 * the years: finding reliable sources, evaluating evidence, primary vs
 * secondary, bias detection, fact checking, citation methods, annotated
 * bibliographies, research notes, avoiding plagiarism, thesis development,
 * academic writing.
 *
 * A separate "research skills" screen would be a curriculum nobody opens. So
 * the skills are carried BY THE SECTIONS AND THE CHECKLIST of the thing he is
 * actually writing — every format below asks for a source list, and every
 * checklist names the plagiarism and citation check in words a twelve-year-old
 * can act on. He learns it by doing it four times, not by reading about it.
 *
 * They are all rubricKind 'written', which also restores the Quill link — it
 * renders only on written formats.
 */
export const RESEARCH_PAPER_FORMATS = [
  {
    id: 'person-study',
    name: 'Person Study',
    rubricKind: 'written',
    bestFor: 'One real person — what they did and why it still matters.',
    sections: [
      'Who they were, with real dates',
      'The question this paper answers about them',
      'What they did, in order, with evidence',
      'What changed because of it',
      'Where every fact came from — the source list'
    ],
    checklist: [
      'Used at least three different sources',
      'At least one source is a primary source (their own words, a photo, a document)',
      'Every fact can be traced to one of my sources',
      'Wrote it in my own words — nothing copied and pasted',
      'Listed my sources at the end',
      'Ran it through the writing checker'
    ]
  },
  {
    id: 'historical-investigation',
    name: 'Historical Investigation',
    rubricKind: 'written',
    bestFor: 'A family history, a local history, or any question about the past.',
    sections: [
      'The question being investigated',
      'What the sources say',
      'Where they disagree, and which one is more likely right',
      'The answer, and how confident he is in it',
      'The source list'
    ],
    checklist: [
      'Used at least three independent sources',
      'Said which sources are primary and which are secondary',
      'Checked one fact in two places before believing it',
      'Named a place where the evidence is thin or missing',
      'Listed my sources at the end',
      'Ran it through the writing checker'
    ]
  },
  {
    id: 'technical-report',
    name: 'Technical Report',
    rubricKind: 'written',
    bestFor: 'How something works — a machine, a system, a process.',
    sections: [
      'What it is and what it is for',
      'How it works, step by step',
      'The numbers — sizes, speeds, limits',
      'What it cannot do',
      'The source list'
    ],
    checklist: [
      'Used at least three sources',
      'Included real numbers with their units',
      'Defined every technical word the first time I used it',
      'Drew or described it clearly enough to picture',
      'Listed my sources at the end',
      'Ran it through the writing checker'
    ]
  },
  {
    id: 'failure-analysis',
    name: 'Failure Analysis',
    rubricKind: 'written',
    bestFor: 'An accident, a collapse, a mission that went wrong — and what it changed.',
    sections: [
      'What was supposed to happen',
      'What actually happened',
      'The chain of causes — not just the last one',
      'What was changed afterward, and by whom',
      'What it would take for it to happen again',
      'The source list'
    ],
    checklist: [
      'Used at least three sources, including one official report if one exists',
      'Traced more than one cause — real failures rarely have just one',
      'Separated what is known from what is still argued about',
      'Named a specific rule, design, or law that changed because of it',
      'Listed my sources at the end',
      'Ran it through the writing checker'
    ]
  },
  {
    id: 'argument',
    name: 'Argument Paper',
    rubricKind: 'written',
    bestFor: 'A question with more than one defensible answer.',
    sections: [
      'The claim, in one sentence',
      'The evidence for it',
      'The strongest argument against it',
      'Why the claim still holds — or how it had to change',
      'The source list'
    ],
    checklist: [
      'Stated the claim in one sentence I could say out loud',
      'Gave evidence, not just opinions',
      'Represented the other side fairly enough that someone who holds it would agree',
      'Used at least three sources',
      'Listed my sources at the end',
      'Ran it through the writing checker'
    ]
  },
  {
    id: 'annotated-bibliography',
    name: 'Annotated Bibliography',
    rubricKind: 'written',
    bestFor: 'Practising sources on their own, before a bigger paper.',
    sections: [
      'Each source, written out properly',
      'What each one says, in two or three sentences',
      'How reliable it is and how he knows',
      'Which ones he would actually use, and why'
    ],
    checklist: [
      'At least five sources',
      'Wrote each citation the same way every time',
      'Said who wrote each one and whether they would have a reason to slant it',
      'Marked which are primary and which are secondary',
      'Summarised in my own words',
      'Ran it through the writing checker'
    ]
  }
];

/**
 * ===========================================================================
 * PORTFOLIO ENTRY FORMATS. (Added Aug 10, 2026.)
 * ===========================================================================
 *
 * Thirteen of the forty-five scheduled assignments are Portfolio Entries, and
 * they had no formats either — so they had no sections, no checklist and NO
 * RUBRIC. That included every single piece of Math work on the calendar. Math
 * is one of the five subjects Georgia asks about, and its whole written record
 * for the year was five untitled-in-rubric projects graded on instinct.
 *
 * These four cover what the scheduled entries actually are: a build, an
 * investigation, an applied-maths project, and a piece of writing chosen for
 * the portfolio. Kept deliberately short — a portfolio entry is evidence of
 * work already done, not a new assignment on top of it.
 */
export const PORTFOLIO_ENTRY_FORMATS = [
  {
    id: 'build',
    name: 'Build or Model',
    rubricKind: 'visual',
    bestFor: 'Something made — a model, a rocket, a print, a drawing to scale.',
    sections: [
      'The finished thing, photographed or handed over',
      'What it represents and what it is for',
      'The measurements or design decisions behind it',
      'What went wrong and what he did about it'
    ],
    checklist: [
      'It is finished, not almost finished',
      'Labelled the parts that matter',
      'Wrote down the real numbers I used',
      'Said one thing I would build differently',
      'Photographed it for the record'
    ]
  },
  {
    id: 'applied-math',
    name: 'Applied Maths Project',
    rubricKind: 'visual',
    bestFor: 'Using this quarter\'s maths on a real problem.',
    sections: [
      'The problem, in his own words',
      'The maths he used and why that maths',
      'The working — every step, not just the answer',
      'The answer, checked a second way',
      'Where this would be used in real life'
    ],
    checklist: [
      'Showed every step of the working',
      'Labelled units on every number',
      'Checked the answer a different way and got the same thing',
      'Said which topic from this quarter it uses',
      'Someone else could follow it without me explaining'
    ]
  },
  {
    id: 'investigation',
    name: 'Investigation or Lab',
    rubricKind: 'visual',
    bestFor: 'Something observed or tested over time.',
    sections: [
      'The question',
      'What he did, step by step',
      'What he observed — the actual data',
      'What it means',
      'What he would change if he ran it again'
    ],
    checklist: [
      'Recorded observations as I went, not from memory afterwards',
      'Kept the data even where it did not fit what I expected',
      'Said what the result means, not just what happened',
      'Named one thing that could have skewed it',
      'Answered the question I started with'
    ]
  },
  {
    id: 'writing-sample',
    name: 'Writing Sample',
    rubricKind: 'written',
    bestFor: 'A piece of his own writing, chosen for the record.',
    sections: [
      'The piece itself',
      'Why he picked this one',
      'What it shows he can do now that he could not before'
    ],
    checklist: [
      'Picked it myself rather than taking the most recent one',
      'Said what is good about it in specific words',
      'Named one thing I would still fix',
      'Ran it through the writing checker'
    ]
  }
];

/** Which format list applies to an assignment type. */
export function formatsForType(type) {
  if (type === 'Book Report') return BOOK_REPORT_FORMATS;
  if (type === 'Presentation') return PRESENTATION_FORMATS;
  if (type === 'Research Paper') return RESEARCH_PAPER_FORMATS;
  // Writing Portfolio Entry is the same kind of object as a Portfolio Entry —
  // a finished thing filed as evidence — and shares its formats rather than
  // growing a fifth list that would hold one item.
  if (type === 'Portfolio Entry' || type === 'Writing Portfolio Entry') return PORTFOLIO_ENTRY_FORMATS;
  return [];
}

export function findFormat(type, formatId) {
  return formatsForType(type).find((f) => f.id === formatId) || null;
}

/**
 * ===========================================================================
 * HOW LONG IS IT SUPPOSED TO BE.
 * ===========================================================================
 *
 * ---- WHY THIS EXISTS (Aug 26, 2026) ----
 *
 * The parent: **"when it states 1 paragraph a day. There should be an amt of
 * paragraphs that is needed. Like how many paragraphs a 7th grader should have
 * for a book report."**
 *
 * She is right, and the gap was worse than the wording. The app told him the
 * PACE — one paragraph a day — and never once the SIZE. "One paragraph a day"
 * with no total is not an instruction; it is a treadmill with no off switch. A
 * twelve-year-old writes one paragraph, has followed it exactly, and has no way
 * to know whether he is a fifth of the way in or finished.
 *
 * ---- WHERE THESE NUMBERS COME FROM ----
 *
 * Nothing mandates a length. Georgia's standards and the Common Core describe
 * what 7th-grade writing must DO — introduce a claim, support it with
 * evidence, organise it, conclude it — and are deliberately silent on word
 * counts. So these are the conventional middle-school ranges, stated here in
 * one file rather than guessed at four call sites, and they are hers to change:
 * every number a screen prints is on this page.
 *
 * ---- THE ONE THAT IS NOT A CONVENTION ----
 *
 * `paragraphs: 5` on a book report is not rounded off a table. It is the
 * OUTLINE this app already gives him: an opening, then one paragraph for each
 * of the format's four sections. Five paragraphs across the five days of the
 * draft week is exactly "one paragraph a day," finally with an end to it.
 *
 * SHAPE. `headline` is the target, printed on the card and above the draft
 * box. `pace` is the same target spread across the drafting week, which is the
 * sentence that used to say only "one paragraph a day". `words` drives the
 * live counter, so the box he types in can tell him where he is.
 */
export const FORMAT_SIZE = {
  // ---- Book Report · written (four sections, plus an opening) ----
  traditional: {
    headline: '5 paragraphs · about 350–500 words',
    pace: 'One paragraph a day, Monday to Friday: an opening, then one for each of the four sections above.',
    paragraphs: 5,
    words: [350, 500]
  },
  biography: {
    headline: '5 paragraphs · about 350–500 words',
    pace: 'One paragraph a day, Monday to Friday: an opening, then one for each of the four sections above.',
    paragraphs: 5,
    words: [350, 500]
  },
  'historical-analysis': {
    headline: '6 paragraphs · about 450–600 words',
    pace: 'One paragraph a day: an opening, one for each of the four sections, and a closing on the last day.',
    paragraphs: 6,
    words: [450, 600]
  },
  'scientific-review': {
    headline: '6 paragraphs · about 450–600 words',
    pace: 'One paragraph a day: an opening, one for each of the four sections, and a closing on the last day.',
    paragraphs: 6,
    words: [450, 600]
  },
  'engineering-analysis': {
    headline: '6 paragraphs · about 450–600 words',
    pace: 'One paragraph a day: an opening, one for each of the four sections, and a closing on the last day.',
    paragraphs: 6,
    words: [450, 600]
  },
  'compare-contrast': {
    headline: '5 paragraphs · about 400–550 words',
    pace: 'One paragraph a day. Both books get equal space — if one paragraph is twice the length of the other, that is the fault this format catches.',
    paragraphs: 5,
    words: [400, 550]
  },
  'character-study': {
    headline: '5 paragraphs · about 350–500 words',
    pace: 'One paragraph a day, Monday to Friday: an opening, then one for each of the four sections above.',
    paragraphs: 5,
    words: [350, 500]
  },
  'current-events': {
    headline: '5 paragraphs · about 400–550 words',
    pace: 'One paragraph a day. The news source gets named in the paragraph that uses it, not at the end.',
    paragraphs: 5,
    words: [400, 550]
  },

  // ---- Book Report · visual (the artifact carries the work; the writing explains it) ----
  timeline: {
    headline: '8–10 dated events · a 25–40 word caption for each',
    pace: 'Two events a day. The dates get checked against the book as they go in, not afterwards.',
    words: [250, 400]
  },
  poster: {
    headline: 'One board · 3 supporting points, 30–60 words each',
    pace: 'Day 1 the layout in pencil, days 2–4 one point a day, day 5 the title and the checking.',
    words: [150, 250]
  },
  'creative-project': {
    headline: 'The build, plus a one-page explanation: 3 paragraphs · about 200–300 words',
    pace: 'Build across the first three days. The explanation page is written last, when he knows what he actually made — what it is, where in the book it comes from, and what he would change.',
    paragraphs: 3,
    words: [200, 300]
  },

  // ---- Book Report · spoken ----
  'slide-presentation': {
    headline: '8–10 slides · no more than 20 words a slide · 4–6 minutes',
    pace: 'Two slides a day, then a full run-through out loud on the last day.',
    minutes: [4, 6]
  },
  'oral-presentation': {
    headline: '4–6 minutes · notes on one card, not a script',
    pace: 'Plan it day 1, write the card day 2, then practise out loud standing up on days 3, 4 and 5.',
    minutes: [4, 6]
  },
  podcast: {
    headline: '8–12 minutes recorded',
    pace: 'Notes and running order first, one practice pass, then record. Recording it twice is normal.',
    minutes: [8, 12]
  },
  'video-presentation': {
    headline: '3–5 minutes',
    pace: 'Decide what gets SHOWN on camera before writing a word — the showing is the reason this format exists.',
    minutes: [3, 5]
  },
  'parent-interview': {
    headline: 'About 10 minutes of real conversation · at least 8 questions',
    pace: 'He finishes the book first. This is one sitting, not a week of work.',
    minutes: [8, 12]
  },

  // ---- Presentation ----
  slides: {
    headline: '8–10 slides · no more than 20 words a slide · 5–7 minutes',
    pace: 'Two slides a day, then a full run-through out loud on the last day.',
    minutes: [5, 7]
  },
  'poster-board': {
    headline: 'One board, four sections · about 200–300 words on it',
    pace: 'Layout first, then one section a day, then the title and a read-through for spelling.',
    words: [200, 300]
  },
  'physical-model': {
    headline: 'The model, plus an explanation page: 2–3 paragraphs · about 150–250 words',
    pace: 'Build first. The page says what it represents, at what scale, what is simplified, and what he would build better.',
    paragraphs: 3,
    words: [150, 250]
  },
  demonstration: {
    headline: '5–8 minutes · run end to end at least once beforehand',
    pace: 'Test it early in the week. A demonstration that has never been rehearsed fails in front of an audience, which is the whole risk of the format.',
    minutes: [5, 8]
  },
  video: {
    headline: '3–5 minutes',
    pace: 'Plan, film, watch it back once, refilm the part that did not work.',
    minutes: [3, 5]
  },
  speech: {
    headline: '4–6 minutes · roughly 500–700 spoken words',
    pace: 'Write it across three days, then practise out loud standing up on the last two. Spoken pace is about 120 words a minute.',
    words: [500, 700],
    minutes: [4, 6]
  },
  'digital-portfolio': {
    headline: '6–10 items · a 2–3 sentence caption for each',
    pace: 'Two items a day. A caption that only names the item is not a caption — it says why the item is in here.',
    words: [200, 350]
  },
  'science-fair-display': {
    headline: 'One board, five sections · about 300–450 words on it',
    pace: 'One section a day. The data goes on before the decoration.',
    words: [300, 450]
  },
  'engineering-showcase': {
    headline: 'The build, plus a five-section board · about 300–450 words',
    pace: 'One section a day alongside the build. The failures get their own section — that is the point of this format.',
    words: [300, 450]
  },
  debate: {
    headline: '3-minute opening · 2-minute rebuttal',
    pace: 'Both sides get prepared, not just his — he does not find out which side he argues until the day.',
    minutes: [5, 7]
  },
  'mock-interview': {
    headline: 'About 10 minutes · at least 8 questions answered',
    pace: 'Prepare answers to the eight, then run it once with someone else asking.',
    minutes: [8, 12]
  },

  // ---- Research Paper · the longest written work of the year ----
  'person-study': {
    headline: '7 paragraphs · about 600–800 words · at least 3 sources',
    pace: 'One paragraph a day for a week and a half: an opening, one for each of the five sections, and a closing.',
    paragraphs: 7,
    words: [600, 800]
  },
  'historical-investigation': {
    headline: '7 paragraphs · about 600–800 words · at least 3 sources',
    pace: 'One paragraph a day for a week and a half: an opening, one for each of the five sections, and a closing.',
    paragraphs: 7,
    words: [600, 800]
  },
  'technical-report': {
    headline: '7 paragraphs · about 600–800 words · at least 3 sources',
    pace: 'One paragraph a day. Diagrams count as part of the report, not as decoration on the end.',
    paragraphs: 7,
    words: [600, 800]
  },
  'failure-analysis': {
    headline: '8 paragraphs · about 700–900 words · at least 3 sources',
    pace: 'One paragraph a day. Six sections, plus an opening and a closing — the longest paper of the year.',
    paragraphs: 8,
    words: [700, 900]
  },
  argument: {
    headline: '7 paragraphs · about 600–800 words · at least 3 sources',
    pace: 'One paragraph a day. One full paragraph goes to the strongest argument AGAINST him — a paper that skips it has not made an argument.',
    paragraphs: 7,
    words: [600, 800]
  },
  'annotated-bibliography': {
    headline: '5 sources · 4–6 sentences on each',
    pace: 'One source a day: read it, then write what it says, how good it is, and what he would use it for.',
    words: [300, 450]
  },

  // ---- Portfolio Entry · a write-up of work already done, in one sitting ----
  build: {
    headline: 'Photo of the build, plus 3 paragraphs · about 200–300 words',
    pace: 'One sitting. What he made, how it works, what he would change.',
    paragraphs: 3,
    words: [200, 300]
  },
  'applied-math': {
    headline: 'The working shown, plus 3 paragraphs · about 200–300 words',
    pace: 'One sitting. The maths is the evidence — it goes in, not just the answer.',
    paragraphs: 3,
    words: [200, 300]
  },
  investigation: {
    headline: '4 paragraphs · about 250–350 words',
    pace: 'One sitting. Question, what he did, what happened, what it means.',
    paragraphs: 4,
    words: [250, 350]
  },
  'writing-sample': {
    headline: '3 paragraphs · about 200–300 words',
    pace: 'One sitting. This is a sample of his best writing, so it gets read back out loud before it is saved.',
    paragraphs: 3,
    words: [200, 300]
  }
};

/** The size target for a format, or null when there is no format chosen yet. */
export function sizeFor(format) {
  return format?.id ? FORMAT_SIZE[format.id] || null : null;
}

/**
 * "234 of 350–500 words" — where he is against the target, for the live
 * counter on the box he is typing in. Returns null when the format is not
 * measured in words (a podcast, a debate), because a word count there would be
 * a number that means nothing.
 */
export function wordProgress(size, count) {
  if (!size?.words) return null;
  const [min, max] = size.words;
  return {
    min,
    max,
    count,
    /** 'short' | 'in-range' | 'over' — 'over' is not a failure, just worth knowing. */
    state: count < min ? 'short' : count <= max ? 'in-range' : 'over',
    label: `${count} of ${min}–${max} words`
  };
}

export function criteriaForFormat(format) {
  return format ? RUBRIC_CRITERIA[format.rubricKind] || [] : [];
}

/**
 * Turns rubric scores into a SUGGESTED letter grade.
 *
 * Suggested, never automatic. The parent still decides — this only
 * removes the arithmetic and the drift that comes from grading an
 * October report and a May report by different unwritten standards. She
 * can pick any letter she wants regardless of what this returns.
 *
 * Four criteria scored 1-4 gives 4-16. The bands below are deliberately
 * generous at the top (a 4 means "did what was asked and then some" —
 * three of those and one Solid is still an A) and honest at the bottom.
 */
export function suggestedGradeFromRubric(scores, criteria) {
  const values = criteria.map((c) => scores?.[c.id]).filter((v) => typeof v === 'number');
  if (values.length !== criteria.length || criteria.length === 0) return null;

  const total = values.reduce((a, b) => a + b, 0);
  const max = criteria.length * 4;
  const pct = total / max;

  let letter;
  if (pct >= 0.95) letter = 'A';
  else if (pct >= 0.85) letter = 'A-';
  else if (pct >= 0.8) letter = 'B+';
  else if (pct >= 0.7) letter = 'B';
  else if (pct >= 0.6) letter = 'C';
  else if (pct >= 0.5) letter = 'D';
  else letter = 'F';

  return { letter, total, max };
}

/**
 * Reflection prompts — Part 9 asks every finished assignment to end with
 * one, and until now work was simply marked done.
 *
 * One question, not a form. The point is a sentence or two he actually
 * writes, which is worth more in June than five fields he skipped. It is
 * also deliberately ungraded: a reflection that gets scored stops being
 * honest, and "what would you do differently" only works if admitting
 * something costs him nothing.
 *
 * Keyed by assignment type, with a fallback so a type added later still
 * gets a sensible question rather than none.
 */
export const REFLECTION_PROMPTS = {
  'Research Paper': 'What was the hardest part of researching this, and what would you do differently next time?',
  'Book Report': 'What stuck with you most from this book — and would you recommend it to someone your age?',
  Presentation: 'What went well when you presented it, and what would you change before doing it again?',
  'Portfolio Entry': 'What surprised you while doing this, and what would you build or try differently?',
  'Writing Portfolio Entry': 'What is the one thing you got better at in this piece?',
  'Reading Assignment': 'What is one thing from this reading you are still thinking about?'
};

export const DEFAULT_REFLECTION_PROMPT =
  'What did you learn doing this, and what would you do differently next time?';

export function reflectionPromptFor(type) {
  return REFLECTION_PROMPTS[type] || DEFAULT_REFLECTION_PROMPT;
}
