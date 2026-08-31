/**
 * Quarterly Mission Evaluations — PROJECT_PLAN.md Part 8.
 *
 * WHAT THIS REPLACES: the plan dropped IXL and every recurring paid
 * diagnostic, and named project-based assessment as the thing that takes
 * its place — "build a bridge, write a research paper, give a
 * presentation, complete a coding project, build a robot, design a
 * rocket, grow a garden," compared against the start of the year to show
 * real growth.
 *
 * A test tells you what he could recall on a Tuesday. A mission tells
 * you whether he can plan something, build it, watch it fail, and fix
 * it. For a kid who wants to be an aerospace engineer, the second
 * question is the one that matters, and it is the one no multiple-choice
 * question has ever answered.
 *
 * ─────────────────────────────────────────────────────────────────────
 * WHAT THE "AI GRADING ASSISTANCE" IN THE PLAN ACTUALLY IS HERE
 *
 * The plan asks for Claude to draft a suggested score and written
 * feedback, with the parent approving before it's final. The approval
 * half is built exactly as specified. The drafting half is NOT an AI
 * call, because **this app has no live AI or API integration** — the
 * same limit already recorded against self-explanations in Part 4.
 * Shipping something labelled "AI feedback" that was really a lookup
 * table would be a lie told to a parent about her son's record.
 *
 * So the draft is assembled deterministically from the rubric scores SHE
 * chooses: pick a level on each criterion and the app writes the
 * paragraph those choices imply, in specific language, ready to edit.
 * That is genuinely most of the value — it turns a blank box at 9pm into
 * a paragraph to react to — and the UI says plainly where the words came
 * from. When a real model is wired in later, this is the seam it slots
 * into: same rubric, same approval step, better draft.
 * ─────────────────────────────────────────────────────────────────────
 *
 * EVERY PROPOSAL BELOW CITES REAL LESSONS. The `builds_on` list on each
 * project holds actual lesson titles from this curriculum, checked
 * against the lesson data by the verification script. Nothing here is an
 * invented topic — same standing rule as the book recommendations.
 */

/**
 * The rubric.
 *
 * FIVE criteria, where the rest of this codebase uses four, and the
 * extra one is deliberate: **Iteration**. Book reports are scored
 * sixteen times a year and four criteria keep that fast. A mission is
 * scored four times a year, and "what did you change when it didn't
 * work" is the single question that separates a kid who built a thing
 * from a kid who is learning engineering. Dropping it to preserve
 * symmetry would remove the most useful signal in the whole rubric.
 *
 * Scored on the same 4-point scale as everything else (RUBRIC_LEVELS in
 * academicSuccessCenter/reportFormats.js) so a level means the same
 * thing everywhere, and so the two systems could be compared later.
 */
export const MISSION_RUBRIC_CRITERIA = [
  {
    id: 'understanding',
    label: 'Understanding',
    lookFor: 'Can he explain the science or math behind what he built — not just what he did?',
    weakSpot: 'Built it correctly but can only describe the steps, not why they work.'
  },
  {
    id: 'design',
    label: 'Design & Planning',
    lookFor: 'Did a plan, sketch, or calculation come before the building?',
    weakSpot: 'Started building immediately and figured it out as he went.'
  },
  {
    id: 'execution',
    label: 'Execution',
    lookFor: 'Is the thing actually finished and does it do what it was meant to do?',
    weakSpot: 'Ran out of steam before it was really done.'
  },
  {
    id: 'iteration',
    label: 'Iteration',
    lookFor: 'When something failed, did he diagnose it and try a different approach?',
    weakSpot: 'Either nothing failed (too easy) or the first failure ended it.'
  },
  {
    id: 'communication',
    label: 'Communication',
    lookFor: 'Could someone who wasn’t there understand it from his explanation?',
    weakSpot: 'Makes sense only with him standing next to it pointing.'
  }
];

/**
 * The sentence bank the feedback draft is assembled from.
 *
 * Written in second person and specific on purpose — "you sketched the
 * wing before you cut anything" is worth reading; "good job on design"
 * is not. Four levels per criterion, matching RUBRIC_LEVELS.
 */
const FEEDBACK_SENTENCES = {
  understanding: {
    1: 'Take another pass at the why behind this one — being able to explain the principle matters more than the finished object.',
    2: 'You can describe what you did; the next step is explaining why it works. Try teaching it to someone who has never seen it.',
    3: 'You explained the principle behind this clearly, not just the steps you followed.',
    4: 'You connected this back to the science behind it and could answer follow-up questions that went past what was assigned.'
  },
  design: {
    1: 'Next mission, plan on paper before touching materials — even a rough sketch changes how the build goes.',
    2: 'There was a plan, but it was thin. More detail up front usually means less rebuilding later.',
    3: 'You planned before you built, and the plan held up.',
    4: 'Your planning was thorough enough that you caught problems on paper instead of discovering them mid-build.'
  },
  execution: {
    1: 'This one didn’t get finished. Worth returning to — an unfinished build teaches less than a rough finished one.',
    2: 'You got it working, though some parts were left rough. Finishing carefully is its own skill.',
    3: 'You finished it and it does what it was supposed to do.',
    4: 'You finished it to a standard well past “it works” — the craftsmanship shows.'
  },
  iteration: {
    1: 'When it didn’t work, that was the end of it. Failure is data — next time, change one thing and test again.',
    2: 'You made one adjustment when it failed. Engineers usually make several before they’re done.',
    3: 'When something failed you diagnosed it and tried a different approach, which is exactly the point.',
    4: 'You iterated repeatedly, and each change was based on what actually went wrong rather than guessing.'
  },
  communication: {
    1: 'Practise explaining this out loud. If it only makes sense with you pointing at it, it isn’t explained yet.',
    2: 'Your explanation covered the basics but assumed the listener already knew a lot.',
    3: 'You explained this well enough that someone who wasn’t there could follow it.',
    4: 'Your explanation was clear enough to teach from — you anticipated what a listener wouldn’t know.'
  }
};

export const MISSION_STATUS_LABELS = {
  proposed: 'Suggested',
  accepted: 'Accepted',
  'in-progress': 'In progress',
  completed: 'Completed',
  scored: 'Scored',
  approved: 'Final'
};

/**
 * Project proposals, three per quarter.
 *
 * THREE, NOT ONE, and she picks — the same accept-or-decline model she
 * asked for with books and assignments, in her words: *"I don't want to
 * set up any assignments... I will like AI to do so and I can just
 * accept it or not."* One imposed project per quarter would be a
 * scheduling problem she has to work around; three options are a choice
 * she makes in thirty seconds.
 *
 * Each is cross-subject on purpose. A mission that only touches
 * Aerospace grades Aerospace; a mission that needs the math to size it,
 * the writing to document it and the science to explain it grades the
 * quarter.
 *
 * `builds_on` cites REAL lesson titles from this curriculum — verified
 * against the lesson data by _verify_mission_evaluations.mjs, so a
 * curriculum change that orphans a proposal fails the build rather than
 * quietly leaving a project pointing at nothing.
 */
export const MISSION_PROPOSALS = {
  'Q1 2026-2027': [
    {
      id: 'q1-glider',
      title: 'Build and Test a Glider',
      kind: 'Build & test',
      summary:
        'Build three paper or balsa gliders with different wing shapes, launch each one five times, measure the distances, and work out which shape flew furthest and why.',
      why: 'This is the whole quarter in one object — lift and drag are abstractions until a wing you cut yourself flies badly and you have to work out which force beat you.',
      builds_on: ['Lift', 'Drag', 'Thrust', 'How Airplanes Fly'],
      subjects: ['aerospace', 'math', 'reading'],
      deliverable: 'Three gliders, a table of measured distances, and a one-page write-up of which design won and why.',
      timeEstimate: 'Two Fridays'
    },
    {
      id: 'q1-family-history',
      title: 'Family History Research Paper',
      kind: 'Research paper',
      summary:
        'Research one branch of the family using real records, evaluate how trustworthy each source is, and write it up with the evidence cited.',
      why: 'The Social Studies quarter is literally about genealogy methods and judging historical evidence. Doing it on his own family is the version he will remember.',
      builds_on: [
        'Genealogy Research Methods I',
        'Evaluating Historical Evidence I',
        'Racial Reclassification in Historical Records I'
      ],
      subjects: ['socialStudies', 'reading'],
      deliverable: 'A written paper with sources listed and a note on how reliable each one is.',
      timeEstimate: 'Three to four Fridays'
    },
    {
      id: 'q1-scratch-flight',
      title: 'Scratch Flight Simulator',
      kind: 'Coding project',
      summary:
        'Build a Scratch program where a plane responds to thrust and drag — more thrust speeds it up, drag slows it down, and it stalls if lift runs out.',
      why: 'Writing the rules of flight as code forces a precision that describing them does not. If the physics is wrong, the plane behaves wrong on screen.',
      builds_on: ['Scratch Programming', 'How Airplanes Fly', 'Thrust', 'Drag'],
      subjects: ['technology', 'aerospace', 'math'],
      deliverable: 'A working Scratch project he can demonstrate and explain.',
      timeEstimate: 'Two to three Fridays'
    }
  ],

  'Q2 2026-2027': [
    {
      id: 'q2-water-rocket',
      title: 'Design and Launch a Water Bottle Rocket',
      kind: 'Rocket build',
      summary:
        'Build a water bottle rocket, then test how launch angle and water volume change the distance — at least three launches per setting so one lucky flight cannot decide it.',
      why: 'Rocket Design and Weight are the quarter, and ratios and proportions are the Khan math running alongside it. This mission needs both or it does not work.',
      builds_on: ['Rocket Design', 'Weight', 'Aircraft Design'],
      subjects: ['aerospace', 'math', 'science'],
      deliverable: 'The rocket, a results table across the settings tested, and his conclusion about the best combination.',
      timeEstimate: 'Two Fridays, outdoors'
    },
    {
      id: 'q2-cad-part',
      title: 'CAD and Model a Spacecraft Component',
      kind: 'Design & model',
      summary:
        'Design a real spacecraft part — a docking ring, a landing leg, an antenna mount — in CAD software, and explain the engineering constraints that shaped it.',
      why: 'CAD II and 3D Modeling II run this quarter alongside Spacecraft. Designing to constraints is what engineers actually do all day.',
      builds_on: ['CAD II: Parametric Design & Collaboration', '3D Modeling II: Textures & Lighting', 'Spacecraft'],
      subjects: ['technology', 'aerospace'],
      deliverable: 'The CAD file plus a short explanation of why it is shaped the way it is.',
      timeEstimate: 'Two to three Fridays'
    },
    {
      id: 'q2-jet-engine-site',
      title: 'Build a Website: How a Jet Engine Works',
      kind: 'Presentation',
      summary:
        'Build a small website that explains a jet engine to someone who knows nothing about them — diagrams, the stages in order, and plain language.',
      why: 'HTML II and CSS II are running, and explaining something clearly is the fastest way to find out whether you understand it.',
      builds_on: ['HTML II: Lists, Tables & Divs', 'CSS II: Selectors & the Box Model', 'Jet Engines'],
      subjects: ['technology', 'aerospace', 'reading'],
      deliverable: 'A working web page he can open and walk someone through.',
      timeEstimate: 'Two Fridays'
    }
  ],

  'Q3 2026-2027': [
    {
      id: 'q3-mars-habitat',
      title: 'Mars Habitat Model',
      kind: 'Build & explain',
      summary:
        'Build a scale model of a Mars habitat and account for how the people inside get air, water, food and heat — with the scale stated and the math shown.',
      why: 'Mars Missions runs this quarter, and the Khan science is ecosystems and energy flow. A habitat is a closed ecosystem, which is the connection worth making.',
      builds_on: ['Mars Missions', 'Moon Missions', 'NASA Missions'],
      subjects: ['aerospace', 'science', 'math'],
      deliverable: 'The model, the scale calculations, and an explanation of how each need is met.',
      timeEstimate: 'Three Fridays'
    },
    {
      id: 'q3-garden',
      title: 'Grow a Closed-Loop Garden',
      kind: 'Long-run experiment',
      summary:
        'Grow something real from seed, logging water, light and growth weekly — then work out what would have to change to run the same system on a spacecraft.',
      why: 'Runs the whole quarter in the background rather than eating Fridays, and ties the ecosystems science to the life-support problem that space missions have never fully solved.',
      builds_on: ['Satellites', 'Mars Missions'],
      subjects: ['science', 'aerospace', 'math'],
      deliverable: 'A weekly growth log, photographs, and a short piece on what a spacecraft version would need.',
      timeEstimate: 'The whole quarter, a few minutes a week'
    },
    {
      id: 'q3-orbit-talk',
      title: 'Teach an Orbital Mechanics Lesson',
      kind: 'Presentation',
      summary:
        'Prepare and deliver a ten-minute lesson on why satellites stay up, complete with a demonstration, taught to a real audience.',
      why: 'Orbital Mechanics and Satellites are the quarter, and orbit is genuinely counter-intuitive. Teaching it is the hardest possible test of understanding it.',
      builds_on: ['Orbital Mechanics', 'Satellites', 'Orbital Mechanics II'],
      subjects: ['aerospace', 'reading', 'math'],
      deliverable: 'The delivered talk, his notes or slides, and the demonstration he used.',
      timeEstimate: 'Two Fridays to prepare'
    }
  ],

  'Q4 2026-2027': [
    {
      id: 'q4-bridge',
      title: 'Design, Build and Break a Bridge',
      kind: 'Build & test to failure',
      summary:
        'Build a bridge from a fixed set of materials, load it until it breaks, then rebuild it stronger using what the failure showed — and document both rounds.',
      why: 'The Engineering Design Process lessons close the year, and this mission cannot be completed without actually running that process. The rebuild is the assessment.',
      builds_on: ['Engineering Design Process', 'Engineering Design Process II', '3D Printing'],
      subjects: ['aerospace', 'math', 'science'],
      deliverable: 'Both bridges, the load each held, and a written account of what he changed and why.',
      timeEstimate: 'Three Fridays'
    },
    {
      id: 'q4-drone-data',
      title: 'Drone Flight Data Study',
      kind: 'Data study',
      summary:
        'Fly a set course repeatedly under different conditions, record the results, and use real statistics to say whether the differences mean anything.',
      why: 'Drones runs this quarter and the Khan math is statistics, probability and sampling. This is where a kid learns that three trials is not evidence.',
      builds_on: ['Drones', 'Drones II'],
      subjects: ['aerospace', 'math'],
      deliverable: 'The data, the analysis, and a conclusion that states how confident he is and why.',
      timeEstimate: 'Two Fridays'
    },
    {
      id: 'q4-capstone',
      title: 'Year-End Capstone: Design a Mission',
      kind: 'Capstone',
      summary:
        'Design a complete space mission — destination, vehicle, crew or robotic, timeline, budget, and the biggest risk — and present it as a proposal.',
      why: 'Pulls the entire year together: flight fundamentals, structures, orbits and innovation, presented the way a real proposal is. The right way to close the year.',
      builds_on: ['SpaceX Innovations', 'Future Space Travel', 'Engineering Design Process'],
      subjects: ['aerospace', 'reading', 'math', 'technology'],
      deliverable: 'A written proposal and a presentation delivered to a real audience.',
      timeEstimate: 'Four Fridays'
    }
  ]
};

export const MISSION_QUARTERS = Object.keys(MISSION_PROPOSALS);

export function proposalsForQuarter(quarter) {
  return MISSION_PROPOSALS[quarter] || [];
}

export function findProposal(projectId) {
  for (const list of Object.values(MISSION_PROPOSALS)) {
    const found = list.find((p) => p.id === projectId);
    if (found) return found;
  }
  return null;
}

/**
 * Total, max and percentage for a set of rubric scores. Returns null
 * until every criterion has been scored — a partial rubric producing a
 * grade would let a half-finished assessment look finished.
 */
export function missionScoreTotals(scores) {
  const values = MISSION_RUBRIC_CRITERIA.map((c) => scores?.[c.id]).filter((v) => typeof v === 'number');
  if (values.length !== MISSION_RUBRIC_CRITERIA.length) return null;
  const total = values.reduce((a, b) => a + b, 0);
  const max = MISSION_RUBRIC_CRITERIA.length * 4;
  return { total, max, pct: total / max };
}

/**
 * Assemble the feedback draft from the rubric scores.
 *
 * Deterministic, from the sentence bank above — not generated, and the
 * UI says so. Ordered strengths-first because feedback that opens with
 * what went wrong stops being read by paragraph two.
 */
export function draftMissionFeedback(scores, projectTitle) {
  const totals = missionScoreTotals(scores);
  if (!totals) return null;

  const strengths = [];
  const growth = [];
  for (const criterion of MISSION_RUBRIC_CRITERIA) {
    const level = scores[criterion.id];
    const sentence = FEEDBACK_SENTENCES[criterion.id]?.[level];
    if (!sentence) continue;
    (level >= 3 ? strengths : growth).push(sentence);
  }

  const opening = projectTitle ? `On ${projectTitle}:` : 'On this mission:';
  const parts = [opening];
  if (strengths.length) parts.push(strengths.join(' '));
  if (growth.length) parts.push(`Where to push next time: ${growth.join(' ')}`);
  if (!growth.length) parts.push('Nothing to fix on this one — pick a harder mission next quarter.');
  return parts.join('\n\n');
}

/**
 * Growth across the year — the comparison the plan asked for.
 *
 * The FIRST scored mission is the baseline, not a fixed Q1: if Q1 gets
 * skipped, Q2 becomes the starting point rather than the year silently
 * having no baseline at all.
 *
 * Reports per-criterion change, because the aggregate hides the useful
 * part. A student whose total barely moves while Iteration goes 1 → 4
 * has had the single most important year an engineer can have, and one
 * number would bury that completely.
 */
export function missionGrowth(evaluations = []) {
  const scored = evaluations
    .filter((e) => missionScoreTotals(e.scores))
    .sort((a, b) => MISSION_QUARTERS.indexOf(a.quarter) - MISSION_QUARTERS.indexOf(b.quarter));

  if (scored.length === 0) return { baseline: null, latest: null, points: [], byCriterion: [] };

  const points = scored.map((e) => ({
    quarter: e.quarter,
    title: e.customTitle || findProposal(e.projectId)?.title || 'Mission',
    ...missionScoreTotals(e.scores)
  }));

  const baseline = scored[0];
  const latest = scored[scored.length - 1];

  const byCriterion = MISSION_RUBRIC_CRITERIA.map((criterion) => {
    const from = baseline.scores[criterion.id];
    const to = latest.scores[criterion.id];
    return { id: criterion.id, label: criterion.label, from, to, change: to - from };
  });

  return {
    baseline: { quarter: baseline.quarter, ...missionScoreTotals(baseline.scores) },
    latest: { quarter: latest.quarter, ...missionScoreTotals(latest.scores) },
    points,
    // Only meaningful once there are two scored missions to compare.
    byCriterion: scored.length > 1 ? byCriterion : []
  };
}
