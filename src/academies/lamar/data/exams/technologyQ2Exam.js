// ---------------------------------------------------------------------------
// Technology & Computer Science Q2 2026-2027 Quarterly Cumulative Exam
//
// Same confirmed assessment framework as Aerospace's and Social Studies'
// quarterly exams (see docs/PROJECT_LOG.md): cumulative items covering
// ONLY material actually taught in this quarter's 10 lessons — the "Part
// II" deep-dive topics (Python II, Cybersecurity II, JavaScript II,
// Blockly II, HTML II, CSS II, AI II, CAD II, 3D Modeling II,
// Automation II).
//
// AUG 9 2026 — SIXTEEN LESSONS AND 24 ITEMS UNTIL THIS DATE. Q2 spans 22 fewer
// days than Q1 and was carrying the same 16 lessons, so Typing II, Digital
// Citizenship II, Google Workspace II, Microsoft Office II, Internet Research II
// and Scratch II moved into Q1 behind their Part I halves. What stayed is the
// build-heavy half of the deep dives, which is what "Building & Creating" means.
// Their eight items went into the Q1 exam rather than being cut: this exam tests
// what Q2 teaches, and that is now 16 items over 10 lessons. tech7-robotics-
// programming-2 is NOT covered here — it sits at the end of
// technologyLessons7 but was deliberately left out of this rebuild/exam
// gating (see technology7.js header and src/data/lessons/index.js).
//
// ARCHITECTURE NOTE: same pattern as every other quarterly exam — no
// novaIntro, isQuarterlyExam: true, unlocksAfter listing all 10 real Q2
// lesson ids so Roster/gating logic requires them completed first. This
// exam is CUMULATIVE for Q2's own content, matching the Q1 exam's scope
// approach (it does not re-test Q1's 16 lessons, which Q1's own exam
// already covers).
//
// Format: 16 items, roughly 1.6 per lesson, multiple choice.
// ---------------------------------------------------------------------------

export const technologyQ2Exam = {
  id: 'exam-technology-q2-2026-2027',
  subject: 'technology',
  tier: 1,
  quarter: 'Q2 2026-2027',
  title: 'Quarterly Exam — Technology & CS Deep Dives (Q2)',
  theme: 'Cumulative exam covering Python II, Cybersecurity II, JavaScript II, Blockly II, HTML II, CSS II, AI II, CAD II, 3D Modeling II, and Automation II',
  isQuarterlyExam: true,
  // SIXTEEN IDS UNTIL AUG 9 2026. Six of them belong to Q1 now and are gated by
  // the Q1 exam; gating them again here would hold this exam behind lessons it
  // no longer tests.
  unlocksAfter: [
    'tech7-python-2', 'tech7-cybersecurity-2', 'tech7-javascript-2', 'tech7-blockly-2',
    'tech7-html-2', 'tech7-css-2', 'tech7-artificial-intelligence-2', 'tech7-cad-2',
    'tech7-3d-modeling-2', 'tech7-automation-2'
  ],
  questions: [
    { id: 'q1', type: 'choice', prompt: 'In Python, which of these correctly creates a list of three numbers?', choices: ['numbers = [1, 2, 3]', 'numbers = (1, 2, 3) only', 'numbers = {1, 2, 3} as a list', 'numbers = 1, 2, 3 without brackets'], answer: 0, explanation: 'Python lists are created with square brackets.', choiceFeedback: [null, 'Parentheses create a tuple, a different structure.', 'Curly braces create a set/dictionary, not a list.', 'This creates a tuple without explicit parentheses, not a list.'], xp: 10 },
    { id: 'q2', type: 'choice', prompt: 'What is a "VPN" (Virtual Private Network) commonly used for?', choices: ["Encrypting internet traffic and hiding a user's location/IP address for privacy and security", "Speeding up a computer's processor", 'Printing documents securely', 'Charging a phone faster'], answer: 0, explanation: 'A VPN encrypts internet traffic and can hide a user\'s location.', choiceFeedback: [null, 'Unrelated to CPU speed.', 'Unrelated to printing.', 'Unrelated to battery charging.'], xp: 10 },
    { id: 'q3', type: 'choice', prompt: 'In JavaScript, which of these correctly creates an array (list) of three numbers?', choices: ['let numbers = [1, 2, 3];', 'let numbers = (1, 2, 3);', 'let numbers = {1, 2, 3};', 'let numbers = 1, 2, 3;'], answer: 0, explanation: 'JavaScript arrays are created with square brackets.', choiceFeedback: [null, 'Parentheses do not create an array.', 'Curly braces are for objects.', 'This creates three separate variables, not an array.'], xp: 10 },
    { id: 'q4', type: 'choice', prompt: 'What is "debugging," the process of finding and fixing errors in a program?', choices: ["Reviewing the blocks step by step to find where the logic doesn't produce the expected result", 'Deleting the entire program and starting over every time', 'A process that has no practical use', 'Only relevant to text-based coding, not block-based'], answer: 0, explanation: 'Debugging means reviewing the logic step by step to find where it fails.', choiceFeedback: [null, 'Effective debugging isolates the problem rather than deleting everything.', 'Debugging is one of the most useful programming skills.', 'Debugging is equally relevant to block-based tools like Blockly.'], xp: 10 },
    { id: 'q5', type: 'choice', prompt: 'What HTML tag is commonly used to create an ordered (numbered) list?', choices: ['<ol>', '<ul>', '<table>', '<span>'], answer: 0, explanation: '<ol> creates an ordered (numbered) list in HTML.', choiceFeedback: [null, '<ul> creates an unordered (bulleted) list.', '<table> creates a grid, not a simple list.', '<span> is a generic inline container.'], xp: 10 },
    { id: 'q6', type: 'choice', prompt: 'In CSS, what does a class selector look like when targeting an element with class="highlight"?', choices: ['.highlight', '#highlight', 'highlight{}', '*highlight'], answer: 0, explanation: 'CSS class selectors start with a period, like .highlight.', choiceFeedback: [null, 'A hash starts an ID selector.', 'Missing the period that marks a class selector.', 'An asterisk is the universal selector symbol.'], xp: 10 },
    { id: 'q7', type: 'choice', prompt: 'What is a "neural network," a common structure used in modern AI systems?', choices: ['A system of connected nodes loosely inspired by how neurons in the brain process information', 'A physical network of computer cables only', 'A type of computer virus', 'A synonym for the internet'], answer: 0, explanation: 'A neural network is a system of connected nodes loosely inspired by biological neurons.', choiceFeedback: [null, 'Confuses a software structure with physical cables.', 'Not malware.', 'Not the same as the internet.'], xp: 10 },
    { id: 'q8', type: 'choice', prompt: 'What does "parametric design" mean in modern CAD software?', choices: ["The model's dimensions are linked by rules, so changing one measurement automatically adjusts connected parts", 'Every dimension must be changed manually with no automatic updates', 'Parametric design only applies to 2D drawings', 'CAD models cannot have linked dimensions'], answer: 0, explanation: 'Parametric design links dimensions by rules, so changes propagate automatically.', choiceFeedback: [null, 'This is the opposite of parametric design.', 'Parametric design is used extensively in 3D modeling.', 'Linked dimensions are exactly what parametric design provides.'], xp: 10 },
    { id: 'q9', type: 'choice', prompt: 'In 3D modeling, what does a "texture" add to a model\'s surface?', choices: ['Color, pattern, or surface detail that makes the model look more realistic', 'Additional physical mass to the model', "A change to the model's underlying geometry only", 'Sound effects for the model'], answer: 0, explanation: 'Textures add color, pattern, or surface detail, making a model look more realistic.', choiceFeedback: [null, 'A texture is purely visual.', 'Texture affects appearance, not underlying geometry.', 'Textures are visual, unrelated to sound.'], xp: 10 },
    { id: 'q10', type: 'choice', prompt: 'What is a "feedback loop," in the context of automated systems?', choices: ["A process where a system's output is measured and used to adjust its future behavior", "A process with no connection to a system's performance", 'A one-time action with no repeated adjustment', 'A synonym for a computer virus'], answer: 0, explanation: 'A feedback loop measures a system\'s output and uses it to adjust future behavior.', choiceFeedback: [null, 'Directly connected to performance.', 'A feedback loop is specifically a repeating cycle.', 'Not malware.'], xp: 10 },
    { id: 'q11', type: 'choice', prompt: 'In Python, what does the "else" keyword do when paired with an "if" statement?', choices: ['Runs code only when the if condition is false', 'Runs code only when the if condition is true', 'Ends the program immediately', 'Repeats the if statement forever'], answer: 0, explanation: "'else' runs its code block only when the paired 'if' condition is false.", choiceFeedback: [null, 'That describes the if block itself.', 'else provides an alternative path, not an end.', 'else is not a loop.'], xp: 10 },
    { id: 'q12', type: 'choice', prompt: 'What is "social engineering," as a cybersecurity term?', choices: ['Manipulating people into revealing confidential information or taking unsafe actions', 'A type of computer hardware', 'A programming language for social media apps', 'A type of encryption algorithm'], answer: 0, explanation: 'Social engineering manipulates people, rather than technology, to gain unauthorized access or information.', choiceFeedback: [null, 'Not hardware.', 'Not a programming language.', 'Unrelated to encryption algorithms.'], xp: 10 },
    { id: 'q13', type: 'choice', prompt: 'What does the CSS "box model" describe?', choices: ["How margin, border, padding, and content combine to determine an element's total size", 'A model of physical shipping boxes', 'A type of animation only', 'A method for storing images only'], answer: 0, explanation: 'The box model describes how margin, border, padding, and content determine total size.', choiceFeedback: [null, 'Conceptual, not literal boxes.', 'About sizing, not animation.', 'About element sizing, not image storage.'], xp: 10 },
    { id: 'q14', type: 'choice', prompt: 'Why might an engineer use CAD constraint tools, such as making two lines always stay parallel?', choices: ['Constraints help maintain specific relationships in a design even as other parts change', 'Constraints have no functional purpose in CAD', 'Constraints only apply to text documents', 'Constraints prevent any editing of a model'], answer: 0, explanation: 'Constraints maintain specific design relationships even as other parts of the model change.', choiceFeedback: [null, 'Constraints serve a real, important function.', 'A CAD/geometric concept, unrelated to text documents.', 'Constraints maintain specific relationships, not block all editing.'], xp: 10 },
    { id: 'q15', type: 'choice', prompt: 'Why is lighting an important consideration when rendering a 3D model?', choices: ['Lighting affects how shapes, shadows, and materials appear, significantly changing the final look', 'Lighting has no effect on a rendered image', '3D models render identically regardless of lighting', 'Lighting only matters for 2D images'], answer: 0, explanation: 'Lighting significantly affects how shapes, shadows, and materials appear in a render.', choiceFeedback: [null, 'Lighting has a major, well-documented effect.', 'Models can look dramatically different under different lighting.', 'Lighting is a core 3D rendering consideration.'], xp: 10 },
    { id: 'q16', type: 'choice', prompt: 'In JavaScript, which comparison operator checks if two values are strictly equal, including type?', choices: ['===', '=', '->', '::'], answer: 0, explanation: "'===' checks strict equality (value and type) between two values in JavaScript.", choiceFeedback: [
          null,
          "A single = ASSIGNS a value: x = 5 puts 5 into x. It does not ask a question, so it can never compare.",
          "-> is not a JavaScript operator. You may be thinking of the arrow function =>, which creates a function.",
          ":: is not JavaScript at all. Strict equality is three equals signs: ==="
        ], xp: 10 }
  ]
};
