/**
 * A PLACE TO WRITE ABOUT WHAT HE READ. (Oct 3, 2026.)
 *
 * The parent: "In the projects there isn't a place for him to type in the
 * explanations." Every Book Report, Presentation, Research Paper and Portfolio
 * Entry carries a format, and the format is what switches the writing box on.
 * The 18 Reading Assignments carry no format at all -- there is nothing to
 * "pick" for a novel he is reading a chapter a week -- so the box never
 * appeared and the only thing he could do with one was tick it.
 *
 * This is the format they fall back to. It is deliberately NOT in
 * reportFormats.js: it is not a report format she chooses between, it is what
 * a Reading Assignment is when nothing has been chosen, and putting it in
 * formatsForType would make every one of them read "format not picked yet".
 */
export const READING_RESPONSE_FORMAT = {
  id: 'reading-response',
  name: 'Reading response',
  rubricKind: 'written',
  bestFor: 'Putting what he read into his own words, a little at a time.',
  sections: [
    'What happened in what I read, in my own words',
    'One part that stood out, and why (name the page or scene)',
    'A word or idea I had to work out',
    'A question I still have'
  ],
  checklist: [
    'In my own words, not copied from the book',
    'Named a specific page, scene or character',
    'Said WHY, not only what happened',
    'Checked spelling and sentences'
  ]
};

/**
 * The format his writing box uses: the one on the assignment, or -- for the
 * types that have formats to pick but none picked -- nothing (the picker
 * still owns that), or -- for a Reading Assignment -- the response format, or
 * -- for anything else with no format yet -- a plain "explain your work" one.
 */
export function writerFormatFor(assignment, findFormat) {
  const picked = findFormat(assignment.type, assignment.format);
  if (picked) return picked;
  return assignment.type === 'Reading Assignment' ? READING_RESPONSE_FORMAT : WORK_RESPONSE_FORMAT;
}

/**
 * A PLACE TO WRITE ON WORK THAT HAS NO FORMAT YET. (Oct 12, 2026.)
 *
 * The parent, on a Math project: "I am unable to find his work for this
 * project." There was none to find. The writing box is switched on by a
 * format, the project's format had not been picked, and the card told him he
 * would "see a generic assignment" — which had no box at all. So he could
 * tick it and not write a word, and nothing she opened could ever hold his
 * explanation. Until she picks one, he writes against this instead; picking a
 * real format replaces it at once, and what he already typed stays.
 */
export const WORK_RESPONSE_FORMAT = {
  id: 'work-response',
  name: 'Explain your work',
  rubricKind: 'written',
  bestFor: 'Saying what he did and what he found out, until a format is chosen.',
  sections: [
    'What I did, step by step',
    'What I made, found out or figured out',
    'Why I chose it, or why it works',
    'What I would change next time'
  ],
  checklist: [
    'In my own words',
    'Included real numbers, parts or measurements where I used them',
    'Said WHY, not only what I did',
    'Checked spelling and sentences'
  ]
};
