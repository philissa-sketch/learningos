// ---------------------------------------------------------------------------
// WHICH LESSONS ACTUALLY DESERVE A PRINTOUT.
//
// ---- THE PARENT'S FRAMEWORK (Aug 16, 2026), APPLIED ----
//
// She was explicit, and the first line of it is the important one:
//
//   "No, you do not need a printout for every single lesson... forcing one into
//    every single day can cause burnout for both you and your kids. Aim for 2
//    to 3 strategic printouts per week per subject."
//
// So this file is mostly a list of lessons that DO NOT get one. Four reasons a
// lesson earns a sheet, taken from her framework verbatim:
//
//   diagram   the concept is spatial — label a wing, trace a circuit, map a
//             route. Understanding it means drawing it.
//   steps     a multi-step process — long division, a formula, an if/else
//             loop. He needs a paper scratchpad to trace the steps.
//   log       a hands-on tutorial — a build, a planting, a mix. He needs a
//             data log and a safety checklist next to him, not on a screen.
//   draft     a heavy writing day — brainstorming, outlining, drafting.
//
// And her three reasons to SKIP, which is why History of Flight, Digital
// Citizenship, Google Workspace and the AI lesson have nothing here: an
// introductory or story lesson, a review day, or a quiz that already tests the
// concept without scratch paper.
//
// ---- WHY THESE ARE GENERATED, NOT LINKED ----
//
// Every sheet is rendered by the app from the lesson's own data and printed
// through the browser, the same way the Study Guide has always worked. A link
// to an external printable is a link that can rot, cost money, or turn out
// never to have existed — and this project does not put URLs in front of a
// twelve-year-old that nobody has opened.
//
// ---- WHAT IS ASSIGNED SO FAR ----
//
// **Q1 only.** Q1 is the quarter he is in. Q2-Q4 lessons are deliberately
// unassigned rather than guessed at in bulk — a printout chosen without
// reading the lesson is exactly the busywork her framework is against. Adding
// a quarter is adding rows to the table below.
// ---------------------------------------------------------------------------

export const PRINTOUT_KINDS = {
  diagram: {
    label: 'Diagram sheet',
    why: 'This one is spatial — you understand it by drawing it.',
    blurb: 'Label it, then explain each part in your own words.'
  },
  steps: {
    label: 'Working sheet',
    why: 'Multi-step. Paper is faster than a screen for tracing steps.',
    blurb: 'Show every step. A wrong answer with visible working is worth more than a right one without.'
  },
  log: {
    label: 'Build log',
    why: 'Hands-on — this belongs beside you on the table, not behind a tab.',
    blurb: 'Check the safety line first. Record what actually happened, including what went wrong.'
  },
  draft: {
    label: 'Planning sheet',
    why: 'A heavy writing day. Outline on paper, then type.',
    blurb: 'Get the shape down before the sentences. Messy is fine here.'
  }
};

/**
 * lesson id -> { kind, title, prompts }
 *
 * `prompts` are the lines printed on the sheet. Deliberately few: a sheet with
 * twenty boxes gets abandoned at box four.
 */
export const LESSON_PRINTOUTS = {
  /* ---------------- AEROSPACE Q1 — 4 of 10 lessons ---------------- */
  'ae7-how-airplanes-fly': {
    kind: 'diagram',
    title: 'Label the wing',
    prompts: [
      'Draw a wing in cross-section (an airfoil). Mark the leading edge, trailing edge, camber and chord line.',
      'Draw the oncoming air. Mark the angle of attack between the chord line and the airflow.',
      'Shade where the air moves FASTER. Write one sentence saying what that does to pressure.',
      'Increase the angle of attack too far. Draw what happens to the airflow, and name it.'
    ]
  },
  'ae7-lift': {
    kind: 'diagram',
    title: 'The four forces',
    prompts: [
      'Draw an aircraft in level flight. Add four arrows: lift, weight, thrust, drag.',
      'Make the arrows the right LENGTH for level flight at constant speed. Explain your lengths.',
      'Redraw it climbing. Which arrow changed, and why?',
      'Redraw it slowing down. Which arrow changed?'
    ]
  },
  'ae7-drag-2': {
    kind: 'steps',
    title: 'Lift-to-drag and aspect ratio',
    prompts: [
      'A glider produces 900 N of lift and 45 N of drag. Work out its L/D ratio. Show the division.',
      'A wing is 12 m from tip to tip with an area of 18 m². Work out its aspect ratio (span² ÷ area).',
      'A second wing has the same area but a 6 m span. Work out its aspect ratio.',
      'Which of those two wings glides further, and why? One sentence, using the numbers.'
    ]
  },
  'ae7-thrust-2': {
    kind: 'diagram',
    title: 'Asymmetric thrust and vectoring',
    prompts: [
      'Draw a twin-engine aircraft from above. Both engines at full power — draw the thrust arrows.',
      'Now the LEFT engine fails. Redraw the arrows and draw the direction the aircraft yaws.',
      'Mark which control surface the pilot uses to hold it straight.',
      'Draw a nozzle vectoring thrust downward. What does the aircraft do?'
    ]
  },

  /* ---------------- TECHNOLOGY Q1 — 11 of 22 lessons ---------------- */
  'tech7-typing-2': {
    kind: 'log',
    title: 'Workstation check',
    prompts: [
      'SAFETY / SETUP: feet flat · back supported · screen at eye level · wrists straight, not resting · elbows near 90°',
      'Tick each one before you start. Anything you cannot tick, write what you would need to fix it.',
      'Log today: minutes typed, words per minute, accuracy %.',
      'After 15 minutes, write down anything that aches. That is data, not complaining.'
    ]
  },
  'tech7-digital-citizenship-2': {
    kind: 'log',
    title: 'Privacy audit',
    prompts: [
      'List every account you have. Beside each: is it linked to your real name? Your real birthday?',
      'For each one, write what a stranger could learn about you from it in five minutes.',
      'Circle the one that gives away the most. Write what you will change about it.',
      'One rule you are setting for yourself, in your own words.'
    ]
  },
  'tech7-microsoft-office-2': {
    kind: 'steps',
    title: 'Formula working',
    prompts: [
      'Write out =SUM(B2:B10) and say in words what it does to which cells.',
      'You need the average of C2 to C20 but only where the value is over 50. Write the formula.',
      'Trace by hand: if B2=4, B3=7, B4=1, what does =MAX(B2:B4)-MIN(B2:B4) give? Show it.',
      'Write one formula you invented, and what it is for.'
    ]
  },
  'tech7-internet-research-2': {
    kind: 'steps',
    title: 'Lateral reading trace',
    prompts: [
      'Write the claim you are checking, word for word.',
      'Leave the page. List three OTHER sources you opened and who runs each one.',
      'What does each say about the claim? One line each.',
      'Verdict: true, false, or not enough information — and the one fact that decided it.'
    ]
  },
  'tech7-scratch': {
    kind: 'steps',
    title: 'Trace the loop',
    prompts: [
      'Write out a repeat-10 loop that moves a sprite 10 steps and turns 36°. Draw the path it makes.',
      'Trace the first three passes by hand: after each, write the sprite\'s heading.',
      'Add an if/else: if touching the edge, bounce; else keep going. Write both branches.',
      'Change the 36 to 90. Draw the new path before you run it. Were you right?'
    ]
  },
  'tech7-python': {
    kind: 'steps',
    title: 'Trace the code',
    prompts: [
      'Write a for loop that prints 1 to 5. Then write what each pass prints, by hand.',
      'x = 3; y = x * 2; x = 10. What is y now? Explain why in one sentence.',
      'Write a function that takes a number and returns double it. Trace it with 7.',
      'Write a line of code with a deliberate mistake, then write the error you expect.'
    ]
  },
  'tech7-html': {
    kind: 'diagram',
    title: 'Tag tree',
    prompts: [
      'Draw the nesting tree for a page: html > head, body > header, main, footer.',
      'Add a heading, two paragraphs and a list inside main. Draw them as branches.',
      'Circle every tag that must be CLOSED. Cross out any you forgot.',
      'Sketch what that page looks like in a browser, from your tree alone.'
    ]
  },
  'tech7-css': {
    kind: 'diagram',
    title: 'The box model',
    prompts: [
      'Draw one box with four labelled layers: content, padding, border, margin.',
      'Content 200px wide, padding 10px, border 2px. Work out the total width. Show it.',
      'Draw two boxes side by side with a 20px margin between them.',
      'Colour the layer that does NOT have a background colour.'
    ]
  },
  'tech7-javascript': {
    kind: 'steps',
    title: 'Trace the interaction',
    prompts: [
      'Write an if/else that shows a message when a number is over 100.',
      'Trace it with 100, with 101, and with 99. Write what happens each time.',
      'Write a click handler in words: when X is clicked, do Y.',
      'What happens if you forget the = in a comparison? Write your guess, then test it.'
    ]
  },
  'tech7-cad': {
    kind: 'diagram',
    title: 'Sketch before you model',
    prompts: [
      'Sketch the object from the front, the side and the top. Three separate views.',
      'Put a real measurement on every edge. Guessing is allowed; blank is not.',
      'Circle the ONE dimension that, if you changed it, would change the most other things.',
      'List the primitive shapes you will combine to build it.'
    ]
  },
  'tech7-3d-modeling': {
    kind: 'diagram',
    title: 'Faces, edges and vertices',
    prompts: [
      'Draw a cube. Count its faces, edges and vertices, and write the three numbers.',
      'Now a triangular prism. Same three counts.',
      'Check both against F + V − E = 2. Show the arithmetic.',
      'Sketch the SAME object in low-poly and in high-poly. What did you lose, and what did you gain?'
    ]
  }
};

/**
 * The parent's smart alternative, taken up in full:
 *
 *   "Instead of printing loose sheets for individual lessons, consider creating
 *    a single printed workbook or journal at the beginning of a unit."
 *
 * One booklet per subject, printed once, holding blank templates he fills as he
 * goes. Cuts the daily prep to nothing and keeps his physical work in one
 * place, which is also what makes it a portfolio artifact rather than a pile.
 */
export const SUBJECT_JOURNALS = {
  aerospace: {
    title: 'Flight Log',
    subtitle: 'Aerospace Engineering — one book for the year',
    pages: [
      { label: 'Force diagram', count: 8, lines: ['Aircraft / situation:', 'Draw it. Four arrows, right lengths.', 'What changed and why:'] },
      { label: 'Build record', count: 6, lines: ['Build:', 'Date:', 'What I predicted:', 'What actually happened:', 'What I would change:'] },
      { label: 'Launch data', count: 6, lines: ['Trial 1  distance ___  time ___  notes ___', 'Trial 2  distance ___  time ___  notes ___', 'Trial 3  distance ___  time ___  notes ___', 'Best result and why:'] }
    ]
  },
  technology: {
    title: 'Build Book',
    subtitle: 'Technology & Computer Science — one book for the year',
    pages: [
      { label: 'Wireframe grid', count: 8, lines: ['Screen / page:', 'Sketch the layout in the grid. Label every region.', 'What happens when you click:'] },
      { label: 'Flowchart frame', count: 6, lines: ['Program:', 'Start → ? → End. Draw the decisions as diamonds.', 'The branch most likely to break:'] },
      { label: 'Code trace', count: 8, lines: ['Code:', 'Line-by-line, what each line does:', 'Value of each variable at the end:'] }
    ]
  },
  science: {
    title: 'Lab Notebook',
    subtitle: 'Science — one book for the year',
    pages: [
      { label: 'Experiment', count: 10, lines: ['Question:', 'Prediction (and why):', 'Materials:', 'What I did:', 'What happened:', 'What I would change:'] },
      { label: 'Observation', count: 6, lines: ['Date / time:', 'Draw it:', 'Measurements:', 'Something I noticed that I was not looking for:'] }
    ]
  },
  gardening: {
    title: 'Grow Journal',
    subtitle: 'Gardening & Applied Engineering — one book for the season',
    pages: [
      { label: 'Plant page', count: 10, lines: ['Plant:', 'Planted on:', 'Where / sun hours:', 'Watering:', 'Height each week: ___ ___ ___ ___', 'Harvested:'] },
      { label: 'Bed plan', count: 4, lines: ['Bed:', 'Draw the layout to scale. Mark north.', 'What is beside what, and why:'] },
      { label: 'Build page', count: 4, lines: ['Build:', 'Sketch with measurements:', 'Materials and cost:', 'What went wrong:'] }
    ]
  },
  socialStudies: {
    title: 'Timeline & Map Book',
    subtitle: 'Social Studies — one book for the year',
    pages: [
      { label: 'Timeline strip', count: 6, lines: ['Period:', 'Mark the dates along the line. Write what changed at each.', 'The one event everything else depends on:'] },
      { label: 'Map page', count: 6, lines: ['Region / route:', 'Draw it. Mark the key places.', 'Why here and not somewhere else:'] },
      { label: 'Source page', count: 6, lines: ['Source:', 'Who made it, when, and for whom:', 'What it shows:', 'What it leaves out:'] }
    ]
  },
  robotics: {
    title: 'Circuit & Code Book',
    subtitle: 'Robotics & Automation — one book for the year',
    pages: [
      { label: 'Circuit page', count: 8, lines: ['Circuit:', 'Draw it. Label every component and every pin.', 'What it should do:', 'What it actually did:'] },
      { label: 'Sensor readings', count: 6, lines: ['Sensor:', 'Reading in the dark ___  in the light ___  in between ___', 'Threshold I chose, and why:'] },
      { label: 'Code trace', count: 6, lines: ['setup() does:', 'loop() does, each pass:', 'The line I got wrong first:'] }
    ]
  }
};

/** The sheet for one lesson, or null — which is the answer for most lessons. */
export function printoutFor(lessonId) {
  const spec = LESSON_PRINTOUTS[lessonId];
  if (!spec) return null;
  return { ...spec, ...PRINTOUT_KINDS[spec.kind], kind: spec.kind };
}

export function journalFor(subject) {
  return SUBJECT_JOURNALS[subject] || null;
}

/** How many of a subject's lessons carry a sheet — for the cadence guard. */
export function printoutCountFor(lessons = []) {
  return lessons.filter((l) => LESSON_PRINTOUTS[l.id]).length;
}
