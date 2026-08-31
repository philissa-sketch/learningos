// ---------------------------------------------------------------------------
// Writing prompts — Phase 5 (Language Arts & Writing).
//
// These are NOT quiz lessons. There's no auto-gradable "correct answer" for
// an essay or a lab report, so these don't go through LessonEngine or count
// toward lesson-mastery/rank-gating (see ranks.js — only quiz lessons in
// `src/data/lessons/` do that). Instead they're free-text submissions saved
// to the `writingEntries` Dexie table via WritingPromptEngine.jsx, tracked
// by completion (skill prompts) or entry count (recurring project prompts).
//
// category: 'skill'   — one core writing type to practice; can be redone,
//                        but only the latest submission is the "current" one
// category: 'project' — recurring journal-style entries (the doc's actual
//                        "Projects" list); every submission is kept, forming
//                        a real journal over time, not a single completion
// ---------------------------------------------------------------------------

export const writingPrompts = [
  // ---- Skill prompts (doc: Paragraph writing, Essays, Creative writing,
  // Technical writing, Research papers, Lab reports, Engineering journals,
  // Persuasive writing, Presentation skills) ----
  {
    id: 'w7-paragraph',
    subject: 'reading',
    tier: 1,
    category: 'skill',
    title: 'Paragraph Writing: Topic Sentence & Support',
    theme: 'Building a single well-organized paragraph around one clear idea',
    instructions:
      'Write one paragraph (aim for at least 5 sentences) explaining why you think aerospace engineers need to understand both math and creativity. Start with a clear topic sentence that states your main point, then support it with at least two specific reasons or examples.',
    topicPool: [
      'Write one paragraph explaining which subject you find most challenging and why. Start with a clear topic sentence, then support it with at least two specific reasons or examples.',
      'Write one paragraph describing your ideal study routine. Start with a topic sentence, then support it with specific details.',
      'Write one paragraph explaining why teamwork matters on engineering projects. Start with a topic sentence and support it with at least two examples.',
      'Write one paragraph about a mistake you learned something valuable from. Start with a topic sentence and support it with specific details.',
      'Write one paragraph explaining what you think makes a good leader. Start with a topic sentence and support it with at least two reasons.'
    ],
    minWords: 60
  },
  {
    id: 'w7-essay',
    subject: 'reading',
    tier: 1,
    category: 'skill',
    title: 'Essay Writing: My Path to Aerospace Engineering',
    theme: 'Organizing an introduction, body, and conclusion around one central idea',
    instructions:
      "Write a short essay (aim for at least 3 paragraphs: an introduction, one or two body paragraphs, and a conclusion) about what first got you interested in aerospace engineering and what you're doing now to work toward that goal. Make sure your introduction states your main idea clearly, and your conclusion wraps it up.",
    topicPool: [
      'Write a short essay (introduction, body, conclusion) about a challenge you\u2019ve overcome and what it taught you.',
      'Write a short essay (introduction, body, conclusion) arguing for or against a longer school day, with clear reasoning.',
      'Write a short essay (introduction, body, conclusion) about a scientist or engineer you admire and why.',
      'Write a short essay (introduction, body, conclusion) describing your ideal design for a future space habitat.',
      'Write a short essay (introduction, body, conclusion) about how technology has changed daily life over the last ten years.'
    ],
    minWords: 150
  },
  {
    id: 'w7-creative-writing',
    subject: 'reading',
    tier: 1,
    category: 'skill',
    title: 'Creative Writing: First Flight',
    theme: 'Using descriptive detail and narrative structure in fiction',
    instructions:
      "Write a short creative story (aim for at least 150 words) about a character's first flight into space or their first successful test of an invention they built. Include how the character feels, at least one specific sensory detail (something they see, hear, or feel), and a clear beginning, middle, and end.",
    topicPool: [
      'Write a short story (150+ words) about an engineer solving an unexpected problem during a mission. Include a sensory detail and a clear beginning, middle, and end.',
      'Write a short story (150+ words) from the perspective of a rover exploring a new planet. Include a sensory detail and a clear beginning, middle, and end.',
      'Write a short story (150+ words) about a young inventor who builds something that changes their community. Include a sensory detail and a clear beginning, middle, and end.',
      'Write a short story (150+ words) about a difficult decision a character has to make under pressure. Include a sensory detail and a clear beginning, middle, and end.',
      'Write a short story (150+ words) imagining a day in your life twenty years from now. Include a sensory detail and a clear beginning, middle, and end.'
    ],
    minWords: 150
  },
  {
    id: 'w7-technical-writing',
    subject: 'reading',
    tier: 1,
    category: 'skill',
    title: 'Technical Writing: Write an Instruction Set',
    theme: 'Writing clear, precise, sequential technical instructions',
    instructions:
      'Write a numbered set of technical instructions (at least 6 steps) for a process you know well — building a paper airplane, assembling a simple model, or a school-morning routine. Each step should be a single, clear, precise action. Assume the reader has never done this before and needs every step spelled out.',
    topicPool: [
      'Write numbered step-by-step instructions (6+ steps) for safely handling and storing a set of tools. Assume the reader has never done this before.',
      'Write numbered step-by-step instructions (6+ steps) for setting up a simple science experiment. Assume the reader has never done this before.',
      'Write numbered step-by-step instructions (6+ steps) for troubleshooting a device that won\u2019t turn on. Assume the reader has never done this before.',
      'Write numbered step-by-step instructions (6+ steps) for properly citing a source in a research paper. Assume the reader has never done this before.',
      'Write numbered step-by-step instructions (6+ steps) for a safety procedure you think everyone should know. Assume the reader has never done this before.'
    ],
    minWords: 80
  },
  {
    id: 'w7-research-paper',
    subject: 'reading',
    tier: 1,
    category: 'skill',
    title: 'Research Paper: A Short Report',
    theme: 'Organizing researched facts into a structured written report',
    instructions:
      'Write a short research report (aim for at least 150 words) on one aerospace topic that interests you — a specific rocket, mission, spacecraft, or space agency. Include at least 3 specific facts, organize them logically, and end with a sentence about why this topic matters to you or to aerospace engineering.',
    topicPool: [
      'Write a short research report (150+ words) on a scientist or engineer\u2019s major discovery or invention. Include at least 3 specific facts.',
      'Write a short research report (150+ words) on a natural disaster and how communities prepare for it. Include at least 3 specific facts.',
      'Write a short research report (150+ words) on a historical invention that changed the world. Include at least 3 specific facts.',
      'Write a short research report (150+ words) on an animal species and its unique adaptations. Include at least 3 specific facts.',
      'Write a short research report (150+ words) on a country\u2019s space program and its major achievements. Include at least 3 specific facts.'
    ],
    minWords: 150
  },
  {
    id: 'w7-lab-report',
    subject: 'reading',
    tier: 1,
    category: 'skill',
    title: 'Lab Report: Document an Experiment',
    theme: 'Writing in the structured format scientists and engineers use to record experiments',
    instructions:
      'Write a short lab report for an experiment you\u2019ve done or could do (for example, a paper airplane distance test, or a balloon rocket). Include these four labeled sections: Hypothesis (what you predicted would happen), Materials (what you used), Procedure (what you did, step by step), and Results/Conclusion (what actually happened and what you learned).',
    topicPool: [
      'Write a lab report (Hypothesis, Materials, Procedure, Results/Conclusion) for an experiment testing how added weight affects a paper airplane\u2019s flight distance.',
      'Write a lab report (Hypothesis, Materials, Procedure, Results/Conclusion) for an experiment testing which material insulates heat best.',
      'Write a lab report (Hypothesis, Materials, Procedure, Results/Conclusion) for an experiment testing how surface angle affects a ball\u2019s rolling speed.',
      'Write a lab report (Hypothesis, Materials, Procedure, Results/Conclusion) for an experiment testing which bridge design holds the most weight.',
      'Write a lab report (Hypothesis, Materials, Procedure, Results/Conclusion) for an experiment testing how temperature affects a reaction\u2019s speed.'
    ],
    minWords: 100
  },
  {
    id: 'w7-engineering-journal',
    subject: 'reading',
    tier: 1,
    category: 'skill',
    title: 'Engineering Journal: Practice Entry',
    theme: 'Recording engineering thinking in the reflective format real engineers use daily',
    instructions:
      "Write a practice engineering journal entry about something you're currently working on or curious about — a math concept, a project idea, or a question about how something in aerospace works. Describe what you're trying to figure out, what you've tried or learned so far, and what you want to explore next.",
    topicPool: [
      'Write a journal entry about a design problem you haven\u2019t solved yet and your ideas for solving it.',
      'Write a journal entry reflecting on a recent failure or mistake and what you\u2019d do differently next time.',
      'Write a journal entry describing a tool or piece of technology you wish existed and why.',
      'Write a journal entry about a skill you want to improve and your plan for improving it.',
      'Write a journal entry describing the most interesting thing you learned this week and why it stood out.'
    ],
    minWords: 60
  },
  {
    id: 'w7-persuasive-writing',
    subject: 'reading',
    tier: 1,
    category: 'skill',
    title: 'Persuasive Writing: Make the Case',
    theme: 'Building a persuasive argument with reasons and evidence, not just opinion',
    instructions:
      'Write a short persuasive piece (aim for at least 100 words) arguing for something you believe — for example, that human missions to Mars are worth the cost and risk, or that every student should learn to code. State your position clearly, then give at least two supporting reasons, and address one objection someone might raise against your position.',
    topicPool: [
      'Write a persuasive piece (100+ words) arguing that schools should teach more hands-on engineering projects. State your position, give two reasons, and address one objection.',
      'Write a persuasive piece (100+ words) arguing for or against using AI tools to help with schoolwork. State your position, give two reasons, and address one objection.',
      'Write a persuasive piece (100+ words) arguing that space exploration funding should increase. State your position, give two reasons, and address one objection.',
      'Write a persuasive piece (100+ words) arguing for a change you\u2019d like to see in your community. State your position, give two reasons, and address one objection.',
      'Write a persuasive piece (100+ words) arguing that failure is a necessary part of learning. State your position, give two reasons, and address one objection.'
    ],
    minWords: 100
  },
  {
    id: 'w7-presentation-skills',
    subject: 'reading',
    tier: 1,
    category: 'skill',
    title: 'Presentation Skills: Draft Your Talking Points',
    theme: 'Organizing spoken content into clear, presentable notes — the foundation of public speaking',
    instructions:
      "Imagine you have 2 minutes to present one aerospace topic to your class. Write your talking points as a short outline: an opening line to grab attention, 2-3 main points in the order you'd say them, and a closing line. This is notes to speak from, not a script to read word-for-word.",
    topicPool: [
      'Draft talking points (opening line, 2-3 main points, closing line) for a 2-minute presentation about your favorite hobby and why it matters to you.',
      'Draft talking points (opening line, 2-3 main points, closing line) for a 2-minute presentation persuading classmates to support a cause you care about.',
      'Draft talking points (opening line, 2-3 main points, closing line) for a 2-minute presentation explaining how something you built or made works.',
      'Draft talking points (opening line, 2-3 main points, closing line) for a 2-minute presentation about a book or article that changed how you think.',
      'Draft talking points (opening line, 2-3 main points, closing line) for a 2-minute presentation introducing yourself to a new team.'
    ],
    minWords: 60
  },

  // ---- Project prompts (doc's "Projects include" list — recurring) ----
  {
    id: 'w7-mission-report',
    subject: 'reading',
    tier: 1,
    category: 'project',
    title: 'Mission Report',
    theme: "A recurring log of what you're working on and learning, mission by mission",
    instructions:
      "Write a mission report on your recent work: what subject or lesson you focused on, what you accomplished, one thing that was difficult, and one thing you're proud of. Mission reports are meant to be written regularly — come back and write a new one anytime.",
    minWords: 50
  },
  {
    id: 'w7-space-journal',
    subject: 'reading',
    tier: 1,
    category: 'project',
    title: 'Space Journal',
    theme: 'An ongoing personal journal about space, curiosity, and your own aerospace journey',
    instructions:
      "Write a space journal entry about anything space-related on your mind lately — a mission you read about, a question you have, or something you're excited or curious about. This is your personal space journal — there's no wrong entry, and you can add a new one anytime.",
    minWords: 50
  },
  {
    id: 'w7-engineering-notebook',
    subject: 'reading',
    tier: 1,
    category: 'project',
    title: 'Engineering Notebook',
    theme: 'A running record of engineering ideas, problems, and solutions over time',
    instructions:
      'Write an engineering notebook entry documenting a problem you\u2019re trying to solve, a design idea you have, or something you built or want to build. Real engineers keep notebooks like this throughout their whole careers — add a new entry whenever you have something worth recording.',
    minWords: 50
  },
  {
    id: 'w7-design-documentation',
    subject: 'reading',
    tier: 1,
    category: 'project',
    title: 'Design Documentation',
    theme: 'Documenting the specifications and reasoning behind a design',
    instructions:
      "Write design documentation for something you've designed or imagined — a rocket, a robot, a gadget, anything. Describe its purpose, its key parts or features, and why you made the design choices you did. Good design documentation lets someone else understand your design without you there to explain it.",
    minWords: 60
  },
  {
    id: 'w7-scientific-observation',
    subject: 'reading',
    tier: 1,
    category: 'project',
    title: 'Scientific Observation',
    theme: 'Recording careful, objective observations — a core scientific skill',
    instructions:
      'Write a scientific observation entry: pick something happening around you right now (weather, a plant, an object in motion, anything) and describe exactly what you observe, using specific and measurable details where you can (time, size, color, speed, changes over time). Stick to what you actually observe, not guesses about why it happens.',
    minWords: 50
  }
];

export function getPromptById(promptId) {
  return writingPrompts.find((p) => p.id === promptId) || null;
}
