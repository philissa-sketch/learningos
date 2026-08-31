// Engineer Readiness — a soft/practical-skill badge track (Part 5, built
// Aug 6, 2026). These are the engineering skills no academic test measures, so
// unlike the automatic Achievement Badges they are PARENT-AWARDED: the parent
// sets each skill's level (Bronze → Silver → Gold) as she sees him demonstrate
// it in real projects, presentations, and problem-solving. Runs alongside the
// academic tracking, never instead of it (per PROJECT_PLAN.md Part 0/Part 5).
//
// ---- THE RUBRIC (added Aug 8, 2026) ----
//
// Every skill now carries an observable descriptor per level. Before this,
// eleven skills had three levels each and NOTHING anywhere said what any of
// them required. That failed both people: the student could not aim at an
// award whose criteria were never stated, and the parent was grading from gut
// feel with no standard to stay consistent against across six years.
//
// Two rules shaped the wording:
//
//   1. OBSERVABLE, not internal. Every line describes something a parent can
//      watch happen. "Understands the design process" is unusable; "runs the
//      full loop and records what he changed and why" can be witnessed.
//
//   2. The ladder is INDEPENDENCE, not volume. Bronze is doing it with a
//      prompt or a starting point; Silver is doing it unprompted and
//      explaining the choice; Gold is doing it in open-ended situations and
//      making other people better at it. That progression is what a college
//      engineering program actually looks for, and it is why this track
//      matters more than it appears: a homeschool transcript struggles to
//      evidence soft skills, and dated levels against a written standard are
//      exactly that evidence.

export const READINESS_LEVELS = ['Bronze', 'Silver', 'Gold'];

// Rank of a level for comparisons/progress (0 = not yet awarded).
export const LEVEL_RANK = { Bronze: 1, Silver: 2, Gold: 3 };

// Tailwind text/border color per level, matched to the app palette.
export const LEVEL_STYLE = {
  Bronze: { text: 'text-amber-500', ring: 'border-amber-500/50', bg: 'bg-amber-500/10' },
  Silver: { text: 'text-ink-300', ring: 'border-ink-300/50', bg: 'bg-ink-300/10' },
  Gold: { text: 'text-signal-amber', ring: 'border-signal-amber/50', bg: 'bg-signal-amber/10' }
};

export const READINESS_SKILLS = [
  { id: 'problem-solving', name: 'Problem Solving', icon: '🧩', desc: 'Breaks big problems into steps and finds a path forward.',
    levels: {
      Bronze: 'Breaks a problem into steps when prompted, and keeps going after a first attempt fails.',
      Silver: 'Breaks down unfamiliar problems without being asked, tries more than one approach, and can say why he chose the one he used.',
      Gold: 'Takes on open-ended problems with no method given, notices early when an approach is not working and changes it, and can walk someone else through his reasoning.'
    }
   },
  { id: 'critical-thinking', name: 'Critical Thinking', icon: '🧠', desc: 'Weighs evidence, questions assumptions, reasons carefully.',
    levels: {
      Bronze: 'Asks how we know something is true, and can tell a fact from an opinion when prompted.',
      Silver: 'Questions claims on his own, checks whether the evidence actually supports the conclusion, and notices when information is missing.',
      Gold: 'Identifies the assumptions underneath an argument, weighs sources that disagree, and changes his mind when the evidence warrants it.'
    }
   },
  { id: 'research', name: 'Research', icon: '🔎', desc: 'Finds, checks, and organizes reliable information.',
    levels: {
      Bronze: 'Finds relevant information when given a starting point, and writes down where it came from.',
      Silver: 'Chooses his own sources, checks more than one, and can explain why a source is trustworthy.',
      Gold: 'Tells primary sources from secondary, cites consistently, and combines several sources into a conclusion that is his own.'
    }
   },
  { id: 'design-process', name: 'Design Process', icon: '📐', desc: 'Plans, prototypes, tests, and improves a design.',
    levels: {
      Bronze: 'Sketches or plans before building, and tests the result instead of assuming it works.',
      Silver: 'Runs the full loop - plan, prototype, test, improve - and records what he changed and why.',
      Gold: 'Designs against stated constraints, iterates on test data rather than guesses, and can justify the trade-offs he made.'
    }
   },
  { id: 'coding', name: 'Coding', icon: '💻', desc: 'Writes and debugs programs to make things work.',
    levels: {
      Bronze: 'Reads and changes existing code, and fixes simple errors with help.',
      Silver: 'Writes a working program from a description, debugs it himself, and uses variables, loops and conditions correctly.',
      Gold: 'Breaks a program into functions, tests it deliberately, explains what each part does, and can read unfamiliar code.'
    }
   },
  { id: 'cad', name: 'CAD', icon: '🖥️', desc: 'Models parts and designs in computer-aided design tools.',
    levels: {
      Bronze: 'Moves around the tool confidently and creates basic shapes to a given dimension.',
      Silver: 'Models a multi-part object with correct dimensions, and revises a model without starting over.',
      Gold: 'Designs to real tolerances, models assemblies that fit together, and produces drawings someone else could build from.'
    }
   },
  { id: 'robotics', name: 'Robotics', icon: '🤖', desc: 'Builds and programs machines that sense and move.',
    levels: {
      Bronze: 'Assembles from instructions and runs a program that was given to him.',
      Silver: 'Builds and programs a robot to do a task he chose, and works out why it failed when it does.',
      Gold: 'Designs the mechanism and the control together for an open goal, tunes it using sensor feedback, and troubleshoots systematically.'
    }
   },
  { id: 'technical-writing', name: 'Technical Writing', icon: '📝', desc: 'Explains how something works, clearly and precisely.',
    levels: {
      Bronze: 'Writes step-by-step instructions another person can actually follow.',
      Silver: 'Explains how something works using the right terms, and writes for a reader who was not there.',
      Gold: 'Produces a full report - purpose, method, results, conclusion - precise enough that someone could repeat the work from it.'
    }
   },
  { id: 'public-speaking', name: 'Public Speaking', icon: '🎤', desc: 'Presents ideas confidently to an audience.',
    levels: {
      Bronze: 'Presents prepared material to family, audible and looking up from the page.',
      Silver: 'Presents without reading it out, handles questions, and adjusts when the room is not following.',
      Gold: 'Presents to people he does not know, explains technical work to non-experts, and handles questions he did not expect.'
    }
   },
  { id: 'teamwork', name: 'Teamwork', icon: '🤝', desc: 'Collaborates, shares the load, and lifts the group.',
    levels: {
      Bronze: 'Does his share and listens without interrupting.',
      Silver: 'Takes the part that needs doing rather than the part he would prefer, and gives and takes feedback without getting defensive.',
      Gold: 'Notices what the group is missing and fills it, works through disagreement without escalating, and makes the people around him more effective.'
    }
   },
  { id: 'leadership', name: 'Leadership', icon: '⭐', desc: 'Takes initiative and helps others do their best work.',
    levels: {
      Bronze: 'Takes initiative on something without being told to.',
      Silver: 'Organizes a task other people depend on, follows through, and asks for help before it is too late.',
      Gold: 'Sets the direction for a project, hands out work and trusts it, and owns it publicly when something goes wrong.'
    }
   }
];

export function skillById(id) {
  return READINESS_SKILLS.find((s) => s.id === id) || null;
}

/** The level after `current` ('Bronze' when nothing is awarded yet), or null at Gold. */
export function nextLevel(current) {
  if (!current) return 'Bronze';
  const i = READINESS_LEVELS.indexOf(current);
  return i >= 0 && i < READINESS_LEVELS.length - 1 ? READINESS_LEVELS[i + 1] : null;
}

/** What has to be shown to reach `level` in `skillId`. */
export function criteriaFor(skillId, level) {
  const skill = skillById(skillId);
  return (skill && skill.levels && skill.levels[level]) || null;
}
