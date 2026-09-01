// ---------------------------------------------------------------------------
// SIX WAYS TO DO A BOOK REPORT — not one, four times a year.
//
// ---- WHY THIS EXISTS ----
//
// Gigi, Aug 25 2026: "do the book report like Lamar's."
//
// ⚠️ AND v3.82 BUILT IT FROM HIS NOTES INSTEAD OF HIS APP. `Lamar DOC` held
// documents and no code, newest file Aug 16. His running app was mounted the
// whole time, with `reportFormats.js` updated Aug 25 at 22:05 — nine days
// newer — and nobody opened it.
//
// That is §38, committed in the version that quoted §38. A document about an
// app is not the app, and this time the app itself was sitting right there.
// Everything below is read off his code.
//
// ⚠️ `Lamar DOC` NO LONGER EXISTS. Gigi deleted it on Aug 26 2026, the same day,
// which is the cleanest possible fix: a stale copy of his thinking cannot be
// mistaken for his app if there is no stale copy. The folder is named here as
// HISTORY — do not go looking for it. His app is the only source now.
//
// ---- HIS REASON, WHICH IS THE WHOLE POINT ----
//
// reportFormats.js, his words:
//
//     "Five book reports and five presentations are scheduled this year, and
//      every one of them said only 'write a report.' SAME SHAPE FIVE TIMES IS
//      HOW A BOOK REPORT BECOMES A CHORE."
//
// Azianna has four a year and they were all identical. Same problem, one year
// younger.
//
// ---- WHY SIX AND NOT SIXTEEN ----
//
// He has 16. Several are his: Engineering Analysis is for aerospace design
// stories, Scientific Review is for nonfiction that makes claims, Podcast and
// Video need kit and an audience. Copying all sixteen so the table matched his
// would be the §35 mistake — a list that looks complete and aims at the wrong
// child.
//
// These six cover what a nine-year-old who wants to be a doctor and a herbalist
// will actually read: a story, a life, two things side by side, and two ways out
// of writing when writing is the wrong shape that week.
//
// ---- ⚠️ THE SIZES ARE HERS, NOT HIS ----
//
// His written formats run "5 paragraphs · about 350-500 words". THAT IS A
// TWELVE-YEAR-OLD'S REPORT. Her Grammar & Usage is 2.35 and her longest journal
// entry to date is eleven words. Copying his word counts would set her a target
// she cannot reach and call it a standard.
//
// Four short paragraphs, roughly 80-150 words, one a day across the draft week.
// It goes up as she does, and the number lives here where a check can read it.
//
// ---- AND EVERY WORD BELOW IS MEASURED ----
//
// check-book-report runs every section, checklist line and blurb through the
// app's own analyse() against her Quarter 1 cap. His prose is pitched at a
// seventh-grader; none of it is copied verbatim into something she reads.
// ---------------------------------------------------------------------------

/**
 * One way of doing a book report.
 *
 * `sections`   what the finished thing must contain — this IS the outline, and
 *              the writing screen drops it in as headings.
 * `checklist`  what she checks herself before handing it in, tickable on the
 *              Edit and finish step.
 * `kind`       'written' | 'made' | 'spoken'. Which rubric applies, and whether
 *              the draft box is the artifact or a description of one.
 */
export const BOOK_REPORT_FORMATS = [
  {
    id: 'traditional',
    name: 'The usual one',
    kind: 'written',
    bestFor: 'Any book at all. Pick this if nothing else fits.',
    sections: [
      'The name of the book and who wrote it',
      'What happens, without giving away the end',
      'The person the story is about, and what they want',
      'What you thought of it, and why'
    ],
    checklist: [
      'I named the book and the writer',
      'I said what the trouble in the story was',
      'I gave two real bits from the book',
      'I said what I thought of it',
      'I read it back for spelling'
    ]
  },
  {
    id: 'character-study',
    name: 'One person, close up',
    kind: 'written',
    bestFor: 'A story where somebody changes by the end.',
    sections: [
      'Who they are at the start',
      'What happens to them',
      'Who they are at the end',
      'The moment that changed them'
    ],
    checklist: [
      'I said what they were like at the start',
      'I found the moment things turned',
      'I copied the line where it happens',
      'I said what caused it',
      'I read it back for spelling'
    ]
  },
  {
    id: 'biography',
    name: 'A real life',
    kind: 'written',
    bestFor: 'A book about one real person. Good for a doctor or a scientist.',
    sections: [
      'Who they were, and when they lived',
      'What they were trying to do',
      'What got in the way',
      'What is different now because of them'
    ],
    checklist: [
      'I gave real dates, not just a long time ago',
      'I named one thing that stood in their way',
      'I said what they managed to do',
      'I said why it still matters',
      'I read it back for spelling'
    ]
  },
  {
    id: 'compare',
    name: 'Two things side by side',
    kind: 'written',
    bestFor: 'Two books on one subject. Or a book and the film of it.',
    sections: [
      'What the two have in common',
      'Where they are different',
      'Why you think they are different',
      'Which one did it better, and why'
    ],
    checklist: [
      'I was fair to both of them',
      'I gave a real bit from each',
      'I said why they are not the same',
      'I picked one and said why',
      'I read it back for spelling'
    ]
  },
  {
    id: 'poster',
    name: 'A poster',
    kind: 'made',
    bestFor: 'When the book is easier to show than to write about.',
    sections: [
      'The title, big enough to read across the room',
      'The main idea, large and clear',
      'Three things that back it up',
      'A drawing, a diagram, or a real plant'
    ],
    checklist: [
      'The title can be read from across the room',
      'The main idea stands out',
      'I put in three real details',
      'Nothing on it is spelled wrong',
      'It is finished, not half empty'
    ]
  },
  {
    id: 'gigi-interview',
    name: 'Gigi asks the questions',
    kind: 'spoken',
    bestFor: 'A short book. Or a week when writing it all out is too much.',
    // ⚠️ HIS "PARENT INTERVIEW", KEPT ON PURPOSE AND FOR HER REASON.
    // 63% of every answer she has ever given was read aloud to her, and her
    // independent reading has never been measured. A written report on a hard
    // week measures her handwriting stamina, not the book. This one measures
    // whether she understood it — which is the thing a book report is for.
    // The draft box holds Gigi's notes from the talk, so there is still an
    // artifact: a checkbox is not one.
    sections: [
      'Gigi asks what the book was about',
      'Gigi asks what you thought of it',
      'Gigi asks for a real bit from the book',
      'You ask Gigi one question about it'
    ],
    checklist: [
      'I finished the book first',
      'I answered without the book in my hand',
      'I gave a real bit when she asked',
      'I asked her a question back',
      'We talked for five minutes'
    ]
  }
];

/**
 * How long the written ones should be.
 *
 * ⚠️ ONE ENTRY, NOT ONE PER FORMAT. His file carries a size per format and it
 * earns that: his run from 5 paragraphs to 6 with different word counts. Hers
 * are all four sections and all the same length, so six copies of one number
 * would be six chances to drift — and every hand-typed number in this project
 * has drifted.
 */
export const REPORT_SIZE = {
  headline: '4 short paragraphs · about 80 to 150 words',
  pace: 'One paragraph a day across the draft week — one for each line in your plan.',
  paragraphs: 4,
  words: [80, 150]
};

export function formatById(id) {
  return BOOK_REPORT_FORMATS.find((f) => f.id === id) || null;
}

/** The one she gets if she has not chosen. Never a silent default in the data. */
export const DEFAULT_FORMAT_ID = 'traditional';

export default BOOK_REPORT_FORMATS;
