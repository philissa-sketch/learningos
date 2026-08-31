// ---------------------------------------------------------------------------
// Q3 — BEYOND ONE PARAGRAPH (weeks 19-27). Part of the daily drill ladder; see
// dailyDrills.js for the design and why this exists.
//
// Q1 built the sentence, Q2 built the paragraph. This quarter is about what
// holds several paragraphs together — a thesis, an opening, bodies that each
// stay on one idea, a close — and then four structures that recur for the rest
// of his education: compare, cause and effect, procedure, and description.
//
// Week 27 is summarising, deliberately last: putting someone else's argument in
// your own words is only possible once you can see the shape of an argument,
// and that is what the eight weeks before it teach.
// ---------------------------------------------------------------------------

export const dailyDrillsQ3 = [
  // ---- Week 19: thesis ----
  {
    id: 'wd-w19-d1', week: 19, day: 1, skill: 'thesis',
    skillLabel: 'Thesis statements',
    title: 'A thesis is a topic sentence for the whole piece',
    teach: 'A thesis states what the WHOLE piece will argue, in one sentence. It is not a topic and not a question — it is a position someone could disagree with.',
    weak: 'This paper is about the Space Race.',
    strong: 'The Space Race did more for computing than it did for space travel.',
    task: 'Write 5 thesis statements on subjects you know. Test each one by asking: could a reasonable person argue the opposite? If not, rewrite it.',
    checkFor: 'Every thesis is arguable, not just a topic announcement.',
    minSentences: 5
  },
  {
    id: 'wd-w19-d2', week: 19, day: 2, skill: 'thesis',
    skillLabel: 'Thesis statements',
    title: 'Narrow enough to prove',
    teach: 'A thesis you cannot support in the space you have is worse than no thesis. Narrow it until three body paragraphs could genuinely carry it.',
    weak: 'Aviation has changed the world in many ways.',
    strong: 'The jet engine changed air travel more than any other single invention, because it made long flights cheap enough for ordinary people.',
    task: 'Take these three broad subjects and write a provable thesis for each: (1) space exploration, (2) exercise, (3) the internet. Then write one sentence per thesis naming the three supports you would use.',
    checkFor: 'Each thesis narrow enough that three paragraphs could prove it.',
    minSentences: 6
  },
  {
    id: 'wd-w19-d3', week: 19, day: 3, skill: 'thesis',
    skillLabel: 'Thesis statements',
    title: 'The thesis that maps the piece',
    teach: 'A thesis can name its own supports: "X is true because of A, B and C." That tells the reader exactly what is coming and in what order — and it holds you to it.',
    weak: 'Model rocketry is educational.',
    strong: 'Model rocketry teaches real engineering because it requires a stability calculation, a recovery system, and an honest post-flight failure analysis.',
    task: 'Write 3 mapping theses in the form "X, because A, B and C." Then write the three topic sentences each one demands.',
    checkFor: 'The three topic sentences match the three parts of the thesis, in order.',
    minSentences: 12
  },
  {
    id: 'wd-w19-d4', week: 19, day: 4, skill: 'thesis',
    skillLabel: 'Thesis statements',
    title: 'Revising a thesis after you write',
    teach: 'Your first thesis is a guess. After drafting, what you actually argued is often better than what you set out to argue — so rewrite the thesis to match the piece you wrote.',
    weak: 'Sticking with a thesis that the essay stopped supporting three paragraphs ago.',
    strong: 'Draft thesis: "Space exploration is expensive." Final thesis: "Space exploration is expensive, and almost every argument against it treats that cost as if it disappeared instead of being spent here on Earth."',
    task: 'Write a thesis, then three topic sentences, then look at your topic sentences and rewrite the thesis so it matches what you would actually be proving.',
    checkFor: 'The revised thesis genuinely fits the three topic sentences.',
    minSentences: 8
  },

  // ---- Week 20: introductions ----
  {
    id: 'wd-w20-d1', week: 20, day: 1, skill: 'introductions',
    skillLabel: 'Introductions',
    title: 'Start with something real',
    teach: 'An introduction has to make the reader want the next paragraph. A fact, a moment, or a number does that. "In this essay I will discuss" does the opposite.',
    weak: 'In this essay I am going to talk about the Apollo program and some things about it.',
    strong: 'The computer that landed men on the Moon had four kilobytes of memory. That is less than a single photograph on a phone.',
    task: 'Write 4 opening sentences for pieces you might write. Not one may mention the essay, the reader, or what you are going to do.',
    checkFor: 'Every opener is a fact, moment or image — no announcements.',
    minSentences: 4
  },
  {
    id: 'wd-w20-d2', week: 20, day: 2, skill: 'introductions',
    skillLabel: 'Introductions',
    title: 'Hook, context, thesis',
    teach: 'The standard shape: something that grabs attention, then enough background to make the thesis make sense, then the thesis itself as the last sentence of the paragraph.',
    weak: 'Rockets are interesting. My thesis is that rockets are useful.',
    strong: 'A single Saturn V engine burned fifteen tons of fuel a second, and five of them fired at once. That kind of power was invented for a race between two countries, but almost everything it produced — guidance computers, materials, fuel cells — stayed behind on Earth. The Space Race did more for computing than it did for space travel.',
    task: 'Write 2 full introduction paragraphs, each with a hook, context, and a thesis as the final sentence. Label the three parts.',
    checkFor: 'Three parts present and in the right order in both.',
    minSentences: 8
  },
  {
    id: 'wd-w20-d3', week: 20, day: 3, skill: 'introductions',
    skillLabel: 'Introductions',
    title: 'How much background is enough',
    teach: 'Too little context and the thesis lands on nothing. Too much and the reader is halfway through a history lesson before they know what you think. Give only what the thesis needs.',
    weak: 'Three paragraphs of history before the point arrives.',
    strong: 'Two sentences of context, then the thesis. Everything else can wait for the body.',
    task: 'Write one thesis. Then write the context for it three times: in one sentence, in three sentences, and in six. Say which is right and why.',
    checkFor: 'A reasoned choice, not just the shortest one picked by default.',
    minSentences: 11
  },
  {
    id: 'wd-w20-d4', week: 20, day: 4, skill: 'introductions',
    skillLabel: 'Introductions',
    title: 'Writing the introduction last',
    teach: 'Many writers write the introduction after the body, because until the body exists you do not know what you are introducing. Try it — it usually produces a better opening than the one you planned.',
    weak: 'Guessing at the introduction and then writing a body that goes somewhere else.',
    strong: 'An introduction that promises exactly what the body delivers, because it was written after the body was finished.',
    task: 'Write three topic sentences for a piece first. THEN write the introduction paragraph they belong to. Do it in that order on purpose.',
    checkFor: 'The introduction promises exactly what the three topic sentences deliver.',
    minSentences: 7
  },

  // ---- Week 21: body paragraphs ----
  {
    id: 'wd-w21-d1', week: 21, day: 1, skill: 'body-paragraphs',
    skillLabel: 'Body paragraphs',
    title: 'One idea per paragraph, again — but bigger',
    teach: 'In a multi-paragraph piece, each body paragraph carries exactly one of the thesis’s supports. If a paragraph drifts to a second support, that support has been robbed of its own paragraph.',
    weak: 'A single paragraph covering the guidance computer, the materials science, and the fuel cells.',
    strong: 'One paragraph on the guidance computer. One on materials. One on fuel cells. Each with its own topic sentence, evidence and close.',
    task: 'Take a mapping thesis you wrote in week 19 and write its three body paragraphs. Four to six sentences each, one support each.',
    checkFor: 'No paragraph contains more than one of the thesis supports.',
    minSentences: 14
  },
  {
    id: 'wd-w21-d2', week: 21, day: 2, skill: 'body-paragraphs',
    skillLabel: 'Body paragraphs',
    title: 'Topic sentences that carry the argument forward',
    teach: 'Read only your topic sentences, in order. If they alone tell the story of your argument, the piece is structured. If they read as a random list, it is not.',
    weak: 'First I will talk about computers. Another thing is materials. Also fuel cells.',
    strong: 'The most durable product of Apollo was not a rocket but a computer. The same pressure reshaped materials science. Even the fuel cells found a second life.',
    task: 'Write 4 topic sentences for one argument. Then read only those four aloud and write one sentence saying whether they tell the story on their own.',
    checkFor: 'The four topic sentences make sense read alone, in order.',
    minSentences: 5
  },
  {
    id: 'wd-w21-d3', week: 21, day: 3, skill: 'body-paragraphs',
    skillLabel: 'Body paragraphs',
    title: 'Transitions between paragraphs',
    teach: 'The first sentence of a new paragraph should reach back to the one before. Without that, a reader feels the piece restart every time.',
    weak: 'The guidance computer was important. [new paragraph] Materials science also changed.',
    strong: 'The guidance computer was important. [new paragraph] The same pressure that shrank the computer also reshaped what it was built out of.',
    task: 'Write three paragraph-opening sentences that each link back to an imagined previous paragraph. Write the previous paragraph’s last sentence above each one so the link can be checked.',
    checkFor: 'Each opener genuinely reaches back to the sentence above it.',
    minSentences: 6
  },
  {
    id: 'wd-w21-d4', week: 21, day: 4, skill: 'body-paragraphs',
    skillLabel: 'Body paragraphs',
    title: 'A three-paragraph body that holds together',
    teach: 'This is the middle of every essay, report and paper you will write: three paragraphs, one support each, linked, all serving one thesis.',
    weak: 'Three paragraphs that could be shuffled into any order without anyone noticing.',
    strong: 'Three paragraphs where moving the second one would break the argument.',
    task: 'Write a complete three-paragraph body for a thesis of your choice, with transitions between paragraphs. Then test it: could any two paragraphs swap places? Say why or why not.',
    checkFor: 'The order is defensible — the piece would be worse shuffled.',
    minSentences: 15
  },

  // ---- Week 22: conclusions ----
  {
    id: 'wd-w22-d1', week: 22, day: 1, skill: 'conclusions',
    skillLabel: 'Conclusions',
    title: 'Do not summarise what they just read',
    teach: 'A conclusion that lists the three points again wastes the reader’s time — they read them four minutes ago. A conclusion says what the argument MEANS now that it has been made.',
    weak: 'In conclusion, I talked about computers, materials and fuel cells.',
    strong: 'Apollo is remembered for a footprint, but its longest shadow is the machine on your desk.',
    task: 'Write 4 concluding sentences for arguments you have made this quarter. None of them may list the supports again.',
    checkFor: 'No conclusion is a summary of the body.',
    minSentences: 4
  },
  {
    id: 'wd-w22-d2', week: 22, day: 2, skill: 'conclusions',
    skillLabel: 'Conclusions',
    title: 'Ending on the wider point',
    teach: 'A good conclusion widens: from this case to what it shows generally. It is the mirror image of an introduction, which narrows from the general to your thesis.',
    weak: 'So that is why the second design worked better.',
    strong: 'The second design worked because the first one failed in a way we could measure. Most engineering progress looks like that — not a better idea, but a better record of what went wrong.',
    task: 'Write 3 conclusions that move from your specific case to a wider point. Each must be at least two sentences.',
    checkFor: 'Each widens genuinely, without becoming vague.',
    minSentences: 6
  },
  {
    id: 'wd-w22-d3', week: 22, day: 3, skill: 'conclusions',
    skillLabel: 'Conclusions',
    title: 'The call to action, and when it fits',
    teach: 'Persuasive writing can end by asking the reader to do something. Informative writing usually should not — a lab report that ends "so go build a rocket" has changed genre in its last sentence.',
    weak: 'A research paper on wing design ending with "you should try flying!"',
    strong: 'A persuasive piece on school funding ending with a specific, doable ask.',
    task: 'Write two conclusions on the same subject: one for a persuasive piece, one for an informative one. Say in a sentence why the endings differ.',
    checkFor: 'The two endings are genuinely different in kind, with a reason given.',
    minSentences: 6
  },
  {
    id: 'wd-w22-d4', week: 22, day: 4, skill: 'conclusions',
    skillLabel: 'Conclusions',
    title: 'Introduction and conclusion as a pair',
    teach: 'The strongest pieces answer their own opening at the end. If you opened with a number, a moment, or an image, returning to it at the close makes the whole thing feel finished.',
    weak: 'An opening about a computer and a conclusion about parachutes.',
    strong: 'Opening: "The computer that landed men on the Moon had four kilobytes of memory." Closing: "Four kilobytes got us to the Moon. It is worth asking what we are doing with the rest."',
    task: 'Write an introduction and a conclusion for the same piece, where the conclusion returns to whatever you opened with. Skip the body entirely.',
    checkFor: 'The close visibly answers the open.',
    minSentences: 8
  },

  // ---- Week 23: compare and contrast ----
  {
    id: 'wd-w23-d1', week: 23, day: 1, skill: 'compare-contrast',
    skillLabel: 'Compare and contrast',
    title: 'Comparing along the same lines',
    teach: 'A comparison only works if you measure both things by the same criteria. Praising one for speed and the other for cost tells the reader nothing about which is better at anything.',
    weak: 'Solid motors are simple. Liquid motors are used by NASA.',
    strong: 'Solid motors are simpler to build and store; liquid motors are more complex but can be throttled and shut down mid-flight.',
    task: 'Choose two things you know well. List three criteria, then write one sentence per criterion comparing both along it.',
    checkFor: 'Both things measured on every criterion — no one-sided lines.',
    minSentences: 4
  },
  {
    id: 'wd-w23-d2', week: 23, day: 2, skill: 'compare-contrast',
    skillLabel: 'Compare and contrast',
    title: 'Block structure vs point-by-point',
    teach: 'Two ways to organise a comparison. BLOCK: everything about A, then everything about B. POINT-BY-POINT: criterion one for both, criterion two for both. Point-by-point is usually clearer for three or more criteria.',
    weak: 'Switching between the two structures halfway through, so the reader loses the thread.',
    strong: 'One structure, held all the way.',
    task: 'Write the same three-criterion comparison twice: once in block structure, once point-by-point. Then say which reads better and why.',
    checkFor: 'Both structures genuinely used, and a reason given for the preference.',
    minSentences: 12
  },
  {
    id: 'wd-w23-d3', week: 23, day: 3, skill: 'compare-contrast',
    skillLabel: 'Compare and contrast',
    title: 'The comparison words',
    teach: 'Similarly, likewise, both, in the same way — for likeness. Whereas, unlike, by contrast, on the other hand — for difference. Using the wrong family confuses the reader about what you meant.',
    weak: 'Solid motors are simple. Similarly, liquid motors are complicated.',
    strong: 'Solid motors are simple. Liquid motors, by contrast, are complicated enough to need their own plumbing.',
    task: 'Write 6 comparison sentences, three showing likeness and three showing difference, each with a different signal word.',
    checkFor: 'Six different signal words, each in the correct family.',
    minSentences: 6
  },
  {
    id: 'wd-w23-d4', week: 23, day: 4, skill: 'compare-contrast',
    skillLabel: 'Compare and contrast',
    title: 'A comparison that reaches a verdict',
    teach: 'A comparison that ends without a judgement is a list. Say which is better for what — that is the paragraph’s conclusion, and it is the reason anyone read it.',
    weak: 'So both have advantages and disadvantages.',
    strong: 'For a first build, the solid motor wins: it is cheaper, it cannot leak, and nothing about it needs to be tuned. The liquid engine is the better machine and the worse choice.',
    task: 'Write a full comparison paragraph, point-by-point, on three criteria, ending in a verdict that says which is better FOR WHAT.',
    checkFor: 'A real verdict, with the "for what" stated.',
    minSentences: 6
  },

  // ---- Week 24: cause and effect ----
  {
    id: 'wd-w24-d1', week: 24, day: 1, skill: 'cause-effect',
    skillLabel: 'Cause and effect',
    title: 'One cause, several effects',
    teach: 'Start from a single cause and trace what followed. Each effect needs to visibly come from the cause, not just happen afterwards.',
    weak: 'The engine failed. Later we had lunch. Then it rained.',
    strong: 'The engine failed at ignition. That cost us the morning window, pushed the second attempt into the afternoon wind, and is why the third flight drifted into the trees.',
    task: 'Pick one event and write a paragraph tracing three effects that genuinely followed from it. Use a cause transition for each.',
    checkFor: 'All three effects really do follow from the cause.',
    minSentences: 5
  },
  {
    id: 'wd-w24-d2', week: 24, day: 2, skill: 'cause-effect',
    skillLabel: 'Cause and effect',
    title: 'Several causes, one effect',
    teach: 'The reverse: one outcome that needed several things to go wrong at once. This is how real failures work, and saying so is more honest than blaming one thing.',
    weak: 'The rocket crashed because the parachute failed.',
    strong: 'The rocket crashed because three things lined up: the chute was packed damp, the ejection charge fired late, and we were flying in more wind than the design was rated for.',
    task: 'Write a paragraph explaining something that went wrong, naming at least three contributing causes and how they combined.',
    checkFor: 'Three real causes, and a sentence showing how they interacted.',
    minSentences: 5
  },
  {
    id: 'wd-w24-d3', week: 24, day: 3, skill: 'cause-effect',
    skillLabel: 'Cause and effect',
    title: 'After it is not the same as because of it',
    teach: 'Two things happening in order does not make the first one the cause. This mistake has its own name in logic, and it is the most common error in student science writing.',
    weak: 'I wore my lucky shirt and the flight worked, so the shirt helped.',
    strong: 'The flight worked on the day I happened to wear that shirt. What actually changed was the fin alignment, which we had fixed the night before.',
    task: 'Write 3 examples of "after it, therefore because of it" reasoning — then, under each, write the real explanation.',
    checkFor: 'The false cause identified, and a plausible real one given.',
    minSentences: 9
  },
  {
    id: 'wd-w24-d4', week: 24, day: 4, skill: 'cause-effect',
    skillLabel: 'Cause and effect',
    title: 'A failure analysis',
    teach: 'This is the writing engineers do after something breaks: what happened, what caused it, what the evidence is, and what changes next time. Write it without blaming anyone and it becomes useful.',
    weak: 'It broke because of bad luck. We will try harder.',
    strong: 'The fin sheared at the root on landing. The break is clean and follows the grain, which points at balsa oriented the wrong way rather than impact force. Next build, the grain runs spanwise and the root gets a fillet.',
    task: 'Write a failure analysis of something that went wrong — a project, a test, a plan. Four parts: what happened, the cause, the evidence for that cause, and the change you would make.',
    checkFor: 'All four parts present, and the evidence actually supports the named cause.',
    minSentences: 6
  },

  // ---- Week 25: procedure ----
  {
    id: 'wd-w25-d1', week: 25, day: 1, skill: 'procedure',
    skillLabel: 'Procedure writing',
    title: 'Steps someone else could follow',
    teach: 'Procedure writing is tested by whether a stranger can do the thing. Numbered steps, one action each, in the order they happen, with nothing assumed.',
    weak: 'Put it together and make sure it is straight.',
    strong: '3. Slide the fin into the slot until it stops. 4. Check it against a square before the glue sets — you have about ninety seconds.',
    task: 'Write numbered instructions for something you can do well, in 8 steps. One action per step. Assume the reader has never done it.',
    checkFor: 'Eight steps, one action each, nothing assumed.',
    minSentences: 8
  },
  {
    id: 'wd-w25-d2', week: 25, day: 2, skill: 'procedure',
    skillLabel: 'Procedure writing',
    title: 'Materials before method',
    teach: 'List everything needed BEFORE the first step. Discovering a missing tool at step six is the writer’s fault, not the reader’s.',
    weak: 'Step 4: now get the sandpaper you should have bought.',
    strong: 'Materials: 220-grit sandpaper, wood glue, a square, masking tape, and something flat to work on.',
    task: 'Take your instructions from yesterday and add a complete materials list at the top. Then reread your steps and add anything you forgot.',
    checkFor: 'Nothing appears in the steps that is missing from the materials list.',
    minSentences: 10
  },
  {
    id: 'wd-w25-d3', week: 25, day: 3, skill: 'procedure',
    skillLabel: 'Procedure writing',
    title: 'Warnings where they are needed',
    teach: 'A warning belongs BEFORE the step it applies to, not after. A safety note printed under the step that burns you is a note nobody read in time.',
    weak: 'Step 7: heat the wire. (Step 8: the wire will be hot.)',
    strong: 'Step 7: the wire will stay hot for about a minute — hold it with pliers, not fingers, then heat it.',
    task: 'Write a 6-step procedure that genuinely needs at least two warnings. Place each warning before the step it protects.',
    checkFor: 'Warnings come before the risky step, not after.',
    minSentences: 8
  },
  {
    id: 'wd-w25-d4', week: 25, day: 4, skill: 'procedure',
    skillLabel: 'Procedure writing',
    title: 'Test it on a real person',
    teach: 'The only real test of instructions is watching someone follow them. Where they hesitate is where your writing was unclear — not where they were slow.',
    weak: 'They could not follow it, so they did not read properly.',
    strong: 'They stopped at step 4 because I had written "attach" without saying with what. That is a writing problem.',
    task: 'Have someone read your instructions aloud and try to follow them. Write down every place they hesitated, then rewrite those steps.',
    checkFor: 'Real hesitation points recorded, and the rewrites address them.',
    minSentences: 6
  },

  // ---- Week 26: description ----
  {
    id: 'wd-w26-d1', week: 26, day: 1, skill: 'description',
    skillLabel: 'Description',
    title: 'Describe so it can be pictured',
    teach: 'Description works when the reader can build the thing in their head. That takes specifics — size, colour, material, sound — not adjectives like "nice" and "cool".',
    weak: 'It was a cool-looking rocket, pretty big and nicely painted.',
    strong: 'It stood about waist high, black over gloss white, with three balsa fins sanded to an edge you could feel but not see.',
    task: 'Describe three objects in 3 sentences each. No adjective may be used that does not carry information — no nice, cool, good, great, awesome.',
    checkFor: 'No empty adjectives; every detail is specific.',
    minSentences: 9
  },
  {
    id: 'wd-w26-d2', week: 26, day: 2, skill: 'description',
    skillLabel: 'Description',
    title: 'Technical description vs creative description',
    teach: 'A technical description is for someone who has to build or use the thing: dimensions, materials, tolerances. A creative description is for someone who has to feel it. Both are precise; they select different details.',
    weak: 'Using flowery language in a parts list, or dimensions in a story.',
    strong: 'Technical: "24 inches, 3-inch body tube, 4.2 ounces empty." Creative: "It was heavier than it looked, and cold from the garage."',
    task: 'Describe the same object twice — once technically, once creatively. Four sentences each.',
    checkFor: 'Both accurate, and the details selected clearly differ.',
    minSentences: 8
  },
  {
    id: 'wd-w26-d3', week: 26, day: 3, skill: 'description',
    skillLabel: 'Description',
    title: 'Sound, weight, texture — not just sight',
    teach: 'Most writers describe only what things look like. Weight, sound, temperature and texture are usually more memorable and almost always less used.',
    weak: 'The launch was loud and bright.',
    strong: 'You feel a launch in your chest before you hear it, and the sound arrives a half-second late, more crack than roar.',
    task: 'Describe one event using at least four different senses. Say which sense each sentence uses.',
    checkFor: 'Four or more senses genuinely used, correctly labelled.',
    minSentences: 6
  },
  {
    id: 'wd-w26-d4', week: 26, day: 4, skill: 'description',
    skillLabel: 'Description',
    title: 'Description that carries a point',
    teach: 'The best description is not decoration — it proves something. Describing worn tools tells the reader the shop is used, without a sentence saying so.',
    weak: 'The workshop was old. It had been used a lot. This shows it was busy.',
    strong: 'The bench had a groove worn into it where forty years of hands had rested.',
    task: 'Write a descriptive paragraph that makes a point WITHOUT ever stating it. Then write the point in one sentence underneath, so it can be checked.',
    checkFor: 'The description alone genuinely implies the stated point.',
    minSentences: 6
  },

  // ---- Week 27: summarising ----
  {
    id: 'wd-w27-d1', week: 27, day: 1, skill: 'summarising',
    skillLabel: 'Summarising',
    title: 'Your own words, and only the load-bearing parts',
    teach: 'A summary keeps what the piece could not do without, in your words. Changing a few words of the original is not summarising — it is copying with extra steps.',
    weak: 'The article said the guidance computer had a small amount of memory and was very important for the mission.',
    strong: 'Apollo’s computer was tiny by modern standards, and its designers treated that limit as the central engineering problem rather than an inconvenience.',
    task: 'Summarise something you read this week in 3 sentences. Then check every phrase against the original — anything shared word for word must be rewritten or quoted.',
    checkFor: 'No borrowed phrasing left unquoted.',
    minSentences: 3
  },
  {
    id: 'wd-w27-d2', week: 27, day: 2, skill: 'summarising',
    skillLabel: 'Summarising',
    title: 'Summarising at three lengths',
    teach: 'The same source can be summarised in one sentence, one paragraph, or one page. Each length forces a different decision about what is essential.',
    weak: 'A one-sentence summary that is really the first sentence of the source.',
    strong: 'One sentence that names the argument, not the topic.',
    task: 'Summarise the same chapter or article three times: in one sentence, in three sentences, and in six. Say what you had to drop at each step.',
    checkFor: 'All three are genuine summaries, and the cuts are named.',
    minSentences: 12
  },
  {
    id: 'wd-w27-d3', week: 27, day: 3, skill: 'summarising',
    skillLabel: 'Summarising',
    title: 'Summary vs your own opinion',
    teach: 'A summary reports what the source says. Your reaction is a separate thing and belongs in a separate sentence, clearly marked. Blurring them makes it impossible for the reader to tell whose idea is whose.',
    weak: 'The article says space funding is wasteful, which is obviously wrong.',
    strong: 'The article argues that space funding takes money from more urgent needs. I think that framing ignores where the money is actually spent, which is here, on wages and manufacturing.',
    task: 'Summarise an argument you disagree with, fairly, in 3 sentences. Then respond in 3 more, clearly separated.',
    checkFor: 'The summary is fair, and the boundary between report and reaction is obvious.',
    minSentences: 6
  },
  {
    id: 'wd-w27-d4', week: 27, day: 4, skill: 'summarising',
    skillLabel: 'Summarising',
    title: 'Quarter three benchmark',
    teach: 'Everything from this quarter: a thesis, an introduction, bodies that each hold one idea, transitions between them, and a conclusion that widens.',
    weak: 'A five-paragraph shape with nothing inside it.',
    strong: '(your piece)',
    task: 'Write a complete five-paragraph piece — introduction, three bodies, conclusion — on something you know well. Use a mapping thesis and transitions between every paragraph.',
    checkFor: 'Five paragraphs, thesis matched by the bodies, transitions throughout, conclusion that widens. Quarter benchmark.',
    minSentences: 20
  }
];
