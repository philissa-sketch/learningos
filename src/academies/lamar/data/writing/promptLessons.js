// ---------------------------------------------------------------------------
// HOW TO WRITE THE THING, NOT JUST WHAT TO WRITE ABOUT.
//
// ---- WHY THIS EXISTS (Aug 17, 2026) ----
//
// The parent: "I was looking at the daily journal, and it's not teaching a
// lesson. Ex. He is to write about why he decided to be an engineer. The lesson
// should be how to write an introduction, what should be in the body, and how
// to write a conclusion."
//
// She is right, and the gap is precise. The Essay prompt already said *"aim for
// at least 3 paragraphs: an introduction, one or two body paragraphs, a
// conclusion"* — it NAMED the three parts and taught none of them. A
// twelve-year-old reading that knows how many paragraphs to produce and nothing
// about what goes in them. **Naming a structure is not teaching it**, and every
// one of the fourteen prompts had the same shape: a topic, a word count, and an
// assumption that the form was already known.
//
// This is the same fault found on Aug 13 in a different place, when composition
// was assigned to the journal, mechanics to Khan, and sentence-and-paragraph
// construction to nobody. That fix built the daily drill ladder for SENTENCES
// and PARAGRAPHS. Nothing ever taught the FORMS — what an essay is, what a lab
// report is for, why a persuasive piece is built differently from a story.
//
// ---- WHEN HE SEES IT ----
//
// Her rule, verbatim: *"This doesn't have to be in every journal, but since
// this is his real first journal that should apply to any other journal that
// will be asking him to do something new."*
//
// So the lesson opens BY DEFAULT the first time he writes a given form, and
// collapses to a one-line reminder every time after. The prompts repeat across
// the year — Mission Report comes round seven times — and a lesson shoved in
// his face on the seventh is how a student learns to scroll past teaching.
//
// ---- THE SHAPE ----
//
// Same shape as the daily drills, because it works and because the vocabulary
// then carries across the whole year: what the form IS, its parts in order,
// then the move done badly beside the same move done well. The weak/strong pair
// is the load-bearing part — a rule stated is a rule read; a rule shown beside
// its violation is a rule he can see.
// ---------------------------------------------------------------------------

export const PROMPT_LESSONS = {
  'w7-paragraph': {
    form: 'A paragraph',
    teach:
      'A paragraph is one idea, developed. Not one topic — one IDEA. If you find yourself starting a second idea, that is where the next paragraph begins.',
    parts: [
      { name: 'Topic sentence', what: 'The first sentence says what the whole paragraph will argue. A reader should be able to read it alone and know what is coming.', tip: 'Write this one last if it is easier. Just make sure it ends up first.' },
      { name: 'Support', what: 'Three or four sentences of evidence: a reason, an example, a number, something that happened. Each one must serve the topic sentence.', tip: 'If a sentence does not support the topic sentence, it belongs in a different paragraph.' },
      { name: 'Closing', what: 'One sentence that lands the point — not a repeat of the topic sentence, but what it adds up to.', tip: 'A paragraph that just stops feels unfinished. Say the "so what".' }
    ],
    weak: 'Engineers need math. Math is used a lot. I like math sometimes. Rockets are cool and they go fast.',
    strong: 'An aerospace engineer cannot do the job without maths. Working out how much lift a wing makes means multiplying air speed by itself, so a small error in the speed becomes a large error in the answer. Getting a launch window wrong by one degree can miss a planet by thousands of miles. That is why the maths comes before the building.',
    checkFor: 'Does every sentence in the middle support the first one?'
  },

  'w7-essay': {
    form: 'A short essay',
    teach:
      'An essay makes ONE point and spends three paragraphs proving it. The point is called your thesis. Before you write a word, finish this sentence in your head: "What I am really saying is ___." If you cannot finish it, you are not ready to start.',
    parts: [
      { name: 'Introduction', what: 'Open with something concrete — a moment, a fact, a question. Then say your thesis plainly in one sentence. Three or four sentences total.', tip: 'Do NOT open with "In this essay I will..." — show the reader, do not announce.' },
      { name: 'Body', what: 'One or two paragraphs. Each one takes ONE reason your thesis is true, and proves it with something real: something that happened to you, something you built, something you read.', tip: 'One reason per paragraph. Two reasons crammed together is how a body paragraph goes blurry.' },
      { name: 'Conclusion', what: 'Do not summarise — the reader just read it. Say what it means, or what you will do about it next.', tip: 'The best last sentence looks forward, not backward.' }
    ],
    weak: 'I want to be an engineer. Engineers build things. I like building things. In conclusion, that is why I want to be an engineer.',
    strong: 'The first time I built something that worked, it was a paper glider that flew the whole length of the yard on the eleventh try. What made me want to be an engineer was not that it flew — it was the ten times it did not. Engineering is the only work I know of where being wrong ten times in a row is the normal way to get it right...',
    checkFor: 'Can you point at the one sentence that is your thesis? Does each body paragraph prove it?'
  },

  'w7-mission-report': {
    form: 'A mission report',
    teach:
      'A report tells someone who was not there what happened, in the order it happened, without decoration. Real ones get read by people making decisions, so clarity beats style every time.',
    parts: [
      { name: 'What the mission was', what: 'The objective in one or two sentences. What were you trying to achieve?', tip: 'Start with the goal, not the story.' },
      { name: 'What happened', what: 'The events in order. Facts and numbers where you have them.', tip: 'Include what went wrong. A report that only contains successes is not a report.' },
      { name: 'Result and next step', what: 'Did it meet the objective? What happens next because of it?', tip: 'Be willing to write "no". That is a valid result.' }
    ],
    weak: 'It was a really fun day and everything went great and I learned a lot.',
    strong: 'Objective: launch the bottle rocket to at least 30 feet. Three launches. The first reached about 20 feet — too much water. The second, with half the water, reached roughly 35 feet. The third matched it. Objective met on attempt two. Next: try a nose cone and see whether it adds height or only stability.',
    checkFor: 'Could someone who was not there tell exactly what happened?'
  },

  'w7-scientific-observation': {
    form: 'A scientific observation',
    teach:
      'Observation is writing down what you actually see — not what you expected, and not what it means. The interpreting comes later and it comes separately. Mixing them is the most common mistake in science writing.',
    parts: [
      { name: 'The setup', what: 'What you observed, when, and under what conditions.', tip: 'Time, place, temperature, light — whatever could have affected it.' },
      { name: 'What you saw', what: 'Only what your senses recorded. Measurements, counts, colours, sounds, changes over time.', tip: 'If you cannot point to where you saw it, it is not an observation.' },
      { name: 'What you wondered', what: 'Kept separate on purpose. Questions the observation raised.', tip: 'This is where guessing is allowed — and only here.' }
    ],
    weak: 'The plant was happy today and looked like it was enjoying the sun.',
    strong: 'Day 6, 8:15am, 71°F, full sun since 7am. The seedling is 4.5 cm, up 0.8 cm from yesterday. Two true leaves, both angled toward the window. Soil dry at the surface, damp a finger deep. Wondered: is the lean toward the light, or is that side simply growing faster?',
    checkFor: 'Did you write anything you did not actually see? Move it to the wondering.'
  },

  'w7-creative-writing': {
    form: 'A short story',
    teach:
      'A story is somebody who wants something, and something in the way. If nothing is in the way, it is a description, not a story. Show what happens through what the character does and notices — do not tell the reader how to feel about it.',
    parts: [
      { name: 'Opening', what: 'Drop the reader into a moment already happening. Introduce the character by what they are doing.', tip: 'Start as late into the scene as you can get away with.' },
      { name: 'The middle', what: 'The want meets the obstacle. Something changes.', tip: 'Let the character make a choice. Things merely happening to them is flat.' },
      { name: 'The end', what: 'They get it, or do not, or get something else. Something is different from the first line.', tip: 'The character should have changed, even slightly.' }
    ],
    weak: 'She was very scared and nervous about the launch. It was so exciting. Then it launched and it was amazing.',
    strong: 'She had counted the rivets on the hatch four times. Twenty-two. Counting them was better than listening to the countdown. When the engines lit, the sound arrived through her back before her ears, and she found she had stopped counting.',
    checkFor: 'What does your character want, and what is stopping them?'
  },

  'w7-lab-report': {
    form: 'A lab report',
    teach:
      'A lab report exists so someone else can repeat exactly what you did and check whether they get the same answer. That is the whole purpose. Write it so a stranger could follow it without asking you a single question.',
    parts: [
      { name: 'Question and prediction', what: 'What you were testing, and what you thought would happen — plus why you thought it.', tip: 'Write the prediction BEFORE the experiment. Never after.' },
      { name: 'Method', what: 'Exactly what you did, in order, with measurements. Numbered steps.', tip: 'Test it: could someone repeat this using only your words?' },
      { name: 'Results', what: 'What actually happened. Numbers, in a table if you have several.', tip: 'Results are what happened, not what it means.' },
      { name: 'Conclusion', what: 'Was the prediction right? What would you change?', tip: 'A wrong prediction is a good result. Say so plainly.' }
    ],
    weak: 'I dropped some paper airplanes and the pointy one went further so pointy is better.',
    strong: 'Question: does nose shape change glide distance? Prediction: a pointed nose flies further, because less air resistance. Method: 1. Fold three planes from identical A4 sheets — pointed, blunt, rounded. 2. Launch each five times from 1.5 m, same throw. 3. Measure to the first touch. Results: pointed 4.1 m average, blunt 4.9 m, rounded 4.4 m. Conclusion: prediction wrong. The blunt nose flew furthest, which suggests wing lift matters more here than nose drag.',
    checkFor: 'Could a stranger repeat this from your method alone?'
  },

  'w7-technical-writing': {
    form: 'Technical instructions',
    teach:
      'Instructions are written for someone who does NOT already know how. Every step is one action, in order, in the imperative — "Cut the tube", not "You should probably cut the tube". If a step contains the word "and", it is usually two steps.',
    parts: [
      { name: 'What this makes, and what you need', what: 'The finished result in one line, then the full list of materials and tools.', tip: 'Nothing may appear in a step that was not on the list.' },
      { name: 'The steps', what: 'Numbered. One action each. Measurements included.', tip: 'Warnings go BEFORE the dangerous step, never after.' },
      { name: 'How to know it worked', what: 'What the finished thing should look like or do.', tip: 'Add what to do if it did not work.' }
    ],
    weak: 'Get your stuff together and then cut it to size and glue it and let it dry for a bit.',
    strong: '1. Cut the cardboard tube to 20 cm using the craft knife. (Cut away from your hand.) 2. Mark four points around the tube, 2 cm from one end, evenly spaced. 3. Apply glue to one fin tab. 4. Press the fin to the first mark and hold for 30 seconds. Repeat for all four. 5. Leave to dry for one hour before handling.',
    checkFor: 'Does any step contain two actions? Split it.'
  },

  'w7-engineering-journal': {
    form: 'An engineering journal entry',
    teach:
      'An engineering journal is a record of thinking, not of results. Its value is that it is honest: real engineers keep them so that six months later they can remember WHY they chose something, including the choices that turned out badly.',
    parts: [
      { name: 'What I was working on', what: 'The problem in front of you today.', tip: 'One or two sentences. Date it.' },
      { name: 'What I tried and what happened', what: 'Including dead ends. Especially dead ends.', tip: 'Write the failures in the same detail as the successes.' },
      { name: 'What I think now', what: 'What you understand that you did not this morning, and what you will try next.', tip: '"I still do not understand why" is a legitimate entry.' }
    ],
    weak: 'Worked on the project. It went okay. Will do more tomorrow.',
    strong: 'Aug 14 — trying to stop the fins tearing off at launch. Tried more glue first; it held for one flight then tore the cardboard instead of the joint. So the glue was never the weak part, the tube was. Next: a paper collar around the base to spread the load. Still not sure whether the tear starts at launch or landing — need to film it.',
    checkFor: 'Would this entry make sense to you in six months?'
  },

  'w7-research-paper': {
    form: 'A short research report',
    teach:
      'A research report is not a list of facts you found. It answers a question, using facts that came from somewhere you can name. If you cannot say where a fact came from, you cannot use it.',
    parts: [
      { name: 'The question', what: 'What you set out to find out, in one sentence.', tip: 'A narrow question makes a better report than a broad one.' },
      { name: 'What you found', what: 'The facts, grouped by idea rather than by which source they came from.', tip: 'Two paragraphs on two aspects beats one paragraph per website.' },
      { name: 'Your answer', what: 'What the facts add up to. Your conclusion, in your own words.', tip: 'This part must be yours. The rest is theirs.' },
      { name: 'Sources', what: 'Where each fact came from.', tip: 'Name them as you go, not just at the end.' }
    ],
    weak: 'The Saturn V was a rocket. It was very big. It went to the moon. It was made by NASA. It had stages.',
    strong: 'Question: why did the Saturn V need three stages instead of one? A rocket spends most of its fuel lifting its own weight, so carrying an empty tank upward wastes thrust. The Saturn V dropped its first stage after about 2 minutes, at which point most of its launch mass was already gone (NASA Apollo press kit). Staging therefore is not about power but about not carrying what you have finished using.',
    checkFor: 'Is your answer in your own words, and can you name where each fact came from?'
  },

  'w7-design-documentation': {
    form: 'Design documentation',
    teach:
      'Design documentation explains a thing you made so that someone else could build it, judge it, or improve it. The hard part is not describing what it looks like — it is explaining WHY it is like that. Every design is a set of choices, and each one had alternatives.',
    parts: [
      { name: 'What it is for', what: 'The problem it solves and who it is for.', tip: 'A design with no stated problem cannot be judged.' },
      { name: 'How it works', what: 'The parts, what each does, and how they fit. A sketch belongs here.', tip: 'Name every part. "The bit at the end" is not a name.' },
      { name: 'Why these choices', what: 'For at least two decisions: what else you could have done, and why you did not.', tip: 'This is the section that separates documentation from a description.' },
      { name: 'What is still wrong', what: 'Known limits and what you would do with more time or money.', tip: 'Every real design document has this section. Yours should too.' }
    ],
    weak: 'It is a rocket made of cardboard with fins and a nose cone. It is painted orange.',
    strong: 'Purpose: a water rocket that a younger kid can launch alone, safely. Fins are cut from a single folded sheet rather than three separate pieces, because separate fins have to be aligned by eye and a 5° error sends it sideways. Considered plastic fins — stronger, but they need glue that needs adult supervision, which breaks the whole point. Still wrong: the nose cone is friction-fit and comes off on hard landings.',
    checkFor: 'Have you explained WHY for at least two choices, not just what?'
  },

  'w7-persuasive-writing': {
    form: 'A persuasive piece',
    teach:
      'Persuasion is not saying your opinion louder. It is giving a reader who disagrees a reason to move. That means you have to know what they think and take it seriously — the strongest persuasive writing argues against its own best objection.',
    parts: [
      { name: 'Your position', what: 'What you want the reader to think or do. One clear sentence.', tip: 'If you cannot state it in one sentence you do not have a position yet.' },
      { name: 'Your reasons', what: 'Two or three, strongest first, each with evidence.', tip: 'Evidence means a fact, a number, or something that happened — not "everyone knows".' },
      { name: 'The other side', what: 'State the best argument against you fairly, then answer it.', tip: 'Stating it weakly so you can knock it down is the mistake. A reader can tell.' },
      { name: 'What you want', what: 'Say plainly what should happen now.', tip: 'End with the ask, not with a summary.' }
    ],
    weak: 'Space exploration is obviously important and anyone who disagrees just does not get it. We should spend more on it.',
    strong: 'NASA should keep funding uncrewed missions ahead of crewed ones. A rover costs a fraction of a crewed mission and can stay for years... The strongest argument against this is that crewed missions inspire people in a way robots do not, and that is true — Apollo did more for engineering enrolment than any probe has. But inspiration that costs four missions is expensive inspiration, and a generation inspired by pictures from Mars is still inspired.',
    checkFor: 'Did you state the other side fairly enough that someone who holds it would agree you got it right?'
  },

  'w7-presentation-skills': {
    form: 'Talking points for a presentation',
    teach:
      'Notes for speaking are not an essay. You are writing something you will SAY, to people who cannot rewind you. Short lines, one idea each, in the order you will say them. The audience gets your words once and only once.',
    parts: [
      { name: 'The hook', what: 'The first fifteen seconds. A question, a number, or a thing that happened.', tip: 'Never open with "So, um, today I am going to talk about..."' },
      { name: 'Three points', what: 'Three, not seven. Each one a short line you can say from a glance.', tip: 'People remember three things. They remember none of seven.' },
      { name: 'The close', what: 'The one sentence you want them to leave with.', tip: 'Write this word for word. It is the only part worth memorising.' }
    ],
    weak: 'Introduction — talk about rockets — history of rockets — types of rockets — fuel — stages — famous launches — questions?',
    strong: 'HOOK: "This is a photo of a rocket that failed. It is the reason the next one worked." · POINT 1: failure data is the cheapest data you can buy · POINT 2: three failures we learned most from · POINT 3: what I changed on my own build because of them · CLOSE: "Every rocket that flies is standing on one that did not."',
    checkFor: 'Could you deliver this from a glance, or are you reading paragraphs aloud?'
  },

  'w7-space-journal': {
    form: 'A reflective journal entry',
    teach:
      'A reflective entry is thinking on paper. Nobody is grading whether you are right, and there is no structure to satisfy — but a reflection that only reports what happened is a diary. The reflection is the part where you say what you make of it.',
    parts: [
      { name: 'What happened or what you learned', what: 'Briefly. This is the setup, not the point.', tip: 'Two or three sentences is plenty.' },
      { name: 'What you make of it', what: 'What surprised you, confused you, changed your mind, or connected to something else.', tip: 'This should be the longest part.' },
      { name: 'What you want to know now', what: 'The question it left you with.', tip: 'The best questions are the ones you cannot look up in one search.' }
    ],
    weak: 'Today I learned about black holes. They are very interesting. Space is amazing.',
    strong: 'Learned that a black hole does not suck things in — if the Sun became one, Earth would keep orbiting exactly as now. That reorganised something for me. I had pictured a drain. It is not a drain, it is just mass in a very small space, and the strangeness only starts when you get close. Now I want to know what "close" means as an actual number.',
    checkFor: 'Is there a sentence where you say what you MAKE of it, not just what it was?'
  },

  'w7-engineering-notebook': {
    form: 'An engineering notebook page',
    teach:
      'A notebook page is the working, not the write-up. Sketches, numbers, crossings-out, half-ideas. Engineers keep them because the record of how you got somewhere is worth as much as arriving — and because a dated page is legal evidence of when you had an idea.',
    parts: [
      { name: 'Date and problem', what: 'Every page dated. What you are working on at the top.', tip: 'Never leave a page undated. That is the one rule.' },
      { name: 'The working', what: 'Sketches with measurements, calculations, options considered.', tip: 'Cross out mistakes with one line. Do not erase — the wrong turn is part of the record.' },
      { name: 'Where you got to', what: 'One line at the bottom: what you concluded or where you stopped.', tip: 'Write it even when the answer is "stuck".' }
    ],
    weak: 'Ideas for the rocket. Some sketches. Might try different fins.',
    strong: 'Aug 14 — fin area vs stability. Tried 3 fins at 40 cm² each = 120 cm² total. Rule of thumb says centre of pressure must sit behind centre of mass; measured CM at 18 cm from nose, estimated CP at 21 cm. Margin ~1.2 calibres, want 1.5+. Options: bigger fins (heavier, moves CM back too — self-defeating?) or move the water tank forward. STOPPED AT: need to check whether moving the tank forward actually moves CM enough.',
    checkFor: 'Is the page dated, and can you see your working rather than just your answer?'
  }
};

export function lessonForPrompt(promptId) {
  return PROMPT_LESSONS[promptId] || null;
}

/** Every prompt that introduces a form should teach it. Used by the guard. */
export function promptsWithoutLessons(prompts = []) {
  return prompts.filter((p) => p.category === 'skill' || PROMPT_LESSONS[p.id] === undefined)
    .filter((p) => !PROMPT_LESSONS[p.id])
    .map((p) => p.id);
}
