// ---------------------------------------------------------------------------
// THE HUMAN BODY · MODULE 12 BANK — 40 questions, 10 per lesson.
// The last module of Quarter 3.
//
// Answer slots assigned from a fixed balanced pattern at build time: 10/10/10/10.
//
// ---- WHERE THE MATHS SITS ----
//
// Lesson 1 carries two millilitre-to-litre conversions. Lesson 2 carries THREE
// millimetre-and-centimetre conversions, which is a new unit for this course.
// Lesson 4 carries two "largest take away smallest" questions. Units scored
// 0 of 3 and measurement 2.00 on her Check-In.
//
// ---- SAFETY ----
//
// NOTHING about how clever anybody is, how fast anybody learns, or one brain
// being better than another — this is a child who has just been told she is
// behind, and the brain module is where that would land hardest. Nothing about
// mental illness or head injury. No self-diagnosis. Two questions state
// explicitly that an imperfect result means nothing is wrong.
// ---------------------------------------------------------------------------

export const HUMANBODY_M12_BANK = [
  // ============================================ body-m12-01
  { id: 't-bodym1201a', lesson: 'body-m12-01', prompt: 'The brain is protected by:', choices: ['Bone and a layer of liquid', 'Muscle only', 'Skin alone', 'Nothing at all'], answer: 0, feedback: [null, 'Muscle is not the shield.', 'Skin is outermost, not the shield.', 'It is very well protected.'], why: 'It never touches the skull.' },
  { id: 't-bodym1201b', lesson: 'body-m12-01', prompt: 'The part that keeps breathing going while you sleep is:', choices: ['The wrinkled top', 'The skull', 'The stalk underneath', 'The liquid'], answer: 2, feedback: ['That part does the deciding.', 'The skull is bone.', null, 'The liquid only cushions.'], why: 'It never asks you first.' },
  { id: 't-bodym1201c', lesson: 'body-m12-01', prompt: '1200 millilitres written in litres is:', choices: ['12 litres', '1.2 litres', '120 litres', '0.12 litres'], answer: 1, feedback: ['Ten times too many.', null, 'A hundred times too many.', 'Ten times too few.'], why: 'A thousand millilitres make a litre.' },
  { id: 't-bodym1201d', lesson: 'body-m12-01', prompt: '2000 millilitres is the same as:', choices: ['20 litres', '200 litres', 'Half a litre', '2 litres'], answer: 3, feedback: ['Ten times too many.', 'A hundred times too many.', 'Far too little.', null], why: '2000 ÷ 1000 = 2.' },
  { id: 't-bodym1201e', lesson: 'body-m12-01', prompt: 'The bone box around the brain is called the:', choices: ['Spine', 'Rib', 'Jaw', 'Skull'], answer: 3, feedback: ['That runs down the back.', 'Ribs guard the chest.', 'The jaw holds teeth.', null], why: 'Hard, and built for one job.' },
  { id: 't-bodym1201f', lesson: 'body-m12-01', prompt: 'The liquid round the brain is there to:', choices: ['Feed it', 'Stop it knocking against bone', 'Keep it warm', 'Hold it still'], answer: 1, feedback: ['Blood does the feeding.', null, 'Warmth is not its job.', 'It lets it float, not sit still.'], why: 'Like a plum drifting in a jar.' },
  { id: 't-bodym1201g', lesson: 'body-m12-01', prompt: 'The smaller part at the back of the brain keeps you:', choices: ['Breathing', 'Warm', 'Balanced', 'Hungry'], answer: 2, feedback: ['The stalk does that.', 'Skin and blood handle warmth.', null, 'The gut deals with that.'], why: 'Upright, without you thinking.' },
  { id: 't-bodym1201h', lesson: 'body-m12-01', prompt: 'The big wrinkled part at the top handles:', choices: ['Seeing, hearing and deciding', 'Only balance', 'Only breathing', 'Nothing much'], answer: 0, feedback: [null, 'That is the back part.', 'That is the stalk.', 'It does a great deal.'], why: 'The deciding part.' },
  { id: 't-bodym1201i', lesson: 'body-m12-01', prompt: 'Something automatic means it happens:', choices: ['Only when you choose', 'Once a year', 'Without you deciding', 'Never'], answer: 2, feedback: ['That is the opposite.', 'Constantly.', null, 'It happens all the time.'], why: 'Breathing while asleep is the example.' },
  { id: 't-bodym1201j', lesson: 'body-m12-01', prompt: 'Filling a jug in stages to reach 1200 ml practises:', choices: ['Adding volumes together', 'Weighing', 'Telling time', 'Measuring length'], answer: 0, feedback: [null, 'Nothing is weighed.', 'No clock is used.', 'No ruler is used.'], why: 'Several pours, one total.' },

  // ============================================ body-m12-02
  { id: 't-bodym1202a', lesson: 'body-m12-02', prompt: 'Nerves carry messages as:', choices: ['Water', 'Tiny electric signals', 'Air', 'Blood'], answer: 1, feedback: ['Water carries waste.', null, 'Air goes to the lungs.', 'Blood carries food and oxygen.'], why: 'Signals, not liquid.' },
  { id: 't-bodym1202b', lesson: 'body-m12-02', prompt: 'Which has the most nerve endings packed together?', choices: ['Your back', 'Your upper arm', 'Your knee', 'Your fingertip'], answer: 3, feedback: ['Spread far apart there.', 'Spread far apart there.', 'Fewer than a fingertip.', null], why: 'Which is why it tells you most.' },
  { id: 't-bodym1202c', lesson: 'body-m12-02', prompt: '40 millimetres written in centimetres is:', choices: ['400 cm', '4 cm', '0.4 cm', '40 cm'], answer: 1, feedback: ['Far too big.', null, 'Ten times too small.', 'The unit did not change.'], why: 'Ten millimetres make one centimetre.' },
  { id: 't-bodym1202d', lesson: 'body-m12-02', prompt: '70 millimetres written in centimetres is:', choices: ['700 cm', '0.7 cm', '70 cm', '7 cm'], answer: 3, feedback: ['Far too big.', 'Ten times too small.', 'Unit unchanged.', null], why: '70 ÷ 10 = 7.' },
  { id: 't-bodym1202e', lesson: 'body-m12-02', prompt: '5 centimetres written in millimetres is:', choices: ['50 mm', '5 mm', '500 mm', '0.5 mm'], answer: 0, feedback: [null, 'Unit unchanged.', 'Ten times too many.', 'Far too small.'], why: '5 × 10 = 50.' },
  { id: 't-bodym1202f', lesson: 'body-m12-02', prompt: 'The thick bundle of nerves inside your spine is the:', choices: ['Windpipe', 'Aorta', 'Spinal cord', 'Skull'], answer: 2, feedback: ['That carries air.', 'That carries blood.', null, 'That is bone.'], why: 'Branches leave it like roads leave a motorway.' },
  { id: 't-bodym1202g', lesson: 'body-m12-02', prompt: 'You can tell what a coin is with a fingertip because:', choices: ['Its nerve endings are close together', 'It is warm', 'It is strong', 'It is small'], answer: 0, feedback: [null, 'Warmth is not the reason.', 'Strength is not the reason.', 'Size is not the reason.'], why: 'Crowded endings, more detail.' },
  { id: 't-bodym1202h', lesson: 'body-m12-02', prompt: 'On your back, the two points feel like one until they are:', choices: ['Very close', 'Touching', 'Far apart', 'Cold'], answer: 2, feedback: ['Close feels like one there.', 'Touching feels like one.', null, 'Temperature is not it.'], why: 'The endings are spread wide.' },
  { id: 't-bodym1202i', lesson: 'body-m12-02', prompt: 'The two-point test must use:', choices: ['Two pins', 'A needle', 'Anything sharp', 'Two blunt points'], answer: 3, feedback: ['Never a pin.', 'Never a needle.', 'Nothing sharp, ever.', null], why: 'Cotton buds or hairgrips, from a grown-up.' },
  { id: 't-bodym1202j', lesson: 'body-m12-02', prompt: 'A nerve reaches:', choices: ['Only your arms', 'Every part of your body', 'Only your head', 'Only your skin'], answer: 1, feedback: ['Far more than that.', null, 'Far more than that.', 'Inside as well as outside.'], why: 'There is nowhere they do not go.' },

  // ============================================ body-m12-03
  { id: 't-bodym1203a', lesson: 'body-m12-03', prompt: 'A reflex is fast because the message:', choices: ['Travels twice', 'Is louder', 'Waits its turn', 'Does not go all the way to the brain'], answer: 3, feedback: ['Twice would be slower.', 'Loudness is not part of it.', 'Waiting is slower.', null], why: 'It turns round at the spinal cord.' },
  { id: 't-bodym1203b', lesson: 'body-m12-03', prompt: 'Reflexes happen:', choices: ['Only when you choose', 'On their own, to protect you', 'Once a day', 'Only when asleep'], answer: 1, feedback: ['You get no choice.', null, 'Whenever they are needed.', 'Awake as well.'], why: 'No time to think is the point.' },
  { id: 't-bodym1203c', lesson: 'body-m12-03', prompt: 'Which of these is a reflex?', choices: ['Blinking when something comes at you', 'Writing your name', 'Waving', 'Reading'], answer: 0, feedback: [null, 'That is a decision.', 'That is a decision.', 'That is a decision.'], why: 'Fast, and not chosen.' },
  { id: 't-bodym1203d', lesson: 'body-m12-03', prompt: 'Which of these is a decision, not a reflex?', choices: ['Coughing', 'Blinking', 'Waving to a friend', 'Pulling away from heat'], answer: 2, feedback: ['That happens on its own.', 'That happens on its own.', null, 'That happens on its own.'], why: 'You choose to wave.' },
  { id: 't-bodym1203e', lesson: 'body-m12-03', prompt: 'Your hand moves away from heat before you notice because:', choices: ['Your brain was quick', 'Your hand was cold', 'The spinal cord answered first', 'You decided fast'], answer: 2, feedback: ['The brain finds out afterwards.', 'Temperature is not the reason.', null, 'There was no deciding.'], why: 'The shortcut saved the time.' },
  { id: 't-bodym1203f', lesson: 'body-m12-03', prompt: 'A doctor tapping a knee is:', choices: ['Checking the wiring', 'Testing how clever you are', 'Making you jump', 'Measuring your leg'], answer: 0, feedback: [null, 'Nothing to do with that.', 'That is not the purpose.', 'No measuring involved.'], why: 'She is watching a reflex happen.' },
  { id: 't-bodym1203g', lesson: 'body-m12-03', prompt: 'A shortcut means a route that:', choices: ['Goes further', 'Misses out part of the long way', 'Is slower', 'Goes nowhere'], answer: 1, feedback: ['That is the opposite.', null, 'Shortcuts are faster.', 'It gets there.'], why: 'Which is exactly what saves the time.' },
  { id: 't-bodym1203h', lesson: 'body-m12-03', prompt: 'Reflexes exist mainly to:', choices: ['Make you jump', 'Entertain doctors', 'Slow you down', 'Keep you safe'], answer: 3, feedback: ['That is a side effect.', 'That is not why.', 'They speed you up.', null], why: 'Safe when there is no time to think.' },
  { id: 't-bodym1203i', lesson: 'body-m12-03', prompt: 'Coughing is:', choices: ['A decision', 'A reflex', 'Neither', 'Always chosen'], answer: 1, feedback: ['It happens on its own.', null, 'It is one of the two.', 'You cannot always stop it.'], why: 'It clears the airway for you.' },
  { id: 't-bodym1203j', lesson: 'body-m12-03', prompt: 'Trying not to blink when something comes at your face usually:', choices: ['Works easily', 'Hurts', 'Takes practice', 'Fails, because it is a reflex'], answer: 3, feedback: ['It is very hard to stop.', 'Nothing hurts.', 'Practice barely helps.', null], why: 'You do not get a vote.' },

  // ============================================ body-m12-04
  { id: 't-bodym1204a', lesson: 'body-m12-04', prompt: 'Brain freeze is felt in the forehead because:', choices: ['The forehead got cold', 'The brain froze', 'The brain named the wrong place', 'Skin is thin there'], answer: 2, feedback: ['Nothing cold touched it.', 'Nothing about you freezes.', null, 'Thickness is not the reason.'], why: 'Nerves share routes on the way up.' },
  { id: 't-bodym1204b', lesson: 'body-m12-04', prompt: 'Where a pain is felt is:', choices: ['A clue, not a proof', 'Always exactly right', 'Never useful', 'Chosen by the person'], answer: 0, feedback: [null, 'Not always, as brain freeze shows.', 'It is a useful clue.', 'Nobody chooses it.'], why: 'A doctor checks whether it makes sense.' },
  { id: 't-bodym1204c', lesson: 'body-m12-04', prompt: 'Your largest gap is 7 cm and your smallest is 2 cm. The difference is:', choices: ['5 cm', '9 cm', '2 cm', '7 cm'], answer: 0, feedback: [null, 'That is adding them.', 'That is the smallest.', 'That is the largest.'], why: '7 − 2 = 5.' },
  { id: 't-bodym1204d', lesson: 'body-m12-04', prompt: 'Your largest gap is 6 cm and your smallest is 1 cm. The difference is:', choices: ['7 cm', '6 cm', '5 cm', '1 cm'], answer: 2, feedback: ['That is adding them.', 'That is the largest.', null, 'That is the smallest.'], why: '6 − 1 = 5.' },
  { id: 't-bodym1204e', lesson: 'body-m12-04', prompt: 'The brain works out where a message came from by:', choices: ['Looking', 'Asking you', 'Guessing at random', 'Reading which route it arrived on'], answer: 3, feedback: ['You cannot see inside.', 'It does not ask.', 'It is not random.', null], why: 'And routes are shared, so it can slip.' },
  { id: 't-bodym1204f', lesson: 'body-m12-04', prompt: 'A clue is something that:', choices: ['Proves an answer', 'Helps you work an answer out', 'Is always wrong', 'Means nothing'], answer: 1, feedback: ['A clue is not a proof.', null, 'Clues are often right.', 'Clues are useful.'], why: 'Useful, and not the final word.' },
  { id: 't-bodym1204g', lesson: 'body-m12-04', prompt: 'Doctors are taught to expect pain felt in the wrong place because:', choices: ['It never happens', 'Patients make it up', 'It happens often enough to matter', 'It is a joke'], answer: 2, feedback: ['It happens regularly.', 'Nobody is making it up.', null, 'It is taken seriously.'], why: 'Shared routes, misnamed places.' },
  { id: 't-bodym1204h', lesson: 'body-m12-04', prompt: 'In the pointing activity she measures:', choices: ['The gap between two marks', 'How clever she is', 'How fast she moves', 'Her weight'], answer: 0, feedback: [null, 'Nothing about that is measured.', 'Speed is not measured.', 'Nothing is weighed.'], why: 'A length, in centimetres, five times.' },
  { id: 't-bodym1204i', lesson: 'body-m12-04', prompt: 'If nobody points exactly right, that means:', choices: ['Something is wrong', 'Nothing is wrong — that is normal', 'The test failed', 'The nerves are broken'], answer: 1, feedback: ['It is completely normal.', null, 'The test worked.', 'Nothing is broken.'], why: 'Skin is not a precise map.' },
  { id: 't-bodym1204j', lesson: 'body-m12-04', prompt: 'The pen used in the activity must be:', choices: ['Permanent', 'Sharp', 'Any pen at all', 'Washable'], answer: 3, feedback: ['Never a permanent one.', 'Nothing sharp on skin.', 'Washable only.', null], why: 'And a grown-up says yes first.' },
];

export default HUMANBODY_M12_BANK;