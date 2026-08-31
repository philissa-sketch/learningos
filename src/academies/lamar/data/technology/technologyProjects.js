// ---------------------------------------------------------------------------
// Hands-on Technology projects — Tier 1. Same infrastructure as
// aerospaceProjects.js and scienceExperiments.js: `category: 'experiment'`
// routes these through WritingPromptEngine/submitWritingEntry, so a completed
// project becomes a real Portfolio entry and a graded Writing Journal
// submission rather than an activity that disappears.
//
// WHY THESE EXIST (Aug 7, 2026): the parent set up a Tinkercad class for her
// son, and the four CAD/3D-modelling lessons he reaches first — Q1's CAD
// Fundamentals and 3D Modeling in roughly October, Q2's deep-dives in
// November/December — were entirely tool-neutral. They taught what CAD IS and
// never pointed him at software he could open. Without these, his first
// hands-on CAD would have been Q3, in January.
//
// Every project is free: Tinkercad requires no purchase and no hardware, and
// none of these needs a 3D printer to be worth doing. Where a print is
// mentioned it is explicitly optional.
// ---------------------------------------------------------------------------

export const technologyProjects = [
  {
    id: 'tech7-tinkercad-nameplate',
    subject: 'technology',
    tier: 1,
    category: 'experiment',
    title: 'Tinkercad Mission Nameplate',
    theme: 'CAD Fundamentals — designing before building, in real software',
    relatedLessonId: 'tech7-cad',
    toolUrl: 'https://www.tinkercad.com/3d-design',
    toolLabel: 'Open Tinkercad 3D Design',
    objectives:
      'Build a first real 3D design in Tinkercad by combining and subtracting shapes, and experience the lesson\'s central claim directly: that fixing a flaw digitally costs minutes and nothing else.',
    materials: [
      'A computer with a web browser',
      'A free Tinkercad account (join with the class code — no email needed)',
      'No hardware, no printer, no purchase required'
    ],
    procedure: [
      'Open Tinkercad and start a new 3D design.',
      'Drag a Box onto the workplane. This is the nameplate base.',
      'Use the ruler tool to set the base to an exact size — try 80 mm long, 30 mm wide, 4 mm tall. Type the numbers rather than dragging, so the dimensions are real.',
      'Drag the Text shape onto the base and type your name or a mission callsign.',
      'Raise the text so it sits on top of the base rather than sinking into it.',
      'Add one shape as a Hole — a cylinder set to Hole makes a hanging hole. Position it near one edge.',
      'Select everything and Group it. Watch the hole cut itself out of the solid.',
      'Change your mind on purpose: alter the base length to 100 mm and see what stays correct and what you now have to fix by hand.'
    ],
    safetyTips: [
      'This project is entirely on screen — there is nothing to cut, heat, or handle.',
      'Keep the Tinkercad account in the class your parent set up, so designs stay private.'
    ],
    concepts: ['CAD', 'Prototype', 'Design before building', 'Solids and holes', 'Exact dimensions'],
    difficulty: 'Beginner',
    estMinutes: 30,
    instructions:
      'Describe what you built and what happened when you changed the base length at the end. Which parts of your design updated correctly on their own, and which parts did you have to move yourself? Connect this to the lesson: what did designing it digitally let you find out that building it first would have cost you?',
    minWords: 60,
    iterationPrompt:
      'Build it again with one deliberate change — a different base shape, rounded corners, or the text carved INTO the base as a hole instead of raised on top. What did you change, and did it turn out the way you predicted before you grouped the shapes?'
  },
  {
    id: 'tech7-tinkercad-low-poly',
    subject: 'technology',
    tier: 1,
    category: 'experiment',
    title: 'Polygons You Can See',
    theme: '3D Modeling — polygon count, smoothness, and the size of a file',
    relatedLessonId: 'tech7-3d-modeling',
    toolUrl: 'https://www.tinkercad.com/3d-design',
    toolLabel: 'Open Tinkercad 3D Design',
    objectives:
      'See the low-poly versus high-poly tradeoff from the lesson with your own eyes, by building the same shape at two different levels of detail.',
    materials: [
      'A computer with a web browser',
      'A free Tinkercad account',
      'Optional: a 3D printer, if one is available — not required'
    ],
    procedure: [
      'Open a new Tinkercad design and drag a Cylinder onto the workplane.',
      'With the cylinder selected, open its Shape panel and find the Sides setting.',
      'Set Sides to 4. Look at it from above — it is a square, not a circle.',
      'Duplicate the shape and set the copy to 8 sides, then again at 20, then at 64.',
      'Line all four up side by side and look at them from directly above.',
      'Write down the number of sides at which it stops looking faceted to you, and view it again from a distance across the room.',
      'Add a Sphere and try the same thing if your version offers a detail setting.'
    ],
    safetyTips: [
      'Entirely on screen. If you do print one, an adult should handle the printer.'
    ],
    concepts: ['Polygon', 'Low-poly vs high-poly', 'Rendering', '3D model', 'Detail versus file size'],
    difficulty: 'Beginner',
    estMinutes: 25,
    instructions:
      'At how many sides did the cylinder stop looking faceted to you up close? Did that number change when you looked from across the room? Use your answer to explain why game studios deliberately use low-polygon models for objects far from the camera.',
    minWords: 60,
    iterationPrompt:
      'Try it once more with a shape that has a curve in two directions, like a sphere or a torus, rather than a cylinder. Does a curved-in-two-directions shape need more sides or fewer to look smooth? Predict first, then check.'
  },
  {
    id: 'tech7-tinkercad-parametric-shelf',
    subject: 'technology',
    tier: 1,
    category: 'experiment',
    title: 'The Change-One-Number Test',
    theme: 'Parametric Design — what breaks when a dimension changes',
    relatedLessonId: 'tech7-cad-2',
    toolUrl: 'https://www.tinkercad.com/3d-design',
    toolLabel: 'Open Tinkercad 3D Design',
    objectives:
      'Feel the difference between a model that absorbs a design change and one that quietly falls apart, which is the exact problem parametric CAD exists to solve.',
    materials: [
      'A computer with a web browser',
      'A free Tinkercad account'
    ],
    procedure: [
      'In Tinkercad, build a simple shelf: one long box for the shelf board, and two smaller boxes as brackets, one at each end.',
      'Use the ruler and type exact dimensions. Note them down — shelf length, bracket positions.',
      'Now change the shelf board length by 40 mm.',
      'Look carefully at what happened to the brackets. Are they still at the ends? Still evenly spaced?',
      'Fix the brackets by hand and count how many separate moves it took.',
      'Write down every measurement you had to correct manually.',
      'If you have access to Onshape, build the same shelf there using a symmetric constraint on the brackets, and repeat the length change.'
    ],
    safetyTips: [
      'Entirely on screen — nothing to handle.'
    ],
    concepts: ['Parametric design', 'Constraints', 'Design intent', 'Dimensions', 'Design change'],
    difficulty: 'Intermediate',
    estMinutes: 35,
    instructions:
      'How many separate corrections did you have to make by hand after changing one number? Which correction would have been easiest to forget? Explain, using the lesson, why forgetting one is more dangerous than the time it takes to fix them all.',
    minWords: 70,
    iterationPrompt:
      'Do it again, but before you change the length, write a prediction of exactly which parts will move on their own and which will not. Were you right? Being able to predict what a model will do when it changes is most of what makes a designer fast.'
  },
  {
    id: 'tech7-tinkercad-light-and-material',
    subject: 'technology',
    tier: 1,
    category: 'experiment',
    title: 'Same Model, Different Story',
    theme: '3D Modeling II — how surface and lighting change what a model communicates',
    relatedLessonId: 'tech7-3d-modeling-2',
    toolUrl: 'https://www.tinkercad.com/3d-design',
    toolLabel: 'Open Tinkercad 3D Design',
    objectives:
      'Test the lesson\'s claim that geometry is only half of what you see, by changing a model\'s appearance without touching its shape.',
    materials: [
      'A computer with a web browser',
      'A free Tinkercad account',
      'A phone or camera, or the browser\'s screenshot tool'
    ],
    procedure: [
      'Build or reuse any 3D model in Tinkercad — the nameplate or the shelf both work.',
      'Capture an image of it from a three-quarter angle.',
      'Change only the colour and surface of the shapes. Do not move or resize anything.',
      'Capture a second image from the exact same angle.',
      'Now rotate the VIEW so the light falls differently across the model, and capture a third image.',
      'Put the three images side by side.',
      'Write down one word describing the mood or impression each image gives.'
    ],
    safetyTips: [
      'Entirely on screen.'
    ],
    concepts: ['Texture', 'Rendering', 'Lighting', 'Geometry versus appearance', 'Communicating a design'],
    difficulty: 'Beginner',
    estMinutes: 25,
    instructions:
      'Your three images show identical geometry. Describe how differently they read. Then answer the engineering question: if the shape never changed, which of these images would you send to a machinist, and which would you put in a presentation? Why are those different answers?',
    minWords: 70,
    iterationPrompt:
      'Try to make the SAME model look deliberately unimpressive, then deliberately impressive, using only colour and viewing angle. What does that tell you about trusting a rendered image of something you have not measured?'
  }
];
