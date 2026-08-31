// ---------------------------------------------------------------------------
// DAILY WRITING DRILLS — one named structure a day, Monday to Thursday.
//
// ---- WHY THIS EXISTS (Aug 13, 2026) ----
//
// The parent: "I want Lamar to have daily journals, not weekly. He needs
// assistance building ELA and I think that will help him to begin to create
// structural sentences and paragraphs."
//
// She was right about the gap, and the gap was bigger than the cadence. Before
// this file, the Writing Journal was 14 distinct prompts spread over 42 weeks
// (repeating — "Mission Report" seven times), written into a bare textarea with
// no scaffolding, and graded with a single letter that reached nothing. The one
// piece of structural teaching in the whole feature was a sentence inside the
// prompt text: "Start with a clear topic sentence."
//
// Nobody had ever said sentence structure COULD NOT be graded. What the app
// said was narrower and true — there is no automated way to score real
// composition — and it had quietly hardened into "so we don't teach structure
// at all." Composition was assigned to the journal and mechanics to Khan, and
// the thing in between, SENTENCE AND PARAGRAPH CONSTRUCTION, was assigned to
// nobody.
//
// ---- THE DESIGN ----
//
// Monday to Thursday: one drill, one named structure, 10-15 minutes. Friday is
// the week's real piece from the existing weekly schedule — the drills are
// chosen to build toward it, so by Friday he has already practised the moves
// the piece needs.
//
// Every drill carries the same four things, because a drill without them is
// just a prompt with a smaller word count:
//
//   teach   — what the structure IS, in two or three sentences he can read
//   weak    — a real example of the thing done badly
//   strong  — the same idea done well, so the difference is visible, not stated
//   task    — what to write, naming the structure he is practising
//
// `checkFor` is the parent's grading line and his self-check: the one thing
// this drill is actually about. It is what makes a two-minute read possible
// five days a week.
//
// ---- SIZED FOR A FULL YEAR ----
//
// Per the standing rule in the project log: content is sized for a full school
// year, not sampled. 43 weeks x 4 days = 172 drills, every one distinct. A pool
// that repeats is how the weekly journal ended up showing "done" for work he
// had never written.
//
// The ladder, by quarter:
//   Q1  wks 1-9    the sentence          complete -> compound -> complex -> varied
//   Q2  wks 10-18  the paragraph         topic -> support -> evidence -> conclude
//   Q3  wks 19-27  multi-paragraph       thesis -> intro/body/conclusion -> genre
//   Q4  wks 28-36  revision and voice    active -> concise -> precise -> proofread
//
// Aerospace-themed wherever the theme does not distort the skill. A drill about
// commas should be about commas; dressing it in rockets to be on-brand is how
// you get a lesson that teaches neither.
// ---------------------------------------------------------------------------

/**
 * @typedef {object} DailyDrill
 * @property {string} id           wd-w<week>-d<day>
 * @property {number} week         1-36, school week
 * @property {number} day          1-4, Monday through Thursday
 * @property {string} skill        stable id for the structure being drilled
 * @property {string} skillLabel   what to call it on screen and in the gradebook
 * @property {string} title
 * @property {string} teach        2-3 sentences: what the structure is
 * @property {string} weak         the move done badly
 * @property {string} strong       the same idea done well
 * @property {string} task         what to write
 * @property {string} checkFor     the ONE thing to look for when reading it
 * @property {number} minSentences advisory floor, never blocks submission
 */

export const DAILY_DRILL_MINUTES = 15;

import { dailyDrillsQ2 } from './dailyDrillsQ2.js';
import { dailyDrillsQ3 } from './dailyDrillsQ3.js';
import { dailyDrillsQ4 } from './dailyDrillsQ4.js';

/**
 * Q1 is written out below; Q2, Q3 and Q4 live in their own files. That split is
 * for the person editing them, not for the code — a 1,200-line array is not
 * something a parent can scan to see what her son is doing in March. The export
 * at the bottom is still one flat list in week order.
 */
const dailyDrillsQ1 = [
  // ===========================================================================
  // Q1 — THE SENTENCE (weeks 1-9)
  // ===========================================================================

  // ---- Week 1: a sentence is a complete thought ----
  {
    id: 'wd-w01-d1', week: 1, day: 1, skill: 'complete-sentence',
    skillLabel: 'Complete sentences',
    title: 'Every sentence needs a who and a did-what',
    teach: 'A sentence has two jobs to fill: a subject (who or what it is about) and a predicate (what that subject does or is). If either one is missing, it is a fragment — it leaves the reader waiting.',
    weak: 'Because the rocket was too heavy.',
    strong: 'The rocket did not reach orbit because it was too heavy.',
    task: 'Write 4 sentences about something you built, fixed, or figured out this week. Underline the subject of each one by putting it in CAPITALS.',
    checkFor: 'Does every sentence have a subject and a verb? No fragments.',
    minSentences: 4
  },
  {
    id: 'wd-w01-d2', week: 1, day: 2, skill: 'complete-sentence',
    skillLabel: 'Complete sentences',
    title: 'Fixing fragments',
    teach: 'A fragment is a piece of a sentence pretending to be a whole one. The usual fix is to add the missing part, or to join it to the sentence next to it.',
    weak: 'Sitting on the launch pad. Waiting for the countdown.',
    strong: 'The rocket sat on the launch pad, waiting for the countdown.',
    task: 'Here are 4 fragments. Rewrite each as a complete sentence: (1) Flying above the clouds. (2) Because the engine stalled. (3) The three astronauts and the mission commander. (4) Which is why the wing is curved.',
    checkFor: 'All four rewritten as complete sentences, each with a subject and a verb.',
    minSentences: 4
  },
  {
    id: 'wd-w01-d3', week: 1, day: 3, skill: 'complete-sentence',
    skillLabel: 'Complete sentences',
    title: 'Run-ons: two sentences wearing one coat',
    teach: 'A run-on jams two complete sentences together with no punctuation, or with only a comma. Fix it with a period, or with a comma AND a joining word like and, but, or so.',
    weak: 'The engine fired the rocket lifted off it climbed fast.',
    strong: 'The engine fired. The rocket lifted off, and it climbed fast.',
    task: 'Rewrite these as correct sentences: (1) I checked the wing it was cracked I told my mom. (2) The test failed we tried again the second one worked. Then write 2 run-ons of your own and fix them underneath.',
    checkFor: 'Run-ons split correctly with periods or comma + joining word.',
    minSentences: 4
  },
  {
    id: 'wd-w01-d4', week: 1, day: 4, skill: 'complete-sentence',
    skillLabel: 'Complete sentences',
    title: 'Four clean sentences in a row',
    teach: 'This is the week put together. Four sentences, all complete, no fragments, no run-ons. Read each one out loud on its own — if it can stand alone and make sense, it is a sentence.',
    weak: 'Aerospace engineering. Because I like building things and also space is interesting it is my favourite.',
    strong: 'I want to be an aerospace engineer. I like building things and taking them apart. Space interests me more than anything else I study. Someday I want to design a rocket that flies.',
    task: 'Write 5 complete sentences explaining why aerospace engineering interests you. Read each one aloud on its own before you move to the next.',
    checkFor: 'Five sentences, every one complete on its own. No fragments, no run-ons.',
    minSentences: 5
  },

  // ---- Week 2: sentence kinds and end punctuation ----
  {
    id: 'wd-w02-d1', week: 2, day: 1, skill: 'sentence-kinds',
    skillLabel: 'Sentence kinds',
    title: 'Statements, questions, commands',
    teach: 'A statement tells (ends with a period). A question asks (question mark). A command instructs (period, and the subject "you" is understood). Good writing uses all three instead of one over and over.',
    weak: 'You should check the fuel. You should check the wiring. You should check the hatch.',
    strong: 'Check the fuel. Is the wiring secure? Now seal the hatch.',
    task: 'Write a short pre-flight check for a paper rocket using at least one statement, one question and one command. Label each sentence S, Q or C at the end.',
    checkFor: 'All three kinds used, and correctly labelled.',
    minSentences: 4
  },
  {
    id: 'wd-w02-d2', week: 2, day: 2, skill: 'sentence-kinds',
    skillLabel: 'Sentence kinds',
    title: 'Exclamations, and why they get boring fast',
    teach: 'An exclamation shows strong feeling. It works because it is rare. Three exclamation marks in a row and the reader stops believing any of them.',
    weak: 'The launch was amazing! The rocket went so high! It was the best day ever!',
    strong: 'The rocket cleared the treeline before I had finished counting. It was the highest one we had ever flown.',
    task: 'Write 5 sentences about something exciting, using AT MOST one exclamation mark. Make the excitement come from what you describe, not from the punctuation.',
    checkFor: 'One exclamation mark or none. The excitement is in the details.',
    minSentences: 5
  },
  {
    id: 'wd-w02-d3', week: 2, day: 3, skill: 'sentence-kinds',
    skillLabel: 'Sentence kinds',
    title: 'Commas in a list',
    teach: 'When you list three or more things, separate them with commas. The comma before the final "and" is optional in some styles — pick one and be consistent. In technical writing, keep it: it prevents confusion.',
    weak: 'I packed the altimeter parachute and the recovery wadding.',
    strong: 'I packed the altimeter, the parachute, and the recovery wadding.',
    task: 'Write 4 sentences, each containing a list of at least three items, about things you use for school, a project, or a trip.',
    checkFor: 'Commas correctly separating every item in every list.',
    minSentences: 4
  },
  {
    id: 'wd-w02-d4', week: 2, day: 4, skill: 'sentence-kinds',
    skillLabel: 'Sentence kinds',
    title: 'Mixing the kinds on purpose',
    teach: 'A paragraph made entirely of statements reads flat. Dropping in one question, or one short command, wakes the reader up. Use it deliberately, not constantly.',
    weak: 'The wing is curved on top. Air moves faster over the curve. This makes lower pressure. The wing lifts.',
    strong: 'The top of a wing is curved. Why does that matter? Air has farther to travel over the curve, so it moves faster, and faster air presses down less. That difference is what lifts the plane.',
    task: 'Explain something you understand well in 5-6 sentences. Use at least one question and at least one command among your statements.',
    checkFor: 'A mix of sentence kinds, used where it helps rather than at random.',
    minSentences: 5
  },

  // ---- Week 3: the topic sentence ----
  {
    id: 'wd-w03-d1', week: 3, day: 1, skill: 'topic-sentence',
    skillLabel: 'Topic sentences',
    title: 'What a topic sentence promises',
    teach: 'A topic sentence states the one idea a paragraph is about. It makes a promise, and the rest of the paragraph keeps it. If your paragraph wanders, the topic sentence is usually the thing that was never written.',
    weak: 'There are many interesting things about rockets.',
    strong: 'A rocket needs three things to reach orbit: thrust, control, and a way to shed weight.',
    task: 'Write 5 topic sentences, one each for: a book you read, a project you built, a place you visited, a skill you are learning, a person you admire. Do not write the paragraphs — just the topic sentences.',
    checkFor: 'Each one states ONE specific idea, not a vague "there are many things".',
    minSentences: 5
  },
  {
    id: 'wd-w03-d2', week: 3, day: 2, skill: 'topic-sentence',
    skillLabel: 'Topic sentences',
    title: 'Narrow beats broad',
    teach: 'A topic sentence that is too broad cannot be kept in one paragraph. "Space is interesting" would take a book. Narrow it until one paragraph can actually deliver it.',
    weak: 'Space exploration has changed a lot.',
    strong: 'The Apollo guidance computer had less memory than a modern calculator, and it still flew men to the Moon.',
    task: 'Take these three broad topics and narrow each one into a topic sentence a single paragraph could actually support: (1) airplanes, (2) exercise, (3) history.',
    checkFor: 'Each narrowed enough that one paragraph could genuinely cover it.',
    minSentences: 3
  },
  {
    id: 'wd-w03-d3', week: 3, day: 3, skill: 'topic-sentence',
    skillLabel: 'Topic sentences',
    title: 'Finding the topic sentence that is missing',
    teach: 'Sometimes a paragraph has all its details and no statement of what they add up to. Reading it, you can feel the gap. Writing the missing topic sentence is a real skill.',
    weak: 'The wings were bent. Two rivets were gone. The nose cone had a crack in it. The parachute never opened.',
    strong: 'The rocket came back in worse shape than it left. The wings were bent, two rivets were gone, the nose cone had cracked, and the parachute never opened.',
    task: 'Write 4 detail sentences about something WITHOUT saying what they add up to. Then, underneath, write the topic sentence that pulls them together.',
    checkFor: 'The topic sentence genuinely covers all four details.',
    minSentences: 5
  },
  {
    id: 'wd-w03-d4', week: 3, day: 4, skill: 'topic-sentence',
    skillLabel: 'Topic sentences',
    title: 'Topic sentence plus two supports',
    teach: 'The smallest real paragraph is three sentences: the claim, and two specific things that back it up. Specific means a number, a name, or something you can picture.',
    weak: 'Building the model was hard. It took a long time. It was frustrating.',
    strong: 'Building the model was harder than the instructions suggested. The wing spar snapped twice before I switched to basswood, and the glue took four hours to set instead of the thirty minutes on the box.',
    task: 'Write 3 short paragraphs. Each is exactly one topic sentence and two supporting sentences, and every support must contain a specific detail — a number, a name, or something you could photograph.',
    checkFor: 'Every support carries a specific detail, not a general feeling.',
    minSentences: 9
  },

  // ---- Week 4: supporting detail ----
  {
    id: 'wd-w04-d1', week: 4, day: 1, skill: 'supporting-detail',
    skillLabel: 'Supporting detail',
    title: 'Show it with a number',
    teach: 'A number turns an opinion into evidence. "It was fast" is a feeling; "it hit 240 feet in nine seconds" is something a reader can check.',
    weak: 'The rocket went really high and came down pretty fast.',
    strong: 'The rocket reached about 240 feet, and it fell for nine seconds before the parachute caught.',
    task: 'Write 5 sentences about a project, a workout, or a trip. Every single sentence must contain a number.',
    checkFor: 'A real number in all five sentences.',
    minSentences: 5
  },
  {
    id: 'wd-w04-d2', week: 4, day: 2, skill: 'supporting-detail',
    skillLabel: 'Supporting detail',
    title: 'Show it with an example',
    teach: 'When you make a claim, the reader silently asks "like what?" An example answers it before they have to.',
    weak: 'Engineers have to solve unexpected problems.',
    strong: 'Engineers have to solve unexpected problems. On Apollo 13, the crew built a carbon dioxide filter out of a flight manual cover, a sock, and duct tape.',
    task: 'Write 4 claims about how something works or why something matters. Under each, add one sentence beginning "For example," with a real example.',
    checkFor: 'Every claim followed by a genuine, specific example.',
    minSentences: 8
  },
  {
    id: 'wd-w04-d3', week: 4, day: 3, skill: 'supporting-detail',
    skillLabel: 'Supporting detail',
    title: 'Cutting the support that does not support',
    teach: 'A detail can be true, interesting, and still not belong. If it does not back up the topic sentence, it belongs in a different paragraph — or nowhere.',
    weak: 'The parachute failed. It was a red parachute. My cousin has a red bike. The shroud lines had tangled during packing.',
    strong: 'The parachute failed because the shroud lines tangled during packing.',
    task: 'Write a topic sentence and five supporting sentences, where TWO of the five deliberately do not belong. Then mark the two that should be cut and say why in one sentence each.',
    checkFor: 'The two off-topic sentences correctly identified, with a reason.',
    minSentences: 6
  },
  {
    id: 'wd-w04-d4', week: 4, day: 4, skill: 'supporting-detail',
    skillLabel: 'Supporting detail',
    title: 'Three supports, three kinds',
    teach: 'Strong paragraphs vary the KIND of support: a number, an example, and an explanation. Three of the same kind in a row starts to feel like a list.',
    weak: 'Flying is safe. It is safer than driving. Statistics show it is safe.',
    strong: 'Flying is safer than driving. In 2023 there was roughly one commercial airline fatality per several million flights. Every aircraft is inspected on a fixed schedule, and any part past its service life is replaced whether it looks worn or not.',
    task: 'Write one paragraph: a topic sentence, then three supports — one with a number, one with an example, and one that explains WHY the claim holds.',
    checkFor: 'Three supports of three different kinds, all backing the same claim.',
    minSentences: 4
  },

  // ---- Week 5: compound sentences ----
  {
    id: 'wd-w05-d1', week: 5, day: 1, skill: 'compound-sentence',
    skillLabel: 'Compound sentences',
    title: 'Joining two complete thoughts',
    teach: 'A compound sentence joins two complete sentences with a comma and a joining word: and, but, or, so, yet, for, nor. Both halves must be able to stand alone.',
    weak: 'The engine started and ran rough. And then stopped.',
    strong: 'The engine started, but it ran rough, and after nine seconds it stopped.',
    task: 'Write 5 compound sentences about a test, a game, or a repair. Circle the joining word in each by putting it in CAPITALS.',
    checkFor: 'Comma before the joining word, and both halves complete sentences.',
    minSentences: 5
  },
  {
    id: 'wd-w05-d2', week: 5, day: 2, skill: 'compound-sentence',
    skillLabel: 'Compound sentences',
    title: 'The joining word changes the meaning',
    teach: '"And" adds. "But" contrasts. "So" shows a result. "Or" offers a choice. Choosing the wrong one tells the reader something you did not mean.',
    weak: 'The parachute deployed and the rocket still hit hard.',
    strong: 'The parachute deployed, but the rocket still hit hard.',
    task: 'Write the SAME pair of facts four times, joined by and, but, so, and or. Then write one sentence saying which version is the most accurate and why.',
    checkFor: 'Four versions written, and the best one chosen with a reason.',
    minSentences: 5
  },
  {
    id: 'wd-w05-d3', week: 5, day: 3, skill: 'compound-sentence',
    skillLabel: 'Compound sentences',
    title: 'Comma splices',
    teach: 'A comma alone cannot hold two sentences together — that is a comma splice. You need a comma plus a joining word, or a period, or a semicolon.',
    weak: 'The wind picked up, we cancelled the launch.',
    strong: 'The wind picked up, so we cancelled the launch.',
    task: 'Fix these comma splices three different ways each (comma + joining word, period, semicolon): (1) The battery died, the altimeter stopped recording. (2) I finished the math, I started the reading.',
    checkFor: 'Each splice fixed three correct ways.',
    minSentences: 6
  },
  {
    id: 'wd-w05-d4', week: 5, day: 4, skill: 'compound-sentence',
    skillLabel: 'Compound sentences',
    title: 'A paragraph with compound sentences in it',
    teach: 'Compound sentences show how two facts relate. A paragraph of only short simple sentences reads like a list; a paragraph of only compound sentences gets tiring. Mix them.',
    weak: 'The test failed. We checked the fins. They were loose. We glued them. It worked.',
    strong: 'The first test failed. We checked the fins, and two of them were loose at the root. After we re-glued them and let the joint cure overnight, the second flight went straight.',
    task: 'Write a 5-6 sentence paragraph about solving a problem. At least two sentences must be compound, and at least two must be simple.',
    checkFor: 'A genuine mix — not all compound, not all simple.',
    minSentences: 5
  },

  // ---- Week 6: complex sentences ----
  {
    id: 'wd-w06-d1', week: 6, day: 1, skill: 'complex-sentence',
    skillLabel: 'Complex sentences',
    title: 'Because, although, when, if',
    teach: 'A complex sentence attaches a dependent clause — one that cannot stand alone — to a complete sentence. Words like because, although, when, if, since and after start those clauses.',
    weak: 'The launch was scrubbed. The wind was too strong.',
    strong: 'The launch was scrubbed because the wind was too strong.',
    task: 'Write 5 complex sentences about your week, each using a different starter from: because, although, when, if, since, after.',
    checkFor: 'Five different starters, and every sentence still complete.',
    minSentences: 5
  },
  {
    id: 'wd-w06-d2', week: 6, day: 2, skill: 'complex-sentence',
    skillLabel: 'Complex sentences',
    title: 'Front or back — and the comma rule',
    teach: 'A dependent clause can go first or last. If it goes FIRST, put a comma after it. If it goes last, usually no comma.',
    weak: 'Because the glue was still wet the fin came off.',
    strong: 'Because the glue was still wet, the fin came off. / The fin came off because the glue was still wet.',
    task: 'Write 4 complex sentences with the dependent clause FIRST (comma after), then rewrite each with the clause LAST. That is 8 sentences.',
    checkFor: 'Comma after every front clause, and none needed on the back ones.',
    minSentences: 8
  },
  {
    id: 'wd-w06-d3', week: 6, day: 3, skill: 'complex-sentence',
    skillLabel: 'Complex sentences',
    title: 'Although: holding two true things at once',
    teach: 'Although, even though, and while let you admit something and still make your point. This is what makes writing sound thoughtful rather than one-sided.',
    weak: 'The design was good. It failed the drop test.',
    strong: 'Although the design held up in the wind tunnel, it failed the drop test on the first try.',
    task: 'Write 4 sentences using although, even though, or while, where the first half admits something real and the second half still makes your point.',
    checkFor: 'Both halves genuinely true — not a fake concession.',
    minSentences: 4
  },
  {
    id: 'wd-w06-d4', week: 6, day: 4, skill: 'complex-sentence',
    skillLabel: 'Complex sentences',
    title: 'Simple, compound, complex — all three',
    teach: 'Three tools now: simple (one thought), compound (two joined thoughts), complex (one thought plus a dependent clause). A good paragraph uses all three.',
    weak: 'I built the model. I painted it. It looked good. I showed my mom.',
    strong: 'I built the model over three evenings. Although the decals tore on the first attempt, the second sheet went on cleanly, and the finished paint job looked better than the box art. I showed my mom before it had even dried.',
    task: 'Write a 6-sentence paragraph about something you made or fixed. Label each sentence at the end: (S), (CD) for compound, or (CX) for complex. Use all three at least once.',
    checkFor: 'All three types present and labelled correctly.',
    minSentences: 6
  },

  // ---- Week 7: sentence combining ----
  {
    id: 'wd-w07-d1', week: 7, day: 1, skill: 'sentence-combining',
    skillLabel: 'Sentence combining',
    title: 'Three choppy sentences into one good one',
    teach: 'Combining is the fastest way to make writing sound older. Take short related sentences and fold them into one, dropping the words you repeat.',
    weak: 'The rocket was red. The rocket was two feet tall. The rocket had three fins.',
    strong: 'The red rocket stood two feet tall on three fins.',
    task: 'Combine each set into ONE sentence: (1) The book was long. The book was about Mars. I finished it. (2) The engine is small. The engine is loud. The engine is efficient. (3) We ran the test. It was Tuesday. It rained.',
    checkFor: 'One sentence per set, with the repeated words removed.',
    minSentences: 3
  },
  {
    id: 'wd-w07-d2', week: 7, day: 2, skill: 'sentence-combining',
    skillLabel: 'Sentence combining',
    title: 'Combining with who, which, that',
    teach: 'Who, which and that let you fold a whole sentence in as a describing clause. Use "who" for people, "which" and "that" for things.',
    weak: 'Bessie Coleman was a pilot. She was the first Black woman to earn a pilot licence.',
    strong: 'Bessie Coleman, who was the first Black woman to earn a pilot licence, flew airshows across the country.',
    task: 'Combine each pair using who, which or that: (1) The altimeter recorded the flight. It cost eleven dollars. (2) Guion Bluford flew on Challenger. He was the first African American in space. (3) The wing snapped. It was made of balsa.',
    checkFor: 'Correct choice of who / which / that, and commas where the clause is extra information.',
    minSentences: 3
  },
  {
    id: 'wd-w07-d3', week: 7, day: 3, skill: 'sentence-combining',
    skillLabel: 'Sentence combining',
    title: 'Knowing when NOT to combine',
    teach: 'Combining is a tool, not a rule. One very long sentence can be harder to read than three short ones. A short sentence after long ones lands hard — use that on purpose.',
    weak: 'Because the wind was strong and the field was wet and we had already waited two hours and the light was going, and since my dad had work early, we packed up.',
    strong: 'The wind was strong and the field was wet. We had already waited two hours, and the light was going. We packed up.',
    task: 'Take this overloaded sentence and break it into 3 sentences: "The engine started rough because the fuel was old and we had not cleaned the filter since spring which meant the test data was useless and we had to run the whole thing again." Then write one sentence saying which of your three is the strongest and why.',
    checkFor: 'Three readable sentences, and a reason given for the strongest.',
    minSentences: 4
  },
  {
    id: 'wd-w07-d4', week: 7, day: 4, skill: 'sentence-combining',
    skillLabel: 'Sentence combining',
    title: 'Rewrite your own choppy paragraph',
    teach: 'The real test is doing this to your own writing. Choppy writing is not wrong — it is a first draft. Combining is what the second draft is for.',
    weak: 'I like space. Space is big. There are planets. Mars is red. I want to go there.',
    strong: 'Space interests me because of how much of it there is. Mars, which is red because of iron dust in its soil, is the one I would want to see.',
    task: 'Write 6 deliberately choppy short sentences about a topic you like. Then rewrite the whole thing as 3 stronger sentences underneath.',
    checkFor: 'The rewrite keeps all the information in fewer, better sentences.',
    minSentences: 9
  },

  // ---- Week 8: varying sentence openers ----
  {
    id: 'wd-w08-d1', week: 8, day: 1, skill: 'sentence-openers',
    skillLabel: 'Sentence openers',
    title: 'When every sentence starts with "I"',
    teach: 'Starting three sentences in a row the same way makes writing drone. The fix is not to remove "I" — it is to move something else to the front.',
    weak: 'I woke up early. I ate breakfast. I went outside. I launched the rocket.',
    strong: 'I woke up before the alarm. After a fast breakfast, I carried the rocket out to the field. By seven, the first flight was already in the air.',
    task: 'Write 6 sentences about a morning. No two sentences in a row may begin with the same word.',
    checkFor: 'No two consecutive sentences starting with the same word.',
    minSentences: 6
  },
  {
    id: 'wd-w08-d2', week: 8, day: 2, skill: 'sentence-openers',
    skillLabel: 'Sentence openers',
    title: 'Starting with when, where, or how',
    teach: 'Moving a time, place or manner phrase to the front changes the rhythm and often makes the sentence clearer. Put a comma after it.',
    weak: 'The parachute opened at four hundred feet.',
    strong: 'At four hundred feet, the parachute opened.',
    task: 'Write 5 ordinary sentences, then rewrite each one so it begins with a time, place, or how phrase. Keep the comma.',
    checkFor: 'Five rewrites, each starting with a phrase and using a comma.',
    minSentences: 10
  },
  {
    id: 'wd-w08-d3', week: 8, day: 3, skill: 'sentence-openers',
    skillLabel: 'Sentence openers',
    title: 'Starting with an -ing or -ed phrase',
    teach: 'An opening phrase like "Working late" or "Frustrated by the delay" adds information without a new sentence. Careful: the phrase must describe the subject that follows, or it dangles.',
    weak: 'Sitting on the launch pad, my dad checked the wiring.',
    strong: 'Sitting on the launch pad, the rocket waited while my dad checked the wiring.',
    task: 'Write 4 sentences that open with an -ing or -ed phrase. Then check each one: does the phrase describe the subject right after the comma?',
    checkFor: 'No dangling phrases — each opener describes the subject that follows.',
    minSentences: 4
  },
  {
    id: 'wd-w08-d4', week: 8, day: 4, skill: 'sentence-openers',
    skillLabel: 'Sentence openers',
    title: 'A paragraph with five different openers',
    teach: 'This is the week assembled. Variety in how sentences start is one of the biggest differences between writing that sounds young and writing that sounds practised.',
    weak: 'The test was Saturday. The test went well. The test showed the fix worked.',
    strong: 'Saturday was the second attempt. Because we had re-glued the fins, the rocket flew straight instead of corkscrewing. Watching from the far end of the field, my mom said it looked twice as high. The altimeter agreed.',
    task: 'Write a 5-sentence paragraph where every sentence begins a different way: one with the subject, one with a time or place phrase, one with because/although, one with an -ing phrase, and one with a short simple sentence.',
    checkFor: 'Five different opener types, all five sentences correct.',
    minSentences: 5
  },

  // ---- Week 9: precise words ----
  {
    id: 'wd-w09-d1', week: 9, day: 1, skill: 'precise-words',
    skillLabel: 'Precise words',
    title: 'Strong verbs beat weak verb plus adverb',
    teach: 'Most writing gets stronger when you replace "walked slowly" with "trudged", or "went up fast" with "climbed". One precise verb usually beats two vague words.',
    weak: 'The rocket went up very fast and then came down slowly.',
    strong: 'The rocket climbed hard, then drifted down under the parachute.',
    task: 'Write 6 sentences. In each, replace a weak verb + adverb pair with one strong verb. Show the weak version in brackets after each sentence.',
    checkFor: 'Six genuine upgrades, with the original shown for comparison.',
    minSentences: 6
  },
  {
    id: 'wd-w09-d2', week: 9, day: 2, skill: 'precise-words',
    skillLabel: 'Precise words',
    title: 'Precise nouns',
    teach: '"Thing", "stuff", "it" and "a lot" tell the reader nothing. Naming the exact object does the work of a whole descriptive sentence.',
    weak: 'I used some stuff to fix the thing on the model.',
    strong: 'I used cyanoacrylate glue to reattach the starboard fin.',
    task: 'Write 5 sentences about a project. Not one of them may contain thing, stuff, it, a lot, or good.',
    checkFor: 'None of the banned words appear anywhere.',
    minSentences: 5
  },
  {
    id: 'wd-w09-d3', week: 9, day: 3, skill: 'precise-words',
    skillLabel: 'Precise words',
    title: 'Technical words, used correctly',
    teach: 'Using the real word for something is not showing off — it is being exact. But only use a technical word if you can explain it. A word you cannot define is a word that will be wrong eventually.',
    weak: 'The front part is shaped that way for the air.',
    strong: 'The nose cone is tapered to reduce drag as the rocket accelerates.',
    task: 'Write 4 sentences using 4 technical words from a subject you are studying. Under each, write a short definition in your own words.',
    checkFor: 'Each technical word used correctly AND defined accurately.',
    minSentences: 8
  },
  {
    id: 'wd-w09-d4', week: 9, day: 4, skill: 'precise-words',
    skillLabel: 'Precise words',
    title: 'Quarter one, all together',
    teach: 'Everything from this quarter in one place: complete sentences, varied kinds, a topic sentence with real support, compound and complex structures, varied openers, precise words.',
    weak: 'My favourite thing I did this quarter was good. It was fun and I learned a lot of stuff.',
    strong: 'The best thing I built this quarter was the balsa glider. Although the first wing warped in the humidity, the second one held its shape, and the glider flew forty feet across the yard on its third attempt.',
    task: 'Write one strong paragraph (6-8 sentences) about the best thing you built or learned this quarter. Use a topic sentence, at least two specific supports, one compound and one complex sentence, and no vague words.',
    checkFor: 'Topic sentence, specific supports, sentence variety, precise words. This is the quarter benchmark.',
    minSentences: 6
  }
];

/**
 * The whole year, in week order. 43 weeks x 4 days = 172 drills.
 *
 * It was 36 weeks and 144 drills until Aug 23, 2026, and the school year has
 * always run to week 43 (last day 2027-05-26). The ladder simply stopped seven
 * weeks early and nothing noticed, because the dashboard renders the Daily
 * Writing row behind a truthiness check — no drill, no row, no error. Weeks
 * 37-43 live in dailyDrillsQ4.js with the rest of Q4; see the note at the top
 * of that file.
 */
export const dailyDrills = [
  ...dailyDrillsQ1,
  ...dailyDrillsQ2,
  ...dailyDrillsQ3,
  ...dailyDrillsQ4
];
